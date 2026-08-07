/* ═══════════════════════════════════════════════════════════════
   CRS — dummy dataset + inline-SVG avatar generator
   Field names mirror the AS-BUILT Bubble types on branch `test`:
     User      → employee · role · property · is_active · last_login ·
                 must_change_password · dark_theme · search_tokens · user_id · username
     Employee  → first_name · last_name · full_name · email · phone_number · photo ·
                 department · position · property · company · status · join_date
     Role      → name · is_default · is_super_admin · permissions · property
   Spec-only fields (two_fa_enabled, presence_status, is_anonymized) are marked SPEC.
   Tenant: Otium Group → Otium Casino (OTM), Batumi, Georgia.
═══════════════════════════════════════════════════════════════ */

/* ───────────────────────── Icons (Feather, stroke 1.7) ───────────────────────── */
const ICON = {
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  card:'<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  filetext:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  repeat:'<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  bookopen:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  checksquare:'<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  alerttriangle:'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  package:'<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  coffee:'<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
  gitmerge:'<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>',
  clipboard:'<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
  book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  video:'<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
  folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  trendingup:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  radio:'<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>',
  user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  usercheck:'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>',
  eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  userx:'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/>',
  eyeoff:'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
  globe:'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  userplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
  clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  alertoctagon:'<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  thumbsup:'<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>',
  dollar:'<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  volume:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>',
  message:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  /* UI */
  search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  chevronR:'<polyline points="9 18 15 12 9 6"/>',
  chevronL:'<polyline points="15 18 9 12 15 6"/>',
  chevronD:'<polyline points="6 9 12 15 18 9"/>',
  chevronU:'<polyline points="18 15 12 9 6 15"/>',
  arrowLeft:'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  more:'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
  edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  key:'<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  slash:'<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
  rotate:'<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  smartphone:'<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  tablet:'<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  list:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  columns:'<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"/>',
  moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  alertcircle:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  pin:'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',
  menu:'<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
  activity:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mappin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  shieldoff:'<path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"/><path d="M4.73 4.73 4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"/><line x1="1" y1="1" x2="23" y2="23"/>',
  sliders:'<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  wifioff:'<line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
};
const svg = (name, cls) =>
  `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON[name]||''}</svg>`;

/* ───────────────────────── Tenant ───────────────────────── */
const COMPANY  = { name:'Otium Group', legal_name:'Otium Group LLC' };
const PROPERTY = { name:'Otium Casino', code:'OTM', city:'Batumi', country:'Georgia', timezone:'Asia/Tbilisi' };

