# Cookbook: Refactoring Into Reusables
> Source: `buildprint guidelines get cookbooks/refactoring-into-reusables` · Captured: 2026-07-17 (verbatim)

Use this path when extracting existing Bubble UI into a reusable element while preserving behavior, data bindings, and workflow outcomes.

## Required companion paths

Fetch these together before editing:
- `editing/apps`
- `editing/frontend`
- `editing/frontend/expressions`
- `schema/workflow`
- `schema/action`
- `schema/dynamic-expression`
- read the existing subtree files directly for element-specific raw Bubble fields that are outside the shared frontend contract

## Phase 1: Inventory before refactor

1. Define the extraction boundary clearly:
- source owner path (`pages.<id>`, `element_definitions.<id>`, or `mobile_views.<id>`)
- source root element id (the root you are replacing)
- destination reusable id and target insertion point

2. Snapshot source assets before writes:
- source subtree (`elements` under the root)
- relevant workflows
- custom states and conditional states

3. Build a dependency inventory for the source subtree:
- data dependencies (`group_type`, `data_source`, reusable parameters, option/data types)
- dynamic expressions containing `GetElement` references
- custom state reads and writes (`custom.<state_key>`)
- visibility/state conditions and style-state rules

4. Build a workflow inventory:
- workflows triggered by elements inside the subtree (`workflow.properties.element_id`)
- actions targeting elements inside the subtree (`action.properties.element_id` and similar target ids)
- custom events called by or calling into the subtree

5. Classify every reference as one of:
- internal (both source and target remain inside extracted subtree)
- external dependency (references page/reusable context outside extracted subtree)
- outbound dependency (subtree triggers effects outside itself)

## Large-scope strategy

If the target reusable is very large, avoid moving the entire UI and workflow surface in one step.
Instead, isolate existing smaller sections first, refactor each section into its own reusable, and verify each one independently.
After those smaller reusable pieces are stable, compose them into the main reusable and then complete the final swap.
This staged approach reduces reference breakage risk and makes workflow/data rewrites easier to validate.

## Phase 2: Create reusable shell

1. Create a new reusable definition at `element_definitions.<reusable_key>` with `type: "CustomDefinition"`.
2. Set `id`, keep map key distinct from object `id`, and use `buildprint utils generate-ids` when you need fresh IDs.
3. Initialize reusable maps up front: `elements`, `workflows`, and parameter map under `properties.parameters` as needed.
4. Copy container intent from the source root (layout mode, sizing constraints, visibility/collapse behavior, spacing model).

## Phase 3: Clone UI into reusable

1. Copy the source subtree into `element_definitions.<reusable_key>.elements`.
2. Use fresh ids for cloned elements and keep an `old_id -> new_id` mapping.
3. Rewrite all internal id references in the cloned payload:
- `GetElement.properties.element_id` chains
- state conditions (`states.*.condition`)
- dynamic text/property expressions
- action target ids inside migrated workflows

4. For each external dependency, choose a bridge strategy instead of leaving hardcoded cross-context ids:
- Preferred: create reusable parameter(s) and pass values via instance `param_<param_id>`.
- Each parameter entry lives at `element_definitions.<reusable_key>.properties.parameters.<entry_id>` and carries `param_id`, `param_name`, `editor_type`, optional `btype_id`, `is_list`, `optional`, an optional `description`, and an optional `default_value`.
- `description` is optional free-text help shown for that exposed property in the Bubble editor (Bubble renders it just before `default_value`); it is plain `text` and may be omitted. Add it to document what a parameter is for; never put it on the reusable definition itself or on custom states.
- Alternative: move the needed state owner into the reusable (if that ownership change is safe).
- Alternative: keep parent-owned data/workflow and communicate through custom events/inputs.

## Phase 4: Port workflows

1. Move workflows whose trigger belongs to the extracted UI into `element_definitions.<reusable_key>.workflows`.
2. Preserve workflow/action object-map structure and ordering (`actions` keyed by numeric strings).
3. Rewrite trigger/action element references using the id map from Phase 3.
4. Keep parameter contracts consistent for custom events:
- if moving event logic, keep parameter ids stable where possible
- if changing contracts, update all callers and return-value consumers together

5. Separate local behavior from page-level orchestration:
- local UI behavior (show/hide/toggle internal elements) should live inside reusable workflows
- page-level orchestration can remain on the page and be triggered via reusable custom events

## Phase 5: Swap in reusable instance

1. Insert a `CustomElement` instance at the original location with `properties.custom_id` set to the new reusable id.
2. Mirror the old root wrapper behavior on the instance:
- layout sizing flags (`single_*`, `fit_*`, min/max css bounds)
- alignment/order/zindex and visibility/collapse settings
- any required `data_source` and `param_<param_id>` values

3. Retarget remaining parent workflows to the new instance/event wiring.
4. Verify functional parity before deletion (UI state changes, button flows, conditional states, data-dependent rendering).
5. After parity is confirmed, remove old source elements and obsolete workflows.
6. Clean up orphaned custom states/events only after confirming no references remain.

## High-risk reference patterns (handle gracefully)

- Hidden popup/group state references:
- If old UI depended on `GetElement(<popup_or_group_id>) -> custom.<state>`, do not keep a broken id reference.
- Bridge by parameter pass-through, move state ownership, or parent workflow sync into reusable state.

- External `GetElement` references from inside reusable:
- Avoid direct coupling to page-only ids whenever possible; convert to reusable parameters or event interfaces.

- Action step references (`PreviousStep`, custom-event returns):
- If action order changes during migration, update dependent references in the same batch.
- Workflow action filenames are one-based editor step numbers. If you inspect assembled/raw Bubble JSON directly, remember those raw action keys are still zero-based.

- Id collisions and stale references:
- Never reuse deleted ids manually. After swap, search the branch worktree for old ids and resolve stragglers.

## Validation checklist

1. Search for old source element ids; only intentional survivors should remain.
2. Validate all migrated triggers fire and all actions resolve target elements.
3. Validate dynamic-expression `GetElement` references in states/workflows/actions.
4. Validate reusable parameter defaults and per-instance `param_<id>` bindings.
5. Validate responsive behavior and collapse/visibility parity against the original UI.

## Example guideline fetch

- `buildprint guidelines get editing/apps editing/frontend editing/frontend/expressions schema/workflow schema/action schema/dynamic-expression cookbooks/refactoring-into-reusables`
