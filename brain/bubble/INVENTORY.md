# Bubble.io Manual — Full Inventory (Phase 1)

- Source: https://manual.bubble.io/ (GitBook)
- Inventoried: 2026-07-14
- **Total pages: 583**
- Total content size: ~5.7 MB of markdown (verbatim, via llms-full.txt)

## Bulk-export methods — what works

All four GitBook shortcuts work. **Phase 2 requires only 6 HTTP requests, no crawling and no browser.**

| Method | Status | Details |
|---|---|---|
| `https://manual.bubble.io/llms.txt` | WORKS | 85 KB. Complete nav: all 583 page titles + `.md` URLs in sidebar order. |
| `https://manual.bubble.io/llms-full.txt` | WORKS (paginated) | Full verbatim markdown of the entire manual. 6 chunks: base file + `/llms-full.txt/1` … `/llms-full.txt/5` (each ends with a `[Next Page](/llms-full.txt/N)` marker; page 5 is last). Sizes: 858+898+966+922+1267+938 KB = ~5.7 MB. Contains exactly 583 `# `-level page headers, **in 1:1 order match with llms.txt** (verified title-by-title, 0 mismatches) — so every content block maps deterministically to its URL. |
| `.md` suffix per page | WORKS | e.g. `https://manual.bubble.io/core-resources/api.md` returns raw markdown (200). Useful as per-page fallback/re-fetch. Nonexistent paths return a helpful 404 with suggestions. |
| `https://manual.bubble.io/sitemap-pages.xml` | WORKS | 583 `<loc>` entries (same set). `sitemap.xml` is a 207-byte index pointing to it. |

Notes on content format: llms-full markdown includes GitBook artifacts — `{% hint %}…{% endhint %}` blocks, `<figure><img src="/files/…">` tags (relative image URLs; images NOT included), and internal links as site-relative paths. Text content is complete and verbatim.

## Recommended capture plan (Phase 2)

**Do NOT crawl page-by-page.** The cheapest reliable capture:

1. Download 6 files: `llms-full.txt` + `llms-full.txt/1` … `/5` (~5.7 MB total).
2. Concatenate (strip the trailing `--- [Next Page]` marker from each chunk), split on `^# ` headers → 583 blocks.
3. Zip blocks with the 583 URLs from `llms.txt` (order-verified 1:1) to name/route each page.
4. Write out per the batch plan below. Use per-page `.md` URLs only to spot-check or re-fetch anything that looks truncated.

Because the raw content arrives essentially for free, the batches below are for **processing/organizing agents** (splitting, consolidating, distilling into brain files), not for fetching. 5 batches, balanced by content size (~0.9–1.5 MB each):

### Batch 1 — Data, Logic, Workflow & API reference (130 pages, ~1.24 MB) — FULL VERBATIM
The core of app-building. Keep one file per page (or per tight subsection), verbatim.
- `help-guides/data` (53) — data types, fields, option sets, privacy rules, database structuring, search
- `help-guides/logic` (20) — workflows, backend/API workflows, conditions, expressions
- `core-resources/data` (5) — data sources, operators & comparisons, search
- `core-resources/bubble-workflows` (26) + `core-resources/events` (7) + `core-resources/actions` (8) + `core-resources/workflows` (1) — workflow/event/action reference
- `core-resources/api` (10) — Data API, Workflow API, API Connector reference, authentication

### Batch 2 — Integrations, Security, Performance (101 pages, ~0.94 MB) — FULL VERBATIM
- `help-guides/integrations` (45) — API Connector guides, external APIs, webhooks, plugins-as-clients
- `help-guides/security` (21) — privacy rules in practice, client/server security, access control
- `help-guides/workload` (22) — workload units, measuring/optimizing consumption
- `help-guides/optimizing-an-application` (13) — performance, capacity

### Batch 3 — Visual element reference (80 pages, ~1.50 MB) — CONSOLIDATE
- `core-resources/bubble-elements` (80) — one reference page per visual element (buttons, inputs, repeating groups, popups, etc.). Consolidate into grouped files by element category (containers, inputs, visual, native-mobile). Keep repeating group, group, popup, and input-family pages closer to verbatim; compress niche elements (map, video, audio, chart-adjacent).

### Batch 4 — Getting started, Design, Publishing, Maintenance, AI (140 pages, ~1.13 MB) — MOSTLY CONSOLIDATE
- `help-guides/getting-started` (60) — editor navigation, mobile quick start, first-app guides. Consolidate heavily (much is onboarding prose); keep editor-tabs and settings-tab pages more complete.
- `help-guides/design` (37) — responsive engine, styles, custom fonts. Keep responsive-layout pages near-verbatim; consolidate the rest.
- `help-guides/previewing-your-app` (3), `help-guides/publishing-your-app` (7)
- `help-guides/maintaining-an-application` (26) — version control, collaboration, logs. Keep version-control pages complete.
- `help-guides/ai` (7)

### Batch 5 — Plugins, Interface reference, Enterprise, Account, Misc (132 pages, ~0.89 MB) — CONSOLIDATE
- `core-resources/elements` (18) — general element mechanics (states, conditionals) — keep custom states & conditional pages near-verbatim
- `core-resources/bubble-made-plugins` (41) — per-plugin reference (Stripe, Google, etc.); group into one file per plugin family; keep Stripe/API-heavy plugins fuller
- `core-resources/bubbles-interface` (13), `core-resources/application-settings` (10), `core-resources/styles` (1), `core-resources/on-device-resources` (1), `core-resources/using-the-core-reference` (1)
- `help-guides/bubble-for-enterprise` (16)
- `account-and-marketplace/*` (24) — plugin/template building, billing, policies
- Top-level pages (5): Introduction, New? Start Here, What is Bubble?, The Glossary (keep Glossary verbatim — 37 KB of terminology), Vulnerability Disclosure Policy
- `beta-features/*` (2)

### Verbatim-priority summary (for a Bubble app builder)
FULL: data types & database, option sets, privacy rules, workflows & backend/API workflows, events/actions reference, Data & Workflow API, API Connector, security, workload/performance, custom states/conditionals, glossary.
CONSOLIDATE: individual visual-element pages, per-plugin pages, onboarding/getting-started prose, design galleries, account/marketplace/policy pages.

## Section overview (pages / approx. content size)

