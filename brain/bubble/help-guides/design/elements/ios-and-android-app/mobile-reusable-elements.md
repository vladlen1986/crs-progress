# Reusable element (mobile)
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/mobile-reusable-elements · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

Reusable elements are components you build once and use across your app. They function like custom components, letting you package a design and its behavior into a single unit that you can drop anywhere it's needed.

Because updates to a reusable element apply automatically to every instance of it in your app, they're a powerful tool for keeping your design consistent, avoiding duplication, and making your app faster to build and maintain.

## What reusable elements do

A reusable component is a standalone component you can place on any view in your app.

Reusable elements have three main advantages:

1. **Consistency.** Every instance shares the same structure and design, so updates apply everywhere at once.
2. **Efficiency.** You build the component once instead of rebuilding it on every view.
3. **Flexibility.** Instances can be customized through parameters, letting each one adapt to the context it's used in.

Common examples include headers, app bar sections, cards, form components, and shared media modules.

### Reusable elements for web and mobile

Reusable elements are created and managed separately for each platform, since mobile elements and web elements are not compatible with each other. To create a [reusable element for web](/help-guides/design/elements/web-app/reusable-elements), switch to the web editor and add it there in the same way.

## How reusable elements work

A reusable element has two parts:

* **The definition.** The reusable element itself, edited from the reusable elements section of the editor. Any changes made here affect every instance across your app.
* **The instance.** A placed copy of the reusable element on a view or inside another reusable element. Instances share the design and behavior of the definition, but can accept parameters to display different content.

The definition and each instance have their own separate property editors. This split gives you a single source of truth for the component's core properties, while still allowing individual instances to adapt to the context they're used in.

Once a reusable element is defined, adding it to a view works the same as with any other element. Drag it from the palette or the sidebar and configure any parameters it accepts.

## Reusable elements vs. groups

Reusable elements and groups can look similar in the editor, but they serve different purposes.

<table><thead><tr><th width="152.87890625">Feature</th><th>Reusable element</th><th>Group</th></tr></thead><tbody><tr><td>Scope</td><td>Shared across views</td><td>Belongs to a single view</td></tr><tr><td>Editing</td><td>Edited in isolation</td><td>Edited directly on the view</td></tr><tr><td>Updates</td><td>Changes apply to every instance across the app</td><td>Changes affect only the specific group</td></tr><tr><td>Workflows</td><td>Has its own workflows, defined inside the reusable element</td><td>Workflows live in the view it's on</td></tr><tr><td>Parameters</td><td><a href="#passing-data-to-reusable-elements">Accepts data</a> through custom properties, custom states or <em>Type of content</em></td><td>Accepts data through <em>Type of content</em> or custom states</td></tr></tbody></table>

Use a group when the component is only needed on one view. Use a reusable element when the component will appear in multiple places, or when you want to encapsulate its design and behavior for reuse.

## Reusable elements vs. views

Reusable elements and views both hold structured layouts and their own workflows, but they serve different purposes.

<table><thead><tr><th width="184.95703125">Feature</th><th>Reusable element</th><th>View</th></tr></thead><tbody><tr><td>Purpose</td><td>A shared component used inside views</td><td>A standalone screen users navigate to</td></tr><tr><td>Navigation</td><td>Placed inside a view, not navigated to</td><td>Reached through tab bar or <em>Go to view</em></td></tr><tr><td>Contains workflows</td><td>Yes</td><td>Yes</td></tr><tr><td>Can be nested</td><td>Yes, inside other reusable elements or containers</td><td>No, views can't contain other views</td></tr><tr><td>Parameters</td><td>Yes, through custom properties</td><td>Yes, through custom properties</td></tr><tr><td>Instances</td><td>Can be used many times across the app</td><td>One per screen in your app</td></tr><tr><td>Updates</td><td>Changes apply to every instance at once</td><td>Changes affect only that view</td></tr></tbody></table>

Use a reusable element for components that appear across multiple views. Use a view for full screens users can navigate to.

## Creating a reusable element

There are two ways to create a reusable element:

### Convert an existing group

