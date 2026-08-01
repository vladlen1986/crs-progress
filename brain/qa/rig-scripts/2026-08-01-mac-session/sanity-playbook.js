// Sanity-prove the rebuilt Mac rig on KNOWN-PASS rows from run 1 (verify-playbook.js):
//  - app shell loads (sendMsg present)
//  - "Playbook check" machinery reachable: /api/playbook serves the 7 real lessons
//  - playbook.html renders real entries in BOTH themes (run-1 P10, proven PASS)
// No bp turn, no data mutation — pure read-only rig proof.
const puppeteer = require('puppeteer-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const APP = 'http://127.0.0.1:4317/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  let fails = 0;
  const check = (name, ok, detail) => { console.log((ok ? 'PASS' : 'FAIL'), name, detail || ''); if (!ok) fails++; };

  await page.goto(APP, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction('typeof sendMsg === "function"', { timeout: 15000 });
  await sleep(1500);
  check('S1 app shell loads (sendMsg present)', true);

  const pb = await (await fetch(APP + 'api/playbook')).json();
  check('S2 /api/playbook serves 7 real lessons', (pb.lessons || []).length === 7, `lessons=${(pb.lessons || []).length}`);

  for (const theme of ['dark', 'light']) {
    await page.evaluate((t) => { try { setTheme(t); } catch (e) {} }, theme);
    await page.evaluate(() => openTarget('/playbook.html', { title: 'Playbook' }));
    await sleep(1500);
    const pf = page.frames().find((f) => f.url().includes('playbook.html'));
    const counts = pf ? await pf.evaluate(() => ({ lessons: document.querySelectorAll('.les').length, cats: document.querySelectorAll('.cathead').length, rec: document.body.textContent.includes('recurred') })) : null;
    check(`[${theme}] S3 playbook surface renders real entries`, !!counts && counts.lessons >= 7 && counts.cats >= 3 && counts.rec, JSON.stringify(counts || {}));
  }

  check('zero console errors', errors.length === 0, errors.slice(0, 4).join(' | '));
  await browser.close();
  console.log(fails === 0 ? 'SANITY: ALL PASS' : `SANITY: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
