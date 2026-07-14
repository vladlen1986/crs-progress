# Shopping cart
> Source: https://manual.bubble.io/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/shopping-cart · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Many apps that accept payments will use the metaphorical approach of a *shopping cart*. As that phrase suggests, this allows your users to add multiple items to a cart, and then check out all of the items at once in one single transaction that includes both the items and any related costs such as shipping.

{% hint style="info" %}
This article explores the use of a shopping cart feature in your app, focusing primarily on planning considerations rather than providing a step-by-step implementation guide. If you're seeking a practical example illustrating how an eCommerce shopping cart can be structured, we recommend exploring our database structure guide.

Article series: [Database structures by app type](/help-guides/data/the-database/database-structure-by-app-type) | [Online store](/help-guides/data/the-database/database-structure-by-app-type/online-store-ecommerce-apps)
{% endhint %}

## Defining a shopping cart

Shopping carts, like many app features, are easier to implement if you decide and plan ahead. The reason for this is that your database, pages and workflows will be structured in a different way if you decide to add a shopping cart feature, as opposed to only allowing the purchase of one item at a time.

The shopping cart is already a well-established and useful metaphor, so we'll stick to that. Let's look at what exactly it is from a structural perspective:

<figure><img src="/files/JQWPfA6OyWygjtyRQD1J" alt="" width="375"><figcaption><p>A shopping cart is simply a metaphorical container for all the items a user wants to check out at the same time.</p></figcaption></figure>

That's pretty simple! But even with a simple thing like this, it's useful to give some quick thought as to what exactly it is we are talking about. An online shopping cart is very much akin to the real-life experience of adding items to a cart, almost to the point of no longer being a metaphor:

1. A **customer browses the store**, often looking at products sorted by different categories
2. They **add items** to a shopping cart, and that shopping cart moves along with them to the checkout
3. They **pay for all items** at once
4. The next time they show up, an empty shopping cart is waiting for them

Let's use this scenario, which anyone in the world can recognize, and draw out a few facts that help us think about how the value an actual shopping cart adds in real life:

1. The shopping cart is a **convenience**, making the shopping experience easier. It **doesn't hold any value in itself** – users are paying for the items within, not the cart itself.
2. It helps the user **maintain a list of products**, without having to remember them or write them down
3. Everyone agrees that the products are **reserved** for that customer as long as it is in their cart. This is sometimes true in the online world as well.
4. It **frees up time for the employees** in the store – they don't have to fetch and reserve the items for the customer.

An online cart is simply a digital version of that. It helps your users collect items and bring them to checkout, sometimes reserving the product(s) within in the process.

As a shop owner, you are using automation to allow customers to handle their order. You don't need to take orders by email, confirm the inventory, add the items to an invoice or anything else: in essence, you are letting the user handle most of the data entry.

<figure><img src="/files/jxVSQCqLb4KS3PyzggrC" alt=""><figcaption><p>Adding a shopping cart to your app mirrors its physical brick-and-mortar counterpart closely, almost to the point where it stops being a metaphor.</p></figcaption></figure>

For the customer, an additional upside of the digital cart, is that it offers an organized table of information that aids them in the purchase decision:

* The **list of items**
* The **total number of items**
* The **total sum** to pay
* The **total** **shipping cost**

Of course, depending on the nature of your store, more or less information can be made available. The point is that the shopping cart is not only a container, but a good way to organize and aggregate information for both the customer and the seller.

Now, that we have agreed what a shopping cart is, and the value it brings to the buyer and seller, we can look at it from a more technical and structural perspective.

## Deciding whether to implement a shopping cart

A shopping cart feature can have many benefits, but it will also add to the development time and complexity of your app.

Here are some key considerations when deciding whether to implement a shopping cart feature:

**Complexity of products/services**: Consider the complexity of the products or services your app offers. If users typically purchase multiple items or services in a single transaction, a shopping cart can streamline the checkout process by allowing them to add items as they browse and complete the purchase all at once. On the other hand, if your app primarily offers simple, single-item purchases, a shopping cart may be unnecessary and a direct checkout process could suffice.

