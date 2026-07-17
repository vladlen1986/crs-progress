# Editing apps
> Source: `buildprint guidelines get editing/apps` · Captured: 2026-07-17 (verbatim)

The source of truth for CLI edits is the shredded filesystem projection inside the current branch workspace, not a raw app-JSON editing API.

## Standard workflow

1. Start in the correct branch workspace. If you know the app and branch but do not have a workspace yet, begin with `buildprint init <appId> <branch>`.
2. For an existing branch, create a rollback point with `buildprint savepoint create "..."`.
3. Inspect the relevant app-aware context first. Use `buildprint summary`, `buildprint tree`, and `buildprint context` before `rg` or direct file reads; use raw file tools only for exact literals or low-level details those commands do not show.
4. Edit only the files that represent the requested change.
5. Run `buildprint check` before pushing. By default it checks changed paths; pass explicit files or directories when you need to validate a narrower target set.
6. Run `buildprint apply` to push the worktree back to Bubble.
7. If `apply` reports drift, run `buildprint sync`, resolve the merge, re-check, and retry.

## Engineering standard

- Match the app's existing conventions before adding new names, styles, workflow structure, or schema keys.
- Fix root causes, not symptoms. If the shape is unclear, read neighboring files or the relevant guideline path before editing.
- Keep edits narrow and legible. Prefer a few coherent file changes over broad rewrites of unrelated subtrees.
- Finish the adjacent cleanup your edit creates: manifests, references, folder placement, and obvious follow-on fixes.
- Do not guess IDs, style links, workflow order, or expression topology from memory.

## Structural rules in the worktree

- Directory placement is data. Moving a workflow or style file to another folder changes Bubble meaning.
- Parent/child UI structure is represented by nested `elements/` folders plus the parent's `children` manifest.
- Workflow step order is represented by one-based Bubble editor step filenames in `actions/` (`1.json`, `2.json`, ...).
- Do not assume Bubble object `id` values are interchangeable with folder keys or action filenames.
- Element `element_id` references use the Bubble object `id`, not the element folder key. Before calling an element orphaned or deleting it, run `buildprint context <element path|id|map key>` and verify inbound references.
- Use `buildprint utils generate-ids` for new IDs instead of inventing them.

## When to fetch more guidance

- Fetch the surface-specific paths you know are in scope.
- Add `editing/frontend` for page/reusable/mobile UI work.
- Add `schema/workflow` and `schema/action` when touching workflow structure or action files.
- Add `schema/dynamic-expression` before hand-editing expression payloads.
- Add `schema/data-type`, `schema/option-set`, or `schema/api-connector` when those surfaces are involved.

## Verification

- Re-read the exact files you changed after large or tricky edits.
- Use `buildprint tree` and `buildprint context` to verify UI ownership, references, triggers, and workflow placement.
- Use `git diff` to sanity-check the final shape before `apply`.
- Treat `buildprint check` as required, not optional.
- If `buildprint check` surfaces a new issue from your edit, resolve it appropriately before continuing instead of ignoring it.
