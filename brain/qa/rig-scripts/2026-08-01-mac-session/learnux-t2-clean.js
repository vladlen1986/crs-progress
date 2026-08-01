// learnux T2 — clean path: re-distill the same signal (lesson already in playbook)
// → staged toast must resolve "Already known — nothing new to learn", NO sound,
// auto-dismiss ~5s. playSound shimmed to record.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://127.0.0.1:4317';
const CHAT_ID = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { chatId: CHAT_ID, stages: [], errors: [], asserts: {} };

(async () => {
  const before = (await (await fetch(BASE + '/api/playbook')).json()).lessons;
  const beforeIds = new Set(before.map((l) => l.id));
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1440,940'] });
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 940 });
  p.on('console', (m) => { if (m.type() === 'error') out.errors.push(m.text().slice(0, 300)); });
  p.on('pageerror', (e) => out.errors.push('PAGEERR ' + String(e.message).slice(0, 300)));
  await p.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2' });
  await p.waitForFunction('window.LIVEMAP && typeof stagedLearnToast==="function"');
  await p.evaluate(() => {
    window.__played = [];
    SOUNDS.playSound = (id) => window.__played.push(id);
    if (window.SETTINGS) { (SETTINGS.sounds = SETTINGS.sounds || {}).learnSounds = true; (SETTINGS.notifyPrefs = SETTINGS.notifyPrefs || {}).dnd = false; }
    LIVEMAP.open();
  });
  await p.evaluate((id) => {
    window.__distill = null;
    fetch('/api/memory/distill', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatId: id }) })
      .then((r) => r.json()).then((j) => { window.__distill = j; }).catch((e) => { window.__distill = { error: String(e) }; });
  }, CHAT_ID);

  const t0 = Date.now(); const seen = {}; let cleanSeenAt = 0; let goneAt = 0; let probe = null;
  while (Date.now() - t0 < 150000) {
    probe = await p.evaluate(() => {
      const el = document.querySelector('.ltoast.staged');
      const dist = document.querySelector('#lmPanel [data-n="distiller"]');
      return {
        present: !!el,
        title: el ? (el.querySelector('.lt-t') || {}).textContent : '',
        muted: el ? el.classList.contains('mutedc') : false,
        think: !!(el && el.querySelector('.lt-think')),
        distillerOn: dist ? dist.classList.contains('on') : false,
        played: window.__played.slice(),
        distill: window.__distill,
      };
    });
    const stage = probe.muted ? 'CLEAN' : probe.think ? 'B' : probe.present ? 'A' : null;
    if (stage && !seen[stage]) {
      seen[stage] = { t: ((Date.now() - t0) / 1000).toFixed(1) + 's', title: probe.title, distillerOn: probe.distillerOn };
      out.stages.push({ stage, ...seen[stage] });
      if (stage === 'CLEAN') { cleanSeenAt = Date.now(); await p.screenshot({ path: __dirname + '/learnux-t2-clean-dark.png' }); }
    }
    if (cleanSeenAt && !probe.present) { goneAt = Date.now(); break; }
    if (probe.distill && !cleanSeenAt && Date.now() - t0 > 140000) break;
    await sleep(250);
  }
  const after = (await (await fetch(BASE + '/api/playbook')).json()).lessons;
  out.newLessons = after.filter((l) => !beforeIds.has(l.id)).map((l) => ({ id: l.id, rule: l.rule }));
  out.distillResult = probe && probe.distill;
  out.played = probe && probe.played;
  out.dismissMs = goneAt && cleanSeenAt ? goneAt - cleanSeenAt : null;
  out.asserts.clean_toast_shown = !!seen.CLEAN && /Already known/.test(seen.CLEAN.title);
  out.asserts.no_sound = (out.played || []).length === 0;
  out.asserts.auto_dismiss_5s = out.dismissMs != null && out.dismissMs < 7000;
  out.asserts.distiller_glow_released = !probe.distillerOn;
  out.asserts.zero_console_errors = out.errors.length === 0;
  fs.writeFileSync(__dirname + '/learnux-t2-results.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out.asserts, null, 1));
  console.log('stages:', out.stages, 'dismissMs:', out.dismissMs, 'newLessons:', out.newLessons);
  await b.close();
})().catch((e) => { console.error('RIGFAIL', e); process.exit(1); });
