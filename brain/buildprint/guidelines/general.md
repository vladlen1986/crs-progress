# Buildprint quickstart
> Source: `buildprint guidelines get general` · Captured: 2026-07-17 (verbatim)

Buildprint CLI maps Bubble apps into local branch workspaces. Use this playbook to pick the right workspace commands, inspect app structure, validate edits, and push changes back to Bubble. Fetch task-specific guideline paths after you have oriented yourself.

Read `buildprint quickstart` once per agent session. After that, do not read it again; you already have this baseline context, and the app-specific commands below provide the current workspace details when needed.

## Fast start

If you already know the target app and branch, the normal loop is:

1. Initialize the first workspace for an app: `buildprint init <appId> <branch-name>`. If this app already has a local workspace, clone additional branches with `buildprint project clone <appId> --branch <branch-name>` instead.
2. Enter the branch workspace: `cd <appId>/<branch-name>`
3. Continue from the summary printed by `buildprint init`, or rerun `buildprint summary` if you need to refresh your bearings.
4. Inspect with `buildprint tree <page-or-mobile-view-or-reusable>` for structure, `buildprint find <id...>` to resolve known IDs to files, and `buildprint context <node-id-or-file-path>` for containment, references, and triggers before reaching for raw filesystem tools. When in doubt, run `buildprint context` again on the specific node or workflow you are about to change.
5. Use `buildprint new` as the default when creating a new Bubble surface or project test from scratch. Prefer it for new pages, reusables, mobile views, workflows, actions, data types, option sets, folders, tests, test components, and test steps because it scaffolds the valid filesystem shape for you before you refine it.
6. Use `buildprint copy root|workflow|element|action` when the safest starting point is duplicating an existing Bubble structure instead of creating it from scratch.
7. Use `rg`, `grep`, `jq`, `sed`, `ls`, and targeted file reads only when you need exact file-level detail, literal text, or keys that `summary` / `tree` / `context` do not show.
8. Make the smallest relevant edits in the local filesystem.
9. Validate: `buildprint check`
10. If `buildprint check` reports any new issue, resolve it appropriately before continuing. Do not ignore new errors or warnings and plan to "come back later."
11. Push to Bubble: `buildprint apply`
12. Applied changes can be tested at that branch's Bubble version URL. This is normally `/version-<branch-id>/`, and the branch ID is not always the branch display name. Use `buildprint branch` to print the exact URL for the current branch.

If you are already inside the correct branch workspace, start at `buildprint summary`.

## If context is missing

If you do not yet know the app, branch, or workspace to use:

- **If the CLI is not linked yet:** `buildprint link <token>`
- **Find the app:** `buildprint project list`
- **Inspect one app:** `buildprint project info <appId>`
- **See available branches:** `buildprint branch list <appId>`
- **Inspect branch details or get the Bubble version URL:** `buildprint branch` inside a branch workspace, `buildprint branch <branch-name>` from any branch workspace for that app, or `buildprint branch <appId> <branch-name>`
- **Create a new branch when needed:** `buildprint branch create <appId> <name> --from <base-branch>` or `buildprint branch create <name> --from <base-branch>` inside an existing workspace (`--from` is required; pick the base branch deliberately, usually `test` or `staging`)
- **Then initialize the first branch workspace:** `buildprint init <appId> <branch-name>`; use `buildprint project clone <appId> --branch <branch-name>` when the app workspace already exists locally.

## Using guidelines

`buildprint quickstart` is the baseline playbook. Guidelines are targeted supplements for the specific kind of work you are doing.

- **Use `buildprint guidelines list`** to inspect the published guideline catalog.
- **Use `buildprint guidelines get [path ...]`** to fetch only the paths relevant to the task.
- **Do not bulk-fetch guidelines.** Pull the smallest set that changes how you should inspect, edit, review, or test the app.

Common cases:

- **General app edits:** fetch `editing/apps`
- **Page, mobile view, or reusable editing:** fetch `editing/frontend`
- **Test work:** fetch `testing/project-tests`
- **Workflow or non-frontend schema details:** fetch the relevant `schema/...` paths for the surfaces you are touching. Frontend UI schema details now live in `editing/frontend`.
- **Unfamiliar integration, complex or new UI, or you want a working reference example:** search `buildprint components search <query>` and fetch `components/installing`
- **Runtime logs:** fetch `logs/searching`
- **Live/test database records:** fetch `data/retrieving-database-data`
- **Workload usage:** fetch `workload/unit-analysis`
- **Monitors:** fetch `monitors`

Session defaults:

