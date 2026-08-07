/* ═══════════════════════════════════════════════════════════════
   CRS — User Management prototype · application logic
═══════════════════════════════════════════════════════════════ */

const $  = (s, r) => (r||document).querySelector(s);
const $$ = (s, r) => Array.from((r||document).querySelectorAll(s));

const state = {
  route:'users',
  sub:null,                       // detail user id / profile section
  theme:'dark',
  me:'u005',                      // Davit Giorgadze — Admin
  actingRole:'r_admin',           // permission simulator
  pinned:['user_management','reports'],
  navOpen:{ 'Admin / Core':true },
  navQuery:'',
  dir:{
    view:'table', q:'', role:'', dept:'', status:'', login:'', presence:'',
    letter:'', sortKey:'name', sortDir:'asc', page:1, pageSize:25,
    selected:new Set(), kpi:null, loading:false,
  },
  detailTab:'overview',
  profileSection:'identity',
  twofa:{ enabled:false, codes:[], step:1 },
};

const me = () => userById(state.me);
const myRole = () => roleById(state.actingRole);
const can = code => {
  const r = myRole();
  if (r.is_super_admin) return true;
  if (r.permissions.includes(code)) return true;
  return state.actingRole === userById(state.me).role && me().extra_permissions.includes(code);
};
const permByCode = c => PERMISSIONS.find(p => p.code === c);

/* ───────────────────────── small renderers ───────────────────────── */
function avatar(user, size, extra){
  const e = empById(user.employee);
  const px = { sm:24, md:32, lg:44, xl:72 }[size];
  const dotState = !user.is_active ? 'inactive' : (user.presence_status || 'offline');
  const inner = (e.photo && !user.is_anonymized)
    ? avatarSVG(e._id, px)
    : `<span class="av__init av__init--${user.is_anonymized?'neutral':'accent'}">${esc(initialsOf(e))}</span>`;
  const ring = user.is_active ? '' : ' av--ring';
  return `<span class="av av--${size}${ring} ${extra||''}">${inner}<span class="av__dot av__dot--${dotState}"></span></span>`;
}

function statusBadge(u){
  if (u.is_anonymized) return `<span class="badge badge--neutral"><span class="badge__dot"></span>Anonymized</span>`;
  if (!u.is_active)    return `<span class="badge badge--red"><span class="badge__dot"></span>Inactive</span>`;
  if (u.must_change_password) return `<span class="badge badge--amber"><span class="badge__dot"></span>Password due</span>`;
  return `<span class="badge badge--green"><span class="badge__dot"></span>Active</span>`;
}
const roleBadge = u => `<span class="badge badge--role">${esc(roleById(u.role).name)}</span>`;
const nameOf = u => empById(u.employee).full_name;

function presenceLine(u){
  if(!u.is_active) return `<span style="color:var(--text-disabled)">Deactivated</span>`;
  const p = PRESENCE[u.presence_status] || PRESENCE.offline;
  return `<span class="u-row u-gap-6"><span style="width:6px;height:6px;border-radius:50%;background:${p.color};display:inline-block"></span>${p.label}</span>`;
}

/* ───────────────────────── SIDEBAR ───────────────────────── */
function renderNav(){
  const q = state.navQuery.trim().toLowerCase();
  const match = m => !q || m.name.toLowerCase().includes(q) || m.section.toLowerCase().includes(q);
  let html = '';

  const pins = state.pinned.map(id => MODULES.find(m => m.id === id)).filter(Boolean).filter(match);
  if (pins.length && !q){
    html += navSection('Pinned', pins, true);
  }
  SECTIONS.forEach(sec => {
    const items = MODULES.filter(m => m.section === sec).filter(match);
    if (!items.length) return;
    html += navSection(sec, items, false);
  });
  if (!html) html = `<div class="empty" style="padding:34px 12px"><div class="empty__msg">No module matches “${esc(state.navQuery)}”.</div></div>`;
  $('#nav').innerHTML = html;
}

