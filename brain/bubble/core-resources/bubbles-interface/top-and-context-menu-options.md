# Top and context menu options
> Source: https://manual.bubble.io/core-resources/bubbles-interface/top-and-context-menu-options · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="Article (1 series)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Bubble editor

This article series covers the interface of the Bubble editor.

* Article series:[ The Bubble editor](/help-guides/getting-started/navigating-the-bubble-editor)
  {% endtab %}

{% tab title="Videos (1)" %}
Video lesson: [How to group elements together](https://www.youtube.com/watch?v=HWmgmzIQRfg)
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
This reference entry lists all the different options available in the top menus and context menu. The available options in these can vary depending on where you are in the editor and what object[^2] you have selected.

To find the option you are looking for we recommend using the Docs search tool or using Bubble's in-editor documentation links.
{% endhint %}

### Undo

Undo the last change.

### Redo

Redo an undo change.

### Edit

Edits the current selection, e.g., element, action, event.

### Edit reusable

Navigates the design editor to edit the currently selected reusable element.

### Edit page

Edits the current page.

### Delete

Deletes the current selection, e.g., element, action, event, style.

### Replace by another type

This action replaces an element/action/event by another element/action/event of a different type. For example, change an element from a checkbox to a toggle or from a group to a popup.

Note: This operation may lead to inconsistencies if the data type changes and a different input is needed. Review the Issue checker to ensure no issues were introduced. Undo this change, if necessary.

### Convert to a reusable element

This option takes a group of elements and converts them into a reusable element.

### Detach reusable element

This option takes a reusable element and converts them to a group that contains the same elements and workflows as the original reusable element.

#### Limitations for repeating groups

The *Detach reusable element* function comes with a few limitations:

* Once a reusable element that contains a workflow event is detached from a repeating group cell, the workflow belongs to the page and cannot reference a specific cell's data. This limitation applies specifically to workflow events that are not attached to an element, such as "Do every 5 seconds" as opposed to "When button is clicked," in a reusable element within a repeating group cell.
* Once a reusable element containing a popup, group focus, or floating group is detached within a repeating group cell, any data that is inherited from the repeating group cell will not be automatically passed to the detached container since they are now a part of the page. A workflow will need to be set up specifically to send the data to the detached group.
* If a reusable element within a repeating group cell contains a group focus, and the group focus references an element within the reusable element, detaching the reusable element will result in the group focus being unable to reference the element within the repeating group cell, since the container is now a part of the page.
* If a reusable element inside a repeating group cell that includes an element linked to an action to display a group focus is detached, the action will lose its reference to the group focus and no longer be able to display it.

### Group elements in a Group

This option takes the selected elements and creates a new group. You can choose with container layout type you'd like to group the elements in. The options are as follows:

* [Responsive Properties](/core-resources/elements/responsive-properties#group-elements-fixed)
* [Responsive Properties](/core-resources/elements/responsive-properties#group-elements-row)
* [Responsive Properties](/core-resources/elements/responsive-properties#group-elements-column)
* [Responsive Properties](/core-resources/elements/responsive-properties#group-elements-align-to-parent)

### Ungroup these elements

{% embed url="<https://youtu.be/AqYRCnrqlmw>" %}
Our Academy quick tip on how to ungroup elements
{% endembed %}

This option moves the elements outside of the group that contains them, leaving the elements in the same position. This does not delete the group container, so delete it if no longer needed.

### Add a new page...

Creates a new page from a blank template or by cloning an existing page.

### Clone this Page

Creates a new page with the same elements/actions/events as the original page.

### Make this page the new index

{% embed url="<https://youtu.be/UrWYCO1bdhM>" %}
Our Academy quick tip on how to set a new index page
{% endembed %}

This function replaces the app's existing index and uses the current page as the new index. An index page cannot be deleted, so use this option to replace it. The previous page will be renamed old\_index.

### Add a new reusable element...

Creates a new reusable element. Choose an existing element or clone a reusable element.

### Clone this reusable element

Creates a new reusable element with the current element's properties.

### Backend workflows

This page is for editing the different backend workflows used in the app - the common characteristic of all backend workflows is that they run on the server, i.e. they are not tied to a specific page of the app. There are three types of backend workflows you can define:

* API workflows: a general workflow that can be initiated from elsewhere in the app or via the Workflow API (see [Workflow API](https://manual.bubble.io/core-resources/api/workflow-api#api-event-endpoint))
* Recurring workflows: a workflow that is set to run at a certain frequency (see [Recurring Event](https://manual.bubble.io/core-resources/events/recurring-event))
* Database change trigger: a workflow that runs when any change of any thing of a specified data type happens (see [Trigger Event](https://manual.bubble.io/core-resources/events/trigger-event))

### Cut

Cuts the current selection, e.g., element, action, event, style.

### Copy

Copies the current selection, e.g., element, action, event, style.

### Paste

Pastes the current clipboard onto the current page. If the pasted element came from a different page or a different app, relative references to elements on the initial page will be removed.

### Duplicate

Copies the current selection and pastes it onto the current page.

### Select all

Selects all the elements on the page.

### Select first parent

Selections the immediate parent of the selected element. This is convenient when an element is contained by a group with the same dimensions.

### Copy with workflows

Copies the selected elements and the associated workflows.

### Paste with workflows

Pastes the elements and the associated workflows from the clipboard. If the pasted element came from a different page or app, relative references to elements on the initial page will be removed.

### Copy formatting

Copies the design options of the current selection.

### Paste formatting

Pastes the design options from the clipboard.

### Copy style

Copies the style of the current selection.

### Paste style

Pastes the design options from the clipboard. The style itself is also copied.

### Copy layout settings

Copies the layout settings of the selected element.

### Paste layout settings

Applies the layout settings from the clipboard to the selected element. A full list of settings that can be copied and pasted is included below.

{% hint style="info" %}
**Note:** Not all elements have compatible layout settings. When the elements are incompatible, this option will be disabled in the menu. Below are instances where element layout settings are not compatible:

* Visual Elements and Containers
* Form Inputs and Containers
* Elements with different parent container layout types
  {% endhint %}

<details>

<summary>List of layout settings that can be copied and pasted</summary>

**Global**

* Make this element fixed width
* min width
* max width
* fit width to content
* Make this element fixed height
* min height
* max height
* fit height to content
* Padding
* Margin

**Specific to Row Parent**

* Vertical Alignment

**Specific to Column parent**

* Horizontal Alignment

**Specific to Align to Parent parent**

* Nonant

**Specific to Container**

* Container Layout Type
* Container Alignment
* Row gap
* Column Gap

**Layout Settings that cannot be copied pasted**

* Order (Row & Column)

</details>

### Copy conditional expressions <a href="#copy-conditional-formatting" id="copy-conditional-formatting"></a>

Copies all conditional expressions of the currently selected element.

### Paste conditional expressions <a href="#paste-conditional-formatting" id="paste-conditional-formatting"></a>

Pastes all the conditional expressions from the clipboard.

### Copy condition

This function copies a condition of an element (when editing it in the Property Editor). It can then be pasted for the same element or another element.

### Paste condition

This function pastes a condition to an element.

### Copy expression

This function copies a dynamic expression that was built with the Composer.

### Paste expression

This function pastes a dynamic expression from the clipboard. Access it when editing an expression, even if it is empty.

### Clear expression

This clears the dynamic expression.

### Paste before

This function pastes a text dynamic expression from the clipboard and appends it before the currently edited expression.

### Paste after

This function pastes a text dynamic expression from the clipboard and appends it after the currently edited expression.

### Copy to another app

This function copies the selected element(s) or reusable element(s) so that it can then be pasted into another app. It includes associated data such as styles, font/color variables, and reusable definitions across the apps.

When copying reusable elements:

* All elements within the reusable elements, as well as associated styles, will be copied.
  * If the reusable uses default default font or color variables they will take on the properties of the second app
* If the reusable element contains one or more reusable element, they'll be inserted as standard elements, not as reusable ones

### Clear all

Clears the entire dynamic and text expression.

### Bring to front

Moves an element to the forefront.

### Send to back

Moves an element behind all other elements.

### Collapse all children

Collapses (closes) the container[^3] selected, and all containers descended from it.

### Expand all children

Expands (opens) the container[^3] selected, and all containers descended from it.

### Show all children

Make all direct children visible in the editor.

### Hide all children

Make all direct children invisible in the editor.

### Delete all children

Delete recursively all children in an element.

### Center horizontally

{% embed url="<https://youtu.be/iGFxX5RRxYY>" %}
Our Academy quick tip on how to center elements
{% endembed %}

Centers an element horizontally relative to the group that contains it or to the page.

### Center vertically

Centers an element vertically relative to the group that contains it or to the page.

### Align left

When applied to several elements, this option arranges all the elements so that the left borders line up.

### Align horizontal centers

When applied to several elements, this option arranges all the elements so that their horizontal centers line up.

### Align right

When applied to several elements, this option arranges all the elements so that the right borders line up.

### Align top

When applied to several elements, this option arranges all the elements so that the top borders line up.

### Align vertical centers

When applied to several elements, this option arranges all the elements so that their vertical centers line up.

### Align bottom

When applied to several elements, this option arranges all the elements so that the bottom borders line up.

### Distribute horizontally

When applied to several elements, this option ensures that the horizontal space between the elements is equal.

### Distribute vertically

When applied to several elements, this option ensures that the vertical space between the elements is equal.

### Swap element positions

{% embed url="<https://youtu.be/04dDc9VaW2Y>" %}
Our Academy quick tip on how to swap element positions
{% endembed %}

Swaps the positions of two elements.

### Reveal in Elements tree

This option shows where the element is in the Elements tree box, which is located in the Palette.

### Start/Edit workflow

Use this function to either create a workflow or display the existing workflow for the selected element.

### Insert an action

Inserts an action before the action you're currently editing.

### Reveal the element

Use this function to see which element is used by the selected event or action.

### Reveal the action

Shows the action a dynamic expression is referring to.

### Show short videos

For new users, a short video is shown the first time you draw each type of new element. Click here to disable this feature.

### Always show all properties

Show less options in the Property Editor for visibility and clarity purposes.

### Show recent feature release

Add a gift icon to your toolbar to stay up to date on new features and fixes that we add to Bubble. Clicking here opens a popup that lists the changes since the last time you visited the application editor.

### Shortcut list

Open a popup that lists keyboard shortcuts for common actions, such as CTRL+P to preview your application just like you had clicked on Preview in the toolbar.

### Academy

A link to our educational library, including video courses, tutorials, and quick tips.

### Forum

A link to our online community, where many expert Bubble users spend time helping other users out.

### Report a bug

{% embed url="<https://youtu.be/uX44BUxtdXs>" %}
Watch our Academy quick tip on what to include in a bug report
{% endembed %}

A link to a bug report form, where you can share steps for our team to reproduce and investigate an unexpected behavior on Bubble.

### Show grid

Customize a grid on the background of your page to help with your design. Choose the grid's color, step size, gutter size, and horizontal lines.

### Snap element to edges

Auto-align elements to the edges of other elements, for example, to make sure two buttons are left-aligned.

### Snap elements to grid

Auto-align elements to the edges of the grid on your page, for example, if you wanted to design your page in thirds.

### Snap to edges and grid

Auto-align elements to each other and columns or rows within you grid.

### Do not snap elements

Manually position elements only, without preference for the edges of other elements or alignment with the grid.

### Show element borders

Add an outline around the edges of your elements when designing in the application editor. Change the color in the *View* menu to help it stand out.

### Cut column

Cut a column from a table element.

### Copy column

Copy a column's content in a table element.

### Copy column with workflows

Copy a table element column along with any associated workflows.

### Cut row

Cut a row from a table element.

### Copy row

Copy the contents of a row in a table element.

### Copy row with workflows

Copy a row along with any associated workflows in a table element.

### Paste column to right

Paste a previously copied column to the right of the current column in a table element.

### Paste column to left

Paste a previously copied column to the left of the current column in a table element.

### Paste row above

Paste a previously copied row above the current row in a table element.

### Paste row below

Paste a previously copied row below the current row in a table element.

### Paste column with workflows to left

Paste a previously copied column along with its workflows to the left of the current column in a table element.

### Paste column with workflows to right

Paste a previously copied column along with its workflows to the right of the current column in a table element.

### Paste row with workflows above

Paste a previously copied row along with its workflows above the current row in a table element.

### Paste row with workflows below

Paste a previously copied row along with its workflows below the current row in a table element.

### Select all cells

Select all cells in a table element.

### Add column to left

Add a new column to the left of the current column in a table element.

### Add column to right

This action adds a new column to the right of the current column in a table element.

### Add row above

This adds a new row above the current row in a table element.

### Add row below

This action adds a new row below the current row in a table element.

### Copy cell content

This action allows you to copy the content of a cell in a table element.

### Copy cell content with workflows

This copies the content of a cell along with any associated workflows in a table element.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: An *object* in this context refers to the different things you can select in Bubble, such as elements, workflows, actions, etc.

[^3]: Containers are a type of element that contains other elements. Common container types are groups, floating groups and repeating groups.

    Article: [Containers](/help-guides/design/elements/web-app/containers)