/* ───────────────────────── Modules (46 · 7 sections) ───────────────────────── */
const SECTIONS = ['Admin / Core','Operations','Surveillance','Guests','HR / Employees','Compliance','Communication'];
const MODULES = [
  ['casino_settings','Casino Settings','Admin / Core','settings','settings','live','Company + property identity, locale, currency and operating defaults.'],
  ['roles_permissions','Roles & Permissions','Admin / Core','roles','shield','live','Custom roles built from the fixed permission set, with a resource × action matrix.'],
  ['user_management','User Management','Admin / Core','users','users','live','Login accounts, authentication, sessions and the full user lifecycle.'],
  ['fiscal_week_mgmt','Fiscal Week Management','Admin / Core','fiscal-week','calendar','soon','Fiscal calendar, week open/close and gaming-day boundaries.'],
  ['subscription','Subscription & Tier','Admin / Core','subscription','card','roadmap','Plan, seats, billing and per-tier module gating.'],
  ['notifications','Notifications','Admin / Core','notifications','bell','roadmap','Per-event delivery preferences across in-app, email and push.'],
  ['activity_log','System Activity Log','Admin / Core','activity','filetext','roadmap','The single polymorphic audit trail for every tracked action.'],
  ['import_export','Import & Export','Admin / Core','import-export','repeat','roadmap','Bulk CSV in and out with validation and rollback.'],
  ['integrations','API & Integrations','Admin / Core','integrations','link','roadmap','API keys, webhooks and third-party system connections.'],
  ['contacts','Contacts','Admin / Core','contacts','bookopen','roadmap','Shared directory of external contacts, vendors and authorities.'],
  ['support_center','Support Center','Admin / Core','support','help','roadmap','In-product help, guides and support ticketing.'],

  ['dashboard','Dashboard','Operations','dashboard','grid','roadmap','Role-aware operational overview across every active module.'],
  ['reporting','Reporting','Operations','reports','filetext','soon','The core incident and operational report engine.'],
  ['task_management','Task Manager','Operations','tasks','checksquare','soon','Tasks, subtasks, assignment and follow-up across departments.'],
  ['rfi','Request for Investigation','Operations','rfi','mail','roadmap','Formal investigation requests routed to Surveillance.'],
  ['malfunction_log','Malfunction Log','Operations','malfunction','alerttriangle','roadmap','Equipment faults, downtime and resolution tracking.'],
  ['lost_found','Lost & Found','Operations','lost-and-found','package','roadmap','Found property intake, storage, claim and disposal.'],
  ['break_list','Break List','Operations','break-list','coffee','roadmap','Real-time pit break rotation and floor coverage.'],
  ['meetings','Meetings','Operations','meetings','calendar','roadmap','Agendas, attendance and minutes with action items.'],
  ['chain_of_command','Chain of Command','Operations','chain-of-command','gitmerge','roadmap','Escalation paths and on-duty command structure.'],

  ['daily_activity_log','Daily Activity Log','Surveillance','dal','clipboard','roadmap','Chronological shift log of everything observed on the floor.'],
  ['gaming_day_report','Gaming Day Report','Surveillance','gdr','book','roadmap','The 24-hour gaming-day summary handed to management.'],
  ['cctv_audits','CCTV Audits','Surveillance','cctv-audits','video','roadmap','Scheduled camera coverage and procedure audits.'],
  ['investigation_cases','Investigation Cases','Surveillance','investigations','folder','roadmap','Long-running cases with evidence, timeline and outcome.'],
  ['advantage_play_analyzer','Advantage Play Analyzer','Surveillance','advantage-play-analyzer','trendingup','roadmap','Pattern detection for advantage play and suspicious betting.'],
  ['alert_center','Alert Center','Surveillance','alerts','radio','roadmap','Operational alert routing and acknowledgement across the floor.'],

  ['guest_management','Guest Management','Guests','guests','user','roadmap','Guest records, visit history and linked incidents.'],
  ['visitor_management','Visitor Management','Guests','visitor-management','usercheck','roadmap','Non-guest visitor sign-in, badging and escort tracking.'],
  ['guest_watchlist','Guest Watchlist','Guests','guest-watchlist','eye','roadmap','Persons of interest flagged for heightened observation.'],
  ['guest_barring','Guest Barring','Guests','guest-barring','userx','roadmap','Exclusion orders, durations and enforcement records.'],
  ['guest_opportunist','Guest Opportunist List','Guests','guest-opportunist','eyeoff','roadmap','Known opportunists and their observed methods.'],
  ['blackbook_network','Blackbook Network','Guests','blackbook','globe','roadmap','Cross-property intelligence sharing on barred individuals.'],

  ['employee_management','Employee Management','HR / Employees','employees','users','soon','The employee master record — the PII source every module reads.'],
  ['job_board','Job Board','HR / Employees','job-board','briefcase','roadmap','Open positions, applications and hiring pipeline.'],
  ['onboarding','Onboarding','HR / Employees','onboarding','userplus','roadmap','New-hire checklists, documents and system provisioning.'],
  ['attendance','Attendance','HR / Employees','attendance','clock','roadmap','Clock in/out, lateness and absence tracking.'],
  ['scheduling','Scheduling','HR / Employees','scheduling','calendar','roadmap','Shift rosters, coverage and swap requests.'],
  ['leave_management','Leave Management','HR / Employees','leave','send','roadmap','Leave balances, requests and approval chains.'],
  ['disciplinary_actions','Disciplinary Actions','HR / Employees','disciplinary-actions','alertoctagon','roadmap','Warnings, hearings and sanction records.'],
  ['appraisals','Appraisals','HR / Employees','appraisals','thumbsup','roadmap','Performance reviews, goals and competency scoring.'],
  ['payroll','Payroll','HR / Employees','payroll','dollar','roadmap','Pay periods, adjustments and export to finance.'],

  ['policy_library','Policy Library','Compliance','policies','book','roadmap','Controlled policy documents with versioning and acknowledgement.'],
  ['house_rules','House Rules','Compliance','house-rules','home','roadmap','Published gaming house rules per game and table.'],
  ['sensitive_equipment','Sensitive Equipment','Compliance','sensitive-equipment','lock','roadmap','Custody and movement log for controlled equipment.'],

  ['info_board','Info Board','Communication','info-board','volume','roadmap','Property-wide announcements and shift-critical notices.'],
  ['intercom','Intercom','Communication','intercom','message','roadmap','Direct and group messaging between on-duty staff.'],
].map(([id,name,section,route,icon,status,desc]) => ({id,name,section,route,icon,status,desc}));

