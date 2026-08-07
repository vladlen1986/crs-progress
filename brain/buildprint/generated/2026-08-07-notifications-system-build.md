# Build the CRS notification system — end to end

Work on the **test** branch only. Never touch live.

Start in **Plan mode**. Read the app first, then give me a numbered build plan and wait for my go-ahead before you switch to Build mode. After that, build it **one step per change** — a savepoint before each step, and verify the step before moving to the next. Do not bundle steps.

I don't want questions back. Everything you need is in this message. Where something is genuinely ambiguous, pick the sensible option, do it, and write one line in your final report saying what you chose and why. The only thing you should stop for is something that would destroy data.

---

## What this app is

CRS (Casino Reporting Suite) — a multi-tenant, multi-property SaaS for casino operations, app `casinoreportingsystem`. 46 modules are planned; a handful are built. It's a single-page app: one page called `app`, and each module is a reusable element inside a floating group called `Pages`, shown/hidden by the URL path segment matched against the `OS - Module` option set.

Notifications is module #30, in the **Admin / Core** section. Core modules are always active regardless of subscription tier, so there is **no tier gate** on this one.

The point of this build: **every one of the 46 modules must be able to fire a notification by calling one backend workflow with the same parameters.** If a module has to know anything about email, batching, preferences or channels, the design has failed. I want to add a new module later and have notifications work by writing one action.

**This is B2B SaaS infrastructure, not a consumer app or marketing site — build it like it.** That has concrete consequences, not just vibes:

- **Tenant admins get policy control, not just individual users.** A casino's compliance officer needs to be able to force certain notifications on for their whole property, or turn a channel off company-wide (some properties won't allow push to personal devices, full stop). This is a layer above personal preferences, not a replacement for them. See the new `notification_company_policy` type below.
- **Recipients are often roles or departments, not named people.** "Notify the Surveillance shift supervisors" is a normal ops requirement — the calling module shouldn't have to hand-resolve that to a user list every time. `trigger_notification` accepts role-based targeting directly.
- **There is no growth/engagement surface here at all.** No re-engagement pushes, no "come back and see what's new," no marketing digest, no social-style activity feed trying to maximize opens. Every notification exists because someone needs to act on or be aware of something operational. If you find yourself building anything that looks like a growth lever, stop — it doesn't belong in this module.
- **Compliance needs delivery proof without content exposure.** Casino operations are regulated. An auditor may ask "prove the Compliance Manager was notified when X happened." The personal notification inbox stays strictly private (see privacy rules) — but delivery *metadata* for compliance-relevant events is captured separately so that proof is answerable without opening anyone's personal inbox. See `notification_delivery_record` below.
- **No tier-gating logic in this build.** Notifications is a Core module and stays fully functional at every tier per the locked pricing structure — don't invent per-tier notification limits, that's a commercial decision for a different conversation.

---

## Non-negotiables

These are locked project rules. Don't debate them, just apply them.