**User expectations**: Think about user expectations and industry standards. Many users are accustomed to shopping cart functionality from e-commerce websites and may expect a similar experience in your app if they are purchasing multiple items. Providing a familiar and convenient shopping experience can enhance user satisfaction and encourage repeat purchases.

**Order size and frequency**: Evaluate the typical order size and frequency of purchases in your app. If users tend to make large or frequent purchases, a shopping cart can help them organize and manage their orders more efficiently. However, if purchases are usually small or infrequent, a direct checkout process without a shopping cart may be more suitable.

**Cost for users**: Sometimes, a shopping cart feature can make the final cost lower for the user, and may be considered more fair from the user's point of view. For example, shipping two or more items together may be more cost-efficient than shipping them separately. If the lack of a shopping cart negatively affects users in this way, a shopping cart feature may be a welcome feature.

**Cross-selling opportunities**: Consider whether your app could benefit from cross-selling or upselling opportunities. A shopping cart allows you to suggest related items or offer promotions based on the contents of the user's cart, which can help increase sales and revenue. If cross-selling is an important aspect of your business model, implementing a shopping cart feature may be advantageous.

**Checkout flow**: Evaluate the checkout flow and user journey in your app. A shopping cart can provide a clear and structured path for users to review their selections, enter payment and shipping information, and confirm their order. If your app's checkout process involves multiple steps or requires users to provide additional information beyond just selecting items, a shopping cart can help simplify and streamline the process.

**Communication:** if a registered user adds one or more items to a cart, they have signalled an interest in those items, that you can use to increase sales. For example, you can send a user a follow-up email, reminding them that they have items in a cart, suggesting that they finalize the purchase.

## Planning a shopping cart

Our metaphorical cart is a container for items, and the digital version is no different. From a database perspective, this means we need to think about how to store the items in the cart, and what their relationship should be. We highlight some of the questions that are worth asking as you start planning.

### The cart, products and items

In the physical world, the products in the shelves don't change as you put them into the cart. But if you think about it – their *state* changes. They're no longer on the shelf, they are part of a joint transaction that will be documented on a receipt, and they are of course coming with the customer to their home.

In the same way, the items in a customer's digital shopping cart may *look* like the same product as is displayed on the shelf, but in many cases it isn't. Their state has changed as well, and from a database perspective, this is worth pausing and thinking about.

Let's define three things before exploring further:

* The **product** is the thing that you show your users in a list or on a page: the product on the shelf
  * The **item** is the thing that the user actually collects and pays for: the item in the cart
* The **cart** is the container that holds the items.

How are *products* and *items* different? In some cases, they aren't, but as we talked about *states* in the real world, these sometimes have to be taken into consideration when working digitally. The distinction is not necessarily visible to your customers, and is another example that the structure of your database does not always have to match what the user sees. The idea of using *products* and *items* as separate entities is to be able to manage each one in isolation – if that sounds cryptic, keep reading: we'll use some examples to illustrate:

#### Changing products

A product or service may change during its life cycle. For example, a beanie may cost $15 during the winter season, and then the price is dropped to $10 during the summer season. Likewise, a property like color, size, name or description could be updated.

From a database standpoint, let's consider a scenario where we have two main data types:

* Carts
* Products.

Products are viewed, added to carts, and then they are sold.

However, this setup can pose a challenge regarding historical records. If a product in a cart is the same database thing as the one you display in the store, any changes made to the product will retroactively update all previously purchased instances of that product. Consequently, when viewing their order history, users may be surprised to find items and prices they no longer recognize, and the total sum on the cart may no longer reflect what they actually paid.

#### Deleting products

Expanding on this line of thinking, there are scenarios where a product, after being added to the cart and subsequently purchased, might be deleted from your app's database. If the original, viewable product (the product in the store's shelves) were directly linked to the cart data type, this could result in the product disappearing from previously checked-out carts, since the database thing no longer exists. This not only has the potential to confuse customers who access their order history but could also distort purchase statistics.

### Maintaining historical records

To mitigate these issues, we can set up a database structure that allows us to store a historical record of a product *at its time of purchase.* There are different ways to do this, and our list of suggestions is surely not exhaustive, but can introduce you to some ideas on how to find the right balance between engineering effort and maintaining records for historical and statistical purposes.

