# Checkpoint — BRAIN PROGRAM 3, PHASE 2 (⌘K palette) — COMPLETE 2026-07-18

## Gate proof (independent verifier — PASS 4/4, CDP rig, both themes, zero console)

- **PALETTE.1 PASS** — decision "Pattern A…", a real old chat ("Count…"), and report buttons/c1 each land at index 0 (query + Enter, ≤3 keystrokes); grouped by kind with icons; open routing honors the window policy (decisions→doc window, chat→openChat, report→openDocWindow).
- **PALETTE.2 PASS** — `>` lists all 12 commands; `>smoke`→Run smoke QA POSTs /api/smoke/run (21/22); `>theme` flips data-theme; `>settle`/`>send` prompt then cancel → runSlashCommand NOT called (no freelance).
- **PALETTE.3 PASS** — mtime-gated index both directions: add todo → searchable in 61ms; delete → gone in 15ms.
- **PALETTE.4 PASS** — keyboard-only (arrows move .res.on, Enter opens, Esc ladder closes only the palette with a doc window behind it surviving); empty→6 recent chats w/ 📌 pinned; both themes bg differ.

## Built (commits 9858aab + adjacency-sort fix)

- **T1 /api/search** (server): zero-dep global index over chats/todos/modules/wishlist/decisions/checklist/prompts/chunk-reports; mtime-gated cache (rebuilds only on store change — incremental without a watcher); rank exact-prefix > word-prefix > substring, shorter-label tiebreak.
- **T2/T3 palette** (index.html): extended openPal/palFilter/palRender — client files instant + server global index; results clustered by kind (sort fixes the verifier's repeated-header note); `>` command mode = 12 actions (6 operator slash-commands + New prototype/Run smoke QA/Generate handoff/Weekly digest/Toggle theme/Toggle DND) routed to existing APIs with confirm on mutations; empty→recent (pinned-first); full keyboard ladder; kind icons via PAL_ICON.

**Gate to PHASE 3: OPEN.**
