# On-device resources
> Source: https://manual.bubble.io/core-resources/on-device-resources · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
On-device resources can only be accessed in native mobile apps, not in web apps.
{% endhint %}

## Location services

Access native device location using GPS, Wi-Fi, cell towers, and Bluetooth.

### **How location works on mobile**

Location access in native apps is more accurate than on the web:

* **Web apps** rely on the browser’s geolocation API, which may use Wi-Fi, IP addresses, and GPS if available.
* **Native apps** use OS-level location services, giving more precise and real-time results.

### **Workflow actions**

* **Get current location**: Pings the device and returns its current location. If the user hasn’t granted permission, the system will prompt them. If denied, no location will be returned.
* **Request location permissions**: Prompts the native permission dialog for location access. You can customize the message in the *Settings → Language* tab to meet App Store guidelines.

### **Data sources**

* **Current geographic position**: Returns a one-time location when the view initializes. Requires granted permissions.
* **Has granted location permissions**: Returns yes or no depending on the user’s permission status.

### **Google Maps support**

If your app uses maps:

* For Android: Enable *Maps SDK for Android* in Google Cloud.
* For iOS with Google Maps: Enable *Maps SDK for iOS*.
* No key is required if you're using Apple Maps on iOS only.

Enter your API keys under *Settings → General*.

## Camera and photo library

Use the device’s camera or access stored images with dedicated actions.

### **Using the camera**

* Use the **Open camera** action to launch the device’s camera app.
* To save the photo to the device’s photo library, enable *Save to camera library*.
* To make the file private, check *Make this file private* and attach it to a data type.
* To optimize the image size for increased performance, check *optimize image size.* This setting will adjust the resolution for any images that are greater than 1080p, down to 1080p.
* The uploaded file will be returned as a URL via *Result of step X*.

### **Using the photo library**

* Use the **Open camera library** action to let users choose images from their device.
* Choose between single or multiple image uploads using the *Type* setting.
* To optimize the image size for increased performance, check *optimize image size.* This setting will adjust the resolution for any images that are greater than 1080p, down to 1080p.
* You can make the file private in the same way as with camera photos.
* The uploaded file will be returned as a URL via *Result of step X*.

## **Permissions and prompts**

* Bubble automatically handles permission requests for camera and photo library access.
* You can customize the system prompt in *Settings → Language*.

For more on translating system-level messages, see the article: [*App texts*](/help-guides/data/static-data/app-texts-translations).
