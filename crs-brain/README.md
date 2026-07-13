# CRS Brain 🧠

A local **second-brain** for the CRS project. Chat with Claude about your work,
browse and edit your `.md` files, and keep a live progress board — all in one place.

- **Uses your Claude Max subscription** (via the headless `claude` CLI). **No per-token API billing.**
- **Infinite, git-versioned memory** — every conversation and the progress board are saved as
  files in `crs-brain/data/`, so `git` history keeps everything forever.
- **Grounded in your real repo** — the file browser and chat read/write the actual project files
  (`CLAUDE.md`, `decisions.md`, `design/`, `data/`, anything you add).

## Requirements

- [Node.js](https://nodejs.org) (already installed)
- Claude Code CLI, logged in with your Max plan (`claude` — already set up)

## Run it

Double-click **`start.bat`**, or from a terminal:

```
node crs-brain/server.js
```

Then open **http://localhost:4317** in your browser.

To stop: press `Ctrl+C` in the terminal (or close the window).

## How it works

| Part | What it does |
|---|---|
| **Chats** (left) | Conversations with Claude. Each one is resumable — Claude remembers the whole thread. Saved to `data/chats/*.json`. |
| **Files** (left) | Tree of every `.md`/`.txt`/`.json`/… in the repo. Click to read (markdown rendered); hit **Edit** → **Save** to change it. |
| **Chat** (center) | Ask anything: "what's next?", "what's missing?", "summarize the currency decision", "update the progress board". Claude reads the real files to answer. |
| **Progress** (right) | Now / Next / Later / Done + a Missing-gaps list. Ask the Brain to update it and it edits `data/progress.json`. |

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
