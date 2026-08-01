// learnux T3 — ledger backward-compat: old-format events (no runId/signal/lessons)
// must render as legacy toasts; old learning-clean with no staged toast = zero UI.
// Crafted lines are appended to learn-events.jsonl and stripped afterwards.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://127.0.0.1:4317';
const LEDGER = '/Users/vlad/projects/crs-progress/crs-brain/data/learn-events.jsonl';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { errors: [], asserts: {} };

(async () => {
  const ledgerBefore = fs.readFileSync(LEDGER, 'utf8');
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1440,940'] });
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 940 });
  p.on('console', (m) => { if (m.type() === 'error') out.errors.push(m.text().slice(0, 300)); });
  p.on('pageerror', (e) => out.errors.push('PAGEERR ' + String(e.message).slice(0, 300)));
  await p.goto(BASE + '/?theme=dark', { waitUntil: 'networkidle2' });
  await p.waitForFunction('typeof stagedLearnToast==="function"');
  await p.evaluate(() => { window.__played = []; SOUNDS.playSound = (id) => window.__played.push(id); });
  await sleep(300);
  // craft OLD-format lines (exactly the pre-upgrade shape: ts/kind/title/detail/chatId only)
  const mk = (kind, title, detail) => JSON.stringify({ ts: new Date().toISOString(), kind, title, detail, chatId: 'legacy-test' });
  const lines = [
    mk('learning-start', 'Learning from this session…', 'Signal detected (errors/blocked commands/long exploration). Distilling operational lessons from:\nlegacy turn title'),
    mk('learning-saved', 'Learned 1 lesson', '• [cli-bug] Legacy lesson rule\n  FIX: legacy fix'),
    mk('learning-clean', 'Nothing new to learn', 'Session reviewed — all its traps were already in the Playbook.'),
  ];
  fs.appendFileSync(LEDGER, lines.join('\n') + '\n');
  await sleep(8000);   // > one 6s poll
  const probe = await p.evaluate(() => ({
    legacy: [...document.querySelectorAll('.ltoast:not(.staged)')].map((el) => (el.querySelector('.lt-t') || {}).textContent),
    staged: document.querySelectorAll('.ltoast.staged').length,
    played: window.__played.slice(),
  }));
  await p.screenshot({ path: __dirname + '/learnux-t3-legacy-dark.png' });
  out.probe = probe;
  out.asserts.legacy_start_toast = probe.legacy.some((t) => /Learning — Learning from this session/.test(t));
  out.asserts.legacy_saved_toast = probe.legacy.some((t) => /Learned — Learned 1 lesson/.test(t));
  out.asserts.no_staged_toast = probe.staged === 0;
  out.asserts.clean_zero_ui = probe.legacy.length === 2;                 // clean produced nothing
  out.asserts.legacy_saved_sound_kept = JSON.stringify(probe.played) === JSON.stringify(['s26']);   // legacy contract unchanged
  out.asserts.poll_loop_unaffected = out.errors.length === 0;
  fs.writeFileSync(LEDGER, ledgerBefore);                                // restore ledger exactly
  fs.writeFileSync(__dirname + '/learnux-t3-results.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out.asserts, null, 1));
  console.log('legacy toasts:', probe.legacy);
  await b.close();
})().catch((e) => { console.error('RIGFAIL', e); process.exit(1); });
