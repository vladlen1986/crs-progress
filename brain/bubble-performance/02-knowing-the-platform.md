<!-- source: The Ultimate Guide to Bubble Performance (Petter Amlie), Revision 3 — physical PDF pages 35-68 -->
<!-- Knowing the platform: Bubble plans, DB internals, indexing, page-load sequence -->

# Knowing the platform

Getting to know Bubble, and determining whether it’s right for your project

### The research phase

Bubble is a fantastic tool. A game-changer. It may just end up powering a large portion of the web in the years to come.

You know another tool that’s great? A hammer. But I wouldn’t use a hammer to eat spaghetti, and I wouldn’t use a fork to hammer in a nail. And none of them will help me build the next Facebook.

Researching what tools to use may end up being your project’s most important decision, and you’re probably gonna make thousands of those in the coming months. So the first thing we're going to look at is how to determine whether Bubble is the right tool for your project.

The tool for your project CanIscalewithBubble?is a typical question I get. The question makes perfect sense, and no sense at all. What does your app do? If your app handles purely client-side actions, you can handle hundreds of millions of users. It’s also very easy to set up an app that cannot even handle the one user it has, by having that user start some impossibly complex workflows. So where does your app fall on the scale?

Luckily, you have a fantastic resource available: the no-code community. And if you’re polite and describe your question well, you’ll get the most amazingly detailed and thought out responses.

So get the question right.

Whether Bubble is “good” or not has been asked countless times online. And the worst part isn’t that you won’t get a response. The worst part is that you will.People will tell you that it’s great. They’ll tell you that it sucks. They’ll tell you that their production app has been running smoothly for five years. They’ll tell you that their app couldn’t even handle five users before slowing down, and Bubble is hopeless. They’ll tell you that Customer Service is amazing, and they’ll tell you that it’s a fraud. Any answer to a vague question you ask is likely to simply reflect the current emotional state of the respondent as they are succeeding or struggling in their own project.

What you need to ask is not whether Bubble is a good tool. What you need to ask is if it is the right tool for yourproject.

Asking the right questions Describe your app and what you want it to do. Take a look at the examples below. These are both apps that could be built on Bubble, but they are very different projects and can trigger equally different responses when you ask experienced users for advice.

By describing your app with this level of detail, you’ll be able to shed light on important strengths and weaknesses before you start developing,

My app needs My app needs To serve about 5000 clients per day Two-way 4k video streaming Shopping cart Push notifications Efficient product search Screen recording on mobile Great SEO performance Send and play audio snippets Work with Google Data Studio Chat

Look at it this way: there’s nothing worse than working on a project for two months, only to discover that the platform you’re using doesn’t support a key feature you need.

As we’ve already seen, performance and capacity can mean very different things to different projects: try to highlight what kind of performance you are actually looking for. Loading a page quickly and making changes on thousands of database entries are not the same thing. Scaling means nothing if we don’t know exactly what you’re scaling: number of users? Number of workflows? Number of products?

Put your questions out there – on the forum, on Twitter, in Slack channels. You’ll be amazed at how much you can learn in a few hours. I guarantee the time is worth the investment.

### Understanding Bubble’s capacity dilemma

Bubble is a walled garden. You can use it for whatever creative endeavor you want, but you can never leave, and you can’t change how Bubble performs its actions. While you celebrate new Bubble features, some of the most important work they do is going on under the hood, making sure that hundreds of thousands of applications have 99,9% uptime, stable performance and industry standard security. Now, while this deserves applause in itself, when you’re launching your new SaaS MVP on ProductHunt, you don’t really care about handing out gold medals – you care that it works. But bear with me, because understanding the thought process that led to Bubble becoming what it is, is helpful when you make your own decisions in app design.

To make a long story short, when it comes to capacity, Bubble is focused on two things:

●Making sure that one app can’t mess up the capacity of everyone else’s app ●Making sure that users don’t mess up their own apps

No matter what kind of hardware beast you have for a server, running it into the ground is very easy. Create a workflow. Loop it with no delay and no end. Watch the server crash and burn. Educated, experienced developers sometimes do this by mistake. Inexperienced, technically uneducated Bubble developers, left to their own devices, would crash every Bubble server before lunch.

