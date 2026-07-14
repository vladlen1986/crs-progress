# Container properties
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" icon="mobile" %}
This article describes the containers available in **native mobile apps** ↓

[Click here for web container elements](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties).
{% endhint %}

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (12)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

Article: [Container elements](/help-guides/design/elements/web-app/containers)

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

Containers are structural elements that hold and organize other elements.

They define how child elements are arranged, aligned, and spaced. Layout behavior, responsiveness, and positioning are controlled at the container level rather than on individual child elements.

Containers can also hold data through their *Type of content* and *Data source* properties. Child elements inside the container can reference this data directly.

## General container properties

Containers define how elements are structured and positioned in a view.

Every container controls the layout behavior of its child elements, including their direction, alignment, spacing, and how they respond to changes in size. Instead of positioning elements individually, you configure the container, and its children follow those rules automatically.

Layout settings determine whether elements stack vertically, align horizontally, or use fixed coordinates. They also influence how content adapts across different screen sizes, how extra space is distributed, and how elements behave when content grows or shrinks.

Understanding containers is essential to building responsive, predictable layouts. Rather than thinking in terms of absolute positioning, you design by defining relationships between elements — and the container enforces those relationships consistently.

## Container elements for mobile

| Container type  | Description                                                                                             | Link                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| View            | Views are the base layer for designing content in a native mobile app.                                  | [View](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element)                                                      |
| Group           | A Group is a general-purpose container that holds other elements.                                       | [Group](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/group-element-mobile)                     |
| Floating group  | A container that remains fixed relative to the viewport rather than the view layout.                    | [Floating group](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/floating-group-element-mobile)   |
| Short list      | A short list is a container for displaying a fixed set of data items.                                   | [Short list](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/short-list-element-mobile)           |
| Horizontal list | A horizontal-scrolling list that displays items side by side.                                           | [Horizontal list](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/horizontal-list-element-mobile) |
| Sheet           | Sheets are overlay elements that provide focused interaction while keeping the underlying view visible. | [Sheet](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/sheet-element-mobile)                     |

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
