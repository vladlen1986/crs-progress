# Buildprint web UI map — selectors + state signals

> Phase 0 deliverable for the **Buildprint Web Supervisor** (brain drives the Buildprint
> web chat in a real browser). Everything here was captured LIVE on **2026-08-07** against
> `www.buildprint.ai` while logged in as VLAD, Chrome 151, viewport 1920x1080.
>
> **This file is the fragility of the whole feature.** When Buildprint ships a UI change,
> re-verify this map first — the supervisor's state machine reads entirely from it.
> Only facts that were directly observed are recorded. Nothing here is inferred.

## How the browser is driven (decided 2026-08-07)

**Claude-in-Chrome extension against Vlad's real Chrome profile.** Not CDP, not a cloned profile.

Two dead ends were tested and ruled out, both empirically:

1. **`--remote-debugging-port` on the real profile: IMPOSSIBLE.** Chrome ≥136 (this machine
   runs 151) refuses remote debugging when the default user-data-dir is in use — a
   deliberate anti-session-theft measure. Verified: launching with the flag produced no
   listener on 9222. A running Chrome also cannot have a debug port added retroactively.
2. **Cloning the session into a separate user-data-dir: FAILS.** Copying `Local State` +
   `Profile 2/Cookies` (+ Local Storage / IndexedDB) into `~/.crs-bp-chrome` produced a
   browser where ordinary cookies decrypt fine (`buildprint_locale` was readable via
   `document.cookie`) but the two `__Host-__convexAuthJWT` / `__Host-__convexAuthRefreshToken`
   session cookies did **not** authenticate — the app still rendered Login/Sign up.
   Convex auth appears to bind the session beyond the cookie jar. Do not retry this path.

The extension needs no debug port, no credentials, and no session copying: it operates the
already-logged-in browser directly. A CDP fallback would require a one-time manual login in
a dedicated profile.

## Identity

| Thing | Value |
|---|---|
| App host | `https://www.buildprint.ai` (NOT `app.` — the marketing site and app share the host) |
| Workspace | `VLAD's Workspace` · plan **Pro** |
| Project | `CRS` — **107 conversations** at capture time |
| Project id | `59pjzno1gh5kwj4r1zs8gg` |
| Chat list URL | `/59pjzno1gh5kwj4r1zs8gg/agent/chat` |
| Single chat URL | `/59pjzno1gh5kwj4r1zs8gg/agent/chat/<chatId>` |
| Example chatId | `r17dkash7cxg74495t9410bhb18bzbq4` (32-char lowercase alnum) |
| Auth check | An authenticated page exposes `link "Dashboard" href="/dashboard"`; anonymous shows `Login` / `Sign up` |

`/dashboard` auto-redirects to the last project's agent chat — a reliable entry point.

## The four state signals (THE core of the supervisor)

Read from accessible names, which are stable and semantic — prefer these over coordinates.

| State | Signal | Confidence |
|---|---|---|
| **RUNNING** | `button "Stop generating"` exists in the composer form | **Verified live** — observed on a genuinely running agent |
| **IDLE / DONE** | `button "Send"` exists and `"Stop generating"` is ABSENT | **Verified** |
| **RUNNING (list view)** | The conversation row in the sidebar shows a spinner glyph; its hover card reads `● Running · <n>m ago` | **Verified** — literal text "Running" |
| **ASKING A QUESTION** | *Not yet captured* — no agent asked a question during the window | **UNVERIFIED — must be captured before Phase 3 ships** |
| **ERRORED** | *Not yet captured* | **UNVERIFIED** |

> The supervisor must treat `Stop generating` as the single source of truth for "busy".
> Everything else is corroboration.

## Elements

### Sidebar / conversation list
| Element | Accessible name | Notes |
|---|---|---|
| **New chat (the "+")** | `button "New conversation in CRS"` | Top of sidebar, right of Search (~x=377,y=21 @1920w). **This is the + Vlad means.** |
| New thread | `button "New thread in CRS"` | Distinct from new conversation — do not confuse |
| Search | `textbox "Search..."` | |
| Project actions | `button "Project actions for CRS"` | |
| Sidebar toggle | `button "Toggle Sidebar"` | |
| Conversation rows | link/button per chat | Some rows carry a branch tag (`Test` / `Live`) under the title |

### Composer (bottom of a chat)
| Element | Accessible name / role | Notes |
|---|---|---|
| Form | `form "Message input"` | ref anchor for the whole composer |
| **Input** | `generic "Message input"` | **Role is `generic`, not `textbox` → contenteditable.** Setting `.value` will NOT work; use real keystrokes (`keyboard inserttext` / extension `type`). **Always verify with a read-back after typing.** |
| Send | `button "Send"` | Idle state |
| **Stop** | `button "Stop generating"` | Running state — replaces Send |
| Attach | `button` (+) at composer left | ~x=663 |
| Model picker | shows `Opus 5` | Also seen: reasoning-effort control beside it |
| **Mode** | `Plan` (new chat) / `Build` (in-chat) | |
| **Branch** | `Test` | **Critical: the composer carries a branch selector. The supervisor MUST assert this reads `Test` before sending — this is the enforcement point for the "TEST branch only, never live" rule, which is otherwise discipline-only.** |
| Voice | mic button, composer right | |

### Chat header
Breadcrumb `CRS / <chat title>`; `Preview`, attachments, and an overflow `⋮` at top right.

### Work summary
Completed work collapses into a `> Worked for 7m 57s` disclosure, with structured sections
(`Reusable elements`, `Workflows`) listing what changed. Useful as a completion artifact to
capture into the report file.

## Implications for the supervisor build

1. **The composer stays enabled while the agent runs** — a message can be queued mid-run.
   So "composer is editable" is NOT an idle signal. Only `Stop generating`'s absence is.
2. **Contenteditable input** — this is the classic silent-failure mode (box looks filled,
   submits empty). Type, then read back and compare before clicking Send. Never skip.
3. **Branch assertion before every send.** Non-negotiable.
4. **`Stop generating` doubles as the kill switch** — the supervisor's Stop can click the
   product's own stop button rather than inventing an abort path.
5. **Question/error states are still unmapped.** Phase 3 (auto-answering) MUST NOT ship
   until a real agent question has been observed and its signal recorded here. Until then
   the supervisor should escalate anything it cannot positively classify as running/done.

## Open items

- [ ] Capture the **asking-a-question** rendering (needs a live agent question)
- [ ] Capture the **errored** state
- [ ] Confirm a ~10k-character paste survives the contenteditable intact (median engine
      prompt is 9.7k chars; max observed 14.5k)
- [ ] Determine the stall heuristic: how long `Stop generating` can persist with no visible
      output change before the supervisor types `continue`
