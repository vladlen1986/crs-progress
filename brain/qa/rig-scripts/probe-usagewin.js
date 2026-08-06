// The live usage window: opens from the header, draggable, closable, remembers
// its state, and refreshes itself without anyone clicking fetch.
const puppeteer = require('puppeteer-core');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = 'C:/Users/CCTV Mgr/Projects/crs-progress/crs-brain/data/screenshots/redesign/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const check = (n, ok, d) => { console.log((ok ? 'PASS' : 'FAIL'), n, d || ''); if (!ok) fails++; };
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-device-scale-factor=2', '--disable-lcd-text'] });
  const p = await b.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  const calls = []; p.on('request', (r) => { if (/\/api\/usage/.test(r.url())) calls.push(r.method() + ' ' + r.url().replace(/^.*\/api/, '/api')); });
  await p.setViewport({ width: 1600, height: 950, deviceScaleFactor: 2 });
  await p.goto('http://127.0.0.1:4317/?theme=dark', { waitUntil: 'networkidle2' });
  await p.evaluate(() => { try { localStorage.removeItem('crs-usagewin-open'); localStorage.removeItem('crs-usagewin-pos'); } catch (e) {} });
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(2600);

  check('no page errors', errs.length === 0, errs.join(' | ').slice(0, 200));
  check('closed by default', await p.evaluate(() => document.getElementById('uwPanel').style.display === 'none'));
  check('header button exists', await p.evaluate(() => !!document.getElementById('usageWinBtn')));

  // open a real chat first — the context row is scoped to the OPEN chat, so on
  // the home screen it correctly has nothing to show
  const cid = await p.evaluate(async () => { const r = await fetch('/api/chats'); const j = await r.json(); const c = (j.chats||[])[0]; if (c) await openChat(c.id); return c ? c.id : null; });
  await sleep(2200);
  await p.click('#usageWinBtn');
  await sleep(1600);
  const open = await p.evaluate(() => {
    const el = document.getElementById('uwPanel'); const r = el.getBoundingClientRect();
    return {
      shown: el.style.display === 'block',
      btnOn: document.getElementById('usageWinBtn').classList.contains('on'),
      rows: [...el.querySelectorAll('.uw-name')].map((n) => n.textContent),
      bars: [...el.querySelectorAll('.uw-bar span')].map((s) => s.style.width),
      pcts: [...el.querySelectorAll('.uw-pct')].map((s) => s.textContent),
      metas: [...el.querySelectorAll('.uw-meta')].map((s) => s.textContent),
      sub: document.getElementById('uwSub').textContent,
      foot: (el.querySelector('.uw-foot') || {}).textContent || '',
      z: getComputedStyle(el).zIndex, pos: getComputedStyle(el).position,
      onScreen: r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight,
      x: Math.round(r.left), y: Math.round(r.top),
    };
  });
  check('opens from the header', open.shown && open.btnOn, JSON.stringify({ shown: open.shown, on: open.btnOn }));
  check('floats above everything, on screen', open.pos === 'fixed' && open.z === '260' && open.onScreen, `${open.pos}/${open.z}/${open.onScreen}`);
  check('shows context window + every plan-limit window', open.rows[0] === 'Context window' && open.rows.includes('5-hour limit') && open.rows.some((r) => /^Weekly/.test(r)), JSON.stringify(open.rows));
  check('every row has a real bar and a percentage', open.bars.length >= 3 && open.bars.every((w) => /%$/.test(w)) && open.pcts.every((t) => /^\d+%$/.test(t)), JSON.stringify([open.bars, open.pcts]));
  check('reset times are shown', open.metas.some((m) => /Resets/.test(m)), JSON.stringify(open.metas));
  check('reading age is stated, not implied live', /Limits read/.test(open.foot), open.foot.slice(0, 60));
  check("title bar shows the BRAIN's model, not the statusline session's", open.sub.length > 0 && !/4\.7/.test(open.sub), open.sub);
  const ctx = await p.evaluate(() => { const el=[...document.querySelectorAll('#uwPanel .uw-cap')][0]; return el?el.textContent:''; });
  check('context row is scoped to THIS chat', /this chat/.test(ctx), ctx);
  const auto = await p.evaluate(() => { const a=document.getElementById('uwAuto'); return a?{present:true,on:a.checked}:null; });
  check('auto-refresh exists and is OFF by default', auto && auto.present && !auto.on, JSON.stringify(auto));

  // it refreshes itself — no clicking
  const before = calls.filter((c) => c === 'GET /api/usage').length;
  await sleep(9000);
  const after = calls.filter((c) => c === 'GET /api/usage').length;
  check('refreshes itself while open', after > before, `${before} -> ${after} GET /api/usage`);
  check('never auto-triggers the expensive populate', !calls.some((c) => /populate/.test(c)), JSON.stringify(calls.filter((c) => /populate/.test(c))));

  // drag
  await p.mouse.move(open.x + 120, open.y + 15);
  await p.mouse.down();
  await p.mouse.move(open.x - 180, open.y + 160, { steps: 12 });
  await p.mouse.up();
  await sleep(400);
  const moved = await p.evaluate(() => { const r = document.getElementById('uwPanel').getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), saved: localStorage.getItem('crs-usagewin-pos') }; });
  check('draggable and the position is remembered', Math.abs(moved.x - open.x) > 100 && !!moved.saved, JSON.stringify(moved));

  await p.screenshot({ path: OUT + 'usagewin.png', clip: { x: Math.max(0, moved.x - 16), y: Math.max(0, moved.y - 16), width: 420, height: 300 } });

  // survives a reload, then closes
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(2200);
  check('still open after a reload', await p.evaluate(() => document.getElementById('uwPanel').style.display === 'block'));
  await p.evaluate(() => document.querySelector('#uwPanel #uwX').click());
  await sleep(300);
  const shut = await p.evaluate(() => ({ hidden: document.getElementById('uwPanel').style.display === 'none', btn: document.getElementById('usageWinBtn').classList.contains('on'), ls: localStorage.getItem('crs-usagewin-open') }));
  check('closes from its own ✕ and stays closed', shut.hidden && !shut.btn && shut.ls === '0', JSON.stringify(shut));
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(2000);
  check('stays closed after a reload', await p.evaluate(() => document.getElementById('uwPanel').style.display === 'none'));
  await p.click('#usageWinBtn'); await sleep(600);
  check('reopens from the header', await p.evaluate(() => document.getElementById('uwPanel').style.display === 'block'));

  await b.close();
  console.log(fails === 0 ? 'USAGEWIN: ALL PASS' : `USAGEWIN: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
