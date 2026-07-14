# Bubble-made plugin element properties
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/web-element-properties/bubble-made-plugin-element-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Circle Music Player

The Circle Music Player plugin element provides an audio player for playing sound files in your app. It displays playback controls in a radial interface and can be used for music, voice recordings, or other audio content.

### Content

#### Song file

Specifies the audio file to play. You can upload a file or reference a dynamic file source. Click the + icon to add a dynamic expression.

### Size

Sets the width and height of the element.

| Property   |            |                                                                                    |
| ---------- | ---------- | ---------------------------------------------------------------------------------- |
| **Width**  |            |                                                                                    |
|            | Responsive | Sets a max and min width. The element will adjust according to its parent element. |
|            | Fixed      | Sets a fixed pixel value.                                                          |
| **Height** | Fixed      | Sets a fixed pixel value.                                                          |

### Layout

{% hint style="info" %}
The layout properties below describe the properties of children. For more information about the layout properties of containers, see the article below:

[Containers](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties)
{% endhint %}

#### Alignment

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Spacing

#### Margin

Defines the external spacing between an element and surrounding elements.

Margin adds space outside the element’s border. It affects the distance between elements and influences layout positioning.

### Configure

#### Starts at (seconds)

Defines the playback starting point in seconds.

#### Ends at (seconds)

Defines the point in seconds where playback should stop.

#### Prevent the user from using the player

Disables user interaction with the player when enabled.

#### Autoplay when a new song is set

Automatically starts playback when a new audio file is assigned to the element.

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

### Interaction

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

## CommandBar Metadata

### Configure

#### Key

Defines the metadata key sent to the CommandBar service. The key identifies the metadata field and determines how the value is interpreted by CommandBar.

#### Value

Sets the value associated with the specified key. This can be a static value or a dynamic expression.

### Layout

#### Position

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Order

Sets the order of the element in the element tree hierarchy.

* **Make first:** Moves the element to the top of the hierarchy within its container
* **Move up:** Moves the element one position higher
* **Move down:** Moves the element one position lower
* **Make last:** Moves the element to the bottom of the hierarchy within its container

#### Spacing

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

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

## CommandBar Launcher

### Configure

#### Color

Sets the text and icon color of the CommandBar launcher.

#### Background color

Defines the background color of the launcher element.

#### Border

Sets the color of the launcher’s border.

#### Border-width

Defines the thickness of the border in pixels.

#### Shortcut-color

Sets the color of the keyboard shortcut indicator displayed in the launcher.

#### Shortcut-background-color

Defines the background color of the keyboard shortcut indicator.

### Layout

{% hint style="info" %}
The layout properties below describe the properties of children. For more information about the layout properties of containers, see the article below:

[Containers](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties)
{% endhint %}

#### Alignment

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Spacing

#### Margin

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

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

## CommandBar CallBack

### Callback name

### Layout

#### Alignment

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Spacing

#### Margin

Defines the external spacing between an element and surrounding elements.

Margin adds space outside the element’s border. It affects the distance between elements and influences layout positioning.

Specifies the name of the CommandBar callback to listen for. When CommandBar triggers this callback, the corresponding workflow in Bubble can run. The name must match the callback configured in CommandBar.

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

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

## Google Material Icon

{% hint style="info" %}
The [*Icon element*](/core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/icon-element) has been updated to also include the Material Icon library.
{% endhint %}

Let's you add icons from Google's Material Icon collection.

### Content

#### Icon

Sets the icon you want to display.

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

#### Position

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Order

Sets the order of the element in the element tree hierarchy.

* **Make first:** Moves the element to the top of the hierarchy within its container
* **Move up:** Moves the element one position higher
* **Move down:** Moves the element one position lower
* **Make last:** Moves the element to the bottom of the hierarchy within its container

#### Spacing

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

### Icon

Defines the color settings of the icon.

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

### Icon shadow

Sets the shadow of the icon.

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

### Workflows

Shows the workflows connected to the selected element. Click the + symbol to create a new workflow associated with that element. The list of available events differs based on which element is selected.

{% hint style="info" icon="keyboard" %}
**Shortcut:** To quickly add a workflow to a selected element, press Cmd+K on macOS or Ctrl+K on Windows. The shortcut defaults to the most likely event for that element type.
{% endhint %}

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

### Options

#### Make clickable

Makes the icon clickable, allowing you to trigger workflows.

#### Make the icon spin

Makes the icon rotate continously, typically used for loading spinners.

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

**Tooltip text (on hover)**

Displays a short text label when the user hovers over the text.

A unique identifier assigned to the element. This can be used to reference the element in custom code, such as JavaScript or CSS, using `document.getElementById()` or CSS selectors.

