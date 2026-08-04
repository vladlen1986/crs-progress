# Group element (web)
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/groups · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

This section covers Groups, that can be used to contain elements and data and control the responsive behavior of child elements

Groups are the most basic and versatile container type in Bubble. A group can be placed anywhere on a page or inside another container, and used to organize elements, control layout, hold data, and add visual styling.

Because they're so flexible, groups are the container you'll reach for most often when building an app.

{% embed url="<https://www.youtube.com/watch?v=HWmgmzIQRfg>" %}

<figure><img src="/files/giLHZKHIX1Q5PwaPNapE" alt="Group element example with a form."><figcaption><p>Groups can hold elements like the form in the example above.</p></figcaption></figure>

## What groups do

Groups serve three main purposes:

1. **Organize elements.** A group holds other elements as its children, keeping related items together and forming a clear hierarchy in the element tree.
2. **Control layout.** Layout settings on a group determine how its children are arranged and how they respond to different screen sizes.
3. **Hold data.** A group can be given a data source, making that data available to every element inside it.

Groups can serve one or all of these purposes at the same time. A single group might structure a form, control its layout, and load the user record being edited.

For a broader look at container types and how they compare, see the article on containers.

## Loading data into a group

Groups can hold a single piece of data, made available to every element inside. Setting this up takes two steps:

1. Set the group's [*Type of content*](#user-content-fn-1)[^1] to the type of data it will hold, such as `User` or `Post`. This tells Bubble what to expect and prevents mismatched [data sources](#user-content-fn-2)[^2].
2. Set the *Data source* to an expression that returns a value of that type, such as `Current User` or `Do a search for:first item`.

Once the data source is set, child elements can reference it directly using expressions like `Parent group's User's name`.

There are two ways to load data into a group:

### Set the data source directly

