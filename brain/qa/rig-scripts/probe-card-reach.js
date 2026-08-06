// The real gesture: hover the mark, travel down onto a card, hover it, click it.
const puppeteer = require('puppeteer-core');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const check = (n, ok, d) => { console.log((ok ? 'PASS' : 'FAIL'), n, d || ''); if (!ok) fails++; };
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-device-scale-factor=1'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1600, height: 950 });
  await p.goto('http://127.0.0.1:4317/?theme=dark', { waitUntil: 'networkidle2' });
  await sleep(1400);
  await p.evaluate(() => { try { localStorage.removeItem('crs-last-chat'); } catch (e) {} });
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(2800);

  const geo = await p.evaluate(() => {
    const id = document.querySelector('#chatLog .dh-id').getBoundingClientRect();
    const cards = [...document.querySelectorAll('#chatLog .dh-cards .tcard')].map((c) => { const r = c.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, t: c.textContent.trim().slice(0, 18) }; });
    return { id: { x: id.x + id.width / 2, y: id.y + id.height / 2, bottom: id.bottom }, cards, gapTop: cards.length ? cards[0].y : null };
  });

  // 1. hover the mark
  await p.mouse.move(geo.id.x, geo.id.y);
  await sleep(500);
  check('cards visible after hovering the mark', await p.evaluate(() => getComputedStyle(document.querySelector('#chatLog .dh-cards')).visibility) === 'visible');

  // 2. travel down in real steps, as a hand would — through the gap onto card 1
  const target = geo.cards[0];
  await p.mouse.move(target.x, target.y, { steps: 25 });
  await sleep(500);
  const onCard = await p.evaluate(() => {
    const c = document.querySelector('#chatLog .dh-cards'); const s = getComputedStyle(c);
    const el = document.elementFromPoint(innerWidth / 2, 0) ? null : null;
    return { visibility: s.visibility, opacity: s.opacity };
  });
  check('cards still open after travelling onto one', onCard.visibility === 'visible' && onCard.opacity === '1', JSON.stringify(onCard));

  const hit = await p.evaluate((x, y) => { const el = document.elementFromPoint(x, y); return el ? (el.closest('.tcard') ? 'tcard' : el.className || el.tagName) : 'none'; }, target.x, target.y);
  check('the card is what the pointer actually hits', hit === 'tcard', String(hit));

  // 3. hover feedback on the card itself
  const hoverBg = await p.evaluate((x, y) => { const el = document.elementFromPoint(x, y).closest('.tcard'); return getComputedStyle(el).backgroundColor; }, target.x, target.y);
  check('card shows its hover fill', hoverBg === 'rgb(48, 48, 46)' || hoverBg !== 'rgb(38, 38, 38)', hoverBg);

  // 4. linger, then click it — the prompt must land in the composer
  await sleep(1200);
  const stillOpen = await p.evaluate(() => getComputedStyle(document.querySelector('#chatLog .dh-cards')).visibility);
  check('cards stay open while resting on them', stillOpen === 'visible', stillOpen);
  await p.mouse.click(target.x, target.y);
  await sleep(400);
  const val = await p.evaluate(() => document.getElementById('input').value);
  check('clicking a card seeds the composer', val.length > 10, JSON.stringify(val.slice(0, 60)));

  // 5. leaving everything still closes them
  await p.mouse.move(60, 900, { steps: 10 });
  await sleep(900);
  check('cards close when the pointer leaves', await p.evaluate(() => getComputedStyle(document.querySelector('#chatLog .dh-cards')).opacity) === '0');

  // 6. keyboard: focus the mark, tab into the cards
  await p.evaluate(() => document.querySelector('#chatLog .dh-id').focus());
  await sleep(300);
  await p.keyboard.press('Tab');
  await sleep(300);
  const kb = await p.evaluate(() => ({ focused: !!(document.activeElement && document.activeElement.closest('.dh-cards')), vis: getComputedStyle(document.querySelector('#chatLog .dh-cards')).visibility }));
  check('keyboard can reach the cards', kb.focused && kb.vis === 'visible', JSON.stringify(kb));

  await b.close();
  console.log(fails === 0 ? 'CARD-REACH: ALL PASS' : `CARD-REACH: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
