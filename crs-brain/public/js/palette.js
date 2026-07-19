/* CRS Brain — command palette + global search region (Program 3 Phase 5 module
 * split). Build-less, zero-dep, classic script sharing the app's global scope.
 * Loaded AFTER the core script (its load-time addEventListener needs core's $).
 * ⌘K palette: search-anything + > command mode, routed through existing APIs. */

// ---------- quick-open palette (Cmd/Ctrl+K) ----------
let palIdx=0, palItems=[];
function openPal(){ $('palWrap').classList.add('show'); $('palQ').value=''; $('palQ').placeholder='Search anything — or type > for commands  (Esc to close)'; palFilter(''); $('palQ').focus(); }
function closePal(){ $('palWrap').classList.remove('show'); }
// Command mode (> prefix): each routes to an existing API/action — same as the
// chat operator commands, plus app actions. Never freelance.
const PAL_COMMANDS=[
  {label:'Settle a prototype…',kind:'cmd',run:()=>{closePal();const n=prompt('Prototype to settle:');if(n)runSlashCommand('settle',n);}},
  {label:'Chunk a prototype (map + plan)…',kind:'cmd',run:()=>{closePal();const n=prompt('Prototype to chunk:');if(n)runSlashCommand('chunk',n);}},
  {label:'Send a chunk (copy path)…',kind:'cmd',run:()=>{closePal();const n=prompt('proto/chunkId:');if(n)runSlashCommand('send',n);}},
  {label:'Add a todo…',kind:'cmd',run:()=>{closePal();const t=prompt('Todo:');if(t)runSlashCommand('todo',t);}},
  {label:'Generate for the focus module…',kind:'cmd',run:()=>{closePal();const t=prompt('Intent:');if(t)runSlashCommand('gen',t);}},
  {label:'Pending questions',kind:'cmd',run:async()=>{closePal();try{const r=await api('/api/ask/pending');const n=(r.asks||[]).length;if(!n){toast('No pending questions');return;}if(n===1){mobileAskView(r.asks[0].id);}else{showDashboard();toast(n+' pending questions — see Needs me');}}catch(e){toast('⚠ '+e.message);}}},
  {label:'Playbook — what the brain knows',kind:'cmd',run:()=>{closePal();openTarget('/playbook.html',{title:'Playbook'});}},
  {label:'Open decisions.md',kind:'cmd',run:()=>{closePal();openDocWindow('decisions.md');}},
  {label:'New prototype',kind:'cmd',run:()=>{closePal();openTarget('/protos.html#new',{title:'Prototypes'});}},
  {label:'Run smoke QA',kind:'cmd',run:async()=>{closePal();toast('Running smoke QA…');try{const r=await api('/api/smoke/run',{method:'POST'});toast('Smoke QA: '+r.pass+'/'+r.total);}catch(e){toast('⚠ '+e.message);}}},
  {label:'Generate handoff',kind:'cmd',run:()=>{closePal();runHandoff();}},
  {label:'Weekly digest',kind:'cmd',run:()=>{closePal();openWeeklyDigest();}},
  {label:'Toggle theme',kind:'cmd',run:()=>{closePal();setTheme(document.documentElement.getAttribute('data-theme')==='light'?'dark':'light');}},
  {label:'Toggle Do Not Disturb',kind:'cmd',run:async()=>{closePal();const cur=(SETTINGS.notifyPrefs&&SETTINGS.notifyPrefs.dnd)||false;if(typeof setDnd==='function')setDnd(!cur);toast('DND '+(!cur?'on':'off'));}},
];
const PAL_OPEN={   // how each result kind opens, honoring the window policy
  file:r=>smartOpen(r.ref), chat:r=>openChat(r.ref),
  module:r=>openTarget('/entity.html#module='+r.ref,{title:r.label}),
  decision:r=>openDocWindow('decisions.md'),
  prompt:r=>openDocWindow(r.ref), report:r=>openDocWindow(r.ref),
  checklist:r=>openDocWindow('brain/qa/master-checklist.md'),
  todo:r=>{openTarget('/wishlist.html',{title:'Wishlist'});}, wishlist:r=>openTarget('/wishlist.html',{title:'Wishlist'}),
};
const PAL_ICON={file:'i-doc-sm',chat:'i-chat',module:'i-gauge',decision:'i-flag',prompt:'i-terminal',report:'i-doc-sm',checklist:'i-check',todo:'i-list',wishlist:'i-flag',cmd:'i-sparkle'};
let palSeq=0;
async function palFilter(q){
  const mySeq=++palSeq;
  if(q.startsWith('>')){   // command mode
    const cq=q.slice(1).trim().toLowerCase();
    palItems=PAL_COMMANDS.filter(c=>c.label.toLowerCase().includes(cq)).map(c=>({kind:'cmd',label:c.label,go:c.run}));
    palIdx=0; palRender(); return;
  }
  if(!q.trim()){   // empty → recent (pinned chats + recent files)
    const chats=(state.chatList||[]).slice(0,6).map(c=>({kind:'chat',label:(c.pinned?'📌 ':'')+(c.title||'Untitled'),go:()=>{closePal();openChat(c.id);}}));
    palItems=chats; palIdx=0; palRender(); return;
  }
  // client files first (instant), then server global index (all stores)
  const ql=q.toLowerCase();
  const files=(state.allFiles||[]).filter(p=>p.toLowerCase().includes(ql)).slice(0,6)
    .map(p=>({kind:'file',label:p,go:()=>{closePal();smartOpen(p);}}));
  palItems=files; palIdx=0; palRender();
  try{
    const {results}=await api('/api/search?q='+encodeURIComponent(q));
    if(mySeq!==palSeq) return;   // a newer keystroke won
    const KORDER=['module','decision','chat','report','prompt','checklist','todo','wishlist'];
    const server=results.filter(r=>r.kind!=='file')
      .sort((a,b)=>(KORDER.indexOf(a.kind)+1||99)-(KORDER.indexOf(b.kind)+1||99))   // cluster by kind so group headers don't repeat
      .map(r=>({kind:r.kind,label:r.label,go:()=>{closePal();(PAL_OPEN[r.kind]||(()=>{}))(r);}}));
    palItems=[...files,...server]; palRender();
  }catch{}
}
function palRender(){
  const box=$('palRes');
  if(!palItems.length){ box.innerHTML='<div class="none">No matches</div>'; return; }
  box.innerHTML='';
  let lastKind=null;
  palItems.forEach((it,i)=>{
    if(it.kind!==lastKind){ const h=document.createElement('div'); h.className='pal-grp'; h.textContent=it.kind; box.appendChild(h); lastKind=it.kind; }
    const d=document.createElement('div'); d.className='res'+(i===palIdx?' on':'');
    d.innerHTML=`${svg(PAL_ICON[it.kind]||'i-doc-sm','sm')} <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(it.label)}</span><span class="k">${it.kind}</span>`;
    d.onclick=it.go; d.onmousemove=()=>{palIdx=i;palRender();}; box.appendChild(d); });
}
$('palQ').addEventListener('input',e=>palFilter(e.target.value));
$('palQ').addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'){e.preventDefault();palIdx=Math.min(palItems.length-1,palIdx+1);palRender();}
  if(e.key==='ArrowUp'){e.preventDefault();palIdx=Math.max(0,palIdx-1);palRender();}
  if(e.key==='Enter'&&palItems[palIdx])palItems[palIdx].go();
  if(e.key==='Escape')closePal();
});
addEventListener('keydown',e=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); openPal(); } });
