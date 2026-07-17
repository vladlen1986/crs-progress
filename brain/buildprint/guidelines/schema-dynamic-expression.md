# Schema: Dynamic Expression
> Source: `buildprint guidelines get schema/dynamic-expression` · Captured: 2026-07-17 (verbatim)

Canonical practical guide for building, patching, and debugging Bubble dynamic-expression JSON.
Use this as the canonical dynamic-expression guideline.

## Mental model

A Bubble expression is not just a JSON blob. In the common case it is:
- datasource root -> one or more chained `Message` nodes -> final value
- plus nested payload subexpressions in places such as `args` or `TextExpression.entries`

Always reason about both the expression itself and the destination contract.
- The expression tells you what value is produced.
- The destination slot tells you what value shape is allowed there.
- An expression can be structurally valid yet still wrong for the destination.

Validation outcomes:
- `valid`: the structure is sound and the semantics fit the destination.
- `invalid`: there is a concrete structural or semantic mismatch.
- `unknown`: the checker lacks enough app/spec context to prove the answer safely.

Treat structural errors and semantic errors as different classes of problem:
- Structural: wrong node shape, bad map container, missing `type`, malformed `next`, invalid `TextExpression.entries` layout.
- Semantic: datasource unavailable here, message not valid on upstream type, arg type mismatch, final type wrong for destination slot.

## 1) Runtime node model

Parser dispatch order (`new_expression2`):
1. empty json -> Empty
2. `type: "Empty"` -> Empty
3. `type: "Message"` -> Message
4. `type: "TextExpression"` -> TextExpression
5. `type: "GeoAddress"` -> GeoAddress
6. any other `type` string -> DataSource
7. object without `type` -> ObjectLiteral expression
8. primitive -> Literal

Meaning: valid expression trees are not only `DataSource -> Message` chains; payload-style fields such as `args` can contain literal/object-expression nodes, but editor-facing slots usually use Bubble's canonical expression-node shapes.

## 2) General JSON form/schema

Expression JSON is a union, not a single shape, but slot constraints still matter:
```ts
type ExpressionNode =
  | { type: "Empty" }
  | { type: "GeoAddress"; val: unknown }
  | { type: "TextExpression"; entries: Record<string, string | ExpressionNode> }
  | { type: "Message"; name: string; properties?: object; args?: Primitive | ObjectLiteral | ExpressionNode; next?: ExpressionNode }
  | { type: DataSourceType; properties?: object; next?: ExpressionNode }
  | ObjectLiteral // object without `type` (common in payload-style fields, not the normal canonical form for text/condition roots or TextExpression entries)
  | Primitive; // string | number | boolean | null

type Primitive = string | number | boolean | null;
type ObjectLiteral = { [key: string]: Primitive | ObjectLiteral | ExpressionNode };
```

Some raw Bubble exports include metadata keys such as `is_slidable`, `moved_to_top`, `said`, and `is_dynamic`.
The shredded branch workspace often omits editor-only raw metadata keys. Do not invent them manually. If an existing file already contains one, preserve it unless you intentionally mean to remove it.

Canonical minimal examples:

DataSource + field access:
```json
{
  "type": "CurrentUser",
  "next": { "type": "Message", "name": "email" }
}
```

Comparator message with arg:
```json
{
  "type": "GetElement",
  "properties": { "element_id": "input1" },
  "next": {
    "type": "Message",
    "name": "get_data",
    "next": { "type": "Message", "name": "equals", "args": "Approved" }
  }
}
```

Text interpolation:
```json
{
  "type": "TextExpression",
  "entries": {
    "0": "Hello ",
    "1": { "type": "CurrentUser", "next": { "type": "Message", "name": "firstname_text" } },
    "2": "!"
  }
}
```

ObjectLiteral payload example (safe pattern for payload-style fields, not TextExpression entries):
```json
{
  "model": "gpt-4",
  "temperature": 0.2,
  "prompt": { "type": "TextExpression", "entries": { "0": "Summarize this." } }
}
```

## 3) Structural invariants (do not break)

