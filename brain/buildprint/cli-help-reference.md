# CLI help reference (as-shipped `--help` dump)
> Source: `buildprint <command> --help`, CLI v4.2.6 · Captured: 2026-07-17 (verbatim)

Authoritative flag-level reference straight from the installed binary — newer than the docs-site CLI pages when they conflict (the CLI auto-updates). Two levels: every top-level command plus each of its subcommands.

## buildprint

```
Usage: buildprint [options] [command]

Buildprint CLI - agent-first development environment for Bubble apps

Options:
  -V, --version                                      output the version number
  -h, --help                                         display help for command

Commands:
  link [options] [token]                             Link the CLI to Buildprint
  login [options] <email>                            Authenticate Agent Browser as a Bubble app user
  new                                                Create new workspace scaffolds
  quickstart                                         Print the Buildprint agent playbook (workspace layout, commands, conventions)
  guidelines                                         List or read Buildprint guideline docs
  project                                            List, inspect, or clone linked Buildprint projects
  versions|version                                   List synced Buildprint version history and restore older snapshots
  plugin                                             Work with Bubble plugin workspaces (example: buildprint plugin clone <pluginId>)
  plugins                                            List connected Bubble plugins
  docs                                               Read Buildprint or Bubble documentation from the CLI
  components|component                               Discover, package, and unpack reusable Buildprint components
  savepoint                                          Create, list, and restore Bubble editor savepoints for the current workspace branch
  secret                                             Fetch Bubble private parameter values through Buildprint
  test-user                                          Manage Buildprint test users for the current workspace app
  schema [options] [query...]                        Search Bubble's static schema for help
  screenshot [options] <path-or-email> [path]        Capture a full-page Bubble app screenshot
  sync [options]                                     Fetch a Bubble snapshot and merge it into the workspace
  merge [options] <from> <to>                        Merge one Bubble branch into another using Bubble's native merge flow
  migrate                                            Run local Buildprint workspace projection migrations
  mcp                                                Manage Buildprint MCP client integrations
  migration                                          Manage semi-automated Bubble → code migrations
  check [options] [paths...]                         Validate changed workspace files before applying changes, or target specific files and directories explicitly
  changelog [options] <sourceBranch> <targetBranch>  Create a readable local changelog between two Buildprint branch workspaces
  find [options] <ids...>                            Resolve one or more Buildprint/Bubble ids to workspace file paths
  audit [options]                                    Run security audit checks against the current Bubble app workspace
  apply [options] [appId] [branch]                   Push local workspace changes to Bubble. Requires a successful full `buildprint check` for the current workspace state unless --force-apply is used. Runs the internal check again by default and auto-commits unapplied edits before applying.
  context <target>                                   Show context and relationships for a node id or workspace file path, including containment, references, and trigger relationships
  copy                                               Copy existing roots, workflows, actions, or element subtrees
  file                                               List, search, upload, and delete Bubble file manager files
  data                                               Read and write Bubble database records through Buildprint
  summary [options]                                  Print a friendly summary of local pages, reusables, data types, option sets, styles, and other top-level app surfaces
  tree [options] <target>                            Print element tree for page, mobile view, reusable, or element subtree, useful for understanding UI structure
  update [options]                                   Update the globally installed Buildprint CLI from npm
  utils                                              Utility commands for scripting
  branch [options] [appIdOrBranch] [branch]          Inspect, list, or create Bubble app branches
  help [command]                                     display help for command

Examples:
  buildprint link <token>
  buildprint login tester@example.com
  buildprint quickstart
  buildprint new workflow --path api --name "Use Tool" --type CustomEvent
  buildprint guidelines list
  buildprint guidelines get general
  buildprint project list
  buildprint project info <appId>
  buildprint project clone <appId>
  buildprint versions list <appId> --branch staging
  buildprint plugins list
  buildprint plugin clone <pluginId>
  buildprint data search '{"type":"custom.project","constraints":[],"n":5}'
  buildprint data fetch '["1778930231900x601786091393582200"]'
  buildprint docs buildprint auth token
  buildprint docs bubble
  buildprint components package
  buildprint savepoint create "before refactor"
  buildprint savepoint list
  buildprint secret get settings/secure/apiconnector2/<groupId>/calls/<callId>/headers/<rowId>
  buildprint screenshot "/"
  buildprint screenshot tester@example.com "/dashboard?tab=settings"
  buildprint test-user list
  buildprint test-user create --name "Test customer" --database test --email tester@example.com
  buildprint test-user update t17... --database test
  buildprint schema "append text"
  buildprint schema --category actions
  buildprint sync
  buildprint merge <from> <to>
  buildprint migrate workflow-action-steps
  buildprint mcp install --client opencode
  buildprint check
  buildprint changelog staging feature-x
  buildprint find page-home hero-id
  buildprint file list --version test
  buildprint file upload ./document.pdf --version test
  buildprint check pages/home/elements/card
  buildprint check --auto-apply
  buildprint audit
  buildprint apply
  buildprint context <node-id-or-file-path>
  buildprint summary
  buildprint tree <target>
  buildprint update --check
  buildprint update
  buildprint utils generate-ids 12
  buildprint utils generate-ids 20
  buildprint branch
  buildprint branch list <appId>
  buildprint branch create "feature-name" --from staging
  buildprint migration create <slug> --name "<App Name>" --app <appId>
  buildprint migration list
  buildprint migration info <slug>
```

## buildprint link

```
Usage: buildprint link [options] [token]

Link the CLI to Buildprint

Arguments:
  token       CLI token generated from the Buildprint CLI integrations tab

Options:
  -h, --help  display help for command

Examples:
  buildprint link <token>
```

## buildprint login

```
Usage: buildprint login [options] <email>

Authenticate Agent Browser as a Bubble app user

Arguments:
  email                Bubble user email to run as

Options:
  --app <app>          Bubble app name
  --branch <branch>    Bubble branch/version
  --version <version>  Alias for --branch
  --page <page>        Bubble page to open after login (default: "index")
  --json               Print response as JSON on stdout
  --no-browser         Do not install cookies into Agent Browser
  --session <name>     Agent Browser session name
  -h, --help           display help for command

Examples:
  buildprint login tester@example.com
  buildprint login tester@example.com --app nqu-audit --branch test
  buildprint login tester@example.com --app nqu-audit --version test --session nqu-audit
  buildprint login tester@example.com --no-browser

Review the relevant guideline first:
  buildprint guidelines get browser/agent-browser   (drive the logged-in browser)
```

## buildprint new

```
Usage: buildprint new [options] [command]

Create new workspace scaffolds

Options:
  -h, --help                   display help for command

Commands:
  page [options]               Create a new page
  data_type [options]          Create a new data type
  option_set [options]         Create a new option set
  global-expression [options]  Create a new global expression
  reusable [options]           Create a new reusable
  mobile_reusable [options]    Create a new mobile reusable
  mobile [options]             Create a new mobile view
  workflow [options]           Create a new workflow scaffold under an existing
                               workflow owner root
  action [options]             Create a new action under an existing workflow
  folder [options]             Create a workflow folder under an existing
                               workflow owner root
  test [options]               Create a new local test or reusable test
                               component
  test-step [options]          Append a step to a local test definition file
  plugin                       Create new Bubble plugin scaffolds
  help [command]               display help for command

App workspaces:
  buildprint new page --name "Dashboard"
  buildprint new data_type --name "Project" --field title:text
  buildprint new option_set --name "Project Status" --value Open --value Closed
  buildprint new global-expression --name "Current User"
  buildprint new reusable --name "Sidebar"
  buildprint new mobile_reusable --name "Mobile Card"
  buildprint new mobile --name "Home"
  buildprint new workflow --path api --name "Use Tool" --type CustomEvent
  buildprint new action --path api/tools/use-tool --type TriggerCustomEvent
  buildprint new folder --path api --name "Tools"
  buildprint new test --name "Checkout" --folder smoke
  buildprint new test-step --path tests/smoke/checkout.json --type test

Plugin workspaces:
  buildprint new plugin <command>
  buildprint new plugin element --name "Audio Recorder"
  buildprint new plugin action --name "Generate JWT" --type server_side
  buildprint new plugin api-call --name "Get document" --method get --url "https://api.example.com/docs/[document_id]"

Shared/help:
  buildprint new --help
  buildprint new plugin --help
```

### buildprint new page

```
Usage: buildprint new page [options]

Create a new page

Options:
  --name <name>                       Page name
  --layout <layout>                   Canvas root layout: column, row, or fixed
  --copy <page-or-mobile-id-or-name>  Copy an existing page or mobile view by id
                                      or name
  -h, --help                          display help for command

Examples:
  buildprint new page --name "Dashboard"
  buildprint new page --name "Dashboard Copy" --copy "Dashboard"
```

### buildprint new data_type

```
Usage: buildprint new data_type [options]

Create a new data type

Options:
  --name <name>            Data type display name
  --field <display:value>  Field definition in display:value form, such as
                           title:text or owner:user (default: [])
  --exposed-api            Mark the data type as exposed to the API
  -h, --help               display help for command

Examples:
  buildprint new data_type --name "Project"
  buildprint new data_type --name "Invoice" --field total:number --field owner:user
  buildprint new data_type --name "Project API" --exposed-api --field status:option.project_status
```

### buildprint new option_set

```
Usage: buildprint new option_set [options]

Create a new option set

Options:
  --name <name>            Option set display name
  --value <value>          Add an option value. Use "Open" to derive db_value
                           automatically, or "In Progress:in_progress" to set
                           display and db_value explicitly. (default: [])
  --attribute <attribute>  Add an option attribute in display:value form, such
                           as color:text or threshold:number (default: [])
  -h, --help               display help for command

Examples:
  buildprint new option_set --name "Project Status"
  buildprint new option_set --name "Project Status" --value Open --value Closed
  buildprint new option_set --name "Project Status" --value "In Progress:in_progress"
  buildprint new option_set --name "Evidence Strength" --value High --value Moderate --attribute color:text --attribute threshold:number
```

### buildprint new global-expression

```
Usage: buildprint new global-expression [options]

Create a new global expression

Options:
  --name <name>  Global expression name
  -h, --help     display help for command

Examples:
  buildprint new global-expression --name "Current User"
```

### buildprint new reusable

```
Usage: buildprint new reusable [options]

Create a new reusable

Options:
  --name <name>                 Reusable name
  --element-type <type>         Reusable element type such as Group or Popup
  --layout <layout>             Canvas root layout: column, row, or fixed
  --copy <reusable-id-or-name>  Copy an existing reusable by id or name
  -h, --help                    display help for command

Examples:
  buildprint new reusable --name "Sidebar"
  buildprint new reusable --name "Create Modal" --element-type Popup
  buildprint new reusable --name "Sidebar Copy" --copy "Sidebar"
```

### buildprint new mobile_reusable

