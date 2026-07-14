# CLI: Creating and copying entities
> Source: https://docs.buildprint.ai/cli/creating-and-copying-entities-okkjn · Captured: 2026-07-14 (verbatim .md)

Buildprint materialises a Bubble branch as a shredded filesystem tree that you edit like code. Rather than hand-writing the JSON for a new page, data type, or workflow, use `buildprint new` to scaffold a valid baseline, `buildprint copy` to duplicate something that already exists, and `buildprint components` to package or install reusable component bundles (components have their own dedicated doc).

Run these commands from inside a cloned branch workspace (`<app-root>/<branch>/`). Every scaffold and copy writes files into that workspace only. Nothing is pushed to Bubble until you run `apply`.

Scaffolds are a starting point, not finished output. After a command runs it prints the files it created and reminds you to inspect and refine them. When you are done, validate the workspace with `buildprint check` and push the result with `buildprint apply`.

## Creating entities with `buildprint new`

`buildprint new` groups a scaffold command per entity type. Run `buildprint new --help` to list them all.

### Pages, mobile views, and reusables

Pages, mobile views, and reusables are canvas roots. Each shares an optional `--layout` (one of `column`, `row`, or `fixed`) and an optional `--copy` to clone an existing root by id or name. `--layout` cannot be combined with `--copy`.

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

- `--name <name>` is required for all four.
- `reusable` and `mobile_reusable` also accept `--element-type <type>` (for example `Group` or `Popup`; defaults to `Group`).

