// errsweep-pages.js — load all 11 pages in both themes, collect console errors/warnings,
// pageerrors, failed/4xx/5xx network requests.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PAGES = ['/', '/map.html', '/tree.html', '/wishlist.html', '/memory.html', '/activity.html',
  '/playbook.html', '/queue.html', '/protos.html', '/cost.html', '/entity.html'];
const THEMES = ['dark', 'light'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1360,900'] });
  const out = [];
  for (const theme of THEMES) {
    for (const path of PAGES) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1360, height: 900 });
      const rec = { path, theme, consoleErrors: [], consoleWarnings: [], pageErrors: [], badRequests: [] };
      page.on('console', (m) => {
        const t = m.type();
        if (t === 'error') rec.consoleErrors.push(m.text().slice(0, 400));
        else if (t === 'warning') rec.consoleWarnings.push(m.text().slice(0, 400));
      });
      page.on('pageerror', (e) => rec.pageErrors.push(String(e.message).slice(0, 500)));
      page.on('requestfailed', (r) => {
        const f = r.failure();
        rec.badRequests.push({ url: r.url().slice(0, 200), kind: 'failed', err: f && f.errorText });
      });
      page.on('response', (r) => { if (r.status() >= 400) rec.badRequests.push({ url: r.url().slice(0, 200), kind: 'status', status: r.status() }); });
      const sep = path.includes('?') ? '&' : '?';
      try {
        await page.goto(BASE + path + sep + 'theme=' + theme, { waitUntil: 'networkidle0', timeout: 30000 });
        await sleep(1500); // let deferred fetches / timers fire
      } catch (e) { rec.gotoError = String(e.message).slice(0, 300); }
      out.push(rec);
      await page.close();
    }
  }
  await browser.close();
  fs.writeFileSync(__dirname + '/errsweep-pages-results.json', JSON.stringify(out, null, 2));
  for (const r of out) {
    const n = r.consoleErrors.length + r.consoleWarnings.length + r.pageErrors.length + r.badRequests.length + (r.gotoError ? 1 : 0);
    console.log(`${r.theme.padEnd(5)} ${r.path.padEnd(16)} ` + (n ? `ISSUES=${n} ce=${r.consoleErrors.length} cw=${r.consoleWarnings.length} pe=${r.pageErrors.length} net=${r.badRequests.length}${r.gotoError ? ' goto=' + r.gotoError : ''}` : 'clean'));
  }
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
