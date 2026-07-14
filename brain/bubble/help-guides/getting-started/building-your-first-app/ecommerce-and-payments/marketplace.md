# Marketplace
> Source: https://manual.bubble.io/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/marketplace · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
**Disclaimer:** Note that while Stripe is mentioned in this document as an example of a payment platform, this should not be interpreted as an endorsement or recommendation of Stripe's services. The information provided here does not constitute legal advice. As an app builder, it is your responsibility to select a payment platform that meets your specific needs. You are also responsible for ensuring compliance with the terms and conditions of the chosen payment platform.

We encourage you to conduct thorough research and, if necessary, consult with a legal professional to make an informed decision.
{% endhint %}

{% hint style="info" %}
This article describes how you can use the Stripe plugin as a payment provider in your Bubble app. If you are looking for information about earning regarding the Bubble template and plugin marketplace, see [this article.](/account-and-marketplace/account-and-billing/selling-on-the-marketplace)
{% endhint %}

This article looks into how to plan for building a marketplace app.

## Defining marketplace apps

Marketplace apps are somewhat different from one-time paments and subscriptions, in that they involve a third party. In this article, we'll refer to the different roles in this transaction as the following:

* The **marketplace** is your app (the Stripe account)
* The **customer** is the person buying something
* The **seller** is the third party selling something (the Connected Stripe account)

Marketplace apps have transformed the way we engage in commerce, creating digital spaces where buyers and sellers converge to exchange products, services, or information. Instead of an app selling a set catalog of products and services, marketplace apps allow sellers to sell *their* products and services in your app.

<figure><img src="/files/0QcXU2PXaeJ4cYIEgQy2" alt="" width="188"><figcaption></figcaption></figure>

<div align="center"><figure><img src="/files/4ErJ0RuakfAgOBPLXnzk" alt="" width="375"><figcaption><p>Marketplace apps connect sellers with customers – whether they are selling physical products, online courses, or something completely different.</p></figcaption></figure></div>

We define *marketplace app* as an app where a transaction is split between these three parties. The Bubble platform, for example, allows users to set up an app and generate revenue with it, but Bubble is not a marketplace app under this definition, as we're not a part of the customer transaction.

