# Account
> Source: https://manual.bubble.io/core-resources/actions/account · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Signing up and logging in users is handled automatically by Bubble.

When triggered from a mobile view, this action generates a deep link that opens the user's installed mobile app directly, rather than navigating to a web page. This means mobile apps can support magic login link flows natively without requiring an accompanying web app.

### Navigate on login

Specify the destination you would like to redirect the user to when the user successfully logs in using the magic link.

* **Web pages:** When triggered from a web page or a backend workflow targeting a web page, this field displays your app's web pages.
* **Mobile views:** When triggered from a mobile view, this field displays your app's mobile views instead of web pages.
* **Backend workflows:** When triggered from a backend workflow on a project with both web and mobile, this field displays both web pages and mobile views, organized under separate headers so you can easily distinguish between them.

If 2FA is enabled on the user account, this page will be ignored in favor of the manual redirect location specified after your [Check 2fa token](https://manual.bubble.io/core-resources/actions/account#check-2fa-token) action.

### Navigate on failure

Specify the destination you would like to redirect the user to when there is an issue logging the user in using the magic link, such as in the case of an invalid or expired link.

This field follows the same behavior as **Navigate on login** above: it displays web pages when triggered from a web context, mobile views when triggered from a mobile view, and both when used in a backend workflow on a project with web and mobile.

### Send data on login (web only)

**Note:** This option is only available when navigating to a web page. When navigating to a **mobile view**, the option to send data is presented automatically based on the destination view's view properties — no toggle is needed. If the destination mobile view has view properties, the corresponding fields will appear for you to fill in.

### Send data on failure (web only)

**Note:** This option is only available when navigating to a web page. When navigating to a **mobile view**, data is sent automatically based on the destination view's view properties — no toggle is needed.

### View properties (mobile)

When navigating to a mobile view on login or failure, the action will display the destination view's view properties as fields. This works the same way as the "Go to view" action — if the destination view has r view properties, you must provide values for them. If no view properties are required, any additional optional fields will appear, but a value is not required.

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

#### Users and authentication

* Bubble Academy: [User authentication](https://www.youtube.com/watch?v=gn0TixSCmGU\&t=8s)
* Bubble Academy: [Creating a user profile page](https://www.youtube.com/watch?v=6j09mTc7wXU)

#### Privacy rules

* Bubble Academy: [How to set up privacy rules | Tutorial](https://www.youtube.com/watch?v=1-meIeBUXPY)
* Bubble Academy: [Controlling privacy rules | Building your first Bubble app](https://www.youtube.com/watch?v=8E1gKbaNjxQ)
* Getting started with Bubble: [User privacy rules](https://www.youtube.com/watch?v=3BNv0UKhLuM)

#### Workflows

* Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)
* Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)
* Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)
  {% endtab %}
  {% endtabs %}

## Sign the user up

This action creates a new user in the application database. Signing up a user [requires an email and passwor](#user-content-fn-2)[^2]d. Once a user is created, they will be able to login, logout, and information can be saved for that user. Their information can be accessed in dynamic expressions using the [data source](#user-content-fn-3)[^3] `Current user`.

{% hint style="info" %}
When a user signs up, they will be logged in immediately.
{% endhint %}

{% hint style="info" %}
Any data saved on the `Current user` **before** signing up will be automatically saved on the user **after** they sign up, within the same session[^4].
{% endhint %}

{% hint style="info" %}
You can specify a **password policy** for your app's users in your app's settings. When enabled, this policy will automatically be applied when the user signs up or resets their password.

Article section: [Setting a password policy](/help-guides/security/app-security#password-policy)
{% endhint %}

### Email

This is the email used to sign the user up. It is the unique identifier of the user. Usually, this property is the value of an input and looks like 'Input email's value.'

{% hint style="warning" %}
Users within the same app need to have a unique email address.
{% endhint %}

### Password

This is the password used to sign the user up. Usually, this property is the value of an input and looks like 'Input password's value.'

### Require a password confirmation

Check this box to require users to type their password twice when they sign up to make sure the user did not make a mistake. If you check this box, you will need to set up two different inputs in your sign-up form that both accept passwords.

### Password Confirmation

This field defines where to find the confirmation of the password. It should be the content of an input that is different from the initial input for the password.

### Send an email to confirm the email

Check this box to send an email to the user confirming that their email address is valid and that they can access it. This email contains a link that once clicked will set the user's property 'email confirmed' to yes.

You can customize the content of this email in the *Languages* section in the *Settings* Tab. Look for 'Email confirmation subject' and 'Email confirmation body.' in the list of strings.

### Confirmation page

Enter the page where the user is taken after clicking the link in the confirmation email.

### Remember the email

Set this field to true for the browser to remember the email entered in the signup form. In this case, when the user is logged out, the email input will display the last saved email.

### Change another field

Click this button to save additional fields for this user. This is equivalent to a 'Make change to current user' or 'Make change to thing' action modifying the current user.

## Log the user in

This action logs an existing user in with an email and password. The user must have already signed up for this action to proceed. When successful, this action triggers the event 'The current user is logged in.'

### Email

Define where to find the email. Usually, it will be 'Input email's value.'

### Password

Define where to find the password. Usually, it will be 'Input password's value.'

### Stay logged in

Checking this determines how long the user stays logged in on that device (unless they clear their cookies).

<table><thead><tr><th width="217">Checkbox status</th><th>Logged in for...</th></tr></thead><tbody><tr><td>Checked</td><td>365 days</td></tr><tr><td>Unchecked</td><td>24 hours</td></tr></tbody></table>

### Remember the email

Set this field to true for the browser to remember the email entered in the signup form. In this case, when the user is logged out, the email input will display the last saved email.

{% hint style="info" %}
Remembering the email requires cookies. This is automatically handled by Bubble, but if the user clears their cookies or moves to another device, they'll need to re-enter their email.
{% endhint %}

## Opt-in to cookies

{% hint style="warning" %}
This action is only visible for applications that have enabled the *Do not set cookies on new visitors by default* setting.
{% endhint %}

Call this action to indicate that the user has opted-in to your site storing cookies. Calling this action will create a new, temporary user associated with the current user's web browser, which you can use to store information about the user in-between visits to your application.

If this action is **not** called, information stored on the `Current user` object will be lost whenever the user closes their web browser tab.

Note that we need to use cookies to enable signing up or logging in, so on sign up / log in, Bubble implicitly calls this action, even if you don't explicitly call it: if you do not want users to be able to sign up without explicitly opting into cookies, you must prevent them from calling the signup action yourself.

## Opt-out from cookies

{% hint style="warning" %}
This action is only visible for applications that have enabled the *Do not set cookies on new visitors by default* setting.
{% endhint %}

This action removes all Bubble-set cookies from the user's web browser, which will log them out of their account if they are currently logged in, and break the association between the user's browser and any temporary user that was created in the database to track them.

Calling this action if the user has not previously opted-in to cookies will have no effect.

## Signup/login with a social network

This action signs a user up using Facebook, Instagram, or other [OAuth providers](#user-content-fn-5)[^5]. This action creates a user in the application database but does not use an email/password identification. Instead, Bubble uses a token[^6] provided by the OAuth provider. When a workflow hits this action, the user is prompted to approve the access to their information.\
\
To use this action, create an application as a developer on Facebook or other provider and copy the keys the provider gives you in the Plugins Tab.

Note: Some providers, such as Google, expect the exact URL to be specified in the Developers Console, including a '/' at the end.

### OAuth provider

Choose which service to use for authentication. Install the relevant plugin through the dropdown menu in the Plugins Tab or add an API with the API Connector.

## Log the user out

Logs the user out and triggers the [*Current user is logged out*](#user-content-fn-7)[^7] event.

## Update the user's credentials

This action changes the user's email and/or password. The system requires the user to type their previous password again for security reasons. When using this action, the interface should have a form for the old password and the new email/password.

{% embed url="<https://youtu.be/wwHOKUygxHI>" %}
Our Academy course includes how to update the user's credentials
{% endembed %}

### Old password

Enter where to find the old password, which is usually 'Input old password's value.'

### Change email

Check this box to allow users to change their email.

### Email

Define where to find the new email, which is usually 'Input new email's value.'

### Change password

Check this box to allow users to change their password.

### New password

Define where to find the new password, which is usually 'Input new password's value.'

### Require password confirmation

Check this box if you want users to type their password twice when modifying their credentials to make sure they do not make a mistake. If this box is selected, the form should have two different inputs.

### Confirmation

Define where to find the password confirmation, which is usually 'Input new password confirmation's value.'

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

### Send an email to confirm the email

Check this box to send an email to the user confirming the new email is valid and that the user can access it. This email contains a link that once clicked will set the user's property 'email confirmed' to yes. Customize the content of this email in the Languages section in the Settings Tab. Look for 'Email confirmation subject' and 'Email confirmation body.'

### Confirmation page

Enter the page where the user is taken after clicking the link in the confirmation email.

## Make changes to current user

This action modifies the current user and saves this information in the application database. This is equivalent to a 'Make change to thing,' modifying the current user.

### Changes

List the modifications to apply to the current user. Select the field to modify, the operation, and the new value.

## Send confirmation email

This action sends an email to the currently logged-in user to confirm the email is valid and that they can access it. If an email was already confirmed, the user's property 'email confirmed' is marked as unconfirmed until the user clicks the link in the new email. If the user's account has been linked to an [OAuth provider](#user-content-fn-5)[^5] (e.g. Google), the user's property `email confirmed` will automatically be marked as confirmed.

#### Create a token without sending an email

To generate the confirmation token without sending an automated email, check the *Just make token, don't send email* checkbox in the action settings. This allows you to reference the token in a later step in the workflow using *Result of step \[#] (Send confirmation email ...)* in an expression.

Use this if you want to set up your own confirmation email or if you want to link to the confirmation page using the *Go to page* action and including the token parameter.

Example including the token:

```
https://yourdomain.com/[CONFIRMATION_PAGE]?confirmation_email=[LONG_ID]
```

Replace the \[CONFIRMATION\_PAGE] with the name of the page from the *Send confirmation email* action and the \[LONG\_ID] with the token that was generated in that same action.

### Confirmation page

Enter the page where the user is taken after clicking the link in the confirmation email.

## Send password reset email

{% hint style="info" %}
**Token validity:** password reset tokens are valid for 24 hours to ensure the security of user accounts. After that, a new password reset process needs be initiated.
{% endhint %}

This action sends an email with a reset link to the user when the password is forgotten. The link goes to the reset\_pw page that is built into the Bubble editor and handles the reset of the password.

### Email to reset

Enter the email for where to send the link to reset the password. The form should have an input for the email.

Note: The email should already exist in the database. Otherwise, there is no password to reset.

### Subject

Enter the subject of the email.

### Body

Enter the content of the email. The reset password link is added to the end of the email.

### Just make token, don't send email

In the reset password email, there's a link that looks like <https://yourdomain.com/reset\\_pw?reset=\\[LONG\\_ID].\\>
\
The token is just the LONG\_ID part of that link. Manually recreate the link at a later point in time and reset the password then. Tokens can only be used once.\
\
This feature adds flexibility. For example, maybe you want an administrator to create an account for someone else and then email them from a personal account rather than having the user receive a system-generated email.\
\
Get the LONG\_ID as a result of this action in the subsequent actions of the workflow.

## Send magic login link

This action sends an email with a magic link to allow a user to login to their account. The link can only be used once to login and will expire after 1 hour. If 2FA is enabled on your app and the requesting user, the user will be directed to complete the required 2FA steps after clicking a valid login link.

When triggered from a mobile view, this action generates a deep link that opens the user's installed mobile app directly, rather than navigating to a web page. This means mobile apps can support magic login link flows natively without requiring an accompanying web app.

{% hint style="info" %}
**Note:** Some email inboxes automatically screen embedded links for spam, which could mark the magic link as already clicked. End users should be encouraged to allow the magic link email address to their inbox provider’s allowlist to get around these security checks.
{% endhint %}

### Time Expiration (Hrs)

Specify the length of time in hours the login link is valid for, starting from when the link is created (i.e. the user initiates the workflow action). The default value will be 1 hour, but can be any decimal or integer value between 0 and 24.

### Session length

When a user logs into the app using a magic login link, they will stay logged in for a period of 365 days. This duration is fixed and cannot be altered at present.

However, there's an exception when two-factor authentication (2FA) is active. In this case, even though the user initially logs in via the magic link, they will be directed to the multi-factor authentication (MFA) page. Here, they have the alternative option to remain logged in for up to 30 days.

### Email

Enter the email for where to send the magic link, usually a dynamic value from a form input in your Bubble app. If the email address does not belong to a valid user account, no magic link or email will be sent.

### Subject

Enter the subject of the email.

### Body

Enter the content of the email.

### Magic link text

Enter the text for the magic login link. This text containing the link will be added after the body of the email.

### Just create link, don't send email

Check this box if you would like to handle sending the magic link to the user yourself. The magic link will be created on the server side but not sent to an email address. The magic link can be subsequently handled by any server side action (such as included in a custom email action) using `Result of Step N (Send magic login link)`.

{% hint style="warning" %}
**Note:** For security reasons, this link will not be available for use on the client side, for example, to display on a page in a text element.
{% endhint %}

### Navigate on login

Specify the destination you would like to redirect the user to when the user successfully logs in using the magic link.

* **Web pages:** When triggered from a web page or a backend workflow targeting a web page, this field displays your app's web pages.
* **Mobile views:** When triggered from a mobile view, this field displays your app's mobile views instead of web pages.
* **Backend workflows:** When triggered from a backend workflow on a project with both web and mobile, this field displays both web pages and mobile views, organized under separate headers so you can easily distinguish between them.

If 2FA is enabled on the user account, this page will be ignored in favor of the manual redirect location specified after your [Check 2fa token](https://manual.bubble.io/core-resources/actions/account#check-2fa-token) action.

### Navigate on failure

Specify the destination you would like to redirect the user to when there is an issue logging the user in using the magic link, such as in the case of an invalid or expired link.

This field follows the same behavior as **Navigate on login** above: it displays web pages when triggered from a web context, mobile views when triggered from a mobile view, and both when used in a backend workflow on a project with web and mobile.

### Send data on login (web only)

Check this box to send data and/or additional parameters in the url on page navigation after the user successfully logs in.

**Note:** This option is only available when navigating to a web page. When navigating to a **mobile view**, the option to send data is presented automatically based on the destination view's view properties — no toggle is needed. If the destination mobile view has view properties, the corresponding fields will appear for you to fill in.

### Send data on failure (web only)

Check this box to send data and/or additional parameters in the url on page navigation if the there is an issue logging the user in.

**Note:** This option is only available when navigating to a web page. When navigating to a **mobile view**, data is sent automatically based on the destination view's view properties — no toggle is needed.

### Data to send

Choose the thing for the page content of the destination page. The type of this thing should be consistent with the page's type of content. If the type is inconsistent, the expression will be red. If the page doesn't have a type, you can send text instead to append a path to the URL.

### Send more parameters to the page

Additional data can be sent to the page. This can be a text, a number for a search, etc. This option defines the series of key/values to send. The way to use them in the destination page is by using the 'Get data from page URL' data source.

### Additional parameters

Define the key/values to send to the destination page.

{% hint style="warning" %}
**Warning:** Because of Bubble's internal logic, do not use 'id,' 'debug\_mode,' or 'resume' as keys.
{% endhint %}

### Send current page parameters

If there is any data stored in the page URL parameters when the page changes the parameters will be carried over to the destination page as well. These parameters will be overridden by any parameters with the same name added using the "Send more parameters to the page" option.

### View properties (mobile)

When navigating to a mobile view on login or failure, the action will display the destination view's view properties as fields. This works the same way as the "Go to view" action — if the destination view has r view properties, you must provide values for them. If no view properties are required, any additional optional fields will appear, but a value is not required.

## Reset password

### Reset password in web app

This action resets the password of a user on the reset\_pw page and gives a token for the URL. See 'Just make token, don't send email' above. The token expires after 24 hours.

{% embed url="<https://youtu.be/msjECJzlJBk>" %}
Our Academy course includes how to build a reset\_pw page
{% endembed %}

#### Password

Define where to find the password. The reset\_pw form is built into the app. If you changed the form, however, define which input contains the password.

#### Confirmation

Define where to find the confirmation of the password. It should be the content of an input that is different from the initial input for the password.

### Reset password in mobile app

Bubble includes built-in support for password reset in native mobile apps. This functionality mirrors how resets work on web apps, but is designed specifically for the mobile experience.

When using the `Send password reset email` action from a mobile view, Bubble generates a deep link that opens the app directly to a dedicated password reset view. This view is included by default in all new and existing apps that support native mobile.

The password reset view includes the expected fields for setting a new password and confirming it. After the password is successfully reset, the user is automatically navigated back to the root view of the app.

#### Manually sending mobile password reset link

{% hint style="info" %}
**Sending deep links via email:** Emails often don’t handle deep links reliably, so the link format may not be recognized or open as expected. See more details below.
{% endhint %}

If you’re sending the reset link using your own method the deep link follows the format below.

If you have set a custom app scheme:

```
[app-SCHEME]://reset_pw?reset=[token]
```

If your app does not have a custom app scheme set, the fallback format is:

```
[app-APPNAME/DOMAIN]://reset_pw?reset=[token]
```

If you're sending the password reset link via a third-party email provider, you may experience that deep links are not properly recognized. As such, the following URL structure should be used if the password reset link is going to be sent via email:

<pre data-overflow="wrap"><code>https://[app-domain]/api/1.1/deep-link-redirect/<a data-footnote-ref href="#user-content-fn-8">arbitrary text</a>:<a data-footnote-ref href="#user-content-fn-9">formatted as URL</a>
</code></pre>

...where the arbitrary text operator should contain the expression:

```
[app-scheme]://reset_pw?reset=[result of step send reset password email]
```

## Create an account for someone else

{% embed url="<https://youtu.be/gwocxW4OlG4>" %}
Watch our Academy quick tip on to set up an account for someone else
{% endembed %}

This action creates an account for someone else without logging the new user in. This is useful to create an admin page and control who is allowed to sign up. Access this user in the following actions.

### Email

Enter the email of the new user, which usually comes from an input.

### Password

Define the password for the new user. Hardcode a value or use an input.\
Note: This field is deprecated and only available in older apps.

### Return the user if the account already exists

When creating a new user that already exists, e.g., the email is already in the application database, the action returns an error. Check this box, and the action will simply return the user so that you can manipulate it in subsequent actions.

### Changes

Add the modifications to apply to the new user. Select the field to modify, the operation, and the new value.

## Check password for the current user

This action checks a value against the 'Current user's password.' If the password is correct, the workflow continues. Otherwise, it stops and displays a message to the user. Use this to validate the password before an important operation, such as deleting an account.

### Password

Define which tentative password should be checked. Usually, it comes from an input element.

## Assign a temp password to a user

This action deletes the password of a user and assigns a temporary one. Text is returned by this action and can be used in upcoming workflows. When the user tries to log in using this password, they will be taken to the page defined in the 'Redirect users who haven't changed their password' option in the General section in the Settings Tab.

{% hint style="warning" %}
**Note:** Temporary password do not come with an automatic expiry. They will remain the user's password until the user changes the password as described above.

The original password is deleted and cannot be retrieved.
{% endhint %}

### User

Define which user to assign the password to. It should be of type user. If the type is inconsistent, the expression will be red.

{% hint style="info" %}
**Important:** This workflow action is meant to be used in a situation where an admin is resetting the password for a user - the admin can see the new password. **We do not recommend building this into an end-user-facing flow on a page** because it is not a secure way to work with passwords. We generally recommend using the reset password action. If you really want an end-user self-serve solution, consider using this action in a backend workflow instead.
{% endhint %}

## Change the email for another user

This action modifies a user's login email. It is intended to be used in administrative workflows to modify the email of a user who may or may not be actively using the app at the time. To enable a user to change their own email, use the 'Update the user's credentials' action. This is more secure because it makes them re-enter their password to confirm that they are actually authorized to perform that action. In contrast, this action is intended for situations where an admin needs to update the account of another user, whose password they don't know.

Warning: Do not include this action in workflows run by ordinary users.

### User

Enter the user whose email is being changed.

### New email

Enter the new email. The next time this user logs in, they must enter this email rather than their previous email.

## Log out other user's sessions

This action lets you log out all sessions of the current user, except the one where the user triggers this action. This is a useful action for security, when you want to make sure no other devices have a logged-in session. If you need to log out the user from the current session as well, you can use a Log the user out action after this action.

{% hint style="warning" %}
**Note:** This action won't immediately refresh the pages of logged-out sessions across all devices. Instead, the pages will update when the device interacts with the server, such as by executing a server-side workflow or retrieving data.
{% endhint %}

## Generate a 2FA QR code

This action lets you generate a unique QR code for a user, so that they can set up two-factor authentication with Google Authenticator or Authy. The user should confirm his/her password first.

Note: This is an advanced feature and only accessible on the Growth plan and above.

### Password

To set up two-factor authentication, users need to enter their password to confirm their identity. This property define where to find the existing password.

## Validate token and activate 2FA

This action lets the user validate the unique temporary token he will get from Google Authenticator or Authy the first time to validate the flow. Once the user has been through that process, he will be marked as using two-factor authentication and will have to go through the token check step to log in to your application.

### Token

This is the token the user wants to validate. It should be coming from an input on the page.

## Check 2FA token

This action lets the user validate the unique temporary token he will get from Google Authenticator or Authy. If he goes through that step successfully he will be logged in to the application.

### Token

This is the token the user wants to validate. It should be coming from an input on the page.

### Valid\_30\_days

When set to yes, the user will not be required to check his token for another thirty days on the current device/browser.

## Disable 2FA for the current user

This action disabled the check for a temporary token for the current user. Once a user has gone through that step, he won't have to enter a temporary code to log in.

### Password

To disable two-factor authentication, users need to enter their password to confirm their identity. This property define where to find the existing password.

### Token

This is the token the user wants to validate. It should be coming from an input on the page.

## Generate one-time backup codes

This action lets you generate 10 unique codes that can be used by the user instead of a temporary two-factor authentication token to log in to his account. This codes can be used only once, and regenerating a list will cancel previous codes. These codes are useful when the user loses his phone, etc.

### Password

To disable two-factor authentication, users need to enter their password to confirm their identity. This property define where to find the existing password.

### Token

This is the token the user wants to validate. It should be coming from an input on the page.

### Number\_of\_codes

This is the number of codes you want to generate. It defaults to 10.

## Other ways to learn

<details>

<summary>User manual articles</summary>

* [User accounts](/help-guides/data/user-accounts)

</details>

<details>

<summary>Video lessons</summary>

* [User Authentication: Bubble Introduction Series \[6/10\]](https://www.youtube.com/watch?v=gn0TixSCmGU)
* [Adding User Settings | Build Your First Bubble App \[13/20\]](https://www.youtube.com/watch?v=wwHOKUygxHI)
* [How to Create An Account For Someone Else](https://www.youtube.com/watch?v=gwocxW4OlG4)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Bubble also offers official plugins for signing users up via a third-party OAuth platform.

[^3]: A *data source* is the part of a dynamic expression that fetches data from a source, such as a database search.\
    \
    In this context, the `current user` data source returns data related to the current user of your app.

[^4]: Within the same *session* means as long as Bubble can keep track of the user by the use of cookies.

    If the user changes device, clears their cookies or disallows cookies altogether, Bubble will not be able to transfer the data.

[^5]: OAuth is a security protocol that enables applications to authenticate and authorize user accounts.

    It allows users to approve one application interacting with another on their behalf without giving away their password.

    This is commonly used for logging into websites or apps using Google, Facebook, or other trusted platforms.

[^6]: A *token* is a unique string of text that in principle works as both a username and a password to authenticate a user.

    It doesn't *contain* the username and password, but allows you to authenticate the user without the user actually revealing their credentials to your app.

[^7]: The *Current user is signed out* event is triggered whenever the user's login status changes to logged out.

    You can use thus for any needed action when a user is no longer logged in, such as redirecting them to a login page.

    Reference: [The current user is logged out event](/core-resources/events/general-events#user-is-logged-out)

[^8]: The *arbitrary text* data source lets you enter a static or dynamic string of text inside of an existing expression.

    Reference: [Data sources](/core-resources/data/data-sources) | [Arbitrary text](/core-resources/data/data-sources#arbitrary-text)

[^9]: The *formatted as* operator lets you formats a text in a specific way.

    Reference: [Operators and comparisons](/core-resources/data/operations-and-comparisons)
