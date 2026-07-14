# Checkout page
> Source: https://manual.bubble.io/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/checkout-page · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

In this article, we'll look into what is often the final step before the user actually pays for one or more products – the checkout page.

## Defining the checkout page

The checkout page often gives your end-users a final look at their purchase before they commit to buying and go ahead with the payment transaction. Its purpose is to provide all the details needed for a user to make an informed purchase decision, and with the added benefit of building trust and confidence in your app, if set up right.

Below is an example of what a checkout page may look like. As an internet user, you will likely have seen many of these. While they can differ in design, many of them contain the basic elements needed for the purposes described above, and for the business to stay compliant with relevant requirements, such as the GDPR[^1] and CCPA[^2], as well as commerce and tax laws.

<figure><img src="/files/V8D7mM6wTEk78GfFtTNT" alt=""><figcaption><p>A checkout page should give customers a well-organized final look at what exactly they are purchasing, what they will be charged and why, and the method by which they will be paying. In some cases, other details are also relevant, such as the delivery address for physical products.</p></figcaption></figure>

Your user interface and user experience both play a very large part in generating revenue, ensuring customer satisfaction, and compliance with regulations[^3]. In this section, we’ll go over some of the most important things to keep in mind when you design your checkout experience.

## Planning a checkout page

### Transparency

Whenever any transaction is involved, transparency is important. What this means is that you should set up your app to clearly show what exactly the customers are purchasing and why they are paying a certain amount. From a regulatory perspective, including specific details about any transaction may also be required.

This is usually done by listing all the details involved in a transaction, from the user’s perspective. The different records in a purchase transaction are often divided into three categories:

<table><thead><tr><th width="165">Record</th><th width="323">Description</th><th>Visible to customers</th></tr></thead><tbody><tr><td>Line items</td><td>The actual items being purchased, such as a beanie and a book</td><td>Yes</td></tr><tr><td>Additional fees</td><td>Extra costs, such as shipping</td><td>Yes</td></tr><tr><td>Cost of sales</td><td>Payment gateway transaction fee, and operational costs</td><td>No</td></tr></tbody></table>

A good practice is to list the line items and any additional fees separately, while incorporating the cost of sales into the product cost.

For instance, it's relevant to show the price of each item in a cart along with the combined shipping cost, as this provides transparency to the customer. However, fees associated with the payment gateway transaction, are typically not relevant to the customer and are often absorbed into the product cost. Therefore, these costs are usually factored into the overall pricing of the product rather than being itemized separately.

Displaying your business details, including its legal name, address, phone number, email address, and government organizational ID, is not only a recommended practice but also a requirement in many regions.

### Ease of use

Making a purchase process easy to understand and quick can also help you generate more sales and satisfied customers. When customers find it easy to navigate through the checkout process, they are more likely to complete their purchases and return for future transactions.

* **Reducing steps:** reducing the number of steps the customer has to take in order to complete the purchase can increase the conversion rate. Some eCommerce sites, like Amazon.com, have even implemented a one-time checkout process that lets returning customers buy products with a single click, since Amazon already has the information needed to complete it.<br>
* **Responsive design:** making your app work well on mobile devices, as well as larger screens, increases the number of potential customers. Using Bubble’s responsive engine, you can make the same page work well on all screen sizes and devices. Keep in mind the differences between different devices:<br>
  * Font sizes that appear suitable on a laptop screen may appear too small on mobile devices.<br>
  * Buttons and links that are to small, or placed too closely together, can be challenging for mobile users to click.<br>
  * Ensure that elements do not overlap in certain scenarios. For instance, an element placed within a floating group that appears well-positioned on a laptop screen may overlap crucial elements on mobile screens.<br>
* **Editable cart:** if you are implementing a shopping cart feature that allows the users to add more than one item, they may find it useful to be able to make changes to the cart, such as deleting an item.

### Cross-selling and upselling

Cross-selling and upselling are both sales techniques used to increase the value of a purchase, and can be of value to the user as well.

