# Elements
> Source: https://manual.bubble.io/core-resources/elements · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

{% content-ref url="/pages/BQnH2YEYKKUO7W8X7ZHA" %}
[Navigating the Redesigned Property Editor](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/property-editor-beta/property-editor-migration-guide-for-existing-users)
{% endcontent-ref %}

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

Elements are things you draw on pages[^3]. They display images, text, and other information and enable users to interact with the app. Elements have properties that are controlled in the [property editor](#user-content-fn-4)[^4] in the Bubble editor.

Elements are classified into three categories:

1. **Visual elements**\
   Used to display information and trigger workflows[^5] when users interact with them (such as clicking a button)
2. **Containers:**\
   Elements that contain other elements.
3. **Input forms:**\
   Elements that users use to enter information.

Elements are either part of Bubble's core library or added with plugins[^6].

## Sections

This section covers all of the elements in the core library, respective parameters, and shared properties.

<details>

<summary>General properties</summary>

An element's general properties determines what they look like and how they behave.

[List of general properties](/core-resources/elements/shared-properties)<br>

If you are unfamiliar with what elements are, you can explore the more in-depth article series below:

User manual article series: [Elements](/help-guides/design/elements)

</details>

<details>

<summary>Conditional formatting</summary>

Conditional formatting means to change the visibility or appearance of an element based on specific conditions.

[Conditional formatting](/core-resources/elements/conditional-formatting)

If you are not familiar with what conditional formatting is and how dynamic expressions work, we recommend exploring the more in-depth user manual articles below:

User manual article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
User manual article: [Conditions](/help-guides/logic/conditions)

</details>

<details>

<summary>States</summary>

States (not to be confused with [custom states](#user-content-fn-7)[^7]) are situations the element can find itself in, such as being hovered or visible.

[States](/core-resources/elements/states)

</details>

<details>

<summary>Page element</summary>

The page element is the fundamental element that contains all the other elements. Each page gets assigned a custom URL in your app.

[Page element properties](/core-resources/elements/page-element)

If you want to learn more about how the page element and its hierarchy of elements work, we recommend viewing the in-depth article series below:

User manual article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)\
User manual article series: [The page](/help-guides/design/elements/web-app/the-page)

</details>

<details>

<summary>Visual elements</summary>

Visual elements are the elements you can place on that page that cannot contain other elements (groups) and cannot accept input (input elements), such as text, images and icons.

[Visual element properties](/core-resources/elements/visual-elements)

If you are unfamiliar with elements and would like to know more about how they work, you can check out or more in-depth guides below. You can also extend the number of available elements with plugins.

User manual article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)\
User manual article series: [Elements](/help-guides/design/elements)\
User manual article series: [Visual elements](/help-guides/design/elements/web-app/visual-elements)\
User manual article: [Plugins](/help-guides/integrations/using-plugins)

</details>

<details>

<summary>Containers</summary>

Containers are an element type that contains other elements.

[Container properties](/core-resources/elements/containers)

There are a few different types of container elements that each serve different purposes. If you want to know more about these different types we recommend checking out the articles below:

User manual article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)\
User manual article series: [Container elements](/help-guides/design/elements/web-app/containers)

</details>

<details>

<summary>Input forms</summary>

Input forms are elements that accept some sort of input from the user, such as text, numbers, dates and file uploads.

[Input form properties](/core-resources/elements/input-forms)

There are many different types of input forms, and to learn more about the different types we recommend checking out the more in-depth user manual articles below. You can also extend the number of different input forms with plugins.

User manual article series: [Input forms](/help-guides/design/elements/web-app/input-forms)\
User manual article: [Plugins](/help-guides/integrations/using-plugins)

</details>

<details>

<summary>Reusable elements</summary>

Reusable elements are collections of elements that can be re-used across your app. For example, if your app has a footer section, you can set that up as a reusable element and use across every page that needs that footer.

[Reusable element properties](/core-resources/elements/reusable-elements)

If you're unfamiliar with reusable elements and how they work, you may be interested in checking out our more in-depth user manuel article below:

User manual article: [Reusable elements](/help-guides/design/elements/web-app/reusable-elements)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: Each page of your app is defined as the top element, that all other elements are contained within. Each page has a unique URL and a unique collection of elements and workflows.

    Article: [The page](/help-guides/design/elements/web-app/the-page)

[^4]: The *property editor* is the draggable window where you can change the properties and settings of an element.

    You open it by double-clicking an element or clicking it in element tree.

    Article: [The property editor](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-property-editor)

[^5]: A *workflow* is the combination of an event that triggers a collection of action steps. This is what makes your app *do stuff.*

    Article series: [Workflows](/help-guides/logic/workflows)

[^6]: *Plugins* are extensions that you can use to extend Bubble's capabilitie&#x73;*.* They can add new elements, actions, API connections and a lot mor&#x65;*.*

    Article: [Plugins](/help-guides/integrations/using-plugins)

    Reference: [The plugin tab](/core-resources/bubbles-interface/plugins-tab)\
    \
    \
    \ <br>

[^7]: *Custom states* are variables that you can save on any element on the page, including the page itself. They let you store data temporarily that is reset when the page is reloaded.

    User manual article: [Custom states](/help-guides/data/temporary-data/custom-states)\ <br>