const STATUS_TAG = {
  live:    null,
  soon:    { cls:'soon',    label:'SOON' },
  roadmap: { cls:'roadmap', label:'ROADMAP' },
};

/* ───────────────────────── Permissions (Admin → User Management) ─────────────────────────
   `code` = spec v17 · `display` = the as-built OS - Permission label on branch `test`.   */
const PERMISSIONS = [
  { code:'admin.view_users',           display:'Users - View',            requires:null,                    destructive:false, desc:'See the user directory and open a user record.' },
  { code:'admin.create_user',          display:'Users - Create',          requires:'admin.view_users',      destructive:false, desc:'Create a login account for an existing employee.' },
  { code:'admin.edit_user',            display:'Users - Edit',            requires:'admin.view_users',      destructive:false, desc:'Edit a user’s email, property and account settings.' },
  { code:'admin.change_user_role',     display:'Users - Change Role',     requires:'admin.edit_user',       destructive:false, desc:'Assign a different role to a user.' },
  { code:'admin.deactivate_user',      display:'Users - Deactivate',      requires:'admin.edit_user',       destructive:false, desc:'Soft-disable an account and revoke its sessions.' },
  { code:'admin.reactivate_user',      display:'Users - Reactivate',      requires:'admin.edit_user',       destructive:false, desc:'Restore a deactivated account.' },
  { code:'admin.anonymize_user',       display:'Users - Anonymize',       requires:'admin.deactivate_user', destructive:true,  desc:'Irreversibly erase personal data under GDPR.' },
  { code:'admin.send_password_reset',  display:'Users - Reset Password',  requires:'admin.edit_user',       destructive:false, desc:'Send Bubble’s password-reset email to a user.' },
  { code:'admin.view_sessions',        display:'Users - View Sessions',   requires:'admin.view_users',      destructive:false, desc:'See a user’s active devices and login history.' },
  { code:'admin.revoke_sessions',      display:'Users - Revoke Sessions', requires:'admin.view_sessions',   destructive:false, desc:'Force a user to sign out of selected devices.' },
];

/* ───────────────────────── Roles ───────────────────────── */
const ROLES = [
  { id:'r_admin',    name:'Admin',                   level:100, is_default:true,  is_super_admin:true,
    permissions:PERMISSIONS.map(p=>p.code) },
  { id:'r_casmgr',   name:'Casino Manager',          level:90,  is_default:true,  is_super_admin:false,
    permissions:['admin.view_users','admin.view_sessions'] },
  { id:'r_hrmgr',    name:'HR Manager',              level:80,  is_default:true,  is_super_admin:false,
    permissions:['admin.view_users','admin.create_user','admin.edit_user','admin.deactivate_user','admin.reactivate_user','admin.send_password_reset'] },
  { id:'r_survmgr',  name:'Surveillance Manager',    level:70,  is_default:true,  is_super_admin:false,
    permissions:['admin.view_users'] },
  { id:'r_survsup',  name:'Surveillance Supervisor', level:60,  is_default:true,  is_super_admin:false,
    permissions:['admin.view_users'] },
  { id:'r_pitboss',  name:'Pit Boss',                level:50,  is_default:false, is_super_admin:false, permissions:[] },
  { id:'r_cage',     name:'Cage Supervisor',         level:50,  is_default:false, is_super_admin:false, permissions:[] },
  { id:'r_seclead',  name:'Security Lead',           level:45,  is_default:false, is_super_admin:false, permissions:[] },
  { id:'r_operator', name:'Operator',                level:20,  is_default:true,  is_super_admin:false, permissions:[] },
  { id:'r_readonly', name:'Read Only',               level:10,  is_default:false, is_super_admin:false, permissions:[] },
];
const roleById = id => ROLES.find(r => r.id === id);

const DEPARTMENTS = ['Surveillance','Table Games','Slots','Cage & Credit','Security','Food & Beverage','Hotel Operations','Marketing','Finance','Human Resources','IT','Facilities','Compliance'];

/* ───────────────────────── People ─────────────────────────
   [first, last, gender, department, position, roleId, presence, daysSinceLogin,
    is_active, must_change_password, two_fa(SPEC), anonymized(SPEC)]                 */
