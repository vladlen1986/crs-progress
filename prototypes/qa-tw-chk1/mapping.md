# Mapping — qa-tw-chk1

Prototype: prototypes/qa-tw-chk1/qa-tw-chk1.html
Settled-SHA256: a5cb27de83fca567a0bd3e674bfb3487786ca032cdabee1d00a2111ce1cec214
Module: user_management
Inventory-Sources-SHA256: 0f8421ebb93f1ad3ad80c08a15614d4e87724fa95e88a9a49c45fcd766bc8a98 (design-system-export.md ABSENT — curated attested set)

## Tokens used (var → canonical → values)

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

## Local token block check (stale-token diff vs canon §2.10)

| declared | file value | canonical | canon dark | verdict |
|---|---|---|---|---|
| `--bg` | #181818 | `--bg-primary` | #181818 | MATCH |
| `--surface-1` | #1E1E1E | `--bg-secondary` | #1E1E1E | MATCH |
| `--surface-2` | #242424 | `--bg-tertiary` | #242424 | MATCH |
| `--surface-3` | #2A2A2A | `--bg-elevated` | #2A2A2A | MATCH |
| `--border` | #242424 | `--border-default` | #242424 | MATCH |
| `--border-hover` | #333333 | `--border-hover` | #333333 | MATCH |
| `--border-active` | #3D3D3D | `--border-active` | #3D3D3D | MATCH |
| `--accent` | #3B82F6 | `--accent` | #3B82F6 | MATCH |
| `--accent-hover` | #2563EB | `--accent-hover` | #2563EB | MATCH |
| `--accent-active` | #1D4ED8 | `--accent-active` | #1D4ED8 | MATCH |
| `--accent-soft` | #60A5FA | `--accent-soft` | #60A5FA | MATCH |
| `--text-primary` | #E0E0E0 | `--text-primary` | #E0E0E0 | MATCH |
| `--text-secondary` | #A6A6A6 | `--text-secondary` | #A6A6A6 | MATCH |
| `--text-muted` | #6B6B6B | `--text-muted` | #6B6B6B | MATCH |
| `--error` | #EF4444 | `--error` | #EF4444 | MATCH |
| `--font-sans` | 'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif | `--font-sans` | 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif | MATCH |
| `--font-mono` | 'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace | `--font-mono` | 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace | MATCH |
| `--r-button` | 6px | `--radius-btn` | 7px | STALE |
| `--h-btn-sm` | 28px | `--h-button-sm` | 28px | MATCH |
| `--h-btn` | 32px | `--h-button` | 32px | MATCH |
| `--h-btn-lg` | 40px | `--h-button-lg` | 40px | MATCH |
| `--ease` | 160ms cubic-bezier(.4,0,.2,1) | `--transition` | 160ms cubic-bezier(.4,0,.2,1) | MATCH |

## Components detected (→ family, find-first existing)

| selector | family | existing style / reusable | disposition |
|---|---|---|---|
| `.row` | Layout / containers (page scaffold) (CRS-design-system.md §15) | CRS - Elevated Card — CRS-design-system.md §20 | reuse/clone by ID — never recreate |
| `button` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-primary` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-secondary` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-danger` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-ghost` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-link` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-sm` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |
| `.btn-lg` | Buttons (variants/sizes/states) (CRS-design-system.md §14 + design/CRS_UI_Kit.html §3) | (none attested) | CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase) |

## Interactions demonstrated

- .btn states: disabled
- .btn-danger states: active/hover
- .btn-ghost states: hover
- .btn-link states: hover
- .btn-primary states: active/hover
- .btn-secondary states: active/hover
- disabled attribute states demonstrated
- transform on .btn-danger:active → scale(0.99)
- transform on .btn-primary:active → scale(0.99)
- transform on .btn-secondary:active → scale(0.99)
- transition on .btn → all var(--ease)

## FLAGGED — blocking until each is resolved (map / approve-as-literal / fix prototype)

| id | kind | value | location | nearest token | status | resolution |
|---|---|---|---|---|---|---|
| f1 | stale-token | `--r-button:6px` | :root · --r-button · L7 | --radius-btn = 7px | unresolved |  |
| f2 | literal | `#B91C1C` | .btn-danger:active · background · L44 | --error | unresolved |  |
| f3 | literal | `#FF00AA` | <div style=""> · color · L108 | --error | approved-literal | approved as literal by vlad |

## Value-matched literals (auto-mapped, non-blocking — fix in prototype when convenient)

| value | location | matches token (theme) | suggested fix |
|---|---|---|---|
| `10px` | .row · border-radius · L24 | `--radius-card` (dark) | replace with var(--radius-card) |
| `#fff` | .btn-primary · color · L34 | `--white` (dark) | replace with var(--white) |
| `#fff` | .btn-danger · color · L41 | `--white` (dark) | replace with var(--white) |
| `#DC2626` | .btn-danger:hover · background · L43 | `--error` (light) | replace with var(--error) — NOTE: matched the LIGHT value; verify intent |

