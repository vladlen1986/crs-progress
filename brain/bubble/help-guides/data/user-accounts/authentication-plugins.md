# Authentication plugins
> Source: https://manual.bubble.io/help-guides/data/user-accounts/authentication-plugins · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

OAuth plugins allow you log users in using a third-party authentication[^1] platform such as Google, Facebook, LinkedIn, X (formerly Twitter), Instagram and others.

This article series covers how to set up the official plugins developed by Bubble or the third party offering the external service.

{% hint style="info" %}
This article series covers the Bubble-made/provider-made OAuth plugins. There may be other plugins available in the plugin stores the offer different features on the same OAuth providers, or additional OAuth providers. For documentation and the latest updates on these plugins, please reach out to the plugin creators.
{% endhint %}

{% hint style="info" %}
Throughout this article, we will refer to *you* as the Bubble developer as the *user*, and the users of your app as *end-users*.
{% endhint %}

## Auth: The basics

Imagine you're at a party and someone you trust (like a friend) vouches for someone new, saying they're cool. You're more likely to trust this new person because your friend says they're okay. That's kind of like what OAuth does, but in the digital world.

### **What is OAuth?**

OAuth stands for "Open Authorization", and is a standard for delegating access to apps and systems. In simpler terms, it lets an end-user give an app permission to access their information on another app without giving away the password to that app.

In this context, it means that the user can use that third-party platform to sign up and log in to your Bubble app. It sometimes means that your app can fetch information about that end-user, such as their email, name, social media posts and profile picture too, removing the need for a manual form. In some cases, the user can choose what information to reveal.

### **How does OAuth work?**

