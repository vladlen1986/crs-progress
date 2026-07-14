# Pinterest plugin
> Source: https://manual.bubble.io/help-guides/data/user-accounts/authentication-plugins/pinterest-plugin · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## What is Pinterest?

Pinterest is a visual discovery engine where users can find ideas like recipes, home and style inspiration, and more. Users can save (pin) and share content (pins) on virtual boards, making it a popular platform for creative and DIY projects.

<figure><img src="/files/xJp0x7lXVyxZPwfWViJg" alt=""><figcaption></figcaption></figure>

1. First, open the *Install new plugins* screen in the Bubble editor.
2. To find this plugin, search for *Pinterest*. Optionally, you can check the *Login service* checkbox to further filter the results. You can also scroll to the bottom of the filters list, under *Built by* and select *Official* to single out official plugins.
3. Check that the Bubble logo is visible in the bottom-right, and then click *Install.*

### Setting up and configuring the Pinterest API

<details>

<summary>External documentation</summary>

To set up an account and generate and manage the credentials, please follow the up-to-date directions provided in the official Pinterest Developer documentation.

External page: [Pinterest for Developers](https://developers.pinterest.com/)

</details>

The Pinterest API follows a common pattern of requiring two different keys to authenticate your app.

* **API key:** The App ID (also referred to as the API Key in some contexts) is essentially the public identifier for your app. Think of it like the name tag your app wears when it talks to Pinterest. In this context, it's not to be confused with your secret access token: In fact, the Client ID doesn't need to be kept secret.
* **Secret key:** The Secret Key, on the other hand, is like a password. It's used to secure communication between your app and Pinterest's servers. Exposure of the Secret Key can lead to security risks, unlike the App ID.

## Setting up the Pinterest plugin

After installing the plugin, you'll find it in your list of installed plugins and can click it to access its settings:

<figure><img src="/files/zINOA5M8X21tl9Z3nj9Y" alt=""><figcaption></figcaption></figure>

## Permissions

1. **write\_public:**
   * This permission allows your application to write or post content to the end-user's Pinterest boards.
2. **read\_relationships:**
   * This permission grants your application access to read information about the end-user's relationships on Pinterest.
3. **write\_relationships:**
   * This permission enables your application to make changes to the user's relationships or connections on Pinterest. It may involve actions like following or unfollowing other Pinterest users.

Note that the specific implementation and requirements of these permissions may require separate authorization from the end-user during the authentication process.

## Actions, elements and data sources

To see the plugin's actions and data sources, as well as their properties, please see the core reference article below:

Reference: [Pinterest](broken://pages/jHperPW6Cal3msovwvnI)

## FAQ: Pinterest plugin

#### What should I do if I accidentally expose my App ID?

The App ID is a public identifier, and does not need to be replaced if it's exposed.

#### What should I do if I accidentally expose my secret key?

The secret key should be kept securely private, as exposure can lead to security risks. We strongly recommend revoking the exposed key and creating a new one immediately. Remember to deploy the changes in your app to Live after replacing the secret key.
