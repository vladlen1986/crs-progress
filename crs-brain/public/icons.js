// CRS file icons — approved 2026-07-17. Do not modify geometry/colors/glyphs.
// Wrapped in an IIFE: the app is a classic-script SPA (one shared global scope),
// so the module's consts (esc, TYPES, …) must not collide with the app's.
// 2026-07-17 (os-grade): neutral sheet/fold/line colors now read from CSS vars
// with the approved dark values as fallbacks — dark rendering is pixel-identical;
// light mode gets legible pairs (index.html :root[data-theme=light]). Geometry,
// glyphs, and badge colors untouched (judgment-calls.md).
(function(){
// 2026-08-06 (Claude Code restyle): sheet/fold/line fallbacks re-warmed to match
// tokens.css — #2A2825 = --na, #3A3733 = --border-hover, #55524C = --text-disabled
// (dark values, cited because SVG fill= needs a literal when the var is missing).
const SHEET='var(--icon-sheet,#2A2825)', FOLD='var(--icon-fold,#3A3733)', LINE='var(--icon-line,#55524C)';

// 2026-08-06: badge/glyph family REDESATURATED for the Claude Code look — the old
// set was 14 fully-saturated hues and the file explorer read as a rainbow. New set
// is one muted stone/clay/sage/slate family (HSL saturation ≤ ~0.30), still
// differentiated by hue + lightness so types stay tellable apart at 16px.
// Values are literals because they are injected into SVG fill=/stroke= attributes
// and have no token twin; where a twin genuinely exists (the neutral greys, the
// plum and teal hues) we use var(--…) with the dark-theme value as fallback so
// light mode adapts. Approved by Vlad 2026-08-06 (supersedes the 2026-07-17 lock).
const TYPES={ // type: [badge label, color]
  md:['MD','var(--purple,#8A7FA0)'],  txt:['TXT','var(--text-muted,#6E6A63)'], json:['JSON','#96805A'], // bronze
  yml:['YML','#6E6A8C'],              html:['HTML','#B07C6E'],                 css:['CSS','#7E97AC'],   // violet-slate / clay / powder blue
  js:['JS','#A79B62'],                py:['PY','#5E7B99'],                     csv:['CSV','#7B9070'],   // khaki / steel blue / sage
  xls:['XLS','#64815A'],              doc:['DOC','#4F6B8A'],                   pdf:['PDF','#9A5F55'],   // moss / denim / brick
  img:['IMG','var(--cyan,#6D93A0)'],  gen:['','var(--text-disabled,#55524C)']
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
function fileIcon(nameOrExt, s){
  const ext=String(nameOrExt).includes('.')?String(nameOrExt).split('.').pop().toLowerCase():String(nameOrExt).toLowerCase();
  const t=EXT2TYPE[ext]||'gen';
  const key=t+'|'+s;
  if(_cache.has(key)) return _cache.get(key);
  const [label,color]=TYPES[t];
  let svg;
  if(s<40){ // glyph-row tier
    const fc=t==='gen'?FOLD:color;
    svg=`<svg width="${s}" height="${s}" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M11 7a3 3 0 0 1 3-3h14l9 9v28a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V7z" fill="${SHEET}"/>
      <path d="M28 4l9 9h-7a2 2 0 0 1-2-2V4z" fill="${fc}"/>
      ${glyph(t, t==='gen'?LINE:color, 27, 'sm')}</svg>`;
  } else { // badge-tile tier
    const w=label?8+label.length*5.6:0;
    // font-family literal mirrors --mono's first family (see glyph() above).
    const badge=label?`<rect x="7" y="13" width="${w}" height="10" rx="3" fill="${color}"/>
      <text x="${7+w/2}" y="20.4" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="6.6" fill="var(--white,#fff)">${label}</text>`:'';
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
