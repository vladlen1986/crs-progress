# CRS Brain — Build Progress

> Checkpoint for the **CRS Brain app** (`crs-brain/`) — the local second-brain tool that helps build the CRS Bubble app. This file is the zero-context-loss handoff between sessions. The CRS *product* itself is documented in `CLAUDE.md`, `decisions.md`, and `brain/`.

Last updated: **2026-07-14**.

---

## 1. Sprint goal
Make CRS Brain a complete, polished cockpit for building CRS: chat grounded in `brain/`, a living galaxy map, a Buildprint copilot that operates the Bubble app and auto-syncs changes back into the ledger, mobile access, and a clean file/OS-style experience.

## 2. Done this session (all committed locally; `main` is ~88 commits ahead of origin — NOT pushed)
Core app (`crs-brain/`):
- **Server** `crs-brain/server.js` — zero-dep Node server; chat relay via headless `claude -p` (parameterized `runClaudeStream(msg, sessionId, hooks, opts)` — `opts.cwd/systemPrompt/addDirs/model/effort/signal`); endpoints: `/api/chat` (streaming, `body.bp` routes to Buildprint workspace), `/api/chats`, `/api/search-chats`, `/api/file`, `/api/files` (tree w/ `size`+`mtime`), `/api/recent-edited`, `/api/raw`, `/api/open`, `/api/attach`, `/api/savedoc`, `/api/progress`, `/api/ideas`, `/api/usage[/enable|disable|populate]`, `/api/auth/*`, `/api/digest-context`, `/api/bp/status|track`, `/map`.
- **Main UI** `crs-brain/public/index.html` — dashboard home; left sidebar tabs Chats│Buildprint│Files; center chat (streaming w/ thinking/tool blocks, stop, regenerate); file viewer/editor; Cmd/Ctrl+K palette; drag-drop/paste attach; images inline; clickable file paths → open (html→default browser via `/api/open`).
- **Galaxy map** `crs-brain/public/map.html` — canvas graph, ARMS layers, 9 layouts (Force/Circle/Hex/Rings/Orbit/Spiral/Grid/Tree/Sphere), universe animation (parallax stars, nebulas, flow particles, galactic rotation), CRS-only toggle, fullscreen, Ask-the-Brain dock, kanban FOLDER board (`▦ BOARD`) with FILES│IDEAS tabs, preview panel (html iframe / rich MD with section tabs+search), native search+filters, big manuals auto-split into own clusters + auto-collapsed, `CLAUDE.MD` pinned dead-center.
- **Statusline** `crs-brain/statusline.js` — persists `model`+`context_window`+`cost`(+`rate_limits` if present) to `crs-brain/data/usage.json`.
- **Launchers** `crs-brain/start.command` (localhost), `crs-brain/start-mobile.command` (LAN + `caffeinate`). **Importer** `crs-brain/import-chats.js` (Claude Code transcripts + `--claude-export conversations.json`).
- **Knowledge** `brain/` — INDEX + ledger (database/option-sets/security/workflows/migrations/design/changelog.md); **complete Bubble manual** `brain/bubble/` (583 pages, verbatim); **complete Buildprint manual** `brain/buildprint/` (71 pages); **forum** `brain/bubble-forum/` (87 curated threads); operations runbook `brain/buildprint/crs-brain-operations.md`.
- **Manual auto-updater** `scripts/update_bubble_manual.py`, `scripts/update_buildprint_manual.py`, `scripts/update-manuals.sh` — server runs weekly (`server.js` `maybeSyncManuals`).
- **Buildprint integration** — CLI linked (`buildprint`, `~/.local/bin`), Test branch cloned to `~/projects/crs-bubble/casinoreportingsystem/test` (OUTSIDE the repo). Buildprint = a full chat mode (`chat.bp:true` runs `runClaudeStream` in the workspace w/ `BP_PROMPT` + `--add-dir REPO_ROOT`). **Buildprint→Brain tracking**: `bpSyncDiff()` + `/api/bp/track` + 20-min `maybeTrackBuildprint()` — syncs Bubble, diffs snapshot vs `crs-brain/data/buildprint/last-tracked.txt`, feeds changed files to the brain (`BP_TRACK_PROMPT`) which updates `brain/*.md`.
- **Mobile** — LAN PIN gate (`crs-brain/.pin`, gitignored, current PIN persisted), responsive drawers, Tailscale (Mac IP `100.114.97.93:4317`).
- Recent bug fixes: mid-stream chat-switch no longer strands reply / sticks Stop (view-generation guard + live re-attach, `streamChat` in index.html); project-only file view default; Finder/Explorer popup + file-type icon tiles; map folder-node → explorer (`#explore=` hash); composer = Claude-app style (model+effort inside); Chats tab clears an open file; **usage fixed** (node-pty `spawn-helper` chmod +x; 5h/7d rate-limit bars restored 2026-07-15 — capture bug, not a Claude Code removal; see §7); **sidebar chat search** (`/api/search-chats` + `#chatSearch`).

