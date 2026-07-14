# CLI: Exploring an app
> Source: https://docs.buildprint.ai/cli/exploring-an-app-kqt3e · Captured: 2026-07-14 (verbatim .md)

This guide covers reading and navigating a Bubble app with the Buildprint CLI: pulling a branch down, getting your bearings, drilling into specific pages and elements, and looking up reference material.

The typical flow is: clone a branch, get an overview with `summary` and `tree`, drill in with `context` and `find`, and reach for `schema`, `docs`, and `guidelines` when you need reference detail.

## Get oriented: `buildprint quickstart`

Run this first. It prints the Buildprint agent playbook - the workspace layout, the core commands, and the conventions the CLI expects you to follow - followed by the catalog of available guideline docs. It also tells you when your installed CLI is behind the latest npm release.

```bash
buildprint quickstart
buildprint quickstart | less
```

## Find and clone a project

An app root holds `.buildprint/app.json` and a bare `.buildprint/remote.git`. Each Bubble branch you clone becomes a sibling git worktree at `<app-root>/<branch>/`, which is where you edit files.

### `buildprint project list`

List the projects your linked CLI token can access.

```bash
buildprint project list
buildprint project list --json
```

`--json` prints the same fields as the text table (not the raw API payload).

### `buildprint project info <appId>`

Show details for a single Bubble app linked to your current token.

```bash
buildprint project info <appId>
buildprint project info <appId> --json
```

### `buildprint project clone <appId>`

