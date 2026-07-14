# On-demand Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/on-demand-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Zeroqode Team*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

The on-demand type app can be easily associated with startups like Uber, Instacart, BloomThat, etc. Overall, on-demand apps generally contain capabilities for ordering, delivery, and tracking functionality via a map. Customers can order something from the platform and wait for a courier to deliver the items from a restaurant, for instance. Think UberEats, as one example.

The following guide will give some recommendations for data types and option sets when setting up the database of your on-demand app. The target Bubble app will allow users to have a platform where it is possible for restaurants to list their menu with different meals, and for customers to add menu items to a shipping cart and place orders. The drivers will pick the order and deliver it to the customer.

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

The main data type is User, of course. Users are picking different Menu Items from a menu to add to their shopping cart in the form of Cart Items, then placing an Order in order to confirm the payment. Meals come from a specific Restaurant. After completing the payment and receiving the Order, the customers are able to leave a Review for the Restaurant they ordered food from.

### Restaurant <a href="#h.r8pfh9l7ttx" id="h.r8pfh9l7ttx"></a>

This data type contains all the details about a restaurant registered on the platform, ranging from its name to its location. It contains all the list of Menu Items the restaurant offers. As the platform begins running, this data type will also track the Orders that users make from this restaurant.

#### Suggested fields on this type

* name (text): the name of the restaurant, as displayed in the app
* description (text): to store the restaurant description for customers
* approved (yes / no): to store whether or not the restaurant has been approved by the platform, in case you want to hide the un-approved ones
* location (geographic address): to store the geographic location of the restaurant so that it can be displayed on a map
* menu items (list of Menu Items): to store the list of all menu items that are available to buy from this restaurant
* orders (list of Orders): to store the list of orders related to this restaurant
* owner (User): to store the restaurant owner’s information; note this assumes that every restaurant owner is also a user on your platform, but we can show owners of restaurants different pages or information relative to users who are purely shoppers on the platform
* reviews (list of Reviews): to store the list of reviews related to this restaurant, so customers can see the feedback

#### Privacy rules for this data type

