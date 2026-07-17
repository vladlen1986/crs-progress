# CRS Design System

**Authoritative, single-source design reference for the Casino Reporting Suite (CRS).**
Everything here applies to the live Bubble app and all internal demos/prototypes. This file replaces the old `design.md` + `Styles.txt` (now merged). When prompting in chat or in Buildprint, **attach this file** — it is the source of truth.

- **Themes:** Dark (primary, canonical) + Soft Grey (light, secondary)
- **Accent:** `#3B82F6` (kept identical across both themes — dark↔light is the *same app*, differently lit)
- **Font:** Inter (UI), Inter Tight (small labels), JetBrains Mono (numbers/codes)

---

## 0. How to use this file

| Consumer | What to read |
|---|---|
| **Buildprint** (Bubble schema/styles) | §2 Token tables → map each to a named Bubble Style. §3 Theme system → Conditional Style Swapping. |
| **Claude chat** (design/strategy) | Whole file; especially §4–§9 component patterns. |
| **Claude Code / HTML demos** | §2.4 CSS variables block — paste into any HTML file. |

> **Golden rule for Buildprint:** every element references a **named Style/variable**, never an inline/literal hex. Inline colors break theme switching (the element can't be swapped). Putting every element on a named Style is the prerequisite for light mode.

---

## 1. Reconciliation log (what was fixed in this merge)

Resolved contradictions found across the old files + session decisions:

1. ✅ **Module count = 46** across 7 sections (old doc said 39; section table summed to 41 — both wrong).
2. ✅ **Permission model = single permissions list on the Role DT.** Removed the stale "extras list per user" (rejected as scope creep). Checks are permission-based: `Current User's role's permissions contains [X]`.
3. ✅ **Reusable element prefix = `# Name`** (e.g. `# Casino Settings`, `# Roles & Permissions`). Canonical going forward.
4. ✅ **Hierarchy = Company → Property → Division → Department** (Casino Section + Location are physical attributes on Property). Old doc only described Company + Property.
5. ✅ **Active-nav rule clarified** — active = background + text/icon color, **no border** (this is "pick two," compliant).
6. ✅ Added full **Theme System** (§3), **light variants for every token** (§2), and the **modal** + **user-menu** + **filter** patterns (§5–§7).

---

## 2. Color Tokens (paired: Dark + Soft Grey light)

**Token names are identical across themes.** Only the *values* change per `data-theme`. This is what makes Conditional Style Swapping work.

### 2.1 Surfaces

| Token | Dark | Light (Soft Grey) | Use |
|---|---|---|---|
| `--bg-primary` | `#181818` | `#FAFAFA` | App background (recedes) |
| `--bg-secondary` | `#1E1E1E` | `#FFFFFF` | Cards, panels, sidebar (the working surface) |
| `--bg-tertiary` | `#242424` | `#F4F4F5` | Hover states, active items, secondary buttons |
| `--bg-elevated` | `#2A2A2A` | `#FFFFFF` | Modals, dropdowns, focused inputs (elevation = **shadow** in light) |

> ⚠️ **Elevation inverts in light mode.** In dark, elevated surfaces get *brighter*. In light, surfaces are already near-white, so **elevation is expressed by shadow, not by going brighter**, and **hover *darkens*** (`--bg-tertiary` is darker than the white card) rather than lightening. Buildprint must not naively mirror the dark relationships.

### 2.2 Borders

| Token | Dark | Light | Use |
|---|---|---|---|
| `--border-default` | `#242424` | `#EAEAEB` | Default borders, dividers |
| `--border-hover` | `#333333` | `#DCDCDE` | Hover-state borders |
| `--border-active` | `#3D3D3D` | `#C8C8CB` | Pressed/active borders, checkbox outlines |
| `--input-border` | `#2A2A2A` | `#E4E4E6` | Input default border (focus → `--accent` + glow) |

### 2.3 Accent (blue — kept across themes)

| Token | Dark | Light | Use |
|---|---|---|---|
| `--accent` | `#3B82F6` | `#3B82F6` | **Fill** accent: primary buttons, checked boxes, active chips (white text sits on top) |
| `--accent-hover` | `#2563EB` | `#2563EB` | Hover on primary buttons |
| `--accent-active` | `#1D4ED8` | `#1D4ED8` | Pressed state |
| `--accent-text` | `#3B82F6` | `#1D4ED8` | **Accent as text/icon** (active nav label, links). Light uses darker value for legibility on near-white (`#3B82F6` on `#F4F4F5` is only ~3.3:1; `#1D4ED8` is ~5.8:1). |
| `--accent-soft` | `#60A5FA` | `#2563EB` | Secondary highlights, counters |
| `--accent-glow` | `rgba(59,130,246,0.13)` | `rgba(59,130,246,0.13)` | Focus ring (3px) |
| `--accent-tint` | `rgba(59,130,246,0.08)` | `rgba(59,130,246,0.08)` | Subtle accent backgrounds |
| `--accent-border-active` | `rgba(59,130,246,0.55)` | `rgba(59,130,246,0.55)` | Selected chip / active selection border |

### 2.4 Text

| Token | Dark | Light | Use |
|---|---|---|---|
| `--text-primary` | `#E0E0E0` | `#18181B` | Headings, key info — used sparingly |
| `--text-secondary` | `#A6A6A6` | `#5F5F66` | **Default body text** (CRS default, not primary) |
| `--text-muted` | `#6B6B6B` | `#8E8E95` | Section labels, supporting text, sidebar icons |
| `--text-disabled` | `#565656` | `#B6B6BB` | Disabled / very muted |

> **Default body text is `--text-secondary`**, not `--text-primary`. `#E0E0E0` (dark) / `#18181B` (light) are reserved for headings and emphasis.

### 2.5 Status

| Token | Dark | Light | Use |
|---|---|---|---|
| `--success` | `#22C55E` | `#16A34A` | Success, "Live" (light darkens for white-bg legibility) |
| `--success-soft` | `#4ADE80` | `#22C55E` | Presence dots, checkmarks |
| `--error` | `#EF4444` | `#DC2626` | Errors, flags, destructive |
| `--error-soft` | `#F87171` | `#DC2626` | Soft error fills/text (inactive status, red-400) |
| `--warning` | `#F59E0B` | `#D97706` | Warnings |
| `--purple` | `#8B5CF6` | `#7C3AED` | Avatar gradients, special labels |
| `--purple-accent` | `#A855F7` | `#9333EA` | Decorative purple accent for icons/highlights |
| `--cyan` | `#06B6D4` | `#0891B2` | Informational accents |
| `--na` | `#2B2B2B` | `#E6E6E8` | Disabled/N-A cell markers (matrix empty cells) |

> ⚠️ **Naming collision to fix in-app:** `--purple` and `--purple-accent` are **both stored under the Globals display name "Purple."** Rename the decorative one (`#A855F7`) to "Purple Accent" so they are distinguishable when picking a color. (Logged under App-drift.)

### 2.5.1 Status tints & utility colors (added — were missing from the doc)

Alpha-tint fills (used for toast/alert backgrounds and soft status surfaces) and the plain utility colors, all present in Globals and in use:

| Token | Dark | Light | Use |
|---|---|---|---|
| `--success-tint` | `#22C55E (13%)` | `#16A34A (10%)` | Subtle success backgrounds |
| `--warning-tint` | `#F59E0B (13%)` | `#D97706 (10%)` | Subtle warning backgrounds |
| `--error-tint` | `#EF4444 (13%)` | `#DC2626 (10%)` | Subtle error backgrounds |
| `--white` | `#FFFFFF` | `#FFFFFF` | Text/icons on accent fills |
| `--black` | `#000000` | `#000000` | Utility (shadow rgb base) |
| `--transparent` | `#FFFFFF (0%)` | `#FFFFFF (0%)` | Utility |

### 2.6 Module Status Tags (paired)

| Tag | Dark BG / Border / Text | Light BG / Border / Text |
|---|---|---|
| **Coming Soon** | `#1A1025` / `#3D2D6E` / `#C084FC` | `#F5F0FF` / `#E2D6F5` / `#7C3AED` |
| **On Roadmap** | `#111827` / `#1F2D45` / `#60A5FA` | `#EFF4FF` / `#D6E2F5` / `#2563EB` |
| **Live** | (no badge — dot only) `#4ADE80` | (no badge — dot only) `#16A34A` |

### 2.7 Shadows

| Token | Dark | Light |
|---|---|---|
| `--shadow-card` | none (border only) | none (border only) |
| `--shadow-modal` | `0 24px 60px rgba(0,0,0,0.6)` | `0 16px 40px rgba(0,0,0,0.10)` |
| `--shadow-dropdown` | `0 12px 40px rgba(0,0,0,0.55)` | `0 12px 40px rgba(0,0,0,0.08)` |

### 2.8 Motion (transitions)

| Token | Value | Use |
|---|---|---|
| `--transition` | `160ms cubic-bezier(.4,0,.2,1)` | **Interaction** states: hover, press, expand/collapse, focus |
| `--transition-colors` | `200ms ease-in` | **All color changes** — `background-color`, `color`, `border-color`, `fill`. This is what animates the theme switch smoothly. |

> **Rule:** every element that has a color/background/border that differs between themes must transition those properties with `--transition-colors` (200ms ease-in), so switching theme cross-fades instead of snapping. Apply globally (e.g. on a base selector) covering `background-color, color, border-color, fill`.

### 2.9 Radius & sizing (theme-independent)

| Token | Value |
|---|---|
| `--radius-card` | `10px` |
| `--radius-btn` | `7px` (range 6–7) |
| `--radius-input` | `7px` (range 6–7) |
| `--radius-modal` | `12px` (range 12–14) |
| `--radius-badge` | `5px` (range 4–5) |
| `--radius-pill` | `20px` |
| Button height — default / large / small | `32–34px` / `40–44px` / `28px` |
| Input height — default / large | `36–38px` / `44px` |

### 2.10 CSS variables block (for HTML demos)

```css
:root, [data-theme="dark"] {
  --bg-primary:#181818; --bg-secondary:#1E1E1E; --bg-tertiary:#242424; --bg-elevated:#2A2A2A;
  --border-default:#242424; --border-hover:#333333; --border-active:#3D3D3D; --input-border:#2A2A2A;
  --accent:#3B82F6; --accent-hover:#2563EB; --accent-active:#1D4ED8; --accent-text:#3B82F6;
  --accent-soft:#60A5FA; --accent-glow:rgba(59,130,246,0.13); --accent-tint:rgba(59,130,246,0.08);
  --accent-border-active:rgba(59,130,246,0.55);
  --text-primary:#E0E0E0; --text-secondary:#A6A6A6; --text-muted:#6B6B6B; --text-disabled:#565656;
  --success:#22C55E; --success-soft:#4ADE80; --error:#EF4444; --error-soft:#F87171; --warning:#F59E0B;
  --purple:#8B5CF6; --purple-accent:#A855F7; --cyan:#06B6D4; --na:#2B2B2B;
  --success-tint:rgba(34,197,94,0.13); --warning-tint:rgba(245,158,11,0.13); --error-tint:rgba(239,68,68,0.13);
  --white:#FFFFFF; --black:#000000; --transparent:rgba(255,255,255,0);
  --shadow-modal:0 24px 60px rgba(0,0,0,0.6); --shadow-dropdown:0 12px 40px rgba(0,0,0,0.55);
  --transition:160ms cubic-bezier(.4,0,.2,1); --transition-colors:200ms ease-in;
  --radius-card:10px; --radius-btn:7px; --radius-input:7px; --radius-modal:12px; --radius-badge:5px; --radius-pill:20px;
}

[data-theme="light"] {
  --bg-primary:#FAFAFA; --bg-secondary:#FFFFFF; --bg-tertiary:#F4F4F5; --bg-elevated:#FFFFFF;
  --border-default:#EAEAEB; --border-hover:#DCDCDE; --border-active:#C8C8CB; --input-border:#E4E4E6;
  --accent:#3B82F6; --accent-hover:#2563EB; --accent-active:#1D4ED8; --accent-text:#1D4ED8;
  --accent-soft:#2563EB; --accent-glow:rgba(59,130,246,0.13); --accent-tint:rgba(59,130,246,0.08);
  --accent-border-active:rgba(59,130,246,0.55);
  --text-primary:#18181B; --text-secondary:#5F5F66; --text-muted:#8E8E95; --text-disabled:#B6B6BB;
  --success:#16A34A; --success-soft:#22C55E; --error:#DC2626; --error-soft:#DC2626; --warning:#D97706;
  --purple:#7C3AED; --purple-accent:#9333EA; --cyan:#0891B2; --na:#E6E6E8;
  --success-tint:rgba(22,163,74,0.10); --warning-tint:rgba(217,119,6,0.10); --error-tint:rgba(220,38,38,0.10);
  --shadow-modal:0 16px 40px rgba(0,0,0,0.10); --shadow-dropdown:0 12px 40px rgba(0,0,0,0.08);
  --transition:160ms cubic-bezier(.4,0,.2,1); --transition-colors:200ms ease-in;
  --radius-card:10px; --radius-btn:7px; --radius-input:7px; --radius-modal:12px; --radius-badge:5px; --radius-pill:20px;
}

/* Smooth theme cross-fade — apply broadly */
* { transition: background-color var(--transition-colors), color var(--transition-colors), border-color var(--transition-colors), fill var(--transition-colors); }
```

---

## 3. Theme System (Dark + Soft Grey light)

### 3.1 Strategy

- **Dark is primary/default** — correct for 24/7 surveillance control rooms, premium feel, brand accent native.
- **Soft Grey light is the optional secondary** — selected per user.
- **Accent stays `#3B82F6` in both** (fill); accent-*text* darkens to `#1D4ED8` in light for legibility.
- Theme preference is stored on the **User** (`theme` field: `dark` / `light`, default `dark`), so it persists across sessions/devices.

### 3.2 Implementation in Bubble — Conditional Style Swapping

Bubble now supports swapping an element's **entire applied Style** via a single condition (no per-property overrides). Method:

1. In **Globals**, build **paired Styles**: for each Style used in the app, create a **`Name (Dark)`** default and a **`Name (Light)`** variant (e.g. `CRS - Elevated Card (Dark)` / `CRS - Elevated Card (Light)`, `CRS - Input 36px` / `... (Light)`). *(This is the convention actually in the app — the `(Dark)` / `(Light)` suffix, not `-dark`/`-light`.)*
2. On each element, the `(Dark)` Style is the default (`element.style`); the `(Light)` Style is attached to a **theme custom-state** (`bptheme`) whose condition applies the light variant when the current user is in light mode. One condition per element, swapping the whole Style.
3. A theme toggle (in the user menu) flips the user's theme preference; every element re-styles at once. *(The exact preference field — a `theme` text field vs. the `dark_theme` boolean currently in the app — is under review; see the Ambiguous list handed back with this sync.)*

**Prerequisite (non-negotiable):** every element must be on a **named Style** with **no inline/literal colors**. Any element with inline colors has no Style to swap and will stay dark while the rest flips. Cleaning up inline colors is the real work; the swap itself is then trivial.

**Buildprint standing rule (apply to every future prompt):**
> Use named Bubble Styles for all colors — never inline/literal hex. Name styles in dark/light-ready pairs using the **`Name (Dark)` / `Name (Light)`** convention. Build the `(Dark)` variant now; if light isn't being built yet, still name it `Name (Dark)` so the `(Light)` variant slots in later via the element's `bptheme` theme state. All color/background/border transitions use 200ms ease-in.

### 3.3 Light-mode gotchas (so Buildprint doesn't mirror dark blindly)

- **Hover darkens** (not lightens): hover bg = `--bg-tertiary` (`#F4F4F5`), which is *darker* than the white card.
- **Elevation = shadow**, not brightness: modals/dropdowns stay white but gain `--shadow-modal`/`--shadow-dropdown`.
- **Focus = border + glow**, not a bg change.
- **Accent text uses `--accent-text` (`#1D4ED8`)**, not `--accent`, on light backgrounds.
- **Status colors darken** on white for legibility (see §2.5).

---

## 4. Typography

**Fonts (three, as used in-app):**
- **Inter** — primary UI text (body, nav, buttons, headings).
- **Inter Tight** — small labels / metric labels. *(Present in Globals as a font token labelled "Lable" — the token name is a typo of "Label" and should be corrected in-app.)*
- **JetBrains Mono** — numbers, codes, metric values, technical. *(Applied directly on the number/metric text styles; it is **not** registered as a Bubble font token, so it can't be swapped centrally — keep it consistent by hand.)*

| Use | Font | Size | Weight | Letter-spacing |
|---|---|---|---|---|
| Page title | Inter | 22–28px | 700 | `-0.03em` |
| Section header (uppercase) | Inter | 10.5–11px | 700 | `0.1em` |
| Body / nav items | Inter | 12–13px | 400–500 | default |
| Button text | Inter | 12–13px | 600–700 | default |
| Label / metric label | Inter Tight | 10–12px | 500–600 | default |
| Meta / counts | JetBrains Mono | 10–12px | 600 | default |
| Code / numbers / KPI value | JetBrains Mono | 11–24px | 500–700 | default |

---

## 5. Modal / Popup pattern

The standard CRS modal (used by Change Password, Delete confirmations, Access-Denied, Add Property, Create Role).

**Container:** `--bg-secondary`, 1px `--border-default`, `--radius-modal` (12px), `--shadow-modal`. Width 380–460px typical.

**Structure (top→bottom):**
- **Header:** title 17px/700 `--text-primary`; optional subtitle 13px `--text-secondary` (state the rule/intent up front); top-right **X** button (ghost, hover bg `--bg-tertiary`).
- **Body:** 18–24px padding; fields stacked with 14–16px gap. Each field: label 13px `--text-secondary` → input (36–38px, `--bg-tertiary`, `--input-border`, focus accent+glow) → inline message slot.
- **Footer:** `border-top` `--border-default`, right-aligned, 8px gap: **Cancel** (ghost) + **Primary** (`--accent`).

**Required states:**
- **Validation:** inline error (red) / success (green) under fields; primary button **disabled until valid** (disabled = `--text-disabled` on `--bg-tertiary`).
- **Destructive** (delete): primary button danger style; **two variants** — (a) no dependents → simple confirm; (b) dependents exist (e.g. users assigned to a role) → **reassign-then-delete** (pick replacement before deleting). Guard `is_default`/system records from deletion entirely.
- **Access-denied:** centered lock icon + message + the **required-permission chip** naming what's needed.

**Specific modals already designed (reuse these):**
- **Change Password** — current/new/confirm; show/hide toggles per field; live **strength meter** (Weak/Fair/Good/Strong) + requirement checklist; match validation; **no "remind later" snooze** (it's a voluntary flow). "Current password incorrect" comes from the server check, wired to the input's error slot.
- **Delete Role** — variants per above.

---

## 6. User Menu (dropdown) pattern

The account dropdown opened from the user card at the bottom of the sidebar.

**Container:** width ~286px, `--bg-secondary`, `--border-default`, `--radius-modal` (12px), `--shadow-dropdown`.

**Structure:**
- **Header:** avatar 44px (circle, cover, fallback `--bg-tertiary`) + name (14px/600 `--text-primary`) + email (12px `--text-muted`); **role badge pill** below (uppercase, 10px/600, `--accent-text` on `--accent-tint`, 1px `rgba(59,130,246,0.25)`, radius 4px) reading `Current User's role's name`.
- **Section labels:** `Account` / `Preferences` / `Support` — 10px uppercase, `0.7px` spacing, `--text-muted`. **Auto-hide a label if all its rows are hidden.**
- **Menu rows:** 10px/16px padding, gap 12px; icon 17px `--text-muted`; label 13px `--text-secondary`; hover bg `--bg-tertiary`, label→`--text-primary`.
- **Theme toggle row** (under Preferences): segmented control Dark / Light; active segment `--bg-elevated`/`--text-primary`, inactive `--text-muted`. Sets `Current User's theme`.
- **Sign out:** divider above; **danger hover** — bg `rgba(239,68,68,0.1)`, text+icon `--error`.

**Build discipline (build-now vs stub-hidden):** only show rows whose destination exists. Build hidden rows for future destinations (My Profile, Notifications, Language, Help) and flip visibility on as each is built — never expose dead links. Change Password + Sign out are wired to existing workflows; do not alter those workflows, only point the redesigned buttons at them.

---

## 7. Dropdown & Filter patterns

**7.1 Searchable dropdown (single & multi).** Trigger (38px, `--bg-tertiary`, `--input-border`, open→accent+glow, chevron rotates) → panel (`--bg-secondary`, `--border-active`, `--shadow-dropdown`) with top search (filters by `search_tokens contains`), options list, empty state. Single: checkmark on select, panel closes. Multi: checkbox rows, count or chips in trigger, stays open. **Mandatory for large Option Sets** (Currency 156, Timezone 385) — native Bubble dropdowns choke without search. Build canonical reusables: `# Dropdown - Single` and `# Dropdown - Multi` (input + Repeating Group + `search_tokens` constraint + custom states).

**7.2 Two-pane people filter (single-select per relationship).** LEFT = relationship roles (Created by, Verified by, Reviewed by, Sent by, Responded by, Closed by, Final Closed by, Shift Leader). RIGHT = searchable user list with **photo + active/inactive status dot**, status tabs (Active/Inactive/All). Each relationship holds one User (custom state per relationship); selected user's photo thumbnails next to the relationship on the left. Footer: "Selecting for [relationship]" + Clear. **User search constraint 1 (mandatory): `company = Current User's company`** (tenant isolation), then property scope, then `search_tokens`, then status. **WU note:** batch with an Apply action — don't re-run the report query on every pick.

---

## 8. Permission Matrix (Roles & Permissions editor)

**Layout:** rows = **resources**, columns = **actions** (`View · Create · Edit · Delete · Other`). Checkbox at each valid intersection; faint `--na` dot where the action doesn't exist for that resource. Grouped by **module** (section bands with per-module tally + All/None). Monochrome — `--accent` only on checked boxes.

- **"Other" column** holds non-CRUD actions (Submit, Verify, Review, Send, Close, Flag, Select, Filter, Rollback) as small labeled toggle chips (a single checkbox can't hold multiple "other" actions like Report's Submit+Verify+Review).
- **Staged editing:** changes staged in a custom state; Save/Discard floating bar appears on dirty.
- **Schema:** `OS - Permission` carries `permission_group` (module = the row's module band) + `action_type` (→ which column). Add `action_type` and **backfill all permissions** (blanks vanish from the matrix). Resource (row) derives from the `{Resource}` portion of the permission name; add a `resource` attribute only if naming proves inconsistent.

> **Honest caveat (kept on record):** the matrix fits CRUD resources well (Employee, Task, Report Comment/Response). It strains for (a) Report's ~30 view-by-status / view-by-group gates and all Menu Items, which are **view-only single-checkbox rows** wasting 4 columns, and (b) workflow-heavy resources. If this becomes painful, split into: matrix for CRUD + a simple on/off checklist for visibility gates. Acceptable to ship one matrix for pilot.

**Open data gap:** 16 permissions currently have **no module** (Tasks, Customer/User menus, Report-Rollback). Assign modules or they keep falling out of every grouped view.

---

## 9. Toast / notification pattern

Welcome/confirmation toast: `--bg-secondary` surface, `--border-active`, avatar (photo, fallback `--accent`), spring entrance (`420ms cubic-bezier(.16,1,.3,1)`), auto-dismiss ~3.5s. Title 14px/700 `--text-primary`, message 12px `--text-secondary`.

---

## 10. Sidebar

**Width:** 256px (240px was too tight for long labels like "Request for Investigation"). Inner padding 12px L/R.

**Sections:** one Repeating Group **per section**, filtered by `OS - Module Section`. **Collapsed by default.** Headers: uppercase 11px/700 `--text-muted`. Dividers between sections `--bg-elevated` @75% opacity. Spacing: 8–12px last-item→divider, 16–20px divider→next header. **No icons on section headers** (text + chevron only).

**Nav item:** height 32px; padding 12px; icon 16–17px `--text-muted`; gap 8px; label Inter 12–13px/400 `--text-secondary`; radius 6px.
**Active state:** bg `--bg-tertiary` + text/icon `--accent-text` + **no border** (bg + color, "pick two").

**Pinned section:** top of sidebar, above first section; **per-user** (list on User, not a flag on a shared item); filled pin icon on pinned items; pinned items remain visible in their home section (not removed); active state applies to the pinned copy when on that page. Expand/collapse via chevron (custom state). *(Open: duplication UX may be revisited.)*

---

## 11. Sections (locked) — 46 modules / 7 sections

| Section | Sort | # Modules |
|---|---|---|
| Pinned (dynamic, per user) | -10 | user-pinned |
| Admin / Core | 10 | 9 (incl. Import & Export) |
| Operations | 20 | 5 (Reporting, Tasks, RFI, Dashboard, Malfunction Log) |
| Surveillance | 30 | 6 (DAL, EOS, Investigation Cases, Alert Center, CCTV Audits, Equipment Inspection) |
| Guests | 40 | 5 |
| HR / Employees | 50 | 9 (incl. Disciplinary Actions, Job Board, Onboarding) |
| Compliance | 60 | 4 |
| Communication | 70 | 3 |

**Total = 46 modules** (excludes the dynamic Pinned section). Sort order is data; visual order can differ (Admin/Core often pinned to top by user pref).

**Module Status System** (on `OS - Module`): `live` (clickable, no badge) / `soon` (Coming Soon page, purple SOON badge) / `roadmap` (Coming Soon page, blue ROADMAP badge). Coming Soon = **full-page** treatment (no modal): ghost watermark word → title → description → status pill. No ETA/Notify.

---

## 12. Architecture Decisions (locked)

1. **Multi-tenant model** — Company + Property tenancy; hierarchy Company → Property → Division → Department. MVP = 1 property per company; multi-property flips in v2 with zero migration (Pattern A: each business DT links to its natural parent + a direct `property` field).
2. **Permissions** — Custom **Role DT** + fixed **`OS - Permission`**. **Single permissions list on the Role** (no per-user extras). Checks: `Current User's role's permissions contains [X]`. Privacy on Role: `This Role's property = Current User's property`. `is_default` flag marks shipped roles (blocks deletion).
3. **GDPR** — hybrid anonymize / soft-delete / retain.
4. **Tiers** — 5 subscription tiers (Subscription & Tier module = roadmap).
5. **Search** — hybrid: native Bubble + Scious Omnisearch + Typesense.
6. **App routing** — single `App` page (SPA); URL param `v` switches module; reusables render in main area.
7. **Privacy rule pattern** — every business DT has `company` + `property` FK; **every privacy rule's first check is `Current User's company = This Thing's company`**.
8. **Audit trail** — single `ActivityLog` DT, polymorphic `subject_type` + `subject_id`, fired async via Schedule API Workflow.
9. **Reusable cross-module components** — `parent_type` + `parent_id` inputs (File Attachments, Comments, Revision History, Audit Trail) — one element, many parents.
10. **Soft-deactivation** — business records (e.g. Property) flip `is_active=no` + stamp `deactivated_date`; never hard-delete. **Never hard-delete Option Set entries** (soft-delete leaves broken pointers requiring manual repointing).
11. **Theme** — `theme` field on User (`dark`/`light`, default `dark`); applied via Conditional Style Swapping (§3).

---

## 13. Bubble Element Naming

| Kind | Prefix | Example |
|---|---|---|
| Page | `#Name` | `#App`, `#index` |
| Popup | `#PP - Name` | `#PP - Create Report` |
| Reusable Element | `# Name` | `# Casino Settings`, `# Roles & Permissions` |
| Floating Group | `#FG - Name` | `#FG - Report Preview` |
| Group (inline) | (no prefix) | sections inside a page |
| Repeating Group | (no prefix) | lists |

**Data Types:** singular (User, Report, Task — not plural).
**Modules:** industry-standard names (Daily Activity Log, End of Shift Report); avoid redundancy with section name.

---

## 14. Component States (every interactive element defines)

Default · Hover (bg lightens in dark / **darkens in light**, no border change) · Active/Pressed (`--accent-active` for primary, `--bg-tertiary` for secondary) · Focused (3px `--accent-glow` ring) · Disabled (`--text-disabled`, or opacity 0.5) · Empty (centered placeholder + ghost text + CTA) · Loading (skeleton/spinner, not blank) · Error (red border + message below).

---

## 15. Spacing

Card/panel padding 18–24px · section vertical rhythm 24–32px · inline gap 6–12px (8 default) · filter chips gap 6–8px · list item vertical padding 10–12px (32px total for sidebar items).

---

## 16. Iconography

**Primary library: Feather Icons.** **Fallback: Bootstrap Icons** — used only when Feather has no suitable icon. This applies in both Bubble and Buildprint. Prefer Feather first; reach for Bootstrap only to fill a gap.

- **Style:** outlined/stroke throughout (no filled `-fill` variants in nav). Feather is stroke-based by default, which matches; pick Bootstrap's outline variants to stay consistent.
- **Stroke weight:** ~1.7 (Feather default reads well at sidebar sizes).
- **Sizing:** 16–17px in sidebar/nav, 17px in menu rows, 13–15px inline.
- **Color:** `--text-muted` default (softened); `--accent-text` when active.
- Icon code/name stored on `OS - Module` (note which library per icon if mixing), rendered via conditionals on the Bubble Icon element.

> When I suggest icons in prototypes/HTML, I'll name the **Feather** icon first and only fall back to a Bootstrap name when Feather lacks a fit — and I'll say which library each one is from.

---

## 17. What NOT to do

- ❌ Inline/literal hex on elements — always use a named Style/token (breaks theming).
- ❌ `--text-primary` as default body text — too bright/dark; use `--text-secondary`.
- ❌ Icons on section headers — text + chevron only.
- ❌ bg + border + text-color all on active items — pick two.
- ❌ Mirror dark→light naively — hover darkens, elevation = shadow, accent text darkens (see §3.3).
- ❌ Strikethrough completed items — looks deleted.
- ❌ Fragment shared modules per department (Reporting is one module, filtered).
- ❌ Filter UI in two competing places.
- ❌ Modals/popups for module-level "coming soon" — full-page treatment.
- ❌ Hard-delete Option Set entries or business records — soft-delete/deactivate.
- ❌ Dead menu links — stub-hidden until destination exists.
- ❌ Fabricate modules outside the locked 46.

---

## 18. Accessibility watch-items

- **Accent-as-text on light:** `#3B82F6` on near-white is ~3.3:1 (sub-AA for small text) — hence `--accent-text` = `#1D4ED8` in light. Don't use `--accent` for small text on light surfaces.
- **Muted text contrast:** `--text-muted` is intentionally low-contrast for labels; don't use it for essential body copy.

---

## 19. Open Questions / TBD

- [ ] Permission matrix vs checklist split for view-only gates (Menu Items, Report status/group) — ship one matrix for pilot, revisit if painful (§8).
- [ ] Backfill the 16 ungrouped permissions with a module (§8).
- [ ] Backfill `action_type` on all permissions before building the matrix editor.
- [ ] Pinning duplication UX (home section + pinned copy).
- [ ] Per-tier module gating (waits on Subscription & Tier spec).
- [ ] Mobile/tablet sidebar breakpoint behavior.
- [ ] Reusable prefix migration: some elements use `RE_Name` / `RE - Name`; standardize to `# Name`.

---

## 20. Component library addenda (synced from the `design_system` page)

These components are **showcased on the in-app `design_system` page but were missing from this doc.** Summaries below; the exhaustive per-property, per-theme resolved spec (every style name + token + value + state) lives in **`design-system-export.md`**.

### 20.1 Button Groups / Segmented controls
Segmented toggle: a `GroupFocus` track holding N segment buttons. **Sizes 28 / 32 / 36 / 40 / 48px.** Inactive segment = `--bg-tertiary` bg + `--text-secondary` label; **active segment swaps its whole Style** (via a `zzactive` / `zzactivelight` state keyed on the selected value + theme) to an accent fill (`--accent`), or the success (`--success`) / error (`--error`) variants for on/off-style toggles. Radius `--radius-btn`; 200ms color transitions.

### 20.2 Selection Controls (checkbox · radio · switch)
- **Checkbox** — box `--input-border`, checked fill `--accent` + white check icon; states unchecked / checked / disabled.
- **Radio** — ring `--input-border`, selected inner dot `--accent`; states unselected / selected / disabled.
- **Switch** — track `--bg-tertiary` → `--accent` when on; white knob; states off / on / disabled.

### 20.3 Pickers
Native `DateInput` (`CRS - Primary` style) covers date / date-time / range; four custom picker reusables exist (Relative Date & Time, Single Date & Time, Single Date, Date Range). *Reusable internals are not inspectable from the showcase page — see export.*

### 20.4 KPI Tiles
Six archetypes shown: **Filter, Trend, Goal, Alert, Compact, Split.** Built from shared atoms: metric **value** JetBrains Mono 24px/700 (or 16px/600 compact), **label** Inter Tight muted, **meta** JetBrains Mono 12px/600, three **delta sentiment** styles (up = `--success`, down = `--error`, flat = `--text-muted`), a KPI icon, and a Toolbox progress bar. Card = `--bg-secondary`, 1px `--border-default`, `--radius-card`.

### 20.5 Avatars
Three avatar reusables (Employee / User / Guest) × three sizes **SM 24 / MD 32 / LG 44px**, each in photo / initials-fallback / with-text modes. Photo = 2px ring, radius 100 (circle). Initials fallback color roles: neutral / accent / success / warning / error (flat font-color). **Status dot** — active `--success-soft`, inactive `--error-soft`. *(No avatar gradient exists in-app despite older notes; do not spec one.)*

### 20.6 Tables & Lists
Table container `--bg-secondary` + `--border-default`; **header row** muted uppercase; **body row** 41px with 1px `--border-default` divider; **selected row** = accent-tint background + 2px `--accent` left bar (padding compensates 16→14px); status badges (green/amber/red); ghost 28px icon button + 16px accent icon; footer/pagination row. A simple **List** variant (container + row) is also shown. *(No alphabet rail is built.)*

### 20.7 Chips & Badges taxonomy
- **Status badges** (Text-based): Neutral, Blue, Green, Amber, Red — small pill, `--radius-badge`, 10–11px/600. *(App currently hardcodes the colored badge rgba rather than referencing the status tokens — logged under App-drift; the intended backing tokens are `--success`/`--warning`/`--error`/`--accent-soft`.)*
- **Purple / Cyan badges** — introduced in Status Tags; back with `--purple` / `--cyan`.
- **Button chips**: `Chip Active` (accent-tint fill, `--accent-border-active` border) and `Chip Dot 6px` (leading status dot).
- **Module status tags** (Coming Soon / On Roadmap / Live) resolve to the §2.6 tag tokens; Live = dot only (`--success-soft`) + label.

> These addenda document **structure and intended tokens**. Where the app's current implementation deviates (hardcoded colors, Text Muted triggers, etc.) it is recorded in the **App-drift list** delivered with this sync — not baked in here as spec.

---

*Single source of truth. Update this file — never re-introduce a separate token file.*
