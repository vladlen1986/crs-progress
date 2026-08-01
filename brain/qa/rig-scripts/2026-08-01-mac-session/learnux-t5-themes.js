// learnux T5 (visual part) — Stage B and expanded Stage C in BOTH themes.
// Drives stagedLearnToast with the REAL learning-* events from the ledger
// (the T1 distill run), so the cards show the genuinely distilled lesson.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://127.0.0.1:4317';
const LEDGER = '/Users/vlad/projects/crs-progress/crs-brain/data/learn-events.jsonl';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const evs = fs.readFileSync(LEDGER, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const saved = [...evs].reverse().find((e) => e.kind === 'learning-saved' && e.lessons && e.runId);
  const start = evs.find((e) => e.kind === 'learning-start' && e.runId === saved.runId);
  const think = evs.find((e) => e.kind === 'learning-thinking' && e.runId === saved.runId);
  if (!saved || !start || !think) { console.error('no staged run found in ledger'); process.exit(1); }
  const errors = [];
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1440,940'] });
  for (const theme of ['dark', 'light']) {
    const p = await b.newPage(); await p.setViewport({ width: 1440, height: 940 });
    p.on('console', (m) => { if (m.type() === 'error') errors.push(theme + ': ' + m.text().slice(0, 200)); });
    p.on('pageerror', (e) => errors.push(theme + ' PAGEERR: ' + String(e.message).slice(0, 200)));
    await p.goto(BASE + '/?theme=' + theme, { waitUntil: 'networkidle2' });
    await p.waitForFunction('typeof stagedLearnToast==="function"');
    await p.evaluate(() => { SOUNDS.playSound = () => {}; });
    await p.evaluate((a, t) => { stagedLearnToast(a); stagedLearnToast(t); }, { ...start, ts: 'x1' }, { ...think, ts: 'x2' });
    await sleep(1800);   // stage gate → B rendered with dots
    await p.screenshot({ path: __dirname + `/learnux-t5-stageB-${theme}.png` });
    await p.evaluate((s) => stagedLearnToast({ ...s, ts: 'x3' }), saved);
    await sleep(1600);
    await p.click('.ltoast.staged .lt-head');
    await sleep(350);
    await p.screenshot({ path: __dirname + `/learnux-t5-stageC-expanded-${theme}.png` });
    await p.close();
  }
  console.log('shots done; console errors:', errors.length, errors.slice(0, 4));
  await b.close();
})().catch((e) => { console.error('RIGFAIL', e); process.exit(1); });
