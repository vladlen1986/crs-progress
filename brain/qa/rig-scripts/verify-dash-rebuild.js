// Dashboard rebuild verification — chat-first home (2026-08-02 Windows)
// Asserts: dashboard renders, composer visible on dash, Needs-you capped at 8,
// status pills present, Continue+Todos two-col, tools row, zero console errors.
const puppeteer = require('puppeteer-core');
const CHROME = process.platform === 'darwin'
  ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP = 'http://127.0.0.1:4317/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    args: ['--window-size=1440,900'], defaultViewport: { width: 1440, height: 900 } });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

  await page.goto(APP, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => showDashboard());
  await sleep(1200); // renderDashboard fetches /api/dash + /api/chats + /api/plans

  const r = await page.evaluate(() => {
    const d = document.getElementById('dashView');
    const cs = getComputedStyle(document.querySelector('.composer-wrap'));
    return {
      dashVisible: d.style.display !== 'none',
      composerShown: cs.display !== 'none',
      attRows: d.querySelectorAll('.att .drow').length,
      attMore: !!d.querySelector('.att .dempty'),
      pills: d.querySelectorAll('.dpill').length,
      twoCol: !!d.querySelector('.dash-two'),
      chatRows: d.querySelectorAll('.dash-two .dcard:first-child .drow').length,
      todoRows: d.querySelectorAll('.dash-two .trow').length,
      tools: d.querySelectorAll('.tool').length,
      oldCards: d.querySelectorAll('.action').length, // must be 0
      greet: (d.querySelector('h2') || {}).textContent || '',
    };
  });

  // click-through: first recent chat opens the chat view
  let chatOpens = false;
  if (r.chatRows) {
    await page.evaluate(() => document.querySelector('.dash-two .dcard .drow').click());
    await sleep(600);
    chatOpens = await page.evaluate(() => document.getElementById('chatView').style.display !== 'none');
  }

  await page.evaluate(() => showDashboard()); await sleep(800);
  await page.screenshot({ path: __dirname + '/dash-rebuild.png' });

  const checks = {
    'dashboard renders': r.dashVisible,
    'greeting present': /Vlad/.test(r.greet),
    'composer visible on dashboard': r.composerShown,
    'needs-you capped ≤8': r.attRows > 0 && r.attRows <= 8,
    '+N more line when capped': r.attMore,
    'status pills (3-4)': r.pills >= 3 && r.pills <= 4,
    'two-column continue/todos': r.twoCol,
    'recent chats listed': r.chatRows > 0,
    'todos listed': r.todoRows > 0,
    'tools row (15)': r.tools === 15,
    'no old quick-action tiles': r.oldCards === 0,
    'chat row click opens chat': chatOpens,
    'zero console/page errors': errors.length === 0,
  };
  let pass = 0, fail = 0;
  for (const [k, v] of Object.entries(checks)) { console.log((v ? '  ✓ ' : '  ✗ ') + k); v ? pass++ : fail++; }
  if (errors.length) console.log('errors:', errors.slice(0, 5));
  console.log(JSON.stringify(r));
  console.log(`RESULT: ${pass}/${pass + fail} pass`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})();
