# Reusable element (web)
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/reusable-elements · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

This section covers reusable elements: elements that can be using in multiple places in your app

Reusable elements are elements you build once and use across your app. They function like custom components, letting you package a design and its behavior into a single unit that you can drop anywhere it's needed.

<figure><img src="/files/w6sg3YiWn6SiCYdYbHD5" alt="Laptop with Bubble&#x27;s homepage showing a top navigation bar with a reusable element."><figcaption><p>The navigation toolbar on <a href="https://www.bubble.io/">bubble.io</a> (marked in red) is a typical use case for reusable elements. The toolbar, along with all its buttons and workflows, can be reused in as many places as needed across the app.</p></figcaption></figure>

Because updates to a reusable element apply automatically to every instance of it in your app, they're a powerful tool for keeping your design consistent, avoiding duplication, and making your app faster to build and maintain.

## What reusable elements do

Any group in Bubble can be turned into a reusable element. Once converted, that group becomes a standalone component you can place on any page in your app.

Reusable elements have three main advantages:

1. **Consistency.** Every instance shares the same structure and design, so updates apply everywhere at once.
2. **Efficiency.** You build the component once instead of rebuilding it on every page.
3. **Flexibility.** Instances can be customized through parameters, letting each one adapt to the context it's used in.

Common examples include headers, footers, navigation menus, cards, form components, popups, and login forms.

### Reusable elements vs. pages

Reusable elements and pages both hold structured layouts, but they serve different purposes:

<table><thead><tr><th width="198.2109375">Feature</th><th>Reusable element</th><th>Page</th></tr></thead><tbody><tr><td>Purpose</td><td>A shared component used inside pages</td><td>A standalone screen users navigate to</td></tr><tr><td>URL</td><td>No</td><td>Yes</td></tr><tr><td>Contains workflows</td><td>Yes</td><td>Yes</td></tr><tr><td>Can be nested</td><td>Yes, inside other reusable elements or pages</td><td>No</td></tr><tr><td>Parameters</td><td>Yes, through custom properties</td><td>Yes, through the <em>Type of content,</em> often called <em>the page thing.</em></td></tr></tbody></table>

Use reusable elements for components that appear across multiple pages. Use pages for full screens users can navigate to directly.

### Reusable elements vs. groups

Reusable elements and groups can look similar in the editor, but they serve different purposes.

<table><thead><tr><th width="135.16015625">Feature</th><th>Reusable element</th><th>Group</th></tr></thead><tbody><tr><td>Scope</td><td>Shared across pages</td><td>Belongs to a single page</td></tr><tr><td>Editing</td><td>Edited in isolation</td><td>Edited directly on the page</td></tr><tr><td>Updates</td><td>Changes apply to every instance across the app</td><td>Changes affect only the specific group</td></tr><tr><td>Workflows</td><td>Has its own workflows, defined inside the reusable element</td><td>Workflows live with the page it's on</td></tr><tr><td>Parameters</td><td>Accepts data through <em>Type of content</em> or custom properties</td><td>Accepts data through a single <em>Type of content</em></td></tr></tbody></table>

Use a group when the component is only needed on one page. Use a reusable element when the component will appear in multiple places, or when you want to encapsulate its design and behavior for reuse.

### Reusable elements for web and mobile

Reusable elements are created and managed separately for each platform, since web elements and native mobile elements are not compatible with each other. To create a [reusable element for mobile](/help-guides/design/elements/ios-and-android-app/mobile-reusable-elements), switch to the mobile editor and add it there in the same way.

## How reusable elements work

A reusable element has two parts:

* **The definition.** The reusable element itself, edited from the reusable elements section of the editor. Any changes made here affect every instance across your app.
* **The instance.** A placed copy of the reusable element on a page or inside another reusable element. Instances share the design and behavior of the definition, but can accept parameters to display different content.

The definition and each instance have their own separate property editors. This split gives you a single source of truth for the component's core properties, while still allowing individual instances to adapt to the page or context they're used in.

Once a reusable element is defined, adding it to a page works the same as with any other element. Drag it from the palette or the sidebar and configure any parameters it accepts.

## Types of reusable elements

When you create a reusable element, you choose what type of container it will be. The type controls how the reusable element behaves when placed on a page. Three options are available:

{% hint style="info" %}
Even if you plan to use a reusable element inside a popup or floating group, it can be worth setting it up as a *Group* type and placing that group inside a regular popup or floating group on the page. This gives you more flexibility in certain scenarios, such as when you want to collapse the reusable element's width or height, or use it in different contexts without being locked into a specific overlay behavior.
{% endhint %}

### Group

The default option. A group-type reusable element behaves like a regular group on the page it's placed on. It sits inline with the surrounding content and can be arranged using the same layout modes as any other container.

Use this type for most reusable components, including headers, footers, cards, and form sections. You can read more about the group element in the article below:

**Article:** [Group](/help-guides/design/elements/web-app/containers/groups)

