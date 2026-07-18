#!/usr/bin/env node
/*
 * brain/engine/style-inventory.js — deterministic token/style inventory builder.
 *
 * Zero LLM. Zero timestamps — same inputs must produce byte-identical output
 * (sourcesSha256 records input identity instead of a clock).
 *
 * The mapping pass (chunk.js) does its find-first lookups against the JSON this
 * writes to brain/design/style-inventory.json. Sources, in priority order:
 *   1. brain/design/design-system-export.md — the full Bubble style export the
 *      design system §20 references. DOES NOT EXIST YET (2026-07-18). If Vlad
 *      ever drops it in, its style rows are merged in automatically and win.
 *   2. brain/design/CRS-design-system.md §2.10 — canonical paired token block.
 *   3. design/tokens.css — product-side legacy/short token names (aliases) +
 *      the typography/height/spacing tokens §2.10 doesn't carry.
 *   4. brain/STATUS.md §6 — existing reusable components (real Bubble IDs).
 *   5. A curated attested-style list — every Bubble style NAME actually written
 *      down anywhere in the design system doc, each with its provenance. This
 *      list asserts nothing beyond what the doc says; it never invents names.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DS_FILE = path.join(REPO_ROOT, 'brain', 'design', 'CRS-design-system.md');
const EXPORT_FILE = path.join(REPO_ROOT, 'brain', 'design', 'design-system-export.md');
const PRODUCT_TOKENS = path.join(REPO_ROOT, 'design', 'tokens.css');
const STATUS_FILE = path.join(REPO_ROOT, 'brain', 'STATUS.md');
const OUT_FILE = path.join(REPO_ROOT, 'brain', 'design', 'style-inventory.json');

// Curated alias map: legacy/short token names (design/tokens.css, old demos,
// the app's alias layer) → canonical §2 names. Reviewable, deterministic —
// value-matching alone is ambiguous (#242424 is both --bg-tertiary and
// --border-default in dark).
const ALIASES = {
  '--bg': '--bg-primary', '--surface-1': '--bg-secondary', '--surface-2': '--bg-tertiary', '--surface-3': '--bg-elevated',
  '--panel': '--bg-secondary', '--panel2': '--bg-tertiary', '--elev': '--bg-elevated',
  '--border': '--border-default', '--line': '--border-default', '--line2': '--border-hover', '--line3': '--border-active',
  '--primary': '--text-primary', '--secondary': '--text-secondary', '--muted': '--text-muted',
  '--accent2': '--accent-soft', '--good': '--success', '--warn': '--warning', '--danger': '--error',
  '--r-button': '--radius-btn', '--r-input': '--radius-input', '--r-card': '--radius-card',
  '--r-modal': '--radius-modal', '--r-badge': '--radius-badge', '--r-pill': '--radius-pill',
  '--ease': '--transition', '--ease-enter': '--transition',
  '--h-btn': '--h-button', '--h-btn-sm': '--h-button-sm', '--h-btn-lg': '--h-button-lg',
};

// Every Bubble style name the design system doc actually attests (2026-07-18
// sweep). Provenance = where the name is written. The mapping pass may cite
// these; anything else must be an explicit "create" row.
const ATTESTED_STYLES = [
  { name: 'CRS - Primary', kind: 'style', appliesTo: 'DateInput', provenance: 'CRS-design-system.md §20.3' },
  { name: 'CRS - Elevated Card', kind: 'style', appliesTo: 'Group', provenance: 'CRS-design-system.md §20' },
  { name: 'CRS - Input 36px', kind: 'style', appliesTo: 'Input', provenance: 'CRS-design-system.md §20' },
  { name: 'Chip Active', kind: 'style', appliesTo: 'Group/Text chip', provenance: 'CRS-design-system.md §20.7' },
  { name: 'Chip Dot 6px', kind: 'style', appliesTo: 'Shape', provenance: 'CRS-design-system.md §20.7' },
  { name: 'zzactive', kind: 'swap-style', appliesTo: 'conditional full-swap (dark)', provenance: 'CRS-design-system.md §20.1' },
  { name: 'zzactivelight', kind: 'swap-style', appliesTo: 'conditional full-swap (light)', provenance: 'CRS-design-system.md §20.1' },
];

// Component families the mapping pass classifies into. §20 addenda + the core
// pattern sections that predate §20.
const FAMILIES = [
  { id: '20.1', name: 'Button groups / segmented controls', ref: 'CRS-design-system.md §20.1' },
  { id: '20.2', name: 'Selection controls (checkbox · radio · switch)', ref: 'CRS-design-system.md §20.2' },
  { id: '20.3', name: 'Pickers', ref: 'CRS-design-system.md §20.3' },
  { id: '20.4', name: 'KPI tiles', ref: 'CRS-design-system.md §20.4' },
  { id: '20.5', name: 'Avatars', ref: 'CRS-design-system.md §20.5' },
  { id: '20.6', name: 'Tables & lists', ref: 'CRS-design-system.md §20.6' },
  { id: '20.7', name: 'Chips & badges', ref: 'CRS-design-system.md §20.7' },
  { id: 'buttons', name: 'Buttons (variants/sizes/states)', ref: 'CRS-design-system.md §14 + design/CRS_UI_Kit.html §3' },
  { id: 'modal', name: 'Modal / popup', ref: 'CRS-design-system.md §5' },
  { id: 'menu', name: 'User menu / dropdown menu', ref: 'CRS-design-system.md §6' },
  { id: 'dropdown', name: 'Dropdown & filter', ref: 'CRS-design-system.md §7' },
  { id: 'matrix', name: 'Permission matrix', ref: 'CRS-design-system.md §8' },
  { id: 'toast', name: 'Toast / notification', ref: 'CRS-design-system.md §9' },
  { id: 'sidebar', name: 'Sidebar', ref: 'CRS-design-system.md §10' },
  { id: 'layout', name: 'Layout / containers (page scaffold)', ref: 'CRS-design-system.md §15' },
];

function parseCssVars(css) {
  // "--name:value;" pairs — value may contain parens/commas; stop at ; or }.
  const out = {};
  const re = /(--[a-z0-9-]+)\s*:\s*([^;}]+)[;}]/gi;
  let m;
  while ((m = re.exec(css))) out[m[1]] = m[2].trim();
  return out;
}

function section210(ds) {
  const start = ds.indexOf('### 2.10');
  if (start < 0) throw new Error('CRS-design-system.md: §2.10 not found');
  const block = ds.slice(start, ds.indexOf('## 3', start));
  const fence = block.match(/```css\n([\s\S]*?)```/);
  if (!fence) throw new Error('§2.10: css fence not found');
  const css = fence[1];
  const darkM = css.match(/:root[^{]*\{([\s\S]*?)\}/);
  const lightM = css.match(/\[data-theme="light"\]\s*\{([\s\S]*?)\}/);
  if (!darkM || !lightM) throw new Error('§2.10: dark/light blocks not found');
  return { css, dark: parseCssVars(darkM[1]), light: parseCssVars(lightM[1]) };
}

function statusReusables(status) {
  const start = status.indexOf('## 6');
  if (start < 0) return [];
  const block = status.slice(start, status.indexOf('## 7', start));
  const out = [];
  for (const line of block.split('\n')) {
    const m = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|$/);
    if (!m || /^Component$|^---/.test(m[1])) continue;
    const cell = m[1];
    const ids = [...cell.matchAll(/\b(b[A-Za-z0-9]{4,6})\b/g)].map((x) => x[1]);
    out.push({
      name: cell.replace(/`/g, '').replace(/\s*\([^)]*\)\s*/g, ' ').trim(),
      ids, status: m[2].trim(), notes: m[3].trim(),
      provenance: 'brain/STATUS.md §6',
    });
  }
  return out;
}

