// lm-anim-verify.js — Live System Map "living molecule" animation upgrade:
// T1 real-turn dash-flow + comets + spinner + electrons (and full decay after),
// T2 ping ripples self-remove (no DOM leak after 20 rapid pings),
// T3 recurrence shockwave (double amber ripple + edge flicker, gone ≤1.5s),
// T4 reduced motion → zero running animations, static lit edge readable,
// T5 closed/pill → zero running animations,
// T6 both-theme screenshots mid-turn + idle, zero console errors, CPU sanity.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const OUT = { checks: [], errors: [] };
let PASS = 0, FAIL = 0;
const ok = (name, cond, info) => { OUT.checks.push({ name, pass: !!cond, info: info === undefined ? null : info }); cond ? PASS++ : FAIL++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? '  · ' + JSON.stringify(info).slice(0, 240) : '')); };

// panel-scoped running CSS animations, by name
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

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1440,920'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 920 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 300)));
  await page.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(1500);
  await page.evaluate(() => { localStorage.removeItem('crs-livemap-mode'); localStorage.removeItem('crs-livemap-pos'); setTheme('dark'); });

  // ---------- idle baseline + CPU sanity ----------
  // v4 CHANGED BASELINE: idle set = orbit + brain idle-breathe + 2 nebula layers
  // + 2 planet drifts + one lmSwarmRot per non-empty galaxy swarm (6 fresh — TOOLS
  // is empty until a tool runs — 7 after). Idle-open budget ≤ 14.
  await page.evaluate(() => LIVEMAP.open()); await sleep(1600);   // v4: let the galaxy fetch land
  await page.mouse.move(4, 4); await sleep(1300);   // ensure chromeless (nebula runs only un-hovered)
  const idleA = await page.evaluate(ANIMS);
  const rotN = await page.evaluate(() => document.querySelectorAll('#lmPanel .lm-rot.lm-go').length);
  ok('IDLE open (v4): orbit + idle-breathe + 2 nebula + 2 planets + per-swarm rotations, total ≤14',
    cssAnims(idleA) === 6 + rotN && idleA.lmOrbit === 1 && idleA.lmIdleBreathe === 1 && idleA.lmNebA === 1 && idleA.lmNebB === 1
    && idleA.lmPlanetDrift === 2 && (idleA.lmSwarmRot || 0) === rotN && rotN >= 4 && cssAnims(idleA) <= 14, { ...idleA, rotN });
  const docA = await page.evaluate(() => document.getAnimations().length);
  ok('CPU sanity: document.getAnimations() ≤ 16 idle with panel open (v4: +planets/swarms)', docA <= 16, { docAnimations: docA });

  // ---------- T5: closed / pill → zero running animations ----------
  await page.evaluate(() => LIVEMAP.close()); await sleep(300);
  const closedA = await page.evaluate(ANIMS);
  ok('T5 closed: 0 running animations in panel', total(closedA) === 0, closedA);
  await page.evaluate(() => LIVEMAP.open()); await sleep(200);
  await page.click('#lmMin'); await sleep(300);
  const pillA = await page.evaluate(ANIMS);
  ok('T5 pill: 0 running animations in panel', total(pillA) === 0, pillA);
  await page.click('#lmPill'); await sleep(400);

  // ---------- T2: ping ripples spawn + self-remove; 20 rapid pings → no DOM leak ----------
  await page.evaluate(() => LIVEMAP._test.kidTTL(1500));   // v3: shorten child-molecule TTL so decay fits the wait
  // v4 CHANGED BASELINE: galaxy satellites/spokes are excluded from the leak count —
  // they legitimately grow with real data (learning-saved → LEDGER +1 dot) and are
  // capped + replaced-not-appended by design; the leak check targets fx elements.
  const DOMN = `document.getElementById('lmPanel').querySelectorAll('*:not(.lm-sat):not(.lm-spoke)').length`;
  const domBase = await page.evaluate(DOMN);
  for (const kind of ['tool', 'playbook-applied', 'learning-saved']) {
    const spawned = await page.evaluate((k) => { LIVEMAP.ping(k); return document.querySelectorAll('#lmPanel .lm-ripple').length; }, kind);
    // v3: learning-saved pops a SECOND ripple ~1.4s in (traveling mote latches at Playbook) — allow it to finish
    await sleep(kind === 'learning-saved' ? 3000 : 1500);
    const left = await page.evaluate(() => document.querySelectorAll('#lmPanel .lm-ripple').length);
    ok(`T2 ping('${kind}') ripple spawns then self-removes${kind === 'learning-saved' ? ' (incl. v3 latch pop) ≤3s' : ' ≤1.5s'}`, spawned >= 1 && left === 0, { spawned, leftAfter: left });
  }
  await page.evaluate(() => { for (let i = 0; i < 20; i++) LIVEMAP.ping(['tool', 'playbook-applied', 'learning-saved'][i % 3]); });
  const rippleBurst = await page.evaluate(() => document.querySelectorAll('#lmPanel .lm-ripple').length);
  await sleep(5600);   // ripples gone ≤1.1s; 3.4s edge bumps decay; v3 kids+travelers die ≤1.5s+fade
  const domAfter = await page.evaluate((D) => ({ n: eval(D), ripples: document.querySelectorAll('#lmPanel .lm-ripple').length, kids: document.querySelectorAll('#lmPanel .lm-kid').length }), DOMN);
  ok('T2 20 rapid pings: no DOM leak (node count returns to baseline, 0 ripples, 0 kids)', domAfter.n === domBase && domAfter.ripples === 0 && domAfter.kids === 0, { domBase, ...domAfter, burstConcurrent: rippleBurst });
  await page.evaluate(() => LIVEMAP._test.kidTTL(20000));   // restore real TTL

  // ---------- T3: recurrence shockwave ----------
  const t3a = await page.evaluate(() => { LIVEMAP.ping('recurrence'); return { big: document.querySelectorAll('#lmPanel .lm-ripple-big').length, flick: document.querySelector('[data-e="playbook-brain"]').classList.contains('flick') }; });
  await sleep(300);
  const t3b = await page.evaluate(() => document.querySelectorAll('#lmPanel .lm-ripple-big').length);
  await sleep(1300);   // 1.6s total
  const t3c = await page.evaluate(() => ({ big: document.querySelectorAll('#lmPanel .lm-ripple-big').length, flick: document.querySelector('[data-e="playbook-brain"]').classList.contains('flick') }));
  ok('T3 recurrence: double amber ripple + edge flicker, gone ≤1.6s', t3a.big >= 1 && t3a.flick && t3b >= 2 && t3c.big === 0 && !t3c.flick, { atPing: t3a, at300ms: t3b, at1600ms: t3c });
  await sleep(3200);   // let recurrence warn window pass

  // ---------- T4: reduced motion → zero running animations, static lit edge readable ----------
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluate(() => { LIVEMAP.ping('turn-start'); LIVEMAP.ping('tool'); LIVEMAP.ping('playbook-applied'); LIVEMAP.ping('recurrence'); });
  await sleep(900);
  const t4 = await page.evaluate(() => {
    const anims = document.getAnimations().filter((a) => { const t = a.effect && a.effect.target; return t && t.closest && t.closest('#lmPanel') && a.playState === 'running'; });
    const g = document.querySelector('[data-e="you-brain"]');
    const dot = g.querySelector('.lm-dot');
    return {
      running: anims.length,
      names: anims.map((a) => a.animationName || a.transitionProperty || '?'),
      edgeOn: g.classList.contains('on'),
      glowOpacity: +getComputedStyle(g.querySelector('.lm-eglow')).opacity,
      flowHidden: getComputedStyle(g.querySelector('.lm-eflow')).display === 'none',
      dotAbsent: !dot || getComputedStyle(dot).display === 'none',
      ripples: document.querySelectorAll('#lmPanel .lm-ripple').length,
      spinHidden: getComputedStyle(document.querySelector('.lm-spin')).display === 'none',
      elecHidden: getComputedStyle(document.querySelector('.lm-elec')).display === 'none',
    };
  });
  ok('T4 reduced motion: ZERO running animations (incl. transitions, settled)', t4.running === 0, t4.names);
  ok('T4 reduced motion: static lit edge readable; comets/flow/spinner/electrons/ripples all absent',
    t4.edgeOn && t4.glowOpacity > 0.2 && t4.flowHidden && t4.dotAbsent && t4.ripples === 0 && t4.spinHidden && t4.elecHidden, t4);
  await page.evaluate(() => LIVEMAP.ping('turn-end'));
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await sleep(3600);

  // ---------- T1: real cheap turn WITH a tool step — living molecule + child, full decay after ----------
  await page.evaluate(() => { localStorage.setItem('crs-livemap-pos', JSON.stringify({ x: 980, y: 560 })); LIVEMAP.close(); LIVEMAP.open(); });
  await sleep(300);
  await page.evaluate(() => newChat()); await sleep(500);
  await page.evaluate(() => { const m = document.getElementById('modelSel'); if (m && [...m.options].some((o) => /haiku/.test(o.value))) m.value = [...m.options].find((o) => /haiku/.test(o.value)).value; });
  await page.type('#input', 'Use the Bash tool to run exactly: echo ok — then reply with just: done');
  await page.click('#sendBtn');
  await page.mouse.move(4, 4);   // v3: keep the panel un-hovered so the nebula (idle-set assertion) runs
  const t0 = Date.now();
  let live = null, chatId = null, shots = false, kidSeen = null, tickSeen = [];
  while (Date.now() - t0 < 120000) {
    const s = await page.evaluate((A) => {
      const g1 = document.querySelector('[data-e="you-brain"]'), g2 = document.querySelector('[data-e="brain-model"]');
      const kid = document.querySelector('[data-n="tools"] .lm-kid');
      return {
        sending: !!state.sending, chatId: state.chatId,
        e1on: g1.classList.contains('on'), e2on: g2.classList.contains('on'),
        dots: document.querySelectorAll('#lmPanel .lm-dot').length,
        comets: document.querySelectorAll('#lmPanel .lm-comet').length,
        spinOpacity: +getComputedStyle(document.querySelector('.lm-spin')).opacity,
        elecAnim: getComputedStyle(document.querySelector('.lm-elec')).animationName,
        kid: kid ? { lbl: (kid.querySelector('text') || {}).textContent || '', anim: getComputedStyle(kid).animationName } : null,
        tick: document.getElementById('lmTickerTx').textContent,
        anims: eval(A),
      };
    }, ANIMS);
    if (s.chatId) chatId = s.chatId;
    if (s.tick) tickSeen.push(s.tick);
    if (s.kid && !kidSeen) kidSeen = s.kid;
    if (s.sending && s.e1on && s.e2on && !live) {
      live = s;
      await sleep(350);   // let the 200ms opacity transitions settle before sampling the spinner
      live.spinOpacity = await page.evaluate(() => +getComputedStyle(document.querySelector('.lm-spin')).opacity);
    }
    if (live && !shots && (kidSeen || Date.now() - t0 > 45000)) {   // shoot once the child exists (or give up waiting for it)
      await page.screenshot({ path: __dirname + '/lm-anim-turn-dark.png' });
      await page.evaluate(() => setTheme('light')); await sleep(450);
      await page.screenshot({ path: __dirname + '/lm-anim-turn-light.png' });
      await page.evaluate(() => setTheme('dark')); await sleep(250);
      shots = true;
    }
    if (live && !s.sending) break;
    await sleep(350);
  }
  // v4 CHANGED BASELINE: comet = lead + 2 trails (3 dots), global cap 15 — animation budget
  ok('T1 mid-turn: comet trails on both turn edges (lead + 2 trails each, v4)', !!live && live.dots >= 6 && live.comets >= 4 && live.dots === live.comets / 2 * 3, live && { dots: live.dots, comets: live.comets });
  ok('T1 mid-turn: dash-flow running on active edges (lmFlow ≥2)', !!live && (live.anims.lmFlow || 0) >= 2, live && live.anims);
  ok('T1 mid-turn: model thinking spinner rotating + visible', !!live && (live.anims.lmSpin || 0) === 1 && live.spinOpacity > 0.3, live && { lmSpin: live.anims.lmSpin, spinOpacity: live.spinOpacity });
  ok('T1 mid-turn: electrons orbiting brain (lmTravel on .lm-elec) + orbit + halo breathe layers', !!live && live.elecAnim === 'lmTravel' && live.anims.lmOrbit === 1 && (live.anims.lmBreathe || 0) >= 3, live && { elecAnim: live.elecAnim, anims: live.anims });
  ok('T1 mid-turn: total animated elements < 50 (v4: +planets/swarm rotations)', !!live && cssAnims(live.anims) < 50, live && { totalCssAnims: cssAnims(live.anims) });
  // v3: REAL tool child molecule at TOOLS — real tool name, orbiting
  ok('T1 v3: tool child molecule at TOOLS with real tool name, orbiting (lmTravel)', !!kidSeen && kidSeen.lbl === 'BASH' && kidSeen.anim === 'lmTravel', kidSeen);
  ok('T1 v3: ticker typed real lines during the turn (▸ turn / $ cmd)', tickSeen.some((t) => t.startsWith('▸ turn')) && tickSeen.some((t) => t.startsWith('$ ')), tickSeen.slice(0, 6));
  // "✓ done · Ns" typed after the turn (may be queued behind other lines)
  let doneTick = null;
  for (let i = 0; i < 50 && !doneTick; i++) { await sleep(300); const t = await page.evaluate(() => document.getElementById('lmTickerTx').textContent); if (t.startsWith('✓ done')) doneTick = t; if (t) tickSeen.push(t); }
  ok('T1 v3: "✓ done · Ns" typed after turn end', !!doneTick && /^✓ done · \d+s$/.test(doneTick), doneTick || tickSeen.slice(-5));
  // decay: poll up to 30s — the ~20s child TTL + post-turn learn pulses must all die back to the idle set
  let after = null, settled = false;
  const tEnd = Date.now();
  while (Date.now() - tEnd < 30000) {
    await sleep(1000);
    after = await page.evaluate((A) => ({
      dots: document.querySelectorAll('#lmPanel .lm-dot').length,
      ripples: document.querySelectorAll('#lmPanel .lm-ripple').length,
      kids: document.querySelectorAll('#lmPanel .lm-kid').length,
      anims: eval(A),
      rotN: document.querySelectorAll('#lmPanel .lm-rot.lm-go').length,
      live: document.getElementById('lmPanel').classList.contains('live'),
      sinceTurnEndS: null,
    }), ANIMS);
    // v4 CHANGED BASELINE: idle = 6 fixed (orbit/breathe/2 nebula/2 planets) + swarm rotations
    settled = after.dots === 0 && after.ripples === 0 && after.kids === 0 && !after.live && cssAnims(after.anims) === 6 + after.rotN
      && after.anims.lmOrbit === 1 && after.anims.lmIdleBreathe === 1 && after.anims.lmNebA === 1 && after.anims.lmNebB === 1
      && after.anims.lmPlanetDrift === 2 && (after.anims.lmSwarmRot || 0) === after.rotN
      && !after.anims.lmTravel && !after.anims.lmFlow && !after.anims.lmSpin && !after.anims.lmBreathe && cssAnims(after.anims) <= 14;
    if (settled) { after.sinceTurnEndS = Math.round((Date.now() - tEnd) / 1000); break; }
  }
  ok('T1 after turn: comets/spinner/electrons/ripples/children gone, back to v4 idle baseline (orbit + halo + nebula + planets + swarms ≤14)', settled, after);
  if (chatId) {
    const del = await page.evaluate((id) => fetch('/api/chat?id=' + id, { method: 'DELETE' }).then((r) => r.json()), chatId);
    ok('T1 test chat deleted', del && del.ok === true, chatId);
  }
  OUT.midShots = shots;

  // ---------- T6: idle screenshots after full decay ----------
  await sleep(31000);
  for (const theme of ['dark', 'light']) {
    await page.evaluate((t) => setTheme(t), theme); await sleep(600);
    await page.screenshot({ path: __dirname + '/lm-anim-idle-' + theme + '.png' });
  }
  await page.evaluate(() => setTheme('dark'));

  OUT.consoleErrors = errors;
  ok('T6 zero console errors across the whole run', errors.length === 0, errors.slice(0, 5));
  fs.writeFileSync(__dirname + '/lm-anim-verify-results.json', JSON.stringify(OUT, null, 2));
  console.log(`\nSUMMARY: ${PASS} pass / ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error('RIG FAIL', e); process.exit(2); });
