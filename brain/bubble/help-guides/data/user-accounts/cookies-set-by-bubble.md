# Cookies set by Bubble
> Source: https://manual.bubble.io/help-guides/data/user-accounts/cookies-set-by-bubble · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This article covers cookies used by apps made in Bubble, as opposed to cookies used by the Bubble editor.
{% endhint %}

## What are cookies?

Cookies are small data files that apps and websites store on a user's browser. They allow an app to save information on the user's device and retrieve it when the app or website is reopened. This functionality enables a range of useful features, including:

* **Remembering information** – Cookies can store login details (such as “remember my email”), preferences (such as language and currency), and other customizations without requiring the user to create an account or log in.
* **Session management** – They help track a user’s activity within an app or website, making it possible to keep users logged in while they navigate or retain items in a shopping cart during a session.
* **Tracking and analytics** – Cookies collect data on how users interact with a site, allowing app and website owners to analyze behavior, optimize the user experience, and deliver more relevant content.
* **Security** – They contribute to security measures by helping authenticate users and preventing unauthorized access or fraudulent use of login credentials.-

### Cookies on different devices

Since cookies are stored as files on the user's device, they do not automatically transfer across different devices. For example, if a non-logged-in user selects a language preference in your app on their laptop, that preference will only be available on that device. If they later access the app from their phone, they will need to reconfigure their settings.

Additionally, because cookies are stored like any other files on a device, they can be deleted—either manually by the user or automatically by the browser as part of storage management or privacy settings.

## How do I control what cookies my app uses?

We can separate cookies in a Bubble app into two categories:

### Cookies set by Bubble

These are the cookies Bubble sets by default. You can read more about them in the section [below](#bubbles-default-cookies).

### Third-party cookies

Third parties may also add cookies to a user’s device. For example, if you integrate an analytics service like Google Analytics—whether through a plugin or a custom code snippet—that service may place additional cookies to function properly.

If a plugin sets cookies, Bubble does not have the ability to provide granular control over them. If this is a concern, we recommend installing the plugin and testing it in run mode to see what cookies are being set. This can help determine whether the plugin aligns with your privacy and data management requirements.

## Bubble's default cookies

By default, Bubble sets a few essential cookies for users and visitors of your Bubble app. These cookies are used for authentication and enable key platform functionality, such as keeping a user logged in and linking a visitor to their account upon sign-up.

Specifically, Bubble sets the following cookies:

* **Session ID** – Identifies the user’s session.
* **Session signature** – Ensures session integrity and prevents tampering.
* **User identifier** – Identifies the current logged-in user for authentication purposes.

### Disabling default Bubble cookies

You can use the [Do not set cookies on new visitors by default](#user-content-fn-1)[^1] in the *Settings - General* sub-tab. This is disabled by default, and needs to be set on each individual app. Keep in mind that disabling cookies can reduce the functionality of your Bubble app.

The setting will mean the following for your app:

* The following functionality will be disabled:
  * Temporary user accounts for non-logged in users will not be created (which means you can not save any data to the "current user" until the user has logged in.
  * This also means you can no longer transfer data to a user when they sign up (such as storing the items of a shopping cart)
* Cookies will still be set when:
  * The [*Opt-in to cookies*](#user-content-fn-2)[^2] action is used. This will initiate the creation of the temporary user object in the same way as would otherwise happen automatically, but only on the user who triggers the action.
  * The user logs in or signs up: Bubble can't keep users logged in without cookies, meaning that in this case, cookies will be created regardless.

### Default cookies and app performance

The operation of setting cookies on a new user, like any process, requires a tiny bit of [server-side and client-side](#user-content-fn-3)[^3] work, and as such will slow down the page load slightly. While this is a small performance gain, it can still be worth considering for apps that:

1. Don't need cookies on all non-logged-in users to function (see the [list above](#bubbles-default-cookies) for more information)
2. Depend on as fast a page load as possible (such as for SEO[^4] purposes)
3. Apps that get a lot of traffic, where you want to keep [workload consumption](#user-content-fn-5)[^5] as low as possible

Keep your users in mind; disabling the default cookies can lead to a slight performance gain, but it can come at the cost of user experience.

### Default cookies and regulations

Frameworks such as GDPR, have regulations[^6] that apply to the use of cookies. We recommend familiarizing yourself with the regulations that apply to your industry and region.

## Cookies and subdomains

When you move your app's domain to a subdomain, it can affect the login processes due to cookie handling. Your users might encounter login issues, such as errors stating "incorrect credentials" or "session expired".

This is typically because the existing cookies for the old domain are conflicting with the new subdomain. To resolve this, instruct your end-users to clear their browser cookies for your app's domain, by following the instructions below:

## Clearing your app's cookies

For a user to clear the cookies connected to your app, they need to follow the points below. Keep in mind the process may look slightly different based on which browser is used:

1. **Open the browser settings**: Each browser has a slightly different way of accessing cookie settings. Generally, you can find these in the privacy or security section of the settings menu.
2. **Navigate to cookie management**: Look for options related to privacy, security, or site data. Here, you'll find settings for cookies and site data.
3. **Find the app's domain**: Once in the cookie management section, search for the app's domain name.
4. **Delete the cookies**: Select the cookies associated with the domain and delete them. This action will remove any stored login information or session data related to your app.
5. **Attempt to log in again**: After clearing the cookies, your end-users should be able to log in to your app without encountering the previous errors.

Remember, this step is necessary only if you're changing your app's domain to a subdomain. Keeping your users informed about such changes can help avoid confusion.

[^1]: When you select *Do not set cookies on new visitors by default*, Bubble will not create temporary user accounts in the database for visitors who are not logged in, and will not set cookies.\
    \
    Reference: [Do not set cookies on new visitors by default](/core-resources/application-settings/general#do-not-set-cookies-on-new-visitors-by-default)

[^2]: The *Opt-in to cookies* action instructs Bubble to create the default cookies on the user that triggers the action.

[^3]: *Server-side* refers to work happening on the Bubble server, and *client-side* refers to work happening on the user's device.\
    \
    Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)

[^4]: *SEO* (Search Engine Optimization) is the practice of optimizing a page to get a high result in search engines. One of many criteria for search engines is how fast the page loads.

[^5]: *Workload* is the metric that Bubble uses to determine how much server resources are needed to power your app. This in turn can affect your hosting costs.

    Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)\
    Article series: [Optimizing for workload](/help-guides/workload)

[^6]: Regulations in this context means laws that apply to how your app manages different types of user data.

    Article series: [Compliance](/help-guides/optimizing-an-application/compliance)
