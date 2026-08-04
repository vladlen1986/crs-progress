# Container elements (mobile)
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/containers · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

Containers hold other elements and control how they behave on the view. Placing an element inside a container makes the container its parent and the element its child, forming the hierarchical structure the browser uses to render the layout correctly. You can see this parent-child relationship in the element tree.

Containers are one of the most important tools in Bubble. They control layout, hold data, group related elements, and are the foundation of any responsive design. Mastering containers is essential to mastering design in Bubble.

## What containers do <a href="#what-containers-do" id="what-containers-do"></a>

Containers serve three main purposes:

1. **They organize elements into a hierarchy.** Grouping related elements together makes them easier to manage, move, style, and reference.
2. **They control layout.** A container's layout settings determine how its child elements are arranged and how they respond to different screen sizes.
3. **They hold data.** A container can be given a data source, making that data available to every element inside it.

Most containers do more than one of these at the same time. A single group might hold a form's fields, control their layout, and load the user record being edited, all in one.

<details>

<summary>The element hierarchy</summary>

All elements in a mobile app are organized in a hierarchy that shapes both the layout and how data flows through your design. Understanding this hierarchy is key to building views that behave predictably and look right across devices.

Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

</details>

## Container types

<table><thead><tr><th width="168.4296875">Element</th><th>Description</th></tr></thead><tbody><tr><td><a href="/pages/NvacCqH3lNaRhxAJVECA">Group</a></td><td>The most basic and versatile container type. Used to organize elements, control layout, and hold data.</td></tr><tr><td><a href="/pages/lhtfublW1vNS4m5LiZcN">Floating group</a></td><td>A container that stays fixed to a side of the screen as the user scrolls, ideal for persistent headers, floating action buttons, or status banners.</td></tr><tr><td><a href="/pages/tMWVlyqYJBFmjso00QHy">Short list</a></td><td>A container for displaying a small, fixed list of items.</td></tr><tr><td><a href="/pages/QxGmyPCTI498McajLuRP">Horizontal list</a></td><td>A container that displays a scrollable list of items side by side, useful for carousels, category rows, and media galleries.</td></tr><tr><td><a href="/pages/j7YZDQYm5o8UbHD5UeKS">Sheet</a></td><td>A container that slides up from the bottom of the view, sitting above the current content while keeping the underlying view partially visible.</td></tr><tr><td><a href="/pages/kc2HeG4yI6rEmy95HTvO#selectable-lists">Selectable list</a></td><td>A list with built-in functionality for selecting one or more records.<br><strong>Note:</strong> a selectable list behaves like a container, but is listed as an input form in the element palette, because it accepts user input. </td></tr></tbody></table>

## Lists in mobile apps

In a web app, you will mostly use repeating groups or tables to build lists. Native mobile apps use the mobile operating system's native components, and thus behave a bit differently. Lists *can* be built using elements, but are often instead displayed as a property of an already existing element. For example, the view has two built-in list types:

* [**Vertical lists**](/help-guides/design/elements/ios-and-android-app/the-view#view-types)**:** a list that take up the full screen and lazy-loads[^1] as the user scrolls.
* [**Section lists**](/help-guides/design/elements/ios-and-android-app/the-view#view-types)**:** lists that are divided into a section, such a by category or by a numerical value such as age. Also lazy-loads.

You won't find these in the element palette, as they are pseudo child elements of the view itself. You set this behavior in the *View type* property.

**Article:** [The view](/help-guides/design/elements/ios-and-android-app/the-view)

### Pagination

Pagination is a web pattern that doesn't translate well to mobile because of the small screen. It's still possible to set up pagination, but we recommend instead using the more mobile-friendly pattern of fullscreen lists that lazy-load[^1]. For lists longer than 20-30 or so items, we recommend using [vertical lists](/help-guides/design/elements/ios-and-android-app/the-view#view-types) or [section lists](/help-guides/design/elements/ios-and-android-app/the-view#view-types).

For very long lists, implementing search or filtering can be a user-friendly option to long scrolling.

### List elements

While longer lists should use [vertical lists](/help-guides/design/elements/ios-and-android-app/the-view#view-types) or [section lists](/help-guides/design/elements/ios-and-android-app/the-view#view-types), native mobile apps also has list elements that can be placed directly on the view or inside a container.&#x20;

* [**Short list:**](/help-guides/design/elements/ios-and-android-app/containers/short-list-element-mobile) Short lists are similar to repeating groups, but load all content immediately. As the name suggests, they should be used only to hold lists of a few items.
* [**Horizontal list:**](/help-guides/design/elements/ios-and-android-app/containers/horizontal-list-element-mobile) A horizontal list is used to display a list of items in a scrollable, side-to-side layout.
* [**Selectable list:**](/help-guides/design/elements/ios-and-android-app/input-forms#selectable-lists) A selectable list is also a container for small lists, that has built-in functionality for selecting one or more records, similar to radio buttons or a list of checkboxes in web apps.\
  **Note:** the selectable list element is considered an input form element because i accepts user input. You'll find it under Input forms in the element palette.

## Popups in mobile apps

Using popups is a common scenario in web apps, used to display messages, ask for confirmation, show details about data and for login/sign-up flows.

Native mobile apps don't have popups, but you can instead use one of the native alternatives:

* [**A view:**](/core-resources/elements/native-mobile-elements/view-element) A view can be quickly navigated to, fills the whole screen and can be navigated back from
* [**A sheet:**](/help-guides/design/elements/ios-and-android-app/containers/sheet-mobile) A sheet is a container that slides up from the bottom of a native mobile view, sitting above the current content while keeping it partially visible.

## Controlling layout with containers

Containers use one of four layout modes to arrange their children:

* **Column** stacks children vertically. Each element sits below the previous one.
* **Row** arranges children horizontally, side by side.
* **Align** lets you position children in one of nine fixed positions within the container.
* **Fixed** gives each element a fixed position, without automatic layout logic.

Each layout mode comes with its own set of alignment and spacing options. Choosing the right layout mode is one of the most important decisions when building a responsive design. You can also nest containers inside other containers.

Using containers to control layout is the key to an efficient responsive design.

**Article series:** [Responsive design](/help-guides/design/responsive-design)

## Styling containers

Containers can be styled just like any other element. They support background colors, borders, border radius, shadows, opacity, and more. They can also be set to fully transparent or invisible when their only purpose is to control layout or hold data.

To open a container's style settings, click on it in the element tree or on the canvas. Its properties appear in the property editor on the right.

<figure><img src="/files/vxjr9tr8a6DOOyrstymg" alt="A container&#x27;s styling properties in the element property editor."><figcaption><p>Containers can be styled individually, or by using predetermined styles.</p></figcaption></figure>

Using shared styles or style variables keeps container styling consistent across your app.

Article series: [Styles](/help-guides/design/variables-and-styles/styles)

## Working with containers in the editor

A few tips make working with containers easier:

* **Use the element tree to navigate parent-child relationships**. It's the fastest way to select a specific container in a complex design.
* **Give containers meaningful names**. Group Header and Group Cart Items are much easier to work with than Group A and Group B.
* **Nest carefully**. Nested containers make responsive design more flexible, but excessive nesting can slow down rendering and make the layout more difficult to manage.
* **Consider reusable elements**. If the same container structure appears in multiple places, converting it into a reusable element saves time and keeps the design consistent.

[^1]: Lazy loading is a technique where data or content is loaded only when it's needed, such as when the user scrolls into view. This helps improve performance by avoiding loading everything upfront.
