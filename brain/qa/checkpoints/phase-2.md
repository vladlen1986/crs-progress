# Checkpoint — PHASE 2 (Chief-of-Staff dashboard) — COMPLETE 2026-07-18

## Gate proof (independent verification subagent — one cycle, PASS)

**53/53 rig checks green** (script + full log: qa-scratch/rig/dash-accept.{js,json}; screenshots dash-{dark,light}.png). DASH.1–5 all PASS, appended to master-checklist (`2026-07-18 p2-accept`; post-append parse: PASS 111 / ENV-LIMITED 7 / FAIL 0).

- **DASH.1** old introspection GONE (.kpis=0, no file counts); greeting + 8 quick actions (Weekly digest + Sync stay) + Tools; rows exactly Now / Needs me / What's wrong / Synced & background. 3 provenance spot-checks matched raw files.
- **DASH.2** todos via card UI and via chat "add todo" (no chat file, no model call, composer cleared); module chip → tree.html#module page-window; overdue floats first w/ warning styling + exactly one follow-up-due notification (no dupes).
- **DASH.3** sent→"Await BP report: buttons/c1" (due +24h, chunk link) → report → auto-closed; GUARD 409 in 5ms with ZERO model spend + decision-attention notification + linked decision todo that stays open while the stub is [OPEN] (closed manually as test data, noted).
- **DASH.4** real FLAG fixture (buttons · 2) renders + persists; planted QUARANTINE row → failRows + auto todo → flip to PASS → cleared + auto-closed; planted sync-failed → "Sync failing: forum" in What's-wrong → REAL forum check (200) → auto-closed "sync succeeded".
- **DASH.5** both themes getComputedStyle checks (danger/warn rowlbls, warning-tint overdue, JBMono figures), zero app console errors. Pre-existing favicon-404 noise found → fixed post-gate (204 route, commit below).

## Figure → state-file mapping (the DASH.1 provenance table)

tasks/doing/sync-rows → data/tasks.json · decisions (7) → decisions.md [OPEN] · focus + tree counts → data/modules.json · plans in flight + failed chunks → prototypes/*/build-plan.json · mapping flags → prototypes/*/mapping.md machine fence · QA counts/failRows/env/lastRun → brain/qa/master-checklist.md (first-status-cell, last-occurrence-wins) · forum/relnotes/issue stamps → data/state.json · bubbleDigest/manuals stamps → data/settings.json · wishlist → data/wishlist.json · recent conversations → data/chats/ (the one non-/api/dash card).

## What was built

- **2.2 Tasks store:** data/tasks.json + GET/POST /api/tasks, /update, /delete; schema {id,title,status todo|doing|blocked|done,due?,followUp?,link?{kind,ref},created,notes,auto?{key},notifiedDue?}. `reconcileAutoTasks()` (deterministic, every GET): chunk sent→follow-up due+1d / auto-close on report; decision todos (created at GUARD 409) auto-close when the [OPEN] stub disappears (= locked, per reconciliation D); checklist FAIL/QUARANTINE rows ↔ todos; sync failures (sync-failed notification newer than the source stamp) ↔ todos; due follow-ups fire 'follow-up-due' once (notifiedDue).
- **2.1/2.3 Board:** /api/dash aggregate (exclusively state files) + renderDashboard rewrite: 4 labeled rows, JBMono figures (--mono), greyscale active states, empty states, Digest+Sync cards and Tools strip kept (Tools = navigation, judgment call), Next-build-step card retired (superseded by the board; plans data still served).
- **2.4 Chat command:** sendMsg intercepts "add todo <text>" → tasks store, zero model spend.
- Registry type 'follow-up-due' (tasks, warning) — settings matrix auto-includes.
- checklistRows(): first-status-cell + last-occurrence-wins parse (append-only table with embedded pipes; ground truth 113 ids).

## Commits

08d5f71 (plan) · b18497d (implementation) · this checkpoint commit (favicon fix + checklist rows + checkpoint) · plus app autoCommit churn during acceptance (14 commits — audit trail).

## Notes for Vlad

- Labels use the app's system font stack: Inter Tight isn't offline-loadable in the zero-dep app (figures are JBMono per spec). Drop a woff2 + @font-face later if you want it exact.
- "add todo …" works from the CHAT composer (the dashboard has no composer by design; the Todos card has its own input).
- The 7 open decisions render in Needs-me with open-decisions.md actions — the guard keeps blocking anything that touches them.

**Gate to PHASE 3: OPEN.**
