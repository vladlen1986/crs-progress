// V3 retest: pulse on a chat whose sidebar row already exists (turn 2 of a fresh test chat)
const puppeteer=require('puppeteer-core');
const fs=require('fs'); const http=require('http');
const OUT={}; const errs=[];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function del(url){ return new Promise((res,rej)=>{ const u=new URL(url); const r=http.request({hostname:u.hostname,port:u.port,path:u.pathname+u.search,method:'DELETE'},rr=>{let d='';rr.on('data',c=>d+=c);rr.on('end',()=>res(d));}); r.on('error',rej); r.end(); }); }
(async()=>{
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});
const p=await b.newPage(); await p.setViewport({width:1280,height:800});
p.on('console',m=>{ if(m.type()==='error') errs.push('console: '+m.text()); });
p.on('pageerror',e=>errs.push('pageerror: '+e.message));
await p.goto('http://localhost:4317/',{waitUntil:'networkidle2'});
await p.waitForSelector('#paneChats .item');
// turn 1: create chat
await p.evaluate(()=>newChat()); await sleep(300);
await p.type('#input','Reply with just: ok');
await p.click('#sendBtn');
let chatId=null; const t0=Date.now();
while(Date.now()-t0<90000){ const s=await p.evaluate(()=>({sending: !!(state&&state.sending), id: state&&state.chatId})); chatId=s.id||chatId; if(chatId&&!s.sending) break; await sleep(400); }
OUT.chatId=chatId;
await sleep(800);
// row should now exist in sidebar
OUT.rowExists = await p.evaluate(()=>!![...document.querySelectorAll('#paneChats .item')].length);
// turn 2: watch live pulse
await p.type('#input','Reply with just: ok again');
await p.click('#sendBtn');
const t1=Date.now(); let seen=null; const samples=[];
while(Date.now()-t1<90000){
  const s=await p.evaluate(()=>{
    const lr=document.querySelector('#paneChats .item.live');
    const sending=!!(state&&state.sending);
    if(!lr) return {live:false,sending};
    const mark=lr.querySelector('.chi,.bpchip'); const cs=mark&&getComputedStyle(mark);
    const title=([...lr.querySelectorAll('span')].find(s=>!s.classList.contains('bpchip'))||{}).textContent||'';
    return {live:true,sending,title:title.slice(0,30),animName:cs&&cs.animationName,animDur:cs&&cs.animationDuration,opacity:cs&&cs.opacity,liveCount:document.querySelectorAll('#paneChats .item.live').length};
  });
  samples.push(s);
  if(s.live&&!seen) seen=s;
  if(seen&&!s.live&&!s.sending) break;
  await sleep(250);
}
OUT.liveDuring=seen;
OUT.opacities=[...new Set(samples.filter(s=>s.live).map(s=>s.opacity))].slice(0,10);
OUT.liveSamples=samples.filter(s=>s.live).length;
await sleep(600);
OUT.after=await p.evaluate(()=>{
  const any=!!document.querySelector('#paneChats .item.live');
  const rows=[...document.querySelectorAll('#paneChats .item')];
  const first=rows[0]; const mark=first.querySelector('.chi,.bpchip');
  return {anyLive:any, firstRowAnim:getComputedStyle(mark).animationName};
});
OUT.consoleErrors=errs;
await b.close();
// cleanup
if(chatId){ OUT.cleanup = await del('http://localhost:4317/api/chat?id='+chatId); }
fs.writeFileSync(__dirname+'/sb3-live2-results.json', JSON.stringify(OUT,null,2));
console.log(JSON.stringify(OUT,null,1));
})().catch(e=>{OUT.FATAL=e.stack; fs.writeFileSync(__dirname+'/sb3-live2-results.json', JSON.stringify(OUT,null,2)); console.error(e); process.exit(1);});