| Section | Pages | Size |
|---|---|---|
| help-guides/getting-started | 60 | 547 KB |
| help-guides/data | 53 | 467 KB |
| help-guides/integrations | 45 | 484 KB |
| help-guides/design | 37 | 233 KB |
| help-guides/maintaining-an-application | 26 | 212 KB |
| help-guides/workload | 22 | 183 KB |
| help-guides/security | 21 | 200 KB |
| help-guides/logic | 20 | 179 KB |
| help-guides/bubble-for-enterprise | 16 | 58 KB |
| help-guides/optimizing-an-application | 13 | 73 KB |
| help-guides/publishing-your-app | 7 | 88 KB |
| help-guides/ai | 7 | 45 KB |
| help-guides/previewing-your-app | 3 | 7 KB |
| core-resources/bubble-elements | 80 | 1500 KB |
| core-resources/bubble-made-plugins | 41 | 219 KB |
| core-resources/bubble-workflows | 26 | 214 KB |
| core-resources/elements | 18 | 213 KB |
| core-resources/bubbles-interface | 13 | 113 KB |
| core-resources/application-settings | 10 | 55 KB |
| core-resources/api | 10 | 93 KB |
| core-resources/actions | 8 | 108 KB |
| core-resources/events | 7 | 57 KB |
| core-resources/data | 5 | 115 KB |
| core-resources (misc: workflows, styles, on-device, using-core-ref) | 4 | 15 KB |
| account-and-marketplace (all) | 24 | 159 KB |
| beta-features | 2 | <1 KB |
| top-level pages | 5 | 64 KB |
| **TOTAL** | **583** | **~5.7 MB** |

## Full page tree

Every page, in sidebar order. URL = `https://manual.bubble.io` + path (append `.md` for raw markdown).

### Top-level pages (5)

- Introduction — /master
- New? Start Here — /new-start-here
- What is Bubble? — /what-is-bubble
- The Glossary — /the-glossary
- Vulnerability Disclosure Policy — /vulnerability-disclosure-policy

### help-guides (330 pages)

#### help-guides/getting-started (60)
- Getting started — /help-guides/getting-started
- Building for... — /help-guides/getting-started/building-for
- Web — /help-guides/getting-started/building-for/web
- Native iOS and Android — /help-guides/getting-started/building-for/native-ios-and-android
- Mobile app quick start guide — /help-guides/getting-started/building-for/native-ios-and-android/mobile-app-quick-start-guide
- What is a native mobile app? — /help-guides/getting-started/building-for/native-ios-and-android/what-is-a-native-mobile-app
- Native mobile vs. web development — /help-guides/getting-started/building-for/native-ios-and-android/native-mobile-vs.-web-development
- Differences in native and web elements — /help-guides/getting-started/building-for/native-ios-and-android/differences-in-native-and-web-elements
- Payments in mobile apps — /help-guides/getting-started/building-for/native-ios-and-android/payments-in-mobile-apps
- In-app purchases — /help-guides/getting-started/building-for/native-ios-and-android/in-app-purchases
- IAP on Apple devices — /help-guides/getting-started/building-for/native-ios-and-android/in-app-purchases/iap-on-apple-devices
- IAP on Android devices — /help-guides/getting-started/building-for/native-ios-and-android/in-app-purchases/iap-on-android-devices
- Setting up subscriptions — /help-guides/getting-started/building-for/native-ios-and-android/in-app-purchases/setting-up-subscriptions
- Getting ready for Production — /help-guides/getting-started/building-for/native-ios-and-android/in-app-purchases/getting-ready-for-production
- Apple IAP checklist — /help-guides/getting-started/building-for/native-ios-and-android/in-app-purchases/getting-ready-for-production/apple-iap-checklist
- Android IAP checklist — /help-guides/getting-started/building-for/native-ios-and-android/in-app-purchases/getting-ready-for-production/android-iap-checklist
- Workflow and language — /help-guides/getting-started/building-for/native-ios-and-android/in-app-purchases/workflow-and-language-updates
- Native mobile app terminology — /help-guides/getting-started/building-for/native-ios-and-android/native-mobile-app-terminology
- Building your first app — /help-guides/getting-started/building-your-first-app
- Planning features — /help-guides/getting-started/building-your-first-app/planning-features
- Database structure — /help-guides/getting-started/building-your-first-app/database-structure
- Design and UX — /help-guides/getting-started/building-your-first-app/design-and-ux
- eCommerce and payments — /help-guides/getting-started/building-your-first-app/ecommerce-and-payments
- Shopping cart — /help-guides/getting-started/building-your-first-app/ecommerce-and-payments/shopping-cart
- Checkout page — /help-guides/getting-started/building-your-first-app/ecommerce-and-payments/checkout-page
- One-time payments — /help-guides/getting-started/building-your-first-app/ecommerce-and-payments/one-time-payments
- Subscriptions — /help-guides/getting-started/building-your-first-app/ecommerce-and-payments/subscriptions
- Marketplace — /help-guides/getting-started/building-your-first-app/ecommerce-and-payments/marketplace
- Creating and managing projects — /help-guides/getting-started/creating-and-managing-projects
- The Bubble editor — /help-guides/getting-started/navigating-the-bubble-editor
- Tabs and sections — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections
- Property Editor Beta — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/property-editor-beta
- Quick start guide (For new users) — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/property-editor-beta/quick-start-guide-for-new-users
- Overview of the property editor beta — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/property-editor-beta/property-editor
- Navigating the Redesigned Property Editor — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/property-editor-beta/property-editor-migration-guide-for-existing-users
- Design tab — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab
- The element tree — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-element-tree
- The property editor — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-property-editor
- Workflow tab — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/workflow-tab
- Data tab — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/data-tab
- Global tab — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/styles-tab
- Global expressions — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/styles-tab/global-expressions
- Plugins tab — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/plugins-tab
- Settings tab — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab
- Overview — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/overview
- Web app — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/web-app
- Custom domain and DNS — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/web-app/custom-domain-and-dns
- Native mobile — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/native-mobile
- Logs tab — /help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/logs-tab
- Tools — /help-guides/getting-started/navigating-the-bubble-editor/tools
- Key features — /help-guides/getting-started/navigating-the-bubble-editor/tools/key-features
- The search tool — /help-guides/getting-started/navigating-the-bubble-editor/tools/the-search-tool
- The Issue Checker — /help-guides/getting-started/navigating-the-bubble-editor/tools/the-issue-tracker
- The debugger — /help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger
- Notes — /help-guides/getting-started/navigating-the-bubble-editor/tools/notes
- Previewing your app — /help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app
- Transitioning to Bubble from... — /help-guides/getting-started/transitioning-to-bubble-from
- JavaScript — /help-guides/getting-started/transitioning-to-bubble-from/javascript
- HTML and CSS — /help-guides/getting-started/transitioning-to-bubble-from/html-and-css
- SQL — /help-guides/getting-started/transitioning-to-bubble-from/sql

