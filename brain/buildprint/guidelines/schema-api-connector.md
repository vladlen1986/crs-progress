# Schema: API Connector
> Source: `buildprint guidelines get schema/api-connector` · Captured: 2026-07-17 (verbatim)

This topic documents API Connector JSON schema, auth configuration, secret handling, request/response typing, and exact mappings used by expressions/workflow actions.

## Filesystem and logical locations

- Worktree plugin file: `settings/api-connector/<plugin-id>/plugin.json`
- Worktree call file: `settings/api-connector/<plugin-id>/calls/<call-id>.json`
- Edit those files directly, then run `buildprint check` and `buildprint apply`.

Logical Bubble paths:
- Root: `settings.client_safe.apiconnector2`
- Group: `settings.client_safe.apiconnector2.<groupId>`
- Call: `settings.client_safe.apiconnector2.<groupId>.calls.<callId>`

## Mental model

1. A connector **group** defines service-level auth + shared headers/params.
2. Each **call** defines endpoint/method/body/return typing + whether it is `data` or `action`.
3. Each call has parameter maps (`params`, `url_params`, `body_params`, `headers`) keyed by internal row id.
4. Bubble compiles those rows into dynamic property keys used by:
- `GetDataFromAPI` expressions (`provider = apiconnector2.<groupId>.<callId>`)
- workflow action types (`apiconnector2-<groupId>.<callId>`).

## First-time setup workflow (zero to working call)

Use this sequence when an agent is creating or restructuring API Connector files in the worktree.

1. Create/confirm the connector group:
- path: `settings.client_safe.apiconnector2.<groupId>`
- minimum shape: `{ "human": "<display name>", "calls": {} }`
- set `auth` and auth-specific fields before wiring calls.

2. Add a call skeleton under the group:
- path: `settings.client_safe.apiconnector2.<groupId>.calls.<callId>`
- required keys: `name`, `method`, `url`, `publish_as`
- include parameter maps as objects: `headers`, `params`, `url_params`, `body_params`
- add `data_type`/`body_type`/`body` as needed for endpoint shape.

3. Add parameter rows (this drives dynamic binding keys):
- each map row needs a stable row id and a human `key` label
- dynamic workflow/expression property suffixes are derived from row `key`, not row id.

4. Wire call usage:
- datasource usage: `GetDataFromAPI.properties.provider = apiconnector2.<groupId>.<callId>`
- workflow action usage: `type = apiconnector2-<groupId>.<callId>`.

5. Ensure response typing is usable:
- verify call `types` includes every `_api_c2_*` message your expressions use
- for list-of-object responses, define both root list field and nested item type entry.

6. Treat initialization as a separate step:
- after structural call edits, assume response `types` may be stale until reinitialized.

Minimal call skeleton example:
```json
{
  "name": "Get skills",
  "method": "get",
  "url": "https://example.com/skills",
  "publish_as": "data",
  "data_type": "JSON",
  "headers": {},
  "params": {},
  "url_params": {},
  "body_params": {}
}
```

## Group schema

Required by generated schema:
- `human`
- `calls`

Known group-level keys:
- `add_basic_authentication`
- `add_offline`
- `add_to_header`
- `appid`
- `appid_test`
- `appsecret`
- `appsecret_test`
- `auth`
- `auth_url_params`
- `authentication_url`
- `body`
- `calls`
- `calls.token_call.url`
- `cert_file`
- `email_path`
- `generate_token_from_code_uri`
- `has_token_data`
- `header_key`
- `human`
- `id_path`
- `iss`
- `key_file`
- `oauth_user_data_call`
- `password`
- `private_key`
- `private_key_test`
- `scope`
- `server_redirect`
- `shared_headers`
- `shared_params`
- `tested`
- `token_data_type`
- `token_endpoint`
- `token_param_name`
- `username`

