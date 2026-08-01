// Sidebar v3 verification — V3 live pulse + reduced motion, V5 scrollbars, proto overlay button,
// Pinned-cap absence rule, precise row height, cleanup.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:4317';
const OUT = {}; const errs = {};
function fetchJSON(url, opts){ return new Promise((res,rej)=>{ const u=new URL(url); const r=http.request({hostname:u.hostname,port:u.port,path:u.pathname+u.search,method:(opts&&opts.method)||'GET',headers:(opts&&opts.headers)||{}}, rr=>{ let d=''; rr.on('data',c=>d+=c); rr.on('end',()=>{ try{res(JSON.parse(d));}catch(e){res({raw:d,code:rr.statusCode});} }); }); r.on('error',rej); if(opts&&opts.body) r.write(opts.body); r.end(); }); }
function hook(page,key){ errs[key]=[]; page.on('console',m=>{ if(m.type()==='error') errs[key].push('console: '+m.text()); }); page.on('pageerror',e=>errs[key].push('pageerror: '+e.message)); }
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function analyzeStrips(page, restB64, hoverB64){
  return page.evaluate(async(a,b)=>{
    async function pix(b64){
      const img=new Image();
      await new Promise((res,rej)=>{ img.onload=res; img.onerror=rej; img.src='data:image/png;base64,'+b64; });
      const c=document.createElement('canvas'); c.width=img.width; c.height=img.height;
      const x=c.getContext('2d'); x.drawImage(img,0,0);
      const d=x.getImageData(0,0,c.width,c.height).data;
      const m=new Map();
      for(let i=0;i<d.length;i+=4){ const k=d[i]+','+d[i+1]+','+d[i+2]; m.set(k,(m.get(k)||0)+1); }
      const sorted=[...m.entries()].sort((p,q)=>q[1]-p[1]);
      const total=d.length/4; const modal=sorted[0];
      return {total, modal:{rgb:modal[0],n:modal[1]}, nonModal: total-modal[1], second: sorted[1]?{rgb:sorted[1][0],n:sorted[1][1]}:null, colors:sorted.length};
    }
    return {rest: await pix(a), hover: await pix(b)};
  }, restB64, hoverB64);
}

async function stripShot(page, rect){
  return page.screenshot({encoding:'base64', clip:{x:Math.round(rect.right-11), y:Math.round(rect.top+3), width:10, height:Math.max(20,Math.round(rect.height-6))}});
}

async function scrollbarCase(page, name, getEl, results){
  // getEl: JS expression string returning the scroll container element
  const info = await page.evaluate((expr)=>{ const el=eval(expr); if(!el) return null; const r=el.getBoundingClientRect();
    return {rect:{top:r.top,right:r.right,height:Math.min(r.height, innerHeight-r.top-4)}, overflow: el.scrollHeight>el.clientHeight, sh:el.scrollHeight, ch:el.clientHeight,
      thumbRest: getComputedStyle(el,'::-webkit-scrollbar-thumb').backgroundColor}; }, getEl);
  if(!info){ results[name]={error:'element not found'}; return; }
  await page.mouse.move(4,4); await sleep(250);
  const rest = await stripShot(page, info.rect);
  // hover
  const cx = info.rect.right-30, cy = info.rect.top + Math.min(100, info.rect.height/2);
  await page.mouse.move(cx, cy); await sleep(300);
  const thumbHover = await page.evaluate((expr)=>{ const el=eval(expr); return getComputedStyle(el,'::-webkit-scrollbar-thumb').backgroundColor; }, getEl);
  const hover = await stripShot(page, info.rect);
  const px = await analyzeStrips(page, rest, hover);
  // wheel then move away: is-scrolling keeps thumb ~700ms
  await page.mouse.move(cx, cy); await page.mouse.wheel({deltaY:140}); await sleep(120);
  await page.mouse.move(4,4); await sleep(80);
  const during = await page.evaluate((expr)=>{ const el=eval(expr); return {cls:el.classList.contains('is-scrolling'), thumb:getComputedStyle(el,'::-webkit-scrollbar-thumb').backgroundColor}; }, getEl);
  const scrollShot = await stripShot(page, info.rect);
  await sleep(950);
  const after = await page.evaluate((expr)=>{ const el=eval(expr); el.scrollTop=0; return {cls:el.classList.contains('is-scrolling'), thumb:getComputedStyle(el,'::-webkit-scrollbar-thumb').backgroundColor}; }, getEl);
  const px2 = await analyzeStrips(page, rest, scrollShot);
  results[name] = {overflow:info.overflow, sh:info.sh, ch:info.ch, thumbRest:info.thumbRest, thumbHover,
    restNonModalPx: px.rest.nonModal, hoverNonModalPx: px.hover.nonModal, hoverSecondColor: px.hover.second,
    isScrollingNoHover: during, scrollNonModalPx: px2.hover.nonModal, afterDecay: after};
}