## 3. DONE — 5-request UI batch (all implemented + verified in-browser 2026-07-15)
Files: `crs-brain/public/index.html` + `crs-brain/public/map.html`. All 5 shipped and checked in a live browser (no console errors; server on :4317).
1. **Map + Kanban buttons in left sidebar** — DONE. `<div class="sidenav">` with Map → `window.open('/map','crsmap')` and Kanban → `openKanban()` → `window.open('/map#board','crsmap')`, right after the account line. `map.html` now has `openFromHash()` (called on boot + on `hashchange`): `#board` opens the folder board, `#ideas` opens it on the Ideas tab. Verified: board opens, Ideas tab activates.
2. **Input higher** — DONE. `.composer-wrap` padding `12px 18px 18px` → `12px 18px 30px`. (Button heights were already DONE.)
3. **Dashboard cards clickable** — DONE. `stat(v,k,color)` → `stat(v,k,color,onclick)` (adds `clk` + `onclick`). All 9 cards wired: files→`openExpl('')`, conversations→`setTab('chats')`, ideas→`/map#ideas`, done→`openFile('brain/changelog.md')`, manual pages→`openExpl('brain/bubble')`; knowledge: Bubble/Buildprint/forum→`openExpl('brain/…')`, saved docs→`openExpl('crs-brain/data/docs')`. Verified all 9 have `clk` + handler.
4. **Sidebar resizable** — DONE. `<div class="lresizer" id="lresizer">` added as last child of `.col.left`; `.app` grid col 1 = `var(--left-w,274px)`; pointer-capture drag IIFE clamps 210–480px, persists `localStorage.leftW`, applies on boot.
5. **Remove Progress from right sidebar** — DONE. Deleted the `<h2>Progress</h2>` + `<div id="progress">` from `.rscroll`; `loadProgress()` guarded with `const box=$('progress'); if(!box) return;`. Dashboard's own progress render untouched.

## 4. Next up (ordered)
1. Task 33 — per-chat attachments bar (attachments linked to chat, 2nd right-side scroll bar, sort + group by date/type, file-type icons; derive from chat message `attachments`).
2. Task 30 — **Buildprint prompt creator** (structural, plan-first: reads progress + ideas + `design/tokens.css` + full app plan → structured plan → precise Buildprint prompt). The strategic centerpiece; give it its own focused session.
3. Task 27 pinned messages; Task 28 chat folders (delete→Uncategorized); Task 29 meaningful dashboard + legacy-file tagging.

## 5. Open decisions (need Vlad's call)
- **GitHub push** — `main` is ~88 commits ahead; not pushed (no `gh` auth on this Mac). Options: (a) `gh auth login` then `git push`; (b) GitHub Desktop (installer was in Downloads) → Push origin. Blocks office-PC sync + backup.
- **claude.ai chat export** — never delivered (watcher timed out). Optional: Settings→Privacy→Export data → `node crs-brain/import-chats.js --claude-export <conversations.json>`.
- **MCP for Buildprint** — CLI (editing) is wired; MCP (live data/logs/WU/tests) offered but not set up. `--allowedTools` already includes `mcp__buildprint`; user runs `claude mcp add -s user …` with token when ready.
- **node_modules in git** — `crs-brain/node_modules/` is committed (repo bloat, cross-platform churn). Should move to `.gitignore` + document `npm install` on clone — but that's a change to make deliberately, not silently.