Group notes:
- auth settings are spread across fields like `auth`, `token_endpoint`, `appid`, `appsecret`, `private_key*`, `cert_file`, `key_file`
- `shared_headers` and `shared_params` apply across calls in the group
- `calls` is an object map keyed by call id

### Auth method enum (`group.auth`)

- `none`
- `private_key_url`
- `private_key_header`
- `basic_auth`
- `oauth2_pw`
- `oauth2_user`
- `oauth2_custom`
- `jwt`
- `cert_key`

### Auth mode field patterns

- `none`
  no extra auth fields required.
- `private_key_url` / `private_key_header`
  common fields: `token_param_name`, `private_key`, optional `private_key_test`.
- `basic_auth`
  fields: `username`, `password`.
- `oauth2_pw`
  fields: `username`, `password`, `token_endpoint`.
- `oauth2_user`
  fields: `appid`, `appsecret`, optional test variants (`appid_test`, `appsecret_test`), `scope`, `authentication_url`, `generate_token_from_code_uri`, `oauth_user_data_call`, `id_path`, `email_path`, `token_param_name`/`header_key`, `add_to_header`, `add_basic_authentication`, `add_offline`, `token_data_type`, `server_redirect`, optional `auth_url_params`.
- `oauth2_custom`
  token endpoint call is modeled via `calls.token_call.*` plus token-call `headers` and `body/body_params`.
- `jwt`
  fields: `scope`, `iss`, `generate_token_from_code_uri`, `private_key`.
- `cert_key`
  fields: `cert_file`, `key_file`.

## Call schema

Required by generated schema:
- `name`
- `method`
- `url`
- `publish_as`

Known call-level keys:
- `body`
- `body_params`
- `body_type`
- `data_type`
- `data_container`
- `doc_link`
- `get_headers`
- `headers`
- `in_browser`
- `initialized`
- `is_list`
- `method`
- `must_reinitialize`
- `name`
- `no_types`
- `params`
- `publish_as`
- `rank`
- `ret_btype`
- `ret_value`
- `should_reinitialize`
- `types`
- `url`
- `url_cant_be_private`
- `url_private`
- `url_params`
- `wrap_error`

Common value conventions:
- `method`: `get`
- `method`: `post`
- `method`: `put`
- `method`: `patch`
- `method`: `delete_method`
- `publish_as`: `data`
- `publish_as`: `action`
- `data_type`: `JSON`
- `data_type`: `XML`
- `data_type`: `stream`
- `data_type`: `image`
- `data_type`: `number`
- `data_type`: `text`
- `data_type`: `file`
- `data_type`: `empty`
- `body_type`: `json` (for methods with body)
- `body_type`: `form_data` (for methods with body)
- `body_type`: `plain_text` (for methods with body)

Call behavior flags:
- `in_browser`: browser-side execution flag; actual eligibility is evaluated by Bubble runtime/editor state (not just this field).
- `get_headers`: wraps response so headers are included in typed output.
- `wrap_error`: wraps response so error envelope fields are typed/output.
- `initialized`, `should_reinitialize`, `must_reinitialize`: initialization lifecycle state.

### URL privacy and browser execution (`url_private`, `url_cant_be_private`, `in_browser`)

Do not rely on a single-field rule for these flags. Bubble evaluates URL/privacy behavior from combined call + group configuration and editor/runtime context.

Recommended safe defaults when editing connector files:
- Fixed workflow/server endpoints: set `url_cant_be_private: true`.
- Use `url_private: true` only when the URL must remain private/runtime-supplied; then keep URL parameter rows private as well.
- Do not set `url_private: true` and `url_cant_be_private: true` together.
- Treat `in_browser` as opt-in and verify behavior in editor after changes (initialization state + action input shape).

## Parameter map schemas (critical)

Every call can include up to four parameter maps:
- `headers`
- `params`
- `url_params`
- `body_params`

Each map is an object keyed by internal row id, not an array.

Row field variants observed across apps:
- `key`
- `value`
- `private`
- `visibility`
- `doc`
- `allow_blank`
- `optional`
- `querystring`
- `binary_file`
- `long_text`

