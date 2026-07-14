# SQL
> Source: https://manual.bubble.io/help-guides/getting-started/transitioning-to-bubble-from/sql · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

If you are accustomed to working with [SQL databases](#user-content-fn-1)[^1], Bubble may feel both familiar and different at the same time. In this article, we’ll explore the similarities and differences between these two approaches, and how a small shift in mindset can help you understand the nuances of Bubble’s approach to data management.

One key point to remember is that Bubble acts as a layer over SQL. It employs its own terminology and automates many SQL processes, including table joins, to make database construction intuitive, even for those without a technical background.

Despite the different visual interface, Bubble’s database technology is built on PostgreSQL[^2], so the underlying logic remains the same. However, your SQL background might require a bit of adaptation, as Bubble’s automation and visualization of data management offer a unique approach compared to traditional SQL practices.

## Terminology

Before diving into the specifics of database management, let’s examine how Bubble’s terminology differs from traditional SQL. These terms ***are not direct synonyms*** but reflect how each concept is applied within Bubble compared to SQL. Click any underlined term for more contextual information.

<table><thead><tr><th width="226">SQL</th><th>Bubble counterpart</th></tr></thead><tbody><tr><td><a data-footnote-ref href="#user-content-fn-3">Database record</a></td><td>Thing</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-4">Table</a></td><td><a data-footnote-ref href="#user-content-fn-5">Data type</a></td></tr><tr><td>Column</td><td><a data-footnote-ref href="#user-content-fn-6">Field</a></td></tr><tr><td>Primary key</td><td><a data-footnote-ref href="#user-content-fn-7">Unique ID</a></td></tr><tr><td>Query</td><td><a data-footnote-ref href="#user-content-fn-8">Search/Do a search for</a></td></tr><tr><td><a data-footnote-ref href="#user-content-fn-9">Join</a></td><td><a data-footnote-ref href="#user-content-fn-10">Custom field</a></td></tr><tr><td>Insert</td><td><a data-footnote-ref href="#user-content-fn-11">Create a New Thing</a></td></tr><tr><td>Update</td><td><a data-footnote-ref href="#user-content-fn-12">Make Changes to a Thing</a></td></tr><tr><td>Delete</td><td>Delete a Thing</td></tr></tbody></table>

## Database setup

The first difference you’ll notice is that databases are created automatically. When you create a new application, Bubble creates one database for the [development environment and one for the live environment](#user-content-fn-13)[^13], and the two operate independently of each other. Upon [deploying your application](#user-content-fn-14)[^14], the structure of both databases is synchronized, but their data content remains separate.

In other words, unlike traditional SQL where setting up a database requires manual configuration, Bubble automates the process. With traditional SQL, you must install and configure a database server, create the database, and define the schema manually. This setup is typically done through command-line interfaces or SQL editors, using SQL syntax and commands.

Additionally, in traditional SQL, you need to manually define tables, columns, data types, indexes, and relationships by writing SQL scripts or using database management tools. Creating separate environments for development and production involves setting up different instances or databases, configuring connections, and managing migrations and synchronizations between them.

In contrast, Bubble handles all of this for you in the editor. You can define your data types (equivalent to tables) and fields (equivalent to columns) without writing any SQL code. Bubble’s built-in features for data management allow you to create, modify, and delete data records without needing to write custom queries, making the process more intuitive and accessible for beginners.

### Users

Bubble automatically generates a User data type when you create a new application. This data type includes an email field and secure handling of passwords. The User data type integrates with Bubble's built-in authentication system, making it easy to implement user login, sign-up, password reset, and other authentication features without manual setup or compromising security.

<figure><img src="/files/SpgdGOWiEvvVaNr9wiBY" alt=""><figcaption><p>The User type is automatically set up in all apps. It comes with a set of built-in fields, but can be extended with custom fields as needed. Illustrated above with the <em>Name</em> field of type <em>text</em>.</p></figcaption></figure>

While you can add as many additional fields (columns) to the User data type (table) as you want, there's no need to manually define the schema or relationships for user data—Bubble handles these aspects internally.

### Built-in fields

Every data type in Bubble automatically includes a list of built-in fields that are pre-configured and managed by Bubble, providing useful metadata without requiring additional setup.

* **Creator:** Identifies the user who created the thing.
* **Modified date:** Automatically updates to reflect the last modification date of the thing.
* **Created date:** Automatically sets to the date and time the thing was created.
* **Slug:** A URL-friendly identifier that can be used for SEO and navigation.
* **Unique ID:** A unique identifier of each single thing, comparable to a primary key in SQL

The data in these fields are populated and updated automatically, with the exception of the slug, which is set according to specific rules to ensure it remains URL-friendly. In contrast with traditional SQL, there’s no need for explicit schema definitions and additional logic to achieve the functionality offered by the built-in fields.

The User type comes with the additional *email* field.<br>

## Backups

Bubble automatically handles database backups. They are handled at the platform level, meaning that Bubble will create incremental backups of both your app’s databases for every change that happens, without requiring user action. This also means you can restore backups to any specific point in time, within the timeframe allowed by your plan.

The automated backup system is designed to be user-friendly, requiring no technical knowledge or configuration from the user. However, it differs from traditional methods in that you don’t have direct access to the backup files, but you can rewind to any point in time in your plan’s retention window, as well as export one or more tables to CSV. You can read more about how Bubble backs up both the app and its databases in this article.

Article series: [Restoring database backups](/help-guides/maintaining-an-application/database-maintenance/database-copy-and-backups)

## Joining tables

Joining tables in SQL and Bubble involves fundamentally different approaches due to the nature of each platform. In SQL, joining tables is an explicit, manual process. You write SQL queries using commands like JOIN, INNER JOIN, LEFT JOIN, and RIGHT JOIN to combine rows from two or more tables based on related columns. This process requires specifying the exact columns and conditions for the join, making it flexible but necessitating a solid understanding of SQL syntax and database relationships.

In contrast, Bubble abstracts much of this complexity. Instead of writing queries, you create relationships between data types using custom fields (which are akin to foreign keys in SQL). When you need to combine data from different types, Bubble handles the underlying logic for you. This means you interact with a visual interface to define relationships between data types.

<figure><img src="/files/oFo4LGqaqaAZTNTpvBmz" alt=""><figcaption><p>In the example above, we have set up a custom field on the User data type that links it to a company. In plain English, this means we can easily see which company any user is associated with.</p></figcaption></figure>

In Bubble, every "thing" (record) in the database has its own unique ID, similar to a primary key in SQL. However, unlike traditional SQL databases, you don’t need to reference this unique ID directly in the same way. Bubble simplifies data management by allowing you to create relationships between data types using custom fields, which acts more like foreign keys in SQL but with less manual effort.

Let’s explore how different types of relationships can be handled in SQL and Bubble. While this is not an exhaustive list of all possible scenarios or methods, it illustrates how Bubble manages relationships in a more visual manner, helping you adapt to its approach.

### One-to-many

In SQL, a one-to-many relationship is established by adding a foreign key in the table representing the “many” side that references the primary key of the table on the “one” side. For example, if you have a *Projects* table and a *Tasks* table, each task would include a project\_id column to indicate which project it belongs to. You would then write SQL queries to join these tables when you need to fetch related data.

<figure><img src="/files/ozLlyTYMLMv9in1PYmo9" alt=""><figcaption><p>In this example (similar to the <em>User</em> example above) we have linked a <em>Task</em> with a <em>Project</em>.</p></figcaption></figure>

In Bubble, creating a one-to-many relationship is handled through the visual interface. For example, if you have two data types called *Project* and *Task*, you would add a field of type Project to the Task data type to link each task to a specific project. Conversely, you can add a field of type Task (as a list) to the Project data type to maintain a list of tasks associated with each project.

<figure><img src="/files/Bb4FgM21Gu4YHDe9V6eN" alt=""><figcaption><p>In this example, we have linked the <em>Task</em> and <em>Project</em> data type from the Project data type instead. Note the second rectangle, showing the one-to-many relationship between the two: in plain English, a project can contain a list of tasks.</p></figcaption></figure>

### Many-to-many

In SQL, a many-to-many relationship is typically implemented using a join table (sometimes called a junction table). This join table contains foreign keys referencing the primary keys of the two related tables. For example, if you have *Tasks* and *Projects* tables, a TaskProjects join table would contain student\_id and course\_id columns to represent the many-to-many relationship.

<figure><img src="/files/Bb4FgM21Gu4YHDe9V6eN" alt=""><figcaption></figcaption></figure>

In Bubble, creating a many-to-many relationship involves adding a list field to both data types. For instance, if you have *Task* and *Project* data types, you could add a field of type Projects (as a list) to the Task data type, and a field of type Task (as a list) to the Project data type. This allows each task to be associated with multiple projects and each project to be associated with multiple tasks.

<figure><img src="/files/6YTnTuggNtmUJ91Y2qAP" alt=""><figcaption></figcaption></figure>

### One-to-One

In SQL, a one-to-one relationship is created by ensuring that both tables have unique constraints on their foreign keys, typically by using primary keys. For example, if you have a Users table and a Profiles table, each user would have a unique profile, and the Profiles table would include a user\_id column with a unique constraint to ensure one-to-one mapping.

In Bubble, a one-to-one relationship is achieved by adding a custom field of one data type to another data type. For example, if you have User and Profile data types, you can add a field of type Profile to the User data type and a field of type User to the Profile data type. This setup ensures that each user is linked to a single profile and vice versa.

<figure><img src="/files/agtbmDznJBwlYLFJ3VqT" alt=""><figcaption><p>Again, we are using a custom field to link two data types. If needed, you can add a <em>User</em> field on the <em>Profile</em> data type to link the other way too.</p></figcaption></figure>

## Searching for data

Instead of performing queries using SQL syntax, using commands like SELECT, WHERE, and JOIN, Bubble has a visual interface that lets you build dynamic expressions. Dynamic expressions let you set up data sources, of which a database search is a potential source.

Searches in Bubble are configured using constraints, which act as filters to refine the data retrieved from the database. You specify these constraints visually, selecting fields and setting conditions without needing to write SQL queries.

One key advantage of Bubble’s approach is how it handles relationships between data types. In SQL, you need to explicitly write JOIN commands to combine data from related tables, specifying the exact columns and conditions for the join.

In Bubble, as we explored in the earlier section, relationships between data types are created through custom fields, which act like foreign keys. When you perform a search or build a dynamic expression, Bubble automatically manages these relationships, effectively handling the joins for you.

For example, if you have two data types, Project and Task, you can link tasks to projects by adding a Tasks list field to the Project data type. When you search for projects, Bubble will include related project data without requiring you to write any join queries.

<figure><img src="/files/sy20lVIXeS3LQSZCHXrE" alt=""><figcaption><p>In this <em>Do a search for</em> expression we are querying the database for projects related to a specific task.</p></figcaption></figure>

Dynamic expressions in Bubble are designed to automatically reflect the latest data changes, ensuring your app always shows the most up-to-date information. Bubble accomplishes this by using a WebSocket connection to manage real-time updates. Whenever the database is modified, updates are instantly pushed through the WebSocket to all relevant users and pages. This process keeps your displayed data current without the need for manual refreshes or additional queries.

## Data security

In traditional SQL databases, managing data privacy involves defining roles and permissions through SQL commands. Administrators write queries to specify which actions (like SELECT, INSERT, UPDATE, DELETE) users can perform on tables or views. Advanced security features, such as row-level security and view restrictions, require detailed planning and technical expertise, often handled by database administrators.

Bubble simplifies data privacy with privacy rules. Instead of writing SQL commands, you define who can view, modify, and interact with data based on user roles and conditions. This intuitive approach makes it easy for users of all technical levels to implement robust access controls, ensuring data security without the need for deep technical knowledge. Bubble’s privacy rules automatically enforce these settings, providing a straightforward and secure way to manage data privacy.

Article series: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

### Data API

Additionally, Bubble offers a built-in inbound API feature that enables you to grant external systems and applications access to your app’s database through the Data API, allowing them to read and manage some or all of your database’s data. This access is also governed by privacy rules, allowing you to configure specific permissions based on the identity of the client, ensuring secure and controlled data interactions.

You can read more about the Data API in the article series below.

Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)

[^1]: An SQL database is a system that uses Structured Query Language (SQL) to store, manage, and retrieve data.

    It organizes data into tables with rows and columns.

[^2]: PostgreSQL is an open-source relational database management system that uses SQL to interact with data.

    It is widely used for both small and large applications in traditional code environments.

[^3]: In this context, a “database record” refers to a single entry within a table.

[^4]: In this context, “table” refers to the structure used to store and organize data.

[^5]: You can set up as many custom data types as you need in your Bubble database. A data type is any isolated type of data that can include one or more fields, such as User, Task, Project, etc.

    Article series: [The database](/help-guides/data/the-database)

[^6]: A *field* is a pie

[^7]: Every thing (database record) in the Bubble database is assigned a Unique ID. This is akin to a primary key in traditional SQL development.

[^8]: A *Search* is a query to the database to fetch data based on specific constraints. *Do a search for* is the name of the actual data source in Bubble.

    Reference: [Do a search for](/core-resources/data/data-sources#do-a-search-for)\
    Article: [Finding data](/help-guides/data/the-database/finding-data)

[^9]: In this context, “join” refers to linking data from different tables through related fields.

[^10]: In this context, “custom field” refers to a field set to a custom data type, meaning another data type that you have created in the database.

    Generally, custom fields refer to any field that is not built-in.

[^11]: *Create a new Thing* is an action that creates a new thing (database record) and optionally populates its fields with data.

    Reference: [Create a new Thing](/core-resources/actions/data-things#create-a-new-thing)

[^12]: *Make changes to a Thing* is an action that updates an existing thing (database record) with new information.

    Reference: [Make changes to a Thing](/core-resources/actions/data-things#make-changes-to-thing)

[^13]: All Bubble apps are create with one development version and one live version. The article series below covers this in-depth.\
    \
    Article series: [Version control](/help-guides/maintaining-an-application/version-control)

[^14]: *Deploying* your app in Bubble means publishing your application to a live environment, making it accessible to users.

    Article: [Deploying your app](/help-guides/publishing-your-app/deploying-your-app)
