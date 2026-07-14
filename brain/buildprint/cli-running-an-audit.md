# CLI: Running an audit
> Source: https://docs.buildprint.ai/cli/running-an-audit-k5hhw · Captured: 2026-07-14 (verbatim .md)

`buildprint audit` runs a security audit across your entire Bubble app workspace. It scans the shredded files of the current branch, looking for common Bubble security mistakes - public data types, unprotected backend workflows, public uploaders, leaked secrets, and more - and prints a ranked list of findings with concrete fixes.

An audit is a whole-app scan. This is different from `buildprint check`, which validates only the files you have changed (or the targets you name). Use `check` to confirm your edits are safe to apply; use `audit` to survey the security posture of the whole app.

## Usage

Run the command from inside a cloned branch workspace (the directory that holds your shredded `pages/`, `data_types/`, `api/`, and so on):

```bash
buildprint audit
```

Emit the findings as JSON instead of the human-readable report:

```bash
buildprint audit --json
```

The audit reads the current branch snapshot on disk. It does not sync, apply, or change anything - it only reports.

### Options

- `--json` - Emit audit findings as JSON instead of human-readable output.

## What the audit checks

The audit runs a fixed set of independent security checks over the workspace. Each check answers one security question and returns zero or more findings.

- **Public data types** (`public-data-types`) - Flags data types that have no privacy rules at all, or whose everyone role grants public read access (searching for records, viewing all records, viewing attachments, or exposing fields) without a condition. Publicly readable data is often unintended.
- **Public backend workflows** (`public-backend-workflows`) - Flags exposed API event workflows that have no workflow condition and no admin-only authentication. Being authenticated does not prove a caller is authorized to run the workflow.
- **Public uploaders** (`public-uploaders`) - Flags file and picture uploader elements that store uploaded files publicly instead of privately.
- **Frontend temporary passwords** (`frontend-temporary-passwords`) - Flags frontend workflows that assign a temporary password. If a later step references the result, the password can be exposed to the end user's client. These flows belong in a backend workflow.
- **Missed server-side redirects** (`missed-server-side-redirects`) - Flags page workflows that look like a redirect guard but will not run as a server-side redirect, so the protected page renders before redirecting. It explains exactly what blocks the server-side redirect (wrong event type, more than one active action, page data being sent, or non-static URL parameters).
- **Leaking secrets** (`leaking-secrets`) - Runs Gitleaks over the workspace to detect secrets committed into app files, such as API keys stored in the raw file instead of the API Connector or a plugin setting. This check requires the `gitleaks` executable to be installed locally; if it is not present, the check is skipped silently.

## Reading the report

Findings are sorted by severity, most serious first (`critical`, `high`, `medium`, `low`, `info`), then by file path.

Every finding is printed as a block:

```plaintext
data_types/user/type.json
  high [public-data-types] Data type has public read access
    Data type 'User' grants everyone access: users can find all records in searches, and can see all fields.
    Fix: Update the everyone privacy role so public users cannot search or view records unless intended...
```

Each block shows:

- **Path** - the workspace-relative file that owns the issue.
- **Severity, check id, and title** - for example `high [public-data-types] Data type has public read access`.
- **Message** - what Buildprint found and why it may be risky.
- **Fix** - concrete remediation steps.

The report ends with a summary line counting findings by severity, for example `2 high, 1 medium`.

If nothing is found, the report is:

```plaintext
No audit findings.
```

## JSON output

With `--json`, the command prints a single JSON object: the same advisory `message`, and a `results` array of findings. Each finding has `check`, `title`, `message`, `fix`, `severity`, and `path` fields. Use this when feeding audit results to another tool or agent.

```bash
buildprint audit --json
```

Audit findings are advisory. They are programmatic checks, not a verdict on whether the app is safe to release. Read each one in the context of your app's intended behavior and decide whether it needs a fix.
