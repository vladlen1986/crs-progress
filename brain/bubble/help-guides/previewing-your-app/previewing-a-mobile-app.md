# Previewing a mobile app
> Source: https://manual.bubble.io/help-guides/previewing-your-app/previewing-a-mobile-app · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This section describes previewing **mobile apps**. If you're looking for documentation on previewing **web apps**, see the article below:

Article: [Previewing a web app](/help-guides/previewing-your-app/previewing-a-web-app)
{% endhint %}

Previewing your app functions similarly to the Bubble web app editor, allowing you to instantly see and test changes as you make them. However, keep in mind that some components of the native mobile app editor rely on built-in features of mobile devices, which can vary between iOS and Android. As a result, not all elements may display accurately in the web preview.

There are two ways to preview your app:

## Web preview

### Differences from web app preview

Web preview works mostly like the preview in the Bubble web app editor, with a few key differences:

* There's no [update banner](#user-content-fn-1)[^1] in the preview when changes have been made to the app
* There's an extended bar for managing how the app will look across different devices (see below)

### Current web preview limitations

There are currently a few limitations in web previews:

* Native maps element will not render
* Native datetime picker will not render
* Push notifications cannot be sent to web preview
* Camera workflows will not work properly
* Permissions request workflows may not work properly
* Multi-line inputs in floating groups will not expand to fit height

### Device emulator bar

The bar at the top of the screen lets you emulate how the app will look on different devices, screen sizes and with a specific zoom level.

<figure><img src="/files/isbzjW8ocSYWQDjPIZZL" alt=""><figcaption></figcaption></figure>

1. **Show device frame**: This lets you show or hide the frame of the selected device (i.e. actually showing the frame, buttons, notch/camera/sensors of the device selected in setting 2.
2. **Select device**: Provides a list of widely used devices to emulate how the app will look and behave on that specific device.
3. **Screen size (px):** The actual screen size of the selected device. Note that this is a locked field and updates according to the device selected in setting 2.
4. **Zoom level**: Allows you to zoom in on the emulator to a specific percentage or to fit the screen height. Keep in mind that this zoom affects the entire emulated device, not just the screen.

We recommend testing your app across all devices to ensure it looks great and functions properly everywhere.

## BubbleGo

BubbleGo is a native mobile app that allows you to load and interact with your mobile app directly on your device. This essentially mimics the experience of having the app installed on your phone, without the need to publish it in the app store.

Use BubbleGo to get a feel for how your users will actually use your app, and to test out more advanced interactions/flows/and system connections.

### Accessing BubbleGo for iOS

{% hint style="info" %}
In BubbleGo for iOS, you can refresh your app by shaking your iPhone.
{% endhint %}

1. Download the TestFlight app from the Apple App store.
2. Click on [this link](https://testflight.apple.com/join/uXuOrE3v)
3. Follow the link to download BubbleGo onto the TestFlight app.
4. Log into BubbleGo using your Bubble account credentials.
5. Select the mobile app you would like to test and Go!

### Accessing BubbleGo for Android

* Download the app from the Play Store:
  * [Mobile link](https://play.google.com/store/apps/details?id=com.bubble.BubbleGo1)
  * [Computer link](https://play.google.com/apps/testing/com.bubble.BubbleGo1)
* Log into BubbleGo using your Bubble account credentials.
* Select the mobile app you would like to test and Go!

[^1]: Like the *We just updated the page* banner in the web app editor preview.
