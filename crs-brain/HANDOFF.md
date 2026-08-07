# CRS Brain — handoff (2026-08-07 · Mac → Windows)

Everything below is committed and pushed to `origin/main`. Working tree clean, all
branches in sync. Pick up on Windows with `git pull`.

> Read `crs-brain/BRAIN_APP_PROGRESS.md` for the full session log (newest at top).
> This file is the "where am I, what's next" summary.

---

## 0. What landed in the Mac session (2026-08-07) — read this first

### 0.1 Fable weekly limit bar — SHIPPED (`55020d5`)
The open item from the last handoff (§3.1) is closed, and **the hypothesis in it was
wrong**. Settled with evidence, not opinion:

- CLI upgraded on the Mac 2.1.209 → **2.1.223** via `claude update`. **Windows is still
  on 2.1.120 — run `claude update` there.**
- **Upgrading does NOT add per-model rate limits to the statusline.** 2.1.223's payload
  still carries exactly `five_hour` + `seven_day` (captured verbatim in
  `crs-brain/data/statusline-raw.json`). The old plan assumed a newer CLI would expose it.
- The per-model window lives **only on the interactive `/usage` screen**:
  `Current week (all models) 62%` / `Current week (Fable) 79%`.
- `populateUsage()` now opens `/usage` inside the pty session it already drives, scrapes
  `Current week (<Model>) N% used`, and merges rows into `usage.json` as
  `seven_day_<model>`. `windowLabel()` needed no change — the bar renders itself as
  **"Weekly · Fable"**. Rig: `brain/qa/rig-scripts/fable-bar.js`.
- Reset time is deliberately reused from `seven_day.resets_at` (same weekly cycle,
  observed 2:59am vs 3am; parsing a localized "Resets Aug 8 at 2:59am (Asia/Tbilisi)"
  string across timezones is far more fragile than the epoch we already have).

### 0.2 node-pty was silently dead on the Mac — FIXED (same commit)
npm drops the executable bit on node-pty's bundled `spawn-helper`, so **every** pty spawn
failed with `posix_spawnp failed.` (even `/bin/echo`) and the usage refresh had never
worked on this machine. The server now self-heals the bit before requiring node-pty.
POSIX-only path; Windows uses `cmd.exe` and is unaffected — but if Windows ever shows that
error after an `npm install`, this is why.

### 0.3 Usage window: auto checkbox + card parity (`b6be08c`, `16bbf76`)
- **The auto checkbox was physically untickable.** The panel's drag handler exempted only
  `button,a`, so a pointerdown on the checkbox started a window drag and called
  `preventDefault()` — which swallows the click a checkbox needs. Now `input,label,select,
  textarea` are exempt too.
- Auto also did nothing visible for 3 minutes after being enabled; it now refreshes
  immediately when switched on if the reading is stale (skips hidden tabs and live turns).
- **The account popover and the Usage window are now ONE renderer.** They had drifted:
  different bar colours/labels, no per-model row (the popover hardcoded five_hour/seven_day
  so Fable never appeared), a "Haiku 4.5" line that was really the usage *probe's* model,
  a context row belonging to whatever session last rendered a statusline, and a cost line.
  `usagewin.js` now owns the body (`bodyHtml` + `paintAll` + `USAGEWIN.mount(el)`); controls
  moved id → class because the same markup is on screen twice. Removed from the popover:
  model line, cost line, bespoke footer, and the "Fetch fresh reading" / "Turn off tracking"
  buttons (tracking still toggles in Settings → Usage). Kept: email, tier, connection,
  Disconnect.
- Rigs: `auto-cb.js`, `auto-immediate.js`, `drag-still-works.js`, `cards-identical.js`.

### 0.4 Buildprint Web Supervisor — Phase 0 DONE, build not started (`286e6fc`)
New feature Vlad asked for: **the brain drives the Buildprint WEB chat in a browser** —
click +, paste the prompt, then *supervise* (answer questions, type `continue` on a stall,
detect done). Decision was made **against** the CLI and REST routes; this is the browser
route, deliberately.

