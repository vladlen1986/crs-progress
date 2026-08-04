# Building your first app
> Source: https://manual.bubble.io/help-guides/getting-started/building-your-first-app · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

Starting your journey in app development can feel like learning a new language, especially with the intricate jargon and technical terminologies used in traditional programming. Bubble uses intuitive and self-explanatory terminology like *things*, *workflows*, and *conditions*, to remove the barriers of complex coding languages, allowing you to focus on bringing your ideas to life.

In this article series we'll explore the strategy for building your first app, and cover the basic Bubble concepts to get you up to speed quickly.

## What does it mean to build an app?

If you are new to app development, it may not be entirely clear what exactly it entails to build an app. That's not strange at all – after all, in traditional programming, an app is built by a *team* of people where each member specializes in one key discipline such as design, coding and database management. Bubble, on the other hand, is built to make you able to do that all on your own.

That doesn't mean that you *can't* work with a team – you most certainly can – but it means that our tools are designed so that you don't have to. Bubble provides the flexibility and resources for both solo developers and teams to bring their app visions to life.

Most apps are about collecting information, and then manipulating and presenting it in a way that's solves problems for its users. While apps can seem extremely different on the outside, they are mostly all the same thing: a useful design on top of a database.

* A **social network** collects data about users (name, profile pic, age, interests, posts) and then loads that from the database to show it to other users. A *like* on Facebook or X may *feel* social, but it's all simply data that's presented in a social way.
* A **CRM** collects data about clients, vendors and contacts, and then lets its users pull that data up whenever needed. Maybe it also crunches some data into statistics.
* A **food ordering app** collects data about restaurants, menu items, drivers, customers and orders and uses that data to automate the ordering process.

You get the point – while these are all very different categories, they are in essence doing the same thing: at the bottom is a database that users fill up with data, and on top of that is a design that makes the data useful. Many apps simply take real-life things we were already doing, like talking about our interests and ordering food, and automates them.

So, to build an app, you need to:

* Set up your **database** to store information
* Design a **user interface** that intuitively directs users to add, modify, delete, view, and analyze data effectively
* Link your design to **workflows**, ensuring that the app responds to user interaction

Most applications are built in an incremental way: they are designed to solve a simple problem (like remembering a list of clients), and then its developer progressively new helpful features are added.

## Core terminology

As you embark on your app-building journey, you'll come across some specific terms that will become the building blocks of your Bubble experience. Knowing the terms and phrases that are frequently used will also help you communicate with other Bubble users in the [forum](https://forum.bubble.io/).

{% hint style="info" %}
For a more complete list of Bubble terminonology, you can also check out our glossary.

Article: [Glossary](/the-glossary)
{% endhint %}

Let's demystify these terms to ensure you have a smooth start. In each of the expandable boxes below, we'll explore one facet of app building and go over the terminology used in each one.

<details>

<summary><mark style="color:blue;">Design:</mark> how your app looks</summary>

We'll start by exploring **elements**. This is any visual item or component you'll place on your Bubble page. Think buttons, texts, inputs, and so on. It's what makes up your app's interface your app's interface.

Elements can have **styles** associated. This lets you set up design attributes (color, border, shadow, font, etc) in one place and apply it to multiple elements.

