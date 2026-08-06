// The nucleus shrink, the atom fade-in and the cards must be ONE gesture.
// Samples all three mid-transition and asserts they are at the same progress.
const puppeteer = require('puppeteer-core');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const check = (n, ok, d) => { console.log((ok ? 'PASS' : 'FAIL'), n, d || ''); if (!ok) fails++; };

const SAMPLE = () => {
  const q = (s) => document.querySelector('#chatLog ' + s);
  const m = q('.dh-mark svg:not(.dh-cosmos)');
  const tr = getComputedStyle(m).transform;
  // matrix(a,b,c,d,e,f) -> a is scaleX
  const scale = tr === 'none' ? 1 : parseFloat(tr.slice(tr.indexOf('(') + 1).split(',')[0]);
  return {
    markProgress: (1 - scale) / 0.6,                                   // 1 -> .4
    atomProgress: parseFloat(getComputedStyle(q('.dh-cosmos')).opacity),
    cardProgress: parseFloat(getComputedStyle(q('.dh-cards')).opacity),
  };
};

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-device-scale-factor=1'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1600, height: 950 });
  await p.goto('http://127.0.0.1:4317/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(1400);
  await p.evaluate(() => { try { localStorage.removeItem('crs-last-chat'); } catch (e) {} });
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(2600);

  // one shared trigger, one easing, one pair of durations
  const spec = await p.evaluate(() => {
    const q = (s) => document.querySelector('#chatLog ' + s);
    const hero = getComputedStyle(document.querySelector('#chatLog .dash-hero'));
    const m = getComputedStyle(q('.dh-mark svg:not(.dh-cosmos)'));
    const a = getComputedStyle(q('.dh-cosmos'));
    const c = getComputedStyle(q('.dh-cards'));
    // a comma-split breaks on cubic-bezier(a, b, c, d) — split only at depth 0
    const first = (v) => { let d = 0, out = ''; for (const ch of v) { if (ch === '(') d++; else if (ch === ')') d--; else if (ch === ',' && d === 0) break; out += ch; } return out.trim(); };
    return {
      open: hero.getPropertyValue('--dh-open').trim(),
      close: hero.getPropertyValue('--dh-close').trim(),
      ease: hero.getPropertyValue('--dh-ease').trim(),
      dur: [m.transitionDuration, a.transitionDuration, c.transitionDuration].map(first),
      fn: [m.transitionTimingFunction, a.transitionTimingFunction, c.transitionTimingFunction].map(first),
      delay: [m.transitionDelay, a.transitionDelay, c.transitionDelay].map(first),
    };
  });
  check('one choreography is declared', !!spec.open && !!spec.close && !!spec.ease, JSON.stringify({ open: spec.open, close: spec.close }));
  check('all three share the resting duration', new Set(spec.dur).size === 1, JSON.stringify(spec.dur));
  check('all three share the easing', new Set(spec.fn).size === 1, JSON.stringify(spec.fn));
  check('none of them carries a stray delay', spec.delay.every((d) => parseFloat(d) === 0), JSON.stringify(spec.delay));

  // --- OPENING: sample the three properties together, mid-flight ---
  const box = await p.evaluate(() => { const r = document.querySelector('#chatLog .dh-id').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await p.mouse.move(box.x, box.y);
  const open = [];
  for (let i = 0; i < 5; i++) { open.push(await p.evaluate(SAMPLE)); await sleep(95); }
  const spread = (s) => Math.max(s.markProgress, s.atomProgress, s.cardProgress) - Math.min(s.markProgress, s.atomProgress, s.cardProgress);
  const mid = open.filter((s) => s.atomProgress > 0.05 && s.atomProgress < 0.95);
  const worstOpen = Math.max(...mid.map(spread));
  check('opening: all three at the same progress throughout', mid.length >= 2 && worstOpen <= 0.1,
    `worst spread ${worstOpen.toFixed(3)} over ${mid.length} mid-flight samples ` + JSON.stringify(mid.map((s) => [s.markProgress.toFixed(2), s.atomProgress.toFixed(2), s.cardProgress.toFixed(2)])));

  await sleep(700);
  const done = await p.evaluate(SAMPLE);
  check('opening lands fully open together', done.markProgress > 0.98 && done.atomProgress > 0.98 && done.cardProgress > 0.98, JSON.stringify(done));

  // --- CLOSING: same test on the way out ---
  await p.mouse.move(40, 900);
  const close = [];
  for (let i = 0; i < 5; i++) { close.push(await p.evaluate(SAMPLE)); await sleep(80); }
  const midC = close.filter((s) => s.atomProgress > 0.05 && s.atomProgress < 0.95);
  const worstClose = Math.max(...midC.map(spread));
  check('closing: all three at the same progress throughout', midC.length >= 2 && worstClose <= 0.1,
    `worst spread ${worstClose.toFixed(3)} over ${midC.length} mid-flight samples`);

  await sleep(700);
  const shut = await p.evaluate(SAMPLE);
  check('closing lands fully closed together', shut.markProgress < 0.02 && shut.atomProgress < 0.02 && shut.cardProgress < 0.02, JSON.stringify(shut));

  // travelling from the mark onto a card must not restart or drop anything
  await p.mouse.move(box.x, box.y);
  await sleep(800);
  const card = await p.evaluate(() => { const r = document.querySelector('#chatLog .dh-cards .tcard').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await p.mouse.move(card.x, card.y, { steps: 20 });
  await sleep(300);
  const onCard = await p.evaluate(SAMPLE);
  check('travelling onto a card keeps the whole gesture open', onCard.markProgress > 0.98 && onCard.atomProgress > 0.98 && onCard.cardProgress > 0.98, JSON.stringify(onCard));

  await b.close();
  console.log(fails === 0 ? 'SYNC: ALL PASS' : `SYNC: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
