#!/usr/bin/env node
// assemble.js — deterministic context bundler for the CRS Brain prompt engine.
// Usage: node brain/engine/assemble.js --module <name|id> [--out <file>]
// Concatenates, VERBATIM and in fixed order: every context-map file (or anchored
// section) + the module's modules.json entry + decisions.md entries mentioning the
// module (+ the Locked Architecture Decisions section, always) + the module's
// STATUS.md slice (+ §6 Reusable Components, always). Zero LLM. Zero timestamps —
// same inputs must produce byte-identical output.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const MAP_FILE = path.join(__dirname, 'context-map.json');
const MODULES_FILE = path.join(REPO_ROOT, 'crs-brain', 'data', 'modules.json');
const DECISIONS_FILE = path.join(REPO_ROOT, 'decisions.md');
const STATUS_FILE = path.join(REPO_ROOT, 'brain', 'STATUS.md');

function read(rel) { return fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8'); }
function sep(label) { return '\n=== SOURCE: ' + label + ' ===\n'; }

// Slice from the line exactly matching `anchor` (trailing whitespace ignored) to the
// next heading of the same or higher level. Hard error if absent — a silently empty
// slice would change bundles without anyone deciding that.
function anchorSlice(content, anchor, where) {
  const lines = content.split('\n');
  const i = lines.findIndex(l => l.trimEnd() === anchor);
  if (i < 0) throw new Error('anchor not found in ' + where + ': "' + anchor + '"');
  const level = (anchor.match(/^#+/) || ['#'])[0].length;
  let j = i + 1;
  for (; j < lines.length; j++) {
    const m = lines[j].match(/^(#{1,6})\s/);
    if (m && m[1].length <= level) break;
  }
  return lines.slice(i, j).join('\n');
}

function loadMap() { return JSON.parse(fs.readFileSync(MAP_FILE, 'utf8')); }

function resolveModule(key) {
  const doc = JSON.parse(fs.readFileSync(MODULES_FILE, 'utf8'));
  const k = String(key || '').trim().toLowerCase();
  if (!k) throw new Error('--module is required');
  let hit = doc.modules.find(m => m.id.toLowerCase() === k)
        || doc.modules.find(m => m.name.toLowerCase() === k);
  if (!hit) {
    const subs = doc.modules.filter(m => m.name.toLowerCase().includes(k) || m.id.toLowerCase().includes(k));
    if (subs.length === 1) hit = subs[0];
    else if (subs.length > 1) throw new Error('ambiguous module "' + key + '": ' + subs.map(m => m.id).join(', '));
  }
  if (!hit) throw new Error('unknown module "' + key + '" — not one of the locked 46 in crs-brain/data/modules.json');
  return hit;
}

// decisions.md → blocks split at each '## ' heading. Dated entries are LOCKED by the
// file's convention; [OPEN] stubs and the registry heading are EXCLUDED from bundles
// (they are guard.js input — injecting an open question would invite the model to
// argue with it).
function decisionsBlocks() {
  const txt = fs.readFileSync(DECISIONS_FILE, 'utf8');
  return txt.split(/\n(?=## )/).map(b => b.trim()).filter(b => b.startsWith('## '));
}

function decisionsForModule(mod) {
  const nameL = mod.name.toLowerCase(), idL = mod.id.toLowerCase();
  const out = [];
  for (const b of decisionsBlocks()) {
    const head = b.split('\n', 1)[0];
    if (/^## \[OPEN\]/.test(head) || /^## Open decisions registry/.test(head)) continue;
    const isLockedFooter = /^## Locked Architecture Decisions/.test(head);
    const bl = b.toLowerCase();
    if (isLockedFooter || bl.includes(nameL) || bl.includes(idL)) out.push({ head, body: b });
  }
  return out;
}

function statusSlices(mod) {
  const txt = fs.readFileSync(STATUS_FILE, 'utf8');
  const nameL = mod.name.toLowerCase();
  const out = [];
  // §2 table rows mentioning the module (kept with the header row of their table)
  const s2 = anchorSliceByNum(txt, 2);
  if (s2) {
    const rows = s2.split('\n').filter(l => l.startsWith('|') && l.toLowerCase().includes(nameL));
    if (rows.length) {
      const header = s2.split('\n').find(l => /^\|\s*Module\s*\|/i.test(l)) || '';
      const rule = s2.split('\n').find(l => /^\|\s*-{2,}/.test(l)) || '';
      out.push({ label: 'brain/STATUS.md (§2 rows: ' + mod.name + ')', body: [header, rule, ...rows].filter(Boolean).join('\n') });
    }
  }
  // §3 per-module slice, when present
  const s3 = anchorSliceByNum(txt, 3);
  if (s3) {
    const lines = s3.split('\n');
    const i = lines.findIndex(l => /^###\s/.test(l) && l.toLowerCase().includes(nameL));
    if (i >= 0) {
      let j = i + 1;
      for (; j < lines.length; j++) if (/^(###|##)\s/.test(lines[j])) break;
      out.push({ label: 'brain/STATUS.md (§3 slice: ' + mod.name + ')', body: lines.slice(i, j).join('\n') });
    }
  }
  // §6 Reusable Components — always (feeds EXISTING REUSABLES BY ID)
  const s6 = anchorSliceByNum(txt, 6);
  if (s6) out.push({ label: 'brain/STATUS.md (§6 Reusable Components)', body: s6 });
  return out;
}

// Locate '## N.' sections by number — stable against title rewording.
function anchorSliceByNum(txt, n) {
  const lines = txt.split('\n');
  const re = new RegExp('^## ' + n + '\\.');
  const i = lines.findIndex(l => re.test(l));
  if (i < 0) return null;
  let j = i + 1;
  for (; j < lines.length; j++) if (/^##\s/.test(lines[j])) break;
  return lines.slice(i, j).join('\n');
}

function assemble(moduleKey) {
  const map = loadMap();
  const mod = resolveModule(moduleKey);
  const parts = ['=== CRS BRAIN PROMPT-ENGINE BUNDLE v1 | module: ' + mod.id + ' ==='];
  for (const role of map.order) {
    const entries = map.roles[role];
    if (!entries) throw new Error('role missing from context-map.json: ' + role);
    parts.push('\n===== ROLE: ' + role + ' =====');
    for (const e of entries) {
      const content = read(e.path);
      if (e.anchor) parts.push(sep(e.path + ' § ' + e.anchor) + anchorSlice(content, e.anchor, e.path));
      else parts.push(sep(e.path) + content);
    }
  }
  parts.push('\n===== MODULE BLOCK: ' + mod.id + ' =====');
  parts.push(sep('crs-brain/data/modules.json (module ' + mod.id + ')') + JSON.stringify(mod, null, 2));
  for (const d of decisionsForModule(mod)) parts.push(sep('decisions.md (' + d.head.replace(/^## /, '') + ')') + d.body);
  for (const s of statusSlices(mod)) parts.push(sep(s.label) + s.body);
  const text = parts.join('\n') + '\n';
  return { text, module: mod, sha256: crypto.createHash('sha256').update(text).digest('hex') };
}

module.exports = { assemble, resolveModule, anchorSlice };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const get = f => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : null; };
  try {
    const r = assemble(get('--module'));
    const out = get('--out');
    if (out) { fs.writeFileSync(out, r.text); console.error('bundle → ' + out + '\nsha256 ' + r.sha256 + '  (' + r.text.length + ' bytes)'); }
    else process.stdout.write(r.text);
  } catch (e) { console.error('assemble: ' + e.message); process.exit(1); }
}
