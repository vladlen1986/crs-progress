# User Management — clickable prototype

**Open:** `prototypes/user-management/user-management.html` (double-click it — one self-contained file, no server, no network).

Built against `crs-brain/data/docs/user-management-spec.html` (v17), `design/design.md`, and the
as-built Bubble types on branch `test`.

---

## What's in it

### Shell
- **Sidebar, 256px** — all **46 modules** in the 7 locked sections + a **Pinned** section at top.
  Sections collapse (collapsed by default, the active one opens), modules are searchable, every
  item can be pinned/unpinned. Active state is **bg + colour only, no border** (design.md §10/§17).
- Status treatment per module: green dot = live, purple `SOON`, blue `ROADMAP`.
- Clicking any non-built module renders the **full-page Coming Soon** treatment (ghost watermark →
  title → description → status pill) — never a modal, per design.md §17.
- **Topbar** — breadcrumb, global search, permission simulator, theme toggle, notifications.
- **Account popover** at the bottom of the sidebar with the theme segmented control (design.md §6).

### User Directory
- **7 KPI tiles**, each click-to-filter: Total / Active / Inactive / Online now / Password due /
  2FA enabled / Never signed in.
- **4 views** behind one toggle: **Table**, **List**, **Cards**, and the full **Detail** page.
- Search, filters (role · department · status · last sign-in), **alphabet rail**, active-filter chips
  with individual and bulk clear, column sorting, **pagination** (10/25/50 per page — 47 users = 2 pages).
- Row selection → **bulk action bar** (send reset · deactivate · export).
- Row click opens the **quick-view drawer**; "View profile" opens the full page.
- Zero-result empty state with a clear-filters CTA.

### User Detail — 4 tabs
| Tab | Contents |
|---|---|
| Overview | Account card (User fields) + Personal details card (Employee fields) + recent activity + Danger zone |
| Permissions | Role grant vs per-user extras, each with its permission code and destructive flag |
| Sessions | Devices, IP, location, last seen, revoke one / revoke all |
| Activity | The polymorphic ActivityLog timeline for this user |

### Profile page (`/profile`)
Identity · Email · Password (live strength meter + requirement checklist) · Two-factor
(QR → verify → 10 backup codes shown once) · Preferences (theme, default view) · Active sessions ·
Danger zone (intentionally empty — no self-service deletion).

### Flows — all wired
Create user (3-step wizard, unlinked-employee picker, validation, **temp password revealed once**) ·
Edit user · Change role (with the three safeguards) · Deactivate (reason + session revocation) ·
Reactivate · **Anonymize** (type-`ANONYMIZE` confirm, actually scrubs the data in-page) ·
Send password reset · Revoke sessions · Per-user extra permissions editor · Change password ·
Change email · Enable/disable 2FA · Bulk actions · Access-denied states · Toasts · `Esc` closes,
`/` focuses search.

### Permission simulator
The purple **"Viewing as"** chip in the topbar switches your acting role. The whole UI re-gates:
buttons disappear or disable, the directory itself becomes an access-denied panel for **Operator**.
This is how the real `Current User's role's permissions contains [X]` checks will behave.

---

## Data

47 users + 3 unlinked employees at **Otium Group → Otium Casino (OTM)**, Batumi.
Field names mirror the real Bubble types so the mapping to Buildprint is 1:1:

- **User** — `employee` · `role` · `property` · `is_active` · `last_login` · `last_password_change` ·
  `must_change_password` · `dark_theme` · `search_tokens` · `user_id` · `username`
- **Employee** — `first_name` · `last_name` · `full_name` · `email` · `phone_number` · `photo` ·
  `department` · `position` · `property` · `company` · `status` · `join_date`
- **Role** — `name` · `is_default` · `is_super_admin` · `permissions` · `property`

Fields that exist in the **spec but not yet in the app** are marked `SPEC` in `parts/04-data.js`:
`two_fa_enabled`, `presence_status`, `is_anonymized`, `extra_permissions`, and `company` on User.

**Avatars** are deterministic inline-SVG portraits generated from each employee's id — distinct faces,
zero network requests, works offline over `file://`.

---

## Editing

Don't edit `user-management.html` directly — it is generated.

```
parts/01-theme-base.css      tokens (dark + Soft Grey light) + base
parts/02-components.css      button, input, table, modal, drawer, toast, avatar, pager…
parts/03-shell-module.css    app shell, sidebar, directory/detail/profile layout, responsive
parts/04-data.js             icons, modules, roles, permissions, people, sessions, activity, avatars
parts/05-body.html           DOM skeleton
parts/06-app.js              sidebar, topbar, router, directory views
parts/07-detail-profile.js   detail page, quick-view drawer, profile page
parts/08-modals-wiring.js    all modals, actions, delegated event wiring
```

Then: `node build.js`

### Two traps that cost real debugging time here
1. **Never delegate on `[data-theme]`.** `<html data-theme>` means `closest('[data-theme]')` matches
   from *any* element — it swallowed every click in the app. The theme buttons use `data-set-theme`.
2. **No `stopPropagation()` on the modal container.** It kills the delegated handler for every button
   inside the modal. The scrim only closes on a direct hit (`e.target.id === 'scrim'`), so it isn't needed.

---

## Known deviations from the live Bubble build

- The live User type is **property-only with no company field**; this prototype shows the Pattern-A
  target (`company` + `property`) and says so explicitly on the Permissions tab.
- Presence, 2FA and per-user extra permissions are **designed, not built**.
- `decisions.md`/`CLAUDE.md` say per-user extras exist; `design/design.md` §12.2 says
  "single permissions list on the Role, no per-user extras". This prototype follows the former
  (2 sources vs 1) — **that contradiction is still open.**
