# CRS Design System

Authoritative design reference for the Casino Reporting Suite (CRS). Everything here applies to the live Bubble app and all internal demos.

---

## Color Tokens

### Surfaces (dark theme)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#181818` | App background |
| `--surface-1` | `#1E1E1E` | Cards, panels, sidebar |
| `--surface-2` | `#242424` | Hover states, active items, secondary buttons |
| `--surface-3` | `#2A2A2A` | Elevated surfaces, focused inputs |

### Borders

| Token | Hex | Use |
|---|---|---|
| `--border` | `#242424` | Default borders (matches surface-2 for subtle dividers) |
| `--border-hover` | `#333333` | Hover state borders |
| `--border-active` | `#3D3D3D` | Pressed/active borders |

### Accent (blue)

| Token | Hex | Use |
|---|---|---|
| `--accent` | `#3B82F6` | Primary actions, active nav, focus rings |
| `--accent-hover` | `#2563EB` | Hover on primary buttons |
| `--accent-active` | `#1D4ED8` | Pressed state (matches Bubble click state) |
| `--accent-soft` | `#60A5FA` | Lighter accent — counters, secondary highlights |
| `--accent-glow` | `rgba(59,130,246,0.13)` | Focus ring glow |
| `--accent-tint` | `rgba(59,130,246,0.08)` | Subtle accent backgrounds |

### Text

| Token | Hex | Use |
|---|---|---|
| `--text-primary` | `#E0E0E0` | Headings, key info — used sparingly |
| `--text-secondary` | `#A6A6A6` | **Default body text** (CRS uses this as default, not primary) |
| `--text-muted` | `#6B6B6B` | Section labels, supporting text, sidebar icons |
| `--text-disabled` | `#565656` | Disabled state, very muted text |

> **Note:** CRS uses `--text-secondary` (`#A6A6A6`) as default body text — `#E0E0E0` is too bright for everyday content.

### Status

| Token | Hex | Use |
|---|---|---|
| `--success` | `#22C55E` | Success states, "Live" indicator |
| `--success-soft` | `#4ADE80` | Soft success (presence dots, checkmarks) |
| `--error` | `#EF4444` | Error states, flag indicators |
| `--warning` | `#F59E0B` | Warnings |
| `--purple` | `#8B5CF6` | Avatar gradients, special labels |
| `--cyan` | `#06B6D4` | Informational accents |

### Module Status Tags

| Tag | BG | Border | Text |
|---|---|---|---|
| **Coming Soon** | `#1A1025` | `#3D2D6E` | `#C084FC` (purple) |
| **On Roadmap** | `#111827` | `#1F2D45` | `#60A5FA` (blue) |
| **Live** | (none — green dot only) | — | `#4ADE80` |

---

## Typography

**Font:** Inter (primary), JetBrains Mono (numbers, codes, technical)

### Sizes & weights

| Use | Size | Weight |
|---|---|---|
| Page title | 22-28px | 700 |
| Section header (uppercase, letter-spacing 0.1em) | 10.5-11px | 700 |
| Body / nav items | 12-13px | 400-500 |
| Button text | 12-13px | 600-700 |
| Meta / counts | 10-11px | 600 |
| Code / numbers | 11-12px | 500 |

### Letter spacing

- Headings: `-0.03em` (tight)
- Section labels (uppercase): `0.1em` (open)
- Body: default

---

## Sidebar

**Width:** 256px (final, after testing 240px was too tight for long labels like "Request for Investigation")

**Inner padding:** 12px left/right

**Section structure:**
- One Repeating Group **per section**, filtered by `OS - Module Section`
- All sections **collapsed by default**
- Section headers: uppercase, 11px, weight 700, color `--text-muted`
- Subtle dividers between sections: `#2A2A2A` at 75% opacity
- Spacing: 8-12px below last item → divider, 16-20px divider → next section header

**Nav item:**
- Height: 32px
- Padding: 12px left/right
- **Icon:** 16-17px, color `--text-muted` (`#6B6B6B`)
- **Gap between icon and label:** 8px
- **Label:** Inter 12-13px, weight 400, color `--text-secondary`
- Border radius: 6px

**Active state:**
- Background: `--surface-2`
- Text: `--accent`
- Icon: `--accent`
- **No border** (drops border, keeps bg + text color — avoids triple-emphasis)

**Pinned section:**
- Top of sidebar, above first regular section
- Star/pin icon visible on pinned items (filled state)
- Pinned items also remain visible in their original section (not removed)
- Active state goes to **pinned version only** when user is on that page

---

## Module Status System

Three states, tracked on `OS - Module`:

| Status | Behavior | Visual |
|---|---|---|
| `live` | Clickable, navigates to module | No badge |
| `soon` | Clickable, opens Coming Soon page | Purple `SOON` badge |
| `roadmap` | Clickable, opens Coming Soon page | Blue `ROADMAP` badge |

**Coming Soon page pattern:**
- Full viewport in main area (no popup, no modal)
- Ghost watermark behind title: "Soon" (for soon) or "Later" (for roadmap)
- Centered layout: ghost word → title → description → status pill
- No ETA or Notify button (keep clean)

---

## Sections (final, locked)

| Section | Sort | Modules |
|---|---|---|
| Pinned (dynamic, per user) | -10 | User-pinned modules |
| Operations | 20 | 5 (Reporting, Tasks, RFI, Dashboard, Malfunction Log) |
| Surveillance | 30 | 6 (DAL, EOS, Investigation Cases, Alert Center, CCTV Audits, Equipment Inspection) |
| Guests | 40 | 5 |
| HR / Employees | 50 | 9 (incl. Disciplinary Actions, Job Board, Onboarding split) |
| Compliance | 60 | 4 |
| Communication | 70 | 3 |
| Admin / Core | 10 | 9 (incl. Import & Export) |

