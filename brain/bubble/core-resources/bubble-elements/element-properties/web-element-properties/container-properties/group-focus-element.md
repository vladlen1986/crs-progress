# Group focus element
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/web-element-properties/container-properties/group-focus-element · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

A *Group Focus* is a contextual container that appears relative to another element on the page. It’s positioned dynamically based on a reference element and is typically used for temporary, contextual UI. For example, when a user clicks a button or icon, the Group Focus can appear anchored to that element’s position on the page.

A Group Focus does not take up space in the page layout. Instead, it overlays the interface and is shown or hidden using workflow actions. It automatically disappears if you click anywhere outside of the Group Focus.

Typical use cases:

* Dropdown menus triggered by a button/icon
* Tooltips that appear on hover or click
* Contextual action menus (for example, “Edit” / “Delete” options)
* Inline detail panels tied to a specific item

Use a Group Focus when you need contextual content that should appear anchored to a specific element without affecting the surrounding layout.

## Visual

### Content

#### Type of content

This property defines the type of data the floating group holds. In most cases, elements that include a *Type of content* property also include a *Data source* property, which specifies the thing to contain (such as a specific user or other data type).

#### Data source

Defines the thing displayed in the group focus. The *Type of content* property determines what kind of data can be set as the data source.

Child elements can reference the parent’s data source by using the `Parent group's thing` data source.

A data source can come from any valid expression in Bubble, such as a search, an option set option, the result a dynamic expression or a static thing like a string of text. It updates automatically when the underlying expression changes.

The value returned by the data source must match the selected type of content.

### Size

Sets the width and height of the element. These properties depend on the layout configuration of the parent element.

**Height**

Sets the width/height of the element. The column, row and align layouts have a more flexible way to set element position.

<table><thead><tr><th width="88.7940673828125">Type</th><th width="292.85443115234375">Description</th><th>Options</th></tr></thead><tbody><tr><td>Fixed</td><td>Sets the width of the element as a fixed value.</td><td><ul><li><strong>Pixels:</strong> sets the width to a fixed pixel value</li><li><strong>Percentage</strong>: sets the width to a percentage of the parent container</li></ul></td></tr><tr><td>Fit</td><td>The element’s width and height automatically adjust based on the size of its child elements. To add a mininum and/or maximum value, click the + symbol.</td><td><ul><li><strong>Min:</strong> the minimum width/height, defined as a pixel value or percentage of the parent container.</li><li><strong>Max:</strong> the maximum width/height, defined as a pixel value or percentage of the container.</li></ul></td></tr><tr><td>Fill</td><td>The element's width and height fills the available space in the parent container. To add a mininum and/or maximum value, click the + symbol.</td><td><ul><li><strong>Min:</strong> the minimum width/height, defined as a pixel value or percentage of the parent container.</li><li><strong>Max:</strong> the maximum width/height, defined as a pixel value or percentage of the container.</li></ul></td></tr></tbody></table>

#### Parent container has a fixed layout

**Width/height**

Sets the widht/height of the element. The fixed layout has a more rigid way of setting element size, based on static pixel values.

<table><thead><tr><th width="142.40234375">Type</th><th>Description</th></tr></thead><tbody><tr><td>Fixed</td><td>Sets the width of an element as a fixed pixel value.</td></tr></tbody></table>

### Layout

#### Container layout

Defines how the container element positions and arranges its child elements.

You can choose a layout type (such as column, row, align, or fixed), control alignment behavior, and configure spacing. This includes properties for gap (space between child elements), padding (internal spacing), and margin (external spacing). Layout settings determine how the element behaves responsively and how it interacts with surrounding elements.

<figure><img src="/files/djLCP071HFMNUG0TriIz" alt="" width="226"><figcaption></figcaption></figure>

#### Column

Arranges child elements vertically, stacking them from top to bottom by default. You can change the

You can control vertical order, horizontal alignment, spacing between items (gap), and whether elements stretch to fill the available width.

#### Row

Arranges child elements horizontally, placing them side by side from left to right.

You can control horizontal order, vertical alignment, spacing between items (gap), and whether elements stretch to fill the available height.

#### Align

Places child elements freely within a defined alignment 3x3 grid.

This layout allows positioning elements relative to the container (for example, top-left, center, bottom-right).

#### Fixed

Positions child elements using explicit X and Y coordinates.

Elements are placed at fixed pixel positions within the container. This layout does not automatically adjust based on content flow and offers the least responsive flexibility.

