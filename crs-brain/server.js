/*
 * CRS Brain — local second-brain server.
 *
 * Zero external dependencies. Uses your Claude Max subscription via the
 * headless `claude -p` CLI (no per-token API billing).
 *
 * - Serves the single-file frontend in public/index.html
 * - Browses / reads / writes the real .md (and other) files in the repo
 * - Relays chat to `claude -p`, keeps conversations resumable (infinite memory)
 * - Persists chats + progress board as files in crs-brain/data (git-versioned)
 *
 * Binds to 127.0.0.1 only. Personal, single-user, local use.
 */

const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn, execFileSync } = require('child_process');
const crypto = require('crypto');

// macOS/Linux: apps launched by double-click get a minimal PATH that misses
// user-local installs (claude lives in ~/.local/bin). Extend PATH up front so
// every spawn('claude'|'git'|…) below works regardless of how we were started.
if (process.platform !== 'win32') {
  const home = os.homedir();
  const extra = [
    path.join(home, '.local', 'bin'),
    '/opt/homebrew/bin', '/usr/local/bin',
    path.join(home, '.npm-global', 'bin'),
  ];
  const cur = (process.env.PATH || '').split(':').filter(Boolean);
  process.env.PATH = [...new Set([...cur, ...extra])].join(':');
  // The claude CLI needs USER/LOGNAME to find its keychain credentials —
  // some launch contexts (cron, stripped shells) omit them.
  try {
    const uname = os.userInfo().username;
    if (!process.env.USER) process.env.USER = uname;
    if (!process.env.LOGNAME) process.env.LOGNAME = uname;
  } catch {}
}
// Resolve a binary to its full path across the extended PATH (for pty/exec that
// don't do their own PATH lookup reliably).
function resolveBin(name) {
  for (const dir of (process.env.PATH || '').split(path.sep === '\\' ? ';' : ':')) {
    if (!dir) continue;
    const full = path.join(dir, name);
    try { if (fs.existsSync(full)) return full; } catch {}
  }
  return null;
}

// ---- paths -----------------------------------------------------------------
const BRAIN_DIR = __dirname;                       // .../crs-brain
const REPO_ROOT = path.resolve(BRAIN_DIR, '..');   // .../crs-progress
const PUBLIC_DIR = path.join(BRAIN_DIR, 'public');
const DATA_DIR = path.join(BRAIN_DIR, 'data');
const CHATS_DIR = path.join(DATA_DIR, 'chats');
const ATTACH_DIR = path.join(DATA_DIR, 'attachments');
const DOCS_DIR = path.join(DATA_DIR, 'docs');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');
const MODULES_FILE = path.join(DATA_DIR, 'modules.json');
const IDEAS_FILE = path.join(DATA_DIR, 'ideas.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const BP_GUARD_JS = path.join(BRAIN_DIR, 'bp-guard.js');            // PreToolUse deny-hook script
const BP_GUARD_SETTINGS = path.join(DATA_DIR, 'bp-guard-settings.json');
const BP_LOG_JS = path.join(BRAIN_DIR, 'bp-log.js');               // PostToolUse hook: records every buildprint/git command
const SCREENSHOTS_DIR = path.join(DATA_DIR, 'screenshots');         // agent-captured run-mode screenshots
const ACTION_LOG_FILE = path.join(DATA_DIR, 'action-log.jsonl');   // append-only activity ledger (one JSON action per line)

for (const d of [DATA_DIR, CHATS_DIR, ATTACH_DIR, DOCS_DIR, SCREENSHOTS_DIR]) fs.mkdirSync(d, { recursive: true });
// Generate the hook settings file (absolute path to the guard) so every `claude -p`
// spawn hard-blocks dangerous Buildprint CLI commands (apply-to-live, --force-apply,
// sync --reset, data delete, …) regardless of what the model tries.
try {
  fs.writeFileSync(BP_GUARD_SETTINGS, JSON.stringify({
    hooks: {
      // PreToolUse: hard-block dangerous commands. PostToolUse: append every
      // buildprint/git command the agent runs to the action log (audit trail for rollback).
      PreToolUse: [{ matcher: 'Bash', hooks: [{ type: 'command', command: `node "${BP_GUARD_JS}"` }] }],
      PostToolUse: [{ matcher: 'Bash', hooks: [{ type: 'command', command: `node "${BP_LOG_JS}" "${ACTION_LOG_FILE}"` }] }],
    },
  }, null, 2));
} catch (e) { console.error('bp-guard settings write failed:', e.message); }

// ---- action log: append-only ledger of everything the user/agent does, so a
// later "when did I do X / roll back to before it" question can be answered from
// the record. UI-driven actions are logged here directly; buildprint/git commands
// run inside a bp chat are logged automatically by the PostToolUse hook (bp-log.js).
function logAction(entry) {
  try {
    const now = new Date();
    const line = JSON.stringify({
      ts: now.getTime(),
      iso: now.toISOString(),
      source: entry.source || 'app',      // 'app' (UI action) | 'agent' (CLI via hook)
      type: entry.type || 'action',       // chat | bp-chat | module-update | ingest | prompt-gen | settings | plan | savepoint | apply | data | cli | rollback
      summary: (entry.summary || '').toString().slice(0, 400),
      chatId: entry.chatId || null,
      branch: entry.branch || null,
      savepoint: entry.savepoint || null, // reference to restore "before this action" when known
      meta: entry.meta || null,
    });
    fs.appendFileSync(ACTION_LOG_FILE, line + '\n');
  } catch (e) { /* logging must never break the request */ }
}
function readActionLog(limit = 500, filter = {}) {
  let raw = '';
  try { raw = fs.readFileSync(ACTION_LOG_FILE, 'utf8'); } catch { return []; }
  const rows = raw.split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  let out = rows;
  if (filter.type) out = out.filter((r) => r.type === filter.type);
  if (filter.since) out = out.filter((r) => r.ts >= filter.since);
  if (filter.q) { const q = filter.q.toLowerCase(); out = out.filter((r) => (r.summary || '').toLowerCase().includes(q) || (r.type || '').toLowerCase().includes(q)); }
  return out.slice(-limit).reverse();   // newest first
}

// ---- persistent memory (never-forget) --------------------------------------
// A structured, categorized store the agent ALWAYS sees (injected into every
// system prompt) and appends to when the user says "remember this". Raw text is
// never stored verbatim — a compile pass rewrites it into atomic, categorized
// facts. Canonical = memory.json; memory.md is generated for humans + git.
const MEMORY_JSON = path.join(DATA_DIR, 'memory.json');
const MEMORY_MD = path.join(DATA_DIR, 'memory.md');
const MEMORY_CATEGORIES = ['Preferences', 'Product', 'Decisions', 'People', 'Technical', 'Workflow', 'Reminders', 'Other'];
const MEMORY_TRIGGER = /\b(remember (this|that|the following)|please remember|save (this|it|that)? ?(to|in|into) memory|add (this|it|that)? ?to memory|note (this )?to (memory|self)|keep (this )?in mind|don'?t forget|make a (mental )?note|memori[sz]e)\b/i;
function loadMemory() { try { return JSON.parse(fs.readFileSync(MEMORY_JSON, 'utf8')); } catch { return []; } }
function renderMemoryMd(arr) {
  const byCat = {};
  for (const m of arr) (byCat[m.category] || (byCat[m.category] = [])).push(m);
  let out = '# CRS Brain — Memory\n\n> Persistent, structured memory the Brain always honors. Auto-written when you say "remember this"; safe to edit by hand. Canonical copy is `memory.json`.\n\n';
  for (const cat of MEMORY_CATEGORIES) {
    const items = byCat[cat]; if (!items || !items.length) continue;
    out += `## ${cat}\n`;
    for (const m of items) out += `- **${m.title}** — ${m.fact}${m.ts ? `  _(${m.ts.slice(0, 10)})_` : ''}\n`;
    out += '\n';
  }
  return out;
}
function saveMemoryArr(arr) {
  fs.writeFileSync(MEMORY_JSON, JSON.stringify(arr, null, 2));
  try { fs.writeFileSync(MEMORY_MD, renderMemoryMd(arr)); } catch {}
}
// Compact rendering injected into every system prompt so the agent always honors it.
function memoryForPrompt() {
  const arr = loadMemory();
  if (!arr.length) return '';
  const lines = arr.map((m) => `- [${m.category}] ${m.title}: ${m.fact}`);
  return 'PERSISTENT MEMORY — the user asked you to ALWAYS remember and honor these. Consider them before any action or answer; if one conflicts with the current request, surface the conflict instead of silently ignoring it:\n' + lines.join('\n');
}
function withMemory(base) { const m = memoryForPrompt(); return m ? (base + '\n\n' + m) : base; }
function looksLikeSecret(s) { return /\b(bp_[A-Za-z0-9]{6,}|sk-[A-Za-z0-9]{10,})\b|\b(password|passwd|secret|api[_-]?key|token)\b\s*[:=]\s*\S+/i.test(s || ''); }
// Add compiled entries; dedup by (category + normalized title) → update in place.
function addMemories(entries) {
  const arr = loadMemory();
  const added = [];
  const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  for (const e of (entries || [])) {
    const category = MEMORY_CATEGORIES.includes(e.category) ? e.category : 'Other';
    const title = (e.title || '').toString().trim().slice(0, 120);
    const fact = (e.fact || '').toString().trim().slice(0, 600);
    if (!fact || !title) continue;
    if (looksLikeSecret(fact) || looksLikeSecret(title)) continue;   // never store secrets
    const hit = arr.find((m) => m.category === category && norm(m.title) === norm(title));
    if (hit) { hit.fact = fact; hit.ts = new Date().toISOString(); added.push(hit); }
    else { const m = { id: crypto.randomUUID().slice(0, 8), category, title, fact, ts: new Date().toISOString() }; arr.push(m); added.push(m); }
  }
  if (added.length) saveMemoryArr(arr);
  return added;
}
// Reinforcement system prompt. The real control is the user-message directive
// below — and running from a NEUTRAL cwd so the repo's CLAUDE.md isn't auto-loaded
// (that context made the model editorialize "already documented" instead of extract).
const MEMORY_COMPILE_PROMPT = 'You are a strict information-extraction function. You do not chat, use tools, or judge whether facts are already known — you only transform the input note into a JSON array of memory entries and output nothing else.';
// Run a fast, focused compile pass and persist the result. Returns the saved entries.
async function compileMemory(userText) {
  try {
    const cfg = loadSettings();
    const instruction =
      'Extract the durable fact(s) the user wants remembered from the NOTE below. ' +
      'Output ONLY a JSON array — no prose, no explanation, no markdown, no code fences. ' +
      'Do NOT judge whether a fact is already documented elsewhere; just extract what the note asks to remember. ' +
      'Split unrelated facts into separate items; rewrite each in your own words (never copy verbatim); resolve relative dates to absolute; skip any password/token/secret. ' +
      'Each item: {"category": one of ' + MEMORY_CATEGORIES.join('|') + ', "title": "a <=8-word label", "fact": "one or two self-contained specific sentences"}. ' +
      'Category guide: Preferences = how the user wants things done; Product = CRS facts/scope; Decisions = choices made; Technical = implementation details; Workflow = process/tooling; People = person facts; Reminders = time-bound notes. ' +
      'If the note truly contains nothing durable to remember, output [].\n\nNOTE:\n<<<\n' + (userText || '') + '\n>>>';
    const res = await runClaudeStream(instruction, null, {}, { model: cfg.model, effort: 'low', systemPrompt: MEMORY_COMPILE_PROMPT, cwd: os.tmpdir() });
    const txt = (res.text || '').trim();
    const match = txt.match(/\[[\s\S]*\]/);
    if (!match) return [];
    const arr = JSON.parse(match[0]);
    return Array.isArray(arr) ? addMemories(arr) : [];
  } catch { return []; }
}

// ---- wishlist (Brain-app improvement todos, managed in the UI) --------------
// Canonical JSON the Wishlist page edits; WISHLIST.md is regenerated for humans/git.
const WISHLIST_JSON = path.join(DATA_DIR, 'wishlist.json');
const WISHLIST_MD = path.join(BRAIN_DIR, 'WISHLIST.md');
const WISHLIST_SECTIONS = ['Bubble platform awareness', 'App features / UX', 'Automation / agent behavior'];
const WL_STATUS = ['idea', 'in-progress', 'done'];
const WL_PRIO = ['P1', 'P2', 'P3', ''];
function seedWishlist() {
  return {
    sections: WISHLIST_SECTIONS,
    items: [
      { id: 'w-forum', section: 'Bubble platform awareness', title: 'Daily Bubble forum check', priority: 'P1', status: 'idea',
        detail: "Once a day, scan the Bubble forum and update the brain's Bubble-forum documents (brain/bubble/) with anything new/relevant (plugins, gotchas, patterns, breaking changes). Append to a dated digest, not overwrite." },
      { id: 'w-relnotes', section: 'Bubble platform awareness', title: 'Track bubble.io/release-notes', priority: 'P1', status: 'idea',
        detail: "Watch the release-notes page; when something lands that affects how CRS is built, record it in a brain reference (e.g. brain/bubble/release-notes.md) and flag it if it changes a locked decision or unblocks a feature.\n\nResearch + document (mechanics NOT yet verified):\n- Style swapping in conditions: swap an element's whole style inside a conditional instead of overriding each property. If true, the clean way to build the dark/light theme feature.\n- Global expressions: lots of community talk; confirm how they work and whether they help CRS." },
      { id: 'w-loops', section: 'Automation / agent behavior', title: 'Task loops with limit-aware auto-resume', priority: 'P1', status: 'idea',
        detail: "Use the full Claude subscription. Given several tasks, if the 5-hour usage limit is hit mid-run, detect it, read when it resets (from the usage/statusline data the app already captures), wait, then automatically continue the unfinished tasks. Needs a durable task queue + reset-time detection + a resumable run loop. Must still obey the Buildprint safety gate + plan -> savepoint -> apply -> check." },
      { id: 'w-bugfix', section: 'Automation / agent behavior', title: 'Auto-check + fix Bubble.io-reported issues', priority: 'P2', status: 'idea',
        detail: "Periodically pull issues Bubble reports (Issue Checker / editor / logs) and, where safe, fix them via the Buildprint CLI + brain knowledge under the guardrails (test branch, savepoint per step, check before apply). Start read-only (report issues + proposed fixes) before ever auto-applying." },
    ],
  };
}
function renderWishlistMd(doc) {
  const mark = (s) => (s === 'done' ? '[x]' : s === 'in-progress' ? '[~]' : '[ ]');
  let out = '# CRS Brain — Improvements Wishlist\n\n> Managed in the app (**Wishlist** page). This file is generated from `data/wishlist.json` — edits here are overwritten on the next save in the app.\n\n';
  out += 'Status key: `[ ]` idea · `[~]` in progress · `[x]` done · `(P1/P2/P3)` priority.\n\n---\n\n';
  for (const sec of doc.sections) {
    out += `## ${sec}\n\n`;
    const items = doc.items.filter((i) => i.section === sec && i.status !== 'done');
    if (!items.length) { out += '_(no open items)_\n\n'; continue; }
    for (const it of items) {
      out += `- ${mark(it.status)} ${it.priority ? `**(${it.priority})** ` : ''}**${it.title}**`;
      if (it.detail) out += '\n  ' + String(it.detail).split('\n').join('\n  ');
      out += '\n';
    }
    out += '\n';
  }
  const done = doc.items.filter((i) => i.status === 'done');
  out += '---\n\n## Done\n\n';
  if (!done.length) out += '_(nothing shipped yet)_\n';
  else for (const it of done) out += `- [x] **${it.title}**${it.ts ? `  _(${it.ts.slice(0, 10)})_` : ''}\n`;
  return out + '\n';
}
function saveWishlist(doc) {
  const sections = Array.isArray(doc.sections) && doc.sections.length ? doc.sections.map(String) : WISHLIST_SECTIONS.slice();
  const clean = {
    sections,
    items: (Array.isArray(doc.items) ? doc.items : []).map((it, i) => ({
      id: String(it.id || ('w-' + crypto.randomUUID().slice(0, 6))),
      section: sections.includes(it.section) ? it.section : sections[0],
      title: String(it.title || '').slice(0, 200),
      detail: String(it.detail || '').slice(0, 4000),
      priority: WL_PRIO.includes(it.priority) ? it.priority : '',
      status: WL_STATUS.includes(it.status) ? it.status : 'idea',
      order: i, ts: it.ts || new Date().toISOString(),
    })),
  };
  fs.writeFileSync(WISHLIST_JSON, JSON.stringify(clean, null, 2));
  try { fs.writeFileSync(WISHLIST_MD, renderWishlistMd(clean)); } catch {}
  return clean;
}
function loadWishlist() {
  try { const d = JSON.parse(fs.readFileSync(WISHLIST_JSON, 'utf8')); if (!Array.isArray(d.sections) || !d.sections.length) d.sections = WISHLIST_SECTIONS.slice(); return d; }
  catch { return saveWishlist(seedWishlist()); }
}

const SOUND_EVENTS = ['new-notification', 'task-complete', 'warning', 'error', 'process-start', 'connection-lost', 'connection-restored'];
const DEFAULT_SOUND_EVENTS = {
  'new-notification': 's01', 'task-complete': 's02', 'warning': 's19', 'error': 's21',
  'process-start': 's12', 'connection-lost': 's22', 'connection-restored': 's07',
};
const DEFAULT_SETTINGS = {
  model: 'claude-opus-4-8', effort: 'high', manualsCheckedAt: 0, autoRoute: false, bubbleWatch: false, bubbleCheckedAt: 0,
  theme: 'dark',                              // 'dark' | 'light'
  bpAutoTrack: true,                          // auto-track Buildprint changes into the brain
  notify: { inApp: true, sound: true, email: false, emailTo: '' },
  sounds: { volume: 80, events: { ...DEFAULT_SOUND_EVENTS } },
};
// Old 5-sound system → nearest new default (one-time migration of notify.soundName).
const OLD_SOUND_MAP = { ping: 's01', chime: 's03', pop: 's16', alert: 's19', blip: 's13', none: 'none' };
const SMTP_FILE = path.join(DATA_DIR, 'smtp.json');   // gitignored secrets store (see .gitignore)
function loadSettings() {
  let s;
  try { s = { ...DEFAULT_SETTINGS, ...JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) }; }
  catch { s = { ...DEFAULT_SETTINGS }; }
  if (!s.sounds || typeof s.sounds !== 'object') s.sounds = { volume: 80, events: { ...DEFAULT_SOUND_EVENTS } };
  s.sounds.events = { ...DEFAULT_SOUND_EVENTS, ...(s.sounds.events || {}) };
  if (s.sounds.volume == null) s.sounds.volume = 80;
  if (s.notify && s.notify.soundName) {   // migrate the retired picker
    s.sounds.events['new-notification'] = OLD_SOUND_MAP[s.notify.soundName] || 's01';
    delete s.notify.soundName;
    try { saveSettings(s); } catch {}
  }
  return s;
}
function saveSettings(s) { fs.writeFileSync(SETTINGS_FILE, JSON.stringify(s, null, 2)); }

// ---- in-app notifications (bell + inbox) + optional email --------------------
// One source of truth: an append-only JSONL store. Server events (digests,
// watchers, errors) and client UI events both post here; the header bell reads
// it. `notify.email` + `emailTo` triggers a best-effort email per notification.
const SOUNDS_DIR = path.join(DATA_DIR, 'sounds');   // rendered 16-bit PCM WAVs (committed — deterministic, cross-platform)
const NOTIF_FILE = path.join(DATA_DIR, 'notifications.jsonl');
const NOTIF_READ_FILE = path.join(DATA_DIR, 'notifications-read.json');
const NOTIF_LEVELS = ['info', 'success', 'warning', 'error'];
function readNotifications(limit = 100) {
  let lines = [];
  try { lines = fs.readFileSync(NOTIF_FILE, 'utf8').trim().split('\n').filter(Boolean); } catch { return []; }
  const out = [];
  for (const l of lines.slice(-limit)) { try { out.push(JSON.parse(l)); } catch {} }
  return out.reverse();   // newest first
}
function notifReadAt() { try { return JSON.parse(fs.readFileSync(NOTIF_READ_FILE, 'utf8')).at || 0; } catch { return 0; } }
function addNotification(n) {
  const rec = {
    id: crypto.randomUUID().slice(0, 8), ts: nowIso(),
    type: String((n && n.type) || 'general').slice(0, 40),
    level: NOTIF_LEVELS.includes(n && n.level) ? n.level : 'info',
    title: String((n && n.title) || '').slice(0, 200),
    body: String((n && n.body) || '').slice(0, 1000),
  };
  try { fs.appendFileSync(NOTIF_FILE, JSON.stringify(rec) + '\n'); } catch {}
  maybeEmailNotification(rec);
  return rec;
}
// Best-effort email: pipes through the local `sendmail` if present. No external
// deps; silently no-ops when email is off, unconfigured, or sendmail is missing.
function maybeEmailNotification(rec) {
  const s = loadSettings();
  if (!s.notify || !s.notify.email || !s.notify.emailTo) return;
  const to = String(s.notify.emailTo).trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) return;
  const bin = resolveBin('sendmail') || '/usr/sbin/sendmail';
  try { if (!fs.existsSync(bin)) return; } catch { return; }
  try {
    const child = spawn(bin, ['-t'], { stdio: ['pipe', 'ignore', 'ignore'] });
    child.on('error', () => {});
    const subject = `[CRS Brain] ${rec.title || rec.type}`;
    child.stdin.write(`To: ${to}\nSubject: ${subject}\nContent-Type: text/plain; charset=utf-8\n\n${rec.title}\n\n${rec.body}\n\n— CRS Brain (${rec.level})\n`);
    child.stdin.end();
  } catch {}
}

