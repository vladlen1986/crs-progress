const fs = require('fs'), path = require('path');
const ROOT = 'C:/Users/CCTV Mgr/projects/crs-bubble/casinoreportingsystem/test';
function readJSON(p){ try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch(e){ return null; } }

// 1) Pages by name
const pagesDir = path.join(ROOT,'pages');
const pages = fs.readdirSync(pagesDir).filter(d=>fs.existsSync(path.join(pagesDir,d,'page.json')));
console.log('=== PAGES (id -> name) matching user ===');
const pageRows=[];
for(const id of pages){ const j=readJSON(path.join(pagesDir,id,'page.json')); pageRows.push({id,name:(j&&j.name)||''}); }
for(const r of pageRows){ if(/user/i.test(r.name)) console.log('  '+r.id+' -> '+r.name); }
console.log('  (total pages: '+pageRows.length+')');

// 2) Data API exposed types
console.log('\n=== DATA TYPES with exposed_api === true ===');
const dtDir = path.join(ROOT,'data_types');
const dts = fs.readdirSync(dtDir).filter(d=>fs.existsSync(path.join(dtDir,d,'type.json')));
let anyExposed=false;
for(const d of dts){ const j=readJSON(path.join(dtDir,d,'type.json')); if(j&&j.exposed_api===true){ anyExposed=true; console.log('  EXPOSED: '+d+' (display: '+j.display+')'); } }
if(!anyExposed) console.log('  (none)');

// 3) Privacy + tenancy summary
const focus=['user','zz_ui_demouser','user_role','user_role1','user_device','user_group','user_audit_log','user_login_activity_log','user_notification','permission_groups','company','01_1_propery','role_audit_log'];
console.log('\n=== PRIVACY + TENANCY FIELD SUMMARY ===');
for(const d of focus){
  const j=readJSON(path.join(dtDir,d,'type.json'));
  if(!j){ console.log('\n['+d+'] -- not found'); continue; }
  const allFields=Object.keys(j.fields||{});
  const liveFields=allFields.filter(f=>!(j.fields[f].deleted));
  const hasCompany=liveFields.some(f=>/company/i.test(f));
  const hasProperty=liveFields.some(f=>/propery|property/i.test(f));
  const roles=j.privacy_role||{};
  console.log('\n['+d+'] display="'+j.display+'" exposed_api='+(j.exposed_api===true)+' companyField='+hasCompany+' propertyField='+hasProperty+' liveFields='+liveFields.length);
  for(const rk of Object.keys(roles)){
    const r=roles[rk]; const p=r.permissions||{};
    const cond=r.condition?'HAS-CONDITION':'NO-CONDITION(all rows)';
    console.log('   role "'+(r.display||rk)+'": '+cond+' | search='+p.search_for+' view_all='+p.view_all+' view_attach='+p.view_attachments+' autobind='+p.auto_binding);
  }
}
