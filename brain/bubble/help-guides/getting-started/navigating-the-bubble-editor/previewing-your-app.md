# Previewing your app
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Bubble is a WYSIWYG[^1] editor, which means that what you see in the editor is generally what you will see in the finished app. Every alteration you make within Bubble is instantly saved, allowing you to preview your evolving app on-demand.

<figure><img src="/files/GqFsk1rEcjCNBj3kcKSr" alt=""><figcaption></figcaption></figure>

To preview your app, click the *Preview* button in the upper right corner of the Bubble toolbar. This will open up a new tab where your app will load.

## Test and Live environments

By default, your application is split into two distinct environments: Development and Live. This structure allows you to continue refining your application without affecting the live version. Whenever you click the *Preview* button, Bubble automatically runs the Development environment, often called *version-test*.

You can recognize this by the URL that Bubble opens:

<figure><img src="/files/yBl9qXwBdISJdabkEJa4" alt=""><figcaption><p>The URL shows that this is the preview of your app, and not the Live environment</p></figcaption></figure>

To run the app in Live, you first need to deploy[^2] it.

## *Run as* a specific user

When you preview your app, you can run the app as a specific user to test how the app behaves as that user. This is particularly useful when you work with [privacy rules](#user-content-fn-3)[^3] and conditions[^4]: some users may not have access to specific data and actions, and by running the app as different types of users, you can make sure that it behaves in the expected way.

The *run as* feature is found in the *Data – App Data* section when you have the user data type selected. You'll see the list of users in the data table, and on the left-most column of the table you'll see a text link that says *Run as*.

<figure><img src="/files/nstsil703VaY9XlkUQqM" alt=""><figcaption><p>The <em>Run as</em> feature lets you preview the app as a specific user.</p></figcaption></figure>

### *Run as* in Live

You can also run as a specific user in your live app. To do that, switch the database view to the live database (see the red link that says *Switch to live database*) in the upper right corner of the screenshot above).

## Safe modes

If you are experiencing issues in your app, you can run it in different *Safe modes* to try to identify where the problem lies. To preview the app in safe mode, press and hold the Preview button. You will see a menu that lets you choose between a few different modes.

Running in safe mode does not affect Live in any way.

### Safe - no custom HTML

This will preview the app without any added custom HTML.

### Safe - no community plugin

This will disable any community-built plugins before previewing. Note that Bubble-built plugins will still be enabled.

### Safe - no community plugin and HTML

This will both disable community-built plugins and HTML. Note that Bubble-built plugins will still be enabled.

### Disabling safe mode

Running any of these preview modes will add a URL parameter to your preview's URL. To disable the safe mode, you can either:

* Remove the URL parameter from the URL
* Click the *Preview* button in the upper right corner again without holding

## The debugger

Previewing your app also give you access to the debugger. The debugger lets you troubleshoot and inspect the real-time behavior of your app. It provides insights into workflow execution and element properties.

Article: [The debugger](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)

[^1]: "WYSIWYG" stands for "What You See Is What You Get." In the context of the Bubble editor, it means that the layout and elements you arrange and design in the editor will look and behave similarly when previewed or live.

[^2]: Deploying your app means transferring or updating the current version of your application from the Development environment to a Live environment, making it accessible to end-users.\
    \ <br>

    Article: [Deploying your app](/help-guides/publishing-your-app/deploying-your-app)

[^3]: *Privacy rules* are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.\ <br>

    Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^4]: *Conditions*, or conditional expressions\[^5], let you set up mechanisms that check whether a specific question returns a *yes* or a *no* answer and then take an action, stop an action or make a change in your app in response.

    Article: [Conditions](/help-guides/logic/conditions)<br>

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)
