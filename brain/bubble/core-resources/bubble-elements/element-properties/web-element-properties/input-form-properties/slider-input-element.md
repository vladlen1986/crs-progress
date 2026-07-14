# Slider input element
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/slider-input-element · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Allows users to select a numeric value within a defined range by dragging a handle.

## Visual

### Content

#### Min. value

Defines the lowest selectable value.

#### Max. value

Defines the highest selectable value.

Auto-binding automatically updates a thing as the user modifies the input element, without requiring a workflow. Enable this option to bind the input element directly to a field on a thing. For auto-binding to work:

* The input element must be inside a group or page with a defined *Type of content*
* The parent group's (or page's) thing is the record that will be modified
* The relevant data type must have the correct edit permissions configured in the *Privacy* section of the *Data* tab

{% hint style="warning" icon="lock" %}
If privacy rules don't allow the change, the update won't be applied, and the user will see an error message. You can edit the error message
{% endhint %}

This property offers the following options:

* **Off:** Auto-binding is disabled.
* **On:** Auto-binding is enabled. Setting it to *On* reveals two additional properties:
  * **Field to modify:** The field on the parent element's data type that you want to modify.
  * **Alert on success:** A customized alert message displayed when the data is successfully saved. For this to work, you need at least one [alert element](https://manual.bubble.io/core-resources/bubble-elements/visual-elements#alert) on the page.

#### Initial content

Sets the default value of the slider.

### Size

Sets the width and height of the element. These properties depend on the layout configuration of the parent element.

**Height**

Sets the width/height of the element. The column, row and align layouts have a more flexible way to set element position.

<table><thead><tr><th width="88.7940673828125">Type</th><th width="292.85443115234375">Description</th><th>Options</th></tr></thead><tbody><tr><td>Fixed</td><td>Sets the width of the element as a fixed value.</td><td><ul><li><strong>Pixels:</strong> sets the width to a fixed pixel value</li><li><strong>Percentage</strong>: sets the width to a percentage of the parent container</li></ul></td></tr><tr><td>Fit</td><td>The element’s width and height automatically adjust based on the size of its child elements. To add a mininum and/or maximum value, click the + symbol.</td><td><ul><li><strong>Min:</strong> the minimum width/height, defined as a pixel value or percentage of the parent container.</li><li><strong>Max:</strong> the maximum width/height, defined as a pixel value or percentage of the container.</li></ul></td></tr><tr><td>Fill</td><td>The element's width and height fills the available space in the parent container. To add a mininum and/or maximum value, click the + symbol.</td><td><ul><li><strong>Min:</strong> the minimum width/height, defined as a pixel value or percentage of the parent container.</li><li><strong>Max:</strong> the maximum width/height, defined as a pixel value or percentage of the container.</li></ul></td></tr></tbody></table>

#### Parent container has a fixed layout

**Width/height**

Sets the widht/height of the element. The fixed layout has a more rigid way of setting element size, based on static pixel values.

<table><thead><tr><th width="142.40234375">Type</th><th>Description</th></tr></thead><tbody><tr><td>Fixed</td><td>Sets the width of an element as a fixed pixel value.</td></tr></tbody></table>

### Layout

#### Position

#### Parent layout: Column

In a column layout, a child element's property is restricted to the vertical axis.

<table><thead><tr><th width="125.14453125">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Left</td><td>Elements are aligned to the left edge.</td></tr><tr><td>Center</td><td>Elements are aligned to the vertical center of the container.</td></tr><tr><td>Right</td><td>Elements are aligned to the right edge.</td></tr></tbody></table>

#### Parent layout: Row

In a row layout, a child element's alignment property is restricted to the horizontal axis.

<table><thead><tr><th width="124.79296875">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top</td><td>Elements are aligned to the top edge of the container</td></tr><tr><td>Center</td><td>Elements are aligned to the horizontal center of the container.</td></tr><tr><td>Bottom</td><td>Elements are aligned to the bottom edge of the container.</td></tr></tbody></table>

#### Parent layout: Align

In an align layout, a child element's property is restricted to one of nine cells in a 3x3 grid. Any element placed within the same cell will overlap.

<table><thead><tr><th width="183.515625">Alignment</th><th>Description</th></tr></thead><tbody><tr><td>Top-left</td><td>Elements are aligned to the top-left corner of the container.</td></tr><tr><td>Top-center</td><td>Elements are aligned to the top edge and horizontally centered within the container.</td></tr><tr><td>Top-right</td><td>Elements are aligned to the top-right corner of the container.</td></tr><tr><td>Center-left</td><td>Elements are vertically centered and aligned to the left edge of the container.</td></tr><tr><td>Center</td><td>Elements are vertically and horizontally centered within the container.</td></tr><tr><td>Center-right</td><td>Elements are vertically centered and aligned to the right edge of the container.</td></tr><tr><td>Bottom-left</td><td>Elements are aligned to the bottom-left corner of the container.</td></tr><tr><td>Bottom-center</td><td>Elements are aligned to the bottom edge and horizontally centered within the container.</td></tr><tr><td>Bottom-right</td><td>Elements are aligned to the bottom-right corner of the container.</td></tr></tbody></table>

#### Parent layout: Fixed

Elements are positioned using fixed X and Y coordinates, defined in pixels.

#### Order

Sets the order of the element in the element tree hierarchy.

* **Make first:** Moves the element to the top of the hierarchy within its container
* **Move up:** Moves the element one position higher
* **Move down:** Moves the element one position lower
* **Make last:** Moves the element to the bottom of the hierarchy within its container

#### Spacing

**Padding**

Defines the internal spacing between an element’s content and its border in a static pixel value. Padding adds space inside the element, without affecting its position relative to other elements.

Padding is added on the vertical and horizontal axis respectively.

**Margin**

Defines the external spacing between an element and surrounding elements.

Margin adds space outside the element’s border. It affects the distance between elements and influences layout positioning.

### Configure

#### Type

Sets the type of slider input you want to use:

* **Simple:** sets one slider handle, allowing users to select one value
* **Range:** adds a second slider handle, allowing users to select a range

#### Orientation

Sets the orientation of the slider element:

* **Horizontal:** the slider is displayed horizontally
* **Vertical:** the slider is displayed vertically

#### No. of steps

The increment between each step on the slider. For example, with a minimum of 0 and a maximum of 10, a step value of 5 produces three stops: 0, 5, and 10.

#### Handle

Sets the color of the handle, as a static color or a dynamic value.

### Style

Style sets the visual design of the element, including properties such as colors, fonts, borders, shadows and other appearance settings.

Styles are shared across elements. When multiple elements use the same style, updating the style will automatically update all elements that reference it.

#### Style selector

<figure><img src="/files/qOm95FlK4JjiWXK4RCRk" alt="" width="346"><figcaption></figcaption></figure>

Select the style to apply to the selected element.

#### Edit style

<figure><img src="/files/9eP78pNgjAHJ7gH89yyA" alt="" width="101"><figcaption></figcaption></figure>

To edit the style, click the edit style icon. The changes to that style will apply to all elements using that style.

#### **Detach style**

Detaching the style will disconnect the element from the current style, but keep the formatting of the style until you make changes to it. This only affects the selected element.

<figure><img src="/files/VIKhZiGdxA5M5Rd8w5bc" alt="" width="98"><figcaption></figcaption></figure>

#### **Overriden styles**

You can override a style on one or more elements, using the defined style properties but allowing you to make individual changes to styling properties that apply only to the selected element(s).

Overridden styles will be marked with an *Overridden labelI.*

<figure><img src="/files/xmfBpmZLbuyJGpZpxHCL" alt="" width="333"><figcaption></figcaption></figure>

You can reset the selected element's style by clicking the *Reset* icon.

<figure><img src="/files/1SebZeSSTwBmyOpt10aI" alt="" width="99"><figcaption></figcaption></figure>

### Appearance

#### Opacity

Opacity sets the transparency level of the selected element(s). At 100%, the element is fully opaque. At 0%, it is fully transparent (invisible).<br>

* **Opacity affects child elements**: If applied to a container, all child elements inherit the same opacity level.
* **Opacity does not collapse the element:** Even at 0%, the element still occupies space in the layout. Unlike hiding an element (using *This element is visible on page load*, a conditional visibility rule, or a hide/show action), opacity does not reduce the element’s width or height to zero.

### Border

The *Border* property sets the color of the slider track. To add a border around the entire element, place the slider input inside a group and apply the border there instead.

#### **Border color**

Sets the color of the border in a hex value. You can also set the opacity of the border. Can be a static or the result of a dynamic expression.

### Background

Sets the background color of the slider track. To add a background color to the entire element, place the slider input inside a group and apply the background there instead. The same applies if you want to use a different background type (gradient or image)

## Interaction

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-1)[^1]. This checkbox makes the element visible every time the page loads or reloads[^2]. Change the visibility of the element based on certain conditions[^3] in the Conditional section in the property editor or with a show/hide element action[^4] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

