const puppeteer=require('puppeteer-core');
(async()=>{
  const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--disable-lcd-text']});
  const p=await b.newPage(); await p.setViewport({width:1500,height:950});
  const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://127.0.0.1:4317/',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,2000));
  // open the usage window
  const opened=await p.evaluate(()=>{ if(window.USAGEWIN&&USAGEWIN.open){USAGEWIN.open();return 'api'} const el=document.getElementById('usageChip'); if(el){el.click();return 'chip'} return null; });
  await new Promise(r=>setTimeout(r,1500));
  const rows=await p.evaluate(()=>[...document.querySelectorAll('#uwBody .uw-row, #uwBody [class*=row]')].map(e=>e.textContent.replace(/\s+/g,' ').trim()).filter(Boolean));
  const hasFable=rows.some(r=>/Fable/i.test(r));
  console.log('opened via:',opened);
  console.log('rows:'); rows.forEach(r=>console.log('  •',r));
  console.log('FABLE BAR PRESENT:',hasFable?'PASS':'FAIL');
  console.log('console errors:',errs.length,errs.slice(0,2));
  if(hasFable) await p.screenshot({path:'fable-weekly-dark.png'});
  await p.evaluate(()=>document.documentElement.setAttribute('data-theme','light'));
  await new Promise(r=>setTimeout(r,600));
  if(hasFable) await p.screenshot({path:'fable-weekly-light.png'});
  await b.close();
})().catch(e=>{console.error('RIGFAIL',e.message);process.exit(1)});
