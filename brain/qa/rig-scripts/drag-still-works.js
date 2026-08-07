const puppeteer=require('puppeteer-core');
(async()=>{
  const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});
  const p=await b.newPage(); await p.setViewport({width:1500,height:950});
  const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://127.0.0.1:4317/',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,1500));
  await p.evaluate(()=>USAGEWIN.open&&USAGEWIN.open());
  await new Promise(r=>setTimeout(r,1200));
  const before=await p.evaluate(()=>{const e=document.getElementById('uwPanel');return{x:e.offsetLeft,y:e.offsetTop}});
  // drag from the header/title area (non-interactive)
  const grip=await p.evaluate(()=>{const e=document.getElementById('uwPanel');const r=e.getBoundingClientRect();return{x:r.x+40,y:r.y+10}});
  await p.mouse.move(grip.x,grip.y); await p.mouse.down();
  await p.mouse.move(grip.x-120,grip.y+90,{steps:8}); await p.mouse.up();
  await new Promise(r=>setTimeout(r,400));
  const after=await p.evaluate(()=>{const e=document.getElementById('uwPanel');return{x:e.offsetLeft,y:e.offsetTop}});
  const moved=Math.abs(after.x-before.x)>50&&Math.abs(after.y-before.y)>40;
  console.log('before',JSON.stringify(before),'after',JSON.stringify(after));
  console.log('DRAG STILL WORKS:',moved?'PASS':'FAIL');
  // refresh button still clickable?
  const rb=await p.evaluate(()=>!!document.querySelector('#uwBody .uw-refresh'));
  console.log('refresh button present:',rb?'PASS':'FAIL');
  console.log('console errors:',errs.length);
  await b.close();
})().catch(e=>{console.error('RIGFAIL',e.message);process.exit(1)});
