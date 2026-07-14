# User accounts
> Source: https://manual.bubble.io/help-guides/data/user-accounts · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This article covers how you create and manage Users in your app

<figure><img src="/files/z5JFmrBykHIReAccLZeW" alt=""><figcaption></figcaption></figure>

In this article, we're going to explore how Bubble handles the process of setting up and managing user accounts.

Technically, users are just another data type stored in your app's database, but there are several reasons why Bubble treats the user type a bit differently:

* The built-in user authentication system provides robust security features to safeguard user data, such as password hashing, salting, and encryption.
* Processes like signing up, logging in, and remembering a user between sessions are automated.
* Features such as confirming email addresses, securely resetting passwords, 2-factor authentication, magic login links, and generating/assigning temporary passwords are all securely handled.
* Bubble sets up temporary users whenever non-logged in users visit your site. Data stored on that user is automatically transferred when the user completes their sign-up (this is useful to store a a new user's shopping cart for example).
* Privacy rules treat users differently from other data types, allowing you to control access to data based on fields stored on each individual user. This lets you manage user permissions and control access to sensitive data in a granular way.

In short, managing user accounts demands strict security to ensure the protection of users' sensitive information, and the functionality of user accounts remains fairly uniform across different platforms. This is why Bubble takes care of this aspect of your application's development, saving you development time while ensuring that your app is up-to-date with the latest security standards.

## What is a user account?

Most of us have dozens or even hundreds of user accounts in our lives: we're logged into our phones, our email accounts, social media, forums and even newspapers. Of course, we all know what they are, so let's change perspective a bit: *why* does an app need user accounts?

The first answer to that question is that not all apps do: it's perfectly possible to create a highly useful app where the user never creates an account at all, even if you allow users to add and change things in the database. So let's first note that down: your app can have *users,* *registered users* or both. This article focuses on *registered users* – that is, users that have signed up with their email and a password or through a [single sign-on service](#user-content-fn-1)[^1].

Registering users serves many purposes:

* **Keeping data private:** in many contexts, a user should only have access to the data they themselves own or that of a select group of other users
* **Saving settings:** many apps allow users to save preferences and profile details that are still there the next time they use the app
* **Controlling Access**: many apps allow *only* registered users to access their pages
* **Assigning roles and permissions**: having registered users allows you to identify each one and assign them roles that control what they have permission to access
* **Personalization:** some applications, such as social media and eCommerce stores, offer a stream of personalized content for each user
* **Teaming up**: some apps will need to team people together so that they can share data and collaborate. To control who has access to what you'll need to know who they are
* **Payment processing**: to process payments and maintain an order and payment history you will usually want to attach it to a permanent user
* **Communication**: by knowing who your users are, you can communicate with them through the app or external channels like email

As you can see, there are many reasons for why you would want a user to sign up, and it's not only related to security and privacy. Just like any other data type, you can add as many different fields as you need, but the user type also comes with a few extra fields to handle the account.

These fields can't be changed or deleted and are the same across all Bubble applications.

## Built-in fields

In addition to the four [built-in fields](#user-content-fn-2)[^2] on all data types, the user also comes with three additional fields:

* Email
* Password (invisible)
* Email confirmed (invisible)

These fields have the following properties:

#### Email

The email field can never be empty on a registered user and needs to be formatted as a valid email address. Every user in your app needs to have a unique email address.

#### Password (invisible)

The password field is different from all other fields in that it is invisible even to you as the app developer. The password is kept secure in accordance with industry-standard practices.

<details>

<summary>How passwords are kept safe</summary>

Bubble ensures the safety of user passwords through the use of [one-way hashing](#user-content-fn-3)[^3] and salting[^4]. With this method, passwords are converted into a hash that cannot be reversed back to its original form, even if someone gains access to the Bubble database.

The password is checked by taking the password input provided by the user upon login, hashing it, and comparing it to the hashed password stored in the database.

It's important to note that Bubble only focuses on the match between the two hashes, without actually knowing what the original password is. As such, even we do not have access to the user's original password.

This method of one-way hashing and salting is widely regarded as the best practice for password storage

</details>

#### Email confirmed (invisible)

The email confirmed is another invisible field. It holds a yes/no value that reflects whether the relevant user has confirmed their email using the [*Send confirmation email*](/core-resources/actions/account#send-confirmation-email) action. You cannot make changes to this field directly – the user must perform the action described above to update it.

<figure><img src="/files/nadEVilSa33oDBx3OZRn" alt=""><figcaption><p>The email confirmed field is invisible in the database editor but you can access its value in an expression as exemplified above.</p></figcaption></figure>

## User actions

This article explores common actions[^5] related to user accounts, but it doesn't provide details on every available user action. To learn more about what actions and operators[^6] are available on users, you can check out the resources below:\
\
Reference: [List of user account actions](/core-resources/actions/account)\
Reference: [List of user operators](/core-resources/data/operations-and-comparisons#user-type)

### Signing up

While the technical process of signing up is handled by Bubble, the design and user experience is entirely up to you.

<figure><img src="/files/8xGeiWxs4tJAwW9UIfHR" alt=""><figcaption><p>Bubble handles security and communication with the database, but the user experience is up to you.</p></figcaption></figure>

#### The sign up action

When you want to sign a user up, you need that user to provide two strings of text: a valid email address that's unique in your app and a password.

<figure><img src="/files/XdKHAUzzP110nh5XBMe7" alt=""><figcaption><p>In this example we are signing the user up and then sending them to a page called <em>dashboard</em>.</p></figcaption></figure>

The email and password will usually be provided through input elements. In the example above we have two input elements where the new user types in their password: one to set the password, and the second to confirm that they didn't misspell it.

{% hint style="info" %}
Users in your app must have a unique email address.
{% endhint %}

The information is sent to Bubble's server in an encrypted state, and the password is hashed and salted – a [security best practice](#user-content-fn-7)[^7] that means that *no one* can read it – not even the Bubble team.

{% hint style="warning" %}
Keep in mind that input elements can be set up to format their input in a certain way (such as replacing the characters in a password input field with asterisks) and to expect a certain format (such as a valid email address). We recommend using both of these features when setting up both signup and login forms.\
\
Article section: [Input elements](/help-guides/design/elements/web-app/input-forms/text-and-numbers#text)
{% endhint %}

As soon as this action has been triggered the account will be created and the user is logged in from that point on. A logged-in session lasts for 12 months or until the user logs out or deletes the cookies from their browser.

<details>

<summary>Video lessons</summary>

* [Building a sign-up system](https://youtu.be/l6NQdipDtmI)

</details>

### Logging in

The log in action is very similar to the sign up action in that it requires two pieces of input: the email and the password. Bubble then sends this data in an encrypted state to the server to check the credentials. If they are both correct the user is logged in.

### Signing up and logging in with an SSO provider

An SSO provider is a third-party service that you can use to let users log in. For example,

## OAuth - signing up and logging in with a third-party service

The most common way to authenticate users is to prompt them to enter a password or an email. However, sometimes, you you will be using some external service such as Facebook, LinkedIn, or Gmail to authenticate users using their credentials from that service.

This has a few advantages to consider:

* It lets users authenticate faster, and they don't need to remember another password. The signup process is usually done with a few quick clicks (depending on the external service and whether the user is already logged in)
* This will sometimes let you fetch some data on behalf of the users, such as their email, profile pictures and social media posts

We'll use Facebook as an example below (in other words, your app offers a button labeled 'Login with Facebook'.).

### Signing up with Facebook

{% hint style="info" %}
The guide below describes how Facebook login works overall. To read more about the different settings on the Facebook login plugin, check out the resources below:\
\
Article: [Using the Facebook Graph API plugin](/help-guides/data/user-accounts/authentication-plugins/facebook-plugin)

Reference: [Facebook](/core-resources/bubble-made-plugins/facebook)
{% endhint %}

When you set up such a flow in Bubble, you will need to define the level of authorization[^8] you want from your users for your app to function. By default, most services only expose the public profile and the email when users sign up on a third party application using their credentials, but you can ask for more permissions (for instance, to post on their wall).

It's best practice both from a user and security perspective to only ask for permissions if you need them, and it's worth keeping in mind that asking for a long list of permissions can lead to fewer users signing up.

When a user signs up with a social network (Facebook) in Bubble, a new user is created in the database, similarly to a traditional sign up flow with email and password.

The main difference is that the way to login for the user, once logged out, will not be by entering their password (since they didn't define one), but by logging in with Facebook. If a user is logged in with Facebook and your app uses Facebook login in the same browser, the user is automatically logged in as that Facebook user.

### Mixing traditional and social logins

Users in Bubble can use traditional logins and social logins at the same time. There are a few different scenarios in which this could play out. We cover this in the dedicated OAuth article below:

Article series: [OAuth plugins](/help-guides/data/user-accounts/authentication-plugins)

## Temporary users

The moment you sign a user up is when you assign them an email address and permanent storage in the database. In many cases (but not always) this is also when a user provides a password to use to access the account later.

From a data perspective, Bubble actually keeps track of who the user is at an earlier point (with one exception). Whenever a new user visits your application, Bubble saves a cookie in their browser and creates a temporary user.

{% hint style="info" %}
This Bubble feature means that as long as your app allows for cookies, the *current user* data source will never return an empty value. If you want to check whether a user is actually signed in, you can use the *current user* [*is logged in*](#user-content-fn-9)[^9] operator.
{% endhint %}

this allows you to 'remember' who the user is during the session, and lets you set up application logic that relies on accessing data stored on the current user.

This is useful in different scenarios:

* Saving preferences and settings
* Storing temporary data like a shopping cart
* Personalizing the user experience

When the sign-up process is completed, Bubble automatically transfers the temporary data to the newly created user.

{% hint style="warning" %}
Data stored on a temporary user is transferred automatically when the user signs up, but not when they log in.
{% endhint %}

## Signing up and logging in users in mobile apps

Signing up and logging in users works in the same way across native apps and web apps within the same app project. In other words, you can use the same actions to sign up or log in a user regardless of whether they are accessing your app through the web or through an app installed on their device.

### Using the *Sign the user up* and *Log the user in* actions

Using the two actions above will work in exactly the same way as in your web app. You can read more about how user authentication works in our dedicated article in the Data section:

Article series: [User accounts](/help-guides/data/user-accounts)

### Using the *Signup/login with a web browser* action

This action, unique to native apps, allows you to use a page from your web app to sign up a new user or log in an existing one. This allows you to use an existing page for the signup/login workflows, as opposed to building one version for your web app and one for your native app. It supports email/password login, OAuth login, and 2FA.

<figure><img src="/files/VZgnFIfKnjwcQN2tZUZO" alt=""><figcaption></figcaption></figure>

## User account FAQ

#### How can I help my users log in if I can't see their password?

It's widely regarded as a basic security best practice that no one, not even the developer of an app, should have access to a user's password. The best way to help a user log in if they have lost their password is to help them [reset the password](/core-resources/actions/account#reset-password) or to [generate a temporary one](/core-resources/actions/account#assign-a-temp-password-to-a-user).

#### Can I log users out from sessions across multiple devices?

Yes, you can use the [Log out other user's sessions](/core-resources/actions/account#log-out-other-users-sessions) action for that. Note that this action logs the user out from all devices *except* the one they are running the action from. If you want that session to log out as well you'll need to use the [Log the user out](/core-resources/actions/account#log-the-user-out) action.

#### How long does the user stay logged in?

It depends on the settings you set in the [*Log the user in*](/core-resources/actions/account#log-the-user-in) action:

* [Temporary users](#temporary-users) (those who haven't signed up but have a cookie) will remain active on the same device for **72 hours**
* If the *Keep the user logged in* checkbox is unchecked, the user will be logged out after **24 hours**
* If the box is checked, the user will be logged out after **12 months**

There are other instances where the user will be logged out:

* If the [Log the user out](/core-resources/actions/account#log-the-user-out) action is triggered
* If the [Log out other user's sessions](/core-resources/actions/account#log-out-other-users-sessions) is triggered on another device
* If the user clears their browser's cookies

#### Is there a difference between using the *Make changes to* action and setting the data source to *current user* and using the *Make changes to current user* action?

No, there's no difference between the two: they will both let you change any custom field on the user.

#### Why can't I select the user's email field in a Make changes to the current user action?

The password field is special in that it's considered a part of the user's *credentials*. That's why we have a dedicated action for updating it called [*Update the user's credentials*](/core-resources/actions/account#update-the-users-credentials)*.* For security reasons, this action requires that the user re-enter their password (meaning that you need to set up an input element for it).

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [User Authentication: Bubble Introduction Series \[6/10\]](https://www.youtube.com/watch?v=gn0TixSCmGU)
* [Adding User Settings | Build Your First Bubble App \[13/20\]](https://www.youtube.com/watch?v=wwHOKUygxHI)
* [How to Create An Account For Someone Else](https://www.youtube.com/watch?v=gwocxW4OlG4)
* [Building a sign-up system](https://youtu.be/l6NQdipDtmI)

</details>

[^1]: Single sign-on is when you sign up and log into an app using a third-party account such Google, LinkedIn or Facebook instead of providing a username and password.\
    \
    Bubble has several plugins that let you set this up:\
    \
    Reference: [Facebook SSO plugin](/core-resources/bubble-made-plugins/facebook)\
    Reference: [Twitter SSO plugin](/core-resources/bubble-made-plugins/twitter)i

    Reference: [LinkedIn SSO plugin](/core-resources/bubble-made-plugins/linkedin)

    Other plugins are also available, or you can set up your own methods using the [API Connector](/help-guides/integrations/api/the-api-connector).

[^2]: All data types come with four fields out of the box:

    * Unique ID
    * Created date
    * Modified date
    * Slug

    Article section: [Data type built-in fields](/help-guides/data/the-database/data-types-and-fields#built-in-fields)

[^3]: One-way hashing is a way of turning it the password into a fixed-length code, called a hash. Once the password has been hashed, it can't be turned back into its original form. The hash is what's actually stored in the database.

    When you log in with your password, Bubble hashes the password and compares it to the stored hash. If they match, you get access.

    This means that even if someone were to gain access to the database, they wouldn't be able to see the actual passwords. Not even Bubble can do that.

[^4]: Salting works by adding a random string of characters to a password before it is hashed, which makes it more difficult for attackers to guess or crack the password.<br>

    Here's a simple way to think about it: Imagine you have two people who use the password "password123". One person doesn't use salting, so their password is just "password123". The other person uses salting, and their password is "password123" + "pEoW82!".\
    \
    When the passwords are hashed, they will be completely different, even though the original password is the same. This means that even if an attacker knows the original password, they still won't be able to guess the salted password because they don't know the random string of characters that was added.

[^5]: Actions are the part of a workflow that perform some specific task. In the context of users, this could be to sign the user up, log them in or make some changes to their profile.

    Article series: [Workflows](/help-guides/logic/workflows)

[^6]: *Operators* are the part of an expression that follows the data source.\
    \
    In the context of users, the *user* would be the data source and *is logged in* would be the operator, such as:\
    \
    Current User **is logged in**

[^7]: You can read more about hashing and salting in this infobox:\
    \
    Section: [How passwords are kept secure](#how-passwords-are-kept-safe)

[^8]: *Authrozation* is the process of determening what an identified user has access to in a system such as your app.

    In this context, it determines the data your app is allowed to collect from the third-party service.

[^9]: The *is logged in* operator can be applied to the *current user* data source in an expression and prompts Bubble to check whether the user is logged in.\
    \
    Reference: [...is logged in operator](https://manual.bubble.io/help-guides/data/pages/-MTpydODwo34mk5NucJy#...is-logged-in)\
    Reference: [...isn't logged in operator](https://manual.bubble.io/help-guides/data/pages/-MTpydODwo34mk5NucJy#...isnt-logged-in)
