# Horizontal list element (mobile)
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/horizontal-list-element-mobile · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

A horizontal-scrolling list that displays items side by side. It can only be used as an element inside another view, not as a standalone view. The element consists of a parent (the full list) and a child (the list item, which is repeated for each entry in the list).

## Visual

### Content

#### Type of content

Defines the data type that you want to display in the horizontal list, such as *users*.

#### Data source

Specifies the list of items to display. The expression must return a list of the selected *Type of content*. For example, if you want to show a list of users, you can use a dynamic expression that returns a list: *`Do a search for:Users`.*

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

{% hint style="info" %}
The layout properties below describe the properties of children. For more information about the layout properties of containers, see the article below:

[Containers](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties)
{% endhint %}

#### Position

**Parent layout: Column**

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

**Parent layout: Row**

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

**Parent layout: Fixed**

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Spacing

**Gap**

Sets the gap between items in the list, as a pixel value.

**Padding**

Defines the internal spacing between an element’s content and its border in a static pixel value. Padding adds space inside the element, without affecting its position relative to other elements.

Padding is added on the vertical and horizontal axis respectively.

**Margin**

Defines the external spacing between an element and surrounding elements.

Margin adds space outside the element’s border. It affects the distance between elements and influences layout positioning.

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

#### Opacity

Opacity sets the transparency level of the selected element(s). At 100%, the element is fully opaque. At 0%, it is fully transparent (invisible).<br>

* **Opacity affects child elements**: If applied to a container, all child elements inherit the same opacity level.
* **Opacity does not collapse the element:** Even at 0%, the element still occupies space in the layout. Unlike hiding an element (using *This element is visible on page load*, a conditional visibility rule, or a hide/show action), opacity does not reduce the element’s width or height to zero.

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

### Workflows

Shows the workflows connected to the selected element. Click the + symbol to create a new workflow associated with that element. The list of available events differs based on which element is selected.

{% hint style="info" icon="keyboard" %}
**Shortcut:** To quickly add a workflow to a selected element, press Cmd+K on macOS or Ctrl+K on Windows. The shortcut defaults to the most likely event for that element type.
{% endhint %}

## Visible on view load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the view loads. Change the visibility of the element based on certain conditions[^3] in the Conditional section in the property editor or with a show/hide element action[^4] in a workflow.

## Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

### Options

#### Enable reverse scroll

Reverses the scroll direction of the horizontal list. When enabled, items render in the opposite order, and scrolling moves from right to left instead of left to right.

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

[^1]: "Alt text" is short for **alternative text**. It's a written description of an image used by screen readers for visually impaired users, displayed when an image fails to load, and read by search engines to understand what an image depicts.

[^2]: Visible by default means that the element is visible when you load/reload the page.

[^3]: *Conditions* are appliead to elements to make them change their apperance or behavior based on a specific condition. Conditions are built using dynamic expressions.<br>

    Article: [Conditions](/help-guides/logic/conditions)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^4]: An *action* is the part of a workflow that performs a specific task, such as making changes in the database, hiding/showing elements and sending API requests.\
    \
    Reference: [List of actions](/core-resources/actions)\
    Article series: [Workflows](/help-guides/logic/workflows)
