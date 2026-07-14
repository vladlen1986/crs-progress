# Bug reports
> Source: https://manual.bubble.io/account-and-marketplace/bug-reports · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Filing a bug report

Bubble is a powerful and flexible platform that supports millions of apps, each with its own unique setup and requirements. While we work hard to test features thoroughly—through internal reviews, beta programs, and release checks—bugs can still occur from time to time.

That’s why user-reported bug reports are so important. They help us identify and resolve issues more quickly, contributing to a more stable experience for everyone. We truly appreciate the time and effort you and the community put into sharing detailed reports—they play a key role in keeping the platform reliable for all builders.

## Before submitting a bug report

To ensure an efficient handling of cases and to help us solve your problem as fast as we can, we encourage you to keep in mind the points below:

* **Reproduce the issue:** Ensure the problem is consistent and not a one-time occurrence.
* **Check the Bubble status page:** Bubble has a [status page](https://status.bubble.io/) that shows you if a server is having any known issues. You can also subscribe to issue alerts from the status page by clicking *Subscribe to updates*. Bubble's status is also visible in the AI chatbot (see [below](#chatbot-steps)).
* **Check the docs:** Verify if the observed behavior isn't the intended one. You can also ask a question in the [forum](https://forum.bubble.io/).
* **Eliminate external factors:** If using plugins or third-party integrations, [disable them temporarily](#user-content-fn-1)[^1] to see if they are the cause. Also check your browser for ad- and or script blockers that may cause issues.

## What makes a good bug report

* **What you expected to happen**\
  Describe the intended behavior. This helps us understand what should have occurred under normal conditions.
* **What actually happened**\
  Be specific about the unexpected behavior you observed. If something broke, describe exactly how.
* **Step-by-step instructions to reproduce the issue**\
  Outline the exact steps we need to take to see the bug for ourselves. Assume the person reading has no prior knowledge of your app.

{% hint style="warning" %}
**User/credentials:** If the behavior depends on the app being run by a specific user, include the user’s email or the credentials we should use to log in as that user.
{% endhint %}

* **A link to the relevant part of your app**\
  If you're comfortable sharing it, include a link to the editor or run-mode version where the bug appears. Include names of pages/views/elements/workflows.
* **Browser and device details**\
  Let us know what browser and operating system you're using, including version numbers. This helps us rule out environment-specific issues. If this is related to a mobile app, please include build details.
* **Any recent changes**\
  If you’ve made changes to your app recently (e.g., new plugins, workflows, or design updates), note them. These details can sometimes point us to the source of the issue.
* **Console errors:** If you know how to use the browser's console[^2], inspect it for any related errors.
* **When the error occurred:** Include when the behavior started, noting the date, time, and timezone of the first and most recent occurrences, as well as any changes made just before it first appeared.
* **Mobile apps:**
  * Include build details in your bug report.
  * Specify whether the behavior occurs in Web Preview, BubbleGo, TestFlight or internal testing, and/or the published app.
  * If you encounter an issue in a build distributed through internal testing or after publishing, include a download link.
  * If the error appears in BubbleGo, confirm that you’re using the latest version.

<details>

<summary>Checking console errors</summary>

#### Accessing the console

Most browsers include built-in developer tools that let you view console errors, which are often essential for diagnosing unexpected behavior in your app. Here’s how to open the console in the most commonly used browsers:

**Chrome/Brave**\
Right-click anywhere on the page and select *Inspect*, then open the *Console* tab.\
You can also press *Ctrl+Shift+J* (Windows/Linux) or *Cmd+Option+J* (Mac).

**Firefox**\
Open the menu and choose *More Tools → Web Developer Tools*, then select the *Console* tab.\
You can also press *Ctrl+Shift+K* (Windows/Linux) or *Cmd+Option+K* (Mac).

**Safari**\
First enable the Develop menu by going to *Safari → Settings → Advanced* and checking *“Show Develop menu in menu bar.”*\
Then open *Develop → Show JavaScript Console* or press *Cmd+Option+C*.

**Edge**\
Right-click the page and choose *Inspect*, then select the *Console* tab.\
You can also press *Ctrl+Shift+I*, then click *Console*, or go directly with *Ctrl+Shift+J*.

#### Exporting the log

**Screenshot**

For most cases, a screenshot is the fastest and clearest way to share console errors. It captures the exact messages, their severity (error/warning), and any context visible in the surrounding UI.

This is ideal if there are just a few errors.

**Exporting or copy/pasting the log**

If there are many errors or long logs, copying the text directly is more readable and easier for both you and our team to search through.

* Right-click inside the console and choose **“Save as…”** or **“Copy”** (varies by browser)
* Paste it into your bug report or attach it as a `.txt` file

This is useful if there are multiple errors and/or you want us to search for specific information.

</details>

## How to file a bug report to Bubble

Bug reports are submitted through the AI chatbot in the bottom right corner of your screen. Look for this symbol:

<figure><img src="/files/EG8MD7EOBwtevzbHvXY6" alt="" width="85"><figcaption></figcaption></figure>

### Chatbot steps

1. Click the chatbot symbol to expand the chat window.
2. You will see a window that shows the current operational status of Bubble.
3. Use the chat input to express that you want to report a bug.
4. You will be asked to provide your app's app id. You will find this in the URL of the tab where you have the editor open, for example `id=my-app-id`.
5. You can provide a text description of the issue. We encourage you to follow the advise in the *What makes a good bug report section.* You can also attach files (such as a screenshot) to help us identify the issue.
6. The bug report is submitted. You can still add further details after this step if you need to.

## What to expect after submitting a bug report

First, let's look at how bug reports are handled:

<table data-header-hidden><thead><tr><th width="220.27734375"></th><th></th></tr></thead><tbody><tr><td>Work hours</td><td>Bubble's bug report and support team is active <strong>24/7</strong></td></tr><tr><td>Normal response time</td><td>Bug reports will receive a response within <strong>2 hours on average.</strong></td></tr><tr><td>Response</td><td>The response is sent back via the <strong>chatbot</strong>, and the <strong>email address</strong> associated with your Bubble account.</td></tr></tbody></table>

### When are bugs fixed?

It's difficult to set an exact timeline for when a bug is fixed, for a few reasons:

* **Severity and impact vary:** Some bugs affect only a small number of users, while others may have broader consequences. More critical issues are prioritized accordingly.
* **Reproducibility:** Bugs that are easy to reproduce can often be addressed faster. If a bug is inconsistent or difficult to replicate, it may take longer to diagnose.
* **Complexity of the underlying cause:** Some bugs can be traced to a simple fix, while others may reveal deeper issues that require more time to resolve safely.
* **Need for testing:** Even after a fix is identified, it must be thoroughly tested to ensure it doesn't introduce new problems elsewhere in the platform.
* **Release process:** In some cases, fixes must wait for a scheduled deployment window, especially if they involve changes to core infrastructure or systems.
* **When it's not a bug:** Some issues may turn out to be expected behavior rather than actual bugs. When that happens, we’ll do our best to explain how the feature is designed to work and offer guidance or possible workarounds to help you move forward.

[^1]: You can temporarily disable plugins and/or custom headers when previewing your app. See the article below for instructions.

    Article section: [Preview in safe mode](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app#safe-modes)

[^2]: The console is a built-in browser tool that shows errors, warnings, and messages that occur while a page is running.

    Article section: [Checking console errors](#checking-console-errors)
