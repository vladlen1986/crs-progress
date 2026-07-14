# CLI: Applying changes
> Source: https://docs.buildprint.ai/cli/applying-changes-30wgq · Captured: 2026-07-14

Once you have edited the shredded files in a branch workspace, compile those edits back into Bubble with `buildprint apply`. This guide covers the write side of the loop: pushing local changes to Bubble, pulling the latest Bubble snapshot back down with `buildprint sync`, and comparing two branches with `buildprint changelog`.

The natural loop:

```bash
buildprint check   # validate your edits
buildprint apply   # push them to Bubble
```

Run `buildprint sync` whenever the Bubble app may have changed underneath you. `buildprint check` is the gate that must pass before you apply (see [cli-validating-with-check.md](cli-validating-with-check.md)).

## buildprint apply

Pushes the local workspace changes for the current branch to Bubble and records them in Buildprint. It requires a successful full `buildprint check` for the current workspace state (unless `--force-apply` is used), reruns the internal check by default, and auto-commits any unapplied edits before applying.

```bash
buildprint apply
buildprint apply my-app main
```

Run from inside a branch workspace. Both arguments optional:

- `[appId]` — Bubble app ID. Defaults to the app in the workspace `app.json`. If provided, must match the workspace app.
- `[branch]` — Branch name. Defaults to the current git branch. If provided, must match the branch the workspace is on.

### What a successful apply does

- Verifies the latest synced Bubble snapshot has been merged into your workspace. If not, apply stops and tells you to run `buildprint sync` first, so you do not overwrite newer Bubble editor changes with stale local files.
- Requires a fresh, successful full `buildprint check` (unless `--force-apply`), then reruns the internal check pass (unless `--no-check`).
- Auto-commits any uncommitted workspace edits into the branch worktree before applying.
- Compiles the local diff and posts the changes to Bubble and records them in Buildprint.
- Advances `refs/published/<branch>` (the "last commit successfully applied to Bubble" pointer) to the workspace HEAD and updates the local Bubble snapshot commit for the branch.

Apply prints a JSON result line reporting the app, branch, elapsed seconds, and number of changes applied. If there is nothing to apply, it reports `unchanged`.

### Flags

- `--no-check` — skip rerunning the internal `buildprint check` pass. A fresh, successful full `buildprint check` is still required unless `--force-apply` is used.
- `--allow-large-apply` — allow applying when the local Bubble base is tiny and the workspace is substantial. Use only when you intentionally cloned a small base and are pushing a large body of work. Otherwise, large apply indicates a potential issue.
- `--force-apply` — bypass check freshness, internal validation, and large-apply safety gates. Do NOT use it to work around a "snapshot not merged" error, since applying stale local files can overwrite newer Bubble editor changes.

### If apply reports you are out of sync

If Bubble has changed since your last sync, apply refuses to proceed and points you at `buildprint sync`. Sync, resolve any merge, then re-apply:

```bash
buildprint sync
buildprint apply
```

## buildprint sync

Fetches the latest Bubble snapshot for the current branch and merges it into your workspace. Updates `refs/bubble/<branch>` (the last synced Bubble snapshot) and merges that into your local HEAD, so your edits sit on top of the current Bubble state.

```bash
buildprint sync
buildprint sync status
buildprint sync --no-merge
buildprint sync --reset
buildprint sync --allow-suspicious-shrink
```

Run from inside a branch workspace.

### When to sync

Sync before you continue working whenever the Bubble app may have moved underneath your workspace, in particular:

- Someone edited the app in the Bubble editor. Those edits are invisible to your workspace until you sync, and the next `apply` would otherwise be blocked or could clobber their work.
- `buildprint apply` told you the workspace is out of sync or the latest snapshot has not been merged.
- You are starting a fresh session on a branch you have not touched in a while.

If the merge has conflicts, sync stops and tells you to resolve them with `git status` / edit / `git add` / `git commit`, or to run `buildprint sync --reset --confirm` to discard local work and snap to Bubble.

### Flags

- `--no-merge` — update the local Bubble snapshot only; skip the merge into HEAD. Fetch the latest snapshot without touching your working tree yet.
- `--allow-suspicious-shrink` — allow replacing a substantial local Bubble snapshot with a tiny fetched export. Sync guards against this by default, since it usually signals a bad export.
- `--reset` — explains how to reset this branch workspace to the latest Bubble snapshot. Wipes local changes, so it requires confirmation; run `buildprint sync --reset --confirm` to actually discard local work and snap the branch to Bubble. Cannot be combined with `--no-merge`.

### buildprint sync status

Shows how your workspace relates to the latest fetched Bubble snapshot without changing anything:

```bash
buildprint sync status
```

Prints the branch, the latest fetched Bubble snapshot commit (`refs/bubble/<branch>`), your workspace HEAD and how many local files have changed, the last applied Buildprint state, and a recommendation such as "run `buildprint sync` to merge" or "run `buildprint sync --reset` to discard local work and snap to Bubble".

## buildprint changelog

Creates a readable local changelog between two Buildprint branch workspaces. Run from inside an app root.

```bash
buildprint changelog staging feature-x
buildprint changelog staging feature-x --output changelog.md
buildprint changelog live test --json
```

Both arguments required:

- `<sourceBranch>` — source branch workspace.
- `<targetBranch>` — target branch workspace.

If a compared branch has not been cloned yet, `buildprint changelog` prepares its workspace before diffing. It fails only if neither branch exists.

By default it prints the changelog as Markdown. Flags:

- `--json` — print the changelog report as JSON instead of Markdown.
- `-o, --output <path>` — write the changelog output to a file. The path must be outside both compared branch workspaces; a relative path is resolved against the app root.
