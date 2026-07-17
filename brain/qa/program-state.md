# Program execution state

- **Date:** 2026-07-17
- **Context:** Gate run before Phase execution. Full audit of phases P1–P11 against repo state (commits, files, code refs). This file is the master record of what is DONE, what is PARTIAL, and what still has to run.

---

## P1 — promptgen

| task | verdict | evidence |
|---|---|---|
| brain/buildprint/PROMPT-STANDARD.md exists with structure rules | DONE | Commit 7f6e2ef. Guardrail header L14 / footer L29; Attachments L20; Task 0 L24; verify/no-anchoring §4 L81-84 + flags L38-40; [NEG] split L46 + §5.3 L109; evidence discipline L42; fix-attempt cap (2) L122; coverage checklists §3 L58; report formats incl fenced machine-JSON L106-107; self-check §6 L117-122 |
| templates/{audit,edit,pilot,reply}.md exist and implement the standard | DONE | All four in brain/buildprint/templates/ (commit 9dd7758); each header states 'Implements PROMPT-STANDARD.md'; Guardrail/Task 0/[NEG]/confirm-refute markers present (audit 6 hits, edit 2, pilot 2, reply 1 — reply is a rulings format) |
| CLAUDE.md Prompt generation section wiring | DONE | CLAUDE.md L128 '### Prompt generation (Buildprint)': classify→template, state as confirm/refute questions, consistency check, save to brain/buildprint/generated/YYYY-MM-DD-<scope>.md, retrieval transparency, ingest offer; §6 self-check reference |
| Sample generated prompts in brain/buildprint/generated/ | DONE | 5 files dated 2026-07-16 (commits 3bce865, 862a149, a615ec4) — covers all four templates |

**Phase verdict: DONE**

## P2 — explorer-base

| task | verdict | evidence |
|---|---|---|
| Data layer — server file API with safeRepoPath guards | DONE | crs-brain/server.js: safeRepoPath :892; /api/files :1521, /api/file :1550/:1556, fs/create :1571, rename :1585, move :1595, duplicate :1610, copy :1618, delete :1633 — all guarded. Commit de044c9 |
| Explorer shell — sidebar tree, toolbar, list+grid, status bar, empty/loading | DONE | index.html: #explSide :1254, Quick access :2440 (commit 3d6cb9a); explBack/Fwd/Up :1232-1234, breadcrumb :2407, view toggle :1245/:2419, search :2420; #explStatus :1256; empty state :718/:2456; skeletons :2450. Commit da9def8 |
| Navigation & selection — dblclick, multi-select, marquee, keyboard, history | DONE | dblclick :2507; ctrl/shift select :2500-2503; marquee :690/:2495 (223170c, hardened 63267a4); explKey :2866-2892 + type-ahead EX.ta :2891; history EX.hist/hi :2314-2316 |
| Context menu per-target with clipboard ops | DONE | contextmenu :2516; per-target builder :2692-2727; Cmd/Ctrl C/X/V in explKey :2874-2876, EX.clip :2122. Commit 338e132 |
| Drag & drop move with spring-loaded folders | DONE | explDragStart :2528/:2551; drop targets pane/sidebar/breadcrumb :2529; /api/fs/move :1595; spring-loaded :2569. Commit bcbe659 |
| Search — current-folder + recursive | DONE | filtered :2304, recursive walk :2306, explToggleRecursive :2402, path meta column :2458. Bug fixed in 87082ad |
| Inline create / rename / delete | DONE | explNew :2749, F2 rename :2871 + .expl-rename :2867, explDelete :2834. Fixes 367aba5, 633641f, 5ad402e |
| Type icons, sort, OS polish | DONE | Icon module 023cc22/ef5f0b6/3c86f51 + 6e7821e; explSortCmp/explDoSort :2294-2318, sortable headers :2454-2455, localStorage :2121; polish bcbe659 + fcfbf7b/012496f/8bc5a4d/bd03458 |

