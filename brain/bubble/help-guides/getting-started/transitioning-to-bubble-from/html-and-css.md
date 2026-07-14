# HTML and CSS
> Source: https://manual.bubble.io/help-guides/getting-started/transitioning-to-bubble-from/html-and-css · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This article explores the similarities and differences between HTML/CSS and Bubble.

First, let’s establish a simple fact: Bubble allows you to build web applications using the same languages that web browsers recognize – including HTML and CSS. While Bubble is often described as a no-code platform, a more accurate description in this context is that it takes the app that you have built visually, and then generates the underlying code—HTML, CSS, and JavaScript—that browsers can execute. When you view a page created in Bubble, what you see is the browser’s interpretation of this code. The JavaScript files acts as an “engine” that not only powers the page and its functions but crucially, it also manages communication between the user’s device and the Bubble server.

This is useful for those with an HTML and CSS background, as you'll quickly recognize that the logic and structure are fundamentally similar. However, Bubble adapts these principles to help non-technical users easily design and style their apps. Instead of typing code, it’s all done visually, using the page editor and styles. This holistic approach means that Bubble’s way of designing and the accompanying terminology may feel somewhat different from what you are used to, but you'll quickly find that the underlying principles share many commonalities.

## Page design and styling

### Elements

Building a user interface with HTML and CSS involves writing markup[^1] and styling code. You manually define the structure using HTML tags and style elements with CSS properties. For example, to create a button, you might write:

```html
<button class="my-button">Click Me</button>
```

And then add the CSS properties:

```css
.my-button {
    background-color: blue;
    color: white;
    padding: 10px;
}
```

