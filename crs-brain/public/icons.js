// CRS file icons — approved 2026-07-17. Do not modify geometry/colors/glyphs.
// Wrapped in an IIFE: the app is a classic-script SPA (one shared global scope),
// so the module's consts (esc, TYPES, …) must not collide with the app's.
// 2026-07-17 (os-grade): neutral sheet/fold/line colors now read from CSS vars
// with the approved dark values as fallbacks — dark rendering is pixel-identical;
// light mode gets legible pairs (index.html :root[data-theme=light]). Geometry,
// glyphs, and badge colors untouched (judgment-calls.md).
(function(){
// 2026-08-06 (Claude Code restyle, pass 2): sheet/fold/line fallbacks now quote the
// SPEC ramp directly — brain/design/claude-code-spec.md §SURFACES: card #2F2F2F,
// control-strong #393938, and §INK faint #5F5F5C. These are dark-theme literals
// cited because an SVG fill=/stroke= attribute needs a value when the var is
// missing; the live values still come from --icon-* (index.html, both themes).
const SHEET='var(--icon-sheet,#2F2F2F)', FOLD='var(--icon-fold,#393938)', LINE='var(--icon-line,#5F5F5C)';

// 2026-08-06 (pass 2): the file-type palette is GREYSCALE. The spec's PRIME
// DIRECTIVE reserves hue for semantics at text scale (added / removed / warning /
// permission / link / plan) — a file extension is none of those, so NO type keeps a
// hue: not md, not img, not pdf. The sheet, the fold and the badge pill are the
// same neutrals for every type; differentiation comes from the BADGE LABEL TEXT
// (MD / JSON / PDF …) and the vector glyph, which is exactly how Claude Code
// Desktop's own chrome icons read (spec: "chrome icons are monochrome at
// var(--cc-text-muted)/var(--cc-text-secondary)").
// INK = --text-muted → --cc-text-secondary (#939393 dark / #6B6A64 light): the
// brighter of the two monochrome icon inks, chosen so a 16px glyph still clears
// 4:1 on the sheet. gen stays one step fainter (--text-disabled → --cc-text-faint),
// as it always has. Map shape and keys are unchanged — every consumer of
// window.ICON_TYPES still gets [label, color].
const INK='var(--text-muted,#939393)';
const TYPES={ // type: [badge label, color]  — color is the glyph ink, neutral for all
  md:['MD',INK],    txt:['TXT',INK],   json:['JSON',INK],
  yml:['YML',INK],  html:['HTML',INK], css:['CSS',INK],
  js:['JS',INK],    py:['PY',INK],     csv:['CSV',INK],
  xls:['XLS',INK],  doc:['DOC',INK],   pdf:['PDF',INK],
  img:['IMG',INK],  gen:['','var(--text-disabled,#5F5F5C)']
};

const EXT2TYPE={
  md:'md', markdown:'md', txt:'txt', log:'txt', json:'json',
  yml:'yml', yaml:'yml', html:'html', htm:'html', css:'css',
  js:'js', mjs:'js', cjs:'js', ts:'js', tsx:'js', jsx:'js',
  py:'py', csv:'csv', tsv:'csv', xls:'xls', xlsx:'xls',
  doc:'doc', docx:'doc', pdf:'pdf',
  png:'img', jpg:'img', jpeg:'img', gif:'img', webp:'img', svg:'img', ico:'img'
}; // anything else -> 'gen' (incl. extension-less like .gitignore)

const TGLYPH={html:'</>', css:'#', js:'=>', py:'>>>', json:'{ }', yml:'---', doc:'¶', md:'M↓'};
const esc=s=>s.replace(/</g,'&lt;').replace(/>/g,'&gt;');

function vglyph(t,c,cy,sw){
  if(t==='img') return `<rect x="16" y="${cy-6}" width="16" height="12" rx="2" stroke="${c}" stroke-width="${sw}" fill="none"/>
    <circle cx="20.5" cy="${cy-2}" r="1.4" fill="${c}"/>
    <path d="M18 ${cy+4}l4-4 3 3 3.5-3.5 3.5 3.5" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linejoin="round"/>`;
  if(t==='xls') return `<rect x="16" y="${cy-6.5}" width="16" height="13" rx="1.5" stroke="${c}" stroke-width="${sw}" fill="none"/>
    <path d="M16 ${cy-2}h16M16 ${cy+2.5}h16M22 ${cy-6.5}v13M27 ${cy-6.5}v13" stroke="${c}" stroke-width="${sw*0.75}"/>`;
  if(t==='csv') return `<path d="M17 ${cy-6}v12M23 ${cy-6}v12M29 ${cy-6}v12" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
    <path d="M14 ${cy-6}h20M14 ${cy+6}h20" stroke="${c}" stroke-width="${sw*0.75}" stroke-linecap="round" opacity=".7"/>`;
  if(t==='pdf') return `<rect x="16" y="${cy-6.5}" width="7" height="6" rx="1" stroke="${c}" stroke-width="${sw*0.85}" fill="none"/>
    <path d="M26 ${cy-5.5}h6M26 ${cy-2}h6M16 ${cy+2.5}h16M16 ${cy+6}h10" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`;
  return `<path d="M16 ${cy-5}h16M16 ${cy}h16M16 ${cy+5}h10" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`; // txt + gen
}
function glyph(t,c,cy,mode){
  const fs=mode==='sm'?13.5:9.5, sw=mode==='sm'?2.6:2;
  // font-family stays a literal: SVG presentation attrs can't resolve var(--mono)
  // reliably across engines. This string mirrors the first family of --mono.
  if(TGLYPH[t]) return `<text x="24" y="${cy+fs*0.36}" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="${fs}" fill="${c}">${esc(TGLYPH[t])}</text>`;
  return vglyph(t,c,cy,sw);
}
const _cache=new Map();
// GEOMETRY NOTE (2026-08-06, pass 2 — observation only, no call site touched):
// the spec lists "chrome icons >=20px" as a tell to destroy. fileIcon renders at
// whatever size the caller passes; the emitted sizes today are 16 (chat-media.js
// attachment chip, Favorites row) — compliant — and 20 (index.html fileTileFor,
// the .fic tile), which is 4px over the chrome ceiling. 56 / 64 are preview
// artwork, not chrome, so they are out of scope. Fixing the 20 means editing
// index.html:3242 (owned elsewhere), not this file.
function fileIcon(nameOrExt, s){
  const ext=String(nameOrExt).includes('.')?String(nameOrExt).split('.').pop().toLowerCase():String(nameOrExt).toLowerCase();
  const t=EXT2TYPE[ext]||'gen';
  const key=t+'|'+s;
  if(_cache.has(key)) return _cache.get(key);
  const [label,color]=TYPES[t];
  let svg;
  if(s<40){ // glyph-row tier
    // pass 2: the folded corner is the same neutral for EVERY type (it used to carry
    // the type color). With a greyscale palette a per-type fold would only add noise
    // to a file list — the glyph is the differentiator at this tier.
    const fc=FOLD;
    svg=`<svg width="${s}" height="${s}" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M11 7a3 3 0 0 1 3-3h14l9 9v28a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V7z" fill="${SHEET}"/>
      <path d="M28 4l9 9h-7a2 2 0 0 1-2-2V4z" fill="${fc}"/>
      ${glyph(t, t==='gen'?LINE:color, 27, 'sm')}</svg>`;
  } else { // badge-tile tier
    const w=label?8+label.length*5.6:0;
    // font-family literal mirrors --mono's first family (see glyph() above).
    // pass 2: the pill is a NEUTRAL surface for every type — the spec's elevation is a
    // 2-5% lightness step, so the badge sits on --icon-fold (spec control-strong
    // #393938) one step above the --icon-sheet card, and the LABEL carries the meaning
    // in --text-primary (spec §INK primary #E8E6E1 dark / #20201F light). That pair
    // flips correctly in both themes; the old white-on-hue label did not.
    const badge=label?`<rect x="7" y="13" width="${w}" height="10" rx="3" fill="${FOLD}"/>
      <text x="${7+w/2}" y="20.4" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="6.6" fill="var(--text-primary,#E8E6E1)">${label}</text>`:'';
    svg=`<svg width="${s}" height="${s}" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M11 7a3 3 0 0 1 3-3h14l9 9v28a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V7z" fill="${SHEET}"/>
      <path d="M28 4l9 9h-7a2 2 0 0 1-2-2V4z" fill="${FOLD}"/>
      ${badge}${glyph(t, t==='gen'?LINE:color, 33, 'lg')}</svg>`;
  }
  _cache.set(key,svg); return svg;
}

// Wiring: the app is a vanilla global-script SPA (no ESM) — expose on window.
window.fileIcon = fileIcon;
window.ICON_TYPES = TYPES;
window.ICON_EXT2TYPE = EXT2TYPE;
})();
