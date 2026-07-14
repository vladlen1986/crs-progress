# App bar element (mobile)
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/app-bar-element-mobile · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The app bar is a pseudo child element of the view element — it isn't added from the element palette, but enabled directly in the view's property editor.

It's automatically placed at the top of the screen, just below the top safe area, and is used for navigation controls, titles, and actions relevant to the current view.

## Visual

### Title

Shows the view element's current view title, or a custom title.

### Configure

#### Style iOS

Sets the style of the app bar on iOS devices:

<table><thead><tr><th width="142.3203125">Style</th><th>Description</th></tr></thead><tbody><tr><td>Center</td><td>The title is centered and displayed in a small font.</td></tr><tr><td>Large</td><td>The title is displayed in a larger font. Note that on smaller devices, the title can wrap more easily. We recommend testing this option on a few different screen size and keep the text short.</td></tr></tbody></table>

#### Style Android

Sets the style of the app bar on Android devices:

<table><thead><tr><th width="144.87890625"></th><th></th></tr></thead><tbody><tr><td>Center</td><td>The title is centered in the app bar, and the back button is left-aligned.</td></tr><tr><td>Left</td><td>The title is left-aligned, sitting next to the back button.</td></tr></tbody></table>

#### Bottom border

Enables/disables the border at the bottom of the app bar.

#### Back button

Enables/disables the back button. The back button only appears when there's a previous view to return to — that is, when the current view was navigated to from another view.

#### Override back button label

Sets a custom text label next to the back button.

### Additional buttons

Lets you add additional buttons to the app bar. Leading buttons appear on the left side of the app bar, while trailing buttons appear on the right.

Each button is added as a pseudo child element of the app bar, visible in the element tree. Adding a button opens the popover with the content section below. You can select each button to see all properties.

#### Content

**Button type**

Sets the button type: label, icon or both.

**Text**

Sets the label of the button, if label or icon/label is enabled in button type.

**Icon**

Sets the icon of the button, if icon or icon/label is enabled in button type.

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
