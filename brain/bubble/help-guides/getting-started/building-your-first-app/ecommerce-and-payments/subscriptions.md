# Subscriptions
> Source: https://manual.bubble.io/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/subscriptions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
**Disclaimer:** Note that while Stripe is mentioned in this document as an example of a payment platform, this should not be interpreted as an endorsement or recommendation of Stripe's services. The information provided here does not constitute legal advice. As an app builder, it is your responsibility to select a payment platform that meets your specific needs. You are also responsible for ensuring compliance with the terms and conditions of the chosen payment platform.

We encourage you to conduct thorough research and, if necessary, consult with a legal professional to make an informed decision.
{% endhint %}

## Defining subscriptions

Subscriptions are a form of payment setup that triggers billing at set, recurring times. This can be particularly useful in scenarios like collecting a monthly or annual fee in exchange for a product or service offered by your app.

<figure><img src="/files/OXKsKgoO8UlfinZSCBtL" alt="" width="375"><figcaption><p>With a single action, you can set up regular payments from a customer.</p></figcaption></figure>

This model is frequently employed by SaaS (Software as a Service) applications, where the product is the app itself. Implementing a subscription-based payment system simplifies the financial relationship for both the app owner and the user, ensuring a consistent revenue stream for the former and uninterrupted service access for the latter.

## Planning subscription services

Just as with other payment types, it's useful to carefully consider your revenue model and the kind of subscription you plan to charge your users before you build it.

In this section, we'll explore various options you can consider for your subscription model. This will help you make informed decisions about structuring your app's revenue stream in a way that aligns with your business goals and meets your users' needs.

### Single subscription

Simply offering one single subscription at a set cost is the easiest way to get started. In this scheme, your end-users are not looking at multiple plans, discounts or anything else that might complicate the pricing structure, but are simply offered one choice with a set price.

#### Example:

<table><thead><tr><th width="209">Plan</th><th>Price</th></tr></thead><tbody><tr><td>Monthly subscription</td><td>$12</td></tr></tbody></table>

### Multiple plans

For complex apps and services, it can be beneficial to offer multiple subscription plans, providing end-users with options to choose how much they're willing to pay. Typically, the price point of each plan correlates with the level of access or features available to the user.

This tiered approach allows users to select a plan that best fits their needs and budget, while also giving them the flexibility to upgrade for more advanced features as required.

#### Example:

<table><thead><tr><th width="175">Plan</th><th width="142">Price</th><th>Possible differences</th></tr></thead><tbody><tr><td>Basic plan</td><td>$12 per month</td><td>Basic features</td></tr><tr><td>Professional plan</td><td>$24 per month</td><td>Additional features, additional team members</td></tr><tr><td>Enterprise plan</td><td>$36 per month</td><td>All features, advanced reports, even more team members</td></tr></tbody></table>

The previous description serves merely as an example to demonstrate a potential approach to structuring tiered subscription plans. The specific plans you choose to offer and their distinct features depend entirely on your preferences and business strategy. However, it's advisable to have a clear plan in place before beginning development. This ensures that both your app and Stripe setup are aligned and configured to support your chosen subscription model effectively.

<figure><img src="/files/rkaInrqgas0W326BT9Y4" alt=""><figcaption><p>Using multiple different plans you can offer your customers tiered payments. <strong>Hint:</strong> the design above is part of Bubble's <a href="/pages/diMQVVnPUnq4Zdzh8nXO">Component Library</a>, and you can set up one just like it in seconds.</p></figcaption></figure>

### Long-term commitment discounts

Some services offer discounts on their plans as an incentive for end-users who commit to a longer subscription period. For instance, choosing an annual plan might come with a discount, serving as a reward for the user's willingness to pay a larger sum upfront.

There doesn't need to be any kind of complex calculations behind this – simply set up a new plan with a different price in Stripe's dashboard.

## Managing plans and subscribers in your Bubble app using Stripe

<details>

<summary>The different between subscriptions and plans</summary>

When working with subscriptions and plans, it's useful to get to know the difference between the two, and how they are stored in Stripe.

In short, a user is **subscribed** to one or more **plans**. In other words, the subscription object contains information such as the customer, start/end dates, trial period, and plan(s) the user is subscribed to.

The *plan* object contains the information about a particular subscription offering. It specifies details such as the name, cost, and billing interval.

</details>

Stripe, in conjunction with Bubble's official plugin, is engineered to streamline the management of subscriptions in your Bubble app. This entails the straightforward creation of pricing plans, specification of pricing and billing frequency, and instructing Stripe to manage the subscription process on your behalf. You will find all the plugin's actions under the Payments section in the action dropdown.