### Popup

Turns the reusable element into a popup. Instances open on top of the page, centered on the screen, and dim the background to draw focus to the popup itself.

Use this type when the reusable element is a shared dialog, form, or focused interaction that should appear as an overlay. You can read more about the popup element in the article below:

**Article:** [Popup](/help-guides/design/elements/web-app/containers/popups)

### Floating group

Turns the reusable element into a floating group. Instances stay fixed to a side of the screen and remain visible as the user scrolls. Use this type for shared components that need to stay in place, such as a persistent header, a sidebar, or a floating action button.

The type is set when the reusable element is created and defines its behavior for every instance of it. Choose the type based on how the component will be used most often across your app. You can read more about the floating group element in the article below:

**Article:** [Floating group](/help-guides/design/elements/web-app/containers/floating-groups)

## Creating a reusable element

There are two ways to create a reusable element:

### Convert an existing group

Right-click a group on the page and select *Convert to a reusable element*. Bubble creates a new reusable element that contains the group's original design and elements. It does not delete or replace the original group, but you can manually delete it and place the new reusable in its stead.

This is useful when you've already built a component on a page and realize it should be reusable.

### Create one from scratch

In the page navigator, click the *New* button and *Reusable web element*, give it a name, and build the design from scratch.

This is useful when you're starting fresh, such as building a shared header before adding it to any pages.

## Detaching a reusable element

Occasionally, you may want to break the link between an instance and its definition. Right-clicking a reusable element instance and selecting *Detach reusable element* converts it into regular page elements. The design, layout, and workflows are preserved on the page, but the connection to the original reusable element is removed.

Once detached, the elements behave like any other elements on the page:

* Changes made to the original reusable element no longer affect them.
* Changes made to the detached elements don't affect the reusable element or any other instances.
* The elements can be edited independently, like any other design on the page.

Detaching is useful when a page needs a variation of the reusable element that's different enough to warrant a separate design, or when the reusable element is being phased out and you want to preserve the existing content on the page.

This action can't be undone directly. If you need to revert, you can convert the elements back into a reusable element manually, but there's no automatic way to reattach them to the original.

## Passing data to and from reusable elements

### Using the *Type of content*

