# Overview of the property editor beta
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/property-editor-beta/property-editor · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Welcome to the property editor beta

We’re rolling out an early beta of the new element property editor — a redesigned, more intuitive way to work with your element settings in Bubble. This updated editor is built to make your workflow faster and clearer, whether you’re structuring a layout, adjusting styles, or fine-tuning your app’s conditional behavior.

Because this is an early beta, you may still encounter rough edges or missing functionality. We’re releasing it now so we can learn from real usage, gather your feedback, and continue improving the experience.

Use this document as a guide to understand how the new editor is organized, how to navigate its sections, and how to get the most out of the tools available today.

### The main differences

The new property editor introduces some major changes from the previous editor.

* Property editor position: The property editor is now locked in position on the right side of the screen, as opposed to being a draggable window.
* New property categories: All properties are now assorted into three main categories that are different from the old editor. More details on this can be found below.
* New look: the editor has undergone a major overhaul to make element properties easier to understand at a glance. Along with a lighter, cleaner look, you’ll notice descriptive icons added to key properties and a more streamlined layout that hides secondary options behind icons. These updates are designed to reduce visual clutter and help you quickly find what you need, while still giving you access to all the flexible options you’re used to.
* Separate window for dynamic expressions: dynamic expressions now open in their own dedicated popup, giving you more space to review and edit them comfortably.

## The element property editor

The element property editor is the main tool for configuring the elements on your page. When you double-click an element on the page or single-click it in the left-hand element tree, this draggable popup appears, displaying various fields for customization.

## The top bar

The top bar in the property editor consists of the element name, as well as a group of icons.

### Custom states

Clicking the custom states icon opens a list of all custom states stored on the selected element. From there, you can view, edit, or manage any of the associated states. If you have one or more custom states stored on the selected element, a count will be displayed next to the icon.

### Contextual menu

Clicking the three dots in the upper right corner opens up the contextual menu for the selected element.

