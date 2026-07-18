# CRS Brain — User Guide

Written from the BUILT system (2026-07-18). Every step below was executed on the running app before being written down. Start the app: `cd crs-brain && npm install && node server.js` → http://127.0.0.1:4317 (or `start.command` / `start.bat`).

## 1. Prototype → settle → chunks → send → verify

1. Open the dashboard (app home). In the **Build plans in flight** card, click **New prototype** — the Prototypes panel opens as an in-app window.
2. To scaffold fresh: type a name, pick a module and a template (blank / card grid / form panel / table view), click **New prototype**. To adopt an existing design html: put its repo path in the second row (or right-click an .html in the file explorer → **Register as prototype**), pick the module, click **Register**.
3. Click the prototype card → **Open prototype**. It opens fullscreen with the prototype bar: status chip + version count, **◐ Theme**, **⬇ Snapshot**, **✓ Mark settled**. Edits to the file (Tier-1 editor via ✎, chat edits, or external editors) live-reload the preview within ~1s.
4. Iterate; **⬇ Snapshot** whenever you want a restore point. When the design is final, **✓ Mark settled** — the byte hash freezes. Any edit after that reverts it to draft with a warning; re-settle to continue.
5. In the panel card: **Run mapping**. The mapping table shows every token, component, and interaction; **FLAGGED rows block chunking** until you resolve each (Map → type a canonical token · Approve literal · Fixed in proto). The chunker never invents a token or approves anything itself.
6. **Build plan** → dependency-ordered chunks (styles → layout → components → states → workflows). Per chunk: **Generate** (engine emission — guard-stopped if ANY chunk touches an open decision), **Copy → sent** (copies the prompt for Buildprint and flips status), **Report…** (paste BP's report → status `reported`), **Verified ✓ / Failed ✗** (yours alone). Failed chunks get a corrections box — fill it and **Regenerate**.
7. All chunks verified → the prototype flips to **built**. Every emission is archived in `brain/buildprint/generated/` stamped with bundle hash + prototype hash + chunk id.

## 2. Todos & follow-ups

1. Dashboard → **Todos & follow-ups** card: type in the box, Enter (or **Add**).
2. From chat: type `add todo <text>` in the chat composer — it goes to the task store, no model call.
3. The checkbox toggles done; the status chip cycles todo → doing → blocked; ✕ deletes (hover the row).
4. Link chips open their target (module → Progress Tree, chunk/prototype → panel, decision → decisions.md, wishlist → Wishlist).
5. Auto items manage themselves: marking a chunk **sent** raises "Await BP report" (due +1 day; overdue floats up with warning styling and rings the bell); pasting the report closes it. Guard stops raise decision todos that close when you resolve the decision. QA failures and sync failures raise todos that close when green again.

## 3. Decisions workflow

1. Open questions live as `## [OPEN]` stubs in `decisions.md` (repo root) with a `Triggers:` line. The board's **Needs me → Decisions needed** lists them; **open decisions.md** opens the file in a document window.
2. Any generation whose intent/scope matches a trigger is HARD-STOPPED with `DECISION-NEEDED` — including every chunk of a plan if any single chunk touches it.
3. To rule: add a dated `## YYYY-MM-DD — <ruling>` entry at the top of decisions.md and DELETE the stub. The guard unblocks and the linked decision todo auto-closes on the next dashboard refresh.

## 4. Sync + digest

1. The three Bubble watchers (forum digest, release notes, issue check) run daily on their own; **Row 4 → Sync** shows each source's last run. Manual triggers live in Settings → Connections and the Bubble panel.
2. **Quick actions → Sync Buildprint → brain** pulls the latest Bubble workspace changes into the ledger (auto-tracked every 20 min too).
3. **Quick actions → Weekly digest** opens the latest `brain/digests/YYYY-Www.md` (generates the first one if none). It compiles commits by prefix, checklist trend, open decisions with tracked age, sync stamps, and your oldest todos — regenerated weekly by the scheduler.
4. The daily **state audit** cross-checks modules.json ↔ STATUS.md ↔ plans ↔ todo links ↔ prototype hashes and reports drift into **What's wrong** — it never edits anything. **QA cycle** tile shows audit + smoke stamps.

## 5. Notifications & sounds

1. Bell (header) → inbox; click a row to open its target; **Mark read** / **Clear**.
2. Settings → **Notifications**: master DND (banner+sound muted, bell still records), banner duration slider, and a per-type matrix — every type has Banner / Sound / Bell switches, a sound picker, and a **Test** button.
3. Settings → **Sounds**: volume, per-event sound assignment, **Play** previews, **Regenerate** re-renders all 24 WAVs offline.

## 6. Explorer & windows essentials

1. **Quick actions → Browse files** opens the OS-style explorer (always the FULL repo tree). Double-click opens; right-click for the full menu (including **Register as prototype** on .html and **New prototype** on empty space); drag to move; ⌘C/⌘X/⌘V; F2 renames (extension kept unless you edit it); deletes get a 6-second **Undo** toast.
2. Documents open in windows: drag, resize, snap to edges, minimize to the taskbar chips, fullscreen (⛶). Esc closes the focused window. Text/CSV/JSON edit in-app (Ctrl+S saves; invalid JSON refuses to save); xlsx edits in a grid; pdf/docx are view-only — use **Edit externally**.
3. Tool pages (Progress Tree, Activity, Memory, Wishlist, Task queue, Prototypes) open as in-app windows — nothing opens a browser tab.

## Troubleshooting (from the QA + judgment-call history)

- **"Prototype reverted to draft"** — the html changed after settle (any editor). Deliberate? Re-settle. Unexpected? Check the file's git history.
- **"chunking REFUSED — unresolved FLAG rows"** — resolve every FLAGGED mapping row first (that's the drift-killer working, not a bug).
- **"DECISION-NEEDED … WHOLE PLAN STOPPED"** — an open decision stub matches your plan's scope. Rule in decisions.md (flow 3), then regenerate. Zero chunks are emitted until then.
- **Engine change not taking effect over HTTP** — chunk-engine modules reload per request, but OTHER server code needs a server restart (require cache).
- **Buildprint CLI "Unauthorized"** — run `buildprint link <token>` (Buildprint web app → Integrations → CLI). Until then the app degrades gracefully (issue checker read-only, bridge/copy path manual).
- **Bell shows nothing new** — it polls; give it a few seconds, or reopen the inbox.
- **App feels stale after an update** — the shell never auto-reloads (it could kill an in-flight generation); click the "App updated · Reload" banner when it appears.
- **Sounds silent** — check Settings → Notifications DND and the per-type Sound switch before blaming the WAVs; **Test** per type isolates it.
