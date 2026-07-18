# Checkpoint — PHASE 4 (Buildprint CLI bridge) — ENV-LIMITED STOP 2026-07-18

## Precondition check (program 4.1 — hard-stop honesty gate)

Ran on this Mac, verbatim outputs:

```
$ which buildprint
/Users/vlad/.local/bin/buildprint
$ buildprint --version
4.1.6
$ cd ~/projects/crs-bubble/casinoreportingsystem && buildprint project list
Unauthorized
```

Workspace exists (`~/projects/crs-bubble/casinoreportingsystem/test`), CLI installed, **auth NOT linked** — the same Unauthorized state recorded 2026-07-17 (and the pending 4.1.6→4.2.5 CLI update never happened).

## Ruling (per the program: "Not linked → STOP the phase, mark ENV-LIMITED, proceed to Phase 5's non-CLI path. Never mock the CLI.")

- Phase 4 implementation (4.2 `--send`, 4.3 report capture, 4.4 safety) **NOT built** — transport code that can't be exercised against the real CLI would only be provable by mocking, which the program forbids.
- Checklist: **BRIDGE.1 PASS** (the precondition demonstrably ran — the honest stop IS the acceptance) · **BRIDGE.2, BRIDGE.3 ENV-LIMITED** with root cause "CLI Unauthorized on this machine".
- **Needs-eyes todo raised** (task 56acaf0b, on the dashboard): run `buildprint link <token>` — token from the Buildprint web app → Integrations → CLI. That single action unblocks: this phase's implementation, and the two standing ENV-LIMITED rows P1-promptgen.3 + P8-sounds-wishlist.7.
- **Phase 5 pilot will use the copy path** (Copy → paste to BP → paste report back), which is fully built and verified (CHUNKER.5).
- **Phase 6 audit will also use the copy path.** Phase 9's runner will use whichever transport is live at its start.

## What re-opens this phase

After `buildprint link` succeeds on this machine, re-run the precondition; on PASS, implement 4.2–4.4 exactly per program-prompt.md Phase 4 and prove BRIDGE.2–3 against the real CLI. The stop is a pause with a written root cause, not a skip.

**Gate to PHASE 5: OPEN (copy-path variant, per the program's own contingency).**
