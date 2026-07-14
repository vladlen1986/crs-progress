# Web app
> Source: https://manual.bubble.io/help-guides/publishing-your-app/deploying-your-app · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Deploying your app means transferring or updating the current version of your application from the Development environment to the Live environment (sometimes called *production)*, making it accessible to end-users.

In other words - this is the point where you publish your app to users who are actually going to use it. Deploying an app in Bubble is done with the click of a button.

## Requirements for deploying

While you are mostly free to deploy your app whenever you like, Bubble does require that the [issue tracker](#user-content-fn-1)[^1] is not flagging any issues. If the issue tracker is showing any issues, they first need to be resolved in order to deploy.

## How to deploy

When the [Issue Checker](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-issue-tracker) is at zero and you are prepared to deploy, you can start the process. Deploying your app is instant for all practical purposes.

First, click the version control button in the upper right corner of the Bubble menu bar..

<figure><img src="/files/FiZlgkwo5M3KgBO9sjhI" alt=""><figcaption></figcaption></figure>

The deploy window will open up.

<figure><img src="/files/Ccj8z1BV3Kzh0OENlrk6" alt=""><figcaption></figcaption></figure>

You can give a description of the deployment to document the changes you've made. This description will be saved along with the savepoint automatically. This way, if a deployment introduces any issues, you can revert back to an older version if needed.

{% hint style="success" %}
We recommend providing each deployment with a descriptive text, so that you can easily navigate your deployment history later if needed.
{% endhint %}

## Multiple branches and version control

If you work with a team or on a particularly complex app, you may be using Bubble's version control system to isolate specific features or projects while they're in development.

If this is the case, we recommend getting to know the [version control](/help-guides/maintaining-an-application/version-control) system and [best practices](/help-guides/maintaining-an-application/version-control/best-practices) related to it before deploying.

## The user experience when your app is updated

When you deploy your app, existing, online users will instantly see a notification at the top of the screen that tells them to refresh the tab. Clicking on the tab will refresh the current page. Users who don't have the app open when you deploy will not not notice anything – they will simply have access to the new version of your app the next time they log the page.

<figure><img src="/files/zq3nhfQY0lvB3LBaEHKB" alt=""><figcaption></figcaption></figure>

Your users will not be able to use the app until they have refreshed the page. As such, the *timing* of the deployment can matter. If possible, plan your deployments at a time when the usage of the app is low.

## Other ways to learn

<details>

<summary>Video lessons</summary>

* Playlist: [Using version control](https://www.youtube.com/watch?v=xuKtlZMfXnQ\&list=PLoNVJrdvQQYlCsgQJKsprzr0RCqSMPbxK\&pp=iAQB)
* Video: [Introducing the version control feature](https://www.youtube.com/watch?v=07DkhNbPi6I)
* Video: [What is version control?](https://www.youtube.com/watch?v=xuKtlZMfXnQ\&t=10s)
* Video: [Creating custom branches](https://www.youtube.com/watch?v=rH4a2VqyN_I)
* Video: [Deploying your app to Live](https://www.youtube.com/watch?v=mXHF2ott4r0)

</details>

<details>

<summary>Related articles</summary>

* Article series: [Version control](/help-guides/maintaining-an-application/version-control)

</details>

[^1]: The *issue tracker* helps identify and resolve problems in your application. When you're building your app, Bubble automatically checks for inconsistencies and errors, and lists the results in the issue tracker tool.\ <br>

    Article: [The issue tracker](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-issue-tracker)
