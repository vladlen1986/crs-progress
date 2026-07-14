# Mouse & Keyboard Interactions
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/mouse-and-keyboard-interactions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
**This is a highly experimental feature** - we built this plugin with its collection of advanced features because we like to think about how we can push the frontiers of what Bubble apps are capable of. While we believe the functionality generally works at the time of launch, we explicitly do not guarantee that we will fix bugs or build follow-on features relating to this plugin. That means you should be cautious before over-relying on any of these features, but we hope you have fun and we’d love to hear about how you use these features! (For more information / discussion on this plugin, see the [forum announcement](https://forum.bubble.io/t/new-plugin-mouse-keyboard-interactions-highly-experimental/147595).)
{% endhint %}

The Mouse & Keyboard Interactions plugin contains a number of more advanced features that let you customize the keyboard and mouse interactions on your app.<br>

## Installation

You can find the Mouse & Keyboard Interactions plugin in the plugin gallery. It’s free to install and there are no configuration settings at the plugin level.

## Data source: Get mouse data

This is a new data source that’s an option in the data source dropdown in a dynamic statement. It gives access to the following operators:

### Get mouse data’s X position

This is the mouse’s X (horizontal) position on the page, where the left side of the window is 0.

{% hint style="warning" %}
**Note:** Using this in conditionals (”Only when...”) on certain workflow actions may not work; try using this as the conditional on the event instead.
{% endhint %}

### Get mouse data’s Y position

This is the mouse’s Y (vertical) position on the page, where the top of the window is 0.

{% hint style="warning" %}
**Note:** Using this in conditionals (”Only when...”) on certain workflow actions may not work; try using this as the conditional on the event instead.
{% endhint %}

### Get mouse data’s right mouse clicked down

This is a yes/no value that starts off “no” when the page is loaded and becomes “yes” when the right mouse button is clicked down. It should flip back to “no” when the right mouse click is released.

### Get mouse data’s right mouse click released

This is a yes/no value that starts off “no” when the page is loaded and becomes “yes” when the right mouse was clicked but has since been released. It stays “yes” until the next time the right mouse button is clicked down, at which point it flips to “no”.

{% hint style="warning" %}
**Note:** This will only work reliably if there’s a right-click workflow event on the page that has the default prevented.
{% endhint %}

### Get mouse data’s left mouse clicked down

This is a yes/no value that starts off “no” when the page is loaded and becomes “yes” when the left mouse button is clicked down. It should flip back to “no” when the left mouse click is released.

### Get mouse data’s left mouse click released

This is a yes/no value that starts off “no” when the page is loaded and becomes “yes” when the left mouse was clicked but has since been released. It stays “yes” until the next time the left mouse button is clicked down, at which point it flips to “no”.

## Event: Mouse is clicked down

This event, found in the new events category “Interactions”, fires when a mouse button is clicked.

### Click side

This event can respond to the left, middle or right buttons on the mouse.

### Prevent default

If this event is triggered by the right mouse button, there is the option to prevent the default right-click behavior, which usually brings up the browser’s / system’s right-click menu.

{% hint style="info" %}
**Tip:** Clicks on elements like buttons will also trigger this workflow
{% endhint %}

{% hint style="warning" %}
**Note:** If an event on the page is a right-click event that has the default prevented, then **all** right-clicks on the page will have their defaults prevents even if there’s an “Only when” statement on the event that isn’t satisfied.
{% endhint %}

{% hint style="warning" %}
**Note:** Clicks on an Apple Magic Mouse may not produce the desired effect.
{% endhint %}

## Event: User scrolls on page

This event, found in the new events category “Interactions”, fires when a user scrolls on the page **using a mouse wheel**. This is explicitly not when a user manually move the page’s scrollbar up or down, but this means that this event can trigger on a mouse wheel scroll even on a page that’s not long enough to need a scrollbar.

### Scroll direction

Choice of when the user scrolls up, down or in either direction

### Trigger

This event can trigger either when the user begins their scroll or ends their scroll

### Prevent default

If checked, the mouse wheel scroll will not actually scroll the page for the user, but will still run this workflow.

{% hint style="info" %}
**Tip:** If you use this action in conjunction with the mouse’s X / Y positions, it will get a bit confusing whether the X / Y refers to before or after the scroll, so consider using the “prevent default” toggle.
{% endhint %}

## An element is hovered

This event, found in the events category “Elements”, fires when the user’s mouse begins to hover over the specified element.

### Element

This is the element on the page that, when hovered, will initiate this workflow.

## An element stops being hovered

This event, found in the events category “Elements”, fires when the user’s mouse stops hovering over the specified element.

### Element

This is the element on the page that, when it stops being hovered, will initiate this workflow.

## User presses a key or combination of keys

This event, found in the new events category “Interactions”, lets you create custom keyboard shortcuts for your apps. See below for which keyboard shortcuts are supported.

### Keyboard shortcut

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

## Action: Reposition

This action, found in the “Plugins” category, will reposition an element on the page. This only works for popups, floating groups, alerts and group focuses.

{% hint style="warning" %}
**Note:** Be careful when creating workflows that have different actions that might trigger together when using these interaction features, because certain combinations can confuse Bubble. For example, if you have a workflow event for clicking on a button that shows an alert and a second workflow event for a left mouse click that repositions the same alert, in a situation where both workflows should fire, Bubble will not know which to fire first. One workaround is to combine the actions into just one workflow.
{% endhint %}

### X position

The X (horizontal) coordinate on the page that the top-left corner of the element will move to, where the left side of the window is 0.

### Y position

The Y (vertical) coordinate on the page that the top-left corner of the element will move to, where the top of the window is 0.