Most common row schema:
```json
{
  "<row_id>": {
    "key": "Authorization",
    "value": "Bearer ...",
    "private": true,
    "allow_blank": false,
    "optional": true
  }
}
```

Implementation notes:
- `key` is the label Bubble uses to generate flattened action/expression property names.
- internal map key (`<row_id>`) is not used directly by action binding property names.
- rows may contain optional transport flags like `querystring`, `binary_file`, `long_text` depending on call/body config.

### Dynamic placeholder extraction

Bubble derives certain param maps directly from template markers:
- URL placeholders use brackets: `[paramName]` -> `url_params` row(s).
- JSON body placeholders use angle brackets: `<paramName>` -> `body_params` row(s).
- XML/raw body placeholders use `_*_paramName_*_` -> `body_params` row(s).

### Request assembly rules (runtime-relevant)

- `url_params` are interpolated into URL template.
- `headers` become HTTP headers (validated).
- `params` are sent as querystring or request payload depending on method/body settings and row flags (`querystring`, `binary_file`).
- for JSON body calls, Bubble can auto-inject `content-type: application/json` when not already present.
- `shared_headers` / `shared_params` from group are merged into each call request.

## Private keys and secret handling

Treat these as secret-bearing fields:
- group auth fields like `private_key`, `private_key_test`, `appsecret`, `appsecret_test`, `password`, `cert_file`, `key_file`
- row-level entries with `private: true` (or secret visibility in plugin variants)
- shared secret rows (`shared_headers`, `shared_params`)

Important export/edit behavior:
- existing connector files can contain **redacted private rows** (for example only `{ "private": true }` stubs).
- missing `value` in a private row does not imply empty/unused secret.
- do not normalize/delete private stubs just because `key`/`value` is absent in export.

Safe secret edits:
- patch exact leaf keys only (for example `...auth`, `...private_key`, `...token_param_name`).
- preserve existing row ids when changing private/public flags.
- avoid replacing whole group/call objects when touching secrets.

## API Connector as data source (`GetDataFromAPI`)

Expression root shape:
```json
{
  "type": "GetDataFromAPI",
  "properties": {
    "provider": "apiconnector2.<groupId>.<callId>",
    "params_Query": { "type": "TextExpression", "entries": { "0": "foo" } },
    "url_params_version": { "type": "TextExpression", "entries": { "0": "v1" } },
    "headers_Authorization": { "type": "TextExpression", "entries": { "0": "Bearer ..." } }
  },
  "next": { "type": "Message", "name": "_api_c2_body.items" }
}
```

Provider contract:
- `properties.provider` must be exact: `apiconnector2.<groupId>.<callId>`
- parameter property keys follow flattened patterns (`params_*`, `url_params_*`, `body_params_*`, `headers_*`).

## How API Connector schema maps into actions

Call objects generate action `type` values with this pattern:
- `apiconnector2-<groupId>.<callId>`

For those actions, Bubble flattens parameter rows into dynamic `properties` keys:
- `params_<row.key>`
- `url_params_<row.key>`
- `body_params_<row.key>`
- `headers_<row.key>`

Key behavior you must preserve:
- suffix comes from row `key` label
- spaces/case are preserved (for example `params_Request Type`)
- never rename these keys unless connector row labels are changed too
- there may also be generated keys like `url` and `body` for calls that expose dynamic endpoint/body inputs; preserve unknown keys in existing actions.

Binding-key escaping/encoding variants (important when matching existing app JSON keys):
- Bubble/Firebase encoding variant: `&` -> `&&`, then `.` -> `&1`, `$` -> `&2`, `#` -> `&3`, `[` -> `&4`, `]` -> `&5`, `/` -> `&6`.
- App JSON escaping variant: `.` -> `^{p1}`, `^` -> `^{c1}`.
- Combined variant can appear (App JSON escaping applied to a Firebase-encoded key).
- Treat these as equivalent key-family variants of the same row label when patching or linting stale bindings.

