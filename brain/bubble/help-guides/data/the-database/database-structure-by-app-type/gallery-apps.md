# Gallery Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/gallery-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Zeroqode Team*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

Speaking about gallery type of apps will surely lead you to apps like Instagram, Facebook, Pinterest, and many others.

Gallery apps often come with features like image management by categories, comment threads for each image, likes/dislikes from other users, and others. We can use Instagram as an example of such an app.

The following article will show the recommended data types and option sets that can be a good starting point when developing the database of your gallery application. An app built with such data types will allow users to efficiently upload, manage and share images in a user friendly way.

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

The key data type is GalleryImage, which corresponds to the type of item being displayed in the gallery. Users upload GalleryImages, sort them into Categories and can create Comments on anybody’s Images.

### GalleryImage <a href="#h.a6xt1t8tg7zl" id="h.a6xt1t8tg7zl"></a>

The key data type that is used in this kind of application. Images can be stored both within the app itself or on third-party storage (to lower the database storage costs).

#### Suggested fields on this type

* image (image): most important field, where the image file itself is stored
* title (text): a title can help other users better understand the image
* description (text): in addition to the title, a short description can be useful too
* categories (list of Category): stores one or multiple Categories that the image is attributed to

Optional

* favorite (yes / no): lets a user mark certain of their own images as favorites, e.g. so that they can be displayed at the top of that user’s profile page
* Note: if you want to build the feature to allow other users to “like” another user’s image, that would most likely be its own data type and is beyond the basic starting point of this guide; see [this documentation](https://manual.bubble.io/help-guides/structuring-an-application/data-structure#connecting-types) for guidance
* views (number): saves how many times the image has been viewed by users

#### Privacy rules for this data type

Assuming this is a public gallery, where anybody can see the images in the gallery, we might not need any privacy rules on image since none of the fields are particularly sensitive. You may want to consider allowing the creator of an image to use auto-binding to modify some of the fields within their control, like the title, description, categories or favorite.

### Category <a href="#h.2jksxnbzf7b1" id="h.2jksxnbzf7b1"></a>

For better image management and UX, our app will be able to assign one or more categories to an image. This is conceptually similar to an “albums” feature or a “tags” feature.

#### Suggested fields on this type

* name (text): the category’s name
* images (list of images): stores the images assigned to this category
* Note: here we are choosing to both save the assigned categories on an image as well as save the assigned images on a category; this is effectively double-writing the data and this decision comes with its own advantages and disadvantages; see [documentation](https://manual.bubble.io/help-guides/structuring-an-application/data-structure#connecting-types) to learn more

#### Privacy rules for this data type

Since this is not sensitive information, we likely do not need privacy rules on this data type.

### Comment <a href="#h.lkw2dboczarw" id="h.lkw2dboczarw"></a>

Publicly available images often come with a comment thread where any user can leave a comment. This data type stores each comment as its own thing in the database.

#### Suggested fields on this type

* contents (text): stores the comment text
* galleryimage (GalleryImage): attributes the comment to a specific image in the database
* hidden (yes/no): a useful field to have in case you want the ability to moderate comments

#### Privacy rules for this data type

Generally our assumption is that all comments can be viewed by anyone, so again we probably do not need privacy rules here. If you want to build a moderation feature, you can create a privacy rule to not find any Comments in searches if ‘hidden’ is yes.

### User <a href="#h.vszptx8flr9k" id="h.vszptx8flr9k"></a>

All apps come with the User data type. We’ll assume that there are different ‘levels’ of users in this app with different privileges

#### Suggested fields on this type

* displayname (text): stores the name the user wants to be publicly seen as
* role (User Type): stores whether the user has special permissions like moderator or admin rights

#### Privacy rules for this data type

User information tends to be sensitive, so privacy rules are a good idea here. You likely want to create privacy rules so that only the user can see their own email address, for example, while the displayname field is what’s public to everyone. If you want admins to be able to see users’ emails too, that would be another privacy rule on User to allow that. You likely also want to hide the role of the user from anybody except themselves, moderators and admins. Note that if you have the role here, you can create privacy rules on previous data types we’ve seen (e.g. the hidden field on Comment) so that moderators and admins can update that field as needed.

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

### Category <a href="#h.3idpj0auikcb" id="h.3idpj0auikcb"></a>

* Fashion
* Cars
* Sport
* Health

You can extend this list to include any categories that fit your app and audience. It is also a decision you have to make as the app creator whether to have Categories as an option set or a data type - [here](https://manual.bubble.io/help-guides/structuring-an-application/option-sets#options-vs.-custom-types) is some documentation to help you with that choice.

### User Type <a href="#h.r2y793v6o46v" id="h.r2y793v6o46v"></a>

* Admin
* Moderator
* User

This option set is used to define the available user types. Different user types can have different permissions in the app.

## Example uses in your app <a href="#h.jge3g9i9dho3" id="h.jge3g9i9dho3"></a>

* On the homepage of the app, you could show all images in the gallery by using a [repeating group](https://manual.bubble.io/core-resources/elements/containers#repeating-group) doing a simple search for GalleryImage with no filters.
* For each user’s profile page, you can fill a repeating group with a search for all GalleryImages with the filter that the creator is the [page’s user](https://manual.bubble.io/help-guides/working-with-data/displaying-data#defining-a-pages-thing)
* When you ‘click into’ a GalleryImage, you might have [a page that just features that one GalleryImage](https://manual.bubble.io/help-guides/working-with-data/displaying-data#defining-a-pages-thing) with a repeating group that is filled with a search of all Comments where the galleryimage is the GalleryImage of the page

## Additional notes <a href="#h.87dub4ais1xl" id="h.87dub4ais1xl"></a>

To make your app attractive, it would be nice also to integrate the possibility of image editing, adding short videos like Tik Tok, as well as receiving push notifications and following/unfollowing other users.

The suggested data types and option sets are just a recommendation, so feel free to build your app in your own style!

## About the author: Zeroqode <a href="#h.dao7w15pbi47" id="h.dao7w15pbi47"></a>

BTW, good examples of ready-made gallery Bubble apps are the[ Clonegram](https://zeroqode.com/template/clonegram---images-like-instagram-template-1509722383555x389657806226849800) and [Flicky](https://zeroqode.com/template/flicky---image-hosting-like-flickr-template-1501857333788x490438978221113340) templates from[ Zeroqode](https://zeroqode.com/).

They also have built a great range of 🔌[ Plugins](https://zeroqode.com/plugins) to boost the development of your Bubble app, as well as 🎓[ Lab](#suggested-fields-on-this-type-1) courses to improve your Bubble skills.
