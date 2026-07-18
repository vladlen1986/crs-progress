# CRS Brain — App Map (as-built)

Refreshed 2026-07-18 by the Steps-2+3 program's Phase-0 comprehension pass (six parallel
read-only agents over server.js, index.html, brain/engine/, design canon, prototypes recon,
state files). This supersedes the 2026-07-16 Phase-2 compliance-pass version; corrected
disagreements are listed in §8. Line numbers verified 2026-07-18 — they drift with every
edit; trust the function name over the number.

## 0. System overview

- **Server:** `crs-brain/server.js` (~3254 lines), zero-dep Node HTTP on `127.0.0.1:4317`
  (only optional native dep: node-pty for the usage probe). Single request handler ~L1638.
  Repo-jail: `safeRepoPath()` L946. Every JSON save under `crs-brain/data`/`brain/` may
  auto-commit (`autoCommit` L1227, fire-and-forget `git add crs-brain/data brain`,
  disable via `CRS_BRAIN_AUTOCOMMIT=0`).
- **Pages:** `public/index.html` (the SPA monolith, ~4700 lines) + standalone documents
  `map.html`, `tree.html`, `wishlist.html`, `queue.html`, `memory.html`, `activity.html` —
  all seven link `public/tokens.css` and follow `data-theme` (dark+light) since P9.1.
- **Two data planes:** markdown knowledge ledger in repo `brain/` (git-tracked, human+Claude
  authored) · JSON/JSONL app state in `crs-brain/data/` (server-authored; some gitignored).
- **Engine:** `brain/engine/` (gen.js / assemble.js / guard.js / context-map.json) — the
  deterministic Buildprint prompt pipeline (§4).
