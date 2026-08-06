# CRS Brain — handoff (2026-08-07; Windows → Mac, then Mac → Windows)

Everything below is committed and pushed to `origin/main` (head `a4d6c10`). Working
tree clean. Pick up on the Mac with `git pull`.

> Read `crs-brain/BRAIN_APP_PROGRESS.md` first — every session in this stretch is
> logged there in detail, newest at top. This file is only the "where am I, what's
> next" summary.

---

## 1. Start the app on the Mac

```bash
cd ~/projects/crs-progress/crs-brain   # or wherever the clone lives
npm install                            # node_modules is gitignored — per-OS native builds
node server.js                         # http://127.0.0.1:4317
```

- **`server.js` is NOT hot-reloaded.** `public/` is served fresh every request, but any
  server change needs a restart. This has bitten every session.
- For phone access: `CRS_BRAIN_HOST=0.0.0.0 node server.js` (or `start-mobile.command`).
- The Buildprint worktree lives OUTSIDE this repo at `~/projects/crs-bubble/<app>/test`.
  Without it the chat still works; Buildprint capability degrades with an honest note.

### The QA rigs
`brain/qa/rig-scripts/*.js` — puppeteer-core against system Chrome. On the Mac the
`CHROME` constant at the top of each script points at the Windows path and **must be
changed** to `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.

Current green suite (run with the server up):
`verify-spec-acceptance.js` 13/13 · `probe-one-screen.js` 23/23 · `probe-card-reach.js` 8/8 ·
`shoot-atom.js` 14/14 · `probe-sync.js` 9/9 · `probe-thinking-brain.js` 8/8 ·
`probe-genmeter.js` 5/5 · `probe-routing.js` 14/14 · `probe-usagewin.js` 21/21 ·
`probe-askpin.js` 24/24.

None of them spend a model call. `probe-routing` uses `GET /api/route-preview`;
`probe-askpin` drives `/api/ask` exactly as the MCP shim does; `probe-thinking-brain`
injects `brainHtml()` into the DOM.

---

## 2. What shipped this session (newest first)

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

New locked rules from this stretch are written up in `BRAIN_APP_PROGRESS.md` and, where
they overturn a prior ruling, in `decisions.md` (the AI-colour carve-out, 2026-08-07).

---

## 3. OPEN — pick up here

### 3.1 Claude Code CLI upgrade + Fable weekly bar — ✅ DONE on the Mac (2026-08-07)
Closed on the Mac side; **Windows still needs the CLI upgrade** to get the same bar.

- CLI upgraded on the Mac to **2.1.223** via `claude update` (it self-manages; no brew).
  Windows is still on 2.1.120 — run `claude update` there.
- **The hypothesis was WRONG, and it is now settled with evidence.** 2.1.223's statusline
  payload still carries exactly `five_hour` + `seven_day` (captured verbatim in
  `crs-brain/data/statusline-raw.json`). Upgrading does NOT add a per-model bucket.
- The per-model window lives **only on the interactive `/usage` screen**:
  `Current week (all models) 62% used` / `Current week (Fable) 79% used`.
- Implemented (`55020d5`): `populateUsage()` now opens `/usage` inside the pty session it
  already drives, scrapes `Current week (<Model>) N% used`, and merges the rows into
  `usage.json` as `seven_day_<model>`. `windowLabel()` needed no change — the bar renders
  as **"Weekly · Fable 79%"**. Rig: `brain/qa/rig-scripts/fable-bar.js`.
- Reset time is reused from `seven_day.resets_at` on purpose (the per-model week runs the
  same cycle — observed 2:59am vs 3am — and parsing a localized "Resets Aug 8 at 2:59am
  (Asia/Tbilisi)" string across timezones is far more fragile than the epoch we already have).
- **Mac-only blocker fixed in the same commit:** npm drops the executable bit on node-pty's
  bundled `spawn-helper`, so EVERY pty spawn failed with `posix_spawnp failed.` (even
  `/bin/echo`) and the usage refresh was permanently dead on the Mac. The server now
  self-heals that bit before requiring node-pty. If Windows ever shows the same error after
  an `npm install`, this is why — but the fix path is POSIX-only, Windows uses `cmd.exe`.

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
