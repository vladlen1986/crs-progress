# View properties
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/view-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Visual

### Size

#### Default view size

By default, the view element is sized to match a specific device's screen dimensions. You can select a device model from a dropdown to use its screen resolution as the canvas dimensions in the editor.

#### Builder width

Shows the width of the currently selected view size as a pixel value.

#### Min height (px)

Shows the minimum height of the currently selected view size.

### Layout

#### Container layout

Defines how the container element positions and arranges its child elements.

You can choose a layout type (such as column, row, align, or fixed), control alignment behavior, and configure spacing. This includes properties for gap (space between child elements), padding (internal spacing), and margin (external spacing). Layout settings determine how the element behaves responsively and how it interacts with surrounding elements.

#### Column

Arranges child elements vertically, stacking them from top to bottom by default. You can change the

You can control vertical order, horizontal alignment, spacing between items (gap), and whether elements stretch to fill the available width.

#### Row

Arranges child elements horizontally, placing them side by side from left to right.

You can control horizontal order, vertical alignment, spacing between items (gap), and whether elements stretch to fill the available height.

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

### Configure

#### View type

The view element has four different view types:

<table><thead><tr><th width="162.86767578125">View Type</th><th>Description</th></tr></thead><tbody><tr><td>Scrollable</td><td>The default view type. Allows vertical scrolling.</td></tr><tr><td>Non-scrollable</td><td>A fixed-height view. Content is limited to the screen size.</td></tr><tr><td>Vertical list</td><td>A scrollable list of repeating content.</td></tr><tr><td>Section list</td><td>A grouped list (e.g., contacts grouped by first letter).</td></tr></tbody></table>

#### Page folder

Defines which folder the view is stored in.

{% hint style="info" %}
Page folders help you organize and categorize pages, views and reusable elements in the editor. They're **purely for structure and clarity during development** and **have no effect on how the app behaves at runtime**.
{% endhint %}

#### Screen

<table><thead><tr><th width="174.6015625">Property</th><th>Description</th></tr></thead><tbody><tr><td><strong>Show safe area</strong></td><td>When enabled, the view's content is inset to avoid the device's top and bottom safe area — the screen regions reserved for system UI elements.</td></tr><tr><td><strong>Show status bar</strong></td><td>When enabled, the device's status bar is visible while this view is active. The status bar displays system information such as the time, battery level, and network status.</td></tr></tbody></table>

#### Navigation

<table><thead><tr><th width="175.3046875">Property</th><th>Description</th></tr></thead><tbody><tr><td>Show top app bar</td><td>When enabled, the top app bar is visible while this view is active. The top app bar displays the view's title and navigation controls.</td></tr><tr><td>Show tab bar</td><td>When enabled, the tab bar is visible while this view is active. The tab bar appears at the bottom of the screen and lets users navigate between the app's main views.</td></tr><tr><td>Include as tab item</td><td>When enabled, this view is included as an item in the tab bar.</td></tr></tbody></table>

{% hint style="info" %}
**Include as tab item:** enabling *Include as tab item* automatically enables *Show tab bar*. You can't enable *Show tab bar* independently.
{% endhint %}

### Properties

Each view can hold custom properties that are accessible from workflows.

* The properties must be set in the **element property editor**.
  * You can assign a **label** and a **default value** to each property.
* You can **assign values** to the property using the [*Set current view's property*](/core-resources/bubble-workflows/bubble-actions/native-mobile-actions#set-property-of-current-view) action.

<table><thead><tr><th width="175.2633056640625">Property Type</th><th>Use</th></tr></thead><tbody><tr><td>Dynamic value</td><td>Can hold any data type or thing.</td></tr><tr><td>Color picker</td><td>Accepts hex codes or saved color variables.</td></tr><tr><td>Checkbox</td><td>A yes/no value (true/false).</td></tr></tbody></table>

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

The appearance section lets you control the opacity, rotation and radius (corner roundness) of the selected element(s).

#### Opacity

Opacity sets the transparency level of the selected element(s). At 100%, the element is fully opaque. At 0%, it is fully transparent (invisible).<br>

* **Opacity affects child elements**: If applied to a container, all child elements inherit the same opacity level.
* **Opacity does not collapse the element:** Even at 0%, the element still occupies space in the layout. Unlike hiding an element (using *This element is visible on page load*, a conditional visibility rule, or a hide/show action), opacity does not reduce the element’s width or height to zero.

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

### Options

#### Disable zooming

When enabled, the user can't pinch-to-zoom in the current view.

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

#### Time zone selection

{% hint style="info" %}
This property requires that you check the *Enable timezone override controls* and *Page* checkboxes under *Settings – General*.
{% endhint %}

Overrides the default browser-based time zone for this page. All date and time elements on the page will use the selected time zone.

[^1]: "Alt text" is short for **alternative text**. It's a written description of an image used by screen readers for visually impaired users, displayed when an image fails to load, and read by search engines to understand what an image depicts.