function navSection(title, items, isPinned){
  const open = state.navQuery ? true : (isPinned ? true : !!state.navOpen[title]);
  return `<section class="navsec" data-expanded="${open}" data-sec="${esc(title)}">
    <button class="navsec__head" data-navsec="${esc(title)}" aria-expanded="${open}">
      ${svg('chevronR','navsec__chev')}<span>${esc(title)}</span>
      <span class="navsec__count">${items.length}</span>
    </button>
    <div class="navsec__items">${items.map(m => navItem(m, isPinned)).join('')}</div>
  </section>`;
}

function navItem(m, inPinned){
  const active = state.route === m.route;
  const tag = STATUS_TAG[m.status];
  const pinned = state.pinned.includes(m.id);
  return `<button class="navitem ${active?'is-active':''}" data-go="${m.route}" title="${esc(m.name)}">
    ${svg(m.icon,'navitem__icon')}
    <span class="navitem__label">${esc(m.name)}</span>
    ${m.status==='live' ? `<span class="navitem__dot" title="Live"></span>` : ''}
    ${tag ? `<span class="navitem__tag navitem__tag--${tag.cls}">${tag.label}</span>` : ''}
    <span class="navitem__pin ${pinned?'is-pinned':''}" data-pin="${m.id}" role="button"
          title="${pinned?'Unpin from top':'Pin to top'}">${svg('pin')}</span>
  </button>`;
}

function renderUserCard(){
  const u = me(), e = empById(u.employee);
  $('#userCardBtn').innerHTML = `${avatar(u,'md')}
    <span style="min-width:0">
      <span class="usercard__name u-truncate" style="display:block">${esc(e.full_name)}</span>
      <span class="usercard__role u-truncate" style="display:block">${esc(roleById(u.role).name)}</span>
    </span>${svg('chevronU','usercard__chev')}`;

  const rows = [
    ['My Profile','user',      () => go('profile')],
    ['Change Password','key',  () => openModal('changePassword')],
    ['Notifications','bell',   null],
  ];
  $('#userMenu').innerHTML = `
    <div class="usermenu__head">
      ${avatar(u,'lg')}
      <div style="min-width:0">
        <div class="usermenu__name u-truncate">${esc(e.full_name)}</div>
        <div class="usermenu__email u-truncate">${esc(u.username)}</div>
        <div style="margin-top:6px">${roleBadge(u)}</div>
      </div>
    </div>
    <div class="pop__sep"></div>
    <div class="pop__label">Account</div>
    ${rows.map(([l,i],idx)=>`<button class="pop__item" data-um="${idx}" ${rows[idx][2]?'':'disabled'}>${svg(i)}${l}</button>`).join('')}
    <div class="pop__label">Preferences</div>
    <div class="usermenu__theme">
      <span style="font-size:12.5px">Theme</span>
      <div class="seg seg--quiet">
        <button class="seg__btn" data-set-theme="dark"  aria-pressed="${state.theme==='dark'}">${svg('moon')}Dark</button>
        <button class="seg__btn" data-set-theme="light" aria-pressed="${state.theme==='light'}">${svg('sun')}Light</button>
      </div>
    </div>
    <div class="pop__sep"></div>
    <button class="pop__item pop__item--danger" data-signout>${svg('logout')}Sign out</button>`;

  $$('#userMenu [data-um]').forEach(b => b.onclick = () => {
    closePops(); const fn = rows[+b.dataset.um][2]; if (fn) fn();
  });
  $$('#userMenu [data-set-theme]').forEach(b => b.onclick = () => setTheme(b.dataset.setTheme));
  $('#userMenu [data-signout]').onclick = () => { closePops(); toast('info','Signed out','Prototype — no session was actually ended.'); };
}

