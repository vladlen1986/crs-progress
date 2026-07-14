# Native mobile actions
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions/native-mobile-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
The workflow actions in this section only apply to **native mobile apps**.
{% endhint %}

## Create a mobile deep link

Generates a link that navigates the user to a specific view.

### On tap, navigate to

This dropdown lists all the views in your app. Selecting a view enables the remaining destination fields. The default value is the root view to match the existing behavior prior to this feature.

### Overlay <mark style="color:$info;">(optional)</mark>

After selecting a destination view, you can choose a sheet or floating group on that view to present as an overlay after navigation. The dropdown shows only overlay-type elements on the selected view. If no sheets or floating groups exist on that view, this field is disabled.

### Navigation type <mark style="color:$info;">**(conditional)**</mark>

Appears when the destination is not a tab view. Controls how the view is presented:

* **Stack**: pushed onto the navigation stack (standard drill-down).
* **Modal:** presented modally over the current context.

If the destination is a tab view, this field is hidden and the app switches to that tab directly.

### Base view <mark style="color:$info;">(optional, conditional)</mark>

Appears when navigation type is Stack or Modal. Defines what the back button navigates to when the user arrives from a push notification (where there is no prior navigation history).

* Lists all views except the destination view. Defaults to the app's root view.
* When set, the app constructs a synthetic stack: \[base view] → \[destination view], so the back button leads to the base view rather than closing the app.
* If left empty, the back button navigates to the root view.

### View parameters <mark style="color:$info;">**(conditional)**</mark>

If the selected destination or base view has view properties, a parameter section appears with a field for each property. Values can be static or dynamic expressions, consistent with how view properties work elsewhere in the workflow editor.

{% hint style="info" %}
**Note**: Parameter expressions are evaluated when the deep link is generated. No expressions are evaluated on the device when the deep link is used for navigation.
{% endhint %}

## Open camera library

Opens the device’s photo library, allowing the user to select an existing image.

### Type

Defines the number of files the user can select:

* Single
* Multiple

### Make this file private

Controls whether the captured file is stored with privacy restrictions defined by privacy rules. When enabled, the file is not publicly accessible. See [this article](/help-guides/data/files#uploading-private-files) for more information how to keep files private.

### Optimize image size

Resizes images above 1080px for improved performance.

## Open camera

Opens the device’s camera, allowing the user to capture a new photo.

### Save to camera library

Determines whether the captured image is also saved to the user’s device gallery.

### Make this file private

Controls whether the captured file is stored with privacy restrictions defined by privacy rules. When enabled, the file is not publicly accessible. See [this article](/help-guides/data/files#uploading-private-files) for more information how to keep files private.

### Optimize image size

Resizes large images before uploading to improve performance and reduce file size.

## Request location permissions

Prompts the user to grant permission for accessing their device’s location. This must be accepted before location data can be retrieved.

## Get current location

Retrieves the device’s current geographic location, based on available location services such as GPS or network data.

## Request push notification permissions

Prompts the user to grant permission to receive push notifications. This must be accepted before push notifications can be sent.

## Select all

Selects all the entries in a specific [selectable list](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/input-form-properties-mobile/selectable-list-element-mobile).

## Send push notification

{% hint style="warning" %}
Both iOS and Android require explicit user consent before push notifications can be sent. Use the *Request push notification permissions* action to trigger the operating system's standard notification request prompt. This prompt is system-generated and can't be customized.
{% endhint %}

This action sends a push notification to one or more devices.

### Title

The main header of the push notification.

### Subtitle

The subtitle of the push notification.

### Body

The body text of the push notification.

### Devices

The devices to send the notification to. Must be populated with the *device* data type from one or more users.

{% hint style="info" %}
Your app icon is displayed in the push notification and can't be customized per notification.
{% endhint %}

## Set checkbox

Set's the value of a specific checkbox:

<table><thead><tr><th width="144.51873779296875">State</th><th>Decsription</th><th>Note</th></tr></thead><tbody><tr><td>Checked</td><td>Sets the box's state to checked.</td><td></td></tr><tr><td>Unchecked</td><td>Sets the box's state to unchecked</td><td></td></tr><tr><td>Dynamic</td><td>Sets the box's state to a dynamic value</td><td><strong>Tip:</strong> to toggle the checkbox state, set the dynamic expression to <code>Checkbox isn't checked.</code></td></tr></tbody></table>

## Set list values

Sets the list values for a [selectable list](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/input-form-properties-mobile/selectable-list-element-mobile). Expects an expression return a list of the specified data type.

## Set property of current view

Sets the value of any property on the current view.

{% hint style="info" %}
**Note:** Properties are managed in the element property editor. Select the view to open up the property editor and navigate to *Visual - Properties.*
{% endhint %}

## **Initiate subscription purchase**

Starts a native in-app purchase flow for a selected billing variant.

Key behaviors:

* Opens the Apple or Google payment sheet
* Handles receipt validation automatically
* Updates the Subscription Purchases table when the purchase completes

You can select a billing variant directly or pass one dynamically, such as from a repeating group.

A typical flow looks like this:

* The user taps an *Upgrade* or *Subscribe* button
* The workflow runs *Initiate subscription purchase*
* Bubble hands off to Apple or Google
* The subscription state updates automatically

{% hint style="warning" %}
**Important:** A User must be logged into an account on your app in order to initiate a purchase as a Subscription Purchase record must be linked to a User. Hide all billing actions until a user has logged in.
{% endhint %}

## **Manage subscription**

Redirects the user to the platform-native subscription management screen.

Use this action to allow users to:

* Cancel a subscription
* Change billing frequency
* Upgrade or downgrade within a subscription group

Apple and Google control the management UI. Bubble provides the entry point, not the management controls themselves.

{% hint style="warning" %}
**Note:** Users can also upgrade or downgrade by initiating a purchase on a different plan for upgrades, downgrades, and cross-grades.
{% endhint %}

## Restore purchases

Restore purchases lets users who have previously made an in-app purchase restore that purchase on a new device or after reinstalling the app, without being charged again.

This action is required by both Apple and Google and must be available to users in your app. Failing to include it may result in your app being rejected during app review.

## Unselect all

Unselects all the entries in a specific [selectable list](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/input-form-properties-mobile/selectable-list-element-mobile).
