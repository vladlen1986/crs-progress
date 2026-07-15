# Getting ready for Production
> Source: https://manual.bubble.io/help-guides/getting-started/building-for/native-ios-and-android/in-app-purchases/getting-ready-for-production · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Preparing for submission and managing plans

{% hint style="info" %}
To understand the terminology used in this article, we have a IAP glossary at the bottom of the page.
{% endhint %}

This phase covers everything required to submit an app with subscriptions to the Apple App Store and Google Play. At this point, you should already have:

* Created and configured billing variants in Bubble
* Linked those variants to Apple subscriptions and Google base plans
* Tested purchases using sandbox or test accounts

This phase focuses on preparing your Apple and Google store listings for review. Missing any of the steps below can prevent subscriptions from appearing during submission or result in your app being rejected.

### Confirm Bubble is ready for production

Before working in the Apple or Google dashboards, confirm the following in Bubble.

{% stepper %}
{% step %}

#### Double check billing variants

Double check that all billing variants are present. While these can be modified later, its best to catch any inconsistencies before going live.
{% endstep %}

{% step %}

#### Verify store links

Each billing variant is linked to:

* An Apple Subscription ID
* A Google Subscription and Base Plan (if launching on Android)
  {% endstep %}

{% step %}

#### Prepare a new build

Confirm you’re ready to generate a new native build for submission.
{% endstep %}
{% endstepper %}

If your Bubble app is connected to both the Apple App Store and Google Play Store, every variant must include IDs for both platforms. If any billing variant is missing a required link, Bubble will surface the issue in the issue checker.

If you make changes to subscription configuration after this point, you may need to generate a new build before final submission.

### Apple App Store pre-submission checklist

Apple reviews subscriptions together with your app version. All required subscription setup must be completed in App Store Connect before submitting the app.

{% hint style="warning" %}
**Family Sharing is not supported** for subscriptions in this setup. Make sure this setting is turned off before submitting Apple subscription plans for review.
{% endhint %}

Complete the required Apple readiness steps in App Store Connect before proceeding.

### Google Play pre-submission checklist

All required subscription setup must also be completed in Google Play Console before submission.

Complete the required Google readiness steps in Google Play Console before proceeding.

### Final production check

You’re ready to submit when all of the following are true:

* All "listed" Bubble variants are linked to a plan
* No draft submissions are blocking selection
* A new native build has been generated and uploaded to App Store Connect and Google Play Console
* Apple subscriptions are selectable on the app build version
* Google subscriptions are active
* App review notes and screenshots are complete

### Managing plans by unlisting

As your business evolves, you may need to retire or stop offering certain plans.

#### When to unlist

Because an active plan may have existing subscribers, *one should be careful when deleting billing variants.* Instead, consider un-listing a billing variant that was previously tied to active subscribers.

#### What unlisting does

In Bubble:

* The plan is hidden from pricing pages that reference active subscriptions
* Bubble continues processing renewals through billing notifications
* Existing subscribers remain on the plan

In the app stores:

* Unlisting a plan in Bubble does not automatically unlist it in Apple or Google
* You must manually deprecate or remove the plan in both App Store Connect and Google Play Console to prevent new users from subscribing

#### Existing subscriber behavior

Users with active subscriptions to unlisted plans:

* Can remain on their current unlisted plan
* Can upgrade or downgrade to other active plans within the same subscription group
* Can’t re-subscribe to the unlisted plan if they cancel or the subscription expires, assuming the plan has been properly unlisted in Apple and Google

### Summary checklist

#### Before you start

* Define subscription groups, subscriptions, and billing variants in Bubble
* Arrange subscription tiers in the correct order
* Create matching products in Apple and Google consoles
* Map Apple and Google IDs in Bubble

#### Before going live

* Ensure both Apple and Google IDs are mapped if using both platforms
* Activate plans in App Store Connect and Google Play Console
* Generate a new native build and submit for review

#### You’re ready when

* All required Apple and Google IDs are mapped
* Plans are active in the store consoles
* The app has been approved by Apple and Google

A common pitfall is creating store products before defining the subscription structure in Bubble. This often leads to additional rework when aligning Apple, Google, and Bubble configurations.

<details>

<summary>Glossary</summary>

* **Subscription group:** A collection of subscription tiers where a user can hold only one active subscription at a time
* **Subscription tier:** A service level within a group, such as Basic, Pro, or Pro Plus
* **Billing variant:** A billing frequency for a subscription tier, such as Monthly or Annual
* **Draft:** A billing variant that exists in Bubble but isn’t available for purchase
* **Ready for Sale:** A billing variant that’s locked, linked to store IDs, and available for purchase
* **Unlisted:** A Ready for Sale variant that’s hidden from purchase while continuing to serve existing subscribers

</details>
