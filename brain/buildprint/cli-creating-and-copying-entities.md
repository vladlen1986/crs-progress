# CLI: Creating and copying entities
> Source: https://docs.buildprint.ai/cli/creating-and-copying-entities-okkjn · Captured: 2026-07-14

Rather than manually writing JSON, use `buildprint new` to scaffold baseline code, `buildprint copy` to duplicate existing items, and `buildprint components` to manage reusable bundles.

Commands run from within a cloned branch workspace (`<app-root>/<branch>/`). All scaffolds and copies write only to that workspace until `apply` executes.

Scaffolds serve as starting points. After running a command, the system displays created files and prompts inspection and refinement. Once complete, validate with `buildprint check` and deploy using `buildprint apply`.

## Creating entities with `buildprint new`

`buildprint new` organizes scaffolding by entity type. Full list: `buildprint new --help`.

### Pages, mobile views, and reusables

These canvas roots share optional `--layout` parameters (`column`, `row`, or `fixed`) and `--copy` for cloning existing roots by id or name. These flags cannot combine.

```bash
buildprint new page --name "Dashboard"
buildprint new page --name "Dashboard Copy" --copy "Dashboard"
buildprint new mobile --name "Home"
buildprint new mobile --name "Home Copy" --copy "Home"
buildprint new reusable --name "Sidebar"
buildprint new reusable --name "Create Modal" --element-type Popup
buildprint new mobile_reusable --name "Bottom Tab Shell"
buildprint new mobile_reusable --name "Account Sheet" --element-type Sheet
```

- `--name <name>` is mandatory for all four commands.
- `reusable` and `mobile_reusable` accept `--element-type <type>` (such as `Group` or `Popup`; defaults to `Group`).
- `--copy` functions identically to `buildprint copy root` (below).

### Data types

```bash
buildprint new data_type --name "Project"
buildprint new data_type --name "Invoice" --field total:number --field owner:user
buildprint new data_type --name "Project API" --exposed-api --field status:option.project_status
```

- `--name <name>` (required) — display name.
- `--field <display:value>` — creates a field using `display:value` format (e.g. `title:text`, `owner:user`). Repeat for additional fields.
- `--exposed-api` — exposes the data type through the Data API.

### Option sets

```bash
buildprint new option_set --name "Project Status"
buildprint new option_set --name "Project Status" --value Open --value Closed
buildprint new option_set --name "Project Status" --value "In Progress:in_progress"
buildprint new option_set --name "Evidence Strength" --value High --value Moderate --attribute color:text --attribute threshold:number
```

- `--name <name>` (required) — display name.
- `--value <value>` — introduces an option. Plain labels like `Open` derive `db_value` automatically, or use `Display:db_value` (e.g. `In Progress:in_progress`) to set both. Repeat for multiple options.
- `--attribute <display:value>` — adds option attributes using `display:value` syntax (e.g. `color:text`, `threshold:number`). Repeat for additional attributes.

### Global expressions

```bash
buildprint new global-expression --name "Current User"
```

- `--name <name>` is required.

### Workflows