- `next` is a linked list edge, not an array.
- Canonical chain direction is `DataSource -> Message -> Message ...`.
- Every `next` hop in a chain must be a full typed expression node. For message hops, write `{ "type": "Message", "name": ... }`, not a bare `{ "name": ... }` fragment.
- Chain links belong on the node's top-level `next` field, never under `properties.next`.
- `TextExpression.entries`, `constraints`, `arguments`, `parameters`, and `return_types` are object maps keyed by strings.
- Sparse numeric keys are valid and common outside search/filter constraint maps (`"0"`, `"2"`, ...).
- `args` is polymorphic: primitive, object literal, or full expression node.
- Editor-facing roots such as `...properties.text` and `...condition` should normally be canonical expression nodes (`TextExpression`, datasource roots, `Message` chains, etc), not plain object literals.
- Preserve unknown keys unless you have clear runtime proof they are invalid.
- Preserve metadata fields (`is_slidable`, `moved_to_top`, `said`, `is_dynamic`) when patching existing nodes.

## 4) Core root datasources (non-plugin)

- `ArbitraryText`
- `AppText`
- `DateTime`
- `CurrentUser`
- `PageData`
- `CurrentWorkflowItem`
- `APIEventParameter`
- `PreviousStep`
- `GetElement`
- `OptionValue`
- `OneOptionValue`
- `AllOptionValue`
- `Search`
- `GlobalExpression`
- `GlobalExpressionParameter`
- `ThisElement`
- `ElementParent`
- `ElementAncestor`
- `CurrentPageItem`
- `CurrentDataItem`
- `OldDataItem`
- `GetParamFromUrl`
- `GetDataFromAPI`
- `AlgoliaSearch`
- `OneIapItem`
- `AllSubscriptionGroups`
- `AppSetting`
- `Formulas`
- `InjectedValue`
- `PrimitiveLiteral`
- `Breakpoint`
- `DefaultBreakpoint`
- `CurrentCellsIndex`
- `GetMouseData`
- `Dehydrated`

Plugins can add additional datasource root `type` values.

Minimal property-requiring datasource shapes:
```json
{ "type": "AppSetting", "properties": { "setting_name": "home_url" } }
{ "type": "GetElement", "properties": { "element_id": "<element_id>" } }
{ "type": "GetParamFromUrl", "properties": { "type": "parameter", "parameter_name": { "type": "TextExpression", "entries": { "0": "slug" } }, "value": "text" } }
{ "type": "OptionValue", "properties": { "option_set": "option.<option_set_id>", "option_value": "<db_value>" } }
{ "type": "OneOptionValue", "properties": { "option_set": "option.<option_set_id>", "option_value": "<db_value>" } }
{ "type": "PageData", "properties": { "name": "Website Home" } }
```

Notes:
- `AppSetting.properties.setting_name` is required. Bubble's generated validation catalog treats it as a literal text key rather than a static enum.
- `GetParamFromUrl.parameter_name` is only required when `properties.type` is omitted or set to `parameter`; `properties.value` selects the returned Bubble type.
- `OptionValue` and `OneOptionValue` require `properties.option_set`; `option_value` is conditional and may use Bubble's all-options sentinel where supported.
- `PageData` requires `properties.name`; use translated display names such as `Website Home` or `Current Date/Time`.
- `ArbitraryText`, `DateTime`, and `Search` may use optional `properties.name` as an editor-only display label.

Known datasource `properties` keys:
- `name`
- `action_id`
- `element_id`
- `option_set`
- `global_expression_id`
- `param_id`
- `type`
- `value`

## 5) Message nodes

Schema:
```json
{
  "type": "Message",
  "name": "<operator_or_field_id>",
  "properties": { ... },
  "args": <expression_or_primitive>,
  "next": { ... }
}
```

Rules:
- `name` must be valid for the previous node's output type.
- Some `name` values are internal field IDs, not display labels.
- Comparators (`equals`, `greater_than`, etc) are Message nodes too.
- `find_replace` may use optional `properties.name` as an editor-only display label, separate from the message's top-level `name`.

Known message `properties` keys:
- `name`

Common first message after `GetElement`:
- single-item containers -> `get_group_data`
- list containers -> `get_list_data`
- value inputs -> `get_data`
- checkbox -> `get_data` or `get_not_data`

## 6) Search and filtered constraints

Constraint entry schema:
```json
{
  "key": "<field_or_special_key>",
  "constraint_type": "<operator>" | { "type": "Empty" },
  "value": <expression_or_primitive>
}
```

Special keys:
- `_advanced_search_constraint`
- `_all`
- `_id`
- `_dynamic_sort_field`
- `_random_sorting`
- `_unsorted`