Bubble comes with a lot of built-in elements, but you can also add new types of elements with [plugins](#plugins-enhancing-bubbles-capabilites).

**Learn more:**

* Article series: [Design](/help-guides/design)
* Article: [Design and UX resources](/help-guides/getting-started/building-your-first-app/design-and-ux)
* Page: [Bubble plugins](https://bubble.io/plugins)

</details>

<details>

<summary><mark style="color:blue;">Workflows:</mark> making your app do stuff</summary>

As you design, you'll be introducing interactions. Here's where **Workflow** comes into play. Imagine you want something to happen when a button is clicked - that's a workflow. It's a sequence of automated steps or actions initiated by an **event**.

The event is the specific trigger for your workflow. A button being clicked, a dropdown being changed, or even a page loading can all be events that kickstart a workflow.

Each step in a workflow is known as an **action**. Actions can make changes in the database, navigate to another page, hide/show something on the page and a wide range of other things.

**Learn more:**

* Article series: [Workflows](/help-guides/logic/workflows)

</details>

<details>

<summary><mark style="color:blue;">Conditions:</mark> if this, then that</summary>

Often, you'll want actions to happen only under certain circumstances. Enter **conditions**. This is the "if this, then that" of Bubble. Conditions dictate when specific actions or visual changes should take place based on criteria you set. For example, clicking a button takes you to another page, but *only* if the current user is logged in.

Conditions can also be placed on elements to control their appearance. For example, a button is only visible if the current user is logged in.

Conditions are built using **dynamic expressions**. Dynamic expressions are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.

**Learn more:**

* Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)
* Article: [Conditions](/help-guides/logic/conditions)

</details>

<details>

<summary><mark style="color:blue;">The database:</mark> managing data</summary>

As you populate your app with data, you'll be dealing with **Things**. A 'Thing' is just an individual piece of data in Bubble. Think of it as an entry or record in the database, such as a specific user.

Each Thing belongs to a **Data Type**, which is like its category or table. For instance, if you're building a blogging app, *Blog Post* could be a data type. If you're building a task management app, both *Task* and *Project* can be data types.

Within these data types, there are **Fields**, which are attributes or properties. Using the Blog Post example, *Title* and *Content* could be fields.

To protect your data, you use **privacy rules** to define who can access or modify what data. It's your one-stop control center for data protection.

**Learn more:**

* Article series: [The database](/help-guides/data/the-database)
* Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

</details>

<details>

<summary><mark style="color:blue;">Previewing:</mark> testing your app before users get access</summary>

Bubble gives you two distinct environments: Test and Live

**Test environment**: This is your sandbox, a safe space where you can experiment, iterate, and make changes without affecting your actual users. Any data you use or create here won't touch the live environment. It's an ideal place for debugging and trying new features.

**Live environment**: This is the real deal. The data here is what your actual users will interact with. Once you're satisfied with the changes in your test environment, you can **deploy** them to the live environment, ensuring that your users always experience a polished and tested version of your app.

Each environment has its own separate database. This distinction ensures that your test experiments won't accidentally overwrite or corrupt the real user data you've gathered.

If you need more advanced branching capabilities to work on features in isolation, you can also use our version control feature.

**Learn more:**

* Article series: [Version control](/help-guides/maintaining-an-application/version-control)

</details>

<details>

<summary><mark style="color:blue;">Reusable elements:</mark> avoid repeating work</summary>

As you build, you might create a component that you want to use repeatedly. That's a **Reusable Element**. It could be a navigation bar, footer, or any component you don't want to rebuild from scratch every time.

**Learn more:**

* Article: [Reusable elements](/help-guides/design/elements/web-app/reusable-elements)

</details>

<details>

<summary><mark style="color:blue;">Plugins:</mark> enhancing Bubble's capabilities</summary>

Now, there will be instances when you want to enhance Bubble's capabilities. That's where **Plugins** come in. They're like add-ons, enhancing functionality or allowing integrations.

There is a collection of Bubble-built plugins, and a plugin store with thousands of user-created plugins.

* Article: [Plugins](/help-guides/integrations/using-plugins)
* Page: [Bubble plugins](https://bubble.io/plugins)

</details>

<details>

<summary><mark style="color:blue;">API:</mark> connecting your app to other apps</summary>

You'll likely come across the term **API**, an acronym for Application Programming Interface. Think of it as a language that allows your app to communicate and exchange information with other applications. This capability unlocks a treasure trove of possibilities: from integrating real-time weather updates, baseball stats, and demographic information, to scheduling events in a user's Google Calendar or posting updates on Twitter.

Bubble comes with three different API tools:

* The **Bubble API** comes with two tools for handling *inbound* API calls:
  * The **Data API** lets you invite other apps to read and write in your app's database
  * The **Workflow API** lets you invite other apps to run workflows in your app
* The **API Connector** is a plugin that lets you connect to external apps and services to make *outbound* calls

**Learn more:**

* Article series: [API](/help-guides/integrations/api)
  * Article series: [The Bubble API](/help-guides/integrations/api/the-bubble-api)
  * Article series: [The API Connector](/help-guides/integrations/api/the-api-connector)
* Article: [Bubble API terminology](/help-guides/integrations/api/the-bubble-api/bubble-api-terminology)

</details>

That's our whirlwind introduction to Bubble's core terminology! If it feels like a lot to take in at once, don't worry: as you start building, these terms will become second nature. They are consistently used around the editor to familiarize you with them as you go through your learning journey.

## Planning your first app

Many users who try out Bubble for the first time already have an idea of what they want to build. If you have never built an app before, the process of planning it out might seem daunting, but Bubble's intuitive design and workflow mechanisms are designed to guide beginners through the creation process seamlessly.

Starting with a clear vision is essential. Break down your idea into core functionalities and the interactions you expect users to have with your app. Sketching out a basic wireframe on paper or using a digital tool can help you visualize the layout and user journey. Even if it's just rough boxes and arrows, it'll give you a roadmap to follow.

Remember, the key to a successful app isn't just in its functionality, but also in its user experience. Consider the end-user at every stage of development.

In the next section, we'll have a look at how you can go about deciding what [features to include in your app](/help-guides/getting-started/building-your-first-app/planning-features).

## Other ways to learn

<details>

<summary>Video lessons</summary>

The playlist below gives an introduction to how Bubble works and how to build your first app:

* Playlist: [Build your first Bubble app](https://www.youtube.com/watch?v=SHbY8eoe8Gw\&list=PLoNVJrdvQQYlT3e3qur1LDgP8Rcs9msAm\&pp=iAQB)

</details>
