/* ═══════════════════════════════════════════════════════════════
   User detail page · quick-view drawer · profile page
═══════════════════════════════════════════════════════════════ */

const userSessions = id => SESSIONS.filter(s => s.user === id)
  .sort((a,b) => new Date(b.last_seen) - new Date(a.last_seen));
const userActivity = id => ACTIVITY.filter(a => a.subject_id === id);

function effectivePerms(u){
  const r = roleById(u.role);
  const fromRole = r.is_super_admin ? PERMISSIONS.map(p=>p.code) : r.permissions;
  return { fromRole, extras:u.extra_permissions, all:[...new Set([...fromRole, ...u.extra_permissions])] };
}

/* ───────────────────────── DETAIL PAGE ───────────────────────── */
function viewUserDetail(){
  if (!can('admin.view_users')) return accessDeniedPanel('admin.view_users');
  const u = userById(state.sub);
  if (!u) return `<div class="empty"><div class="empty__title">User not found</div></div>`;
  const e = empById(u.employee);
  const t = state.detailTab;

  const tabs = [
    ['overview','Overview','user',null],
    ['permissions','Permissions','shield', effectivePerms(u).all.length],
    ['sessions','Sessions','monitor', can('admin.view_sessions') ? userSessions(u._id).length : null],
    ['activity','Activity','activity', userActivity(u._id).length],
  ];

  return `
  <button class="btn btn--ghost btn--sm" data-go="users" style="margin-bottom:12px">${svg('arrowLeft')}All users</button>

  <div class="detail__hero">
    ${avatar(u,'xl')}
    <div style="min-width:0">
      <h1 class="detail__name">${esc(e.full_name)}</h1>
      <div class="detail__pos">${esc(e.position)} · ${esc(e.department)}</div>
      <div class="detail__badges">
        ${roleBadge(u)} ${statusBadge(u)}
        ${u.two_fa_enabled ? `<span class="badge badge--cyan">${svg('lock')}2FA on</span>` : `<span class="badge badge--neutral">2FA off</span>`}
        <span class="badge badge--neutral">${esc(PROPERTY.code)} · ${esc(PROPERTY.name)}</span>
      </div>
    </div>
    <div class="detail__acts">${detailActions(u)}</div>
  </div>
  <div class="detail__tabs"><div class="tabs" role="tablist">
    ${tabs.map(([id,label,icon,count]) => `<button class="tab" role="tab" data-tab="${id}" aria-selected="${t===id}">
      ${svg(icon)}${label}${count!=null?`<span class="tab__count">${count}</span>`:''}</button>`).join('')}
  </div></div>

  ${t==='overview' ? detailOverview(u,e)
   : t==='permissions' ? detailPermissions(u)
   : t==='sessions' ? detailSessions(u)
   : detailActivity(u)}`;
}

function detailActions(u){
  const b = [];
  if (u.is_anonymized) return `<span class="badge badge--neutral" style="height:30px;padding:0 12px">${svg('shieldoff')}&nbsp;Erased under GDPR</span>`;
  if (can('admin.send_password_reset'))
    b.push(`<button class="btn btn--secondary" data-reset="${u._id}">${svg('key')}Send reset</button>`);
  if (can('admin.change_user_role'))
    b.push(`<button class="btn btn--secondary" data-role-change="${u._id}">${svg('shield')}Change role</button>`);
  if (can('admin.edit_user'))
    b.push(`<button class="btn btn--primary" data-edit="${u._id}">${svg('edit')}Edit user</button>`);
  b.push(`<div style="position:relative"><button class="btn btn--secondary btn--icon" data-more="${u._id}">${svg('more')}</button></div>`);
  return b.join('');
}

