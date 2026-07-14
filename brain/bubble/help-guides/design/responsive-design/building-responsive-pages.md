# Building responsive pages
> Source: https://manual.bubble.io/help-guides/design/responsive-design/building-responsive-pages · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Parent-child relationships

As we explored in the [section about Bubble elements](/help-guides/design/elements), the design of your app consists of a hierarchy of parent-child relationships. The page itself is the parent of all other elements, and on that page you can place [*Containers*](#user-content-fn-1)[^1] that become the parent of elements inside it.

<figure><img src="/files/7pGcCqolbevIbadBylEc" alt=""><figcaption><p>In this example, the group that contains all the other elements is the <strong>parent</strong> and the input fields and button are all <strong>children</strong> of that group.</p></figcaption></figure>

Containers can also contain containers, making the former the parent of the latter and you can build as many levels of this parent-child relationship as you need. This makes up the basis for the building responsive pages.

In this guide we will illustrate the parent container with a dashed border, as exemplified below:

<figure><img src="/files/7GzriP2mr2dhStr03j6w" alt=""><figcaption><p>The parent container will be highlighted with a dashed line throughout this guide.</p></figcaption></figure>

## Parent settings and element settings

Setting up the responsive behavior of a given element is done by mixing the settings on the parent container and the element itself. If the element is placed directly on the page, that page is the parent container, but if you place it into a container element, the settings on that element will affect all its child elements.

The settings on the **parent container** determines where the elements are positioned relative to the container and each other. For example, they can be positioned vertically (in rows) or horizontally (in columns). The settings on the container is also used to determine the alignment of the overall layout (such as determinging whether a row should start on the left or right side of the container), the total dimensions of all the content and the spacing between rows and columns

The settings on the **child elements** determines the layout settings to that element in particular: how tall and wide should it be? How much room should the element maintain around and inside of itself (padding and margin) relative to the parent element and sibling elements?

## Container layout settings

Each container element (including the page itself) has a *Layout* setting, and this setting controls the behavior of all the elements inside of it. You can see the different Layouts as a set of rules that tells the children inside of it how to position themselves.

<figure><img src="/files/yVRMAujw7IWBxiaAd4bU" alt=""><figcaption><p>The container layout is located in the <em>Layout</em> tab of the Property Editor for the container (parent) element.</p></figcaption></figure>

Their position then is based on three factors:

* The layout setting of the parent container
* The layout settings on the element itself
* The settings and position of its sibling elements (the other elements inside of the same container)

There are four types of layouts on the **container elements**:

* Fixed
* Align to Parent
* Column
* Row

### Fixed layout

Fixed layout lets you move and place an element freely within the parent container and it will position itself on that point. The position is set in an absolute X and Y pixel value, and the size of the element in a W(idth) and H(eight) value.

The position is relative to the parent element: in other words, the element will be positioned exactly X and Y pixels from the top left corner of the parent container.

In the animation below you can see that the button can be positioned freely in the parent element. The red outline on the parent group container indicates that the element will be (remain in this case) a child of that group.

<figure><img src="/files/ExmgdV1NBczsy3hkuKYO" alt=""><figcaption><p>Fixed layout lets you set an absolute X and Y position using drag and drop.</p></figcaption></figure>

The use of fixed layout can be useful in certain scenarios but can be a bit more challenging to manage on different screen sizes and resolutions.

<figure><img src="/files/7PTyJ01hw8DnpgiACVMF" alt=""><figcaption><p>The four values highlighted above determine the element's width, height, X position and Y position .</p></figcaption></figure>

#### Parent and child layout settings (fixed layout)

#### Parent Layout Controls

None

#### Child Layout Controls

* Width and Height

### Align to parent layout

Align to parent divides the parent element into a nine-cell grid and lets you align child elements to any of the cells. In the illustration below you can see how a rectangular group is divided into upper-left, upper-middle, upper-right and so forth.

<figure><img src="/files/y6ymJguP3LyIam1lZDr1" alt=""><figcaption><p>The Align to parent layout lets you align child elements to one of the cells in a nine-cell grid.</p></figcaption></figure>

If you create a new child element or drag and drop one, it will automatically snap to the nearest cell:

<figure><img src="/files/dJ9JVxkIpI7aMmlBT2QS" alt=""><figcaption></figcaption></figure>

You can also control the position of the element by opening the Property Editor for the child element. Each of the arrows below represent the different cells of the parent container:

<figure><img src="/files/PMeh0yzWKd3o7XjvyS0Z" alt=""><figcaption></figcaption></figure>

#### Multiple elements

If you want to place multiple elements in the same cell, such as the top left, you may find that the elements overlap. If you want them to align themselves relative to each other, you can place them within a second group and set a different layout for that group.

#### Parent and child layout settings (align to parent layout)

#### Parent Layout Controls

None

#### Child Layout Controls

* Pin to specific cell
* Width and Height.

### Row layout

Child elements in a row container are aligned one after the other horizontally. The child elements will wrap as the screen is resized or the total width of the elements exceeds the parent containers width.

<figure><img src="/files/ljl50H5OKzBTDy7hB264" alt=""><figcaption><p>Each element added to a row layout will be positioned at the end of the row, and wrap if the total width of the child elements exceeds the width of their parent container.</p></figcaption></figure>

New child elements drawn inside the container will be added to the end of the list by default but can be re-ordered using the order controls or by dragging and dropping.

<figure><img src="/files/Ygo5dOu4hOM0wG2wMSf5" alt=""><figcaption><p>Elements can be reordered by dragging and dropping or by using the buttons in the Property Editor.</p></figcaption></figure>

#### Parent and child layout settings (row layout)

#### Parent Layout Controls

* Container Alignment
* Row gap
* Column gap

#### Child Layout Controls

* Vertical Alignment
* Order Selection
* Width and Height.

### Column layout

Child elements in a column layout will be place on top of each other, regardless of the width they take up:

<figure><img src="/files/45M7dsH5bQCqQ4ineARr" alt=""><figcaption><p>Each element will be placed at the bottom of the column.</p></figcaption></figure>

In the example above, the parent group is set to stretch as the content of it expands. As more and more elements are made visible, the height of the group increases automatically:

<figure><img src="/files/0Eduw8VyAGo89Azm9g8R" alt=""><figcaption><p>For the <em>Fit height to content</em> setting to work as expected, the minimum and maximum height must be set accordingly.</p></figcaption></figure>

#### Parent and child layout settings (column layout)

#### Parent Controls

* Row gap

#### Child Controls

* Horizontal Alignment
* Order Selection
* Width and Height

### Alignment

In row and column layout, you can set the alignment of child elements: where should the row or column start? For example, in a column layout the child elements stack on top of each other: should that stack start at the bottom or at the top of the container element?

Alignment is used both to determine the element's starting position, and how they should be spread out across the parent container.

{% hint style="info" %}
You can read more about each individual layout setting in our core reference article about row and column layouts.\
\
You'll find the section about [rows](/core-resources/elements/container-layout-types#row) here and columns [here](/core-resources/elements/container-layout-types#column).
{% endhint %}

## Element layout settings

In the above section we covered how a container's layout settings affect its child elements. In this part we'll have a look at how the settings on each individual child element is used.

<figure><img src="/files/q8M0ReKPrlj1VPYqzZx0" alt=""><figcaption><p>An element's alignment properties determine how the element should be positioned within the constrainta set by its parent container.</p></figcaption></figure>

In short the element settings are used to control the behavior of that specific element, as opposed to the container layout settings that affect *all* child elements. On the element you can set stuff like:

* How **wide** should the element be?
  * No restriction
  * Fixed width
  * Minimum/maximum width
  * Stretch with content
* How **tall** should the element be?
  * No restrictions
  * Fixed height
  * Minimum/maximum height
  * Stretch with content
* How should the element be **aligned** relative to the parent containers layout
* Should the element collapse its width/height when its hidden?
* Margin/Padding

As you can see from the settings, this gives you the freedom to control how individual elements behave *within* the constraints you have set on the parent container.

<figure><img src="/files/DlI0sDQKKiqeTIdb6b4d" alt=""><figcaption><p>The container's layut setting is column, making the child elements stack vertically. But their width is set on an element level, as illustrated in the example above.</p></figcaption></figure>

## Using the Responsive Viewer

You will find a tab above the New Element palette that lets you switch between the UI Builder view, where you can modify elements, drag new ones, and delete some, and the Responsive Viewer which lets you manage screen widths, known as breakpoints, and test how your page behaves as the breakpoint changes. In this view, the ruler at the top of the page area defines the current page width. Just click or drag on the ruler to resize the page and see how the page behaves dynamically.

You can also use the preset width icons on the left side of the screen to see how the page looks on mobile in portrait mode, in landscape mode, on a tablet and on a laptop or a desktop.

When you click on an element, the Layout tab in the Property Editor will display the different parameters you can modify to affect its behavior.

### Managing Breakpoints

Your Bubble app comes with a Default breakpoint, four preset breakpoints, and the ability to add custom breakpoints. The Default breakpoint is equal to the Default builder width value that is set for that page.

The four presets are:

* Mobile (320 px)
* Mobile Landscape (768 px)
* Tablet (992 px)
* Desktop (1200 px)

You can use any of your app’s breakpoints to test the page behavior on the Responsive Viewer tab and as data sources to set “Current page width” conditionals on any element.

### **Viewing breakpoints**

All Bubble preset breakpoints are initially added to the page’s toolbar for ease of use. Any other breakpoints are added to the toolbar when the breakpoint is being use as a data source in a conditional on the page.

Breakpoints listed in the breakpoints dropdown are all the presets and custom breakpoints that exist in the app.

### **Creating a new custom breakpoint**

You can create a new custom breakpoint by clicking “Add custom” within the breakpoints dropdown.

### **Editing breakpoints**

You can edit any breakpoint on the toolbar or in the breakpoints dropdown.

Editing a custom breakpoint will edit the data source and update the breakpoint wherever it is referenced in the app.

Editing a preset breakpoint will create a new custom breakpoint and update any reference of the breakpoint to the new custom breakpoint.

Example: Changing the preset breakpoint Mobile from 320 px to 325 px will result in the creation of a custom breakpoint named Mobile (Custom) (325 px) and all references to Mobile will now reference Mobile (Custom) (325 px).

### **Removing and deleting breakpoints**

You can remove any breakpoint from the toolbar, but this does not delete it as an available data source.

You can delete any breakpoint from the breakpoints dropdown. Deleting a breakpoint from the dropdown will remove it from any pages that are using it. This will in turn unlink it from any referenced conditionals and flag an issue in the issue checker to fix those conditionals.

<br>

## Other ways to learn

<details>

<summary>Video lessons</summary>

We have several video lessons that can help you learn about designing responsive pages.

* [Recorded Webinar: Responsive design in Bubble](https://www.youtube.com/watch?v=qZUFCmAaGik)
* Column and Row layout
  * [Understanding the column container layout](https://www.youtube.com/watch?v=VeJKByCma1k\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6\&index=1)
  * [Understanding the row container layout](https://www.youtube.com/watch?v=a-paDi5Nj5o\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6\&index=2)
* [How to build a sidebar layout](https://www.youtube.com/watch?v=xPr2C-CcW_k\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6\&index=3)
* [How to build a responsive navigation bar](https://www.youtube.com/watch?v=3lUlmTZ_IQo\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6\&index=4)
* [Dragging and dropping elements in the element tree](https://www.youtube.com/watch?v=DJOcPN0O0Co\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6\&index=12)
* [Layout and sizing properties in Conditionals](https://www.youtube.com/watch?v=ezxvJ2cj7R4\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6\&index=13)
* [Padding in a container element](https://www.youtube.com/watch?v=rR1eI6Lv4_I\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6\&index=14)
* [Scrolling overflowing content](https://www.youtube.com/watch?v=v4b9BYmHtNw\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6\&index=15)
* [Gap spacing for row and column layouts](https://www.youtube.com/watch?v=6iIOE93gF1s\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6\&index=16)
* [How to use the align to parent container layout](https://www.youtube.com/watch?v=c7vAhhAJO5o\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6\&index=17)

You'll find our full Youtube playlist about the responsive editor [here](https://www.youtube.com/watch?v=VeJKByCma1k\&list=PLoNVJrdvQQYm8x9PXaRPiuXWa8AdJRNz6).

</details>

[^1]: *Containers* are a category of elements in Bubble that can contain other elements. For example, you can place all the input fields in a registration form inside of a Group element, and what Group will be the parent of those input elements.\
    \
    There are several different types of containers that serve different purposes.\
    \
    Article series: [Containers](/help-guides/design/elements/web-app/containers)
