# Review digest — every autonomous call on record, for ratification

Generated 2026-07-18 by the Steps-2+3 program (Phase 8.4). One sit-down: tick **Accept** or **Reverse** per item; reversals become todos.

## A. Design judgment calls (brain/design/judgment-calls.md — verbatim rows)

- [ ] Accept / [ ] Reverse — **#1** "Approved literals §2.11" cited by the run prompt does not exist in the doc
- [ ] Accept / [ ] Reverse — **#2** Run prompt says modal widths "420/440/520"
- [ ] Accept / [ ] Reverse — **#3** Run prompt says input focus = "accent @55% border — no glow rings"
- [ ] Accept / [ ] Reverse — **#4** No tokens exist for code-block surfaces, prose body in rendered docs, or translucent "veil" overlays
- [ ] Accept / [ ] Reverse — **#5** Header theme control
- [ ] Accept / [ ] Reverse — **#6** Galaxy-map constellation category colors (`--c-mem1..5`, `--c-skill`, `--c-routine`, `--c-app`)
- [ ] Accept / [ ] Reverse — **#7** Map surfaces were an off-palette darker set (#0A0A0C/#141417/#1C1C21)
- [ ] Accept / [ ] Reverse — **#8** Legacy alias token names (`--panel`, `--line2`, `--good`…) kept app-wide
- [ ] Accept / [ ] Reverse — **#9** Accent-as-text carrier
- [ ] Accept / [ ] Reverse — **#10** tree.html `.mv` reorder buttons 28px wide but 16px tall
- [ ] Accept / [ ] Reverse — **#11** Dashed-underline inline-edit fields get accent underline on focus, no 3px ring
- [ ] Accept / [ ] Reverse — **#12** Drag-drop insertion indicator keeps a 2px accent box-shadow
- [ ] Accept / [ ] Reverse — **#13** Native checkboxes styled via `accent-color: var(--accent)`
- [ ] Accept / [ ] Reverse — **#14** Modal overlay scrim `rgba(0,0,0,.55)` (dark) / index uses themed `--overlay`
- [ ] Accept / [ ] Reverse — **#15** Purple tint via `color-mix(in srgb, var(--purple) 13%, transparent)`
- [ ] Accept / [ ] Reverse — **#16** Text glyph buttons (↑/↓/✕, ⏸/▶) not swapped to Feather SVGs
- [ ] Accept / [ ] Reverse — **#17** System font stacks kept on standalone pages (not Inter)
- [ ] Accept / [ ] Reverse — **#18** Galaxy glow/nebula/comet canvas art
- [ ] Accept / [ ] Reverse — **#19** Dark-document preview backdrop stays #181818 in both themes
- [ ] Accept / [ ] Reverse — **#20** Extended constellation palette --c-mem6..8
- [ ] Accept / [ ] Reverse — **#21** Compact control sizing below spec minimums in the board drawer
- [ ] Accept / [ ] Reverse — **#22** Menu-panel padding 16px (below §15's 18-24 card range)
- [ ] Accept / [ ] Reverse — **#23** Board drawer "r6 sections" → `--radius-btn` token (7px)
- [ ] Accept / [ ] Reverse — **#24** Board cards badge = priority (!high/!med/!low), not status
- [ ] Accept / [ ] Reverse — **#25** Board open slides toolbar buttons left of the drawer
- [ ] Accept / [ ] Reverse — **#26** Mobile board = full-width takeover (54vh half-sheet removed)
- [ ] Accept / [ ] Reverse — **#27** Hover routing edge starts at the drawer's left edge at card center
- [ ] Accept / [ ] Reverse — **#28** Hub hover highlights ALL descendant cards (prefix match)
- [ ] Accept / [ ] Reverse — **#29** Explorer stays a singleton; shared window chrome extracted instead
- [ ] Accept / [ ] Reverse — **#30** Doc-window layer always stacks above the explorer (no z interleave)
- [ ] Accept / [ ] Reverse — **#31** Esc/Ctrl+W target the doc layer only when the last mousedown was in a doc window/chip
- [ ] Accept / [ ] Reverse — **#32** Old center-pane openFile viewer orphaned as entry point
- [ ] Accept / [ ] Reverse — **#33** Chip bar wraps to full width, 140px ellipsized labels
- [ ] Accept / [ ] Reverse — **#34** Cmd+W not interceptable in Chrome — Ctrl+W everywhere, tooltip documents it
- [ ] Accept / [ ] Reverse — **#35** **USER OVERRIDE 2026-07-17:** kanban board = BOTTOM sheet, not right drawer
- [ ] Accept / [ ] Reverse — **#37** **USER OVERRIDE 2026-07-17:** single-app — nothing opens in a separate browser tab
- [ ] Accept / [ ] Reverse — **#38** Image-viewer backdrop `#0C0C0F` literal in both themes; viewer bar chrome dark-literal
- [ ] Accept / [ ] Reverse — **#39** Filmstrip current thumbnail = accent border only
- [ ] Accept / [ ] Reverse — **#40** Window-cap retirement never closes a dirty window
- [ ] Accept / [ ] Reverse — **#41** xlsx grid opens read-only; pencil enables editing; edited sheets save as values (formulas collapse, styling dropped — disclosed in-UI)
- [ ] Accept / [ ] Reverse — **#42** pdf = native Chromium viewer (pdf.js skipped); pdf/docx view-only + Edit externally
- [ ] Accept / [ ] Reverse — **#43** SVG crispness via 8× pre-raster + transform zoom
- [ ] Accept / [ ] Reverse — **#44** Notification channel defaults: only `info` is banner-only; every error/attention AND routine-completion type = all three channels
- [ ] Accept / [ ] Reverse — **#45** Per-row bell read via {at, ids}; popover open no longer auto-marks-all
- [ ] Accept / [ ] Reverse — **#46** Legacy notify.inApp/notify.sound master switches removed from UI (DND + per-type supersede); email rows kept
- [ ] Accept / [ ] Reverse — **#47** server-unreachable type skips bell persistence by design
- [ ] Accept / [ ] Reverse — **#48** process-start legacy event has no v2 type; its sound assignment not migrated
- [ ] Accept / [ ] Reverse — **#36** **USER OVERRIDE 2026-07-17:** all toggles greyscale — never blue accent
- [ ] Accept / [ ] Reverse — **#49** **Sidebar rework 2026-07-18:** account status consolidated into ONE header chip (connection dot + usage %), reusing the existing usage chip/popover; removed the
- [ ] Accept / [ ] Reverse — **#50** Header chip shows the 5-hour SESSION % as the single number; border severity from max(5h,7d); the popover carries both windows + resets
- [ ] Accept / [ ] Reverse — **#51** Collapse toggle kept (not removed) — absolutely pinned right, opacity:0, revealed on sidebar hover OR button focus-visible; logo recentered by dropping brand-ho
- [ ] Accept / [ ] Reverse — **#52** "Weekly digest" removed from the dashboard Tools row when it became an Action card (avoid duplication); loadFiles() KEPT (guarded) after the Files-tab removal
- [ ] Accept / [ ] Reverse — **#53** **Chunker (P1, 2026-07-18):** the emitted chunk prompt's MAPPING CONTRACT (verbatim rows + byte-exact producedNames) is appended MECHANICALLY by chunk.js after 
- [ ] Accept / [ ] Reverse — **#54** Chunk-engine modules are re-required per request without the require cache (freshChunkEngine)
- [ ] Accept / [ ] Reverse — **#55** Mapping "find-first" runs against a curated attested-style inventory (style-inventory.json) because the design-system export the doc references (design-system-e

