# Program progress — Steps 2+3 combined (Chunker + Chief-of-Staff stack)

> Working memory for the run. Updated after EVERY task. If you are resuming with no memory: read `program-prompt.md` first (the authoritative program), then this file, then `program-state.md`, then `master-checklist.md`. Git wins over this file on conflict.

## Position

- **Current phase:** PHASE 0 — deep comprehension
- **Current task:** P0.1 full-codebase parallel read fan-out (launched)
- **Just completed:** p0: persist program prompt (59e1083); progress file initialized (this commit)
- **Next:** collect fan-out results → refresh brain/design/app-map.md → reconcile Phases 1–10 vs as-built → write Phase-1 plan → P0 verification subagent

## Inherited context (from program-state.md / resume-2026-07-17.md — verified 2026-07-18)

- Master program P1–P11 DONE; QA loop CLOSED clean (cycles 2+3, 98 rows: 91 PASS / 7 ENV-LIMITED / 0 FAIL). Any code change resets the two-green counter — this program WILL reset it; Phase 5 loop-to-green re-earns it over the grown checklist.
- 7 standing ENV-LIMITED rows = needs-eyes list (real-OS drag/clipboard, >100MB upload, queue restart persistence, 2 Buildprint-link-gated rows).
- Buildprint CLI on this Mac: installed but link was Unauthorized on 2026-07-17 (CLI 4.1.6→4.2.5 update pending). Phase 4 precondition check will decide ENV-LIMITED honestly.
- Standing USER OVERRIDES (judgment-calls #35–#37): kanban = bottom sheet; all toggles greyscale (active = --bg-elevated + --text-primary, never accent fill); single-app — nothing opens a browser tab (openPageWindow / openDocWindow; external links ↗ system browser).
- Engine exists as of yesterday's commits (779e76b..ef3f1a1): context-map.json, assemble.js (deterministic bundler), guard.js ([OPEN] hard stop), `brain gen` wired into chat. Fan-out agent confirms as-built shape.
- App: crs-brain/ zero-dep Node server :4317 + vanilla single-file pages. spawnClaude() without shell:true. Cross-platform Mac/Windows — keep all platform guards.

## Open threads

- Fan-out results pending (6 agents, see P0 plan below).
- program-state.md says P9.3/9.4/9.5 were later completed and verified (resume file + c2/c3) despite gate-audit TODO rows — git wins; treat window system/editors/viewer as SHIPPED.

## P0 plan (written before any edit)

1. Fan out 6 read-only agents in one message: (1) server.js end-to-end; (2) index.html by region; (3) engine as-built; (4) design-system export style inventory (for §1.2 mapping); (5) prototypes' current home + fullscreen-window mechanics + sample-prototype pick; (6) dashboard-as-is + every state file feeding Phase 2 (STATUS.md, decisions.md [OPEN], modules.json, master-checklist, sync stamps, wishlist.json, notification registry) + brain/qa + brain/bubble skim.
2. Refresh brain/design/app-map.md into as-built truth; list every doc-vs-reality disagreement.
3. Reconcile program Phases 1–10 vs as-built: pre-existing overlaps (gate, don't rebuild), approach conflicts (propose adjustment here, flag in checkpoint).
4. Write Phase-1 plan here. Verification subagent: spot-check 5 app-map claims + confirm reconciliation lists every overlap. Then gate opens.

Risks: index.html is huge (agent must chunk its reads); engine layout assumed under brain/engine (verify); "design-system export" = Bubble style-name export — locate it (design/Styles.txt? brain/design/?); prototypes may not exist yet anywhere (then 1.1 builds fresh — confirm absence is real, not missed).

## Task log

| when | task | commit |
|---|---|---|
| 2026-07-18 | p0: persist program prompt | 59e1083 |
| 2026-07-18 | p0: init progress file + launch fan-out | (this) |