**Phase verdict: DONE**

## P3 — explorer-fix1

| task | verdict | evidence |
|---|---|---|
| 1 dblclick opens folders/files | DONE | Commit 367aba5; index.html:2507 handler; in-place selection painting explPaintSel :2485 (root-cause fix) |
| 2 rename input stable on inner click | DONE | Commit 367aba5 (shared root cause); :2507 excludes .expl-rename; regression re-fixed in 5ad402e |
| 3 New file ▸ typed submenu with auto-suffix | DONE | Commit 633641f; :2690-2691 newFileSub (md/txt/json/html), CSS :732-733; server-side auto-suffix |
| 4 search fixed (current + ALL recursive) | DONE | Commit 87082ad; :2122 EX.recursive, :2304 branch, :1237-1239 search box |
| 5 flat selection styling | DONE | Commit fcfbf7b (.sel → .xsel); :671-672 flat accent-tint only |
| 6 explorer window drag+resize+persist | DONE | Commit 8825b52; :595-605 resize handles; :2160 explSaveRect → sessionStorage exWinRect, restore :2240 |
| 7 toolbar 32px alignment | DONE | Commit c6a0d8b; :611 width/height 32px, radius 8px |
| 8 sidebar collapsible sections + Favorites | DONE | Commit 3d6cb9a; :2422-2426 explFavs (localStorage exFavs), :2430 explToggleSection, :2509 header click |
| 9 blacklist visibility + modern type icons | DONE | Commit 6e7821e; server.js:522 DENY_EXT applied :919; color ticon :2459/:2464 (later replaced by approved module 023cc22–3c86f51) |
| 10 hover previews anchored w/ delay + folder previews | DONE | Commit 91d65f8; :2894 quick-look, :676 .peeking, :736 anchored card CSS |
| 11 document popup (md/code/csv/images/pdf/html) | DONE | Commit 8e90c46; :2354 openDocPopup, :2320 explOpenFile routes html → sandboxed overlay |
| 12 multi-window ExplorerWindow (cap 4, drag between) | TODO | No 'explorer-fix: 12' commit; no multi-window code (grep empty). Session log 9740a71: 'NOT shipped: item 12 multi-window — singleton refactor exceeds safe scope'. Superseded by P9.3 OS window system |
| 13 undo toast 6s for delete/move/rename | DONE | Commit bd03458; :2821 toastUndo, 6000ms :2825; wired move :2581, rename :2787, delete :2836-2848 |
| 14 properties panel | DONE | Commit bd03458; :820 CSS, :2850 popup code, menu items :2710-2711; ctime via walker |

**Phase verdict: PARTIAL — item 12 multi-window remains (documented deferral; subsumed by P9.3 OS window system)**

## P4 — explorer-fix2

| task | verdict | evidence |
|---|---|---|
| 1 marquee pointer-capture + clamped rect + no leak/stuck | DONE | Commit 63267a4; :2627-2671 setPointerCapture :2644, clamp :2646-2648, cleanup on pointerup/cancel :2666-2670; body.no-select :691 |
| 2 Ctrl/Cmd+A focus-scoped per window | DONE | Commit d7760eb; :2340-2350 popup-scoped select-all, inputs excluded; box tabindex=-1 :2367; pane Ctrl+A visible items only :2869 |
| 3 Windows edge-snap | DONE | Commit 012496f; :2255-2263 zones + .expl-snapprev :692; explSnapTo/explUnsnapRestore :2170-2172; proportional unsnap :2249-2254; work area #centerCol :2161-2168 |
| 4 window controls on explorer AND doc popup + minimized chip bar | DONE | Commit 8bc5a4d; explorer :1250, explFsToggle :2205-2214, max :2198-2200, min :2193-2197; dp controls :2360-2365, :2227; #minBar :707, :2177-2192; fresh-state reset :2144-2146, :2358 |
| 5 md render colors per tokens | DONE | Commit 7a89b38; :783-792 .dp-md token audit block (links, blockquote, hr, table grid, thead, code borders); base .md code :433 |
| 6 popup action button hover states | DONE | Commit 7a89b38; :774-776 ghost style, hover panel2+primary+line; pressed line3 + 160ms |
| 7 custom cursor/fallback + caret accent + marquee tint | DONE | Commit 7a89b38; :715 SVG cursor + fallback, :716 caret-color accent, :690 marquee accent-tint + accent border |
| 8 rename extension mask | DONE | Commit 7a89b38; :2762-2790 last-dot split (dot>0 → dotfiles whole-name), basename input + static .ext-ghost, ext reattached on commit |

