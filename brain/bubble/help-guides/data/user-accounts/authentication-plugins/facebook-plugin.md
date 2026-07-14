# Facebook plugin
> Source: https://manual.bubble.io/help-guides/data/user-accounts/authentication-plugins/facebook-plugin · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This is the long-form article on this topic, designed to provide a comprehensive understanding and broader context. For those seeking more technical details, including all properties and settings, be sure to check out our core reference.

Reference: [Facebook Graph API plugin](/core-resources/bubble-made-plugins/facebook)
{% endhint %}

## What is Facebook?

Facebook is a widely-used social media platform that allows users to connect with friends and family, share photos and videos, join groups, and participate in various social activities online. It's known for its vast user base and influential role in digital communication and media sharing.

The Facebook plugin allows your end-users to sign up/log in to their app using their Facebook account, as well as showing a *Likes* and *Pages* element relevant to their account in your app. You can also enable a broader access that includes the end-user's list of friends.

## Installing the Facebook Graph API plugin

<figure><img src="/files/UyVMvMF4k1wMCfR1QFVx" alt=""><figcaption></figcaption></figure>

1. First, open the *Install new plugins* screen in the Bubble editor.
2. To find this plugin, search for *Facebook*. Optionally, you can check the *Login service* checkbox to further filter the results. You can also scroll to the bottom of the filters list, under *Built by* and select *Official* to single out official plugins.
3. Check that the Bubble logo is visible in the bottom-right, and then click *Install.*

## Setting up the Facebook OAuth plugin

After installing the plugin, you'll find it in your list of installed plugins and can click it to access its settings:

<figure><img src="/files/vPqeuUAdEKRfqA1TsRym" alt=""><figcaption></figcaption></figure>

### Keys

<details>

<summary>External documentation</summary>

To generate and manage the App ID and secret key, please follow the directions provided in the official Meta for Developers documentation.

External page: [Meta for developers](https://developers.facebook.com/docs/facebook-login/overview)

</details>

The Facebook Graph API follows a common pattern of requiring two different keys to authenticate your app.

* **App ID/API key (client token):** The App ID (also referred to as the API Key in some contexts) is essentially the public identifier for your app. Think of it like the name tag your app wears when it talks to Facebook. In this context, it's not to be confused with your secret access token: In fact, the App ID doesn't need to be kept secret.
* **App secret (access token):** The Secret Key, on the other hand, is like a password. It's used to secure communication between your app and Facebook's servers. Exposure of the Secret Key can lead to security risks, unlike the App ID.

### Scope

We offer two different scopes for the Facebook Graph API, that have the following properties:

#### Simple

The *Simple* option grants access to basic information such as the user's name, email, and profile picture. This option requires less permissions to be enabled when the end-user authenticates for the first time.

#### With friends

The *With friends* option extends this access to include the user's list of friends. Choosing this permission requires broader permissions from the end-user when they authenticate for the first time.

## Development keys and Live keys

Facebook offers the convenient option of having separate keys for the development and live versions of your app. This feature is highly recommended as it allows you to thoroughly test your application during development without impacting the live connection.

Using separate keys ensures that any changes or tests you perform in the development stage won't affect your end-users who are interacting with the live version of your app. See Meta's [documentation](#external-documentation) for more information on setting up development keys.

## Actions, elements and data sources

To see the plugin's elements, actions and data sources, as well as their properties, please see the core reference article below:

Reference: [Facebook](/core-resources/bubble-made-plugins/facebook)

## FAQ: Facebook Graph API plugin

#### What should I do if I accidentally expose my App ID?

The App ID is a public identifier, and does not need to be replaced if it's exposed.

#### What should I do if I accidentally expose my secret key?

The secret key should be kept securely private, as exposure can lead to security risks. We strongly recommend revoking the exposed key and creating a new one immediately. Remember to deploy the changes in your app to Live after replacing the secret key.
