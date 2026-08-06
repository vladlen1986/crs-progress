// The run meter sits directly above the composer, left-aligned with it, naked.
const puppeteer = require('puppeteer-core');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = 'C:/Users/CCTV Mgr/Projects/crs-progress/crs-brain/data/screenshots/redesign/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const check = (n, ok, d) => { console.log((ok ? 'PASS' : 'FAIL'), n, d || ''); if (!ok) fails++; };
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-device-scale-factor=2', '--disable-lcd-text'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1600, height: 950, deviceScaleFactor: 2 });
  await p.goto('http://127.0.0.1:4317/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(2600);

  // paint a realistic meter without spending a model call
  const r = await p.evaluate(() => {
    const gm = document.getElementById('genMeter');
    gm.innerHTML = '<span class="gm-live"></span><span class="gm-t">19s</span><span class="gm-sep"></span><span class="gm-tok">Sonnet 5</span><span class="gm-sep"></span><span class="gm-tok">↑ <b>51k</b> in · ↓ <b>334</b> out</span>';
    gm.classList.add('show');
    const cs = getComputedStyle(gm);
    const g = gm.getBoundingClientRect(), c = document.querySelector('.composer').getBoundingClientRect();
    return {
      display: cs.display,
      bg: cs.backgroundColor, bgImg: cs.backgroundImage,
      borderW: cs.borderTopWidth + ' ' + cs.borderLeftWidth,
      radius: cs.borderTopLeftRadius,
      gLeft: Math.round(g.left), cLeft: Math.round(c.left),
      gBottom: Math.round(g.bottom), cTop: Math.round(c.top),
      gWidthVsCol: Math.round(g.width),
    };
  });
  check('meter is block-level (inline-flex could never align)', r.display === 'flex', r.display);
  check('no background', /rgba\(0, 0, 0, 0\)|transparent/.test(r.bg) && r.bgImg === 'none', `${r.bg} / ${r.bgImg}`);
  check('no border', r.borderW === '0px 0px', r.borderW);
  check('left-aligned with the composer', Math.abs(r.gLeft - r.cLeft) <= 14, `meter ${r.gLeft} vs composer ${r.cLeft}`);
  check('sits directly above the composer', r.cTop - r.gBottom >= 0 && r.cTop - r.gBottom <= 16, `${r.cTop - r.gBottom}px gap`);

  // a DOMRect serialises to {} through evaluate — hand back plain numbers
  const c = await p.evaluate(() => { const b2 = document.querySelector('.composer').getBoundingClientRect(); return { x: b2.x, y: b2.y, width: b2.width }; });
  await p.screenshot({ path: OUT + 'genmeter.png', clip: { x: Math.round(c.x) - 20, y: Math.round(c.y) - 60, width: Math.round(c.width) + 40, height: 150 } });
  await b.close();
  console.log(fails === 0 ? 'GENMETER: ALL PASS' : `GENMETER: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
