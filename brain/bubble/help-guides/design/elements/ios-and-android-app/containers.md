# Containers
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/containers · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Lists

Mobile lists differ from web lists in a few important ways. In mobile apps, lists should never be placed within a scrolling container. Instead, a mobile list should expand to fit its content, allowing users to scroll through the screen itself rather than a confined container.

Similarly, list pagination is a web pattern that doesn't translate well to mobile and should be avoided. To support this, Vertical and Section lists are their own view types, and lists cannot be nested within each other. The only exception is with Horizontal lists, which can be placed inside a vertical or section list or on any non-list view, as they scroll in a different direction (similar to how Netflix displays content).

#### Multiple lists

At this time, you cannot add multiple lists with different data sources to the same List view. However, Section lists offer a way to group list items by a specific property, essentially creating a list within a list. If having multiple lists on a single view is important for your use case, feel free to send us a feature request.

#### List Header / Footer content areas

Since a List view can only accept List items as content, it provides header and footer content areas to let you add additional visual elements to your view. For instance, you might want to display a title or description above your list. These content areas can be enabled by clicking the *plus* buttons that appear at the top and bottom of the list element on the canvas.

Doing so adds empty content areas where you can drop any visual elements (except for lists). Keep in mind that these areas don’t have their own layout or visual properties and cannot be selected independently on the canvas or within the elements tree.

<figure><img src="/files/mHzDyUPl07YlX4BuAdQ5" alt="" width="563"><figcaption><p>You can add visual elements on top of your list view...</p></figcaption></figure>

<figure><img src="/files/pyHp8bO3X7cZShMybA0b" alt="" width="563"><figcaption><p>... or underneath it.</p></figcaption></figure>

## Vertical list

Vertical lists display a set of repeating items stacked vertically, much like a repeating group in the web editor. Each vertical list includes a list item cell template that replicates based on the data provided, ensuring a consistent layout for every item in the list.

#### **Properties**

* Separators
* Separator inset (px)
* Separator width
* Separator color
* List item gap spacing
* Gap spacing (px)
* Reverse scroll\
  Reverse scroll reverts the scrolling direction, which is the expected behavior in certain scenarios such as in chat conversations.

#### Section list

Section lists display a set of repeating items that are grouped by a specific characteristic or property. Each section list includes two cell templates: the Section Header and the List Item. The Section Header allows you to style the repeating header separately from the list items and, most importantly, set the property used to group the items. The List Item functions similarly to the Vertical List, but the individual list items will be automatically grouped based on the property defined in the Section Header's Grouping setting.

<figure><img src="/files/cScFpkLL2Y8TvrLl5rCr" alt=""><figcaption><p>In this example, we have taken a list of users and created sections based on their age (a numerical value).</p></figcaption></figure>

In the example above, we have taken a list of Users, each containing the field *Age* (number). After selecting Section List as our view type, we'll set the content type of our section list to Users and perform a search for all Users.

Next, we'll open the section header property editor to set the Grouping. Since we want to group by the user's age, we'll set the *Group by* to *Age*.

{% hint style="info" %}
Any property within the data type can be used for grouping, **except** for fields that **reference another data type**.
{% endhint %}

**Properties**

* Separators
* Separator inset (px)
* Separator width
* Separator color
* List item gap spacing
* Gap spacing (px)
* Group by (Section header)

## Horizontal List

Used to display a list of repeating items that scrolls horizontally. The horizontal list cannot be added directly to a List view; it can only be nested within another list on a List view or added to a non-list view.

#### **Properties**

* List item gap spacing
  * Toggles the ability to add gap spacing between list items
* Item gap (px)
  * Defines the actual pixel value of the gap spacing between list items

#### List item swipe actions

List items in vertical and section lists have the option to include swipe actions, allowing users to interact with the list by swiping an item to trigger certain actions.

For example, let's say you have a task management app where users can add tasks to a list. Using swipe actions, you can allow the users to swipe left or right to complete or detele a task. This interaction provides a seamless and intuitive way for users to manage items directly within the list without adding extra elements that clutter the user interface.

<figure><img src="/files/DqlJcVc95RrL0q5w0FVU" alt="" width="375"><figcaption><p>List item swipe actions lets users interact with items in a list without adding additional elements to the user interface.</p></figcaption></figure>

