# Reusable Elements
> Source: https://manual.bubble.io/core-resources/elements/reusable-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

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

A reusable element creates an element that contains other elements, like a group, that can be used in more than one place. This is useful when reusing the same elements often. Using reusable elements keeps the app smaller and makes it easier to edit.

### Type of element

A reusable element can be a Group, Popup, or Floating Group. In the case of a popup, the reusable element will be behave like a popup, i.e., modal and have a grayout until it is shown.

### Type of content

This allows you to select the type of thing this container displays. Most elements that have this property also have a Data source property, which lets you select the displayed thing or list of things. The value of the data source must match the selected type of content.\
\
Let's look at an example of a map with hotels marked. When you click a marker, a popup displays with the name of the hotel. The Type of content would be 'Hotel' and the Data source would be 'Map's current marker.'

### Data source

Define the thing or list of things that should be displayed in this container. For example, in groups or popups, only a single thing will display, but for repeating groups a list of things will display.\
\
Child elements can access the Data source from their parent. If the parent contains a list of things, the child has access to the individual list items.\
\
A common scenario for groups is to display something, like the current user, and then have the group contain the inputs that modify the user's properties, such as text and images that display information about the user.\
\
The Type of content determines what kind of thing you are allowed to set in the Data source field. If the type of thing does not match the Data source, it will be marked as an issue, and you must change one or the other to match.\
\
The Data source can come from anywhere in Bubble. For example, it could be the result of a search, a custom or built-in Data source, or it could be dynamic and come from the user. The Data source will update when its source changes. For example, if the search result changes because a user modified some data used in the search constraints, the displayed list will automatically change. For additional flexibility, you can update the Data source in the Conditional Formatting Tab in the Property Editor.

{% hint style="warning" %}
**Note:** While the "auto updating" behavior of a Reusable Element's dynamic data source is generally desirable, there are certain scenarios where this may cause unexpected behavior. For example, consider the following scenario:

Your page has a Repeating Group to display a List of Things, where each cell contains a Reusable Element. The Repeating Group's List of Things is sorted by some field on the Data Type and inside the Reusable Element is an auto-binding popup form that changes that Thing's sorting field. When the popup is open, and the order of the List of Things is changed, the popup will lose its reference to the Thing from the original cell and instead reference the new cell in its place.

To workaround this limitation, consider making the popup form non auto-binding. Or, create a static reference to the Thing in the Reusable element by setting a custom state equal to the Reusable Element's thing when opening the popup form and having the popup reference the custom state.
{% endhint %}

Finally, the Data source property can be modified by workflows. Changes made by actions override whatever you specify as the Data source directly or as a conditional state until you run a reset action, which then restores the original setting.

### Delete this reusable element

Delete the reusable element. Pages using this element will display a 'Deleted reusable element' placeholder.

### Reusable element properties

You can add additional properties to a reusable element that can then be used to pass data to and from that element:

* **Dynamic value**: any [basic data type](#user-content-fn-3)[^3] or [custom data type](#user-content-fn-4)[^4]
* **Color picker:** a [hex color code](#user-content-fn-5)[^5] or a saved [color variable](#user-content-fn-6)[^6].
* **Checkbox:** a [yes/no value](#user-content-fn-7)[^7] to or from the reusable.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: These are Bubble's built-in types such as text, numbers, dates, yes/no, etc.

[^4]: These are the data types that you have created for your app specifically, be it products, articles or something else. They can be given any name and assigned any number of fields.

    Article: [The database](/help-guides/data/the-database)

[^5]: A *hex color code* is a six-digit alphanumeric code that represent colors.

    Each hex color code begins with a hash sign (#) followed by six characters divided into three pairs, each representing the intensity of red, green, and blue in the color.\
    \
    For example, #000000 represents no color intensity in any of the red, green, or blue channels, resulting in the color black.

[^6]: Color variables let you save a palette of colors that you can apply throughout your Bubble app and maintain from one place.

    Article: [Color variables](/help-guides/design/variables-and-styles/color-variables)

[^7]: Yes/no is one of Bubble's basic data types, and simply represents a true or false statement.\
    \
    If you have a traditional coding background, this is similar to a boolean.