#### help-guides/design (37)
- Design — /help-guides/design
- Elements — /help-guides/design/elements
- Web app — /help-guides/design/elements/web-app
- The page — /help-guides/design/elements/web-app/the-page
- Containers — /help-guides/design/elements/web-app/containers
- Groups — /help-guides/design/elements/web-app/containers/groups
- Repeating groups — /help-guides/design/elements/web-app/containers/repeating-groups
- Table elements — /help-guides/design/elements/web-app/containers/table-elements
- Popups — /help-guides/design/elements/web-app/containers/popups
- Floating groups — /help-guides/design/elements/web-app/containers/floating-groups
- Group focus — /help-guides/design/elements/web-app/containers/group-focus
- Visual elements — /help-guides/design/elements/web-app/visual-elements
- Input forms — /help-guides/design/elements/web-app/input-forms
- Text and numbers — /help-guides/design/elements/web-app/input-forms/text-and-numbers
- Dates and time — /help-guides/design/elements/web-app/input-forms/dates-and-time
- File uploads — /help-guides/design/elements/web-app/input-forms/file-uploads
- Selection controls — /help-guides/design/elements/web-app/input-forms/selection-controls
- iOS and Android app — /help-guides/design/elements/ios-and-android-app
- The view — /help-guides/design/elements/ios-and-android-app/the-view
- Containers — /help-guides/design/elements/ios-and-android-app/containers
- Visual elements — /help-guides/design/elements/ios-and-android-app/visual-native-app-elements
- Input forms — /help-guides/design/elements/ios-and-android-app/input-forms
- Mobile reusable elements — /help-guides/design/elements/ios-and-android-app/mobile-reusable-elements
- The element hierarchy — /help-guides/design/elements/the-element-hierarchy
- Reusable Elements — /help-guides/design/elements/reusable-elements
- Variables and styles — /help-guides/design/variables-and-styles
- Color variables — /help-guides/design/variables-and-styles/color-variables
- Font variables — /help-guides/design/variables-and-styles/font-variables
- Styles — /help-guides/design/variables-and-styles/styles
- Custom fonts — /help-guides/design/variables-and-styles/using-custom-fonts
- Responsive design — /help-guides/design/responsive-design
- Building responsive pages — /help-guides/design/responsive-design/building-responsive-pages
- Templates — /help-guides/design/using-a-template
- The Component Library — /help-guides/design/the-component-library
- Importing from Figma — /help-guides/design/importing-from-figma
- Auto layout — /help-guides/design/importing-from-figma/auto-layout
- Custom elements — /help-guides/design/importing-from-figma/custom-elements

#### help-guides/data (53)
- Data — /help-guides/data
- The database — /help-guides/data/the-database
- Data types and fields — /help-guides/data/the-database/data-types-and-fields
- Creating, saving and deleting data — /help-guides/data/the-database/creating-saving-and-deleting-data
- Finding data — /help-guides/data/the-database/finding-data
- Displaying data — /help-guides/data/the-database/displaying-data
- Protecting data with privacy rules — /help-guides/data/the-database/protecting-data-with-privacy-rules
- The database editor — /help-guides/data/the-database/managing-data
- Export/import data — /help-guides/data/the-database/export-import-data
- Exporting data — /help-guides/data/the-database/export-import-data/exporting-data
- Importing data (CSV) — /help-guides/data/the-database/export-import-data/importing-data-csv
- Working with location data — /help-guides/data/the-database/working-with-location-data
- Using Algolia — /help-guides/data/the-database/using-algolia
- Database structure by app type — /help-guides/data/the-database/database-structure-by-app-type
- Marketplace Apps — /help-guides/data/the-database/database-structure-by-app-type/marketplace-apps
- Directory & Listings Apps — /help-guides/data/the-database/database-structure-by-app-type/directory-and-listings-apps
- Social Network Apps — /help-guides/data/the-database/database-structure-by-app-type/social-network-apps
- SaaS Apps — /help-guides/data/the-database/database-structure-by-app-type/saas-apps
- Project Management Apps — /help-guides/data/the-database/database-structure-by-app-type/project-management-apps
- CRM Apps — /help-guides/data/the-database/database-structure-by-app-type/crm-apps
- Professional Services Apps — /help-guides/data/the-database/database-structure-by-app-type/professional-services-apps
- On-demand Apps — /help-guides/data/the-database/database-structure-by-app-type/on-demand-apps
- Documentation/ CMS Apps — /help-guides/data/the-database/database-structure-by-app-type/documentation-cms-apps
- Applicant Tracking System (ATS) Apps — /help-guides/data/the-database/database-structure-by-app-type/applicant-tracking-system-ats-apps
- Portfolio Apps — /help-guides/data/the-database/database-structure-by-app-type/portfolio-apps
- Gallery Apps — /help-guides/data/the-database/database-structure-by-app-type/gallery-apps
- Online Store / Ecommerce Apps — /help-guides/data/the-database/database-structure-by-app-type/online-store-ecommerce-apps
- Blog Apps — /help-guides/data/the-database/database-structure-by-app-type/blog-apps
- Messaging App — /help-guides/data/the-database/database-structure-by-app-type/messaging-app
- Dashboards — /help-guides/data/the-database/database-structure-by-app-type/dashboards
- Building Block Apps — /help-guides/data/the-database/database-structure-by-app-type/building-block-apps
- Bubble as a backend — /help-guides/data/the-database/database-structure-by-app-type/bubble-as-a-backend
- Files — /help-guides/data/files
- Images — /help-guides/data/images
- Static data — /help-guides/data/static-data
- App texts (translations) — /help-guides/data/static-data/app-texts-translations
- Option sets — /help-guides/data/static-data/option-sets
- Temporary data — /help-guides/data/temporary-data
- Custom states — /help-guides/data/temporary-data/custom-states
- URL parameters — /help-guides/data/temporary-data/url-parameters
- User accounts — /help-guides/data/user-accounts
- Authentication plugins — /help-guides/data/user-accounts/authentication-plugins
- Facebook plugin — /help-guides/data/user-accounts/authentication-plugins/facebook-plugin
- Fitbit plugin — /help-guides/data/user-accounts/authentication-plugins/fitbit-plugin
- Google plugin — /help-guides/data/user-accounts/authentication-plugins/google-plugin
- Instagram plugin — /help-guides/data/user-accounts/authentication-plugins/instagram-plugin
- LinkedIn plugin — /help-guides/data/user-accounts/authentication-plugins/linkedin-plugin
- Pinterest plugin — /help-guides/data/user-accounts/authentication-plugins/pinterest-plugin
- Slack plugin — /help-guides/data/user-accounts/authentication-plugins/slack-plugin
- Wistia plugin — /help-guides/data/user-accounts/authentication-plugins/wistia-plugin
- YouTube plugin — /help-guides/data/user-accounts/authentication-plugins/youtube-plugin
- Cookies set by Bubble — /help-guides/data/user-accounts/cookies-set-by-bubble
- Time, dates and time zones — /help-guides/data/time-dates-and-time-zones