/* ───────────────────────── TOPBAR ───────────────────────── */
function renderTopbar(){
  $('#burger').innerHTML = svg('menu');
  $('#themeBtn').innerHTML = state.theme === 'dark' ? svg('sun') : svg('moon');
  $('#bellBtn').innerHTML = svg('bell');

  const r = myRole();
  $('#simBtn').innerHTML = `${svg('eye')}<span class="simchip__lbl">Viewing as</span>
    <span class="simchip__val">${esc(r.name)}</span>${svg('chevronD')}`;
  $('#simMenu').innerHTML = `<div class="pop__label">Preview permissions as</div>` +
    ROLES.map(x => `<button class="pop__item" data-role="${x.id}" aria-checked="${x.id===state.actingRole}">
        ${x.id===state.actingRole?svg('check'):'<span style="width:16px"></span>'}
        <span style="flex:1">${esc(x.name)}</span>
        <span class="mono" style="font-size:10.5px;color:var(--text-disabled)">${x.is_super_admin?'all':x.permissions.length}</span>
      </button>`).join('') +
    `<div class="pop__sep"></div>
     <div style="padding:4px 10px 8px;font-size:11px;color:var(--text-muted);line-height:1.5">
       Re-gates every action in this prototype the way the real permission checks will.
     </div>`;
  $$('#simMenu [data-role]').forEach(b => b.onclick = () => {
    state.actingRole = b.dataset.role; closePops(); renderTopbar(); render();
    toast('info','Now viewing as ' + roleById(state.actingRole).name, 'Buttons you no longer have permission for are hidden or disabled.');
  });

  const news = [
    ['userplus','Natia Bakhtadze’s account was created','32 min ago'],
    ['alertcircle','3 failed sign-in attempts for L. Kobakhidze','2 hours ago'],
    ['shieldoff','Manana Pkhaladze anonymized under GDPR','2 days ago'],
  ];
  $('#bellMenu').innerHTML = `<div class="pop__label">Recent</div>` + news.map(([i,t,w]) =>
    `<button class="pop__item" style="align-items:flex-start">${svg(i)}
      <span style="flex:1"><span style="display:block;color:var(--text-primary)">${esc(t)}</span>
      <span style="font-size:11px;color:var(--text-muted)">${w}</span></span></button>`).join('');

  const mod = MODULES.find(m => m.route === state.route);
  let crumbs;
  if (state.route === 'profile') crumbs = [['Account'],['My Profile', true]];
  else if (state.route === 'users' && state.sub) crumbs = [[mod.section],['User Management', false, 'users'],[nameOf(userById(state.sub)), true]];
  else crumbs = [[mod ? mod.section : 'CRS'],[mod ? mod.name : '—', true]];

  $('#crumbs').innerHTML = crumbs.map(([label, cur, to], i) =>
    (i ? `<span class="crumbs__sep">/</span>` : '') +
    (cur ? `<span class="crumbs__cur u-truncate">${esc(label)}</span>`
         : to ? `<button data-go="${to}" style="color:inherit">${esc(label)}</button>`
              : `<span>${esc(label)}</span>`)).join('');
}

/* ───────────────────────── ROUTER ───────────────────────── */
function go(route, sub){
  state.route = route; state.sub = sub || null;
  if (route === 'users' && !sub) state.detailTab = 'overview';
  const mod = MODULES.find(m => m.route === route);
  if (mod) state.navOpen[mod.section] = true;
  closeDrawer(); closePops(); $('#sidebar').classList.remove('is-open'); $('#navScrim').classList.remove('is-open');
  render(); window.scrollTo({ top:0 });
  $('#view').focus({ preventScroll:true });
}

function render(){
  renderNav(); renderTopbar(); renderUserCard();
  const v = $('#view');
  if (state.route === 'profile')      v.innerHTML = viewProfile();
  else if (state.route === 'users')   v.innerHTML = state.sub ? viewUserDetail() : viewDirectory();
  else                                v.innerHTML = viewComingSoon();
  wireView();
}

