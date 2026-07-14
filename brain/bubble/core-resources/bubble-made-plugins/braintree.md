# Braintree
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/braintree · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Braintree plugin charges credit cards and PayPal accounts. On mobile web, you can charge using Venmo, Apple Pay, Android, Pay, etc. You must create an account with Braintree before taking payments. Initially, start with an account in their Sandbox so that you can test, enter the keys in Development mode, and then when you're ready to go Live, you will copy the live keys. Non-sandbox keys are only applied in Live mode.

## Charge the current user

This action charges the current user and prompts them to enter their credit card or PayPal information. The response from Braintree, e.g., Charge ID, amount, etc., can be accessed in the subsequent actions as 'Result of previous step.' In a failed transaction, the workflow stops running.

### Payer email

This is the email of the user who is going to be charged. Typically, it is 'Current user's email.'

### Amount

This is the amount to be charged. This can be dynamic by using the 'Insert dynamic data' button. The currency is defined in your account with Braintree and associated with the entered information in the Braintree section in the Plugins Tab.

### Description

This is the description that will appear on the PayPal account of the user.

### Button caption

Enter the caption of the button in the Credit Card/PayPal form.

### Authorize the charge only

This determines whether to immediately capture the charge. When checked, the charge issues an authorization and will need to be captured later. Uncaptured charges expire in 7 days. You can then capture the charge in your Stripe dashboard.

### Enable 3D secure check

Check this box to activate an additional layer of protection by prompting the user to enter the password with their bank.

*Important:* Test this functionality with Braintree Sandbox and then again in Live mode.

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

## Subscribe the user to a plan

This action subscribes a user to a plan, which has been previously defined in Braintree. Then, the card will be charged on a regular basis.

*Important:* Since the app has two versions, Development and Live, you need to have both versions of your account in Braintree, Sandbox and Production, to have the same plans with the same IDs.

### Dynamically specify plan

By default, the plan is selected from a dropdown menu. Check this box to make the plan dynamic.

### Plan name

Once you enter keys in the Braintree section in the Plugins Tab, we fetch the plans you created with Stripe to populate this list. Select the plan to subscribe the user to.

*Important:* Since the app has two versions, Development and Live, you need to have both versions of your account in Stripe to have the same plans with the same IDs.

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

## Cancel the current user's plan

This action cancels a subscription with Braintree. The payment method will not be charged anymore.

### Do not show success message

By default, Bubble displays an alert informing the user when the action is successful. Deactivate this behavior by deselecting this box if you want to display a custom message instead of the default Bubble message.

## Setup

Note that anybody can sign up instantly for a sandbox Braintree account, which provides you access to their test environment so you can set up the integration. Applying for a production account is a separate flow that requires certain kinds of verification on the Braintree side.

After you sign up for either kind of Braintree account, on the Home page you should see a section for "(Sandbox) Keys and Configuration", which shows the following:

* Merchant ID
* Public Key
* Private Key

Copy these into your Bubble app's Braintree plugin settings. As with other plugins, you can decide whether to use the same or different set of credentials for your app's development and live versions.

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