So what do Bubble do? They place a lot of safeguards that stop this from happening. If you’ve been Bubbling for a while, you’ll know that Bubble chooses stability over functionality any day, and then slowly lifts restrictions over time as they have proved to work stably. Recursive workflows (which is just a fancy term for loop) was blocked until 2019, even though it’s a cornerstone of programming, because there was a risk that any of the thousands of workflows created every day would run amok and max out everyone’s capacity. User’s trust in the platform is a fragile thing, and frequent downtime would rightly scare users away: so Bubble stays on the safe side.

Flexibility comes at the cost of Bubble sometimes needing to protect users from themselves. On dedicated servers, the restrictions are less strict, but I can tell from experience that sending a dedicated server to 100% cpu usage is something you can easily do with a simple typo. The opening up of running workflows without delay doesn’t mean that you can run them without delay: just that Bubble won’t stop you from trying.

So, as you can see, Bubble makes a lot of decisions for you, and you don’t have a say in that process. For good reason, when we bring hundreds of thousands of apps into the mix. One of the downsides of a closed system is that when you reach its limitations, there’s not much you can do to expand them. What you see is what you get.

Still, for a visual programming system, Bubble is mindboggingly flexible, and there are plenty of things you can do both to mess up and optimize your app for performance.

A jack of all trades Another point worth bringing up is that Bubble is a system that allows you to create almost any kind of database-driven web application. This kind of flexibility means that the platform has to be great at a lot of things - not just one. Algolia is great at fast indexing and searching. Parabola is great at making sense of complex data. Looker is great for aggregating analytics. Zapier is awesome for visualizing automations between different online services. They’re all better at the slim field in which they operate - but Bubble can do most of the things that they can and lots more.

Flexibility comes at a cost that’s two-fold: 1) you can’t expect Bubble to be the best available platform for every thinkable feature out of the box, and 2) even if Bubble is easy to use, creating efficient apps takes experience and creative thinking, just like any other programming language.

Bubble’s history of performance At the time of writing this, I’ve been Bubbling full time for five years, and I can tell you: there have not been many a-ha moments where Bubble’s performance suddenly increased noticeably from one day to the next. But boy, is the platform a lot faster than it was five years ago. The first app I ever built was a mobile e-commerce platform. From a performance perspective, my work was horrible of course, but Bubble’s performance in general at the time was painful. Simple database changes could take several seconds to complete. Making changes on a list would freeze the system for ten seconds.

Whenever I demoed something, I prayed to higher powers to not bring up the top loading bar of death. Several times per day, the app didn’t load at all and I frantically messaged Bubble’s support channels while wiping the sweat from my forehead in an investor meeting.

Over time, slowly and gradually, it has improved a great deal. Many of the changes are precisely things that this guide teaches: Bubble now seems to render changes to the screen before the database processing is actually finished, for example. You can see this whenever you use the Makechangesonalist action: the results seem instant and users are happy: they changed the visiblelayer while the layer underneath may just be the same.

It won’t stop there of course - Bubble will keep improving the performance of their core features, and hopefully, some of the advice given in this guide will over time become redundant. Other parts never will: Bubble’s flexibility gives you the opportunity to build the next big app - but also to set up an inefficient resource hog. It’s your job to learn how to avoid the latter.

Bubble official documentation and guides Bubble focuses on ease of use, because they want anyone to be able to build an app. It’s not hard to understand their perspective: the low learning curve and ease of entry

means more apps actually hit the market instead of getting stuck in a development quagmire.

The downside is that while the official documentation will help you set up an app that works, it doesn’t necessarily promote best practices for performance. Since most developers have learned Bubble studying the documentation and each other, methods that are not very well optimized are still used by a majority of users, including professional agencies. Several lessons in this book take a different or even contradictory approach to what Bubble’s documentation recommends.

That’s not to say Bubble’s approach is wrong and this book is right. Development is a game of compromises: deviating from Bubble’s documentation can have a great effect on your app’s performance and scalability, but sometimes it comes with the cost of extending development time or requiring maintenance.

### Bubble performance vs. device performance

An app can slow down for all sorts of reasons, and many of them are not actually related to Bubble. Remember the terms client-sideand server-side that we discussed earlier? Let’s bring some more detail into it.

