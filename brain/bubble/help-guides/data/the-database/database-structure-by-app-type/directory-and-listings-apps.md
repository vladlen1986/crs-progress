# Directory & Listings Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/directory-and-listings-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Gaby Román, Co-Founder of Coaching No Code Apps*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

Directory apps are typically designed as user-friendly databases that make it easy to find a specific listing or profile. For example, TripAdvisor is a directory of businesses that can be easily searched, where search results appear in a list or map format. Users can then select a business and view more details about it.

The following data structure is recommended for applications where users are generating listings or profiles for other users to find. These listings or profiles can help users hire for services, purchase products, book reservations, network with others, etc. Typically, these listings or profiles can be reviewed and rated by other users. Popular examples of this type of app include: Yelp, Airbnb, TripAdvisor, Amazon’s product search, LinkedIn, etc.

These suggested data types and option sets should help you build common functionality for directory apps in a way that keeps things scalable.

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

These data types will allow users to create their own listings, categorize them, and upload images. The app’s front-end design would dynamically display this content in a single layout. Users would first search for listings with any relevant filters, select one from the results, and then view the full details of their selection. The layout would look the same for all listings, but the content would be different.

Users can also create reviews of any listing they see. The listing or profile page would then display all related reviews with an aggregated score or star rating.

Search is typically a core feature for an app like this, so the following types and option sets create powerful filtering flexibility. Users should be able to select multiple filters in different combinations to find the exact results they’re looking for. This is possible by relating listings to specific categories, aggregating their review ratings, and saving helpful properties like location, dates, statuses, etc.

### User <a href="#h.l2xv5sqk28qg" id="h.l2xv5sqk28qg"></a>

This is Bubble’s only built-in data type. Anyone who needs to be able to log into the app should have a User record.

#### Suggested fields on this type

