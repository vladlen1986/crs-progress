# Actions
> Source: https://manual.bubble.io/help-guides/logic/workflows/actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers actions, which are the steps in a workflow that perform different tasks

Actions are the things that **makes stuff happen** in your app. They are the the part of a workflow that performs a specific task, such as making a change in the database, hiding/showing/animating something on the page or navigating to a different page.

<figure><img src="/files/p8fGwsApMzHQ7qaqDrJ4" alt=""><figcaption></figcaption></figure>

Actions happen as the result of an [*event*](#user-content-fn-1)[^1]*,* and together, they make up the *workflow*.

> Events determine **when** to do something, and actions determine **what** to do

Actions can be chained together to perform a set of tasks in sequence, and each step can rely on information generated in a previous step. Each step can also be controlled with a dynamic expression that controls whether to run or skip that step, based on specific conditions.

## Working with actions

In the Bubble workflow editor, actions are visible as soon as you create or open a workflow from the sidebar.

<figure><img src="/files/GA0GeCEBoLqtsCEIkXg4" alt=""><figcaption></figcaption></figure>

### Creating actions

To add the first action to a workflow, click the *+* symbol underneath the event. You will see a list of actions separated into categories.

{% hint style="info" %}
You can add new actions to use across your app by installing plugins or by adding API calls with the API Connector with *use as* set to *action.*

\
Article: [The API Connector](/help-guides/integrations/api/the-api-connector)
{% endhint %}

As soon as you add or click an action, Bubble will show you the settings for that action. Below is an example from the [*Make changes to a thing*](#user-content-fn-2)[^2] action:

<figure><img src="/files/kNVUY9uiOcU0SZVMQE0r" alt=""><figcaption></figcaption></figure>

The *Thing to change* specifies the [data source](#user-content-fn-3)[^3] of the thing you want to change. After selecting it, Bubble will display the available fields[^4] on that [data type](#user-content-fn-5)[^5]. In the example above we change the name of the user by providing a static text value.

### Setting conditions for running an action step

A workflow can consist of as many steps as you need, but sometimes you'll need to set some rules that determine whether one of those steps should execute or not. For example, you could have a workflow that requires the user to be logged in in order to run; if they are not, you can show an error message.

For this, you use the **only when** field: as the name suggests, this tells Bubble to *only run this action when...* a condition is true. Conditions are [dynamic expressions](#user-content-fn-6)[^6] that provide a *yes* or *no* value, depending on a given set of factors.

{% hint style="info" %}
This step relies on using **dynamic expressions** to set up **conditions** in order to determine whether to run a workflow or action. If you're not familiar with these concepts, we recommend first reading the articles below:

Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

Article section: [Conditions](/help-guides/logic/conditions#only-when-conditions-workflow-conditions) (only when)
{% endhint %}

## The order in which actions are triggered

{% hint style="warning" %}
**Note:** Although a workflow is created as a linear set of actions, there is a lot going on behind-the-scenes when a workflow executes. This can sometimes lead to some steps firing before other, earlier steps in some cases.

Some workflows run in the client's browser, while others (such as database operations) need to happen on Bubble's server. Some workflows will happen in both the browser and on the server.

If a workflow includes a mix of actions from these three categories, the order in which they are triggered may differ from the linear design in the workflow because of what's firing in the browser versus the server.
{% endhint %}

The points below offer insights into Bubble's workflow logic along with some general recommendations. It is worth mentioning that the terms "steps" and "actions" are used interchangeably, although in the given examples, "steps" are used when the order is significant.

For efficiency purposes, workflows run in parallel across the server and the front end. Despite the names "Step 1," "Step 2," it is important to note that a given step does not necessarily wait for the previous one to complete before triggering the next one. The following is some information about Bubble workflow logic and general recommendations. Please also note that steps and actions are used interchangeably, but steps may be used in these examples when the order is important to note.

General rules about how workflows run:

* Frontend workflow actions run in order but the next action does not wait on the previous action to be complete before triggering.
* Backend workflows are triggered as soon as the workflow is triggered, independently from steps. For example, a "Schedule API Workflow" action will be triggered as soon as the workflow is triggered even if it is placed last in the workflow action sequence.
* Custom events run in sequence, not parallel. If Workflow 1 triggers a custom event that starts Workflow 2, Workflow 2 will complete before the remaining actions in Workflow 1 run.
* Searches aren’t always immediately updated with new data. So if you create a new item, and then try to retrieve it via search, it may or may not work; you should not rely on this.
  * Retrieving a thing from “result of step X” where step X is the “Create…” step should always be safe.

Workarounds to help achieve workflow consistency:

* When a workflow trigger (e.g. a button) can have multiple results based on conditions, it is safer to create multiple workflows and place the conditions at the workflow level instead of creating one workflow with all possible actions and placing the conditions at the action level.
* In a workflow with two actions, if Step 2 is using a condition based on a search depending on data manipulated in Step 1, then Step 1 should be implemented into a custom event to make sure it is finished before moving on to Step 2.
* If a backend workflow should be triggered after other steps in the workflow, then it should be implemented in a custom event placed after the steps that need to come first.
* The safest way to use data from one step to another is to use the “Result of step X” operators instead of searches.
* We do not offer the explicit ability for an action to wait for a workflow to be over before moving on to the next step; however, using "add a pause before next action" action is usually an effective workaround.

<details>

<summary>Video lessons</summary>

* [Understanding workflow execution rules](https://youtu.be/IbhCrciOKHM)

</details>

## Using data from a previous step

Sometimes an action needs to refer to an earlier step in the same workflow. If you do this by referring to it *indirectly*, there is a risk that the change you initiated has not yet had time to update and may not be reflected in the later step. Let's look at an example to illustrate this:

Let's say you are using the [*Make changes to a thing*](#user-content-fn-7)[^7] to save some information to a data type called *Product*. In a later step, you refer to that same product by the data source *Result of step 1* and then that Product's name.

<figure><img src="/files/eVe1K9BGUVRwgPjkh4X8" alt=""><figcaption></figcaption></figure>

1. In this example we are first changing the name of the Product
2. And then we use the [*Set state of an element*](#user-content-fn-8)[^8] to save that name in a custom state

## Native mobile actions

### Navigation

#### Go to view

#### Stack

Stack navigation is a navigation pattern where users move through a “stack” of screens as they progress through your app. Take the Spotify app as an example: when you’re on a tab, such as Home or Your Library, and navigate to a playlist screen, you’re viewing a new screen while the original tab remains active. This is because the current view is “stacked” on top of the base view, which is the tab itself. To return to the base view, you simply tap the back arrow in the top left corner of the screen.

<figure><img src="/files/Q46fg9niGrj61pu42lzs" alt="" width="563"><figcaption><p>The presence of a back button in the top left is an indicator that you’re navigating through a stack of views.</p></figcaption></figure>

#### Reset navigation stack

When navigating to a new view, the original stack remains active, allowing users to return to it using the built-in back button or swipe gestures. If you want to prevent users from going back to the original view, you can use the *Reset navigation stack* option. This is useful in scenarios where you want to completely clear the navigation history.

<figure><img src="/files/G8b1FA0iceZScfAcnoap" alt="" width="380"><figcaption><p>Resetting the navigation stack is performed within the <em>Go to view</em> action.</p></figcaption></figure>

For example, if a stack displays a login form and the user successfully logs in, you may not want them to navigate back to the login screen. *Reset navigation stack* ensures they start fresh from the new view.

{% hint style="warning" %}
Note that this feature removes the original stack from Bubble's memory. As a result, you can no longer access any data from the original view (such as form content), and actions applied to that stack will fail (such as attempting to reset the form).
{% endhint %}

#### Modal

Another way to navigate to a new view is to use a modal. A modal should be used when you want to provide a scoped experience to the user that requires the full screen. A good example of this is the new message modal in the iOS messages app. Since you don’t need the context of the messages view below, the modal takes up the full screen to allow you to craft your message, but also allows you to quickly return to your messages view.

To open a view as a modal, you’ll use the “Go to view” navigation workflow action but select Modal instead. This will open the target view as a modal sheet over the base view. While you can swipe down to close the modal, it's generally a good idea to include a button to close the modal in an app bar.

To add a close button, add an app bar to the view that will be opened as a modal and add a trailing button with a “Go to previous page” workflow action. This will close the modal when the user taps the button.

<figure><img src="/files/0a5iMQfwqq2zOY32GCmi" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Modals are similar to sheets, as both are used to provide a more focused experience for the user. Since a modal represents an entire view, it’s best used when specific data from the "base" view isn’t needed, such as when the data source of a particular group on the base view is irrelevant.
{% endhint %}

#### Go to tab

*The Go to tab* action functions similarly to the *Go to view* action, including the use of view properties. However, the target view must be associated with a tab. When navigating using the *Go to tab* action, the tab bar will automatically update to reflect the new tab

### Set current view's property

The *Set current view's property* action lets you assign a value to a property on the current open view. To use the action, you need to first define one or more properties on the view.

### Push notifications

{% hint style="warning" %}
Before you can use the push notification feature, you need to add your APNs ID and key to your mobile app settings.

Article section: [Push notification ID and key](/help-guides/publishing-your-app/native-mobile-app/ios-app-store#push-notifications) (iOS)

Article section: [Play Store push notification settings](/help-guides/publishing-your-app/native-mobile-app/google-play-store#push-notification-settings-optional) (Android)
{% endhint %}

{% hint style="warning" %}
**Requesting permission:** Before sending push notifications, you must first request the user's permission. We strongly recommend implementing this step *before* attempting to send a notification.
{% endhint %}

Push notifications allow you to send real-time updates, reminders, or alerts directly to a user’s device, even when the app is not actively in use. Whether it’s a personalized message, a promotional offer, or a notification about app activity, push notifications help keep your users informed and connected with your app’s content.

These notifications leverage the native capabilities of iOS and Android devices, and provide a highly targeted way to reach your audience.

Push notifications require an active permission from users before they can be sent. You must request this permission before sending push notifications to users who have not explicitly approved them.

{% hint style="info" %}
The push notification features outlined in this article apply only to native mobile applications, and do not apply to web apps.
{% endhint %}

### The devices data type

Using push notifications adds a new built-in data type to your app called *devices.* This data type contains key information about a user's device(s), and is used as a data source when sending push notifications.

The *devices* data type is read-only: you cannot rename it, any of its fields or add new fields. This data type is also automatically protected by a preconfigured [privacy rule](#user-content-fn-9)[^9], since the push notification token is sensitive and should not be shared.

This *devices* data type is automatically added as a property on the user, meaning that you can access it with a dynamic expression such as:

```
Current User's devices
```

```
Do a search for:User's devices
```

#### Overriding the built-in privacy rule

The push notification token should be considered sensitive data, and should generally not be shared. If you need to share the taken outside of your Bubble app (such as sending a request to a third-party app or system), you can use a backend workflow and check *Ignore privacy rules when running this workflow* to circumvent the built-in privacy rule.

### Requesting permission to send push notifications

Both iOS and Android require explicit user consent before sending push notifications. This permission is obtained using the *Request push notification permissions* action, which triggers the operating system’s standard notification request prompt. The prompt is system-generated and consistent across all apps, meaning it cannot be customized.

### Sending push notifications

After the user has approved the permission request, you can start sending push notifications. To do this, set up an event in the workflow editor, and locate the *Emails and notifications* action category, and select the *Send push notification* action.

<figure><img src="/files/IUyIe9wsyEB2MttQhCUq" alt="" width="278"><figcaption></figcaption></figure>

{% hint style="warning" %}
Keep in mind that you have to use the [*Request push notification*](#requesting-permission-to-send-push-notifications) *permissions* action first to be able to send push notifications.
{% endhint %}

The *Send push notification* action comes with the following properties:

* **Title:** the main header
* **Subtitle:** the sub-header
* **Body:** the main message
* **Devices:** needs to be populated with the [*device* data type](#the-devices-data-type) from one or more users. If you are sending a push notification to the current user, you can use the dynamic expression described in the [section above](#the-devices-data-type).
* **On tap, navigate to:** sets a view to open when the push notification is tapped. See [below](#configuring-a-tap-destination).

Your app icon will also be displayed in the push notification, and cannot be customized per notification. The properties above are used on both systems (iOS/Android) and the final result looks fairly similar on both device types.

#### Configuring a tap destination <mark style="color:$info;">(optional)</mark> <a href="#configuring-a-tap-destination" id="configuring-a-tap-destination"></a>

By default, tapping a push notification opens the app to its default state. You can optionally configure a tap destination so that the notification routes the user to a specific view when tapped.

To configure a tap destination, open the Send push notification action and look for the *On tap, navigate to* property. This dropdown lists all the views in your app. Selecting a view enables the remaining destination fields. The default value is the root view to match the existing behavior prior to this feature.

**Overlay** (optional)

After selecting a destination view, you can choose a sheet or floating group on that view to present as an overlay after navigation. The dropdown is filtered to overlay-type elements on the selected view. If the view has no sheets or floating groups, this field is disabled.

{% hint style="info" %}
**Note:** selecting an overlay to open will override any conditionals on that overlay container that would otherwise hide it.
{% endhint %}

#### **Navigation type** <mark style="color:$info;">(conditional)</mark>

Appears when the destination is not a tab view. Controls how the view is presented:

* **Stack**: pushed onto the navigation stack (standard drill-down).
* **Modal:** presented modally over the current context.

If the destination is a tab view, this field is hidden and the app switches to that tab directly.

**Base view** (optional, conditional)

Appears when navigation type is Stack or Modal. Defines what the back button navigates to when the user arrives from a push notification (where there is no prior navigation history).

* Lists all views except the destination view. Defaults to the app's root view.
* When set, the app constructs a synthetic stack: \[base view] → \[destination view], so the back button leads to the base view rather than closing the app.
* If left empty, the back button navigates to the root view.

#### **View parameters** <mark style="color:$info;">(conditional)</mark>

If the selected destination or base view has view properties, a parameter section appears with a field for each property. Values can be static or dynamic expressions, consistent with how view properties work elsewhere in the workflow editor.

{% hint style="info" %}
**Note**: Parameter expressions are evaluated when the push notification is sent — the resolved values are included in the notification payload. No expressions are evaluated on the device when the notification is tapped.
{% endhint %}

#### How tap destinations work at runtime

**Cold start&#x20;**<mark style="color:$info;">**(app is closed)**</mark>

The user taps the notification → the app launches → reads the destination from the payload → navigates to the configured view → presents the overlay if set → populates view parameters.

**Warm start&#x20;**<mark style="color:$info;">**(app is in the background)**</mark>

The user taps the notification → the app foregrounds → navigates to the destination → presents the overlay → populates parameters.

* If the user is already on the destination view, parameters are refreshed and the overlay is re-presented if applicable.
* If the user is already on the base view, the destination view is added to the stack with refreshed parameters.

**App is already open**

The destination view and its configured base view are respected regardless of where the user currently is in the app. The deep link navigation stacks on top of the current navigation state.

**Fallback behavior**

* **Invalid route:** If the destination view can't be resolved (for example, if the view was deleted after the notification was sent), the app navigates to the root view. No crash or navigation loop occurs.
* **Logged-out user:** If the user's session has expired, the app navigates to the app's default unauthenticated state. The deep link destination is not preserved through a login flow. In practice this is uncommon since push notifications are only sent to devices with logged-in users.
* **Tab destination:** When the destination is a tab view, the app switches to that tab and marks it as active in the tab bar.

#### **Example: deep linking to a detail view**

A common use case is notifying a user about a new comment and taking them directly to the relevant post.

1. Create a backend workflow triggered when a new comment is created.
2. Add the Send push notification action.
3. Set the notification title and message (e.g., "New comment on your post").
4. In On tap, navigate to, select your post\_detail view.
5. Set Navigation type to Stack.
6. Set Base view to your main feed view — this ensures the back button returns the user to the feed.
7. In View parameters, pass the post's unique ID to the destination view's property.

When the user taps the notification, they land directly on the post detail view. Pressing back takes them to the feed.

#### Deep Linking Limitations

* Payload size: APNs (iOS) and FCM (Android) enforce approximately 4 KB payload limits. If you configure many parameters, the payload may exceed this limit. Keep parameter values concise.
* BubbleGo: Push notifications are not currently supported in BubbleGo, so deep linking from push taps cannot be previewed there.
* No deferred deep linking: If a user receives a notification but has uninstalled the app, the deep link is not preserved through reinstallation.
* No resume after auth: If a session expires and the user needs to log in again, the deep link destination is not preserved. The user lands on the default logged-out state.

### Scheduling push notifications

Sometimes you'll want to send push notifications at a scheduled time. The *Send push notification* action is available in the [backend workflow editor.](#user-content-fn-10)[^10] To schedule a push notification, set up an API workflow and use the [*Schedule API workflow*](#user-content-fn-11)[^11] action.

### General Limitations

* **Web preview:** Push notifications cannot be tested in web preview mode.
* **BubbleGo:** Push notifications cannot be tested in the BubbleGo app.
* **Deployment for testing:** To test push notifications, your app must be deployed and uploaded to App Store Connect and added to TestFlight.

## Create a mobile deep link

The Create a mobile deep link action generates a deep link URL that routes users to a specific view in your native mobile app. The URL can be used in any subsequent workflow step - stored in a database field, included in an email or SMS, copied to the clipboard, or returned to the client.

#### When to use this action

Use this action whenever you need a shareable URL that opens your mobile app to a specific location. Common use cases include:

* Including a link to a specific screen in a transactional email (e.g., a new message or order confirmation)
* Letting users copy a link to the content they're viewing and share it through any channel
* Generating invite or onboarding links that land new users on a specific view
* Storing deep links in the database for later retrieval (e.g., deferred onboarding flows)

### Action fields

The action uses the same navigation parameter model as the push notification tap destination, so the configuration should feel familiar if you've already set up push notification deep linking.

#### Navigate to

The target view the user navigates to when the deep link is opened. Lists all views in your app.

#### Navigation type

Required when destination is not a tab. Controls how the destination view is presented:

* **Stack:** the view is pushed onto the navigation stack. The user can navigate back to the previous view.
* **Modal:** the view is presented as a full-screen modal, appearing on top of the current navigation context. Typically dismissed with a close button or swipe gesture.

#### Overlay (optional)

A sheet or floating group to present on top of the destination view after navigation. If the destination view has no sheets or floating groups, this field is disabled.

#### Base view (conditional)

Appears when the destination view is not a tab. Sets the view that sits underneath the destination in the navigation stack — this determines where the back button takes the user when there is no prior navigation history. If the destination is a tab, the tab's position in the navigation hierarchy already provides this context, so the base view field is not shown.

#### View parameters (optional)

If the selected destination or base view has view properties, a parameter section appears with a field for each property. Values can be static or dynamic expressions, consistent with how view properties work elsewhere in the workflow editor.

{% hint style="info" %}
**Note:** Parameter expressions are evaluated when the action runs — the resolved values are serialized into the URL. The deep link is a snapshot of the data at generation time, not at click time. This matches push notification deep linking behavior.
{% endhint %}

### **Output**

The action returns a single value:

<table data-header-hidden><thead><tr><th></th><th width="194.73046875"></th><th></th></tr></thead><tbody><tr><td>Output</td><td>Type</td><td>Description</td></tr><tr><td>Deep link URL</td><td>Text</td><td>The fully-formed deep link URL</td></tr></tbody></table>

This value is accessible in subsequent workflow steps and expressions as Result of step N → Deep link URL.

#### URL format

The generated URL uses the app scheme configured in your mobile settings:

`[app-scheme]://navigate?view=<view_id>&nav_type=<stack|modal>[&overlay=<overlay_id>][&base_view=<base_view_id>][&prop_<key>=<value>]`

The app scheme is the one already registered for your app in Settings → Native mobile → App scheme. No additional scheme configuration is needed.

#### Where this action is available

The action is available in all workflow contexts:

* **Client-side workflows (web and mobile)**: generate links from button clicks, page loads, or any other client-side event.
* **Backend workflows**: generate links in API workflows, scheduled workflows, or recurring workflows. Since generating a deep link is a pure data operation (producing a text URL), it does not require a mobile device to create, only to open.

### **How deep links work at runtime**

When a user taps a generated deep link:

#### Cold start (app is closed)

The user taps the link → the app launches → reads the destination from the URL → navigates to the configured view → presents the overlay if set → populates view parameters.

#### Warm start (app is in the background)

The user taps the link → the app foregrounds → navigates to the destination → presents the overlay → populates parameters.

* If the user is already on the destination view, parameters are refreshed and the overlay is re-presented if applicable.

#### App is already open

The destination view and its configured base view are respected regardless of where the user currently is in the app. The deep link navigation stacks on top of the current navigation state.

#### **Example: shareable content link**

A common use case is letting a user share a link to a specific piece of content they're viewing.

1. Add a "Share" button to your detail view.
2. In the button's workflow, add the `Create a mobile deep link` action.
3. Set Navigate to to your detail view.
4. Set Navigation type to Stack.
5. Set Base view to your main feed or home view — this ensures the back button returns the recipient to a meaningful screen.
6. In View parameters, pass the content item's unique ID to the destination view's property.
7. In the next workflow step, use the Copy to clipboard action (or Send email, etc.) with the value Result of step N → Deep link URL.

When the recipient taps the link, they land directly on the content detail view with the correct item loaded. Pressing back takes them to the feed.

#### **Example: deep link in a backend email workflow**

1. Create a backend workflow triggered when a new order is placed.
2. Add the `Create a mobile deep link action`.
3. Set Navigate to to your order\_detail view.
4. In View parameters, pass the order's unique ID.
5. Add a Send email action. In the email body, include the deep link URL using Result of step N → Deep link URL.

When the user taps the link in their email, they land directly on the order detail screen in the app.

### **Limitations**

* **Custom scheme URLs only**. The generated URL uses a custom app scheme (e.g., myapp\://). Custom scheme URLs may be blocked or stripped by some email clients (Gmail, Outlook) and may not render as tappable links on some social media platforms. HTTPS-based deep links (Universal Links on iOS, App Links on Android) are planned for a future release.
* **No web fallback**. If the recipient does not have the app installed, or opens the link on desktop, the link will fail silently. There is no mechanism in v1 to specify a fallback URL.
* **No deferred deep linking**. The link does not preserve navigation intent across an app install. If a user taps the link before installing the app, the destination is not preserved through the install process.
* **No authentication tokens**. The generated URL does not include access tokens or credentials. It cannot be used for magic link login or guest access flows without additional integration with your app's auth layer.
* **View parameters are static**. Because parameters are resolved at generation time, any values that depend on client-side state that hasn't fully loaded (e.g., an asynchronously loaded group) may produce empty or stale values in the URL. This is consistent with push notification deep linking behavior.

## Location services

Native mobile apps has two actions related to location services. Click the links below to read more about each action:

* [Get current location](/help-guides/logic/device-resources/location-services#workflows)
* [Request location permissions](/help-guides/logic/device-resources/location-services#workflows)

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [Understanding workflow execution rules](https://youtu.be/IbhCrciOKHM)

</details>

[^1]: An event is the trigger that initiates the running of one or more actions in a workflow, such as a button being clicked.\
    \
    Article: [Events](/help-guides/logic/workflows/events)

[^2]: *Make changes to a thing* saves changes to a specific database record.

    Reference: [Make changes to a thing](https://manual.bubble.io/help-guides/logic/workflows/pages/-MTujs88N9W-2FUmQGag#make-changes-to-thing...)\
    Article series: [The database](/help-guides/data/the-database)

[^3]: A data source is any place from which Bubble can retrieve data, such as the database, the current user or an external API.\
    \
    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^4]: *Fields* are the areas on a data type where information is stored. You can create as many fields as you need on a data type, and you set a *type* for that field, such as text, number or image.

    Article: [Data types and fields](/help-guides/data/the-database/data-types-and-fields)

[^5]: *Data types* are like containers that hold specific types of information and each data type is made up of fields where that information is stored. *User* is a built-in data type, but you could add custom types like *products*, *blog posts* or *sports teams* as needed.

    Article: [Data types and fields](/help-guides/data/the-database/data-types-and-fields)

[^6]: Dynamic expressions are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.

[^7]: *Make changes to a thing* is an action that saves changes to a specific database thing, such as saving the name of a User, the text in a Blog post or the image of a Product.

    Article: [Creating, saving and deleting data](/help-guides/data/the-database/creating-saving-and-deleting-data)

    Reference: [Make changes to a thing](https://manual.bubble.io/help-guides/logic/workflows/pages/-MTujs88N9W-2FUmQGag#make-changes-to-thing...)

[^8]: *Set state of an element* is used to set the value of a custom state on an element. Custom states are like variables, where you can save information temporarily until it is updated/page is refreshed.

    Article: [Custom states](/help-guides/data/temporary-data/custom-states)

    Reference: [Set state of an element](/core-resources/actions/element#set-state-of-an-element)

[^9]: *Privacy rules* are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.

    Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^10]: Backend workflows are workflows that run on the Bubble server, not requiring user interaction or an open page.

    Article series: [Backend workflows](/help-guides/workload/optimizing-workload/optimization-checklist/backend-workflows)

[^11]: The *Schedule API workflow* action lets you trigger an API workflow at a specified time in the future (or the current time).

    Reference: [Schedule API workflow](/core-resources/actions/custom#schedule-api-workflow)
