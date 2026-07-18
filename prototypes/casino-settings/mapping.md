# Mapping — casino-settings

Prototype: prototypes/casino-settings/casino-settings.html
Settled-SHA256: dd65bf739ecfb0ec006307238619fe693f2436df0237c24a96475bfd7990596a
Module: casino_settings
Inventory-Sources-SHA256: 0f8421ebb93f1ad3ad80c08a15614d4e87724fa95e88a9a49c45fcd766bc8a98 (design-system-export.md ABSENT — curated attested set)

## Tokens used (var → canonical → values)

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

## Local token block check (stale-token diff vs canon §2.10)

| declared | file value | canonical | canon dark | verdict |
|---|---|---|---|---|
| `--bg-primary` | #181818 | `--bg-primary` | #181818 | MATCH |
| `--bg-secondary` | #1E1E1E | `--bg-secondary` | #1E1E1E | MATCH |
| `--bg-tertiary` | #242424 | `--bg-tertiary` | #242424 | MATCH |
| `--bg-elevated` | #2A2A2A | `--bg-elevated` | #2A2A2A | MATCH |
| `--border-default` | #242424 | `--border-default` | #242424 | MATCH |
| `--border-hover` | #333333 | `--border-hover` | #333333 | MATCH |
| `--border-active` | #3D3D3D | `--border-active` | #3D3D3D | MATCH |
| `--accent` | #3B82F6 | `--accent` | #3B82F6 | MATCH |
| `--accent-hover` | #2563EB | `--accent-hover` | #2563EB | MATCH |
| `--accent-active` | #1D4ED8 | `--accent-active` | #1D4ED8 | MATCH |
| `--accent-glow` | rgba(59, 130, 246, 0.13) | `--accent-glow` | rgba(59,130,246,0.13) | MATCH |
| `--text-primary` | #E0E0E0 | `--text-primary` | #E0E0E0 | MATCH |
| `--text-secondary` | #A6A6A6 | `--text-secondary` | #A6A6A6 | MATCH |
| `--text-muted` | #6B6B6B | `--text-muted` | #6B6B6B | MATCH |
| `--text-disabled` | #565656 | `--text-disabled` | #565656 | MATCH |
| `--status-success` | #22C55E | — | — | UNKNOWN |
| `--status-error` | #EF4444 | — | — | UNKNOWN |
| `--status-warning` | #F59E0B | — | — | UNKNOWN |
| `--status-purple` | #8B5CF6 | — | — | UNKNOWN |
| `--status-cyan` | #06B6D4 | — | — | UNKNOWN |
| `--transition` | 160ms cubic-bezier(.4, 0, .2, 1) | `--transition` | 160ms cubic-bezier(.4,0,.2,1) | MATCH |
| `--radius-card` | 10px | `--radius-card` | 10px | MATCH |
| `--radius-btn` | 7px | `--radius-btn` | 7px | MATCH |
| `--radius-input` | 7px | `--radius-input` | 7px | MATCH |
| `--radius-badge` | 5px | `--radius-badge` | 5px | MATCH |
| `--radius-pill` | 20px | `--radius-pill` | 20px | MATCH |

## Components detected (→ family, find-first existing)