#### help-guides/logic (20)
- Logic — /help-guides/logic
- The frontend and backend — /help-guides/logic/the-frontend-and-backend
- Workflows — /help-guides/logic/workflows
- Events — /help-guides/logic/workflows/events
- Frontend events — /help-guides/logic/workflows/events/frontend-events
- Recurring workflows — /help-guides/logic/workflows/events/frontend-events/recurring-workflows
- Custom events — /help-guides/logic/workflows/events/frontend-events/custom-events
- Backend events — /help-guides/logic/workflows/events/backend-events
- Database trigger events — /help-guides/logic/workflows/events/backend-events/database-trigger-events
- Backend custom events — /help-guides/logic/workflows/events/backend-events/backend-custom-events
- Actions — /help-guides/logic/workflows/actions
- Dynamic expressions — /help-guides/logic/dynamic-expressions
- Conditions — /help-guides/logic/conditions
- Navigation — /help-guides/logic/navigation
- Single-page applications (SPA) — /help-guides/logic/navigation/single-page-applications-spa
- Multi-page applications — /help-guides/logic/navigation/multi-page-applications
- Page slugs — /help-guides/logic/navigation/page-slugs
- Device resources — /help-guides/logic/device-resources
- Location services — /help-guides/logic/device-resources/location-services
- Camera/photo library — /help-guides/logic/device-resources/camera-photo-library

#### help-guides/workload (22)
- Workload — /help-guides/workload
- Understanding workload — /help-guides/workload/understanding-workload
- Activity types — /help-guides/workload/understanding-workload/what-contributes-to-workload
- The workload calculation — /help-guides/workload/understanding-workload/the-workload-calculation
- Client-side and server-side processing — /help-guides/workload/understanding-workload/client-side-and-server-side-processing
- Tracking workload — /help-guides/workload/tracking-workload
- Measuring — /help-guides/workload/tracking-workload/measuring-workload
- Using App Metrics — /help-guides/workload/tracking-workload/measuring-workload/using-app-metrics
- Monitoring — /help-guides/workload/tracking-workload/monitoring-workload
- Workload notifications — /help-guides/workload/tracking-workload/monitoring-workload/workload-notifications
- Infinite recursion protection — /help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection
- Optimizing workload — /help-guides/workload/optimizing-workload
- Optimization framework — /help-guides/workload/optimizing-workload/optimization-framework
- Optimization checklist — /help-guides/workload/optimizing-workload/optimization-checklist
- Page load — /help-guides/workload/optimizing-workload/optimization-checklist/page-load
- Searches — /help-guides/workload/optimizing-workload/optimization-checklist/searches
- Workflows and actions — /help-guides/workload/optimizing-workload/optimization-checklist/workflows-and-actions
- Backend workflows — /help-guides/workload/optimizing-workload/optimization-checklist/backend-workflows
- Agency showcases — /help-guides/workload/optimizing-workload/agency-showcases
- Minimum Studio — /help-guides/workload/optimizing-workload/agency-showcases/minimum-studio
- Neam — /help-guides/workload/optimizing-workload/agency-showcases/neam
- Support Dept — /help-guides/workload/optimizing-workload/agency-showcases/support-dept

#### help-guides/security (21)
- Security — /help-guides/security
- Bubble's security features — /help-guides/security/bubbles-security-features
- Planning app security — /help-guides/security/planning-app-security
- Client-side and server-side — /help-guides/security/client-side-and-server-side
- Bubble account security — /help-guides/security/bubble-account-security
- App security — /help-guides/security/app-security
- Page security — /help-guides/security/page-security
- API security — /help-guides/security/api-security
- API Connector security — /help-guides/security/api-security/api-connector-security
- Data API security — /help-guides/security/api-security/data-api-security
- Workflow API security — /help-guides/security/api-security/workflow-api-security
- Security dashboard — /help-guides/security/security-dashboard
- Overview — /help-guides/security/security-dashboard/overview
- Security dashboard plan features — /help-guides/security/security-dashboard/security-dashboard-plan-features
- Security tests — /help-guides/security/security-dashboard/security-tests
- Privacy rules checker — /help-guides/security/security-dashboard/security-tests/privacy-rules-checker
- Automated tests — /help-guides/security/security-dashboard/security-tests/automated-tests
- Issue explorer — /help-guides/security/security-dashboard/security-tests/issue-explorer
- Issue details — /help-guides/security/security-dashboard/security-tests/issue-details
- Test settings — /help-guides/security/security-dashboard/security-tests/test-settings
- Security checklist — /help-guides/security/security-checklist

#### help-guides/previewing-your-app (3)
- Previewing your app — /help-guides/previewing-your-app
- Previewing a web app — /help-guides/previewing-your-app/previewing-a-web-app
- Previewing a mobile app — /help-guides/previewing-your-app/previewing-a-mobile-app

#### help-guides/publishing-your-app (7)
- Publishing your app — /help-guides/publishing-your-app
- Web app — /help-guides/publishing-your-app/deploying-your-app
- Native mobile app — /help-guides/publishing-your-app/native-mobile-app
- Global native mobile settings — /help-guides/publishing-your-app/native-mobile-app/global-native-mobile-settings
- iOS App Store — /help-guides/publishing-your-app/native-mobile-app/ios-app-store
- Google Play Store — /help-guides/publishing-your-app/native-mobile-app/google-play-store
- Publishing FAQ — /help-guides/publishing-your-app/native-mobile-app/publishing-faq