The chart above shows our two columns of performance. We’ll focus on the left side for now, marked in blue. The points in this section are all factors that can slow down your app, but they are unrelated to Bubble as a platform: they would slow down your app no matter what system they were built with.

RAM usage Everything that you add to your application will be stored in the memory of the user’s device after it has been downloaded, and can start slowing things down if it grows too big. Bubble contributes a bit with the engine and other resources required to run a Bubble app, and everything after that is up to you. The table below shows an unscientific snapshot of the current RAM usage of a few different pages:

Page RAM usage in MB

Blank html file 1.3 Blank Bubble page Complex one-page Bubble app Facebook

As you can see, Bubble is not a particularly poor performer when it comes to memory usage. Continued use of a page (as you keep loading new lists and Things) will be added on top of the already spent RAM. As Facebook shows, adding lots of high-res photos puts a higher strain on the user’s device.

Adding to the total RAM spent will also add to the total CPU spent, as the user’s processor will have more data to work with when scrolling and navigating the page.

CPU usage Everything that is calculated client-side will use the CPU on your user’s device. The CPU is used to render the look of the page (including fancy stuff like drop shadows, transparency and animations) and to perform calculations to your data that are applied after the data has been received from the Bubble server.

This can be used to great effect to speed up your app, as we’ll explore later, but it can also slow it down substantially if you use it in the wrong way or fail to predict how your app will scale. You’ll also have to take into account that the user might be using a less powerful device than your own, such as an old computer or a cell phone/tablet.

Download size The download size is the total amount of data that has to be downloaded before and while your app is used. High-resolution images, fonts, illustrations, video and sound files will make your page load slower, increase the RAM and CPU usage and punish your SEO score.

### Bubble’s servers and Cloudflare

In October of 2019, Bubble introduced the new Cloudflare integration. You may already be familiar with the term Content Delivery Network, or CDN, and this provided a very welcome boost to the performance of Bubble apps globally. As we saw in an earlier chart, information has to travel repeatedly between the server and your device, and the distance between the two creates a delay. The purpose of a CDN is to intelligently and automatically spread information out on different servers across the globe, so that the distance between your device and the server is as short as possible. Great! So if I’m in Australia and need to load a Bubble page, the info will now come from a server close by?

Yes. But also no.

Your Bubble app in simplified terms depends on three things to function:

●Assets (files like the Bubble code base, images, fonts, css stylesheets, etc) ●The database (for retrieving and storing information) ●The Bubble engine (the engine that actually processes requests on the server)

Since the database and the Bubble engine always need to stay in sync, they can’t be spread out across different server locations. So while the CDN can speed up the fetching of files and other assets, it doesn’t shorten the distance between the device and Bubble’s actual database and engine.

Every time you interact with the database or send a workflow to Bubble, you are communicating with the Bubble server, and not the CDN.

## Bubble’s performance limitations

Now that we know there are a number of non-Bubble factors that can contribute to an app slowing down, let’s talk about what kind of limitations you mayrun into with Bubble.

What the issues below have in common is that they will be challenging in any platform you choose. But with Bubble, being a locked system, you may find yourself in a situation where you’re unable to make improvements in specific areas. The upside is that you don’t have to pay for performance improvements that Bubble invests in - the downside is that you don’t have a say in what those investments are.

Manipulating large data sets quickly Bubble is generally not optimized for rapidly manipulating data sets that exceed a thousand records. This doesn’t mean that a Bubble app can’t handle databases that are much larger than that, but if a main feature of your planned app is to frequently and quickly iterate on entries numbering in the thousands or more, you may find Bubble to be too slow. The best way to make changes on 1.000+ records is to use recursive workflows, and you’ll need to experiment to see how long a delay you need between each loop to keep the system from reaching its limits. Depending of course on the complexity of the workflow being performed, most workflows will need a second or

more in-between, quickly pushing operations on 1.000 records to take about 15 minutes to complete.

Working visually with long lists of records Using repeating groups to display a list of 50-100 things will work just fine in Bubble, but once you reach a few hundred entries displayed on the screen at once, you may start experiencing slowdowns (depending on the elements you have in your group of course). Apps like a Google spreadsheet are optimized for displaying potentially huge amounts of data on the screen at the same time, but trying to do the same with Bubble would have the browser struggling as the number of DOM elements would be too high.

