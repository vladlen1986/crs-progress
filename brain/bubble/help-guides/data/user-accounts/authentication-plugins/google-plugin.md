# Google plugin
> Source: https://manual.bubble.io/help-guides/data/user-accounts/authentication-plugins/google-plugin · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## What is Google?

Google is a tech giant best known for its search engine. It also offers a wide range of services and products including Gmail, Google Maps, Google Drive, and Android, among others. It's integral to many aspects of digital life, from web browsing to cloud storage. Google is a subsidiary of holding company Alphabet Inc.

The Bubble-made Google OAUth plugin lets end-users log in with their Google account, and fetch their profile data.

<figure><img src="/files/2pLsNsKEi1eE6OMuKmNv" alt=""><figcaption></figcaption></figure>

1. First, open the *Install new plugins* screen in the Bubble editor.
2. To find this plugin, search for *Google*. Optionally, you can check the *Login service* checkbox to further filter the results. You can also scroll to the bottom of the filters list, under *Built by* and select *Official* to single out official plugins.
3. Check that the Bubble logo is visible in the bottom-right, and then click *Install.*

### Setting up and configuring the Google API

<details>

<summary>External documentation</summary>

To set up an account and generate and manage the credentials, please follow the up-to-date directions provided in the official Google Developer documentation.

External page:[ Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2)

</details>

The Google API follows a common pattern of requiring two different keys to authenticate your app.

* **App ID:** The App ID (also referred to as the API Key in some contexts) is essentially the public identifier for your app. Think of it like the name tag your app wears when it talks to Google. In this context, it's not to be confused with your secret access token: In fact, the Client ID doesn't need to be kept secret.
* **App Secret (access token):** The Secret Key, on the other hand, is like a password. It's used to secure communication between your app and Google's servers. Exposure of the Secret Key can lead to security risks, unlike the App ID.

## Setting up the Google plugin

After installing the plugin, you'll find it in your list of installed plugins and can click it to access its settings:

<figure><img src="/files/Qj16Zi6YJSa2tLhJU4eF" alt=""><figcaption></figcaption></figure>

## Actions, elements and data sources

To see the plugin's actions and data sources, as well as their properties, please see the core reference article below:

Reference: [Google](/core-resources/bubble-made-plugins/google)

## FAQ: Google plugin

#### What should I do if I accidentally expose my App ID?

The App ID is a public identifier, and does not need to be replaced if it's exposed.

#### What should I do if I accidentally expose my secret key?

The secret key should be kept securely private, as exposure can lead to security risks. We strongly recommend revoking the exposed key and creating a new one immediately. Remember to deploy the changes in your app to Live after replacing the secret key.
