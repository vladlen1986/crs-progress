# Built on Bubble
> Source: https://manual.bubble.io/core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/built-on-bubble · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This element displays either an icon or the text "Built without code on Bubble." Clicking it opens Bubble's homepage in a new tab. It's optional, but a great way to help spread the word.

## Visual

### Size

The Built with Bubble element has a fixed size.

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

#### Visual type

Controls how the element is displayed.

#### Add a border

Adds a border around the element.

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

## Interaction

### Visibility

#### Visible on page load

Enable this to make the element [visible by default](#user-content-fn-1)[^1]. This checkbox makes the element visible every time the page loads or reloads[^2]. Change the visibility of the element based on certain conditions[^3] in the Conditional section in the property editor or with a show/hide element action[^4] in a workflow.

#### Collapse when hidden

Enable this to make the element collapse its height and width to 0 pixels when hidden. This allows surrounding elements to automatically shift into the freed space, preventing empty gaps in the layout.

This is commonly used in single-page applications, where elements are shown and hidden dynamically as users navigate, without leaving the page.

### Transitions

Transitions add animation when a style property changes.

Instead of updating instantly, the element gradually shifts from its previous state to the new one over a defined duration. For example, if you reduce an element’s width, a transition can make it smoothly shrink rather than change size immediately.

<details>

<summary>Transition styles</summary>

<table><thead><tr><th width="150.99542236328125">Transition style</th><th>Description</th></tr></thead><tbody><tr><td>ease</td><td>Starts slowly, speeds up in the middle, and slows down at the end.</td></tr><tr><td>ease-in</td><td>Starts slowly and accelerates toward the end.</td></tr><tr><td>ease-out</td><td>Starts quickly and decelerates toward the end.</td></tr><tr><td>ease-in-out</td><td>Starts slowly, accelerates in the middle, and slows down again at the end.</td></tr><tr><td>linear</td><td>Moves at a constant speed from start to finish.</td></tr><tr><td>step-start</td><td>Jumps immediately to the end state at the start of the transition.</td></tr><tr><td>step-end</td><td>Remains in the start state and jumps to the end state at the very end of the transition.</td></tr></tbody></table>

</details>

#### Transition duration

Transition duration defines how long the transition animation runs, measured in milliseconds.

### Advanced

A unique identifier assigned to the element. This can be used to reference the element in custom code, such as JavaScript or CSS, using `document.getElementById()` or CSS selectors.

{% hint style="info" %}
For this property to be visible, you need to enable *Expose the option to add an ID attribute to HTML elements* in *Settings – Advanced options.*
{% endhint %}

[^1]: Visible by default means that the element is visible when you load/reload the page.

[^2]: The exception is is if you use the Go to page action and go to the same page you are currently on – in this case the element will keep its current visibility, since the page is not refreshed.

    Reference: [Action: Go to page](https://manual.bubble.io/core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)<br>

    Reference: [Action: Refresh page](/core-resources/actions/navigation#refresh-the-page)

[^3]: *Conditions* are appliead to elements to make them change their apperance or behavior based on a specific condition. Conditions are built using dynamic expressions.<br>

    Article: [Conditions](/help-guides/logic/conditions)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^4]: An *action* is the part of a workflow that performs a specific task, such as making changes in the database, hiding/showing elements and sending API requests.\
    \
    Reference: [List of actions](/core-resources/actions)\
    Article series: [Workflows](/help-guides/logic/workflows)
