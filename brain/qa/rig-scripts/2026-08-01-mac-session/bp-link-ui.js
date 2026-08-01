const puppeteer=require('puppeteer-core');
(async()=>{
  const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});
  const p=await b.newPage(); await p.setViewport({width:1400,height:900});
  const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://127.0.0.1:4317/',{waitUntil:'networkidle2'});
  await p.evaluate(()=>openSettings('connections'));
  await p.waitForFunction(()=>{const e=document.getElementById('connBp');return e&&e.textContent!=='…'},{timeout:8000});
  const linked=await p.evaluate(()=>({
    stat:document.getElementById('connBp').textContent,
    tokVisible:document.getElementById('bpTokenRow').style.display!=='none',
    lnkVisible:document.getElementById('bpLinkedRow').style.display!=='none',
    sub:document.getElementById('bpLinkedSub').textContent
  }));
  console.log('LINKED state:',JSON.stringify(linked));
  console.log('  check:',(linked.stat==='Linked'&&!linked.tokVisible&&linked.lnkVisible&&/VLAD/.test(linked.sub))?'PASS':'FAIL');
  // Simulate unlinked by stubbing fetch for bp/status, re-run refresh
  await p.evaluate(()=>{
    const of=window.fetch; window.fetch=(u,o)=>String(u).includes('/api/bp/status')
      ? Promise.resolve(new Response(JSON.stringify({ready:true,linked:false,account:null}),{headers:{'Content-Type':'application/json'}}))
      : of(u,o);
    return refreshConnStatus();
  });
  await new Promise(r=>setTimeout(r,400));
  const un=await p.evaluate(()=>({
    stat:document.getElementById('connBp').textContent,
    tokVisible:document.getElementById('bpTokenRow').style.display!=='none',
    lnkVisible:document.getElementById('bpLinkedRow').style.display!=='none'
  }));
  console.log('UNLINKED state:',JSON.stringify(un));
  console.log('  check:',(un.stat==='Not linked'&&un.tokVisible&&!un.lnkVisible)?'PASS':'FAIL');
  console.log('console errors:',errs.length,errs.slice(0,2));
  await b.close();
})().catch(e=>{console.error('RIGFAIL',e);process.exit(1)});
