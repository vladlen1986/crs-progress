# CRS Brain — Memory

> Persistent, structured memory the Brain always honors. Auto-written when you say "remember this"; safe to edit by hand. Canonical copy is `memory.json`.

## Decisions
- **Anonymous sign-in page is dark BY DESIGN** — Vlad ruled 2026-07-19: the index/sign-in page renders dark for logged-out visitors — intended behavior, never a bug to fix. Light mode there activates only for logged-in users with dark_theme = no. Verify index light mode logged-in; never propose anonymous-theme workarounds unless Vlad reopens the decision (see decisions.md 2026-07-19).  _(2026-07-18)_

## Technical
- **Index page.json is un-editable via Buildprint** — Any edit to the index page's page.json — even one character — trips a pre-existing blocking check error (canvas-root-name-validity: 'index' is a reserved name). Never rename index (required to run the app) and never plan page-level edits on it; page-scoped changes need another mechanism (e.g. per-element states or a reusable).  _(2026-07-18)_
- **CRS light-mode pattern: bptheme element states** — Theming is per-element conditional states keyed on Current User's dark_theme is_false, overriding colors with the paired '· Light' tokens from tokens.json (e.g. BG Secondary ↔ BG Secondary · Light). Copy the pattern from existing elements (e.g. Toast); never edit shared style files for one page — that leaks to every page using the style.  _(2026-07-18)_
- **Anonymous users have no theme — auth pages** — Logged-out visitors get a fresh Bubble temp user with EMPTY fields, so conditionals keyed on Current User's dark_theme never fire on the sign-in/index page — it renders its hardcoded defaults regardless of what any account chose before logging out. Theme work on pre-login pages must explicitly decide the anonymous default (light/dark/OS preference via an HTML element, since index page.json is un-editable) and must be verified with an ANONYMOUS run-mode screenshot in both themes before claiming done.  _(2026-07-18)_

## Workflow
- **No scratch files inside the Bubble worktree** — buildprint check flags any non-schema directory (e.g. .context/) at the workspace root as an invalid entry. Write scratch/analysis files OUTSIDE the worktree; rm -rf is guard-blocked, so stray files must be deleted individually before check passes.  _(2026-07-18)_
- **Reverting uncommitted worktree edits** — git checkout/reset are blocked by the safety gate in BP sessions. To revert an uncommitted file, Read the synced content and Edit it back manually — or ask Vlad for a one-off approval. Do not retry the blocked git command.  _(2026-07-18)_
- **Use node, not python, for local scripts** — python/python3 are not installed on the Windows host — local aggregation/analysis scripts in BP sessions must be written for node (which is always available).  _(2026-07-18)_

