# Table row/column
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element/table-row-column · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Sets the properties of the first row and column of the [table element](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element). This row/column is

## Visual

### Size

Sets the width and height of the element. These properties depend on the layout configuration of the parent element.

#### Width/height

Sets the width/height of the column/row

<table><thead><tr><th width="88.7940673828125">Type</th><th width="292.85443115234375">Description</th><th>Options</th></tr></thead><tbody><tr><td>Fixed</td><td>Sets the width/height of the column/row as a fixed value.</td><td><ul><li><strong>Pixels:</strong> sets a fixed pixel value</li><li><strong>Percentage</strong>: sets the value to a percentage of the table.</li></ul></td></tr><tr><td>Fit</td><td>The column/row's width and height automatically adjust based on the size of its child elements.</td><td><ul><li><strong>Min:</strong> the minimum width/height, defined as a pixel value or percentage of the table.</li><li><strong>Max:</strong> the maximum width/height, defined as a pixel value or percentage of the table.</li></ul></td></tr><tr><td>Fill</td><td>The row/columns's width and height fills the available space in the table.</td><td><ul><li><strong>Min:</strong> the minimum width/height, defined as a pixel value or percentage of the table.</li><li><strong>Max:</strong> the maximum width/height, defined as a pixel value or percentage of the table.</li></ul></td></tr></tbody></table>

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

## Interaction

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

### Workflows

Shows the workflows connected to the selected element. Click the + symbol to create a new workflow associated with that element. The list of available events differs based on which element is selected.

{% hint style="info" icon="keyboard" %}
**Shortcut:** To quickly add a workflow to a selected element, press Cmd+K on macOS or Ctrl+K on Windows. The shortcut defaults to the most likely event for that element type.
{% endhint %}

### Options

#### Make clickable

Allows the row/column itself to be clickable and trigger workflows. When enabled, you can attach click events directly to the row/column.

#### Make column/row sticky

Makes the column/row stick to the top/side of the table element as the user scrolls.

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

[^3]: The exception is is if you use the Go to page action and go to the same page you are currently on – in this case the element will keep its current visibility, since the page is not refreshed.

    Reference: [Action: Go to page](https://manual.bubble.io/core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)<br>

    Reference: [Action: Refresh page](/core-resources/actions/navigation#refresh-the-page)

[^4]: *Conditions* are appliead to elements to make them change their apperance or behavior based on a specific condition. Conditions are built using dynamic expressions.<br>

    Article: [Conditions](/help-guides/logic/conditions)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^5]: An *action* is the part of a workflow that performs a specific task, such as making changes in the database, hiding/showing elements and sending API requests.\
    \
    Reference: [List of actions](/core-resources/actions)\
    Article series: [Workflows](/help-guides/logic/workflows)
