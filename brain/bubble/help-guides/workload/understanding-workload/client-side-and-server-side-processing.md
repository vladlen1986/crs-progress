# Client-side and server-side processing
> Source: https://manual.bubble.io/help-guides/workload/understanding-workload/client-side-and-server-side-processing · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

In the [Infrastructure](/help-guides/optimizing-an-application) section of the manual, we explain the [differences between client-side and server-side processes](/help-guides/security/client-side-and-server-side). Running a Bubble app is a collaborative effort between the user's device (computer, tablet, or phone) and the Bubble server. Although more than one server can be involved, this article focuses on these two devices and how they affect workload management.

Workload is essentially the aggregated metric indicating how much work the server does to keep your app running. While server-side operations contribute to this workload, client-side workflows, such as animating an element, do not add to the server’s workload.

Still, essential client-side operations can sometimes depend on the server to function properly. For example, loading a page requires the server to compile and send data to the user’s device, even if the page rendering happens client-side. Likewise, animating an element is a client-side action, but a condition or other actions within the same workflow may still require server communication, and showing a previously hidden repeating group can lead to its data source fetching data from the database.

In this article, we'll explore which workflows are performed server-side and client-side, and the design decisions that can force Bubble to include server-side operations, even in workflows that are typically client-side.

## The difference between client-side and server-side operations

While it may not cover every scenario, asking the following overarching questions can often reveal whether an operation involves the server:

<table><thead><tr><th width="340">Question</th><th width="118">Performed</th><th>Reason</th></tr></thead><tbody><tr><td>Does the operation require accessing or modifying data stored in the database?</td><td>Server-side</td><td>Involves database operations</td></tr><tr><td>Is the operation using or calling an API?</td><td>Server-side</td><td>APIs are routed through the server</td></tr><tr><td>Is the operation related to user authentication or session management?</td><td>Server-side</td><td>Involves security and session verification</td></tr><tr><td>Does the operation involve complex calculations or data processing?</td><td>Server-side</td><td>Leverages server resources for processing</td></tr><tr><td>Is the operation dependent on real-time user interactions, like displaying or hiding elements?</td><td>Client-side</td><td>Handled by the user’s device</td></tr></tbody></table>

Going more into detail, we can also divide typical processes into client-side and server-side. The list below is not comprehensive, but illustrates some typical operations that would include either the client or the server. In principle, all operations that involve the database, files, backend workflows and external APIs will need to involve the Bubble server in some way.

| Typical Client-side Operations | Typical Server-side Operations            |
| ------------------------------ | ----------------------------------------- |
| Set a custom state value       | User authentication (login/signup)        |
| Element visibility (show/hide) | Database searches and queries             |
| Form input handling            | Sending emails (confirmation, reset)      |
| Animations and transitions     | Data creation, modification, and deletion |
| Scrolling to elements          | External API calls                        |
| Client-side calculations       | File uploads and deletions                |
| Displaying data                | Scheduled workflows                       |
| Updating element states        | Managing user sessions                    |
| Resetting input fields         | Assigning temporary passwords             |
| Showing alerts and messages    | Processing recurring events               |

It's important to understand that even if an operation can be done client-side, its settings and properties might still require server involvement.

For example, the "Display data" action is technically client-side, but if you're displaying data from the database in a container element like a group, that data must be loaded from the server. Conversely, if you use "Display data" to load a static number, it can be handled entirely client-side.

Additionally, the purpose of this guide is to help you understand how workload calculation is affected by client-side and server-side operations—not to suggest that you should always avoid server operations. All Bubble apps need to connect to the server to function, and there are security, efficiency, and functionality considerations when trying to move tasks away from the server.

Below, we’ll start breaking down how workflows and elements involve the server when needed.

## Workflows

A workflow can consist of many pieces. To understand what happens where, we need to divide the workflow into separate categories that can potentially spend workload. All backend workflows are performed server-side, but frontend workflows can be executed server-side or client-side.

A workflow consists of components like the below tree:

* The event
  * Actions
  * Dynamic expressions:
    * Conditions on the workflow
    * Conditions on separate actions
    * Dynamic expressions that are part of an action

Let's go over each component in more detail.

### Events

Every workflow in Bubble is triggered by an event, such as a button being clicked. When Bubble identifies an event happening, it will check any additional conditions on the event, and proceed to run the actions inside.

#### Events table

