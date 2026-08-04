# Sheet (mobile)
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/containers/sheet-mobile · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

A sheet is a container that slides up from the bottom of a native mobile view, sitting above the current content while keeping it partially visible. Sheets are used for focused interactions that don't require leaving the current screen, such as filters, forms, or contextual details.

<figure><img src="/files/k5J8wNinJxojQOoFsvab" alt="Example of a sheet element in a mobile app."><figcaption><p>Sheets slide up from the bottom, keeping the view partially visible.</p></figcaption></figure>

Sheets are similar to modals, but with an important difference: sheets are best when the context of the view behind them is still relevant. A map app displaying search results in a sheet is a classic example: users can scroll through results while continuing to see the map underneath.

Sheets are added directly to a view, functioning much like popups on the web.

## Common uses

Sheets work well for:

* **Search results** overlaid on top of a map or other visual content.
* **Filter and sort options** that adjust what's shown in the underlying view.
* **Detail views** that expand contextually without switching screens.
* **Quick forms** like adding a note, sending a message, or confirming a small action.
* **Bottom navigation menus** with expanded options.

## Sheets vs. modals

Sheets and modals both provide focused, temporary experiences on top of a view, but they serve different purposes:

<table><thead><tr><th width="169.640625">Feature</th><th>Sheet</th><th>Modal</th></tr></thead><tbody><tr><td>Position</td><td>Slides up from the bottom</td><td>Presented as a full-screen overlay</td></tr><tr><td>Underlying view</td><td>Often partially visible</td><td>Typically fully hidden</td></tr><tr><td>Best for</td><td>Contextual actions where the background stays relevant</td><td>Fully focused tasks with no distraction</td></tr><tr><td>Dismissal</td><td>Swipe down or button</td><td>Swipe down or close button</td></tr><tr><td>Snap points</td><td>Multiple sizes possible</td><td>Full-screen only</td></tr></tbody></table>

Use a sheet when the user benefits from seeing the underlying view. Use a modal when the task requires the user's full focus.

## How sheets behave

Sheets sit above the view content in their own layer. They can partially or fully cover the screen, depending on the size the user drags them to. Because the underlying view often stays visible, sheets are a natural way to show additional information without breaking the user's focus.

<figure><img src="/files/yUPqdXFG2eqocnw7Jrl3" alt="" width="285"><figcaption></figcaption></figure>

Sheets can hold any elements a regular group can, including forms, images, buttons, and other containers.

### View types

The *View type* property determines how the sheet handles scrolling and content layout. By default, the sheet behaves like a group, acting as a container where you can add and manage elements freely.

When you set the view type to *Vertical list* or *Section list*, a pseudo child element is added to the element tree containing that list. Each list has its own data source, independent of the sheet's data source, letting you combine a single-record sheet with a list of items in the same layout.&#x20;

<table><thead><tr><th width="140.859375">View type</th><th>Description</th></tr></thead><tbody><tr><td>Scrollable</td><td>The default option. The sheet's content scrolls vertically when it extends beyond the visible area. Best for sheets with mixed content, such as forms, detail views, or long-form information.</td></tr><tr><td>Not scrollable</td><td>The sheet's content is fixed to the size of the sheet and doesn't scroll.</td></tr><tr><td>Vertical list</td><td>Adds a vertical list to the sheet, letting it display a scrollable list of items. This is useful when the sheet's primary purpose is to show a collection, like a list of options, contacts, or search results.</td></tr><tr><td>Section list</td><td>Adds a section list to the sheet, grouping items into named sections. Ideal for sheets that display categorized content, such as organized by category or   by date.</td></tr></tbody></table>

## Loading data into a sheet

Sheets can hold a data source, just like a regular group. This makes it easy to open a sheet with a specific piece of data loaded, such as showing details for the item a user just tapped.

Sheets, like views, support horizontal lists and section lists. Enabling either through the *View type* property adds it as a pseudo child element with its own separate list data source.

The sheet itself keeps its original single-record data source, which can still be referenced by other child elements. This lets you customize the horizontal or section list's data source to reflect the sheet's parent data, connecting the two without giving up either one.

### **Setting the data source directly**

Set the sheet's *Type of content* and *Data source* directly. The sheet loads its data as soon as it's shown, based on an expression like `Current User`.

<figure><img src="/files/oMXmc4b0eJaSVtkSDl2F" alt=""><figcaption></figcaption></figure>

### Pushing data with a workflow

Use the *Display data in a group* action to load data in response to a user action, such as tapping an item in a list.

<figure><img src="/files/7D98gyKuTmrggN5LAw3P" alt="Pushing data to a sheet using a workflow action."><figcaption><p>You can push data to a sheet as a result of user action, by using the <em>Display data in group</em> action.</p></figcaption></figure>

## Showing and hiding sheets

