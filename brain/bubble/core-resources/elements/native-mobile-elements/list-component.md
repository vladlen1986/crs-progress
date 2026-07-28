# List component
> Source: https://manual.bubble.io/core-resources/elements/native-mobile-elements/list-component · Captured: 2026-07-28 (verbatim from manual.bubble.io llms-full.txt)

## **Vertical list**

A vertical list displays a list of repeating items in a vertical stack. It uses a single reusable list item template, and is best for longer scrolling screens like task lists or news feeds.

**Best for**: General-purpose vertical content (e.g., task lists, user comments).\
**View type**: Vertical list\
**Properties**:

* Separator width, color, inset
* Gap between list items
* Option to reverse scroll direction
* [Snap mode](https://manual.bubble.io/core-resources/bubble-elements/element-properties/native-mobile-element-properties/the-view-element/vertical-list#snapping) (none, item, or page), with snap alignment and deceleration options

## **Section list**

A section list lets you group list items by a field (e.g., category or date). It includes two templates: a section header and list item.

**Best for**: Lists with grouped content (e.g., contacts grouped by letter)\
**View type**: Section list\
**Properties**:

* Separator width, color, inset
* Gap between items
* Group by: field used for grouping

## **Horizontal list**

A horizontal-scrolling list that shows items side by side. Cannot be used as a full view, only as an element inside another view.

**Best for**: Scrolling media like images, tags, or categories\
**Usage**: Can be used on non-list views or inside vertical/section lists\
**Properties**:

* Gap between items (px)
* [Snap mode](https://manual.bubble.io/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/horizontal-list-element-mobile#snapping) (none, item, or page), with snap alignment and deceleration options

## **Short list**

Loads all list data at once (no lazy loading), making it better for short or frequently reused lists.

**Best for**: Displaying small lists (e.g., category filters)\
**Key considerations**:

* Can be used multiple times per view
* Avoid using for large datasets

## **Selectable list**

An input element that lets users pick one or more values from a list. Comes with built-in states for validation, styling, and behavior. Loads all list data at once (no lazy loading), making it better for short or frequently reused lists.

**Best for**: Filters, selection menus, multi-choice inputs\
**Behavior**:

* Single or multi-select
* Optional selection limits
* Optional required setting for validation\
  **Workflow actions**:
* Set value, select/unselect all, clear list, scroll to entry\
  **Properties**:
* List of items
* Selected/unselected items
* Min/max/exact number of selections

### **List item swipe actions**

Enable swipe gestures to trigger workflows from list items.

**Best for**: Mobile-native UX (e.g., swipe to delete/complete)\
**Supported in**: Vertical and section lists\
**Features**:

* Leading and trailing swipe actions
* Optional full-swipe to trigger
* Built-in animations
* Up to 3 actions per side

### **Customizable**:

* Icon, label, background, font, alignment, and padding

## **List headers and footers**

Vertical and section lists support optional header and footer content areas for non-list elements like titles or descriptions.

**How to use**:

* Click the "+" icons at the top or bottom of the list on the canvas
* Add standard visual elements (no lists inside lists)

**Note**: These areas do not have independent layout or styling controls.