## 6. Locked decisions (do NOT re-litigate)
- **Design**: CRS tokens only (`design/tokens.css`) — flat `#3B82F6` accent (no gradients/glows on chrome), border-only cards, `#181818/#1E1E1E` surfaces, default body text `#A6A6A6`, active = bg+text only, Inter, radii 6/10/12/16. Executive-minimal SaaS. (See memory `crs-design-rules`.)
- **Spawn `claude` WITHOUT `shell:true`** — args concatenate unescaped; a `(` in a system prompt breaks `/bin/sh` (DEP0190). Use `spawnClaude()` (cmd.exe /c wrapper on Windows). Never revert.
- **PATH/USER at server startup** — macOS double-click launches get a minimal env; `server.js` prepends `~/.local/bin`,`/opt/homebrew/bin`,`/usr/local/bin`,`~/.npm-global/bin` and sets USER/LOGNAME (claude keychain needs them). `resolveBin(name)` gives full paths to pty/exec.
- **Bubble workspace lives OUTSIDE the repo** — `~/projects/crs-bubble/casinoreportingsystem/test`. Never clone it into `crs-progress/`.
- **Buildprint guardrails** (`brain/buildprint/crs-brain-operations.md` + decisions.md 2026-05-01): TEST/dev branch only (never live), sync→check→apply, plan-before-first-apply, no `--force-apply`/`--no-check`/`sync --reset` without explicit approval, ingest results into `brain/` after.
- **brain/ = one fact one file**; INDEX.md read first; brain/ links to authoritative sources (decisions.md, design/, specs/), never duplicates. Manuals: `brain/bubble` (Bubble), `brain/buildprint` (Buildprint), `brain/bubble-forum` (community, manual overrides).
- **Project-only file view** = default: hide `crs-brain/`, `scripts/`, `README.md`, `CLAUDE.md`, and `brain/{bubble,buildprint,bubble-forum}`. `CRS_DIRS`/`CRS_ROOT_FILES`/`MANUAL_DIRS` in index.html; server mirror in `/api/recent-edited`.
- **Mobile PIN** persists to `crs-brain/.pin` (gitignored, generated once, stable across relaunch).
- Chat identity: Buildprint tasks are normal chats with `bp:true` (reuse the whole chat engine).