(async()=>{
  const udd='/private/tmp/claude-501/-Users-vlad-projects/553c1ee7-1285-4225-89db-f7e338dded1a/scratchpad/prof-live-'+Date.now();
  const browser=await puppeteer.launch({executablePath:CHROME, headless:'new', userDataDir:udd, args:['--window-size=1300,720']});
  const page=await browser.newPage();
  await page.setViewport({width:1280, height:700});
  hook(page,'live-turn');
  await page.goto(BASE+'/', {waitUntil:'networkidle2'});
  await page.waitForSelector('#paneChats .item');

  // precise row height + line metrics
  OUT.rowMetrics = await page.evaluate(()=>{ const r=document.querySelector('#paneChats .item'); const s=getComputedStyle(r);
    return {h:r.getBoundingClientRect().height, pad:s.padding, lineHeight:s.lineHeight, fontSize:s.fontSize, margin:s.margin}; });

  // ---------- V3: real live turn on a NEW non-bp chat ----------
  await page.evaluate(()=>newChat());
  await sleep(400);
  await page.type('#input', 'Reply with just: ok');
  await page.click('#sendBtn');
  const t0=Date.now();
  let liveSeen=null, liveSamples=[];
  while(Date.now()-t0 < 90000){
    const s = await page.evaluate(()=>{
      const lr=document.querySelector('#paneChats .item.live');
      const sending = !!(window.state && state.sending);
      if(!lr) return {live:false, sending, chatId: state&&state.chatId};
      const mark = lr.querySelector('.chi, .bpchip');
      const cs = mark ? getComputedStyle(mark) : null;
      const title = ([...lr.querySelectorAll('span')].find(s=>!s.classList.contains('bpchip'))||{}).textContent||'';
      return {live:true, sending, chatId: state&&state.chatId, title:title.slice(0,30), markCls: mark&&(mark.className.baseVal!==undefined?mark.className.baseVal:mark.className), animName: cs&&cs.animationName, animDur: cs&&cs.animationDuration, opacity: cs&&cs.opacity};
    });
    liveSamples.push({t:Date.now()-t0, ...s});
    if(s.live && !liveSeen) liveSeen=s;
    if(liveSeen && !s.live && !s.sending) break;
    await sleep(400);
  }
  OUT.liveDuring = liveSeen;
  OUT.liveSampleCount = liveSamples.length;
  OUT.liveOpacitySamples = [...new Set(liveSamples.filter(s=>s.live).map(s=>s.opacity))].slice(0,8);
  const testChatId = liveSamples.map(s=>s.chatId).filter(Boolean).pop();
  OUT.testChatId = testChatId;
  await sleep(600);
  OUT.liveAfter = await page.evaluate(()=>{
    const lr=document.querySelector('#paneChats .item.live');
    const rows=[...document.querySelectorAll('#paneChats .item')];
    const first=rows[0]; const mark=first&&first.querySelector('.chi,.bpchip');
    return {anyLiveClass: !!lr, firstRowAnim: mark?getComputedStyle(mark).animationName:null, reply: (document.querySelector('.chat')||{}).textContent ? document.querySelector('.chat').textContent.slice(-120):null};
  });

  // ---------- V3b: reduced motion ----------
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion', value:'reduce'}]);
  OUT.reducedMotion = await page.evaluate(()=>{
    const r=[...document.querySelectorAll('#paneChats .item')][1];
    r.classList.add('live');
    const mark=r.querySelector('.chi,.bpchip');
    const cs=getComputedStyle(mark);
    const af=getComputedStyle(r,'::after');
    const out={matches: matchMedia('(prefers-reduced-motion: reduce)').matches, markAnim: cs.animationName,
      after:{content:af.content, w:af.width, h:af.height, bg:af.backgroundColor, radius:af.borderRadius, pos:af.position, left:af.left, top:af.top}};
    r.classList.remove('live');
    return out;
  });
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion', value:'no-preference'}]);
  OUT.motionRestored = await page.evaluate(()=>{
    const r=[...document.querySelectorAll('#paneChats .item')][1];
    r.classList.add('live');
    const cs=getComputedStyle(r.querySelector('.chi,.bpchip'));
    const af=getComputedStyle(r,'::after');
    const out={markAnim: cs.animationName, dur: cs.animationDuration, afterContent: af.content};
    r.classList.remove('live');
    return out;
  });

  // ---------- proto overlay button (runtime) ----------
  await page.evaluate(()=>openHtmlOverlay('prototypes/buttons/buttons.html','buttons'));
  await sleep(700);
  OUT.protoOverlay = await page.evaluate(()=>{
    const b=[...document.querySelectorAll('.hf-bar .hf-pbtn')].find(b=>b.textContent.includes('Prototype theme'));
    const out=b?{text:b.textContent.trim(), title:b.title, cls:b.className}:null;
    closeHtmlOverlay();
    return out;
  });

  // ---------- V5 scrollbars, both themes ----------
  for(const theme of ['dark','light']){
    hook(page,'v5-'+theme);
    await page.goto(BASE+'/?theme='+theme,{waitUntil:'networkidle2'});
    await page.waitForSelector('#paneChats .item');
    const borderActive = await page.evaluate(()=>{ const el=document.createElement('div'); el.style.backgroundColor='var(--border-active)'; document.body.appendChild(el); const c=getComputedStyle(el).backgroundColor; el.remove(); return c; });
    const res={borderActive};
    // 1. sidebar list
    await scrollbarCase(page,'sidebar',"document.getElementById('paneChats')",res);
    // 2. chat transcript — open long chat
    await page.evaluate(async()=>{ const {chats}=await (await fetch('/api/chats')).json(); const c=chats.find(c=>c.title.startsWith('Count slowly from 1 to 40')); await openChat(c.id); });
    await sleep(900);
    await scrollbarCase(page,'transcript',"document.querySelector('.chat')",res);
    // 3. explorer main
    await page.evaluate(()=>openExpl(''));
    await sleep(1200);
    const explOverflow = await page.evaluate(()=>{ const el=document.getElementById('explMain'); return el && el.scrollHeight>el.clientHeight; });
    if(!explOverflow){
      await page.evaluate(async()=>{ // shrink explorer window so main overflows
        const el=document.getElementById('explWin'); el.style.height='300px'; el.style.width='520px'; });
      await sleep(300);
    }
    await scrollbarCase(page,'explorerMain',"document.getElementById('explMain')",res);
    await page.evaluate(()=>{ const w=document.getElementById('explWrap'); if(w) w.classList.remove('show'); const el=document.getElementById('explWin'); if(el){el.style.height='';el.style.width='';} });
    // 4. document window
    await page.evaluate(()=>openDocWindow('decisions.md'));
    await sleep(1200);
    await scrollbarCase(page,'docWindow',"document.querySelector('.docwin .dp-body')",res);
    await page.evaluate(()=>{ document.querySelectorAll('.docwin').forEach(w=>w.remove()); });
    OUT['v5-'+theme]=res;
  }

  // tree.html page-level scrollbar (dark + light)
  for(const theme of ['dark','light']){
    const pg=await browser.newPage(); await pg.setViewport({width:1100, height:640});
    hook(pg,'tree-'+theme);
    await pg.goto(BASE+'/tree.html?theme='+theme,{waitUntil:'networkidle2'}); await sleep(800);
    const info=await pg.evaluate(()=>{ const el=document.scrollingElement; return {overflow: el.scrollHeight>el.clientHeight, thumbRest: getComputedStyle(document.documentElement,'::-webkit-scrollbar-thumb').backgroundColor}; });
    const rest=await pg.screenshot({encoding:'base64', clip:{x:1100-11,y:60,width:10,height:400}});
    await pg.mouse.move(550,300); await sleep(300);
    const thumbHover=await pg.evaluate(()=>getComputedStyle(document.documentElement,'::-webkit-scrollbar-thumb').backgroundColor);
    const hov=await pg.screenshot({encoding:'base64', clip:{x:1100-11,y:60,width:10,height:400}});
    const px=await analyzeStrips(pg, rest, hov);
    OUT['v5-tree-'+theme]={...info, thumbHover, restNonModalPx:px.rest.nonModal, hoverNonModalPx:px.hover.nonModal, hoverSecond:px.hover.second};
    await pg.close();
  }

  // ---------- Pinned cap absence rule ----------
  const pinnedNow=(await fetchJSON(BASE+'/api/chats')).chats.filter(c=>c.pinned);
  OUT.pinnedNow=pinnedNow.map(c=>c.id);
  for(const c of pinnedNow) await fetchJSON(BASE+'/api/chat/meta',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:c.id,pinned:false})});
  await page.goto(BASE+'/',{waitUntil:'networkidle2'}); await page.waitForSelector('#paneChats .item');
  OUT.capsNoPinned = await page.evaluate(()=>[...document.querySelectorAll('#paneChats .pane-cap')].map(e=>e.textContent));
  for(const c of pinnedNow) await fetchJSON(BASE+'/api/chat/meta',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:c.id,pinned:true})});
  await page.reload({waitUntil:'networkidle2'}); await page.waitForSelector('#paneChats .item');
  OUT.capsRestored = await page.evaluate(()=>[...document.querySelectorAll('#paneChats .pane-cap')].map(e=>e.textContent));

  // ---------- cleanup: delete test chat ----------
  if(testChatId){
    const del=await fetchJSON(BASE+'/api/chat?id='+testChatId,{method:'DELETE'});
    OUT.cleanupDelete={id:testChatId, resp:del};
  }
  OUT.finalChats=(await fetchJSON(BASE+'/api/chats')).chats.slice(0,3).map(c=>({id:c.id,title:c.title.slice(0,30),pinned:c.pinned}));
  OUT.finalPinned=(await fetchJSON(BASE+'/api/chats')).chats.filter(c=>c.pinned).map(c=>c.id);
  OUT.consoleErrors=errs;
  await browser.close();
  fs.writeFileSync(__dirname+'/sb3-live-results.json', JSON.stringify(OUT,null,2));
  console.log('DONE');
})().catch(e=>{ OUT.FATAL=e.stack; fs.writeFileSync(__dirname+'/sb3-live-results.json', JSON.stringify(OUT,null,2)); console.error(e); process.exit(1); });
