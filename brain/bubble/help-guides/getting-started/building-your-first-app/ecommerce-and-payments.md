# eCommerce and payments
> Source: https://manual.bubble.io/help-guides/getting-started/building-your-first-app/ecommerce-and-payments · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
**Disclaimer:** Note that while Stripe is mentioned in this document as an example of a payment platform, this should not be interpreted as an endorsement or recommendation of Stripe's services. The information provided here does not constitute legal advice. As an app builder, it is your responsibility to select a payment platform that meets your specific needs. You are also responsible for ensuring compliance with the terms and conditions of the chosen payment platform.

We encourage you to conduct thorough research and, if necessary, consult with a legal professional to make an informed decision.
{% endhint %}

In this Article series, we delve into handling payments within your Bubble app. These articles are geared towards providing insights into the planning and deeper comprehension of payment systems, rather than delving into the technical aspects of payment setup. We’ll look into subjects like how your app will generate revenue in the first place, popular payment models, and strategies for implementing those models effectively

This article series uses Stripe in all examples, as it is the official plugin with the most extensive range of features accessible. Stripe also comes with detailed and developer-friendly documentation, and you will find links to relevant articles at the bottom of each article.

## How will your app generate revenue?

Deciding how to implement payments is not simply a matter of answering yes or no. All commercial apps generate revenue somehow, and many do so through payments. While the method can vary greatly, they all have one thing in common: they need users who are willing to pay for the services or products your app provides – and they need a sufficient number of such users to sustain the business.

Effective payment integration allows you to monetize your products or services directly. By providing products, services or compelling content behind paywalls, you can incentivize users to become paying customers, and unlock a steady stream of revenue. This is all straightforward – any for-profit enterprise revolves around the fundamental premise of generating more revenue than expenses. However, as we'll explore in this section, there are many ways to achieve this objective.

Think about it – what exactly are your customers paying for? There are different models for how to accept payments, but first, let’s try to answer that question. Put yourself in the chair of your user. Are they paying for:

* features that your app gives them?
* products or services, sold by your company, through your app?
* products or services, sold by other people, through your app?
* membership in a community?
* products or services offered by another app or website, through affiliate marketing?
* appointment for classes, bootcamps, coaching or other services?
* virtual goods?
* charity donations?

Some apps even generate revenue without direct payment from end-users, but instead move the transaction to a third party. For example, companies like Google and Meta create a major part of their revenue from marketing tools directing tailored messages to the users of the app. The users get free access, while Google/Meta get paid instead by businesses. Some companies outsource their revenue generation to a platform outside of their app, such as accepting donations and membership from service providers such as BuyMeACoffe and Patreon.

By knowing exactly how you will monetize your app, it will not only be easier to pick a payment provider and needed features, but you will also be prepared to design your app in such a way as to cater for these payments. For example, as an extension of the actual payment technology, you can start thinking about relevant details like a shopping cart feature, subscription plans (such as Freemium, Basic and Pro), delivery charges, third-party payments and taxes.

When you have decided on if and how your app should generate revenue, we can start looking at different alternatives for how direct payments can be accepted.

## Planning payment features

First, let's look at what we mean we talk about different *payment models*. Below, we're listing the three different models we'll be covering in this series, along with a wide range of examples to clarify what kinds of apps we mean:

### One-time purchases

The most basic kind of payment is a simple one-time purchase. This doesn't mean that each customer can only ever pay once, but that each payment is handled as an isolated event.

Examples include:

<table><thead><tr><th width="245">Purchase Type</th><th>Examples</th></tr></thead><tbody><tr><td>Products</td><td>Amazon, Etsy, Best Buy</td></tr><tr><td>E-books</td><td>Kindle Store, Barnes &#x26; Noble Nook</td></tr><tr><td>Pay-per-view events</td><td>UFC Pay-Per-View, WWE Network</td></tr><tr><td>Online courses</td><td>Coursera, Udemy (individual courses), MasterClass (single classes)</td></tr><tr><td>Mobile App Purchases</td><td>Premium app upgrades in App Store or Google Play Store</td></tr><tr><td>Digital Movie Purchases</td><td>Google Play Movies, Vudu</td></tr><tr><td>Donations</td><td>Buymeacoffee</td></tr></tbody></table>