| selector | family | existing style / reusable | disposition |
|---|---|---|---|
| `/*` | Sidebar (CRS-design-system.md §10) | Sidebar reusable — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `.sidebar-section` | Sidebar (CRS-design-system.md §10) | Sidebar reusable — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `.sidebar-section-title` | Sidebar (CRS-design-system.md §10) | Sidebar reusable — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `.sidebar-item` | Sidebar (CRS-design-system.md §10) | Sidebar reusable — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `.sidebar-item.active` | Sidebar (CRS-design-system.md §10) | Sidebar reusable — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `/*` | Layout / containers (page scaffold) (CRS-design-system.md §15) | CRS - Elevated Card — CRS-design-system.md §20 | reuse/clone by ID — never recreate |
| `.card-header` | Layout / containers (page scaffold) (CRS-design-system.md §15) | CRS - Elevated Card — CRS-design-system.md §20 | reuse/clone by ID — never recreate |
| `.card-title` | Layout / containers (page scaffold) (CRS-design-system.md §15) | CRS - Elevated Card — CRS-design-system.md §20 | reuse/clone by ID — never recreate |
| `.card-subtitle` | Layout / containers (page scaffold) (CRS-design-system.md §15) | CRS - Elevated Card — CRS-design-system.md §20 | reuse/clone by ID — never recreate |
| `.card-body` | Layout / containers (page scaffold) (CRS-design-system.md §15) | CRS - Elevated Card — CRS-design-system.md §20 | reuse/clone by ID — never recreate |
| `.input,` | Dropdown & filter (CRS-design-system.md §7) | # Dropdown - Single / Multi — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `.input` | Dropdown & filter (CRS-design-system.md §7) | # Dropdown - Single / Multi — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `/*` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-primary` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-ghost` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-large` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-small` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `/*` | Selection controls (checkbox · radio · switch) (CRS-design-system.md §20.2) | Theme toggle — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `.toggle` | Selection controls (checkbox · radio · switch) (CRS-design-system.md §20.2) | Theme toggle — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `.toggle-slider` | Selection controls (checkbox · radio · switch) (CRS-design-system.md §20.2) | Theme toggle — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `/*` | Chips & badges (CRS-design-system.md §20.7) | Chip Active — CRS-design-system.md §20.7 | reuse/clone by ID — never recreate |
| `.badge-success` | Chips & badges (CRS-design-system.md §20.7) | Chip Active — CRS-design-system.md §20.7 | reuse/clone by ID — never recreate |
| `.badge-warning` | Chips & badges (CRS-design-system.md §20.7) | Chip Active — CRS-design-system.md §20.7 | reuse/clone by ID — never recreate |
| `.property-list-item.selected` | Dropdown & filter (CRS-design-system.md §7) | # Dropdown - Single / Multi — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `.property-avatar` | Avatars (CRS-design-system.md §20.5) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `/*` | Toast / notification (CRS-design-system.md §9) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.toast.visible` | Toast / notification (CRS-design-system.md §9) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.toast` | Toast / notification (CRS-design-system.md §9) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `/*` | KPI tiles (CRS-design-system.md §20.4) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.stat` | KPI tiles (CRS-design-system.md §20.4) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.stat-label` | KPI tiles (CRS-design-system.md §20.4) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.stat-value` | KPI tiles (CRS-design-system.md §20.4) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |

## Interactions demonstrated

- .btn states: hover
- .btn-ghost states: hover
- .btn-primary states: active/hover
- .input states: disabled/focus/hover
- .input-with-prefix states: focus
- .logo-upload states: hover
- .property-list-item states: hover
- .sidebar-item states: hover
- .tab states: hover
- .toggle input states: checked
- disabled attribute states demonstrated
- script-driven behavior present (<script>/onclick) — inventory manually before workflow chunks
- transform on .property-list-search-icon → translateY(-50%)
- transform on .save-bar.visible → translate(-50%, 0)
- transform on .toast.visible → translateX(0)
- transform on .toggle input:checked + .toggle-slider::before → translateX(16px)
- transform on /* Inline edit toggle */ .save-bar → translate(-50%, calc(100% + 32px))
- transform on /* Toast */ .toast → translateX(calc(100% + 32px))
- transform on from → translateY(4px)
- transform on to → translateY(0)
- transition on .input, .select, .textarea → all var(--transition)
- transition on .input-with-prefix → all var(--transition)
- transition on .logo-upload → var(--transition)
- transition on .property-list-item → all var(--transition)
- transition on .sidebar-item → all var(--transition)
- transition on .tab → all var(--transition)
- transition on .toggle-slider → var(--transition)
- transition on .toggle-slider::before → var(--transition)
- transition on /* Buttons */ .btn → all var(--transition)
- transition on /* Inline edit toggle */ .save-bar → transform 240ms cubic-bezier(.34, 1.56, .64, 1)
- transition on /* Toast */ .toast → transform 240ms cubic-bezier(.34, 1.56, .64, 1)

## FLAGGED — blocking until each is resolved (map / approve-as-literal / fix prototype)