- After a guideline path has been fetched in the current session, do not fetch it again unless you need a reminder or the user asks for it.
- For front-end edits, fetch `editing/apps` and `editing/frontend` before writing.
- Treat `editing/frontend` as the canonical UI schema and layout contract for pages, mobile views, reusables, and global elements. Do not look for separate public `schema/elements` guideline paths.
- Treat frontend JSON as schema-driven, not guess-driven. `element.json` may include an optional `bp_layout` block for authoring-friendly responsive layout intent. In workspace files, `bp_layout` owns supported layout concerns and the lowered Bubble layout fields are omitted from `properties`.
- Ignore workspace-internal sidecars such as `__bp_layout__.json` and `__bp_dir__.json`. Edit the body file; do not hand-edit those metadata files.
- Use `bp_layout` for common responsive sizing/container intent when it is enough, and use raw `properties` for Bubble-specific behavior, visuals, expressions, data source wiring, and anything the abstraction does not cover.
- For Buildprint project testing tasks, fetch `testing/project-tests` before using project-test tools.
- If you need Bubble manual docs to confirm a specific Bubble behavior, fetch `https://manual.bubble.io/llms.txt` from the command line with `curl -L` instead of guessing.

## User-facing output rules

Buildprint agents can inspect raw Bubble JSON and filesystem details internally, but user-facing answers should stay in Bubble language.

- Always present results with friendly Bubble names when they are available.
- Never show internal IDs, map keys, raw field keys, local filenames, directory structures, or JSON paths to the user unless the user explicitly asks for implementation internals.
- If you have already seen a friendly name for an ID in this session, use the friendly name and do not fall back to the ID.
- Use field display names such as "Invited Users" instead of raw keys such as `invited_users_list_user`.
- Do not include raw keys or IDs in parentheses or inline notes. If a display name is unavailable, describe the concept without exposing the key.
- Explain findings in Bubble concepts: pages, mobile views, reusable elements, workflows, fields, styles, sections, data types, option sets, API calls, and visible app behavior.
- If you create files that the user should download or inspect outside the Bubble editor, write them under `/output`. Files in `/tmp` or other sandbox paths are not reliable user-visible deliverables.
- When the user asks you to produce HTML, write an HTML file under `/output` unless they explicitly ask for inline HTML in the response.

## Tool selection quickstart

Use the CLI first for local branch workspace work, then use MCP or other remote tools only when the task needs remote operational state.

- `buildprint summary`: fastest orientation when you need page, mobile view, reusable, data type, option set, style, or workflow names.
- `buildprint changelog <sourceBranch> <targetBranch> [--output changelog.md]`: readable diff of two local branch workspaces for the same app; relative output paths are written from the app root, not a branch worktree; line item IDs can be resolved with `buildprint find`.
- `buildprint find <id...>`: fastest path lookup when a changelog, issue, or Bubble reference gives you one or more IDs.
- `buildprint tree <target>`: best for structure, visible text, ownership, containment, and workflow cross-references on pages, mobile views, reusables, global elements, or subtrees.
- `buildprint context <target>`: best for understanding where a node is contained, referenced, or triggered. Use it freely before raw file reads and again whenever the target shifts.
- `buildprint new ...`: safest default for new Bubble surfaces because it scaffolds valid workspace shape.
- `buildprint copy root|workflow|element|action ...`: safest default when an existing Bubble structure is a better starting point than a blank scaffold.
- `buildprint check`: local validation for workspace structure, references, and JSON shape before applying.
- Treat new `buildprint check` issues as immediate work, not advisory noise. Resolve them appropriately before continuing instead of deferring them.
- `buildprint apply`: push the local branch workspace back to Bubble.
- `buildprint login <email>`: install Bubble app-user cookies into Agent Browser so manual checks or saved tests can start already authenticated. Do not use it for tests that are meant to verify the visible login flow.
- `buildprint screenshot <email> <path>`: capture an authenticated run-mode screenshot for UI verification or for understanding app flows. Screenshots come from Bubble run-mode, so unapplied local workspace edits will not appear; run `buildprint apply` first when you need to see your changes.
- Raw tools such as `rg`, `grep`, `jq`, `sed`, `cat`, `ls`, and direct file reads are escape hatches for exact literal text, exact keys, or implementation details not surfaced by `summary`, `tree`, or `context`.
- `buildprint data search|fetch|aggregate` reads Bubble database records for the selected app and version. `buildprint data create|update|delete` writes database records immediately; pass custom types as either `project` or `custom.project`. For values, use `--set field=value` for scalar convenience, `--set-json field=<json>` for exact null/arrays/objects/numbers, `--clear field` to empty a field, or `--values-json` / `--values-file` for bulk values.
- `buildprint file list|search|upload|delete` manages Bubble File Manager files in the `test` or `live` realm. Uploads are public unless `--attach-to <thing-id>` is supplied; an attached file is protected only when that Thing's Bubble privacy rules restrict it. Use stable paths from list/search for deletion because returned signed URLs expire.
- MCP data tools such as `search_data`, `fetch_data`, `aggregate_data`, `create_thing`, `update_thing`, and `delete_thing` are for Bubble database records. Branch workspace files never include live or test database rows.
- Data writes through the CLI or MCP require Build mode/MCP edit access. Agents must ask explicit permission before creating, updating, or deleting records in the `live` version because that modifies the Live database.
- MCP log tools such as `get_simple_logs` and `get_advanced_logs` are for runtime evidence. Do not infer runtime failures from app structure alone when logs are available.
- MCP monitor, automation, test, review, workload, and docs-search tools are operational tools. Use them when the task is about those remote Buildprint capabilities, not local workspace editing.
- `search_schema` is a last-resort lookup for Bubble operator names, expression messages, element property keys, or Bubble-owned type strings. Prefer nearby app patterns and `buildprint check` feedback before pre-validating every label.

