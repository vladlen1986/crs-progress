# Container Layout Types
> Source: https://manual.bubble.io/core-resources/elements/container-layout-types · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (12)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Responsive design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)

    Building pages that work on all devices, such as a laptop and a phone.
  * Article: [Container elements](/help-guides/design/elements/web-app/containers)\
    Containers are elements that contain other elements.
* Page: [Introduction to responsive design](https://bubble.io/responsive-design)

***

#### Navigation

In this article we cover how to hide and show container elements to set up a single-page application

Article: [Navigation](/help-guides/logic/navigation) | [Single-Page Applications](/help-guides/logic/navigation/single-page-applications-spa)

***

**Other element categories**\
In this article series, we cover how to work with different element types:

* Article series:[ Elements](/help-guides/design/elements)
  * Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)
  * Article: [The page](/help-guides/design/elements/web-app/the-page)
  * Article series: [Container elements](/help-guides/design/elements/web-app/containers) (elements that contain other elements)
  * Article: [Visual elements](/help-guides/design/elements/web-app/visual-elements) (elements like text, buttons, icons and images)
  * Article series: [Input forms](/help-guides/design/elements/web-app/input-forms) (elements that accept input, such as text and file uploads)
* Article: [Conditional expressions](/help-guides/logic/conditions) (making your elements change appearance in response to varying conditions)

***

**The design tab**\
In this article we cover the different tools available in the design tab.

* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

* Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
  {% endtab %}

