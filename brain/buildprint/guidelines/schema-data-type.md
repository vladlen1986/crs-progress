# Schema: Data Type (`user_types`)
> Source: `buildprint guidelines get schema/data-type` · Captured: 2026-07-17 (verbatim)

This topic documents the canonical data type schema as it appears in the Buildprint worktree.
It is derived from Bubble editor schema metadata and the generated schema registry.

## Filesystem and logical locations

- Worktree file: `data_types/<type-id>/type.json`
- Data type object: `user_types.<type_id>`
- Field object: `user_types.<type_id>.fields.<field_id>`

## Data type object schema

Data type top-level keys:
- `comment`
- `deleted`
- `display`
- `exposed_api`
- `fields`
- `privacy_role`

Required by generated schema:
- `display`
- `fields`

Canonical shape:
```json
{
  "display": "Project",
  "fields": {
    "title_text": { ...DataTypeField... }
  },
  "privacy_role": {
    "<rule_id>": { ...PrivacyRule... }
  }
}
```

## Data field schema (`fields.<field_id>`)

Data field keys:
- `comment`
- `default_val`
- `deleted`
- `display`
- `value`

Required by generated schema:
- `display`
- `value`

`value` type design (highly important):
- primitive: `text`, `number`, `boolean`, `date`, `file`, `image`, `user`
- single reference: `custom.<type>`, `option.<option_set>`, `api.<group>.<call>[.<path>]`
- list reference: `list.custom.<type>`, `list.option.<option_set>`, `list.text`, `list.user`, `list.image`

Bubble supports many additional `value` variants, including:
- API connector return references (`api.apiconnector2...`)
- many custom type references (`custom.<type>`, `list.custom.<type>`)
- option sets (`option.<option_set>`, `list.option.<option_set>`)

## Privacy rules (`privacy_role`)

Privacy rule fields:
- `comment`
- `condition`
- `display`
- `permissions`

`permissions` object fields:
- `auto_binding`
- `create_api`
- `delete_api`
- `modify_api`
- `search_for`
- `view_all`
- `view_attachments`
- `binding_fields`
- `non_filterable_fields`
- `view_fields`

## Dynamic map behavior

- `fields` is an object map keyed by field IDs.
- `privacy_role` is an object map keyed by rule IDs.
- Neither is an array.

## Workspace editing guidance

Creation rules:
- New data types should include at least `display` and `fields` from the start.
- New field entries should include at least `display` and `value`.
- If an `id` field is present on `user_types.<type_id>`, it must be distinct from `<type_id>`.
- Use `buildprint utils generate-ids` when you need fresh IDs.

Safe write strategy:
- Edit the specific file entries you need and avoid broad rewrites of unrelated fields.
- Preserve unknown custom metadata fields in data types and privacy rules.
- Rename a field by editing its `display` value and keeping the existing `fields.<field_id>` key stable.
- Changing a `fields.<field_id>` key changes the field identity and appears as delete + add in the worktree.

Field-level source of truth:
- Schema registry paths: `schemas.dataTypeSchema`, `schemas.dataTypeFieldSchema`