```
Usage: buildprint new mobile_reusable [options]

Create a new mobile reusable

Options:
  --name <name>                 Mobile reusable name
  --element-type <type>         Reusable element type such as Group or Sheet
  --layout <layout>             Canvas root layout: column, row, or fixed
  --copy <reusable-id-or-name>  Copy an existing reusable by id or name
  -h, --help                    display help for command

Examples:
  buildprint new mobile_reusable --name "Bottom Tab Shell"
  buildprint new mobile_reusable --name "Account Sheet" --element-type Sheet
  buildprint new mobile_reusable --name "Sidebar Mobile" --copy "Sidebar"
```

### buildprint new mobile

```
Usage: buildprint new mobile [options]

Create a new mobile view

Options:
  --name <name>                       Mobile view name
  --layout <layout>                   Canvas root layout: column, row, or fixed
  --copy <page-or-mobile-id-or-name>  Copy an existing page or mobile view by id
                                      or name
  -h, --help                          display help for command

Examples:
  buildprint new mobile --name "Home"
  buildprint new mobile --name "Home Copy" --copy "Home"
```

### buildprint new workflow

```
Usage: buildprint new workflow [options]

Create a new workflow scaffold under an existing workflow owner root

Options:
  --path <path>          Workflow owner root or existing workflow folder path
  --name <name>          Workflow name
  --type <type>          Workflow event type such as APIEvent, CustomEvent,
                         ButtonClicked, or ConditionTrue
  --folder <folder>      Workflow folder raw key or display name. If omitted and
                         --path already points at a folder, that folder is
                         inferred.
  --param <param>        Parameter definition in name:type form, with optional
                         [] and ? suffixes. Quote specs containing [] or ? in
                         shells like zsh. (default: [])
  --returnParam <param>  Return value definition in name:type form, with
                         optional [] and ? suffixes. Supported for APIEvent and
                         CustomEvent. (default: [])
  --actions <count>      Number of placeholder action files to create
  -h, --help             display help for command

Examples:
  buildprint new workflow --path api --name "Use Tool" --type CustomEvent
  buildprint new workflow --path api --folder "Tools" --name "Use Tool" --type CustomEvent --param toolCallName:text --param toolCallArguments:text --actions 2
  buildprint new workflow --path api --name "Find User" --type CustomEvent --param email:text --returnParam user:user --actions 1
  buildprint new workflow --path api --folder "Queue" --name "Queue Work" --type APIEvent --param "users:user[]?"
  buildprint new workflow --path api --name "Lookup User" --type APIEvent --param email:text --returnParam user:user
  buildprint new workflow --path pages/home/workflows --name "Page Loaded" --type PageLoaded
  buildprint new workflow --path pages/home/workflows/modals --name "Open Modal" --type ConditionTrue
```

### buildprint new action

```
Usage: buildprint new action [options]

Create a new action under an existing workflow

Options:
  --path <path>          Existing workflow directory or workflow.json path
  --type <type>          Action type such as ChangeThing or TriggerCustomEvent
  --name <name>          Optional action name
  --after <step-or-id>   Insert after an existing one-based step number or
                         action id
  --before <step-or-id>  Insert before an existing one-based step number or
                         action id
  -h, --help             display help for command

Examples:
  buildprint new action --path api/my-workflow --type TriggerCustomEvent
  buildprint new action --path api/tools/my-workflow --type ScheduleAPIEvent --name "Schedule audit event"
  buildprint new action --path pages/home/workflows/load-page --after 1 --type HideElement
  buildprint new action --path pages/home/workflows/modals/open-popup/workflow.json --before bpAction123 --type ShowElement
```

### buildprint new folder

```
Usage: buildprint new folder [options]

Create a workflow folder under an existing workflow owner root

Options:
  --path <path>  Workflow owner root such as api or pages/<page>/workflows
  --name <name>  Workflow folder display name
  -h, --help     display help for command

Examples:
  buildprint new folder --path api --name "Tools"
  buildprint new folder --path pages/home/workflows --name "Modals"
```

### buildprint new test

```
Usage: buildprint new test [options]

Create a new local test or reusable test component

Options:
  --name <name>           Test or component display name
  --folder <key-or-name>  Folder key or display name for this test
  --component             Create a reusable test component
  -h, --help              display help for command

Examples:
  buildprint new test --name "Checkout"
  buildprint new test --name "Checkout" --folder smoke
  buildprint new test --component --name "Login"
```

### buildprint new test-step

```
Usage: buildprint new test-step [options]

Append a step to a local test definition file

Options:
  --path <path>          Test JSON path, such as tests/smoke/checkout.json
  --type <type>          Step type: test, condition, or component
  --component <key>      Component stable key for component steps
  --parent <key>         Parent graph node key (default: previous step or start)
  --condition <outcome>  Condition parent outcome: met or not_met
  --instruction <text>   Instruction text for test or condition steps
  --details <text>       Optional details for test or condition steps
  --tips <text>          Optional tips for test or condition steps
  --on-failure <mode>    Failure behavior: stop or continue (default: "stop")
  -h, --help             display help for command

Examples:
  buildprint new test-step --path tests/smoke/checkout.json --type test --instruction "Open checkout"
  buildprint new test-step --path tests/smoke/checkout.json --type component --component login
```

### buildprint new plugin

```
Usage: buildprint new plugin [options] [command]

Create new Bubble plugin scaffolds

Options:
  -h, --help                display help for command

Commands:
  element [options]         Create a plugin element
  field [options]           Add a field to an element, element action, or
                            standalone action
  state [options]           Add an exposed state to a plugin element
  event [options]           Add an event to a plugin element
  element-action [options]  Create an action on a plugin element
  action [options]          Create a standalone plugin action
  return-value [options]    Add a return value to a standalone plugin action
  api-service [options]     Create or update the plugin API service
  api-call [options]        Create a plugin API call
  api-header [options]      Add a header row to a plugin API call
  api-param [options]       Add a general/query parameter row to a plugin API
                            call
  api-body-param [options]  Add a body parameter row to a plugin API call
  shared-key [options]      Add a plugin shared key
  header-param [options]    Add a guarded HTML header parameter
  help [command]            display help for command

Examples:
  buildprint new plugin element --name "Audio Recorder"
  buildprint new plugin field --path elements/Audio-Recorder-new_audio_recorder/element.json --name label --caption "Label" --editor DynamicValue --value text
  buildprint new plugin state --element elements/Audio-Recorder-new_audio_recorder --name recording --caption "Recording" --value boolean
  buildprint new plugin event --element elements/Audio-Recorder-new_audio_recorder --name uploaded --caption "Uploaded"
  buildprint new plugin element-action --element elements/Audio-Recorder-new_audio_recorder --name "Start"
  buildprint new plugin action --name "Generate JWT" --type server_side
  buildprint new plugin return-value --action "Generate JWT" --name jwt_key --caption "JWT key" --value text
  buildprint new plugin api-service --name "Frames" --auth none
  buildprint new plugin api-call --name "Get document" --method get --url "https://api.example.com/docs/[document_id]"
  buildprint new plugin api-header --call "Get document" --key Authorization --private
  buildprint new plugin api-param --call "Get document" --key limit --value 10 --allow-blank
  buildprint new plugin api-body-param --call "Create document" --key title --value "Test document"
  buildprint new plugin shared-key --caption "API Key" --type secure
  buildprint new plugin header-param --marker public_key --key "Public key"
```

## buildprint quickstart

```
Usage: buildprint quickstart [options]

Print the Buildprint agent playbook (workspace layout, commands, conventions)

Options:
  -h, --help  display help for command

Examples:
  buildprint quickstart
  buildprint quickstart | less
  buildprint branch
```

## buildprint guidelines

```
Usage: buildprint guidelines [options] [command]

List or read Buildprint guideline docs

Options:
  -h, --help                display help for command

Commands:
  list [options]            List the published guideline path catalog with
                            summaries
  get [options] [paths...]  Fetch one or more guideline docs by path (defaults
                            to `general`)
  help [command]            display help for command

Examples:
  buildprint guidelines list
  buildprint guidelines get
  buildprint guidelines get general
  buildprint guidelines get editing/apps schema/workflow
  buildprint guidelines list --json
  buildprint guidelines get testing/project-tests --json
```

### buildprint guidelines list

```
Usage: buildprint guidelines list [options]

List the published guideline path catalog with summaries

Options:
  --json      Print guideline catalog JSON
  -h, --help  display help for command
```

### buildprint guidelines get

```
Usage: buildprint guidelines get [options] [paths...]

Fetch one or more guideline docs by path (defaults to `general`)

Arguments:
  paths       Guideline paths to fetch

Options:
  --json      Print guideline docs JSON
  -h, --help  display help for command
```

## buildprint project

```
Usage: buildprint project [options] [command]

List, inspect, or clone linked Buildprint projects

Options:
  -h, --help               display help for command

Commands:
  list [options]           List projects accessible to the linked CLI token
  info [options] <appId>   Show details for a Bubble app linked to the current
                           CLI token
  clone [options] <appId>  Clone a Bubble app branch into <app-root>/<branch>/
                           (shared app root per app)
  help [command]           display help for command

Examples:
  buildprint project list
  buildprint project info <appId>
  buildprint project clone <appId>
  buildprint project clone <appId> --branch feature-x --dir ./my-app
  buildprint project clone <appId> --branch live
  buildprint project clone <appId> --branch other
  buildprint project list --json
  buildprint project info <appId> --json
```

### buildprint project list

```
Usage: buildprint project list [options]

List projects accessible to the linked CLI token

Options:
  --json      Print JSON with the same fields as the text table (not the raw API
              payload)
  -h, --help  display help for command

Examples:
  buildprint project list
  buildprint project list --json
```

### buildprint project info

```
Usage: buildprint project info [options] <appId>

Show details for a Bubble app linked to the current CLI token

Arguments:
  appId       Bubble app ID

Options:
  --json      Print JSON with the same facts as the text output (not the raw API
              payload)
  -h, --help  display help for command

Examples:
  buildprint project info <appId>
  buildprint project info <appId> --json
```

### buildprint project clone

```
Usage: buildprint project clone [options] <appId>

Clone a Bubble app branch into <app-root>/<branch>/ (shared app root per app)

Arguments:
  appId                     Bubble app ID

Options:
  --branch <name>           Bubble branch to clone (default: test; run
                            `buildprint branch list <appId>` to see all)
                            (default: "test")
  --dir <path>              Override app root directory (default: <appId>).
                            Branch workspace is always <app-root>/<branch>/
  --version-id <versionId>  Clone one exact completed synced version
  --at <date-or-ms>         Clone the latest completed version at or before this
                            time
  -h, --help                display help for command

Examples:
  buildprint project clone <appId>
  buildprint project clone <appId> --branch feature-x
  buildprint project clone <appId> --dir ./my-app
  buildprint project clone <appId> --branch live && buildprint project clone <appId> --branch test
  buildprint project clone <appId> --branch staging --version-id <versionId>
  buildprint project clone <appId> --branch staging --at 2026-07-01T12:00:00Z
```

