const fs=require('fs'),path=require('path');
const API='C:/Users/CCTV Mgr/projects/crs-bubble/casinoreportingsystem/test/api';
const ids=fs.readdirSync(API).filter(d=>fs.existsSync(path.join(API,d,'workflow.json')));
console.log('total backend workflows:',ids.length,'\n');
const rows=[];
for(const id of ids){
  const wf=JSON.parse(fs.readFileSync(path.join(API,id,'workflow.json'),'utf8'));
  const p=wf.properties||{};
  const params=Object.values(p.parameters||{}).map(x=>x.key+':'+x.value).join(', ');
  const actDir=path.join(API,id,'actions');
  const acts=[];
  if(fs.existsSync(actDir)){
    for(const a of fs.readdirSync(actDir).filter(f=>f.endsWith('.json')).sort()){
      const j=JSON.parse(fs.readFileSync(path.join(actDir,a),'utf8'));
      const pr=j.properties||{};
      // capture a "only when"/condition if present
      let cond='';
      if(pr.condition) cond=JSON.stringify(pr.condition).slice(0,160);
      // capture write target
      let tgt = pr.type||pr.thing_type||pr.data_type||'';
      const changeKeys = pr.changes?Object.values(pr.changes).map(c=>c.key).join('|'):'';
      acts.push({file:a,type:j.type,tgt,changeKeys,cond});
    }
  }
  rows.push({id,wf_name:p.wf_name||wf.name||id,expose:p.expose,auth_unecessary:p.auth_unecessary,ignore_privacy_rules:p.ignore_privacy_rules,trigger:wf.type,params,acts});
}
// print, UM-relevant first
rows.sort((a,b)=> (/^um_|user|role|deact|reset|passw|login|save/i.test(b.wf_name)?1:0)-(/^um_|user|role|deact|reset|passw|login|save/i.test(a.wf_name)?1:0));
for(const r of rows){
  console.log('■ '+r.wf_name+'  (id '+r.id+')  trigger='+r.trigger);
  console.log('   expose='+r.expose+'  auth_unecessary='+r.auth_unecessary+'  ignore_privacy_rules='+r.ignore_privacy_rules);
  if(r.params) console.log('   params: '+r.params);
  for(const a of r.acts){
    console.log('   - action '+a.file+': '+a.type+(a.tgt?(' -> target:'+a.tgt):'')+(a.changeKeys?(' [sets: '+a.changeKeys+']'):'')+(a.cond?('  ONLY-WHEN='+a.cond):''));
  }
  console.log('');
}
