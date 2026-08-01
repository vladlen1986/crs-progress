# Popups
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/popups · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

This section covers the container type Popup, which is a group that hovers above all other elements on the screen

{% embed url="<https://www.youtube.com/watch?v=YXxYeHlowWk>" %}

A popup is a container that appears above the rest of the page and is centered on the screen, regardless of how far the user has scrolled. Popups can dim or blur the content behind them, which makes them well suited to grabbing the user's attention with a message, form, or focused action.

Common uses include:

* Error messages and alerts
* Registration and login forms
* Contact and feedback forms
* Newsletter signup prompts
* Promotional offers and discounts
* Confirmation dialogs before destructive actions

<figure><img src="/files/YMuEnoQ1xIWxJ6IxTNlW" alt=""><figcaption><p>Popups can be used to bring attention to your users immediately.</p></figcaption></figure>

## How popups behave

Popups sit in a special layer above the rest of the page. They're always centered horizontally and stay in place as the user scrolls, giving them a consistent, focused appearance regardless of the page's state.

By default, popups dim the page behind them, drawing attention to the popup itself. You can adjust this behavior through the popup's properties, including changing the color of the overlay, adjusting its opacity, or applying a blur effect. Users can typically dismiss a popup by clicking outside of it, though this behavior can be turned off if the popup requires an explicit action to close.

Because popups are their own container, they can hold any elements you'd place in a regular group, including forms, images, buttons, and even other containers.

## Loading data into a popup

