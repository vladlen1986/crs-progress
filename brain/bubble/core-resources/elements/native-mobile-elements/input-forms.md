# Input forms
> Source: https://manual.bubble.io/core-resources/elements/native-mobile-elements/input-forms · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Checkbox

Toggles between checked and unchecked states. Commonly used for filtering items or managing task status. Supports custom icons, labels, colors, and sizes. Conditionals can be used to reflect a default state (e.g., checked if task is complete). Easily triggers workflows based on its current state.

## Date/Time picker

Displays the device’s native date or time picker. Shows the iOS picker on Apple devices and the Android picker on Android devices. Only works in BubbleGo, not Web Preview.\
Picker styles:

* **Label/icon** or **Label only**
* **Icon placement**: Leading or trailing
* **Icon size/color** customizable\
  Input types:
* **Date**: Stores selected date + current time
* **Time**: Stores current date + selected time\
  Other options:
* **Accent color** for system UI elements
* **Min/max date** for selection limits\
  Use the **change time to** operator to combine separate date and time pickers.

## Selectable list

Lets users choose one or more options from a list. Best for filters or segmented controls. Loads all items immediately (no lazy loading).\
Modes:

* **Single select**: Like radio buttons. Only one item active at a time.
* **Multi-select**: Users can pick multiple items. You can set selection limits.\
  Required lists show validation styling only on save.\
  Triggers:
* **When element is clicked** workflow\
  Actions:
* Set selectable list value
* Select all / Unselect all
* Display list / Clear list
* Scroll to entry\
  Properties include:
* Selected/unselected items
* Min/max/allowed selections
* Width, height, validity, and disabled state\
  Conditional props:
* Min, max, and total number of selections.