<table><thead><tr><th>Event</th><th width="133">Performed</th><th>Reason</th></tr></thead><tbody><tr><td>User is logged in</td><td>Server-side</td><td>Authentication is managed on the server</td></tr><tr><td>User is logged out</td><td>Server-side</td><td>Session management is handled on the server</td></tr><tr><td>Page is loaded</td><td>Both</td><td>The page is loaded event can be triggered before the page loads, but can also be triggered on the client, depending on actions and conditions</td></tr><tr><td>Do every 5 seconds</td><td>Client-side</td><td>Timer events are handled client-side</td></tr><tr><td>Do when condition is true</td><td>Depends</td><td>It depends on the dynamic expression</td></tr><tr><td>An unhandled error occurs</td><td>Client-side</td><td>Errors are detected and managed locally. An error can be the result of a server-side action.</td></tr><tr><td>An element is clicked</td><td>Client-side</td><td>Click events are handled client-side</td></tr><tr><td>An input's value is changed</td><td>Client-side</td><td>Input changes are managed client-side</td></tr><tr><td>An element has an error running a workflow</td><td>Client-side</td><td>Element errors are detected locally. An error can be the result of a server-side action.</td></tr><tr><td>Custom event (on page)</td><td>Client-side</td><td>Custom events on the page are handled locally. Actions and dynamic expressions can still be processed server-side.</td></tr><tr><td>Custom event (Backend)</td><td>Server-side</td><td>Backend events are always processed server-side.</td></tr><tr><td>API workflow</td><td>Server-side</td><td>Backend events are always processed server-side.</td></tr><tr><td>Recurring workflow</td><td>Server-side</td><td>Backend events are always processed server-side.</td></tr><tr><td>Database trigger event</td><td>Server-side</td><td>Backend events are always processed server-side.</td></tr></tbody></table>

### Actions

Inside each workflow, there are one or more actions. When an event is triggered, Bubble checks the conditions for each action and executes them if the conditions are met. These actions can perform server-side operations (such as writing to the database) or client-side operations (such as hiding or showing an element).

Let's review each action to determine if it's performed client-side or server-side. Note the following when reading the table:

* The table only considers the cost of the action itself, not any additional workload consumption the action may lead to.
  * **Example 1:** triggering a page refresh doesn't consume workload, but loading the new page does (this is not part of the action).
  * **Example 2:** Similarly, triggering a custom event is handled client-side, but actions within that custom workflow may still consume workload.
  * **Example 3:** Setting a custom state is a client-side operation, but it may involve fetching data from the database.
* Any extra workload from dynamic expressions in fields or conditions is not considered in this table.
* Many server-side operations still include client-side processing, which means this list shouldn’t be read as black and white. We’ve marked them as server-side, since client-side doesn’t affect your workload.

#### Actions table

