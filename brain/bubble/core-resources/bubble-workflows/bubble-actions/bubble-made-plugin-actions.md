# Bubble-made plugin actions
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions/bubble-made-plugin-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

<details>

<summary><strong>Airtable</strong> actions</summary>

### Create a new Record

Add new records to your Table. To use this action, check the box to “Create & Modify” this Table in the Plugins tab.

#### Type

Enter the type of record to create. This will match the name of the Table where you want to add the record.

### Delete a Record

Remove existing records from your Table. To use this action, check the box to “Delete” from this Table in the Plugins tab.

#### Type

Enter the type of record to delete. This will match the name of the Table where you want to remove the record.

#### Record

The existing record to delete. For example, if you are displaying a list of records from Airtable in a repeating group, this could be the current cell’s thing.

### Modify a Record

#### Type

Enter the type of record to modify. This will match the name of the Table where the record exists.

#### Record

The existing record to modify. For example, if you are displaying a list of records from Airtable in a repeating group, this could be the current cell’s thing.

</details>

<details>

<summary><strong>Box</strong> actions</summary>

### Upload file to Box

#### Storage service

In the Uploader’s Property Editor, select “Box” to save the uploaded file to that storage service. When a file is dropped into a File Uploader or Picture Uploader element, it automatically uploads to Box. You should still create a Thing in Bubble to reference the uploaded file.

</details>

<details>

<summary><strong>Braintree</strong> actions</summary>

### Charge the current user

This action charges the current user and prompts them to enter their credit card or PayPal information. The response from Braintree can be accessed in subsequent actions as “Result of previous step.” In a failed transaction, the workflow stops running.

#### Payer email

Email of the user being charged. Typically “Current user’s email.”

#### Amount

Amount to charge. Can be dynamic.

#### Description

Description shown on the user’s PayPal account.

#### Button caption

Caption shown on the Credit Card/PayPal form button.

#### Authorize the charge only

When enabled, creates an authorization without capturing the charge immediately. Uncaptured charges expire after 7 days.

#### Enable 3D secure check

Prompts the user for additional bank verification.

#### Do not show success message

Prevents Bubble’s default success alert so you can show a custom message.

### Subscribe the user to a plan

Subscribes the user to a predefined Braintree plan and charges them on a recurring basis.

#### Dynamically specify plan

Allows the plan to be set dynamically instead of selecting from a dropdown.

#### Plan name

Selects the plan to subscribe the user to.

#### Do not show success message

Prevents Bubble’s default success alert so you can show a custom message.

### Cancel the current user's plan

Cancels the user’s subscription so future charges stop.

#### Do not show success message

Prevents Bubble’s default success alert so you can show a custom message.

</details>

<details>

<summary><strong>Draggable Elements</strong> actions</summary>

### Move a draggable group

This action lets you manually move a draggable group on the screen.

#### Movement type

Choose whether to move the group to another element or to specific coordinates.

#### Element to move to

Moves the draggable group so its top-left corner matches the top-left corner of the selected element.

#### Offset top (px)

Moves the element this number of pixels below the reference element.

#### Offset left (px)

Moves the element this number of pixels to the left of the reference element.

#### Left - X (px)

Sets the left (X) coordinate of the element relative to its parent.

#### Top - Y (px)

Sets the top (Y) coordinate of the element relative to its parent.

#### Duration (ms)

Defines the animation length in milliseconds. Enter `0` for no animation.

</details>

<details>

<summary><strong>Facebook</strong> actions</summary>

### Send Facebook Message

This action enables users to send a Facebook message through a Facebook popup.

#### Link

Link shared by default in the popup. Users can change it.

#### Facebook user

The Facebook profile that receives the message. Available if that user also signed up with Facebook through the app.

</details>

<details>

<summary><strong>Fitbit</strong> actions</summary>

### Signup/login with a social network

This action integrates Fitbit authentication when registering a new user or logging in an existing user.

#### OAuth provider

Selects Fitbit as the social login provider.

### Invite Fitbit friend

