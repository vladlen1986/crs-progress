# CLI: Validating with check
> Source: https://docs.buildprint.ai/cli/validating-with-check-rrkys · Captured: 2026-07-14

`buildprint check` validates shredded workspace files before pushing to Bubble. It processes JSON files, runs issue detection, and reports problems like missing fields, malformed expressions, duplicate IDs, and other issues that would cause invalid or rejected Bubble writes.

## Checking changed files

Standard usage requires no arguments:

```bash
buildprint check
```

Without specified paths, `check` examines files modified since the last synced Bubble snapshot and validates only those files. If no changes exist, it outputs "No changed files. No checks run." and terminates.

This is the recommended approach — limiting scope to your modifications avoids reporting findings about untouched app sections.

## Targeted scoping

Both `check` and `apply` focus on your changed files rather than the entire application. Rules only execute against files within scope — your changed files by default, or named explicit targets.

Practical implication: pre-existing Bubble violations on unchanged pages remain unreported. Buildprint surfaces issues only after your edits bring that page into scope. If a synced snapshot contains duplicate action IDs on an unmodified page, `check` stays silent until you edit something beneath it. **No flag exists for forcing full-app scans.**

For rules comparing against previous state (detecting hard-deleted data types, container width changes), `check` automatically hydrates the baseline version from the last synced snapshot for accurate comparison.

## Checking a specific target

Direct `check` toward explicit files or directories:

```bash
buildprint check pages/home/page.json
buildprint check pages/home/elements/card
```

Directory targets include all files beneath them. Multiple paths are supported. If a target doesn't exist in the current branch workspace, `check` fails with an error identifying unmatched targets.

Explicit targets are typically unnecessary — usually run `buildprint check` without paths to check only changed files and avoid unrelated findings.

## Reading the output

By default, `check` prints human-readable output:

- If it normalized changed JSON on disk before checking (rewriting files into Buildprint's canonical order and format, or updating layout sidecars), it lists those files under an "Autofixed" summary. This is expected and harmless.
- It then lists issues, each with a level: `error`, `warning`, or `info`.
- A progress line and final stats show how many checks ran clean, info, warning, or error.

If any issue is an `error`, `check` exits non-zero and prints "Check failed: errors present." Warnings and info don't block. A clean run on changed files ends with a reminder to execute `buildprint apply`.

When an app check fails with expression errors, `check` writes a schema-search hints artifact into `.buildprint/outputs/` to help locate the correct field, operator, or element message. The path appears in the output.

### Filtering output

```bash
buildprint check --level warning --json
```

`--level` accepts `error`, `warning`, or `info` (default `info`). Levels below the threshold are hidden. `--json` emits the report as JSON — useful for scripting.

### Running a single rule

```bash
buildprint check --rule canonical-form
buildprint check --rule 'children-manifest/*'
```

`--rule <id>` matches either an exact rule id or a `prefix/*` glob covering a whole family. Everything else is skipped.

## Check and apply in one step

```bash
buildprint check --auto-apply
```

`--auto-apply` runs the full check over changed files and, only if returning no errors, applies the workspace to Bubble. If the check detects errors, nothing is applied.

`--auto-apply` requires the complete changed-file set and full rule set, so it cannot be combined with explicit paths, `--rule`, or `--json` (a usage error).

## Flags

| Flag | Description |
| --- | --- |
| `[paths...]` | Only check these workspace-relative paths. Directories include all files beneath them. |
| `--auto-apply` | Apply the workspace automatically if this check run returns no blocking errors. |
| `--json` | Emit the check report as JSON instead of human-readable output. |
| `--rule <id>` | Only run rules whose id matches this string (exact match or `prefix/*`). |
| `--level <level>` | Minimum level to report: `error`, `warning`, or `info` (default: `info`). |