Complex searches Searching for records in the database with simple criteria like Productname or Published=trueis quick and stable. More advanced searches are not always readily available without setting up a complex scheme of merging and intersecting multiple searches into one list. Not only does this force the server to perform multiple searches, but can also lead to moving parts of the processing client-side, slowing down searches with a lot of entries.

Server-side Javascript Bubble opened up for running Javascript server-side about a year back, and it was a welcome addition for both Bubble developers and plugin creators. Alas, so far, what

we’ve been seeing is that it can lead to delays stretching over several seconds for even minor calculations. This will likely improve over time.

Loading UX A specifically challenging thing about working with performance and UX in Bubble is that we have no clear way to tell when the page is really finished loading. Bubble can let us know when all the data is finished loading with the Pageloaded(entire) condition, but personally I find the labeling to be somewhat misleading, as the page is not necessarily finished rendering, even if Bubble has finished downloading the data.

This is obviously not an exhaustive list, but simply relevant points to bring up when discussing performance. In the end, what you need to do for your app is to ask the questions

●WhatdoImeanwhenIsayperformance? ●Isthatamainfeatureofmyapplication?

Only by defining clearly what kind of performance you are looking for and how important that is for your app can you determine whether Bubble will meet your criteria or not.

## How Bubble’s database works

Bubble’s database is built on SQL (Structured Query Language), which is a language widely used for managing data stored in a relational database. As many web standards, it has a longer history than many realize: databases were a thing long before the internet after all.

In the 1960’s, the first computer databases were being developed, and the structured storage and retrieval of data was considered a very important field at the time. After all, the world had gone through a second world war in which the power of computers had a major impact: Alan Turing and his team being able to decrypt German communication with a computer gave the Allies an advantage that turned out to shape world history. The war had cemented the US as the world’s major superpower and the cold war was on everyone’s mind: spies and their data were considered so important and cool, we’re still releasing James Bond movies 60 years later. All that intel they gathered needed to be saved and searchable somehow and information started to move from paper archives to databases.

Traditionally, the databases were built like hierarchies, where the database segments are bound together in a parent/child relationship where each parent record can have many children, but each child record can only have one parent, kind of like the folders on your computer . This is known as a one-to-manyrelationship.

This way of thinking changed in 1970 when Edgar Frank Codd, an English computer scientist at IBM, released his paper ARelationalModelofDataforLargeSharedDataBanks. Codd’s idea was to make databases more flexible by allowing many-to-many relationships.He flattened the traditional tree structure and instead suggested that records can be relatedto each other. Each record in the database has a unique identifier (a primarykey)that never changes, and by referencing that key elsewhere (at which point it’s called a foreignkey), we can give each record a relationship with one or more other records, without any hierarchy needed. In Bubble the UniqueID field is a record’s primary key.

In some ways, Bubble has taken the relational database model one step further by removing the need to understand primary and foreign keys. In Bubble, database relations are set up in a visual way where the foreign key is hidden and you can choose which field to display using the Primaryfields setting.

For users with no database experience, this feels intuitive, but for new Bubblers who have spent some time with databases before, the lack of foreign keys can be confusing. What’s important to note here is that this is purely a visual change. Under the hood, Bubble’s database works like any other relational database, using a foreign key to reference the primary key of another record. Using the primaryfield setting simply tells Bubble what field to show you - it doesn’t actually change the underlying foreign key. Saving a list of Things is done in the same way, by simply saving a list of Unique ID’s - the data saved on those Things still has to be fetched from the foreign record.

The relational database model and SQL language allow for flexible queries where you can search your database with clear and understandable constraints. The example below could easily be translated into a humanly readable sentence like “Search for Users who’s email is mail@example.com”

### Understanding indexing

It could be argued that SQL databases are inherently slow, and it would be partially true. Like most computer-related issues, the efficiency of a database hasn’t improved simply because hardware has become more powerful. It has also improved massively because thousands of developers have spent decades building better ways of working with large databases efficiently. An important part of fast queries is the use of indexing. Indexes have one purpose - t0 make a query fast. A common misunderstanding is that an index is a kind of “savedqueryresult” in which Bubble takes common queries and simply saves the result as a list of records that can be quickly sent over when a similar search is made. But this is not quite how indexing works.

