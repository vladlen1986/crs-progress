# Cookbook: Upgrade To Global Expressions
> Source: `buildprint guidelines get cookbooks/upgrade-to-global-expressions` · Captured: 2026-07-17 (verbatim)

Use this path to find repeated dynamic expressions across a Bubble app and
extract the highest-value ones into **global expressions** - reusable, named,
optionally parameterized expressions defined once and referenced everywhere.

## Required companion paths

Fetch these together before editing:
- `editing/apps`
- `editing/frontend/expressions`
- `schema/dynamic-expression`

## What a global expression is

A global expression is an app-level, named expression. You define the logic
once (for example `Current User's Organisation`, `Current User is an org admin`,
or `Instance Config's Wasabi region`) and reference it from any page, reusable,
mobile view, workflow, privacy rule, or other expression. Changing the
definition updates every reference - the same win reusable elements give UI,
global expressions give logic.

Each global expression has:
- a **return type** (`btype_id` + `is_list`),
- zero or more typed **parameters** (its only inputs), and
- an **expression** body that produces the return value.

### The hard constraint: no ambient context

A global expression is evaluated with **no element, page, cell, or workflow
context**. Its only inputs are the app itself, the current user, the database,
option sets, APIs, and its declared parameters. This decides what can be
extracted:

- **Safe to extract (context-free roots):** `Current User`, `Do a search for`,
  option-set values, `Get data from API`, `Algolia search`, app texts, app
  settings, literals, formulas, and other global expressions.
- **Cannot be extracted as-is (context roots):** `This <element>`, `Parent
  group`, `Current cell's ...`, `Current page's ...` / page data (page width,
  This URL, Get data from page URL), `Current Workflow Item`, `Result of step
  N`, `This <thing>` inside operators, breakpoints, mouse data, etc.

If a repeated expression depends on context, you can still extract the
context-free part and pass the contextual value in as a **parameter** (see
"Parameterizing" below). If the whole expression is contextual, leave it - or,
for within-page / within-workflow repetition, prefer a Group data source or a
cached workflow step (`buildprint guidelines get cookbooks/refactoring-into-reusables`).

## Where they live (filesystem)

Global expressions are an id-map collection alongside data types and option sets:

```
global-expressions/
  <expression-id>/
    global-expression.json
```

Scaffold one with the CLI (it allocates ids and a valid shape for you):

```
buildprint new global-expression --name "Current User's Organisation"
```

**If the app has no global expressions yet, that is expected** - the feature is
new, so most apps start with an empty or absent `global-expressions/` collection.
`buildprint new global-expression` works from zero: it creates the collection,
allocates a valid id, and writes a skeleton `global-expression.json`. Never
hand-create the directory, invent ids, or copy an id from another app. The schema
below is complete, so you do not need an existing example to author one.

## JSON schema: the global-expression.json body

Top-level keys (required: `id`, `name`, `btype_id`, `is_list`):

- `id` (string) - must equal the folder id.
- `name` (string) - friendly name shown in the Bubble editor.
- `btype_id` (string) - the **base** return type id (`text`, `number`,
  `boolean`, `date`, `user`, `custom.<type>`, `option.<set>`, ...). Store the
  base type only; never `list.<type>` here - use `is_list` for lists.
- `is_list` (boolean) - true when the expression returns a list.
- `parameters` (object map, optional) - keyed by parameter id.
- `expression` (object, optional in storage but required to be valid) - a
  completed Bubble expression node. The bare editor placeholder
  `{ "type": "GlobalExpression" }` and `Empty` do not count as completed.
- `comment` (string | null, optional).

Each entry in `parameters` is keyed by its `param_id` and has
(required: `param_id`, `param_name`, `btype_id`):

- `param_id` (string) - must equal its map key.
- `param_name` (string) - friendly parameter name.
- `btype_id` (string) - base type of the parameter (no `list.` prefix).
- `is_list` (boolean, optional) - true for list parameters.

Minimal body - `Instance Config` (no parameters): a search-for-the-singleton
that returns one record. Note `parameters` is simply `{}`:

```json
{
  "id": "<expr-id>",
  "name": "Instance Config",
  "comment": null,
  "btype_id": "custom.instance_configuration",
  "is_list": false,
  "parameters": {},
  "expression": {
    "type": "Search",
    "properties": { "type_to_find": "custom.instance_configuration" },
    "next": { "type": "Message", "name": "first_element" }
  }
}
```

