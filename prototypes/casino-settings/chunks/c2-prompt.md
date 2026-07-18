# Buildprint Prompt — Build Casino Settings chunk c2: card layout containers (Elevated Card scaffold)

**TEST/DEV branch only. Never live. Savepoint: "Before Casino Settings c2 card containers". Run `buildprint check` after each task. Do not push to live. Apply directly without confirmation.**

## TARGET
- Branch: TEST (`casinoreportingsystem` Test worktree).
- Reusable being changed: `# Casino Settings` (the Core/Settings RE — `modules.json` route `settings`; per `decisions.md` 2026-05-02 the build-in-progress element was `RE_CasinoSettings`). VERIFY: exact current name + ID of the Casino Settings reusable (naming may be `# Casino Settings` per §13 or the legacy `RE_CasinoSettings` / `RE - Name` per §19 migration gap).
- Savepoint name: `"Before Casino Settings c2 card containers"`.

## EXISTING REUSABLES BY ID
Reuse or clone by id (`--copy`); recreating an existing element is FORBIDDEN.
- Design System page — `bUfVN0` (approval gate for all styles; source of `CRS - Elevated Card`).
- Sidebar reusable — `Sidebar reusable` (STATUS.md §6, ✅ theme-aware). VERIFY: its element ID (bundle gives no ID).
- `CRS - Elevated Card` — style/component referenced in mapping (CRS-design-system.md §20). VERIFY: whether `CRS - Elevated Card` exists as a reusable **element** to clone, or only as a paired **Style** (`CRS - Elevated Card (Dark)` / `... (Light)`, per §3.2 example) to apply to a Group. The bundle names it in §20 addenda but gives no element ID.

If `CRS - Elevated Card` turns out to be a Style only (not a clonable element), build the five containers as plain Groups (§13: inline Groups take no prefix) and apply the `CRS - Elevated Card (Dark)` Style to `.card`.

## STEPS FOR BP
**Task 0 (locate-and-report, no changes):** Report exact names + IDs for: the Casino Settings reusable; the Sidebar reusable; `CRS - Elevated Card` (element ID if clonable, else the Style pair names `CRS - Elevated Card (Dark)`/`(Light)`); the paired Styles for the tokens this chunk uses (`--bg-secondary`, `--border-default`, `--radius-card`, `--text-primary`, `--text-muted`). Report the data types touched: none for this chunk (layout containers only — Company + Property DTs are untouched here). List what exists vs. missing; stop and surface any gap before Task 1.

Create EXACTLY these container names, byte-for-byte (later chunks reference them):
1. **Task 1 — `/*` (Sidebar mount):** Reuse/clone the Sidebar reusable **by ID** — never recreate (mapping: Sidebar reusable, CRS-design-system.md §10). Place per the page scaffold.
2. **Task 2 — `card-header` container:** Group inside the card; header per §20.4/§5 header pattern. Reuse/clone from `CRS - Elevated Card` by ID; do not recreate.
3. **Task 3 — `card-title` container:** Group inside `card-header`.
4. **Task 4 — `card-subtitle` container:** Group inside `card-header`. Text color token `--text-muted` (mapping: `.card-subtitle` → `--text-muted`).
5. **Task 5 — `card-body` container:** Group inside the card (18–24px padding per §15).

SCOPE OUT: no component internals — build containers only.

Styling per bundle conventions: named paired styles `Name (Dark)` / `Name (Light)`; theme = full style swap on `dark_theme is "no"` only (via `bptheme`); **zero property-level color conditionals**; reuse existing styles — do not fork near-duplicates. Card surface tokens for `.card`: `--bg-secondary`, 1px `--border-default`, `--radius-card` (mapping rows). All color/background/border transitions use 200ms ease-in.
- ⚠ Three tokens are **UNRESOLVED** in this chunk's mapping (`--status-error`, `--status-success`, `--status-warning`) — but none are used by the five container rows above, so they do not apply to c2. Do not resolve or invent them here.

## DATA / PRIVACY
This chunk builds layout containers only — no reads, no writes, no new DT.

Tenant scoping (Pattern A) governs any data this reusable eventually binds, quoted verbatim from the bundle:
- CLAUDE.md: "Privacy rules check both: `Current User's company = This Thing's company AND Current User's property = This Thing's property`."
- security.md: "every business DT's privacy rule checks `Current User's company = This Thing's company AND Current User's property = This Thing's property`."
- Approved exception (do not re-flag): `User` DT is property-only (decisions.md 2026-07-16) — "property-only pins company transitively (Property→Company single-parent, one user = one property)."

