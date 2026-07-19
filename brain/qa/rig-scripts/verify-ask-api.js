// Ask Protocol — API + MCP-shim verification (zero model spend):
//  A. broker round-trip: create → pending → long-poll waiter → answer resolves it
//  B. standing answer: answer w/ standing → rule exists → re-ask auto-answers →
//     retire → card returns (pending again)
//  C. T5 boundary: ask touching an [OPEN] decision trigger → rejected
//  D. the ask-mcp shim speaks MCP over stdio end-to-end (initialize/list/call),
//     blocks, and returns Vlad's answer
//  E. persistence: role:'ask' message lands in the chat file; answered updates it
const { spawn } = require('child_process');
const fs = require('fs');
const BASE = 'http://127.0.0.1:4317';
const CHATS = 'C:/Users/CCTV Mgr/Projects/crs-progress/crs-brain/data/chats';
const CHAT_ID = 'testask0-0000-0000-0000-000000000001';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const check = (name, ok, detail) => { console.log((ok ? 'PASS' : 'FAIL'), name, detail || ''); if (!ok) fails++; };

(async () => {
  // fresh test chat file
  fs.writeFileSync(`${CHATS}/${CHAT_ID}.json`, JSON.stringify({ id: CHAT_ID, title: 'ASK TEST', bp: false, created: new Date().toISOString(), updated: new Date().toISOString(), messages: [{ role: 'user', content: 'test', ts: new Date().toISOString() }] }));

  // A. broker round-trip
  const mk = await (await fetch(BASE + '/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatId: CHAT_ID, question: 'Which widget style should the tiles use?', context: 'two candidates from the design pass', options: [{ label: 'Flat tiles' }, { label: 'Card tiles', hint: 'matches §20.4' }, { label: 'Park it' }] }) })).json();
  check('A1 ask created (pending id)', !!mk.id, JSON.stringify(mk));
  const pend = await (await fetch(BASE + '/api/ask/pending')).json();
  check('A2 pending list shows it', (pend.asks || []).some((a) => a.id === mk.id));
  const chat1 = JSON.parse(fs.readFileSync(`${CHATS}/${CHAT_ID}.json`));
  const askMsg = chat1.messages.find((m) => m.role === 'ask');
  check('E1 role:ask persisted in chat file', !!askMsg && askMsg.status === 'pending' && askMsg.options.length === 3, JSON.stringify((askMsg || {}).options || []));
  const notifs = await (await fetch(BASE + '/api/notifications')).json();
  check('A3 question-pending notification fired', JSON.stringify(notifs).includes('question-pending'));
  // long-poll then answer while parked
  const waitP = fetch(BASE + '/api/ask/wait?id=' + mk.id + '&t=15000').then((r) => r.json());
  await sleep(800);
  const ans = await (await fetch(BASE + '/api/ask/answer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: mk.id, answer: 'Card tiles', standing: true }) })).json();
  check('A4 answer accepted, waiter was live (resumed)', ans.ok === true && ans.resumed === true, JSON.stringify(ans));
  const waited = await waitP;
  check('A5 long-poll resolved with the answer', waited.answered === true && waited.answer === 'Card tiles', JSON.stringify(waited));
  const chat2 = JSON.parse(fs.readFileSync(`${CHATS}/${CHAT_ID}.json`));
  const askMsg2 = chat2.messages.find((m) => m.role === 'ask');
  check('E2 chat message updated to answered', askMsg2.status === 'answered' && askMsg2.answer === 'Card tiles');

  // B. standing rule → auto-answer → retire → pending again
  const rules = await (await fetch(BASE + '/api/ask/standing')).json();
  const rule = (rules.rules || []).find((r) => r.question.includes('widget style'));
  check('B1 standing rule exists (Playbook)', !!rule && rule.active !== false, JSON.stringify(rule || {}));
  const re = await (await fetch(BASE + '/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatId: CHAT_ID, question: 'Which widget style should the tiles use?', options: [{ label: 'Flat tiles' }, { label: 'Card tiles', hint: 'matches §20.4' }, { label: 'Park it' }] }) })).json();
  check('B2 re-ask auto-answered from Playbook', re.answer === 'Card tiles', JSON.stringify(re));
  const rules2 = await (await fetch(BASE + '/api/ask/standing')).json();
  check('B3 hits incremented', ((rules2.rules || []).find((r) => r.sig === rule.sig) || {}).hits >= 1);
  await fetch(BASE + '/api/ask/standing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sig: rule.sig, active: false }) });
  const re2 = await (await fetch(BASE + '/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatId: CHAT_ID, question: 'Which widget style should the tiles use?', options: [{ label: 'Flat tiles' }, { label: 'Card tiles', hint: 'matches §20.4' }, { label: 'Park it' }] }) })).json();
  check('B4 retired rule → card returns (pending)', !!re2.id && re2.answer === undefined, JSON.stringify(re2));
  await fetch(BASE + '/api/ask/answer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: re2.id, answer: 'Park it' }) });

  // C. boundary: [OPEN] decision triggers (decisions.md stubs)
  const bad = await (await fetch(BASE + '/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatId: CHAT_ID, question: 'Should I add the privacy rule on Company own-table now?', options: [{ label: 'Yes' }, { label: 'No' }] }) })).json();
  check('C1 [OPEN]-decision ask rejected with DECISION-NEEDED instruction', !!bad.error && /DECISION-NEEDED/i.test(bad.error), (bad.error || '').slice(0, 120));

  // D. the MCP shim end-to-end (stdio)
  const shim = spawn(process.execPath, ['C:/Users/CCTV Mgr/Projects/crs-progress/crs-brain/ask-mcp.js'], { env: { ...process.env, CRS_ASK_CHAT: CHAT_ID, CRS_ASK_PORT: '4317' } });
  let out = '';
  shim.stdout.on('data', (d) => (out += d));
  const rpc = (o) => shim.stdin.write(JSON.stringify(o) + '\n');
  rpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2024-11-05' } });
  rpc({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
  await sleep(400);
  check('D1 shim initialize + tools/list', out.includes('crs-ask') && out.includes('ask_vlad'));
  rpc({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'ask_vlad', arguments: { question: 'Shim test: proceed or park?', options: [{ label: 'Proceed' }, { label: 'Park' }] } } });
  await sleep(1200);
  check('D2 shim call is BLOCKING (no reply yet)', !out.includes('"id":3'));
  const pend2 = await (await fetch(BASE + '/api/ask/pending')).json();
  const shimAsk = (pend2.asks || []).find((a) => a.question.startsWith('Shim test'));
  check('D3 shim ask reached the broker', !!shimAsk);
  await fetch(BASE + '/api/ask/answer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: shimAsk.id, answer: 'Proceed' }) });
  await sleep(1500);
  check('D4 shim returned Vlad\'s answer to the session', out.includes('"id":3') && out.includes('Vlad answered: Proceed'), out.split('\n').filter((l) => l.includes('"id":3')).join('').slice(0, 160));
  shim.kill();

  // cleanup
  fs.unlinkSync(`${CHATS}/${CHAT_ID}.json`);
  console.log(fails === 0 ? 'VERIFY: ALL PASS' : `VERIFY: ${fails} FAIL`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('RIG ERROR:', e.message); process.exit(2); });
