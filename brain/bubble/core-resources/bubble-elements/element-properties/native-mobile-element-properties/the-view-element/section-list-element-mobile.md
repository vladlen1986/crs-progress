# Section list element (mobile)
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/section-list-element-mobile · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The section list is a pseudo child element of the view element. Rather than being added from the element palette, it's enabled by setting the *View type* property to *Section list* in the view element's *Configure* section. Once set, it appears in the element tree under *Overlays*.

## How grouping works

{% hint style="info" %}
Grouping properties are set on the child element [*Section list header*.](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/section-list-element-mobile/section-header-element-mobile)
{% endhint %}

### Exact grouping

The section list groups list items by a shared property — for example, grouping a list of users by their birth year. Grouping is based on exact matches, so two records with similar but not identical values, such as *New York* and *New York City*, are treated as separate groups.

There are two exceptions:

### Grouping by numbers

Numbers can be grouped as exact matches (e.g. 1, 10, 25) or buckets (e.g. 1-9, 10-19, 20-29). See the configuration section below for more information on setting the start/end number and interval.

### Grouping by dates

Dates can be grouped as exact matches, by day, or by month. Day and month groupings support intervals, letting you group ranges of time together — for example, an interval of 12 months to group by year.

## Visual

### Content

#### Type of content

Sets the type of content you want to load into the section list.

#### Data source

Sets the data source of the content you want to load into the section list.

### Size

The size of the section list is inherited from the view.

### Layout

#### Gap

Defines the vertical space between child elements inside a container.

{% hint style="info" %}
If child elements also have margins, **the gap and margin values are cumulative**. For example, a container with a 10 px gap and a child element with a 10 px margin between items will result in 20 px of total space between those elements.
{% endhint %}

#### Padding

Defines the internal spacing between an element’s content and its border in a static pixel value. Padding adds space inside the element, without affecting its position relative to other elements.

Padding is added on the vertical and horizontal axis respectively.

### Configure

#### Separators

**Style**

Sets the style of the separator line.

<table><thead><tr><th width="111.63671875">Style</th><th>Description</th></tr></thead><tbody><tr><td>Fill</td><td>The separator spans the full width of the screen.</td></tr><tr><td>Inset</td><td>The separator is indented from the left edge.</td></tr></tbody></table>

**Inset**

Sets the inset width as a pixel value.

**Width**

Sets the width of the separator line.

<table><thead><tr><th width="125.765625">Width type</th><th>Description</th></tr></thead><tbody><tr><td>Hairline</td><td>A hairline is the thinnest line a screen can render, which varies by device — on high-density displays (such as Apple's Retina) it can be thinner than a full pixel.</td></tr><tr><td>Pixel value</td><td>A pixel width of 1 is always exactly one device-independent pixel, which may appear thicker than a hairline on high-density screens.</td></tr></tbody></table>

**Color**

Sets the color of the separator line, and the opacity of that color.

## Interaction

### Workflows

Shows the workflows connected to the selected element. Click the + symbol to create a new workflow associated with that element. The list of available events differs based on which element is selected.

{% hint style="info" icon="keyboard" %}
**Shortcut:** To quickly add a workflow to a selected element, press Cmd+K on macOS or Ctrl+K on Windows. The shortcut defaults to the most likely event for that element type.
{% endhint %}

### Visibility

#### Visible on view load

Enable this to make the element [visible by default](#user-content-fn-1)[^1]. This checkbox makes the element visible every time the view loads. Change the visibility of the element based on certain conditions[^2] in the Conditional section in the property editor or with a show/hide element action[^3] in a workflow.

### Options

#### Enable reverse scroll

When enabled, the list scrolls in the opposite direction — new items appear at the bottom and the list starts scrolled to the end.

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

### Advanced

A unique identifier assigned to the element. This can be used to reference the element in custom code, such as JavaScript or CSS, using `document.getElementById()` or CSS selectors.

{% hint style="info" %}
For this property to be visible, you need to enable *Expose the option to add an ID attribute to HTML elements* in *Settings – Advanced options.*
{% endhint %}

[^1]: Visible by default means that the element is visible when you load/reload the page.

[^2]: *Conditions* are appliead to elements to make them change their apperance or behavior based on a specific condition. Conditions are built using dynamic expressions.<br>

    Article: [Conditions](/help-guides/logic/conditions)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^3]: An *action* is the part of a workflow that performs a specific task, such as making changes in the database, hiding/showing elements and sending API requests.\
    \
    Reference: [List of actions](/core-resources/actions)\
    Article series: [Workflows](/help-guides/logic/workflows)
