/* ═══════════════════════════════════════════════════════════════
   Modals · toasts · event wiring · init
═══════════════════════════════════════════════════════════════ */

/* ───────────────────────── Toasts (design.md §9) ───────────────────────── */
function toast(kind, title, msg){
  const el = document.createElement('div');
  el.className = 'toast';
  const icon = kind === 'ok' ? 'check' : kind === 'err' ? 'alertcircle' : 'info';
  el.innerHTML = `<span class="toast__icon toast__icon--${kind==='ok'?'ok':kind==='err'?'err':'info'}">${svg(icon)}</span>
    <span style="flex:1;min-width:0"><span class="toast__title">${esc(title)}</span>
    ${msg?`<span class="toast__msg">${msg}</span>`:''}</span>
    <button class="icon-btn" aria-label="Dismiss">${svg('x')}</button>`;
  const kill = () => { el.classList.add('is-out'); setTimeout(()=>el.remove(), 200); };
  el.querySelector('button').onclick = kill;
  $('#toasts').appendChild(el);
  setTimeout(kill, 3500);
}

/* ───────────────────────── Modal engine ───────────────────────── */
let modalCtx = {};
const wiz = { step:1, employee:null, email:'', role:'', tempPassword:null, errors:{} };

function openModal(name, ctx){
  modalCtx = Object.assign({ name }, ctx || {});
  if (name === 'create'){ wiz.step=1; wiz.employee=null; wiz.email=''; wiz.role=''; wiz.tempPassword=null; wiz.errors={}; }
  if (name === 'twofaSetup'){ state.twofa.step = 1; }
  paintModal();
  $('#scrim').classList.add('is-open');
  setTimeout(()=>{ const f = $('#scrim [autofocus]'); if (f) f.focus(); }, 60);
}
function closeModal(){ $('#scrim').classList.remove('is-open'); setTimeout(()=>{ $('#scrim').innerHTML=''; }, 180); }
function paintModal(){ $('#scrim').innerHTML = MODALS[modalCtx.name] ? MODALS[modalCtx.name](modalCtx) : ''; wireCommon($('#scrim')); }

const genPassword = () => {
  const A='ABCDEFGHJKLMNPQRSTUVWXYZ', a='abcdefghijkmnpqrstuvwxyz', n='23456789', s='!@#$%&*';
  const pick = str => str[Math.floor(Math.random()*str.length)];
  let out = [pick(A),pick(A),pick(a),pick(a),pick(a),pick(n),pick(n),pick(n),pick(s),pick(s)];
  for (let i=out.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [out[i],out[j]]=[out[j],out[i]]; }
  return out.join('');
};
const genCode = () => Array.from({length:2},()=>Math.random().toString(36).slice(2,6).toUpperCase()).join('-');

