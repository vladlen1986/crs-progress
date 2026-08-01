# Vertical list
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/vertical-list · Captured: 2026-07-28 (verbatim from manual.bubble.io llms-full.txt)

The vertical list is a view type. It's not added from the element palette, but instead by setting the view type of a view to vertical list. A vertical list displays a list of repeating items in a vertical stack. It uses a single reusable list item template, and is best for longer scrolling screens like task lists or news feeds.

## Visual

### Content

#### Type of content

The type of content you want to display in the vertical list.

#### Data source

The data source that you want to load into the vertical list.

### Layout

#### Gap

Sets the distance between items in the vertical list, as a pixel value.

#### Padding

Defines the internal spacing between an element’s content and its border in a static pixel value. Padding adds space inside the element, without affecting its position relative to other elements.

Padding is added on the vertical and horizontal axis respectively.

### Configure

#### Separators

**Style**

<table><thead><tr><th width="136.5078125">Style</th><th>Description</th></tr></thead><tbody><tr><td>None</td><td>No separator is shown between items.</td></tr><tr><td>Inset</td><td>A separator is shown between items, indented from the leading edge.</td></tr><tr><td>Full</td><td>A separator spans the full width between items.</td></tr></tbody></table>

**Width**

You can set the width of the separators as a pixel value, or as *harline.* This is the thinnest line a screen can render, which varies by device — on high-density displays (such as Apple's Retina) it can be thinner than a full pixel. A pixel width of 1 is always exactly one device-independent pixel, which may appear thicker than a hairline on high-density screens.

**Color**

Sets the color of the separators.

#### Snapping

Snapping controls how the list settles when the user stops scrolling. Instead of free-scrolling and stopping wherever momentum ends, a snapping list comes to rest at a defined point - on an individual item or on a full page of content. Bubble reads your layout settings (item size, padding, and gaps) and applies the correct native snapping behavior automatically.

**Snap mode**

<table><thead><tr><th width="120">Option</th><th>Description</th></tr></thead><tbody><tr><td>None</td><td>The default. The list scrolls freely and stops wherever the user's scroll momentum ends.</td></tr><tr><td>Item</td><td>The list settles on the nearest item after each swipe. Best for card carousels, media rows, and scrollable galleries. Requires a fixed item size (see note below).</td></tr><tr><td>Page</td><td>Each swipe advances one full screen of content. The list item is sized automatically - its height is set to fill the screen. Best for onboarding walkthroughs, full-bleed galleries, and vertical video-style feeds.</td></tr></tbody></table>

{% hint style="info" %}
**Item snapping requires a fixed item size.** Items that fit to their content don't have a known size until they render, so their snap positions can't be calculated in advance. If you select *Item* while the list item is set to fit to content, the editor displays an error prompting you to set a fixed size. Page mode doesn't have this requirement, since it sizes items to the screen automatically.
{% endhint %}

**Snap alignment**

Applies to *Item* snapping only. Sets where the snapped item comes to rest in the list.

<table><thead><tr><th width="120">Option</th><th>Description</th></tr></thead><tbody><tr><td>Start</td><td>Items line up with the leading edge of the list - the classic carousel look.</td></tr><tr><td>Center</td><td>The active item stays centered in the viewport. Works well for hero or featured content.</td></tr></tbody></table>

**Deceleration rate**

Sets how quickly the list settles onto a snap point after a swipe.

<table><thead><tr><th width="120">Option</th><th>Description</th></tr></thead><tbody><tr><td>Fast</td><td>The list stops crisply on the next snap point. Usually the right choice for carousels.</td></tr><tr><td>Normal</td><td>Keeps the platform's natural scroll momentum - a flick coasts before settling. The longer glide tends to feel better for vertical page-style feeds. Vertical lists default to Normal.</td></tr></tbody></table>

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

When enabled, the list scrolls in the opposite direction. New items appear at the bottom and the list starts scrolled to the end.

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