#### help-guides/ai (7)
- AI — /help-guides/ai
- Bubble AI Agent — /help-guides/ai/bubble-ai-agent
- Generate apps with AI — /help-guides/ai/bubbles-ai-app-generator
- About AI app generation — /help-guides/ai/bubbles-ai-app-generator/about-ai-app-generation
- Generate data types from the Data tab — /help-guides/ai/generate-data-types-from-the-data-tab
- AI page designer — /help-guides/ai/ai-page-designer
- Connect to AI models — /help-guides/ai/connect-to-ai-agents

#### help-guides/maintaining-an-application (26)
- Maintenance — /help-guides/maintaining-an-application
- Collaborators — /help-guides/maintaining-an-application/collaboration
- Version control — /help-guides/maintaining-an-application/version-control
- Best practices: Version control — /help-guides/maintaining-an-application/version-control/best-practices
- Transitioning from the legacy version control — /help-guides/maintaining-an-application/version-control/transitioning
- Terminology: Version control — /help-guides/maintaining-an-application/version-control/terminology
- Commenting — /help-guides/maintaining-an-application/commenting
- Database maintenance — /help-guides/maintaining-an-application/database-maintenance
- Copying the database — /help-guides/maintaining-an-application/database-maintenance/copying-the-database
- Restoring database backups — /help-guides/maintaining-an-application/database-maintenance/database-copy-and-backups
- Bulk operations — /help-guides/maintaining-an-application/database-maintenance/bulk-operations
- Bulk operation methods compared — /help-guides/maintaining-an-application/database-maintenance/bulk-operations/bulk-operation-methods-compared
- Wiping change history — /help-guides/maintaining-an-application/database-maintenance/wiping-change-history
- Performance — /help-guides/maintaining-an-application/performance-and-scaling
- Hard limits — /help-guides/maintaining-an-application/performance-and-scaling/hard-limits
- Notes on queries — /help-guides/maintaining-an-application/performance-and-scaling/notes-on-queries
- SEO — /help-guides/maintaining-an-application/seo
- Introduction to SEO — /help-guides/maintaining-an-application/seo/introduction-to-seo
- SEO: App — /help-guides/maintaining-an-application/seo/seo-app
- SEO: Page — /help-guides/maintaining-an-application/seo/seo-page
- Testing and debugging — /help-guides/maintaining-an-application/testing-an-application
- Introduction to testing and debugging — /help-guides/maintaining-an-application/testing-an-application/the-basics
- The native mobile debugger — /help-guides/maintaining-an-application/testing-an-application/the-native-mobile-debugger
- The server logs — /help-guides/maintaining-an-application/testing-an-application/using-server-logs
- Supported browsers — /help-guides/maintaining-an-application/testing-an-application/supported-browsers
- API workflow scheduler — /help-guides/maintaining-an-application/scheduler

#### help-guides/integrations (45)
- Integrations — /help-guides/integrations
- API — /help-guides/integrations/api
- Introduction to APIs — /help-guides/integrations/api/introduction-to-apis
- What is a RESTful API? — /help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api
- The Bubble API — /help-guides/integrations/api/the-bubble-api
- Bubble API terminology — /help-guides/integrations/api/the-bubble-api/bubble-api-terminology
- Authentication — /help-guides/integrations/api/the-bubble-api/authentication
- How to authenticate — /help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate
- No authentication — /help-guides/integrations/api/the-bubble-api/authentication/no-authentication
- As a user — /help-guides/integrations/api/the-bubble-api/authentication/as-a-user
- As an admin — /help-guides/integrations/api/the-bubble-api/authentication/as-an-admin
- The Data API — /help-guides/integrations/api/the-bubble-api/the-data-api
- Data API privacy rules — /help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules
- Data API endpoints — /help-guides/integrations/api/the-bubble-api/the-data-api/data-api-endpoints
- Data API requests — /help-guides/integrations/api/the-bubble-api/the-data-api/data-api-requests
- The Workflow API — /help-guides/integrations/api/the-bubble-api/the-workflow-api
- Workflow API privacy rules — /help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-privacy-rules
- Workflow API endpoints — /help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-endpoints
- API workflows — /help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows
- Creating API workflows — /help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows
- Scheduling API workflows — /help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows
- Recursive API workflows — /help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows
- Case: Stripe notifications — /help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/examples-and-walkthroughs
- The API Connector — /help-guides/integrations/api/the-api-connector
- Authentication — /help-guides/integrations/api/the-api-connector/authentication
- API guides — /help-guides/integrations/api/the-api-connector/api-guides
- OpenAI — /help-guides/integrations/api/the-api-connector/api-guides/openai
- Authentication — /help-guides/integrations/api/the-api-connector/api-guides/openai/authentication
- Calls — /help-guides/integrations/api/the-api-connector/api-guides/openai/calls
- ChatGPT — /help-guides/integrations/api/the-api-connector/api-guides/openai/calls/chatgpt
- Chat — /help-guides/integrations/api/the-api-connector/api-guides/openai/calls/chatgpt/chat
- Google Translate — /help-guides/integrations/api/the-api-connector/api-guides/case-google-translate
- How to setup Google API keys — /help-guides/integrations/api/the-api-connector/api-guides/case-google-translate/how-to-setup-google-api-keys
- Streaming API — /help-guides/integrations/api/the-api-connector/streaming-api
- Plugins that connect to APIs — /help-guides/integrations/api/plugins-that-connect-to-apis
- API Glossary — /help-guides/integrations/api/api-glossary
- Plugins — /help-guides/integrations/using-plugins
- What Plugins Can Do — /help-guides/integrations/using-plugins/what-plugins-can-do
- Installing and using Plugins — /help-guides/integrations/using-plugins/installing-and-using-plugins
- Special Plugins — /help-guides/integrations/using-plugins/special-plugins
- SQL Database Connector — /help-guides/integrations/sql-database-connector
- Bubble App Connector — /help-guides/integrations/bubble-app-connector
- WorkOS — /help-guides/integrations/workos
- WorkOS SSO — /help-guides/integrations/workos/workos-sso
- WorkOS API — /help-guides/integrations/workos/workos-api

#### help-guides/optimizing-an-application (13)
- Infrastructure — /help-guides/optimizing-an-application
- Sub-apps — /help-guides/optimizing-an-application/sub-apps
- Bubble release tiers — /help-guides/optimizing-an-application/bubble-release-tiers
- Hosting and scaling — /help-guides/optimizing-an-application/hosting-and-scaling
- How Bubble hosting works — /help-guides/optimizing-an-application/hosting-and-scaling/how-bubble-hosting-works
- Scaling with Bubble — /help-guides/optimizing-an-application/hosting-and-scaling/scaling-with-bubble
- CDN (Cloudflare) — /help-guides/optimizing-an-application/hosting-and-scaling/cdn-cloudflare
- Bubble app names — /help-guides/optimizing-an-application/hosting-and-scaling/bubble-app-names
- Compliance — /help-guides/optimizing-an-application/compliance
- GDPR — /help-guides/optimizing-an-application/compliance/gdpr
- SOC 2 Type II — /help-guides/optimizing-an-application/compliance/soc-2-type-ii
- HIPAA — /help-guides/optimizing-an-application/compliance/hipaa
- Other frameworks and standards — /help-guides/optimizing-an-application/compliance/other-frameworks