Parameterized body - `Organisation admins contains a given user` (boolean, one
user parameter), referencing its parameter via `GlobalExpressionParameter`:

```json
{
  "id": "<expr-id>",
  "name": "Org admins contains user",
  "comment": null,
  "btype_id": "boolean",
  "is_list": false,
  "parameters": {
    "<param-id>": {
      "param_id": "<param-id>",
      "param_name": "User",
      "btype_id": "user",
      "is_list": false
    }
  },
  "expression": {
    "type": "CurrentUser",
    "next": {
      "type": "Message",
      "name": "organisation_custom_organisation",
      "next": {
        "type": "Message",
        "name": "admins_list_user",
        "next": {
          "type": "Message",
          "name": "contains",
          "args": {
            "type": "GlobalExpressionParameter",
            "properties": {
              "global_expression_id": "<expr-id>",
              "param_id": "<param-id>"
            }
          }
        }
      }
    }
  }
}
```

Validity is enforced by `buildprint check` (rule
`global-expression-schema-validity`): unknown keys, missing required keys,
parameter key/id mismatch, an incomplete `expression`, and a body whose
expression resolves to a type other than the declared `btype_id` / `is_list`
are all errors. A separate rule (`global-expression-recursion-validity`)
rejects global expressions that reference themselves in a cycle.

> Type hint: in many Bubble apps the field message `name` encodes its type
> (`isadmin_boolean` -> boolean, `organisation_custom_organisation` ->
> custom.organisation, `admins_list_user` -> list of user). Use the last
> message in the chain (and the operator) to pick `btype_id` / `is_list`, then
> let `buildprint check` confirm or correct you.

## The data source: referencing a global expression

Wherever you used the inline expression, replace it with a `GlobalExpression`
data source node. With no parameters it is just:

```json
{ "type": "GlobalExpression", "properties": { "global_expression_id": "<expr-id>" } }
```

With parameters, pass each one as a row under `properties.parameters`, keyed by
Bubble row index (`"0"`, `"1"`, ...). Each row has the target `param_id` and an
`arg_value` that is itself any expression (this is where contextual values are
supplied at the call site):

```json
{
  "type": "GlobalExpression",
  "properties": {
    "global_expression_id": "<expr-id>",
    "parameters": {
      "0": {
        "param_id": "<param-id>",
        "arg_value": { "type": "CurrentUser" }
      }
    }
  }
}
```

The result has the global expression's return type, so you can keep chaining
(`... "next": { "type": "Message", "name": "..." }`) just like any data source.
Rules: every declared parameter must be supplied exactly once, each `arg_value`
must match the parameter's declared type, and inside a global expression body a
parameter is read with `GlobalExpressionParameter` (`global_expression_id` +
`param_id`), never `GlobalExpression`.

## Finding the best candidates

`buildprint check` already flags repeated expressions, but only **within a
single canvas** (`duplicate-expression-references-page`) or **within a single
workflow** (`duplicate-expression-references-workflow`). Global expressions
solve the case those rules skip on purpose: the **same expression repeated
across many different surfaces**. Use the scanner below to find those.

Save it as `ge-scan.mjs` and run it from the branch worktree:

```
node ge-scan.mjs --top=30                 # ranked list
node ge-scan.mjs --top=30 --json=ge.json  # + full details for editing
```

