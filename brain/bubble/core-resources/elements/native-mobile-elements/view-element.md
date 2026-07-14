# View element
> Source: https://manual.bubble.io/core-resources/elements/native-mobile-elements/view-element · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## **Definition**

Views are the base layer for designing content in a native mobile app. Unlike pages in a web app, views do not use URLs. You navigate between them using mobile-native navigation methods such as tabs, stacks, and modals.

## **Key Concepts**

* Views act as screens within your app.
* You can manage views from the pages dropdown in the editor.
* Navigation between views is handled through actions and the tab bar, not through URL changes.

## **View Types**

You can assign a type to each view. This defines how the view behaves:

<table><thead><tr><th width="202.3740234375">View Type</th><th>Description</th></tr></thead><tbody><tr><td>Scrollable</td><td>The default view type. Allows vertical scrolling.</td></tr><tr><td>Non-scrollable</td><td>A fixed-height view. Content is limited to the screen size.</td></tr><tr><td>Vertical list</td><td>A scrollable list of repeating content.</td></tr><tr><td>Section list</td><td>A grouped list (e.g., contacts grouped by first letter).</td></tr></tbody></table>

Switching to or from a list-type view will temporarily remove the existing elements on the view. These will return if you switch back.

## **View Properties**

Each view can hold custom properties that are accessible from workflows.

<table><thead><tr><th width="228.228515625">Property Type</th><th>Use</th></tr></thead><tbody><tr><td>Dynamic value</td><td>Can hold any data type or thing.</td></tr><tr><td>Color picker</td><td>Accepts hex codes or saved color variables.</td></tr><tr><td>Checkbox</td><td>A yes/no value (true/false).</td></tr></tbody></table>

Use the *Set current view's property* action to assign values to a view’s property.

### **Appearance Settings**

You can control how views render visually on different devices.

* **Show top app bar**: Adds a navigation header at the top.
* **Show tab bar**: Adds a bottom navigation bar (automatically enabled when the view is a tab item).
* **Safe area**: Adds padding to avoid device notches and screen edges.
* **Show status bar**: Toggles the device's native status bar (time, battery, etc.).
* **Include as tab item**: Adds this view to the tab bar for navigation.

### **Tab Bar Behavior**

When a view is included as a tab item, it becomes part of the global tab navigation system. Each tab item must reference a unique view.

## **Adding and Editing Views**

* Create and manage views from the [app interface manager](#user-content-fn-1)[^1].
* Set a view as a tab item using the checkbox in the view’s settings.
* You can add new tab items via the tab bar editor and link them to existing or new views.

## **Best Practices**

* Views should represent logical screens (e.g., Home, Profile, Settings).
* Use stack navigation (Go to view) for contextual screens (e.g., opening a playlist).
* Keep the tab bar visible to indicate navigation context, even when not on a tab item.

[^1]: The *app interface manager* is where you manage your apps pages and views.

    Article section: [App interface manager](/help-guides/getting-started/navigating-the-bubble-editor/tools/key-features#app-interface-manager)
