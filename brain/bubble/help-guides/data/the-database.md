# The database
> Source: https://manual.bubble.io/help-guides/data/the-database · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers different aspects of how the Bubble database works

The database is the cornerstone of most applications. It handles all the *dynamic* data, meaning data that you and your users can create, change, view and delete as frequently as needed.

The database works in tandem with your app's design to give your users the combination of being able to work with complex data efficiently, without being burdened by the mechanics of how it actually happens under the hood. Most of your users don't know how it works and indeed don't even know that it's there – they just know that the information they stored in your app yesterday is still there today for them to interact with.

<figure><img src="/files/1L4sT6UBjqStUBgYo6Iw" alt=""><figcaption><p>Your app's user interface is all your users will ever see while the database rests underneath the stage silently doing its job.</p></figcaption></figure>

## What is a database?

When you hear the term *database*, you might imagine vast servers, intricate codes, and complex structures. But with Bubble, the idea of a database is made refreshingly simple and user-friendly.

At its core, a database is a structured collection of data. Think of it as a digital library, where instead of books, you have data entries, and instead of shelves, you have tables or, in Bubble’s terminology, *data types*. Each data type can have several fields that store specific kinds of information. For instance, a data type *User* might have fields such as *Name*, *Email*, and *Date of birth*.

Within Bubble, this database is visual and intuitive. Rather than writing SQL queries or scripts to manage the data, you interact with a clean, graphical interface. You can create new data types, add fields, or adjust relations between different data types with a few clicks. And while Bubble takes care of the heavy lifting in the background, ensuring that the data remains secure and retrievable, you can focus on designing the logic and flow of your application.

For those familiar with traditional databases, Bubble's approach simplifies many of the complexities involved. There's no need to stress about database schemas, SQL syntax, or indexing. Instead, Bubble handles these technical aspects, allowing creators to focus on the logic and design of their app, making the process of integrating and utilizing a database far less daunting.

The database comes with its own set of commands to create, manipulate and delete data.

<figure><img src="/files/qwn1MdMOjjVVy7iJ1bk9" alt=""><figcaption></figcaption></figure>

##

## Communicating with the database

When you and your users interact with your Bubble app, two computers are involved:

* The device that the user is accessing the app from (such as a laptop or cell phone)
* Bubble's server (located in a server park)

Whenever an action is needed that involves the database, such as reading, writing or deleting data, that command is sent from the user's device to the server, where the job is completed and a confirmation and any requested information is sent back to the device.

<figure><img src="/files/HTo5aRuFrUjcsTUhjohY" alt=""><figcaption></figcaption></figure>

As such, working with data in your app is an ongoing stream of communication between the user's device and the Bubble server. This doesn't just happen on page load, but continually as the user provides your app with actions and input. Even for a single user, small packets of data can be sent back and forth several times per second.

As the developer of the app, you can set it up to send all sorts of different commands to the server:

* Create things
* Make changes to and delete things
* Search for things and return the result as a list
* Find one specific Thing and return its content

Any data sent between the user's device and the server is encrypted at all times, ensuring that it stays private. Let's say a user provides input about himself such as name and date of birth: when that data is being sent to the Bubble server, it's encrypted and can't be read by anyone else. It's also encrypted during storage on the server itself.

<details>

<summary>What is database encryption?</summary>

Encryption is a method used to protect information by converting it into an unreadable format. This ensures that even if unauthorized individuals or systems would manage to access the database, they won't be able to comprehend the actual data unless they possess the appropriate decryption key or method.

Imagine your database as a diary. Instead of writing your secrets in plain English, you decide to use a special code only you understand. If someone were to find and read your diary, they wouldn't understand its contents without knowing how to decode your special code. Database encryption works on a similar principle, but with algorithms and cryptographic keys.

Bubble automatically ensures the database is encrypted at all times.

</details>

<details>

<summary>Encryption during rest and transit</summary>

The data in and sent from the database can be in two states:

**Rest** means when the data is stored on the server's hard drive. In this state the data is encrypted using the industry standard [AES-256 encryption](#user-content-fn-1)[^1].

**Transit** means when the data is moving from the server to the user's device through the interoptic cables that make up the internet. During this state the data is encrypted with the [TLS protocol](#user-content-fn-2)[^2], which ensures three important points:

* The data has been encrypted, rendering it unreadable in case of interception by unauthorized parties.
* The source of the data, i.e. the Bubble server, has been authenticated, which guarantees that the data originated from a verified source and not an imposter.
* The data's integrity has been maintained throughout its transmission, ensuring that it has not been tampered with or altered in any way during transit

</details>

### Privacy rules

Privacy rules are rules that govern what users can access what data. It's the most important part of your database's security, and we strongly recommend that all apps that host any kind of private or sensitive data set up privacy rules to protect it.

Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