/* ───────────────────────── COMING SOON (design.md §11) ───────────────────────── */
function viewComingSoon(){
  const m = MODULES.find(x => x.route === state.route);
  if (!m) return `<div class="empty"><div class="empty__title">Unknown module</div></div>`;
  const tag = STATUS_TAG[m.status];
  const ghost = m.name.split(' ')[0].toUpperCase();
  return `<div class="soon">
    <div class="soon__ghost">${esc(ghost)}</div>
    <div class="soon__icon">${svg(m.icon)}</div>
    <div class="soon__section">${esc(m.section)}</div>
    <h1 class="soon__title">${esc(m.name)}</h1>
    <p class="soon__desc">${esc(m.desc)}</p>
    <div class="soon__pill">${
      m.status === 'live'
        ? `<span class="badge badge--green" style="height:26px;padding:0 12px;font-size:11.5px"><span class="badge__dot"></span>Live in the CRS app</span>`
        : `<span class="badge badge--${tag.cls}" style="height:26px;padding:0 12px;font-size:11.5px">${tag.label}</span>`
    }</div>
    ${m.status==='live' && m.id!=='user_management'
      ? `<p class="soon__desc" style="margin-top:14px;font-size:12px">This module is built in Bubble. This prototype covers <b style="color:var(--text-secondary)">User Management</b> — open it from the sidebar.</p>` : ''}
  </div>`;
}

/* ───────────────────────── DIRECTORY ───────────────────────── */
function visibleUsers(){
  /* Tenant isolation first — exactly as the privacy rule will (company AND property) */
  let list = USERS.filter(u => u.company === COMPANY.name && u.property === PROPERTY.name);

  const d = state.dir;
  if (d.q){
    const q = d.q.toLowerCase();
    list = list.filter(u => u.search_tokens.includes(q) || u.username.toLowerCase().includes(q));
  }
  if (d.role)     list = list.filter(u => u.role === d.role);
  if (d.dept)     list = list.filter(u => empById(u.employee).department === d.dept);
  if (d.presence) list = list.filter(u => u.is_active && u.presence_status === d.presence);
  if (d.letter)   list = list.filter(u => empById(u.employee).last_name.toUpperCase().startsWith(d.letter));

  switch (d.status){
    case 'active':     list = list.filter(u => u.is_active && !u.is_anonymized); break;
    case 'inactive':   list = list.filter(u => !u.is_active && !u.is_anonymized); break;
    case 'anonymized': list = list.filter(u => u.is_anonymized); break;
    case 'pwd':        list = list.filter(u => u.must_change_password); break;
    case '2fa':        list = list.filter(u => u.two_fa_enabled); break;
    case 'no2fa':      list = list.filter(u => !u.two_fa_enabled && u.is_active); break;
  }
  const days = u => u.last_login ? (NOW - new Date(u.last_login)) / DAY : Infinity;
  switch (d.login){
    case 'today': list = list.filter(u => days(u) < 1); break;
    case '7':     list = list.filter(u => days(u) <= 7); break;
    case '30':    list = list.filter(u => days(u) <= 30); break;
    case 'stale': list = list.filter(u => days(u) > 30 && u.last_login); break;
    case 'never': list = list.filter(u => !u.last_login); break;
  }

  const key = { name:u=>empById(u.employee).last_name.toLowerCase(),
                email:u=>u.username, role:u=>roleById(u.role).level,
                dept:u=>empById(u.employee).department,
                status:u=>(u.is_anonymized?2:u.is_active?0:1),
                login:u=>u.last_login?new Date(u.last_login).getTime():0,
                created:u=>new Date(u.created_date).getTime() }[d.sortKey];
  list.sort((a,b) => { const A=key(a), B=key(b);
    const c = A<B ? -1 : A>B ? 1 : 0; return d.sortDir==='asc' ? c : -c; });
  return list;
}

const KPIS = [
  { id:'all',   label:'Total users',  icon:'users',      f:l=>l.length },
  { id:'active',label:'Active',       icon:'usercheck',  f:l=>l.filter(u=>u.is_active&&!u.is_anonymized).length },
  { id:'inactive',label:'Inactive',   icon:'slash',      f:l=>l.filter(u=>!u.is_active&&!u.is_anonymized).length },
  { id:'online',label:'Online now',   icon:'radio',      f:l=>l.filter(u=>u.is_active&&u.presence_status==='online').length },
  { id:'pwd',   label:'Password due', icon:'key',        f:l=>l.filter(u=>u.must_change_password).length },
  { id:'2fa',   label:'2FA enabled',  icon:'lock',       f:l=>l.filter(u=>u.two_fa_enabled).length },
  { id:'never', label:'Never signed in', icon:'clock',   f:l=>l.filter(u=>!u.last_login).length },
];