Core operators:
- `contains`
- `not contains`
- `equals`
- `not equal`
- `greater than`
- `gte`
- `less than`
- `lte`
- `text contains string`
- `not text contains string`
- `text contains`
- `not text contains`
- `empty`
- `not empty`
- `in`
- `not in`
- `is_empty`
- `is_not_empty`
- `contains_all_fields`
- `advanced_search_constraint`
- `email_equals`
- `email_contains_string`
- `geographic_search`
- `range_contains`
- `range_contains_point`
- `range_contained_by`
- `range_overlaps`
- `range_greater_than`
- `range_greater_than_point`
- `range_less_than`
- `range_less_than_point`

Compatibility rules:
- `in` / `not in` expect list values.
- `contains_all_fields` expects text value.
- `Search` constraints are database-search constraints. Use DB field keys plus supported search operators only.
- `_advanced_search_constraint` / `advanced_search_constraint` belongs to the list `filtered` operator, where it expects a yes/no expression value. Do not put it directly inside a `Search.properties.constraints` row.
- Constraint map keys in `Search.properties.constraints` and list `filtered.properties.constraints` must be contiguous numeric strings from `0` so Bubble does not render blank constraint rows.
- `range_*_point` expects scalar inner type of the range (number/date).
- Search datasource-level fields such as `type_to_find` and `ignore_empty_constraints` stay on `Search.properties`, not inside individual constraint rows.
- Individual constraint rows should contain only `key`, `constraint_type`, and `value` (plus existing Bubble metadata if already present in raw JSON).
- For `A OR B` where A and B are different predicates on the searched item, use two `Search` expressions joined with the list operator `merged_with`. Repeat the shared AND constraints in both searches and put the differing predicate in each branch.
- Use `Search -> filtered` only when an in-memory/client-side row predicate is intentional; prefer database `Search` constraints or `merged_with` searches when Bubble can express the condition in the database search.

Search OR recipe:
```json
{
  "type": "Search",
  "properties": { "type_to_find": "custom.thing", "constraints": { "0": { "...shared": "..." }, "1": { "...predicate_a": "..." } } },
  "next": {
    "type": "Message",
    "name": "merged_with",
    "args": {
      "type": "Search",
      "properties": { "type_to_find": "custom.thing", "constraints": { "0": { "...shared": "..." }, "1": { "...predicate_b": "..." } } }
    }
  }
}
```

## 7) TextExpression

Schema:
```json
{
  "type": "TextExpression",
  "entries": {
    "0": "hello ",
    "1": { "type": "CurrentUser", "next": { "type": "Message", "name": "firstname_text" } },
    "2": "!"
  }
}
```

Rules:
- `entries` is an object map, not an array.
- keys are numeric strings; sparse keys are valid.
- values are `string | expressionNode`.
- plain object literals are not the normal canonical form for `entries.<n>`; prefer literal strings or canonical Bubble expression nodes.
- numeric-string siblings such as `TextExpression.1` are invalid; entry children must stay inside `entries`.
- safe mutation default: append at `maxKey + 1` instead of renumbering existing keys.
- Do not use `TextExpression` as the top-level value for expression-editor slots. Use it only where Bubble uses a text composer, or nested under a datasource such as `ArbitraryText.properties.arbitrary_text`.

## 8) Workflow/custom-event/API parameter wiring

Workflow object paths:
- `api.<workflowId>`
- `pages.<pageId>.workflows.<workflowId>`
- `element_definitions.<reusableId>.workflows.<workflowId>`

Parameter definition variants at `...properties.parameters.<index>`:
- Variant A: `{ key, value, in_url, is_list, optional }`
- Variant B: `{ param_id, param_name, btype_id, is_list, optional }`

Expression roots used to read parameters:
- `CurrentWorkflowItem.properties.param_id` (canonical)
- `APIEventParameter.properties.key` for API workflow parameters; use `param_id` only as fallback when no key is available

Custom-event action argument shape (`TriggerCustomEvent`, `TriggerCustomEventFromReusable`, `TriggerBackendCustomEvent`, `ScheduleCustom`):
```json
{
  "properties": {
    "arguments": {
      "0": {
        "param_id": "<eventParamId>",
        "arg_value": { ...dynamic expression... }
      }
    }
  }
}
```

