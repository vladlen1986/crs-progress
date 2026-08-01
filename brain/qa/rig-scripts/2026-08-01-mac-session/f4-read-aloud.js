// f4-read-aloud.js — Read aloud button on a real saved reply: shared Audio gets a
// src + plays (headless audio is silent but events fire), stop toggle works, a
// second read supersedes the first, and a forced 502 falls back to speechSynthesis.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CHAT = '9e881692-df40-440c-be2a-d04999411b3c';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--window-size=1360,900'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 900 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 300)));
  await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate((id) => openChat(id), CHAT);
  await sleep(2000);

  const out = {};
  out.buttons = await page.evaluate(() => document.querySelectorAll('.act-tts').length);

  // 1. click Read aloud on the last saved reply → fetch + shared Audio plays
  out.play = await page.evaluate(async () => {
    const btns = [...document.querySelectorAll('.act-tts')];
    const btn = btns[btns.length - 1];
    const events = [];
    btn.click();
    const loadingLabel = btn.textContent.trim();
    // wait up to 15s for playback to start
    for (let i = 0; i < 150 && !(TTS.audio && !TTS.audio.paused); i++) await new Promise((r) => setTimeout(r, 100));
    const a = TTS.audio;
    if (a) { a.addEventListener('play', () => events.push('play')); }
    return {
      loadingLabel,
      hasSrc: !!(a && a.src && a.src.startsWith('blob:')),
      readyState: a ? a.readyState : -1,
      playing: !!(a && !a.paused),
      btnLabel: btn.textContent.trim(),
      ariaPressed: btn.getAttribute('aria-pressed'),
      clusterVisible: getComputedStyle(btn.closest('.turn-acts')).opacity === '1',
    };
  });

  // 2. starting a second read stops the first — needs a chat with ≥2 replies
  await page.evaluate(() => stopReadAloud());
  const chats = await page.evaluate(() => fetch('/api/chats').then((r) => r.json()).then((j) => (j.chats || j).map((c) => c.id)));
  for (const id of chats) {
    await page.evaluate((cid) => openChat(cid), id);
    await sleep(1200);
    if (await page.evaluate(() => document.querySelectorAll('.act-tts').length) >= 2) break;
  }
  out.supersedeChatButtons = await page.evaluate(() => document.querySelectorAll('.act-tts').length);
  out.supersede = await page.evaluate(async () => {
    const btns = [...document.querySelectorAll('.act-tts')];
    const first = btns[btns.length - 1], second = btns[btns.length - 2];
    first.click();
    for (let i = 0; i < 150 && !(TTS.audio && !TTS.audio.paused); i++) await new Promise((r) => setTimeout(r, 100));
    second.click();
    await new Promise((r) => setTimeout(r, 100));
    const firstResetImmediately = first.getAttribute('aria-pressed') === 'false' && /Read aloud/.test(first.textContent);
    for (let i = 0; i < 150 && !(TTS.audio && !TTS.audio.paused); i++) await new Promise((r) => setTimeout(r, 100));
    return {
      firstResetImmediately,
      secondPlaying: !!(TTS.audio && !TTS.audio.paused),
      secondPressed: second.getAttribute('aria-pressed'),
    };
  });

  // 3. stop toggle
  out.stop = await page.evaluate(async () => {
    const btns = [...document.querySelectorAll('.act-tts')];
    const second = btns[btns.length - 2];
    second.click();   // acting stop control
    await new Promise((r) => setTimeout(r, 100));
    return {
      audioPaused: !TTS.audio || TTS.audio.paused,
      label: second.textContent.trim(),
      ariaPressed: second.getAttribute('aria-pressed'),
      urlReleased: TTS.url === null,
    };
  });

  // 4. forced 502 → speechSynthesis fallback (shimmed)
  out.fallback = await page.evaluate(async () => {
    const realFetch = window.fetch;
    window.fetch = (u, o) => String(u).includes('/api/tts')
      ? Promise.resolve(new Response(JSON.stringify({ error: 'tts failed: forced' }), { status: 502 }))
      : realFetch(u, o);
    const spoken = [];
    const realSpeak = speechSynthesis.speak.bind(speechSynthesis);
    speechSynthesis.speak = (u) => { spoken.push({ text: u.text.slice(0, 60), lang: u.lang }); };
    const btn = [...document.querySelectorAll('.act-tts')].pop();
    btn.click();
    await new Promise((r) => setTimeout(r, 600));
    const r = { spokenCount: spoken.length, spoken: spoken[0] || null, btnPressed: btn.getAttribute('aria-pressed'), btnLabel: btn.textContent.trim() };
    btn.click();   // stop fallback state
    window.fetch = realFetch; speechSynthesis.speak = realSpeak;
    return r;
  });

  // 5. speechText stripping sanity on a synthetic markdown blob
  out.strip = await page.evaluate(() => {
    const md = '# Head\n\nSome **bold** and *ital* text with `inline()` code and [a link](http://x.y).\n\n```js\nconst x=1;\n```\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n> quote line\n\n- item one\n1. item two\n\n---\n';
    return speechText(md);
  });
  out.langDetect = await page.evaluate(() => [speechLang('Hello world'), speechLang('Привет мир'), speechLang('გამარჯობა მსოფლიო')]);

  out.consoleErrors = errors;
  fs.writeFileSync(__dirname + '/f4-read-aloud-results.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
