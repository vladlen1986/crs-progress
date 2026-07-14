# Single sign-on (SSO)
> Source: https://manual.bubble.io/help-guides/bubble-for-enterprise/security-and-compliance/single-sign-on-sso · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
Bubble’s single sign-on (SSO) features are available on our [Enterprise plan](https://bubble.io/pricing). If you have questions or would like to discuss SSO for your organization, please [contact Sales](https://bubble.io/contact-sales).
{% endhint %}

{% hint style="info" %}
This article explores using SSO for accessing a Bubble account. If you are looking to enable SSO for the end-users of your app, you may be interested in the articles below:

* Article series: [WorkOS](/help-guides/integrations/workos) (setting up Enterprise-level SSO in your app)
* Reference: [Bubble-made plugins](/core-resources/bubble-made-plugins) (setting up singular SSO services like Google and Facebook)
  {% endhint %}

## What is SSO?

{% hint style="info" %}
This article introduces some new terminology. You can find a table with definitions at the bottom of this document.

Article section: [SSO terminology](#sso-terminology)
{% endhint %}

At its core, single sign-on (SSO) is an authentication service that allows a user to use one set of credentials (like a username and password) to access multiple applications. Think of it as having a master key that can open multiple doors in a building rather than juggling a bulky keyring.

Many companies use SSO to let users sign into a variety of third-party applications and services. For instance, when you log in to a new web service and are offered the option to "Sign in with Google" or "Sign in with Facebook," you're seeing SSO in action.

## SSO in enterprise work environments

Increasingly, the tools used by members of enterprise organizations are scattered across a large catalog of online services. For example, a company may use one piece of software for project management, and a different one for handling inventory and finances. Managing multiple login credentials for each tool isn't just inconvenient—it's a security concern. That's where SSO comes into play. With SSO, members of your organization only need one set of credentials to access all their apps.

SSO simplifies the login process and helps your team spend less time on password-related tasks and more time being productive. From a security standpoint, having one robust password means you're not juggling a myriad of potentially weak ones. From a managerial perspective, monitoring a single authentication point makes it easier to spot any IT issues.

This is why we offer a secure SSO solution that lets your members log into their Bubble account using widely adopted, secure identity providers. We’re compatible with any identity provider that's either SAML or OIDC, including (but not limited to) the following:

* [Auth0](https://workos.com/docs/integrations/auth0-saml)
* [Azure AD](https://workos.com/docs/integrations/azure-ad-saml)
* [Cloudflare](https://workos.com/docs/integrations/cloudflare-saml)
* [Duo](https://workos.com/docs/integrations/duo-saml)
* [Google](https://workos.com/docs/integrations/google-saml)
* [JumpCloud](https://workos.com/docs/integrations/jumpcloud-saml)
* [LastPass](https://workos.com/docs/integrations/lastpass-saml)
* [Microsoft AD FS](https://workos.com/docs/integrations/microsoft-ad-fs-saml)
* [Okta](https://workos.com/docs/integrations/okta-saml)
* [OneLogin](https://workos.com/docs/integrations/onelogin-saml)
* [Oracle](https://workos.com/docs/integrations/oracle-saml)
* [PingFederate](https://workos.com/docs/integrations/pingfederate-saml)
* [PingOne](https://workos.com/docs/integrations/pingone-saml)
* [Salesforce](https://workos.com/docs/integrations/salesforce-saml)
* [Shibboleth Generic](https://workos.com/docs/integrations/shibboleth-generic-saml)
* [VMware](https://workos.com/docs/integrations/vmware-saml)

A major advantage of this system is centralization. If a user changes their password or if their access permissions are updated, these changes are reflected across all applications linked to their credentials. It keeps things consistent and secure. With SSO, you're not just getting a streamlined login experience; you're investing in a secure and efficient operational future.

## How SSO works

At its core, SSO is a way to manage user authentication across multiple SaaS applications and services. But what's happening under the hood to make this possible? Let’s first break down the step-by-step logic of SSO in action:

1. **Initial authentication:** The process starts when a member logs into Bubble using SSO. This initial sign-in is verified by an identity provider (IdP) such as Auth0 and Okta, the trusty guardian of user identity. Think of the IdP as a gatekeeper, ensuring users are genuinely who they claim to be.
2. **Token creation:** Once the IdP authenticates a user's credentials, it creates a special “token.” This token doesn't store sensitive data like passwords. Instead, it's like a “ticket” confirming that the user has been verified.
3. **Use across apps:** As users move between different connected applications, this token is their passkey. Instead of knocking on the door of each new application with a separate password, the token shows they've already been vouched for. The apps trust the IdP's verification, allowing users straightforward access.

## Setting up SSO on your organization’s Bubble account

If you’re interested in setting up SSO for your organization, please get in touch with our [Sales team](https://bubble.io/contact-sales), and we’ll provide you with the instructions to get the process started. After SSO has been enabled and set up, your organization admin can start inviting team members.\
\
For your first-time SSO login, use the link[ bubble.io/login/sso](http://bubble.io/login/sso). If you have an existing Bubble account, you will be redirected to login via your existing login method to authenticate yourself. After logging in, you will be directed to migrate and consent to your new permissions in your organization. In every login thereafter, you would use the SSO login with your IdP.

## Inviting members

Admins can easily add new members in bulk by entering user emails separated by commas. Each member will receive an email after they have been added, and will be redirected to <http://bubble.io/login/sso> upon their next login.

### Existing accounts

* If a member has an existing Bubble account, they will need to first authenticate themselves by logging in using their original method.
* If a member does not have a Bubble account, their account will be created for them automatically, using just-in-time (JIT) provisioning

After their first login, members will be required to use SSO to login to Bubble and will not be able to login via other authentication methods.

### Removing members

Members can be removed by opening the dropdown contextual menu in the list of members and selecting Remove member.

<figure><img src="https://lh6.googleusercontent.com/Arx-4r1qz8P58CAYXe_ULWVDk1QSyBqM4wxFJR2Gr4MV4QMUUTtiZrP460NJgXVbOvHTgcEgoZcPAxyk3WUbezEx6bvnnquhmkKiMY4KyOcZiB5mqMS5cZhLX6CBjCCokQTy0cl8Gy1DfAieI2W8rkU" alt=""><figcaption></figcaption></figure>

If you remove a member, they will be scheduled for deletion within seven days, with no ability to login via Bubble. However, you can reinstate their membership within this seven-day window if you’ve made a mistake.

### Security restrictions for members

Members cannot transfer apps or change the permission settings in the Collaboration tab, unless they are the creator of that app. Members can create as many apps on the Free plan as needed, but only the admin can change the plan or buy plugins.

## Logging in with SSO

All signed-out users will see the Log in with SSO option in the bottom corner of Bubble’s login form. Click this to be taken to the SSO form.

<figure><img src="https://lh4.googleusercontent.com/VR03syYVlUjLkkO5qbiEa35836yVIKS_WEgy54UoIKs_O3A5mJ848rE7Vfav3pwm7QmMsrERn57sMpvtFkNkvrO5YjSJI9oOi2351gGbjsDFAlDuGA7WSiNLtAIBH1NQf_QopdKTO3R_HmErACIK9-A" alt=""><figcaption></figcaption></figure>

The first step in the SSO process is to submit your email address. Bubble will automatically recognize which organization you belong to.

<figure><img src="https://lh6.googleusercontent.com/OeZF70dv0IXpTcadiU33eAdISBhwsqS2iBapkB0B8GsSR66YbfJnUGO1v0GQySnzFyYTb2gis7uKDng9S2gTBnljEfoKm2Ts86lPpoZFx3DFfyaPGbDITc4Ib0vN7vsZXY9WUhMFlwxMbhBywPguBUQ" alt=""><figcaption></figcaption></figure>

You’ll then be taken to the sign-in form for the IdP that your organization uses.

<figure><img src="https://lh4.googleusercontent.com/i2FWRwwNzS5PI1u1RXPlf8fvHV3FGP6RHXLjQ7mQUXoMXS9jrtbQrnlJckFZ1Vog1161Lq2MW_W__fTniUGXVRsVK9DFg3G-JINJOlTull231R7olQoBpEqA2GuRmKezWbktuE5g8AbYuAo1vFJy6Es" alt=""><figcaption></figcaption></figure>

After signing in, you’ll be sent to the Bubble platform home screen, where you will see all your organization’s applications if you are an admin.

### SSO Terminology

<table><thead><tr><th width="268">Term/Phrase</th><th>Definition</th></tr></thead><tbody><tr><td>Admin</td><td>A designated individual within your organization with permissions to manage settings, members, and other administrative tasks</td></tr><tr><td>Administrator Account</td><td>The main account in charge of SSO settings and member management in Bubble.</td></tr><tr><td>Authentication</td><td>The process of verifying the identity of a member or admin.</td></tr><tr><td>Collaboration tab</td><td>Section in Bubble where app collaboration settings are managed.</td></tr><tr><td>Enterprise plan</td><td>The <a href="https://bubble.io/pricing">pricing tier</a> with access to SSO.</td></tr><tr><td>Identity Provider (IdP)</td><td>The system that authenticates users for the service they're accessing.</td></tr><tr><td>JIT provisioning</td><td>Just-in-time account creation based on SSO credentials.</td></tr><tr><td>Member</td><td>Individuals who are part of an enterprise team</td></tr><tr><td>Single sign-on</td><td>Allows a user to access multiple applications with one set of credentials.</td></tr><tr><td>Token</td><td>A digital "ticket" or identifier confirming user verification without storing sensitive data.</td></tr><tr><td>SAML</td><td>Security Assertion Markup Language is an XML-based standard used for exchanging authentication and authorization data between an identity provider (IdP) and a service provider (SP) such as Bubble.</td></tr><tr><td>OIDC</td><td>OpenID Connect is a modern authentication protocol built on top of the OAuth 2.0 framework, designed to authenticate users by verifying their identity using an identity provider.</td></tr></tbody></table>

<br>