> **Note:** "Admin / Core" intentionally bottom of sort_order in section list (Bubble RG sorts ascending) — but commonly appears at top of sidebar based on user pref. Sort order is data; visual order can differ.

---

## Module Naming Conventions

- **Industry-standard names** (Daily Activity Log not Shift Log, End of Shift Report not Daily Brief)
- **Avoid redundancy** with section name (no "Surveillance Reporting" — Reporting belongs to Operations anyway)
- **Singular for Data Types** (User, Report, Task — not Users, Reports, Tasks)

---

## Bubble Element Naming

| Kind | Prefix | Example |
|---|---|---|
| Page | `#Name` | `#App`, `#index` |
| Popup | `#PP - Name` | `#PP - Create Report` |
| Reusable Element | `#GR - Name` | `#GR - Coming Soon` |
| Floating Group | `#FG - Name` | `#FG - Report Preview` |
| Group (inline) | (no prefix) | sections inside a page |
| Repeating Group | (no prefix) | lists |

---

## Architecture Decisions (Locked)

1. **Multi-tenant model** — Company + Property tenancy. MVP = 1 property per company; multi-property flip in v2 with zero migration.
2. **Permissions** — Custom Role DT + fixed Permission OS + extras list per user.
3. **GDPR** — Hybrid anonymize/soft-delete/retain pattern.
4. **Tiers** — 5 subscription tiers (Subscription & Tier module = roadmap).
5. **Search** — Hybrid: Native Bubble + Scious Omnisearch + Typesense.
6. **App routing** — Single `App` page (SPA), URL parameter `v` switches module, individual reusables render in main area.
7. **Privacy rule pattern** — Every business DT has `company` + `property` FK. Every privacy rule enforces `Current User's company = This Thing's company` as the first check.
8. **Audit trail** — Single `ActivityLog` DT, polymorphic `subject_type` + `subject_id`, fired async via Schedule API Workflow.
9. **Reusable elements** — Cross-module components use `parent_type` + `parent_id` inputs (File Attachments, Comments Thread, Revision History, Audit Trail, etc.) — one element, many parents.

---

## Iconography

**Library:** Bootstrap Icons (icon_code stored on `OS - Module` for reference; rendering done via conditionals on Bubble Icon element)

**Style:** Outlined throughout (no `-fill` variants in nav)

**Sidebar icon weight:** Default Bootstrap weight, color `--text-muted` to soften

---

## Spacing Rules

- Card/panel padding: 18-24px
- Section vertical rhythm: 24-32px between groups
- Inline elements gap: 6-12px (gap of 8 is the default)
- Filter chips gap: 6-8px
- List item vertical padding: 10-12px (32px total height for sidebar items)

---

## Component States

Every interactive component has these states defined:
- **Default**
- **Hover** (lighter background, no border change)
- **Active/Pressed** (uses `--accent-active` for primary, `--surface-3` for secondary)
- **Focused** (input ring: 3px glow `--accent-glow`)
- **Disabled** (opacity 0.5 or use `--text-disabled` color)
- **Empty state** (centered placeholder + ghost text + CTA)
- **Loading state** (skeleton or spinner — not just blank)
- **Error state** (red border + error message below)

---

## What NOT to Do

- ❌ Don't use `#E0E0E0` as default body text — too bright; use `#A6A6A6`
- ❌ Don't add icons to section headers — text + chevron only
- ❌ Don't combine bg + border + text-color on active items (pick two)
- ❌ Don't strikethrough completed items — looks like they're deleted
- ❌ Don't fragment shared modules per department (Reporting is one module, filtered by department)
- ❌ Don't put filter UI in two places competing for attention
- ❌ Don't use modals/popups for module-level "coming soon" — use full-page treatment
- ❌ Don't fabricate modules outside the locked list of 39

---

## Open Questions / TBD

- [ ] Pinning UX — current MVP keeps original visible + filled pin icon. May revisit if users complain about duplication
- [ ] Per-tier module gating implementation (waits on Subscription & Tier module spec)
- [ ] Permission matrix for Disciplinary Actions, Alert Center, Investigation Cases (need to finalize permission codes)
- [ ] Mobile breakpoint behavior for sidebar (hamburger toggle works, but tablet UX needs more testing)

---

## Files in This Bundle

| Path | Purpose |
|---|---|
| `specs/CRS_Blueprint.html` | Authoritative spec — render-only, all 39 modules |
| `specs/CRS_Blueprint_Source.html` | Source for Blueprint regeneration |
| `specs/Blueprint_Clear_Picture.html` | Per-module progress tracker (tabs: Overview / Features / Components / Database) |
| `design/tokens.css` | All CSS custom properties — drop into any HTML file |
| `design/Styles.txt` | Plain-text token reference |
| `design/CRS_UI_Kit.html` | Component showcase (buttons, inputs, modals, etc.) |
| `design/design.md` | This file |
| `demos/CRS_Canvas.html` | Sidebar + module status demo |
| `demos/CRS_Coming_Soon.html` | Coming Soon page pattern demo |
| `data/CRS_Module_OptionSets.xlsx` | Bubble Option Set data — Status / Section / Module (39 rows) |
| `scripts/build_blueprint.py` | Python pipeline for regenerating Blueprint |
| `scripts/components_data.py` | Component definitions used by build pipeline |
| `scripts/dt_tables.py` | Data Type schemas |
| `scripts/mapping.py` | Module → DT mapping |
| `scripts/v21_content.py` | v21 spec content |