const PEOPLE = [
  ['Giorgi','Beridze','m','Surveillance','Surveillance Manager','r_survmgr','online',0,1,0,1,0],
  ['Nino','Kapanadze','f','Human Resources','HR Manager','r_hrmgr','online',0,1,0,1,0],
  ['Levan','Gelashvili','m','Surveillance','Surveillance Supervisor','r_survsup','away',0,1,0,0,0],
  ['Tamar','Maisuradze','f','Table Games','Pit Boss','r_pitboss','online',0,1,0,0,0],
  ['Davit','Giorgadze','m','IT','System Administrator','r_admin','online',0,1,0,1,0],
  ['Mariam','Lomidze','f','Cage & Credit','Cage Supervisor','r_cage','busy',1,1,0,0,0],
  ['Irakli','Tsiklauri','m','Security','Security Shift Lead','r_seclead','offline',2,1,0,0,0],
  ['Ana','Nadiradze','f','Surveillance','Surveillance Operator','r_operator','online',0,1,0,0,0],
  ['Nika','Chkheidze','m','Surveillance','Surveillance Operator','r_operator','offline',3,1,0,0,0],
  ['Salome','Javakhishvili','f','Marketing','Marketing Executive','r_operator','away',1,1,0,0,0],
  ['Zurab','Kvaratskhelia','m','Table Games','Floor Supervisor','r_pitboss','online',0,1,0,0,0],
  ['Ketevan','Mamardashvili','f','Finance','Financial Controller','r_casmgr','offline',4,1,0,1,0],
  ['Beka','Abashidze','m','Slots','Slot Technician','r_operator','busy',0,1,0,0,0],
  ['Elene','Tsereteli','f','Human Resources','HR Officer','r_hrmgr','online',0,1,0,0,0],
  ['Vakhtang','Dolidze','m','Compliance','Compliance Officer','r_readonly','offline',6,1,0,0,0],
  ['Natia','Bakhtadze','f','Cage & Credit','Cashier','r_operator','online',0,1,1,0,0],
  ['Sandro','Chikovani','m','Security','Security Officer','r_operator','offline',9,1,0,0,0],
  ['Tinatin','Gogoladze','f','Food & Beverage','F&B Supervisor','r_operator','away',2,1,0,0,0],
  ['Lasha','Kobakhidze','m','Table Games','Dealer','r_operator','offline',12,1,1,0,0],
  ['Mari','Meskhi','f','Hotel Operations','Front Desk Agent','r_operator','online',0,1,0,0,0],
  ['Guram','Shengelia','m','Slots','Slot Attendant','r_operator','offline',5,1,0,0,0],
  ['Sopho','Tabidze','f','Surveillance','Surveillance Operator','r_operator','busy',0,1,0,0,0],
  ['Dato','Ugrekhelidze','m','Facilities','Maintenance Technician','r_operator','offline',15,1,0,0,0],
  ['Nana','Vashadze','f','Finance','Accountant','r_readonly','away',1,1,0,0,0],
  ['Rezo','Zhvania','m','Table Games','Dealer','r_operator','offline',21,0,0,0,0],
  ['Eka','Akhalaia','f','Marketing','Marketing Executive','r_operator','offline',34,0,0,0,0],
  ['Temur','Bochorishvili','m','Security','Security Officer','r_operator','offline',48,0,0,0,0],
  ['Lika','Chanturia','f','Food & Beverage','Bartender','r_operator','offline',7,1,1,0,0],
  ['Otar','Datunashvili','m','Compliance','AML Officer','r_readonly','offline',3,1,0,1,0],
  ['Maia','Elizbarashvili','f','Hotel Operations','Front Desk Agent','r_operator','online',0,1,0,0,0],
  ['Giga','Khurtsilava','m','Surveillance','Surveillance Operator','r_operator','online',0,1,0,0,0],
  ['Nutsa','Gvaramia','f','Table Games','Dealer','r_operator','away',1,1,0,0,0],
  ['Shota','Nozadze','m','Slots','Slot Technician','r_operator','offline',11,1,0,0,0],
  ['Khatia','Peradze','f','Cage & Credit','Cashier','r_operator','offline',2,1,0,0,0],
  ['Ilia','Rurua','m','IT','IT Support','r_operator','online',0,1,0,1,0],
  ['Teona','Sichinava','f','Human Resources','HR Officer','r_operator','offline',4,1,0,0,0],
  ['Archil','Tkeshelashvili','m','Table Games','Pit Boss','r_pitboss','busy',0,1,0,0,0],
  ['Anano','Chubinidze','f','Marketing','Marketing Executive','r_operator','offline',18,0,0,0,0],
  ['Vano','Gabunia','m','Security','Security Officer','r_operator','offline',6,1,0,0,0],
  ['Gvantsa','Iashvili','f','Food & Beverage','Waiter','r_operator','offline',-1,1,1,0,0],
  ['Zaza','Kiknadze','m','Facilities','Maintenance Technician','r_operator','offline',-1,1,1,0,0],
  ['Rusudan','Lolashvili','f','Finance','Accountant','r_readonly','offline',13,1,0,0,0],
  ['Koba','Mgeladze','m','Table Games','Dealer','r_operator','offline',26,0,0,0,0],
  ['Tako','Ninidze','f','Hotel Operations','Front Desk Agent','r_operator','away',1,1,0,0,0],
  ['Luka','Oniani','m','Surveillance','Surveillance Operator','r_operator','offline',8,1,0,0,0],
  ['Manana','Pkhaladze','f','Compliance','Compliance Officer','r_readonly','offline',60,0,0,0,1],
  ['Paata','Robakidze','m','Slots','Slot Attendant','r_operator','offline',90,0,0,0,1],
];

