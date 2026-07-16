#!/usr/bin/env node
// PreToolUse deny-hook for the CRS Brain's `claude -p` spawns. Claude can run the
// Buildprint CLI via Bash — this hook HARD-BLOCKS the dangerous invocations so the
// guardrails are enforced by code, not just prose. Blocked = exit 2 (Claude Code
// treats a PreToolUse exit-2 as "deny this tool call" and feeds stderr to the model).
// Wired via `--settings` in server.js runClaudeStream(). Safe commands pass (exit 0).

let input = '';
process.stdin.on('data', (d) => (input += d));
process.stdin.on('end', () => {
  let cmd = '';
  try {
    const j = JSON.parse(input || '{}');
    cmd = String((j.tool_input && (j.tool_input.command || j.tool_input.cmd)) || '');
  } catch { process.exit(0); }            // can't parse → don't block
  if (!/\bbuildprint\b/i.test(cmd)) process.exit(0);   // only guard buildprint calls

  const c = cmd.toLowerCase();
  const deny = (why) => {
    process.stderr.write(
      'BLOCKED by the CRS safety gate: ' + why +
      ' This is a hard rule — do NOT retry a variant. Work on the TEST branch only, ' +
      'create a savepoint before each apply, and let `buildprint check` gate every apply.'
    );
    process.exit(2);
  };

  // Flag-level bypasses of validation / safety
  if (/--force-apply/.test(c)) return deny('`--force-apply` bypasses check freshness, validation, and large-apply safety.');
  if (/--no-check/.test(c)) return deny('`--no-check` skips the validation pass before apply.');
  if (/--allow-large-apply/.test(c)) return deny('`--allow-large-apply` bypasses the large-apply safety gate.');
  if (/--allow-suspicious-shrink/.test(c)) return deny('`--allow-suspicious-shrink` bypasses the bad-export guard.');
  if (/\bsync\b[^|;&\n]*--reset/.test(c)) return deny('`sync --reset` discards all local work and snaps to Bubble.');

  // Anything targeting the LIVE branch (word-boundary `live`, only when a branch op is present)
  if (/\blive\b/.test(c) && /\b(apply|merge|savepoint\s+restore|branch\s+create)\b/.test(c))
    return deny('operating on the LIVE branch is forbidden — CRS is TEST/DEV branch only.');

  // Destructive database deletes via the copilot
  if (/\bdata\b[^|;&\n]*\b(delete|remove|destroy|drop)\b/.test(c))
    return deny('deleting Bubble database records via the copilot is forbidden (creates/edits on test are fine).');

  process.exit(0);   // allowed
});
