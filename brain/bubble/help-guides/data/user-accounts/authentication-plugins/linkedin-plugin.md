# LinkedIn plugin
> Source: https://manual.bubble.io/help-guides/data/user-accounts/authentication-plugins/linkedin-plugin · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

#### What is LinkedIn?

LinkedIn is a professional networking platform where individuals and organizations can connect, share job opportunities, and build professional relationships. It's widely used for career development and professional networking. LinkedIn is owned by Microsoft.

<figure><img src="/files/TIEna16K4nvoGB3G1TLs" alt=""><figcaption></figcaption></figure>

1. First, open the *Install new plugins* screen in the Bubble editor.
2. To find this plugin, search for *LinkedIn*. Optionally, you can check the *Login service* checkbox to further filter the results. You can also scroll to the bottom of the filters list, under *Built by* and select *Official* to single out official plugins.
3. We recommend that you use the *LinkedIn using OpenID Connect*, as the older *LinkedIn* plugin is no longer updated.
4. Check that the Bubble logo is visible in the bottom-right, and then click *Install.*

### Setting up and configuring the LinkedIn API

<details>

<summary>External documentation</summary>

To set up an account and generate and manage the credentials, please follow the up-to-date directions provided in the official LinkedIn Developer documentation.

External page: [LinkedIn API](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access?context=linkedin%2Fcontext)

</details>

The LinkedIn API follows a common pattern of requiring two different keys to authenticate your app.

* **API key:** The App ID (also referred to as the API Key in some contexts) is essentially the public identifier for your app. Think of it like the name tag your app wears when it talks to LinkedIn. In this context, it's not to be confused with your secret access token: In fact, the Client ID doesn't need to be kept secret.
* **Secret key:** The Secret Key, on the other hand, is like a password. It's used to secure communication between your app and LinkedIn's servers. Exposure of the Secret Key can lead to security risks, unlike the App ID.

## Setting up the LinkedIn plugin

After installing the plugin, you'll find it in your list of installed plugins and can click it to access its settings:

<figure><img src="/files/e0FKasybPy8y1ltnWik8" alt=""><figcaption></figcaption></figure>

## Actions, elements and data sources

To see the plugin's actions and data sources, as well as their properties, please see the core reference article below:

Reference: [LinkedIn](/core-resources/bubble-made-plugins/linkedin)

## FAQ: LinkedIn plugin

#### What should I do if I accidentally expose my App ID?

The App ID is a public identifier, and does not need to be replaced if it's exposed.

#### What should I do if I accidentally expose my secret key?

The secret key should be kept securely private, as exposure can lead to security risks. We strongly recommend revoking the exposed key and creating a new one immediately. Remember to deploy the changes in your app to Live after replacing the secret key.