```json crs-mapping
{
  "name": "qa-tw-chk1",
  "module": "user_management",
  "settledHash": "a5cb27de83fca567a0bd3e674bfb3487786ca032cdabee1d00a2111ce1cec214",
  "inventorySha": "0f8421ebb93f1ad3ad80c08a15614d4e87724fa95e88a9a49c45fcd766bc8a98",
  "tokenRows": [
    {
      "var": "--accent",
      "canonical": "--accent",
      "dark": "#3B82F6",
      "light": "#3B82F6",
      "selectors": [
        ".btn-primary",
        ".btn-link"
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
      "var": "--accent-soft",
      "canonical": "--accent-soft",
      "dark": "#60A5FA",
      "light": "#2563EB",
      "selectors": [
        ".btn-link:hover"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--bg",
      "canonical": "--bg-primary",
      "dark": "#181818",
      "light": "#FAFAFA",
      "selectors": [
        "html"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--border",
      "canonical": "--border-default",
      "dark": "#242424",
      "light": "#EAEAEB",
      "selectors": [
        ".row"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--border-active",
      "canonical": "--border-active",
      "dark": "#3D3D3D",
      "light": "#C8C8CB",
      "selectors": [
        ".btn-secondary:hover"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--ease",
      "canonical": "--transition",
      "dark": "160ms cubic-bezier(.4,0,.2,1)",
      "light": "160ms cubic-bezier(.4,0,.2,1)",
      "selectors": [
        ".btn"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--error",
      "canonical": "--error",
      "dark": "#EF4444",
      "light": "#DC2626",
      "selectors": [
        ".btn-danger"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--font-mono",
      "canonical": "--font-mono",
      "dark": "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
      "light": null,
      "selectors": [
        ".sub",
        ".note"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--font-sans",
      "canonical": "--font-sans",
      "dark": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      "light": null,
      "selectors": [
        "html",
        ".btn"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--h-btn",
      "canonical": "--h-button",
      "dark": "32px",
      "light": null,
      "selectors": [
        ".btn"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--h-btn-lg",
      "canonical": "--h-button-lg",
      "dark": "40px",
      "light": null,
      "selectors": [
        ".btn-lg"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--h-btn-sm",
      "canonical": "--h-button-sm",
      "dark": "28px",
      "light": null,
      "selectors": [
        ".btn-sm"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--r-button",
      "canonical": "--radius-btn",
      "dark": "7px",
      "light": "7px",
      "selectors": [
        ".btn"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--surface-1",
      "canonical": "--bg-secondary",
      "dark": "#1E1E1E",
      "light": "#FFFFFF",
      "selectors": [
        ".row"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--surface-2",
      "canonical": "--bg-tertiary",
      "dark": "#242424",
      "light": "#F4F4F5",
      "selectors": [
        ".btn-secondary:hover",
        ".btn-ghost:hover"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--surface-3",
      "canonical": "--bg-elevated",
      "dark": "#2A2A2A",
      "light": "#FFFFFF",
      "selectors": [
        ".btn-secondary"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--text-muted",
      "canonical": "--text-muted",
      "dark": "#6B6B6B",
      "light": "#8E8E95",
      "selectors": [
        ".sub",
        ".note"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--text-primary",
      "canonical": "--text-primary",
      "dark": "#E0E0E0",
      "light": "#18181B",
      "selectors": [
        "html",
        ".btn-secondary:hover",
        ".btn-ghost:hover"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    },
    {
      "var": "--text-secondary",
      "canonical": "--text-secondary",
      "dark": "#A6A6A6",
      "light": "#5F5F66",
      "selectors": [
        "h2",
        ".btn-secondary",
        ".btn-ghost"
      ],
      "style": "(none attested for this token — style mapping happens at component rows)"
    }
  ],
  "localTokens": [
    {
      "declared": "--bg",
      "value": "#181818",
      "canonical": "--bg-primary",
      "theme": "dark",
      "canonDark": "#181818",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--surface-1",
      "value": "#1E1E1E",
      "canonical": "--bg-secondary",
      "theme": "dark",
      "canonDark": "#1E1E1E",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--surface-2",
      "value": "#242424",
      "canonical": "--bg-tertiary",
      "theme": "dark",
      "canonDark": "#242424",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--surface-3",
      "value": "#2A2A2A",
      "canonical": "--bg-elevated",
      "theme": "dark",
      "canonDark": "#2A2A2A",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--border",
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
      "declared": "--accent-soft",
      "value": "#60A5FA",
      "canonical": "--accent-soft",
      "theme": "dark",
      "canonDark": "#60A5FA",
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
      "declared": "--error",
      "value": "#EF4444",
      "canonical": "--error",
      "theme": "dark",
      "canonDark": "#EF4444",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--font-sans",
      "value": "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
      "canonical": "--font-sans",
      "theme": "dark",
      "canonDark": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--font-mono",
      "value": "'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace",
      "canonical": "--font-mono",
      "theme": "dark",
      "canonDark": "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--r-button",
      "value": "6px",
      "canonical": "--radius-btn",
      "theme": "dark",
      "canonDark": "7px",
      "verdict": "STALE",
      "line": 7
    },
    {
      "declared": "--h-btn-sm",
      "value": "28px",
      "canonical": "--h-button-sm",
      "theme": "dark",
      "canonDark": "28px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--h-btn",
      "value": "32px",
      "canonical": "--h-button",
      "theme": "dark",
      "canonDark": "32px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--h-btn-lg",
      "value": "40px",
      "canonical": "--h-button-lg",
      "theme": "dark",
      "canonDark": "40px",
      "verdict": "MATCH",
      "line": 7
    },
    {
      "declared": "--ease",
      "value": "160ms cubic-bezier(.4,0,.2,1)",
      "canonical": "--transition",
      "theme": "dark",
      "canonDark": "160ms cubic-bezier(.4,0,.2,1)",
      "verdict": "MATCH",
      "line": 7
    }
  ],
  "flags": [
    {
      "kind": "stale-token",
      "value": "--r-button:6px",
      "selector": ":root",
      "prop": "--r-button",
      "line": 7,
      "nearest": "--radius-btn = 7px",
      "id": "f1",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "literal",
      "value": "#B91C1C",
      "selector": ".btn-danger:active",
      "prop": "background",
      "line": 44,
      "nearest": "--error",
      "id": "f2",
      "status": "unresolved",
      "resolution": ""
    },
    {
      "kind": "literal",
      "value": "#FF00AA",
      "selector": "<div style=\"\">",
      "prop": "color",
      "line": 108,
      "nearest": "--error",
      "id": "f3",
      "status": "approved-literal",
      "resolution": "approved as literal by vlad"
    }
  ],
  "matched": [
    {
      "value": "10px",
      "selector": ".row",
      "prop": "border-radius",
      "line": 24,
      "token": "--radius-card",
      "theme": "dark",
      "fix": "replace with var(--radius-card)"
    },
    {
      "value": "#fff",
      "selector": ".btn-primary",
      "prop": "color",
      "line": 34,
      "token": "--white",
      "theme": "dark",
      "fix": "replace with var(--white)"
    },
    {
      "value": "#fff",
      "selector": ".btn-danger",
      "prop": "color",
      "line": 41,
      "token": "--white",
      "theme": "dark",
      "fix": "replace with var(--white)"
    },
    {
      "value": "#DC2626",
      "selector": ".btn-danger:hover",
      "prop": "background",
      "line": 43,
      "token": "--error",
      "theme": "light",
      "fix": "replace with var(--error) — NOTE: matched the LIGHT value; verify intent"
    }
  ],
  "compRows": [
    {
      "selector": ".row",
      "family": "layout",
      "familyName": "Layout / containers (page scaffold)",
      "ref": "CRS-design-system.md §15",
      "existing": "CRS - Elevated Card — CRS-design-system.md §20",
      "disposition": "reuse/clone by ID — never recreate"
    },
    {
      "selector": "button",
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
      "selector": ".btn-secondary",
      "family": "buttons",
      "familyName": "Buttons (variants/sizes/states)",
      "ref": "CRS-design-system.md §14 + design/CRS_UI_Kit.html §3",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".btn-danger",
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
      "selector": ".btn-link",
      "family": "buttons",
      "familyName": "Buttons (variants/sizes/states)",
      "ref": "CRS-design-system.md §14 + design/CRS_UI_Kit.html §3",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".btn-sm",
      "family": "buttons",
      "familyName": "Buttons (variants/sizes/states)",
      "ref": "CRS-design-system.md §14 + design/CRS_UI_Kit.html §3",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    },
    {
      "selector": ".btn-lg",
      "family": "buttons",
      "familyName": "Buttons (variants/sizes/states)",
      "ref": "CRS-design-system.md §14 + design/CRS_UI_Kit.html §3",
      "existing": null,
      "disposition": "CREATE (no attested match — new style per §13 naming, add to Design System page bUfVN0 showcase)"
    }
  ],
  "interactions": [
    ".btn states: disabled",
    ".btn-danger states: active/hover",
    ".btn-ghost states: hover",
    ".btn-link states: hover",
    ".btn-primary states: active/hover",
    ".btn-secondary states: active/hover",
    "disabled attribute states demonstrated",
    "transform on .btn-danger:active → scale(0.99)",
    "transform on .btn-primary:active → scale(0.99)",
    "transform on .btn-secondary:active → scale(0.99)",
    "transition on .btn → all var(--ease)"
  ]
}
```
