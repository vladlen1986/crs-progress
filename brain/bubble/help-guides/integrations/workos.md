# WorkOS
> Source: https://manual.bubble.io/help-guides/integrations/workos · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
WorkOS equips your app with advanced SSO and other enterprise-level functionalities. However, if your primary focus is to provide SSO mainly for individual end-users or small to medium-sized businesses, WorkOS might be more extensive than necessary.

In such cases, opting for our [simpler SSO plugins](#user-content-fn-1)[^1] could be a more suitable and straightforward solution.
{% endhint %}

## What is WorkOS

WorkOS specializes in helping developers prepare their apps for enterprise scalability, particularly by simplifying the inclusion of crucial security features such as [single sign-on (SSO)](#user-content-fn-2)[^2] and Directory Sync.

They also facilitate smoother integrations with user administration features systems like Systems for Cross-domain Identity Management (SCIM) and [Human Resources Information Systems (HRIS)](#user-content-fn-3)[^3]. Additionally, WorkOS offers a centralized platform for managing multiple integrations with various identity and directory providers, streamlining the process significantly.

{% hint style="info" %}
**End-user feature**: Before we dive in, it’s important to understand that WorkOS is for your end-users – it does not affect the access to your Bubble account. For this, you may explore our Bubble for Enterprise article series.

Article series: [Bubble for Enterprise](/help-guides/bubble-for-enterprise)
{% endhint %}

## Why use WorkOS?

As your app expands or as you cater to larger clients, the significance of enterprise-grade security, seamless authentication, and user administration escalates. Single Sign-On (SSO) has become not just a sought-after feature among general users but in many cases a fundamental necessity for businesses at the enterprise level. The WorkOS plugins simplify the incorporation and management of these essential elements, allowing you to concentrate more on building and growing your app.

In essence, WorkOS empowers system administrators within larger organizations to manage and customize the access permissions granted to individual employees for specific services, like your app. WorkOS provides a centralized dashboard that enables administrators to efficiently allocate and configure access levels.

## What can you use the WorkOS plugins for?

Bubble’s WorkOS features are divided into two different plugins:

### The WorkOS SSO plugin

**Short version:** integrating Single-Sign on into your Bubble workflows.

The WorkOS SSO plugin is made for integrating the WorkOS Single Sign-On (SSO) functionality directly into your Bubble workflows. This integration not only simplifies the authentication process for your end-users but also enhances security and efficiency.

This lets you provide a seamless sign-on experience, allowing end-users to access your Bubble app using their existing enterprise credentials. This feature is particularly useful for apps targeting corporate or enterprise-level end-users, as it aligns with the sophisticated security protocols these organizations often require.

WorkOS works with any Identity Provider (IdP) that adheres to the [SAML or OIDC protocols](#user-content-fn-4)[^4]. It's structured in accordance with the [OAuth 2.0 framework](#user-content-fn-5)[^5] specifications, which simplifies the complex authentication processes involved with various IdPs.

### The WorkOS workflow plugin

**Short version:** communicating with the WorkOS API, and making changes directly in your app that would otherwise need to be made in the WorkOS dashboard.

The WorkOS API plugin expands your toolkit significantly. It enables you to initiate a session in the Admin Portal — your hub for establishing connections — right within your Bubble app. Additionally, it adds a number of new actions to the workflow editor:

#### Plugin actions

* WorkOS API - SSO - Get Connection[^6]
* WorkOS API - SSO - List Connections
* WorkOS API - Organizations - Get Organization[^7]
* WorkOS API - Organizations - List Organizations
* WorkOS API - Organizations - Create Organization
* WorkOS API - Organizations - Update An Organization
* WorkOS API - Organizations - Delete Organization
* WorkOS API - Admin Portal - Generate [A Portal Link](#user-content-fn-8)[^8]
* WorkOS API - Directory Sync - Get A Directory
* WorkOS API - Directory Sync - List Directories
* WorkOS API - Directory Sync - Delete A Directory
* WorkOS API - Directory Sync - Get A Directory User
* WorkOS API - Directory Sync - List Directory Users
* WorkOS API - Directory Sync - Get A Directory Group
* WorkOS API - Directory Sync - List Directory Groups
* Webhooks - Validate Webhook

## Installing the WorkOS plugins

The WorkOS plugins are made in partnership with WorkOS and are official Bubble plugins, but still need to be installed in the apps where you want to use them.

<figure><img src="https://lh7-us.googleusercontent.com/6_7cp1NebaHd5Pe6SAxbv0arFmTguSw3tItKN68pLM5gKlIiHMYwvhSVBCQhOahBCEwq0Ber95V57jMoTtJkmOmsWXrlAWICWPXPrCchqICYhDpdAfRbhpmxnHb9DtjDVpfnoRVUr1mslqcWMtD5I7U" alt=""><figcaption><p>Search for WorkOS, and make sure the listing author is WorkOS to get the official plugins.</p></figcaption></figure>

The easiest way to find and install them, is to search for WorkOS and then make sure that the listing author is WorkOS, as illustrated with the right-hand, red rectangles in the screenshot above.

## Setting up your account and API key

{% hint style="warning" %}
**API security:** As always, it’s important to remember that API keys are sensitive information. You should not share it with anyone outside of your organization. Also, do not place it in any part of your app where it can be visible in your app’s source code.

The article series below covers this in more detail.

Article series: [Security](/help-guides/security#revealing-data-in-the-app-code)
{% endhint %}

### Set up your account

Before you start the work in Bubble, you need to set up a WorkOS account. Head over to <https://dashboard.workos.com/signup>.

After creating your account, WorkOS may ask you to set up your team. Finish all the details needed to finish the process.

### Accessing the API key

After signing up, you will be taken to the main WorkOS dashboard. On the left-hand side, you’ll find a menu where you can navigate to API keys.

It's essential to understand the terminological differences between WorkOS and Bubble for effective integration:

* The **API key** in WorkOS is called the **App secret** in Bubble. This App secret is critical for secure communication in both the Staging and Production environments.
* Similarly, the **App ID** in WorkOS corresponds to what Bubble refers to as the **App ID/API key**. This serves as a unique identifier for your app's integration with WorkOS.

#### Staging and production environments

WorkOS, much like many API providers and Bubble itself, operates in two distinct environments:

* **Staging**, which is similar to Bubble's [**Development environment**](#user-content-fn-9)[^9], allows for testing connections with greater freedom and no risk to live data.
* **Production**, akin to Bubble’s **Live environment**, is the interface for end-users.

For each environment, WorkOS provides separate keys:

* The Staging environment in WorkOS uses what Bubble terms as the App secret for its API key, and an App ID/API key corresponding to WorkOS's App ID.
* Likewise, in the Production environment, you have a different set of App secret and App ID/API key, ensuring that your live app's interactions are secure and distinct from the testing environment.

This separation of keys prevents the overlap of testing and live operations, maintaining the integrity and security of your app's interactions with WorkOS.

Note that at the time of writing, WorkOS requires that you add billing information before you can access your production API key. The staging environment is available while you are building and testing your app, and WorkOS does not charge anything until you create your first billable resource in production.

## Which of the two plugins should I use?

The order in which you set up Single Sign-On (SSO) and the WorkOS API can vary based on your specific needs and the functionalities you want to implement.

If your primary goal is to set up user authentication through SSO, it's logical to set up SSO first, and you may not need the WorkOS API plugin. This approach ensures that your app's user authentication aligns with enterprise standards.

On the other hand, if your focus is more on leveraging additional features that the WorkOS API offers, such as Directory Sync or advanced user management, you might prioritize setting up the WorkOS API. This will allow you to explore and integrate these features without necessarily having SSO configured from the start.

With that introduction, let’s have a closer look at each plugin.

## Keep reading

<details>

<summary>Articles</summary>

* [**WorkOS SSO**](/help-guides/integrations/workos/workos-sso)**:** setting up the single-sign on plugin
* [**WorkOS API**](/help-guides/integrations/workos/workos-api)**:** setting up the API plugin

</details>

## Other ways to learn

<details>

<summary>Articles</summary>

#### **Related articles**

* **Article series:**[ Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)
  * **Article:** [The API Connector](/help-guides/integrations/api/the-api-connector)
* Article series: [WorkOS](/help-guides/integrations/workos) (introduction to WorkOS)

#### Bubble for Enterprise

* Article: [SSO](/help-guides/bubble-for-enterprise/security-and-compliance/single-sign-on-sso) (setting up SSO for your Bubble account, as opposed to your Bubble app)

</details>

[^1]: We offer several Bubble-made plugins for popular services like Google, LinkedIn, Facebook and Instagram.

    Reference: [Bubble-made plugins](/core-resources/bubble-made-plugins)

[^2]: Single Sign-On (SSO) is a user authentication process that allows individuals to access multiple applications or systems with just one set of login credentials.

    This eliminates the need for separate logins for each system, simplifying the user experience and enhancing security. This is typically an important feature for enterprise clients.

[^3]: Human Resources Information Systems (HRIS) (often called simply HR software) are apps that help businesses take care of everything related to their employees.

    This often includes keeping records, paying salaries, managing benefits, hiring new people, and tracking/reporting employee deliverables and satisfaction.

[^4]: *SAML (Security Assertion Markup Language)* and *OIDC (OpenID Connect)* are sets of rules for securely exchanging user authentication and authorization data.

    Think of them as different languages that computers use to talk about who you are and what you're allowed to do in an application.

[^5]: OAuth 2.0 is a security framework for managing access to user data. It lets applications access each other's features without sharing full access to your accounts.

[^6]: A connection in WorkOS serves as a link between your app and its users, which can include individual accounts or entire company systems.

    It simplifies the login process by handling technical aspects behind the scenes, freeing your app from dealing with complex login standards like OAuth 2.0 and SAML directly.

[^7]: Organizations in WorkOS are used to group and manage users under a single umbrella, typically representing a company.

    This allows for management of users' access and permissions based on their organizational affiliation.

[^8]: A 'Portal Link' in WorkOS is a generated URL that leads to the WorkOS Admin Portal.

    This link is used by administrators to configure and manage the settings and integrations of their WorkOS implementation, such as setting up SSO connections or managing user access.

[^9]: Bubble's development environment, also known as *version-test*, is where you can test your app without deploying changes to the Live environment and without affecting live end-user data.

    Article series: [Version control](/help-guides/maintaining-an-application/version-control)
