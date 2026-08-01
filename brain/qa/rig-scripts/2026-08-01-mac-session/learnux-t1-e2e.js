// learnux T1 — REAL end-to-end: POST /api/memory/distill on a chat with a real ✗ error,
// watch the staged toast morph live (A signal → B thinking → C solution cards), verify
// the cards against the playbook entry actually written. Also records ticker lines,
// distiller glow, and s26 single-fire.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://127.0.0.1:4317';
const CHAT_ID = process.argv[2];
if (!CHAT_ID) { console.error('usage: node learnux-t1-e2e.js <chatId>'); process.exit(1); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { chatId: CHAT_ID, stages: [], ticker: [], errors: [], asserts: {} };

(async () => {
  const pbBefore = await (await fetch(BASE + '/api/playbook')).json();
  const beforeIds = new Set(pbBefore.lessons.map((l) => l.id));
  out.playbookCountBefore = pbBefore.lessons.length;

  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1440,940'] });
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 940 });
  p.on('console', (m) => { if (m.type() === 'error') out.errors.push(m.text().slice(0, 300)); });
  p.on('pageerror', (e) => out.errors.push('PAGEERR ' + String(e.message).slice(0, 300)));
  await p.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2' });
  await p.waitForFunction('window.LIVEMAP && typeof stagedLearnToast==="function"');
  // shim sound + force gates open so the s26 single-fire is observable
  await p.evaluate(() => {
    window.__played = [];
    SOUNDS.playSound = (id) => window.__played.push(id);
    if (window.SETTINGS) { (SETTINGS.sounds = SETTINGS.sounds || {}).learnSounds = true; (SETTINGS.notifyPrefs = SETTINGS.notifyPrefs || {}).dnd = false; }
    LIVEMAP.open();
  });
  await sleep(600);
  // fire the real distill (returns when Haiku finishes)
  await p.evaluate((id) => {
    window.__distill = null;
    fetch('/api/memory/distill', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatId: id }) })
      .then((r) => r.json()).then((j) => { window.__distill = j; }).catch((e) => { window.__distill = { error: String(e) }; });
  }, CHAT_ID);

  const seen = {};   // stage → first-probe record
  const tickerSet = new Set();
  const t0 = Date.now();
  let probe = null;
  while (Date.now() - t0 < 150000) {
    probe = await p.evaluate(() => {
      const el = document.querySelector('.ltoast.staged');
      const dist = document.querySelector('#lmPanel [data-n="distiller"]');
      const dots = el && el.querySelector('.lt-think');
      return {
        present: !!el,
        title: el ? (el.querySelector('.lt-t') || {}).textContent : '',
        sig: el && el.querySelector('.lt-sig') ? el.querySelector('.lt-sig').textContent : '',
        think: !!dots,
        thinkAnimated: dots ? [...dots.querySelectorAll('i')].some((i) => i.getAnimations().length > 0) : false,
        done: el ? el.classList.contains('done') : false,
        cards: el ? [...el.querySelectorAll('.lt-lesson')].map((c) => ({
          problem: (c.querySelector('.lt-prob') || {}).textContent || '',
          solution: (c.querySelector('.lt-sol') || {}).textContent || '',
          cat: (c.querySelector('.lt-cat') || {}).textContent || '',
        })) : [],
        sol1: el && el.querySelector('.lt-sol1') ? el.querySelector('.lt-sol1').textContent : '',
        ticker: (document.querySelector('#lmTickerTx') || {}).textContent || '',
        distillerOn: dist ? dist.classList.contains('on') : false,
        played: window.__played.slice(),
        distill: window.__distill,
      };
    });
    if (probe.ticker) tickerSet.add(probe.ticker.replace(/▍$/, ''));
    const stage = probe.done ? 'C' : probe.think ? 'B' : probe.present ? 'A' : null;
    if (stage && !seen[stage]) {
      seen[stage] = { t: ((Date.now() - t0) / 1000).toFixed(1) + 's', title: probe.title, sig: probe.sig, thinkAnimated: probe.thinkAnimated, distillerOn: probe.distillerOn, cards: probe.cards, sol1: probe.sol1 };
      await p.screenshot({ path: __dirname + '/learnux-t1-stage' + stage + '-dark.png' });
      out.stages.push({ stage, ...seen[stage] });
      if (stage === 'C') {
        await p.click('.ltoast.staged .lt-head');
        await sleep(350);
        await p.screenshot({ path: __dirname + '/learnux-t1-stageC-expanded-dark.png' });
        const exp = await p.evaluate(() => {
          const el = document.querySelector('.ltoast.staged');
          return { expanded: el.classList.contains('expanded'), cards: [...el.querySelectorAll('.lt-lesson')].map((c) => c.textContent) };
        });
        out.expandedCards = exp;
      }
    }
    if (seen.C && probe.distill) break;
    await sleep(250);
  }
  out.ticker = [...tickerSet];
  out.distillResult = probe && probe.distill;
  out.played = probe && probe.played;

  const pbAfter = await (await fetch(BASE + '/api/playbook')).json();
  const added = pbAfter.lessons.filter((l) => !beforeIds.has(l.id));
  out.playbookAdded = added.map((l) => ({ id: l.id, rule: l.rule, fix: l.fix, category: l.category, trigger: l.trigger }));
  out.playbookCountAfter = pbAfter.lessons.length;

  // asserts
  const A = seen.A || seen.B || {};   // A may be skipped visually only if probe missed it; sig persists in B
  out.asserts.stageA_has_failed_cmd = /nope-flag/.test((seen.A && seen.A.sig) || (seen.B && seen.B.sig) || '');
  out.asserts.stageB_think_running = !!(seen.B && seen.B.thinkAnimated);
  out.asserts.stageB_distiller_glow = !!(seen.B && seen.B.distillerOn);
  const card = seen.C && seen.C.cards[0];
  out.asserts.stageC_cards_nonempty = !!(card && card.problem.replace('Problem', '').trim() && card.solution.replace('Solution', '').trim());
  out.asserts.stageC_matches_playbook = !!(card && added[0] && card.problem.includes(added[0].rule.slice(0, 40)) && card.solution.includes((added[0].fix || '').slice(0, 40)));
  out.asserts.s26_once = JSON.stringify(out.played) === JSON.stringify(['s26']);
  out.asserts.zero_console_errors = out.errors.length === 0;

  fs.writeFileSync(__dirname + '/learnux-t1-results.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out.asserts, null, 1));
  console.log('stages:', out.stages.map((s) => s.stage + '@' + s.t).join(' → '));
  console.log('ticker lines:', out.ticker);
  console.log('added lessons:', out.playbookAdded);
  await b.close();
})().catch((e) => { console.error('RIGFAIL', e); process.exit(1); });
