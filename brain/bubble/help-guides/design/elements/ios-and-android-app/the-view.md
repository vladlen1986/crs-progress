# The view
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/the-view · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Views and navigation are the foundation of native mobile app design. Views contain the information, while navigation is all about getting users to the views they want to go to - with as little friction as possible.

## What we'll cover

* [**Views**](#views)**:** What views are
* [**Navigation**](#navigation)**:** Different ways of displaying and navigating between views
* [**Appearance**](#appearance)**:** Tweaking how views look
* [**View types:**](#view-types) covering the different types of views

## Views

{% hint style="warning" %}
**Note on branches:** We recommend avoiding adding a mobile app directly to the Main branch unless you plan to work in a sub-branch created *after* the mobile app has been added to Main.

Adding a mobile app to both Main and an existing branch may lead to conflicts. As long as you create a branch after adding the mobile app to Main or add the mobile app in a branch and *then* merge it with Main, the setup should work as expected.
{% endhint %}

Mobile apps use *views* instead of *pages*. While views and pages both serve as the “base layer” where you design and add content, they differ in functionality within the app. In a mobile app, you don’t link between separate pages with unique URLs; instead, you navigate between views based on the chosen navigation paradigm (more on this below).

First, you can manage your project’s mobile views through the pages dropdown at the top of the editor. From here, you can create new views, navigate to existing ones for editing, or delete views no longer needed. This dropdown also lets you seamlessly switch between web app pages and mobile app views, allowing you to work on both within the same editor.

<figure><img src="/files/hOh7PW1RmZ6xJgIR7vZO" alt=""><figcaption><p>In the editor, views behave much like pages, and are found using the page search bar.</p></figcaption></figure>

Typically, each view represents a distinct “screen” you want to display to the user. For example, in Spotify, the app has three bottom tabs—*Home, Search,* and *Your Library*. Tapping each tab brings you to its corresponding view. If you’re in the Home tab and tap a playlist, a new view (not a tab) opens, displaying the playlist’s songs. A back arrow at the top lets you return to the previous view, which is an example of “stack navigation” (explained further below).

In stack navigation, views are layered on top of the root view, like stacking cards. Each view you open adds a layer to the stack, and the back button allows you to step back down the stack, one layer at a time. As you navigate, notice that the Home tab remains active. If you switch to the Your Library tab and open a playlist, you’ll see the same Playlist view, but this time within the Your Library tab’s stack. Tapping the back button will return you to the root view of that tab.

<figure><img src="/files/xMBm2J84J2Ky14tOhTlS" alt=""><figcaption></figcaption></figure>

### View properties

You can assign one or more properties on a view to hold data. The property can hold a default value, or be left empty.

* **Dynamic value**: any basic data type or custom data type
* **Color picker:** a hex color code or a saved color variable.
* **Checkbox:** a yes/no value to or from the reusable.

To define a property on a view, use the property inspector:

<figure><img src="/files/HpIhQT9OP2watO9RGGG7" alt="" width="563"><figcaption></figcaption></figure>

You can use the [*Set current view's property*](#set-current-views-property-action) action to assign a value to the property of the currently open view.

## Navigation

Navigating between views differs from navigating between pages on the web. Views are more integrated with your app, and both the method and settings used to transition between them can influence how the view behaves within the app’s navigation flow.

Navigating to a new view can be done in two different ways in Bubble:

* **Tab**: Tabs are an integrated part of your app that let users switch between views via a navigation panel at the bottom of the screen, much like in the Spotify example mentioned earlier. Tab navigation doesn’t require an action to trigger the switch; it responds automatically to user taps.
* **Go to view action:** The go to view action is similar to *Go to page* in the Bubble web app editor, except that views do not technically load any URL or refresh the page. Instead it opens the new view either as a stack or a modal.

### Tab

Tab navigation allows users to navigate to different views by tapping on tab items on a tab bar at the bottom of your screen, where the tab item has some sort of active state so a user knows what tab they are on.

<figure><img src="/files/DA83JMCUYIgqiO2yvLgE" alt="" width="563"><figcaption><p>The bottom tab is an integral part of your app's navigation and is widely used across various iOS and Android apps.</p></figcaption></figure>

Bubble makes this easy by including a tab bar with built-in navigation out of the box. Tab items are connected to views, so there is no need to set up any navigation workflows to go between tabs. There are a few ways to add the tab bar to a view.

#### Designating a screen as a Tab Item

You can designate a view as a tab item by checking the *Include as tab item* setting on the view itself. This will automatically add a tab bar to your view, if there isn’t one already, and a new tab item that references the current view.

<figure><img src="/files/K2WB3GakiFkbfaRPhXMo" alt=""><figcaption><p>You can specify whether a view should be included in the tab navigation within the property editor of that view.</p></figcaption></figure>

You can further customize things like the label, the icon, active state behavior, etc. through the tab item property editor. You can always change the view a tab item references as well.

#### Adding a new tab item

You can create a new tab item from the Tab Bar property editor and either link it to an existing view you have already created or create a new view right there. As before, you can further customize the tab item through the tab item property editor.

{% hint style="warning" %}
A tab item can only reference a single, unique view, meaning a view cannot be linked to multiple tab items.
{% endhint %}

#### Conditionally hiding tab items

In some cases, you may want to show or hide tab items based on specific criteria. For example, a logged-in user may have access to features unavailable to non-logged-in users. To hide a tab item conditionally, follow these steps:

* **Select the tab item:** Select the tab item in the tab bar to open up the element inspector
* **Set up a conditional expression:** Set up a condition and specify a condition, such as `Current user is not logged in`.
* **Set the property:** in the property dropdown down, pick *This element is visible*, and make sure the box is unchecked

#### Showing the tab bar

The tab bar can also be added to a view that isn’t a tab item itself. This helps users stay aware of which tab "stack" they are in, even when navigating to a different view.

#### Tab bar customization

The appearance and layout of the tab bar itself can be customized using the tab bar PE. Since the tab bar is a global component, you can make changes to the tab bar on any view, and those changes will be visible across your app on any view that has the tab bar on it.

#### Tab Item customization

The appearance and layout of a tab item can be customized using the tab item property editor. Keep in mind, any changes to a tab item will be reflected globally in your app.

* Label: This will default to the name of the view. Optional value for text below the icon
* Target View: The view that the user should be directed to if they tap the tab item
* Icon: Required field. Icon that should be displayed for the tab item
* Icon Size: Size of the icon in pixels
* Icon color: Color of the icon
* Label color: Color of the label can be set using the Font appearance controls
* Use conditionals to set up the active and inactive states for the tab items, such as active icon, active color, etc.

{% hint style="info" %}
**Navigation actions:** there are also multiple actions that can be used for navigation. You'll find these in the article section below:

Article section: [Navigation actions](broken://pages/jg1qqijVsbdR5KRpl08W#navigation)
{% endhint %}

## Appearance

**Show top app bar**

Toggles an app bar on the top of your view.

**Safe area**

Toggles a safe area on your view. Turning the safe area on adds device-specific padding to the view so that the content of your page does not get cut off by features of your device, such as a notch at the top of the screen or rounded corners. You can choose to turn off the safe area on a view if you want a more immersive experience, such as a map or image taking up the entire top of a screen like Google Maps or Tik Tok.

{% hint style="info" %}
The top safe area will remain visible on the canvas if a top app bar is added to the view, and the bottom safe area will be visible if a tab bar is present. However, even with the safe area setting toggled off, it will still impact content near the side safe areas, even though those areas don’t appear on the canvas.
{% endhint %}

**Show status bar**

Toggles the status bar on your view. The status bar represents high level device information like time, battery percentage, and wifi reception. You can choose to turn off this status bar for a more immersive experience - however, keep in mind that this contains important information your users may want to see while they are using your app.

**Show tab bar**

Toggles a tab bar on the bottom of your view. More details on the Tab Bar below. Note this option is checked and disabled when Include as Tab item is checked since the tab bar must be present when the view is a tab item. Like the Spotify example, there are also instances where you would want the tab bar to appear on the screen even if the current view is not a tab item.

{% hint style="info" %}
The tab bar is a global component in your app, meaning there is only one tab bar, but it can appear across different views, similar to how reusable elements function in web apps today.
{% endhint %}

**Include as Tab item**

Checking this creates a new tab in your tab bar that is linked to the current view. The label will by default be the name of your view, and the default icon will be a star. You can change these settings by selecting the tab item on the canvas.

## **View types**

There are 4 different view types that determine your view’s overall behavior.

{% hint style="info" %}
If you have content on your view and switch to or from a List view, the existing content will be temporarily removed. If you switch back to the original view type, your elements will reappear.
{% endhint %}

* **Scrollable:** This is the most common type of view and allows the user to scroll through the screen to see all of the content on the view.
* **Non-scrollable:** A non-scrollable view, true to its name, will not scroll i.e. content cannot extend past the size of the device screen. Non-scrolling views are good for things like a splash screen, a full screen image/video or map.
* **Vertical list:** The vertical list view is also very common and is to be used when you want to display a list of information. See more information in the [Components and gestures](broken://pages/5ZBWzMkEvQ7ienOWRQkd#vertical-list) article.
* **Section list:** A section list is like a vertical list, but it allows you to group your list items by a property of that list item. A good example of this is your contacts app where your contacts are grouped by the first letter of their first or last name.

## Signing up and logging in users

Signing up and logging in users works in the same way across native apps and web apps within the same app project. In other words, you can use the same actions to sign up or log in a user regardless of whether they are accessing your app through the web or through an app installed on their device.

### Using the *Sign the user up* and *Log the user in* actions

Using the two actions above will work in exactly the same way as in your web app. You can read more about how user authentication works in our dedicated article in the Data section:

Article series: [User accounts](/help-guides/data/user-accounts)

### Using the *Signup/login with a web browser* action

This action, unique to native apps, allows you to use a page from your web app to sign up a new user or log in an existing one. This allows you to use an existing page for the signup/login workflows, as opposed to building one version for your web app and one for your native app. It supports email/password login, OAuth login, and 2FA.

<figure><img src="/files/VZgnFIfKnjwcQN2tZUZO" alt=""><figcaption></figcaption></figure>
