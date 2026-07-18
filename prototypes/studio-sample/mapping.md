# Mapping — studio-sample

Prototype: prototypes/studio-sample/studio-sample.html
Settled-SHA256: 3bcca213cef6467fd5734abea83e893910e36360e82b7bcfa1f1e75d5d28eff4
Module: user_management
Inventory-Sources-SHA256: 0f8421ebb93f1ad3ad80c08a15614d4e87724fa95e88a9a49c45fcd766bc8a98 (design-system-export.md ABSENT — curated attested set)

## Tokens used (var → canonical → values)

| var in file | canonical §2 token | dark | light | used by |
|---|---|---|---|---|
| `--bg-primary` | `--bg-primary` | #181818 | #FAFAFA | html |
| `--bg-secondary` | `--bg-secondary` | #1E1E1E | #FFFFFF | .proto-head, .tile |
| `--bg-tertiary` | `--bg-tertiary` | #242424 | #F4F4F5 | .theme-toggle |
| `--border-default` | `--border-default` | #242424 | #EAEAEB | .proto-head, .theme-toggle, .tile |
| `--border-hover` | `--border-hover` | #333333 | #DCDCDE | .theme-toggle:hover, .tile:hover |
| `--radius-btn` | `--radius-btn` | 7px | 7px | .theme-toggle |
| `--radius-card` | `--radius-card` | 10px | 10px | .tile |
| `--success` | `--success` | #22C55E | #16A34A | .tile .d |
| `--text-muted` | `--text-muted` | #6B6B6B | #8E8E95 | .tile .k |
| `--text-primary` | `--text-primary` | #E0E0E0 | #18181B | .proto-head h1, .theme-toggle:hover, .tile .v |
| `--text-secondary` | `--text-secondary` | #A6A6A6 | #5F5F66 | html, .theme-toggle |
| `--transition-colors` | `--transition-colors` | 200ms ease-in | 200ms ease-in | /* Smooth theme cross-fade — apply broadly */ * |

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
| `--input-border` | #2A2A2A | `--input-border` | #2A2A2A | MATCH |
| `--accent` | #3B82F6 | `--accent` | #3B82F6 | MATCH |
| `--accent-hover` | #2563EB | `--accent-hover` | #2563EB | MATCH |
| `--accent-active` | #1D4ED8 | `--accent-active` | #1D4ED8 | MATCH |
| `--accent-text` | #3B82F6 | `--accent-text` | #3B82F6 | MATCH |
| `--accent-soft` | #60A5FA | `--accent-soft` | #60A5FA | MATCH |
| `--accent-glow` | rgba(59,130,246,0.13) | `--accent-glow` | rgba(59,130,246,0.13) | MATCH |
| `--accent-tint` | rgba(59,130,246,0.08) | `--accent-tint` | rgba(59,130,246,0.08) | MATCH |
| `--accent-border-active` | rgba(59,130,246,0.55) | `--accent-border-active` | rgba(59,130,246,0.55) | MATCH |
| `--text-primary` | #E0E0E0 | `--text-primary` | #E0E0E0 | MATCH |
| `--text-secondary` | #A6A6A6 | `--text-secondary` | #A6A6A6 | MATCH |
| `--text-muted` | #6B6B6B | `--text-muted` | #6B6B6B | MATCH |
| `--text-disabled` | #565656 | `--text-disabled` | #565656 | MATCH |
| `--success` | #22C55E | `--success` | #22C55E | MATCH |
| `--success-soft` | #4ADE80 | `--success-soft` | #4ADE80 | MATCH |
| `--error` | #EF4444 | `--error` | #EF4444 | MATCH |
| `--error-soft` | #F87171 | `--error-soft` | #F87171 | MATCH |
| `--warning` | #F59E0B | `--warning` | #F59E0B | MATCH |
| `--purple` | #8B5CF6 | `--purple` | #8B5CF6 | MATCH |
| `--purple-accent` | #A855F7 | `--purple-accent` | #A855F7 | MATCH |
| `--cyan` | #06B6D4 | `--cyan` | #06B6D4 | MATCH |
| `--na` | #2B2B2B | `--na` | #2B2B2B | MATCH |
| `--success-tint` | rgba(34,197,94,0.13) | `--success-tint` | rgba(34,197,94,0.13) | MATCH |
| `--warning-tint` | rgba(245,158,11,0.13) | `--warning-tint` | rgba(245,158,11,0.13) | MATCH |
| `--error-tint` | rgba(239,68,68,0.13) | `--error-tint` | rgba(239,68,68,0.13) | MATCH |
| `--white` | #FFFFFF | `--white` | #FFFFFF | MATCH |
| `--black` | #000000 | `--black` | #000000 | MATCH |
| `--transparent` | rgba(255,255,255,0) | `--transparent` | rgba(255,255,255,0) | MATCH |
| `--shadow-modal` | 0 24px 60px rgba(0,0,0,0.6) | `--shadow-modal` | 0 24px 60px rgba(0,0,0,0.6) | MATCH |
| `--shadow-dropdown` | 0 12px 40px rgba(0,0,0,0.55) | `--shadow-dropdown` | 0 12px 40px rgba(0,0,0,0.55) | MATCH |
| `--transition` | 160ms cubic-bezier(.4,0,.2,1) | `--transition` | 160ms cubic-bezier(.4,0,.2,1) | MATCH |
| `--transition-colors` | 200ms ease-in | `--transition-colors` | 200ms ease-in | MATCH |
| `--radius-card` | 10px | `--radius-card` | 10px | MATCH |
| `--radius-btn` | 7px | `--radius-btn` | 7px | MATCH |
| `--radius-input` | 7px | `--radius-input` | 7px | MATCH |
| `--radius-modal` | 12px | `--radius-modal` | 12px | MATCH |
| `--radius-badge` | 5px | `--radius-badge` | 5px | MATCH |
| `--radius-pill` | 20px | `--radius-pill` | 20px | MATCH |

## Components detected (→ family, find-first existing)

| selector | family | existing style / reusable | disposition |
|---|---|---|---|
| `.theme-toggle` | Selection controls (checkbox · radio · switch) (CRS-design-system.md §20.2) | Theme toggle — brain/STATUS.md §6 | reuse/clone by ID — never recreate |
| `.stage` | Chips & badges (CRS-design-system.md §20.7) | Chip Active — CRS-design-system.md §20.7 | reuse/clone by ID — never recreate |
| `.tile` | KPI tiles (CRS-design-system.md §20.4) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |

## Interactions demonstrated

- .theme-toggle states: hover
- .tile states: hover
- disabled attribute states demonstrated
- script-driven behavior present (<script>/onclick) — inventory manually before workflow chunks
- transition on /* Smooth theme cross-fade — apply broadly */ * → background-color var(--transition-colors), color var(--transition-colors), border-color var(--transition-colors), fill var(--transition-colors)

## FLAGGED — blocking until each is resolved (map / approve-as-literal / fix prototype)

| id | kind | value | location | nearest token | status | resolution |
|---|---|---|---|---|---|---|
| f1 | literal | `rgba(0,0,0,0.08)` | [data-theme="light"] · --shadow-dropdown · L23 | --black | unresolved |  |
| f2 | literal | `rgba(0,0,0,0.10)` | [data-theme="light"] · --shadow-modal · L23 | --black | unresolved |  |

## Value-matched literals (auto-mapped, non-blocking — fix in prototype when convenient)

| value | location | matches token (theme) | suggested fix |
|---|---|---|---|
| `#FAFAFA` | [data-theme="light"] · --bg-primary · L23 | `--bg-primary` (light) | replace with var(--bg-primary) — NOTE: matched the LIGHT value; verify intent |
| `#FFFFFF` | [data-theme="light"] · --bg-secondary · L23 | `--white` (dark) | replace with var(--white) |
| `#F4F4F5` | [data-theme="light"] · --bg-tertiary · L23 | `--bg-tertiary` (light) | replace with var(--bg-tertiary) — NOTE: matched the LIGHT value; verify intent |
| `#FFFFFF` | [data-theme="light"] · --bg-elevated · L23 | `--white` (dark) | replace with var(--white) |
| `#EAEAEB` | [data-theme="light"] · --border-default · L23 | `--border-default` (light) | replace with var(--border-default) — NOTE: matched the LIGHT value; verify intent |
| `#DCDCDE` | [data-theme="light"] · --border-hover · L23 | `--border-hover` (light) | replace with var(--border-hover) — NOTE: matched the LIGHT value; verify intent |
| `#C8C8CB` | [data-theme="light"] · --border-active · L23 | `--border-active` (light) | replace with var(--border-active) — NOTE: matched the LIGHT value; verify intent |
| `#E4E4E6` | [data-theme="light"] · --input-border · L23 | `--input-border` (light) | replace with var(--input-border) — NOTE: matched the LIGHT value; verify intent |
| `#3B82F6` | [data-theme="light"] · --accent · L23 | `--accent` (dark) | replace with var(--accent) |
| `#2563EB` | [data-theme="light"] · --accent-hover · L23 | `--accent-hover` (dark) | replace with var(--accent-hover) |
| `#1D4ED8` | [data-theme="light"] · --accent-active · L23 | `--accent-active` (dark) | replace with var(--accent-active) |
| `#1D4ED8` | [data-theme="light"] · --accent-text · L23 | `--accent-active` (dark) | replace with var(--accent-active) |
| `#2563EB` | [data-theme="light"] · --accent-soft · L23 | `--accent-hover` (dark) | replace with var(--accent-hover) |
| `rgba(59,130,246,0.13)` | [data-theme="light"] · --accent-glow · L23 | `--accent-glow` (dark) | replace with var(--accent-glow) |
| `rgba(59,130,246,0.08)` | [data-theme="light"] · --accent-tint · L23 | `--accent-tint` (dark) | replace with var(--accent-tint) |
| `rgba(59,130,246,0.55)` | [data-theme="light"] · --accent-border-active · L23 | `--accent-border-active` (dark) | replace with var(--accent-border-active) |
| `#18181B` | [data-theme="light"] · --text-primary · L23 | `--text-primary` (light) | replace with var(--text-primary) — NOTE: matched the LIGHT value; verify intent |
| `#5F5F66` | [data-theme="light"] · --text-secondary · L23 | `--text-secondary` (light) | replace with var(--text-secondary) — NOTE: matched the LIGHT value; verify intent |
| `#8E8E95` | [data-theme="light"] · --text-muted · L23 | `--text-muted` (light) | replace with var(--text-muted) — NOTE: matched the LIGHT value; verify intent |
| `#B6B6BB` | [data-theme="light"] · --text-disabled · L23 | `--text-disabled` (light) | replace with var(--text-disabled) — NOTE: matched the LIGHT value; verify intent |
| `#16A34A` | [data-theme="light"] · --success · L23 | `--success` (light) | replace with var(--success) — NOTE: matched the LIGHT value; verify intent |
| `#22C55E` | [data-theme="light"] · --success-soft · L23 | `--success` (dark) | replace with var(--success) |
| `#DC2626` | [data-theme="light"] · --error · L23 | `--error` (light) | replace with var(--error) — NOTE: matched the LIGHT value; verify intent |
| `#DC2626` | [data-theme="light"] · --error-soft · L23 | `--error` (light) | replace with var(--error) — NOTE: matched the LIGHT value; verify intent |
| `#D97706` | [data-theme="light"] · --warning · L23 | `--warning` (light) | replace with var(--warning) — NOTE: matched the LIGHT value; verify intent |
| `#7C3AED` | [data-theme="light"] · --purple · L23 | `--purple` (light) | replace with var(--purple) — NOTE: matched the LIGHT value; verify intent |
| `#9333EA` | [data-theme="light"] · --purple-accent · L23 | `--purple-accent` (light) | replace with var(--purple-accent) — NOTE: matched the LIGHT value; verify intent |
| `#0891B2` | [data-theme="light"] · --cyan · L23 | `--cyan` (light) | replace with var(--cyan) — NOTE: matched the LIGHT value; verify intent |
| `#E6E6E8` | [data-theme="light"] · --na · L23 | `--na` (light) | replace with var(--na) — NOTE: matched the LIGHT value; verify intent |
| `rgba(22,163,74,0.10)` | [data-theme="light"] · --success-tint · L23 | `--success-tint` (light) | replace with var(--success-tint) — NOTE: matched the LIGHT value; verify intent |
| `rgba(217,119,6,0.10)` | [data-theme="light"] · --warning-tint · L23 | `--warning-tint` (light) | replace with var(--warning-tint) — NOTE: matched the LIGHT value; verify intent |
| `rgba(220,38,38,0.10)` | [data-theme="light"] · --error-tint · L23 | `--error-tint` (light) | replace with var(--error-tint) — NOTE: matched the LIGHT value; verify intent |