| id | kind | value | location | nearest token | status | resolution |
|---|---|---|---|---|---|---|
| f1 | unknown-token | `--status-cyan:#06B6D4` | :root · --status-cyan · L10 | — | unresolved |  |
| f2 | unknown-token | `--status-error:#EF4444` | :root · --status-error · L10 | — | unresolved |  |
| f3 | unknown-token | `--status-purple:#8B5CF6` | :root · --status-purple · L10 | — | unresolved |  |
| f4 | unknown-token | `--status-success:#22C55E` | :root · --status-success · L10 | — | unresolved |  |
| f5 | unknown-token | `--status-warning:#F59E0B` | :root · --status-warning · L10 | — | unresolved |  |
| f6 | literal | `22px` | .toggle-slider · border-radius · L403 | --radius-pill | unresolved |  |
| f7 | literal | `rgba(34, 197, 94, 0.1)` | .badge-success · background · L444 | --success | unresolved |  |
| f8 | literal | `rgba(34, 197, 94, 0.3)` | .badge-success · border-color · L444 | --success | unresolved |  |
| f9 | literal | `rgba(245, 158, 11, 0.1)` | .badge-warning · background · L450 | --warning | unresolved |  |
| f10 | literal | `rgba(245, 158, 11, 0.3)` | .badge-warning · border-color · L450 | --warning | unresolved |  |
| f11 | literal | `rgba(0, 0, 0, 0.6)` | /* Inline edit toggle */ .save-bar · box-shadow · L573 | --black | unresolved |  |
| f12 | literal | `rgba(0, 0, 0, 0.55)` | /* Toast */ .toast · box-shadow · L599 | --black | unresolved |  |

## Value-matched literals (auto-mapped, non-blocking — fix in prototype when convenient)

| value | location | matches token (theme) | suggested fix |
|---|---|---|---|
| `10px` | .tab-count · border-radius · L210 | `--radius-card` (dark) | replace with var(--radius-card) |
| `8px` | .property-avatar · border-radius · L515 | `--space-sm` (dark) | replace with var(--space-sm) |
| `12px` | .logo-upload · border-radius · L553 | `--radius-modal` (dark) | replace with var(--radius-modal) |
| `12px` | /* Inline edit toggle */ .save-bar · border-radius · L573 | `--radius-modal` (dark) | replace with var(--radius-modal) |
| `8px` | /* Toast */ .toast · border-radius · L599 | `--space-sm` (dark) | replace with var(--space-sm) |
| `8px` | .stat · border-radius · L636 | `--space-sm` (dark) | replace with var(--space-sm) |
| `4px` | ::-webkit-scrollbar-thumb · border-radius · L650 | `--space-xs` (dark) | replace with var(--space-xs) |

