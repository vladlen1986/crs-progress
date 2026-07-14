# CLI: Running an audit
> Source: https://docs.buildprint.ai/cli/running-an-audit-k5hhw · Captured: 2026-07-14

`buildprint audit` performs a security scan of your entire Bubble app workspace. It examines shredded files in the current branch to identify common security issues — public data types, unprotected backend workflows, public uploaders, exposed secrets, and more — returning findings ranked by severity with actionable remediation steps.

This differs from `buildprint check`, which validates only changed files. Use `check` to verify edits before applying; use `audit` to assess overall app security.

## Usage

Execute from within a cloned branch workspace containing your shredded directories (`pages/`, `data_types/`, `api/`, etc.):

```bash
buildprint audit
buildprint audit --json
```

The audit reads the current branch snapshot from disk. It performs no syncing, applying, or modifications — only reporting.

Options:

- `--json` — return audit findings in JSON format rather than human-readable output.

## What the audit checks

A fixed series of independent security checks; each addresses one security question and produces zero or more findings:

- **Public data types** (`public-data-types`) — data types lacking privacy rules or whose everyone role permits public read access (searching, viewing all records, viewing attachments, exposing fields) without conditions.
- **Public backend workflows** (`public-backend-workflows`) — exposed API event workflows without workflow conditions or admin-only authentication requirements.
- **Public uploaders** (`public-uploaders`) — file and picture uploader elements storing uploads publicly rather than privately.
- **Frontend temporary passwords** (`frontend-temporary-passwords`) — frontend workflows assigning temporary passwords where later steps could expose them to users.
- **Missed server-side redirects** (`missed-server-side-redirects`) — page workflows resembling redirect guards that fail to execute as server-side redirects, rendering protected pages before redirecting.
- **Leaking secrets** (`leaking-secrets`) — runs Gitleaks over the workspace detecting committed secrets like API keys in raw files rather than API Connector or plugin settings. Requires locally installed `gitleaks`; skipped silently if absent.

## Reading the report

Findings sort by severity (critical, high, medium, low, info) then by file path. Each finding displays as a block:

```plaintext
data_types/user/type.json
  high [public-data-types] Data type has public read access
    Data type 'User' grants everyone access: users can find all records in searches, and can see all fields.
    Fix: Update the everyone privacy role so public users cannot search or view records unless intended...
```

Each block contains:

- **Path** — workspace-relative file containing the issue.
- **Severity, check id, and title** — e.g. `high [public-data-types] Data type has public read access`.
- **Message** — findings and associated risk.
- **Fix** — concrete remediation guidance.

Reports conclude with a summary counting findings by severity, e.g. `2 high, 1 medium`. When no findings exist: `No audit findings.`

## JSON output

`--json` outputs a single JSON object containing the same advisory `message` and a `results` array of findings. Each finding includes `check`, `title`, `message`, `fix`, `severity`, and `path` fields — suitable for integration with external tools.

Audit findings are advisory recommendations rather than definitive safety assessments. Evaluate each finding against your app's intended design to determine whether remediation applies.
