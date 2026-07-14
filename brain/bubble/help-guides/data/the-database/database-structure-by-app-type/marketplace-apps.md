# Marketplace Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/marketplace-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Daniel Abebe, co-founder of HuggyStudio*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

{% hint style="info" %}
This article covers how you may structure your database to facilitate a marketplace app. To learn more about what a marketplace app is, and how you can go about planning such an app, you may be interested in readin the article below:

Article: [Marketplace](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/marketplace)
{% endhint %}

Marketplaces connect multiple sellers of goods or services with buyers. Most of the time, a marketplace is created to bring more transparency into a market or make the buying process more efficient. While they can differ vastly from managed marketplaces to niche and B2B marketplaces, the standard business model is to capture value from each transaction. Famous examples include Airbnb, Amazon, Upwork, AliExpress.

In this guide, we take you through the creation of the data structure for a home rental marketplace like Airbnb.

If you are not familiar with Airbnb, here is a quick introduction into our use case with an overview of the basic functionality:

* Airbnb is a leading online marketplace that connects people who want to rent out their homes with travelers who are looking for an accommodation.
* Basic functionality includes:
* For both homeowners and travelers
* Signup / Login for homeowners and travelers
* Edit profile information
* For homeowners
* Upload/edit place (Pictures, Address, Price, Description, Amenities, …)
* Set place availability / unavailability
* Manage bookings
* Receive ratings
* Messaging with travelers who booked the place
* For travelers
* Discover and filter places based on location, type of place, price, rating, amenities and/or facilities
* Book a place
* Message with the homeowner after booking the place
* Rate place

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

Users will upload and edit places. On the other hand, users will book and rate places. A messaging function will be possible for each booking. Places need to hold structured data so that users can easily filter places based on different criteria like price, location, type of places, …

Good to know: In our use case, bookings are immediate and do not require a confirmation by the homeowner.

#### User (default) <a href="#h.6fu02v3hv8op" id="h.6fu02v3hv8op"></a>

The Data Type “User” is by default already available on Bubble.io. It helps you handle user authentication. Both sides of our marketplace (homeowners AND travelers) are users. In our example, the same user can upload places and/or book a place.

#### Suggested fields on this type

