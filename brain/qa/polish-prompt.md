# Polish-pass prompt (verbatim, authoritative) — received 2026-07-18 after the 10-phase program

Claude Code Prompt — Executive polish pass: tree minimalism, real executive detail, header/kanban/sidebar/window-policy fixes

The 10-phase program is done; this is a scoped refinement pass on what my eyes caught. Theme of the whole pass: minimalism and executive readability — I am not a programmer reading this app; every screen must be clean and straight to the point. All per `CRS-design-system.md`, both themes. Parallel read-only recon per area first, single-writer edits, independent verification subagent, micro-loop max 3 cycles, checks appended to the master checklist. Commits: `polish: <task>`.

## Task 1 — Progress Tree rows: strip to the bone
New collapsed row = drag-anywhere + number + title + tag + subtle % + status word.
1. Remove: ▲▼ up/down buttons, ▶ expand triangle, ⠿ drag handle icon, note/subtitle line, in-row progress BAR.
2. Progress = number only: "63%" (JBMono, Caption, --text-muted) before the status word — from the DoD count; the 5/8 chip goes too.
3. Whole row = drag surface (grab cursor, no icon): lifted row scales ~1.01 + soft shadow, siblings animate apart 160ms ease, drop settles ease-out; keyboard reorder stays via the row ⋮ menu; nothing visibly added.
4. Expand = click row (not mid-drag); status cycling in hover ⋮ only. Row height tightens; current-focus accent bar stays.

## Task 2 — Module detail: executive means EXECUTIVE
1. Top strip: name + status word + % + ONE plain-English state sentence GENERATED from DoD data — no ✅🔴 emoji, no backticks, no "(Full table in source; unchanged.)".
2. "What's left" FIRST: unchecked DoD items + plain notes; checked collapse to one line ("6 of 8 complete ✓ — show").
3. Facts translated: data model + permissions as clean §20.6 tables, developer artifacts STRIPPED: no backtick chips, no internal_value column by default ("Show technical columns" toggle reveals), plain field names, VERIFY/warnings = single amber callout line.
4. Raw view untouched; everything Executive hides stays reachable in Raw.

## Task 3 — Header hygiene
1. Two theme toggles exist — one dies. Recon which is canonical (wired to dark_theme persistence); remove the duplicate + dead code.
2. Claude-connection chip has a yellow border — diagnose why; fix: neutral surface, status via dot color only, no colored borders in any state except the popover's own semantics.

## Task 4 — Map kanban: finish the modernization
The map-board kanban is still legacy-styled — Phase-K spec didn't land there or a second legacy instance survived. Recon which; bring THIS kanban to the approved spec: control in map toolbar (§20.1), board as right-side drawer, CRS card language, §2.11 badges, hover→map-node accent routing edge, both themes. If two kanban implementations exist, ONE survives — delete the other, grep-proof.

## Task 5 — Sidebar conversations: pins, menus, identity
1. Pinned section at top; pin/unpin per conversation; persists; filled pin on pinned.
2. Delete button → ⋮ menu (sidebar-hover style): Pin/Unpin · Rename · Delete (confirm §5); nothing destructive exposed.
3. Type icons: 16px leading icon — plain chat vs distinct BP mark ("›_"-consistent terminal glyph) for conversations that ACTUALLY executed Buildprint CLI actions (from history, not title). Legend line in sidebar footer if needed — one Caption line max.

## Task 6 — Window policy: popups are for FILES only
Documents/images → popup windows; every app SURFACE (Progress Tree, focus/module detail, dashboard panels, wishlist, QA views, prototypes panel) → full working area with "← back" (top-left, existing pattern). Recon every smartOpen/navigation call site; reroute violations both ways. ONE routing function decides by target type — no per-site improvisation.

## Verify (verification subagent, real browser, BOTH themes)
1. Tree row exactly: number · title · tag · % · status; hover reveals only ⋮; whole-row drag w/ lift/scale/shadow/sibling-animate/settle; reorder persists; row-click expands.
2. Module detail: zero emoji, zero backticks, zero raw md artifacts in Executive (DOM grep); What's-left first; technical toggle works; Raw unchanged.
3. Header: exactly ONE theme control (grep dead code gone); connection chip no colored border in connected/disconnected/error (getComputedStyle all three).
4. Map kanban to spec; one kanban implementation (grep).
5. Sidebar: pin two → section persists reload; ⋮ holds all actions, delete confirms; BP icon from real history, plain chat without.
6. Window sweep: every nav target once — files → popup, surfaces → full area + back; no exceptions.
7. Zero console errors; append POLISH.1–7. STOP and report: per-task before/after one-liners, routing call-site table, root causes (yellow border, duplicate toggle).
