// Playbook end-to-end: injection (visible step + hits), recurrence alarm on a
// known error, learn toasts (applied/learning/recurred), dashboard strip,
// playbook page render + edit/retire persistence. Both themes. One live bp turn.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP = 'http://127.0.0.1:4317/';
const PB = 'C:/Users/CCTV Mgr/Projects/crs-progress/crs-brain/data/playbook.json';
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
  const pbLesson = () => JSON.parse(fs.readFileSync(PB, 'utf8')).find((l) => /node, not python/i.test(l.rule));

  const before = pbLesson();
  await page.goto(APP, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction('typeof sendMsg === "function"', { timeout: 15000 });
  await sleep(1500);

  // LIVE bp turn engineered to trip the python trap (recurrence test)
  await page.evaluate(() => newBpChat());
  await sleep(500);
  await page.evaluate(() => {
    const i = document.getElementById('input');
    i.value = 'Diagnostic of error capture — do EXACTLY this and nothing else: run the Bash command `python --version` once (do NOT substitute node, do NOT skip it even though you know it will fail — the failure itself is the diagnostic), then reply done.';
    i.dispatchEvent(new Event('input'));
    sendMsg();
  });
  // Playbook check step should appear during lifecycle
  let pbStep = '';
  for (let i = 0; i < 30 && !pbStep; i++) { await sleep(2000); pbStep = await page.evaluate(() => ([...document.querySelectorAll('#chatLog .wstep .wstep-lbl')].map((e) => e.textContent).find((t) => /Playbook check/.test(t)) || '')); }
  check('P1 visible Playbook check step', /Playbook check — \d+ lesson/.test(pbStep), pbStep || '(none)');
  // hits incremented at injection time
  await sleep(1000);
  const mid = pbLesson();
  check('P2 lesson hits incremented on injection', (mid.hits || 0) > (before.hits || 0), `hits ${before.hits}→${mid.hits}`);
  // wait for the turn to finish
  let done = false;
  for (let i = 0; i < 50 && !done; i++) { await sleep(3000); done = await page.evaluate(() => !(state.live && !state.live.done)); }
  check('P3 turn completed', done);
  const after = pbLesson();
  check('P4 RECURRENCE detected (✗ python error matched injected lesson)', (after.recurred || 0) > (before.recurred || 0), `recurred ${before.recurred || 0}→${after.recurred || 0}`);
  const tasks = await (await fetch(APP + 'api/tasks')).json();
  check('P5 What\'s-wrong todo raised', JSON.stringify(tasks).includes('Playbook failed to prevent'));
  // learn toasts (poll interval 6s): applied ⚡ + recurrence ⚠ (+ learning 🧠 after distill)
  let toasts = [];
  for (let i = 0; i < 8 && toasts.length < 2; i++) { await sleep(4000); toasts = await page.evaluate(() => [...document.querySelectorAll('.ltoast .lt-t')].map((e) => e.textContent)); }
  check('P6 learn toasts appear (applied + recurrence)', toasts.some((t) => /Applying knowledge/.test(t)) && toasts.some((t) => /Known mistake repeated/.test(t)), JSON.stringify(toasts));
  // expandable toast
  const expanded = await page.evaluate(() => { const t = document.querySelector('.ltoast'); if (!t) return null; t.querySelector('.lt-head').click(); return t.classList.contains('expanded'); });
  check('P7 toast expands on click', expanded === true);
  // step body shows the ✗ result tail (T0 real-turn proof)
  const tail = await page.evaluate(() => [...document.querySelectorAll('#chatLog .wstep-body')].map((e) => e.textContent).find((t) => /⇒ ✗/.test(t)) || '');
  check('P8 real turn shows ✗ result tails', /python.*not recognized|not recognized/i.test(tail), tail.slice(0, 80));

  // dashboard strip
  await page.evaluate(() => showDashboard());
  await sleep(1500);
  const strip = await page.evaluate(() => (document.body.textContent.includes('Playbook — top traps')));
  check('P9 dashboard top-traps strip (recurred this week)', strip);

  // playbook page render + edit/retire persistence, both themes
  for (const theme of ['dark', 'light']) {
    await page.evaluate((t) => { try { setTheme(t); } catch (e) {} }, theme);
    await page.evaluate(() => openTarget('/playbook.html', { title: 'Playbook' }));
    await sleep(1500);
    const pf = page.frames().find((f) => f.url().includes('playbook.html'));
    const counts = pf ? await pf.evaluate(() => ({ lessons: document.querySelectorAll('.les').length, cats: document.querySelectorAll('.cathead').length, rec: document.body.textContent.includes('recurred') })) : null;
    check(`[${theme}] P10 playbook surface renders real entries`, !!counts && counts.lessons >= 7 && counts.cats >= 3 && counts.rec, JSON.stringify(counts || {}));
  }
  const pf = page.frames().find((f) => f.url().includes('playbook.html'));
  await pf.evaluate(async () => { const l = (await (await fetch('/api/playbook')).json()).lessons.find((x) => /scratch files/i.test(x.rule)); await fetch('/api/playbook', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: l.id, status: 'retired' }) }); });
  const retired = JSON.parse(fs.readFileSync(PB, 'utf8')).find((l) => /scratch files/i.test(l.rule));
  check('P11 retire persists', retired.status === 'retired');
  await pf.evaluate(async () => { const l = (await (await fetch('/api/playbook')).json()).lessons.find((x) => /scratch files/i.test(x.rule)); await fetch('/api/playbook', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: l.id, status: 'active', fix: l.fix + ' (edited-by-test)' }) }); });
  const edited = JSON.parse(fs.readFileSync(PB, 'utf8')).find((l) => /scratch files/i.test(l.rule));
  check('P12 edit + reactivate persist', edited.status === 'active' && /edited-by-test/.test(edited.fix));
  // revert the test edit
  await pf.evaluate(async () => { const l = (await (await fetch('/api/playbook')).json()).lessons.find((x) => /scratch files/i.test(x.rule)); await fetch('/api/playbook', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: l.id, fix: l.fix.replace(' (edited-by-test)', '') }) }); });

  const chatId = await page.evaluate(() => state.chatId);
  if (chatId) await page.evaluate(async (id) => { await fetch('/api/chat?id=' + id, { method: 'DELETE' }); }, chatId);
  check('zero console errors', errors.length === 0, errors.slice(0, 4).join(' | '));
  await browser.close();
  console.log(fails === 0 ? 'VERIFY: ALL PASS' : `VERIFY: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