function detailOverview(u,e){
  const acts = userActivity(u._id).slice(0,6);
  return `<div class="detail__body">
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card__head"><div><div class="card__title">Account</div>
          <div class="card__sub">Login identity — held on the User record</div></div>
          <span class="code">User</span></div>
        <div class="card__body"><div class="kv">
          <div class="kv__k">Login email</div><div class="kv__v"><b>${esc(u.username)}</b></div>
          <div class="kv__k">User ID</div><div class="kv__v mono">${esc(u.user_id)}</div>
          <div class="kv__k">Role</div><div class="kv__v">${roleBadge(u)}</div>
          <div class="kv__k">Property</div><div class="kv__v">${esc(u.property)} <span class="u-muted">(${esc(PROPERTY.city)}, ${esc(PROPERTY.country)})</span></div>
          <div class="kv__k">Company</div><div class="kv__v">${esc(u.company)}</div>
          <div class="kv__k">Status</div><div class="kv__v">${statusBadge(u)}</div>
          <div class="kv__k">Presence</div><div class="kv__v">${presenceLine(u)}</div>
          <div class="kv__k">Last sign-in</div><div class="kv__v">${u.last_login?fmtDateTime(u.last_login)+' <span class="u-muted">('+relTime(u.last_login)+')</span>':'<span class="u-muted">Never signed in</span>'}</div>
          <div class="kv__k">Password changed</div><div class="kv__v">${fmtDate(u.last_password_change)}</div>
          <div class="kv__k">Must change password</div><div class="kv__v">${u.must_change_password?'<span class="badge badge--amber">Yes — forced at next sign-in</span>':'No'}</div>
          <div class="kv__k">Two-factor</div><div class="kv__v">${u.two_fa_enabled?'<span class="badge badge--green">Enabled · TOTP</span>':'<span class="u-muted">Not enabled</span>'}</div>
          <div class="kv__k">Created</div><div class="kv__v">${fmtDate(u.created_date)}${u.created_by?' by '+esc(nameOf(userById(u.created_by))):''}</div>
          ${!u.is_active?`<div class="kv__k">Deactivated</div><div class="kv__v">${fmtDate(u.deactivated_date)}</div>`:''}
        </div></div>
      </div>

      <div class="card">
        <div class="card__head"><div><div class="card__title">Personal details</div>
          <div class="card__sub">All PII lives on the Employee record — the User holds none of it</div></div>
          <span class="code">Employee</span></div>
        <div class="card__body"><div class="kv">
          <div class="kv__k">Full name</div><div class="kv__v"><b>${esc(e.full_name)}</b></div>
          <div class="kv__k">Employee number</div><div class="kv__v mono">${esc(e.employee_number)}</div>
          <div class="kv__k">Position</div><div class="kv__v">${esc(e.position)}</div>
          <div class="kv__k">Department</div><div class="kv__v">${esc(e.department)}</div>
          <div class="kv__k">Work email</div><div class="kv__v">${e.email?esc(e.email):'<span class="u-muted">Cleared</span>'}</div>
          <div class="kv__k">Phone</div><div class="kv__v">${e.phone_number?esc(e.phone_number):'<span class="u-muted">Cleared</span>'}</div>
          <div class="kv__k">Joined</div><div class="kv__v">${fmtDate(e.join_date)}</div>
          <div class="kv__k">Employee status</div><div class="kv__v">${e.status==='Active'?'<span class="badge badge--green"><span class="badge__dot"></span>Active</span>':'<span class="badge badge--red"><span class="badge__dot"></span>Inactive</span>'}</div>
        </div>
        <div class="callout callout--neutral" style="margin-top:16px">${svg('info')}
          <span>Editing name, phone or photo happens in <b>Employee Management</b>. User Management only owns the login account.</span></div>
        </div>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card__head"><div class="card__title">Recent activity</div>
          <button class="btn btn--ghost btn--sm" data-tab="activity">View all</button></div>
        <div class="card__body">${acts.length?`<div class="timeline">${acts.map(tlItem).join('')}</div>`
          :`<div class="empty" style="padding:24px 0"><div class="empty__msg">No activity recorded.</div></div>`}</div>
      </div>
      ${dangerZone(u)}
    </div>
  </div>`;
}

