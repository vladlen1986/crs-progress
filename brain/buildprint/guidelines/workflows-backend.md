# Backend Workflows
> Source: `buildprint guidelines get workflows/backend` · Captured: 2026-07-17 (verbatim)

Use this path for Bubble backend workflows represented under `api/` in the CLI worktree.

## Filesystem model

- Backend workflows live under `api/<folder?>/<workflow>/workflow.json`.
- Execution order is in the sibling `actions/` directory.
- Folder placement is semantic. Moving the workflow directory changes its backend foldering.

## High-signal fields

- Endpoint identity such as `wf_name`.
- Exposure/auth configuration.
- Parameter definitions.
- Response behavior and any redirect/return configuration.
- Conditions and privacy-bypass flags.

## Practical rules

- Keep public exposure as narrow as possible.
- Treat any privacy bypass as high risk and review it with the relevant data types.
- Keep schedule/recursion flows explicit and easy to trace in the action files.
- When changing parameter contracts, inspect all callers in the worktree before applying.

## How to inspect

- Do not rely on `buildprint summary` for backend workflows; it does not list `api/` surfaces.
- Use `buildprint tree <target> --include workflows,actions` when you already know the owning page, reusable, mobile view, or global element.
- For backend workflows under `api/`, use `rg` and direct reads of `api/**/workflow.json` plus sibling `actions/*.json` files.
- Use `rg` for workflow names, endpoint names, and parameter keys.
- Read `workflow.json` and its `actions/*.json` together.