- **Single-app rule (judgment-calls #37):** nothing opens a browser tab. Tool pages via
  `openPageWindow(url,title)`, documents via `openDocWindow(path,opts)`; external http(s)
  links get ↗ to the system browser.

## 1. Server surface (as-built)

Endpoint groups (all under the single handler; guards noted; line refs from 2026-07-18):

- **Files/explorer:** `/api/files` L1655 (walk, IGNORE_DIRS/DENY_EXT), `/api/file` GET/PUT
  L1684/1690, `/api/file-binary` PUT L1701 (25MB), `/api/fs/*` L1719 (create/rename/move/
  duplicate/copy/delete, badName + safeRepoPath everywhere), `/api/upload` L1800 (100MB),
  `/api/zip` L1827 (store-only, pure-JS CRC fallback), `/api/raw` L2752 (inline bytes,
  `?dl=1` attachment, **no Cache-Control/ETag** — live-reload consumers must cache-bust),
  `/api/open` L2771 (OS default app).
- **Chat:** `/api/chats` L1887, `/api/chat` GET/POST/DELETE L1915/1921/2101. POST = SSE
  stream via `runClaudeStream` L1049 (spawns `claude -p --output-format stream-json`,
  10-min *inactivity* timeout, `--settings BP_GUARD_SETTINGS` deny-hook always on,
  fixed `--allowedTools` L1064). bp:true chats run in the Buildprint workspace cwd
  (`findBpWorkspace` L623, TEST/DEV only) with `BP_PROMPT`. Model fallback only pre-first-
  token (`runClaudeWithFallback` L1200).
- **Buildprint:** `/api/bp/status|track|history|reset|chat` L2108–2160. `bpSyncDiff` L846
  (`buildprint sync` + git diff vs `data/buildprint/last-tracked.txt` baseline; surfaces
  syncErr; **silently resets baseline if the file is corrupt** — known risk).
  `spawnBuildprint`/`runBuildprint` L821/827 (cmd.exe /c on win32; collects {ok,out,err}).
- **Engine:** `POST /api/modules/edit-prompt` L2513 = retrievalCheck → assemble → guard
  (409 `{decisionNeeded:true}` on hit) → one `runClaudeStream` call with
  `engine.GEN_SYSTEM_PROMPT`, cwd=tmpdir → `engine.archive` (Bundle-SHA256 stamped).
  Older non-engine prompt builders still live: `/api/modules/prompt` L2502 (canned),
  `/api/plans/generate` L2568 + `/api/plans/step-prompt` L2616 (build packets).
- **State stores:** `/api/settings` L2223 (deep-merge PUT), `/api/modules` L2471 (PUT
  validates statusVocab, autoCommit), `/api/wishlist` L2439, `/api/ideas` L2544,
  `/api/plans` L2556, `/api/progress` L2399/2804, `/api/memory` L2421,
  `/api/action-log` L2405 (jsonl).
- **Notifications:** `GET/POST /api/notifications` L2310/2316, `/read` L2320, `/clear`
  L2330. Server-side `addNotification()` L342 → `data/notifications.jsonl`, FIFO cap 200,
  read-state in `notifications-read.json`. **No push — the bell polls.** Email is
  best-effort local `sendmail -t` only (smtp.json is written/tested but NOT used by the
  send path — known half-wiring).
- **Sync/watchers:** `/api/sync/status` L2336 (forum/relnotes/issue stamps from
  `data/state.json`), manual triggers `/api/bubble/forum-check|relnotes-check|issue-check|
  digest|refresh` L2632–2657.
- **Queue:** `/api/queue` GET/POST + remove/reorder/run/stub L2666–2707 (§1.2).
- **Misc:** `/api/usage*` L2204+ (node-pty TUI probe hack L456), `/api/sounds/*` L2286
  (WAV store, strict filename regex), `/api/connections/buildprint-link|smtp*` L2346+,
  `/api/attach` L2716, `/api/savedoc` L2730, `/api/auth/*` L2784, `/api/digest-context`
  L2798 (git log + progress for the ephemeral weekly digest), static catch-all L2813
  (PUBLIC_DIR-jailed; index served no-store + client `versionGuard`).

### 1.1 Schedulers (boot-offset setTimeout + hourly setInterval; stamp-gated → restart-safe)

| Watcher | Cadence gate (stamp) | Writes | Line |
|---|---|---|---|
| maybeSyncManuals (90s boot) | weekly, `settings.manualsCheckedAt` | brain/bubble mirror via scripts/update-manuals.sh | L2826 |
| maybeTrackBuildprint (150s) | 20min, opt-out `settings.bpAutoTrack` | brain ledger via Claude ingest; baseline `data/buildprint/last-tracked.txt` | L2864 |
| maybeBubbleWatch (200s) | daily, opt-IN `settings.bubbleWatch` (never run yet) | `brain/bubble/watch/digest.md` | L2915 |
| maybeForumCheck (60s) | daily, `state.json.forumCheckedAt`/`relnotesCheckedAt` | `brain/bubble/forum-digest.md`, `release-notes.md`, notifications | L3028 |
| maybeIssueCheck (240s) | daily, `state.json.issueCheckedAt` | `brain/bubble/issue-reports/YYYY-MM-DD.md` | L3109 |

Relnotes cross-checks new topics against decisions.md terms → `decision-attention`
notification. Forum source = Discourse JSON (forum.bubble.io); the real release-notes page
is unscrapeable, Announcements category stands in.

### 1.2 Task queue (durable, limit-aware — Phase 9 reuses this)

`data/task-queue.json` `{tasks:[{id,title,prompt,status,created,started,finished,log[],
sessionId?,result?}], resumeAt}`. Transitions (runQueue L3156): queued→running→done|failed;
`looksLikeLimit(err)` → `blocked-limit` + `resumeAt=(limitResetMs()||now+30min)+2min` +
`scheduleQueueResume` L3194 (clamped setTimeout → flips back to queued). Boot requeue of
orphaned `running` L3211. Sequential, QUEUE_MAX 20, **no auto-retry** (failed stays
failed). `POST /api/queue/stub` fakes a limit for tests. All queue prompts run with
`BP_GUARD_SETTINGS`. `limitResetMs` treats `usage.json` `resets_at` as epoch SECONDS.

### 1.3 Spawn rules (locked)

`spawnClaude` L986: never `shell:true` (unescaped-arg bug); win32 `cmd.exe /c`. Startup
extends PATH + USER/LOGNAME L25–41 (double-click launches). Same rule in engine's
`callModel` (gen.js:93) and `spawnBuildprint`.

## 2. index.html regions + public APIs

Global singletons: `state` L1481 (tab/chatId/bp/pending/queue/viewGen…), `FS` L2526 (file
REST), `EX` L2541 (explorer), `DW` L2682 (doc windows), `SETTINGS` L4382, `NOTIFS` L4445,
`CONN` L4488, `plansCache` L4103; window-level `SOUNDS`, `NOTIFY_*`, `fileIcon`. Classic
scripts, one shared global scope; helper files are IIFE-wrapped.

### 2.1 Window system (the APIs other code must call)

- **`openDocWindow(path, opts)` L2846 — the single document-open door.** Dedupe by path;
  soft cap 12 (retires oldest clean unfocused); `dwKind` L2872 routes species
  (img/pdf/xlsx/docx/csv/bin/text). `opts:{editSource, ivImgs, ivIdx, rect}`.
  HTML + !editSource → diverts to `openHtmlOverlay(p)` L3328 and returns null.
- **`openHtmlOverlay(p)` L3328 — fullscreen HTML viewer:** `#htmlFull` overlay (z 350)
  with an `<iframe sandbox="allow-scripts" src="/api/raw?path=…">` L3334 — **no
  allow-same-origin**: parent cannot reach iframe DOM, iframe cannot fetch the app origin.
  Chrome bar (✎ edit source → openDocWindow editSource / ↗ apiOpen / ✕) is PARENT chrome —
  any prototype bar must follow this pattern; live-reload must be parent-driven
  (poll mtime, reset `iframe.src` with a `?v=` cache-buster — /api/raw sends no cache
  headers).
- **`openPageWindow(url,title)` L3148** — tool pages as same-origin iframe doc-windows,
  dedupe by url. Used by dashboard Tools + notification targets.
- Chrome engine shared via adapter: `winDragStart` L2640 / `winResizeAttach` L2661; snap
  zones vs `explWorkArea()` (=#centerCol); minimize chips `#minBar` (placeMinBar L2597,
  z 300, DW.z renormalized under 290); fullscreen truth = rect test (`dwIsFs` L2707),
  never a flag. Esc capture order L2750: menu → fs-exit → explorer-fs; Ctrl/Cmd+W closes.
- Explorer: `openExpl(dir)` L2556 (deep-link `#explore=<path>`); `explOpenFile` →
  openDocWindow. Context-menu extension = add `mi()` in `explBuildMenu` L3634 + branch in
  `explAct` L3661. Explorer always shows the FULL repo tree (crsOnly filter deliberately
  not applied, L2780).

### 2.2 Chat

- No client command parser. Enter → `sendMsg()` L2149 → `runJob` → `streamChat` L2254
  (SSE reader; events meta/block/think/delta/done/error…; re-attachable via `state.live`;
  busy → `state.queue`). An "add todo <text>" intercept belongs at the top of
  sendMsg/runJob (client) or in `/api/chat` (server).
- BP mode: `state.bp`, `newBpChat()` L1801. Tree→app handoff: `consumeBpCompose()` L4369
  reads `localStorage['crs_bp_compose']` (+ `#bp-compose` hash + postMessage). Ingest =
  `sendMsg(true)` with attachment (`#ingestBtn` L1420).
- Outcomes fire `notifyT('task-complete'|'task-failed'|…)` L2444.

### 2.3 Dashboard (pre–Phase-2 state)

`showDashboard()` L2064 → `renderDashboard()` L2072 (fetches /api/files, chats, progress,
ideas, plans). Cards: greeting L2101; **KPI row L2106 — file-count introspection to
REMOVE** (tree-walk L2082–2087: files, manual-pages counts; conversations/ideas/shipped
are activity counts); Quick actions L2114 (8 cards — **Weekly digest `runDigest()` L2455
and Sync `bpTrack()` L4285 STAY**); Tools L2125 (5 openPageWindow buttons); Recent
conversations + Next build step L2133 (plansCache first pending step).
`runDigest` is EPHEMERAL — output is a chat, no digest file store exists (no brain/digests/).
`bpTrack` streams via its own reader loop (bypasses streamChat — maintenance smell).

### 2.4 Notifications + sounds (the door: `notifyT`)

- Registry `public/notify-registry.js`: 16 types × 4 categories, each
  `{id,name,description,category,level,defaultSound,defaults:{banner,sound,bell}}`.
  Types: connection-lost/restored, server-unreachable, task-complete/failed,
  queue-blocked-limit/resumed, forum-new-topics, release-notes-new, decision-attention,
  sync-failed, issue-report-new, info, success, warning, error.
- **`notifyT(typeId,{title,message,target?,banner?,sound?,bell?})` L4426** — resolves
  per-type prefs (`SETTINGS.notifyPrefs.types` over registry defaults); Banner→`toast()`,
  Sound→`SOUNDS.playSound`, Bell→POST /api/notifications (+reload). DND kills
  banner+sound, bell still records. Unknown type warns + falls back to info.
  Legacy `notify({level,…})` L4442 maps level→General types.
- Bell inbox `renderInbox` L4453; row click opens `target` via openPageWindow/openDocWindow
  L4470. Per-type settings matrix in Settings→Notifications L4574 (DND master, banner
  seconds, per-type channel switches + sound + Test).
- Sounds: `SOUNDS.playSound/playEvent/configure` (sounds.js); WAVs client-rendered offline
  into `data/sounds/` (`ensureSoundFiles` L4396).

### 2.5 Editors/viewers (tiers)

Tier 1 text/csv: real edit — `openDocWindow(p,{editSource:true})` auto-enters edit L2868;
`dwEditToggle` L2970; save `dwSave` L3045 → PUT /api/file (JSON parse-validated); Ctrl+S
L2920. Tier 2 xlsx: vendored SheetJS (`loadVendor` L2959, never CDN), value-only saves.
Tier 3 pdf/docx/bin: view-only + "Edit externally". Image viewer species `ivFill` L3179
(zoom/pan/filmstrip). **No live-reload of open documents exists** — only the shell-level
`versionGuard` L4325 (15s /api/version poll, manual reload banner, never auto).

### 2.6 Theming

`data-theme` on <html>; tokens.css defines `:root,[data-theme="dark"]` + `[data-theme=
"light"]` + legacy alias layer (`--bg`←`--bg-primary`…). index.html adds app vars
(--veil/--overlay/--code-*/--folder-icon/--hl-*/--icon-* light pairs). Apply:
`applyTheme` L4385 (localStorage `crs-theme`, `?theme=` override); cross-window sync via
`storage` event L4388 (standalone pages follow). `setTheme` L4518 persists to server
settings. Toggles are GREYSCALE (judgment-calls #36): active = --bg-elevated +
--text-primary, never accent fill.

## 3. Engine (brain/engine) — as-built interfaces

- **CLI:** `node brain/engine/gen.js "<intent>" --module <id|name> [--model --effort]`.
  stdout = the prompt (or RETRIEVED doc); stderr = diagnostics; exit 0 ok / 2
  DECISION-NEEDED / 1 error. In-process twin: `/api/modules/edit-prompt` (requires the
  same three modules; supplies runClaudeStream instead of the unexported callModel).
- **assemble(modKey)** → `{text, module, sha256}` — deterministic verbatim bundle: header
  `=== CRS BRAIN PROMPT-ENGINE BUNDLE v1 | module: <id> ===`, roles in context-map.json
  order (design-canon, conventions, security-rules, wu-guardrails, bp-capabilities,
  bubble-platform-notes; each `=== SOURCE: <path>[ § anchor] ===`, anchorSlice hard-errors
  on missing anchor), MODULE BLOCK (modules.json entry), decisions slice ([OPEN] stubs
  EXCLUDED by design; Locked-Architecture footer always in), STATUS slices (§2 rows, §3
  module section, §6 Reusable Components always). Zero timestamps — byte-identical =
  the determinism guarantee; sha256 over exact text.
- **guard(intent, moduleKey)** → hits `[{title,trigger}]`. Triggers = each `## [OPEN]`
  stub's `Triggers:` line in decisions.md (comma-split; whitespace/hyphen-tolerant
  phrase regexes, word-boundary anchored). Exit 2 / HTTP 409, literal `DECISION-NEEDED`.
  Currently 7 [OPEN] stubs; the "Pattern A" stop = *Company/Property own-table
  privacy-rule shape* (+ *Pattern A rollout order*) triggers. **No "User company field"
  stub exists — that ruling is LOCKED 2026-07-16** (User DT = property-only exception).
- **gen pipeline:** retrievalCheck (Jaccard ≥0.8 over brain/buildprint/generated/*.md
  `Intent:` lines → "RETRIEVED …, not generated") → assemble → guard → ONE model call
  (GEN_SYSTEM_PROMPT: 7-part template — TEST wrapper, TARGET, EXISTING REUSABLES BY ID,
  STEPS (Task 0 locate-and-report, paired Dark/Light styles, full-swap only), DATA/PRIVACY
  (Pattern A verbatim), WU NOTES, MANUAL VERIFICATION = [NEG] list) → archive to
  `brain/buildprint/generated/YYYY-MM-DD-<module>-<slug>.md` with front-matter
  `Intent/Module/Generated/Bundle-SHA256/Model`.
- Known divergence: engine template = 7 parts vs PROMPT-STANDARD.md's literal 8-section
  self-check (no Attachments line, no guardrail footer); TEST-wrapper wording differs
  between engine and templates/. The "stale-token grep" exists as a QA concept only —
  no implementing script yet.

## 4. State files — who writes what

| File | Format | Writers | Readers | Git |
|---|---|---|---|---|
| brain/STATUS.md | md §0–§8 (§2 all-46 table, §3 per-module 18-dim, §6 reusables) | human + Claude ingest | engine assemble, prompt-gen, humans | tracked |
| decisions.md | dated ## = LOCKED (no tag); `## [OPEN]` stubs + Triggers | human + Claude (append) | guard.js, assemble, humans | tracked |
| crs-brain/data/modules.json | {updated,note,statusVocab,modules[46]{id,name,section,route,icon,status,note,checklist[8 tri-state]},checklistTemplate} | PUT /api/modules (tree.html), ingest | tree.html, engine MODULE BLOCK, moduleDetail | tracked |
| brain/qa/master-checklist.md | append-only table `id|area|steps|expected|themes|status|last-run|evidence`; status vocab UNTESTED/PASS/FAIL/BLOCKED/N-A/ENV-LIMITED | QA runs (status/last-run/evidence only) | QA harness | tracked (currently 93 rows: 86 PASS · 7 ENV-LIMITED) |
| crs-brain/data/state.json | {forumSeenIds,forumCheckedAt,relnotesCheckedAt,issueCheckedAt,issueLastCount} | saveState (watchers) | /api/sync/status | **gitignored** |
| crs-brain/data/settings.json | app settings + bubbleCheckedAt/manualsCheckedAt stamps, notifyPrefs, sounds | PUT /api/settings, watchers | everything | tracked |
| crs-brain/data/wishlist.json | {sections,items[{id,section,title,detail,priority,status,order,ts}]} 11 items | /api/wishlist | wishlist.html | tracked |
| crs-brain/data/notifications.jsonl | {id,ts,type,level,title,body,target?} cap 200 | addNotification | bell (poll) | **gitignored** |
| crs-brain/data/task-queue.json | {tasks[],resumeAt} | queue API + runQueue | queue.html | tracked |
| crs-brain/data/plans.json | {activePacket,packets[{id,module,steps[{…,status,chatId}]}]} | plans API | dashboard next-step, index | tracked |
| crs-brain/data/ideas.json | {columns:{inbox,exploring,planned,done}} (empty) | /api/ideas | kanban | tracked |
| **data/tasks.json** | **does not exist — Phase 2 creates it** | — | — | — |
| **brain/digests/** | **does not exist — Phase 7 creates it** | — | — | — |
| **prototypes/** | **does not exist — Phase 1/3 create it** | — | — | — |

Current-focus module = FIRST module in modules.json order with status ∉ {done, roadmap}
(tree.html renderTree L381; currently User Management). Order-driven, no stored field.

## 5. Design canon (for the mapping pass)

- **Authority chain:** `brain/design/CRS-design-system.md` (§0–§20; §2.10 = canonical CSS
  block) → renderings: `design/tokens.css` (PRODUCT canon: dark-only, short names --bg/
  --surface-1/--r-button) and `crs-brain/public/tokens.css` (APP canon: themed, long names
  --bg-primary/--border-default/--radius-btn + alias layer). **The two naming schemes are
  incompatible — a mapping hazard.** §20 families: 20.1 segmented, 20.2 selection
  controls, 20.3 pickers, 20.4 KPI tiles, 20.5 avatars, 20.6 tables/lists, 20.7 chips/
  badges.
- **The Bubble style-name export (`design-system-export.md`) referenced by §20 line 438
  DOES NOT EXIST.** Attested real style names repo-wide: `CRS - Primary`,
  `CRS - Elevated Card`, `CRS - Input 36px`, `Chip Active`, `Chip Dot 6px`,
  swap styles `zzactive`/`zzactivelight`. Reusables follow §13 naming (`# Name`,
  `#PP - Name`, `#FG - Name`; some legacy `RE_Name` pending migration). STATUS.md §6
  lists existing reusable components (assemble injects it for BY-ID reuse).
- Prototype HTML today: ad-hoc in `demos/`, `design/CRS_UI_Kit.html`,
  `crs-brain/data/docs/` (server prompt L602 calls data/docs/ the demo home). Sample for
  acceptance: `crs-brain/data/docs/buttons.html` (4.9KB, real tokens, ~4 off-canon
  literals incl. #DC2626/#B91C1C danger-hover, hardcoded 10px radius).

## 6. Fragile spots (don't break these)

- explPaintSel in-place selection painting (re-render kills dblclick) L3431; marquee uses
  pointer events (menu-dismiss regression) L3467.
- Rect-truth fullscreen tests (stale-flag inversion) L2707/2628; openExpl resets fs/snap/min.
- z-index magic tiers: DW<290, chips 300, htmlFull 350, propPop 360, utoast 370.
- Usage probe = node-pty TUI typing hack L456 (flaky by nature); limitResetMs seconds
  assumption L3142.
- bfcache: index no-store + versionGuard; never auto-reload.
- autoCommit races on rapid saves; BP baseline silent reset on corrupt last-tracked.txt.
- Fixed --allowedTools; safety rests on bp-guard.js PreToolUse hook being present.
- OS drag-out Chromium-only; sendmail-only email path.

## 7. Windows/Mac portability (locked)

Both OSes always. Platform-guarded spawns (claude, buildprint, open, login, manuals via
Git Bash). `.gitattributes` LF/CRLF locks. node-pty prebuilds per-OS, node_modules
gitignored. doctor.js = health check.

## 8. Corrections vs the previous app-map / docs (Phase-0 disagreement list)

1. Previous app-map said standalone pages are dark-only/unthemed — FIXED since P9.1; all
   seven pages link tokens.css with paired themes. Its "fix direction" section is done.
2. Previous line numbers drifted ~400–1000 lines (dashboard was "~1667", now 2064+).
3. CLAUDE.md "Sidebar implementation pattern"/tabs is stale for the app: `setTab` L1714
   is a no-op stub; sidebar is conversations-only; `setFileFilter` UI removed (function
   kept callable).
4. server.js self-doc `CRS_BRAIN_ARCH` says "~2000 lines" — file is 3254.
5. PROMPT-STANDARD.md §6 demands 8 sections; the engine emits a condensed 7-part template
   (documented divergence — engine archives will not pass the literal §6 check).
6. program-prompt.md Phase 6 says "Pattern A / User company field" decisions — no
   "User company field" [OPEN] stub exists (LOCKED 2026-07-16, User DT property-only);
   guard stops only via the 7 real stubs' triggers.
7. "Stale-token grep" / "engine determinism grep" named by QA docs has no implementing
   script — the mechanism is assemble's byte-identical guarantee + Bundle-SHA256 stamps.
8. smtp.json settings exist in UI but the notification email path uses sendmail only.
9. resume-2026-07-17.md said Mac buildprint CLI link = Unauthorized (4.1.6→4.2.5 pending);
   re-verify at Phase 4 precondition — do not trust either way.
10. master-checklist naive status grep over-counts (evidence cells embed literal
    `| PASS |` substrings) — count the FIRST status cell per row: 93 rows, 86 PASS,
    7 ENV-LIMITED.
