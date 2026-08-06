// The main screen (dashboard) shows the designed brain mark + smart line +
// starter prompts; the chat empty state uses the same mark.
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
  await sleep(1500);
  await p.evaluate(() => { try { localStorage.removeItem('crs-last-chat'); } catch (e) {} });
  await p.reload({ waitUntil: 'networkidle2' });
  await sleep(2600);
  const main = await p.evaluate(() => {
    const h = document.querySelector('#dashView .dash-hero');
    const mark = document.querySelector('#dashView .dh-mark svg');
    const cards = document.querySelectorAll('#dashView .tcard');
    return {
      heroShown: !!h && document.getElementById('dashView').style.display !== 'none',
      markSize: mark ? Math.round(mark.getBoundingClientRect().width) : null,
      markAnim: mark ? getComputedStyle(mark.parentElement).animationName : null,
      cards: cards.length,
      firstCards: [...cards].slice(0, 3).map((c) => c.textContent.trim().split('\n')[0].slice(0, 22)),
      line: (document.querySelector('#dashView .dh-line') || {}).textContent || '',
    };
  });
  check('main screen shows the hero', main.heroShown, JSON.stringify({ shown: main.heroShown }));
  check('designed brain mark kept (72px, breathing)', main.markSize === 72 && main.markAnim === 'dhBreathe', `${main.markSize}px / ${main.markAnim}`);
  check('starter prompts on the main screen', main.cards >= 9, `${main.cards} cards: ${main.firstCards.join(' | ')}`);
  check('smart line still present', /module|todo|decision|quiet/i.test(main.line), main.line.slice(0, 70));

  // chat empty state uses the same mark
  await p.evaluate(() => newChat());
  await sleep(900);
  const chat = await p.evaluate(() => {
    const mark = document.querySelector('#chatLog .hero .dh-mark svg');
    return { mark: mark ? Math.round(mark.getBoundingClientRect().width) : null, cards: document.querySelectorAll('#chatLog .tcard').length, oldMark: !!document.querySelector('#chatLog .hero-mark') };
  });
  check('chat empty state uses the same mark', chat.mark === 72 && !chat.oldMark, JSON.stringify(chat));
  check('chat empty state keeps its prompts', chat.cards >= 9, String(chat.cards));
  await b.close();
  console.log(fails === 0 ? 'HERO: ALL PASS' : `HERO: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
