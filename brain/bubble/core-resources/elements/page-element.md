# Page Element
> Source: https://manual.bubble.io/core-resources/elements/page-element · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (9)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Elements**\
In this article series, we cover how to work with different element types:

Article: [The page](/help-guides/design/elements/web-app/the-page)

* Article series:[ Elements](/help-guides/design/elements)
  * Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

***

#### Navigation

In this article we cover how to navigate between pages and page sections:

* Article: [Navigation](/help-guides/logic/navigation)

***

#### Design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)\
    Building pages that work on all devices, such as a laptop and a phone.

***

**The design tab**\
In this article we cover the different tools available in the design tab.

* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)
  * Article: [The element inspector](/help-guides/getting-started/navigating-the-bubble-editor/tools#key-features)

    The tool you use to edit elements.

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

* Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
  {% endtab %}

{% tab title="Videos (2)" %}
Bubble Academy: [How to Use the Page Element | Bubble Quick Tip](https://www.youtube.com/watch?v=9MBzCjbJnNI)\
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)
{% endtab %}
{% endtabs %}

The Page Element is the fundamental element that contains all the other elements.

## Appearance

### Page title

This property defines how the page will be displayed in the browser. It can be dynamic by using the 'Insert dynamic data' button. The page title represents the `<title>` in the page's HTML.

### This page is a native app

{% hint style="info" icon="mobile" %}
This feature is deprecated. For mobile apps, see the [native mobile app editor.](/help-guides/getting-started/building-for.../native-ios-and-android)
{% endhint %}

Check this box to build a native app and if you want this page to be the app submitted to the app stores. Clicking this checkbox displays a popup listing tips for building a native app.

### Native app name

Enter the name of the app to be displayed on the homepage of a user's phone.

### Mobile version

To have a specific design for the page when loaded on a mobile device, select a page from this dropdown menu. Because the URL remains the same, this is transparent to the user.

### Type of content

This property defines the type of thing the page should expect. Once set, you can refer to the `Current page thing`.

### Backup field for readable URL

{% hint style="info" %}
This property is only visible if you have set a [Type of content](#type-of-content) for the page.
{% endhint %}

This page represents a thing of the type defined as Type of content.

If the current page's thing does not have a value for its Slug field then the field chosen here will be displayed in the URL. URLs for things without a value for their Slug field usually look like example.com/page/1449154312665x293260311940684900.

To make this URL readable, select a field to define what to display in the URL. Usually, it will be a short text field, like a name or title. For example, choosing the field 'location' with a value of 'work,' the URL becomes example.com/page/work-1449154312665x293260311940684900.

### Time zone selection

{% hint style="info" %}
Overriding timezones in the backend requires that you activate the advanced setting *Enable timezone override controls* in your app's general settings.

Reference: [Application settings: Advanced](/core-resources/application-settings/general#advanced-options)
{% endhint %}

Select a type from this dropdown menu to define the timezone type with which you are parsing data. By default, data will be parsed using the client's timezone (Current *User's current timezone*). If needed, you can override this setting by selecting a static timezone as an alternative.

### Style

Sets the style of the page.

### Opacity

Sets the opacity of the page. Opacity is applied to child elements as well.

### Background style

Select a background style from this dropdown menu to apply a backdrop. Choose from None, Flat color, Gradient, Image, and Video.

### Background color

Choose the background color for the page.

{% hint style="warning" %}
**Note:** The background color only applies to the page element itself, not the true (browser html) page background. In certain instances, like a [popup](/core-resources/elements/containers#popup) that is longer than the page element, this html page background color (default: white) will be exposed. *Coming soon: Ability to set this html background color.*
{% endhint %}

### Gradient style

Choose either Linear or Radial from this dropdown menu.

### Gradient direction

Choose the orientation of the gradient from this dropdown menu. Selecting 'Custom' displays a Direction degrees field to set the direction in degrees.

### Direction degrees

Enter a number between 0 and 360 for the direction of the gradient.

### Gradient shape

Choose Ellipse or Circle from this dropdown menu to define the shape of the gradient.

### Gradient base

Select a screen location from this dropdown menu to determine where to base the gradient. Choose from Closest-side, Closest-corner, Farthest-side, and Farthest-corner.

### X Center Position (%)

Enter a percentage to offset the gradient from the gradient base horizontally. 50% will center the gradient horizontally.

### Y Center Position (%)

Enter a percentage to offset the gradient from the gradient base vertically. 50% will center the gradient vertically.

### Starting color

Select the starting color of the gradient.

### Ending color

Select the ending color of the gradient.

### Intermediate color

Select an optional middle color of the gradient. If the input is empty, no intermediate color will be applied.

### Background image

Upload or choose a dynamic image to use for the background.\
Tip: Use an image from our royalty-free library.

### Center the image

Centers the image when the user resizes the browser window.

### Make image as wide as parent element

If the parent element is wider than the image selected, the image will automatically resize to cover the entire element.

### Repeat the image vertically

Repeat the image vertically if the image is smaller than the page's height.

### Repeat the image horizontally

Repeat the image horizontally if the image is narrower than the page's width.

### Background color if empty

When using a dynamic image, it may take a few milliseconds for the image to load. This color displays until the image loads. The default is transparent.

### Apply a parallax effect (desktop only)

Check this box to scroll the background image more slowly than the elements on the page. This gives an impression of depth.

### Parallax speed

Choose a number from this dropdown menu to control the depth effect of the parallax. With a value of 0, the image will not scroll. With a value of 1, the image will scroll at the same speed as the elements.

### Video file

Upload an mp4 file or choose a dynamic video to use for the background.

### Fallback image

On mobile devices, videos are not displayed due to data usage limit concerns. Upload an image to use in this case.

### Play video silent

Check this box to show the video without sound.

### Title (for SEO / FB)

This field defines the OpenGraph `<og:title>`, which is used by social media platforms like Facebook and X to set a header when you share a post. This field is also used by search engines like Google to understand your page's content, and will sometimes be used as a title in search result.

We recommend a length of 50-60 characters for this field.

### Description (for SEO / FB)

This field defines the OpenGraph `<og:description>`, which is used by social media platforms like Facebook and X to set a description text when you share a post. This field is also used by search engines like Google to understand your page's content, and will sometimes be used as part of the search result entry.

We recommend a maximum length of 160 characters (including spaces) for this field.

If left blank, the description entered in the *SEO & Metatags* section in the *Settings* tab will be used.

### Image (for FB)

Choose a dynamic image for Facebook to display.

### Page HTML Header

Enter any [HTML, CSS, JavaScript or metadata](#user-content-fn-3)[^3] or to include in the header of the page.

{% hint style="info" %}
Adding custom header code to the page header will only add it to that specific page. If you want to place custom code to the header of all pages, you may consider adding this to the *Script/meta tags in header setting* in *Settings* - *SEO / metatags* instea&#x64;*.* This will add it to *all* pages in your app.

Core reference: [SEO / metatags](/core-resources/application-settings/seo-metatags) | [Script/meta tags in header](/core-resources/application-settings/seo-metatags#script-meta-tags-in-header)
{% endhint %}

{% hint style="warning" %}
Note that adding details to the header of the page can potentially break the page. We recommend using this feature with caution.
{% endhint %}

### ID attribute

A unique identifier assigned to the element. This can be used to reference the element in custom code, such as JavaScript or CSS, using `document.getElementById()` or CSS selectors.

{% hint style="info" %}
For this property to be visible, you need to enable *Expose the option to add an ID attribute to HTML elements* in *Settings – Advanced options.*
{% endhint %}

## Layout

### Container Layout

Select the container layout type for the page (Fixed, Align to Parent, Row, or Column). Since the page itself is a container, all child elements on the page will inherit different layout controls depending on your selection. More on this can be found in the [Containers](/core-resources/elements/containers) section.

### Preset page width

Select a preset width for the page from this dropdown menu so that the page fits the target device, e.g., laptop, mobile, or tablet. Changing the page width or height dimensions in the Bubble Editor changes this setting to 'Custom.'

### Width for UI Builder

Set a specific pixel value for the width of the screen while you are building. When designing responsively, this value is used to determine the dimensions of child elements that might rely on having knowledge of the page width. This value can be updated by setting a custom value or selecting a Preset page width.

## Other ways to learn

<details>

<summary>User manual articles</summary>

* [The page](/help-guides/design/elements/web-app/the-page)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: This includes, but is not limited to, tracking codes from systems like Google Analytics.