#### Alignment

<figure><img src="/files/0gwJrlaXtEvCiB8U2ggR" alt="" width="236"><figcaption></figcaption></figure>

This setting applies to **column/row layouts**.

Column and row layouts support different alignment modes that control how child elements are positioned along the main and cross axes.

#### Top/left (start)

Aligns child elements to the start of the container.

* In a column layout, elements align to the top.
* In a row layout, elements align to the left.

#### Center

Aligns child elements to the center of the container along the relevant axis.

* In a column layout, elements are centered horizontally.
* In a row layout, elements are centered vertically.

#### Right/bottom (end)

Aligns child elements to the end of the container.

* In a column layout, elements align to the bottom.
* In a row layout, elements align to the right.

#### Space between

Distributes child elements evenly, with equal space between them and no extra space at the edges of the container.

#### Space around

Distributes child elements evenly, with equal space around each element. This results in half-sized spacing at the container’s edges compared to the space between elements.

#### Element position

Moves the element to a different position in the hierarchy. The hierarchy is contained within the element's container (a container element or the page).

* **Make first:** Sets the element as the first element in the hierarchy.
* **Move up:** Moves the element one position higher in the hierarchy.
* **Move down:** Moves the element one position lower in the hierarchy.
* **Make last:** Sets the element as the first element in the hierarchy.

#### Spacing

#### Gap (column and row layout)

Defines the space between child elements inside a container.

The gap is applied between items in a column or row layout. It does not add space before the first element or after the last element — only between siblings.

* In a **column layout**, the gap controls vertical spacing.
* In a **row layout**, it controls horizontal spacing.

{% hint style="info" %}
If child elements also have margins, **the gap and margin values are cumulative**. For example, a container with a 10 px gap and a child element with a 10 px margin between items will result in 20 px of total space between those elements.
{% endhint %}

#### Padding

Defines the internal spacing between an element’s content and its border in a static pixel value. Padding adds space inside the element, without affecting its position relative to other elements.

Padding is added on the vertical and horizontal axis respectively.

### Configure

#### Reference element

Defines which element the Group Focus is positioned relative to.

#### Offset top

Adds vertical spacing between the group focus and its reference element. A positive value moves the group focus further down from the anchor point, while a negative value moves it upward.

#### Offset left

Adds horizontal spacing between the group focus and its reference element. A positive value moves the group focus to the right, while a negative value moves it to the left.

{% hint style="info" %}
The offset properties support negative values (such as -25).
{% endhint %}

### Style

Style sets the visual design of the element, including properties such as colors, fonts, borders, shadows and other appearance settings.

Styles are shared across elements. When multiple elements use the same style, updating the style will automatically update all elements that reference it.

#### Style selector

<figure><img src="/files/qOm95FlK4JjiWXK4RCRk" alt="" width="346"><figcaption></figcaption></figure>

Select the style to apply to the selected element.

#### Edit style

<figure><img src="/files/9eP78pNgjAHJ7gH89yyA" alt="" width="101"><figcaption></figcaption></figure>

To edit the style, click the edit style icon. The changes to that style will apply to all elements using that style.

#### **Detach style**

Detaching the style will disconnect the element from the current style, but keep the formatting of the style until you make changes to it. This only affects the selected element.

<figure><img src="/files/VIKhZiGdxA5M5Rd8w5bc" alt="" width="98"><figcaption></figcaption></figure>

#### **Overriden styles**

You can override a style on one or more elements, using the defined style properties but allowing you to make individual changes to styling properties that apply only to the selected element(s).

Overridden styles will be marked with an *Overridden labelI.*

<figure><img src="/files/xmfBpmZLbuyJGpZpxHCL" alt="" width="333"><figcaption></figcaption></figure>

You can reset the selected element's style by clicking the *Reset* icon.

<figure><img src="/files/1SebZeSSTwBmyOpt10aI" alt="" width="99"><figcaption></figcaption></figure>

### Appearance

#### Radius

Sets the roundness of the selected element(s).

<details>

<summary>How radius is calculated</summary>

The value is applied in pixels and determines the radius of the corner’s arc. Larger values create more rounded corners.

The maximum visible roundness depends on the element’s size. If the radius is set to a value greater than half of the element’s width or height, the browser automatically caps it at half of the smallest dimension. For example:

* A square (100 × 100 px) with a radius of 50 px becomes a circle.
* A rectangle (200 × 100 px) with a radius of 50 px becomes a pill shape.
* Setting a radius larger than 50 px in the second example will not increase the curvature further, because 50 px is already half of the element’s height.

