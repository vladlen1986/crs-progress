// Sidebar v3 verification — main script: V1, V2, V4, V6, V7(index/map/tree/playbook), static includes
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const http = require('http');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:4317';
const OUT = {};
const errs = {};

function fetchText(url){ return new Promise((res,rej)=>{ http.get(url, r=>{ let d=''; r.on('data',c=>d+=c); r.on('end',()=>res({code:r.statusCode, body:d})); }).on('error',rej); }); }

function hookConsole(page, key){
  errs[key] = [];
  page.on('console', m => { if(m.type()==='error') errs[key].push('console: '+m.text()); });
  page.on('pageerror', e => errs[key].push('pageerror: '+e.message));
}

async function resolveVar(page, name){
  return page.evaluate((n)=>{
    const el=document.createElement('div'); el.style.color=`var(${n})`; el.style.display='none'; document.body.appendChild(el);
    const c=getComputedStyle(el).color; el.remove(); return c;
  }, name);
}
async function resolveVarBg(page, name){
  return page.evaluate((n)=>{
    const el=document.createElement('div'); el.style.backgroundColor=`var(${n})`; el.style.display='none'; document.body.appendChild(el);
    const c=getComputedStyle(el).backgroundColor; el.remove(); return c;
  }, name);
}

async function auditSidebar(page){
  return page.evaluate(()=>{
    const left = document.querySelector('.col.left');
    const kids = [...left.children].map(e=>({tag:e.tagName, id:e.id||null, cls:e.className||null, display:getComputedStyle(e).display}));
    const railVisible = getComputedStyle(left.querySelector('.side-rail')).display !== 'none';
    const legend = left.querySelector('.legend, [class*="legend"]');
    const newbtn = left.querySelector('.newbtn');
    const chatActions = document.getElementById('chatActions');
    const caKids = chatActions ? [...chatActions.children].map(e=>e.tagName+'.'+e.className) : null;
    const chatNew = chatActions && chatActions.querySelector('.chat-new');
    const cnRect = chatNew ? chatNew.getBoundingClientRect() : null;
    const pane = document.getElementById('paneChats');
    const paneKids = [...pane.children].map(e=>({cls:e.className, txt:e.classList.contains('pane-cap')?e.textContent:null}));
    const caps = [...pane.querySelectorAll('.pane-cap')].map(e=>e.textContent);
    // row structure audit
    const rows = [...pane.querySelectorAll('.item')].slice(0,50).map(r=>{
      const nodes = [...r.childNodes].map(n=> n.nodeType===3 ? '#text:'+n.textContent.trim() : n.tagName+(n.className&&n.className.baseVal!==undefined? '.'+n.className.baseVal : '.'+(n.className||'')));
      const hasMeta = !!r.querySelector('.meta');
      const hasPinIco = !!r.querySelector('[class*="pin"]');
      const timeText = /\d{1,2}:\d{2}|\bago\b|\byesterday\b/i.test(r.textContent);
      const h = r.getBoundingClientRect().height;
      return {nodes, hasMeta, hasPinIco, timeText, h: Math.round(h*10)/10};
    });
    const foot = left.querySelector('.side-foot');
    return {kids, railVisible, legend: legend?legend.className:null, newbtn: !!newbtn, caKids,
      cnRect: cnRect?{w:cnRect.width,h:cnRect.height}:null, paneCaps: caps, paneKidsFirst: paneKids.slice(0,6),
      rows, footText: foot?foot.textContent.trim():null};
  });
}