#### help-guides/bubble-for-enterprise (16)
- Bubble for Enterprise — /help-guides/bubble-for-enterprise
- Hosting and infrastructure — /help-guides/bubble-for-enterprise/hosting-and-infrastructure
- Dedicated instance — /help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance
- The Dedicated editor experience — /help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/the-dedicated-editor-experience
- Technical specs — /help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/technical-specs
- Main cluster dependencies — /help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/main-cluster-dependencies
- Customizable options — /help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/customizable-options
- Migration process — /help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/migration-process
- Pre-migration — /help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/migration-process/pre-migration
- During migration — /help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/migration-process/during-migration
- Post-migration — /help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/migration-process/post-migration
- Security and compliance — /help-guides/bubble-for-enterprise/security-and-compliance
- Single sign-on (SSO) — /help-guides/bubble-for-enterprise/security-and-compliance/single-sign-on-sso
- Admin and collaboration — /help-guides/bubble-for-enterprise/admin-and-collaboration
- Priority support — /help-guides/bubble-for-enterprise/priority-support
- Billing and Payment Guideline for Dedicated Instances — /help-guides/bubble-for-enterprise/billing-and-payment-guideline-for-dedicated-instances

### core-resources (222 pages)

#### core-resources/using-the-core-reference (1)
- Using the core reference — /core-resources/using-the-core-reference

#### core-resources/bubbles-interface (13)
- Bubble's Interface — /core-resources/bubbles-interface
- Design tab — /core-resources/bubbles-interface/design-tab
- Workflow tab — /core-resources/bubbles-interface/workflow-tab
- Data tab — /core-resources/bubbles-interface/data-tab
- Global tab — /core-resources/bubbles-interface/global-tab
- Plugins tab — /core-resources/bubbles-interface/plugins-tab
- Settings tab — /core-resources/bubbles-interface/settings-tab
- Logs tab — /core-resources/bubbles-interface/logs-tab
- Template tab — /core-resources/bubbles-interface/template-tab
- Toolbar — /core-resources/bubbles-interface/toolbar
- Top and context menu options — /core-resources/bubbles-interface/top-and-context-menu-options
- Deployment and version control — /core-resources/bubbles-interface/version-control-deployment
- Notes — /core-resources/bubbles-interface/comments-and-notes

#### core-resources/elements (18)
- Elements — /core-resources/elements
- Native mobile elements — /core-resources/elements/native-mobile-elements
- View element — /core-resources/elements/native-mobile-elements/view-element
- Navigation elements — /core-resources/elements/native-mobile-elements/view-element/navigation-elements
- List component — /core-resources/elements/native-mobile-elements/list-component
- Visual elements — /core-resources/elements/native-mobile-elements/visual-elements
- Input forms — /core-resources/elements/native-mobile-elements/input-forms
- General properties — /core-resources/elements/shared-properties
- Styling properties — /core-resources/elements/styling-properties
- Responsive Properties — /core-resources/elements/responsive-properties
- Conditional formatting — /core-resources/elements/conditional-formatting
- States — /core-resources/elements/states
- Page Element — /core-resources/elements/page-element
- Visual Elements — /core-resources/elements/visual-elements
- Containers — /core-resources/elements/containers
- Container Layout Types — /core-resources/elements/container-layout-types
- Input Forms — /core-resources/elements/input-forms
- Reusable Elements — /core-resources/elements/reusable-elements

#### core-resources/workflows (1)
- Workflows — /core-resources/workflows

#### core-resources/events (7)
- Events — /core-resources/events
- General events — /core-resources/events/general-events
- Element events — /core-resources/events/element-events
- Custom events — /core-resources/events/custom-events
- Recurring event — /core-resources/events/recurring-event
- Database trigger event — /core-resources/events/trigger-event
- In-app purchase events — /core-resources/events/in-app-purchase-events

#### core-resources/actions (8)
- Actions — /core-resources/actions
- Account — /core-resources/actions/account
- Navigation — /core-resources/actions/navigation
- Data (things) — /core-resources/actions/data-things
- Email and notifications — /core-resources/actions/email
- Element — /core-resources/actions/element
- Custom — /core-resources/actions/custom
- In-app purchase actions — /core-resources/actions/in-app-purchase-actions

#### core-resources/on-device-resources (1)
- On-device resources — /core-resources/on-device-resources

#### core-resources/data (5)
- Data — /core-resources/data
- Data Sources — /core-resources/data/data-sources
- Operators and comparisons — /core-resources/data/operations-and-comparisons
- Search — /core-resources/data/search
- Privacy — /core-resources/data/privacy

#### core-resources/styles (1)
- Styles — /core-resources/styles

#### core-resources/api (10)
- API — /core-resources/api
- The Bubble API — /core-resources/api/the-bubble-api
- The Data API — /core-resources/api/the-bubble-api/the-data-api
- Authentication — /core-resources/api/the-bubble-api/the-data-api/authentication
- Data API endpoints — /core-resources/api/the-bubble-api/the-data-api/data-api-endpoints
- Data API requests — /core-resources/api/the-bubble-api/the-data-api/data-api-requests
- The Workflow API — /core-resources/api/the-bubble-api/the-workflow-api
- The API Connector — /core-resources/api/the-api-connector
- Authentication — /core-resources/api/the-api-connector/authentication
- Adding calls — /core-resources/api/the-api-connector/adding-calls