Default exploration loop:

1. Run `buildprint summary` to orient yourself.
2. Use `buildprint find <id...>` when you already have IDs, then use `buildprint tree` and `buildprint context` to locate likely surfaces and understand structure or ownership.
3. Run `buildprint context` on the most likely target before reading files so references, triggers, and containment are visible up front.
4. Read the specific file or subtree only after the app-aware tools have narrowed the target.
5. When inspecting a workflow, read `workflow.json` and every ordered file under `actions/` in one pass before judging behavior. Do not infer the workflow from a single action file.
6. If scope expands, fetch only the newly relevant area instead of re-reading broad roots.
7. Stop searching once a result identifies the exact target; move to scoped inspection, planning, or editing.

## UI schema quickstart

If the task edits pages, mobile views, reusables, global elements, or nested UI:

1. Fetch `editing/frontend`.
2. Read the parent container before editing children because parent layout determines child sizing and alignment semantics.

Important defaults for UI editing:

- Every UI node is an `element.json` file plus nested child folders and the parent `children` manifest.
- Omit `style` entirely for no-style elements. If `style` is present, it must be a real style ID.
- `bp_layout` is an optional authoring layer for responsive layout intent inside `element.json` and other UI body files such as `page.json`.
- `bp_layout` owns the responsive fields it lowers. Do not keep the compiled Bubble layout fields beside it in workspace `properties`; use raw `properties` only for Bubble behavior outside the `bp_layout` contract.
- `__bp_layout__.json` is workspace-internal layout provenance. It may appear next to a UI body file when Buildprint needs to preserve Bubble's original default-vs-explicit layout shape on assemble. Do not edit, delete, or copy it by hand. Edit `bp_layout` on the body file instead; `buildprint check` maintains the sidecar when needed.
- `buildprint tree`, `buildprint context`, and `buildprint summary` do not surface `__bp_layout__.json`. Prefer those commands over raw directory listings when exploring UI.
- Supported responsive elements should explicitly choose `bp_layout.size.height`: use `"fit"` for normal content-sized UI, `"fill"` only inside known-height parents, and `"fixed"` only for deliberate stable boxes.
- Children under responsive `row` or `column` parents should carry explicit `bp_layout.self.crossAlign` in the workspace authoring shape. Do not rely on implicit Bubble child alignment defaults.
- When a user asks for UI, build it with Bubble-native elements. Do not reach for an HTML element unless the task explicitly calls for a custom embed.
- Prefer `row` and `column` containers for normal flow layout. Treat `relative` containers as an advanced overlap tool rather than the default.
- Do not guess responsive layout semantics from memory. The frontend guideline and existing nearby Bubble patterns are the contract.

## Buildprint mental model

A Buildprint branch workspace is a local, git-backed projection of one Bubble app on one Bubble branch. The Bubble editor remains the source of truth. You inspect and edit local files, then use `buildprint apply` to push back to Bubble.

Important defaults:

- These commands operate on **Bubble apps**, not ordinary source repositories. Treat `branch`, `version`, and `merge` as Bubble concepts first.
- The `live` Bubble branch uses the **Live** database. Every other branch uses the **Test** database.
- When a user says "main" or "main branch" for a Bubble app, they usually mean Bubble's primary development branch: `test`. Do not resolve "main" to `live` unless they explicitly say live.
- The branch workspace is normally `<app-root>/<branch>/`.
- The app root holds shared Buildprint metadata at `../.buildprint/app.json`.
- The current git branch should match the Bubble branch you are editing.
- `issues/` contains read-only Bubble issue checker output. Do not edit it or expect `buildprint apply` to write it back.
- Treat `issues/` as potentially stale: Bubble refreshes that issue checker index only when the app is opened in the Bubble editor and the checker runs.
- Bubble `cross_page` recheck markers are intentionally omitted from `issues/`; they are not actionable editor-visible issues.
- `plugins/` contains definitions of installed versioned Bubble marketplace plugins (their elements, fields, states, events, actions, and data API calls). Use `buildprint plugin install` and `buildprint plugin uninstall` to change this projection safely; arbitrary edits are blocked. `buildprint check` reads these definitions to type-check plugin elements, actions, and data calls. `buildprint apply` writes the matching plugin setting to Bubble, while the projected definition remains local metadata.
- Bubble branch IDs are typically short random-looking strings. If a branch/version ID is all digits, pass it as a string, not a number.

## Versions and syncing

Use syncing intentionally. It is for reconciling with Bubble editor state, not a ritual before every read.

- Use `buildprint branch list <appId>` when you need to confirm the live Bubble branch tree.
- Use `buildprint branch` in a branch workspace when you need the current branch name, display, Bubble version URL, or full ancestry tree.
- Use `buildprint sync` when the user changed the Bubble app outside Buildprint, when you know the local workspace is stale, or when `apply` reports concurrent drift.
- Use `buildprint sync status` when you need to see whether the workspace matches the latest fetched Bubble snapshot, has local pending work, or reflects the last applied Buildprint state.
- Use `buildprint sync --reset` when the Bubble editor state is authoritative and local commits should be discarded. The command will explain the confirmation step before doing anything destructive.
- Do not resync just because you searched, inspected, or applied edits through Buildprint. Buildprint already knows about its own changes in the current session.
- If `buildprint apply` reports concurrent drift, run `buildprint sync`, resolve conflicts, validate, and retry `buildprint apply`.
- When comparing versions, treat `from` as the incoming Bubble branch/version and `to` as the base Bubble branch/version receiving the merge.
- Use `buildprint merge <from> <to>` when the goal is to merge one Bubble branch into another. It runs Bubble's native merge flow through Buildprint: `from` is the incoming branch, `to` is the target branch, clean merges are finalized in Bubble, and conflicts are left on a temporary Bubble merge branch until you resolve them with `--resolve <key=to|from>`, `--resolve-all <to|from>`, or in the Bubble editor.

## Core commands

These are the main CLI surfaces you will use most often:

- **`buildprint link <token>`** — link the CLI to a Buildprint token when auth is not already configured
- **`buildprint init <appId> [branch]`** — clone the first branch workspace for an app, print its summary, and show this playbook
- **`buildprint project clone <appId> [--branch <name>]`** — materialize a local branch workspace without the extra init context
- **`buildprint summary`** — list the main app surfaces in the current workspace
- **`buildprint changelog <sourceBranch> <targetBranch> [--output changelog.md]`** — create a readable Markdown diff between two local branch workspaces for the same app; relative output paths are written from the app root; use `--json` for automation
- **`buildprint find <id...>`** — resolve one or more node/projected JSON IDs to workspace paths; useful with changelog IDs before opening files
- **`buildprint tree <target>`** — show the structural layout of a page, reusable, mobile view, or subtree
- **`buildprint context <node-id-or-file-path>`** — show containment, references, and trigger relationships for a node
- **`buildprint new ...`** — scaffold new pages, reusables, mobile views, workflows, actions, data types, option sets, folders, project tests, test components, and test steps so you can refine a valid starting structure instead of authoring it by hand
- **`buildprint sync [--no-merge]`** — fetch the latest Bubble state into the current branch workspace
- **`buildprint sync status`** — show how the workspace relates to the latest fetched Bubble snapshot and the last applied Buildprint state
- **`buildprint sync --reset`** — show the guarded path for discarding local work and snapping the workspace to Bubble
- **`buildprint merge <from> <to>`** — merge one Bubble branch into another with Bubble's native merge flow; `from` is incoming and `to` receives the merge
- **`buildprint copy root|workflow|element|action ...`** — duplicate an existing Bubble structure into a new root, workflow, element subtree, or action chain
- **`buildprint check [paths...] [--auto-apply]`** — validate changed files by default, or only the files/directories you name
- **`buildprint apply`** — assemble the workspace and push changes back to Bubble
- **`buildprint data search|fetch|aggregate|create|update|delete`** — inspect or mutate Bubble database records for the selected app/version; custom types accept both `project` and `custom.project`, and write commands require Build mode/MCP edit access
- **`buildprint savepoint create "..."`** — create a remote Bubble editor savepoint before risky edits on an existing branch
- **`buildprint test-user list|get|create|update|delete`** — manage configured test-user credentials for the current workspace app
- **`buildprint branch` / `buildprint branch <appId> <branch>`** — inspect one Bubble branch, including its display name, version URL, and branch tree
- **`buildprint branch list <appId>`** — inspect the Bubble branch tree for an app
- **`buildprint project list` / `buildprint project info <appId>`** — discover accessible apps and app metadata
- **`buildprint branch create ... --from <base-branch>`** — create a new Bubble branch (`--from` is required)
- **`buildprint utils generate-ids [N]`** — mint fresh IDs for new entities

