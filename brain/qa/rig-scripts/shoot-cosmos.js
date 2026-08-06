// Prove the hover cosmos actually animates: freeze it at four moments and check
// the orbit groups and electrons are at DIFFERENT positions in each frame.
const puppeteer = require('puppeteer-core');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = 'C:/Users/CCTV Mgr/Projects/crs-progress/crs-brain/data/screenshots/redesign/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const check = (n, ok, d) => { console.log((ok ? 'PASS' : 'FAIL'), n, d || ''); if (!ok) fails++; };
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-device-scale-factor=2', '--disable-lcd-text', '--font-render-hinting=none'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1600, height: 950, deviceScaleFactor: 2 });
  await p.goto('http://127.0.0.1:4317/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(1400);
  await p.evaluate(() => { try { localStorage.removeItem('crs-last-chat'); } catch (e) {} });
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(2800);

  const rest = await p.evaluate(() => getComputedStyle(document.querySelector('#chatLog .dh-cosmos')).opacity);
  check('cosmos invisible at rest', rest === '0', rest);

  const box = await p.evaluate(() => { const r = document.querySelector('#chatLog .dh-id').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await p.mouse.move(box.x, box.y);
  await sleep(900);

  const shown = await p.evaluate(() => {
    const c = document.querySelector('#chatLog .dh-cosmos');
    return {
      opacity: getComputedStyle(c).opacity,
      rings: c.querySelectorAll('.dhc-ring').length,
      electrons: c.querySelectorAll('.dhc-el').length,
      motes: c.querySelectorAll('.dhc-mote').length,
      spins: [...c.querySelectorAll('.dhc-spin')].map((g) => getComputedStyle(g).animationDuration + ':' + getComputedStyle(g).animationDirection),
      colours: [...new Set([...c.querySelectorAll('.dhc-el')].map((e) => getComputedStyle(e).fill))],
      hue: getComputedStyle(c).animationName,
      markAnim: getComputedStyle(document.querySelector('#chatLog .dh-mark')).animationName,
      markStroke: getComputedStyle(document.querySelector('#chatLog .dh-mark svg:not(.dh-cosmos)')).stroke,
      hits: (() => { const r = c.getBoundingClientRect(); const el = document.elementFromPoint(r.x + 6, r.y + 6); return el ? (el.closest('.dh-cosmos') ? 'cosmos' : 'passthrough') : 'none'; })(),
    };
  });
  check('cosmos visible on hover', shown.opacity === '1', shown.opacity);
  check('5 orbits, 15 molecules, 12 motes', shown.rings === 5 && shown.electrons === 15 && shown.motes === 12, JSON.stringify({ r: shown.rings, e: shown.electrons, m: shown.motes }));
  check('orbits counter-rotate at different speeds', shown.spins.length === 5 && new Set(shown.spins).size === 5 && shown.spins.filter((s) => /reverse/.test(s)).length === 2, JSON.stringify(shown.spins));
  check('molecules are the AI palette, not grey', shown.colours.length >= 6 && !shown.colours.some((c) => /rgb\((\d+), \1, \1\)/.test(c)), JSON.stringify(shown.colours));
  check('whole field hue-shifts', shown.hue === 'dhcHue', shown.hue);
  check('mark switches to the thinking pulse', shown.markAnim === 'dhThink', shown.markAnim);
  check('mark strokes the AI gradient', /g-ai/.test(shown.markStroke), shown.markStroke);
  check('cosmos never eats a click', shown.hits !== 'cosmos', shown.hits);

  // sample real motion: matrix of each spin group + electron offset over time
  const sample = () => p.evaluate(() => [...document.querySelectorAll('#chatLog .dh-cosmos .dhc-spin')].map((g) => getComputedStyle(g).transform).join('|')
    + '||' + [...document.querySelectorAll('#chatLog .dh-cosmos .dhc-el')].map((e) => getComputedStyle(e).offsetDistance).join(','));
  const frames = [];
  for (let i = 0; i < 4; i++) { frames.push(await sample()); await p.screenshot({ path: OUT + 'cosmos-f' + i + '.png', clip: { x: box.x - 190, y: box.y - 150, width: 380, height: 300 } }); await sleep(700); }
  check('every frame differs — it is really moving', new Set(frames).size === 4, `${new Set(frames).size}/4 distinct`);

  await p.screenshot({ path: OUT + 'one-screen-cosmos.png' });
  await b.close();
  console.log(fails === 0 ? 'COSMOS: ALL PASS' : `COSMOS: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
