# Collaborators
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/collaboration · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers collaboration, which is how you invite other Bubble users to edit your application and its data

Bubble makes it easy to add more editors to your app to speed up development and work on multiple features at the same time.

As the app owner, you can decide who to invite to work on the app and control the level of access they have. This article will explore how to manage your team efficiently while maintaining the security of your app and its data.

{% hint style="info" %}
Collaboration features are available on Bubble's higher-tier plans. **Free** and **Starter** plans do not support collaborators, while the **Growth** plan allows up to two collaborators. **Team** and **Enterprise** plans offer even more flexibility, with the **Enterprise** plan allowing customization of collaborator limits.

See and compare the different Bubble plans [here](https://bubble.io/pricing/compare).
{% endhint %}

{% embed url="<https://youtu.be/Pc-nLgsCOfY>" %}
Our Academy quick tip on how to add collaborators
{% endembed %}

## What are collaborators?

Every editor that you add to your app is known as a *collaborator*. They are connected to an app, and not to your account, meaning that if you have multiple Bubble projects, you can choose which one(s) to add one or more collaborators to. The user account that is paying for the Bubble app is known as the app *owner*.

Collaborators need to have a registered Bubble account before they are invited. Collaborators with Agency accounts do not count toward the app’s collaborator limit. This exception applies to all plans, including Free and Starter plans.

## Inviting collaborators

Adding collaborators is done in a few easy steps\_

1. First, make sure that the person you are inviting has a Bubble account. If not, they can sign up [here](https://bubble.io/login?mode=signup).
2. Navigate to *Settings - Collaboration*.
3. Under *Invite a user*, provide their email address and click *Invite.*

## Controlling access levels

Each user you invite (plus your own account) makes up one row as exemplified below, meaning you set the access level of each individual user.

<figure><img src="/files/oNwIw1OxvgjmsH8AoIdW" alt=""><figcaption></figcaption></figure>

### Admin

Selecting the admin checkbox grants the most extensive set of privileges, just below the owner level. Admins can invite and edit the rights of users, and all other privileges will be set to their most generous level. Admins can also change the general settings of your app.

### App

* View only
* View and edit

This setting determines whether the collaborator can make edits to your application or just view it. It does not affect the collaborators access to the database.

### Data

This setting determines the access a user has to your database.

* No permission - (cannot see or edit any database data in Development or Live)
* View only - (can only view data, but cannot change it in the database editor)
* View and run as (can only view data, but can also use the [*run as*](#user-content-fn-1)[^1] feature)
* View and edit (can view and freely edit data)

### Logs

* No access
* View and query

This setting determines the collaborator's access to the *Logs* section in the Bubble editor. Keep in mind that logs can give access to see data from the database and to scheduled workflows.

### Only Development

If this is checked, the collaborator can only access the app and database of your Development environment.

## Removing a collaborator

To remove a collaborator, simply click *remove* in the row of the collaborator you want to remove.

## Transferring an app

This will immediately transfer ownership of the app to another Bubble user. Be careful when using - if you are not an admin collaborator on the app, upon transfer, you will not be able to undo the transfer. If you would like to stay on as an Admin Collaborator, you must check the box on the Transfer modal.

## Multi-user editing

If more than one user modifies an app at the same time, you will see the mouse of the other users, which helps prevent two users from modifying the same elements at the same time. You can toggle this setting with the *Show the cursor of other editors when they modify the application* checkbox at the bottom of the page.

## General advice when working with collaborators

The first thing to emphasize about the collaboration feature is that you are potentially granting another Bubble users a very wide access to both your app and its data. While this feature can be very powerful and indeed encourage collaboration, it should be used with care.

Keep in mind the following as you start inviting collaborators:

* **Don't give broader access than what's needed:** This is advice that applies to computer security: don't give any user access to more than they need to do their job.
* **Remove collaborators when their job is done:** If the collaborator is working on the app for a limited amount of time, remove them from the list. Keep in mind, they can be added back any time you need them.
* **Consider closing access to the Live app:** granting access to Development is usually enough to develop new features and fix bugs. This also lets you stay in control of what's deployed to Live.
* **Consider your user's privacy:** Only give access to the database if it's necessary – especially the Live database. This helps you ensure that your user's data remains secure. if you need to debug with Live data, you can also consider transferring data (all of it or only the needed data) with the [*Copy and restore database*](#user-content-fn-2)[^2] feature.

## FAQ: Collaborators

### Why can't I add a collaborator?

There can be a few different reasons why you can't add a collaborator to your app.

* **Free or Starter Plan:** These plans do not support collaborators. Upgrade to the Growth plan or higher.
* **Growth Plan Limit Reached:** The Growth plan allows only two collaborators (owner + one editor). Remove an existing collaborator or upgrade to a higher plan.
* **Agency Account Misconfiguration:** Ensure the collaborator is using their Agency-associated email.

### Why don't I see the collaboration tab

The Collaboration tab is only available on Growth plans or higher. Upgrade your plan to enable this feature.

### Can collaborators use the Bubble AI Agent?

Yes. Collaborators can access and prompt the Agent just like the account owner. Any restrictions placed on the collaborator also apply to their use of the Agent.

### Can I invite someone who doesn't have a Bubble account yet?

The person needs to have an existing Bubble account that matches the email you enter in the *Add collaborator* field.

[^1]: The *run as* feature is available in the Bubble database editor on the User data type. It lets you quickly "log in" as a specific user and see the app as they do. This is not meant as a long-term login but is used for debugging.

[^2]: The *Copy and restore database* feature lets you copy the content from the Development database to the Live database and vice versa.

    It also lets you restore the database to what it looked like at a specific date and time.

    Reference: [Copy and restore database](/core-resources/bubbles-interface/data-tab#copy-and-restore-database)
