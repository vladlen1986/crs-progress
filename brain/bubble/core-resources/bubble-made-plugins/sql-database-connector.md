# SQL Database Connector
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/sql-database-connector · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This is the shorter, technical reference for Bubble’s SQL Database Connector. If you want the more in-depth user manual article, check out the link below:

Article: [SQL Database Connector](/help-guides/integrations/sql-database-connector)
{% endhint %}

The SQL Database Connector Plugin connects to databases and runs SQL queries from within Bubble. These queries can be triggered as actions, datasources (they show up as External APIs) or both. Bubble supports connecting to PostGres, MySQL and Microsoft SQL.

## Setup

A connection should look like:

`mysql://username:password@my-db-instance.endpoint.us-east-1.rds.amazonaws.com:PORT/db_name`

If there are special characters in the password, they must be URL-encoded, for instance replacing `#` with `%23`. The rest of the encodings are listed [here](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding).

{% hint style="info" %}
**Tip:** Some special characters are not supported by the default mySQL integration, which uses UTF8 encoding. You can add `?charset=UTF8MB4_GENERAL_CI` to resolve this and appropriately send characters such as emojis to your SQL database.
{% endhint %}

If the connection needs to be encrypted, e.g., with Microsoft Azure, you will need to add a parameter to it. The parameter depends on the type of SQL database you are connecting to:

* mysql => `?ssl={}`
* postgres => `?ssl=true`
* mssql => `?encrypt=true`

Once a connection string is created, you can create queries that use it.

Any SQL statement is allowed, but for SELECT statements, you must add LIMIT N at the end, where N <= 200. Once you test and save the query, you can use it as an action, data source, or both, depending on how you configured it. Please note that a SELECT query returns a list, so when using it as the result of a previous step in a workflow, you must select a specific element by using :first item, :last item, etc.

### Sending options as URL parameters

These libraries come with different options and the SQL Database Connector Plugin supports passing these options through as URL parameters. In other words all the options in the documentation for these libraries can be inserted in the URL as query string parameters.

You will find the documentation for the different libraries and their options here:

mssql -> <https://github.com/tediousjs/tedious>\
mysql -> <https://github.com/sidorares/node-mysql2/tree/master/documentation>\
postgres -> <https://github.com/brianc/node-postgres/>

For example, we can go fro&#x6D;*:*

*protocol://user:password\@host:port/database?param1=value1\&param2=value2 ...* to

```
{
    user, password, host, port, database, ...param1, param2
}
```

## FAQ

### Will the plugin use the default port based on the URL scheme?

*All* fields are required in the connect string, including port number. For mysql, that's typically 3306, for Postgres, that's 5432.
