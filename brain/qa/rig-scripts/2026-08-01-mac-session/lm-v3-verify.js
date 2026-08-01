// lm-v3-verify.js — Live System Map v3 (deeper molecules / ticker / chromeless / nebula):
// T2 ping payload paths: playbook-applied real-shaped ev → lesson mote + ⚡ ticker;
//    learning-saved mote travels Distiller→Playbook + latches; recurrence skips the
//    typing queue; dedupe (same tool re-ping = no twin); 20 rapid tool pings → ≤6
//    children (LRU) and DOM node count returns to baseline (no leak).
// T3 chromeless: default no border/buttons (computed), hover → chrome ≤300ms,
//    leave → gone ~1s; drag from empty scene area works + persists; resize grip
//    300→560 persists across reload, aspect held; pill/close reachable via chrome.
// T4 nebula: idle animated gradient (running animation + background moves across
//    2 samples), hover swaps to solid panel, light theme dimmed variant,
//    reduced-motion → static gradient + 0 running animations + instant typewriter.
// T6 both-theme screenshots: idle-nebula, hover-chrome, mid-turn-with-children,
//    resized-small. Zero console errors throughout.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const OUT = { checks: [], errors: [] };
let PASS = 0, FAIL = 0;
const ok = (name, cond, info) => { OUT.checks.push({ name, pass: !!cond, info: info === undefined ? null : info }); cond ? PASS++ : FAIL++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? '  · ' + JSON.stringify(info).slice(0, 240) : '')); };