// Optional future export file: merge any markdown-table rows whose first cell
// looks like a style name. Wins over the curated list on name collision.
function exportStyles() {
  let txt;
  try { txt = fs.readFileSync(EXPORT_FILE, 'utf8'); } catch { return null; }
  const out = [];
  for (const line of txt.split('\n')) {
    const m = line.match(/^\|\s*`?([^|`]+?)`?\s*\|(.*)\|$/);
    if (!m || /^[-\s:]+$/.test(m[1]) || /style\s*name/i.test(m[1])) continue;
    out.push({ name: m[1].trim(), kind: 'style', provenance: 'brain/design/design-system-export.md' });
  }
  return out.length ? out : null;
}

function build() {
  const ds = fs.readFileSync(DS_FILE, 'utf8');
  const prod = fs.readFileSync(PRODUCT_TOKENS, 'utf8');
  const status = fs.readFileSync(STATUS_FILE, 'utf8');
  const s210 = section210(ds);

  const tokens = [];
  const seen = new Set();
  for (const [name, dark] of Object.entries(s210.dark)) {
    tokens.push({ name, dark, light: s210.light[name] != null ? s210.light[name] : dark, source: 'CRS-design-system.md §2.10' });
    seen.add(name);
  }
  // Product-side tokens §2.10 doesn't carry (fonts, heights, sidebar, spacing).
  const prodVars = parseCssVars(prod);
  for (const [name, val] of Object.entries(prodVars)) {
    const canonical = ALIASES[name] || name;
    if (seen.has(canonical) || seen.has(name)) continue;
    if (ALIASES[name]) continue; // alias of a §2.10 token — carried by aliases map
    tokens.push({ name, dark: val, light: null, source: 'design/tokens.css' });
    seen.add(name);
  }

  const fromExport = exportStyles();
  const styles = fromExport
    ? [...fromExport, ...ATTESTED_STYLES.filter((a) => !fromExport.some((e) => e.name === a.name))]
    : ATTESTED_STYLES;

  const inv = {
    note: 'Deterministic inventory — built by brain/engine/style-inventory.js. The find-first source for the prototype mapping pass. design-system-export.md ' + (fromExport ? 'PRESENT (merged, wins)' : 'ABSENT (curated attested list in use)') + '.',
    sourcesSha256: crypto.createHash('sha256').update(ds).update(prod).update(status).digest('hex'),
    tokens, aliases: ALIASES, styles, reusables: statusReusables(status), families: FAMILIES,
  };
  return inv;
}

function writeInventory() {
  const inv = build();
  fs.writeFileSync(OUT_FILE, JSON.stringify(inv, null, 2) + '\n');
  return { file: OUT_FILE, tokens: inv.tokens.length, styles: inv.styles.length, reusables: inv.reusables.length };
}

function loadInventory() {
  // Always rebuild — cheap, deterministic, and canon edits are picked up live.
  return build();
}

// The §2.10 css fence text, byte-verbatim — the scaffold generator injects this
// and the acceptance diff compares against it. Never reformatted.
function rawCss210() {
  const ds = fs.readFileSync(DS_FILE, 'utf8');
  return section210(ds).css;
}

module.exports = { build, writeInventory, loadInventory, ALIASES, rawCss210 };

if (require.main === module) {
  const r = writeInventory();
  process.stderr.write('style-inventory: ' + r.tokens + ' tokens, ' + r.styles + ' styles, ' + r.reusables + ' reusables → ' + path.relative(REPO_ROOT, r.file) + '\n');
}
