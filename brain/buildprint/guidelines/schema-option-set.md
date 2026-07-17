# Schema: Option Set
> Source: `buildprint guidelines get schema/option-set` · Captured: 2026-07-17 (verbatim)

This topic documents the canonical option set schema as it appears in the Buildprint worktree.
It is derived from Bubble editor schema metadata and the generated schema registry.

## Filesystem and logical locations

- Worktree file: `option_sets/<option_set_id>/option-set.json`
- Option set object: `option_sets.<option_set_id>`
- Option values map: `option_sets.<option_set_id>.values.<value_id>`
- Option attributes map: `option_sets.<option_set_id>.attributes.<attribute_id>`

## Option set object schema

Option set top-level keys:
- `attributes`
- `comment`
- `creation_source`
- `deleted`
- `display`
- `values`

Required by generated schema:
- `display`
- `values`

Canonical shape:
```json
{
  "display": "<Option Set Name>",
  "values": {
    "<value_id>": { ...OptionValue... }
  },
  "attributes": {
    "<attribute_id>": { ...OptionAttribute... }
  }
}
```

## Option value schema (`values.<value_id>`)

Required by generated schema:
- `display`

Intrinsic option value fields:
- `comment`
- `db_value`
- `deleted`
- `display`
- `sort_factor`

Interpretation notes:
- `display` is the editor-facing label.
- `db_value` is often used as a stable serialized value.
- Other keys on option values are app/domain-specific metadata, not Bubble catalog fields.
- Treat unknown option value keys as valid extension points and preserve them when editing.

## Option attribute schema (`attributes.<attribute_id>`)

Option attribute fields:
- `comment`
- `creation_source`
- `deleted`
- `display`
- `value`

`attributes.<id>.value` type families include:
- `boolean`
- `date`
- `image`
- `number`
- `text`
- `option.*`
- `list.option.*`
- `list.text`

## Dynamic map behavior

- `values` is an object map keyed by value IDs.
- `attributes` is an object map keyed by attribute IDs.
- Neither is an array.

## Workspace editing guidance

Creation rules:
- New option sets should include at least `display` and `values` from the start.
- New option values should include at least `display`; add `db_value` when the app relies on a stable serialized value.
- New option attributes should include at least `display` and `value`.
- Use `buildprint utils generate-ids` when you need fresh IDs.

Safe write strategy:
- Edit the specific value or attribute entries you need instead of rewriting the entire option set unnecessarily.
- Rename option sets, values, and attributes by editing display fields while keeping existing map keys stable.
- Preserve unknown option value fields when updating existing entries.
- Preserve inline ordering metadata such as `sort_factor` unless you are intentionally changing option order.

Field-level source of truth:
- Schema registry paths: `schemas.optionSetSchema`, `schemas.optionValueSchema`, `schemas.optionAttributeSchema`
