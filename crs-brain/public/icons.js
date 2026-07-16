// CRS file icons — approved 2026-07-17. Do not modify geometry/colors/glyphs.
// Wrapped in an IIFE: the app is a classic-script SPA (one shared global scope),
// so the module's consts (esc, TYPES, …) must not collide with the app's.
(function(){
const SHEET='#2A2A2A', FOLD='#3D3D3D', LINE='#565656';

const TYPES={ // type: [badge label, color]
  md:['MD','#A855F7'], txt:['TXT','#6B6B6B'], json:['JSON','#F59E0B'],
  yml:['YML','#8B5CF6'], html:['HTML','#F87171'], css:['CSS','#60A5FA'],
  js:['JS','#EAB308'], py:['PY','#3B82F6'], csv:['CSV','#4ADE80'],
  xls:['XLS','#22C55E'], doc:['DOC','#2563EB'], pdf:['PDF','#EF4444'],
  img:['IMG','#06B6D4'], gen:['','#565656']
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
    const badge=label?`<rect x="7" y="13" width="${w}" height="10" rx="3" fill="${color}"/>
      <text x="${7+w/2}" y="20.4" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="6.6" fill="#fff">${label}</text>`:'';
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
