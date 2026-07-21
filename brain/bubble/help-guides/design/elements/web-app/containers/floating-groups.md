# Floating groups
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/floating-groups · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

This section covers the floating group, a container type used to attach a group to one of the sides of the screen so it stays in place regardless of scrolling position.

A floating group is a container that hovers above the rest of the page. It can be attached to any side of the screen and stays in place regardless of how far the user scrolls. Because they're independent of the page's normal flow, floating groups are the go-to element for headers, sidebars, and other UI that needs to stay visible at all times.

#### Common uses

Floating groups are used for anything that needs to remain accessible as the user moves through a page:

* **Navigation menus** that stay at the top of the screen while users scroll.
* **Sidebars** that provide persistent navigation or context.
* **Chat widgets** anchored to a corner of the screen.
* **Shopping cart summaries** that follow the user across the site.
* **Back-to-top buttons** that appear once the user has scrolled down.
* **Cookie consent banners** at the bottom of the page.
* **Notifications and toasts** that appear briefly and dismiss themselves.

<figure><img src="/files/lie8GPQtiftoUKiMKBqL" alt=""><figcaption><p>A typical use case for floating groups is to set up a navigation header that sticks to the top of the screen.</p></figcaption></figure>

## How floating groups behave

Floating groups sit in their own layer above the rest of the page. Because of this, they don't affect the layout of the surrounding content. Regular elements don't push around floating groups or make room for them, and floating groups don't take up space in the normal flow.

This is what allows a floating header to stay pinned to the top of the viewport while the user scrolls, or a sidebar to stay fixed to the left of the screen no matter how tall the page becomes.

Floating groups can hold any elements a regular group can, including text, images, buttons, dropdowns, and other containers.

### Attaching to the screen

Every floating group is attached to the screen along a horizontal and vertical axis. Together, these two settings determine where the group appears and how it stays positioned as the user scrolls.

The horizontal axis controls whether the group sticks to the left, right, or spans both sides. The vertical axis controls whether it sticks to the top, bottom, or spans both. A group that spans both edges stretches to fill the screen along that axis.

<figure><img src="/files/mVcpo9QqOKBEwwKSf6YE" alt="Float relative to properties on a floating group."><figcaption><p>The <em>[...] float relative too</em> properties controls whether the group sticks to the left, right, or spans both sides.</p></figcaption></figure>

Margins let you offset the group from the edge it's attached to. For example, a sidebar might be attached to the left edge with a 20-pixel top margin so it sits slightly below the top of the screen.

### Layering with z-index

The z-index[^1] controls whether a floating group sits above or below other elements. By default, floating groups sit above the page content, which is what makes them float visibly.

You can also set a floating group to sit beneath the page. This is occasionally useful for background layers or design effects, but it comes with a catch: if the page has its own background style, that background can hide the floating group entirely.

<figure><img src="/files/cJGmTAcaY151RcEhYUcE" alt="Z-index property of a floating group."><figcaption><p>The z-index controls whether the gloating group appears above or beneath the page.</p></figcaption></figure>

Unless you're intentionally using a floating group as a background layer, leave the z-index setting on its default so the group appears above the page.

## Loading data into a floating group

