# Schema: Workflow
> Source: `buildprint guidelines get schema/workflow` · Captured: 2026-07-17 (verbatim)

Use this path for the shape of `workflow.json` files in the Buildprint worktree.

## Where workflows live

- Backend workflows: `api/.../workflow.json`
- Page workflows: `pages/<page>/workflows/.../workflow.json`
- Reusable workflows: `element-definitions/<reusable>/workflows/.../workflow.json`
- Mobile workflows: `mobile-views/<view>/workflows/.../workflow.json`

## Canonical shape

A workflow file typically contains:
- `id`
- `type`
- `name`
- `properties`
- `comment`

Action steps are stored separately under the sibling `actions/` directory.

## Important rules

- Folder placement is meaningful. Moving a workflow directory changes where Bubble considers that workflow to live.
- If a workflow is grouped under a workflow folder, that folder's `config.json` is part of the meaning.
- Keep workflow `id` distinct from the folder key.
- Preserve stable workflow IDs when you are editing behavior rather than replacing the workflow.

## Common properties to inspect

- Trigger-specific fields such as `element_id`, `condition`, `run_when`, `interval`, `wf_name`, or `data_trigger_type`.
- `parameters` for custom events and backend workflows.
- `return_types` when a workflow returns data.
- Backend exposure/auth fields on API workflows.

## Related files

- `actions/1.json`, `actions/2.json`, ... define execution order.
- Use `schema/action` for action-file structure.
- Use `schema/dynamic-expression` before hand-editing conditions or dynamic values inside `properties`.
