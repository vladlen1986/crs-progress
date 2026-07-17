# Workflows
> Source: `buildprint guidelines get workflows` · Captured: 2026-07-17 (verbatim)

Workflows are Bubble's event-driven logic. In the CLI worktree they are represented as folders plus `workflow.json` and `actions/*.json` files.

## Where workflows live

- Page workflows: `pages/<page>/workflows/...`
- Reusable workflows: `element-definitions/<reusable>/workflows/...`
- Global-element workflows: under the relevant `global-elements/<id>/` tree
- Mobile-view workflows: `mobile-views/<view>/workflows/...`
- Backend workflows: `api/...`

## Filesystem rules

- Workflow folders may be nested under a workflow folder that contains `config.json`.
- `workflow.json` holds trigger-level metadata.
- Action order is encoded by one-based filenames in `actions/` (`1.json`, `2.json`, ...).
- Step numbers in user feedback, Bubble's editor, and action filenames now match directly.

## How to inspect workflow logic

- Use `buildprint summary` to find the right page, reusable, mobile-view, or global-element surface.
- For backend workflows under `api/`, use `rg`, direct file reads, and the specialized `workflows/backend` guidance instead of `buildprint summary`.
- Use `buildprint tree <target> --include workflows,actions` to see ownership and order.
- Use `rg` for workflow names, trigger types, action types, parameter keys, and referenced IDs.
- Read `workflow.json` before editing any action file so the trigger context is clear.

## Editing rules

- Preserve action filenames unless you are intentionally reordering.
- Keep action IDs stable when the task is a reorder rather than a replacement.
- When inserting a new action, add the next file and renumber deliberately if order must change.
- When moving workflows between folders, move the directory and keep `config.json` aligned with the intended folder structure.

## Related guidance

- Use `schema/workflow` for workflow object shape.
- Use `schema/action` for action-file shape and common property families.
- Use `schema/dynamic-expression` before hand-editing expression payloads.
- Use `workflows/backend`, `workflows/custom-events`, and `workflows/database-triggers` for specialized backend cases.
