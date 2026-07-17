# CLI: Installation and authentication
> Source: https://docs.buildprint.ai/cli/installation-and-authentication-iwixh · Captured: 2026-07-14 (verbatim .md)

The Buildprint CLI turns a Bubble branch into a shredded filesystem tree you edit like code, then compiles those edits back into Bubble changes. This page covers installing the CLI, linking it to your Buildprint account, and the extra sign-ins you need for MCP clients and browser tests.

All Bubble work must go through the CLI. Direct edits in the Bubble editor are invisible until you re-sync and get clobbered by the next `apply`.

## Install the CLI

Install the CLI globally from npm:

```bash
npm install -g buildprint
```

You can also run it without a global install:

```bash
npx buildprint --help
```

Confirm the install and check your version:

```bash
buildprint --version
```

The CLI ships prebuilt binaries for macOS (arm64 and x64), Linux (arm64 and x64), and Windows (x64). Node 18 or newer is required.

## Update the CLI

Update to the latest published release:

```bash
buildprint update
```

If you are already on the newest version, `update` reports the current and latest versions and exits without reinstalling.

Check whether a newer version exists without installing it:

```bash
buildprint update --check
```

`--check` prints the current and latest versions and the install command. It exits with a non-zero status when an update is available, so you can use it in scripts.

You can always reinstall directly with npm:

```bash
npm install -g buildprint@latest
```

If your shell still runs the old version after updating, restart the terminal or run `hash -r`.

### Automatic daily updates

The CLI checks npm for a newer release at most once every 24 hours and installs it in the background when one is found. State is tracked in `~/.buildprint/update.json`. Auto-update never blocks or fails the command you actually ran - if the check or install fails, it tells you to run `buildprint update` for details and continues.

## Link the CLI to Buildprint

Authenticate the CLI by linking it to your Buildprint account with a CLI token.

1. In the Buildprint web app, go to **Integrations > CLI** and generate a CLI token.
2. Link the CLI with that token:

```bash
buildprint link <token>
```

On success the CLI greets you by name and lists the projects in the token's scope, plus a count of any other projects you can access that are not in scope.

Treat the CLI token like a password. Anyone with it can act on your Buildprint projects. If a token is lost or exposed, revoke it in the CLI integrations tab and generate a new one. If a token becomes invalid or is revoked, `buildprint link` tells you to generate a fresh one from **Integrations > CLI**.

## Start here: quickstart

Once linked, run `quickstart` first in any session. It prints the Buildprint agent playbook - workspace layout, the commands you will use, and the conventions the CLI expects - along with the guideline catalog.

```bash
buildprint quickstart
```

The playbook is long, so page it when you want to read the whole thing:

```bash
buildprint quickstart | less
```

`quickstart` also flags when your CLI is behind the latest npm release. For exploring a specific app after cloning it, see the exploring-an-app guide.

## Install the MCP server into an AI client

Install the Buildprint MCP server into your local AI clients so they can call Buildprint tooling directly. This creates an MCP token and writes the server config into each selected client.

```bash
buildprint mcp install --client opencode
```

Pass a comma-separated list to install into several clients at once, or `all` to target every supported client:

```bash
buildprint mcp install --client cursor,codex
buildprint mcp install --client all --dry-run
```

The supported clients are:

- `cursor`
- `codex`
- `claude-code`
- `claude-desktop`
- `opencode`
- `all` (every client above)

Useful options:

- `--name <serverName>` - name for the MCP server entry. Defaults to `buildprint`. Only letters, numbers, underscores, dots, and hyphens are allowed.
- `--token <token>` - use an existing MCP bearer token instead of creating a new one.
- `--dry-run` - preview the config files that would be written without creating a token or touching any files.
- `--json` - print machine-readable output.

You must be linked (`buildprint link`) before installing the MCP server, since the CLI mints the MCP token from your account.

## Log in as a Bubble user for browser tests

To drive a logged-in Bubble page in Agent Browser, sign in as a specific Bubble app user. This creates run-as-user cookies for the target branch workspace and installs them into Agent Browser.

```bash
buildprint login tester@example.com
```

Inside a cloned branch workspace the app and branch are inferred. Outside a workspace, provide them explicitly:

```bash
buildprint login tester@example.com --app nqu-audit --branch test
```

Options:

- `--app <app>` - Bubble app name.
- `--branch <branch>` - Bubble branch or version.
- `--version <version>` - alias for `--branch`.
- `--page <page>` - Bubble page to open after login. Defaults to `index`.
- `--session <name>` - Agent Browser session name to install the cookies into.
- `--no-browser` - create the cookies but do not install them into Agent Browser. The CLI prints the Agent Browser commands to run yourself.
- `--json` - print the response as JSON on stdout.

For example, to log in against a named branch and session:

```bash
buildprint login tester@example.com --app nqu-audit --version test --session nqu-audit
```

On success the CLI confirms Agent Browser is logged in, prints the page URL to open, the Bubble run-as-user login link, and any run-mode HTTP Basic Auth credentials. Before driving the logged-in browser, review the relevant guideline:

```bash
buildprint guidelines get browser/agent-browser
```
