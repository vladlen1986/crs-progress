# SQL Database Connector
> Source: https://manual.bubble.io/help-guides/integrations/sql-database-connector · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the SQL Database Connector plugin, which lets you connect with external SQL databases

{% hint style="info" %}
This is the in-depth manual article series on Bubble’s SQL Database Connector. If you want the shorter, technical reference, check out the Reference entry:

Reference: [SQL Database Connector](/core-resources/bubble-made-plugins/sql-database-connector)
{% endhint %}

<figure><img src="/files/ePDkir6AKnFydmUTY8wX" alt=""><figcaption><p>The Bubble SQL Database Connector plugin lets you connect to external SQL databases</p></figcaption></figure>

Sometimes you'll need to connect to an external database to make the most of your Bubble app. The SQL Database Connector Plugin is a handy tool that allows you to connect to databases like:

* Postgres
* MySQL
* Microsoft SQL

By running SQL queries from within Bubble, you can access information or trigger actions.

<details>

<summary>What is SQL?</summary>

SQL (Structured Query Language) is a language used for managing and manipulating relational databases.

It is primarily designed for querying, inserting, updating, and deleting data within a database, as well as creating and modifying database structures. SQL is widely used and supported by various database management systems, such as MySQL, PostgreSQL, and Microsoft SQL Server.

Bubble uses PostgreSQL as the foundation for its database. By using PostgreSQL, Bubble takes advantage of a well-established, secure, and efficient database system that has been developed and refined over the years.

This also ensures compatibility with other databases and tools, making it easier to integrate and connect with external systems when needed.

</details>

## Installing the plugin

The SQL Database Connector is not a built-in feature but an optional plugin that needs to be installed through the plugin store. To install it, search for "SQL Connector" and install the plugin below:

<figure><img src="/files/o4IbMARe1wLiQieyN28S" alt=""><figcaption><p>Make sure that the plugin you select has the <em>By Bubble</em> stamp in the lower right corner of the plugin entry.</p></figcaption></figure>

Click install to install it in your app.

## Setting up a connection

After installing the plugin, you will see its settings where you can set up new connections. You can set up as many connections as you need, and you can set up as many queries as you need on each connection.

1. First, click the *Add a new connection* button to create a new one.
2. Then, provide a **name** for the connection. This is only for internal use and does not affect how the connection works.
3. Next, we choose the **Database type**. Bubble officially supports connecting with Postgres, MySQL and Microsoft SQL.
4. The next step is to set up the **Connection string**. This is where we set up the authentication and the URL of the SQL database we want to connect to. This information you set up here is sent encrypted from Bubble's server and is not visible to your app's users.\
   \
   The format of the Connection string is as below:

{% code overflow="wrap" %}

```
mysql://username:password@my-db-instance.endpoint.us-east-1.rds.amazonaws.com:PORT/db_name
```

{% endcode %}

### Finding the connection settings

To find the connection settings for the SQL database, follow these general steps:

1. Locate your database management system (DBMS) documentation: Refer to the documentation provided by your DBMS vendor (such as MySQL, PostgreSQL, Microsoft SQL Server, etc.) for specific instructions on locating connection settings.
2. Access your DBMS management tool: Use the appropriate management tool provided by your DBMS vendor, like phpMyAdmin for MySQL, pgAdmin for PostgreSQL, or SQL Server Management Studio for Microsoft SQL Server.
3. Find the connection details: In the management tool, look for the connection details, including the hostname or IP address, port number, database name, username, and password. These details may be found in the server configuration, connection properties, or user account settings.

With the information you find, you can generate the connection string mentioned earlier. Let's look at what each section of the string represents.

### Understanding the connection string

The connection string consists of different parts that each serve a purpose in the connection:

1. `mysql://`: This is the protocol prefix indicating that the connection string is for a MySQL database.
2. `username`: The username for a database user that has access
3. `password`: The password for that user
4. `@`: This symbol separates the authentication credentials (username and password) from the rest of the connection string.
5. `my-db-instance.endpoint.us-east-1.rds.amazonaws.com`: This is the hostname or address of the database server. In this case, it's an Amazon RDS instance located in the US East (N. Virginia) region.
6. `:PORT`: The port number on which the MySQL server is listening for connections. Replace `PORT` with the actual port number (commonly 3306 for MySQL).
7. `/db_name`: The name of the specific database you want to connect to

#### Formatting the password

