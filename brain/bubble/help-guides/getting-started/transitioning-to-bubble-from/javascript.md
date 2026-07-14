# JavaScript
> Source: https://manual.bubble.io/help-guides/getting-started/transitioning-to-bubble-from/javascript · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

For those accustomed to working with JavaScript, transitioning to Bubble will in many ways feel similar. This article will explore the transition from JavaScript to Bubble specifically, but since several programming languages like Python, Ruby, and PHP share many commonalities with JavaScript, you may find it useful if you come from a different language as well.

Before diving into the specifics, it's helpful to understand Bubble's philosophy: it is designed to empower anyone to build and launch fully functional web applications without writing any code. This is important when transitioning from a traditional coding background like JavaScript, as it highlights a crucial aspect of the platform: while Bubble is often called a no-code platform, its core feature set extends far beyond the absence of written code. Bubble offers a way to create designs and workflows using a graphical interface, but it also hosts your app’s database, manages CSS-like styles, provides its own client-side and server-side workflow engine, supports a robust inbound and outbound API system, and includes comprehensive tools for user authentication, data privacy, and app deployment.

Bubble strives to provide an all-in-one visual platform; essentially, the less users have to worry about the intricacies of the underlying hosting infrastructure, the more they can focus on building their applications.

For seasoned JavaScript developers, Bubble’s holistic approach can initially feel different. JavaScript development traditionally involves hands-on control over every aspect of the application stack—from writing and optimizing code to managing servers and configuring build tools. Bubble abstracts much of this complexity away, packaging these capabilities into an integrated visual interface. While this may require an adjustment, it ultimately frees developers from the tedium of manual coding and server management. This shift allows them to focus more on creativity and user experience, and it opens up app creation to a whole new group of non-technical but creative individuals.

For developers transitioning from JavaScript to Bubble, it’s interesting to know that Bubble itself is built on top of JavaScript. This foundation means that while you don't need to write JavaScript code directly, the principles and logic that drive your applications in Bubble are rooted in the same technology. In other words, transitioning to Bubble may require some mental adjustments, but having a traditional coding background can give you an advantage in no-code development as well. Bubble also supports extending your app with custom JavaScript code.

First, let's examine the differences in terminology between the two platforms, before delving into their distinct approaches to app development.

## Terminology

Direct comparisons between terms used in JavaScript and those in Bubble can be of limited use, as each term doesn't always have a direct counterpart. In this section, we’ll instead look at some well-known terms used in JavaScript, and then different concepts in Bubble that can serve a similar meaning or purpose when you develop.

### Event listener

An event listener in JavaScript is a function that waits for a specific event to occur on a specified element. When the event occurs, the event listener executes a block of code. This mechanism allows developers to create interactive web applications by responding to user actions such as clicks, key presses, or form submissions.