```js
#!/usr/bin/env node
// Global-expression candidate scanner.
// Run from inside a Buildprint branch worktree:  node ge-scan.mjs [--top=N] [--json=out.json]
//
// Finds expressions that (a) are legal inside a Bubble global expression and
// (b) recur across the app, then ranks them by  complexity x occurrences  so
// you extract the highest-leverage ones first.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const argv = process.argv.slice(2);
const TOP = Number((argv.find((a) => a.startsWith("--top=")) || "--top=30").slice(6));
const JSON_OUT = (argv.find((a) => a.startsWith("--json=")) || "").slice(7);

// Non-datasource node types, per Bubble's own taxonomy (NON_DATASOURCE_EXPRESSION_TYPES):
// text composition, geo literals, operators, and empty slots. They wrap or
// combine values but are not themselves data sources, so they never ROOT a
// candidate. We still descend through them to reach the data sources inside.
const NON_DATASOURCE = new Set(["Empty", "GeoAddress", "Message", "TextExpression"]);
// Roots legal INSIDE a global expression. A global expression has no element,
// page, cell, or workflow context - only the app, the current user, the
// database, option sets, APIs, and its own declared parameters.
const SAFE_ROOTS = new Set([
  "CurrentUser", "Search", "AlgoliaSearch", "GetDataFromAPI",
  "OptionValue", "OneOptionValue", "AllOptionValue",
  "AppText", "ArbitraryText", "DateTime", "PrimitiveLiteral",
  "AppSetting", "Formulas", "GeoAddress", "TextExpression", "GlobalExpression",
]);
// Roots that actually do work - a bare literal is not worth extracting, so a
// candidate must contain at least one of these.
const DYNAMIC_DATASOURCES = new Set([
  "CurrentUser", "Search", "AlgoliaSearch", "GetDataFromAPI",
  "OptionValue", "OneOptionValue", "AllOptionValue", "AppSetting", "Formulas",
]);
// Every datasource/source root. Anything here but NOT in SAFE_ROOTS is
// context-relative (ThisElement, ElementParent, CurrentPageItem, PageData,
// GetElement, GetParamFromUrl, PreviousStep, CurrentWorkflowItem,
// APIEventParameter, CurrentDataItem, InjectedValue, CurrentCellsIndex, ...)
// and disqualifies the whole expression from becoming a global expression.
const SOURCE_ROOTS = new Set([
  "ArbitraryText", "AppText", "DateTime", "CurrentUser", "PageData",
  "CurrentWorkflowItem", "APIEventParameter", "PreviousStep", "GetElement",
  "OptionValue", "OneOptionValue", "AllOptionValue", "Search",
  "GlobalExpression", "GlobalExpressionParameter", "ThisElement",
  "ElementParent", "ElementAncestor", "CurrentPageItem", "CurrentDataItem",
  "OldDataItem", "GetParamFromUrl", "GetDataFromAPI", "AlgoliaSearch",
  "OneIapItem", "AllSubscriptionGroups", "AppSetting", "Formulas",
  "InjectedValue", "PrimitiveLiteral", "Breakpoint", "DefaultBreakpoint",
  "CurrentCellsIndex", "GetMouseData", "Dehydrated",
]);
const KNOWN = new Set([...NON_DATASOURCE, ...SOURCE_ROOTS]);
const NOISE = new Set(["is_slidable", "comment"]);
const EXPENSIVE_ROOTS = new Set(["Search", "GetDataFromAPI", "AlgoliaSearch"]);
// A global expression is a reusable DATA SOURCE - you insert it wherever a data
// source goes, never as a bare operator. So a candidate must be ROOTED at a data
// source node: one that is globally resolvable and is not itself a global
// expression reference. Operators (Message) and composition wrappers
// (TextExpression, GeoAddress) never root a candidate - but an expression that
// combines several data sources (a merge, a comparison, a text) yields one
// candidate PER data source node, each evaluated on its own.
const CANDIDATE_ROOTS = new Set(
  [...SAFE_ROOTS].filter((t) => !NON_DATASOURCE.has(t) && t !== "GlobalExpression"),
);
// Global expressions cannot be used in privacy rules (data_types) or in styles,
// so those occurrences must not count toward a candidate.
const SKIP_DIRS = new Set([".git", "node_modules", "global-expressions", "option_sets", "data_types", "styles"]);
const MIN_PARTS = 4;

const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const isExpr = (v) => isObj(v) && typeof v.type === "string" && KNOWN.has(v.type);

function* jsonFiles(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith("__bp_") || e.name.startsWith(".")) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) yield* jsonFiles(full); }
    else if (e.isFile() && e.name.endsWith(".json")) yield full;
  }
}
function stripNoise(v) {
  if (Array.isArray(v)) return v.map(stripNoise);
  if (!isObj(v)) return v;
  const out = {};
  for (const [k, c] of Object.entries(v)) if (!NOISE.has(k)) out[k] = stripNoise(c);
  return out;
}
// Deterministic structural key: two expressions collide iff they are identical
// after dropping editor-only noise. Matches the canonical hash buildprint check uses.
function canonical(v) {
  if (Array.isArray(v)) return "[" + v.map(canonical).join(",") + "]";
  if (isObj(v)) return "{" + Object.keys(v).sort().map((k) => JSON.stringify(k) + ":" + canonical(v[k])).join(",") + "}";
  return JSON.stringify(v);
}
const hashOf = (n) => canonical(stripNoise(n));

function eachNode(node, fn) {
  (function rec(x) {
    if (Array.isArray(x)) { x.forEach(rec); return; }
    if (isObj(x)) { fn(x); for (const k of Object.keys(x)) rec(x[k]); }
  })(node);
}
function isGloballyResolvable(node) {
  let ok = true;
  eachNode(node, (x) => {
    const t = x.type;
    if (typeof t === "string" && SOURCE_ROOTS.has(t) && !SAFE_ROOTS.has(t)) ok = false;
  });
  return ok;
}
function hasDynamicDatasource(node) {
  let yes = false;
  eachNode(node, (x) => { if (typeof x.type === "string" && DYNAMIC_DATASOURCES.has(x.type)) yes = true; });
  return yes;
}
// Complexity proxy: number of expression "parts" in the subtree (each root,
// each operator/field message, each nested argument). Empty placeholders do not count.
function partCount(node) {
  let n = 0;
  eachNode(node, (x) => { if (typeof x.type === "string" && KNOWN.has(x.type) && x.type !== "Empty") n++; });
  return n;
}
function hasNestedExpr(node) {
  for (const [k, v] of Object.entries(node)) {
    if (k === "next" || k === "type") continue;
    let found = false;
    eachNode(v, (x) => { if (isExpr(x)) found = true; });
    if (found) return true;
  }
  return false;
}
// A bare context root with no chain/args (Current User alone, etc.) is free to
// re-reference - nothing to extract. Searches always count (they fetch data).
function isTrivialLeaf(node) {
  const t = node.type;
  if (t === "TextExpression" || t === "GeoAddress") return false;
  if (isExpr(node.next)) return false;
  if (hasNestedExpr(node)) return false;
  if (EXPENSIVE_ROOTS.has(t)) return false;
  return true;
}
// Group occurrences by the surface (page / reusable / mobile view / workflow /
// data type) they live in, so we can favour cross-surface reuse.
function surfaceOf(rel) {
  const m =
    rel.match(/^(pages|element-definitions|mobile-views)\/([^/]+)/) ||
    rel.match(/^(api)\/[^/]+\/([^/]+)/);
  return m ? m[1] + ":" + m[2] : rel;
}

// --- human-readable rendering (best effort; uses raw Bubble keys) ---
function renderArgs(a) {
  if (a === undefined) return "";
  if (isObj(a) && typeof a.type === "string") return "(" + render(a) + ")";
  if (isObj(a)) {
    const inner = Object.values(a).filter((v) => isObj(v) && typeof v.type === "string").map(render);
    return inner.length ? "(" + inner.join(", ") + ")" : "";
  }
  return "";
}
function render(node) {
  if (!isObj(node)) return JSON.stringify(node);
  const t = node.type;
  const p = isObj(node.properties) ? node.properties : {};
  let head;
  if (t === "Search" || t === "AlgoliaSearch") head = t + "[" + (p.type_to_find ?? "?") + "]";
  else if (t === "OptionValue" || t === "OneOptionValue" || t === "AllOptionValue") head = t + "[" + (p.option_set ?? "?") + "]";
  else if (t === "TextExpression") {
    const entries = isObj(node.entries) ? node.entries : {};
    const parts = Object.keys(entries).sort((a, b) => Number(a) - Number(b)).map((k) => {
      const e = entries[k];
      if (typeof e === "string") return JSON.stringify(e.length > 20 ? e.slice(0, 20) + "..." : e);
      if (isObj(e) && e.type === "Empty") return "empty";
      return "{" + render(e) + "}";
    });
    head = "text(" + parts.join(" + ") + ")";
  } else head = t;
  let cur = node.next, chain = "";
  while (isObj(cur) && cur.type === "Message") {
    chain += " > " + (cur.name ?? "?") + renderArgs(cur.args);
    cur = cur.next;
  }
  return head + chain;
}

// --- scan ---
const groups = new Map();
let fileCount = 0;
for (const file of jsonFiles(ROOT)) {
  let body;
  try { body = JSON.parse(readFileSync(file, "utf8")); } catch { continue; }
  fileCount++;
  const rel = relative(ROOT, file);
  (function walk(value, loc) {
    if (Array.isArray(value)) { value.forEach((c, i) => walk(c, loc + "." + i)); return; }
    if (!isObj(value)) return;
    const t = value.type;
    if (typeof t === "string" && CANDIDATE_ROOTS.has(t)
        && !isTrivialLeaf(value) && isGloballyResolvable(value) && hasDynamicDatasource(value)) {
      const key = hashOf(value);
      let g = groups.get(key);
      if (!g) { g = { sample: value, parts: partCount(value), root: t, occ: [], surfaces: new Set() }; groups.set(key, g); }
      g.occ.push({ path: rel, loc });
      g.surfaces.add(surfaceOf(rel));
    }
    for (const k of Object.keys(value)) walk(value[k], loc ? loc + "." + k : k);
  })(body, "");
}

const candidates = [...groups.values()]
  .filter((g) => g.occ.length >= 2 && g.parts >= MIN_PARTS && g.surfaces.size >= 2)
  .map((g) => {
    // Weight length superlinearly so a long chain copied a few times outranks a
    // short chain copied a few more - longer expressions are the bigger win.
    const complexity = Math.pow(g.parts, 1.5) + (EXPENSIVE_ROOTS.has(g.root) ? 3 : 0);
    // Current User is resolved once per request, so repeated "Current User's ..."
    // is the cheapest kind of repeat - penalise it heavily (quarter weight).
    const weight = g.root === "CurrentUser" ? 0.25 : 1;
    return {
      priority: Math.round(complexity * g.occ.length * weight), count: g.occ.length, spread: g.surfaces.size,
      parts: g.parts, root: g.root, surfaces: [...g.surfaces], occ: g.occ, sample: g.sample,
    };
  })
  .sort((a, b) => b.priority - a.priority);

console.log("Scanned " + fileCount + " files. " + candidates.length +
  " global-safe repeated expressions (>=2 occurrences, >=2 surfaces, >=" + MIN_PARTS + " parts).\n");
for (let i = 0; i < Math.min(TOP, candidates.length); i++) {
  const c = candidates[i];
  console.log("#" + (i + 1) + "  priority=" + c.priority + "  x" + c.count +
    " across " + c.spread + " surfaces  parts=" + c.parts + "  [" + c.root + "]");
  console.log("    " + render(c.sample));
  console.log("    e.g. " + c.surfaces.slice(0, 3).join(", ") + (c.spread > 3 ? " (+" + (c.spread - 3) + ")" : ""));
}
if (JSON_OUT) {
  writeFileSync(JSON_OUT, JSON.stringify(candidates.slice(0, TOP).map((c) => ({
    priority: c.priority, occurrences: c.count, surfaces: c.spread, parts: c.parts,
    summary: render(c.sample), expression: stripNoise(c.sample), locations: c.occ,
  })), null, 2));
  console.log("\nWrote full details for top " + TOP + " to " + JSON_OUT);
}

```

