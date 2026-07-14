# Visual Elements
> Source: https://manual.bubble.io/core-resources/elements/visual-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (11)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Visual elements

* Article: [Visual elements](/help-guides/design/elements/web-app/visual-elements)

***

**Other element categories**\
In this article series, we cover how to work with different element types:

* Article series:[ Elements](/help-guides/design/elements)
  * Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)
  * Article: [The page](/help-guides/design/elements/web-app/the-page)
  * Article series: [Container elements](/help-guides/design/elements/web-app/containers) (elements that contain other elements)
  * Article series: [Input forms](/help-guides/design/elements/web-app/input-forms) (elements that accept input, such as text and file uploads)
* Article: [Conditional expressions](/help-guides/logic/conditions)\
  Making your elements change appearance in response to varying conditions.

***

**The design tab**\
In this article we cover the different tools available in the design tab.

* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

***

#### Design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)

    Building pages that work on all devices, such as a laptop and a phone.

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

* Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
  {% endtab %}

{% tab title="Videos (3)" %}
Bubble Academy: [How to Use the Text Element](https://www.youtube.com/watch?v=mtS7bLsV-tg)\
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)

#### Connecting elements to workflows

Bubble Academy: [How to Use *an Element Is Clicked* Event](https://www.youtube.com/watch?v=CObRfZiAitY)
{% endtab %}
{% endtabs %}

## Text

A text element displays static or dynamic text. It can also trigger a workflow with a click.

### Text

This is the content to display in the text element. Enter static text or use the 'Insert dynamic data' button to enter dynamic text. In the dynamic case, create the expression to be rendered in run-mode piece by piece. It can be, for instance, 'Current user's first name.'

Use the Rich text editor to format parts of the text differently from the main element style. Use bb-code to add richer content like a link.

{% hint style="info" %}
**Tip:** Certain BBCode tags have limited or no ability for you to adjust the size of the resulting embedded item (example: \[youtube]). Of special note is \[image], which allows setting fixed dimensions but not maximum dimensions. For finer control over items embedded in text, consider using an HTML element instead (not safe for end users to enter contents though)
{% endhint %}

### Canvas placeholder

The canvas placeholder field allows you to display a preview text, making it easier to visualize the content of an element while designing your app. The text is only visible in the editor and will not be shown to your app's users.

### Cut off content if the element is not tall enough

When checked, the text element will truncate the text and add '...' to the end of the text. This option applies to Responsive mode. If line height is smaller than available content area, then all text will be cut off and the element will be blank.

{% hint style="warning" %}
**Note:** In the specific situation of a) a text element having height just tall enough to accommodate the contents, b) that element having "Cut off content if the element is not tall enough" and c) a user seeing that element on Firefox, that element can sometimes not be visible because the height is too close to the height of the text. To avoid this, try making the text element slightly taller.
{% endhint %}

### Shrink the element height if the text gets shorter

When checked, the text element will adjust its height when the text changes, such as a font size change, even if the new height is lower than the original height set in the Bubble Editor. If this box is checked and the element is invisible, its height will be set to zero.

### Stretch to fit content (non-responsive mode)

This option automatically resizes the text element when the content becomes longer. The elements on the page that are below the text are automatically pushed down to make room for the resized text.

### Do not apply bb-code

By default, text elements apply bb-code to let you use advanced formatting and links in texts. If you do not want this to happen, for instance because the text displays user-generated texts, check this box.

### Recognize links and emails

When checked, this option will automatically convert URLs and email addresses in the text into clickable links in run mode. Note that if the element is set not to apply bb-code and if the text has some bb-code tags, links will not be recognized.

### Link color

When the text element is set to detect links and email, you can optionally pick to color the links in a different color.

### Mark the links as nofollow

When the text element is set to detect links, you can optionally make them not endorse the source (for SEO purposes).

### HTML tag for this element (SEO)

Checking the 'Expose the type of tags for text elements' checkbox in the SEO & Metatags section in the Settings Tab allows you to select an HTML tag to be applied to this element. Select the tag in the Style Tab. Use this option for SEO optimization.