#### core-resources/bubble-made-plugins (41)
- Bubble-made Plugins — /core-resources/bubble-made-plugins
- AddtoAny Share Buttons — /core-resources/bubble-made-plugins/addtoany-share-buttons
- Airtable — /core-resources/bubble-made-plugins/airtable
- API Connector — /core-resources/bubble-made-plugins/api-connector
- Blockspring — /core-resources/bubble-made-plugins/blockspring
- Box — /core-resources/bubble-made-plugins/box
- Braintree — /core-resources/bubble-made-plugins/braintree
- Bubble App Connector — /core-resources/bubble-made-plugins/bubble-app-connector
- Chart.js — /core-resources/bubble-made-plugins/chart.js
- Circle Music Player — /core-resources/bubble-made-plugins/circle-music-player
- Draggable Elements — /core-resources/bubble-made-plugins/draggable-ui-elements
- Dropzone — /core-resources/bubble-made-plugins/dropzone
- Facebook — /core-resources/bubble-made-plugins/facebook
- Fitbit — /core-resources/bubble-made-plugins/fitbit
- Full Calendar — /core-resources/bubble-made-plugins/full-calendar
- Google — /core-resources/bubble-made-plugins/google
- Google Analytics — /core-resources/bubble-made-plugins/google-analytics
- Google Optimize — /core-resources/bubble-made-plugins/google-optimize
- Google Places — /core-resources/bubble-made-plugins/google-places
- Ionic Elements — /core-resources/bubble-made-plugins/ionic-elements
- iTunes — /core-resources/bubble-made-plugins/itunes
- Slidebar Menu — /core-resources/bubble-made-plugins/slidebar-menu
- LinkedIn — /core-resources/bubble-made-plugins/linkedin
- Localize Translation — /core-resources/bubble-made-plugins/localize-translation
- Mixpanel — /core-resources/bubble-made-plugins/mixpanel
- Mouse & Keyboard Interactions — /core-resources/bubble-made-plugins/mouse-and-keyboard-interactions
- Multiselect Dropdown — /core-resources/bubble-made-plugins/multiselect-dropdown
- Progress Bar — /core-resources/bubble-made-plugins/progress-bar
- Rich Text Editor — /core-resources/bubble-made-plugins/rich-text-editor
- Screenshotlayer — /core-resources/bubble-made-plugins/screenshotlayer
- SelectPDF — /core-resources/bubble-made-plugins/selectpdf
- Slack — /core-resources/bubble-made-plugins/slack
- Segment — /core-resources/bubble-made-plugins/segment
- Slick Slideshow — /core-resources/bubble-made-plugins/slick-slideshow
- SQL Database Connector — /core-resources/bubble-made-plugins/sql-database-connector
- Star Rating — /core-resources/bubble-made-plugins/star-rating
- Stripe — /core-resources/bubble-made-plugins/stripe
- Tinder-like Element — /core-resources/bubble-made-plugins/tinder-like-element
- Twitter — /core-resources/bubble-made-plugins/twitter
- YouTube — /core-resources/bubble-made-plugins/youtube
- Zapier — /core-resources/bubble-made-plugins/zapier

#### core-resources/application-settings (10)
- Application Settings — /core-resources/application-settings
- My plan — /core-resources/application-settings/app-plan
- General — /core-resources/application-settings/general
- Domain / email — /core-resources/application-settings/domain-email
- Languages — /core-resources/application-settings/languages
- SEO / metatags — /core-resources/application-settings/seo-metatags
- API — /core-resources/application-settings/api
- Collaboration — /core-resources/application-settings/collaboration
- Sub-apps — /core-resources/application-settings/sub-apps
- Versions — /core-resources/application-settings/versions