function dangerZone(u){
  const canDeact = can('admin.deactivate_user'), canAnon = can('admin.anonymize_user');
  if (!canDeact && !canAnon && !can('admin.reactivate_user')) return '';
  return `<div class="card" style="border-color:rgba(239,68,68,.28)">
    <div class="card__head"><div><div class="card__title" style="color:var(--error)">Danger zone</div>
      <div class="card__sub">Two-step GDPR path — deactivate is reversible, anonymize is not</div></div></div>
    <div class="card__body" style="display:flex;flex-direction:column;gap:12px">
      ${u.is_active
        ? (canDeact ? `<div class="u-row u-gap-12">
            <div style="flex:1"><div style="color:var(--text-primary);font-size:12.5px;font-weight:600">Deactivate account</div>
            <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">Blocks sign-in and revokes every active session. Reversible.</div></div>
            <button class="btn btn--secondary btn--sm" data-deactivate="${u._id}">${svg('slash')}Deactivate</button></div>` : '')
        : (can('admin.reactivate_user') ? `<div class="u-row u-gap-12">
            <div style="flex:1"><div style="color:var(--text-primary);font-size:12.5px;font-weight:600">Reactivate account</div>
            <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">Restores sign-in. The user must set a new password.</div></div>
            <button class="btn btn--secondary btn--sm" data-reactivate="${u._id}">${svg('rotate')}Reactivate</button></div>` : '')}
      ${canAnon && !u.is_anonymized ? `<div class="divider"></div><div class="u-row u-gap-12">
        <div style="flex:1"><div style="color:var(--text-primary);font-size:12.5px;font-weight:600">Anonymize under GDPR</div>
        <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">Permanently scrubs personal data. Report authorship and audit records are kept.</div></div>
        ${u.is_active
          ? `<span class="tip tip--left" data-tip="Deactivate user first"><button class="btn btn--danger btn--sm" disabled>${svg('shieldoff')}Anonymize</button></span>`
          : `<button class="btn btn--danger btn--sm" data-anonymize="${u._id}">${svg('shieldoff')}Anonymize</button>`}</div>` : ''}
    </div></div>`;
}

function detailPermissions(u){
  const { fromRole, extras } = effectivePerms(u);
  const r = roleById(u.role);
  return `<div class="detail__body"><div style="display:flex;flex-direction:column;gap:14px">
    <div class="card">
      <div class="card__head"><div><div class="card__title">Effective permissions</div>
        <div class="card__sub">Role grant + per-user extras. Nothing is stored directly on the User.</div></div>
        ${can('admin.change_user_role')?`<button class="btn btn--secondary btn--sm" data-role-change="${u._id}">${svg('shield')}Change role</button>`:''}</div>
      <div class="card__body" style="display:flex;flex-direction:column;gap:14px">
        <div class="callout callout--info">${svg('info')}
          <span>Checks run as <code class="code" style="background:transparent;border:none;padding:0">Current User's role's permissions contains [X]</code> — the role is the source of truth, extras are the documented exception.</span></div>

        <div class="permgroup">
          <div class="permgroup__head">${svg('shield')}From role · ${esc(r.name)}
            <span class="permgroup__count">${r.is_super_admin?'all':fromRole.length} / ${PERMISSIONS.length}</span></div>
          ${PERMISSIONS.map(p => {
            const on = fromRole.includes(p.code);
            return `<div class="permrow" style="${on?'':'opacity:.42'}">
              <span style="color:${on?'var(--success)':'var(--text-disabled)'};display:flex">${svg(on?'check':'x')}</span>
              <span style="flex:1"><span class="permrow__name">${esc(p.display)}${p.destructive?' <span class="badge badge--red">destructive</span>':''}</span>
              <span class="permrow__code">${esc(p.code)}</span></span>
            </div>`; }).join('')}
        </div>

        <div class="permgroup">
          <div class="permgroup__head">${svg('plus')}Per-user extras
            <span class="permgroup__count">${extras.length}</span>
            ${can('admin.edit_user')?`<button class="btn btn--ghost btn--sm" data-extras="${u._id}" style="margin-left:8px">Edit</button>`:''}</div>
          ${extras.length ? extras.map(c => { const p = permByCode(c);
            return `<div class="permrow">
              <span style="color:var(--accent-text);display:flex">${svg('plus')}</span>
              <span style="flex:1"><span class="permrow__name">${esc(p.display)}</span>
              <span class="permrow__code">${esc(p.code)}</span></span>
              <span class="permrow__src"><span class="badge badge--blue">Extra</span></span></div>`; }).join('')
            : `<div class="permrow"><span class="permrow__name u-muted">No extra permissions beyond the role.</span></div>`}
        </div>
      </div>
    </div></div>
    <div class="card">
      <div class="card__head"><div class="card__title">Where this applies</div></div>
      <div class="card__body" style="font-size:12.5px;line-height:1.65">
        Every check is scoped to <b class="u-primary">${esc(u.company)} → ${esc(u.property)}</b> before permissions are evaluated.
        A user with all ten permissions still cannot see a record from another property.
        <div class="callout callout--warn" style="margin-top:12px">${svg('alerttriangle')}
          <span><b>Not enforced live yet.</b> The User type on branch <code class="code" style="background:transparent;border:none;padding:0">test</code> is property-only with no company check. Security Pass-2 is still open.</span></div>
      </div>
    </div>
  </div>`;
}