You may also need to handle responsive design using [media queries](#user-content-fn-2)[^2] and other techniques to ensure your layout adapts to different screen sizes. Bubble moves the process of writing this code in HTML and CSS into its visual editor, essentially hiding the code from the user.

You drag and drop elements[^3] onto the page, adjust their properties, set conditions[^4], and define workflows that dictate how elements behave. There is a large collection of core elements available, such as:

* Buttons
* Links
* Text elements
* Input forms and rich text input forms
* File/image uploaders
* Icons
* HTML elements
* Map elements

You can read more about the built-in element types in this article series. Additionally, you can extend with more elements using plugins and/or custom code and Javascript libraries.

<figure><img src="/files/ohuPYlRzWrER3WiIMftr" alt=""><figcaption><p>Bubble allows you to control an element's styling properties and responsive behavior in a visual manner.</p></figcaption></figure>

To create a button, you simply place a button element on the page and customize its appearance through the editor. Bubble automatically handles responsive design, allowing you to set breakpoints and adjust styles visually.

<figure><img src="/files/SmRNpO7NsUPHybl3wt6j" alt=""><figcaption><p>Bubble has a built-in responsive editor that allows you to flexibly test your design using customizable breakpoints – and every pixel value in between.</p></figcaption></figure>

Article series: [Elements](/help-guides/design/elements)

### Containers

Containers is the umbrella term for a set of elements in Bubble that includes:

1. **Group:** A versatile container element that can hold other elements such as text, images, and buttons.<br>
2. **Repeating group:** A dynamic container used to display a list of data from a query, or in Bubble terms, a data source. Each cell in a repeating group can contain a set of elements that are repeated for each item in the data source, making it ideal for displaying lists, tables, or galleries.<br>
3. **Floating group:** A container that remains fixed on the screen while the rest of the content scrolls. Floating groups are useful for creating sticky headers, footers, or sidebars that stay visible as users navigate through the app.<br>
4. **Popup:** A modal container that appears over the current content when triggered. Popups are used for dialogs, notifications, forms, and other content that needs to be presented in a separate layer without navigating away from the current page. Popups can also apply a whiteout effect, essentially partially/fully hiding or blurring the content below.<br>
5. **Group focus:** A container designed to display content relative to a target element. It is typically used for dropdowns, tooltips, or contextual menus that need to appear next to a specific element when triggered.

Each of these containers doesn’t necessarily have a direct HTML/CSS counterpart but would instead require a combination of HTML elements and CSS properties to achieve the same functionality. In Bubble, these are set up as distinct element types to make it easier for users to make particular design decisions by picking elements with certain attributes.

Article series: [Containers](/help-guides/design/elements/web-app/containers)

## Styles

Bubble's Styles feature offers a user-friendly alternative to traditional CSS, allowing users to define and manage the appearance of elements through a visual interface rather than writing code. In CSS, you create class selectors and apply styles by writing and maintaining CSS rules in a stylesheet. This approach requires familiarity with CSS syntax and concepts such as specificity and inheritance.

In contrast, Bubble's Styles feature lets you apply consistent formatting across your application by creating style presets for elements like buttons, text, and containers. These presets can be easily updated through the visual editor, automatically propagating changes throughout the app.

When you create an app, it comes with a collection of pre-set styles that you can apply to elements right away. By using these styles (or creating your own), you can easily maintain consistency across your application. You can access the Styles tab to modify the appearance of all styled elements simultaneously by making changes in one place, similar to editing a CSS file in traditional web development.

<figure><img src="/files/xZoRxDk24vcN4vIPIxZ5" alt=""><figcaption><p>The Styles tab in the Bubble editor lets you control the styling properties of elements in one central place.</p></figcaption></figure>

Circling back to the introduction to this article, Bubble’s aim isn’t to fundamentally replace HTML and CSS. Instead, Bubble seeks to make the design flexibility of these technologies accessible to a broader audience by providing a more visual and user-friendly approach.

You can read more about styles in the article series below:

Article series: [Styling](/help-guides/design/variables-and-styles)

### Font and color variables

Bubble’s Styles tab includes both font and color variables that allow you to link fonts and colors with styles or directly with elements.

By updating a font or color variable, you can change the appearance across your entire app. This approach is akin to defining styles in a CSS file and applying them with class selectors. For those with experience in UX design, this parallels the code concept of design tokens. Bubble’s visual interface makes this process easier, especially for non-technical users, by centralizing design management. This not only ensures consistency throughout your application but also encourages users without UX experience to consider design best practices.

Article series: [Styling](/help-guides/design/variables-and-styles) | [Font variables](/help-guides/design/variables-and-styles/font-variables) | [Color variables](/help-guides/design/variables-and-styles/color-variables)

## Responsiveness

If you are coming from an HTML and CSS background, you’ll know that responsiveness is a key aspect of modern web design, ensuring that applications look and function well on a variety of devices and screen sizes. Bubble addresses this need with its responsive engine, which is essentially a layer on top of Flexbox. While it follows the same principles, Bubble simplifies the process with a visual interface for working with the responsive properties of any style (similar to CSS classes) or individual container/element.

This essentially means you can see the result as the properties as the properties are applied, and use Bubble’s built-in responsive viewer to test design solutions while you are building.

Flexbox and Bubble's responsive engine share a lot of similarities:

1. **Container-based layouts:** Both Bubble’s responsive engine and Flexbox rely on containers to manage the layout of child elements. In Flexbox, a container is defined with the display: flex property, which allows you to control the alignment, direction, and distribution of the container's children. Similarly, in Bubble, you use container elements like groups and repeating groups to organize your content and control its layout.
2. **Alignment and justification:** Flexbox offers properties like justify-content, align-items, and align-content to control the alignment and spacing of child elements within a container. Bubble mimics this functionality with its visual settings for horizontal and vertical alignment and justification.
3. **Direction and order:** Flexbox uses the flex-direction property to define the direction of content flow within a container, either as a row (horizontal) or column (vertical). Bubble provides similar options, enabling you to set the direction of elements within a container. Additionally, both Flexbox and Bubble allow you to reorder elements within a container, either through the order property in CSS or by rearranging elements in Bubble by dragging and dropping or using the reorder buttons.
4. **Flexibility and growth:** Flexbox’s flex-grow, flex-shrink, and flex-basis properties allow child elements to grow, shrink, or maintain a fixed size based on the available space. Bubble incorporates these principles by letting you set an element’s minimum, maximum or fixed size within their containers. These settings tell Bubble that a given element should always stay within a specific pixel value or percentage of its container's width.
5. [**Breakpoints**](#user-content-fn-5)[^5] **and** [**media queries**](#user-content-fn-2)[^2]**:** While Flexbox itself does not handle media queries, responsive design often involves using them to adjust layouts for different screen sizes. In Bubble, you can define breakpoints directly within the responsive editor. At each breakpoint, you can customize the layout, visibility, and behavior of elements, similar to how you would use media queries in CSS to create responsive designs. Because you can save breakpoints in one centralized place, similar to styles and style variables, you can change the behavior of your entire app by making a single change in breakpoints. These breakpoints can be accessed through Bubble’s dynamic expression editor, making it easy to conditionally set the behavior of containers and elements.

Article series: [Responsive design](/help-guides/design/responsive-design)

[^1]: *Markup* is a way of writing text that defines the structure and layout of a webpage. It uses tags to specify elements like headings, paragraphs, images, and links, helping to organize and format content for the web.

[^2]: Media queries are a way in CSS to make your website look good on different devices, like phones, tablets, and computers. They change the style of your website based on the size of the screen.

[^3]: *Elements* are the building blocks that you place on the page to design your app, such as text, images, icons and buttons.

    Article series: [Elements](/help-guides/design/elements)

[^4]: *Conditions* allow you to set rules for each element that changes how the element looks depending on whether the rule returns a yes or a no.

    Article section: [Elements](/help-guides/design/elements) | [Conditions](/help-guides/design/elements#conditions)

[^5]: Breakpoints are specific points where the layout of your website changes to fit different screen sizes better. They help ensure your website looks great whether viewed on a small phone or a large computer screen.

    For example, a breakpoint of 320 px is often used as the smallest screen width (usually a phone) to which your app should be compatible.
