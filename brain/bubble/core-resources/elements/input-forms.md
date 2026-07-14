# Input Forms
> Source: https://manual.bubble.io/core-resources/elements/input-forms · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (12)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Input forms

* Article: [Input forms](/help-guides/design/elements/web-app/input-forms)

***

**Other element categories**\
In this article series, we cover how to work with different element types:

* Article series:[ Elements](/help-guides/design/elements)
  * Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)
  * Article: [The page](/help-guides/design/elements/web-app/the-page)
  * Article series: [Container elements](/help-guides/design/elements/web-app/containers)

    Elements that contain other elements.
  * Article: [Visual elements](/help-guides/design/elements/web-app/visual-elements)

    Elements like text, buttons, icons and images.
* Article: [Conditional expressions](/help-guides/logic/conditions)

  Making your elements change appearance in response to varying conditions.

***

**The design tab**\
In this article we cover the different tools available in the design tab.

* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

***

#### Workflows

Workflows are used to connect elements with actions, such as saving the value of a text input element or uploading a file.

* Article series: [Workflows](/help-guides/logic/workflows)

***

#### Design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)\
    Building pages that work on all devices, such as a laptop and a phone.

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

* Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
  {% endtab %}

{% tab title="Videos (5)" %}
Bubble Academy: [How to Use The Input Element](https://www.youtube.com/watch?v=C7Yg9JbVQsI\&t=1s)\
Bubble Academy: [How to Use The Mulitline Input Element](https://www.youtube.com/watch?v=vQ8ruikkxEA)\
Bubble Academy: [How to Use the Slider Input](https://www.youtube.com/watch?v=4GxuhmKij_4)\
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)

#### Connecting elements to workflows

Bubble Academy: [How to Trigger Workflows From Input Changes](https://www.youtube.com/watch?v=mDEVJLujlkQ)
{% endtab %}
{% endtabs %}

Input forms are elements that accept input from the user, such as text input, file/image upload, checkboxes and calendars.

## General input options

These are the options that all input elements share.

### Enable auto-binding on parent element's thing

Auto-binding modifies a thing automatically as the user modifies the input, without using a workflow. Check this box to enable this functionality. For this to work, the input needs to be in a group or page that has a type of content defined. The thing of the parent group or page will be the thing that is modified. Also, the correct permission for this type must be set in the Privacy section in the Data Tab.

### Field to modify

Select the field the input should modify. It must be of a compatible type with the input.

### Show an alert on success

Check this box to show an alert after the auto-binding operation successfully completes.

### Alert to show

Select the alert to display.

### Alert message

Define the message to be shown in the alert or use the text defined at the alert level.

### This input should not be empty

Check this box if the input should not be empty when a workflow using its content is run. In other words, Bubble prevents workflows from running until these inputs are filled. Use this to make sure all necessary information has been entered by the user before a workflow is run. When an input is empty and shouldn't be, it is marked as invalid by Bubble.

### This input is disabled

Check this box to prevent users from interacting with the input element. In this case, the content of the input will be accessible on a read-only basis.

{% hint style="danger" %}
**Note on security:** Disabling an input makes it read-only in the UI, but it's not a secure way to prevent edits. Because it's handled client-side, users can still tamper with it. Use server-side protections like privacy rules, workflow conditions, or backend workflows to enforce security.

Article series: [Security](/help-guides/security)\
Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)
{% endhint %}

## Input

{% embed url="<https://vimeo.com/569032059>" %}
Watch this video to learn more about the Input Element
{% endembed %}

This element enables users to type text on one line. It's useful for typing in an email or password.

{% hint style="warning" %}
**Note:** The 'undo' ctrl+z command has been disabled for Inputs due to a bug in the library we use for input formatting.
{% endhint %}

### Placeholder

When this element is empty, text will be displayed to prompt the user to enter something.

### Initial content

This field defines the input before the user modifies it or when reset. For example, when a user modifies their email, the initial content will likely be 'Current user's email.'

### Content format

Select a type from this dropdown menu to define the input type. This is important for two reasons:\
– To make sure that what is entered is valid and prevents workflows from running if the content isn't valid. In this case, the input is set to an 'Isn't valid state.' This detects, for instance, when an email address follows the pattern '<name@example.com>.'\
– It sometimes controls what characters can be typed and what characters are added automatically, in order to visually assist users for dates, passwords, etc.\
\
Choose from:\
– Text: A plain sequence of characters or numbers.\
– Email: An email address.\
– Password: A sequence of characters that are hidden as the user types.\
– Integer: A number without decimals.\
– Decimal: A number with decimals.\
– Address: A geographic address. With this option, the input automatically validates the address with Google Maps.\
– US Phone: A phone number following the format (xxx) yyy-zzzz.\
– Percentage: A number represented as 12.35% equaling 0.1235.\
– Currency: A number with a currency symbol as a prefix.\
– Date: A date following the format mm/dd/yyyy.\
– Euro date: A date following the European standard dd.mm.yyyy.\
– Text (numbers only): A sequence of numbers, like a reference number, that isn't interpreted as a numerical quantity.

{% hint style="info" %}
**Tip:** Because of the predictive text functionality on Android devices, some content formats involving masks have a slightly different UX. This is for: US Phone, Percentage, Currency, Date, Euro date, and Text (numbers only). On these devices, the input allows users to type anything and validates the content against the mask only after the user stops typing. The end result is the same.
{% endhint %}

### Currency Symbol

When the type of content is Currency, choose the currency symbol to use as a prefix from this dropdown menu. If a prefix is missing you can type your own in the box.

### Always show decimals

With Currency selected, check this box to always show two decimal places.

### Show thousands separator

For integer or decimal inputs, automatically inserts the thousands separator as the user types

### Decimal place

Set this to always show a specific number of digits after the decimal point. Extra digits will be filled with 0. Any value will be rounded to the appropriate decimal place before displaying in the input. Leave blank to have no rounding, and no restriction on the number of digits.

### Limit the number of characters

Check this box to prevent users from entering long entries.

### Time zone selection

{% hint style="info" %}
Overriding timezones in the backend requires that you activate the advanced setting *Enable timezone override controls* in your app's general settings.

Reference: [Application settings: Advanced](/core-resources/application-settings/general#advanced-options)
{% endhint %}

When the type of content is Date or Euro date, select a type from this dropdown menu to define the timezone type with which you are parsing data. The default timezone with which data is parsed will be the client timezone ("User's current timezone"). However, you can override this option by setting an alternative timezone with a static or dynamic choice.

Both Date and Euro date will be by default parsed as the date at midnight for the client timezone. If you specify a timezone different from the client timezone, then the date will be parsed as that date at midnight in the overriding timezone. As an example, if you parse 1/1/2000 from Eastern Time and keep the default setting, Bubble will save that date as 1/1/2000 12:00 AM Eastern Time. If you instead override the client timezone with Pacific Time, selecting 1/1/2000 will save 1/1/2000 12:00 AM Pacific Time.

### Prevent "enter" key from submitting

Normally, when users click ENTER, workflows associated with the input get triggered/submitted. If you check this box, that will not happen.

### Maximum number

Enter the maximum number of characters allowed.

### Set a range (min and max)

Check this box to restrict the numerical values users can enter.

### Minimum Value

Set the minimum value users can enter. Make this value dynamic by using the Composer.

### Maximum Value

Set the maximum value users can enter. Make this value dynamic by using the Composer.

### Check the password while typing

If a password policy is defined in the General section in the Settings Tab, check this box to validate the input against that policy.\
Advanced: This is useful if you only want to make that check on the server.

## Multiline Input

{% embed url="<https://vimeo.com/569032508>" %}
Watch this video to learn more about the Mulitline Input element
{% endembed %}

Multiline inputs allow users to enter text on several lines.

### Placeholder

When this element is empty, text will be displayed to prompt the user to enter something.

### Initial content

This field defines the input before the user modifies it or when reset. For example, when users modify their bio, the initial content will likely be 'Current user's bio.'

### Limit the number of characters

Check this box to prevent users from entering long entries.

### Maximum number

Enter the maximum number of characters allowed.

### Stretch to fit content

Check this box to resize the element when the text becomes too long to fit the container.

## Checkbox

{% embed url="<https://vimeo.com/569031495>" %}
Watch this video to learn more about the Checkbox Element
{% endembed %}

Displays a labeled checkbox.

### Label

Enter the text to display next to the checkbox. Clicking on the text is equivalent to clicking the checkbox itself.

### Preset status

Define the initial value of the checkbox. Choose from Checked, Unchecked, and Dynamic.

### Dynamic status

This option is only visible if Preset status is set to Dynamic. Specifying a dynamic yes/no value determines whether this element starts in an on or off state.\
\
When the dynamic value changes, e.g., the user modifies data that the dynamic status field references, the checkbox will change to reflect the new value. This continues until the user clicks on the element and changes the state, in which case the state will be determined by their selection rather than by a dynamic value.

### This checkbox should be checked

When checked, workflows using the content of the checkbox won't run until the content of the box is checked. This is useful, for instance, to force users to accept Terms of Services (ToS) when they sign up.

## Dropdown

{% embed url="<https://vimeo.com/569031546>" %}
Watch this video to learn more about the Dropdown element
{% endembed %}

Dropdowns display a list of a choices to the user through a familiar interface. The choices can either come from the database or be entered in the Bubble Editor as a list of texts.

### Placeholder

When this element is empty, text will be displayed to prompt the user to enter something.

### Choices style

A dropdown element either prompts the user to choose one option from static choices or dynamic data from the application database. In this dropdown menu, choose between Static choices or Dynamic choices.

### Choices (press Enter between each option)

This is the list of static choices offered to users. Enter one option per line and press Enter between each option.

### Type of choices

This is the type of thing used by the element when Dynamic choices is chosen in the Choices style.

### Choices source

Define the list of things to be used as options. It should be a list of things of type defined as the 'Type of choices.' It is either the result of a search or the content of a field that is a list.

### Option caption

Define how to display the thing in the dropdown menu. For example, to display users, build an expression like 'Current option's first name Current option's last name' as a caption.

### Default value

This is the default value displayed in the dropdown menu. It should be of the same type as the type of content defined in 'Type of choices.'

{% hint style="info" %}
**Tip:** When using the native dropdown element in Bubble, Bubble will use the browser's native dropdown HTML component. This often has very limited styling options and varies from browser to browser. For example, text alignment may not work across all browsers, because not all browsers support that feature for their native dropdowns. To create a more custom dropdown, consider building one using a [Group Focus](/core-resources/elements/containers#group-focus) element.
{% endhint %}

{% hint style="warning" %}
**Note:** due to how Firefox treats dropdowns, dropdown placeholder text cannot be changed conditionally on Firefox.
{% endhint %}

## Search Box

{% embed url="<https://vimeo.com/569032688>" %}
Watch this video to learn more about the Searchbox element
{% endembed %}

This element searches for dynamic options with an autocomplete experience. The users start typing a word or address, and the dropdown menu displays matching options in real time.

### Placeholder

When this element is empty, text will be displayed to prompt the user to enter something.

### Choices style

A search box either displays a static list of texts like a list of countries, dynamic data from the application database, or displays addresses using the Google Autocomplete API. Choose from Static choices, Dynamic choices, and Geographic places.

### Choices (press Enter between each option)

This is the list of static choices offered to users. Enter one option per line and press Enter between each option.

### Define list of options

Clicking this button displays a search popup. The search dropdown contains a dynamic list of entries users can search from. Add constraints to restrict the list.

### Define list of options

If you set up algolia, you will see a popup like the regular search, in which you can choose the type indexed in Algolia you want to search for.

### Field to search

When choosing a dynamic source of entries, define which field will contain the texts to use for autocompletion. Set this in the 'Field to search' property. For example, to display restaurants in the search box, set the list of options as a 'Search for restaurants' and choose 'Name' as the field to search.

### Allow entries not in list

Check this box to allow the user to type something that is not in the dynamic list. Access the typed text as 'Input's typed text.'

### Maximum entries to show

Change the maximum number of entries to show in the dropdown. Longer lists take more time to load.

### Prevent "enter" key from submitting

Normally, when users click ENTER, workflows associated with the input get triggered/submitted. If you check this box, that will not happen.

### Default value

This is the default value to use in the search box. It should be of the same type as the 'Type of choices.'

### Prefer results around

The point around which you wish to retrieve place information. This is optional.

### Radius (meters)

The distance (in meters) within which to prefer place results.

## Radio Buttons

{% embed url="<https://vimeo.com/569032563>" %}
Watch this video to learn more about Radio Buttons Element
{% endembed %}

This element displays a list of buttons where users can choose only one option. The options come either from a list of static choices or dynamic list.

### Choices style

A radio button element can either prompt the user to pick from a list of static choices like states or display dynamic data from the application database. Choose from Static choices and Dynamic choices from this dropdown menu.

### Choices (press Enter between each option)

This is the list of static choices offered to users. Enter one option per line and press Enter between each option.

### Type of choices

This is the type of thing used by the radio button element.

### Choices source

Define the list of things to be used as options. It should be a list of things of type defined as the 'Type of choices.' It is either the result of a search or content of a field that is a list.

### Option caption

Define how to display the thing in the list of radio buttons. For example, to display users, build an expression like 'Current option's first name' as a caption.

### Default value

This is the default value to determine the selected radio button. It should be of the same type as the 'Type of choices.'

### Number of columns

Enter the number of columns for the buttons. The width of the caption will be adjusted automatically to fit the number of columns given the total element width.

### Bootstrap color

Choose the color for the actual radio buttons. Choose from the Twitter Bootstrap library of colors: Black, Primary, Danger, Info, Warning, and Success.

## Slider Input

{% embed url="<https://youtu.be/4GxuhmKij_4>" %}
Watch our Academy quick tip on how to use this input
{% endembed %}

This element allows users to select a value from a numeric range by dragging a slider. It is touch-compatible, so it works on mobile devices.

### Min Value

Enter the minimum value for the slider.

### Max Value

Enter the maximum value for the slider.

### Step

This number represents how much one increment should modify the slider's value.

### Slider type

A Simple slider will have one handle and return one number. A Range slider will have two handles and return two numbers. The handle is what the user moves to change the slider value. This setting will appear in the Property Editor when no style is attached. When a style is attached, this setting will instead be adjusted in the Styles tab.

{% hint style="info" %}
**Note:** The second handle for the Range slider will only appear in Live mode.
{% endhint %}

### Initial content

Define the initial value of the slider. If the content is dynamic, it should be of type number.

### Orientation

This property defines whether the slider is Horizontal or Vertical.

### Border color

Choose the color of the borders of the slider and handle. The handle is what the user moves to change the slider value.

### Background color

Choose the color of the slider background.

### Handle color

Choose the color of the handle. The handle is what the user moves to change the slider value.

### Range area color

When using Range mode, this property defines the color between the two handles. The handle is what the user moves to change the slider value.

{% hint style="info" %}
**Note:** The second handle for the Range slider will only appear in Live mode.
{% endhint %}

## Date/Time Picker

{% embed url="<https://vimeo.com/569031750>" %}
Watch this video to learn more about the Date/Time Picker Element
{% endembed %}

This element allows users to choose a date and optionally a time with a calendar-type interface. The value returned by this element is a date that can be used in date fields.

### Time zone selection

Select a type from this dropdown menu to define the timezone type with which you are parsing data. The default timezone with which data is parsed will be the client timezone ("User's current timezone"). However, you can override this option by setting an alternative timezone with a static or dynamic choice.

For instance, if you (the client) are in Eastern Time, you can override the timezone by statically or dynamically specifying a new timezone such as Pacific Time. Then, when you enter 1/1/2000 9:00 AM, it will be parsed as 1/1/2000 9:00 AM Pacific Time, rather than 1/1/2000 9:00 AM Eastern Time.

If you are parsing a date (with no time specified), it will be by default parsed as the date at midnight for the client timezone. If you specify a timezone different from the client timezone, then the date will be parsed as that date at midnight in the overriding timezone. As an example, if you parse 1/1/2000 from Eastern Time and keep the default setting, Bubble will save that date as 1/1/2000 12:00 AM Eastern Time. If you instead override the client timezone with Pacific Time, selecting 1/1/2000 will save 1/1/2000 12:00 AM Pacific Time.

### Input type

Choose from Date and Date & Time to determine if a time will be used in addition to the date.

### Initial content

Define the initial value of the date. It should be of type date and will be red until the entry has the correct type.

{% hint style="info" %}
**Tip:** If you select date-only for your Date-Time picker, choose an initial content that does not include a time. If you use Current date/time instead, filters based on this initial content may filter out new data where date is still Current Date but after Current Time.
{% endhint %}

### Customize the input placeholder

By default, the date/time picker shows a placeholder with a date and format selected. To customize it, check this box.\
Note: This option is only available in Date mode.

### Placeholder

Enter the placeholder to use for the date.

### Date format

From this dropdown menu, choose how to format the date.

### Custom format

If you need to use a custom format for the date, you can define it here.

### Start the week on Monday

Check this box to start the week on Monday, which is the European style. By default, the week starts on Sunday.

### Display dropdowns to pick month/year

Check this box to allow users to change the month and year quickly. This is useful for dates in the past, like birthdays.

### Time interval

This property defines how many minutes should exist between two options.\
Note: This option is only available in Date mode.

### Time format

From this dropdown menu, choose how to format the time.

### Minimum date

Use this field to prevent users from choosing a day before a certain date/time. This field can be dynamic, in which case the expression defined should be of type date (which includes time).

### Maximum date

Use this field to prevent users from choosing a day after a certain datetime. This field can be dynamic, in which case the expression defined should be of type date (which includes time).

### Minimum hour

Use this field to prevent users from choosing a time before a certain hour of the day. This field can be dynamic, in which case the expression defined should be of type number. It must be in 24h format, i.e., 17:26 for 5:26 PM.

### Maximum hour

Use this field to prevent users from choosing a time after a certain hour of the day. This field can be dynamic, in which case the expression defined should be of type number. It must be in 24h format, i.e., 17:26 for 5:26 PM.

## Picture Uploader

{% embed url="<https://youtu.be/ZXjhQkM5qV0>" %}
Our Academy quick tip on how to set up the picture uploader
{% endembed %}

This element allows users to upload an image. When they click the button, they're prompted to choose an image to upload. On mobile devices, the option to take a picture with the phone's camera is also offered. Once the image is uploaded, the button displays the image.

### Placeholder

When this element is empty, text will be displayed to prompt the user to enter something.

### Default

This field defines the initial content of the picture uploader. It can either be an uploaded static image or dynamic information from the application database, such as 'Current user's picture.'

### Make this file private

By default, uploaded files are visible to anyone who has the link to the file. To provide an additional layer of security to files uploaded through this element, select this option. You will be prompted to select a thing to permanently attach the file to. That item can then be used to restrict access to the file via privacy rules.

Note: when uploading to Box, set privacy rules in the Data > Privacy tab.

### Attach this file to

This option is only visible if 'Make this file private' is selected. Private files uploaded with this element are permanently attached to a thing, which is used to determine who has access to view the file. Only users who have the 'View attached files' permission for that thing can view the file. Go to the Privacy section to create privacy rules that grant this permission. If the value of 'Attach this file to' is empty or the thing does not exist, the file will be visible to anyone who has the link, which is the same as if 'Make this file private' was not selected.

### Storage service

By default, uploaded files are stored by Bubble using Amazon's S3 file hosting service. You can optionally select a third-party storage service instead by adding that service as a plugin. Currently we support one third-party service, Box.

Note: when uploading to Box, set privacy rules in the Data > Privacy tab.

### Folder path

Enter the destination in your Box to upload the file. The destination is a forward-slash (/) separated list of folder names, such as 'My Folder/My Subfolder.' Bubble will automatically create folders if they do not already exist, and dynamic data can be used to build the folder path.

### Limit image size before upload

By default, an image uploads without resizing. If the image is large, this may lead to a slower upload. If an image is larger than 800 x 600 pixels, check this box to resize the image to these dimensions.

## File Uploader

{% embed url="<https://vimeo.com/569031878>" %}
Watch this video to learn more about the File Uploader Element
{% endembed %}

This element allows users to upload a file. When they click the button, they're prompted to choose a file to upload. Once the file is uploaded, the button displays the file name.

### Placeholder

When this element is empty, text will be displayed to prompt the user to enter something.

### Default

This field defines the initial content of the file uploader. It can either be an uploaded static image or dynamic information from the application database, such as 'Current user's resume.'

### Make this file private

By default, uploaded files are visible to anyone who has the link to the file. To provide an additional layer of security to files uploaded through this element, select this option. You will be prompted to select a thing to permanently attach the file to. That item can then be used to restrict access to the file via privacy rules.

Note: when uploading to Box, set privacy rules in the Data > Privacy tab.

### Attach this file to

This option is only visible if 'Make this file private' is selected. Private files uploaded with this element are permanently attached to a thing, which is used to determine who has access to view the file. Only users who have the 'View attached files' permission for that thing can view the file. Go to the Privacy section to create privacy rules that grant this permission. If the value of 'Attach this file to' is empty or the thing does not exist, the file will be visible to anyone who has the link, which is the same as if 'Make this file private' was not selected.

### Storage service

By default, uploaded files are stored by Bubble using Amazon's S3 file hosting service. You can optionally select a third-party storage service instead by adding that service as a plugin. Currently we support one third-party service, Box.

Note: when uploading to Box, set privacy rules in the Data > Privacy tab.

### Folder path

Enter the destination in your Box to upload the file. The destination is a forward-slash (/) separated list of folder names, such as 'My Folder/My Subfolder.' Bubble will automatically create folders if they do not already exist, and dynamic data can be used to build the folder path.

### Max file size (MB)

Use this field to limit the size of files uploaded from this element. The value will be the maximum number of megabytes. Default is 50 MB. Files as large as 5 GB can be uploaded to Bubble (see comment below), while the Box limit is 50 MB.

{% hint style="warning" %}
While Bubble officially supports file uploads of up to **5 GB**, most major browser don't support reliably uploading bigger files than **2 GB**. To be safe, you may want to see this as the practical limit.
{% endhint %}

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