</details>

**Individual radius**

To set an individual radius of each of the four corners, click the Individual radius icon.

<figure><img src="/files/cRYSqKVEdVQP2mCW9Ob7" alt="" width="98"><figcaption></figcaption></figure>

### Border

The border defines the outline of the selected element.

It is drawn around the element’s content and padding. Increasing the border width increases the total visible size of the element unless the layout system compensates for it.

Borders sit outside the padding but inside the margin. Padding adds space between the content and the border, while margin adds space outside the border, affecting the distance to neighboring elements.

<details>

<summary>Border types</summary>

{% hint style="info" %}
**Note:** some of these border types require a width of more than 1 pixel to make a visible difference.
{% endhint %}

<table><thead><tr><th width="133.5390625">Border type</th><th>Description</th></tr></thead><tbody><tr><td>None</td><td>No border is displayed.</td></tr><tr><td>Solid</td><td>A single continuous line.</td></tr><tr><td>Dotted</td><td>A series of round dots forming the border line.</td></tr><tr><td>Dashed</td><td>A series of short line segments forming the border.</td></tr><tr><td>Double</td><td>Two parallel solid lines. The total border width is divided between the two lines and the space between them.</td></tr><tr><td>Groove</td><td>A carved effect that makes the border appear pressed into the page, using light and dark shading.</td></tr><tr><td>Ridge</td><td>The opposite of groove; creates a raised effect using light and dark shading.</td></tr><tr><td>Inset</td><td>Makes the element appear embedded into the page, with shading that simulates depth inward.</td></tr><tr><td>Outset</td><td>Makes the element appear raised from the page, with shading that simulates depth outward.</td></tr></tbody></table>

</details>

#### **Border width**

Sets the width of the border, defined by a pixel value.

#### **Border color**

Sets the color of the border in a hex value. You can also set the opacity of the border. Can be a static or the result of a dynamic expression.

#### **Individual borders**

To set individual border properties on the top, bottom, left and right, clitk the individual border icon.

<figure><img src="/files/cRYSqKVEdVQP2mCW9Ob7" alt="" width="98"><figcaption></figcaption></figure>

### Background

Sets the background of the selected element(s) as a color, gradient or image.

#### Color

Sets the background color in a hex value. You can also set the opacity of the border. Can be a static or the result of a dynamic expression.

#### Gradient

Sets a gradient color, ranging from a start color and an end color, with an optional mid color.

<details>

<summary>Linear gradient</summary>

A linear gradient is a background effect where colors transition gradually along a straight line.

The gradient follows a defined direction (for example, top to bottom, left to right, or at a specific angle). Instead of a single solid color, the element displays a smooth blend between two or more colors across that line.

<table><thead><tr><th width="157.4375">Starting point</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>The gradient begins at the top and transitions downward.</td></tr><tr><td>Left</td><td>The gradient begins on the left side and transitions horizontally to the right.</td></tr><tr><td>Bottom</td><td>The gradient begins at the bottom and transitions upward.</td></tr><tr><td>Right</td><td>The gradient begins on the right side and transitions horizontally to the left.</td></tr><tr><td>Custom</td><td>Allows you to define a specific angle for the gradient direction.</td></tr></tbody></table>

</details>

<details>

<summary>Radial gradient</summary>

A radial gradient is a background effect where colors transition outward from a central point.

Instead of following a straight line (like a linear gradient), the color spreads in a circular or elliptical shape from the center to the edges.

## Radial gradient types

<table><thead><tr><th width="129.05078125">Type</th><th>Description</th></tr></thead><tbody><tr><td>Circle</td><td>The gradient expands evenly in all directions from the center, forming a perfect circle.</td></tr><tr><td>Ellipse</td><td>The gradient expands in an oval shape, stretching more in one direction based on the element’s width and height.</td></tr></tbody></table>

## Radial gradient expansion

Define how far the radial gradient extends from its center point.

They control which edge or corner of the element determines the gradient’s final size, affecting how quickly the color transition spreads across the element.

<figure><img src="/files/2Bp5hieP0Y4tOpyRzN3B" alt="" width="302"><figcaption></figcaption></figure>

| Option          | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| Closest side    | The gradient expands from the center until it reaches the nearest side of the element.    |
| Closest corner  | The gradient expands from the center until it reaches the nearest corner of the element.  |
| Farthest side   | The gradient expands from the center until it reaches the farthest side of the element.   |
| Farthest corner | The gradient expands from the center until it reaches the farthest corner of the element. |

