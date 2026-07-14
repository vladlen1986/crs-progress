# Elements (PE beta)
> Source: https://manual.bubble.io/core-resources/bubble-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (11)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Elements**\
In this article series, we cover how to work with different element types:

* Article series:[ Elements](/help-guides/design/elements)
  * Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)
  * Article: [The page](/help-guides/design/elements/web-app/the-page)
  * Article series: [Container elements](/help-guides/design/elements/web-app/containers)

    Elements that contain other elements.
  * Article: [Visual elements](/help-guides/design/elements/web-app/visual-elements)\
    Elements like text, buttons, icons and images.
  * Article series: [Input forms](/help-guides/design/elements/web-app/input-forms)

    Elements that accept input, such as text and file uploads.
* Article: [Conditional expressions](/help-guides/logic/conditions)\
  Making your elements change appearance in response to varying conditions.

***

**The design tab**\
In this article we cover the different tools available in the design tab.

* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

***

#### Design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)
  * Building pages that work on all devices, such as a laptop and a phone.

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
{% endtab %}

{% tab title="Videos (1 playlist)" %}
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)
{% endtab %}
{% endtabs %}

Elements are the visual components you place on pages[^3] (web) and views[^4] (mobile). They display text, images, and other content, and allow users to interact with your app. Each element has configurable properties, which you manage in the [property editor](#the-element-property-editor).

<table><thead><tr><th width="142.73828125">Main category</th><th width="373.3828125">Description</th><th>Link</th></tr></thead><tbody><tr><td><strong>Web elements</strong></td><td>Elements that can be used in web apps that live in a web browser.</td><td><a data-mention href="/pages/SUOG9eKVFWL87KgMCy9O">/pages/SUOG9eKVFWL87KgMCy9O</a></td></tr><tr><td><strong>Mobile elements</strong></td><td>Elements that can be used in native mobile apps on iOS and Android devices.</td><td><a data-mention href="/pages/cqcnrB6Em3uLZX9d0QmL">/pages/cqcnrB6Em3uLZX9d0QmL</a></td></tr><tr><td><strong>Reusable elements</strong></td><td>A reusable element is a container (similar to a group) that holds other elements and can be placed in multiple locations throughout your app.<br><br>Reusable elements work for both web apps and mobile, but they function independently. A reusable element for web cannot be used in a native mobile app, and vice versa.</td><td><a data-mention href="/pages/VRxVim4gVREYJJ7kcKEO">/pages/VRxVim4gVREYJJ7kcKEO</a></td></tr></tbody></table>

Elements are either part of Bubble's core library or added with plugins[^5].

## Element property editor

The element property editor is where you make changes to an element's [properties](#elements-and-properties) and [conditionals](/core-resources/bubble-elements/conditional-element-properties). You can read more about the element property editor in the article below.

[The element property editor](/core-resources/bubble-elements/the-element-property-editor)

## Elements and properties

Some properties are general and appear on most elements. These include layout settings (such as width, height, alignment), visibility controls, conditional formatting, and collapse behavior. They control how an element looks and behaves in relation to the page and other elements.

Other properties are element-specific and only appear on certain element types. For example, an input may include *Make required* or content format settings, while a date/time picker includes date format and time zone options. Containers include *Type of content* and *Data source*, which are not available on basic visual elements like text.

Element-specific properties define the core function of that element. General properties control how that function is presented and behaves within the layout.

This section is divided into these categories:

<table><thead><tr><th width="259.30859375"></th><th>Description</th><th>Link</th></tr></thead><tbody><tr><td><strong>Container-specific properties</strong></td><td>Properties that only apply to a specific container element type.</td><td><a data-mention href="#container-specific-properties">#container-specific-properties</a></td></tr><tr><td><strong>Element-specific properties</strong></td><td>Properties that only apply to a specific non-container element type.</td><td><a data-mention href="#element-specific-properties">#element-specific-properties</a></td></tr></tbody></table>

### **Container-specific properties**

Containers also come with properties that only apply to a specific type.

#### Web

<table><thead><tr><th width="157.84765625">Container type</th><th width="385.51953125">Description</th><th>Link</th></tr></thead><tbody><tr><td><strong>Page</strong></td><td>The top-most layer of your design hierarchy. Each page has its own URL.</td><td><a data-mention href="/pages/1bNBzyNnrnpGikLBDCK9">/pages/1bNBzyNnrnpGikLBDCK9</a></td></tr><tr><td><strong>Group</strong></td><td>A Group is a general-purpose container that holds other elements. It serves both a visual and a data role in your app.</td><td><a data-mention href="/pages/j1Sh7fqJUVPr1aBlbZlB">/pages/j1Sh7fqJUVPr1aBlbZlB</a></td></tr><tr><td><strong>Repeating group</strong></td><td>A repeating group is a container that displays a list of items by repeating its cell layout once per item in a data source.</td><td><a data-mention href="/pages/RDmocxiJyIjGwF6iiZNa">/pages/RDmocxiJyIjGwF6iiZNa</a></td></tr><tr><td><strong>Popup</strong></td><td>A container displayed above the page content, typically used for modals, dialogs, or focused user interactions.</td><td><a data-mention href="/pages/44JTR7hcVdvjhjoGmjxH">/pages/44JTR7hcVdvjhjoGmjxH</a></td></tr><tr><td><strong>Floating Group</strong></td><td>A container that remains fixed relative to the viewport rather than the page layout.</td><td><a data-mention href="/pages/mdxTpX4U9TfDHGD4vMnW">/pages/mdxTpX4U9TfDHGD4vMnW</a></td></tr><tr><td><strong>Group Focus</strong></td><td>A group focus is a contextual container that appears relative to another element on the page.</td><td><a data-mention href="/pages/sjUmb6WVZYGk85monJaD">/pages/sjUmb6WVZYGk85monJaD</a></td></tr><tr><td><strong>Table</strong></td><td>A Table is a structured container that displays tabular data in predefined rows and columns.</td><td><a data-mention href="/pages/MgD4gPgIv7pK5EUy78cb">/pages/MgD4gPgIv7pK5EUy78cb</a></td></tr></tbody></table>

#### Mobile

<table><thead><tr><th width="157.84765625">Container type</th><th width="385.51953125">Description</th><th>Link</th></tr></thead><tbody><tr><td><strong>View</strong></td><td>The top-most layer of your design hierarchy in a native mobile app.</td><td><a data-mention href="/pages/KFTKlim3z3vcA0uqsOKG">/pages/KFTKlim3z3vcA0uqsOKG</a></td></tr><tr><td><strong>Group</strong></td><td>A general-purpose container that holds other elements. It serves both a visual and a data role in your app.</td><td><a data-mention href="/pages/noDkbHzWYKHT8S0ppE43">/pages/noDkbHzWYKHT8S0ppE43</a></td></tr><tr><td><strong>Floating Group</strong></td><td>A container that remains fixed relative to the viewport rather than the view layout.</td><td><a data-mention href="/pages/ieVQDQBVIaWXTWlXZxKm">/pages/ieVQDQBVIaWXTWlXZxKm</a></td></tr><tr><td><strong>Short list</strong></td><td>A short list is a container for displaying a fixed set of data items.</td><td><a data-mention href="/pages/LYCuPa7g9C5gZVA2RQD8">/pages/LYCuPa7g9C5gZVA2RQD8</a></td></tr><tr><td><strong>Horizontal list</strong></td><td>A horizontal-scrolling list that shows items side by side.</td><td><a data-mention href="/pages/QxGmyPCTI498McajLuRP">/pages/QxGmyPCTI498McajLuRP</a></td></tr><tr><td><strong>Sheet</strong></td><td>Overlay elements that provide focused interaction while keeping the underlying view visible</td><td><a data-mention href="/pages/j7YZDQYm5o8UbHD5UeKS">/pages/j7YZDQYm5o8UbHD5UeKS</a></td></tr></tbody></table>

### Element-specific properties

Element-specific properties are documented in articles that correspond to the element categories, as they appear in the element palette. Each category groups elements with similar functionality, and their reference entries describe the properties unique to those elements.

### Web

<table><thead><tr><th width="177.8778076171875">Category</th><th width="368.6363525390625">Description</th><th>Article link</th></tr></thead><tbody><tr><td><strong>Visual</strong></td><td>Elements like <a href="/pages/SkcqCFoFY9eTQ5oPCct4">text</a>, <a href="/pages/itcV4pxOAiwnT0PCFl61">buttons</a>, <a href="/pages/bSP0mIYr8yaa8Aed0MsB">icons</a> and <a href="/pages/A5UgJXkzBKri5B8GBvsB">images</a>.</td><td><a data-mention href="/pages/RG3pjrFk1bp7wDWfcCkc">/pages/RG3pjrFk1bp7wDWfcCkc</a></td></tr><tr><td><strong>Input forms</strong></td><td>Elements like <a href="/pages/BJwfwpltG6Zsojuc0Fc6">text input</a>, <a href="/pages/ZNPwIN0TjoDpRwJuA1t7">date/time picker</a>, <a href="/pages/rYPJdq9C2p4z2Cxv5q50">checkbox</a> and <a href="/pages/5VpPNewv8a7TnPU8biKo">dropdown</a>.</td><td><a data-mention href="/pages/f4sUzcR69BO51gqKhZcE">/pages/f4sUzcR69BO51gqKhZcE</a></td></tr><tr><td><strong>Bubble-made plugin elements</strong></td><td>Elements added by installing <a href="/pages/-MYG5FvwTvItpQqBQO6U">plugins</a>. The documentation only covers plugins made by Bubble.</td><td><a data-mention href="/pages/uz8xwFx054OCRKZuZl9H">/pages/uz8xwFx054OCRKZuZl9H</a></td></tr></tbody></table>

### Mobile

<table><thead><tr><th width="177.8778076171875">Category</th><th width="368.6363525390625">Description</th><th>Article link</th></tr></thead><tbody><tr><td><strong>Visual</strong></td><td>Elements like <a href="/pages/TygnjEUgwbgASJ4mD35F">text</a>, <a href="/pages/iJgvHoFu1Dg3IvxKO9n6">buttons</a>, <a href="/pages/sxe485tIPRmezA67Cs6E">icons</a> and <a href="/pages/UsQ4TqOUGrFQowPvPUtT">images</a>.</td><td><a data-mention href="/pages/9eJHyuwFQJDwQS1qlBOI">/pages/9eJHyuwFQJDwQS1qlBOI</a></td></tr><tr><td><strong>Input forms</strong></td><td>Elements like <a href="/pages/eOqu1TXlH8wgABBkjH7N">text input</a>, <a href="/pages/sfWTwg13FnvOpHbAMXdp">date/time picker</a>, <a href="/pages/sVSOJ1fIPoujgYWlz1Pn">checkbox</a> and <a href="/pages/vxzVAbVicZaq68fDFJys">selectable list</a>.</td><td><a data-mention href="/pages/7vfkzhrVSTfYL6lYBjt9">/pages/7vfkzhrVSTfYL6lYBjt9</a></td></tr></tbody></table>

### Reusable elements

<table><thead><tr><th width="177.8778076171875">Category</th><th width="370.5230712890625">Description</th><th>Article link</th></tr></thead><tbody><tr><td><strong>Reusable element</strong></td><td>A reusable element is a container (similar to a group) that holds other elements and can be placed in multiple locations throughout your app.<br><br>Reusable elements work for both web apps and mobile, but they function independently. A reusable element for web cannot be used in a native mobile app, and vice versa.</td><td><a data-mention href="/pages/VRxVim4gVREYJJ7kcKEO">/pages/VRxVim4gVREYJJ7kcKEO</a> (web and mobile)</td></tr></tbody></table>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: Each **page** of your app is defined as the top element, that all other elements are contained within. Each page has a unique URL and a unique collection of elements and workflows.​\
    \
    Article: [The page](/help-guides/design/elements/web-app/the-page)

[^4]: Each view in a native mobile app is a full-screen state that the app transitions between as the user navigates. Like pages, each view has its own collection of elements and workflows, but unlike pages, views don't have URLs.<br>

    Article: [The view](/help-guides/design/elements/ios-and-android-app/the-view)

[^5]: *Plugins* are extensions that you can use to extend Bubble's capabilitie&#x73;*.* They can add new elements, actions, API connections and a lot mor&#x65;*.*

    Article: [Plugins](/help-guides/integrations/using-plugins)

    Reference: [The plugin tab](/core-resources/bubbles-interface/plugins-tab)\
    \
    \
    \ <br>