How it ranks (priority = expression-part complexity x global occurrences):

- It walks every expression-bearing JSON file in the branch and hashes each
  expression with the same noise-stripped canonical form `buildprint check`
  uses, so structurally identical copies group together.
- It only proposes candidates **rooted at a data source** node (`Current User`,
  `Do a search for`, an option-set value, `Get data from API`, ...). Operators
  and composition wrappers (`Message`, a text element's `TextExpression`, a geo
  literal) are never extracted on their own - a global expression is a reusable
  data source, not an operator. An expression that combines several data sources
  (a merge, a comparison against a search, a text built from two fields) yields
  **one candidate per data source node**, each ranked on its own, plus the whole
  data-source-rooted expression that contains them.
- It keeps only **globally resolvable** expressions (every root is context-free,
  per the constraint above) that contain a real datasource, recur at least
  twice, span at least two surfaces, and have at least **four parts** (small
  one- or two-hop chains are not worth a named expression).
- It **skips `data_types/` and `styles/`** entirely: global expressions
  cannot be used in privacy-rule conditions or in styles.
- **Complexity** = expression parts (roots + field/operator messages + nested
  arguments) weighted **superlinearly** (`parts ** 1.5`) so a long chain copied
  a few times outranks a short chain copied a few more, plus a bonus for
  expensive roots (`Search`, `Get data from API`, `Algolia search`).
