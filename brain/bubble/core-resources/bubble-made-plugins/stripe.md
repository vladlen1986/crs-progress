# Stripe
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/stripe · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Stripe Plugin charges credit cards and handles subscriptions for users. Strong Customer Authentication (SCA) is supported and can be enabled from the plugin menu by selecting “Checkout v3” in the dropdown.

See [Stripe’s documentation](https://stripe.com/docs) for more information.

## Charge the current user

This action charges the current user and prompts them to enter their credit card information. The response from Stripe, e.g., the Stripe charge ID, amount, confirmation, etc., can be accessed in the subsequent actions as 'Result of previous step.' In a failed transaction, the workflow will stop running. See [Stripe's documentation](https://stripe.com/docs/api#charge_object) for more details.

### Payer email

Define the email of the user to charge. Often, it will be 'Current user's email.'

### Amount

Enter the amount to be charged. It can be dynamic using the 'Insert dynamic data' button.

### Name

Enter the product name that will appear in the checkout flow and in the email users receive from Stripe.

### Description

Enter the description that will appear in the checkout flow and in the email users receive from Stripe.

### Image

The image that will appear in the checkout flow.

### Currency

Enter the currency of the transaction. If the currency is not in the list you can type it.

### Button caption

This is the caption for the button on the Stripe Checkout form. The amount will be added to the caption in Live mode.

### Statement descriptor

Optional, use this to change how this payment will show up on the customer's statement. What you enter will be appended to the "shortened descriptor set in your Stripe account, in the manner of "YOUR-APP\*DESCRIPTOR". This overall string has a character limit of 21; anything past that will be truncated. In Stripe's v3 checkout, this field will comprise the entirety of the statement descriptor.

### Authorize the charge only

This determines whether to immediately capture the charge. When checked, the charge issues an authorization and will need to be captured later. Uncaptured charges expire in 7 days. You can then capture the charge in your Stripe dashboard.

### The payee of this transaction is another user

When setting up a marketplace, check this box so payment will go to another user instead of your own Stripe account. For this to work, you must build a flow where users can [register as a seller](#register-the-user-as-a-seller), connecting their Stripe account to get paid.

### Transaction payee

In the case of a marketplace, define who gets the payment. This is likely the 'Current list thing's creator.' This user must register as a seller for the transaction to process.

### App fee

You can charge a fee on transactions, but it must a currency amount and not a percentage.You can, however, compute the value in the field using the Composer.

### Allow promotion codes (v3)

Check this box to allow your users to enter a promotion or discount code when they are sent to checkout. Coupon codes can be created in your Stripe Dashboard. See [Stripe Documentation](https://stripe.com/docs/billing/subscriptions/discounts/codes) for more details.

### Add tax rate to checkout (v3)

Check this box to add a tax rate or list of tax rates to the user's invoice. Before you check this box, be sure to create your [Tax Rate](https://stripe.com/docs/payments/checkout/taxes) objects in your Stripe Dashboard. If the transaction payee is another user, make sure the Tax Rate object is from the Connected account, not your own Stripe account.

{% hint style="info" %}
While Stripe offers both Fixed & Dynamic Tax rates, the Stripe Plugin only supports Fixed tax rates at this time. See [Stripe Documentation](https://stripe.com/docs/payments/checkout/taxes) to learn more about Fixed vs Dynamic tax rates.
{% endhint %}

#### Tax rate IDs source

This dropdown element allows you to input your tax rate IDs as static choices or dynamic data from the application database or Option set. In this dropdown menu, choose between Static IDs or Dynamic IDs.

#### Tax rate IDs (press Enter between each ID) <a href="#tax-rate-ids-static" id="tax-rate-ids-static"></a>

This static input allows you to paste in your Stripe tax rate ID or list of tax rate IDs by separating each entry with a new line. All tax rates entered here will be applied to the user checkout session.

#### Tax rate IDs <a href="#tax-rate-ids-dynamic" id="tax-rate-ids-dynamic"></a>

This dynamic input allows you to select a list of tax rate ids dynamically from your application, whether from the database, option set, or other datasource. This selection must evaluate to a list of texts.

If you'd like to specify a single tax rate ID, use the [:converted to list](https://manual.bubble.io/core-resources/data/operations-and-comparisons#converted-to-list) operator. See the example below:

{% hint style="success" %}
If your tax rate IDs are stored in an [Option set](https://manual.bubble.io/help-guides/structuring-an-application/option-sets) named Tax Rates, and you'd like to select a single option named "Sales Tax" with the attribute "ID", your dynamic expression would look like:`Sales Tax:converted to list's ID`
{% endhint %}

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

## Collect the user's CC information

This action prompts the user to enter their credit card information without actually charging the card. Use this to delay the payment, for instance, if you are building a crowdfunding-based system. If the user fails to enter their card information, the workflow will stop running.

### Update existing main card

If you check this box, the current user’s default credit card, if any, will be updated. However, the original credit card will still exist in the current user’s full list of credit cards unless it is explicitly deleted in a separate workflow action. If the box is not checked, the new credit card will be added to the current user’s full list of credit cards, but their default credit card will not change.

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

## Charge a user using saved CC

This action charges a user who has already entered their credit card information. It does not have to be the current user in this case. If no credit card information is available, the action will fail. The response from Stripe, e.g., the Stripe charge ID, amount, confirmation, etc., can be accessed in the subsequent actions as 'Result of previous step.' In a failed transaction, the workflow will stop running.

### Charged user

Define the user to charge. This user must be signed up already because we need to have their saved credit card information. The user does not need to be logged in for the transaction to happen.

### Amount

Enter the amount to charge. It can be dynamic using the 'Insert dynamic data' button.

### Currency

Enter the currency of the transaction. If the currency is not in the list you can type it.

### Name

Enter the product name that will appear in the checkout flow and in the email users receive from Stripe.

### Description

Enter the description that will appear in the checkout flow and in the email users receive from Stripe.

### Image

The image that will appear in the checkout flow.

### The payee of this transaction is another user

When setting up a marketplace, check this box so payment will go to another user instead of your own Stripe account. For this to work, you must build a flow where users can [register as a seller](#register-the-user-as-a-seller), connecting their Stripe account to get paid.

### Transaction payee

In the case of a marketplace, define who gets the payment. This is likely the 'Current list thing's creator.' This user must register as a seller for the transaction to process.

### App fee

You can charge a fee on transactions, but it must a currency amount and not a percentage.You can, however, compute the value in the field using the Composer.

### Card ID to charge

You can optionally specific a card ID to charge. If this field is not filled, the default card of the user will be used.

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

## Capture an authorized charge

This action lets you capture a charge that has already been authorized by Stripe. Note that uncaptured charges expire after 7 days, per Stripe's documentation.

### Charge ID

Charge ID of the charge you want to capture.

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

## Create an invoice

This action creates a draft invoice for the user. It contains all pending invoice items on that user. The drafted invoice cannot be paid or sent until it is finalized.

### User

Define the user to charge. If the user does not have a credit card on file, the action will fail.

### Subscription ID

If no Subscription ID is given, all pending invoice items for the charged user will be included in the created invoice. Otherwise, the created invoice will include both pending invoice items for that subscription and pending invoice items not associated with any subscription. Billing cycle and regular subscription events associated to that subscription will not be affected.

### Automatic collection

When the invoice fails to be charged, you can enable this feature to allow Stripe's Smart Retries to automatically choose optimal times to retry failed payments. If set to false, no actions will be taken to advance the invoice's state automatically.

## Update an invoice

This action updates the details of an invoice.

{% hint style="warning" %}
Only invoice drafts can be edited.
{% endhint %}

### Invoice ID

The ID of the invoice you want to update.

### Description

Extra string of text that can be added to the invoice. Visible to the recipient of the invoice. This field is referenced as "Memo" in the Stripe Dashboard.

### Auto advance

Controls whether Stripe will perform automatic collection of the invoice.

## Register the user as a seller

This action enables users to become merchants on your platform. For example, if you want to build a marketplace where users can sell their work to someone else, then they need to be able to credit their account when a transaction occurs. Your app will usually take a commission, which can be set when setting up the actions "[Charge a user using saved cc](#charge-a-user-using-saved-cc)" and "[Charge the current user](#charge-the-current-user)". You must create an application on Stripe to enable this type of transaction.

{% hint style="info" %}
In v3 of the plugin, the registering seller will be directed to a Stripe-hosted seller onboarding experience.

At this time, only Connect **Standard** account onboarding is supported with this method.
{% endhint %}

See [Stripe Connect](https://stripe.com/connect) for more information. *Important:* You need to set the redirection URIs in Stripe as '<https://bubble.io/poststripeauth>' or '<https://d##.bubble.is/poststripeauth>' for Dedicated environments in order for this to work. In addition, be sure to add the Connect client ID to your Stripe Plugin settings. Both the client ID and redirect URI settings can be found in your Stripe Dashboard > Settings > Connect settings.

### Business email

Prefill information to ease the process with Stripe. Enter the email the user is likely to use.

### Business URL

Prefill information to ease the process with Stripe. Enter the URL the user is likely to use.

### Business name

Prefill information to ease the process with Stripe. Enter the name the user is likely to use.

### Business address

Prefill information to ease the process with Stripe. Enter the address the user is likely to use.

### Product category

Prefill information to ease the process with Stripe. Enter the product category the user is likely to sell.

### Sold products are physical products

Prefill information to ease the process with Stripe. Enter whether the user is likely to sell a physical product.

### Product description

Prefill information to ease the process with Stripe. Enter the type of product the user is likely to sell.

## Subscribe the user to a plan

This action subscribes a user to a plan, which was previously defined in Stripe. Then, the card will be charged on a regular basis. If the user is already on a plan, their subscription will be updated to the new plan. If the user fails to enter their credit card information, the workflow will stop running.

{% hint style="info" %}
Since the app has two versions, Development and Live, you need to have both versions of your account in Stripe to have the same plans with the same IDs.
{% endhint %}

### Apply this action to the current user

By default, the 'Subscribe user' action applies to the currently logged in user. To apply the operation to another user, uncheck this box.

### Subscribed user

Define the user to subscribe to a plan. This user must be signed up already because we need to have their saved credit card information. The user does not need to be logged in for the transaction to happen.

### Update existing subscription

If you check this box, the current user's subscription, if any, will be updated. If the box is not check, a new subscription will be added to the user.

### Subscription ID (opt.)

If you want to update an existing subscription, you can define here the subscription ID (returned by Stripe). If this is empty, the action will modify the first subscription returned by Stripe.

### Dynamically specify plan

By default, the plan is chosen in a dropdown menu. To make the plan dynamic, check this box.

### Subscription type

You can either pick one plan (most common case), or include more than one plan in the subscription.

### Plan name

Once you enter your keys in the Stripe section in the Plugins Tab, we fetch the plans you created with Stripe to populate this list. Select the plan to subscribe the user to. If the plan is dynamic, the value must be one of the plans defined in your Stripe account.

{% hint style="info" %}
Since the app has two versions, Development and Live, you need to have both versions of your account in Stripe to have the same plans with the same IDs.
{% endhint %}

### Quantity

Enter the quantity to apply to the plan. In most cases it will be 1, but to have variable pricing on the plan, use this.

### Subscription Items

You can define a list of plans/quantity to add to the subscriptions

### Apply a coupon to this subscription (v2)

To provide discounts to certain customers, create coupon codes in the Stripe Dashboard. Check this box to enter a coupon ID.

### Coupon ID

Enter the coupon ID. It can be dynamic information coming from an input.

### Payment behavior

Select the payment behavior as specified in the Stripe documentation. See [this link](https://stripe.com/docs/api/subscriptions/create#create_subscription-payment_behavior) for creating a new subscription and [this link](https://stripe.com/docs/api/subscriptions/update#update_subscription-payment_behavior) for updating an existing subscription.

### Allow promotion codes (v3)

Check this box to allow your users to enter a promotion or discount code when they are sent to checkout. Coupon codes can be created in your Stripe Dashboard. See [Stripe Documentation](https://stripe.com/docs/billing/subscriptions/discounts/codes) for more details.

### Add tax rate to checkout (v3) <a href="#subscription-add-tax-rate-to-checkout-v-3" id="subscription-add-tax-rate-to-checkout-v-3"></a>

Check this box to add a tax rate or list of tax rates to the user's invoice. Before you check this box, be sure to create your [Tax Rate](https://stripe.com/docs/billing/taxes/tax-rates) objects in your Stripe Dashboard.

{% hint style="info" %}
While Stripe offers both Fixed & Dynamic Tax rates, the Stripe Plugin only supports Fixed tax rates at this time. See [Stripe Documentation](https://stripe.com/docs/billing/taxes/tax-rates) to learn more about Fixed vs Dynamic tax rates.
{% endhint %}

#### Tax rate IDs source <a href="#subscription-tax-rate-ids-source" id="subscription-tax-rate-ids-source"></a>

This dropdown element allows you to input your tax rate IDs as static choices or dynamic data from the application database or Option set. In this dropdown menu, choose between Static IDs or Dynamic IDs.

#### Tax rate IDs (press Enter between each ID) <a href="#subscription-tax-rate-ids-static" id="subscription-tax-rate-ids-static"></a>

This static input allows you to paste in your Stripe tax rate ID or list of tax rate IDs by separating each entry with a new line. All tax rates entered here will be applied to the user checkout session.

#### Tax rate IDs <a href="#subscription-tax-rate-ids-dynamic" id="subscription-tax-rate-ids-dynamic"></a>

This dynamic input allows you to select a list of tax rate ids dynamically from your application, whether from the database, option set, or other datasource. This selection must evaluate to a list of texts.

If you'd like to specify a single tax rate ID, use the [:converted to list](https://manual.bubble.io/core-resources/data/operations-and-comparisons#converted-to-list) operator. See the example below:

{% hint style="success" %}
If your tax rate IDs are stored in an [Option set](https://manual.bubble.io/help-guides/structuring-an-application/option-sets) named Tax Rates, and you'd like to select a single option named "Sales Tax" with the attribute "ID", your dynamic expression would look like:`Sales Tax:converted to list's ID`
{% endhint %}

### Tax percent (v2) <a href="#tax-percent" id="tax-percent"></a>

Enter the tax percentage, which should be a positive decimal between 1 and 100. It can be dynamic using the Composer. This represents the percentage of the subscription invoice subtotal that will be calculated and added as tax to the final amount for each billing period. For example, a plan that charges $10/month with a tax percent of 20.0 will charge $12 per invoice.

### End of the trial

Enter the date representing the end of the trial period. After this time, the customer will be charged. When selected, this setting overrides the default trial period of the plan the customer is subscribed to.

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

## Update Stripe Customer

This action modifies email and address for an existing Stripe customer.

### Apply this action to the current user

By default, the 'Subscribe user' action applies to the currently logged in user. To apply the operation to another user, uncheck this box.

### Subscribed User

Define the user to subscribe to a plan. This user must be signed up already because we need to have their saved credit card information. The user does not need to be logged in for the transaction to happen.

### Email

Enter the new email user would like to update to

### Address

Enter the new address user would like to update to

## Create a Stripe Coupon

This action creates a coupon which can be used by any Stripe customer.

### Coupon Name

Name of the coupon displayed to customers

### Amount Off

Amount (in the `currency` specified) that will be taken off via the coupon

### Percent Off

Percentage that will be taken off via the coupon

### Duration

How long a customer can apply the coupon for. Choose one from `forever`, `once`, and `repeating`.

### Duration in Months

If `duration` is `repeating`, the number of months the coupon applies.

### **Expiration date**

After this date, the coupon will be no longer valid

### **Currency**

Enter the currency of the coupon. If the currency is not in the list you can type it.

### **Max redemption**

Maximum number of times a customer can redeem the coupon for

## Apply a coupon to the user's subscription

This action applies a coupon/discount to the current user's subscription

### Apply this action to the current user

By default, the 'Apply a coupon to the user's subscription' action applies to the currently logged in user. To apply the operation to another user, uncheck this box.

### Subscribed user

Define the user to apply a coupon to. This user must be signed up already because we need to have their saved credit card information. The user does not need to be logged in for the transaction to happen.

### Subscription ID

If you want to update an existing subscription, you can define here the subscription ID (returned by Stripe). If this is empty, the action will modify the customer object in Stripe and all plans will have the coupon applied to them.

### End of the trial

Enter the date when the trial period should end. If left empty, no trial period will apply.

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

## Create an invoice item

This action creates an invoice item for the user. The invoice item will be paid with the next invoice.

{% hint style="warning" %}
**Note:** Since the introduction of the Bubble Stripe plugin, Stripe has clarified and updated some of its terminology. For this plugin, what Bubble calls a "line item" is what Stripe calls an "invoice line item" - these have Stripe IDs starting with 'il\_' and are entries on an existing invoice. The change Stripe made was to have its own concept of "line items" which correspond to future entries on the next invoice; these Stripe IDs start with 'ii\_' and can exist separately from an invoice. Bubble still uses its original definition of 'line items' (i.e. as Stripe's 'invoice line items') for the time being.
{% endhint %}

### User

Define the user to charge. If the user does not have a credit card on file, the action will fail.

### Amount

Enter the amount to charge. It can be dynamic using the 'Insert dynamic data' button.

### Currency

Enter the currency of the transaction. If the currency is not in the list you can type it.

### Description

Enter the description that will appear in the email users receive from Stripe.

### Subscription ID

To add the invoice item to an existing subscription, specify the Stripe Subscription ID. This is an optional field.

### Add tax rate to invoice item

Check this box to add a tax rate or list of tax rates to the user's invoice item. Before you check this box, be sure to create your [Tax Rate](https://stripe.com/docs/billing/taxes/tax-rates) objects in your Stripe Dashboard.

{% hint style="info" %}
While Stripe offers both Fixed & Dynamic Tax rates, the Stripe Plugin only supports Fixed tax rates at this time. See [Stripe Documentation](https://stripe.com/docs/billing/taxes/tax-rates) to learn more about Fixed vs Dynamic tax rates.
{% endhint %}

#### Tax rate IDs source <a href="#subscription-tax-rate-ids-source" id="subscription-tax-rate-ids-source"></a>

This dropdown element allows you to input your tax rate IDs as static choices or dynamic data from the application database or Option set. In this dropdown menu, choose between Static IDs or Dynamic IDs.

#### Tax rate IDs (press Enter between each ID) <a href="#subscription-tax-rate-ids-static" id="subscription-tax-rate-ids-static"></a>

This static input allows you to paste in your Stripe tax rate ID or list of tax rate IDs by separating each entry with a new line. All tax rates entered here will be applied to the user checkout session.

#### Tax rate IDs <a href="#subscription-tax-rate-ids-dynamic" id="subscription-tax-rate-ids-dynamic"></a>

This dynamic input allows you to select a list of tax rate ids dynamically from your application, whether from the database, option set, or other datasource. This selection must evaluate to a list of texts.

If you'd like to specify a single tax rate ID, use the [:converted to list](https://manual.bubble.io/core-resources/data/operations-and-comparisons#converted-to-list) operator. See the example below:

{% hint style="success" %}
If your tax rate IDs are stored in an [Option set](https://manual.bubble.io/help-guides/structuring-an-application/option-sets) named Tax Rates, and you'd like to select a single option named "Sales Tax" with the attribute "ID", yo
{% endhint %}

## Pay an invoice

This action finalizes a draft invoice and immediately charges a pending invoice. It uses the card the user has on file.

### Invoice ID

Enter the Stripe invoice ID to charge.

## Cancel an Invoice

This action cancels an invoice by setting its status to void or uncollectible. For more information, check out the Stripe documentation for [Void an Invoice](https://stripe.com/docs/api/invoices/void) and [Mark as Uncollectible](https://stripe.com/docs/api/invoices/mark_uncollectible).

### Invoice ID

Enter the Stripe invoice ID to cancel.

### Status

Select the invoice's new status (void or uncollectible)

## Create a refund

This action fully refunds a previously created charge that has not already been refunded.

### Charge ID

Charge ID of the charge you want to refund.

## Cancel the current user's plan

This action cancels a subscription with Stripe. The card will not be charged anymore.

### Apply this action to the current user

By default, the 'Cancel Plan' action applies to the currently logged in user. To apply the operation to another user, uncheck this box.

### Subscribed user

Define the user to unsubscribe. This user must be signed up already. The user does not need to be logged in for the transaction to happen.

### Cancel all subscriptions

If this box is checked, all subscriptions on the user will be canceled. If not, you will be able to specify a subscription ID.

### Subscription ID

If you want to cancel an existing subscription (and keep the other subscriptions running), you can define here the subscription ID (returned by Stripe).

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

### Cancelation mode

By default, plans will be canceled immediately when using this action (set to *Immediately*). If you would prefer to wait until the end of the subscription’s billing period to cancel the user's plan, you can set the cancelation mode to *End of billing period.*

This will update the subscription interface in Stripe with the upcoming cancelation date, shown as 'Cancels \[Date]', where '\[Date]' is the end of the plan's billing period:

<figure><img src="/files/m6G0lwpviv31QNc0OJtj" alt=""><figcaption></figcaption></figure>

{% hint style="warning" %}
The setting *End of billing period* is an **advanced setting**. It is important that you have set up a Stripe webhook so that you can be notified by Stripe of changes and respond to the event ‘customer.subscription.deleted’. This event is fired at the end of the billing period when Stripe ends the subscription, however, your web app will not update unless you process the webhook event.

Please see our guide to [webhooks](https://manual.bubble.io/help-guides/integrations/api/introduction-to-apis#webhooks) in Bubble and Stripe’s guide to [webhooks](https://docs.stripe.com/webhooks) for more information.
{% endhint %}

## Create a subscription item

This action adds a plan to an existing subscription.

### Subscription ID

Define here the subscription ID (returned by Stripe) to add the plan to.

### Plan name

Once you enter your keys in the Stripe section in the Plugins Tab, we fetch the plans you created with Stripe to populate this list. Select the plan to subscribe the user to. If the plan is dynamic, the value must be one of the plans defined in your Stripe account.

{% hint style="info" %}
Since the app has two versions, Development and Live, you need to have both versions of your account in Stripe to have the same plans with the same IDs.
{% endhint %}

### Quantity

Enter the quantity to apply to the plan. In most cases it will be 1, but to have variable pricing on the plan, use this.

## Update a subscription item

This action modifies a plan to an existing subscription that has more than one plan.

### Subscription Item ID

Define here the subscription item D (returned by Stripe) to update.

### Plan name

Once you enter your keys in the Stripe section in the Plugins Tab, we fetch the plans you created with Stripe to populate this list. Select the plan to subscribe the user to. If the plan is dynamic, the value must be one of the plans defined in your Stripe account.

{% hint style="info" %}
Since the app has two versions, Development and Live, you need to have both versions of your account in Stripe to have the same plans with the same IDs.
{% endhint %}

### Quantity

Enter the quantity to apply to the plan. In most cases it will be 1, but to have variable pricing on the plan, use this.

## Delete a subscription item

This action deletes a plan to an existing subscription that has more than one plan. The subscription will still keep going after the deletion.

### Subscription Item ID

Define here the subscription item ID (returned by Stripe) to delete.

## Make a card new default <a href="#make-a-card-new-default" id="make-a-card-new-default"></a>

This action modifies the current user and makes a card the new default payment mean.

### Credit Card ID

Define here the card ID (returned by Stripe) to use.

## Delete a credit card <a href="#delete-a-credit-card" id="delete-a-credit-card"></a>

This action deletes a credit card on the current user.

### Credit Card ID

Define here the card ID (returned by Stripe) to delete.

## Retrieve all user invoices

This user call retrieves all user invoices based on the email of the user.

{% hint style="info" %}
Because of limitations associated with the Stripe API, we can only retrieve up to 100 invoices per user at this moment.
{% endhint %}

## Set a user's credit balance

This action uses the [Stripe Customer API](https://stripe.com/docs/api/customers) to set an absolute value for a customer's balance.

{% hint style="warning" %}
**Note:** This action does the same thing the legacy action "Adjust a user's balance" did. It has been renamed to more accurately reflect the action it performs - setting an absolute value rather than adjusting an existing value.
{% endhint %}

### User

Define the user that corresponds to the Stripe customer whose balance you'd like to set. The user must already be a Stripe customer in your system.

### Amount

Specify the absolute value of the above user's balance. For example, setting the value to $0 will wipe out any positive (amount owed) or negative (amount credited) value for the current customer balance.

## Adjust a user's credit balance

This action uses the [Stripe Credit Balance API](https://stripe.com/docs/api/customer_balance_transactions/create) to increase (debit) or decrease (credit) a user's Credit Balance. This action can be used to issue a credit to a user that will be documented as a Transaction on their account and applied to their next invoice. See [Stripe Documentation](https://stripe.com/docs/billing/customer/balance) for more detail.

### User

Define the user that corresponds to the Stripe customer whose balance you'd like to adjust. The user must already be a Stripe customer in your system.

### Type of adjustment

Select the type of adjustment you would like to issue to the above user. The options are **credit**, meaning you owe them money, or **debit,** meaning they owe you money.

### Amount

Specify the amount you would like to credit or debit from the user's Stripe credit balance, depending of the type of adjustment you selected above.

### Currency

Specify the currency (USD, EUR, etc.) of the amount. This currency must match the one set by the customer. If the customer’s currency is not set, it will be updated to this value.

## Transfer to seller

This action uses the [Stripe Transfer API](https://stripe.com/docs/api/transfers/create) to send funds from your Stripe account to a Connected (seller) account.

### Amount

Enter the amount to send. It can be dynamic using the 'Insert dynamic data' button.

### Currency

Enter the currency of the transaction. If the currency is not in the list you can type it.

### Destination seller

Enter the User that the money will be sent to. Note, the user must be a registered seller with a valid Connected account for the transfer to be valid.

### Description

Optionally enter a description of the Transfer to be shown on the record of the transaction.

### Source charge ID

Optionally enter the pre-authorized charge ID as the source of this transfer instead of the parent Stripe account balance.

### Transfer group

Optionally enter a text identifier for this individual transaction as a part of a group of transactions. More information on transfer groups can be found in the [Stripe Connect Documentation](https://stripe.com/docs/connect/charges-transfers#transfer-options).

## Create payout

This action sends a payout in the amount specified from your Stripe account balance to the bank account linked to your Stripe account.

### Amount

Enter the amount to send. It can be dynamic using the 'Insert dynamic data' button.

### Currency

Enter the currency of the transaction. If the currency is not in the list you can type it.

### Enter API Key

This button will appear if not all of your Live keys ([Client ID](#live-client-id), [Secret Key](#live-secret-key), [Publishable Key](#live-publishable-key)) are filled out in the Stripe plugin settings. Clicking this button will bring you to the plugin settings page so you can fill them out. Refer to the [Setup](#setup) section below for more information on these keys.

## **Create a Stripe value list item**

This action creates a new [Value List Item](https://stripe.com/docs/api/radar/value_list_items) object, which is added to the specified parent value list.

### **Value list ID**

Enter the identifier of the value list which the created item will be added to.

### **Value**

Enter the value of the item.

### Enter API Key

This button will appear if not all of your Live keys (Client ID, Secret Key, Publishable Key) are filled out in the Stripe plugin settings. Clicking this button will bring you to the plugin settings page so you can fill them out. Refer to the [Setup section](https://manual.bubble.io/core-resources/bubble-made-plugins/stripe#setup) for more information on these keys.

## Manage Tax IDs

### Create a Tax ID

* Action
  * Creates a tax ID in Stripe associated with the current user.
* Fields:
  * type: required; type of the tax id. (The available options are [here](https://stripe.com/docs/api/customer_tax_ids/object#tax_id_object-type))
  * value: required; value of the tax id. (string)

### Delete a Tax ID

* Action
  * Deletes a tax ID associated with the current user. If the tax ID doesn’t exist, we do nothing.
* Fields:
  * Tax ID: required; the identifier of this tax ID. (string)

### Stripe Tax IDs

* Action
  * Returns a list of all of the current user’s tax IDs.
* Fields:
  * Limit: optional; max is 5 per customer

### Stripe Tax IDs

* User data call (i.e., Current User’s Stripe Tax IDs)
  * Returns a list of all of the current user’s tax IDs.
* Fields:
  * Limit: optional; max is 5 per customer

### Retrieve Tax ID

* External data call
  * Returns a tax ID
* Fields:
  * Tax ID: required; the identifier of this tax ID. (string)

## Setup

You will need an active Stripe account before you can set up the Stripe plugin. Go to [Stripe](https://www.stripe.com) to create an account.

{% hint style="info" %}
**Note:** Stripe has two environments (like Bubble) Live and Test. If both environment keys are set below, your Bubble app will use the development (test) keys in development and the Live keys in Live.
{% endhint %}

### Live Client ID

Enter the Client ID from the Stripe Live environment. This information can be found in the Stripe Dashboard > Settings > Connect settings.

{% hint style="info" %}
**Note:** This key is only relevant if you will be using Stripe Connect functionality.
{% endhint %}

### Live Secret Key

Enter your Secret Key from the Stripe Live environment. This information can be found in the Stripe Dashboard > Developers > API Keys settings.

### Live Publishable Key

Enter your Publishable Key from the Stripe Live environment. This information can be found in the Stripe Dashboard > Developers > API Keys settings.

### Client ID - development

Enter the Client ID from the Stripe Test environment. This information can be found in the Stripe Dashboard > Settings > Connect settings.

### Secret Key - development

Enter your Secret Key from the Stripe Test environment. This information can be found in the Stripe Dashboard > Developers > API Keys settings.

### Publishable Key - development

Enter your Publishable Key from the Stripe Test environment. This information can be found in the Stripe Dashboard > Developers > API Keys settings.

### Image for Stripe Checkout

Add a default image to be included in your Stripe Checkout sessions.

### Name for Stripe Checkout

Enter a default product name that will appear in the checkout flow and in the email users receive from Stripe.

### Stripe Checkout Version

Select the version of the Stripe Plugin that you will like to use.

{% hint style="warning" %}
**Note:** v3 is strongly recommended as v2 relies on an outdated version of Stripe Checkout and is no longer supported.
{% endhint %}

### Enable Link on Checkout (v3)

This enables Link payments on any Stripe Checkout page that the user is directed to. If a user completes a transaction using Link, then that same payment method will be used for future transactions executed by the "Charge a user using saved CC" action.

### Collect the user's address with Checkout

Check this box if you would like to collect the user's address when collecting a customer's payment information during a Checkout session.

## FAQ

### **Can I use a custom domain with Stripe checkout**

Yes, you can choose to use a custom domain with Stripe Checkout and your Bubble app. This means you can send your customers to [checkout.yourbubbleapp.com](http://checkout.yourbubbleapp.com/) (or whatever subdomain you want to use) when they are transacting on your app instead of the default [checkout.stripe.com](http://checkout.stripe.com/). Note that Stripe charges an extra fee for custom domains.

In order to get a custom domain working, you’ll want to follow the steps listed in [Stripe’s documentation](https://stripe.com/docs/payments/checkout/custom-domains), namely:

1. Adding your domain to the Stripe Dashboard
2. Creating DNS records to point at Stripe
3. Verifying your DNS setup
4. Setting your domain as active

On the Bubble side, the Bubble-created official Stripe Plugin supports this feature, so once you’ve set things up on the Stripe and the DNS side, they’ll work in your app as well as long as you are using Checkout v3 within the plugin. The following actions will be affected:

* Charge the current user
* Subscribe the user to a plan
* Collect the user’s CC information

### **Stripe and Privacy Rules**

Privacy rules currently bundle certain fields under “Social Networks,” including Stripe customer data. If you would like to get the customer ID and subscription information, this field will need to be enabled. This privacy rule controls plugin-borne fields, most commonly social network signup fields. When you sign up with an OAuth provider like Facebook, for example, this controls your Facebook name and profile picture.

### Stripe and iFrames (v2)

By default, iFrames are blocked for your Bubble application, which will cause the Stripe v2 checkout to navigate to a broken page on mobile if this setting is not updated.

### Android Webview (v2)

The webview browser on Android is not supported by Stripe’s legacy Checkout (v2), which can make it fail. Given that the webview controls its own user agent, however, you can “pretend” that your browser is another one by setting your webview’s user agent to another browser’s, for example:

* Desktop Chrome

`webView.getSettings().setUserAgentString("any user agent string");`

* iOS 9 webview

`webView.getSettings().setUserAgentString("Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13E233 Safari/601.1");`

You can experiment with similar settings at the top of your Android application, if wrapping your Bubble app.

### Test Mode Plans vs Live Mode Plans

If both dev and live keys are set, your app will be interacting with Stripe's test environment when you are in development mode, and Stripe's live environment when you deploy to live. If your Stripe plan ids are different between your test mode and live mode, and you are selecting a plan id in dev, this can lead to errors in live as this plan id will not exist in this environment. Consider adjusting your Stripe plans to have matching ids between environments. If this is not possible, try dynamically setting the plan id with `Isn't live version:formatted as text` and set the text value of "yes" to the dev plan id and "no" to the live plan id.

### Language Support (v2)

Stripe Plugin version v2 uses an older version of the Stripe Checkout API that has limited language support, including for languages like Portuguese. Consider upgrading to v3 for more robust language support. When an unsupported language is detected, v2 will default to English.

## Other ways to learn

<details>

<summary>Articles</summary>

* [eCommerce and payments](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments) - this article series covers how to understand and plan for different types of payments

</details>

<details>

<summary>Other payment gateways with official plugins</summary>

* [Braintree plugin](/core-resources/bubble-made-plugins/braintree)

</details>