Floating groups can hold a [*data source*](#user-content-fn-2)[^2], just like regular groups.

### Set the data source directly

Set the [*Type of content*](#user-content-fn-3)[^3] and *Data source* on the group, and its child elements can reference the data using `Parent group's` expressions[^4].

<figure><img src="/files/Tu1j5t5f8oQdJ8aCuovk" alt="Data source on a floating group"><figcaption><p>Setting the data source on a floating group makes it load its data as soon as the group is shown.</p></figcaption></figure>

This is useful when a floating group needs to display data about the current context, such as a header showing the current user's name, or a cart summary showing the current order.

### Push data with a workflow

Data can also be loaded dynamically by using the [*Display data in a group/popup*](/core-resources/bubble-workflows/bubble-actions/element-actions#display-data-in-a-group-popup) action. This is useful when you need to load data into the floating group as the result of a user action.

<figure><img src="/files/aS0YPbM8Tj6cVTne48Ab" alt="Loading data into a floating group using an action."><figcaption><p>Using an action you can load a specific item into the floating group as the result of a user action.</p></figcaption></figure>

## Showing and hiding floating groups

Floating groups can be shown, hidden, and animated in the same way as regular groups. Use the [*Show an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#show-an-element), [*Hide an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#hide-an-element), [*Toggle an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#toggle-an-element), or [*Animate an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#animate-an-element) actions to control visibility.

Some common patterns:

* A back-to-top button that appears only once the user has scrolled past a certain point.
* A notification banner that slides in from the top and disappears after a few seconds.
* A sidebar that opens and closes based on a button click.

## Styling floating groups

Floating groups can be styled like any other container. They support background colors, borders, border radius, shadows, and opacity. Because they sit above the page, they often benefit from a subtle shadow or border to visually separate them from the content behind them.

Using shared styles or style variables keeps floating groups consistent with the rest of your app's design.

**Article series:** [Styles](/help-guides/design/variables-and-styles/styles)

## Responsive behavior

Floating groups follow the same layout system as other containers, so they support column, row, align, and fixed layout modes. Combined with their ability to span or attach to edges, this gives you a lot of flexibility for responsive design.

A common pattern is a floating header that stays attached to the top of the screen and uses a row layout inside, with elements like a logo, navigation links, and a login button arranged horizontally. On smaller screens, the same header can shift to a column layout or collapse into a menu.

## Frequently asked questions

<details>

<summary>Can a floating group be attached to more than one side of the screen?</summary>

Yes. Setting the group to span both edges on a given axis stretches it to fill the screen along that direction. This is useful for full-width headers, full-height sidebars, or footer bars.

</details>

<details>

<summary>Do floating groups affect the layout of the rest of the page?</summary>

No. Floating groups sit in their own layer above the page and don't take up space in the normal flow. Other elements aren't pushed around by them.

</details>

<details>

<summary>Can I have more than one floating group on the same page?</summary>

Yes. You can add as many floating groups as you need, and each can be attached to a different part of the screen. A common example is a page with both a floating header and a floating sidebar.

</details>

<details>

<summary>Can I load data into a floating group?</summary>

Yes. Set the [*Type of content and Data source on the group*](#set-the-data-source-directly), and its child elements can reference the data using Parent group's expressions. You can also load data into the floating group using an [action](#push-data-with-a-workflow).

</details>

<details>

<summary>Can floating groups be shown and hidden?</summary>

Yes. Use the [*Show an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#show-an-element), [*Hide an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#hide-an-element), [*Toggle an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#toggle-an-element), or [*Animate an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#animate-an-element) actions, just like with a regular group.

</details>

<details>

<summary>Can I animate a floating group as it appears?</summary>

Yes. Use the [*Animate an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#animate-an-element) action to slide, fade, or scale the group in and out.

</details>

<details>

<summary>Why is my floating group hidden behind the page?</summary>

The *Floating z-index* property is likely set to *Beneath the page*. Change it to sit above the page in the group's properties.

</details>

<details>

<summary>How do I make a floating group appear only after the user scrolls?</summary>

Set the group to invisible on page load, then use a workflow triggered by the Current page scrolling position to show it once the user has scrolled past a certain point.

You can also use a conditional on the floating group to show and hide it based on the data source [*Current page scrolling position*](/core-resources/data/data-sources#current-page-scrolling-position).

</details>

<details>

<summary>Are floating groups available in native mobile apps?</summary>

Yes, floating groups are available in native mobile apps too. Note that the two platforms are completely separate, and the properties and behavior of the floating group can vary.

</details>

<details>

<summary>Can I nest containers inside a floating group?</summary>

Yes. Floating groups can hold any elements, including other containers, which makes them useful for building headers, sidebars, and menus with layered layouts.

</details>

<details>

<summary>Can I collapse the width and/or height of a floating group</summary>

You can't collapse the width or hight directly, but you can place a group inside the floating group and collapse it instead. If they share the same dimensions, the floating group will collapse along with the group.

</details>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> Floating group properties</summary>

In the core reference section, you'll find all the properties associated with floating groups.

**Core reference:** [Floating groups](/core-resources/elements/containers#floating-group)

</details>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

We have multiple video lessons on how to set up and use Floating groups:

* [How to use Floating Groups](https://www.youtube.com/watch?v=lvuovDbPsHg)
* [How to build a sidebar layout](https://www.youtube.com/watch?v=xPr2C-CcW_k)
* [How to build a responsive navigation bar](https://www.youtube.com/watch?v=3lUlmTZ_IQo)

</details>

[^1]: The z-index controls the stacking order of overlapping elements. Higher values sit in front of lower ones.

    Z-index come from the depth dimension of 3D space: x, y, **z.**

[^2]: A **data source** is any source your app pulls data from, such as a database search, a specific record, an option set, or an external API.

    **Core reference:** [Data sources](/core-resources/data/data-sources)

[^3]: The **Type of content** property tells Bubble what kind of data the repeating group will hold, such as `User` or `Post`. This determines what data source it accepts and what child elements can reference through `Current cell`.

[^4]: **Dynamic expressions** are how you reference and manipulate data in Bubble. They let you pull values from data sources, apply operators, and combine data in different ways to produce a final result, such as `Current User's name` or `Do a search for Posts:count`.

    **Article:** [Dynamic expressions](/help-guides/logic/dynamic-expressions)
