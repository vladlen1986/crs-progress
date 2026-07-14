# Slack plugin
> Source: https://manual.bubble.io/help-guides/data/user-accounts/authentication-plugins/slack-plugin · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## What is Slack?

Slack is a business communication platform offering many features like chat rooms, direct messaging, and integration with various third-party services. It's widely used in professional environments for team collaboration and communication.

The plugin lets your end-users sign up and log in with Slack, access Slack data, and perform actions as a Slack user or bot, such as sending messages and posts.

<figure><img src="/files/aVAV8brF8AXaTxBym2YA" alt=""><figcaption></figcaption></figure>

1. First, open the *Install new plugins* screen in the Bubble editor.
2. To find this plugin, search for *Slack*. Optionally, you can check the *Login service* checkbox to further filter the results. You can also scroll to the bottom of the filters list, under *Built by* and select *Official* to single out official plugins.
3. Check that the Bubble logo is visible in the bottom-right, and then click *Install.*

### Setting up and configuring the Slack API

<details>

<summary>External documentation</summary>

To set up an account and generate and manage the credentials, please follow the up-to-date directions provided in the official Slack Developer documentation.

External page: [Slack for Developers](https://api.slack.com/docs)

</details>

The Slack API follows a common pattern of requiring two different keys to authenticate your app.

* **API key:** The App ID (also referred to as the API Key in some contexts) is essentially the public identifier for your app. Think of it like the name tag your app wears when it talks to Slack. In this context, it's not to be confused with your secret access token: In fact, the Client ID doesn't need to be kept secret.
* **Secret key:** The Secret Key, on the other hand, is like a password. It's used to secure communication between your app and Slack's servers. Exposure of the Secret Key can lead to security risks, unlike the App ID.

## Setting up the Slack plugin

After installing the plugin, you'll find it in your list of installed plugins and can click it to access its settings:

<figure><img src="/files/DDwBYRmIqNjT8XCryonq" alt=""><figcaption></figcaption></figure>

## Actions, elements and data sources

To see the plugin's actions and data sources, as well as their properties, please see the core reference article below:

Reference: [Pinterest](broken://pages/jHperPW6Cal3msovwvnI)

## FAQ: Slack plugin

#### What should I do if I accidentally expose my Client ID?

The Client ID is a public identifier, and does not need to be replaced if it's exposed.

#### What should I do if I accidentally expose my secret key?

The secret key should be kept securely private, as exposure can lead to security risks. We strongly recommend revoking the exposed key and creating a new one immediately. Remember to deploy the changes in your app to Live after replacing the secret key.
