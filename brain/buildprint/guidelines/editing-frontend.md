# Editing Frontend
> Source: `buildprint guidelines get editing/frontend` · Captured: 2026-07-17 (verbatim)

Use this path as the canonical guide for page, reusable, global-element, and mobile-view UI work in the CLI worktree.
It includes the layout contract, style workflow, and default execution order.

## Read these together

- `editing/apps`
- `editing/frontend`
- `editing/frontend/expressions` when conditions or dynamic values are involved
- `schema/workflow` and `schema/action` when wiring or editing behavior

## Filesystem model

- Page UI lives under `pages/<page>/elements/`.
- Reusable UI lives under `element-definitions/<reusable>/elements/`.
- Mobile UI lives under `mobile-views/<view>/elements/`.
- Shared/global surfaces live under `global-elements/<id>/`.
- Real parentage is defined by nested folders and the parent's `children` array, not by metadata fields.

## Element syntax

- Each nested element subtree is a Bubble UI node expressed as folders plus an `element.json` file.
- Common element keys are `id`, `type`, `name`, `properties`, `style`, `children`, `states`, `custom_states`, and `comment`.
- UI body files may also carry an optional `bp_layout` block for authoring-friendly responsive layout intent. That includes nested `element.json` files and root bodies like `page.json`, `reusable.json`, `mobile-view.json`, and `global-element.json` when the underlying Bubble type supports the capability.
- In workspace files, `bp_layout` is the source of truth for supported layout concerns and the lowered Bubble layout fields are omitted from `properties`.
- Keep Bubble-specific behavior inside `properties`; do not invent keys from memory.
- Load visibility uses `properties.is_visible`: explicit `false` means hidden on page load, and an omitted key means visible. Check ancestors too; a visible child inside a hidden group is effectively hidden.
- When a task is to build or redesign UI, use Bubble-native UI elements. Do not solve ordinary interface work with an HTML element.
- All newly created web pages must use Bubble's current responsive engine. Set `properties.responsive_version` to `1` when creating `pages/<page>/page.json`; `properties.new_responsive: true` alone is not enough.
- Treat `children` as the structural manifest for direct descendants. If folders and `children` disagree, the workspace is wrong.
- Omit `style` entirely when an element intentionally has no style. Only include `style` when it points at a real style ID.
- For transparent wrapper groups, set `properties.background_style` to `"none"` explicitly. Do not rely on omission: Bubble `Group`-like elements default omitted background style to a white surface.

## bp_layout overview

- `bp_layout` is a responsive-layout authoring layer, not a replacement for raw Bubble `properties`.
- Use it for sizing, container alignment, child alignment, padding, and margin intent.
- Use raw `properties` for Bubble-specific visual behavior, expressions, datasource wiring, positioning, and anything outside the documented `bp_layout` contract.
- If a layout concern is covered by `bp_layout` for that element, do not also keep the compiled Bubble layout field in `properties`. The CLI derives those fields when assembling or checking.
- Support is capability-driven by Bubble element type. If a type does not support responsive container or element fields, `bp_layout` sections for that capability will be rejected.

## Workspace-internal layout provenance (`__bp_layout__.json`)

- Some UI directories also contain `__bp_layout__.json`. That file is Buildprint-owned metadata, not an editing surface.
- It records layout provenance needed for a lossless round-trip: for example, whether Bubble explicitly stored a default `flex-start` alignment versus leaving the field omitted.
- The shredded workspace still authors layout in `bp_layout` on `element.json`, `page.json`, `reusable.json`, `mobile-view.json`, or `global-element.json`. The sidecar is bookkeeping for assemble, not a second layout model.
- Do not edit, delete, rename, or hand-copy `__bp_layout__.json`. Change `bp_layout` on the body file; `buildprint check` updates or removes the sidecar when layout provenance changes.
- Not every element gets a sidecar. Buildprint only writes one when provenance is required.
- `buildprint tree` and `buildprint context` ignore the sidecar. They read `bp_layout` from the body file. Raw `ls` or broad `rg` may still show the filename.

## bp_layout top-level fields

- `mode`: `"assisted" | "raw"`
- Default is assisted. `raw` disables lowering and conflict ownership for that element.
- `size`: responsive width/height intent
- `container`: parent/container layout intent
- `self`: child-in-parent alignment intent
- `spacing`: padding and margin intent

## bp_layout.size

