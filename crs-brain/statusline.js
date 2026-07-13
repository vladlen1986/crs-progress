#!/usr/bin/env node
/*
 * CRS Brain statusline.
 *
 * Claude Code pipes a JSON blob to this script (via stdin) to render the
 * interactive status line. On Pro/Max plans that blob includes `rate_limits`
 * (the 5-hour session window + 7-day weekly window). We do two things:
 *   1. Persist rate_limits to crs-brain/data/usage.json so the CRS Brain app
 *      can display live session / weekly usage + reset countdowns.
 *   2. Render a compact status line for the user (model + usage %).
 *
 * Note: statusline only runs during INTERACTIVE `claude` sessions, not headless
 * `claude -p`. Since the limits are subscription-wide, this data still reflects
 * total usage (including the app's calls); it just refreshes when you use
 * Claude Code interactively.
 */
const fs = require('fs');
const path = require('path');

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
  let j = {};
  try { j = JSON.parse(raw); } catch {}

  // 1. persist rate limits for the app
  try {
    if (j.rate_limits) {
      const out = path.join(__dirname, 'data', 'usage.json');
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, JSON.stringify({ at: Date.now(), rate_limits: j.rate_limits }, null, 2));
    }
  } catch {}

  // 2. render a compact status line
  const model = (j.model && (j.model.display_name || j.model.id)) || 'Claude';
  const rl = j.rate_limits || {};
  const pct = (w) => (w && typeof w.used_percentage === 'number') ? Math.round(w.used_percentage) + '%' : '—';
  let line = '◇ ' + model;              // ◇ model
  if (rl.five_hour || rl.seven_day) line += '   5h ' + pct(rl.five_hour) + '   7d ' + pct(rl.seven_day);
  process.stdout.write(line);
});
