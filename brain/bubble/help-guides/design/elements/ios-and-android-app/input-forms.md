# Input forms
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/input-forms · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Date/TimePicker

The Date/TimePicker is a native mobile element specifically created for the native mobile app editor, offering an alternative to the traditional date/time picker used in the web app editor.

It automatically adapts to the device's system, displaying the iOS picker on Apple devices and the Android picker on Android devices. This behavior is enabled by default, requiring no additional configuration from your side.

{% hint style="warning" %}
The Date/TimePicker is using the native component on the device, and **will not render properly on web preview**.

Please use BubbleGo to test any flows involving the Date/TimePicker.
{% endhint %}

### Appearance

The date/time picker’s properties control two key parts:

* The [**element**](#element-properties) placed in the view.
* The [**native date/time picker** ](#native-date-time-picker-properties)which appears when the user clicks the element.

### Element properties

* **Picker style**: Choose between:
  * Label/Icon: Show both a label and a customizable icon.
  * Label: Show just a label.
* **Icon placement**: Choose to display the icon to the left (leading) or right (trailing) of the label.
* **Icon size:** Set the size of the icon in pixels.
* **Icon color:** Set the color of the icon.

### Native date/time picker properties

* **Input type:**
  * Dat&#x65;**:** Displays the date picker only. The date value will be stored in the database as the selected date + current time.
  * Tim&#x65;**:** Displays the time picker only. The time value will be stored in the database as the current date + selected time.\
    \
    To combine the date from one picker with the time from another picker, you can use the `change time to` operator.<br>
* **Accent color**
  * Color picker: Sets the color of a few properties in the calendar picker. See the screenshot below.
* **Minimum/Maximum date:** sets the minimum and maximum datetime that can be picked in the date/time picker.

## Selectable lists

A *selectable list* functions as an input element that allows users to *select one or multiple options* from a list. It is particularly useful for building filters, segmented controls, and selection forms without requiring additional custom states or workflows.

It can function in *single select* or *multi-select* mode, with additional customization options for selection limits and workflow integration. Below are the key behaviors of the selectable list.

#### **Single select behavior**

* When set to *single select*, the selectable list functions similarly to a radio button—only one option can be active at a time. The most recently selected item replaces any previous selection.
* Users can *deselect their current selection* by tapping the already-selected item, returning the list to an unselected state.

#### **Multi-select behavior**

* When set to *multi-select*, users can choose multiple options instead of just one.
* If no restrictions are applied, users can select as many options as they like.
* If a *selection limit* is set (e.g., a maximum number of choices), once a user reaches the limit, all other options become *disabled*. The user must *deselect an item* before selecting a new one.

#### **Validation and required lists**

* If the selectable list is marked as *required*, the *conditional styling* indicating a missing selection will only activate when the values are being saved. This is similar to how input validation works.
* Once the selection meets the requirement (e.g., one item selected in single select mode, or at least two items selected in a multi-select list with a range restriction), the required styling will automatically *deactivate*.

#### **Performance considerations**

* The selectable list *loads all items immediately*, meaning it does not use lazy loading or virtualization like the [*vertical list*](#vertical-list).
* Large data sets may impact performance, so it is important to limit the number of options when possible.
* This element is *not a replacement for vertical lists* and should not be used when handling extensive lists of items.

#### **Workflows and actions**

Workflows can be triggered when a user interacts with a list item. When adding a workflow from the list item property editor, the "When element is clicked" workflow event is automatically pre-filled.

The following actions are available for selectable lists:

* **Set selectable list value:** Set a selected value for the selectable list (single item or list, depending on the [selection type](#single-select-behavior)).
* **Select all:** Selects all the available entries in the list.
* **Unselect all:** Deselects all selected entries.
* **Display list:** Set a list of entries for the selectable list, formatted as a list.
* **Clear list:** Removes all entries from the list.
* **Scroll to entry:** Scrolls the list to specific record.

#### Properties

The following properties are available on selectable lists:

* 's list of items (if multi)
* 's selected item (if single)
* 's list of selected items (if multi)
* 's list of unselected items (if multi)
* 's minimum number of selections (if range is selected)
* 's maximum number of selections (if range is selected)
* 's number of allowed selections (if exact is selected)
* Width
* Height
* isn’t valid
* is disabled

#### Conditional properties

The following conditional properties are available on selectable lists:

* **Minimum number of selections** (`number`)**:** the minimum number of selectable entries, as specified in the minimum number of selection property
* **Maximum number of selections** (`number`)**:** the maximum number of selectable entries, as specified in the maximum number of selection property
* **Number of selections** (`number`)**:** The currently number of selected entries

## Checkbox

The Checkbox element provides an intuitive way to manage selection states without needing complex workflows or custom states.

Here are two common use cases for the Checkbox element:

#### **Filtering to-dos**

The Checkbox element can be used to filter lists, such as a list of to-do items. Instead of manually creating icons, workflows, and custom states to manage selections, you can add the Checkbox element directly to each list item. The checkbox works similarly to a button, allowing for customization of icons, labels, sizes, and colors.

It also includes built-in conditionals for the checked and unchecked states, making it simple to toggle between states by tapping. The current value of the checkbox is easily readable, so you can trigger actions based on whether it is selected or not.

#### **Managing Task Status**

Another common use case for the Checkbox element is to visually indicate task completion. For instance, when a task is marked as done, the checkbox will appear checked, and when a task is not done, it will appear unchecked. You can modify the default state of the checkbox through conditionals. For example, if a task is marked as complete in the database, the checkbox will automatically reflect that state by appearing checked.

#### Key Features:

* **Customizable appearance**: Adjust icons, labels, colors, and sizes.
* **Default checked/unchecked states**: Built-in toggling functionality.
* **Conditional behavior**: Reflect the current state based on conditions (e.g., task completion).