function detailSessions(u){
  if (!can('admin.view_sessions')) return `<div style="margin-top:14px">${accessDeniedPanel('admin.view_sessions')}</div>`;
  const ss = userSessions(u._id);
  return `<div class="detail__body"><div class="card">
    <div class="card__head"><div><div class="card__title">Active sessions</div>
      <div class="card__sub">One record per sign-in — used for force-logout and compliance trails</div></div>
      ${ss.length && can('admin.revoke_sessions')
        ? `<button class="btn btn--secondary btn--sm" data-revoke-all="${u._id}">${svg('wifioff')}Revoke all</button>`:''}</div>
    <div class="card__body">${ss.length ? ss.map(s => `
      <div class="sessionrow">
        <div class="sessionrow__icon">${svg(s.icon)}</div>
        <div style="flex:1;min-width:0">
          <div class="u-row u-gap-8"><span style="color:var(--text-primary);font-size:12.5px;font-weight:600">${esc(s.user_agent)}</span>
            ${s.current?`<span class="badge badge--green">This device</span>`:''}</div>
          <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">
            ${esc(s.ip_address)} · ${esc(s.location)} · signed in ${relTime(s.login_date)}</div>
        </div>
        <div style="text-align:right;flex:none">
          <div style="font-size:11.5px;color:var(--text-secondary)">Last seen ${relTime(s.last_seen)}</div>
          <div style="font-size:11px;color:var(--text-disabled)">Expires ${fmtDate(s.expires_date)}</div>
        </div>
        ${can('admin.revoke_sessions') && !s.current
          ? `<button class="icon-btn icon-btn--danger tip tip--left" data-tip="Revoke" data-revoke="${s._id}">${svg('slash')}</button>`
          : `<span style="width:28px"></span>`}
      </div>`).join('')
      : `<div class="empty" style="padding:34px 0"><div class="empty__icon">${svg('monitor')}</div>
         <div class="empty__title">No active sessions</div>
         <div class="empty__msg">This user is not signed in on any device.</div></div>`}
      <div class="callout callout--neutral" style="margin-top:14px">${svg('lock')}
        <span><code class="code" style="background:transparent;border:none;padding:0">Session.session_token</code> is never exposed to the client — not even to the session's own owner.</span></div>
    </div></div></div>`;
}

const tlItem = a => {
  const m = ACTION_META[a.action] || { label:a.action, tone:'', icon:'info' };
  return `<div class="tl">
    <div class="tl__icon ${m.tone?'tl__icon--'+m.tone:''}">${svg(m.icon)}</div>
    <div style="min-width:0;flex:1">
      <div class="tl__title">${esc(m.label)}</div>
      <div class="tl__meta">${esc(a.detail)}</div>
      <div class="tl__meta"><span class="tl__code">${esc(a.action)}</span> · ${fmtDateTime(a.date)}${a.actor?' · by '+esc(nameOf(userById(a.actor))):''}</div>
    </div></div>`;
};

function detailActivity(u){
  const acts = userActivity(u._id);
  return `<div class="detail__body"><div class="card">
    <div class="card__head"><div><div class="card__title">Activity log</div>
      <div class="card__sub">Polymorphic ActivityLog entries where subject = this User</div></div>
      <span class="code">${acts.length} entries</span></div>
    <div class="card__body">${acts.length?`<div class="timeline">${acts.map(tlItem).join('')}</div>`
      :`<div class="empty" style="padding:34px 0"><div class="empty__msg">Nothing logged yet.</div></div>`}</div>
  </div></div>`;
}

