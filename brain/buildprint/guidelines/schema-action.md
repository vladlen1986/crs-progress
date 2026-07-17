# Schema: Action
> Source: `buildprint guidelines get schema/action` · Captured: 2026-07-17 (verbatim)

Use this path for the shape of workflow action files in `actions/*.json`.

## Where actions live

- Every action is its own file under a workflow's `actions/` folder.
- Filenames are one-based Bubble editor step numbers: `1.json`, `2.json`, `3.json`, ...
- Bubble's raw JSON action map remains zero-based after assemble; do not use raw keys as DSL filenames.

## Canonical shape

An action file typically contains:
- `id`
- `type`
- `name`
- `properties`
- `comment`

## Important rules

- Keep the filename and the action object's `id` distinct.
- Preserve action `id` values when reordering existing steps so cross-step references remain stable.
- Reordering means renaming files deliberately; do not leave gaps or duplicate step numbers.
- Many action properties contain expressions. Treat those as structured graphs, not loose JSON blobs.

## Common action families

- Navigation and UI actions
- Data reads and writes
- Custom event triggers
- Backend scheduling actions
- API Connector actions
- Return/terminate actions

## When editing action properties

- Read the surrounding workflow first so the trigger context is clear.
- Read adjacent action files when the action depends on previous or later steps.
- Use `schema/dynamic-expression` before hand-editing conditions, data sources, or step-result expressions.
- Use `schema/api-connector` when the action type comes from an API Connector call.
