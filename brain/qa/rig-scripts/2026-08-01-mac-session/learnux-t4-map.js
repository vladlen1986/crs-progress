// learnux T4 — live map stages: ticker shows the three stage lines, distiller node
// glows during thinking, learning-saved mote-birth stays, reduced-motion → static
// indicator + animation counts reported.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://127.0.0.1:4317';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { errors: [], ticker: [], asserts: {} };

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1440,940'] });
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 940 });
  p.on('console', (m) => { if (m.type() === 'error') out.errors.push(m.text().slice(0, 300)); });
  p.on('pageerror', (e) => out.errors.push('PAGEERR ' + String(e.message).slice(0, 300)));
  await p.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2' });
  await p.waitForFunction('window.LIVEMAP && typeof stagedLearnToast==="function"');
  await p.evaluate(() => LIVEMAP.open());
  await sleep(500);
  out.animBaseline = await p.evaluate(() => document.getAnimations().length);

  const tickerSet = new Set();
  const sample = async (ms) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { const t = await p.evaluate(() => (document.querySelector('#lmTickerTx') || {}).textContent || ''); if (t) tickerSet.add(t.replace(/▍$/, '')); await sleep(120); } };

  // stage 1: signal
  await p.evaluate(() => LIVEMAP.ping('learning-start', { signal: 'error — $ node --nope-flag ✗ exit 9', source: 'learnux T4' }));
  await sample(3200);
  // stage 2: thinking → distiller active glow
  await p.evaluate(() => LIVEMAP.ping('learning-thinking', { signal: 'x', source: 'learnux T4' }));
  await sleep(300);
  out.distillerOnDuringThinking = await p.evaluate(() => document.querySelector('#lmPanel [data-n="distiller"]').classList.contains('on'));
  out.animDuringThinking = await p.evaluate(() => document.getAnimations().length);
  await p.screenshot({ path: __dirname + '/learnux-t4-thinking-glow-dark.png' });
  await sample(3600);
  // stage 3: saved → mote birth + ✓ learned line
  await p.evaluate(() => LIVEMAP.ping('learning-saved', { lessons: [{ category: 'platform-gotcha', trigger: 'node flags', problem: 'unknown flag exits 9', solution: 'verify flags with node --help first' }], detail: '• [platform-gotcha] unknown flag exits 9\n  FIX: verify flags with node --help first' }));
  await sleep(400);
  out.moteBirth = await p.evaluate(() => !!document.querySelector('#lmFx .lm-mote-travel, .lm-kid.mote'));
  out.distillerOnAfterSaved = await p.evaluate(() => document.querySelector('#lmPanel [data-n="distiller"]').classList.contains('on'));
  await sample(4200);
  out.ticker = [...tickerSet];

  const has = (re) => out.ticker.some((t) => re.test(t));
  out.asserts.ticker_signal_line = has(/signal: error — \$ node --nope-flag/);
  out.asserts.ticker_searching_line = has(/searching for a solution/);
  out.asserts.ticker_learned_line = has(/✓ learned: verify flags with node --help/);
  out.asserts.distiller_glow_thinking = out.distillerOnDuringThinking === true;
  out.asserts.mote_birth_kept = out.moteBirth === true;

  // reduced motion: static think indicator, no new animations
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await sleep(300);
  await p.evaluate(() => {
    stagedLearnToast({ kind: 'learning-start', runId: 'rm-t4', ts: 'z1', signal: 'error — $ node --nope-flag ✗ exit 9', source: 'rm test' });
  });
  await sleep(100);
  await p.evaluate(() => stagedLearnToast({ kind: 'learning-thinking', runId: 'rm-t4', ts: 'z2', signal: 'x' }));
  await sleep(1800);   // past the 1.4s stage gate → stage B rendered
  out.rm = await p.evaluate(() => {
    const dots = [...document.querySelectorAll('.ltoast.staged .lt-think i')];
    return {
      thinkPresent: dots.length === 3,
      dotAnimations: dots.reduce((n, d) => n + d.getAnimations().length, 0),
      dotOpacity: dots[0] ? getComputedStyle(dots[0]).opacity : null,
      totalAnimations: document.getAnimations().length,
    };
  });
  await p.screenshot({ path: __dirname + '/learnux-t4-reduced-motion-dark.png' });
  out.asserts.rm_static_indicator = out.rm.thinkPresent && out.rm.dotAnimations === 0;
  out.asserts.zero_console_errors = out.errors.length === 0;
  fs.writeFileSync(__dirname + '/learnux-t4-results.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out.asserts, null, 1));
  console.log('ticker:', out.ticker);
  console.log('anim baseline:', out.animBaseline, '→ during thinking:', out.animDuringThinking, '| RM total:', out.rm.totalAnimations, 'dotAnims:', out.rm.dotAnimations);
  await b.close();
})().catch((e) => { console.error('RIGFAIL', e); process.exit(1); });