Body-template JSON safety rule for `body_params_*`:
- inspect call template at `settings.client_safe.apiconnector2.<groupId>.calls.<callId>.body`
- if JSON placeholder is unquoted (for example `"customer_id": <customerId>`), usually end the bound expression chain with Message `format_json_encode` (`:formatted as JSON-safe`)
- exception: when bound expression clearly returns JSON number/boolean, unquoted value is valid; use judgment
- if placeholder is already quoted (`"customer_id": "<customerId>"`), `format_json_encode` remains recommended for escaping but is not structurally required

## Reading API Connector responses in workflows/expressions

Workflow-action output is typically read from `PreviousStep`:
```json
{
  "type": "PreviousStep",
  "properties": { "action_id": "<apiActionId>" },
  "next": { "type": "Message", "name": "_api_c2_body.response.token" }
}
```

Common response message names:
- `_api_c2_body`
- `_api_c2_body.<nested.path>`
- `_api_c2_headers` and `_api_c2_headers.<header-name>` (when headers are included)
- `_api_c2_error` and `_api_c2_error.<path>` (when wrapped errors are enabled)
- `_api_c2_returned_an_error` (boolean)
- `_api_c2_id` (main returned object id token when present in type model)

### Response typing format in call JSON (`call.types`)

- `call.types` is stored as a **JSON string** in the call file (not a native object).
- treat `call.types` as an atomic value at edit time: update the full `types` value on the call file rather than trying to patch descendants.
- do not patch descendants under `...types...` (for example `...types.<groupId>.<callId>.fields...`) because `types` may be plain text/sentinel/non-JSON in some apps.
- decoded object is keyed by `<groupId>.<callId>`.
- each entry contains a `fields` map where each key is a message name (usually `_api_c2_*`).
- with Bubble's stringified JSON parsing enabled, fields parsed out of JSON string values are represented in the same `types` JSON string as nested API type entries; treat them like normal structured response fields.

Typical decoded structure:
```json
{
  "<groupId>.<callId>": {
    "caption": "<call name>",
    "fields": {
      "_api_c2_body.status": {
        "caption": "body status",
        "path": ["body", "status"],
        "ret_btype": "text",
        "sample_value": "success"
      },
      "_api_c2_returned_an_error": {
        "caption": "returned_an_error",
        "path": ["returned_an_error"],
        "ret_btype": "boolean",
        "sample_value": null
      }
    }
  }
}
```

### Response typing contract for structured/list responses

When a response contains a list of structured objects (for example `body.skills`), model both levels:

1. Root field on the call entry:
```json
"_api_c2_body.skills": {
  "path": ["body", "skills"],
  "ret_btype": "list.api.<groupId>.<callId>.body.skills"
}
```

2. Nested type entry describing each list item:
```json
"<groupId>.<callId>.body.skills": {
  "fields": {
    "_api_c2_skill_name": { "path": ["skill_name"], "ret_btype": "text" },
    "_api_c2_content": { "path": ["content"], "ret_btype": "text" }
  }
}
```

Practical rules:
- prefer typed `_api_c2_body.*` fields over raw body text fields when you need downstream formatting/iteration (for example `format_as_text` over a list).
- if a workflow/expression references `_api_c2_*` fields, ensure those exact message names exist under the call `types` map.
- after changing endpoint response shape, refresh/reinitialize so `types` matches the real payload contract.

Related call-level return fields:
- `ret_value`: main return type id for the call.
- `is_list`: whether main return is list.
- `no_types`: true when call returns non-editable primitive/asset style response and no field map is used.

Response-shape rules to remember:
- `get_headers` or `wrap_error` force structured body/header envelope typing.
- primitive calls (`text`, `number`, `image`, `file`, `empty`) without wrappers may not generate rich `_api_c2_body.*` field maps.
- after meaningful request/response changes, calls may need reinitialization to refresh `types` and downstream message availability.

