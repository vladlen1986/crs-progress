# Checkpoint — BRAIN PROGRAM 3, PHASE 1 (Chat v2) — COMPLETE 2026-07-18

## Verdict that reshaped the phase

The chat ALREADY runs on headless Claude Code (`claude -p`) — PROVEN by executing the three-parallel-files test (3 live Agent subagents, files written), not grepped. So Phase 1 was NOT the expected wrapper→Claude-Code migration. It became a capability-surfacing + operator-layer + turn-UI pass.

## Gate proof (independent verifier — 3/4 first pass, 1 fix cycle, then PASS 4/4)

- **CHATV2.1 PASS** — parallel-files test in-chat: 3 {type:block,tool:Agent} SSE events + a.txt/b.txt/c.txt written in-bounds. Live subagents confirmed.
- **CHATV2.2 PASS** — /chunk chatv2probe → map+plan (4 chunks); /send chatv2probe/c1 → confirm→chunk-status sent; copy-path, no freelance. Throwaway proto cleaned.
- **CHATV2.3 PASS (after fix)** — FIRST PASS FAILED, catching a real systemic bug: Stop was cosmetic. `req.on('close')` fires at request-body-end in Node≥16, not on socket disconnect, so ac.abort() never ran and the child `claude -p` ran to completion on every Stop (burning the full turn). Fixed all three sites (chat/ingest-track/bp-track, server.js 2623/2744/2792) → `res.on('close')`. Independently re-verified with OS-level proof: mid-run 1 claude-p proc → 0 after disconnect (child SIGTERM), partial:true message persisted. Commit ffbaae7.
- **CHATV2.4 PASS** — slash parser `^/(settle|chunk|send|todo|decide|gen|help)\b`: word-boundary rejects /settled·/genie, "hello /x" passes through; /help overlay, /todo→tasks, /settle+/gen→crsConfirm; both themes, zero console.

## Built (commits 79f36d3, ffbaae7)

- **T1 operator slash-commands** (client, index.html sendMsg): /settle /chunk /send /todo /decide /gen /help — each routed through the EXISTING endpoint with a crsConfirm step on mutations, never freelance. /help overlay lists them; unknown /foo passes to the model.
- **T2 focus-module context injection** (server): opt-in chat.focusModule → a COMPACT module brief (status/DoD/what's-left/open-decisions/CLAUDE.md-conventions pointer) prepended to the system prompt at session start. The full 96KB engine bundle stays reserved for /gen through the engine — groundedness without bloat.
- **T3 BP auto-tag** (server): a turn that invokes buildprint (MCP tool name OR a Bash(buildprint:*) command seen via onDetail) → chat.bp=true on save, feeding the sidebar terminal icon from REAL history. Runtime ENV-LIMITED (CLI Unauthorized) but wired + the Bash-command path fixed after the verifier flagged the name-only regex.
- **T4 turn UI = verify** — the work-tree + model-fallback note (index.html:2622) were already wired; the abort fix made the Stop path genuinely work.

## Bonus catch

The abort bug (Stop cosmetic → every stopped turn ran to completion, wasting the full model call across chat/ingest/BP-track) is a real pre-existing defect the Phase-1 acceptance surfaced and fixed.

**Gate to PHASE 2: OPEN.**
