# Visual elements (mobile)
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/visual-native-app-elements · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

## Text

A non-editable text element.

## Button

A button is a shape with a text/icon that's optimized for click workflows. It can contain a text, an icon or both.

## Icon

Icon elements let you pick an icon to display from several different [icon collections](#user-content-fn-1)[^1].

{% hint style="warning" %}
On Android devices, **phosphor “filled” icons may display as black boxes** instead of the intended icon. This issue is due to a bug in a third-party library required for rendering these icons.

At this time, there is no workaround. The issue will remain in place until it is resolved by the library author. If your app relies on filled phosphor icons, consider using an alternative icon style for Android builds.
{% endhint %}

## Image

Image elements allow you to place images in your app. The element supports all widely used image types such as png, jpg, svg, webp and gif.

#### Generating an image with AI

You can generate images with AI. Type in a prompt and select a size, quality, and style. The *Auto* setting lets the AI choose style setting based on your prompt. The number of tokens used depends on your selections.

Check *Generate Alt tags* to automatically generate an [Alt text](#user-content-fn-2)[^2].

## Shape

The shape element adds a rectangle to the view which can be resized, rounded and styled in different ways.

## Map

The Map element lets you implement a Google Map on the view, fully navigatable by your users. You can also use Apple Maps on iOS devices by enabling the *Use Apple Maps on iOS* property.

## WebView

The Web View element allows you to display one of your app’s pages inside an element within your mobile app. You can set its responsive behavior just like any other element, ensuring it adapts well to different screen sizes.

<figure><img src="/files/6dlqEBhN8CobHZsM2okh" alt=""><figcaption></figcaption></figure>

Keep in mind that users won’t be able to navigate to other pages while using the Web View, so it’s important to design the page with all necessary content on a single page. The Web View element is limited to displaying pages from your own app, meaning external URLs cannot be used.

{% hint style="warning" %}
The Web View element currently does not work in the web preview— it only functions properly in the BubbleGo app.
{% endhint %}

#### Disable zoom

The *Enable Zooming* property allows users to use the pinch-to-zoom gesture to zoom in or out. This setting is disabled by default.

<figure><img src="/files/RRJ55niWbUV6PsgwRArF" alt=""><figcaption></figcaption></figure>

It helps improve the user experience, particularly for apps that rely heavily on webviews, where unintended zooming can cause a disruptive interface. If you want to allow zooming, you can disable this setting in the element's properties.

[^1]: Icons are contained within libraries, similar to all the letters in a specific font.

    For a list of the natively supported icon libraries in Bubble, see the icon element.

    Reference: [Icon element](https://manual.bubble.io/core-resources/elements/visual-elements#icon)

[^2]: "Alt text" is short for **alternative text**. It's a written description of an image used by screen readers for visually impaired users, displayed when an image fails to load, and read by search engines to understand what an image depicts.
