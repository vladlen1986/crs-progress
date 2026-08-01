// f3-dictation.js — unit/DOM-level verification of voice dictation with a mocked
// SpeechRecognition (real speech can't run headless): construction flags, interim
// ghost strip, final append + input event, auto-restart cap, language cycling,
// hidden-when-unsupported, and 390px no-wrap.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream', '--window-size=1360,900'] });
  const out = {};
  const errors = [];

  // ---- page A: mocked SpeechRecognition ----
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 900 });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 300)));
  await page.evaluateOnNewDocument(() => {
    window.__SR = { instances: [], avail: [], install: [] };
    window.SpeechRecognition = class {
      constructor() { window.__SR.instances.push(this); this.startCalls = 0; }
      start() { this.startCalls++; this.running = true; }
      stop() { this.running = false; const s = this; setTimeout(() => s.onend && s.onend(), 0); }
    };
    window.SpeechRecognition.available = (o) => { window.__SR.avail.push(o); return Promise.resolve('downloadable'); };
    window.SpeechRecognition.install = (o) => { window.__SR.install.push(o); return Promise.resolve(true); };
    // amendment: first-ever click opens the device popover; seed a remembered
    // default device so short-click goes straight to the Web Speech path.
    try { localStorage.setItem('crs-dict-lang', 'en-US'); localStorage.setItem('crs-dict-device', JSON.stringify({ deviceId: 'default', label: 'Fake Default Audio Input' })); } catch {}
  });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(800);

  out.buttonVisible = await page.evaluate(() => {
    const b = document.getElementById('micBtn');
    return b && getComputedStyle(b).display !== 'none';
  });
  out.probeInstall = await page.evaluate(() => ({
    availCalls: window.__SR.avail, installCalls: window.__SR.install,
  }));

  // start dictation → rec state + constructor flags
  await page.evaluate(() => document.getElementById('micBtn').click());
  await sleep(1200);
  out.started = await page.evaluate(() => {
    const i = window.__SR.instances[window.__SR.instances.length - 1];
    return {
      recClass: document.getElementById('micBtn').classList.contains('rec'),
      lang: i.lang, continuous: i.continuous, interimResults: i.interimResults, startCalls: i.startCalls,
      title: document.getElementById('micBtn').title,
    };
  });

  // interim → ghost strip; final → #input + input event
  out.results = await page.evaluate(() => {
    const i = window.__SR.instances[window.__SR.instances.length - 1];
    const inp = document.getElementById('input');
    inp.value = 'existing text';
    let inputEvents = 0;
    inp.addEventListener('input', () => inputEvents++);
    const ev = (items) => ({ resultIndex: 0, results: items.map(([t, fin]) => { const r = [{ transcript: t }]; r.isFinal = fin; return r; }) });
    i.onresult(ev([['hello wor', false]]));
    const ghost = document.getElementById('dictGhost');
    const interimShown = ghost.classList.contains('show') && ghost.textContent === 'hello wor';
    i.onresult(ev([['hello world', true]]));
    const ghostCleared = !ghost.classList.contains('show') || ghost.textContent === '';
    return { interimShown, ghostCleared, inputValue: inp.value, inputEvents };
  });

  // auto-restart on transient errors, capped at 3, then clean stop
  out.restart = await page.evaluate(async () => {
    const i = window.__SR.instances[window.__SR.instances.length - 1];
    const counts = [];
    for (let k = 0; k < 4; k++) {
      i.onerror({ error: k % 2 ? 'no-speech' : 'network' });
      i.onend();
      await new Promise((r) => setTimeout(r, 20));
      counts.push(i.startCalls);
    }
    return {
      startCallsSeq: counts,                                        // expect [2,3,4,4] — 3 restarts then stop
      recCleared: !document.getElementById('micBtn').classList.contains('rec'),
    };
  });

  // fatal error (not-allowed) → immediate clean stop, no restart
  out.fatal = await page.evaluate(async () => {
    document.getElementById('micBtn').click();
    await new Promise((r) => setTimeout(r, 50));
    const i = window.__SR.instances[window.__SR.instances.length - 1];
    i.onerror({ error: 'not-allowed' });
    i.onend();
    await new Promise((r) => setTimeout(r, 50));
    return { startCalls: i.startCalls, recCleared: !document.getElementById('micBtn').classList.contains('rec') };
  });

  // contextmenu cycles language + persists + next session uses it
  out.langCycle = await page.evaluate(async () => {
    const b = document.getElementById('micBtn');
    const seq = [];
    for (let k = 0; k < 3; k++) {
      b.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }));
      seq.push(localStorage.getItem('crs-dict-lang'));
    }
    // now at en-US again after 3 cycles from en-US? en→ru→ka→en
    b.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }));   // → ru-RU
    b.click();
    await new Promise((r) => setTimeout(r, 50));
    const i = window.__SR.instances[window.__SR.instances.length - 1];
    const r = { cycleSeq: seq, persisted: localStorage.getItem('crs-dict-lang'), sessionLang: i.lang, title: b.title };
    b.click();   // stop
    return r;
  });
  out.consoleErrorsMockPage = errors.slice();
  await page.close();

  // ---- page B: no SpeechRecognition at all → button hidden ----
  const pb = await browser.newPage();
  await pb.evaluateOnNewDocument(() => {
    Object.defineProperty(window, 'SpeechRecognition', { value: undefined, configurable: true });
    Object.defineProperty(window, 'webkitSpeechRecognition', { value: undefined, configurable: true });
  });
  await pb.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 30000 });
  out.hiddenWhenUnsupported = await pb.evaluate(() => {
    const b = document.getElementById('micBtn');
    return b && getComputedStyle(b).display === 'none';
  });
  await pb.close();

  // ---- page C: mobile 390px — composer row must not wrap ----
  const pc = await browser.newPage();
  await pc.setViewport({ width: 390, height: 844 });
  await pc.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(600);
  out.mobile390 = await pc.evaluate(() => {
    const row = document.querySelector('.composer-row');
    const kids = [...row.children].filter((c) => getComputedStyle(c).display !== 'none' && c.getBoundingClientRect().width > 0);
    const tops = kids.map((c) => Math.round(c.getBoundingClientRect().top));
    const mic = document.getElementById('micBtn').getBoundingClientRect();
    return {
      rowHeight: Math.round(row.getBoundingClientRect().height),
      singleLine: new Set(tops).size === 1,
      micSize: { w: Math.round(mic.width), h: Math.round(mic.height) },
      micVisible: getComputedStyle(document.getElementById('micBtn')).display !== 'none',
      rowRight: Math.round(row.getBoundingClientRect().right), viewport: 390,
    };
  });
  await pc.screenshot({ path: __dirname + '/f3-mobile-390.png' });
  await pc.close();

  fs.writeFileSync(__dirname + '/f3-dictation-results.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
