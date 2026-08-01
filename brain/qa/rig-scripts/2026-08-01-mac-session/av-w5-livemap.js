// av-w5-livemap.js — ADVERSARIAL verify of W5 (Live System Map) incl. a REAL cheap turn.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = { checks: [], testChatId: null };
const ck = (name, pass, evidence) => { R.checks.push({ name, pass: !!pass, evidence }); console.log((pass ? 'PASS' : 'FAIL') + '  ' + name + '  ' + (evidence || '')); };

(async () => {
  // ---- idle API shape ----
  const idle = await (await fetch(BASE + '/api/livemap')).json();
  ck('/api/livemap idle shape {liveTurns:[], lastLearnEvent, now}', Array.isArray(idle.liveTurns) && idle.liveTurns.length === 0 && 'lastLearnEvent' in idle && typeof idle.now === 'string', JSON.stringify({ turns: idle.liveTurns.length, keys: Object.keys(idle) }));

  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1360,900'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 900 });
  await page.evaluateOnNewDocument(() => { try { localStorage.removeItem('crs-livemap-pos'); localStorage.removeItem('crs-livemap-mode'); } catch {} window.__wiped = true; });
  await page.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // ---- rail button opens ----
  const closed0 = await page.evaluate(() => ({ panel: getComputedStyle(document.getElementById('lmPanel')).display, btn: !!document.getElementById('livemapBtn') }));
  await page.click('#livemapBtn');
  await sleep(600);
  const open1 = await page.evaluate(() => ({ panel: getComputedStyle(document.getElementById('lmPanel')).display, status: document.getElementById('lmStatus').textContent, mode: localStorage.getItem('crs-livemap-mode') }));
  ck('closed by default; rail button opens panel (idle)', closed0.panel === 'none' && closed0.btn && open1.panel === 'block' && open1.status === 'idle' && open1.mode === 'open', JSON.stringify({ closed0, open1 }));
  await page.screenshot({ path: __dirname + '/av-w5-idle-dark.png' });

  // ---- ⌘K palette opens it ----
  await page.evaluate(() => LIVEMAP.close());
  await page.keyboard.down('Meta'); await page.keyboard.press('k'); await page.keyboard.up('Meta');
  await sleep(400);
  const palOpen = await page.evaluate(() => { const w = document.querySelector('.pal-wrap'); return w && getComputedStyle(w).display !== 'none'; });
  await page.keyboard.type('>live map');
  await sleep(400);
  const palTop = await page.evaluate(() => { const r = document.querySelector('#palRes .res.on'); return r ? r.textContent.trim() : null; });
  await page.keyboard.press('Enter');
  await sleep(500);
  const viaPal = await page.evaluate(() => getComputedStyle(document.getElementById('lmPanel')).display);
  ck('⌘K palette → ">live map" command opens panel', palOpen && /Live map/.test(palTop || '') && viaPal === 'block', 'palOpen=' + palOpen + ' top=' + palTop + ' panel=' + viaPal);
  await page.evaluate(() => { if (getComputedStyle(document.getElementById('lmPanel')).display === 'none') LIVEMAP.open(); });

  // ---- drag persists across reload ----
  const before = await page.evaluate(() => { const p = document.getElementById('lmPanel'); return { x: p.offsetLeft, y: p.offsetTop }; });
  const head = await page.$('#lmHead');
  const hb = await head.boundingBox();
  await page.mouse.move(hb.x + 100, hb.y + hb.height / 2);
  await page.mouse.down();
  await page.mouse.move(hb.x + 100 - 300, hb.y + hb.height / 2 - 200, { steps: 8 });
  await page.mouse.up();
  await sleep(300);
  const after = await page.evaluate(() => { const p = document.getElementById('lmPanel'); return { x: p.offsetLeft, y: p.offsetTop, ls: localStorage.getItem('crs-livemap-pos') }; });
  // reload WITHOUT the wiper: new page (no evaluateOnNewDocument)
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1360, height: 900 });
  await page2.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(1800);
  const restored = await page2.evaluate(() => { const p = document.getElementById('lmPanel'); return { display: getComputedStyle(p).display, x: p.offsetLeft, y: p.offsetTop }; });
  ck('drag moves panel + position/mode persist across reload', after.x === before.x - 300 && after.y === before.y - 200 && restored.display === 'block' && Math.abs(restored.x - after.x) <= 2 && Math.abs(restored.y - after.y) <= 2, JSON.stringify({ before, after: { x: after.x, y: after.y }, restored }));

  // ---- collapse → pill persists; close persists ----
  await page2.click('#lmMin');
  await sleep(300);
  const pill1 = await page2.evaluate(() => ({ pill: getComputedStyle(document.getElementById('lmPill')).display, panel: getComputedStyle(document.getElementById('lmPanel')).display, mode: localStorage.getItem('crs-livemap-mode') }));
  await page2.reload({ waitUntil: 'networkidle2' });
  await sleep(1800);
  const pill2 = await page2.evaluate(() => ({ pill: getComputedStyle(document.getElementById('lmPill')).display, panel: getComputedStyle(document.getElementById('lmPanel')).display }));
  ck('collapse → pill, persists across reload', pill1.pill === 'flex' && pill1.panel === 'none' && pill1.mode === 'pill' && pill2.pill === 'flex' && pill2.panel === 'none', JSON.stringify({ pill1, pill2 }));
  await page2.screenshot({ path: __dirname + '/av-w5-pill-dark.png' });
  await page2.click('#lmPill');
  await sleep(300);
  await page2.evaluate(() => LIVEMAP.close());
  await page2.reload({ waitUntil: 'networkidle2' });
  await sleep(1800);
  const closed2 = await page2.evaluate(() => ({ pill: getComputedStyle(document.getElementById('lmPill')).display, panel: getComputedStyle(document.getElementById('lmPanel')).display, mode: localStorage.getItem('crs-livemap-mode') }));
  ck('close persists across reload', closed2.panel === 'none' && closed2.pill === 'none' && closed2.mode === 'closed', JSON.stringify(closed2));
  await page2.close();

  // ---- polling stops when collapsed (fetch instrumentation) ----
  await page.evaluate(() => {
    window.__lm = 0;
    const f0 = window.fetch;
    window.fetch = (u, o) => { if (String(u).includes('/api/livemap')) window.__lm++; return f0(u, o); };
    LIVEMAP.open();
  });
  await sleep(7500);
  const openPolls = await page.evaluate(() => { const n = window.__lm; window.__lm = 0; document.getElementById('lmMin').click(); return n; });
  await sleep(7500);
  const pillPolls = await page.evaluate(() => window.__lm);
  ck('3s polling while open; zero polls when collapsed to pill', openPolls >= 2 && pillPolls === 0, 'open=' + openPolls + ' polls/7.5s, pill=' + pillPolls);
  await page.evaluate(() => LIVEMAP.open());

  // ---- z-order under settings modal ----
  await page.evaluate(() => openSettings('general'));
  await sleep(500);
  const z = await page.evaluate(() => {
    const p = document.getElementById('lmPanel');
    const wrap = [...document.querySelectorAll('.modal-wrap')].find((w) => getComputedStyle(w).display !== 'none');
    const pr = p.getBoundingClientRect();
    const topEl = document.elementFromPoint(pr.left + pr.width / 2, pr.top + pr.height / 2);
    return { zPanel: +getComputedStyle(p).zIndex, zModal: wrap ? +getComputedStyle(wrap).zIndex : null, topIsPanel: p.contains(topEl) };
  });
  ck('panel sits UNDER settings modal overlay (z 260 < 380, overlay wins hit-test)', z.zModal > z.zPanel && !z.topIsPanel, JSON.stringify(z));
  await page.evaluate(() => closeSettings());

  // ---- ping pulse + decay ----
  const pulse = await page.evaluate(() => {
    LIVEMAP.ping('playbook-applied');
    const e = document.querySelector('[data-e="playbook-brain"]');
    return { on: e.classList.contains('on'), dots: e.querySelectorAll('.lm-dot').length, playbookOn: document.querySelector('[data-n="playbook"]').classList.contains('on') };
  });
  await page.screenshot({ path: __dirname + '/av-w5-ping-dark.png' });
  await sleep(4600); // 3400ms bump + 1s render tick margin
  const decayed = await page.evaluate(() => {
    const e = document.querySelector('[data-e="playbook-brain"]');
    return { on: e.classList.contains('on'), recent: e.classList.contains('recent'), dots: e.querySelectorAll('.lm-dot').length };
  });
  ck('ping(playbook-applied): edge lights with traveling dots, decays to recent + dots removed', pulse.on && pulse.dots === 3 && pulse.playbookOn && !decayed.on && decayed.recent && decayed.dots === 0, JSON.stringify({ pulse, decayed }));

  // ---- REAL cheap turn in a throwaway non-bp chat ----
  await page.evaluate(() => { newChat(); });
  await sleep(700);
  await page.evaluate(() => { const i = document.getElementById('input'); i.value = 'Reply with just: ok'; i.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.click('#sendBtn');
  // poll during stream
  let mid = null, api = null, header = null;
  for (let i = 0; i < 120; i++) {
    await sleep(1000);
    const st = await page.evaluate(() => {
      const yb = document.querySelector('[data-e="you-brain"]'), bm = document.querySelector('[data-e="brain-model"]');
      return { sending: state.sending, chatId: state.chatId, live: !!(state.live && !state.live.done),
        panelLive: document.getElementById('lmPanel').classList.contains('live'),
        status: document.getElementById('lmStatus').textContent,
        ybOn: yb.classList.contains('on'), ybDots: yb.querySelectorAll('.lm-dot').length,
        bmOn: bm.classList.contains('on'), bmDots: bm.querySelectorAll('.lm-dot').length,
        modelLbl: document.getElementById('lmModelLbl').textContent };
    });
    if (st.chatId && !R.testChatId) R.testChatId = st.chatId;
    if (st.live && st.panelLive && !mid) {
      mid = st;
      api = await (await fetch(BASE + '/api/livemap')).json();
      await page.screenshot({ path: __dirname + '/av-w5-turn-dark.png' });
    }
    if (mid && !st.live && !st.sending) break;
  }
  ck('mid-stream: you-brain + brain-model edges .on with traveling dots', mid && mid.ybOn && mid.bmOn && mid.ybDots >= 1 && mid.bmDots >= 1, JSON.stringify(mid));
  ck('mid-stream: header live (turn running) + model label shown', mid && mid.panelLive && /turn running/.test(mid.status) && mid.modelLbl.length > 0, mid ? 'status=' + mid.status + ' model=' + mid.modelLbl : 'no mid state');
  ck('/api/livemap mid-turn: liveTurns chatId matches, bp=false, shape ok', api && api.liveTurns.length === 1 && api.liveTurns[0].chatId === R.testChatId && api.liveTurns[0].bp === false && 'model' in api.liveTurns[0], JSON.stringify(api && api.liveTurns));
  await sleep(2500);
  const idleBack = await page.evaluate(() => {
    const yb = document.querySelector('[data-e="you-brain"]');
    return { live: document.getElementById('lmPanel').classList.contains('live'), status: document.getElementById('lmStatus').textContent, ybOn: yb.classList.contains('on'), ybRecent: yb.classList.contains('recent'), ybDots: yb.querySelectorAll('.lm-dot').length };
  });
  ck('after turn: idle restore (live off, edges recent not on, dots gone)', !idleBack.live && idleBack.status === 'idle' && !idleBack.ybOn && idleBack.ybRecent && idleBack.ybDots === 0, JSON.stringify(idleBack));
  const idleApi = await (await fetch(BASE + '/api/livemap')).json();
  ck('/api/livemap back to idle after turn', idleApi.liveTurns.length === 0, JSON.stringify(idleApi.liveTurns));

  // ---- reduced motion: zero running animations, static lit edges ----
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await sleep(300);
  const rm = await page.evaluate(() => {
    LIVEMAP.ping('playbook-applied');
    const panel = document.getElementById('lmPanel');
    const e = document.querySelector('[data-e="playbook-brain"]');
    const anims = document.getAnimations().filter((a) => { try { return panel.contains(a.effect.target); } catch { return false; } });
    const running = anims.filter((a) => a.playState === 'running');
    const dot = e.querySelector('.lm-dot');
    return { edgeOn: e.classList.contains('on'), baseStroke: getComputedStyle(e.querySelector('.lm-ebase')).opacity,
      runningAnims: running.length, dotDisplay: dot ? getComputedStyle(dot).display : 'no-dot-el' };
  });
  ck('reduced-motion: edge statically lit, dots hidden, zero running animations in panel', rm.edgeOn && rm.runningAnims === 0 && (rm.dotDisplay === 'none' || rm.dotDisplay === 'no-dot-el'), JSON.stringify(rm));
  await page.emulateMediaFeatures([]);

  // ---- hidden ≤900px ----
  await page.setViewport({ width: 900, height: 800 });
  await sleep(600);
  const narrow = await page.evaluate(() => ({ panel: getComputedStyle(document.getElementById('lmPanel')).display, pill: getComputedStyle(document.getElementById('lmPill')).display, btn: getComputedStyle(document.getElementById('livemapBtn')).display }));
  await page.setViewport({ width: 901, height: 800 });
  await sleep(600);
  const wide = await page.evaluate(() => ({ panel: getComputedStyle(document.getElementById('lmPanel')).display, btn: getComputedStyle(document.getElementById('livemapBtn')).display }));
  ck('≤900px: panel/pill/rail-btn hidden; 901px visible again', narrow.panel === 'none' && narrow.pill === 'none' && narrow.btn === 'none' && wide.panel === 'block' && wide.btn !== 'none', JSON.stringify({ narrow, wide }));
  await page.setViewport({ width: 1360, height: 900 });

  // ---- light theme: open + ping, deco dim var ----
  const page3 = await browser.newPage();
  await page3.setViewport({ width: 1360, height: 900 });
  await page3.goto(BASE + '/?theme=light', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(1800);
  await page3.evaluate(() => LIVEMAP.open());
  await sleep(500);
  const lightDeco = await page3.evaluate(() => { LIVEMAP.ping('playbook-applied'); return getComputedStyle(document.getElementById('lmPanel')).getPropertyValue('--lm-deco').trim(); });
  ck('light theme: panel opens, glow dimmed (--lm-deco .6)', lightDeco === '.6' || lightDeco === '0.6', '--lm-deco=' + lightDeco);
  await page3.screenshot({ path: __dirname + '/av-w5-ping-light.png' });
  await page3.evaluate(() => LIVEMAP.close());
  await page3.close();

  await browser.close();
  fs.writeFileSync(__dirname + '/av-w5-results.json', JSON.stringify(R, null, 2));
  console.log('\ntest chat id (DELETE ME): ' + R.testChatId);
  const fails = R.checks.filter((c) => !c.pass).length;
  console.log('W5: ' + (R.checks.length - fails) + '/' + R.checks.length + ' pass');
  process.exit(fails ? 2 : 0);
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
