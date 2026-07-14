# Element actions
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions/element-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

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

## Animate an element

This action animates an element on the page. The *transition* animation hides or shows the element, the same way the *Show* and *Hide* actions do.

### Animation

The animation to use. A thumbnail preview is shown to help you choose.

### Define a custom duration

By default, animations have a preset length. Check this box to override it.

### Duration (ms)

The duration of the animation in milliseconds.

***

## Cancel upload of a file uploader

This action cancels an in-progress file upload. You can check whether an upload is in progress using the *is loading* state on the file uploader element.

### Element

The file uploader element to apply the action to.

***

## Display data in a group/popup

This action sets the data a group or popup displays, provided a type of content was defined at the element level. It overwrites the data source set at the element level and resets the data of any inputs or groups that are children of that element.Display data in a group/popup

This action sets the data a group or popup displays, provided a type of content was defined at the element level. It overwrites the data source set at the element level and resets the data of any inputs or groups that are children of that element.

### Data to display

The thing to display in the group or popup. If the type isn't consistent with the element's type, the expression will turn red or a prompt will ask you to change the element's type.

***

## Hide an element

This action hides an element or popup. If the element is a container, all elements inside it are hidden as well.

### Element

Sets the element you want to hide.

### Animation (native mobile app)

When building a native app, select a native animation to play when the element is hidden. Choose from *None*, *Slide*, and *Flip*.

#### Animation direction

The direction of the animation. Choose from *Left*, *Right*, *Up*, and *Down*.

***

## Reset a group/popup

This action resets a group or popup to its initial state. The data source reverts to what was set at the element level, and any inputs inside are cleared.

{% hint style="info" %}
The *Reset a group/popup* action **does not affect custom states**. To reset or change the value of a custom state, use the Set state of an element action.
{% endhint %}

### Element

The container element to reset.

***

## Reset relevant inputs

### Reset relevant inputs

This action clears the inputs that were referenced in the current workflow, resetting them to empty or to their defined default values.

{% hint style="info" %}
To reset all fields within a group at once, consider using the *Reset a group/popup* action instead.
{% endhint %}

<details>

<summary>Understanding the Reset relevant inputs action logic</summary>

**Purpose**: This action clears the values of certain input elements on a page, resetting them to empty or to their default values if defined.

* **"Relevant" inputs**: An input is considered relevant if it's referenced somewhere in the same workflow — in any step or condition that directly uses the input's value.
* **Examples of relevance:**
  * If a step says *Create a new thing* and pulls its value from *Input A*, then *Input A* is relevant and will be reset.
  * If a condition says *Only when Input A's value is not empty*, that input is also considered relevant, even if its value isn't used directly in an action.
* **Selective reset**: You can use dummy conditions or references to deliberately make certain inputs relevant — and therefore reset — while leaving others unchanged.
* **Not affected**: Inputs not referenced anywhere in the workflow won't be reset.

</details>

***

## Scroll to an element

This action scrolls the page to a specific element, positioning it at the top of the browser window.

### Offset (pixels)

A pixel value to offset the scroll position.

***

## Set focus to an input element

### Set focus to an input element

This action sets focus to an input element. If the input isn't currently visible on the screen, the page scrolls to it automatically.

{% hint style="info" %}
On iOS devices, the keyboard won't appear until the user interacts with the page, even when this action is used.
{% endhint %}

***

## Set state of an element

This action sets the value of a custom state on an element. Custom states let you store additional information on an element — for example, which tab is currently active in a group. Use the state's value in the *Conditional* section of the property editor to change how the element displays based on that value.

### Element

The element that holds the custom state you want to set.

### Custom states

The states to modify. Add a state by clicking the + icon, or click *Add all states* to add the list of existing custom states. Create a new state by selecting *Create a new custom state* in the *State* dropdown.

### Value

The value to assign to the custom state. Must match the type defined when the state was created.

{% hint style="info" %}
To learn more about custom states, see our user manual section:

User manual: [Custom states](https://manual.bubble.io/~/changes/1175/help-guides/data/temporary-data/custom-states)
{% endhint %}

***

## Show an element

This action shows an element. If the element is a container, all elements inside it are shown as well.

### Element

Sets the element you want to show.

***

## Show message in an alert box

This action displays an alert with a fade-in and fade-out animation.

### Element

The [alert element](https://manual.bubble.io/~/changes/1175/core-resources/elements/visual-elements) to display.

### Fade in (ms)

The duration of the fade-in animation in milliseconds.

### Hold (ms)

The number of milliseconds to keep the alert visible.

### Fade out (ms)

The duration of the fade-out animation in milliseconds.

### Change the alert message

Check this box to overwrite the message defined at the alert element level.

### Message

The message to display.

{% hint style="info" %}
To use this action, there needs to be at least one [alert element](https://manual.bubble.io/~/changes/1175/core-resources/elements/visual-elements) on the page.
{% endhint %}

***

## Toggle an element

### Toggle an element

This action toggles the visibility of an element or popup. If the element is visible, it's hidden. If it's hidden, it's shown.

### Element

Sets the element you want to toggle.

***

## Element-specific actions

## Map

### Adjust map zoom

This action adjusts the map zoom automatically so that all markers are visible.

### Set center and zoom manually

By default, the action adjusts the zoom and center to show all markers on the map. Check this box to define the zoom and center manually.

### Map centered on

The address used to center the map.

### Initial zoom

The zoom level to apply to the map.

### Clear markers on a map

This action clears the map and restores the data source defined at the map level.

### Display markers on a map

This action overwrites the list of places shown on a map. It takes a list of things that contain a geographic address and displays them as markers. The map zoom adjusts automatically to show all markers.

#### Data source

The list of things to display on the map. If the type isn't consistent with the map's type, the expression will turn red or a prompt will ask you to change the element's type.

### Set current map marker for a map

This action sets the currently selected marker on a map. Only works for maps displaying a list of markers. When the action runs, the map's *current marker* updates to the value of *To select*. If the map is configured to display a custom marker style for the selected item, and the selected value corresponds to a marker currently visible on the map, that marker is visually selected. If *Show title window* is enabled and the title window is currently hidden, it will be shown. Otherwise, there's no visible change to the map.

#### To select

The map marker to select. Must be the same type as the things currently displayed in the map's list.

***

## Repeating group/Table

### Clear list in a repeating group or table

This action resets the list of a repeating group or table to the data source defined at the element level. If no data source was defined at the element level, the list will be empty.

#### Element

Specifies the repeating group or table you want to clear.

***

### Display list in a repeating group or table

This action sets the list of things a repeating group or table displays, overwriting the data source set at the element level.

#### Element

Defines the repeating group or table you want to display the list in.

#### Data source

The list of things to display.

***

### Go to page of a repeating group or table

When the repeating group uses a *Fixed number of cells* layout, this action jumps to a specific page in the repeating group.

#### Page

The page number to navigate to. If the value exceeds the total number of pages, the action navigates to the last page.

***

### Scroll to entry of a repeating group or table

This action scrolls a repeating group so that a specific entry appears at the top of the list. This action doesn't work with repeating groups in the *Fixed number of cells* layout. In *Infinite scroll* mode, the list scrolls to the correct position. In *Full list* mode, the entire page scrolls so the entry appears at the top of the screen.

#### Entry to scroll to

The entry to scroll to. If the entry isn't in the list, nothing happens. Must be the same type as the repeating group/table.

#### Animate the scrolling

Check this box to apply a 300-millisecond animation as the page or list scrolls.

#### Vertical offset (pixels)

A pixel value to offset the scroll position. Useful when a header is at the top of the screen.

***

### Show next page of a repeating group or table

When the repeating group or table uses a *Fixed number of cells* layout, this action advances to the next page in the repeating group.

#### Wrap around

When checked, the repeating group returns to the first page after the last one, so users can keep cycling through.

***

### Show previous page of a repeating group or table

When the repeating group or table uses a *Fixed number of cells* layout, this action goes back to the previous page in the repeating group.

#### Wrap around

When checked, the repeating group returns to the first page after the last one, so users can keep cycling through.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