**Phase verdict: DONE**

## P5 — explorer-fix3

| task | verdict | evidence |
|---|---|---|
| 1 left-click empty space dismisses context menu without marquee | DONE | Commit 2794980; :2636 EX._menuDismiss, :2496 trailing click guard; doc-level closer + scroll/drag/Esc paths |
| 2 menu hover = bg-tertiary + text-primary, Delete error-tint | DONE | Commit 0e10e4a; :726 hover/focus/.kbf = panel2+primary; delete = error tint + danger; arrow-key nav added |
| 3 rename commits on outside click | DONE | Commit 5ad402e; :2781-2814 EX._renameCommit + CAPTURE pointerdown; empty+outside reverts silently; Esc cancels |
| 4 preview-card md link colors at real source (.pk-md) | DONE | Commit cf28e25 full .pk-md token pass; :748 .pk-md a accent2 |
| 5 fullscreen one click from any state | DONE | Commit 2a494d3; :2208 explIsFullscreen rect-truth, :2210 enters from any state; openExpl resets fs/snap/min |
| 6 minimized chips offset right of app sidebar (live) | DONE | Commit 2a494d3; :2177-2185 placeMinBar anchored to explWorkArea x+6, ResizeObserver + resize listener |
| Session log in BRAIN_APP_PROGRESS.md | DONE | Commit 7815bdf; BRAIN_APP_PROGRESS.md:59 |

**Phase verdict: DONE**

## P6 — os-interop

| task | verdict | evidence |
|---|---|---|
| 1 server endpoints: /api/upload + /api/zip + /api/raw | DONE | Commit 0c02dc5. server.js:1648-1674 upload (safeRepoPath :1660, auto-suffix :1663-1664, 100MB cap :523/:1658/:1666, blocked dirs :1656-1657); zip :1675-1732 (single+multi, guards :1697-1699, store-only writer, attachment :1730); raw :2527-2539 dl=1 :2539. Deliberate deviation: one raw-body request per file, not multipart (comment :1645-1647) |
| 2 drag IN from OS (files + folders, overlay, progress, partial-failure) | DONE | Commit 504b2ca. explIsExternalDrag :2558, target highlights :2563, explDrop→explUploadBatch :2574-2579, overlay :2583-2587, webkitGetAsEntry traversal (1000-file/depth-32 caps) :2590-2604, progress toast + Cancel :2607-2613, partial-failure toast :2622 |
| 3 paste IN (files, screenshots as image.png, internal fallback) | DONE | Commit 7f27a15. :2795-2806 paste handler; screenshot 'image.png' :2805; internal explPaste unchanged :2806; input scoping :2800; composer paste :3043 |
| 4 drag OUT via DownloadURL (Chromium feature-detect) | DONE | Commit 7f27a15. :2538-2548 window.chrome detect :2541; dir → zip :2545; file → raw dl=1 :2546-2547; multi → selection.zip :2548 |
| 5 context menu Download / ZIP / Copy content / Copy image | DONE | Commit 7f27a15. Menu items :2704-2709 (copyimage gated on ClipboardItem); handlers :2731-2740 |