/* ───────────────────────── QUICK-VIEW DRAWER ───────────────────────── */
function openDrawer(id){
  const u = userById(id), e = empById(u.employee);
  const ss = userSessions(id), acts = userActivity(id).slice(0,4);
  $('#drawer').innerHTML = `
    <div class="drawer__head">
      <div class="u-row u-gap-12">
        <span style="font-family:var(--font-label);font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled)">Quick view</span>
        <span class="u-spacer"></span>
        <button class="icon-btn" data-drawer-close aria-label="Close">${svg('x')}</button>
      </div>
      <div class="u-row u-gap-12" style="margin-top:12px">
        ${avatar(u,'lg')}
        <div style="min-width:0">
          <div style="font-size:15px;font-weight:700;color:var(--text-primary)" class="u-truncate">${esc(e.full_name)}</div>
          <div style="font-size:12px;color:var(--text-muted)" class="u-truncate">${esc(e.position)} · ${esc(e.department)}</div>
        </div>
      </div>
      <div class="u-row u-gap-6" style="margin-top:11px;flex-wrap:wrap">${roleBadge(u)} ${statusBadge(u)}
        ${u.two_fa_enabled?`<span class="badge badge--cyan">2FA</span>`:''}</div>
    </div>
    <div class="drawer__body">
      <div class="kv">
        <div class="kv__k">Login email</div><div class="kv__v"><b>${esc(u.username)}</b></div>
        <div class="kv__k">Presence</div><div class="kv__v">${presenceLine(u)}</div>
        <div class="kv__k">Last sign-in</div><div class="kv__v">${relTime(u.last_login)}</div>
        <div class="kv__k">Phone</div><div class="kv__v">${e.phone_number?esc(e.phone_number):'—'}</div>
        <div class="kv__k">Property</div><div class="kv__v">${esc(u.property)}</div>
        <div class="kv__k">Sessions</div><div class="kv__v">${ss.length} active</div>
      </div>
      <div class="divider" style="margin:16px 0"></div>
      <div style="font-family:var(--font-label);font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:10px">Recent activity</div>
      <div class="timeline">${acts.map(tlItem).join('') || '<div class="u-muted" style="font-size:12px">Nothing logged yet.</div>'}</div>
    </div>
    <div class="drawer__foot">
      <button class="btn btn--primary" data-open="${u._id}" style="flex:1">${svg('user')}View profile</button>
      ${can('admin.edit_user')?`<button class="btn btn--secondary" data-edit="${u._id}">${svg('edit')}Edit</button>`:''}
      <button class="icon-btn" data-more="${u._id}" aria-label="More">${svg('more')}</button>
    </div>`;
  $('#drawer').classList.add('is-open');
  $('#drawerScrim').classList.add('is-open');
  wireCommon($('#drawer'));
}
function closeDrawer(){ $('#drawer').classList.remove('is-open'); $('#drawerScrim').classList.remove('is-open'); }

/* ───────────────────────── PROFILE PAGE ───────────────────────── */
const PROFILE_SECTIONS = [
  ['identity','Identity','user'], ['email','Email','mail'], ['password','Password','key'],
  ['twofa','Two-factor','lock'], ['prefs','Preferences','sliders'],
  ['sessions','Active sessions','monitor'], ['danger','Danger zone','alerttriangle'],
];

function viewProfile(){
  const u = me(), e = empById(u.employee), s = state.profileSection;
  return `
  <div class="page__head">
    <div><h1 class="page__title">My Profile</h1>
      <p class="page__sub">Your login account, security and interface preferences</p></div>
  </div>
  <div class="profile">
    <nav class="profnav">${PROFILE_SECTIONS.map(([id,label,icon]) =>
      `<button class="profnav__btn" data-psec="${id}" aria-current="${s===id}">${svg(icon)}${label}</button>`).join('')}</nav>
    <div>${
      s==='identity' ? profIdentity(u,e) :
      s==='email'    ? profEmail(u) :
      s==='password' ? profPassword(u) :
      s==='twofa'    ? profTwofa(u) :
      s==='prefs'    ? profPrefs(u) :
      s==='sessions' ? profSessions(u) : profDanger()
    }</div>
  </div>`;
}

