# Retrieving Database Data
> Source: `buildprint guidelines get data/retrieving-database-data` · Captured: 2026-07-17 (verbatim)

Live database records are outside the branch workspace. Use this path when the task depends on current Bubble data rather than app structure.

## Decision rule

- Use the worktree for schema, UI, workflows, API connector config, and logic structure.
- Use data-access tooling only when you need real records, counts, or aggregates from the app database.
- Start narrow. Confirm one type, one field, or one representative record before widening the query.

## MCP tools to use

Use the Buildprint MCP data tools; database records are not represented in the CLI branch workspace.

- `search_data`: use when you need to find records. Pass `appId`, `version` (`live`, `test`, or a branch/version id), a user-visible `description`, `type`, `constraints`, optional `sorts_list`, `from`, and `n`. Use `type: "user"` for Bubble's built-in User type and `type: "custom.<type_id>"` for custom data types.
- `fetch_data`: use when you already have Bubble unique IDs and need the full records. Pass `appId`, `version`, a user-visible `description`, and `ids` as a real array of unique ID strings.
- `aggregate_data`: use for counts and grouped/aggregate answers without pulling full records. Pass one or more aggregate payloads with `type`, optional `constraints`, and `aggregate.fns`.

Constraint construction rules:
- Each constraint must be a flat object: `{ key, constraint_type, value? }`.
- The `constraints` field for `search_data` / `aggregate_data` is an array, not the object-map shape used inside Bubble app JSON `Search` expressions.
- Treat constraints as flat AND filters. Do not send nested boolean groups, `and`, or `or` operators from these tools.
- Use the exact Bubble field key for `key` (`status_text`, `owner_custom_user`, `members_list_user`), not the field's display label.
- Supported special keys: _id, Unique ID, Created Date, Modified Date, Created By, Slug, id_link, _all. On the built-in `user` type, `email` is also valid.
- Omit `value` only for emptiness operators (`is_empty`, `is_not_empty`, `empty`, `not empty`). Most other operators require a value.
- Do not send edit-app-only search-expression features such as `_advanced_search_constraint`, constraint object maps keyed by `0`/`1`, or `TextExpression` JSON values.
- For Thing references (and `_id`), pass the referenced Thing's bare unique ID string (for example `1778930231900x601786091393582200`). Buildprint applies the correct search encoding — reference columns are matched in Bubble's dehydrated `__LOOKUP__` form, while `_id` stays bare. A `__LOOKUP__`-prefixed value is also accepted.
- For `in` / `not in`, pass an array of primitive values or Bubble unique IDs. For `contains` on list fields, pass a single member value.
- For dates, Bubble commonly expects millisecond timestamps in msearch payloads (for example `Created Date` filters).

Operator compatibility:
- Scalar fields (text, number, date, boolean, references) -> `equals`, `not equal`, `in`, `not in`.
- Any scalar field (emptiness check) -> `is_empty`, `is_not_empty`.
- Comparable scalar fields excluding text (number/date) -> `gte`, `lte`.
- Comparable scalar fields including text (number/date/text) -> `greater than`, `less than`.
- List fields (`list.*`) -> `contains`, `not contains`, `empty`, `not empty`.
- Text fields -> `text contains`, `not text contains`, `text contains string`, `not text contains string`, `prefix_search`, `match_phrase_prefix`.
- Geographic address fields -> `geographic_search`.
- Range fields (`number_range`, `date_range`) -> `range_contains`, `range_contains_point`, `range_contained_by`, `range_overlaps`, `range_greater_than`, `range_less_than`, `range_greater_than_point`, `range_less_than_point`.
- Special keys (user `email`, `_all`) — see allow-lists in systemFields -> `email_equals`, `email_contains_string`, `contains_all_fields`.

Validity checklist:
- Confirm the exact `type` first: `user` for the built-in User table, otherwise `custom.<type_id>`.
- Confirm the field key and field kind from the app schema/export before writing the constraint. Do not guess suffixes or casing.
- Pick the operator from the compatibility rules below. If the field kind is unclear, use schema tools first instead of guessing.
- Start with one minimal constraint and `n: 1` or `n: 5` to validate the shape, then add more constraints and sorting.
- If you need OR logic, run multiple valid searches and merge the results client-side unless you already have a proven Bubble payload for that app.
- If Bubble rejects the query, simplify to one known field + one known-good operator before widening the search.

## Safe habits

- Confirm the exact Bubble type and field key before querying.
- Prefer one minimal query first to prove the shape.
- Be careful with list membership vs text search; they are not the same operation.
- Treat live and test environments as different datasets and state that explicitly in your reasoning.

## Pair data with the worktree

- Resolve field meanings from `data_types/` before explaining query results.
- Use the worktree to map opaque field keys and type IDs back to friendly names.
- Do not present raw internal keys to the user when a friendly label exists.
