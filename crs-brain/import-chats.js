#!/usr/bin/env node
/*
 * Import chat history into CRS Brain (crs-brain/data/chats/), dated chronologically.
 *
 * Two sources:
 *   node crs-brain/import-chats.js
 *       → imports THIS machine's Claude Code session transcripts
 *         (~/.claude/projects/** .jsonl, subagent transcripts skipped)
 *   node crs-brain/import-chats.js --claude-export path/to/conversations.json
 *       → imports a claude.ai account export (Settings → Privacy → Export data)
 *
 * Idempotent: each source chat gets a stable id — re-running updates, never duplicates.
 * Imported chats are archives (not resumable); titles start with their date so the
 * list reads chronologically. Attachment names are preserved on messages.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const CHATS_DIR = path.join(__dirname, 'data', 'chats');
fs.mkdirSync(CHATS_DIR, { recursive: true });

const short = (s, n) => (s || '').replace(/\s+/g, ' ').trim().slice(0, n);
const day = (iso) => (iso || '').slice(0, 10);
const hhmm = (iso) => (iso || '').slice(11, 16);

function saveChat(chat) {
  fs.writeFileSync(path.join(CHATS_DIR, `${chat.id}.json`), JSON.stringify(chat, null, 2));
}

// ---- Claude Code JSONL transcripts ------------------------------------------
function textOf(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  const out = [];
  for (const b of content) {
    if (b.type === 'text' && b.text) out.push(b.text);
    else if (b.type === 'image') out.push('[attached image]');
  }
  return out.join('\n').trim();
}

function importTranscript(file, sourceLabel) {
  const lines = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean);
  const messages = [];
  let first = null, last = null;
  for (const line of lines) {
    let ev; try { ev = JSON.parse(line); } catch { continue; }
    if (ev.type !== 'user' && ev.type !== 'assistant') continue;
    if (ev.isMeta || ev.isCompactSummary) continue;
    const role = ev.message?.role;
    if (role !== 'user' && role !== 'assistant') continue;
    const text = textOf(ev.message.content);
    if (!text) continue;
    if (text.startsWith('<system-reminder>') || text.startsWith('<local-command') ||
        text.startsWith('[SYSTEM NOTIFICATION') || text.startsWith('<command-')) continue;
    const ts = ev.timestamp || null;
    first = first || ts; last = ts || last;
    messages.push({ role, content: text, ts });
  }
  if (!messages.some((m) => m.role === 'user')) return null;
  const firstUser = messages.find((m) => m.role === 'user');
  const id = 'import-cc-' + crypto.createHash('sha1').update(file).digest('hex').slice(0, 12);
  return {
    id,
    title: `${day(first)} ${hhmm(first)} · ${short(firstUser.content, 44)} · [${sourceLabel}]`,
    sessionId: null, imported: { source: 'claude-code', file },
    created: first, updated: last, messages,
  };
}

function importClaudeCode() {
  const root = path.join(os.homedir(), '.claude', 'projects');
  const host = os.hostname().split('.')[0];
  let files = [];
  (function walk(d) {
    let es; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of es) {
      if (e.isDirectory()) { if (e.name !== 'subagents') walk(path.join(d, e.name)); }
      else if (e.name.endsWith('.jsonl')) files.push(path.join(d, e.name));
    }
  })(root);
  let n = 0;
  for (const f of files) {
    const chat = importTranscript(f, `Claude Code · ${host}`);
    if (chat) { saveChat(chat); n++; }
  }
  console.log(`Imported ${n} Claude Code session(s) from ${files.length} transcript(s) on ${host}.`);
}

// ---- claude.ai account export (conversations.json) ---------------------------
function importClaudeAi(file) {
  const convs = JSON.parse(fs.readFileSync(file, 'utf8'));
  let n = 0;
  for (const c of convs) {
    const msgs = (c.chat_messages || []).map((m) => {
      const atts = [...(m.attachments || []), ...(m.files || [])]
        .map((a) => a.file_name || a.name).filter(Boolean);
      let text = m.text || (m.content || []).map((b) => b.text || '').join('\n');
      return {
        role: m.sender === 'human' ? 'user' : 'assistant',
        content: text || (atts.length ? '(attachments only)' : ''),
        ts: m.created_at, ...(atts.length ? { attachments: atts } : {}),
      };
    }).filter((m) => m.content);
    if (!msgs.length) continue;
    const created = c.created_at || msgs[0].ts;
    saveChat({
      id: 'import-ai-' + (c.uuid || crypto.createHash('sha1').update(JSON.stringify(c)).digest('hex').slice(0, 12)),
      title: `${day(created)} ${hhmm(created)} · ${short(c.name || msgs[0].content, 44)} · [claude.ai]`,
      sessionId: null, imported: { source: 'claude.ai' },
      created, updated: c.updated_at || msgs[msgs.length - 1].ts, messages: msgs,
    });
    n++;
  }
  console.log(`Imported ${n} claude.ai conversation(s).`);
}

// ---- main --------------------------------------------------------------------
const argIdx = process.argv.indexOf('--claude-export');
if (argIdx >= 0) {
  const p = process.argv[argIdx + 1];
  if (!p || !fs.existsSync(p)) { console.error('Usage: --claude-export <conversations.json>'); process.exit(1); }
  importClaudeAi(p);
} else {
  importClaudeCode();
}
console.log('Done. Open CRS Brain → Chats. Commit crs-brain/data to sync between machines.');