## How to inspect quickly

Prefer the Buildprint CLI's app-aware views before dropping into raw file reads.

- Start with **`buildprint summary`** when the question is "what exists in this app or branch?"
- Use **`buildprint find <id...>`** when you have exact IDs from a changelog, Bubble reference, issue, or previous command and need their files.
- Default to **`buildprint tree`** and **`buildprint context`** before `ls`, shell `find`, `rg`, `grep`, `jq`, `sed`, or broad file reads when the goal is to understand the app.
- Use **`buildprint tree`** when the question is "what is on this page, reusable, or layout subtree?"
- Use **`buildprint context`** when the question is "where is this node used, referenced, or triggered?" Prefer one extra context call over guessing from a nearby file.
- Use raw file search with `rg`, `grep`, `jq`, `sed`, and direct file reads only when you need exact keys, literal text, or implementation details not surfaced by those app-aware views.

`buildprint tree` and `buildprint context` are usually the fastest way to build accurate Bubble context because they understand the shredded app directly. Treat them as the default discovery tools, then fall back to ordinary file search and direct inspection only for low-level detail.

## Standard workflow

Use this as the default edit loop:

1. Discover the right app and branch.
2. Clone or enter the branch workspace.
3. Run `buildprint summary`.
4. Use `buildprint tree` and `buildprint context` to inspect the relevant area before dropping into targeted file reads.
5. If the change creates a new Bubble surface, prefer `buildprint new` over hand-authoring folders and JSON. Let the scaffold create the valid starting shape first, then edit it.
6. If the change starts from an existing Bubble surface, prefer `buildprint copy` over rebuilding the same structure by hand.
7. If working on an existing branch and the edit is risky, create a savepoint with `buildprint savepoint create "..."`.
8. Make localized edits.
9. Run `buildprint check`.
10. If `buildprint check` reports any new issue, fix it before continuing. Do not ignore new errors or warnings.
11. Run `buildprint apply`.
12. Applied changes can be tested at that branch's Bubble version URL. This is normally `/version-<branch-id>/`, and the branch ID is not always the branch display name. Use `buildprint branch` to print the exact URL for the current branch.
13. If `apply` reports concurrent drift, run `buildprint sync`, resolve conflicts, and retry.

Working rules:

- Explore before editing.
- Read the smallest relevant subtree or file set.
- You may inspect or reason in terms of raw paths, raw JSON, ids, and field keys internally, but final user-facing responses must use readable Bubble language and never include those raw implementation details.
- If you hit a permissions issue that blocks the work, stop and ask the user to enable Build mode before continuing.
- Before modifying records in the `live` version with `buildprint data create|update|delete` or MCP `create_thing`/`update_thing`/`delete_thing`, ask the user for explicit permission in the current conversation.

## Bubble implementation checklist

Treat each Bubble feature as a product-quality implementation, not a pile of isolated edits. Think through data modeling, workflows, privacy rules, validation, loading states, error handling, user feedback, and performance together.

### Data modeling

- Yes/no fields are binary booleans in Bubble. They do not have a null or third empty state.
- An empty yes/no field behaves as `no`, so do not model yes/no/empty requirements with a yes/no field.
- If the product needs a true three-state choice such as yes/no/not answered, use an option set or another explicit non-boolean field.
- Prefer soft deletes over hard deletes for ordinary product data. Use an archival flag such as `is_deleted`, filter it out of user-facing queries, and reserve hard deletes for true data purges or transient records.
- Soft-deleted records still need privacy protection. Do not assume a hidden record is safe simply because it is marked deleted.

### Privacy and security

