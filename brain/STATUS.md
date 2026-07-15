# CRS — Build Status  *(product)*

> **Source of truth for "what's done / in-progress / next" in the CRS Bubble product.**
> Design specs live in `design/design.md`; as-built schema/security detail in `brain/database.md` + `brain/security.md`; locked decisions in `decisions.md`. This file = **STATUS only**.
> **This is the CRS *product* tracker. The CRS Brain *tool's* own build log is `PROGRESS.md` — different thing.**
> **Last updated: 2026-07-15** · reconciled from: V6 `progress.md` (2026-06-08) + `um-session-handoff.md` (2026-06-11) + full live-Bubble Buildprint inventory (2026-07-15).

**Status vocab (fixed):** `✅ Done` · `🟡 In progress` · `🔴 Not started` · `⏸ Roadmap (deferred)` · `➖ N/A`

---

## ⟳ Reconciliation note — what changed since the 2026-06-08 board (VERIFY THESE)
The board froze at 2026-06-08; the V7 chats were all *design* work and never updated it. Changes folded in:

1. **User Management — moved 🟡"active, UI pass starting" → UI BUILT + data-wired, security pass pending.** Sources: 2026-06-11 handoff (KPI tiles, 4 views, mobile sheet, theme system, sidebar toggle — screenshot/BP-confirmed) + July real-data wiring & as-built audit (session memory). ⚠️ *Verify against live app:* 22 demo records still present, mobile "Filters" button reported non-functional, live-seed workflow flagged for deletion.
2. **NEW §0.5 "As-built reality check" (2026-07-15 live Bubble).** The board never had app-wide truth: **0/46 live DTs meet Pattern A**, 39 public DTs, `06 Employee` PII exposed to everyone, a candidate no-auth endpoint. This is ground truth from the Bubble clone — highest-confidence section here.
3. **Design System — added.** `crs-design-system.html` exported 2026-07-13; design-system page (`bUfVN0`) built in Bubble (V7 sessions). Was not on the June board.
4. **Foundation scorecard unchanged at 2 of 4 fully closed** (R&P, Casino Settings). UM is now "UI done, security pending"; Fiscal Week still not started.