```json crs-mapping
{
  "name": "casino-settings",
  "module": "casino_settings",
  "settledHash": "dd65bf739ecfb0ec006307238619fe693f2436df0237c24a96475bfd7990596a",
  "inventorySha": "0f8421ebb93f1ad3ad80c08a15614d4e87724fa95e88a9a49c45fcd766bc8a98",
  "tokenRows": [
    {
      "var": "--accent",
      "canonical": "--accent",
      "dark": "#3B82F6",
      "light": "#3B82F6",
      "selectors": [
        ".sidebar-item.active",
        ".tab.active",
        ".input:focus, .select:focus, .textarea:focus",
        ".input-with-prefix:focus-within",
        ".btn-primary",
        ".toggle input:checked + .toggle-slider",
        ".property-list-item.selected",
        ".logo-upload:hover"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--accent-active",
      "canonical": "--accent-active",
      "dark": "#1D4ED8",
      "light": "#1D4ED8",
      "selectors": [
        ".btn-primary:active"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--accent-glow",
      "canonical": "--accent-glow",
      "dark": "rgba(59,130,246,0.13)",
      "light": "rgba(59,130,246,0.13)",
      "selectors": [
        ".input:focus, .select:focus, .textarea:focus",
        ".input-with-prefix:focus-within",
        ".property-list-item.selected"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--accent-hover",
      "canonical": "--accent-hover",
      "dark": "#2563EB",
      "light": "#2563EB",
      "selectors": [
        ".btn-primary:hover"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--bg-elevated",
      "canonical": "--bg-elevated",
      "dark": "#2A2A2A",
      "light": "#FFFFFF",
      "selectors": [
        ".btn:hover",
        ".property-avatar",
        ".logo-upload",
        "/* Inline edit toggle */ .save-bar",
        "/* Toast */ .toast"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--bg-primary",
      "canonical": "--bg-primary",
      "dark": "#181818",
      "light": "#FAFAFA",
      "selectors": [
        "html, body"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--bg-secondary",
      "canonical": "--bg-secondary",
      "dark": "#1E1E1E",
      "light": "#FFFFFF",
      "selectors": [
        "/* Sidebar */ .sidebar",
        ".topbar",
        "/* Cards */ .card",
        ".input:disabled, .select:disabled, .textarea:disabled",
        ".property-list-item"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--bg-tertiary",
      "canonical": "--bg-tertiary",
      "dark": "#242424",
      "light": "#F4F4F5",
      "selectors": [
        ".sidebar-item:hover",
        ".sidebar-item.active",
        ".tab-count",
        ".input, .select, .textarea",
        ".input-with-prefix",
        "/* Buttons */ .btn",
        ".btn-ghost:hover",
        ".property-list-item:hover",
        ".property-list-item.selected",
        ".stat"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--border-active",
      "canonical": "--border-active",
      "dark": "#3D3D3D",
      "light": "#C8C8CB",
      "selectors": [
        ".toggle-slider",
        ".property-detail-empty",
        ".logo-upload",
        "/* Inline edit toggle */ .save-bar",
        "::-webkit-scrollbar-thumb"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--border-default",
      "canonical": "--border-default",
      "dark": "#242424",
      "light": "#EAEAEB",
      "selectors": [
        "/* Sidebar */ .sidebar",
        ".logo",
        ".topbar",
        "/* Tabs */ .tabs",
        "/* Cards */ .card",
        ".card-header",
        ".input, .select, .textarea",
        ".input-with-prefix",
        "/* Buttons */ .btn",
        ".property-list-item",
        ".property-avatar",
        "/* Identity row (logo + name) */ .identity-row",
        ".stat"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--border-hover",
      "canonical": "--border-hover",
      "dark": "#333333",
      "light": "#DCDCDE",
      "selectors": [
        ".input:hover, .select:hover, .textarea:hover",
        ".btn:hover",
        ".property-list-item:hover"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--radius-badge",
      "canonical": "--radius-badge",
      "dark": "5px",
      "light": "5px",
      "selectors": [
        "/* Badge */ .badge"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--radius-btn",
      "canonical": "--radius-btn",
      "dark": "7px",
      "light": "7px",
      "selectors": [
        "/* Buttons */ .btn"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--radius-card",
      "canonical": "--radius-card",
      "dark": "10px",
      "light": "10px",
      "selectors": [
        "/* Cards */ .card",
        ".property-list-item",
        ".property-detail-empty"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--radius-input",
      "canonical": "--radius-input",
      "dark": "7px",
      "light": "7px",
      "selectors": [
        ".input, .select, .textarea",
        ".input-with-prefix"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--status-error",
      "canonical": null,
      "dark": null,
      "light": null,
      "selectors": [
        ".label-required::after"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--status-success",
      "canonical": null,
      "dark": null,
      "light": null,
      "selectors": [
        ".badge-success",
        "/* Toast */ .toast",
        ".toast svg"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--status-warning",
      "canonical": null,
      "dark": null,
      "light": null,
      "selectors": [
        ".badge-warning"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--text-disabled",
      "canonical": "--text-disabled",
      "dark": "#565656",
      "light": "#B6B6BB",
      "selectors": [
        ".input:disabled, .select:disabled, .textarea:disabled"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--text-muted",
      "canonical": "--text-muted",
      "dark": "#6B6B6B",
      "light": "#8E8E95",
      "selectors": [
        ".sidebar-section-title",
        ".breadcrumb-sep",
        ".card-subtitle",
        ".label-optional",
        ".input-prefix",
        ".helper",
        ".property-list-search-icon",
        ".property-meta",
        ".property-detail-empty",
        ".logo-upload",
        ".stat-label",
        "::-webkit-scrollbar-thumb:hover",
        "<div style=\"\">"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--text-primary",
      "canonical": "--text-primary",
      "dark": "#E0E0E0",
      "light": "#18181B",
      "selectors": [
        "html, body",
        ".sidebar-item:hover",
        ".sidebar-item.active",
        ".breadcrumb-current",
        ".page-title",
        ".tab:hover",
        ".tab.active",
        ".card-title",
        ".input, .select, .textarea",
        "/* Buttons */ .btn",
        ".btn-ghost:hover",
        ".toggle-slider::before",
        ".property-name",
        ".save-bar-text strong",
        "/* Toast */ .toast",
        ".stat-value",
        "<div style=\"\">"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--text-secondary",
      "canonical": "--text-secondary",
      "dark": "#A6A6A6",
      "light": "#5F5F66",
      "selectors": [
        ".logo",
        ".sidebar-item",
        ".breadcrumb",
        ".page-subtitle",
        ".tab",
        ".tab-count",
        ".label",
        ".btn-ghost",
        ".property-avatar",
        ".save-bar-text"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--transition",
      "canonical": "--transition",
      "dark": "160ms cubic-bezier(.4,0,.2,1)",
      "light": "160ms cubic-bezier(.4,0,.2,1)",
      "selectors": [
        ".sidebar-item",
        ".tab",
        ".input, .select, .textarea",
        ".input-with-prefix",
        "/* Buttons */ .btn",
        ".toggle-slider",
        ".toggle-slider::before",
        ".property-list-item",
        ".logo-upload"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    }
  ],
  "localTokens": [
    {
      "declared": "--bg-primary",
      "value": "#181818",
      "canonical": "--bg-primary",
      "theme": "dark",
      "canonDark": "#181818",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--bg-secondary",
      "value": "#1E1E1E",
      "canonical": "--bg-secondary",
      "theme": "dark",
      "canonDark": "#1E1E1E",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--bg-tertiary",
      "value": "#242424",
      "canonical": "--bg-tertiary",
      "theme": "dark",
      "canonDark": "#242424",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--bg-elevated",
      "value": "#2A2A2A",
      "canonical": "--bg-elevated",
      "theme": "dark",
      "canonDark": "#2A2A2A",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--border-default",
      "value": "#242424",
      "canonical": "--border-default",
      "theme": "dark",
      "canonDark": "#242424",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--border-hover",
      "value": "#333333",
      "canonical": "--border-hover",
      "theme": "dark",
      "canonDark": "#333333",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--border-active",
      "value": "#3D3D3D",
      "canonical": "--border-active",
      "theme": "dark",
      "canonDark": "#3D3D3D",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--accent",
      "value": "#3B82F6",
      "canonical": "--accent",
      "theme": "dark",
      "canonDark": "#3B82F6",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--accent-hover",
      "value": "#2563EB",
      "canonical": "--accent-hover",
      "theme": "dark",
      "canonDark": "#2563EB",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--accent-active",
      "value": "#1D4ED8",
      "canonical": "--accent-active",
      "theme": "dark",
      "canonDark": "#1D4ED8",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--accent-glow",
      "value": "rgba(59, 130, 246, 0.13)",
      "canonical": "--accent-glow",
      "theme": "dark",
      "canonDark": "rgba(59,130,246,0.13)",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--text-primary",
      "value": "#E0E0E0",
      "canonical": "--text-primary",
      "theme": "dark",
      "canonDark": "#E0E0E0",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--text-secondary",
      "value": "#A6A6A6",
      "canonical": "--text-secondary",
      "theme": "dark",
      "canonDark": "#A6A6A6",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--text-muted",
      "value": "#6B6B6B",
      "canonical": "--text-muted",
      "theme": "dark",
      "canonDark": "#6B6B6B",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--text-disabled",
      "value": "#565656",
      "canonical": "--text-disabled",
      "theme": "dark",
      "canonDark": "#565656",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--status-success",
      "value": "#22C55E",
      "canonical": null,
      "theme": "dark",
      "canonDark": null,
      "verdict": "UNKNOWN",
      "line": 10
    },
    {
      "declared": "--status-error",
      "value": "#EF4444",
      "canonical": null,
      "theme": "dark",
      "canonDark": null,
      "verdict": "UNKNOWN",
      "line": 10
    },
    {
      "declared": "--status-warning",
      "value": "#F59E0B",
      "canonical": null,
      "theme": "dark",
      "canonDark": null,
      "verdict": "UNKNOWN",
      "line": 10
    },
    {
      "declared": "--status-purple",
      "value": "#8B5CF6",
      "canonical": null,
      "theme": "dark",
      "canonDark": null,
      "verdict": "UNKNOWN",
      "line": 10
    },
    {
      "declared": "--status-cyan",
      "value": "#06B6D4",
      "canonical": null,
      "theme": "dark",
      "canonDark": null,
      "verdict": "UNKNOWN",
      "line": 10
    },
    {
      "declared": "--transition",
      "value": "160ms cubic-bezier(.4, 0, .2, 1)",
      "canonical": "--transition",
      "theme": "dark",
      "canonDark": "160ms cubic-bezier(.4,0,.2,1)",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--radius-card",
      "value": "10px",
      "canonical": "--radius-card",
      "theme": "dark",
      "canonDark": "10px",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--radius-btn",
      "value": "7px",
      "canonical": "--radius-btn",
      "theme": "dark",
      "canonDark": "7px",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--radius-input",
      "value": "7px",
      "canonical": "--radius-input",
      "theme": "dark",
      "canonDark": "7px",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--radius-badge",
      "value": "5px",
      "canonical": "--radius-badge",
      "theme": "dark",
      "canonDark": "5px",
      "verdict": "MATCH",
      "line": 10
    },
    {
      "declared": "--radius-pill",
      "value": "20px",
      "canonical": "--radius-pill",
      "theme": "dark",
      "canonDark": "20px",
      "verdict": "MATCH",
      "line": 10
    }
  ],
  "flags": [
    {
      "kind": "unknown-token",
      "value": "--status-cyan:#06B6D4",
      "selector": ":root",
      "prop": "--status-cyan",
      "line": 10,
      "nearest": null,
      "id": "f1",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "unknown-token",
      "value": "--status-error:#EF4444",
      "selector": ":root",
      "prop": "--status-error",
      "line": 10,
      "nearest": null,
      "id": "f2",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "unknown-token",
      "value": "--status-purple:#8B5CF6",
      "selector": ":root",
      "prop": "--status-purple",
      "line": 10,
      "nearest": null,
      "id": "f3",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "unknown-token",
      "value": "--status-success:#22C55E",
      "selector": ":root",
      "prop": "--status-success",
      "line": 10,
      "nearest": null,
      "id": "f4",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "unknown-token",
      "value": "--status-warning:#F59E0B",
      "selector": ":root",
      "prop": "--status-warning",
      "line": 10,
      "nearest": null,
      "id": "f5",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "literal",
      "value": "22px",
      "selector": ".toggle-slider",
      "prop": "border-radius",
      "line": 403,
      "nearest": "--radius-pill",
      "id": "f6",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "literal",
      "value": "rgba(34, 197, 94, 0.1)",
      "selector": ".badge-success",
      "prop": "background",
      "line": 444,
      "nearest": "--success",
      "id": "f7",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "literal",
      "value": "rgba(34, 197, 94, 0.3)",
      "selector": ".badge-success",
      "prop": "border-color",
      "line": 444,
      "nearest": "--success",
      "id": "f8",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "literal",
      "value": "rgba(245, 158, 11, 0.1)",
      "selector": ".badge-warning",
      "prop": "background",
      "line": 450,
      "nearest": "--warning",
      "id": "f9",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "literal",
      "value": "rgba(245, 158, 11, 0.3)",
      "selector": ".badge-warning",
      "prop": "border-color",
      "line": 450,
      "nearest": "--warning",
      "id": "f10",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "literal",
      "value": "rgba(0, 0, 0, 0.6)",
      "selector": "/* Inline edit toggle */ .save-bar",
      "prop": "box-shadow",
      "line": 573,
      "nearest": "--black",
      "id": "f11",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "literal",
      "value": "rgba(0, 0, 0, 0.55)",
      "selector": "/* Toast */ .toast",
      "prop": "box-shadow",
      "line": 599,
      "nearest": "--black",
      "id": "f12",
      "status": "unresolved",
      "resolution": ""
    }
  ],
  "matched": [
    {
      "value": "10px",
      "selector": ".tab-count",
      "prop": "border-radius",
      "line": 210,
      "token": "--radius-card",
      "theme": "dark",
      "fix": "replace with var(--radius-card)"
    },
    {
      "value": "8px",
      "selector": ".property-avatar",
      "prop": "border-radius",
      "line": 515,
      "token": "--space-sm",
      "theme": "dark",
      "fix": "replace with var(--space-sm)"
    },
    {
      "value": "12px",
      "selector": ".logo-upload",
      "prop": "border-radius",
      "line": 553,
      "token": "--radius-modal",
      "theme": "dark",
      "fix": "replace with var(--radius-modal)"
    },
    {
      "value": "12px",
      "selector": "/* Inline edit toggle */ .save-bar",
      "prop": "border-radius",
      "line": 573,
      "token": "--radius-modal",
      "theme": "dark",
      "fix": "replace with var(--radius-modal)"
    },
    {
      "value": "8px",
      "selector": "/* Toast */ .toast",
      "prop": "border-radius",
      "line": 599,
      "token": "--space-sm",
      "theme": "dark",
      "fix": "replace with var(--space-sm)"
    },
    {
      "value": "8px",
      "selector": ".stat",
      "prop": "border-radius",
      "line": 636,
      "token": "--space-sm",
      "theme": "dark",
      "fix": "replace with var(--space-sm)"
    },
    {
      "value": "4px",
      "selector": "::-webkit-scrollbar-thumb",
      "prop": "border-radius",
      "line": 650,
      "token": "--space-xs",
      "theme": "dark",
      "fix": "replace with var(--space-xs)"
    }
  ],
  "compRows": [
    {
      "selector": "/*",
      "family": "sidebar",
      "familyName": "Sidebar",
      "ref": "CRS-design-system.md §10",
      "existing": "Sidebar reusable — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".sidebar-section",
      "family": "sidebar",
      "familyName": "Sidebar",
      "ref": "CRS-design-system.md §10",
      "existing": "Sidebar reusable — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".sidebar-section-title",
      "family": "sidebar",
      "familyName": "Sidebar",
      "ref": "CRS-design-system.md §10",
      "existing": "Sidebar reusable — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".sidebar-item",
      "family": "sidebar",
      "familyName": "Sidebar",
      "ref": "CRS-design-system.md §10",
      "existing": "Sidebar reusable — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".sidebar-item.active",
      "family": "sidebar",
      "familyName": "Sidebar",
      "ref": "CRS-design-system.md §10",
      "existing": "Sidebar reusable — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": "/*",
      "family": "layout",
      "familyName": "Layout / containers (page scaffold)",
      "ref": "CRS-design-system.md §15",
      "existing": "CRS - Elevated Card — CRS-design-system.md §20",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".card-header",
      "family": "layout",
      "familyName": "Layout / containers (page scaffold)",
      "ref": "CRS-design-system.md §15",
      "existing": "CRS - Elevated Card — CRS-design-system.md §20",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".card-title",
      "family": "layout",
      "familyName": "Layout / containers (page scaffold)",
      "ref": "CRS-design-system.md §15",
      "existing": "CRS - Elevated Card — CRS-design-system.md §20",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".card-subtitle",
      "family": "layout",
      "familyName": "Layout / containers (page scaffold)",
      "ref": "CRS-design-system.md §15",
      "existing": "CRS - Elevated Card — CRS-design-system.md §20",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".card-body",
      "family": "layout",
      "familyName": "Layout / containers (page scaffold)",
      "ref": "CRS-design-system.md §15",
      "existing": "CRS - Elevated Card — CRS-design-system.md §20",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".input,",
      "family": "dropdown",
      "familyName": "Dropdown & filter",
      "ref": "CRS-design-system.md §7",
      "existing": "# Dropdown - Single / Multi — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".input",
      "family": "dropdown",
      "familyName": "Dropdown & filter",
      "ref": "CRS-design-system.md §7",
      "existing": "# Dropdown - Single / Multi — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": "/*",
      "family": "buttons",
      "familyName": "Buttons (variants/sizes/states)",
      "ref": "CRS-design-system.md §14 + design/CRS_UI_Kit.html §3",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".btn",
      "family": "buttons",
      "familyName": "Buttons (variants/sizes/states)",
      "ref": "CRS-design-system.md §14 + design/CRS_UI_Kit.html §3",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".btn-primary",
      "family": "buttons",
      "familyName": "Buttons (variants/sizes/states)",
      "ref": "CRS-design-system.md §14 + design/CRS_UI_Kit.html §3",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".btn-ghost",
      "family": "buttons",
      "familyName": "Buttons (variants/sizes/states)",
      "ref": "CRS-design-system.md §14 + design/CRS_UI_Kit.html §3",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".btn-large",
      "family": "buttons",
      "familyName": "Buttons (variants/sizes/states)",
      "ref": "CRS-design-system.md §14 + design/CRS_UI_Kit.html §3",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".btn-small",
      "family": "buttons",
      "familyName": "Buttons (variants/sizes/states)",
      "ref": "CRS-design-system.md §14 + design/CRS_UI_Kit.html §3",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": "/*",
      "family": "20.2",
      "familyName": "Selection controls (checkbox · radio · switch)",
      "ref": "CRS-design-system.md §20.2",
      "existing": "Theme toggle — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".toggle",
      "family": "20.2",
      "familyName": "Selection controls (checkbox · radio · switch)",
      "ref": "CRS-design-system.md §20.2",
      "existing": "Theme toggle — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".toggle-slider",
      "family": "20.2",
      "familyName": "Selection controls (checkbox · radio · switch)",
      "ref": "CRS-design-system.md §20.2",
      "existing": "Theme toggle — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": "/*",
      "family": "20.7",
      "familyName": "Chips & badges",
      "ref": "CRS-design-system.md §20.7",
      "existing": "Chip Active — CRS-design-system.md §20.7",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".badge-success",
      "family": "20.7",
      "familyName": "Chips & badges",
      "ref": "CRS-design-system.md §20.7",
      "existing": "Chip Active — CRS-design-system.md §20.7",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".badge-warning",
      "family": "20.7",
      "familyName": "Chips & badges",
      "ref": "CRS-design-system.md §20.7",
      "existing": "Chip Active — CRS-design-system.md §20.7",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".property-list-item.selected",
      "family": "dropdown",
      "familyName": "Dropdown & filter",
      "ref": "CRS-design-system.md §7",
      "existing": "# Dropdown - Single / Multi — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".property-avatar",
      "family": "20.5",
      "familyName": "Avatars",
      "ref": "CRS-design-system.md §20.5",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": "/*",
      "family": "toast",
      "familyName": "Toast / notification",
      "ref": "CRS-design-system.md §9",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".toast.visible",
      "family": "toast",
      "familyName": "Toast / notification",
      "ref": "CRS-design-system.md §9",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".toast",
      "family": "toast",
      "familyName": "Toast / notification",
      "ref": "CRS-design-system.md §9",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": "/*",
      "family": "20.4",
      "familyName": "KPI tiles",
      "ref": "CRS-design-system.md §20.4",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".stat",
      "family": "20.4",
      "familyName": "KPI tiles",
      "ref": "CRS-design-system.md §20.4",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".stat-label",
      "family": "20.4",
      "familyName": "KPI tiles",
      "ref": "CRS-design-system.md §20.4",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".stat-value",
      "family": "20.4",
      "familyName": "KPI tiles",
      "ref": "CRS-design-system.md §20.4",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    }
  ],
  "interactions": [
    ".btn states: hover",
    ".btn-ghost states: hover",
    ".btn-primary states: active/hover",
    ".input states: disabled/focus/hover",
    ".input-with-prefix states: focus",
    ".logo-upload states: hover",
    ".property-list-item states: hover",
    ".sidebar-item states: hover",
    ".tab states: hover",
    ".toggle input states: checked",
    "disabled attribute states demonstrated",
    "script-driven behavior present (<script>/onclick) — inventory manually before workflow chunks",
    "transform on .property-list-search-icon → translateY(-50%)",
    "transform on .save-bar.visible → translate(-50%, 0)",
    "transform on .toast.visible → translateX(0)",
    "transform on .toggle input:checked + .toggle-slider::before → translateX(16px)",
    "transform on /* Inline edit toggle */ .save-bar → translate(-50%, calc(100% + 32px))",
    "transform on /* Toast */ .toast → translateX(calc(100% + 32px))",
    "transform on from → translateY(4px)",
    "transform on to → translateY(0)",
    "transition on .input, .select, .textarea → all var(--transition)",
    "transition on .input-with-prefix → all var(--transition)",
    "transition on .logo-upload → var(--transition)",
    "transition on .property-list-item → all var(--transition)",
    "transition on .sidebar-item → all var(--transition)",
    "transition on .tab → all var(--transition)",
    "transition on .toggle-slider → var(--transition)",
    "transition on .toggle-slider::before → var(--transition)",
    "transition on /* Buttons */ .btn → all var(--transition)",
    "transition on /* Inline edit toggle */ .save-bar → transform 240ms cubic-bezier(.34, 1.56, .64, 1)",
    "transition on /* Toast */ .toast → transform 240ms cubic-bezier(.34, 1.56, .64, 1)"
  ]
}
```
