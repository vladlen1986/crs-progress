// livemap-verify.js — Live System Map floating panel: V1 chrome (open/drag/
// collapse/close/z-index), V2 real turn path, V3 synthetic learn pulse,
// V4 /api/livemap + poll gating, V5 reduced motion, V6 theme screenshots.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const OUT = { checks: [], errors: [] };
let PASS = 0, FAIL = 0;
const ok = (name, cond, info) => { OUT.checks.push({ name, pass: !!cond, info: info === undefined ? null : info }); cond ? PASS++ : FAIL++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? '  · ' + JSON.stringify(info).slice(0, 200) : '')); };

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1360,900'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 900 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 300)));
  await page.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(1600);
  await page.evaluate(() => { localStorage.removeItem('crs-livemap-mode'); localStorage.removeItem('crs-livemap-pos'); setTheme('dark'); });

  // ---------- V1: rail button opens ----------
  await page.click('#livemapBtn'); await sleep(400);
  ok('V1 rail button opens panel', await page.evaluate(() => document.getElementById('lmPanel').style.display === 'block'));

  // drag → position persists across reload
  const before = await page.evaluate(() => ({ x: document.getElementById('lmPanel').offsetLeft, y: document.getElementById('lmPanel').offsetTop }));
  const hb = await (await page.$('#lmHead')).boundingBox();
  await page.mouse.move(hb.x + 120, hb.y + 15); await page.mouse.down();
  await page.mouse.move(hb.x - 180, hb.y - 300, { steps: 10 }); await page.mouse.up(); await sleep(250);
  const dragged = await page.evaluate(() => ({ x: document.getElementById('lmPanel').offsetLeft, y: document.getElementById('lmPanel').offsetTop, ls: localStorage.getItem('crs-livemap-pos') }));
  ok('V1 drag moves panel', Math.abs(dragged.x - before.x) > 100 && Math.abs(dragged.y - before.y) > 100, { before, dragged: { x: dragged.x, y: dragged.y } });
  await page.reload({ waitUntil: 'networkidle2' }); await sleep(1400);
  const restored = await page.evaluate(() => { const p = document.getElementById('lmPanel'); return { open: p.style.display === 'block', x: p.offsetLeft, y: p.offsetTop }; });
  ok('V1 position + open state persist across reload', restored.open && Math.abs(restored.x - dragged.x) < 3 && Math.abs(restored.y - dragged.y) < 3, restored);

  // palette entry opens it
  await page.evaluate(() => LIVEMAP.close()); await sleep(150);
  await page.evaluate(() => openPal());
  await page.type('#palQ', '>live map'); await sleep(250);
  const palHit = await page.evaluate(() => [...document.querySelectorAll('#palRes .res')].map((r) => r.textContent).join('|'));
  ok('V1 palette lists "Live map" command', /Live map — what's working now/.test(palHit), palHit.slice(0, 80));
  await page.keyboard.press('Enter'); await sleep(300);
  ok('V1 palette command opens panel', await page.evaluate(() => document.getElementById('lmPanel').style.display === 'block'));

  // collapse → pill, persists; re-expand
  await page.click('#lmMin'); await sleep(250);
  let st = await page.evaluate(() => ({ p: document.getElementById('lmPanel').style.display, pill: document.getElementById('lmPill').style.display, mode: localStorage.getItem('crs-livemap-mode') }));
  ok('V1 collapse → pill', st.p === 'none' && st.pill === 'flex' && st.mode === 'pill', st);
  await page.reload({ waitUntil: 'networkidle2' }); await sleep(1400);
  st = await page.evaluate(() => ({ p: document.getElementById('lmPanel').style.display, pill: document.getElementById('lmPill').style.display }));
  ok('V1 pill state persists across reload', st.p === 'none' && st.pill === 'flex', st);
  await page.click('#lmPill'); await sleep(250);
  ok('V1 pill re-expands', await page.evaluate(() => document.getElementById('lmPanel').style.display === 'block'));

  // close hides entirely
  await page.click('#lmX'); await sleep(200);
  st = await page.evaluate(() => ({ p: document.getElementById('lmPanel').style.display, pill: document.getElementById('lmPill').style.display, mode: localStorage.getItem('crs-livemap-mode') }));
  ok('V1 close hides panel + pill', st.p === 'none' && st.pill === 'none' && st.mode === 'closed', st);

  // z-index sanity: settings modal sits above the panel
  await page.evaluate(() => LIVEMAP.open()); await sleep(200);
  await page.evaluate(() => openSettings()); await sleep(400);
  const z = await page.evaluate(() => ({
    panel: +getComputedStyle(document.getElementById('lmPanel')).zIndex,
    modal: +getComputedStyle(document.querySelector('.modal-wrap.show') || document.getElementById('settingsWrap') || document.querySelector('.modal-wrap')).zIndex,
    toasts: 340,
  }));
  ok('V1 z-index: modal above panel, panel below toasts', z.modal > z.panel && z.panel < z.toasts, z);
  await page.evaluate(() => closeSettings()); await sleep(200);

  // ---------- V3: synthetic learn pulse (real path = same call site as the chime in showLearnToast) ----------
  await page.evaluate(() => window.LIVEMAP.ping('playbook-applied')); await sleep(250);
  let e3 = await page.evaluate(() => { const g = document.querySelector('[data-e="playbook-brain"]'); return { on: g.classList.contains('on'), dots: g.querySelectorAll('.lm-dot').length, nodeOn: document.querySelector('[data-n="playbook"]').classList.contains('on') }; });
  ok('V3 playbook-applied → Playbook→Brain edge active + traveling dots', e3.on && e3.dots > 0 && e3.nodeOn, e3);
  await sleep(4200);
  e3 = await page.evaluate(() => { const g = document.querySelector('[data-e="playbook-brain"]'); return { on: g.classList.contains('on'), recent: g.classList.contains('recent'), dots: g.querySelectorAll('.lm-dot').length }; });
  ok('V3 pulse decays to half-bright "recent", dots removed', !e3.on && e3.recent && e3.dots === 0, e3);
  // recurrence → warning flash on Playbook
  await page.evaluate(() => window.LIVEMAP.ping('recurrence')); await sleep(200);
  const warn = await page.evaluate(() => document.querySelector('[data-n="playbook"]').classList.contains('warn'));
  await sleep(2800);
  const warnGone = await page.evaluate(() => !document.querySelector('[data-n="playbook"]').classList.contains('warn'));
  ok('V3 recurrence → warning flash appears then decays', warn && warnGone, { warn, warnGone });
  // learning-saved → Distiller→Ledger
  await page.evaluate(() => window.LIVEMAP.ping('learning-saved')); await sleep(250);
  const ls = await page.evaluate(() => { const g = document.querySelector('[data-e="distiller-ledger"]'); return { on: g.classList.contains('on'), dots: g.querySelectorAll('.lm-dot').length }; });
  ok('V3 learning-saved → Distiller→Ledger pulse', ls.on && ls.dots > 0, ls);

  // ---------- V4: endpoint shape (idle) + poll gating ----------
  const idle = await page.evaluate(() => fetch('/api/livemap').then((r) => r.json()));
  ok('V4 /api/livemap idle: valid JSON {liveTurns:[],lastLearnEvent,now}', Array.isArray(idle.liveTurns) && idle.liveTurns.length === 0 && 'lastLearnEvent' in idle && !!idle.now, { n: idle.liveTurns.length, now: idle.now });
  await page.evaluate(() => { window.__lmPolls = 0; const of = window.fetch; window.__lmFetch = of; window.fetch = (...a) => { if (String(a[0]).includes('/api/livemap')) window.__lmPolls++; return of(...a); }; });
  await sleep(7000);
  const pollsOpen = await page.evaluate(() => window.__lmPolls);
  ok('V4 polling runs while open (~1 per 3s)', pollsOpen >= 2 && pollsOpen <= 4, { pollsIn7s: pollsOpen });
  await page.click('#lmMin'); await sleep(300);
  await page.evaluate(() => { window.__lmPolls = 0; });
  await sleep(7000);
  const pollsPill = await page.evaluate(() => window.__lmPolls);
  ok('V4 polling stops while collapsed', pollsPill === 0, { pollsIn7s: pollsPill });
  await page.click('#lmPill'); await sleep(300);

  // ---------- V5: reduced motion → zero running animations, static states readable ----------
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluate(() => { LIVEMAP.ping('turn-start'); LIVEMAP.ping('tool'); LIVEMAP.ping('playbook-applied'); });
  await sleep(900);   // let token color transitions settle
  const v5 = await page.evaluate(() => {
    const panel = document.getElementById('lmPanel');
    const anims = document.getAnimations().filter((a) => { const t = a.effect && a.effect.target; return t && t.closest && t.closest('#lmPanel') && a.playState === 'running' && a instanceof CSSAnimation; });
    const g = document.querySelector('[data-e="you-brain"]');
    const base = g.querySelector('.lm-ebase'), glow = g.querySelector('.lm-eglow');
    const dot = g.querySelector('.lm-dot');
    return {
      runningAnims: anims.length, animNames: anims.map((a) => a.animationName || '?'),
      edgeOn: g.classList.contains('on'),
      baseStroke: getComputedStyle(base).stroke, glowOpacity: +getComputedStyle(glow).opacity,
      dotHidden: !dot || getComputedStyle(dot).display === 'none',
    };
  });
  ok('V5 reduced motion: zero running CSS animations in panel', v5.runningAnims === 0, v5.animNames);
  ok('V5 reduced motion: static active state still readable (lit edge, dots hidden)', v5.edgeOn && v5.glowOpacity > 0.2 && v5.dotHidden, { glowOpacity: v5.glowOpacity, baseStroke: v5.baseStroke, dotHidden: v5.dotHidden });
  await page.evaluate(() => LIVEMAP.ping('turn-end'));
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  // sanity: dots animate again under normal motion
  await page.evaluate(() => LIVEMAP.ping('tool')); await sleep(300);
  const v5b = await page.evaluate(() => { const d = document.querySelector('[data-e="model-tools"] .lm-dot'); return d ? getComputedStyle(d).animationName : 'none'; });
  ok('V5 normal motion: traveling dots animate (lmTravel)', v5b === 'lmTravel', v5b);
  await sleep(3500);

  // ---------- V2: REAL turn — You→Brain→Model live, then idle; V4 during; V6 mid-turn shots ----------
  await page.evaluate(() => { localStorage.setItem('crs-livemap-pos', JSON.stringify({ x: 920, y: 540 })); LIVEMAP.close(); LIVEMAP.open(); });
  await sleep(300);
  await page.evaluate(() => newChat()); await sleep(500);
  await page.type('#input', 'Reply with just: ok');
  await page.click('#sendBtn');
  const t0 = Date.now();
  let liveSnap = null, duringApi = null, midShotDone = false, chatId = null;
  while (Date.now() - t0 < 90000) {
    const s = await page.evaluate(() => {
      const g1 = document.querySelector('[data-e="you-brain"]'), g2 = document.querySelector('[data-e="brain-model"]');
      return {
        sending: !!state.sending, chatId: state.chatId,   // 'state' is a top-level let — NOT window.state
        e1on: g1.classList.contains('on'), e2on: g2.classList.contains('on'),
        dots: document.querySelectorAll('#lmPanel .lm-dot').length,
        panelLive: document.getElementById('lmPanel').classList.contains('live'),
        status: document.getElementById('lmStatus').textContent,
        model: document.getElementById('lmModelLbl').textContent,
      };
    });
    if (s.chatId) chatId = s.chatId;
    if (s.sending && s.e1on && !liveSnap) {
      liveSnap = s;
      duringApi = await page.evaluate(() => window.__lmFetch('/api/livemap').then((r) => r.json()));
      // V6 mid-turn screenshots, both themes
      await page.screenshot({ path: __dirname + '/livemap-turn-dark.png' });
      await page.evaluate(() => setTheme('light')); await sleep(500);
      await page.screenshot({ path: __dirname + '/livemap-turn-light.png' });
      await page.evaluate(() => setTheme('dark')); await sleep(300);
      midShotDone = true;
    }
    if (liveSnap && !s.sending) break;
    await sleep(350);
  }
  ok('V2 during real turn: You→Brain + Brain→Model edges active', !!liveSnap && liveSnap.e1on && liveSnap.e2on, liveSnap);
  ok('V2 during real turn: traveling dots in DOM + header live', !!liveSnap && liveSnap.dots >= 3 && liveSnap.panelLive && /turn running/.test(liveSnap.status), liveSnap && { dots: liveSnap.dots, status: liveSnap.status, model: liveSnap.model });
  ok('V4 during turn: liveTurns has this chat', !!duringApi && duringApi.liveTurns.length === 1 && duringApi.liveTurns[0].chatId === chatId, duringApi && { liveTurns: duringApi.liveTurns, chatId });
  await sleep(2500);
  const idleAfter = await page.evaluate(() => {
    const g1 = document.querySelector('[data-e="you-brain"]');
    return { on: g1.classList.contains('on'), recent: g1.classList.contains('recent'), status: document.getElementById('lmStatus').textContent, live: document.getElementById('lmPanel').classList.contains('live') };
  });
  ok('V2 after turn: back to idle (recent afterglow ok)', !idleAfter.on && !idleAfter.live && idleAfter.status === 'idle', idleAfter);
  OUT.midShots = midShotDone;

  // delete the test chat
  if (chatId) {
    const del = await page.evaluate((id) => window.__lmFetch('/api/chat?id=' + id, { method: 'DELETE' }).then((r) => r.json()), chatId);
    ok('V2 test chat deleted', del && del.ok === true, chatId);
  }

  // ---------- V6: idle screenshots, both themes ----------
  await sleep(31000);   // let the 30s recent afterglow fully decay → true idle look
  for (const theme of ['dark', 'light']) {
    await page.evaluate((t) => setTheme(t), theme); await sleep(600);
    await page.screenshot({ path: __dirname + '/livemap-idle-' + theme + '.png' });
  }
  await page.evaluate(() => setTheme('dark'));

  OUT.consoleErrors = errors;
  ok('V6 zero console errors across the whole run', errors.length === 0, errors.slice(0, 5));
  fs.writeFileSync(__dirname + '/livemap-verify-results.json', JSON.stringify(OUT, null, 2));
  console.log(`\nSUMMARY: ${PASS} pass / ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error('RIG FAIL', e); process.exit(2); });