- **Priority** = complexity x occurrences, **quartered when the root is `Current
  User`** - Bubble resolves the current user once per request, so repeated
  `Current User's ...` is the cheapest kind of repeat and least worth
  extracting. So a long expression copied a handful of times still surfaces
  above a short one copied many more.

Each entry prints a readable signature (raw Bubble keys, e.g. `CurrentUser >
organisation_custom_organisation`) and the surfaces it appears on. The
`--json` file adds, per candidate, the exact `expression` JSON to extract and a
`locations` list of `{ path, loc }` for every occurrence you must rewrite.

## Reading the results: translate to display names

The scanner prints **raw Bubble internals** - field ids
(`requireeurouting_boolean`), type ids (`custom.instance_configuration`),
option-set refs (`option.permission`), and surface ids (`pages:bTHFx`,
`element-definitions:bTHLX`). Before you decide anything or say anything to the
user, **translate every token to the display name a Bubble builder sees in the
editor**. Never show internal ids, field slugs, or surface ids to the user, and
never infer a name from a slug - the slug and the display name routinely diverge
(the field `organisation_custom_organisation` displays as `Selected Team`, and
the `custom.organisation` type displays as `Team`, not `Organisation`).

Resolve each kind of token from the workspace files:

- **Field hops** (each `Message`'s `name`): the field's display name lives in its
  **owner** data type at `data_types/<owner>/type.json` under
  `fields.<message-name>.display`; that field's `.value` is its type, which is the
  owner of the *next* hop - so walk the chain hop by hop from the root's type. The
  trailing `_text` / `_boolean` / `_custom_<type>` / `_option_<set>` /
  `_list_<type>` encodes the field's type, not its name - drop it.
- **Root data source:** `Search[custom.<type>]` -> the type's top-level `display`
  in `data_types/<type>/type.json` (Bubble says "Do a search for <Display>s");
  `CurrentUser` -> "Current User"; `OneOptionValue[option.<set>]` /
  `OptionValue[...]` -> the set's `display` in `option_sets/<set>/option-set.json`,
  with a specific option read from `values.<option-id>.display`.
- **Operators** (`Message` names that are not fields: `contains`, `not_contains`,
  `is_false`, `equals`, `first_element`, `format_json_encode`, ...): say them in
  Bubble's editor words ("contains", "doesn't contain", "is no", "first item",
  ":formatted as JSON"). `buildprint schema "<operator>" --category operators`
  gives the friendly label when unsure.