Popups can hold a [data source](#user-content-fn-1)[^1], just like a regular group. This makes it easy to open a popup with a specific piece of data loaded, such as an "edit user" popup that receives the user being edited.

There are two common patterns:

### Set the data source directly

&#x20;The popup loads its data as soon as it's shown, based on an expression[^2] like `Current User`.

<figure><img src="/files/WM1YCAGHm7qoX5cexgup" alt="Loading data into a popup by settings its data source."><figcaption><p>Setting the data source on a popup makes it load its data as soon as the popup is shown.</p></figcaption></figure>

### Push data with a workflow

Push data with a workflo&#x77;**.** Use the [*Display data in a group or popup*](/core-resources/bubble-workflows/bubble-actions/element-actions#display-data-in-a-group-popup) action to load a specific item into the popup at the moment it opens. This is the more flexible pattern, since it lets the popup receive different data based on which button was clicked.

Once the data is loaded, child elements inside the popup can reference it with expressions like `Parent group's User's name`.

<figure><img src="/files/WqJrZWwwFZHg4yKPH3dx" alt=""><figcaption><p>Using an action you can load a specific item into the popup when it opens.</p></figcaption></figure>

## Resetting data in a popup

To clear the data in a popup, you can use the [*Reset a group/popup*](/core-resources/bubble-workflows/bubble-actions/element-actions#reset-a-group-popup) action. Note that this resets the data back to its original [data source](#set-the-data-source-directly). If the data source is empty, it will reset to an empty value. If the data source is not empty, it will reset to the original item.

{% hint style="info" %}
The popup automatically fades when hidden, and the animation takes 500 ms. If you reset the data and then hide the popup, you may see the content change during the fade-out. To avoid this, [schedule a custom event](/core-resources/bubble-workflows/bubble-actions/custom-actions#schedule-a-custom-event) with a 500 ms delay that [*resets the popup's content*](/core-resources/bubble-workflows/bubble-actions/element-actions#reset-a-group-popup), so the reset happens after the animation completes.
{% endhint %}

## Showing and hiding popups

Popups are never visible on page load and can't be shown using conditions. Instead, they're controlled by workflow actions:

* [**Show an element**](/core-resources/bubble-workflows/bubble-actions/element-actions#show-an-element) displays the popup with a subtle fade-in animation.
* [**Hide an element**](/core-resources/bubble-workflows/bubble-actions/element-actions#hide-an-element) closes the popup with a matching fade-out.
* [**Animate an element**](/core-resources/bubble-workflows/bubble-actions/element-actions#animate-an-element) displays or hides the popup with a specific animation, such as sliding in from the side or scaling up from the center.

For popups that need to open with specific data, use *Display data in a group* just before *Show an element* in the same workflow, so the data is ready before the popup appears.

## Popup events

Adding a popup to a page gives you two extra events you can use to trigger workflows:

* [**A popup is opened**](/core-resources/events/element-events#a-popup-is-opened) runs each time the popup is shown, whether through *Show an element* or *Animate an element*.
* [**A popup is closed**](/core-resources/events/element-events#a-popup-is-closed) runs each time the popup is hidden[^3].

Both events trigger every time the popup opens or closes, not just the first time. This makes them useful for setting up or cleaning up state around the popup.

Common uses include:

* Resetting input fields after the popup closes, so they're empty the next time it opens.
* Preloading data when the popup opens.
* Logging analytics events tied to popup interactions.

## Using multiple popups

You can have as many popups on a page as you need. Only one is typically visible at a time, though. Showing a second popup while the first is open can lead to confusing overlaps, so it's usually better to close the first popup before opening the next one.

## Styling popups

Popups can be styled like any other container. The overlay behind the popup can also be customized, giving you control over how much of the page is visible when the popup is open.

Using shared styles or style variables keeps popups consistent with the rest of your app's design.

**Article series**: [Styles](/help-guides/design/variables-and-styles/styles)

## Popups and security

Popups are a visual layer, not a security boundary. The elements behind a popup are still fully present in the page's client-side code, and a curious user can inspect the page to see them. Dimming or blurring the background is a UI effect only.

Never rely on a popup to hide sensitive information. Use [privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules) in the database and server-side conditions to control what data actually reaches the client.

### Using popups as login/signup screens

A common pattern is to use a popup as a login/signup screen that appears if the current user is logged out. This approach should be used with care:

* Make sure all database data is protected by [privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
* Assume that the user can hide the popup and see what's underneath, even if you use a background color and/or blur.
* Assume that if the user logs out, data they had access to before logging out is still loaded and visible
* All sensitive events and actions should be protected with [server-side conditions](/help-guides/security/page-security#conditions)

Generally, we recommend using dedicated pages for login and signup, and redirecting logged-out users to those pages. That said, always assume a user can reach any page, regardless of your setup. This is why privacy rules and server-side conditions matter no matter which method you choose.

## FAQ: Popups

<details>

<summary>Can popups be shown on page load?</summary>

Yes. Trigger the Show an element action from a [*Page is loaded*](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/general-event-properties#page-is-loaded) event, or use conditions inside a workflow to decide whether the popup should open based on the state of the page or the user.

</details>

<details>

<summary>Can popups be closed by clicking outside of them?</summary>

Yes. This is the default behavior, but it can be disabled in the popup's properties for popups that require an explicit action to close. Note that this is a UI setting only, not a security measure.

</details>

<details>

<summary>Can I have multiple popups open at the same time?</summary>

Technically yes, but it can lead to confusing layouts as the popups overlap. It's typically better to close one popup before opening the next.

</details>

<details>

<summary>How do I pass data to a popup when I open it?</summary>

Use the [Display data in a group/popup](/core-resources/bubble-workflows/bubble-actions/element-actions#display-data-in-a-group-popup) action just before [Show an element](/core-resources/bubble-workflows/bubble-actions/element-actions#show-an-element) in the same workflow. This loads the data into the popup before it appears, so the elements inside can reference it right away.

</details>

<details>

<summary>How do I reset a popup's inputs when it closes?</summary>

Use the [A popup is closed](/core-resources/events/element-events#a-popup-is-closed) event to run [Reset relevant inputs](/core-resources/bubble-workflows/bubble-actions/element-actions#reset-relevant-inputs) or [Reset a group/popup](/core-resources/bubble-workflows/bubble-actions/element-actions#reset-a-group-popup), which clears the input values used inside the popup. This way, the popup opens fresh the next time it's shown.

</details>

<details>

<summary>Can I nest containers inside a popup?</summary>

Yes. Popups can hold any elements, including regular groups and other containers.

</details>

<details>

<summary>Can I make the background transparent or remove the overlay?</summary>

Yes. The overlay behind the popup can be styled or made fully transparent, letting you show a floating popup without dimming the page behind it.

</details>

<details>

<summary>Can I open different popups from the same button?</summary>

Yes. Use conditions on the workflow to decide which popup to show based on the current context, or run multiple show actions with their own conditions.

</details>

<details>

<summary>Are popups available in native mobile apps?</summary>

No. Popups are web-only. For native mobile apps, use [sheets](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/sheet-element-mobile) instead.

</details>

<details>

<summary>Can I animate the popup as it opens and closes?</summary>

Yes. Use the Animate an element action to apply a specific animation, such as sliding, scaling, or fading, when the popup appears or disappears.

Note that popups fade in and out over 500 ms by default.

</details>

<details>

<summary>Can I show an element using conditions, or on page load?</summary>

Popups don't have a visibility property like many other groups have. They need to be displayed with an action. To show a popup as soon as the page loads, you can use the [*Page is loaded*](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/general-event-properties#page-is-loaded) event.

</details>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> Popup properties</summary>

In the core reference section, you'll find all the properties associated with popups.

**Core reference**: [Popups](/core-resources/elements/containers#popup)

</details>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the popup element](https://www.youtube.com/watch?v=YXxYeHlowWk)
* [How to trigger workflows from popup events](https://www.youtube.com/watch?v=AhiJv3jYZEg)

</details>

[^1]: A **data source** is any source your app pulls data from, such as a database search, a specific record, an option set, or an external API.

    **Core reference:** [Data sources](/core-resources/data/data-sources)

[^2]: **Dynamic expressions** are how you reference and manipulate data in Bubble. They let you pull values from data sources, apply operators, and combine data in different ways to produce a final result, such as `Current User's name` or `Do a search for Posts:count`.

    **Article:** [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^3]: **Note:** this event triggers as soon as the popup's hide animation starts. The animation has a duration of 500 ms.
