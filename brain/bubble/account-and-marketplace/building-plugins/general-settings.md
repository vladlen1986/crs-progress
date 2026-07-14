# General Settings
> Source: https://manual.bubble.io/account-and-marketplace/building-plugins/general-settings · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

In the first tab of the plugin editor, you'll be able to set general settings for your plugin. You can modify the plugins name, URL, icons, and select the few categories relevant to the plugin. This is important to make your plugin searchable by Bubblers.

## Shared technical settings

The second tab lets you define a few technical settings for your plugin.

**This plugin uses jQuery 3**. If you are building an element that relies on jQuery 3, check this box. The API will give you access to the jQuery plugin.

**HTML Header**. If you need to insert some HTML in all the pages of an app that use this plugin, you can enter the HTML here. Analytics services, for instance, usually require to add a HTML snippet on all pages. If you need users to be able to enter a key in an HTML snippet (for instance a Google Analytics tracking code), you can add the dynamic key in your snippet between the sequence of characters \_\*\_, such a \_\*\_API KEY\_\*\_. Once a user uses your plugin in their app, this key will be a setting to be filled in the Plugins tab, and the key will be replaced by the actual value in Run-mode.

{% hint style="warning" %}
**Note:** The only valid header tags are \<script>, \<meta>, and \<link>. Any invalid header code will end up in the body due to automatic repair logic in most modern browsers.

Whenever the HTML for your page is parsed by a browser like Google Chrome, it will detect any invalid HTML tag used in the headers, assume that this was a mistake, that the closing \</head> tag was missing, and just add it to the body automatically with an opening tag.
{% endhint %}

**Additional keys**. If you need your plugin's users to enter some keys in the Plugins tab, you can enter these key definitions in this tab. These keys will be made accessible in the `context` object that is sent to all the functions used in your elements and actions (see the following sections for more details). Note that if you are adding API connections to your app, the API call tab will let you pick the different keys that are need for your API to function.

![](/files/-M5smsqT1_DrXLtOBp5H)

**Shared assets and resources**. If your plugin implementation requires some assets (images, CSS file, JS files), you can upload them to Bubble's storage and use their URL in your code. All assets are accessible through Bubble's CDN, ensure high speed when accessing the files.

![](/files/-M5smsqVXNTzstlfuGE0)

### Mobile Libraries

If you are building a mobile plugin, you will have access to React Native libraries that Bubble has already installed. These libraries give you access to native components and APIs to build meaningful plugins for users.&#x20;

The list of available libraries that can be referenced in a mobile plugin are as follows:

```
  "@bbob/preset-react": "^4.2.0",
  "@bbob/react": "^4.2.0",
  "@expo/metro-runtime": "~55.0.6",
  "@gorhom/bottom-sheet": "^5.2.8",
  "@gorhom/portal": "^1.0.14",
  "@microsoft/react-native-clarity": "^4.2.2",
  "@react-native-community/audio-toolkit": "^2.0.3",
  "@react-native-community/datetimepicker": "8.6.0",
  "@react-native-community/netinfo": "11.5.2",
  "@react-navigation/bottom-tabs": "^7.8.9",
  "@react-navigation/elements": "^2.8.5",
  "@react-navigation/native": "^7.1.22",
  "@react-navigation/native-stack": "^7.8.3",
  "@sentry/react-native": "~7.11.0",
  "@shopify/flash-list": "2.0.2",
  "browserify-zlib": "^0.2.0",
  "crypto-browserify": "^3.12.0",
  "expo": "~55.0.7",
  "expo-asset": "~55.0.9",
  "expo-audio": "~55.0.14",
  "expo-auth-session": "~55.0.8",
  "expo-blur": "~55.0.10",
  "expo-camera": "~55.0.10",
  "expo-clipboard": "~55.0.9",
  "expo-constants": "~55.0.8",
  "expo-crypto": "~55.0.10",
  "expo-document-picker": "~55.0.9",
  "expo-file-system": "~55.0.11",
  "expo-iap": "^3.4.10",
  "expo-image": "~55.0.6",
  "expo-image-manipulator": "~55.0.11",
  "expo-image-picker": "~55.0.13",
  "expo-linear-gradient": "~55.0.9",
  "expo-linking": "~55.0.7",
  "expo-location": "~55.1.3",
  "expo-media-library": "~55.0.10",
  "expo-notifications": "~55.0.13",
  "expo-secure-store": "~55.0.9",
  "expo-sharing": "~55.0.19",
  "expo-splash-screen": "~55.0.11",
  "expo-status-bar": "~55.0.4",
  "expo-updates": "~55.0.14",
  "expo-video": "~55.0.11",
  "expo-web-browser": "~55.0.10",
  "fast-text-encoding": "^1.0.6",
  "path-browserify": "^1.0.1",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "react-native": "0.83.2",
  "react-native-gesture-handler": "~2.30.0",
  "react-native-localize": "^3.5.1",
  "react-native-maps": "1.27.2",
  "react-native-mmkv": "^4.2.0",
  "react-native-modal-datetime-picker": "^18.0.0",
  "react-native-nitro-modules": "^0.35.0",
  "react-native-reanimated": "4.2.1",
  "react-native-redash": "^18.1.1",
  "react-native-safe-area-context": "^5.6.2",
  "react-native-screens": "~4.23.0",
  "react-native-svg": "15.15.3",
  "react-native-web": "~0.21.0",
  "react-native-webview": "13.16.0",
  "react-native-worklets": "0.7.2",
  "rn-fetch-blob": "^0.12.0",
  "stream-browserify": "^3.0.0"
```

{% hint style="info" %}
**Note:** This list of available libraries is subject to change. The most up to date version is always listed in the Plugin Editor.
{% endhint %}

#### Limitations with React Native libraries

* **Available libraries:** This is only a small subset of the React Native libraries available in the broader React Native ecosystem. As of June 2026, we expect to release the ability to leverage any React Native library in mobile plugins soon.
* **Testing:** The current web preview experience uses React Native for web. This means not all plugins can be tested in Bubble's web preview experience, depending on compatibility. For example, if your plugin opens the device camera, you'll need to test this capability on BubbleGo or Testflight / Android testing track.