## buildprint versions

```
Usage: buildprint versions|version [options] [command]

List synced Buildprint version history and restore older snapshots

Options:
  -h, --help              display help for command

Commands:
  list [options] [appId]  List completed synced snapshots for a Bubble branch
  help [command]          display help for command

Examples:
  buildprint versions list <appId> --branch staging
  buildprint versions list --branch staging --before 2026-07-01
  buildprint project clone <appId> --branch staging --version-id <versionId>
  buildprint sync --version-id <versionId>
  buildprint sync --version-id <versionId> --reset --confirm
```

### buildprint versions list

```
Usage: buildprint versions list [options] [appId]

List completed synced snapshots for a Bubble branch

Arguments:
  appId                     Bubble app ID; inferred inside an app workspace

Options:
  --branch <id-or-display>  Bubble branch ID or display name
  --after <date-or-ms>      Only snapshots completed at or after this time
  --before <date-or-ms>     Only snapshots completed at or before this time
  --limit <n>               Maximum snapshots to return (1-500)
  --cursor <cursor>         Continue from a previous result cursor
  --json                    Print structured JSON including the next cursor
  -h, --help                display help for command
```

## buildprint plugin

```
Usage: buildprint plugin [options] [command]

Work with Bubble plugin workspaces (example: buildprint plugin clone <pluginId>)

Options:
  -h, --help                    display help for command

Commands:
  clone [options] <pluginId>    Clone a Bubble plugin into a local plugin
                                workspace (example: buildprint plugin clone
                                <pluginId>)
  upload [options] <file>       Upload a local file as a Bubble plugin asset
                                (example: buildprint plugin upload
                                ./dist/widget.js)
  publish [options]             Show owner instructions for publishing the
                                current plugin draft (example: buildprint plugin
                                publish -m "Release notes" --patch)
  search <query>                Search Bubble's plugin marketplace
  install <plugin> [version]    Install or update a marketplace plugin in the
                                local workspace
  uninstall [options] <plugin>  Uninstall a marketplace plugin from the local
                                workspace
  help [command]                display help for command

Examples:
  buildprint plugin search "stripe"
  buildprint plugin install <pluginId>
  buildprint plugin uninstall <pluginId>
  buildprint plugin clone <pluginId>
  buildprint plugin upload ./dist/widget.js
  buildprint plugin publish -m "Release notes" --patch
```

### buildprint plugin clone

```
Usage: buildprint plugin clone [options] <pluginId>

Clone a Bubble plugin into a local plugin workspace (example: buildprint plugin
clone <pluginId>)

Arguments:
  pluginId      Bubble plugin ID

Options:
  --dir <path>  Override plugin root directory (default: <pluginId>)
  -h, --help    display help for command

Examples:
  buildprint plugin clone <pluginId>
  buildprint plugin clone <pluginId> --dir ./my-plugin
```

### buildprint plugin upload

```
Usage: buildprint plugin upload [options] <file>

Upload a local file as a Bubble plugin asset (example: buildprint plugin upload
./dist/widget.js)

Arguments:
  file                 Local file to upload

Options:
  --name <asset name>  Asset name to store in assets.json
  --type <mime>        MIME type to send to Bubble
  -h, --help           display help for command

Examples:
  buildprint plugin upload ./dist/widget.js
  buildprint plugin upload ./logo.svg --name "logo.svg" --type image/svg+xml
```

### buildprint plugin publish

```
Usage: buildprint plugin publish [options]

Show owner instructions for publishing the current plugin draft (example:
buildprint plugin publish -m "Release notes" --patch)

Options:
  --major                          Publish a major version
  --minor                          Publish a minor version
  --patch                          Publish a patch version
  --force                          Publish despite readiness warnings
  -m, --description <description>  Publish description
  -h, --help                       display help for command

Examples:
  buildprint plugin publish -m "Release notes"
  buildprint plugin publish -m "Fix rendering bug" --patch
  buildprint plugin publish -m "Generate owner handoff despite warnings" --force
```

### buildprint plugin search

```
Usage: buildprint plugin search [options] <query>

Search Bubble's plugin marketplace

Arguments:
  query       Plugin name or ID

Options:
  -h, --help  display help for command
```

### buildprint plugin install

```
Usage: buildprint plugin install [options] <plugin> [version]

Install or update a marketplace plugin in the local workspace

Arguments:
  plugin      Plugin ID or exact name
  version     Version to install (including current for a test plugin)

Options:
  -h, --help  display help for command
```

### buildprint plugin uninstall

```
Usage: buildprint plugin uninstall [options] <plugin>

Uninstall a marketplace plugin from the local workspace

Arguments:
  plugin      Installed plugin ID

Options:
  -h, --help  display help for command
```

## buildprint plugins

```
Usage: buildprint plugins [options] [command]

List connected Bubble plugins

Options:
  -h, --help      display help for command

Commands:
  list [options]  List plugin projects accessible to the linked CLI token
  help [command]  display help for command

Examples:
  buildprint plugins list
  buildprint plugins list --json
```

### buildprint plugins list

```
Usage: buildprint plugins list [options]

List plugin projects accessible to the linked CLI token

Options:
  --json      Print JSON with plugin project names, slugs, and Bubble plugin IDs
  -h, --help  display help for command

Examples:
  buildprint plugins list
  buildprint plugins list --json
```

## buildprint docs

```
Usage: buildprint docs [options] [command]

Read Buildprint or Bubble documentation from the CLI

Options:
  -h, --help                       display help for command

Commands:
  buildprint [options] <query...>  Search Buildprint documentation
  bubble [query...]                Return Bubble's llms.txt payload and curl
                                   guidance
  help [command]                   display help for command

Examples:
  buildprint docs buildprint "how does version syncing work"
  buildprint docs bubble
```

### buildprint docs buildprint

```
Usage: buildprint docs buildprint [options] <query...>

Search Buildprint documentation

Arguments:
  query            Search query

Options:
  --limit <count>  Maximum number of results to return (default: 5)
  -h, --help       display help for command
```

### buildprint docs bubble

```
Usage: buildprint docs bubble [options] [query...]

Return Bubble's llms.txt payload and curl guidance

Arguments:
  query       Optional query text for parity with buildprint docs; ignored for
              Bubble docs

Options:
  -h, --help  display help for command
```

## buildprint components

```
Usage: buildprint components|component [options] [command]

Discover, package, and unpack reusable Buildprint components

Options:
  -h, --help                   display help for command

Commands:
  list [options]               List visible published components
  search [options] [query...]  Search visible published components
  categories [options]         List valid component categories for
                               component.json
  add [options] <component>    Download and unpack a component package into
                               .buildprint/components
  package [options]            Package selected workspace files from
                               library.json and component.json
  help [command]               display help for command

Examples:
  buildprint components list
  buildprint components search payments --category api
  buildprint components categories
  buildprint components add stripe-kit/checkout-flow
  buildprint component add stripe-kit/checkout-flow
  buildprint components package

Review the relevant guideline first:
  buildprint guidelines get components/installing   (find, add, and adapt a component)
  buildprint guidelines get components/authoring    (create or update a component)
```

### buildprint components list

```
Usage: buildprint components list [options]

List visible published components

Options:
  --library <slug>       Filter by component library slug
  --category <category>  Filter by category
  --limit <count>        Page size: maximum number of components to return
                         (1-100, default 50)
  --offset <count>       Number of matching components to skip before the page
                         (for pagination)
  --json                 Print results as JSON
  -h, --help             display help for command

Examples:
  buildprint components list
  buildprint components list --library stripe-kit --json
  buildprint components list --category ui
  buildprint components list --limit 20 --offset 20
```

### buildprint components search

```
Usage: buildprint components search [options] [query...]

Search visible published components

Arguments:
  query                  Search query

Options:
  --library <slug>       Filter by component library slug
  --category <category>  Filter by category
  --limit <count>        Page size: maximum number of components to return
                         (1-100, default 50)
  --offset <count>       Number of matching components to skip before the page
                         (for pagination)
  --json                 Print results as JSON
  -h, --help             display help for command

Examples:
  buildprint components search checkout
  buildprint components search payments --category api
  buildprint components search subscriptions --json
```

### buildprint components categories

```
Usage: buildprint components categories [options]

List valid component categories for component.json

Options:
  --json      Print categories as JSON
  -h, --help  display help for command

Examples:
  buildprint components categories
  buildprint components categories --json
```

### buildprint components add

```
Usage: buildprint components add [options] <component>

Download and unpack a component package into .buildprint/components

Arguments:
  component   Component slug as <library>/<component>

Options:
  --json      Print unpack result as JSON
  -h, --help  display help for command

Examples:
  buildprint components add stripe-kit/checkout-flow
  buildprint components add stripe-kit/checkout-flow --json
```

### buildprint components package

```
Usage: buildprint components package [options]

Package selected workspace files from library.json and component.json

Options:
  --library <path>    Path to library.json (default: "library.json")
  --component <path>  Path to component.json (default: "component.json")
  --dry-run           Validate and build the package zip without uploading it
  --json              Print package result as JSON
  -h, --help          display help for command

Examples:
  buildprint components package
  buildprint components package --dry-run
  buildprint components package --library ./library.json --component ./component.json
```

## buildprint savepoint

```
Usage: buildprint savepoint [options] [command]

Create, list, and restore Bubble editor savepoints for the current workspace
branch

Options:
  -h, --help            display help for command

Commands:
  create <description>  Create a savepoint for the current workspace branch
  list [options]        List savepoints for the current workspace branch
  restore <timestamp>   Restore the current workspace branch to a savepoint
                        timestamp
  help [command]        display help for command

Examples:
  buildprint savepoint create "before refactor"
  buildprint savepoint list
  buildprint savepoint list --json
  buildprint savepoint restore 1745068712345
```

### buildprint savepoint create

```
Usage: buildprint savepoint create [options] <description>

Create a savepoint for the current workspace branch

Arguments:
  description  Human-readable savepoint description

Options:
  -h, --help   display help for command
```

### buildprint savepoint list

```
Usage: buildprint savepoint list [options]

List savepoints for the current workspace branch

Options:
  --json      Print response as JSON on stdout
  -h, --help  display help for command

Examples:
  buildprint savepoint list
  buildprint savepoint list --json
```

### buildprint savepoint restore

```
Usage: buildprint savepoint restore [options] <timestamp>

Restore the current workspace branch to a savepoint timestamp

Arguments:
  timestamp   Savepoint timestamp

Options:
  -h, --help  display help for command
```

## buildprint secret

