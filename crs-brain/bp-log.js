#!/usr/bin/env node
// PostToolUse hook for the CRS Brain's `claude -p` spawns. Runs AFTER every Bash
// tool call and appends the buildprint/git commands the agent executed to the
// action log (argv[2] = path to action-log.jsonl). This is the automatic audit
// trail: every savepoint/apply/data-create/branch/merge the agent runs is recorded
// with a timestamp, so a later "roll back to before X" can find the exact point.
// Logging only — always exits 0 (never blocks a tool call).

const fs = require('fs');
const LOG = process.argv[2];

let input = '';
process.stdin.on('data', (d) => (input += d));
process.stdin.on('end', () => {
  if (!LOG) process.exit(0);
  let cmd = '', ok = null, note = '';
  try {
    const j = JSON.parse(input || '{}');
    cmd = String((j.tool_input && (j.tool_input.command || j.tool_input.cmd)) || '').trim();
    const r = j.tool_response || j.tool_result || {};
    // Best-effort success signal — shape varies across Claude Code versions.
    if (typeof r === 'object' && r) {
      if (typeof r.is_error === 'boolean') ok = !r.is_error;
      else if (typeof r.exit_code === 'number') ok = r.exit_code === 0;
      else if (typeof r.interrupted === 'boolean') ok = !r.interrupted;
      const err = (r.stderr || r.error || '').toString();
      if (err) note = err.slice(0, 200);
    }
  } catch { process.exit(0); }

  if (!cmd) process.exit(0);
  // Only record mutating / branch-relevant commands, not every ls/cat/grep.
  const isBp = /\bbuildprint\b/i.test(cmd);
  const isGit = /\bgit\s+(commit|apply|merge|revert|reset|checkout|push|tag)\b/i.test(cmd);
  if (!isBp && !isGit) process.exit(0);

  // Classify the buildprint action so the log is scannable/filterable.
  let type = isGit ? 'cli' : 'cli';
  let savepoint = null, branch = null;
  if (isBp) {
    const m = cmd.match(/\bbuildprint\s+([a-z-]+)/i);
    const sub = (m && m[1] || '').toLowerCase();
    if (sub === 'savepoint') type = 'savepoint';
    else if (sub === 'apply') type = 'apply';
    else if (sub === 'data') type = 'data';
    else if (sub === 'merge' || sub === 'branch') type = 'branch';
    else if (sub === 'check' || sub === 'sync' || sub === 'audit' || sub === 'summary' || sub === 'tree' || sub === 'context') type = 'cli';
    // pull a savepoint label if present:  savepoint create "Before X"
    const sp = cmd.match(/savepoint\s+create\s+["']([^"']+)["']/i);
    if (sp) savepoint = sp[1];
    const br = cmd.match(/--branch\s+([\w-]+)|\b(test|dev|live)\b/i);
    if (br) branch = br[1] || br[2] || null;
  }

  try {
    const now = new Date();
    const line = JSON.stringify({
      ts: now.getTime(),
      iso: now.toISOString(),
      source: 'agent',
      type,
      summary: cmd.slice(0, 400),
      chatId: null,
      branch,
      savepoint,
      meta: { ok, note: note || undefined },
    });
    fs.appendFileSync(LOG, line + '\n');
  } catch { /* never break the tool call */ }
  process.exit(0);
});