As illustrated in our [list of different marketplace examples](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments#marketplaces), marketplace apps encompass a broad spectrum of products and services. Interestingly, some apps operate as marketplaces without users always realizing their marketplace nature: for example, Uber and Lyft don't actually own any vehicles, but simply offer a marketplace that connects passengers with drivers and organizes the transaction.

There are a variety of marketplaces live today, selling stuff like:

* Tangible goods
* Video content, such as courses
* Live sessions, such as coaching, counseling, and music lessons
* Services like transportation and food delivery
* Specialized product categories such as art and collectibles
* Rental of real estate properties
* Accommodation in hotels

Many marketplaces started out serving a niche, and then grew over time to handle multiple categories. As you plan your app, it's worth keeping in mind that everything starts with the first step.

{% hint style="info" %}
In this article, we will use the term "product" to refer to any item or service being offered in a marketplace, regardless of its specific nature.
{% endhint %}

## Planning marketplace apps

{% hint style="info" %}
Stripe Connect offers various customization options to suit different business models, but this article primarily focuses on the model described below. If you are new to Bubble and/or Stripe, it's likely you will find this setup the easiest to set up.
{% endhint %}

While marketplace apps can have very different structures, many employ a revenue model that bears a resemblance to the following structure. We'll define the app user as *end-user* in this example, to separate them from sellers.

<figure><img src="/files/C1oPxlZUSEjCWdKwrAuY" alt="" width="563"><figcaption></figcaption></figure>

As illustrated the process is as follows:

1. End-user (customer) **browses** products in the marketplace.
2. End-user **purchases** one or more products.
3. End-user makes a **payment** through Stripe.
4. The amount is split between the three parties:
   1. **Stripe** retains its transaction fee
   2. A portion of the payment is retained in the **seller's** Stripe account.
   3. Another portion is transferred to the **marketplace** owner's Stripe account.

Stripe's product, Stripe Connect, automates the allocation of payments and fees.

### Stripe Connect for building marketplace apps in Bubble

Stripe Connect is Stripe's solution for helping platforms and marketplaces efficiently manage payments and payouts for multiple sellers or service providers within their ecosystem. Whether you're building a marketplace for various types of products, services, or a combination of both, Stripe Connect simplifies the process of handling financial transactions. This section explores how Stripe Connect functions and how you can use it to establish a secure and streamlined payment system for your platform.

First, let's see how Stripe Connect relates to each of the three parties involved in a marketplace transaction:

1. **Platform**: The platform is your app, that facilitates transactions between buyers and sellers. The platform uses Stripe Connect to handle payments and payouts for its users.
2. **Seller**: Sellers are individuals or businesses that offer products or services on the platform. They receive payments from buyers through the platform. Each seller has their own Stripe account connected to the platform.
3. **Customer**: Customers are the users who purchase products or services from sellers within the platform. They make payments to the platform, which then distributes the appropriate portion to the seller after deducting any fees or commissions.

Stripe Connect acts as the intermediary that facilitates the flow of funds between these three parties, ensuring secure and transparent transactions within the platform.

### Fees

The part of the transaction that the platform (your app) keeps, is often called the *platform fee*. To understand how this is structured, let's look at the total fee structure for each of these two parties (platform and seller).

In the example below, we show the calculation for each party, and how much is party is left with. Please note that these values are purely for demonstration and are not reflective of actual fees:

<table><thead><tr><th width="209">Description</th><th width="83">Fee</th><th>Total</th></tr></thead><tbody><tr><td>Transaction</td><td></td><td>$100</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-1">Stripe transaction fee</a></td><td>0,5%</td><td>$0.5</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-2">Platform fee</a></td><td>5%</td><td>$5</td></tr><tr><td><strong>Seller's payout</strong></td><td></td><td><strong>$94,5</strong></td></tr><tr><td><strong>Stripe keeps</strong></td><td></td><td><strong>$0.05</strong></td></tr><tr><td><strong>Platform keeps</strong></td><td></td><td><strong>$5</strong></td></tr></tbody></table>

As the table illustrates, both the platform fee and Stripe transaction fee is paid by the *seller,* and whichever platform fee you've set is calculated on the total transaction value. The *buyer* is never made aware of the calculation going on behind the scenes, and is simply asked to pay the full $100 amount in one transaction.

The fee is set when you initiate the transaction, using the *Charge the current user* action (described [below](#charging-a-sale-on-behalf-of-a-seller)).

## Managing marketplace Bubble apps in Stripe

### Registering sellers

Every seller who sells something through your app needs to have their own individual Stripe account. This setup ensures that each seller can receive payments directly and manage their financial transactions independently within your platform.

The official Stripe plugin supports setting up seller accounts automatically. This will work whether the seller has an existing Stripe account, or wants to create a new one. To set up sellers on Stripe, use the [*Register the user as a seller*](#user-content-fn-3)[^3] action. Keep in mind that the [Stripe plugin](#user-content-fn-4)[^4] must be installed and correctly set up to work.

<figure><img src="/files/N9qOMPW2ty5fal304q2N" alt="" width="375"><figcaption><p>The <em>Register the user as a seller</em> action lets you easily create seller accounts in your app. The user will be forwarded to Stripe, but you can pre-populate many of the fields as illustrated above</p></figcaption></figure>

### Identifying the correct seller

When building a marketplace app, accurately identifying the appropriate seller for each sale is important to ensure proper payment to the respective seller. What you should keep in mind, is to structure your database so as to keep track of which seller is connected to a particular product.

You likely have a *product* data type (or similar) in your app, that contains information about the item being sold, such as price and description. You can store which user is the registered seller of that particular product on that data type, Alternatively, you can use a more over-arching data type that contains the user.

#### Using the *Created by* field on the product

Whenever a thing is created in your Bubble database, the *Created by* (user) field on that thing is populated automatically with the user that created it. This is an easy way to identify the correct seller. However, there are some potential pitfalls that are worth considering:

* The user needs to be logged in, to be associated with the record they create
* The *Created by* field can't be edited
  * If you want to be able to move a product to a different user, you need to create a separate field of type *user* for this
* If a user is deleted, the *Created by* field will be left empty

In a Bubble expression, you would refer to the seller as `Product's Created by`, provided that the data type is called *Product.*

#### Using a separate *User* field on the product

If you prefer to use a field that you can edit, you can instead set up a field on the product data type that identifies the seller. To do this, simply add a field of type *User*, and give it a descriptive name such as *Seller* or *Owner.* Keep in mind the following:

* The field will not be populated automatically, meaning that you need to specify the seller in the workflow where the thing is created
* If the user is deleted, the field will be left empty

In a Bubble expression, you would refer to the seller as `Product's Seller`.

#### Using a separate data type

You can also consider using a broader data type to contain seller information. For example, if you have a marketplace where each user sets up a virtual "shop", you may use this data type to store the seller information.

For example, let's imagine that a seller called John Doe sets up a shop called *John's Shop.* In this case, each product would likely be connected to the *shop,* instead of directly to the user, looking something like this: `Product's Shop`. To identify the seller to register with the sale, you would set up the expression like this: *`Product's Shop's Owner`.*

This approach can be valuable in certain situations. For instance, if your application facilitates collaborative product management among teams, the shop entity can serve as the data type that connects them.

Let's look at some of the potential pitfalls:

* The seller sent to Stripe needs to be a user. As such, you will still need to refer to one registered user when sending the charge to Stripe.
* The initial setup and maintenance is slightly more complex, as you will be dealing with more data types.
* If privacy rules apply to the products, you may need to [plan for this](#user-content-fn-5)[^5] as you structure your database

### Charging a sale on behalf of a seller

When you are ready to bill a buyer for a purchase linked to a seller, you use the [*Charge the current user action*](#user-content-fn-6)[^6], just like you would with any other one-time payment. The difference is that for this charge, you need to define which seller is responsible for the sale, so that the seller's fee can be registered with Stripe. The seller needs to be registered (see the [above step](#registering-sellers)) for this to work.

<figure><img src="/files/UXx42dWUdP9WqutBrzuG" alt="" width="375"><figcaption></figcaption></figure>

To instruct Bubble to sell on behalf of another user, and to identify that user, follow these steps:

1. Check the *The payee of this transaction is another user*
2. Assign the seller in the [*Trans. payee* field](#user-content-fn-7)[^7]

If your app is to impose a fee on the sale, you can also fill out the [*App fee*](#user-content-fn-8)[^8] field.

### Seller payouts in your Bubble app

As the default setting, any funds transferred to a connected account are held in the connected account's (seller's) Stripe balance and are scheduled for daily rolling payouts. If you want to modify the payout frequency, you can do so by changing settings in the [Stripe dashboard](https://dashboard.stripe.com/)'s payout settings.

For up-to-date information on that process, please check the documentation below:

External page: [Stripe Connect Payouts](https://stripe.com/docs/connect/add-and-pay-out-guide)

## Other ways to learn

<details>

<summary>Articles</summary>

* [The Bubble API](/help-guides/integrations/api/the-bubble-api) - how to send up API workflows that can receive webhooks from Stripe
* [The API Connector](/help-guides/integrations/api/the-api-connector) - to set up additional Stripe API calls not supported by the official Stripe plugin, you can use the API Connector

</details>

<details>

<summary>Core reference</summary>

[The Stripe plugin](/core-resources/bubble-made-plugins/stripe)

</details>

<details>

<summary>External documentation</summary>

[Stripe docs](https://stripe.com/docs)

* [Stripe Connect](https://stripe.com/docs/connect) (Stripe's marketplace solution)
* [Webhooks](https://stripe.com/docs/webhooks) (returning data from Stripe to your app upon an event)

</details>

[^1]: Stripe's transaction fee is the charge imposed by Stripe for processing a payment transaction. Stripe retains this fee after the funds have been successfully collected.

    The fee mentioned here is for illustrative purposes only.

[^2]: The platform fee represents the charge your app imposes on each transaction. The value, such as 5%, provided here is merely an example; you determine the appropriate fee for your platform.

[^3]: *Register the user as a seller* is an action that registers the currently logged-in user as a seller on Stripe.

    Reference: [Register the user as a seller](/core-resources/bubble-made-plugins/stripe#register-the-user-as-a-seller)

[^4]: You can find more information about each setting in the Stripe plugin in our Core Reference:\
    \
    Reference: [The Stripe plugin](/core-resources/bubble-made-plugins/stripe)

[^5]: Privacy rules only accommodate one tier of ownership. For example, if a privacy rule is connected to a user, you can refer to <mark style="color:green;">`product's user`</mark>, but you can't set up <mark style="color:red;">`product's shop's user`</mark>. You can read more about privacy rules in the article below:\
    \
    Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^6]: The *Charge the current user* action sends the current user to Stripe's checkout page to make a payment.\
    \
    For this action to be available, the official Stripe plugin needs to be installed in your app.\
    \
    Reference: [The Charge the current user action](/core-resources/bubble-made-plugins/stripe#charge-the-current-user)

[^7]: This field accepts the *User* data type.

[^8]: This field supports a currency value, and not a percentage. You can calculate a fee using an expression like the above example.
