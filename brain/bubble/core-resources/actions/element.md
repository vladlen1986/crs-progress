# Element
> Source: https://manual.bubble.io/core-resources/actions/element · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Actions that manipulate elements on the page.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (10)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Workflows**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

***

#### Elements and design

Elements are the objects that you place on the page, such as text, inputs, buttons, images and icons.

* Article series: [Elements](/help-guides/design/elements)\
  This article series covers the different element types and the tools at your disposal for placing them on the page and editing their properties.
* Article series: [Design](/help-guides/design)\
  This article series covers how to design your app, control its properties, as well as external tools and inspiration for deciding how you want your app to look and behave.

***

#### **Logic**

Workflows is a part of the *Logic* series in the user manual.

* Article series: [Logic](/help-guides/logic)
  * Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Navigation](/help-guides/logic/navigation)\
    Using workflows to let the user navigate between pages and page sections.

***

#### Debugging

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)
{% endtab %}

{% tab title="Videos (3)" %}

* Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)
* Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)
* Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)

There are also relevant videos listed below the header in some entries below.
{% endtab %}
{% endtabs %}

## Show an element

Shows an element or popup. If the element is a container, the elements inside will be shown as well.

## Hide an element

Hides an element or popup. If the element is a container, the elements inside will be hidden as well.

### Animation (native app)

When building a native app, use native animations when a group is hidden, like sliding, etc. This provides a more native experience. Choose from None, Slide, and Flip.

### Animation direction

Select the direction of the animation. Choose from Left, Right, Up, and Down.

## Toggle an element

Use this action to toggle an element or popup. If the element is visible, it will be hidden. If the element is hidden, it will become visible.

{% embed url="<https://youtu.be/gDqAc9hj6Mc>" %}
Our Academy quick tip on how to toggle an element
{% endembed %}

## Scroll to an element

Use this action to scroll the page to a specific element. The page will be scrolled so that it is at the top of the browser window. This is useful for navigation buttons.

{% embed url="<https://youtu.be/jSHZGh1DSAA>" %}
Our Academy quick tip on how to scroll to an element
{% endembed %}

### Offset (pixels)

Enter a number in pixels to offset the scroll position. This is useful for a floating header that is near the top of the screen.

## Animate an element

Use this action to animate elements on the page. The 'transition' animation hides or shows the element as an action would do.

{% embed url="<https://youtu.be/Jg72ztXqBGA>" %}
Our Academy quick tip on how to animate elements
{% endembed %}

### Animation

Choose the animation to use. A thumbnail shows allowing you to preview the animation.

### Define a custom duration

By default, animations have a preset length. Check this box to override this setting.

### Duration (ms)

Enter the animation duration in milliseconds.

## Set state of an element

Assign custom states to elements to store additional information. For example, the current tab that a group shows, etc. This action modifies the value of the state. Use the state of an element in the Conditional section in the Property Editor to change how it displays based on the value of the custom state.

### Custom state

Select the state to modify. Create a new state by selecting 'Create a new custom state...' in the dropdown menu.

### Value

This is the value to assign to the custom state. It should be of the type of the custom state defined when the state was created.

### Set another state

Click this button to set another custom state for this element.

## Set focus to an input element

This action sets the focus to an input. If the input is not currently visible on the screen, the page will automatically scroll to the input.

{% hint style="info" %}
On an iOS device, even if this action is used, the keyboard will not appear until the user interacts with the page in some way.
{% endhint %}

## Reset relevant inputs

This action wipes the content of the inputs that were used in the workflow with this action. This is useful if you do not want users to click twice and run the workflow twice. The result inputs will either be empty or contain the default value defined for each of them.

<details>

<summary>Understanding the <em>Reset relevant inputs</em> action logic</summary>

* **Purpose**: This action clears the values of certain input elements on a page, resetting them to empty or to their default values (if defined).
* **"Relevant" inputs**: Inputs are only considered *relevant* if they are referenced somewhere in the same workflow. This includes any step or condition within the workflow that directly mentions the input's value.
* **Examples of relevance:**
  * If a step says *Create a new Thing* and pulls its value from *Input A*, then *Input A* is relevant and will be reset.
  * If a condition in the workflow says *Only when Input A's value is not empty*, that input becomes relevant—even if the value isn't directly used in an action.
* **Selective reset**: You can use dummy conditions or references in the workflow to deliberately make certain inputs relevant (and reset), while excluding others.
* **Use case:** This is useful when you want to clear input fields after an action (like submitting a form), but only for the fields involved in that action.
* **Not affected:** Inputs not referenced anywhere in the workflow will not be reset.

</details>