- Treat Bubble security as server-first. Anything that reaches the browser should be treated as inspectable and controllable by the user.
- Privacy rules are the main server-side control that prevents Bubble data from leaving the server. Search constraints, hidden elements, disabled buttons, filtered lists, client-side conditions, and UI gating are not security boundaries.
- Default privacy rules to least privilege. For non-public data, begin with no access for Everyone else, then add explicit allow rules for admins, the record owner or creator, and each relevant product role.
- Every non-public data type should have privacy rules for logged-out users, admins, the record owner or creator, and the relevant product roles that need access.
- An unchecked privacy checkbox does not cancel access granted by another matching rule. Build the rules as additive allow rules and review the combined outcome carefully.
- Use `Find this in searches` only when a type truly needs to appear in search results. If data is normally reached through direct references, keep search visibility off to reduce exposure.
- When a privacy rule depends on a matching reference field, add a companion `is not empty` check on the record field so empty references do not accidentally broaden access.
- Use field-level privacy to hide sensitive fields such as internal notes, payment details, secrets, tokens, API credentials, and operational metadata even when the record itself is visible.
- Do not rely on privacy rules alone for writes. Any workflow or action that creates, changes, deletes, or schedules work on data must also enforce server-side permission checks and conditions.
- A lookup by unique ID is not the same as a search. Hidden-from-search records can still be confirmed or loaded by direct reference, so protect both reads and writes accordingly.

### Page access and redirects

- Every page must have access control. Use redirect patterns that prevent unauthorized page content from being delivered at all.
- Prefer server-evaluable redirects that happen on page load or logged-out events.
- Do not rely on `Do when condition is true` for access control, because the page can load before the redirect runs.
- Keep each page-load redirect workflow focused. If multiple redirect cases exist, use separate workflows instead of stacking multiple destination jumps into one chain.
- Never use popups or front-end overlays as security gates. Unauthorized users should be redirected away from the page instead of being shown a dismissible barrier.
- Redirect unauthorized users to a neutral destination such as the front page or a not-found page rather than confirming the existence of a protected area.
- When the app uses a central page-access system such as a header reusable with an option set, keep that source of truth updated whenever you add or privatize a page.
- When you implement or modify page access rules, verify that the redirect is truly server-side rather than merely hiding the page after load.

### Client-side exposure

- Conditionals do not protect data already sent to the browser. If a group, text element, repeating group, or custom state contains sensitive data, protect the underlying data with privacy rules or move the logic server-side.
- Keep sensitive business logic out of front-end workflows. Pricing rules, discounts, entitlements, tokens, privilege decisions, and sensitive state transitions should run in backend workflows or server-side actions.
- Never use Bubble's temp-password assignment action in a front-end workflow. Generated credentials must be created server-side only.
- Any workflow that generates a secret or one-time security value should do that work server-side. Browser-visible generation is observable in network traffic.
- Bubble's random string generator is acceptable for low-stakes identifiers or verification UX, but do not use it as a cryptographic primitive for real secrets, passwords, or security tokens.
- Option sets and app texts are public to the browser. Do not store secrets, hidden feature flags, internal pricing logic, or private operational data in them.
- Data type names, field names, default values, page names, and non-private API Connector configuration can all become visible in browser-delivered assets. Avoid putting sensitive information in those places.
- Treat element visibility or clickability conditions as presentation logic only. If an action matters, protect the workflow or action itself with server-side checks.
- The security of a Bubble interaction is limited by its weakest step. If either the condition or the action depends on client-side state, assume it can be bypassed.
- Validate URL parameters and path-based record loading on the server side. Do not assume a hard-to-guess URL is secure.
- Prefer Bubble unique IDs or other non-predictable identifiers in URLs over sequential or guessable identifiers, but still enforce authorization on the loaded record.

### Files and API Connector

- Uploaded files should be treated as public unless they are explicitly configured as private. Make files private when they contain protected content, and remember that file privacy rules only apply to files uploaded privately.
- Validate uploaded file types and size limits in the workflow. Do not allow arbitrary uploads when the product only expects a narrow set of file types.
- Use backend workflows or triggers for cascades and cleanup when deleting related data so the UI can respond immediately while the heavy work happens on the server.
- Treat API Connector security as part of app security. Secrets belong in private authentication settings, shared headers, or private parameters, not in browser-visible call fields.
- Mark sensitive API Connector parameters as private, replace real initialization values with placeholders after setup, and sanitize stored sample responses so tokens, emails, ids, and secrets are not baked into the schema snapshot.
- Remove unused or test API Connector calls before shipping. Even unused calls can expose details to the browser.
- If an API value should not reach the browser, move the call into a backend workflow or another server-side execution path.

### Error handling and user feedback

