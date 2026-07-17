<!-- source: The Ultimate Guide to Bubble Performance (Petter Amlie), Revision 3 — physical PDF pages 1-22 -->
<!-- Front matter, introduction & core concepts -->

## THE ULTIMATE GUIDE TO

# BUBBLE PERFORMANCE

### HOW TO BUILD

### FAST, SCALABLE APPLICATIONS IN BUBBLE

by Petter Amlie

This book is sold through GumRoad.

If you got it from somewhere else, please consider buying it or buying me a coffee.

To stay up to date on new articles and tutorials about Bubble and No-code, you can follow me on Twitter.

Petter is the founder of Amlie Solutions and an active Bubbler developer, writer and public speaker since 2016. You’ll find a growing number of articles and guides on www.amliesolutions.com.

Petter is also leading Bubble’s official educational efforts at https://manual.bubble.io and has been involved in crafting Bubble’s Official Certification.

This book is not in any way affiliated with or endorsed by Bubble Group, Inc.

## Notes on the second revision

This is the second edition of the book. If you have already read the first one, this article will give you a quick recap of the changes made, so that you can jump right into the new stuff.

## Notes on the third revision

The third revision of this book is mostly focused on the three points below:

A new chapter on Bubble’s Workload Unit metric (WU) has been added Sections that relate to this update have been changed where necessary Various typos and outdated information has been updated, much thanks to attentive readers. The Dedicatedplan is now known as the Enterpriseplan. We’ll still sometimes talk about the Dedicatedserver, which is part of the Enterprise plan.

The guide now officially recommends the WebP format for images. This is explained in more detail in the section about image files. Data for how much you’ll gain by applying compression in addition to Bubble’s own image compression is also included.

## Content

Notes on the revision Content Introduction How to read this book What performance is Knowing the platform How to build for performance Concepts, definitions and fineprint Performance Capacity Server-side and client-side Responsiveness Third-party services Editor performance Experience level A word on planning The difference between best practices and tools What is an app? What performance is How performance is perceived Perceived vs actual performance Developer-perceived performance (a.k.a. watching grass grow) Performance is a feature

Bubble plans Are you investing in performance or capacity? The research phase The tool for your project Asking the right questions Understanding Bubble’s capacity dilemma A jack of all trades Bubble’s history of performance Bubble official documentation and guides Bubble performance vs. device performance RAM usage CPU usage Download size Bubble’s servers and Cloudflare Bubble’s performance limitations Manipulating large data sets quickly Working visually with long lists of records Complex searches Server-side Javascript Loading UX How Bubble’s database works Understanding indexing How Bubble chooses what to index How indices work on your app Structured and unstructured data How a page is loaded Page load sequence How the page is rendered by the browsers

Repaints Priority of general event workflows and page load Page is loaded Current User is logged out Do every X seconds Do when condition is true Workflow sequence priority: server-side Workflow sequence priority: client-side Custom events Back-end workflows/API workflows How Bubble determines that the page is finished loading Page loaded (entire) Page loaded (above fold) Client-side vs server-side operators The Page RAM usage and download size How small should a website be? Downloads The Bubble engine Images Fonts Icon packs Javascript libraries (plugins) CSS (styles) Measuring the size of the page and all assets Identifying searches Reading the waterfall chart How to identify different types

Images Plugins Fonts Icon libraries Single-page app versus multi-page app Rendering lists Info saved directly on the list Thing Info saved on a Sub-Thing Processing on Sub-Things Conditions Setting up fast lists The Repeating Group trap Full load vs partial load Hiding by default Lazy loading CPU usage Rendering the page Leveraging client-side data processing Measuring page rendering Paint flashing Checking Layers Measuring the frame rate The database What slows the database down Download size What determines the size of a database record? Complexity Introduction to structuring

Planning your database Balancing the need for advanced database structuring Don’t use Bubble for note taking Get away from the screen Always build with Privacy Rules in mind Keep your user in the center of things The process of creating a Data Type Terms we’ll use Data Concept Data Weight Requirement Conflicts Satellite data types Search data types Content data types Link Data Type Merged data types Scenario 1: Vendors and Clients in a CRM Step 1 - Define the Data Concept Step 2 - Identify requirements Step 3. Identifying conflicts The User’s perspective Scenario 2: Travel App Step 1: Define Data Concept Step 2: Identify requirements Step 3: Identify conflicts The User’s perspective: Syncing data between different Data Types Searching efficiently More constraints is better