* **Cross-selling:** Cross-selling means recommending related or complementary products to the one the customer is already considering or has already purchased. The aim is to encourage customers to add additional items to their cart that enhance or complement their original purchase. For example, suggesting batteries when a customer buys a flashlight or offering a phone case when purchasing a new smartphone. As these examples show, cross-selling can also be useful to customers if you display the right products or services.<br>
* **Upselling:** Upselling involves persuading the customer to purchase a higher-end or more expensive version of the product/service they are interested in or have already chosen. For example, encouraging customers to upgrade to a larger size, premium model, or extended warranty when buying a product.

### Post-purchase information

* **Purchase confirmation:** it’s always a good idea to let the user know the status of the transaction. If it is successful, it’s common to redirect the user to a thank you page or section. Thank you pages are also sometimes used to track sales analytically in platforms like Google Analytics.<br>
* **Email confirmation:** many users will also be looking for an email that confirms the purchase and its details. You can use our dedicated Sendgrid plugin to send customized emails. Emails that are used for this purpose are generally known as transactional emails.<br>
* **Tracking links:** if you are selling physical products, users may find it useful to be able to track the shipment. Many courier companies have an API that allows you to set up a shipment and get a tracking number in return. You can use the API Connector to set this up.

***

Keep in mind that all of the above suggestions are just that – suggestions. Your final checkout page is yours to design, and this is meant just to inspire. However, keep in mind that keeping your users informed, the process transparent and fast, and the design working on all relevant devices are all good basic tips for setting up. Also, make sure that your checkout page is compliant with any rules and regions that pertain to your sector, type of products/services and geographical region.

## Transactional details

{% hint style="danger" %}
It's important to emphasize that when we discuss transactional details, we are not referring to cardholder information, such as the card number, expiration date, and security code. These particulars are typically managed by the payment gateway and should not be stored in your app's database.
{% endhint %}

Whenever a customer pays for something, like the items in a shopping cart, a transaction happens. If you're using an online payment gateway such as Stripe, this is an automated process that arranges for money to be moved from the customers bank account to your company's account.

Whenever such a transaction takes place, the payment gateway stores details about it, such as the date, time, customer info and amount. This record in their database is given a unique ID that helps you identify it later if needed. For example, a customer might ask for a refund, at which point you'll need to refer to the original payment.

It's highly recommended to store some details from the transaction in your Bubble database when a transaction is complete.

Structurally, there are some questions worth asking:

* Will purchases always be for **one item**, or for a **collection of items** (shopping cart)
  * This could affect where it makes the most sense to store the transactional details
  * If your app has a shopping cart feature, it makes sense to save the transaction ID on a data type that represents the full purchase (as opposed to each individual item), such as the data type that represents the shopping cart
* Which **details** do I want to store?
  * Storing the transaction ID normally allows you to get other details such as date, time, and amount from the payment gateway
  * You can still opt to save other details. For example, you might need them to create and maintain statistical data.

The transaction ID is normally returned right after the transaction is finalized. The official Stripe plugin automates this process by giving you access to the ID in the same workflow that initiated the payment. We cover this in the next article in this series:

Article: [One-time payments](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/one-time-payments)

[^1]: GDPR, or the General Data Protection Regulation, is a comprehensive data protection law enacted by the European Union (EU) to safeguard the privacy and personal data of individuals within the EU and the European Economic Area (EEA).\
    \
    Article series: [Compliance](/help-guides/optimizing-an-application/compliance)

[^2]: The California Consumer Privacy Act (CCPA) is a state law in California designed to enhance privacy rights and consumer protection for residents of California, United States.

    It grants consumers more control over the personal information that businesses collect about them and imposes obligations on businesses regarding the collection, use, and disclosure of personal information.

[^3]: In many regions worldwide, online commerce is subject to regulation aimed at safeguarding consumer rights, ensuring transparency, facilitating returns, addressing complaints, and ensuring compliance with taxes and other fees.

    If you're considering venturing into online sales, it's highly advisable to seek legal guidance to ensure compliance with regional and sector-specific regulations.
