#!/usr/bin/env node
/* CRS Brain — ask_vlad MCP shim (stdio).
 * Registered into every brain/BP claude session via --mcp-config. The session
 * calls the ask_vlad tool when it needs Vlad's input; this shim relays the ask
 * to the CRS Brain server (which renders the clickable card, fires the
 * knock-knock notification, and holds the answer) and LONG-POLLS until Vlad
 * answers — the tool's return value IS the answer, so the session truly blocks.
 * Zero deps; speaks minimal MCP (initialize / tools-list / tools-call).
 */
const PORT = process.env.CRS_ASK_PORT || '4317';
const CHAT = process.env.CRS_ASK_CHAT || '';
const BASE = 'http://127.0.0.1:' + PORT;

const TOOL = {
  name: 'ask_vlad',
  description: 'Ask Vlad an OPERATIONAL question with clickable options and BLOCK until he answers (fix path, proceed/park, scope, naming). NEVER ask in prose — a question written as a paragraph is a contract violation, and the server will intercept it and raise a card anyway. For ARCHITECTURAL choices, or anything touching an [OPEN] decision in decisions.md, use decide_with_vlad instead; if you use this tool for one by mistake the server upgrades it to a decision card automatically. The return value is his answer: one of your option labels, "recommend" (present your recommendation + one-line tradeoffs as a NEW ask_vlad call with that option first — do not just proceed), or free text he typed.',
  inputSchema: {
    type: 'object',
    properties: {
      question: { type: 'string', description: 'The question, one sentence, specific' },
      context: { type: 'string', description: 'Optional 1-3 lines of context shown collapsed' },
      options: { type: 'array', minItems: 2, maxItems: 6, items: { type: 'object', properties: { label: { type: 'string' }, hint: { type: 'string' } }, required: ['label'] } },
    },
    required: ['question', 'options'],
  },
};

// The decision card: same blocking contract, different semantics. No "recommend"
// shortcut and no standing-answer path — Vlad makes an architectural call
// himself — and his choice is written to decisions.md as a candidate to ratify.
const TOOL_DECISION = {
  name: 'decide_with_vlad',
  description: 'Put an ARCHITECTURAL choice to Vlad as a decision card with clickable options and BLOCK until he answers. Use this for anything that would become a locked ruling, and for anything touching an [OPEN] decision in decisions.md — instead of writing DECISION-NEEDED or a prose paragraph. His answer is recorded in decisions.md as a CANDIDATE entry for him to ratify. There is no "recommend" shortcut and no standing-answer path here: he must make the call himself. The return value is his chosen option label, or free text he typed.',
  inputSchema: {
    type: 'object',
    properties: {
      question: { type: 'string', description: 'The decision, one sentence, specific' },
      context: { type: 'string', description: 'The trade-offs, 1-5 lines, shown collapsed on the card' },
      options: { type: 'array', minItems: 2, maxItems: 6, items: { type: 'object', properties: { label: { type: 'string' }, hint: { type: 'string' } }, required: ['label'] } },
    },
    required: ['question', 'options'],
  },
};

async function relayAsk(args, kind) {
  const r = await fetch(BASE + '/api/ask', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId: CHAT, question: args.question || '', context: args.context || '', options: args.options || [], kind: kind === 'decision' ? 'decision' : 'ask' }),
  });
  const j = await r.json();
  if (j.error) return 'ASK REJECTED: ' + j.error;                       // validation only — the [OPEN] boundary now upgrades instead of rejecting
  if (j.answer !== undefined) return 'Vlad answered (standing Playbook rule, auto): ' + j.answer;
  // The server may have UPGRADED an operational ask to a decision card because it
  // touched an [OPEN] decision. Say so, so the session knows the answer will be
  // recorded in decisions.md rather than treated as a throwaway operational pick.
  const upgraded = kind !== 'decision' && j.kind === 'decision';
  // long-poll until answered — the server exempts the session from idle-kill meanwhile
  for (;;) {
    const w = await fetch(BASE + '/api/ask/wait?id=' + encodeURIComponent(j.id) + '&t=25000');
    const a = await w.json();
    if (a.answered) return (upgraded ? 'This touched an [OPEN] decision, so it was raised as a DECISION card and his answer is recorded in decisions.md as a candidate. Vlad decided: ' : (kind === 'decision' ? 'Vlad decided (recorded in decisions.md as a candidate): ' : 'Vlad answered: ')) + a.answer;
  }
}

// ---- minimal MCP stdio server ----
let buf = '';
process.stdin.on('data', (d) => {
  buf += d;
  let nl;
  while ((nl = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, nl).trim(); buf = buf.slice(nl + 1);
    if (!line) continue;
    let msg; try { msg = JSON.parse(line); } catch { continue; }
    handle(msg);
  }
});
function reply(id, result) { process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n'); }
function replyErr(id, message) { process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, error: { code: -32000, message } }) + '\n'); }
async function handle(msg) {
  const { id, method, params } = msg;
  if (method === 'initialize') return reply(id, { protocolVersion: params && params.protocolVersion || '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'crs-ask', version: '1.0.0' } });
  if (method === 'notifications/initialized') return;   // notification, no reply
  if (method === 'tools/list') return reply(id, { tools: [TOOL, TOOL_DECISION] });
  if (method === 'tools/call') {
    const name = params && params.name;
    if (name !== 'ask_vlad' && name !== 'decide_with_vlad') return replyErr(id, 'unknown tool');
    try {
      const text = await relayAsk(params.arguments || {}, name === 'decide_with_vlad' ? 'decision' : 'ask');
      return reply(id, { content: [{ type: 'text', text }] });
    } catch (e) { return replyErr(id, 'ask relay failed: ' + e.message); }
  }
  if (id !== undefined) return replyErr(id, 'unsupported method: ' + method);
}
process.stdin.on('end', () => process.exit(0));
