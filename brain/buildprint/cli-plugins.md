# CLI: Plugins
> Source: https://docs.buildprint.ai/cli/plugins-koh83 · Captured: 2026-07-14

Buildprint integrates with Bubble plugins as distinct project types. Clone plugins into local workspaces, modify shredded files as code, upload built assets, save drafts via `buildprint apply`, and prepare handoff to plugin owners for publishing.

All plugin operations use the `plugin` command group:

```bash
buildprint plugin clone <pluginId>
buildprint plugin upload ./dist/widget.js
buildprint plugin publish -m "Release notes" --patch
```

## Prerequisites

- Authentication and linking are required.
- The Bubble plugin ID is necessary — found in the editor URL (`https://bubble.io/plugin_editor?id=<pluginId>`) or via `buildprint project list --json`.

## Clone a plugin

```bash
buildprint plugin clone <pluginId>
buildprint plugin clone <pluginId> --dir ./my-plugin
```

`clone` retrieves the current plugin draft from Bubble, converts it into a filesystem structure, and establishes a local workspace.

Parameters:

- `<pluginId>` (required) — Bubble's plugin identifier
- `--dir <path>` — alternate root directory; defaults to `<pluginId>`

The target directory must be empty or nonexistent. If it's already a Buildprint workspace, the command fails unless `--dir` redirects elsewhere.

### Workspace layout

```plaintext
<plugin-root>/
  .buildprint/          # workspace configuration and repository
  plugin/               # editable plugin worktree
    plugin.json         # core plugin metadata (includes editor_counter)
    meta.json           # plugin details (name, description, license)
    elements/           # element definitions
    actions/            # action definitions
    api/                # API call specifications
    assets.json         # asset upload references
```

References track the last synced state (`refs/bubble/plugin`) and applied commits (`refs/published/plugin`).

After cloning:

```bash
cd <plugin-root>/plugin
```

## Edit and check

Modify files, then validate:

```bash
buildprint check
```

`check` applies plugin-specific validation rules, including publication readiness assessments. Use `buildprint sync` to incorporate out-of-band editor modifications before proceeding.

## Upload an asset

```bash
buildprint plugin upload ./dist/widget.js
buildprint plugin upload ./logo.svg --name "logo.svg" --type image/svg+xml
```

Transfers a local file to Bubble and registers it in `assets.json`. Run from within the plugin worktree.

Parameters:

- `<file>` (required) — local file path
- `--name <asset name>` — storage name in `assets.json`; defaults to the filename
- `--type <mime>` — MIME type; inferred from extension if omitted

Constraints: file must exist, be non-empty, and remain under 5 MB. The generated key uses a `new_<slug>` format; duplicate keys require a different `--name`.

Asset recording is local only. Apply changes to persist to Bubble:

```bash
buildprint apply
```

## Draft save vs publish

- **Draft save** — `buildprint apply` compiles local modifications into Bubble changes and saves to the draft.
- **Publish a version** — a distinct, manual process. Plugin owners must submit versions through the editor; the CLI validates readiness and provides instructions.

## Prepare a publish

```bash
buildprint plugin publish -m "Release notes"
buildprint plugin publish -m "Fix rendering bug" --patch
buildprint plugin publish -m "Generate owner handoff despite warnings" --force
```

Execute from the plugin worktree. Validates readiness and outputs owner instructions.

Parameters:

- `-m, --description <description>` (required) — release message, maximum 120 characters
- `--major` / `--minor` / `--patch` — version update type (select at most one; mandatory for subsequent releases, first publications may omit it)
- `--force` — print handoff despite warnings

The command rejects execution if uncommitted or unapplied changes exist, if checks report errors, or (absent `--force`) if warnings surface. Success displays the editor link and owner steps: access the editor, select "Submit a new version," choose the release type, and enter the message. CLI publication is not possible.
