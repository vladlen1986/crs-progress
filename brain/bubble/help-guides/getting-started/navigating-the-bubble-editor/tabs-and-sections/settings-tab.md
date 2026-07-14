# Settings tab
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Settings tab lets you control key configuration options for your app. You’ll find options for general app info, privacy, API services, SEO, language, Bubble version, workload and features specific to mobile apps—all in one place. Use this section to manage how your app behaves, appears, and connects with users and external services.

Settings in this tab apply to the current app only—they do not affect your overall Bubble account.

## Sections

### App plan

Manage the plan your app is on, paid plugin subscriptions and file storage.

Article: [Pricing and Workload](/account-and-marketplace/account-and-billing/pricing-plans)\
Page: [Bubble pricing](https://bubble.io/pricing) (comparison of the different pricing plans)

#### General

General app settings such as:

* Privacy and security
* General appearance
* [General services API keys](#user-content-fn-1)[^1] (such as Sendgrid and Google Maps)
* [Custom fonts](#user-content-fn-2)[^2]
* [Importing Figma designs](#user-content-fn-3)[^3]
* [Optimize app](#user-content-fn-4)[^4]

### Domain/email

This is where you can connect your app to a domain and configure its [DNS settings](#user-content-fn-5)[^5]. This is also where you set your app's email settings and [SSL/TLS configuration](#user-content-fn-6)[^6].

Article: [Custom domain and DNS](broken://pages/Sfb2EVgX6WfgYIibQCNa)

### Languages

The Languages tab lets you translate static strings in your app into different languages and manage the settings for how users change their language.

Article: [App texts (translating your application)](/help-guides/data/static-data/app-texts-translations)

### SEO / metatags

This is where you'll find settings for SEO and social media sharing. In here you can manage:

* Title, description and image for social media
* Custom header and body
* 301 redirects
* Files in the root folder
* robots.txt and other SEO-related settings

Article: [Social media sharing](broken://pages/-MUUJGGgXT-x5NrF7ttC)\
Article: [Email settings](broken://pages/-MUUNYlJhe5tqMARhsWS)

### API

In the API section you can modify [your app's API settings](#user-content-fn-7)[^7].

Article: [The Bubble API](/help-guides/integrations/api/the-bubble-api)

### Collaboration

The Collaboration section lets you add other Bubble users to collaborate on your app, as well as controlling the access level of each collaborator. This is also where you transfer app ownership to another Bubble user.

Article: [Collaboration](/help-guides/maintaining-an-application/collaboration)

## Other ways to learn

<details>

<summary>Core reference</summary>

* [The settings tab](/core-resources/bubbles-interface/settings-tab)

</details>

<details>

<summary>Video lessons</summary>

* [How to set up a custom domain](https://www.youtube.com/watch?v=vGk6nfq41L4)

</details>

[^1]: Some of Bubble's features, such as sending emails and displaying maps, rely on external API services.\
    \
    You may need to enter your own API key for these services to work. This is handled in the general settings section.

[^2]: Bubble comes with a lot of fonts built-in, but you can also implement your own using the custom fonts feature.

    Article: [Using custom fonts](/help-guides/design/variables-and-styles/using-custom-fonts)

[^3]: Figma is a third-party design tool often used to create design drafts for applications. Using this feature you can import the design directly into Bubble.\
    \
    Article: [Importing Figma designs](/help-guides/design/importing-from-figma)\
    External page: [Figma website](https://www.figma.com/)

[^4]: As you develop your app, you can end up with data that's no longer needed, such as unused styles, deleted option sets and data types and element properties.

    The Optimize app feature clears unused data from your app to make the codebase lighter.

[^5]: DNS (Domain Name System) is a system that translates human-readable domain names (like bubble.io) into IP addresses (like 192.168.0.1) that computers use to identify each other on the internet.

    This is how a user's device connects to the correct server (identified by an IP address) when your app's URL is entered into the browser.

[^6]: SSL (Secure Sockets Layer) and TLS (Transport Layer Security) are cryptographic protocols designed to secure network traffic by encrypting the data.\
    \
    In practice, this means that the data sent to and from the Bubble server to the user's device is encrypted and secure.

    Article section: [The HTTP protocol](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)

[^7]: In this context, your app's API settings refer to *inbound* connections. You can read more about the Bubble API in the article below.\
    \
    Article: [The Bubble API](/help-guides/integrations/api/the-bubble-api)\
    \
    For outgoing requests to other systems, you need to use the API Connector plugin:

    Article: [The API Connector](/help-guides/integrations/api/the-api-connector)
