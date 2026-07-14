# In-app purchase actions
> Source: https://manual.bubble.io/core-resources/actions/in-app-purchase-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
The workflow events in this section only apply to native mobile apps.
{% endhint %}

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
