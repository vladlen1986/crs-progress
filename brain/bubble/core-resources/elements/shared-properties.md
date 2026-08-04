# General properties
> Source: https://manual.bubble.io/core-resources/elements/shared-properties · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (11)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Tools**

* Article: [The element property editor](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-property-editor)

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

#### Design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)\
    Building pages that work on all devices, such as a laptop and a phone.
* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
{% endtab %}

{% tab title="Videos (1 playlist)" %}
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)
{% endtab %}
{% endtabs %}

The properties here apply to **all** [**elements**](#user-content-fn-3)[^3] in Bubble.

## Changing the parent element's type of content

This option modifies the type of content of the parent element on the fly. The type of content defines what type of thing a group should expect, so that you can refer to it when editing the app. For example, a group can receive a user, who isn't necessarily the current user, and then you can add a text element in the group to display the 'Parent group's user's email.'

## This element is visible on page load

Check this box to make the element [visible by default](#user-content-fn-4)[^4]. This checkbox makes the element visible every time the page loads or reloads[^5]. Change the visibility of the element based on certain conditions[^6] in the Conditional section in the [Property Editor](#user-content-fn-7)[^7] or with a show/hide element action[^8] in a workflow.\
\
To find hidden elements[^3] quickly, click the 'Only show hideable' checkbox in the Elements tree in the Palette. Clicking on the name shows or hides the element for editing purposes only. Like other properties, this setting can be overwritten by a condition on an element or by a [show/hide action](#user-content-fn-9)[^9] in a workflow. Actions take precedence over conditions which take precedence over the default setting.

{% hint style="warning" %}
**Note on security:** Be aware that tech-savvy users can access the underlying static content of any page, even if certain elements are hidden from their view. As such, never place sensitive information such as private URLs or tokens in hidden elements on the page.

You can read more about maintaining page security in our dedicated article below:

User manual article: [Page security](/help-guides/security/page-security)
{% endhint %}

## Replace element

Click this button to replace an element[^3] with an element of a different type. For example, change an element from a [checkbox](/core-resources/elements/input-forms#checkbox) to a [radio button](/core-resources/elements/input-forms#radio-buttons) or from a [group](/core-resources/elements/containers#group) to a [popup](/core-resources/elements/containers#popup).

Elements can only be replaced by elements within their own [category](/core-resources/elements). For example, a [text input element](/core-resources/elements/input-forms#input) [(input forms](/core-resources/elements/input-forms) category) cannot be replaced by a [group](/core-resources/elements/containers#group) ([container](/core-resources/elements/containers) category).

{% hint style="warning" %}
This operation may lead to inconsistencies, so check the Issues Checker to make sure no new issues are introduced. If you are experiencing issue, you can use Undo to revert the change.
{% endhint %}

## Style

Select a style[^10] from this dropdown menu to apply to the selected element. Styles are defined in the [Styles Tab](#user-content-fn-11)[^11] and can be applied to more than one element. When a style is modified, all elements with that style will automatically change. Using styles makes editing the app faster and ensures a consistent design.

## Detach style

Clicking this button detaches the style from the selected element. The style association is detached, but the properties of the style remain on the element.

The style is not changed or deleted, only detached from the specific element.

## Edit style

Clicking this button displays the Styles Tab and selects the current element's style.

## Override style

To override a style, change one of its values. The style dropdown will show an *(overriden).*

### Reset

To reset the elements style back to the selected style, click *Reset* next to *Appearance settings*. This button is only visible when the style is overriden.

### Notes on resetting styles

A few notes on the behavior of Style overrides:

* Resetting will change any overridden values on a tab by tab basis
* If you override any values, and then update the attached Style, the overridden values will not change - even if those settings on the Style were updated
* If you override any values, and then detach the Style, the overridden values will not change
* If you override any values, and then detach the Style, and then reattach a Style, the overridden values will be removed in favor of the new Style’s inherited values.
* If you override any values, and then change the overridden value back to the original value, the value will still be considered an override. To “re-attach” the value, use the reset button
* If you override any values, and then create a new Style from the element, the overridden values will carry over to the new Style
* Conditionals cannot be overridden yet. If you want to override an inherited conditional, simply add a new style that has the behavior you want since conditionals are evaluated from top to bottom

## Select parent

This dropdown shows all the [parent elements](#user-content-fn-12)[^12] of the element you are currently editing.

## Reveal in Elements Tree

Clicking this button shows where the element is in the [Elements tree](#user-content-fn-13)[^13].

## Lock this element (not draggable in editor)

When this box is checked, the element will not be draggable in the Bubble editor. This is useful when working on large pages. This has no impact in run-mode[^14].

## ID Attribute (advanced)

{% hint style="warning" %}
Note: This is an advanced feature best suited for those with at least a basic understanding of CSS.
{% endhint %}

If you activate the option *Expose the option to add an ID attribute to HTML elements* in the Settings Tab, you can specific a unique ID for some element on the page. This ID will be applied in run mode to the outer div around the element.\
\
**Warning**: Bubble does not guarantee that the internal structure of the divs will remain the same over time. What is guaranteed here is the ID will be applied to the outer element. Keep this mind as you use IDs.

## Margins

Margins create extra space **around** an element. Margins define the overall size of a visual element on the page and how it interacts with elements around it in both fixed and responsive layouts.

For example, in a fixed container layout, margins can be used to provide even spacing around elements in a form. In a row container layout, margins will be added to the min and max width of the element to inform when the element should wrap to the next row.

In addition, margins will align and snap based on the margin border, not the element border. If the margin is 0, the margin border and element border will be the same.

Margin controls are available on all elements in the Layout tab of the property editor. These controls are also available in conditional statements to replace the legacy responsive “collapse margins” functionality.

{% hint style="info" %}
**Tip:** In a responsive container, margins will help you position a child element where you want it once you have selected the appropriate alignment option. For example, if you have a button in a **column** container and you want the button to be 30px from the bottom of the container, simply **bottom-align** the button and add 30px of margin to the bottom of the button element.
{% endhint %}

<div align="center"><img src="/files/iNmFhbxoNJ24oxWjJE1u" alt=""></div>

### Top <a href="#margin-top" id="margin-top"></a>

Specify the amount of margin at the top of the element in pixels.

### Right <a href="#margin-right" id="margin-right"></a>

Specify the amount of margin on the right side of the element in pixels.

### Bottom <a href="#margin-bottom" id="margin-bottom"></a>

Specify the amount of margin to the bottom of the element in pixels.

### Left <a href="#margin-left" id="margin-left"></a>

Specify the amount of margin on the left side of the element in pixels.

## Padding

Padding creates extra space **within** an element. In general, padding defines the amount of "usable" space inside of an element. Since new padding controls are only available on Containers (for now), padding will define how close to the edge of a parent container a child element is allowed to get.

For example, in a Column container layout, a padding of 30px on the left and ride side of the container will add 30px of space inside the container on each side. If the Parent container's width is set to 420 px, the largest width any child element could have is 360px - (420px - (30px \*2)).

If a parent container has padding applied, child elements will align or snap on the boundaries of the padding area, not the container border.

Similar to margins, padding controls are also available in conditional statements and can be saved in Styles[^10].

![](/files/4bdlnAViKKnK3kmw4XtE)

### Top <a href="#padding-top" id="padding-top"></a>

Specify the amount of padding at the top of the container in pixels.

### Right <a href="#padding-right" id="padding-right"></a>

Specify the amount of padding on the right side of the container in pixels.

### Bottom <a href="#padding-bottom" id="padding-bottom"></a>

Specify the amount of padding to the bottom of the container in pixels.

### Left <a href="#padding-left" id="padding-left"></a>

Specify the amount of padding on the left side of the container in pixels.

### Style / Style (overridden) <a href="#edit-style" id="edit-style"></a>

![](/files/F7EW9ulCsUv6n747tOH8)

If padding is applied to this element from a Style[^10], click this link to navigate to the Styles tab to make edits to the Style as needed. If you have made changes to the padding that differ from the style, the link will say *Style (overridden)*. You can reset to the style's setting using the [*Reset* link](#reset) on the right-hand side.

If you don't have a style applied, this setting will not be visible.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: Elements are the objects you place on the page in the Design tab, such as text, images, buttons and icons.

    Reference: [Elements](/core-resources/elements)\
    Article series: [Elements](/help-guides/design/elements)\
    Article: [The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

[^4]: Visible by default means that the element is visible when you load/reload the page.

[^5]: The exception is is if you use the Go to page action and go to the same page you are currently on – in this case the element will keep its current visibility, since the page is not refreshed.

    Reference: [Action: Go to page](https://manual.bubble.io/core-resources/elements/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)<br>

    Reference: [Action: Refresh page](/core-resources/actions/navigation#refresh-the-page)

[^6]: *Conditions* are appliead to elements to make them change their apperance or behavior based on a specific condition. Conditions are built using dynamic expressions.<br>

    Article: [Conditions](/help-guides/logic/conditions)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^7]: The *Element property editor* is the floating window where you edit the properties and settings of the elements on the page.

    Reference: [Element properties](/core-resources/elements/shared-properties)\
    Article: [The element property editor](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-property-editor)

[^8]: An *action* is the part of a workflow that performs a specific task, such as making changes in the database, hiding/showing elements and sending API requests.\
    \
    Reference: [List of actions](/core-resources/actions)\
    Article series: [Workflows](/help-guides/logic/workflows)

[^9]: The *show an element* and *hide an element* actions are used to show and hide elements on the page.<br>

    Reference: [Show an element](/core-resources/actions/element#show-an-element)

    Reference: [Hide an element](/core-resources/actions/element#hide-an-element)

[^10]: *Styles* are predefined collections of styling properties that can be applied to multiple elements. For example, you can make multiple text elements or buttons look exactly the same, and update them in one place.

    Article: [Styles](/help-guides/design/variables-and-styles/styles)

[^11]: The *Styles tab* is where you create and manage styles in your app.

    Reference: [The Styles tab](/core-resources/bubbles-interface/styles-tab)\
    Reference: [Styling properties](/core-resources/elements/styling-properties)\
    Article: [The Styles tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/styles-tab)\
    Article series: [Styling](/help-guides/design/variables-and-styles)

[^12]: All elements are part of a hierarchy of parent and children elements. Elements that contain other elements are called *containers.*

    Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

[^13]: The *Element tree* is the left-hand bar in the Design tab where you can see the hierarchy of all the elements of the current page.

    Article: [The element tree](broken://pages/I16X4KOwxZmqx2I6J6XO)

    Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

[^14]: *Run-mode* in this context refers to your app, whether it is showing Development or Live, as opposed to the Bubble editor.

    Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)\
    Article: [Deploying your app](/help-guides/publishing-your-app/deploying-your-app)
