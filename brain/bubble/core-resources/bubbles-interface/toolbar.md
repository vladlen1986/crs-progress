# Toolbar
> Source: https://manual.bubble.io/core-resources/bubbles-interface/toolbar · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for **beginner-level builders.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (7)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Bubble editor tools

This article series covers the different tools available in the Bubble editor.

* Article series: [Bubble editor tools](/help-guides/getting-started/navigating-the-bubble-editor/tools)
  * Article section: [The app interface manager](/help-guides/getting-started/navigating-the-bubble-editor/tools/key-features#app-interface-manager)
  * Article: [The search tool](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-search-tool)
  * Article: [The Issue Checker](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-issue-tracker)
  * Article: [The element tree](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-element-tree)
  * Article: [The element property editor](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-property-editor)
  * Article: [The debugger](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)
  * Article: [Notes](/help-guides/getting-started/navigating-the-bubble-editor/tools/notes)
    {% endtab %}
    {% endtabs %}

The toolbar contains many of Bubble's essential features. This section will explain each tool from left to right. Keep in mind that the tools displayed in the toolbar may change depending on the tab you are currently viewing.

## The Bubble logo / main menu

### Back to my Apps

This option takes you back to the dashboard of Bubble apps connected to your account.

### Edit

#### Undo

Undo the last change.

#### Redo

Redo the last change.

{% hint style="warning" %}
**Clipboard:** Bubble uses an internal clipboard that operates separately from your computer’s operating system clipboard. For example, when you copy an element using the Bubble editor's built-in copy feature, it won’t overwrite any content already stored on your OS clipboard (such as text).
{% endhint %}

#### Cut

Copies and deletes the selected component(s), such as elements on the page or workflow events/actions. Workflows associated with cut elements are not included. See [*copy with workflows*](#copy-with-workflows).

#### Copy

Copies the selected component(s), such as elements on the page or workflow events/actions. Workflows associated with cut elements are not included. See [*copy with workflows*](#copy-with-workflows).

#### Copy with workflows

Copies the selected element(s) and any workflow(s) that are triggered by those element(s).

#### Copy formatting

Copies the formatting of the currently selected element.

#### Copy layout settings

Copies the layout settings of the currently selected element (such as margins, padding and size).

#### Copy conditionals

Copies the conditions stored on the currently selected element.

#### Copy to another app

Use this feature if you are copying one or more elements or workflows to a different app than the one you are currently viewing.

#### Paste

Paste the components currently stored in the Bubble clipboard.

#### Paste with workflows

Paste the components currently stored in the Bubble clipboard.

#### Paste formatting

Paste the element formatting currently stored in the Bubble clipboard to the currently selected element.

#### Paste layout settings

Paste the element layout settings currently stored in the Bubble clipboard to the currently selected element.

#### Paste conditionals

Paste the element conditions currently stored in the Bubble clipboard to the currently selected element.

#### Delete

Delete the currently selected component.

#### Select all

Select all the elements on the current page.

#### Select first parent

Select the parent of the currently selected element.

#### Convert to reusable

Creates a reusable element from the currently selected element(s). Note that the original elements are not deleted or replaced by the newly created reusable element. This action navigates away from the current page and into the created resuable element editor.

#### Detach reusable

Converts the selected reusable element into individual elements, detaching them from the original reusable. This action replaces the reusable on the page with its contents but does not delete the original reusable element from your app.

#### Make index

Sets the currently open page as your app's new [index page](#user-content-fn-2)[^2]. The original index page will be renamed.

#### Duplicate page

Creates a copy of the currently open page. You will be asked to provide a name for the new page before the operation page is duplicated.

### Arrange

#### **Group** Groups the currently selected element(s) into a group container element.

#### **Ungroup**

Removes the selected elements from their group, turning them back into individual elements.

#### **Bring to front**

Moves the selected element(s) to the top layer, placing them above all other overlapping elements.

#### **Send to back**

Moves the selected element(s) to the bottom layer, placing them behind all other overlapping elements.

#### **Align left**

Aligns the selected element(s) to the left edge of the furthest left element in the selection.

#### **Align horizontal centers**

Aligns the selected element(s) so that their horizontal centers are aligned.

#### **Align right**

Aligns the selected element(s) to the right edge of the furthest right element in the selection.

#### **Align top**

Aligns the selected element(s) to the top edge of the highest element in the selection.

#### **Align vertical centers**

Aligns the selected element(s) so that their vertical centers are aligned.

#### **Align bottom**

Aligns the selected element(s) to the bottom edge of the lowest element in the selection.

#### **Center horizontally**

Centers the selected element(s) horizontally within the parent container.

#### **Center vertically**

Centers the selected element(s) vertically within the parent container.

#### **Distribute horizontally**

Evenly spaces the selected element(s) across the horizontal axis, based on their outer edges.

#### **Distribute vertically**

Evenly spaces the selected element(s) along the vertical axis, based on their outer edges.

### Views

#### **X-ray mode**

Displays all elements on the page with transparent backgrounds, making it easier to view and select overlapping or hidden elements.

#### **Lock Property Editor**

When this option is on, the property editor pane will be locked on the right side of the design canvas instead of being draggable.

#### **Element borders**

Outlines all elements on the page with visible borders, helping to distinguish and align elements more easily.

#### **Element thumbnails**

Shows small preview images of elements when associated atoms[^3] or workflow components are hovered, providing a quick visual reference.

#### **Element labels**

Displays the names of elements directly on the page, making it easier to identify and manage different components.

#### **Snap elements to edges**

Automatically aligns elements to the edges of nearby elements for precise positioning.

#### **Snap elements to grid**

Aligns elements to the closest point on the grid, ensuring consistent spacing and alignment.

#### **Snap to edges and grid**

Combines both edge and grid snapping, allowing elements to align with nearby elements and the grid simultaneously.

#### **Do not snap elements**

Disables snapping, allowing for freeform placement of elements without automatic alignment.

### Grids and guides

#### **Show grid**

Displays a grid overlay on the editor canvas to help with aligning and positioning elements.

#### **Show horizontal lines**

Adds horizontal guide lines to the grid for better vertical alignment (disabled in the image).

#### **Step (grid)**

Defines the spacing between grid lines. A larger number increases the distance between lines.

#### **Color (grid)**

Sets the color of the grid lines for better visibility against different backgrounds.

#### **Include gutters**

Adds spacing (gutters) between grid columns to help structure content layout.

#### **Start with gutter**

Begins the grid layout with a gutter, ensuring consistent spacing from the page edge.

#### **Step (gutter)**

Sets the width of the gutter space between grid columns.

#### **Color (gutter)**

Adjusts the color of the gutter lines for visual clarity.

#### **Show distances on hover**

Displays the distance between elements when hovering over them in the editor for precise spacing adjustments.

#### **Color (hover distance)**

Determines the color of the distance indicators shown on hover.

## App Interface Manager

The app interface manager lets you first:

* Switch between your web app and native mobile app.
* Navigate the different pages/views and reusable elements associated with each app type-

Search your application for pages, native mobile views and reusable elements and native mobile views. You can also organize pages, native mobile views and reusable elements into folders.

## Version control selector

Opens up the [version control](#user-content-fn-4)[^4] panel.

## Save status

Displays the status of your recent changes to indicate whether they have been saved. If Bubble is unable to save your app—such as during an internet connection issue—a notification will alert you to the error.

## Issue checker

Shows the current number of issues, as tracked by the [issue checker](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-issue-tracker).

## Search tool

Opens up the app [search tool](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-search-tool).

## Preview

Generates a preview of your app and opens it in a new tab in your browser. Use the arrow down symbol for more options.

### Preview

Preview the app with no features disabled. Same as clicking the play symbol.

### Disable custom HTML

Preview the app with custom HTML disabled.

### Disable plugins

Preview the app with plugins disabled.

### Disable HTML and plugins

Preview the app with plugins and custom HTML disabled.

## Deploy

Displays the deploy panel. Note that you must have 0 issues in the issue checker to be able to deploy.

## Undo

Undo the last change.

## Redo

Redo the last undone change.

## Page canvas toolbar options

This section shows toolbar options specific for the page editor canvas

### Inline element search

Search the current page for elements by name.

### Zoom

Zoom in/out or to 100%.

{% hint style="info" %}
**Zoom:** Bubble’s zoom feature operates separately from the browser’s zoom. This means that only the page and its elements are scaled in or out, while the rest of the editor—such as toolbars, menus, and other tools—remains unaffected. Using the browser’s built-in zoom is not recommended, as it may lead to unexpected behavior while editing.
{% endhint %}

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: The *index* page serves as the "root" page of your app and will automatically load when no specific page name is provided in the URL.

    Article: [The page](/help-guides/design/elements/web-app/the-page)

[^3]: Each block of a dynamic expression is known as an *atom*.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^4]: Bubble's version control system lets you divide the development of your project into independent parts, so that you and other editors with access to the project can iterate on one part of the app without impacting other parts.

    Article series: [Version control](/help-guides/maintaining-an-application/version-control)
