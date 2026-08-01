// av-w1-learnsounds.js — ADVERSARIAL verify of W1 (learn sounds s25/s26).
// Independent of the writers' f1-learn-sounds.js.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = { checks: [], errors: [] };
const ck = (name, pass, evidence) => { R.checks.push({ name, pass: !!pass, evidence }); console.log((pass ? 'PASS' : 'FAIL') + '  ' + name + '  ' + (evidence || '')); };

(async () => {
  // ---- API surface ----
  const list = await (await fetch(BASE + '/api/sounds/list')).json();
  ck('api s25 file in /api/sounds/list', (list.files || []).includes('s25-spark-shimmer.wav'), JSON.stringify((list.files || []).filter(f => /s2[56]/.test(f))));
  ck('api s26 file in /api/sounds/list', (list.files || []).includes('s26-mind-bloom.wav'));

  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1360,900', '--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 900 });
  const warns = [];
  page.on('console', (m) => { if (m.type() === 'warning' || m.type() === 'error') warns.push(m.text()); });
  await page.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2500);

  // gesture first (autoplay policy), on an inert spot (page top edge)
  await page.mouse.click(680, 4);

  // real playSound must know s25/s26 (no 'unknown sound' warn) + synth defs exist
  const synthOk = await page.evaluate(() => ({
    s25: !!SOUNDS_SYNTH.byId('s25'), s26: !!SOUNDS_SYNTH.byId('s26'),
    s25slug: (SOUNDS_SYNTH.byId('s25') || {}).slug, s26slug: (SOUNDS_SYNTH.byId('s26') || {}).slug,
  }));
  await page.evaluate(() => { SOUNDS.playSound('s25'); SOUNDS.playSound('s26'); });
  await sleep(400);
  ck('synth defs s25/s26 exist', synthOk.s25 && synthOk.s26, JSON.stringify(synthOk));
  ck('real playSound(s25/s26) no unknown-sound warn', !warns.some(w => /unknown sound/.test(w)), JSON.stringify(warns.slice(0, 3)));

  // ---- shim SOUNDS.playSound, drive showLearnToast synthetically ----
  const drive = async (kind, opts) => page.evaluate((kind, opts) => {
    window.__played = [];
    if (opts && opts.learnOff) SETTINGS.sounds = Object.assign({}, SETTINGS.sounds, { learnSounds: false });
    else SETTINGS.sounds = Object.assign({}, SETTINGS.sounds, { learnSounds: true });
    if (opts && opts.dnd) SETTINGS.notifyPrefs = Object.assign({}, SETTINGS.notifyPrefs, { dnd: true });
    else SETTINGS.notifyPrefs = Object.assign({}, SETTINGS.notifyPrefs, { dnd: false });
    const host = document.getElementById('learnToasts');
    const before = host ? host.children.length : 0;
    showLearnToast({ kind, title: 'QA-' + kind, detail: 'adversarial', ts: new Date().toISOString() });
    const hostAfter = document.getElementById('learnToasts');
    const after = hostAfter ? hostAfter.children.length : 0;
    return { played: window.__played.slice(), toastAdded: after > before };
  }, kind, opts || {});

  await page.evaluate(() => { window.__played = []; SOUNDS._orig = SOUNDS.playSound; SOUNDS.playSound = (id) => window.__played.push(id); });

  let r = await drive('playbook-applied');
  ck('playbook-applied plays s25 + toast', r.played.join(',') === 's25' && r.toastAdded, JSON.stringify(r));
  r = await drive('learning-saved');
  ck('learning-saved plays s26 + toast', r.played.join(',') === 's26' && r.toastAdded, JSON.stringify(r));
  r = await drive('learning-clean');
  ck('learning-clean silent, no toast', r.played.length === 0 && !r.toastAdded, JSON.stringify(r));
  r = await drive('recurrence');
  ck('recurrence toast but NO sound', r.played.length === 0 && r.toastAdded, JSON.stringify(r));
  r = await drive('totally-unknown-kind');
  ck('unknown kind fully silent', r.played.length === 0 && !r.toastAdded, JSON.stringify(r));
  r = await drive('playbook-applied', { learnOff: true });
  ck('learnSounds=false suppresses s25 (toast still shows)', r.played.length === 0 && r.toastAdded, JSON.stringify(r));
  r = await drive('learning-saved', { learnOff: true });
  ck('learnSounds=false suppresses s26', r.played.length === 0, JSON.stringify(r));
  r = await drive('playbook-applied', { dnd: true });
  ck('DND suppresses s25', r.played.length === 0, JSON.stringify(r));
  r = await drive('learning-saved', { dnd: true });
  ck('DND suppresses s26', r.played.length === 0, JSON.stringify(r));
  // restore local state
  await page.evaluate(() => { SETTINGS.sounds = Object.assign({}, SETTINGS.sounds, { learnSounds: true }); SETTINGS.notifyPrefs = Object.assign({}, SETTINGS.notifyPrefs, { dnd: false }); });

  // ---- setting round-trips via PUT /api/settings (through the real UI handler) ----
  await page.evaluate(async () => { await setLearnSounds(false); });
  let srv = await (await fetch(BASE + '/api/settings')).json();
  ck('PUT round-trip: learnSounds=false persisted', srv.sounds && srv.sounds.learnSounds === false, 'server learnSounds=' + (srv.sounds || {}).learnSounds);
  await page.evaluate(async () => { await setLearnSounds(true); });
  srv = await (await fetch(BASE + '/api/settings')).json();
  ck('PUT round-trip: learnSounds=true restored', srv.sounds && srv.sounds.learnSounds === true, 'server learnSounds=' + (srv.sounds || {}).learnSounds);

  // ---- Settings UI: Sounds library + per-type dropdowns, BOTH themes ----
  for (const theme of ['dark', 'light']) {
    await page.goto(BASE + '/?theme=' + theme, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1800);
    await page.evaluate(() => openSettings('sounds'));
    await sleep(500);
    const lib = await page.evaluate(() => {
      const pane = document.querySelector('.modal-pane');
      const txt = pane ? pane.textContent : '';
      const playBtns = pane ? [...pane.querySelectorAll('button')].filter(b => /Play/.test(b.textContent)).length : 0;
      const toggleRow = /Learning sounds/.test(txt);
      return { spark: /Spark shimmer/.test(txt), bloom: /Mind bloom/.test(txt), all26: /Library — all 26/.test(txt), playBtns, toggleRow };
    });
    ck(theme + ': Sounds tab has s25+s26 rows, 26 Play buttons, learnSounds toggle', lib.spark && lib.bloom && lib.all26 && lib.playBtns === 26 && lib.toggleRow, JSON.stringify(lib));
    await page.screenshot({ path: __dirname + '/av-w1-sounds-' + theme + '.png' });
    await page.evaluate(() => setSettingsTab('notifications'));
    await sleep(500);
    const dd = await page.evaluate(() => {
      const sels = [...document.querySelectorAll('.modal-pane select.sel')];
      return { count: sels.length,
        allHaveS25: sels.length > 0 && sels.every(s => !!s.querySelector('option[value="s25"]')),
        allHaveS26: sels.length > 0 && sels.every(s => !!s.querySelector('option[value="s26"]')),
        sampleNames: sels[0] ? [ (sels[0].querySelector('option[value="s25"]')||{}).textContent, (sels[0].querySelector('option[value="s26"]')||{}).textContent ] : [] };
    });
    ck(theme + ': every per-type dropdown lists s25+s26', dd.count > 0 && dd.allHaveS25 && dd.allHaveS26, JSON.stringify(dd));
    await page.screenshot({ path: __dirname + '/av-w1-pertype-' + theme + '.png' });
    await page.evaluate(() => closeSettings());
  }

  await browser.close();
  fs.writeFileSync(__dirname + '/av-w1-results.json', JSON.stringify(R, null, 2));
  const fails = R.checks.filter(c => !c.pass).length;
  console.log('\nW1: ' + (R.checks.length - fails) + '/' + R.checks.length + ' pass');
  process.exit(fails ? 2 : 0);
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