Duplicate searches Bubble downloads only the data you need Using lists as saved searches How the :filtered (and other) operators works Nested structures In searches In Repeating Groups Searches and lists Lists Searches Which is faster? Option sets Creative uses of Option Sets for performance Replacing database entries for quicker loading Building an app menu and User privileges in the same Option Set Option Set as a Message Popup Workflows What are workflows? Front-end and back-end workflows Front-end workflows Backend workflows How backend workflows affect the front-end Scheduling backend workflows Bubble is optimized for front-end actions So… never use backend workflows then? Client-side and server-side actions What slows workflows down? Action response design

Immediate response Delayed response Future response Immediate response Delayed response Action sequence order Background triggering Spacing out workflows Multi-step Process spreading Using process spreading for error messages Do Not Repeat Yourself (DRY) Custom events Reusable elements Sharing Custom Events across your app with Reusable Elements Leveraging the Bubble back-end Schedule workflow on a list vs. recursive workflows Recursive workflow delays Backend triggers Deleting complex data Using back-end triggers to keep data in sync Combining Option sets and triggers to automate workflows When to use back-end triggers Communicating clearly Action received A process is running A process is finished Performance is a war of a thousand battles Performance is a feature

## Introduction

Performance is a never-ending topic in the Bubble community. The discussions range from frustrated beginners who struggle to set things up efficiently, to seasoned veterans who have been experimenting for years and still meet obstacles in getting their apps to run smoothly. Bubbleistooslow,I’mquittingforgood is a common outburst on the board. Many cling to the statement that Bubble is for building an MVP, but you’ll need to switch to coding when things get serious..

Is it true?

Well, no

Some questions in this guide won’t have a straightforward answer, but this one does. No, it's not true that Bubble is too slow for anything but an MVP, or that coding is a magical wand that will make all speed issues go away. Working with databases is slow in general, and no matter what framework you use, it will always be an uphill battle against your server’s hardware. From years on the Bubble forum, I don’t think I’m missing the mark much when I say that about 75% of complaints about performance and capacity are caused by poor app design. Bubble naturally attracts people who have limited experience working with databases and fail to see that they’re unknowingly forcing their servers to perform ridiculous amounts of work all at once, and then

wondering why it’s slowing down, or they are creating massive one-page apps that makes Chrome beg for mercy, not realizing that it’s the browser and not the server that’s on it’s knees.

So are all the complaints just about bad design?

Well, no.

There are areas where Bubble still has a lot of room for improvement, and some users rightly bring these points up for discussion every now and then. While Bubble applications in many cases can withstand comparison to global SaaS service providers, I don’t see that anyone has anything to gain from dismissing or sugarcoating areas where progress still needs to be made.

I’m hoping with this book that I can both provide a balanced view of Bubble as a tool, and shed some light on how you can structure your applications for maximum performance and scaling. Happy reading and building!

Petter Amlie Amlie Solutions

### How to read this book

This book is split into three sections:

What performance is How you perceive an app’s performance is determined by a complex combination of Bubble’s software, Amazon’s hardware, your user's device, app design and psychology. In other words, the process of building an efficient app requires an understanding of all of these factors and how they play together. While tutorials certainly have their use, I’m hoping this guide can give you a deeper understanding of the underlying philosophy behind making efficient applications.

Knowing the platform Whatever you build in Bubble, it’s probably not just for fun. Most projects are built on some kind of business or project idea that you expect will give you a return on the time and money you have invested. While Bubble is a fantastic tool, that doesn’t automatically mean it’s the right tool for every project. Knowing the pros, cons and limitations of the platform you choose, how to weigh your decisions and compromises and spotting challenges before they arise can save you months of going down the wrong path. This section also goes through some of Bubble’s core features and explains how they work.

