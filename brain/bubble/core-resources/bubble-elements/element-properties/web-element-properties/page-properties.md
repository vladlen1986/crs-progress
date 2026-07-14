# Page properties
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/web-element-properties/page-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (9)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Elements**\
In this article series, we cover how to work with different element types:

Article: [The page](/help-guides/design/elements/web-app/the-page)

* Article series:[ Elements](/help-guides/design/elements)
  * Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

***

#### Navigation

In this article we cover how to navigate between pages and page sections:

* Article: [Navigation](/help-guides/logic/navigation)

***

#### Design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)\
    Building pages that work on all devices, such as a laptop and a phone.

***

**The design tab**\
In this article we cover the different tools available in the design tab.

* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)
  * Article: [The element inspector](/help-guides/getting-started/navigating-the-bubble-editor/tools#key-features)

    The tool you use to edit elements.

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

* Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
  {% endtab %}

{% tab title="Videos (2)" %}
Bubble Academy: [How to Use the Page Element | Bubble Quick Tip](https://www.youtube.com/watch?v=9MBzCjbJnNI)\
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)
{% endtab %}
{% endtabs %}

The page element is the top-level container for all other elements in a web app.

Every element you place -- such as groups, inputs, text, or repeating groups -- exists inside a page. Page-level settings control overall layout, background style, SEO properties, and other global behaviors that affect everything within it.

***

## Visual

### Content

#### Type of content

Defines the type of data the page holds, such as a User or a custom data type. Unlike containers such as groups and popups, the page's data can be accessed from anywhere on the page using the *Current page's thing* data source.

#### Data source

Defines the thing displayed on the page. The *Type of content* property determines what kind of data can be set as the data source. Child elements can reference it using the *Current page's thing* data source.

### Size

Sets the width and height of the page.

<table><thead><tr><th width="88.7940673828125">Type</th><th width="292.85443115234375">Description</th><th>Options</th></tr></thead><tbody><tr><td>Fixed</td><td>Sets the width/height of the page as a fixed value.</td><td><ul><li><strong>Pixels:</strong> sets the width to a fixed pixel value</li></ul></td></tr><tr><td>Fill</td><td>The page's width and height fills the available space in the browser.</td><td><ul><li><strong>Min:</strong> the minimum width/height, defined as a pixel value.</li><li><strong>Max:</strong> the maximum width/height, defined as a pixel value.</li></ul></td></tr></tbody></table>

#### Builder width

Sets the width of the page in the editor, as a work area. This property is only available if width/height is set to *Fill.*

### Layout

#### Alignment

Defines how the container element positions and arranges its child elements.

You can choose a layout type (such as column, row, align, or fixed), control alignment behavior, and configure spacing. This includes properties for gap (space between child elements), padding (internal spacing), and margin (external spacing). Layout settings determine how the element behaves responsively and how it interacts with surrounding elements.

<figure><img src="/files/djLCP071HFMNUG0TriIz" alt="" width="226"><figcaption></figcaption></figure>

**Column**

Arranges child elements vertically, stacking them from top to bottom by default. You can change the

You can control vertical order, horizontal alignment, spacing between items (gap), and whether elements stretch to fill the available width.

**Row**

Arranges child elements horizontally, placing them side by side from left to right.

You can control horizontal order, vertical alignment, spacing between items (gap), and whether elements stretch to fill the available height.

**Align**

Places child elements freely within a defined alignment 3x3 grid.

This layout allows positioning elements relative to the container (for example, top-left, center, bottom-right).

**Fixed**

Positions child elements using explicit X and Y coordinates.

Elements are placed at fixed pixel positions within the container. This layout does not automatically adjust based on content flow and offers the least responsive flexibility.

#### Container alignment

<figure><img src="/files/0gwJrlaXtEvCiB8U2ggR" alt="" width="236"><figcaption></figcaption></figure>

This setting applies to **column/row layouts**.

Column and row layouts support different alignment modes that control how child elements are positioned along the main and cross axes.

**Top/left (start)**

Aligns child elements to the start of the container.

* In a column layout, elements align to the top.
* In a row layout, elements align to the left.

**Center**

Aligns child elements to the center of the container along the relevant axis.

* In a column layout, elements are centered horizontally.
* In a row layout, elements are centered vertically.

**Right/bottom (end)**

Aligns child elements to the end of the container.

* In a column layout, elements align to the bottom.
* In a row layout, elements align to the right.

**Space between**

Distributes child elements evenly, with equal space between them and no extra space at the edges of the container.

**Space around**

Distributes child elements evenly, with equal space around each element. This results in half-sized spacing at the container’s edges compared to the space between elements.

#### Spacing

**Gap (column and row layout)**

Defines the space between child elements inside a container.

The gap is applied between items in a column or row layout. It does not add space before the first element or after the last element — only between siblings.

* In a **column layout**, the gap controls vertical spacing.
* In a **row layout**, it controls horizontal spacing.

{% hint style="info" %}
If child elements also have margins, **the gap and margin values are cumulative**. For example, a container with a 10 px gap and a child element with a 10 px margin between items will result in 20 px of total space between those elements.
{% endhint %}

### Configure

#### Page folder

Defines which folder the page is stored in.

{% hint style="info" %}
Page folders help you organize and categorize pages and reusable elements in the editor. They're purely for structure and clarity during development and have no effect on how the app behaves at runtime. Folders don't change URLs, permissions, navigation, or performance.
{% endhint %}

#### Make this page native mobile

{% hint style="warning" %}
The properties below apply to web apps packaged as native mobile apps using a web wrapper. They're not related to the native mobile builder and don't affect apps built with native mobile elements.
{% endhint %}

Instructs Bubble to handle the page as a native mobile app and lets you provide a name for the app.

#### Mobile version

Points Bubble to the mobile version of a page.

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

Opacity sets the transparency level of the page. At 100%, it is is fully opaque. At 0%, it is fully transparent (invisible).

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

### SEO

#### Title tag

Sets the page's `<title>` element. This appears in browser tabs and search engine results.

#### Meta description

Defines the page's `<meta name="description">` content. Search engines may display this text in search results and use it to understand the page's content.

### Social (open graph)

#### Title

Sets the Open Graph title (`og:title`). Used when the page is shared on social platforms.

#### Share image

Sets the Open Graph image (`og:image`). This image is displayed in link previews on social media.

### Advanced

A unique identifier assigned to the element. This can be used to reference the element in custom code, such as JavaScript or CSS, using `document.getElementById()` or CSS selectors.

{% hint style="info" %}
For this property to be visible, you need to enable *Expose the option to add an ID attribute to HTML elements* in *Settings – Advanced options.*
{% endhint %}

#### Time zone

{% hint style="info" %}
This property requires that you check the *Enable timezone override controls* and *Page* checkboxes under *Settings – General*.
{% endhint %}

Overrides the default browser-based time zone for this page. All date and time elements on the page will use the selected time zone.

#### HTML header

{% hint style="info" %}
This property sets an HTML header on one specific page. To apply an HTML header to all pages, go to *Settings – SEO and metatags*.
{% endhint %}

Lets you insert custom code into the page's `<head>` section. Typically used for scripts, meta tags, or third-party integrations.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: "Alt text" is short for **alternative text**. It's a written description of an image used by screen readers for visually impaired users, displayed when an image fails to load, and read by search engines to understand what an image depicts.