Sends a friend request to another Fitbit user.

#### InvitedUserEmail

Email address of the Fitbit user to invite.

### Accept Fitbit friend invitation

Accepts a friend request from another Fitbit user.

#### FromUserID

ID of the Fitbit user whose invitation is being accepted.

### Add Fitbit subscription

Starts a Fitbit subscription.

#### SubscriptionID

Unique identifier for the user’s Fitbit subscription.

### Delete Fitbit subscription

Removes a Fitbit subscription.

#### CollectionPath

Specifies the collection to retrieve notifications from. If not provided, all user subscriptions are included.

</details>

<details>

<summary><strong>Google</strong> actions</summary>

### Account - Signup/login with a social network

Allows users to sign up or log in using their Google account. Bubble automatically creates a new account or logs in an existing one.

</details>

<details>

<summary><strong>LinkedIn</strong> actions</summary>

### Signup/login with a social network

This workflow step allows you to integrate a LinkedIn authentication event when registering a new user, or logging in an existing user.

#### OAuth provider - LinkedIn

Allows the Bubble editor to verify the correct social platform to login/signup the user.

</details>

<details>

<summary><strong>Localize Translation</strong> actions</summary>

### Set the website language

Sets the website language through an API action.

#### Language code

Select the language code.

</details>

<details>

<summary><strong>Mailchimp</strong> actions</summary>

{% hint style="warning" %}
**Deprecated:** This section covers the Mailchimp plugin, which is deprecated and no longer officially supported or maintained.
{% endhint %}

The Mailchimp plugin lets you connect to a Mailchimp account via its API to send emails.

</details>

<details>

<summary><strong>Mixpanel</strong> actions</summary>

### Send an event to Mixpanel

Sends an event to Mixpanel to track activity.

#### Event name

Select or create the event name.

#### Additional values

Define key/value pairs to send additional data.

### Send the user to Mixpanel

Registers the user with Mixpanel so events are grouped under one user.

#### User name or id

Defines how the user is identified in Mixpanel.

#### Additional values

Define key/value pairs to send additional data.

### Send a user charge to Mixpanel

Sends a monetary charge tied to a specific user.

#### Charge amount

Amount of the charge to track.

#### Additional values

Define key/value pairs to send additional data.

### Delete the current user from Mixpanel

Deletes the current user from Mixpanel.

</details>

<details>

<summary><strong>Mouse &#x26; Keyboard Interactions</strong> actions</summary>

### Reposition

Repositions an element on the page. Works for popups, floating groups, alerts, and group focuses.

#### X position

Horizontal coordinate where the element’s top-left corner moves.

#### Y position

Vertical coordinate where the element’s top-left corner moves.

</details>

<details>

<summary><strong>Recorder</strong> actions</summary>

{% hint style="warning" %}
This section covers the Recorder plugin, which is deprecated and no longer officially supported or maintained.
{% endhint %}

This plugin lets you add an Audio recorder to your app, using the browser Audio API. It can also display a sound visualizer.

</details>

<details>

<summary><strong>SelectPDF</strong> actions</summary>

### Generate PDF from a web page

Generates a PDF document from a page.

#### File name

Name of the generated PDF file.

#### URL type

Selects whether the page is internal or external.

#### Page (internal page)

The page within the app to generate the PDF from.

#### Data to send (internal page)

Values displayed on the page when generating the PDF.

#### Destination URL (external page)

URL of the external page to generate the PDF from.

#### Page size

Dimensions of the PDF page.

#### Page orientation

Orientation of the PDF document.

#### Page margin

Margin around the page content.

#### Keep images together

Prevents images from being split across pages.

#### Min load time

Minimum time required before generating the PDF.

#### Render page as

User context used to render the page.

#### Make this PDF private

Applies privacy settings to the generated PDF.

#### Rendering engine

Rendering engine used to generate the PDF.

</details>

<details>

<summary><strong>Slack</strong> actions</summary>

### Get Slack Bot Data

