# In-app purchases
> Source: https://manual.bubble.io/help-guides/getting-started/building-for.../native-ios-and-android/in-app-purchases · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

## Introduction

Bubble’s In-App Purchases (IAP) feature lets you monetize native mobile apps using the billing systems provided by Apple and Google.

{% hint style="warning" %}
**Bubble currently supports subscriptions only.** One-time digital purchases, such as consumable tokens or credits, are currently not supported.
{% endhint %}

{% hint style="warning" %}
While Bubble automates and simplifies much of the setup, **in-app purchases are governed by Apple App Store and Google Play policies**. Before submitting an app for review, you should review and follow the guidelines set by each platform to ensure a smooth approval process.
{% endhint %}

## What is Bubble’s in-app purchases feature?

Bubble’s IAP feature is a native, cross-platform integration with Apple StoreKit and Google Play Billing. It allows you to offer subscriptions in a Bubble native mobile app using each platform’s in-app purchase system.

With this feature, you define your subscription model in Bubble—including subscription groups, subscription tiers, and billing variants, and connect these to corresponding subscription products in the Apple and Google developer consoles. Bubble subscription objects act as a shared layer between Apple’s and Google’s billing systems, allowing you to support cross-platform subscription flows without building separate logic for each platform.

{% hint style="warning" %}
While Bubble provides the tooling to create and manage subscription flows, **all transactions are processed by Apple’s and Google’s billing systems**, in the same way that web payments are processed by providers such as Stripe.
{% endhint %}

### Do I need to use in-app purchases?

Apple and Google define when in-app purchases are required and when alternative payment methods are allowed.

{% hint style="danger" %}
IAP rules can be complex and may change over time, so the official documentation of each respective platform should always be treated as the source of truth.

The [guidelines](#you-must-use-in-app-purchases-if-you-sell) below provide general direction.
{% endhint %}

<details>

<summary>Official documentation for Apple and Android</summary>

#### Apple

Apple's IAP article describes how their in-app purchases work, rules for the platform and best practices.

External page: [In-app purchase | Apple Developer Documentation](https://developer.apple.com/design/human-interface-guidelines/in-app-purchase)

#### Android

Android's landing page for IAP explains how their payment system works, along with an extensive FAQ.

External page: [Understanding Google Play’s Payments policy | Play Console Help](https://support.google.com/googleplay/android-developer/answer/10281818?hl=en)

</details>

#### You must use in-app purchases if you sell

* **Digital content consumed within your app**, including premium features, subscriptions, virtual goods, additional content, or app-only functionality
* **Digital services delivered through your app**, such as ongoing access to features, cloud storage, or digital tools

#### You may use other payment methods if you sell

* **Physical goods or services**, such as shipped products, food orders, ride-sharing services, or hotel bookings
* **Real-world services**, including appointments, classes, or professional services performed outside the app
* **Digital goods primarily consumed outside the app**, such as content accessed across multiple platforms
* **Multi-platform SaaS products**, where the mobile app acts as a companion to a web-based service. See more [below](#multi-platform-saas-considerations).

### Multi-platform SaaS considerations

If you’re building a SaaS product with both web and mobile apps, there are additional considerations:

* Users can subscribe through your website using Stripe or another payment processor
* The mobile app can provide access to users who already have an active subscription
* **Important:** If the mobile app allows users to purchase, upgrade, or manage subscriptions within the app, in-app purchases must be used
* **Important:** Mobile apps cannot include links or calls to action that direct users to external payment pages

For example, a project management app may allow existing web subscribers to use the mobile app freely, but any new subscription initiated from the mobile app must be purchased through in-app purchases.

### When in doubt

If you’re selling digital content or features that users primarily access through your mobile app, in-app purchases are typically required. Apps that attempt to bypass Apple or Google’s billing systems for digital goods are likely to be rejected during app review.

### Subscription support

Bubble’s in-app purchases feature supports subscriptions only. One-time digital purchases, such as consumable tokens or credits, are not supported by this feature.

### Scope of the in-app purchases feature

Bubble’s IAP feature includes the components needed to set up a compliant subscription experience in a native mobile app. It can be divided into four main areas.

#### Initial setup

* A guided setup flow to enable in-app purchases for your app on each app store.
* A guided setup flow to connect your app backend to Apple and Google billing server notifications.

#### Product setup

* A guided setup flow to define your subscription model in Bubble and link it to Apple and Google subscription products.

Your subscription model consists of the following concepts:

* **Subscription group:** A collection of related subscription tiers
* **Subscription tier:** Defines the level of access a user has to app features
* **Billing variant:** Defines the billing frequency and price for a subscription tier

#### Workflows and data updates

* A **Subscription Purchases** data type that acts as the source of truth for a user’s subscription status and is automatically updated when Apple or Google send billing notifications
* New operators that help define subscription logic and interfaces, such as checking whether a user is subscribed to a specific tier
* Workflow actions for initiating subscription purchases and managing existing plans
* Backend workflow events that allow you to define custom behavior when server-side billing notifications are received from Apple or Google

#### Testing in development

Apple and Google provide sandbox environments for testing in-app purchases through TestFlight[^1] or platform-specific testing tracks. These environments reflect real billing behavior without actually charging, but typically require a new build or [OTA update](#user-content-fn-2)[^2] after changes.

Bubble also provides simulated testing tools that allow you to test purchases, upgrades, downgrades, and cancellations in the development database. These simulations trigger the same backend workflow events as real purchases, without making calls to Apple or Google, making it easier to test subscription flows in BubbleGo[^3] and Web Preview.

[^1]: TestFlight is Apple’s testing platform that lets you distribute iOS apps to testers before releasing them on the App Store.

[^2]: Article section: How OTA (Over-the-Air) updates work

[^3]: BubbleGo is Bubble’s companion mobile app that lets you run and test native mobile apps built with Bubble during development.

    Article section: [BubbleGo](/help-guides/previewing-your-app/previewing-a-mobile-app#bubblego)
