# CRS — Casino Reporting Suite

Multi-tenant SaaS for casino surveillance, operations, HR, and compliance. Built on Bubble.io.

---

## What's in this bundle

```
crs/
├── README.md                          ← you are here
│
├── specs/                             AUTHORITATIVE SPECS
│   ├── CRS_Blueprint.html             Full spec — 39 modules, 10 complete
│   ├── CRS_Blueprint_Source.html      Editable source (regenerated via scripts/)
│   └── Blueprint_Clear_Picture.html   Per-module progress tracker (tabs)
│
├── design/                            DESIGN SYSTEM
│   ├── design.md                      Design rules, naming conventions, decisions
│   ├── tokens.css                     CSS custom properties — drop into any HTML
│   ├── Styles.txt                     Plain-text token reference
│   └── CRS_UI_Kit.html                Component showcase
│
├── demos/                             VISUAL DEMOS
│   ├── CRS_Canvas.html                Sidebar + module status pattern
│   └── CRS_Coming_Soon.html           Coming Soon page pattern
│
├── data/                              BUBBLE DATA
│   └── CRS_Module_OptionSets.xlsx     OS - Module (39), OS - Module Section (7), OS - Module Status (3)
│
└── scripts/                           BUILD PIPELINE
    ├── build_blueprint.py             Regenerates CRS_Blueprint.html
    ├── components_data.py             Component definitions
    ├── dt_tables.py                   Data Type schemas
    ├── mapping.py                     Module → DT mapping
    └── v21_content.py                 Spec content
```

---

## Module count

**39 modules across 7 sections.**

| Section | Total | Complete | Pending |
|---|---:|---:|---:|
| Admin / Core | 9 | 5 | 4 |
| Operations | 5 | 3 | 2 |
| Surveillance | 6 | 0 | 6 |
| Guests | 5 | 0 | 5 |
| HR / Employees | 9 | 2 | 7 |
| Compliance | 4 | 0 | 4 |
| Communication | 3 | 0 | 3 |

Status breakdown:
- **Live (10):** Reporting, Task Manager, Request for Investigation, Casino Settings, User Management, Roles & Permissions, Notifications, System Activity Log, Employee Management, Onboarding (was Onboarding + Job Board, now split)
- **Coming Soon (~7):** Daily Activity Log, End of Shift Report, CCTV Audits, Equipment Inspection Log, Malfunction Log, Dashboard, Subscription & Tier, Fiscal Week Management, Info Board, Guest Management
- **Roadmap (~22):** Everything else

---

## Architecture quick facts

- **Multi-tenant:** Company + Property tenancy. MVP = 1 property per company.
- **Routing:** Single `App` page (SPA), URL parameter `v` selects module.
- **Permissions:** Custom Role DT + fixed Permission Option Set + per-user extras.
- **Audit:** Single `ActivityLog` DT, polymorphic `subject_type`/`subject_id`, async via Schedule API Workflow.
- **GDPR:** Hybrid anonymize/soft-delete/retain.
- **Search:** Hybrid (Native Bubble + Scious Omnisearch + Typesense).
- **Tiers:** 5 subscription tiers (Subscription & Tier module on roadmap).

---

## Getting started

### Read the specs

1. **`specs/CRS_Blueprint.html`** — Open in browser. Full spec for all 39 modules with descriptions, data types, components, privacy rules, workflows.
2. **`design/design.md`** — All design rules, naming conventions, locked decisions.

### Set up Bubble Option Sets

Use **`data/CRS_Module_OptionSets.xlsx`** to populate three Option Sets in Bubble:

1. **`OS - Module Status`** (3 values) — sheet 1
2. **`OS - Module Section`** (7 values) — sheet 2
3. **`OS - Module`** (39 values) — sheet 3

Each `OS - Module` row has: label, icon_code (Bootstrap Icons), section, status, sort_order, page_route, description.

### Use design tokens in Bubble

Copy `design/tokens.css` color hex values into Bubble's color palette:

- Primary BG: `#181818`
- Surface 1: `#1E1E1E`
- Accent: `#3B82F6`
- Text Primary: `#E0E0E0`
- Text Secondary (default body): `#A6A6A6`

Full list in `design/Styles.txt` and `design/tokens.css`.

---

## Module Status System

Each module has a `status` attribute:

- **`live`** — Built and shipping
- **`soon`** — In active development
- **`roadmap`** — Planned, not started

When user clicks a non-live module, the App page renders `#GR - Coming Soon` (reusable element) in the main area, passing the module's label, description, and status as inputs.

See `demos/CRS_Coming_Soon.html` for the visual pattern.

---

## Sidebar Pattern

- Width: **256px**
- Sections collapsed by default
- One Repeating Group per section, filtered by `section`
- Active item: background change + text/icon color change (no border)
- Pinned section at top, populated from `Current User`'s pinned modules
- Pinned items remain visible in their original section with filled pin icon

See `demos/CRS_Canvas.html` for the working pattern.

---

## Regenerating the Blueprint

If you change `scripts/v21_content.py` or `scripts/components_data.py`:

```bash
cd scripts
python build_blueprint.py
```

Output goes to `specs/CRS_Blueprint.html`.

---

## Naming conventions

### Bubble elements

| Kind | Prefix |
|---|---|
| Page | `#Name` (e.g., `#App`) |
| Popup | `#PP - Name` |
| Reusable Element | `#GR - Name` |
| Floating Group | `#FG - Name` |

### Database

- **Singular:** Data Type names (`User`, `Report`, `Task`)
- **Snake_case:** field names (`first_name`, `created_at`, `gaming_date`)
- **`OS -` prefix:** Option Sets (`OS - Module`, `OS - Permission`)

---

## License

Proprietary — internal use only. Do not distribute.