- `width`: `"fit" | "fill" | "fixed"`
- `height`: `"fit" | "fill" | "fixed"`
- `fixedWidthPx`: number
- `fixedHeightPx`: number
- `minWidthPx`, `maxWidthPx`, `minHeightPx`, `maxHeightPx`: number
- `fixedWidthPx` only takes effect when `width` is `"fixed"`. Otherwise `buildprint check` reports that it will be ignored.
- `fixedHeightPx` only takes effect when `height` is `"fixed"`. Otherwise `buildprint check` reports that it will be ignored.
- Min/max fields lower to Bubble CSS min/max bounds in pixels.
- Min/max height fields are valid with any height mode. They constrain the chosen mode; they are not a replacement for choosing `height`.
- Treat `height` as a required sizing decision for supported responsive elements. If you omit it while authoring `bp_layout`, Buildprint defaults it to `"fit"` because normal UI should usually size to its content.
- Use `height: "fit"` for normal content-sized wrappers, text, buttons, pills, and stacked groups.
- Use `height: "fill"` only when the element should stretch inside a parent with a known height.
- Use `height: "fixed"` only for deliberate stable boxes such as icons, avatars, media placeholders, or fixed-height hero bands.
- If `bp_layout` owns sizing, stale mutually-exclusive raw fields such as fixed widths or pixel min-widths are cleared during lowering.

## bp_layout.container

- `layout`: `"row" | "column" | "relative"`
- Use `row` or `column` for responsive container layout. Use `relative` when children should not participate in row/column flow.
- `relative` is for overlap and free-position compositions, not for ordinary content flow. It is much harder to reason about than `row` or `column`.
- Do not assume a child inside a `relative` container will visually span the parent just because the child is authored with fill-like width intent. Relative layouts are the sharpest width/positioning edge in Bubble UI.
- `rowGapPx`, `columnGapPx`: number
- `mainAlign`: `"start" | "center" | "end" | "space-between" | "space-around" | "flex-start" | "flex-end"`
- `alignItems`: `"start" | "center" | "end" | "space-between" | "space-around" | "flex-start" | "flex-end"`
- `alignItems` is the canonical container cross-axis field.
- Bubble allows the full container alignment value set on both container alignment axes, so `alignItems` is broader than CSS `align-items`.
- In the shredded workspace, responsive containers are normalized to explicit defaults. If a `row` or `column` container omits alignment in raw Bubble JSON, Buildprint still writes `mainAlign: "start"` and `alignItems: "start"` into `bp_layout` so the authoring shape is explicit.
- Do not author `container.gapPx` or `container.crossAlign`; use `rowGapPx`/`columnGapPx` and `alignItems`.
- `rowGapPx`, `columnGapPx`, `mainAlign`, and `alignItems` only make sense when `layout` is `row` or `column`.
- Do not author raw `use_gap`. It is derived automatically during lowering: if both gaps are missing or zero, Bubble gets `use_gap: false`; otherwise it gets `use_gap: true`.

## bp_layout.self

- `crossAlign`: `"start" | "center" | "end" | "stretch" | "flex-start" | "flex-end"`
- `self.crossAlign` is for an element inside its parent container. This is separate from container `alignItems`.
- `self.crossAlign` needs a parent row/column layout; otherwise `buildprint check` reports missing context.
- For supported elements under `row` or `column` parents, treat explicit `bp_layout.self.crossAlign` as required workspace authoring. Buildprint normalizes the default to `start`; do not rely on implicit Bubble child alignment defaults.

## bp_layout.spacing

- `padding`: one of:
- number: apply to all sides
- `[x, y]`: horizontal then vertical
- `[top, right, bottom, left]`: explicit four-side padding
- Explicit padding fields are also supported:
- `paddingX`, `paddingY`
- `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`
- Margin fields are explicit only:
- `marginTop`, `marginRight`, `marginBottom`, `marginLeft`
- Precedence for padding is: shorthand first, then `paddingX`/`paddingY`, then explicit per-side padding fields override the broader forms.

## Lowering behavior

- `size.width` lowers to Bubble `fit_width`, `single_width`, and sometimes `width`. Fixed pixel widths also emit a matching `min_width_css` floor unless you set a different explicit min width.
- `size.height` lowers to Bubble `fit_height`, `single_height`, and sometimes `height`. Fixed pixel heights also emit a matching `min_height_css` floor unless you set a different explicit min height.
- `container.layout`, `rowGapPx`, `columnGapPx`, `mainAlign`, and `alignItems` lower to Bubble container layout/alignment/gap fields.
- Default `start` container alignment is explicit in workspace `bp_layout`, but Buildprint preserves Bubble's source shape on assemble: omitted raw defaults stay omitted unless the source app had explicitly stored `flex-start`.
- `self.crossAlign` lowers to Bubble child alignment fields.
- Default child cross-axis alignment is also explicit in workspace `bp_layout` for supported elements under responsive parents, but assemble still preserves Bubble's source shape when those defaults were originally omitted.
- `spacing` lowers to Bubble padding and margin properties.
- Text uses the same height model as every other element: use `bp_layout.size.height = "fit"` for content-sized text.
- Those lowered layout fields should not be manually stored beside `bp_layout` in workspace `properties`.
- `bp_layout` is the preferred authoring surface for normal responsive flow, but it does not remove Bubble's underlying layout quirks. If a design depends on a stable desktop shell, a full-width banner, or a non-wrapping two-column composition, verify the rendered result instead of assuming the intent alone will be enough.