Right-click a group on the view and select *Convert to a reusable element*. Bubble creates a new reusable element. The original group is not deleted or replaced.

This is useful when you've already built a component on a view and realize it should be reusable.

### Create one from scratch

In view navigator, click *New* button and *mobile reusable element*, give it a name, and build the design from scratch.

This is useful when you're starting fresh, such as building a shared header before adding it to any views.

## Types of reusable elements

When you create a reusable element for a mobile app, you choose what type of container it will be. The type controls how the reusable element behaves when placed on a view.

### Group

The default option. A group-type reusable element behaves like a regular group on the view it's placed on. It sits inline with the surrounding content and can be arranged using the same layout modes as any other container. Use this type for most reusable components, including headers, cards, form sections, and content modules.

**Article:** [Group](/help-guides/design/elements/ios-and-android-app/containers/group-element-mobile)

### Sheet

Turns the reusable element into a sheet. Instances slide up from the bottom of the view, sitting above the current content while keeping it partially visible. Use this type when the reusable element is a shared sheet-based interaction, such as a filter panel, a comment thread, or a quick action menu.

**Article:** [Sheet](/help-guides/design/elements/ios-and-android-app/containers/sheet-mobile)

### Floating group

Turns the reusable element into a floating group. Instances stay fixed to a side of the screen and remain visible as the user scrolls. Use this type for shared components that need to stay in place, such as a persistent header, a floating action button, or a status banner.

Even if you plan to use a reusable element inside a sheet or floating group, it can be worth setting it up as a *Group* type and placing that group inside a regular sheet or floating group on the view. This gives you more flexibility in certain scenarios, such as when you want to collapse the reusable element's width or height, or use it in different contexts without being locked into a specific overlay behavior.

**Article:** [Floating group](/help-guides/design/elements/ios-and-android-app/containers/floating-group-element-mobile)

## Passing data to reusable elements

### Using the *Type of content*

