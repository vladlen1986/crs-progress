const puppeteer=require('puppeteer-core');
const fs=require('fs');
(async()=>{
for(const mode of ['new', false]){
  const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:mode,args:['--window-size=1300,760']});
  const p=await b.newPage(); await p.setViewport({width:1280,height:700});
  await p.goto('http://localhost:4317/',{waitUntil:'networkidle2'});
  await p.waitForSelector('#paneChats .item');
  const tag = mode==='new'?'hl':'hf';
  const sc = await p.evaluate(()=>{ const el=document.getElementById('paneChats'); const s=getComputedStyle(el);
    return {sbColor:s.scrollbarColor, sbWidth:s.scrollbarWidth, cw:el.clientWidth, ow:el.offsetWidth}; });
  console.log(tag,'rest', JSON.stringify(sc));
  const r = await p.evaluate(()=>{ const b=document.getElementById('paneChats').getBoundingClientRect(); return {x:b.x,y:b.y,w:b.width,h:b.height}; });
  await p.mouse.move(640,20); await new Promise(q=>setTimeout(q,300));
  await p.screenshot({path:`sb3-probe-${tag}-rest.png`, clip:{x:r.x,y:r.y,width:r.w,height:Math.min(r.h,500)}});
  await p.mouse.move(r.x+r.w/2, r.y+150); await new Promise(q=>setTimeout(q,300));
  const sch = await p.evaluate(()=>{ const el=document.getElementById('paneChats'); const s=getComputedStyle(el); return {sbColor:s.scrollbarColor}; });
  console.log(tag,'hover', JSON.stringify(sch));
  await p.screenshot({path:`sb3-probe-${tag}-hover.png`, clip:{x:r.x,y:r.y,width:r.w,height:Math.min(r.h,500)}});
  await p.mouse.wheel({deltaY:200}); await new Promise(q=>setTimeout(q,150));
  await p.mouse.move(640,20); await new Promise(q=>setTimeout(q,100));
  await p.screenshot({path:`sb3-probe-${tag}-scroll.png`, clip:{x:r.x,y:r.y,width:r.w,height:Math.min(r.h,500)}});
  await b.close();
}
console.log('OK');
})().catch(e=>{console.error(e);process.exit(1)});