<table><thead><tr><th width="284">Action</th><th width="130">Performed</th><th>Reason</th></tr></thead><tbody><tr><td>Sign the user up</td><td>Server-side</td><td>Involves user data processing and database operations</td></tr><tr><td>Log the user in</td><td>Server-side</td><td>Authentication requires server verification</td></tr><tr><td>Signup/login with a social network</td><td>Server-side</td><td>Uses external API for authentication, routed through the Bubble server</td></tr><tr><td>Log the user out</td><td>Server-side</td><td>Involves session management on the server</td></tr><tr><td>Update the user's credentials</td><td>Server-side</td><td>Requires server-side data updates</td></tr><tr><td>Make changes to current user</td><td>Server-side</td><td>Updates user data stored on the server</td></tr><tr><td>Send confirmation email</td><td>Server-side</td><td>Email sending involves server operations</td></tr><tr><td>Send password reset email</td><td>Server-side</td><td>Email sending involves server operations</td></tr><tr><td>Send magic login link</td><td>Server-side</td><td>Email sending involves server operations</td></tr><tr><td>Create an account for someone else</td><td>Server-side</td><td>Involves creating user data on the server</td></tr><tr><td>Check password for the current user</td><td>Server-side</td><td>Password verification requires server check</td></tr><tr><td>Assign a temp password to a user</td><td>Server-side</td><td>Requires updating user credentials on the server</td></tr><tr><td>Change the email for another user</td><td>Server-side</td><td>Involves updating user data on the server</td></tr><tr><td>Log out other user's sessions</td><td>Server-side</td><td>Session management requires server operations</td></tr><tr><td>Go to page ...</td><td>Client-side</td><td>Navigation is handled by the client. Loading the new page will incur workload, but is not a part of the action.</td></tr><tr><td>Refresh the page</td><td>Client-side</td><td>Page reload is managed by the browser. Reloading the new page will incur workload, but is not a part of the action.</td></tr><tr><td>Go to previous page</td><td>Client-side</td><td>Browser history navigation is client-side</td></tr><tr><td>Open an external website</td><td>Client-side</td><td>Opening links is managed by the browser</td></tr><tr><td>Add a pause before next action</td><td>Client-side</td><td>Delays are managed by the client</td></tr><tr><td>Terminate this workflow</td><td>Client-side</td><td>Workflow control is handled client-side</td></tr><tr><td>Create a new thing...</td><td>Server-side</td><td>Involves database operations</td></tr><tr><td>Make changes to thing...</td><td>Server-side</td><td>Updates data stored on the server</td></tr><tr><td>Make changes to a list of things...</td><td>Server-side</td><td>Batch updates involve server-side processing</td></tr><tr><td>Delete thing...</td><td>Server-side</td><td>Requires server-side data removal</td></tr><tr><td>Delete a list of things...</td><td>Server-side</td><td>Batch deletions involve server-side processing</td></tr><tr><td>Copy a list of things...</td><td>Server-side</td><td>Data duplication is managed on the server</td></tr><tr><td>Set a thing's slug...</td><td>Server-side</td><td>Slug setting involves server-side updates, as well as confirming the slug is unique</td></tr><tr><td>Download data as CSV</td><td>Server-side</td><td>Data export involves server-side processing</td></tr><tr><td>Upload data as CSV</td><td>Server-side</td><td>Data import requires server-side processing</td></tr><tr><td>Delete an uploaded file</td><td>Server-side</td><td>File management involves server-side operations</td></tr><tr><td>Send email</td><td>Server-side</td><td>Email sending involves server operations</td></tr><tr><td>Send meeting request by email</td><td>Server-side</td><td>Email sending involves server operations</td></tr><tr><td>Send Facebook Message</td><td>Server-side</td><td>Involves external API communication routed through the Bubble server</td></tr><tr><td>Show</td><td>Client-side</td><td>Element visibility is handled by the client</td></tr><tr><td>Toggle</td><td>Client-side</td><td>Element visibility is handled by the client</td></tr><tr><td>Scroll to</td><td>Client-side</td><td>Scrolling is managed by the client</td></tr><tr><td>Set focus</td><td>Client-side</td><td>Focus control is managed by the client</td></tr><tr><td>Display data</td><td>Client-side</td><td>Data display is managed by the client, but may involve loading data from the server</td></tr><tr><td>Display list</td><td>Client-side</td><td>Data display is managed by the client, but may involve loading data from the server</td></tr><tr><td>Show next</td><td>Client-side</td><td>Handled by the client, but may involve loading more data from the server</td></tr><tr><td>Go to page</td><td>Client-side</td><td>Navigation is handled by the client</td></tr><tr><td>Show message (alert element)</td><td>Client-side</td><td>Messages are displayed by the client</td></tr><tr><td>Animate</td><td>Client-side</td><td>Animations are rendered by the client</td></tr><tr><td>Set state</td><td>Client-side</td><td>Custom state management is handled by the client</td></tr><tr><td>Reset inputs</td><td>Client-side</td><td>Input reset is managed by the client</td></tr><tr><td>Reset data</td><td>Client-side</td><td>Data reset is managed by the client</td></tr><tr><td>Show previous</td><td>Client-side</td><td>Handled by the client, and the data will already be loaded on the server</td></tr><tr><td>Clear list</td><td>Client-side</td><td>Clearing a repeating group is managed by the client</td></tr><tr><td>Scroll to entry</td><td>Client-side</td><td>Scrolling is managed by the client</td></tr><tr><td>Trigger a custom event</td><td>Client-side</td><td>Custom events are handled by the client</td></tr><tr><td>Schedule a custom event</td><td>Client-side</td><td>Custom event scheduling is handled by the client</td></tr><tr><td>Trigger a reusable element event</td><td>Client-side</td><td>Custom events are handled by the client</td></tr><tr><td>Schedule API Workflow</td><td>Server-side</td><td>Involves API and server-side processing</td></tr><tr><td>Schedule API Workflow on a list</td><td>Server-side</td><td>Batch API operations are managed by the server</td></tr><tr><td>Set/cancel a recurring event</td><td>Server-side</td><td>Recurring events involve server-side management to set and cancel, as well as each time they run</td></tr><tr><td>Cancel a scheduled API Workflow</td><td>Server-side</td><td>Canceling scheduled workflows involves server-side operations</td></tr></tbody></table>

### Dynamic expressions

Workflows can contain various dynamic expressions that sometimes involve the server, and the extent to which they do depends on the content of the expression. We delve deeper into dynamic expressions in the section below.

## Elements

