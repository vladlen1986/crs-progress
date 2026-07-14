# Location services
> Source: https://manual.bubble.io/help-guides/logic/device-resources/location-services · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

When building native mobile apps, you can access location services just as you would in a web app. While they may appear to function the same way, there are technical differences between location services on native mobile and web apps.

## Location services in native mobile apps vs. web apps

Location services work differently in native mobile apps compared to web apps in a browser.

* **Desktop web app:** Location access relies on the browser’s [geolocation API](#user-content-fn-1)[^1], which estimates location using:

  * Wi-Fi networks
  * IP addresses
  * GPS (if available)

  **Accuracy depends on:**

  * The user granting permission in their browser
  * The device’s hardware and how the browser utilizes location services (such as GPS)
* **Mobile web app:** Functions similarly to desktop web apps but may offer increased accuracy if the mobile device has GPS and the browser supports it.
* **Native mobile app:** location services use the device’s built-in GPS, Wi-Fi, cell towers, and Bluetooth, providing more precise and real-time location tracking.

Because mobile apps use direct OS-level location services, they offer more accuracy and control than browser-based location tracking.

## Using location services in native apps

### **Workflows**

* **Get current location:** This workflow action pings the device’s location and returns it for use in the next workflow step, such as saving it to the database or setting a custom state.\
  \
  If the user has not yet granted location permissions, this action will prompt them. If permission is denied, no location data will be returned.
* **Request location permissions:** This workflow action prompts the user with the system’s location permission request, similar to how Bubble handles [camera](/help-guides/logic/device-resources/camera-photo-library) and push notification permissions.

Additionally, new permission request fields have been added in the [Languages tab](#user-content-fn-2)[^2], allowing you to customize the message displayed when requesting location access. This text string is required to comply with Apple App Store guidelines to prevent app rejection.

### **Data sources**

* **Current geographic position:** This data source now works in native mobile apps, using the same operator as on the web. It retrieves the device’s location, but only as a one-time ping when a view initializes—it does not update continuously as the device moves. The user must have already granted location permissions for this data source to function.
* **Has granted location permissions:** This new data source returns `yes` or `no`, indicating whether the user has allowed location access. If the user has not yet been asked for permissions, it will return `no` until they are prompted.

{% hint style="info" %}
To use the map feature on iOS and Android, a Google Maps API key is required. The key must be generated in your Google Cloud account, just like for web apps, but with the following APIs enabled:

* **Maps SDK for Android** (for Android apps)
* **Maps SDK for iOS** (for iOS apps)

Once generated, the API keys should be entered in *Settings – General*.<br>

**Note:** A Google API key is **not** required if the app exclusively uses Apple Maps on iOS.
{% endhint %}

[^1]: The browser’s *geolocation API* allows web apps to request a user's location using available data from Wi-Fi networks, IP addresses, GPS (if available), and cell towers. Accuracy depends on the device, browser settings, and user permissions.

[^2]: The Languages tab is where you manage your app's static text strings in different languages.

    Article: [Translating your app](/help-guides/data/static-data/app-texts-translations)