// ---- smart model routing (wishlist item w-modelrouting) --------------------
// Stop paying Opus prices for mechanical work. A fast, FREE keyword heuristic
// picks the cheapest capable model + effort per task; only genuine reasoning
// (architecture / security / privacy rules / debugging) escalates to Opus-high.
// Conservative by design: the DEFAULT is escalate — a task only downgrades when
// it clearly reads as mechanical, so quality is never traded for a few tokens.
const MODEL_HAIKU = 'claude-haiku-4-5-20251001';
const MODEL_SONNET = 'claude-sonnet-5';
const MODEL_OPUS = 'claude-opus-4-8';
// Reasoning work — MUST stay on Opus + high effort regardless of other signals.
const HEAVY_RE = /\b(architect\w*|design\s+(?:a|the|this)|security|privacy|permission|tenant|isolation|gdpr|threat|vulnerab|migrat\w*|refactor|debug\w*|root[-\s]?cause|why\s+(?:is|does|isn'?t)|trade[-\s]?off|decide|decision|strategy|reason|prove|audit|analy[sz]e|schema\s+change)\b/i;
// Bulk / mechanical work — safe to run cheap.
const LIGHT_RE = /\b(rename|reformat|format\w*|dedup\w*|list|bulk|copy|paste|typo|lint|sort|extract|summar\w*|rewrite|prettify|convert|boilerplate|scaffold|stub|fill\s+in|prompt\s+for|generate\s+(?:a\s+)?prompt|clipboard)\b/i;

// Classify a task string → { model, effort, reason }. hint biases the result:
//   'mechanical' forces the light path, 'reasoning' forces the heavy path.
function classifyTask(text, hint) {
  const t = String(text || '');
  if (hint === 'reasoning' || HEAVY_RE.test(t)) {
    return { model: MODEL_OPUS, effort: 'high', reason: hint === 'reasoning' ? 'reasoning task' : 'reasoning keywords' };
  }
  if (hint === 'mechanical' || (LIGHT_RE.test(t) && t.length < 600)) {
    // Very short + clearly mechanical → Haiku; longer mechanical → Sonnet for headroom.
    if (t.length < 240) return { model: MODEL_HAIKU, effort: 'low', reason: 'short mechanical task' };
    return { model: MODEL_SONNET, effort: 'low', reason: 'mechanical task' };
  }
  // Unknown / ambiguous → don't gamble on quality; use the user's configured default.
  return null;
}
// Resolve the model+effort for a task. When autoRoute is off, always the user's
// settings. When on, the classifier may downgrade; ambiguous tasks fall back to
// settings. Returns { model, effort, routed, reason }.
function routeModel(cfg, text, hint) {
  const base = { model: cfg.model || MODEL_OPUS, effort: cfg.effort || 'high' };
  if (!cfg.autoRoute) return { ...base, routed: false, reason: 'auto-route off' };
  const c = classifyTask(text, hint);
  if (!c) return { ...base, routed: false, reason: 'ambiguous — kept default' };
  return { model: c.model, effort: c.effort, routed: true, reason: c.reason };
}

// ---- live usage / rate limits (via statusline capture) --------------------
const USAGE_FILE = path.join(DATA_DIR, 'usage.json');
const CLAUDE_SETTINGS = path.join(os.homedir(), '.claude', 'settings.json');
const STATUSLINE_PATH = path.join(BRAIN_DIR, 'statusline.js');
const STATUSLINE_CMD = `node "${STATUSLINE_PATH.split(path.sep).join('/')}"`;

function loadUsage() {
  try { return JSON.parse(fs.readFileSync(USAGE_FILE, 'utf8')); } catch { return null; }
}
function readClaudeSettings() {
  try { return JSON.parse(fs.readFileSync(CLAUDE_SETTINGS, 'utf8')); } catch { return {}; }
}
function usageEnabled() {
  const s = readClaudeSettings();
  return !!(s.statusLine && /statusline\.js/.test(JSON.stringify(s.statusLine)));
}
// Merge ONLY the statusLine key; preserve everything else the user has.
function enableUsage() {
  const s = readClaudeSettings();
  s.statusLine = { type: 'command', command: STATUSLINE_CMD };
  fs.mkdirSync(path.dirname(CLAUDE_SETTINGS), { recursive: true });
  fs.writeFileSync(CLAUDE_SETTINGS, JSON.stringify(s, null, 2));
}
function disableUsage() {
  const s = readClaudeSettings();
  if (s.statusLine && /statusline\.js/.test(JSON.stringify(s.statusLine))) {
    delete s.statusLine;
    fs.writeFileSync(CLAUDE_SETTINGS, JSON.stringify(s, null, 2));
  }
}

// Fetch a fresh reading: the statusline only runs in an INTERACTIVE claude
// session, so we briefly drive one in a pseudo-terminal (node-pty), send one
// cheap Haiku turn to force an API response (which triggers the statusline →
// writes usage.json), then kill it. Requires node-pty; degrades gracefully.
let populating = false;
function populateUsage() {
  return new Promise((resolve) => {
    if (!usageEnabled()) return resolve({ ok: false, error: 'tracking not enabled' });
    let pty;
    try { pty = require('node-pty'); }
    catch { return resolve({ ok: false, error: 'node-pty not installed (run npm install in crs-brain)' }); }

    const prevUsage = loadUsage() || {};
    const before = prevUsage.at || 0;
    const beforeRLAt = prevUsage.rate_limits_at || 0;
    const isWin = process.platform === 'win32';
    // node-pty's posix_spawnp doesn't reliably resolve 'claude' via PATH — use the
    // full binary path (found via extended PATH) so the pty can exec it.
    const file = isWin ? 'cmd.exe' : (resolveBin('claude') || 'claude');
    // Use the user's DEFAULT model — don't force Haiku. Forcing a model made the
    // usage panel report that model (e.g. "Haiku 4.5") instead of what the user
    // actually runs. rate_limits are subscription-wide, so the probe model doesn't
    // change the numbers; the honest thing is to reflect their real default.
    const args = (isWin ? ['/c', 'claude'] : []);

    let term;
    try {
      term = pty.spawn(file, args, { name: 'xterm-256color', cols: 100, rows: 30, cwd: REPO_ROOT, env: process.env });
    } catch (e) { return resolve({ ok: false, error: e.message }); }

    term.onData(() => {});
    let done = false;
    // Send a cheap turn to force an API response; the statusline only emits
    // rate_limits AFTER that response. Resend a couple times in case the TUI
    // wasn't ready to accept input on the first write.
    const sendTimers = [3500, 7000, 11000].map((ms) => setTimeout(() => { try { term.write('hi\r'); } catch {} }, ms));
    const cleanup = () => {
      try {
        if (isWin && term.pid) spawn('taskkill', ['/PID', String(term.pid), '/T', '/F'], { windowsHide: true });
        else term.kill();
      } catch {}
    };
    const finish = (ok, error) => {
      if (done) return; done = true;
      sendTimers.forEach(clearTimeout); clearInterval(poll); clearTimeout(killTimer);
      cleanup();
      resolve({ ok, error, data: loadUsage() });
    };
    // Wait for a reading whose rate_limits are NEWLY read (post-response) — not the
    // session's startup render, which arrives before the first API response and so
    // carries no fresh limits. If the account never returns rate_limits (e.g. API-key
    // users), the grace fallback below still accepts the newer model/context/cost.
    let sawWrite = false;
    const poll = setInterval(() => {
      const u = loadUsage();
      if (!u || !u.at || u.at <= before) return;
      sawWrite = true;  // we captured *a* newer render
      const freshRL = u.rate_limits && (u.rate_limits.five_hour || u.rate_limits.seven_day)
        && (u.rate_limits_at || 0) > beforeRLAt;
      if (freshRL) finish(true);
    }, 700);
    // Grace fallback: if we saw a render but no fresh rate_limits within the window,
    // accept the latest reading rather than reporting failure.
    const killTimer = setTimeout(() => finish(sawWrite, sawWrite ? undefined : 'timed out waiting for a reading'), 45000);
  });
}

const PORT = process.env.CRS_BRAIN_PORT || 4317;
// Mobile/LAN mode: CRS_BRAIN_HOST=0.0.0.0 exposes the app on your network,
// gated by a PIN (CRS_BRAIN_PIN, or auto-generated and printed at startup).
// Localhost clients never need the PIN.
const HOST = process.env.CRS_BRAIN_HOST || '127.0.0.1';
const LAN = HOST !== '127.0.0.1';
// Stable PIN so phones stay logged in across Mac reboots/relaunches:
// env override → else a persisted PIN in crs-brain/.pin (gitignored, generated once).
function resolvePin() {
  if (process.env.CRS_BRAIN_PIN) return process.env.CRS_BRAIN_PIN;
  const f = path.join(__dirname, '.pin');
  try { const v = fs.readFileSync(f, 'utf8').trim(); if (/^\d{4,}$/.test(v)) return v; } catch {}
  const v = String(100000 + Math.floor(Math.random() * 900000));
  try { fs.writeFileSync(f, v); } catch {}
  return v;
}
const PIN = LAN ? resolvePin() : null;

function isLocalReq(req) {
  const a = req.socket.remoteAddress || '';
  return a === '127.0.0.1' || a === '::1' || a === '::ffff:127.0.0.1';
}
function pinOk(req) {
  if (!LAN || isLocalReq(req)) return true;
  const cookies = Object.fromEntries((req.headers.cookie || '').split(';').map((c) => c.trim().split('=')));
  return cookies.crsbrain === PIN;
}
const PIN_PAGE = (wrong) => `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1">
<body style="margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#181818;font-family:Inter,-apple-system,sans-serif">
<form method="GET" action="/" style="text-align:center">
<div style="width:46px;height:46px;border-radius:12px;background:#3B82F6;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px">🧠</div>
<div style="color:#E0E0E0;font-size:16px;font-weight:600;margin-bottom:4px">CRS Brain</div>
<div style="color:#6B6B6B;font-size:12px;margin-bottom:14px">${wrong ? 'Wrong PIN — try again' : 'Enter the PIN shown in the Mac terminal'}</div>
<input name="pin" inputmode="numeric" autofocus style="background:#242424;border:1px solid #333;border-radius:8px;color:#E0E0E0;padding:12px 14px;font-size:18px;text-align:center;letter-spacing:6px;width:170px;outline:none">
</form></body>`;

function lanIps() {
  const out = [];
  for (const ifs of Object.values(os.networkInterfaces()))
    for (const i of ifs || []) if (i.family === 'IPv4' && !i.internal) out.push(i.address);
  return out;
}

// Which files the brain lists in the file browser.
// True binaries with no in-app handling — hidden from the file tree (blacklist).
const DENY_EXT = new Set(['.exe', '.dll', '.node', '.pyc', '.obj', '.lib', '.pdb', '.so', '.dylib']);
const UPLOAD_MAX = 100 * 1024 * 1024;   // per-file cap for OS-interop uploads & zip members
const ALLOWED_EXT = new Set([
  '.md', '.txt', '.json', '.html', '.css', '.py', '.js', '.csv', '.yml', '.yaml',
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp',
]);
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']);
const IGNORE_DIRS = new Set(['.git', 'node_modules', '.claude', 'crs-brain/node_modules']);

// System steer for the brain assistant.
const SYSTEM_PROMPT = [
  'You are "CRS Brain", the persistent assistant for Vlad\'s CRS (Casino Reporting Suite) project.',
  'You run inside a local second-brain app. The project root is this working directory.',
  'Your job: help track progress, remember decisions, and answer "what is next / what is missing".',
  'RETRIEVAL: the knowledge base lives in brain/. ALWAYS read brain/INDEX.md first — it maps every',
  'domain (database, option-sets, security, workflows, migrations, design) to its file and its',
  'authoritative sources. Jump straight to the mapped file/section instead of grepping the repo.',
  'BUILDPRINT: any question about how Buildprint works (modes, agents, prompts, snapshots, limits,',
  'troubleshooting) → brain/buildprint/INDEX.md routes to the scraped official manual. Project rules',
  'in decisions.md 2026-05-01 (dev-branch-only, Plan-mode-first) override generic docs advice.',
  'BUBBLE: any question about how Bubble itself works (data, privacy rules, workflows, API, elements,',
  'workload, security, performance) → brain/bubble/INDEX.md — the COMPLETE official manual (583 pages,',
  'verbatim) lives locally under brain/bubble/. Cite the exact page file when answering.',
  'OPERATING BUILDPRINT: you can run the Buildprint CLI directly via Bash (buildprint …) — it turns',
  'Bubble branches into editable files (sync → edit → check → apply). BEFORE any operation read',
  'brain/buildprint/crs-brain-operations.md and obey its HARD GUARDRAILS: dev/test branch only (never',
  'live), always sync first, check must pass, never --force-apply/--no-check/sync --reset without the',
  'user approving in this conversation, show the plan before the first apply, ingest results into brain/',
  'afterwards. If the CLI is not linked yet, say so and point at the Connection status checklist.',
  'FORUM: community patterns/workarounds → brain/bubble-forum/ (87 curated threads). For topics not',
  'covered there, you may search LIVE via WebFetch: https://forum.bubble.io/search.json?q=<query>+in:solved',
  'then fetch https://forum.bubble.io/t/<topic_id>.json — always label forum content as community advice',
  '(not official), cite the thread URL, and prefer the official manual when they conflict.',
  'You have full read/write access to the repo. Ground every answer in the actual files',
  '(brain/, CLAUDE.md, decisions.md, design/, data/, specs/, and any *.md the user adds). Never fabricate modules or facts.',
  'The progress board lives at crs-brain/data/progress.json. When the user asks you to update progress,',
  'record what is next, or note something missing, READ that file, then EDIT it (keep the same JSON shape),',
  'and briefly confirm what you changed. Be direct and concise, per the project\'s CLAUDE.md style.',
  'VISUAL ANSWERS: when a picture beats prose (prototypes, diagrams, dashboards, comparisons), CREATE a',
  'self-contained .html or .svg file under crs-brain/data/docs/ (use design/tokens.css values) and put its',
  'repo-relative path in your reply — the app makes file paths clickable and renders images inline.',
  'Always mention exact repo file paths when you reference project files, so the user can click them.',
].join(' ');

// Extra steer for Ingest mode (📥): route a Buildprint/session report into brain/.
const INGEST_PROMPT = [
  'INGEST MODE. The attached file(s) are a work report (usually from a Buildprint session in Bubble).',
  'Follow the ingest rules in brain/INDEX.md exactly:',
  '1) Read the report fully. 2) Route every fact into exactly ONE brain/ file',
  '(database.md, option-sets.md, security.md, workflows.md, migrations.md, design.md pointer rules).',
  'Update "Current state" and "Pending" sections; move completed items appropriately; never silently delete history.',
  '3) If the report contains an architectural/commercial DECISION, do NOT write it into brain/ —',
  'flag it to the user to append to decisions.md.',
  '4) Append one dated entry to brain/changelog.md summarizing this ingest.',
  '5) Update crs-brain/data/progress.json if the report changes what is now/next/done.',
  '6) Reply with a compact "what I updated" list, file by file, plus anything the report left ambiguous.',
].join(' ');

// ---- Buildprint copilot (right-panel chat) ---------------------------------
// Detect the cloned Bubble workspace (app root has .buildprint/, branch is a subdir).
function findBpWorkspace() {
  const root = path.join(os.homedir(), 'projects', 'crs-bubble');
  try {
    for (const app of fs.readdirSync(root)) {
      const appDir = path.join(root, app);
      if (!fs.existsSync(path.join(appDir, '.buildprint'))) continue;
      // HARD GUARDRAIL: only ever operate on the test/dev branch clones. No fallback
      // to "whatever subdir exists" — that could silently select a live-branch clone.
      for (const b of ['test', 'dev']) {
        const w = path.join(appDir, b);
        if (fs.existsSync(w)) return { app, branch: b, dir: w };
      }
    }
  } catch {}
  return null;
}
const BP_CHAT_FILE = path.join(DATA_DIR, 'buildprint', 'chat.json');
fs.mkdirSync(path.dirname(BP_CHAT_FILE), { recursive: true });
function loadBpChat() {
  try { return JSON.parse(fs.readFileSync(BP_CHAT_FILE, 'utf8')); }
  catch { return { sessionId: null, messages: [] }; }
}
function saveBpChat(c) { fs.writeFileSync(BP_CHAT_FILE, JSON.stringify(c, null, 2)); }

const BP_PROMPT = (ws) => [
  'You are the CRS Brain BUILDPRINT COPILOT. You operate the CRS Bubble app directly via the Buildprint CLI',
  `so Vlad never needs the Buildprint website. Your working directory IS the cloned branch workspace: ${ws.dir}`,
  `(app "${ws.app}", branch "${ws.branch}"). Bubble structure lives here as editable files (data_types/,`,
  'pages/, option_sets/, styles/, api/, settings/…).',
  'THE LOOP (follow it exactly): (0) `buildprint sync` FIRST (pull the latest Bubble snapshot). (1) PLAN the',
  'change as numbered steps and get Vlad\'s go-ahead before any apply. (2) Then execute ONE step at a time —',
  'for EACH step: create a savepoint (`buildprint savepoint`, named for the step) → `buildprint apply` →',
  '`buildprint check`. A savepoint before every apply so each step is independently rollback-able; if check',
  'reports a problem, STOP and fix it or restore that savepoint before continuing. NEVER bundle multiple steps',
  'into one apply. Useful: `buildprint audit` (security scan), `buildprint sync status`,',
  '`buildprint savepoint list` / `restore`, `buildprint changelog <a> <b>`.',
  'HARD GUARDRAILS (from brain/buildprint/crs-brain-operations.md and decisions.md 2026-05-01):',
  '(1) TEST branch only — NEVER live. (2) Always sync before working. (3) Savepoint before every apply; run check after every apply.',
  '(4) NEVER use --force-apply / --no-check / sync --reset without Vlad approving in THIS chat.',
  '(5) Before the FIRST apply of a request, state the exact plan (files/entities + expected Bubble effect)',
  'and get Vlad\'s go-ahead. (6) Pattern A: every business Data Type needs company + property fields and a',
  'privacy rule checking BOTH. (7) If anything looks off (stale branch, conflicts, suspicious shrink) — STOP',
  'and surface it.',
  'AFTER applying changes, write a short summary into the CRS repo brain/ files (database.md / security.md /',
  `workflows.md / changelog.md at ${REPO_ROOT}/brain/) so the ledger stays current.`,
  'ACTION LOG & ROLLBACK — every buildprint/git command you run is auto-recorded (timestamp, savepoint label,',
  `branch) to the JSONL ledger at ${REPO_ROOT}/crs-brain/data/action-log.jsonl. Because you create a savepoint`,
  'before every apply, that ledger is the index of restore points. TWO things Vlad will ask:',
  '(a) "when did I do X / what happened around <time>?" → Read or Grep that action-log.jsonl file, find the',
  'matching action(s), and report the timestamp, what ran, the branch, and the savepoint taken just before it.',
  '(b) "roll back to before <that action>" → find that action in the log and the savepoint created just before',
  'it (or the nearest earlier savepoint); confirm the exact target with Vlad; then `buildprint savepoint list`',
  'to get the precise ref and `buildprint savepoint restore <ref>` on the TEST branch, then `buildprint sync`.',
  'BE HONEST about scope: savepoint-restore reverts app STRUCTURE/workflows on the test branch. It does NOT',
  'undo database record writes (Buildprint data tools cannot delete Things). If the action that broke things',
  'was a DATA write (e.g. created records), say so plainly and offer to list the exact records so Vlad can',
  'remove them in Bubble or restore a Bubble app-data backup — do not claim the data is rolled back when it is',
  'not. Give savepoints descriptive names ("Before <module> <step>") since those names appear in the log.',
  'TOOLS YOU HAVE: the Buildprint CLI (via Bash), Node and Python (via Bash, for LOCAL computation), plus',
  'Read / Grep / Glob / WebFetch / WebSearch and the Buildprint MCP tools. SPEED — this matters: for any',
  'selection / dedup / filtering / aggregation over the synced JSON files, write ONE short Node or Python',
  'script that reads the files and computes the answer, instead of dozens of sequential `buildprint` queries',
  '(that is why runs feel slow). Apply changes to Bubble ONLY through the `buildprint` CLI — never use a',
  'script to call Bubble or to bulk-delete files. A hard safety gate blocks dangerous commands (apply-to-live,',
  '--force-apply, --no-check, sync --reset, data delete, rm -rf, git reset --hard) — do not attempt them.',
  'VISUAL VERIFICATION — you CAN see the app and MUST use it to verify UI work before calling it done:',
  `- Anonymous: \`buildprint screenshot "<path>" --output "${SCREENSHOTS_DIR}/<name>.png"\`.`,
  `- As a real user (their theme + permissions): \`buildprint screenshot <testuser-email> "<path>" --output "${SCREENSHOTS_DIR}/<name>.png"\` (run \`buildprint login <email>\` first if it needs the Agent Browser session).`,
  '- BOTH themes: set that user\'s `theme_is_dark` via `buildprint data` (yes=dark, no=light), screenshot each, then set it back.',
  '- `--viewport mobile` / `tablet` to check responsive.',
  `Then READ the PNG (you see images) to inspect it, and when it helps the user, EMBED it in your reply as \`![what it shows](crs-brain/data/screenshots/<name>.png)\` — the chat renders it inline. Report what you SAW (pass/fail per item), not just that you captured it.`,
  'INTERACTIVE checks (click a flow, verify behavior, read console/errors): use `agent-browser` — `agent-browser open <run-mode-url>`, `agent-browser snapshot -i` (clickable refs), click/fill via refs, `agent-browser console` / `errors`. If either `buildprint screenshot` or `agent-browser` reports "agent-browser not found", tell Vlad it needs a one-time install (`npm install -g agent-browser`) — do not try to work around it.',
  'RESPONSE FORMAT (important — keep replies readable, not walls of text): put your step-by-step reasoning in',
  'your THINKING, not the final message. Write each reply as clean, scannable Markdown: open with a ONE-LINE',
  'outcome, then short `##` sections with bullet points and small tables. Bold the load-bearing facts (entity',
  'names, ids, counts). Keep prose to 1–2 short sentences per point. Never dump a long run-on paragraph.',
  'When you make changes, end with a compact "What changed / Result / Next" summary.',
  'Be concise and direct (CLAUDE.md style). When the user just asks about progress/status, answer from the',
  'workspace + brain/ without running mutating commands.',
].join(' ');

// ---- Buildprint → Brain tracking -------------------------------------------
// Sync the workspace from Bubble, diff the snapshot, and have the brain update
// its ledger files to reflect whatever changed in Buildprint (site/agent/editor).
const BP_TRACK_FILE = path.join(DATA_DIR, 'buildprint', 'last-tracked.txt');
const BP_TRACK_PROMPT = [
  'BUILDPRINT → BRAIN SYNC. The user just made changes to the CRS Bubble app in Buildprint. The changed',
  'files are listed in the message (git name-status). They live under your cwd (the cloned Test branch).',
  'READ the changed files you need, then UPDATE the CRS brain ledger to reflect reality —',
  `write to files under ${REPO_ROOT}/brain/:`,
  'data_types/* → database.md (fields/types, company+property presence) AND security.md (privacy_role rules & gaps);',
  'option_sets/* → option-sets.md; styles/* → design.md (colors, fonts, tokens — but design/tokens.css is the source',
  'of truth, so note deltas as pointers); pages/*/workflows → workflows.md; settings/* → the right file.',
  'Move items from "Pending" to "Current state" when they are now built. Append ONE dated entry to changelog.md.',
  'Cite exact Bubble entity names. Reflect ONLY real changes shown in the diff — never invent. Respect Pattern A',
  '(company + property + both-field privacy rule on every business DT) and flag any changed DT that violates it.',
  'End with a short "Brain updated:" list, file by file, plus anything that needs Vlad\'s decision.',
].join(' ');

// ---- Build packets (plan → Buildprint prompt pipeline) ----------------------
// A "build packet" is the missing artifact between an idea and a Buildprint
// prompt: an ordered list of one-session-sized steps for ONE module, each step
// carrying enough structure (entities/detail/constraints/verify) to expand into
// a guardrail-hardened Buildprint prompt. Stored in data/plans.json.
const PLANS_FILE = path.join(DATA_DIR, 'plans.json');
const STEP_STATUSES = ['pending', 'prompted', 'applied', 'verified', 'ingested'];
function seedPlans() {
  return {
    activePacket: 'inventory',
    packets: [{
      id: 'inventory',
      module: 'Inventory',
      title: 'Plan-mode inventory of the real Bubble app (prerequisite)',
      createdAt: nowIso(), updatedAt: nowIso(),
      steps: [{
        id: 'inv-1',
        title: 'Inventory the actual Bubble state on test',
        entities: 'ALL data_types/, option_sets/, pages/*/workflows, settings/privacy — READ-ONLY',
        detail: 'Sync the test branch, then produce a complete inventory of what actually exists in Bubble today: every Data Type with its fields (flagging which lack company/property), every Option Set with counts, every privacy rule (flagging company-only rules), and legacy workflows worth keeping or deleting. NO edits, NO apply — this is discovery.',
        constraints: 'Read-only session. Do not modify or apply anything.',
        verify: 'Inventory written into brain/database.md, brain/option-sets.md, brain/security.md ("Current state" sections) + one dated brain/changelog.md entry. Everything in brain/ stops being spec-only.',
        status: 'pending', chatId: null, promptedAt: null,
      }],
    }],
  };
}
function loadPlans() {
  try { return JSON.parse(fs.readFileSync(PLANS_FILE, 'utf8')); }
  catch { const s = seedPlans(); try { fs.writeFileSync(PLANS_FILE, JSON.stringify(s, null, 2)); } catch {} return s; }
}
function savePlans(p) { fs.writeFileSync(PLANS_FILE, JSON.stringify(p, null, 2)); }
function validPlans(body) {
  if (!body || !Array.isArray(body.packets)) return 'packets must be an array';
  for (const pk of body.packets) {
    if (!pk || typeof pk.module !== 'string' || !Array.isArray(pk.steps)) return 'every packet needs module + steps[]';
    for (const st of pk.steps) if (!st || !STEP_STATUSES.includes(st.status)) return `step status must be one of ${STEP_STATUSES.join('|')}`;
  }
  return null;
}

// System prompt for packet generation: grounded in the ledger, locked to the
// real module list, output strictly JSON.
const PLAN_GEN_PROMPT = [
  'You generate a BUILD PACKET for one module of the CRS Bubble app. A build packet is an ordered list of',
  'build steps, each sized to exactly ONE Buildprint session (one bounded change set).',
  'FIRST read: brain/INDEX.md, brain/database.md, brain/option-sets.md, brain/security.md, decisions.md',
  '(architecture entries), CLAUDE.md (locked rules, naming, sections), crs-brain/data/progress.json,',
  'crs-brain/data/ideas.json. If the cloned Bubble workspace is in your context (an added directory with',
  'data_types/, option_sets/, pages/), ALSO check the LIVE state there — what actually exists in Bubble',
  'right now (each data_types/<x>/type.json lists fields + privacy_role; note "deleted": true relics).',
  'Where brain/ and the workspace disagree, trust the workspace and flag the drift in the step detail.',
  'Ground every step in what those files actually say — never invent modules,',
  'fields, or features. The module MUST be one of the locked 46 modules (authoritative: the Bubble Option Set,',
  'mirrored in data/CRS_Module_OptionSets.xlsx and the section lists in CLAUDE.md). If the requested module is',
  'not one of them, output {"error":"<why>"} and nothing else.',
  'STEP ORDER: discovery (what exists now, read-only) → data types + option sets → privacy rules → backend/',
  'page workflows → UI (pages/reusables per the naming rules) → verification. Merge or drop stages that the',
  'ledger shows are already done. 3-7 steps total; each step must be completable in one focused session.',
  'EVERY step that creates or modifies a Data Type MUST state: company + property fields required, plus a',
  'privacy rule checking Current User\'s company = This Thing\'s company AND Current User\'s property = This',
  'Thing\'s property (Pattern A) — or cite the decisions.md exception that exempts it.',
  'OUTPUT: ONLY a JSON object, no prose, no code fences: {"title": "<packet title>", "steps": [{"title": str,',
  '"entities": "<exact Bubble entities touched: DT/OS/page/workflow names>", "detail": "<what to build and the',
  'expected Bubble behavior>", "constraints": "<what must NOT change>", "verify": "<observable success criteria>"}]}',
].join(' ');

// Expand one packet step into a guardrail-hardened Buildprint prompt.
// Pure template — no LLM call. All crs-brain-operations.md rules baked in.
function bpStepPrompt(packet, step) {
  const ws = findBpWorkspace();
  const wsLine = ws ? `workspace ${ws.dir} (app "${ws.app}", branch "${ws.branch}")` : 'workspace ~/projects/crs-bubble/<app>/test';
  return [
    `BRANCH: test — ${wsLine}. TEST ONLY. Never reference or touch the live branch.`,
    '',
    `MODULE: ${packet.module}`,
    `TASK (one bounded change — do not combine unrelated work): ${step.title}`,
    `TARGET ENTITIES: ${step.entities || '(state them in your plan)'}`,
    `EXPECTED BEHAVIOR: ${step.detail || ''}`,
    `DO NOT CHANGE: ${step.constraints || 'anything outside the entities above; no live data; no auth/payment flows'}`,
    '',
    'PROCESS (mandatory):',
    '1. Run `buildprint sync` FIRST — editor changes are invisible until synced.',
    '2. PLAN FIRST: inspect the current state, then state your exact plan (files/entities to change + expected Bubble effect) and STOP for my go-ahead before any apply.',
    '3. After approval: edit → `buildprint check` (must pass) → `buildprint apply`.',
    '4. FORBIDDEN without my explicit approval in this chat: --force-apply, --no-check, sync --reset.',
    '',
    "SCHEMA INVARIANT (Pattern A): every business Data Type created or modified gets `company` AND `property` fields and a privacy rule checking Current User's company = This Thing's company AND Current User's property = This Thing's property. Never company-only. Exceptions only if listed in decisions.md.",
    'UI RULES: naming prefixes per CLAUDE.md (#PP - / #GR - / #FG -), styles from design/tokens.css only, every search/RG constrained by Current User\'s property.',
    'NOTE: Buildprint edits app STRUCTURE only (schema, option sets, workflows, pages, styles) — if this task implies editing database records, stop and tell me.',
    '',
    `SUCCESS CRITERIA: ${step.verify || 'state them in your plan'}`,
    'CLOSE-OUT: report exactly what changed (entity by entity) so it can be ingested into brain/.',
  ].join('\n');
}

function runBuildprint(args, ws) {
  return new Promise((resolve) => {
    const c = spawn('buildprint', args, { cwd: ws.dir });
    let out = '', err = '';
    c.stdout.on('data', (d) => (out += d)); c.stderr.on('data', (d) => (err += d));
    c.on('error', (e) => resolve({ ok: false, out: '', err: e.message }));
    c.on('close', (code) => resolve({ ok: code === 0, out: out.trim(), err: err.trim() }));
  });
}
function bpGit(ws, args) {
  return new Promise((resolve) => {
    const c = spawn('git', args, { cwd: ws.dir });
    let out = '', err = '';
    c.stdout.on('data', (d) => (out += d)); c.stderr.on('data', (d) => (err += d));
    c.on('error', () => resolve({ ok: false, out: '', err: 'git missing' }));
    c.on('close', (code) => resolve({ ok: code === 0, out: out.trim(), err: err.trim() }));
  });
}
// Sync + diff. Returns {ok, first, changed:[name-status lines], base, head} or {error}.
async function bpSyncDiff() {
  const ws = findBpWorkspace();
  if (!ws) return { error: 'workspace not found' };
  await runBuildprint(['sync'], ws);   // pull latest Bubble snapshot into the worktree
  const head = (await bpGit(ws, ['rev-parse', 'HEAD'])).out;
  if (!head) return { error: 'could not read workspace HEAD' };
  let base = null;
  try { base = fs.readFileSync(BP_TRACK_FILE, 'utf8').trim(); } catch {}
  if (!base || !/^[0-9a-f]{7,}$/.test(base)) {
    fs.writeFileSync(BP_TRACK_FILE, head);
    return { ok: true, first: true, ws, head };
  }
  const ns = (await bpGit(ws, ['diff', '--name-status', base, head])).out;
  const changed = ns ? ns.split('\n').filter(Boolean) : [];
  return { ok: true, first: false, ws, base, head, changed };
}

// ---- Bubble app state (parsed from the cloned Buildprint workspace) ---------
// Turns the workspace files into a structured entity map the UI can browse:
// data types (fields, privacy roles, Pattern A flags), option sets, pages, styles.
function readJson(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; } }
function bubbleState() {
  const ws = findBpWorkspace();
  if (!ws) return { ready: false };
  const st = { ready: true, app: ws.app, branch: ws.branch, syncedAt: null, dataTypes: [], optionSets: [], pages: [], styles: [] };
  try { // last sync time = last commit touching the workspace
    st.syncedAt = execFileSync('git', ['log', '-1', '--format=%cI'], { cwd: ws.dir }).toString().trim() || null;
  } catch {}
  // data types
  try {
    for (const slug of fs.readdirSync(path.join(ws.dir, 'data_types'))) {
      const j = readJson(path.join(ws.dir, 'data_types', slug, 'type.json'));
      if (!j) continue;
      const fields = Object.entries(j.fields || {}).map(([key, f]) => ({ key, display: f.display || key, type: f.value || '?', comment: f.comment || null }));
      const names = new Set(fields.map((f) => (f.display || '').toLowerCase()));
      const roles = Object.values(j.privacy_role || {}).map((r) => r.display || '?');
      st.dataTypes.push({
        slug, display: j.display || slug, deleted: !!j.deleted, exposedApi: !!j.exposed_api,
        fields, fieldCount: fields.length,
        privacyRoles: roles, privacyCount: roles.length,
        hasCompany: names.has('company'), hasProperty: names.has('property'),
      });
    }
    st.dataTypes.sort((a, b) => (a.deleted - b.deleted) || a.display.localeCompare(b.display));
  } catch {}
  // option sets
  try {
    for (const slug of fs.readdirSync(path.join(ws.dir, 'option_sets'))) {
      const j = readJson(path.join(ws.dir, 'option_sets', slug, 'option-set.json'));
      if (!j) continue;
      const values = Object.values(j.values || {})
        .sort((a, b) => (a.sort_factor || 0) - (b.sort_factor || 0))
        .map((v) => ({ display: v.display || '?', dbValue: v.db_value ?? null }));
      st.optionSets.push({ slug, display: j.display || slug, deleted: !!j.deleted, values, count: values.length });
    }
    st.optionSets.sort((a, b) => (a.deleted - b.deleted) || a.display.localeCompare(b.display));
  } catch {}
  // pages (+ workflow / element counts)
  try {
    for (const slug of fs.readdirSync(path.join(ws.dir, 'pages'))) {
      const j = readJson(path.join(ws.dir, 'pages', slug, 'page.json'));
      if (!j) continue;
      let wf = 0, el = 0;
      try { wf = fs.readdirSync(path.join(ws.dir, 'pages', slug, 'workflows')).length; } catch {}
      try { el = fs.readdirSync(path.join(ws.dir, 'pages', slug, 'elements')).length; } catch {}
      st.pages.push({ slug, name: j.name || slug, workflows: wf, elements: el });
    }
    st.pages.sort((a, b) => a.name.localeCompare(b.name));
  } catch {}
  // styles (names only)
  try { st.styles = fs.readdirSync(path.join(ws.dir, 'styles')).filter((n) => !n.startsWith('.')).sort(); } catch {}
  return st;
}

// ---- helpers ---------------------------------------------------------------
function send(res, code, body, headers = {}) {
  const data = typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', ...headers });
  res.end(data);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 5 * 1024 * 1024) reject(new Error('body too large'));
    });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