{% hint style="info" %}
If you want to completely reset all fields within a group, you can also consider using the [*Reset a group/popup* action](#reset-a-group-popup).
{% endhint %}

## Cancel upload of a file uploader

Cancel an in-progress upload of a file uploader. You can check if an upload is in progress using the 'is loading' state on the uploader.

## Show message in an alert box

This action shows an alert. It is different from the Show element action because the element is shown with a fade in and fade out animation.

### Fade in (ms)

Enter the length of the fade-in animation in milliseconds.

### Hold (ms)

Enter the number of milliseconds to keep the alert visible.

### Fade out (ms)

Enter the length of the fade-out animation in milliseconds.

### Change the alert message

Check this box to overwrite the message defined at the Alert element level.

### Message

Enter the new message to display.

## Display data in a group/popup

This action defines which data a group or popup should use, provided a type of content was defined at the element level. It overwrites the data source set at the group/popup level. It also resets the data of any inputs or groups that are children of this element.

### Data to display

Select the thing to be displayed in this group or popup. If the type isn't consistent with the element's type, the expression will be red or a popup will prompt you to change the element's type.

## Reset a group/popup

This action resets a group or popup. When this happens, the data source reverts to what was initially set at the element's level, and the inputs are deleted.

## Display list in a repeating group

This action defines which list of things a repeating group displays. It overwrites the data source set at the element level.

### Data source

This defines the list of things that should be displayed in the repeating group. If the type isn't consistent with the element's type, the expression will be red or a popup will prompt you to change the element's type.

{% hint style="warning" %}
Known Issue

With large repeating groups, especially ones showing a lot of data per cell (e.g. images), if the data source changes while the repeating group is visible, what's shown in the repeating group might have a visual lag as it refreshes in chunks. To mitigate this, consider hiding the repeating group, then changing the data source, then showing the repeating group again.
{% endhint %}

## Clear list in a repeating group

Reset the list of a repeating group to what is defined at the repeating group's level. If no data source was defined at the element's level, the list will be empty.

## Show next of a repeating group

When using the group in a 'Fixed number of cells' layout, use this action to go to the next page in the repeating group.

### Wrap around

If checked, the repeating group will display the first page after displaying the last one so that users can keep moving through the pages.

## Show previous of a repeating group

When using the group in a 'Fixed number of cells' layout, use this action to go to the previous page in the repeating group.

### Wrap around

If checked, the repeating group will display the first page after displaying the last one so that users can keep moving through the pages.

## Go to page of a repeating group

When using the group in a 'Fixed number of cells' layout, use this action to jump to a given page in the repeating group.

### Page

This number, which can be dynamic, is the page to go to. If the length is shorter than the entered number, it will go to the last page.

## Scroll to entry of a repeating group

Scrolls a repeating group so that a given entry is at the top of the list. This doesn't work with repeating groups in the 'Fixed number of cells' layout. In Infinite scroll mode, the list is scrolled to the correct position. In Full list mode, the entire page will be scrolled so that the entry is at the top of the screen.

### Entry to scroll to

This is the entry to scroll to. If it is not in the list, nothing will happen. It should be of the same type as the repeating group.

### Animate the scrolling

Check this box to apply a 300-milliseconds animation as the page/list scrolls.

### Vertical offset (pixels)

By default, this action will scroll so that the entry is at the top of the element (or the screen). If you need to add an offset, for instance if a header is at the top of the screen, you can enter a number of pixels there.

## Display markers on a map

This action overwrites the list of places a map shows. It takes a list of things that contain a geographic address and displays them on the map. When doing so, the zoom of the map is adjusted automatically to show all markers.

### Data source

Define the list of things that should be displayed on the map. If the type isn't consistent with the map's type, the expression will be red or a popup will prompt you to change the element's type.

## Set current map marker for a map

This action sets the currently selected map marker on a map. Only works for maps that are displaying a list of markers. When this action is run, the map's 'current marker' will change to the value of 'To select'. If the map is configured to display custom map markers for the selected item, and the value of 'To select' corresponds with a marker currently visible on the map, that marker will be visibly selected. Also, if 'Show title window' is turned on, the title window will be shown if it was currently hidden. Otherwise, there won't be a visible change to the map.

### To select

The map marker to select. Must be the same type of thing currently displayed as the map's list.

## Clear markers on a map

This action clears the map and uses the data source defined at the map level.

## Adjust map zoom

This action automatically adjusts the map zoom so that all markers are visible.

### Set center and zoom manually

By default, the action adjusts the zoom and center so that all markers on the map are shown. Check this box to define the zoom and center manually.

### Map centered on

This is the address used to center the map.

### Initial zoom

This is the zoom level applied to the map.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
