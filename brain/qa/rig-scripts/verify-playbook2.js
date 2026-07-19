// Playbook recurrence + toast timing rerun:
//  - temp synthetic lesson (neutral rule, won't make the model refuse the command)
//  - toasts sampled DURING the turn (they auto-dismiss after 11s)
//  - recurrence via a command the model WILL run → ✗ error matches lesson errorSig
// 2026-07-19 Mac pass — two fixes baked in after the first live run:
//  1. `zebra --hello` was NOT in the bp-spawn allowlist (server.js --allowedTools:
//     Bash(buildprint|agent-browser|node|python*)), so the session got a permission
//     denial and the shell error never happened → recurrence could never fire, on
//     EITHER platform. The failure now routes through the allowlisted `node` prefix:
//     `node --zebra-hello` really executes and fails "node: bad option: --zebra-hello"
//     (exit 9). normalizeErrSig → "node bad option zebra hello" (<30 chars → whole-string
//     probe), matching the runtime sig regardless of any "Exit code #" prefix. The zebra
//     trigger keyword and the neutral, non-forbidding rule are preserved.
//  2. Machine paths are platform-aware; the script assumes it runs from qa-scratch/rig/
//     inside the repo (PB resolved relative to the repo root).
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const CHROME = process.platform === 'darwin'
  ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP = 'http://127.0.0.1:4317/';
const PB = path.resolve(__dirname, '..', '..', 'crs-brain', 'data', 'playbook.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  let fails = 0;
  const check = (name, ok, detail) => { console.log((ok ? 'PASS' : 'FAIL'), name, detail || ''); if (!ok) fails++; };

  // temp lesson: neutral phrasing — informs, doesn't forbid
  const added = await (await fetch(APP + 'api/playbook', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ add: true, category: 'cli-bug', trigger: 'zebra', rule: 'The zebra diagnostic flag is not supported by node on this host', fix: 'Expect "node: bad option: --zebra-hello" if invoked; report the output honestly.', errorSig: 'node: bad option: --zebra-hello' }) })).json();
  const lessonId = added.added[0].id;

  await page.goto(APP, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction('typeof sendMsg === "function"', { timeout: 15000 });
  await sleep(1500);
  await page.evaluate(() => newBpChat());
  await sleep(400);
  await page.evaluate(() => {
    const i = document.getElementById('input');
    i.value = 'Diagnostic: run the Bash command `node --zebra-hello` once and report its exact output, then reply done. Nothing else.';
    i.dispatchEvent(new Event('input'));
    sendMsg();
  });

  // sample toasts + steps DURING the turn
  let sawApplied = false, sawRecur = false, sawStep = '', expandedOk = null, done = false;
  for (let i = 0; i < 80 && !(done && sawApplied && sawRecur); i++) {
    await sleep(2500);
    const s = await page.evaluate(() => ({
      toasts: [...document.querySelectorAll('.ltoast .lt-t')].map((e) => e.textContent),
      step: [...document.querySelectorAll('#chatLog .wstep .wstep-lbl')].map((e) => e.textContent).find((t) => /Playbook check/.test(t)) || '',
      done: !(state.live && !state.live.done),
    }));
    if (s.toasts.some((t) => /Applying knowledge/.test(t))) sawApplied = true;
    if (s.toasts.some((t) => /Known mistake repeated/.test(t))) {
      sawRecur = true;
      if (expandedOk === null) expandedOk = await page.evaluate(() => { const t = [...document.querySelectorAll('.ltoast')].find((x) => /Known mistake/.test(x.textContent)); if (!t) return null; t.querySelector('.lt-head').click(); return t.classList.contains('expanded'); });
    }
    if (s.step) sawStep = s.step;
    done = s.done;
  }
  check('R1 Playbook check step (synthetic lesson matched)', /Playbook check — \d+ lesson/.test(sawStep), sawStep);
  check('R2 ⚡ Applying-knowledge toast seen live', sawApplied);
  check('R3 turn completed', done);
  const lesson = JSON.parse(fs.readFileSync(PB, 'utf8')).find((l) => l.id === lessonId);
  check('R4 RECURRENCE stamped on the lesson', (lesson.recurred || 0) >= 1, `recurred=${lesson.recurred}`);
  check('R5 ⚠ recurrence toast seen live', sawRecur);
  check('R6 recurrence toast expandable', expandedOk === true, String(expandedOk));
  const tasks = await (await fetch(APP + 'api/tasks')).json();
  check('R7 What\'s-wrong todo raised', JSON.stringify(tasks).includes('Playbook failed to prevent'));
  const tail = await page.evaluate(() => [...document.querySelectorAll('#chatLog .wstep-body')].map((e) => e.textContent).find((t) => /⇒ ✗/.test(t)) || '');
  check('R8 ✗ result tail captured in a real turn', /zebra|not recognized/i.test(tail), tail.slice(0, 90));
  const dash = await (await fetch(APP + 'api/dash')).json();
  check('R9 dash.playbook.recurredThisWeek populated (API, not text match)', (dash.playbook.recurredThisWeek || []).some((t) => /zebra/i.test(t.rule)), JSON.stringify(dash.playbook.recurredThisWeek));

  // cleanup: test lesson, its recurrence todo, test chat
  await fetch(APP + 'api/playbook', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: lessonId, delete: true }) });
  const t2 = await (await fetch(APP + 'api/tasks')).json();
  const todo = (t2.tasks || []).find((x) => /Playbook failed to prevent.*zebra/i.test(x.title));
  if (todo) await fetch(APP + 'api/tasks/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: todo.id }) });
  const chatId = await page.evaluate(() => state.chatId);
  if (chatId) await page.evaluate(async (id) => { await fetch('/api/chat?id=' + id, { method: 'DELETE' }); }, chatId);

  check('zero console errors', errors.length === 0, errors.slice(0, 4).join(' | '));
  await browser.close();
  console.log(fails === 0 ? 'VERIFY: ALL PASS' : `VERIFY: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