// Guard against path traversal: resolve under REPO_ROOT only.
function safeRepoPath(rel) {
  const abs = path.resolve(REPO_ROOT, rel || '');
  if (abs !== REPO_ROOT && !abs.startsWith(REPO_ROOT + path.sep)) {
    throw new Error('path outside repo');
  }
  return abs;
}

function walk(dir, baseRel = '') {
  const out = [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  entries.sort((a, b) => {
    if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  for (const e of entries) {
    const rel = baseRel ? `${baseRel}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (IGNORE_DIRS.has(e.name) || IGNORE_DIRS.has(rel)) continue;
      const children = walk(path.join(dir, e.name), rel);
      out.push({ type: 'dir', name: e.name, path: rel, children });   // include empty dirs (explorer needs new/empty folders to show)
    } else {
      const ext = path.extname(e.name).toLowerCase();
      // Blacklist, not whitelist: the explorer must show what's really there
      // (pdf/xlsx/docx/extension-less included). Only unhandleable binaries and
      // build junk are hidden. ALLOWED_EXT still filters the app's other views.
      if (DENY_EXT.has(ext)) continue;
      let size = 0, mtime = 0, ctime = 0;
      try { const st = fs.statSync(path.join(dir, e.name)); size = st.size; mtime = st.mtimeMs; ctime = st.birthtimeMs || 0; } catch {}
      out.push({ type: 'file', name: e.name, path: rel, ext, size, mtime, ctime });
    }
  }
  return out;
}

// ---- claude bridge ---------------------------------------------------------
// Spawn the claude CLI WITHOUT a shell: shell:true concatenates args unescaped,
// so any "(" in a system prompt becomes a /bin/sh syntax error. On Windows the
// cmd.exe /c wrapper resolves the claude.cmd shim while node quotes args safely.
function spawnClaude(args, opts = {}) {
  if (process.platform === 'win32') {
    return spawn('cmd.exe', ['/c', 'claude', ...args], { windowsHide: true, ...opts });
  }
  return spawn('claude', args, opts);   // PATH extended at startup
}
// Turn a tool_use input object into readable lines for the work-block body,
// so "Reading / Building / Working" cards show WHAT the tool did (which file,
// which command, which pattern) instead of an empty "(no details)".
function formatToolInput(name, input) {
  const p = input && typeof input === 'object' ? input : {};
  const order = ['description', 'file_path', 'path', 'pattern', 'glob', 'command',
    'url', 'prompt', 'query', 'old_string', 'new_string', 'content'];
  const fmt = (k, v) => {
    let s = typeof v === 'string' ? v : JSON.stringify(v);
    if (s.length > 800) s = s.slice(0, 800) + ' …';
    return `${k}: ${s}`;
  };
  const seen = new Set();
  const lines = [];
  for (const k of order) if (p[k] != null && p[k] !== '') { lines.push(fmt(k, p[k])); seen.add(k); }
  for (const k of Object.keys(p)) if (!seen.has(k) && p[k] != null && p[k] !== '') lines.push(fmt(k, p[k]));
  return lines.join('\n') || '(no parameters)';
}
// Concise one-line summary of what a tool is actually DOING — shown as the work-block
// label (like Claude's chat UI: "Read PROGRESS.md", "$ git status") instead of a
// generic "Reading / Working". Computed once the tool inputs have fully streamed in.
function summarizeTool(name, input) {
  const p = input && typeof input === 'object' ? input : {};
  const base = (s) => String(s).split(/[\\/]/).pop() || String(s);
  const clip = (s, n = 72) => { s = String(s).replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n) + '…' : s; };
  const n = (name || '').toLowerCase();
  const bare = n.replace(/^mcp__/, '');
  if (n === 'read') return 'Read ' + base(p.file_path || p.path || '');
  if (n === 'edit' || n === 'multiedit') return 'Edit ' + base(p.file_path || p.path || '');
  if (n === 'write') return 'Write ' + base(p.file_path || p.path || '');
  if (n === 'notebookedit') return 'Edit ' + base(p.notebook_path || p.file_path || '');
  if (n === 'grep') return 'Grep ' + clip(p.pattern || '', 48) + (p.path || p.glob ? ' in ' + base(p.path || p.glob) : '');
  if (n === 'glob') return 'Glob ' + clip(p.pattern || p.glob || '', 56);
  if (n === 'ls') return 'List ' + base(p.path || '');
  if (n === 'bash') return p.description ? clip(p.description) : '$ ' + clip(p.command || '', 68);
  if (n === 'webfetch') { try { return 'Fetch ' + new URL(p.url).host; } catch { return 'Fetch ' + clip(p.url || '', 48); } }
  if (n === 'websearch') return 'Search “' + clip(p.query || '', 48) + '”';
  if (n === 'task' || n === 'agent') return 'Agent · ' + clip(p.description || p.prompt || '', 56);
  if (n === 'todowrite') return 'Update plan';
  // Buildprint / MCP / anything else: humanize the tool name, append the salient arg.
  const label = bare.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const arg = p.description || p.file_path || p.path || p.prompt || p.query || p.branch || '';
  return arg ? label + ' · ' + clip(arg, 56) : label;
}
// Spawn `claude -p` in stream-json mode, feed the prompt via stdin, and emit
// text deltas as they arrive. Uses the Max subscription (no API key).
// hooks: { onDelta(text), onStatus(text) }. Resolves { text, sessionId }.
function runClaudeStream(message, sessionId, hooks = {}, opts = {}) {
  const onDelta = hooks.onDelta || (() => {});
  const onStatus = hooks.onStatus || (() => {});
  const onThink = hooks.onThink || (() => {});   // extended-thinking text
  const onBlock = hooks.onBlock || (() => {});    // work-block boundary: {kind:'thinking'|'tool', tool?}
  const onDetail = hooks.onDetail || (() => {});  // tool parameters for the current work block
  const onLabel = hooks.onLabel || (() => {});    // concise action label once tool inputs are known
  const onUsage = hooks.onUsage || (() => {});    // running token counts { in, out }
  return new Promise((resolve, reject) => {
    const args = [
      '-p',
      '--output-format', 'stream-json',
      '--include-partial-messages',
      '--verbose',                 // required for stream-json in print mode
      '--permission-mode', 'acceptEdits',
      '--allowedTools', 'WebFetch', 'WebSearch', 'Bash(buildprint:*)', 'Bash(agent-browser:*)', 'Bash(node:*)', 'Bash(python:*)', 'Bash(python3:*)', 'mcp__buildprint',   // Buildprint CLI + Agent Browser (screenshots/interactive checks) + local scripting + MCP + web
      '--settings', BP_GUARD_SETTINGS,   // PreToolUse hook: hard-blocks dangerous buildprint commands
      '--append-system-prompt', opts.systemPrompt || SYSTEM_PROMPT,
    ];
    for (const d of (opts.addDirs || [])) args.push('--add-dir', d);
    if (opts.model) args.push('--model', opts.model);
    if (opts.effort) args.push('--effort', opts.effort);
    if (sessionId) args.push('--resume', sessionId);
    else { sessionId = crypto.randomUUID(); args.push('--session-id', sessionId); }

    const child = spawnClaude(args, { cwd: opts.cwd || REPO_ROOT });

    let buf = '';
    let stderr = '';
    let finalText = '';
    let sawResult = false;
    let aborted = false;

    // Stop button / client disconnect: kill the claude child, keep partial output.
    if (opts.signal) {
      const onAbort = () => { aborted = true; try { child.kill('SIGTERM'); } catch {} };
      if (opts.signal.aborted) onAbort();
      else opts.signal.addEventListener('abort', onAbort, { once: true });
    }

    // Inactivity timeout (NOT a wall-clock cap): only give up after a long
    // stretch of zero output. A long-but-active thinking/tool run keeps resetting
    // this, so deep reasoning is never killed just for taking a while.
    let timedOut = false;
    let timer = null;
    const IDLE_MS = 10 * 60 * 1000;
    const bumpIdle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => { timedOut = true; try { child.kill('SIGTERM'); } catch {} }, IDLE_MS);
    };
    bumpIdle();

    let usageIn = 0, usageOut = 0;   // running token counts for the live meter
    let toolAcc = null;   // { name, json } — accumulates streamed tool-input JSON
    function flushTool() {
      if (!toolAcc) return;
      let input = {}; try { input = JSON.parse(toolAcc.json || '{}'); } catch {}
      onLabel(summarizeTool(toolAcc.name, input));
      onDetail(formatToolInput(toolAcc.name, input));
      toolAcc = null;
    }
    function handleEvent(ev) {
      if (!ev || !ev.type) return;
      if (ev.type === 'stream_event' && ev.event) {
        const e = ev.event;
        // running token counts for the live generation meter
        if (e.type === 'message_start' && e.message && e.message.usage) {
          const u = e.message.usage;
          usageIn = (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0) || usageIn;
          onUsage({ in: usageIn, out: usageOut });
        } else if (e.type === 'message_delta' && e.usage) {
          usageOut = e.usage.output_tokens || usageOut;
          onUsage({ in: usageIn, out: usageOut });
        }
        if (e.type === 'content_block_start' && e.content_block) {
          flushTool();   // safety: emit prior tool detail if its stop was missed
          const cb = e.content_block;
          if (cb.type === 'thinking') onBlock({ kind: 'thinking' });
          else if (cb.type === 'tool_use') {
            toolAcc = { name: cb.name || '', json: '' };
            onBlock({ kind: 'tool', tool: cb.name || '' });
            onStatus(cb.name || 'working');
          }
        } else if (e.type === 'content_block_delta' && e.delta) {
          if (e.delta.type === 'text_delta') onDelta(e.delta.text || '');
          else if (e.delta.type === 'thinking_delta') onThink(e.delta.thinking || '');
          else if (e.delta.type === 'input_json_delta' && toolAcc) toolAcc.json += e.delta.partial_json || '';
        } else if (e.type === 'content_block_stop' || e.type === 'message_stop') {
          flushTool();
        }
      } else if (ev.type === 'result') {
        sawResult = true;
        finalText = ev.result || finalText;
        sessionId = ev.session_id || sessionId;
      }
    }

    child.stdout.on('data', (d) => {
      bumpIdle();   // any output means it's alive — reset the inactivity clock
      buf += d;
      let nl;
      while ((nl = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, nl).trim();
        buf = buf.slice(nl + 1);
        if (!line) continue;
        try { handleEvent(JSON.parse(line)); } catch { /* ignore non-JSON lines */ }
      }
    });
    child.stderr.on('data', (d) => (stderr += d));
    child.on('error', (e) => { clearTimeout(timer); reject(e); });
    child.on('close', (code) => {
      clearTimeout(timer);
      flushTool();
      if (buf.trim()) { try { handleEvent(JSON.parse(buf.trim())); } catch {} }
      if (aborted) return resolve({ text: finalText, sessionId, aborted: true });
      if (timedOut) {
        // Genuine hang — no output for IDLE_MS. Keep any partial we did get.
        if (finalText.trim()) return resolve({ text: finalText, sessionId, aborted: true });
        return reject(new Error('claude stopped responding (no output for 10 minutes)'));
      }
      if (!sawResult && code !== 0) {
        return reject(new Error(`claude exited ${code}: ${stderr.slice(0, 500)}`));
      }
      resolve({ text: finalText, sessionId });
    });

    child.stdin.write(message);
    child.stdin.end();
  });
}

// ---- git helpers -----------------------------------------------------------
// Best-effort commit of the brain's memory after each exchange. Non-fatal.
function autoCommit(title) {
  if (process.env.CRS_BRAIN_AUTOCOMMIT === '0') return;
  const msg = 'brain: ' + String(title || 'update').replace(/[\r\n]+/g, ' ').slice(0, 60);
  const add = spawn('git', ['add', 'crs-brain/data', 'brain'], { cwd: REPO_ROOT, windowsHide: true });
  add.on('error', () => {});
  add.on('close', () => {
    const commit = spawn('git', ['commit', '-q', '--no-verify', '-m', msg], { cwd: REPO_ROOT, windowsHide: true });
    commit.on('error', () => {});   // nothing-to-commit or no-repo → ignore
  });
}

// ---- auth helpers ----------------------------------------------------------
// Ask the claude CLI who is logged in (subscription vs API key, plan, email).
function authStatus() {
  return new Promise((resolve) => {
    const child = spawnClaude(['auth', 'status', '--json'], { cwd: REPO_ROOT });
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.on('error', () => resolve({ loggedIn: false, error: 'claude CLI not found' }));
    child.on('close', () => {
      try { resolve(JSON.parse(out)); }
      catch { resolve({ loggedIn: false, error: 'could not read auth status' }); }
    });
  });
}

// Launch the interactive Claude sign-in in a visible terminal window.
// `claude auth login` opens the browser OAuth flow — same as logging into Claude Code.
function launchLogin() {
  if (process.platform === 'win32') {
    spawn('cmd.exe', ['/c', 'start', 'CRS Brain — Sign in to Claude', 'cmd', '/k', 'claude', 'auth', 'login'],
      { detached: true, windowsHide: false });
  } else if (process.platform === 'darwin') {
    // macOS: open a visible Terminal window running the interactive login
    // (Terminal uses a login shell, so the user's full PATH applies).
    const child = spawn('osascript', [
      '-e', 'tell application "Terminal" to do script "claude auth login"',
      '-e', 'tell application "Terminal" to activate',
    ], { detached: true, stdio: 'ignore' });
    child.on('error', () => {});   // never crash the server on a failed spawn
    child.unref();
  } else {
    // Linux: run it directly; it prints a URL / opens the browser.
    const child = spawn('claude', ['auth', 'login'], { detached: true, stdio: 'ignore' });
    child.on('error', () => {});
    child.unref();
  }
}

function runLogout() {
  return new Promise((resolve) => {
    const child = spawnClaude(['auth', 'logout'], { cwd: REPO_ROOT });
    child.on('error', () => resolve());
    child.on('close', () => resolve());
  });
}

// Recent commit log for the weekly digest.
function gitLog(days) {
  return new Promise((resolve) => {
    const child = spawn('git',
      ['log', `--since=${days} days ago`, '--pretty=format:%h  %ad  %s', '--date=short'],
      { cwd: REPO_ROOT, windowsHide: true });
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.on('error', () => resolve(''));
    child.on('close', () => resolve(out.trim()));
  });
}

// ---- chat storage ----------------------------------------------------------
function chatPath(id) { return path.join(CHATS_DIR, `${id}.json`); }

function loadChat(id) {
  try { return JSON.parse(fs.readFileSync(chatPath(id), 'utf8')); } catch { return null; }
}

function saveChat(chat) {
  fs.writeFileSync(chatPath(chat.id), JSON.stringify(chat, null, 2));
}

function listChats() {
  return fs.readdirSync(CHATS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      try {
        const c = JSON.parse(fs.readFileSync(path.join(CHATS_DIR, f), 'utf8'));
        return { id: c.id, title: c.title, updated: c.updated, count: (c.messages || []).length, bp: c.bp === true };
      } catch { return null; }
    })
    .filter(Boolean)
    .sort((a, b) => (b.updated || '').localeCompare(a.updated || ''));
}

function nowIso() { return new Date().toISOString(); }

// ---- default progress board ------------------------------------------------
const DEFAULT_PROGRESS = {
  updated: nowIso(),
  columns: {
    now: [],
    next: [],
    later: [],
    done: [],
  },
  missing: [],
};

function loadProgress() {
  try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); }
  catch { fs.writeFileSync(PROGRESS_FILE, JSON.stringify(DEFAULT_PROGRESS, null, 2)); return DEFAULT_PROGRESS; }
}

// ---- Progress Tree: per-module detail (aggregate what the brain knows) ------
function loadModulesDoc() {
  try { return JSON.parse(fs.readFileSync(MODULES_FILE, 'utf8')); }
  catch { return { modules: [] }; }
}
// Per-module definition-of-done checklist. Editable in the tree; also injected into
// every generated Buildprint prompt as acceptance criteria.
const CHECKLIST_TEMPLATE = [
  ['ui', 'UI elements built'], ['ux', 'UX / workflows working'],
  ['db', 'Data types as planned (company + property)'], ['os', 'Option sets in place'],
  ['privacy', 'Privacy rules (Pattern A) in place'], ['perms', 'Backend protection (permission-based)'],
  ['theme', 'Theme (dark + light)'], ['tested', 'Security [NEG] tested'],
];
const CHECK_STATES = new Set(['todo', 'partial', 'done']);
function defaultChecklist() { return CHECKLIST_TEMPLATE.map(([key, label]) => ({ key, label, state: 'todo', detail: '' })); }
function sanitizeChecklist(cl) {
  if (!Array.isArray(cl) || !cl.length) return defaultChecklist();
  return cl.map((c) => ({
    key: String(c.key || '').slice(0, 24), label: String(c.label || '').slice(0, 120),
    state: CHECK_STATES.has(c.state) ? c.state : 'todo', detail: String(c.detail || '').slice(0, 200),
  }));
}
// Render a module's checklist as markdown acceptance criteria.
function checklistMd(mod) {
  const cl = (Array.isArray(mod.checklist) && mod.checklist.length) ? mod.checklist : defaultChecklist();
  const mark = (s) => (s === 'done' ? '[x]' : s === 'partial' ? '[~]' : '[ ]');
  return cl.map((c) => `- ${mark(c.state)} ${c.label}${c.detail ? ` — ${c.detail}` : ''}`).join('\n');
}
function _readRepo(rel) { try { return fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8'); } catch { return ''; } }
function _escapeRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
// Extract a markdown section: from the heading matching startRe until the next
// heading of the same or higher level.
function _mdSection(text, startRe) {
  const lines = text.split('\n');
  const i = lines.findIndex((l) => startRe.test(l));
  if (i < 0) return '';
  const lvl = (lines[i].match(/^#+/) || ['#'])[0].length;
  const out = [lines[i]];
  for (let j = i + 1; j < lines.length; j++) {
    const m = lines[j].match(/^(#+)\s/);
    if (m && m[1].length <= lvl) break;
    out.push(lines[j]);
  }
  return out.join('\n').trim();
}
// Every ledger line that mentions the module (by name or route), grouped by file.
function _scanMentions(needles) {
  const targets = [
    ['brain/database.md', 'Data types'], ['brain/option-sets.md', 'Option sets'],
    ['brain/security.md', 'Security & privacy'], ['brain/workflows.md', 'Workflows'],
    ['decisions.md', 'Decisions'],
  ];
  const nlow = needles.filter(Boolean).map((n) => String(n).toLowerCase());
  const res = [];
  for (const [rel, label] of targets) {
    const t = _readRepo(rel); if (!t) continue;
    const hits = [];
    t.split('\n').forEach((l, n) => {
      const ll = l.toLowerCase();
      if (l.trim() && nlow.some((x) => x && ll.includes(x))) hits.push({ line: n + 1, text: l.trim().slice(0, 220) });
    });
    if (hits.length) res.push({ file: rel, label, count: hits.length, lines: hits.slice(0, 18) });
  }
  return res;
}
function moduleDetail(mod) {
  const hy = String(mod.id || '').replace(/_/g, '-');
  let files = [];
  try { files = fs.readdirSync(path.join(REPO_ROOT, 'brain', 'modules')); } catch {}
  const techRef = files.find((f) => f.includes(hy) && /tech/i.test(f));
  const userManual = files.find((f) => f.includes(hy) && /manual/i.test(f));
  let dataModel = '', optionSets = '', perms = '', workflows = '';
  if (techRef) {
    const t = _readRepo('brain/modules/' + techRef);
    dataModel = _mdSection(t, /^##\s*2\.\s*Data model/im);
    optionSets = _mdSection(t, /Option Sets used/i);
    perms = _mdSection(t, /^##\s*4\.\s*Permissions/im);
    workflows = _mdSection(t, /^##\s*5\.\s*Workflows/im);
  }
  const statusBlock = _mdSection(_readRepo('brain/STATUS.md'), new RegExp('^###\\s+' + _escapeRe(mod.name), 'im'));
  const mentions = _scanMentions([mod.name, mod.route].filter(Boolean));
  return {
    module: mod, documented: !!techRef,
    techRef: techRef ? 'brain/modules/' + techRef : null,
    userManual: userManual ? 'brain/modules/' + userManual : null,
    statusBlock, dataModel, optionSets, perms, workflows, mentions,
  };
}
// Two prompt flavours per module, both markdown, both pre-filled with live brain context:
//  - EDIT  → paste into the Buildprint APP to actually build/change (applies directly).
//  - SYNC  → read-only audit that reports + emits JSON to ingest back into the brain.

function buildEditPrompt(mod, d) {
  const today = new Date().toISOString().slice(0, 10);
  const attach = [
    'design.md (source of truth — §2 tokens, §13 naming, §23 type scale, §25 theme)',
    'CRS-style-system.md (approval = showcased on the `design_system` page)',
    'brain/security-test-checklist.md (the standing security gate)',
  ];
  if (d.techRef) attach.push(`${d.techRef} (current as-built technical reference for this module)`);
  const L = [];
  L.push(`# Buildprint Prompt — Build / advance ${mod.name}`);
  L.push('');
  L.push(`**On TEST/DEV branch only, never live. Run \`buildprint sync\` first, then PLAN the steps. Work ONE task at a time — for EACH task: create a savepoint (\`buildprint savepoint "${mod.name} — Task N"\`) → \`buildprint apply\` → \`buildprint check\`. If check fails, stop and fix or restore that savepoint before continuing.**`);
  L.push('');
  L.push(`**Attached:** ${attach.join('; ')}. For pixel-level UI work, also attach the module's design HTML — that is the visual spec.`);
  L.push('');
  L.push(`**Context (CRS brain, ${today}):** ${mod.name} · section ${mod.section} · route \`${mod.route || '(unset)'}\` · tracked status **${mod.status}**${mod.note ? ` — ${mod.note}` : ''}`);
  L.push('');
  L.push('## Task 0 — Locate + report');
  L.push(`Find the ${mod.name} page/reusable (\`# ${mod.name}\`${mod.route ? `, route \`${mod.route}\`` : ''}). List its current element tree, the data types it reads/writes, and their existing privacy rules + permissions. Report reusable + element names before changing anything.`);
  L.push('');
  L.push('## Task 1 — Data model (Pattern A)');
  if (d.dataModel) { L.push('Current as-built data model (from the technical reference — verify against the workspace, do not trust blindly):'); L.push(''); L.push(d.dataModel); L.push(''); }
  L.push("Every BUSINESS data type this module uses must carry both `company` and `property` fields and a privacy rule whose isolation check is `Current User's company = This Thing's company AND Current User's property = This Thing's property` (super-admin override allowed; everyone-else grants nothing). Add any missing fields/rules. Known exceptions: Company, Property, Subscription, system configs.");
  L.push('');
  L.push('## Task 2 — Permissions + server-guarded workflows');
  if (d.perms) { L.push('Permissions per the reference:'); L.push(''); L.push(d.perms); L.push(''); }
  L.push("Access is permission-based (`Current User's role's permissions contains <perm>`). EVERY create/edit/delete/state-change runs through a PRIVATE backend workflow (`expose:false`, `auth_unecessary:false`) with a permission trigger condition, reading Current User server-side. No UI-only writes; no auto-bind on access/status/money/ownership fields. A write that takes a passed Thing also needs an explicit tenant check on that Thing.");
  L.push('');
  L.push('## Task 3 — UI + theming (tokens + approved styles — find first, create last)');
  L.push('Build the UI on named **Dark + (Light) paired styles** from design.md tokens — zero inline/literal colors. For every value, map: spec value → design.md token → existing approved style on the `design_system` page. Reuse existing styles; only where nothing fits, create the pair per §13 naming and **showcase it on the `design_system` page** (list every creation + why nothing fit). Theming = full style swap only (the one allowed conditional is `dark_theme is "no"` swapping the entire applied style); zero property-level color conditionals; interaction states live inside each style of the pair.');
  L.push('');
  L.push('## Task 4 — Verify, then report');
  L.push('Run the [STRUCT]/[POS] items from brain/security-test-checklist.md. Confirm with evidence: Pattern A privacy rule quoted on every DT touched; server-side guard quoted on every write; Data API not exposed for those DTs; dark + light both via swapped styles (getComputedStyle proof); zero new searches on render where avoidable. Report: element mapping, styles reused vs created (+ showcased), privacy rules + guards quoted, measured key dimensions, and the **[NEG] tests I must run** (second-tenant / property-admin / low-perm). Flag any spec point Bubble genuinely cannot hit and give your closest compliant alternative — never silently substitute.');
  L.push('');
  L.push('## Acceptance criteria — module definition of done');
  L.push('This change must not regress any item below. Report each item\'s final state (`[x]` done / `[~]` partial / `[ ]` not started):');
  L.push('');
  L.push(checklistMd(mod));
  L.push('');
  L.push('**TEST/DEV only, never live. Loop per task: savepoint → apply → `buildprint check`. If check fails, restore the savepoint. Plan first; one step per apply.**');
  return L.join('\n');
}

function buildSyncPrompt(mod, d) {
  const today = new Date().toISOString().slice(0, 10);
  const L = [];
  L.push(`# Buildprint Prompt — Audit ${mod.name} + sync to brain (READ-ONLY)`);
  L.push('');
  L.push('**On TEST branch only, never Live. Run `buildprint sync` FIRST. READ-ONLY — make zero changes: no apply, no --force-apply, no --no-check, no sync --reset.**');
  L.push('');
  L.push(`**Context (CRS brain, ${today}):** ${mod.name} · section ${mod.section} · route \`${mod.route || '(unset)'}\` · tracked status **${mod.status}**${mod.note ? ` — ${mod.note}` : ''}`);
  if (d.statusBlock) { L.push(''); L.push('Known status detail (brain/STATUS.md):'); L.push(''); L.push(d.statusBlock); }
  L.push('');
  L.push('## Audit tasks (read-only)');
  L.push(`Reuse brain/security-test-checklist.md — [STRUCT]/[POS] you can prove, [NEG] needs a human. For **${mod.name}**:`);
  L.push('1. **Identity** — its page/reusable + route; the data types it reads/writes (display + slug).');
  L.push('2. **Core-7 rating** — ✅ done / 🟡 partial / 🔴 missing / ➖ n/a with one-line evidence each: UI · UX · DB (company+property?) · Perms · Privacy (tenant isolation built?) · WF-CRUD (guarded?) · Theme. Then one overall status: done / in-progress / not-started / roadmap.');
  L.push('3. **Security (STRUCT+POS)** — per business DT: quote the privacy rule (company AND property?), state Data API exposure, quote each write\'s server-side guard. Flag public-everyone / no-rules / logged-in-only DTs, UI-only writes, auto-bind on sensitive fields, public uploaders.');
  L.push('4. **Findings** — ranked SECURITY > FUNCTIONAL > POLISH (severity, exact entity/expression, fix). Then the **[NEG] tests a human must run**.');
  L.push('5. **Delta vs the ledger** — where brain/STATUS.md is wrong for this module.');
  L.push('6. **Definition of done** — verify each item below against the live app and report its true state (`[x]` done / `[~]` partial / `[ ]` not started) with evidence:');
  L.push('');
  L.push(checklistMd(mod));
  L.push('');
  L.push('## Output');
  L.push('(a) A human-readable report, and (b) a fenced `json` block so the CRS Brain can ingest it back into STATUS.md + the Progress Tree:');
  L.push('```json');
  L.push(`{ "id": "${mod.id}", "name": "${mod.name}", "section": "${mod.section}", "status": "done|in-progress|not-started|roadmap",`);
  L.push('  "core7": {"ui":"","ux":"","db":"","perms":"","privacy":"","wf_crud":"","theme":""},');
  L.push('  "dataTypes": [], "optionSets": [], "reusables": [],');
  L.push('  "security_findings": [{"severity":"","where":"","issue":"","fix":""}], "neg_tests_todo": [] }');
  L.push('```');
  L.push('Never invent modules, fields, or rules — if something is not in the workspace, say "not found".');
  return L.join('\n');
}

// System prompt: write ONLY the numbered task breakdown for a Buildprint edit prompt.
// The header, Attached line, acceptance-criteria and footer are assembled deterministically
// around this output (buildEditWrapper) so the house style is guaranteed regardless of the model.
const EDIT_TASKS_PROMPT = [
  "You write the TASK BREAKDOWN for a CRS Buildprint prompt. Given a module's context and Vlad's plain-language",
  'request, output ONLY numbered markdown task sections that accomplish it. Do NOT write a title, a header, an',
  'Attached line, acceptance criteria, or a footer — those are added around your output. Do NOT wrap in a code',
  'fence. Be concise and concrete; do not explore or explain — just the tasks.',
  '',
  'Rules:',
  '- Start with `## Task 0 — Locate + report`: find the relevant page/reusable + elements + data types and report BEFORE changing anything.',
  '- Then `## Task 1 — …`, `## Task 2 — …` for the actual change Vlad asked for. Use exact-dimension tables when Vlad gives specs. Make each Task a self-contained step that can be applied and checked on its own (Buildprint does savepoint → apply → check per task).',
  '- End with a final `## Task N — Verify + report`: prove it works (measure / getComputedStyle), list styles reused vs created, quote privacy rules + guards, and the [NEG] tests Vlad must run.',
  '- Bake in CRS locked rules where the task touches them: Pattern A (every business DT has company + property + a privacy rule checking BOTH; exceptions Company/Property/Subscription/system); permission-based access; every write via a PRIVATE server-guarded backend workflow (Current User server-side, no UI-only writes, no auto-bind on sensitive fields, tenant check on passed Things); UI on named Dark + (Light) paired styles from design.md tokens (zero inline colors; find styles first, create + showcase only if nothing fits; theming = full style swap).',
  '- Scope strictly to what Vlad asked — no unrelated work. Reference real elements / data types from the context where known; otherwise tell Task 0 to inventory them. Keep it tight.',
].join('\n');

// Deterministic wrapper around the model-written tasks — guarantees the house style.
function buildEditWrapper(mod, d, requestText, tasks) {
  const attach = [
    'design.md (tokens, naming, theme)', 'CRS-style-system.md (approval = showcased on the design_system page)',
    'brain/security-test-checklist.md',
  ];
  if (d.techRef) attach.push(`${d.techRef} (as-built technical reference)`);
  const label = `${mod.name}: ${requestText}`.replace(/["\n]/g, ' ').slice(0, 60);
  const L = [];
  L.push(`# Buildprint edit — ${mod.name}`);
  L.push('');
  L.push(`**On TEST/DEV branch only, never live. Run \`buildprint sync\` first, then PLAN the steps. Work ONE task at a time — for EACH task: create a savepoint (\`buildprint savepoint "${label} — Task N"\`) → \`buildprint apply\` → \`buildprint check\`. If check fails, stop and fix or restore that savepoint before continuing.**`);
  L.push('');
  L.push(`**Attached:** ${attach.join('; ')}. For pixel-level UI work, also attach the module's design HTML.`);
  L.push('');
  L.push(`**Module:** ${mod.name} · ${mod.section} · route \`${mod.route || '(unset)'}\` · status ${mod.status}. **Request:** ${requestText}`);
  L.push('');
  L.push(tasks.trim());
  L.push('');
  L.push('## Acceptance criteria — module definition of done');
  L.push('This change must not regress any item below. Report each item\'s final state (`[x]` done / `[~]` partial / `[ ]` not started):');
  L.push('');
  L.push(checklistMd(mod));
  L.push('');
  L.push('**TEST/DEV only, never live. Loop per task: savepoint → apply → `buildprint check`. If check fails, restore the savepoint. Plan first; one step per apply.**');
  return L.join('\n');
}

// ---- wishlist → Claude Code prompt generator (item w-fsbf5e) ----------------
// Each wishlist card gets a button that turns the idea into a complete,
// paste-ready Claude Code prompt for improving the Brain app itself. Grounded in
// the app's own architecture so the generated prompt is self-contained.
const CRS_BRAIN_ARCH = [
  'CRS Brain is a LOCAL, single-user second-brain app for the CRS (Casino Reporting Suite) project. Stack:',
  '- Zero-framework Node `crs-brain/server.js` (~2000 lines, port 4317, binds 127.0.0.1) + single-file pages in `crs-brain/public/` (index.html, map.html, wishlist.html, tree.html, activity.html, memory.html). One dependency: node-pty (usage panel only).',
  '- All Claude work runs through the headless `claude` CLI on the Max subscription via `runClaudeStream(msg, sessionId, hooks, {model, effort, systemPrompt, cwd, addDirs, signal})` — NEVER API keys.',
  '- Data is plain JSON/JSONL under `crs-brain/data/` (wishlist.json, modules.json, plans.json, settings.json, usage.json, chats/, action-log.jsonl). The knowledge ledger is markdown under repo `brain/` (INDEX.md is the retrieval map).',
  '- Runs on BOTH macOS and Windows — every OS-specific spawn is guarded by process.platform; `.gitattributes` locks line endings; `node doctor.js` verifies a machine.',
  'LOCKED RULES (violating these breaks the app):',
  "- Spawn `claude` WITHOUT shell:true — use the spawnClaude() helper (cmd.exe /c wrapper on Windows). A shell concatenates args unescaped and any '(' breaks /bin/sh.",
  '- Do NOT commit crs-brain/node_modules (breaks the other OS). Keep everything cross-platform.',
  '- UI follows CRS design tokens: flat accent #3B82F6, border-only, active state = bg + text only (never bg+border+text). Dark theme (--bg:#181818). Never strikethrough done items.',
  '- Buildprint edits are TEST-branch-only, plan-before-apply, savepoint→apply→check.',
].join('\n');

const WL_CC_PROMPT = [
  'You write a single, complete, paste-ready prompt for Claude Code (the CLI coding agent) that implements ONE improvement to the CRS Brain app. Output ONLY the prompt as one markdown code block — no preamble, no explanation before or after.',
  '',
  'The prompt you write MUST:',
  '- Open with a one-line objective, then the concrete task derived from the wishlist item (title + detail). If the detail is thin, infer a sensible, minimal scope and state your assumptions in a short "Assumptions" line.',
  '- Be SELF-CONTAINED: name the exact files to touch (server.js routes/helpers, the relevant public/*.html page, data/*.json) using the architecture context given. Never reference a file the agent cannot open without saying where it is.',
  '- Bake in the locked rules that the task touches (spawnClaude/no shell:true; cross-platform / no node_modules commits; CRS design tokens; TEST-branch-only for any Buildprint work). Only include the rules that are actually relevant.',
  '- Prescribe the shape: backend endpoint(s) + data changes + frontend wiring, MVP-first, no over-engineering.',
  '- End with an "Acceptance criteria" checklist (verifiable `[ ]` items) and a reminder to keep it working on BOTH macOS and Windows and to boot-test (node server.js) before finishing.',
  '- Be concrete and tight. No motivational filler.',
].join('\n');

function buildWishlistPromptMsg(item) {
  const detail = (item.detail || '').trim();
  return [
    'CRS BRAIN ARCHITECTURE (ground the prompt in this — do not restate it verbatim):',
    CRS_BRAIN_ARCH,
    '',
    '---',
    'WISHLIST ITEM to turn into a Claude Code prompt:',
    `- Section: ${item.section}`,
    `- Priority: ${item.priority || '—'}`,
    `- Title: ${item.title}`,
    detail ? `- Detail:\n${detail}` : '- Detail: (none given — infer a minimal, sensible scope and note assumptions)',
  ].join('\n');
}

// ---- static files ----------------------------------------------------------
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };
function serveStatic(res, urlPath) {
  const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const abs = path.resolve(PUBLIC_DIR, rel);
  if (!abs.startsWith(PUBLIC_DIR)) return send(res, 403, { error: 'forbidden' });
  fs.readFile(abs, (err, data) => {
    if (err) return send(res, 404, { error: 'not found' });
    // no-cache so the browser always revalidates — the app's HTML/JS/CSS change
    // often; without this, a plain refresh (F5) serves a stale cached page.
    res.writeHead(200, { 'Content-Type': MIME[path.extname(abs)] || 'application/octet-stream', 'Cache-Control': 'no-cache, must-revalidate' });
    res.end(data);
  });
}

// ---- router ----------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://localhost:${PORT}`);
  const p = u.pathname;

  // PIN gate for non-localhost clients (mobile/LAN mode)
  if (!pinOk(req)) {
    const tryPin = u.searchParams.get('pin');
    if (tryPin === PIN) {
      res.writeHead(302, { 'Set-Cookie': `crsbrain=${PIN}; Path=/; Max-Age=2592000; SameSite=Lax`, Location: '/' });
      return res.end();
    }
    res.writeHead(tryPin ? 401 : 200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(PIN_PAGE(!!tryPin));
  }

  try {
    // ---- API ----
    if (p === '/api/files' && req.method === 'GET') {
      return send(res, 200, { root: path.basename(REPO_ROOT), tree: walk(REPO_ROOT) });
    }

    // Recently edited PROJECT files (by mtime) — excludes app internals & manuals.
    if (p === '/api/recent-edited' && req.method === 'GET') {
      const limit = Math.min(30, parseInt(u.searchParams.get('limit')) || 8);
      const PROJ = new Set(['brain', 'specs', 'design', 'data', 'demos', 'pricing', 'audits']);
      const MAN = new Set(['brain/bubble', 'brain/buildprint', 'brain/bubble-forum']);
      const out = [];
      (function w(dir, rel) {
        let es; try { es = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
        for (const e of es) {
          const r = rel ? `${rel}/${e.name}` : e.name;
          const top = r.split('/')[0];
          if (e.isDirectory()) {
            if (IGNORE_DIRS.has(e.name) || !PROJ.has(top) || MAN.has(r)) continue;
            w(path.join(dir, e.name), r);
          } else {
            if (!(PROJ.has(top) || r === 'decisions.md')) continue;
            if (!ALLOWED_EXT.has(path.extname(e.name).toLowerCase())) continue;
            try { out.push({ path: r, mtime: fs.statSync(path.join(dir, e.name)).mtimeMs }); } catch {}
          }
        }
      })(REPO_ROOT, '');
      out.sort((a, b) => b.mtime - a.mtime);
      return send(res, 200, { files: out.slice(0, limit) });
    }

    if (p === '/api/file' && req.method === 'GET') {
      const abs = safeRepoPath(u.searchParams.get('path'));
      const content = fs.readFileSync(abs, 'utf8');
      return send(res, 200, { path: u.searchParams.get('path'), content });
    }

    if (p === '/api/file' && req.method === 'PUT') {
      const body = await readJsonBody(req);
      const abs = safeRepoPath(body.path);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, body.content ?? '');
      return send(res, 200, { ok: true });
    }

    // ---- OS-explorer filesystem mutations (all guarded by safeRepoPath) --------
    // create file/folder, rename, move (batch), duplicate, delete (batch). Real,
    // persistent changes under REPO_ROOT only. Illegal names + traversal rejected.
    if (p.startsWith('/api/fs/') && req.method === 'POST') {
      const body = await readJsonBody(req) || {};
      const badName = (n) => !n || /[\/\\]/.test(n) || /[<>:"|?*\x00-\x1f]/.test(n) || n === '.' || n === '..' || n.length > 255;
      try {
        if (p === '/api/fs/create') {
          if (badName(body.name)) return send(res, 400, { error: 'invalid name' });
          let abs = safeRepoPath((body.dir ? body.dir + '/' : '') + body.name);
          if (fs.existsSync(abs)) {
            if (!body.autosuffix) return send(res, 409, { error: 'already exists' });
            // "untitled.md" → "untitled 2.md", "New folder" → "New folder 2", …
            const ext = body.type === 'folder' ? '' : path.extname(abs);
            const base = path.basename(abs, ext), dir = path.dirname(abs);
            let i = 2; do { abs = path.join(dir, `${base} ${i++}${ext}`); } while (fs.existsSync(abs));
          }
          if (body.type === 'folder') fs.mkdirSync(abs, { recursive: false });
          else { fs.mkdirSync(path.dirname(abs), { recursive: true }); fs.writeFileSync(abs, ''); }
          return send(res, 200, { ok: true, path: path.relative(REPO_ROOT, abs).split(path.sep).join('/') });
        }
        if (p === '/api/fs/rename') {
          if (badName(body.newName)) return send(res, 400, { error: 'invalid name' });
          const abs = safeRepoPath(body.path);
          const dst = path.join(path.dirname(abs), body.newName);
          if (!dst.startsWith(REPO_ROOT + path.sep)) return send(res, 400, { error: 'forbidden' });
          if (fs.existsSync(dst)) return send(res, 409, { error: 'name already in use' });
          fs.renameSync(abs, dst);
          const rel = path.relative(REPO_ROOT, dst).split(path.sep).join('/');
          return send(res, 200, { ok: true, path: rel });
        }
        if (p === '/api/fs/move') {
          const targetDir = safeRepoPath(body.targetDir || '');
          if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) return send(res, 400, { error: 'target is not a folder' });
          const moved = [];
          for (const rel of (body.paths || [])) {
            const src = safeRepoPath(rel);
            const dst = path.join(targetDir, path.basename(src));
            if (dst === src || path.dirname(src) === targetDir) continue;            // no-op
            if ((targetDir + path.sep).startsWith(src + path.sep)) return send(res, 400, { error: 'cannot move a folder into itself' });
            if (fs.existsSync(dst)) return send(res, 409, { error: `"${path.basename(src)}" already exists in the target` });
            fs.renameSync(src, dst);
            moved.push(path.relative(REPO_ROOT, dst).split(path.sep).join('/'));
          }
          return send(res, 200, { ok: true, moved });
        }
        if (p === '/api/fs/duplicate') {
          const src = safeRepoPath(body.path);
          const ext = path.extname(src), base = path.basename(src, ext), dir = path.dirname(src);
          let dst = path.join(dir, `${base} copy${ext}`), i = 2;
          while (fs.existsSync(dst)) dst = path.join(dir, `${base} copy ${i++}${ext}`);
          fs.cpSync(src, dst, { recursive: true });
          return send(res, 200, { ok: true, path: path.relative(REPO_ROOT, dst).split(path.sep).join('/') });
        }
        if (p === '/api/fs/copy') {
          const targetDir = safeRepoPath(body.targetDir || '');
          if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) return send(res, 400, { error: 'target is not a folder' });
          const out = [];
          for (const rel of (body.paths || [])) {
            const src = safeRepoPath(rel);
            if ((targetDir + path.sep).startsWith(src + path.sep)) return send(res, 400, { error: 'cannot copy a folder into itself' });
            const ext = path.extname(src), b = path.basename(src, ext);
            let dst = path.join(targetDir, path.basename(src)), i = 1;
            while (fs.existsSync(dst)) { dst = path.join(targetDir, `${b} copy${i > 1 ? ' ' + i : ''}${ext}`); i++; }
            fs.cpSync(src, dst, { recursive: true });
            out.push(path.relative(REPO_ROOT, dst).split(path.sep).join('/'));
          }
          return send(res, 200, { ok: true, copied: out });
        }
        if (p === '/api/fs/delete') {
          for (const rel of (body.paths || [])) {
            const abs = safeRepoPath(rel);
            if (abs === REPO_ROOT) return send(res, 400, { error: 'refusing to delete repo root' });
            fs.rmSync(abs, { recursive: true, force: true });
          }
          return send(res, 200, { ok: true });
        }
        return send(res, 404, { error: 'unknown fs op' });
      } catch (e) { return send(res, 400, { error: e.message }); }
    }

    // ---- OS interop: upload (raw body per file) + zip (zero-dep, store-only) ----
    // Upload transport is one raw-body request per file (?dir=&rel=) rather than
    // multipart: zero-dep, streams, per-file guards/progress/cancel for free.
    if (p === '/api/upload' && req.method === 'POST') {
      try {
        const dirRel = (u.searchParams.get('dir') || '').replace(/\\/g, '/');
        const rel = (u.searchParams.get('rel') || '').replace(/\\/g, '/');
        const segs = rel.split('/');
        if (!rel || segs.some((s) => !s || s === '.' || s === '..')) return send(res, 400, { error: 'invalid relative path' });
        const badName = (n) => /[<>:"|?*\x00-\x1f]/.test(n) || n.length > 255;
        if (segs.some(badName)) return send(res, 400, { error: `invalid name: ${rel}` });
        if (segs.some((s) => IGNORE_DIRS.has(s)) || dirRel.split('/').some((s) => IGNORE_DIRS.has(s)))
          return send(res, 403, { error: 'blocked directory' });
        const declared = parseInt(req.headers['content-length'] || '0', 10);
        if (declared > UPLOAD_MAX) return send(res, 413, { error: `"${rel}" exceeds the ${UPLOAD_MAX / 1048576} MB cap` });
        let abs = safeRepoPath((dirRel ? dirRel + '/' : '') + rel);
        // collision → auto-suffix, never overwrite (mirrors paste behavior)
        if (fs.existsSync(abs)) { const ext = path.extname(abs), b = path.basename(abs, ext), d = path.dirname(abs);
          let i = 2; do { abs = path.join(d, `${b} ${i++}${ext}`); } while (fs.existsSync(abs)); }
        fs.mkdirSync(path.dirname(abs), { recursive: true });
        const chunks = []; let total = 0, aborted = false;
        req.on('data', (c) => { total += c.length; if (total > UPLOAD_MAX) { aborted = true; try { send(res, 413, { error: `"${rel}" exceeds the ${UPLOAD_MAX / 1048576} MB cap` }); } catch {} req.destroy(); } else chunks.push(c); });
        req.on('end', () => { if (aborted) return;
          try { fs.writeFileSync(abs, Buffer.concat(chunks));
            send(res, 200, { ok: true, path: path.relative(REPO_ROOT, abs).split(path.sep).join('/') });
          } catch (e) { try { send(res, 500, { error: e.message }); } catch {} } });
        return;
      } catch (e) { return send(res, 400, { error: e.message }); }
    }

    if (p === '/api/zip' && req.method === 'GET') {
      try {
        const zlib = require('zlib');
        // zlib.crc32 needs Node >= 20.15; the app's floor is 18 → pure-JS fallback
        let crc32 = zlib.crc32;
        if (typeof crc32 !== 'function') {
          if (!global._crcT) { const t = new Uint32Array(256);
            for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; } global._crcT = t; }
          crc32 = (buf) => { const T = global._crcT; let c = 0xFFFFFFFF;
            for (let i = 0; i < buf.length; i++) c = T[(c ^ buf[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
        }
        const one = u.searchParams.get('path');
        const many = (u.searchParams.get('paths') || '').split(',').filter(Boolean);
        const roots = one ? [one] : many;
        if (!roots.length) return send(res, 400, { error: 'path or paths required' });
        const entries = [];
        const walkZ = (abs, zrel) => { const st = fs.statSync(abs);
          if (st.isDirectory()) { for (const n of fs.readdirSync(abs)) { if (IGNORE_DIRS.has(n)) continue; walkZ(path.join(abs, n), zrel + '/' + n); } }
          else if (st.size <= UPLOAD_MAX) entries.push({ abs, zrel }); };
        for (const r of roots) {
          if (r.split(/[\\/]/).some((s) => IGNORE_DIRS.has(s))) return send(res, 403, { error: 'blocked directory' });
          const abs = safeRepoPath(r); const st = fs.statSync(abs); const base = path.basename(abs) || 'files';
          st.isDirectory() ? walkZ(abs, base) : entries.push({ abs, zrel: base });
        }
        if (!entries.length) return send(res, 400, { error: 'nothing to zip' });
        if (entries.length > 5000) return send(res, 400, { error: 'too many files for one zip (5000 max)' });
        const zipName = one ? (path.basename(one) || 'files') + '.zip' : 'selection.zip';
        // store-only ZIP: local headers + central directory + EOCD; CRC via zlib.crc32
        const parts = [], central = []; let offset = 0;
        for (const en of entries) {
          const data = fs.readFileSync(en.abs);
          const name = Buffer.from(en.zrel.replace(/^\/+/, ''), 'utf8');
          const crc = crc32(data) >>> 0;
          const mt = new Date(fs.statSync(en.abs).mtimeMs);
          const t = ((mt.getHours() << 11) | (mt.getMinutes() << 5) | (mt.getSeconds() >> 1)) & 0xffff;
          const dt = ((Math.max(0, mt.getFullYear() - 1980) << 9) | ((mt.getMonth() + 1) << 5) | mt.getDate()) & 0xffff;
          const lh = Buffer.alloc(30);
          lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6); lh.writeUInt16LE(0, 8);
          lh.writeUInt16LE(t, 10); lh.writeUInt16LE(dt, 12); lh.writeUInt32LE(crc, 14);
          lh.writeUInt32LE(data.length, 18); lh.writeUInt32LE(data.length, 22);
          lh.writeUInt16LE(name.length, 26); lh.writeUInt16LE(0, 28);
          parts.push(lh, name, data);
          const ch = Buffer.alloc(46);
          ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8); ch.writeUInt16LE(0, 10);
          ch.writeUInt16LE(t, 12); ch.writeUInt16LE(dt, 14); ch.writeUInt32LE(crc, 16);
          ch.writeUInt32LE(data.length, 20); ch.writeUInt32LE(data.length, 24);
          ch.writeUInt16LE(name.length, 28); ch.writeUInt32LE(offset, 42);
          central.push(Buffer.concat([ch, name]));
          offset += 30 + name.length + data.length;
        }
        const cd = Buffer.concat(central);
        const eocd = Buffer.alloc(22);
        eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(entries.length, 8); eocd.writeUInt16LE(entries.length, 10);
        eocd.writeUInt32LE(cd.length, 12); eocd.writeUInt32LE(offset, 16);
        const body = Buffer.concat([...parts, cd, eocd]);
        res.writeHead(200, { 'Content-Type': 'application/zip', 'Content-Disposition': `attachment; filename="${zipName}"`, 'Content-Length': body.length });
        return res.end(body);
      } catch (e) { return send(res, 400, { error: e.message }); }
    }

    if (p === '/api/chats' && req.method === 'GET') {
      return send(res, 200, { chats: listChats() });
    }

    // Native search across chats (title + message content), returns a snippet.
    if (p === '/api/search-chats' && req.method === 'GET') {
      const q = (u.searchParams.get('q') || '').toLowerCase().trim();
      if (!q) return send(res, 200, { chats: listChats() });
      const out = [];
      for (const f of fs.readdirSync(CHATS_DIR)) {
        if (!f.endsWith('.json')) continue;
        try {
          const c = JSON.parse(fs.readFileSync(path.join(CHATS_DIR, f), 'utf8'));
          const msgs = c.messages || [];
          const titleHit = (c.title || '').toLowerCase().includes(q);
          let snippet = '';
          for (const m of msgs) {
            const t = (m.content || '').toString();
            const i = t.toLowerCase().indexOf(q);
            if (i >= 0) { snippet = t.slice(Math.max(0, i - 32), i + 60).replace(/\s+/g, ' ').trim(); break; }
          }
          if (titleHit || snippet) out.push({ id: c.id, title: c.title, updated: c.updated, count: msgs.length, bp: c.bp === true, snippet });
        } catch {}
      }
      out.sort((a, b) => (b.updated || '').localeCompare(a.updated || ''));
      return send(res, 200, { chats: out, q });
    }

    if (p === '/api/chat' && req.method === 'GET') {
      const chat = loadChat(u.searchParams.get('id'));
      if (!chat) return send(res, 404, { error: 'no such chat' });
      return send(res, 200, chat);
    }

    if (p === '/api/chat' && req.method === 'POST') {
      const body = await readJsonBody(req);
      let message = (body.message || '').toString();
      let attachments = Array.isArray(body.attachments) ? body.attachments.filter(Boolean) : [];
      const regenerate = body.regenerate === true;
      if (!regenerate && !message.trim() && !attachments.length) return send(res, 400, { error: 'empty message' });
      // `title` lets the caller (e.g. digest) set a friendly name distinct from the prompt.
      const forcedTitle = (body.title || '').toString().trim();

      let chat = body.id ? loadChat(body.id) : null;
      if (regenerate) {
        // "Try again": drop the last reply and re-run the preceding user turn.
        if (!chat || !chat.messages.length) return send(res, 400, { error: 'nothing to regenerate' });
        while (chat.messages.length && chat.messages[chat.messages.length - 1].role === 'assistant') chat.messages.pop();
        const lastUser = [...chat.messages].reverse().find((m) => m.role === 'user');
        if (!lastUser) return send(res, 400, { error: 'nothing to regenerate' });
        message = lastUser.content || '';
        attachments = Array.isArray(lastUser.attachments) ? lastUser.attachments.filter(Boolean) : [];
      } else {
        if (!chat) {
          chat = {
            id: crypto.randomUUID(),
            title: forcedTitle || (body.ingest === true ? 'Ingest — ' + nowIso().slice(0, 10) : '') || message.slice(0, 60) || 'Attached files',
            sessionId: null,
            bp: body.bp === true,
            created: nowIso(),
            updated: nowIso(),
            messages: [],
          };
        }
        chat.messages.push({ role: 'user', content: message, ts: nowIso(), attachments });
      }

      // Anchor the action log with the intent behind this turn ("when did I tell it to…").
      if (!body.regenerate) {
        logAction({
          source: 'app',
          type: body.bp === true ? 'bp-chat' : (body.ingest === true ? 'ingest' : 'chat'),
          summary: (message || '').slice(0, 300) || (attachments.length ? attachments.join(', ') : ''),
          chatId: chat && chat.id,
          meta: attachments.length ? { attachments } : null,
        });
      }

      // Give Claude the attachment paths so it can open them with its own tools.
      const ingest = body.ingest === true;
      let promptToClaude = message;
      // Embed text attachments' CONTENT inline so the assistant works from it directly and
      // never hunts the filesystem. (Bug it fixes: the assistant doubted the saved copy,
      // searched for the original name, found it in Downloads, and hit a permission gate
      // instead of reading the copy already in crs-brain/data/attachments/.)
      const TEXT_RE = /\.(md|markdown|txt|json|csv|ya?ml|log|html?)$/i;
      const embedAttachment = (a) => {
        try {
          if (TEXT_RE.test(a)) {
            const abs = safeRepoPath(a);
            if (fs.statSync(abs).size <= 300 * 1024) {
              return `----- FILE: ${a} -----\n${fs.readFileSync(abs, 'utf8')}\n----- END FILE -----`;
            }
            return `- ${a}  (large file at this EXACT repo path — Read it directly; do NOT search elsewhere)`;
          }
        } catch {}
        return `- ${a}  (saved at this EXACT repo path — Read it directly; do NOT search the filesystem or Downloads)`;
      };
      if (attachments.length) {
        const blocks = attachments.map(embedAttachment).join('\n\n');
        const anyText = attachments.some((a) => TEXT_RE.test(a));
        const noHunt = anyText
          ? 'The file content is included inline below — work from it directly. Do NOT read files, glob, search the filesystem, or look in Downloads; you already have everything. Read any non-text file listed only at its exact repo path.'
          : 'Read the file(s) at the EXACT repo path shown with the Read tool. Do NOT search the filesystem or Downloads.';
        promptToClaude = ingest
          ? `${INGEST_PROMPT}\n\n${noHunt}\n\n${blocks}\n\n${message || 'Ingest this report into the brain.'}`
          : `The user attached the following in the repo. ${noHunt}\n\n${blocks}\n\n${message}`;
      } else if (ingest) {
        // Ingest of pasted text (no file): treat the message itself as the report.
        promptToClaude = `${INGEST_PROMPT}\n\nThe report is the user message below.\n\n${message}`;
      }

      // Stream Server-Sent Events back to the browser.
      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });
      // Abort the claude run if the browser hits Stop (fetch aborted → socket closes).
      const ac = new AbortController();
      let clientGone = false;
      req.on('close', () => { clientGone = true; ac.abort(); });
      const sse = (o) => { if (clientGone) return; try { res.write(`data: ${JSON.stringify(o)}\n\n`); } catch {} };
      sse({ type: 'meta', id: chat.id, title: chat.title });

      let streamed = '';
      try {
        const cfg = loadSettings();
        const runOpts = {
          model: (body.model || cfg.model || '').toString() || undefined,
          effort: (body.effort || cfg.effort || '').toString() || undefined,
          signal: ac.signal,
        };
        // Buildprint chats run in the cloned Bubble workspace with the guardrailed
        // BP prompt, and can still read/write the brain repo (--add-dir).
        if (chat.bp) {
          const ws = findBpWorkspace();
          if (!ws) { sse({ type: 'error', error: 'Buildprint workspace not found. Link the CLI and clone the Test branch into ~/projects/crs-bubble/ first.' }); return res.end(); }
          runOpts.cwd = ws.dir;
          runOpts.systemPrompt = withMemory(BP_PROMPT(ws));   // agent always honors persistent memory
          runOpts.addDirs = [REPO_ROOT];
        } else {
          runOpts.systemPrompt = withMemory(SYSTEM_PROMPT);   // same for the general assistant
        }
        // "Remember this" → compile the message into structured memory in the
        // background; emit a toast when saved. Runs concurrently with the reply,
        // and is awaited before the stream ends so the save is guaranteed.
        const wantMemory = !ingest && !body.regenerate && MEMORY_TRIGGER.test(message || '');
        const memPromise = wantMemory
          ? compileMemory(message).then((saved) => {
              if (saved && saved.length) sse({ type: 'memory-saved', entries: saved.map((m) => ({ category: m.category, title: m.title, fact: m.fact })) });
              return saved;
            }).catch(() => [])
          : Promise.resolve([]);
        const result = await runClaudeStream(promptToClaude, chat.sessionId, {
          onDelta: (t) => { streamed += t; sse({ type: 'delta', text: t }); },
          onThink: (t) => sse({ type: 'think', text: t }),
          onBlock: (b) => sse({ type: 'block', kind: b.kind, tool: b.tool || null }),
          onDetail: (t) => sse({ type: 'detail', text: t }),
          onLabel: (t) => sse({ type: 'label', text: t }),
          onStatus: (s) => sse({ type: 'status', text: s }),
          onUsage: (u) => sse({ type: 'usage', in: u.in, out: u.out }),
        }, runOpts);
        const finalText = result.text || streamed;
        chat.sessionId = result.sessionId || chat.sessionId;
        chat.updated = nowIso();
        // Persist whatever was produced — even a partial reply from Stop — so it
        // survives reload and can be continued from the same session.
        chat.messages.push({ role: 'assistant', content: finalText, ts: nowIso(), ...(result.aborted ? { partial: true } : {}) });
        saveChat(chat);
        autoCommit(chat.title);
        await memPromise;   // ensure the memory save + toast land before we close the stream
        sse({ type: result.aborted ? 'stopped' : 'done', id: chat.id, title: chat.title, reply: finalText, sessionId: chat.sessionId });
      } catch (e) {
        // Persist the chat anyway — otherwise the user's message (and a brand-new
        // chat entirely) vanishes on a claude error, with no retry possible.
        try {
          if (streamed) chat.messages.push({ role: 'assistant', content: streamed, ts: nowIso(), partial: true });
          chat.updated = nowIso();
          saveChat(chat);
        } catch {}
        sse({ type: 'error', error: e.message, id: chat.id });
      }
      return res.end();
    }

    if (p === '/api/chat' && req.method === 'DELETE') {
      const id = u.searchParams.get('id');
      try { fs.unlinkSync(chatPath(id)); } catch {}
      return send(res, 200, { ok: true });
    }

    // ---- Buildprint copilot ----
    if (p === '/api/bp/status' && req.method === 'GET') {
      const ws = findBpWorkspace();
      let tracked = null; try { tracked = fs.existsSync(BP_TRACK_FILE); } catch {}
      return send(res, 200, { ready: !!ws, app: ws?.app || null, branch: ws?.branch || null, baseline: !!tracked });
    }

    // Sync from Buildprint and update the brain ledger to match (streaming).
    if (p === '/api/bp/track' && req.method === 'POST') {
      const body = await readJsonBody(req).catch(() => ({}));
      res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
      const ac = new AbortController();
      let clientGone = false;
      req.on('close', () => { clientGone = true; ac.abort(); });
      const sse = (o) => { if (clientGone) return; try { res.write(`data: ${JSON.stringify(o)}\n\n`); } catch {} };
      sse({ type: 'status', text: 'syncing from Bubble' });
      const r = await bpSyncDiff();
      if (r.error) { sse({ type: 'error', error: r.error === 'workspace not found' ? 'Buildprint workspace not found — link the CLI and clone the Test branch first.' : r.error }); return res.end(); }
      if (r.first) { sse({ type: 'delta', text: '**Baseline set.** I synced the current Bubble state and marked it as the starting point.\n\nFrom now on: make your changes in Buildprint, then hit **Sync from Buildprint** and I\'ll update the brain (database, design, security, workflows…) to match.' }); sse({ type: 'done', reply: 'baseline set' }); return res.end(); }
      if (!r.changed.length) { sse({ type: 'delta', text: '**No changes** in Bubble since the last sync — the brain is already up to date.' }); sse({ type: 'done', reply: 'no changes' }); return res.end(); }
      // Real changes → let the brain ingest them into the ledger.
      const listShown = r.changed.slice(0, 150);
      const more = r.changed.length > 150 ? `\n…and ${r.changed.length - 150} more files` : '';
      const chat = { id: crypto.randomUUID(), title: 'Buildprint sync — ' + nowIso().slice(0, 16).replace('T', ' '), bp: true, sessionId: null, created: nowIso(), updated: nowIso(), messages: [{ role: 'user', content: `Sync ${r.changed.length} change(s) from Buildprint into the brain.`, ts: nowIso() }] };
      const message = `Changed in the CRS Bubble app (test) since last sync — git name-status ${r.base.slice(0, 7)}..${r.head.slice(0, 7)}:\n\n${listShown.join('\n')}${more}\n\nUpdate the brain ledger to reflect these changes.`;
      let streamed = '';
      try {
        const cfg = loadSettings();
        const result = await runClaudeStream(message, null, {
          onDelta: (t) => { streamed += t; sse({ type: 'delta', text: t }); },
          onThink: (t) => sse({ type: 'think', text: t }),
          onBlock: (b) => sse({ type: 'block', kind: b.kind, tool: b.tool || null }),
          onDetail: (t) => sse({ type: 'detail', text: t }),
          onLabel: (t) => sse({ type: 'label', text: t }),
          onStatus: (s) => sse({ type: 'status', text: s }),
        }, { model: (body.model || cfg.model || '').toString() || undefined, effort: (body.effort || cfg.effort || '').toString() || undefined, signal: ac.signal, cwd: r.ws.dir, systemPrompt: BP_TRACK_PROMPT, addDirs: [REPO_ROOT] });
        chat.messages.push({ role: 'assistant', content: result.text || streamed, ts: nowIso(), ...(result.aborted ? { partial: true } : {}) });
        chat.sessionId = result.sessionId; saveChat(chat);
        // Advance the baseline ONLY on a completed ingest — an aborted run must stay
        // re-syncable, else those Bubble changes become permanently invisible.
        if (!result.aborted) { fs.writeFileSync(BP_TRACK_FILE, r.head); autoCommit('buildprint sync → brain'); }
        sse({ type: result.aborted ? 'stopped' : 'done', id: chat.id, reply: result.text || streamed });
      } catch (e) { sse({ type: 'error', error: e.message }); }
      return res.end();
    }
    if (p === '/api/bp/history' && req.method === 'GET') {
      const c = loadBpChat();
      return send(res, 200, { messages: c.messages || [] });
    }
    if (p === '/api/bp/reset' && req.method === 'POST') {
      saveBpChat({ sessionId: null, messages: [] });
      return send(res, 200, { ok: true });
    }
    if (p === '/api/bp/chat' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const message = (body.message || '').toString();
      if (!message.trim()) return send(res, 400, { error: 'empty message' });
      const ws = findBpWorkspace();
      res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
      const ac = new AbortController();
      let clientGone = false;
      req.on('close', () => { clientGone = true; ac.abort(); });
      const sse = (o) => { if (clientGone) return; try { res.write(`data: ${JSON.stringify(o)}\n\n`); } catch {} };
      if (!ws) { sse({ type: 'error', error: 'Buildprint workspace not found. Link the CLI and clone the Test branch into ~/projects/crs-bubble/ first.' }); return res.end(); }
      const chat = loadBpChat();
      chat.messages.push({ role: 'user', content: message, ts: nowIso() });
      sse({ type: 'meta' });
      let streamed = '';
      try {
        const cfg = loadSettings();
        const result = await runClaudeStream(message, chat.sessionId, {
          onDelta: (t) => { streamed += t; sse({ type: 'delta', text: t }); },
          onThink: (t) => sse({ type: 'think', text: t }),
          onBlock: (b) => sse({ type: 'block', kind: b.kind, tool: b.tool || null }),
          onDetail: (t) => sse({ type: 'detail', text: t }),
          onLabel: (t) => sse({ type: 'label', text: t }),
          onStatus: (s) => sse({ type: 'status', text: s }),
        }, {
          model: (body.model || cfg.model || '').toString() || undefined,
          effort: (body.effort || cfg.effort || '').toString() || undefined,
          signal: ac.signal,
          cwd: ws.dir,
          systemPrompt: BP_PROMPT(ws),
          addDirs: [REPO_ROOT],
        });
        const finalText = result.text || streamed;
        chat.sessionId = result.sessionId || chat.sessionId;
        chat.messages.push({ role: 'assistant', content: finalText, ts: nowIso(), ...(result.aborted ? { partial: true } : {}) });
        saveBpChat(chat);
        autoCommit('buildprint chat');
        sse({ type: result.aborted ? 'stopped' : 'done', reply: finalText });
      } catch (e) {
        sse({ type: 'error', error: e.message });
      }
      return res.end();
    }

    if (p === '/api/usage' && req.method === 'GET') {
      return send(res, 200, { enabled: usageEnabled(), data: loadUsage() });
    }
    if (p === '/api/usage/enable' && req.method === 'POST') {
      enableUsage();
      return send(res, 200, { enabled: true });
    }
    if (p === '/api/usage/disable' && req.method === 'POST') {
      disableUsage();
      return send(res, 200, { enabled: false });
    }
    if (p === '/api/usage/populate' && req.method === 'POST') {
      if (populating) return send(res, 200, { ok: false, error: 'already fetching' });
      populating = true;
      const r = await populateUsage();
      populating = false;
      return send(res, 200, r);
    }

    if (p === '/api/settings' && req.method === 'GET') {
      return send(res, 200, loadSettings());
    }
    if (p === '/api/settings' && req.method === 'PUT') {
      const body = await readJsonBody(req);
      const cur = loadSettings();
      // Merge — never drop keys other callers may have stored in settings.json.
      const next = {
        ...cur,
        model: (body.model || cur.model).toString(),
        effort: (body.effort || cur.effort).toString(),
        autoRoute: typeof body.autoRoute === 'boolean' ? body.autoRoute : cur.autoRoute,
        bubbleWatch: typeof body.bubbleWatch === 'boolean' ? body.bubbleWatch : cur.bubbleWatch,
        theme: (body.theme === 'light' || body.theme === 'dark') ? body.theme : cur.theme,
        bpAutoTrack: typeof body.bpAutoTrack === 'boolean' ? body.bpAutoTrack : cur.bpAutoTrack,
        notify: body.notify && typeof body.notify === 'object'
          ? { ...(cur.notify || {}), ...body.notify, emailTo: String((body.notify.emailTo != null ? body.notify.emailTo : (cur.notify && cur.notify.emailTo) || '')).slice(0, 200) }
          : cur.notify,
        sounds: body.sounds && typeof body.sounds === 'object'
          ? {
              volume: body.sounds.volume != null ? Math.max(0, Math.min(100, Number(body.sounds.volume) || 0)) : cur.sounds.volume,
              events: body.sounds.events && typeof body.sounds.events === 'object'
                ? Object.fromEntries(SOUND_EVENTS.map((ev) => {
                    const v = body.sounds.events[ev] != null ? body.sounds.events[ev] : cur.sounds.events[ev];
                    return [ev, (v === 'none' || /^s\d{2}$/.test(String(v))) ? String(v) : cur.sounds.events[ev]];
                  }))
                : cur.sounds.events,
            }
          : cur.sounds,
      };
      saveSettings(next);
      return send(res, 200, next);
    }

    // ---- sounds: local WAV store (data/sounds/) ----
    if (p === '/api/ping') return send(res, 200, { ok: true, ts: Date.now() });
    if (p === '/api/sounds/list' && req.method === 'GET') {
      let files = [];
      try { files = fs.readdirSync(SOUNDS_DIR).filter((f) => f.endsWith('.wav')); } catch {}
      let total = 0;
      for (const f of files) { try { total += fs.statSync(path.join(SOUNDS_DIR, f)).size; } catch {} }
      return send(res, 200, { files, totalBytes: total });
    }
    if (p === '/api/sounds/save' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const file = String((body && body.file) || '');
      // Hard path guard: fixed name shape, no separators, always inside data/sounds/.
      if (!/^s\d{2}-[a-z0-9-]+\.wav$/.test(file)) return send(res, 400, { error: 'bad sound filename' });
      const abs = path.resolve(SOUNDS_DIR, file);
      if (!abs.startsWith(SOUNDS_DIR + path.sep)) return send(res, 403, { error: 'forbidden' });
      let buf;
      try { buf = Buffer.from(String((body && body.data) || ''), 'base64'); } catch { return send(res, 400, { error: 'bad data' }); }
      if (!buf.length || buf.length > 2 * 1024 * 1024) return send(res, 400, { error: 'bad size' });
      if (buf.slice(0, 4).toString('ascii') !== 'RIFF') return send(res, 400, { error: 'not a wav' });
      fs.mkdirSync(SOUNDS_DIR, { recursive: true });
      fs.writeFileSync(abs, buf);
      return send(res, 200, { ok: true, file, bytes: buf.length });
    }

    // ---- notifications (bell + inbox) ----
    if (p === '/api/notifications' && req.method === 'GET') {
      const items = readNotifications(100);
      const readAt = notifReadAt();
      const unread = items.filter((n) => new Date(n.ts).getTime() > readAt).length;
      return send(res, 200, { items, unread, readAt });
    }
    if (p === '/api/notifications' && req.method === 'POST') {
      const body = await readJsonBody(req).catch(() => ({}));
      return send(res, 200, addNotification(body || {}));
    }
    if (p === '/api/notifications/read' && req.method === 'POST') {
      try { fs.writeFileSync(NOTIF_READ_FILE, JSON.stringify({ at: Date.now() })); } catch {}
      return send(res, 200, { ok: true });
    }
    if (p === '/api/notifications/clear' && req.method === 'POST') {
      try { fs.writeFileSync(NOTIF_FILE, ''); } catch {}
      return send(res, 200, { ok: true });
    }

    // ---- connections: link Buildprint CLI with the user's token ----
    if (p === '/api/connections/buildprint-link' && req.method === 'POST') {
      const body = await readJsonBody(req).catch(() => ({}));
      const token = String((body && body.token) || '').trim();
      if (!token) return send(res, 400, { error: 'token required' });
      let done = false;
      // Windows: `buildprint` is a .cmd shim — spawn without a shell can't resolve it,
      // so wrap in cmd.exe /c (same fix as spawnClaude). Node still quotes args safely.
      const isWin = process.platform === 'win32';
      const child = isWin
        ? spawn('cmd.exe', ['/c', 'buildprint', 'link', token], { cwd: REPO_ROOT, windowsHide: true })
        : spawn(resolveBin('buildprint') || 'buildprint', ['link', token], { cwd: REPO_ROOT, windowsHide: true });
      let out = '';
      child.stdout.on('data', (d) => (out += d));
      child.stderr.on('data', (d) => (out += d));
      child.on('error', (e) => { if (done) return; done = true; send(res, 502, { error: 'buildprint not found on PATH: ' + e.message }); });
      child.on('close', (code) => {
        if (done) return; done = true;
        if (code === 0) { addNotification({ type: 'connection', level: 'success', title: 'Buildprint linked' }); send(res, 200, { ok: true }); }
        else send(res, 502, { error: (out.trim().slice(-300)) || ('exit ' + code) });
      });
      return;
    }
    // ---- SMTP settings (email notifications) — stored in gitignored data/smtp.json ----
    if (p === '/api/connections/smtp' && req.method === 'GET') {
      let s = {}; try { s = JSON.parse(fs.readFileSync(SMTP_FILE, 'utf8')); } catch {}
      // never return the password
      return send(res, 200, { configured: !!(s.host && s.port), host: s.host || '', port: s.port || '', user: s.user || '', from: s.from || '' });
    }
    if (p === '/api/connections/smtp' && req.method === 'POST') {
      const body = await readJsonBody(req).catch(() => ({}));
      let cur = {}; try { cur = JSON.parse(fs.readFileSync(SMTP_FILE, 'utf8')); } catch {}
      const clip = (v, n) => String(v == null ? '' : v).slice(0, n);
      const next = {
        host: clip(body.host, 200), port: clip(body.port, 6), user: clip(body.user, 200),
        from: clip(body.from, 200), pass: body.pass ? clip(body.pass, 300) : (cur.pass || ''),
      };
      try { fs.writeFileSync(SMTP_FILE, JSON.stringify(next, null, 2)); } catch (e) { return send(res, 500, { error: e.message }); }
      return send(res, 200, { ok: true });
    }
    if (p === '/api/connections/smtp-test' && req.method === 'POST') {
      let s = {}; try { s = JSON.parse(fs.readFileSync(SMTP_FILE, 'utf8')); } catch {}
      if (!s.host || !s.port) return send(res, 400, { ok: false, error: 'not configured' });
      const net = require('net');
      const sock = new net.Socket(); let done = false;
      const fin = (ok, error) => { if (done) return; done = true; try { sock.destroy(); } catch {} send(res, 200, { ok, error }); };
      sock.setTimeout(5000);
      sock.once('connect', () => fin(true));
      sock.once('timeout', () => fin(false, 'timeout'));
      sock.once('error', (e) => fin(false, e.code || e.message));
      try { sock.connect(Number(s.port), s.host); } catch (e) { fin(false, e.message); }
      return;
    }

    if (p === '/api/progress' && req.method === 'GET') {
      return send(res, 200, loadProgress());
    }

    // Action log — the activity ledger. GET reads/filters it (?q=&type=&since=&limit=),
    // POST records a UI-level action (client knows exactly what the user did).
    if (p === '/api/action-log' && req.method === 'GET') {
      const limit = Math.min(parseInt(u.searchParams.get('limit') || '500', 10) || 500, 5000);
      const filter = {
        q: u.searchParams.get('q') || '',
        type: u.searchParams.get('type') || '',
        since: parseInt(u.searchParams.get('since') || '0', 10) || 0,
      };
      return send(res, 200, { entries: readActionLog(limit, filter) });
    }
    if (p === '/api/action-log' && req.method === 'POST') {
      const body = await readJsonBody(req) || {};
      logAction({ source: 'app', type: body.type || 'action', summary: body.summary || '', chatId: body.chatId || null, meta: body.meta || null });
      return send(res, 200, { ok: true });
    }

    // Persistent memory — structured, categorized facts the agent always honors.
    if (p === '/api/memory' && req.method === 'GET') {
      return send(res, 200, { categories: MEMORY_CATEGORIES, entries: loadMemory() });
    }
    if (p === '/api/memory' && req.method === 'POST') {   // manual add / compile-from-text
      const body = await readJsonBody(req) || {};
      let saved = [];
      if (body.text && !body.fact) saved = await compileMemory(body.text);   // compile free text
      else saved = addMemories([{ category: body.category, title: body.title, fact: body.fact }]);
      return send(res, 200, { ok: true, entries: saved });
    }
    if (p === '/api/memory' && req.method === 'DELETE') {
      const id = u.searchParams.get('id');
      const arr = loadMemory().filter((m) => m.id !== id);
      saveMemoryArr(arr);
      return send(res, 200, { ok: true, count: arr.length });
    }

    // Wishlist — Brain-app improvement todos, managed in the Wishlist page.
    if (p === '/api/wishlist' && req.method === 'GET') {
      return send(res, 200, { ...loadWishlist(), statuses: WL_STATUS, priorities: WL_PRIO });
    }
    if (p === '/api/wishlist' && req.method === 'PUT') {
      const body = await readJsonBody(req);
      if (!body || !Array.isArray(body.items)) return send(res, 400, { error: 'items array required' });
      const saved = saveWishlist(body);
      autoCommit('wishlist');
      return send(res, 200, { ok: true, count: saved.items.length });
    }
    // Turn a wishlist idea into a complete, paste-ready Claude Code prompt (item w-fsbf5e).
    if (p === '/api/wishlist/prompt' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const item = (loadWishlist().items || []).find((i) => i.id === (body && body.id));
      if (!item) return send(res, 404, { error: 'wishlist item not found' });
      const cfg = loadSettings();
      // Writing a prompt is a mechanical transform → route to the cheap path when auto-route is on.
      const r = routeModel(cfg, 'generate prompt: ' + item.title, 'mechanical');
      let prompt = '';
      try {
        const result = await runClaudeStream(buildWishlistPromptMsg(item), null, {}, { model: r.model, effort: r.effort, systemPrompt: WL_CC_PROMPT, cwd: os.tmpdir() });
        prompt = (result.text || '').trim();
        // Unwrap a single outer code fence if the model added one — the client copies raw prompt text.
        const fence = prompt.match(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n```\s*$/i);
        if (fence) prompt = fence[1].trim();
      } catch (e) { return send(res, 502, { error: e.message }); }
      if (!prompt) return send(res, 502, { error: 'the brain returned nothing — try again' });
      return send(res, 200, { prompt, model: r.model, routed: r.routed });
    }

    // Progress Tree — priority-ordered module list (reorderable in the app). Plain
    // JSON, git-versioned. Seeded from data/CRS_Module_OptionSets.xlsx + brain/STATUS.md.
    if (p === '/api/modules' && req.method === 'GET') {
      const doc = loadModulesDoc();
      (doc.modules || []).forEach((m) => { if (!Array.isArray(m.checklist) || !m.checklist.length) m.checklist = defaultChecklist(); });
      if (!doc.statusVocab) doc.statusVocab = ['done', 'in-progress', 'not-started', 'roadmap'];
      return send(res, 200, doc);
    }
    if (p === '/api/modules' && req.method === 'PUT') {
      const body = await readJsonBody(req);
      if (!body || !Array.isArray(body.modules)) return send(res, 400, { error: 'modules array required' });
      const VOCAB = new Set(['done', 'in-progress', 'not-started', 'roadmap']);
      // Renumber order by array position; keep only known fields; guard status.
      body.modules = body.modules.map((m, i) => ({
        id: String(m.id || ''), name: String(m.name || ''), section: String(m.section || ''),
        route: String(m.route || ''), icon: String(m.icon || ''),
        status: VOCAB.has(m.status) ? m.status : 'roadmap',
        note: String(m.note || ''), checklist: sanitizeChecklist(m.checklist), order: i + 1,
      }));
      if (!body.statusVocab) body.statusVocab = ['done', 'in-progress', 'not-started', 'roadmap'];
      fs.writeFileSync(MODULES_FILE, JSON.stringify(body, null, 2));
      autoCommit('progress tree');
      return send(res, 200, { ok: true, count: body.modules.length });
    }
    // Per-module detail: everything the brain knows about the module, aggregated live.
    if (p === '/api/modules/detail' && req.method === 'GET') {
      const id = u.searchParams.get('id');
      const mod = (loadModulesDoc().modules || []).find((m) => m.id === id);
      if (!mod) return send(res, 404, { error: 'module not found' });
      return send(res, 200, moduleDetail(mod));
    }
    // Per-module Buildprint prompt, pre-filled with the module's up-to-date context.
    // kind: 'edit' → paste into Buildprint app (applies); 'sync' → read-only audit → brain.
    if (p === '/api/modules/prompt' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const mod = (loadModulesDoc().modules || []).find((m) => m.id === (body && body.id));
      if (!mod) return send(res, 404, { error: 'module not found' });
      const d = moduleDetail(mod);
      const kind = body && body.kind === 'edit' ? 'edit' : 'sync';
      const prompt = kind === 'edit' ? buildEditPrompt(mod, d) : buildSyncPrompt(mod, d);
      return send(res, 200, { kind, prompt });
    }
    // Text-driven EDIT prompt: Vlad types what he wants; the brain writes a proper
    // Buildprint prompt from it, grounded in the module's brain context + live workspace.
    if (p === '/api/modules/edit-prompt' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const mod = (loadModulesDoc().modules || []).find((m) => m.id === (body && body.id));
      if (!mod) return send(res, 404, { error: 'module not found' });
      const text = (body && body.text || '').toString().trim();
      if (!text) return send(res, 400, { error: 'Describe what you want done first.' });
      const d = moduleDetail(mod);
      const ctx = [
        `MODULE: ${mod.name} · section ${mod.section} · route ${mod.route || '(unset)'} · tracked status ${mod.status}${mod.note ? ' — ' + mod.note : ''}`,
        d.statusBlock ? 'STATUS.md detail:\n' + d.statusBlock : '',
        d.dataModel ? 'Data model (as-built reference):\n' + d.dataModel : '',
        d.perms ? 'Permissions:\n' + d.perms : '',
        d.workflows ? 'Workflows:\n' + d.workflows : '',
      ].filter(Boolean).join('\n\n');
      const userMsg = `MODULE CONTEXT (from the CRS brain — use it, don't restate it blindly):\n${ctx}\n\n---\nVLAD'S REQUEST — write the task breakdown to accomplish this on this module:\n${text}`;
      const cfg = loadSettings();
      let tasks = '';
      try {
        // Writing a task breakdown is a mechanical transform — low effort, and no workspace
        // --add-dir (Task 0 tells Buildprint to inventory real elements when it runs). The
        // ~25-30s floor is claude CLI startup, not inference, so model choice doesn't change it.
        const result = await runClaudeStream(userMsg, null, {}, { model: cfg.model, effort: 'low', systemPrompt: EDIT_TASKS_PROMPT });
        tasks = (result.text || '').trim().replace(/^```(?:markdown|md)?\s*/i, '').replace(/```\s*$/, '').trim();
      } catch (e) { return send(res, 502, { error: e.message }); }
      if (!tasks) return send(res, 502, { error: 'the brain returned nothing — try again' });
      return send(res, 200, { prompt: buildEditWrapper(mod, d, text, tasks) });
    }

    // Ideas board (map drawer) — plain JSON, git-versioned with the rest of data/.
    if (p === '/api/ideas' && req.method === 'GET') {
      try { return send(res, 200, JSON.parse(fs.readFileSync(IDEAS_FILE, 'utf8'))); }
      catch { return send(res, 200, { columns: { inbox: [], exploring: [], planned: [], done: [] } }); }
    }
    if (p === '/api/ideas' && req.method === 'PUT') {
      const body = await readJsonBody(req);
      fs.writeFileSync(IDEAS_FILE, JSON.stringify(body, null, 2));
      autoCommit('ideas board');
      return send(res, 200, { ok: true });
    }

    // ---- Build packets: plan → Buildprint prompt pipeline ----
    if (p === '/api/plans' && req.method === 'GET') {
      return send(res, 200, loadPlans());
    }
    if (p === '/api/plans' && req.method === 'PUT') {
      const body = await readJsonBody(req);
      const bad = validPlans(body);
      if (bad) return send(res, 400, { error: bad });
      savePlans(body);
      autoCommit('build packets');
      return send(res, 200, { ok: true });
    }
    // Generate a build packet for one module, grounded in the brain ledger.
    if (p === '/api/plans/generate' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const module_ = (body.module || '').toString().trim();
      if (!module_) return send(res, 400, { error: 'module required' });
      const notes = (body.notes || '').toString().trim();
      const cfg = loadSettings();
      let raw = '';
      try {
        // Give the generator the LIVE Bubble workspace too (read-only context) so
        // packets reflect actual current state, not just the brain ledger.
        const ws = findBpWorkspace();
        const result = await runClaudeStream(
          `Generate the build packet for module: ${module_}${notes ? `\n\nExtra context from Vlad: ${notes}` : ''}`,
          null, {}, { model: cfg.model, effort: cfg.effort, systemPrompt: PLAN_GEN_PROMPT, ...(ws ? { addDirs: [ws.dir] } : {}) });
        raw = (result.text || '').trim();
      } catch (e) { return send(res, 502, { error: e.message }); }
      // Strip code fences if the model added them despite instructions.
      const jsonText = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
      let parsed;
      try { parsed = JSON.parse(jsonText); }
      catch { return send(res, 502, { error: 'could not parse the generated packet', raw }); }
      if (parsed.error) return send(res, 422, { error: parsed.error });
      if (!parsed.title || !Array.isArray(parsed.steps) || !parsed.steps.length) {
        return send(res, 502, { error: 'generated packet has no steps', raw });
      }
      const plans = loadPlans();
      const packet = {
        id: crypto.randomUUID(),
        module: module_,
        title: parsed.title,
        createdAt: nowIso(), updatedAt: nowIso(),
        steps: parsed.steps.map((s, i) => ({
          id: `s${i + 1}-${crypto.randomBytes(3).toString('hex')}`,
          title: (s.title || `Step ${i + 1}`).toString(),
          entities: (s.entities || '').toString(),
          detail: (s.detail || '').toString(),
          constraints: (s.constraints || '').toString(),
          verify: (s.verify || '').toString(),
          status: 'pending', chatId: null, promptedAt: null,
        })),
      };
      plans.packets.push(packet);
      plans.activePacket = packet.id;
      savePlans(plans);
      autoCommit(`build packet: ${module_}`);
      return send(res, 200, { packet });
    }
    // Expand one step into a guardrail-hardened Buildprint prompt (no LLM call).
    if (p === '/api/plans/step-prompt' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const plans = loadPlans();
      const packet = plans.packets.find((x) => x.id === body.packetId);
      const step = packet && packet.steps.find((s) => s.id === body.stepId);
      if (!step) return send(res, 404, { error: 'packet/step not found' });
      return send(res, 200, { prompt: bpStepPrompt(packet, step) });
    }

    // ---- Bubble app data (parsed from the cloned workspace) ----
    if (p === '/api/bubble/state' && req.method === 'GET') {
      return send(res, 200, bubbleState());
    }
    // Pull the latest snapshot from Bubble (buildprint sync), re-parse, and report
    // what changed since the brain last ingested. Does NOT advance the ingest
    // baseline — "Sync into brain" (bp/track) owns that.
    if (p === '/api/bubble/refresh' && req.method === 'POST') {
      const r = await bpSyncDiff();
      if (r.error) return send(res, 502, { error: r.error });
      return send(res, 200, { state: bubbleState(), first: !!r.first, changed: r.changed || [], base: r.base || null, head: r.head || null });
    }
    // Bubble platform watcher — run the release-notes/forum scan on demand (item w-forum/w-relnotes).
    if (p === '/api/bubble/digest' && req.method === 'POST') {
      const body = await readJsonBody(req).catch(() => ({}));
      try {
        const r = await runBubbleDigest(body && body.since);
        saveSettings({ ...loadSettings(), bubbleCheckedAt: Date.now() });
        autoCommit('bubble watch → brain digest (manual)');
        return send(res, 200, { ok: true, flagged: r.flagged, section: r.section });
      } catch (e) { return send(res, 502, { error: e.message }); }
    }

    // Save an uploaded attachment (base64) into data/attachments; return its repo-relative path.
    if (p === '/api/attach' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const name = (body.name || 'file').toString().replace(/[^\w.\- ]+/g, '_').slice(0, 80);
      const data = Buffer.from((body.dataBase64 || '').toString(), 'base64');
      if (!data.length) return send(res, 400, { error: 'empty file' });
      if (data.length > 25 * 1024 * 1024) return send(res, 413, { error: 'file too large (25MB max)' });
      const stamp = crypto.randomBytes(4).toString('hex');
      const abs = path.join(ATTACH_DIR, `${stamp}-${name}`);
      fs.writeFileSync(abs, data);
      const rel = path.relative(REPO_ROOT, abs).split(path.sep).join('/');
      return send(res, 200, { path: rel, name });
    }

    // Save an assistant reply as a markdown document; return its repo-relative path.
    if (p === '/api/savedoc' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const raw = (body.title || 'document').toString();
      const slug = raw.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'document';
      const abs = path.join(DOCS_DIR, `${slug}.md`);
      fs.writeFileSync(abs, (body.content || '').toString());
      const rel = path.relative(REPO_ROOT, abs).split(path.sep).join('/');
      return send(res, 200, { path: rel });
    }

    // Serve the rendered notification WAVs (data/sounds/ is outside PUBLIC_DIR).
    if (p.startsWith('/sounds/') && req.method === 'GET') {
      const file = p.slice('/sounds/'.length);
      if (!/^s\d{2}-[a-z0-9-]+\.wav$/.test(file)) return send(res, 404, { error: 'not found' });
      return fs.readFile(path.join(SOUNDS_DIR, file), (err, data) => {
        if (err) return send(res, 404, { error: 'not found' });
        res.writeHead(200, { 'Content-Type': 'audio/wav', 'Cache-Control': 'no-cache, must-revalidate' });
        res.end(data);
      });
    }

    // Serve raw file bytes (images, html previews) from inside the repo.
    if (p === '/api/raw' && req.method === 'GET') {
      const abs = safeRepoPath(u.searchParams.get('path'));
      const ext = path.extname(abs).toLowerCase();
      const M = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.gif':'image/gif',
        '.svg':'image/svg+xml', '.webp':'image/webp', '.html':'text/html; charset=utf-8',
        '.css':'text/css', '.js':'text/javascript', '.json':'application/json',
        '.pdf':'application/pdf' };   // inline PDF render in the document popup
      return fs.readFile(abs, (err, data) => {
        if (err) return send(res, 404, { error: 'not found' });
        const h = { 'Content-Type': M[ext] || 'application/octet-stream' };
        // ?dl=1 → attachment (drag-out / Download). Default stays INLINE because
        // /api/raw doubles as the preview/thumbnail/pdf-embed source.
        if (u.searchParams.get('dl')) h['Content-Disposition'] = `attachment; filename="${path.basename(abs).replace(/"/g, '')}"`;
        res.writeHead(200, h);
        res.end(data);
      });
    }

    // Open a repo file with the OS default app (html → default browser).
    if (p === '/api/open' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const abs = safeRepoPath(body.path);
      if (!fs.existsSync(abs)) return send(res, 404, { error: 'not found' });
      const cmd = process.platform === 'win32' ? ['cmd.exe', ['/c', 'start', '', abs]]
                : process.platform === 'darwin' ? ['open', [abs]]
                : ['xdg-open', [abs]];
      const child = spawn(cmd[0], cmd[1], { detached: true, stdio: 'ignore' });
      child.on('error', () => {});
      child.unref();
      return send(res, 200, { ok: true });
    }

    if (p === '/api/auth/status' && req.method === 'GET') {
      return send(res, 200, await authStatus());
    }

    if (p === '/api/auth/login' && req.method === 'POST') {
      launchLogin();
      return send(res, 200, { started: true });
    }

    if (p === '/api/auth/logout' && req.method === 'POST') {
      await runLogout();
      return send(res, 200, { ok: true });
    }

    if (p === '/api/digest-context' && req.method === 'GET') {
      const days = Math.max(1, Math.min(90, parseInt(u.searchParams.get('days')) || 7));
      const log = await gitLog(days);
      return send(res, 200, { days, log, progress: loadProgress() });
    }

    if (p === '/api/progress' && req.method === 'PUT') {
      const body = await readJsonBody(req);
      body.updated = nowIso();
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(body, null, 2));
      return send(res, 200, { ok: true });
    }

    // ---- static ----
    if (p === '/map' && req.method === 'GET') return serveStatic(res, '/map.html');
    if (req.method === 'GET') return serveStatic(res, p);

    return send(res, 404, { error: 'not found' });
  } catch (e) {
    return send(res, 500, { error: e.message });
  }
});