```
Usage: buildprint secret [options] [command]

Fetch Bubble private parameter values through Buildprint

Options:
  -h, --help               display help for command

Commands:
  get [options] <path...>  Inspect or fetch one Bubble private API Connector or
                           plugin key value
  help [command]           display help for command
Fetch Bubble private API Connector parameters and private plugin shared keys through Buildprint.

Values are hidden unless the subcommand explicitly asks for them.

Examples:
  buildprint secret get settings/secure/apiconnector2/<groupId>/calls/<callId>/headers/<rowId>
  buildprint secret get settings/secure/<pluginId>_<keyId>
```

### buildprint secret get

```
Usage: buildprint secret get [options] <path...>

Inspect or fetch one Bubble private API Connector or plugin key value

Arguments:
  path               Bubble secure path

Options:
  --app <appId>      Bubble app ID override
  --branch <branch>  Bubble branch override
  --value            Fetch and print the private value
  --json             Print compact JSON
  -h, --help         display help for command

Context:
  Inside a Buildprint branch workspace, --app defaults to .buildprint/app.json and --branch defaults to the current git branch.
  Outside a workspace, pass both --app <appId> and --branch <branch>.

Path formats:
  API Connector private row: settings/secure/apiconnector2/<groupId>/calls/<callId>/<section>/<rowId>
  Plugin shared key:        settings/secure/<pluginId>_<keyId> or settings/secure/<pluginId>_<keyId>_test
  The path can be slash-separated, dot-separated, JSON array syntax, or separate shell arguments.

Output:
  Default mode only reports the secret key name and whether Bubble has a value.
  Add --value to fetch and print the private value. Use --json for machine-readable output.

Examples:
  buildprint secret get settings/secure/apiconnector2/stripe/calls/create/headers/auth
  buildprint secret get settings.secure.apiconnector2.stripe.calls.create.headers.auth --value
  buildprint secret get '["settings","secure","<pluginId>_<keyId>"]' --json
  buildprint secret get --app <appId> --branch test settings/secure/<pluginId>_<keyId> --value
```

## buildprint test-user

```
Usage: buildprint test-user [options] [command]

Manage Buildprint test users for the current workspace app

Options:
  -h, --help             display help for command

Commands:
  list [options]         List test users for the current workspace app
  get [options] <id>     Show one test user
  create [options]       Create a test user for the current workspace app
  update [options] <id>  Update a test user
  delete [options] <id>  Delete a test user
  help [command]         display help for command

Examples:
  buildprint test-user list
  buildprint test-user list --json
  buildprint test-user get t17...
  buildprint test-user create --name "Test customer" --database test --email tester@example.com
  printf "%s" "$PASSWORD" | buildprint test-user create --name "Customer" --database test --email tester@example.com --password-stdin
  buildprint test-user update t17... --email tester2@example.com --disable
  buildprint test-user delete t17...
```

### buildprint test-user list

```
Usage: buildprint test-user list [options]

List test users for the current workspace app

Options:
  --json      Print response as JSON on stdout
  -h, --help  display help for command

Examples:
  buildprint test-user list
  buildprint test-user list --json
```

### buildprint test-user get

```
Usage: buildprint test-user get [options] <id>

Show one test user

Arguments:
  id          Buildprint test user ID

Options:
  --json      Print response as JSON on stdout
  -h, --help  display help for command

Examples:
  buildprint test-user get t17...
  buildprint test-user get t17... --json
```

### buildprint test-user create

```
Usage: buildprint test-user create [options]

Create a test user for the current workspace app

Options:
  --name <name>                Test user display name
  --database <database>        Bubble database: test or live
  --description <description>  Optional description
  --email <email>              Optional Bubble user email
  --password <password>        Optional visible-login password
  --password-stdin             Read the optional visible-login password from
                               stdin
  --json                       Print response as JSON on stdout
  -h, --help                   display help for command

Examples:
  buildprint test-user create --name "Test customer" --database test --email tester@example.com
  printf "%s" "$PASSWORD" | buildprint test-user create --name "Customer" --database test --email tester@example.com --password-stdin
```

### buildprint test-user update

```
Usage: buildprint test-user update [options] <id>

Update a test user

Arguments:
  id                           Buildprint test user ID

Options:
  --name <name>                Test user display name
  --description <description>  Set the description
  --clear-description          Clear the description
  --email <email>              Set the Bubble user email
  --clear-email                Clear the Bubble user email
  --password <password>        Set the visible-login password
  --password-stdin             Read the visible-login password from stdin
  --clear-password             Clear the visible-login password
  --database <database>        Bubble database: test or live
  --enable                     Enable the test user
  --disable                    Disable the test user
  --json                       Print response as JSON on stdout
  -h, --help                   display help for command

Examples:
  buildprint test-user update t17... --database test
  buildprint test-user update t17... --clear-password
  printf "%s" "$PASSWORD" | buildprint test-user update t17... --password-stdin
```

### buildprint test-user delete

```
Usage: buildprint test-user delete [options] <id>

Delete a test user

Arguments:
  id          Buildprint test user ID

Options:
  --json      Print response as JSON on stdout
  -h, --help  display help for command

Examples:
  buildprint test-user delete t17...
  buildprint test-user delete t17... --json
```

## buildprint schema

```
Usage: buildprint schema [options] [query...]

Search Bubble's static schema for help

Arguments:
  query                    Optional free-text query

Options:
  --category <category>    Restrict matches to one or more schema categories
                           (default: [])
  --limit <count>          Maximum number of results to return (default: 20)
  --upstream-type <value>  Filter by upstream type context
  --element-type <value>   Filter by element type context
  --action-type <value>    Filter by action type context
  --workflow-type <value>  Filter by workflow type context
  --data-type <value>      Filter by data type context
  --owner-type <value>     Filter by owner type context
  --surface <value>        Filter by surface context
  --json                   Print the raw JSON response
  -h, --help               display help for command

Examples:
  buildprint schema "append text"
  buildprint schema --category actions
  buildprint schema "count" --category operators --upstream-type list
  buildprint schema --element-type Group --surface web_page
  buildprint schema "api connector" --json
```

## buildprint screenshot

```
Usage: buildprint screenshot [options] <path-or-email> [path]

Capture a full-page Bubble app screenshot

Arguments:
  path-or-email          URL path for anonymous capture, or Bubble user email to
                         run as
  path                   App-relative URL path when running as a Bubble user

Options:
  --app <app>            Bubble app name
  --version <version>    Bubble branch/version
  --branch <branch>      Alias for --version
  --viewport <viewport>  desktop, tablet, or mobile (default: "desktop")
  --scale <n>            Device pixel ratio for the capture: 1, 2, or 3
                         (default: "2")
  --output <path>        Write screenshot to a specific PNG path
  --json                 Print result as JSON
  --new-session          Use a fresh browser session/profile for this capture
  --anonymous            Capture without Bubble run-as login (default when no
                         email is supplied)
  -h, --help             display help for command

Examples:
  buildprint screenshot "/"
  buildprint screenshot "/pricing" --anonymous
  buildprint screenshot qa@example.com "/dashboard?tab=settings"
  buildprint data search user --n 50
  buildprint data search user --constraint 'field=email op=email_contains_string value=qa@example.com'
  buildprint screenshot qa@example.com "/dashboard?tab=settings" --viewport mobile
  buildprint screenshot qa@example.com "/dashboard?tab=settings" --scale 3
  buildprint screenshot qa@example.com "/dashboard?tab=settings" --app nqu-audit --version test
  buildprint screenshot qa@example.com "/dashboard?tab=settings" --output ./dashboard.png
```

## buildprint sync

```
Usage: buildprint sync [options] [command]

Fetch a Bubble snapshot and merge it into the workspace

Options:
  --no-merge                 Update the local Bubble snapshot only; skip the
                             merge into HEAD
  --allow-suspicious-shrink  Allow replacing a substantial local Bubble snapshot
                             with a tiny fetched export
  --reset                    Reset this branch workspace to the selected Bubble
                             snapshot
  --version-id <versionId>   Sync one exact completed synced version
  --at <date-or-ms>          Sync the latest completed version at or before this
                             time
  -h, --help                 display help for command

Commands:
  status                     Show how this workspace relates to the latest
                             fetched Bubble snapshot

Examples:
  buildprint sync
  buildprint sync status
  buildprint sync --no-merge
  buildprint sync --reset
  buildprint sync --allow-suspicious-shrink
  buildprint sync --version-id <versionId>
  buildprint sync --at 2026-07-01T12:00:00Z
  buildprint sync --version-id <versionId> --reset --confirm
```

### buildprint sync status

```
Usage: buildprint sync status [options]

Show how this workspace relates to the latest fetched Bubble snapshot

Options:
  -h, --help  display help for command
```

## buildprint merge

```
Usage: buildprint merge [options] <from> <to>

Merge one Bubble branch into another using Bubble's native merge flow

Arguments:
  from                    Source Bubble branch name or ID
  to                      Target Bubble branch name or ID

Options:
  --json                  Print the merge result as JSON
  --resolve <key=choice>  Resolve a conflict key as to or from. Repeat for
                          multiple conflicts. (default: [])
  --resolve-all <choice>  Resolve all conflicts as to or from
  -h, --help              display help for command

Examples:
  buildprint merge lemonb-820 staging
  buildprint merge feature-a test --json
  buildprint merge feature-a test --resolve 0=from
  buildprint merge feature-a test --resolve-all to
```

## buildprint migrate

```
Usage: buildprint migrate [options] [command]

Run local Buildprint workspace projection migrations

Options:
  -h, --help             display help for command

Commands:
  workflow-action-steps  Rename workflow action files from zero-based to
                         one-based steps
  help [command]         display help for command
```

### buildprint migrate workflow-action-steps

```
Usage: buildprint migrate workflow-action-steps [options]

Rename workflow action files from zero-based to one-based steps

Options:
  -h, --help  display help for command
```

## buildprint mcp

```
Usage: buildprint mcp [options] [command]

Manage Buildprint MCP client integrations

Options:
  -h, --help         display help for command

Commands:
  install [options]  Install the Buildprint MCP server into local AI clients
  help [command]     display help for command

Examples:
  buildprint mcp install --client opencode
  buildprint mcp install --client cursor,codex
  buildprint mcp install --client all --dry-run
```

### buildprint mcp install

```
Usage: buildprint mcp install [options]

Install the Buildprint MCP server into local AI clients

Options:
  --client <clients>   Comma-separated clients: cursor, codex, claude-code,
                       claude-desktop, opencode, or all
  --name <serverName>  MCP server name (default: "buildprint")
  --token <token>      Use an existing MCP bearer token instead of creating one
  --dry-run            Preview target config files without creating a token or
                       writing files
  --json               Print machine-readable output
  -h, --help           display help for command

Examples:
  buildprint mcp install --client opencode
  buildprint mcp install --client cursor,codex
  buildprint mcp install --client all --dry-run
```