async function hoverRowDiff(page){
  // capture opacity/visibility of all descendants of 2nd row before/after hover
  const sel = '#paneChats .item';
  await page.evaluate(()=>window.scrollTo(0,0));
  const before = await page.evaluate((sel)=>{
    const r=document.querySelectorAll(sel)[1];
    return [...r.querySelectorAll('*')].map((e,i)=>({i, tag:e.tagName, cls:(e.className.baseVal!==undefined?e.className.baseVal:e.className)||'', op:getComputedStyle(e).opacity, vis:getComputedStyle(e).visibility, disp:getComputedStyle(e).display}));
  }, sel);
  const box = await page.evaluate((sel)=>{ const r=document.querySelectorAll(sel)[1].getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; }, sel);
  await page.mouse.move(box.x, box.y);
  await new Promise(r=>setTimeout(r,300));
  const after = await page.evaluate((sel)=>{
    const r=document.querySelectorAll(sel)[1];
    return [...r.querySelectorAll('*')].map((e,i)=>({i, tag:e.tagName, cls:(e.className.baseVal!==undefined?e.className.baseVal:e.className)||'', op:getComputedStyle(e).opacity, vis:getComputedStyle(e).visibility, disp:getComputedStyle(e).display}));
  }, sel);
  const changes = [];
  for(let i=0;i<Math.max(before.length,after.length);i++){
    const b=before[i], a=after[i];
    if(!b||!a){ changes.push({i, note:'count-change'}); continue; }
    if(b.op!==a.op||b.vis!==a.vis||b.disp!==a.disp) changes.push({i, tag:a.tag, cls:a.cls, from:{op:b.op,vis:b.vis}, to:{op:a.op,vis:a.vis}});
  }
  await page.mouse.move(5,5);
  return changes;
}

