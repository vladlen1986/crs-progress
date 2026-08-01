// av-w3-dictation.js — ADVERSARIAL verify of W3 (voice dictation).
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = { checks: [] };
const ck = (name, pass, evidence) => { R.checks.push({ name, pass: !!pass, evidence }); console.log((pass ? 'PASS' : 'FAIL') + '  ' + name + '  ' + (evidence || '')); };

const SR_MOCK = `
  window.__sr = { instances: [] };
  window.SpeechRecognition = window.webkitSpeechRecognition = class {
    constructor(){ this.startCalls = 0; window.__sr.instances.push(this); }
    start(){ this.startCalls++; }
    stop(){ const self=this; setTimeout(()=>{ if(self.onend) self.onend(); },0); }
    abort(){ }
  };`;

(async () => {
  // ---- server: /api/transcribe with no key must be a clean 501-style JSON, not a crash ----
  const tr = await fetch(BASE + '/api/transcribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ audio: Buffer.from('hi').toString('base64'), mime: 'audio/webm', lang: 'en' }) });
  const trBody = await tr.json().catch(() => null);
  const alive = (await fetch(BASE + '/api/settings')).ok;
  ck('POST /api/transcribe no key → 501 JSON, server alive', tr.status === 501 && trBody && /Google AI key/i.test(trBody.error || '') && alive, 'status=' + tr.status + ' body=' + JSON.stringify(trBody));

  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--window-size=1360,900', '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'],
  });

  // ================= page A: REAL SpeechRecognition + fake devices → popover =================
  const pa = await browser.newPage();
  await pa.setViewport({ width: 1360, height: 900 });
  await pa.evaluateOnNewDocument(() => { localStorage.removeItem('crs-dict-device'); localStorage.removeItem('crs-dict-lang'); });
  await pa.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await pa.evaluate(() => newChat());
  await sleep(600);
  const btnA = await pa.evaluate(() => {
    const b = document.getElementById('micBtn');
    const r = b.getBoundingClientRect();
    return { display: getComputedStyle(b).display, w: r.width, h: r.height };
  });
  ck('mic button visible, 34px', btnA.display !== 'none' && Math.round(btnA.w) === 34 && Math.round(btnA.h) === 34, JSON.stringify(btnA));
  // first click with no remembered device → popover (not recording)
  await pa.click('#micBtn');
  await sleep(1500);
  const pop = await pa.evaluate(() => {
    const m = document.getElementById('micMenu');
    if (!m || m.style.display === 'none') return { open: false };
    const devBtns = [...m.querySelectorAll('button[data-dev]')].map((b) => ({ label: b.textContent.trim(), on: b.classList.contains('on') }));
    const langBtns = [...m.querySelectorAll('button[data-lang]')].map((b) => b.dataset.lang);
    return { open: true, devBtns, langBtns, hasStart: !!m.querySelector('button[data-act="start"]'), dictOn: DICT.on, picked: DICT.device };
  });
  ck('first click → popover with audioinput devices (fake stream flags)', pop.open && pop.devBtns.length >= 1 && !pop.dictOn, JSON.stringify(pop.devBtns));
  ck('popover language row en/ru/ka + Start action', pop.open && JSON.stringify(pop.langBtns) === '["en-US","ru-RU","ka-GE"]' && pop.hasStart, JSON.stringify(pop.langBtns));
  ck('preselect fallback picked a device (no MacBook label in fakes → default/first)', !!(pop.picked && pop.picked.deviceId) && pop.devBtns.some((d) => d.on), JSON.stringify(pop.picked));
  await pa.screenshot({ path: __dirname + '/av-w3-popover-dark.png' });

  // preselect regex unit: MacBook/built-in beats default beats first
  const pick = await pa.evaluate(() => {
    const a = dictPickDefault([{ deviceId: 'x1', label: 'USB Interface' }, { deviceId: 'x2', label: 'MacBook Pro Microphone' }, { deviceId: 'default', label: 'Default - USB Interface' }]);
    const b = dictPickDefault([{ deviceId: 'x1', label: 'USB Interface' }, { deviceId: 'x2', label: 'Built-in Microphone' }]);
    const c = dictPickDefault([{ deviceId: 'x1', label: 'USB A' }, { deviceId: 'default', label: 'Default - USB A' }]);
    const d = dictPickDefault([{ deviceId: 'x9', label: 'Some Mic' }]);
    const e = dictPickDefault([]);
    return { a: a.deviceId, b: b.deviceId, c: c.deviceId, d: d.deviceId, e };
  });
  ck('dictPickDefault: macbook-regex → built-in → default → first → null', pick.a === 'x2' && pick.b === 'x2' && pick.c === 'default' && pick.d === 'x9' && pick.e === null, JSON.stringify(pick));

  // language persistence via the popover
  await pa.evaluate(() => { const m = document.getElementById('micMenu'); m.querySelector('button[data-lang="ka-GE"]').click(); });
  await sleep(800);
  const lang1 = await pa.evaluate(() => ({ ls: localStorage.getItem('crs-dict-lang'), mem: DICT.lang, tag: document.getElementById('micBtn').title }));
  ck('language click persists crs-dict-lang=ka-GE + KA in title', lang1.ls === 'ka-GE' && lang1.mem === 'ka-GE' && /KA/.test(lang1.tag), JSON.stringify(lang1));
  await pa.reload({ waitUntil: 'networkidle2' });
  await sleep(1500);
  const lang2 = await pa.evaluate(() => DICT.lang);
  ck('crs-dict-lang survives reload', lang2 === 'ka-GE', 'DICT.lang=' + lang2);
  await pa.close();

  // ================= page B: MOCKED SR — ghost strip, append, restart cap =================
  const pb = await browser.newPage();
  await pb.setViewport({ width: 1360, height: 900 });
  await pb.evaluateOnNewDocument(SR_MOCK);
  await pb.evaluateOnNewDocument(() => { localStorage.setItem('crs-dict-lang', 'en-US'); localStorage.setItem('crs-dict-device', JSON.stringify({ deviceId: 'default', label: 'Fake Default' })); });
  await pb.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await pb.evaluate(() => newChat());
  await sleep(600);
  await pb.evaluate(() => { window.__inputEvents = 0; document.getElementById('input').addEventListener('input', () => window.__inputEvents++); });
  // engine routing units
  const eng = await pb.evaluate(() => ({
    def: dictEngine({ deviceId: 'default', label: 'Default - X' }, []),
    none: dictEngine(null, []),
    labelMatch: dictEngine({ deviceId: 'z9', label: 'MacBook Pro Microphone' }, [{ deviceId: 'default', label: 'Default - MacBook Pro Microphone' }]),
    nonDefault: dictEngine({ deviceId: 'z9', label: 'External USB' }, [{ deviceId: 'default', label: 'Default - MacBook Pro Microphone' }]),
  }));
  ck('engine routing: default→webspeech, label-match→webspeech, other→recorder', eng.def === 'webspeech' && eng.none === 'webspeech' && eng.labelMatch === 'webspeech' && eng.nonDefault === 'recorder', JSON.stringify(eng));

  // start via mic button (device remembered → starts immediately)
  await pb.click('#micBtn');
  await sleep(500);
  let st = await pb.evaluate(() => ({ on: DICT.on, engine: DICT.engine, n: window.__sr.instances.length, started: window.__sr.instances[0] && window.__sr.instances[0].startCalls, cont: window.__sr.instances[0] && window.__sr.instances[0].continuous, interim: window.__sr.instances[0] && window.__sr.instances[0].interimResults, lang: window.__sr.instances[0] && window.__sr.instances[0].lang, rec: document.getElementById('micBtn').classList.contains('rec') }));
  ck('remembered device: click starts webspeech (continuous+interim, lang, .rec pulse)', st.on && st.engine === 'webspeech' && st.n === 1 && st.started === 1 && st.cont === true && st.interim === true && st.lang === 'en-US' && st.rec, JSON.stringify(st));

  // interim → ghost strip
  const ghost = await pb.evaluate(() => {
    const r = window.__sr.instances[0];
    const res = [{ transcript: 'adversarial ghost check' }]; res.isFinal = false;
    r.onresult({ resultIndex: 0, results: [res] });
    const g = document.getElementById('dictGhost');
    return { text: g.textContent, shown: g.classList.contains('show') };
  });
  ck('interim result → ghost strip shows text', ghost.text === 'adversarial ghost check' && ghost.shown, JSON.stringify(ghost));
  await pb.screenshot({ path: __dirname + '/av-w3-ghost-dark.png' });

  // final → append into #input + input event, ghost cleared
  const fin = await pb.evaluate(() => {
    const inp = document.getElementById('input'); inp.value = 'prefix';
    const r = window.__sr.instances[0];
    const res = [{ transcript: 'final words.' }]; res.isFinal = true;
    r.onresult({ resultIndex: 0, results: [res] });
    const g = document.getElementById('dictGhost');
    return { val: inp.value, events: window.__inputEvents, ghost: g.textContent, shown: g.classList.contains('show') };
  });
  ck('final result → appended to #input with space + input event, ghost cleared', fin.val === 'prefix final words.' && fin.events >= 1 && fin.ghost === '' && !fin.shown, JSON.stringify(fin));
  await pb.evaluate(() => { document.getElementById('input').value = ''; });

  // restart cap: transient onend restarts ≤3 times, then gives up
  const cap = await pb.evaluate(async () => {
    const r = window.__sr.instances[0];
    const out = [];
    for (let i = 0; i < 5; i++) { r.onend(); out.push({ started: r.startCalls, on: DICT.on, restarts: DICT.restarts }); }
    return out;
  });
  const capOk = cap[0].started === 2 && cap[1].started === 3 && cap[2].started === 4 && cap[3].started === 4 && cap[3].on === false && cap[4].started === 4;
  ck('transient onend: exactly 3 restarts then stop (start calls 1+3, DICT.on false)', capOk, JSON.stringify(cap));

  // not-allowed: no restart at all
  await pb.evaluate(() => toggleDictation());
  await sleep(300);
  const na = await pb.evaluate(() => {
    const r = window.__sr.instances[window.__sr.instances.length - 1];
    r.onerror({ error: 'not-allowed' });
    r.onend();
    return { started: r.startCalls, on: DICT.on, rec: document.getElementById('micBtn').classList.contains('rec') };
  });
  ck('not-allowed error → zero restarts, dictation off', na.started === 1 && na.on === false && na.rec === false, JSON.stringify(na));

  // non-default device + no key → fallback toast + webspeech
  const fb = await pb.evaluate(async () => {
    window.__toasts = [];
    const t0 = window.toast; window.toast = (m) => { window.__toasts.push(String(m)); t0 && t0(m); };
    DICT.devices = [{ deviceId: 'default', label: 'Default - Fake' }, { deviceId: 'usb77', label: 'External USB Mic' }];
    dictSaveDevice({ deviceId: 'usb77', label: 'External USB Mic' });
    const before = window.__sr.instances.length;
    await startDictation();
    const inst = window.__sr.instances.length;
    const r = { toasts: window.__toasts.slice(), engine: DICT.engine, on: DICT.on, newInstance: inst > before, keySet: !!(SETTINGS && SETTINGS.googleAiKeySet) };
    stopDictation(); window.toast = t0; dictSaveDevice({ deviceId: 'default', label: 'Fake Default' });
    return r;
  });
  ck('non-default mic + no key → honest toast + webspeech fallback', fb.keySet === false && fb.toasts.some((t) => /Google AI key/i.test(t)) && fb.engine === 'webspeech' && fb.on && fb.newInstance, JSON.stringify(fb));
  await pb.close();

  // ================= page C: SR shimmed away → button hidden =================
  const pc = await browser.newPage();
  await pc.evaluateOnNewDocument(() => {
    Object.defineProperty(window, 'SpeechRecognition', { value: undefined, configurable: false, writable: false });
    Object.defineProperty(window, 'webkitSpeechRecognition', { value: undefined, configurable: false, writable: false });
  });
  await pc.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(1500);
  const hid = await pc.evaluate(() => getComputedStyle(document.getElementById('micBtn')).display);
  ck('SpeechRecognition absent → mic button stays hidden', hid === 'none', 'display=' + hid);
  await pc.close();

  // ================= 481px viewport: single-line composer =================
  const pd = await browser.newPage();
  await pd.setViewport({ width: 481, height: 800 });
  for (const theme of ['dark', 'light']) {
    await pd.goto(BASE + '/?theme=' + theme, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1800);
    await pd.evaluate(() => { if (typeof newChat === 'function') newChat(); });
    await sleep(600);
    const comp = await pd.evaluate(() => {
      const inp = document.getElementById('input');
      const mic = document.getElementById('micBtn');
      const send = document.getElementById('sendBtn') || document.querySelector('.send-btn,[onclick*="sendMsg"],button[title*="Send"]');
      const ir = inp.getBoundingClientRect();
      const lineH = parseFloat(getComputedStyle(inp).lineHeight) || 20;
      const pads = parseFloat(getComputedStyle(inp).paddingTop) + parseFloat(getComputedStyle(inp).paddingBottom);
      const doc = document.documentElement;
      return { inputH: ir.height, lineH, pads, singleLine: ir.height <= lineH + pads + 6,
        micVisible: mic && getComputedStyle(mic).display !== 'none', micX: mic && mic.getBoundingClientRect().x,
        sendFound: !!send, hOverflow: doc.scrollWidth > doc.clientWidth,
        rowY: [mic && Math.round(mic.getBoundingClientRect().top), send && Math.round(send.getBoundingClientRect().top), Math.round(ir.top)] };
    });
    ck(theme + ' @481px: single-line composer, mic visible, no horizontal overflow', comp.singleLine && comp.micVisible && !comp.hOverflow, JSON.stringify(comp));
    await pd.screenshot({ path: __dirname + '/av-w3-481-' + theme + '.png' });
  }
  await pd.close();

  await browser.close();
  fs.writeFileSync(__dirname + '/av-w3-results.json', JSON.stringify(R, null, 2));
  const fails = R.checks.filter((c) => !c.pass).length;
  console.log('\nW3: ' + (R.checks.length - fails) + '/' + R.checks.length + ' pass');
  process.exit(fails ? 2 : 0);
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
