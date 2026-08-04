# Floating group element (mobile)
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/containers/floating-group-element-mobile · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

A floating group is a container that hovers above the rest of the view. It can be attached to any side of the screen and stays in place regardless of how far the user scrolls. Because they're independent of the view's normal flow, floating groups are the go-to element for UI that needs to stay visible at all times.

{% hint style="warning" %}
Mobile apps already include the **native app bar and tab bar**, designed for familiar navigation patterns on mobile devices. We recommend using floating groups only when those built-in components don't meet the needs of your design. See more [below](#floating-groups-vs.-app-bars-and-tab-bars).
{% endhint %}

## Common uses of floating groups

Floating groups are used for anything that needs to remain accessible as the user moves through a view:

* Persistent action buttons that follow the user as they scroll, like a compose or add button.
* Sidebars that provide contextual navigation or information.
* Custom headers when the standard app bar doesn't fit the design.
* Cart summaries or status bars that stay visible during a task.
* Back-to-top buttons that appear once the user has scrolled down.
* Custom notifications and banners that appear briefly and dismiss themselves.<br>

## How floating groups behave

{% hint style="info" %}
Floating groups will position themselves just below the top app bar when aligned to the top or just above the tab bar when aligned to the bottom, if either of these elements are present on the view.
{% endhint %}

Floating groups sit in their own layer above the rest of the view. Because of this, they don't affect the layout of the surrounding content. Regular elements don't push around floating groups or make room for them, and floating groups don't take up space in the normal flow.

This is what allows a floating header to stay pinned to the top of the screen while the user scrolls, or an action button to stay fixed to the bottom-right regardless of the view's content.

Floating groups can hold any elements a regular group can, including forms, images, buttons, icons, and other containers.

### Floating groups vs. app bars and tab bars

Native mobile apps include built-in components for the most common persistent UI:

* **App bar** for a header at the top of the view. This may also include a back button.
* **Tab bar** for navigation at the bottom of the view.

For these use cases, prefer the built-in components.

<figure><img src="/files/8Jft2BNrulq2RERL1EDq" alt=""><figcaption><p>Native mobile apps include built-in components for the most common persistant UI. They are enable by selecting the view and adjusting the <em>Navigation</em> properties.</p></figcaption></figure>

They handle safe areas, animations, and platform conventions automatically. Floating groups are best used for custom UI that doesn't fit those standard patterns, or when the built-in components don't give you the flexibility your design needs.

## Attaching to the screen

Every floating group is attached to the screen along a horizontal and vertical axis. Together, these two settings determine where the group appears and how it stays positioned as the user scrolls.

<figure><img src="/files/VERMCKsVeKBwcyOhbpd8" alt="Attaching a floating group on mobile to the top and left edge of the screen."><figcaption><p>In this example, the group floats relative to the top and left edge.</p></figcaption></figure>

The horizontal axis controls whether the group sticks to the left, right, or spans both sides. The vertical axis controls whether it sticks to the top, bottom, or spans both. A group that spans both edges stretches to fill the screen along that axis.

Margins let you offset the group from the edge it's attached to. For example, a floating action button might be attached to the bottom-right of the screen with a 20-pixel margin so it sits comfortably away from the edge.

## Working with safe areas

Native mobile apps include safe areas: the parts of the screen not covered by hardware features like notches, home indicators, or rounded corners. Floating groups can extend into these areas or respect their boundaries.

<figure><img src="/files/MjaPSh085Sk1nC4qNKXd" alt=""><figcaption></figcaption></figure>

Use the *Safe area behavior* property to set whether the floating group ignores the safe area, applies it to the container itself, or applies it only to the group's child elements.

## Working with the on-device keyboard

Native mobile keyboards can take up a significant portion of the screen, and floating groups pinned to the bottom of the view often end up hidden behind them. The *Move with keyboard* property controls how the floating group responds when the keyboard opens.

* **Checked:** the floating group shifts upward to stay visible above the keyboard. This is useful for elements the user needs to see or interact with while typing, such as an input field, a chat composer, or a submit button.
* **Unchecked:** the floating group stays in its fixed position, even if that means being covered by the keyboard. This is fine for elements that aren't relevant during typing.

<figure><img src="/files/yH1vXVyt1RTfZXukI0Tz" alt="The Move with keyboard property on a mobile floating group."><figcaption><p>The <em>Move with keyboard</em> property controls how the floating group responds when the keyboard opens.</p></figcaption></figure>

For most floating groups anchored to the bottom of the view, leaving *Move with keyboard* checked provides the smoother user experience.

## Layering with z-index

The z-index controls whether a floating group sits above or below other elements. By default, floating groups sit above the view content, which is what makes them float visibly.

<figure><img src="/files/VitQew0VYZILDoOGDxXI" alt=""><figcaption></figcaption></figure>

You can also set a floating group to sit beneath the view. This is occasionally useful for background layers or design effects, but it comes with a catch: if the view has its own background style, that background can hide the floating group entirely.

