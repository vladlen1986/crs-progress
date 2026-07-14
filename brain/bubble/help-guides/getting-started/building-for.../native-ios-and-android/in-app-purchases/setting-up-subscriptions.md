# Setting up subscriptions
> Source: https://manual.bubble.io/help-guides/getting-started/building-for.../native-ios-and-android/in-app-purchases/setting-up-subscriptions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Setting up subscription products

This guide describes a *Bubble-first* approach to setting up in-app purchases (IAP). By defining your subscription structure in Bubble before configuring Apple and Google, you establish a single source of truth and avoid working with two different billing models at the same time.

If you already have subscriptions defined in Apple or Google, you can still create and link the corresponding Bubble subscription objects afterward.

### Why use a Bubble-first approach

Without this approach, you would need to learn Apple’s and Google’s subscription structures simultaneously and then manually map them together. By defining your business model in Bubble first, you create a clear blueprint that can be translated consistently to both platforms.

<figure><img src="/files/s96MsJFqpLbFbjBKKfFH" alt=""><figcaption></figcaption></figure>

### Prerequisites

Before you begin, make sure the following are in place:

* An active Apple Developer account (if supporting iOS)
* An active Google Play Developer account (if supporting Android)
* A Google Cloud project for this app (if supporting Android)
* Your Bubble app is connected to the Apple App Store and/or Google Play Store in app settings
* In-app purchases are enabled for each connected store in mobile settings
* Your Bubble project is on a trial or paid mobile plan

### Phase 1: the Bubble blueprint

Before creating any products in Apple or Google, define your subscription model in the Bubble editor. This acts as a clear checklist for creating matching store products later.

#### Create a subscription group

A subscription group is a logical container for related plans. Most apps only need one group (for example, *Premium membership*), with multiple tiers inside it such as *Basic*, *Pro*, and *Pro Plus*.

A user can only have one active subscription within a subscription group at a time. They can upgrade or downgrade within the group, but can’t subscribe to multiple plans in the same group simultaneously.

If you plan to offer unrelated subscriptions that users may want at the same time, use multiple subscription groups. For example, a *Cooking* subscription and a *Games* subscription would typically belong to separate groups.

The subscription group name is a display name and doesn’t need to match exactly across platforms.

#### Define and rank subscription tiers

Within a subscription group, define your subscription tiers and their billing variants. For example:

```
Subscription Group: "Premium Membership"
  ├─ Subscription: "Basic" (Rank 1)
  │   ├─ Variant: Monthly ($9.99)
  │   └─ Variant: Annual ($99.99)
  ├─ Subscription: "Pro" (Rank 2)
  │   ├─ Variant: Monthly ($19.99)
  │   └─ Variant: Annual ($199.99)
  └─ Subscription: "Pro Plus" (Rank 3)
      ├─ Variant: Monthly ($29.99)
      └─ Variant: Annual ($299.99)
```

Tier rank is defined by dragging subscriptions in the list:

* **Top** = lowest tier
* **Bottom** = highest tier

Bubble uses this order to determine whether a change is an upgrade or a downgrade, which affects proration and billing behavior.

On Apple, Apple’s own rules take precedence if there’s a conflict.\
On Google, Bubble sends proration instructions that match Apple’s behavior for consistency.

You can change tier order even after billing variants are marked as ready for sale. This allows you to insert new tiers later as your product evolves.

{% hint style="warning" %}
Bubble doesn’t validate whether your ranking aligns with your pricing. Make sure the order makes sense for your business model.
{% endhint %}

#### Add billing variants

For each subscription tier, add billing variants such as monthly or annual plans.

Variants are tied to their subscription tier and can’t be moved between tiers. To change tiers, the variant must be deleted and recreated.

### Phase 2: creating products in the stores

Once your Bubble blueprint is complete, create matching products in the Apple and Google developer consoles.

#### Apple StoreKit (App Store Connect)

Apple uses a flat subscription structure. Each combination of tier and billing variant is its own subscription. While Apple supports subscription groups, it doesn’t have a native concept of billing variants.

For example, a single Bubble subscription group maps to multiple Apple subscriptions, such as

Apple Subscriptions (Flat Structure):

Subscription Group: "Premium Membership"