### Start/Edit workflow

Click this button to create a new workflow triggered by this element. The type of event depends on the element and is generally the most common event.\
\
For example, buttons will create a 'When this element is clicked...' event. If a workflow already exists, this takes you to the existing workflow in the Workflow Tab. To create a different type of event or create a second event, go to the Workflow Tab and click the 'Click here to add an event...' button.

### This element isn't clickable

When checked, the element will not trigger a workflow when clicked nor will the user's cursor change to a pointer when they hover over the element. In addition, the item will display according to any specified conditional formatting for the 'isn't clickable' state.\
\
This can be used to stop a user from moving forward in a flow until some condition is true. For example, we might disable a specific action until the user is logged in. 'This input should not be empty' can also be used to prevent the user from clicking.

{% hint style="warning" %}
**Note:** If a text element is narrow, words which are longer than that element will not automatically line break. If your text element needs to accommodate long words (especially in certain languages), consider making the element wider.

Similarly, if you try to rotate a narrow text element, the result may be different than what you expect. To fix this, give the rotated element a greater width.
{% endhint %}

## Image

{% embed url="<https://vimeo.com/569032038>" %}
Watch this video to learn more about the Image element
{% endembed %}

An image displays an uploaded static image or dynamic image.

{% hint style="warning" %}
**Note:** For performance reasons, the Bubble run-mode engine pre-loads all images it can find in your app, including those that are conditionally visible. If your app contains images from password-protected sources, a password prompt may appear while your app loads due to this pre-loading logic. Consider using images from a public source or using the file uploader and conditions to make an image private.
{% endhint %}

### Image source

This defines which image to display. Click Upload to select a file. The image will be resized to the element's dimensions. Clicking the 'Search for free images' button displays a popup to search for royalty-free images.\
\
For dynamic images, use the 'Dynamic image' box and click 'Insert dynamic data.' Then, create an expression to return the image in Live mode. For example, 'Current user's profile picture.'

#### Generating an image with AI

You can generate images with AI. Type in a prompt and select a size, quality, and style. The *Auto* setting lets the AI choose style setting based on your prompt. The number of tokens used depends on your selections.