**Phase verdict: DONE**

## P7 — icons

| task | verdict | evidence |
|---|---|---|
| 1 public/icons.js approved verbatim generator | DONE | Commit 023cc22. Two tiers (glyph-row <40 L56, badge-tile L62), 14 TYPES L11-17, EXT2TYPE L19-26, _cache L48; loaded index.html:1271. 2026-07-17 compliant variation: CSS-var sheet/fold/line colors with original hex fallbacks (icons.js:9, light pairs index.html:24) |
| 2 every render site swapped, old icon code deleted | DONE | Commits ef5f0b6 + 3c86f51. List 20/grid 56 :2130-2134, favorites 16 :2444, search reuses templates :2459/:2464, hover card 20 :2923, kid rows 16 :2931, popup title 20 :2359, properties 28 :2864, peek fallback 56 :2937, download card 64 :2372, dashboard 20 :2100, doc chip 16 :2229. Zero grep hits for EXT_COLOR/_KIND_COLOR/_KIND_MARK/fileKind. Generic #i-doc-sm remains only on non-explorer surfaces (out of scope) |
| 3 consistency (fileIcon sole resolver, ext-less → generic, folders untouched) | DONE | :2127-2129 + grep — fileIcon/ICON_EXT2TYPE only ext→icon logic; ext-less → 'gen' (icons.js:50-51); folder icons untouched :2436/:2440/:2444/:2131 |

**Phase verdict: DONE**

## P8 — sounds-wishlist

| task | verdict | evidence |
|---|---|---|
| A sound system (24 defs, engine, 24 WAVs, endpoints, settings tab, migration) | DONE | Commit 35e10d7. sounds-synth.js 24 defs, sounds.js engine, data/sounds/ 24 WAVs; server.js:2079 list, :2086 save (guarded), :2516 /sounds/ route; settings tab index.html:3558/:3585/:3594; OLD_SOUND_MAP migration server.js:285 |
| A connectivity watcher — dual heartbeat + header dot | DONE | :1113 #connDot; :3517-3537 connDot/setNet/setSrv, 30s interval, 2-fail debounce, online/offline listeners; /api/ping |
| B forum digest + release-notes watcher (server-side, stamps, cross-check, check-now) | DONE | Commit c95b62a. server.js:2707-2799 watchers; state.json forumSeenIds/relnotesCheckedAt; digest files exist; decisions.md cross-check + warning notification; POST endpoints :2424/:2428; buttons :3567 |
| B docs conditional-style-swapping.md + global-expressions.md | DONE | Both in brain/bubble/ (commit c95b62a, B3/B4) |
| C map reference edges | DONE | Commit 53a56c6. map.html:530-539 REF_DOCS/refEdges/refDangling; :327/:738 DANGLING REFERENCES panel; :747 edge visibility toggle |
| D task queue with limit auto-resume | DONE | Commit dcab5ba. server.js:2886-2979: QUEUE_FILE :2894, blocked-limit + resumeAt reset+2min :2942-2945, scheduleQueueResume :2959-2970, boot requeue :2972-2979; queue.html exists |
| E read-only issue checker | DONE | Commits ca0e24e + c632793/f2b754d. server.js:2806-2870: issue-reports dir :2811 (2026-07-17.md exists), read-only TEST-branch check, proposals-only header :2853, warning notification :2869 |
| Wishlist statuses | DONE | wishlist.json: w-forum/relnotes/styleswap/globalexpr/loops/refgraph=done, w-bugfix=in-progress, w-orchestration present (idea) |

**Phase verdict: DONE**

## P9 — os-grade

