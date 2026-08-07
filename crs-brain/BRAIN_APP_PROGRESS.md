# CRS Brain — Build Progress

> Checkpoint for the **CRS Brain app** (`crs-brain/`) — the local second-brain tool that helps build the CRS Bubble app. This file is the zero-context-loss handoff between sessions. The CRS *product* itself is documented in `CLAUDE.md`, `decisions.md`, and `brain/`.

Last updated: **2026-08-06**.

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
- To operate Buildprint from the Mac you also need the **Buildprint CLI linked + the Test branch cloned** on that machine — see `brain/buildprint/CLI-MCP-PLAYBOOK.md §5` (`npm i -g buildprint` → `buildprint link <token>` → `buildprint project clone <appId> --branch test` into `~/projects/crs-bubble/`). The workspace path is per-machine; the app finds it automatically. Without the clone the chat still works — Buildprint capability just degrades with an honest note (not a hard error).
- Optional: `npm install -g agent-browser` for screenshots/visual verification.

---

## Current feature set (snapshot 2026-07-16 — read this instead of all the logs)

- **Chat + Buildprint copilot** (`index.html`): Claude-style chat, grouped "Worked for Xs" activity blocks, ONE chat (no mode switch — every session also drives Buildprint; see the 2026-08-06 merge log), persistent **memory** ("remember this…" → compiled + injected into every prompt; `memory.html`), **action log** with savepoint-aware rollback (`activity.html`), hard safety gate (`bp-guard.js`) + auto command logging (`bp-log.js`), guardrailed prompt generation (PROMPT-STANDARD + templates).
- **OS-style file explorer** (in `index.html`): windowed (drag/resize/snap/maximize/fullscreen/minimize-chips), list+grid views, marquee/kb selection, context menus with typed New-file submenu, inline extension-masked rename, cut/copy/paste, drag-drop moves with spring-loaded folders, 6s **Undo**, favorites + collapsible sidebar, recursive search, item-anchored hover previews (files AND folders), **document popup** (md rendered / code highlighted / csv table / pdf embed / html sandbox), **OS interop** (drag in from Explorer incl. folders, Ctrl+V OS files/screenshots, drag OUT via DownloadURL, Download / ZIP / Copy-content menu). Explorer always shows the FULL repo tree; server ops all `safeRepoPath`-guarded (`/api/fs/*`, `/api/upload`, `/api/zip`).
- **Icons**: approved two-tier generator `icons.js` (badge tier ≥40px / glyph tier <40px), used at every render site.
- **Other pages**: `map.html` galaxy map + kanban (dept hubs all linked to the CLAUDE.MD center; promoted subfolder clusters are namespaced — a `#data` id collision used to leave one hub floating), `tree.html` Progress Tree (46 modules), `wishlist.html` (app todos + Claude-Code prompt generator per item).
- **Cross-platform**: zero-dep server, node_modules gitignored (per-OS builds), `.gitattributes` line-ending lock, `doctor.js` health check, `start.bat` / `start.command` launchers.

---

## HANDOFF 2026-08-07 → Mac

`crs-brain/HANDOFF.md` is the pick-up point: how to start the app on the Mac, the QA rig
inventory and how to repoint the Chrome path, what shipped this stretch, and the OPEN
items. Two of those are live decisions Vlad already made that are NOT yet implemented:

1. **Upgrade the Claude Code CLI (2.1.120 → 2.1.223).** Approved, attempted, and it did
   NOT happen — the `winget upgrade` call errored and the CLI is unchanged at 2.1.120.
   This is what blocks the "Weekly · Fable" bar: measured, that build's statusline payload
   carries only `five_hour` and `seven_day`.
2. **Usage window title should show the ROUTED model**, not the model this chat last ran
   on. Decided; `brainModel()` in `usagewin.js` still does the latter.

## Session 2026-08-07 (Windows) — the missing Fable weekly bar: measured, not argued

Vlad kept reporting the per-model weekly limit was missing; I kept asserting the payload
did not carry it. Settled it with evidence instead: `statusline.js` now writes the last
raw payload that actually carried `rate_limits` to `data/statusline-raw.json` (gitignored),
and a Haiku probe was run to force a render.

**Result — Claude Code CLI 2.1.120 emits exactly two windows:**
`rate_limits = { five_hour: {used_percentage, resets_at}, seven_day: {used_percentage, resets_at} }`.
No per-model bucket, no overage field. The desktop app's "Weekly · Fable" row comes from
somewhere the statusline hook does not expose.

**The likely fix is a CLI update: 2.1.120 → 2.1.223 is available** (`winget upgrade
Anthropic.ClaudeCode`). Not run unattended — upgrading the CLI mid-session would disrupt
running sessions, including the one doing the work.

The window is already ready for it: rows are generated from every key in `rate_limits`, so
if a newer build emits `seven_day_<model>` the bar appears with no further code change.
Re-check after updating by deleting `crs-brain/data/statusline-raw.json`, pressing Refresh,
and reading the file — the capture is self-verifying.

## Session 2026-08-07 (Windows) — usage window: four real fixes

All four complaints were valid; the first version shipped with them.
- **The header said "Opus 4.7 (1M context)"** because it printed `usage.json`'s `model`,
  which is whatever INTERACTIVE Claude Code session last rendered a statusline — a
  different session on a different model. It now shows the model the BRAIN is running
  (live routed model → this chat's last model → the composer pick).
- **Per-model weekly buckets** are no longer dropped: the rows are generated from
  every key in `rate_limits`, with `seven_day_<model>` rendered as "Weekly · <Model>".
  Standing fact: this Claude Code build emits exactly `five_hour` and `seven_day`, so
  a Fable row only appears if/when the payload carries one. Nothing is invented.
- **The context row is now THIS CHAT's** (`GET /api/usage/chat`): the newest turn's
  input tokens — whole replayed conversation plus cache reads — against that model's
  window, live from the stream while a turn runs. `tokensIn/tokensOut` are persisted on
  each assistant message from now on; older chats fall back to a transcript estimate,
  labelled "estimated from the transcript" rather than shown as measured.
- **"Limits read 9m ago"**: the poll was already 10s (now 4s) — the SOURCE was stale.
  Claude Code has no usage command and headless `claude -p` never fires the statusline
  hook, so the only way to force a fresh reading is an interactive session. The probe now
  runs on **Haiku** instead of the user's default model (the old comment forbade this
  because forcing a model made the panel report it — that was a display bug, fixed above),
  which makes it cheap enough to offer an opt-in **auto-refresh every 3 minutes**. Off by
  default, paused on a hidden tab, never mid-turn.
- **Gotcha worth remembering:** `index.html` declares `state` with `let` at the top level
  of its inline script, so it is a LEXICAL global and `window.state` is `undefined`. The
  window read `window.state.chatId` and silently got nothing. Bare identifier, guarded.

## Session 2026-08-07 (Windows) — Ask Protocol v2: no question can reach Vlad as prose

Goal, verbatim: *"I never want to receive a question as a plain-text paragraph in a chat
response again."* Three separate causes, all fixed, plus a backstop that makes it a
guarantee rather than an instruction. Verified 24/24 by `probe-askpin.js` against the
real server and a real browser (no model calls — asks are created through `/api/ask`
exactly as the MCP shim does).

**LOCKED RULES (new)**
1. **A pending question is NEVER rendered inside the message stream.** It is pinned in
   `#askPin`, a direct child of `.composer-wrap` above the composer, at the composer's
   768px width. `renderChat()` wipes `#chatLog`, so the pin deliberately lives outside it.
2. **The T5 [OPEN]-decision boundary is still enforced, but it UPGRADES instead of
   rejecting.** `createAsk` used to return an error telling the session to emit
   DECISION-NEEDED, which left prose as the only route — the exact behaviour being killed.
   It now re-enters itself as `kind:'decision'`. What the boundary actually protects is
   unchanged: a decision still cannot be auto-answered by a Playbook standing rule.
3. **A decision card never writes a standing answer.** It appends a `[CANDIDATE]` entry to
   `decisions.md` (newest at top, append-only) via `appendDecisionCandidate()`. It is
   written as a candidate, not a locked ruling, because Vlad clicked an option — he did not
   author the rationale. Ratifying it by hand is still a separate act.
4. **The free-text answer is always visible on every card.** It used to hide behind an
   "Other…" button, which made typing read as a fallback.
