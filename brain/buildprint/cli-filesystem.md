# CLI: Filesystem
> Source: https://docs.buildprint.ai/cli/filesystem-jn9sk · Captured: 2026-07-14

"Buildprint materialises a Bubble branch as a tree of small files you edit like code." When you run `buildprint apply`, the CLI reads those files, assembles them back into a Bubble app JSON, and sends the work to Bubble.

This reference documents the projected file tree: what each directory holds, how files are formatted, how entity IDs work, and what you should not touch. For the git-ref and worktree model behind a workspace, see [cli-workspaces.md](cli-workspaces.md).

## Why a file tree, not raw JSON

A Bubble app is one large JSON object. Direct editing creates unusable diffs, unmergeable conflicts, and no natural place for an agent to search and edit. Buildprint projects that JSON into one file per meaningful entity so that:

- Diffs stay small and local to the entity you changed.
- Standard git 3-way merge works during `sync`, because files are small and serialization is deterministic.
- You edit with the tools you already use (`read`, `grep`, `edit`) instead of JSON-path surgery.

"The projection is a normalized, editable representation, not a byte-faithful dump." Volatile and derived Bubble fields are stripped on the way in and re-derived on the way out.

## Layout inside a branch

Each Bubble branch is a git worktree at `<app-root>/<branch>/`:

```plaintext
<branch>/
  app.json                       # top-level app scalars only
  settings/
    client-safe.json             # Bubble settings minus keys lifted elsewhere
    api-connector/<plugin-id>/
      plugin.json
      calls/<call-id>.json
    translations/
      index.json                 # app-text ids -> label or true
      <language>.json            # full locale object for one language
  data_types/<type-id>/
    type.json                    # fields inline
  option_sets/<id>/
    option-set.json              # values inline, ordered by sort_factor
  styles/
    <Type>/<style-id>.json       # grouped by element type
    tokens.json                  # color tokens
    defaults.json                # default styles + default icon set
    fonts.json                   # font tokens + fonts
  pages/<page-id>/
    page.json                    # page props + root children: [...]
    elements/<map-key>/
      element.json               # props, type, style, states
      <child-map-key>/element.json
    workflows/<wf-id>/
      workflow.json              # trigger + meta + action ordering
      actions/<step>.json        # one file per editor step
  element-definitions/<id>/      # reusables, same shape as pages
  mobile-views/<id>/             # mobile screens, same shape as pages
  global-elements/<id>/          # shared surfaces, same shape as pages
  api/
    <folder-id>/
      config.json                # { "name": "Folder name" }
      <wf-id>/
        workflow.json
        actions/<step>.json
    <wf-id>/                     # backend workflow with no folder
      workflow.json
      actions/<step>.json
    pages/<page-id>/workflows/<folder-id>/
      config.json
      <wf-id>/
        workflow.json
        actions/<step>.json
  issues/<source-id>/<index>.json  # read-only Bubble issue checker output
```

### `app.json`

"Top-level app scalars only." Everything with its own identity (a page, a data type, a workflow) is lifted into its own directory, so this file stays small.

### `pages/`, `element-definitions/`, `mobile-views/`, `global-elements/`

The four element canvas roots. Each root gets a directory named by its id, holding a root file (`page.json`, or `reusable.json` for element definitions) plus an `elements/` tree and a `workflows/` tree.

Element folders mirror containment: if element B is a child of element A, B's folder sits inside A's folder. The folder name is the element's **map key** from the containing `elements` object, which is NOT the same as the element's internal `id` field (see "Element IDs and references").

"Page-level and reusable-level workflows live under `workflows/<wf-id>/`," with the trigger and metadata in `workflow.json` and one file per action in `actions/`. Action files are named by their one-based editor step number (`1.json`, `2.json`, ...); they assemble back to Bubble's raw zero-based action keys.

### `api/`

Backend (server-side) workflows, grouped into folders. A workflow that belongs to a Bubble folder lives under `<folder-id>/<wf-id>/`, with the folder's display name in a sibling `config.json`. A workflow with no folder sits directly at `api/<wf-id>/`. Page-scoped backend workflow folders appear under `api/pages/<page-id>/workflows/`.