const MODALS = {

/* ── Create user — 3 steps, no email invites ── */
create(){
  const free = EMPLOYEES.filter(e => !e.has_user);
  const q = (modalCtx.pickQ || '').toLowerCase();
  const shown = free.filter(e => e.full_name.toLowerCase().includes(q) || e.department.toLowerCase().includes(q));
  const steps = ['Employee','Account','Done'];

  const body =
    wiz.step === 1 ? `
      <div class="callout callout--info">${svg('info')}
        <span>Casino staff are vetted by HR before they get system access, so accounts are created for an <b>existing employee</b> — there is no self-service sign-up and no email invite.</span></div>
      <div class="field"><label class="label">Search unlinked employees</label>
        <div class="input-wrap">${svg('search','input-wrap__icon')}
          <input class="input" id="pickSearch" placeholder="Name or department…" value="${esc(modalCtx.pickQ||'')}" autofocus autocomplete="off"></div>
        <div class="field__msg">${free.length} employee${free.length===1?'':'s'} without a login account.</div>
      </div>
      <div class="pop__list" style="max-height:230px;margin:0 -4px">
        ${shown.length ? shown.map(e => `
          <button class="pickrow" data-pick="${e._id}" aria-selected="${wiz.employee===e._id}">
            <span class="av av--md">${avatarSVG(e._id,32)}</span>
            <span style="flex:1;min-width:0">
              <span class="who__name" style="display:block">${esc(e.full_name)}</span>
              <span class="who__sub" style="display:block">${esc(e.position)} · ${esc(e.department)}</span></span>
            ${wiz.employee===e._id?`<span style="color:var(--accent-text);display:flex">${svg('check')}</span>`:''}
          </button>`).join('')
        : `<div class="empty" style="padding:26px 0"><div class="empty__msg">No unlinked employee matches that search. If the person is new, add them in Employee Management first.</div></div>`}
      </div>` :
    wiz.step === 2 ? (() => {
      const e = empById(wiz.employee);
      return `
      <div class="u-row u-gap-12" style="padding:11px 13px;background:var(--bg-tertiary);border-radius:8px">
        <span class="av av--md">${avatarSVG(e._id,32)}</span>
        <span style="flex:1;min-width:0"><span class="who__name" style="display:block">${esc(e.full_name)}</span>
        <span class="who__sub" style="display:block">${esc(e.position)} · ${esc(e.department)}</span></span>
        <button class="btn btn--ghost btn--sm" data-wiz="1">Change</button>
      </div>
      <div class="field"><label class="label label--req">Login email</label>
        <input class="input ${wiz.errors.email?'input--invalid':''}" id="wEmail" type="email"
               value="${esc(wiz.email)}" placeholder="name@otiumcasino.ge" autofocus autocomplete="off">
        ${wiz.errors.email?`<div class="field__msg field__msg--error">${esc(wiz.errors.email)}</div>`
          :`<div class="field__msg">Must be unique across every CRS company.</div>`}
      </div>
      <div class="field"><label class="label label--req">Role</label>
        <select class="select ${wiz.errors.role?'input--invalid':''}" id="wRole">
          <option value="">Select a role…</option>
          ${ROLES.slice().sort((a,b)=>b.level-a.level).map(r=>`<option value="${r.id}" ${wiz.role===r.id?'selected':''}>
            ${esc(r.name)} — ${r.is_super_admin?'all permissions':r.permissions.length+' permission'+(r.permissions.length===1?'':'s')}</option>`).join('')}
        </select>
        ${wiz.errors.role?`<div class="field__msg field__msg--error">${esc(wiz.errors.role)}</div>`
          :`<div class="field__msg">A user cannot sign in without a role.</div>`}
        ${!myRole().is_super_admin ? `<div class="field__msg">You cannot assign the Admin role because you do not hold it.</div>`:''}
      </div>
      <div class="field"><label class="label">Property</label>
        <select class="select" disabled><option>${esc(PROPERTY.name)} — ${esc(PROPERTY.city)}</option></select>
        <div class="field__msg">A user belongs to exactly one property. Cross-property access is not possible.</div>
      </div>
      <label class="chk"><input type="checkbox" checked disabled><span class="chk__box">${svg('check')}</span>
        <span class="chk__label">Force a password change at first sign-in</span></label>`; })() :
    (() => {
      const e = empById(wiz.employee);
      return `
      <div class="callout callout--warn">${svg('alerttriangle')}
        <span>This password is shown <b>once</b>. Hand it over in person or through a channel you trust — CRS does not email it.</span></div>
      <div class="field"><label class="label">Temporary password for ${esc(e.full_name)}</label>
        <div class="secretbox"><span class="secretbox__val" id="tempPw">${esc(wiz.tempPassword)}</span>
          <button class="btn btn--secondary btn--sm" data-copy="${esc(wiz.tempPassword)}">${svg('copy')}Copy</button></div>
      </div>
      <div class="kv">
        <div class="kv__k">Login email</div><div class="kv__v"><b>${esc(wiz.email)}</b></div>
        <div class="kv__k">Role</div><div class="kv__v">${esc(roleById(wiz.role).name)}</div>
        <div class="kv__k">Property</div><div class="kv__v">${esc(PROPERTY.name)}</div>
        <div class="kv__k">Logged as</div><div class="kv__v"><code class="code">user_created</code></div>
      </div>`; })();

  return `<div class="modal modal--wide">
    <div class="modal__head">
      <div class="modal__icon modal__icon--accent">${svg('userplus')}</div>
      <div style="flex:1"><div class="modal__title">Create user</div>
        <div class="modal__sub">Give an existing employee a login account</div>
        <div class="steps" style="margin-top:12px">${steps.map((s,i)=>{
          const n=i+1; const cls = wiz.step===n?'is-active':wiz.step>n?'is-done':'';
          return `${i?'<span class="steps__line"></span>':''}<span class="steps__s ${cls}">
            <span class="steps__n">${wiz.step>n?'✓':n}</span>${s}</span>`; }).join('')}</div>
      </div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button>
    </div>
    <div class="modal__body">${body}</div>
    <div class="modal__foot">
      ${wiz.step===3
        ? `<button class="btn btn--primary" data-close>${svg('check')}Done</button>`
        : `${wiz.step===2?`<button class="btn btn--ghost" data-wiz="1">Back</button>`:''}
           <button class="btn btn--ghost" data-close>Cancel</button>
           <button class="btn btn--primary" data-wiz="${wiz.step+1}" ${wiz.step===1&&!wiz.employee?'disabled':''}>
             ${wiz.step===1?'Continue':svg('userplus')+'Create account'}</button>`}
    </div></div>`;
},

/* ── Edit user ── */
edit(c){
  const u = userById(c.id), e = empById(u.employee);
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--accent">${svg('edit')}</div>
      <div style="flex:1"><div class="modal__title">Edit user</div>
        <div class="modal__sub">${esc(e.full_name)} · ${esc(u.user_id)}</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      <div class="field"><label class="label label--req">Login email</label>
        <input class="input" value="${esc(u.username)}" autofocus></div>
      <div class="field"><label class="label">Role</label>
        <select class="select" disabled><option>${esc(roleById(u.role).name)}</option></select>
        <div class="field__msg">Changing a role is a separate, logged action — use <b>Change role</b>.</div></div>
      <div class="field"><label class="label">Property</label>
        <select class="select" disabled><option>${esc(u.property)}</option></select></div>
      <label class="switch"><input type="checkbox" ${u.must_change_password?'checked':''}><span class="switch__track"></span>
        <span class="chk__label">Force a password change at next sign-in</span></label>
      <div class="callout callout--neutral">${svg('info')}
        <span>Name, phone and photo are edited in Employee Management — this form only owns the login account.</span></div>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn btn--primary" data-do="saveEdit">${svg('check')}Save changes</button></div></div>`;
},

/* ── Change role — with the three hard safeguards ── */
changeRole(c){
  const u = userById(c.id);
  const isSelf = u._id === state.me;
  const admins = USERS.filter(x => x.is_active && roleById(x.role).is_super_admin);
  const soleAdmin = roleById(u.role).is_super_admin && admins.length === 1;
  const blocked = isSelf || soleAdmin;
  const canGrantAdmin = myRole().is_super_admin;

  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--accent">${svg('shield')}</div>
      <div style="flex:1"><div class="modal__title">Change role</div>
        <div class="modal__sub">${esc(nameOf(u))} · currently ${esc(roleById(u.role).name)}</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      ${isSelf ? `<div class="callout callout--danger">${svg('slash')}
        <span><b>You cannot change your own role.</b> This blocks self-escalation — ask another administrator.</span></div>` : ''}
      ${soleAdmin ? `<div class="callout callout--danger">${svg('slash')}
        <span><b>This is the only active Admin.</b> Promote someone else to Admin first, or the property locks itself out.</span></div>` : ''}
      <div class="field"><label class="label label--req">New role</label>
        <select class="select" id="newRole" ${blocked?'disabled':''} autofocus>
          ${ROLES.slice().sort((a,b)=>b.level-a.level).map(r => `<option value="${r.id}" ${r.id===u.role?'selected':''}
            ${r.is_super_admin && !canGrantAdmin ? 'disabled' : ''}>${esc(r.name)}${r.is_super_admin&&!canGrantAdmin?' — you cannot grant this':''}</option>`).join('')}
        </select>
        <div class="field__msg">Sorted by seniority. Permission count changes take effect immediately.</div></div>
      <label class="chk"><input type="checkbox" id="revokeOnChange"><span class="chk__box">${svg('check')}</span>
        <span class="chk__label">Sign the user out of all devices <span class="u-muted">(recommended on a downgrade)</span></span></label>
      <div class="callout callout--neutral">${svg('info')}
        <span>Writes <code class="code" style="background:transparent;border:none;padding:0">role_assigned</code> to the activity log and notifies the user in-app.</span></div>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn btn--primary" data-do="saveRole" data-id="${u._id}" ${blocked?'disabled':''}>${svg('check')}Change role</button></div></div>`;
},

/* ── Deactivate ── */
deactivate(c){
  const u = userById(c.id), n = userSessions(u._id).length;
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--warn">${svg('slash')}</div>
      <div style="flex:1"><div class="modal__title">Deactivate ${esc(nameOf(u))}?</div>
        <div class="modal__sub">Sign-in is blocked immediately. This is reversible.</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      <div class="callout callout--warn">${svg('alerttriangle')}
        <span>${n} active session${n===1?'':'s'} will be revoked and the user will be signed out everywhere.</span></div>
      <div class="field"><label class="label">Reason <span class="label__opt">optional</span></label>
        <textarea class="textarea" id="deactReason" placeholder="e.g. Left the company · Long-term leave · Suspended pending investigation" autofocus></textarea>
        <div class="field__msg">Stored on the activity log entry.</div></div>
      <label class="chk"><input type="checkbox" checked><span class="chk__box">${svg('check')}</span>
        <span class="chk__label">Email the user that their access has been suspended</span></label>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn btn--danger" data-do="doDeactivate" data-id="${u._id}">${svg('slash')}Deactivate user</button></div></div>`;
},

reactivate(c){
  const u = userById(c.id);
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--accent">${svg('rotate')}</div>
      <div style="flex:1"><div class="modal__title">Reactivate ${esc(nameOf(u))}?</div>
        <div class="modal__sub">Restores sign-in with the same role and permissions.</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      <div class="kv"><div class="kv__k">Deactivated</div><div class="kv__v">${fmtDate(u.deactivated_date)} <span class="u-muted">(${relTime(u.deactivated_date)})</span></div>
        <div class="kv__k">Role restored</div><div class="kv__v">${roleBadge(u)}</div></div>
      <label class="chk"><input type="checkbox" checked><span class="chk__box">${svg('check')}</span>
        <span class="chk__label">Require a new password at first sign-in</span></label>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn btn--primary" data-do="doReactivate" data-id="${u._id}">${svg('rotate')}Reactivate</button></div></div>`;
},

/* ── Anonymize — type-to-confirm ── */
anonymize(c){
  const u = userById(c.id);
  const ok = (modalCtx.confirmText === 'ANONYMIZE') && (modalCtx.reason||'').trim().length > 0;
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--danger">${svg('shieldoff')}</div>
      <div style="flex:1"><div class="modal__title">Anonymize ${esc(nameOf(u))}</div>
        <div class="modal__sub">GDPR erasure — this cannot be undone.</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      <div class="callout callout--danger">${svg('alerttriangle')}
        <span><b>Permanently erased:</b> name, phone, personal email, photo, emergency contact, ID document and address on the Employee record. The login email becomes
        <code class="code" style="background:transparent;border:none;padding:0">anonymized-${esc(u._id)}@deleted.crs.app</code>.</span></div>
      <div class="callout callout--neutral">${svg('info')}
        <span><b>Kept for compliance:</b> report and task authorship (shown as “Anonymized User”), the activity log, session history and financial records.</span></div>
      <div class="field"><label class="label label--req">Reason for erasure</label>
        <textarea class="textarea" id="anonReason" placeholder="e.g. Data subject erasure request received 2026-08-04" autofocus>${esc(modalCtx.reason||'')}</textarea></div>
      <div class="field"><label class="label label--req">Type <b class="u-primary">ANONYMIZE</b> to confirm</label>
        <input class="input ${modalCtx.confirmText && modalCtx.confirmText!=='ANONYMIZE' ? 'input--invalid':''}"
               id="anonConfirm" value="${esc(modalCtx.confirmText||'')}" placeholder="ANONYMIZE" autocomplete="off"></div>
    </div>
    <div class="modal__foot">
      <span class="u-spacer" style="font-size:11.5px;color:var(--text-muted)">Requires <code class="code">admin.anonymize_user</code></span>
      <button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn btn--danger" data-do="doAnonymize" data-id="${u._id}" ${ok?'':'disabled'}>${svg('shieldoff')}Anonymize permanently</button></div></div>`;
},

/* ── Password reset ── */
resetPassword(c){
  const u = userById(c.id);
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--accent">${svg('key')}</div>
      <div style="flex:1"><div class="modal__title">Send password reset</div>
        <div class="modal__sub">${esc(nameOf(u))} · ${esc(u.username)}</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      <div class="callout callout--info">${svg('mail')}
        <span>Sends Bubble's built-in reset email with a single-use, time-limited link. Their current password keeps working until they use it.</span></div>
      <label class="chk"><input type="checkbox"><span class="chk__box">${svg('check')}</span>
        <span class="chk__label">Also sign them out of all devices</span></label>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn btn--primary" data-do="doReset" data-id="${u._id}" autofocus>${svg('send')}Send reset email</button></div></div>`;
},

revokeAll(c){
  const u = userById(c.id), n = userSessions(u._id).filter(s=>!s.current).length;
  const self = u._id === state.me;
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--warn">${svg('wifioff')}</div>
      <div style="flex:1"><div class="modal__title">${self?'Sign out other devices':'Revoke all sessions'}</div>
        <div class="modal__sub">${self?'You will stay signed in here.':esc(nameOf(u))+' will be signed out everywhere.'}</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body"><div class="callout callout--warn">${svg('alerttriangle')}
      <span>${n} session${n===1?'':'s'} will be ended immediately.</span></div></div>
    <div class="modal__foot"><button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn btn--danger" data-do="doRevokeAll" data-id="${u._id}" autofocus>${svg('wifioff')}Revoke ${n} session${n===1?'':'s'}</button></div></div>`;
},

/* ── Per-user extra permissions ── */
extras(c){
  const u = userById(c.id), r = roleById(u.role);
  const fromRole = r.is_super_admin ? PERMISSIONS.map(p=>p.code) : r.permissions;
  const draft = modalCtx.draft || u.extra_permissions.slice();
  return `<div class="modal modal--wide">
    <div class="modal__head"><div class="modal__icon modal__icon--accent">${svg('plus')}</div>
      <div style="flex:1"><div class="modal__title">Extra permissions</div>
        <div class="modal__sub">${esc(nameOf(u))} · beyond the ${esc(r.name)} role</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      <div class="callout callout--warn">${svg('alerttriangle')}
        <span>Extras are permanent and invisible in Roles &amp; Permissions. Prefer changing the role — reach for this only when one person genuinely needs one more thing.</span></div>
      <div class="permgroup">${PERMISSIONS.map(p => {
        const inRole = fromRole.includes(p.code), on = draft.includes(p.code);
        return `<div class="permrow">
          <label class="chk"><input type="checkbox" data-extra="${p.code}" ${on?'checked':''} ${inRole?'disabled':''}>
            <span class="chk__box">${svg('check')}</span></label>
          <span style="flex:1"><span class="permrow__name">${esc(p.display)}${p.destructive?' <span class="badge badge--red">destructive</span>':''}</span>
            <span class="permrow__code">${esc(p.code)} · requires ${p.requires?esc(p.requires):'—'}</span></span>
          ${inRole?`<span class="badge badge--neutral">From role</span>`:''}
        </div>`; }).join('')}</div>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn btn--primary" data-do="saveExtras" data-id="${u._id}">${svg('check')}Save extras</button></div></div>`;
},

/* ── Self-service: password / email / 2FA ── */
changePassword(){
  const pw = modalCtx.pw || '';
  const reqs = [['At least 10 characters', pw.length>=10],['One uppercase letter', /[A-Z]/.test(pw)],
                ['One number', /[0-9]/.test(pw)],['One symbol', /[^A-Za-z0-9]/.test(pw)]];
  const level = reqs.filter(r=>r[1]).length;
  const label = ['','Weak','Fair','Good','Strong'][level];
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--accent">${svg('key')}</div>
      <div style="flex:1"><div class="modal__title">Change password</div>
        <div class="modal__sub">You will be signed out of every other device.</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      <div class="field"><label class="label label--req">Current password</label>
        <input class="input" type="password" autofocus placeholder="••••••••••"></div>
      <div class="field"><label class="label label--req">New password</label>
        <input class="input" type="password" id="newPw" value="${esc(pw)}" placeholder="••••••••••">
        <div class="strength" data-level="${level}">${[1,2,3,4].map(i=>`<span class="strength__bar ${i<=level?'is-on':''}"></span>`).join('')}</div>
        ${level?`<div class="field__msg" style="margin-top:5px">Strength: <b class="u-primary">${label}</b></div>`:''}
        <div class="reqlist">${reqs.map(([t,ok])=>`<div class="reqlist__item ${ok?'is-ok':''}">${svg(ok?'check':'x')}${t}</div>`).join('')}</div>
      </div>
      <div class="field"><label class="label label--req">Confirm new password</label>
        <input class="input" type="password" placeholder="••••••••••"></div>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn btn--primary" data-do="doChangePw" ${level===4?'':'disabled'}>${svg('check')}Update password</button></div></div>`;
},

changeEmail(){
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--accent">${svg('mail')}</div>
      <div style="flex:1"><div class="modal__title">Change login email</div>
        <div class="modal__sub">Confirm with your current password.</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      <div class="field"><label class="label">Current email</label><input class="input" value="${esc(me().username)}" disabled></div>
      <div class="field"><label class="label label--req">New email</label><input class="input" type="email" autofocus placeholder="name@otiumcasino.ge"></div>
      <div class="field"><label class="label label--req">Current password</label><input class="input" type="password" placeholder="••••••••••"></div>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn btn--primary" data-do="doChangeEmail">${svg('check')}Update email</button></div></div>`;
},

twofaSetup(){
  const s = state.twofa.step;
  const secret = 'JBSW Y3DP EHPK 3PXP';
  const body = s === 1 ? `
      <div class="u-row u-gap-12" style="align-items:flex-start;flex-wrap:wrap">
        <div class="qr">${qrSVG()}</div>
        <div style="flex:1;min-width:180px">
          <p style="font-size:12.5px;line-height:1.6">Scan this with Google Authenticator, Authy or 1Password.</p>
          <div class="field" style="margin-top:12px"><label class="label">Or enter the key manually</label>
            <div class="secretbox"><span class="secretbox__val" style="font-size:13px">${secret}</span>
              <button class="btn btn--secondary btn--sm" data-copy="${secret.replace(/ /g,'')}">${svg('copy')}</button></div></div>
        </div>
      </div>` :
    s === 2 ? `
      <div class="field"><label class="label label--req">Enter the 6-digit code from your app</label>
        <input class="input mono" id="totp" maxlength="6" placeholder="000000" autofocus autocomplete="off"
               style="font-size:19px;letter-spacing:.35em;text-align:center;height:48px">
        <div class="field__msg">The code rotates every 30 seconds.</div></div>
      <div class="callout callout--neutral">${svg('info')}<span>In this prototype any 6 digits are accepted.</span></div>` :
    `
      <div class="callout callout--warn">${svg('alerttriangle')}
        <span>These backup codes are shown <b>once</b>. Store them somewhere safe — each one works a single time if you lose your device.</span></div>
      <div class="codegrid">${state.twofa.codes.map(c=>`<div class="codegrid__c">${c.code}</div>`).join('')}</div>
      <div class="u-row u-gap-8">
        <button class="btn btn--secondary btn--sm" data-copy="${state.twofa.codes.map(c=>c.code).join(' ')}">${svg('copy')}Copy all</button>
        <button class="btn btn--secondary btn--sm" data-do="downloadCodes">${svg('download')}Download</button>
      </div>`;
  return `<div class="modal modal--wide">
    <div class="modal__head"><div class="modal__icon modal__icon--accent">${svg('lock')}</div>
      <div style="flex:1"><div class="modal__title">Enable two-factor authentication</div>
        <div class="modal__sub">${['Scan the QR code','Verify a code','Save your backup codes'][s-1]}</div>
        <div class="steps" style="margin-top:12px">${['Scan','Verify','Backup'].map((t,i)=>{
          const n=i+1, cls = s===n?'is-active':s>n?'is-done':'';
          return `${i?'<span class="steps__line"></span>':''}<span class="steps__s ${cls}">
            <span class="steps__n">${s>n?'✓':n}</span>${t}</span>`; }).join('')}</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">${body}</div>
    <div class="modal__foot">
      ${s===3 ? `<button class="btn btn--primary" data-do="finish2fa">${svg('check')}I've saved them</button>`
        : `<button class="btn btn--ghost" data-close>Cancel</button>
           <button class="btn btn--primary" data-do="next2fa">Continue</button>`}
    </div></div>`;
},

backupCodes(){
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--accent">${svg('copy')}</div>
      <div style="flex:1"><div class="modal__title">Backup codes</div>
        <div class="modal__sub">${state.twofa.codes.filter(c=>!c.used).length} unused</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body"><div class="codegrid">${state.twofa.codes.map(c=>`<div class="codegrid__c ${c.used?'is-used':''}">${c.code}</div>`).join('')}</div></div>
    <div class="modal__foot"><button class="btn btn--primary" data-close>Close</button></div></div>`;
},

