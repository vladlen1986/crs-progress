# Build the CRS notification system — end to end

Work on the **test** branch only. Never touch live.

Start in **Plan mode**. Read the app first, then give me a numbered build plan and wait for my go-ahead before you switch to Build mode. After that, build it **one step per change** — a savepoint before each step, and verify the step before moving to the next. Do not bundle steps.

I don't want questions back. Everything you need is in this message. Where something is genuinely ambiguous, pick the sensible option, do it, and write one line in your final report saying what you chose and why. The only thing you should stop for is something that would destroy data.

---

## What this app is

CRS (Casino Reporting Suite) — a multi-tenant, multi-property SaaS for casino operations, app `casinoreportingsystem`. 46 modules are planned; a handful are built. It's a single-page app: one page called `app`, and each module is a reusable element inside a floating group called `Pages`, shown/hidden by the URL path segment matched against the `OS - Module` option set.

Notifications is module #30, in the **Admin / Core** section. Core modules are always active regardless of subscription tier, so there is **no tier gate** on this one.

The point of this build: **every one of the 46 modules must be able to fire a notification by calling one backend workflow with the same parameters.** If a module has to know anything about email, batching, preferences or channels, the design has failed. I want to add a new module later and have notifications work by writing one action.

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

**Push and email are both "wire the pipe now, connect the tap later."** There is no mobile app yet and no verified email provider yet, but both are coming — iOS/Android native apps with push, and SendGrid once it's verified. Build the full data model, preference plumbing, and channel-routing logic for both channels now, exactly as if they were live, with only the final provider-specific send action stubbed. When the mobile app and SendGrid exist, turning each channel on should be a small, contained change (wire one API/plugin action, flip a readiness flag) — not a redesign. See the **Push channel** and **Email channel** sections below for exactly what to build now versus defer.

---

## Data model

Five data types. Every one of them gets `company` (→ Company) and `property` (→ 01.1 Property) — Pattern A, no exceptions.

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

### 7. Add to the existing `User` type

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

- `manage_notification_events` — edit the event catalog (`is_sensitive` = yes)
- `manage_notification_templates` — edit company email templates (`is_sensitive` = yes)
- `send_system_announcement` — broadcast to all users at a property (`is_sensitive` = yes)

Regular users need no permission to see their own notifications — that's what the recipient privacy rule is for.

---

## Backend workflows

Five workflows. Keep the entry point thin and push per-recipient work into scheduled children — a workflow that loops synchronously over a large recipient list will time out.

### `trigger_notification` — the single entry point every module calls

Parameters: `event_code` (text) · `entity_type` (OS - Notification Entity Type) · `entity_id` (text) · `actor` (User) · `recipients` (list of Users) · `company` (Company) · `property` (Property) · `title_override` (text, optional) · `context_1` … `context_4` (text, optional — values that get substituted into the template, e.g. a report number).

Logic:
1. Look up the event type by `event_code`. If it isn't found, or `is_active` is no, exit silently and log — a missing event must never break the calling module's workflow.
2. Search `notification_subscription` for `entity_type` + `entity_id` where `muted` is no, and add those users to the recipient list.
3. Remove the actor from the list. Nobody gets notified about their own action.
4. `:unique elements` on the list.
5. Schedule `deliver_to_user` on that list — use "Schedule API workflow on a list", not a recursive workflow. Schedule-on-a-list runs in parallel, finishes faster, and costs less workload because it doesn't pay a rescheduling action per item. Recursive is only correct when you need sequential order or per-cycle state, and this doesn't.

That's the whole contract. Every module calls exactly this, with the same eight-ish parameters, forever.

### `deliver_to_user` — one run per recipient

1. Load the recipient's `notification_preferences`. If it doesn't exist, create it with defaults, then continue.
2. Work out the active channels: if `allow_opt_out` is no, force in-app + email regardless of preferences. Otherwise — global channel toggle off → drop that channel; event's module in `muted_modules` → drop everything; a matching `notification_event_preference` exists → use its per-channel values; otherwise use the event's defaults.
3. If no channels survive, exit **without creating a row.** A muted user shouldn't accumulate invisible database records.
4. Build the `dedupe_key`. Search for an existing notification with that key that is still `unread`. If one exists, append `entity_id` to `related_entity_ids`, increment `group_count`, refresh the modified date, **and do not reschedule the email.** Exit.
5. Otherwise create the notification. Set `state = unread`, denormalize `module` and `severity` from the event type, render `title` and `body_preview` (actor-verb-object; nothing sensitive), build `cta_url` from the entity type's `app_route` plus `entity_id`.
6. Increment the recipient's `unread_notification_count` by 1.
7. If email is an active channel: set `email_status = scheduled`, set `email_scheduled_send_date` to `now + batch_window_minutes`, and schedule `send_notification_email` for that time.
8. If push is an active channel: search `notification_device` for `user = recipient` and `is_active = yes`. If none exist, skip — nothing to do yet, this is the normal case until the mobile app ships. If any exist, schedule `send_notification_push` for the same time as the email (or immediately if `batch_window_minutes = 0`).

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

