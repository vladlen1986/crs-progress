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

// ---- paths -----------------------------------------------------------------
const BRAIN_DIR = __dirname;                       // .../crs-brain
const REPO_ROOT = path.resolve(BRAIN_DIR, '..');   // .../crs-progress
const PUBLIC_DIR = path.join(BRAIN_DIR, 'public');
const DATA_DIR = path.join(BRAIN_DIR, 'data');
const CHATS_DIR = path.join(DATA_DIR, 'chats');
const ATTACH_DIR = path.join(DATA_DIR, 'attachments');
const DOCS_DIR = path.join(DATA_DIR, 'docs');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

for (const d of [DATA_DIR, CHATS_DIR, ATTACH_DIR, DOCS_DIR]) fs.mkdirSync(d, { recursive: true });

const DEFAULT_SETTINGS = { model: 'claude-opus-4-8', effort: 'high' };
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

// Which files the brain lists in the file browser.
const ALLOWED_EXT = new Set([
  '.md', '.txt', '.json', '.html', '.css', '.py', '.js', '.csv', '.yml', '.yaml',
]);
const IGNORE_DIRS = new Set(['.git', 'node_modules', '.claude', 'crs-brain/node_modules']);

// System steer for the brain assistant.
const SYSTEM_PROMPT = [
  'You are "CRS Brain", the persistent assistant for Vlad\'s CRS (Casino Reporting Suite) project.',
  'You run inside a local second-brain app. The project root is this working directory.',
  'Your job: help track progress, remember decisions, and answer "what is next / what is missing".',
  'RETRIEVAL: the knowledge base lives in brain/. ALWAYS read brain/INDEX.md first — it maps every',
  'domain (database, option-sets, security, workflows, migrations, design) to its file and its',
  'authoritative sources. Jump straight to the mapped file/section instead of grepping the repo.',
  'You have full read/write access to the repo. Ground every answer in the actual files',
  '(brain/, CLAUDE.md, decisions.md, design/, data/, specs/, and any *.md the user adds). Never fabricate modules or facts.',
  'The progress board lives at crs-brain/data/progress.json. When the user asks you to update progress,',
  'record what is next, or note something missing, READ that file, then EDIT it (keep the same JSON shape),',
  'and briefly confirm what you changed. Be direct and concise, per the project\'s CLAUDE.md style.',
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
      out.push({ type: 'file', name: e.name, path: rel, ext });
    }
  }
  return out;
}

