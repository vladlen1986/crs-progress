# The property editor
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-property-editor · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The property editor is the main tool for configuring the elements on your page. When you double-click an element on the page or single-click it in the left-hand element tree, this draggable popup appears, displaying various fields for customization.

## The top bar

The top bar in the property editor consists of the element name, as well as a group of icons. The X on the right-hand side closes the element inspector.

### Element name

The left-hand side shows the name of the currently selected element. Bubble will automatically generate a name that consists of the element type (i.e. *Input* or *Button*) and an alphabetical sequence (i.e. *A, B, C*).

This is an editable field where you can assign any name you want to an element:

<figure><img src="/files/hbRlUxu3usxgQLFiU07f" alt=""><figcaption><p>You can assign any name you want to an element by clicking its name in the top bar of the property editor</p></figcaption></figure>

### Contextual video

The first icon shows a play symbol. Clicking this will expand a video tutorial relevant for the currently selected element. Note that not all elements have an associated tutorial – if the icon is not showing it means that there's no video available.

<figure><img src="/files/K8XnqH2q3pHsztgm4dPc" alt=""><figcaption></figcaption></figure>

### Element inspector

The second icon shows an information symbol. Clicking this opens the *element inspector*, which lets you inspect different ways in which this element interacts with the rest of your app.

<figure><img src="/files/QzFTuF8w5Qoet6KmJxL2" alt=""><figcaption></figcaption></figure>

In this case we have selected a button.

#### Custom states

This shows all the [custom states](#user-content-fn-1)[^1] that are stored on the current element, as well as their type and default value. From here, add new custom states, modify their names and default values, or remove them.

#### Events

This section will list all the [*events*](#user-content-fn-2)[^2] that are connected to this element. In the example in the above screenshot, we have one connected event (*Button A is clicked)*. Clicking it will take you to the workflow editor and the associated workflow.

#### Actions

This section shows the [*actions*](#user-content-fn-3)[^3] that are connected to this element. In the example in the above screenshot we have one connected action (*Show button A*). Clicking it will take you to the workflow editor and the associated action.

#### Elements

This section shows the elements that are referencing the currently selected element in a dynamic expression. It will also list the parent container elements of those elements.

### Comments

The icon showing a speech bubble icon will expand the [comment editor](#user-content-fn-4)[^4] for that element. This lets you take notes relevant for the currently selected element.

<figure><img src="/files/z2uawecSMzXsh4B4tCPK" alt="" width="375"><figcaption></figcaption></figure>

## Tabs

Right below the top bar of the you'll find the property editor tabs. Each one represents a category of properties that can be applied to the selected element.

<figure><img src="/files/1CThT315s73hXMLrCqY0" alt="" width="375"><figcaption></figcaption></figure>

### Appearance

The *Appearance* tab is where you set up the visual appearance of the element, such as its background style, borders, font, shadow, transparency and transitions. This is also where you can apply or detach [*Styles*](#user-content-fn-5)[^5].

For a detailed list and explanations of all appearance properties, refer to the core reference entry below:

Reference: [Styling properties](/core-resources/elements/styling-properties)

### Layout

The *Layout* tab is where you set up the responsive properties of an element, determining how the element behaves in relation to other elements on a responsive page. This includes properties like width/height, padding/margins and alignment.

For a detailed list and explanations of all responsive properties, refer to the core reference entry below. To learn more about responsive design, you can also check out the article.

Reference: [Responsive properties](/core-resources/elements/responsive-properties)\
Article series: [Responsive design](/help-guides/design/responsive-design)

### Conditional

The *Conditional* tab is where you set up [*conditional expressions*](#user-content-fn-6)[^6] that control the visibility and styling of the selected element. For example, you can make a button change color based on whether the user is logged in or not.

To learn more about how to set up dynamic expressions and use them in conditions, see the articles below:

Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
Article: [Conditions](/help-guides/logic/conditions)

[^1]: *Custom states* are variables that you can save on any element on the page. They let you store data temporarily that is reset when the page is reloaded.\
    \
    Article: [Custom states](/help-guides/data/temporary-data/custom-states)

[^2]: An *event* is anything that tells a workflow to run, such as a button being clicked or an input's value being changed.\
    \
    Article: Events\
    Article series: Workflows

[^3]: *Actions* are the operations that take place when a workflow is triggered by an event.\
    \
    Article: [Actions](/help-guides/logic/workflows/actions)

[^4]: You can add *comments* to different parts of your app, such as elements and workflows, to help you keep track of what the different pages, key actions, styles and data types are about.\
    \
    Article: [Commenting](/help-guides/maintaining-an-application/commenting)

[^5]: Styles are predefined sets of visual properties (like colors, fonts, and borders) that can be applied to elements. By modifying a single style, you can effortlessly restyle all related elements.\
    \
    Article: [Styles](/help-guides/design/variables-and-styles/styles)

[^6]: *Dynamic expressions* are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.\
    \
    Conditional expressions can update the styling of an element based on the outcome of the dynamic expression.\
    \
    Article: Dynamic expressions\
    Article: Conditions
