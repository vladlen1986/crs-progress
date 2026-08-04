# Design tab
> Source: https://manual.bubble.io/core-resources/bubbles-interface/design-tab · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for **beginner-level builders.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (3)" %}
**The Bubble editor**\
In this article series we cover all the different tabs and tools available in the Bubble editor.

Article series: [The Bubble editor](/help-guides/getting-started/navigating-the-bubble-editor)\
Article: [The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

**Design**\
In this article series we cover how to design your app – everything from element types to styling.

Article series: [Design](/help-guides/design)
{% endtab %}
{% endtabs %}

{% hint style="info" %}
This is the short-form core reference entry for the design tab where we cover the technical details of the interface. For a more in-depth article, see the link below:

Article: [The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)
{% endhint %}

This is where you design the visual appearance of the app. Draw elements on the page, drag and resize them, and adjust their properties and appearance.

### Adding elements

To add a new element, click an element type in the palette on the left, then click and drag on the page to insert it. Double-clicking on an element reveals the Property Editor, where you can customize the element's appearance and behavior. Right-clicking on an element displays a drop-down menu with additional editing options.

## UI Builder

The UI Builder is where you can add new elements to the page and modify any existing elements. Bubble pages are by default a "what you see is what you get" (WYSIWYG) editing experience - whatever you create in this tab is generally what an end-user of your app will see. Containers and Visual elements also have layout settings, which control a page or element's responsive behavior. When designing responsive pages, your page's layout will scale gracefully as the end user's screen gets larger or smaller.

### Opening the property editor for an element

Clicking on an element reveals the Property Editor, where you can customize the element's appearance and behavior. Right-clicking on an element displays a drop-down menu with additional editing options.

This is also true for the page itself.

## Elements Tree

<details>

<summary>Related articles</summary>

* Article: [The element tree](broken://pages/I16X4KOwxZmqx2I6J6XO)\
  How the Element tree works.
* Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)\
  Introduction to how elements on the page are sorted into a hierarchy that affects their look and responsive behavior.

</details>

The elements tree shows all the elements that currently exist on the page. Indentation signifies a parent/child relationship between a container and the contents of that container - remember that there can be multiple levels of nesting (e.g. groups within groups within ...)

### Drag and drop

The elements tree also allows you to re-order and re-parent elements on the page by dragging and dropping items where you want them. Elements inside a group are ordered differently depending on the container layout type selected (more below).

#### Behavior

* Clicking and holding an element will allow you to drag, and a line will appear to indicate where you will be dropping your element.
* Groups will highlight when hovered to indicate that you are dropping within that group.
* If you hover over a collapsed group for more than one second, it will expand automatically.
  * If you drag into a collapsed group, the element will default to be the last child in the list
* Elements can be re-ordered within a parent container.
  * Fixed and Align to Parent containers sort their children by ascending z-index. Reordering within a Fixed or Align to Parent will change z-index.
  * Row and Column containers sort their children by ascending order. Reordering within a Row or Column will change the order of an element.
* Elements can be moved from one parent container to another.
  * Into Fixed: The element that is dropped in will respect z-index and default to top left position.
  * Into Align to Parent: The element that is dropped will respect z index and default to top left position.
  * Into Row: The element that is dropped will respect the existing order.
  * Into Column: The element that is dropped will respect the existing respect order.
* Draggable elements include containers nested within a parent container.

#### Limitations

* We have disabled drag and drop for popups, group foci, and floating groups, as they rest above the page and cannot be nested into other groups. You can, however, drag other elements into these containers.
* You may not drag a group into itself.

## Element palette

Below the elements tree is the palette of all elements that you have access to for building your app. Bubble comes with many built-in element choices; you can also gain access to new elements via plugins.

The element palette is divided into a couple of sections for organization. Visual elements are ones that generally simply display something on the page. Container elements are elements that can contain other elements, including other containers. Input form elements generally allow the end-user to provide some kind of input, whether it be text, files, or something else.

Below that is the section of reusable elements available in the app. And at the bottom is a section of two special element templates: tab element and signup login form, which are two common user interfaces that might be helpful in your app.

### Adding elements

To add a new element:

* click an element type in the palette on the left
* click and drag on the page to insert it

## Element Inspector

<details>

<summary>Related articles</summary>

* Article: [The element property inspector](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-property-editor)\
  How the Element property inspector is accessed and how it works.

</details>

This slidable inspector shows a view of how the selected element is used on the page. Since an element can be used in many different places, such as in events, actions, or other elements, this centralized view is helpful.

The Element Inspector shows the element's custom states and allows you to modify, delete, and add a new state. The element's events and actions are also shown along with the other page elements referring to the current element.

Clicking on an entry takes you to the appropriate place in the Bubble Editor.

## Responsive

<details>

<summary>Related articles</summary>

* Article: [Responsive design](/help-guides/design/responsive-design)\
  Setting up responsive[^2] pages in Bubble.
* Article: [Design and UX | Building your first app](/help-guides/getting-started/building-your-first-app/design-and-ux)\
  Introduction to design and [user experience](#user-content-fn-3)[^3], and different tools and sites for inspiration.

</details>

You can switch the Design tab from UI Builder mode to the Responsive sub-tab. Responsive settings refer to the configuration of how the page is displayed on varying screen widths - how the layout 'responds' to changing widths. As such, the Responsive tab allows you to quickly get a sense of how your page layout will respond depending on the screen size without previewing it live.

At the top of the left flyout of this sub-tab, there are shortcuts to snap the page width to different common screen widths, e.g. mobile portrait, mobile landscape, tablet and laptop. You can also change the page width to any arbitrary width using the ruler at the top.

### **Responsive Breakpoints**

Your Bubble app comes with a Default breakpoint, four preset breakpoints, and the ability to add custom breakpoints. The Default breakpoint is equal to the Default builder width value that is set for that page.

The four presets are:

* Mobile (320 px)
* Mobile Landscape (768 px)
* Tablet (992 px)
* Desktop (1200 px)

You can use any of your app’s breakpoints to test the page behavior on the Responsive Viewer tab and as data sources to set “Current page width” conditionals on any element.

### **Creating a new custom breakpoint**

You can create a new custom breakpoint by clicking “Add custom” within the breakpoints dropdown.

### **Editing breakpoints**

You can edit any breakpoint on the toolbar or in the breakpoints dropdown.

Editing a custom breakpoint will edit the data source and update the breakpoint wherever it is referenced in the app.

Editing a preset breakpoint will create a new custom breakpoint and update any reference of the breakpoint to the new custom breakpoint. E.g. changing the preset breakpoint Mobile from 320 px to 325 px will result in the creation of a custom breakpoint named Mobile (Custom) (325 px) and all references to Mobile will now reference Mobile (Custom) (325 px).

### **Removing and deleting breakpoints**

You can remove any breakpoint from the toolbar, but this does not delete it as an available data source.

You can delete any breakpoint from the breakpoints dropdown. Deleting a breakpoint from the dropdown will remove it from any pages that are using it. This will in turn unlink it from any referenced conditionals and flag an issue in the issue checker to fix those conditionals.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Responsive* in this context means pages that are suitable for all screen sizes, by adjusting size and behavior based on specific rules.

[^3]: *UX* is the overall *feeling* of using your app, and not just how good it looks. Is it easy to use? Informative? Accessible to users with disabilities like impaired sight?
