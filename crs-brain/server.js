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
const { spawn } = require('child_process');
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

// ---- paths -----------------------------------------------------------------
const BRAIN_DIR = __dirname;                       // .../crs-brain
const REPO_ROOT = path.resolve(BRAIN_DIR, '..');   // .../crs-progress
const PUBLIC_DIR = path.join(BRAIN_DIR, 'public');
const DATA_DIR = path.join(BRAIN_DIR, 'data');
const CHATS_DIR = path.join(DATA_DIR, 'chats');
const ATTACH_DIR = path.join(DATA_DIR, 'attachments');
const DOCS_DIR = path.join(DATA_DIR, 'docs');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');
const IDEAS_FILE = path.join(DATA_DIR, 'ideas.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

for (const d of [DATA_DIR, CHATS_DIR, ATTACH_DIR, DOCS_DIR]) fs.mkdirSync(d, { recursive: true });

const DEFAULT_SETTINGS = { model: 'claude-opus-4-8', effort: 'high', manualsCheckedAt: 0 };
function loadSettings() {
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) }; }
  catch { return { ...DEFAULT_SETTINGS }; }
}
function saveSettings(s) { fs.writeFileSync(SETTINGS_FILE, JSON.stringify(s, null, 2)); }

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

    const before = (loadUsage() || {}).at || 0;
    const isWin = process.platform === 'win32';
    const file = isWin ? 'cmd.exe' : 'claude';
    const args = (isWin ? ['/c', 'claude'] : []).concat(['--model', 'claude-haiku-4-5-20251001']);

    let term;
    try {
      term = pty.spawn(file, args, { name: 'xterm-256color', cols: 100, rows: 30, cwd: REPO_ROOT, env: process.env });
    } catch (e) { return resolve({ ok: false, error: e.message }); }

    term.onData(() => {});
    let done = false;
    const sendTimer = setTimeout(() => { try { term.write('hi\r'); } catch {} }, 3500);
    const cleanup = () => {
      try {
        if (isWin && term.pid) spawn('taskkill', ['/PID', String(term.pid), '/T', '/F'], { windowsHide: true });
        else term.kill();
      } catch {}
    };
    const finish = (ok, error) => {
      if (done) return; done = true;
      clearTimeout(sendTimer); clearInterval(poll); clearTimeout(killTimer);
      cleanup();
      resolve({ ok, error, data: loadUsage() });
    };
    const poll = setInterval(() => {
      const u = loadUsage();
      if (u && u.at && u.at > before) finish(true);
    }, 700);
    const killTimer = setTimeout(() => finish(false, 'timed out waiting for a reading'), 45000);
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
      for (const b of ['test', 'dev']) {
        const w = path.join(appDir, b);
        if (fs.existsSync(w)) return { app, branch: b, dir: w };
      }
      // fall back to first branch subdir
      for (const b of fs.readdirSync(appDir)) {
        const w = path.join(appDir, b);
        if (b !== '.buildprint' && fs.statSync(w).isDirectory()) return { app, branch: b, dir: w };
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
  'THE LOOP: `buildprint sync` FIRST (pull latest Bubble snapshot) → edit the files → `buildprint check`',
  '(must pass) → `buildprint apply` (push to Bubble). Useful: `buildprint audit` (security scan),',
  '`buildprint sync status`, `buildprint changelog <a> <b>`.',
  'HARD GUARDRAILS (from brain/buildprint/crs-brain-operations.md and decisions.md 2026-05-01):',
  '(1) TEST branch only — NEVER live. (2) Always sync before working. (3) check must pass before apply.',
  '(4) NEVER use --force-apply / --no-check / sync --reset without Vlad approving in THIS chat.',
  '(5) Before the FIRST apply of a request, state the exact plan (files/entities + expected Bubble effect)',
  'and get Vlad\'s go-ahead. (6) Pattern A: every business Data Type needs company + property fields and a',
  'privacy rule checking BOTH. (7) If anything looks off (stale branch, conflicts, suspicious shrink) — STOP',
  'and surface it.',
  'AFTER applying changes, write a short summary into the CRS repo brain/ files (database.md / security.md /',
  `workflows.md / changelog.md at ${REPO_ROOT}/brain/) so the ledger stays current.`,
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
      if (children.length) out.push({ type: 'dir', name: e.name, path: rel, children });
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (!ALLOWED_EXT.has(ext)) continue;
      let size = 0, mtime = 0;
      try { const st = fs.statSync(path.join(dir, e.name)); size = st.size; mtime = st.mtimeMs; } catch {}
      out.push({ type: 'file', name: e.name, path: rel, ext, size, mtime });
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
// Spawn `claude -p` in stream-json mode, feed the prompt via stdin, and emit
// text deltas as they arrive. Uses the Max subscription (no API key).
// hooks: { onDelta(text), onStatus(text) }. Resolves { text, sessionId }.
function runClaudeStream(message, sessionId, hooks = {}, opts = {}) {
  const onDelta = hooks.onDelta || (() => {});
  const onStatus = hooks.onStatus || (() => {});
  const onThink = hooks.onThink || (() => {});   // extended-thinking text
  const onBlock = hooks.onBlock || (() => {});    // work-block boundary: {kind:'thinking'|'tool', tool?}
  const onDetail = hooks.onDetail || (() => {});  // tool parameters for the current work block
  return new Promise((resolve, reject) => {
    const args = [
      '-p',
      '--output-format', 'stream-json',
      '--include-partial-messages',
      '--verbose',                 // required for stream-json in print mode
      '--permission-mode', 'acceptEdits',
      '--allowedTools', 'WebFetch', 'WebSearch', 'Bash(buildprint:*)', 'mcp__buildprint',   // web lookups + Buildprint CLI + MCP tools
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

    let toolAcc = null;   // { name, json } — accumulates streamed tool-input JSON
    function flushTool() {
      if (!toolAcc) return;
      let input = {}; try { input = JSON.parse(toolAcc.json || '{}'); } catch {}
      onDetail(formatToolInput(toolAcc.name, input));
      toolAcc = null;
    }
    function handleEvent(ev) {
      if (!ev || !ev.type) return;
      if (ev.type === 'stream_event' && ev.event) {
        const e = ev.event;
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

// ---- static files ----------------------------------------------------------
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };
function serveStatic(res, urlPath) {
  const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const abs = path.resolve(PUBLIC_DIR, rel);
  if (!abs.startsWith(PUBLIC_DIR)) return send(res, 403, { error: 'forbidden' });
  fs.readFile(abs, (err, data) => {
    if (err) return send(res, 404, { error: 'not found' });
    res.writeHead(200, { 'Content-Type': MIME[path.extname(abs)] || 'application/octet-stream' });
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

    if (p === '/api/chats' && req.method === 'GET') {
      return send(res, 200, { chats: listChats() });
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

      // Give Claude the attachment paths so it can open them with its own tools.
      const ingest = body.ingest === true;
      let promptToClaude = message;
      if (attachments.length) {
        const list = attachments.map((a) => `- ${a}`).join('\n');
        promptToClaude = ingest
          ? `${INGEST_PROMPT}\n\nAttached report file(s):\n${list}\n\n${message || 'Ingest this report into the brain.'}`
          : `The user attached the following file(s) in the repo — read them as needed to answer:\n${list}\n\n${message}`;
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
          runOpts.systemPrompt = BP_PROMPT(ws);
          runOpts.addDirs = [REPO_ROOT];
        }
        const result = await runClaudeStream(promptToClaude, chat.sessionId, {
          onDelta: (t) => { streamed += t; sse({ type: 'delta', text: t }); },
          onThink: (t) => sse({ type: 'think', text: t }),
          onBlock: (b) => sse({ type: 'block', kind: b.kind, tool: b.tool || null }),
          onDetail: (t) => sse({ type: 'detail', text: t }),
          onStatus: (s) => sse({ type: 'status', text: s }),
        }, runOpts);
        const finalText = result.text || streamed;
        chat.sessionId = result.sessionId || chat.sessionId;
        chat.updated = nowIso();
        // Persist whatever was produced — even a partial reply from Stop — so it
        // survives reload and can be continued from the same session.
        chat.messages.push({ role: 'assistant', content: finalText, ts: nowIso(), ...(result.aborted ? { partial: true } : {}) });
        saveChat(chat);
        autoCommit(chat.title);
        sse({ type: result.aborted ? 'stopped' : 'done', id: chat.id, title: chat.title, reply: finalText, sessionId: chat.sessionId });
      } catch (e) {
        sse({ type: 'error', error: e.message });
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
          onStatus: (s) => sse({ type: 'status', text: s }),
        }, { model: (body.model || cfg.model || '').toString() || undefined, effort: (body.effort || cfg.effort || '').toString() || undefined, signal: ac.signal, cwd: r.ws.dir, systemPrompt: BP_TRACK_PROMPT, addDirs: [REPO_ROOT] });
        chat.messages.push({ role: 'assistant', content: result.text || streamed, ts: nowIso() });
        chat.sessionId = result.sessionId; saveChat(chat);
        fs.writeFileSync(BP_TRACK_FILE, r.head);   // advance baseline only on success
        autoCommit('buildprint sync → brain');
        sse({ type: 'done', id: chat.id, reply: result.text || streamed });
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
      const next = {
        model: (body.model || cur.model).toString(),
        effort: (body.effort || cur.effort).toString(),
      };
      saveSettings(next);
      return send(res, 200, next);
    }

    if (p === '/api/progress' && req.method === 'GET') {
      return send(res, 200, loadProgress());
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

    // Serve raw file bytes (images, html previews) from inside the repo.
    if (p === '/api/raw' && req.method === 'GET') {
      const abs = safeRepoPath(u.searchParams.get('path'));
      const ext = path.extname(abs).toLowerCase();
      const M = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.gif':'image/gif',
        '.svg':'image/svg+xml', '.webp':'image/webp', '.html':'text/html; charset=utf-8',
        '.css':'text/css', '.js':'text/javascript', '.json':'application/json' };
      return fs.readFile(abs, (err, data) => {
        if (err) return send(res, 404, { error: 'not found' });
        res.writeHead(200, { 'Content-Type': M[ext] || 'application/octet-stream' });
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
    const message = `Changed in the CRS Bubble app (test) since last sync — git name-status ${r.base.slice(0, 7)}..${r.head.slice(0, 7)}:\n\n${listShown.join('\n')}\n\nUpdate the brain ledger to reflect these changes.`;
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