Check *Generate Alt tags* to automatically generate an [Alt text](#user-content-fn-3)[^3].

{% hint style="info" %}
**Tip:** We also offer partial compatibility for PDFs displayed in an image element. If the PDF is public, the browser will compress the PDF to create a thumbnail to view in the image element. Most browsers will bypass this for private files, however, and not display a thumbnail for a private file in an image element. Safari is the exception here and will compress private files to display a thumbnail.
{% endhint %}

### Canvas placeholder

The canvas placeholder field enables you to upload a preview image, making it easier to visualize and understand the appearance of an element while designing your app. This image is only visible in the editor and will not be shown to your app's users.

### Run-mode rendering

This option defines how to handle dynamic images if their size doesn't exactly fit the current element. Choose from:

* Stretch: The image will be resized to fill the entire element. If the image and the element have different proportions, the image will be stretched and might look distorted.
* Rescale: The image will be resized to fit inside the element. If the image and the element have different proportions, the parts of the element area that the image doesn't cover will be left blank. This is the best option for profile pictures.
* Zoom: The image will be zoomed in until it can cover the element's whole area. If the image and the element have different proportions, the parts of the image that don't fit inside the element may be cut off.
* Adjust element height: The image will be resized to be the same width as the element, keeping its proportions intact. If the image and the element have different proportions, the element's height will grow to fit the whole image, and elements below it will be pushed down to make room.

### Cropping tool

Click this button to crop a static image.

### ALT tag

For SEO purposes, add an ALT tag to an image. It specifies alternate text for an image if the image cannot be displayed. The ALT attribute provides alternative information for an image if a user for some reason cannot view it, e.g., slow connection, an error in the src attribute, or if the user uses a screen reader.\
Note: This option is accessible when 'Expose the type of tags for text elements' is checked in the SEO & Metatags section in the Settings Tab.

### Start/Edit workflow

Click this button to create a new workflow triggered by this element. The type of event depends on the element and is generally the most common event.\
\
For example, buttons will create a 'When this element is clicked...' event. If a workflow already exists, this takes you to the existing workflow in the Workflow Tab. To create a different type of event or create a second event, go to the Workflow Tab and click the 'Click here to add an event...' button.

### This element isn't clickable

When checked, the element will not trigger a workflow when clicked nor will the user's cursor change to a pointer when they hover over the element. In addition, the item will display according to any specified conditional formatting for the 'isn't clickable' state.\
\
This can be used to stop a user from moving forward in a flow until some condition is true. For example, we might disable a specific action until the user is logged in. 'This input should not be empty' can also be used to prevent the user from clicking.

{% hint style="warning" %}
**Note:** If you have an image element of a certain width that's trying to display a large horizontal image, it may overflow to the right if you do not change the cropping settings.
{% endhint %}

## Button

A button is an element a user can click to trigger a workflow.

{% hint style="info" %}
Button elements can have a text, an icon or both.
{% endhint %}

### Button type

This sets the button type:

| Setting      | Explanation                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| Label        | Shows only a text                                                                    |
| Icon + label | Shows a text and an icon. Icon can be [leading or trailing](#user-content-fn-4)[^4]. |
| Icon         | Shows only an icon                                                                   |

### Canvas placeholder

Sets a text for the button to be visible in the editor. This value only affects how the button looks in the editor.

### Text

This is the text to display in the button element.

### Icon

This lets you select the [icon library](#user-content-fn-5)[^5], as well as the icon for the button.

### Icon color

Sets the color of the icon using a color picker or setting a HEX color code.

### Icon placement

This specifies whether the icon is leading or trailing.

<table><thead><tr><th width="150">Setting</th><th>Explanation</th></tr></thead><tbody><tr><td>Leading</td><td>Icon before label (default)</td></tr><tr><td>Trailing</td><td>Icon after label</td></tr></tbody></table>

### Icon size

Sets the size of the icon in pixels.

### Make the icon spin

Makes the icon rotate continuously. Typically used for loading spinners.

### Layout

#### Button layout

{% hint style="info" %}
**Setting visibility:** this setting is only available if the [*Button type*](#button-type) setting is set to *Icon + label.*
{% endhint %}

<table><thead><tr><th width="162">Setting</th><th>Explanation</th></tr></thead><tbody><tr><td>Horizontal</td><td>Icon/text is placed horizontally. Does not wrap.</td></tr><tr><td>Vertical</td><td>Icon/text is placed vertically.</td></tr></tbody></table>

#### Gap

{% hint style="info" %}
**Setting visibility:** this setting is only available if the [*Button type*](#button-type) setting is set to *Icon + label.*
{% endhint %}

Distance between label and icon in pixels.

### Start/Edit workflow

Click this button to create a new workflow triggered by this element. The type of event depends on the element and is generally the most common event.\
\
For example, buttons will create a 'When this element is clicked...' event. If a workflow already exists, this takes you to the existing workflow in the Workflow Tab. To create a different type of event or create a second event, go to the Workflow Tab and click the 'Click here to add an event...' button.

### This element isn't clickable

When checked, the element will not trigger a workflow when clicked nor will the user's cursor change to a pointer when they hover over the element. In addition, the item will display according to any specified conditional formatting for the 'isn't clickable' state.\
\
This can be used to stop a user from moving forward in a flow until some condition is true. For example, we might disable a specific action until the user is logged in. 'This input should not be empty' can also be used to prevent the user from clicking.

## Link

{% embed url="<https://vimeo.com/569032110>" %}
Watch this video to learn more about using the Link Element
{% endembed %}

A link is a special element that takes the user to another page within the app or website. It has the same properties as links on a web page, meaning users can right-click them, open them in a new tab, copy them.

### Show an icon instead of text

Check this box to display an icon instead of text. Choose an icon from the Font Awesome library.

### Text

This is the content to display. Enter static text or use the 'Insert dynamic data' button to enter dynamic text. In the dynamic case, create the expression to be rendered in run-mode piece by piece. It can be, for instance, 'Current user's profile page.'

### Canvas placeholder <a href="#link-canvas-placeholder" id="link-canvas-placeholder"></a>

The canvas placeholder field allows you to display a preview text, making it easier to visualize the content of an element while designing your app. The text is only visible in the editor and will not be shown to your app's users.

### Icon

Choose the icon to use for this link. Control the color and size of the icon with the text color and size properties.

### Link destination

Choose either Internal page or External URL from this dropdown menu. Internal page takes the user to another page in the app. External URL takes the user to a different website.

### Destination page

Select which page the link should go to.

### Data to send

Define what data should be sent to the linked page. This data should be of the type of content of the destination page. If you're building a profile page which has the type of content 'user,' send a user to that page. The Composer will be red until the type of data is the proper type. If the page doesn't have a type, you can send text instead to append a path to the URL.

### Destination URL

Enter the URL the link should go to. Use the 'Insert dynamic data' button to enter dynamic text.

### Open in a new tab

Check this box to open the link in a new browser tab. Use this option to keep users in the app.

### Disabled clicking on the link

Check this box to make the link unclickable. Use this option to disable and enable links dynamically.

#### Mark the link as nofollow <a href="#elements.link.nofollow" id="elements.link.nofollow"></a>

Check this box if you do not endorse the link (for SEO purposes).

### Send more parameters to the page

Use this checkbox to send additional data to a page that is not a thing. This can be text, a number for a search, etc. This option defines the series of keys and values to send. The way to use them in the destination page is by using the 'Get data from page URL' data source.

### Additional parameters

Enter the keys and values to send to the destination page.\
Warning: Because of Bubble's internal logic, do not use 'id,' 'debug\_mode,' or 'resume' as keys.

### Send current page parameters

If there is any data stored in the page URL parameters when the page changes the parameters will be carried over to the destination page as well. These parameters will be overridden by any parameters with the same name added using the "Send more parameters to the page" option.

### Wrap the text when the width changes

Check this box if you want the link to be on more than one line when the page width becomes smaller.

## Icon

This element lets you add an icon to the page from one of the icon libraries listed below.

### Icon

Click this button to select the icon library, and choose an icon.

Bubble supports the following icon libraries natively:

* Material UI Icons
* Phosphor
* Bootstrap
* Ionic
* Font Awesome v4 (free)
* Font Awesome v6 (free)
* Feather

### Icon color

Select the color for the icon.

### Make the icon spin

Check this box to continuously rotate the icon.

### Start/Edit workflow

Click this button to create a new workflow triggered by this element. The type of event depends on the element and is generally the most common event.\
\
For example, buttons will create a 'When this element is clicked...' event. If a workflow already exists, this takes you to the existing workflow in the Workflow Tab. To create a different type of event or create a second event, go to the Workflow Tab and click the 'Click here to add an event...' button.

### This element isn't clickable

When checked, the element will not trigger a workflow when clicked nor will the user's cursor change to a pointer when they hover over the element. In addition, the item will display according to any specified conditional formatting for the 'isn't clickable' state.\
\
This can be used to stop a user from moving forward in a flow until some condition is true. For example, we might disable a specific action until the user is logged in. 'This input should not be empty' can also be used to prevent the user from clicking.

## Shape

{% embed url="<https://vimeo.com/569032731>" %}
Watch this video to learn more about the Shape Element
{% endembed %}

A shape element is typically used for visual purposes, but it can also trigger a workflow when the user clicks it.

### Start/Edit workflow

Click this button to create a new workflow triggered by this element. The type of event depends on the element and is generally the most common event.\
\
For example, buttons will create a 'When this element is clicked...' event. If a workflow already exists, this takes you to the existing workflow in the Workflow Tab. To create a different type of event or create a second event, go to the Workflow Tab and click the 'Click here to add an event...' button.

### This element isn't clickable

When checked, the element will not trigger a workflow when clicked nor will the user's cursor change to a pointer when they hover over the element. In addition, the item will display according to any specified conditional formatting for the 'isn't clickable' state.\
\
This can be used to stop a user from moving forward in a flow until some condition is true. For example, we might disable a specific action until the user is logged in. 'This input should not be empty' can also be used to prevent the user from clicking.

## Video

This element displays a YouTube or Vimeo player on the page. It can be a static or dynamic video. Ziggeo is also supported when the plugin is installed.

{% hint style="info" %}
**Tip:** The Bubble engine does not have access to play/paused states for an embedded video. As long as a video has started, it will not stop by itself, even if the container is hidden. To force a video to stop playing if the group containing the video is hidden, consider using conditional states to change the video ID to null when the container is hidden.
{% endhint %}

### Video source

Select the video's hosting service: YouTube or Vimeo. Ziggeo is also supported when the plugin is installed.

{% hint style="info" %}
**Tip:** If cookies are opt-in for your Bubble application, your users will need to consent for a YouTube video to load.
{% endhint %}

### Video ID

Enter the ID of the video to run in the player. It's usually the ID shown in the URL when watching this video on YouTube or Vimeo. It can be a dynamic ID.

### Play the video automatically on load

If this checkbox is selected, the video automatically plays when the page loads.

### Replay video when over

Plays the video in a continuous loop.

### Video control color

Select the color of the video player for Vimeo. YouTube does not offer this option.

### Server authentication token

Sets a server authentication token for Ziggeo videos to control access. Ziggeo is supported when the plugin is installed.

## Map

{% embed url="<https://vimeo.com/569032337>" %}
Watch this video to learn how to use the Map element
{% endembed %}

This element displays a single address or list of addresses on a map. It is powered by Google Maps.

### Number of markers

A map can either display:\
– None: In this case, the map has no markers.\
– Single: The map centers this address in the map. This address can be static or dynamic.\
– List: The map displays a list of addresses and zooms to display the entire list. In this case, the list comes from the application database.

### Type of markers

When the map is set to display a list of dynamic entries, define the type of things to be displayed on the map. It can be users, apartments, etc.

### Data source

Define which address to display on the map. When the map is set to Single marker, it should either be a static entry, like an address, or a dynamic entry of the type geographic address. When the map is set to List of markers, the data source should be a list of geographic addresses. The Composer will be red until the list is of the correct type. It's generally going to be the result of a search.

### Address field

When using a dynamic list to define the list to display, you must define which field contains the address. For example, if a type of thing is 'Apartment,' the field might be 'Address.' This field should be of type geographic address.

### Show title window

Choose from No, On click, and Always in this dropdown menu to determine when to show the title. When No is selected, the title never displays. When On click is selected, the title shows only when the marker is clicked. When Always is selected, the title always displays.

### Marker caption

When using title windows, define the text to display. When building this expression, you can refer to the current marker. That is, the marker for the current box.

### Auto-close window when another is clicked on

When this box is checked, the map will automatically close all title windows before displaying a new one when the user clicks on a marker.

### Map type

This option defines the type of map to display, based on Google's types: Roadmap, Hybrid, Satellite, and Terrain.

### Map style

Select a visual style for the map from this dropdown menu or create a custom map style. This is only for display purposes.

### Custom style (JSON object)

This lets you copy-paste (or build your own!) map style. This must be a parsable JSON object. Visit [snazzymaps.com](https://snazzymaps.com/) for examples.

### Allow zooming and dragging

When selected, the user can zoom and drag. When unchecked, the map will behave like a static map.

### Disable zooming on scroll

Check this box to prevent the map from zooming when the user scrolls over it.

### Set center and zoom manually

When using List markers, the map automatically scales so that all markers are shown. To force a center and a zoom, check this box.

### Map centered on

When using List markers, the map is centered so that all markers are shown, but you can force a center with this field. With a Single marker, the map is centered on the address.

### Initial zoom

Defines the initial zoom used when the map loads.

### Use customized marker icon

This option uploads a customized icon instead of using the Google icon.

### Customized icon

When using the map with a list of markers, select from No, Upload custom, and Data dependent from this dropdown menu. When No is selected, no custom icon will be used. When Upload custom is selected, upload an image to use as an icon for all the markers. When Data dependent is selected, each marker will use a unique icon, which must be stored in the application database.

### Customized icon

Use this field to upload a customized image to use as the marker.

### Icon field

If you're using a list of markers and set the marker to be Data dependent and coming from the database, define the field that contains the image. The field should be of type image.

### Custom selected icon

When working with a list of map markers, you can optionally change the marker image for the currently selected marker. This makes it easy to see which marker the user has clicked on or selected. Choose 'upload custom' to pick an image to use. If you want to use a different image for different map markers, select 'Data dependent' and you will have an option to pick an image field on the marker to use for selections.

### Selected icon

Only visible if 'Custom selected icon' is set to 'upload custom'. This lets you upload an image to use as the marker icon for the selected marker.

### Selected icon field

Only visible if 'Custom selected icon' is set to 'Data dependent'. Lets you pick an image field on the type of marker data you are displaying to use for the selected map marker: the image in that field will be displayed when the user clicks on the marker.

## Alert

An alert displays a temporary message on the page, like a warning. It is displayed with a fade in and fade out animation. Show it through a workflow action.

{% embed url="<https://youtu.be/Die7FRWEsbY>" %}
Our Academy quick tip on how to use alerts
{% endembed %}

### Text

This is the content to display in the alert. Enter static text or use the 'Insert dynamic data' button to enter dynamic text. In the dynamic case, create the expression to be rendered in run-mode piece by piece. It can be, for instance, 'Current user's first name.' This content can be modified directly by the action that shows the alert. In this case, the text defined at the element level is overwritten.

### Position the alert at the top

Check this option to float the alert at the top of the page and be as wide as the entire page area. If checked, this means that the responsive settings won't apply, and the alert will not affect the responsive behavior of your page.

## HTML Element

{% embed url="<https://vimeo.com/569031928>" %}
Watch this video to learn more about The HTML Element
{% endembed %}

This element runs HTML on the page, for instance to render elements. Some services provide embeddable HTML code to put on a page.

### HTML

Paste the actual HTML to be rendered by the element. If the HTML contains script tags, the script tags will only run in run-mode and not in the editor. Customize the content of the HTML with dynamic data, if needed, by inserting dynamic entries with the 'Insert dynamic data' button.

### Display as an iFrame

Check this box if the HTML should run as if it was an independent web page. Refer to the code provider to decide if this is a relevant option.

### Stretch to fit content

When not in iFrame mode and this option is checked, the HTML element will resize automatically if the content is longer than the element. Elements under the resized HTML element will be pushed down automatically.

## Built on Bubble

This element adds an icon or the text 'Built without code on Bubble.' Clicking it displays Bubble's homepage in a new browser tab. While it's not mandatory to put it in the app, we'd really appreciate your help in spreading the word about Bubble :)

{% hint style="warning" %}
**Note:** Some browser extensions can tamper with the Bubble banner or make Bubble think the banner isn't there, prompting a reminder about it.
{% endhint %}

### Visual type

Choose from Blue, Gray, White, and Text from this dropdown menu. Selecting a color option will display the text of the Bubble logo in that color. Selecting Text will display 'Built without code on Bubble' instead of an icon.

### Add a border

Check this box to add a border around the logo or text.

### Text color

Customize the text color with this property.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: "Alt text" is short for **alternative text**. It's a written description of an image used by screen readers for visually impaired users, displayed when an image fails to load, and read by search engines to understand what an image depicts.

[^4]: This determines whether the icon is before or after the label.

    Section: [Icon placement](#icon-placement)

[^5]: Icons are contained within libraries, similar to all the letters in a specific font.

    For a list of the natively supported icon libraries in Bubble, see the icon element.

    Reference: [Icon element](#icon)