- Each feature phase should include clear error handling and user feedback. Add or reuse empty states, validation, loading states, success feedback, and failure feedback where the flow needs them.
- Every list, repeating group, table, search result, or data display should handle the empty state deliberately. Reuse an existing empty-state element when the app already has one; otherwise add one.
- Use Bubble's built-in required-field checks only for simple, low-risk forms. For important or sensitive flows, add explicit validation before the workflow runs and show precise user-facing errors for each failed rule.
- Validate empty fields, formatting requirements, logical constraints, and sensible limits before allowing business-critical workflows to start.
- Any flow that calls an external API should have an explicit failure path for timeouts, 4xx responses, and 5xx responses, with a user-facing message that is clear but not overly technical.
- Unauthorized write attempts should fail safely even if the UI already hid the button. Apply defense in depth by checking permissions inside the workflow.
- Prevent duplicate submissions for create or submit actions by disabling repeated clicks, tracking in-flight state, or checking for recent duplicates where appropriate.
- Long-running actions should always show progress feedback. Use a processing state to change button text, disable re-clicking, and restore the state on both success and failure.
- Successful operations should also communicate completion clearly through alerts, confirmations, navigation, or a visible success state.
- If a page or section loads data slowly enough to be noticeable, give it a loading indicator instead of leaving the user uncertain.
- When you add loading, empty, success, or error UI, reuse the app's existing styles and design patterns unless there is truly no suitable option.

### Comments and maintainability

- Comment Bubble structures for maintainability. Add concise, useful comments for non-obvious data types, fields, workflows, and workflow actions so another developer can understand intent, constraints, and gotchas later.
- Comments should explain purpose, source of truth, non-obvious constraints, denormalization, ordering assumptions, backend-only updates, and any sharp edges that would otherwise be rediscovered later.

### API workflow security

- Treat API workflows as a high-risk surface. Keep them non-public unless external access is genuinely required.
- Require authentication on API workflows whenever the integration allows it, and verify role or permission checks inside the workflow rather than trusting that a logged-in user is automatically allowed.
- Be extremely cautious with settings that bypass privacy rules inside an API workflow. If the workflow runs with elevated visibility, make sure it does not leak or mutate data beyond the intended contract.
- If an API workflow must be public for a third-party webhook or similar integration, validate a shared secret, API key, signature, or equivalent proof before doing any work, and terminate immediately when validation fails.

### Performance

- Bubble performance is part of implementation quality. Favor data shapes and workflow patterns that scale instead of shipping expensive searches and repeating-group cells.
- Prefer server-side search constraints over client-side filtering. Advanced `:filtered` constraints are especially risky because they download data first and filter later.
- Avoid nested searches inside constraints or repeating-group cells. If you need counts or derived values per row, denormalize them or compute them with backend workflows instead of multiplying searches per item.
- Paginate or progressively load large lists. Do not ship unbounded repeating groups or data grids.
- Keep repeating-group cells light. Minimize descendant elements, conditions, and chained lookups, and prefer flatter field references over long relationship traversals.
- Lazy-load data that is below the fold or hidden behind tabs, accordions, or secondary panels instead of loading everything at page start.
- Understand where Bubble runs each operation. Searches with advanced filtering, merged lists, intersections, UI visibility, custom states, and visual changes can all become client-heavy, while data mutations are server-side.
- For perceived speed, place visible user feedback before expensive database or API work where Bubble's execution model allows it.
- Use custom events when later actions depend on earlier actions fully completing and you need predictable sequencing.
- Move heavy, cascading, or slow operations into backend workflows when that improves responsiveness, but do not schedule backend work unnecessarily for trivial single-record actions.
- Backend triggers can become expensive because they fire on every relevant record change. Keep trigger conditions lightweight, scope them to real field transitions, and be careful when auto-bound inputs or denormalized sync patterns could multiply writes.

## Filesystem model

The Bubble app lives as a structured filesystem in your branch workspace. Work directly on these files.

Main surfaces:

- `pages/` — web pages
- `element-definitions/` — reusable elements
- `mobile-views/` — Bubble native-mobile screens
- `global-elements/` — shared surfaces such as tab bars
- `data_types/` — Bubble data types and privacy rules
- `option_sets/` — option sets
- `styles/` — reusable styles and design tokens
- `api/` — backend workflows
- `settings/` — app settings and API connector files

Important file shapes:

- `page.json` — page-level properties and ordered `children`
- `element.json` — one UI element
- `workflow.json` — one workflow definition
- `actions/1.json`, `actions/2.json`, ... — ordered workflow actions
- `type.json` — one data type
- `option-set.json` — one option set

Key filesystem rules:

