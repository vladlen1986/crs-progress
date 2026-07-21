# Workflow and language
> Source: https://manual.bubble.io/help-guides/getting-started/building-for.../native-ios-and-android/in-app-purchases/workflow-and-language-updates · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

## In-app purchases data and workflows

This section explains the data sources, operators, database tables, and workflow actions that become available when you enable in-app purchases (IAP). These tools let you implement subscription logic using the same patterns you already use elsewhere in Bubble.

### Subscription purchases (system table)

Bubble automatically creates and manages a **Subscription Purchases** data table. This table serves as the source of truth for a user’s subscription state.

#### What this table represents

Each record represents a single subscription entitlement for a user. Records are created and updated based on billing notifications sent by Apple and Google. You can think of this table as a read-only system log that reflects the current state of a user’s subscription.

#### Key characteristics

* Records are created and updated automatically when Apple or Google sends billing events, such as purchases, renewals, cancellations, or expirations
* Records can’t be created, modified, or deleted manually
* Updates occur near real time based on server-side notifications

#### Available fields

| Field name                   | Type            | Description                                                                                                                                                       |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Original Purchase Identifier | text            | Stable identifier that groups all renewals and lifecycle events for the same subscription. Useful for tracking a subscription across renewals and status changes. |
| Purchase Identifier          | text            | Unique identifier for a specific purchase or renewal event from the store.                                                                                        |
| Status                       | text            | Current lifecycle status of the subscription (e.g. active, ending, expired, paused, on hold). Exact values are store-normalized.                                  |
| Is Active                    | yes / no        | Whether the subscription is currently considered active. This is the safest field to use for quick checks.                                                        |
| User                         | User            | The Bubble user who owns this subscription.                                                                                                                       |
| Environment                  | text            | Indicates whether the subscription originated from a sandbox/test or live/production environment.                                                                 |
| Store                        | text            | The store that manages the subscription (apple or google).                                                                                                        |
| Bubble Billing Variant       | Billing Variant | The Bubble billing variant associated with this subscription entitlement.                                                                                         |
| Store Product Identifier     | text            | The product identifier used by the App Store or Play Store.                                                                                                       |
| Google Base Plan ID          | text            | The base plan identifier used by Google Play (Android only).                                                                                                      |
| Google Latest Order ID       | text            | The most recent Google Play order ID associated with this subscription.                                                                                           |
| Expiry or Renewal Date       | date            | The date when the subscription will next renew or expire, depending on its current status.                                                                        |
| Creator                      | User            | The user that created this record                                                                                                                                 |
| Created Date                 | date            | When this subscription record was first created.                                                                                                                  |
| Modified Date                | date            | When the subscription record was last updated by a billing event.                                                                                                 |
| Slug                         | text            | Custom name for the record                                                                                                                                        |

{% hint style="info" %}
Use this table primarily for visibility and debugging. For gating features and building app logic, prefer the operators and data sources described below rather than querying this table directly.
{% endhint %}

### Core IAP Types

These types are introduced by the IAP feature and are used consistently across data sources, operators, workflows, and component properties/messages.

#### Subscription Group

A logical grouping of related subscription tiers. A user can only have one active subscription within a subscription group at a time.

#### Subscription Tier

A subscription tier within a subscription group (for example: Basic, Pro, Pro Plus). This represents the “level of access” a user gets with their plan.

#### Billing Variant

A specific billing configuration for a subscription tier, such as Monthly or Annual.

### Data sources

Bubble exposes high-level data sources that surface a user’s subscription state safely and consistently. Click the core reference link for more information about each data source.

## Has granted location permission

Returns yes or no depending on the user’s permission status. See more in the core reference entry for [on-device resources](/core-resources/on-device-resources).

## In-app purchases

Bubble adds native data sources that expose subscription products and a user’s subscription state in a safe, high-level way. These data sources are designed to support common subscription UI and logic without requiring direct access to system tables.

Bubble exposes high-level data sources that surface a user’s subscription state safely and consistently.