Indexes actually have more to do with how data is sorted than anything else, and like many points in this book, it’s a game of compromise. The easiest way to visualize a database is like a spreadsheet. Now, let’s assume you’ve added a lot of users to it with email, name and age. They’ve been added as the need came up, so your spreadsheet would be in a random order: that’sthedatabasewithnoindices. To make efficient use of that spreadsheet you would likely sort it by last name; that’san index. Both searching and sorting for a row by name is now a lot faster, because you don’t need to read the whole spreadsheet - you can do a binary search where you narrow in the name you’re looking for. Technically, this can be done on a sorted list by repeatedly dividing the search interval in half, beginning with the full list. If the value of the search constraint is less than the middle item in the interval, you can narrow the

interval to the lower half - otherwise, narrow it to the upper half. In a single step, you’ve reduced the number of records to search through by 50%, and you can repeat this process several times to drastically reduce the searchable data.

Now, that’s great if all you need to do is search by name. But what if you want to search by age? That means the name sorting isn’t helpful anymore, and we’ll need to sort everyone by their age instead - and that requires a new, separate index. This way of using sorting to quickly rule out huge parts of the database in a query is flexible enough to support multiple columns, like sorting by name and then age to use the same method of elimination, but each index requires the database to create and maintain copies of the same data.

Herein lies the compromise: creating an index sorted in a specific way makes the query faster, but it also takes up server space and resources. You don’t need to copy the whole database for each index - only the columns needed - but for every copy you add the time and resources needed to create, edit and delete records grows, potentially slowing those actions down and increasing the server costs.

### How Bubble chooses what to index

With that understanding of indices in mind, Bubble needs to set up a system of rules for what queries “deserve” to be indexed. First, they look at the app database overall: if

the app consists of just a few hundred records, then a custom sorting won’t speed up the search in any meaningful way. Then, the system starts to empirically detect queries that are not performing well. At the time of writing this, a query is considered slow if it repeatedly takes more than 20ms to complete over the course of an hour. It then analyzes whether an index would actually help speed it up, and creates one if it does and one doesn’t exist. Behind the scenes, Bubble uses PostgreSQL, an open source system that has been in development for more than thirty years and is the second most widely used database management system in the world after MySQL according to a 2019 Stackoverflow survey.

### How indices work on your app

As indices are built by demand, not by default, you can see a variation in query speed over time. Queries that were slow at one point may become faster as they fulfil the requirements for setting up a separate index. Ironically, that logic can also mean that an app with more users can actually perform faster queries, since the increased search volume pushes Bubble to structure the database towards faster queries. Keep in mind the first rule of Bubble’s indexing: it only happens on apps with substantial amounts of data.

### Structured and unstructured data

Information can be stored in two different types of systems: structured and unstructured. This is not a Bubble-specific definition, but a general way to think about the storage of information.

Structured data means it is organized into a catalogue system where each piece of information has consistent content and labelling. A spreadsheet is an obvious example. Each cell can only contain a certain type of information labelled by its row and column. Another one is the contact list in your phone, where fields like first name, last name and email never change. From the perspective of a computer, this data is easy to sort, search through and aggregate, and structured data sets are typically lightweight, since they only contain short strings and numbers.

Unstructured data is information stored in a format that would be harder to understand for a computer, such as a Word document, a written note or book page. Unstructured data is more difficult to catalog and search through and can grow unpredictably in download size since its content can take whichever form the user gives it.

Bubble databases will typically consist of a mix between the two: structured data records containing unstructured fields. For example, on a Product, you may want to have

a field called Description, or if you build a blog, your blog post record will surely contain the content of the post itself in HTML or another format.

Thinking about database records in terms of structured and unstructured data is helpful when planning your database for fast searching.

## How a page is loaded

### Page load sequence