- Element folders are identified by their **map key**, not by the element's display name and not by the internal `id`; the map key and id may happen to be the same string, but they are different concepts.
- Element references are the opposite: workflow `element_id` targets, Show/Hide/Display actions, and `GetElement` expressions use the element's internal `id`, not its folder map key. For reachability or deletion checks, run `buildprint context <element path|id|map key>` and verify inbound references by id; do not grep only the folder name.
- Element load visibility is encoded as `properties.is_visible`: explicit `false` means hidden on page load, while an omitted key means visible. Use `buildprint tree` or `buildprint context` for computed visibility instead of probing guessed property names.
- The folder tree mirrors element containment.
- `children: [...]` order matters and must match the element subfolders.
- Workflow action filenames are one-based Bubble editor step numbers and encode order.
- When reading a workflow, inspect `workflow.json` and all `actions/*.json` files together in numeric order. A single action rarely gives enough context to understand conditions, sequencing, side effects, or error handling.
- User-facing workflow step references map directly to action filenames: "step 1" means `actions/1.json`, "step 2" means `actions/2.json`.
- Moving a workflow between folders or moving a style between types is done by moving directories or files, not by editing lifted fields back into JSON.

## Local logic vs remote operations

The branch workspace contains Bubble app logic and structure. It does **not** contain runtime records or live operational state.

- Use the branch workspace for pages, reusables, workflows, styles, data types, option sets, API connector files, and settings.
- The Buildprint CLI is installed as `buildprint`. Use it first for branch workspaces, app-aware inspection, local edits, validation, sync, apply, savepoints, and branch operations.
- The Buildprint MCP server is also installed in supported agent sandboxes. Use MCP when the needed capability is not available in the CLI or is inherently remote/operational: logs, live/test data records, monitors, project tests, automations, review completion, and Buildprint docs search.
- For MCP-only work, fetch the relevant guideline with `buildprint guidelines get` first so you use the correct tool shape: `logs/searching`, `data/retrieving-database-data`, `workload/unit-analysis`, `monitors`, or `testing/project-tests`.

## Bubble-specific editing guidance

Some Bubble-specific rules matter often enough to remember here:

- Dynamic expressions are serialized editor graphs, not simple ASTs. Prefer copying the shape of comparable expressions already in this app instead of inventing one from scratch.
- `buildprint check` validates workspace structure, references, and JSON shape, but it is not a full Bubble expression semantics validator.
- If you are unsure how Bubble wants an expression serialized, build or tweak it in Bubble, then `buildprint sync` and inspect the resulting files.
- Display-name edits should keep map keys stable. Changing a data type, field, option set, option value, or attribute map key changes its Bubble identity and will appear as delete-and-add in git.

## What Buildprint can do

If the user asks what Buildprint can help with, suggest concrete tasks:

- Explain an app: use `buildprint summary`, `buildprint tree`, and `buildprint context` to map pages, mobile views, reusables, workflows, data types, option sets, styles, and API calls.
- Edit Bubble apps: scaffold or copy surfaces, make localized workspace edits, validate with `buildprint check`, and push with `buildprint apply`.
- Compare branches: use version diffing tools for high-level review, then drill into the specific pages, workflows, data types, option sets, or API calls that changed.
- Debug runtime issues: combine Bubble server logs with the relevant workflows, pages, mobile views, or backend workflows in the branch workspace.
- Explore Bubble database records: use data search, fetch, and aggregate tools for live/test data. Do not look for database rows in workspace files.
- Create operational monitors: use monitor tools to alert on workflow errors, thresholds, match events, or anomalies.
- Create and run Buildprint project tests: manage saved tests, reusable test components, test users, groups, and manual test runs. Use `buildprint test-user list|get|create|update|delete` when you need configured test-user credentials for the current workspace app.
- Start browser checks already logged in: use `buildprint login <email>` to authenticate Agent Browser as a Bubble app user for the current branch, unless the check is specifically about the login flow.
- Search Buildprint documentation: use docs search for Buildprint product questions, and use `curl -L https://manual.bubble.io/llms.txt` for Bubble manual confirmation.
- Plan new features: identify current app patterns, propose an incremental implementation plan, and name the Bubble surfaces that would change.
- Share Buildprint feedback: report friction or bugs with exact context, what you tried, what failed, and what should have happened.

## Known gotchas

- **Map key is not internal id.** Element folder names come from map keys. The strings can match, but references still resolve against the internal id.
- **Element references use internal ids.** Do not decide that an element is orphaned by grepping its folder key; use `buildprint context` or search for the `element.json` `id`.
- **Hidden-on-load is `properties.is_visible: false`.** Missing `is_visible` is the visible default, and effective visibility also depends on hidden ancestors.
- **Sparse integer-keyed maps are normal.** Bubble data such as expression entries can intentionally have gaps.
- **Deeply nested element folders are normal.** Do not flatten them just to make paths shorter.
- **Concurrent Bubble edits are normal.** If `apply` reports drift, `sync`, resolve, and retry.
