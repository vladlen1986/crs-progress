# CLI: Savepoints and branches
> Source: https://docs.buildprint.ai/cli/savepoints-and-branches-1arhv · Captured: 2026-07-14

Savepoints and branches are "two different ways to manage the history and structure of a Bubble app."

- A **savepoint** is "a Bubble editor savepoint - a restore point that Bubble keeps for a single branch."
- A **branch** is "an editable Bubble app version (like `test`, `staging`, or a feature branch)."

"All three command groups on this page (`savepoint`, `branch`, `merge`) act on the real Bubble app through the CLI."

## Savepoints

Savepoint commands operate on "the branch of your current workspace, so run them from inside a cloned branch worktree."

Create a savepoint:

```bash
buildprint savepoint create "before refactor"
```

List savepoints (use `--json` for structured output):

```bash
buildprint savepoint list
```

Restore a savepoint:

```bash
buildprint savepoint restore 1745068712345
```

After restoration, "run `buildprint sync` to pull the restored snapshot into your local workspace."

## Branches

Branch commands allow inspection, listing, and creation of editable Bubble app versions.

Inspect a branch:

```bash
buildprint branch
buildprint branch staging
buildprint branch <appId> staging
```

List branches:

```bash
buildprint branch list <appId>
```

Create a branch:

```bash
buildprint branch create "feature-checkout" --from test
buildprint branch create <appId> "feature-checkout" --from test
buildprint branch create "hotfix" --from test --description "urgent fix" --json
```

The `--from` option is "required and must name an editable, non-live branch."

## Merge

```bash
buildprint merge lemonb-820 staging
buildprint merge feature-a test --json
```

Resolving conflicts:

```bash
buildprint merge feature-a test --resolve 0=from
buildprint merge feature-a test --resolve-all to
```
