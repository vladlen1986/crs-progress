// The rebuilt atom: 5 comets, gradient tails, no dashes, no bead trains.
const puppeteer = require('puppeteer-core');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = 'C:/Users/CCTV Mgr/Projects/crs-progress/crs-brain/data/screenshots/redesign/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const check = (n, ok, d) => { console.log((ok ? 'PASS' : 'FAIL'), n, d || ''); if (!ok) fails++; };
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-device-scale-factor=2', '--disable-lcd-text', '--font-render-hinting=none'] });
  const p = await b.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.setViewport({ width: 1600, height: 950, deviceScaleFactor: 2 });
  await p.goto('http://127.0.0.1:4317/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(1400);
  await p.evaluate(() => { try { localStorage.removeItem('crs-last-chat'); } catch (e) {} });
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(2600);
  check('no page errors building the atom', errs.length === 0, errs.join(' | ').slice(0, 200));

  const box = await p.evaluate(() => { const r = document.querySelector('#chatLog .dh-id').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  const markBefore = await p.evaluate(() => Math.round(document.querySelector('#chatLog .dh-mark svg:not(.dh-cosmos)').getBoundingClientRect().width));
  await p.mouse.move(box.x, box.y);
  await sleep(1400);

  const a = await p.evaluate(() => {
    const c = document.querySelector('#chatLog .dh-cosmos');
    const tails = [...c.querySelectorAll('.dhc-tail')];
    return {
      comets: c.querySelectorAll('.dhc-core-dot').length,
      tails: tails.length,
      dashed: tails.filter((t) => getComputedStyle(t).strokeDasharray !== 'none').length,
      gradients: tails.every((t) => /url\(/.test(t.getAttribute('stroke'))),
      widths: [...new Set(tails.map((t) => t.getAttribute('stroke-width')))],
      tracks: c.querySelectorAll('.dhc-track').length,
      trackAlpha: (c.querySelector('.dhc-track') || {}) && getComputedStyle(c.querySelector('.dhc-track')).strokeOpacity,
      spins: [...new Set([...c.querySelectorAll('.dhc-spin')].map((g) => getComputedStyle(g).animationDuration))],
      eases: [...new Set([...c.querySelectorAll('.dhc-spin')].map((g) => getComputedStyle(g).animationTimingFunction))],
      depth: [...c.querySelectorAll('.dhc-depth')].map((g) => getComputedStyle(g).animationName)[0],
      filtersOnMoving: [...c.querySelectorAll('.dhc-tail, .dhc-track')].filter((e) => getComputedStyle(e).filter !== 'none').length,
      // what matters is ANIMATED nodes, not markup size (defs/gradient stops are static)
      nodes: [...c.querySelectorAll('*')].filter((e) => getComputedStyle(e).animationName !== 'none').length,
      legacy: c.querySelectorAll('.dhc-t, .dhc-el, .dhc-ring, .dhc-arc, .dhc-ripple, .dhc-shell').length,
    };
  });
  check('5 comets, 15 gradient tail chunks', a.comets === 5 && a.tails === 15 && a.gradients, JSON.stringify({ c: a.comets, t: a.tails, g: a.gradients }));
  check('NOTHING is dashed', a.dashed === 0, `${a.dashed} dashed`);
  check('tail width tapers 2.6 -> 1.1', JSON.stringify(a.widths) === '["2.6","1.9","1.1"]', JSON.stringify(a.widths));
  check('bead trains and rings are gone', a.legacy === 0, `${a.legacy} legacy nodes`);
  check('faint solid track behind each comet', a.tracks === 5 && parseFloat(a.trackAlpha) <= 0.06, `${a.tracks} @ ${a.trackAlpha}`);
  check('orbits spin LINEAR (easing would hitch at the loop seam)', a.eases.every((e) => e === 'linear'), JSON.stringify(a.eases));
  check('slow, non-harmonic periods', a.spins.length >= 5 && a.spins.every((s) => parseFloat(s) >= 25), JSON.stringify(a.spins));
  check('head carries the near/far depth cue', a.depth === 'dhcDepth', a.depth);
  check('no filter on any moving stroke', a.filtersOnMoving === 0, String(a.filtersOnMoving));
  check('animated node count is sane (was 120)', a.nodes <= 30, `${a.nodes} animated nodes`);

  const markAfter = await p.evaluate(() => Math.round(document.querySelector('#chatLog .dh-mark svg:not(.dh-cosmos)').getBoundingClientRect().width));
  check('the glyph shrinks into a nucleus on hover', markBefore === 72 && markAfter < 40, `${markBefore}px -> ${markAfter}px`);

  const glow = await p.evaluate(() => {
    const cs = getComputedStyle(document.querySelector('#chatLog .dhc-halo'));
    return { op: parseFloat(cs.opacity), core: parseFloat(getComputedStyle(document.querySelector('#chatLog .dhc-core')).opacity) };
  });
  check('background glow is atmosphere, not a lit disc', glow.op <= 0.62 && glow.core <= 0.46, JSON.stringify(glow));

  const frames = [];
  for (let i = 0; i < 4; i++) {
    frames.push(await p.evaluate(() => [...document.querySelectorAll('#chatLog .dh-cosmos .dhc-spin, #chatLog .dh-cosmos .dhc-depth')].map((g) => getComputedStyle(g).transform + getComputedStyle(g).opacity).join('|')));
    await p.screenshot({ path: OUT + 'atom-f' + i + '.png', clip: { x: box.x - 190, y: box.y - 150, width: 380, height: 300 } });
    await sleep(1100);
  }
  check('every frame differs', new Set(frames).size === 4, `${new Set(frames).size}/4`);
  await p.screenshot({ path: OUT + 'atom-full.png' });
  await b.close();
  console.log(fails === 0 ? 'ATOM: ALL PASS' : `ATOM: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
