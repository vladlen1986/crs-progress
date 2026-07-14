# Navigation elements
> Source: https://manual.bubble.io/core-resources/elements/native-mobile-elements/view-element/navigation-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The [*View* element](/core-resources/elements/native-mobile-elements/view-element) includes properties that let you add elements to your app which aren’t available in the standard element palette. In the element tree, these elements appear under the *Navigation* category.

## The top app bar

The top app bar is a fixed header that displays a page title and optional navigation or action icons. It stays visible while users scroll through content.

### View title

#### Title

By default, the view title displays the *view title property* of the current view. You can override this with static text or dynamic expressions as needed.

#### Title style

On iOS, the title is centered by default, but you can make it appear larger if needed. On Android, the title is left-aligned by default, but you can choose to center it instead.

#### Title color

Sets the color of the title text.

#### Show bottom border

Show or hide the bottom border of the top app bar.

### Back button

The Back button in the top app bar always navigates to the previous view in your app’s navigation stack. On iOS, this behavior is tightly integrated with hierarchical navigation, stepping back through views in the order they were presented. On Android, the back button behaves more like the system back button, dismissing overlays, dialogs, or navigating back through views, depending on what is active.

#### Override back button label

The label of the back button will be the View Title of the previous view (not the top app bar title). If there is no view title set on the previous view, the label will be "back". You can override the label with the *override back button label* setting.

### Leading/trailing buttons

You can add *leading* and *trailing* buttons to the top app bar to include navigation or action icons. Leading buttons appear on the left side (before the title), while trailing buttons appear on the right side (after the title). You can set up these buttons just like regular [buttons](/core-resources/elements/visual-elements#button), using a label, an icon, or both, and link them to workflows.

## The status bar

The status bar is a system-level area at the top of the screen that shows device information like time, battery level, and network status. It sits above the top app bar but can be hidden on both iOS and Android to make the app full screen, removing system info like time or battery.

## The tab bar

The tab bar is a fixed navigation element at the bottom of the screen that lets users quickly switch between different [views](/core-resources/elements/native-mobile-elements/view-element) in your app. Supports multiple tabs, each linked to a target view, and highlights the active tab.

### Tab item

Tab items are added to the tab bar through the properties of each individual [view](/core-resources/elements/native-mobile-elements/view-element). To include a view as a tab item, open its property editor and check the *Include as tab item* box. Once added, the tab item becomes selectable in the editor and the element tree, where you can adjust its properties and apply conditions.