Retrieves data from Slack such as team members and channels.

### Post to channel as user

Posts a message to a Slack channel as the user.

#### Channel ID

Identifier of the Slack channel.

#### Message

Content of the post.

### Post to channel as bot

Posts a message to a Slack channel as a bot.

#### Channel ID

Identifier of the Slack channel.

#### Message

Content of the post.

### Send a message as user

Sends a direct message as the user.

#### Recipient User ID

Identifier of the recipient user.

#### Message

Content of the message.

### Add a teammate to a Slack channel

Adds a user to a Slack channel.

#### Channel ID

Identifier of the Slack channel.

#### Teammate ID

Identifier of the user to add.

### Set a Slack reminder

Creates a reminder in Slack.

#### Reminder Text

Content of the reminder.

#### Reminder Time

Time the reminder is sent.

</details>

<details>

<summary><strong>Segment</strong> actions</summary>

### Track an event with Segment

Tracks an event on the client side.

#### Event name

Select or create the event name.

#### Additional values

Define key/value pairs to send additional data.

### Track an event with Segment (Server)

Tracks an event from the Bubble server for higher reliability.

#### Event name

Select or create the event name.

#### Additional values

Define key/value pairs to send additional data.

### Send a page view to Segment

Registers a page view with Segment.

#### Page category

Select or create a page category.

#### Additional values

Define key/value pairs to send additional data.

### Identify a user with Segment

Associates events with a specific user.

</details>

<details>

<summary><strong>Stripe</strong> actions</summary>

### Charge the current user

Charges the current user and prompts them to enter their credit card information.

#### Payer email

Email of the user to charge.

#### Amount

Amount to charge.

#### Name

Product name shown in checkout and Stripe emails.

#### Description

Description shown in checkout and Stripe emails.

#### Image

Image shown in checkout.

#### Currency

Currency of the transaction.

#### Button caption

Caption for the button on the Stripe Checkout form.

#### Statement descriptor

Text shown on the customer’s statement.

#### Authorize the charge only

Creates an authorization without capturing the charge immediately.

#### The payee of this transaction is another user

Sends the payment to another user instead of your own Stripe account.

#### Transaction payee

User who receives the payment.

#### App fee

Fee charged by the platform on the transaction.

#### Allow promotion codes (v3)

Lets users enter a promotion code at checkout.

#### Add tax rate to checkout (v3)

Adds one or more tax rates to checkout.

**Tax rate IDs source**

Defines whether tax rate IDs are provided as static or dynamic values.

**Tax rate IDs (press Enter between each ID)**

Static list of Stripe tax rate IDs.

**Tax rate IDs**

Dynamic list of Stripe tax rate IDs.

#### Do not show success message

Prevents Bubble’s default success message.

### Collect the user's CC information

Prompts the user to enter credit card information without charging the card.

#### Update existing main card

Updates the current user’s default card instead of adding a new one.

#### Do not show success message

Prevents Bubble’s default success message.

### Charge a user using saved CC

Charges a user who already has saved credit card information.

#### Charged user

User to charge.

#### Amount

Amount to charge.

#### Currency

Currency of the transaction.

#### Name

Product name shown in checkout and Stripe emails.

#### Description

Description shown in checkout and Stripe emails.

#### Image

Image shown in checkout.

#### The payee of this transaction is another user

Sends the payment to another user instead of your own Stripe account.

#### Transaction payee

User who receives the payment.

#### App fee

Fee charged by the platform on the transaction.

#### Card ID to charge

Specific saved card to charge. If empty, the default card is used.

#### Do not show success message

Prevents Bubble’s default success message.

### Capture an authorized charge

Captures a charge that was previously authorized.

#### Charge ID

ID of the charge to capture.

#### Do not show success message

Prevents Bubble’s default success message.

### Create an invoice

Creates a draft invoice for the user.

#### User

User associated with the invoice.

#### Subscription ID

Optional subscription to associate with the invoice.

#### Automatic collection

Controls whether Stripe automatically retries failed payments.

### Update an invoice

