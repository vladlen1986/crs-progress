// f2-chat-chrome.js — before/after screenshots of the legacy UM-audit chat (9e881692)
// in both themes + computed-style probes for the three removed line decorations.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CHAT = '9e881692-df40-440c-be2a-d04999411b3c';
const TAG = process.argv[2] || 'before';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1360,900'] });
  const out = {};
  for (const theme of ['dark', 'light']) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1360, height: 900 });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
    page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 300)));
    await page.goto(BASE + '/?theme=' + theme, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluate((id) => openChat(id), CHAT);
    await sleep(2000);
    // open the first work group so .wsteps/.wlane are visible
    await page.evaluate(() => { const g = document.querySelector('.wgroup'); if (g) g.classList.add('open'); const log = document.getElementById('chatLog'); log.scrollTop = 0; });
    await sleep(400);
    const probe = await page.evaluate(() => {
      const ws = document.querySelector('.wgroup.open .wsteps');
      const lane = document.querySelector('.wlane');
      const laneBp = document.querySelector('.wlane.bp');
      const bpHead = document.querySelector('.wstep[data-actor=buildprint] .wstep-head');
      const cs = (el, p) => el ? getComputedStyle(el).getPropertyValue(p) : null;
      const csa = (el, p) => el ? getComputedStyle(el, '::after').getPropertyValue(p) : null;
      return {
        steps: document.querySelectorAll('.wstep').length,
        lanes: document.querySelectorAll('.wlane').length,
        bpLanes: document.querySelectorAll('.wlane.bp').length,
        laneTexts: [...new Set([...document.querySelectorAll('.wlane')].map((e) => e.textContent))],
        wstepsBorderLeft: cs(ws, 'border-left-width'),
        wstepsPaddingLeft: cs(ws, 'padding-left'),
        laneAfterContent: csa(lane, 'content'),
        laneBpAfterContent: csa(laneBp, 'content'),
        bpHeadBoxShadow: cs(bpHead, 'box-shadow'),
      };
    });
    probe.consoleErrors = errors;
    out[theme] = probe;
    await page.screenshot({ path: `${__dirname}/f2-${TAG}-${theme}.png` });
    await page.close();
  }
  fs.writeFileSync(`${__dirname}/f2-${TAG}-results.json`, JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