/* ───────────────────────── Avatar generator (deterministic, offline) ───────────────────────── */
const SKIN   = ['#F2C6A0','#E8B48C','#D9A176','#C68A63','#A9714E','#8A583B','#F7D7BC'];
const HAIRC  = ['#2B2118','#3E2C1E','#5A3B24','#8A5A2B','#A9762F','#1B1B1F','#6E6259','#B08D57'];
const SHIRT  = ['#2F3B52','#37414F','#243447','#3A3F4B','#2C4A63','#42364A','#334A3E','#4A3A36'];
const BGC    = ['#3B82F6','#8B5CF6','#06B6D4','#22C55E','#F59E0B','#EF4444','#6366F1','#14B8A6'];

function hash(str){ let h=2166136261; for(let i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619); } return Math.abs(h); }
const pick = (arr,n) => arr[n % arr.length];

/* Six hair shapes drawn over a 64×64 head at cx 32, cy 26, r 13.5 */
const HAIR = [
  s=>`<path d="M18.5 25c0-8 6-13 13.5-13S45.5 17 45.5 25c0-2.4-2-4-4.2-3.2-3.2 1.2-6 1.6-9.3 1.6s-6.1-.4-9.3-1.6C20.5 21 18.5 22.6 18.5 25z" fill="${s}"/>`,
  s=>`<path d="M18.3 27.5C17 16.8 24 11.5 32 11.5s15 5.3 13.7 16c-.5-4.6-1.4-7-3.2-8.6-2.6 2.6-7 3.6-10.5 3.6s-7.9-1-10.5-3.6c-1.8 1.6-2.7 4-3.2 8.6z" fill="${s}"/>`,
  s=>`<path d="M19 26c-1-9 5-15 13-15s14 6 13 15c-.6-3-1.6-5.6-3.2-7.2-1.8 1.6-4.4 2.2-6.4 1.4-1.6-.6-2.4-2-2.6-3.4-2.6 3.4-7.6 5-11.4 4.6-1.4 1.4-2 3-2.4 4.6z" fill="${s}"/><path d="M17.6 26.6c-1.4 5.4-.6 10.4 1.2 13.4-2.6-4.4-3-9.4-1.2-13.4z" fill="${s}"/>`,
  s=>`<path d="M20 24.5c0-7.2 5.4-12 12-12s12 4.8 12 12c0-3.2-1.6-5.2-4-5.8-2.4-.6-5-.2-8-.2s-5.6-.4-8 .2c-2.4.6-4 2.6-4 5.8z" fill="${s}"/><path d="M20.4 23c-2.6 1.6-3.6 5-3 8.6.6 3.6 2.2 6 3.4 7-2-4-2.4-11-.4-15.6zM43.6 23c2.6 1.6 3.6 5 3 8.6-.6 3.6-2.2 6-3.4 7 2-4 2.4-11 .4-15.6z" fill="${s}"/>`,
  s=>`<path d="M19.5 24c1-8 6.5-12.5 12.5-12.5S43.5 16 44.5 24c-1.2-2.6-3-4.2-5.4-4.8-3-.8-5.4.6-7.1.6s-4.1-1.4-7.1-.6c-2.4.6-4.2 2.2-5.4 4.8z" fill="${s}"/>`,
  s=>`<path d="M21 23.5c1.4-7 5.8-11 11-11s9.6 4 11 11c-1-2-2.6-3.2-4.6-3.4-2-.2-3.4.6-6.4.6s-4.4-.8-6.4-.6c-2 .2-3.6 1.4-4.6 3.4z" fill="${s}"/>`,
];