Any write goes through a private server-guarded backend workflow — no UI-only or auto-bound writes. (Casino Settings' 3 writes are already via private guarded WFs per STATUS.md §3; this chunk adds none.)

## WU NOTES
No WU-relevant surface in this change. Reason: c2 creates static layout Groups with no `Do a search for`, `:count`, or list bindings — the WU guardrails (`wu-guardrails.md`: server-side constraints, load-once client filter, `:count`, denormalized fields) touch searches/filters, which this chunk contains none of.

## MANUAL VERIFICATION
- [NEG] As a lesser-privileged / different-tenant user (different `company` + `property`), open the Casino Settings page and confirm the card scaffold renders no data belonging to another tenant — BP runs as app owner (editor access **bypasses privacy rules**, CLI-MCP-PLAYBOOK §7), so it cannot prove cross-tenant negatives.
- [NEG] Log in as a user whose `property` differs from the Otium Batumi property and confirm no Company/Property values from another property surface once later chunks bind data into these containers.
- [NEG] Confirm a user cannot switch properties from this UI (CLAUDE.md: "Don't design UI [that] assumes a user can switch properties").

---

## MAPPING CONTRACT (verbatim from prototypes/casino-settings/mapping.md — do not reinterpret)

Produced names — create EXACTLY these, byte-for-byte:
- `/* container`
- `card-header container`
- `card-title container`
- `card-subtitle container`
- `card-body container`

Tokens used:

| var in file | canonical §2 token | dark | light | used by |
|---|---|---|---|---|
| `--accent` | `--accent` | #3B82F6 | #3B82F6 | .sidebar-item.active, .tab.active, .input:focus, .select:focus, .textarea:focus, .input-with-prefix:focus-within +4 |
| `--accent-active` | `--accent-active` | #1D4ED8 | #1D4ED8 | .btn-primary:active |
| `--accent-glow` | `--accent-glow` | rgba(59,130,246,0.13) | rgba(59,130,246,0.13) | .input:focus, .select:focus, .textarea:focus, .input-with-prefix:focus-within, .property-list-item.selected |
| `--accent-hover` | `--accent-hover` | #2563EB | #2563EB | .btn-primary:hover |
| `--bg-elevated` | `--bg-elevated` | #2A2A2A | #FFFFFF | .btn:hover, .property-avatar, .logo-upload, /* Inline edit toggle */ .save-bar +1 |
| `--bg-primary` | `--bg-primary` | #181818 | #FAFAFA | html, body |
| `--bg-secondary` | `--bg-secondary` | #1E1E1E | #FFFFFF | /* Sidebar */ .sidebar, .topbar, /* Cards */ .card, .input:disabled, .select:disabled, .textarea:disabled +1 |
| `--bg-tertiary` | `--bg-tertiary` | #242424 | #F4F4F5 | .sidebar-item:hover, .sidebar-item.active, .tab-count, .input, .select, .textarea +6 |
| `--border-active` | `--border-active` | #3D3D3D | #C8C8CB | .toggle-slider, .property-detail-empty, .logo-upload, /* Inline edit toggle */ .save-bar +1 |
| `--border-default` | `--border-default` | #242424 | #EAEAEB | /* Sidebar */ .sidebar, .logo, .topbar, /* Tabs */ .tabs +9 |
| `--border-hover` | `--border-hover` | #333333 | #DCDCDE | .input:hover, .select:hover, .textarea:hover, .btn:hover, .property-list-item:hover |
| `--radius-badge` | `--radius-badge` | 5px | 5px | /* Badge */ .badge |
| `--radius-btn` | `--radius-btn` | 7px | 7px | /* Buttons */ .btn |
| `--radius-card` | `--radius-card` | 10px | 10px | /* Cards */ .card, .property-list-item, .property-detail-empty |
| `--radius-input` | `--radius-input` | 7px | 7px | .input, .select, .textarea, .input-with-prefix |
| `--status-error` | **UNRESOLVED** | — | — | .label-required::after |
| `--status-success` | **UNRESOLVED** | — | — | .badge-success, /* Toast */ .toast, .toast svg |
| `--status-warning` | **UNRESOLVED** | — | — | .badge-warning |
| `--text-disabled` | `--text-disabled` | #565656 | #B6B6BB | .input:disabled, .select:disabled, .textarea:disabled |
| `--text-muted` | `--text-muted` | #6B6B6B | #8E8E95 | .sidebar-section-title, .breadcrumb-sep, .card-subtitle, .label-optional +9 |
| `--text-primary` | `--text-primary` | #E0E0E0 | #18181B | html, body, .sidebar-item:hover, .sidebar-item.active, .breadcrumb-current +13 |
| `--text-secondary` | `--text-secondary` | #A6A6A6 | #5F5F66 | .logo, .sidebar-item, .breadcrumb, .page-subtitle +6 |
| `--transition` | `--transition` | 160ms cubic-bezier(.4,0,.2,1) | 160ms cubic-bezier(.4,0,.2,1) | .sidebar-item, .tab, .input, .select, .textarea, .input-with-prefix +5 |

Chunk rows:

| `/*` | Sidebar (CRS-design-system.md §10) | Sidebar reusable — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `.card-header` | Layout / containers (page scaffold) (CRS-design-system.md §15) | CRS - Elevated Card — CRS-design-system.md §20 | reuse/clone by ID — never recreate |
| `.card-title` | Layout / containers (page scaffold) (CRS-design-system.md §15) | CRS - Elevated Card — CRS-design-system.md §20 | reuse/clone by ID — never recreate |
| `.card-subtitle` | Layout / containers (page scaffold) (CRS-design-system.md §15) | CRS - Elevated Card — CRS-design-system.md §20 | reuse/clone by ID — never recreate |
| `.card-body` | Layout / containers (page scaffold) (CRS-design-system.md §15) | CRS - Elevated Card — CRS-design-system.md §20 | reuse/clone by ID — never recreate |

