# Mapping — qa-guide-walk

Prototype: prototypes/qa-guide-walk/qa-guide-walk.html
Settled-SHA256: 19bc45ab9bde491b924163389899772f0ea9cf92263a81d91d062be119bb0ad5
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
| `--bg-primary` | #FAFAFA | `--bg-primary` | #FAFAFA | MATCH |
| `--bg-secondary` | #FFFFFF | `--bg-secondary` | #FFFFFF | MATCH |
| `--bg-tertiary` | #F4F4F5 | `--bg-tertiary` | #F4F4F5 | MATCH |
| `--bg-elevated` | #FFFFFF | `--bg-elevated` | #FFFFFF | MATCH |
| `--border-default` | #EAEAEB | `--border-default` | #EAEAEB | MATCH |
| `--border-hover` | #DCDCDE | `--border-hover` | #DCDCDE | MATCH |
| `--border-active` | #C8C8CB | `--border-active` | #C8C8CB | MATCH |
| `--input-border` | #E4E4E6 | `--input-border` | #E4E4E6 | MATCH |
| `--accent` | #3B82F6 | `--accent` | #3B82F6 | MATCH |
| `--accent-hover` | #2563EB | `--accent-hover` | #2563EB | MATCH |
| `--accent-active` | #1D4ED8 | `--accent-active` | #1D4ED8 | MATCH |
| `--accent-text` | #1D4ED8 | `--accent-text` | #1D4ED8 | MATCH |
| `--accent-soft` | #2563EB | `--accent-soft` | #2563EB | MATCH |
| `--accent-glow` | rgba(59,130,246,0.13) | `--accent-glow` | rgba(59,130,246,0.13) | MATCH |
| `--accent-tint` | rgba(59,130,246,0.08) | `--accent-tint` | rgba(59,130,246,0.08) | MATCH |
| `--accent-border-active` | rgba(59,130,246,0.55) | `--accent-border-active` | rgba(59,130,246,0.55) | MATCH |
| `--text-primary` | #18181B | `--text-primary` | #18181B | MATCH |
| `--text-secondary` | #5F5F66 | `--text-secondary` | #5F5F66 | MATCH |
| `--text-muted` | #8E8E95 | `--text-muted` | #8E8E95 | MATCH |
| `--text-disabled` | #B6B6BB | `--text-disabled` | #B6B6BB | MATCH |
| `--success` | #16A34A | `--success` | #16A34A | MATCH |
| `--success-soft` | #22C55E | `--success-soft` | #22C55E | MATCH |
| `--error` | #DC2626 | `--error` | #DC2626 | MATCH |
| `--error-soft` | #DC2626 | `--error-soft` | #DC2626 | MATCH |
| `--warning` | #D97706 | `--warning` | #D97706 | MATCH |
| `--purple` | #7C3AED | `--purple` | #7C3AED | MATCH |
| `--purple-accent` | #9333EA | `--purple-accent` | #9333EA | MATCH |
| `--cyan` | #0891B2 | `--cyan` | #0891B2 | MATCH |
| `--na` | #E6E6E8 | `--na` | #E6E6E8 | MATCH |
| `--success-tint` | rgba(22,163,74,0.10) | `--success-tint` | rgba(22,163,74,0.10) | MATCH |
| `--warning-tint` | rgba(217,119,6,0.10) | `--warning-tint` | rgba(217,119,6,0.10) | MATCH |
| `--error-tint` | rgba(220,38,38,0.10) | `--error-tint` | rgba(220,38,38,0.10) | MATCH |
| `--shadow-modal` | 0 16px 40px rgba(0,0,0,0.10) | `--shadow-modal` | 0 16px 40px rgba(0,0,0,0.10) | MATCH |
| `--shadow-dropdown` | 0 12px 40px rgba(0,0,0,0.08) | `--shadow-dropdown` | 0 12px 40px rgba(0,0,0,0.08) | MATCH |
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
| f1 | literal | `#B91C1C` | <div style=""> · color · L88 | --error | approved-literal | approved as literal by vlad |

## Value-matched literals (auto-mapped, non-blocking — fix in prototype when convenient)

(none)

