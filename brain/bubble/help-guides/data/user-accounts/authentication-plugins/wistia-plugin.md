# Wistia plugin
> Source: https://manual.bubble.io/help-guides/data/user-accounts/authentication-plugins/wistia-plugin · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## What is Wistia?

Wistia is a video hosting platform designed to create, host, and share videos. It's known for its marketing features like video SEO, analytics, and integrations with various marketing tools.

The plugin lets end-users log in with their Wistia accounts, and fetch the list of videos they've uploaded to Wistia.

<figure><img src="/files/iBeaQliXI24wVtTxqRq6" alt=""><figcaption></figcaption></figure>

1. First, open the *Install new plugins* screen in the Bubble editor.
2. To find this plugin, search for *Wistia*. Optionally, you can check the *Login service* checkbox to further filter the results. You can also scroll to the bottom of the filters list, under *Built by* and select *Official* to single out official plugins.
3. Check that the Bubble logo is visible in the bottom-right, and then click *Install.*

### Setting up and configuring the Wistia API

<details>

<summary>External documentation</summary>

To set up an account and generate and manage the credentials, please follow the up-to-date directions provided in the official Wistia Developer documentation.

External page: [Wistia Developer Docs](https://docs.wistia.com/)

</details>

The Wistia API follows a common pattern of requiring two different keys to authenticate your app.

* **Client ID:** The Client ID (also referred to as the API Key in some contexts) is essentially the public identifier for your app. Think of it like the name tag your app wears when it talks to Wistia. In this context, it's not to be confused with your secret access token: In fact, the Client ID doesn't need to be kept secret.
* **Client Secret:** The Client Secret Key, on the other hand, is like a password. It's used to secure communication between your app and Wistia's servers. Exposure of the Secret Key can lead to security risks, unlike the App ID.

## Setting up the Wistia plugin

After installing the plugin, you'll find it in your list of installed plugins and can click it to access its settings:

<figure><img src="/files/gXUvWqsIgsUuANuQinqB" alt=""><figcaption></figcaption></figure>

## Actions, elements and data sources

To see the plugin's actions and data sources, as well as their properties, please see the core reference article below:

Reference: [Wistia](broken://pages/-MjjIixWxUU5VBBv0Feq)

## FAQ: Wistia plugin

#### What should I do if I accidentally expose my Client ID?

The Client ID is a public identifier, and does not need to be replaced if it's exposed.

#### What should I do if I accidentally expose my secret key?

The secret key should be kept securely private, as exposure can lead to security risks. We strongly recommend revoking the exposed key and creating a new one immediately. Remember to deploy the changes in your app to Live after replacing the secret key.