<figure><img src="/files/xqaohStNZLsBDCyxfb4O" alt="" width="375"><figcaption><p>All actions related to Stripe can be found under the <em>Payments</em> section in the action dropdown.</p></figcaption></figure>

When you build an app using subscriptions, most of the work is usually done in the Stripe dashboard:

* **Create plans:** In your Stripe Dashboard, you can define the products or services you offer, along with the pricing plans associated with them. You'll specify details such as the plan name, pricing amount, billing frequency (e.g., monthly or annually), and any trial periods if applicable.
* **Customer billing:** When a user subscribes to one of your plans, Stripe handles the billing process. It can generate invoices, automatically charge customers according to the billing frequency, and send email notifications about upcoming charges.
* **Subscriber management:** You can easily manage your subscribers within the Stripe Dashboard. This includes handling cancellations, upgrades, downgrades, and other subscription-related actions.
* **Subscription events:** Stripe provides webhook[^1] events related to subscriptions, allowing you to track changes, cancellations, or other subscription-related actions in real-time. You can set up webhook endpoints in your Bubble app to handle these events.
* **Reporting and analytics:** Stripe offers reporting tools that help you gain insights into your subscription business. You can access data on revenue, customer retention, churn rates, and more.

### Subscribing a user to a plan in your Bubble app

{% hint style="info" %}
Before proceeding to set up the action needed to start an end-user on a plan, you need to set up one or more plan(s) in the Stripe Dashboard and finish setting up the Stripe plugin with Client ID and Secret Key. Bubble will then fetch the available subscription plans for you.
{% endhint %}

