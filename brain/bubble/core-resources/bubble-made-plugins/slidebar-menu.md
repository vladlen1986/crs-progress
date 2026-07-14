# Slidebar Menu
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/slidebar-menu · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% embed url="<https://youtu.be/tm9q8PJMTb8>" %}
Our Academy quick tip on getting started with a slidebar menu
{% endembed %}

The Slidable Menu Plugin creates an element that inserts a menu, which appears on the right or left of the screen with a sliding effect. It is usually for apps on mobile devices.

*Note:* Only one of these elements can be on a page.

## Slidebar Menu

### Options

Enter the options the menu should offer. Type one entry per line and press **enter** between each option. When the user presses on the options, the event will be triggered and a workflow will run. Refer to the option the user pressed by accessing the 'Element's current option.'

### Opening side

Select which side the menu should appear from, Left or Right.

### Show an icon

Check this box to use a standard icon for the menu when closed. To select a custom image, uncheck this box, select Image in the Background style, and upload an image.

### Icon color

Select a color for the icon.

### Menu width

Enter the width in pixels for the menu when open.

### Distance from top

If you do not want the menu to touch the top of the browser window, set a value in pixels for the distance between the top of the window and menu.

### Background color

Select the color to use for the menu background when the menu is open.

### Option hover color

Select the color to use when the user hovers over an option or clicks it.

### Font

Select the font family to apply to the selected element. Choose from the hundreds of fonts in the Google Fonts Library.

### Font size

Select the font size in pixels for the menu options.

### Menu font color

Select the color for the items when the menu is open.

### Shadow offset

Select the offset in pixels for the shadow. If set to 0, there will be no shadow.

### Blur Radius

Define the blur distance in pixels. A higher number means a more diffuse shadow, a lower number means a sharper shadow.

*Note:* This option is available with a Shadow offset greater than 0.

### Shadow Color

Select the color of the shadow.

*Note:* This option is available with a Shadow offset greater than 0.

## A slidebar menu's option is clicked

This event is triggered when an option is selected by the user. Use the expression 'This slidebar menu's current option' to find the selected option. Often, you will use the content of the current option in the condition on the event to run the proper actions in each case.

## Setup

Once you add the slidebar menu, you can define its list of options. This could be different categories of content that you want to display on your page, for example, About or FAQ sections. To keep it simple in this example, we will go with a list of options 1 through 4.

![](/files/-MZZ9op0mxITv8ca_O31)

Now we can start a workflow for when one of these options is clicked. Let's say we will also have a group on this page, and we want to change its content based on what option we choose. In that case, we can "Display data in a group" and select the current option as the data to display.

![](/files/-MZZ9sDOPYUp33_emJ6K)

When we preview the page and click "Option 1," we will see Option 1's information in our chosen group.

![](/files/-MZZ9lUn2lZ4X-fWEr-s)

If you would like to learn more, you can check out our Academy video for how to set this up with dynamic options instead.

{% embed url="<https://youtu.be/3Snl7lKIjnc>" %}
Our Academy quick tip on how to display a list in a Slidebar Menu
{% endembed %}

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