`buildprint new workflow` creates workflows under existing workflow owners (a page's `workflows` directory or the `api` root) and optionally within folders.

```bash
buildprint new workflow --path api --name "Use Tool" --type CustomEvent
buildprint new workflow --path api --folder "Tools" --name "Use Tool" --type CustomEvent --param toolCallName:text --param toolCallArguments:text --actions 2
buildprint new workflow --path api --name "Find User" --type CustomEvent --param email:text --returnParam user:user --actions 1
buildprint new workflow --path api --folder "Queue" --name "Queue Work" --type APIEvent --param "users:user[]?"
buildprint new workflow --path pages/home/workflows --name "Page Loaded" --type PageLoaded
buildprint new workflow --path pages/home/workflows/modals --name "Open Modal" --type ConditionTrue
```

- `--path <path>` (required) — workflow owner root or existing folder path. If already pointing at a folder, that destination is inferred.
- `--name <name>` (required) — workflow name.
- `--type <type>` (required) — workflow event type, e.g. `APIEvent`, `CustomEvent`, `ButtonClicked`, `ConditionTrue`.
- `--folder <folder>` — folder by raw key or display name. If omitted and `--path` references a folder, that folder becomes the destination.
- `--param <name:type>` — introduces a parameter. Names accept optional `[]` (list) and `?` (optional) suffixes; quote specs containing these symbols in shells like zsh. Repeat for multiple parameters.
- `--returnParam <name:type>` — adds a return value using identical `name:type` formatting. Available for `APIEvent` and `CustomEvent` workflows.
- `--actions <count>` — generates that many placeholder action files.

### Actions

`buildprint new action` appends an action to existing workflows. Use `--after` or `--before` to target positions.

```bash
buildprint new action --path api/my-workflow --type TriggerCustomEvent
buildprint new action --path api/tools/my-workflow --type ScheduleAPIEvent --name "Schedule audit event"
buildprint new action --path pages/home/workflows/load-page --after 1 --type HideElement
buildprint new action --path pages/home/workflows/modals/open-popup/workflow.json --before bpAction123 --type ShowElement
```

- `--path <path>` (required) — existing workflow directory or `workflow.json` path.
- `--type <type>` (required) — action type, e.g. `ChangeThing`, `TriggerCustomEvent`.
- `--name <name>` — optional action name.
- `--after <step-or-id>` — insert after a one-based step number or action id.
- `--before <step-or-id>` — insert before a one-based step number or action id.

`--after` and `--before` cannot coexist. Insertions fail when later steps reference earlier ones in a way reordering would break; errors identify affected files.

### Workflow folders

```bash
buildprint new folder --path api --name "Tools"
buildprint new folder --path pages/home/workflows --name "Modals"
```

- `--path <path>` (required) — workflow owner root, such as `api` or `pages/<page>/workflows`. Specify the owner root, not an existing folder.
- `--name <name>` (required) — folder display name.

### Local tests

`buildprint new test` and `buildprint new test-step` scaffold test definitions and append steps.

```bash
buildprint new test --name "Checkout"
buildprint new test --name "Checkout" --folder smoke
buildprint new test --component --name "Login"
buildprint new test-step --path tests/smoke/checkout.json --type test --instruction "Open checkout"
buildprint new test-step --path tests/smoke/checkout.json --type component --component login
```

For `buildprint new test`:

- `--name <name>` (required) — test or component display name.
- `--folder <key-or-name>` — organizes the test under a folder.
- `--component` — scaffolds a reusable test component instead of a standard test.

For `buildprint new test-step`:

- `--path <path>` (required) — the test JSON, e.g. `tests/smoke/checkout.json`.
- `--type <type>` (required) — `test`, `condition`, or `component`.
- `--component <key>` — component stable key (mandatory for `component` steps).
- `--parent <key>` — parent graph node key (defaults to the preceding step or start node).
- `--condition <outcome>` — condition parent outcome: `met` or `not_met`.
- `--instruction <text>`, `--details <text>`, `--tips <text>` — populate text for `test` and `condition` steps.
- `--on-failure <mode>` — failure behavior: `stop` or `continue` (default `stop`).

### Plugin workspaces

Plugin projects include dedicated scaffolds under `buildprint new plugin <command>` (e.g. `buildprint new plugin element`, `buildprint new plugin action`, `buildprint new plugin api-call`). Run `buildprint new plugin --help` for the complete list.

## Copying entities with `buildprint copy`

`buildprint copy` replicates existing roots, workflows, actions, or element subtrees. Every copy generates fresh ids, ensuring the new entity remains independent from its source.

```bash
buildprint copy root --kind page --source "Marketing Home" --name "Marketing Home Copy"
buildprint copy workflow --source api/tools/use-tool --path api --folder "Backups" --name "Use Tool Copy"
buildprint copy element --source pages/home/elements/sidebar --path pages/home
buildprint copy action --from api/tools/use-tool --source 0 --path pages/home/workflows/load-page --after 1
```

### `copy root`

Duplicates a page, mobile view, or reusable into a new root.

- `--kind <kind>` (required) — `page`, `mobile`, `reusable`, or `mobile_reusable`.
- `--source <source>` (required) — source root via id, raw key, or display name.
- `--name <name>` (required) — new root name.
- `--element-type <type>` — overrides the element type for reusable targets.

### `copy workflow`

Duplicates an existing workflow into another workflow owner or folder.

- `--source <path>` (required) — existing workflow directory or `workflow.json` path.
- `--path <path>` (required) — destination workflow owner root or folder path.
- `--folder <folder>` — destination folder by raw key or display name.
- `--name <name>` — overrides the copied workflow name.

### `copy element`

Duplicates an element subtree under a canvas root or another element.

- `--source <path>` (required) — existing element directory or `element.json` path.
- `--path <path>` (required) — destination canvas root or parent element path.

### `copy action`

Duplicates one or more actions from one workflow into another.

- `--from <path>` (required) — source workflow directory or `workflow.json` path.
- `--path <path>` (required) — destination workflow directory or `workflow.json` path.
- `--source <step-or-id>` — selects a source action by one-based step number or action id. Repeat to copy multiple actions.
- `--name <name>` — overrides the copied action name; permitted only when copying exactly one action.
- `--after <step-or-id>` / `--before <step-or-id>` — insert relative to an existing destination step or action id (cannot coexist).

As with `new action`, insertions fail when reordering would affect later steps holding positional previous-step references. Copying actions with external `PreviousStep` references also fails; copy the complete dependent chain or remove positional dependencies first.

## After creating or copying

Each `new` and `copy` command populates baseline files into the workspace and halts. Review the created content, complete any placeholder fields, then:

1. Run `buildprint check` to validate the workspace. Validation targets touched entities, exposing required fields and other issues.
2. Run `buildprint apply` to compile the diff into Bubble writes and push to the branch.