As a page is loaded, Bubble goes through a sequence of steps to prepare it and share information with the browser. 1. First, the server looks up information on the Current User and current Page Thing. Then, it generates the page HTML and sends it along with that data. 2. The page HTML includes references to several javascript files. These currently load synchronously, meaning that they have to finish before the browser renders the page. That said, most modern browsers will do the download of those files in parallel. 3. All elements are then drawn on the page hierarchically, starting with the page and working through its children. This happens in a single (sometimes long for big pages) “tick” of the client javascript engine and the elements render all at

once. A lot of work for rendering invisible elements is deferred until they become visible, but there is some overhead in this initial pass. At this stage, repeating groups are considered single-celled. 4. Images displayed by elements start downloading, and any data fetches necessary to render the elements start 5. The content of repeating groups are rendered (repeating steps 3-5)

### How the page is rendered by the browsers

As your browser renders the page, it goes through a series of predictable steps. These steps are not determined by Bubble, but by the browser and the HTML and CSS frameworks.

●Download and parse the HTML and CSS ●Apply styles to all elements ●Calculate layout (dimensions and positions of elements) ●Paint all elements on the screen ●Compositing (combine all layers into a composited image - what you see on the screen)

As we discussed in the previous section, Bubble generates the HTML on the server and sends it to the browser. Modern web browsers use an interface called the Document Object Model, or DOM. This is basically a tree-structure where every branch ends in a node, which contains an object. An object is any part of your page structure: the html

itself, the page’s header, the page’s body, a group, a text… you name it. Everything that you place on the page is an object contained within the body element.

The example above shows a page that contains a single group with one text object and one image object inside of it. The hierarchical structure represents the page as you’ve designed it in the visual editor.

Each of these elements need some sort of styling (the color, border, padding, font size etc), and the first thing the browser does is to apply the style to each element. The reason this is the first step, is that the browser next needs to calculate how much space each element needs and where to place it. Several properties affect the layout:

Width Height Margin Padding Placement coordinates

Bubble elements are positioned absolutely, using X and Y coordinates that tell the browser where to render it relative to its parent. It takes the information from the previous steps and moves on to the paint step. If you’re familiar working with software like Photoshop and Illustrator, you might recognize the terms vector and rasterizing - the browser takes the vector boxes (the type and style information stored in each element) and rasterizes them (turns them into actual pixels to be displayed on the screen).

In the final step, the browser turns all the layers on your page into a single image that’s displayed on the screen.

Repaints When something changes on the screen (by hiding/showing or animating an element for example), the browser may need to repaint certain areas. Repaints are done in layers and will usually be applied only to the parts of the screen that are affected by the change. Depending on the device and User’s browser settings, this is usually handled by the GPU, which means in most cases it’s very fast.

Later in the book, we’ll explore how you can measure how elements and rendering affect the performance of your app. If you’d like to jump right into that section now, click here.

Don’t worry, there’s a link there too that will take you right back here.

### Priority of general event workflows and page load

There is no definite order of sequence of general events (as opposed to element-dependent workflows like a button click), but they’re related to the sequence in which the page loads as described in the steps above. The descriptions below provide a general understanding of how they are triggered:

Page is loaded The Pageisloaded Event triggers as soon as the page is finished rendering (as described in step 3).

Current User is logged out This workflow is triggered as soon as the status can be determined, and is expected to finish before the page is rendered. It’s important to note that it doesn’t stop the page from rendering - just that the workflow will be triggered. So information can be rendered on the page before the workflow can have any meaningful impact (such as navigating to a different page).

Do every X seconds This workflow is executed as soon as it’s recognized by the Bubble engine, which happens during step 2. It’s useful to note that the first step also adds an X second delay, meaning that if it’s set to run every 2 seconds, it will wait 2 seconds before triggering even the first time.

Do when condition is true This one will run as soon as all the data needed to generate a true value are loaded.

While these may seem like predictable rules, it’s important to remember that the sequence in which they run can vary depending on your browser, connection, device and changes in Bubble’s codebase. They’re a useful guide to understand the general

logic of how workflows are triggered, but should not be considered permanent, sequential rules.

### Workflow sequence priority: server-side

Bubble enforces that workflows wait for any actions in other workflows to finish server-side that had already ran client-side prior to the workflow being kicked off: in other words, if Workflow A has a “Change Thing” action, and that “Change Thing” action runs client-side, then Workflow B starts client-side, Bubble makes sure that the “Change Thing” action from workflow A finishes server-side before any actions in Workflow B run server-side.