## buildprint migration

```
Usage: buildprint migration [options] [command]

Manage semi-automated Bubble → code migrations

Options:
  -h, --help                    display help for command

Commands:
  create [options] <slug>       Register a new migration Buildprint will track
  configure [options] <slug>    Configure migration project settings
  list [options]                List all migrations Buildprint is tracking
  init [options] <slug>         Initialize the target codebase for the selected
                                migration stack
  info|status [options] <slug>  Show a migration's details and current stage
  stats <slug>                  Show migration task status and recent completion
                                charts
  secret                        Store local migration secrets
  database                      Manage target databases for automated data
                                migration
  data                          Run automated Bubble data migration
  attachment                    Attach or list migration task attachments
  criterion                     Manage success criteria on migration tasks
  task                          Manage agent-created migration tasks
  help [command]                display help for command

Examples:
  buildprint migration create <slug> --name "<App Name>" --app <bubbleAppId>
  buildprint migration configure <slug> --description "<plain-language product description>"
  buildprint migration secret set <slug> TRIGGER_SECRET_KEY --value "tr_dev_..."
  buildprint migration init <slug> --dir /path/to/target-codebase
  buildprint migration database add <slug> --env dev --url-stdin
  buildprint migration data run <slug> --database <databaseId> --version test
  buildprint migration info <slug>
  buildprint migration stats <slug>
  buildprint migration task next
  buildprint migration task search "Evidence Strength Badge" --migration <slug>
  buildprint migration task info task_123
  buildprint migration task complete task_123 --summary "Implemented workflow" --all-met --file db/triggers/workflow.sql --file src/trigger/workflow.ts
  buildprint migration attachment add task_123 --title "Runtime screenshot" --description "Default state" --file recon/default.png
  buildprint migration criterion mark task_123 1 --note "Verified in browser"
```

### buildprint migration create

```
Usage: buildprint migration create [options] <slug>

Register a new migration Buildprint will track

Arguments:
  slug                         Short unique reference for this migration (used
                               by other commands)

Options:
  --name <name>                Human-friendly project name
  --app <bubbleAppId>          Bubble app ID/name, as used by `buildprint
                               project clone <appId>`
  --description <description>  Plain-language product description: what the app
                               does and who uses it
  --json                       Print the created migration as JSON
  -h, --help                   display help for command

Examples:
  buildprint migration create <slug> --name "<App Name>" --app 1700000000000x123
  buildprint migration create <slug> --name "<App Name>" --app <bubbleAppId> --description "<plain-language product description>"
```

### buildprint migration configure

```
Usage: buildprint migration configure [options] <slug>

Configure migration project settings

Arguments:
  slug                         Migration slug

Options:
  --description <description>  Plain-language product explanation: what it does,
                               who uses it, and main feature areas
  --stack <stack>              Target stack preset
  --parity <mode>              Parity mode
  --mobile <enabled>           Whether the Bubble mobile app is in scope: true
                               or false
  --edit-test-data <enabled>   Whether reconnaissance may temporarily edit
                               Bubble test-version data: true or false
  --json                       Print the updated migration as JSON
  -h, --help                   display help for command

Examples:
  buildprint project clone <bubbleAppId> --branch live
  buildprint migration configure <slug> --description "<plain-language product description>"
  buildprint migration configure <slug> --stack nextjs-supabase-trigger
  buildprint migration configure <slug> --parity strict
  buildprint migration configure <slug> --mobile false
  buildprint migration configure <slug> --edit-test-data true
  buildprint migration configure <slug> --description "<plain-language product description>" --stack nextjs-supabase-trigger --parity strict --mobile false --edit-test-data false
```

### buildprint migration list

```
Usage: buildprint migration list [options]

List all migrations Buildprint is tracking

Options:
  --json      Print the migrations as JSON
  -h, --help  display help for command

Examples:
  buildprint migration list
  buildprint migration list --json
```

### buildprint migration init

```
Usage: buildprint migration init [options] <slug>

Initialize the target codebase for the selected migration stack

Arguments:
  slug               Migration slug

Options:
  --dir <targetDir>  Empty directory where the target codebase should be created
  --json             Print the initialized migration as JSON
  -h, --help         display help for command

Examples:
  buildprint migration init <slug> --dir /path/to/target-codebase
```

### buildprint migration info

```
Usage: buildprint migration info|status [options] <slug>

Show a migration's details and current stage

Arguments:
  slug        Migration slug

Options:
  --json      Print the migration as JSON
  -h, --help  display help for command

Dashboard:
  buildprint migration info <slug> shows the live migration dashboard: stage,
  progress, dependency-ordered next steps, task ids, and numbered success criteria.
  Use this help screen as the command dashboard while working tasks.

Common commands:
  buildprint migration info <slug>
  buildprint migration stats <slug>
  buildprint migration configure <slug> --description "<plain-language product description>"
  buildprint migration secret list <slug>
  buildprint migration secret set <slug> TRIGGER_SECRET_KEY --value "tr_dev_..."
  buildprint migration init <slug> --dir /path/to/target-codebase
  buildprint migration database add <slug> --env dev --url-stdin
  buildprint migration data run <slug> --database <databaseId> --version test
  buildprint migration task next
  buildprint migration task search "Evidence Strength Badge" --migration <slug>
  buildprint migration task info task_123
  buildprint migration task create <slug> --title "Set API key for X in Vercel" --description "Add the production key before launch." --stage delivery --criterion "The key exists in the production Vercel environment."
  buildprint migration criterion mark task_123 1 --note "Confirmed in Vercel production env."
  buildprint migration task complete task_123 --summary "Implemented workflow" --all-met --file db/triggers/workflow.sql --file src/trigger/workflow.ts

Notes:
  - Success criteria are numbered in the migration info dashboard.
  - Setup runs in order: project description, mobile app scope, required secrets, codebase initialization, discovery.
  - Stack defaults to nextjs-supabase-trigger and parity defaults to strict; configure flags still validate explicit values.
  - Secret values are hidden by default and are only printed by migration secret get --value.
  - Strict parity mode means agents mirror Bubble exactly.
  - Manual task creation is supported in implementation and delivery stages.
  - --related-to records non-blocking task context; it does not affect dependency ordering.
  - Use criterion notes for verification links or short implementation context.
  - Use --file to submit changed work files for programmatic success criteria.
  - Task completion requires a summary and all criteria to be met.
```

### buildprint migration stats

```
Usage: buildprint migration stats [options] <slug>

Show migration task status and recent completion charts

Arguments:
  slug        Migration slug

Options:
  -h, --help  display help for command

Examples:
  buildprint migration stats <slug>
```

### buildprint migration secret

```
Usage: buildprint migration secret [options] [command]

Store local migration secrets

Options:
  -h, --help                    display help for command

Commands:
  list [options] <slug>         List locally stored secret keys for a migration
  get [options] <slug> <key>    Inspect or fetch one locally stored migration
                                secret
  set [options] <slug> <key>    Store or update a local secret value for a
                                migration
  clear [options] <slug> <key>  Remove one locally stored migration secret
  help [command]                display help for command
```

### buildprint migration database

```
Usage: buildprint migration database [options] [command]

Manage target databases for automated data migration

Options:
  -h, --help                     display help for command

Commands:
  add [options] <slug>           Add a target Postgres database to the data
                                 migration service
  list [options] <slug>          List target databases for a migration
  verify [options] <databaseId>  Verify the service can connect to a target
                                 database
  remove [options] <databaseId>  Remove a target database from the data
                                 migration service
  help [command]                 display help for command

Examples:
  buildprint migration database add <slug> --env local --url <public-postgres-url>
  printf '%s' "$SUPABASE_DATABASE_URL" | buildprint migration database add <slug> --env prod --url-stdin
  buildprint migration database list <slug>
  buildprint migration database verify <databaseId>
```

### buildprint migration data

```
Usage: buildprint migration data [options] [command]

Run automated Bubble data migration

Options:
  -h, --help                 display help for command

Commands:
  preflight [options]        Check data migration service
  run [options] <slug>       Start or resume a data migration run
  monitor [options] <runId>  Monitor a data migration run
  pause [options] <runId>    Pause a data migration run
  resume [options] <runId>   Resume a paused data migration run
  cancel [options] <runId>   Cancel a data migration run
  help [command]             display help for command

Typical flow:
  buildprint migration data preflight
  buildprint migration database add <slug> --env local --url <public-postgres-url>
  printf '%s' "$SUPABASE_DATABASE_URL" | buildprint migration database add <slug> --env prod --url-stdin
  buildprint migration database verify <databaseId>
  buildprint migration data run <slug> --database <databaseId> --version test
  buildprint migration data monitor <runId>
```

### buildprint migration attachment

```
Usage: buildprint migration attachment [options] [command]

Attach or list migration task attachments

Options:
  -h, --help               display help for command

Commands:
  add [options] <taskId>   Attach files to a migration task
  list [options] <taskId>  List task attachments without local stored paths
  open [options] <taskId>  Print full attachment details and local stored file
                           paths
  help [command]           display help for command

Examples:
  buildprint migration attachment add task_123 --title "Default state" --description "Captured with agent-browser." --file ./default.png
  buildprint migration attachment list task_123
  buildprint migration attachment open task_123
```

### buildprint migration criterion

```
Usage: buildprint migration criterion [options] [command]

Manage success criteria on migration tasks

Options:
  -h, --help                        display help for command

Commands:
  mark [options] <taskId> <number>  Mark one task success criterion as met
  help [command]                    display help for command

Examples:
  buildprint migration criterion mark task_123 1 --note "Confirmed in Vercel production env."
```

### buildprint migration task

```
Usage: buildprint migration task [options] [command]

Manage agent-created migration tasks

Options:
  -h, --help                   display help for command

Commands:
  search [options] [query]     Search migration tasks by query and filters
  next [options] [count]       Show the next dependency-ordered migration task
  reverify [options]           Re-check needs-reverify tasks and complete the
                               ones that still pass
  info [options] <taskId>      Show full details for one migration task
  create [options] <slug>      Create a manual migration todo
  complete [options] <taskId>  Complete a migration task after attesting its
                               success criteria
  help [command]               display help for command

Examples:
  buildprint migration task next
  buildprint migration task next 5
  buildprint migration task next 5 --migration <slug>
  buildprint migration task search "Evidence Strength Badge" --migration <slug>
  buildprint migration task search --migration <slug> --type reusable_reconnaissance --status ready
  buildprint migration task reverify --migration <slug>
  buildprint migration task info task_123
  buildprint migration task create <slug> --title "Set API key for X in Vercel" --description "Add the production key before launch." --stage delivery
  buildprint migration task create <slug> --title "Review follow-up" --description "Check after API key task." --stage delivery --related-to task_abc123def456
  buildprint migration criterion mark task_123 1 --note "Confirmed in Vercel production env."
  buildprint migration task complete task_123 --summary "Set the key in Vercel" --met 1:"Confirmed in Vercel production env."
```