// ---- weekly manual sync ------------------------------------------------------
// Keeps brain/bubble + brain/buildprint mirrors fresh. Runs at most once per
// 7 days, checked hourly and shortly after boot. Failures keep the old mirror.
const MANUALS_WEEK = 7 * 24 * 3600 * 1000;
let manualsRunning = false;
function maybeSyncManuals() {
  if (manualsRunning) return;
  const s = loadSettings();
  if (Date.now() - (s.manualsCheckedAt || 0) < MANUALS_WEEK) return;
  const script = path.join(REPO_ROOT, 'scripts', 'update-manuals.sh');
  if (!fs.existsSync(script)) return;
  manualsRunning = true;
  console.log('  ⟳ Checking Bubble/Buildprint manuals for upstream updates…');
  const child = spawn('bash', [script], { cwd: REPO_ROOT });
  let out = '';
  child.stdout.on('data', (d) => (out += d));
  child.stderr.on('data', (d) => (out += d));
  child.on('error', () => { manualsRunning = false; });
  child.on('close', (code) => {
    manualsRunning = false;
    const sum = out.split('\n').filter((l) => /SUMMARY|COMMITTED|No upstream/.test(l)).join(' | ');
    console.log(`  ⟳ Manual sync ${code === 0 ? 'done' : 'exit ' + code}: ${sum || '(no summary)'}`);
    if (code === 0) saveSettings({ ...loadSettings(), manualsCheckedAt: Date.now() });
  });
}
setTimeout(maybeSyncManuals, 90 * 1000);          // shortly after boot
setInterval(maybeSyncManuals, 3600 * 1000);        // hourly gate, weekly action

