const fs=require('fs'),path=require('path');
const PAGE='C:/Users/CCTV Mgr/projects/crs-bubble/casinoreportingsystem/test/pages/bpeelt';
function walk(dir,acc){ for(const e of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,e.name); if(e.isDirectory()) walk(p,acc); else if(e.name.endsWith('.json')) acc.push(p); } return acc; }
const files=walk(PAGE,[]);
console.log('total json files under bpeelt:',files.length);

// 1) workflow trigger names + write actions
const WRITE=/^(CreateNewThing|CreateThing|MakeChangeToThing|MakeChangesToThing|MakeChangeToThingList|MakeChangesToThingList|DeleteThing|DeleteThingList|DeleteList|CopyList|ScheduleAPIWorkflow|TriggerBackendWorkflow|SignUserUp|LogUserIn|LogUserOut|ResetPassword|SendPasswordReset|MakeChangesToCurrentUser)/i;
const wfDir=path.join(PAGE,'workflows');
const writeHits=[]; const actionHist={}; const triggerHist={};
if(fs.existsSync(wfDir)){
  for(const wf of fs.readdirSync(wfDir)){
    const wfp=path.join(wfDir,wf);
    if(!fs.statSync(wfp).isDirectory()) continue;
    let wfName=wf, trig='';
    const meta=path.join(wfp,'workflow.json');
    if(fs.existsSync(meta)){ try{ const j=JSON.parse(fs.readFileSync(meta,'utf8')); wfName=j.name||wf; trig=j.type||''; }catch(e){} }
    triggerHist[trig]=(triggerHist[trig]||0)+1;
    const actDir=path.join(wfp,'actions');
    if(fs.existsSync(actDir)){
      for(const a of fs.readdirSync(actDir)){
        if(!a.endsWith('.json')) continue;
        try{ const j=JSON.parse(fs.readFileSync(path.join(actDir,a),'utf8'));
          const t=j.type||'?'; actionHist[t]=(actionHist[t]||0)+1;
          if(WRITE.test(t)){ writeHits.push({wf:wfName,trigger:trig,action:t,props:JSON.stringify(j.properties||{}).slice(0,240)}); }
        }catch(e){}
      }
    }
  }
}
console.log('\n=== ACTION TYPE HISTOGRAM ==='); Object.entries(actionHist).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  '+v+'  '+k));
console.log('\n=== TRIGGER TYPE HISTOGRAM ==='); Object.entries(triggerHist).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  '+v+'  '+k));
console.log('\n=== WRITE ACTIONS ('+writeHits.length+') ===');
writeHits.forEach(h=>console.log('  ['+h.action+'] wf="'+h.wf+'" trigger='+h.trigger+'\n     props='+h.props));

// 2) demo type + user type references across whole page tree
let demo=0, demoSample=[]; let userTypeRefs=0;
for(const f of files){ const s=fs.readFileSync(f,'utf8');
  if(/zz_ui_demouser/i.test(s)){ demo++; if(demoSample.length<8) demoSample.push(f.replace(PAGE,'')); }
}
console.log('\n=== zz_ui_demouser references in bpeelt: '+demo+' files ===');
demoSample.forEach(s=>console.log('   '+s));
