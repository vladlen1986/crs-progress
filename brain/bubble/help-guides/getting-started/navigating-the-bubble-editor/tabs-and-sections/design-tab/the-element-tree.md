# The element tree
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-element-tree · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

The element tree is a panel in the Bubble editor that shows every [element](/help-guides/design/elements) on the current [page](/help-guides/design/elements/web-app/the-page) or [view](/help-guides/design/elements/ios-and-android-app/the-view) in a hierarchical view. It's one of the most useful tools for navigating, understanding, and organizing a Bubble app, especially as designs grow more complex.

The tree gives you a bird's-eye view of the entire hierarchy, from the top-level page or view down to the smallest nested elements. Selecting an element in the tree also selects it on the canvas, making it easy to jump between structural navigation and hands-on design work.

## What the element tree shows

Every element you've added to the current page or view appears in the tree, nested according to its position in the hierarchy. Container elements can be expanded and collapsed to show or hide their children, letting you focus on specific sections of the design.

<figure><img src="/files/VCqxOK0Yf6VZ2xF8PAje" alt="Bubble&#x27;s element tree."><figcaption><p>The element tree gives you a complete overview of all the elements on the page or view.</p></figcaption></figure>

The tree updates in real time. As you add, move, delete, or rename elements, the tree reflects those changes immediately.

## Layers

Elements in the tree are organized into distinct layers, based on how they interact with the page or view. Each layer serves a different purpose and appears in its own section.

<figure><img src="/files/sagbDa3XzyxN0OiqKa14" alt=""><figcaption></figcaption></figure>

### Overlays

The *Overlays* layer holds elements that appear on top of the main content, such as popups, floating groups, and sheets. These elements sit above the main layout and are typically shown and hidden through workflows.

Grouping overlays into their own section keeps them separate from the main design, so they're easy to find and manage without cluttering the rest of the tree.

### Navigation

On native mobile, the *Navigation* layer holds the app bar and tab bar. These are pseudo child elements that appear when enabled in the view's properties. They handle the standard navigation patterns of the app and are edited from within the view.

### Layers

The *Layers* section holds the main content of the page or view: the elements users interact with as part of the normal flow. Groups, buttons, inputs, lists, and other elements all live here.

Organizing elements into these layers makes it easier to understand a page or view at a glance. The main content is separate from the overlays and navigation, and each part can be edited without visually competing with the others.

## Element tree modes

The element tree has two modes. You can either show all elements on the page or view in a tree view, with parents and children, or filter it to show only elements that are hidden on page load.

<figure><img src="/files/ENziVCDWBm9yQNk7JxiL" alt=""><figcaption></figcaption></figure>

## Working with the element tree

The element tree is more than just a display. It's an interactive tool for organizing and navigating your design.

### Creating elements

You can create an element by dragging it from the element palette directly into the element tree.

### Selecting elements

Click any element in the tree to select it. The corresponding element on the canvas is highlighted, and its properties open in the property editor. This is often the fastest way to select an element that's hidden behind other elements, deep inside a container, or otherwise hard to reach on the canvas.

### Rearranging elements

You can drag and drop elements in the tree to move them between containers or reorder them within a container. This is especially useful for restructuring a design precisely. which can be more difficult on the design canvas.

<figure><img src="/files/L5o2cRM0XQmFgUOCWM4I" alt="" width="269"><figcaption></figcaption></figure>

### Expanding and collapsing containers

Container elements have arrows next to their names in the tree. Click them to expand or collapse the container's children. Collapsing containers you're not currently working with helps keep the tree focused and easier to scan.

### Renaming elements

Rename elements directly in the tree by double-clicking their name. Clear, descriptive names make the tree easier to navigate as your design grows.

### Searching

The search field at the top of the tree lets you filter elements by name. This is useful for large pages with many elements, or for quickly finding a specific element in a deeply nested design. Click the X symbol to clear the filter.

{% hint style="info" %}
**Advanced search:** For a more advanced search, you can also use the [search tool](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-search-tool).
{% endhint %}

<figure><img src="/files/RH0Qu1VCxUMHAtI1CsJa" alt=""><figcaption><p>You can quickly find the elements you're looking for by using the search bar at the top of the element tree.</p></figcaption></figure>

### Locking an element

You can lock an element by hovering it in the element tree and clicking on the lock symbol. When locked, the element can't be dragged on the canvas. The element can still be dragged in the element tree.

<figure><img src="/files/BGcYVHzinYwmtM8mAH10" alt=""><figcaption></figcaption></figure>

### Visibility

The tree includes visual cues for each element's visibility state. Hover the element and inspect or click the eye symbol to toggle visibility.

{% hint style="info" %}
**Visibility:** Toggling visibility in the element tree affects the editor only. It doesn't change how elements appear in your live app.
{% endhint %}

<figure><img src="/files/dn1wrYGXqV6rQCMOITog" alt=""><figcaption></figcaption></figure>

## Tips for keeping the tree readable

* **Name your containers.** A tree full of *Group A*, *Group B*, and *Group C* is much harder to navigate than one with names like *Group header*, *Group hero section*, and *Group footer*.
* **Keep nesting deliberate.** Deep hierarchies can be hard to reason about. Use nesting when it serves the layout, not by default.
* **Collapse what you're not working on.** Long trees benefit from collapsing containers you don't need to see. It keeps the visible tree focused on the current task.
* **Take advantage of the layer separation.** Overlays and navigation elements stay separate from the main content, which keeps the tree tidy. Design your app to lean into that separation.
* **Use search on large pages.** As your app grows, the search field becomes one of the most valuable ways to jump directly to the element you need.

## Why the element tree matters

The element tree is often described as a navigation tool, but its real value goes deeper. It gives you a clear model of how your design is structured, which helps you:

* **Understand data flow.** Seeing the parent-child relationships makes it easier to plan how data moves through containers and their children.
* **Diagnose layout issues.** When something doesn't look right on the canvas, checking the tree often reveals a container that's positioned unexpectedly or a nesting issue that's hard to spot visually.
* **Refactor confidently.** Moving elements around, restructuring containers, and converting groups into reusable elements all become easier when you can see the full structure at a glance.
* **Communicate with collaborators.** A well-organized tree makes your app easier for teammates to understand, especially when they're navigating parts of the design they didn't build themselves.

The element tree is one of those tools you learn to rely on more the more you build. Investing time in keeping it clean and organized pays off across every part of your app.
