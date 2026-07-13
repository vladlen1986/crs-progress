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
const path = require('path');
const { spawn } = require('child_process');
const crypto = require('crypto');

// ---- paths -----------------------------------------------------------------
const BRAIN_DIR = __dirname;                       // .../crs-brain
const REPO_ROOT = path.resolve(BRAIN_DIR, '..');   // .../crs-progress
const PUBLIC_DIR = path.join(BRAIN_DIR, 'public');
const DATA_DIR = path.join(BRAIN_DIR, 'data');
const CHATS_DIR = path.join(DATA_DIR, 'chats');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');

for (const d of [DATA_DIR, CHATS_DIR]) fs.mkdirSync(d, { recursive: true });

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
  'You have full read/write access to the repo. Ground every answer in the actual files',
  '(CLAUDE.md, decisions.md, design/, data/, specs/, and any *.md the user adds). Never fabricate modules or facts.',
  'The progress board lives at crs-brain/data/progress.json. When the user asks you to update progress,',
  'record what is next, or note something missing, READ that file, then EDIT it (keep the same JSON shape),',
  'and briefly confirm what you changed. Be direct and concise, per the project\'s CLAUDE.md style.',
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
function runClaudeStream(message, sessionId, hooks = {}) {
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
  const add = spawn('git', ['add', 'crs-brain/data'], { cwd: REPO_ROOT, windowsHide: true });
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
      if (!message.trim()) return send(res, 400, { error: 'empty message' });
      // `title` lets the caller (e.g. digest) set a friendly name distinct from the prompt.
      const forcedTitle = (body.title || '').toString().trim();

      let chat = body.id ? loadChat(body.id) : null;
      if (!chat) {
        chat = {
          id: crypto.randomUUID(),
          title: forcedTitle || message.slice(0, 60),
          sessionId: null,
          created: nowIso(),
          updated: nowIso(),
          messages: [],
        };
      }
      chat.messages.push({ role: 'user', content: message, ts: nowIso() });

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
        const result = await runClaudeStream(message, chat.sessionId, {
          onDelta: (t) => { streamed += t; sse({ type: 'delta', text: t }); },
          onStatus: (s) => sse({ type: 'status', text: s }),
        });
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

    if (p === '/api/progress' && req.method === 'GET') {
      return send(res, 200, loadProgress());
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

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  CRS Brain running →  http://localhost:${PORT}\n`);
  console.log(`  Repo:   ${REPO_ROOT}`);
  console.log(`  Chats:  ${CHATS_DIR}`);
  console.log(`  Uses your Claude Max subscription (no per-token billing).`);
  console.log(`  Press Ctrl+C to stop.\n`);
});
