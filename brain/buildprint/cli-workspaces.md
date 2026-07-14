# CLI: Workspaces
> Source: https://docs.buildprint.ai/cli/workspaces-i7d5m · Captured: 2026-07-14

A Buildprint workspace materializes a Bubble app branch as an editable folder structure on disk, using git to track changes between local edits, Bubble's state, and applied modifications.

## The app root

Cloning an app creates an app root directory:

```bash
buildprint project clone <appId>
buildprint project clone <appId> --dir ./my-app
```

The app root contains a hidden `.buildprint/` directory serving as the control plane:

- `.buildprint/app.json` — stores schema version, Bubble app ID, and authentication token reference
- `.buildprint/remote.git` — shared bare repository storing all snapshots and history
- `.buildprint/cache/` — local CLI caches (safe to delete; regenerated automatically)

Commands can run from anywhere within the workspace; the CLI locates the app root by searching upward for `.buildprint/` containing a bare repo and readable config.

## Each branch is a git worktree

Every cloned Bubble branch becomes a git worktree as a direct child of the app root:

```plaintext
my-app/
  .buildprint/
    app.json
    remote.git/
  test/          <- worktree for the Bubble "test" branch
  live/          <- worktree for the Bubble "live" branch
  feature-x/     <- worktree for a feature branch
```

Default cloning targets the `test` branch. Since Bubble's editable branch is typically Test rather than main, verify branch names first:

```bash
buildprint branch list <appId>
buildprint project clone <appId> --branch feature-x
buildprint project clone <appId> --branch live
```

Cloning additional branches reuses the same app root and shared bare repo:

```bash
buildprint project clone <appId> --branch live && buildprint project clone <appId> --branch test
```

The folder name and checked-out git branch are bound together — the `test/` folder must contain the `test` branch. The CLI enforces this constraint and rejects worktrees with mismatched HEAD or those moved away from their app root. Recreate branch folders with `project clone` rather than moving them.

## The refs that track state

Three refs per branch track state in the shared bare repo:

- `refs/heads/<branch>` — your working branch checked out in the worktree; commits accumulate here as you edit
- `refs/bubble/<branch>` — the last snapshot synced from Bubble (outside `refs/heads/` so `git branch` shows only working branches)
- `refs/published/<branch>` — the last working commit successfully applied to Bubble

These advance at defined moments:

- **Clone / seed**: the CLI decomposes the fetched Bubble app into files, commits them to `refs/heads/<branch>`, and points both snapshot and published refs at that commit. All three states align initially.
- **Sync**: `buildprint sync` fetches the latest Bubble snapshot, commits it to `refs/bubble/<branch>`, and merges into your HEAD (unless `--no-merge` is passed). Clean fast-forwards occur if no local changes exist; edits trigger git merges with conflicts surfacing normally. The `--reset` flag discards local changes and hard-resets to the snapshot.
- **Apply**: `buildprint apply` compiles the difference between your working tree and the last snapshot into Bubble write calls. Upon success, "the CLI advances `refs/published/<branch>` to your current HEAD commit," marking exactly what Bubble now holds.

The worktree tracks a `buildprint/<branch>` remote mirroring `refs/published/*`, enabling git to show how far ahead of published Bubble your local work is.

## Why this makes local editing safe

With edits as commits on `refs/heads/<branch>` and Bubble's state pinned in separate refs:

- **Diffs**: local changes since the last snapshot are your working tree against `refs/bubble/<branch>` — exactly what `buildprint apply` writes.
- **Savepoints**: savepoints capture editor restore points; real git history lets you roll files back to any snapshot without touching Bubble.
- **Drift detection**: comparing `refs/published` to `refs/bubble` reveals whether Bubble changed since your last apply, so stale applies fail locally with guidance to sync rather than being rejected server-side.

Validate before applying:

```bash
buildprint check
buildprint apply
```

## Multiple apps and branches side by side

Each app maintains its own app root with its own `.buildprint/remote.git`; no shared global state exists between apps. Within one app root, every cloned branch is another sibling worktree backed by the same bare repo, enabling branches to share history efficiently while remaining fully independent on disk.

List and inspect your workspace:

```bash
buildprint project list
buildprint project info <appId>
buildprint branch list <appId>
```
