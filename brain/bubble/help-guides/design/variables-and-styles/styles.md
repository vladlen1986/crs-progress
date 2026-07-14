# Styles
> Source: https://manual.bubble.io/help-guides/design/variables-and-styles/styles · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers styles, which is Bubble's tool for managing centralized stylesheets that can be applied to elements across your app

Bubble lets you set up overarching *styles* for elements within your app to streamline the design process and promote consistency. By modifying a single style, you can effortlessly restyle all related elements, making it easy to set up and manage a cohesive look and feel in your app.

Each style is connected to a specific element type and includes differerent properties that can be edited (depending on the element type), such as:

* Background color or image
* Border
* Shadow
* Font
* Transitions

Apart from making the design process more efficient, Styles also improves your app's performance by storing styling settings in one central place as opposed to saving it on each separate element.

Styles can be combined with [Color variables](#user-content-fn-1)[^1] and [Font variables](#user-content-fn-2)[^2] to set up a design system that's highly efficient and flexible.

## Defining styles

The *Styles* section in the *Global* tab is where you edit the different styles that your app has. Editing styles is very similar to editing elements, you use the property editor to change the styling properties.

You can define as many styles as you want. Styles are applied to one type of element, for instance Buttons, but you can have more than one style for Button. Try to name them in a way is easy to read, as you'll have to pick the style that you need for each button. You can also specify which style should be used by default when you insert a new element in this tab.

You can create a from the *Style* section by clicking on 'New Style', or from an element itself. When you do so from an element, the current properties of the element will be used as a base for the newly created style. This is particularly useful when you find yourself using the same design for a few elements, but haven't thought about creating a style yet. Please note that when creating your own Styles, specialized labels such as `H1` for headers cannot be used.

<figure><img src="/files/SYwNrYJiOyEMzvdUvbCU" alt=""><figcaption></figcaption></figure>

## Applying and removing styles

### Conditions on styles

You can build some conditions on styles, but only for *basic* states, that is to say conditions that are about built-in, simple interactions with the element (hovered, focused, etc.) For instance, conditions using data, or properties on the user, will not qualify as basic.

## Applying and detaching styles

When you apply a style to an element, its current properties that are included in the style will be deleted. On the other hand, when you detach a style from an element, the original properties of the style will be copied to the element. So effectively, when you detach a style from a button, the button's appearance won't change at first, so that you can modify the appearance. You can always undo such changes.

Detaching a style does not change or deleted the style, it only detaches it from that specific element.

![](/files/-M5sc4ELfv7V6AOG0MEK)

To detach a style, click the *Detach style* link underneath the Styles dropdown in the [property editor](#user-content-fn-3)[^3].

### Style overriding

Style overriding happens when you adjust the styling properties of an element that already has a style attached. Instead of changing the base style itself, you modify individual properties—like colors, borders, or fonts—directly on the element.

<figure><img src="/files/xlPSh6ajygHLHeeqN4AZ" alt=""><figcaption><p>When you change styling properties to an element that already has a style attached, it will be displayed as <em>Overridden</em> in the Style selector.</p></figcaption></figure>

These overrides apply only to that specific element and take priority over the shared style settings, allowing you to fine-tune its appearance without affecting other elements using the same style.

To restore the element’s style to its default properties, click *Reset*, highlighted in red in the illustration above.

## Conflicts between conditions

You can overwrite a condition that is included in a style at the element level; between a style's condition and an element's condition, if the same property is modified, the condition at the element level will win.

## Web and mobile styles

### Overview

The Styles tab supports **styles for web and mobile apps in the same project**, allowing you to define and manage visual settings for both mobile and web components. With platform-specific filtering, compatibility indicators, and canvas previews, it's easy to build consistent designs across platforms while accounting for the differences between them.

### Platform filter

<figure><img src="/files/ZZ8Mr9hXUE1RnfcrXZPr" alt=""><figcaption></figcaption></figure>

A platform filter is available in the left sidebar of the Styles tab. This lets you view:

* **All** styles (web and mobile)
* **Mobile**-only styles
* **Web**-only styles

Use this filter to focus on the styles relevant to the platform you’re designing for.

### Compatibility badges

Each style includes a compatibility badge that shows where it can be used:

* A **phone icon** indicates the style applies to mobile-only elements
* A **computer icon** indicates web-only elements
* **Both icons** appear for styles that apply to elements shared between mobile and web

These badges help clarify which platform each style supports.

### Style editor for shared elements

Some elements, like **buttons**, are available on both mobile and web. For these shared elements, the style editor groups settings into:

* **Shared properties**, which apply across both platforms
* **Platform-specific properties**, which are unique to either web or mobile

For example, shadows are handled differently between platforms. These differences are reflected in the style editor, with mobile- and web-specific controls shown where relevant.

### Canvas preview toggle

<figure><img src="/files/9BYZtdDcwoKvFyaH4gSK" alt=""><figcaption></figcaption></figure>

When editing styles for shared elements, the canvas preview includes a toggle that lets you switch between **web** and **mobile** views. This helps you see how the style will appear in each context.

If a style applies only to one platform, the toggle is hidden and the preview reflects that platform by default.

### Creating mobile-only styles

Styles can be created for mobile-only elements such as:

* **App bars**
* **Tab items**
* **Sheets**

When editing a mobile-only style, the style editor shows mobile-specific settings and the preview reflects the mobile context. These styles won’t appear in web projects.

### Notes

* Mobile-only styles do not include the platform toggle or web-specific settings.
* Preview behavior for mobile elements may differ slightly depending on the element’s structure or layout properties.

### Element style support

| Name                 | Type                    |
| -------------------- | ----------------------- |
| Text                 | Both                    |
| Alert                | Web                     |
| Input                | Both                    |
| Multiline Input      | Both                    |
| Dropdown             | Web                     |
| Checkbox             | Both w/ Different Props |
| Radio Buttons        | Web                     |
| Date/Time Picker     | Both w/ Different Props |
| File Uploader        | Web                     |
| Popup                | Web                     |
| Button               | Both                    |
| Link                 | Web                     |
| Icon                 | Both                    |
| Image                | Both                    |
| Video                | Web                     |
| Shape                | Both                    |
| Slider               | Web                     |
| Group                | Both                    |
| Floating Group       | Both                    |
| Table                | Web                     |
| Group Focus          | Web                     |
| Repeating Group      | Web                     |
| Search Box           | Web                     |
| Map                  | Both w/ Different Props |
| HTML                 | Web                     |
|                      |                         |
| Sheet                | Mobile                  |
| Tab Bar              | Mobile                  |
| Tab item             | Mobile                  |
| Top App Bar          | Mobile                  |
| Web View             | Mobile                  |
| Horizontal List      | Mobile                  |
| Horizontal list item | Mobile                  |
| Short List           | Mobile                  |
| Short list item      | Mobile                  |
| Selectable list      | Mobile                  |
| Selectable list item | Mobile                  |
| Vertical list item   | Mobile                  |
| Section header item  | Mobile                  |
| Swipe action         | Mobile                  |

## Using Style Variables

Style variables are used to store specific colors and fonts that can then be applied to elements and styles throughout your app. This ensures that your use of fonts and colors remains consistent and is easy to switch out later if needed: for example, replacing a color variable will update *all* styles that use this variable instantly.

You can read more about [color variables](/help-guides/design/variables-and-styles/color-variables) and [font variables](/help-guides/design/variables-and-styles/font-variables) in our dedicated articles.

## Using styles in conditionals

Conditionals can be placed on elements, to make them look and behave in a specific way. You can read more about that feature [here](/help-guides/logic/conditions).

When you set up a condition, you tell Bubble to check for specific criteria and apply one or more properties when the condition is true. You can set each property individually, or apply a style to set multiple properties at once.

Even when a style is applied, you can still adjust individual properties on top of it.

[^1]: The Color Variables feature enables you to establish a palette of colors that you can apply throughout your app.\
    \
    Making changes in a Color variable automatically applies those changes to every Style and element connected to that variable.

    Article: [Color variables](/help-guides/design/variables-and-styles/color-variables)

[^2]: The Font Variables feature enables you to establish a collection of fonts that you can apply throughout your app.

    Making changes in a Font variable automatically applies those changes to every Style and element connected to that variable.

    Article: [Font variables](/help-guides/design/variables-and-styles/font-variables)

[^3]: The property editor is the main tool for configuring the elements on your page.

    When you double-click an element on the page or single-click it in the left-hand element tree, this draggable popup appears, displaying various fields for customization.\ <br>

    Article: [The property editor](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-property-editor)
