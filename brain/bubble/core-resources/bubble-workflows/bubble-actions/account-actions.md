# Account actions
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions/account-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (11)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Workflows**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

***

#### **User accounts**

User accounts are handled automatically in Bubble to ensure that the process is secure and passwords are properly encrypted.

* Article: [User accounts](/help-guides/data/user-accounts)\
  This article covers how user accounts work in general, and how Bubble works to keep user accounts safe.
* Article section: [Setting a password policy](/help-guides/security/app-security#password-policy)\
  This article section covers how you can increase the security of your app's user accounts by requiring passwords to match a specified policy.

***

#### Privacy rules

Privacy rules are constraints that you can apply to data types to ensure that no one has access to data they are not supposed to. Understanding privacy rules is paramount if your app stores any kind of sensitive information.

* Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

***

#### **Logic**

Workflows is a part of the *Logic* series in the user manual.

* Article series: [Logic](/help-guides/logic)
  * Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Navigation](/help-guides/logic/navigation)\
    Using workflows to let the user navigate between pages and page sections.

***

#### Debugging

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)
{% endtab %}

{% tab title="Videos (8)" %}
**Users and authentication**

* Bubble Academy: [User authentication](https://www.youtube.com/watch?v=gn0TixSCmGU\&t=8s)
* Bubble Academy: [Creating a user profile page](https://www.youtube.com/watch?v=6j09mTc7wXU)

**Privacy rules**

* Bubble Academy: [How to set up privacy rules | Tutorial](https://www.youtube.com/watch?v=1-meIeBUXPY)
* Bubble Academy: [Controlling privacy rules | Building your first Bubble app](https://www.youtube.com/watch?v=8E1gKbaNjxQ)
* Getting started with Bubble: [User privacy rules](https://www.youtube.com/watch?v=3BNv0UKhLuM)

**Workflows**

* Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)
* Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)
* Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)
  {% endtab %}
  {% endtabs %}

***

{% hint style="info" %}
**Note on 2FA actions:** For 2FA actions to show up in the workflow editor, you need to enable it in *Settings – General – Activate two-factor authentication.*
{% endhint %}

## Assign a temp password to a user

This action deletes a user's current password and replaces it with a temporary one. The temporary password is returned as a text value and can be referenced in subsequent workflow steps. When the user logs in with this password, they're redirected to the page defined in the *Redirect users who haven't changed their password* setting in the *General* section of the *Settings* tab.

{% hint style="warning" %}
**Temporary passwords don't expire automatically**. The temporary password remains active until the user changes it.

The original password is deleted and can't be retrieved.
{% endhint %}

{% hint style="warning" %}
This action is intended for admin workflows where an admin resets a password on behalf of a user. We don't recommend using it in end-user-facing flows, as it's not a secure way to handle passwords. If you need a self-serve solution for end users, consider using this action in a backend workflow instead.
{% endhint %}

### User

The user whose password should be replaced. Must be of type *User*. The expression will turn red if the type doesn't match.

***

## Change the email for another user

This action updates a user's login email. It's intended for admin workflows where an admin needs to update another user's account — for example, when the admin doesn't know the user's password. To let users change their own email, use the *Update the user's credentials* action instead, which requires the user to re-enter their password for security.

{% hint style="warning" %}
Don't include this action in workflows that can be triggered by ordinary users.
{% endhint %}

### User

The user whose email should be changed.

### New email

The new email address. The next time this user logs in, they'll need to use this email instead of their previous one.

***

## Check 2FA token

This action validates the temporary token generated by Google Authenticator or Authy. If the token is valid, the user is logged in to the app.

### Temporary token

The token to validate. This should come from an input element on the page.

### Remember 30 days

When set to *yes*, the user won't be prompted to enter a token again for 30 days on the current device and browser.

***

## Check password for the current user

This action checks a value against the current user's password. If the password matches, the workflow continues. If it doesn't, the workflow stops and displays a message to the user. Use this before sensitive operations, such as deleting an account.

### Password to check

The password value to check. This usually comes from an input element on the page.

***

## Create an account for someone else

This action creates a new user account without logging that user in. It's useful for building admin pages where you control who can sign up. The new user can be referenced in subsequent workflow steps.

### Email

The email address for the new user. This usually comes from an input element.

### Return the user if the account already exists

When creating a user whose email is already in the database, the action returns an error by default. Check this box to return the existing user instead, so you can reference them in subsequent steps.

### Fields

The fields to set on the new user. For each change

* Click the plus symbol to pick a field
* Select the field to modify
* Assign a value

You can also click the *Add all fields* option to add all the existing fields on that data type.

***

## Disable 2FA for the current user

This action disables two-factor authentication for the current user. Once disabled, the user won't need to enter a temporary code when logging in.

### Password

The user's current password, used to confirm their identity before disabling 2FA. This usually comes from an input element.

### Temporary token

The current temporary token from Google Authenticator or Authy, used to confirm the user has access to their authenticator before disabling it.

***

## Generate a 2FA QR code

This action generates a unique QR code for a user so they can set up two-factor authentication with Google Authenticator or Authy. The user should confirm their password before this action runs.

{% hint style="info" %}
This is an advanced feature available on the Growth plan and above.
{% endhint %}

### Password

The user's current password, used to confirm their identity before generating the QR code. This usually comes from an input element.

***

## Generate one-time backup codes

This action generates a set of single-use backup codes that the user can use instead of a temporary 2FA token to log in — useful if they lose access to their authenticator app. Generating a new set invalidates any previously generated codes.

### Password

The user's current password, used to confirm their identity. This usually comes from an input element.

### Temporary token

The current temporary token from Google Authenticator or Authy, used to confirm the user has access to their authenticator before generating backup codes.

### Number of codes

The number of backup codes to generate. Defaults to 10.

***

## Log out other user's sessions

This action logs out all active sessions for the current user except the one in which the action is triggered. This is useful for security. For example, when a user wants to make sure no other devices have an active session. To also log out the current session, add a *Log the user out* action after this one.

{% hint style="warning" %}
This action **doesn't immediately refresh pages on logged-out devices**. Those pages update the next time the device interacts with the server, such as when a server-side workflow runs or data is fetched.
{% endhint %}

***

## Log the user in

This action logs an existing user in with an email and password. The user must already have an account. When successful, it triggers the *The current user is logged in* event.

### Email

Where to find the email value. This usually comes from an input element.

### Password

Where to find the password value. This usually comes from an input element.

### Stay logged in

Determines how long the user stays logged in on that device, unless they clear their cookies.

| Checkbox status | Logged in for... |
| --------------- | ---------------- |
| Checked         | 365 days         |
| Unchecked       | 24 hours         |

### Remember the email

When set to *true*, the browser saves the email entered in the login form. If the user is logged out, the email input will display the last saved email.

{% hint style="info" %}
Remembering the email requires cookies. If the user clears their cookies or moves to another device, they'll need to re-enter their email.
{% endhint %}

***

## Log the user out

Logs the current user out and triggers the [*Current user is logged out*](#user-content-fn-2)[^2] event.

***

## Make changes to current user

This action modifies the current user's data and saves the changes to the database. It's equivalent to a *Make changes to a thing* action targeting the current user.

### Fields

The fields to set on the current user. For each change

* Click the plus symbol to pick a field
* Select the field to modify
* Assign a value

You can also click the *Add all fields* option to add all the existing fields on that data type.

***

## Opt-in to cookies

{% hint style="warning" %}
This action is only available in apps that have the *Do not set cookies on new visitors by default* setting enabled.
{% endhint %}

This action records that the user has opted in to cookie storage. Once called, Bubble creates a temporary user associated with the current browser, which can be used to store information about the user between visits.

If this action is never called, any data stored on the `Current user` object is lost when the user closes their browser tab.

Note that signing up or logging in requires cookies. Bubble calls this action implicitly on sign-up and login even if you don't call it explicitly. If you want to prevent users from signing up without first opting in, you'll need to block the sign-up action until they do.

***

## Opt-out from cookies

{% hint style="warning" %}
This action is only available in apps that have the *Do not set cookies on new visitors by default* setting enabled.
{% endhint %}

This action removes all Bubble-set cookies from the user's browser. This logs the user out if they're currently logged in and removes the association between their browser and any temporary user created to track them. Calling this action when the user hasn't opted in to cookies has no effect.

***

## Reset password

{% hint style="info" %}
The reset password action is only available in the built-in page *reset\_pw*. To initiate a password reset flow from another page, use the *Send password reset email.*
{% endhint %}

### Reset password in web app

This action resets a user's password on the *reset\_pw* page using a token passed via the URL. See *Just make token, don't send email* in the *Send password reset email* action for details on how to generate the token manually. Tokens expire after 24 hours.

#### Password

Where to find the new password. The *reset\_pw* form is built into the editor by default. If you've replaced it with a custom form, point this to the input containing the new password.

#### Confirmation

Where to find the password confirmation. This must come from a different input element than the one used for the new password.

### Reset password in mobile app

Bubble includes built-in support for password reset in native mobile apps. This works similarly to web app password resets but is designed for the mobile experience.

When the *Send password reset email* action is triggered from a mobile view, Bubble generates a deep link that opens the app directly to a dedicated password reset view. This view is included by default in all apps that support native mobile. After a successful reset, the user is automatically navigated back to the root view of the app.

#### Manually sending a mobile password reset link

{% hint style="info" %}
Emails don't always handle deep links reliably, so the link format may not be recognized or may not open as expected. See the formatting details below.
{% endhint %}

If you're sending the reset link yourself, the deep link follows one of these formats.

If you've set a custom app scheme:

```
[app-SCHEME]://reset_pw?reset=[token]
```

If no custom app scheme is set, use the fallback format:

```
[app-APPNAME/DOMAIN]://reset_pw?reset=[token]
```

If you're sending the reset link via a third-party email provider, use this URL structure instead, as deep links may not be recognized in emails:

<pre data-overflow="wrap"><code>https://[app-domain]/api/1.1/deep-link-redirect/<a data-footnote-ref href="#user-content-fn-3">arbitrary text</a>:<a data-footnote-ref href="#user-content-fn-4">formatted as URL</a>
</code></pre>

The *arbitrary text* operator should contain the following expression:

```
[app-scheme]://reset_pw?reset=[result of step send reset password email]
```

***

## Send confirmation email

This action sends an email to the currently logged-in user to confirm that their email address is valid and accessible. If the email was already confirmed, it's marked as unconfirmed again until the user clicks the link in the new email. If the account is linked to an [OAuth provider](#user-content-fn-5)[^5] such as Google, the `email confirmed` property is automatically set to *yes*.

### Confirmation page

The page the user is taken to after clicking the link in the confirmation email.

### Just make token, don't send email

Check this box to generate the confirmation token without sending an automated email. You can then reference the token in later workflow steps using *Result of step \[#] (Send confirmation email ...)*.

Use this when you want to send your own confirmation email or navigate to the confirmation page using a *Go to page* action with the token included as a parameter. The URL format is:

```
https://yourdomain.com/[CONFIRMATION_PAGE]?confirmation_email=[LONG_ID]
```

Replace `[CONFIRMATION_PAGE]` with the page name from the action settings and `[LONG_ID]` with the generated token.

***

## Send magic login link

This action sends an email containing a single-use magic link that logs the user in without a password. The link expires after a configurable period and can only be used once. If two-factor authentication is enabled for the user, they'll be directed to complete the required 2FA steps after clicking the link.

{% hint style="info" %}
Some email inboxes automatically scan embedded links for spam, which may cause the magic link to register as already clicked. Encourage users to add the magic link sender to their allowlist to avoid this.
{% endhint %}

### Email

The email address to send the magic link to. This usually comes from a form input. If the email doesn't match a valid user account, no link or email is sent.

### Subject

The subject line of the email.

### Body

The body text of the email.

### Link text

The text that contains the magic login link. This is appended after the body of the email.

### Link expiration (hrs)

How long the magic link remains valid, in hours, starting from when it's created. Accepts any decimal or integer value between 0 and 24. Defaults to 1 hour.

### Stay logged in

Determines how long the user stays logged in on that device, unless they clear their cookies.

| Checkbox status | Logged in for... |
| --------------- | ---------------- |
| Checked         | 365 days         |
| Unchecked       | 24 hours         |

### Navigate on login

The page to redirect the user to after a successful login. If 2FA is enabled, this is ignored in favor of the redirect location specified after your *Check 2FA token* action.

#### Send data

Click the property icon next to the *Navigate on login* property <img src="/files/RsDq4rBNxuzTdnPa1sky" alt="" data-size="line"> and enable *Send data* to send data or additional URL parameters when navigating after a successful login.

* **Data to send:** The page thing to include in the URL
* **Send current page parameters:** Includes any URL parameters in the current URL
* **Send more parameters to the page:** Let's you add additional URL parameters with a key and a value

{% hint style="warning" %}
Don't use `id`, `debug_mode`, or `resume` as keys — these are reserved by Bubble's internal logic.
{% endhint %}

### Navigate on failure

The page to redirect the user to if the login fails. For example, if the link is invalid or has expired.

#### Send data

Click the property icon next to the *Navigate on failure* property <img src="/files/RsDq4rBNxuzTdnPa1sky" alt="" data-size="line"> and enable *Send data* to send data or additional URL parameters when navigating after a successful login.

* **Data to send:** The page thing to include in the URL
* **Send current page parameters:** Includes any URL parameters in the current URL
* **Send more parameters to the page:** Let's you add additional URL parameters with a key and a value

{% hint style="warning" %}
Don't use `id`, `debug_mode`, or `resume` as keys — these are reserved by Bubble's internal logic.
{% endhint %}

### Just create link, don't send email

Check this box to generate the magic link without sending it. The link is created server-side and can be referenced in subsequent server-side actions using `Result of Step X (Send magic login link)`.

{% hint style="warning" %}
For security reasons, the magic link is not available on the client side and can't be displayed in a text element on a page.
{% endhint %}

***

## Send password reset email

This action sends a password reset email containing a link to the *reset\_pw* page, which is built into the Bubble editor and handles the reset flow.

### Email to reset

The email address to send the reset link to. The form should include an input for this. The email must already exist in the database. If it doesn't, there's no password to reset.

### Subject

The subject line of the email.

### Body

The body text of the email. The reset link is appended at the end.

### Password reset mode

#### Send email

Select this option to send the email to the user with the content specified above. Bubble will generate a unique token and append it to the reset link in the email.

#### Generate reset token only

Select this option to generate the reset token without sending an email. The reset link follows this format:

```
https://yourdomain.com/reset_pw?reset=[LONG_ID]
```

The token is the `LONG_ID` part of that URL. You can reconstruct the full link at any point and use it to reset the password. Tokens can only be used once.

Reference the token in subsequent workflow steps using the `Result of step X` data source.

#### Generate reset URL only

Select this option to only generate the URL for the password reset flow.

***

## Sign the user up

This action creates a new user in the database. Signing up requires an email and password[^6]. Once created, the user can log in and log out, and data can be saved to their account. Their data can be accessed in dynamic expressions using the [data source](#user-content-fn-7)[^7] `Current user`.

{% hint style="info" %}
When a user signs up, they're logged in immediately.
{% endhint %}

{% hint style="info" %}
Any data saved on the `Current user` **before** signing up is automatically transferred to the new user account **after** sign-up, within the same session[^8].
{% endhint %}

{% hint style="info" %}
You can set a **password policy** for your app in the app's settings. When enabled, the policy is automatically applied when users sign up or reset their password.

Article section: [Setting a password policy](https://manual.bubble.io/~/changes/1175/help-guides/security/app-security#password-policy)
{% endhint %}

### Email

The email used to create the account.

{% hint style="warning" %}
Each user within the same app must have a unique email address.
{% endhint %}

### Password

{% hint style="warning" icon="lock" %}
When using a text element to set the password of a user, always make sure to set the *Format* property of the text element to *Password*. This masks the password automatically with asterisks: \*\*\*\*\*\*
{% endhint %}

The password used to create the account.

### Require a password confirmation

Check this box to require users to type their password twice during sign-up, reducing the chance of a typo. When enabled, your sign-up form needs two separate password input elements.

### Password confirmation

Where to find the password confirmation value. This must come from a different input element than the one used for the initial password.

### Send an email to confirm the email

Check this box to send a confirmation email to the user after sign-up. The email contains a link that, when clicked, sets the user's *email confirmed* property to *yes*.

You can customize the content of this email in the *Languages* section of the *Settings* tab — look for *Email confirmation subject* and *Email confirmation body*.

**Confirmation page**

The page the user is taken to after clicking the link in the confirmation email.

### Remember the email

When set to *true*, the browser saves the email entered in the sign-up form. If the user is logged out, the email input will display the last saved email in the email field of the login form.

This functionality is cookie-based, and:

* Will only work if the user has allowed cookies from your domain in their browser settings
* Will be reset if the user clears their cookies
* Will not work across devices

### Fields

The fields to set on the new user. For each change

* Click the plus symbol to pick a field
* Select the field to modify
* Assign a value

***

## Signup/login with a social network

This action signs a user up or logs them in using Facebook, Instagram, or another [OAuth provider](#user-content-fn-5)[^5]. Instead of an email and password, Bubble uses a token[^9] provided by the OAuth provider to identify the user. When the workflow reaches this action, the user is prompted to approve access to their account information.

To use this action, create a developer application on the relevant platform and copy the credentials it provides into the *Plugins* tab.

{% hint style="info" %}
Some providers, such as Google, require the exact redirect URL to be specified in the developer console, including a trailing `/`.
{% endhint %}

### OAuth provider

The service to use for authentication. Install the relevant plugin via the *Plugins* tab, or add an API using the *API Connector*.

***

## Update the user's credentials

This action updates the current user's email, password, or both. For security, users must re-enter their current password to make any changes. Your interface should include a form with fields for the old password and the new email or password.

### Old password

Where to find the user's current password.

### Change email

Check this box to allow the user to update their email address.

#### Email

Where to find the new email value.

### Change password

Check this box to allow the user to update their password.

#### New password

Where to find the new password value.

#### Require password confirmation

Check this box to require the user to type their new password twice. When enabled, the form needs two separate input elements for the new password.

#### Confirmation

Where to find the password confirmation value. This must come from a different input element than the one used for the new password.

### Do not show success message

By default, Bubble displays an alert when the action completes successfully. Check this box to suppress that message — for example, if you want to show a custom confirmation instead.

### Send an email to confirm the email

Check this box to send a confirmation email after an email change. The email contains a link that, when clicked, sets the user's *email confirmed* property to *yes*.

You can customize the email content in the *Languages* section of the *Settings* tab — look for *Email confirmation subject* and *Email confirmation body*.

#### Confirmation page

The page the user is taken to after clicking the link in the confirmation email.

***

## Validate token and activate 2FA

This action validates the temporary token the user receives from Google Authenticator or Authy when setting up two-factor authentication for the first time. Once validated, the user is marked as using 2FA and will be required to enter a token each time they log in.

### Temporary token

The token to validate. This should come from an input element on the page.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: The *Current user is signed out* event is triggered whenever the user's login status changes to logged out.

    You can use this to run any needed actions when a user is no longer logged in, such as redirecting them to a login page.

[^3]: The *arbitrary text* data source lets you enter a static or dynamic string of text inside an existing expression.

    Reference: [Data sources](https://manual.bubble.io/~/changes/1175/core-resources/data/data-sources) | [Arbitrary text](https://manual.bubble.io/~/changes/1175/data/data-sources#arbitrary-text)

[^4]: The *formatted as* operator formats a text value in a specific way.

    Reference: [Operators and comparisons](https://manual.bubble.io/~/changes/1175/core-resources/data/operations-and-comparisons)

[^5]: OAuth is a security protocol that enables applications to authenticate and authorize user accounts.

    It allows users to approve one application interacting with another on their behalf without sharing their password.

    This is commonly used for logging into websites or apps using Google, Facebook, or other trusted platforms.

[^6]: Bubble also offers official plugins for signing users up via a third-party OAuth platform.

[^7]: A *data source* is the part of a dynamic expression that fetches data from a source, such as a database search.\
    \
    In this context, the `current user` data source returns data related to the current user of your app.

[^8]: Within the same *session* means as long as Bubble can keep track of the user by the use of cookies.

    If the user changes device, clears their cookies, or disallows cookies altogether, Bubble won't be able to transfer the data.

[^9]: A *token* is a unique string of text that works as both a username and password to authenticate a user.

    It doesn't *contain* the username and password, but allows authentication without the user revealing their credentials to your app.
