# Styling properties
> Source: https://manual.bubble.io/core-resources/elements/styling-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (12)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Styling**\
In this article we cover the different tools available in the design tab.

* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)
* Article: [The styles tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/styles-tab)
  * Article: [Font variables](/help-guides/design/variables-and-styles/font-variables)\
    Storing font settings that can be used in styles and on individual elements.
  * Article: [Color variables](/help-guides/design/variables-and-styles/color-variables)\
    Storing color settings that can be used in styles and on individual elements.

***

#### Design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)\
    Building pages that work on all devices, such as a laptop and a phone.

***

**Elements**\
In this article series, we cover how to work with different element types:

* Article series:[ Elements](/help-guides/design/elements)
  * Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)
  * Article: [The page](/help-guides/design/elements/web-app/the-page)
  * Article series: [Container elements](/help-guides/design/elements/web-app/containers)\
    Elements that contain other elements.
  * Article: [Visual elements](/help-guides/design/elements/web-app/visual-elements)\
    Elements like text, buttons, icons and images.
  * Article series: [Input forms](/help-guides/design/elements/web-app/input-forms)\
    Elements that accept input, such as text and file uploads.
* Article: [Conditional expressions](/help-guides/logic/conditions)\
  Making your elements change appearance in response to varying conditions.

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

* Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
  {% endtab %}

{% tab title="Videos (1 playlist)" %}
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)
{% endtab %}
{% endtabs %}