Updates a draft invoice.

#### Invoice ID

ID of the invoice to update.

#### Description

Text added to the invoice.

#### Auto advance

Controls whether Stripe performs automatic collection.

### Register the user as a seller

Starts Stripe Connect onboarding so a user can receive payments.

#### Business email

Prefilled business email.

#### Business URL

Prefilled business URL.

#### Business name

Prefilled business name.

#### Business address

Prefilled business address.

#### Product category

Prefilled product category.

#### Sold products are physical products

Indicates whether the user sells physical products.

#### Product description

Prefilled product description.

### Subscribe the user to a plan

Subscribes a user to a Stripe plan.

#### Apply this action to the current user

Applies the action to the current user by default.

#### Subscribed user

User to subscribe.

#### Update existing subscription

Updates an existing subscription instead of creating a new one.

#### Subscription ID (opt.)

Specific subscription to update.

#### Dynamically specify plan

Lets the plan be set dynamically.

#### Subscription type

Defines whether the subscription contains one or multiple plans.

#### Plan name

Plan to subscribe the user to.

#### Quantity

Quantity applied to the plan.

#### Subscription Items

List of plans and quantities to add to the subscription.

#### Apply a coupon to this subscription (v2)

Lets you enter a coupon ID.

#### Coupon ID

Coupon ID to apply.

#### Payment behavior

Stripe payment behavior setting for the subscription.

#### Allow promotion codes (v3)

Lets users enter a promotion code at checkout.

#### Add tax rate to checkout (v3)

Adds one or more tax rates to checkout.

**Tax rate IDs source**

Defines whether tax rate IDs are provided as static or dynamic values.

**Tax rate IDs (press Enter between each ID)**

Static list of Stripe tax rate IDs.

**Tax rate IDs**

Dynamic list of Stripe tax rate IDs.

#### Tax percent (v2)

Tax percentage applied to the subscription invoice subtotal.

#### End of the trial

Date when the trial period ends.

#### Do not show success message

Prevents Bubble’s default success message.

### Update Stripe Customer

Updates email and address for an existing Stripe customer.

#### Apply this action to the current user

Applies the action to the current user by default.

#### Subscribed User

User whose Stripe customer record is updated.

#### Email

New email address.

#### Address

New address.

### Create a Stripe Coupon

Creates a coupon in Stripe.

#### Coupon Name

Name of the coupon.

#### Amount Off

Fixed amount discounted by the coupon.

#### Percent Off

Percentage discounted by the coupon.

#### Duration

How long the coupon can be applied.

#### Duration in Months

Number of months for repeating coupons.

#### Expiration date

Date after which the coupon is no longer valid.

#### Currency

Currency used by the coupon.

#### Max redemption

Maximum number of redemptions.

### Apply a coupon to the user's subscription

Applies a coupon to a user’s subscription.

#### Apply this action to the current user

Applies the action to the current user by default.

#### Subscribed user

User to apply the coupon to.

#### Subscription ID

Specific subscription to update. If empty, the coupon is applied at the customer level.

#### End of the trial

Date when the trial period ends.

#### Do not show success message

Prevents Bubble’s default success message.

### Create an invoice item

Creates an invoice item for the user.

#### User

User associated with the invoice item.

#### Amount

Amount to charge.

#### Currency

Currency of the invoice item.

#### Description

Description shown in Stripe emails.

#### Subscription ID

Optional subscription to associate with the invoice item.

#### Add tax rate to invoice item

Adds one or more tax rates to the invoice item.

**Tax rate IDs source**

Defines whether tax rate IDs are provided as static or dynamic values.

**Tax rate IDs (press Enter between each ID)**

Static list of Stripe tax rate IDs.

**Tax rate IDs**

Dynamic list of Stripe tax rate IDs.

### Pay an invoice

Finalizes and charges an invoice.

#### Invoice ID

ID of the invoice to pay.

### Cancel an Invoice

Cancels an invoice by setting its status.

#### Invoice ID

ID of the invoice to cancel.