**Read `brain/buildprint/web-ui-map.md`** — the live DOM/state map, captured against the
real logged-in account. Highlights:
- **Browser access route: the Claude-in-Chrome extension against the real profile.** Two
  alternatives were tested and *ruled out empirically*, so don't retry them:
  Chrome ≥136 (this Mac runs 151) **refuses `--remote-debugging-port` on the default
  user-data-dir**, and **cloning the session into a separate profile fails** (ordinary
  cookies decrypt fine, but the `__Host-__convexAuth*` cookies don't authenticate).
- State machine: `button "Stop generating"` present = RUNNING; `button "Send"` = DONE.
- The "+" is `button "New conversation in CRS"`. Chats live at
  `/59pjzno1gh5kwj4r1zs8gg/agent/chat/<chatId>`.
- **The composer is contenteditable (role=generic), not a textarea** — setting `.value`
  submits empty. Type, then read back and compare. Always.
- **The composer carries a Test/Build branch selector** — the first real enforcement point
  for "TEST branch only", which has been discipline-only until now. Assert it before send.
- **Blocking gap:** the *asking-a-question* and *errored* states are still unmapped (no
  agent asked anything during the capture window). **Phase 3 auto-answering must not ship
  until a real question is observed.** Until then the supervisor escalates anything it
  cannot positively classify.

**Windows caveat:** the Chrome-extension route should work identically there, but the
CDP/profile-clone dead ends are platform-general — the same two traps apply.

Full architecture, phases, effort estimates and safety rails are in the plan in the Mac
session transcript; the prerequisites are summarised in §3.5 below.

---


## 1. Start the app (Windows)

```bash
cd <repo>/crs-brain
npm install                            # node_modules is gitignored — per-OS native builds
node server.js                         # http://127.0.0.1:4317
```

- **`server.js` is NOT hot-reloaded.** `public/` is served fresh every request, but any
  server change needs a restart. This has bitten every session.
- For phone access: `CRS_BRAIN_HOST=0.0.0.0 node server.js` (or `start-mobile.command`).
- The Buildprint worktree lives OUTSIDE this repo at `~/projects/crs-bubble/<app>/test`.
  Without it the chat still works; Buildprint capability degrades with an honest note.

### The QA rigs
`brain/qa/rig-scripts/*.js` — puppeteer-core against system Chrome. Scripts written on the
Mac hardcode `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`; on Windows
change the `CHROME` constant to `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`.
All the usage/livemap rigs need a viewport of at least 1400x900 (the live map hides <=900px).
The Mac session added: `fable-bar.js`, `auto-cb.js`, `auto-immediate.js`,
`drag-still-works.js`, `cards-identical.js`.

Current green suite (run with the server up):
`verify-spec-acceptance.js` 13/13 · `probe-one-screen.js` 23/23 · `probe-card-reach.js` 8/8 ·
`shoot-atom.js` 14/14 · `probe-sync.js` 9/9 · `probe-thinking-brain.js` 8/8 ·
`probe-genmeter.js` 5/5 · `probe-routing.js` 14/14 · `probe-usagewin.js` 21/21 ·
`probe-askpin.js` 24/24.

None of them spend a model call. `probe-routing` uses `GET /api/route-preview`;
`probe-askpin` drives `/api/ask` exactly as the MCP shim does; `probe-thinking-brain`
injects `brainHtml()` into the DOM.

---

## 2. What shipped in the WINDOWS session before this (newest first)

| Commit | What |
|---|---|
| `a4d6c10` | statusline captures its raw payload → limit questions settled by evidence |
| `3915b00` | usage window: brain's model, this chat's context, all limit windows, opt-in auto-refresh |
| `a25f8e9` | **Ask Protocol v2** — pinned cards, decision cards, always-on free text, prose backstop |
| `93ad858` | deliberated per-message model/effort routing + the live usage window |
| `4480695` | run meter above the composer, left-aligned, no chrome |
| `299987f` | hover gesture is one synchronised choreography |
| `0a19176` | hero atom rebuilt — gradient comets, real orbital speed |
| `c0fab5f` | every element of the atom animates; links flow and fade |
| `3a44064` | the colourful AI brain restored, in chat and on hover |
| `edce148` | quick-action cards can actually be reached and clicked |
| `27e59fd` | ONE screen, Map-only header, in-map view selector |
| `f7dd953` | starter prompts as the default main screen |

**Mac session commits (2026-08-07), newest first:**

| Commit | What |
|---|---|
| `286e6fc` | bpweb Phase 0 — live DOM/state map of the Buildprint web chat |
| `16bbf76` | usage: one renderer for both cards — the account popover IS the usage window |
| `b6be08c` | usage: the auto checkbox can actually be ticked, and refreshes on enable |
| `1abc179` | docs: handoff — 3.1 closed |
| `d2688b4` | qa: fable-bar rig |
| `55020d5` | usage: Fable weekly bar via /usage scrape + node-pty spawn-helper self-heal |
| `cfe4ed4` | connections: Buildprint link status truthful + Unlink |
| `acd6314` | connections: allow claude.ai Gmail connector in bp-spawn sessions |

New locked rules from this stretch are written up in `BRAIN_APP_PROGRESS.md` and, where
they overturn a prior ruling, in `decisions.md` (the AI-colour carve-out, 2026-08-07).

---

## 3. OPEN — pick up here

### 3.1 CLI + Fable weekly bar — ✅ CLOSED on the Mac. See §0.1.
**Windows still needs `claude update`** (it is on 2.1.120; the Mac is on 2.1.223). The
Fable bar itself needs no further work — it renders from the scraped `/usage` screen.

### 3.2 Usage window header label — decision made, NOT yet implemented
Vlad chose **"show the routed model only"** (what the router picked for the current/next
turn, matching the composer dropdown) over the current behaviour (the model this chat
last ran on, which is why it reads "Opus 5").

Change `brainModel()` in `crs-brain/public/js/usagewin.js`: drop the
`chatCtx.model` fallback and prefer the live routed model → the composer's resolved
`Auto · X` label. `probe-usagewin.js` asserts the title is non-empty and not "4.7";
tighten it to assert it matches the composer selector.

### 3.3 Vlad's standing homework (unchanged, none of it blocked on me)
- `.bp-test-user` credentials for authenticated Buildprint captures
- report the Buildprint Windows `login` bug upstream
- ingest the User Management audit findings (there is a HIGH role-escalation hole in it)
- run the pilot chunk reports
- Tailscale Serve for stable phone access
- ratify the review digest

### 3.4 Smaller flagged items
- `queue.html` uppercases status in JS (spec says no uppercase headers)
- `protos.html` has two inline font-sizes that need `!important` to normalise
- the LIVE map (`js/livemap.js`) still has `--lm-deco` dimmed; the galaxy map was
  restored but the live map was not

---

### 3.5 Buildprint Web Supervisor — prerequisites before Phase 1
Phase 0 is done (§0.4). Before the supervisor is built, five queue defects must be fixed —
they are survivable for second-long tasks but not for a 20-minute browser job:

1. **`looksLikeLimit` is a regex over error TEXT** (`/usage limit|rate.?limit|too many
   requests|overloaded/i`). A Buildprint page or error containing "rate limit" makes the
   queue conclude *your Claude window* is exhausted, pause everything, and arm a 30-minute
   resume. **Sanitize any remote/browser error before throwing.**
2. **Lost-update race in `runQueue`** — it snapshots the queue, awaits, then writes the
   stale snapshot back, discarding anything added meanwhile. A long browser job makes this
   near-certain.
3. **No per-task timeout, no cancel, no kill.** The only stop is a 10-minute *inactivity*
   timer inside `runClaudeStream`, which a browser-driving path would not use. A hung job
   blocks the single-slot queue forever and `/api/queue/remove` refuses running tasks.
4. **Intent tasks are progress-opaque** — no hooks are passed, so the UI shows `running`
   and nothing else for the whole run.
5. **The queue writes no audit trail** (`logAudit` is never called), and `bp-log.js` only
   records buildprint/git — agent-browser/extension actions are invisible.

Bonus, now relevant: **`limitResetMs()` only inspects `five_hour` and `seven_day`** — it
does not know about the new `seven_day_fable` window, so a Fable-exhausted block computes
the wrong reset time.

### 3.6 Security finding — scrub before it matters
`crs-brain/data/chats/4bd5e3fa-9fed-42af-8992-cc42864340c2.json` is **committed to the
public repo** and contains four `agent-browser cookies set` commands carrying a real
32-character Bubble session token (`casinoreportingsystem_u1_testmain`) from the July
auth-automation attempt. TEST branch and near-certainly expired, but it should be scrubbed,
and it demonstrates that chat transcripts capture whatever is typed into commands.

## 4. Things that will bite you (hard-won)

- **`server.js` needs a restart.** Said twice on purpose.
- **`index.html`'s top-level `let`/`const` are LEXICAL globals, not on `window`.**
  `window.state` is `undefined`. Use the bare identifier inside a `try`. This silently
  broke the usage window's per-chat lookup for an hour.
- **Heredocs and `node -e` mangle quotes on Windows.** Use the Write tool for scripts and
  `git commit -F -` for messages containing `·` or `—`. On the Mac this matters less.
- **A python patch script that replaces a RANGE can delete functions you forgot were in
  it** — that is how `tick()`/`startLoop()` vanished from `usagewin.js`. Prefer targeted
  replacements with asserts.
- **Chrome's LCD subpixel AA corrupts hue histograms.** The acceptance rig passes
  `--disable-lcd-text --font-render-hinting=none`; without them A1 reports phantom orange.
- **Chrome >=136 refuses `--remote-debugging-port` on the default user-data-dir.** Any
  browser-automation plan that assumes it can attach to the running everyday Chrome is
  dead on arrival. Use the Claude-in-Chrome extension instead.
- **Copying a Chrome profile does NOT copy a modern web session.** Ordinary cookies
  decrypt; `__Host-`-prefixed auth cookies do not authenticate. Verified against Buildprint.
- **`decisions.md` gets written by the rig** (`probe-askpin.js` exercises the decision
  card end to end, which appends a real `[CANDIDATE]` entry). Back it up before running
  that rig and restore after, or `git checkout decisions.md`.

---

## 5. Contract summary for the ask/decision system (new, worth knowing cold)

- Sessions must **never ask in prose**. Operational choice → `ask_vlad`. Architectural or
  `[OPEN]`-decision choice → `decide_with_vlad`. Both block on the answer.
- An `ask_vlad` that trips an `[OPEN]` trigger is **upgraded** to a decision card by the
  server automatically — the session does not handle that case.
- A decision card has no "recommend" shortcut and no standing-answer checkbox, and its
  answer lands in `decisions.md` as a `[CANDIDATE]` for Vlad to ratify by hand.
- If a turn still ends in a prose question with no card raised, the server parses options
  out of the text and raises one, logged to `ask-log.jsonl` with `source:'backstop'`.