### Options

#### Make disabled

Disables the slider so the user can't interact with it.

{% hint style="warning" %}
Disabling an element is a UI setting and doesn't securely prevent data changes. Always enforce restrictions with server-side conditions and privacy rules in the *Data* tab.
{% endhint %}

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

### Workflows

Shows the workflows connected to the selected element. Click the + symbol to create a new workflow associated with that element. The list of available events differs based on which element is selected.

{% hint style="info" icon="keyboard" %}
**Shortcut:** To quickly add a workflow to a selected element, press Cmd+K on macOS or Ctrl+K on Windows. The shortcut defaults to the most likely event for that element type.
{% endhint %}

### Advanced

A unique identifier assigned to the element. This can be used to reference the element in custom code, such as JavaScript or CSS, using `document.getElementById()` or CSS selectors.

{% hint style="info" %}
For this property to be visible, you need to enable *Expose the option to add an ID attribute to HTML elements* in *Settings – Advanced options.*
{% endhint %}

<details>

<summary>FAQ</summary>

**How do I access the selected value?**

Use `Slider input's value`.

**When should I use a slider?**

Use it for numeric ranges where relative positioning is intuitive, such as price filters or ratings.

</details>

[^1]: Visible by default means that the element is visible when you load/reload the page.

[^2]: The exception is is if you use the Go to page action and go to the same page you are currently on – in this case the element will keep its current visibility, since the page is not refreshed.

    Reference: [Action: Go to page](https://manual.bubble.io/core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)<br>

    Reference: [Action: Refresh page](/core-resources/actions/navigation#refresh-the-page)

[^3]: *Conditions* are appliead to elements to make them change their apperance or behavior based on a specific condition. Conditions are built using dynamic expressions.<br>

    Article: [Conditions](/help-guides/logic/conditions)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^4]: An *action* is the part of a workflow that performs a specific task, such as making changes in the database, hiding/showing elements and sending API requests.\
    \
    Reference: [List of actions](/core-resources/actions)\
    Article series: [Workflows](/help-guides/logic/workflows)
