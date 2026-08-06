const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const WS = 'C:\\Users\\CCTV Mgr\\projects\\crs-bubble\\casinoreportingsystem\\test';
const q = a => (/ /.test(a) ? '"' + a + '"' : a);
const bp = args => JSON.parse(execSync('buildprint ' + args.map(q).join(' '), {
  encoding: 'utf8', maxBuffer: 1 << 28, cwd: WS,
}));

function search(type) {
  const all = [];
  const n = 400;
  for (let from = 0; ; from += n) {
    const resp = bp(['data', 'search', type, '--version', 'live', '--json',
      '--sort', 'sort_on_id=true', '--n', String(n), '--from', String(from)]).responses[0];
    const hits = resp.hits.hits.map(h => h._source);
    all.push(...hits);
    if (resp.at_end || hits.length < n) break;
  }
  return all;
}

for (const t of ['report_event_location', 'casino_department1']) {
  const d = search(t);
  fs.writeFileSync(path.join(__dirname, `lk_${t}.json`), JSON.stringify(d));
  console.log(`lk_${t}.json: ${d.length}`);
}