```
Apple Subscriptions (Flat Structure):
Subscription Group: "Premium Membership"
├─ basic_monthly (Rank 1)
├─ basic_annual (Rank 1)
├─ pro_monthly (Rank 2)
├─ pro_annual (Rank 2)
├─ proplus_monthly (Rank 3)
└─ proplus_annual (Rank 3)
```

{% stepper %}
{% step %}

#### Navigate to subscriptions

Go to *App Store Connect → App → Distribution → Monetization → Subscriptions*.
{% endstep %}

{% step %}

#### Create a subscription group

Create a subscription group that matches your Bubble group concept. If you only have one group, a generic name like *Premium plans* is usually sufficient.
{% endstep %}

{% step %}

#### Create subscriptions

Create one Apple subscription for each billing variant defined in Bubble.
{% endstep %}

{% step %}

#### Set reference names and IDs

Assign a reference name and ID to each subscription. The reference name is shown in the Bubble editor, while the ID is used for linking and can’t be changed later.
{% endstep %}

{% step %}

#### Adjust subscription order

Arrange subscriptions so billing variants of the same tier are on the same level. Apple allows multiple subscriptions at the same level by dragging them on top of each other.
{% endstep %}
{% endstepper %}

Prices, availability, and localization can be configured later.

#### Google Play Billing (Google Play Console)

Google uses a nested structure with subscriptions and base plans, which more closely matches Bubble’s model. Google doesn’t support subscription groups.

**Example:**

```
Google Subscriptions (Nested Structure):
├─ Subscription: "Basic"
│   ├─ Base Plan: "Monthly"
│   └─ Base Plan: "Annual"
├─ Subscription: "Pro"
│   ├─ Base Plan: "Monthly"
│   └─ Base Plan: "Annual"
└─ Subscription: "Pro Plus"
    ├─ Base Plan: "Monthly"
    └─ Base Plan: "Annual"
```

**Steps**

{% stepper %}
{% step %}

#### Navigate to subscriptions

Go to *Google Play Console → App → Monetize with Play → Products → Subscriptions*.
{% endstep %}

{% step %}

#### Create subscriptions

Create one Google subscription for each Bubble subscription tier.
{% endstep %}

{% step %}

#### Create base plans

Inside each subscription, create base plans for each billing variant (for example, Monthly and Annual).
{% endstep %}

{% step %}

#### Set pricing and availability

Define pricing and availability for each base plan. These settings can be adjusted before going live.
{% endstep %}
{% endstepper %}

Google subscriptions have both a name and a product ID. The name is shown in the editor, while the ID is used for linking and can’t be changed later.

{% hint style="info" %}
Products can remain pending or inactive when linked later—they don’t need to be fully activated yet.
{% endhint %}

### Phase 3: linking subscriptions in Bubble

After creating products in the stores, return to Bubble to connect them. Click *Refresh data* to load the latest store configurations.

#### Map store IDs

{% stepper %}
{% step %}

#### Map Apple subscription group

If Apple is connected, map the Apple subscription group ID using the dropdown at the top of the subscription group card.
{% endstep %}

{% step %}

#### Link billing variants

For each billing variant, select the corresponding Apple product ID and the matching Google subscription and base plan IDs. If you recently changed products in the stores, click *Refresh data* again before selecting IDs.
{% endstep %}
{% endstepper %}

### Testing your setup

#### Development testing

You can test subscription flows using Web Preview and BubbleGo. These tests simulate purchases without contacting Apple or Google and create dummy subscription records in the development database only.

This allows you to test:

* Purchase flows
* Conditional logic based on subscriptions
* Active, canceled, and other subscription states
* Backend workflows triggered by billing notification events

This does not allow you to test:

* The native Apple and Google payment sheet experience
* Managing subscriptions through Apple or Google account settings

{% hint style="info" %}
**Note:** Dummy subscription records will not expire automatically. To test what happens when a subscription ends, you should expecility change the state of the dummy subscription in the simulated payment sheet.
{% endhint %}

#### Store sandbox testing

After validating your flows and logic in development, you can test with platform sandbox environments:

* **Apple**: TestFlight with sandbox accounts
* **Google**: Play Console testing tracks (internal, closed, or open testing)

These environments allow you to test real purchase flows without real charges before publishing to live. Sandbox testing still creates subscription entitlement records in the live database, but they are marked as *sandbox*.
