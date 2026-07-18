#!/usr/bin/env node
/*
 * brain/engine/chunk.js — prototype → Buildprint chunk pipeline.
 *
 * Stages (each deterministic except emission's one boxed model call, which the
 * server performs via runClaudeStream — this module never calls a model):
 *   map  <name>          → prototypes/<name>/mapping.md   (the drift-killer)
 *   plan <name>          → prototypes/<name>/build-plan.json (T3)
 *   emit <name> <chunk>  → guarded intent text for the engine's gen (T4)
 *
 * Hard rules, enforced here:
 *   - mapping/plan/emit run ONLY on a settled prototype hash;
 *   - chunking REFUSES while unresolved FLAG rows exist;
 *   - the chunker never invents a token, style, or approval — every lookup is
 *     find-first against brain/design/style-inventory.json; anything unmatched
 *     becomes an explicit FLAGGED or "create" row for Vlad to rule on.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const PROTOS_DIR = path.join(REPO_ROOT, 'prototypes');
const inventory = require('./style-inventory.js');

// ---- shared -----------------------------------------------------------------
function protoPaths(name) {
  const dir = path.join(PROTOS_DIR, name);
  return { dir, html: path.join(dir, name + '.html'), json: path.join(dir, 'proto.json'), mapping: path.join(dir, 'mapping.md'), plan: path.join(dir, 'build-plan.json'), chunks: path.join(dir, 'chunks') };
}
function loadProto(name) {
  const p = protoPaths(name);
  const j = JSON.parse(fs.readFileSync(p.json, 'utf8'));
  j.name = name;
  return j;
}
function htmlHash(name) {
  return crypto.createHash('sha256').update(fs.readFileSync(protoPaths(name).html)).digest('hex');
}
// Settle gate used by every stage: status settled/built AND bytes match the hash.
function requireSettled(name) {
  const j = loadProto(name);
  if (j.status !== 'settled' && j.status !== 'built') throw new Error('prototype "' + name + '" is ' + j.status + ' — Mark settled first (chunks generate only from a settled hash)');
  const cur = htmlHash(name);
  if (cur !== j.settledHash) throw new Error('prototype "' + name + '" html no longer matches its settled hash — re-settle first');
  return { proto: j, hash: cur };
}

// ---- css extraction (prototype-grade parser, deterministic) -----------------
function normHex(v) {
  const m = String(v).trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1].toUpperCase();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return '#' + h;
}
function normColor(v) {
  const hex = normHex(v);
  if (hex) return hex;
  const m = String(v).trim().match(/^rgba?\(([^)]+)\)$/i);
  if (m) return 'rgba(' + m[1].split(',').map((s) => s.trim()).join(',') + ')';
  return null;
}
function rgbOf(v) {
  const hex = normHex(v);
  if (hex) return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
  const m = String(v).match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  return m ? [+m[1], +m[2], +m[3]] : null;
}
// All `selector { declarations }` pairs from every <style> block, with the
// file line each declaration starts on.
function cssRules(html) {
  const rules = [];
  const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let sm;
  while ((sm = styleRe.exec(html))) {
    const css = sm[1];
    const baseLine = html.slice(0, sm.index).split('\n').length;
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let rm;
    while ((rm = ruleRe.exec(css))) {
      const selector = rm[1].trim().replace(/\s+/g, ' ');
      const line = baseLine + css.slice(0, rm.index).split('\n').length - 1;
      const decls = [];
      for (const d of rm[2].split(';')) {
        const i = d.indexOf(':');
        if (i < 1) continue;
        decls.push({ prop: d.slice(0, i).trim(), value: d.slice(i + 1).trim() });
      }
      if (selector && decls.length) rules.push({ selector, line, decls });
    }
  }
  return rules;
}

// ---- the mapping pass -------------------------------------------------------
const COMPONENT_DETECTORS = [
  { re: /seg|segment/i, family: '20.1' }, { re: /check|radio|switch|toggle/i, family: '20.2' },
  { re: /picker|date/i, family: '20.3' }, { re: /kpi|tile|stat/i, family: '20.4' },
  { re: /avatar/i, family: '20.5' }, { re: /table|thead|tbody|\btr\b|grid-row|list-row/i, family: '20.6' },
  { re: /chip|badge|tag|pill/i, family: '20.7' }, { re: /\bbtn|button/i, family: 'buttons' },
  { re: /modal|popup|dialog/i, family: 'modal' }, { re: /menu/i, family: 'menu' },
  { re: /dropdown|select|filter/i, family: 'dropdown' }, { re: /toast|notif/i, family: 'toast' },
  { re: /sidebar|siderail/i, family: 'sidebar' }, { re: /\brow\b|card|panel|container|stage|wrap/i, family: 'layout' },
];
const IGNORE_VALUES = new Set(['transparent', 'currentcolor', 'inherit', 'initial', 'unset', 'none', '#fff0']);

function buildTokenIndex(inv) {
  const byName = new Map(inv.tokens.map((t) => [t.name, t]));
  const byValue = new Map();
  // Two passes: every dark value first, then light — a hex that exists in both
  // themes resolves to its dark (canonical-theme) token, never a light stand-in.
  for (const theme of ['dark', 'light']) {
    for (const t of inv.tokens) {
      const v = t[theme];
      if (!v) continue;
      const norm = normColor(v) || String(v).trim();
      if (!byValue.has(norm)) byValue.set(norm, { token: t.name, theme });
    }
  }
  return { byName, byValue };
}
function canonicalName(name, inv, idx) {
  if (idx.byName.has(name)) return name;
  if (inv.aliases[name] && idx.byName.has(inv.aliases[name])) return inv.aliases[name];
  return null;
}
function nearestToken(value, inv, kind) {
  if (kind === 'color') {
    const rgb = rgbOf(value);
    if (!rgb) return null;
    let best = null, bd = Infinity;
    for (const t of inv.tokens) {
      const tr = rgbOf(t.dark) || rgbOf(t.light || '');
      if (!tr) continue;
      const d = (rgb[0] - tr[0]) ** 2 + (rgb[1] - tr[1]) ** 2 + (rgb[2] - tr[2]) ** 2;
      if (d < bd) { bd = d; best = t.name; }
    }
    return best;
  }
  const px = parseFloat(value);
  if (!isFinite(px)) return null;
  let best = null, bd = Infinity;
  for (const t of inv.tokens) {
    if (!/^--radius|^--h-/.test(t.name)) continue;
    const tv = parseFloat(t.dark);
    if (!isFinite(tv)) continue;
    const d = Math.abs(tv - px);
    if (d < bd) { bd = d; best = t.name; }
  }
  return best;
}
// find-first: an attested style/reusable for a component family.
function findFirstStyle(family, inv) {
  const fam = inv.families.find((f) => f.id === family);
  const hay = ((fam && fam.name) || family).toLowerCase();
  for (const s of inv.styles) {
    const n = s.name.toLowerCase();
    if (family === '20.7' && /chip/.test(n)) return { name: s.name, provenance: s.provenance };
    if (family === '20.1' && /^zz/.test(n)) return { name: s.name, provenance: s.provenance };
    if (family === '20.3' && /primary/.test(n)) return { name: s.name, provenance: s.provenance };
    if (family === 'layout' && /card/.test(n)) return { name: s.name, provenance: s.provenance };
    if (hay.includes('input') && /input/.test(n)) return { name: s.name, provenance: s.provenance };
  }
  for (const r of inv.reusables) {
    const n = r.name.toLowerCase();
    if (family === '20.2' && /toggle/.test(n)) return { name: r.name, ids: r.ids, provenance: r.provenance };
    if (family === 'dropdown' && /dropdown/.test(n)) return { name: r.name, ids: r.ids, provenance: r.provenance };
    if (family === 'sidebar' && /sidebar/.test(n)) return { name: r.name, ids: r.ids, provenance: r.provenance };
    if (family === 'menu' && /menu/.test(n)) return { name: r.name, ids: r.ids, provenance: r.provenance };
  }
  return null;
}
function flagKey(f) { return [f.kind, f.value, f.selector || '', f.prop || ''].join('|'); }

function computeMapping(name) {
  const { proto, hash } = requireSettled(name);
  const p = protoPaths(name);
  const html = fs.readFileSync(p.html, 'utf8');
  const inv = inventory.loadInventory();
  const idx = buildTokenIndex(inv);
  const rules = cssRules(html);

  // 1. The file's own :root token declarations — the stale-token check.
  const localTokens = [];
  for (const r of rules.filter((r) => /:root/.test(r.selector))) {
    for (const d of r.decls) {
      if (!d.prop.startsWith('--')) continue;
      const canonical = canonicalName(d.prop, inv, idx);
      const canon = canonical ? idx.byName.get(canonical) : null;
      const nrm = (s) => String(s).replace(/\s*,\s*/g, ',').replace(/\s+/g, ' ').replace(/["']/g, '').trim();
      const fileNorm = normColor(d.value) || nrm(d.value);
      const canonNorm = canon ? (normColor(canon.dark) || nrm(canon.dark)) : null;
      localTokens.push({
        declared: d.prop, value: d.value, canonical, canonDark: canon ? canon.dark : null,
        verdict: !canonical ? 'UNKNOWN' : (fileNorm === canonNorm ? 'MATCH' : 'STALE'),
        line: r.line,
      });
    }
  }

  // 2. Every var(--x) usage outside the declarations.
  const varUse = new Map();
  for (const r of rules) {
    if (/:root/.test(r.selector)) continue;
    for (const d of r.decls) {
      for (const m of d.value.matchAll(/var\((--[a-z0-9-]+)\)/gi)) {
        const v = m[1];
        if (!varUse.has(v)) varUse.set(v, []);
        varUse.get(v).push(r.selector);
      }
    }
  }
  const tokenRows = [...varUse.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([v, sels]) => {
    const canonical = canonicalName(v, inv, idx);
    const t = canonical ? idx.byName.get(canonical) : null;
    return {
      var: v, canonical, dark: t ? t.dark : null, light: t ? t.light : null,
      selectors: [...new Set(sels)],
      style: '(none attested for this token — style mapping happens at component rows)',
    };
  });

  // 3. Literals in declarations (colors + radius/height px) not written as var().
  const flags = [];
  const matched = [];
  for (const r of rules) {
    if (/:root/.test(r.selector)) continue;
    for (const d of r.decls) {
      const values = [];
      for (const cm of d.value.matchAll(/#[0-9a-f]{3,6}\b|rgba?\([^)]*\)/gi)) values.push({ kind: 'color', raw: cm[0] });
      if (/^border-radius$/i.test(d.prop)) {
        for (const pm of d.value.matchAll(/(\d+(?:\.\d+)?)px/g)) values.push({ kind: 'px', raw: pm[0] });
      }
      for (const v of values) {
        if (d.value.includes('var(') && !/#|rgba?\(/.test(d.value.replace(/var\([^)]*\)/g, ''))) continue;
        const norm = v.kind === 'color' ? normColor(v.raw) : v.raw;
        if (!norm || IGNORE_VALUES.has(String(norm).toLowerCase())) continue;
        const hit = idx.byValue.get(norm);
        const loc = { selector: r.selector, prop: d.prop, line: r.line };
        if (hit) matched.push({ value: v.raw, ...loc, token: hit.token, theme: hit.theme, fix: 'replace with var(' + hit.token + ')' + (hit.theme === 'light' ? ' — NOTE: matched the LIGHT value; verify intent' : '') });
        else flags.push({ kind: 'literal', value: v.raw, ...loc, nearest: nearestToken(v.raw, inv, v.kind) });
      }
    }
  }
  // Stale/unknown local tokens are blocking drift too.
  for (const lt of localTokens) {
    if (lt.verdict === 'STALE') flags.push({ kind: 'stale-token', value: lt.declared + ':' + lt.value, selector: ':root', prop: lt.declared, line: lt.line, nearest: lt.canonical + ' = ' + lt.canonDark });
    if (lt.verdict === 'UNKNOWN') flags.push({ kind: 'unknown-token', value: lt.declared + ':' + lt.value, selector: ':root', prop: lt.declared, line: lt.line, nearest: null });
  }
  flags.sort((a, b) => a.line - b.line || flagKey(a).localeCompare(flagKey(b)));
  flags.forEach((f, i) => { f.id = 'f' + (i + 1); f.status = 'unresolved'; f.resolution = ''; });

  // Carry over resolutions from a previous mapping of the same prototype.
  const prev = readMappingData(name);
  if (prev && Array.isArray(prev.flags)) {
    const prevByKey = new Map(prev.flags.map((f) => [flagKey(f), f]));
    for (const f of flags) {
      const old = prevByKey.get(flagKey(f));
      if (old && old.status !== 'unresolved') { f.status = old.status; f.resolution = old.resolution; }
    }
  }

  // 4. Components — class selectors → family, find-first existing style/reusable.
  const classCounts = new Map();
  for (const m of html.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) classCounts.set(c, (classCounts.get(c) || 0) + 1);
  const compRows = [];
  const seenFam = new Map();
  for (const r of rules) {
    if (/:root|^html$|^body$|^\*$/.test(r.selector)) continue;
    const det = COMPONENT_DETECTORS.find((d) => d.re.test(r.selector));
    if (!det) continue;
    const base = r.selector.split(/[:\s>]/)[0];
    const k = det.family + '|' + base;
    if (seenFam.has(k)) continue;
    seenFam.set(k, true);
    const fam = inv.families.find((f) => f.id === det.family);
    const existing = findFirstStyle(det.family, inv);
    compRows.push({
      selector: base, family: det.family, familyName: fam ? fam.name : det.family, ref: fam ? fam.ref : '',
      existing: existing ? existing.name + (existing.ids && existing.ids.length ? ' (' + existing.ids.join(', ') + ')' : '') + ' — ' + existing.provenance : null,
      disposition: existing ? 'reuse/clone by ID — never recreate' : 'CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)',
    });
  }

  // 5. Interactions the prototype demonstrates.
  const interactions = [];
  const pseudo = new Map();
  for (const r of rules) {
    const pm = r.selector.match(/^([^:]+):(hover|active|focus|disabled|checked)/);
    if (pm) {
      const k = pm[1].trim();
      if (!pseudo.has(k)) pseudo.set(k, new Set());
      pseudo.get(k).add(pm[2]);
    }
    for (const d of r.decls) {
      if (/^transition/i.test(d.prop)) interactions.push('transition on ' + r.selector + ' → ' + d.value);
      if (/^transform/i.test(d.prop)) interactions.push('transform on ' + r.selector + ' → ' + d.value);
    }
  }
  for (const [sel, states] of pseudo) interactions.push(sel + ' states: ' + [...states].sort().join('/'));
  if (/addEventListener|onclick=/.test(html)) interactions.push('script-driven behavior present (<script>/onclick) — inventory manually before workflow chunks');
  if (/\bdisabled\b/.test(html)) interactions.push('disabled attribute states demonstrated');
  interactions.sort();

  return { proto, hash, inv, localTokens, tokenRows, flags, matched, compRows, interactions };
}

// ---- mapping.md render / read ----------------------------------------------
const DATA_FENCE_RE = /```json crs-mapping\n([\s\S]*?)\n```/;
function readMappingData(name) {
  try {
    const md = fs.readFileSync(protoPaths(name).mapping, 'utf8');
    const m = md.match(DATA_FENCE_RE);
    return m ? JSON.parse(m[1]) : null;
  } catch { return null; }
}
function unresolvedFlags(name) {
  const d = readMappingData(name);
  if (!d) return null; // no mapping yet
  return (d.flags || []).filter((f) => f.status === 'unresolved');
}
function renderMapping(m) {
  const L = [];
  L.push('# Mapping — ' + m.proto.name);
  L.push('');
  L.push('Prototype: prototypes/' + m.proto.name + '/' + m.proto.name + '.html');
  L.push('Settled-SHA256: ' + m.hash);
  L.push('Module: ' + m.proto.module);
  L.push('Inventory-Sources-SHA256: ' + m.inv.sourcesSha256 + ' (design-system-export.md ' + (m.inv.note.includes('PRESENT') ? 'present' : 'ABSENT — curated attested set') + ')');
  L.push('');
  L.push('## Tokens used (var → canonical → values)');
  L.push('');
  L.push('| var in file | canonical §2 token | dark | light | used by |');
  L.push('|---|---|---|---|---|');
  for (const t of m.tokenRows) L.push('| `' + t.var + '` | ' + (t.canonical ? '`' + t.canonical + '`' : '**UNRESOLVED**') + ' | ' + (t.dark || '—') + ' | ' + (t.light || '—') + ' | ' + t.selectors.slice(0, 4).join(', ') + (t.selectors.length > 4 ? ' +' + (t.selectors.length - 4) : '') + ' |');
  L.push('');
  L.push('## Local token block check (stale-token diff vs canon §2.10)');
  L.push('');
  L.push('| declared | file value | canonical | canon dark | verdict |');
  L.push('|---|---|---|---|---|');
  for (const t of m.localTokens) L.push('| `' + t.declared + '` | ' + t.value + ' | ' + (t.canonical ? '`' + t.canonical + '`' : '—') + ' | ' + (t.canonDark || '—') + ' | ' + t.verdict + ' |');
  L.push('');
  L.push('## Components detected (→ family, find-first existing)');
  L.push('');
  L.push('| selector | family | existing style / reusable | disposition |');
  L.push('|---|---|---|---|');
  for (const c of m.compRows) L.push('| `' + c.selector + '` | ' + c.familyName + ' (' + c.ref + ') | ' + (c.existing || '(none attested)') + ' | ' + c.disposition + ' |');
  L.push('');
  L.push('## Interactions demonstrated');
  L.push('');
  for (const i of m.interactions) L.push('- ' + i);
  L.push('');
  L.push('## FLAGGED — blocking until each is resolved (map / approve-as-literal / fix prototype)');
  L.push('');
  if (!m.flags.length) L.push('(none — clean)');
  else {
    L.push('| id | kind | value | location | nearest token | status | resolution |');
    L.push('|---|---|---|---|---|---|---|');
    for (const f of m.flags) L.push('| ' + f.id + ' | ' + f.kind + ' | `' + f.value + '` | ' + f.selector + ' · ' + f.prop + ' · L' + f.line + ' | ' + (f.nearest || '—') + ' | ' + f.status + ' | ' + (f.resolution || '') + ' |');
  }
  L.push('');
  L.push('## Value-matched literals (auto-mapped, non-blocking — fix in prototype when convenient)');
  L.push('');
  if (!m.matched.length) L.push('(none)');
  else {
    L.push('| value | location | matches token (theme) | suggested fix |');
    L.push('|---|---|---|---|');
    for (const x of m.matched) L.push('| `' + x.value + '` | ' + x.selector + ' · ' + x.prop + ' · L' + x.line + ' | `' + x.token + '` (' + x.theme + ') | ' + x.fix + ' |');
  }
  L.push('');
  L.push('```json crs-mapping');
  L.push(JSON.stringify({ name: m.proto.name, module: m.proto.module, settledHash: m.hash, inventorySha: m.inv.sourcesSha256, tokenRows: m.tokenRows, localTokens: m.localTokens, flags: m.flags, matched: m.matched, compRows: m.compRows, interactions: m.interactions }, null, 2));
  L.push('```');
  L.push('');
  return L.join('\n');
}
function writeMapping(name) {
  const m = computeMapping(name);
  fs.writeFileSync(protoPaths(name).mapping, renderMapping(m));
  return m;
}
// Resolve one flag: action = 'map' (to a canonical token), 'approve-literal',
// or 'fixed' (prototype was corrected — row closes; re-map will re-check).
function resolveFlag(name, flagId, action, token, who) {
  const d = readMappingData(name);
  if (!d) throw new Error('no mapping for "' + name + '" — run map first');
  const f = (d.flags || []).find((x) => x.id === flagId);
  if (!f) throw new Error('flag ' + flagId + ' not found');
  const inv = inventory.loadInventory();
  if (action === 'map') {
    if (!token || !inv.tokens.some((t) => t.name === token)) throw new Error('action "map" needs a real canonical token name');
    f.status = 'mapped'; f.resolution = 'mapped to ' + token + ' by ' + (who || 'vlad');
  } else if (action === 'approve-literal') {
    f.status = 'approved-literal'; f.resolution = 'approved as literal by ' + (who || 'vlad');
  } else if (action === 'fixed') {
    f.status = 'fixed'; f.resolution = 'prototype fixed by ' + (who || 'vlad') + ' — re-map to re-verify';
  } else throw new Error('unknown action "' + action + '"');
  // Re-render the md from the updated data (tables + machine block stay in sync).
  const p = protoPaths(name);
  const md = fs.readFileSync(p.mapping, 'utf8');
  const updated = md
    .replace(DATA_FENCE_RE, '```json crs-mapping\n' + JSON.stringify(d, null, 2) + '\n```')
    .replace(new RegExp('^\\| ' + flagId + ' \\|.*$', 'm'), '| ' + f.id + ' | ' + f.kind + ' | `' + f.value + '` | ' + f.selector + ' · ' + f.prop + ' · L' + f.line + ' | ' + (f.nearest || '—') + ' | ' + f.status + ' | ' + f.resolution + ' |');
  fs.writeFileSync(p.mapping, updated);
  return f;
}

// ---- chunk plan (T3) --------------------------------------------------------
// Deterministic BP-sized chunks from the mapping, in the fixed dependency order:
// (1) styles that must exist → (2) layout/containers → (3) components per
// family → (4) states/conditionals (full swap only) → (5) workflows → (6) data
// bindings. Sized err-small. A chunk may reference only attested inventory
// names/IDs or producedNames of chunks it depends on — validatePlan enforces
// that, and hand-broken plans are rejected on every load.
function styleNameFor(selector) {
  // .btn-primary → "CRS - Btn Primary" (§13: readable, CRS-prefixed).
  const words = selector.replace(/^[.#]/, '').split(/[-_]/).filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1));
  return 'CRS - ' + words.join(' ');
}
function attestedNames(inv) {
  const s = new Set();
  for (const st of inv.styles) s.add(st.name);
  for (const r of inv.reusables) { s.add(r.name); for (const id of r.ids || []) s.add(id); }
  return s;
}
function computePlan(name) {
  const { proto, hash } = requireSettled(name);
  const d = readMappingData(name);
  if (!d) throw new Error('no mapping for "' + name + '" — run map first');
  if (d.settledHash !== hash) throw new Error('mapping was made from a different settled hash — re-map first');
  const open = (d.flags || []).filter((f) => f.status === 'unresolved');
  if (open.length) throw new Error('chunking REFUSED — ' + open.length + ' unresolved FLAG row(s): ' + open.map((f) => f.id).join(', ') + ' (resolve each: map / approve-as-literal / fix prototype)');

  const inv = inventory.loadInventory();
  const chunks = [];
  const creates = d.compRows.filter((c) => !c.existing);
  const reuses = d.compRows.filter((c) => c.existing);
  const layoutRows = d.compRows.filter((c) => c.family === 'layout');
  const compFams = [...new Set(d.compRows.filter((c) => c.family !== 'layout').map((c) => c.family))];

  if (creates.length) {
    chunks.push({
      id: 'c1', type: 'styles', title: 'Styles that must exist (create + showcase on bUfVN0)',
      scope: { in: ['Create ' + creates.length + ' missing styles per §13 naming; add each to the Design System page (bUfVN0) showcase'], out: ['No element layout, no workflows'] },
      dependsOn: [], producedNames: creates.map((c) => styleNameFor(c.selector)),
      usesNames: ['bUfVN0'], mappingRows: creates.map((c) => c.selector), status: 'pending',
    });
  }
  if (layoutRows.length) {
    chunks.push({
      id: 'c' + (chunks.length + 1), type: 'layout', title: 'Layout / containers',
      scope: { in: layoutRows.map((c) => c.selector + ' → ' + (c.existing || styleNameFor(c.selector))), out: ['No component internals'] },
      dependsOn: chunks.length ? ['c1'] : [], producedNames: layoutRows.map((c) => c.selector.replace(/^[.#]/, '') + ' container'),
      usesNames: layoutRows.map((c) => c.existing ? c.existing.split(' — ')[0].replace(/\s*\([^)]*\)\s*$/, '') : styleNameFor(c.selector)),
      mappingRows: layoutRows.map((c) => c.selector), status: 'pending',
    });
  }
  for (const fam of compFams) {
    const rows = d.compRows.filter((c) => c.family === fam);
    const famName = (inv.families.find((f) => f.id === fam) || { name: fam }).name;
    const deps = chunks.map((c) => c.id);
    chunks.push({
      id: 'c' + (chunks.length + 1), type: 'components', title: 'Components — ' + famName,
      scope: { in: rows.map((c) => c.selector + ' → ' + (c.existing ? 'REUSE ' + c.existing.split(' — ')[0] : styleNameFor(c.selector))), out: ['No states/conditionals yet', 'No workflows'] },
      dependsOn: deps, producedNames: rows.map((c) => c.selector.replace(/^[.#]/, '') + ' element'),
      usesNames: rows.map((c) => c.existing ? c.existing.split(' — ')[0].replace(/\s*\([^)]*\)\s*$/, '') : styleNameFor(c.selector)),
      mappingRows: rows.map((c) => c.selector), status: 'pending',
    });
  }
  const stateIx = (d.interactions || []).filter((i) => /states:/.test(i));
  if (stateIx.length) {
    chunks.push({
      id: 'c' + (chunks.length + 1), type: 'states', title: 'States & conditionals (full style swap only)',
      scope: { in: stateIx, out: ['Zero property-level conditionals — full style swap per §3.2'] },
      dependsOn: chunks.map((c) => c.id), producedNames: [],
      usesNames: [], mappingRows: stateIx, status: 'pending',
    });
  }
  const wfIx = (d.interactions || []).filter((i) => /script-driven/.test(i));
  if (wfIx.length) {
    chunks.push({
      id: 'c' + (chunks.length + 1), type: 'workflows', title: 'Workflows (from demonstrated behavior)',
      scope: { in: wfIx, out: ['No data bindings'] }, dependsOn: chunks.map((c) => c.id),
      producedNames: [], usesNames: [], mappingRows: wfIx, status: 'pending',
    });
  }
  const plan = { name, module: proto.module, protoHash: hash, inventorySha: d.inventorySha, chunks };
  const errs = validatePlan(plan, inv);
  if (errs.length) throw new Error('plan failed contract validation: ' + errs.join(' · '));
  return plan;
}
function validatePlan(plan, inv) {
  inv = inv || inventory.loadInventory();
  const errs = [];
  if (!plan || !Array.isArray(plan.chunks)) return ['no chunks array'];
  const attested = attestedNames(inv);
  const ids = new Set();
  const produced = new Map(); // chunkId → Set(names)
  for (const c of plan.chunks) {
    if (!c.id || ids.has(c.id)) { errs.push('duplicate/missing chunk id ' + (c.id || '?')); continue; }
    ids.add(c.id);
    for (const dep of c.dependsOn || []) if (!produced.has(dep)) errs.push(c.id + ' depends on ' + dep + ' which is not an EARLIER chunk');
    const reachable = new Set(attested);
    for (const dep of c.dependsOn || []) for (const n of produced.get(dep) || []) reachable.add(n);
    for (const n of c.usesNames || []) {
      if (!reachable.has(n)) errs.push(c.id + ' references "' + n + '" — not attested and not produced by a dependency');
    }
    const st = ['pending', 'sent', 'reported', 'verified', 'failed'];
    if (!st.includes(c.status)) errs.push(c.id + ' bad status "' + c.status + '"');
    produced.set(c.id, new Set(c.producedNames || []));
  }
  return errs;
}
function writePlan(name) {
  const plan = computePlan(name);
  fs.writeFileSync(protoPaths(name).plan, JSON.stringify(plan, null, 2) + '\n');
  return plan;
}
function loadPlan(name) {
  const plan = JSON.parse(fs.readFileSync(protoPaths(name).plan, 'utf8'));
  const errs = validatePlan(plan);
  if (errs.length) throw new Error('build-plan.json rejected: ' + errs.join(' · '));
  return plan;
}
function savePlan(name, plan) {
  const errs = validatePlan(plan);
  if (errs.length) throw new Error('refusing to save invalid plan: ' + errs.join(' · '));
  fs.writeFileSync(protoPaths(name).plan, JSON.stringify(plan, null, 2) + '\n');
}

// ---- emission (T4) ----------------------------------------------------------
// Builds the guarded intent for ONE chunk. The model call itself happens in the
// server (runClaudeStream + GEN_SYSTEM_PROMPT) or gen.js — never here.
// GUARD semantics: the guard runs over EVERY chunk's scope text — if ANY chunk
// of the plan touches an [OPEN] decision, the WHOLE plan stops (DECISION-NEEDED,
// zero chunks emitted), not just the offending chunk.
function planGuardText(plan) {
  return plan.chunks.map((c) => [c.title, ...(c.scope.in || []), ...(c.mappingRows || []), ...(c.producedNames || [])].join(' ')).join(' ');
}
// The verbatim mapping rows a chunk must carry: its component/interaction table
// lines exactly as they stand in mapping.md, plus the full tokens table.
function verbatimRows(name, chunk) {
  const md = fs.readFileSync(protoPaths(name).mapping, 'utf8');
  const lines = md.split('\n');
  const rows = [];
  const tokTable = [];
  let inTok = false;
  for (const l of lines) {
    if (l.startsWith('## Tokens used')) { inTok = true; continue; }
    if (inTok && l.startsWith('## ')) inTok = false;
    if (inTok && l.startsWith('|')) tokTable.push(l);
  }
  for (const sel of chunk.mappingRows || []) {
    const esc = sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const row = lines.find((l) => new RegExp('^\\| `?' + esc + '`? \\|').test(l) || (l.startsWith('- ') && l.includes(sel)));
    if (row) rows.push(row);
  }
  return { tokTable, rows };
}
function buildChunkIntent(name, chunkId) {
  const { proto, hash } = requireSettled(name);
  const plan = loadPlan(name);   // re-validates the contract on every load
  if (plan.protoHash !== hash) throw new Error('build-plan.json was made from a different settled hash — re-plan first');
  const chunk = plan.chunks.find((c) => c.id === chunkId);
  if (!chunk) throw new Error('chunk ' + chunkId + ' not in plan (' + plan.chunks.map((c) => c.id).join(', ') + ')');
  const guard = require('./guard.js');
  const hits = guard.guard(planGuardText(plan), plan.module + ' ' + name);
  if (hits.length) {
    const msg = 'DECISION-NEEDED: ' + hits.map((h) => h.title + ' (trigger: "' + h.trigger + '")').join(' · ') + ' → decisions.md. WHOLE PLAN STOPPED — zero chunks emitted.';
    const err = new Error(msg);
    err.decisionNeeded = true;
    err.hits = hits;
    throw err;
  }
  const v = verbatimRows(name, chunk);
  const intent = [
    'Implement chunk ' + chunk.id + ' of the settled prototype "' + name + '" (module: ' + plan.module + '): ' + chunk.title + '.',
    '',
    'SCOPE IN: ' + chunk.scope.in.join(' · '),
    'SCOPE OUT: ' + chunk.scope.out.join(' · '),
    chunk.dependsOn.length ? 'DEPENDS ON (already built): ' + chunk.dependsOn.map((d) => { const dc = plan.chunks.find((x) => x.id === d); return d + ' (' + (dc ? dc.producedNames.join(', ') || dc.title : '?') + ')'; }).join('; ') : 'DEPENDS ON: nothing — this is the first chunk.',
    '',
    'PRODUCED NAMES — create EXACTLY these, byte-for-byte (later chunks reference them):',
    ...(chunk.producedNames.length ? chunk.producedNames.map((n) => '- ' + n) : ['- (none — this chunk produces no new named artifacts)']),
    '',
    'MAPPING ROWS (verbatim from prototypes/' + name + '/mapping.md — the design contract for this chunk):',
    'Tokens used:',
    ...v.tokTable,
    'Chunk rows:',
    ...(v.rows.length ? v.rows : ['(interaction-scope chunk — see SCOPE IN)']),
    '',
    'Prototype settled hash: ' + hash,
  ].join('\n');
  return { proto, plan, chunk, intent, protoSha: hash };
}
// The mapping contract is appended MECHANICALLY after the model output — the
// model may restructure its prose, but the verbatim rows + exact producedNames
// ride on every emitted prompt by construction, never by model compliance.
function appendVerbatimContract(name, chunk, modelOut) {
  const v = verbatimRows(name, chunk);
  return modelOut.trimEnd() + '\n\n' + [
    '---',
    '',
    '## MAPPING CONTRACT (verbatim from prototypes/' + name + '/mapping.md — do not reinterpret)',
    '',
    'Produced names — create EXACTLY these, byte-for-byte:',
    ...(chunk.producedNames.length ? chunk.producedNames.map((n) => '- `' + n + '`') : ['- (none)']),
    '',
    'Tokens used:',
    '', ...v.tokTable, '',
    'Chunk rows:',
    '', ...(v.rows.length ? v.rows : ['(interaction-scope chunk — see scope above)']), '',
  ].join('\n');
}
function chunkPromptPath(name, chunkId) {
  const p = protoPaths(name);
  fs.mkdirSync(p.chunks, { recursive: true });
  return path.join(p.chunks, chunkId + '-prompt.md');
}
function chunkReportPath(name, chunkId) {
  const p = protoPaths(name);
  fs.mkdirSync(p.chunks, { recursive: true });
  return path.join(p.chunks, chunkId + '-report.md');
}
function setChunkStatus(name, chunkId, status, extra) {
  const plan = loadPlan(name);
  const chunk = plan.chunks.find((c) => c.id === chunkId);
  if (!chunk) throw new Error('chunk ' + chunkId + ' not in plan');
  chunk.status = status;
  Object.assign(chunk, extra || {});
  savePlan(name, plan);
  // All chunks verified → the prototype is built.
  const proto = loadProto(name);
  if (plan.chunks.every((c) => c.status === 'verified')) {
    if (proto.status !== 'built') {
      proto.status = 'built';
      proto.notes = (proto.notes || []).concat(new Date().toISOString() + ' — all ' + plan.chunks.length + ' chunks verified → built');
      fs.writeFileSync(protoPaths(name).json, JSON.stringify(proto, null, 2));
    }
  }
  return { plan, chunk, proto };
}

module.exports = { protoPaths, loadProto, htmlHash, requireSettled, computeMapping, writeMapping, readMappingData, unresolvedFlags, resolveFlag, computePlan, validatePlan, writePlan, loadPlan, savePlan, styleNameFor, buildChunkIntent, chunkPromptPath, chunkReportPath, setChunkStatus, planGuardText, appendVerbatimContract };

// ---- CLI --------------------------------------------------------------------
if (require.main === module) {
  const [cmd, name, ...rest] = process.argv.slice(2);
  try {
    if (cmd === 'map' && name) {
      const m = writeMapping(name);
      process.stderr.write('mapping: ' + m.tokenRows.length + ' tokens, ' + m.compRows.length + ' components, ' + m.flags.length + ' flags (' + m.flags.filter((f) => f.status === 'unresolved').length + ' unresolved) → prototypes/' + name + '/mapping.md\n');
      process.exit(m.flags.some((f) => f.status === 'unresolved') ? 4 : 0);
    } else if (cmd === 'plan' && name) {
      const plan = writePlan(name);
      process.stderr.write('plan: ' + plan.chunks.length + ' chunks → prototypes/' + name + '/build-plan.json\n');
      for (const c of plan.chunks) process.stderr.write('  ' + c.id + ' [' + c.type + '] ' + c.title + (c.producedNames.length ? ' → produces: ' + c.producedNames.join(', ') : '') + '\n');
      process.exit(0);
    } else if (cmd === 'validate' && name) {
      loadPlan(name);
      process.stderr.write('plan: VALID\n');
      process.exit(0);
    } else if (cmd === 'emit' && name && rest[0]) {
      (async () => {
        const gen = require('./gen.js');
        const assemble = require('./assemble.js').assemble;
        const b = buildChunkIntent(name, rest[0]);
        const bundle = assemble(b.plan.module);
        process.stderr.write('bundle: ' + bundle.text.length + ' bytes, sha256 ' + bundle.sha256.slice(0, 12) + '… | guard: PASS (whole plan)\n');
        const mi = process.argv.indexOf('--model');
        const model = mi > 0 ? process.argv[mi + 1] : 'sonnet';
        const out = await gen.callModel(gen.buildGenMessage(bundle.text, b.intent), { model });
        const clean = appendVerbatimContract(name, b.chunk, out.replace(/^```(?:markdown|md)?\s*/i, '').replace(/```\s*$/, '').trim());
        const archived = gen.archive({ intent: 'chunk ' + b.chunk.id + ' ' + name + ': ' + b.chunk.title, module: b.plan.module, bundleSha: bundle.sha256, model, output: clean, protoSha: b.protoSha, chunkId: b.chunk.id });
        fs.writeFileSync(chunkPromptPath(name, b.chunk.id), clean + '\n');
        process.stderr.write('archived → ' + archived + '\nprompt → prototypes/' + name + '/chunks/' + b.chunk.id + '-prompt.md\n');
        process.stdout.write(clean + '\n');
        process.exit(0);
      })().catch((e) => { process.stderr.write('chunk: ' + e.message + '\n'); process.exit(e.decisionNeeded ? 2 : 3); });
    } else if (cmd === 'resolve' && name && rest[0] && rest[1]) {
      const f = resolveFlag(name, rest[0], rest[1], rest[2]);
      process.stderr.write('flag ' + f.id + ' → ' + f.status + '\n');
      process.exit(0);
    } else {
      process.stderr.write('usage: chunk.js map <name> | resolve <name> <flagId> <map|approve-literal|fixed> [token]\n');
      process.exit(1);
    }
  } catch (e) {
    process.stderr.write('chunk: ' + e.message + '\n');
    process.exit(e.message.includes('DECISION-NEEDED') ? 2 : 3);
  }
}
