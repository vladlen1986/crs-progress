# Group focus
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/group-focus · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

This section covers the group type Group Focus. This group will remain visible for as long as it is in focus, typically used for dropdown menus

{% embed url="<https://www.youtube.com/watch?v=l_SbovrRt2s>" %}

A group focus is a container that appears next to another element and stays visible only while it's in focus. As soon as the user clicks anywhere outside of it, the group focus automatically hides itself, no workflow needed.

Because of this behavior, group focus elements are ideal for lightweight, temporary UI that appears in response to a specific interaction and disappears again once the user's attention moves elsewhere.

<figure><img src="/files/7UozR6jK7QBoGhtQinPV" alt="Example using group focus as a dropdown menu."><figcaption><p>Group focus is useful for setting up dropdown menus</p></figcaption></figure>

#### Common uses

Group focus elements are best suited to:

* **Dropdown menus** that appear next to a button or icon.
* **Contextual menus** triggered from list items or table rows.
* **Tooltips** that show extra information near a specific element.
* **Inline pickers**, such as a date or color picker anchored to an input field.

## How a group focus behaves

Two things set a group focus apart from other containers:

**It's positioned relative to a reference element.** A group focus is always anchored to another element on the page, called its reference element. It appears next to that element based on an offset you define, and its position follows the reference element as the layout changes.

<figure><img src="/files/e8lfUOKsov2CWOiSxdhD" alt="The reference element property of a group focus."><figcaption><p>A group focus is anchored to another element on the page.</p></figcaption></figure>

**It hides itself automatically.** Once a group focus is visible, it stays open until the user clicks somewhere outside of it. At that point, it hides without any action needed. You don't have to build a workflow to close it, and you don't need to track its state.

Together, these behaviors make the group focus a lightweight way to add temporary, contextual UI without wiring up separate open and close logic.

## Showing a group focus

Group focus elements aren't visible by default. To show one, use the Show an element action, or use Animate an element for a smoother transition.

For example, clicking a menu icon can trigger Animate an element with a slide-in animation to reveal the group focus. As soon as the user clicks anywhere outside the group focus, it disappears on its own.

You don't need a workflow to hide it. That said, if you want to hide it explicitly, Hide an element still works.

## Positioning and offsets

The group focus's position is controlled by two settings:

* **Reference element:** the element the group focus is anchored to.\
  Offset: the distance in pixels between the group focus and the reference element, allowing you to position it above, below, or to the side.
* **Negative offset values** shift the group focus in the opposite direction, which is useful for aligning menus with the right edge of an icon or the top edge of an input.

Because the group focus follows the reference element, it stays properly positioned as the page scrolls or the layout adjusts.

## Loading data into a group focus

Like other containers, a group focus can hold data.

### Set the data source directly