* email (text) - this is a built-in field, i.e. it’s already there for you
* Modified date (date) - also a built-in field
* Created date (date) - also a built-in field
* Slug (text) - also a built-in field
* First name (text)
* Last name (text)
* My places (list of Places): Places uploaded by the user for rent; see [this article](https://www.google.com/url?q=https://manual.bubble.io/help-guides/structuring-an-application/data-structure%23connecting-types\&sa=D\&source=editors\&ust=1649795051390507\&usg=AOvVaw0IPM-W8tdCN0uPvkfbWnBi) on linking data types
* My trips (list of Bookings): Bookings made by the user (as a traveler)
* Admin? (yes/no): this defines the users who can access the platform’s admin dashboard where you can approve new places or review the overall platform activity. For your information, this is not a standard Bubble page - this page also needs to be built.

#### Privacy rules for this data type

* This User is Current User
* View all fields (checked)
* Find this in search (checked)
* View attached files (checked)
* Allow auto-binding (unchecked)
* Everyone else
* View all fields (unchecked)
* First name (checked) → Our marketplace only displays the user’s first name, the last name is hidden.
* My places (checked)
* Find this in search (unchecked)
* Allow auto-binding (unchecked)

### Place <a href="#h.t63d7m1v1lek" id="h.t63d7m1v1lek"></a>

This Data Type is used to manage all data related to a property on our home rental marketplace. A User can upload multiple places.

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Title (text): Name of the place like “Beautiful house in the mountains”
* Description (text): Description to get more information about the place
* Price/night in USD (number)
* Pictures (list of images)
* Number of beds (number)
* Number of guests max (number)
* Bookings (list of Bookings): All bookings made for this place are saved back in this list to keep track of the place performance and availability. It also helps to pull all relevant data faster for the homeowner.
* Unavailability (list of date ranges): In our use case, we assume a place is always available except if a new unavailability was added to this list. This is a more scalable approach than requiring the homeowner to enter availability each month.

#### Privacy rules for this data type

* No privacy rules required as Users need all information when browsing through or searching for places. Even the Bookings should be visible so that Users can see the ratings and the actual Place Availability. Under the Data Type “Booking”, we will add Privacy Rules to make sure only public information is accessible.
* Depending on the experience you want to offer to your Homeowners when creating/editing their place, you could create a Privacy Rule just for allowing auto-binding to homeowners. With a “Save” button, auto-binding is not necessary.

### Booking <a href="#h.fp3k3aby7om5" id="h.fp3k3aby7om5"></a>

The Data Type “Booking” is used to manage all data related to a booking on our home rental marketplace. A User can make several bookings of different places over their lifetime.

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Homeowner (User): We can assume the creator of a place is the homeowner. Anyhow, by adding this “Homeowner” field, we have more flexibility when it comes to HOW a place is created. As an example, admins will be able to create a flat and simply add the rightful homeowner.
* Booked place (Place): We connect the booking back to the place to avoid orphaned entries (a booking with no place)
* Date range (date range): This will indicate the check-in and check-out of this trip.
* Number of nights (number): The number of nights is already available when we extract that information from the booking date range. Anyhow, saving it as a separate value will make it easier to display or calculate total costs for example.
* Total costs in USD (number)
* Chat (list of Messages): A chat is as simple as a list of messages that show chronologically. As a chat is only relevant to a booking, we store this list of messages directly under the booking.
* Rating stars (number): As a rating is connected to a single booking, we store the value directly under the booking.
* Rating comment (text): Same as rating stars.

#### Privacy rules for this data type

* This Booking’s creator is Current User OR This Booking’s Homeowner is Current User
* View all fields (checked)
* Find this in search (checked)
* View attached files (checked)
* Allow auto-binding (unchecked)
* Everyone else
* View all fields (unchecked)
* Creator (checked)
* Date range (checked)
* Rating starts (checked)
* Rating comment (checked)
* Find this in search (unchecked)
* Allow auto-binding (unchecked)

### Message <a href="#h.bc7hhc4eb1un" id="h.bc7hhc4eb1un"></a>

The Data Type “Message” is used to store text messages sent between users. A message doesn’t need to hold much information besides its content as it is stored in a list of messages under the booking already. This booking holds all relevant information like users in the chat, the booking dates and the specific place this chat is about.

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Text message (text)
* Booking chat (Booking): We link this message back to the booking to avoid orphaned messages (a message saved in the database with no link to a booking chat). This also makes it possible to create privacy rules linking back to the booking.

#### Privacy rules for this data type:

* This Message’s creator is Current User OR This Message’s Booking’s Homeowner is Current User
* View all fields (checked)
* Find this in search (checked)
* View attached files (checked)
* Allow auto-binding (unchecked)
* Everyone else
* No permission

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

#### Type of place <a href="#h.alg40nknheaq" id="h.alg40nknheaq"></a>

* Entire place
* Private room
* Shared room
* Hotel room

“Type of place” is a classic example of an option set. We use options to store different predefined types. Those types rarely change and users are not asked to create new types.

Good to know: We can also use a standard Data Type for “Type of place”. The rule of thumb is that if users do not have to create entries themselves, an option set is a better choice as it improves the app performance.

### Place status <a href="#h.j6q7wnq97013" id="h.j6q7wnq97013"></a>

* In review
* Approved
* Rejected

Similar to a “Type of place”, a “Place status” is another good example of an option set. We use options to store different predefined statuses. Those statuses rarely change and users are not asked to create new statuses.

### Amenities <a href="#h.dd15d02z5md4" id="h.dd15d02z5md4"></a>

* Wifi
* Heating
* TV
* Air conditioning
* Indoor fireplace
* Washer
* …

We use option sets to standardize the amenities. Users should not be able to enter free text and create new amenities. This helps avoid fantasy amenities or duplicates. It also makes filtering places easier.

### Facilities

* Free parking
* Gym
* Pool
* Hot tub

Similar to amenities, we use option sets to standardize the facilities. Users should not be able to enter free text and create new facilities. This helps avoid fantasy facilities or duplicates. It also makes filtering places easier.

## Additional notes <a href="#h.8zfpl9lbgo9s" id="h.8zfpl9lbgo9s"></a>

When naming your options sets, data types and fields, we recommend using simple terms you will remember over time. Also, avoid repetition in your names as it will make it difficult to work efficiently when building your workflows. Finally, keep in mind that working with data is an ongoing process. Start small, adjust when necessary and improve as your product grows in terms of users and/or complexity.

## About HuggyStudio <a href="#h.5ksov1duconc" id="h.5ksov1duconc"></a>

We believe entrepreneurship is about positive change, not code. HuggyStudio helps entrepreneurs and intrapreneurs validate their ideas. We specialize in building new product ideas into functional MVP through our [no-code education platform](https://www.huggystudio.com/) and our [no-code agency](https://www.huggystudio.com/no-code-agency).

## Other ways to learn

<details>

<summary>Articles</summary>

* [Marketplace](/help-guides/getting-started/building-your-first-app/ecommerce-and-payments/marketplace) - this article covers the process of understanding and planning marketplace apps, as well as how to set up the sellers and payouts using [Stripe Connect](#user-content-fn-1)[^1].

</details>

<details>

<summary>Core reference:</summary>

* [Stripe plugin](/core-resources/bubble-made-plugins/stripe) - list of all Stripe plugin features

</details>

<details>

<summary>External documentation</summary>

* [Stripe Docs](https://docs.stripe.com)
  * [Stripe Connect](https://docs.stripe.com/connect)

</details>

[^1]: *Stripe Connect* is a solution that automates charging and payouts between three different parties (the buyer, the seller and the platform).

    External Page: [Stripe Connect ](https://docs.stripe.com/connect)| [Stripe Docs](https://docs.stripe.com)
