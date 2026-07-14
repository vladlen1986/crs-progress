# Fitbit plugin
> Source: https://manual.bubble.io/help-guides/data/user-accounts/authentication-plugins/fitbit-plugin · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## What is Fitbit?

Fitbit is a health and fitness brand known primarily for its wearable devices that track physical activity, sleep patterns, and other personal metrics. These devices, alongside their apps, help users monitor and improve their health and fitness goals. Fitness is owned by Google's parent company Alphabet Inc.

The plugin allows your end-users to log in with their Fitbit accounts, fetch their workout data, and update their subscription status through the web API.

<figure><img src="/files/MSivxD23Az248Gvgs7NZ" alt=""><figcaption></figcaption></figure>

1. First, open the *Install new plugins* screen in the Bubble editor.
2. To find this plugin, search for *Fitbit*. Optionally, you can check the *Login service* checkbox to further filter the results. You can also scroll to the bottom of the filters list, under *Built by* and select *Official* to single out official plugins.
3. Check that the Bubble logo is visible in the bottom-right, and then click *Install.*

### Setting up and configuring the Fitbit Web API

<details>

<summary>External documentation</summary>

To set up an account and generate and manage the Client ID and secret key, please follow the up-to-date directions provided in the official Fitbit Developer documentation. The plugin connects to the Web API.

External page: [Getting Started with the Fitbit APIs](https://dev.fitbit.com/build/reference/web-api/developer-guide/getting-started/)

</details>

The Fitbit API follows a common pattern of requiring two different keys to authenticate your app.

* **Client ID:** The Client ID (also referred to as the API Key in some contexts) is essentially the public identifier for your app. Think of it like the name tag your app wears when it talks to Fitbit. In this context, it's not to be confused with your secret access token: In fact, the Client ID doesn't need to be kept secret.
* **Client Secret (access token):** The Secret Key, on the other hand, is like a password. It's used to secure communication between your app and Fitbit's servers. Exposure of the Secret Key can lead to security risks, unlike the App ID.

After you've installed the Fitbit plugin, the first step is to set up a developer account to obtain an OAuth key. If you already have a Fitbit account, you can use that login. With your developer account in place, the next move is to register a new app on the Fitbit developer portal.

During the app registration process, you'll input various details about your app. Upon completion, Fitbit will provide you with a client ID and a secret key, which are essential for your OAuth 2.0 integration.

Next, you'll need to transfer both the client ID and the client secret into the corresponding fields in your plugin settings on Bubble.io.

Note that you can activate a generic redirect URL within the Bubble plugin settings.

## Setting up the Fitbit plugin

After installing the plugin, you'll find it in your list of installed plugins and can click it to access its settings:

<figure><img src="/files/CothmL8OZ4Bj08SciLye" alt=""><figcaption></figcaption></figure>

## Actions, elements and data sources

To see the plugin's elements, actions and data sources, as well as their properties, please see the core reference article below:

Reference: [Fitbit](/core-resources/bubble-made-plugins/fitbit)

## FAQ: Fitbit plugin

#### What should I do if I accidentally expose my App ID?

The App ID is a public identifier, and does not need to be replaced if it's exposed.

#### What should I do if I accidentally expose my secret key?

The secret key should be kept securely private, as exposure can lead to security risks. We strongly recommend revoking the exposed key and creating a new one immediately. Remember to deploy the changes in your app to Live after replacing the secret key.

#### Can I use the plugin to connect to a Fitbit device?

The plugin connects to the Web API, which does not give direct access to a device.