{% hint style="info" %}
For this property to be visible, you need to enable *Expose the option to add an ID attribute to HTML elements* in *Settings – Advanced options.*
{% endhint %}

## Facebook Like

The Facebook Like plugin element embeds Facebook’s Like button in your app. It allows users to like and share a page or URL directly through their Facebook account.

### Size

Sets the width and height of the element.

<table><thead><tr><th width="116.63751220703125">Property</th><th>Description</th></tr></thead><tbody><tr><td>Width</td><td>Sets the width as a fixed pixel value.</td></tr><tr><td>Height</td><td>Sets the height as a fixed pixel value.</td></tr></tbody></table>

### Layout

{% hint style="info" %}
The layout properties below describe the properties of children. For more information about the layout properties of containers, see the article below:

[Containers](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties)
{% endhint %}

#### Alignment

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Spacing

#### Margin

Defines the external spacing between an element and surrounding elements.

Margin adds space outside the element’s border. It affects the distance between elements and influences layout positioning.

### Configure

#### Link to like

Specifies the URL that the Like button is associated with.

#### Action

Defines the type of interaction displayed by the button.

* **Like**: Standard Facebook Like action.
* **Recommend**: Displays a *Recommend* action instead of *Like*.

#### Color scheme

Sets the visual theme of the button.

* **Light**
* **Dark**

#### Layout

Defines how the Like button and related information are displayed.

<table><thead><tr><th width="146.8636474609375">Option</th><th>Description</th></tr></thead><tbody><tr><td>Standard</td><td>Displays the Like button with a small counter next to it.</td></tr><tr><td>Button count</td><td>Shows the Like button with the total number of likes displayed beside it.</td></tr><tr><td>Button</td><td>Displays only the Like button without any counter.</td></tr><tr><td>Box count</td><td>Shows the Like button with the like count displayed above the button.</td></tr></tbody></table>

#### Share button

Displays a Share button alongside the Like button.

#### Show faces

Shows user faces alongside the Like button.

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

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

## Facebook Page

The Facebook Page plugin element embeds a Facebook Page preview in your app. It allows users to view and interact with a Facebook Page directly from your interface.

### Content

#### Page link

Specifies the URL of the Facebook Page to display.

### Size

Sets the width and height of the element.

<table><thead><tr><th width="116.63751220703125">Property</th><th>Description</th></tr></thead><tbody><tr><td>Width</td><td>Sets the width as a fixed pixel value.</td></tr><tr><td>Height</td><td>Sets the height as a fixed pixel value.</td></tr></tbody></table>

### Layout

#### Position

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Order

Sets the order of the element in the element tree hierarchy.

* **Make first:** Moves the element to the top of the hierarchy within its container
* **Move up:** Moves the element one position higher
* **Move down:** Moves the element one position lower
* **Make last:** Moves the element to the bottom of the hierarchy within its container

#### Spacing

**Padding**

Defines the internal spacing between an element’s content and its border in a static pixel value. Padding adds space inside the element, without affecting its position relative to other elements.

Padding is added on the vertical and horizontal axis respectively.

**Margin**

Defines the external spacing between an element and surrounding elements.

Margin adds space outside the element’s border. It affects the distance between elements and influences layout positioning.

### Configure

#### Hide page cover

Hides the Facebook Page cover image when enabled.

#### Show faces

Displays profile pictures of users who like the page.

#### Show posts

Displays the page’s timeline posts within the embedded element.

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

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

## LottieFiles

The LottieFiles element displays Lottie animations in your app.

Lottie animations are lightweight, JSON-based animations. Unlike video or GIF files, Lottie animations are vector-based, which keeps file sizes small and allows them to scale cleanly across different screen sizes.

The element lets you embed and control these animations directly in your app, with options for autoplay, looping, playback speed, and interaction triggers such as click or hover.

### Configure

#### Animation File/Url

Specifies the Lottie animation to display. You can upload a Lottie JSON file or provide a URL to a hosted animation. Click the + icon to add a dynamic expression.

#### Controls

Displays playback controls for the animation, allowing users to play, pause, or restart it.

#### Autoplay

Starts the animation automatically when it loads.

#### Speed

Sets the playback speed of the animation.

{% hint style="info" %}
The Lottie player accepts any numeric value, but extremely high or negative values may not behave as expected.
{% endhint %}

| Value | Description                                          |
| ----- | ---------------------------------------------------- |
| `1`   | Plays the animation at normal speed.                 |
| `< 1` | Slows down the animation (e.g., `0.5` = half speed). |
| `> 1` | Speeds up the animation (e.g., `2` = double speed).  |

#### Loop

Repeats the animation continuously after it finishes.

#### Background

