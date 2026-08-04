# The element hierarchy
> Source: https://manual.bubble.io/help-guides/design/elements/the-element-hierarchy · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

This section covers the logic of the hierarchy that is structured on your page as you add elements to it.

## The element hierarchy

Every page or view in a Bubble app is made up of elements arranged in a hierarchical structure. This hierarchy shapes how elements are organized, how they inherit data, and how they respond to layout changes.

## Layers in the element tree

The [element tree](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-element-tree) in a native mobile app organizes elements into distinct layers, based on how they interact with the view. Each layer serves a different purpose and appears in its own section of the tree.

<figure><img src="/files/sagbDa3XzyxN0OiqKa14" alt="Bubble&#x27;s element tree with element tree layers highlighted."><figcaption><p>The hierarchy on a page or view is divided into layers. The page or view is always at the top.</p></figcaption></figure>

### Overlays

The *Overlays* layer holds elements that appear on top of the view's content, such as sheets (mobile) and popups (web). Elements in this layer float above the main layout and are typically shown and hidden through workflow actions.

### Navigation (mobile)

The *Navigation* layer holds the [app bar and tab bar](/help-guides/design/elements/ios-and-android-app/the-view#view-appearance-settings). These are pseudo child elements that appear when enabled in the [view's](/help-guides/design/elements/ios-and-android-app/the-view) properties. They handle the standard navigation patterns of the app and are edited from within the view. This layer is only visible when you're editing a mobile app.

### Layers

The *Layers* section holds the main content of the view: the elements users interact with as part of the normal flow. Groups, buttons, inputs, lists, and other elements all belong here.

Organizing elements into these layers makes it easier to understand a view at a glance. The main content is separate from the overlays and navigation, and each part can be edited without visually competing with the others.

## The three types of components

A Bubble page or view is built from three types of components. Each plays a distinct role in how the app looks and behaves.

### The page or view

The page (on web) or view (on native mobile) is the top-level component. Every element you add exist inside it. The page/view sits at the very top of the hierarchy, and everything else on the screen is a descendant of it.

The page/view also holds properties that affect the whole screen, such as background color, layout mode, and its data type. In many ways, the page/view is a special kind of container: the one container every other element ultimately belongs to.

### Containers

Containers group elements together and control how they behave as a unit. They act as boxes that hold other elements, forming the branches of the hierarchy.

Containers can:

* Hold visual and interactive elements as children.
* Contain other containers, creating deeper levels of nesting.
* Apply layout rules that affect how their children are arranged.
* Hold a data source that their children can reference.
* Be styled or left transparent, depending on the design.

Common container types include groups, repeating groups, popups, floating groups, sheets, and reusable elements. Each behaves differently, but all follow the same core principle: they contain other elements.

**Article:** [Web containers](/help-guides/design/elements/web-app/containers)\
**Article:** [Mobile containers](/help-guides/design/elements/ios-and-android-app/containers)

### Elements

Elements are the actual content users see and interact with. These are the leaves of the hierarchy: the specific pieces that make up your app's interface.

Elements include:

* **Visual elements** like text, images, icons, videos, and shapes.
* **Input elements** like text fields, checkboxes, dropdowns, and file uploaders.
* **Interactive elements** like buttons, links, and clickable cards.

Elements can trigger workflows, display data, and respond to user input. They can also be styled, hidden, animated, or made conditional based on the state of the app.

**Article:** [Web app elements](/help-guides/design/elements/web-app)\
**Article:** [Mobile app elements](/help-guides/design/elements/ios-and-android-app)

## How the hierarchy works

The way these three components are organized and nested defines the structure of your page or view. Every element has a parent, and every container can have children. This creates a tree-like structure that flows from the page or view down to the individual elements users interact with.

Here's a simplified example of a page hierarchy:

<figure><img src="/files/Emo25jup9urlf7TtebOQ" alt=""><figcaption></figcaption></figure>

Each level of indentation represents a parent-child relationship. Group 1 and Group 2 are children of the page, and the elements to the right are child elements of them.

The hiearchy works in the same way for both web and mobile apps.

## Why the hierarchy matters

The hierarchy isn't just an organizational tool. It has real, practical implications for how your app looks and behaves.

### Layout and responsive design

Container layout rules cascade to their children. A container with a column layout stacks its children vertically. A container with a row layout arranges them side by side. Changing a container's layout affects every child inside it.

This is what makes the hierarchy essential for responsive design. By nesting containers with different layout modes, you can build complex layouts that adapt gracefully to different screen sizes.

### Data inheritance

Containers can hold data, and their children can reference that data directly. For example, if a group holds a *User*, any element inside it can reference `Parent group's User's name` without having to look the user up again.

This "data flows down" pattern is one of the most powerful features of the hierarchy. It lets you set data once at a high level and use it throughout everything nested inside.

### Styling and visibility

Styling and visibility often follow the hierarchy. Hiding a container hides everything inside it. Applying an opacity change or a transform can affect a whole branch of the tree at once. This makes it easy to control large sections of the interface as single units.

### Workflows

Workflows can reference parent groups, sibling elements, and children, all through the hierarchy. Knowing how elements are nested helps you understand which references are available where.

## Pseudo child elements

Some elements can create *pseudo child elements* automatically as part of their configuration. These are elements that appear in the hierarchy without being added manually. They're generated by the parent element based on how it's set up.

Examples include:

* **The app bar and tab bar**, added as pseudo child elements of a view when enabled through the view's properties.
* **Section list and vertical list content**, generated inside a view or a sheet when the *View type* is set to a list-based option.
* **Horizontal list content**, added when a horizontal list is included in a view or sheet.

Pseudo child elements behave like any other element in the hierarchy: they can be selected, styled, given workflows, and referenced in dynamic expressions. What sets them apart is that they can't be created or deleted directly. They exist because of the parent's configuration, and they disappear if that configuration changes.

This pattern lets Bubble expose complex native components in a way that fits naturally into the element hierarchy, without forcing you to build each part from scratch.

## How the browser or app uses the hierarchy

In many ways, the hierarchy is how your browser or mobile app "sees" the page or view before rendering it. The browser reads the tree from top to bottom, uses the container layout rules to determine positioning, and then paints each element on the screen.

Bubble handles most of this automatically, but understanding the hierarchy helps you anticipate how your design will render, how changes will cascade, and how to structure things for the best results.

## Tips for working with the hierarchy

* **Use the element tree.** The element tree in the editor gives you a full view of the hierarchy on any page or view. It's the fastest way to understand how things are nested and to move elements between containers.
* **Group early.** As pages grow, having a clear grouping structure makes them easier to reason about. Even small components benefit from being placed inside a group that gives them a clear role in the layout.
* **Name your containers.** A hierarchy full of *Group A*, *Group B*, and *Group C* is much harder to maintain than one where each container has a meaningful name. Naming makes the structure self-documenting.
* **Don't over-nest.** Deep nesting can slow down rendering and make the layout harder to reason about. Use nesting deliberately, not by default.
* **Think in trees.** Every layout is a tree. When something doesn't look right, tracing the hierarchy is often the fastest way to find out why.