#### core-resources/bubble-elements (80)
- Elements (PE beta) — /core-resources/bubble-elements
- The element property editor — /core-resources/bubble-elements/the-element-property-editor
- Element properties — /core-resources/bubble-elements/element-properties
- Web element properties — /core-resources/bubble-elements/element-properties/web-element-properties
- Page properties — /core-resources/bubble-elements/element-properties/web-element-properties/page-properties
- Container properties — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties
- Group element — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties/group-element
- Repeating group element — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties/repeating-group-element
- Popup element — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties/popup-element
- Floating group element — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties/floating-group-element
- Group focus element — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties/group-focus-element
- Table element — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element
- Table row/column — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element/table-row-column
- Table row/column cell — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element/table-row-column/table-row-column-cell
- Table row/column repeating — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element/table-row-column-repeating
- Table repeating row/column cell — /core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element/table-row-column-repeating/table-repeating-row-column-cell
- Visual element properties — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties
- Text element — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/text-element
- Button element — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/button-element
- Icon element — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/icon-element
- Link element — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/link-element
- Image element — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/image-element
- Shape element — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/shape-element
- Map element — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/map-element
- Alert element — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/alert-element
- HTML — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/html
- Video element — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/video-element
- Built on Bubble — /core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/built-on-bubble
- Input form properties — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties
- Input element — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/input-element
- Multiline input element — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/multiline-input-element
- Checkbox element — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/checkbox-element
- Dropdown element — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/dropdown-element
- Searchbox element — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/searchbox-element
- Radio buttons element — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/radio-buttons-element
- Slider input element — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/slider-input-element
- Date/time picker element — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/date-time-picker-element
- Picture uploader element — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/picture-uploader-element
- File uploader element — /core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/file-uploader-element
- Bubble-made plugin element properties — /core-resources/bubble-elements/element-properties/web-element-properties/bubble-made-plugin-element-properties
- Native mobile element properties — /core-resources/bubble-elements/element-properties/native-mobile-element-properties
- The view element — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element
- View properties — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/view-properties
- App bar element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/app-bar-element-mobile
- Leading/trailing app bar button (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/app-bar-element-mobile/leading-trailing-app-bar-button-mobile
- Vertical list — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/vertical-list
- Vertical list item element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/vertical-list/vertical-list-item-element-mobile
- Swipe action (vertical list element) (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/vertical-list/vertical-list-item-element-mobile/swipe-action-vertical-list-element-mobile
- Section list element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/section-list-element-mobile
- Section header element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/section-list-element-mobile/section-header-element-mobile
- Section list item element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/section-list-element-mobile/section-list-item-element-mobile
- Swipe action (section list element) (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/section-list-element-mobile/section-list-item-element-mobile/swipe-action-section-list-element-mobile
- Tab bar element — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/tab-bar-element
- Tab item element — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/tab-bar-element/tab-item-element
- Container properties — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile
- Group element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/group-element-mobile
- Floating group element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/floating-group-element-mobile
- Short list element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/short-list-element-mobile
- Short list item element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/short-list-element-mobile/short-list-item-element-mobile
- Horizontal list element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/horizontal-list-element-mobile
- Horizontal List Item element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/horizontal-list-element-mobile/horizontal-list-item-element-mobile
- Sheet element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/sheet-element-mobile
- Mobile visual elements — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/visual-element-properties-mobile
- Text element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/visual-element-properties-mobile/text-element-mobile
- Button element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/visual-element-properties-mobile/button-element-mobile
- Icon element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/visual-element-properties-mobile/icon-element-mobile
- Image element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/visual-element-properties-mobile/image-element-mobile
- Map element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/visual-element-properties-mobile/map-element-mobile
- Shape element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/visual-element-properties-mobile/shape-element-mobile
- Web view (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/visual-element-properties-mobile/web-view-mobile
- Input form properties — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/input-form-properties-mobile
- Input element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/input-form-properties-mobile/input-element-mobile
- Multiline input (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/input-form-properties-mobile/multiline-input-mobile
- Checkbox element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/input-form-properties-mobile/checkbox-element-mobile
- Selectable list element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/input-form-properties-mobile/selectable-list-element-mobile
- Selectable list item element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/input-form-properties-mobile/selectable-list-element-mobile/selectable-list-item-element-mobile
- Date/time picker element (mobile) — /core-resources/bubble-elements/element-properties/native-mobile-element-properties/input-form-properties-mobile/date-time-picker-element-mobile
- Reusable element properties — /core-resources/bubble-elements/element-properties/reusable-element-properties
- Reusable element instance — /core-resources/bubble-elements/element-properties/reusable-element-properties/reusable-element-instance
- Conditional element properties — /core-resources/bubble-elements/conditional-element-properties

#### core-resources/bubble-workflows (26)
- Workflows (PE beta) — /core-resources/bubble-workflows
- The workflow property editor — /core-resources/bubble-workflows/the-workflow-property-editor
- Events and properties — /core-resources/bubble-workflows/bubble-events
- Frontend event properties — /core-resources/bubble-workflows/bubble-events/frontend-event-properties
- General event properties — /core-resources/bubble-workflows/bubble-events/frontend-event-properties/general-event-properties
- Element event properties — /core-resources/bubble-workflows/bubble-events/frontend-event-properties/element-event-properties
- Custom event properties — /core-resources/bubble-workflows/bubble-events/frontend-event-properties/custom-event-properties
- Backend event properties — /core-resources/bubble-workflows/bubble-events/backend-event-properties
- API workflow properties — /core-resources/bubble-workflows/bubble-events/backend-event-properties/api-workflow-properties
- A thing is modified event properties — /core-resources/bubble-workflows/bubble-events/backend-event-properties/trigger-event-a-thing-is-modified
- Recurring event properties — /core-resources/bubble-workflows/bubble-events/backend-event-properties/recurring-event-properties
- Bubble-made plugin events — /core-resources/bubble-workflows/bubble-events/bubble-made-plugin-events
- In-app purchase events — /core-resources/bubble-workflows/bubble-events/in-app-purchase-events
- Actions and properties — /core-resources/bubble-workflows/bubble-actions
- Account actions — /core-resources/bubble-workflows/bubble-actions/account-actions
- Navigation actions in web apps — /core-resources/bubble-workflows/bubble-actions/navigation-actions-in-web-apps
- Navigation actions in mobile apps — /core-resources/bubble-workflows/bubble-actions/navigation-actions-in-mobile-apps
- Database actions — /core-resources/bubble-workflows/bubble-actions/database-actions
- Element actions — /core-resources/bubble-workflows/bubble-actions/element-actions
- Email and notification actions — /core-resources/bubble-workflows/bubble-actions/email-and-notification-actions
- Native mobile actions — /core-resources/bubble-workflows/bubble-actions/native-mobile-actions
- Custom actions — /core-resources/bubble-workflows/bubble-actions/custom-actions
- Backend workflows — /core-resources/bubble-workflows/bubble-actions/backend-workflows
- Bubble-made plugin actions — /core-resources/bubble-workflows/bubble-actions/bubble-made-plugin-actions
- In-app purchase actions — /core-resources/bubble-workflows/bubble-actions/in-app-purchase-actions
- Conditional workflow properties — /core-resources/bubble-workflows/conditional-workflow-properties

### account-and-marketplace (24 pages)

#### account-and-marketplace/account-and-billing (8)
- Account and billing — /account-and-marketplace/account-and-billing
- Pricing and plans — /account-and-marketplace/account-and-billing/pricing-plans
- Plans and billing — /account-and-marketplace/account-and-billing/pricing-plans/plans-and-billing
- Billing cycle — /account-and-marketplace/account-and-billing/pricing-plans/billing-cycle
- FAQ: Pricing and Workload — /account-and-marketplace/account-and-billing/pricing-plans/pricing-faq
- Account Management — /account-and-marketplace/account-and-billing/account-management
- Building Apps for Others — /account-and-marketplace/account-and-billing/building-apps-for-others
- Selling on the Marketplace — /account-and-marketplace/account-and-billing/selling-on-the-marketplace

#### account-and-marketplace/official-bubble-certification (2)
- Official Bubble Certification — /account-and-marketplace/official-bubble-certification
- Hiring certified developers — /account-and-marketplace/official-bubble-certification/hiring-certified-developers

#### account-and-marketplace/building-plugins (10)
- Building Plugins — /account-and-marketplace/building-plugins
- The Plugin Editor — /account-and-marketplace/building-plugins/the-plugin-editor
- General Settings — /account-and-marketplace/building-plugins/general-settings
- Updating to Plugin API v4 — /account-and-marketplace/building-plugins/updating-to-plugin-api-v4
- Adding API Connections — /account-and-marketplace/building-plugins/adding-api-connections
- Building Elements — /account-and-marketplace/building-plugins/building-elements
- Building Actions — /account-and-marketplace/building-plugins/building-actions
- Loading Data — /account-and-marketplace/building-plugins/loading-data
- Publishing and versioning — /account-and-marketplace/building-plugins/publishing-and-versioning
- Github Integration — /account-and-marketplace/building-plugins/github-integration

#### account-and-marketplace/building-templates (1)
- Building Templates — /account-and-marketplace/building-templates

#### account-and-marketplace/application-and-data-ownership (1)
- Application and data ownership — /account-and-marketplace/application-and-data-ownership

#### account-and-marketplace/marketplace-policies (1)
- Marketplace policies — /account-and-marketplace/marketplace-policies

#### account-and-marketplace/bug-reports (1)
- Bug reports — /account-and-marketplace/bug-reports

### beta-features (2 pages)

#### beta-features/about-the-beta-features-section (1)
- About the Beta features section — /beta-features/about-the-beta-features-section

#### beta-features/native-mobile-apps (1)
- Native mobile apps — /beta-features/native-mobile-apps
