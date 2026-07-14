# App security
> Source: https://manual.bubble.io/help-guides/security/app-security · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers security applied on an app level

Having made sure that your Bubble account is secure, it's time to look at the settings for each individual application. Just like your account, these overarching settings should be thoroughly set and reviewed to form the foundation of your app's security.

## Application rights

Applications rights determine who has access to your app more broadly. While the collaboration feature allows you to invite and set the administrative privileges of single users, your app's application rights set the overarching access level of *anyone* who tries to access your app's editor.

{% hint style="info" %}
Bubble sets strict application rights by default: this setting is only a security concern if you have made changes to it.
{% endhint %}

Sharing an app publicly can be highly useful in certain situations, but it's important to consider the security implications involved. If your app contains sensitive information or you want to restrict access to specific individuals, you should implement strict application rights to protect your app and its data.

<figure><img src="/files/rOSHmt1pVMILNBQxyWbJ" alt=""><figcaption></figcaption></figure>

You will find the application rights setting under *Settings - General*.

* **Private app**: No one can access the app editor except for you and collaborators
* **Everyone can view:** Anyone can access the app editor and view it and any data, but they cannot make any changes
* **Everyone can edit:** Anyone can access the app editor and change anything they want

## Development and Live app access

Your app can be previewed by entering the APP's URL and the name of a branch[^1] (with the Main branch having the default URL *version-test*).

<figure><img src="/files/7DxkzyvKqfAhDre1Iydz" alt=""><figcaption></figcaption></figure>

You can choose to set a password to protect both the Development and Live app to ensure that no one has access to one or both environments without the right credentials.

By default, Bubble sets the username *username* and the password *password*, but we strongly recommend setting up your own credentials as these are the default for all new apps and can easily be guessed.

## Password policy

{% hint style="info" %}
The password policy applies to your **app** – not your Bubble account.
{% endhint %}

Using a password policy lets you make sure that your users use a password that meets certain requirements and is secure enough. If you want to activate this feature, check the relevant box in the General section of the Settings tab. Once you check the box, you will see a few other options that you can choose to select to vary the password policy even further.

![](/files/OVc1QxRLkM466EylAgY0)

## Collaboration

Inviting collaborators[^2] into your app can be a great way to solve problems, work on separate features simultaneously and speed up development, but it's important to keep in mind what kind of privileges you are giving your collaborators.

They can potentially access private data, make changes to your app and even invite other users if given the rights to do so.

The list below is a set of best practices that you should keep in mind when working with collaborators:

* Make sure you know the person you invite and that you spell their email address correctly
* Never give them broader access than they need to do their job
  * In many cases, there's no reason for a collaborator to have access to data in Live
* Remember that they have access and remove them from the app when they no longer need that access

### Collaborator password policy

Ensure that you enforce strict password and authentication policies for collaborators too. If a collaborator with extensive access privileges has their account compromised, it can result in similar consequences as if your own account were breached.

### Copying data between databases

[Copying data](#user-content-fn-3)[^3] from the Live database to the Development database can be useful to find and debug issues, but keep in mind that it may give collaborators access to the data. This can lead to unintended viewing or sharing of private user data.

[^1]: A *branch* is an independent iteration of your application that can be developed in isolation.\
    \
    Article: [Version control](/help-guides/maintaining-an-application/version-control)

    Article section: [Branches](/help-guides/maintaining-an-application/version-control#branches)

[^2]: *Collaborators* are fellow Bubble developers that you invite to work on your app. They can contribute to both the design and data aspects of your application. With Version control, you can exercise a high level of control over collaboration.\
    \
    Article: [Collaborators](/help-guides/maintaining-an-application/collaboration)\
    Article: [Version control](/help-guides/maintaining-an-application/version-control)

[^3]: Bubble has built-in features for copying parts of or the full database between Live and Development.\
    \
    Article: [Copying your database](/help-guides/maintaining-an-application/database-maintenance/copying-the-database)
