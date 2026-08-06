// The in-chat thinking indicator is colourful and animating again. Built by
// injecting brainHtml() into a .chat-brain host — no model call is spent.
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
  await sleep(1400);
  await p.evaluate(() => { try { localStorage.removeItem('crs-last-chat'); } catch (e) {} });
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(2600);

  const r = await p.evaluate(() => {
    const log = document.getElementById('chatLog');
    log.innerHTML = '<div class="chat-brain">' + brainHtml() + '<span style="margin-left:10px;color:#939393;font-size:13px">Thinking…</span></div>';
    const wrap = log.querySelector('.brainwrap');
    const mark = log.querySelector('.brainmark');
    const mols = [...log.querySelectorAll('.mol')];
    const halo = getComputedStyle(wrap, '::after');
    return {
      gradient: getComputedStyle(mark).stroke,
      markAnim: getComputedStyle(mark).animationName,
      haloOpacity: halo.opacity,
      haloAnim: halo.animationName,
      haloBg: halo.backgroundImage.slice(0, 60),
      molCount: mols.length,
      molShown: mols.every((m) => getComputedStyle(m).opacity === '1' && getComputedStyle(m).display !== 'none'),
      molAnims: mols.map((m) => getComputedStyle(m).animationName + ':' + getComputedStyle(m).animationDuration),
      molColours: mols.map((m) => getComputedStyle(m).backgroundColor),
      molGlow: getComputedStyle(mols[0]).boxShadow !== 'none',
    };
  });
  check('thinking brain strokes the AI gradient', /g-ai/.test(r.gradient), r.gradient);
  check('thinking brain hue-rotates', r.markAnim === 'aihue', r.markAnim);
  // aipulse animates opacity .5→1, so a sample lands anywhere in that band
  check('purple halo is on and pulsing', parseFloat(r.haloOpacity) >= 0.5 && r.haloAnim === 'aipulse' && /168, 85, 247/.test(r.haloBg), `${r.haloOpacity} / ${r.haloAnim} / ${r.haloBg}`);
  check('all 5 molecules are visible (not display:none)', r.molCount === 5 && r.molShown, `${r.molCount} / shown:${r.molShown}`);
  check('molecules orbit both ways at different speeds', new Set(r.molAnims).size === 5 && r.molAnims.some((a) => /molCW/.test(a)) && r.molAnims.some((a) => /molCCW/.test(a)), JSON.stringify(r.molAnims));
  check('molecules are coloured and glowing', new Set(r.molColours).size === 5 && r.molGlow, JSON.stringify(r.molColours));

  // the sidebar brand badge must stay flat — the colour is scoped to thinking
  const brand = await p.evaluate(() => {
    const m = document.querySelector('.brand .brainmark');
    return { stroke: getComputedStyle(m).stroke, anim: getComputedStyle(m).animationName, halo: getComputedStyle(m.closest('.brainwrap'), '::after').opacity };
  });
  check('sidebar brand badge stays flat ink', !/g-ai/.test(brand.stroke) && brand.anim === 'none' && brand.halo === '0', JSON.stringify(brand));

  const frames = [];
  for (let i = 0; i < 3; i++) { frames.push(await p.evaluate(() => [...document.querySelectorAll('#chatLog .mol')].map((m) => getComputedStyle(m).transform).join('|'))); await sleep(320); }
  check('molecules are really orbiting', new Set(frames).size === 3, `${new Set(frames).size}/3 distinct`);

  const bx = await p.evaluate(() => { const r2 = document.querySelector('#chatLog .chat-brain').getBoundingClientRect(); return { x: r2.x, y: r2.y }; });
  await p.screenshot({ path: OUT + 'thinking-brain.png', clip: { x: Math.max(0, bx.x - 10), y: Math.max(0, bx.y - 24), width: 300, height: 80 } });

  await b.close();
  console.log(fails === 0 ? 'THINKING: ALL PASS' : `THINKING: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
