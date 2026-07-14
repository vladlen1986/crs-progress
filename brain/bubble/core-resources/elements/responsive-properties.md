# Responsive Properties
> Source: https://manual.bubble.io/core-resources/elements/responsive-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (14)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)\
    Building pages that work on all devices, such as a laptop and a phone.

***

**The design tab**\
In this article we cover the different tools available in the design tab.

* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)
  * Article: [The element inspector](/help-guides/getting-started/navigating-the-bubble-editor/tools#key-features)\
    (the tool you use to set responsive properties)
* Article: [Conditional expressions](/help-guides/logic/conditions)\
  How you set up conditions using dynamic expressions.

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

Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
{% endtab %}

{% tab title="Videos (1 playlist)" %}
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)
{% endtab %}
{% endtabs %}

The following responsive properties are generally available for all elements[^3]. Containers[^4] also have responsive layout types that determine what additional layout properties its [child elements](#user-content-fn-5)[^5] have. These are outlined in the [Containers](/core-resources/elements/containers) section.

### Preset page width (page only) <a href="#preset-page-width" id="preset-page-width"></a>

* Custom: Default setting.
* Full width: Sets page width to 1200.
* Centered: Sets page width to 980.
* Mobile: Sets page width to 380.

### Width for UI Builder (page only) <a href="#width-for-ui-builder" id="width-for-ui-builder"></a>

Set the width of the page while in UI Builder mode. This option is only available for responsive container layout types (i.e. not *Fixed*) since these containers at the page level will grow to fit whatever the screen size is in run-mode. In the Responsive tab, you will be able to drag the canvas to see how the layout reacts to different screen sizes.

### Parent container type

The container layout type of the parent container. Clicking edit brings you to the property editor of the parent container.

### Keep element aspect ratio fixed

Check this box to maintain the current [aspect ratio](#user-content-fn-6)[^6] of the element as the parent container is resized. Only available for shapes, icons, and images.

### Make this element fixed-width

Check this box if you want the element to maintain a fixed width as the parent container resizes. If not, you will need to specify a minimum and maximum width.

### Width

Enter the width of the element in pixels.

### Min width

Specify the smallest width the element should be allowed to get as the parent container resizes. This value can be set in pixels or percentage relative to the parent container.

### Max width

Specify the largest width the element should be allowed to get as the parent container resizes. This value can be set in pixels or percentage relative to the parent container. If left blank, the maximum width will default to infinite, which means it will stay as wide as the parent container.

{% hint style="info" %}
**Note:** Child elements will always try to grow to their max width, unless restricted by other elements or its parent container.
{% endhint %}

### Fit width to content

Check this box to shrink this container to the width of the widest child element or its min width. Otherwise, the container will grow to its max width or the width of its parent container, whatever is smaller.

### Make this element fixed-height

Check this box if you want the element to maintain a fixed height even if its content or parent container grows. If not, you will need to specify a minimum and maximum height.

### Height

Enter the height of the element in pixels.

### Min height

Specify the smallest height you want the element to get in pixels or percentage relative to the parent container.

### Max height

Specify the largest height you want the element to get in pixels or percentage relative to the parent container. If left blank, the maximum height will default to infinite, which means it will stay as tall as the parent container.

{% hint style="info" %}
**Note:** Child elements will always try to grow to their max height, unless restricted by other elements or its parent container.
{% endhint %}

### Fit height to content

Check this box to shrink this container to the height of the tallest child element. Otherwise, the container will grow to its max height or height of its parent container, whatever is smaller.

{% hint style="info" %}
**Note:** This setting is only available on container elements inside a parent container with a layout type of align to parent or column.
{% endhint %}

### X

Enter the x-axis position of the element’s top left corner relative to the parent container in pixels.

### Y

Enter the y-axis position of the element’s top left corner relative to the parent container in pixels.

### Collapse when hidden

Check this box to collapse or remove the element from its parent container when the element is not visible. This will free up space for other elements to move (if applicable). If unchecked, the element will still be invisible, it will just continue taking up space in the parent element. This checkbox is the way to replicate hidden functionality from the legacy responsive engine.

### Allow vertical scrolling when content overflows <a href="#allow-vertical-scrolling" id="allow-vertical-scrolling"></a>

Check this box to add a scrollbar to the group container when the content is longer than the max height of the group container.

{% hint style="info" %}
Scrollbars, especially when in repeating groups, can sometimes cause elements to appear slightly different than designed on certain browsers and devices. This is because Bubble relies on the end-user's operating system and browser to determine how a scrollbar should look.
{% endhint %}

### Group elements in a Fixed container <a href="#group-elements-fixed" id="group-elements-fixed"></a>

Select this option from the Arrange or right click menu when multiple elements are selected to group the elements in a Fixed container.

### Group elements in a Row container <a href="#group-elements-row" id="group-elements-row"></a>

Select this option from the Arrange or right click menu when multiple elements are selected to group the elements in a Row container.

### Group elements in a Column container <a href="#group-elements-column" id="group-elements-column"></a>

Select this option from the Arrange or right click menu when multiple elements are selected to group the elements in a Column container.

### Group elements in an Align-to-Parent container <a href="#group-elements-align-to-parent" id="group-elements-align-to-parent"></a>

Select this option from the Arrange or right click menu when multiple elements are selected to group the elements in an Align-to-Parent con1tainer.

### Apply gap spacing between elements <a href="#apply-gap-spacing" id="apply-gap-spacing"></a>

Check this box to specify gap spacing between child elements in your Row or Column container. If the container has a Row container, you will be able to specify both row-gap and column-gap values. If your container has a Column container layout, you will be able to specify row-gap values. Gap values will move the position of child elements accordingly and reduce the amount of available space to grow within the parent container - if the child elements are variable width or height.

{% hint style="info" %}
**Note:** Gap controls are supported by newer versions of most browsers with the exception of Internet Explorer. Refer to [this guide](https://caniuse.com/flexbox-gap) to see if your users browsers are supported.
{% endhint %}

### Row gap (px)

Specify a value in pixels. The row gap value defines the vertical distance between rows of child elements in a parent container. In a Row container layout, the row gap value defines a consistent distance between the first row of child elements as elements wrap to the next row. In a Column container layout, the row gap value defines a consistent distance between child elements as they are stacked vertically.

### Column gap (px)

Specify a value in pixels. The column gap value defines the horizontal distance between child elements in a parent container and is only available in Row container layouts.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: Elements are the objects you place on the page in the Design tab, such as text, images, buttons and icons.

    Reference: [Elements](/core-resources/elements)\
    Article series: [Elements](/help-guides/design/elements)\
    Article: [The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

[^4]: *Container elements* are elements that contain other elements, and control parts of their appearance and responsive behavior.

    Reference: [Containers](/core-resources/elements/containers)\
    Article: [Containers](/help-guides/design/elements/web-app/containers)

[^5]: Every element within a container or placed directly on a page is considered a child of that element. A container element itself can also be a child of another container.

    Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

[^6]: *Aspect ratio* is the proportional relationship between the width and height of an element.