---

## Privacy rules

Right now `notification` has no privacy rules and is publicly readable. Fix all five types:

- **notification** — view only when `This Notification's recipient = Current User`. No admin override, none. If someone needs an audit trail, that's the ActivityLog's job, not this table; an admin reading "your permission request was rejected because…" out of someone else's inbox is a privacy incident. Create is backend-only. The recipient may edit `state`, `read_date`, `seen_date`, `archived_date` and nothing else.
- **notification_preferences** — view/edit only when `This Thing's user = Current User`. Created by backend on signup.
- **notification_event_preference** — view/edit only when `This Thing's preferences's user = Current User`.
- **notification_subscription** — view/edit when `This Thing's user = Current User`. Admins with a suitable permission may view (not edit) subscriptions within their own company and property, so "who is watching this record" is answerable.
- **notification_email_template** — readable by any logged-in user of the matching company (or where company is empty), since sends need to render it. Editable only by users holding `manage_notification_templates`.
- **notification_device** — view/edit only when `This Thing's user = Current User`. Create via the register endpoint (backend, ignoring privacy rules since the device isn't authenticated as a full session yet at registration time) or by the owning user directly. A push token is a credential — treat this table with the same care as a password field, never expose it in any search result other than the owner's own.

Every one of these rules gets the company + property clause as its first condition, per Pattern A. Also add the company/property clause to the recipient rules — recipient alone is sufficient logically, but the tenancy clause is the project standard and it costs nothing.

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

**This is the part I care most about.** Do not build these screens from scratch. Clone the existing ones, strip what doesn't apply, and adapt the skeleton. I want the notification screens to be visually indistinguishable in structure from what's already there.

### 1. The inbox — clone `# User Management`

`# User Management` is the newest and best-built module reusable in the app (529 elements, 7 workflows). Its skeleton is exactly what a notification inbox needs:

- a permission-gate group (`G UM NoAccess` + `PP - Access Denied UM`) wrapping the whole thing
- a KPI/stat row with click-to-filter
- a filter + search bar
- a paginated list (it uses a `page_no` custom state, plus `kpi_filter`, `role_filter`, `dept_filter`, `kpis_hidden`)
- a detail drawer (`drawer_open`, `drawer_edit`, `selected_user` custom states)
- a save bar floating group (`FG UMP SaveBar`) that appears when state is dirty
- create/confirm popups

Duplicate it as a new reusable named `# Notifications`. Then:
- Strip every user-CRUD workflow, the create-user popup, the one-time-password popup, and all user-specific fields.
- Drop the permission gate entirely — every user can see their own notifications, so there is nothing to gate.
- Rename the custom states: `selected_notification`, `state_filter`, `module_filter`, `page_no`, `drawer_open`.
- Repoint the repeating group at `Search for notification` constrained by `recipient = Current User`, sorted by created date descending, **with a "Do a search for" that always carries at least the recipient constraint.** More constraints in the search itself, never `:filtered` afterwards — filtering downloads the whole set and then throws most of it away.
- KPI row becomes: Unread / Read / Archived / Critical, each click-to-filter.
- Filters become: module (from `OS - Module`), event type, state, date range.
- Bulk actions: Mark all read, Archive selected, Delete archived.
- Row anatomy: severity dot, module icon (from the module's `icon_code`), title, snippet, relative timestamp (the Relative Time with Moment.js plugin is already installed — use it), unread indicator. When `group_count > 1`, show "and N more".
- Clicking a row marks it read, decrements the counter, verifies the target still exists and is visible, then navigates to `cta_url` — or shows the unavailable message.
- Unread rows are distinguished by **more than colour** — a dot plus a weight change — so it works for colour-blind users and in both themes.

Finally, repoint the `# notifications` custom element inside the `Pages` floating group at this new reusable instead of the `# dashboard` placeholder it currently references.

### 2. The bell dropdown — clone `GF - User Menu`

`GF - User Menu` (60 elements) is the app's existing dropdown-from-header pattern. Clone it as `# GR - Notification Bell` and place it in the same header area, beside the user menu.

- Bell icon with an unread badge; cap the display at "99+".
- The badge reads `Current User's unread_notification_count`. **Do not put a live search behind it.**
- Opening the dropdown sets every `unread` row that's currently displayed to `seen` and clears the badge — without marking them read.
- Body: the 15 most recent notifications, newest first. Fifteen, hard-capped, so the query cost is constant no matter how many thousands the user has.
- Tabs: Unread / All.
- Footer: "View all" → the notifications module, and a gear → preferences.
- Empty state with a real message, not a blank panel.

### 3. Preferences — clone `# Casino Settings`

`# Casino Settings` (267 elements) is the app's tabbed settings-panel pattern. Clone it as `# Notification Preferences` (or add it as a tab inside Casino Settings if that fits the existing navigation better — your call, tell me which you did).

Layout:
- Master toggles at the top: In-app / Email / Push. Push is visible but disabled with a tooltip reading "Available when the mobile app launches."
- Digest frequency dropdown: Real-time / Daily / Weekly / Off.
- Then one collapsible section per module — collapsed by default — showing the module name, its event count, and a mute-whole-module toggle.
- Inside each section, one row per event: label, short description, and In-app / Email / Push checkboxes.
- Events where `allow_opt_out` is no render with a lock icon and disabled, always-checked boxes.
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
3. Seed the 17 starter event-type values.
4. Restructure the `notification` data type (add new fields, remove dead ones).
5. Create `notification_preferences` and `notification_event_preference`.
6. Create `notification_subscription`.
7. Create `notification_email_template` and seed global `en` defaults for all 17 events.
8. Create `notification_device`.
9. Add `unread_notification_count` and `notification_preferences` to `User`; add the notification permissions to `OS - Permission`.
10. Privacy rules on all six types.
11. `trigger_notification`.
12. `deliver_to_user`.
13. `send_notification_email` + the `notification_unsubscribe` endpoint.
14. `send_notification_push` (stubbed send) + `notification_register_device` + `notification_deregister_device`.
15. `notification_nightly_maintenance`.
16. The bell dropdown (clone `GF - User Menu`).
17. The inbox (clone `# User Management`), and repoint the `# notifications` custom element.
18. Preferences (clone `# Casino Settings`) — include the Push master toggle (disabled, tooltipped) alongside In-app/Email.
19. Wire **one** pilot module end to end — Tasks. Fire `task.assigned` from the existing task-assignment workflow and prove the whole in-app + email chain works. Push has nothing to prove yet since there's no device to register — confirm instead that `deliver_to_user` correctly finds zero active devices and skips cleanly, without erroring.
20. Cleanup pass (the list above) and final report.

Steps 1–10 are schema; 11–15 are logic; 16–18 are UI; 19–20 prove and tidy. If a step fails validation, stop and fix that step — don't carry a broken step forward.

---

## What "done" means

Go through this list explicitly in your final report and mark each pass or fail:

- [ ] A module can fire a notification with a single "Schedule API workflow" action and needs to know nothing about channels, preferences, batching, email, or push.
- [ ] All six data types carry `company` and `property`, and every privacy rule checks both.
- [ ] `notification_device` exists, is privacy-locked to its owner, and `deliver_to_user` / `send_notification_push` handle the zero-devices case (today's reality) without erroring.
- [ ] `notification_register_device` and `notification_deregister_device` work end to end (create/reactivate a row, deactivate a row) even though nothing calls them yet.
- [ ] `notification` is no longer publicly readable. Only the recipient can see their own rows. No admin override exists.
- [ ] Firing the same event twice for the same recipient and entity inside the batch window produces **one** row with `group_count = 2`, not two rows.
- [ ] A user who mutes a module gets **no row created at all** for that module's events — not a hidden one.
- [ ] A mandatory event (`user.role_changed`) delivers even to a user who has muted everything.
- [ ] The bell badge reads a stored counter, not a live search. Opening the dropdown clears the badge without marking anything read.
- [ ] Clicking a notification whose target was deleted shows "no longer available" instead of erroring or leaking.
- [ ] No `title` or `body_preview` contains record content — actor-verb-object only.
- [ ] The nightly maintenance job is batch-capped and cannot run away.
- [ ] The unsubscribe endpoint works without login, keyed on a random token.
- [ ] No hex colour appears anywhere in the new UI; every element uses a named token or style.
- [ ] Both themes render correctly — check light as well as dark.
- [ ] `task.assigned` fires end to end: task assigned → row created → badge increments → appears in dropdown and inbox → email scheduled → clicking opens the task.

Then tell me:

1. What you built, step by step, with the entity names you created or changed.
2. Every decision you made where I hadn't specified one, and why.
3. The deviations you were told to flag: the four-state lifecycle versus the spec's three, and the nullable `property` on `notification_email_template`.
4. Anything you found broken or worrying **outside** this scope — list it, don't fix it.
5. What's left before this can carry real traffic: the email provider swap, SPF/DKIM/DMARC, the FCM/APNs push provider integration once there's a mobile app, the remaining ~380 event types as modules land, and anything else you hit.
6. The exact places I'll most likely want to adjust — copy, defaults, batching windows — so I know where to look first.