Clone a Bubble branch into `<app-root>/<branch>/`. The default branch is `test` (Bubble's usual editable branch). The app root defaults to a directory named after the app ID; pass `--dir` to put it elsewhere. The branch workspace is always `<app-root>/<branch>/`.

```bash
buildprint project clone <appId>
buildprint project clone <appId> --branch feature-x
buildprint project clone <appId> --dir ./my-app
buildprint project clone <appId> --branch live && buildprint project clone <appId> --branch test
```

Options:

- `--branch <name>` - Bubble branch to clone. Defaults to `test`. Run `buildprint branch list <appId>` to see the available names.
- `--dir <path>` - override the app root directory. Defaults to `<appId>`.

You can clone several branches of the same app under one app root; each lands in its own `<app-root>/<branch>/` worktree. If a branch already has local history, `clone` reuses it and reminds you to run `buildprint sync` to pull the latest snapshot from Bubble.

After a clone, `cd` into the printed workspace path. The commands below all run from inside a branch workspace.

## List an app's branches

### `buildprint branch list <appId>`

Print the Bubble branch tree for an app - useful before cloning, or to confirm a branch name.

```bash
buildprint branch list <appId>
buildprint branch list <appId> --json
```

You can also inspect a single branch read-only. With no arguments inside a workspace it shows the current branch; otherwise pass a branch name (or the app ID and branch name from outside a workspace).

```bash
buildprint branch
buildprint branch staging
buildprint branch <appId> staging
```

Creating and merging branches is a write operation and lives with savepoints and branch workflows, not here.

## Get an overview: `buildprint summary`

Print a friendly summary of the top-level surfaces in the local branch: pages, mobile views, reusable elements, global elements, data types, option sets, styles, and API connector calls.

```bash
buildprint summary
buildprint summary --json
```

Each entry reads as `Friendly Name [Bubble id] (relative/file/path.json)`, so you can jump straight from a name to its file or feed the id and path into `context`, `tree`, or `find`.

## Inspect UI structure: `buildprint tree <target>`

Print the element tree for a page, mobile view, reusable, or element subtree as a YAML-like outline. It is the fastest way to understand how a screen is built.

The target can be a page or reusable folder key, a friendly name, or an element id.

```bash
buildprint tree home
buildprint tree home --include text,types,ids,paths
buildprint tree home --depth 2
buildprint tree myPage --cursor 250
```

Options:

- `--include <list>` - comma-separated list of what to show. Available primitives: `text`, `types`, `ids`, `paths`, `layout`, `design`, `properties`, `workflows`, `actions`. Default is `types,ids,layout`. Passing `actions` also turns on `workflows`.
- `--depth <n>` - maximum element depth from the target. `0` shows the target only.
- `--cursor <n>` - line offset for pagination. Pages are 250 lines; the output footer prints the next cursor when there is more to read.

## Drill into a node: `buildprint context <target>`

Show a single node and its relationships: what contains it and what it contains, what triggers it and what it triggers, what it references and what references it, and reusable instantiation links. For elements it also prints an ancestor-and-descendant tree.

The target can be a node id or a workspace JSON file path.

```bash
buildprint context page-home
buildprint context pages/home/elements/button/element.json
buildprint context wf-submit
```

Accepted targets include a workspace JSON file path (for example `pages/home/page.json`), a node directory (`pages/home/elements/button`), an exact node id (`page-home`, `wf-submit`), an exact app-json map key or logical path (`button`, `api.workflows.wf-submit`), or an exact page, reusable, mobile view, global element, element, workflow, or action name. When a name is ambiguous, use an exact id or file path; the command lists the candidate selectors so you can disambiguate.

## Resolve ids to files: `buildprint find <ids...>`

Resolve one or more Buildprint or Bubble ids to the workspace file paths that define or reference them. Pass several ids at once.

```bash
buildprint find page-home
buildprint find hero-id wf-submit action-0
buildprint find page-home --json
```

Each id prints the matching file path plus what was found there (kind, name, logical path, and location within the file). An id with no matches prints `not found`.

## Reference: schema, docs, and guidelines

### `buildprint schema [query...]`

Search Bubble's static schema - operators, elements and their properties, actions, triggers, types, and more. Provide a free-text query, one or more `--category` filters, or a context filter such as `--element-type`; at least one of those is required.

```bash
buildprint schema "append text"
buildprint schema --category actions
buildprint schema "count" --category operators --upstream-type list
buildprint schema --element-type Group --surface web_page
buildprint schema "api connector" --json
```

Options:

- `--category <category>` - restrict matches to one or more categories. Repeat the flag to combine. Categories: `operators`, `elements`, `element_properties`, `element_messages`, `workflows`, `types`, `data_types`, `option_sets`, `api_connector`, `api_connector_auth`, `actions`, `triggers`.
- `--limit <count>` - maximum number of results.
- `--upstream-type <value>`, `--element-type <value>`, `--action-type <value>`, `--workflow-type <value>`, `--data-type <value>`, `--owner-type <value>`, `--surface <value>` - narrow results to a specific context. Valid surfaces are `web_page`, `mobile_view`, `web_reusable`, and `mobile_reusable`.
- `--json` - print the raw JSON response.

### `buildprint docs <namespace> <query...>`

Read documentation from the CLI. The namespace picks the source; the remaining words are the query.

```bash
buildprint docs buildprint auth token
buildprint docs buildprint "how does version syncing work"
buildprint docs bubble
```

- `buildprint docs buildprint <query...>` searches the Buildprint docs. `--limit <count>` caps the number of results (default 5).
- `buildprint docs bubble` returns Bubble's `llms.txt` payload and curl guidance. It takes an optional query for parity with the buildprint namespace, but ignores it.

### `buildprint guidelines`

List and read Buildprint's guideline docs - the conventions the CLI expects you to follow when working in a workspace.

```bash
buildprint guidelines list
buildprint guidelines get
buildprint guidelines get general
buildprint guidelines get editing/apps schema/workflow
buildprint guidelines list --json
buildprint guidelines get testing/project-tests --json
```

- `buildprint guidelines list` prints the guideline path catalog with summaries. Add `--json` for machine-readable output.
- `buildprint guidelines get [paths...]` fetches one or more docs by path. With no path it returns `general`. Pass several paths to fetch them together, and add `--json` for structured output.