const RUNNING = `(() => document.getAnimations().filter(a => { const t = a.effect && a.effect.target; return t && t.closest && t.closest('#lmPanel') && a.playState === 'running'; }).map(a => a.animationName || ('transition:' + a.transitionProperty)))()`;

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1440,920'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 920 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 300)));
  await page.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(1400);
  await page.evaluate(() => { localStorage.removeItem('crs-livemap-mode'); localStorage.removeItem('crs-livemap-pos'); localStorage.removeItem('crs-livemap-size'); setTheme('dark'); });
  await page.evaluate(() => LIVEMAP.open()); await sleep(600);
  const box = async () => (await page.$('#lmPanel')).boundingBox();

  // ================= T3 CHROMELESS =================
  await page.mouse.move(4, 4); await sleep(1500);   // ensure not hovered, chrome grace elapsed
  const t3d = await page.evaluate(() => {
    const p = document.getElementById('lmPanel');
    const cs = getComputedStyle(p);
    return {
      border: cs.borderTopColor, shadow: cs.boxShadow,
      headOp: +getComputedStyle(document.getElementById('lmHead')).opacity,
      headPE: getComputedStyle(document.getElementById('lmHead')).pointerEvents,
      gripOp: +getComputedStyle(p.querySelector('.lm-grip')).opacity,
      chrome: p.classList.contains('chrome'),
    };
  });
  ok('T3 default chromeless: transparent border, no shadow, header+grip hidden (computed)',
    /rgba\(0,\s*0,\s*0,\s*0\)|transparent/.test(t3d.border) && t3d.shadow === 'none' && t3d.headOp === 0 && t3d.headPE === 'none' && t3d.gripOp === 0 && !t3d.chrome, t3d);

  // hover → chrome fades in ≤300ms
  let b = await box();
  await page.mouse.move(b.x + b.width / 2, b.y + 8);   // top strip = no node under cursor
  await sleep(320);
  const t3h = await page.evaluate(() => ({
    headOp: +getComputedStyle(document.getElementById('lmHead')).opacity,
    bg: getComputedStyle(document.getElementById('lmPanel')).backgroundColor,
    border: getComputedStyle(document.getElementById('lmPanel')).borderTopColor,
    nebOp: +getComputedStyle(document.querySelector('#lmPanel .lm-neb1')).opacity,
  }));
  ok('T3 hover: chrome visible ≤300ms (header opacity 1, solid bg, border on, nebula off)',
    t3h.headOp >= 0.95 && !/rgba\(.*,\s*0(\.\d+)?\)$/.test(t3h.border) && t3h.nebOp < 0.05, t3h);

  // leave → still on shortly after, gone ~1s (+fade)
  await page.mouse.move(4, 4); await sleep(500);
  const t3l1 = await page.evaluate(() => document.getElementById('lmPanel').classList.contains('chrome'));
  await sleep(1100);
  const t3l2 = await page.evaluate(() => ({ chrome: document.getElementById('lmPanel').classList.contains('chrome'), headOp: +getComputedStyle(document.getElementById('lmHead')).opacity }));
  ok('T3 mouse-leave: chrome lingers ~1s then fades out', t3l1 && !t3l2.chrome && t3l2.headOp < 0.1, { at500ms: t3l1, after1600ms: t3l2 });

  // drag from EMPTY scene area (no header needed), position persists
  b = await box();
  const empty = { x: b.x + 60 / 380 * b.width, y: b.y + 100 / 236 * (b.height - 20) };   // gap between playbook/brain/you
  const p0 = await page.evaluate(() => ({ x: document.getElementById('lmPanel').offsetLeft, y: document.getElementById('lmPanel').offsetTop }));
  await page.mouse.move(empty.x, empty.y); await page.mouse.down();
  await page.mouse.move(empty.x - 160, empty.y - 140, { steps: 8 }); await page.mouse.up(); await sleep(250);
  const p1 = await page.evaluate(() => ({ x: document.getElementById('lmPanel').offsetLeft, y: document.getElementById('lmPanel').offsetTop, ls: JSON.parse(localStorage.getItem('crs-livemap-pos')) }));
  ok('T3 drag from empty scene body moves panel + persists', Math.abs(p0.x - p1.x) > 120 && Math.abs(p0.y - p1.y) > 100 && p1.ls && p1.ls.x === p1.x, { p0, p1 });

  // resize grip: 380 → 560, persists across reload, aspect held
  b = await box();
  await page.mouse.move(b.x + b.width / 2, b.y + 8); await sleep(300);   // reveal chrome
  let grip = await (await page.$('#lmPanel .lm-grip')).boundingBox();
  await page.mouse.move(grip.x + 8, grip.y + 8); await page.mouse.down();
  await page.mouse.move(grip.x + 8 + 180, grip.y + 8 + 100, { steps: 8 }); await page.mouse.up(); await sleep(250);
  const r1 = await page.evaluate(() => {
    const p = document.getElementById('lmPanel');
    return { w: p.offsetWidth, h: p.offsetHeight, ls: JSON.parse(localStorage.getItem('crs-livemap-size')) };
  });
  const expH = Math.round(560 * 236 / 380) + 20 + 2;   // scene aspect + ticker + 1px borders
  ok('T3 resize grip 380→560: width applied + persisted, aspect held', r1.w === 562 || r1.w === 560, r1);
  ok('T3 resize: height locked to scene aspect (+ticker)', Math.abs(r1.h - expH) <= 4 && r1.ls && r1.ls.w === 560, { got: r1.h, exp: expH, ls: r1.ls });
  await page.reload({ waitUntil: 'networkidle2' }); await sleep(1400);
  const r2 = await page.evaluate(() => ({ w: document.getElementById('lmPanel').offsetWidth, open: document.getElementById('lmPanel').style.display === 'block' }));
  ok('T3 size persists across reload', r2.open && (r2.w === 562 || r2.w === 560), r2);

  // clamp to min 300 (drag far left), then pill + close reachable via hover chrome
  b = await box();
  await page.mouse.move(b.x + b.width / 2, b.y + 8); await sleep(300);
  grip = await (await page.$('#lmPanel .lm-grip')).boundingBox();
  await page.mouse.move(grip.x + 8, grip.y + 8); await page.mouse.down();
  await page.mouse.move(grip.x + 8 - 500, grip.y + 8, { steps: 8 }); await page.mouse.up(); await sleep(250);
  const r3 = await page.evaluate(() => ({ w: document.getElementById('lmPanel').offsetWidth, ls: JSON.parse(localStorage.getItem('crs-livemap-size')) }));
  ok('T3 resize clamps at 300 min', (r3.w === 302 || r3.w === 300) && r3.ls.w === 300, r3);
  // resized-small screenshots (T6) while we're here
  await page.mouse.move(4, 4); await sleep(1600);
  await page.screenshot({ path: __dirname + '/lm3-resized-small-dark.png' });
  await page.evaluate(() => setTheme('light')); await sleep(500);
  await page.screenshot({ path: __dirname + '/lm3-resized-small-light.png' });
  await page.evaluate(() => setTheme('dark')); await sleep(300);
  // back to default width for the rest
  await page.evaluate(() => { localStorage.setItem('crs-livemap-size', JSON.stringify({ w: 380 })); });
  await page.reload({ waitUntil: 'networkidle2' }); await sleep(1400);
  b = await box();
  await page.mouse.move(b.x + b.width / 2, b.y + 8); await sleep(320);
  await page.click('#lmMin'); await sleep(300);
  const pillSt = await page.evaluate(() => ({ p: document.getElementById('lmPanel').style.display, pill: document.getElementById('lmPill').style.display }));
  ok('T3 pill reachable via hover chrome', pillSt.p === 'none' && pillSt.pill === 'flex', pillSt);
  await page.click('#lmPill'); await sleep(300);
  b = await box();
  await page.mouse.move(b.x + b.width / 2, b.y + 8); await sleep(320);
  await page.click('#lmX'); await sleep(250);
  const closedSt = await page.evaluate(() => document.getElementById('lmPanel').style.display);
  ok('T3 close reachable via hover chrome', closedSt === 'none', closedSt);
  await page.evaluate(() => LIVEMAP.open()); await sleep(400);

  // ================= T4 NEBULA =================
  await page.mouse.move(4, 4); await sleep(1600);   // idle, chromeless
  const n1 = await page.evaluate(() => {
    const neb = document.querySelector('#lmPanel .lm-neb1');
    const cs = getComputedStyle(neb);
    const anims = document.getAnimations().filter(a => a.effect && a.effect.target === neb && a.playState === 'running');
    return { anim: cs.animationName, running: anims.length, pos: cs.backgroundPosition, hasGrad: cs.backgroundImage.includes('radial-gradient'), op: +cs.opacity };
  });
  await sleep(2600);
  const n2 = await page.evaluate(() => getComputedStyle(document.querySelector('#lmPanel .lm-neb1')).backgroundPosition);
  ok('T4 idle nebula: gradient layer + running drift animation', n1.hasGrad && n1.anim === 'lmNebA' && n1.running === 1 && n1.op > 0.9, n1);
  ok('T4 nebula background actually moves across 2 samples', n1.pos !== n2, { s1: n1.pos.slice(0, 40), s2: n2.slice(0, 40) });
  // v4 CHANGED BASELINE: idle adds 2 planet drifts + one rotation per non-empty swarm → budget ≤14
  const nebCount = await page.evaluate(() => document.getAnimations().filter(a => { const t = a.effect && a.effect.target; return t && t.closest && t.closest('#lmPanel') && a.playState === 'running'; }).length);
  ok('T4 perf contract (v4): idle open ≤14 running animations INCLUDING nebula/planets/swarm rotations', nebCount <= 14, { idleRunning: nebCount });
  // hover swaps skin
  b = await box();
  await page.mouse.move(b.x + b.width / 2, b.y + 8); await sleep(350);
  const nh = await page.evaluate(() => ({
    nebOp: +getComputedStyle(document.querySelector('#lmPanel .lm-neb1')).opacity,
    nebState: document.getAnimations().filter(a => a.effect && a.effect.target === document.querySelector('#lmPanel .lm-neb1')).map(a => a.playState),
    bg: getComputedStyle(document.getElementById('lmPanel')).backgroundColor,
  }));
  ok('T4 hover: nebula eases out (opacity 0, paused), solid panel bg in', nh.nebOp < 0.05 && !nh.nebState.includes('running'), nh);
  await page.mouse.move(4, 4); await sleep(1600);
  // light theme dimmed variant
  await page.evaluate(() => setTheme('light')); await sleep(400);
  const nl = await page.evaluate(() => ({ op: +getComputedStyle(document.querySelector('#lmPanel .lm-neb1')).opacity, deco: getComputedStyle(document.getElementById('lmPanel')).getPropertyValue('--lm-deco').trim() }));
  ok('T4 light theme: pastel-dim nebula (--lm-deco 0.6 → opacity ~0.6)', Math.abs(nl.op - 0.6) < 0.05 && nl.deco === '.6', nl);
  await page.evaluate(() => setTheme('dark')); await sleep(300);
  // reduced motion: static gradient, 0 running animations panel-wide, instant typewriter
  await page.evaluate(() => LIVEMAP._test.kidTTL(1600));   // short child TTL from here on (T2 DOM-baseline needs a clean panel)
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluate(() => { LIVEMAP.ping('tool', { tool: 'Bash' }); LIVEMAP.ping('tool-detail', { cmd: 'echo reduced-motion' }); });
  await sleep(120);
  const rmTick = await page.evaluate(() => document.getElementById('lmTickerTx').textContent);
  await sleep(900);
  const rm = await page.evaluate((R) => ({
    running: eval(R).length, names: eval(R),
    nebAnim: getComputedStyle(document.querySelector('#lmPanel .lm-neb1')).animationName,
    hasGrad: getComputedStyle(document.querySelector('#lmPanel .lm-neb1')).backgroundImage.includes('radial-gradient'),
  }), RUNNING);
  ok('T4 reduced motion: static gradient (no nebula animation), gradient still painted', rm.nebAnim === 'none' && rm.hasGrad, { nebAnim: rm.nebAnim });
  ok('T4 reduced motion: 0 running animations panel-wide (settled)', rm.running === 0, rm.names);
  ok('T4 reduced motion: typewriter instant (full "$ ..." line at once, no typing)', rmTick === '$ echo reduced-motion', rmTick);
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await sleep(3600);

  // ================= T2 PING PAYLOAD PATHS =================
  await page.waitForFunction(() => document.querySelectorAll('#lmPanel .lm-kid').length === 0, { timeout: 10000 });
  // v4 CHANGED BASELINE: 20 distinct tool pings legitimately grow the TOOLS galaxy
  // (session-live satellites, capped at 20, replace-not-append) — exclude .lm-sat/.lm-spoke
  // from the leak count so it still catches fx leaks (ripples/kids/comets).
  const DOMN = `document.getElementById('lmPanel').querySelectorAll('*:not(.lm-sat):not(.lm-spoke)').length`;
  const domBase = await page.evaluate(DOMN);
  // 20 rapid tool pings with DISTINCT names → LRU caps at 6 children
  await page.evaluate(() => { for (let i = 0; i < 20; i++) LIVEMAP.ping('tool', { tool: 'T' + i }); });
  const burst = await page.evaluate(() => document.querySelectorAll('#lmPanel .lm-kid').length);
  ok('T2 20 rapid tool pings → ≤6 concurrent children (LRU)', burst === 6, { concurrent: burst });
  const toolSats = await page.evaluate(() => document.querySelectorAll('[data-rot="tools"] circle.lm-sat:not([fill="none"])').length);
  ok('T2 v4: 20 distinct session tools → TOOLS galaxy capped at 20 drawn satellites', toolSats === 20, { toolSats });
  await sleep(2400);
  const afterBurst = await page.evaluate((D) => ({ kids: document.querySelectorAll('#lmPanel .lm-kid').length, n: eval(D) }), DOMN);
  await sleep(3000);   // let ripples + edge decay fully settle
  const domAfter = await page.evaluate((D) => ({ n: eval(D), kids: document.querySelectorAll('#lmPanel .lm-kid').length, ripples: document.querySelectorAll('#lmPanel .lm-ripple').length }), DOMN);
  ok('T2 children TTL-decay to nothing; DOM node count returns to baseline (no leak)', afterBurst.kids === 0 && domAfter.n === domBase && domAfter.ripples === 0, { domBase, ...domAfter });
  await page.evaluate(() => LIVEMAP._test.kidTTL(20000));

  // dedupe: same tool twice → one child (TTL refreshed, no twin)
  await page.evaluate(() => { LIVEMAP.ping('tool', { tool: 'Bash' }); LIVEMAP.ping('tool', { tool: 'Bash' }); });
  const dd = await page.evaluate(() => ({ kids: document.querySelectorAll('[data-n="tools"] .lm-kid').length, lbl: (document.querySelector('[data-n="tools"] .lm-kid text') || {}).textContent }));
  ok('T2 dedupe: same tool re-ping refreshes TTL, no twin; child labeled with tool name', dd.kids === 1 && dd.lbl === 'BASH', dd);

  // playbook-applied with a REAL-shaped event → lesson mote + ⚡ ticker line
  const evApplied = { ts: new Date().toISOString(), kind: 'playbook-applied', title: 'Playbook applied — 1 lesson', detail: '• [cli-bug] Use node, not python, for local scripts — python is not installed on the host.' };
  await page.evaluate((ev) => LIVEMAP.ping('playbook-applied', ev), evApplied);
  await sleep(1400);   // let the line type out
  const ap = await page.evaluate(() => ({
    mote: document.querySelectorAll('[data-n="playbook"] .lm-kid.mote').length,
    lbl: (document.querySelector('[data-n="playbook"] .lm-kid.mote text') || {}).textContent,
    tick: document.getElementById('lmTickerTx').textContent,
    cls: document.getElementById('lmTicker').className,
  }));
  ok('T2 playbook-applied(ev): lesson mote at PLAYBOOK with trigger word', ap.mote === 1 && ap.lbl === 'cli-bug', ap);
  ok('T2 playbook-applied(ev): ⚡ ticker line typed in accent', /^⚡ applying: Use node, not python/.test(ap.tick) && /f-acc/.test(ap.cls), { tick: ap.tick, cls: ap.cls });

  // learning-saved → mote TRAVELS Distiller→Playbook then latches
  const evLearn = { ts: new Date().toISOString(), kind: 'learning-saved', title: 'Learned 1 new lesson', detail: '• [offset-path] SVG <g> supports offset-path in Chrome — use it for orbits.' };
  const tr0 = await page.evaluate((ev) => { LIVEMAP.ping('learning-saved', ev); return document.querySelectorAll('#lmFx .lm-mote-travel').length; }, evLearn);
  await sleep(500);
  const trMid = await page.evaluate(() => {
    const c = document.querySelector('#lmFx .lm-mote-travel');
    return { alive: !!c, dist: c ? getComputedStyle(c).offsetDistance : null, anim: c ? getComputedStyle(c).animationName : null };
  });
  await sleep(1500);
  const trEnd = await page.evaluate(() => ({
    traveler: document.querySelectorAll('#lmFx .lm-mote-travel').length,
    latched: document.querySelectorAll('[data-n="playbook"] .lm-kid').length,
  }));
  ok('T2 learning-saved(ev): mote travels Distiller→Playbook (offset-distance animating)', tr0 === 1 && trMid.alive && trMid.anim === 'lmTravelOnce' && parseFloat(trMid.dist) > 0, { tr0, trMid });
  ok('T2 learning-saved(ev): traveler gone, lesson latches at Playbook briefly', trEnd.traveler === 0 && trEnd.latched >= 1, trEnd);

  // recurrence skips the typing queue (critical interrupts current line)
  await page.evaluate(() => { LIVEMAP.ping('tool-detail', { cmd: 'a very long command line that will take a while to type out fully' }); LIVEMAP.ping('recurrence'); });
  await sleep(700);
  const rc = await page.evaluate(() => ({ tick: document.getElementById('lmTickerTx').textContent, cls: document.getElementById('lmTicker').className }));
  ok('T2 recurrence: CRITICAL skips ahead of the typing queue, warning color', rc.tick === '⚠ known mistake repeated' && /f-warn/.test(rc.cls), rc);
  await sleep(3600);

  // ================= T6 SCREENSHOTS =================
  await page.evaluate(() => { localStorage.setItem('crs-livemap-pos', JSON.stringify({ x: 990, y: 560 })); LIVEMAP.close(); LIVEMAP.open(); });
  await sleep(31000);   // full afterglow decay → true idle nebula look
  for (const theme of ['dark', 'light']) {
    await page.evaluate((t) => setTheme(t), theme); await sleep(600);
    await page.mouse.move(4, 4); await sleep(1400);
    await page.screenshot({ path: __dirname + '/lm3-idle-nebula-' + theme + '.png' });
    b = await box();
    await page.mouse.move(b.x + b.width / 2, b.y + 8); await sleep(500);
    await page.screenshot({ path: __dirname + '/lm3-hover-chrome-' + theme + '.png' });
    await page.mouse.move(4, 4); await sleep(1400);
  }
  // mid-turn with children (synthetic but real-shaped)
  await page.evaluate((ev) => {
    LIVEMAP.ping('turn-start');
    LIVEMAP.ping('model', 'claude-haiku-4-5-20251001');
    LIVEMAP.ping('tool', { tool: 'Bash' });
    LIVEMAP.ping('tool-detail', { cmd: 'buildprint sync --app crs' });
    LIVEMAP.ping('tool', { tool: 'Read' });
    LIVEMAP.ping('playbook-applied', ev);
  }, evApplied);
  await sleep(1200);
  for (const theme of ['dark', 'light']) {
    await page.evaluate((t) => setTheme(t), theme); await sleep(450);
    await page.screenshot({ path: __dirname + '/lm3-midturn-children-' + theme + '.png' });
  }
  const midKids = await page.evaluate(() => [...document.querySelectorAll('#lmPanel .lm-kid text')].map((t) => t.textContent));
  ok('T6 mid-turn children present for the shots (BASH/READ at TOOLS, SYNC at BP, mote)', midKids.includes('BASH') && midKids.includes('READ') && midKids.includes('SYNC'), midKids);
  await page.evaluate(() => { LIVEMAP.ping('turn-end', { secs: 7 }); setTheme('dark'); });

  OUT.consoleErrors = errors;
  ok('T6 zero console errors across the whole run', errors.length === 0, errors.slice(0, 5));
  fs.writeFileSync(__dirname + '/lm-v3-verify-results.json', JSON.stringify(OUT, null, 2));
  console.log(`\nSUMMARY: ${PASS} pass / ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error('RIG FAIL', e); process.exit(2); });