## buildprint check

```
Usage: buildprint check [options] [paths...]

Validate changed workspace files before applying changes, or target specific
files and directories explicitly

Arguments:
  paths            Only check these workspace-relative paths. Directories
                   include all files beneath them.

Options:
  --auto-apply     Apply the workspace automatically if this check run returns
                   no blocking errors
  --json           Emit the check report as JSON instead of human-readable
                   output
  --rule <id>      Only run rules whose id matches this string (exact match or
                   'prefix/*')
  --level <level>  Minimum level to report: error | warning | info (default:
                   info)
  -h, --help       display help for command

Examples:
  buildprint check
  buildprint check pages/home/page.json
  buildprint check pages/home/elements/card
  buildprint check --auto-apply
  buildprint check --rule canonical-form
  buildprint check --rule 'children-manifest/*'
  buildprint check --level warning --json
```

## buildprint changelog

```
Usage: buildprint changelog [options] <sourceBranch> <targetBranch>

Create a readable local changelog between two Buildprint branch workspaces

Arguments:
  sourceBranch         Source branch workspace
  targetBranch         Target branch workspace

Options:
  --json               Print changelog report as JSON
  -o, --output <path>  Write changelog output to a file outside compared branch
                       workspaces
  -h, --help           display help for command

Examples:
  buildprint changelog staging feature-x
  buildprint changelog staging feature-x --output changelog.md
  buildprint changelog live test --json
```

## buildprint find

```
Usage: buildprint find [options] <ids...>

Resolve one or more Buildprint/Bubble ids to workspace file paths

Arguments:
  ids         Node or projected JSON id(s) to resolve

Options:
  --json      Print id lookup results as JSON
  -h, --help  display help for command

Examples:
  buildprint find page-home
  buildprint find hero-id wf-submit action-0
  buildprint find page-home --json
```

## buildprint audit

```
Usage: buildprint audit [options]

Run security audit checks against the current Bubble app workspace

Options:
  --json      Emit audit findings as JSON instead of human-readable output
  -h, --help  display help for command

Examples:
  buildprint audit
  buildprint audit --json
```

## buildprint apply

```
Usage: buildprint apply [options] [appId] [branch]

Push local workspace changes to Bubble. Requires a successful full `buildprint
check` for the current workspace state unless --force-apply is used. Runs the
internal check again by default and auto-commits unapplied edits before
applying.

Arguments:
  appId                Bubble app ID (defaults to workspace app.json)
  branch               Branch name (defaults to current git branch)

Options:
  --no-check           Skip rerunning the internal `buildprint check` pass (a
                       fresh successful full `buildprint check` is still
                       required unless --force-apply is used).
  --allow-large-apply  Allow applying when the local Bubble base is tiny and the
                       workspace is substantial
  --force-apply        Bypass check freshness, internal validation, and
                       large-apply safety gates before applying
  -h, --help           display help for command

Examples:
  buildprint apply
  buildprint apply my-app main
```

## buildprint context

```
Usage: buildprint context [options] <target>

Show context and relationships for a node id or workspace file path, including
containment, references, and trigger relationships

Arguments:
  target      Node id or JSON file path inside the workspace

Options:
  -h, --help  display help for command

Examples:
  buildprint context page-home
  buildprint context pages/home/elements/button/element.json
  buildprint context wf-submit
```

## buildprint copy

```
Usage: buildprint copy [options] [command]

Copy existing roots, workflows, actions, or element subtrees

Options:
  -h, --help          display help for command

Commands:
  root [options]      Copy a page, mobile view, or reusable into a new root
  workflow [options]  Copy an existing workflow into another workflow owner or
                      folder
  element [options]   Copy an element subtree under a canvas root or element
                      parent
  action [options]    Copy one or more actions from a workflow into another
                      workflow
  help [command]      display help for command

Examples:
  buildprint copy root --kind page --source "Marketing Home" --name "Marketing Home Copy"
  buildprint copy workflow --source api/tools/use-tool --path api --folder "Backups" --name "Use Tool Copy"
  buildprint copy element --source pages/home/elements/sidebar --path pages/home
  buildprint copy action --from api/tools/use-tool --source 0 --path pages/home/workflows/load-page --after 1
```

### buildprint copy root

```
Usage: buildprint copy root [options]

Copy a page, mobile view, or reusable into a new root

Options:
  --kind <kind>          Target kind: page, mobile, reusable, or mobile_reusable
  --source <source>      Source root id, raw key, or display name
  --name <name>          New root name
  --element-type <type>  Element type override for reusable targets
  -h, --help             display help for command
```

### buildprint copy workflow

```
Usage: buildprint copy workflow [options]

Copy an existing workflow into another workflow owner or folder

Options:
  --source <path>    Existing workflow directory or workflow.json path
  --path <path>      Workflow owner root or workflow folder path
  --folder <folder>  Destination folder raw key or display name
  --name <name>      Override the copied workflow name
  -h, --help         display help for command
```

### buildprint copy element

```
Usage: buildprint copy element [options]

Copy an element subtree under a canvas root or element parent

Options:
  --source <path>  Existing element directory or element.json path
  --path <path>    Destination canvas root or parent element path
  -h, --help       display help for command
```

### buildprint copy action

```
Usage: buildprint copy action [options]

Copy one or more actions from a workflow into another workflow

Options:
  --from <path>          Source workflow directory or workflow.json path
  --path <path>          Destination workflow directory or workflow.json path
  --source <step-or-id>  Source action one-based step number or action id.
                         Repeat to copy multiple actions. (default: [])
  --name <name>          Override the copied action name when copying exactly
                         one action
  --after <step-or-id>   Insert after an existing destination step or action id
  --before <step-or-id>  Insert before an existing destination step or action id
  -h, --help             display help for command
```

## buildprint file

```
Usage: buildprint file [options] [command]

List, search, upload, and delete Bubble file manager files

Options:
  -h, --help                   display help for command

Commands:
  list [options]               List Bubble file manager files
  search [options] <filename>  Search Bubble file manager filenames
  upload [options] <file>      Upload a local file to Bubble file manager
  delete [options] <path...>   Permanently delete Bubble file manager files
  help [command]               display help for command

File Manager has separate test and live realms. In an app workspace, live
maps to live and every other Bubble branch maps to test. Outside a workspace,
pass both --app and --version test|live.

Examples:
  buildprint file list --version test
  buildprint file search "invoice" --version live
  buildprint file upload ./document.pdf --version test
  buildprint file delete f123x456/document.pdf --version test --yes
```

### buildprint file list

```
Usage: buildprint file list [options]

List Bubble file manager files

Options:
  --cursor <number>      Zero-based result cursor (default: 0)
  --limit <number>       Results to return, from 1 to 50 (default: 50)
  --app <appId>          Bubble app ID override
  --version <test|live>  Bubble file manager realm
  --json                 Print compact JSON output
  -h, --help             display help for command

Each result includes its stable Bubble path and a directly usable signed URL.
Signed URLs expire; keep the path for later lookup or deletion.

Examples:
  buildprint file list --version test
  buildprint file list --version live --limit 20
  buildprint file list --app my-app --version test --json
  buildprint file list --version test --cursor 50
```

### buildprint file search

```
Usage: buildprint file search [options] <filename>

Search Bubble file manager filenames

Arguments:
  filename               Filename text to pass to Bubble search

Options:
  --cursor <number>      Zero-based result cursor (default: 0)
  --limit <number>       Results to return, from 1 to 50 (default: 50)
  --app <appId>          Bubble app ID override
  --version <test|live>  Bubble file manager realm
  --json                 Print compact JSON output
  -h, --help             display help for command

Search uses Bubble's filename matching. Results include stable paths and signed
URLs. Signed URLs expire; use the path for later lookup or deletion.

Examples:
  buildprint file search invoice --version test
  buildprint file search "customer export" --version live
  buildprint file search logo --app my-app --version test --json
```

### buildprint file upload

```
Usage: buildprint file upload [options] <file>

Upload a local file to Bubble file manager

Arguments:
  file                    Local file to upload

Options:
  --name <filename>       Filename stored by Bubble
  --type <mime-type>      MIME type override
  --attach-to <thing-id>  Attach privately to a Bubble Thing
  --app <appId>           Bubble app ID override
  --version <test|live>   Bubble file manager realm
  --json                  Print compact JSON output
  -h, --help              display help for command

Examples:
  buildprint file upload ./invoice.pdf --version test
  buildprint file upload ./report.pdf --name july-report.pdf --version live
  buildprint file upload ./contract.pdf --attach-to 1681234567890x123456789 --version test
  buildprint file upload ./logo.svg --type image/svg+xml --version test --json

Uploads are limited to 10 MiB and are public unless --attach-to is supplied.
Private files are protected
only when the attached Thing's Bubble privacy rules prevent unauthorized access.
```

### buildprint file delete

```
Usage: buildprint file delete [options] <path...>

Permanently delete Bubble file manager files

Arguments:
  path                   Stable paths returned by file list or search

Options:
  --yes                  Confirm irreversible deletion
  --app <appId>          Bubble app ID override
  --version <test|live>  Bubble file manager realm
  --json                 Print compact JSON output
  -h, --help             display help for command

Examples:
  buildprint file delete f123x456/file.txt --version test --yes
  buildprint file delete path-one.pdf path-two.pdf --version live --yes --json

Deletion is permanent. Use stable paths from file list/search, not expiring URLs.
```

## buildprint data

```
Usage: buildprint data [options] [command]

Read and write Bubble database records through Buildprint

Options:
  -h, --help                           display help for command

Commands:
  search [options] [type]              Search Bubble database records via
                                       structured constraint flags
  fetch [options] [payload...]         Fetch full Bubble records by unique ID
  aggregate [options] [type]           Run Bubble aggregate queries via
                                       structured constraint and fn flags
  create [options] [type]              Create one Bubble database record
  update [options] [type] [record-id]  Update fields on one Bubble database
                                       record
  delete [options] [type] [record-id]  Delete one Bubble database record
  help [command]                       display help for command

Context:
  Inside a Buildprint branch workspace, --app defaults to .buildprint/app.json and --version defaults to the current git branch.
  Outside a workspace, pass both --app <appId> and --version <live|test|branchOrVersionId>.

Use:
  search    Find Bubble database records via flag-built constraints.
  fetch     Fetch full Bubble records when you already have unique IDs.
  aggregate Run Bubble aggregate queries via flag-built constraints and fns.
  create    Create one Bubble database record.
  update    Update fields on one Bubble database record.
  delete    Delete one Bubble database record.

Read commands inspect Bubble database rows. Write commands mutate the selected Bubble database branch directly.
Writes require Build mode/MCP edit access. Agents must ask explicit permission before modifying live data.

Examples:
  buildprint data search project \
    --constraint 'field=status op=equals value=active' \
    --constraint "field=Created Date op=>= value=2026-01-01" \
    --sort 'field=Created Date descending=true' \
    --n 50 --from 0
  buildprint data fetch '["1778930231900x601786091393582200"]'
  buildprint data aggregate invoice \
    --constraint 'field=status op=equals value=paid' \
    --fn 'fn=count' \
    --fn 'fn=sum field=amount'
  buildprint data create project \
    --set 'Title=CLI created' \
    --set 'active=true' \
    --set-json 'members=[]'
  buildprint data update project 1778930231900x601786091393582200 \
    --set 'Title=CLI updated' \
    --set-json 'members=["1778930231901x601786091393582201"]' \
    --clear status
  buildprint data delete project 1778930231900x601786091393582200
```