## Reinitialization and type freshness playbook

When to treat `types` as stale:
- `url`, `method`, `data_type`, `body_type`, or `body` changed
- parameter rows changed (`headers`, `params`, `url_params`, `body_params`)
- response envelope behavior changed (`get_headers`, `wrap_error`).

Practical handling guidance:
- if `must_reinitialize` or `should_reinitialize` is true, treat call `types` as provisional/stale for agent reasoning.
- after structural edits, prefer reinitialization over hand-authoring a large `types` tree.
- if you must edit `types` manually, build the complete final value and set `...calls.<callId>.types` in one write; then reinitialize as soon as possible.

## End-to-end example (call + workflow read path)

A typical flow for list responses:
1. Action executes with workflow action `type = apiconnector2-<groupId>.<callId>`.
2. Later expression reads `PreviousStep` result.
3. Expression traverses `_api_c2_body.skills` then formats each list item using `_api_c2_skill_name` / `_api_c2_content`.

Workflow read-shape example:
```json
{
  "type": "PreviousStep",
  "properties": { "action_id": "<apiActionId>" },
  "next": {
    "type": "Message",
    "name": "_api_c2_body.skills",
    "next": {
      "type": "Message",
      "name": "format_as_text"
    }
  }
}
```

## Agent validation checklist after API Connector edits

1. Reference integrity:
- `GetDataFromAPI.properties.provider` is exactly `apiconnector2.<groupId>.<callId>`
- workflow action `type` is exactly `apiconnector2-<groupId>.<callId>`.

2. Binding-key integrity:
- no stale-parameter warnings (`workflow_api_connector_stale_parameter_binding`, `datasource_api_connector_stale_parameter_binding`).

3. JSON body safety:
- no `workflow_api_connector_body_param_missing_json_encode` warning unless unquoted placeholder is intentionally numeric/boolean.

4. Response typing integrity:
- every `_api_c2_*` message used in expressions exists in call `types`
- list-of-object responses expose both root list `ret_btype` and nested item field map.

5. Schema-string sanity:
- `types`, `json_paths`, `data_container`, `main_lists` are parseable JSON strings when present
- lint is warning-level for malformed JSON in these fields, but treat as high-priority correctness issues for automation.

## Endpoint parameter interplay with workflow schemas

For API workflows (not connector calls), parameter definitions live in workflow JSON:
- `api.<workflowId>.properties.parameters.<index>`

Scheduling/binding keys in actions then use:
- `_wf_param_<escaped_parameter_key>` from `properties.parameters.*.key`, not the parameter row `param_id`
- escape rule for parameter keys: `.` -> `^{p1}`, `^` -> `^{c1}`

This is separate from API Connector flattened `params_*` keys.

## Safe edit strategy

1. Edit the specific plugin or call file you need instead of replacing the whole connector surface at once.
2. Keep existing parameter maps and row ids stable whenever possible.
3. Preserve private/redacted rows as-is unless explicitly changing that row.
4. When changing a row `key`, update all dependent flattened keys in actions/expressions.
5. Treat `types` as a string field updated in full; do not write partial descendants under `types`.
6. Prefer reinitialization after major call changes instead of hand-authoring large `types` maps.
7. Preserve unknown/plugin-added keys on groups/calls/rows.

## Workspace editing guidance

Creation rules:
- New connector groups should include at least `human` and `calls`.
- New calls should include at least `name`, `publish_as`, `method`, `url`, `headers`, `params`, `url_params`, and `body_params`.
- Keep row ids stable once workflows or expressions depend on their flattened keys.

Use narrow file edits for map rows and auth fields, then validate with `buildprint check` before `buildprint apply`.

## Source anchors

- API group/call schema refs: `schemas.apiConnectorGroupSchema`, `schemas.apiConnectorCallSchema`
- Dynamic-expression/action bindings: see `schema/dynamic-expression` and `schema/action`
