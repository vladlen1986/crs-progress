# WorkOS SSO
> Source: https://manual.bubble.io/help-guides/integrations/workos/workos-sso · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
In configuring your app’s integration with WorkOS, you'll find that a big part of the setup happens within WorkOS itself. For up-to-date documentation on this process, be sure to refer to WorkOS documentation.

External page: [WorkOS Docs](https://workos.com/docs)
{% endhint %}

## Understanding SSO

### What is SSO?

Single Sign-On (SSO) is a user authentication service that allows a user to use one set of login credentials (e.g., name and password) to access multiple applications. Essentially, it simplifies the login process by eliminating the need for different usernames and passwords for each application.

You may have already used this in different contexts. For example, you can log in to your Bubble account using your Google credentials, even though Bubble is not affiliated with Google. For single end-users, this can make signup and login processes more streamlined, and for enterprise users it helps maintain a higher degree of security, as administrators can manage all their employees in one centralized system (in this case WorkOS).

When you use an SSO provider to log into another service, the login credentials are not shared with that service. For example, when you use your Google credentials to log into your Bubble account, Bubble never has access to your credentials.

### Why is this important for enterprise end-users?

For enterprise end-users, SSO is crucial for several reasons. Firstly, it simplifies account management and compliance with corporate security policies, making it easier to manage individual employees and oversee permissions as the enterprise scales in size. Secondly, it boosts efficiency and user experience, as employees can quickly access multiple tools and services without repeatedly logging in. Finally, it enhances security by allowing administrators to establish robust, cross-platform password policies and prevent employees from reusing the same password across multiple accounts.

### How does WorkOS facilitate SSO?

#### For you as the developer

WorkOS facilitates SSO by acting as an intermediary between your app and various identity providers (IdPs) like Google or Microsoft. It handles the complex part of the authentication process, allowing your app to offer a streamlined login experience without having to build and maintain the infrastructure for each IdP's authentication protocol. This outsources both the work needed to implement additional IdPs in your app, and lets each of your clients use the IdP that their organization prefers.

For many larger and enterprise organizations, this is not only a convenience or preference, but a necessity as part of their security policy. As such, the WorkOS plugins can open the door to an additional group of clients, without needing extensive customization to offer the right IdPs.

#### For your enterprise administrators

WorkOS allows administrators to manage Single Sign-On (SSO) through an admin portal, where they can:

* **Set up and configure SSO connections:** Admins can establish connections with various identity providers (IdPs), like Google or Microsoft, customizing the SSO experience to align with their organization's needs.
* **Control user access:** They have the ability to manage which users or groups within their organization have access to specific applications, ensuring that the right people have the right access.
* **Monitor and audit logins:** The portal provides tools for tracking and auditing user logins and activities.
* **Customize authentication policies:** Administrators can define and enforce authentication policies, including multi-factor authentication requirements.
* **Troubleshoot and support users:** The admin portal offers tools to assist with any SSO-related issues.

By centralizing these functions, WorkOS makes it easier for administrators to implement and manage SSO effectively across their organization's applications.

#### How does an SSO login process work for end-users with the WorkOS SSO API?

When an end-user logs in to an app integrated with the WorkOS SSO API, they are redirected to a familiar identity provider's login page (like their corporate login system or that of a third party such as Google). After entering their credentials, WorkOS verifies their identity and sends a confirmation back to the app, granting the user access. This process is seamless, secure, and requires minimal input from the user, aligning with their existing login habits.

#### How can enterprise administrators manage their organization in WorkOS?

Enterprise administrators can manage their organization in WorkOS through the Admin Portal. Here, they can configure SSO connections, set up and adjust authentication policies, and manage user access to various applications. This centralized management system allows for efficient control over how employees access and use enterprise applications, ensuring both ease of use and adherence to security protocols.

## Setting up a signup/login workflow with WorkOS

After having installed the plugin and set up the ID and secret key in the plugin settings, you can start using WorkOS as a signup and login action. First, set up the event/workflow where you want the signup or login to take place, and then add the Signup/login with a social network action.

Then, pick WorkOS SSO as the OAuth provider.

<figure><img src="https://lh7-us.googleusercontent.com/5kHDFaWrn_sB_a9v5KsLffZVdZUDeNoDr3xjAPy31k4kl7owVbZ4zflgeR9XDOaY-xuyXFeSscBl_SNCzi5Vl8z5rxYcj52B9cgUmNj__MWedOupqJoQl_6A9CI2TKKA6iBTD0yR3frotew8RRc_yvg" alt="" width="375"><figcaption></figcaption></figure>

The action property editor will ask for three more pieces of information (assuming that you have already entered the App ID and secret key in the plugin settings):

#### Connection ID

A Connection refers to a link or integration between your app and the identity provider (like Google Workspace, Microsoft Azure AD, etc.). This connection is what allows your application to communicate with these external services. Each SSO integration with a different identity provider is a separate connection.

#### Organization ID:

An Organization is the top-level resource in WorkOS, and represents a company or a group of users that share the same domain or are part of the same corporate structure. When you integrate WorkOS into your app, you can configure it to recognize different organizations. This way, users belonging to a particular organization can have specific authentication providers/methods and access controls.

#### Provider:

The Provider refers to the external service or identity provider that WorkOS can connect to. These are the services like Google Workspace, Microsoft Azure AD, Okta, etc., that provide identity management.

When you set up a connection in WorkOS, you specify which provider you're connecting to, and this determines how your app will interact with that service.

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