5. **A question that ends a turn in prose is intercepted server-side.** `looksLikeProseQuestion()`
   + `parseProseOptions()` run after `finalText`; if no card was raised during the turn
   (`LIVE_TURNS[chat].raised`), one is raised with the options parsed out of the text.
   Logged to `ask-log.jsonl` with `source:'backstop'`, so how often sessions try it is visible.

**Also in this pass**
- `decide_with_vlad` added to `ask-mcp.js` (tools list + dispatch) and to `--allowedTools`;
  the shim tells the session when its ask was upgraded so it knows the answer is going into
  decisions.md. The long-poll blocking contract is untouched.
- Both ASK PROTOCOL clauses in the injected prompt rewritten: never ask in prose, operational
  → `ask_vlad`, architectural/[OPEN] → `decide_with_vlad`, both block.
- **An answered question stays in the transcript as a Q&A block** (question + answer +
  who answered), not a one-line receipt — Vlad: *"when i answer questions this kind of
  messages shall be in the chat"*.
- **Nothing polled `/api/ask/pending` before**, so a card could only ever appear via a live
  SSE turn. Added `restorePendingAsk()` on boot / chat open / turn end, plus a 12s poll when
  nothing is pinned — a backstop ask outlives its turn, and asks survive a server restart.
  The pin shows the NEWEST pending ask; picking the oldest showed a stale question.
- Sidebar: search is full width with a search icon, New chat is its own full-width row below it.

## Session 2026-08-07 (Windows) — the colourful AI brain is back

Vlad: *"colorful animation when in chat mode the brain is thinking its awesome and
yours no colors and stupid circle around"*. **Correction worth remembering: it was NOT
still working in chat** — the 08-06 redesign had killed it (`.brainwrap .mol{display:none}`,
flat `--accent` stroke, halo and hue-rotate deleted, and the `#g-ai` gradient removed from
the defs). It was recovered from `f609abb` and restored, then scaled up for the hero.

- **Restored in chat**, verbatim from history: `#g-ai` gradient stroke, pulsing
  `rgba(168,85,247,.45)` halo, `aihue` hue-rotation, five glowing molecules on
  counter-rotating orbits. Scoped to `.chat-brain` and `.wstep.run` only — **the sidebar
  brand badge stays flat grey and static** (rig-asserted).
- **The hero hover is the same language, multiplied**: five tilted orbital planes,
  counter-rotating at five different speeds (two reversed), fifteen glowing molecules in
  the AI palette, twelve twinkling motes drifting the other way for parallax, a breathing
  purple halo, the glyph on the gradient, and `dhcHue` shifting the whole field.
- **The "stupid circle" was a CSS inheritance bug**, not a design choice: `.dash-hero
  .dh-mark svg{stroke:currentColor}` inherits into every child, so the soft radial halo
  circle got a hard 1.1px outline and read as a bubble drawn through the greeting.
  `.dh-cosmos circle{stroke:none}` fixed it — only the orbit ellipses are stroked.
- Recorded as a **decision**, not a drive-by: see `decisions.md` 2026-08-07 — the AI
  thinking layer is the one colour carve-out, and it supersedes exactly one clause of the
  08-06 entry. Colour never shows at rest, so §10 acceptance still passes 13/13.
- Rigs: `probe-thinking-brain.js` (8 checks, builds the indicator by injecting
  `brainHtml()` so **no model call is spent**) and `shoot-atom.js` (14 checks).

**Hover choreography is now ONE gesture.** Vlad: *"animation timing of cards appearing
and the brain shrinking and galaxy around must be flawlessly synced"*. They were three
separate transitions — 0.6s cubic-bezier on the shrink, 0.38s ease +0.04s delay on the
atom, 0.16s ease +0.28s delay on the cards — and worse, two different triggers
(`.dh-stack:hover` for the atom, `.dh-id:hover ~` for the cards). Now:
- Three vars on `.dash-hero` — `--dh-open:520ms`, `--dh-close:360ms`, `--dh-ease` — drive
  all three. Change them in one place and everything still moves together.
- **One trigger for all three: `.dh-stack:hover` / `:focus-within`.** The stack contains
  both the mark and the cards, so travelling between them can never drop the state, and
  the old exit-delay hack that existed to survive that travel is gone.
- `probe-sync.js` samples the shrink (from the transform matrix), the atom opacity and the
  card opacity *together* mid-flight and asserts their progress spread stays ≤0.1 — it
  measures 0.000 on both open and close.