## Practical layout rules

- Read the parent container before editing the child. Parent layout determines what child sizing and alignment keys mean.
- When a child sits inside a `row` or `column` parent, explicitly author `bp_layout.self.crossAlign`. Treat that as part of the required workspace shape, not an optional refinement.
- Prefer `row` and `column` containers for normal page structure. Use `relative` only for deliberate overlap compositions such as avatars over banners, floating chips, or pinned controls.
- When you do use `relative`, keep the shell simple: establish a stable parent width first, then place the overlapping children inside it. Do not start debugging the children until the parent renders at the intended width.
- In responsive layouts, numeric width/height alone are not enough; check sizing mode and bounds together.
- Do not leave height implicit on supported elements. Choose `fit`, `fill`, or `fixed` deliberately; default to `fit` unless the design needs stretch or a stable fixed box.
- Avoid fixed width and fixed height unless there is a concrete reason. Most UI elements should use responsive sizing and layout behavior instead of hard dimensions.
- Good exceptions include elements whose visual identity depends on a stable box, such as icons, tightly controlled decorative shapes, or other intentionally fixed-size affordances.
- Some desktop compositions legitimately need more explicit width control than pure responsive intent. Common cases are full-width hero banners inside overlap shells, non-wrapping left/right profile layouts, and other designs where the desktop visual structure must stay stable.
- Avoid contradictory sizing combinations. For example, a button with fit-width intent should not also carry a min-width floor unless there is a very specific product reason, because that prevents true shrink-wrap behavior.
- If a parent uses container row/column gaps, prefer gap for regular sibling spacing. Same-axis child margin is usually an anti-pattern; keep it only when a specific child intentionally needs bespoke offset spacing.
- Same-axis child padding under a gap-managed parent is also usually a smell unless that element intentionally needs asymmetric internal spacing.
- Structural wrapper groups should usually be transparent, and in Buildprint that means explicitly setting `properties.background_style` to `"none"` rather than omitting the field.
- Prefer responsive width modes over fixed width. Buttons especially should usually fit their label or fill available space instead of using `single_width: true`.
- If a group is `fit_width: true`, text children should usually also use `fit_width: true`; otherwise the parent cannot shrink-wrap cleanly to the text content.
- Text elements should usually not carry a tall min-height floor. If `min_height_css` is larger than one line of text (`font_size * line_height`), the text can stop shrinking to its content height.
- Sibling order is authored through the parent `children` list. Do not author child `properties.order` in workspace files.
- Common Bubble gotcha: fixed numbers are not the whole sizing model. Width/height, fill behavior, fit-content behavior, and min/max bounds all interact.
- Common Bubble gotcha: visual stacking/order may depend on both tree order and layout-specific properties such as `properties.zindex`.
- Common Bubble gotcha: `current_parent` and similar metadata are descriptive only. Reparenting means moving the subtree and updating the real `children` manifests.

## Ordering row/column children

- Sibling order is authored through the parent `children` list. Do not author child `properties.order`.
- The `children` list controls the parent's direct structural children, not necessarily every visible control in the rendered UI.
- Bubble responsive layouts commonly use wrapper groups. A row that visually appears to contain `icon -> input -> button` may structurally contain `upload wrapper -> input wrapper -> actions wrapper`.
- Before editing a parent `children` array, confirm whether each direct child is a visible UI unit or a wrapper group. Reorder the intended visible groups, not arbitrary raw child ids.
- Preserve meaningful wrapper groups unless you are intentionally restructuring the layout. Moving visible grandchildren instead of wrapper children can break sizing, visibility, upload/dropzone behavior, or workflow targeting.
- When the task is to reorganize a layout, inspect the full relevant element subtree before editing: the parent shell, direct children, wrapper descendants, visible controls, attached plugin elements, and workflow-targeted groups.
- Reorganizing groups often means reorganizing the element tree. A structural UI change may touch many `element.json` files and child folders; that is acceptable when the diff directly represents the requested layout change.
- Do not avoid a necessary tree reorganization just because it creates a larger diff. Keep the scope bounded to the affected subtree, but move the real groups that own layout, sizing, visibility, plugin behavior, or workflows.
- If Buildprint tree/context shows a visible child name that differs from the raw direct child name, treat that as a signal that a wrapper group may be involved. Inspect one level deeper before editing.
- Do not infer that Bubble renders row children in reverse. If the rendered order appears opposite from the authored order, first check wrapper groups, hidden or collapsed children, z-index, relative layout, alignment, sizing, and whether you are editing the right parent container.
- Reversing a `children` list is rarely the right first fix. Prefer identifying the intended visible groups, then order those groups left-to-right or top-to-bottom in the parent container.
- For row/column redesigns, first make the parent shell express the intended composition using named groups such as left/upload, center/content, and right/actions. Only after that should you tune individual icons or buttons inside those groups.