Set the [*Type of content*](#user-content-fn-1)[^1] and [*Data source*](#user-content-fn-2)[^2] on the group focus, and its child elements can reference the data using `Parent group's` expressions[^3].

<figure><img src="/files/ijcBcqcmGtYEu9eTwf3p" alt=""><figcaption><p>Setting the data source on a group focus makes it load its data as soon as the group is shown.</p></figcaption></figure>

### Push data with a workflow

This is useful when a group focus needs to show information tied to a specific record, such as a menu showing options for a particular user or a tooltip displaying details about a specific product.<br>

<figure><img src="/files/2CtVusgeFg0ogWuvYHhC" alt="Action pushing data to a group focus."><figcaption><p>Using an action you can load a specific item into the floating group as the result of a user action.</p></figcaption></figure>

### Using group focus inside repeating groups

Repeating groups pose a challenge for group focus elements. Because a repeating group contains multiple cells, Bubble can't tell which cell's element to use as the reference. This means you can't directly reference an element inside a cell as the group focus's anchor.

The workaround is to place both the reference element and the group focus inside a reusable element, then place that reusable element in the repeating group.

**How it works:**

* Create a reusable element and set its Type of content to the data type you'll be working with (for example, User).
* Inside the reusable element, add the reference element (like a menu icon) and the group focus that anchors to it.
* In the repeating group, place an instance of the reusable element and set its data source to `Current cell's [Type]`, such as `Current cell's User`.

This makes each instance of the reusable element self-contained, with its own reference element and group focus tied to the specific record in that cell.

## Styling a group focus

Group focus elements can be styled like any other container. They support background colors, borders, border radius, shadows, and opacity. A subtle shadow or border usually works well since group focus elements sit above the surrounding page content.

Using shared styles or style variables keeps group focus elements consistent with the rest of your app's design.

**Article series**: [Styles](/help-guides/design/variables-and-styles/styles)

## FAQ: Group focus

<details>

<summary>How is a group focus different from a popup?</summary>

A popup is centered on the screen and typically dims the page behind it, drawing attention to a message or focused interaction. A group focus is anchored to a specific element on the page and closes automatically when the user clicks outside of it, making it better suited to menus, tooltips, and other lightweight UI.

</details>

<details>

<summary>How is a group focus different from a floating group?</summary>

A floating group sticks to a side of the screen and stays visible regardless of scrolling. A group focus is tied to a specific element on the page and appears next to it, staying open only while it's in focus.

</details>

<details>

<summary>Does the group focus follow the reference element as the page scrolls?</summary>

Yes. The group focus stays anchored to the reference element and moves with it if the page layout changes.

</details>

<details>

<summary>How do I hide the group focus manually?</summary>

Use the [*Hide an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#hide-an-element) or [*Animate an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#animate-an-element) action. In most cases you won't need to, since the group focus hides itself when the user clicks outside of it.

</details>

<details>

<summary>Can I animate the group focus when it appears?</summary>

Yes. Use the [*Animate an element*](/core-resources/bubble-workflows/bubble-actions/element-actions#animate-an-element) action to slide, fade, or scale it in for a smoother transition.

</details>

<details>

<summary>Can I have multiple group focus elements open at once?</summary>

Only one group focus can be open at a time. Opening a new one automatically closes the previous one.

</details>

<details>

<summary>Can I load data into a group focus?</summary>

Yes. [Set the Type of content and Data source](#loading-data-into-a-group-focus), and reference the data inside using Parent group's expressions. You can also push data [using a workflow](#push-data-with-a-workflow).

</details>

<details>

<summary>How do I use a group focus inside a repeating group?</summary>

See [this method](#using-group-focus-inside-repeating-groups).

</details>

<details>

<summary>Can the group focus's offset be dynamic?</summary>

The offset is set to a fixed pixel value in the property editor and doesn't accept dynamic expressions. Design the offset for the position that makes sense with your reference element.

</details>

<details>

<summary>Are group focus elements available in native mobile apps?</summary>

No. Group focus is web-only. On native mobile, similar behavior can be built with [sheets](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/sheet-element-mobile) or [other native components](/core-resources/elements/native-mobile-elements).

</details>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> Group focus settings</summary>

In the core reference section, you'll find all the settings associated with floating groups.

Reference: [Group focus](/core-resources/elements/containers#group-focus)

</details>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the Group focus element](https://www.youtube.com/watch?v=l_SbovrRt2s)

</details>

[^1]: The **Type of content** property tells Bubble what kind of data the repeating group will hold, such as `User` or `Post`. This determines what data source it accepts and what child elements can reference through `Current cell`.

[^2]: A **data source** is any source your app pulls data from, such as a database search, a specific record, an option set, or an external API.

    **Core reference:** [Data sources](/core-resources/data/data-sources)

[^3]: **Dynamic expressions** are how you reference and manipulate data in Bubble. They let you pull values from data sources, apply operators, and combine data in different ways to produce a final result, such as `Current User's name` or `Do a search for Posts:count`.

    **Article:** [Dynamic expressions](/help-guides/logic/dynamic-expressions)