{% tab title="Videos (7)" %}
Bubble Academy: [How to Group Elements Together](https://www.youtube.com/watch?v=HWmgmzIQRfg)\
Bubble Academy: [Padding in Container Elements](https://www.youtube.com/watch?v=rR1eI6Lv4_I)\
Bubble Academy: [How to Use the Group Focus Element](https://www.youtube.com/watch?v=l_SbovrRt2s\&t=1s)\
Bubble Academy: [Creating Your First Repeating Group](https://www.youtube.com/watch?v=e6oQU__8pmE)\
Bubble Academy: [How to create a Masonry Grid Layout in a Repeating Group](https://www.youtube.com/watch?v=-asG45y04aI)\
Bubble Academy: [How to Use Repeating Group Layout Styles](https://www.youtube.com/watch?v=abMbztw-lmc)<br>

Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)
{% endtab %}
{% endtabs %}

Container layouts define the behavior and positioning of its child elements. Container layout types are available on any container element (group, floating group, repeating group, etc.), including the page itself. Your page must be a responsive container type (ie not “fixed”) to be actually responsive to changes in screen size. Each container layout type has its own set of controls specific to that layout type. In addition, child elements will inherit unique controls depending on the parent container’s selected layout type.

The new container layouts and their controls are outlined below and include sub-sections for Parent container and Child element controls.

{% hint style="info" %}
**Note:** Parent controls act on the container itself while the Child controls act on the child elements inside the parent container.
{% endhint %}

## **Fixed**

The Fixed layout type defines a fixed width and height container with absolute positioning of its child elements. Child elements are positioned and re-sized by dragging and dropping as you are used to. A container that is fixed will not respond to changes in screen size or content size because what-you-see-is-what-you-get.

#### Parent Controls

![Screen Shot 2021-10-26 at 2.57.09 PM.png](https://codahosted.io/docs/94P3_UlyvF/blobs/bl-I7KxEmJO88/279df6e797a02f2fb6020f9da00021a2f2d0418f4c93d808e44c0c32dfa0aa3a8de8f7596ac9dc18ae73cbe339f9aa8a8d69948cd109f81f1cce27538a10bec984029ecd9b6f4dd1531286b94243d6fa50f0e74f9568f21445bc0778714084ae2fa0ea2e)

{% hint style="info" %}
Additional controls will be available dependent on the parent container of this element.
{% endhint %}

#### **Child Controls**

![Screen Shot 2021-10-26 at 2.54.09 PM.png](https://codahosted.io/docs/94P3_UlyvF/blobs/bl-YU_oRZ4asN/b97d8e8b6425bcd822902c3ba837a0dc3391e56900dd820370f3a2aea3f8ef32461d8ef5c9543a6f0f1fac18e9c82223442f202629744ecb0a0e576e0712c7422f3eaf888e2e113fe20082ca2a2f96ea99e266994d2f31c9e9504b9c7eec1c53e648aa84)

### Width & Height

See [Responsive Properties](/core-resources/elements/responsive-properties)

## **Align to Parent**

Child elements are aligned to a nonant in the parent container. A nonant is like a quadrant, but when a rectangle is divided into 9 parts instead of 4. New child elements drawn inside or dragged into an Align to Parent will snap to the nearest nonant.

The position and size of child elements are controlled in the property editor, though elements can be re-positioned by dragging and dropping. As the parent container resizes, child elements will remain aligned to their respective nonant and can overlap each other.

#### Parent Controls

![Screen Shot 2021-10-26 at 3.05.01 PM.png](https://codahosted.io/docs/94P3_UlyvF/blobs/bl-bGUnBQOnUN/4bec36d72fc840f1f36b2457bf836d5eb7c2a1960ca19e175407ac9434222ae0bb3075c3613a571b8bdf2eefc7f8e6ed208d95a08cdf7f0d8083e1efe82eebd883a6e4ae242b77455ba95b1a4e0b174770bd8f74ab1759f0b744b0b3282996f2249e88e6)

{% hint style="info" %}
Additional controls will be available dependent on the parent container of this element.
{% endhint %}

#### Child Controls

![Screen Shot 2021-10-26 at 3.04.15 PM.png](https://codahosted.io/docs/94P3_UlyvF/blobs/bl-x3WpVpzzXC/5f09113389ed76ee8cfc69197d1a95f7b9333ae2020825012ae59244761f561b93a7a28ef9024d9673abe27d903ba03938de6e99e7a9cea2541d2461a8bc1d8d69bb3d6c0269f43f53af4c1415a50b972130b75e48318101e8055567f633997092db68d3)

### Pin to nonant selection

Select which nonant this element should be pinned to. The element will stay pinned there as the parent container resizes.

### Width & Height

See [Responsive Properties](/core-resources/elements/responsive-properties)

## **Row**

Child elements in a row container are aligned horizontally. These child elements will wrap as the screen is resized or new elements are added. New child elements drawn inside the container will be added to the end of the list by default but can be re-ordered using the order controls or by dragging and dropping.

The position and size of child elements are controlled in the property editor.

{% hint style="info" %}
**Note:** Child elements will grow to take up as much space as they can (within the limits of the max width setting) equally. For example, consider a parent row container that is 100px wide. It has two child elements with min widths of 20px and infinite max widths. These elements will grow to be 50px each. If we add a 3rd equal child element to that row, each element will shrink to 33.33 px wide.
{% endhint %}

#### Parent Controls

![Screen Shot 2021-09-09 at 2.58.41 PM.png](https://codahosted.io/docs/94P3_UlyvF/blobs/bl-m4gnDQuoiu/b493081bf6fd231da25d3cb62841b8e921874673f4995dfdf18ed5b3b24de33c5c3c6d4dbbf5514ba66c5964d4d98b1acced96f5bfda0a9bb3ec40a5373c07e4219c97b560824f898af9295090f6838bfcaf02ff3530a9876e2516cbd495a0be57665626)

### Container alignment

This control defines how the child elements will be aligned with respect to the parent container.

#### Left-aligned <a href="#left-aligned-container" id="left-aligned-container"></a>

Child elements will align to the left edge of the parent.

#### Centered <a href="#centered-container" id="centered-container"></a>

Child elements will align to the center of the parent.

#### Right-aligned <a href="#right-aligned-container" id="right-aligned-container"></a>

Child elements will align to the right edge of the parent.

#### Space around

Child elements will receive even spacing between the edges of the parent container and each other.

#### Space between

Child elements are placed at the start and end of a container with even spacing between elements

### Row gap (px)

See [Responsive Properties](/core-resources/elements/responsive-properties)

### Column gap (px)

See [Responsive Properties](/core-resources/elements/responsive-properties)

### Width & Height

See [Responsive Properties](/core-resources/elements/responsive-properties)

{% hint style="info" %}
Additional parent controls will be available dependent on the parent container of this element.
{% endhint %}

**Child controls**

![Screen Shot 2021-09-09 at 4.42.13 PM.png](https://codahosted.io/docs/94P3_UlyvF/blobs/bl-RFWiPBtcBx/54acb6bd5349361d9ab3ac6f7e4c7a814f50b99050c5fe2a328c311c611a6454c1caf9c616908cc45a12656c7b4276d8c2ec3e4dd430463531d0b72340de8f7f147198d3e3ad3f38d8c2581a650459a6bc772e3b7d81909afb659ad773143be151fbf2af)

### Vertical alignment

#### Top-aligned <a href="#top-aligned-row" id="top-aligned-row"></a>

Child element will align to the top edge of the parent container

#### Centered <a href="#centered-row" id="centered-row"></a>

Child element will align to the center of the parent container

#### Bottom-aligned <a href="#bottom-aligned-row" id="bottom-aligned-row"></a>

Child element will align to the bottom of the parent container

#### Vertical stretch <a href="#vertical-stretch-row" id="vertical-stretch-row"></a>

Child element will stretch to its max height (or height of the parent container, whichever is smaller). This option is disabled if *Make this element fixed-height* is checked.

### Order selection

#### Make first <a href="#make-first-row" id="make-first-row"></a>

Move this element to the first position in the row.

#### Previous <a href="#previous-row" id="previous-row"></a>

Move this element one position to the left in the row.

#### Next <a href="#next-row" id="next-row"></a>

Move this element one position to the right in the row.

#### Make last <a href="#make-last-row" id="make-last-row"></a>

Move this element to the last position in the row.

### Width and Height

See See [Responsive Properties](/core-resources/elements/responsive-properties)

## **Column**

Content is aligned vertically. Child elements will stretch or push other elements down as screen or content is resized. New child elements drawn inside the container will be added to the end of the list but can be re-ordered using the order controls or by dragging and dropping.

Position and size are instead controlled in the property editor.

#### **Parent controls**

![Screen Shot 2021-09-09 at 4.46.39 PM.png](/files/rBO09T4zgGpq2z58UXaK)

### Container alignment <a href="#container-alignment-column" id="container-alignment-column"></a>

This control defines how the child elements will be aligned with respect to the parent container.

#### Top-aligned <a href="#top-aligned-column" id="top-aligned-column"></a>

Child elements will align to the top edge of the parent.

#### Centered <a href="#centered-column" id="centered-column"></a>

Child elements will align to the center of the parent.

#### Bottom-aligned <a href="#bottom-aligned-column" id="bottom-aligned-column"></a>

Child elements will align to the bottom edge of the parent.

#### Space around <a href="#space-around-column" id="space-around-column"></a>

Child elements will receive even vertical spacing between the edges of the parent container and each other.

#### Space between <a href="#space-between-column" id="space-between-column"></a>

Child elements are placed at the start and end of a container with even vertical spacing between elements

### Row gap (px)

See [Responsive Properties](/core-resources/elements/responsive-properties)

### Width & **H**eight

See [Responsive Properties](/core-resources/elements/responsive-properties)

{% hint style="info" %}
Additional parent controls will be available dependent on the parent container of this element.
{% endhint %}

#### **Child controls**

![Screen Shot 2021-09-09 at 4.47.14 PM.png](https://codahosted.io/docs/94P3_UlyvF/blobs/bl-kHYWdecUPn/3bc5f8f8ddcea04af5d87e8f7da79d565397999755a24e440e3e797161f0dcf9eae6a4574965a15b976c375837ba9d57309e66273afb910d71f2572d918552d59d8e6c30c6c3f6326962be333f4cc91e6ccf341bf014311d900048960631735bb35bec32)

### Horizontal alignment

#### Left-aligned <a href="#left-aligned-column" id="left-aligned-column"></a>

Child element will align to the left edge of the paren&#x74;**.**

#### Centered <a href="#centered-column" id="centered-column"></a>

Child element will align to the center of the parent.

#### Right-aligned <a href="#right-aligned-column" id="right-aligned-column"></a>

Child element will align to the right edge of the parent.

#### Horizontal stretch <a href="#horizontal-stretch-column" id="horizontal-stretch-column"></a>

Child element will stretch horizontally to its max width or the width of its parent container (whichever is less). This option is disabled if *Make this element fixed-width* is checked.

### Order selection

#### Make first <a href="#make-first-column" id="make-first-column"></a>

Move this element to the first position in the row.

#### Previous <a href="#previous-column" id="previous-column"></a>

Move this element one position to the left in the row.

#### Next <a href="#next-column" id="next-column"></a>

Move this element one position to the right in the row.

#### Make last <a href="#make-last-column" id="make-last-column"></a>

Move this element to the last position in the row.

### Width & **H**eight

See [Responsive Properties](/core-resources/elements/responsive-properties)

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