```json crs-mapping
{
  "name": "qa-guide-walk",
  "module": "user_management",
  "settledHash": "19bc45ab9bde491b924163389899772f0ea9cf92263a81d91d062be119bb0ad5",
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
      "theme": "dark",
      "canonDark": "#181818",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--bg-secondary",
      "value": "#1E1E1E",
      "canonical": "--bg-secondary",
      "theme": "dark",
      "canonDark": "#1E1E1E",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--bg-tertiary",
      "value": "#242424",
      "canonical": "--bg-tertiary",
      "theme": "dark",
      "canonDark": "#242424",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--bg-elevated",
      "value": "#2A2A2A",
      "canonical": "--bg-elevated",
      "theme": "dark",
      "canonDark": "#2A2A2A",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--border-default",
      "value": "#242424",
      "canonical": "--border-default",
      "theme": "dark",
      "canonDark": "#242424",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--border-hover",
      "value": "#333333",
      "canonical": "--border-hover",
      "theme": "dark",
      "canonDark": "#333333",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--border-active",
      "value": "#3D3D3D",
      "canonical": "--border-active",
      "theme": "dark",
      "canonDark": "#3D3D3D",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--input-border",
      "value": "#2A2A2A",
      "canonical": "--input-border",
      "theme": "dark",
      "canonDark": "#2A2A2A",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent",
      "value": "#3B82F6",
      "canonical": "--accent",
      "theme": "dark",
      "canonDark": "#3B82F6",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-hover",
      "value": "#2563EB",
      "canonical": "--accent-hover",
      "theme": "dark",
      "canonDark": "#2563EB",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-active",
      "value": "#1D4ED8",
      "canonical": "--accent-active",
      "theme": "dark",
      "canonDark": "#1D4ED8",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-text",
      "value": "#3B82F6",
      "canonical": "--accent-text",
      "theme": "dark",
      "canonDark": "#3B82F6",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-soft",
      "value": "#60A5FA",
      "canonical": "--accent-soft",
      "theme": "dark",
      "canonDark": "#60A5FA",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-glow",
      "value": "rgba(59,130,246,0.13)",
      "canonical": "--accent-glow",
      "theme": "dark",
      "canonDark": "rgba(59,130,246,0.13)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-tint",
      "value": "rgba(59,130,246,0.08)",
      "canonical": "--accent-tint",
      "theme": "dark",
      "canonDark": "rgba(59,130,246,0.08)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--accent-border-active",
      "value": "rgba(59,130,246,0.55)",
      "canonical": "--accent-border-active",
      "theme": "dark",
      "canonDark": "rgba(59,130,246,0.55)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--text-primary",
      "value": "#E0E0E0",
      "canonical": "--text-primary",
      "theme": "dark",
      "canonDark": "#E0E0E0",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--text-secondary",
      "value": "#A6A6A6",
      "canonical": "--text-secondary",
      "theme": "dark",
      "canonDark": "#A6A6A6",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--text-muted",
      "value": "#6B6B6B",
      "canonical": "--text-muted",
      "theme": "dark",
      "canonDark": "#6B6B6B",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--text-disabled",
      "value": "#565656",
      "canonical": "--text-disabled",
      "theme": "dark",
      "canonDark": "#565656",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--success",
      "value": "#22C55E",
      "canonical": "--success",
      "theme": "dark",
      "canonDark": "#22C55E",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--success-soft",
      "value": "#4ADE80",
      "canonical": "--success-soft",
      "theme": "dark",
      "canonDark": "#4ADE80",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--error",
      "value": "#EF4444",
      "canonical": "--error",
      "theme": "dark",
      "canonDark": "#EF4444",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--error-soft",
      "value": "#F87171",
      "canonical": "--error-soft",
      "theme": "dark",
      "canonDark": "#F87171",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--warning",
      "value": "#F59E0B",
      "canonical": "--warning",
      "theme": "dark",
      "canonDark": "#F59E0B",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--purple",
      "value": "#8B5CF6",
      "canonical": "--purple",
      "theme": "dark",
      "canonDark": "#8B5CF6",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--purple-accent",
      "value": "#A855F7",
      "canonical": "--purple-accent",
      "theme": "dark",
      "canonDark": "#A855F7",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--cyan",
      "value": "#06B6D4",
      "canonical": "--cyan",
      "theme": "dark",
      "canonDark": "#06B6D4",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--na",
      "value": "#2B2B2B",
      "canonical": "--na",
      "theme": "dark",
      "canonDark": "#2B2B2B",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--success-tint",
      "value": "rgba(34,197,94,0.13)",
      "canonical": "--success-tint",
      "theme": "dark",
      "canonDark": "rgba(34,197,94,0.13)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--warning-tint",
      "value": "rgba(245,158,11,0.13)",
      "canonical": "--warning-tint",
      "theme": "dark",
      "canonDark": "rgba(245,158,11,0.13)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--error-tint",
      "value": "rgba(239,68,68,0.13)",
      "canonical": "--error-tint",
      "theme": "dark",
      "canonDark": "rgba(239,68,68,0.13)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--white",
      "value": "#FFFFFF",
      "canonical": "--white",
      "theme": "dark",
      "canonDark": "#FFFFFF",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--black",
      "value": "#000000",
      "canonical": "--black",
      "theme": "dark",
      "canonDark": "#000000",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--transparent",
      "value": "rgba(255,255,255,0)",
      "canonical": "--transparent",
      "theme": "dark",
      "canonDark": "rgba(255,255,255,0)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--shadow-modal",
      "value": "0 24px 60px rgba(0,0,0,0.6)",
      "canonical": "--shadow-modal",
      "theme": "dark",
      "canonDark": "0 24px 60px rgba(0,0,0,0.6)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--shadow-dropdown",
      "value": "0 12px 40px rgba(0,0,0,0.55)",
      "canonical": "--shadow-dropdown",
      "theme": "dark",
      "canonDark": "0 12px 40px rgba(0,0,0,0.55)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--transition",
      "value": "160ms cubic-bezier(.4,0,.2,1)",
      "canonical": "--transition",
      "theme": "dark",
      "canonDark": "160ms cubic-bezier(.4,0,.2,1)",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--transition-colors",
      "value": "200ms ease-in",
      "canonical": "--transition-colors",
      "theme": "dark",
      "canonDark": "200ms ease-in",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-card",
      "value": "10px",
      "canonical": "--radius-card",
      "theme": "dark",
      "canonDark": "10px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-btn",
      "value": "7px",
      "canonical": "--radius-btn",
      "theme": "dark",
      "canonDark": "7px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-input",
      "value": "7px",
      "canonical": "--radius-input",
      "theme": "dark",
      "canonDark": "7px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-modal",
      "value": "12px",
      "canonical": "--radius-modal",
      "theme": "dark",
      "canonDark": "12px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-badge",
      "value": "5px",
      "canonical": "--radius-badge",
      "theme": "dark",
      "canonDark": "5px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--radius-pill",
      "value": "20px",
      "canonical": "--radius-pill",
      "theme": "dark",
      "canonDark": "20px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--bg-primary",
      "value": "#FAFAFA",
      "canonical": "--bg-primary",
      "theme": "light",
      "canonDark": "#FAFAFA",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--bg-secondary",
      "value": "#FFFFFF",
      "canonical": "--bg-secondary",
      "theme": "light",
      "canonDark": "#FFFFFF",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--bg-tertiary",
      "value": "#F4F4F5",
      "canonical": "--bg-tertiary",
      "theme": "light",
      "canonDark": "#F4F4F5",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--bg-elevated",
      "value": "#FFFFFF",
      "canonical": "--bg-elevated",
      "theme": "light",
      "canonDark": "#FFFFFF",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--border-default",
      "value": "#EAEAEB",
      "canonical": "--border-default",
      "theme": "light",
      "canonDark": "#EAEAEB",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--border-hover",
      "value": "#DCDCDE",
      "canonical": "--border-hover",
      "theme": "light",
      "canonDark": "#DCDCDE",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--border-active",
      "value": "#C8C8CB",
      "canonical": "--border-active",
      "theme": "light",
      "canonDark": "#C8C8CB",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--input-border",
      "value": "#E4E4E6",
      "canonical": "--input-border",
      "theme": "light",
      "canonDark": "#E4E4E6",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--accent",
      "value": "#3B82F6",
      "canonical": "--accent",
      "theme": "light",
      "canonDark": "#3B82F6",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--accent-hover",
      "value": "#2563EB",
      "canonical": "--accent-hover",
      "theme": "light",
      "canonDark": "#2563EB",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--accent-active",
      "value": "#1D4ED8",
      "canonical": "--accent-active",
      "theme": "light",
      "canonDark": "#1D4ED8",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--accent-text",
      "value": "#1D4ED8",
      "canonical": "--accent-text",
      "theme": "light",
      "canonDark": "#1D4ED8",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--accent-soft",
      "value": "#2563EB",
      "canonical": "--accent-soft",
      "theme": "light",
      "canonDark": "#2563EB",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--accent-glow",
      "value": "rgba(59,130,246,0.13)",
      "canonical": "--accent-glow",
      "theme": "light",
      "canonDark": "rgba(59,130,246,0.13)",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--accent-tint",
      "value": "rgba(59,130,246,0.08)",
      "canonical": "--accent-tint",
      "theme": "light",
      "canonDark": "rgba(59,130,246,0.08)",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--accent-border-active",
      "value": "rgba(59,130,246,0.55)",
      "canonical": "--accent-border-active",
      "theme": "light",
      "canonDark": "rgba(59,130,246,0.55)",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--text-primary",
      "value": "#18181B",
      "canonical": "--text-primary",
      "theme": "light",
      "canonDark": "#18181B",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--text-secondary",
      "value": "#5F5F66",
      "canonical": "--text-secondary",
      "theme": "light",
      "canonDark": "#5F5F66",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--text-muted",
      "value": "#8E8E95",
      "canonical": "--text-muted",
      "theme": "light",
      "canonDark": "#8E8E95",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--text-disabled",
      "value": "#B6B6BB",
      "canonical": "--text-disabled",
      "theme": "light",
      "canonDark": "#B6B6BB",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--success",
      "value": "#16A34A",
      "canonical": "--success",
      "theme": "light",
      "canonDark": "#16A34A",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--success-soft",
      "value": "#22C55E",
      "canonical": "--success-soft",
      "theme": "light",
      "canonDark": "#22C55E",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--error",
      "value": "#DC2626",
      "canonical": "--error",
      "theme": "light",
      "canonDark": "#DC2626",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--error-soft",
      "value": "#DC2626",
      "canonical": "--error-soft",
      "theme": "light",
      "canonDark": "#DC2626",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--warning",
      "value": "#D97706",
      "canonical": "--warning",
      "theme": "light",
      "canonDark": "#D97706",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--purple",
      "value": "#7C3AED",
      "canonical": "--purple",
      "theme": "light",
      "canonDark": "#7C3AED",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--purple-accent",
      "value": "#9333EA",
      "canonical": "--purple-accent",
      "theme": "light",
      "canonDark": "#9333EA",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--cyan",
      "value": "#0891B2",
      "canonical": "--cyan",
      "theme": "light",
      "canonDark": "#0891B2",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--na",
      "value": "#E6E6E8",
      "canonical": "--na",
      "theme": "light",
      "canonDark": "#E6E6E8",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--success-tint",
      "value": "rgba(22,163,74,0.10)",
      "canonical": "--success-tint",
      "theme": "light",
      "canonDark": "rgba(22,163,74,0.10)",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--warning-tint",
      "value": "rgba(217,119,6,0.10)",
      "canonical": "--warning-tint",
      "theme": "light",
      "canonDark": "rgba(217,119,6,0.10)",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--error-tint",
      "value": "rgba(220,38,38,0.10)",
      "canonical": "--error-tint",
      "theme": "light",
      "canonDark": "rgba(220,38,38,0.10)",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--shadow-modal",
      "value": "0 16px 40px rgba(0,0,0,0.10)",
      "canonical": "--shadow-modal",
      "theme": "light",
      "canonDark": "0 16px 40px rgba(0,0,0,0.10)",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--shadow-dropdown",
      "value": "0 12px 40px rgba(0,0,0,0.08)",
      "canonical": "--shadow-dropdown",
      "theme": "light",
      "canonDark": "0 12px 40px rgba(0,0,0,0.08)",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--transition",
      "value": "160ms cubic-bezier(.4,0,.2,1)",
      "canonical": "--transition",
      "theme": "light",
      "canonDark": "160ms cubic-bezier(.4,0,.2,1)",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--transition-colors",
      "value": "200ms ease-in",
      "canonical": "--transition-colors",
      "theme": "light",
      "canonDark": "200ms ease-in",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--radius-card",
      "value": "10px",
      "canonical": "--radius-card",
      "theme": "light",
      "canonDark": "10px",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--radius-btn",
      "value": "7px",
      "canonical": "--radius-btn",
      "theme": "light",
      "canonDark": "7px",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--radius-input",
      "value": "7px",
      "canonical": "--radius-input",
      "theme": "light",
      "canonDark": "7px",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--radius-modal",
      "value": "12px",
      "canonical": "--radius-modal",
      "theme": "light",
      "canonDark": "12px",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--radius-badge",
      "value": "5px",
      "canonical": "--radius-badge",
      "theme": "light",
      "canonDark": "5px",
      "verdict": "MATCH",
      "line": 23
    },
    {
      "declared": "--radius-pill",
      "value": "20px",
      "canonical": "--radius-pill",
      "theme": "light",
      "canonDark": "20px",
      "verdict": "MATCH",
      "line": 23
    }
  ],
  "flags": [
    {
      "kind": "literal",
      "value": "#B91C1C",
      "selector": "<div style=\"\">",
      "prop": "color",
      "line": 88,
      "nearest": "--error",
      "id": "f1",
      "status": "approved-literal",
      "resolution": "approved as literal by vlad"
    }
  ],
  "matched": [],
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
