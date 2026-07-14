# Sub-apps
> Source: https://manual.bubble.io/help-guides/optimizing-an-application/sub-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Sub-applications are a powerful feature available in the [Team plan](#user-content-fn-1)[^1]. The feature sets up a relationship between a “main app” and one or more “sub-applications” and makes it easier to push any changes from the main app to its sub-apps, while all main and sub-apps have their own database.

This is especially useful for certain ideas that involve setting up different (sub/)domains for different clients, which is common in SaaS applications.

## Creating new sub-apps

The feature can be found in Settings > Sub-apps. There, you can create a sub-app using the current app as the main app. This will create a copy of the main app with the new name that you pick. The new sub-app will appear in your “My apps” dashboard (and will note which app is the parent), but from that point on, it generally functions as its own app.

You cannot create a sub-app off of a sub app, but one main app can have multiple sub-apps.

## Pushing from the main app to sub-apps

However, one of the main features of a sub-app is that at any time, you can “push” the current version of your main app to all of its sub-apps. Note that this will overwrite any changes made to a sub app individually. (This feature can take a relatively longer time for complex apps.)

Certain settings on an app will **not** transfer from the main app to a sub-app upon a push:

* [**Custom domain**](#user-content-fn-2)[^2]
* [**Favicon**](#user-content-fn-3)[^3]
* Admin's email
* Setting to allow iframes
* Language of the app
* iOS meta tag icon and variations of startup images
* OAuth client app and "redirected to" domain
* Whether or not Sendgrid is used, Sendgrid verification and Sendgrid template ID
* Setting for "Use field display instead of ID for key names" (Settings > API)
* The app's public and private JSON web key (Settings > API)

If you want a specific other setting to **not** propagate from the main app to a sub-app, please contact our Success team - we may be able to add a custom protection to that setting for your app.

{% hint style="info" %}
**Understanding page load times:** When you update your app, Bubble optimizes it in the background for faster future loads. After significant changes, the initial load might be slower while these optimizations occur. This delay, typically brief, won't recur until the next major update.

This optimization happens separately for Development and Live, so infrequent deployments to live may make this more noticeable.
{% endhint %}

## Main app vs sub-app databases

Sub-apps have separate databases from the main app, but can connect with the main app’s database through the [App Connector](#user-content-fn-4)[^4] just like any other app.

In other words, the main app’s database will not transfer to sub-apps automatically. [Default values](#user-content-fn-5)[^5], however, are stored in the app rather than directly in the database, so they will transfer to sub apps on a push.

## Sub-app subscriptions

Each sub-app would be on its own Bubble subscription, but sub-apps do not need to be on the Team plan - only the main app does.

If you have a subscription to a plugin on your main app, it would *not carry over* to your sub-app(s) and your sub-app(s) would need to re-purchase that plugin.

[^1]: To see a comparison between Bubble's different pricing plans, please see the link below.

    \
    Page: [Bubble plans](https://bubble.io/pricing)

[^2]: Connecting to a *custom domain* means to give your app a unique URL, such as [www.myapp.com.\\](http://www.myapp.com.\\) <br>

    In the context of sub-apps, this means that every sub-app can have its own unique URL.

    Article: [Connecting to a custom domain](broken://pages/Sfb2EVgX6WfgYIibQCNa)

[^3]: The *favicon* is a small icon associated with your app, typically displayed next to the site's title in browser tabs or bookmarks.\ <br>

    It helps users quickly identify and navigate to a site when multiple tabs are open.

[^4]: *The App Connector* is a Bubble-built plugin that lets you connect two Bubble applications to exhange data and workflows securely.

    Article: [The App Connector](/help-guides/integrations/bubble-app-connector)

[^5]: *Default values* are the values that a field on a database thing will contain when created if no other value is specified.

    They are set in the *Data - Data types* section of the Bubble edito&#x72;*.*\ <br>

    Article series: [The database](/help-guides/data/the-database)
