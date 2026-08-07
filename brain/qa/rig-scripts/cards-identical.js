const puppeteer=require('puppeteer-core');
(async()=>{
  const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--disable-lcd-text']});
  const p=await b.newPage(); await p.setViewport({width:1500,height:1000});
  const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://127.0.0.1:4317/',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,1500));
  await p.evaluate(()=>{USAGEWIN.open&&USAGEWIN.open(); toggleUsagePop(null,true);});
  await new Promise(r=>setTimeout(r,2500));
  const r=await p.evaluate(()=>{
    const w=document.getElementById('uwBody'), a=document.getElementById('acctUsageBody');
    const strip=el=>el?el.innerHTML.replace(/\s+/g,' ').trim():null;
    const txt=el=>el?el.textContent.replace(/\s+/g,' ').trim():null;
    return {
      mounted:!!a,
      identicalHtml: strip(w)===strip(a),
      winTxt:txt(w), popTxt:txt(a),
      popHasHaiku:/Haiku/i.test(txt(a)||''),
      popHasCost:/Session: \$/i.test(txt(a)||''),
      popHasRefresh:!!(a&&a.querySelector('.uw-refresh')),
      popHasAuto:!!(a&&a.querySelector('.uw-auto-cb')),
      popHasFable:/Fable/i.test(txt(a)||''),
    };
  });
  console.log('popover mounted:',r.mounted?'PASS':'FAIL');
  console.log('BODIES BYTE-IDENTICAL:',r.identicalHtml?'PASS':'FAIL');
  console.log('popover text:',r.popTxt);
  console.log('no "Haiku 4.5" line:',!r.popHasHaiku?'PASS':'FAIL');
  console.log('no cost line:',!r.popHasCost?'PASS':'FAIL');
  console.log('has Refresh:',r.popHasRefresh?'PASS':'FAIL');
  console.log('has auto checkbox:',r.popHasAuto?'PASS':'FAIL');
  console.log('has Fable:',r.popHasFable?'PASS':'FAIL');
  // account bits still present
  const acct=await p.evaluate(()=>{const t=document.getElementById('usagePop').textContent;return{email:/@/.test(t),disconnect:/Disconnect/i.test(t),tier:/Max|subscription/i.test(t)}});
  console.log('account bits kept:',JSON.stringify(acct));
  console.log('console errors:',errs.length,errs.slice(0,3));
  await p.screenshot({path:'cards-identical-dark.png'});
  await b.close();
})().catch(e=>{console.error('RIGFAIL',e.message);process.exit(1)});
