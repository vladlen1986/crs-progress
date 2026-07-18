/* CRS Brain — chat-media + markdown region (Program 3 Phase 5 module split).
 * Build-less, zero-dep, classic script sharing the app's global scope (matches
 * icons.js / sounds.js). Renders markdown, classifies file refs into image grids
 * / file chips, and auto-links module names to entity pages. Depends on core
 * globals (esc, DW, fileIcon, api, openDocWindow, openTarget) resolved at runtime. */

function renderMd(src){
  const lines = src.replace(/\r/g,'').split('\n');
  let html='', i=0;
  while(i<lines.length){
    let l=lines[i];
    if(/^```/.test(l)){ let code=''; i++; while(i<lines.length && !/^```/.test(lines[i])){code+=lines[i]+'\n';i++;} i++; html+='<pre><code>'+esc(code)+'</code></pre>'; continue; }
    if(/^#{1,6}\s/.test(l)){ const n=l.match(/^#+/)[0].length; html+=`<h${n}>${mdInline(l.replace(/^#+\s/,''))}</h${n}>`; i++; continue; }
    if(/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(l)){ html+='<hr>'; i++; continue; }
    if(/^\s*>/.test(l)){ let q=''; while(i<lines.length && /^\s*>/.test(lines[i])){q+=lines[i].replace(/^\s*>\s?/,'')+' ';i++;} html+='<blockquote>'+mdInline(q)+'</blockquote>'; continue; }
    if(/^\s*[-*+]\s/.test(l)){ html+='<ul>'; while(i<lines.length && /^\s*[-*+]\s/.test(lines[i])){html+='<li>'+mdInline(lines[i].replace(/^\s*[-*+]\s/,''))+'</li>';i++;} html+='</ul>'; continue; }
    if(/^\s*\d+\.\s/.test(l)){ html+='<ol>'; while(i<lines.length && /^\s*\d+\.\s/.test(lines[i])){html+='<li>'+mdInline(lines[i].replace(/^\s*\d+\.\s/,''))+'</li>';i++;} html+='</ol>'; continue; }
    if(/^\s*\|.*\|\s*$/.test(l) && i+1<lines.length && /^\s*\|[-:\s|]+\|\s*$/.test(lines[i+1])){
      const row=(x)=>x.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
      const head=row(l); i+=2; let body='';
      while(i<lines.length && /^\s*\|.*\|\s*$/.test(lines[i])){ body+='<tr>'+row(lines[i]).map(c=>'<td>'+mdInline(c)+'</td>').join('')+'</tr>'; i++; }
      html+='<div class="md-tbl"><table><thead><tr>'+head.map(c=>'<th>'+mdInline(c)+'</th>').join('')+'</tr></thead><tbody>'+body+'</tbody></table></div>'; continue;
    }
    if(l.trim()===''){ i++; continue; }
    let para=l; i++;
    while(i<lines.length && lines[i].trim()!=='' && !/^(#{1,6}\s|```|\s*[-*+]\s|\s*\d+\.\s|\s*>)/.test(lines[i])){ para+=' '+lines[i]; i++; }
    html+='<p>'+mdInline(para)+'</p>';
  }
  return html;
}

// ---------- chat-media: inline image previews + file chips (post-render pass) ----------
// Runs over a FINISHED assistant message body. Turns repo file references
// (backticked <code>, bare-path/markdown <a data-path>) into: thumbnail grids for
// images (one gallery per message, seeded into the existing image viewer), file
// chips for other known types, and muted "not found" chips for dead refs. Reuses
// smartOpen + the P9.5 viewer; never fetches outside the repo. Idempotent per body.
const CM_IMG_EXT=/^(png|jpe?g|gif|webp|svg)$/i;
const CM_KNOWN_EXT=/\.(md|html?|css|js|py|json|txt|csv|ya?ml|xlsx|png|jpe?g|gif|webp|svg)$/i;
const CM_PATH_SHAPE=/^(?:[\w][\w.\-]*\/)*[\w][\w.\-]*\.[A-Za-z0-9]+$/;   // relative path w/ extension, no spaces
function cmNorm(p){ return String(p||'').trim().replace(/^\.\//,'').replace(/^\/+/,''); }
function cmOutsideRepo(p){ return /(^|\/)\.\.(\/|$)/.test(p) || /^[a-z]+:\/\//i.test(p) || p.startsWith('/'); }
function cmClassify(rawPath){
  const p=cmNorm(rawPath);
  if(!p || !CM_PATH_SHAPE.test(p) || !CM_KNOWN_EXT.test(p)) return null;   // not a file reference
  const name=p.split('/').pop(), ext=(name.split('.').pop()||'').toLowerCase();
  if(cmOutsideRepo(p)) return {p,name,ext,kind:'dead'};                    // never fetch outside repo
  const known=(typeof DW!=='undefined'&&DW.allPaths&&DW.allPaths.size)?DW.allPaths:null;
  const isImg=CM_IMG_EXT.test(ext);
  if(known){ if(!known.has(p)) return {p,name,ext,kind:'dead'}; return {p,name,ext,kind:isImg?'img':'file'}; }
  return {p,name,ext,kind:isImg?'img':'file'};   // tree not loaded yet → optimistic (img onerror falls back)
}
// The block a reference lives in — used to group images that sit together.
function cmBlock(el,root){ let n=el; while(n&&n!==root){ if(/^(P|LI|TD|TH|BLOCKQUOTE|H1|H2|H3|H4|H5|H6)$/.test(n.tagName)) return n; n=n.parentElement; } return el; }
function cmChipEl(info){
  if(info.kind==='dead'){
    const s=document.createElement('span'); s.className='cm-chip cm-dead'; s.title=info.p+' — not found';
    s.innerHTML=`<span class="cm-nm">${esc(info.name)}</span><span class="cm-dead-tag">not found</span>`; return s;
  }
  const a=document.createElement('a'); a.className='cm-chip'; a.href='#'; a.dataset.path=info.p; a.title=info.p;
  a.innerHTML=`<span class="cm-ic">${fileIcon(info.name,16)}</span><span class="cm-nm">${esc(info.name)}</span>`; return a;   // click → smartOpen via global a[data-path] delegation
}
function cmTile(path,gi,solo){
  const b=document.createElement('button'); b.type='button'; b.className='cm-shot'+(solo?' cm-solo':'');
  b.dataset.i=gi; b.title=path;
  b.innerHTML=`<img loading="lazy" src="/api/raw?path=${encodeURIComponent(path)}" alt="${esc(path.split('/').pop())}"><span class="cm-cap">${esc(path.split('/').pop())}</span>`;
  const img=b.querySelector('img');
  img.onerror=()=>{ const info={p:path,name:path.split('/').pop(),kind:'dead'}; b.replaceWith(cmChipEl(info)); };   // no broken-img soup
  return b;
}
function cmGrid(runPaths,msgImgs){
  const g=document.createElement('div'); g.className='cm-grid'; g._imgs=msgImgs;
  const solo=(runPaths.length===1 && msgImgs.length===1);
  const CAP=10;
  const add=(list)=>list.forEach(p=>g.appendChild(cmTile(p,msgImgs.indexOf(p),solo)));
  if(runPaths.length>CAP){
    add(runPaths.slice(0,CAP));
    const more=document.createElement('button'); more.type='button'; more.className='cm-more';
    more.textContent='+'+(runPaths.length-CAP)+' more';
    more.onclick=()=>{ more.remove(); add(runPaths.slice(CAP)); };   // expand in place
    g.appendChild(more);
  } else add(runPaths);
  return g;
}
function enhanceChatMedia(body){
  if(!body || body.dataset.cm==='1') return; body.dataset.cm='1';
  // 1. collect reference tokens (code + data-path anchors), classify, skip non-refs
  const toks=[];
  body.querySelectorAll('code, a[data-path]').forEach(el=>{
    if(el.closest('pre')) return;                                   // real code blocks are literal
    if(el.tagName==='A' && el.closest('code')) return;              // backticked paths become <code><a data-path>…</a></code> — process the outer <code> only, once
    const raw=el.tagName==='A' ? el.dataset.path : el.textContent;
    const info=cmClassify(raw); if(!info) return;
    toks.push({el,info});
  });
  if(!toks.length) return;
  // 2. the message gallery = each image ref once, in document order
  const seen=new Set(), msgImgs=[];
  toks.filter(t=>t.info.kind==='img').forEach(t=>{ if(!seen.has(t.info.p)){ seen.add(t.info.p); msgImgs.push(t.info.p); } });
  // 3. group consecutive image tokens into runs (same block, or adjacent sibling blocks)
  const runs=[]; let cur=null, prevBlock=null;
  for(const t of toks){
    if(t.info.kind!=='img'){ cur=null; prevBlock=null; continue; }
    const blk=cmBlock(t.el,body);
    const adjacent = prevBlock && (blk===prevBlock || blk.previousElementSibling===prevBlock);
    if(cur && adjacent){ cur.toks.push(t); } else { cur={toks:[t]}; runs.push(cur); }
    prevBlock=blk;
  }
  // 4. render image runs: grid replaces the run's first token; other run tokens (and now-empty blocks) removed
  for(const run of runs){
    const first=run.toks[0].el, grid=cmGrid(run.toks.map(t=>t.info.p),msgImgs);
    const firstBlock=cmBlock(first,body);
    (firstBlock&&firstBlock!==body?firstBlock:first).before(grid);
    for(const t of run.toks){ const blk=cmBlock(t.el,body); t.el.remove(); if(blk&&blk!==body&&!blk.textContent.trim()&&!blk.querySelector('img,.cm-grid,.cm-chip')) blk.remove(); }
  }
  // 5. non-image refs → chips (replace in place). Use body.contains (not
  // isConnected): renderChat enhances the body BEFORE appending it, so the
  // subtree is detached — contains() still tells us if step 4 removed a token.
  for(const t of toks){ if(t.info.kind==='img') continue; if(!body.contains(t.el)) continue; t.el.replaceWith(cmChipEl(t.info)); }
}
// Program 3 Phase 3: auto-link known entity NAMES (module names) in rendered
// bodies → entity chips opening their entity page. Cached module list; no
// per-render server scan. Only outside <pre>/<code>/<a>, whole-word, once per node.
let _entities=null;
async function loadEntities(){ try{ _entities=(await api('/api/entities')).modules||[]; }catch{ _entities=[]; } }
function autoLinkEntities(body){
  if(!_entities||!_entities.length||!body||body.dataset.el==='1') return; body.dataset.el='1';
  const mods=_entities.filter(m=>(m.name||'').length>=5).sort((a,b)=>b.name.length-a.name.length);
  const rx=new RegExp('\\b('+mods.map(m=>m.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')\\b','g');
  const byName={}; mods.forEach(m=>byName[m.name]=m.id);
  const walk=document.createTreeWalker(body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{
    if(n.parentElement.closest('pre,code,a,.cm-chip,.ent-chip')) return NodeFilter.FILTER_REJECT;
    return rx.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT; }});
  const texts=[]; let n; while(n=walk.nextNode()) texts.push(n);
  for(const t of texts){
    rx.lastIndex=0; const frag=document.createDocumentFragment(); const str=t.nodeValue; let last=0, m;
    while(m=rx.exec(str)){
      if(m.index>last) frag.appendChild(document.createTextNode(str.slice(last,m.index)));
      const nm=m[1], id=byName[nm]; const chip=document.createElement('a'); chip.className='ent-chip'; chip.href='#'; chip.textContent=nm;
      chip.onclick=e=>{ e.preventDefault(); openTarget('/entity.html#module='+id,{title:nm}); };   // capture nm/id per-iteration (m is null after the loop)
      frag.appendChild(chip); last=m.index+nm.length;
    }
    if(last<str.length) frag.appendChild(document.createTextNode(str.slice(last)));
    t.replaceWith(frag);
  }
}
// one delegated handler: a chat thumbnail opens the P9.5 viewer seeded with its message's gallery
document.addEventListener('click',(e)=>{
  const shot=e.target.closest('.cm-shot');
  if(shot){
    const g=shot.closest('.cm-grid'); const imgs=(g&&g._imgs)||[]; const i=+shot.dataset.i||0;
    if(imgs.length) openDocWindow(imgs[i],{ivImgs:imgs,ivIdx:i});
    return;
  }
  // markdown-embedded repo images (![…](path) → img.md-img) get the SAME viewer,
  // seeded with every md-img in the same reply as its gallery. External http
  // images are left alone (no repo path to open).
  const mi=e.target.closest('img.md-img'); if(!mi) return;
  const m=/[?&]path=([^&]+)/.exec(mi.getAttribute('src')||''); if(!m) return;
  const scope=mi.closest('.body')||document;
  const imgs=[...scope.querySelectorAll('img.md-img')]
    .map(im=>{ const mm=/[?&]path=([^&]+)/.exec(im.getAttribute('src')||''); return mm?decodeURIComponent(mm[1]):null; })
    .filter(Boolean);
  const p=decodeURIComponent(m[1]);
  openDocWindow(p,{ivImgs:imgs,ivIdx:Math.max(0,imgs.indexOf(p))});
});
