# Google Analytics
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/google-analytics · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Google Analytics lets you track visits on your website and get some insights on your audience for free.

## Adding your Google Analytics tracking code

Integrating your analytics account is as simple as adding your unique tracking ID within the settings of your plugin page. To track changes in your live app, remember to deploy after adding the tracking ID.

## Populating website data

Once installed, application data will immediately send and populate data within your Google Analytics accounts.

## Setup

To integrate Google Analytics, simply source the account tracking code from your Analytics account.

You can find this under the settings tab > properties > tracking code.

For universal accounts, simply copy the tracking code beginning with ‘UA’.

Paste this tracking code into the tracking ID field of the plugin settings.

Note: If you’re using the universal version of Google Analytics, select the V1 plugin version from the dropdown menu.

If you’re using a Google Analytics 4 account, copy across your properties measurement ID field from the same settings page.

You’ll also need to update the version type dropdown to the V2 gtag.js choice.<br>

## FAQ

### How do I make Google Analytics GDPR compliant?

By updating the settings of your application to not store cookies by default, your Google Analytics integration will not pass data through when a user cookie is unavailable. This [post](https://forum.bubble.io/t/new-feature-cookie-opt-in/29823) highlights how to update the cookie opt-in settings of your application.

### How can I track custom events?

It’s still possible to create custom events as normal within your Google Analytics account. These can include events like minimum session times, lead events, and success pages. Any events you create will propagate through to your Bubble application.

### Why is my live app not tracking anything?

Keep in mind that you need to deploy your app before the tracking is active in your live version.