// ---- auto-track Buildprint changes into the brain (opt-in, default on) ------
// Every 20 min: sync the workspace; only spend a Claude turn if Bubble actually
// changed. Keeps the ledger current without you clicking. Toggle via settings.
let bpTracking = false;
async function maybeTrackBuildprint() {
  if (bpTracking) return;
  const s = loadSettings();
  if (s.bpAutoTrack === false) return;
  const ws = findBpWorkspace();
  if (!ws) return;
  bpTracking = true;
  try {
    const r = await bpSyncDiff();
    if (!r || r.error || r.first || !r.changed || !r.changed.length) { bpTracking = false; return; }
    console.log(`  ⟳ Buildprint changed (${r.changed.length} file(s)) — updating brain ledger…`);
    const listShown = r.changed.slice(0, 150);
    const autoMore = r.changed.length > 150 ? `\n…and ${r.changed.length - 150} more files (run \`git diff --name-status ${r.base.slice(0, 7)} ${r.head.slice(0, 7)}\` for the full list)` : '';
    const message = `Changed in the CRS Bubble app (test) since last sync — git name-status ${r.base.slice(0, 7)}..${r.head.slice(0, 7)}:\n\n${listShown.join('\n')}${autoMore}\n\nUpdate the brain ledger to reflect these changes.`;
    const chat = { id: crypto.randomUUID(), title: 'Buildprint sync (auto) — ' + nowIso().slice(0, 16).replace('T', ' '), bp: true, sessionId: null, created: nowIso(), updated: nowIso(), messages: [{ role: 'user', content: `Auto-sync ${r.changed.length} change(s) from Buildprint.`, ts: nowIso() }] };
    const cfg = loadSettings();
    const result = await runClaudeStream(message, null, {}, { model: cfg.model, effort: cfg.effort, cwd: r.ws.dir, systemPrompt: BP_TRACK_PROMPT, addDirs: [REPO_ROOT] });
    chat.messages.push({ role: 'assistant', content: result.text || '', ts: nowIso() });
    saveChat(chat);
    fs.writeFileSync(BP_TRACK_FILE, r.head);
    autoCommit('buildprint auto-sync → brain');
    console.log('  ⟳ Brain ledger updated from Buildprint.');
  } catch (e) { console.log('  ⟳ auto-track failed:', e.message); }
  bpTracking = false;
}
setTimeout(maybeTrackBuildprint, 150 * 1000);      // ~2.5 min after boot
setInterval(maybeTrackBuildprint, 20 * 60 * 1000); // every 20 min; only ingests on real change