### buildprint data search

```
Usage: buildprint data search [options] [type]

Search Bubble database records via structured constraint flags

Arguments:
  type                         Bubble type: user, custom.<slug>, or a data-types
                               folder slug / display name

Options:
  --constraint <kv>            Repeatable. key=value tokens: field=<name>
                               op=<operator> [value=<value>]
  --sort <kv>                  Repeatable. field=<name> | sort_on_id=true |
                               self=true, plus optional descending=true
  --n <int>                    Max results (default 100, max 400)
  --from <int>                 Result offset (default 0)
  --app <appId>                Bubble app ID override
  --version <branchOrVersion>  Bubble version/branch override
  --json                       Print compact JSON instead of pretty JSON
  -h, --help                   display help for command

Context:
  Inside a Buildprint branch workspace, --app defaults to .buildprint/app.json and --version defaults to the current git branch.
  Outside a workspace, pass both --app <appId> and --version <live|test|branchOrVersionId>.

Identifier resolution (best-effort, in priority order):
  Type      canonical (user, custom.<slug>) -> folder slug -> display name (case-insensitive).
  Field     system field (_id, Created Date, ...) -> field key -> field display (case-insensitive).
  Operator  canonical Bubble id (case-insensitive) -> shorthand (=, !=, <>, >, <, >=, <=, eq, ne).

Local resolution only runs when the cwd is inside a cloned workspace whose appId matches the query.
When local schema exists, unknown types and fields fail before the request is sent and list available options.
Outside a local workspace, unresolved identifiers are resolved against the live Bubble schema.

Flags:
  --constraint   Repeatable. key=value tokens: field=<name> op=<operator> [value=<value>].
                 Omit value= for no-value operators (is_empty, is_not_empty, empty, not empty).
                 Comma-separate value= for list operators (in, not in).
                 Quote values containing spaces: --constraint 'field=name op=equals value="Acme Corp"'.
  --sort         Repeatable. Exactly one of field=<name>, sort_on_id=true, or self=true. Optional descending=true.
  --n            Max results (default 100, max 400).
  --from         Result offset (default 0).

Examples:
  buildprint data search project \
    --constraint 'field=status op=equals value=active' \
    --constraint "field=Created Date op=>= value=2026-01-01" \
    --sort 'field=Created Date descending=true' \
    --n 50 --from 0

Constraint rules:
  Constraint construction rules:
  - Each constraint must be a flat object: `{ key, constraint_type, value? }`.
  - The `constraints` field for `search_data` / `aggregate_data` is an array, not the object-map shape used inside Bubble app JSON `Search` expressions.
  - Treat constraints as flat AND filters. Do not send nested boolean groups, `and`, or `or` operators from these tools.
  - Use the exact Bubble field key for `key` (`status_text`, `owner_custom_user`, `members_list_user`), not the field's display label.
  - Supported special keys: _id, Unique ID, Created Date, Modified Date, Created By, Slug, id_link, _all. On the built-in `user` type, `email` is also valid.
  - Omit `value` only for emptiness operators (`is_empty`, `is_not_empty`, `empty`, `not empty`). Most other operators require a value.
  - Do not send edit-app-only search-expression features such as `_advanced_search_constraint`, constraint object maps keyed by `0`/`1`, or `TextExpression` JSON values.
  - For Thing references (and `_id`), pass the referenced Thing's bare unique ID string (for example `1778930231900x601786091393582200`). Buildprint applies the correct search encoding — reference columns are matched in Bubble's dehydrated `__LOOKUP__` form, while `_id` stays bare. A `__LOOKUP__`-prefixed value is also accepted.
  - For `in` / `not in`, pass an array of primitive values or Bubble unique IDs. For `contains` on list fields, pass a single member value.
  - For dates, Bubble commonly expects millisecond timestamps in msearch payloads (for example `Created Date` filters).

  Operator compatibility:
  - Scalar fields (text, number, date, boolean, references) -> `equals`, `not equal`, `in`, `not in`.
  - Any scalar field (emptiness check) -> `is_empty`, `is_not_empty`.
  - Comparable scalar fields excluding text (number/date) -> `gte`, `lte`.
  - Comparable scalar fields including text (number/date/text) -> `greater than`, `less than`.
  - List fields (`list.*`) -> `contains`, `not contains`, `empty`, `not empty`.
  - Text fields -> `text contains`, `not text contains`, `text contains string`, `not text contains string`, `prefix_search`, `match_phrase_prefix`.
  - Geographic address fields -> `geographic_search`.
  - Range fields (`number_range`, `date_range`) -> `range_contains`, `range_contains_point`, `range_contained_by`, `range_overlaps`, `range_greater_than`, `range_less_than`, `range_greater_than_point`, `range_less_than_point`.
  - Special keys (user `email`, `_all`) — see allow-lists in systemFields -> `email_equals`, `email_contains_string`, `contains_all_fields`.

  Validity checklist:
  - Confirm the exact `type` first: `user` for the built-in User table, otherwise `custom.<type_id>`.
  - Confirm the field key and field kind from the app schema/export before writing the constraint. Do not guess suffixes or casing.
  - Pick the operator from the compatibility rules below. If the field kind is unclear, use schema tools first instead of guessing.
  - Start with one minimal constraint and `n: 1` or `n: 5` to validate the shape, then add more constraints and sorting.
  - If you need OR logic, run multiple valid searches and merge the results client-side unless you already have a proven Bubble payload for that app.
  - If Bubble rejects the query, simplify to one known field + one known-good operator before widening the search.

Supported operator ids: equals, not equal, in, not in, contains, not contains, is_empty, is_not_empty, empty, not empty, greater than, gte, less than, lte, text contains, not text contains, text contains string, not text contains string, email_equals, email_contains_string, contains_all_fields, prefix_search, match_phrase_prefix, geographic_search, range_contains, range_contains_point, range_contained_by, range_overlaps, range_greater_than, range_less_than, range_greater_than_point, range_less_than_point
```

### buildprint data fetch

```
Usage: buildprint data fetch [options] [payload...]

Fetch full Bubble records by unique ID

Arguments:
  payload                      JSON payload; omit when using --file or --stdin

Options:
  --file <path>                Read JSON payload from a file
  --stdin                      Read JSON payload from stdin
  --app <appId>                Bubble app ID override
  --version <branchOrVersion>  Bubble version/branch override
  --json                       Print compact JSON instead of pretty JSON
  -h, --help                   display help for command

Context:
  Inside a Buildprint branch workspace, --app defaults to .buildprint/app.json and --version defaults to the current git branch.
  Outside a workspace, pass both --app <appId> and --version <live|test|branchOrVersionId>.

Fetch accepts either:
  ["1778930231900x601786091393582200", "1778930231901x601786091393582201"]
  { "ids": ["1778930231900x601786091393582200"] }

Examples:
  buildprint data fetch '["1778930231900x601786091393582200"]'
  buildprint data fetch --file ./ids.json
  printf '%s\n' '["1778930231900x601786091393582200"]' | buildprint data fetch --stdin
```

### buildprint data aggregate

```
Usage: buildprint data aggregate [options] [type]

Run Bubble aggregate queries via structured constraint and fn flags

Arguments:
  type                         Bubble type: user, custom.<slug>, or a data-types
                               folder slug / display name

Options:
  --constraint <kv>            Repeatable. key=value tokens: field=<name>
                               op=<operator> [value=<value>]
  --fn <kv>                    Repeatable.
                               fn=<count|sum|product|average|median|min|max>
                               with field=<key> (omit field= for count)
  --search-path <path>         Optional Bubble aggregate search path
  --app <appId>                Bubble app ID override
  --version <branchOrVersion>  Bubble version/branch override
  --json                       Print compact JSON instead of pretty JSON
  -h, --help                   display help for command

Context:
  Inside a Buildprint branch workspace, --app defaults to .buildprint/app.json and --version defaults to the current git branch.
  Outside a workspace, pass both --app <appId> and --version <live|test|branchOrVersionId>.

Identifier resolution (best-effort, in priority order):
  Type      canonical (user, custom.<slug>) -> folder slug -> display name (case-insensitive).
  Field     system field (_id, Created Date, ...) -> field key -> field display (case-insensitive).
  Operator  canonical Bubble id (case-insensitive) -> shorthand (=, !=, <>, >, <, >=, <=, eq, ne).

Local resolution only runs when the cwd is inside a cloned workspace whose appId matches the query.
When local schema exists, unknown types and fields fail before the request is sent and list available options.
Outside a local workspace, unresolved identifiers are resolved against the live Bubble schema.

Flags:
  --constraint   Repeatable. Same parser as search.
  --fn           Repeatable. fn=<count|sum|product|average|median|min|max> with field=<key>
                 (field= is omitted for fn=count; legacy n=count is accepted).
  --search-path  Optional Bubble aggregate search path.

Examples (whole-search rollup):
  buildprint data aggregate invoice \
    --constraint 'field=status op=equals value=paid' \
    --fn 'fn=count' \
    --fn 'fn=sum field=amount'

Aggregate constraints follow the same flat constraint rules as search.
```

### buildprint data create

