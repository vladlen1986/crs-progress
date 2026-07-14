# Settings tab
> Source: https://manual.bubble.io/core-resources/bubbles-interface/settings-tab · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for **beginner to intermediate-level builders.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (3)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**The settings tab**

This article covers the interface of the *Settings* tab in the Bubble editor.

Article: [The settings tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab)

#### Setting up a custom domain

This article covers how you register and manage a [custom domain](#user-content-fn-2)[^2] for your app.

Article: [Setting up a custom domain](broken://pages/Sfb2EVgX6WfgYIibQCNa)

#### Controlled updates (Enterprise plan)

This article series covers how you can gain a greater control over updates applied to the Bubble codebase. This subject is applicable to users on the Enterprise plan only.

Article series: [Controlled updates on the Bubble enterprise plan](/help-guides/bubble-for-enterprise)
{% endtab %}
{% endtabs %}

## Overview

### My plan

This is where you see which Bubble app plan your current app is on. Remember that Bubble plans generally apply at the app, not the account, level. In this sub-tab, you can see some of the capabilities of your current plan and change your plan as desired.

* Plan
* Workload
* Storage
* Plugins

### General

This sub-tab contains a mix of different settings—some design-oriented, some privacy-oriented, some app-level management oriented.

* Privacy and security
  * [Admin-only settings](#user-content-fn-3)[^3]
  * [X-frame options](#user-content-fn-4)[^4]
  * Cookies[^5]
  * [Don't allow file uploads to the file upload API endpoint](#user-content-fn-6)[^6]
* General appearance
  * Favicon[^7]
  * [Progress bar color](#user-content-fn-8)[^8]
  * [Repeating group spinner](#user-content-fn-9)[^9]
* [General services API keys](#user-content-fn-10)[^10]
  * Google Geocode API key
  * Google Maps API key
  * Google Maps key for iOS
  * Google Maps key for Android
  * Algolia application ID
  * Algolia Search API key
  * Algolia admin API key
* iOS appearance
  * [Hide Safari Ul component](#user-content-fn-11)[^11]
  * [Prevent the user from zooming](#user-content-fn-12)[^12]
  * [Icon for home screen (60 x 60 pixels)](#user-content-fn-13)[^13]
  * [iPhone 5 startup image (640 x 1096 pixels)](#user-content-fn-14)[^14]
  * [iPad startup image (portrait, 1536 x 2008 pixels)](#user-content-fn-15)[^15]
  * [iPad startup image (landscape, 1496 x 2048 pixels)](#user-content-fn-16)[^16]
* Custom fonts
  * Lets you upload [custom fonts](#user-content-fn-17)[^17] to use in your app.
* Design import from Figma
  * Lets you [import a design from Figma](#user-content-fn-18)[^18]
* App file management
  * [Optimize application](#user-content-fn-19)[^19]
  * [Export/Import application](#user-content-fn-20)[^20]
* Advanced options
  * Time zone controls
  * Exposing HTML element IDs
  * [Show parentheses in dynamic expressions in editor](#user-content-fn-21)[^21]

Other settings.

#### Don't allow file uploads to the file upload API endpoint

This setting disables the fileupload API endpoint, which can improve security by preventing direct access to that upload route. However, it does not disable all file uploads—it only blocks access via the fileupload endpoint, which certain plugins and workflows rely on.

<details>

<summary>How this affects file uploads:</summary>

* **If the checkbox is checked** (i.e., the fileupload endpoint is disabled) file and image uploads will work as usual:
  * File and image uploads through the Bubble editor still work—this includes actions like setting images in the property editor or uploading directly to the File manager (if the collaborator has permission to edit the app's data)
  * File and image uploads in runmode using Bubble elements like the File uploader and Picture uploader also continue to work (unless they are prohibited by conditions or privacy rules), with the following exceptions:
    * Picture uploader: if limit image size before upload is enabled, it will not work.
      * Non-standard upload location: if you are using a non-s3 storage (e.g. Box), it will not work.
  * The fileupload endpoint remains disabled for all other access, including for plugins or custom calls—this may cause certain Bubble-built or third-party plugins to stop functioning if they depend on it.
* **If the checkbox is unchecked** (i.e., the fileupload endpoint is enabled):
  * There are no restrictions on file uploads—any part of the app or plugin can use the endpoint as usual.
  * Be sure to test any functionality that depends on file uploads—particularly plugins or custom workflows—before enabling or disabling this setting.

</details>

#### Do not send an email when the application is being rate-limited for map loads

If you have your Google keys set up, your app will use those keys when making requests from Google Maps and Geocode. Google rate-limits these requests, and by default, you (the app creator) will receive an email from us when the application is being rate-limited. Checking this box will disable that email.

#### Algolia

See [this article ](/help-guides/data/the-database/using-algolia)on how to set up the integration between your app and Algolia.

#### Prevent clipping fields on rows too large to fit in Algolia (advanced)

Algolia has a default size limit for data fields that are sent to it. Bubble implements clipping correspondingly to help Bubble apps stay under that default size limit. However, advanced users may not want Bubble to do this for various reasons, and can use this setting to control that.

#### Optimize application

Over time, as many changes are made to your Bubble app, the application will remember information about parts of it that may no longer be relevant (e.g. a style that used to exist but no longer, or a data type that used to exist but has since been deleted).

This tool in the General tab will help you clean some of that unused content out, which could improve performance of your app overall. Note that doing so will prevent you from certain actions, such as restoring a deleted data type, if you've cleared out the history of that deleted data type.

#### Clean app changes history

Clearing your app history removes all saved history and cannot be undone. See the table below for details on which data is affected.

This feature removes the saved history of changes to your app. If you no longer need this history—which allows you to revert your app to a previous state—you can clear it to improve editor performance.

<table><thead><tr><th width="328.4171142578125">Feature</th><th>Affected by clearing app changes history</th></tr></thead><tbody><tr><td>Undo history</td><td>❌</td></tr><tr><td>Revert app to custom date/time</td><td>✅</td></tr><tr><td>Revert app to custom save point</td><td>✅</td></tr><tr><td>Version Control changelog</td><td>✅</td></tr></tbody></table>

#### Export application

Bubble apps can be exported as a JSON file - please see [this article](/account-and-marketplace/application-and-data-ownership#exporting-your-application-and-data).

#### Import application

If you have the JSON of a Bubble app (e.g. from exporting a Bubble app, see above), you can import it into the current app with this feature.

### API

APIs is a broad subject, and for new users it can be one of the more complex areas of Bubble to learn. Still, it's also one of Bubble's most powerful and exciting features that open up your app to work together with other systems all over the web.

The article series below takes you through what APIs are, the different types of APIs and how to set it all up in Bubble.

Article series: [APIs](/help-guides/integrations/api)

Bubble apps come with APIs, which allow your app to connect with other web services. This sub-tab is where you turn the app's APIs on or off, as well as control what's available through the APIs.

* Enable [Workflow API](#user-content-fn-22)[^22] and backend workflows
* Enable [Data API](#user-content-fn-23)[^23]
  * [Generate a new API token](#user-content-fn-25)
* Use field display instead of ID for key names
* Hide Swagger[^24] API documentation access
* [Infinite recursion protection](#user-content-fn-25)[^25]
* [3rd Party OAuth / SAML Access](#user-content-fn-26)[^26]
* [Discourse SSO](#user-content-fn-27)[^27]

#### Generate a new API token

Once you've turned on at least one of your app's APIs, you have the option to generate a new API token. This is one of the ways a call to the API can be authenticated. See the API reference.\
Live).

{% hint style="info" %}
**Tip**: You have access to this option when you are an admin of the app's current version (e.g. Development or
{% endhint %}

{% hint style="warning" %}
**Caution**: Using the API token feature allows for a lot of flexibility with inbound API connections, but it also opens up for potential security vulnerabilities as it gives the broadest possible access to your app's API.

If you are not entirely sure of the implications of this, we recommend reading the guide below to learn more about how the different authentication methods affect your app's security.

Article series: [API authentication](/help-guides/integrations/api/the-bubble-api/authentication)
{% endhint %}

#### API token label and private key

For each API token you choose to create, you are able to supply a custom label for it, which makes it easier for you to remember where each token is used, for example. Regardless, you will also see the private key itself.

### Collaboration

On certain higher app plans, you can invite other Bubble users to collaborate with you on your app. This is where you can control who your collaborators are and what privileges they have on the app.

User manual article: [Collaboration in Bubble](/help-guides/maintaining-an-application/collaboration)\
Core reference: [List of collaboration settings](/core-resources/application-settings/collaboration)

### Languages

This sub-tab contains Bubble's feature to help you localize your app to different languages. Here, you see different "app texts"—snippets of text that appear throughout your app, some of which are built-in, others from plugins, and still others that you define. For any of these snippets, you have the opportunity to provide the translation of that snippet into any other language that Bubble supports out of our catalog of several dozen.

User manual article: [Translating your app](/help-guides/data/static-data/app-texts-translations)

#### Import and export

To facilitate changing many App Texts at once, you can import and export all the App Texts from one or more languages as a CSV. If you are planning to import, we recommend you first do an export to get the expected structure of the CSV file for the import

User manual article: [Translating your app](/help-guides/data/static-data/app-texts-translations)

### Sub apps

[Sub apps](#user-content-fn-28)[^28] is an advanced feature that lets you connect one app with another in a parent-child relationship, and changes to the parent can be 'pushed' to the child.

#### Copy DB for creation

When you first create a sub app, you have the option of copying the parent app's database to the sub app with this checkbox.

#### Push to sub applications

This section lets you push changes from a parent app to its sub apps. Please refer to [this article](/help-guides/optimizing-an-application/sub-apps) to understand what does vs does not get pushed.

## Versions

Bubble generally rolls out updates to the platform many times a day and there is no need for you to do anything in order to receive those updates. However, on rare occasions, an update might introduce a "breaking change" that could alter your app's current functionality.

For these specific changes, you'll need to actively upgrade your Bubble version, which can be done within this section.

{% hint style="info" %}
Applications on the Enterprise plan have a greater degree of control over when updates are applied to their app. You can read more about it in our articles series about Bubble for Enterprise.

Article series: [Bubble for Enterprise](/help-guides/bubble-for-enterprise)
{% endhint %}

## Notifications

You can set up custom notifications for workload[^29] unit consumption. This lets you stay on top of your spending.

## Web app

### SEO and metatags

* Social media/OpenGraph settings
  * Title[^30]
  * [Site name](#user-content-fn-31)[^31]
  * Description[^32]
  * [Link thumbnail](#user-content-fn-33)[^33]

#### SEO settings

* [Expose the type of tags for text elements](#user-content-fn-34)[^34]
* [Point URLs to primary domain for better SEO](#user-content-fn-35)[^35]
* [Customize robots.txt (advanced)](#user-content-fn-36)[^36]
* [Expose a sitemap file](#user-content-fn-37)[^37]

#### Advanced settings

* [Script/meta tags in header](#user-content-fn-38)[^38]
* [Script in the body](#user-content-fn-39)[^39]

#### 301 redirections

Set up permanent redirects from one URL to another. Helps preserve SEO value and ensures users land on the correct page when URLs change. This is also useful when you are migrating from another platform.

#### Hosting files in the root directory

Upload static files to be served from the root of your domain (e.g. `yourapp.com/filename`). Useful for domain verification or third-party service integration.

### Domain and email

Settings for connecting your app to a custom domain. See the article below for an in-depth guide:

Article: [Custom domain and DNS](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/web-app/custom-domain-and-dns)

## Native mobile

{% hint style="info" %}
This is the short-form core reference explanation of each setting in the native mobile settings category. For an in-depth look at how to publish your native mobile app in the app stores, see the article series below:

Article series: [Publishing your native mobile app](/help-guides/publishing-your-app/native-mobile-app)
{% endhint %}

### Basic details

* [App display name](#user-content-fn-40)[^40]
* [App icon](#user-content-fn-41)[^41]
* [Splash screen background color](#user-content-fn-42)[^42]
* [App scheme (optional)](#user-content-fn-43)[^43]

### Apple App Store settings

* [Bundle ID](#user-content-fn-44)[^44]
* [Team ID](#user-content-fn-45)[^45]
* App Store Connect API
  * [Key ID](#user-content-fn-46)[^46]
  * [Issuer ID](#user-content-fn-47)[^47]
* Apple push notification service
  * [APNs key ID](#user-content-fn-48)[^48]
  * [APNs key](#user-content-fn-49)[^49]

### Android Play Store settings

* [Package name](#user-content-fn-50)[^50]
* [JSON key](#user-content-fn-51)[^51]
* [Code signing key](#user-content-fn-52)[^52]
* [Code signing key alias](#user-content-fn-53)[^53]
* [Code signing key password](#user-content-fn-54)[^54]
* Firebase cloud messaging
  * [Firebase service account key](#user-content-fn-55)[^55]
  * google-services.json[^56]

### Builds and live versions

This section lets you manage how your mobile app is deployed. You can submit new builds to the app stores, track and manage live versions, and send OTA (over-the-air) updates.. Use it to control what your users see, roll out updates, and handle version support across different devices.

### Device permissions

Control which device features your app requests to ensure transparency for users and meet app store requirements.

### Supported languages

Select the languages your app supports to provide clear localization for users and meet app store listing requirements.

* Add new language
  * [Select base language](#user-content-fn-57)[^57]
  * [Select region or dialect](#user-content-fn-58)[^58]
  * [Select fallback language](#user-content-fn-59)[^59]

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Connecting to your app to s custom domain means to change the URL of your app from the default Bubble URL (such as <https://bubbleapps.io/myapp>) to a custom URL such as https//[www.myapp.com](http://www.myapp.com).

[^3]: Control what parts of your app settings and permissions can only be modified by users with admin rights.

[^4]: Preventing your app from being rendered in an iframe helps protect against clickjacking attacks, where malicious sites try to trick users into interacting with hidden elements of your app.

[^5]: Control whether Bubble automatically sets cookies on new users or not.

[^6]: See more information about this point [below](#dont-allow-file-uploads-to-the-file-upload-api-endpoint).

[^7]: A favicon is the small icon that appears in the browser tab next to your app’s name.

[^8]: The color of the progress bar that appears at the top of the page when Bubble is processing actions, like saving data to the database.

[^9]: The color of the spinner that appears whenever a repeating group is loading.

[^10]: See [this article](/help-guides/data/the-database/working-with-location-data) on how to set up your Google Maps and Geocode API Keys.

[^11]: Removes the browser's navigation UI.

[^12]: Disables pinch-to-zoom gestures to maintain fixed scaling of your app's UI.

[^13]: Displays this icon when the app is saved to the user's home screen on iOS.

[^14]: Used as the launch screen image on iPhone 5.

[^15]: Displayed in portrait orientation during app launch on iPads.

[^16]: Displayed in landscape orientation during app launch on iPads.

[^17]: See the guide below for more information about how to use custom fonts:

    Article: [Custom fonts](/help-guides/design/variables-and-styles/using-custom-fonts)

[^18]: See the article below for more information on how to import Figma designs:

    Article: [Importing Figma designs](/help-guides/design/importing-from-figma)

[^19]: See the section [below](#optimize-application) for more information about the app optimization feature.

[^20]: See the section below for more information about the import/export app feature.

    Section: [Export/Import application](#export-application)

[^21]: Expression parentheses automatically show you the order of operations in your dynamic expressions by adding parentheses around them.

    Article section: [Settings tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab) | [Show parentheses in dynamic expressions in editor](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/overview#show-parentheses-in-dynamic-expressions-in-editor)

[^22]: The Workflow API allows you to trigger backend workflows in your app from external sources using API calls.

    Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^23]: The Data API lets you read from and write to your app’s database using external API calls. It supports creating, modifying, deleting, and retrieving data types in your app.

    Article series: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)

[^24]: Swagger is a tool that provides interactive API documentation, making it easier to view, test, and understand your app’s API endpoints.

[^25]: Prevents workflows from endlessly triggering themselves by setting a limit on how many times they can run in a recursive chain.

    Article: [Infinite recursion protection](/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection)

[^26]: Allows you to connect your app to third-party authentication providers using OAuth or SAML for secure single sign-on (SSO) and user login flows.

[^27]: Lets users log in to your Discourse forum using their Bubble app credentials through a single sign-on (SSO) setup.

[^28]: Sub apps are separate apps linked to a main app, often used for white-labeling or managing client-specific versions. Changes can be pushed from the main app to its sub apps.

    Article: [Sub-apps](/help-guides/optimizing-an-application/sub-apps)

[^29]: Workload units measure the computing resources your app uses, such as running workflows, processing actions, and handling database requests.

    Article series: [Workload](/help-guides/workload)

[^30]: The headline shown when your page is shared on social media or appears in search engine results.

[^31]: The name of your app or website shown in link previews and search listings.

[^32]: A short summary that appears in link previews and helps improve SEO.

[^33]: The image shown when your page is shared on social platforms or messaging apps.

[^34]: Allows you to assign HTML heading tags (like H1, H2) to text elements for better SEO structure.

[^35]: Redirects all traffic to your main domain (e.g., from www to non-www) to avoid duplicate content and improve SEO.

[^36]: Edit the file that tells search engines which parts of your site to crawl or ignore.

[^37]: Generates a sitemap to help search engines index your app’s pages more efficiently.

[^38]: Add custom `<script>` or `<meta>` tags to the `<head>` section of your app for analytics, SEO, or third-party integrations.

[^39]: Insert custom scripts into the `<body>` of your app pages, typically used for tools that need to run after the page loads.

[^40]: The name that appears under your app icon on users’ devices.

[^41]: The image shown on users’ home screens and app stores; must meet platform size requirements.

[^42]: The background color shown while the app is loading, before the first screen appears.

[^43]: A custom URL scheme that lets your app open from other apps or links (e.g., `myapp://`).

[^44]: A unique identifier for your iOS app, registered in your Apple Developer account.

[^45]: The identifier for your Apple Developer team, used to link your app to your developer account.

[^46]: Identifies the API key used to access App Store Connect services.

[^47]: Identifies your Apple Developer account when using the App Store Connect API.

[^48]: Identifies the key used to send push notifications through Apple Push Notification service (APNs).

[^49]: The private key used to authenticate push notification requests to APNs.

[^50]: A unique identifier for your Android app, defined when registering it in the Google Play Console.

[^51]: A service account key file used to authenticate with the Google Play Console for app publishing.

[^52]: Used to sign your Android app build to verify its authenticity and integrity.

[^53]: The label used to identify the specific key within your keystore file used for signing.

[^54]: The password that unlocks the signing key in your keystore file.

[^55]: Authenticates your app with Firebase services, including push notifications.

[^56]: A configuration file required to connect your app to Firebase on Android.

[^57]: Choose the primary language your app will use by default.

[^58]: Specify a regional variation of the base language, such as U.S. English or Canadian French.

[^59]: Set the language your app will use if a user's preferred language isn't available.