// ---- claude bridge ---------------------------------------------------------
// Spawn `claude -p` in stream-json mode, feed the prompt via stdin, and emit
// text deltas as they arrive. Uses the Max subscription (no API key).
// hooks: { onDelta(text), onStatus(text) }. Resolves { text, sessionId }.
function runClaudeStream(message, sessionId, hooks = {}, opts = {}) {
  const onDelta = hooks.onDelta || (() => {});
  const onStatus = hooks.onStatus || (() => {});
  return new Promise((resolve, reject) => {
    const args = [
      '-p',
      '--output-format', 'stream-json',
      '--include-partial-messages',
      '--verbose',                 // required for stream-json in print mode
      '--permission-mode', 'acceptEdits',
      '--append-system-prompt', SYSTEM_PROMPT,
    ];
    if (opts.model) args.push('--model', opts.model);
    if (opts.effort) args.push('--effort', opts.effort);
    if (sessionId) args.push('--resume', sessionId);
    else { sessionId = crypto.randomUUID(); args.push('--session-id', sessionId); }

    const child = spawn('claude', args, {
      cwd: REPO_ROOT,
      shell: true,            // resolve the claude.cmd shim on Windows
      windowsHide: true,
    });

    let buf = '';
    let stderr = '';
    let finalText = '';
    let sawResult = false;

    const timer = setTimeout(() => {
      child.kill();
      reject(new Error('claude timed out after 5 minutes'));
    }, 5 * 60 * 1000);

    function handleEvent(ev) {
      if (!ev || !ev.type) return;
      if (ev.type === 'stream_event' && ev.event) {
        const e = ev.event;
        if (e.type === 'content_block_delta' && e.delta && e.delta.type === 'text_delta') {
          onDelta(e.delta.text || '');
        } else if (e.type === 'content_block_start' && e.content_block && e.content_block.type === 'tool_use') {
          onStatus(e.content_block.name || 'working');
        }
      } else if (ev.type === 'result') {
        sawResult = true;
        finalText = ev.result || finalText;
        sessionId = ev.session_id || sessionId;
      }
    }

    child.stdout.on('data', (d) => {
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
      if (buf.trim()) { try { handleEvent(JSON.parse(buf.trim())); } catch {} }
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
    const child = spawn('claude', ['auth', 'status', '--json'], {
      cwd: REPO_ROOT, shell: true, windowsHide: true,
    });
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
  } else {
    // macOS/Linux: run it directly; it prints a URL / opens the browser.
    spawn('claude', ['auth', 'login'], { detached: true, stdio: 'ignore' });
  }
}

function runLogout() {
  return new Promise((resolve) => {
    const child = spawn('claude', ['auth', 'logout'], { cwd: REPO_ROOT, shell: true, windowsHide: true });
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
        return { id: c.id, title: c.title, updated: c.updated, count: (c.messages || []).length };
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

  try {
    // ---- API ----
    if (p === '/api/files' && req.method === 'GET') {
      return send(res, 200, { root: path.basename(REPO_ROOT), tree: walk(REPO_ROOT) });
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
      const message = (body.message || '').toString();
      const attachments = Array.isArray(body.attachments) ? body.attachments.filter(Boolean) : [];
      if (!message.trim() && !attachments.length) return send(res, 400, { error: 'empty message' });
      // `title` lets the caller (e.g. digest) set a friendly name distinct from the prompt.
      const forcedTitle = (body.title || '').toString().trim();

      let chat = body.id ? loadChat(body.id) : null;
      if (!chat) {
        chat = {
          id: crypto.randomUUID(),
          title: forcedTitle || (body.ingest === true ? 'Ingest — ' + nowIso().slice(0, 10) : '') || message.slice(0, 60) || 'Attached files',
          sessionId: null,
          created: nowIso(),
          updated: nowIso(),
          messages: [],
        };
      }
      chat.messages.push({ role: 'user', content: message, ts: nowIso(), attachments });

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
      const sse = (o) => res.write(`data: ${JSON.stringify(o)}\n\n`);
      sse({ type: 'meta', id: chat.id, title: chat.title });

      let streamed = '';
      try {
        const cfg = loadSettings();
        const runOpts = {
          model: (body.model || cfg.model || '').toString() || undefined,
          effort: (body.effort || cfg.effort || '').toString() || undefined,
        };
        const result = await runClaudeStream(promptToClaude, chat.sessionId, {
          onDelta: (t) => { streamed += t; sse({ type: 'delta', text: t }); },
          onStatus: (s) => sse({ type: 'status', text: s }),
        }, runOpts);
        const finalText = result.text || streamed;
        chat.sessionId = result.sessionId;
        chat.updated = nowIso();
        chat.messages.push({ role: 'assistant', content: finalText, ts: nowIso() });
        saveChat(chat);
        autoCommit(chat.title);
        sse({ type: 'done', id: chat.id, title: chat.title, reply: finalText, sessionId: chat.sessionId });
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
    if (req.method === 'GET') return serveStatic(res, p);

    return send(res, 404, { error: 'not found' });
  } catch (e) {
    return send(res, 500, { error: e.message });
  }
});

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

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  CRS Brain running →  ${URL_}\n`);
  console.log(`  Repo:   ${REPO_ROOT}`);
  console.log(`  Uses your Claude subscription (no per-token billing).`);
  console.log(`  This window is the app. Close it to quit.\n`);
  if (process.env.CRS_BRAIN_NOOPEN !== '1') openBrowser(URL_);
});
