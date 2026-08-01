// av-w2-chatchrome.js — ADVERSARIAL verify of W2 (clean chat chrome) on legacy chat 9e881692.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CHAT = '9e881692-df40-440c-be2a-d04999411b3c';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = { checks: [] };
const ck = (name, pass, evidence) => { R.checks.push({ name, pass: !!pass, evidence }); console.log((pass ? 'PASS' : 'FAIL') + '  ' + name + '  ' + (evidence || '')); };

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1360,900'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 900 });
  for (const theme of ['dark', 'light']) {
    await page.goto(BASE + '/?theme=' + theme, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.evaluate((id) => openChat(id), CHAT);
    await sleep(2500);
    const res = await page.evaluate(() => {
      const out = {};
      out.steps = document.querySelectorAll('.wstep').length;
      out.groups = document.querySelectorAll('.wgroup').length;
      // open every group so .wsteps are rendered (display:flex)
      document.querySelectorAll('.wgroup:not(.open) .wghead').forEach((h) => h.click());
      const stepsEls = [...document.querySelectorAll('.wsteps')];
      out.wstepsCount = stepsEls.length;
      out.wstepsBorderLeft = [...new Set(stepsEls.map((e) => getComputedStyle(e).borderLeftWidth))];
      const lanes = [...document.querySelectorAll('.wlane')];
      out.laneCount = lanes.length;
      out.laneAfterContent = [...new Set(lanes.map((e) => getComputedStyle(e, '::after').content))];
      out.laneTexts = [...new Set(lanes.map((e) => e.textContent.trim()))];
      out.laneTransform = lanes[0] ? getComputedStyle(lanes[0]).textTransform : null;
      out.bpLanes = document.querySelectorAll('.wlane.bp').length;
      const heads = [...document.querySelectorAll('.wstep-head')];
      out.headCount = heads.length;
      out.headInsetShadows = heads.map((h) => getComputedStyle(h).boxShadow).filter((s) => /inset/.test(s));
      // md content rules — probe with a synthetic .md block using real chat CSS
      const md = document.createElement('div'); md.className = 'md';
      md.innerHTML = '<h1>H</h1><table><thead><tr><th>a</th></tr></thead><tbody><tr><td>b</td></tr></tbody></table><blockquote>q</blockquote>';
      (document.querySelector('.msg.md') || document.body).appendChild(md);
      const h1 = md.querySelector('h1'), th = md.querySelector('th'), td = md.querySelector('td'), bq = md.querySelector('blockquote');
      out.md = {
        h1BorderBottom: getComputedStyle(h1).borderBottomWidth + ' ' + getComputedStyle(h1).borderBottomStyle,
        tableCollapse: getComputedStyle(md.querySelector('table')).borderCollapse,
        thBorder: getComputedStyle(th).borderBottomWidth, thBg: getComputedStyle(th).backgroundColor,
        tdBorder: getComputedStyle(td).borderBottomWidth,
        bqBorderLeft: getComputedStyle(bq).borderLeftWidth + ' ' + getComputedStyle(bq).borderLeftStyle,
      };
      md.remove();
      return out;
    });
    ck(theme + ': legacy chat rendered with steps', res.steps > 100, res.steps + ' .wstep in ' + res.groups + ' groups');
    ck(theme + ': .wsteps border-left-width 0px (step rail gone)', res.wstepsCount > 0 && res.wstepsBorderLeft.join() === '0px', JSON.stringify(res.wstepsBorderLeft) + ' across ' + res.wstepsCount);
    ck(theme + ': no .wlane::after rule content', res.laneCount > 0 && res.laneAfterContent.every((c) => c === 'none'), JSON.stringify(res.laneAfterContent));
    ck(theme + ': lane labels Brain + ›_ Buildprint present (uppercased via CSS)', res.laneTexts.includes('Brain') && res.laneTexts.some((t) => /›_ Buildprint — Bubble/i.test(t)) && res.laneTransform === 'uppercase' && res.bpLanes > 0, JSON.stringify(res.laneTexts) + ' transform=' + res.laneTransform + ' bpLanes=' + res.bpLanes);
    ck(theme + ': zero inset box-shadows on .wstep-head (' + res.headCount + ' heads)', res.headCount > 100 && res.headInsetShadows.length === 0, 'inset found: ' + res.headInsetShadows.length);
    ck(theme + ': .md rules intact (h1 underline, table, blockquote)', /^[1-9]/.test(res.md.h1BorderBottom) && res.md.h1BorderBottom.includes('solid') && res.md.tableCollapse === 'collapse' && /^[1-9]/.test(res.md.bqBorderLeft) && res.md.bqBorderLeft.includes('solid') && (/^[1-9]/.test(res.md.thBorder) || res.md.thBg !== 'rgba(0, 0, 0, 0)'), JSON.stringify(res.md));
    // screenshot: scroll a steps group into view
    await page.evaluate(() => { const g = document.querySelector('.wgroup.open'); if (g) g.scrollIntoView({ block: 'center' }); });
    await sleep(400);
    await page.screenshot({ path: __dirname + '/av-w2-steps-' + theme + '.png' });
  }
  await browser.close();
  fs.writeFileSync(__dirname + '/av-w2-results.json', JSON.stringify(R, null, 2));
  const fails = R.checks.filter((c) => !c.pass).length;
  console.log('\nW2: ' + (R.checks.length - fails) + '/' + R.checks.length + ' pass');
  process.exit(fails ? 2 : 0);
})().catch((e) => { console.error('RIG FAIL', e); process.exit(1); });