function viewDirectory(){
  if (!can('admin.view_users')) return accessDeniedPanel('admin.view_users');

  const d = state.dir;
  const all = USERS.filter(u => u.company === COMPANY.name && u.property === PROPERTY.name);
  const list = visibleUsers();
  const pages = Math.max(1, Math.ceil(list.length / d.pageSize));
  if (d.page > pages) d.page = pages;
  const start = (d.page - 1) * d.pageSize;
  const slice = list.slice(start, start + d.pageSize);

  const depts = [...new Set(all.map(u => empById(u.employee).department))].sort();
  const roles = ROLES.filter(r => all.some(u => u.role === r.id));

  return `
  <div class="page__head">
    <div>
      <h1 class="page__title">User Management</h1>
      <p class="page__sub">${all.length} login accounts · ${esc(PROPERTY.name)} · ${esc(COMPANY.name)}</p>
    </div>
    <div class="page__actions">
      <button class="btn btn--secondary" data-act="export">${svg('download')}Export</button>
      ${can('admin.create_user')
        ? `<button class="btn btn--primary" data-act="create">${svg('userplus')}Create user</button>`
        : `<button class="btn btn--primary tip tip--left" data-tip="Requires Users - Create" disabled>${svg('userplus')}Create user</button>`}
    </div>
  </div>

  <div class="kpirow">${KPIS.map(k => {
    const on = d.kpi === k.id;
    return `<button class="kpi" data-kpi="${k.id}" aria-pressed="${on}">
      <span class="kpi__top">${svg(k.icon,'kpi__icon')}<span class="kpi__label">${k.label}</span></span>
      <span class="kpi__value">${k.f(all)}</span>
    </button>`; }).join('')}</div>

  <div class="toolbar">
    <div class="toolbar__search">
      <div class="input-wrap">
        ${svg('search','input-wrap__icon')}
        <input class="input" id="dirSearch" type="search" placeholder="Search name, email, department…"
               value="${esc(d.q)}" autocomplete="off">
      </div>
    </div>

    <select class="select" id="fRole" style="width:auto;min-width:132px">
      <option value="">All roles</option>
      ${roles.map(r=>`<option value="${r.id}" ${d.role===r.id?'selected':''}>${esc(r.name)}</option>`).join('')}
    </select>
    <select class="select" id="fDept" style="width:auto;min-width:150px">
      <option value="">All departments</option>
      ${depts.map(x=>`<option value="${esc(x)}" ${d.dept===x?'selected':''}>${esc(x)}</option>`).join('')}
    </select>
    <select class="select" id="fStatus" style="width:auto;min-width:132px">
      <option value="">Any status</option>
      <option value="active"     ${d.status==='active'?'selected':''}>Active</option>
      <option value="inactive"   ${d.status==='inactive'?'selected':''}>Inactive</option>
      <option value="anonymized" ${d.status==='anonymized'?'selected':''}>Anonymized</option>
      <option value="pwd"        ${d.status==='pwd'?'selected':''}>Password change due</option>
      <option value="2fa"        ${d.status==='2fa'?'selected':''}>2FA enabled</option>
      <option value="no2fa"      ${d.status==='no2fa'?'selected':''}>2FA not enabled</option>
    </select>
    <select class="select" id="fLogin" style="width:auto;min-width:138px">
      <option value="">Any last sign-in</option>
      <option value="today" ${d.login==='today'?'selected':''}>Today</option>
      <option value="7"     ${d.login==='7'?'selected':''}>Last 7 days</option>
      <option value="30"    ${d.login==='30'?'selected':''}>Last 30 days</option>
      <option value="stale" ${d.login==='stale'?'selected':''}>Over 30 days ago</option>
      <option value="never" ${d.login==='never'?'selected':''}>Never</option>
    </select>

    <div class="u-spacer"></div>

    <div class="seg seg--quiet" role="group" aria-label="View">
      <button class="seg__btn" data-view="table" aria-pressed="${d.view==='table'}">${svg('columns')}Table</button>
      <button class="seg__btn" data-view="list"  aria-pressed="${d.view==='list'}">${svg('list')}List</button>
      <button class="seg__btn" data-view="card"  aria-pressed="${d.view==='card'}">${svg('grid')}Cards</button>
    </div>
  </div>

  ${chipBar(list.length, all.length)}

  <div class="dirwrap">
    <div class="dirwrap__main">
      ${slice.length === 0 ? emptyState()
        : d.view === 'table' ? tableView(slice)
        : d.view === 'list'  ? `<div class="tablewrap"><div class="listview">${slice.map(listRow).join('')}</div>${pager(list.length, pages)}</div>`
        : `${cardView(slice)}<div class="tablewrap" style="margin-top:10px">${pager(list.length, pages)}</div>`}
    </div>
    ${alphaRail(all)}
  </div>

  ${d.selected.size ? bulkBar() : ''}`;
}

