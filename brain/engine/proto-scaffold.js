#!/usr/bin/env node
/*
 * brain/engine/proto-scaffold.js — "New prototype" scaffold generator.
 *
 * The token block is the CRS-design-system.md §2.10 css fence, injected
 * BYTE-VERBATIM between markers (assembled by script, never retyped) — the
 * acceptance diff and the mapping pass's stale-token check both hold against
 * it by construction. Everything else in the shell is var()-only: zero color
 * literals, zero radius literals, so a fresh scaffold maps clean.
 *
 * Templates are built ONLY from design-system component patterns:
 *   blank · cards (§20.4 KPI tiles) · form (§2/§14 inputs + buttons) ·
 *   table (§20.6 tables & lists).
 */
'use strict';
const inventory = require('./style-inventory.js');

const MARK_BEGIN = '/* §2.10 BEGIN (verbatim) */';
const MARK_END = '/* §2.10 END */';

const SHELL_CSS = `
/* shell — var() only, zero literals */
*{box-sizing:border-box}
html{background:var(--bg-primary);color:var(--text-secondary);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;-webkit-font-smoothing:antialiased}
body{margin:0;min-height:100vh}
.proto-head{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid var(--border-default);background:var(--bg-secondary)}
.proto-head h1{font-size:15px;font-weight:700;color:var(--text-primary);margin:0;letter-spacing:-0.02em;flex:1}
.theme-toggle{background:var(--bg-tertiary);border:1px solid var(--border-default);color:var(--text-secondary);border-radius:var(--radius-btn);padding:6px 12px;font:inherit;font-size:12px;font-weight:600;cursor:pointer}
.theme-toggle:hover{color:var(--text-primary);border-color:var(--border-hover)}
.stage{padding:28px 20px;max-width:960px;margin:0 auto}
`;

const TEMPLATES = {
  blank: { css: '', body: '<!-- empty stage — design here -->' },
  cards: {
    css: `
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px}
.tile{background:var(--bg-secondary);border:1px solid var(--border-default);border-radius:var(--radius-card);padding:16px}
.tile:hover{border-color:var(--border-hover)}
.tile .v{font-family:'JetBrains Mono',ui-monospace,monospace;font-variant-numeric:tabular-nums;font-size:24px;font-weight:700;color:var(--text-primary);line-height:1}
.tile .k{color:var(--text-muted);font-size:11px;margin-top:8px;text-transform:uppercase;letter-spacing:0.06em;font-weight:600}
.tile .d{color:var(--success);font-size:11px;margin-top:6px}`,
    body: `<div class="grid">
    <div class="tile"><div class="v">128</div><div class="k">Sample metric</div><div class="d">+12 vs last week</div></div>
    <div class="tile"><div class="v">96%</div><div class="k">Another metric</div><div class="d">+2.1%</div></div>
    <div class="tile"><div class="v">7</div><div class="k">Third metric</div></div>
  </div>`,
  },
  form: {
    css: `
.panel{background:var(--bg-secondary);border:1px solid var(--border-default);border-radius:var(--radius-card);padding:22px;max-width:420px}
.panel h2{font-size:14px;color:var(--text-primary);margin:0 0 16px;font-weight:700}
.field{margin-bottom:14px}
.field label{display:block;font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;font-weight:600;margin-bottom:6px}
.field input{width:100%;background:var(--bg-tertiary);border:1px solid var(--input-border);color:var(--text-primary);border-radius:var(--radius-input);padding:9px 11px;font:inherit;outline:none}
.field input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow)}
.btnrow{display:flex;gap:8px;margin-top:18px}
.btn-primary{background:var(--accent);border:none;color:var(--white);border-radius:var(--radius-btn);padding:9px 16px;font:inherit;font-weight:700;cursor:pointer}
.btn-primary:hover{background:var(--accent-hover)}
.btn-primary:active{background:var(--accent-active)}
.btn-secondary{background:var(--transparent);border:1px solid var(--border-active);color:var(--text-secondary);border-radius:var(--radius-btn);padding:9px 16px;font:inherit;font-weight:600;cursor:pointer}
.btn-secondary:hover{background:var(--bg-tertiary);color:var(--text-primary)}`,
    body: `<div class="panel">
    <h2>Sample form</h2>
    <div class="field"><label>Name</label><input placeholder="Value…"></div>
    <div class="field"><label>Detail</label><input placeholder="Value…"></div>
    <div class="btnrow"><button class="btn-primary">Save</button><button class="btn-secondary">Cancel</button></div>
  </div>`,
  },
  table: {
    css: `
.panel{background:var(--bg-secondary);border:1px solid var(--border-default);border-radius:var(--radius-card);overflow:hidden}
table{width:100%;border-collapse:collapse;font-size:12.5px}
th{text-align:left;font-size:10.5px;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);font-weight:700;padding:10px 14px;border-bottom:1px solid var(--border-default);background:var(--bg-tertiary)}
td{padding:10px 14px;border-bottom:1px solid var(--border-default);color:var(--text-secondary)}
tr:last-child td{border-bottom:none}
tr:hover td{background:var(--bg-tertiary)}
td.key{color:var(--text-primary);font-weight:600}`,
    body: `<div class="panel"><table>
    <tr><th>Item</th><th>Status</th><th>Updated</th></tr>
    <tr><td class="key">Row one</td><td>Active</td><td>Today</td></tr>
    <tr><td class="key">Row two</td><td>Pending</td><td>Yesterday</td></tr>
    <tr><td class="key">Row three</td><td>Done</td><td>Jul 12</td></tr>
  </table></div>`,
  },
};

function buildScaffold(name, template) {
  const t = TEMPLATES[template] || TEMPLATES.blank;
  const tokens = inventory.rawCss210();
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — CRS prototype</title>
<style>
${MARK_BEGIN}
${tokens}${MARK_END}
${SHELL_CSS}${t.css}
</style>
</head>
<body>
<header class="proto-head"><h1>${name}</h1><button class="theme-toggle" onclick="toggleTheme()">Theme</button></header>
<main class="stage">
  ${t.body}
</main>
<script>
// Theme: data-theme on <html>. Sources: ?theme= param, the toggle button, and
// postMessage {type:'crs-theme', theme} from the brain's preview window bar.
(function(){
  var q=new URLSearchParams(location.search).get('theme');
  if(q) document.documentElement.setAttribute('data-theme', q);
  else document.documentElement.setAttribute('data-theme', 'dark');
})();
function toggleTheme(){
  var el=document.documentElement;
  el.setAttribute('data-theme', el.getAttribute('data-theme')==='light'?'dark':'light');
}
addEventListener('message', function(e){
  if(e.data && e.data.type==='crs-theme' && (e.data.theme==='dark'||e.data.theme==='light'))
    document.documentElement.setAttribute('data-theme', e.data.theme);
});
</script>
</body>
</html>
`;
}

// Extract the token block from a scaffolded file for the byte-diff acceptance.
function extractTokenBlock(html) {
  const a = html.indexOf(MARK_BEGIN), b = html.indexOf(MARK_END);
  if (a < 0 || b < 0) return null;
  return html.slice(a + MARK_BEGIN.length + 1, b);   // +1 skips the newline after the marker
}

module.exports = { buildScaffold, extractTokenBlock, TEMPLATES: Object.keys(TEMPLATES), MARK_BEGIN, MARK_END };