*Everything below marked ✅ for R&P / Casino Settings is module-scoped and was NEG-proven in June — that is real, and it coexists with the app-wide gaps in §0.5 (the refactor is module-by-module; 44 modules' DTs are still untouched).*

---

## 0. NOW / NEXT / BLOCKED  ← read this daily

**Now (active / most-recently-touched):**
- ✅ **Roles & Permissions — COMPLETE & end-to-end verified** (2026-06-07). Security hardened, three-tier model (super-admin flag, sensitive perms, server-side rejection), light mode, mobile, documented. Module-scoped — see §3.
- ✅ **Casino Settings — DONE & NEG-PROVEN** (2026-06-08, 2nd of 4). Company/Property tenant-scoped, tenant-check-first + super-admin override; 3 writes via private server-guarded backend WFs; Remove-Logo hole closed; `casino_settings___edit` retired; Data API not exposed; [NEG] second-tenant + property-admin runtime pass. Save point 1780872311152. See §3.
- 🟡 **User Management — UI BUILT, data wired, SECURITY PASS PENDING.** UI confirmed (2026-06-11): 7 KPI tiles w/ click-to-filter, 4 views (list/card/detail/table) behind one toggle, mobile filter sheet + overview collapse, theme system (`theme_is_dark`, ~280 conditionals), shell sidebar + RE Nav Toggle. July: real-data wiring pass (replace `ZZ_UI_DemoUser` demo → real User DT; sort via `search_tokens`; page-visibility gate on `users___view`). **Still owed:** Pass-2 security (NEG: self-escalation, cross-tenant enumeration, reset/deactivate guards), purge 22 demo records, fix mobile Filters button, delete live-seed workflow. See §3.
- 🎨 **Design System page — BUILT** (2026-07-13). `crs-design-system.html` is the canonical export (dark + light, tokens per `design.md`); Bubble design-system page `bUfVN0` built to match. Approval gate: only styles shown on that page are approved.
- 🔑 **TEST ACCOUNTS — KEEP UNTIL CUTOVER:** low-perm, property-admin, second-tenant, owner. Reused by every module's NEG pass.

**Next (queued, ordered):**
1. **User Management Pass-2 (security)** — privacy rules + server-guarded CRUD + NEG proof. Enforce User `is_active` (app-load logout) — unlike Casino Settings' deferred cosmetic flag.
2. **Pattern A rollout packet** (from `brain/security.md`) — highest-risk first: candidate no-auth endpoint `add_user_to_read_by_all_reports_copy` → `06 Employee` PII → 24 no-rules DTs → 15 public-everyone DTs. *(This is the app-wide security debt in §0.5.)*
3. **Fiscal Week Management** — begin refactor (3rd of 4).
4. Permission-model migration tail: convert 8 user-based gates → role-based, retire legacy User Permissions editor, delete user `permissions_list` field.
5. Audit logging — app-wide ActivityLog (currently Roles-only).
6. Deferred sweep (after modules built): `is_active` enforcement app-wide + audit logging.

**Foundation refactor scorecard:** ✅ Roles & Permissions · ✅ Casino Settings · 🟡 User Management (UI done, security pending) · 🔴 Fiscal Week. **2 of 4 fully closed.**

**Blocked:**
- Light mode app-wide → blocked on **inline-color cleanup** (~30% of elements not on named Styles).
- Delete user `permissions_list` field → blocked on migration tail (#4); deleting early breaks 8 gates on PP-Report + app page.

---

## 0.5 ⚠️ As-built reality check — live Bubble test branch (2026-07-15)
> Ground truth from a read-only Buildprint sweep (snapshot `a297cb2b`). Detail: `brain/database.md`, `brain/security.md`. **This is the gap between the polished module work above and the whole app.**

- **110 data-type folders → 46 LIVE + 64 soft-deleted carcasses.**
- **0 of 46 live DTs meet Pattern A** (the locked `company AND property` rule). Not one privacy rule conditions on both; only 2 condition on company at all.
- **Privacy tally (46 live):** NO RULES ×24 · public-everyone ×15 · company-only ×2 · property-only ×4 · logged-in-only ×1.
- 🔴 **`06 Employee` = public-everyone with PII** (passport, national ID, DOB, phone) **+ auto-binding for everyone.** Top fix.
- 🔴 **`11 Report` (13K records)** = any authenticated user of any tenant can search/view all + autobind 73 fields.
- 🔴 **`29_1 Subtask`** = public-everyone **+ create/modify/delete via API** for any logged-in user (`exposed_api: true`).
- 🔴 **Candidate public no-auth endpoint** `add_user_to_read_by_all_reports_copy` (`auth_unecessary` + `ignore_privacy_rules`, likely exposed). Verify/disable in editor.
- 🔴 **5 public file uploaders** (logos/photos stored at shareable public URLs); missing server-side redirect on `app` page (renders before logout redirect).
- App-level: `exposes_wf_api` + `exposes_get_api` ON, `twofa_auth: false`, `have_pw_policy: false`.

*Reconciliation: these 39 public DTs = `buildprint audit`'s 39 findings exactly. R&P + Casino Settings DTs are the hardened exceptions; everything else is pre-refactor legacy.*

---

## 1. Current Milestone
**Goal:** foundation refactor — rebuild 4 foundation modules in-place on Test branch, single end-of-cycle cutover to Live.
**Modules:** Roles & Permissions · Casino Settings · User Management · Fiscal Week Management.
**Status:** 🟡 In progress — **R&P ✅ + Casino Settings ✅ done & NEG-proven (2 of 4)**; **User Management UI done, security pass pending**; Fiscal Week not started.
**Definition of done (all four):** Core-7 ✅ each · tenant-isolation privacy rules (`company =` AND `property =`) on every DT touched · server-side WF guards on destructive/admin actions · role creation + access gate verified · single clean dev→live cutover.

---

## 2. Module Status — all 46 (Core-7 view)
Core-7: **UI · UX · DB · Perms · Privacy(tenant) · WF-CRUD · Theme**. Active modules expanded in §3.
> **App-wide caveat (2026-07-15):** Privacy column reflects *intended* module work. Per §0.5, **no live DT yet enforces Pattern A** — treat every ✅/🟡 in Privacy as "designed, not yet app-verified" except R&P + Casino Settings (NEG-proven).

### Admin / Core (9)
| Module | UI | UX | DB | Perms | Privacy | WF-CRUD | Theme | Notes |
|---|---|---|---|---|---|---|---|---|
| Casino Settings | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | DONE + NEG-proven; theme/mobile polish (Pass 3) left |
| User Management | ✅ | ✅ | ✅ | 🟡 | 🔴 | 🟡 | ✅ | UI done (Jun 11) + data-wired (Jul); **security Pass-2 pending**; 22 demo records to purge — full detail §3 |
| Roles & Permissions | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | COMPLETE — full detail §3 |
| Fiscal Week Management | 🔴 | 🔴 | 🟡 | 🔴 | 🔴 | 🔴 | 🔴 | Fiscal Week DT exists; full detail §3 |
| Import & Export | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | ⏸ |
| Subscription & Tier | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | ⏸ roadmap |
| System Activity Log | 🔴 | 🔴 | 🟡 | 🔴 | 🔴 | 🔴 | 🔴 | ActivityLog DT pattern locked |
| Notifications | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | ⏸ (Notification DT exists, no rules) |
| Support Center | 🔴 | 🔴 | ➖ | 🔴 | ➖ | 🔴 | 🔴 | ⏸ |

### Operations (5)
| Module | UI | UX | DB | Perms | Privacy | WF-CRUD | Theme | Notes |
|---|---|---|---|---|---|---|---|---|
| Reporting | 🟡 | 🟡 | ✅ | 🟡 | 🔴 | 🟡 | 🔴 | live in legacy app (13K records); **cross-tenant readable — see §0.5**; 47 perms |
| Tasks | 🔴 | 🔴 | ✅ | 🟡 | 🔴 | 🔴 | 🔴 | Task/Subtask DTs live but public + API-exposed (§0.5) |
| RFI (Request for Investigation) | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | prototype only (`rfi.html`, RFI-2026-0042) |
| Dashboard | 🔴 | 🔴 | ➖ | 🔴 | 🔴 | 🔴 | 🔴 | ⏸ |
| Malfunction Log | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | ⏸ |

### Surveillance (6) · Guests (5) · HR/Employees (9) · Compliance (4) · Communication (3)
*(unchanged from 2026-06-08 — all 🔴/⏸ except: Employees DB 🟡 live but PII-public §0.5. Full tables retained; collapse here for brevity — expand a module into §3 when it goes active.)*

---

## 3. Active-Build Modules — full 18 dimensions
**Dimensions:** 1 UI · 2 UX · 3 Database · 4 Option Sets · 5 Search tokens+indexes · 6 Perms · 7 Privacy: tenant · 8 Privacy: permission · 9 Conditionals · 10 WF permission guards · 11 Workflows CRUD · 12 Backend/API WF · 13 Form validation · 14 Audit logging · 15 Empty/Loading/Error · 16 Theme · 17 Responsive · 18 Tested

### Roles & Permissions  ✅ COMPLETE (verified 2026-06-07)
All 18 ✅. Three-tier model working (super-admin flag = 1 role = owner; property-admin; sensitive perms server-rejected on craft-save). Tenant isolation verified via Data API 404 probe. Audit logging Roles-only (extend app-wide later). Runtime-verified as property-admin login. *(Full dimension table in the 2026-06-08 source; unchanged.)*

### Casino Settings  ✅ DONE + NEG-PROVEN (2026-06-08)
UI/UX/DB/Perms/Privacy(tenant)/Privacy(perm)/WF-guards/Backend-WF = ✅. Company company-scoped + Property property-scoped, check-first + super-admin override; 3 writes via private guarded WFs; `clear_company_logo` closes Remove-Logo hole. Left: Conditionals 🟡, Form-validation 🟡, Theme 🟡 (paired-style pass), Responsive 🔴, Audit 🔴 (deferred), Tested 🔴 UI (NEG ✅). *(Full table in source; unchanged.)*

### User Management  🟡 UI DONE / SECURITY PENDING (updated 2026-07-15)
| # | Dimension | Status | Notes |
|---|---|---|---|
| 1 | Page UI | ✅ | 7 KPI tiles (click-to-filter), 4 views (list/card/detail/table) one toggle, profile header, alphabet rail, filter chips (Jun 11 confirmed) |
| 2 | Page UX | ✅ | click = quick-view drawer, "View Profile" = full page; mobile filter sheet + overview collapse |
| 3 | Database | ✅ | User: role (single) + property (direct); real User DT wired (Jul, replaced `ZZ_UI_DemoUser`) |
| 4 | Option Sets | ➖ | |
| 5 | Search tokens + indexes | 🟡 | `search_tokens` field for sort/filter (Bubble can't server-sort across traversals) |
| 6 | Perms defined | 🟡 | `users___view` page-visibility gate wired |
| 7 | Privacy: tenant isolation | 🔴 | **not built — see §0.5; User DT is property-only, no company** |
| 8 | Privacy: permission-based | 🔴 | Pass-2 |
| 9 | Conditionals (UI) | ✅ | theme (`theme_is_dark`), view toggles, filter states |
| 10 | WF permission guards | 🔴 | Pass-2 (create/reset/deactivate must be server-guarded) |
| 11 | Workflows CRUD | 🟡 | UI-state + read searches done; create-with-temp-password / deactivate = Pass-2 |
| 12 | Backend/API WF | 🔴 | Pass-2 |
| 13 | Form validation | 🟡 | |
| 14 | Audit logging | 🔴 | |
| 15 | Empty/Loading/Error | 🟡 | loading animations built |
| 16 | Theme-aware | ✅ | dark + light, ~280 conditionals; restore dark after light checks |
| 17 | Responsive | ✅ | desktop 1440 + mobile 390; breakpoints 760/960 |
| 18 | Tested | 🔴 | UI verified in run mode; security NEG not started |

*⚠️ Flags to verify in live app: 22 demo records present · mobile "Filters" button non-functional · live-seed workflow to delete · `is_active` MUST enforce app-load logout.*

### Fiscal Week Management  🔴 NOT STARTED
DB 🟡 only (Fiscal Week DT + Close/Edit perms exist). All else 🔴. 3rd of 4.

---

## 4. Open Decisions (awaiting a call — then move to decisions.md)
- [ ] Permission matrix vs checklist for view-only gates — one matrix for pilot, or split?
- [ ] `action_type` attribute on OS-Permission — add + backfill now, or defer?
- [ ] Matrix resource row — derive from permission name vs add `resource` attribute?
- [ ] Status toggle — confirm-on-disable for which toggles app-wide?
- [ ] **NEW:** Pattern A rollout order & batching — module-by-module vs one big privacy-rule sweep? (blocks §0.5 remediation)
- [ ] **NEW:** `01 Company` company-only + `01.1 Property` property-only — confirm as decisions.md Pattern-A exceptions (they ARE the tenant tables).

---

## 5. Known Gaps / Tech Debt
**App-wide security debt (2026-07-15 — full tracker in `brain/security.md`):**
- 39 public data types (24 no-rules + 15 public-everyone); `06 Employee` PII public; `11 Report` cross-tenant; `29_1 Subtask` API-CRUD public; candidate no-auth endpoint; 5 public uploaders; missing server-side redirect.
**Module-level (from 2026-06-08, still open):**
- 4 empty-permission roles (CCTV Operator/Supervisor/Asst. Manager/Manager) → anyone assigned hits Access-Restricted. Confirm unassigned or fill when UM lands.
- 16 permissions with no module (invisible in grouped UI).
- ~30% inline colors block app-wide light mode.
- `01_1_propery` misspelled internal Property DT slug.
- Cleanup: "Me" test role (60 perms), empty placeholder roles, legacy deleted fields, orphan WF `bVFtB0`, duplicate hidden Tab 7.
- Reusable prefix drift: `RE_Name` / `RE - Name` → standardize to `# Name`.

---

## 6. Reusable Components
| Component | Status | Notes |
|---|---|---|
| Design System page (`bUfVN0`) | ✅ | canonical `crs-design-system.html` (Jul 13); approval gate for all styles |
| User menu (bUXME / bUFck) | ✅ themed | sectioned, role badge, theme toggle |
| User card (bUCur) | ✅ | sidebar-bottom trigger |
| Theme toggle (segmented) | ✅ | |
| RE Nav Toggle (hamburger) | ✅ | shell-level, mirror-counter pattern |
| # Toggle - Status | 🟡 | segmented, confirm-on-disable |
| # People Filter (two-pane) | 🟡 | photos + status dots |
| # Dropdown - Single / Multi | 🟡 | searchable, `search_tokens` (V7 galleries built) |
| Sidebar reusable | ✅ | theme-aware, mobile overlay + scrim |

---

## 7. Changelog (terse, newest first)
- **2026-07-15** — Full read-only Buildprint inventory of Test branch ingested into `brain/` (110 DTs → 46 live/64 deleted, 98 OS, 29 backend WFs, 343 page WFs, privacy tracker, security audit). Revealed 0/46 Pattern A + 39 public DTs (§0.5). This STATUS file reconciled + renamed from the June board.
- **2026-07-13** — Design System page exported/built (`crs-design-system.html`, `bUfVN0`); July UI sprint galleries (dropdowns, chips, loaders, date pickers, login, badges, alphabet rail).
- **~2026-06-11 → July** — User Management: UI build confirmed (KPI tiles, 4 views, mobile sheet, theme, sidebar toggle); real-data wiring pass (demo → real User DT, search_tokens sort, view gate); as-built audit flagged 22 demo records + mobile Filters gap.
- **2026-06-08** — Casino Settings CLOSED (done & NEG-proven). 2 of 4 foundation modules closed.
- **2026-06-07** — Roles & Permissions COMPLETE & verified (three-tier security, mobile, dark+light).
- **2026-06-05** — `design.md` finalized. **2026-06-04..02** — user menu/theme toggle/sidebar/permission-matrix prototypes.

---

## 8. Milestone History (shipped)
- *(none shipped to Live yet — first cutover = end-of-cycle foundation refactor. Legacy single-property app runs at `crsapp.live/version-test`.)*

---
*Status only. Design specs → `design/design.md`. As-built detail → `brain/`. Update §0 every session; date-stamp the top. Product tracker — not the Brain-tool `PROGRESS.md`.*