These are common **styling properties** that can be applied to most elements[^3] in the Bubble editor. They include [borders](#borders), [backgrounds](#background-style), [shadows](#shadows), [fonts](#font-options), etc. These are also properties included in Styles[^4].

## General

### Opacity

Defines the opacity of the entire element. 100 is fully opaque while 0 is fully transparent.

{% hint style="info" %}
**Note:** This is different than the the color picker's opacity input, or alpha value . That value sets the opacity of the color itself. This setting sets the opacity of the entire element and its children.

For example, a button element placed within a group element with opacity lower than 100 will inherit that opacity.
{% endhint %}

## Dimensions

These properties control the size and positioning of the selected element.

### Width

Defines the width of the selected element in pixels.

### Height

Defines the height of the selected element in pixels. This height adjusts if the element or content inside a container is 'Set to stretch to fit content.' In this case, the number entered here is the minimum height for that element.

### Left

Defines the horizontal position in pixels relative to the left border of the containing element, which is either a group or popup or the page.

### Top

Defines the vertical position in pixels relative to the top border of the containing element, which is either a group, a popup, or the page.

### Rotation angle

Rotate the selected element by entering a number in this field. This number is expressed in degrees.

## Shadows

These properties define a shadow for the selected element.

### Shadow style

Choose from None, Outset, and Inset to define a shadow to the selected element. Inset sets a shadow inside the element. Outset sets a shadow outside the element.

### Horizontal offset

Defines the position of the horizontal shadow. Negative values are allowed.

### Vertical offset

Defines the position of the vertical shadow. Negative values are allowed.

### Shadow Blur radius

Define the blur distance in pixels. A higher number means a more diffuse shadow, and a lower number means a sharper shadow.

### Shadow spread radius

Positive values will cause the shadow to expand and grow bigger, negative values will cause the shadow to shrink. If not specified, it will be 0 (the shadow will be the same size as the element).

### Shadow color

Defines the color of the shadow.\
Tip: Experiment with the transparency of the color.

## Font options

These properties style text.

### Font

Select the font family to apply to the selected element. Choose from the hundreds of fonts in the Google Fonts Library.

### Font Weight

Select the font weight to apply to the selected element. Choose from standard weights ranging from 100 to 900.

{% hint style="info" %}
**Note:** Not all fonts have all 9 weights. If you are not seeing the expected weights, the selected font doesn't support it.
{% endhint %}

### Font Size

Enter a font size in pixels for the text.

### Bold

Makes the text darker and thicker.

### Italic

Makes the text slanted.

### Underline

Underlines the text. This is useful in conditional formatting, when a link is hovered, for instance.

### Text Alignment

Aligns the text. Choose from Left, Center, and Right.

### Font Color

Select the text color.

### Placeholder color

Select the color to apply to the placeholder of the input element.

## Font Shadow

These properties add a shadow to texts.

### Show text shadow

Check this box to show a shadow on the text.

### Horizontal offset

Defines the position of the horizontal shadow. Negative values are allowed.

### Vertical offset

Defines the position of the vertical shadow. Negative values are allowed.

### Font Shadow Blur Radius

Define the blur distance in pixels. A higher number means a more diffuse shadow, and a lower number means a sharper shadow.

### Font shadow Color

Select the color of the shadow.\
Tip: Experiment with the transparency of the color.

## Font options

These options control text spacing.

### Word spacing

Define the space between words in pixels.

### Line spacing

Define the line height as a ratio relative to the font size, where 1 equals the default spacing, and higher values increase spacing proportionally.

<details>

<summary>Understanding line height</summary>

Line height controls the vertical spacing between lines of text. Instead of being a fixed value in pixels, it is set as a **ratio relative to the font size**. This means the actual spacing scales automatically based on the text size.

**How the calculation works**

The formula for determining line height is:

$$Line height = Font size × Line height ratio$$

For example, if your text has a **font size of 16px** and you set the **line height to 1.5**, the total spacing between lines is calculated as:

$$16px × 1.5 = 24px$$

This means that the full height of each line—including spacing—is **24 pixels**.

**Why use a ratio instead of pixels?**

Using a ratio instead of a fixed pixel value ensures your text stays **consistent and responsive** across different screen sizes. Larger text will automatically have proportionally larger spacing, making it easier to read without needing manual adjustments.

</details>

### Letter spacing

Define the space between letters in pixels.

## Borders

These properties define the borders of the elements.

{% hint style="warning" %}
**Note:** Top and left borders on an element will nudge the center alignment of items inside that element (e.g. text). One workaround is to have a text element inside of another element (e.g. group), and apply the border to the outside element instead.
{% endhint %}

### Define each border independently

Check this box if borders are to be set independently.

### Border style

Choose a style for the border. Choose from None, Dotted, Dashed, Double, Groove, Ridge, Inset, and Offset.

### Border roundness

Define the border radius in pixels.

### Border Width

Define the border width in pixels.

### Border color

Select the border color.

## Tooltip on hover

### Tooltip text (on hover)

This text is displayed by the browser when the user hovers over it with the mouse. Technically, it sets a title attribute to the element it is applied to.

## Padding

These properties let you select the space between the borders and the actual content of the element.

### Top <a href="#padding-top" id="padding-top"></a>

Specify the amount of padding at the top of the container in pixels.

### Right <a href="#padding-right" id="padding-right"></a>

Specify the amount of padding on the right side of the container in pixels.

### Bottom <a href="#padding-bottom" id="padding-bottom"></a>

Specify the amount of padding to the bottom of the container in pixels.

### Left <a href="#padding-left" id="padding-left"></a>

Specify the amount of padding on the left side of the container in pixels.

### Center the text vertically

Check this box to center the text vertically.

{% hint style="info" %}
**Tip:** Top and left borders on an element will nudge the center alignment of items inside that element (e.g. text). One workaround is to have a text element inside of another element (e.g. group), and apply the border to the outside element instead.
{% endhint %}

## Background

These options define the background of the elements: color, image, etc.

### Background style

Select the background style to apply to the element. Choose from None, Flat color, Gradient, and Image.

### Background Color

Select the background color for the element.

### Gradient style

Choose from Linear and Radial to define the gradient style.

### Gradient direction

Choose from Top, Left, Bottom, Right, and Custom to define the gradient direction.

### Direction degrees

Enter a value between 0 and 360 for the direction of the gradient.

### Gradient shape

Defines the shape of the gradient. Choose from Ellipse and Circle.

### Gradient base

Select a screen location from this dropdown menu to determine where to base the gradient. Choose from Closest-side, Closest-corner, Farthest-side, and Farthest-corner.

### X center position (%)

Define the horizontal centering position. 50% will center the gradient.

### Y center position (%)

Define the vertical centering position. 50% will center the gradient.

### Starting color

Select the starting color of the gradient.

### Ending color

Select the ending color of the gradient.

### Intermediate color

Select the optional middle color of the gradient. If the input is empty, no intermediate color will be applied.

### Background image

Upload or define a dynamic image. Select an image from the Bubble royalty-free library, if desired.

### Center the image

Centers the image in the element.

### Make image as wide as parent element

If the element is wider than the element selected, the image will automatically resize to cover the entire element.

### Crop the image to fit the element size

In Responsive mode, checking this option makes sure the element's background image will be cropped to fill the entire element's background without distorting the image.

### Repeat the image vertically

Repeat the image vertically if the image is smaller than the element's height.

### Repeat the image horizontally

Repeat the image horizontally if the image is narrower than the element's width.

### Background color if empty

When using a dynamic image, it might take a few milliseconds for the image to load. In the meantime, select a background color for the element. The default is transparent.

Bubble renders the page to adjust to the screen width, i.e, responsive layout. A few options control the behavior of the page.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: Elements are the objects you place on the page in the Design tab, such as text, images, buttons and icons.

    Reference: [Elements](/core-resources/elements)\
    Article series: [Elements](/help-guides/design/elements)\
    Article: [The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

[^4]: *Styles* are predefined collections of styling properties that can be applied to multiple elements. For example, you can make multiple text elements or buttons look exactly the same, and update them in one place.

    Article: [Styles](/help-guides/design/variables-and-styles/styles)
