# One-time payments
> Source: https://manual.bubble.io/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/one-time-payments · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
**Disclaimer:** Note that while Stripe is mentioned in this document as an example of a payment platform, this should not be interpreted as an endorsement or recommendation of Stripe's services. The information provided here does not constitute legal advice. As an app builder, it is your responsibility to select a payment platform that meets your specific needs. You are also responsible for ensuring compliance with the terms and conditions of the chosen payment platform.

We encourage you to conduct thorough research and, if necessary, consult with a legal professional to make an informed decision.
{% endhint %}

{% hint style="info" %}
This article outlines how you can use Stripe to accept one-time payments in your Bubble app. If you are looking for information regarding using Stripe to receive payment for the Bubble template and plugin marketplace, see [this article](/account-and-marketplace/account-and-billing/selling-on-the-marketplace).
{% endhint %}

## Defining one-time payments

One-time payments are payments that are made in isolation between two parties, as opposed to [recurring payments (subscription)](#user-content-fn-1)[^1] or [marketplace payment](#user-content-fn-2)[^2] (where a third party is part of the transaction).

Imagine a user (customer) adding a product to a cart, and then completing a payment transaction to pay for it (such as buying and paying for a t-shirt) – this is what we define as a one-time payment. In this article, we'll look into how you can plan for the development of this time of payment solution.

## Planning one-time payments

One early point to talk about is the understanding that most purchases, even if it contains multiple cost records, is still completed in one transaction. Let's unwrap what we mean by that: imagine that you have an app where you sell home-made beanies:

<figure><img src="/files/zP5pGpSFDZJ8f7CvuuOk" alt="" width="188"><figcaption></figcaption></figure>

Now, of course you will want your customers to pay for the product when they buy it. But wait – there may be other costs associated with this:

* Shipping
* Multiple products
* VAT/Sales tax
* Import tax

Before we explore these common cost details, we'll look into the point we just made: even if there are multiple cost items, such as shipping, VAT/taxes and import tax, your users will not pay three times; they'll usually still pay only once.

This may sound obvious, but the underlying point is that you'll need to structure and design your app to take these costs into account, and then prepare that total cost for the payment gateway. We'll cover the costs one-by-one.

We are using Stripe in this example, as it offers features that can handle parts of the collection of different cost items.

<table><thead><tr><th width="211">Cost</th><th>Possible handling</th></tr></thead><tbody><tr><td><a href="#product-cost">Product</a></td><td>The app sets the cost and sends it to the payment platform.</td></tr><tr><td><a href="#multiple-products">Multiple products</a></td><td>The app calculates the total cost and sends it to the payment platform</td></tr><tr><td><a href="#shipping-costs">Shipping cost</a></td><td>The app calculates the total cost and sends it to the payment platform</td></tr><tr><td><a href="#vat-sales-tax-gst-compliance">VAT/Sales tax</a></td><td>Stripe offers tools to help businesses handle <a data-footnote-ref href="#user-content-fn-3">VAT (Value Added Tax)</a> and sales tax.</td></tr><tr><td><a href="#import-tax">Import tax</a></td><td>The app calculates imports tax and adds it to the total amount.</td></tr></tbody></table>

### Product cost

The product cost is set/calculated by your app. In other words, Stripe will not have any say in the cost of the product and it's your responsibility to send the correct value through the plugin/API.

### Multiple products

Many apps give their users the opportunity to buy more than one product at once. When you plan your app, there are two ways to set this up:

* **Selecting an item quantity**: you can include a number in the final checkout that allows users to specify the number of beanies they want to buy
* **Offering a shopping cart**: Alternatively, you can offer a shopping cart that users can add items to. This allows greater freedom, such as buying different products.

However you choose to design your app, this kind of setup does not affect Stripe's handling of the total amount: you will still be sending one total sum, regardless of the number of items.

### Shipping costs

If you are selling physical products, it's common to ask the users to cover the shipping costs. This can be a simple, set cost, or a dynamic cost based on the number of products, weight, destination address and other details that are relevant.

Again, this is a data point that your app will handle. Stripe does not calculate shipping cost, or consider it separate from the total cost. In other words, whatever your users pay for shipping (if anything), you will only send the total amount to Stripe.

### VAT/Sales tax (GST compliance)

In many countries, products and services are subject to VAT (Value Added Tax) or sales tax, and this tax is typically calculated based on the location of the user or customer rather than the seller's location. VAT rates can differ based on various factors, including the type of product or service, whether the purchaser is a business or an individual, and the specific geographical region.

Collecting VAT and sales tax, especially if you sell to a global audience, can be somewhat complex to understand and calculate correctly, and some payment gateways (like Stripe) offer tools to simplify this process. These tools are designed to automatically calculate and collect the appropriate amount of tax on transactions, based on the location of the business and its customers.

You can read more about the tools that Stripe offers on the page below:

External page: [Sales tax, VAT, and GST compliance | Stripe Docs](https://stripe.com/docs/tax)

### Import tax

Many countries impose an import tax on products brought into their borders. The specific rates and regulations governing this tax differ significantly from one country to another. While apps and online retailers are normally not legally required to collect import tax, some opt to do so as a value-added service. By including import taxes in the total cost at the point of sale, these businesses provide customers with transparent pricing, helping them understand the full cost upfront. This approach can enhance customer experience by preventing unexpected charges upon product delivery.

As highlighted above, the total cost of any online purchase often involves a combination of various charges. These can include the base price of the product or service, applicable VAT or sales tax based on the customer's location, potentially import taxes for international purchases, and sometimes additional fees like shipping or handling.

### Common pitfalls with one-time payments

Planning your payment and total cost structure is an important part of creating a viable business. Unrealistic calculations or overlooking associated costs can distort your perception of revenue potential and create a false sense of confidence. By thoroughly considering all expenses and factors involved in sales, you can gain a more accurate understanding of your business's financial health and make informed decisions to optimize profitability.

In this section, we’ll go over some common pitfalls in sales planning.

#### Lacking cost transparency

Failing to provide clear and comprehensive cost breakdowns to users during the checkout process can lead to confusion and dissatisfaction. Ensure that users have full visibility into all applicable costs, including product prices, shipping fees, taxes, and any additional charges, to avoid surprises and build trust.

#### Getting the price wrong

Setting a low price can help attract customers – and there’s nothing wrong with that strategy. Still, the amount you are giving away may need to be made somewhere else, or you may end up with less revenue or even a loss on a sale.

The same principle applies to products that are overpriced – while fewer sales may be needed to reach a certain revenue target, striking the right balance between markup and sales potential can often lead to better optimization.

#### Neglecting hidden costs

Overlooking hidden costs, such as transaction fees charged by payment gateways, storage costs, and man-hours, can lead to unexpected expenses. Factor in all potential costs associated with making an order generate a positive net revenue.

#### Miscalculating shipping costs

Failing to accurately estimate shipping expenses can potentially give you an unwelcome surprise on the cost side. Shipping cost can vary depending on the carrier, the total weight and volume of the shipment and the address it is sent to. If you are selling products where you expect a dynamic shipping cost, you can look into integrating with shipping carriers using the API connector, or set up internal calculations that give a sufficiently accurate estimate.

#### Missing regulatory compliance

Neglecting to adhere to legal requirements, such as consumer protection laws or tax regulations, can result in costly penalties or legal disputes. Ensuring compliance with relevant regulations is essential to safeguard your business reputation and financial stability.

## Managing one-time payments in Stripe in your Bubble app

{% hint style="info" %}
This article doesn't cover all the technical details of the plugin, but is meant as an introduction to making one-time payments with Stripe. See the core reference entry below for details on the different actions and properties of the Stripe plugin:

Reference: [The Stripe plugin](/core-resources/bubble-made-plugins/stripe)
{% endhint %}

Bubble's official Stripe plugin is well-suited for handling one-time payments. The plugin has built-in features for charging a user immediately, holding a charge. refunding, and more. You will find all the plugin's actions under the *Payments* section in the action dropdown.

<figure><img src="/files/xqaohStNZLsBDCyxfb4O" alt="" width="375"><figcaption><p>All actions related to Stripe can be found under the <em>Payments</em> section in the action dropdown.</p></figcaption></figure>

### Charging a user

{% hint style="info" %}
To see an up-to-date demo of what Stripe's checkout page looks like, and how it can be customized, you can use their interactive Checkout developer page below:

External page: [Explore Stripe Checkout](https://checkout.stripe.dev/)
{% endhint %}

Charging a user means to send the amount and other relevant details to Stripe, so that the user can complete a payment. The user will be redirected to Stripe's checkout page, where they can enter the card details. You start the charge process by triggering the [*Charge the current*](#user-content-fn-4)[^4] *user* action, and Bubble will proceed as below:

<figure><img src="/files/dHAztMWEtOa7tCerVoBc" alt="" width="375"><figcaption></figcaption></figure>

### Confirming the payment in your app

As the illustration shows, the final step of the process is redirecting the user back to the page where the initial page where the process was started. Bubble behaves as if the user never left the page, meaning that the workflow that contained the *Charge the current user* action will continue to run as soon as the user returns to the page.

The plugin connects to Stripe's API, which means that Stripe gets a request from your app, and then sends a response in return. You can use this to verify that the payment was successful, or to display an error message if it wasn't, as well as save any relevant data in your database as needed.

<figure><img src="/files/JS5vklHW84GNn3YEWxq7" alt=""><figcaption><p>Using the <em>Results of step 1</em> data source, you can get relevant information from a charge attempt in Stripe. In this example, we are saving the Charge ID.</p></figcaption></figure>

<details>

<summary>Stripe's response</summary>

The following parameters are made available after a charge has been attempted (whether it was successful or not):

* **Amount**: The total amount of the transaction.
* **Amount Received (including coupons)**: The amount received from the customer after applying any discounts or coupons.
* **Application Fee**: The fee that you keep (only relevant for marketplaces[^5] using Stripe Connect)
* **Currency**: The currency used for the transaction.
* **Charge Id**: The unique identifier for the payment charge.
* **Captured**: Indicates whether the payment has been successfully captured.
* **Payment intent id**: The unique identifier for the payment intent.
* **Order description**: Description of the order or item purchased.
* **Email of charged user**: The email address of the customer who made the payment.
* **Product name**: The name of the product or service purchased.
* **Product image**: An image representing the product or service purchased.
* **Statement descriptor**: A description that appears on the customer's credit card statement to identify the transaction.

</details>

The expandable box above shows the different parameters that are returned to your app after a charge attempt has been made. If the charge was unsuccessful, Stripe will still return parameters. The following key parameters are often a good idea to save, to make it easy to manage the transaction later:

* **Amount (number):** this parameters displays the total amount that was captured in the payment. If the payment was successful, this amount should match what you send in the *Charge the current user* action.
* **Charge ID (text)**: this is the auto-generated unique ID of the charge in Stripe's records. It's often useful to save this ID in your app's database, so that you are able to refer to it later as needed. For example, if you want to refund a charge, you will need this ID. You cannot set the initial value or change the value of this ID. There's normally no reason to display this value to the user.
* **Captured (yes/no)**: this parameter, returned as a yes or no, confirms whether the charge was successful or not. You can use this to take any necessary steps depending on the status of the charge, such as alerting the user of its success or failure.

While you may find the other parameters useful too, these three are generally the ones you want to use to continue to build your checkout workflow. By combining them, you can verify the payment and continue communicating to the user the current status of their purchase, as well as save data needed for your own records.

### Refunding a payment

{% hint style="info" %}
The Stripe plugin enables full refunds for a charge. To process partial refunds, you'll need to configure a custom action using the API Connector plugin.

Article series: [The API Connector](/help-guides/integrations/api/the-api-connector)
{% endhint %}

Sometimes, you'll find it necessary to refund a payment. The Stripe plugin comes with an action to easily refund the full amount in one step:

<figure><img src="/files/eI8Rg8595JGYfpqa5Ivs" alt="" width="375"><figcaption></figcaption></figure>

To refund a payment, the only needed parameter is the *Charge ID* that was returned when the initial payment was made. A refund may fail under the following circumstances:

<table><thead><tr><th width="254">Circumstance</th><th>Refunding</th></tr></thead><tbody><tr><td>No refund made before</td><td>The full amount will be refunded</td></tr><tr><td>Partial refund made before</td><td>The remaining amount will be refunded</td></tr><tr><td>Full refund made before</td><td>Nothing will be refunded</td></tr><tr><td>Transaction is <a data-footnote-ref href="#user-content-fn-6">disputed</a></td><td>Nothing will be refunded</td></tr></tbody></table>

## FAQ: Using Stripe checkout in your Bubble app

#### Do I need to set up a form to collect card details?

No, it's unnecessary and in fact, it's not recommended. Stripe handles the collection of this information for you in a secure, encrypted manner that complies with regulatory standards. This simplifies the process of accepting payments from customers, as you don't need to ensure compliance yourself. Instead, you can rely on Stripe to manage this aspect securely and efficiently. You should never store information about the user's card in your database or anywhere else.

#### What happens if the user clicks "Back" without finishing the Stripe checkout process?

If the user has already been redirected to Stripe Checkout, and then clicks back in their browser, the payment will register as failed. See the [*Confirming the payment*](#confirming-the-payment) section on how to handle this.

#### When is the money transferred to my account?

The charge from the user's card is made immediately, and the money is transferred to your app's Stripe account. The money will then be sent to the bank account you have specified in your Stripe dashboard. You can read more about setting up your account and payout frequency in the Stripe Docs article below:

External page: [Receive Payouts | Stripe Documentation](https://docs.stripe.com/payouts)

## Other ways to learn

<details>

<summary>Core reference</summary>

Core reference: [The Stripe plugin](/core-resources/bubble-made-plugins/stripe)

</details>

<details>

<summary>Video lessons</summary>

YouTube: [Bubble and Stripe | Recorded webinar](https://www.youtube.com/watch?v=HGFVnTf7kMg)

</details>

<details>

<summary>External documentation</summary>

[Stripe docs](https://stripe.com/docs)

* [How Stripe Checkout works](https://docs.stripe.com/payments/checkout/how-checkout-works)
* [Webhooks](https://stripe.com/docs/webhooks)

</details>

[^1]: Stripe has a dedicated feature for recurring billing, to support subscription services such as a SaaS app. You can read more about this in the article below:

    Article: [Subscriptions](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/subscriptions)

[^2]: *Marketplace apps* are platforms that enable third-party vendors to sell goods and/or services within a digital "marketplace." Stripe offers built-in functionalities to facilitate this.\
    \
    Article: [Marketplace](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/marketplace)

[^3]: VAT (Value Added Tax) is a type of consumption tax placed on a product whenever value is added at each stage of the supply chain, from production to the point of sale. The amount of VAT the user pays is based on the cost of the product, minus any costs of materials used in the product that have already been taxed.

[^4]: The *Charge the current user* action sends the current user to Stripe's checkout page to make a payment.\
    \
    For this action to be available, the official Stripe plugin needs to be installed in your app.\
    \
    Reference: [The Charge the current user action](/core-resources/bubble-made-plugins/stripe#charge-the-current-user)

[^5]: *Marketplaces* are apps that sell products and services on behalf of a third-party. You can read more about that payment type in the article below:\
    \
    Article: [Marketplaces](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/marketplace)

[^6]: When a Stripe transaction is disputed, it means that the customer has raised a concern or disagreement regarding the charge, leading to a dispute process initiated by the payment card network or issuing bank.\
    \
    External page: [Disputes | Stripe Docs](https://docs.stripe.com/disputes)