function chipBar(shown, total){
  const d = state.dir, chips = [];
  const add = (label, clear) => chips.push(
    `<button class="chip chip--active" data-clear="${clear}">${esc(label)}<span class="chip__x">${svg('x')}</span></button>`);
  if (d.q)        add('“' + d.q + '”', 'q');
  if (d.role)     add(roleById(d.role).name, 'role');
  if (d.dept)     add(d.dept, 'dept');
  if (d.status)   add({active:'Active',inactive:'Inactive',anonymized:'Anonymized',pwd:'Password due','2fa':'2FA enabled',no2fa:'No 2FA'}[d.status], 'status');
  if (d.login)    add({today:'Signed in today','7':'Last 7 days','30':'Last 30 days',stale:'Stale >30d',never:'Never signed in'}[d.login], 'login');
  if (d.presence) add(PRESENCE[d.presence].label, 'presence');
  if (d.letter)   add('Surname ' + d.letter, 'letter');
  if (d.kpi && d.kpi !== 'all') add('KPI: ' + (KPIS.find(k=>k.id===d.kpi)||{}).label, 'kpi');

  return `<div class="filterbar">
    <span class="filterbar__label">${shown === total ? 'All' : 'Filtered'}</span>
    <span class="mono" style="font-size:11.5px;color:var(--text-secondary)">${shown}/${total}</span>
    ${chips.join('')}
    ${chips.length ? `<button class="chip" data-clear="all">Clear all</button>` : ''}
  </div>`;
}

function alphaRail(all){
  const present = new Set(all.map(u => empById(u.employee).last_name[0].toUpperCase()));
  const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return `<div class="rail" aria-label="Jump to surname">
    ${L.map(c => `<button class="rail__btn" data-letter="${c}" ${present.has(c)?'':'disabled'}
        aria-pressed="${state.dir.letter===c}">${c}</button>`).join('')}
    <button class="rail__btn" data-letter="" title="Clear" style="margin-top:3px">•</button>
  </div>`;
}

const COLS = [
  ['name','User'], ['email','Email'], ['role','Role'], ['dept','Department'],
  ['status','Status'], ['login','Last sign-in'], ['created','Created'],
];

function tableView(slice){
  const d = state.dir;
  const list = visibleUsers();
  const pages = Math.max(1, Math.ceil(list.length / d.pageSize));
  const allChecked = slice.length && slice.every(u => d.selected.has(u._id));
  return `<div class="tablewrap"><div class="tablescroll"><table class="tbl">
    <thead><tr>
      <th class="col-chk"><label class="chk"><input type="checkbox" id="chkAll" ${allChecked?'checked':''}><span class="chk__box">${svg('check')}</span></label></th>
      ${COLS.map(([k,l]) => `<th class="is-sortable ${d.sortKey===k?'is-sorted':''}" data-sort="${k}">
        <span class="sort">${esc(l)}${svg(d.sortKey===k && d.sortDir==='desc' ? 'chevronD' : 'chevronU')}</span></th>`).join('')}
      <th class="col-actions">Actions</th>
    </tr></thead>
    <tbody>${slice.map(u => {
      const e = empById(u.employee), sel = d.selected.has(u._id);
      return `<tr data-user="${u._id}" class="${sel?'is-selected':''} ${u.is_active?'':'is-dimmed'}">
        <td class="col-chk"><label class="chk"><input type="checkbox" data-sel="${u._id}" ${sel?'checked':''}><span class="chk__box">${svg('check')}</span></label></td>
        <td><span class="who">${avatar(u,'md')}<span style="min-width:0">
          <span class="who__name" style="display:block">${esc(e.full_name)}</span>
          <span class="who__sub" style="display:block">${esc(e.position)}</span></span></span></td>
        <td class="u-truncate" style="max-width:230px">${esc(u.username)}</td>
        <td>${roleBadge(u)}</td>
        <td>${esc(e.department)}</td>
        <td>${statusBadge(u)}</td>
        <td>${relTime(u.last_login)}</td>
        <td>${fmtDate(u.created_date)}</td>
        <td class="col-actions">${rowActions(u)}</td>
      </tr>`; }).join('')}
    </tbody></table></div>${pager(list.length, pages)}</div>`;
}