If your password contains special characters, they must be URL-encoded to ensure proper connection. For example, replace the '#' symbol with '%23'. A comprehensive list of URL encoding replacements can be found in this link. You can also use an automated converter like [www.urlencoder.io](https://www.urlencoder.io/)

For example, the password below is displayed with and without URL encoding:

```
❌ my password/U2n(
```

```
✅ %22my%20password%2FU2n%28%22
```

### Encrypted connections

{% hint style="danger" %}
If you don't add the parameters below, the connection won't be encrypted, allowing data transmission to be intercepted and read as plaintext.

For sensitive information or production environments, we recommend you always use encrypted connections.
{% endhint %}

To set up an encrypted connection, you will need to add a parameter to the connection string. The parameter depends on the type of SQL database you are connecting to:

#### **MySQL**

Add the `?ssl={}` parameter to the connection string. The resulting connection string would look like:

```bash
mysql://username:password@hostname:port/database_name?ssl={}
```

#### **PostgreSQL**

Add the `?ssl=true` parameter to the connection string. The resulting connection string would look like:

```perl
postgres://username:password@hostname:port/database_name?ssl=true
```

#### Microsoft SQL Server

Add the `?encrypt=true` parameter to the connection string. The resulting connection string would look like:

```bash
sql://username:password@hostname:port/database_name?encrypt=true
```

In some cases, you may need to provide additional parameters, such as the SSL certificate or the SSL key, depending on your DBMS and hosting provider's requirements.

Check your database vendor's documentation for detailed instructions on configuring encrypted connections.

### Testing the connection

Once you've entered all the required connection details, click *Test the connection* to verify that it's functioning properly.

If there are any issues, Bubble will display an error message to help you identify and resolve the problem.

<figure><img src="/files/NB2riTkdsOKLA5fJxA8b" alt=""><figcaption></figcaption></figure>

## Adding queries

<details>

<summary>What is a database query?</summary>

A database query is a way to ask a database to find, add, change, or remove data.

They are a way to work with the data in an external database just like you would in the database of your Bubble app. Instead of using built-in actions like *Do a search for*, *Create a new thing* and *Make changes to a thing,* we set up queries that perform the same task in an external database.

Because Bubble uses the widely adopted PostgreSQL language, your app can communicate without problems with a lot of other database systems that use a similar language.

</details>

{% hint style="info" %}
This article provides an introduction to SQL queries, but is not an exhaustive list of keywords. For a more in-depth guide to SQL queries, we recommend W3School's SQL tutorial section:

External link: [W3School's SQL tutorial section](https://www.w3schools.com/sql/)
{% endhint %}

When the connection is set up and working, it's time to add the queries we want.

1. First, we provide a **name** for the query. This is only for internal use and does not affect how the query works
2. In the **Connection** dropdown, you can select which connection to use: this is the connection we set up earlier
3. The **Use as** dropdown lets you specify whether you want to use the query in an *action,* as a *data source* or both. It doesn't affect the query itself, only where it becomes available in your app
4. Finally, we set up the query itself

{% hint style="info" %}
The terminology used in SQL is a little bit different from what's used in Bubble. When we talk about a *table*, the Bubble equivalent is *data type*. For example, the *user table* means we are working with data in the *user* data type.
{% endhint %}

## Fetching data

Let's say first that we want to query a list of users from an external database. A simple query returning all users (with no constraints) would look like the following:

```sql
SELECT * FROM users;
```

This string is instructs a PostgreSQL database to return all the columns (\*) and all the rows from the "users" table. The semicolon (;) at the end of the query indicates the end of the statement.

> This example is basically the same as setting up *Do a search for* without adding any constraints.

### Adding constraints

Now let's add some constraints to the query. We'll still search for users, but only:

* With an age higher than 25 (number/integer)
* From the country "India" (text/string)

```sql
SELECT * FROM users WHERE age > 25 AND country = 'India';
```

We're still saying we want entries *FROM* the *users* table, WHERE age > 25 and the country is called India.

If we compare this to a Bubble database, we are basically setting up the *Do a search for* below:

<figure><img src="/files/cHyrlmKWDPGSs3fy1zsU" alt=""><figcaption><p>The SQL query we just set up will produce the same result as this <em>Do a search for,</em> but pulling data from an external database.</p></figcaption></figure>

### Dynamic constraints

{% hint style="info" %}
**Note on MySQL connections:** MySQL formats parameters differently than Microsoft SQL and PostgreSQL. Instead of using $1, $2 and so forth, you use ? for both the first parameters and top separate multiple parameters.
{% endhint %}

In the example above, we set up constraints that will work just fine, but they have one drawback; they are static values (25 and India), and in many cases you will want to specify the constraints dynamically when you send the query.

To do this, we use *parameters.* Each parameters is written out in the SQL query as $1, where the number 1 represents a count of each parameter. In other words, for each parameter you add, you increase the number by 1: In our case, we would need two (age and country), making the key of these two parameters $1 and $2:

```sql
SELECT * FROM users WHERE age > $1 AND country = $2;
```

As you can see, we've replaced the static values (25 and India) with two parameters. Now we need to set those parameters up below to tell Bubble what kind of data to expect for the two parameters (number (age) and text (country)).

<figure><img src="/files/2W1i56TGuBO4oz0L0qka" alt=""><figcaption></figcaption></figure>

Note the section under *Parameters*. Bubble automatically creates a numbered identifier for each parameter you create ($1, $2 and so on).

* Click *Add parameter* for each parameter you want to add
* Provide a **name**: this is used internally in your app and doesn't affect the query
* Provide a **data type**, such as *number* and *text*
* Provide a **test value**: this value is only used in the initialization
* Click *Initialize this query* to send a request to the external server and verify that it's working

### Limiting the result

The queries above will ask the database to send back all the results that match. In many cases you won't need to send back that much data. Also, Bubble has a limit of 200 records returned in the SQL database connector.

You must add a limit to the number of results by using the *LIMIT* keyword; this limit must be 200 or less for main cluster apps. If no limit is included, the query will fail. Building further upon our query from above, we'll add a limit of 10 records.

The result should look like this:

{% code overflow="wrap" %}

```sql
SELECT * FROM users WHERE age > $1 AND country = $2 LIMIT 10;
```

{% endcode %}

### Sorting the results

If you need to sort the results, you can use the ORDER BY keyword:

{% code overflow="wrap" %}

```sql
SELECT * FROM users WHERE age > $1 AND country = $2 ORDER BY age ASC LIMIT 10;
```

{% endcode %}

In the example above, we are using two keywords:

* **ORDER BY** makes sure that we order by the user's age
* **ASC** ensures that the sorting is ascending

Let's repeat what this full query does: it all columns (\*) from the *users* table where the *age* is greater than the value represented by $1 and the *country* is equal to the value represented by $2.

The results are sorted by the age column in ascending order (ASC) and limited to 10 records.

## Updating data

So far we've looked at how we can send a query to get some data back. SQL queries can also make changes to the database, such as creating, updating and deleting records.

### Creating a record

To create a new record (similar to *Create a new thing* in Bubble), we use the INSERT INTO keyword. We'll need some additional information in that query:

* Which table to add the record to (users)
* Which fields to add data to
* The value to save in those fields

For example, we could set up a query like this:

```sql
INSERT INTO users (first_name, last_name, age, country)
VALUES ('John', 'Doe', 28, 'USA');
```

Here we have two rows, where the first row specifies the *table* and *fields*, and the second row contains the values we want to save.

{% hint style="info" %}
Just like in Bubble, an SQL database will automatically generate fields for *unique ID, Created date* and *Modified date*. Note that the unique ID does not necessarily have the same structure as in Bubble.
{% endhint %}

### Updating a record

To update a record (similar to *Make changes to a thing* in Bubble), we use the UPDATE keyword. For this query, we need to supply the following information:

* The table where we want to make the change
* The change we want to make
* The constraint to apply to the database search. In the example below we are using the ID field (similar to Unique ID in Bubble) to make sure we get the correct record.

{% code overflow="wrap" %}

```sql
UPDATE users
SET age = 29, country = 'Canada'
WHERE id = 123321;
```

{% endcode %}

In this example, we are changing the *age* and *country* fields on the user with the ID 123321.

{% hint style="info" %}
The UPDATE keyword can also be used to change a list of things by changing the constraint specified in WHERE. For example, we could replace the id = 123321 with first\_name = 'John' to make the change on all users named John.

To work on single records, we recommend always using the ID to ensure you are working on the correct record.
{% endhint %}

### Deleting a record

Now let's try to delete a record. Again we'll specify the user with an ID, and we need to provide:

* The table in which you want to perform the delete action
* The constraint to find the right user(s)

```sql
DELETE FROM users
WHERE id = 123321;
```

This command deletes the user with the id 123321.

{% hint style="info" %}
The DELETE keyword can also be used to delete a list of things by changing the constraint specified in WHERE. For example, we could replace the id = 123321 with first\_name = 'John' to delete all users named John.

To work on single records, we recommend always using the ID to ensure you are working on the correct record.
{% endhint %}

## Technical limitations

* Bubble accepts a maximum of 200 lines per response. This limit can be increased for apps on an Enterprise - Dedicated plan by contacting their Technical Success Manager (TSM).
