// av-w4-readaloud.js — ADVERSARIAL verify of W4 (read aloud / Edge TTS + cache + fallback).
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CACHE_DIR = '/Users/vlad/projects/crs-progress/crs-brain/data/tts-cache';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = { checks: [], createdCache: [] };
const ck = (name, pass, evidence) => { R.checks.push({ name, pass: !!pass, evidence }); console.log((pass ? 'PASS' : 'FAIL') + '  ' + name + '  ' + (evidence || '')); };
const lsCache = () => { try { return fs.readdirSync(CACHE_DIR).filter((f) => f.endsWith('.mp3')); } catch { return []; } };

(async () => {
  const pre = lsCache();
  // ---- API: en miss → hit byte-identical ----
  const enText = 'Adversarial verification run ' + Date.now() + '. The quick brown fox jumps over the lazy dog while the casino reporting suite quietly reconciles every gaming day report in the background. This sentence exists only to make the audio comfortably longer than five kilobytes.';
  const t0 = Date.now();
  const r1 = await fetch(BASE + '/api/tts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: enText, lang: 'en' }) });
  const b1 = Buffer.from(await r1.arrayBuffer());
  const ms1 = Date.now() - t0;
  ck('en POST /api/tts → 200 audio/mpeg >5KB (miss)', r1.status === 200 && r1.headers.get('content-type') === 'audio/mpeg' && r1.headers.get('x-tts-cache') === 'miss' && b1.length > 5120, `status=${r1.status} ct=${r1.headers.get('content-type')} cache=${r1.headers.get('x-tts-cache')} bytes=${b1.length} ${ms1}ms`);
  const afterEn = lsCache();
  const newFiles = afterEn.filter((f) => !pre.includes(f));
  R.createdCache.push(...newFiles);
  ck('cache file written to data/tts-cache', newFiles.length === 1, JSON.stringify(newFiles));
  const diskBytes = newFiles[0] ? fs.readFileSync(path.join(CACHE_DIR, newFiles[0])) : Buffer.alloc(0);
  const r2 = await fetch(BASE + '/api/tts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: enText, lang: 'en' }) });
  const b2 = Buffer.from(await r2.arrayBuffer());
  ck('second call → X-TTS-Cache hit + byte-identical (response==response==disk)', r2.headers.get('x-tts-cache') === 'hit' && b1.equals(b2) && diskBytes.equals(b1), `cache=${r2.headers.get('x-tts-cache')} b1==b2=${b1.equals(b2)} disk==b1=${diskBytes.equals(b1)}`);
  // ---- ru + ka ----
  for (const [lang, text] of [['ru', 'Проверка синтеза речи номер ' + Date.now() + '. Это контрольная русская фраза для аудита.'], ['ka', 'ხმის სინთეზის შემოწმება ' + Date.now() + '. ეს ქართული საკონტროლო წინადადებაა.']]) {
    const before = lsCache();
    const r = await fetch(BASE + '/api/tts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, lang }) });
    const b = Buffer.from(await r.arrayBuffer());
    R.createdCache.push(...lsCache().filter((f) => !before.includes(f)));
    ck(lang + ' POST /api/tts → 200 audio/mpeg', r.status === 200 && r.headers.get('content-type') === 'audio/mpeg' && b.length > 1000, `status=${r.status} bytes=${b.length} cache=${r.headers.get('x-tts-cache')}`);
  }
  // ---- gitignore (belt & suspenders — also checked outside) ----
  const { execSync } = require('child_process');
  let ign = '';
  try { ign = execSync('git check-ignore -v crs-brain/data/tts-cache/' + (newFiles[0] || 'x.mp3'), { cwd: '/Users/vlad/projects/crs-progress' }).toString().trim(); } catch {}
  ck('tts-cache mp3 is gitignored', /data\/tts-cache\//.test(ign), ign);

  // ---- browser: real reply buttons ----
  // pick chats: 8799e919 (count to 60, non-bp) has replies; 9e881692 for multi-reply supersede
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1360,900', '--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 900 });
  await page.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  // resolve real ids from /api/chats
  const chats = (await (await fetch(BASE + '/api/chats')).json()).chats;
  const countChat = chats.find((c) => /Count from 1 to 60/.test(c.title || ''));
  const auditChat = chats.find((c) => (c.id || '').startsWith('9e881692'));
  await page.evaluate((id) => openChat(id), (countChat || auditChat).id);
  await sleep(2500);
  const btnInfo = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.act-tts')];
    return { count: btns.length, label: btns[0] && btns[0].textContent.trim(), pressed: btns[0] && btns[0].getAttribute('aria-pressed') };
  });
  ck('Read-aloud button present on saved reply', btnInfo.count >= 1 && /Read aloud/.test(btnInfo.label) && btnInfo.pressed === 'false', JSON.stringify(btnInfo));

  // click → playing
  await page.evaluate(() => { const b = document.querySelector('.act-tts'); b.scrollIntoView({ block: 'center' }); });
  await page.evaluate(() => document.querySelector('.act-tts').click());
  let play = null;
  for (let i = 0; i < 90; i++) {
    await sleep(1000);
    play = await page.evaluate(() => {
      const b = document.querySelector('.act-tts');
      return { pressed: b.getAttribute('aria-pressed'), label: b.textContent.trim(), busy: b.classList.contains('busy'),
        audio: TTS.audio ? { paused: TTS.audio.paused, readyState: TTS.audio.readyState, t: TTS.audio.currentTime, src: (TTS.audio.src || '').slice(0, 20) } : null,
        synthPending: typeof speechSynthesis !== 'undefined' && (speechSynthesis.speaking || speechSynthesis.pending) };
    });
    if (play.pressed === 'true' && play.audio && !play.audio.paused) break;
    if (play.pressed === 'false' && !play.busy && i > 3) break; // gave up / failed
  }
  const t1 = play.audio ? play.audio.t : 0;
  await sleep(1200);
  const play2 = await page.evaluate(() => ({ t: TTS.audio ? TTS.audio.currentTime : 0, paused: TTS.audio ? TTS.audio.paused : true }));
  ck('click → shared Audio actually playing (readyState≥2, currentTime advancing, Stop label)', play.pressed === 'true' && play.audio && play.audio.readyState >= 2 && !play2.paused && play2.t > t1 && /Stop/.test(play.label), JSON.stringify({ play, t1, play2 }));
  await page.screenshot({ path: __dirname + '/av-w4-playing-dark.png' });

  // stop toggles
  await page.evaluate(() => document.querySelector('.act-tts').click());
  await sleep(500);
  const stopped = await page.evaluate(() => {
    const b = document.querySelector('.act-tts');
    return { pressed: b.getAttribute('aria-pressed'), label: b.textContent.trim(), paused: TTS.audio ? TTS.audio.paused : null, btnCleared: TTS.btn === null };
  });
  ck('second click stops (aria-pressed false, audio paused, TTS.btn cleared)', stopped.pressed === 'false' && /Read aloud/.test(stopped.label) && stopped.paused === true && stopped.btnCleared, JSON.stringify(stopped));

  // supersede: needs 2 buttons — use audit chat
  await page.evaluate((id) => openChat(id), auditChat.id);
  await sleep(2500);
  const nBtns = await page.evaluate(() => document.querySelectorAll('.act-tts').length);
  if (nBtns >= 2) {
    await page.evaluate(() => document.querySelectorAll('.act-tts')[0].click());
    let ok1 = false;
    for (let i = 0; i < 90; i++) { await sleep(1000); const s = await page.evaluate(() => document.querySelectorAll('.act-tts')[0].getAttribute('aria-pressed')); if (s === 'true') { ok1 = true; break; } }
    await page.evaluate(() => document.querySelectorAll('.act-tts')[1].click());
    let sup = null;
    for (let i = 0; i < 90; i++) {
      await sleep(1000);
      sup = await page.evaluate(() => {
        const b = [...document.querySelectorAll('.act-tts')];
        return { p0: b[0].getAttribute('aria-pressed'), p1: b[1].getAttribute('aria-pressed'), l0: b[0].textContent.trim(), btnIs1: TTS.btn === b[1], playing: TTS.audio && !TTS.audio.paused };
      });
      if (sup.p1 === 'true') break;
    }
    ck('second read supersedes first (first idle, second playing, one shared Audio)', ok1 && sup.p0 === 'false' && /Read aloud/.test(sup.l0) && sup.p1 === 'true' && sup.btnIs1 && sup.playing, JSON.stringify(sup));
    await page.evaluate(() => stopReadAloud());
  } else {
    ck('second read supersedes first', false, 'could not find 2 .act-tts buttons (' + nBtns + ')');
  }

  // forced fetch failure → speechSynthesis fallback
  const fb = await page.evaluate(async () => {
    window.__spoke = [];
    const f0 = window.fetch;
    window.fetch = (u, o) => (String(u).includes('/api/tts') ? Promise.reject(new Error('forced-network-down')) : f0(u, o));
    const s0 = speechSynthesis.speak.bind(speechSynthesis);
    speechSynthesis.speak = (u) => { window.__spoke.push({ text: String(u.text).slice(0, 60), lang: u.lang }); };
    const b = document.querySelector('.act-tts');
    b.click();
    await new Promise((r) => setTimeout(r, 1500));
    const res = { spoke: window.__spoke.slice(), pressed: b.getAttribute('aria-pressed'), label: b.textContent.trim() };
    window.fetch = f0; speechSynthesis.speak = s0; stopReadAloud();
    return res;
  });
  ck('forced /api/tts failure → speechSynthesis fallback invoked (button in playing state)', fb.spoke.length === 1 && fb.pressed === 'true' && /Stop/.test(fb.label), JSON.stringify(fb));

  // markdown stripping — synthetic + real fenced reply if any chat has one
  const strip = await page.evaluate(() => {
    const t = speechText('# Title\nIntro line.\n```js\nconst SECRET_TOKEN = 42;\n```\nAfter **bold** and `inline` and [docs](http://x).\n\n| col | v |\n|---|---|\n| a | 1 |\n\n> quoted wisdom\n\n- item one\n1. item two');
    return t;
  });
  const stripOk = !/SECRET_TOKEN|```|const/.test(strip) && /Intro line/.test(strip) && /After bold and inline and docs/.test(strip) && /quoted wisdom/.test(strip) && !/\|/.test(strip) && !/^#/.test(strip) && !/>/.test(strip);
  ck('speechText drops fences/tables/markers, keeps prose', stripOk, JSON.stringify(strip.slice(0, 160)));
  // real fenced reply
  let realFence = null;
  for (const c of chats.slice(0, 12)) {
    const full = await (await fetch(BASE + '/api/chat?id=' + c.id)).json();
    const m = (full.messages || []).find((m) => m.role === 'assistant' && /```/.test(m.content || ''));
    if (m) { realFence = { chat: c.id.slice(0, 8), md: m.content }; break; }
  }
  if (realFence) {
    const code = (realFence.md.match(/```[\w-]*\n([\s\S]*?)```/) || [])[1] || '';
    const codeLine = code.split('\n').map((l) => l.trim()).filter((l) => l.length > 12)[0];
    const spoken = await page.evaluate((md) => speechText(md), realFence.md);
    ck('REAL fenced reply: spoken text excludes code body (chat ' + realFence.chat + ')', !!codeLine && !spoken.includes(codeLine) && spoken.length > 0, 'excludedLine=' + JSON.stringify((codeLine || '').slice(0, 60)));
  } else ck('REAL fenced reply found', false, 'no assistant message with ``` in newest 12 chats');

  // light theme: button present + cached playback
  await page.goto(BASE + '/?theme=light', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(1800);
  await page.evaluate((id) => openChat(id), (countChat || auditChat).id);
  await sleep(2000);
  await page.evaluate(() => document.querySelector('.act-tts').click());
  let lt = null;
  for (let i = 0; i < 30; i++) { await sleep(1000); lt = await page.evaluate(() => { const b = document.querySelector('.act-tts'); return { pressed: b.getAttribute('aria-pressed'), playing: TTS.audio && !TTS.audio.paused }; }); if (lt.pressed === 'true') break; }
  ck('light theme: read-aloud plays (cache hit path)', lt.pressed === 'true' && lt.playing, JSON.stringify(lt));
  await page.evaluate(() => { const b = document.querySelector('.act-tts'); b.scrollIntoView({ block: 'center' }); });
  await page.screenshot({ path: __dirname + '/av-w4-playing-light.png' });
  await page.evaluate(() => stopReadAloud());

  await browser.close();
  fs.writeFileSync(__dirname + '/av-w4-results.json', JSON.stringify(R, null, 2));
  const fails = R.checks.filter((c) => !c.pass).length;
  console.log('\ncreated cache files: ' + JSON.stringify(R.createdCache));
  console.log('W4: ' + (R.checks.length - fails) + '/' + R.checks.length + ' pass');
  process.exit(fails ? 2 : 0);
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
