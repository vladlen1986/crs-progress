// f3b-mic-picker.js — F3 amendment: mic device popover, default preselect,
// persistence, engine routing, no-key fallback toast, recorder wiring → /api/transcribe.
// Uses Chrome fake media devices; real Gemini transcription needs a real key (not tested here).
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream', '--window-size=1360,900'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 900 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 300)));
  await page.evaluateOnNewDocument(() => { try { localStorage.removeItem('crs-dict-device'); localStorage.setItem('crs-dict-lang', 'en-US'); } catch {} });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(800);
  const out = {};

  // 1. first idle click (no remembered device) → popover opens, lists fake devices
  await page.evaluate(() => document.getElementById('micBtn').click());
  await sleep(1200);
  out.popover = await page.evaluate(() => {
    const m = document.getElementById('micMenu');
    return {
      open: !!m && m.style.display === 'block',
      devices: [...(m ? m.querySelectorAll('button[data-dev] .mm-lbl') : [])].map((e) => e.textContent),
      selected: [...(m ? m.querySelectorAll('button[data-dev]') : [])].map((b) => b.classList.contains('on')),
      langs: [...(m ? m.querySelectorAll('.mm-langs button') : [])].map((b) => b.textContent + (b.classList.contains('on') ? '*' : '')),
      startLabel: (m && m.querySelector('button[data-act=start]') || {}).textContent,
      persisted: localStorage.getItem('crs-dict-device'),
      dictNotStarted: !DICT.on,
    };
  });

  // 2. default-preselect logic (unit): regex branch + fallback branch
  out.pickDefault = await page.evaluate(() => ({
    regexBranch: dictPickDefault([
      { deviceId: 'default', label: 'Default - USB Studio Mic' },
      { deviceId: 'x1', label: 'MacBook Pro Microphone (Built-in)' },
      { deviceId: 'x2', label: 'USB Studio Mic' }]).deviceId,          // expect x1
    fallbackBranch: dictPickDefault([
      { deviceId: 'default', label: 'Fake Default Audio Input' },
      { deviceId: 'y2', label: 'Fake Audio Input 2' }]).deviceId,      // expect 'default'
    emptyList: dictPickDefault([]),                                     // expect null
  }));

  // 3. engine routing decision (unit, mocked default/non-default)
  out.routing = await page.evaluate(() => ({
    defaultId: dictEngine({ deviceId: 'default', label: 'Default - X' }, []),                              // webspeech
    nullDevice: dictEngine(null, []),                                                                       // webspeech
    sameAsDefaultByLabel: dictEngine({ deviceId: 'a1', label: 'MacBook Pro Microphone' },
      [{ deviceId: 'default', label: 'Default - MacBook Pro Microphone' }]),                                // webspeech
    trulyNonDefault: dictEngine({ deviceId: 'b2', label: 'USB Studio Mic' },
      [{ deviceId: 'default', label: 'Default - MacBook Pro Microphone' }]),                                // recorder
  }));

  // 4. pick a NON-default fake device in the popover → persisted + badge dot + note when no key
  out.pickNonDefault = await page.evaluate(async () => {
    const m = document.getElementById('micMenu');
    const btns = [...m.querySelectorAll('button[data-dev]')];
    const idx = btns.findIndex((b) => !b.querySelector('.mm-lbl').textContent.toLowerCase().includes('default'));
    if (idx < 0) return { error: 'no non-default fake device' };
    btns[idx].click();
    await new Promise((r) => setTimeout(r, 400));
    const saved = JSON.parse(localStorage.getItem('crs-dict-device') || 'null');
    return {
      persisted: saved,
      badgeDot: !!document.querySelector('#micBtn .devdot'),
      keyNoteShown: !!(SETTINGS && SETTINGS.googleAiKeySet) ? 'n/a-key-set' : /Google AI/.test(document.getElementById('micMenu').textContent),
    };
  });

  // 5. no-key fallback: start with non-default device + no key → toast + webspeech engine
  out.noKeyFallback = await page.evaluate(async () => {
    const toasts = [];
    const realToast = window.toast; window.toast = (t) => toasts.push(String(t));
    window.SpeechRecognition = class { constructor() { window.__sr = this; } start() { this.started = true; } stop() { const s = this; setTimeout(() => s.onend && s.onend(), 0); } };
    SETTINGS.googleAiKeySet = false;
    document.getElementById('micMenu').querySelector('button[data-act=start]').click();
    await new Promise((r) => setTimeout(r, 300));
    const r = { toasts, engine: DICT.engine, on: DICT.on, srStarted: !!(window.__sr && window.__sr.started), srLang: window.__sr && window.__sr.lang };
    stopDictation();
    window.toast = realToast;
    return r;
  });

  // 6. recorder wiring: with a "key set" client-side, non-default device records via
  //    MediaRecorder (fake stream) and stop posts to /api/transcribe (server has no
  //    key → 501 surfaces in ghost strip — proves the honest error path end-to-end)
  out.recorder = await page.evaluate(async () => {
    delete window.SpeechRecognition;   // force real routing decision, no accidental SR
    SETTINGS.googleAiKeySet = true;
    const posts = [];
    const realFetch = window.fetch;
    window.fetch = (u, o) => { if (String(u).includes('/api/transcribe')) posts.push(JSON.parse(o.body)); return realFetch(u, o); };
    await startDictation();
    const started = { on: DICT.on, engine: DICT.engine, recClass: document.getElementById('micBtn').classList.contains('rec'),
      recorderState: DICT.recorder && DICT.recorder.state, ghost: document.getElementById('dictGhost').textContent };
    await new Promise((r) => setTimeout(r, 1500));   // capture ~1.5s of fake audio
    stopDictation();
    await new Promise((r) => setTimeout(r, 2500));   // ondataavailable → onstop → POST
    const g = document.getElementById('dictGhost').textContent;
    window.fetch = realFetch;
    return { started, postCount: posts.length, postShape: posts[0] ? { hasAudio: !!posts[0].audio && posts[0].audio.length > 100, mime: posts[0].mime, lang: posts[0].lang } : null, ghostAfter: g };
  });

  // 7. language row: click RU in popover → persists
  out.langRow = await page.evaluate(async () => {
    micMenuAt();
    await new Promise((r) => setTimeout(r, 600));
    const m = document.getElementById('micMenu');
    [...m.querySelectorAll('.mm-langs button')].find((b) => b.textContent === 'RU').click();
    await new Promise((r) => setTimeout(r, 400));
    return { persisted: localStorage.getItem('crs-dict-lang'), titleTag: /RU/.test(document.getElementById('micBtn').title),
      ruOn: [...document.getElementById('micMenu').querySelectorAll('.mm-langs button')].find((b) => b.textContent === 'RU').classList.contains('on') };
  });

  // 8. persistence across reload: device + short-click starts without popover
  await page.reload({ waitUntil: 'networkidle0' });
  await sleep(800);
  out.reload = await page.evaluate(async () => {
    const dev = JSON.parse(localStorage.getItem('crs-dict-device') || 'null');
    window.SpeechRecognition = class { constructor() { window.__sr2 = this; } start() { this.started = true; } stop() {} };
    SETTINGS.googleAiKeySet = false;
    document.getElementById('micBtn').click();
    await new Promise((r) => setTimeout(r, 500));
    const popoverOpened = !!(document.getElementById('micMenu') && document.getElementById('micMenu').style.display === 'block');
    const r = { device: dev, lang: localStorage.getItem('crs-dict-lang'), badgeDot: !!document.querySelector('#micBtn .devdot'), popoverOpened, dictOn: DICT.on, engine: DICT.engine };
    stopDictation();
    return r;
  });

  out.consoleErrors = errors.filter((e) => !/501|Failed to load resource/.test(e));
  out.expected501Logs = errors.filter((e) => /501|Failed to load resource/.test(e)).length;
  fs.writeFileSync(__dirname + '/f3b-mic-picker-results.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
