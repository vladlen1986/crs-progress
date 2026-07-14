# Global native mobile settings
> Source: https://manual.bubble.io/help-guides/publishing-your-app/native-mobile-app/global-native-mobile-settings · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

### Setup global mobile settings in your app

Navigate to *Settings > Mobile settings*, where you'll find all the settings related to native mobile apps, regardless of where you publish, that you must fill out.

<figure><img src="/files/J5qlXsir5WCPWE2jyAhF" alt=""><figcaption></figcaption></figure>

To ensure everything will work, fill these out as follows:

* **App display name:** This is the name of your app as it will appear to users on their device's home screen. Choose a concise and descriptive name that aligns with your app’s purpose.
* **App icon:** The visual representation of your app on users’ devices. This icon should be high quality and adhere to the design guidelines for the platform you are deploying to ([iOS](https://developer.apple.com/design/human-interface-guidelines/app-icons) or [Android](https://developer.android.com/distribute/google-play/resources/icon-design-specifications)).
  * **Note:** For your app icon in mobile settings, we recommend using a PNG or SVG file. Some file formats, such as `.avif`, are not supported and may cause your build to fail.
* **Splash screen background color:** The background color displayed during the app’s launch while the app initializes. Choose a color that complements your app's branding and creates a seamless transition into the main interface.
* **App scheme (optional):** A unique identifier used for deep linking and handling redirections from external services, such as OAuth or payment gateways. See more information below.

### Using the app scheme setting

The App Scheme setting is optional and should only be configured if your app specifically requires a custom scheme (for example, when setting up deep linking). In most cases, Bubble will automatically handle this for you, and you don’t need to provide a value.

If you do need to define a custom app scheme:

* The format is typically: appname
* All characters must be lowercase
* Only alphanumeric characters, periods (.), and hyphens (-) are allowed

Make sure to follow these formatting rules carefully to ensure compatibility across platforms.

## Device permissions

### Overview

The Device Permissions section in the Native Mobile Settings tab lets you explicitly control which hardware or system features your app will request access to. This ensures that your app only includes the permissions it actually uses — helping avoid app store review issues.

Previously, every permission supported by Bubble was automatically included in the build file, even if your app didn’t use it. This could cause problems during the app review process, especially on Google Play, where unused permissions may lead to rejections or additional scrutiny.

### How it works

Permissions are toggled off by default. If your app requires access to a specific device feature, you’ll need to manually toggle that permission on.

The available permissions include:

* Camera access
* Microphone access (required for Camera access)
* Photo library access
* Location access

When you enable a permission, Bubble includes it in the app build so that the relevant app store (Apple or Google) is aware.

### Using workflows with permissions

If your app includes a workflow that depends on one of these permissions — for example, using the Open camera action — but the corresponding permission is not enabled, Bubble will display an issue in the issue checker. This helps ensure that your permission settings are always in sync with your app’s functionality.

### Updating your build

Changes to device permissions require a new build submission. If you toggle a permission on or off after your app has been built, you’ll need to rebuild and resubmit your app for the changes to take effect.

### Customizing permission request text

Each permission request must be accompanied by a user-facing short explanation of why your app needs access. You can update this text in the Languages tab. The settings panel includes a link to that section to help guide you there.

Providing clear, accurate language helps improve your chances of passing the app store review and builds trust with your users.

<br>
