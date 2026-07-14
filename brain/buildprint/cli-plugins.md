# CLI: Plugins
> Source: https://docs.buildprint.ai/cli/plugins-koh83 · Captured: 2026-07-14 (verbatim .md)

Buildprint can work with Bubble plugins, not just apps. A plugin is its own project type: you clone it into a local workspace, edit the shredded files like code, upload built asset files, save the draft to Bubble with `buildprint apply`, and then hand the draft off to the plugin owner to publish a version in the Bubble editor.

Everything on this page runs through the `plugin` command group:

```bash
buildprint plugin clone <pluginId>
buildprint plugin upload ./dist/widget.js
buildprint plugin publish -m "Release notes" --patch
```

## Prerequisites

- You must be authenticated and linked. 
- You need the Bubble plugin ID. This is the ID Bubble uses for the plugin in its editor URL (`https://bubble.io/plugin_editor?id=<pluginId>`). It can also be found from `buildprint project list --json`.

## Clone a plugin

```bash
buildprint plugin clone <pluginId>
buildprint plugin clone <pluginId> --dir ./my-plugin
```

`clone` fetches the current plugin draft from Bubble, shreds it into a filesystem tree, and initializes a local plugin workspace.

- `<pluginId>` (required) - the Bubble plugin ID to clone.
- `--dir <path>` - override the plugin root directory. Defaults to `<pluginId>`.

The target directory must be empty (or not yet exist). If the directory is already a Buildprint app workspace, or already a workspace for a different plugin, clone stops and tells you to pass `--dir` to clone elsewhere.

### Workspace layout

A plugin root is a Buildprint workspace just like an app root: it holds the `.buildprint/` config and bare git repo, and the editable files live in a single sibling worktree named `plugin`:

```plaintext
<plugin-root>/
  .buildprint/          # workspace config and bare Bubble repo
  plugin/               # the editable plugin worktree
    plugin.json         # top-level plugin scalars (includes editor_counter)
    meta.json           # plugin metadata (name, description, license, ...)
    elements/           # plugin element definitions
    actions/            # plugin action definitions
    api/                # plugin API calls
    assets.json         # uploaded asset references (see upload)
```

`refs/bubble/plugin` tracks the last synced Bubble snapshot and `refs/published/plugin` tracks the last commit applied to Bubble, mirroring the app-branch model.

After a successful clone, `cd` into the `plugin/` worktree to work:

```bash
cd <plugin-root>/plugin
```

## Edit and check

Edit the shredded files like code, then validate before applying:

```bash
buildprint check
```

`check` understands the plugin workspace kind and runs the plugin rule set (including publish-readiness checks). If Bubble editor changes happened out of band, pull them in with `buildprint sync` before continuing - direct editor edits are invisible until you re-sync and get clobbered by the next apply.

## Upload an asset

```bash
buildprint plugin upload ./dist/widget.js
buildprint plugin upload ./logo.svg --name "logo.svg" --type image/svg+xml
```

`upload` sends a single local file to Bubble as a plugin asset and records a reference to it in `assets.json`. Run it from inside the plugin worktree.

- `<file>` (required) - the local file to upload.
- `--name <asset name>` - the asset name to store in `assets.json`. Defaults to the uploaded file's base name. Must be a plain file name, not a path.
- `--type <mime>` - the MIME type to send to Bubble. If omitted, it is inferred from the file extension, falling back to `application/octet-stream`.

Before uploading, the command formats changed JSON, runs the plugin checks, and verifies the local base is current against Bubble. The file must exist, be non-empty, and be under 5 MB. The generated asset key is a `new_<slug>` placeholder derived from the asset name; if `assets.json` already contains that key, choose a different `--name`.

Upload records the asset locally only. To actually save it into the Bubble plugin draft, apply your changes:

```bash
buildprint apply
```

If Bubble reports drift (`plugin_drift`), run `buildprint sync` and retry.

## Draft save vs publish

The two states are distinct and it matters:

- **Draft save** - `buildprint apply` compiles your local edits (element/action/API changes, uploaded assets) into Bubble `/write` changes and saves them to the plugin draft. This is the only thing apply does for plugins.
- **Publish a version** - a separate, explicit step. Bubble only lets the plugin owner submit a new published version from the plugin editor, so `buildprint plugin publish` does not publish for you. It validates that the draft is ready and prints the exact owner handoff instructions (editor link and release message).

## Prepare a publish

```bash
buildprint plugin publish -m "Release notes"
buildprint plugin publish -m "Fix rendering bug" --patch
buildprint plugin publish -m "Generate owner handoff despite warnings" --force
```

Run from inside the plugin worktree. `publish` checks readiness and then prints instructions for the plugin owner to submit a new version in the Bubble editor.

- `-m, --description <description>` (required) - the release description / message. Must be 120 characters or fewer.
- `--major` - prepare a major version.
- `--minor` - prepare a minor version.
- `--patch` - prepare a patch version.
- `--force` - print the owner handoff even when publish-readiness warnings are present. Bubble may mutate or reject the plugin.

Choose at most one of `--major`, `--minor`, or `--patch`. If the plugin already has a published version, an update type is required; for a plugin's first publish the type is optional.

`publish` refuses to run if the worktree has uncommitted or unapplied changes - apply first with `buildprint apply`. It also refuses if the plugin checks report errors, and (unless `--force`) if there are publish-readiness warnings. On success it prints the plugin editor link (`https://bubble.io/plugin_editor?id=<pluginId>&tab=tabs-6`) and steps for the owner: open the editor, click "Submit a new version", choose the release type, and paste your release message. No version can be published by the CLI itself.
