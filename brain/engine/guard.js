#!/usr/bin/env node
// guard.js — hard decision-guard for the CRS Brain prompt engine. Runs BEFORE any
// model call; no model is involved here. Scans the intent (+ module) against the
// [OPEN] entries in decisions.md (each carries a 'Triggers:' keyword line). A hit
// exits non-zero and generation must not happen — an open architectural decision is
// never made by a prompt generator.
// Usage: node brain/engine/guard.js --intent "<text>" --module <name|id>
// Exit codes: 0 = pass · 2 = DECISION-NEEDED · 1 = usage/parse error.
'use strict';
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DECISIONS_FILE = path.join(REPO_ROOT, 'decisions.md');

// Parse decisions.md for '## [OPEN] <title>' blocks and their 'Triggers:' lines.
function openEntries() {
  const txt = fs.readFileSync(DECISIONS_FILE, 'utf8');
  const blocks = txt.split(/\n(?=## )/).filter(b => b.startsWith('## [OPEN]'));
  return blocks.map(b => {
    const title = b.split('\n', 1)[0].replace(/^## \[OPEN\]\s*/, '').trim();
    const tl = b.split('\n').find(l => /^Triggers:/i.test(l));
    const triggers = tl ? tl.replace(/^Triggers:\s*/i, '').split(',').map(s => s.trim()).filter(Boolean) : [];
    return { title, triggers };
  });
}

// Case-insensitive phrase match, tolerant of whitespace/hyphen variation inside the
// trigger phrase ("own-table" also hits "own table"), anchored on word boundaries so
// short triggers can't fire inside unrelated words.
function phraseRe(trigger) {
  const esc = trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[\s-]+/g, '[\\s-]+');
  return new RegExp('(^|[^a-z0-9])' + esc + '([^a-z0-9]|$)', 'i');
}

function guard(intent, moduleKey) {
  const hay = String(intent || '') + ' ' + String(moduleKey || '');
  const hits = [];
  for (const e of openEntries()) {
    const t = e.triggers.find(t => phraseRe(t).test(hay));
    if (t) hits.push({ title: e.title, trigger: t });
  }
  return hits;
}

module.exports = { guard, openEntries };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const get = f => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : null; };
  const intent = get('--intent'), mod = get('--module');
  if (!intent) { console.error('usage: guard.js --intent "<text>" [--module <name|id>]'); process.exit(1); }
  try {
    const hits = guard(intent, mod);
    if (hits.length) {
      for (const h of hits) console.error('DECISION-NEEDED: ' + h.title + ' → decisions.md  (trigger: "' + h.trigger + '")');
      console.error('Generation stopped. Make the call in decisions.md (replace the [OPEN] stub with a dated entry), then re-run.');
      process.exit(2);
    }
    console.log('GUARD PASS — no open decision touched (' + openEntries().length + ' [OPEN] entries scanned).');
  } catch (e) { console.error('guard: ' + e.message); process.exit(1); }
}