- **Surfaces** (the `e.g.` line and each `locations[].path`): each `pages/<id>`
  or `element-definitions/<id>` is one page or reusable; each
  `api/<folder>/<workflow>` is one **backend workflow** - count and name those
  individually, never lump every backend hit into a single "place". Resolve a
  name with `buildprint find <id>` (kind + display name + path), `buildprint
  summary`, or `buildprint tree <page-or-reusable>`; a backend workflow's name is
  also `properties.wf_name` in its `workflow.json`. Refer to surfaces by name,
  never by id.

Worked example - translating one candidate end to end:

```
raw:   CurrentUser > organisation_custom_organisation > admins_list_user > contains(CurrentUser)
       (x14 across 7 surfaces)
steps: CurrentUser                       -> "Current User"
       organisation_custom_organisation  -> data_types/user/type.json         -> "Selected Team" (type Team)
       admins_list_user                  -> data_types/organisation/type.json -> "Admins" (list of User)
       contains(CurrentUser)             -> "contains Current User"
reads: Current User's Selected Team's Admins contains Current User   (a yes / no)
name:  "Current User is a Team admin"
```

## Presenting recommendations to the user

Once translated, present a **ranked shortlist** (highest priority first) and let
the user choose what to extract before you create anything. For each candidate
show only plain-Bubble language:

- a proposed **name + one-line description** ("Current User is a Team admin - a
  yes / no");
- the **parameter** to factor out when it is a family of near-duplicates
  ("... for a given Permission" / "... for a given User Type");
- its **reach** in words ("used 14 times across 7 places, including the Dashboard
  page and the Header reusable"); and
- the **win** in a phrase ("define once, change in one place").

Do not paste the raw scanner output, ids, `_custom_<type>` slugs, or `loc` paths
into the conversation - that is working data for you, not for the user.

## Finding every occurrence to replace

Once you pick a candidate you must rewrite **every** place it appears, or you
split one concept into a global expression plus leftover inline copies. The
scanner already did that search: the `--json` `locations` array is the
**complete, deduplicated list of every occurrence of that exact expression**
across all scanned surfaces. It is your worklist - there is nothing else to hunt
for, and you should not grep blindly for field names.

Each location is `{ path, loc }`: `path` is the workspace file and `loc` is a
dotted path to the exact node inside that file's JSON (the keys the scanner
walked, e.g. `properties.children.3.properties.text`). To replace one: open
`path`, follow `loc` to the node, confirm it equals the candidate's `expression`
JSON once editor-only noise (`is_slidable`, `comment`) is ignored, then swap it
for the `GlobalExpression` reference node.

Pull the worklist for one candidate straight out of `ge.json` (here, every place
the Wasabi bucket name is read):

```
node -e 'const c=require("./ge.json").find(x=>x.summary.includes("wasabibucketname")); console.log(c.locations.map(l=>l.path+"  @  "+l.loc).join("\n"))'
```

Three things the worklist deliberately leaves out or splits - handle each:

- **Privacy rules and styles are excluded.** Occurrences inside `data_types/`
  (privacy-rule conditions) and `styles/` are never listed, because a global
  expression cannot be used there. Leave those copies inline.
- **Near-duplicates are separate groups.** The same concept can appear as more
  than one candidate when copies differ by a trivial detail (a search
  constraint, a sort, a text wrapper). Each group has its own `locations`; gather
  the groups you judged to be the same and replace all of them, parameterizing
  the differing leaf if it is a real value.
- **A qualifying group lists ALL its occurrences.** The 2-occurrence / 2-surface
  / 4-part thresholds gate whether a *group* is proposed, not which occurrences
  are reported - once a group qualifies, every occurrence of that exact
  expression is in `locations`, including several on one surface.

Confirm you got them all: after replacing, re-run `ge-scan.mjs` (or `buildprint
check`). The original signature should be gone, replaced by the new
`GlobalExpression` reference; any straggler that remains was a variant - inspect
and handle it.

## Upgrade workflow

1. **Scan** with `--json=ge.json` and review the top entries.
2. **Triage and translate.** Skip anything that is not genuinely the same
   concept. Group near-duplicates that differ only by one leaf value - they
   become one parameterized global expression. Resolve every candidate to
   display names (see "Reading the results" above) and name each global
   expression in plain Bubble language before presenting the shortlist.
3. **Create** each with `buildprint new global-expression --name "..."`. Note the
   allocated id from the printed path.
4. **Define the body.** Set `btype_id` / `is_list`, declare parameters, and set
   `expression` to the candidate's `expression` JSON from `ge.json`. Replace any
   per-call leaf with a `GlobalExpressionParameter` node.
5. **Replace every occurrence.** Work the candidate's `locations` list (see
   "Finding every occurrence to replace"): for each `{ path, loc }`, swap the
   inline expression for a `GlobalExpression` reference node, supplying parameter
   `arg_value`s where needed. Match against the exact `expression` JSON; the
   `loc` dotted path tells you where in the file it sits.
6. **Validate** with `buildprint check` and fix every new issue (type mismatch,
   missing/extra parameter, recursion) before moving on.
7. **Apply** with `buildprint apply`, then spot-check a couple of surfaces at the
   branch's Bubble version URL (`buildprint branch`).

Do one global expression end to end (create -> body -> replace -> check) before
starting the next, so a mistake never fans out across dozens of files.

## Parameterizing near-duplicates

When the scanner shows several groups that are the same shape except for one
leaf - for example `Current User's user type is [Admin]` vs `... is [Member]`,
or a permission check against different option values - extract one global
expression and turn the differing leaf into a parameter. Each call site then
passes its value via `properties.parameters[*].arg_value`. This both collapses
more duplication and is how you lift an otherwise-contextual expression to
global scope (pass the contextual value in instead of reading it from context).

## Validation checklist

1. `id` equals the folder id; each parameter's `param_id` equals its map key.
2. `btype_id` is a base type (no `list.` prefix); `is_list` carries listness.
3. The body `expression` is complete and resolves to the declared return type.
4. No context roots remain anywhere in the body (the scanner only proposes
   safe ones, but re-check after any manual edit).
5. Every reference supplies all declared parameters once, with type-correct
   `arg_value`s, and no global expression cycles back to itself.
6. `buildprint check` is clean and `buildprint apply` succeeds.

## Example guideline fetch

- `buildprint guidelines get editing/apps editing/frontend/expressions schema/dynamic-expression cookbooks/upgrade-to-global-expressions`