## Stops

Sets the start and end point of the radial gradient. By default, it has a *Start* and *End.* Optionally, you can add an intermediate point by clicking the + symbol next to *Stops.*

</details>

#### Image

Sets an image as the element's background. The image can be a static file uploaded directly in the editor, or the result of a dynamic expression.

**Upload**

Upload a static image file to use as the background.

**Generating an image with AI**

You can generate images with AI. Type in a prompt and select a size, quality, and style. The *Auto* setting lets the AI choose based on your prompt. The number of tokens used depends on your selections.

Check *Generate Alt tags* to automatically generate an [Alt text](#user-content-fn-1)[^1].

**Make dynamic**

Click the + icon to define a dynamic expression that returns the image to use as the background.

### Shadow

Adds an outside or inside shadow to the selected element(s).

#### Shadow type

Defines whether the shadow appears outside or inside the element.

* **Outside:** creates a drop shadow around the element.
* **Inside:** creates an inner shadow within the element’s boundaries.

#### Position (X / Y)

Sets the horizontal (X) and vertical (Y) offset of the shadow in pixels.

* Positive X moves the shadow to the right; negative X moves it to the left.
* Positive Y moves the shadow downward; negative Y moves it upward.

#### Blur

Controls how soft the shadow appears. Higher values create a more diffused shadow; lower values produce a sharper edge.

#### Spread

Defines how much the shadow expands or contracts before blur is applied. Positive values increase the shadow’s size; negative values reduce it.

#### Color

Sets the shadow’s color and opacity. You can define a custom color (for example, a hex value) and adjust its transparency percentage.

## Interaction

{% hint style="info" %}
**Visibility:** The group focus element is displayed by using the *Show an element* action, and does not have any visibility properties.
{% endhint %}

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

### Workflows

Shows the workflows connected to the selected element. Click the + symbol to create a new workflow associated with that element. The list of available events differs based on which element is selected.

{% hint style="info" icon="keyboard" %}
**Shortcut:** To quickly add a workflow to a selected element, press Cmd+K on macOS or Ctrl+K on Windows. The shortcut defaults to the most likely event for that element type.
{% endhint %}

### Advanced

A unique identifier assigned to the element. This can be used to reference the element in custom code, such as JavaScript or CSS, using `document.getElementById()` or CSS selectors.

{% hint style="info" %}
For this property to be visible, you need to enable *Expose the option to add an ID attribute to HTML elements* in *Settings – Advanced options.*
{% endhint %}

<details>

<summary>Group focus element: <strong>FAQ</strong></summary>

### How do I use a group focus in a repeating group/table?

A Group Focus is anchored to a single, specific element on the page. Because elements inside a Repeating Group or Table are duplicated for each row, you can’t directly attach one Group Focus to those repeated elements.

To use a Group Focus inside a Repeating Group or Table, place the Group Focus inside a reusable element instead. Then insert that reusable element into the cell.

Setup steps:

* Create a reusable element that contains the Group Focus
* Set the reusable element’s *Type of content* to match the Repeating Group or Table (for example, *User*)
* Inside the Repeating Group or Table cell, set the reusable element’s *Data source* to `Current cell's User` (or the relevant data type)

Each cell now contains its own instance of the reusable element, which means each row effectively has its own Group Focus anchored to elements inside that reusable. This allows the Group Focus to behave correctly for each individual row.

### How do I show a group focus?

A Group Focus is hidden by default and must be shown using a workflow action, such as *Show an element* or *Animate an element*. Unlike a standard Group, it doesn’t appear on page load unless explicitly triggered.

By default, a Group Focus automatically hides when the user clicks outside of it. If you also want it to close when the user clicks inside it (such as when selecting an option in a dropdown) you can use the *Hide an element* action in the relevant workflow to manually close it.

### When should I use a Group Focus instead of a Popup?

Use a Group Focus when:

* The content should appear anchored to a specific element
* The UI is contextual (for example, dropdowns or inline menus)
* You don’t want to block interaction with the rest of the page

Use a Popup when:

* The interaction should take focus away from the page
* You need a modal dialog
* Background interaction should be disabled

</details>

[^1]: "Alt text" is short for **alternative text**. It's a written description of an image used by screen readers for visually impaired users, displayed when an image fails to load, and read by search engines to understand what an image depicts.