## Data types and fields

In the next article in the series, we'll look into how you create custom data types, and populate them with fields to store relevant information.

Article: [Data types and fields](/help-guides/data/the-database/data-types-and-fields)

## Bubble database terminology

<table><thead><tr><th width="200">Term</th><th>Description</th></tr></thead><tbody><tr><td>Constraint</td><td>A filter applied to a search to narrow down the results. For example, retrieving all products with a price less than $50.</td></tr><tr><td>Data source</td><td>Defines where the data in an expression or element comes from. This is often a specific search (<em>Do a search for</em>) or direct reference to a type of data in the database (such as <em>Parent group's thing</em>).</td></tr><tr><td>Data type</td><td>Represents a category of data (e.g., User, Product, Order). Similar to a table in traditional databases.</td></tr><tr><td>Do a search for</td><td>The data source that retrieves specific data from the database based on certain constraints.</td></tr><tr><td>Field</td><td>Attributes or properties within a Data Type (e.g., Email, Name, Price). Similar to columns in a table.</td></tr><tr><td>List</td><td>A collection of things. For instance, a user might have a list of favorite products. A field can be set up to store one thing or a list of things.</td></tr><tr><td>Privacy rule</td><td>Criteria that determine how data can be searched for, modified, or viewed based on user roles or other conditions.</td></tr><tr><td>Repeating Group</td><td>A UI element in Bubble that displays a list of things from the database, allowing for dynamic rendering of data.</td></tr><tr><td>Thing</td><td>An individual record or entry in the database.</td></tr></tbody></table>

## Additional resources

<details>

<summary>Technical information about the Bubble database</summary>

**Server**

The Bubble database is hosted on Amazon’s Relational Database Service (RDS) which is a part of Amazon Web Services. The database is encrypted using the industry standard [AES-256 encryption](#user-content-fn-1)[^1].

**Database technology**

Bubble uses PostgreSQL – an open source database management system. In other words, we have not invented a new kind of database system, but use one that has been in development for decades and is thoroughly tested and audited for stability and security.

This is one of the most widely used systems on the internet, and since it's based on the SQL standard (a very common database format), Bubble can communicate with other databases without worrying about compatibility.

</details>

<details>

<summary>How the Bubble database is different from traditional databases</summary>

Technically, Bubble uses the same technology as the majority of other web servers: SQL, and specifically PostgreSQL.

Still, the way the database is visualized in the Bubble editor can be a bit confusing if you come from a traditional database background.

The major difference is that Bubble **automates the use of primary and foreign keys.** When creating a relationship between two data types (tables), Bubble uses a custom data type field to represent a reference to another record in a different table.

For example, let's say we have a "User" data type and a "Post" data type, and we want to create a relationship between them such that each post is associated with a user. In Bubble, we would create a field in the "Post" table with the data type "User", which would represent a reference to a user record in the "User" table.

While Bubble doesn't expose the use of foreign keys to developers, database relationships still technically rely on them. The Unique ID field serves as the primary key for a record and is used to retrieve data, but this part of the process is hidden to make database setup and management easier for users without a database background.

While you may have use for the foreign key in some select scenarios, you generally don't need to reference it in Bubble in the way that you may be used to in other environments.

The quick tip YouTube video below shows how this works visually:

Video lesson: [How to add a data type as a custom field](https://www.youtube.com/watch?v=4txlG9nwr1E)

</details>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [The data tab](https://www.youtube.com/watch?v=z0L8vFsCwkk)
* [Creating the data structure](https://www.youtube.com/watch?v=2NO1ET1bMLM)

</details>

<details>

<summary><mark style="color:blue;">Articles</mark></summary>

* **Planning your database structure**\
  This article takes an introductory look at how to plan the database structure for your app.\
  \
  Article: [Planning your database structure](/help-guides/getting-started/building-your-first-app/database-structure)<br>
* **Maintaining your database**\
  Keeping your database clean and up-to-date helps your app run efficiently and makes it easier for you as a developer to stay on top of the data. Check out our article series below for different ways of maintaining your database.\
  \
  Article series: [Maintaining your database](/help-guides/maintaining-an-application/database-maintenance)

</details>

[^1]: *AES-256 encryption* is an encryption algorithm that uses a 256-bit key to encrypt and decrypt data.\
    \
    It's a widely used and highly secure encryption standard that is approved by the US government for protecting classified information.

[^2]: TLS (Transport Layer Security) is a protocol used to secure data sent over the internet. It's the most widely used protocol used with HTTP.\
    \
    It ensures that the data is private and can't be seen by someone who is not supposed to see it.

    \
    External link: [TLS on Wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security)