### **All Subscription Groups**

Returns a list of all subscription groups defined for the app.

Use this when you want to:

* Build a pricing page that lists all subscription offerings
* Iterate through groups and display tiers/variants inside each group

### **Subscription Item**

Returns a single IAP object (Subscription Group, Subscription Tier, or Billing Variant). This is similar to selecting a single option in an Option Set.

Use this when you want to:

* Display details for a specific plan or billing option
* Pass a specific billing variant into a workflow action

### **Current user’s active subscriptions**

Returns a list of Subscription Purchases for the current user that are currently active.

This data source is backed by the Subscription Purchases system table and automatically filters to records where the subscription is active.

Returns

* A list of Subscription Purchase records

Common use cases

* Displaying all subscriptions a user currently has
* Building account or billing overview pages
* Debugging or inspecting subscription state

Notes

* This returns Subscription Purchases, not subscription groups or tiers
* For access control and UI gating, prefer the subscription operators described below

### **Current user’s subscription in…**

Returns the active Subscription Purchase for the current user within a specific Subscription Group.

Arguments

* Subscription Group (required)

Returns

* Returns the active subscription purchase for the given group, if one exists
* Returns empty if the user has no active subscription in that group
* By design, a user can only have one active subscription per subscription group

Common use cases

* Showing plan details for an active subscription within a specific group without having to dynamically filter the list

### Subscription Operators

## Subscription operators

Operators are the recommended way to gate features, content, and UI based on subscription state. They abstract away raw purchase data and reflect the current, normalized subscription status.

Operators are the recommended way to gate features, content, and UI based on subscription state. They abstract away raw purchase data and reflect the current, normalized subscription status.

### User is subscribed to…

Checks whether the user is currently subscribed to the selected option. This operator can be scoped to be at the group, tier, or billing variant level depending on your needs.

**Arguments**

* Subscription Group – returns yes/no if the user has any active subscription in the group
* Subscription Tier – returns yes/no if the user is subscribed to that specific tier
* At least Subscription Tier – returns yes/no if the user is subscribed to that tier or higher, based on tier order in the subscription group
* Billing Variant – returns yes/no if the user is subscribed to a specific billing variant

Common use cases

* Gating access to premium features
* Showing or hiding UI elements based on plan level
* Checking eligibility for upgrades or downgrades

Best practices

* Prefer group- or tier-level checks for access control
* Use billing-variant checks for messaging or analytics, not core gating

### Workflow actions

#### Backend workflow events (server notifications)

Bubble exposes backend workflow events that fire when Apple or Google sends billing notifications.

## **Initiate subscription purchase**

Starts a native in-app purchase flow for a selected billing variant.

Key behaviors:

* Opens the Apple or Google payment sheet
* Handles receipt validation automatically
* Updates the Subscription Purchases table when the purchase completes

You can select a billing variant directly or pass one dynamically, such as from a repeating group.

A typical flow looks like this:

* The user taps an *Upgrade* or *Subscribe* button
* The workflow runs *Initiate subscription purchase*
* Bubble hands off to Apple or Google
* The subscription state updates automatically

{% hint style="warning" %}
**Important:** A User must be logged into an account on your app in order to initiate a purchase as a Subscription Purchase record must be linked to a User. Hide all billing actions until a user has logged in.
{% endhint %}

## **Manage subscription**

Redirects the user to the platform-native subscription management screen.

Use this action to allow users to:

* Cancel a subscription
* Change billing frequency
* Upgrade or downgrade within a subscription group

Apple and Google control the management UI. Bubble provides the entry point, not the management controls themselves.

{% hint style="warning" %}
**Note:** Users can also upgrade or downgrade by initiating a purchase on a different plan for upgrades, downgrades, and cross-grades.
{% endhint %}

## Restore purchases

Restore purchases lets users who have previously made an in-app purchase restore that purchase on a new device or after reinstalling the app, without being charged again.

This action is required by both Apple and Google and must be available to users in your app. Failing to include it may result in your app being rejected during app review.
