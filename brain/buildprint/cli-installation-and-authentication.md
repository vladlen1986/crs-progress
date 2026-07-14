# CLI: Installation and authentication
> Source: https://docs.buildprint.ai/installation-and-authentication-iwixh · Captured: 2026-07-14

The Buildprint CLI converts Bubble branches into editable filesystem trees, then recompiles those changes back into Bubble modifications. This guide addresses CLI setup, account linking, and additional authentication for MCP clients and browser testing.

> "All Bubble work must go through the CLI. Direct edits in the Bubble editor are invisible until you re-sync"

## Install the CLI

Set up the CLI globally via npm:

```bash
npm install -g buildprint
```

Alternatively, run without global installation:

```bash
npx buildprint --help
```

Verify installation and version:

```bash
buildprint --version
```

Prebuilt binaries exist for macOS (arm64, x64), Linux (arm64, x64), and Windows (x64). Node 18+ is required.

## Update the CLI

Install the newest available release:

```bash
buildprint update
```

Check for updates without installing:

```bash
buildprint update --check
```

> "--check prints the current and latest versions and the install command"

Direct npm reinstall option:

```bash
npm install -g buildprint@latest
```

Restart your terminal or run `hash -r` if the shell continues running an older version.

### Automatic daily updates

The CLI polls npm once per 24-hour period (state tracked in `~/.buildprint/update.json`) and installs updates silently. Auto-updates never block active commands.

## Link the CLI to Buildprint

Authenticate via CLI token:

1. Navigate to **Integrations > CLI** in Buildprint and create a CLI token
2. Link with the token:

```bash
buildprint link <token>
```

> "Treat the CLI token like a password. Anyone with it can act on your Buildprint projects"

Revoke compromised tokens via the CLI integrations tab.

## Start here: quickstart

Run this first after linking:

```bash
buildprint quickstart
```

Page through longer output:

```bash
buildprint quickstart | less
```

This command displays workspace layout, available commands, CLI conventions, and guideline catalogs.

## Install the MCP server into an AI client

Deploy Buildprint MCP into local AI clients:

```bash
buildprint mcp install --client opencode
```

Install into multiple clients:

```bash
buildprint mcp install --client cursor,codex
buildprint mcp install --client all --dry-run
```

Supported clients: `cursor`, `codex`, `claude-code`, `claude-desktop`, `opencode`, `all`

Options:

- `--name <serverName>` — MCP server name (letters, numbers, underscores, dots, hyphens only)
- `--token <token>` — use existing MCP bearer token
- `--dry-run` — preview configuration without writing files
- `--json` — machine-readable output

Requirement: Complete `buildprint link` before installing the MCP server.

## Log in as a Bubble user for browser tests

Create run-as-user cookies for Agent Browser:

```bash
buildprint login tester@example.com
```

Outside a workspace, specify app and branch:

```bash
buildprint login tester@example.com --app nqu-audit --branch test
```

Options:

- `--app <app>` — Bubble app name
- `--branch <branch>` — Bubble branch or version
- `--version <version>` — alias for `--branch`
- `--page <page>` — Bubble page to open (defaults to `index`)
- `--session <name>` — Agent Browser session name
- `--no-browser` — create cookies without installing to Agent Browser
- `--json` — JSON output format

Example with named branch and session:

```bash
buildprint login tester@example.com --app nqu-audit --version test --session nqu-audit
```

On success, the CLI displays Agent Browser login confirmation, page URL, Bubble run-as-user login link, and HTTP Basic Auth credentials.
