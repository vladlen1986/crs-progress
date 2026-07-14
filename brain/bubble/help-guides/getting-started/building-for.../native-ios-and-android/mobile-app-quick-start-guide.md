# Mobile app quick start guide
> Source: https://manual.bubble.io/help-guides/getting-started/building-for.../native-ios-and-android/mobile-app-quick-start-guide · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Building a native mobile app with Bubble opens the door to new ways of designing, structuring, and delivering experiences — all while using the same powerful visual development tools you're already familiar with. This guide walks you through each step of the journey, from setting up your app’s interface to launching it on the App Store and Google Play.

## Getting started quickly

### 1 – Your frontend: Mobile building blocks

**If you’ve already built a web app in Bubble**, building for mobile will have some similarities and differences Your backend setup—things like your database, workflows, conditions, and logic—can stay exactly the same. But to take advantage of what makes native mobile apps unique, you will have to adapt the the frontend. Mobile apps follow different design patterns and user expectations, so the interface will need to be reimagined using mobile-specific building blocks like mobile views, mobile elements, and native navigation. The layout is more constrained, the interaction patterns are different, and performance expectations are higher—especially on smaller screens and devices.

**If you're starting fresh with mobile**, you'll learn how to build native mobile apps without any code. We recommend starting with our [Getting Started with Mobile series on YouTube](https://www.youtube.com/@BubbleIO/videos) to get a clear overview from Matt Neary, but you can also use this Quick Start guide to learn more.

#### Mobile views:

Instead of web “pages,” mobile apps have “views.” In your **app interface manager**, add and manage views like:

* [Tab views](/help-guides/design/elements/ios-and-android-app/the-view#tab) for primary navigation
* [Stack views](/help-guides/logic/workflows/actions#stack) for a smooth "back" button experience
* [Modal views](/help-guides/logic/workflows/actions#modal) for focused tasks like forms or settings

#### Mobile elements:

Swap out common web elements with native mobile elements:

* [Sheets](/help-guides/design/elements/ios-and-android-app/containers#sheets) instead of popups
* [Short lists](/help-guides/design/elements/ios-and-android-app/containers#short-list) and selectable lists instead of repeating groups

Need inspiration? Check out platforms like [Mobbin](https://www.mobbin.com/) to see how leading mobile apps structure\
their layouts.

### 2 - Adding native mobile features

A key difference between web and native mobile apps is that native apps can interact directly with the device they’re installed on. This gives you access to features like the camera, photo library, location services, and push notifications.

With Bubble, you're not limited to wrapping a web app. You can build a true native experience that takes full advantage of mobile capabilities and feels integrated, responsive, and intuitive to users.

#### Dropdowns:

* [**Bottom sheets**](/help-guides/design/elements/ios-and-android-app/containers#sheets) – These are mobile-native elements that slide up from the bottom of the screen and feel familiar to mobile users. To use one, add the **Sheet** element from the visual elements panel. Sheets can contain other elements just like a regular group.
* [**Modals with selectable lists**](/help-guides/design/elements/ios-and-android-app/input-forms#selectable-lists) – For cases where users need to pick from a list (like choosing a category or filter), you can add a **Sheet** or **Modal** element, then place a **Selectable List** inside it. This creates a mobile-friendly alternative to dropdowns that’s easier to use on smaller screens.

Both approaches give you more control over the design and behavior of the selection experience—especially helpful on mobile where space and interaction patterns are different from the web.

#### Swipe actions:

[Swipe actions](/help-guides/design/elements/ios-and-android-app/containers#list-item-swipe-actions) let users swipe left or right on list items to trigger actions like deleting or archiving — a familiar mobile interaction pattern.

Swipe actions are available for **Vertical** and **Section Lists**, and each list item can include up to **three swipe actions** on each side:

* **Leading** (left) actions
* **Trailing** (right) actions

To add swipe actions:

1. Add a Vertical or Section List to your view.
2. Select the **List Item** template.\
   On the canvas, hover over the list item and click the **leading** or **trailing** swipe area to edit it.
3. Drag visual elements (icons, labels, etc.) into the swipe frame to represent the action.
4. In the workflow editor, use the **When swipe action is tapped** event to define the behavior (e.g., delete a task or mark it complete).
5. Optionally, you can enable **full swipe to trigger** — letting the user trigger the action by swiping all the way across.

Swipe actions come with built-in animation and default behavior, making them quick to set up and easy to use. Layout controls are intentionally limited to ensure consistency and avoid clutter.

#### Device capabilities:

Native mobile apps can access on-device features like the camera, photo library, location services, and push notifications, helping you create more interactive, native-feeling experiences.

* [**Camera an photo library**](/help-guides/logic/device-resources/camera-photo-library): Use the *Take photo* and *Pick photo* actions in workflows to let users capture or upload images. Permission prompts are triggered automatically and can be customized in the *Language* settings.
* [**Location services**:](/help-guides/logic/device-resources/location-services) Use the *Get current location* action or *Current geographic position* data source to access the device's location. You can also check permission status using *Has granted location permission*.
* [**Push notifications**:](/help-guides/logic/workflows/actions#push-notifications) To send push notifications, you must first request permission using the Request push notification permission action. Then, use Send push notification to deliver messages to the user's device.You can also configure a **tap destination** on the Send push notification action to route users to a specific view — with optional parameters, overlays, and navigation context — when they tap the notification. Read more in [this article](/help-guides/logic/workflows/actions#sending-push-notifications).
* [**Deep links:**](/help-guides/logic/workflows/actions) Use the Create a mobile deep link workflow action to generate a shareable URL that opens your app to a specific view. The URL can be included in emails, SMS messages, clipboard actions, or stored in the database. Deep links use the same navigation model as push notification tap destinations — you configure a destination view, navigation type (stack or modal), overlay, base view, and view parameters.

#### Embedding web views:

You can embed web pages inside mobile views using the [**WebView** element](/help-guides/design/elements/ios-and-android-app/visual-native-app-elements#webview). This is useful if you’ve already built parts of your app for the web and want to reuse them without recreating everything from scratch. Simply add a WebView element to your mobile view and point it to the relevant page in your app.

Keep in mind:

* WebViews can only display pages from your own Bubble app — external URLs are not supported.
* Users can’t navigate to other pages inside the WebView, so make sure all needed content is on the same page.
* Native features like location, camera, or push notifications will not work inside a WebView. Use native mobile components if you need access to those.

### 3 – Adding mobile logic: Workflows

Once your mobile layout is ready, it's time to bring it to life with workflows[^1].

#### Frontend workflows:

Instant interactions that run on the user's device, such as:

* Tapping a button
* [Swiping](/help-guides/design/elements/ios-and-android-app/containers#list-item-swipe-actions) on a list item
* Requesting permissions[^2] (e.g., camera or location)

#### Backend workflows:

Behind-the-scenes processes shared between web and mobile, including:

* [Saving form submissions](#user-content-fn-3)[^3]
* [Triggering database updates](#user-content-fn-4)[^4]
* Integrating with a [third-party API](#user-content-fn-5)[^5]

### 4 - Testing your app

Testing is crucial to ensure your app performs smoothly across devices and scenarios.

#### [Web preview](/help-guides/previewing-your-app/previewing-a-mobile-app#web-preview):

Great for checking basic layouts and workflows, but it won't simulate mobile-only features like push notifications.

#### [BubbleGo (iOS and Android)](/help-guides/previewing-your-app/previewing-a-mobile-app#bubblego):

Download BubbleGo to preview your app on real devices — including full mobile functionality\
like camera access and swipe actions.

When you're ready to test with broader audiences, use Apple TestFlight or Google's internal\
testing tools. Make sure your Apple Developer and Google Play Console accounts are set up\
early — approvals can take time.

### 5 - Publishing to app stores

{% hint style="info" %}
Publishing to the app store involves several steps that take place outside of the Bubble platform, and the process can be a bit complex. To make things easier, we’ve created a detailed guide that walks you through each part of the process.

Article series: [Publishing your native mobile app](/help-guides/publishing-your-app/native-mobile-app)
{% endhint %}

Once you've tested thoroughly, it's time to share your app with the world!

#### Prepare your global mobile settings:

Fill out required settings like app names, icons, app schemes, and platform-specific metadata.

#### Follow our publishing guides:

* [Publish to the App Store (iOS)](/help-guides/publishing-your-app/native-mobile-app/ios-app-store)
* [Publish to the Play Store (Android)](/help-guides/publishing-your-app/native-mobile-app/google-play-store)

#### Plan for platform requirements:

Each store has its own guidelines and review processes, so make sure you meet their\
standards before submission.

When your app is live, celebrate by sharing it with the [Bubble community](https://forum.bubble.io/)!

### 6 - Updating your app after launch

#### [OTA (Over-the-Air) Updates](/help-guides/publishing-your-app/native-mobile-app#how-ota-over-the-air-updates-work):

Push minor changes - like text edits or design tweaks — without needing App Store or Play\
Store re-approval.

#### [New builds:](/help-guides/publishing-your-app/native-mobile-app#what-is-a-live-version)

Major updates, like adding new features, require a new build submission and app store approval.

Quick tip: Bubble supports multiple live versions, allowing you to update new users while\
letting existing users continue using previous versions if needed.

### 7 - Getting discovered: App Store Optimization (ASO)

After publishing, your next goal is to help users find your app.

#### Keywords:

65% of downloads come from search. Use strong keywords in your app's title and description.

#### Visuals:

Your app icon and screenshots are often your first impression — make them count.

#### Metadata and descriptions:

Highlight your app's biggest benefits right away and back them up with real numbers or examples when possible.

Building and launching a native mobile app with Bubble puts you in control of the entire process — from idea to live product — all within a single visual development platform. By following the steps in this guide, you'll not only create a mobile app that looks and feels polished, but also one that scales alongside your ambitions.

You’re building something incredible. Let’s bring it to life 🚀

[^1]: *Workflows* are the combination of an event (trigger) and one or more actions. This is how your app reacts to user interaction.

    Article series: [Workflows](/help-guides/logic/workflows)

[^2]: On-device resources like using the camera or current location will often require a permission given by the user.

    Article section: [Requesting permission to send push notifications](/help-guides/logic/workflows/actions#requesting-permission-to-send-push-notifications)

[^3]: Saving data to the database is done by creating new things, or by making changes to an existing thing.

    Reference: [Database actions](/core-resources/actions/data-things)

[^4]: *Database trigger events* let you trigger a workflow whenever a specific change happens in the database.\
    \
    Article: [Database trigger events](/help-guides/logic/workflows/events/backend-events/database-trigger-events)

[^5]: You can connect to third-party apps and systems with outbound or incoming connections.

    Articles series: [Integrations](/help-guides/integrations)