## 7. Gotchas
- **node-pty `spawn-helper` needs `chmod +x`** on this Mac (was `-rw-r--r--` → `posix_spawnp failed`). After any `npm install`/rebuild in `crs-brain/`, re-run `chmod +x node_modules/node-pty/prebuilds/darwin-*/spawn-helper`. NOT committed (would churn/break Windows).
- **~~Claude Code 2.1.209 dropped `rate_limits`~~ — WRONG (corrected 2026-07-15).** 2.1.209 still emits `rate_limits` (its own embedded statusline schema: *"Only present for subscribers after first API response"*). The 5h/7d bars were lost to a **capture bug**, now fixed: (a) the statusline used to overwrite `usage.json` on every render, so a fresh session's startup render (no rate_limits yet) wiped the bars → statusline now **merges**, carrying last-known `rate_limits` forward (+`rate_limits_at`); (b) "Fetch fresh reading" spawned the probe with `--model haiku` (→ panel showed "Haiku 4.5") and captured the pre-response startup render → probe now uses the **default model** and polls until a reading with **fresh** `rate_limits` (post-response) appears. Bars + correct model confirmed live (5h/7d/context all rendering).
- **Do NOT commit `crs-brain/node_modules` changes** — the rebuild deletes Windows-only files (`conpty.dll`, `OpenConsole.exe`); committing those breaks node-pty on the office Windows PC.
- **The running server dies when the Claude Code session that started it ends** — for persistent use Vlad double-clicks `start.command` / `start-mobile.command` himself.
- **Mobile needs the Mac awake + `start-mobile.command` running + Tailscale on the phone.** Address: `http://100.114.97.93:4317`.
- **Map is now EMBEDDED in the main app** (2026-07-15), not a popup. `index.html` has a persistent composer (moved OUT of `chatView` to be a direct child of `.col.center`) + a `#contentArea` that swaps chatView/dashView/fileView/**mapView** above it. `mapView` is an `<iframe id="mapFrame" src="/map">`; `showMap(mode)` shows it (lazy-loads once; `mode='board'|'ideas'` deep-links via `contentWindow.location.hash`). `map.html` detects `EMBED = window.self!==window.top`: hides its "Ask the Brain" dock and routes node clicks to `window.parent.smartOpen/openExpl` (same-origin) instead of `window.open(...,'crsbrain')`. Standalone `/map` still works (dock shows, window.open fallback) for the deep-link path. Sending from any view calls `ensureChatView()` → drops into the conversation; the composer never leaves.

---

## Decisions log (append-only)

### 2026-07-15 — Session: mobile full-screen kanban/list
- On a phone, Kanban/List showed the full galaxy with the board crammed into a bottom drawer (+ the map's floating chrome and the settings panel overlapping). Now on mobile (`@media max-width:720px`) when the map is embedded (`body.embed`, set in boot) and the board is open, the board **fills the screen** (`top:0`, `transform:none`, opaque bg) and the galaxy chrome hides (`.brand`, `.menu-btn`, `.panel`, `.hint`). `transform:none` was required — the slide-`translateY` fought the height override and left the board mispositioned (stuck at ~translateY(105%)). The canvas rAF loop pauses while the board covers the screen (battery). Map view (board closed) still shows the galaxy + chrome. Desktop unchanged (rules are mobile-scoped; board stays a drawer over the galaxy).
- Verified live at 375px: Kanban = full-screen swipeable columns; List = full-screen vertical list; Map = galaxy. Desktop kanban still a drawer (screenshot-confirmed). No console errors.

### 2026-07-15 — Session: view switcher + mobile fixes + CRS-only meaning
- **Chat · Map · Kanban · List segmented toggle** in the center header (replaces the standalone Map button; removed the redundant sidebar `.sidenav`). `setView()` + `markView()` sync the active segment. Kanban and List are the SAME embedded board — `map.html` gained `applyView(mode)` (exposed on `window`, also driven by `#board`/`#list`/`#ideas` on first load) + `setBoardLayout()`; **List** = board columns stacked vertically (`body.blist` CSS). Map closes the board; Kanban/List open it (files, columns/list); Ideas → ideas board. Icon-only on mobile so the header fits.
- **Mobile connection fix**: the phone got ERR_CONNECTION_REFUSED because two turns earlier I restarted the server WITHOUT `CRS_BRAIN_HOST=0.0.0.0` (localhost-only). Restarted on all interfaces — but that server dies with the session; **Vlad must relaunch `start-mobile.command` for persistent mobile** (Tailscale `100.114.97.93:4317`, PIN in `crs-brain/.pin`).
- **Mobile layout fix** (committed 0050285): the resizer's `.col.left{position:relative}` was unscoped and overrode the mobile fixed-drawer rule, making the app a 2-row grid (huge empty top gap). Scoped it to `min-width:901px`.
- **CRS-only meaning confirmed + documented**: "CRS only"/"Project" = files for building the CRS Bubble product (brain/specs/design/data/demos/pricing/audits + decisions.md), NOT the second-brain app's own files (crs-brain/, scripts/) or vendor manuals. Already correct in `contentTree()`/`filterTree()`; verified CRS-only hides CRS-BRAIN + SCRIPTS. Clarified the toggle tooltips. Saved memory `crs-only-filter-meaning`.

### 2026-07-15 — Session: collapse-to-rail sidebars + kanban z-fix
- **Sidebars collapse to a narrow 54px icon rail** (was: fully hidden). Both left and right. `.side-rail` (a child of each `.col`) shows when `.app.lcol`/`.rcol` is set; the media query hides the full content and reveals the rail. Left rail: expand, Home, New, Chats, Buildprint, Files, Map, Kanban (tab icons call `railTab()` → expand + `setTab`; `railExpand(side)` re-opens). Right rail: expand, Usage, Recent. Collapse state still persists via `localStorage.collapse_{side}`.
- **Kanban no longer opens behind the chat input.** Root cause: in `map-mode` the composer floats `position:absolute` over the whole map iframe, and the board drawer is pinned to the iframe's bottom → hidden behind the composer. The prior fix only handled the app's Kanban button, not the map's own ▦ BOARD button. Now `map.html toggleBoard()` calls `window.parent.setMapBoardOpen(boardOpen)` (embed only); the parent un-floats the composer (removes `map-mode`) whenever the board is open — covers every entry path. `showMap()` respects `mapBoardOpen` too.
- Verified live: both panels collapse to icon rails (icons render, buttons work, expand restores); board opens fully above the composer from both entry points. No console errors.
- NOTE: this commit also carries pre-existing in-progress work already in the tree — **tool-action labels** in work blocks (`server.js summarizeTool()` → `onLabel` SSE `label` → `index.html` sets the work-block label to e.g. "Read PROGRESS.md" / "$ git status") and the **map-mode composer-float** ("map bg extends below the chat input"). Kept the label emitter+handler together so the feature isn't half-committed.

### 2026-07-15 — Session: unified chat + embedded map
- Vlad: "chat shall be same everywhere … maps page shall not be separate page, it shall be above chat input. chat input always stays." Restructured the center column so the **composer is a permanent bottom bar** (pulled out of `chatView`) with a swappable `#contentArea` (chat/dashboard/file/map) above it. The composer now shows on every view.
- **Map is no longer a popup** — it's an `<iframe src="/map">` (`#mapView`) shown above the chat input via `showMap()`. In embed mode (`window.self!==window.top`) the map hides its own "Ask the Brain" dock and routes node clicks to `window.parent.smartOpen/openExpl`, so there's ONE chat everywhere and files open in the same window. All Map/Kanban/ideas buttons + dashboard actions now call `showMap()` instead of `window.open(...,'crsmap')`. Standalone `/map` still works (backward-compat).
- Verified live: composer persists on dashboard/map/file/chat; embedded map renders with dock hidden; send-from-map → conversation; node click → file view; Kanban → board open; `/map` standalone still shows its dock. No console errors. Committed.

### 2026-07-15 — Session: usage bars fixed (5h/7d restored)
- Root-caused the missing session/weekly bars + wrong "Haiku 4.5" model. NOT a Claude Code removal (2.1.209 still emits `rate_limits`) — it was a capture bug (see corrected §7 gotcha).
- Fixes: `statusline.js` now **merges** (preserves last-known `rate_limits` + records `rate_limits_at`) so a fresh render can't wipe the bars; `server.js populateUsage()` drops the `--model haiku` override (uses the user's **default** model → correct label) and polls until a **post-response** reading with fresh `rate_limits` lands (grace-fallback to newer model/cost if an account never exposes limits); `index.html` shows "Limits read Xm ago" for the bars.
- Verified live: real capture returned Opus 4.8 (1M context), Session 5h ~0–1%, Weekly 7d 63%, context 3%. Restarted the orphaned :4317 server on the fixed code. Committed.

### 2026-07-15 — Session: finished the 5-request UI batch
- Shipped all 5 UI items (§3): left-sidebar Map/Kanban nav, taller composer, clickable dashboard stat cards, drag-resizable left sidebar (persisted), and Progress removed from the right panel. Touches `crs-brain/public/index.html` + `map.html` only.
- `map.html` gained `openFromHash()` + a `hashchange` listener so `/map#board` and `/map#ideas` deep-links open the folder board (Ideas tab for `#ideas`) whether the map is freshly opened or already up.
- Verified live in-browser against the running :4317 server (sidenav present, 9 stat cards carry `clk`+onclick, `#progress` gone from right panel, resizer wired, board/ideas deep-links open). No console errors.

### 2026-07-14 — Session: CRS Brain app build-out
- Built the entire CRS Brain app + knowledge base + Buildprint integration + mobile in one long session (see §2). All locked decisions in §6 established this session.
- Decided: usage panel repurposed to context-window/cost (Claude Code removed rate_limits). Buildprint operated via CLI (editing) with brain auto-tracking; MCP deferred. Project-only file view is the default. GitHub push still pending Vlad's auth (~88 commits unpushed).
