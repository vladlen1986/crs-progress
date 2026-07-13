# CRS Brain 🧠

A local **second-brain** for the CRS project. Chat with Claude about your work,
browse and edit your `.md` files, and keep a live progress board — all in one place.

- **Uses your Claude Max subscription** (via the headless `claude` CLI). **No per-token API billing.**
- **Infinite, git-versioned memory** — every conversation and the progress board are saved as
  files in `crs-brain/data/`, so `git` history keeps everything forever.
- **Grounded in your real repo** — the file browser and chat read/write the actual project files
  (`CLAUDE.md`, `decisions.md`, `design/`, `data/`, anything you add).

## Requirements (once per machine — Windows or Mac)

- [Node.js](https://nodejs.org)
- Claude Code CLI, signed in with your Max plan. If the app shows "Connect
  Claude account", click it (or run `claude auth login` once).

> A web page can't run your Claude subscription by itself — browsers block pages
> from launching programs. So the launcher below starts a tiny local backend
> that talks to the `claude` CLI. You never manage it manually: one double-click
> starts it **and** opens the app.

## Run it — one double-click

- **Windows:** double-click **`start.bat`**
- **Mac:** double-click **`start.command`** (first time: right-click → Open)

Your browser opens to the app automatically. Keep the little terminal window
open — that *is* the app. Close it to quit. Double-clicking again while it's
running just re-opens the tab.

(Manual fallback: `node crs-brain/server.js`, then open http://localhost:4317)

## How it works

| Part | What it does |
|---|---|
| **Chats** (left) | Conversations with Claude. Each one is resumable — Claude remembers the whole thread. Saved to `data/chats/*.json`. |
| **Files** (left) | Tree of every `.md`/`.txt`/`.json`/… in the repo. Click to read (markdown rendered); hit **Edit** → **Save** to change it. |
| **Chat** (center) | Ask anything: "what's next?", "what's missing?", "summarize the currency decision", "update the progress board". Replies **stream in live**; Claude reads the real files to answer. |
| **Attach files** (📎) | Attach any file to a message; the Brain reads it to answer. Files are stored in `data/attachments/` (kept local, not committed). |
| **Open as doc** (📄) | Every reply has an "Open as doc" button — saves that reply as a markdown file in `data/docs/` and opens it in the viewer. Ask "give me X in markdown" → click → it opens. |
| **Model & effort** (top bar) | Switch model (Opus 4.8 / 4.7, Sonnet 5, Haiku 4.5, Fable 5) and reasoning effort (low→max) anytime. Saved to `data/settings.json`, applied via `claude --model/--effort`. |
| **Live usage** (right panel) | Optional. Shows your 5-hour session and 7-day weekly limits with reset countdowns. Click **Enable live usage** — it adds a statusline to `~/.claude/settings.json` that records the limits Claude Code reports. Refreshes when you use Claude Code interactively (limits are account-wide, so this app counts too). Headless `claude -p` can't emit these, hence the statusline approach. Turn off anytime. |
| **Weekly digest** (button) | One click pulls the last 7 days of git commits + the progress board and asks the Brain: what changed, what's in progress, what's next, what's missing/stalled. |
| **Progress** (right) | Now / Next / Later / Done + a Missing-gaps list. Ask the Brain to update it and it edits `data/progress.json`. |
| **Auto-commit** | Every exchange commits `crs-brain/data` to git automatically, so your memory is always versioned. Turn it off with `CRS_BRAIN_AUTOCOMMIT=0`. |

## Memory = git

Nothing is trapped in a browser. To snapshot your brain:

```
git add crs-brain/data && git commit -m "brain snapshot"
```

Your whole thinking history is versioned alongside the project.

## Notes

- Runs on `127.0.0.1` only — not exposed to the network.
- Claude can edit files (permission mode `acceptEdits`) so it can update the progress board and docs.
  It works inside this repo folder only.
- Change the port with `CRS_BRAIN_PORT=5000 node crs-brain/server.js`.
