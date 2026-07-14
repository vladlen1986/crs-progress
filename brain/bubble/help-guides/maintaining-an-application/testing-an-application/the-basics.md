# Introduction to testing and debugging
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/testing-an-application/the-basics · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers general advice for testing and debugging your app

First, let's spend some time to define the different terms included as you prepare your app for live users:

**Testing** is the process of trying out the different steps of your application to check that it works as expected. It doesn't have to mean something wrong, but if there is, testing is meant to uncover it.

**Debugging** is done when you've observed a non-expected behavior. It's the process of understanding the root cause of the issue so that you can rectify it.

This introductory guide will give you some general advice on how to test and debug your app, before we move on to the tools that Bubble offers.

### The Development environment and Live environment

Every Bubble app consists of two environments[^1]: Development and Live. Development is a fully functioning version of your app that you (and your team) can work in together to see exactly what the finished app will look live. Live is the app that your users see.

The two environments have database that operate completely independently of each other. In other words, in the Development environments you can make changes to your database that have no effect on your live app, making it a completely safe environment to experiment in whichever way you need to.

You should always aim to fully complete testing and debugging before deploying your app to Live.

## Testing

### Plan your testing and break it into pieces

Testing is all about using your app as your users would, and working systematically through all pages and features to identify issues. While this guide will not outline what a systematic approach should look like (everyone works differently), we will still encourage you to be mindful of how you organize your testing.

### Keep notes

If you are testing something and see an issue elsewhere, take a note for later and stay focused on the task at hand. Letting your focus drift from place to place is an easy way to miss things, so remember to stick to the plan, but note down anything else you see.

### Add test data

An app with no data in it and an app with lots of data can behave very differently. Adding test data can help you identify issues related to design, performance and security.

### Test on different screen resolutions and devices

If your app is going to be used on different screens and devices, it's a good practice to test it on different resolutions and maybe even throttling the connection speed and CPU. Chrome Developer tools offers a highly useful [Device Mode](#user-content-fn-2)[^2] that lets you do all of these things.

### Test as different users

As you introduce privacy rules and conditions, your users will start to experience the app differently. Some users may have access to specific parts of your database and app, while others don't. In these cases it's useful to make a habit of testing your app as different users.

For example, if you have two user types, *user* and *admin*, it's likely that one has a different access level than the other, and you may miss issues or inconsistencies if you only test as one of them.

#### How to test the app as another user

To use your app as a specific user, simply search for that user in the built-in database editor and click *Run as*.

<figure><img src="/files/UF76GnISc4IYzq2cJwqJ" alt=""><figcaption><p>Using the <em>Run as</em> feature lets you easily test your app as another user without having to know their credentials.</p></figcaption></figure>

## Debugging

### Make sure you can reproduce it

As you keep testing your app, you will uncover the occasional issue – don't worry, it happens even to the most experienced developers!

When beginning to debug an issue, the key initial step is to establish a consistent and predictable method for reproducing it. In practice, this involves retracing your steps and running multiple tests to confirm that the issue consistently appears every time, and with the same characteristics.

This lets you get a firm grasp of the problem before you spend time tackling it.

### Stay systematic and break it down

Each issue you find may have more than one cause. As you identify it or them, stay focused on one at a time. It can be useful to find ways to test that the cause you're currently working on is fixed before moving on to the next. Again, keep notes to make sure you don't miss anything.

### Remember privacy rules

Many issues are related to data being unavailable because of privacy rules. Keep in mind that they apply everywhere (elements, workflows and conditions), so it's often a good idea to check the rules for the relevant data type.

### Collect information

If the error has been reported by one of your users, you should try to collect as much information as you can about the circumstances that produced the error.

* Which user is it?
* What kind of device and browser are they using?
* Are they using ad blockers or script blockers of any kind?
* What were the exact steps they took to produce the issue?
* Can it be reliably reproduced, or could it be because of a poor connection or other external reason?

### Reach out to the community

Bubble has an incredibly welcoming and helpful community. If you ever find yourself stuck on an issue, don't hesitate to seek help! Share your problem on the [Bubble forum](https://forum.bubble.io/), reach out to our [Success Team](https://bubble.io/contact), or hire one of our [expert coaches](https://bubble.io/coaching) to assist you in resolving it.

