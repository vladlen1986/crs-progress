// Ask Protocol v2: pinned cards, always-visible free text, decision cards, and
// the prose backstop. Drives the REAL server + browser; spends no model calls
// (asks are created through /api/ask exactly as the MCP shim does).
const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = 'C:/Users/CCTV Mgr/Projects/crs-progress/crs-brain/data/screenshots/redesign/';
const DECISIONS = 'C:/Users/CCTV Mgr/Projects/crs-progress/decisions.md';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const check = (n, ok, d) => { console.log((ok ? 'PASS' : 'FAIL'), n, d || ''); if (!ok) fails++; };
const req = (method, path, body) => new Promise((res, rej) => {
  const data = body ? JSON.stringify(body) : null;
  const r = http.request({ host: '127.0.0.1', port: 4317, path, method, headers: data ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } : {} },
    (x) => { let b = ''; x.on('data', (c) => b += c); x.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(new Error(b.slice(0, 200))); } }); });
  r.on('error', rej); if (data) r.write(data); r.end();
});

(async () => {
  // a real chat to attach asks to
  const chats = await req('GET', '/api/chats');
  const chatId = (chats.chats || [])[0].id;
  // clear anything left pending by an earlier run — otherwise the pin shows a
  // stale question and every downstream assertion measures the wrong card
  for (const a of (await req('GET', '/api/ask/pending')).asks || []) await req('POST', '/api/ask/answer', { id: a.id, answer: 'rig cleanup' });

  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-device-scale-factor=2', '--disable-lcd-text'] });
  const p = await b.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.setViewport({ width: 1500, height: 950, deviceScaleFactor: 2 });
  await p.goto('http://127.0.0.1:4317/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(2200);
  await p.evaluate((id) => openChat(id), chatId);
  await sleep(2500);

  // ---- a) OPERATIONAL ask, pinned above the composer ----------------------
  const a1 = await req('POST', '/api/ask', { chatId, question: 'Which fix path should I take for the header overflow?', context: 'Two viable routes.', options: [{ label: 'Clamp the label', hint: 'fastest' }, { label: 'Re-flow the row' }, { label: 'Leave it' }] });
  check('operational ask created', !!a1.id && a1.kind === 'ask', JSON.stringify(a1));
  await p.evaluate(() => restorePendingAsk()); await sleep(900);
  const pin = await p.evaluate(() => {
    const c = document.querySelector('#askPin .askcard'); if (!c) return null;
    const r = c.getBoundingClientRect(), comp = document.querySelector('.composer').getBoundingClientRect();
    return {
      inPin: true, kind: c.dataset.kind,
      aboveComposer: r.bottom <= comp.top + 2, width: Math.round(r.width), compWidth: Math.round(comp.width),
      inChatLog: !!document.querySelector('#chatLog .askcard'),
      opts: [...c.querySelectorAll('.ask-opts:not(.ask-standing-opts) .ask-opt')].map((x) => x.textContent.replace(/^\d/, '').trim()),
      recommend: !!c.querySelector('.ask-standing-opts .ask-opt[data-a="recommend"]'),
      standing: !!c.querySelector('.ask-stand input'),
      otherVisible: getComputedStyle(c.querySelector('.ask-other')).display !== 'none',
      otherBtn: !!c.querySelector('.ask-other-btn'),
    };
  });
  check('pinned above the composer, not in the transcript', pin && pin.aboveComposer && !pin.inChatLog, JSON.stringify(pin && { above: pin.aboveComposer, inLog: pin.inChatLog }));
  check('matches the composer width', pin && Math.abs(pin.width - pin.compWidth) <= 2, pin && `${pin.width} vs ${pin.compWidth}`);
  check('operational card keeps recommend + standing', pin && pin.recommend && pin.standing);
  check('free-text field is visible by default, no Other button', pin && pin.otherVisible && !pin.otherBtn, JSON.stringify(pin && { vis: pin.otherVisible, btn: pin.otherBtn }));

  // stays visible while the transcript scrolls
  await p.evaluate(() => { const l = document.getElementById('chatLog'); l.scrollTop = 0; });
  await sleep(400);
  const stillThere = await p.evaluate(() => { const c = document.querySelector('#askPin .askcard'); if (!c) return false; const r = c.getBoundingClientRect(); return r.top > 0 && r.bottom <= innerHeight; });
  check('stays on screen after scrolling to the top', stillThere);
  await p.screenshot({ path: OUT + 'askpin-dark.png', clip: await p.evaluate(() => { const r = document.querySelector('.composer-wrap').getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y) - 8, width: Math.round(r.width), height: Math.round(r.height) + 8 }; }) });

  // answering by click unblocks the waiter and drops a receipt inline
  const waiter = req('GET', '/api/ask/wait?id=' + a1.id + '&t=20000');
  await sleep(300);
  await p.evaluate(() => document.querySelector('#askPin .ask-opts .ask-opt[data-a]').click());
  const got = await waiter;
  check('clicking an option unblocks the waiting session', got.answered === true && got.answer === 'Clamp the label', JSON.stringify(got));
  await sleep(600);
  const after = await p.evaluate(() => ({ pinEmpty: !document.querySelector('#askPin .askcard'), receipt: !!document.querySelector('#chatLog .ask-qa') }));
  check('pin clears and the receipt lands in the transcript', after.pinEmpty && after.receipt, JSON.stringify(after));
  const qa = await p.evaluate(() => { const r=[...document.querySelectorAll('#chatLog .ask-qa')].pop(); return r?{q:(r.querySelector('.ask-rq')||{}).textContent||'',a:(r.querySelector('.ask-ra')||{}).textContent||''}:null; });
  check('the transcript shows the question AND the answer', qa && /header overflow/.test(qa.q) && qa.a === 'Clamp the label', JSON.stringify(qa));

  // ---- b) typed answer is a first-class path ------------------------------
  const a2 = await req('POST', '/api/ask', { chatId, question: 'What should I name the new column?', options: [{ label: 'status' }, { label: 'state' }] });
  await p.evaluate(() => restorePendingAsk()); await sleep(900);
  const w2 = req('GET', '/api/ask/wait?id=' + a2.id + '&t=20000');
  await p.evaluate(() => { const i = document.querySelector('#askPin .ask-other input'); i.focus(); i.value = 'call it lifecycle_state'; });
  await p.keyboard.press('Enter');
  const g2 = await w2;
  check('typing an answer works and unblocks', g2.answered && g2.answer === 'call it lifecycle_state', JSON.stringify(g2));

  // ---- c) an [OPEN]-decision question becomes a DECISION card -------------
  const before = fs.readFileSync(DECISIONS, 'utf8');
  const trig = (before.match(/^Triggers:\s*(.+)$/m) || [])[1].split(',')[0].trim();
  const a3 = await req('POST', '/api/ask', { chatId, question: 'How should we handle ' + trig + ' going forward?', context: 'Trade-offs either way.', options: [{ label: 'Keep it as is' }, { label: 'Split the table' }] });
  check('boundary UPGRADES to a decision instead of rejecting to prose', !a3.error && a3.kind === 'decision', JSON.stringify(a3));
  await p.evaluate(() => restorePendingAsk()); await sleep(900);
  const dec = await p.evaluate(() => {
    const c = document.querySelector('#askPin .askcard'); if (!c) return null;
    return {
      kind: c.dataset.kind, decClass: c.classList.contains('decision'),
      label: (c.querySelector('.ask-kind') || {}).textContent || '',
      recommend: !!c.querySelector('.ask-opt[data-a="recommend"]'),
      standing: !!c.querySelector('.ask-stand input'),
      otherVisible: getComputedStyle(c.querySelector('.ask-other')).display !== 'none',
      accent: getComputedStyle(c).borderTopColor,
    };
  });
  check('renders as a decision card', dec && dec.kind === 'decision' && dec.decClass && /Decision/.test(dec.label), JSON.stringify(dec && { k: dec.kind, l: dec.label.slice(0, 40) }));
  check('no recommend shortcut on a decision', dec && !dec.recommend);
  check('no standing-answer checkbox on a decision', dec && !dec.standing);
  check('free-text still available on a decision', dec && dec.otherVisible);
  check('visually distinct (warning accent)', dec && dec.accent !== 'rgb(61, 61, 59)', dec && dec.accent);
  await p.screenshot({ path: OUT + 'askpin-decision-dark.png', clip: await p.evaluate(() => { const r = document.querySelector('.composer-wrap').getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y) - 8, width: Math.round(r.width), height: Math.round(r.height) + 8 }; }) });

  const w3 = req('GET', '/api/ask/wait?id=' + a3.id + '&t=20000');
  await sleep(200);
  await p.evaluate(() => document.querySelector('#askPin .ask-opts .ask-opt[data-a]').click());
  const g3 = await w3;
  check('decision answer unblocks the session', g3.answered === true, JSON.stringify(g3));
  await sleep(900);
  const md = fs.readFileSync(DECISIONS, 'utf8');
  check('the answer landed in decisions.md as a candidate', md.length > before.length && /## \d{4}-\d\d-\d\d — \[CANDIDATE\]/.test(md), 'grew ' + (md.length - before.length) + ' chars');
  check('the candidate is at the TOP (newest first)', md.indexOf('[CANDIDATE]') < md.indexOf('## 2026-08-07 — The AI/thinking layer'), 'idx ' + md.indexOf('[CANDIDATE]'));
  const standing = await req('GET', '/api/ask/standing');
  check('a decision never becomes a standing answer', !(standing.rules || []).some((r) => /going forward/.test(r.question || '')), String((standing.rules || []).length) + ' rules');

  // ---- d) light theme -----------------------------------------------------
  const a4 = await req('POST', '/api/ask', { chatId, question: 'Proceed with the migration now?', options: [{ label: 'Yes, run it' }, { label: 'Park it' }] });
  await p.evaluate(() => { setTheme('light'); restorePendingAsk(); });
  await sleep(1200);
  const light = await p.evaluate(() => {
    const c = document.querySelector('#askPin .askcard'); if (!c) return null;
    const cs = getComputedStyle(c), q = getComputedStyle(c.querySelector('.ask-q'));
    const rgb = (v) => (v.match(/\d+/g) || []).map(Number);
    const bg = rgb(cs.backgroundColor), fg = rgb(q.color);
    const lum = (c2) => 0.2126 * c2[0] + 0.7152 * c2[1] + 0.0722 * c2[2];
    return { bgL: Math.round(lum(bg)), fgL: Math.round(lum(fg)) };
  });
  check('light theme: card is light with dark text', light && light.bgL > 200 && light.fgL < 90, JSON.stringify(light));
  await p.screenshot({ path: OUT + 'askpin-light.png', clip: await p.evaluate(() => { const r = document.querySelector('.composer-wrap').getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y) - 8, width: Math.round(r.width), height: Math.round(r.height) + 8 }; }) });
  await req('POST', '/api/ask/answer', { id: a4.id, answer: 'Park it' });
  await p.evaluate(() => setTheme('dark'));

  // ---- survives a reload --------------------------------------------------
  const a5 = await req('POST', '/api/ask', { chatId, question: 'Keep the old export path?', options: [{ label: 'Keep' }, { label: 'Drop' }] });
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(3000);
  check('a pending question survives a reload, still pinned', await p.evaluate(() => !!document.querySelector('#askPin .askcard')));
  await req('POST', '/api/ask/answer', { id: a5.id, answer: 'Keep' });

  check('no page errors', errs.length === 0, errs.join(' | ').slice(0, 200));
  await b.close();
  console.log(fails === 0 ? 'ASKPIN: ALL PASS' : `ASKPIN: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