The data loads as soon as the page loads. This works well for data known upfront. The section [above](#loading-data-into-a-group) explains this method.

<figure><img src="/files/s1jHdZPsPfX4cC4ErHMW" alt=""><figcaption><p>Setting the data source directly loads the data immediately.</p></figcaption></figure>

### Push data with a workflow

Use the [*Display data in a group/popup*](/core-resources/bubble-workflows/bubble-actions/element-actions#display-data-in-a-group-popup) action to load data in response to a user action, such as clicking an item in a list.

<figure><img src="/files/tUGwrWAOfRsJU05Cjvnu" alt="Using the Display data in group/popup action to push data to a group."><figcaption><p>You can push data to a group as a result of user action, by using the <em>Display data in group/popup</em> action.</p></figcaption></figure>

Both methods make the data available the same way. The choice comes down to whether the data should load immediately or in response to user action.

## Controlling layout with groups

Groups use one of four layout modes to arrange their children:

* **Column** stacks children vertically.
* **Row** arranges children horizontally.
* **Align** positions children in one of nine fixed positions inside the group.
* **Fixed** lets you place each child at a specific position without automatic layout logic.

Each mode has its own alignment and spacing options. Choosing the right layout mode is one of the most important decisions when building a responsive design.

Nested groups are a common pattern: an outer group with a column layout might hold several inner groups with row layouts, each representing a section of the page. Together, they form the responsive structure of the design.

**Article series:** [Responsive design](/help-guides/design/responsive-design)

## Styling groups

Groups can be styled like any other element. They support background colors, borders, border radius, shadows, opacity, and more. They can also be made transparent or fully invisible when their only purpose is to organize elements or control layout.

<figure><img src="/files/vxjr9tr8a6DOOyrstymg" alt="Styling properties for a group element."><figcaption><p>Group's can be styled individually, or by using predetermined styles.</p></figcaption></figure>

Using shared styles or style variables keeps groups consistent across your app.

**Article series:** [Styles](/help-guides/design/variables-and-styles/styles)

## Collapsing hidden groups

When a group is set to be invisible, it can also be set to **collapse**. A collapsed group takes up no space on the page, so surrounding elements move up to fill the gap. When the group becomes visible again, the layout reflows to make room for it.

This behavior is controlled by the *Collapse when hidden* property. Without it, an invisible group still occupies its original space, leaving an empty area on the page.

<figure><img src="/files/8PiQa2Iq1eN1IGrJMRgo" alt="The Collapse when hidden property on a group element."><figcaption><p>The <em>Collapse when hidden</em> property collapses the element when it's hidden, making room for other elements to take its place. Both height and width are collapsed.</p></figcaption></figure>

Collapsing hidden groups is the foundation of many common Bubble patterns, including [single-page apps](/help-guides/logic/navigation/single-page-applications-spa).

## Using groups for navigation

Because groups can be shown, hidden, and collapsed, they're a natural way to build in-page navigation without moving the user to a different page.

By placing different sections of your app inside separate groups and toggling their visibility, you can let users move between sections instantly without triggering a page reload. This pattern is often used to build single-page apps (SPAs).

<figure><img src="/files/8XwCjAUuciKrG3sIbr7E" alt="Animation of a group collapsing, making room for another group." width="417"><figcaption><p>In the example above, we are toggling the visibility of Group A and Group B.</p></figcaption></figure>

### **Building an** [**SPA**](#user-content-fn-3)[^3] **with groups**

The pattern typically looks like this:

1. Add several groups to the page, each representing a section of the app (dashboard, settings, profile, and so on).
2. Disable *Visible on page load*, with *Collapse when hidden* enabled.
3. Use conditions or workflows to show the right group based on the user's current context.

Because only one group is visible at a time, the layout adjusts automatically, and the user sees a clean view of the section they're in.

#### **Showing and hiding groups**

There are two ways to control which group is visible:

**Conditions**

Set conditions on each group that show it when certain criteria are true. A common pattern uses URL parameters, such as showing a group when the URL contains `?navigation=edit_user`. This makes each section bookmarkable and shareable.

<figure><img src="/files/VKeFRqMuXvPrI1HTFzPI" alt="Showing a group using a conditional"><figcaption><p>In this example we're using <a href="/pages/45paecU4jIMLUMYn1R51">URL parameters</a> to show a group.</p></figcaption></figure>

**Workflows**

Use actions like [*Show an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#show-an-element), [*Hide an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#hide-an-element), [*Toggle an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#toggle-an-element), or [*Animate an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#animate-an-element) to control visibility in response to user actions. Toggle is useful for switching between two states, while Animate adds transitions for a smoother visual effect.

{% embed url="<https://www.youtube.com/watch?v=gDqAc9hj6Mc>" %}

#### **Benefits of using groups for navigation**

* **Faster transitions.** Switching between sections happens instantly, since the page doesn't reload.
* **Preserved state.** Data and input values stay intact as the user moves between sections.
* **Simpler navigation logic.** All the flow lives on one page, making it easier to reason about.

#### **Things to keep in mind**

* SPAs can grow complex quickly. Naming groups clearly and organizing the element tree carefully makes the design easier to manage.
* All assets on the page load at once, so a large SPA can affect initial load time.
* [URL parameters](#user-content-fn-4)[^4] or custom states are commonly used to track which section is currently visible, letting users bookmark or share links to specific views.

## FAQ: Groups in web apps

<details>

<summary>What's the difference between a group and a repeating group?</summary>

A group holds a single set of elements and, optionally, a single piece of data. A repeating group displays a list of items by repeating a template cell for each record in a list.

Groups are used for individual pieces of content, while repeating groups are used for collections.

</details>

<details>

<summary>Can groups hold other groups?</summary>

Yes. Nested groups are a core building block for responsive layouts.

</details>

<details>

<summary>Do I need to give every group a data source?</summary>

No. Groups can be used purely for layout, styling, or organization without holding any data. A data source only becomes relevant when the elements inside need to reference specific information.

</details>

<details>

<summary>What happens to child elements when I delete a group?</summary>

Deleting a group also deletes every element inside it. To keep the child elements, move them out of the group first.

</details>

<details>

<summary>Can I make a group clickable?</summary>

Yes. Set up a workflow triggered by the group's When clicked event, and the group will behave like a clickable element. This is useful for cards, menu items, and interactive layouts.

</details>

<details>

<summary>Can a group be transparent?</summary>

Yes. Set the background to fully transparent or reduce the opacity. The group still functions normally for layout and data, but has no visible appearance.

Note that reducing the opacity and setting the group to invisible is not the same. For groups to collapse, they need to be invisible.

</details>

<details>

<summary>What's the difference between hidden and collapsed?</summary>

A hidden group is invisible but still takes up space on the page. A collapsed group is invisible and takes up no space, so surrounding elements move to fill the gap. Collapsing is controlled by the Collapse when hidden property.

</details>

<details>

<summary>Are groups available in native mobile apps?</summary>

Yes, see [this article](/help-guides/design/elements/ios-and-android-app/containers).

</details>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> Group properties</summary>

In the core reference section, you'll find all the settings associated with groups.

Reference: [Groups](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties/group-element)

</details>

[^1]: The **Type of content** property tells Bubble what kind of data the container will hold, such as `User` or `Post`. This determines what data source it accepts and what child elements can reference through `Parent group`.

[^2]: A **data source** is any source your app pulls data from, such as a database search, a specific record, an option set, or an external API.

    **Core reference:** [Data sources](/core-resources/data/data-sources)

[^3]: A single-page app (SPA) lets users move between different sections without reloading the page. Instead of splitting content across multiple pages, everything lives on one page, and elements are shown or hidden based on the user's actions.\
    \
    **Article:** [Single-page applications](/help-guides/logic/navigation/single-page-applications-spa)

[^4]: A URL parameter is a piece of data attached to the end of a URL, used to pass information to the page. Parameters follow a `?key=value` format, such as `?section=dashboard`, and can be read by your app to control what's displayed or how it behaves.

    **Article:** [URL-parameters](/help-guides/data/temporary-data/url-parameters)
