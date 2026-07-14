# Design tab
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
Bubble introduced a new responsive engine in 2021. If you have an older app, you may still see the legacy engine and its properties. We recommend that you update your app to the new responsive engine. The documentation for the legacy responsive engine is available in the link below.

Article series: [Responsive design (legacy)](/help-guides/design/responsive-design/legacy-articles)
{% endhint %}

## The UI builder

The UI Builder is your workspace for crafting and tweaking visual components on your app's pages.

Using Bubble's intuitive WYSIWYG[^1] editor, you can visualize how elements will appear to your app's end-users. As you design, keep in mind that elements[^2], including containers[^3] and visual elements, come with layout settings to ensure responsive designs.

By default, every Bubble app includes certain pages[^4] such as the 404 page, displayed when users access a non-existent URL on your app, and the reset\_pw page for password resets. To manage multiple pages or dive into reusable components, navigate using the dropdown on the top left of the top bar.

Article series: [Design](/help-guides/design)

## The element tree

The element tree displays all the components present on the page. Indentation indicates a hierarchy, where an element resides within a container. Note that elements can be nested multiple times, like groups inside groups, and so on.

<figure><img src="/files/ntBrRs6NXT9pVO7O4GtY" alt=""><figcaption><p>The element tree shows all elements on the page in a hierarchy.</p></figcaption></figure>

Article: [The element tree](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-element-tree)

## The element pallet

The element pallet lists all the elements that you can place on the page. Bubble comes with a long list of different elements, and more can be added with plugins.

<figure><img src="/files/wWIByBB9TiUSRUi7OtWp" alt=""><figcaption><p>The element pallet contains all the different types of elements you can add to the page.</p></figcaption></figure>

Elements are divided into categories for easy navigation:

* Visual elements
* Containers
* Input forms
* Reusable elements

You can also use the search bar to quickly find the element you are looking for. To place an element on the page:

* Drag the element from the element pallet
* Click the element in the element pallet and then "draw" it on the page

Article series: [Elements](/help-guides/design/elements)

## Responsive

You can switch the Design tab from UI Builder mode to the Responsive mode. Responsive settings refer to the configuration of how the page is displayed on varying screen widths - how the layout 'responds' to changing widths. As such, the Responsive tab allows you to quickly get a sense of how your page layout will respond depending on the screen size without previewing it live.

<figure><img src="/files/8UGhzn35q4yx2XXrKk6Z" alt=""><figcaption><p>Switching between <em>Design</em> mode and <em>Responsive</em> mode lets you tweak the page's responsive behavior.</p></figcaption></figure>

At the top of the left flyout of this sub-tab, there are shortcuts to snap the page width to different common screen widths, e.g. mobile portrait, mobile landscape, tablet and laptop. You can also change the page width to any arbitrary width using the ruler at the top.

The responsive type will also show you the current size of the selected element as well as its parent.

Article series: [Responsive design](/help-guides/design/responsive-design)

## Other ways to learn

<details>

<summary>Related articles</summary>

**Design**\
This section covers how to place elements on the page, tweak their settings and layout properties and how the different element types work.\
Article series: [Design](/help-guides/design)\
\
**Responsive design**\
This section covers how you set your app up to behave on different devices and screen sizes. The core reference entry covers the different responsive properties available.\
Article series: [Responsive design](/help-guides/design/responsive-design)\
Reference: [Responsive properties](/core-resources/elements/responsive-properties)<br>

**Previewing your app**\
For every change you make, you can preview your app in the Development Environment.\
Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

</details>

<details>

<summary>Core reference</summary>

* [The design tab](/core-resources/bubbles-interface/design-tab)

</details>

[^1]: "WYSIWYG" stands for "What You See Is What You Get."\ <br>

    In the context of the Bubble editor, it means that the layout and elements you arrange and design in the editor will look and behave similarly when previewed or live.

    Essentially, it allows you to visually build and see the app as users will experience it.

[^2]: *Elements* are the visual components or building blocks used to design and structure the user interface of a Bubble app.

    They can range from basic items like text and buttons to more complex widgets like sliders and maps.

    Article series: [Elements](/help-guides/design/elements)

    Reference: [Element settings](/core-resources/elements)

    <br>

[^3]: Containers are used to contain elements and control how they behave on the page.\ <br>

    You can place elements inside of a container, making it the parent and the element(s) its children. The element tree will display the hierarchy of the parent-child relationship.

    Article series: [Containers](/help-guides/design/elements/web-app/containers)

    Reference: [Container settings](/core-resources/elements/containers)

    Reference: [Container layout settings](/core-resources/elements/container-layout-types)

[^4]: The *page* is the canvas on which you place input elements, text, images, icons, videos and everything else that your users need to make use of your app. Every page has a unique URL.

    Article: [The page](/help-guides/design/elements/web-app/the-page)