### `data_types/`, `option_sets/`

One directory per data type or option set, each with a single file. Data type fields are inlined into `type.json`. Option set values are inlined into `option-set.json`, ordered by their `sort_factor`.

### `styles/`

Named styles grouped by the Bubble element type they apply to: `styles/<Type>/<style-id>.json`. The `type` value is not restated inside the file body; the directory name is the source of truth. Styles with no type land under a `__bp_no_type__/` sentinel directory. Three sibling files hold design tokens lifted out of the style body: `tokens.json` (colors), `defaults.json` (default styles and icon set), and `fonts.json` (fonts).

### `settings/`

`client-safe.json` holds Bubble app settings, minus the pieces lifted into their own trees. `api-connector/` holds one directory per API Connector plugin, with its calls split into separate files. `translations/` holds `index.json` (app text ids, each mapped to a label or Bubble's `true` marker) plus one `<language>.json` per locale.

### `issues/`

"A read-only projection of Bubble's own issue checker output, written during sync." Ignored on assemble; Bubble recomputes these entries itself, so edits here do nothing.

## Lifted fields: edit the layout, not the body

"Several Bubble fields are represented by directory structure rather than by a value in a file." Stripped on sync and re-derived from the tree on apply. To change one, move or rename the layout, not a JSON key:

- Style type: the `styles/<Type>/` directory a style file lives in.
- Workflow folder membership and folder name: the `api/<folder-id>/` directory and its `config.json`.
- Translation text ids and per-locale text: `settings/translations/index.json` and `<language>.json`.

The file body never restates a lifted field.

## Child element order: `children: []`

"Every element's file carries a `children` array listing its direct child map keys in display order:"

```json
{
  "type": "Group",
  "children": ["aBcDe", "fGhIj"]
}
```

`buildprint check` enforces that the set of subfolders under an element exactly equals the set of map keys in its `children` array. The array is the canonical local display-order manifest. To reorder children, reorder the array. Do NOT hand-edit `properties.order` or `properties.zindex` to reorder: those are real Bubble render-order fields, and Buildprint never synthesizes them when the source JSON did not already include them.

## Element IDs and references

"An element's folder name is its **map key** in the parent `elements` object." Its **internal** `id` lives inside `element.json` and is usually a different string (folder key `bTKHu` may hold an element whose `id` is `bTKHJ`).

Bubble cross-references such as workflow `element_id` targets, `ShowElement` / `HideElement` / `DisplayGroupData` actions, and `GetElement` expressions point at the internal `id`, not the folder key. Do not resolve a reference by grepping for a folder segment. Use `buildprint context <element-path-or-id-or-map-key>` for reference-aware lookup, and `buildprint tree` to see containment and effective visibility.

Bubble generates and owns these ids. New entities you create through the CLI get ids assigned for you; you do not mint them by hand.

## Canonical JSON format

"A single formatter is the only writer of these files, and every file is deterministic: the same app always produces the same bytes." That determinism is what makes `sync` mergeable. Rules:

- UTF-8, LF line endings, a trailing newline, 2-space indentation.
- No trailing whitespace, no carriage returns, no tabs.
- Object keys are alpha-sorted, matching how Bubble reads them.
- Integer-keyed maps (workflow `actions`, element `states`, `TextExpression.entries`) preserve their numeric order instead of being sorted, and sparse gaps are kept verbatim.

Write your edits and let the CLI reformat on the next round-trip; do not fight the formatter with hand-tuned spacing or key order.

### `_bp_` fields

Element layout carries a `_bp_layout` helper. "The `_bp_` prefix is reserved for Buildprint; do not author `_bp_*` keys yourself."

## What not to edit

- `.buildprint/` at the app root. Holds `app.json` (app id and token reference) and the shared bare git repo of Bubble snapshots. Buildprint-managed and excluded from your commits via the git local exclude file. Never edit or commit it.
- `issues/` inside the branch. Read-only issue checker; ignored on apply.

## Validating and applying

The file tree is not itself validated as you type. Run `buildprint check` to hydrate the changed scope and run the reference and structure rules, then `buildprint apply` to compile your edits to Bubble and apply them.