Defines the background color displayed behind the animation. Color variables and dynamic expressions are supported. Click the + icon to add a dynamic expression.

#### Play

Specifies when the animation should start playing.

<table><thead><tr><th width="121.73931884765625">Option</th><th>Description</th></tr></thead><tbody><tr><td>Page Load</td><td>Starts the animation automatically when the page loads.</td></tr><tr><td>Click</td><td>Plays the animation when the element is clicked.</td></tr><tr><td>Hover</td><td>Plays the animation when the user hovers over the element.</td></tr></tbody></table>

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

#### Position

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Order

Sets the order of the element in the element tree hierarchy.

* **Make first:** Moves the element to the top of the hierarchy within its container
* **Move up:** Moves the element one position higher
* **Move down:** Moves the element one position lower
* **Make last:** Moves the element to the bottom of the hierarchy within its container

#### Spacing

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

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

## SlideBarMenu

The SlideBarMenu plugin adds a sliding navigation menu that appears from the side of the screen.

### Size

Sets the width and height of the element.

<table><thead><tr><th width="116.63751220703125">Property</th><th>Description</th></tr></thead><tbody><tr><td>Width</td><td>Sets the width as a fixed pixel value.</td></tr><tr><td>Height</td><td>Sets the height as a fixed pixel value.</td></tr></tbody></table>

### Layout

#### Position

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Order

Sets the order of the element in the element tree hierarchy.

* **Make first:** Moves the element to the top of the hierarchy within its container
* **Move up:** Moves the element one position higher
* **Move down:** Moves the element one position lower
* **Make last:** Moves the element to the bottom of the hierarchy within its container

#### Spacing

**Padding**

Defines the internal spacing between an element’s content and its border in a static pixel value. Padding adds space inside the element, without affecting its position relative to other elements.

Padding is added on the vertical and horizontal axis respectively.

**Margin**

Defines the external spacing between an element and surrounding elements.

Margin adds space outside the element’s border. It affects the distance between elements and influences layout positioning.

### Configure

#### Options

Defines the list of menu items displayed in the sidebar. Each option should be placed on a new line. To add dynamic content, hover the *Options* input field and click the + icon.

#### Opening side

Specifies which side of the screen the menu opens from. Left or right.

#### Show an icon

Displays an icon for the menu trigger button.

#### Icon color

Sets the color of the menu icon. *Show an icon* (above) needs to be enabled.

#### Menu width

Defines the width of the sidebar menu in pixels.

#### Distance from top

Sets the vertical offset from the top of the page where the menu starts.

#### Background color

Defines the background color of the sidebar menu. Supports color variables and dynamic expressions. Click the + symbol to add a dynamic expression.

#### Option hover color

Sets the background color applied to menu items when the user hovers over them. Click the + symbol to add a dynamic expression.

#### Menu font color

Defines the text color used for the menu options. Click the + symbol to add a dynamic expression.

#### Shadow offset

Sets the offset distance of the menu’s shadow.

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

### Text

Sets the typography of the selected element(s). Only applies to elements that contain text.

#### Font

Sets the font family used for the text. You can choose a custom font or use a saved font variable.

#### Font weight

Sets the thickness of the text. Lower values (for example, 400) are lighter, while higher values (for example, 600 or 700) appear bolder.

<details>

<summary>Understanding font weight</summary>

Font weight is not calculated mathematically. It’s defined by the font itself.

Most modern fonts use a numeric weight scale from 100 to 900:

* **100–300:** lighter weights
* **400:** regular (normal)
* **500–600:** medium / semi-bold
* **700:** bold
* **800–900:** extra bold / black

However, available weights differ between fonts. One font might include 400, 600, and 700, while another only includes 400 and 700. A weight of 700 in one font is also not guaranteed to look the same as 700 in another font.

The numeric scale (100–900) is standardized in CSS, but each font designer defines how thick “700” actually appears within that typeface.

</details>

#### Font size

Defines the size of the text in pixels.

#### Text alignment

Controls how text is aligned within the element: left, center, or right.

#### Text formatting

Applies inline formatting options such as bold, italic, and underline. Click the *More properties* icon for more formatting options.

<figure><img src="/files/jqsvl6Ysx1aqCTrV2eY1" alt="" width="96"><figcaption></figcaption></figure>

<details>

<summary>Additional text properties</summary>

**Word spacing**

Defines the horizontal space between words. Increasing the value spreads words further apart; decreasing it brings them closer together.

**Line spacing**

Controls the vertical distance between lines of text (line height). Higher values improve readability for longer text blocks, while lower values create a more compact layout.

**Letter spacing**

Adjusts the horizontal space between individual characters. Positive values increase spacing (tracking), while negative values tighten the text.

