# Brain Program 3 — five phases of making the BRAIN itself sharper (verbatim, authoritative)

> Persisted per the context-survival protocol (carried over from Programs 1/2). Queued BEHIND the 2026-07-18 polish pass — start Program 3 only after the polish pass reaches its two-green close. If context is compacted: re-read this file, then program-progress.md, then master-checklist.md, then resume.

After you finish all of the above [the polish pass] then proceed with Brain Program 3: five phases of making the BRAIN itself sharper

Five phases, all brain-app, no CRS product work. All Program-1/2 governance carries over verbatim: save THIS prompt to `brain/qa/program3-prompt.md` first · `program-progress.md` after every task · Phase-0-style comprehension refresh before Phase 1 planning · UNDERSTAND → written PLAN → IMPLEMENT → TEST/FIX → independent VERIFY → COMMIT → CHECKPOINT gates · parallel reads, single-writer writes · design system + both themes · checks appended to the master checklist · final loop to two consecutive greens. Commits: `p3-<phase>: <task>`.

## PHASE 1 — Chat v2: the brain chat becomes as capable as Claude Code (because it runs ON it)
The open architecture question gets answered and acted on.

1. Recon verdict first: is the chat a direct API wrapper or does it shell to Claude Code? Prove it (the three-parallel-files test, executed). Report before building.
2. If wrapper (expected): migrate the chat backend onto headless Claude Code (the Agent SDK / programmatic `claude -p` mode) — each conversation = a managed session with the brain's context injected at start (engine bundle for the module in focus, CLAUDE.md conventions); the chat UI stays, the engine room changes. Subagents, skills, and tools come free by construction. If migration is genuinely infeasible in this environment, STOP with the exact blocker and implement the fallback: server-side parallel tool-call orchestration for the top 5 chat capabilities — but the default is migration, not fallback.
3. Chat as operator: first-class slash commands with confirm steps — `/settle <proto>`, `/chunk`, `/send <chunk>`, `/todo`, `/decide <entry>` (opens the memo, my typed confirmation locks), `/gen <intent>` — all routed through the existing engine/bridge/state APIs, never freelance. BP-connected conversations auto-tag (feeds the sidebar BP icons from real data).
4. Finish the turn UI (the f609abb wip): prompt→work→answer turns, live step indicators showing REAL tool/subagent activity from the session stream (not decorative animation), model-fallback notes, timestamps. ACCEPTANCE: the parallel-files test passes inside the brain chat (three subagents, provably concurrent) · one full `/chunk`→`/send` flow executed from chat · turn UI reflects actual events (kill a subagent mid-run → the UI shows it) · wrapper code paths deleted if migrated.

## PHASE 2 — ⌘K: global search + command palette (one keystroke to anything)

1. Global index (server-side, incremental on file change): conversations, repo docs, decisions, prompts archive, chunk reports, checklist rows, todos, feedback, module details. Ranked, typo-tolerant-enough (prefix + substring; no search engine dependency).
2. ⌘K palette (modal per §5, instant): type → mixed results grouped by kind with the icon system; Enter opens per the window policy (files → popup, surfaces → full area). Second mode — `>` prefix = commands: every chat slash command, "New prototype", "Run smoke QA", "Generate handoff", theme toggle, DND — same underlying APIs.
3. Recent + pinned items when empty; keyboard-only complete (arrows, Enter, Esc ladder). ACCEPTANCE: find a decisions.md entry, a 3-week-old conversation, and a chunk report each in ≤3 keystrokes + Enter · `>send` executes with its confirm · index updates within seconds of a file edit (prove with a fresh file) · palette full keyboard walkthrough clean, both themes.

## PHASE 3 — Entity pages + backlinks: the brain becomes navigable memory

1. Module pages: one full-area surface per CRS module aggregating everything the brain knows: status/DoD, its decisions (open+locked), prompts generated for it, chunks + reports, linked todos, feedback items, checklist rows — each section linking to the source. Reached from the tree, the palette, and mentions.
2. Backlinks everywhere: every document window and entity page gets a "Referenced by" rail — computed from the Phase-C reference index (extend it to cover chat messages and reports). A doc with zero inbound links is flagged on its page (orphan = the brain can't route to it).
3. Auto-linking: module names, decision titles, `prototypes/<name>`, chunk ids mentioned in chat/docs render as entity chips opening their pages — resolver server-side, cached, no per-render scans. ACCEPTANCE: the User Management page shows all seven sections populated from real data with working source links · open decisions.md → backlinks rail lists real citers · type a module name in chat → chip → page · an orphan doc is flagged · index rebuild is incremental (timed).

## PHASE 4 — Cost & usage intelligence (run the subscription like an operator)

1. Capture: per-run token/cost/model telemetry from every model touchpoint the brain drives (chat sessions, engine gen calls, queue runs, verification agents) into `data/usage-log.jsonl` — whatever the environment exposes (session stats, the statusline data already captured); where cost isn't directly available, compute from tokens×published rates and mark estimated.
2. Analytics surface (dashboard tab, §20.4 tiles + one trend chart drawn to tokens): spend by day/week, by purpose (chat / gen / queue / QA), by model; the 5h/7d windows against limits; cost-per-outcome — per verified chunk, per phase — the number that tells me if the factory is efficient.
3. Routing audit: which tasks ran on which model vs the routing policy; flag expensive-model usage on mechanical work with concrete re-route suggestions (report only — I approve policy changes). ACCEPTANCE: run one gen + one QA smoke → both appear in the log with model+tokens · the dashboard figures reconcile to the raw log (spot-sum) · estimated vs actual clearly marked · one real routing suggestion produced from real data.

## PHASE 5 — Hardening: the monolith gets split, errors get caught, backups get automatic

1. Split index.html into build-less ES modules (`public/js/…` per region: windows, explorer, chat, dashboard, tree, notify, palette…) — no bundler, plain `type="module"` imports honoring the zero-dep rule; identical behavior is the bar (the full master checklist is the regression suite for this — run it before AND after the split).
2. Error capture: window.onerror/unhandledrejection + server-side error log → repeated client errors auto-raise a What's-wrong todo with the stack; server mutations get an append-only audit log (`data/audit.jsonl`: who/what/when incl. `via: remote`).
3. Backups automatic: daily git auto-commit+push of state files (if clean working tree — never sweep my uncommitted work) + a weekly zip snapshot to `backups/` with rotation (keep 8); restore drill re-run against a snapshot, transcript pasted.
4. Perf pass: cold-start time, 8-windows-open memory/smoothness, tree with all 46 expanded, palette latency — measured before/after the split, numbers in the report; fix what regressed. ACCEPTANCE: checklist green before and after the split (same rows) · a thrown test error becomes a todo with stack · audit log captures a remote verify · snapshot restore drill clean · the four perf numbers, before/after. Then the final loop over ALL P3 rows to two consecutive greens. STOP.

## Final report
Phase-1 architecture verdict + migration proof · palette walkthrough · one entity page screenshot-level description · the cost dashboard's reconciliation · perf before/after table · consolidated everything-awaiting-me list. Nothing skipped silently.