Example toolbar/composer structure:

- row container
  - upload wrapper
    - file dropzone
    - paperclip icon
  - input wrapper
    - multiline input
  - actions wrapper
    - magic wand icon
    - microphone icon
    - divider
    - send button

## Layout debugging

- If a desktop-intended group renders near mobile width in run mode, inspect the rendered parent width first before adjusting children.
- If a child looks too narrow, confirm whether the parent is actually narrow before changing the child's width settings.
- If a banner, hero, or overlap composition fails to span the card or page shell, verify the width of the containing shell before changing the overlapping layer.
- If a right-hand column wraps below a left-hand column unexpectedly, check whether the row container is narrower than intended before loosening child widths.
- If inner content causes horizontal scrolling, look for a child that is wider than a collapsed parent rather than assuming the child alone is wrong.
- If sibling order looks wrong in a row, inspect both structure and distribution: direct child order, `container.mainAlign`, `container.alignItems`, row/column gaps, child width modes, and wrapper groups around visible controls.
- A row with the correct child order can still look wrong if `mainAlign` is `center` when the design expects `space-between`, or if a fill-width child is not taking the intended available space.
- When responsive intent and the rendered result diverge, simplify the composition. Reduce nested ambiguity, make the parent width behavior clearer, then re-test.

## Browser verification

- After applying UI changes, offer to verify them visually. Only run the check if the user asked you to test the work or accepts the offer.

## Shell scripting safety

- If you create or rewrite frontend trees with shell scripts, treat the workspace as structural data, not a bag of files.
- Use `set -e` at the top of generated shell scripts so a failed `mkdir`, `cat > .../element.json`, or move stops immediately instead of leaving a partial subtree behind.
- Create parent directories before every file write. `cat > path/to/element.json` does not create missing parents.
- After scripted structural edits, re-check that every declared `children` entry has a matching direct child folder with `element.json`.
- If `children` mentions a child that is missing on disk, `buildprint check` is usually reporting a real partial-tree problem, not a false positive.

## Frontend workflow

Treat this as the default execution order for UI changes in a branch workspace.

1. Locate the owner root with `buildprint summary`, `buildprint tree`, and `buildprint context` before falling back to `rg`.
2. Read the parent container, nearby siblings, and any linked styles before editing.
3. Before changing row/column structure, inspect the full relevant element subtree and record the parent layout, main/cross alignment, direct child order, visible contents of each direct child, child width/height modes, hidden/collapsed conditions, and any workflows or plugin behavior attached to wrappers.
4. If the change is large, get user approval on the intended design before implementation.
5. For structural work, change the shell first, then direct children, then deeper descendants.
6. Apply styles and base visual properties after structure is stable.
7. Wire workflows/actions and dynamic conditions last.
8. Run `buildprint check` after meaningful batches and inspect the diff before `buildprint apply`.

## Style workflow

- Reusable styles live under `styles/<Type>/<style-id>.json`.
- Legacy no-type styles live under `styles/__bp_no_type__/`.
- Default style maps live in `styles/defaults.json`.
- Color tokens live in `styles/tokens.json`.
- Font tokens and font config live in `styles/fonts.json`.
- Read existing style files before creating new visual language.
- Reuse a nearby style when it already matches the app's conventions.
- Set the element's `style` field only when the element should reference a real shared style.
- If the element intentionally has no style, omit the `style` field entirely.
- A condition (state) may also swap the element's style: a state under `states.<state_id>` can carry an optional top-level `style` id, a sibling of `condition` and `properties`. While the condition is active the element swaps to that named style; when inactive it falls back to the element's base `style`.
- A state may set only `style` with an empty `properties: {}` — that is a valid, non-empty state, not dead config.
- A state-level `style` must point at a real style id under `styles/`, exactly like the element's base `style` (it is validated the same way). Omit it for no swap; never use blank, `none`, or `$none`.
- If a visual change should apply broadly, edit the shared style file instead of duplicating overrides across many elements.
- If you move a style file between `styles/<Type>/` folders, you are changing its Bubble type binding.

## Hard rules

- `style`, when present, must point to a real style ID. No-style means omitting the field entirely.
- When the user asks to build UI, they mean Bubble-native UI unless they explicitly ask for an HTML element or a true custom embed.
- Keep the `children` manifest in sync with the actual `elements/` subfolders.
- Do not rely on `current_parent` or similar metadata to move UI structure.
- Prefer editing the smallest subtree that solves the task.
- Confirm new IDs were generated intentionally.
- Confirm no stale references were left behind after renames or moves.