/**
 * Deterministic flat-illustration portrait. Fully inline — no network, works over file://
 * @param {string} seed  stable per person (we use employee id)
 * @param {number} px    rendered size
 */
function avatarSVG(seed, px){
  const h = hash(seed);
  const skin = pick(SKIN, h), hairc = pick(HAIRC, h>>3), shirt = pick(SHIRT, h>>6), bg = pick(BGC, h>>9);
  const hair = HAIR[(h>>12) % HAIR.length];
  const glasses = (h>>15) % 5 === 0;
  const beard   = (h>>17) % 6 === 0;
  return `<svg viewBox="0 0 64 64" width="${px}" height="${px}" role="img" aria-hidden="true">
<defs><clipPath id="c${h%99991}"><circle cx="32" cy="32" r="32"/></clipPath></defs>
<g clip-path="url(#c${h%99991})">
  <rect width="64" height="64" fill="${bg}" opacity=".22"/>
  <circle cx="32" cy="32" r="32" fill="${bg}" opacity=".1"/>
  <path d="M32 42c10.5 0 19 6.6 19 14.8V64H13v-7.2C13 48.6 21.5 42 32 42z" fill="${shirt}"/>
  <path d="M27 38h10v9c0 2.8-2.2 4.6-5 4.6S27 49.8 27 47z" fill="${skin}"/>
  <ellipse cx="32" cy="27" rx="13" ry="13.8" fill="${skin}"/>
  ${beard?`<path d="M20.5 27c0 8 5 14 11.5 14s11.5-6 11.5-14c0 5-1 8-2.4 9.6-2.4-1.6-5.6-2.4-9.1-2.4s-6.7.8-9.1 2.4C21.5 35 20.5 32 20.5 27z" fill="${hairc}" opacity=".85"/>`:''}
  ${hair(hairc)}
  <ellipse cx="26.6" cy="27.4" rx="1.5" ry="1.9" fill="#2A2A31"/>
  <ellipse cx="37.4" cy="27.4" rx="1.5" ry="1.9" fill="#2A2A31"/>
  <path d="M28.8 33.6c1.9 1.5 4.5 1.5 6.4 0" stroke="#2A2A31" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".75"/>
  ${glasses?`<g stroke="#2A2A31" stroke-width="1.3" fill="none" opacity=".8"><circle cx="26.6" cy="27.4" r="4.3"/><circle cx="37.4" cy="27.4" r="4.3"/><path d="M30.9 27.4h2.2M22.3 26.4l-2.4.6M41.7 26.4l2.4.6"/></g>`:''}
</g></svg>`;
}

const initialsOf = p => (p.first_name[0] + p.last_name[0]).toUpperCase();

/* ───────────────────────── Build employees + users ───────────────────────── */
const DAY = 86400000;
const NOW = new Date('2026-08-07T11:20:00');
const iso = d => new Date(d).toISOString();

const EMPLOYEES = [], USERS = [];

PEOPLE.forEach((p, i) => {
  const [first,last,gender,dept,position,roleId,presence,sinceLogin,active,mustChange,twofa,anon] = p;
  const eid = 'e' + String(i+1).padStart(3,'0');
  const uid = 'u' + String(i+1).padStart(3,'0');
  const seed = hash(first+last+eid);
  const emailLocal = (first + '.' + last).toLowerCase().replace(/[^a-z.]/g,'');

  EMPLOYEES.push({
    _id:eid, first_name:first, last_name:last, full_name:first+' '+last,
    email: emailLocal + '@otiumcasino.ge',
    phone_number: '+995 5' + String(70 + (seed % 30)) + ' ' + String(100000 + (seed % 899999)),
    photo: true, gender,
    department: dept, position,
    property: PROPERTY.name, company: COMPANY.name,
    status: active ? 'Active' : 'Inactive',
    join_date: iso(NOW - (400 + (seed % 1500)) * DAY),
    employee_number: 'OTM-' + String(1000 + i*7 + (seed%9)),
    national_id_number: String(10000000000 + (seed % 89999999999)),
    date_of_birth: iso(NOW - (7500 + (seed % 8000)) * DAY),
    ec_name: null, ec_phone_number: null,
    has_user: true,
  });

  USERS.push({
    _id:uid, employee:eid,
    username: emailLocal + '@otiumcasino.ge',              // login email
    user_id: 'OTM-U-' + String(1000 + i),
    role: roleId,
    property: PROPERTY.name, company: COMPANY.name,        // company = spec (NOT on the live DT yet)
    is_active: !!active,
    must_change_password: !!mustChange,
    last_login: sinceLogin < 0 ? null
              : iso(NOW - sinceLogin*DAY - ((seed % 9) * 3600000)),
    last_password_change: iso(NOW - (20 + (seed % 260)) * DAY),
    deactivated_date: active ? null : iso(NOW - (5 + (seed % 90)) * DAY),
    dark_theme: true,
    created_date: iso(NOW - (30 + (seed % 900)) * DAY),
    created_by: i === 0 ? null : 'u005',
    extra_permissions: [],                                  // SPEC — per-user overrides
    two_fa_enabled: !!twofa,                                // SPEC
    presence_status: active ? presence : 'offline',         // SPEC
    is_anonymized: !!anon,                                  // SPEC
    anonymized_date: anon ? iso(NOW - (2 + (seed%40))*DAY) : null,
    anonymized_by: anon ? 'u005' : null,
    anonymize_reason: anon ? 'GDPR erasure request received from data subject.' : null,
    search_tokens: (first+' '+last+' '+emailLocal+' '+dept+' '+position).toLowerCase(),
  });
});

