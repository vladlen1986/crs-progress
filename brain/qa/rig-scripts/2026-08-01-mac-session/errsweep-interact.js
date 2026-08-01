// errsweep-interact.js — index interaction flows + mobile drawer, collecting runtime errors per step.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function attach(page, log) {
  let step = { name: 'init' };
  page.on('console', (m) => {
    const t = m.type();
    if (t === 'error' || t === 'warning') log.push({ step: step.name, kind: 'console.' + t, text: m.text().slice(0, 400) });
  });
  page.on('pageerror', (e) => log.push({ step: step.name, kind: 'pageerror', text: String(e.message).slice(0, 500) }));
  page.on('requestfailed', (r) => {
    if (r.url().includes('gstatic.com')) return; // chrome connectivity probe
    log.push({ step: step.name, kind: 'requestfailed', text: r.url().slice(0, 200) + ' ' + (r.failure() && r.failure().errorText) });
  });
  page.on('response', (r) => { if (r.status() >= 400) log.push({ step: step.name, kind: 'http' + r.status(), text: r.url().slice(0, 200) }); });
  return (n) => { step.name = n; console.log('-- step: ' + n); };
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1360,900'] });
  const log = [];

  // ===== desktop interaction flow (dark) =====
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 900 });
  const setStep = attach(page, log);

  setStep('load-index');
  await page.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForFunction(() => typeof openPageWindow === 'function' && typeof smartOpen === 'function', { timeout: 15000 });
  await sleep(1200);

  // ---- sidebar first (before any overlay windows exist) ----
  setStep('sidebar-hover-rows');
  const rows = await page.$$('#paneChats .item');
  for (const r of rows.slice(0, 4)) { const b = await r.boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await sleep(150); } }

  setStep('sidebar-kebab-menu');
  if (rows.length) {
    const b = await rows[0].boundingBox();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await sleep(250);
    const mb = await rows[0].$('.cmenu');
    const mbb = mb && await mb.boundingBox();
    if (mbb) { await page.mouse.click(mbb.x + mbb.width / 2, mbb.y + mbb.height / 2); await sleep(600); }
    const menuShown = await page.evaluate(() => { const m = document.getElementById('chatMenu'); return !!(m && m.style.display !== 'none'); });
    console.log('   kebab menu shown: ' + menuShown);
    await page.mouse.click(700, 450); await sleep(300);
  } else console.log('   no chat rows found');

  setStep('sidebar-collapse-expand');
  await page.hover('.col.left .brand'); await sleep(300);
  await page.evaluate(() => document.querySelector('.col-collapse').click()); await sleep(600);
  const collapsed = await page.evaluate(() => document.querySelector('.app').classList.contains('lcol'));
  await page.evaluate(() => document.querySelector('.expand-handle.left').click()); await sleep(600);
  const expanded = await page.evaluate(() => !document.querySelector('.app').classList.contains('lcol'));
  console.log('   collapse=' + collapsed + ' expand=' + expanded);

  setStep('sidebar-drag-resize');
  const rz = await page.$('#lresizer');
  const rb = rz && await rz.boundingBox();
  if (rb) {
    await page.mouse.move(rb.x + rb.width / 2, 300);
    await page.mouse.down();
    for (let x = rb.x; x <= rb.x + 80; x += 10) { await page.mouse.move(x, 300); await sleep(30); }
    await page.mouse.up(); await sleep(300);
    const w1 = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--left-w'));
    const rb2 = await (await page.$('#lresizer')).boundingBox();
    await page.mouse.move(rb2.x + 2, 300); await page.mouse.down();
    for (let x = rb2.x; x >= rb2.x - 80; x -= 10) { await page.mouse.move(x, 300); await sleep(30); }
    await page.mouse.up(); await sleep(300);
    const w2 = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--left-w'));
    console.log('   resize widths: ' + w1.trim() + ' -> ' + w2.trim());
    await page.evaluate(() => { localStorage.removeItem('leftW'); document.documentElement.style.removeProperty('--left-w'); });
  } else console.log('   no #lresizer found');
  await sleep(400);

  setStep('notifications-inbox');
  await page.click('#notifBell');
  await sleep(800);
  await page.keyboard.press('Escape'); await sleep(300);

  setStep('settings-modal-panes');
  for (const pane of ['general', 'appearance', 'notifications', 'sounds', 'connections']) {
    await page.evaluate((p) => openSettings(p), pane);
    await sleep(700);
  }
  await page.keyboard.press('Escape'); await sleep(200);
  await page.evaluate(() => { const w = document.getElementById('settingsWrap'); if (w) w.classList.remove('show'); });
  await sleep(300);

  setStep('command-palette');
  await page.keyboard.down('Meta'); await page.keyboard.press('k'); await page.keyboard.up('Meta');
  await sleep(500);
  const palOpen = await page.evaluate(() => { const el = document.querySelector('#pal, .pal, #palWrap, .pal-wrap'); return !!(el && el.offsetParent !== null); });
  if (!palOpen) await page.evaluate(() => typeof openPal === 'function' && openPal());
  await sleep(500);
  await page.keyboard.type('dec'); await sleep(500);
  await page.keyboard.press('Escape'); await sleep(300);

  setStep('file-explorer');
  await page.evaluate(() => openExpl(''));
  await sleep(1200);

  setStep('doc-window-open-md');
  await page.evaluate(() => smartOpen('decisions.md'));
  await sleep(1500);

  setStep('dashboard');
  await page.evaluate(() => showDashboard());
  await sleep(1000);

  await page.close();

  // ===== mobile (390x844), both themes =====
  for (const theme of ['dark', 'light']) {
    const mp = await browser.newPage();
    await mp.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    const setM = attach(mp, log);
    setM('mobile-load-' + theme);
    await mp.goto(BASE + '/?theme=' + theme, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1500);
    setM('mobile-drawer-' + theme);
    const mbtn = await mp.$('.mbtn');
    if (mbtn) { await mbtn.click(); } else { await mp.evaluate(() => mob('left')); log.push({ step: 'mobile-drawer-' + theme, kind: 'note', text: 'no .mbtn visible, called mob() directly' }); }
    await sleep(800);
    const drawerOpen = await mp.evaluate(() => { const L = document.querySelector('.col.left'); return !!(L && L.classList.contains('show')); });
    console.log('   [' + theme + '] drawer open: ' + drawerOpen);
    await mp.close();
  }

  await browser.close();
  fs.writeFileSync(__dirname + '/errsweep-interact-results.json', JSON.stringify(log, null, 2));
  console.log('\n==== collected issues: ' + log.length + ' ====');
  for (const l of log) console.log(`[${l.step}] ${l.kind}: ${l.text}`);
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