// ---- Bubble platform awareness watcher (items w-forum, w-relnotes) ----------
// Once a day (opt-in via settings.bubbleWatch, default OFF), scan Bubble's
// release-notes + forum for anything NEW and CRS-relevant, and APPEND a dated
// digest to brain/bubble/watch/digest.md — never overwrite. Also flags anything
// that touches a locked CRS decision. Runs the claude CLI with web tools; the
// same job powers the manual "Check now" endpoint below.
const BUBBLE_WATCH_DIR = path.join(REPO_ROOT, 'brain', 'bubble', 'watch');
const BUBBLE_WATCH_FILE = path.join(BUBBLE_WATCH_DIR, 'digest.md');
const BUBBLE_DAY = 24 * 3600 * 1000;
const BUBBLE_DIGEST_PROMPT = [
  'You are the CRS Brain\'s Bubble-platform watcher. Using WebSearch and WebFetch, find what is NEW on the Bubble.io platform since the given date — check bubble.io/release-notes and the Bubble forum (forum.bubble.io) for: new/changed features, new plugins, breaking changes, gotchas, and notable patterns.',
  '',
  'Filter HARD to what actually matters for building CRS (a multi-tenant casino SaaS on Bubble): features that change how data, privacy rules, workflows, styling/theming, search, or performance are built. Ignore marketing, pricing, and unrelated announcements.',
  '',
  'Output ONLY a markdown digest section (no preamble) in this exact shape:',
  '## <today\'s date, from the context> — Bubble digest',
  '- **[category]** <one-line what changed> — <why it matters for CRS, or "FYI">. Source: <url>',
  '- If something changes or unblocks a LOCKED CRS decision, prefix the line with `⚠️ FLAG:` and say which decision.',
  '',
  'If two specific items appear, always report their current mechanics if found: (1) swapping an element\'s whole STYLE inside a conditional (theming), (2) "global expressions". If nothing genuinely new/relevant is found, output exactly: `## <date> — Bubble digest\\n- No new CRS-relevant changes found.`',
  'Keep it tight: at most ~12 bullets. Every claim needs a source URL you actually fetched.',
].join('\n');