### Take a break!

Sometime issues are best solved on a walk outside, in the shower or lying on the couch. Other times you simply need some time to refresh your mind before returning to the screen and continuing the search.

Your brain is a muscle – it too needs rest between the sessions!

## Testing and debugging tools

Bubble offers two ways to debug issues, each serving a specific purpose:

<details>

<summary>The debugger (checking errors on elements and in workflows as they happen)</summary>

The debugger is a small panel at the bottom of the screen when you are running your app in Development. Using the debugger, you can:

* **Run workflows action-by-action** and check data (such as the result of a search) related to each step
* **Inspect the elements on the page** to check their attributes, conditions and associated data

Article: [The Debugger](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)

</details>

<details>

<summary>The Server Logs (diagnosing past issues)</summary>

The second tool for diagnosing past issues is the Server Logs. This feature allows you to retrospectively examine what occurred in your workflows and check any unexpected behavior or errors.

Article: [The Server Logs](/help-guides/maintaining-an-application/testing-an-application/using-server-logs)

</details>

## Using safe modes

{% embed url="<https://youtu.be/xuWjMH7KICA>" %}
Our Academy quick tip on how to preview your app in safe mode
{% endembed %}

Safe modes is a way to preview your app, but disabling certain parts for debugging purposes:

* HTML - this disables on-page HTML elements
* Community plugins - this disables community-made plugins

If the issue resolves itself in Safe mode, you'll know it is due to something introduced by a plugin or custom code.

#### How to enable Safe mode

You enable Safe mode by holding the mouse button on the *Preview* button for one second. A dropdown will show you the list of options.

<figure><img src="/files/XNFuWBap8AnIJnv8LEtP" alt=""><figcaption></figcaption></figure>

<details>

<summary>What if you think it's a Bubble bug?</summary>

The Bubble development team extensively tests features and uses automated testing to minimize bugs. However, if you believe you've encountered an issue that is not caused by the way your app and workflows are built but rather an unexpected behavior in a Bubble core feature, please reach out, and we will investigate.

This does not apply to plugins that aren’t built by the Bubble team. For those, we recommend reaching out to the plugin author directly.

#### How to Report Bugs

To report a bug, please use the **Bubble AI chatbot**.

*Note: You must be logged into your Bubble account to report a bug.*

#### Before You Submit a Bug Report

To ensure that your issue is indeed a bug, please take the following steps before submitting a report:

* Verify that your internet connection is stable and that you are using the latest version of your browser.
* Test the issue in *Incognito mode* (or Private Browsing) to rule out interference from browser extensions or ad blockers.
* Remove any *custom code* you have added in HTML elements, headers, or other custom script sections.

#### While Submitting a Bug Report

To help us investigate and resolve your issue as quickly as possible, please keep the following in mind:

* **Be as specific as possible** when describing the issue:\
  \
  ❌ *It doesn’t work, I think it’s a bug*\
  ✅ *Based on this condition, this element should be red, but instead, I see it as green.*<br>
* If possible, **reproduce the issue on a blank test page** outside of your app’s core design and workflows. The more isolated the issue, the faster we can investigate.
* Provide **clear instructions** that someone unfamiliar with your app can follow. A step-by-step guide like *“Click on button A,” “Type XX in the input,” “Click on button B,” “See the problem”* is the most effective.
* **Include screenshots** to illustrate the issue when prompted in the chatbot.
* **Videos can be helpful** but should not replace written descriptions. They should serve as a complement if necessary.

We understand that bugs can be frustrating and slow down development. By providing clear and detailed reports, you help us identify and resolve issues faster—benefiting not only you but the entire Bubble community.

</details>

[^1]: Bubble apps consist of a Development and Live environment that live completely independently of each other.

    You can read more about this concept in our section on Version Control:

    Article section: [Environments](/help-guides/maintaining-an-application/version-control#environments)

[^2]: Device Mode lets you preview how your page appears and functions on different mobile devices. It also lets you test how it behaves if you throttle CPU and connection speed.

    External link: [Chrome Developer Tools Device Mode](https://developer.chrome.com/docs/devtools/device-mode/)