Elements are essentially client-side in nature, but still consume some workload to load. Additionally, elements can be set up in ways that require workload, such as setting a data source that queries the database.

To load and render an element is part of the page load workload process, and the number of elements doesn't change this processes value. After that, each element can contain dynamic expressions that require some server work:

* Dynamic expressions
  * The element’s data source may be fetching data from the database
  * The element’s conditions may depend on server-side data sources
  * Any other fields that allow for dynamic expressions may also contain server-side data sources

#### Dynamic expressions

Elements can contain various dynamic expressions that sometimes involve the server, and the extent to which they do depends on the content of the expression. We delve deeper into dynamic expressions in the section below.

The placement of an expression does not affect its potential WU consumption. For example, two identical expressions placed in an element’s data source or in a condition will consume the same amount.

#### Element table

Let's review each element to determine if it requires server involvement.

{% hint style="info" %}
The table considers a **blank element** placed on the page. Any workflows, dynamic expressions and conditions added to each element may require server communication.
{% endhint %}

<table><thead><tr><th width="172">Page Element</th><th width="143">Performed</th><th>Reason</th></tr></thead><tbody><tr><td>Text</td><td>Client-side</td><td>Displayed and managed by the browser</td></tr><tr><td>Button</td><td>Client-side</td><td>User interaction handled by the browser</td></tr><tr><td>Icon</td><td>Client-side</td><td>Displayed and managed by the browser</td></tr><tr><td>Link</td><td>Client-side</td><td>Managed by the browser</td></tr><tr><td>Image</td><td>Client-side</td><td>Displayed and managed by the browser</td></tr><tr><td>Shape</td><td>Client-side</td><td>Rendered and managed by the browser</td></tr><tr><td>Alert</td><td>Client-side</td><td>Displayed and managed by the browser</td></tr><tr><td>Video</td><td>Client-side</td><td>Played and managed by the browser</td></tr><tr><td>HTML</td><td>Client-side</td><td>Rendered and managed by the browser</td></tr><tr><td>Map</td><td>Server-side</td><td>Rendered and managed by the browser, but requires an API call that is routed through the Bubble server</td></tr><tr><td>Built on Bubble</td><td>Client-side</td><td>Displayed and managed by the browser</td></tr><tr><td>Expression</td><td>Client-side</td><td>Evaluated and managed by the browser</td></tr><tr><td>Facebook Like</td><td>Server-side</td><td>Rendered and managed by the browser, but requires an API call that is routed through the Bubble server</td></tr><tr><td>Facebook Page</td><td>Server-side</td><td>Rendered and managed by the browser, but requires an API call that is routed through the Bubble server</td></tr><tr><td>Line/Bar Chart</td><td>Client-side</td><td>Rendered and managed by the browser</td></tr></tbody></table>

## Dynamic expressions

### The components of a dynamic expression

Dynamic expressions consist of three types of components: data sources, operators, and comparisons. While all three can be performed server-side, the processing location of the operators and comparisons depends on the data source component.

#### The data source

The data source is any source from which Bubble can pull data. As the list below suggests, some of these come from the database, others come from the client.

Note the following when reading the table:

* Many of the data sources in the table can be extended with sub-data sources that can change the location from which it’s processed:
  * **Example 1:** The Current user data source is downloaded on page load, and handled client-side after that. However, adding more steps, such as Current User’s Company’s Name may lead to additional queries to the server.
  * **Example 2:** Arbitrary text as a data source depends on the Text property inside of it. This allows for dynamic expressions, which may add queries even if the arbitrary text by itself is handled client-side
* In the majority of cases, API requests are routed through Bubble’s server for security reasons, and as such are handled server-side even if the actual request is made to a third-party server.