Reusable elements accept a *Type of content* just like a regular group, popup or floating group. You define the type of content, such as *User, Post*, or text on the [definition](#how-reusable-elements-work), and set the data source on the [instance](#how-reusable-elements-work).

### Using custom properties

Reusable elements can accept data through custom properties, similar to how a view accepts data on native mobile. This lets each instance display different content while sharing the same structure.

To set this up:

1. Open the reusable element's definition.
2. Add one or more custom properties, each with a name and a type (such as *User*, *Post*, or *Text*).
3. Reference those properties from elements inside the reusable element using expressions like `Reusable element's User's name`.
4. Add the reusable element to a page, and configure its properties with the data you want to pass in.

For example, a *User card* reusable element might accept a *User* parameter. Instances on different pages can display different users by passing different values into that parameter.

Custom properties can also be read from outside of the reusable element, and is a useful way to pass data both ways.

### Using custom states

You can also pass data between a page and a reusable element using the *Set state of an element* action:

1. Create a custom state on the reusable element itself, not on any of its child elements, and set it to the correct data type.
2. Use the *Set state of an element* action from the page's workflow to write data into that custom state.

The reusable element's child elements can then reference the custom state directly in expressions or conditions.

This method works both directions. A page can push data into a reusable element, and a reusable element can update a state that other elements react to.

### Using URL parameters

URL parameters don't pass data directly into a reusable element, but because both the page and any reusable elements it contains can read the current URL, parameters make a useful shared channel.

This is especially convenient when the data being shared corresponds naturally to something users might bookmark or share, such as a filter, a category, or the current view of a single-page app.

Like custom states, URL parameters work in both directions. A page can set a parameter that a reusable element reads, and a reusable element can update the URL for the page to react to.

## Reusable elements and workflows

Reusable elements have their own workflows. Anything triggered inside a reusable element is defined and edited there, not on the page it's placed on. This keeps behavior encapsulated with the component.

Common patterns:

* A header with a login button that triggers a login popup, both defined in the same reusable element.
* A card component that opens a detail view when clicked.
* A form component that validates and submits its own data.

Workflows inside a reusable element can also communicate with the page it's placed on through custom events, letting the page respond when something happens inside the reusable element.

### Custom events

Custom events are workflows that don't run on their own. Instead, they run when explicitly triggered by another workflow. Inside a reusable element, custom events are especially useful, because they let you expose specific behaviors that can be triggered from the page the reusable element sits on.

This makes reusable elements more flexible. A reusable component isn't just a self-contained unit: it can respond to instructions from the outside world, letting pages and other components coordinate with it.

Custom events also let you use reusable elements as workflow libraries. By defining a set of commonly used workflows as custom events inside a reusable element, you can manage them in a single central place and trigger them from any page that includes the reusable element.

The reusable element doesn't need to contain any visual elements for this to work. A reusable element created purely to hold shared workflows is a common pattern for organizing app-wide logic, such as user account actions, analytics tracking, or shared utility flows.

#### Defining a custom event

Custom events are defined inside the reusable element's workflow editor, alongside any other workflows the component uses. Each custom event has:

* **A name**, used to reference it when triggering.
* **Optional parameters**, which pass data into the event from the workflow that triggers it.
* **A set of actions**, which run when the event is triggered.
* **Optional return values,** which pass one or more values back to the original workflow.

Once defined, a custom event is available to any workflow that has access to the reusable element.

#### Triggering a custom event from a page

To trigger a custom event inside a reusable element from the page it's on, use the [*Trigger a custom event from a reusable element*](/core-resources/bubble-workflows/bubble-actions/custom-actions#trigger-a-custom-event-from-a-reusable-element) action. This action lets you:

1. Select the reusable element instance on the page.
2. Choose the specific custom event to trigger.
3. Pass values into any parameters the event accepts.

If you are using return values, you can reference them in the next step of the workflow as *Result of step X*.

## Styling reusable elements

Reusable elements can be styled like any other element. The styling defined on the reusable element carries over to every instance, keeping the design consistent.

Individual instances can override some properties, such as size or visibility, but the underlying design is controlled by the definition. Using shared [styles](/help-guides/design/variables-and-styles/styles) or [style variables](/help-guides/design/variables-and-styles) inside a reusable element keeps the design consistent both within the component and across the rest of your app.

## FAQ: Reusable elements for web

<details>

<summary>What's the difference between a reusable element and a group?</summary>

A group is a container that lives on a specific page. A reusable element is a component that can be used across multiple pages, with a shared definition that updates every instance at once.

</details>

<details>

<summary>Can I convert a group into a reusable element?</summary>

Yes. Right-click a group and select *Convert to a reusable element*. Bubble creates a new reusable element from the group and its child-elements, but does not delete or replace the original group.

</details>

<details>

<summary>Can reusable elements accept data?</summary>

Yes. Add custom properties to the reusable element to accept data from the page or component that uses it. Reference the properties inside the reusable element using expressions like Reusable element's \[property].

</details>

<details>

<summary>Can a reusable element trigger a workflow on the page it's placed on?</summary>

No. You can trigger a custom event defined in a reusable element from the outside, by using the [*Trigger a custom event from a reusable element*](/help-guides/logic/workflows/events/frontend-events/custom-events#trigger-a-workflow-in-a-reusable-element), but it does not work the other way.

You can use workarounds, such as using a custom parameter or custom state on the reusable element, and then using the *Do when condition is true* event that watches the custom property/state's value.

</details>

<details>

<summary>Can I trigger a workflow inside a reusable element from the page?</summary>

Yes. Use the [*Trigger a custom event from a reusable element*](/help-guides/logic/workflows/events/frontend-events/custom-events#trigger-a-workflow-in-a-reusable-element) action, and reference a custom event defined inside the reusable element.

</details>

<details>

<summary>Can reusable elements contain other reusable elements?</summary>

Yes. Nesting reusable elements is a common pattern, especially for complex layouts where smaller components are combined into larger ones.

</details>

<details>

<summary>Can I use a popup as a reusable element?</summary>

Yes. Popups can be built as reusable elements and reused across pages, keeping the design and behavior consistent everywhere they appear.

</details>

<details>

<summary>Do changes to a reusable element affect existing instances?</summary>

Yes. Any change to the reusable element applies immediately to every instance across your app.

</details>

<details>

<summary>Can individual instances have different styling?</summary>

Some properties, like size or visibility, can be adjusted at the instance level. The underlying design and structure are controlled by the reusable element definition. You can use a combination of custom properties and conditionals to style a reusable element in different circumstances.

</details>

<details>

<summary>Are reusable elements available on native mobile?</summary>

Yes, but the two platforms have separate reusable element libraries, meaning that a reusable element made for web cannot be used on mobile, and vice versa. This is because web elements are incompatible with mobile elements.

</details>

<details>

<summary>Are reusable elements good for performance?</summary>

Technically yes. Reusing components keeps the overall codebase leaner, since the same code is loaded once and used in multiple places. In most cases the impact on performance is small, but small decisions add up, so using reusable elements is generally a good habit when performance matters.

Working with reusable elements can also make the Bubble editor itself more responsive. Because you edit them in isolation, Bubble has fewer elements and workflows to load at once, which can reduce memory usage while you build.

That said, the biggest benefit of reusable elements is developer efficiency. They save time, reduce duplication, and make your app easier to maintain.

</details>

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [Converting elements to reusable elements](https://www.youtube.com/watch?v=3GEH_hCaAWk)
* [How to build a responsive navigation bar](https://www.youtube.com/watch?v=3lUlmTZ_IQo)

</details>
