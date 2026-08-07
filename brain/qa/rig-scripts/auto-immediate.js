const puppeteer=require('puppeteer-core');
(async()=>{
  const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});
  const p=await b.newPage(); await p.setViewport({width:1500,height:950});
  const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push(e.message));
  let populateCalls=0;
  await p.setRequestInterception(true);
  // Force a STALE reading so the "refresh immediately when enabled" path is the
  // one under test; with a fresh reading the correct behaviour is NOT to refresh.
  p.on('request',async r=>{
    const u=r.url();
    if(u.includes('/api/usage/populate')){populateCalls++; return r.respond({status:200,contentType:'application/json',body:'{"ok":true}'});}
    if(u.endsWith('/api/usage')){
      const stale=Date.now()-30*60*1000;
      return r.respond({status:200,contentType:'application/json',body:JSON.stringify({enabled:true,data:{at:stale,rate_limits_at:stale,model:'Haiku 4.5',rate_limits:{five_hour:{used_percentage:19,resets_at:Math.round(Date.now()/1000)+1800},seven_day:{used_percentage:63,resets_at:Math.round(Date.now()/1000)+80000}}}})});
    }
    r.continue();
  });
  await p.goto('http://127.0.0.1:4317/',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,1500));
  await p.evaluate(()=>{localStorage.removeItem('crs-usagewin-auto'); USAGEWIN.open&&USAGEWIN.open()});
  await new Promise(r=>setTimeout(r,1500));
  console.log('populate calls before ticking auto:',populateCalls);
  const box=await p.evaluate(()=>{const c=document.querySelector('#uwBody .uw-auto-cb');const r=c.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}});
  await p.mouse.click(box.x,box.y);
  await new Promise(r=>setTimeout(r,2500));
  const st=await p.evaluate(()=>({checked:document.querySelector('#uwBody .uw-auto-cb').checked,ls:localStorage.getItem('crs-usagewin-auto')}));
  console.log('after ticking auto:',JSON.stringify(st),'| populate calls:',populateCalls);
  console.log('TICKS:',st.checked&&st.ls==='1'?'PASS':'FAIL');
  console.log('IMMEDIATE REFRESH ON ENABLE:',populateCalls>=1?'PASS':'FAIL (waits 3min)');
  console.log('console errors:',errs.length,errs.slice(0,2));
  await b.close();
})().catch(e=>{console.error('RIGFAIL',e.message);process.exit(1)});