**Storing items as a separate data type**

You can create a separate data type, which represents the product *as it was* when it was added to the cart. This means you copy all relevant information from the product (such as the name, price and description) over to the new thing when it is created. You have the option to create this record either upon addition to the cart or upon checkout.

* Opting for the latter can be advantageous as it prevents the addition of redundant records that may remain in the database if the user abandons the cart, as well as making sure the information is up to date at the time of purchase.
* This method also offers flexibility in managing future updates to the cart. For instance, if an item needs to be returned and refunded later on, having each item in the cart stored as separate database entities enables you to utilize these records to uphold the complete history of each item.
* Connecting this data type to the actual product can be advantageous (such as *item's product*). Doing so allows you to track statistical metrics isolated to a single product, such as the number of items sold, total revenue generated, and the number of products returned.

**Storing a receipt**

You can also store additional information directly on the cart, such as a textual representation of the items sold. This is akin to the printed receipt in the physical world, providing a static record of the purchase.

* This way, you are storing less data in the database, and spending less WU, at the cost of some flexibility.
* You can set up the receipt to store as much information as needed, and it will remain static regardless of subsequent changes to products, shipping costs or other variables that might change over time.

**Storing products in Stripe**

{% hint style="info" %}
The use of the product object in Stripe's API is not natively supported within the standard Stripe plugin. To use this feature, you must either set up a connection through the [API Connector](#user-content-fn-1)[^1], or find a community plugin that supports this.
{% endhint %}

Stripe supports adding products. Products can be created in the Stripe dashboard, or be created and updated through the Stripe API. There are pros and cons of using this approach:

* Stripe automatically maintains historical records. For example, if a product is purchased, and subsequently modified or deleted, the historical record in Stripe's database remains unchanged. That way, the records kept at the time of purchase are immutable, and changes will only affect future transactions.
* You can not only sell, but also fetch arrays of products with their details through the API to show them in your app.
* Stripe provides default fields such as name, description, package dimensions, and a shipping boolean to indicate if the product is a physical good. However, its capability for further customization beyond these built-in fields is limited.
  * The price is stored as a separate object
* By using Stripe, you become dependent on a third-party service, which can lead to a degree of lock-in with their system. Should you wish to incorporate additional payment providers or switch to a different payment gateway, significant modifications to your existing setup may be required.
* If you have a very large number of products, it might become challenging to efficiently manage and navigate through them within Stripe's dashboard or via API calls. Stripe may also encounter [rate limits](#user-content-fn-2)[^2] if you continually perform API requsts.

As the list shows, Stripe can be a good choice for securely storing accurate product sales data, but comes with some limitations. If you want to avoid lock-in, or if you offer a large portfolio of products, it can make good sense to maintain the flexibility that setting up a customized solution in Bubble offers.

### Shopping cart features

Deciding on what kind of features your shopping cart should offer is also worth planning before building. As we discussed in the *Planning features* section, features are not something that you need to implement all at once – you can do so in batches, and collect feedback from users as you go.

Let's look at some common features you can consider:

#### Add to cart

This feature seems blatantly obvious, but there are some considerations worth having a look at. The first is of course that you will need some way to add items to your cart in the first place. As we covered in the previous section, the method for doing this varies across different apps, so the actual structure and workflows needed will also differ.

Secondly, there may be sub-features to the *Add to cart* feature that may need some closer inspection:

* **Quantity:** some eCommerce stores choose to let the user select a quantity when they select a product. That is, the quantity of *one* product (as opposed to the total number of items). For example, a user may buy two identical beanies.
* **Attributes:** Products may have different attributes, such as size, color, and material.
* **Inventory**: if you plan to build an app that keeps track of an inventory, you may need to set this up in a way, so that a sold item is subtracted from that inventory. This can also be extended into reserving items for a period while they are in the cart. Additionally, implementing a feature to check the inventory status of a product before it is added to the cart can ensure real-time accuracy.
* **Booking**: if you are selling services such as consulting, coaching, or other types of live sessions, you need to make the Add to cart feature different than a typical eCommerce store. For example, instead of picking a product and color, the user may pick a service and then proceed to pick a date in a calendar. Perhaps you'd also want this system to automatically check your availability based on other booked sessions, or by connecting it to an external calendar through the API Connector or a plugin.
* **Customization**: depending on the product or service you are selling, you may also need more complex customization. For example, if you are a travel operator, the user may have the opportunity to pick a duration, lodging or other trip details.

The purpose of listing these points is of course not to imply that every app needs this extensive feature set, but to highlight that adding something to a cart may be as simple as clicking a button, or more complex. Whatever you need, Bubble can handle it.

#### Delete from cart

A common feature that's easy to forget, is the ability to delete one or more items from the cart, without having to delete the whole cart and start over.

#### Edit cart

The same goes for editing a cart. Again, depending on what you sell, editing can simply mean adjusting the quantity of one single line item, or allowing more extensive edits, such as changing a booking date or product/service attribute.

#### Shipping

If you are selling physical products, you may need to implement a feature to collect a user's address.

* **Text field:** the simplest way to get and store a user's address is by use of a simple text field. You can also use the *Address* field type, combined with the *Searchbox* element, to let the user search for an address from Google Maps. This way, the user can quickly add all relevant information without having to type it in.
* **Tracking**: if you want to implement a feature for tracking a shipment, you may need to connect to a courier that offers an API for this. Tracking usually works by registering an expected shipment with the courier using an API call, and getting a tracking number in return that you can show or send to the user.
* **Dynamic shipping cost**: there are different ways in which shipping cost can be dynamic. For example:
  * Shipping items together can be more efficient than shipping them individually
  * The weight, volume and distance of the shipment can affect the total cost
  * Shipping sensitive items, like art, may also be priced differently.\
    \
    Again, it can be useful to connect to a courier service and provide them with data that allows them to calculate and return the cost to you. If that is the case, you may need to store some data on the products, such as its weight and volume.

#### Accessing the shopping cart

As a user adds items to the cart, they will at some point want to see their order to complete the purchase. Keep in mind that this is one *step* that a user has to go through in the checkout process, so it makes sense to make it easy for the customer to understand how to navigate to it.

It has become a common practice to place an easy-to-see icon in the top-right corner of the app, as illustrated below:

<figure><img src="/files/9TKcyZrxJ37K1Rtb6RqZ" alt=""><figcaption></figcaption></figure>

This design practice has become so prevalent, that many users are expecting it there. Still, you can play around with additional features to encourage users to go to their cart to finalize the purchase, and increase your conversion rate:

* **Item counter:** some apps choose to have a counter next to the cart symbol to indicate that there are items in the cart. Not only is this an easy way to confirm that an item has been added, but it as the added upside of being a gentle way to remind users of their cart, should they abandon it and then return to the store at a later time.
* **Nudges:** you can also be creative with subtle nudges to encourage people to go to the cart, such as a slight animation of the cart symbol, a change in color when the cart is not emtpy, or even a popup message or floating group that asks if the user wants to proceed to the cart after adding an item.

### The shopping cart page

In many cases, the page that holds the shopping cart, is the same page as the *checkout* page, which we will explore in the next article in this series. We are using the word *page* to indicate an isolated section where the user can see the contents of their cart. You can also choose to set it up as a [single-page application](#user-content-fn-3)[^3], meaning that the shopping cart/checkout page is a group that you show and hide as needed.

In the next article in this series, we'll have a look at the checkout process.

Article: [Checkout page](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/checkout-page)

[^1]: The *API Connector* is a Bubble-made plugin that lets you set up outbound API calls to external apps and services.

    Article series: [The API Connector](/help-guides/integrations/api/the-api-connector)

[^2]: Rate limits refer to the restrictions placed on the number of API calls or the amount of data a single client can request within a specified timeframe. For instance, if an API imposes a rate limit of 500 calls per client per day, any requests beyond this threshold within the same day may be blocked or denied until the limit resets.\
    \
    Article series: [APIs](/help-guides/integrations/api)

[^3]: A single-page application is an app that relies on hiding and showing content on the same page, instead of loading a new page to show specific content. You can read more about this in the dedicated article below:\
    \
    Article series: [Single-page and multi-page apps | Navigation](/help-guides/logic/navigation)