* Notes: opens up the note panel for the selected element
* Make reusable: Creates a reusable element from the selected elements (and any elements within. This option does not delete the original element.
* Inspect: Opens the element inspector and displays a list of references to the selected element, including any associated workflows or dynamic expressions that use it.
* Rename: Allows you to rename the element by setting focus to its name in the top bar
* Replace: Allows you to replace this element with an element of a different type, such as replacing a text input with a multiline input.
* Delete: Deletes the selected element(s).
* Tutorials: Opens a mini video player with a short tutorial about the selected element type.

## The navigation bar

The navigation bar allows you to navigate through the three property categories:

* Visual: the content and look of the selected elements.
* Interaction: interactive properties of the selected elements, such as visibility, animations, transitions and workflows.
* Conditional: control how elements behave or appear in defined circumstances.

## Visual

In the visual category, you set the content and look of the selected elements.

### Content

The Content section shows the type of data an element holds, and each element supports different kinds of dynamic content.

#### Containers

Containers (such as groups) can hold data that their child elements can work with. For example, if you have a group that contains a form for editing a user profile, you can set the group’s type to User. The elements inside the group can then access that user’s data to display and update fields like their email address, name, or phone number.

Repeating groups and tables expect a list of things, meaning more than a single record of data. Each cell in the repeating group or table holds one record, which the elements inside that cell can then interact with.

#### Visual elements

Visual elements can hold different types of dynamic data, such as text, images, or dates. Each element type expects a specific kind of content. For example:

* Text: A text element expects a text string as its data source and displays that text on the page.\
  Button: A button expects a text string and/or an icon to use as its label.
* Image: An image element expects an image URL to display the associated image.

#### Input forms

Input form elements accept different kinds of user-provided data, and each input type expects a specific format. For example:

* Input (text): Accepts a text string, such as a name or email address.
* Input (number): Accepts numeric values, such as quantities or prices.
* Input (date/time): Accepts a date, time, or both, depending on the configuration.
* Dropdown: Accepts a single choice from a list of options.
* Multiselect dropdown: Accepts a list of selected options.

### Size

The Size section lets you set a static or dynamic size for an element, giving you control over how it behaves in a responsive layout. For example, you can keep an element at a fixed size like 50×50 pixels, allow it to take up a dynamic width or height within its container, or let it adapt to its content — such as a button stretching to fit its caption.

#### Containers

Containers act as both parent and child elements, meaning their size properties affect not only their own layout and behavior but also that of the elements they contain — including other nested containers.

#### Elements

All other elements’ size properties affect only the element itself, but the result can indirectly influence sibling elements. For example, when an element grows or shrinks, it can change how nearby elements wrap, align, or distribute space within the same container. In other words, these elements don’t control their siblings — but their own size changes can still shape the overall layout around them.

#### Sizing modes

When you set the size of an element, you can choose from three sizing modes. Each mode defines how the element determines its width and height in a responsive layout.

**Fixed**\
The element keeps a fixed size, defined either in pixels or as a percentage of its parent container. It won’t resize automatically based on its content or the available space.

**Fit**\
The element adjusts to the size of its content.

* Containers: The container’s size is determined by the combined size of the elements inside it.
* Elements: The element’s size is determined by its own content, such as the text in a button or the dimensions of an image.

**Fill**\
The element expands to fill the available space inside its parent container. If multiple elements use Fill, they share the available space based on their size and layout settings.

#### Maximum/minimum size

Minimum and maximum size settings let you control how far an element can shrink or grow, depending on its sizing mode. Fit and Fill elements can use both minimum and maximum values to prevent them from becoming too small or growing beyond what you intend. Fixed-size elements do not use minimum or maximum constraints, since their dimensions are defined directly.

**Adding maximum/minimum size**

The minimum and maximum size properties are added to an element’s width and height settings. When they’re available, a + icon appears next to the Width and Height fields. You can apply constraints to the width, the height, or both, depending on what the layout requires.

### Layout

The Layout section defines how an element adapts to the page, view, or container around it, and how it interacts with its sibling elements. These settings apply to both containers and the elements inside them, though the specific options vary depending on what type of element you’ve selected.

The layout properties you apply to a parent element determine which layout options are available for its child elements.

#### Containers

**Alignment**

When you have a container selected, you can select an alignment property:<br>

* Column: arranges child elements vertically (forming a column).
* Top: arranges child elements to the top (building a column from the top down).
* Center: arranges child elements to the center (building a column from the center outward).
* Bottom: arranges child elements from the bottom (building a column from the bottom up).
* Space around: distributes child elements so there is equal space on all sides, creating even spacing before, between, and after each element.
* Space between: distributes child elements so the first and last touch the container edges, with equal spacing only between the elements.
* Row: arranges child elements horizontally (forming a row).
* Left: arranges child elements to the left (building a row from left to right).
* Center: arranges child elements to the center (building a row from the center outward).
* Right: arranges child elements to the right (building a row from right to left).
* Space around: distributes child elements so there is equal space on all sides, creating even spacing before, between, and after each element.
* Space between: distributes child elements so the first and last touch the container edges, with equal spacing only between the elements.
* Align: aligns child elements to a specific area of the parent, divided into nine possible positions. This position is set individually on each child element.
* Fixed: allows you to position and size child elements with absolute pixel values.

**Spacing**

Spacing properties let you control the distance between elements and the spacing inside and outside an element’s border — known as padding and margins, respectively.<br>

* Gap: The gap property sets a fixed pixel distance between each element in a container. The direction of the gap depends on the container’s layout settings. For example, if the container uses a column layout, the gap is applied vertically between elements; in a row layout, it can apply both horizontally and vertically when elements wrap onto new lines.
* Padding: The space inside a container's border, creating distance between the container and its child elements. Think of it as an “inner cushion”.
* Margins: The space outside an element’s border, creating distance between the element and other elements around it. Think of it as an “outer cushion”

#### Elements

**Column layout**

In a column layout, you can set an element’s horizontal position to left, center, or right, or let it stretch to fill the available horizontal space. Stretching updates the element’s width to Fill.

**Row layout**

In a row layout, you can set an element’s vertical position to top, center, or bottom, or let it stretch to fill the available vertical space. Stretching updates the element’s height to Fill.

**Align layout**

In the align layout, you can position each element using a 9-point alignment grid. You can choose the horizontal and vertical positions from the dropdowns, or click directly on the grid to set the alignment.

**Fixed layout**\
In a fixed layout, element positions are set using absolute pixel values along the X and Y coordinates. You can enter these values in the property editor, or drag the element directly on the canvas to place it.

### Configure

In the Configure section, you’ll find properties that apply only to the specific type of element you’re working with.

### Style

In the Style section, you manage the style applied to the selected element. Styles apply to individual element types, so if you select multiple elements of different types, you won’t be able to manage their style together.

#### Select a style

You can select a predefined style in the dropdown to associate it with the currently selected element(s). Clicking the + symbol in the Style picker allows you to create a new style based on the properties of the selected element

#### Overriding styles

Styles can be overridden, meaning you can assign a style to an element and then change one or more of its styling properties. The element will still update when you edit the associated style, but any overridden properties will stay as you set them.

Any element with one or more overridden properties will display an Overridden label in the style selector.

**Reset style overriding**

Whenever an element has overridden style properties, a reset icon appears. Clicking it restores the element’s styling to match the original style.

#### Editing a style

To edit a style associated with an element, click the edit style icon. This opens the Style tab, and any changes you make there will apply to all elements that use that style.

#### Detaching a style

To detach an element from its style, click the detach icon. The element will keep its current styling properties but will no longer be connected to the style.

### Appearance

The appearance section lets you manage the opacity, rotation and border radius of the selected element(s).

#### Opacity

Opacity controls how transparent the selected element is. 100% opacity means the element is fully visible, while 0% opacity makes it invisible. A few details are useful to keep in mind:

* 0% opacity doesn’t hide the element — it remains present on the page and keeps its width and height, but is fully transparent.
* Opacity affects child elements as well. If you change the opacity of a container, every element inside that container will inherit that level of transparency.

#### Rotation

The rotation property rotates an element by a specified number of degrees. Note that container elements cannot be rotated.

#### Radius

This radius property allows you to set the corner roundness of your selected element. You can do it individually or in combination which is helpful if you have the same radius applied to all corners.

### Border

The border section lets you add a border to the selected element(s) and adjust its appearance. To add a border, click the + icon.

#### Border style

The border style dropdown lets you choose the appearance of the border, such as solid, dotted, or dashed. If two or more individual borders have different border styles, the main border style property will display as mixed.

#### Border width

The border width property allows you to set the width of the border in a pixel value. If two or more individual borders have different width values, the main border width property will display as mixed.

#### Individual borders

The Individual borders property lets you configure each of an element’s four borders separately, including their style, width, color, and radius.

To edit individual borders, click the individual borders icon. This opens a popup where you can adjust the settings for each border.

#### Border color and opacity

The border color/opacity property lets you assign a color or color variable to an element’s border and adjust the opacity of that color. If two or more individual borders have different colors/opacity, the main color property will display as mixed.

### Background

The background section allows you to adjust the background style of the selected element(s). There are three different background styles:

* Color: assigns a static color or color variable to the element(s). You can also adjust the opacity of the color.
* Gradient: assigns a linear or radial gradient with a start and end color and opacity. You also have the option of adding an intermediate color by clicking the + symbol.
* Image: assigns an image file as a background and lets you adjust how that image appears, including its width, alignment, repetition, and cropping. You can also set a background color for any part of the element not covered by the image or video, if it’s a page element.

### Text

For elements that display text, such as text elements or buttons, the Text section lets you adjust the text-related properties of that element.

* Font: sets the font (or font variable) for the element.
* Font weight: sets the font weight property, which controls how thick or bold the text appears.
* Font size: sets the font size in pixels.
* Alignment: sets the text alignment (left/center/right).
* Text properties:
* Bold
* Italic
* Underline
* More properties
* Word spacing
* Line spacing
* Letter spacing
* Text shadow

### Shadow

The shadow section lets you assign and adjust a shadow on the selected element(s).

* Position (X and Y): Sets the shadow’s horizontal and vertical offset in pixels. Positive values move the shadow right or down; negative values move it left or up.
* Blur: Controls how soft or sharp the shadow appears. Higher values create a more diffused, softer shadow; lower values create a sharper edge.

Spread: Expands or contracts the size of the shadow. Positive values make the shadow larger and more pronounced; negative values pull it inward, making it tighter around the element.

## Interaction

Interaction settings define how an element behaves when someone uses your app. These controls let you manage an element’s visibility, determine whether it can be clicked or scrolled, and attach transitions or workflows that respond to user actions. Together, they shape how the element feels and functions from the end user’s point of view.

### Visibility

Visibility controls whether an element appears when the page first loads, whether it collapses when hidden, and how it behaves when its content exceeds its available space.

#### Visible on page load

If this property is enabled, the element is visible when the page loads. If it’s disabled, the element is hidden by default, and it will collapse on load if that option is enabled for the element. This setting only affects run-mode; in the editor, visibility is controlled through the element tree.

#### Allow vertical scrolling

When enabled, the element becomes scrollable whenever its content is taller than the space available. This lets users scroll through the content inside the element without affecting the rest of the page.

### Options

#### Make clickable

This property determines whether the element can be clicked by the user. It’s especially useful for elements that have an Element is clicked workflow attached. When disabled, the element won’t respond to click interactions.

Keep in mind that this setting only affects the user experience. It should not be relied on as a security measure, since it can be modified on the client side. To ensure workflows run only for the right users, add server-side conditions that prevent unauthorized access.

Additional options are available for specific element types.

### Transitions

The Transitions settings let you add animated changes to an element’s visual properties, applying them gradually as opposed to instantly. When a property such as color, shadow, border, or size updates—whether through a workflow or a conditional statement—the transition defines how quickly and smoothly that change takes place.

#### Transition types

Transition types define how an animated change progresses over time. They control the “feel” of a transition—whether it starts gently, ends abruptly, or moves at a constant pace.

* Ease: A smooth, natural-feeling animation that starts slowly, speeds up, and then slows down again near the end.
* ease-in: Begins slowly and then accelerates toward the end, creating a soft start and a quicker finish.
* Ease-out: Starts quickly and slows down as it completes, giving the transition a gentle landing.
* Ease-in-out: Combines both behaviors: a slow start, faster middle, and slow finish for an even, balanced motion.
* Linear: Moves at a constant speed from start to finish with no acceleration or deceleration. Good for mechanical or precise animations.
* Step-start: Jumps immediately to the end state at the start of the transition, with no gradual change.
* Step-end: Holds the initial state for the duration of the transition, then jumps to the final state at the very end.

### Workflows

The Workflows section lists all workflows connected to the selected element and lets you add new ones. This section appears only when a single element is selected and acts as an accelerator to the Workflow tab.

## Conditionals

The Conditional section lets you define rules that change an element’s appearance or behavior when certain expressions evaluate to true.

Conditionals follow a When → Then structure. The When portion is a dynamic expression that must evaluate to yes. The then portion defines which properties should change while that condition is true. The dynamic expression is evaluated continuously, meaning it reacts instantly to changes in your app’s data or states.

### Adding a condition

To add a condition, click the + symbol in the upper right corner of the section. To expand all conditions, click the Expand all icon.

### Moving conditions

You can reorder conditions by dragging them—hover a condition to reveal the drag handle—or by using Move to top and Move to bottom in the condition’s contextual menu.

Conditionals are evaluated from top to bottom. If two conditions modify the same property, the condition lower in the list overrides any conflicting settings from the ones above it.

### Previewing conditions

You can preview how a condition will look when its expression evaluates to yes by clicking the Preview icon on the relevant properties. This affects only the editor—it doesn’t enable or disable the condition. It simply gives you a visual preview so you can confirm that the properties produce the result you expect.

### Expand/Collapse conditions

This quick action available in the title header via an icon button allows you to show all of the conditions in this tab expanded or collapsed. The expanded condition shows the expression and related changed properties in complete view.

\ <br>