Custom-event argument values are expression-editor slots:
- for one dynamic text value, set `arg_value` to the direct expression root, e.g. `Search -> first_element -> field` or `PreviousStep -> return_id`.
- for simple dynamic concatenation, prefer a text expression chain such as `PreviousStep -> return_id -> append(args = ...)`.
- for mixed literal/dynamic text, use an `ArbitraryText` root whose `properties.arbitrary_text` is a nested `TextExpression`.
- do not set top-level `arg_value.type = "TextExpression"`; Bubble's editor does not emit that form for custom-event arguments.

Schedule API actions (`ScheduleAPIEvent`, `ScheduleAPIEventOnList`):
- target workflow id: `properties.api_event`
- bound arg keys: `properties._wf_param_<escaped_parameter_key>` from the target workflow's `properties.parameters.*.key`, not `param_id`
- escape rule for parameter keys: `.` -> `^{p1}`, `^` -> `^{c1}`
- URL params (`in_url=true`) are excluded from `_wf_param_*` binding list in schedule-API editor flows.

## 9) API Connector expression wiring

Config paths:
- `settings.client_safe.apiconnector2.<groupId>.calls.<callId>`
- parameter maps: `params`, `url_params`, `body_params`, `headers`

Flattened action keys by row key:
- `_wf_param_<escapedApiWorkflowParameterKey>`
- `params_<apiParamKey>`
- `url_params_<apiParamKey>`
- `body_params_<apiParamKey>`
- `headers_<apiParamKey>`
- `_api_c2_<responsePathToken>`

JSON-safe rule for `body_params_*`:
- if placeholder is unquoted in JSON body template, end expression with Message `format_json_encode` unless value is clearly numeric/boolean JSON.

`GetDataFromAPI` response traversal message families:
- `_api_c2_body`
- `_api_c2_body.<nested.path>`
- `_api_c2_headers`
- `_api_c2_error`
- `_api_c2_returned_an_error`
- `_api_c2_id`

## 10) High-signal edit patterns

Group has content:
```json
{
  "type": "GetElement",
  "properties": { "element_id": "<groupId>" },
  "next": {
    "type": "Message",
    "name": "get_group_data",
    "next": { "type": "Message", "name": "is_not_empty" }
  }
}
```

Repeating group list not empty (count-based):
```json
{
  "type": "GetElement",
  "properties": { "element_id": "<repeatingGroupId>" },
  "next": {
    "type": "Message",
    "name": "get_list_data",
    "next": {
      "type": "Message",
      "name": "count",
      "next": { "type": "Message", "name": "greater_than", "args": 0 }
    }
  }
}
```

Boolean comparisons and combinators remain Message chains (`equals`, `not_equals`, `and_`, `or_`), with grouping expressed by nested `args` subexpressions (not parenthesis nodes).

## 10.5) Debugging order

When an expression edit fails, debug in this order:
1. Confirm the destination contract (`text`, yes/no, thing, list, API payload field, etc).
2. Confirm the root node kind and required properties.
3. Walk the chain one hop at a time and verify each `Message.name` against the upstream type.
4. Check nested `args` or `TextExpression.entries` subexpressions as their own expression nodes.
5. If the edit was a merge patch, look for stale siblings or stale `next` descendants that survived.

## 11) Safe edit checklist

Before patch:
1. Read the full local subtree from the workspace (not a pruned preview).
2. Identify expected destination type/btype.
3. Save original leaf JSON for rollback.

During patch:
1. Patch the narrowest leaf possible.
2. Keep key names exact for dynamic keys (`_wf_param_*`, `params_*`, etc).
3. Keep sparse map keys where Bubble already uses them, except compact search/filter constraint maps so their numeric keys remain contiguous. Do not hand-author hidden raw metadata keys that are absent from the public DSL.
4. Keep every chain hop typed (`type: "Message"` for message steps) and keep `next` at the node root.

After patch:
1. Condition expressions still resolve to boolean.
2. Comparator/operator and arg types still match.
3. Custom workflow parameter ids and API workflow parameter keys still match their definitions.
4. API connector flattened keys still match configured row labels.
5. Numeric-key maps (for example `entries`) still have sibling rows instead of nested child rows.

## Source anchors

- parser dispatch: `new_expression2`
- constructors: `RAW.Empty`, `RAW.TextExpression`, `RAW.DataSource`, `RAW.Message`
- root datasource registry: `core_datasources_default`
- workflow arg binding helper: `wf_params_from_properties`
- API action key prefix/escaping: `APIEvent_param_prefix`, `escape_app_json_key`
