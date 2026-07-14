# Reusable element properties
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/reusable-element-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:orange;">**intermediate-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (12)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Reusable elements

Article: [Reusable elements](/help-guides/design/elements/reusable-elements)

***

**Elements**\
In this article series, we cover how to work with different element types:

* Article series:[ Elements](/help-guides/design/elements)
  * Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)
  * Article: [The page](/help-guides/design/elements/web-app/the-page)
  * Article series: [Container elements](/help-guides/design/elements/web-app/containers)

    Elements that contain other elements.
  * Article: [Visual elements](/help-guides/design/elements/web-app/visual-elements)\
    Elements like text, buttons, icons and images.
  * Article series: [Input forms](/help-guides/design/elements/web-app/input-forms)\
    Elements that accept input, such as text and file uploads.
* Article: [Conditional expressions](/help-guides/logic/conditions)

  Making your elements change appearance in response to varying conditions.

***

**The design tab**\
In this article we cover the different tools available in the design tab.

Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

***

#### Design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)

    Building pages that work on all devices, such as a laptop and a phone.

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

* Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
  {% endtab %}

{% tab title="Videos (2)" %}
Bubble Academy: [Converting to a Reusable Element](https://www.youtube.com/watch?v=3GEH_hCaAWk)\
Bubble Academy: [Designing a Navbar](https://www.youtube.com/watch?v=iO-rJAu36w8) (using reusuable elements to create a navigation bar)<br>

Webinar: [Building a Scalable Design System with Gregory John \[BubbleCon 2023\]](https://www.youtube.com/watch?v=jsHPfn5antc)\
Webinar: [Building Modular: How Bubble Builds Bubble for Scale \[BubbleCon 2023\]](https://www.youtube.com/watch?v=3lJXMwah8tE)
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Reusable elements are configured in two places:

* **Definition:** the properties of the reusable elements itself.
* **Instance:** the properties of each instance of a reusable element

This article covers the **definition** properties.
{% endhint %}

A reusable element is a container (similar to a group) that holds other elements and can be placed in multiple locations throughout your app.

It’s useful when you need the same layout or functionality in more than one place. By centralizing those elements in a reusable element, you reduce duplication, keep the app lighter, and make updates easier to manage.

## Visual

### Content

#### Type of element

A reusable element can be a *Group*, *Popup*, or *Floating Group*.

If set as a popup, the reusable element behaves like a standard popup: it appears modally and greys out the background until it is shown or closed.

#### Type of content

Defines the type of thing the reusable element displays.

### Properties

#### Custom properties

Reusable elements support custom properties, which let you pass data into (and out of) the element. Click the + icon to add a new custom property.

You can define different types of properties:

* **Dynamic value**: accepts any basic data type (text, number, date, yes/no, etc.) or a custom data type.
* **Color picker**: accepts a hex color value or a saved color variable.
* **Checkbox**: passes a yes/no value to or from the reusable element.

Custom properties act as inputs for the reusable element. When you place the reusable element on a page, you can set these properties using static values or dynamic expressions. Inside the reusable element, child elements can reference those properties just like any other data source.

#### How custom properties differ from custom states

Custom properties are similar to custom states, but there are important differences:

* Their value can be fully dynamic. If you assign a dynamic expression, the property updates automatically when the underlying data changes.
* They can be set directly with a dynamic expression — no workflow is required.
* They are designed for passing data between the page and the reusable element, whereas custom states are typically used for internal state management within a single element.
* Reusable elements are treated as isolated instances. This means each instance of the same reusable element maintains its own set of custom property values. You can assign one value to a custom property in one instance, and a different value in another instance, without them affecting each other.
* Reusable element custom properties are also useful to store dynamic variables on a page.

### Size

Sets the width and height of the element. For reusable elements, the size is determined by the instance placed on the page, so only *Fill* and *Fixed* are available as sizing options.

#### **Width/height**

Sets the width/height of the element. The column, row and align layouts have a more flexible way to set element position.

<table><thead><tr><th width="88.7940673828125">Type</th><th width="292.85443115234375">Description</th><th>Options</th></tr></thead><tbody><tr><td>Fixed</td><td>Sets the width of the element as a fixed value.</td><td><ul><li><strong>Pixels:</strong> sets the width to a fixed pixel value</li></ul></td></tr><tr><td>Fill</td><td>The element's width and height fills the available space in the parent container.</td><td><ul><li><strong>Min:</strong> the minimum width/height, defined as a pixel value.</li><li><strong>Max:</strong> the maximum width/height, defined as a pixel value.</li></ul></td></tr></tbody></table>

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

#### Margin

Defines the external spacing between an element and surrounding elements. The margin must be set on each instance of the reusable element.

### Configuration

#### Page folder

Defines what page folder the reusable element is in.

{% hint style="info" icon="folder-open" %}
Page folders help you organize and categorize pages in the editor.

They are purely for structure and clarity during development and have no effect on how the app behaves at run-time. Folders do not change URLs, permissions, navigation, or performance — they simply make it easier to manage larger apps by grouping related pages together.
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

Check *Generate Alt tags* to automatically generate an [Alt text](#user-content-fn-3)[^3].

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

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: "Alt text" is short for **alternative text**. It's a written description of an image used by screen readers for visually impaired users, displayed when an image fails to load, and read by search engines to understand what an image depicts.
