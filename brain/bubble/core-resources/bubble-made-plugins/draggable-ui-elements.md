# Draggable Elements
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/draggable-ui-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Draggable Elements Plugin adds two elements, Drag/drop Group and Drop Area, which add draggable elements to the app. They allow users to drag things and drop elements in a drop area.

{% hint style="warning" %}
**Note:** The drag and drop plugin may have less smooth behavior on certain older browsers. Also, note that the smoothness and performance of the interaction will depend on your particular implementation of the plugin, meaning more complex implementations may see slightly degraded performance. We encourage you to test your implementation to see if you are happy with the resulting user experience.
{% endhint %}

## Drag/drop Group

This element can be dragged by the user and dropped in a drop area. If a workflow is associated with this drop area, the workflow will run. This element is a container and has a thing as a data source. You can access the coordinates of the element when the user drags it as 'X position' and 'Y position'. These coordinates are relatively to the parent element and can be used in the Move element action (see below).

### Constrain the movement within the parent

Check this box to prevent users from dragging the element outside of its parent.

### Make this element droppable

Check this box to allow the group to be droppable in a drop area and trigger a workflow. Otherwise, the element will simply be a draggable palette.

{% hint style="info" %}
**Note:** When `make this element droppable` is checked, conditional logic that is triggered when an element is dragged will not work properly.
{% endhint %}

### Disable the ability to drag

When this option is selected, the group will behave like an ordinary group, and the user will not be able to drag it.

### Behavior post drop

This option defines how the group should behave when dropped in a drop area and when a workflow is triggered. Choose from Hide group and Move back, which moves the element back to its initial position.

{% hint style="info" %}
**Note:** This setting is only available when `make this element droppable` is checked.
{% endhint %}

## Drop Area

This element can trigger a workflow when a drag/drop group is dropped in it.

### Tolerance

This specifies which mode to use for testing whether a drag/drop group is dropped into a drop area. Choose from:

* **Intersect:** The drag/drop group overlaps the drop area by at least 50% in both directions.
* **Fit**: The drag/drop group overlaps the drop area entirely.

### **Type of content**

This allows you to select the type of thing this container displays. Most elements that have this property also have a Data source property, which lets you select the displayed thing or list of things. The value of the data source must match the selected type of content.\
\
Let's look at an example of a map with hotels marked. When you click a marker, a popup displays with the name of the hotel. The Type of content would be 'Hotel' and the Data source would be 'Map's current marker.'

### **Data source**

Define the thing or list of things that should be displayed in this container. For example, in groups or popups, only a single thing will display, but for repeating groups a list of things will display.\
\
Child elements can access the Data source from their parent. If the parent contains a list of things, the child has access to the individual list items.\
\
A common scenario for groups is to display something, like the current user, and then have the group contain the inputs that modify the user's properties, such as text and images that display information about the user.\
\
The Type of content determines what kind of thing you are allowed to set in the Data source field. If the type of thing does not match the Data source, it will be marked as an issue, and you must change one or the other to match.\
\
The Data source can come from anywhere in Bubble. For example, it could be the result of a search, a custom or built-in Data source, or it could be dynamic and come from the user. The Data source will update when its source changes. For example, if the search result changes because a user modified some data used in the search constraints, the displayed list will automatically change. For additional flexibility, you can update the Data source in the Conditional Formatting Tab in the Property Editor.\
\
Finally, the Data source property can be modified by workflows. Changes made by actions override whatever you specify as the Data source directly or as a conditional state until you run a reset action, which then restores the original setting.

## A drop area has an element dropped in it

This workflow is triggered when a drag/drop group is being dropped into it. Only elements that are droppable can be dropped and trigger such an event.

### Type of workflow thing

If you want the workflow to be able to take an entry from the database, define the type of the thing here. If this field is set, the thing will be the data source of the dropped group. If there is a mismatch between the type defined here and the type of content of the dropped group, the workflow will not run.

## Move a draggable group

This action lets you manually move a draggable group on the screen. You can use this to build a product tour of your app.

{% hint style="info" %}
**Note:** An element that is [made droppable](#make-this-element-droppable) will not be available to be moved in this workflow action as the droppable setting already defines explicit behavior for that element.
{% endhint %}

### Movement type

You can either pick an element to move the draggable group to, or specify some coordinates. Keep in mind that using coordinates can lead to unexpected results if the screen dimensions vary, etc. Therefore, we recommend using another element as a reference.

### Element to move to

The way to represent the new position is by reference to an element. The group will be moved so that the top-left corners of the draggable group and this element match. Droppable elements cannot be selected.

### Offset top (px)

Pushes the moved element this number of pixels below the reference element.

### Offset left (px)

Pushes the moved element this number of pixels left of the reference element.

### Left - X (px)

Specify here the left coordinate of the element. This can be a dynamic expression. This coordinate is relatively to the parent element.

### Top - Y (px)

Specify here the top coordinate of the element. This can be a dynamic expression. This coordinate is relatively to the parent element.

### Duration (ms)

This field defines the length of the animation. If you enter 0, the move will be without animation.

## Setup

You might use drag and drop groups to show tasks in a to-do app. As you make progress, you can drag a task from a "To Do" column to a "Done" column.

![](/files/-MZsWK_GK35ZzIhp6HIn)

If we check the option to make our drag and drop group draggable, then you can also start a workflow to update the status of a task in the database once it's dropped on a particular drop area.

![](/files/-MZsWP77FoRcSLDlexnN)

In this case, you might start a workflow for when DropArea B, our drop area for "Done," has a group dropped on it, you update that group's task's status to "Done."

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
