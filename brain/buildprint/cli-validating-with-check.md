# CLI: Validating with check
> Source: https://docs.buildprint.ai/cli/validating-with-check-rrkys · Captured: 2026-07-14 (verbatim .md)

`buildprint check` validates your shredded workspace files before you push them back to Bubble. It reads the JSON files you have edited, runs Buildprint's issue checker against them, and reports any problems - missing required fields, malformed expressions, duplicate IDs, and other issues that would produce an invalid or rejected Bubble write.

## Checking changed files

The common case takes no arguments:

```bash
buildprint check
```

With no paths, `check` looks at the files that have changed since the last synced Bubble snapshot and validates only those. If nothing has changed, it reports `No changed files. No checks run.` and exits.

This is what you want almost every time. Because `check` scopes itself to your changes, it does not flood you with findings about parts of the app you never touched.

## Targeted scoping

`check` (and `apply`) operate on your changed files, not the whole app. A rule only runs against a file that is in scope - your changed files by default, or the explicit targets you name.

The practical consequence: a pre-existing Bubble violation on a page you have not touched will not be surfaced. Buildprint only flags a problem on a given page once your edits bring that page into scope. If you sync a snapshot that already contains, say, duplicate action IDs on a page, `check` stays quiet about that page until you edit something under it. There is no flag to force a whole-app scan.

For rules that need to compare against the previous state (for example, detecting a hard delete of a data type, or a container width change), `check` also hydrates the baseline version of the relevant changed files from the last synced snapshot, so the comparison is accurate. This happens automatically - you do not configure it.

## Checking a specific target

You can point `check` at an explicit file or directory instead of the changed-file set:

```bash
buildprint check pages/home/page.json
buildprint check pages/home/elements/card
```

A directory target includes every file beneath it. You can pass more than one path. If a target does not exist in the current branch workspace, `check` fails with an error naming the unmatched targets.

Explicit targets are usually unnecessary. In most cases, run `buildprint check` with no paths - it checks only your changed files and avoids unrelated findings. When you do pass paths, `check` reminds you of this at the end of a clean run.

## Reading the output

By default `check` prints human-readable output:

- If it normalized any changed JSON on disk before checking (rewriting files into Buildprint's canonical order and format, or updating layout sidecars), it lists those files under an "Autofixed" summary. This is expected and harmless - Buildprint rewrote your hand-edited files into the canonical authoring shape so they do not fail on whitespace or ordering alone.
- It then lists issues, each with a level: `error`, `warning`, or `info`.
- A progress line and final stats show how many checks ran clean, info, warning, or error.

If any issue is an `error`, `check` exits non-zero and prints `Check failed: errors present.` Warnings and info do not block. A clean run on your changed files ends with a reminder to run `buildprint apply`.

When an app check fails with expression errors, `check` also writes an artifact of schema-search hints into `.buildprint/outputs/` to help you find the correct field, operator, or element message. The path is printed in the output.

### Filtering output

Raise the minimum reported level to cut noise:

```bash
buildprint check --level warning --json
```

`--level` accepts `error`, `warning`, or `info` (default `info`). Levels below the threshold are hidden. `--json` emits the report as JSON instead of human-readable text - useful for scripting or feeding another tool.

### Running a single rule

Restrict the run to one rule or a rule family:

```bash
buildprint check --rule canonical-form
buildprint check --rule 'children-manifest/*'
```

`--rule <id>` matches either an exact rule id or a `prefix/*` glob that covers a whole family. Everything else is skipped.

## Check and apply in one step

To validate and, if there are no blocking errors, immediately apply:

```bash
buildprint check --auto-apply
```

`--auto-apply` runs the full check over your changed files and, only if the run returns no errors, applies the workspace to Bubble. If the check finds errors, nothing is applied.

`--auto-apply` requires the complete changed-file set and the full rule set, so it cannot be combined with:

- explicit paths
- `--rule`
- `--json`

Passing any of those alongside `--auto-apply` is a usage error.

## Flags

| Flag | Description |
| --- | --- |
| `[paths...]` | Only check these workspace-relative paths. Directories include all files beneath them. |
| `--auto-apply` | Apply the workspace automatically if this check run returns no blocking errors. |
| `--json` | Emit the check report as JSON instead of human-readable output. |
| `--rule <id>` | Only run rules whose id matches this string (exact match or `prefix/*`). |
| `--level <level>` | Minimum level to report: `error`, `warning`, or `info` (default: `info`). |