```json crs-mapping
{
  "name": "studio-sample",
  "module": "user_management",
  "settledHash": "3bcca213cef6467fd5734abea83e893910e36360e82b7bcfa1f1e75d5d28eff4",
  "inventorySha": "0f8421ebb93f1ad3ad80c08a15614d4e87724fa95e88a9a49c45fcd766bc8a98",
  "tokenRows": [
    {
      "var": "--bg-primary",
      "canonical": "--bg-primary",
      "dark": "#181818",
      "light": "#FAFAFA",
      "selectors": [
        "html"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--bg-secondary",
      "canonical": "--bg-secondary",
      "dark": "#1E1E1E",
      "light": "#FFFFFF",
      "selectors": [
        ".proto-head",
        ".tile"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--bg-tertiary",
      "canonical": "--bg-tertiary",
      "dark": "#242424",
      "light": "#F4F4F5",
      "selectors": [
        ".theme-toggle"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--border-default",
      "canonical": "--border-default",
      "dark": "#242424",
      "light": "#EAEAEB",
      "selectors": [
        ".proto-head",
        ".theme-toggle",
        ".tile"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--border-hover",
      "canonical": "--border-hover",
      "dark": "#333333",
      "light": "#DCDCDE",
      "selectors": [
        ".theme-toggle:hover",
        ".tile:hover"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--radius-btn",
      "canonical": "--radius-btn",
      "dark": "7px",
      "light": "7px",
      "selectors": [
        ".theme-toggle"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--radius-card",
      "canonical": "--radius-card",
      "dark": "10px",
      "light": "10px",
      "selectors": [
        ".tile"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--success",
      "canonical": "--success",
      "dark": "#22C55E",
      "light": "#16A34A",
      "selectors": [
        ".tile .d"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--text-muted",
      "canonical": "--text-muted",
      "dark": "#6B6B6B",
      "light": "#8E8E95",
      "selectors": [
        ".tile .k"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--text-primary",
      "canonical": "--text-primary",
      "dark": "#E0E0E0",
      "light": "#18181B",
      "selectors": [
        ".proto-head h1",
        ".theme-toggle:hover",
        ".tile .v"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--text-secondary",
      "canonical": "--text-secondary",
      "dark": "#A6A6A6",
      "light": "#5F5F66",
      "selectors": [
        "html",
        ".theme-toggle"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--transition-colors",
      "canonical": "--transition-colors",
      "dark": "200ms ease-in",
      "light": "200ms ease-in",
      "selectors": [
        "/* Smooth theme cross-fade — apply broadly */ *"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    }
  ],
  "localTokens": [
    {
      "declared": "--bg-primary",
      "value": "#181818",
      "canonical": "--bg-primary",
      "canonDark": "#181818",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--bg-secondary",
      "value": "#1E1E1E",
      "canonical": "--bg-secondary",
      "canonDark": "#1E1E1E",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--bg-tertiary",
      "value": "#242424",
      "canonical": "--bg-tertiary",
      "canonDark": "#242424",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--bg-elevated",
      "value": "#2A2A2A",
      "canonical": "--bg-elevated",
      "canonDark": "#2A2A2A",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--border-default",
      "value": "#242424",
      "canonical": "--border-default",
      "canonDark": "#242424",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--border-hover",
      "value": "#333333",
      "canonical": "--border-hover",
      "canonDark": "#333333",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--border-active",
      "value": "#3D3D3D",
      "canonical": "--border-active",
      "canonDark": "#3D3D3D",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--input-border",
      "value": "#2A2A2A",
      "canonical": "--input-border",
      "canonDark": "#2A2A2A",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent",
      "value": "#3B82F6",
      "canonical": "--accent",
      "canonDark": "#3B82F6",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-hover",
      "value": "#2563EB",
      "canonical": "--accent-hover",
      "canonDark": "#2563EB",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-active",
      "value": "#1D4ED8",
      "canonical": "--accent-active",
      "canonDark": "#1D4ED8",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-text",
      "value": "#3B82F6",
      "canonical": "--accent-text",
      "canonDark": "#3B82F6",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-soft",
      "value": "#60A5FA",
      "canonical": "--accent-soft",
      "canonDark": "#60A5FA",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-glow",
      "value": "rgba(59,130,246,0.13)",
      "canonical": "--accent-glow",
      "canonDark": "rgba(59,130,246,0.13)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-tint",
      "value": "rgba(59,130,246,0.08)",
      "canonical": "--accent-tint",
      "canonDark": "rgba(59,130,246,0.08)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-border-active",
      "value": "rgba(59,130,246,0.55)",
      "canonical": "--accent-border-active",
      "canonDark": "rgba(59,130,246,0.55)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--text-primary",
      "value": "#E0E0E0",
      "canonical": "--text-primary",
      "canonDark": "#E0E0E0",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--text-secondary",
      "value": "#A6A6A6",
      "canonical": "--text-secondary",
      "canonDark": "#A6A6A6",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--text-muted",
      "value": "#6B6B6B",
      "canonical": "--text-muted",
      "canonDark": "#6B6B6B",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--text-disabled",
      "value": "#565656",
      "canonical": "--text-disabled",
      "canonDark": "#565656",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--success",
      "value": "#22C55E",
      "canonical": "--success",
      "canonDark": "#22C55E",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--success-soft",
      "value": "#4ADE80",
      "canonical": "--success-soft",
      "canonDark": "#4ADE80",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--error",
      "value": "#EF4444",
      "canonical": "--error",
      "canonDark": "#EF4444",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--error-soft",
      "value": "#F87171",
      "canonical": "--error-soft",
      "canonDark": "#F87171",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--warning",
      "value": "#F59E0B",
      "canonical": "--warning",
      "canonDark": "#F59E0B",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--purple",
      "value": "#8B5CF6",
      "canonical": "--purple",
      "canonDark": "#8B5CF6",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--purple-accent",
      "value": "#A855F7",
      "canonical": "--purple-accent",
      "canonDark": "#A855F7",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--cyan",
      "value": "#06B6D4",
      "canonical": "--cyan",
      "canonDark": "#06B6D4",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--na",
      "value": "#2B2B2B",
      "canonical": "--na",
      "canonDark": "#2B2B2B",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--success-tint",
      "value": "rgba(34,197,94,0.13)",
      "canonical": "--success-tint",
      "canonDark": "rgba(34,197,94,0.13)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--warning-tint",
      "value": "rgba(245,158,11,0.13)",
      "canonical": "--warning-tint",
      "canonDark": "rgba(245,158,11,0.13)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--error-tint",
      "value": "rgba(239,68,68,0.13)",
      "canonical": "--error-tint",
      "canonDark": "rgba(239,68,68,0.13)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--white",
      "value": "#FFFFFF",
      "canonical": "--white",
      "canonDark": "#FFFFFF",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--black",
      "value": "#000000",
      "canonical": "--black",
      "canonDark": "#000000",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--transparent",
      "value": "rgba(255,255,255,0)",
      "canonical": "--transparent",
      "canonDark": "rgba(255,255,255,0)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--shadow-modal",
      "value": "0 24px 60px rgba(0,0,0,0.6)",
      "canonical": "--shadow-modal",
      "canonDark": "0 24px 60px rgba(0,0,0,0.6)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--shadow-dropdown",
      "value": "0 12px 40px rgba(0,0,0,0.55)",
      "canonical": "--shadow-dropdown",
      "canonDark": "0 12px 40px rgba(0,0,0,0.55)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--transition",
      "value": "160ms cubic-bezier(.4,0,.2,1)",
      "canonical": "--transition",
      "canonDark": "160ms cubic-bezier(.4,0,.2,1)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--transition-colors",
      "value": "200ms ease-in",
      "canonical": "--transition-colors",
      "canonDark": "200ms ease-in",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-card",
      "value": "10px",
      "canonical": "--radius-card",
      "canonDark": "10px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-btn",
      "value": "7px",
      "canonical": "--radius-btn",
      "canonDark": "7px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-input",
      "value": "7px",
      "canonical": "--radius-input",
      "canonDark": "7px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-modal",
      "value": "12px",
      "canonical": "--radius-modal",
      "canonDark": "12px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-badge",
      "value": "5px",
      "canonical": "--radius-badge",
      "canonDark": "5px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-pill",
      "value": "20px",
      "canonical": "--radius-pill",
      "canonDark": "20px",
      "verdict": "MATCH",
      "line": 7
    }
  ],
  "flags": [
    {
      "kind": "literal",
      "value": "rgba(0,0,0,0.08)",
      "selector": "[data-theme=\"light\"]",
      "prop": "--shadow-dropdown",
      "line": 23,
      "nearest": "--black",
      "id": "f1",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "literal",
      "value": "rgba(0,0,0,0.10)",
      "selector": "[data-theme=\"light\"]",
      "prop": "--shadow-modal",
      "line": 23,
      "nearest": "--black",
      "id": "f2",
      "status": "unresolved",
      "resolution": ""
    }
  ],
  "matched": [
    {
      "value": "#FAFAFA",
      "selector": "[data-theme=\"light\"]",
      "prop": "--bg-primary",
      "line": 23,
      "token": "--bg-primary",
      "theme": "light",
      "fix": "replace with var(--bg-primary) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#FFFFFF",
      "selector": "[data-theme=\"light\"]",
      "prop": "--bg-secondary",
      "line": 23,
      "token": "--white",
      "theme": "dark",
      "fix": "replace with var(--white)"
    },
    {
      "value": "#F4F4F5",
      "selector": "[data-theme=\"light\"]",
      "prop": "--bg-tertiary",
      "line": 23,
      "token": "--bg-tertiary",
      "theme": "light",
      "fix": "replace with var(--bg-tertiary) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#FFFFFF",
      "selector": "[data-theme=\"light\"]",
      "prop": "--bg-elevated",
      "line": 23,
      "token": "--white",
      "theme": "dark",
      "fix": "replace with var(--white)"
    },
    {
      "value": "#EAEAEB",
      "selector": "[data-theme=\"light\"]",
      "prop": "--border-default",
      "line": 23,
      "token": "--border-default",
      "theme": "light",
      "fix": "replace with var(--border-default) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#DCDCDE",
      "selector": "[data-theme=\"light\"]",
      "prop": "--border-hover",
      "line": 23,
      "token": "--border-hover",
      "theme": "light",
      "fix": "replace with var(--border-hover) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#C8C8CB",
      "selector": "[data-theme=\"light\"]",
      "prop": "--border-active",
      "line": 23,
      "token": "--border-active",
      "theme": "light",
      "fix": "replace with var(--border-active) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#E4E4E6",
      "selector": "[data-theme=\"light\"]",
      "prop": "--input-border",
      "line": 23,
      "token": "--input-border",
      "theme": "light",
      "fix": "replace with var(--input-border) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#3B82F6",
      "selector": "[data-theme=\"light\"]",
      "prop": "--accent",
      "line": 23,
      "token": "--accent",
      "theme": "dark",
      "fix": "replace with var(--accent)"
    },
    {
      "value": "#2563EB",
      "selector": "[data-theme=\"light\"]",
      "prop": "--accent-hover",
      "line": 23,
      "token": "--accent-hover",
      "theme": "dark",
      "fix": "replace with var(--accent-hover)"
    },
    {
      "value": "#1D4ED8",
      "selector": "[data-theme=\"light\"]",
      "prop": "--accent-active",
      "line": 23,
      "token": "--accent-active",
      "theme": "dark",
      "fix": "replace with var(--accent-active)"
    },
    {
      "value": "#1D4ED8",
      "selector": "[data-theme=\"light\"]",
      "prop": "--accent-text",
      "line": 23,
      "token": "--accent-active",
      "theme": "dark",
      "fix": "replace with var(--accent-active)"
    },
    {
      "value": "#2563EB",
      "selector": "[data-theme=\"light\"]",
      "prop": "--accent-soft",
      "line": 23,
      "token": "--accent-hover",
      "theme": "dark",
      "fix": "replace with var(--accent-hover)"
    },
    {
      "value": "rgba(59,130,246,0.13)",
      "selector": "[data-theme=\"light\"]",
      "prop": "--accent-glow",
      "line": 23,
      "token": "--accent-glow",
      "theme": "dark",
      "fix": "replace with var(--accent-glow)"
    },
    {
      "value": "rgba(59,130,246,0.08)",
      "selector": "[data-theme=\"light\"]",
      "prop": "--accent-tint",
      "line": 23,
      "token": "--accent-tint",
      "theme": "dark",
      "fix": "replace with var(--accent-tint)"
    },
    {
      "value": "rgba(59,130,246,0.55)",
      "selector": "[data-theme=\"light\"]",
      "prop": "--accent-border-active",
      "line": 23,
      "token": "--accent-border-active",
      "theme": "dark",
      "fix": "replace with var(--accent-border-active)"
    },
    {
      "value": "#18181B",
      "selector": "[data-theme=\"light\"]",
      "prop": "--text-primary",
      "line": 23,
      "token": "--text-primary",
      "theme": "light",
      "fix": "replace with var(--text-primary) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#5F5F66",
      "selector": "[data-theme=\"light\"]",
      "prop": "--text-secondary",
      "line": 23,
      "token": "--text-secondary",
      "theme": "light",
      "fix": "replace with var(--text-secondary) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#8E8E95",
      "selector": "[data-theme=\"light\"]",
      "prop": "--text-muted",
      "line": 23,
      "token": "--text-muted",
      "theme": "light",
      "fix": "replace with var(--text-muted) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#B6B6BB",
      "selector": "[data-theme=\"light\"]",
      "prop": "--text-disabled",
      "line": 23,
      "token": "--text-disabled",
      "theme": "light",
      "fix": "replace with var(--text-disabled) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#16A34A",
      "selector": "[data-theme=\"light\"]",
      "prop": "--success",
      "line": 23,
      "token": "--success",
      "theme": "light",
      "fix": "replace with var(--success) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#22C55E",
      "selector": "[data-theme=\"light\"]",
      "prop": "--success-soft",
      "line": 23,
      "token": "--success",
      "theme": "dark",
      "fix": "replace with var(--success)"
    },
    {
      "value": "#DC2626",
      "selector": "[data-theme=\"light\"]",
      "prop": "--error",
      "line": 23,
      "token": "--error",
      "theme": "light",
      "fix": "replace with var(--error) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#DC2626",
      "selector": "[data-theme=\"light\"]",
      "prop": "--error-soft",
      "line": 23,
      "token": "--error",
      "theme": "light",
      "fix": "replace with var(--error) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#D97706",
      "selector": "[data-theme=\"light\"]",
      "prop": "--warning",
      "line": 23,
      "token": "--warning",
      "theme": "light",
      "fix": "replace with var(--warning) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#7C3AED",
      "selector": "[data-theme=\"light\"]",
      "prop": "--purple",
      "line": 23,
      "token": "--purple",
      "theme": "light",
      "fix": "replace with var(--purple) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#9333EA",
      "selector": "[data-theme=\"light\"]",
      "prop": "--purple-accent",
      "line": 23,
      "token": "--purple-accent",
      "theme": "light",
      "fix": "replace with var(--purple-accent) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#0891B2",
      "selector": "[data-theme=\"light\"]",
      "prop": "--cyan",
      "line": 23,
      "token": "--cyan",
      "theme": "light",
      "fix": "replace with var(--cyan) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "#E6E6E8",
      "selector": "[data-theme=\"light\"]",
      "prop": "--na",
      "line": 23,
      "token": "--na",
      "theme": "light",
      "fix": "replace with var(--na) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "rgba(22,163,74,0.10)",
      "selector": "[data-theme=\"light\"]",
      "prop": "--success-tint",
      "line": 23,
      "token": "--success-tint",
      "theme": "light",
      "fix": "replace with var(--success-tint) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "rgba(217,119,6,0.10)",
      "selector": "[data-theme=\"light\"]",
      "prop": "--warning-tint",
      "line": 23,
      "token": "--warning-tint",
      "theme": "light",
      "fix": "replace with var(--warning-tint) — NOTE: matched the LIGHT value; verify intent"
    },
    {
      "value": "rgba(220,38,38,0.10)",
      "selector": "[data-theme=\"light\"]",
      "prop": "--error-tint",
      "line": 23,
      "token": "--error-tint",
      "theme": "light",
      "fix": "replace with var(--error-tint) — NOTE: matched the LIGHT value; verify intent"
    }
  ],
  "compRows": [
    {
      "selector": ".theme-toggle",
      "family": "20.2",
      "familyName": "Selection controls (checkbox · radio · switch)",
      "ref": "CRS-design-system.md §20.2",
      "existing": "Theme toggle — brain/STATUS.md §6",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".stage",
      "family": "20.7",
      "familyName": "Chips & badges",
      "ref": "CRS-design-system.md §20.7",
      "existing": "Chip Active — CRS-design-system.md §20.7",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": ".tile",
      "family": "20.4",
      "familyName": "KPI tiles",
      "ref": "CRS-design-system.md §20.4",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    }
  ],
  "interactions": [
    ".theme-toggle states: hover",
    ".tile states: hover",
    "disabled attribute states demonstrated",
    "script-driven behavior present (<script>/onclick) — inventory manually before workflow chunks",
    "transition on /* Smooth theme cross-fade — apply broadly */ * → background-color var(--transition-colors), color var(--transition-colors), border-color var(--transition-colors), fill var(--transition-colors)"
  ]
}
```
