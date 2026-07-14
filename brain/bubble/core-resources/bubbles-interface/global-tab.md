# Global tab
> Source: https://manual.bubble.io/core-resources/bubbles-interface/global-tab · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for **beginner-level builders.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (4)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**The Global tab**\
In this article we cover how to navigate the Global tab.

Article: [The global tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/styles-tab)

**Styling**\
In this article series, we cover how to design your app and use styles and style variables:

* Article series: [Global](/help-guides/design/variables-and-styles)
  * Styles: [Styles](/help-guides/design/variables-and-styles/styles)
  * Article: [Font variables](/help-guides/design/variables-and-styles/font-variables)
  * Article: [Color variables](/help-guides/design/variables-and-styles/color-variables)
  * Article: [Global expressions](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/styles-tab/global-expressions)
    {% endtab %}
    {% endtabs %}

The Global Tab manages collections of predefined styles, font/color variables and global expressions. that are shared across your app. Styles make it easy to maintain and modify a consistent visual identity.

Rather than setting the font, background, and border for each element, define a style and apply it to all the elements of a given type.

## Styles

Styles let you define a reusable set of property values that can be applied to elements throughout your app. Once a style is applied, any change to the style updates every element that uses it.

Styles are defined in the *Style* section and can be applied to most element types. Each element type has its own set of available styles, since the properties they support differ. You can use font variables and color variables in styles, giving you full control over the use of fonts and colors in your app.

## Font variables

Font variables let you define a font once and reference it across your app. Each variable holds a font family, size, weight, and any other typography properties you want to set.

Using font variables instead of setting fonts directly on each element means you can update typography across the entire app from a single place. Font variables can be applied to styles, giving you full control over the use of fonts in your app.

## Color variables

Color variables let you define a color once and reference it across your app. Each variable holds a specific color value that can be applied to backgrounds, text, borders, and other color properties.

Color variables are useful for maintaining a consistent color palette without editing every element individually. Color variables can be applied to styles, giving you full control over the use of colors in your app.

## Global expressions

Global expressions let you build a dynamic expression once and reuse it anywhere in your app. They function as reusable elements for expressions, giving you a single source of truth for any expression that would otherwise be duplicated.

Global expressions can accept parameters, allowing you to customize the expression each time it's used while keeping the core logic centralized.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