1. **Requesting Permission**: When an end-user uses your app, and needs to access information from another service (like Google, Facebook, etc.), the web app will redirect the end-user to a form hosted by that app/system, and ask for permission. This is like asking, "Hey, can I check your info on Google?"
2. **Approval and Tokens**: If the end-user says "Yes," Google (in this case) gives your app a special code, called an *access* [*token*](#user-content-fn-2)[^2]. Think of this token like a temporary VIP pass; it lets the web app access only what the end-user agreed to share and nothing more.
3. **Access and Security**: The web app uses this token to get the information it needs. Your app never knows the end-user's password for Google, giving the user a secure way to sign up/log in.

### Why is OAuth useful?

1. **Security**: It keeps passwords safe. The end-users password with the OAuth provider is never revealed to your Bubble app.
2. **Control**: End-users can control what information they share and can revoke access at any time.
3. **Convenience**: It's easier for end-users. They don’t need to create new accounts for every web app they use.

### How does OAuth look to the end-user?

Most of your end-users are not aware of what OAuth is and how it works, and in most cases, they don't have it, as long as it provides an easy-to-use and secure way to sign up and log in.

Here's how the process typically unfolds:

1. **Choosing to connect**: The end-user arrives at your app and sees an option to log in or sign up using services like Google or Facebook.
2. **Clicking to proceed**: They select this option, often presented as a button labeled "Sign in with Google" or similar.
3. **Reviewing permissions**: A pop-up window appears, asking the end-user to confirm if they are comfortable sharing certain information with your app, such as their email address.
4. **Consenting to share**: If the end-user agrees, they click "Allow" or a similar confirmation button.
5. **Access granted**: Your app now accesses the necessary information, and the end-user is directed to their account, ready to use your app's features.
6. **Managing access**: The end-user can always manage what information they've shared with various apps, including yours, through their account settings on the service they used to log in.

## Actions, elements and data sources

### Actions

Signing up/logging in using a third-party OAuth app can add new actions[^3] to your app, relevant to the app the end-user is using to authenticate. For example, the Slack plugin allows you to post bot messages in a given Slack channel.

### Data sources

Some OAuth providers provide new [data sources](#user-content-fn-4)[^4] that can provide basic or extensive data about the end-user on that platform, such as:

* The end-user's full name and/or nickname
* Profile picture
* Social media posts

### Elements

Some plugins also add new elements to the Bubble editor. For example, the Facebook plugin offers an element to show a number of likes for a given Facebook page.

## Official Bubble OAuth plugins

We have individual articles on each of the official OAuth plugins created by Bubble or the third-party provider:

1. [Facebook](/help-guides/data/user-accounts/authentication-plugins/facebook-plugin)
2. [Fitbit](/help-guides/data/user-accounts/authentication-plugins/fitbit-plugin)
3. [Google](/help-guides/data/user-accounts/authentication-plugins/google-plugin)
4. [Instagram](/help-guides/data/user-accounts/authentication-plugins/instagram-plugin)
5. [LinkedIn](/help-guides/data/user-accounts/authentication-plugins/linkedin-plugin)
6. [Pinterest](/help-guides/data/user-accounts/authentication-plugins/pinterest-plugin)
7. [Slack](/help-guides/data/user-accounts/authentication-plugins/slack-plugin)
8. [Wistia](/help-guides/data/user-accounts/authentication-plugins/wistia-plugin)
9. [YouTube](/help-guides/data/user-accounts/authentication-plugins/youtube-plugin)

Note that this is not an extensive list of all Bubble-made plugins, but only the ones that offer authentication.

## External documentation

Throughout this article series, we often point to external documentation. This approach is taken to guarantee that the information provided is both current and accurate. For instance, the method for generating and retrieving an API token or key can vary based on the specific service you're linking to. In these cases, the documentation from the respective third-party service is the definitive and up-to-date source for such procedures.

Please note that Bubble is not responsible for the content found in these third-party links.

## FAQ: Third-party authentication plugins

#### Is OAuth secure?

Yes, OAuth is considered highly secure, equal to using a username and password. All communication with the third-party is encrypted and routed through Bubble's server.

#### Can I offer more than one authentication service?

Yes, you can offer as many as you like, but the end-user's selected choice is permanent. If the end-user wants to connect to a different provider after signing up, they will need to create a new account.

#### Can I combine an OAuth account with a traditional email/password account?

Users in Bubble can use traditional logins and social logins at the same time. There are a few cases here:

* **Signing up when logged in:** When a user already logged in with their email and password chooses to link their account with an OAuth provider, their existing account gets updated with the new authentication credentials. This means no new user account is created. After completing this linking process, the user has the flexibility to log in either with their email and password or through the OAuth flow.
* **Email already exists:** However, if a user tries to sign up by linking an account with OAuth and another user in the database already has the same email as the one provided by the external service, the process won't succeed. Instead, the user will receive a notification about the issue.
* **Signing up without being logged in (existing account):** On the other hand, if a user isn't logged in and goes through the OAuth flow, the system will create a new user account. But, if there's an existing user in the app's database with the same email as the one registered with the external service (like Facebook), this action will also fail, and the user will be informed.
* **Adding password to existing OAuth account:** For users who initially signed up using an external service and want to add a password to their account, they can do so by initiating a 'reset the user's password' action. This step adds email and password credentials to their account, which previously only used OAuth for authentication.

## Other ways to learn

<details>

<summary>Articles</summary>

Introduction to how user accounts work in Bubble:

* [User accounts](/help-guides/data/user-accounts)

The authentication plugins are an easier way to connect to API services. To learn more about what APIs are and how to set up your own connections, see the article series below:

* Article series: [APIs](/help-guides/integrations/api)

</details>

<details>

<summary>Videos</summary>

* [User authentication (Bubble Introduction Series \[6/10\])](https://www.youtube.com/watch?v=gn0TixSCmGU)

</details>

[^1]: *Authentication* is the process of determining *who* an end-user is, in order to give or refuse them access to a system. It's comparable to showing your passport at the airport.\
    \
    Not to be confused with *authorization,* which is the process of determining *what* that end-user should have access to.

[^2]: An access token is a string of letters and numbers, often structured as a long, random-looking sequence. It acts as a secure key, enabling your app to access specific end-user account information on another service without needing the user's password.

    This is considered more secure as the password as it is unique for each connection and can be revoked by the end-user.

[^3]: *Actions* are the part of a workflow that makes something happen, such as creating a database thing, hiding/showing something on the page or navigating to a different page.

    In this context, actions are new types of things you can do in your app as a result of adding a new plugin.

    Article series: [Workflows](/help-guides/logic/workflows)

[^4]: Data sources are any source from which Bubble can fetch data, such as *Do a search for* to find data in the database.

    In this context, a data source may give your app access to data from a third-party system. See the examples below.