```
Usage: buildprint data create [options] [type]

Create one Bubble database record

Arguments:
  type                         Bubble type: user, custom.<slug>, or a data-types
                               folder slug / display name

Options:
  --set <field=value>          Repeatable scalar field assignment
  --set-json <field=json>      Repeatable exact JSON field assignment
  --clear <field>              Repeatable field clear; sends Bubble empty/null
  --values-json <json>         JSON object of field values
  --values-file <path>         Read a JSON object of field values from a file
  --app <appId>                Bubble app ID override
  --version <branchOrVersion>  Bubble version/branch override
  --json                       Print compact JSON instead of pretty JSON
  -h, --help                   display help for command

Context:
  Inside a Buildprint branch workspace, --app defaults to .buildprint/app.json and --version defaults to the current git branch.
  Outside a workspace, pass both --app <appId> and --version <live|test|branchOrVersionId>.

Identifier resolution (best-effort, in priority order):
  Type      canonical (user, custom.<slug>) -> folder slug -> display name (case-insensitive).
  Field     system field (_id, Created Date, ...) -> field key -> field display (case-insensitive).
  Operator  canonical Bubble id (case-insensitive) -> shorthand (=, !=, <>, >, <, >=, <=, eq, ne).

Local resolution only runs when the cwd is inside a cloned workspace whose appId matches the query.
When local schema exists, unknown types and fields fail before the request is sent and list available options.
Outside a local workspace, unresolved identifiers are resolved against the live Bubble schema.

Flags:
  --set            Repeatable. field=value. Scalar convenience path; strings stay strings, true/false become booleans.
  --set-json       Repeatable. field=<json>. Exact JSON value for null, arrays, objects, numbers, or quoted strings.
  --clear          Repeatable. Field name to set to Bubble empty/null.
  --values-json    JSON object of field values, e.g. '{"Title":"Acme","members":["177..."]}'.
  --values-file    Path to a JSON object of field values.

Notes:
  These value flags are available on both create and update.
  Type may be `project` or `custom.project`; both resolve to the same Bubble custom type.
  List fields are replaced as whole lists with --set-json or --values-json/--values-file; append/remove are not exposed.
  --set foo=null sends the literal string "null". Use --clear foo or --set-json 'foo=null' to clear a field.
  Writes run immediately against the selected Bubble database branch and require Build mode/MCP edit access.
  Agents must ask explicit permission before modifying live data.

Examples:
  buildprint data create project \
    --set 'Title=CLI created' \
    --set 'active=true' \
    --set-json 'members=[]'
  buildprint data update project 1778930231900x601786091393582200 \
    --set 'Title=CLI updated' \
    --set-json 'members=["1778930231901x601786091393582201"]' \
    --clear status
```

### buildprint data update

```
Usage: buildprint data update [options] [type] [record-id]

Update fields on one Bubble database record

Arguments:
  type                         Bubble type: user, custom.<slug>, or a data-types
                               folder slug / display name
  record-id                    Bubble unique ID for the record

Options:
  --set <field=value>          Repeatable scalar field assignment
  --set-json <field=json>      Repeatable exact JSON field assignment
  --clear <field>              Repeatable field clear; sends Bubble empty/null
  --values-json <json>         JSON object of field values
  --values-file <path>         Read a JSON object of field values from a file
  --app <appId>                Bubble app ID override
  --version <branchOrVersion>  Bubble version/branch override
  --json                       Print compact JSON instead of pretty JSON
  -h, --help                   display help for command

Context:
  Inside a Buildprint branch workspace, --app defaults to .buildprint/app.json and --version defaults to the current git branch.
  Outside a workspace, pass both --app <appId> and --version <live|test|branchOrVersionId>.

Identifier resolution (best-effort, in priority order):
  Type      canonical (user, custom.<slug>) -> folder slug -> display name (case-insensitive).
  Field     system field (_id, Created Date, ...) -> field key -> field display (case-insensitive).
  Operator  canonical Bubble id (case-insensitive) -> shorthand (=, !=, <>, >, <, >=, <=, eq, ne).

Local resolution only runs when the cwd is inside a cloned workspace whose appId matches the query.
When local schema exists, unknown types and fields fail before the request is sent and list available options.
Outside a local workspace, unresolved identifiers are resolved against the live Bubble schema.

Flags:
  --set            Repeatable. field=value. Scalar convenience path; strings stay strings, true/false become booleans.
  --set-json       Repeatable. field=<json>. Exact JSON value for null, arrays, objects, numbers, or quoted strings.
  --clear          Repeatable. Field name to set to Bubble empty/null.
  --values-json    JSON object of field values, e.g. '{"Title":"Acme","members":["177..."]}'.
  --values-file    Path to a JSON object of field values.

Notes:
  These value flags are available on both create and update.
  Type may be `project` or `custom.project`; both resolve to the same Bubble custom type.
  List fields are replaced as whole lists with --set-json or --values-json/--values-file; append/remove are not exposed.
  --set foo=null sends the literal string "null". Use --clear foo or --set-json 'foo=null' to clear a field.
  Writes run immediately against the selected Bubble database branch and require Build mode/MCP edit access.
  Agents must ask explicit permission before modifying live data.

Examples:
  buildprint data create project \
    --set 'Title=CLI created' \
    --set 'active=true' \
    --set-json 'members=[]'
  buildprint data update project 1778930231900x601786091393582200 \
    --set 'Title=CLI updated' \
    --set-json 'members=["1778930231901x601786091393582201"]' \
    --clear status
```

### buildprint data delete

```
Usage: buildprint data delete [options] [type] [record-id]

Delete one Bubble database record

Arguments:
  type                         Bubble type: user, custom.<slug>, or a data-types
                               folder slug / display name
  record-id                    Bubble unique ID for the record

Options:
  --app <appId>                Bubble app ID override
  --version <branchOrVersion>  Bubble version/branch override
  --json                       Print compact JSON instead of pretty JSON
  -h, --help                   display help for command

Context:
  Inside a Buildprint branch workspace, --app defaults to .buildprint/app.json and --version defaults to the current git branch.
  Outside a workspace, pass both --app <appId> and --version <live|test|branchOrVersionId>.

Identifier resolution (best-effort, in priority order):
  Type      canonical (user, custom.<slug>) -> folder slug -> display name (case-insensitive).
  Field     system field (_id, Created Date, ...) -> field key -> field display (case-insensitive).
  Operator  canonical Bubble id (case-insensitive) -> shorthand (=, !=, <>, >, <, >=, <=, eq, ne).

Local resolution only runs when the cwd is inside a cloned workspace whose appId matches the query.
When local schema exists, unknown types and fields fail before the request is sent and list available options.
Outside a local workspace, unresolved identifiers are resolved against the live Bubble schema.

Notes:
  Type may be `project` or `custom.project`; both resolve to the same Bubble custom type.
  Delete runs immediately against the selected Bubble database branch and requires Build mode/MCP edit access.
  Agents must ask explicit permission before deleting live data.

Example:
  buildprint data delete project 1778930231900x601786091393582200
```

## buildprint summary

```
Usage: buildprint summary [options]

Print a friendly summary of local pages, reusables, data types, option sets,
styles, and other top-level app surfaces

Options:
  --json      Print summary payload as JSON on stdout
  -h, --help  display help for command

Examples:
  buildprint summary
  buildprint summary --json
```

## buildprint tree

```
Usage: buildprint tree [options] <target>

Print element tree for page, mobile view, reusable, or element subtree, useful
for understanding UI structure

Arguments:
  target            Page/reusable folder key, friendly name, or element id

Options:
  --include <list>  Comma-separated: text, types, ids, paths, layout, design,
                    properties, workflows, actions (default: types,ids,layout).
                    `actions` implies workflows.
  --cursor <n>      Line offset for pagination (non-negative integer; page size
                    250)
  --depth <n>       Maximum element depth from the target (0 = target only)
  -h, --help        display help for command

Examples:
  buildprint tree home
  buildprint tree home --include text,types,ids,paths
  buildprint tree home --depth 2
  buildprint tree myPage --cursor 250
```

## buildprint update

```
Usage: buildprint update [options]

Update the globally installed Buildprint CLI from npm

Options:
  --check     check for a newer version without installing it
  -h, --help  display help for command

Examples:
  buildprint update
  buildprint update --check
  npm install -g buildprint@latest
```

## buildprint utils

```
Usage: buildprint utils [options] [command]

Utility commands for scripting

Options:
  -h, --help        display help for command

Commands:
  generate-ids [n]  Print N fresh 8-character Buildprint Bubble IDs (`bp` + 6
                    lowercase letters), lexicographic order for stable map keys
  help [command]    display help for command
```

### buildprint utils generate-ids

```
Usage: buildprint utils generate-ids [options] [n]

Print N fresh 8-character Buildprint Bubble IDs (`bp` + 6 lowercase letters),
lexicographic order for stable map keys

Arguments:
  n           how many IDs to mint (default: "1")

Options:
  -h, --help  display help for command

Examples:
  buildprint utils generate-ids
  buildprint utils generate-ids 12
  buildprint utils generate-ids 20
```

## buildprint branch

```
Usage: buildprint branch [options] [command] [appIdOrBranch] [branch]

Inspect, list, or create Bubble app branches

Arguments:
  appIdOrBranch                    With two args: Bubble app ID. With one arg
                                   inside a workspace: branch name or ID. With
                                   no args inside a workspace: current branch
                                   info.
  branch                           Bubble branch name or ID when the first
                                   argument is the app ID

Options:
  --json                           Print JSON with the same facts as the text
                                   output (not the raw API payload)
  -h, --help                       display help for command

Commands:
  list [options] <appId>           List the Bubble branch tree for an app
  create [options] [appId] [name]  Create a new branch (app version). Name is
                                   normalized (trim, lowercase, spaces to
                                   hyphens). Inside a branch workspace you can
                                   pass only the new branch name; Bubble app ID
                                   is read from app.json. Outside a workspace,
                                   pass the Bubble app ID first, then the branch
                                   name.

Examples:
  buildprint branch
  buildprint branch staging
  buildprint branch <appId> staging
  buildprint branch list <appId>
  buildprint branch create "feature-checkout" --from test
```

### buildprint branch list

```
Usage: buildprint branch list [options] <appId>

List the Bubble branch tree for an app

Arguments:
  appId       Bubble app ID

Options:
  --json      Print JSON with the same facts as the text output (not the raw API
              payload)
  -h, --help  display help for command

Examples:
  buildprint branch list <appId>
  buildprint branch list <appId> --json
```

### buildprint branch create

```
Usage: buildprint branch create [options] [appId] [name]

Create a new branch (app version). Name is normalized (trim, lowercase, spaces
to hyphens). Inside a branch workspace you can pass only the new branch name;
Bubble app ID is read from app.json. Outside a workspace, pass the Bubble app ID
first, then the branch name.

Arguments:
  appId                 With two args: Bubble app ID. With one arg inside a
                        workspace: new branch name (app ID from app.json).
  name                  New branch name (required when the first argument is the
                        Bubble app ID)

Options:
  --from <version>      Source version to branch from (required; must be an
                        editable non-live branch, e.g. `test` or `staging`)
  --description <text>  Optional description for the new branch
  --json                Print the full API response as JSON on stdout (skips
                        local workspace materialize/sync)
  --no-workspace-sync   Do not materialize or sync a local app workspace
                        (default: sync when cwd is inside that app’s app root)
  -h, --help            display help for command

Examples:
  buildprint branch create "feature-checkout" --from test
  buildprint branch create <appId> "feature-checkout" --from test
  buildprint branch create <appId> new-flow --from staging
  buildprint branch create "hotfix" --from test --description "urgent fix" --json
```