let bubbleWatching = false;
async function runBubbleDigest(sinceIso) {
  const since = sinceIso || new Date(Date.now() - 7 * BUBBLE_DAY).toISOString().slice(0, 10);
  const msg = `Today is ${nowIso().slice(0, 10)}. Find Bubble platform changes NEW since ${since} that matter for building CRS, and write the dated digest section.`;
  const result = await runClaudeStream(msg, null, {}, { model: MODEL_SONNET, effort: 'low', systemPrompt: BUBBLE_DIGEST_PROMPT, cwd: os.tmpdir() });
  let section = (result.text || '').trim();
  if (!section) throw new Error('watcher returned nothing');
  fs.mkdirSync(BUBBLE_WATCH_DIR, { recursive: true });
  const header = fs.existsSync(BUBBLE_WATCH_FILE) ? '' : '# Bubble platform digest\n\n> Auto-appended by the CRS Brain Bubble watcher (items w-forum, w-relnotes). Newest at bottom. Never overwritten.\n\n';
  fs.appendFileSync(BUBBLE_WATCH_FILE, header + section + '\n\n');
  return { section, flagged: /⚠️\s*FLAG:/.test(section) };
}
function maybeBubbleWatch() {
  if (bubbleWatching) return;
  const s = loadSettings();
  if (s.bubbleWatch !== true) return;                        // opt-in only
  if (Date.now() - (s.bubbleCheckedAt || 0) < BUBBLE_DAY) return;  // at most daily
  bubbleWatching = true;
  const since = s.bubbleCheckedAt ? new Date(s.bubbleCheckedAt).toISOString().slice(0, 10) : undefined;
  console.log('  ⟳ Bubble watcher: scanning release-notes + forum for CRS-relevant changes…');
  runBubbleDigest(since)
    .then((r) => { saveSettings({ ...loadSettings(), bubbleCheckedAt: Date.now() }); autoCommit('bubble watch → brain digest'); console.log(`  ⟳ Bubble digest appended${r.flagged ? ' (⚠️ contains a locked-decision FLAG)' : ''}.`); })
    .catch((e) => console.log('  ⟳ Bubble watch failed:', e.message))
    .finally(() => { bubbleWatching = false; });
}
setTimeout(maybeBubbleWatch, 200 * 1000);          // ~3.3 min after boot
setInterval(maybeBubbleWatch, 3600 * 1000);        // hourly gate, daily action

// Open the app in the default browser (Windows / macOS / Linux).
function openBrowser(url) {
  const cmd = process.platform === 'win32' ? 'cmd'
            : process.platform === 'darwin' ? 'open'
            : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
  try { spawn(cmd, args, { detached: true, stdio: 'ignore', windowsHide: true }).unref(); } catch {}
}

const URL_ = `http://localhost:${PORT}`;

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    // Already running — just focus the existing instance and exit quietly.
    console.log(`  CRS Brain is already running → ${URL_}`);
    openBrowser(URL_);
    process.exit(0);
  }
  console.error('  Server error:', e.message);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  console.log(`\n  CRS Brain running →  ${URL_}\n`);
  console.log(`  Repo:   ${REPO_ROOT}`);
  console.log(`  Uses your Claude subscription (no per-token billing).`);
  if (LAN) {
    console.log(`\n  📱 MOBILE ACCESS (same Wi-Fi):`);
    for (const ip of lanIps()) console.log(`     http://${ip}:${PORT}`);
    console.log(`     PIN: ${PIN}\n`);
  }
  console.log(`  This window is the app. Close it to quit.\n`);
  if (process.env.CRS_BRAIN_NOOPEN !== '1') openBrowser(URL_);
});