(55 entries; full text in brain/design/judgment-calls.md)

## B. This program's autonomous calls (Steps-2+3, 2026-07-18)

- [ ] Accept / [ ] Reverse — Reconciliation A — mapping find-first runs on a curated attested-style inventory because design-system-export.md does not exist; unmatched → explicit CREATE rows (also judgment-call #55)
- [ ] Accept / [ ] Reverse — Reconciliation D — "[LOCKED] tag" implemented as stub-removal detection (decisions.md has no literal tag)
- [ ] Accept / [ ] Reverse — Reconciliation E — P6 raises the real own-table Pattern-A stub; "User company field" is already LOCKED 2026-07-16
- [ ] Accept / [ ] Reverse — Reconciliation F — prototype live-reload is parent-driven mtime polling + ?v= cache-buster (sandbox constraint); prototype bar is parent chrome
- [ ] Accept / [ ] Reverse — Reconciliation J — dashboard Tools strip survives in Row 4 (navigation, not introspection)
- [ ] Accept / [ ] Reverse — Reconciliation C — no `brain` CLI wrapper exists; chunker ships as node brain/engine/chunk.js + endpoints + UI
- [ ] Accept / [ ] Reverse — P1 — verbatim MAPPING CONTRACT appended mechanically after model output (judgment-call #53)
- [ ] Accept / [ ] Reverse — P1 — freshChunkEngine per-request require-cache bust (judgment-call #54); gen/assemble/guard left cached (pre-existing behavior, flagged not changed)
- [ ] Accept / [ ] Reverse — P2 — labels use the system font stack; Inter Tight not offline-loadable in a zero-dep app (figures are JBMono per spec)
- [ ] Accept / [ ] Reverse — P2 — Next-build-step dashboard card retired (superseded by the board; plans data still served)
- [ ] Accept / [ ] Reverse — P2 — checklistRows parse = first-status-cell + last-occurrence-wins (append-only table with embedded pipes)
- [ ] Accept / [ ] Reverse — P4 — ENV-LIMITED stop, no bridge code built (CLI Unauthorized; program forbids mocking)
- [ ] Accept / [ ] Reverse — P5 — pilot = casino_property_settings (smallest real prototype mapping to a real module); Coming_Soon rejected as module-less
- [ ] Accept / [ ] Reverse — P5 — pilot flag rulings recorded as resolver=vlad per program 5.1: f1–f5 legacy --status-* → canonical tokens · f6 22px → --radius-pill · f7/f9 → status tints · f8/f10 APPROVED AS LITERALS (no canon border-tint tokens — candidate tokens noted) · f11/f12 → --shadow-modal/--shadow-dropdown
- [ ] Accept / [ ] Reverse — P5 — NO fake BP report in the pilot; trail ends at sent + open follow-up (PILOT.3 ENV-LIMITED)
- [ ] Accept / [ ] Reverse — P6 — combined audit prompt regenerated via engine (retrieval evaluated first, <0.8); report-dependent steps ENV-LIMITED, todo carries the copy-path steps
- [ ] Accept / [ ] Reverse — P7 — smoke subset limited to server-runnable checks (headless browser deliberately not an app dependency); browser rows stay on-demand via the rig
- [ ] Accept / [ ] Reverse — P7 — state-audit contradiction thresholds: done&&reds>=2, roadmap/not-started&&greens>=5 (widened after the planted-mismatch test caught the first rule sleeping)
- [ ] Accept / [ ] Reverse — P7 — scheduler uses the app's own watcher pattern, not /schedule routines (the shipped mechanism)
- [ ] Accept / [ ] Reverse — P8 — handoff push failure surfaced verbatim (headless session has no GitHub credentials; push works interactively)

## C. Retrieval-transparency events (brain/buildprint/generated/ scan)

- (none on record — every archived prompt was generated; retrievalCheck evaluated each time and never crossed the 0.8 threshold)

## D. Quarantines

- (none — no checklist row hit the 3-cycle quarantine cap in any loop; the 2026-07-18 loops closed 0-FAIL twice)
