// Ask Protocol — UI + live end-to-end:
//  A. persisted pending card renders (both themes): options numbered, standing
//     options quieter, keyboard 2+Enter answers → receipt; dead-session answer
//     auto-resumes the open chat as a turn
//  B. dashboard Needs-me shows pending questions; mobileAskView answers it
//  C. LIVE: a real session calls ask_vlad (MCP) → card appears mid-turn →
//     click an option → session UNBLOCKS and replies with the chosen answer
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP = 'http://127.0.0.1:4317/';
const CHATS = 'C:/Users/CCTV Mgr/Projects/crs-progress/crs-brain/data/chats';
const T1 = 'testaskui-0000-0000-0000-000000000001';
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

  // seed: chat + pending ask (dead session — no live turn)
  fs.writeFileSync(`${CHATS}/${T1}.json`, JSON.stringify({ id: T1, title: 'ASK UI TEST', bp: false, created: new Date().toISOString(), updated: new Date().toISOString(), messages: [{ role: 'user', content: 'pick something', ts: new Date().toISOString() }] }));
  const mk = await (await fetch(APP + 'api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatId: T1, question: 'UI test: which route?', context: 'line one of context\nline two with detail', options: [{ label: 'Route A' }, { label: 'Route B', hint: 'faster' }, { label: 'Route C' }] }) })).json();

  await page.goto(APP, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction('typeof openChat === "function"', { timeout: 15000 });
  await sleep(1500);

  // A. card render in both themes (dark first, light check render-only)
  for (const theme of ['light', 'dark']) {
    await page.evaluate((t) => { try { setTheme(t); } catch (e) { document.documentElement.dataset.theme = t; } }, theme);
    await page.evaluate((id) => openChat(id), T1);
    await sleep(1200);
    const card = await page.evaluate(() => {
      const c = document.querySelector('.askcard.pending');
      if (!c) return null;
      return {
        q: c.querySelector('.ask-q').textContent.slice(0, 30),
        opts: [...c.querySelectorAll('.ask-opts:not(.ask-standing-opts) .ask-opt[data-a]')].length,
        nums: [...c.querySelectorAll('.ask-opt .n')].slice(0, 3).map((n) => n.textContent),
        standing: [...c.querySelectorAll('.ask-standing-opts .ask-opt')].length,
        ctx: !!c.querySelector('.ask-ctx'),
        checkbox: !!c.querySelector('.ask-stand input'),
      };
    });
    check(`[${theme}] A1 pending card renders (3 opts numbered, 2 standing, ctx, checkbox)`, !!card && card.opts === 3 && card.standing === 2 && card.ctx && card.checkbox && card.nums.join('') === '123', JSON.stringify(card || {}));
  }

  // keyboard: 2 then Enter → answers Route B → receipt → auto-resume turn fires (real cheap turn)
  await page.keyboard.press('2'); await sleep(200); await page.keyboard.press('Enter');
  await sleep(1500);
  const receipt = await page.evaluate(() => (document.querySelector('.ask-receipt') || {}).textContent || '');
  check('A2 keyboard answer → receipt line', /You chose: ?Route B/.test(receipt.replace(/\s+/g, ' ')), receipt.slice(0, 60));
  const resumed = await page.evaluate(() => [...document.querySelectorAll('#chatLog .msg.user')].some((m) => /My answer to your question/.test(m.textContent)));
  check('A3 dead-session answer auto-resumes the chat (turn sent)', resumed);
  let done = false;
  for (let i = 0; i < 40 && !done; i++) { await sleep(3000); done = await page.evaluate(() => !(state.live && !state.live.done)); }
  check('A4 resume turn completed', done);

  // B. dashboard Needs-me + mobileAskView (second pending ask, remote-style answer)
  const mk2 = await (await fetch(APP + 'api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatId: T1, question: 'Dashboard test: proceed or park this?', options: [{ label: 'Proceed' }, { label: 'Park' }] }) })).json();
  await page.evaluate(() => showDashboard());
  await sleep(1500);
  const dashCard = await page.evaluate(() => {
    const h = [...document.querySelectorAll('.dcard h3')].find((x) => /Pending questions/.test(x.textContent));
    return h ? h.parentElement.textContent.slice(0, 120) : '';
  });
  check('B1 Needs-me shows Pending questions card', /Dashboard test/.test(dashCard), dashCard.slice(0, 80));
  await page.evaluate((id) => mobileAskView(id), mk2.id);
  await sleep(1000);
  const mpo = await page.evaluate(() => { const m = document.getElementById('mpo'); return m && m.classList.contains('show') ? m.textContent.slice(0, 200) : ''; });
  check('B2 mpo answer view opens with options', /proceed or park/i.test(mpo) && /Proceed/.test(mpo), mpo.slice(0, 80));
  await page.evaluate(() => { [...document.querySelectorAll('#mpo .mpo-acts button')].find((b) => b.textContent.trim() === 'Proceed').click(); });
  await sleep(1000);
  const audit = fs.readFileSync('C:/Users/CCTV Mgr/Projects/crs-progress/crs-brain/data/audit.jsonl', 'utf8').trim().split('\n').slice(-5).join('\n');
  check('B3 answered via overlay + audit trail entry', /ask-answered/.test(audit) && /Proceed/.test(audit));

  // C. LIVE end-to-end: session calls ask_vlad, we click, it resumes with the answer
  await page.evaluate(() => { try { newChat(); } catch (e) { state.chatId = null; } });
  await sleep(400);
  await page.evaluate(() => {
    const i = document.getElementById('input');
    i.value = 'Call the ask_vlad tool now with question "Pick a letter" and options Alpha, Beta, Gamma. When it returns, reply with ONLY the answer text it gave you. Do not use any other tools.';
    i.dispatchEvent(new Event('input'));
    sendMsg();
  });
  let liveCard = false;
  for (let i = 0; i < 60 && !liveCard; i++) { await sleep(2000); liveCard = await page.evaluate(() => !!document.querySelector('#chatLog .askcard.pending')); }
  check('C1 LIVE session raised a question card mid-turn', liveCard);
  if (liveCard) {
    await page.evaluate(() => { [...document.querySelectorAll('#chatLog .askcard.pending .ask-opt[data-a]')].find((b) => b.dataset.a === 'Beta').click(); });
    let fin = false, reply = '';
    for (let i = 0; i < 45 && !fin; i++) { await sleep(3000); fin = await page.evaluate(() => !(state.live && !state.live.done)); }
    reply = await page.evaluate(() => { const b = [...document.querySelectorAll('#chatLog .msg.assistant .body')].pop(); return b ? b.textContent.slice(-200) : ''; });
    check('C2 session UNBLOCKED and replied with the clicked answer', /Beta/.test(reply), reply.slice(-80));
    const liveChat = await page.evaluate(() => state.chatId);
    if (liveChat) await page.evaluate(async (id) => { await fetch('/api/chat?id=' + id, { method: 'DELETE' }); }, liveChat);
  }

  check('zero console errors', errors.length === 0, errors.slice(0, 4).join(' | '));
  fs.unlinkSync(`${CHATS}/${T1}.json`);
  await browser.close();
  console.log(fails === 0 ? 'VERIFY: ALL PASS' : `VERIFY: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
