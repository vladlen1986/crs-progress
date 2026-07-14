# YouTube plugin
> Source: https://manual.bubble.io/help-guides/data/user-accounts/authentication-plugins/youtube-plugin · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## What is YouTube?

YouTube is a leading online video sharing and social media platform where users can upload, view, and share videos. It hosts a wide variety of content, including music videos, vlogs, educational content, and much more, making it one of the most visited websites globally. YouTube is owned by Goggle.

Let users log in with their YouTube accounts, and fetch the list of videos they've uploaded.<br>

<figure><img src="/files/nzy1CBFIPGd1FpnEOA6w" alt=""><figcaption></figcaption></figure>

1. First, open the *Install new plugins* screen in the Bubble editor.
2. To find this plugin, search for *YouTube*. Optionally, you can check the *Login service* checkbox to further filter the results. You can also scroll to the bottom of the filters list, under *Built by* and select *Official* to single out official plugins.
3. Check that the Bubble logo is visible in the bottom-right, and then click *Install.*

### Setting up and configuring the YouTube API

<details>

<summary>External documentation</summary>

To set up an account and generate and manage the credentials, please follow the up-to-date directions provided in the official YouTube Developer documentation.

External page: [YouTube API docs](https://developers.google.com/youtube/v3/docs/) (part of Google's API documentation)

</details>

The YouTube API follows a common pattern of requiring two different keys to authenticate your app.

* **App ID:** The App ID (also referred to as the API Key in some contexts) is essentially the public identifier for your app. Think of it like the name tag your app wears when it talks to YouTube. In this context, it's not to be confused with your secret access token: In fact, the Client ID doesn't need to be kept secret.
* **App Secret:** The App Secret Key, on the other hand, is like a password. It's used to secure communication between your app and YouTube's servers. Exposure of the Secret Key can lead to security risks, unlike the App ID.

<figure><img src="/files/1GTmhiP56IDnmzY3rAc4" alt=""><figcaption></figcaption></figure>

## Setting up the YouTube plugin

After installing the plugin, you'll find it in your list of installed plugins and can click it to access its settings:

## Actions, elements and data sources

To see the plugin's actions and data sources, as well as their properties, please see the core reference article below:

Reference: [YouTube](/core-resources/bubble-made-plugins/youtube)

## FAQ: YouTube plugin

#### What should I do if I accidentally expose my Client ID?

The Client ID is a public identifier, and does not need to be replaced if it's exposed.

#### What should I do if I accidentally expose my secret key?

The secret key should be kept securely private, as exposure can lead to security risks. We strongly recommend revoking the exposed key and creating a new one immediately. Remember to deploy the changes in your app to Live after replacing the secret key.
