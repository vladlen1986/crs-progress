# Online Store / Ecommerce Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/online-store-ecommerce-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Petter Amlie, Amlie Solutions*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

In this guide we’re building an online store, similar to something like Amazon or Shopify: a place where Users can add Products or Services to a Shopping Cart and go through a checkout process where they pay for the items.

For an eCommerce store, no matter what you are selling, there will be a mix of public and private data. For example, Products need to be public, because Users must be able to search for them and add them to their Cart. But a User’s shopping history must only be visible to that User, and to the employees who are fulfilling the order. For this, we’ll use Privacy Rules, and you’ll see that you have full control over who can see what in your application.

We’ll also take into account that you need to retain some historical records at the time of purchase. This is to make sure that Products that may change over time (such as the price being adjusted) does not affect past purchases.

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

There will be four major Data Types involved in our online store. The User is of course built into Bubble already, but we’re making some key changes to them to make sure we can separate different types of Users from each other. The second is the Product. This one is a public data type that people can search for and review its details before adding it to our third data type: the cart. The cart is the container that holds Products while the User is shopping, and it allows the User to pay for all items at the same time, as well as maintaining the Users purchase history by showing each Cart as a separate order.

Finally, we’re setting up a Cart item Data Type. We use this item to store information after the purchase has been made to make sure we know what each item cost and how it was described at the time of purchase.

Let’s have a look at the details.

### User <a href="#h.3pxvwyrme17k" id="h.3pxvwyrme17k"></a>

Your app will of course consist of Users. In our case, there will be two types of Users that we need to think about:

* Regular Users (users who have registered an account in your application)
* Admins Users (users who have access to your application's back-end to fulfill orders)

#### Suggested fields on this type <a href="#h.mxa3kiqcv1oa" id="h.mxa3kiqcv1oa"></a>

* Name - text
* Phone number - text (if relevant to your app)
* Shopping cart - Shopping cart: This field will be used to store the currently active Shopping cart that the User can add Products to
* Admin - yes/no: This field will be used to determine whether the User is an administrator or not. You can set this field’s default value to “no”

#### Privacy rules for this data type <a href="#h.7wkvul7c2kic" id="h.7wkvul7c2kic"></a>

In most online stores, we do not want Users to be able to see each other’s cart and we also want to keep it hidden that a User is registered at all, except to the User themselves and Administrators.

Our first rule will let Users see and edit their own information:

If this User is Current User, this User can:

* View all fields: yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding:
* Name: Yes
* Phone number: Yes
* Cart: No
* Admin: No

As you can see, Users can now edit all their own information except for a few key fields: The Admin field (since otherwise that would make any User able to set themselves up as an administrator) and the Cart field (since the platform needs to be programmatically in control of that field as the User navigates the shopping process).

Ok, so the User is all set up to handle their own info. As we discussed, we also need a kind of Administrator User that maintains the platform and fulfills orders. We set up the admin field to handle separate those Users, so let’s set up the Privacy Rule as following:

If Current User’s admin is yes, this User can:

* View all fields: yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: yes

With this rule, we’ve made sure that admin Users can find, see and edit all information on all Users, and even assign the Admin role.

Finally, the most important rule is the one that dictates what every User not covered by the previous rules can see and do. In our case, we want to restrict their access.

Everyone else:

* View all fields: no
* Find this in searches: no
* View attached files: no
* Allow auto-binding: no

### Product <a href="#h.t63d7m1v1lek" id="h.t63d7m1v1lek"></a>

As your Users navigate your Online Store, they’ll need to be able to find and view Products. You can of course add as many details to this Data Type as you need. For this example, we’ll set up just a simple product with a name, image, price and a short description.

To illustrate how you can use Privacy Rules to hide only specific fields on a database Thing, we’ll also add a field called Profit margin. This is a field that should be available to Administrators, but it should be invisible to everyone else. You may not need this in your app, but we’ll set it up just to learn how it’s done.

#### Suggested fields on this type <a href="#h.kays0wu0umwb" id="h.kays0wu0umwb"></a>

* Name - text: the name of the Product, such as “Coffee mug”
* Image - image
* Price - number
* Description - text
* Profit margin - number

#### Privacy rules for this data type <a href="#h.j2b3iuwpa70j" id="h.j2b3iuwpa70j"></a>

First, we need to make sure that Users can see all the Products - if not, it wouldn’t be much of a shopping experience! But keep in mind what we discussed earlier: we don’t want the Users to be able to see the Profit margin unless they are an admin. Also, regular Users should not be able to edit the Products in any way.

We don’t actually need to set up a specific field for Users that are not admins, since in this case, we’ll cover that with the everyone else rule. First, we’ll set up the admin, and then everyone else. Admins should be able to find and edit all Products, and they also have access to the Profit margin field:

If this User’s admin is yes, this User can:

* View all fields: no
* Name: Yes
* Image: Yes
* Price: Yes
* Description: Yes
* Profit margin: Yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: Yes
* Name: Yes
* Image: Yes
* Price: Yes
* Description: Yes
* Profit margin: Yes

Everyone else:

* View all fields: no
* Name: Yes
* Image: Yes
* Price: Yes
* Description: Yes
* Profit margin: no
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: No

### Shopping cart <a href="#h.w4bnuaetoew4" id="h.w4bnuaetoew4"></a>

This is the container that we’ll use to store every Product that the User adds to it both before the purchase is made and after.

#### Suggested fields on this type <a href="#h.tu4mmmmv7fyo" id="h.tu4mmmmv7fyo"></a>

* Products - list of Products: Make sure to check the “This field is a list” on this field to make sure it can contain more than one Product
* Total cost - Number: This is where we’ll store the total amount for all Products in the cart
* Cart items - list of Cart items: Make sure to check the “This field is a list” on this field to make sure it can contain more than one Cart item
* Fulfillment status - Fulfillment status (option set): This field is used internally to determine how the order is moving in the system. You can set the default value for this to “Received” (see notes on the Option Set further down)

#### Privacy rules for this data type <a href="#h.os65471nuph0" id="h.os65471nuph0"></a>

Like the User itself, the Cart is a very private field: no one except for the customer and the staff managing your app should be able to see it. First, we’ll set it up so that the User can see their own Cart. We’ll use the built-in Created by field for this. There are no fields that are auto-bound on the Shopping cart, since we’ll be relying on Workflows to add and remove items.

If this Shopping Cart’s Created by is Current User, this User can:

* View all fields: Yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: No

Now for the admins that fulfill the order:

If Current User’s admin is yes, this User can:

* View all fields: Yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: yes
* Fulfillment status: yes
* Total cost: No
* Products: No
* Cart items: Yes

As you can see, not all fields are editable, even by an admin. As the total cost is calculated based on the Products inside, we don’t want anyone to be able to edit it directly.

Now again, for the most important rule: what everyone else can see:

Everyone else:

* View all fields: no
* Find this in searches: no
* View attached files: no
* Allow auto-binding: no

### Cart item <a href="#h.3o36xg4qckzr" id="h.3o36xg4qckzr"></a>

The Cart Item is basically a clone of the Product at the time of purchase. This lets us store a permanent record of what the item cost and how it was described when it was bought, so that we can make changes to a Product without it affecting already completed carts.

#### Suggested fields on this type <a href="#h.tnt2wbc21ue4" id="h.tnt2wbc21ue4"></a>

* Shopping cart - Shopping cart: The Shopping cart to which the cart item belongs.
* Product - Product: First, we’ll link to the original Product
* Price - number: This number we’ll copy from the original Product when the User checks out
* Name - text
* Description - text

#### Privacy rules for this data type <a href="#h.e7cnwt1w3q5s" id="h.e7cnwt1w3q5s"></a>

The Cart items should behave just like the Cart its in: visible to Users and Admins, and invisible to everyone else.

If this Cart Item’s Created by is Current User, this User can:

* View all fields: Yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: No

Now for the admins that fulfill the order:

If Current User’s admin is yes, this User can:

* View all fields: Yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: no

Keep in mind that we may allow Admins to delete items in the Cart, but for that we’ll rely on workflows - not auto-binding. That’s why we keep auto-bind disabled for now.

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

### Fulfillment status <a href="#h.ei5k9uqv3tsr" id="h.ei5k9uqv3tsr"></a>

* Received
* Processing
* Sent

This Option Set is used to determine where in the system the order currently is, so that you can see which orders have been fulfilled or not. You can of course rename or add as many options as you see fit for your business.

## Additional notes <a href="#h.8zfpl9lbgo9s" id="h.8zfpl9lbgo9s"></a>

Keep in mind for this guide that it takes a very general approach to Shopping Carts: you may have entirely different needs depending on whether you are selling t-shirts, takeaway food or hotel stays: but the principle remains the same. You need a cart for the User to organize whatever they are buying, and you need to maintain some historical data for what exactly they bought. You are of course free to use the guide as a basis for your own system and add whichever fields you think makes sense. But keep in mind that privacy is key, and that Privacy Rules are the only way to truly keep data secure.

## About Amlie Solutions and Petter Amlie <a href="#h.5ksov1duconc" id="h.5ksov1duconc"></a>

This guide is written by Petter Amlie. Petter is the founder of [Amlie Solutions](https://www.google.com/url?q=https://www.amliesolutions.com/\&sa=D\&source=editors\&ust=1649034899453164\&usg=AOvVaw1Omdl7h4ooYIAgruAtYNQh), a no-code expert, public speaker and author of two books on [Bubble: The Ultimate Guide to Bubble Performance](https://www.google.com/url?q=https://www.amliesolutions.com/books/the-ultimate-guide-to-bubble-performance/\&sa=D\&source=editors\&ust=1649034899453585\&usg=AOvVaw1QAHmz6vJ4osXDOwB3dFlb) and [The Ultimate Guide to Bubble Security](https://www.google.com/url?q=https://www.amliesolutions.com/books/the-ultimate-guide-to-bubble-security/\&sa=D\&source=editors\&ust=1649034899453939\&usg=AOvVaw11XrgeTAjc98SGiUlWjCeV). You can find a growing number of free guides, video courses and in-depth articles on his website.

## Other ways to learn

<details>

<summary>Articles</summary>

* [eCommerce and payments](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments) - this article series covers different ways in which you can monetize your app and use Stripe to collect payments

</details>

<details>

<summary>Core reference:</summary>

* [Stripe plugin](/core-resources/bubble-made-plugins/stripe) - list of all Stripe plugin features

</details>

<details>

<summary>External documentation</summary>

* [Stripe Docs](https://docs.stripe.com)
  * [How Stripe Checkout works](https://docs.stripe.com/payments/checkout/how-checkout-works)
  * [Stripe Checkout demo](https://checkout.stripe.dev/)

</details>
