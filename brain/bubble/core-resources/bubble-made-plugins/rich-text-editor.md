# Rich Text Editor
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/rich-text-editor · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Rich Text Editor Plugin creates an element that allows users to type a rich formatted text with colors, fonts, bullet points, link, etc. Use this if you want users to type a longer message.

## Rich Text Input

### Initial content

This field defines what the input will contain before the user modifies it or right after the input or group that contains it is reset. For example, to allow users to modify their bio, the initial content will likely be 'Current user's bio.'

### Regular or Tooltip?

Select 'Regular' if you want the standard rich text editor with a toolbar. 'Tooltip' will hide the toolbar and instead show a floating toolbar when text is highlighted text.

{% hint style="warning" %}
**Note:** The floating toolbar may get cut off if its boundaries overflow the Rich Text Editor element. This issue is most commonly seen in the first row of a Repeating Group where each cell contains a Rich Text Editor element.
{% endhint %}

### Style complexity

Select Basic if you wish to hide the advanced editing icons.

### Extend to fit

Check this box if you want the height of your input to increase as your text gets longer.

## Setup

Once you add the Rich Text Input to a page, you can customize what content you would like it to display when the page is loaded and how many style options you would like to display. If we have a message board in our application, we might have a page to display a particular message or post. To start, we can have our Rich Text Editor display the current post's content.

![](/files/-MZZHZhIRvFFsmfZhdTt)

In runmode, the existing content will fill the input. The current user can then make any changes to this post using the style options available, and we can save the updates to our database with a separate workflow.

![](/files/-MZZHbq5lE_wDMxwnmjb)

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team[o](mailto:support@bubble.io)!)
