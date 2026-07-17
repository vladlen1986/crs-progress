# Editing Frontend Expressions
> Source: `buildprint guidelines get editing/frontend/expressions` · Captured: 2026-07-17 (verbatim)

Use this path when editing expression JSON inside front-end element properties, conditions, and action parameters.

## Mental model

Most frontend expression edits go faster when you answer three questions first:
1. What does the destination slot expect: text, yes/no, single thing, or list?
2. What is the cheapest correct source: an existing element datasource, current row context, current user, page data, or a genuinely new search/API call?
3. What chain of `Message` steps turns that source into the exact destination value?

Think of the expression as two layers:
- The outer chain is the main story: datasource root -> `Message` -> `Message` -> final value.
- Nested payloads can still appear inside `args` or `TextExpression.entries`, but those nested nodes do not change the outer chain rules.

## Core rule

Reuse existing element data sources whenever possible. Do not duplicate equivalent `Search` or `GetDataFromAPI` expressions if another element already computes the same data.

Start from the slot contract, then choose the narrowest source that already exists in the UI.
- For a visibility/enabled condition, make sure the final value is yes/no.
- For dynamic text, make sure the final value is text or a `TextExpression` that resolves to text.
- For row-level field reads, prefer the row context group rather than the repeating group's full list datasource.
- For empty-state or count checks, prefer the existing repeating-group/table list datasource rather than duplicating the search.

For repeating-group and table-style UIs, explicitly separate list access from row-item access:
- Use `GetElement(<repeating_group_id>) -> get_list_data` for list-level operations (count, empty-state, paging checks).
- Use `GetElement(<row_group_id>) -> get_group_data` for row-item field reads inside a cell.
- Use `GetElement(<input_like_id>) -> get_data` for value-style inputs (`Input`, `Dropdown`, `SearchBox`, `AutocompleteDropdown`, `DateInput`, `MultiLineInput`, `PictureInput`, `FileInput`, `SliderInput`, `RadioButtons`; `Checkbox` also supports `get_not_data`).
- `ElementParent` only resolves the immediate parent context. Do not assume it climbs through typeless layout wrappers.
- If wrapper groups exist between a row context group and text/icon descendants, reference the row group directly via `GetElement`.

Most common approach:
- Start from `GetElement` with `properties.element_id`
- Chain `Message` nodes via `next` (`get_data`, field reads, list ops, predicates)
- Every chained step after a datasource must remain a full `Message` node with `type: "Message"`; do not shorten `next` hops to `{ name, ... }` fragments.
- For the first message after `GetElement`, choose from the target-type catalog above; avoid guessed names like `get_value_input`.
- If you are unsure which operator or `GetElement` message exists, inspect comparable expressions already present in this branch workspace before guessing.
- Use `buildprint tree <target>` or direct file reads to find a nearby working example with the same element type or workflow context.
- Treat recipe examples below as structural patterns, not copy/paste templates.
- Replace IDs/message names/args with values that exist in the target app and preserve only the chain form.

## Fast failure triage

When an expression edit breaks, check these in order:
1. Destination contract: does the slot expect text, yes/no, a thing, or a list?
2. Root datasource: are you starting from the correct element/context/source?
3. First `GetElement` hop: `get_group_data` vs `get_list_data` vs `get_data` vs `get_not_data`.
4. Chain shape: every `next` hop must still be a full `{ type: "Message", name: ... }` node.
5. Nested payloads: if the operator uses `args`, confirm the arg value is the right primitive or nested expression.
6. Merge behavior: if you patched a whole object in merge mode, make sure no stale `next`, `entries`, or sibling numeric keys survived.

Common frontend expression mistakes:
- Duplicating a `Search` for an empty state when the repeating group already exposes the list.
- Reading a row field from the repeating group id instead of the row context group id.
- Guessing a `GetElement` message name instead of using the element-type-specific `get_*` family.
- Patching a chain hop to `{ name: ... }` and accidentally deleting the required `type: "Message"`.
- Adding a wrapper group in the UI and then continuing to rely on `ElementParent` where the row group id is now required.

## buildprint schema recipes

- Start from a nearby working expression in the same app instead of inventing a chain from memory.
- Prefer same-slot comparisons first: the same property on another element, another action in the same workflow, or another state under the same page/reusable.
- Pair this path with `schema/dynamic-expression` and the relevant element-type guideline before changing unfamiliar operators or datasource roots.

## Common patterns

Group thing -> field:
```json
{
  "type": "GetElement",
  "properties": { "element_id": "<group_id>" },
  "next": {
    "type": "Message",
    "name": "get_group_data",
    "next": { "type": "Message", "name": "<field_id>" }
  }
}
```

Repeating group list -> count:
```json
{
  "type": "GetElement",
  "properties": { "element_id": "<repeating_group_id>" },
  "next": {
    "type": "Message",
    "name": "get_list_data",
    "next": { "type": "Message", "name": "count" }
  }
}
```

Repeating group list has items (idiomatic):
```json
{
  "type": "GetElement",
  "properties": { "element_id": "<repeating_group_id>" },
  "next": {
    "type": "Message",
    "name": "get_list_data",
    "next": {
      "type": "Message",
      "name": "first_element",
      "next": { "type": "Message", "name": "is_not_empty" }
    }
  }
}
```

Row item field read from inside nested wrappers:
```json
{
  "type": "GetElement",
  "properties": { "element_id": "<row_group_id>" },
  "next": {
    "type": "Message",
    "name": "get_group_data",
    "next": { "type": "Message", "name": "<row_field_id>" }
  }
}
```

Empty-state check without duplicate search:
```json
{
  "type": "GetElement",
  "properties": { "element_id": "<repeating_group_id>" },
  "next": {
    "type": "Message",
    "name": "get_list_data",
    "next": {
      "type": "Message",
      "name": "first_element",
      "next": { "type": "Message", "name": "is_empty" }
    }
  }
}
```

Read custom state:
```json
{
  "type": "GetElement",
  "properties": { "element_id": "<element_id>" },
  "next": { "type": "Message", "name": "custom.<state_key>" }
}
```

## Where this applies

- `states.<id>.condition`
- `workflows.<id>.properties.condition`
- action `properties.condition`
- dynamic text and dynamic property fields

## Companion paths

For expression correctness, pair with:
- `schema/dynamic-expression`