function rowActions(u){
  const b = [];
  b.push(`<button class="icon-btn tip tip--left" data-tip="Quick view" data-quick="${u._id}">${svg('eye')}</button>`);
  if (can('admin.edit_user'))
    b.push(`<button class="icon-btn tip tip--left" data-tip="Edit" data-edit="${u._id}">${svg('edit')}</button>`);
  if (can('admin.send_password_reset') && !u.is_anonymized)
    b.push(`<button class="icon-btn tip tip--left" data-tip="Send password reset" data-reset="${u._id}">${svg('key')}</button>`);
  b.push(`<button class="icon-btn tip tip--left" data-tip="More" data-more="${u._id}">${svg('more')}</button>`);
  return `<span class="rowacts">${b.join('')}</span>`;
}

function listRow(u){
  const e = empById(u.employee), sel = state.dir.selected.has(u._id);
  return `<div class="listrow ${sel?'is-selected':''}" data-user="${u._id}">
    <label class="chk" onclick="event.stopPropagation()"><input type="checkbox" data-sel="${u._id}" ${sel?'checked':''}><span class="chk__box">${svg('check')}</span></label>
    ${avatar(u,'lg')}
    <div class="listrow__main">
      <div class="u-row u-gap-8" style="flex-wrap:wrap">
        <span class="who__name" style="font-size:13.5px">${esc(e.full_name)}</span>
        ${roleBadge(u)} ${statusBadge(u)}
        ${u.two_fa_enabled?`<span class="badge badge--cyan">2FA</span>`:''}
      </div>
      <div class="who__sub" style="margin-top:3px">${esc(e.position)} · ${esc(e.department)} · ${esc(u.username)}</div>
    </div>
    <div class="listrow__meta">
      <div class="listrow__col"><div class="listrow__k">Presence</div><div class="listrow__v">${presenceLine(u)}</div></div>
      <div class="listrow__col"><div class="listrow__k">Last sign-in</div><div class="listrow__v">${relTime(u.last_login)}</div></div>
      <div class="listrow__col"><div class="listrow__k">Sessions</div><div class="listrow__v mono">${SESSIONS.filter(s=>s.user===u._id).length}</div></div>
    </div>
    <div class="listrow__acts">${rowActions(u)}</div>
  </div>`;
}

function cardView(slice){
  return `<div class="cardgrid">${slice.map(u => {
    const e = empById(u.employee), sel = state.dir.selected.has(u._id);
    return `<div class="ucard ${sel?'is-selected':''}" data-user="${u._id}">
      <label class="chk ucard__chk" onclick="event.stopPropagation()"><input type="checkbox" data-sel="${u._id}" ${sel?'checked':''}><span class="chk__box">${svg('check')}</span></label>
      <div class="ucard__top">${avatar(u,'lg')}
        <div style="min-width:0;padding-right:22px">
          <div class="ucard__name u-truncate">${esc(e.full_name)}</div>
          <div class="ucard__pos u-truncate">${esc(e.position)}</div>
          <div style="margin-top:7px">${roleBadge(u)}</div>
        </div>
      </div>
      <div class="ucard__grid">
        <div><div class="ucard__k">Department</div><div class="ucard__v u-truncate">${esc(e.department)}</div></div>
        <div><div class="ucard__k">Status</div><div class="ucard__v">${statusBadge(u)}</div></div>
        <div><div class="ucard__k">Last sign-in</div><div class="ucard__v">${relTime(u.last_login)}</div></div>
        <div><div class="ucard__k">Presence</div><div class="ucard__v">${presenceLine(u)}</div></div>
      </div>
      <div class="ucard__foot">
        <button class="btn btn--secondary btn--sm" data-quick="${u._id}">${svg('eye')}Quick view</button>
        <button class="btn btn--ghost btn--sm" data-open="${u._id}">Profile</button>
        <span class="u-spacer"></span>
        <button class="icon-btn" data-more="${u._id}">${svg('more')}</button>
      </div>
    </div>`; }).join('')}</div>`;
}