You can create privacy rules to allow only the restaurant’s owner to see certain fields on their restaurant. If the owner has a page to edit their restaurant’s information, you can also [enable auto-binding](https://manual.bubble.io/help-guides/working-with-data/protecting-data#defining-permissions) for the fields they’re allowed to edit.

### Menu Item <a href="#h.qfqrff9cswmp" id="h.qfqrff9cswmp"></a>

This data type stores information about the individual item from a Restaurant’s menu, which can be added by a user to their cart. A Menu Item comes from a specific Restaurant, and for simplicity’s sake, we can implement logic at the workflow level (i.e. not shown in this guide) to make it so that all the Cart Items in a given cart must come from the same Restaurant.

#### Suggested fields on this type:

* restaurant (Restaurant): to store the Restaurant that offers this menu item
* name (text): to store the name of this menu item, so it is possible to display it
* description (text): to store a description of this meal (optional, but may be handy)
* picture (image): to store a picture of this menu item
* price (number): to store the price of this meal

#### Privacy rules for this data type

All these fields are ones that aren’t particularly sensitive, so they would likely be visible to all users. However, one nice feature for Restaurant owners might be to enable autobinding for any fields on a Menu Item that is associated with their Restaurant.

### Cart Item <a href="#h.psazzm1f0n1x" id="h.psazzm1f0n1x"></a>

This data type is used to add meals to the shopping cart. It stores the information such as the Menu Item (related to a Restaurant) being added to the cart, the total price, quantity, etc. All the Cart Items in a user’s cart will be added to an Order prior to payment. You can also think of a Cart Item like one line item in the user’s ultimate receipt for an order.

#### Suggested fields on this type

* menu item (Menu Item): this is the item that the user adds to the cart; the user chooses which Menu Item, then the other fields below dictate the quantity they want of that item and the price that comes out to
* quantity (number): to store the quantity of the menu item added to the shopping cart
* total price (number): to store the total price of the chosen quantity of the Menu Item; storing this is useful in case the restaurant changes the price of the item in the future; if it’s stored here, the app will remember how much the item(s) cost at the time of purchase

#### Privacy rules for this data type

Since users’ shopping carts will be private to themselves, we would create privacy rules to only make any Cart Item findable in searches and all of its fields visible to the creator of the Cart Item.

### Order <a href="#h.ifzsnu5y5hg" id="h.ifzsnu5y5hg"></a>

This data type stores information about orders created on the platform. It contains information about the Cart Items that the user added to their cart, and we can assume that an Order is created during the (successful) checkout process. This data type also will store various information about how the payment works, including the fee the app will take and the amounts that will be paid out to the different parties of the transaction (the restaurant’s cut, driver’s cut, etc.).

#### Suggested fields on this type

* cart items (list of Cart Items): to store the list of the cart items that are being purchased as part of this order
* restaurant (Restaurant): to save the Restaurant that the meal was ordered from
* delivery address (geographic location): to store the address this order should be delivered to
* courier (User): to store who will deliver this order; note that this means we assume all couriers on our platform will also be Users in the app
* order total price (number): to store the total price for this order
* app revenue (number): to store the platform's cut for each order transaction
* courier fee (number): to store the payment amount taken by the courier as their cut
* restaurant payout (number): to store the total payment amount received by the restaurant for the order
* current status (Status): to store the status of this order; this will be an option set of pre-determined options (see below)
* payment ID (text): if you’re using a platform like Stripe to manage payments, this field can store the unique ID of this payment
* order ID (text): to help all parties manage a particular order, it can be helpful for your app to generate a unique order ID for this order, which would be stored here

#### Privacy rules for this data type

Orders should only be visible (i.e. findable in searches) to the parties of the transaction - the Users who are either the ones placing the order, who are the couriers delivering the order, or who are the restaurant owners fulfilling the order. Moreover, sensitive fields like payment IDs and the various prices and payouts should have privacy rules set such that only the relevant party can see them.

### Review <a href="#h.zd1uotqt9yki" id="h.zd1uotqt9yki"></a>

After the order is completed, users who placed the order can leave a Review. We’ll assume that Reviews are about a particular Restaurant.

#### Suggested fields on this type

* reviewer (User): to store the User who is writing the review
* restaurant (Restaurant): clarifies which restaurant this review is about
* rating (number): we can use a 0 to 5 scale for ratings
* text (text): any free-form content the user wants to leave as part of the review

#### Privacy rules for this data type

Reviews for a Restaurant can generally be left public, i.e. they can be found by any User. For the privacy of those writing the reviews, you may want to specifically hide the reviewer field from the public.

### User <a href="#h.5raxf9srocgi" id="h.5raxf9srocgi"></a>

This data type contains information about the users on the platform. As we have seen above, there are different kinds of Users on our platform - customers, Restaurant owners and couriers. So for now, our User data type will have fields that relate to any of those three types of users; this means that more Users in the database are unlikely to have all the fields filled out, since they are unlikely to be a customer, Restaurant owner and a courier all at the same time.

#### Suggested fields on this type

* first name (text): self-explanatory; it’s useful to save the user’s first name as its own field so you can easily do things like incorporate their first name into a confirmation email’s greeting
* last name (text): self-explanatory
* is admin (yes / no): it’s often useful to create a field on User to determine whether that user has special privileges with the platform; for example, this can be used to control whether the user can see an admin panel to help manage all orders (useful for your customer support team)
* address (geographic address): to store the address of the user so it can be pre-filled for future orders
* favorite restaurants (list of Restaurants): to store the list of restaurants a customer likes, if you want to build this feature into your platform
* cart (list of Cart Items): this is how we build a ‘shopping cart’ feature - this field stores the list of items added to the shopping cart by the customer, which can then be referenced when the user goes to checkout; after a successful checkout, you can clear this field on User so that they start from an empty cart on their next visit
* driver license number (text): to store the number of the driver’s license for courier users
* driver license picture (image): to store the photo of the driver’s license for courier users
* orders (list of Orders): to store the list of orders the customer made, as an order history
* owned restaurant (Restaurant): to store the Restaurant object in case the current user is a restaurant owner

#### Privacy rules for this data type

As with many apps, our User data type contains sensitive information that generally should not be available to the public, e.g. last name, address, driver license information, etc. Any such sensitive field should be hidden from view for anybody except the user themselves and perhaps any admin users on the platform.

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

### Status <a href="#h.orsksh8755l6" id="h.orsksh8755l6"></a>

* New
* Accepted
* Found a courier
* Picked up
* Delivered
* Canceled

This option set is used to define the available statuses of an Order. As the order goes through different stages of its life-cycle, various workflows would advance the status of the Order as various updates happen.

## Example uses in your app <a href="#h.jge3g9i9dho3" id="h.jge3g9i9dho3"></a>

Let’s assume that our app, now called Eaty, has an admin page where a member of the platform’s team can see all orders:

![](/files/GJo8nLClbWX2kFJG2azI)

The main repeating group on the page shows a query of all Orders by default, but note how the other horizontal tabs on the page would show a list of Orders with filters for different Statuses. For each Order on the page, we see various fields about the Order.

## Additional notes <a href="#h.8zfpl9lbgo9s" id="h.8zfpl9lbgo9s"></a>

After building the basic functionality of an on-demand app, you may want to consider more advanced features. For example, on-demand apps often benefit from a chat feature with the other parties in the order, push notifications to alert users about order status changes, and a live map to track the delivery. Moreover, you may want to create some mobile-optimized pages for those using the app on the go, such as your couriers. Luckily, all these features and more are possible with Bubble.

## About the author: Zeroqode <a href="#h.pfe1wzms19f3" id="h.pfe1wzms19f3"></a>

A good example of a ready-made on-demand Bubble app is the [Eaty](https://zeroqode.com/template/eaty---food-delivery-like-uber-eats-template-1525767038595x917710033754259500) template from [Zeroqode](https://zeroqode.com/).

They have also built a great range of 🔌 [Plugins](https://zeroqode.com/plugins) to boost the development of your Bubble app, as well as 🎓 [Lab](https://lab.zeroqode.com/) courses to improve your Bubble skills.
