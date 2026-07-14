# Apple IAP checklist
> Source: https://manual.bubble.io/help-guides/getting-started/building-for.../native-ios-and-android/in-app-purchases/getting-ready-for-production/apple-iap-checklist · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

### Apple App Store subscription readiness checklist

This section walks through the required steps to prepare subscriptions for review in the Apple App Store. Apple reviews subscriptions together with your app version, and missing any of the steps below can prevent subscriptions from appearing or cause your submission to be rejected.

#### 1. Account and app readiness

In *App Store Connect → Agreements, Tax, and Banking*:

* The *Paid Apps Agreement* is accepted
* Tax information is completed
* Banking information is completed

In *Apps → Your App*:

* At least one iOS build has been uploaded and finished processing

{% hint style="warning" %}
Apple will **not** **review** subscriptions **if any paid-app agreement is incomplete**.
{% endhint %}

#### 2. Subscription group setup (required)

Path: *Monetization → Subscriptions*

For each subscription group:

* A subscription group exists
* At least one localization has been added (for example, *English (U.S.)*)
* The localization includes:
  * A subscription group display name
  * An app name display option
* The localization has been saved

**This step is easy to miss**. If a subscription group has no localization, all subscriptions in the group will remain in *Missing Metadata* and cannot be submitted.

#### 3. Subscription status check

Path: *Monetization → Subscriptions → Subscription Group → Subscription*

For each subscription:

* The subscription status shows *Ready to Submit*

If the status shows *Missing Metadata* or *Prepare for Submission*, the subscription cannot yet be attached to an app version.

#### 4. Pricing and localization requirements

On the subscription detail page:

**Pricing**

* At least one price has been added under *Subscription Prices*
* Apple automatically calculates prices in other currencies based on current exchange rates

**Localization**

* At least one localization exists (for example, *English (U.S.)*)
* Display name is filled in
* Description is filled in

You don’t need to localize subscriptions for every country where your app is available. A single language is sufficient.

#### 5. App review information (required for the first subscription)

On the subscription page, scroll to *App Review Information*.

**Provide the following:**

* A screenshot showing where the subscription appears in your app (for example, a paywall or upgrade screen)
* Review notes explaining how Apple reviewers can find the subscription

**Screenshot requirements:**

* Can be taken from a simulator
* Doesn’t need to be marketing-polished
* Must clearly show:
  * Subscription name
  * Price
  * Billing period

Example review note:\
“To view the subscription, open the app and tap ‘Upgrade to Premium’ from the Settings screen.”

#### 6. Remove existing draft submissions

Path: *Apps → Your App → App Store → Draft Submissions*

Remove any draft submission that were created before subscriptions were fully ready.

{% hint style="warning" %}
Old draft submissions can prevent subscriptions from being selectable later, even if everything else is configured correctly.
{% endhint %}

#### 7. Attach subscriptions to the app version

Path: *Apps → Your App → App Store → iOS App → App Version*

Confirm the following:

* A build is selected
* The *In-App Purchases and Subscriptions* section is visible
* The subscription can be selected and added
* The app version is saved

If the section is visible but not clickable, it usually means:

* The subscription group localization is incomplete, or
* An old draft submission still exists

#### 8. Final Apple review checks

Before submitting, confirm that:

* The subscription is reachable in the app UI
* Price and billing period are clearly displayed
* *Restore Purchases* works correctly
* App Review Notes clearly explain how to reach the paywall

#### 9. Submit for review

Submit the app version for review and confirm that the subscription is included. Apple reviews the app and subscription together.

***

### Common Apple App Store issues and fixes

Apple’s subscription review process includes several non-obvious requirements and UI behaviors. If something doesn’t work even though it appears correctly configured, check the scenarios below.

#### Subscriptions don’t appear on the app version page

**Symptoms**

* The *In-App Purchases and Subscriptions* section is visible
* The subscription picker is empty or disabled
* Or the section doesn’t appear at all

**Most common causes**

* The subscription group has no localization
* The subscription status is not *Ready to Submit*
* An old draft submission exists

**How to fix**

* Go to *Monetization → Subscriptions*
* Open the subscription group and confirm at least one localization exists
* Confirm the subscription status is *Ready to Submit*
* Go to *Apps → Your App → App Store → Draft Submissions* and remove any drafts
* Reload the app version page

#### Subscription status shows “Missing Metadata”

**Symptoms**

* The subscription shows *Missing Metadata*
* All visible fields appear completed

**Most common causes**

* Missing subscription group localization
* No price added under *Subscription Prices*
* Missing app review information

**How to fix**

* Add a localization to the subscription group
* Add at least one price
* Provide:
  * A paywall screenshot
  * Review notes explaining how to find the subscription in the app

Apple requires both subscription-level metadata and group-level metadata.

#### Everything shows “Prepare for Submission”

**What this means**

*Prepare for Submission* doesn’t indicate missing data. It means the item hasn’t yet been included in a submission.

**Common trap**

* A draft app submission was created before subscriptions were fully ready

**How to fix**

* Remove any existing draft submissions
* Reload the app version page
* Re-select the build and subscription

This often unlocks the subscription picker immediately.

#### The “In-App Purchases and Subscriptions” section is missing

**Symptoms**

* No in-app purchases section appears on the app version page

**Common causes**

* No build is selected
* The build was generated before in-app purchases were enabled
* Apple hasn’t finished processing the build

**How to fix**

* Ensure a build is uploaded and selected
* Generate a new build from Bubble if needed
* Wait a few minutes and refresh App Store Connect

#### Changes don’t seem to take effect

**Symptoms**

* Metadata was updated, but the UI didn’t change
* Status updates are delayed

**What’s happening**

App Store Connect can take several minutes to propagate changes.

**What to do**

* Wait 5–10 minutes
* Refresh the page
* Log out and back in if necessary

#### Triggering Initiate Purchase doesn't do anything on TestFlight

**Symptoms**

* Initiate Purchase workflow is working on web preview / BubbleGo but not TestFlight
* Triggering the workflow either does nothing or shows a "SKU Not Found" error

**What's Happening**

Apple doesn't recognize the plan you are trying to subscribe to due to missing App Store Connect or Subscription requirements

**What to do**

* Ensure App Store Connect requirements have been filled out - notably Bank Information and Paid App Agreement in *App Store Connect > Business > Agreements*
* Ensure your Subscriptions are not missing any metadata in App Store Connect