**Third cut — the atom, rebuilt from web research.** Two rejections first:
dashed rings ("dashed and static") and a 7-dot follower trail ("looks like a snake
game / terrible"). The trail failed for a measurable reason: on a 223-unit orbit the
dot spacing was 4.7 units against a 4.8-unit head diameter, i.e. exactly one diameter
apart, which can only ever render as beads. Researched how the good ones are built and
replaced the ARCHITECTURE, not the parameters:

- **Each plane is a CIRCLE squashed by `scale(1,k)`, not an ellipse path.** That gives
  correct non-uniform orbital speed for free — fast across the middle, slow at the
  turnarounds. `offset-path` moves at constant ARC length and physically cannot do this;
  constant-speed travel round an ellipse is the classic tell of a fake 3-D orbit.
- **The tail is ONE gradient stroke**, split into three arc chunks whose stop opacities
  match at the seams so it reads as a single continuous fade, stroke-width tapering
  2.6 → 1.9 → 1.1 and ending at opacity 0. A gradient tail *is* the motion blur. (A
  `linearGradient` can't follow a curve; matching seam opacities across short chunks is
  the standard workaround.)
- **The head is baked radial paint** — a 4-stop `radialGradient` glow plus a near-white
  2.1px core — never an SVG filter. A filter on a moving element re-renders every frame;
  baked paint is just a texture the compositor translates.
- **`dhcDepth`** brightens and grows the head crossing the near side and dims it away at
  the back, locked to the orbit period. Biggest single 3-D cue after the squash.
- **Durations must share no factors** — 34/26/48 all divide by 2 and the system visibly
  re-syncs into a beat. Now 33.7 / 26.3 / 47.9 / 41.3 / 55.1s.
- **A whisper-faint SOLID track** (stroke-opacity .05) sits behind each comet. Below
  conscious perception, but without it the comet reads as drifting rather than orbiting.
  Never dashed.
- **Opacity budget:** outer haze .04–.08, mid .12–.20, and the only thing near 1.0 is the
  2px head. That contrast is the premium look; the earlier version had 120 objects all
  competing with it.
- **120 animated nodes → 30.** Rig asserts ≤30, zero dashed strokes, zero filters on
  moving strokes, linear easing on every orbit, and that the glyph shrinks 72px → 29px.
- Also this pass: the glyph eases down into a nucleus on hover, every mote pulses, and
  the background glow came down (it read as a lit disc).

**Follow-up the same day — "everything must animate".** Vlad: *"links in animation are
kinda plain not animated and i want them to be fading not fixed … super futuristic every
element mast be animating everything"*. The orbits were static dashed ellipses being
rotated rigidly by their parent; nothing else about them moved. Now:
- Every orbit runs **two** animations at once — `dhcFlow` slides the dash pattern along
  the path (charge moving through the link) and `dhcFade` breathes its opacity on a
  longer, offset cycle, so no ring is ever at constant strength. The `flow` distance per
  orbit **must** be a whole multiple of (dash + gap) or the pattern jumps on loop.
- **`dhcTip`** squashes each orbital plane through edge-on and back on its own cycle
  (11 / 7.5 / 14 / 9 / 17s) — that, not the spin, is what makes it read as a 3-D atom.
- A short bright **`dhc-arc`** races the full circuit of every ring; molecules throb
  (`dhcThrob`) while they travel; motes swell (`dhcSwell`) as well as twinkle; a nucleus
  glow pulses behind the glyph. The rig asserts **every** element type has a non-`none`
  animation.
- Motes need `transform-box:fill-box;transform-origin:center` — SVG's default origin is
  0,0, so scaling would swing them toward the nucleus instead of swelling in place.
- **Deliberately NOT added: expanding ripple rings.** They animate, but every individual
  frame of one reads as a circle drawn around the mark — the exact thing Vlad rejected.
  Same reason the earlier `.dhc-shell` is gone. The rig now asserts zero of them.

## Session 2026-08-07 (Windows) — ONE screen, Map-only header, in-map view selector

Vlad: *"i clicked chat on the header and got this screen … i dont need two separate
screens no point"*. Verified 23/23 by `probe-one-screen.js`; acceptance still 13/13.

- **Home IS the chat.** There is no dashboard screen. `showDashboard()` survives as the
  name every entry point already calls (rail Home, brand, ⌘K, `#view=`, `surfaceBack`,
  the QA rigs) but now just opens a fresh conversation. `#dashView` stays in the DOM,
  permanently hidden, so the display guards that read it and the `dashFull(true)`
  escape hatch (old panel dashboard, via `showDashboardLegacy()`) keep working.
- **One hero, defined once** (`heroHtml()`): breathing 72px `i-brain` mark + a
  time-of-day greeting ("Good morning/afternoon/evening/night, Vlad"). The live status
  line and the hint row are **gone** — Vlad: *"remove this no need"*.
- **Quick actions hide until you hover the mark.** `.dh-cards` is absolutely positioned
  (out of flow → revealing it never shifts the greeting; rig asserts 0px shift) and lays
  out 5-across so its two rows clear the composer. Hover is on `.dh-id` (mark + greeting)
  with a 0.28s close delay so travelling to the cards doesn't dismiss them; `:focus-visible`
  on the same element makes it keyboard-reachable.
- **Header: Map only.** Chat is gone (home is the chat) and Kanban/List moved into the
  map. A lone `.viewseg.solo` drops the segment track and renders as a plain button.
- **Kanban/List/Ideas now live ON the map** (`#mapViewSeg`, top-centre, the one empty lane
  in that chrome). It replaces the old `▦ Board` button. `currentMapView()` derives the
  marked view from state (boardOpen / boardTab / `body.blist`) rather than from what was
  clicked, so the hash, the app's Map button and the drawer can't drift. It stays visible
  on a phone when the board goes full-screen — otherwise there'd be no way back to the galaxy.
- **Header is taller: 44px**, driven by `--cc-titlebar-h` (previously declared but unused,
  with 36px hardcoded twice). `.upop`/`.ninbox` now anchor to the token, and `.hgroup`
  stretches to full header height so its popover drops clear of the taller bar.
- Two acceptance instruments were corrected (not the app): **A2** asserted "top 4 pixel
  colours are spec surfaces", but a correct home screen now shows only THREE surfaces —
  4th place is glyph antialiasing at 0.2%. It now asserts top-3 are surfaces AND the ramp
  covers ≥90% (97.36% actual). **A9b** measured the composer border as "before" while home
  had already autofocused it; it now blurs first.

## Session 2026-08-06/07 (Windows) — Claude-Code 1:1 redesign

The whole app was restyled to Vlad's measured Claude Code Desktop spec, saved verbatim as
`brain/design/claude-code-spec.md` (source of truth; `decisions.md` 2026-08-06 records why the
brain app diverges from the CRS product design system). Acceptance = `verify-spec-acceptance.js`
(§10, 13 checks) — currently 13/13.

- **Not orange.** Warm near-black greyscale ramp; Clay `#D97757` appears ONLY on the Claude spark
  glyph / thinking spinner. Applying Clay as a theme colour was the single biggest earlier error.
- **Surfaces are exactly three**: sidebar + header `#1D1D1C`, chat/working area `#20201F`,
  inputs and secondary `#262626`. `--cc-bg-header` is an alias of `--cc-bg-sidebar` by design.
- **No double focus ring.** `--accent-glow` is `transparent` (kills every legacy `0 0 0 3px` ring);
  focus is a ~10%-brighter border edge only (`--cc-focus-ring`).
- **Header carries all tools** as hover-revealed groups (Build / Knowledge / Ops + a View segment,
  spec in `brain/design/header-tools.md`) and shows **no page title** — buttons and indicators only.
- **Main screen = calm hero + starter prompts.** `DASH_HERO` gates it; the old dashboard panels are
  preserved behind the flag (`dashFull()`), not deleted. The hero is the 72px breathing `i-brain`
  mark + greeting + one real status sentence + the 10 starter prompt cards, and the chat empty state
  now uses the **same** mark (`heroHtml()` no longer uses the old `.hero-mark`/`#i-logo`).
- **Auto by default.** A new chat / app reopen resets the model to Auto and clears effort; the
  composer selectors then report what the brain actually routed to (`reflectRunSelection`).
- **Refresh reopens the last chat at the very bottom** (`localStorage['crs-last-chat']`, multi-stage
  scroll); a new chat clears that memory.
- **Galaxy colours are the originals.** `map.html`'s renderer script was restored wholesale from
  `d0e61a0~1` and the vivid palette re-asserted (with a darkened twin for light theme); only the
  panels/chrome around it are restyled. `restore-galaxy.js` in the rig does this reproducibly.
- Rig scripts mirrored to `brain/qa/rig-scripts/` (`probe-main-hero.js` is the hero check).
  Reminder: `public/` is served fresh per request but **`server.js` edits need a restart**.

## Session 2026-08-06 (Windows) — Chat ⇄ Buildprint modes merged into ONE chat

The Chat vs Buildprint mode toggle is gone. **Every conversation is a Claude Code session with the repo as cwd and the cloned Bubble TEST worktree attached via `--add-dir`**, and it drives the Buildprint CLI whenever the task needs it. Verified 13/13 by the rig.

- **`bp:true` is no longer a creation-time mode.** `chat.bp` is now an after-the-fact **TAG** — the server auto-sets it when a conversation actually uses Buildprint tools. The sidebar **BP** chip means "this chat used Buildprint", not "this chat is a bp chat".
- **`cd` instead of a flag.** The Buildprint CLI resolves its workspace by walking UP from cwd and has **no `--project` flag**, so a session `cd`s into `~/projects/crs-bubble/<app>/test` in its **own Bash call** (chaining breaks the command allowlist) and `cd`s back to the repo for brain work. Verified: the spawn sandbox permits `cd` into `--add-dir`'d trees only.
- **Lazy preflight.** The CLI preflight (and its "Buildprint ready — CLI vX, linked · workspace app/branch" step) now runs only on turns that look like Bubble work — brain-only questions start instantly.
- **Missing clone degrades honestly.** On a machine without the test clone the chat still works; Buildprint capability is reported as degraded with a note (previously a hard error).
- **All locked guardrails survive verbatim** in the unified prompt: TEST branch only / never live, sync first, savepoint before every apply + check after, one step per apply, no `--force-apply` / `--no-check` / `sync --reset` without approval in that chat, plan-before-first-apply, Pattern A (company + property + privacy rules checking both), stop-and-surface on anything odd.

## Session 2026-08-06 (Windows) — Ultra / Ultracode effort levels + auto-effort routing

Composer effort dropdown gained **Auto (by task)**, **Ultra** and **Ultracode**; `data/settings.json` default flipped to `effort: "auto"`.

- **What the CLI actually supports** (verified against `claude --help`, v2.1.120): `--effort` takes `low|medium|high|xhigh|max` only. There is no `ultra` level, and `ultrathink` is an in-prompt cue that does **not** raise API effort. Both new levels are therefore app-side aliases translated in `resolveEffort()` (server.js):
  - `ultra` → `--effort max` + `ultrathink` appended to the stdin prompt.
  - `ultracode` → `--effort xhigh` + `{"ultracode":true}` in the settings file (dynamic workflow orchestration). **Needs claude ≥ 2.1.154**; older CLIs ignore the key and just run xhigh.
- **Ultracode is xhigh, i.e. one notch BELOW max on raw reasoning** — it trades depth-per-turn for orchestration. Don't present it as "above Max".
- `claude` accepts only ONE `--settings` value and it already carries the bp-guard hooks, so ultracode rides in a second generated file `data/bp-guard-settings-ultracode.json` (same hooks + the flag). **The guard hooks must never be dropped to enable ultracode** — verified identical.
- **Auto-effort**: `routeTaskEffort(message, model)` picks effort independently of the model dropdown (Vlad's ask: choosing a model shouldn't force choosing effort). Multi-step build → Ultracode on Opus / max elsewhere; deep reasoning → max; quick mechanical → low; otherwise medium. Surfaced as an "Auto-effort: …" lifecycle step, never silent.
- `'auto'` is a ROUTING token and never reaches the CLI — `resolveEffort()` drops it, mirroring the existing `model === 'auto'` guard.

## Session 2026-08-02 (Windows) — chat-first dashboard rebuild

Vlad's ruling: he lives in chat; the 4-row × 14-card "chief-of-staff board" was unusable. `renderDashboard` rewritten:
- **Composer now visible on the dashboard** (home = start screen; `showDashboard` removes `no-composer`; typing routes through the existing `ensureChatView()` → `newChat()`).
- **Needs you** — single flat list (asks / decisions / overdue / awaiting-verify / failed chunks / QA fails / sync fails / flags), tagged rows, **capped at 8** with a "+N more" line, whole section hidden when empty.
- **Status pills** (`.dstrip`/`.dpill`) replace the Now / What's-wrong / Synced card rows: modules done+focus → tree, plans in flight → protos, QA pass/fail/env → checklist, last-sync → activity.
- **Two-column body**: Continue (8 recent chats + New conversation / Buildprint task) · Todos (add-input + top 8, existing `dashTask*` handlers untouched).
- 9 big quick-action tiles deleted (`.action`/`.actions` CSS + unused `A()` helper removed); everything lives in one 15-pill Tools row.
- Phone (≤480px) command post keeps attention + todos + pills; tools/labels hidden as before.
- Verified headless (Browser pane renderer was stuck — desktop-app hang, not the page): `qa-scratch/rig/verify-dash-rebuild.js` (preserved in `brain/qa/rig-scripts/`), **13/13 pass**, zero console errors, screenshot evidence.

## Session 2026-07-17 — sounds, watchers, ref-graph, task queue, issue checker (A–E multi-phase)

One orchestrated run, one commit per phase (`brain: <phase>-…`).

1. **A — sound system + connectivity.** 24 approved synth sounds now exist as real local WAVs in `data/sounds/` (22.05 kHz mono, 1.7 MB; auto-rendered client-side via OfflineAudioContext → `POST /api/sounds/save` when missing; Regenerate button in prefs). `public/sounds-synth.js` (defs) + `public/sounds.js` (engine: WAV-first, live-synth fallback, master gain). New Sounds settings tab: per-event dropdowns (7 events), volume 0–100 (default 80), 24-sound library with previews. Old 5-sound system removed; `notify.soundName` migrates (ping→s01, chime→s03, pop→s16, alert→s19, blip→s13). Dual connectivity watcher (internet no-cors probe + `/api/ping`, 30 s, 2-fail debounce) → header dot (green/amber/red) + toasts + sounds.
2. **B — Bubble awareness.** Deterministic bare-fetch watchers (always-on, daily, `data/state.json` stamps): forum digest → `brain/bubble/forum-digest.md`; release notes → `brain/bubble/release-notes.md` with ⚠ locked-decision cross-check vs decisions.md + warning notification. IMPORTANT: bubble.io/release-notes is an unscrapeable Bubble SPA — the watcher reads the forum Announcements category (id 9) instead, which the page itself names as the archive. Manual buttons in Settings→General. Research docs: `brain/bubble/conditional-style-swapping.md` (reconciled with design/design.md §3.2 — the June 2026 feature CONFIRMS the locked paired-styles pattern) and `brain/bubble/global-expressions.md` (3 CRS candidates, all PROPOSALS).
3. **C — galaxy map reference edges (w-refgraph).** map.html parses CLAUDE.md / brain/INDEX.md / decisions.md client-side (`/api/file`), draws curved accent routing edges (draw-only overlay, no physics impact), dashed `--error` edges to ghost nodes for missing targets, Structure/References/Both toggle, dangling-refs panel with fly-to. First run found 65 resolved refs + **5 real dangling refs** (floor-alert-stations.md ×2, pricing/msa-template.md, smtp.json cited 2 ways).
4. **D — task queue (w-loops MVP).** `data/task-queue.json` + `/queue.html` panel. Sequential runner through `runClaudeStream` (bp-guard `--settings` applies to every spawn — gate can't be bypassed). Limit detection (error signature; `/api/queue/stub` test hook) → `blocked-limit`, auto-resume at `usage.json rate_limits.*.resets_at` (epoch SECONDS) + 2 min; resumeAt persists and re-arms at boot. Verified live incl. server restart mid-countdown. Bounds: max 20 open, no retries, no parallelism. Follow-up logged as `w-orchestration`.
5. **E — issue checker (w-bugfix, read-only pass).** Daily + on-demand `buildprint sync` (best-effort) + `check` on the test workspace → `brain/bubble/issue-reports/YYYY-MM-DD.md` with PROPOSED fixes (Sonnet/low, prompt-locked read-only; only spawned when issues exist). Auto-apply deliberately out of scope. NOTE: this Mac's buildprint link is currently **Unauthorized** (CLI auto-update 4.1.6→4.2.5 also pending) — re-link via `buildprint link <token>`; checker degrades to last-synced state with a caveat in the report.

Gotchas for next session: `resets_at` is epoch seconds (×1000); new settings keys must be added to BOTH `DEFAULT_SETTINGS` and the PUT whitelist merge; `serveStatic` serves only `public/` (WAVs go through the dedicated `/sounds/` route, GET+HEAD); server-side `addNotification` shows in the bell but only client-side `notify()` plays a sound.


---

## Session 2026-07-16 (cont. 6) — explorer ⇄ OS file interop

`explorer-os:` commits. **Server:** `POST /api/upload?dir&rel` (raw-body-per-file — deliberate deviation from multipart: zero-dep, per-file guards/progress/cancel; safeRepoPath + illegal-name + blocked-dirs + 100MB `UPLOAD_MAX` + collision auto-suffix; `rel` subpaths recreate folder trees), `GET /api/zip?path|paths` (hand-rolled STORE-only zip, `zlib.crc32`, UTF-8 names, validated with bsdtar), `/api/raw?dl=1` → attachment (default stays inline — raw is also the preview source). **Client:** external drags (`types` has 'Files') upload to the current/hovered folder with a dashed accent "Drop to upload" overlay + cancellable progress toast + flash-select; `webkitGetAsEntry` folder traversal (1000-file/32-depth caps); Ctrl+V uploads OS-clipboard files (paste event decides; internal clipboard unchanged; 90ms keydown fallback); drag-out via Chromium `DownloadURL` (single file raw, folder/multi = zip; internal DnD unaffected); menu gains Download / Download as ZIP / Copy content / Copy image (feature-detected). NOT possible (by contract, not simulated): copying real files TO the OS clipboard; non-Chromium drag-out (degrades to Download). Hand-test still needed (headless pane can't do real OS drags): drag 3 files in from Explorer, drag a folder in, drag STATUS.md out to desktop, paste a screenshot.

---

## Session 2026-07-16 (cont. 5) — explorer fix pass 3

Six defects (`explorer-fix3:` commits), all root-caused in-browser first: (1) context menu didn't close on empty-space left-click — the pass-2 marquee's `preventDefault` on pointerdown cancels the derived mousedown the closer listened on → closer moved to pointerdown; dismissing click is consumed (no marquee/selection change); Esc/scroll/drag also close. (2) menu hover de-accented to sidebar language (--panel2 + --primary; Delete = error tint) + arrow-key nav (`.kbf`, style identical to hover). (3) rename now commits on outside click — pass-2's blur-commit was unreachable behind the same preventDefault; document-level CAPTURE pointerdown commits first (empty → silent revert), clicked row keeps its selection. (4) "links still dark blue" = the hover-PREVIEW card (.pk-md had zero rules — UA default); popup fix had landed; peek fully tokenized. (5) fullscreen took two clicks — EX.fs/EX.snap survived close/reopen inverting the toggle; fullscreen is now a direct state (rect is the truth test) + state reset on open. (6) minimized chips moved into the work area (live offset via ResizeObserver on #centerCol). Harness notes: this headless pane freezes CSS transitions + lacks document focus — style verifications done with transition-disabled reads / class-based focus.

---

## Session 2026-07-16 (cont. 4) — icon system + explorer fix pass 2

**Icons (`icons:` commits):** approved two-tier generator implemented verbatim in `public/icons.js` (≥40px badge tier / <40px glyph tier, memoized), swapped at every render site (list 20 / grid 56 / tree+favs 16 / peek 20 / popup 20+64 / props 28 / dashboard 20), old EXT_COLOR/fileKind system deleted. Gotcha fixed: the module's top-level consts collided with app globals in the classic-script SPA and killed the whole main script — wrapped in an IIFE. Flag: JetBrains Mono isn't web-loaded (resolves only if installed locally).

**Fix pass 2 (`explorer-fix2:` commits):** (1) marquee rewritten on pointer events — capture (no stuck drags), content-space anchor, rect clamped to pane + edge auto-scroll, body no-select (nothing behind highlights), trailing-click guard (the click after a drag was CLEARING the fresh selection); (2) Ctrl+A scoped per focused window (popup selects only its document); (3) Windows-style edge snap with accent preview (top=maximize to `#centerCol` work area, left/right=halves; drag unsnaps + restores); (4) window controls min/max/fullscreen/close on explorer AND popup + bottom-left minimized-chips bar, dblclick titlebar toggles, Esc exits fullscreen first; (5) popup md fully tokenized (root gap: container lacked `.md` class — links/tables/quotes were unstyled); (6) 160ms hover/press states on popup actions; (7) accent caret + accent marquee + custom dark arrow cursor (hand kept native, deliberate); (8) rename masks the extension entirely (basename-only input + ghost suffix, last-dot split, `.gitignore` = no ext, empty blocked). Multi-window still NOT shipped (fix-pass-1 item 12 stop-report stands).

---

## Session 2026-07-16 (cont. 3) — OS file explorer: build + fix pass

Built the OS-style file explorer (Finder/Explorer parity) into `public/index.html` + `/api/fs/*` mutation endpoints in `server.js` (all `safeRepoPath`-guarded, real repo writes), then ran a 14-item fix pass (`explorer-fix:` commits). P0 root causes — all reproduced in-browser before fixing: (1) click re-rendered the pane so dblclick never fired → in-place selection painting (`explPaintSel`); (2) same re-render destroyed the rename input → root-handler exclusions; (3) creates were invisible under the crsOnly filter → explorer now always browses the FULL tree + server-side name autosuffix + New file ▸ typed submenu; (4) recursive search walked the filtered tree (0/4 hits → 4/4); (5) selected rows collided with the app's generic `.sel` dropdown class → renamed `.xsel`, flat tint only. Shipped: draggable/resizable non-modal window (persisted), 32px toolbar, collapsible sidebar + Favorites (localStorage), whitelist→blacklist visibility (`DENY_EXT`; pdf/xlsx/extension-less now visible) + color-coded icon set, item-anchored hover previews + folder previews, in-app document popup (md rendered / code highlighted / csv table / img / pdf embed / xlsx download card / html fullscreen sandbox), 6s Undo toast (delete/move/rename; honest about unrecoverables), properties popup (+ `ctime` from the walker). NOT shipped: item 12 multi-window — singleton refactor exceeds safe scope for the same pass; plan + cost reported in chat. Full keyboard + theme + zero-console-error verify pass done.

---

## Session 2026-07-16 (cont. 2) — cross-platform guardrails + wishlist build-out

Mac ⇄ Windows portability hardening, then shipped the top wishlist items. Nothing committed yet (review the working tree, then commit — code changes are in `crs-brain/server.js`, `public/wishlist.html`, new `doctor.js` / `.gitattributes` / `brain/reference/`).

### What was built
1. **Cross-platform "runs on both at all times" guardrails.** Audited every `process.platform` branch (claude spawn, auth login, `/api/open`, browser open) — all correct. Confirmed `node-pty` ships prebuilds for darwin-arm64/x64 + win32-x64/arm64 and `node_modules/` is gitignored, so each machine installs fresh (no compiler needed).
   - **`.gitattributes`** (new) — locks line endings: `*.command`/`*.sh`/`*.js` = LF, `*.bat` = CRLF, `*.node`/`*.dll`/`*.exe` = binary. Prevents a Windows commit from rewriting `start.command` to CRLF and breaking the Mac launcher (`bad interpreter: /bin/bash^M`).
   - **`doctor.js`** (new) — zero-dep health check. `node doctor.js` verifies Node ≥ 18, the node-pty prebuild for the current platform, `claude` on PATH, the correct launcher with LF endings, and port state. Exits non-zero on any critical fail. Passes green on the Mac.
2. **Wishlist → Claude Code prompt generator** (`w-fsbf5e`, DONE). Each wishlist card has a terminal-icon button that turns the idea into a complete, paste-ready Claude Code prompt (objective → tasks → assumptions → locked rules baked in → file list → acceptance criteria), grounded in an inlined `CRS_BRAIN_ARCH` context so the prompt is self-contained. Copies to clipboard + shows a preview modal (Esc/Copy/Close). Endpoint `POST /api/wishlist/prompt {id}` → `WL_CC_PROMPT` system prompt via `runClaudeStream`. Verified end-to-end (21s, real prompt output).
3. **Smart model routing** (`w-modelrouting`, DONE). `settings.autoRoute` (default OFF). `classifyTask()` is a fast, free keyword heuristic → `routeModel()`: mechanical/bulk work (rename, dedup, format, **prompt generation**, summarize) → Haiku 4.5 / Sonnet 5 + low effort; architecture / security / privacy / migration / debug / reasoning → Opus 4.8 + high. **Conservative:** ambiguous tasks keep the user's configured default — quality is never traded for tokens. Wired into the wishlist prompt generator (routed → Haiku, verified). Toggle persists via `PUT /api/settings {autoRoute}`.
4. **Bubble platform awareness watcher** (`w-forum` + `w-relnotes`, IN PROGRESS — mechanism shipped, opt-in). `settings.bubbleWatch` (default OFF) + daily gate (`bubbleCheckedAt`, checked hourly like `maybeSyncManuals`). `runBubbleDigest()` spawns claude with WebSearch/WebFetch (`BUBBLE_DIGEST_PROMPT`, Sonnet/low) to scan `bubble.io/release-notes` + the forum for **CRS-relevant** changes and **APPENDS** a dated section to `brain/bubble/watch/digest.md` (never overwrites); prefixes `⚠️ FLAG:` when a change touches a locked decision. Manual trigger: `POST /api/bubble/digest`. The prompt explicitly hunts for **style-swapping in conditions** + **global expressions** (`w-styleswap`, `w-globalexpr`) on each run — those get documented on the first live run.
5. **AI tools & capabilities reference** (`w-anr0tw`, DONE). New `brain/reference/claude-code-capabilities.md` — documents the Brain agent's actual spawn sandbox (allow-listed tools + `bp-guard`), the broader Claude Code tool surface, the skill library, models + routing, and what the spawned agent can/can't do. Makes the brain aware of its own capability envelope.

### Still open (not rushed — flagged honestly)
- **`w-loops` — task loops with limit-aware auto-resume (P1).** Not built. It's a durable task queue + reset-time detection (usage.json already captures the reset) + a resumable autonomous run loop that MUST stay inside the Buildprint safety gate (plan → savepoint → apply → check). High-value but the riskiest item; deserves its own focused session rather than a rushed half-build.
- **`w-bugfix` — auto-check + fix Bubble.io-reported issues (P2).** Not built. Needs programmatic access to Bubble's Issue Checker / editor logs, which the app doesn't have yet; start read-only (report proposed fixes) before ever auto-applying.
- **`w-styleswap` / `w-globalexpr`** — will be populated by the Bubble watcher's first live run (enable `bubbleWatch` or hit `POST /api/bubble/digest`); can also be researched directly on request.

### Next up
- Build `w-loops` (auto-resume engine) as its own session.
- Enable `bubbleWatch` and do a first digest run to populate `brain/bubble/watch/digest.md` + document style-swap / global-expressions.
- Optionally add a small Settings UI toggle for `autoRoute` + `bubbleWatch` + a "Check Bubble now" button (endpoints already exist).

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

4. **Persistent memory (never-forget)** — the app now keeps a structured, categorized memory the agent ALWAYS honors.
   - **Trigger:** say "remember this / don't forget / keep in mind…" in any chat (normal or bp). A regex (`MEMORY_TRIGGER`) detects it; a fast low-effort compile pass (`compileMemory` → `MEMORY_COMPILE_PROMPT`) **rewrites** the message into atomic `{category,title,fact}` entries (raw text is never stored) and saves them. A **toast** ("🧠 Saved to memory — …") fires via a new `memory-saved` SSE event. Runs concurrently with the reply, awaited before the stream closes.
   - **Always considered:** `withMemory()` injects the whole memory into every system prompt (normal `SYSTEM_PROMPT` + `BP_PROMPT`), so the agent honors it before any answer/action and surfaces conflicts.
   - **Store:** canonical `crs-brain/data/memory.json` (committed → syncs across machines, so it's genuinely "infinite"); generated `crs-brain/data/memory.md` for humans/git. Categories: Preferences/Product/Decisions/People/Technical/Workflow/Reminders/Other. Dedup by category+title; secrets/tokens are filtered out and never stored.
   - **Endpoints:** `GET /api/memory`, `POST /api/memory` (manual `{category,title,fact}` OR compile-from-`{text}`), `DELETE /api/memory?id=`.
   - **[Memory page](public/memory.html)** — Home card + side-rail (brain icon). Categorized list, hand add/fix, delete ("forget"). 
5. **Wishlist — now a full UI page** — `public/wishlist.html` (Home card "Wishlist" + side-rail check icon). Add ideas, cycle status (idea → in-progress → done via the checkbox), cycle priority (P1/P2/P3), inline-edit title + detail, reorder within a section, delete; autosaves. Backed by canonical `data/wishlist.json` (committed → syncs); `WISHLIST.md` is regenerated from it. **Done items are dimmed, never struck through** (project rule). Endpoints `GET/PUT /api/wishlist`. Seeded items: daily Bubble-forum check, track `bubble.io/release-notes` (+style-swapping/global-expressions research), **task loops with limit-aware auto-resume** (use the full 5-hour budget; on limit, read the reset time and auto-continue unfinished tasks), **auto-check + fix Bubble.io-reported issues** via Buildprint (read-only first).

### Next up (carried + new)
- Build the wishlist P1s: **task-loop / auto-resume** engine, then the **release-notes / forum watchers** (and document style-swapping + global expressions in `brain/bubble/`).
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
   - **Visual verification wired:** `--allowedTools` includes `Bash(agent-browser:*)`; `BP_PROMPT` VISUAL VERIFICATION block (screenshot anon or as a test user, flip `theme_is_dark` for dark/light, `--viewport`, Read the PNG, embed `![](crs-brain/data/screenshots/…)`). **UNBLOCKED 2026-07-18 (Windows PC):** `agent-browser` 0.32.2 installed globally; doctor.js now checks for it (warn-only). Audit template Task 9 + BP_PROMPT SAVE-FOR-REUSE line define the capture convention: `crs-brain/data/screenshots/<module-id>/<view>-<dark|light>-<desktop|mobile>.png`.
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
- Chat identity: **one chat, no modes** (2026-08-06). Every conversation is a Claude Code session with the repo as cwd + the TEST worktree via `--add-dir`, and drives the Buildprint CLI when the task needs it. `chat.bp` is an after-the-fact TAG (server-set when Buildprint tools are used) that drives the sidebar BP chip — never a creation-time mode.

## 7. Gotchas
- **node-pty `spawn-helper` needs `chmod +x`** on this Mac (was `-rw-r--r--` → `posix_spawnp failed`). After any `npm install`/rebuild in `crs-brain/`, re-run `chmod +x node_modules/node-pty/prebuilds/darwin-*/spawn-helper`. NOT committed (would churn/break Windows).
- **~~Claude Code 2.1.209 dropped `rate_limits`~~ — WRONG (corrected 2026-07-15).** 2.1.209 still emits `rate_limits` (its own embedded statusline schema: *"Only present for subscribers after first API response"*). The 5h/7d bars were lost to a **capture bug**, now fixed: (a) the statusline used to overwrite `usage.json` on every render, so a fresh session's startup render (no rate_limits yet) wiped the bars → statusline now **merges**, carrying last-known `rate_limits` forward (+`rate_limits_at`); (b) "Fetch fresh reading" spawned the probe with `--model haiku` (→ panel showed "Haiku 4.5") and captured the pre-response startup render → probe now uses the **default model** and polls until a reading with **fresh** `rate_limits` (post-response) appears. Bars + correct model confirmed live (5h/7d/context all rendering).
- **Do NOT commit `crs-brain/node_modules` changes** — the rebuild deletes Windows-only files (`conpty.dll`, `OpenConsole.exe`); committing those breaks node-pty on the office Windows PC.
- **The running server dies when the Claude Code session that started it ends** — for persistent use Vlad double-clicks `start.command` / `start-mobile.command` himself.
- **Mobile needs the Mac awake + `start-mobile.command` running + Tailscale on the phone.** Address: `http://100.114.97.93:4317`.
- **Map is now EMBEDDED in the main app** (2026-07-15), not a popup. `index.html` has a persistent composer (moved OUT of `chatView` to be a direct child of `.col.center`) + a `#contentArea` that swaps chatView/dashView/fileView/**mapView** above it. `mapView` is an `<iframe id="mapFrame" src="/map">`; `showMap(mode)` shows it (lazy-loads once; `mode='board'|'ideas'` deep-links via `contentWindow.location.hash`). `map.html` detects `EMBED = window.self!==window.top`: hides its "Ask the Brain" dock and routes node clicks to `window.parent.smartOpen/openExpl` (same-origin) instead of `window.open(...,'crsbrain')`. Standalone `/map` still works (dock shows, window.open fallback) for the deep-link path. Sending from any view calls `ensureChatView()` → drops into the conversation; the composer never leaves.

---

## Decisions log (append-only)

### 2026-08-07 — Session: Mac — Fable weekly bar, usage-card unification, Buildprint Web Supervisor Phase 0
- **Fable weekly limit bar shipped.** Settled by measurement, not assumption: CLI 2.1.223's
  statusline payload still carries only `five_hour` + `seven_day` — upgrading does NOT expose
  per-model limits (the prior handoff assumed it would). The per-model window exists only on
  the interactive `/usage` screen, so `populateUsage()` now opens it in the pty session it
  already drives and scrapes `Current week (<Model>) N% used` into `usage.json` as
  `seven_day_<model>`. `windowLabel()` already handled that key shape, so the bar rendered
  with no UI change. Reset time reuses `seven_day.resets_at` deliberately (same cycle;
  parsing a localized reset string across timezones is more fragile than the epoch we have).
- **node-pty had never worked on the Mac.** npm drops the executable bit on the bundled
  `spawn-helper`, so every pty spawn failed with `posix_spawnp failed.` — even `/bin/echo` —
  which meant the usage refresh was silently dead on this machine. The server now self-heals
  the bit before requiring node-pty.
- **The usage auto-checkbox was physically untickable**: the panel's drag handler exempted
  only `button,a`, so pressing the checkbox started a window drag and `preventDefault()` ate
  the click. Interactive elements are now exempt. Auto also refreshes immediately on enable
  when the reading is stale instead of waiting a full 3-minute interval.
- **The account popover and the Usage window are now one renderer** (`bodyHtml` + `paintAll`
  + `USAGEWIN.mount(el)`; controls id → class since the markup is on screen twice). They had
  drifted into two implementations: different labels/colours, no per-model row, a "Haiku 4.5"
  line that was really the usage probe's model, and a context row from an unrelated session.
- **Buildprint Web Supervisor — Phase 0 done** (`brain/buildprint/web-ui-map.md`). Vlad chose
  the browser route over both the CLI and the REST API. Access route decided: the
  Claude-in-Chrome extension against the real profile — Chrome >=136 refuses
  `--remote-debugging-port` on the default user-data-dir, and cloning the session into a
  separate profile fails because the `__Host-__convexAuth*` cookies do not authenticate (both
  tested, both ruled out). State machine is `button "Stop generating"` = running /
  `button "Send"` = done. The composer is contenteditable (typing must be read back) and
  carries a Test/Build branch selector — the first enforceable guardrail for "TEST branch
  only". Question/error states remain unmapped and block Phase 3.


### 2026-07-19 — Sessions: Playbook close-out (Mac) + Sidebar v3 (catch-up entry; also covers 07-18 QA/polish/ASK work logged only in brain/qa/)
- **Playbook program (T0–T6) COMPLETE** — self-learning made law: `data/playbook.json` lesson store (7 operational seeds migrated out of memory.json; schema with trigger/rule/fix/errorSig/hits/recurred), matched injection into bp system prompts with a visible "Playbook check — N lessons loaded" step, recurrence alarm (errorSig match on real ✗ tool results → warning + What's-wrong todo + recurred++), learn-events ledger + top-right 🧠/⚡/⚠ toasts, `playbook.html` surface + ⌘K + dash top-traps strip. Zebra probe green 10/10 twice (independent verifier); PLAYBOOK.1–6 in `brain/qa/master-checklist.md`; checkpoint `brain/qa/checkpoints/playbook.md`. Meta-proof: run-1's probe failed BECAUSE injection prevented the planted mistake.
- **Sidebar v3** (Claude-Code-style minimalism): search + 32px "+" merged into one row (`.newbtn` gone), caps = Pinned/Recents, legend deleted, rows = mark + title only (count pill/pin icon removed), bp rows now a "BP" mono chip on accent-tint, live-turn opacity pulse `sb-live` on the mark via `state.live`/`syncLiveRow()` (reduced-motion → static accent dot), selected = accent-glow wash + NEW inset 2px accent bar, default width 280px, row 6px pad (~34px). SIDEBAR3.1–6 verified both themes.
- **Shared invisible scrollbars app-wide**: new `public/scrollbars.css` + `public/js/scrollbars.js` on all 11 pages (transparent at rest; `--border-active` thumb on container hover or `.is-scrolling` with 700ms decay; Chrome renders via standard `scrollbar-color`, reveal is an instant swap — Chrome won't transition scrollbar pseudos). Old per-page blocks in index/map deleted.
- **Theme-toggle "regression" resolved as mistaken identity**: POLISH.3's fix never regressed (pickaxe-proven); the perceived second header toggle was the prototype-overlay bar's iframe-only theme button — relabeled "◐ Prototype theme" + scoping title. Grep invariant added to SIDEBAR3.6.
- **Mac bring-up**: agent-browser 0.32.2 + buildprint 4.2.7 under `~/.local` (buildprint still Unauthorized — needs `buildprint link <token>`); rig rebuilt in gitignored `qa-scratch/rig/`; committed `brain/qa/rig-scripts/verify-playbook2.js` made cross-platform (the original `zebra --hello` probe command was permission-blocked by the bp-spawn allowlist on every platform — now `node --zebra-hello`).
- **Review sweep (4 agents)**: runtime fully clean (22 page loads, 37 APIs, mobile, interactions — zero errors); 3 hard-coded colors fixed to tokens (`--error`×2, `--warning`); confirmed-dead CSS/JS from superseded designs catalogued and removed (see the `review:` commits); design-system findings needing a RULING kept open: `--accent-glow` vs `--accent-tint` for selected backgrounds app-wide, and the §10 (bg+text) vs §20.6 (+2px bar) tension on `.item.on`.
- **Voice + polish batch** (same day, later): magical learn chimes s25/s26 wired into the learn toasts (settings toggle + DND-aware); chat chrome de-lined (step rail, lane rules, bp accent rail removed — labels stay; BPFLOW.2 ADAPTED); voice dictation (Web Speech, EN/RU/KA, mic device picker with MacBook-mic default + honest routing: non-default devices record via MediaRecorder → /api/transcribe on Gemini free tier, key gitignored in data/google-ai.json, masked in API); human-like read-aloud (msedge-tts neural Ava/Svetlana/Eka, POST /api/tts, chunked-parallel synthesis, sha1 cache in gitignored data/tts-cache/, speechSynthesis fallback); **Live System Map** (public/js/livemap.js — floating draggable molecule panel, galaxy glow language, real signals only: state.live turn path, tool/bp step pulses, learn-loop pulses, GET /api/livemap, poll only while open). Rows LEARNSFX.1, CHATCHROME.1, VOICE.1–3, LIVEMAP.1; writer self-tests + independent adversarial verifier all CONFIRMED (80/80).

### 2026-07-17 — Session: ptree — Progress Tree Executive ⇄ Raw redesign (Windows continuation)
- Resumed from `brain/qa/resume-2026-07-17.md` on the Windows PC. Implemented the ptree redesign of `public/tree.html`: **two detail renderers** switched by a toolbar segmented control (greyscale active per override #36, persisted as `localStorage crs-tree-view`). **Executive** = the md sections (STATUS block / data model / option sets / permissions / workflows) parsed into real §20.6 tables + clean prose (`mdToHtml()`: tables, subheadings, blockquotes, lists, inline code/bold, ⚠ VERIFY chips; first heading dropped — the dsec title already names the section; unparseable → prose, **never a pre fence**). **Raw** = the honest source twin: per-section `<pre>` + per-block Copy.
- Also shipped: **per-row slim 2px progress bar** from the checklist ratio (done `--good` + partial `--warn` on `--bg-tertiary` track, tooltip with counts); **`#module=<id>` deep links** (auto-expand + scroll on load, hash written/cleared via replaceState on toggle); **single-app file links** (override #37 — `a.flink` with `data-path`, delegated click → `parent.smartOpen` when `EMBED`, plain href fallback standalone, per the map.html precedent).
- All 15 keep-capabilities from the resume doc preserved and verified live against the running :4317 server (autosave round-trip PUT, reorder, status cycle, tri-state checklist w/ focus-preserving input, rollup, filter/group/focus, lazy detail cache, 5 content blocks, mentions, 3 file links, both prompt buttons + BP handoff, action logging, empty states, esc(), DOCS badge). 0 console errors, dark + light. Checks appended to `brain/qa/master-checklist.md` as PTREE.1–7.
- **Gotcha (verification env, not app):** the Claude Code browser pane on this Windows PC froze style recalc for parser-created elements (class toggles never changed computed styles; even injected `#id{…!important}` rules no-op'd) and screenshots timed out. Dynamically created elements styled fine — verified the seg active state via an exact clone. Don't chase this as an app bug; real Chrome is unaffected.

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

### 2026-07-17 — Session: real CRS logo in sidebar brand
- Sidebar brand = CRS wordmark ONLY (no "Brain" h1, no repo-name sub — Vlad's call): new `#i-crs` symbol (3 paths, `fill="currentColor"` + `stroke="none"`, viewBox 1024×324 — vector source: `design/crs-logo.svg`, pulled from Bubble File Manager `LOGO.svg` via `buildprint file search`). Wordmark centered (`justify-content:center` on `.brand-home`), dimmed (`opacity:.72`, `color:var(--primary)`), 110×35, wrapped in `.wordwrap` (relative).
- AI badge: `#i-brain` symbol (lucide-style two-lobe brain, stroke = `url(#g-ai)` pink→purple→indigo `linearGradient`, `userSpaceOnUse` so one gradient spans all paths) absolutely positioned at the wordmark's top-right (`.brand .brainmark`, 15px, top:-8 right:-14) — reads "CRS + brain".
- `$('repoName')` DOM write removed from the files loader (element is gone; would throw). `state.repoName` KEPT — explorer breadcrumbs/tree/move-toasts use it.
- NOTE: `.wordmark`/`.brainmark` must NOT get class `.ic` — `.ic` forces `fill:none;stroke:currentColor` (line ~29) and would blank a fill-based glyph / override the gradient stroke. Rail button / hero / bot avatar intentionally still use the small `#i-logo` node glyph (square contexts; wordmark doesn't fit).
- **Thinking animation (v3 — molecule cloud, chat-only)**: five `<i class="mol m1…m5">` dots (pink/cyan/violet/indigo/amber, 2–3px, `box-shadow` glow) orbit the gradient brain at different radii (7–14px via `--r`), speeds (0.9–2.2s), and directions (`molCW`/`molCCW` keyframes: `rotate(±1turn) translateX(var(--r))`), staggered with negative delays; plus `::after` pulsing purple glow and brain-stroke hue-rotate. History: v1 conic-gradient ring → v2 molecules on the sidebar badge (`body.thinking` toggled in `setGenerating`) → **v3 on Vlad's ask ("in actual chat … not on the logo"): the sidebar badge is fully static** (no mol spans in the brand markup) and the animation CSS is scoped to `.chat-brain` / `.wstep.run` only — the whole `body.thinking` mechanism (setGenerating toggle + finally re-sync) is deleted. `brainHtml()` (near `stepIco`) is the single source of the brainwrap+mols markup.
- **In-chat thinking indicator (molecule brain)**: `streamChat()` prepends `<div class="chat-brain">` (= `brainHtml()`) as the reply body's first child — always animated while present — and `try{ brainEl.remove(); }catch{}` in the stream's `finally` deletes it when the reply finishes (avatars are `display:none` so the body was the only placement). The **Thinking work-step icon** is the same molecule brain: `stepIco('thinking')` returns `brainHtml()` (was sparkle); it orbits while the step has `.run` and freezes to a static gradient brain when `endStep()` strips it (mols fade via the base `opacity:0` + transition). `.brainwrap` base is `position:relative` w/ fixed 15px box; only `.brand .brainwrap` gets the absolute top-right offset. The old `<span class="dots">` 3-dot typing indicator is fully removed: markup, `.dots` CSS, `@keyframes dot`, and the `dotsShown`/`clearDots()` JS mechanism (answerEl now starts empty).
- **Chat work-block animations (Vlad: "brain when thinking, gears like on watch when working, different icons per action type")**:
  - **Brain handoff**: the top `chat-brain` placeholder is now removed as soon as the first work group appears (`ensureGroup`) or the answer starts typing (`pump`'s `!started` branch) — the running Thinking step's brain takes over, so there's never two brains at once. The `finally` removal stays as a safety net.
  - **Mini orbits**: `.wstep-ico .brainwrap` overrides shrink the molecule radii (`--r` 5–10px vs 7–14) + glow inset so dots hug the step row.
  - **Watch gears in the group header**: new `#i-gear` symbol (8-tooth cog: r5.2 rim + r1.7 hub + radial teeth). `ensureGroup` inserts `.wgears` (24×20 cluster between chevron and label): `g1` 14px bottom-left spins CW 3.2s, `g2` 10px top-right spins CCW 2.3s (≈inverse-radius ratio so the teeth read as meshing), both accent-blue while `.wgroup.run`, frozen muted when the group finalizes ("stopped watch").
  - **Per-action-type icons + colors** in `stepIco`: wrench=`buildprint` #FB923C, todo/checklist #A78BFA, bot=agent/task #F472B6, term=bash/git/npm/node/powershell #34D399, globe=web/fetch #818CF8, search=grep/glob #22D3EE, pencil=edit/write/apply #FBBF24, doc=read/view #60A5FA, muted dot fallback. Colors ride an inline `style="color:…"` on the icon svg, so the type color survives the `.wstep.run .wstep-ico` accent rule (running state still signals via the pulsing label). Match order matters: buildprint before term (term regex no longer contains it), todo before pencil (`TodoWrite`), web before search (`WebSearch`); sparkle glyph dropped from the map (thinking returns `brainHtml()` before the lookup). The `label` SSE re-render (`activeStep.icoEl.innerHTML=stepIco(...)`) re-picks the icon once the real command/file streams in.
  - **Rescue**: the pre-compaction session left `stepIco` mid-edit with a bare `else if` chain (`let p='dot';` directly followed by `else if`) — a hard syntax error that broke the whole inline script. Rewrote the function and added `qa-scratch/check-syntax.js` (extracts every `<script>` from index.html, compiles via `new vm.Script`) → ALL SCRIPTS PASS. Run it after any large hand-edit to this file.
  - **v2 (Vlad: "each icon when ongoing must have its own animation and be colorful … when finished return to the color as before — only the active action is colorful/animated")**: inline `style="color:…"` dropped from `stepIco` (it survived the run and kept finished icons colored). Now the svg carries `class="t-<type>"`, and ALL color + motion rules are gated on `.wstep.run .wstep-ico` — finished steps fall back to `var(--muted)` via inheritance. Per-type run animations: wrench rocks like tightening a bolt (`aWrench`), todo's three checks tick in sequence (`ac1–ac3` staggered `aTick`), bot's antenna pulses + eyes blink (`aant`/`aeyes`), terminal cursor line blinks (`acur` reuses `@keyframes blink`), globe meridians dash-march like flowing data (`amer` + `aDash`), magnifier sweeps side-to-side (`aScan`), pencil scribbles around its tip (`aWrite`, transform-origin 25% 80%), doc gets a reading scan-line sweeping down the page (`ascan`, hidden `opacity:0` unless running, `transform-box:fill-box`). The **thinking brain follows the same rule**: `.wstep-ico .brainmark g{stroke:var(--muted)}` overrides the svg presentation attribute so finished thinking steps show a mono outline brain; `.wstep.run` restores `stroke:url(#g-ai)` gradient + molecules. Animatable sub-parts are classed paths inside the glyph strings — the mid-run `label` re-render rebuilds them harmlessly.
- **Model auto-fallback (Vlad: "if one model is inaccessible brain app shall monitor this and switch to continue working")**: the app now detects a model outage and re-spawns on the next model in a chain instead of failing the reply.
  - **Server** (`server.js`): `runClaudeStream` failures are now tagged errors — `err.stage` (`'pre'` = model produced NOTHING yet vs `'mid'` = failed after some block/text/thinking, tracked by the new `emitted` flag) and `err.retryable` (classifier `isModelInaccessible` / `MODEL_INACCESSIBLE_RE` matched the outage signature: overload/529, rate-limit/429, 503, not_found/invalid-model, usage-limit, quota/credit, capacity/unavailable). New `runClaudeWithFallback(message, sessionId, hooks, opts)` wraps it: builds `chain = [primary, ...fallbackModels]` (de-duped), and on a caught error switches to the next model **only if `stage==='pre' && retryable`** — a mid-answer failure or a non-outage error propagates as-is (resuming a half-written reply on another model would be incoherent). Fires `hooks.onModelSwitch({from,to,reason})` per switch. Main chat handler calls `runClaudeWithFallback` and passes `autoFallback`/`fallbackModels` from settings + an `onModelSwitch`→`model-switch` SSE.
  - **Latent bug fixed same change**: an error delivered AS a `result` event (`is_error:true`) was previously stored as if it were the assistant's reply. The result-event handler now routes `is_error`/`error*` subtype into `resultErr` → reject, else keeps `finalText`.
  - **Settings**: `autoFallback` (default `true`) + `fallbackModels` (default `['sonnet','haiku']`, aliases so they survive version bumps) added to `DEFAULT_SETTINGS`. Remember: new keys must also be in the PUT whitelist merge.
  - **CAVEAT (documented so nobody expects magic)**: the subscription 5-hour cap is account-wide — every model shares it — so fallback only rescues a **model-specific** outage (e.g. an Opus-only limit while the general pool is fine) or a transient overload, NOT a full account cap. When the whole account is capped, all chain members fail and the last error propagates.
  - **UI**: `model-switch` SSE → an amber `.switch-note`/`.sw-bolt` pill inserted above the reply ("Opus 4.8 unavailable — switched to **Sonnet** to keep going"). Handler lives in `streamChat`'s event loop (`body.insertBefore(note, blocksEl)`).
  - **Tested** via `qa-scratch/fallback-test.js`, which extracts the REAL `isModelInaccessible` + `runClaudeWithFallback` source straight out of server.js (via `new Function` with a mocked `runClaudeStream`) and runs 29 checks: classifier matches every realistic outage string and correctly SKIPS non-outage errors (incl. `claude exited 143` = user Stop/SIGTERM, TypeError, ENOENT); loop switches once on pre+retryable, walks the whole opus→sonnet→haiku chain, and does NOT switch on mid-stage / non-retryable / autoFallback-off. No live nested `claude` spawned (would need approval + burn usage). `node --check server.js` + `check-syntax.js` both clean.
- **Process/answer split (Vlad: "I dont like how its being displayed make it ui user friendly readable use the best solution to display processes")**: fixed the run-on wall where Claude's between-tool narration ("Now finding…", "Recon complete…") collided with the real answer in one unpunctuated blob.
  - **Root cause**: interim narration streams as `text_delta` (visible text) exactly like the final answer, and Claude Code concatenates ALL of it into the `result` event's `result` string with NO separators — so the stored/sent reply was `narration+narration+…+answer` mashed together.
  - **Fix = segment at tool boundaries.** **Server** (`server.js`): new `answerSeg` accumulator alongside `streamed`; every `onDelta` appends to both, but `onBlock` with `kind==='tool'` **resets `answerSeg=''`**. So `answerSeg` always holds only the text since the last tool call = the clean final answer. `finalText` now prefers `answerSeg` (trimmed) and only falls back to `result.text`/`streamed` if the model ended on a tool with no closing prose.
  - **Client** (`index.html`): when a `block` event of `kind==='tool'` arrives and text has already streamed (`full`), that text was narration → `addNoteStep(full)` reclaims it into a collapsible timeline **note** step, then `full`/`revealed`/`answerEl` reset so the typewriter starts clean for whatever comes after. `delta` now calls `endStep()` (stops the last step spinning) instead of finalizing the group, and the group **stays open until `done`** (early text may still be narration). New `note` step type: `stepIco('note')` → speech-bubble glyph; `addNoteStep` builds a complete (non-`.run`) `.wstep`, and long/multiline notes get `.has-body` so the full text expands on click (short ones stay one-line via `oneLine()`).
  - **Edge cases** (verified by reading the loop): no tools → whole text is the answer (never reclaimed); thinking-only reply → answer clean; ends-on-tool → server blob fallback keeps output non-empty. Buildprint sync (`/api/bp/track`) uses its own self-contained reader and is unaffected. `node --check server.js` + `check-syntax.js` both clean. NOT yet visually tested in-browser (needs a live tool-using reply).

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
