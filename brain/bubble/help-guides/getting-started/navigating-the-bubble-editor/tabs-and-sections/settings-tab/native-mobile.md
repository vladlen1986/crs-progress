# Native mobile
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/native-mobile · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Global native mobile settings" %}
For a more in-depth look at native mobile settings, we recommend reading our article series on publishing your mobile app. Use the tabs above to access guides for each mobile platform.

Article series: [Publishing your native mobile app](/help-guides/publishing-your-app/native-mobile-app)
{% endtab %}

{% tab title="iOS app store settings" %}
The article below explains how to prepare your app for submission to the iOS App Store.

Article: [Publishing your app to the iOS App Store](/help-guides/publishing-your-app/native-mobile-app/ios-app-store)
{% endtab %}

{% tab title="Google Play Store settings" %}
The article below explains how to prepare your app for submission to the Google Play Store.

Article: [Publishing your app to the Google Play Store](/help-guides/publishing-your-app/native-mobile-app/google-play-store)
{% endtab %}
{% endtabs %}

The *Native mobile settings* tab contains configuration options specific to building and managing your native mobile app. Here, you can manage mobile-only features like app appearance, device permissions, platform-specific behavior, language and publishing settings for iOS and Android.

## Basic details

Enter the core information needed to prepare your app for submission to the app stores. This includes the app display name, icon, and splash screen background color. You can also optionally define a custom app scheme for handling deep links or app-to-app communication.

## Apple App Store

{% hint style="info" %}
For a complete guide on publishing your mobile app to the Apple App Store, we recommend reading our dedicated article on the topic:

Article: [Publishing your app in the iOS App Store](/help-guides/publishing-your-app/native-mobile-app/ios-app-store)
{% endhint %}

Provide the credentials and identifiers required to submit your app to Apple’s App Store. This includes your Bundle ID and Team ID, which link your app to your Apple Developer account.

### App Store Connect API

Enter your Key ID, Issuer ID, and upload your private key to enable automated submission and management through the App Store Connect API.

### Apple push notification service

To enable push notifications on iOS, provide your APNs Key ID and upload your APNs key. These credentials allow your app to communicate with Apple’s notification service.

## Android Play Store

{% hint style="info" %}
For a complete guide on publishing your mobile app to the Apple App Store, we recommend reading our dedicated article on the topic:

Article: [Publishing your app in the Android Play Store](/help-guides/publishing-your-app/native-mobile-app/google-play-store)
{% endhint %}

### Android Play Store settings

Enter the information required to submit your mobile app to the Google Play Console. This includes your Package name, JSON key, and code signing credentials such as the code signing key, alias, and password.

### Firebase Cloud Messaging

To enable push notifications on Android, upload your Firebase service account key and google-services.json file. These files connect your app to Firebase for notification delivery.

## Builds and live versions

This is where you manage builds and live versions.

Before submitting your app to the app stores, it’s helpful to understand how builds, OTA (over-the-air) updates, and live versions work. These concepts form the foundation of mobile deployment and give you more control over how and when updates reach your users.

This includes understanding how version numbers work, when new builds are required, how OTA updates differ from full submissions, and how to manage and deprecate older live versions of your app over time.

For a full breakdown, we recommend reading our dedicated article:

Article section: Native mobile apps: [Understanding Builds, OTA Updates, and Live Versions for deployment](#builds-and-live-versions)

## Device permissions

This is where you manage which device features your app will request. This is needed to stay compliant with store guidelines. You can read more about how device permissions work in the article below.

Article section: [Global native mobile settings – Device permissions](/help-guides/publishing-your-app/native-mobile-app/global-native-mobile-settings#device-permissions)

## Languages

This is where you manage the language or languages your app will support. Defining this helps meet app store requirements and ensures users see accurate localization in the store listings. You can read more about localization on mobile in the article below:

Article section: [App texts (translated strings) and languages in native mobile apps](/help-guides/data/static-data/app-texts-translations#app-texts-in-native-mobile-apps)
