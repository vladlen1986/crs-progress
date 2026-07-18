#!/usr/bin/env node
// CRS Brain — cross-platform health check.
// Run `node doctor.js` on macOS or Windows to confirm the app can actually run
// on this machine. Exits 0 if all critical checks pass, 1 otherwise.
// Zero dependencies; mirrors server.js's PATH + resolveBin logic so the result
// reflects what the server itself will see.

const os = require('os');
const fs = require('fs');
const path = require('path');
const net = require('net');

// --- mirror server.js startup: extend PATH so ~/.local/bin etc. are visible ---
if (process.platform !== 'win32') {
  const home = os.homedir();
  const extra = [
    path.join(home, '.local', 'bin'),
    '/opt/homebrew/bin', '/usr/local/bin',
    path.join(home, '.npm-global', 'bin'),
  ];
  const cur = (process.env.PATH || '').split(':').filter(Boolean);
  process.env.PATH = [...new Set([...cur, ...extra])].join(':');
}

function resolveBin(name) {
  const sep = path.sep === '\\' ? ';' : ':';
  const exts = process.platform === 'win32' ? ['.cmd', '.exe', '.bat', ''] : [''];
  for (const dir of (process.env.PATH || '').split(sep)) {
    if (!dir) continue;
    for (const ext of exts) {
      const full = path.join(dir, name + ext);
      try { if (fs.existsSync(full)) return full; } catch {}
    }
  }
  return null;
}

const BRAIN_DIR = __dirname;
const PORT = Number(process.env.PORT) || 4317;
let failed = 0, warned = 0;

const pass = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const fail = (m) => { console.log(`  \x1b[31m✗\x1b[0m ${m}`); failed++; };
const warn = (m) => { console.log(`  \x1b[33m!\x1b[0m ${m}`); warned++; };

console.log(`\nCRS Brain doctor — ${process.platform}/${process.arch}, Node ${process.version}\n`);

// 1. Node version (server uses modern APIs; require >= 18).
const major = Number(process.versions.node.split('.')[0]);
if (major >= 18) pass(`Node ${process.version} (>= 18)`);
else fail(`Node ${process.version} is too old — install Node 18+`);

// 2. node-pty: prebuilt binary for THIS platform + loads. Powers the usage
//    panel; the app degrades gracefully without it, so a miss is a warning.
const prebuild = path.join(BRAIN_DIR, 'node_modules', 'node-pty', 'prebuilds',
  `${process.platform}-${process.arch}`, 'pty.node');
if (!fs.existsSync(path.join(BRAIN_DIR, 'node_modules'))) {
  fail('node_modules missing — run `npm install` in crs-brain');
} else {
  if (fs.existsSync(prebuild)) pass(`node-pty prebuild present for ${process.platform}-${process.arch}`);
  else warn(`no node-pty prebuild for ${process.platform}-${process.arch} — usage panel disabled (app still runs)`);
  try { require('node-pty'); pass('node-pty loads in this Node runtime'); }
  catch (e) { warn(`node-pty failed to load: ${e.message} — usage panel disabled (app still runs)`); }
}

// 3. claude CLI resolvable — the core dependency for every chat/ingest spawn.
const claude = process.platform === 'win32' ? (resolveBin('claude') || 'cmd.exe /c claude') : resolveBin('claude');
if (claude && claude !== 'cmd.exe /c claude') pass(`claude CLI found at ${claude}`);
else if (process.platform === 'win32') warn('claude not found on PATH directly (win32 uses cmd.exe shim — verify `claude` runs in a terminal)');
else fail('claude CLI not found on PATH — install it and ensure ~/.local/bin is on PATH');

// 3b. Optional CLIs for Buildprint work — warn-only (app runs without them).
const bp = resolveBin('buildprint');
if (bp) pass(`buildprint CLI found at ${bp}`);
else warn('buildprint not found on PATH — Bubble work stays on the copy path until `npm install -g buildprint` + `buildprint link <token>`');
const ab = resolveBin('agent-browser');
if (ab) pass(`agent-browser CLI found at ${ab}`);
else warn('agent-browser not found on PATH — run-mode screenshots/visual verification disabled until `npm install -g agent-browser`');

// 4. Correct launcher for this OS exists.
const launcher = process.platform === 'win32' ? 'start.bat' : 'start.command';
const launcherPath = path.join(BRAIN_DIR, launcher);
if (fs.existsSync(launcherPath)) {
  pass(`launcher present: ${launcher}`);
  // Unix launchers must be LF + executable, or double-click fails.
  if (process.platform !== 'win32') {
    const buf = fs.readFileSync(launcherPath);
    if (buf.includes(0x0d)) fail(`${launcher} has CRLF line endings — will fail with "bad interpreter". Run: dos2unix ${launcher}`);
    else pass(`${launcher} has LF line endings`);
    try { fs.accessSync(launcherPath, fs.constants.X_OK); pass(`${launcher} is executable`); }
    catch { warn(`${launcher} not executable — run: chmod +x ${launcher}`); }
  }
} else fail(`launcher missing for this OS: ${launcher}`);

// 5. Port availability (in-use likely means it's already running — not an error).
const srv = net.createServer();
srv.once('error', (e) => {
  if (e.code === 'EADDRINUSE') pass(`port ${PORT} in use — CRS Brain looks already running`);
  else warn(`port ${PORT} check: ${e.code}`);
  finish();
});
srv.once('listening', () => { srv.close(); pass(`port ${PORT} is free`); finish(); });
srv.listen(PORT, '127.0.0.1');

function finish() {
  console.log('');
  if (failed) { console.log(`\x1b[31m${failed} critical issue(s) — app may not run here.\x1b[0m` + (warned ? ` (${warned} warning(s))` : '') + '\n'); process.exit(1); }
  console.log(`\x1b[32mAll critical checks passed.\x1b[0m` + (warned ? ` (${warned} warning(s) — app runs, some extras disabled)` : '') + '\n');
  process.exit(0);
}
