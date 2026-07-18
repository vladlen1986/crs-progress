# Buildprint Prompt — Create 9 button styles + showcase on Design System page

**TEST/DEV branch only. Never live. Savepoint: "Before button styles c1". Run `buildprint check` after each task. Do not push to live. Apply directly without confirmation.**

## TARGET

Branch: TEST/DEV. Page: Design System page (`bUfVN0`) — showcase host for the new styles. Module context: User Management (`user_management`), section Admin / Core. This chunk creates styles only — no reusable element or page layout is targeted for edit beyond adding showcase instances to `bUfVN0`. Savepoint name: **"Before button styles c1"**.

## EXISTING REUSABLES BY ID

The bundle lists no existing button styles or button reusables with an attested match for this chunk — every row in the mapping table is marked `CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)`. No relevant existing reusable to clone. **Task 0 below is the locate step; do not recreate anything Task 0 finds already existing.**

## STEPS FOR BP

0. **Locate and report** (before any change): confirm in the TEST branch workspace whether any of the 9 target style names already exist (`CRS - Button`, `CRS - Btn`, `CRS - Btn Primary`, `CRS - Btn Secondary`, `CRS - Btn Danger`, `CRS - Btn Ghost`, `CRS - Btn Link`, `CRS - Btn Sm`, `CRS - Btn Lg`), report exact names + IDs if found, and confirm the exact element ID/name for the Design System page (`bUfVN0`) showcase section where new styles are demoed. Do not proceed to creation for any name Task 0 finds already present — flag it instead.

1. **Create the 9 named styles**, byte-for-byte per the PRODUCED NAMES list:
   - `CRS - Button`
   - `CRS - Btn`
   - `CRS - Btn Primary`
   - `CRS - Btn Secondary`
   - `CRS - Btn Danger`
   - `CRS - Btn Ghost`
   - `CRS - Btn Link`
   - `CRS - Btn Sm`
   - `CRS - Btn Lg`

   Per the mapping table, back each with the canonical §2 tokens (not inline literals): `--accent`, `--accent-hover`, `--accent-active`, `--accent-soft`, `--bg-secondary`, `--bg-tertiary`, `--bg-elevated`, `--border-default`, `--border-active`, `--error`, `--text-primary`, `--text-secondary`, `--text-muted`, `--font-sans`, `--font-mono`, `--radius-btn` (7px), and height tokens `--h-button` (32px) / `--h-button-lg` (40px) / `--h-button-sm` (28px) per the size-variant styles. Use `--transition` (160ms cubic-bezier(.4,0,.2,1)) for interaction-state transitions.

   Follow the paired-styles convention: name each in dark/light-ready pairs using the **`Name (Dark)` / `Name (Light)`** suffix if the Style editor requires separate dark/light entities for these 9 base names — build the `(Dark)` variant now per the standing rule; if light isn't being built in this chunk, still name it so the `(Light)` variant slots in later via `bptheme`. Zero property-level color conditionals — swap whole styles only. Reuse existing styles; do not fork near-duplicates found in Task 0.

2. **Showcase each of the 9 styles on the Design System page (`bUfVN0`)** by adding a demo instance of each to the page's existing showcase pattern, verifiable independently: each style must be visibly present and inspectable on `bUfVN0` after apply.

3. **Verify** — `buildprint check` after each task; confirm all 9 style names exist exactly as specified and each appears in the `bUfVN0` showcase before considering the chunk complete.

## DATA / PRIVACY

This chunk creates Global styles only — no Data Type, workflow, or record-level change is in scope, so Pattern A tenant scoping (`Current User's company = This Thing's company AND Current User's property = This Thing's property`) does not apply to this chunk's work. No writes are introduced; SCOPE OUT explicitly excludes workflows. If any future chunk in this prototype adds a write, it must route through a private server-guarded backend workflow — no UI-only or auto-bound write.

## WU NOTES

No WU-relevant surface in this change — this chunk only creates Global styles and adds static showcase instances to `bUfVN0`; it involves no searches, no lists, no `:count`, and no data-bound elements per the mapping table (all rows are style/token definitions, not data sources).

## MANUAL VERIFICATION

- [NEG] Vlad: manually confirm on `bUfVN0` in a lesser-privileged/non-admin test-user session that the showcase page's visibility does not leak any restricted content — the bundle's privacy inventory shows `bUfVN0`'s own DT-level access is out of scope for this chunk, but confirm no unintended data exposure was introduced by the new showcase instances.
- [NEG] Vlad: manually verify none of the 9 new style names collide with an existing Style that Task 0 may have missed (e.g., via a stale local sync) — re-run `buildprint sync` and `buildprint audit` before the next chunk depends on these names.

---

## MAPPING CONTRACT (verbatim from prototypes/buttons/mapping.md — do not reinterpret)

Produced names — create EXACTLY these, byte-for-byte:
- `CRS - Button`
- `CRS - Btn`
- `CRS - Btn Primary`
- `CRS - Btn Secondary`
- `CRS - Btn Danger`
- `CRS - Btn Ghost`
- `CRS - Btn Link`
- `CRS - Btn Sm`
- `CRS - Btn Lg`

Tokens used:

| var in file | canonical §2 token | dark | light | used by |
|---|---|---|---|---|
| `--accent` | `--accent` | #3B82F6 | #3B82F6 | .btn-primary, .btn-link |
| `--accent-active` | `--accent-active` | #1D4ED8 | #1D4ED8 | .btn-primary:active |
| `--accent-hover` | `--accent-hover` | #2563EB | #2563EB | .btn-primary:hover |
| `--accent-soft` | `--accent-soft` | #60A5FA | #2563EB | .btn-link:hover |
| `--bg` | `--bg-primary` | #181818 | #FAFAFA | html |
| `--border` | `--border-default` | #242424 | #EAEAEB | .row |
| `--border-active` | `--border-active` | #3D3D3D | #C8C8CB | .btn-secondary:hover |
| `--ease` | `--transition` | 160ms cubic-bezier(.4,0,.2,1) | 160ms cubic-bezier(.4,0,.2,1) | .btn |
| `--error` | `--error` | #EF4444 | #DC2626 | .btn-danger |
| `--font-mono` | `--font-mono` | 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace | — | .sub, .note |
| `--font-sans` | `--font-sans` | 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif | — | html, .btn |
| `--h-btn` | `--h-button` | 32px | — | .btn |
| `--h-btn-lg` | `--h-button-lg` | 40px | — | .btn-lg |
| `--h-btn-sm` | `--h-button-sm` | 28px | — | .btn-sm |
| `--r-button` | `--radius-btn` | 7px | 7px | .btn |
| `--surface-1` | `--bg-secondary` | #1E1E1E | #FFFFFF | .row |
| `--surface-2` | `--bg-tertiary` | #242424 | #F4F4F5 | .btn-secondary:hover, .btn-ghost:hover |
| `--surface-3` | `--bg-elevated` | #2A2A2A | #FFFFFF | .btn-secondary |
| `--text-muted` | `--text-muted` | #6B6B6B | #8E8E95 | .sub, .note |
| `--text-primary` | `--text-primary` | #E0E0E0 | #18181B | html, .btn-secondary:hover, .btn-ghost:hover |
| `--text-secondary` | `--text-secondary` | #A6A6A6 | #5F5F66 | h2, .btn-secondary, .btn-ghost |

Chunk rows:

| `button` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-primary` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-secondary` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-danger` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-ghost` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-link` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-sm` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-lg` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |

