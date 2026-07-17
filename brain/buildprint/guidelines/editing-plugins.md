# Bubble plugin development
> Source: `buildprint guidelines get editing/plugins` · Captured: 2026-07-17 (verbatim)

Fetch this before changing a plugin workspace: `buildprint guidelines get editing/plugins`.

A plugin workspace is a standalone Buildprint project: `buildprint plugin clone <pluginId>` materialises the plugin as editable files in `<dir>/plugin/`. There are no Bubble branches; the workspace always edits Bubble's draft/current plugin. `refs/bubble/plugin` is the last synced Bubble state and `refs/published/plugin` is the last applied state.

Use plugins when the app builder needs a reusable capability that belongs outside one Bubble app: a visual element, reusable workflow action, shared browser snippet, hosted asset, API connection, or server-side Node-backed operation. Keep app-specific screens, database models, and workflows in app workspaces instead.

## Official Bubble references

- [Building plugins](https://manual.bubble.io/account-and-marketplace/building-plugins) - overview of plugin types and publishing.
- [The plugin editor](https://manual.bubble.io/account-and-marketplace/building-plugins/the-plugin-editor) - editor tabs, autosave, and editor constraints.
- [General settings](https://manual.bubble.io/account-and-marketplace/building-plugins/general-settings) - metadata, shared HTML header, additional keys, and shared assets.
- [Adding API connections](https://manual.bubble.io/account-and-marketplace/building-plugins/adding-api-connections) - plugin API service/auth/calls.
- [Building elements](https://manual.bubble.io/account-and-marketplace/building-plugins/building-elements) - element fields, states, events, actions, code hooks, and test app flow.
- [Building actions](https://manual.bubble.io/account-and-marketplace/building-plugins/building-actions) - client-side and server-side workflow actions.
- [Loading data](https://manual.bubble.io/account-and-marketplace/building-plugins/loading-data) - Bubble's async data loading and rerun behavior in plugin code.
- [Updating to Plugin API v4](https://manual.bubble.io/account-and-marketplace/building-plugins/updating-to-plugin-api-v4) - Node runtime and async patterns for modern server-side actions.
- [Publishing and versioning](https://manual.bubble.io/account-and-marketplace/building-plugins/publishing-and-versioning) - license, version bump, and installed-app upgrade behavior.

## Standard workflow

1. `buildprint plugin clone <pluginId>` (once), then work inside the `plugin/` worktree.
2. Run `buildprint guidelines get editing/plugins` before planning the change.
3. Prefer `buildprint new plugin ...` for new primitives so IDs, ranks, and required skeleton files match Bubble's shape.
4. Edit the files that represent the change.
5. `buildprint check` before every apply. Plugin rules catch wrapper mistakes, broken fields, duplicate IDs, invalid metadata, and publish blockers.
6. `buildprint apply` pushes the full plugin draft/current version back to Bubble. If it reports drift, someone changed the plugin in Bubble; run `buildprint sync`, resolve any merge conflicts, re-check, and retry.
7. Publishing is separate from apply: `buildprint plugin publish -m "description"` (optionally `--major`, `--minor`, or `--patch`) validates readiness, then prints Bubble editor instructions for the plugin owner. Plugin collaborators cannot submit new versions through Bubble.

## File layout

- `plugin.json` - top-level fields and everything not modeled elsewhere. Treat unknown keys as load-bearing.
- `meta.json`, `dependencies.json`, `shared-keys.json`, `assets.json` - plugin metadata, API version flags, installer-facing keys, and shared hosted assets.
- `header/snippet.html` + `header/params.json` - the shared HTML header and its parameter definitions.
- `elements/<name>-<id>/` - one visual element: `element.json` (fields, layout), `initialize.js`, `update.js`, `preview.js`, `reset.js`, `rn_component.js` (code bodies), `states.json` + `states/<id>.js` (state definitions and initialization bodies), `events.json`, and `actions/<name>-<id>.{json,js}` (element actions).
- `actions/<name>-<id>/` - one standalone action: `action.json`, `client.js`, `server.js`, `package.json` (npm dependencies for server actions).
- `api/service.json` - the plugin's API connector service, including `token_call` when present. API calls live in `api/calls/<name>-<id>.json`.

## Bubble plugin primitives

- General metadata (`meta.json`): name, icon, category, platform, license, description, instructions, and website link. Use this for marketplace/search/readiness and user trust. Do not put runtime configuration here.
- Dependencies (`dependencies.json`): Bubble plugin API version and shared runtime flags such as jQuery. Use Plugin API Version 4 for new server-side work unless compatibility with older code forces otherwise.
- Shared HTML header (`header/snippet.html`): page-wide `script`, `meta`, and `link` tags loaded into apps that install the plugin. Use only for shared browser libraries, verification tags, or global snippets that every plugin consumer needs. Parameter markers use `_*_marker_*_` and are modeled in `header/params.json`.
- Shared keys (`shared-keys.json`): app-builder-supplied values available through `context.keys`. Use `secure` for secrets and `client_safe` only for values that may ship to browsers. Code reads these by caption, so renaming captions is a breaking change.
- Shared assets (`assets.json`): Bubble-hosted files such as logos, fonts, client scripts, WASM, CSS, and images. Use `buildprint plugin upload <file> [--name <asset name>] [--type <mime>]`, then `buildprint apply` to save the asset reference in the draft.
- API service and API calls (`api/service.json`, `api/calls/*.json`): external HTTP integrations, auth, headers, query params, body params, and response shapes. Use these when the primitive is an HTTP call that Bubble should expose as data or an action. Plugin-user auth values belong in the service/key model; do not bake private credentials into calls.
- Elements (`elements/*`): visual/page primitives a Bubble app builder drags onto a page. Use an element when the plugin has persistent DOM, per-instance state, page rendering, or element-scoped actions/events.
- Element fields (`element.json.fields`, action fields): Property Editor inputs. Use fields for configurable values supplied by the app builder; use clear runtime names because code reads `properties.<name>`.
- Element exposed states (`states.json`): values the element publishes into Bubble expressions. Use states for runtime information owned by an element instance, such as status, result data, or selected values.
- Element events (`events.json`): workflow triggers emitted by an element. Use events for app-builder workflow hooks such as completed, failed, clicked, uploaded, or changed.
- Element actions (`elements/*/actions/*`): workflow actions targeted at one element instance. Use these for imperative commands like start, stop, reset, open, refresh, or upload.
- Standalone actions (`actions/*`): workflow actions not tied to an element instance. Use client-side actions for browser/page side effects and server-side actions for Node packages, external services, heavier computation, or returned values.
- Return values (`action.json.return_value`): outputs from standalone actions. Use them when a server-side or client-side action should pass data to later workflow steps.
- Publishing/version state: the Bubble draft/current plugin is what `buildprint apply` updates. A numbered version only exists after the plugin owner publishes in Bubble.

## Creating primitives

Run `buildprint new plugin --help` and the relevant subcommand help before adding a primitive. Current scaffolds include:

- `buildprint new plugin element --name "Name"`
- `buildprint new plugin field --path <element-or-action-json> --name <runtime> --caption <caption> --editor <editor> --value <type>`
- `buildprint new plugin state --element <element> --name <runtime> --caption <caption> --value <type>`
- `buildprint new plugin event --element <element> --name <runtime> --caption <caption>`
- `buildprint new plugin element-action --element <element> --name "Action"`
- `buildprint new plugin action --name "Action" --type server_side`
- `buildprint new plugin return-value --action <action> --name <runtime> --caption <caption> --value <type>`
- `buildprint new plugin api-service --name "Service" --auth none`
- `buildprint new plugin api-call --name "Call" --method get --url "https://api.example.com/items/[item_id]"`
- `buildprint new plugin api-header --call <call> --key Authorization --private`
- `buildprint new plugin api-param --call <call> --key limit --value 10 --allow-blank`
- `buildprint new plugin api-body-param --call <call> --key title --value "Example"`
- `buildprint new plugin shared-key --caption "API Key" --type secure`
- `buildprint new plugin header-param --marker public_key --key "Public key"`

New nodes get placeholder IDs with a `new_` prefix, for example `actions/Send-Email-new_send_email/`. `buildprint apply` mints the real Bubble IDs and renames files after Bubble accepts the draft.

## Code rules

- `.js` files hold ONLY the function body. Never add the outer wrapper like `function(instance, properties, context) { ... }`; Buildprint adds and strips it. `buildprint check` errors if a wrapper sneaks in.
- `properties.<name>` follows each field's `name`; exposed states publish via `instance.publishState`; events fire via `instance.triggerEvent`.
- `context.keys` is keyed by the displayed key CAPTIONS, not internal ids. Renaming a key caption breaks `context.keys["..."]` lookups in code.
- Server action dependencies go in the action's `package.json`; the code requires them normally.
- Load Bubble data at the beginning of the function. Bubble may run plugin code more than once while data is loading; avoid side effects before required data is available.
- Avoid callback-only async flows like `document.ready` inside plugin functions. If Bubble throws its data-not-ready signal, let it bubble up or rethrow it so Bubble can rerun the function.
- Element `initialize` runs once per visible instance. Element `update` can run many times as properties change, so keep it idempotent and clean up timers, listeners, observers, and DOM nodes you replace.
- Server-side API v4 code should use `async`/`await`, Node package dependencies from `package.json`, and Bubble's v4 helpers. Avoid old `context.async` patterns in new code unless maintaining a legacy action.

## Data rules

- Preserve everything you did not intentionally change. Raw plugin data carries quirks that must round-trip verbatim: string booleans like "true", mixed types in `default_val`, legacy `categories` shapes, hand-written node IDs.
- Never edit `editor_counter` in `plugin.json`. Bubble owns it; Buildprint uses it for conflict detection and new IDs.
- API call `types` values are raw JSON-encoded strings produced by Bubble's initialize step. Do not reformat or re-indent them. A call without `types`/`ret_value` is uninitialized; Bubble deletes uninitialized calls at publish, so initialize them in the Bubble editor until Buildprint supports initialize directly.
- `shared-keys.json` `type` matters for security: `secure` keys stay server-side, `client_safe` keys ship to the browser. Never mark a secret `client_safe`.
- Do not hand-edit asset URLs. Use `buildprint plugin upload` so the file is uploaded to Bubble CDN and `assets.json` records the returned URL.

## Testing a plugin in an app

Applying a plugin workspace updates Bubble's draft/current plugin, not a numbered release. To test that draft in a Bubble app:

1. In the Bubble plugin editor, use the test app / go-to-test-app flow, or open the app editor URL with `test_plugin=<pluginId>_current`. Bubble installs the plugin's current draft in the test app if it is missing.
2. In a Buildprint app workspace for that app, run `buildprint sync` after the install or after plugin draft changes.
3. Confirm `settings/client-safe.json` has the plugin installed with version `current` for draft testing, and inspect the matching `plugins/<name>--<pluginId>.json` file if you need to see the installed plugin definition.
4. Never edit `plugins/` in an app workspace. It is a read-only projection of installed marketplace plugins; `buildprint apply` ignores it and `buildprint check` blocks local edits.
5. After each `buildprint apply` in the plugin workspace, refresh the Bubble test app and re-sync the app workspace if you need the app projection to reflect the latest draft.

Published versions are different: after the owner publishes, apps install or upgrade to a numbered plugin version. `buildprint plugin publish` does not publish through the API; it validates the draft and prints the exact owner handoff instructions.

## Closed vocabularies

- Plugin categories must be one of: `analytics`, `artificial intelligence (AI)`, `blog`, `calendar`, `chart`, `chat`, `compliance`, `containers`, `customer support`, `data (things)`, `ecommerce`, `email`, `health & fitness`, `image`, `input forms`, `internationalization`, `location`, `media`, `mobile`, `news`, `payment`, `PDF`, `productivity`, `small business`, `social network`, `technical`, `testing`, `video`, `visual elements`, `web scraping`. Built-in categories are `visual elements`, `input forms`, `testing`. Add at least one other category, and use at most 5 non-built-in categories.
- Metadata `license` values are `private`, `open_source`, `commercial`. `platforms_new` values are `web`, `mobile`, `both`.
- `dependencies.json` `plugin_api_version` values are `0`, `1`, `2`, `3`, `4_alpha`, `4`.
- Field `editor` values are `StaticText`, `StaticNumber`, `Checkbox`, `Color`, `Dropdown`, `Image`, `DynamicValue`, `custom_type`, `Label`. Use `custom_field_<id>` for fields of a custom type field. Standalone action field editors may also use `key_value_list`.
- Custom field `field_type_restriction` values are `text_image_file`, `number`, `boolean`, `date`, `geographic_address`, `number_range`, `date_range`.
- Bubble type values for field `value`, state `value`, and return `value` are `text`, `number`, `number_range`, `boolean`, `image`, `file`, `geographic_address`, `date`, `date_range`, `user`. Dynamic type forms are `custom_data_<fieldId>`, `custom_data_element_<fieldId>`, `_any_thing`, `_any_thing_bindable`.
- Element `platform_type` values are `web`, `mobile`. Element `category` values are `visual elements`, `input forms`.
- Standalone action `type` values are `client_side_web`, `client_side_mobile`, `client_side_both`, `server_side`. Standalone action `category` values are `plugins`, `data (things)`, `analytics`, `payment`. Action code `package_status` values are `empty`, `none`, `out_of_date`, `up_to_date`.
- API auth values are `none`, `private_key_url`, `private_key_header`, `basic_auth`, `oauth2_pw`, `oauth2_user`, `oauth2_custom`, `jwt`, `cert_key`. API call `method` values are `get`, `post`, `put`, `patch`, `delete_method`. API call `publish_as` values are `data`, `action`. API call `data_type` values are `JSON`, `XML`, `stream`, `image`, `number`, `text`, `file`, `empty`. API call `body_type` values are `json`, `form_data`, `plain_text`. API parameter `visibility` values are `public`, `hidden`, `secret`.
- Shared key `type` values are `secure`, `client_safe`.

## Fields, states, and events

- Field entries need `name`, `caption`, and `editor`; Dropdown editors need `options`; custom-type fields need `field_type_restriction`.
- States need `name`, `caption`, and `value` (the Bubble type); events need `name` and `caption`.
- Public (non-private) plugins need a 5-35 character name, description, icon, categories, and platforms before publish; commercial plugins also need a demo page. `buildprint check` reports all of these as publish-readiness warnings.