Sheets are opened with the [*Show element*](/core-resources/actions/element#show-an-element) action. Bubble applies a native slide-up animation automatically, giving the sheet the familiar mobile feel.

To close a sheet, either use the [*Hide an element*](/core-resources/actions/element#hide-an-element) action or let the user dismiss it by swiping down (when *Swipe to close* is enabled).

## Snap points

Snap points define the sizes a sheet can settle at. When you set snap points, users can drag the sheet up or down to switch between them, and the sheet snaps to the nearest one when released.

Each sheet has a default snap point that determines the size it opens to. Snap points are especially useful for sheets with a lot of content, or for scenarios where users may want to move the sheet out of the way to interact with what's behind it.

## Controlling the backdrop

Sheets support several properties for controlling how the background of the view appears when the sheet is open. These are UI settings only and shouldn't be relied on for security.

#### **Block interaction behind sheet**

When enabled, users can't interact with the content behind the sheet. This is similar to the behavior of a popup on the web, and is useful when the sheet requires the user's full attention.

#### **Backdrop color**

Applies a solid color over the underlying view when the sheet is open, drawing focus to the sheet by dimming or tinting the background.

#### **Backdrop blur**

Applies a blurred overlay over the underlying view when the sheet is open, softening the background without hiding it entirely.

## Interaction options

Sheets include a few properties for controlling how users can interact with them:

#### **Swipe to close**

When enabled, users can swipe the sheet downward to close it. Disabling this is useful when the sheet should only be dismissed by a specific button, such as a *Cancel* or *Save* action.

#### **Drag handle**

Shows a small horizontal bar at the top of the sheet, giving users a visual cue that the sheet can be dragged.

## Styling sheets

Sheets can be styled like any other container. The top edge of a sheet often uses rounded corners to create the familiar "card sliding up" appearance common in mobile apps.

<figure><img src="/files/oApoPGeCOIjd9i2NwR4P" alt="Sheet element styling properties."><figcaption><p>You can style individual sheets by adjusting their different properties, or by connecting them to predefined styles and/or style variables.</p></figcaption></figure>

You can style individual horizontal lists by adjusting their different properties, or by connecting them to predefined styles[^1] and/or [style variables](#user-content-fn-2)[^2].

## Sheets and security

Sheets are a visual layer, not a security boundary. The elements behind a sheet are still present in the app's client-side code, and blocking interaction or blurring the background is a UI effect only.

Never rely on a sheet to hide sensitive information. Use [privacy rules](#user-content-fn-3)[^3] in the database and server-side conditions to control security.

## FAQ: Sheets

<details>

<summary>How is a sheet different from a modal?</summary>

Sheets slide up from the bottom and often leave the underlying view partially visible, keeping context in view. Modals take over the full screen and are better for fully focused tasks where the underlying view isn't relevant.

</details>

<details>

<summary>How is a sheet different from a popup on the web?</summary>

Sheets are the native mobile equivalent of popups. They behave similarly, but with native mobile behaviors like swipe-to-close, snap points, and the familiar slide-up animation.

</details>

<details>

<summary>Can users close a sheet by swiping?</summary>

Yes, if *Swipe to close* is enabled. Disable it when you want to control its visibility using workflows.

</details>

<details>

<summary>Can I have multiple snap points on a sheet?</summary>

Yes. Define multiple snap points to let users drag the sheet between different sizes. The sheet snaps to the nearest one when released.

</details>

<details>

<summary>Can I load data into a sheet?</summary>

Yes. Set the *Type of content* and *Data source* on the sheet. You cannot load data into sheets using a workflow action.

You can change the data source based on specific criteria by using conditionals[^4].

</details>

<details>

<summary>Can I have more than one sheet on a view?</summary>

Yes. You can add multiple sheets to a view and open the one that fits the current context. Only one sheet should be visible at a time to avoid overlapping.

</details>

<details>

<summary>Can I animate a sheet as it opens?</summary>

Sheets use a native slide-up animation automatically.

</details>

<details>

<summary>Can I block interaction with the view behind the sheet?</summary>

Yes. Enable *Block interaction behind sheet* to prevent users from tapping or scrolling the content underneath.

</details>

<details>

<summary>Can I dim or blur the view behind the sheet?</summary>

Yes. Use Backdrop color to apply a tint or Backdrop blur to apply a blurred overlay. These can be used separately or combined.

</details>

<details>

<summary>Are sheets available in web apps?</summary>

No. Sheets are mobile-only. On web, use [popups](/help-guides/design/elements/web-app/containers/popups) or [floating groups](/help-guides/design/elements/web-app/containers/floating-groups) instead.

</details>

[^1]: Styles are reusable sets of visual properties, like colors, fonts, and borders, that can be applied to elements across your app. Updating a style automatically updates every element that uses it, keeping your design consistent.

    **Article:** [Styles](/help-guides/design/variables-and-styles/styles)

[^2]: Style variables let you save individual colors and fonts, and reference them anywhere in your app. Updating a variable updates every style and element that uses it, making it easy to change your app's look in one place.

    **Article:** [Style variables](/help-guides/design/variables-and-styles)

[^3]: Privacy rules control who can see and modify data in your database. They're evaluated on the server, making them the primary way to keep sensitive data secure and to manage access at the field level.

    **Article:** [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^4]: Conditionals let you change how an element looks or behaves when specific criteria are met. Each conditional is built as a rule that returns yes or no, and lets you adjust properties like the data source.

    **Article:** [Conditionals](/help-guides/logic/conditions)