Unless you're intentionally using a floating group as a background layer, leave the z-index setting on its default so the group appears above the view.

## Loading data into a floating group

Floating groups can hold a data source, just like regular groups. It can be loaded in two different ways:

#### Set the data source directly

The data loads as soon as the view opens. This works well for data known upfront.

<figure><img src="/files/VKmqZZcUGJcmLgcgEG91" alt=""><figcaption><p>Setting the data source directly loads the data immediately.</p></figcaption></figure>

#### Push data with a workflow

Use the *Display data in a group* action to load data in response to a user action, such as tapping an item in a list.

<figure><img src="/files/YdHfJJhMxIKfnqOIyzAC" alt="The Display data in a group action pushing data to a mobile floating group."><figcaption><p>You can push data to a floating group as a result of user action, by using the <em>Display data in group/popup</em> action.</p></figcaption></figure>

Both methods behave the same way once the data is loaded.

## Showing and hiding floating groups

Floating groups can be shown, hidden, and animated in the same way as regular groups.

### Using actions

Use the  [*Show an element*](/core-resources/actions/element#show-an-element), [*Hide an element*](/core-resources/actions/element#hide-an-element), [*Toggle an element*](/core-resources/actions/element#toggle-an-element), and [*Animate an element*](/core-resources/actions/element#animate-an-element) actions to control visibility.

### Using a conditional

You can also use a conditional to show or hide the floating group based on specific criteria.

<figure><img src="/files/cGAmyyKsZHpqnOcjWYaN" alt="Conditional controlling the visibility of a floating group on mobile."><figcaption><p>This floating group will only be visible when the current user is logged in.</p></figcaption></figure>

## Styling floating groups

Floating groups can be styled like any other element. You can style individual floating groups by adjusting their different properties, or by connecting them to predefined styles[^1] and/or [style variables](#user-content-fn-2)[^2].

<figure><img src="/files/bTX9OLDhLPwvzb3fbaUs" alt="The styling properties of a mobile floating group."><figcaption><p>You can style individual floating groups by adjusting their different properties, or by connecting them to predefined styles and/or style variables.</p></figcaption></figure>

Using shared styles or style variables keeps groups consistent across your app.

Frequently asked questions

<details>

<summary>Can a floating group be attached to more than one side of the screen?</summary>

Yes. You can set the behavior horizontally and vertically, letting the floating group lock to a specific combination like top-left, bottom-right, or bottom-center.

</details>

<details>

<summary>Do floating groups affect the layout of the rest of the view?</summary>

No. Floating groups sit in their own layer above the view and don't take up space in the normal flow. Other elements aren't pushed around by them.

</details>

<details>

<summary>Can I have more than one floating group on the same view?</summary>

Yes. You can add multiple floating groups, each attached to a different part of the screen. A common example is a view with both a floating action button and a floating notification banner.

Keep in mind that mobile screens are smaller than desktop displays and vary between device models. What looks good in preview may feel cramped on certain devices, so test your design across a range of screen sizes.

</details>

<details>

<summary>Can I load data into a floating group?</summary>

Yes. [Set](#set-the-data-source-directly) the Type of content and Data source on the group, and its child elements can reference the data using `Parent group's` expressions. You can also push data using a [workflow](#push-data-with-a-workflow).

</details>

<details>

<summary>Can floating groups be shown and hidden?</summary>

Yes. You can control the behavior using [workflow actions](#using-actions) or [conditionals](#using-a-conditional).

</details>

<details>

<summary>Can I animate a floating group as it appears?</summary>

Yes. Use the [Animate an element](/core-resources/actions/element#animate-an-element) action to slide, fade, or scale the group in and out.

</details>

<details>

<summary>Why is my floating group hidden behind the view?</summary>

The [z-index](#layering-with-z-index) is likely set to Beneath the view. Change it to sit above the view in the group's properties.

</details>

<details>

<summary>How do I make a floating group appear only after the user scrolls?</summary>

Yes. Use a conditional, and set the *Current view scrolling position* data source to a specific value.

</details>

<details>

<summary>Should I use a floating group or the app bar for a header?</summary>

Use the app bar for standard headers with a title and navigation controls. Use a floating group when you need a custom header design that goes beyond what the app bar supports. In general we recommend using the native tabs.

</details>

<details>

<summary>Can I nest containers inside a floating group?</summary>

Yes. Floating groups can hold any elements, including other containers, which makes them useful for building custom headers, sidebars, and menus with layered layouts.

</details>

[^1]: Styles are reusable sets of visual properties, like colors, fonts, and borders, that can be applied to elements across your app. Updating a style automatically updates every element that uses it, keeping your design consistent.

    **Article:** [Styles](/help-guides/design/variables-and-styles/styles)

[^2]: Style variables let you save individual colors and fonts, and reference them anywhere in your app. Updating a variable updates every style and element that uses it, making it easy to change your app's look in one place.

    **Article:** [Style variables](/help-guides/design/variables-and-styles)
