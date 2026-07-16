# CRS Brain — Build Progress

> Checkpoint for the **CRS Brain app** (`crs-brain/`) — the local second-brain tool that helps build the CRS Bubble app. This file is the zero-context-loss handoff between sessions. The CRS *product* itself is documented in `CLAUDE.md`, `decisions.md`, and `brain/`.

Last updated: **2026-07-16**.

> **New session? Read the two 2026-07-16 logs first — they capture the whole last session.** The CRS *product* lives in `brain/STATUS.md` + `decisions.md` + `brain/`; this file is the *tool* (crs-brain app) log.

### Running the app on a new machine (e.g. the home Mac)

The server is **zero-dependency Node** — every `require` is a built-in except `node-pty` (loaded lazily in a try/catch; only the live-usage panel needs it). So:

```bash
git clone https://github.com/vladlen1986/crs-progress.git   # or pull if already cloned
cd crs-progress/crs-brain
node server.js            # → http://localhost:4317  (app runs immediately, bare Node)
npm install              # ONE-TIME, optional — builds node-pty for THIS OS so the live-usage panel works
```

- `crs-brain/node_modules` is **gitignored** (as of 2026-07-16) — native binaries are per-OS, so each machine builds its own with `npm install`. Do **not** commit node_modules. `npm install` needs Xcode Command Line Tools on Mac (for node-pty's native build); if it fails, the app still runs, just without live usage.
- To operate Buildprint from the Mac you also need the **Buildprint CLI linked + the Test branch cloned** on that machine — see `brain/buildprint/CLI-MCP-PLAYBOOK.md §5` (`npm i -g buildprint` → `buildprint link <token>` → `buildprint project clone <appId> --branch test` into `~/projects/crs-bubble/`). The workspace path is per-machine; the app finds it automatically.
- Optional: `npm install -g agent-browser` for screenshots/visual verification.

---

## Session 2026-07-16 (cont.) — Buildprint-style activity blocks, action log + rollback, wishlist

Follow-on to the session below. All committed to `main` (still NOT pushed — push via GitHub Desktop).

### What was built
1. **Grouped agent activity (like the Buildprint web agent)** — `public/index.html`. The bp/chat stream no longer renders one bordered box per tool. A run of consecutive tool/thinking steps now folds under ONE collapsible **"Worked for Xs"** header (ticks "Working Ns" live, freezes to "Worked for Ns"), with assistant prose between groups. Each step is a clean **icon + label** row (icon auto-picked from tool/label: sparkle=thinking, terminal=`$`/buildprint/git, magnifier=grep/explore/audit, doc=file read, globe=web, pencil=edit/apply), **expandable** to reveal its thinking/detail; the group header collapses the whole list. All CRS dark tokens. New helper `stepIco()`; streaming model rewritten to `group`/`activeStep` (kept `startCard`/`finalizeCard` names for call sites). Verified by replaying a synthetic SSE stream through the real render path (no model call).
2. **Action log (activity ledger) + rollback** — the app now records **every action**, so "when did I do X / roll back to before it" is answerable.
   - **Storage:** append-only `crs-brain/data/action-log.jsonl` (gitignored — per-machine runtime ledger; the real rollback targets are **Bubble savepoints**, which are shared across machines). Helpers `logAction()` / `readActionLog()` in `server.js`.
   - **Auto-capture of CLI mutations:** `crs-brain/bp-log.js` is a **PostToolUse hook** (wired alongside `bp-guard.js` in `data/bp-guard-settings.json`) that logs every `buildprint`/`git` command the copilot runs — classified (savepoint/apply/data/branch/cli), with the savepoint label + branch + ok/fail extracted. So each apply is indexed to the savepoint taken just before it.
   - **UI actions logged:** chat sends (server-side, the intent anchor), and Progress-Tree status/reorder/prompt-gen (client `logAct()` in `tree.html`).
   - **Endpoints:** `GET /api/action-log?q=&type=&since=&limit=`, `POST /api/action-log`.
   - **Activity Log page** — `public/activity.html` (Home card "Activity log" + side-rail clock icon). Day-grouped timeline, search, type filters with counts, color badges, monospace command rows, ⚑ savepoint / ⌥ branch / failed tags, and a **⟲ Roll back** button on apply/savepoint/data/branch/bp-chat rows that opens a bp chat pre-filled to find the right savepoint and restore the TEST branch to just before that action.
   - **Agent awareness:** `BP_PROMPT` now has an ACTION LOG & ROLLBACK block — read `action-log.jsonl` to answer "when did I…", and for rollback: find the savepoint → `savepoint list` → `savepoint restore` on test → `sync`. **Honesty rule baked in:** savepoint-restore reverts structure/workflows only — it does NOT undo DB record writes (Buildprint can't delete Things); those need Bubble deletion or a data backup.
3. **Second Brain Improvements wishlist** — `crs-brain/WISHLIST.md`, a hand-editable todo list for the app itself. Seeded with Vlad's asks: **daily Bubble-forum check** → update `brain/bubble/`; **track `bubble.io/release-notes`** → keep the brain current on new Bubble features. Two features flagged to research (mechanics NOT assumed): **style-swapping in conditions** (clean path for the dark/light theme feature) and **global expressions**.

### Next up (carried + new)
- Build the wishlist P1s: the **release-notes / forum watchers** (and then document style-swapping + global expressions in `brain/bubble/`).
- Everything from the prior session's "Next up" still stands (install `agent-browser`, Sync audits, User Management Pass-2, Pattern A rollout).

---

## Session 2026-07-16 — CLI-first Buildprint cockpit, Progress Tree, safety gate, prompt standard

Goal of the session: make the Brain app operate Buildprint via the **CLI (driven by your Claude) at $0 web agent runtime**, safely, and give it a real product-build cockpit. All committed to `main` (NOT pushed — ~50 commits ahead of origin; push via GitHub Desktop).

### What was built
1. **Infra:** fixed `git pull` (renamed a Windows-illegal `building-for...` brain folder). Linked the Buildprint CLI on Windows; Test branch cloned to `~/projects/crs-bubble/casinoreportingsystem/test`.
2. **Product-state consolidation** (from the Desktop `Files` export): `brain/STATUS.md` (canonical product tracker), `brain/modules/` (2 module tech-refs + manuals), `brain/security-test-checklist.md`; renamed `PROGRESS.md → crs-brain/BRAIN_APP_PROGRESS.md` (this file); refreshed `crs-brain/data/progress.json`.
3. **Progress Tree page** — `crs-brain/public/tree.html` + `crs-brain/data/modules.json`. Home dashboard card "Progress Tree". 46 modules in build-priority order (foundation-4 first). Per module: drag/↑↓ reorder, click-to-cycle status, an **8-item definition-of-done checklist** (editable), and an **expandable detail panel** aggregating brain knowledge (STATUS block, tech-ref data-model/option-sets/perms/workflows, cross-ledger mentions). Endpoints in `server.js`: `GET/PUT /api/modules`, `GET /api/modules/detail`, `POST /api/modules/prompt`, `POST /api/modules/edit-prompt`.
4. **Per-module Buildprint prompt generation** (in the tree panel):
   - **Edit prompt** — you type what you want in plain language → the Brain (LLM, `EDIT_TASKS_PROMPT` + deterministic `buildEditWrapper`) writes a proper Buildprint prompt → **auto-opens the Brain's Buildprint chat with it pasted** (`sendToBp` → `consumeBpCompose`).
   - **Sync/audit prompt** — deterministic read-only audit (`buildSyncPrompt`).
   - Both carry the module's checklist as **acceptance criteria**.
5. **Prompt standard** — `brain/buildprint/PROMPT-STANDARD.md` (self-contained, no-anchoring, evidence-discipline, OWNER/NEG split, decision protection) + four templates in `brain/buildprint/templates/` (audit/edit/pilot/reply) + a "Prompt generation" section in `CLAUDE.md` + 4 worked samples in `brain/buildprint/generated/`.
6. **Chat / UI polish:** Claude-style responses (no avatars, bright prose, subtle right-aligned user pill), **modern tables** (rounded, header, dividers, zebra), file **hover-download** chips, file viewer **Back (far left) + Download** buttons, inline images.
7. **Ingest fix:** the chat handler now embeds text-attachment CONTENT inline in the prompt (was making the agent hunt the filesystem → Downloads → permission gate).
8. **Buildprint operation & safety** (the core of the session):
   - `bpAutoTrack: false` in `data/settings.json` — the 20-min auto-sync is OFF (was creating stale "concurrent agents").
   - **Operating loop enforced** in `BP_PROMPT` + `brain/buildprint/crs-brain-operations.md`: `sync` → PLAN + approval → per step **savepoint → apply → check**.
   - **`brain/buildprint/CLI-MCP-PLAYBOOK.md`** — how to build via CLI/MCP at $0 runtime (CLI = editor; MCP = read logs/data/WU + automations/monitors; runtime only meters web chat/tests/reviews).
   - **HARD SAFETY GATE** — `crs-brain/bp-guard.js` is a PreToolUse deny-hook wired into every `claude -p` spawn via `--settings` (`data/bp-guard-settings.json`, gitignored). Blocks: apply-to-live, `--force-apply`, `--no-check`, `--allow-large-apply/-suspicious-shrink`, `sync --reset`, data delete, `rm -rf`, `git reset --hard`, `git clean -f`. Verified firing in a real claude run.
   - **Speed:** `--allowedTools` now includes `Bash(node:*)/python/python3` for fast local selection/dedup (Bubble writes still CLI-only); `BP_PROMPT` tells it to script instead of dozens of queries.
   - **Visual verification wired:** `--allowedTools` includes `Bash(agent-browser:*)`; `BP_PROMPT` VISUAL VERIFICATION block (screenshot anon or as a test user, flip `theme_is_dark` for dark/light, `--viewport`, Read the PNG, embed `![](crs-brain/data/screenshots/…)`). **BLOCKED on one thing:** `agent-browser` isn't installed — run `npm install -g agent-browser` (Apache-2.0, agent-browser.dev) then `buildprint screenshot "/"` to confirm.
9. **Real data writes done via the bp chat** (test branch): 11 Users created (Hakan + 10 across departments) — logged in `brain/changelog.md`. Confirms the CLI `data create` path works.

### Current state of the loop
Progress Tree → type request → **Edit prompt** generated → **Buildprint chat opens with it** → you approve the plan → the copilot runs `sync` → per step `savepoint → apply → check`, hard-guarded. The bp chat has: buildprint CLI + node/python + agent-browser + web + MCP, with all dangerous Bubble/local ops blocked by `bp-guard.js`.

### Next up (for the new session)
- **Install `agent-browser`** (`npm install -g agent-browser`) to turn on screenshots / visual verification.
- **Push** (~50 commits ahead of `origin/main`).
- Run **Sync audits** on modules to populate the tree detail for the 44 undocumented ones.
- Product work: **User Management Pass-2 (security)** is the active foundation item; **Pattern A rollout** (0/46 DTs isolate — pilot prompt for `06 Employee` is in `brain/buildprint/generated/`).
- Possible app features: a **CLI cockpit panel** (buttons for sync/audit/savepoint/check/apply with streamed output); **MCP setup** for logs/WU inside chat.
- Model tip: bp chat mechanical tasks are faster on **Sonnet 5 / Medium**; reserve Opus/High for architecture + security.

### Key files this session
`crs-brain/server.js` (endpoints, BP_PROMPT, guard wiring, allowedTools, ingest), `crs-brain/bp-guard.js`, `crs-brain/public/{tree.html,index.html}`, `crs-brain/data/{modules.json,progress.json,settings.json}`, `brain/{STATUS.md,security-test-checklist.md,modules/,buildprint/{PROMPT-STANDARD.md,CLI-MCP-PLAYBOOK.md,templates/,generated/,crs-brain-operations.md,INDEX.md}}`, `CLAUDE.md`, `README.md`.

---

## 1. Sprint goal
Make CRS Brain a complete, polished cockpit for building CRS: chat grounded in `brain/`, a living galaxy map, a Buildprint copilot that operates the Bubble app and auto-syncs changes back into the ledger, mobile access, and a clean file/OS-style experience.

## 2. Done this session (all committed AND pushed — origin/main in sync as of 2026-07-15, verified via `git ls-remote`)
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
1. ~~Run the INVENTORY packet~~ — **DONE 2026-07-15** via a bp chat (read-only, 6 parallel agents): full real-state inventory of the test branch ingested into brain/ (110 DTs → 46 live/64 deleted, 98 OS, 29 backend WFs, 343 page WFs, privacy tracker, legacy-cleanup list). brain/ is no longer spec-only. See brain/changelog.md 2026-07-15.
2. **Draft the Pattern A rollout packet** (next Buildprint build work): fix candidate no-auth endpoint `add_user_to_read_by_all_reports_copy` → 06 Employee PII → 24 no-rules DTs → 15 public-everyone DTs. Source: brain/security.md tracker.
3. Structural apply-gate for bp chats (PreToolUse hook / narrowed allowedTools so `buildprint apply` physically can't run before the plan is approved) — the guardrail is currently prose-only in prompts.
4. Task 33 — per-chat attachments bar; Task 27 pinned messages; Task 28 chat folders; Task 29 legacy-file tagging.
5. Audit backlog: `crs-brain/data/docs/app-audit-2026-07-15.md` (bpTrack resilience, queued-prompt chat binding, digest scheduling, Bubble-entity map, ideas→packet promotion).

## 5. Open decisions (need Vlad's call)
- ~~**GitHub push**~~ — RESOLVED: `origin/main` is in sync with local `HEAD` (GitHub `refs/heads/main` = latest commit, verified 2026-07-15 via `git ls-remote`). Pushes reach GitHub via Vlad's interactive git/GitHub Desktop; note the SANDBOXED non-interactive shell here can't push (no cached creds — `git push` dry-run fails), so don't rely on `git push` from an automated session. **Windows work-PC sync = `git pull`.**
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

### 2026-07-15 — Session: Bubble data view + brain-sync loop
- **New "Bubble data" view** (dashboard quick action + collapsed-rail DB icon): tabs Data types │ Option sets │ Pages │ Styles, parsed LIVE from the cloned Buildprint workspace by `GET /api/bubble/state` (`bubbleState()` in server.js — reads each `data_types/<x>/type.json` fields + privacy_role, `option_sets/<x>/option-set.json` values, `pages/<x>/page.json` + workflow/element counts, styles/). Every live DT row shows **company ✓/✗ + property ✓/✗ Pattern A badges** (red/green), field + privacy-role counts, expandable field table + privacy roles; option sets expand to value chips (display + db_value); filter box; "deleted" toggle (64 soft-deleted DT relics hidden by default).
- **"⟳ Refresh from Bubble"** → `POST /api/bubble/refresh` = `buildprint sync` + re-parse + diff vs the brain-ingest baseline (does NOT advance it). Banner: "N file(s) changed since the brain last ingested → **Sync into brain**" (hands off to the existing bpTrack streaming ingest) or "✓ Brain is up to date with Bubble". Verified live: sync ran clean, up-to-date banner shown.
- **Packet generation now grounded in live Bubble state**: `/api/plans/generate` adds the workspace via `--add-dir` and PLAN_GEN_PROMPT instructs: check data_types/option_sets reality, trust the workspace over brain/ on conflict, flag drift in step details.
- Verified in-browser desktop + mobile (46 live DTs render w/ correct badges, tabs/filter/expand work, no console errors, no mobile overflow).

### 2026-07-15 — Session: Buildprint INVENTORY ingested (bp chat, read-only)
- Ran the prerequisite real-state inventory of the test branch (`buildprint sync` clean at `a297cb2b`; 6 parallel read-only agents over data_types/option_sets/pages/api/settings; `buildprint audit` re-run — same 45 highs; zero workspace edits, no apply).
- Headlines: 110 DTs = 46 live + 64 soft-deleted, **0 live DTs meet Pattern A** (24 no-rules, 15 public-everyone incl. 06 Employee PII with autobind, 2 company-only, 4 property-only, 11 Report logged-in-only); 98 OS = 74 live + 24 deleted; 29 backend WFs (19 ignore privacy rules; 1 candidate PUBLIC no-auth endpoint `add_user_to_read_by_all_reports_copy`); 343 page WFs with a concrete legacy-cleanup list.
- Ingested into brain/ (database, option-sets, security, workflows, migrations, design + changelog) and refreshed the dev-tracking files (this file, CLAUDE.md, README.md). Inventory numbers cross-checked: audit's 39 public-data-types = inventory's 24+15 exactly.
- Discrepancies for Vlad: `OS - Module` has 47 live entries vs the locked 46 module list; no RE_CasinoSettings page exists (queue item 1 not started); country-migration run-status unverified. Decision candidates for decisions.md (NOT appended — Vlad's call): Company/Property own-table privacy-rule shape as Pattern A exceptions; fate of the 64 soft-deleted DTs.

### 2026-07-15 — Session: deep audit + Build packets (Task 30 shipped)
- Ran a 6-agent deep analysis of the app (90 findings; report at `crs-brain/data/docs/app-audit-2026-07-15.md` — unfixed items are the standing backlog).
- **Task 30 SHIPPED — Build packets + Buildprint prompt drafter.** `crs-brain/data/plans.json` (seeded with the prerequisite Plan-mode INVENTORY packet — the audit says nothing in brain/ is verified against real Bubble state until that runs). Server: GET/PUT `/api/plans` (validated), POST `/api/plans/generate` (claude, grounded in brain/+decisions+CLAUDE.md, module must be one of the locked 46, strict-JSON out), POST `/api/plans/step-prompt` (pure template — no LLM; bakes in TEST-only, sync→plan-stop→check→apply, forbidden flags, Pattern A, naming rules, structure-only note). UI: right-panel **Build plan** section (packet switcher, step rows w/ status dots, click-status to advance / shift-click revert, expandable detail, linked bp chat) + dashboard **Build plan** card (next step + Draft button + module input → Generate packet). Draft → prefills a NEW bp:true chat with the hardened prompt — NEVER auto-sends (review = the plan-before-apply gate); on send, step→prompted + chatId linked (streamChat meta hook). Statuses: pending→prompted→applied→verified→ingested.
- **Bug fixes from the audit**: map loop `dt` always 0 (my battery-fix regression — all animation was frozen; note: rAF doesn't fire in the hidden test browser, so verify visually); `findBpWorkspace` could fall back to a non-test (even live) clone — now test/dev only; PUT `/api/settings` wiped all other settings keys — now merges; a claude error lost the user's message/new chat — now persisted; aborted bp/track no longer advances the diff baseline (changes stayed re-syncable); auto-track >150-file diffs now say "…and N more"; chat delete now confirms; Chats tab returns to the open conversation; bp status re-checks on tab switch; ingest/bp chats refresh file tree + recently-edited; dashboard knowledge tiles no longer open an empty explorer (auto-All for out-of-project dirs); reopened chats keep Try again/Continue (partial persisted); mobile dashboard horizontal overflow (grid min-width:0).
- CLAUDE.md "Bubble work via Buildprint" section rewritten to the real CLI/test-branch flow (was still "paste into web, DEV branch" — would have poisoned packet generation).
- NEXT (from audit, in order): run the INVENTORY packet step (its prompt is ready — everything in brain/ is spec-only until ingested); structural apply-gate (PreToolUse hook / allowedTools narrowing on bp chats); bpTrack client resilience + queued-prompt chat binding; digest scheduling + regrounding; Bubble-entity map endpoint; ideas→packet promotion.

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