| task | verdict | evidence |
|---|---|---|
| P9.0 inventory artifacts | DONE | All four in brain/design/ (repo-root brain/), commit 263a419. judgment-calls.md has uncommitted edits |
| P9.1 tokens.css + alias layer + 7 pages + bootstrap + theme seg + cross-window sync | DONE | Commit 26399bc. tokens.css in public/; all 7 pages link it; data-theme bootstrap :3455; storage-event sync :3458-3459; light seg :243; alias layer per judgment-calls.md #8 |
| P9.2 index.html component sweep | PARTIAL | Present: --accent-glow focus rings :152+, crsConfirm :1330 (used :1518/:2836), themed --folder-icon/--hl-* :17/:23, 16 var(--radius-*), 55 tokenized vs 9 literal transitions. Missing: hardcoded rgba(0,0,0 scrims/shadows at index.html lines 479, 588, 821, 861 (lines 18/21/25 are token defs, acceptable) |
| P9.2 standalone-page sweeps | PARTIAL | IN FLIGHT: uncommitted working-tree mods on all six pages (map 390, tree 79, activity 68, wishlist 73, queue 50, memory 40 lines); no 'os-grade: 2' commit yet |
| P9.3 OS window system for documents | TODO | docpop still singleton modal :766-775; no cascade/spawnWindow code; PROGRESS.md:73 confirms deferral |
| P9.4 editors (Tier1 edit+save, JSON validate, CSV grid; Tier2 vendored; Tier3 view-only) | TODO | No vendor/ dir; no SheetJS/pdf.js/mammoth, no Ctrl+S, no line-number editor; xlsx/docx/pdf are download/embed only :2370/:2936 |
| P9.5 image viewer (zoom/pan/rotate/filmstrip) | TODO | No viewer code; images open as plain <img> in doc popup |
| P9.6 verification artifacts (compliance matrix, honest-limits report) | TODO | Not found anywhere; no os-grade commit beyond 26399bc |

**Phase verdict: PARTIAL — remains: finish P9.2 (commit standalone sweeps as 'os-grade: 2', tokenize 4 hardcoded scrims in index.html), P9.3 window system, P9.4 editors, P9.5 image viewer, P9.6 verification artifacts**

## P10 — notify-sync

| task | verdict | evidence |
|---|---|---|
| A notification registry + notify(typeId) router | TODO | No public/notify-registry.js. Current notify(o) index.html:3491 routes only via 2 global prefs :3493-3496; 14 call sites; no per-type registry or channel switches |
| B bell center v2 | PARTIAL | Exists: renderInbox :3505-3509, Mark read :3513, Clear :3514, unread dots (NCOLOR :3504), JSONL store server.js:301-320. Missing: 200-cap FIFO (never trimmed; window=100), clickable rows/target payload, DND (grep=0) |
| C Settings Notifications tab v2 | PARTIAL | Current :3573-3582: In-app, global Sound, Email only; Sounds tab has per-EVENT (7) dropdowns+Test. Missing: per-type table with 3 channel switches, per-type test, DND master, banner duration slider |
| D1/D2 forum digest + release-notes sync REAL server-side | DONE | server.js runForumDigest :2743 / runRelnotesCheck :2761 — real fetch to forum.bubble.io :2727-2735; files written via appendDigest :2737; stamps saveState :2716 + snapshot; decisions cross-check :2775-2786; gate :2794-2804; manual endpoints :2425-2429 wired :3551/:3565-3566. Digest commits 846e785, 5fd1c1b |
| D (older) Claude-powered runBubbleDigest + weekly maybeSyncManuals | DONE | runBubbleDigest :2680-2690, maybeBubbleWatch :2691-2706, UI toggle; maybeSyncManuals :2601-2622 runs scripts/update-manuals.sh weekly, stamps manualsCheckedAt |
| D3 manual sync | DONE | Exceeds spec via full mirror: brain/bubble 590 files + INDEX.md/INVENTORY.md; manualsCheckedAt ~2026-07-14. Bounded 15-20 page index superseded |
| D4 UI truth for sync | PARTIAL | True-outcome toasts exist :3551-3555 (counts, error path, warning level). Missing: per-source last-sync timestamps in UI (grep CheckedAt=0 hits), no spinner during checks |

**Phase verdict: PARTIAL — remains: A notification registry, B bell v2 completion (200-cap FIFO, clickable rows, DND), C settings tab v2 (per-type table, DND master, duration slider), D4 last-sync timestamps + spinner**

## P11 — kanban-loop

| task | verdict | evidence |
|---|---|---|
| map.html Board/Kanban control | DONE | map.html:263 #boardBtn top-right toolbar; bottom drawer .board :68-75 (38vh, 54vh mobile :236), tabs/segment/search/chips :266-277, renderFiles :1391+; mobile embed :237-248 (7047404); shell Kanban view (394ccae, 37d914b) |
| Kanban hover highlights map nodes | DONE | map.html:1427-1430 mouseenter sets matches={path, cluster} + .hpv preview :1372-1386; mouseleave restores; disabled on touch :220 |
| brain/qa/master-checklist.md exists | TODO → resolved by this run | Was empty at audit time; created 2026-07-17 alongside this file |
| brain/qa/program-state.md exists | TODO → resolved by this run | Was empty at audit time; this file |
| Prior qa-loop commits | TODO | None in git log (expected absence confirmed); first qa-loop commit should land with these two files |

**Phase verdict: PARTIAL — QA files created by this gate run; qa-loop commit still needs to land, then the loop itself runs against master-checklist.md**

---

## Execution plan — what still runs

Only PARTIAL/TODO work, in dependency order:

1. **P11 qa-loop commit** — commit brain/qa/program-state.md + master-checklist.md (this run's output); unblocks the QA loop itself.
2. **P9.2 finish** — commit the in-flight standalone-page sweeps (map/tree/wishlist/queue/memory/activity) as 'os-grade: 2'; tokenize the 4 remaining hardcoded rgba(0,0,0) scrims/shadows in index.html (lines 479, 588, 821, 861); commit judgment-calls.md working-tree edits.
3. **P9.3 OS window system** — multi-doc windows, link-spawned windows, cascade, focus-existing, window-open API. Also closes P3 item 12 (multi-window deferral).
4. **P9.4 editors** — Tier1 edit mode + line numbers + Ctrl+S, JSON validate, CSV grid; Tier2 vendored SheetJS/pdf.js/mammoth (no CDN); Tier3 honest view-only. Depends on P9.3 window shell.
5. **P9.5 image viewer** — zoom/pan/rotate/filmstrip. Depends on P9.3 window shell.
6. **P9.6 verification artifacts** — compliance matrix + honest-limits report in brain/design/. Runs last in P9; depends on 2–5.
7. **P10.A notification registry** — public/notify-registry.js with typed channels + notify(typeId) router. Foundation for 8 and 9.
8. **P10.B bell center v2 completion** — 200-cap FIFO trim, clickable rows carrying target payload, DND indicator. Depends on 7 (DND + per-type routing).
9. **P10.C Settings Notifications tab v2** — per-type table (banner/sound/bell switches + sound dropdown + test), DND master, banner duration slider. Depends on 7.
10. **P10.D4 sync UI truth** — per-source last-sync timestamps rendered in Settings, spinner during checks. Independent; can run any time.
11. **QA loop execution** — run master-checklist.md rows (all UNTESTED), update statuses/evidence, feed failures back into fix passes.

---

## Resumed on Windows — 2026-07-17

Four parallel recon subagents (handoff brief · program-state/checklist audit · commits-vs-claims · environment check) merged into this plan.

**Resume point confirmed.** The gate audit above (P9/P10/P11 PARTIAL) is SUPERSEDED by the later same-day `program:` commits — the resume file `resume-2026-07-17.md` is accurate against the commit record: P1–P10 + P11.K done and committed; qa-loop cycle-1 complete (9177b95, 72/82 PASS, 5 fixes); cycle 2 was interrupted with nothing recorded. The queued ptree redesign is now CLOSED — shipped on Windows as `0e5701f` (Executive ⇄ Raw renderers, row progress bars, deep links, single-app links; PTREE.1–7 appended, all PASS).

**Commit-vs-file discrepancies:** none of substance. Two notes: (1) post-handoff commits 5a0636f/6ca3e25 (forum digest, issue report) were produced by the LOCAL Windows server's watchers on first run tonight, not by the Mac tail — expected per the resume file's duplicate-baseline warning; (2) the issue checker on this machine degraded gracefully with `spawn buildprint ENOENT` (CLI not installed here — install/link in progress).

**Checklist truth (start of cycle 2):** 64 rows total — 42 PASS (c1) + 7 PASS (ptree) tagged wrongly in older counts; authoritative split: PASS 49, UNTESTED 13 (P7.1–7, P8.6–7, P11-kanban-loop.1–4), ENV-LIMITED 5 (P1.3, P6.1/3/4/5), FAIL 4 (P4.5, P9.3, P11K.9 — plus P9.8/P11.5 already re-proven PASS by the c2 static verifier). No quarantine list exists yet.

**Environment (Windows):** Node v24.16.0; node-pty Windows binaries present; `crs-brain/start.bat` exists; app running + serving this repo on :4317; git identity + push verified (local was 6 ahead); bash only via Git Bash (`scripts/update-manuals.sh` is the sole .sh dependency); PowerShell 5.1.

**Cycle-2 execution model (per Vlad's directives, 2026-07-17):** dedicated non-throttled Chrome rig (headless=new via puppeteer-core on system Chrome) — the in-session browser pane is background-throttled (hidden renderer: no rAF, no screenshots, stale computed styles) and MUST NOT be used for verification. Rig sanity-proven on a known-PASS row before trust. Parallel verifier fan-out, both themes; statuses written to master-checklist.md incrementally as each verifier returns; rows the rig can't prove → ENV-LIMITED with exact reason, collected into a "needs-eyes run" list for Vlad. Windows-portability sweep (3 parallel agents: paths/traversal, spawn/shell, CRLF) runs fixes BEFORE verifiers so verified code = shipped code. Then close cycle 2: counts, delta vs c1, cycle-3 decision (goal: two consecutive clean runs).

## Cycle 2 — CLOSED (2026-07-17), CLEAN

**Rig:** puppeteer-core driving system Chrome `headless:'new'` with `--disable-background-timer-throttling` + siblings. Sanity-proven before trust (visibilityState visible, rAF fires, real screenshots, `getComputedStyle` recomputes after class-toggle — the exact things the in-session pane failed). Shared harness `runBothThemes` (dark+light, a row passes only if it passes in every theme). Verification fanned out to 6 fresh-context subagents (V1 explorer base/nav · V2 explorer polish/fix3 · V3 fix2/os-interop/icons · V4 os-grade/notify · V5 kanban/USR · V6 sounds/conn/map/queue/sync) + 1 static verifier for non-browser rows; the orchestrator (single writer of this file + the checklist) applied each batch incrementally.

**Result: 98/98 rows carry `2026-07-17 c2`. 91 PASS · 7 ENV-LIMITED · 0 FAIL · 0 UNTESTED.** This is a CLEAN run (ENV-LIMITED excluded from the goal and listed below).

**Delta vs cycle 1** (c1 was 72 PASS / 5 FAIL / 5 ENV-LIMITED / rest untested over the then-82 rows): every c1 FAIL is now PASS — P4-explorer-fix2.5 (md render tokens), P9-os-grade.3 (4 hardcoded scrims now tokenized to `--overlay`/`--veil`), P9-os-grade.8 (compliance-matrix + honest-limits present), P11-kanban-loop.5 (qa-loop commit landed), P11K.9 (MENU panel positions above the bottom sheet). All 13 previously-UNTESTED rows (P7 icons, P8.6 queue, P11-kanban-loop.1–4) are now resolved. No regressions.

**7 ENV-LIMITED = the "needs-eyes / needs-auth" list:**
- P1-promptgen.3 — live Buildprint prompt generation (needs an interactive/authed run).
- P8-sounds-wishlist.7 — read-only issue checker (needs `buildprint link <token>`; CLI installed, not linked).
- P6-os-interop.1 — upload >100 MB body (413 path not exercised; synthetic guards pass).
- P6-os-interop.3 — real Finder drag-IN folder-structure/progress (synthetic DataTransfer verified).
- P6-os-interop.4 — real OS clipboard paste + screenshot→image.png (synthetic paste verified).
- P6-os-interop.5 — real drag-OUT to Desktop / non-Chromium skip (DownloadURL code-path verified).
- P8-sounds-wishlist.6 — queue usage-limit-failure + server-restart resumeAt persistence (can't kill the running server; enqueue + blocked-limit banner + boot-requeue code path verified).

**Windows-portability fixes committed BEFORE the verifiers ran** (commit `e9c6120 resume: windows-portability`), so cycle 2 verified shipped code: `/api/file-binary` backslash-traversal hole into `.git`/`node_modules` closed (re-probed 403); `runBuildprint`/`maybeSyncManuals` Windows-safe spawns; `bpSyncDiff` surfaces sync failure; `tree.html` md renderer CRLF-tolerant; repo-root `.gitattributes` added.

**Cycle-3 decision: REQUIRED for the two-consecutive-clean-runs goal.** The ptree change reset the consecutive-green counter, so cycle 2 is the *first* clean run after it. Cycle 3 must be a full re-verify against UNCHANGED code (no code edits between c2 close and c3). The verifier scripts are persisted in the rig dir and re-executable in fresh processes; if c3 is also 0-FAIL/0-UNTESTED the goal is met and the program's QA loop closes.

## Cycle 3 — CLOSED (2026-07-17), CLEAN — QA GOAL MET

**Method:** re-executed all 8 persisted domain verifier scripts (authored by the independent c2 subagents) in fresh Node processes against the live app, stamped `2026-07-17 c3` (harness reads `QA_RUN`). No code changes between the c2 close and c3, so c3 verifies the identical shipped tree. One domain (fix2/os-interop/icons) whose old script hit a self-timing bug on re-run (`Cannot set properties of null` — a script defect, not an app defect) was re-verified by a fresh independent c3 subagent instead of hand-patching the script; it returned identical verdicts.

**Result: 98/98 rows carry `2026-07-17 c3`. 91 PASS · 7 ENV-LIMITED · 0 FAIL · 0 UNTESTED** — byte-identical status distribution to cycle 2, same 7 ENV-LIMITED rows.

**GOAL MET: two consecutive 100%-clean runs (c2 + c3)**, ENV-LIMITED excluded and unchanged across both. The program's QA loop is closed. The only path back to "dirty" is a future code change, which resets the counter (as ptree did) and requires two fresh clean runs.

**Standing follow-ups (not blockers to the QA close):**
- 7 ENV-LIMITED rows = the needs-eyes / needs-auth list (real-OS drag/clipboard/desktop-drop, >100MB upload, queue restart-persistence, and the two Buildprint-link-gated rows P1-promptgen.3 + P8-sounds-wishlist.7). Buildprint CLI is installed on this machine; it needs `buildprint link <token>` (token from the Buildprint web app, Integrations → CLI) to clear the two auth-gated rows.
- Remaining PROGRAM (non-QA) work per the execution plan above is still open: P9.3/9.4/9.5 were verified as shipped, but P10.A–D registry/bell/settings items and any other PARTIAL/TODO from the gate audit remain for their own build+verify cycles. (The QA loop that just closed is the regression suite over what is ALREADY shipped — it does not itself build the remaining roadmap.)