<table data-header-hidden><thead><tr><th></th><th width="138"></th><th></th></tr></thead><tbody><tr><td>Current user</td><td>Client-side</td><td>User data is downloaded on page load, and available client-side after that.</td></tr><tr><td>Do a search for</td><td>Server-side</td><td>Involves querying the database</td></tr><tr><td>Perform a search using Algolia</td><td>Server-side</td><td>Uses external API for search, routed through the Bubble server</td></tr><tr><td>Get an option</td><td>Client-side</td><td>Option sets are downloaded on page load, and available client-side after that.</td></tr><tr><td>Arbitrary text</td><td>Client-side</td><td>Text is processed client-side, but the content in the argument may contain server-side.</td></tr><tr><td>Arbitrary date/time</td><td>Client-side</td><td>Date/time is processed client-side</td></tr><tr><td>Get data from an external API</td><td>Server-side</td><td>Involves external API communication, routed through the Bubble server in the majority of cases</td></tr><tr><td>Parent group's thing / Current cell's thing</td><td>Client-side</td><td>Data is already loaded, and the query is not repeated</td></tr><tr><td>Current cell's index</td><td>Client-side</td><td>Index is managed client-side</td></tr><tr><td>Current page thing</td><td>Client-side</td><td>Data is downloaded on page load</td></tr><tr><td>Element</td><td>Client-side</td><td>Managed client-side</td></tr><tr><td>This page</td><td>Client-side</td><td>Managed client-side</td></tr><tr><td>This element</td><td>Client-side</td><td>Managed client-side</td></tr><tr><td>Result of previous step</td><td>Depends</td><td>Depends on the previous step</td></tr><tr><td>Current Workflow thing</td><td>Depends</td><td>Depends on workflow context</td></tr><tr><td>Thing now</td><td>Server-side</td><td>Backend database triggers are always processed server-side</td></tr><tr><td>Thing before change</td><td>Server-side</td><td>Backend database triggers are always processed server-side</td></tr><tr><td>Get data from page URL</td><td>Depends</td><td>URL is processed client-side, but may point to a data source that is fetched from the server</td></tr><tr><td>Calculate formula</td><td>Client-side</td><td>Calculation is done client-side</td></tr><tr><td>Calculate loan payment</td><td>Client-side</td><td>Calculation is done client-side</td></tr><tr><td>Coordinates to address</td><td>Server-side</td><td>Uses external API for geocoding, routed through the Bubble server</td></tr><tr><td>Generate random string</td><td>Depends</td><td>Mostly calculated server-side, but sometimes client-side</td></tr><tr><td>Calculate sumproduct</td><td>Client-side</td><td>Calculation is done client-side</td></tr><tr><td>Website home URL</td><td>Client-side</td><td>URL is processed client-side</td></tr><tr><td>This URL</td><td>Client-side</td><td>URL is processed client-side</td></tr><tr><td>Current language</td><td>Client-side</td><td>Language setting is managed client-side</td></tr></tbody></table>

#### Operators and comparisons

Operators and comparisons follow the general rule of being performed server-side if one or more of the data sources are performed server-side. Because Bubble will attempt to finish the query in one process, without having to divide it between the server and client, the operators and comparisons will be context-dependent.

For example, if you are working with a search, such as the expression Do a search for Users:count the count operator will be performed on the server, and only the number of users (as opposed to the list of users) will be sent back to the client.

On the other hand, if you have already loaded a list of users into a repeating group, and reference this group using an expression like Repeating Group User’s List of users:count, the counting will be performed on the client, to save Bubble from having to transmit any data to the server.

The same is true for comparisons. Comparisons are used to compare two two compatible values, such as checking if a number is smaller, the same as or bigger than another number. The two numbers in this case would be the data sources, and whether this happens on the server depends on whether at least one of the data sources needs to communicate with the server

### Searches and filtering

Many dynamic expressions involve database searches, often initiated with the “Do a search for” data source. Typically, these requests are processed entirely on the server.

To determine which parts of the process occur on the server and which might take place on the client, ask whether the data has already been downloaded. In essence, if the data is not yet downloaded, the operation will occur on the server. If it has been downloaded, further filtering or processing can occur on the client.

This applies not only to when you reference the result of an already-completed search (e.g. Repeating Group User’s List of Users), but also when you repeat two identical Do a search for data sources in different expressions on the same page.

#### Filters

In Bubble, lists can be further refined using the :filtered operator. This operator works similarly to constraints: Bubble processes the list by eliminating entries that don’t match the provided criteria. The final results are the records that remain after this filtering process.

Dynamic expressions in Bubble process from left to right, so the :filtered operator applies its elimination after the initial search is completed. This means it filters the results after the search has applied any regular constraints.

However, this doesn’t automatically move the process to the client. Bubble will try to complete the entire request on the server whenever possible, within a single request, which doesn’t add additional WU cost to the base search.

However, filters added to an already-completed request will, in most cases, be performed on the client. For example, if you have a repeating group of users and want to further filter the list by a field like age (using an expression like Repeating Group User’s List of Users:filtered), this filtering will be done instantly on the client side, with no WU cost.

#### Per-row filtering (advanced filters)

As we explored earlier, searches generally use one or more constraints to eliminate records that don’t match, returning the remaining list.

However, there are scenarios where this simple process of elimination isn’t enough, and some dynamic data needs to be calculated for each record for the search to complete. This essentially adds an examination process for every row in the database, potentially multiplying the search effort many times over.