#### Status

New invoice status.

### Create a refund

Refunds a previously created charge.

#### Charge ID

ID of the charge to refund.

### Cancel the current user's plan

Cancels a Stripe subscription.

#### Apply this action to the current user

Applies the action to the current user by default.

#### Subscribed user

User to unsubscribe.

#### Cancel all subscriptions

Cancels all subscriptions on the user.

#### Subscription ID

Specific subscription to cancel.

#### Do not show success message

Prevents Bubble’s default success message.

#### Cancelation mode

Defines whether cancellation happens immediately or at the end of the billing period.

### Create a subscription item

Adds a plan to an existing subscription.

#### Subscription ID

Subscription to update.

#### Plan name

Plan to add.

#### Quantity

Quantity applied to the plan.

### Update a subscription item

Updates a plan within an existing subscription.

#### Subscription Item ID

Subscription item to update.

#### Plan name

Plan to use.

#### Quantity

Quantity applied to the plan.

### Delete a subscription item

Deletes a plan from an existing subscription.

#### Subscription Item ID

Subscription item to delete.

### Make a card new default

Makes a saved card the current user’s default payment method.

#### Credit Card ID

Card ID to make default.

### Delete a credit card

Deletes a saved credit card for the current user.

#### Credit Card ID

Card ID to delete.

### Retrieve all user invoices

Retrieves invoices for a user.

### Set a user's credit balance

Sets an absolute Stripe customer balance for a user.

#### User

User whose balance is set.

#### Amount

Absolute balance value to set.

### Adjust a user's credit balance

Credits or debits a user’s Stripe credit balance.

#### User

User whose balance is adjusted.

#### Type of adjustment

Whether the adjustment is a credit or debit.

#### Amount

Amount to credit or debit.

#### Currency

Currency of the adjustment.

### Transfer to seller

Transfers funds from your Stripe account to a connected seller account.

#### Amount

Amount to transfer.

#### Currency

Currency of the transfer.

#### Destination seller

User receiving the transfer.

#### Description

Optional transfer description.

#### Source charge ID

Optional source charge ID for the transfer.

#### Transfer group

Optional identifier for grouping transfers.

### Create payout

Sends a payout from your Stripe balance to your linked bank account.

#### Amount

Amount to send.

#### Currency

Currency of the payout.

#### Enter API Key

Opens plugin settings if required live keys are missing.

### Create a Stripe value list item

Creates a new Stripe Radar value list item.

#### Value list ID

ID of the parent value list.

#### Value

Value of the item.

#### Enter API Key

Opens plugin settings if required live keys are missing.

### Create a Tax ID

Creates a tax ID in Stripe for the current user.

#### type

Type of tax ID.

#### value

Tax ID value.

### Delete a Tax ID

Deletes a tax ID associated with the current user.

#### Tax ID

Identifier of the tax ID.

### Stripe Tax IDs

Returns a list of the current user’s tax IDs.

#### Limit

Maximum number of tax IDs to return.

### Retrieve Tax ID

Returns a specific tax ID.

#### Tax ID

Identifier of the tax ID.

</details>

<details>

<summary><strong>Tinder-like pile</strong> actions</summary>

## Swipe a tinder-like pile right

Swipes the currently visible Tinder-like card right.

### Element

Specifies which Tinder-like pile element the action applies to.

## Swipe a tinder-like pile left

Swipes the currently visible Tinder-like card right.

### Element

Specifies which Tinder-like pile element the action applies to.

</details>

<details>

<summary><strong>Twilio</strong> actions</summary>

{% hint style="warning" %}
**Deprecated:** This section covers the Mailchimp plugin, which is deprecated and no longer officially supported or maintained.
{% endhint %}

The Twilio plugin lets you connect to a Twilio account via its API.

</details>

<details>

<summary><strong>Zapier</strong> actions</summary>

## Trigger a zap

### Zapier trigger

The trigger that you want to run. Triggers are configured in the Zapier plugin in the Plugins tab.

</details>
