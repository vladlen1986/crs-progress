# Database structure
> Source: https://manual.bubble.io/help-guides/getting-started/building-your-first-app/database-structure · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Now that you have decided on the features you want in your app, it's time to start thinking about how you structure your data. We won't go into the *technical* details on how to set that up just yet, but keep focusing on the planning stage.

{% hint style="info" %}
We also have a long list of guides that go into detail on how to plan a database structure for a specific app category (like a project management app, marketplace app or blog). You can use this as inspiration for your project and learn how experienced Bubble developers think:

Article series: [Database structure by app type](/help-guides/data/the-database/database-structure-by-app-type)
{% endhint %}

## Visualizing your data

When you plan your database structure, you should take notes. There are a range of different ways to do this, and there's really no "best practice". You should use whatever method makes sense to you.

For many users, simply noting things down with pen and paper or on a whiteboard is the most efficient way, at least for the first planning stage. You can also consider apps that focus on whiteboarding and diagrams, such as [Miro](https://miro.com/) and [Lucid.app](https://lucid.app/).

<figure><img src="/files/kScEEuSsYD4ApSlfBQVK" alt=""><figcaption><p>Planning your database structure doesn't need fancy tools: use whatever you're comfortable with. Pen and paper works just fine.</p></figcaption></figure>

Don't worry about taking notes in the "right" way: your goal is simply to get an understanding of what kind of data you want to store before you start building.

## The data types

<details>

<summary>Transitioning from SQL Databases? Here's what to know in Bubble.</summary>

In traditional databases, relationships between tables are commonly maintained through primary and foreign keys that act as unique identifiers. However, when learning Bubble, you'll notice that it's handled a bit differently.

Bubble simplifies database relations with its intuitive design. Rather than juggling keys, Bubble allows for direct linking of data types. This not only streamlines data management but also offers a more user-friendly and visual experience for those who don't have a background in database design. You can read more about this in the article section below.

Article section: [How the Bubble database is different from traditional databases](/help-guides/data/the-database#how-the-bubble-database-is-different-from-traditional-databases)

If you are interested in learning more about the underlying technology that powers database, we also have a section that covers this:

Article section: [Technical information about the Bubble database](/help-guides/data/the-database#technical-information-about-the-bubble-database)

As you map out your database, you can still think of Bubble as a traditional relational database and plan your data types and relationships accordingly.

</details>

The [data types](#user-content-fn-1)[^1] make up the overarching types of data that you want to store in your app. Let's look at some examples to illustrate:

**Social media app** (see our detailed guide [here](/help-guides/data/the-database/database-structure-by-app-type/social-network-apps))

* Users
* Posts
* Interests

**Project management app** (see our detailed guide [here](/help-guides/data/the-database/database-structure-by-app-type/project-management-apps))

* Users
* Projects
* Tasks

**eCommerce app** (see our detailed guide [here](/help-guides/data/the-database/database-structure-by-app-type/online-store-ecommerce-apps))

* Users
* Products

These are of course not exhaustive lists, but serve as examples to show *what* a data type is. Think about the vision you have for your app, and try to plan out what kind of data you need to store to make it a helpful tool.

### The fields

The [*fields*](#user-content-fn-2)[^2] are the data that you store in each data type. Fields can consist of different types of data, such as text, numbers, files, images and dates.

Let's repeat the examples from above and add some fields to those data types:

**Social media app** (see our detailed guide [here](/help-guides/data/the-database/database-structure-by-app-type/social-network-apps))

* Users
  * Name (text)
  * Date of birth (date)
  * Profile pic (image)
* Posts
  * Header
  * Content
* Interests
  * Name

**Project management app** (see our detailed guide [here](/help-guides/data/the-database/database-structure-by-app-type/project-management-apps))

* Users
  * Name (text)
  * Profile pic (image)
* Projects
  * Project name (text)
  * Project description (text)
* Tasks
  * Task name (text)
  * Task description (text)
  * Deadline (date)

**eCommerce app** (see our detailed guide [here](/help-guides/data/the-database/database-structure-by-app-type/online-store-ecommerce-apps))

* Users
  * Name (text)
  * Address (address)
* Products
  * Header (text)
  * Description (text)
  * Image (image)
  * Price (number)
* Shopping cart

### Relationships

Bubble's database is what's called a *relational database.* Relational simply means that different kinds of data can be *connected* somehow. For example, in a social media app, a post is *connected* to a user – that is, it "belongs" to the user that posted it.

This method is used in a range of different ways to structure how different types of data are related to each other. Relationships are just another field that's added to the data type. In the social media example, we could add a field to the *Post* data type, and that field is of type *User*. We can call that field whatever we want, such as *Owner*.

A relationship can contain *one* thing (i.e. a Post is connected to one owner), or a *list of things* (i.e. a Shopping cart contains a list of Products).

Let's again go over the earlier examples and see where it makes sense to connect data. We've marked the relationship fields in <mark style="background-color:green;">green</mark>.

**Social media app** (see our detailed guide [here](/help-guides/data/the-database/database-structure-by-app-type/social-network-apps))

* Users
  * Name (text)
  * Date of birth (date)
  * Profile pic (image)
  * <mark style="background-color:green;">Interests</mark> (list of Interests)
* Posts
  * Header
  * Content
  * <mark style="background-color:green;">Owner</mark> (User)
* Interests
  * Name

**Project management app** (see our detailed guide [here](/help-guides/data/the-database/database-structure-by-app-type/project-management-apps))

* Users
  * Name (text)
  * Profile pic (image)
* Projects
  * Project name (text)
  * Project description (text)
  * <mark style="background-color:green;">Owner</mark> (User)
  * <mark style="background-color:green;">Tasks</mark> (list of Tasks)
* Tasks
  * Task name (text)
  * Task description (text)
  * Deadline (date)
  * <mark style="background-color:green;">Owner</mark> (User)
  * <mark style="background-color:green;">Project</mark> (Project)

**eCommerce app** (see our detailed guide [here](/help-guides/data/the-database/database-structure-by-app-type/online-store-ecommerce-apps))

* Users
  * Name (text)
  * Address (address)
* Products
  * Header (text)
  * Description (text)
  * Image (image)
  * Price (number)
* Shopping cart
  * <mark style="background-color:green;">Owner</mark> (User)
  * <mark style="background-color:green;">Products</mark> (list of Products)

Don't worry about the technical side of this just yet – we'll cover that in detail in our [article series about the database](/help-guides/data/the-database). Don't see this is a blueprint for setting up your app either – these are just simplified examples to get you into the right mindset:

* **Data types** are the overarching types of data in your app, such as users, tasks, products and blog posts
  * **Fields** contain the actual data stored in these types, such as name, phone number, description and image
* Data types can be **connected through relationships**, such as a shopping cart to an owner. These are just another field saved on the data type.

Keep in mind we are still in the planning stage. Planning out what kind of data you need your app to store will help you get a better understanding of how you can fulfil the vision that made you want to make an app in the first place.

Remember what we said in the first part of this section: most apps consist of a database at the bottom and a user interface on top of it. Now that we've covered the data, let's move on to the [Design and UX](/help-guides/getting-started/building-your-first-app/design-and-ux) of your app.

[^1]: The database consists of different *data types* that you as the developer plan and set up. Data types are like containers that hold specific types of information and each data type is made up of fields where that information is stored.\ <br>

    Article: [Data types](/help-guides/data/the-database/data-types-and-fields)

[^2]: Each data type consist of *fields* that hold different kinds of information. These fields are formatted in specific ways and can only hold the type of information that they are set up to contain.\ <br>

    To illustrate, think of a phone book: a *Contact* has different fields for name, date of birth and email address and the format of these fields remains constant: name and email address will always contain text and date of birth will always contain a date.

    Article section: [Fields](/help-guides/data/the-database/data-types-and-fields#fields)