Reusable elements accept a *Type of content* just like a regular group, sheet or floating group. You define the type of content, such as *User, Post*, or text on the [definition](#how-reusable-elements-work), and set the data source on the [instance](#how-reusable-elements-work).

### Using custom properties

Reusable elements can accept data through custom properties. This lets each instance display different content while sharing the same structure.

To set this up:

1. Open the reusable element's definition.
2. Add one or more custom properties, each with a name and a type (such as *User*, *Post*, or *Text*).
3. Reference those properties from elements inside the reusable element using expressions like `Reusable element's User's name`.
4. Add the reusable element to a view, and configure its properties with the data you want to pass in.

For example, a *User card* reusable element might accept a *User* parameter. Instances on different views can display different users by passing different values into that parameter.

Custom properties can also be read from outside of the reusable element, and is a useful way to pass data both ways.

### Using custom states

You can also pass data between a view and a reusable element using the *Set state of an element* action:

1. Create a custom state on the reusable element itself, not on any of its child elements, and set it to the correct data type.
2. Use the *Set state of an element* action from the view's workflow to write data into that custom state.

The reusable element's child elements can then reference the custom state directly in expressions or conditions.

This method works both directions. A view can push data into a reusable element, and a reusable element can update a state that other elements react to.

## Reusable elements and workflows

Reusable elements have their own workflows. Anything triggered inside a reusable element is defined and edited there, not on the page it's placed on. This keeps behavior encapsulated with the component.

Common patterns:

* A header with a login button that triggers a login popup, both defined in the same reusable element.
* A card component that opens a detail view when clicked.
* A form component that validates and submits its own data.

Workflows inside a reusable element can also communicate with the page it's placed on through custom events, letting the page respond when something happens inside the reusable element.

### Custom events

Custom events are workflows that don't run on their own. Instead, they run when explicitly triggered by another workflow.

This makes reusable elements more flexible. A reusable component isn't just a self-contained unit: it can respond to instructions from the outside world.

Custom events also let you use reusable elements as workflow libraries. By defining a set of commonly used workflows as custom events inside a reusable element, you can manage them in a single central place and trigger them from any page that includes the reusable element.

The reusable element doesn't need to contain any visual elements for this to work. A reusable element created purely to hold shared workflows is a common pattern for organizing app-wide workflows.

#### Defining a custom event

Custom events are defined inside the reusable element's workflow editor, alongside any other workflows the component uses. Each custom event has:

* **A name**, used to reference it when triggering.
* **Optional parameters**, which pass data into the event from the workflow that triggers it.
* **A set of actions**, which run when the event is triggered.
* **Optional return values,** which pass one or more values back to the original workflow.

Once defined, a custom event is available to any workflow that has access to the reusable element.&#x20;

#### Triggering a custom event from a page

To trigger a custom event inside a reusable element from the page it's on, use the [*Trigger a custom event from a reusable element*](/core-resources/bubble-workflows/bubble-actions/custom-actions#trigger-a-custom-event-from-a-reusable-element) action. This action lets you:

1. Select the reusable element instance on the page.
2. Choose the specific custom event to trigger.
3. Pass values into any parameters the event accepts.

If you are using return values, you can reference them in the next step of the workflow as *Result of step X*. The original workflow waits for the custom event's workflow to finish before it continues.

### Styling reusable elements

Reusable elements can be styled like any other element. The styling defined on the reusable element carries over to every instance, keeping the design consistent. Individual instances can override some properties, such as size or visibility, but the underlying design is controlled by the definition.

You can use a combination of custom properties and conditionals to style a reusable element differently based on how it's being used.

Using shared styles or style variables inside a reusable element keeps the design consistent both within the component and across the rest of your app.

### Detaching a reusable element

Occasionally, you may want to break the link between an instance and its definition. Right-clicking a reusable element instance and selecting *Detach reusable element* converts it into regular elements. The design, layout, and workflows are preserved on the view, but the connection to the original reusable element is removed.

Once detached, the elements behave like any other elements on the view:

* Changes made to the original reusable element no longer affect them.
* Changes made to the detached elements don't affect the reusable element or any other instances.
* The elements can be edited independently, like any other design on the view.

Detaching is useful when a view needs a variation of the reusable element that's different enough to warrant a separate design, or when the reusable element is being phased out and you want to preserve the existing content on the view.

### Frequently asked questions

<details>

<summary>What's the difference between a reusable element and a group?</summary>

A group is a container that lives on a specific view. A reusable element is a component that can be used across multiple views (or multiple times on the same view), with a shared definition that updates every instance at once.

</details>

<details>

<summary>Can I convert a group into a reusable element?</summary>

Yes. Right-click a group and select *Convert to a reusable element*. Bubble creates a new reusable from the group. It does not delete or replace the original group.

</details>

<details>

<summary>Can reusable elements accept data?</summary>

Yes. See [here](#passing-data-to-reusable-elements).

</details>

<details>

<summary>Can a reusable element trigger a workflow on the view it's placed on?</summary>

No. Although you can set up a workaround, such as setting up a *Do when condition is true* event that reacts to a change in value of a reusable element's custom property or custom state.

</details>

<details>

<summary>Can I trigger a workflow inside a reusable element from the view?</summary>

Yes. Use the Trigger a custom event from a reusable element action, and reference a custom event defined inside the reusable element.

</details>

<details>

<summary>Can reusable elements contain other reusable elements?</summary>

Yes. Nesting reusable elements is a common pattern, especially for complex layouts where smaller components are combined into larger ones.

</details>

<details>

<summary>Can I use a sheet as a reusable element?</summary>

Yes. Sheets can be built as reusable elements and reused across views, keeping the design and behavior consistent everywhere they appear.

</details>

<details>

<summary>Do changes to a reusable element affect existing instances?</summary>

Yes. Any change to the reusable element applies immediately to every instance across your app.

</details>

<details>

<summary>Can individual instances have different styling?</summary>

Some properties, like size or visibility, can be adjusted at the instance level. The underlying design and structure are controlled by the reusable element definition. You can use a combination of custom properties and conditionals to change th styling under specific circumstances.

</details>

<details>

<summary>Can reusable elements be shared between web and mobile?</summary>

No. Web and mobile have separate reusable element libraries, since the two platforms use different element types. A reusable element built for web can't be used on mobile, and vice versa.

</details>
