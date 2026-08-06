// Routing is deliberated and re-decided on EVERY message. Uses the preview
// endpoint, so the whole suite costs zero model calls.
const http = require('http');
let fails = 0;
const check = (n, ok, d) => { console.log((ok ? 'PASS' : 'FAIL'), n, d || ''); if (!ok) fails++; };
const get = (qs) => new Promise((res, rej) => {
  http.get('http://127.0.0.1:4317/api/route-preview?' + qs, (r) => { let b = ''; r.on('data', (c) => b += c); r.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(new Error(b.slice(0, 120))); } }); }).on('error', rej);
});
const q = (m, extra = '') => get('m=' + encodeURIComponent(m) + (extra ? '&' + extra : ''));

(async () => {
  const chat = await q('hi');
  check('small talk stays cheap', chat.model === 'claude-sonnet-5' && chat.effort === 'medium', JSON.stringify([chat.model, chat.effort]));

  const quick = await q('give me a screenshot of the index page');
  check('mechanical one-liner drops to low', quick.effort === 'low' && quick.model === 'claude-sonnet-5', quick.label);

  const deep = await q('audit the user management module and analyse why the privacy rules fail');
  check('audit/analyse escalates to Opus', /opus/.test(deep.model) && ['high', 'max', 'ultracode'].includes(deep.effort), deep.label);

  const orch = await q('implement the whole module end-to-end: build the data types, then also update the privacy rules and wire up the workflows across every page');
  check('multi-step build reaches ultracode', orch.effort === 'ultracode' && /opus/.test(orch.model), orch.label);

  // risk floor: casual phrasing, dangerous work
  const risky = await q('just delete the old option set in production, quick one');
  check('risky work never runs cheap however casually phrased', /opus/.test(risky.model) && risky.effort !== 'low' && risky.effort !== 'medium', risky.label + ' :: ' + risky.why.join(' | '));

  // cross-turn escalation — the signal the old router could not see
  const first = await q('the header looks wrong');
  const again = await q('still wrong, terrible', 'turns=4&last=claude-sonnet-5');
  check('a follow-up after a miss escalates', again.depth > first.depth, `${first.depth.toFixed(2)} -> ${again.depth.toFixed(2)} (${again.model})`);
  check('escalation is explained, not silent', again.why.some((w) => /escalat/i.test(w)), JSON.stringify(again.why));

  const onOpus = await q('still broken, same issue', 'turns=4&last=claude-opus-5');
  check('already on Opus → spend thinking instead', /opus/.test(onOpus.model) && ['max', 'ultracode'].includes(onOpus.effort), onOpus.label + ' :: ' + onOpus.why.join(' | '));

  // context signals the old router ignored entirely
  const atts = await q('what do you think of this', 'atts=3');
  const noAtts = await q('what do you think of this');
  check('attachments raise the bar', atts.depth > noAtts.depth, `${noAtts.depth.toFixed(2)} -> ${atts.depth.toFixed(2)}`);

  const les = await q('change the module', 'lessons=2');
  const noLes = await q('change the module');
  check('playbook lessons in play raise the bar', les.depth > noLes.depth, `${noLes.depth.toFixed(2)} -> ${les.depth.toFixed(2)}`);

  const paths = await q('look at crs-brain/server.js and crs-brain/public/index.html and crs-brain/public/tokens.css');
  check('file paths count as depth', paths.why.some((w) => /file path/.test(w)), JSON.stringify(paths.why));

  const bubble = await q('add a privacy rule to the bubble test branch');
  check('Bubble work is treated as risky', bubble.risk >= 0.5 && /opus/.test(bubble.model), bubble.label);

  // re-decides per message: same endpoint, different answers, no stickiness
  const seq = [];
  for (const m of ['screenshot the page', 'audit the security model deeply and investigate the root cause', 'ok thanks']) seq.push((await q(m)).label);
  check('every message gets its own decision', new Set(seq).size === 3, JSON.stringify(seq));

  // the old leak: a previously pinned model must NOT become the auto target
  check('auto never resolves to a pinned model id', !/opus-4-8/.test(deep.model), deep.model);

  console.log(fails === 0 ? 'ROUTING: ALL PASS' : `ROUTING: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