function profIdentity(u,e){
  return `<div class="card">
    <div class="card__head"><div><div class="card__title">Identity</div>
      <div class="card__sub">Read-only here — these come from your Employee record</div></div></div>
    <div class="card__body">
      <div class="u-row u-gap-12" style="margin-bottom:18px">${avatar(u,'xl')}
        <div><div style="font-size:17px;font-weight:700;color:var(--text-primary)">${esc(e.full_name)}</div>
        <div style="font-size:12.5px;color:var(--text-muted);margin-top:2px">${esc(e.position)} · ${esc(e.department)}</div>
        <div style="margin-top:8px">${roleBadge(u)}</div></div>
      </div>
      <div class="kv">
        <div class="kv__k">Employee number</div><div class="kv__v mono">${esc(e.employee_number)}</div>
        <div class="kv__k">Work email</div><div class="kv__v">${esc(e.email)}</div>
        <div class="kv__k">Phone</div><div class="kv__v">${esc(e.phone_number)}</div>
        <div class="kv__k">Property</div><div class="kv__v">${esc(u.property)}</div>
        <div class="kv__k">Joined</div><div class="kv__v">${fmtDate(e.join_date)}</div>
      </div>
      <div class="callout callout--neutral" style="margin-top:16px">${svg('info')}
        <span>Your name, photo and contact details are maintained by HR in <b>Employee Management</b>.</span></div>
    </div></div>`;
}

function profEmail(u){
  return `<div class="card">
    <div class="card__head"><div><div class="card__title">Login email</div>
      <div class="card__sub">This is your identity in CRS — changing it changes how you sign in</div></div></div>
    <div class="card__body">
      <div class="kv"><div class="kv__k">Current</div><div class="kv__v"><b>${esc(u.username)}</b></div></div>
      <div class="card__foot" style="padding:16px 0 0;border:none">
        <button class="btn btn--secondary" data-modal="changeEmail">${svg('mail')}Change email</button></div>
    </div></div>`;
}

function profPassword(u){
  return `<div class="card">
    <div class="card__head"><div><div class="card__title">Password</div>
      <div class="card__sub">Minimum 10 characters with an uppercase letter, a number and a symbol</div></div></div>
    <div class="card__body">
      <div class="kv">
        <div class="kv__k">Last changed</div><div class="kv__v">${fmtDate(u.last_password_change)} <span class="u-muted">(${relTime(u.last_password_change)})</span></div>
        <div class="kv__k">Expiry policy</div><div class="kv__v">No forced rotation — <span class="u-muted">NIST advises against it</span></div>
      </div>
      <div class="callout callout--info" style="margin-top:14px">${svg('info')}
        <span>Changing your password signs you out of every other device.</span></div>
      <div class="card__foot" style="padding:16px 0 0;border:none">
        <button class="btn btn--primary" data-modal="changePassword">${svg('key')}Change password</button></div>
    </div></div>`;
}

function profTwofa(u){
  const on = state.twofa.enabled;
  return `<div class="card">
    <div class="card__head"><div><div class="card__title">Two-factor authentication</div>
      <div class="card__sub">Time-based codes from Google Authenticator, Authy or 1Password</div></div>
      ${on?`<span class="badge badge--green"><span class="badge__dot"></span>Enabled</span>`:`<span class="badge badge--neutral">Not enabled</span>`}</div>
    <div class="card__body">
      ${on ? `<div class="kv">
          <div class="kv__k">Method</div><div class="kv__v">Authenticator app (TOTP)</div>
          <div class="kv__k">Backup codes</div><div class="kv__v">${state.twofa.codes.filter(c=>!c.used).length} of ${state.twofa.codes.length} unused</div>
        </div>
        <div class="callout callout--warn" style="margin-top:14px">${svg('alerttriangle')}
          <span>Turning 2FA off signs you out of every other device.</span></div>
        <div class="card__foot" style="padding:16px 0 0;border:none">
          <button class="btn btn--secondary" data-modal="backupCodes">${svg('copy')}View backup codes</button>
          <button class="btn btn--danger-ghost" data-twofa-off>${svg('shieldoff')}Turn off 2FA</button></div>`
      : `<p style="font-size:12.5px;line-height:1.6">A second factor protects your account even if your password leaks. You will be asked for a 6-digit code each time you sign in from a new device.</p>
         <div class="card__foot" style="padding:16px 0 0;border:none">
          <button class="btn btn--primary" data-modal="twofaSetup">${svg('lock')}Enable 2FA</button></div>`}
    </div></div>`;
}