1. **Pattern A tenancy.** Every business data type carries **both** a `company` field (→ Company) and a `property` field (→ Property). Every privacy rule checks **both**: `This Thing's company = Current User's company AND This Thing's property = Current User's property`. A user belongs to exactly one property. There is no cross-property visibility and no admin override that crosses properties.
2. **No hard-coded colors, ever.** The app has 73 named colour tokens with light/dark pairs — `BG Primary`, `BG Secondary`, `BG Tertiary`, `BG Elevated`, `Border Default`, `Border Hover`, `Border Active`, `Accent`, `Accent Text`, `Accent Soft`, `Accent Tint`, `Text Primary`, `Text Secondary`, `Text Muted`, `Text Disabled`, `Success`, `Success Soft`, `Success Tint`, `Warning`, `Warning Tint`, `Error`, `Error Soft`, `Error Tint`, `Purple`, `Cyan`, plus a `· Light` variant of each. Use those tokens and the existing named Styles (`Button`, `Text`, `Group`, `RepeatingGroup`, `Input`, `Dropdown`, `Popup`, `FloatingGroup`, `Icon`, `Shape`, …). If you type a hex value anywhere, you've done it wrong.
3. **Default body text is `Text Secondary`, not `Text Primary`.** `Text Primary` is reserved for headings and key figures. This trips people up constantly.
4. **Naming conventions:** pages `#Name`, popups `#PP - Name`, reusable elements `#GR - Name` (existing ones use `# Name`, match what's already there in each area), floating groups `#FG - Name`. Data type fields: lowercase snake_case. Backend workflows: lowercase snake_case.
5. **Don't build UI from scratch.** See the UI section — you clone existing elements and adapt them. I'm not interested in a new visual language for this module.

---

## What already exists — read this before you create anything

I've inventoried the branch. Don't re-create these, adapt them.

**Data type `notification` (display name "36 Notification") already exists with 16 fields and ZERO records.** Because it's empty, you are free to restructure it aggressively — no migration needed, no backfill. Current fields:

`actor` (User) · `body_preview` (text) · `company` (Company) · `entity_type` (OS - Notification Entity Type) · `event_type` (OS - Notification Event Type) · `expires_at` (date) · `group_count` (number) · `group_key` (text) · `is_read` (option — wrongly pointed at the `employee_initiator0` option set) · `priority` (OS - Priority) · `property` (01.1 Property) · `read_date` (date) · `recipient` (User) · `report` (11 Report) · `task` (29_0 Task) · `title` (text)

It currently has **no privacy rules at all** — it is publicly readable. That gets fixed in this build.

**Option sets that already exist but are EMPTY (no values, no attributes):**
- `OS - Notification Event Type` (comment: "e.g., TaskUpdateAdded, ReportStatusChanged, Mention, etc.")
- `OS - Notification Entity Type` (comment: "e.g., Task, Report, Thread, InfoboardItem.")

**Option sets that exist and are populated, reuse them:**
- `OS - Priority` — values `low`, `medium`, `high`, `urgent`, with a `sort_order` number attribute.
- `OS - Module` — 57 values with attributes `label`, `lable_menu`, `description`, `icon_code`, `page_route1`, `section`, `show_in_sidebar`, `status`, `release_date`. **It already contains a `notifications` value**: label "Notifications", icon_code "bell", page_route1 "notifications", section "core", show_in_sidebar yes, status "on_roadmap". Flip `status` when the module is live; don't create a duplicate.
- `OS - Permission` — 125 values, attributes `description`, `is_sensitive`, `user_permission_module`, `user_permission_module_component`. **Zero notification permissions exist yet.**

**Already dead, leave dead / finish killing:**
- Data type `user_notification` is already soft-deleted. Leave it deleted. Its option set `OS - User Notification Type` (values Report Comment / Task / Message) is legacy — mark it deleted too, nothing should reference it.

**The UI placeholder already exists.** Inside the `app` page there's a floating group `Pages`, and inside it a custom element named `# notifications` — but it's currently pointing at the `# dashboard` reusable definition as a placeholder, with a visibility condition matching `OS - Module` = `notifications` from the URL path segment. You will point that at the real reusable element you build.

**Email is not set up.** App settings show `use_sendgrid: true` but `sendgrid_verified: false`, and the only API Connector entries are OpenAI, Google AI Studio and a generic "AI" call. There is no Postmark/SendGrid API Connector and no email plugin. Plan accordingly — see the Email channel section.

**There is no mobile app.** This app is web-only today. Native iOS/Android apps with push notifications are planned but don't exist yet. Plan accordingly — see the Push channel section.

**Existing backend workflows** (29 total) are all module-specific: `um_create_user`, `um_save_user`, `um_set_user_status`, `um_reset_user_password`, `log_user_action`, `log_role_action`, `create_role`, `save_role`, `delete_role`, `create_property`, `save_property`, `save_company`, plus report/employee link builders and country migrations. None of them send notifications. Nothing exists to build on — you're creating the notification pipeline fresh.

---

## The architecture I want

I've already made these calls based on how notification infrastructure is actually built (Knock, Courier, Novu, MagicBell, and the standard fan-out-on-write activity-feed pattern). Implement them as stated.

**One row per recipient, written eagerly.** When an event fires, write one Notification row per recipient immediately. Don't store one shared event row and compute per-user views at read time — reads must be dumb and fast, and Bubble privacy rules need a `recipient` field to key off.

**The caller resolves who cares; the system resolves everything else.** `trigger_notification` takes an explicit list of recipient Users from the calling module, because only the module knows who the "report creator" or "task assignee" is. The notification system then adds watchers, removes the actor, deduplicates, applies preferences, applies batching, and delivers. This is the split that makes it work for all 46 modules without a 400-branch resolver workflow inside the notification engine.

**Four-state lifecycle, not three:** `unread → seen → read → archived`. "Seen" is set when the user opens the bell dropdown; it clears the red badge without pretending they read every item. Only `unread` counts toward the badge. *(Note: the CRS Blueprint spec says three states. I'm deliberately overriding that — call it out in your report so I know it's a conscious deviation.)*

**Denormalized unread counter, plus a nightly reconcile.** Put `unread_notification_count` (number) on the User data type. Increment it in the delivery workflow, decrement on mark-read/mark-all-read/archive. Do **not** run a live `Search for Notifications :count` on every page load — that's a per-pageview workload cost that never stops. Counters drift, so a nightly job recomputes them; that's the accepted trade.

**Denormalize the display text at write time.** `title` and `body_preview` are rendered when the notification is created, so the dropdown and inbox render with no joins. Consequence you must respect: **never put sensitive content into `title` or `body_preview`.** Actor-verb-object only — "John Smith verified Report #12345", never the report's contents. The notification row survives after the user loses access to the underlying record, so anything in the title is effectively permanent and unguarded.

**Deep links are verified at click time, not at write time.** Store `entity_type` + `entity_id` and build the URL when the row is created, but when the user clicks, check the target still exists and is still visible to them. If not, show "This item is no longer available" instead of a broken or leaking view. Permission drift is a real bug class here, not a nicety.

**Idempotency by key.** Every notification carries a `dedupe_key` built as `recipient_id | event_code | entity_id | batch_window_bucket`. Check for an existing row with that key before creating. Retries and double-fires then cost nothing instead of double-notifying.

**Batching with a collapse key, critical events bypass.** Group on `recipient + event_type + module + time window`. On a batch hit, append the entity id to a list, increment the count, refresh the modified date, and **do not reschedule the email**. On a miss, create a new row and schedule the email for `now + batching window`. Events flagged as critical have a zero window and never batch. Concretely, this is the difference between a 50-report bulk import producing 50 rows and 50 emails per recipient versus 1 row and 1 email saying "12 reports were created in Cage in the last 15 minutes" — roughly a 98% workload reduction and the difference between normal sending and a deliverability throttle.

**Two-tier preferences: module-level mute plus per-event override.** With 46 modules the per-event list will run to hundreds of rows; nobody will toggle them one by one. Users mute a whole module in one click, then override individual events inside it if they care. This "section → category → channel" shape is the standard preference-centre pattern and it's the single biggest usability factor once you pass ~15 notification types.

**Mandatory events cannot be muted.** Security, role, and permission events always deliver. They show with a lock icon and a disabled toggle in the preferences UI.

**Preference precedence has a tenant layer above the user, not just user-then-default.** This is the actual difference between a B2B tool and a consumer app: an org admin's policy can override an individual's opt-out, and can disable a channel for the whole tenant. Resolve channels in this order, highest wins:
1. Event is mandatory (`allow_opt_out = no`) → always on, nothing below matters.
2. Company policy forces this event on for the tenant → on, regardless of the user's personal preference.
3. Company policy disables this channel tenant-wide (e.g. push disabled company-wide) → off, regardless of anything else including a user who wants it.
4. User's per-event override, if one exists.
5. User's global channel toggle / muted module.
6. The event type's own default.

**Compliance-relevant events get a delivery record, separate from the personal notification.** The personal `notification` row stays strictly private to its recipient — see Privacy rules. But for events flagged `compliance_relevant = yes` on the event type, `deliver_to_user` also writes a `notification_delivery_record`: who, what event, when, which channels — no title, no content, just proof of delivery. That's what answers "was the Compliance Manager notified" during an audit, without ever exposing anyone's inbox contents to another user.

**Push and email are both "wire the pipe now, connect the tap later."** There is no mobile app yet and no verified email provider yet, but both are coming — iOS/Android native apps with push, and SendGrid once it's verified. Build the full data model, preference plumbing, and channel-routing logic for both channels now, exactly as if they were live, with only the final provider-specific send action stubbed. When the mobile app and SendGrid exist, turning each channel on should be a small, contained change (wire one API/plugin action, flip a readiness flag) — not a redesign. See the **Push channel** and **Email channel** sections below for exactly what to build now versus defer.

---

## Data model

Eight data types, plus two fields added to the existing `User` type. Every data type gets `company` (→ Company) and `property` (→ 01.1 Property) — Pattern A — except the two called out explicitly below (`notification_email_template`, `notification_company_policy`), which are deliberately company-scoped only.

### 1. `notification` — restructure the existing type

Keep: `company`, `property`, `recipient`, `actor`, `event_type`, `entity_type`, `title`, `priority`, `read_date`, `expires_at`, `group_key`, `group_count`.

Rename for clarity: `body_preview` → keep the name, it's fine.

**Remove** (0 records, safe): `is_read` — it points at the wrong option set (`employee_initiator0`) and is superseded by `state`. Also remove the hard-coded `report` and `task` foreign keys — they're a polymorphic dead end that would need a new field for every one of the 46 modules. `entity_type` + `entity_id` replaces them.

**Add:**

| Field | Type | Notes |
|---|---|---|
| `state` | OS - Notification State | unread / seen / read / archived. Default unread. |
| `entity_id` | text | The target Thing's unique id. Indexed use — always search with `event_type` or `recipient` as a co-constraint. |
| `related_entity_ids` | list of text | Populated on batch merge. |
| `dedupe_key` | text | The idempotency key described above. |
| `module` | OS - Module | Denormalized off the event type, so the inbox can filter by module without touching the event option set. |
| `severity` | text | info / warning / critical. Denormalized off the event type for cheap filtering. |
| `cta_url` | text | Deep link built at create time. |
| `channels_delivered` | list of text | Audit trail: which channels actually fired. |
| `seen_date` | date | |
| `archived_date` | date | |
| `email_status` | OS - Notification Email Status | pending / scheduled / sent / failed / skipped |
| `email_scheduled_send_date` | date | Used by the check-on-fire guard. |
| `email_sent_date` | date | |
| `email_failure_reason` | text | Whatever the provider returned. |

### 2. `notification_preferences` — new, one row per User

`company`, `property`, `user` (User, unique — exactly one row per user, auto-created on signup), `global_inapp_enabled` (yes/no, default yes), `global_email_enabled` (yes/no, default yes), `global_push_enabled` (yes/no, default no — dormant until there's a mobile app), `muted_modules` (list of OS - Module), `digest_frequency` (OS - Digest Frequency), `timezone` (text, IANA name — needed so a daily digest fires at 8am *their* time), `quiet_hours_start` (number, 0–23), `quiet_hours_end` (number, 0–23), `quiet_hours_enabled` (yes/no, default no), `event_preferences` (list of notification_event_preference), `unsubscribe_token` (text — long random, generated once).

Build the quiet-hours fields now even though quiet hours are v2 behaviour. Adding fields to a populated type later is more annoying than carrying four unused ones.

### 3. `notification_event_preference` — new, per-event channel override

`company`, `property`, `preferences` (→ notification_preferences, the parent), `event_type` (OS - Notification Event Type), `in_app` (yes/no), `email` (yes/no), `push` (yes/no).

Only created when the user deviates from the event's defaults. Absence means "use the default" — do not pre-create hundreds of rows per user.

### 4. `notification_subscription` — new, watch/follow

`company`, `property`, `user` (the watcher), `entity_type` (OS - Notification Entity Type), `entity_id` (text), `muted` (yes/no — stay subscribed but stop being notified).

Auto-create on: creating a Thing, being assigned a Thing, assigning a Thing to someone else, commenting, being @mentioned. Users can unwatch from the entity view or from a watch list in their preferences.

### 5. `notification_email_template` — new

`template_key` (text — matches the event type's Template Key attribute), `company` (nullable: empty = global default, set = tenant override), `language` (text, ISO code, default `en`), `subject_template` (text), `body_template` (long text), `cta_label` (text), `cta_url_pattern` (text), `version` (number, incremented on save), `last_edited_by` (User), `last_edited_date` (date), `is_active` (yes/no).

Template lookup falls back in this order, and the last step always exists so a send can never fail on a missing template:
1. key + this company + this language
2. key + this company + `en`
3. key + no company + this language
4. key + no company + `en` (the global default — seed these)
5. a hardcoded string in the workflow, which also logs an error

`property` on this one is nullable — templates are company-scoped, not property-scoped, and global defaults have no company at all. That's the one deliberate Pattern A exception in this build; note it in your report.

### 6. `notification_device` — new, mobile push registration (build now, dormant until the app ships)

`company`, `property`, `user` (owner), `platform` (OS - Device Platform: ios / android / web), `push_token` (text — the APNs/FCM device token), `device_name` (text, optional — "Vlad's iPhone"), `is_active` (yes/no, default yes), `last_seen_date` (date), `registered_date` (date).

There's no mobile app yet, so nothing populates this today. Build it anyway so the day the iOS/Android app exists, it registers a device by creating one row here, and the delivery workflow already knows what to do with it (see **Push channel** below). One user can have multiple active devices (phone + tablet); a token can go stale (app deleted, token rotated) — that's what `is_active` and `last_seen_date` are for, not a hard delete.

### 7. `notification_company_policy` — new, one row per Company (tenant-level override layer)

`company`, `forced_on_events` (list of OS - Notification Event Type — events the tenant requires regardless of individual opt-out, where `allow_opt_out` on the event itself still permits it), `disabled_channels` (list of OS - Notification Channel — channels this tenant has switched off entirely, e.g. a property that disallows push to personal devices), `default_digest_frequency` (OS - Digest Frequency — what new users start with), `created_by` (User), `last_edited_by` (User), `last_edited_date` (date).

One row per Company, created lazily (first time an admin touches notification settings, or seeded blank at company creation — your call). No `property` field on this one **on purpose** — policy is set at the tenant level, not per property, because it's the company's compliance officer setting rules across their whole operation, not a single floor. If a future request needs per-property overrides, that's a deliberate v2 addition, not something to guess into this build.

### 8. `notification_delivery_record` — new, compliance-safe audit trail (no content)

`company`, `property`, `recipient` (User), `event_type` (OS - Notification Event Type), `entity_type` (OS - Notification Entity Type), `entity_id` (text), `channels_delivered` (list of text), `delivered_date` (date), `read_date` (date, nullable — synced from the Notification row when it's read, so an auditor can see not just "sent" but "opened").

Written by `deliver_to_user` **only** when the event type has `compliance_relevant = yes` — not for every notification, that would just be a shadow copy of the whole table and defeat the point of keeping it lean. Contains **zero message content** — no title, no snippet, no cta_url. It exists to answer "who was told about this and when," never "what exactly did it say."

### 9. Add to the existing `User` type

`unread_notification_count` (number, default 0) and `notification_preferences` (→ notification_preferences).

---

## Option sets

Populate the two empty ones and create four new ones.

### `OS - Notification Event Type` — the event catalog

Add these attributes:

| Attribute | Type | Purpose |
|---|---|---|
| `event_code` | text | Machine id, e.g. `task.assigned`. Lowercase, dot-separated, `noun.verb_past_tense`. |
| `label` | text | Human label, e.g. "Task assigned to you". |
| `description` | text | **Max 80 characters.** Shown in the preferences UI. |
| `module` | OS - Module | Groups events in the preferences UI and on the inbox filter. |
| `default_in_app` | yes/no | |
| `default_email` | yes/no | |
| `default_push` | yes/no | |
| `severity` | text | info / warning / critical |
| `allow_opt_out` | yes/no | No = mandatory, shows locked in the UI. |
| `batch_window_minutes` | number | 0 = never batch, send immediately. |
| `template_key` | text | Matches the email template. |
| `is_active` | yes/no | Retire an event without deleting it. |
| `compliance_relevant` | yes/no | Default no. Yes = `deliver_to_user` also writes a `notification_delivery_record`. Only flag events where "prove this was delivered" is a real audit question — role changes, permission grants, compliance escalations. Not every event needs this. |
| `escalate_after_minutes` | number | 0 = no escalation. Reserved for v2 — see note below. Build the field now so the schema doesn't change shape later. |
| `escalate_to_role` | OS - Permission | Who to notify if it's still unread after the escalation window. Reserved for v2, same reasoning. |

**Keep the description short and add no other long-text attributes.** Bubble ships the entire option set to the browser as JavaScript on every single page load, and this catalog will grow toward 400+ values as the remaining modules land. Lean attributes are the price of keeping the catalog as an option set instead of a database table. If it ever passes ~400 values, flag it to me — at that point it should move to a data type.

Seed this starter catalog (enough to prove the system; the rest arrive as modules are built):

| event_code | label | module | severity | opt-out | window | default channels |
|---|---|---|---|---|---|---|
| `task.assigned` | Task assigned to you | tasks | info | yes | 5 | in-app + email |
| `task.completed` | Task completed | tasks | info | yes | 10 | in-app |
| `task.due_soon` | Task due soon | tasks | warning | yes | 0 | in-app + email |
| `task.overdue` | Task overdue | tasks | warning | yes | 15 | in-app + email |
| `task.comment_added` | Comment on a task you follow | tasks | info | yes | 3 | in-app |
| `report.created` | Report created | reporting | info | yes | 15 | in-app |
| `report.verified` | Report verified | reporting | info | yes | 10 | in-app + email |
| `report.sent` | Report sent to you | reporting | warning | yes | 5 | in-app + email |
| `report.closed` | Report closed | reporting | info | yes | 10 | in-app |
| `report.comment_added` | Comment on a report you follow | reporting | info | yes | 3 | in-app |
| `user.role_changed` | Your role changed | users | critical | **no** | 0 | in-app + email |
| `user.permission_granted` | Permission granted | users | critical | **no** | 0 | in-app + email |
| `user.permission_revoked` | Permission revoked | users | critical | **no** | 0 | in-app + email |
| `user.account_deactivated` | Your account was deactivated | users | critical | **no** | 0 | in-app + email |
| `user.password_reset` | Your password was reset | users | critical | **no** | 0 | email |
| `user.mentioned` | You were mentioned | core | info | yes | 3 | in-app + email |
| `system.announcement` | System announcement | core | warning | yes | 0 | in-app + email |

Mark `user.role_changed`, `user.permission_granted`, `user.permission_revoked`, and `user.account_deactivated` as `compliance_relevant = yes`. Leave the rest no.

**Escalation is a reserved field, not a built feature in this pass.** `escalate_after_minutes` and `escalate_to_role` exist on the event type so the schema is ready, but do not build the escalation workflow itself now — that's a genuinely separate scheduled job (find unread notifications past their escalation window, notify the fallback role) and it's scope creep for this build. Leave every seed value at `escalate_after_minutes = 0`. Note it in your report as a clearly-scoped v2 item, not something you half-built.

### `OS - Notification Entity Type`

Seed with the entities that exist or are imminent: `report`, `task`, `subtask`, `user`, `role`, `employee`, `guest`, `comment`, `info_board_item`, `audit_run`, `property`, `company`, `system`. Add an `app_route` text attribute holding the URL fragment for that entity type so `cta_url` can be built generically instead of with a branch per type.

### `OS - Notification State` — new

`unread` (Unread), `seen` (Seen), `read` (Read), `archived` (Archived). Add a `sort_order` number attribute.

### `OS - Notification Channel` — new

`in_app` (In-app), `email` (Email), `push` (Push).

### `OS - Notification Email Status` — new

`pending`, `scheduled`, `sent`, `failed`, `skipped`.

### `OS - Digest Frequency` — new

`realtime` (Real-time), `daily` (Daily digest), `weekly` (Weekly digest), `off` (Off). Add `interval_minutes` as a number attribute.

### `OS - Device Platform` — new

`ios` (iOS), `android` (Android), `web` (Web push). Used by `notification_device`. Add now even though only `web` (browser push, also dormant) is remotely reachable today — the point is the schema doesn't change shape when the native apps arrive.

### `OS - Permission` — add notification permissions

Add a `notifications` value to `OS - User Permission Modules` first if it isn't there, then add these permissions with `user_permission_module = notifications`:

- `manage_notification_events` — edit the event catalog and the company's notification policy (`is_sensitive` = yes)
- `manage_notification_templates` — edit company email templates (`is_sensitive` = yes)
- `send_system_announcement` — broadcast to all users at a property or company (`is_sensitive` = yes)
- `view_notification_delivery_records` — view compliance delivery proof for their company + property (`is_sensitive` = yes)

Regular users need no permission to see their own notifications — that's what the recipient privacy rule is for.

---

## Backend workflows

Nine workflows. Keep the entry point thin and push per-recipient work into scheduled children — a workflow that loops synchronously over a large recipient list will time out.

### `trigger_notification` — the single entry point every module calls

Parameters: `event_code` (text) · `entity_type` (OS - Notification Entity Type) · `entity_id` (text) · `actor` (User) · `recipients` (list of Users, optional) · `recipient_roles` (list of OS - Permission, optional) · `company` (Company) · `property` (Property) · `title_override` (text, optional) · `context_1` … `context_4` (text, optional — values that get substituted into the template, e.g. a report number).

`recipients` and `recipient_roles` are both optional but at least one must resolve to someone, or the workflow exits with nothing to do. `recipient_roles` exists because a lot of ops notifications aren't addressed to named people — "notify the Surveillance shift supervisors at this property" — and the calling module shouldn't have to hand-write that lookup every time it fires an event.

Logic:
1. Look up the event type by `event_code`. If it isn't found, or `is_active` is no, exit silently and log — a missing event must never break the calling module's workflow.
2. If `recipient_roles` is non-empty, search `User` where `property = property` and the user's role (via the `permission_groups` Role relationship) is in `recipient_roles`, and add those to the recipient list alongside any explicit `recipients`. This is a same-property search only — role-based targeting never crosses properties, same as everything else in this app.
3. Search `notification_subscription` for `entity_type` + `entity_id` where `muted` is no, and add those users to the recipient list.
4. Remove the actor from the list. Nobody gets notified about their own action.
5. `:unique elements` on the list.
6. Schedule `deliver_to_user` on that list — use "Schedule API workflow on a list", not a recursive workflow. Schedule-on-a-list runs in parallel, finishes faster, and costs less workload because it doesn't pay a rescheduling action per item. Recursive is only correct when you need sequential order or per-cycle state, and this doesn't.

That's the whole contract. Every module calls exactly this, with the same parameters, forever.

### `deliver_to_user` — one run per recipient

1. Load the recipient's `notification_preferences`. If it doesn't exist, create it with defaults, then continue. Load the recipient's company's `notification_company_policy`, if one exists.
2. Work out the active channels using the precedence order from the architecture section above: mandatory event → company-forced-on → company-disabled-channel → user's per-event override → user's global toggle / muted module → event default.
3. If no channels survive, exit **without creating a row.** A muted user shouldn't accumulate invisible database records.
4. Build the `dedupe_key`. Search for an existing notification with that key that is still `unread`. If one exists, append `entity_id` to `related_entity_ids`, increment `group_count`, refresh the modified date, **and do not reschedule the email.** Exit.
5. Otherwise create the notification. Set `state = unread`, denormalize `module` and `severity` from the event type, render `title` and `body_preview` (actor-verb-object; nothing sensitive), build `cta_url` from the entity type's `app_route` plus `entity_id`.
6. Increment the recipient's `unread_notification_count` by 1.
7. If the event type has `compliance_relevant = yes`, also create a `notification_delivery_record`: recipient, event_type, entity_type, entity_id, `delivered_date = now`. No title, no content.
8. If email is an active channel: set `email_status = scheduled`, set `email_scheduled_send_date` to `now + batch_window_minutes`, and schedule `send_notification_email` for that time.
9. If push is an active channel: search `notification_device` for `user = recipient` and `is_active = yes`. If none exist, skip — nothing to do yet, this is the normal case until the mobile app ships. If any exist, schedule `send_notification_push` for the same time as the email (or immediately if `batch_window_minutes = 0`).

Put a condition on the **event step** rather than on each action wherever you can — halting at the event is cheaper than evaluating conditions action by action, and conditions cost workload even when they return false.

### `send_notification_email` — scheduled, one per email

1. Load the notification. If it's deleted, or its `state` is no longer `unread`, exit and set `email_status = skipped`. Someone reading a notification in-app before the email fires should not then get the email.
2. Check-on-fire guard: if `email_scheduled_send_date` doesn't match this run's scheduled time, exit. Cheap insurance against duplicate scheduling.
3. Resolve the template through the fallback chain above.
4. Substitute placeholders. Support at minimum `{recipient.first_name}`, `{recipient.full_name}`, `{actor.name}`, `{entity_id}`, `{company.name}`, `{group_count}`, `{context_1}`–`{context_4}`.
5. If `group_count > 1`, render the batched variant ("12 reports were verified in the last 10 minutes") rather than the single variant.
6. Send. Set `email_sent_date` and `email_status = sent`, or `failed` plus `email_failure_reason` on error. Append the channel to `channels_delivered`.

**Failure must never be silent.** A failed email leaves a `failed` status and a reason on the row, and the in-app notification still stands on its own.

### `notification_nightly_maintenance` — scheduled daily

Three jobs, run as one recurring workflow:
- **Archive old reads:** `state = read` and `severity ≠ critical` and modified more than 30 days ago → set `state = archived`, stamp `archived_date`.
- **Delete old archives:** `state = archived` and `severity ≠ critical` and modified more than 90 days ago → delete. Critical rows are kept for 365 days from creation, then deleted.
- **Reconcile counters:** recompute `unread_notification_count` for users whose count is non-zero, so drift from crashes or manual edits self-heals.

Process these in **capped batches — 200 rows per cycle, ~10 seconds between cycles, stop when the search returns nothing.** An uncapped delete over an unbounded search is exactly how a nightly job eats a month of workload in one night, and it's also how it times out. Cap it and let it take several cycles.

### `notification_unsubscribe` — public API endpoint

Takes a `token` and an optional `event_code` or `module`. Looks up `notification_preferences` by `unsubscribe_token`, applies the opt-out, and returns a confirmation. Must work **without login** — the whole point is that it works from an email client. The token is long and random; do not accept a user id.

Build this now even though the email provider isn't wired yet, because once it is, one-click unsubscribe headers point straight at it.

### `send_notification_push` — scheduled, one per device fan-out (build now, stub the actual send)

1. Load the notification. Same exit conditions as `send_notification_email`: deleted or no longer `unread` → exit.
2. Search `notification_device` for `user = recipient` and `is_active = yes`.
3. For each active device, this is where a real implementation calls FCM (Android/web) or APNs (iOS) with the device's `push_token`, the notification's `title`/`body_preview`, and `cta_url` as the deep-link payload. **There is no push provider connected yet and no mobile app to receive it** — stub this action as a no-op that still writes the bookkeeping: append `push` to `channels_delivered`, stamp a `push_sent_date` if you add one, and log clearly in the workflow's comment that this step needs a real FCM/APNs integration (API Connector or a Bubble push plugin) before it does anything visible. Do not fail the workflow — a stub that no-ops safely is correct here, not an error.
4. If a provider ever reports the token invalid (410/unregistered), set that `notification_device` row's `is_active = no` rather than deleting it — same "soft-expire, don't delete" pattern as email failures.

### `notification_register_device` / `notification_deregister_device` — public-facing API endpoints, build now

`notification_register_device` takes `user`, `platform`, `push_token`, `device_name` (optional). Upserts a `notification_device` row — if a row already exists for that exact `push_token`, update it (reactivate, refresh `last_seen_date`, reassign `user` if the device changed hands) rather than creating a duplicate. This is the endpoint a future iOS/Android app calls once, right after the user grants push permission and the OS hands back a token.

`notification_deregister_device` takes `push_token`, sets `is_active = no`. Called on logout or uninstall.

Neither endpoint requires the email/push provider to exist. They're pure bookkeeping and cost nothing to have ready — build them so the mobile app, whenever it ships, has a stable contract to call into on day one instead of waiting on a backend change.

### `trigger_company_announcement` — admin broadcast, gated by permission

Parameters: `company` · `property` (optional — empty means every property in the company, set means one property only) · `title` · `body` · `severity` (default warning).

Callable only by a user holding `send_system_announcement`. Resolves recipients as every active User in scope (property, or every property in the company), then calls `trigger_notification` with `event_code = system.announcement`, `actor` = the sending admin. This is the concrete workflow behind the `system.announcement` event already in the seed catalog — a company admin broadcasting to their whole team, not a mass-marketing tool. Don't build a scheduling/campaign layer on top of this; it's a one-shot "notify everyone now" action.

---

## Privacy rules

Right now `notification` has no privacy rules and is publicly readable. Fix all eight types:

- **notification** — view only when `This Notification's recipient = Current User`. No admin override, none. If someone needs an audit trail, that's the ActivityLog's job, not this table; an admin reading "your permission request was rejected because…" out of someone else's inbox is a privacy incident. Create is backend-only. The recipient may edit `state`, `read_date`, `seen_date`, `archived_date` and nothing else.
- **notification_preferences** — view/edit only when `This Thing's user = Current User`. Created by backend on signup.
- **notification_event_preference** — view/edit only when `This Thing's preferences's user = Current User`.
- **notification_subscription** — view/edit when `This Thing's user = Current User`. Admins with a suitable permission may view (not edit) subscriptions within their own company and property, so "who is watching this record" is answerable.
- **notification_email_template** — readable by any logged-in user of the matching company (or where company is empty), since sends need to render it. Editable only by users holding `manage_notification_templates`.
- **notification_device** — view/edit only when `This Thing's user = Current User`. Create via the register endpoint (backend, ignoring privacy rules since the device isn't authenticated as a full session yet at registration time) or by the owning user directly. A push token is a credential — treat this table with the same care as a password field, never expose it in any search result other than the owner's own.
- **notification_company_policy** — view for any logged-in user of the matching company (so `deliver_to_user` and the preferences UI can show "your admin requires this" messaging without a privacy-rule workaround). Edit only by users holding `manage_notification_events` **and** matching company — this is tenant-level configuration, not personal settings, so it needs its own explicit gate. No `property` clause on this one (see the data model note — it's intentionally company-scoped only).
- **notification_delivery_record** — view for users holding a new permission `view_notification_delivery_records`, scoped to their own company + property. No content fields exist on this type to leak, but it still shouldn't be open to every logged-in user — delivery metadata (who was notified, when) is itself sensitive in an HR/compliance context. Create is backend-only.

Every one of these rules gets the company + property clause as its first condition, per Pattern A, except the two noted above where property genuinely doesn't apply. Also add the company/property clause to the recipient rules — recipient alone is sufficient logically, but the tenancy clause is the project standard and it costs nothing.

Note as you go: backend workflows in this app widely run with "ignore privacy rules". That's expected for the delivery pipeline — it must write rows for users who can't yet see them — but do **not** turn that flag on for anything that reads notifications back out.

---

## Email channel

There is no email provider configured. `use_sendgrid` is true but unverified, and there's no API Connector entry for any mail service.

Do this: build `send_notification_email` so **the actual send is the last action and the only provider-specific part.** Use Bubble's native send-email action as the interim implementation. Everything upstream — template resolution, placeholder substitution, batching, status tracking — is provider-agnostic, so swapping in Postmark or SendGrid via the API Connector later is a one-action change instead of a rewrite.

Set the pipeline up so that swap is genuinely easy, because it's coming:

- These are **operational/transactional** emails, which are exempt from the legal unsubscribe requirement — but every one still gets a "Manage notification preferences" link in the footer, and the unsubscribe endpoint above. Preference-centre access is the single most effective thing for keeping people from marking your mail as spam, and complaint rate is what actually determines whether your mail lands.
- Gmail and Yahoo require RFC 8058 one-click unsubscribe (`List-Unsubscribe` and `List-Unsubscribe-Post` headers) for bulk senders, and Gmail moved to hard enforcement in late 2025. Bubble's native send action can't set custom headers, so this lands with the provider swap. Build the endpoint now, note the header requirement in the workflow's comment.
- Batching is a deliverability control as much as a UX one. Fifty separate emails to one recipient in one minute reads as a spam burst and can throttle the whole sending domain, not just that user.
- The email body carries **no sensitive data** — subject and body are actor-verb-object plus a deep link into the app. Nothing that leaks if the mailbox is compromised or the recipient forwards it.
- Note in your report that the domain still needs SPF, DKIM, DMARC and a dedicated sending subdomain before any real send. That's my job, not yours, but I want it on the record.

---

## Push channel

There is no mobile app and no push provider connected yet — build the data model and delivery plumbing described above (`notification_device`, `notification_register_device`, `notification_deregister_device`, `send_notification_push`) so that when the iOS/Android app arrives, turning push on is: (a) the mobile app calls `notification_register_device` once per install, (b) someone wires FCM/APNs credentials into `send_notification_push`'s stubbed send action via an API Connector call or a Bubble push plugin, (c) done — no schema change, no change to `trigger_notification` or `deliver_to_user`, because they already treat push as a channel exactly like email.

A few things to get right now so that day goes smoothly:

- **Respect the same preference and mute rules as every other channel.** Push is not special-cased — it reads `global_push_enabled`, `muted_modules`, and per-event `push` overrides exactly like email does. A user who muted a module must not start getting push just because a phone got registered.
- **Payload discipline matches email:** the push payload is `title` + a short body — never the underlying record's content, same actor-verb-object rule, because push notifications render on a lock screen where anyone standing nearby can read them. This is a stronger reason for the "nothing sensitive in the title" rule than email even is.
- **Multiple devices per user is normal**, not an edge case — don't build assuming one device per user.
- **Token lifecycle is soft-expire, not delete**, as noted above. Deleting rows on the first bounce loses the device silently; flipping `is_active` keeps history and lets a future retry logic exist.
- Note in your report that mobile push, when it's time, will also need: Apple Push Notification service certificates/keys (APNs), a Firebase project for Android + Web (FCM), and a Bubble plugin or direct API Connector calls to reach both. That's a separate piece of work outside this build.

---

## UI — clone, don't invent

**This is the part I care most about — read this section twice.** Do not build these screens from scratch. Clone the existing ones, strip what doesn't apply, and adapt the skeleton. The notification screens must be **indistinguishable** from the rest of the app: same tokens, same styles, same spacing, same naming conventions, same interaction patterns.

**Reuse rule, absolute:** before you build *any* control — a dropdown, a date picker, an avatar, a chip, a toggle, a confirmation popup — search the app's existing reusable elements for one that already does it. This app has 534 reusable elements including a large family of pre-built dropdowns (`DD <Thing> - Multyselect Chips (Fuzzy)`, `DD <Thing> - Multyselect (Server)`, `DD <Thing> - Single Select (Server)` and many more), `# Avatar - User`, `PP - Confirmation`, `DT - Date Range Picker`, `Toggle - Relative Date Picker`, and status toggles. **Use the existing one.** Only build something new if you have genuinely searched and nothing fits — and when you do, say so explicitly in your report with the name of what you built and what you searched for first. A one-off bespoke dropdown that looks 95% like the existing ones is a defect, not a shortcut.

### 1. The inbox — clone `# User Management`

`# User Management` (reusable id `bpwyhp`, 529 elements) is the newest and best-built module in the app. **Duplicate the whole reusable** and adapt it — do not hand-rebuild its skeleton. Its structure, which you are keeping essentially intact:

- `G UM Main` — the wrapper for everything
- `G UM Topbar` — breadcrumbs (`G UM Crumbs`: "Admin › Users") + `G UM Topbar Right` holding `BTN UM KPI Toggle`, `BTN UM Fullscreen`, and the primary action button
- `G UM AppHead` — `G UM Controls` (search, view toggle, filter dropdowns) + `G UM KPIs` (7 KPI tiles) + a collapsible `BTN UM Overview` summary
- `G UM Chips` — active-filter chips with individual close buttons and a `BTN UM Reset All`
- `G UM ListScroll` — the four view containers plus `G UM Empty`
- `G UM Footer` — `TXT UM Footer Count` on the left, pager (`BTN UM Pager Prev/1/2/3/Next`) on the right
- `FG UM Drawer` + `FG UM Scrim` — the slide-in detail drawer
- `FG UM Toast` — an in-module toast
- `HTML UM Mobile CSS` — the responsive rules

Name the clone `# Notifications`. Follow the app's existing element-naming convention exactly, swapping the `UM` infix for `NT`: `G NT Main`, `G NT Topbar`, `G NT AppHead`, `G NT Controls`, `G NT KPIs`, `G NT ListScroll`, `G NT Footer`, `FG NT Drawer`, `FG NT Scrim`, `RG NT List`, `BTN NT View Table`, and so on. Consistency here is not cosmetic — it's how the app stays navigable.

**The four view modes — keep all four, this is a hard requirement.** User Management drives them off a `view_mode` custom state (text, default `"list"`), toggled by `G UM ViewTog`, which contains four segments — `G UM View Seg list`, `G UM View Seg card`, `G UM View Seg table`, `G UM View Seg det` — each an icon + text pair (`ICO UM View list` / `BTN UM View List`, etc.). Each segment sets `view_mode` and the four containers show conditionally:

| view_mode | Container | Notification content |
|---|---|---|
| `list` | `RG UM List` → `RG NT List` | Default. One compact row per notification: unread dot, severity colour, module icon, title, snippet, relative time. |
| `card` | `RG UM Cards` → `RG NT Cards` | Larger tiles — actor avatar (use `# Avatar - User`), title, snippet, module chip, time, quick actions. |
| `table` | `G UM Table` (`RG UM Table` + `G UM Table Head`) → `G NT Table` | Dense grid with a sticky header: State, Severity, Module, Event, Title, Actor, Date. This is the view someone uses to audit a month of activity. |
| `det` | `RG UM Det` → `RG NT Det` | Detailed rows — everything from list, plus the full body preview, the delivery channels that fired, and the entity deep link inline. |

Replicate the toggle's exact visual treatment — same segment group, same icon-plus-label pairing, same active/inactive styling driven by `view_mode`. Do not invent a different control.

Then adapt:
- **Strip** every user-CRUD workflow, `FG UM Create` (create-user popup), `FG UM OneTimePW`, and all user-specific fields, dropdowns and filters.
- **Drop the permission gate** (`G UM NoAccess`, `PP - Access Denied UM`) — every user sees their own notifications, there is nothing to gate.
- **Custom states** become: `view_mode` (text, default `"list"` — keep this name), `page_no` (number, default 1), `kpi_filter`, `state_filter`, `module_filter`, `severity_filter`, `kpis_hidden`, `stats_open`, `drawer_open`, `selected_notification` (notification), plus a `bulk_selection` (list of notification) for the bulk actions.
- **Repeating group source** for all four views: `Do a search for notification` constrained by `recipient = Current User`, sorted by Created Date descending. **Every constraint goes in the search itself, never `:filtered` afterwards** — `:filtered` downloads the whole set and throws most of it away. The recipient constraint is always present, non-negotiable.
- **KPI tiles** (`G UM KPI 1`–`7` → reuse the same tile structure): Unread, Seen, Read, Archived, Critical, This Week, Total. Each click-to-filter, setting `kpi_filter`, exactly as User Management does.
- **Filter controls** in `G NT Controls`: search input (same as `G UM Search`), the view toggle, then module / event-type / state / severity dropdowns and a date-range picker — **using the existing dropdown and date-picker reusables**, not new ones. If an `OS - Module` multiselect-chips dropdown already exists, use it.
- **Filter chips** — keep the `G UM Chips` pattern exactly: one chip per active filter with a close button, plus Reset All.
- **Bulk actions**: Mark selected read, Archive selected, Delete archived, Mark all read. Route destructive ones through the existing `PP - Confirmation` reusable.
- **Row anatomy** (list view): unread dot, severity colour accent, module icon (from the module's `icon_code`), title, snippet, relative timestamp — use the **Relative Time with Moment.js** plugin that's already installed. When `group_count > 1`, append "and N more".
- **Clicking a row** marks it read, decrements the counter, verifies the target still exists and is still visible to this user, then navigates to `cta_url` — or shows "This item is no longer available". If a matching `notification_delivery_record` exists, stamp its `read_date` too.
- **Unread rows are distinguished by more than colour** — a dot plus a font-weight change — so it works for colour-blind users and in both themes.
- **Empty state** (`G UM Empty` → `G NT Empty`): keep the icon + message pattern, with copy appropriate to the active filter ("No unread notifications" vs "No notifications match these filters").
- **Keep the drawer.** `FG UM Drawer` becomes `FG NT Drawer`: clicking a row opens the full notification detail — event type, actor, full body, all timestamps (created/seen/read), which channels delivered, and a button through to the linked record. Same scrim, same slide-in, same close button.
- **Keep `HTML UM Mobile CSS`** and adapt it — the module must stay responsive exactly like User Management does.

Finally, repoint the `# notifications` custom element inside the `Pages` floating group at this new reusable instead of the `# dashboard` placeholder it currently references, and set its `OS - Module` condition to the existing `notifications` value.

### 2. The bell — clone `GF - User Menu`, place it in `# Sidebar`

**Where it goes.** There is no separate page header in this app — the persistent chrome is `# Sidebar` (reusable `bTxnv`), which has three top-level groups: `Logo`, `Main` (the nav), and `Footer`. The `Footer` group already holds `GF - User Menu A` (a custom element pointing at the `GF - User Menu` reusable) and a `Mobile CSS` HTML block. **Put the bell in that same `Footer` group, immediately beside `GF - User Menu A`.** Because `# Sidebar` renders on every module, that gives you the bell on every page without touching a single module — which is exactly the requirement. Do not add a bell per module, and do not create a new header bar.

**What to clone.** `GF - User Menu` (reusable `bUFcl`, 60 elements) is the app's existing "click a thing in the sidebar footer, get a floating panel" pattern. Clone it as `# GF - Notification Bell` and keep its open/close mechanics, its floating-group positioning logic, its scrim/outside-click behaviour, and its visual treatment. You are changing the contents, not the pattern.

- Bell icon (the `bell` icon code, matching the `OS - Module` `notifications` value) with an unread count badge; cap the display at "99+", hide the badge entirely at zero.
- The badge reads `Current User's unread_notification_count`. **Do not put a live search behind it, and do not build a polling/refresh workflow for it either.** Bind the badge text directly to that field — Bubble syncs changes to the Current User's own fields to the page automatically with no refresh action. Binding directly gets real-time-feeling updates for free; a "refresh every 30 seconds" workflow on top would be pure wasted workload.
- Opening the panel sets every `unread` row currently displayed to `seen` and clears the badge — **without** marking them read.
- Body: the 15 most recent notifications, newest first. Fifteen, hard-capped, so the query cost stays constant no matter how many thousands the user has accumulated.
- Tabs: Unread / All.
- Row anatomy matches the inbox list row (unread dot, severity, module icon, title, snippet, relative time) so the two never look like different products.
- Footer: "View all" → the notifications module, and a gear icon → notification preferences.
- Empty state with a real message, not a blank panel.

### 2b. Toast notifications — new `#FG - Notification Toast`, anchored top-right

New notifications pop as a toast in the **top-right** corner while the user is working.

**Important — the existing `Toast` floating group on the `app` page is centered, not right-aligned** (`floating_reference: "top"`, `floating_reference_horizontal_resp: "center"`, width 320). Do not repurpose or reposition it — other things use it. Build a separate `#FG - Notification Toast` anchored top-right, and **copy its visual styling exactly** so the two are visibly the same component family:

- background: `var(--color_primary_default)` (the same token binding the existing toast uses — do not substitute a literal colour)
- border: 1px solid, using the app's `Border Default` token
- border radius: 12
- box shadow: outset, 0 horizontal / 8 vertical / 30 blur / -2 spread, `rgba(0,0,0,0.35)`
- width: 320
- `collapse_when_hidden: true`, `is_visible: false` by default

Behaviour:
- Fires for a newly arrived notification while the user is on the page. Severity drives the accent: `info` → `Accent`, `warning` → `Warning`, `critical` → `Error`, using tokens.
- Content: module icon, title, one-line snippet, and a close button. Clicking the body does exactly what clicking an inbox row does (mark read, verify target, navigate). Clicking close dismisses without marking read.
- Auto-dismiss after ~5 seconds for `info` and `warning`. **`critical` does not auto-dismiss** — it stays until the user acknowledges it. Someone whose role just changed should not miss it because they looked away.
- Stack downward if more than one arrives, newest at top, and cap the visible stack at 3 — beyond that, the bell badge is the overflow indicator. Do not let toasts cover the screen.
- Never show a toast for a notification the user has already seen in this session, and never for one they triggered themselves (the actor is already excluded upstream, but don't re-introduce it here).
- Respect `global_inapp_enabled` — a user who turned in-app notifications off gets no toasts.
- The toast must be reachable by screen readers (aria-live) and dismissible by keyboard, not mouse-only.

Place this floating group on the `app` page alongside the existing `Toast` FG so it is available across every module, the same way the sidebar bell is.

### 3. Preferences — clone `# Casino Settings`

`# Casino Settings` (267 elements) is the app's tabbed settings-panel pattern. Clone it as `# Notification Preferences` (or add it as a tab inside Casino Settings if that fits the existing navigation better — your call, tell me which you did).

Layout:
- Master toggles at the top: In-app / Email / Push. Push is visible but disabled with a tooltip reading "Available when the mobile app launches."
- Digest frequency dropdown: Real-time / Daily / Weekly / Off.
- Then one collapsible section per module — collapsed by default — showing the module name, its event count, and a mute-whole-module toggle.
- Inside each section, one row per event: label, short description, and In-app / Email / Push checkboxes.
- Events where `allow_opt_out` is no render with a lock icon and disabled, always-checked boxes.
- Events forced on by the company's `notification_company_policy` render the same locked state, but the tooltip says "Required by your organization" instead of the generic lock — the user should be able to tell the difference between "this is inherently critical" and "your admin turned this on for everyone."
- If a channel is disabled company-wide, hide that column entirely for the affected events rather than showing a checkbox the user can toggle and have silently ignored — a control that visibly does nothing is worse than no control.
- **Auto-save on toggle** with an inline toast confirmation — no Save button. The app already has toast plugins installed (Ultimate Toast Notifications, Bubble Toast, Alert-Toast-Message-Notify-BEP); use whichever the app already uses elsewhere rather than adding a fourth.
- A "Watching" tab listing the user's `notification_subscription` rows with an Unwatch action on each.
- Only write an `notification_event_preference` row when a user actually deviates from a default. Absence means default.

Use the existing sidebar/module conventions throughout: 256px sidebar, active state is background + text colour with **no border**, section headers uppercase 11px/700 in `Text Muted`.

---

## Cleanup while you're in there

1. `OS - User Notification Type` — mark deleted. Legacy, superseded by the event catalog.
2. Confirm nothing still references the soft-deleted `user_notification` data type; if something does, unhook it.
3. Remove `notification`'s `report` and `task` foreign keys once `entity_type` + `entity_id` is in place.
4. Fix the `is_read` field's wrong option-set reference by replacing it with `state`.
5. Flip the `OS - Module` `notifications` value's `status` from `on_roadmap` to whatever the app uses for a live module, once the UI is wired.
6. Do **not** touch anything else. Leave the other 105 data types, the report/task/employee modules, and the existing 29 backend workflows alone. If you find something broken outside this scope, write it in your report — don't fix it.

---

## Build it in this order, one apply per step

Plan mode first — inventory, then this plan with your corrections, then wait for me.

1. Create the five new option sets (State, Channel, Email Status, Digest Frequency, Device Platform).
2. Add the attributes to `OS - Notification Event Type` and `OS - Notification Entity Type`, and seed the entity types.
3. Seed the 17 starter event-type values, including the `compliance_relevant` flags and the reserved-but-zeroed escalation fields.
4. Restructure the `notification` data type (add new fields, remove dead ones).
5. Create `notification_preferences` and `notification_event_preference`.
6. Create `notification_subscription`.
7. Create `notification_email_template` and seed global `en` defaults for all 17 events.
8. Create `notification_device`.
9. Create `notification_company_policy`.
10. Create `notification_delivery_record`.
11. Add `unread_notification_count` and `notification_preferences` to `User`; add the notification permissions (including `view_notification_delivery_records`) to `OS - Permission`.
12. Privacy rules on all eight types.
13. `trigger_notification` (with role-based targeting).
14. `deliver_to_user` (with the company-policy precedence and delivery-record write).
15. `send_notification_email` + the `notification_unsubscribe` endpoint.
16. `send_notification_push` (stubbed send) + `notification_register_device` + `notification_deregister_device`.
17. `trigger_company_announcement`.
18. `notification_nightly_maintenance`.
19. The bell (clone `GF - User Menu` → `# GF - Notification Bell`) placed in `# Sidebar`'s `Footer` group beside `GF - User Menu A` — bind the badge directly to the counter field, no polling.
20. `#FG - Notification Toast` on the `app` page, top-right, styled to match the existing `Toast` FG.
21. The inbox (duplicate `# User Management` → `# Notifications`) — **all four view modes working**, KPIs, chips, filters, pager, drawer, empty state. Repoint the `# notifications` custom element.
22. Preferences (clone `# Casino Settings`) — include the Push master toggle (disabled, tooltipped) alongside In-app/Email, and the company-policy-forced / company-disabled states.
23. Wire **one** pilot module end to end — Tasks. Fire `task.assigned` from the existing task-assignment workflow and prove the whole in-app + email chain works. Push has nothing to prove yet since there's no device to register — confirm instead that `deliver_to_user` correctly finds zero active devices and skips cleanly, without erroring.
24. Cleanup pass (the list above) and final report.

Steps 1–12 are schema; 13–18 are logic; 19–22 are UI; 23–24 prove and tidy. If a step fails validation, stop and fix that step — don't carry a broken step forward.

**On the UI steps specifically: do them as real clones.** Duplicating `# User Management` and adapting it is the instruction — if you find yourself creating elements one by one to approximate its layout, you have gone off-plan. Stop and clone instead.

---

## What "done" means

Go through this list explicitly in your final report and mark each pass or fail:

- [ ] A module can fire a notification with a single "Schedule API workflow" action and needs to know nothing about channels, preferences, batching, email, or push.
- [ ] A module can also target a role (e.g. "Compliance Manager") instead of an explicit user list, and get the same recipient, dedupe, and preference handling.
- [ ] All eight data types carry `company` and `property` except the two noted exceptions (`notification_email_template`, `notification_company_policy`), and every privacy rule checks both where it applies.
- [ ] A company policy that forces an event on overrides a user's personal opt-out for that event. A company policy that disables a channel wins even over a mandatory event's channel list.
- [ ] A `compliance_relevant` event produces a `notification_delivery_record` with no title/content, viewable only by someone holding `view_notification_delivery_records` — and its `read_date` gets stamped when the recipient actually opens it.
- [ ] `notification_device` exists, is privacy-locked to its owner, and `deliver_to_user` / `send_notification_push` handle the zero-devices case (today's reality) without erroring.
- [ ] `notification_register_device` and `notification_deregister_device` work end to end (create/reactivate a row, deactivate a row) even though nothing calls them yet.
- [ ] `trigger_company_announcement` works, gated by `send_system_announcement`, and reaches every active user in scope (one property or the whole company).
- [ ] `notification` is no longer publicly readable. Only the recipient can see their own rows. No admin override exists.
- [ ] Firing the same event twice for the same recipient and entity inside the batch window produces **one** row with `group_count = 2`, not two rows.
- [ ] A user who mutes a module gets **no row created at all** for that module's events — not a hidden one.
- [ ] A mandatory event (`user.role_changed`) delivers even to a user who has muted everything.
- [ ] The bell badge reads a stored counter, not a live search. Opening the dropdown clears the badge without marking anything read.
- [ ] Clicking a notification whose target was deleted shows "no longer available" instead of erroring or leaking.
- [ ] No `title` or `body_preview` contains record content — actor-verb-object only.
- [ ] The nightly maintenance job is batch-capped and cannot run away.
- [ ] The unsubscribe endpoint works without login, keyed on a random token.
- [ ] The inbox is a genuine clone of `# User Management` — same topbar/crumbs, KPI row, filter chips, controls, footer pager, drawer and mobile CSS structure, renamed `UM` → `NT`.
- [ ] **All four view modes work** — list, card, table, detailed — driven by a `view_mode` state off a four-segment toggle that matches `G UM ViewTog` exactly.
- [ ] The bell lives in `# Sidebar`'s `Footer` group beside `GF - User Menu A`, so it appears on every module without per-module work.
- [ ] Toasts appear **top-right**, styled identically to the existing `Toast` FG (320px, radius 12, same shadow, token background), auto-dismiss except `critical`, and stack no more than 3.
- [ ] No bespoke control was built where an existing reusable would have done — and every new element you did create is listed in the report with what you searched for first.
- [ ] No hex colour appears anywhere in the new UI; every element uses a named token or style.
- [ ] Both themes render correctly — check light as well as dark.
- [ ] The new module is responsive — it behaves like User Management does at mobile width, not just desktop.
- [ ] `task.assigned` fires end to end: task assigned → row created → badge increments → appears in dropdown and inbox → email scheduled → clicking opens the task.

Then tell me:

1. What you built, step by step, with the entity names you created or changed.
2. Every decision you made where I hadn't specified one, and why.
3. The deviations you were told to flag: the four-state lifecycle versus the spec's three, and the nullable `property` on `notification_email_template` and `notification_company_policy`.
4. Anything you found broken or worrying **outside** this scope — list it, don't fix it.
5. What's left before this can carry real traffic: the email provider swap, SPF/DKIM/DMARC, the FCM/APNs push provider integration once there's a mobile app, the escalation workflow (fields are reserved, logic isn't built), the remaining ~380 event types as modules land, and anything else you hit.
6. The exact places I'll most likely want to adjust — copy, defaults, batching windows, which events are flagged `compliance_relevant` — so I know where to look first.
