# CLI: Savepoints and branches
> Source: https://docs.buildprint.ai/cli/savepoints-and-branches-1arhv · Captured: 2026-07-14 (verbatim .md)

Savepoints and branches are two different ways to manage the history and structure of a Bubble app.

- A **savepoint** is a Bubble editor savepoint - a restore point that Bubble keeps for a single branch. Creating and restoring savepoints goes through Bubble, not your local git history.
- A **branch** is an editable Bubble app version (like `test`, `staging`, or a feature branch). Each branch you clone becomes a sibling git worktree in your app root, and you can create new branches and merge one into another.

All three command groups on this page (`savepoint`, `branch`, `merge`) act on the real Bubble app through the CLI. 

## Savepoints

A savepoint captures the state of a branch in Bubble so you can roll back to it later. Savepoint commands run against the branch of your current workspace, so run them from inside a cloned branch worktree.

### Create a savepoint

Create a savepoint before non-trivial changes so you can restore it if something goes wrong. Pass a human-readable description.

```bash
buildprint savepoint create "before refactor"
```

The command reports the new savepoint's timestamp, which is the identifier you use to restore it.

### List savepoints

List the savepoints that exist for the current workspace branch. Each row shows the savepoint timestamp, its description, and (when available) the email of whoever created it.

```bash
buildprint savepoint list
```

Add `--json` to print the response as JSON on stdout instead of the human-readable list:

```bash
buildprint savepoint list --json
```

### Restore a savepoint

Restore the current workspace branch to a savepoint using its timestamp (the identifier shown by `savepoint list`). The timestamp must be an integer.

```bash
buildprint savepoint restore 1745068712345
```

Restoring changes the state of the branch in Bubble. Because that happens on Bubble's side, your local workspace does not automatically match the restored state - after a restore, run `buildprint sync` to pull the restored snapshot into your local workspace.

## Branches

A branch is an editable Bubble app version. Use the `branch` commands to inspect a branch, list an app's whole branch tree, or create a new branch from an existing one.

### Inspect a branch

Run `branch` with no arguments inside a branch workspace to show information about the current branch:

```bash
buildprint branch
```

Pass a branch name or ID to inspect a different branch of the same app (still resolved from your workspace's app):

```bash
buildprint branch staging
```

Outside a workspace, or to inspect a branch of another app, pass the Bubble app ID first and then the branch:

```bash
buildprint branch <appId> staging
```

Add `--json` to any of these to print the same facts as JSON (this is a shaped view, not the raw API payload).

### List an app's branches

List the full branch tree for an app. This is read-only and takes the Bubble app ID:

```bash
buildprint branch list <appId>
```

Add `--json` for a machine-readable view:

```bash
buildprint branch list <appId> --json
```

### Create a branch

Create a new branch (a new Bubble app version) from an existing base branch. The `--from <version>` option is required and must name an editable, non-live branch such as `test` or `staging`. Branching from `live` is not allowed.

The new branch name is normalized: it is trimmed, lowercased, and spaces become hyphens.

Inside a branch workspace you can pass only the new branch name - the Bubble app ID is read from `app.json`:

```bash
buildprint branch create "feature-checkout" --from test
```

Outside a workspace, pass the Bubble app ID first, then the new branch name:

```bash
buildprint branch create <appId> "feature-checkout" --from test
buildprint branch create <appId> new-flow --from staging
```

Add an optional description, and use `--json` to print the full API response:

```bash
buildprint branch create "hotfix" --from test --description "urgent fix" --json
```

By default, when your current directory is inside the app's app root, Buildprint materializes and syncs a local worktree for the new branch. Pass `--no-workspace-sync` to skip that local materialize and sync. Note that `--json` also skips the local workspace materialize and sync.

## Merge

Merge one Bubble branch into another using Bubble's native merge flow. Pass the source branch (`<from>`) and the target branch (`<to>`) by name or ID. Run this from anywhere inside the app's workspace, since Buildprint reads the app ID from your local app root.

```bash
buildprint merge lemonb-820 staging
```

This merges the source branch into the target branch in Bubble. Bubble creates a temporary merge branch, and on a clean merge Buildprint finalizes and deletes it, then syncs your local target-branch workspace (if one exists) so it matches the merged result.

Add `--json` to print the merge result as JSON:

```bash
buildprint merge feature-a test --json
```

### Resolving conflicts

If the branches conflict, Buildprint leaves the temporary merge branch unfinalized and prints each conflict with its key, path, and the competing values from the target branch (`to`), the source branch (`from`), and the common ancestor. To finish the merge, run it again with a resolution for every conflict.

Resolve individual conflicts by key, choosing either `to` (keep the target branch value) or `from` (take the source branch value). Repeat `--resolve` for multiple conflicts:

```bash
buildprint merge feature-a test --resolve 0=from
```

Or resolve every conflict the same way at once:

```bash
buildprint merge feature-a test --resolve-all to
```