function pager(total, pages){
  const d = state.dir, from = total ? (d.page-1)*d.pageSize + 1 : 0;
  const to = Math.min(total, d.page*d.pageSize);
  const nums = [];
  for (let p = 1; p <= pages; p++){
    if (p === 1 || p === pages || Math.abs(p - d.page) <= 1) nums.push(p);
    else if (nums[nums.length-1] !== '…') nums.push('…');
  }
  return `<div class="pager">
    <span class="pager__info">Showing <b>${from}–${to}</b> of <b>${total}</b> users</span>
    <span class="pager__size">Rows
      <select class="select" id="pageSize">
        ${[10,25,50].map(n=>`<option ${d.pageSize===n?'selected':''}>${n}</option>`).join('')}
      </select>
    </span>
    <span class="u-spacer"></span>
    <span class="pager__pages">
      <button class="pager__btn" data-page="${d.page-1}" ${d.page===1?'disabled':''} aria-label="Previous page">${svg('chevronL')}</button>
      ${nums.map(n => n === '…' ? `<span class="pager__gap">…</span>`
        : `<button class="pager__btn" data-page="${n}" aria-current="${n===d.page}">${n}</button>`).join('')}
      <button class="pager__btn" data-page="${d.page+1}" ${d.page===pages?'disabled':''} aria-label="Next page">${svg('chevronR')}</button>
    </span>
  </div>`;
}

function emptyState(){
  return `<div class="tablewrap"><div class="empty">
    <div class="empty__icon">${svg('search')}</div>
    <div class="empty__title">No users match these filters</div>
    <div class="empty__msg">Nothing in ${esc(PROPERTY.name)} matches the current search and filter combination. Try widening the status or sign-in filter.</div>
    <div class="empty__cta"><button class="btn btn--secondary" data-clear="all">${svg('rotate')}Clear all filters</button></div>
  </div></div>`;
}

function bulkBar(){
  const n = state.dir.selected.size;
  return `<div class="bulkbar">
    <span class="bulkbar__count">${n} selected</span>
    <span style="width:1px;height:20px;background:var(--border-active)"></span>
    ${can('admin.send_password_reset')?`<button class="btn btn--secondary btn--sm" data-bulk="reset">${svg('key')}Send reset</button>`:''}
    ${can('admin.deactivate_user')?`<button class="btn btn--secondary btn--sm" data-bulk="deactivate">${svg('slash')}Deactivate</button>`:''}
    <button class="btn btn--secondary btn--sm" data-bulk="export">${svg('download')}Export</button>
    <button class="icon-btn" data-bulk="clear" aria-label="Clear selection">${svg('x')}</button>
  </div>`;
}

function accessDeniedPanel(code){
  const p = permByCode(code);
  return `<div class="empty" style="min-height:56vh">
    <div class="empty__icon">${svg('lock')}</div>
    <div class="empty__title">You don’t have access to this page</div>
    <div class="empty__msg">Your role <b style="color:var(--text-secondary)">${esc(myRole().name)}</b> is missing the permission below. Ask an administrator to grant it in Roles &amp; Permissions.</div>
    <div style="margin-top:14px"><span class="badge badge--blue" style="height:26px;padding:0 12px;font-size:11.5px">${svg('shield')}&nbsp;${esc(p.display)}</span></div>
    <div class="empty__cta"><code class="code">${esc(code)}</code></div>
  </div>`;
}
