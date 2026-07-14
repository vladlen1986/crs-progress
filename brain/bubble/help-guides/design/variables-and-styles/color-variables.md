# Color variables
> Source: https://manual.bubble.io/help-guides/design/variables-and-styles/color-variables · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers Color variables, used to set a palette of colors that can be applied throughout your app

The Color Variables feature enables you to establish a palette of colors that you can apply throughout your Bubble app. Each color variable contains:

* A [hex code](#user-content-fn-1)[^1] that determines the color value
* An [alpha value](#user-content-fn-2)[^2] that controls its transparency

By incorporating both color and font variables, you can establish a consistent design system for your app. Using a color variable in the styling of an element creates a connection to the color value specified in the *Global* tab.

<figure><img src="/files/dSXe85h8haDBqlEuGGqz" alt=""><figcaption></figcaption></figure>

As a result, if you need to modify the color, you only have to make the change in one place and it will automatically be reflected wherever that color variable is used, saving you the hassle of adjusting each element or style separately.

### Do Color variables apply to styles?

Yes, Color variables apply to styles[^3], meaning that if you update a Color variable it will automatically be updated on all styles that use that variable. By combining the two you can set up a highly flexible color system that lets you control the color appearance of your elements from one place.

<figure><img src="/files/YjEacZfkSX7mZIgCNMrp" alt=""><figcaption></figcaption></figure>

[^1]: A hex code is a six-digit number used in to represent a specific color. It condenses RGB values into a single code.\
    \
    The first two digits of the hex code represent the red component, the middle two represent the green component, and the last two represent the blue component.

[^2]: Alpha value in hex codes represents the opacity level of a color. While traditional hex color codes have 6 digits (e.g., #RRGGBB), adding an alpha value extends it to 8 digits (e.g., #RRGGBBAA).

    The two extra characters denote transparency, with '00' being fully transparent and 'FF' being fully opaque.

    These codes are generated automatically in Bubble.\ <br>

[^3]: The Styles tab in Bubble provides you with a centralized place to define and manage all of your app's styles.

    Styles create a consistent, visually appealing design for your app while making it easier to update that design in the future.\
    \
    Article: [Styles](/help-guides/design/variables-and-styles/styles)
