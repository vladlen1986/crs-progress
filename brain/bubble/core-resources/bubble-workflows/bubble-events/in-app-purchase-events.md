# In-app purchase events
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-events/in-app-purchase-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

### Backend workflow events (server notifications)

Bubble exposes backend workflow events that fire when Apple or Google sends billing notifications.

#### In-app purchase event

This event triggers whenever Bubble receives a server-side billing update, such as when a subscription is created, renewed, canceled, or expires.

#### Event types you may receive

When the backend workflow runs, Bubble provides a normalized event type that represents the subscription lifecycle change. These events are abstracted across Apple and Google so you can write platform-agnostic logic.

| Event type                  | When it fires                                            | Typical meaning                                      |
| --------------------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| *`created`*                 | A subscription purchase succeeds                         | The user now has an active subscription              |
| *`expired`*                 | A canceled subscription ends                             | The user no longer has an active subscription        |
| *`sub_renewed`*             | A subscription renews successfully                       | A recurring billing cycle completed                  |
| *`sub_resumed`*             | A paused subscription becomes active again (Google only) | Billing was resumed                                  |
| *`sub_auto_renew_enabled`*  | Auto-renew is turned back on                             | The subscription will continue renewing              |
| *`sub_auto_renew_disabled`* | Auto-renew is turned off                                 | The subscription will end after the current cycle    |
| *`sub_entered_grace`*       | A subscription enters a grace period                     | Payment failed but access may be temporarily granted |
| *`sub_on_hold`*             | A subscription is placed on hold                         | Payment issue requiring user action                  |
| *`sub_paused`*              | A subscription is paused (Google only)                   | Billing temporarily stopped                          |
| *`sub_voided`*              | A charge is refunded                                     | A billing period was refunded                        |

Some platform updates are intentionally filtered out and won’t trigger an event, including initial pending payments, internal product migrations, or platform-specific transitions that don’t represent a meaningful state change for app logic. In these cases, the subscription record may still update internally, but no backend event fires.

### What Bubble handles automatically

Bubble takes care of:

* Validating receipts
* Updating the Subscription Purchases table
* Maintaining the user’s current subscription state

### What you can customize

Backend workflows let you add your own business logic, such as:

* Sending an email when a subscription starts
* Notifying your team when a high-tier plan is purchased
* Logging analytics events
* Syncing subscription state to external systems

{% hint style="info" %}
**Backend workflows are optional**. Subscriptions work without them, and they’re intended for advanced or custom behavior.
{% endhint %}

### Recommended implementation pattern

* Gate access using operators at the group or tier level
* Initiate purchases using workflow actions
* Use backend workflows only for side effects like emails, analytics, or syncing
* Treat the Subscription Purchases table as read-only system data

Following this pattern keeps your app aligned with Apple and Google requirements while keeping your Bubble logic simple and maintainable.
