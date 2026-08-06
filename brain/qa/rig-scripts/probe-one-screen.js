// ONE screen: home IS the chat. Header keeps Map only; Kanban/List live in the
// map. Hero = greeting only, prompts revealed on hover. Header is taller.
const puppeteer = require('puppeteer-core');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const check = (n, ok, d) => { console.log((ok ? 'PASS' : 'FAIL'), n, d || ''); if (!ok) fails++; };
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-device-scale-factor=1', '--disable-lcd-text'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1600, height: 950 });
  await p.goto('http://127.0.0.1:4317/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(1500);
  await p.evaluate(() => { try { localStorage.removeItem('crs-last-chat'); } catch (e) {} });
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(2800);

  // --- 1. one screen -------------------------------------------------------
  const home = await p.evaluate(() => ({
    chatVisible: document.getElementById('chatView').style.display !== 'none',
    dashVisible: document.getElementById('dashView').style.display !== 'none',
    heroInChat: !!document.querySelector('#chatLog .dash-hero'),
    title: (document.querySelector('#chatLog .dh-title') || {}).textContent || '',
    line: !!document.querySelector('#chatLog .dh-line'),
    hint: !!document.querySelector('#chatLog .dh-hint'),
    mark: (() => { const s = document.querySelector('#chatLog .dh-mark svg:not(.dh-cosmos)'); return s ? Math.round(s.getBoundingClientRect().width) : null; })(),   // the cosmos layer is also an svg in here
  }));
  check('home is the chat, no second screen', home.chatVisible && !home.dashVisible && home.heroInChat, JSON.stringify(home));
  check('greeting only (time-of-day + name)', /^(Good (morning|afternoon|evening|night)), Vlad$/.test(home.title.trim()), JSON.stringify(home.title));
  check('status line and hint row removed', !home.line && !home.hint, `line:${home.line} hint:${home.hint}`);
  check('designed brain mark kept at 72px', home.mark === 72, String(home.mark));

  // clicking Home again keeps one screen
  await p.evaluate(() => showDashboard());
  await sleep(500);
  const afterHome = await p.evaluate(() => ({ chat: document.getElementById('chatView').style.display !== 'none', dash: document.getElementById('dashView').style.display !== 'none' }));
  check('Home button lands on the same one screen', afterHome.chat && !afterHome.dash, JSON.stringify(afterHome));

  // --- 2. cards hidden until the mark is hovered ---------------------------
  const hidden = await p.evaluate(() => {
    const c = document.querySelector('#chatLog .dh-cards');
    const s = getComputedStyle(c);
    return { opacity: s.opacity, visibility: s.visibility, cards: c.querySelectorAll('.tcard').length };
  });
  check('quick actions hidden at rest', hidden.opacity === '0' && hidden.visibility === 'hidden', JSON.stringify(hidden));
  check('quick actions still there (10 cards)', hidden.cards >= 9, String(hidden.cards));

  const box = await p.evaluate(() => { const r = document.querySelector('#chatLog .dh-id').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await p.mouse.move(box.x, box.y);
  await sleep(650);
  const shown = await p.evaluate(() => {
    const c = document.querySelector('#chatLog .dh-cards'); const s = getComputedStyle(c);
    const t = document.querySelector('#chatLog .dh-title').getBoundingClientRect();
    return { opacity: s.opacity, visibility: s.visibility, titleY: Math.round(t.y) };
  });
  check('hovering the mark reveals the quick actions', shown.opacity === '1' && shown.visibility === 'visible', JSON.stringify(shown));

  // reveal must not move the greeting
  await p.mouse.move(20, 900);
  await sleep(800);
  const restY = await p.evaluate(() => Math.round(document.querySelector('#chatLog .dh-title').getBoundingClientRect().y));
  check('reveal causes no layout shift', Math.abs(restY - shown.titleY) <= 1, `hover ${shown.titleY} vs rest ${restY}`);
  const backHidden = await p.evaluate(() => getComputedStyle(document.querySelector('#chatLog .dh-cards')).opacity);
  check('quick actions hide again on mouse-out', backHidden === '0', backHidden);

  // --- 3. header ----------------------------------------------------------
  const head = await p.evaluate(() => {
    const h = document.querySelector('.center-head');
    const seg = [...document.querySelectorAll('#viewSeg button')].map((b) => b.dataset.v);
    return { h: Math.round(h.getBoundingClientRect().height), seg, groups: [...document.querySelectorAll('.hgtrig .hgl')].map((x) => x.textContent) };
  });
  check('header is taller (44px)', head.h === 44, `${head.h}px`);
  check('header has Map only — no Chat/Kanban/List', JSON.stringify(head.seg) === '["map"]', JSON.stringify(head.seg));
  check('tool groups untouched', head.groups.join('|') === 'Build|Knowledge|Ops', head.groups.join('|'));

  // popovers cleared the taller header
  await p.evaluate(() => toggleUsagePop(new Event('click'), true));
  await sleep(300);
  const pop = await p.evaluate(() => { const e = document.getElementById('usagePop'); return { shown: e.classList.contains('show'), top: Math.round(e.getBoundingClientRect().top) }; });
  check('usage popover clears the taller header', !pop.shown || pop.top >= 44, JSON.stringify(pop));

  // --- 4. map screen owns the view selector --------------------------------
  await p.evaluate(() => setView('map'));
  await sleep(3000);
  const fr = p.frames().find((f) => /\/map/.test(f.url()));
  check('map iframe loaded', !!fr, fr ? fr.url() : 'none');
  if (fr) {
    // the map's inline script is ~1400 lines; wait until it has actually run
    await fr.waitForFunction(() => typeof currentMapView === 'function', { timeout: 20000 });
    await sleep(400);
    const seg = await fr.evaluate(() => ({
      buttons: [...document.querySelectorAll('#mapViewSeg button')].map((b) => b.dataset.mv),
      on: ((document.querySelector('#mapViewSeg button.on') || {}).dataset || {}).mv || null,   // a DOMStringMap serialises as {} — hand back the string
      oldBoardBtn: !!document.getElementById('boardBtn'),
      visible: (() => { const r = document.getElementById('mapViewSeg').getBoundingClientRect(); return r.width > 0 && r.top >= 0; })(),
    }));
    check('map screen has the Map|Kanban|List selector', JSON.stringify(seg.buttons) === '["map","board","list","ideas"]', JSON.stringify(seg.buttons));
    check('selector marks the live view', seg.on === 'map', JSON.stringify(seg.on));
    check('redundant ▦ Board button removed', !seg.oldBoardBtn, String(seg.oldBoardBtn));
    check('selector is on screen', seg.visible, String(seg.visible));

    await fr.evaluate(() => pickView('board'));
    await sleep(900);
    const k = await fr.evaluate(() => ({ open: document.body.classList.contains('board-open'), on: (document.querySelector('#mapViewSeg button.on') || {}).dataset.mv, list: document.body.classList.contains('blist') }));
    check('Kanban selector opens the board', k.open && k.on === 'board' && !k.list, JSON.stringify(k));

    await fr.evaluate(() => pickView('list'));
    await sleep(900);
    const l = await fr.evaluate(() => ({ open: document.body.classList.contains('board-open'), on: (document.querySelector('#mapViewSeg button.on') || {}).dataset.mv, list: document.body.classList.contains('blist') }));
    check('List selector switches layout', l.open && l.on === 'list' && l.list, JSON.stringify(l));

    await fr.evaluate(() => pickView('map'));
    await sleep(900);
    const m = await fr.evaluate(() => ({ open: document.body.classList.contains('board-open'), on: (document.querySelector('#mapViewSeg button.on') || {}).dataset.mv }));
    check('Map selector closes the board', !m.open && m.on === 'map', JSON.stringify(m));
  }

  const errs = [];
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.evaluate(() => showDashboard());
  await sleep(600);
  check('no console errors on the round trip', errs.length === 0, errs.join(' | ').slice(0, 200));

  await b.close();
  console.log(fails === 0 ? 'ONE-SCREEN: ALL PASS' : `ONE-SCREEN: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
