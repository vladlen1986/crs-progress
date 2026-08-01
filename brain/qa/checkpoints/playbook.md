# Checkpoint — PLAYBOOK (self-learning made law) — COMPLETE 2026-07-19

T0–T4 + T6 + learn-toast layer built on Windows (commits `playbook: …` through 5b29d93); recurrence-alarm rerun + verification completed on the Mac (this checkpoint). Handoff doc: brain/qa/resume-2026-07-19-playbook.md.

## Gate proof (independent verifier — CONFIRMED; zebra probe 10/10 TWICE, two separate live bp turns)

- **PLAYBOOK.1 store + migration** — playbook.json schema live, 7 operational seeds migrated (memory.json = human facts only); distiller outputs the schema + learn-events.
- **PLAYBOOK.2 injection** — visible "Playbook check — N lessons loaded" step, hits stamping (0→1 run-1), gen-endpoint trap injection.
- **PLAYBOOK.3 recurrence alarm** — planted neutral lesson + real `node --zebra-hello` failure → recurred=1, warning, pb-recur todo, learn-event. Proven end-to-end twice on the Mac (chatIds 97815bea, 4a27a3c4).
- **PLAYBOOK.4 toasts + ledger** — ⚡ applied-toast sampled live mid-turn (fires at turn start, ~11s auto-dismiss), ⚠ recurrence toast + expand, learn-events.jsonl + endpoint.
- **PLAYBOOK.5 surfaces** — playbook.html grouped/editable both themes; ⌘K entry; dash strip proven via API shape (recurredThisWeek), not text-match.
- **PLAYBOOK.6 prevention meta-proof** — run-1's probe failed BECAUSE injection prevented the planted mistake; and the auto-distiller learned a correct lesson unprompted from the failed Mac attempt. The learning loop earns its keep on both sides of the exam.

## Root causes (the two probe failures, both rig-design, zero product bugs)

1. **Run-1 (win):** planted python mistake + a lesson warning about exactly that mistake → session refused to run it → no error → no recurrence to detect. Fix: neutral zebra lesson that informs without forbidding.
2. **Mac attempt 1:** `zebra --hello` is not in the bp-spawn allowlist (`--allowedTools … Bash(node:*) …`) → permission denial, not a shell error → errorSig could never match, on ANY platform (latent flaw; the script had never been run). Fix: `node --zebra-hello` — allowlisted prefix, really executes, exit 9, `node: bad option: --zebra-hello`; normalizeErrSig whole-string probe matches regardless of "Exit code #" prefix.

## Platform/process notes

- Committed rig script brain/qa/rig-scripts/verify-playbook2.js updated cross-platform (darwin/win Chrome paths, PB resolved from repo root, probe-design fix baked in). Rig itself stays machine-local in qa-scratch/rig/.
- Server autoCommit swept probe by-products into `brain:` commits during the runs (ff40918, 99b1099, 1d3d685 + task-delete pairs) — same pattern as prior sessions; live state verified clean (7 lessons, no zebra chats/tasks/todos). Append-only ledgers (learn-events/notifications/action-log/audit/usage-log) intentionally retain probe history.
- T5 evidence: brain/qa/evidence/2026-07-19-t5/ — agent-browser logged-out capture of crsapp.live/version-test rendering dark (body rgb(24,24,24)), evidencing the decisions.md 2026-07-19 dark-by-design ruling. Logged-in light capture still parked on .bp-test-user creds.
- Mac bring-up done this pass: agent-browser 0.32.2 + buildprint 4.2.7 installed under ~/.local (parity with win). Buildprint remains **Unauthorized** on the Mac — needs `buildprint link <token>` from Vlad (token from the Buildprint CLI integrations tab).

**PLAYBOOK.1–6 appended to master-checklist (216 rows: 204 PASS / 12 ENV-LIMITED / 0 FAIL after this pass). Program CLOSED.**
