const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUT = __dirname;
const WS = 'C:\\Users\\CCTV Mgr\\projects\\crs-bubble\\casinoreportingsystem\\test';
const LIVE_GAME = '1665115662238x870826836139704300';

const q = a => (/ /.test(a) ? '"' + a + '"' : a);

function bp(args) {
  const out = execSync('buildprint ' + args.map(q).join(' '), {
    encoding: 'utf8',
    maxBuffer: 1 << 28,
    cwd: WS,
  });
  return JSON.parse(out);
}

function search(type, constraints) {
  const all = [];
  const n = 400;
  let from = 0;
  for (;;) {
    const args = ['data', 'search', type, '--version', 'live', '--json',
      '--sort', 'sort_on_id=true', '--n', String(n), '--from', String(from)];
    for (const c of constraints) args.push('--constraint', c);
    const resp = bp(args).responses[0];
    const hits = resp.hits.hits.map(h => h._source);
    all.push(...hits);
    process.stderr.write(`  ${type} ${all.length}\n`);
    if (resp.at_end || hits.length < n) break;
    from += n;
  }
  return all;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function save(name, data) {
  fs.writeFileSync(path.join(OUT, name), JSON.stringify(data));
  console.log(`${name}: ${Array.isArray(data) ? data.length : '?'}`);
}

// 1. Active Live Game employees
const employees = search('employee', [
  `field=employee_department_custom_casino_department1 op=equals value=${LIVE_GAME}`,
  'field=status_option_employee_status op=equals value=active',
]);
save('employees.json', employees);

// 2. Initiator links for those employees
const empIds = employees.map(e => e._id);
let links = [];
for (const g of chunk(empIds, 40)) {
  links = links.concat(search('report_employee_link', [
    'field=initiator_status_option_employee_initiator0 op=equals value=yes',
    `field=employee_custom_employee op=in value=${g.join(',')}`,
  ]));
}
save('links.json', links);

// 3. Reports referenced by those links
const reportIds = [...new Set(links.map(l => l.report_custom_genarated_report).filter(Boolean))];
console.log(`distinct reports: ${reportIds.length}`);
let reports = [];
for (const g of chunk(reportIds, 100)) {
  reports = reports.concat(search('genarated_report', [`field=_id op=in value=${g.join(',')}`]));
}
save('reports.json', reports);

// 4. Lookup tables
for (const t of ['report_group', 'report_type', 'game_type', 'location',
  'event_status', 'report_currency', 'report_event_location', 'casino_department1']) {
  save(`lk_${t}.json`, search(t, []));
}
