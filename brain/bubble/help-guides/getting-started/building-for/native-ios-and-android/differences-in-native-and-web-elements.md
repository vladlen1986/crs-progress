# Differences in native and web elements
> Source: https://manual.bubble.io/help-guides/getting-started/building-for.../native-ios-and-android/differences-in-native-and-web-elements · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

## Views

#### Views compared to pages

Having built web apps with Bubble, you’re likely familiar with the concept of pages: each page is a distinct entity, and everything you design and deploy is contained within these individual pages, with each loading as a separate resource.

Views work a bit differently. While they still act as the top parent element for all nested content, they are not standalone resources that require reloading when switching between them. Instead, views are part of a unified structure within your app, allowing users to navigate between them seamlessly without the need for reloading each time.

#### Views compared to groups

Again, if you’re familiar with the Bubble web app tools, especially if you have experience building single-page applications, you’re likely accustomed to setting up groups and showing or hiding them (often by collapsing their height/width) to let users seamlessly navigate different sections within a single page.

Views share similarities with this approach, but they are more closely aligned with mobile app development principles. Rather than relying on groups within a single page, views represent distinct sections or screens of your app while still being part of a fluid and cohesive navigation flow. This structure makes views a more natural fit for mobile app patterns like stack navigation, tab navigation, and swipe gestures, offering a smoother and more intuitive user experience on mobile devices.

Lastly, collapsible groups are available in the native mobile app editor as well, meaning the two are not in any way mutually exclusive, but used for different purposes.

### Navigation types

Views differ from pages and groups in that the action used to navigate to a new view determines how that view behaves. In other words, the settings in the *Go to view* action influence how the user interacts with and navigates within the view.

* **Stack navigation** follows a hierarchy where views are layered on top of one another as the user navigates deeper into the app, much like individual cards being stacked in a deck.\
  \
  Each new view is "pushed" onto the stack, and users can "pop" back to previous views using a back button, either physical or on-screen. This is often used in scenarios where users navigate into more detailed content, such as moving from a list of items to a detailed view of a specific item. The key feature is that stack navigation maintains the history of previous views, allowing for smooth back-and-forth navigation.<br>
* **Modal views** are used for temporary, self-contained interactions that are separate from the primary navigation flow. When a modal is opened, it typically slides up from the bottom of the screen or appears over the existing content, blocking interaction with the background until it is dismissed.\
  \
  Modals are commonly used for actions like filling out forms, confirming choices, or displaying brief contextual information. Unlike stack navigation, modals don’t contribute to the app’s main navigation history and are usually dismissed rather than navigated away from.

## Sheets

### Sheets compared to floating groups

When building a Bubble web app, you may have used floating groups as a way to place content at the top, bottom or side of the screen, often on top of other elements. Sheets offer similar functionality, but with some key differences:

* **Positioning and behavior:** Sheets slide in and out as temporary overlays, while floating groups are static and anchored to a specific part of the screen.
* **Use cases:** Sheets are used to display temporary or contextual information in a way that’s anchored to mobile design principles, while floating groups are better suited for persistent elements like navigation menus, headers, or footers that remain in view as the user interacts with the page.
* **Interaction:** Sheets usually involve a dynamic transition (e.g., sliding up/down). Floating groups can be set up to imitate this behavior, but their default behavior is to be fixed in place without such transitions<br>

### Sheets compared to popups

Sheets also share some similarities with popups (though popups are not available in the native mobile app editor). However, sheets shouldn’t be viewed as a direct replacement. As mentioned earlier, sheets can cover part or all of the screen and can blur the content underneath, much like popups. In this way, you can think of sheets as a more mobile-optimized version of popups that aligns better with design patterns on iOS and Android. Let’s look at some of the differences between the two:

* **Positioning and behavior:** Popups typically appear centered on the screen and overlay the entire page, dimming the background, whereas sheets slide in from the bottom and occupy a portion of the screen while keeping the rest of the content visible.
* **Use cases:** Popups are ideal for grabbing the user’s full attention, such as displaying alerts, confirmation dialogs, or forms. Sheets, on the other hand, are better suited for displaying contextual information or options without fully interrupting the user’s flow, staying anchored to the bottom of the screen in a more mobile-friendly way.
* **Interaction:** Popups usually fade in or appear with a custom animation, often requiring the user to click outside the popup or press a button to close it. Sheets involve a sliding transition (e.g., sliding up/down) and can often be swiped away by the user, mimicking native mobile app behavior.

Sheets are often used for displaying contextual data and actions when you don’t want to change views or block the entire screen. For the user, a sheet appears as a layer on top of the content they’re currently viewing, allowing them to interact with it while keeping the underlying content accessible. The ability to slide the sheet to adjust its size or hide it mimics the feel of a real-world object.

### Lists

Lists in the native mobile app editor are a way to show lists or records, comparable to repeating groups in a Bubble web app. Still, the two serve some key differences.<br>

* **Element versus property:** In a Bubble web app, lists are typically managed by elements like repeating groups or tables. In the native mobile app editor, however, lists can be a property of an element, such as a view or sheet. This means a single element can hold either a single item or a list, depending on its settings, whereas in the web editor, lists are usually managed by dedicated elements like repeating groups or tables..\
  \
  Vertical lists can also be added as an element, similarly to setting up a vertically-scrolling repeating group in the web app editor.<br>
* **List behavior:** lists can also be automatically divided into groupings. The mechanics differ from using a nested repeating group, and behaves more like like the [*Group by*](#user-content-fn-1)[^1] operator (although the two are not exactly the same).

### Dropdowns:

While dropdowns (select menus) may seem like an obvious choice for presenting multiple options on web apps, they often create a poor user experience on mobile apps. Here's why:

1. **Hidden options:** Dropdowns hide available choices until tapped, making it difficult for users to see all options at a glance.
2. **Multi-step process:** Selecting an option requires multiple actions: tapping to open, scrolling to find the desired option, selecting it, and closing the dropdown.
3. **Scrolling difficulties:** Long lists (e.g., country selectors) can be cumbersome to navigate, especially without keyboard search on mobile.
4. **Small tap targets:** Dropdown areas and individual options can be small, leading to accidental selections.
5. **Lack of context:** Users can't easily compare options or see relationships between choices.

#### Recommended alternatives

Instead of dropdowns, consider these more user-friendly UI patterns. Opting for these alternatives can enhance the mobile experience by reducing taps and lowering cognitive load, making navigation more intuitive and efficient for your users.

1. **Switches:** For binary (on/off) choices.
2. **Radio buttons or segmented controls:** For a small number of mutually exclusive options (2-5).
3. **Steppers:** For incrementing/decrementing numeric values.
4. **Sliders:** For selecting from a range of values.
5. **Auto-complete Text Fields:** For large sets of options where users can type to filter (e.g., country selection).
6. **Bottom sheets or action sheets:** For presenting a list of options in a larger, more scannable format.
7. **Buttons:** For a small set of distinct actions.
8. **Prioritized lists:** Show the most common options upfront, with an "Other" option to access less frequent choices.

[^1]: Group by groups a list of items into chunks of related entries, and computes summaries of each group.\
    \
    Reference: [Operators and comparisons](/core-resources/data/operations-and-comparisons) | [...group by](/core-resources/data/operations-and-comparisons#group-by)
