# CRS Brain — UI/UX Findings

Branch: `ui-ux-overhaul`. Authoritative style source: `design/tokens.css` + `design/design.md`.

## Labeled assumptions (operating rule #9)
- **A1 — Accent is `#3B82F6`, not `#1D4ED8`.** Rule #2 says design.md wins; `tokens.css` defines
  `--accent:#3B82F6` (the prompt's `#1D4ED8` is design.md's `--accent-active`). Using `#3B82F6`.
- **A2 — UI font is `Inter`, not IBM Plex Sans.** `tokens.css --font-sans: 'Inter'`. Rule #2 → Inter.
- **A3 — Data/mono font is `JetBrains Mono`** (matches both).
- **A4 — The git repo root is `crs-progress/`; the app is `crs-progress/crs-brain/`; the knowledge
  ledger is root `crs-progress/brain/`.** (An earlier stray `crs-brain/brain/` was corrected.)
- **A5 — Screenshots:** captured by driving the app in a headless browser. Saved to `audits/ui/<phase>/`
  where the pipeline runs; where disk capture isn't available, DOM/visual inspection is recorded here.
- **A6 — "Baseline" is partially post-fix:** several surfaces were already rebuilt in prior passes on the
  working tree before this branch existed. Findings below mark **[FIXED]** vs **[OPEN]** honestly.

---

## Shell (header / sidebar / right bar / footer)
- **[FIXED] Empty header.** Was: only a view title + floating view tabs. Now: title, **usage chip**
  (session/weekly %, click → detail popover), **notifications bell**, **settings gear**, view switcher.
  Fails standard: wasted prime real estate. Fix shipped in `public/index.html` `.center-head`.
- **[FIXED] Overloaded right rail.** Was: Usage + Build Plan + Recently Opened + Recently Edited stacked.
  Removed entirely (grid 3→2 col); usage moved to header. Rule: no dumping ground.
- **[FIXED] Sidebar dead items.** "Recently opened / Recently edited / Build plan" removed from the rail.
- **[OPEN] Chats/Buildprint split still in sidebar.** The two entry points share one input but the switch
  is a sidebar tab — must move ABOVE the composer (W4).
- **[OPEN] No footer** — confirmed none; nothing to remove. ✓ (verify remains true after W-changes.)

## Dashboard
- **[FIXED] Busy/vanity layout.** Was: greeting + 5 uneven KPI tiles + 11 identical actions + inline packet
  generator + KB stats + composer. Now: even KPI row, 6 distinct actions, Tools row, Recent + Next-step cards,
  no composer. Remaining polish: empty/loading/error states per widget (W3 acceptance) — **[OPEN]**.

## Quick actions
- **[FIXED] Look-alike actions.** Was: all 11 identical blue-tint icon boxes → had to read labels.
  Now: 6 primary with distinct Feather icons + tokenized per-action tint (blue/purple/cyan/amber/green/soft).
  Remaining: confirm all icons are Feather + consistent stroke/size scale — **[OPEN, minor]**.

## Theming / tokens
- **[FIXED] No light mode.** Now: full `:root[data-theme=light]` whole-palette swap, persisted, instant.
  Header/scrollbar/code/prose/veils made themeable. Toggle in Settings → Appearance.
- **[OPEN] Raw hex audit incomplete.** Several one-off colors remain in `map.html` / `tree.html` (see below)
  and a few in `index.html` chat/file views (error text `#e8938b`, danger `#EF4444` literals). Must grep +
  route through tokens per DoD.
- **[OPEN] Rainbow/orange.** `map.html` (galaxy + kanban/list board) uses orange/purple glow; `tree.html`
  likely uses multi-color. Accent must be blue-only; status colors a single restrained tokenized set.

## Kanban (in `map.html`, shown via iframe)
- **[OPEN] Terrible board.** Cramped between header + composer; narrow truncated columns; busy 2-row toolbar;
  purple column dots + orange. Needs full-area redesign, neutral surfaces, blue accent for active/selected only,
  per-column empty/loading states. (W5)

## Progress tree (`tree.html`)
- **[OPEN] Fake tree / too busy.** Doesn't read as a tree. Rebuild as left-spine / right-branch vertical
  timeline with date markers; tokenized node states; whitespace over density. (W6)

## Chat
- **[FIXED] Live token counter + tool-use visibility.** Generation meter (elapsed + ↑in/↓out tokens live);
  work-blocks already surface tool calls (Read/find/ls/grep/Thinking) with expandable detail.
- **[OPEN] Mode switch + templates.** Need one chat view, Regular/Buildprint segmented switch above the input,
  and mode-aware distinct template cards that seed the input. (W4)

## Navigation
- **[FIXED] Folder → file → Back bug.** `explOpen` now records `explPath`; `openFile` flags `beforeFile='expl'`;
  `goBack` reopens the explorer at that folder. Verified (brain → design.md → Back → brain).
- **[OPEN] Full NAV-TEST** of every control not yet formalized → `audits/ui/NAV-TEST.md`. (W8)

## Features (new modules)
- **[FIXED] Notifications module** — bell + unread badge + inbox (mark-read/clear); central `notify()` =
  toast + sound + persistent store; selectable Web-Audio sound + Test; email best-effort via sendmail;
  outcome events wired (generation done/failed/stopped, connection online/offline).
- **[OPEN] Notifications: per-type opt-in/out; email via configurable SMTP (W10); more event types.**
- **[FIXED, partial] Connections** — Claude auth status + sign in/out; Buildprint token → `buildprint link`.
- **[OPEN] Connections: SMTP fields + secrets in `.env.local` + test-connection + masked persistence.** (W10)
- **[OPEN] Bubble Best-Practices KB** (W11) — not built. Seed "Conditional Style Swapping".
- **[OPEN] Brain toolset** (W12) — web search / WebFetch already in the spawn allow-list; formalize repo
  read/write, git, run-buildprint as a documented, status-surfaced toolset.