Swipe actions can be customized with leading (left side) and trailing (right side) actions, and you can also set it up so that a full swipe automatically triggers the action. You can design swipe actions by selecting the relevant frame that appears on either side of the canvas, eliminating the need to hide or unhide layers. Each list item can have up to three leading swipe actions and three trailing swipe actions for a range of interactions.

One advantage of swipe actions is that they come with default animations and swipe behavior built in, making setup quick and easy. You only need to focus on customizing the look of the swipe action and deciding which workflow it triggers when swiped or tapped. To maintain a clean, consistent design, layout controls are intentionally limited to prevent swipe actions from deviating from established design best practices.

#### **Properties**

* Button type - icon, label, icon and label
* Icon and label fields
* Icon size
* Icon color
* Font controls (for label)
* Background style
* Container alignment
* Padding

## **Short List**

{% hint style="warning" %}
**Note on performance:** Short lists load the entire data source at once, rather than using lazy loading. This makes them ideal for shorter lists, while longer lists may impact performance.
{% endhint %}

A *Short list* is a container for displaying a fixed list of data items. Unlike list views, short lists load all data at once rather than lazy-loading, which makes them best suited for small to medium lists where performance remains smooth.

Key considerations for short lists:

* Supports multiple lists per view (unlike list view).
* Loads all data at once.
* Works well for displaying small sets of frequently used information.

## Sheets

Sheets are similar to modals in that they provide a focused user experience, but they are best used when the immediate context of the view behind them is still relevant. For instance, Google Maps uses a sheet to display search results while allowing users to view the map in the background without switching screens. Unlike navigation elements, sheets are added directly to a view, functioning much like popups in Bubble’s web editor.

Sheets are opened using the *Show element* action.

<figure><img src="/files/yUPqdXFG2eqocnw7Jrl3" alt="" width="285"><figcaption></figcaption></figure>

**Properties**

* Swipe to close
  * Toggles the ability to swipe down from the top to close the sheet. Disable this if you’d rather have the user dismiss a sheet with a button.
* Block interaction behind sheet
  * Toggles the ability for a user to interact with the base screen when a sheet is open, similar to the behabior of popups in a web app.
* Backdrop color
  * Sets a color that is applied over the base screen when the sheet is open, similar to the behavior of popups in a web app.
* Backdrop blur
  * Sets a blurred overlay over the base screen when the sheet is open, similar to the behavior of popups in a web app.
* Drag handle
  * Toggles the visibility of the horizontal drag bar at the top of a sheet. This does not impact the functionality of the sheet.
* Snap points
  * Snap points let you define the various sizes a sheet can be. The sheet will have a default snap point, which is the size it opens to, and the user can then swipe up or down to move the sheet between the different snap points as needed. This feature is useful if the sheet contains a lot of content or if you want to allow the user to partially move the sheet out of the way to interact with the content behind it.

## Floating Group

Floating groups are elements that can sit above other content in a view and remain fixed in place, even while the user scrolls through the rest of the page. They are especially useful for creating toolbars, banners, or any persistent elements that should always stay visible, regardless of the user's scrolling actions.

{% hint style="info" %}
Floating groups will position themselves just below the top app bar when aligned to the top or just above the tab bar when aligned to the bottom, if either of these elements are present on the view.
{% endhint %}

Floating groups on mobile share most of the same controls as they do on the web, with a few new options that are specific to mobile use cases, highlighted below.

**Properties**

* Vertically float relative to
  * Top: Aligns to the top of the screen
  * Bottom: Aligns to the bottom of the screen
  * Both: Aligns to the center of the screen
  * Nothing: Defaults to the top
* Horizontally float relative to
  * Left: Aligns to the left of the screen
  * Right: Aligns to the right of the screen
  * Center: Aligns to the center of the screen
* Safe Area Behavior
  * Ignore: The safe area will not impact the position of the floating group on the screen
  * Apply to container: Position the floating group after the safe area
  * Apply to children: The container will ignore the safe arena but the child content in the floating group will be offset by the safe area
* Move with keyboard
  * Checked: When selected, the floating group will shift upward to accommodate the keyboard when it appears.
  * Unchecked: The floating group will stay in its fixed position and will be covered by the keyboard if it appears in the same area.
* Floating z-index: Determines whether the floating group should hover above or below other elements, including the view itself. Note that adding a background color to the view will block the floating group.