This is to ensure consistency between client-side and server-side execution and make sure both sides perform actions in the right order. In cases where you place a lot of workflows in one place (if you have a lot of actions running on page load for example) a queue can pile up on the server that creates a slowdown. Whether this is noticeable by the end user depends on what the workflows actually do, but it’s worth keeping in mind that it can create spikes in your overall capacity.

### Workflow sequence priority: client-side

The same logic doesn’t always apply for actions on the client-side. Bubble will focus on finishing as quickly as it can without sacrificing consistency. Actions do execute in the

order you have provided in the workflow, but they don’t necessarily wait for the last step to finish before moving on to the next. If it relies on information from a previous step (such as when you reference a Thing from ResultofstepX), it will wait for it to finish.

This logic can sometimes create challenges if you expect all steps to actually complete their action before moving on. If one action uses the Gotopage action to change a URL parameter and a later step references that new parameter for example, it may not actually have time to keep up and the later step will find an old or empty parameter instead of the expected one. The same can happen if a later step depends on a search that includes a Thing created/changed in a previous step - you should reference that step directly instead of relying on a search since there’s no guarantee that the previous database operation has finished before the search starts.

Both of these sequence inconsistencies can be avoided by placing the latter step in a custom event that’s scheduled to run a little bit later, but making sure to tell Bubble to wait until a step has finished (by using ResultofStepX for example is a safer and usually faster method).

Custom events Custom events always run sequentially, meaning that Bubble will complete all actions in the Custom Event before moving on to the next action in the workflow that triggered

it. So If Workflow A runs a custom event that starts Workflow B, Workflow B will complete before the remaining actions in Workflow A run.

This means that you can use Custom Events as a safeguard against inconsistencies in database operations, like in the example below with back-end workflows.

### Back-end workflows/API workflows

Scheduling Back-end workflows (or API workflows) works differently triggering on-page actions: unless they rely on a previous step, they are triggered as soon as the workflow is triggered. In other words, their place in the sequence of steps is actually irrelevant unless they rely on a condition or reference from previous steps. This is important in several scenarios where database operations may not have had time to finish before the back-end workflow starts, and it can cause inconsistencies. To get around this, you can place the Schedule API workflow action in a Custom Event placed as the last step in the previous workflow.

If you schedule several Back-end workflows by using the ScheduleAPIworkflowonalist action, they will all run in parallel, not sequentially. In other words, one workflow instance will not wait for another to finish or even start. Once scheduled, they are completely separate from each other.

### How Bubble determines that the page is finished loading

Page loaded (entire) Two criteria are needed for the Pageloadedto be returned as true: 1. Every visible element’s properties are known and not waiting on loading data. If an element’s property contains a DoaSearchfor… for instance, that search must be complete before the element is considered done loading 2. Every visible element that has children has drawn those children. In other words, a Repeating Group needs to a. Complete the search that loads the initial data b. Draw its initial set of child cells (initial meaning the number of records its set to display) Page loaded (entire) currently does not take into account assets loaded by the browser (like images) - but focuses on things that depend on Bubble code.

Page loaded (above fold) Above the fold basically means everything that is visible on the screen as the page loads. In other words, anything that the user needs to scroll to is considered below the fold. This will return yes using the same conditions as above, except that it only takes into consideration the elements that are actually visible to the user.

### Client-side vs server-side operators

The table below shows where a Bubble expression operator takes place.

Operation How it happens Do a Search for:count Server-side (returning number) Do a Search for:first item Server-side (returning 1 item) Do a Search for:random item Server-side (returning 1 item) Do a Search for:filtered Regular constraints performed on the server, advanced filters performed client-side Do a Search for:sorted Server-side, as long as Bubble can fit it into one query Do a Search for:Group by Server-side Do a Search for:merge with Client-side, though this is efficient: if you’re displaying the list in a repeating group and showing the first 10 items, Bubble just needs the first 10 items from the first search, and doesn’t start loading data from the second search until the first search is exhausted Do a Search for:intersect with Client-side, with same comments as above, although intersection generally requires loading more data, making this expansive easily