How to build for performance With an understanding of what performance actually is and what Bubble brings to the table, we can start digging into the juicy stuff: how to build an app that performs and scales well. We’ll go through a range of different methods that lean on the preceding chapters for support: how to load pages quickly, how to structure your database for speed, making wise UX choices, leveraging back-end workflows, spacing out processes and plan for scaling.

## Concepts, definitions and fineprint

Throughout this book, I’ll be referring to a lot of different terms and concepts. Since some of them can have a different meaning in another context, I’ll list them here to clarify what I mean in the context of this book.

### Performance

Determines how smooth different parts of your app seem to your users. For example: ●Loading a page ●Finishing a workflow when a button is pushed ●Maintaining the frame rate during scrolling, animations, etc ●Scrolling through lists ●Navigating your app ●Saving an entry in the database

### Capacity

How much work you can give your app before it starts to visibly affect performance or time out. For example: ●Changing a list of things ●Performing complex and/or nested searches ●Scheduling back-end workflows on a list ●Scheduling recursive workflows ●Having lots of users in your system at the same time

Note on capacity: After the introduction of the workload metric (see later chapter), capacity is not as relevant as it used to be. Bubble used to safeguard their ecosystem by slowing down apps that were spending a high amount of their allotted capacity. With the workload metric, the consumption is instead calculated into the final cost of your plan. If you spend a lot of server resources, this can make a difference in your final hosting costs, but the upside is that your app will perform better, and you no longer have to take capacity into account when you build workflows. Bubble now measures how much server resources you spend overtime rather than at one time.

Note that workflows can still time out – we’ll get to that later in the book.

### Workload

Workload is a metric that makes up a final calculation of how much work the Bubble server has had to perform to keep your app running. Workload is calculated across a list of activities that you can find in Bubble’s documentation. You can read more about workload in the dedicated chapter later in the book.

### Server-side and client-side

Server-side and client-side describe whether something is happening on the server or in the browser on the user’s device. We’ll come back to this repeatedly, as balancing these two are a key component to creating snappy applications.

### Responsiveness

In this guide, I’ll be using responsiveness to describe how responsivea system feels: that is, the time it takes from an action is initiated until the user can see a reaction. Not to be confused with responsiveness as often used in Bubble to describe how the page responds to different screen sizes.

### Third-party services

Some of the challenges outlined in this guide can be fixed or optimized using third-party services. Speeding up searches with Algolia or manipulating data sets with Parabola are examples of this. I also avoid mentioning specific plugins or custom code. Solutions like this are outside of the scope of this guide, but are worth researching if you’re running into challenges.

### Editor performance

A known issue with the Bubble editor is that it can slow down when editing pages with a lot of elements and/or workflows (one-page apps often suffer from this). This guide will focus on the front-end, and not the editor.

### Experience level

This guide assumes that you know your way around Bubble. You don’t need to be an expert by any means, but to keep the guide streamlined I avoid explaining any of the core Bubble functionality.

### A word on planning

Many lessons in this book boil down to the same point: planningisessential. While I won’t incessantly repeat this point throughout the book, I want you to approach the

book with that in mind: jumping into the database structure and app design without a plan is the quickest way to lose track of why your app starts slowing down. For newer users, I would also politely point out that your first app is probably not going to be performing as well as you hope. Bubble is easy to use, but there is a learning curve, and some lessons are hard-earned. While I hope this guide can save you from making some of the mistakes that I have made over the years, it’s just a fact of life with Bubble as with most things, that you’ll get better with practice. Don’t invest your kid’s college funds in your first app, and be open to the possibility that it might just suck. Not trying to build the perfect app your first time around gives you freedom to experiment, so don’t box yourself in with ideas of perfection.

Your app may end up being pretty good. But the next one will be better.

### The difference between best practices and tools

Those who have seen any of my presentations or attended a coaching session know that I stress this point: this book presents a list of tools. Sometimes they are worth implementing, sometimes they’re not. Treat every tip in this book as another tool in your box, not a religion you should adopt or the officially sanctioned “best way to do things”.

●Some you may want to implement right away

●Some you may want to implement after your initial launch as an added feature ●Some may not be right for your app at all
