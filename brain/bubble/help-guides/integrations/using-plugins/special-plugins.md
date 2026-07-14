# Special Plugins
> Source: https://manual.bubble.io/help-guides/integrations/using-plugins/special-plugins · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

A few plugins have been developed by the Bubble Development Team to let you add connections with external services (or private backends).

## The API Connector

{% hint style="info" %}
If you want to learn more about the API Connector you can check out our dedicated section on it [here](/help-guides/integrations/api/the-api-connector).
{% endhint %}

The API Connector is a special plugin built by Bubble's development team that lets you connect to any service that exposes a JSON-based, RESTful web API. You can use this to add API calls to fetch data from an external service, or post data to trigger some actions on the service's end.

![](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-M5smrJkMfjcu6xQRWw4%2F-M5smtAomWjHamSBjbOJ%2FDesktop%202017-03-14%20at%209.11.59%20PM.png?alt=media)

Note that as soon as a connection is added to your app through the API connector, it can be converted into a plugin by right clicking on the API connector and creating a plugin. Please convert public APIs into plugins as much as you can as it's a way to share functionality with other Bubblers.

{% hint style="warning" %}
**Note:** If an API call takes longer than 30 seconds to complete, Bubble will automatically retry this call. This is relevant if you're handling actions like sending emails where it may take more than 30 seconds to receive confirmation back from the service that the action has been completed. This may result in additional emails being sent if confirmation has not been processed.
{% endhint %}

## The Bubble App Connector <a href="#the-bubble-app-connector" id="the-bubble-app-connector"></a>

The App Connector lets you connect two Bubble apps and access the API and the data of one app in another. Doing so, you can sign up with OAuth with another app, run workflows as the user of the second app, etc.

To use the App Connector, you'll need to set up an API with the first app A, before using it in app B. If you want to enable your users to sign up with app A in app B, you'll need to define some OAuth credentials in app A in the Settings tab. Once this is done, you can install the Bubble App Connector in app B and add the app A.

![](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-M5smrJkMfjcu6xQRWw4%2F-M5smtAqL-QVBC44IR_Z%2FDesktop%202017-03-14%20at%209.25.02%20PM.png?alt=media)

Once you've added an app, Bubble will automatically fetch the different public calls and public workflows that app A exposes. You can install the different calls and you'll be able to use them either as a data source in 'Get data from API' or as actions in your workflows.

You have a few options for authentication for running the calls. Authentication is important because the identity of the user that makes the call will have consequences on the data that can be seen given the privacy roles in app A. By default, you can either pick an API key, or provide no authentication (and the calls will execute as defined in app A). If you enter a client ID and a Client secret, you'll also be able to let your users authenticate with OAuth with app A in app B, and OAuth will be a third option for authentication.

1. No authentication: the calls will be run without an API key, and the calls will be run as a logged out user
2. API Key: the calls are made as an admin user of app A, with all data visibility rights
3. OAuth: the calls will be made on behalf of the user that logged in with app A in app B, and the privacy roles will apply to him/her as the current user.

Note that once you've set up the App Connector in B to A correctly, in B you'll be able to offer end-users the ability to log in with their account in A. This utilizes the "Signup/login with a social network" workflow action (similar to a "Login with Google" feature).

## The SQL Database Connector

The Database Connector allows you to connect to databases and run SQL queries from within Bubble. These queries can be triggered as actions, datasources (they show up as External APIs) or both. Bubble supports connecting to PostGres, MySQL and Microsoft SQL.

To use this plugin, you first should define the connection string that represents the database you want to connect to. A connection should look like:

`mssql://username:password@my-db-instance.endpoint.us-east-1.rds.amazonaws.com:PORT/db_name`

If you need the connection to be encrypted (for instance with Microsoft Azure), you should add `?encrypt=true` to the connection.

Once you create a connection string and validate it, you can create queries that use it. Any SQL statement is allowed, but for SELECT statements you need to add LIMIT N at the end, where N <= 100. Once you tested and saved your query, you can now use it as an action, datasource or both, depending on how you configured it. Please note that a SELECT query returns a list of things.

![](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-M5smrJkMfjcu6xQRWw4%2F-M5smtAsAMAX1jpt8dx7%2FDesktop%202017-03-14%20at%2010.50.08%20PM.png?alt=media)




---

[Next Page](/llms-full.txt/3)