* First Name (text)
* Last Name (text)
* Favorite Listings (list of Listings): This is a [relationship field](https://manual.bubble.io/help-guides/structuring-an-application/data-structure#connecting-types) that links the User to a list of Listing records, which are organized under a separate “Listing” data type.
* Type (list of User Types, an option set): Users can be more than one type of user, which will help you create conditions and/or privacy rules around what data or features they have access to in the app.
* For example, a “Listing Owner” should have the ability to manage their own listings whereas “Consumers” can only search, view, and review listings.
* Airbnb has Hosts and Guests. While a user can technically be both, it’s important to know what kind of interaction they’re coming to the app for. Hosts have the ability to create listings, whereas Guests have the ability to book listings. Hosts can view payments received, whereas Guests can view payments made, etc.
* System Admins typically refer to you, the app builder, to create global access to all parts of the app.
* See how this field influences privacy rules for the Listings data type, below

#### Privacy rules for this data type

This type of application is structured to make Users and/or separate Listings easy to find, so there isn’t as big of a need to restrict this type. With that said, we do have a few minimum recommendations: only allowing the user to auto-bind on their own record and “view” their own sensitive field values. System admins may get these abilities as well.

* Current User is This User > all access
* Current User is not This User and Current User’s Type doesn’t include System Admin > find in searches, view all fields except sensitive fields (home address, emergency contact, etc.), no auto-binding
* Current User’s Type includes System Admin > all access

### Listing <a href="#h.bphdr04pkc1u" id="h.bphdr04pkc1u"></a>

This is the heart of a directory app. Users will search all Listings, so make sure you include fields for any details that need to be displayed to the user or which can help filter search results.

#### Suggested fields on this type

* Title (text)
* Description (text)
* Location (geographic address)
* Owner (User): While Bubble has a built-in “Creator” field for all data types, having a custom Owner field like this will allow you to change owners. If you make this a list of Users, then you can create multi-owner / multi-editor capabilities.
* Categories (list of Categories): This field will help any search functionality filter Listings by Category.‘
* Featured (yes/no): This field can help you sort results by showing any Listings where “Features = yes” at the top of the list.
* Status (Listing Status, an option set)
* Average Rating (number): This value can be re-calculated every time a new review is created for the Listing. It will also help users filter their searches based on a rating minimum and/or sort by rating.

#### Privacy rules for this data type

Given that this is the heart of the application, you can create many rules around the type to specify access rights. Here are some suggested rules that allow Listing Owners to modify their own Listing, System Admins to access everything, and Users unrelated to the Listing to view but not edit it:

* Current User is This Listing’s Owner > find in searches, enable auto-binding on all fields except the “Status” and “Featured” fields since those are reserved for the System Admin to update.
* Current User’s Type is System Admin > all access
* Current User is not This Listing’s Owner and This Listing’s Status is Published > find in searches and view all fields

### Review <a href="#h.k6yhjop6celf" id="h.k6yhjop6celf"></a>

Reviews are common in directory apps to help users find the most popular entities by seeing how other Users have rated them.

#### Suggested fields on this type

* Related Listing (Listing): This field ties the Review back to the Listing it’s about.
* Rating (number): Whether review ratings are on a specific scale or not (e.g. 0-5 stars), saving any kind of number to each review will allow you to calculate Listing Review averages by aggregating on this field.
* Comment (text)
* Images (list of images): If it makes sense to allow consumers to upload images alongside their review (think Amazon product reviews), then this field will support that.

#### Privacy rules for this data type

Reviews should only be modified by the user who created it. This also applies to the System Admin to maintain integrity:

* Current User is This Review’s Creator > all access
* Everyone Else (Default Rule) > find in searches, view all fields, no auto-binding

### Image <a href="#h.7ft6ipmyzj1w" id="h.7ft6ipmyzj1w"></a>

Depending on how important images are for your directory app’s Listings, you may want to store any related images in a separate data type. For example, Airbnb listings contain many images for the accommodation, and organizing those in a separate data type allows you to save separate captions per image or indicate which ones should be the featured image; as opposed to an internal company staff directory where the only image might be the person’s headshot which can be saved directly to the Listing itself.

#### Suggested fields on this type

* Related Listing (Listing): This field ties the Image back to the Listing.
* File (image): This is the uploaded image itself. We’ve labeled it “File” so that your expressions can read “Image’s File” even though technically the field type is an image and not a file.
* Caption (text)
* Featured (yes/no)

#### Privacy rules for this data type

Images should follow nearly the same set of rules as their parent listing to allow creators to manage them only:

* Current User is This Image’s Creator > all access
* Everyone Else (Default Rule) > find in searches, view all fields, no auto-binding

### Category <a href="#h.n09tgl272zhf" id="h.n09tgl272zhf"></a>

If your users should be allowed to create categories or you plan on having dozens or even hundreds of categories, use a separate data type to organize them. Otherwise, if your app’s category list is more contained and users can’t create new ones, then an option set might be more convenient.

#### Suggested fields on this type

* Name (text)
* Parent Category (Category): This field will help you create an infinite hierarchy of categories and sub-categories. Any Category without a parent will tell you that’s the top of its hierarchy. Any Category with a parent will tell you it’s a sub-category of another Category.

#### Privacy rules for this data type

The privacy rules here can vary depending on how much control you want your users to have over them. Let’s assume that while users can generate categories, they can only modify their own. Some of the logic around editing conditions may need to be set up within the workflows and element design. For example, users can only edit if there are no listings attached to their category.

* Current User is This Category’s creator > all access
* Everyone Else (Default Rule) > find in searches, view all fields, no auto-binding

If the System Admin is the only person who should be able to edit Categories, then these rules are more appropriate:

* Current User’s Type includes System Admin > all access
* Everyone Else (Default Rule) > find in searches, view all fields, no auto-binding

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

### Listing Status <a href="#h.lyakjb4uw0gg" id="h.lyakjb4uw0gg"></a>

* Draft
* Under Review
* Published
* Archived

Many directory or listings applications will have content creators (in this case, listing owners) create the entity as a draft first and then submit it to the platform for review. If accepted, the platform will change the status to Published so that only Listings where “Status = Published” appear in search results.

### User Type <a href="#h.7by0x6goyq61" id="h.7by0x6goyq61"></a>

* System Admin
* Listing Owner
* Consumer

If your application has different types of users where access to data, pages, even workflows are specific to that type, an option set is a great way to identify who the users are. By making the “Type” field under the User data type a list, Users can be more than one Type (if necessary).

## Example uses in your app <a href="#h.jge3g9i9dho3" id="h.jge3g9i9dho3"></a>

* Search for Listings within 10 miles of a selected location
* If this app is meant to connect a user with home renovation professionals, then they may want to do a search with a location constraint (and sort by best rated).
* The following expression can generate the appropriate listings in a repeating group:
* Search for Listings (Status = Published; Location is within radius input’s value of location input’s value; Categories includes category dropdown’s value; sorted by Average Rating)
* Search for Listings that are at least 4 stars or above and are the newest in the system
* Search for Listings (Status = Published; Average Rating >= 4; sorted by Creation Date)

## Additional notes <a href="#h.8zfpl9lbgo9s" id="h.8zfpl9lbgo9s"></a>

Keep in mind that your directory app will have customizations not covered here. Whenever you need to store a unique combination of values, consider creating a new data type. For example, the Review data type is the unique combination of a User (consumer), a Listing, and the User’s rating for that Listing.

You might also notice that we don’t have very many list fields to create one to many relationships. We recommend using list fields when the number of items in the list is going to be relatively small. For example, a Listing may have up to 5 Categories whereas it could have hundreds of Reviews. So, for better performance, we chose not to have a list of Reviews under the Listing data type. Instead, as long as the Review has a “Related Listing” field, we have everything we need to find that Listing’s Reviews.

## About this author: Coaching No Code Apps <a href="#h.yekgzloqmodg" id="h.yekgzloqmodg"></a>

Your database structure creates the entire foundation for your app as a whole, and because of its importance, it's one of the first things we focus on with our own clients before moving onto broader functionality. For help putting all the right pieces into place and creating a scalable app using Bubble, join a free workshop focused on scoping, building, and launching your no code app at <https://coachingnocodeapps.com/workshop>.