### Subscriptions

Subscription payments are repeated on a given frequency, such as monthly or yearly.

Examples include:

<table><thead><tr><th width="320">Purchase type</th><th>Examples</th></tr></thead><tbody><tr><td>Streaming services</td><td>Netflix, HBO, Hulu, Disney+</td></tr><tr><td>Music streaming</td><td>Spotify, Apple Music</td></tr><tr><td>Software as a Service (SaaS)</td><td>Adobe Creative Cloud, Microsoft 365</td></tr><tr><td>E-book/magazine subscriptions</td><td>Amazon Kindle Unlimited, Scribd</td></tr><tr><td>Online learning platforms</td><td>LinkedIn Learning, Skillshare</td></tr><tr><td>Fitness and wellness apps</td><td>Peloton, Calm</td></tr><tr><td>Cloud storage and backup services</td><td>Dropbox, Google Drive</td></tr><tr><td>Meal kit delivery services</td><td>Blue Apron, HelloFresh</td></tr><tr><td>Gaming subscription services</td><td>PlayStation Plus, Xbox Game Pass</td></tr><tr><td>News and media subscriptions</td><td>The New York Times, The Washington Post</td></tr></tbody></table>

### Marketplaces

Marketplace apps are apps that rely on two parties: a buyer and seller. They can sell products or services, but what they have in common is that a portion of the generated revenue is handed off to a seller, creator or service provider.

Examples include:

| Marketplace type       | Examples                |
| ---------------------- | ----------------------- |
| Online retail          | eBay, Etsy              |
| Ride-sharing services  | Uber, Lyft, Grab        |
| Food delivery          | DoorDash, Grubhub, Grab |
| Freelance services     | Upwork, Fiverr          |
| Accommodation rentals  | Airbnb, VRBO            |
| Peer-to-peer selling   | Craigslist              |
| Digital goods exchange | Steam, Envato Market    |
| Artisan and handmade   | Etsy, ArtFire           |
| Event ticketing        | StubHub, Ticketmaster   |
| Book resale            | AbeBooks, BookFinder    |

As the app examples show, these three models support a wide array of different apps. Many of them may seem very different at first glance, but they share commonalities in our they are structured and arrange for payment and payouts.

Take some time to consider how you plan for your app to accept payments. Throughout the article, we'll used methods that rely heavily on Stripe's services, so first, let's cover how to determine whether Stripe is the right choice for your app in the first place.

## Choosing a payment provider

### Why are payment providers needed?

A payment provider is a service or platform that facilitates monetary transactions between your app and its users. They are crucial for handling the complexities of online payments, ensuring both security and efficiency.

Let's explore some of the reasons why they are needed:

1. **Security**: They provide robust security measures, protecting sensitive financial information through encryption and compliance with standards like PCI DSS.
2. **User trust**: A reputable payment provider builds user confidence, assuring them that their financial transactions are secure.
3. **Global accessibility**: Many providers support multiple currencies and payment methods, which is essential for reaching a global audience.
4. **Technical support**: Payment providers offer comprehensive technical support, easing the burden on developers to manage payment processing intricacies.
5. **Compliance and regulations**: They navigate the legal landscape of online payments, staying compliant with regional and international laws, thus reducing legal risks for your app.
6. **Efficiency**: They streamline the payment process with features like recurring billing and instant payments, enhancing user experience.

Realistically, setting up your own system for accepting payments is not a feasible project; there's a reason even the biggest companies in the world rely on third parties to handle monetary transactions. That being said, it's worth noting that it's only the actual *transaction* that is handled by the payment providers. That is, the actual collection of payment card information and communication with the card companies and banks.

How much you charge, and how you structure things like cost calculations, shopping carts and user interface is still entirely up to you.

### How does an online transaction through a payment gateway work?

Let's also explore what an actual transaction looks like, using the payment provider Stripe as an example. A transaction in this context is the exchange of money between two parties: your app (and company) and a customer.

When a payment transaction is processed through a service like Stripe, several steps occur behind the scenes to ensure the transaction is secure, authorized, and successful. Here's what typically happens:

1. **Initiation of transaction**: When your app requests a payment from an end-user, your app sends a request to Stripe. This request, even if you are using a plugin, is sent as an encrypted [API call](#user-content-fn-1)[^1].
2. **Tokenization**: Stripe converts the sensitive payment details into a unique token. This process, known as tokenization, ensures that the actual card details are not exposed during the transaction process.
3. **Authorization request**: Stripe sends this token along with the transaction details to the relevant card network (e.g., Visa, MasterCard) and the issuing bank for authorization. This step confirms that the card is valid and has enough funds or credit available.
4. **Bank's response**: The issuing bank checks the card's validity, fund availability, and runs fraud detection algorithms. Based on these checks, the bank approves or declines the transaction and sends this response back to Stripe.
5. **Completion of transaction**: If approved, Stripe informs the app of the successful transaction. The bank then moves to transfer the funds, a process known as settlement, which may take a few days.
6. **Funds transfer**: Once settled, the funds are transferred from the customer's bank account to the merchant's Stripe account, and then to the merchant's bank account based on their payout settings.
7. **Transaction record**: Stripe maintains a record of the transaction for future reference.

Throughout this process, security and compliance with payment industry standards are maintained to protect against fraud and ensure a secure transaction environment.

### Geographical availability

Before you can choose a payment provider, you need to ensure that the provider is available in the region where you want to accept payments. Even if a payment gateway is marketed as global, doesn't necessarily mean that it's available in every country and with any currency.

It makes sense to establish which providers are available to you early in the process. This way you can get to know the relevant payment provider's features and see how that affects your app. For example, Stripe offers a subscription feature and has a dedicated Bubble plugin, while a more regional provider may not offer the same convenient features.

### Features

Payment providers like Paypal and Stripe each have suites of features that they offer in addition to simply handling payments. These features, that include things like subscriptions, automated marketplace seller payouts and invoices may or may not be relevant to your app.

Keep in mind as you shop around for a payment provider that just because one provider offers a specific feature, it doesn't mean that all of them do. After having established what type of payments you want your app to facilitate, you can use these requirements to see which providers offer those capabilities.

### Regulations

Before selecting a payment provider, it's important to understand the regulatory landscape governing financial transactions in your target market. Various regulations, such as [Strong Customer Authentication (SCA)](#user-content-fn-2)[^2] in Europe, impose requirements on how payments are processed and authenticated (Stripe Checkout handles SCA automatically in the majority of cases).

Similar to geographical constraints, not all payment providers may support compliance with these regulations or operate in every jurisdiction where your app intends to accept payments. Therefore, you should research and verify whether a payment provider supports the regulatory requirements of your target regions.

### Ease and cost of implementing

In the majority of cases, there are a few different ways to implement a payment gateway:

#### Official plugins

The easiest and quickest way to get a payment solution set up in Bubble is to use plugins. Bubble has multiple official plugins for major providers like Stripe, PayPal, and Braintree. The official plugins typically have the most widely used payment features built in, but lesser used features or brand new features may not have been implemented. If you decide to use a plugin, remember to check which features it gives access to.

**Community plugins**

The Bubble community also has a wide range of different payment plugins. Some of these connect to payment gateways that are not supported by official plugins, while others connect to the same gateway but offers a collection of additional features. Keep in mind that community-made plugins depend on the developer for support and maintenance.

#### The API Connector

Bubble's API Connector plugin is a robust tool for connecting to external APIs, including payment gateways. If you want to connect to a provider not listed in the plugin store, or you want to access features not supported by a plugin, the API Connector offers a secure way to set this up. This requires a bit more know-how than using a plugin, but offers more flexibility.

### Offering multiple providers

Some apps have multiple payment providers, to offer their users the freedom to choose their preferred or available provider. For example, implementing both traditional card payments and PayPal may have a positive effect on the signup-rate.

While this approach can make sense, keep in mind the following:

* For each provider you choose to implement, you add to your app's development and maintenance time
  * This can also branch out into areas of your business that you may not have planned for, such as increasing the accounting work and complicating compliance
* If you rely on specific features offered by a payment gateway, such as Stripe subscriptions, it can be tricky or impossible to implement the same feature set to users that pay with a different gateway.
  * For example, combining subscriptions managed in Stripe with another payment gateway can require workarounds
* Different gateways can have different cost structures – remember to take this into account when you calculate prices and costs
  * For example, payment providers may have different transaction fees. Some take a percentage, others a set amount, and many take a percentage as well as an amount.

This is not meant to discourage a decision to implement more than one gateway, but to help you make an informed decision. You may also be interested in checking out solutions that already offer multiple ways to pay, such as Braintree[^3].

## Shopping carts

Many eCommerce solutions have a shopping cart, that allows customers to add items to a cart, and check out all items at once. This is not required, but an additional feature that you can consider. In the next article in this series, we'll look at some of the planning that goes into building a shopping cart features:

Article: [Shopping cart](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/shopping-cart)

## FAQ: Payments

#### Is a payment token an encrypted version of the card details?

No, it's not accurate to say that a token is an encrypted version of the card details. Tokenization and encryption are different processes. A token is a unique identifier that represents the card details but does not contain or reveal the original data. It's more like a reference code that maps back to the sensitive data through a secure system. Unlike encrypted data, which can be decrypted back to its original form, a token alone cannot be reverse-engineered to reveal the original card details. This makes tokenization a secure method for handling sensitive information in transactions.

#### What is the difference between a payment provider like Stripe, and a card issuer like Visa or Mastercard?

Payment providers and card issuers serve different roles in the payment process:

*Payment provider (Stripe):*

* Role: Stripe is a *payment processor* or *gateway*. It acts as a mediator between merchants (like your app) and the financial institutions involved in a payment transaction.
* Functionality: Stripe handles the technical aspects of processing online payments, including security (like tokenization), authorization requests, and facilitating the transfer of funds.
* Services: Apart from processing payments, Stripe offers a range of financial services including handling subscriptions, storing customer payment information securely, and managing different payment methods.

*Card issuer (Visa or Mastercard):*

* Role: Visa and Mastercard are card networks and issuers. They provide the infrastructure that allows their credit and debit cards to be used for payments worldwide.
* Functionality: They set the terms and conditions for their cards, process transactions made with their cards across their networks, and provide the link between cardholders' banks and merchants' banks.
* Responsibilities: These companies are responsible for authorizing and settling credit and debit card transactions, setting interchange fees, and ensuring security and fraud prevention measures on their network.

#### Who pays the transaction fee? Me or my app's end-users?

Most app owners view transaction fees as a necessary cost of doing business, and typically, users are not aware of the fees retained by the payment gateway. Generally, payment providers calculate these fees based on the total transaction amount. In marketplace apps, it's not unusual for sellers registered on the platform to bear the transaction fees, but this is not a requirement from the payment gateway.

Regardless of the policy adopted, the payment gateway usually will not display these fees to the end-user during the transaction process. Instead, the fees are often detailed in the merchant's agreement with the payment provider and reflected in the backend accounting.

Whichever policy you choose, it's important to understand and account for these fees in your app's pricing structure and revenue model.

#### What is PCI DSS?

As a reminder, the Bubble user manual is **not** a source of legal advice, and you should always consult a legal professional for up-to-date and correct information for your particular project.

The Payment Card Industry Data Security Standard (PCI DSS) is a set of security standards designed to ensure that all companies that accept, process, store, or transmit credit card information maintain a secure environment. Established by major credit card companies, PCI DSS aims to protect cardholder data from fraud and security breaches.

This standard comprises a comprehensive set of requirements for enhancing payment account data security. These requirements include measures for network architecture, software design, and other protective processes. Organizations are required to adhere to these standards to safeguard sensitive cardholder information.

PCI DSS is not a single-time compliance effort but an ongoing process. It involves regular monitoring and testing of systems to ensure they meet security requirements. Compliance with PCI DSS is mandatory for all entities dealing with credit card transactions to minimize the risk of data breaches and enhance consumer trust in payment systems. Stripe offers a more in-depth guide about PCI DSS that you can find below.

External page: [A guide to PCI compliance | Stripe Docs](https://stripe.com/en-no/guides/pci-compliance)

#### How do I make my app PCI DSS compliant?

As a reminder, the Bubble user manual is **not** a source of legal advice, and you should always consult a legal professional for up-to-date and correct information for your particular project.

In short, Bubble is not designed for PCI DSS compliance, and as such, you should never process or store cardholder data like card number, expiry date and security in your Bubble app. One of the major reasons for using a payment gateway in the first place, is to outsource the compliance requirements to a third party that specializes in handling cardholder data securely. By using a solution like Stripe Checkout, users are redirected to a secure payment page hosted by Stripe, meaning that your app is not involved in processing the cardholder data in any way.

The PCI DSS (Payment Card Industry Data Security Standard) standard pertains exclusively to entities involved in **storing, processing, or transmitting cardholder data within the payment card industry**. Payment gateways handle the secure processing of payment information, which can substantially alleviate the compliance burden.

Your app may still have PCI DSS compliance obligations, depending on how it interacts with payment card information. If your application transmits or processes cardholder data in any form, it must adhere to PCI DSS requirements. The level of compliance required varies based on the volume and manner of transactions your app handles. Please consult a legal professional if you are in doubt.

For more comprehensive information on PCI DSS compliance, we recommend consulting Stripe's detailed guide. However, remember that this guide should be used in conjunction with the official PCI DSS guidelines. Depending on your specific scenario, you may also want to seek professional advice to ensure complete compliance.

External page: [A guide to PCI compliance | Stripe Docs](https://stripe.com/en-no/guides/pci-compliance)

## Other ways to learn

<details>

<summary>Articles (APIs)</summary>

* [The Bubble API](/help-guides/integrations/api/the-bubble-api) - how to send up API workflows that can receive webhooks from Stripe
* [The API Connector](/help-guides/integrations/api/the-api-connector) - to set up additional Stripe API calls not supported by the official Stripe plugin, you can use the API Connector

</details>

<details>

<summary>Article (database structure)</summary>

* [Database structure guides](/help-guides/data/the-database/database-structure-by-app-type) (article series that offers a lot of tips on exactly how to structure a particular app type, such as an eCommerce store)
  * [eCommerce apps](/help-guides/data/the-database/database-structure-by-app-type/online-store-ecommerce-apps) (direct link to eCommerce app database structure article)

</details>

<details>

<summary>Core reference</summary>

[The Stripe plugin](/core-resources/bubble-made-plugins/stripe)

</details>

<details>

<summary>External documentation</summary>

[Stripe docs](https://stripe.com/docs)

* [Stripe Checkout](https://stripe.com/docs/payments/checkout) (Stripe's one-time payment feature)
* [Stripe Billing](https://stripe.com/docs/billing/subscriptions/overview) (Stripe's subscription feature)
* [Stripe Connect](https://stripe.com/docs/connect) (Stripe's marketplace feature)
* [Invoices](https://docs.stripe.com/api/invoices) (How invoices work in Stripe)<br>
* [Webhooks](https://stripe.com/docs/webhooks) (sending data back to your app from Stripe upon an event, such as a completed transaction)<br>
* [A guide to PCI compliance | Stripe Docs](https://stripe.com/en-no/guides/pci-compliance) (comprehensive guide on PCI DSS)

</details>

[^1]: An *API call* is a request sent to access/modify data or initiate a specific action in a server. It's like asking a question or making a request between two apps/systems in a specific language, which the API understands and responds to.

    In this context, an API call is made from your app to the Stripe server.

    Article series: [APIs](/help-guides/integrations/api)

[^2]: *SCA (Strong Customer Authentication)* regulation is a requirement within the European Union aimed at enhancing the security of online payments and reducing fraud.

    It mandates that customers authenticate themselves using two or more factors when making electronic transactions.\
    \
    External page: [SCA | Stripe Docs](https://stripe.com/en-no/guides/strong-customer-authentication)

[^3]: Braintree, owned by PayPal, offers traditional card payments as well as additional solutions such as PayPal, Venmo, Google Pay and Apple Pay.

    External page: [Braintree](https://www.braintreepayments.com/)
