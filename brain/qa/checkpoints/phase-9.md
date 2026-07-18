# Checkpoint — PHASE 9 (Production throughput) — COMPLETE 2026-07-18

## Preconditions path (stated, no nagging)

Pattern A still `[OPEN]` → the P6 UM-fix drafts stayed guard-blocked (correctly); the run used UNBLOCKED work only. Bridge ENV-LIMITED → per-intent "send" = copy-path staging; `verified` stays exclusively Vlad's.

## Gate proof (independent verifier — PASS on all rows; every figure recomputed)

- **P9.1 PASS** — 5 real intents end-to-end to the copy-path boundary, sequential, one at a time: chunk-emits c2/c3/c4 (casino-settings — staged prompts w/ TEST wrapper + verbatim MAPPING CONTRACT, dual-hash archives, statuses sent) + 2 FWM kickoff gens (engine-grounded by the FWM bundle d864b74a — nothing imagined). Full trails in the queue log + archive.
- **P9.2 ENV-LIMITED (honest)** — no real usage-limit window occurred in a ~6-min 5-call run; mocking via QUEUE_STUB is forbidden for this row. The machinery is shipped and proven (blocked-limit → resumeAt → auto-resume → boot-requeue); it will self-prove on the first long run that genuinely crosses a window.
- **P9.3 PASS** — guard probe failed DECISION-NEEDED ("all 46 DTs" → rollout stub), ZERO emission (archive grep = 0), decision todo raised via the queue hook. Still-blocked backlog listed: P6 drafts 1–3.
- **P9.4 PASS** — awaitingVerify == plan sent-chunks == open await-report follow-ups, exactly (c1–c4).
- **P9.5 PASS** — telemetry (processed 5 · failed 1 · avg 57077ms · limitBlocks 0-real) recomputed independently from data/task-queue.json, byte-equal to /api/dash; Now-row Factory tile renders JBMono. Stub limit events excluded from "survived" (fix b5bf718).

## Built (commits 9d057dc, b5bf718)

Queue intent tasks ({kind: chunk-emit|gen}) processed through the ENGINE inside the proven limit-aware queue (limit errors bubble into blocked-limit/resumeAt unchanged; guard hits fail the task + raise linked decision todos); /api/queue accepts `intent`; /api/dash `throughput` derived from the queue file; board Factory tile.

## Vlad's pending-verify list (matches the board)

casino-settings c1–c4 staged prompts await your BP sessions (Copy → run → paste report → Verify). FWM kickoff prompts archived, ready to run the same way.

**Gate to PHASE 10: OPEN.**
