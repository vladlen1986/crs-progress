// lm-v4-verify.js — Live System Map v4 (galaxy clusters, map.html's species):
// T1 DATA-TRUTH: PLAYBOOK draws exactly the real active-lesson count as satellites
//    (compared against GET /api/playbook), badges show the real /api/chats,
//    /api/learn-events, bp-chat numbers; a synthetic learning-saved ping → LEDGER
//    badge +1 with a pop; lesson-satellite hover names the lesson trigger.
// T4 reduced motion: 0 running animations, scene STATIC BUT COMPLETE (satellites,
//    badges, spokes, stars, planets, hex all render).
// T5 density scaling: 300px → satellites thin out, badges stay ~8px on screen;
//    640px → full density; DOM node count < 600 at both.
// T6 both-theme screenshots idle + mid-turn + small (6 files) + animation
//    inventory (idle ≤14, mid-turn <50). Zero console errors.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const OUT = { checks: [], errors: [] };
let PASS = 0, FAIL = 0;
const ok = (name, cond, info) => { OUT.checks.push({ name, pass: !!cond, info: info === undefined ? null : info }); cond ? PASS++ : FAIL++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? '  · ' + JSON.stringify(info).slice(0, 240) : '')); };

const ANIMS = `(() => {
  const out = {};
  for (const a of document.getAnimations()) {
    const t = a.effect && a.effect.target;
    if (!t || !t.closest || !t.closest('#lmPanel')) continue;
    if (a.playState !== 'running') continue;
    const n = (a instanceof CSSAnimation) ? a.animationName : (a instanceof CSSTransition ? 'transition:' + a.transitionProperty : 'other');
    out[n] = (out[n] || 0) + 1;
  }
  return out;
})()`;
const total = (m, pred) => Object.entries(m).filter(([k]) => !pred || pred(k)).reduce((s, [, v]) => s + v, 0);
const cssAnims = (m) => total(m, (k) => !k.startsWith('transition:') && k !== 'other');
const SATS = (id) => `document.querySelectorAll('[data-rot="${id}"] circle.lm-sat:not([fill="none"])').length`;
const BADGE = (id) => `(() => { const b = document.querySelector('[data-b="${id}"]'); return b && b.style.display !== 'none' ? b.querySelector('text').textContent : null; })()`;

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1440,920'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 920 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 300)));

  // real server truth, fetched by the rig itself
  const truth = {
    playbook: await fetch(BASE + '/api/playbook').then((r) => r.json()),
    chats: await fetch(BASE + '/api/chats').then((r) => r.json()),
    learn: await fetch(BASE + '/api/learn-events').then((r) => r.json()),
  };
  const L = truth.playbook.lessons.filter((l) => l.status === 'active').length;
  const C = truth.chats.chats.length, BP = truth.chats.chats.filter((c) => c.bp).length;
  const E = truth.learn.events.length;

  await page.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(1200);
  await page.evaluate(() => { localStorage.removeItem('crs-livemap-mode'); localStorage.removeItem('crs-livemap-pos'); localStorage.removeItem('crs-livemap-size'); setTheme('dark'); });
  await page.evaluate(() => LIVEMAP.open());
  await page.waitForFunction(() => document.querySelectorAll('[data-rot="playbook"] .lm-sat').length > 0, { timeout: 8000 });
  await page.mouse.move(4, 4); await sleep(1400);

  // ================= T1 DATA-TRUTH =================
  const t1 = await page.evaluate((S1, B1) => ({
    pbSats: eval(S1), pbBadge: eval(B1),
    brainBadge: eval(`(() => { const b = document.querySelector('[data-b="brain"]'); return b && b.style.display !== 'none' ? b.querySelector('text').textContent : null; })()`),
    ledgerBadge: eval(`(() => { const b = document.querySelector('[data-b="ledger"]'); return b && b.style.display !== 'none' ? b.querySelector('text').textContent : null; })()`),
    bpBadge: eval(`(() => { const b = document.querySelector('[data-b="bp"]'); return b && b.style.display !== 'none' ? b.querySelector('text').textContent : null; })()`),
    distBadge: eval(`(() => { const b = document.querySelector('[data-b="distiller"]'); return b && b.style.display !== 'none' ? b.querySelector('text').textContent : null; })()`),
    gal: LIVEMAP._test.gal(),
  }), SATS('playbook'), BADGE('playbook'));
  ok(`T1 PLAYBOOK draws EXACTLY the real active lesson count (${L}) as satellites + badge`,
    t1.pbSats === L && t1.pbBadge === String(L), t1);
  ok(`T1 badges show real numbers: BRAIN=${C} chats, LEDGER=${E} events, BP=${BP} bp chats, DISTILLER=${truth.playbook.categories.length} cats`,
    t1.brainBadge === String(C) && +t1.ledgerBadge >= E && t1.bpBadge === String(BP) && t1.distBadge === String(truth.playbook.categories.length), t1);
  // brain swarm drawn count is capped at 40 while the badge shows the real 82
  const brainSats = await page.evaluate((S1) => eval(S1), SATS('brain'));
  ok('T1 BRAIN swarm capped at 40 drawn satellites while badge shows the real count', brainSats === Math.min(40, C) && +t1.brainBadge === C, { brainSats, badge: t1.brainBadge });
  // synthetic learn event → LEDGER badge +1 with a pop, one more satellite
  const before = await page.evaluate((S1, B1) => ({ sats: eval(S1), badge: +eval(B1) }), SATS('ledger'), BADGE('ledger'));
  const popNow = await page.evaluate(() => {
    LIVEMAP.ping('learning-saved', { ts: new Date().toISOString(), kind: 'learning-saved', detail: '• [galaxy] synthetic ledger increment' });
    return document.querySelector('[data-b="ledger"]').classList.contains('pop');
  });
  const after = await page.evaluate((S1, B1) => ({ sats: eval(S1), badge: +eval(B1) }), SATS('ledger'), BADGE('ledger'));
  ok('T1 synthetic learn event → LEDGER badge +1 with pop, swarm +1 satellite',
    popNow && after.badge === before.badge + 1 && after.sats === Math.min(30, before.sats + 1), { before, after, popNow });
  // lesson satellite hover → tooltip names the lesson trigger
  const satBox = await page.evaluate(() => {
    const s = document.querySelector('[data-rot="playbook"] .lm-sat.pb[data-tip]');
    const r = s.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, tip: s.dataset.tip };
  });
  await page.mouse.move(satBox.x, satBox.y); await sleep(250);
  // hit areas of neighboring 1-2px dots overlap — validate against whichever
  // lesson satellite actually owns :hover, and that its tip IS a real trigger
  const tipState = await page.evaluate(() => ({
    vis: document.getElementById('lmTip').style.display,
    html: document.getElementById('lmTip').innerHTML,
    hoveredTip: (document.querySelector('.lm-sat.pb:hover') || { dataset: {} }).dataset.tip || null,
  }));
  const triggers = truth.playbook.lessons.filter((l) => l.status === 'active').map((l) => l.trigger.split(',')[0].trim().slice(0, 30));
  ok('T1 lesson-satellite hover names the lesson trigger in the tooltip',
    tipState.vis === 'block' && tipState.html.includes('Lesson') && !!tipState.hoveredTip
    && tipState.html.includes(tipState.hoveredTip.slice(0, 12)) && triggers.includes(tipState.hoveredTip), { ...tipState, html: tipState.html.slice(0, 120) });
  await page.mouse.move(4, 4); await sleep(600);

  // ================= idle animation inventory =================
  // the T1 pings above lit edges (3.4s) and latched an 8s lesson mote — let them fully decay
  await sleep(10000);
  const idleA = await page.evaluate(ANIMS);
  const rotN = await page.evaluate(() => document.querySelectorAll('#lmPanel .lm-rot.lm-go').length);
  OUT.idleInventory = { ...idleA, totalCss: cssAnims(idleA), rotatingSwarms: rotN };
  ok('IDLE inventory: 6 fixed (orbit/breathe/2 nebula/2 planets) + per-swarm rotations, total ≤14',
    cssAnims(idleA) === 6 + rotN && cssAnims(idleA) <= 14 && idleA.lmPlanetDrift === 2 && (idleA.lmSwarmRot || 0) === rotN, OUT.idleInventory);

  // ================= T4 REDUCED MOTION: static but complete =================
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await sleep(1200);
  const rm = await page.evaluate((A) => ({
    running: Object.values(eval(A)).reduce((s, v) => s + v, 0),
    names: eval(A),
    sats: document.querySelectorAll('#lmPanel .lm-sat').length,
    spokes: document.querySelectorAll('#lmPanel .lm-spoke').length,
    badges: [...document.querySelectorAll('#lmPanel .lm-badge')].filter((b) => b.style.display !== 'none').length,
    stars: document.querySelectorAll('#lmStars circle').length,
    planets: document.querySelectorAll('#lmPanel .lm-planet').length,
    hex: !!document.getElementById('lmHexRect'),
  }), ANIMS);
  ok('T4 reduced motion: 0 running animations, scene static but COMPLETE (sats/spokes/badges/stars/planets/hex)',
    rm.running === 0 && rm.sats > 80 && rm.spokes > 80 && rm.badges >= 5 && rm.stars === 64 && rm.planets === 2 && rm.hex, rm);
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);

  // ================= T5 DENSITY SCALING =================
  const dens = {};
  for (const w of [300, 640]) {
    await page.evaluate((ww) => { localStorage.setItem('crs-livemap-size', JSON.stringify({ w: ww })); localStorage.setItem('crs-livemap-pos', JSON.stringify({ x: 1440 - ww - 30, y: 860 - ww * 236 / 380 - 40 })); }, w);
    await page.reload({ waitUntil: 'networkidle2' }); await sleep(1600);
    await page.waitForFunction(() => document.querySelectorAll('[data-rot="playbook"] .lm-sat').length > 0, { timeout: 8000 });
    await page.mouse.move(4, 4); await sleep(1300);
    dens[w] = await page.evaluate((S1, S2) => {
      const bt = document.querySelector('[data-b="playbook"] text');
      const svg = document.querySelector('#lmPanel .lm-scene svg');
      const scale = svg.getBoundingClientRect().width / 380;   // viewBox → screen
      return {
        pbSats: eval(S1), brainSats: eval(S2),
        dom: document.getElementById('lmPanel').querySelectorAll('*').length,
        screenFontPx: +(parseFloat(getComputedStyle(bt).fontSize) * scale).toFixed(2),
        fac: LIVEMAP._test.gal().fac,
      };
    }, SATS('playbook'), SATS('brain'));
    await page.screenshot({ path: __dirname + `/lm4-${w === 300 ? 'small' : 'wide'}-dark.png` });
    if (w === 300) { await page.evaluate(() => setTheme('light')); await sleep(500); await page.screenshot({ path: __dirname + '/lm4-small-light.png' }); await page.evaluate(() => setTheme('dark')); await sleep(300); }
  }
  ok('T5 at 300px: satellites thinned (playbook < real count, brain < 40), density factor 0.5',
    dens[300].fac === 0.5 && dens[300].pbSats < L && dens[300].pbSats >= 3 && dens[300].brainSats <= 20, dens[300]);
  ok('T5 at 640px: full density (playbook = real count, brain = 40)', dens[640].fac === 1 && dens[640].pbSats === L && dens[640].brainSats === 40, dens[640]);
  ok('T5 badges stay legible ~8px on screen at both sizes (screen-constant counter-scale)',
    Math.abs(dens[300].screenFontPx - 8) <= 0.6 && Math.abs(dens[640].screenFontPx - 8) <= 0.6, { font300: dens[300].screenFontPx, font640: dens[640].screenFontPx });
  ok('T5 DOM node count < 600 at both 300px and 640px', dens[300].dom < 600 && dens[640].dom < 600, { dom300: dens[300].dom, dom640: dens[640].dom });

  // ================= T6 SCREENSHOTS + mid-turn inventory =================
  await page.evaluate(() => { localStorage.setItem('crs-livemap-size', JSON.stringify({ w: 480 })); localStorage.setItem('crs-livemap-pos', JSON.stringify({ x: 920, y: 520 })); });
  await page.reload({ waitUntil: 'networkidle2' }); await sleep(1600);
  await page.waitForFunction(() => document.querySelectorAll('[data-rot="playbook"] .lm-sat').length > 0, { timeout: 8000 });
  for (const theme of ['dark', 'light']) {
    await page.evaluate((t) => setTheme(t), theme); await sleep(600);
    await page.mouse.move(4, 4); await sleep(1400);
    await page.screenshot({ path: __dirname + '/lm4-idle-' + theme + '.png' });
  }
  await page.evaluate(() => setTheme('dark'));
  // synthetic mid-turn: turn + tools + bp lane + lesson applied (real-shaped)
  await page.evaluate(() => {
    LIVEMAP.ping('turn-start');
    LIVEMAP.ping('model', 'claude-haiku-4-5-20251001');
    LIVEMAP.ping('tool', { tool: 'Bash' });
    LIVEMAP.ping('tool-detail', { cmd: 'buildprint sync --app crs' });
    LIVEMAP.ping('tool', { tool: 'Read' });
    LIVEMAP.ping('bp-step', { tool: 'Edit' });
    LIVEMAP.ping('playbook-applied', { ts: new Date().toISOString(), kind: 'playbook-applied', detail: '• [cli-bug] Use node, not python, for local scripts.' });
  });
  await sleep(1200);
  const midA = await page.evaluate(ANIMS);
  OUT.midturnInventory = { ...midA, totalCss: cssAnims(midA) };
  ok('MID-TURN inventory: total running CSS animations < 50', cssAnims(midA) < 50, OUT.midturnInventory);
  const midTools = await page.evaluate((S1, B1) => ({ sats: eval(S1), badge: eval(B1), kids: document.querySelectorAll('[data-n="tools"] .lm-kid').length }), SATS('tools'), BADGE('tools'));
  ok('MID-TURN: session tools grew the TOOLS galaxy (3 distinct → 3 satellites + badge) + bright live kids',
    midTools.sats === 3 && midTools.badge === '3' && midTools.kids >= 1, midTools);
  for (const theme of ['dark', 'light']) {
    await page.evaluate((t) => setTheme(t), theme); await sleep(500);
    await page.screenshot({ path: __dirname + '/lm4-midturn-' + theme + '.png' });
  }
  await page.evaluate(() => { LIVEMAP.ping('turn-end', { secs: 6 }); setTheme('dark'); });

  OUT.consoleErrors = errors;
  ok('T6 zero console errors across the whole run', errors.length === 0, errors.slice(0, 5));
  fs.writeFileSync(__dirname + '/lm-v4-verify-results.json', JSON.stringify(OUT, null, 2));
  console.log(`\nSUMMARY: ${PASS} pass / ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error('RIG FAIL', e); process.exit(2); });