(async()=>{
  // static page includes (11 pages)
  const pages = ['index.html','activity.html','cost.html','entity.html','map.html','memory.html','playbook.html','protos.html','queue.html','tree.html','wishlist.html'];
  OUT.staticIncludes = {};
  for(const p of pages){
    const {code, body} = await fetchText(BASE+'/'+p);
    OUT.staticIncludes[p] = {code, css:/scrollbars\.css/.test(body), js:/js\/scrollbars\.js/.test(body)};
  }

  const chats = JSON.parse((await fetchText(BASE+'/api/chats')).body).chats;
  const bpChat = chats.find(c=>c.bp);
  const nonBp = chats.find(c=>!c.bp && !c.pinned);
  OUT.bpChatUsed = bpChat && {id:bpChat.id, title:bpChat.title.slice(0,40)};
  OUT.pinnedPre = chats.filter(c=>c.pinned).map(c=>c.id);

  const udd = '/private/tmp/claude-501/-Users-vlad-projects/553c1ee7-1285-4225-89db-f7e338dded1a/scratchpad/prof-main-'+Date.now();
  const browser = await puppeteer.launch({executablePath: CHROME, headless: 'new', userDataDir: udd, args:['--window-size=1400,900']});
  const page = await browser.newPage();
  await page.setViewport({width:1380, height:860});

  for(const theme of ['dark','light']){
    hookConsole(page, 'index-'+theme);
    await page.goto(BASE+'/?theme='+theme, {waitUntil:'networkidle2'});
    await page.waitForSelector('#paneChats .item');
    const dt = await page.evaluate(()=>document.documentElement.getAttribute('data-theme'));
    const audit = await auditSidebar(page);
    audit.dataTheme = dt;
    audit.hoverChanges = await hoverRowDiff(page);

    // V2 marks
    const accentSoft = await resolveVar(page, '--accent-soft');
    const accentTint = await resolveVarBg(page, '--accent-tint');
    const textMuted = await resolveVar(page, '--text-muted');
    const marks = await page.evaluate((bpId, nbId)=>{
      const find=id=>[...document.querySelectorAll('#paneChats .item')].find(r=>r._c? r._c.id===id : (r.onclick+'' ).includes(id)) ;
      // rows don't carry id attrs; match by title lookup via API list order isn't reliable — use dataset? fallback: use chip presence
      const rows=[...document.querySelectorAll('#paneChats .item')];
      const chipRow = rows.find(r=>r.querySelector('.bpchip'));
      const glyphRow = rows.find(r=>r.querySelector('svg.chi'));
      const chip = chipRow && chipRow.querySelector('.bpchip');
      const chi = glyphRow && glyphRow.querySelector('svg.chi');
      const cs = chip && getComputedStyle(chip);
      const gs = chi && getComputedStyle(chi);
      const gr = chi && chi.getBoundingClientRect();
      return {
        chipText: chip&&chip.textContent, chipColor: cs&&cs.color, chipBg: cs&&cs.backgroundColor,
        chipFont: cs&&cs.font, chipFontSize: cs&&cs.fontSize, chipFamily: cs&&cs.fontFamily,
        glyphColor: gs&&gs.color, glyphSize: gr&&{w:gr.width,h:gr.height},
        chipRowTitle: chipRow&&chipRow.textContent.slice(0,40), glyphRowTitle: glyphRow&&glyphRow.textContent.slice(0,40)
      };
    }, bpChat?bpChat.id:'', nonBp?nonBp.id:'');
    audit.marks = {resolved:{accentSoft, accentTint, textMuted}, observed:marks};

    // selected row (V4 visual part)
    await page.evaluate(()=>{ document.querySelectorAll('#paneChats .item')[0].click(); });
    await new Promise(r=>setTimeout(r,700));
    const accentGlow = await resolveVarBg(page, '--accent-glow');
    const accent = await resolveVar(page, '--accent');
    const selected = await page.evaluate(()=>{
      const on=document.querySelector('#paneChats .item.on');
      if(!on) return null;
      const s=getComputedStyle(on);
      return {bg:s.backgroundColor, boxShadow:s.boxShadow, h:Math.round(on.getBoundingClientRect().height*10)/10};
    });
    audit.selected = {resolved:{accentGlow, accent}, observed:selected};
    OUT['audit-'+theme] = audit;
  }

  // V4 width on fresh profile (no localStorage.leftW) — this profile is fresh; but ?theme= writes crs-theme only
  const width = await page.evaluate(()=>{
    return {leftW_ls: localStorage.getItem('leftW'), colLeft: document.querySelector('.col.left').getBoundingClientRect().width,
      gridVar: getComputedStyle(document.querySelector('.app')).gridTemplateColumns};
  });
  OUT.width = width;

  // V6 theme control
  hookConsole(page, 'v6');
  const v6 = {};
  v6.controls = await page.evaluate(()=>{
    const head=document.querySelector('.center-head');
    const ctl=[...head.querySelectorAll('[onclick]')].filter(b=>(b.getAttribute('onclick')||'').includes('setTheme'));
    return {count: ctl.length, ids: ctl.map(b=>b.id||b.className), themeSeg: !!document.getElementById('themeSeg'), thLight: !!document.getElementById('thLight'), thDark: !!document.getElementById('thDark')};
  });
  const t0 = await page.evaluate(()=>document.documentElement.getAttribute('data-theme'));
  await page.click('#themeToggle'); await new Promise(r=>setTimeout(r,200));
  const t1 = await page.evaluate(()=>document.documentElement.getAttribute('data-theme'));
  await page.click('#themeToggle'); await new Promise(r=>setTimeout(r,200));
  const t2 = await page.evaluate(()=>document.documentElement.getAttribute('data-theme'));
  v6.flip = {t0,t1,t2};
  v6.protoBtn = await page.evaluate(()=>{
    const b=[...document.querySelectorAll('button.hf-pbtn')].find(b=>b.textContent.includes('Prototype theme'));
    return b?{text:b.textContent.trim(), title:b.title}:null;
  });
  OUT.v6 = v6;

  // V4 pin flow via UI (use a non-pinned, non-bp chat that we won't touch otherwise)
  const pinTarget = chats.find(c=>c.title==='can you generate images') || chats.filter(c=>!c.pinned && !c.bp)[1];
  OUT.pinTarget = {id:pinTarget.id, title:pinTarget.title.slice(0,40)};
  async function rowIndexInfo(id){
    return page.evaluate(async(id)=>{
      const {chats}=await (await fetch('/api/chats')).json();
      const c=chats.find(c=>c.id===id);
      // locate row by title text
      const rows=[...document.querySelectorAll('#paneChats > *')];
      let section='(none)'; let found=null;
      for(const el of rows){
        if(el.classList.contains('pane-cap')) section=el.textContent;
        else if(el.classList.contains('item')){
          const sp=[...el.querySelectorAll('span')].find(s=>!s.classList.contains('bpchip'));
          if(sp && sp.textContent.startsWith((c.title||'Untitled').slice(0,22))){ found=section; break; }
        }
      }
      return {pinned:c.pinned, section:found};
    }, id);
  }
  async function clickMenuAct(id, act){
    // hover row matching chat title, click ⋮, click act
    const cInfo = chats.find(c=>c.id===id);
    const pos = await page.evaluate((title)=>{
      const rows=[...document.querySelectorAll('#paneChats .item')];
      const r=rows.find(r=>{ const sp=[...r.querySelectorAll('span')].find(s=>!s.classList.contains('bpchip')); return sp && sp.textContent.startsWith(title.slice(0,22)); });
      if(!r) return null; r.scrollIntoView({block:'center'});
      const b=r.getBoundingClientRect(); return {x:b.x+b.width/2, y:b.y+b.height/2};
    }, cInfo.title||'Untitled');
    await page.mouse.move(pos.x, pos.y); await new Promise(r=>setTimeout(r,200));
    const mb = await page.evaluate((title)=>{
      const rows=[...document.querySelectorAll('#paneChats .item')];
      const r=rows.find(r=>{ const sp=[...r.querySelectorAll('span')].find(s=>!s.classList.contains('bpchip')); return sp && sp.textContent.startsWith(title.slice(0,22)); });
      const m=r.querySelector('.cmenu'); const b=m.getBoundingClientRect(); return {x:b.x+b.width/2,y:b.y+b.height/2, op:getComputedStyle(m).opacity};
    }, cInfo.title||'Untitled');
    await page.mouse.click(mb.x, mb.y); await new Promise(r=>setTimeout(r,300));
    const acted = await page.evaluate((act)=>{
      const m=document.getElementById('chatMenu'); if(!m||m.style.display==='none') return {menu:false};
      const items=[...m.querySelectorAll('button[data-act]')].map(b=>b.dataset.act+':'+b.textContent);
      const b=m.querySelector(`button[data-act="${act}"]`); if(b) b.click();
      return {menu:true, items, clicked: !!b};
    }, act);
    await new Promise(r=>setTimeout(r,600));
    return {kebabOpacityOnHover: mb.op, acted};
  }
  const pinFlow = {};
  pinFlow.before = await rowIndexInfo(pinTarget.id);
  pinFlow.pinClick = await clickMenuAct(pinTarget.id, 'pin');
  pinFlow.afterPin = await rowIndexInfo(pinTarget.id);
  await page.reload({waitUntil:'networkidle2'}); await page.waitForSelector('#paneChats .item'); await new Promise(r=>setTimeout(r,400));
  pinFlow.afterReload = await rowIndexInfo(pinTarget.id);
  // refresh chats cache for menu label
  pinFlow.unpinClick = await clickMenuAct(pinTarget.id, 'pin');
  pinFlow.afterUnpin = await rowIndexInfo(pinTarget.id);
  OUT.pinFlow = pinFlow;

  // check Pinned cap presence rule: current pinned set
  OUT.capsAfterPinFlow = await page.evaluate(()=>[...document.querySelectorAll('#paneChats .pane-cap')].map(e=>e.textContent));

  // V7: map, tree, playbook consoles
  for(const p of ['map.html','tree.html','playbook.html']){
    const pg = await browser.newPage();
    hookConsole(pg, p);
    await pg.goto(BASE+'/'+p, {waitUntil:'networkidle2'});
    await new Promise(r=>setTimeout(r,1500));
    // runtime scrollbars check
    OUT['runtime-scrollbars-'+p] = await pg.evaluate(async()=>{
      const cssLoaded=[...document.styleSheets].some(s=>s.href&&s.href.includes('scrollbars.css'));
      const el=document.scrollingElement||document.documentElement;
      const target=document.querySelector('.wrap,main,body')||el;
      target.dispatchEvent(new Event('scroll'));
      const has=target.classList.contains('is-scrolling');
      await new Promise(r=>setTimeout(r,900));
      const gone=!target.classList.contains('is-scrolling');
      return {cssLoaded, classAdded:has, classCleared:gone};
    });
    await pg.close();
  }
  // runtime check on index
  OUT['runtime-scrollbars-index'] = await page.evaluate(async()=>{
    const cssLoaded=[...document.styleSheets].some(s=>s.href&&s.href.includes('scrollbars.css'));
    const t=document.getElementById('paneChats');
    t.dispatchEvent(new Event('scroll'));
    const has=t.classList.contains('is-scrolling');
    await new Promise(r=>setTimeout(r,900));
    const gone=!t.classList.contains('is-scrolling');
    return {cssLoaded, classAdded:has, classCleared:gone};
  });

  OUT.consoleErrors = errs;
  await browser.close();
  fs.writeFileSync(__dirname+'/sb3-main-results.json', JSON.stringify(OUT,null,2));
  console.log('DONE');
})().catch(e=>{ OUT.FATAL=e.stack; fs.writeFileSync(__dirname+'/sb3-main-results.json', JSON.stringify(OUT,null,2)); console.error(e); process.exit(1); });
