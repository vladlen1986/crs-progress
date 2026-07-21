# Android IAP checklist
> Source: https://manual.bubble.io/help-guides/getting-started/building-for.../native-ios-and-android/in-app-purchases/getting-ready-for-production/android-iap-checklist · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

### Google Play subscription readiness checklist

This section outlines the required steps to prepare subscriptions for review and sale on Google Play. Google reviews subscriptions as part of the app review process, and missing any of the steps below can prevent subscriptions from appearing or cause purchases to fail.

#### 1. Account and app readiness

Confirm the following before proceeding:

* Your Google Play Developer account is active
* A payments profile has been created
* The app exists in Google Play Console
* At least one Android build has been uploaded *after* in-app purchases were enabled
  * An Internal, Closed, or Production track build is sufficient

#### 2. Subscription exists in Google Play

Path: *Monetize → Products → Subscriptions*

For each subscription you intend to sell:

* The subscription exists in Google Play
* At least one base plan has been created for the subscription

#### 3. Configure and activate a base plan (required)

Each subscription must have at least one active base plan in order to be reviewed or purchased.

Path: *Monetize → Products → Subscriptions → (Your subscription) → Base plans*

For each base plan you intend to launch:

* Billing period is set (for example, monthly or yearly)
* Price is set
* Countries or regions are selected
* The base plan has been saved
* The base plan status is *Active*

A subscription with only *Draft* base plans can’t be purchased and may not be reviewed correctly during app submission.

**Base plan statuses**

Base plan statuses are conceptually similar to Bubble billing variants:

* *Draft*\
  The base plan is incomplete or has never been activated.
* *Active*\
  The base plan is ready to be sold and reviewed with the app.
* *Inactive*\
  The base plan exists but isn’t currently available for purchase.

#### 4. Subscription details check

On the subscription details page, confirm that:

* The name and description are filled in
* Benefits accurately describe what the subscription unlocks in the app
* There is no misleading pricing, trial, or promotional language

#### 5. Submit to Google Play

Submit the app to a Closed testing track or to Production.

At the time of submission:

* Subscription products are active
* The app build includes the subscription configuration

Google reviews subscriptions as part of the app review process.

***

### Common Google Play issues

If subscriptions don’t appear or purchases fail during testing, check the following:

* The base plan status is *Active*
* Pricing is set for the relevant countries
* The app build was uploaded after subscriptions were configured
