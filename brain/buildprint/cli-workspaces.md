# CLI: Workspaces
> Source: https://docs.buildprint.ai/cli/workspaces-i7d5m · Captured: 2026-07-14 (verbatim .md)

A Buildprint workspace is how the CLI lays a Bubble app out on disk. It materialises a Bubble branch as an ordinary folder of files you can edit like code, and it uses git under the hood to track what came from Bubble, what you have changed locally, and what has been applied back. Understanding this model explains how Buildprint works behind the scenes.

## The app root

When you clone an app, the CLI creates an app root directory. By default it is named after the app ID, or you can override the location with `--dir`:

```bash
buildprint project clone <appId>
buildprint project clone <appId> --dir ./my-app
```

The app root holds a single hidden `.buildprint/` directory that is the control plane for every branch of that app:

- `.buildprint/app.json` - app-level config: the schema version, the Bubble `appId`, and the token reference used to authenticate.
- `.buildprint/remote.git` - a shared bare git repository. This is the store of record for all snapshots, published state, and local history. No files are ever checked out here; the CLI streams commits straight into it, which is what makes cloning a large app fast.
- `.buildprint/cache/` - local CLI caches (check state, snapshot indexes). Safe to delete; regenerated on demand.

The CLI finds the app root by walking upward from wherever you run a command until it sees a `.buildprint/` with a bare repo and a readable `app.json`, so you can run commands from anywhere inside the workspace.

## Each branch is a git worktree

Every Bubble branch you clone becomes a git worktree that is a direct child of the app root:

```plaintext
my-app/
  .buildprint/
    app.json
    remote.git/
  test/          <- worktree for the Bubble "test" branch
  live/          <- worktree for the Bubble "live" branch
  feature-x/     <- worktree for a feature branch
```

`buildprint project clone` defaults to the `test` branch. Bubble's editable branch is usually Test, not `main`, so `--branch main` will typically fail - run `buildprint branch list <appId>` to see the real names:

```bash
buildprint project clone <appId> --branch feature-x
buildprint project clone <appId> --branch live
```

Cloning a second branch of an app you already have reuses the same app root and its shared bare repo, adding a new sibling worktree:

```bash
buildprint project clone <appId> --branch live && buildprint project clone <appId> --branch test
```

The folder name and the git branch checked out inside it are bound together: the `test/` folder must have the `test` branch checked out. The CLI enforces this and refuses to operate on a worktree whose HEAD does not match its directory name, or one that has been moved away from its app root. If you need a branch folder somewhere else, recreate it with `project clone` rather than moving it.

## The refs that track state

Because everything is git, "what does Bubble have" and "what have I applied" are just refs in the shared bare repo. There are three per branch:

- `refs/heads/<branch>` - your working branch. This is the HEAD checked out in the worktree, and the commits you build up as you edit and apply.
- `refs/bubble/<branch>` - the last snapshot synced down from Bubble. It lives outside `refs/heads/` so that `git branch` lists only your working branches, not raw snapshots.
- `refs/published/<branch>` - the last local commit that was successfully applied to Bubble.

These move at well-defined moments:

- **Clone / seed.** The CLI shreds the fetched Bubble app into files, commits them to `refs/heads/<branch>`, and points both `refs/bubble/<branch>` and `refs/published/<branch>` at that same commit. At this instant your workspace, Bubble's snapshot, and Bubble's published state all agree.
- **Sync.** `buildprint sync` fetches the latest Bubble snapshot, commits it onto `refs/bubble/<branch>`, and (unless you pass `--no-merge`) merges that snapshot ref into your working HEAD. If your local branch had no changes this is a clean fast-forward; if you had edits, git merges them, and real conflicts surface as ordinary git conflicts to resolve. `--reset` throws local changes away and hard-resets the worktree to the Bubble snapshot.
- **Apply.** `buildprint apply` compiles the diff between your working tree and the last snapshot into Bubble `/write` calls and posts them. When Bubble accepts the write, the CLI advances `refs/published/<branch>` to your current HEAD commit. So `refs/published` only moves on a successful apply and always marks exactly what Bubble now holds.

The worktree's git branch also tracks a `buildprint/<branch>` remote that mirrors `refs/published/*`, which is what lets git tell you how far ahead of published Bubble your local work is.

## Why this makes local editing safe

Because your edits are commits on `refs/heads/<branch>` and Bubble's state is pinned in `refs/bubble` and `refs/published`, the CLI can always answer three questions precisely:

- **Diffs.** What have you changed since the last Bubble snapshot? That is your working tree against `refs/bubble/<branch>`. `buildprint apply` uses exactly this delta to decide what to write.
- **Savepoints.** [Savepoints](./savepoints-and-branches.md) capture Bubble editor restore points for the branch, and because local history is real git, you can also roll your files back to any snapshot without touching Bubble.
- **Drift detection.** Comparing `refs/published` to `refs/bubble` tells the CLI whether Bubble has moved underneath you since you last applied, so a stale apply fails fast locally with guidance to sync instead of being rejected by the server.

Validate a change with `buildprint check` before applying, then apply it:

```bash
buildprint check
buildprint apply
```

## Multiple apps and branches side by side

Each app lives in its own app root with its own `.buildprint/remote.git`; there is no shared global state between apps. Within one app root, every branch you clone is another sibling worktree, all backed by the same bare repo, so branches of the same app share history cheaply while staying fully independent on disk. List and inspect what you have with:

```bash
buildprint project list
buildprint project info <appId>
buildprint branch list <appId>
```