/* Two per-user permission overrides so the Permissions tab has something real to show */
USERS.find(u=>u._id==='u003').extra_permissions = ['admin.send_password_reset'];
USERS.find(u=>u._id==='u011').extra_permissions = ['admin.view_users','admin.view_sessions'];

/* Anonymized users lose their PII on the Employee record (spec §Anonymize step 2) */
USERS.filter(u=>u.is_anonymized).forEach(u => {
  const e = EMPLOYEES.find(e=>e._id===u.employee);
  e.first_name='Anonymized'; e.last_name='User'; e.full_name='Anonymized User';
  e.email=null; e.phone_number=null; e.photo=false;
  e.national_id_number=null; e.date_of_birth=null;
  u.username = 'anonymized-' + u._id + '@deleted.crs.app';
});

/* Three unlinked employees — the Create-User picker may only offer these */
[['Sopiko','Turmanidze','f','Table Games','Dealer'],
 ['Merab','Gorgadze','m','Security','Security Officer'],
 ['Tea','Chavchavadze','f','Slots','Slot Attendant']].forEach(([f,l,g,d,pos],i)=>{
  const eid='e9'+String(i+1).padStart(2,'0'), seed=hash(f+l+eid);
  EMPLOYEES.push({
    _id:eid, first_name:f, last_name:l, full_name:f+' '+l,
    email:(f+'.'+l).toLowerCase()+'@otiumcasino.ge',
    phone_number:'+995 5'+String(70+(seed%30))+' '+String(100000+(seed%899999)),
    photo:true, gender:g, department:d, position:pos,
    property:PROPERTY.name, company:COMPANY.name, status:'Active',
    join_date: iso(NOW - (10 + (seed % 40)) * DAY),
    employee_number:'OTM-'+String(2100+i),
    national_id_number:String(10000000000+(seed%89999999999)),
    date_of_birth: iso(NOW - (8000 + (seed % 6000)) * DAY),
    has_user:false,
  });
});

const empById  = id => EMPLOYEES.find(e => e._id === id);
const userById = id => USERS.find(u => u._id === id);

/* ───────────────────────── Sessions ───────────────────────── */
const DEVICES = [
  ['Desktop','monitor','Chrome 141 · Windows 11','10.20.4.'],
  ['Desktop','monitor','Edge 141 · Windows 11','10.20.4.'],
  ['Mobile','smartphone','Safari 19 · iOS 19','10.20.9.'],
  ['Tablet','tablet','Chrome 141 · iPadOS 19','10.20.9.'],
];
const SESSIONS = [];
USERS.filter(u=>u.is_active && u.last_login).forEach((u,i)=>{
  const seed = hash(u._id);
  const n = (seed % 3) + 1;
  for(let k=0;k<n;k++){
    const d = DEVICES[(seed+k) % DEVICES.length];
    const loginAgo = (k===0 ? (seed%4) : (2 + (seed+k)%20));
    SESSIONS.push({
      _id:'s'+u._id+'-'+k, user:u._id,
      device_type:d[0], icon:d[1], user_agent:d[2],
      ip_address:d[3] + (10 + ((seed+k) % 240)),
      location: PROPERTY.city + ', ' + PROPERTY.country,
      login_date: iso(NOW - loginAgo*DAY - ((seed%20)*3600000)),
      last_seen:  iso(NOW - (k===0 ? (seed%50)*60000 : loginAgo*DAY)),
      expires_date: iso(NOW + (30 - loginAgo)*DAY),
      status: 'Active',
      current: k===0 && u._id==='u005',
    });
  }
});

