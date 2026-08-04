# Visual elements (web)
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/visual-elements · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

This section describes the visual elements that are available in the Bubble editor

**Visual elements** are the elements you can place on that page that cannot contain other elements (groups) and cannot accept input (input elements). They usually serve two purposes:

* To display information or contribute to the aesthetics of the page
* To accept button clicks

<figure><img src="/files/6cIvv6znSo3L5KBlevIl" alt=""><figcaption></figcaption></figure>

In the illustration above, all elements are visual elements: text, an image and a button.

The visual elements category contains the following elements:

## Text

A non-editable text element. Both the header and the body copy in the image above are text elements.

<details>

<summary>Video lessons</summary>

* [How to use the text element](https://www.youtube.com/watch?v=mtS7bLsV-tg)
* [Formatting text with BBCode](https://www.youtube.com/watch?v=mtS7bLsV-tg)
* [How to Use Text Transform Operators](https://www.youtube.com/watch?v=kmvmYAlrjUk)

</details>

## Button

A button is a shape with a text/icon that's optimized for click workflows. It can contain a text, an icon or both.

<details>

<summary>Video lessons</summary>

* [How to use the button element](https://www.youtube.com/watch?v=tk1Rjo8SziI)
* [How to use the *An element is clicked* event](https://www.youtube.com/watch?v=CObRfZiAitY)

</details>

## Icon

Icon elements let you pick an icon to display from several different [icon collections](#user-content-fn-1)[^1].

{% hint style="warning" %}
On Android devices, **phosphor “filled” icons may display as black boxes** instead of the intended icon. This issue is due to a bug in a third-party library required for rendering these icons.

At this time, there is no workaround. The issue will remain in place until it is resolved by the library author. If your app relies on filled phosphor icons, consider using an alternative icon style for Android builds.
{% endhint %}

<details>

<summary>Video lessons</summary>

* [How to use the icon element](https://www.youtube.com/watch?v=DR-UZ27J8GM)
* [How to use the *An element is clicked* event](https://www.youtube.com/watch?v=CObRfZiAitY)

</details>

## Link

The link element lets you set up a link with a custom text and destination. It can dynamically point to one of your internal pages (including sending data to that page) or point towards an static and/or external link.

<details>

<summary>Video lessons</summary>

* [How to use the link element](https://www.youtube.com/watch?v=-wJZPaXQZpw)

</details>

## Image

Image elements allow you to place images in your app. The element supports all widely used image types such as png, jpg, svg, webp and gif.

<details>

<summary>Video lessons and articles</summary>

* Video: [How to use the image element](https://www.youtube.com/watch?v=eazYG0lRzrg)

Bubble also has a separate element for uploading images:

* Video: [How to use the image uploader element](https://www.youtube.com/watch?v=ZXjhQkM5qV0)
  * Article: [File uploads](/help-guides/design/elements/web-app/input-forms/file-uploads)

</details>

#### Generating an image with AI

You can generate images with AI. Type in a prompt and select a size, quality, and style. The *Auto* setting lets the AI choose style setting based on your prompt. The number of tokens used depends on your selections.

Check *Generate Alt tags* to automatically generate an [Alt text](#user-content-fn-2)[^2].

## Shape

The shape element adds a rectangle to the page which can be resized, rounded and styled in different ways.

<details>

<summary>Video lessons</summary>

* [How to use the shape element](https://www.youtube.com/watch?v=z_H7jQUFsTA)

</details>

## Alert

The alert element adds a bar that can show a text message for a set amount of seconds before it disappears. It's used to display temporary messages such as success and error messages.

<details>

<summary>Video lessons</summary>

* [How to use the alert element](https://www.youtube.com/watch?v=Die7FRWEsbY\&t=18s)
* [How to use the e*lement has error* event](https://www.youtube.com/watch?v=_HNvvPxcWAU\&t=3s)

</details>

## Video

The video element lets you implement streaming video in your app. The element supports YoutTube and Vimeo.

<details>

<summary>Video lessons</summary>

* [How to use the video element](https://www.youtube.com/watch?v=wOc2FIja-uE)

</details>

## HTML

The HTML element lets you place a snippet of HTML code on the page. It can be useful when you need to include custom HTML code in your app that cannot be achieved through Bubble's visual editor. This can be HTML code, CSS styles, and JavaScript code.

Typical use cases for the HTML element include:

* Embedding third-party widgets
* Using custom CSS to style or animate elements
* Adding custom functionality with Javascript

<details>

<summary>Video lessons</summary>

* [How to Use The HTML Element](https://www.youtube.com/watch?v=T8Y6JFg8Ph8)

</details>

## Map

The Map element lets you implement a Google Map on the page, fully navigatable by your users.

<details>

<summary>Video lessons</summary>

* [How to use the map element](https://www.youtube.com/watch?v=bZL1nCBhoWk)
* [How to use the map marker is clicked event](https://www.youtube.com/watch?v=474NiBb14iw)

</details>

## Built on Bubble

This element lets you add a small "Built without code: Bubble" logo to your app.

[^1]: Icons are contained within libraries, similar to all the letters in a specific font.

    For a list of the natively supported icon libraries in Bubble, see the icon element.

    Reference: [Icon element](https://manual.bubble.io/core-resources/elements/visual-elements#icon)

[^2]: "Alt text" is short for **alternative text**. It's a written description of an image used by screen readers for visually impaired users, displayed when an image fails to load, and read by search engines to understand what an image depicts.
