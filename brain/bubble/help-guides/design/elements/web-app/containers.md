# Containers
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

This section covers the container elements, used to group and control the behavior of other elements

{% hint style="info" %}
This section takes a long-form look at what containers are and how you can use them in different situations.\
\
To see the full list of properties available on container elements, you can check out our more concise [core reference entry on containers](/core-resources/elements/containers).
{% endhint %}

{% hint style="info" icon="desktop" %}
This article covers containers for wep apps. For containers used in mobile apps see the article below:

**Article:** [Mobile containers](/help-guides/design/elements/ios-and-android-app/containers)
{% endhint %}

<figure><img src="/files/giLHZKHIX1Q5PwaPNapE" alt="Example of containers used to build a form."><figcaption><p>Containers can hold elements like the form in the example above. Here we're using a <a href="/pages/0InSA6TX3K40sT0u4F83"><em>group</em></a> element.</p></figcaption></figure>

Containers hold other elements[^1] and control how they behave on the page. Placing an element inside a container makes the container its parent and the element its child, forming the hierarchical structure the browser uses to render the layout correctly. You can see this parent-child relationship in the [element tree](#user-content-fn-2)[^2].

Containers are one of the most important tools in Bubble. They control layout, hold data, group related elements, and are the foundation of any responsive design. Mastering containers is essential to mastering design in Bubble.

## What containers do

Containers serve three main purposes:

1. **They organize elements into a hierarchy.** Grouping related elements together makes them easier to manage, move, style, and reference.
2. **They control layout.** A container's layout settings determine how its child elements are arranged and how they respond to different screen sizes.
3. **They hold data.** A container can be given a data source, making that data available to every element inside it.

Most containers do more than one of these at the same time. A single group might hold a form's fields, control their layout, and load the user record being edited, all in one.

### Container types

Bubble offers several container types on web, each suited to different situations.

<table><thead><tr><th width="176.2109375">Container</th><th>Purpose</th></tr></thead><tbody><tr><td><a href="/pages/0InSA6TX3K40sT0u4F83">Group</a></td><td>The most common container. Used to organize elements, control layout, and hold data.</td></tr><tr><td><a href="/pages/F2Z6HIq5lrrnkRUAKQbg">Repeating group</a></td><td>Displays a list of items by repeating a template cell for each record.</td></tr><tr><td><a href="/pages/xNR63E81QtKAbMSiK90O">Table</a></td><td>Displays a list of items in a structured table.</td></tr><tr><td><a href="/pages/vSeYGneOPOJmfX4xfS1u">Popup</a></td><td>An overlay that appears on top of the page, typically for dialogs or focused interactions.</td></tr><tr><td><a href="/pages/1fNX5lhkwMiZUxo4mHsI">Floating group</a></td><td>A container that stays fixed in place on the screen as the user scrolls, often used for headers or persistent menus.</td></tr><tr><td><a href="/pages/uDrZfAW9NewNRUhmyEfB">Group focus</a></td><td>A small overlay anchored to another element, typically used for dropdown menus or contextual actions.</td></tr></tbody></table>

## Controlling layout with containers

Containers use one of four layout modes to arrange their children:

* **Column** stacks children vertically. Each element sits below the previous one.
* **Row** arranges children horizontally, side by side.
* **Align** lets you position children in one of nine fixed positions within the container.
* **Fixed** gives each element a fixed position, without automatic layout logic.

Each layout mode comes with its own set of alignment and spacing options. Choosing the right layout mode is one of the most important decisions when building a responsive design. You can also nest containers inside other containers.

Using containers to control layout is the key to an efficient responsive design.

**Article series:** [Responsive design](/help-guides/design/responsive-design)

## Loading data into containers

Containers can hold data, which makes it available to every element inside them.

For example, a form for editing a user might have a container with its data source set to *`Current User`*. Every input field inside that container can then reference *`Parent group's User's name`*, *`Parent group's User's email`*, and so on, without needing to fetch the user separately in each element.

### **Two ways to load data**

There are two main ways to load data into a container:

#### Set the container's data source

Setting a container's data source makes the data load instantly. First, you need to set the **Type of content**, such as `User`. This tells Bubble what kind of data to expect, and the container will only accept that type. Then set the **data source** itself, such as `Current User`.

*`Current User`* is just one option. Any expression that returns a `user` is valid, such as `Do a search for:first item`, as long as the search returns a `user`.

The data loads automatically when the page loads. This is useful for data that's known upfront, like the current user or the current page thing.

<figure><img src="/files/s1jHdZPsPfX4cC4ErHMW" alt="Loading a data source directly on a container on page load."><figcaption><p>In this example, we have a group called <em>User form.</em> The type of content is set to <code>User</code>, and the expression that loads the user into the form is <code>Current User</code>.</p></figcaption></figure>

In containers that handle multiple things, like a repeating group, you follow the same logic. Any expression that returns a list of users will be accepted:

<figure><img src="/files/Ejf2vweZ2s7snGk6gT97" alt="Loading a list into a repeating group on page load."><figcaption><p>A repeating group requires a list of things returned by the dynamic expression.</p></figcaption></figure>

#### Push data with a workflow

Use the *Display data in a group/popup* and *Display data in a repeating group* actions to load data into a container in response to a user action. This is useful when the data depends on something the user does, like clicking a specific item in a list.

<figure><img src="/files/tUGwrWAOfRsJU05Cjvnu" alt=""><figcaption><p>In this example, clicking a button triggers an action that loads data into a container.</p></figcaption></figure>

Both methods make the data available to child elements. The choice comes down to whether the data should load immediately or in response to something the user does.

### **Referencing data in elements**

Once a container holds data, its child elements can reference it directly. In the field settings for a child element, use expressions like `Parent group's User's email` to pull data from the container.

<figure><img src="/files/yz3MMkx82fsL1thzlnbQ" alt=""><figcaption><p>In this example, we're loading the email address of the user held in the container, as the input's initial content.</p></figcaption></figure>

This makes containers a powerful way to structure a page: load the data once at the container level, then reference it from wherever it's needed inside.

### **Referencing data in workflows**

The same works in workflows. A *Save* button inside a container holding a user can reference `Parent group's User` directly, making it easy to save changes back to that user.

<figure><img src="/files/oqCXPBS9c9G1gglyAFM1" alt=""><figcaption><p>In this example, a button inside a group references the <code>Parent group's user</code> to make changes to it.</p></figcaption></figure>

For this to work, the workflow must be triggered by an element inside the container. If a *Save* button sits outside the container, it won't have access to the container's data through the `Parent group's thing` expression, but you can still reference the group by name.unless it references it another way.

This pattern works with any container type, including cells inside a repeating group.

### Resetting a container

Resetting a container reverts it to its original state. The *Reset a group/popup* action clears the current data and restores the data source defined at the container level.

{% hint style="info" %}
**Reset doesn't mean empty**. It means "return to the initial state." If a container had a data source set at the element level, resetting it reloads that data. If no data source was set, it becomes empty.
{% endhint %}

Whenever the content of a container changes, either through a data source update or a workflow, all child elements update to reflect the new data.

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

## Container security

Like all elements, containers become part of your app's client-side code. Their names, structure, and any static content are visible to anyone inspecting the page. Sensitive information should never be placed inside a container's properties, data source expressions, or default values. Protect sensitive data with privacy rules in the database instead.<br>

## FAQ: Web containers

<details>

<summary>What's the difference between a group and a repeating group/table?</summary>

A [group](/help-guides/design/elements/web-app/containers/groups) holds a single set of elements and, optionally, a single piece of data. A [repeating group](/help-guides/design/elements/web-app/containers/repeating-groups) or [table](/help-guides/design/elements/web-app/containers/table-elements) displays a list of items by repeating a template cell for each record in the list.&#x20;

</details>

<details>

<summary>Can I nest containers inside each other?</summary>

Yes. Nesting containers is a common pattern for building responsive layouts. Just keep an eye on how deep the nesting goes, since deeply nested layouts can be harder to maintain.

Also keep in mind that nesting [repeating groups](/help-guides/design/elements/web-app/containers/repeating-groups) or [tables](/help-guides/design/elements/web-app/containers/table-elements) can slow your app down and consume more workload[^3] than you intended, since the data source loads separately in each cell.

</details>

<details>

<summary>Does child data update automatically when I change the container's data source?</summary>

Yes. When a container's data source changes, all child elements referencing that data update to reflect the new value.

</details>

<details>

<summary>What happens to child elements when I delete a container?</summary>

Deleting a container also deletes every element inside it. To keep the child elements, move them out of the container first.

</details>

<details>

<summary>Can containers hold different data types?</summary>

Each container's data source has a single type, such as User or Post. Nested containers can each hold their own data type, allowing more complex layouts.

</details>

<details>

<summary>How do I know which container an element belongs to?</summary>

The [element tree](#user-content-fn-2)[^2] shows the full hierarchy. Selecting an element also highlights its position in the tree, making it easy to see which container it belongs to.

</details>

<details>

<summary>Can I make a container invisible?</summary>

Yes. Uncheck *Visible on page load* in the property editor, or set the container's opacity or background to be fully transparent. Invisible containers still function normally for layout and data.

You can collapse a container's height and width when it's invisible, by checking the *Collapse when hidden.* This is the most common way of setting up SPAs[^4], by hiding and showing groups as needed.

</details>

<details>

<summary>Which container should I use for a form?</summary>

A standard group is usually the right choice. Set its data source to the record being edited, add the input fields as children, and connect them to the container's data through `Parent group's` expressions.

</details>

<details>

<summary>Can a container trigger a workflow?</summary>

Yes. Setting up a workflow on the container's *An element is clicked* event lets it behave like a clickable element. This is useful for cards, list items, and other interactive layouts.

</details>

[^1]: Elements are the individual pieces of your app's interface, such as buttons, images, input fields, and containers. Combined, they make up everything a user sees and interacts with on the page.\
    \
    Article: [Elements](/help-guides/design/elements)

[^2]: The *element tree* is the list of elements organized in a hierarchy that you can see on the left side of the Bubble design editor.\
    \
    Article: [The element tree](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-element-tree)

[^3]: Workload is a measure of how much processing your app uses. Every server-side operation, like database queries, workflow actions, and external API calls, consumes workload

    **Article series:** [Workload](/help-guides/workload)

[^4]: An **SPA**, or **single-page app**, is a type of web app that keeps the user on one page and dynamically shows and hides content instead of loading separate pages for each section.

    **Article:** [Single-page applications](/help-guides/logic/navigation/single-page-applications-spa)
