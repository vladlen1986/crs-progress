const fs = require('fs');
const path = require('path');

const TZ = 4 * 3600 * 1000;                    // Asia/Tbilisi, no DST
const CUTOFF = Date.UTC(2026, 7, 1) - TZ;      // 2026-08-01 00:00 local, exclusive
const OUT = path.join(__dirname, 'LG_active_employee_report_links_to_2026-07-31.csv');

const load = n => JSON.parse(fs.readFileSync(path.join(__dirname, n), 'utf8'));
const byId = (arr, f) => Object.fromEntries(arr.map(x => [x._id, x[f]]));

const employees = load('employees.json');
const links = load('links.json');
const reports = load('reports.json');

const EMP = Object.fromEntries(employees.map(e => [e._id, e]));
const REP = Object.fromEntries(reports.map(r => [r._id, r]));
const GROUP = byId(load('lk_report_group.json'), 'short_name_text');
const NATURE = byId(load('lk_report_type.json'), 'report_type_name_text');
const GAME = byId(load('lk_game_type.json'), 'name_text');
const LOC = byId(load('lk_location.json'), 'name_text');
const ESTAT = byId(load('lk_event_status.json'), 'name_text');

const optMap = n => {
  const v = JSON.parse(fs.readFileSync(
    'C:\\Users\\CCTV Mgr\\projects\\crs-bubble\\casinoreportingsystem\\test\\option_sets\\' + n + '\\option-set.json', 'utf8')).values;
  return Object.fromEntries(Object.values(v).map(o => [o.db_value, o.display]));
};
const ASSIGN = optMap('employee_assignment_options');
const SEV = optMap('report_severity_level');
const RSTAT = optMap('report_status');
const ESTATUS = optMap('employee_status');

const fmtDate = ms => (ms == null ? '' : new Date(ms + TZ).toISOString().slice(0, 10));
const num = v => (typeof v === 'number' && isFinite(v) ? String(Math.round(v * 100) / 100) : '0');
const esc = s => {
  s = s == null ? '' : String(s);
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};

const HEAD = ['Employee', 'Employee Status', 'Employee Assignment', 'Report Number', 'Report Group',
  'Report Nature/Type', 'Initiator', 'Event Date', 'Report Created Date', 'Game Type', 'Event Location',
  'Severity', 'Event Status', 'Report Status', 'Amount Total', 'Amount Recovered', 'Amount Unrecovered',
  'Amount Repaid', 'Amount Unpaid', 'Prevented Overpayment', 'Prevented Underpayment', 'Financial Impact'];

const stats = { after: 0, noDate: 0, fallback: 0, noRep: 0, gel: new Set(), nonAscii: 0 };
const GEL = '1661970086848x998714365618159600';
const rows = [];

for (const l of links) {
  const r = REP[l.report_custom_genarated_report];
  const e = EMP[l.employee_custom_employee];
  if (!r || !e) { stats.noRep++; continue; }

  let ev = r.event_date___time_date;
  if (ev == null) { ev = r.gaming_date_date; if (ev != null) stats.fallback++; }
  if (ev == null) { stats.noDate++; continue; }
  if (ev >= CUTOFF) { stats.after++; continue; }
  if (r.currency_custom_report_currency === GEL) stats.gel.add(r.number_as_text_text);

  const name = e.full_name_text || [e.name_text, e.surname_text].filter(Boolean).join(' ');
  if (/[^\x00-\x7F]/.test(name)) stats.nonAscii++;

  rows.push([
    name,
    ESTATUS[e.status_option_employee_status] || '',
    ASSIGN[l.employee_assignment_option_employee_assignment_options] || '',
    r.number_as_text_text || '',
    GROUP[r.report_type_custom_report_group] || '',
    NATURE[r.nature_type_custom_report_type] || '',
    'Yes',
    fmtDate(ev),
    fmtDate(r['Created Date']),
    GAME[r.game_type_custom_game_type] || '',
    LOC[r.event_location_custom_location] || '',
    SEV[r.severity_level_option_report_severity_level] || '',
    ESTAT[r.event_status_custom_event_status] || '',
    RSTAT[r.status_option_report_status] || '',
    num(r.event_amount_number),
    num(r.amount_recovered_number),
    num(r.amount_unrecovered_number),
    num(r.amount_repaid_number),
    num(r.amount_unpaid_number),
    num(r.prevented_overpayment_number),
    num(r.prevented_underpayment_number),
    num(r.event_loss___benefit_number),
  ]);
}

rows.sort((a, b) => (a[7] < b[7] ? -1 : a[7] > b[7] ? 1 : 0) || (a[3] < b[3] ? -1 : 1));
fs.writeFileSync(OUT, [HEAD, ...rows].map(r => r.map(esc).join(',')).join('\r\n') + '\r\n', 'utf8');

console.log(`rows written: ${rows.length}`);
console.log(`excluded - after 2026-07-31: ${stats.after}, no date at all: ${stats.noDate}, missing report/employee: ${stats.noRep}`);
console.log(`event_date fell back to gaming_date: ${stats.fallback}`);
console.log(`GEL-tagged reports present: ${stats.gel.size} -> ${[...stats.gel].join(', ')}`);
console.log(`non-ASCII employee names: ${stats.nonAscii}`);
const yrs = {};
rows.forEach(r => { yrs[r[7].slice(0, 4)] = (yrs[r[7].slice(0, 4)] || 0) + 1; });
console.log('rows by year:', JSON.stringify(yrs));
console.log('distinct employees:', new Set(rows.map(r => r[0])).size, ' distinct reports:', new Set(rows.map(r => r[3])).size);
