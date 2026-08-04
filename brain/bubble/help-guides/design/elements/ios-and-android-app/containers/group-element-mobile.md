# Group element (mobile)
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/containers/group-element-mobile · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

Groups are the most basic and versatile container type. A group can be placed anywhere on a view or inside another container, and used to organize elements, control layout, hold data, and add visual styling.

Because they're so flexible, groups are the container you'll reach for most often when building a mobile app.

## What groups do

Groups serve three main purposes:

1. **Organize elements.** A group holds other elements as its children, keeping related items together and forming a clear hierarchy in the element tree.
2. **Control layout.** Layout settings on a group determine how its children are arranged and how they respond to different screen sizes.
3. **Hold data.** A group can be given a data source, making that data available to every element inside it.

Groups can serve one or all of these purposes at the same time. A single group might structure a form, control its layout, and load the user record being edited.

For a broader look at container types on mobile, see the article on mobile containers.

## Loading data into a group

Groups can hold a single piece of data, made available to every element inside. Setting this up takes two steps:

1. Set the group's *Type of content* to the type of data it will hold, such as `User` or `Post`. This tells Bubble what to expect and prevents mismatched data sources.
2. Set the *Data source* to an expression that returns a value of that type, such as `Current User` or `Do a search for:first item`.

Once the data source is set, child elements can reference it directly using expressions like `Parent group's User's name`.

There are two ways to load data into a group:

#### Set the data source directly

The data loads as soon as the view opens. This works well for data known upfront.

<figure><img src="/files/ZgaI1X0Z5jMUlYTeOdtj" alt="Loading data into a mobile group by setting a data source."><figcaption><p>Setting the data source directly loads the data immediately.</p></figcaption></figure>

#### Push data with a workflow

Use the *Display data in a group* action to load data in response to a user action, such as tapping an item in a list.

<figure><img src="/files/tUGwrWAOfRsJU05Cjvnu" alt="Using the Display data in group/popup action to push data to a group."><figcaption><p>You can push data to a group as a result of user action, by using the <em>Display data in group/popup</em> action.</p></figcaption></figure>

Both methods behave the same way once the data is loaded.

## Controlling layout with groups

Groups use one of four layout modes to arrange their children:

* **Column** stacks children vertically.
* **Row** arranges children horizontally.
* **Align** positions children in one of nine fixed positions inside the group.
* **Fixed** lets you place each child at a specific position without automatic layout logic.

Each mode has its own alignment and spacing options. Choosing the right layout mode is one of the most important decisions when building a responsive mobile design that adapts across different device sizes.

Nested groups are a common pattern: an outer group with a column layout might hold several inner groups with row layouts, each representing a section of the view. Together, they form the responsive structure of the design.

## Styling groups

Groups can be styled like any other element. You can style individual groups by adjusting their different properties, or by connecting them to predefined styles[^1] and/or [style variables](#user-content-fn-2)[^2].

<figure><img src="/files/bTX9OLDhLPwvzb3fbaUs" alt="The styling properties of a mobile group."><figcaption><p>You can style individual groups by adjusting their different properties, or by connecting them to predefined styles and/or style variables.</p></figcaption></figure>

Using shared styles or style variables keeps groups consistent across your app.

## Collapsing hidden groups

When a group is set to be invisible, it can also be set to collapse. A collapsed group takes up no space in the view, so surrounding elements move up to fill the gap. When the group becomes visible again, the layout reflows to make room for it.

This behavior is controlled by the *Collapse when hidden* property. Without it, an invisible group still occupies its original space, leaving an empty area in the view.

Collapsing hidden groups is useful for building dynamic mobile layouts, where sections of a view appear or disappear based on the user's actions or context.

### Using groups for in-view state changes

While mobile navigation typically happens through views, groups can also be used to change what's visible inside a single view. This is useful for things like:

* Switching between sections of a settings screen without navigating to a new view.
* Toggling filters, sort options, or additional details on a list.
* Showing and hiding form steps within a multi-step form.

By placing different sections inside separate groups and toggling their visibility, you can build focused, in-view interactions that stay within the same screen.

### Showing and hiding groups

Two ways to control which group is visible:

#### Conditions

Set conditions on each group that show it when certain criteria are true. For example, showing one group when a toggle is on and another when it's off.

#### Workflows

Use actions like [*Show an element*](/core-resources/actions/element#show-an-element), [*Hide an element*](/core-resources/actions/element#hide-an-element), [*Toggle an element*](/core-resources/actions/element#toggle-an-element), or [*Animate an element*](/core-resources/actions/element#animate-an-element) to control visibility in response to user actions. Toggle is useful for switching between two states, while Animate adds transitions for a smoother visual effect.

#### Things to keep in mind

* For navigation between full screens, use views instead of groups. Mobile apps are built around views, and users expect standard mobile navigation patterns for major transitions.
* Groups work best for smaller in-view state changes, not entire screen changes.
* Naming groups clearly and organizing the element tree carefully makes the design easier to manage.

### Frequently asked questions

<details>

<summary>Can groups hold other groups?</summary>

Yes. Nested groups are a core building block for responsive mobile layouts. Just avoid unnecessary nesting, since deeply nested layouts can be harder to maintain.

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

<summary>Can I make a group tappable?</summary>

Yes. Set up a workflow triggered by the group's *When tapped* event, and the group will behave like a tappable element. This is useful for cards, list items, and other interactive layouts.

</details>

<details>

<summary>Can a group be transparent?</summary>

Yes. Set the background to fully transparent or reduce the opacity. The group still functions normally for layout and data, but has no visible appearance.

</details>

<details>

<summary>What's the difference between hidden and collapsed?</summary>

A hidden group is invisible but still takes up space in the view. A collapsed group is invisible and takes up no space, so surrounding elements move to fill the gap. Collapsing is controlled by the *Collapse when hidden* property.

</details>

<details>

<summary>Should I use a group or a view for navigation?</summary>

Use a view for full-screen navigation, such as moving between the main sections of your app. Use a group for in-view changes – showing and hiding content within the same screen.

</details>

[^1]: Styles are reusable sets of visual properties, like colors, fonts, and borders, that can be applied to elements across your app. Updating a style automatically updates every element that uses it, keeping your design consistent.

    **Article:** [Styles](/help-guides/design/variables-and-styles/styles)

[^2]: Style variables let you save individual colors and fonts, and reference them anywhere in your app. Updating a variable updates every style and element that uses it, making it easy to change your app's look in one place.

    **Article:** [Style variables](/help-guides/design/variables-and-styles)