In Bubble, this is handled by workflow[^1] [*events*](#user-content-fn-2)[^2]. When an event occurs, such as a button click, page load, or data change, it initiates a series of actions defined in the workflow.

<figure><img src="/files/Y84VHKPbxoBjYWoZjhLg" alt="" width="375"><figcaption><p>In Bubble, you build workflows by combining an event (1) and one or more actions (2).</p></figcaption></figure>

It’s worth noting that the two terms are not exactly the same: events in Bubble encompass a broader range of triggers, not just those related to elements. For example, a button or icon being clicked is considered an event, but you can also set up events that react to changes in the database or other non-element interactions.

### Function

A function is a block of code designed to perform a specific task. Functions take inputs (arguments or parameters), process them through a series of statements, and then return an output. They are fundamental building blocks for creating reusable, modular code. Functions help manage complexity by breaking down tasks into smaller, manageable parts.

<figure><img src="/files/9rezIdyep42wH5JxUYCH" alt="" width="563"><figcaption><p>In Bubble, a <em>workflow</em> consists of an <em>event</em> and one or more <em>actions.</em></p></figcaption></figure>

In Bubble, workflows are the equivalent of functions but are designed to be more accessible through the visual interface. A workflow[^1] in Bubble is a sequence of steps triggered by an event[^2], such as a button click, page load, or data change. Each step in the workflow performs an action[^3], such as modifying data, [navigating to a page](#user-content-fn-4)[^4], or displaying an alert - some actions could themselves be viewed as the equivalent of smaller, simpler functions. You can read more about workflows and its components in the article series below.

Article series: [Workflows](/help-guides/logic/workflows)

### Variable

In this context, we mean data that is stored temporarily for some purpose. Bubble doesn’t use the term “variable” directly but offers different ways to store data during a user’s session, as opposed to storing it permanently in the database.

#### Custom states

Custom states in Bubble function as temporary storage fields that you can add to any element on the page through the Bubble editor. They can hold built-in field types such as text, number, and date, as well as custom data types created in the database or data from external sources like APIs or plugins. These states can store a single item or a list (array).

Custom states are created visually in the Bubble editor and can be used in workflows and as data sources. They can be pre-populated with static data like text or numbers, but otherwise need to be populated using the [*Set state of an element*](#user-content-fn-5)[^5] action. While they are not inherently dynamic, they rely on workflows for their population and modification.

Custom states are useful to hold information throughout a single page session. If the user closes the tab or navigates to another page, the information is lost.

You can read more about custom states in the article below.

Article: [Custom states](/help-guides/data/temporary-data/custom-states)

#### Container element data sources

Container elements such as groups and repeating groups can hold dynamic data in their respective data source field. This can be referenced from other dynamic expression using the element as a data source, such as `Group Task's task`, Group Text's text or `Repeating Group Tasks's List of Tasks`.

Note that if you are using these elements exclusively to store variables (as opposed to displaying something on the page), you may want to look into using [reusable element custom properties](#reusable-element-custom-properties), as they offer more flexibility.

#### Reusable element custom properties

[Reusable elements](#user-content-fn-6)[^6] in Bubble, similar to components in React or Vue, allow you to set up custom properties that can hold any type of data you specify, including single records or lists. Unlike custom states, these custom properties can hold dynamic data specified with a dynamic expression and do not require workflows to update. Custom properties are particularly useful in scenarios where data storage is not necessarily based on user action. For example, by pre-populating a reusable element's custom property with a dynamic expression, the data is instantly available on page load, rather than needing to be set using an action.

It also means the data is not static. Populating a custom state with a database search would retain the list as it was at the time of the search. In contrast, a custom property updates dynamically, reflecting any changes made in the database. This ensures that the data displayed in the reusable element is always current.

You can read more about reusable elements and custom properties in the article below:\
\
Article: [Reusable elements](/help-guides/design/elements/reusable-elements)

#### Result of step X

A workflow[^1] in Bubble is a collection of an event[^2] and one or more actions[^3], akin to how a [function](#function) in programming is a block of code designed to perform a specific task, consisting of a sequence of statements that execute in order when the function is called.

Workflows, like functions, sometimes need to temporarily store data for later use. In JavaScript, you might store data in variables to use in subsequent steps of the function. In contrast, Bubble automatically manages the creation and storage of data produced by one action, allowing it to be used in subsequent actions within the same workflow.

For example, if you use the [*Create a new thing*](#user-content-fn-7)[^7] action to create a new thing (database record) in step 1 of a workflow, you can use the [*Result of step 1*](#user-content-fn-8)[^8] [data source](#user-content-fn-9)[^9] in subsequent steps to refer to the thing that was created.

### Object

Objects are structures used to store collections of data and more complex entities. An object is a collection of properties, where each property is defined as a key-value pair. Objects can contain various types of data, including strings, numbers, arrays, functions, and even other objects.

Data within the Bubble platform is stored in its internal structure. Technically, being built on JavaScript, Bubble uses objects, but they are not available to developers in the same way as in JavaScript. Instead, Bubble structures data in ways that are more accessible to non-technical users.

This is done in a few different ways:

#### Things

A thing represents an individual record in the Bubble database and is used to store structured data. Each thing belongs to a *data type*, which is akin to a class in object-oriented programming. Data types define the structure of the thing by specifying the fields (properties) it can contain. Data types are created using Bubble's visual editor, and the database can then be populated with things using workflows[^1].

* **Data types:** Data types in Bubble define the structure and fields for things, comparable to classes or schemas in programming. For example, a job board app could have the data types Position and Company.
* **Fields:** Similar to object properties, a thing can have fields that store a preset type of data. The field is set up on the data type. For example, a Company data type could have the fields Name and Address.
* **Relationships:** Relationships between data types can be set up visually, directly in the data type’s fields (see our dedicated article on SQL for more info on how Bubble joins tables). For example, in a job board app, the Position data type could be linked to the Company data type.

The article series below covers in detail how the Bubble database is set up:

Article series: [The Database](/help-guides/data/the-database)

#### Option sets

Option sets in Bubble are used to manage static, predefined lists of values. They are particularly useful for storing data that does not change frequently, such as categories, statuses, or colors. Option sets provide a more structured and efficient way to handle enumerations compared to creating separate data types and records for such fixed lists.

Option sets are similar to enums in traditional programming languages. Each option set contains a list of options (values) that can be referenced throughout your application. For example, you might have an option set called “Task Status” with options like *To Do*, *In Progress*, and *Completed*.

Article: [Option sets](/help-guides/data/static-data/option-sets)

#### JSON

Bubble supports the JSON[^10] format for sharing data with external applications and integrating with other web services. This capability means that Bubble can both convert its existing data into JSON format and accept incoming data from other systems in the same format. By using JSON, Bubble facilitates seamless data exchange, making it easier to connect your application with third-party APIs, perform data imports and exports, and build integrated solutions that interact smoothly with a variety of external services.

Bubble also provides a few different ways to store temporary data (variables), that you can read more about in the [Variables](#variable) section.

### Modules/packages

A module is a single file that contains functions, classes, or variables, while a package is a collection of modules organized in a directory hierarchy. They facilitate code reuse, maintainability, and namespace management, allowing developers to break down large applications into manageable pieces and share reusable components across projects.

Modules/packages don't have a direct counterpart in Bubble, but can be implemented in a few different ways.

#### Plugins

Plugins[^11] are add-ons that extend the functionality of your app. They can provide new elements, actions, and data sources that integrate seamlessly into the Bubble editor. They can be created to add new features, connect to external APIs, or integrate with third-party services. The Bubble plugin marketplace offers a variety of plugins developed by the Bubble community and Bubble itself. Some plugins are free, while others are offered with a one-time price or subscription.

#### Custom JavaScript code

Bubble also offers several ways to implement custom JavaScript to extend its functionality. This is particularly useful for adding custom features that extend beyond Bubble's core functionality or integrating with external JavaScript libraries. You can write custom JavaScript in Bubble using the [HTML element](#user-content-fn-12)[^12] or by creating custom plugins. This capability enables the import and use of JavaScript modules or packages directly within a Bubble application.

## Other concepts in JavaScript and Bubble

### Building user interfaces

In a JavaScript-based app or website, building a user interface typically involves writing HTML, CSS, and JavaScript code. Frameworks like React or Vue.js can streamline this process, but you still need to understand how to structure components, manage state, and handle events manually. For example, displaying a user’s name might involve creating a React component, managing state with useState, and using an API call to fetch the user data.

Bubble simplifies UI creation through its visual editor. You can drag and drop elements[^13] onto the page, adjust their properties[^14], set conditions[^15] and define workflows[^1] that dictate how elements behave. To display a user’s name, you simply place a text element and bind it to the user’s name field from the database, using Bubble’s dynamic expression editor.

<figure><img src="/files/tZXQnPl5VhNyFlt3xNwl" alt=""><figcaption><p>Using dynamic expression, you can easily load and display data from the database. The expression above will simply show the text saved in the <em>Name</em> field of the currently logged in users.</p></figcaption></figure>

Bubble handles the data fetching and updating automatically, by establishing a [WebSocket connection](#user-content-fn-16)[^16] to keep dynamic database data on the page updated in real-time. When a change occurs in the database, Bubble pushes updates through this WebSocket connection to all relevant pages. This ensures that any data displayed on the page is automatically refreshed without requiring a second manual query or a page refresh.

{% hint style="info" %}
If you have experience working with HTML and CSS, we also have an article that explains how you approach designing, styling and assigning responsive behavior to pages and elements in Bubble:

Article: [Transitioning from HTML/CSS to Bubble](/help-guides/getting-started/transitioning-to-bubble-from/html-and-css)
{% endhint %}

### Data management

Managing data in JavaScript often involves setting up and interacting with [RESTful APIs](#user-content-fn-17)[^17] or GraphQL. You write functions to make HTTP requests, handle responses, and update the UI based on the retrieved data. This process requires knowledge of asynchronous programming, promises, and possibly state management libraries like Redux.

Bubble provides a built-in database and data management system. Data operations like creating, reading, updating, and deleting records (CRUD) are handled through Bubble's workflows[^1] or auto-binding[^18]. For instance, saving a form input involves creating a workflow that saves the input data to a specified data type.

{% hint style="info" %}
If you have experience working with SQL, we also have an article that explains the differences between traditional SQL development and Bubble’s approach to data management.

Article: [Transitioning from SQL to Bubble](/help-guides/getting-started/transitioning-to-bubble-from/sql)
{% endhint %}

### Event handling and interactivity

Event handling in JavaScript involves writing functions that respond to user actions such as clicks, form submissions, or page loads. You attach these functions to DOM elements using event listeners, and keep track of a sometimes growing number of events and dependencies that can become fairly complex.

In Bubble, event handling is managed through workflows[^1]. You visually design workflows that trigger in response to user actions. For example, when a button is clicked, you can set a workflow to display a message, navigate to a different page, or update a database record.

### Data security

Ensuring data security in a JavaScript application involves setting up authentication and authorization mechanisms, often using libraries like Passport.js or Firebase. You write code to protect routes, manage user sessions, and validate user inputs. Implementing robust security measures requires a solid understanding of web security principles.

Bubble simplifies data security with [privacy rules](#user-content-fn-19)[^19] and [built-in authentication systems](#user-content-fn-20)[^20]. Privacy rules allow you to define who can view, modify, or interact with specific data types based on conditions built with Bubble’s dynamic expression editor. Bubble also provides built-in user management features, including login, sign-up, and password reset functionalities.

#### Performance optimization

Performance optimization in JavaScript involves techniques such as lazy loading, code splitting, and minimizing DOM manipulations. Developers must identify performance bottlenecks and apply appropriate solutions, which can be complex and time-consuming.

Bubble, on the other hand, handles many performance optimizations behind the scenes. While you can influence performance through efficient design and limiting the amount of data loaded at once, Bubble’s platform manages server-side optimizations, caching, and database indexing automatically.

Additionally, Bubble abstracts the numerous server metrics typically managed in traditional app hosting into a single metric called workload[^21]. Using Bubble’s built-in tools, you can gain both a holistic and detailed view of the processes that consume the most server resources. This allows you to effectively optimize performance and scalability, without needing to delve into the complexities of server management.

[^1]: A *workflow* is the combination of an *event* that triggers one or more *actions*.

    Article series: [Workflows](/help-guides/logic/workflows)

[^2]: An *event* is the part of a workflow that triggers it. This leads to one or more actions running.

    Article series: [Workflows](/help-guides/logic/workflows)

    Article series: [Events](/help-guides/logic/workflows/events)

[^3]: An *action* is the part of a workflow that performs a task. A workflow consists of an event (trigger) and one or more actions.

    Article series: [Workflows](/help-guides/logic/workflows)

[^4]: You can read more about different types of page navigation in the article series below.

    Article series: [Navigation](/help-guides/logic/navigation)

[^5]: *Set state of an element* is an action that save a piece of data in a custom state on a selected element.

    Reference: [Set state of an element](/core-resources/actions/element#set-state-of-an-element)

[^6]: *Reusable elements* are a collection of elements, actions and customizable properties that can be re-used across your app. They are commonly used for headers and footers, for example.

    Article: [Reusable elements](/help-guides/design/elements/reusable-elements)

[^7]: *Create a new thing* is an action that creates a new thing (database record) and optionally populates it with data.

    Reference: [Create a new thing](/core-resources/actions/data-things#create-a-new-thing)

    Article series: [The database](/help-guides/data/the-database)

[^8]: *Result of step X* is a data source available only in workflows, that fetches the data returned by a previous action in the same workflow.

[^9]: A *data source* is the part of a dynamic expression that fetches data from a given source, such as the database, the current user, the current date/time or an external API.

    Reference: [Data sources](/core-resources/data/data-sources)

[^10]: JSON, which stands for JavaScript Object Notation, is a lightweight data-interchange format. It is easy for humans to read and write, and easy for machines to parse and generate.

    JSON is used primarily to transmit data between a server and web application.

[^11]: Article: [Plugins](/help-guides/integrations/using-plugins)\
    Page: [Bubble plugins](https://bubble.io/plugins)\
    \
    Article series: [Building plugins](/account-and-marketplace/building-plugins)

[^12]: The HTML element allows you to directly embed an element on the page, where you can write or paste HTML, CSS, or JavaScript code.

    Reference: [HTML element](/help-guides/design/elements/web-app/visual-elements#html)

[^13]: Elements are the "building blocks" that make up your page, such as text, images, icons and buttons.

    Article series: [Elements](/help-guides/design/elements)

[^14]: The properties of an element define its attributes, such as size, colors, responsive behavior, data source, and more.

[^15]: Element *conditions* are rules that dynamically change an element’s properties based on the yes/no result returned by a dynamic expression.

    Article: [Conditions](/help-guides/logic/conditions)

[^16]: A *WebSocket* is a communication protocol that provides a real-time, bidirectional connection between the user’s browser and the server, enabling instant data updates without needing to refresh the page.

[^17]: A RESTful API is a set of web services that operate over HTTP to access and use data. It follows REST principles, using standard HTTP verbs like GET, POST, PUT, and DELETE for operations.

[^18]: Auto-binding is a feature in Bubble that allows you to configure input forms, like text inputs, to automatically update and save their values to a specific data type and field in the database as soon as they are modified.

[^19]: *Privacy rules* are settings that restrict access to data based on specific conditions, as specified in dynamic expressions.

    This ensures that sensitive information is only visible to authorized users.

[^20]: Bubble features a built-in system to handle user authentication such as creating accounts, logging in, staying logged in and resetting passwords.

    Article series: [User accounts](/help-guides/data/user-accounts)

[^21]: *Workload* is a metric that aggregates all the work the server has to do to power your app over a given time period.

    Article series: [Workload](/help-guides/workload)