The `--copy` option on these commands is the same operation as `buildprint copy root`; see [Copying entities](#copying-entities-with-buildprint-copy) below.

### Data types

```bash
buildprint new data_type --name "Project"
buildprint new data_type --name "Invoice" --field total:number --field owner:user
buildprint new data_type --name "Project API" --exposed-api --field status:option.project_status
```

- `--name <name>` (required) sets the display name.
- `--field <display:value>` adds a field in `display:value` form (for example `title:text` or `owner:user`). Repeat the flag to add more than one field.
- `--exposed-api` marks the data type as exposed via the Data API.

### Option sets

```bash
buildprint new option_set --name "Project Status"
buildprint new option_set --name "Project Status" --value Open --value Closed
buildprint new option_set --name "Project Status" --value "In Progress:in_progress"
buildprint new option_set --name "Evidence Strength" --value High --value Moderate --attribute color:text --attribute threshold:number
```

- `--name <name>` (required) sets the display name.
- `--value <value>` adds an option. Pass a plain display label like `Open` to derive its `db_value` automatically, or `Display:db_value` (for example `In Progress:in_progress`) to set both explicitly. Repeat to add more options.
- `--attribute <display:value>` adds an option attribute in `display:value` form (for example `color:text` or `threshold:number`). Repeat to add more.

### Global expressions

```bash
buildprint new global-expression --name "Current User"
```

- `--name <name>` is required.

### Workflows

`buildprint new workflow` scaffolds a workflow under an existing workflow owner (a page's `workflows` directory or the `api` root) and, optionally, a folder within it.

```bash
buildprint new workflow --path api --name "Use Tool" --type CustomEvent
buildprint new workflow --path api --folder "Tools" --name "Use Tool" --type CustomEvent --param toolCallName:text --param toolCallArguments:text --actions 2
buildprint new workflow --path api --name "Find User" --type CustomEvent --param email:text --returnParam user:user --actions 1
buildprint new workflow --path api --folder "Queue" --name "Queue Work" --type APIEvent --param "users:user[]?"
buildprint new workflow --path pages/home/workflows --name "Page Loaded" --type PageLoaded
buildprint new workflow --path pages/home/workflows/modals --name "Open Modal" --type ConditionTrue
```

- `--path <path>` (required) is the workflow owner root or an existing workflow folder path. If it already points at a folder, that folder is inferred as the destination.
- `--name <name>` (required) is the workflow name.
- `--type <type>` (required) is the workflow event type, such as `APIEvent`, `CustomEvent`, `ButtonClicked`, or `ConditionTrue`.
- `--folder <folder>` places the workflow in a folder by raw key or display name. If omitted and `--path` already points at a folder, that folder is used.
- `--param <name:type>` adds a parameter. Names take optional `[]` (list) and `?` (optional) suffixes; quote specs containing `[]` or `?` in shells like zsh. Repeat to add more.
- `--returnParam <name:type>` adds a return value, using the same `name:type` form. Supported for `APIEvent` and `CustomEvent` workflows.
- `--actions <count>` creates that number of placeholder action files.

### Actions

`buildprint new action` adds an action to an existing workflow. By default the action is appended as the last step; use `--after` or `--before` to insert at a specific position.

```bash
buildprint new action --path api/my-workflow --type TriggerCustomEvent
buildprint new action --path api/tools/my-workflow --type ScheduleAPIEvent --name "Schedule audit event"
buildprint new action --path pages/home/workflows/load-page --after 1 --type HideElement
buildprint new action --path pages/home/workflows/modals/open-popup/workflow.json --before bpAction123 --type ShowElement
```

- `--path <path>` (required) is an existing workflow directory or `workflow.json` path.
- `--type <type>` (required) is the action type, such as `ChangeThing` or `TriggerCustomEvent`.
- `--name <name>` sets an optional action name.
- `--after <step-or-id>` inserts after an existing one-based step number or action id.
- `--before <step-or-id>` inserts before an existing one-based step number or action id.

`--after` and `--before` cannot be used together. Inserting is rejected when a later step holds a positional previous-step reference that reordering would break; the error lists the affected files so you can append instead.

### Workflow folders

```bash
buildprint new folder --path api --name "Tools"
buildprint new folder --path pages/home/workflows --name "Modals"
```

- `--path <path>` (required) is the workflow owner root, such as `api` or `pages/<page>/workflows`. Pass the owner root, not a folder that already exists.
- `--name <name>` (required) is the folder display name.

### Local tests

`buildprint new test` and `buildprint new test-step` scaffold local test definitions and append steps to them.

```bash
buildprint new test --name "Checkout"
buildprint new test --name "Checkout" --folder smoke
buildprint new test --component --name "Login"
buildprint new test-step --path tests/smoke/checkout.json --type test --instruction "Open checkout"
buildprint new test-step --path tests/smoke/checkout.json --type component --component login
```

`buildprint new test`:

- `--name <name>` (required) is the test or component display name.
- `--folder <key-or-name>` groups the test under a folder.
- `--component` creates a reusable test component instead of a test.

`buildprint new test-step`:

- `--path <path>` (required) is the test JSON path, such as `tests/smoke/checkout.json`.
- `--type <type>` (required) is `test`, `condition`, or `component`.
- `--component <key>` is the component stable key, required for `component` steps.
- `--parent <key>` is the parent graph node key (defaults to the previous step or the start node).
- `--condition <outcome>` is the condition parent outcome, `met` or `not_met`.
- `--instruction <text>`, `--details <text>`, and `--tips <text>` fill in text for `test` and `condition` steps.
- `--on-failure <mode>` is the failure behavior, `stop` or `continue` (default `stop`).

### Plugin workspaces

Plugin projects have their own scaffolds under `buildprint new plugin <command>` (for example `buildprint new plugin element`, `buildprint new plugin action`, and `buildprint new plugin api-call`). Run `buildprint new plugin --help` to list them. Plugin authoring is covered on its own page.

## Copying entities with `buildprint copy`

`buildprint copy` duplicates existing roots, workflows, actions, or element subtrees. Every copy mints fresh ids so the new entity is independent of its source (see [How ids are rewritten](#how-ids-are-rewritten)).

```bash
buildprint copy root --kind page --source "Marketing Home" --name "Marketing Home Copy"
buildprint copy workflow --source api/tools/use-tool --path api --folder "Backups" --name "Use Tool Copy"
buildprint copy element --source pages/home/elements/sidebar --path pages/home
buildprint copy action --from api/tools/use-tool --source 0 --path pages/home/workflows/load-page --after 1
```

### `copy root`

Copies a page, mobile view, or reusable into a new root.

- `--kind <kind>` (required) is the target kind: `page`, `mobile`, `reusable`, or `mobile_reusable`.
- `--source <source>` (required) is the source root id, raw key, or display name.
- `--name <name>` (required) is the new root name.
- `--element-type <type>` overrides the element type for reusable targets.

### `copy workflow`

Copies an existing workflow into another workflow owner or folder.

- `--source <path>` (required) is the existing workflow directory or `workflow.json` path.
- `--path <path>` (required) is the destination workflow owner root or workflow folder path.
- `--folder <folder>` is the destination folder raw key or display name.
- `--name <name>` overrides the copied workflow name.

### `copy element`

Copies an element subtree under a canvas root or another element.

- `--source <path>` (required) is the existing element directory or `element.json` path.
- `--path <path>` (required) is the destination canvas root or parent element path.

### `copy action`

Copies one or more actions from one workflow into another.

- `--from <path>` (required) is the source workflow directory or `workflow.json` path.
- `--path <path>` (required) is the destination workflow directory or `workflow.json` path.
- `--source <step-or-id>` selects a source action by one-based step number or action id. Repeat the flag to copy multiple actions.
- `--name <name>` overrides the copied action name, and is allowed only when copying exactly one action.
- `--after <step-or-id>` inserts after an existing destination step or action id.
- `--before <step-or-id>` inserts before an existing destination step or action id.

`--after` and `--before` cannot be used together. As with `new action`, an insert is rejected when it would reorder later steps that hold positional previous-step references. Copying an action whose `PreviousStep` reference points outside the copied set is also rejected, so copy the whole dependent chain or remove the positional dependency first.

## After creating or copying

Every `new` and `copy` command writes baseline files into the workspace and stops there. Inspect what it created, complete any fields it left as placeholders, then:

1. Run `buildprint check` to validate the workspace. Check is targeted at the entities you touched, so it is where required fields and other issues surface.
2. Run `buildprint apply` to compile the diff into Bubble writes and push it to your branch.
