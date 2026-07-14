# No authentication
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/authentication/no-authentication · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to set up incoming API connections that don't require any authentication.

The most basic way is to require no authentication at all. This means that any internet user who knows about your app’s API can connect and make any change they want to all the data types you have exposed in the Data API setting.

While there are scenarios where this may be what you want, you should generally be very careful with this option. Keep in mind that API calls will consume your app’s capacity just like any other operation, so even if you set up an open API intentionally, you will need to consider that a high volume of calls may end up consuming a large portion of your server capacity.

{% hint style="danger" %}
Don’t be tempted to think that your API is secure because no one knows its URL endpoints. The endpoints are easy to construct with just a tiny bit of information.\
\
**Obfuscation is not security**: to keep your API truly secure you need proper authentication.
{% endhint %}

## The Data API

To offer access to the Data API without authentication, the following settings need to be set up:

1. Activate the Data API under Settings - API
2. Activate the Data Types that you want to expose
3. Set up a Privacy Rule on each of the data types where you check all the boxes in the Everyone Else rule, including Create via API, Modify via API and Delete via API
