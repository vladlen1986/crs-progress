# Bubble-made plugin events
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-events/bubble-made-plugin-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Calendar

### A calendar's event is clicked

Triggers when the user clicks on a specific event in the calendar element.

#### Data sources

| Data source                          | Description                                                                          | Data type                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| This calendar's current event        | Returns the event that was clicked in the calendar element.                          | The data type is set in the element's properties.                     |
| This calendar's current day's events | Returns the event(s) of the currently selected day.                                  | Returned as a list. The data type is set in the element's properties. |
| This calendar's current day          | Returns the day of the clicked event.                                                | Date                                                                  |
| Current date range                   | Returns the range of the current calendar view (the start and end date of the view). | Date range                                                            |

### A calendar's day is clicked

Triggers when the user clicks on a specific day in the calendar element.

#### Data sources

| Data source                          | Description                                                                          | Data type                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| This calendar's current event        | Returns the currently selected event in the calendar element.                        | The data type is set in the element's properties.                     |
| This calendar's current day's events | Returns the event(s) of the currently selected day.                                  | Returned as a list. The data type is set in the element's properties. |
| This calendar's current day          | Returns the currently selected day.                                                  | Date                                                                  |
| Current date range                   | Returns the range of the current calendar view (the start and end date of the view). | Date range                                                            |

## Draggable elements

### A drop area has a group dropped on it

This event triggers when a draggable element is dropped into a drag/drop group. Only elements marked as droppable can trigger it.

#### Element

The element that is being dropped into.

#### Type of thing

If the workflow needs to reference a database entry, define its type here. When set, the dropped group uses that entry as its data source. If the type defined here doesn't match the type of content of the dropped group, the workflow won't run.

## Mouse & Keyboard Interactions

### Mouse is clicked down

Triggers when a mouse button is clicked.

#### Click side <a href="#click-side" id="click-side"></a>

This event can respond to the left, middle or right buttons on the mouse.

#### Prevent default <a href="#prevent-default" id="prevent-default"></a>

If this event is triggered by the right mouse button, there is the option to prevent the default right-click behavior, which usually brings up the browser’s / system’s right-click menu.

### User scrolls on a page

Triggers when a user scrolls on the page **using a mouse wheel**. This is explicitly not when a user manually move the page’s scrollbar up or down, but this means that this event can trigger on a mouse wheel scroll even on a page that’s not long enough to need a scrollbar.

#### Scroll direction <a href="#scroll-direction" id="scroll-direction"></a>

Choice of when the user scrolls up, down or in either direction

#### Trigger <a href="#trigger" id="trigger"></a>

This event can trigger either when the user begins their scroll or ends their scroll

#### Prevent default <a href="#prevent-default-1" id="prevent-default-1"></a>

If checked, the mouse wheel scroll will not actually scroll the page for the user, but will still run this workflow.

{% hint style="info" %}
**Tip:** If you use this action in conjunction with the mouse’s X / Y positions, it will get a bit confusing whether the X / Y refers to before or after the scroll, so consider using the “prevent default” toggle.
{% endhint %}

### User presses a key or a combination of keys

This event, found in the new events category “Interactions”, lets you create custom keyboard shortcuts for your apps. See below for which keyboard shortcuts are supported.

#### Keyboard shortcut

The combination of keys that when pressed, fires this workflow. Note that when you are focused on this field, it detects which key combination you are pressing, and you cannot manually edit the combo it detects.

These combos are supported:

* A shortcut can have multiple of these keys together (often called modifier keys): Shift, Control, Option (Mac) / Alt (Windows), and Command (Mac) / Windows (Windows)
* A shortcut can only ever have at most 1 of these keys: letters on an English keyboard, digits, tab, caps lock, a directional arrow, backspace, escape, page down / page up, F1-10, F12, + (via numpad), the symbols \` - = \[ ] \ ; ‘ , /
* These keys explicitly will not work: F11, Fn, Enter
* Any special modifier key not in the list above will probably not work
* Many keyboard shortcuts (especially ones with the Windows key) are reserved by the operating system and cannot be overwritten
* Non-English keyboards will have special characters that generally do not work with this feature

{% hint style="warning" %}
**Note:** If you want to rely on a custom shortcut key, be sure to test it out on both Mac and Windows (and other operating systems if you expect your users to use them). Generally speaking, Option on a Mac corresponds to Alt on Windows, and Command on a Mac corresponds to Windows on Windows. But, there can be exceptions to this rule, and the two operating systems definitely have slightly different sets of reserved shortcuts.

\
If in doubt, your best bet is to test any potential shortcut out on different operating systems.
{% endhint %}

### Disable when input is focused

Lets you choose whether this custom keyboard shortcut should work when the user is focused in an input field

### An element is hovered

Triggers when the user’s mouse begins to hover over a specified element.

#### Element

The element that triggers the workflow.

### An element stops being hovered

Triggers when the user’s mouse stops hovering over a specified element.

#### Element

The element that triggers the workflow.

## Rich text editor

### A Rich Text Input value changes

Triggers when the content of a rich text input element changes.

### Properties

#### Element

Defines which rich text input element triggers the event.

## Slidebar menu

### A slidebar menu's option is clicked

Triggers when the user clicks on a menu option in a slidebar menu element.

## Tinder pile

### A Tinder Pile's card is swiped right

Triggers when the user swipes right on a Tinder pile's card.

### A Tinder Pile's card is swiped left

Triggers when the user swipes left on a Tinder pile's card.