**Text alignment (vertical)**

Controls how text is aligned vertically within its container (for example, aligned to the top or bottom when vertical alignment is enabled).

**Text shadow**

Adds a shadow effect behind the text. You can configure properties such as offset, blur, and color to create depth or improve contrast against the background.

</details>

#### Text color

Sets the color of the text. You can select a custom color or use a saved color variable.

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

## Stripe

The Stripe plugin adds elements for integrating Stripe’s hosted payment interfaces into your app.

These elements allow you to embed Stripe’s **Customer Portal** and **Pricing Table** directly in your app’s interface. Both elements use Stripe-hosted components, meaning the payment logic and UI are handled by Stripe while your app controls when and where they are displayed.

## Stripe customer portal

### Configure

#### Customer Portal Id

Specifies the ID of the Stripe Customer Portal configuration to use. This determines the settings and features available in the portal session.

#### Email

Sets the email address associated with the Stripe customer.

#### Stripe Id

Defines the Stripe customer ID used to identify the customer in Stripe.

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

#### Alignment

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Spacing

#### Margin

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

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

## Stripe price table

### Configure

#### Pricing Page Id

Specifies the ID of the Stripe Pricing Table to display. This ID is generated in Stripe when you create a pricing table.

#### Email

Sets the customer’s email address. When provided, Stripe pre-fills the email field during checkout.

#### Stripe Id

Defines the Stripe customer ID. If provided, the checkout session will be associated with the existing Stripe customer.

#### Quantity

Sets the quantity for the selected product or price.

#### Coupon

Applies a coupon code to the checkout session.

#### Charge Later

Enables delayed payment collection for the subscription or purchase, if supported by the configured Stripe product.

#### Custom Button Link

Defines a custom link used by the pricing table’s call-to-action button.

#### Client Reference Id

Sets a reference ID for the checkout session. This value can be used to associate the session with an internal user or record in your app.

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

#### Alignment

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Spacing

#### Margin

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

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

## Tinder-like pile

The Tinder-like pile plugin adds a swipeable card stack similar to the interaction pattern used in apps like Tinder. Users can swipe cards left or right to trigger actions such as liking or disliking items.

### Content

#### Type of content

Defines the type of thing displayed in each card.

#### Data source

Specifies the list of things used to generate the card stack.

### Size

Sets the width and height of the element.

<table><thead><tr><th width="116.63751220703125">Property</th><th>Description</th></tr></thead><tbody><tr><td>Width</td><td>Sets the width as a fixed pixel value.</td></tr><tr><td>Height</td><td>Sets the height as a fixed pixel value.</td></tr></tbody></table>

### Layout

{% hint style="info" %}
The layout properties below describe the properties of children. For more information about the layout properties of containers, see the article below:

[Containers](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties)
{% endhint %}

#### Alignment

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Spacing

#### Margin

Defines the external spacing between an element and surrounding elements.

Margin adds space outside the element’s border. It affects the distance between elements and influences layout positioning.

### Configure

#### Show card title

Displays the card title when enabled.

#### Picture caption

Defines the text displayed as a caption on the card image.

#### Card background color

Sets the background color of the card.

#### Border width

Defines the thickness of the card border.

#### Title color

Sets the color of the card title text.

#### Image when liked

Specifies the image displayed when a card is swiped in the "like" direction.

#### Image when disliked

Specifies the image displayed when a card is swiped in the "dislike" direction.

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

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-2)[^2]. This checkbox makes the element visible every time the page loads or reloads[^3]. Change the visibility of the element based on certain conditions[^4] in the Conditional section in the property editor or with a show/hide element action[^5] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

[^1]: "Alt text" is short for **alternative text**. It's a written description of an image used by screen readers for visually impaired users, displayed when an image fails to load, and read by search engines to understand what an image depicts.

[^2]: Visible by default means that the element is visible when you load/reload the page.

[^3]: The exception is is if you use the Go to page action and go to the same page you are currently on – in this case the element will keep its current visibility, since the page is not refreshed.

    Reference: [Action: Go to page](https://manual.bubble.io/core-resources/bubble-elements/element-properties/web-element-properties/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)<br>

    Reference: [Action: Refresh page](/core-resources/actions/navigation#refresh-the-page)

[^4]: *Conditions* are appliead to elements to make them change their apperance or behavior based on a specific condition. Conditions are built using dynamic expressions.<br>

    Article: [Conditions](/help-guides/logic/conditions)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^5]: An *action* is the part of a workflow that performs a specific task, such as making changes in the database, hiding/showing elements and sending API requests.\
    \
    Reference: [List of actions](/core-resources/actions)\
    Article series: [Workflows](/help-guides/logic/workflows)
