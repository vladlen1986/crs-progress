# Checkpoint — POLISH PASS (executive readability) — COMPLETE 2026-07-18

Vlad's scoped refinement pass after the 10-phase program. Prompt: brain/qa/polish-prompt.md.

## Gate proof (independent verifier — PASS 8/8; 68 rig assertions both themes; one cosmetic fix cycle)

- **POLISH.1 tree rows** — collapsed row = number·title·tag·%·status word ONLY (grip/▲▼/caret/note/bar/chip removed; % JBMono --text-muted; empty checklist → "—"); hover reveals only ⋮ (Move up/down keyboard-reorder + status cycle + expand); whole-row drag lifts/scales/gaps siblings and persists; row-click expands.
- **POLISH.2 executive detail** — generated plain-English state sentence; "What's left" first; done items collapse; zero emoji/backticks/STATUS-prose in exec; "Show technical columns" toggle reveals internal_value/id; Raw byte-identical to server md; interactive checklist focus-preserving.
- **POLISH.3 header** — single #themeToggle (was two-button #themeSeg); connection chip neutral in every state (root cause: .uchip.warn/.crit border tints at 75%/90% usage — removed).
- **POLISH.4 kanban** — ONE kanban: the map board, now a RIGHT-side drawer (supersedes override #35, judgment #56), §20 card language (no stripes, radius-card, §20.7 badges, greyscale segmented); native kb-* deleted (judgment #57), both entry points reconciled to showMap; grep-proof.
- **POLISH.5 sidebar** — pinned section + filled pin (persists via /api/chat/meta), per-conversation ⋮ (Pin/Rename/Delete-confirm), no exposed delete-X, 16px type icons (terminal for real bp:true convos vs chat), footer legend.
- **POLISH.6 window policy** — one openTarget() router (judgment #58): surfaces → full-area #surfaceView + ← back; files → popup. All 6 APP_SURFACES + tool buttons + dash tiles funnel through it.
- **POLISH.7** — zero console errors on /, /tree.html, /map, both themes.
- **P10.3 (deferred) → PASS** — mobile command post @375: stacked rows + bell + todo check-off; mobileChunkVerdict drove a real chunk-status POST (reset after); mobileDecisionLock typed-phrase guard proven (wrong phrase → zero lock POSTs); OUT list hidden ≤480px; ≥44px targets; both themes.

## Root causes (as requested)

- Yellow connection-chip border = usage-severity `.uchip.warn`/`.crit` border tints (75%/90%). Removed; severity now lives in the dot + popover only.
- "Duplicate theme toggle" = the two-button #themeSeg (header) alongside the Settings-modal appearance seg. Collapsed the header pair into a single #themeToggle; Settings seg stays (both wired to setTheme).

## Commits

f83fd5e (header) · 83e4a17 (map right-drawer, map agent) · ca745e4 (kb-* delete + reconcile) · 47bfe72 (sidebar) · c7cf24b (tree rows) · 390c511 (exec detail) · 5f9e0f3 (window policy) · icon-size fix. judgment-calls 56-58.

## Routing call-site table (window policy)

openTarget(target,opts) @ index.html: isSurface(target) [tree/wishlist/queue/memory/activity/protos] OR served .html → openSurface (full-area + ← back, restores prior view); else → openDocWindow (file popup). Header rail buttons, dashboard tiles, dashChip links, notification-row targets, explorer protoreg/protonew → all through openTarget. Files (decisions.md, repo docs, images) → openDocWindow/overlay.

**POLISH.1–7 appended to master-checklist. Gate to the final polish loop: OPEN.**