function profPrefs(u){
  return `<div class="card">
    <div class="card__head"><div><div class="card__title">Preferences</div>
      <div class="card__sub">Stored on UserPreferences — kept off the User record so privacy rules stay cheap</div></div></div>
    <div class="card__body" style="display:flex;flex-direction:column;gap:18px">
      <div class="u-row u-gap-12">
        <div style="flex:1"><div style="color:var(--text-primary);font-size:12.5px;font-weight:600">Theme</div>
          <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">Dark is the default — built for 24/7 control rooms</div></div>
        <div class="seg seg--quiet">
          <button class="seg__btn" data-theme="dark"  aria-pressed="${state.theme==='dark'}">${svg('moon')}Dark</button>
          <button class="seg__btn" data-theme="light" aria-pressed="${state.theme==='light'}">${svg('sun')}Light</button>
        </div>
      </div>
      <div class="divider"></div>
      <div class="u-row u-gap-12">
        <div style="flex:1"><div style="color:var(--text-primary);font-size:12.5px;font-weight:600">Default directory view</div>
          <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">How User Management opens for you</div></div>
        <div class="seg seg--quiet">
          ${['table','list','card'].map(v=>`<button class="seg__btn" data-view="${v}" aria-pressed="${state.dir.view===v}">${v[0].toUpperCase()+v.slice(1)}</button>`).join('')}
        </div>
      </div>
      <div class="divider"></div>
      <label class="switch"><input type="checkbox" checked><span class="switch__track"></span>
        <span><span style="display:block;color:var(--text-primary);font-size:12.5px;font-weight:600">Email me about security events</span>
        <span style="display:block;font-size:11.5px;color:var(--text-muted);margin-top:2px">New device sign-ins, password changes, 2FA changes</span></span></label>
    </div></div>`;
}

function profSessions(u){
  const ss = userSessions(u._id);
  return `<div class="card">
    <div class="card__head"><div><div class="card__title">Active sessions</div>
      <div class="card__sub">Devices currently signed in as you</div></div>
      <button class="btn btn--secondary btn--sm" data-revoke-all="${u._id}">${svg('logout')}Sign out other devices</button></div>
    <div class="card__body">${ss.map(s => `
      <div class="sessionrow">
        <div class="sessionrow__icon">${svg(s.icon)}</div>
        <div style="flex:1;min-width:0">
          <div class="u-row u-gap-8"><span style="color:var(--text-primary);font-size:12.5px;font-weight:600">${esc(s.user_agent)}</span>
            ${s.current?`<span class="badge badge--green">This device</span>`:''}</div>
          <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">${esc(s.ip_address)} · ${esc(s.location)}</div>
        </div>
        <div style="font-size:11.5px;color:var(--text-secondary);flex:none">${relTime(s.last_seen)}</div>
        ${s.current?`<span style="width:28px"></span>`:`<button class="icon-btn icon-btn--danger tip tip--left" data-tip="Sign out" data-revoke="${s._id}">${svg('slash')}</button>`}
      </div>`).join('')}
    </div></div>`;
}

function profDanger(){
  return `<div class="card" style="border-color:rgba(239,68,68,.28)">
    <div class="card__head"><div><div class="card__title" style="color:var(--error)">Danger zone</div>
      <div class="card__sub">Nothing here in the MVP</div></div></div>
    <div class="card__body">
      <div class="empty" style="padding:26px 0">
        <div class="empty__icon">${svg('lock')}</div>
        <div class="empty__title">No self-service deletion</div>
        <div class="empty__msg">Account deactivation and GDPR erasure are administrator-only actions, by design — a casino employee cannot erase their own audit trail.</div>
      </div>
    </div></div>`;
}
