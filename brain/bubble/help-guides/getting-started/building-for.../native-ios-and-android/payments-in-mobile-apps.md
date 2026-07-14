# Payments in mobile apps
> Source: https://manual.bubble.io/help-guides/getting-started/building-for.../native-ios-and-android/payments-in-mobile-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
**Note:**

The information in this article is provided as a general overview. Platform policies change over time, and the authoritative sources are the official documentation from each platform:

* [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — Apple
* [Google Play Payments policy](https://support.google.com/googleplay/android-developer/answer/9858738) — Google

Always refer to these documents for the most up-to-date requirements before publishing your app.
{% endhint %}

Payments in native mobile apps work differently from payments on the web. While a web app can integrate with any payment processor and charge users directly, native mobile apps are subject to platform rules set by Apple and Google. Understanding these rules is essential when planning monetization for your mobile app.

#### Why mobile payments are different

Apple's App Store and Google Play have strict policies on how apps can charge users for digital goods and services. Both platforms require that purchases of digital content, features, or subscriptions go through their own in-app purchase systems — Apple's StoreKit and Google's Play Billing. These systems handle the transaction, take a commission, and distribute the remainder to the developer.

This rule is enforced at the platform level. Submitting an app that bypasses these systems to charge users for digital goods will typically result in rejection during the review process.

#### When in-app purchases are required

In-app purchases are required for any digital goods or services consumed within the app. This includes:

* Subscriptions to premium content or features
* Unlocking app features or removing ads
* Virtual currency or in-game items
* Digital content such as articles, videos, or audio

The platform takes a commission on these transactions — typically 15% to 30%, depending on the developer's agreement and revenue thresholds.

#### When in-app purchases are not required

Apple and Google allow external payment methods for certain categories of goods and services. These include:

* Physical goods and services (such as ecommerce purchases or ride bookings)
* Services consumed outside the app (such as a meal delivered or a ride taken)
* Business-to-business transactions
* Donations to nonprofit organizations

For these categories, you can use any payment processor, including Stripe, PayPal, or others integrated through Bubble's API connector or plugins.

#### In-app purchases in Bubble

Bubble currently supports subscriptions through in-app purchases. This means you can offer recurring subscription products in your native mobile app and have them processed through Apple's or Google's billing systems. You can read more about in-app purchases in the article series below:

Article series: [In-app purchases](/help-guides/getting-started/building-for.../native-ios-and-android/in-app-purchases)

#### Choosing a payment approach

When planning payments in your native mobile app, consider what you're charging for:

* If you're selling **digital subscriptions**, use Bubble's in-app purchase support.
* If you're selling **physical goods or services consumed outside the app**, you can use external payment processors like Stripe.
* If your app combines both — for example, an ecommerce store with a premium subscription tier — you may need to use both approaches, with each transaction routed through the appropriate system.

#### Platform commission and pricing

{% hint style="info" %}
The rates below are provided as a general overview and may change over time. Always refer to the official platform documentation for current rates and terms.
{% endhint %}

Apple and Google take a commission on all in-app purchases, which affects your pricing strategy. The standard rates are:

* 30% on most purchases in the first year of a subscription
* 15% on subscription renewals after the first year
* Reduced rates for developers earning under a certain revenue threshold (currently $1 million per year)

Factor these commissions into your subscription pricing to ensure your revenue targets are met after the platform's cut.

#### Testing in-app purchases

Both Apple and Google provide sandbox environments for testing in-app purchases without charging real money. Use these environments to verify that your purchase flows, subscription renewals, and cancellation handling work correctly before submitting your app for review.

## FAQ: Payments in mobile apps

<details>

<summary>Why can't I just use Stripe to charge for subscriptions in my mobile app?</summary>

Apple and Google require all purchases of digital goods and services, including subscriptions to digital content or features, to go through their own billing systems. Using an external payment processor like Stripe for these purchases will typically result in app store rejection.

</details>

<details>

<summary>Can I use Stripe at all in my mobile app?</summary>

Stripe for mobile is not officially supported by Bubble as of now.

Technically, you can set up payments with any provider, but only for physical goods and services consumed outside the app. Examples include eCommerce purchases, food delivery, ride bookings, and event tickets.

</details>

<details>

<summary>Can I offer the same subscription on web and mobile?</summary>

Yes, but you'll need to handle each platform's billing system separately. Web subscriptions can use any payment processor, while mobile subscriptions must go through Apple's or Google's billing systems. Most apps maintain a single user account that recognizes subscriptions purchased on either platform.

</details>

<details>

<summary>Can I link to my website to let users subscribe there instead?</summary>

Both Apple and Google have strict rules about steering users to external payment methods. The rules vary by region and have been changing in response to recent legal developments. Refer to the official platform documentation for current guidance.

</details>

<details>

<summary>What if my app is rejected for payment-related reasons?</summary>

The most common reasons for rejection are using external payment methods for digital goods, or failing to use the platform's in-app purchase system where required. Review the platform's payment guidelines carefully and update your app to comply before resubmitting.

</details>