/* ───────────────────────── Activity log ───────────────────────── */
const ACTION_META = {
  user_created:        { label:'Account created',            tone:'ok',   icon:'userplus' },
  user_deactivated:    { label:'Account deactivated',        tone:'warn', icon:'slash' },
  user_reactivated:    { label:'Account reactivated',        tone:'ok',   icon:'rotate' },
  user_anonymized:     { label:'Account anonymized (GDPR)',  tone:'err',  icon:'shieldoff' },
  role_assigned:       { label:'Role changed',               tone:'',     icon:'shield' },
  password_reset_sent: { label:'Password reset sent',        tone:'',     icon:'key' },
  password_changed:    { label:'Password changed',           tone:'ok',   icon:'key' },
  login_success:       { label:'Signed in',                  tone:'',     icon:'logout' },
  login_failed:        { label:'Failed sign-in attempt',     tone:'err',  icon:'alertcircle' },
  session_revoked:     { label:'Session revoked',            tone:'warn', icon:'wifioff' },
  two_fa_enabled:      { label:'Two-factor enabled',         tone:'ok',   icon:'lock' },
  permission_granted:  { label:'Extra permission granted',   tone:'',     icon:'plus' },
};
const ACTIVITY = [];
let actSeq = 0;
function logEntry(subject, action, detail, agoMin, actor){
  ACTIVITY.push({ _id:'a'+(++actSeq), subject_type:'User', subject_id:subject,
                  action, detail, actor: actor||'u005', date: iso(NOW - agoMin*60000) });
}
USERS.forEach((u,i)=>{
  const seed = hash(u._id+'act');
  logEntry(u._id,'user_created','Created from employee record · role “'+roleById(u.role).name+'”', 1440*(30+(seed%800)), i===0?null:'u005');
  if(u.last_login) logEntry(u._id,'login_success','Chrome 141 · Windows 11', (seed%9)*60 + 30, u._id);
  if(seed % 4 === 0) logEntry(u._id,'role_assigned','Role set to “'+roleById(u.role).name+'”', 1440*(3+(seed%40)));
  if(seed % 5 === 0) logEntry(u._id,'password_reset_sent','Reset email sent to '+u.username, 1440*(1+(seed%20)));
  if(seed % 7 === 0) logEntry(u._id,'login_failed','3 of 5 attempts · 10.20.4.'+(seed%200), (seed%600)+45, u._id);
  if(u.two_fa_enabled) logEntry(u._id,'two_fa_enabled','TOTP · 10 backup codes issued', 1440*(10+(seed%120)), u._id);
  if(!u.is_active) logEntry(u._id,'user_deactivated','Reason: left the company', 1440*(5+(seed%80)));
  if(u.is_anonymized) logEntry(u._id,'user_anonymized','GDPR erasure · Employee PII scrubbed', 1440*(2+(seed%40)));
  if(u.extra_permissions.length) logEntry(u._id,'permission_granted',u.extra_permissions.join(', '), 1440*(2+(seed%30)));
});
ACTIVITY.sort((a,b) => new Date(b.date) - new Date(a.date));

/* ───────────────────────── Formatting helpers ───────────────────────── */
function relTime(dateStr){
  if(!dateStr) return 'Never';
  const diff = NOW - new Date(dateStr);
  const m = Math.round(diff/60000), h = Math.round(diff/3600000), d = Math.round(diff/DAY);
  if(m < 1)  return 'Just now';
  if(m < 60) return m + ' min ago';
  if(h < 24) return h + (h===1?' hour ago':' hours ago');
  if(d < 30) return d + (d===1?' day ago':' days ago');
  if(d < 365) return Math.round(d/30) + ' mo ago';
  return Math.round(d/365) + ' yr ago';
}
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(s){ if(!s) return '—'; const d=new Date(s); return d.getDate()+' '+MON[d.getMonth()]+' '+d.getFullYear(); }
function fmtDateTime(s){ if(!s) return '—'; const d=new Date(s);
  return fmtDate(s)+', '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const PRESENCE = {
  online:  { label:'Online',  color:'#6DD5A1' },
  away:    { label:'Away',    color:'#DFBE6C' },
  busy:    { label:'Busy',    color:'#F07D7D' },
  offline: { label:'Offline', color:'#565656' },
};
