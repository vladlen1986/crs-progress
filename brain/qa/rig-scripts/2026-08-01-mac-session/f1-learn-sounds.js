// f1-learn-sounds.js — verify s25/s26 render+save, settings visibility, and the
// showLearnToast chime hook (gated by sounds.learnSounds + DND).
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--window-size=1360,900'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 900 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 300)));
  await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(2500); // let ensureSoundFiles render any missing WAVs

  const out = {};
  // 1. server has both WAVs
  const list = await page.evaluate(() => fetch('/api/sounds/list').then((r) => r.json()));
  out.wavList = {
    s25: list.files.includes('s25-spark-shimmer.wav'),
    s26: list.files.includes('s26-mind-bloom.wav'),
    total: list.files.length, totalBytes: list.totalBytes,
  };

  // 2. settings library + per-type dropdowns
  await page.evaluate(() => { openSettings('sounds'); });
  await sleep(300);
  out.libraryRows = await page.evaluate(() => {
    const t = document.getElementById('settingsBox').innerText;
    return { spark: t.includes('Spark shimmer'), bloom: t.includes('Mind bloom'), toggle: t.includes('Learning sounds'), lib26: t.includes('Library — all 26') };
  });
  await page.evaluate(() => { setSettingsTab('notifications'); });
  await sleep(300);
  out.dropdowns = await page.evaluate(() => {
    const sels = [...document.querySelectorAll('#settingsBox .mrow.ntype select')];
    return {
      count: sels.length,
      allHaveS25: sels.every((s) => [...s.options].some((o) => o.value === 's25')),
      allHaveS26: sels.every((s) => [...s.options].some((o) => o.value === 's26')),
    };
  });

  // 3. play s25 via library button — no console error
  await page.evaluate(() => { setSettingsTab('sounds'); });
  await sleep(300);
  const errsBefore = errors.length;
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('#settingsBox .mrow')].find((r) => { const b = r.querySelector('.mlbl b'); return b && b.textContent === 'Spark shimmer'; }).querySelector('.mctl button');
    btn.click();
  });
  await sleep(600);
  await page.evaluate(() => SOUNDS.playSound('s26'));
  await sleep(900);
  out.playErrors = errors.slice(errsBefore);
  await page.evaluate(() => closeSettings());

  // 4. instrument SOUNDS.playSound + drive showLearnToast through the gates
  await page.mouse.click(680, 400); // synthetic gesture for autoplay
  out.toastHook = await page.evaluate(async () => {
    const calls = [];
    const orig = SOUNDS.playSound;
    SOUNDS.playSound = (id) => { calls.push(id); return orig.call(SOUNDS, id); };
    const r = {};
    showLearnToast({ kind: 'playbook-applied', title: 'test apply', detail: 'd' });
    showLearnToast({ kind: 'learning-saved', title: 'test learn' });
    r.defaultOn = calls.slice();                       // expect ['s25','s26']
    calls.length = 0;
    showLearnToast({ kind: 'learning-start', title: 'no sound kind' });   // mapped kind without sound
    showLearnToast({ kind: 'recurrence', title: 'no sound kind' });
    r.unmappedKinds = calls.slice();                   // expect []
    let threw = false;
    try { showLearnToast({ kind: 'bogus-kind', title: 'x' }); } catch { threw = true; }
    r.unknownKindThrew = threw;                        // expect false
    SETTINGS.sounds.learnSounds = false;
    showLearnToast({ kind: 'playbook-applied', title: 'muted' });
    r.flagOff = calls.slice();                         // expect []
    SETTINGS.sounds.learnSounds = true;
    SETTINGS.notifyPrefs.dnd = true;
    showLearnToast({ kind: 'learning-saved', title: 'dnd' });
    r.dndOn = calls.slice();                           // expect []
    SETTINGS.notifyPrefs.dnd = false;
    delete SETTINGS.sounds.learnSounds;
    SOUNDS.playSound = orig;
    r.toastCount = document.getElementById('learnToasts').children.length;
    return r;
  });
  await sleep(500);

  // 5. settings persistence round-trip for the flag
  out.persist = await page.evaluate(async () => {
    await saveSettingsPatch({ sounds: { learnSounds: false } });
    const a = (await (await fetch('/api/settings')).json()).sounds.learnSounds;
    await saveSettingsPatch({ sounds: { learnSounds: true } });
    const b = (await (await fetch('/api/settings')).json()).sounds.learnSounds;
    return { afterFalse: a, afterTrue: b };
  });

  out.consoleErrors = errors;
  fs.writeFileSync(__dirname + '/f1-learn-sounds-results.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