To start a subscription for a user, you use the [*Subscribe the user to a plan*](#user-content-fn-2)[^2] action. A user can be subscribed to one or more plans at the same time, and you can start multiple plans in one single action by using the [*Subscription type*](#user-content-fn-3)[^3] property.

<figure><img src="/files/dHAztMWEtOa7tCerVoBc" alt="" width="375"><figcaption></figcaption></figure>

When you use the *Subscribe a user to a plan* action, Bubble will redirect the user to the Stripe checkout page, where they can enter their card details.

### Confirming the transaction and subscription

As the illustration shows, the final step of the process is redirecting the end-user back to the page where the initial page where the process was started. Bubble behaves as if the user never left the page, meaning that the workflow that contained the *Charge the current user* action will continue to run as soon as the end-user returns to the page.

The plugin connects to Stripe's API, which means that Stripe gets a request from your app, and then sends a response in return. You can use this to verify that the payment was successful, or to display an error message if it wasn't, as well as save any relevant data in your database as needed.

<details>

<summary>Stripe's response</summary>

The following parameters are made available after a charge has been attempted (whether it was successful or not):

* **Subscription ID:** The unique identifier for the subscription.
* **Plan ID:** Unique identifier for the subscription plan associated.
* **Plan name:** The name of the subscription plan.
* **Items:** Lists subscription items.
* **Status:** Describes the current status of the subscription.
* **Starting date:** When the subscription started.
* **Creation date:** Denotes when the subscription was created.
* **Current period starting date:** The start date of the current billing period.
* **Current period ending date:** The end date of the current billing period.
* **Quantity:** Specifies the associated quantity.
* **Trial end date:** Indicates when any trial period ends.
* **Trial start date:** Indicates when any trial period ends.

</details>

The expandable box above shows the different parameters that are returned to your app after a charge attempt has been made. If the charge was unsuccessful, Stripe will still return parameters. The following key parameters are often a good idea to save, to make it easy to manage the subscription later:

* **Subscription ID (text)**: this is the auto-generated unique ID of the subscription object in Stripe's records. It's often useful to save this ID in your app's database, so that you are able to refer to it later as needed. For example, if you want to cancel a subscription, you will need this ID. You cannot set the initial value or change the value of this ID. There's normally no reason to display this value to the end-user.
* **Plan ID**: this is the auto-generated unique ID of the plan in Stripe's records. The ID is generated when the Plan is created, and not when a subscription is created. You cannot set the initial value or change the value of this ID.

Other parts of the response can of course be useful to store as well, but these two make it easy to quickly identify a subscription and the plan to which the subscription is connected.

### Canceling a plan subscription in your Bubble app

To terminate a user's subscription to a plan in your Bubble app, you can use the *Cancel the current user's plan* action. You can cancel multiple plans in a single action

### Incomplete payments

{% hint style="info" %}
**Common misconception:** Note that *Incomplete payments* refer to the *status* of the transaction, not the amount to be paid. In other words, an incomplete payment in this context is a transaction process that is not yet completed.
{% endhint %}

The *Subscribe the user to a plan* action lets you allow incomplete payments. You can specify the behavior using the *Payment behavior* dropdown. This property allows you to set the status of subscriptions as "incomplete" if it can't be fully completed.

#### Why use incomplete payments?

Stripe Checkout handles [Strong Customer Authentication (SCA)](#user-content-fn-4)[^4] by default, ensuring that payments are authenticated according to regulatory requirements. However, there may be scenarios where additional customer actions are necessary to complete a payment.

In such cases, the incomplete payment parameter provides flexibility in managing subscriptions. For example, if a payment requires SCA authentication but the customer fails to complete the process within a specified time frame, the subscription may transition to an incomplete status. This allows you to handle scenarios where payments cannot be immediately confirmed, providing a seamless experience for both you and your customers while ensuring compliance with regulatory requirements.

{% hint style="warning" %}
**Time limit:** If the *PaymentIntent* remains unconfirmed for 23 hours, subscriptions automatically transition to an *incomplete\_expired* status, at which point the payment is considered failed.
{% endhint %}

The following options are available when you set the *Payment behavior* property. The *Stripe parameter* column indicates the associated [Stripe parameter](#user-content-fn-5)[^5].

<table><thead><tr><th width="211">Option</th><th width="201">Stripe Parameter</th><th>Explanation</th></tr></thead><tbody><tr><td>Allow incomplete</td><td>allow_incomplete</td><td>Creates Subscriptions with status=incomplete if the first invoice requires additional payment actions from the customer.</td></tr><tr><td>Error if incomplete</td><td>error_if_incomplete</td><td>Generates an error if the first invoice can't be paid, preventing the creation of Subscriptions with incomplete status.</td></tr><tr><td>Pending if incomplete</td><td>pending_if_incomplete</td><td>Sets Subscriptions with status=pending if the first invoice requires additional payment actions from the customer. Useful for managing scenarios where additional actions are needed before activating the Subscription.</td></tr><tr><td>Default incomplete</td><td>default_incomplete</td><td>Sets the default behavior for Subscriptions, creating them with incomplete status if the first invoice requires additional payment actions from the customer.</td></tr></tbody></table>

## Trial periods

{% hint style="warning" %}
Setting up a trial period is not support by the Stripe plugin, but you can set this up in the API Connector plugin.

Article: [The API Connector](/help-guides/integrations/api/the-api-connector)\
External page: [Using trial periods | Stripe docs](https://stripe.com/docs/billing/subscriptions/trials)
{% endhint %}

Stripe allows you to provide trial periods in your app, allowing customers to try it out for a specified duration before making a payment. This is useful when you want your customers to be able to try out your app for a free period, such as a week or month.

To set up a trial period, all you need to do is to add the `trial_end` parameter to the call. This is a timestamp that determines *when* the trial should end. As such, you don't set up a given period, but a start and end date, where the start date is automatically set to the time of signup and the end date is specified with the `trial_end` parameter.

After the trial period concludes, and if the subscription status hasn't been paused, Stripe automatically generates an invoice for the subscription. Starting a trial period requires the user to provide their card details.

## Invoices

Stripe automatically creates an invoice for each billing cycle of a subscription (including the first). When you subscribe a customer, the invoice is first generated, and then immediately finalized.

On later billing cycles, the process looks slightly different:

First, Stripe generates the new invoice. It maintains this invoice in a [draft state](#user-content-fn-6)[^6] for 60 minutes, while it tries to finalize the transaction using the user's saved payment method. This is to avoid the invoice becoming finalized[^7] without payment. If the payment is successful, the invoice is updated to paid.

### What's included on a Stripe invoice?

Stripe automatically includes the following information on invoices. Your app needs to provide information as needed:

* Line items with product details
* Custom invoice numbering
* Customer information
* Discounts or coupons
* Tax rates
* [Line items](#user-content-fn-8)[^8]
* Memo[^9]
* Footer

### Customizing invoices

Stripe lets you customize invoices so that they match your company's brand. You can customize the following points:

* Icon
* Logo
* Brand color
* Accent color

Changes to the brand can be done through the Stripe's API, but is not supported in the official Stripe plugin. However, you can change the design of the invoice in the Stripe Dashboard, by opening the *Branding settings* panel.

External page: [Branding Settings | Stripe Dashboard](https://dashboard.stripe.com/account/branding)

## FAQ: Stripe subscriptions

#### How are invoices and receipts different?

Invoices and receipts serve different purposes in a financial transaction:

1. **Invoice:**
   * An invoice is a document issued by a seller to **request payment** from a buyer for goods or services.
   * It typically includes details such as the seller's information, buyer's information, a breakdown of products or services provided, quantities, prices, and the total amount due.<br>
2. **Receipt:**
   * A receipt is a document provided by the seller to the buyer **after the payment** has been made.
   * It acknowledges that payment has been received and provides proof of the transaction.
   * A receipt usually includes information such as the date of payment, payment method, transaction reference or ID, and details of what was purchased.

#### What is a line item?

A line item is a specific entry or itemized charge within an invoice or bill that represents a particular product, service, or fee. It includes the item's description, price, currency and tax rate. You can optionally link the line item to an existing subscription by providing the subscription ID.

Line items are used to clearly specify what the recipient of the invoice is being charged for, making it easier to understand and verify the expenses or services being billed.

Let's illustrate with an example, and imagine your company is offering a SaaS app plan. In addition, you offer extra credits that can be used for fast-track customer support:

Invoice: ABC-123\
Date: January 15, 2024\
Due: February 1, 2024

<table><thead><tr><th width="154">Product</th><th width="128">Currency</th><th>Cost</th></tr></thead><tbody><tr><td>Monthly fee</td><td>USD</td><td>$39.00</td></tr><tr><td>Extra credits</td><td>USD</td><td>$12.00</td></tr></tbody></table>

Each of the rows is one line item. Stripe automatically includes a line item for the relevant plan the user is subscribed to, and you can add additional line items as needed by using the [*Create an invoice item*](#user-content-fn-10)[^10] action.

## Other ways to learn

<details>

<summary>Articles</summary>

* [The Bubble API](/help-guides/integrations/api/the-bubble-api) - how to set up API workflows that can receive webhooks from Stripe
* [The API Connector](/help-guides/integrations/api/the-api-connector) - setting up additional Stripe API calls not supported by the official Stripe plugin, using the API Connector
* [The Component Library](/help-guides/design/the-component-library) – use ready-made component templates to set up designs similar to the pricing plans example above

</details>

<details>

<summary>Core reference</summary>

[The Stripe plugin](/core-resources/bubble-made-plugins/stripe)

</details>

<details>

<summary>External documentation</summary>

[Stripe docs](https://stripe.com/docs)

* [Subscriptions](https://stripe.com/docs/billing/subscriptions/overview)
  * [Prorate for usage-based billing](https://docs.stripe.com/billing/subscriptions/cancel#prorate-for-usage-based-billing)
  * [Invoices](https://docs.stripe.com/invoicing)
* [Webhooks](https://stripe.com/docs/webhooks)

</details>

[^1]: Webhooks are real-time notifications to inform your app about important events, such as successful payments or canceled subscriptions.\
    \
    In essence, it means that when an event occurs, Stripe can make a request to one of your API workflows.\
    \
    Article series: [The Bubble API](/help-guides/integrations/api/the-bubble-api)\
    External page: [Stripe webhooks](https://stripe.com/docs/webhooks)

[^2]: The *Subscribe the user to a plan* action charges a user and starts a billing cycle in Stripe.

    Reference: [Subscribe the user to a plan](/core-resources/bubble-made-plugins/stripe#subscribe-the-user-to-a-plan)

[^3]: *Subscription type* lets you choose between subscribing a user to *one* plan or *multiple plans*.

    Reference: [Subscription type](/core-resources/bubble-made-plugins/stripe#subscription-type)

[^4]: *SCA (Strong Customer Authentication)* regulation is a requirement within the European Union aimed at enhancing the security of online payments and reducing fraud.

    It mandates that customers authenticate themselves using two or more factors when making electronic transactions.\
    \
    External page: [SCA | Stripe Docs](https://stripe.com/en-no/guides/strong-customer-authentication)

[^5]: The plugin makes an API call to Stripe, and includes these parameter behind the scenes. The official Stripe documentation linked below explains each parameter in more detail:

    External page: [Subscription payment behavior | Stripe Docs](https://docs.stripe.com/api/subscriptions/create#create_subscription-payment_behavior)

[^6]: Invoices can have different statuses, such as *draft* and *paid*. All invoices start in a draft state.

    You can read more about invoice states in the article below:

    External page: [Invoice states | Stripe Docs](https://docs.stripe.com/invoicing/overview#invoice-statuses)

[^7]: When an invoice is finalized, its status is changed to *paid*. Most details on an invoice cannot be changed after it is paid.

    You can read more about invoice states in the article below:

    External page: [Invoice states | Stripe Docs](https://docs.stripe.com/invoicing/overview#invoice-statuses)

[^8]: A line item is a specific entry or itemized charge within an invoice or bill that represents a particular product, service, or fee.

    Article FAQ: [What is a line item?](#what-is-a-line-item)

[^9]: The *Memo* field in Stripe is known as *Description* in Bubble.

[^10]: The *Create an invoice item* action creates a new item and adds it to the user's next invoice.

    Reference: [Create an invoice item](/core-resources/bubble-made-plugins/stripe#create-an-invoice-item)
