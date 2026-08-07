const puppeteer=require('puppeteer-core');
(async()=>{
  const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});
  const p=await b.newPage(); await p.setViewport({width:1500,height:950});
  const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://127.0.0.1:4317/',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,1500));
  await p.evaluate(()=>{localStorage.removeItem('crs-usagewin-auto'); USAGEWIN.open&&USAGEWIN.open()});
  await new Promise(r=>setTimeout(r,1500));
  const pre=await p.evaluate(()=>{const c=document.querySelector('#uwBody .uw-auto-cb');return{exists:!!c,checked:c&&c.checked,ls:localStorage.getItem('crs-usagewin-auto'),hasOnchange:!!(c&&c.onchange)}});
  console.log('BEFORE click:',JSON.stringify(pre));
  // click it like a user
  const box=await p.evaluate(()=>{const c=document.querySelector('#uwBody .uw-auto-cb');const r=c.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}});
  await p.mouse.click(box.x,box.y);
  const t0=await p.evaluate(()=>({checked:document.querySelector('#uwBody .uw-auto-cb').checked,ls:localStorage.getItem('crs-usagewin-auto')}));
  console.log('IMMEDIATELY after click:',JSON.stringify(t0));
  await new Promise(r=>setTimeout(r,5000)); // let a 4s tick() re-render happen
  const t1=await p.evaluate(()=>({checked:document.querySelector('#uwBody .uw-auto-cb').checked,ls:localStorage.getItem('crs-usagewin-auto')}));
  console.log('after 5s (one re-render):',JSON.stringify(t1));
  console.log('VERDICT:', (t1.checked&&t1.ls==='1')?'sticks — PASS':'RESET — BUG REPRODUCED');
  console.log('console errors:',errs.length,errs.slice(0,3));
  await b.close();
})().catch(e=>{console.error('RIGFAIL',e.message);process.exit(1)});
