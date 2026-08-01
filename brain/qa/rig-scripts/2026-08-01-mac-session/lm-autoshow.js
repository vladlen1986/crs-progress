const puppeteer = require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new'});
  const p=await b.newPage(); await p.setViewport({width:1400,height:900}); const errs=[];
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  p.on('pageerror',e=>errs.push(e.message));
  const vis=()=>p.evaluate(()=>{const el=document.querySelector('#lmPanel');return el&&getComputedStyle(el).display!=='none'});
  // Case 1: fresh profile — no stored mode → turn-start auto-opens
  await p.goto('http://127.0.0.1:4317/',{waitUntil:'networkidle2'});
  await p.waitForFunction('window.LIVEMAP && typeof LIVEMAP.ping==="function"');
  const before=await vis();
  await p.evaluate(()=>LIVEMAP.ping('turn-start'));
  const after=await vis();
  console.log('C1 fresh: before=',before,'after turn-start=',after, after&&!before?'PASS':'FAIL');
  // Case 2: user explicitly closed → stays closed
  await p.evaluate(()=>{localStorage.setItem('crs-livemap-mode','closed')});
  await p.reload({waitUntil:'networkidle2'});
  await p.waitForFunction('window.LIVEMAP && typeof LIVEMAP.ping==="function"');
  await p.evaluate(()=>LIVEMAP.ping('turn-start'));
  const c2=await vis();
  console.log('C2 user-closed: stays hidden=',!c2, !c2?'PASS':'FAIL');
  // Case 3: pill choice respected
  await p.evaluate(()=>{localStorage.setItem('crs-livemap-mode','pill')});
  await p.reload({waitUntil:'networkidle2'});
  await p.waitForFunction('window.LIVEMAP && typeof LIVEMAP.ping==="function"');
  await p.evaluate(()=>LIVEMAP.ping('turn-start'));
  const c3open=await vis();
  const c3pill=await p.evaluate(()=>{const el=document.querySelector('#lmPill');return el&&getComputedStyle(el).display!=='none'});
  console.log('C3 pill kept: panel closed=',!c3open,'pill shown=',c3pill, (!c3open&&c3pill)?'PASS':'FAIL');
  console.log('console errors:',errs.length,errs.slice(0,3));
  await b.close();
})().catch(e=>{console.error('RIGFAIL',e);process.exit(1)});