/* ── Bulk + export ── */
bulk(c){
  const ids = [...state.dir.selected], kind = c.kind;
  const meta = { reset:['Send password reset','key','Each selected user gets Bubble’s reset email.','btn--primary'],
                 deactivate:['Deactivate users','slash','Sign-in is blocked and every session revoked. Reversible.','btn--danger'],
                 export:['Export users','download','Downloads the current selection as CSV.','btn--primary'] }[kind];
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--${kind==='deactivate'?'danger':'accent'}">${svg(meta[1])}</div>
      <div style="flex:1"><div class="modal__title">${meta[0]}</div>
        <div class="modal__sub">${ids.length} user${ids.length===1?'':'s'} selected</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      <div class="callout callout--${kind==='deactivate'?'warn':'info'}">${svg(kind==='deactivate'?'alerttriangle':'info')}<span>${meta[2]}</span></div>
      <div class="pop__list">${ids.slice(0,8).map(id=>{const u=userById(id);
        return `<div class="pickrow">${avatar(u,'sm')}<span style="flex:1">${esc(nameOf(u))}</span>
          <span class="u-muted" style="font-size:11.5px">${esc(roleById(u.role).name)}</span></div>`;}).join('')}
        ${ids.length>8?`<div style="padding:8px 10px;font-size:12px;color:var(--text-muted)">+ ${ids.length-8} more</div>`:''}</div>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-close>Cancel</button>
      <button class="btn ${meta[3]}" data-do="doBulk" data-kind="${kind}">${svg(meta[1])}${meta[0]}</button></div></div>`;
},

denied(c){
  const p = permByCode(c.code);
  return `<div class="modal">
    <div class="modal__head"><div class="modal__icon modal__icon--danger">${svg('lock')}</div>
      <div style="flex:1"><div class="modal__title">Permission required</div>
        <div class="modal__sub">Your role can’t perform this action.</div></div>
      <button class="icon-btn modal__x" data-close aria-label="Close">${svg('x')}</button></div>
    <div class="modal__body">
      <div class="callout callout--danger">${svg('slash')}
        <span><b>${esc(myRole().name)}</b> is missing <b>${esc(p.display)}</b>.</span></div>
      <div class="kv"><div class="kv__k">Permission</div><div class="kv__v"><code class="code">${esc(p.code)}</code></div>
        <div class="kv__k">What it allows</div><div class="kv__v">${esc(p.desc)}</div>
        <div class="kv__k">Depends on</div><div class="kv__v">${p.requires?`<code class="code">${esc(p.requires)}</code>`:'—'}</div></div>
    </div>
    <div class="modal__foot"><button class="btn btn--primary" data-close>Understood</button></div></div>`;
},
};

/* A fixed, decorative QR block — deterministic, no library, no network */
function qrSVG(){
  const N = 25, cells = [];
  const finder = (ox,oy) => { for(let y=0;y<7;y++) for(let x=0;x<7;x++){
    const edge = x===0||x===6||y===0||y===6, core = x>=2&&x<=4&&y>=2&&y<=4;
    if (edge||core) cells.push([ox+x, oy+y]); } };
  finder(0,0); finder(N-7,0); finder(0,N-7);
  let h = 987654321;
  for (let y=0;y<N;y++) for (let x=0;x<N;x++){
    if ((x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9)) continue;
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    if ((h >> 7) % 100 < 47) cells.push([x,y]);
  }
  return `<svg viewBox="0 0 ${N} ${N}" width="100%" height="100%" shape-rendering="crispEdges">
    <rect width="${N}" height="${N}" fill="#fff"/>
    ${cells.map(([x,y])=>`<rect x="${x}" y="${y}" width="1" height="1" fill="#18181B"/>`).join('')}</svg>`;
}

/* ───────────────────────── Actions ───────────────────────── */
const ACTIONS = {
  saveEdit(){ closeModal(); toast('ok','User updated','Changes saved and written to the activity log.'); },

  saveRole(el){
    const u = userById(el.dataset.id);
    const newRole = $('#newRole').value, revoke = $('#revokeOnChange').checked;
    const from = roleById(u.role).name;
    u.role = newRole;
    logEntry(u._id,'role_assigned','Role changed from “'+from+'” to “'+roleById(newRole).name+'”', 0, state.me);
    if (revoke) SESSIONS.filter(s=>s.user===u._id).forEach(s=>s.status='Revoked');
    ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
    closeModal(); render();
    toast('ok','Role changed', esc(nameOf(u))+' is now <b>'+esc(roleById(newRole).name)+'</b>.'+(revoke?' All sessions revoked.':''));
  },

  doDeactivate(el){
    const u = userById(el.dataset.id);
    const reason = ($('#deactReason')||{}).value || 'No reason given';
    u.is_active = false; u.presence_status='offline'; u.deactivated_date = iso(NOW);
    empById(u.employee).status = 'Inactive';
    const killed = SESSIONS.filter(s=>s.user===u._id); killed.forEach(s=>s.status='Revoked');
    logEntry(u._id,'user_deactivated','Reason: '+reason, 0, state.me);
    ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
    closeModal(); render();
    toast('ok','User deactivated', esc(nameOf(u))+' can no longer sign in. '+killed.length+' session(s) revoked.');
  },

  doReactivate(el){
    const u = userById(el.dataset.id);
    u.is_active = true; u.must_change_password = true; u.deactivated_date = null;
    empById(u.employee).status = 'Active';
    logEntry(u._id,'user_reactivated','Account restored · password change forced', 0, state.me);
    ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
    closeModal(); render();
    toast('ok','User reactivated', esc(nameOf(u))+' must set a new password at first sign-in.');
  },

  doAnonymize(el){
    const u = userById(el.dataset.id), e = empById(u.employee), was = e.full_name;
    e.first_name='Anonymized'; e.last_name='User'; e.full_name='Anonymized User';
    e.email=null; e.phone_number=null; e.photo=false; e.national_id_number=null; e.date_of_birth=null;
    u.username = 'anonymized-'+u._id+'@deleted.crs.app';
    u.is_anonymized = true; u.anonymized_date = iso(NOW); u.anonymized_by = state.me;
    u.anonymize_reason = modalCtx.reason; u.search_tokens = 'anonymized user';
    logEntry(u._id,'user_anonymized','GDPR erasure · '+modalCtx.reason, 0, state.me);
    ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
    closeModal(); render();
    toast('ok','Anonymized', esc(was)+' has been erased. Report authorship now reads “Anonymized User”.');
  },

  doReset(el){
    const u = userById(el.dataset.id);
    logEntry(u._id,'password_reset_sent','Reset email sent to '+u.username, 0, state.me);
    ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
    closeModal(); render();
    toast('ok','Reset email sent','Sent to <b>'+esc(u.username)+'</b>. The link expires in 24 hours.');
  },

  doRevokeAll(el){
    const u = userById(el.dataset.id);
    const n = SESSIONS.filter(s=>s.user===u._id && !s.current).length;
    for (let i=SESSIONS.length-1;i>=0;i--) if (SESSIONS[i].user===u._id && !SESSIONS[i].current) SESSIONS.splice(i,1);
    logEntry(u._id,'session_revoked',n+' session(s) revoked', 0, state.me);
    ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
    closeModal(); render();
    toast('ok','Sessions revoked', n+' device'+(n===1?'':'s')+' signed out.');
  },

  saveExtras(el){
    const u = userById(el.dataset.id);
    u.extra_permissions = modalCtx.draft || u.extra_permissions;
    logEntry(u._id,'permission_granted', u.extra_permissions.join(', ') || 'all extras removed', 0, state.me);
    ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
    closeModal(); render();
    toast('ok','Extras saved', u.extra_permissions.length+' extra permission(s) on top of the role.');
  },

  doChangePw(){ closeModal(); toast('ok','Password updated','You have been signed out of all other devices.'); },
  doChangeEmail(){ closeModal(); toast('ok','Email updated','Use your new address the next time you sign in.'); },

  next2fa(){
    if (state.twofa.step === 1){ state.twofa.step = 2; paintModal(); return; }
    const v = ($('#totp')||{}).value || '';
    if (!/^\d{6}$/.test(v)){ toast('err','Enter 6 digits','The code from your authenticator app is six digits.'); return; }
    state.twofa.codes = Array.from({length:10},()=>({ code:genCode(), used:false }));
    state.twofa.step = 3; paintModal();
  },
  finish2fa(){
    state.twofa.enabled = true; me().two_fa_enabled = true;
    logEntry(state.me,'two_fa_enabled','TOTP · 10 backup codes issued', 0, state.me);
    ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
    closeModal(); render();
    toast('ok','Two-factor enabled','All other devices were signed out and must re-authenticate.');
  },
  downloadCodes(){ toast('info','Backup codes',' A .txt download would start here.'); },

  doBulk(el){
    const kind = el.dataset.kind, ids = [...state.dir.selected];
    if (kind === 'deactivate'){
      ids.forEach(id => { const u = userById(id);
        if (u._id === state.me) return;
        u.is_active=false; u.presence_status='offline'; u.deactivated_date=iso(NOW);
        empById(u.employee).status='Inactive';
        logEntry(u._id,'user_deactivated','Bulk action', 0, state.me); });
      ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
      toast('ok','Users deactivated', ids.length+' account(s) suspended.');
    } else if (kind === 'reset'){
      ids.forEach(id => logEntry(id,'password_reset_sent','Bulk reset', 0, state.me));
      ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
      toast('ok','Reset emails sent', ids.length+' email(s) queued.');
    } else {
      toast('ok','Export ready', ids.length+' user(s) written to users-'+PROPERTY.code.toLowerCase()+'.csv');
    }
    state.dir.selected.clear(); closeModal(); render();
  },
};

/* ───────────────────────── Wiring ───────────────────────── */
function closePops(){ $$('.pop').forEach(p => p.classList.remove('is-open'));
  $$('[aria-haspopup]').forEach(b => b.setAttribute('aria-expanded','false'));
  $$('.rowmenu').forEach(m => m.remove()); }

function togglePop(btn, pop){
  const open = pop.classList.contains('is-open');
  closePops();
  if (!open){ pop.classList.add('is-open'); btn.setAttribute('aria-expanded','true'); }
}

function rowMenu(u, anchor){
  closePops();
  const items = [];
  items.push(['View profile','user', () => go('users', u._id)]);
  if (can('admin.edit_user') && !u.is_anonymized) items.push(['Edit user','edit', () => openModal('edit',{id:u._id})]);
  if (can('admin.change_user_role') && !u.is_anonymized) items.push(['Change role','shield', () => openModal('changeRole',{id:u._id})]);
  if (can('admin.send_password_reset') && u.is_active && !u.is_anonymized) items.push(['Send password reset','key', () => openModal('resetPassword',{id:u._id})]);
  if (can('admin.revoke_sessions') && u.is_active) items.push(['Revoke sessions','wifioff', () => openModal('revokeAll',{id:u._id})]);
  items.push(['sep']);
  if (u.is_active){
    if (can('admin.deactivate_user')) items.push(['Deactivate','slash', () => openModal('deactivate',{id:u._id}), true]);
    else items.push(['Deactivate','slash', () => openModal('denied',{code:'admin.deactivate_user'}), true]);
  } else if (!u.is_anonymized && can('admin.reactivate_user')){
    items.push(['Reactivate','rotate', () => openModal('reactivate',{id:u._id})]);
  }
  if (!u.is_anonymized && can('admin.anonymize_user')){
    items.push(['Anonymize (GDPR)','shieldoff',
      u.is_active ? null : () => openModal('anonymize',{id:u._id}), true, u.is_active ? 'Deactivate user first' : '']);
  }

  const m = document.createElement('div');
  m.className = 'pop rowmenu is-open';
  m.style.cssText = 'min-width:216px';
  m.innerHTML = items.map((it,i) => it[0]==='sep' ? `<div class="pop__sep"></div>`
    : `<button class="pop__item ${it[3]?'pop__item--danger':''} ${it[4]?'tip tip--left':''}" data-mi="${i}"
        ${it[2]?'':'disabled'} ${it[4]?`data-tip="${esc(it[4])}"`:''}>${svg(it[1])}${esc(it[0])}</button>`).join('');
  document.body.appendChild(m);

  const r = anchor.getBoundingClientRect();
  const w = 216, h = m.offsetHeight;
  m.style.position = 'fixed';
  m.style.left = Math.max(8, Math.min(r.right - w, window.innerWidth - w - 8)) + 'px';
  m.style.top  = (r.bottom + h + 8 > window.innerHeight ? r.top - h - 6 : r.bottom + 6) + 'px';
  m.style.zIndex = 250;

  $$('[data-mi]', m).forEach(b => b.onclick = e => {
    e.stopPropagation(); const fn = items[+b.dataset.mi][2]; closePops(); if (fn) fn();
  });
}

function setTheme(t){
  state.theme = t;
  document.documentElement.setAttribute('data-theme', t);
  me().dark_theme = (t === 'dark');
  renderTopbar(); renderUserCard();
  if (state.route === 'profile') render();
}

function wireView(){}
function wireCommon(){}

/* One delegated click handler — survives every re-render */
document.addEventListener('click', e => {
  const t = e.target;
  const hit = sel => t.closest(sel);

  /* pin toggle must beat the nav item it lives inside */
  const pin = hit('[data-pin]');
  if (pin){
    e.preventDefault(); e.stopPropagation();
    const id = pin.dataset.pin, i = state.pinned.indexOf(id);
    if (i >= 0) state.pinned.splice(i,1); else state.pinned.push(id);
    renderNav();
    toast('info', i>=0 ? 'Unpinned' : 'Pinned to top', esc(MODULES.find(m=>m.id===id).name));
    return;
  }

  const secHead = hit('[data-navsec]');
  if (secHead){ const k = secHead.dataset.navsec; state.navOpen[k] = !state.navOpen[k]; renderNav(); return; }

  const goBtn = hit('[data-go]');
  if (goBtn){ go(goBtn.dataset.go); return; }

  /* popovers */
  if (hit('#userCardBtn')){ togglePop($('#userCardBtn'), $('#userMenu')); return; }
  if (hit('#simBtn'))     { togglePop($('#simBtn'), $('#simMenu')); return; }
  if (hit('#bellBtn'))    { togglePop($('#bellBtn'), $('#bellMenu')); return; }
  if (hit('#themeBtn'))   { setTheme(state.theme==='dark'?'light':'dark'); return; }
  if (hit('#burger'))     { $('#sidebar').classList.add('is-open'); $('#navScrim').classList.add('is-open'); return; }
  if (t.id === 'navScrim'){ $('#sidebar').classList.remove('is-open'); $('#navScrim').classList.remove('is-open'); return; }

  /* NB: never match [data-theme] here — <html data-theme> would swallow every click */
  const themeBtn = hit('[data-set-theme]');
  if (themeBtn){ setTheme(themeBtn.dataset.setTheme); return; }

  /* directory controls */
  const kpi = hit('[data-kpi]');
  if (kpi){
    const id = kpi.dataset.kpi; const d = state.dir;
    d.kpi = d.kpi === id ? null : id;
    d.status=''; d.login=''; d.presence=''; d.page=1;
    if (d.kpi === 'active') d.status='active';
    if (d.kpi === 'inactive') d.status='inactive';
    if (d.kpi === 'pwd') d.status='pwd';
    if (d.kpi === '2fa') d.status='2fa';
    if (d.kpi === 'never') d.login='never';
    if (d.kpi === 'online') d.presence='online';
    render(); return;
  }
  const viewBtn = hit('[data-view]');
  if (viewBtn){ state.dir.view = viewBtn.dataset.view; render(); return; }

  const sortTh = hit('[data-sort]');
  if (sortTh){ const k = sortTh.dataset.sort, d = state.dir;
    if (d.sortKey === k) d.sortDir = d.sortDir==='asc'?'desc':'asc'; else { d.sortKey=k; d.sortDir='asc'; }
    render(); return; }

  const letter = hit('[data-letter]');
  if (letter){ const c = letter.dataset.letter;
    state.dir.letter = state.dir.letter === c ? '' : c; state.dir.page=1; render(); return; }

  const clear = hit('[data-clear]');
  if (clear){ const k = clear.dataset.clear, d = state.dir;
    if (k === 'all') Object.assign(d, { q:'', role:'', dept:'', status:'', login:'', presence:'', letter:'', kpi:null, page:1 });
    else { d[k] = k==='kpi' ? null : ''; d.page = 1; if (k==='kpi'){ d.status=''; d.login=''; d.presence=''; } }
    render(); return; }

  const page = hit('[data-page]');
  if (page && !page.disabled){ state.dir.page = +page.dataset.page; render(); return; }

  /* selection */
  if (t.matches('#chkAll')){
    const slice = visibleUsers().slice((state.dir.page-1)*state.dir.pageSize, state.dir.page*state.dir.pageSize);
    const all = slice.every(u => state.dir.selected.has(u._id));
    slice.forEach(u => all ? state.dir.selected.delete(u._id) : state.dir.selected.add(u._id));
    render(); return;
  }
  if (t.matches('[data-sel]')){
    e.stopPropagation();
    const id = t.dataset.sel;
    state.dir.selected.has(id) ? state.dir.selected.delete(id) : state.dir.selected.add(id);
    render(); return;
  }
  const bulk = hit('[data-bulk]');
  if (bulk){ const k = bulk.dataset.bulk;
    if (k === 'clear'){ state.dir.selected.clear(); render(); }
    else openModal('bulk', { kind:k });
    return; }

  /* row / card actions */
  const quick = hit('[data-quick]');   if (quick){ e.stopPropagation(); openDrawer(quick.dataset.quick); return; }
  const open  = hit('[data-open]');    if (open){ e.stopPropagation(); go('users', open.dataset.open); return; }
  const edit  = hit('[data-edit]');    if (edit){ e.stopPropagation(); openModal('edit',{id:edit.dataset.edit}); return; }
  const reset = hit('[data-reset]');   if (reset){ e.stopPropagation(); openModal('resetPassword',{id:reset.dataset.reset}); return; }
  const rch   = hit('[data-role-change]'); if (rch){ e.stopPropagation(); openModal('changeRole',{id:rch.dataset.roleChange}); return; }
  const deact = hit('[data-deactivate]');  if (deact){ e.stopPropagation(); openModal('deactivate',{id:deact.dataset.deactivate}); return; }
  const react = hit('[data-reactivate]');  if (react){ e.stopPropagation(); openModal('reactivate',{id:react.dataset.reactivate}); return; }
  const anon  = hit('[data-anonymize]');   if (anon){ e.stopPropagation(); modalCtx={}; openModal('anonymize',{id:anon.dataset.anonymize}); return; }
  const extras= hit('[data-extras]');      if (extras){ e.stopPropagation(); openModal('extras',{id:extras.dataset.extras, draft:userById(extras.dataset.extras).extra_permissions.slice()}); return; }
  const revAll= hit('[data-revoke-all]');  if (revAll){ e.stopPropagation(); openModal('revokeAll',{id:revAll.dataset.revokeAll}); return; }
  const rev   = hit('[data-revoke]');
  if (rev){ e.stopPropagation();
    const i = SESSIONS.findIndex(s=>s._id===rev.dataset.revoke);
    if (i>=0){ const s = SESSIONS[i]; SESSIONS.splice(i,1);
      logEntry(s.user,'session_revoked',s.user_agent+' · '+s.ip_address, 0, state.me);
      ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date)); render();
      toast('ok','Session revoked','That device has been signed out.'); }
    return; }

  const more = hit('[data-more]');
  if (more){ e.stopPropagation(); rowMenu(userById(more.dataset.more), more); return; }

  const tab = hit('[data-tab]');   if (tab){ state.detailTab = tab.dataset.tab; render(); return; }
  const psec= hit('[data-psec]');  if (psec){ state.profileSection = psec.dataset.psec; render(); return; }

  /* row body → drawer */
  const row = hit('[data-user]');
  if (row && !t.closest('.rowacts, .listrow__acts, .ucard__foot, .chk')){ openDrawer(row.dataset.user); return; }

  const act = hit('[data-act]');
  if (act){
    if (act.dataset.act === 'create'){
      if (!can('admin.create_user')) openModal('denied',{code:'admin.create_user'}); else openModal('create');
    } else { state.dir.selected.clear(); toast('ok','Export ready',
      visibleUsers().length+' user(s) written to users-'+PROPERTY.code.toLowerCase()+'.csv'); }
    return;
  }

  /* modal plumbing */
  const modalBtn = hit('[data-modal]'); if (modalBtn){ openModal(modalBtn.dataset.modal); return; }
  const copy = hit('[data-copy]');
  if (copy){ navigator.clipboard?.writeText(copy.dataset.copy).catch(()=>{});
    toast('ok','Copied to clipboard',''); return; }
  const wizBtn = hit('[data-wiz]');
  if (wizBtn && !wizBtn.disabled){
    const nxt = +wizBtn.dataset.wiz;
    if (nxt === 2 && wiz.step === 1){
      const e2 = empById(wiz.employee);
      wiz.email = (e2.first_name+'.'+e2.last_name).toLowerCase().replace(/[^a-z.]/g,'')+'@otiumcasino.ge';
      wiz.step = 2; paintModal(); return;
    }
    if (nxt === 3){
      wiz.errors = {};
      wiz.email = ($('#wEmail')||{}).value || ''; wiz.role = ($('#wRole')||{}).value || '';
      if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(wiz.email)) wiz.errors.email = 'Enter a valid email address.';
      else if (USERS.some(u => u.username.toLowerCase() === wiz.email.toLowerCase())) wiz.errors.email = 'That email already has a CRS account.';
      if (!wiz.role) wiz.errors.role = 'A user cannot sign in without a role.';
      if (Object.keys(wiz.errors).length){ paintModal(); return; }
      createUser(); return;
    }
    wiz.step = nxt; paintModal(); return;
  }
  const pick = hit('[data-pick]');
  if (pick){ wiz.employee = pick.dataset.pick; paintModal(); return; }
  const doBtn = hit('[data-do]');
  if (doBtn && !doBtn.disabled && ACTIONS[doBtn.dataset.do]){ ACTIONS[doBtn.dataset.do](doBtn); return; }
  if (hit('[data-twofa-off]')){
    state.twofa.enabled = false; me().two_fa_enabled = false; render();
    toast('ok','Two-factor disabled','All other devices were signed out.'); return;
  }
  if (hit('[data-close]') || t.id === 'scrim'){ closeModal(); return; }
  if (hit('[data-drawer-close]') || t.id === 'drawerScrim'){ closeDrawer(); return; }

  if (!hit('.pop') && !hit('[aria-haspopup]')) closePops();
});

/* Inputs — debounce-free, with caret restoration on the search fields */
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'navSearch'){ state.navQuery = t.value; renderNav(); return; }
  if (t.id === 'dirSearch'){
    state.dir.q = t.value; state.dir.page = 1; render();
    const n = $('#dirSearch'); if (n){ n.focus(); n.setSelectionRange(n.value.length, n.value.length); } return; }
  if (t.id === 'globalSearch'){
    if (state.route !== 'users' || state.sub) go('users');
    state.dir.q = t.value; state.dir.page = 1; render();
    const n = $('#globalSearch'); if (n){ n.focus(); n.setSelectionRange(n.value.length, n.value.length); } return; }
  if (t.id === 'pickSearch'){
    modalCtx.pickQ = t.value; paintModal();
    const n = $('#pickSearch'); if (n){ n.focus(); n.setSelectionRange(n.value.length, n.value.length); } return; }
  if (t.id === 'anonConfirm'){ modalCtx.confirmText = t.value; paintModal();
    const n = $('#anonConfirm'); if (n){ n.focus(); n.setSelectionRange(n.value.length, n.value.length); } return; }
  if (t.id === 'anonReason'){ modalCtx.reason = t.value;
    const btn = $('[data-do="doAnonymize"]');
    if (btn) btn.disabled = !(modalCtx.confirmText === 'ANONYMIZE' && t.value.trim()); return; }
  if (t.id === 'newPw'){ modalCtx.pw = t.value; paintModal();
    const n = $('#newPw'); if (n){ n.focus(); n.setSelectionRange(n.value.length, n.value.length); } return; }
});

document.addEventListener('change', e => {
  const t = e.target, d = state.dir;
  if (t.id === 'fRole'){ d.role = t.value; d.page=1; d.kpi=null; render(); }
  else if (t.id === 'fDept'){ d.dept = t.value; d.page=1; render(); }
  else if (t.id === 'fStatus'){ d.status = t.value; d.page=1; d.kpi=null; render(); }
  else if (t.id === 'fLogin'){ d.login = t.value; d.page=1; d.kpi=null; render(); }
  else if (t.id === 'pageSize'){ d.pageSize = +t.value; d.page=1; render(); }
  else if (t.matches('[data-extra]')){
    const code = t.dataset.extra;
    modalCtx.draft = modalCtx.draft || [];
    if (t.checked){ if (!modalCtx.draft.includes(code)) modalCtx.draft.push(code); }
    else modalCtx.draft = modalCtx.draft.filter(x => x !== code);
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape'){
    if ($('#scrim').classList.contains('is-open')) closeModal();
    else if ($('#drawer').classList.contains('is-open')) closeDrawer();
    else closePops();
  }
  if (e.key === '/' && !/input|textarea|select/i.test(e.target.tagName)){
    e.preventDefault(); const n = $('#dirSearch') || $('#globalSearch'); if (n) n.focus();
  }
});

function createUser(){
  const e = empById(wiz.employee);
  const uid = 'u' + String(USERS.length + 1).padStart(3,'0');
  wiz.tempPassword = genPassword();
  e.has_user = true;
  USERS.push({
    _id:uid, employee:e._id, username:wiz.email, user_id:'OTM-U-'+(1000+USERS.length),
    role:wiz.role, property:PROPERTY.name, company:COMPANY.name,
    is_active:true, must_change_password:true,
    last_login:null, last_password_change:iso(NOW), deactivated_date:null,
    dark_theme:true, created_date:iso(NOW), created_by:state.me,
    extra_permissions:[], two_fa_enabled:false, presence_status:'offline',
    is_anonymized:false, anonymized_date:null, anonymized_by:null, anonymize_reason:null,
    search_tokens:(e.first_name+' '+e.last_name+' '+wiz.email+' '+e.department+' '+e.position).toLowerCase(),
  });
  logEntry(uid,'user_created','Created from employee record · role “'+roleById(wiz.role).name+'”', 0, state.me);
  ACTIVITY.sort((a,b)=>new Date(b.date)-new Date(a.date));
  wiz.step = 3; paintModal(); render();
  $('#scrim').classList.add('is-open');
  toast('ok','User created', esc(e.full_name)+' can now sign in as <b>'+esc(roleById(wiz.role).name)+'</b>.');
}

/* ───────────────────────── Init ───────────────────────── */
document.documentElement.setAttribute('data-theme','dark');
state.twofa.enabled = me().two_fa_enabled;
state.twofa.codes = Array.from({length:10},()=>({ code:genCode(), used:false }));
state.twofa.codes[0].used = true; state.twofa.codes[4].used = true;
go('users');
