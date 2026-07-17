<!-- source: The Ultimate Guide to Bubble Performance (Petter Amlie), Revision 3 — physical PDF pages 103-157 -->
<!-- How to build for performance — The Database (structuring, searching, option sets) -->

## The database

### What slows the database down

Two things will affect the speed at which Bubble can find, download and present the data that you request: complexity and download size.

Download size Download size means the total amount of data that Bubble has to download as you fetch a certain number of records. For example, a data Type called User may contain a few short fields called Firstname, Lastname and Phonenumber, while a blog post may contain a short header and a long html text containing the post (like we discussed in the previous section about structured and unstructured data). Even a long article doesn’t contain that much information in itself, but multiplied with thousands or more of records, this can add up to a substantial amount of kilobytes or megabytes to download. The hidden Anyfield field will also increase in size with all data added to any field.

In an earlier section, we explored how you can use the Chrome network tab to quickly identify searches and their total download size. If you’d like to read that now, click here.

Don’t worry, there’s a link there too that will take you right back here.

Now, remember that we are referring to the data stored in the database in the examples below. Adding an image field to a record for example, doesn’t actually add the image itself, but only a text record of that image’s URL. While that image may of course add to the total download size of the page, for the search it only adds a few bytes of text.

What determines the size of a database record? Let’s look at a newly created record containing only Bubble’s basic info:

Field Data Size in bytes Unique ID 1603117061285x169136262540796830 Created date 1607264748 Modified date 1607264748 Created by 1603168031285x169136262540796987 All fields All data in fields above Total size

Bubble saves dates in seconds since Jan 1st 1970 UTC, explaining the numerical values

The download size of this one record is approximately 168 bytes. To see how data scales, let’s assume you ask Bubble to download 10.000 records. That would give us a total download size of 168 bytes multiplied by 10.000: 1,6 megabytes.

Let’s add a First name, Last name and US phone number to that:

Field Data Size in bytes First name John Last name Smith Phone number (XXX) XXX-XXXX Unique ID 1603117061285x169136262540796830 Created date 1607264748 Modified date 1607264748 Created by 1603168031285x169136262540796987 All fields All data in fields above Total size

Adding a few more fields increased the download size for this record by around 14%.

The record size grew to 191 bytes - still pretty light. Multiplying that by 10.000 records, we would be looking at a total download size of 1,8 megabytes.

Let’s add a blog post to it. This is a random newspaper article saved as plain text:

Field Data Size in bytes Article Content of article 5322

First name John Last name Smith Phone number (XXX) XXX-XXXX Unique ID 1603117061285x169136262540796830 Created date 1607264748 Modified date 1607264748 Created by 1603168031285x169136262540796987 All fields All data in fields above Total size 5513

Adding a longer text field increased the size of the record by 3.181%

By adding this article, the record has grown to 5,3 kb, and 10.000 records would give a download size of about 55 megabytes - a sizable download.

Now of course in most cases, you will not be downloading every single record in a search. The whole purpose of adding constraints to a search is to tell Bubble to only download the data you actually need. But it serves as an illustration of how easily we can give both Bubble and the user’s device a lot of extra data to search, process, download, store in RAM and display, and it’s important to be aware that Bubble will download all fields of a Data Type even if you’re not showing them on the screen.

Complexity Data type complexity is related to how many fields your data records have, and what kind of data they contain.

How the number of fields affects your searches is best visualized like an Excel spreadsheet: search performance is not only affected by the number of rows (records in your database), but also the number of columns(fields on each record).

The content in each field of your Data Type will also affect how much Bubble has to go through. As usual, size and complexity are closely related.

Bubble’s default fields

Let’s separate field complexity into three categories:

Light Light fields contain information that adds very little complexity to your Data Type. Fields like Firstname, Yes/No and DateofBirth are quick and easy to search through.

The Firstname field doesn’t give Bubble a very challenging search.

Medium We’ll go back to our blog post example. A field of medium complexity may contain longer strings of text such as a news article, forcing Bubble to go through more data. The search below would put more strain on the server, as, even if it’s just one field:

This search gives Bubble more work to do, since you’re searching through unstructureddata

Bubble has to go through potentially massive amounts of text to find what you’re looking for, and you may be better off finding your article using other constraints.

High High complexity data types are those that contain lists of other Things that Bubble has to go through in order to find what you’re looking for. Let’s say that you want to keep track of Users who have read an article. You add a field on that Article called Reader, containing a list of Users.

This search forces Bubble to download an additionallist of Things for each record in the search you’re performing.

In this example, for every row, Bubble has to go through an additional list (potentially long) of Users and check if the current user is in that list. Quite a job!

The complexity added by adding lists of Things to a data type does not only affect searches, but the amount of data that Bubble has to handle in general. If you load a list of Things, each containing a field with another list of Things, Bubble will load the ID of all of them, adding to download size, RAM usage and client-side processing.

For an Article, loading a list of tags on each article (2-3) may be fine, but loading a list of Readers (potentially thousands) can lead to slowdowns.

### Introduction to structuring

Knowing the reasons a search may slow down, let’s look at how we can work to avoid those pitfalls.

Again we return to an important point: since Bubble is so easy to use, it’s tempting to jump straight into the work and set up your database type as you go along. As the project moves into a more mature (and complex) stage, you may find that you have to go back and make changes for different reasons. These changes can take a lot of time, and leave your database less organized than what’s optimal.

When planning your structure, there are many factors to consider, and many of them will be unique to your app. Many developers have contacted me over the years and asked for a set of “best practices” for structuring the database, but like most questions I try to answer in this guide, a straight answer would probably do more harm than good: there simply is no one way to cover every scenario. What I will attempt is to highlight the facts about how different decisions affect your database performance, and then present possible solutions to scenarios that may or may not apply to your particular needs.

So now, let’s talk about structure.

Planning your database The Lean Startup (a book I warmly recommend) launched the MVP way of thinking that the tech industry in particular has taken to heart. Building for a fast launch, getting early user feedback and experimenting rapidly is both a great strategy and - I’ve found a lot of fun. But keep in mind that it, like any other tool at your disposal, shouldn’t be used on autopilot. Structuring your database in the wrong way can set you up for time-consuming corrections and have long-term consequences for your product and business. With some experience, you’ll finish your database plan in a day - that’s worth it for the long-term health of your app.

Let’s spend a little time discussing how you should approach that question as you get ready to work on your database.

Balancing the need for advanced database structuring The consequences of a poorly structured database are not necessarily visible at launch, but months or even years later as the workload and data volume grows. Decisions regarding your data structure are among the most important you’ll make.

That being said, the scenarios I’ll outline below are meant to speed up apps that manage large volumes of data and have specific client requirements: they’re not a blueprint, and they’re not bestpractices - they’re just examples to show how we can structure our database by taking it through some simple steps. For an MVP that you’re

not planning to scale, you can in principle build your database in the fastest, simplest way possible simply to get the job done, and then re-think it as you’re developing the final product.

Don’t use Bubble for note taking Setting up things in Bubble is done so quickly, it’s easy to use it almost as a note taking tool - you need to remember what Data Types to add, so you simply add them to keep track. The problem arises when you start working on those records - and in my experience that’s exactly what people start doing. Dust off your notepad and sketch out your database there first.

Get away from the screen There are plenty of tools for drawing out your database on the screen, but in this first phase, nothing really beats pen and paper for quick drawing and revisions. I find the screen of a tablet to be too small and to hinder the free flow of the pen, but pick the tool that you find suits you best.

Alwaysbuild with Privacy Rules in mind If you don’t protect your data with Privacy Rules, you’re not protecting it. Every database record in your app that is not public needs to be designed with those rules in mind.

Sometimes that means adding fields to a data type that you’d prefer to store somewhere else. Security supersedes performance in this case. If you don’t plan for Privacy Rules early on, you will find yourself making inconsistent decisions on the database design later on.

Keep your user in the center of things Let’s return to our metaphor on the two layers of app development for a bit. Your database is not something that your users care about or will ever see. Don’t design it for them. All they have access to is what you choose to show them in your app’s UI. In other words, the database doesn’t need to be a neat and pretty spreadsheet - you can hack it in any way you deem necessary to get the right info displayed for the user whenthey need it.

### The process of creating a Data Type

I want to take you through the mental journey that it is to plan for a new Data Type, because it affects how you plan for it. We’ll introduce some new terms that refer to different parts of that journey.

As you can see in the diagram below, our goal is to get from the conceptual idea of the information your app will manage to a structured database that can store and present that data efficiently.

Data Structuring Chart

Terms we’ll use

First, I want to introduce a few new terms that we’ll use as we explore how our app idea translates into a database.

Data Concept The DataConcept represents the actual features that your database is there to support. For example, a CRM might include Clients and Vendors, but as we’ll see, it’s not given how these two concepts will look in the database. The Data Concept is a User

Experience - not a database record. It’s how we thinkaboutthe data. A Data Concept will result in one or more Data Types when this process is done.

Data Weight Data Weight is the term I use to describe the metaphorical weight of a type’s total amount of data. If a data type contains fields that potentially hold lots of data (unstructured data like product descriptions and blog posts and long lists), that would give the type a potentially high data weight. A small amount of data (email, first name and last name) would indicate a low data weight.

Requirement Conflicts Requirement conflicts is the process of looking over your data concepts from different angles to see potential challenges from a database perspective.

Satellite data types Satellite data types are “extra” data types that you add to your database to separate data in order to solve a requirement conflict. Typically, they consist of one of three types:

Search data types

Search data types are set up as an extra “representative” of one or more data types when you need to either reduce the data weight on one specific type, or combine several data types into one efficient search. A typical case of the latter is if you’re building an app-wide search that covers multiple types (such as Contacts,Tasksand

Projects).Instead of setting up a complex list with multiple searches through data-heavy records, you set up one lightweight data type that covers all types and they’ll all be displayed in the same Repeating Group.

Content data types

The Content data Type is a satellite that you set up for storing data that adds a lot of data weight. For example, if you have a blog platform, you may have a need to quickly search through blog posts, but the same posts also have to contain a lot of unstructured data. Separating the searchable records from the content helps you achieve both goals.

Link Data Type

A data type that’s used as an extra representative of multiple other data types. This is useful in cases where you need to link data to each other without setting up a high number of extra fields. For example, let’s say you are building a project management system: you may want to link a Task to multiple data types: users, contacts and projects for internal linking. By creating a separate Link Data Type you would be able to tag a task with any other data type, stored in a single field. In another scenario, you may want to display several types of Things on the same Page using that Page’s Thing: you can only do this with one Data Type at a time, but a Link Data Type solves that. This type can sometimes be combined with the Search Data Type to cover both needs.

Merged data types Merging Data Types means to take two or more data types that share commonalities and merge them together. We then use another field (usually an Option Set) to separate them from each other. We’ll look into this in the scenarios below.

Phew! That was a mouthful of new techie-sounding jargon - but bear with me, I promise they’ll be useful. Let’s bring some more context into it by going over some scenarios:

Scenario 1: Vendors and Clients in a CRM

Step 1 - Define the Data Concept A Client (I’ll call them Partner from now on to avoid confusion) asks you to build a CRM, and lays out different Data Concepts that they will need. Let’s focus for now on two of them: Client and Vendor. We’re now in the first step of the Data Structuring Chart, where we define the Data Concepts: the data from our Client’s perspective.

You immediately grasp what your Partner wants, and being the efficient Bubble builder that you are, you rush in and set up your two Data Types: Client and Vendor.

But stop for a second - let’s take this through the Data Structuring Chart. We’ve completed the first stage of identifying our Data Concepts, but now let’s run it through the second step of determining its requirements.

Step 2 - Identify requirements You can think of these requirements similarly as you would think about doing User Stories: how will your users interact with this Data Concept? Generally, most requirements for a Data Concept can be split into one of these columns:

Searching/Displaying Privacy Data Weight Volume How will I search for and How should this How much data will I be How many records do I display this Data Data Concept be storing for this Data expect this Concept to Concept? kept private? Concept? hold over time?

Using those pointers, a simplified look at our Client and Vendor Data Concept might look something like this:

Client Vendor Searching/Displaying Must be quickly searchable and Must be quickly searchable and displayed in a list displayed in a list Privacy Only creator can see, but can share All users within the same with colleagues company can see. Data Weight Must contain contact info like Must contain contact info like email, phone, billing address, email, phone, billing address, office, address, description, notes office, address, description, notes and files. Must hold invoices. and files. Must hold purchase orders. Volume With many users in the system, With many users in the system, the number of Clients may grow the number of Vendors may grow into hundreds of thousands into hundreds of thousands

Hold on! Are you seeing what I’m seeing? These are almost the same thing!

They’re both companies, needing the same fields to be stored, and only separated by what relationship they have with the CRM owner. Thinking about them one step further, couldn’t a Client also be a Vendor in some cases? How do we keep those two records in constant sync?

The answer is of course staring us in the face: these shouldn’t be two Data Types, but one, called Company. Recognizing that Vendors and Clients are Data Concepts, and not necessarily Data Types stopped us from rushing into Bubble and setting up a structure that wasn’t optimal. We can simply separate them with an Option Set field called Companytype, and even set that field up to be a list to allow one Company to be both a Vendor and Client. Following our Data Structuring Chart, that would look like this:

Great! So let’s set that up! Nope. Not yet. Remember, just because you’ve recognized one challenge doesn’t mean you’ve found them all.

Step 3. Identifying conflicts Now that we’ve decided that our two Concepts have merged into one Data Type, it’s time to start looking for Requirement Conflicts. This means we need to look through our requirement table and ask ourselves: are any of these points in conflict with each other?

Company Searching/Displaying Must be quickly searchable and displayed in a list Privacy Only creator can see, but can share with colleagues Data Weight Must contain contact info like email, phone, billing address, office, address, description, notes and files. Volume With many users in the system, the number of Clients may grow into hundreds of thousands

From what we know about how the download size of a given search can increase, these three points are in conflict: we’ve indicated that we want to store a lot of data on Companies and that the number of records can become big, but also that we want to search for them quickly. What to do?

The solution in this case could be to introduce one or more Satellite Data Types. In the case of our Company Data Type, we could structure it as two data types: one meant for

searching, and another for holding all the data: one Search Data Type and one Container Data Type. How they each relate to data weight and search friendliness can be illustrated like this:

Remember that the Volume also played a part here: because we expect the Company Data Type to grow into potentially hundreds of thousands of records, we need to make sure the total download size is as small as it can be.

And recognize the irony here: we went through one step of the Data Structuring Chart to reduce our number of Data Types, but then identified a conflict and increased it back to two:

Quite a journey our Clientsand Vendors have taken in just a few minutes. The Data Type fields of these two types could be looking something like this:

A real-life app would likely contain more fields, but here we see the Data Type and the Satellite Data Type bound together and can be referenced from both sides. The searchStringfield is an optional field you can add if you want to customize exactly what Bubble should search through. You can populate this with a text representation of the most important fields on the companyData record, like Companyname+industry+country to give Users a flexible search result.

The User’s perspective Now, let’s remind ourselves: the User is unaware of this process, and how the data actually looks encrypted in a server far, far away. An isolated user journey for our Clients and Vendors might look like this:

Up until the last step, the User is filtering and browsing a potentially long list of records, and we keep it light - in the last step we’re displaying a single record in isolation and we switch over to another Data Type unbeknownst to the User.

Scenario 2: Travel App We’ll change our example app a bit for this one. Your Partner has now requested the building of Travlr™, an app that sets out to take the throne from TripAdvisor as the number one tourist destination catalogue. The app will allow users to find new exciting destinations and check out local points of interest such as restaurants and hotels.

A key feature in this app, your Partner explains, is that it’s based around search. Users need to be able to search for not just one type of thing, but all the information stored in the database, just like TripAdvisor:

TripAdvisor showing a Destination, a Hotel, a Point of Interest and a search category, all in the same list

He also wants the site to get organic search traffic, and wants every record to be displayable on its own page.

Step 1: Define Data Concept Let’s have a look at the Partner’s Data Concepts and see what kind of data points we are talking about: ●Continent ●Country ●Destination ●Restaurant ●Hotel

You may already start to see similar Requirements and Conflicts as we did in our last scenario, but keep in mind our Partner’s requests: we need to search all records from the same search bar and take our User to a unique URL when clicked in the search results.

Step 2: Identify requirements Let’s first look at the three geographical records that intuitively seem to have a lot in common:

Continent Country Destination Searching/ Must be quickly searchable Must be quickly searchable Must be quickly searchable Displaying and displayed in a list along and displayed in a list along and displayed in a list along with all other Data Concepts with all other Data Concepts with all other Data Concepts Privacy Public information Public information Public information Data Must contain a name, Must contain a name, Must contain a name, Weight description, photos, travel description, photos, travel description, photos, travel tips and travel data tips and travel data tips and travel data Volume Less than 10 About 200 Potentially thousands or more

As suspected, they are fairly similar. We can assume that they can potentially become fairly data heavy, since they’ll contain lots of unstructured data for the search engines. Their volume is low (and more or less static), except for the Destination, which is harder to predict.

Should we merge these, like we did with Clients and Vendor? After all, these are not the same thing, and you may want to sort your Restaurants into Country and Destination for quick searching. Still, there are several reasons for why this makes sense:

We can assume that we’ll be displaying all of these three categories simultaneously on many pages: if we combine them, we can get away with performing one database search instead of three Page Things: A Page can only load Things of a certain type. If you set up a page called www.travlr.com/location with Page Thing set to Destination, then this page can only show Destinations. Showing a Country or Continent page would need to load a new page with a different name where the Page Thing is different. The same logic applies to Groups: instead of having to set up a bunch of different Groups each catering to the different data types Destination, Country and Continent, you can load all three of them into one, lowering the number of elements on your page and speeding up the design.

Ok, so it seems to make sense to combine these three pieces of geographical data. Before we make a decision, let’s look at the rest of the Data Concepts:

Let’s first look at how the continents, countries and destinations might look like as a data type. It’s important to note that the three we show below here are the same Data Type - we’re displaying it thrice to illustrate how they are linked together.

The geoContainer data type is used to represent all kinds of geographical data. I've left out fields like Description to simplify the example.

How do we know which ones are Continents, Countries and Destinations? The answer lies in the bottom row: by setting up an Option Set called dataType, we can easily separate our geoContainers into what type they are.

We only need one attribute on this Option set - the built-in Display value - to separate our three geographical Data Concepts.

Let’s return to the Data Structuring Chart to see visually what kind of journey they’ve had:

We still have three Data Concepts, but the actual Data Types in our database have been reduced to just one.

Ok, so we’ve set up our geographical Data Concepts. Let’s look at the other types:

Restaurant Hotel

Searching/ Must be quickly searchable and displayed Must be quickly searchable and displayed Displaying in a list along with all other Data Concepts in a list along with all other Data Concepts Privacy Public information Public information Data Must contain a name, description, review Must contain a name, description, rating Weight score, photos, destination, country and photos, destination, country and continent continent Volume Possibly hundreds of thousands Possibly hundreds of thousands

Again, we’re looking at records that are fairly similar, and it makes sense to merge these two data types to one to reduce the number of searches we need to do in our app. We’ll do exactly what we did with our geographical Data Concepts, leaving the Data Structure Chart looking like this:

The name poiContainer comes from Point of Interest - a common term in the travel industry.

Step 3: Identify conflicts Now let’s address our Partner’s request: all Data Concepts must be easily searchable from a prominent search bar. Just like in our last example, our main conflict in this app is that we have Data Types that both have a lot of Data Weight and must be searchable. How do we approach this?

We’ll solve this by adding a Satellite Data Type called Search. To illustrate this, we’ll remove the Data Concept and Requirement Part of our structure to simplify it a bit. We then add the Search Data Type as a Satellite:

We’re adding one extra Data Type (search) that we’ll use to allow app-wide searching for all kinds of Data Concept with just one server query.

For the Search type, we’ll again use the dataType Option Set to determine what kind of record we’re looking at in the list (and filter the search if needed). For that, let’s add our

two extra data types to that Option Set:

Spending just a few minutes thinking about what our Data Concepts Requirements are, we’ve set up a data structure completely different from the initial setup suggested by our Partner.

The User’s perspective: Not unlike our first example, our Users are being exposed to different data types along their journey to the actual record, but they have no idea it’s happening:

Syncing data between different Data Types All this sounds great, but presents a challenge: how do I make sure that these separate data types are updated whenever the main data type is? For example, if we change the name of a Restaurant, how can we be sure that the accompanying Search Data Type is updated as well?

The answer lies in Backendtriggers.For each change you want to keep in sync, set up a back-end trigger:

The trigger above will execute whenever a Restaurant’s name is changed. Triggers can be used not only to change things as needed, but also to create them. For example, a back-end trigger can create a new Searchdatatype whenever a new Restaurant is added.

If you want to learn more about using Option Sets, you’ll find an in-depth tutorial about them on our website.

### Searching efficiently

As your database is set up, it’s time to look at exactly what makes an efficient search.

This section provides general rules of thumb for setting up your searches efficiently.

More constraints is better Bubble searches work by excluding records that do not match a certain condition. In other words, the more conditions you provide, the faster Bubble can rule out records and shorten down the list of potential candidates.

Duplicate searches I often see developers load their list into one element (such as a hidden Repeating Group), and then reference this element when they want to show the same list in multiple places. This is not necessary, as Bubble is already clever enough to only perform duplicate searches only once as long as the constraints match.

Bubble downloads only the data you need If you are fetching data by DoaSearch:Firstitem or using a Repeating Group showing only a set number of records, then Bubble doesn’t download more than it needs to display the info, as well as a few more records to prepare for the user scrolling the Repeating Group.

Using lists as saved searches Sometimes you will perform searches that are very complex, relying on nested structures, intersecting multiple searches or client-side processing. In cases like that, it can be useful to save a search as a list instead. This is a method we rarely use, as it goes against our general policy of securing searches with Privacy Rules. But since Bubble’s search capabilities will sometimes force you to perform the most complex filtering server-side, it deserves mention as an option.

### How the :filtered (and other) operators works

The :filtered operator can be a source of some understandable confusion, since this is where the lines between what's performed server-side and client-side is the most blurred. Like in most things, Bubble will attempt to make the search as efficient and secure as it can, and as a general rule of thumb, that means performing it on the server. It’s easy to assume that any kind of filtering you apply afterthe original search is performed will be client-side, but that’s only the case under specific conditions. Take a look at the example below:

There are no conditions on this search, but we apply a filter afterwards to search for an email. One might think in this example that Bubble downloads the full list of Users and then filters them client-side by the email field. But Bubble actually applies the condition on the server - but with one key difference: it takes the results of the first list (with no conditions) and then applies the second condition from the filter. Bubble converts that expression behind the scenes. This of course means a slight performance difference on the server, but unnoticeable unless you’re working with a lot of data.

What Bubble can’t run on the server is advancedfilters. You know - these:

Using the advancedfilter forces Bubble to filter the list client-side: less efficient and less secure

Bubble currently doesn't have the capability to convert arbitrary expressions into SQL. If you chain a sequence of searches and filters (as well as sorted, groupings,merges, intersections,uniqueelements etc, then Bubble will do its best to condense all of them into a single query that can run efficiently and push the majority of the work onto the server. That said, the longer or more complicated the chain is, the less likely it’s able to successfully do that.

If you need to apply operators after a search, do it step by step and make a conscious effort to notice whenever it slows down: at that point, you may have set it up in a way that Bubble was not able to run as a single query.

### Nested structures

Nested structures apply to both searches and how you display Repeating Groups and describe any scenario where you force Bubble to perform a task on eachrow of a list of things.

In searches In searches, a nested structure would apply to any search that contains another search as a constraint.

In this example, for every User that Bubble goes through to find the right one, it has to perform a second search to find a specific article.

Original search Number of Users Total number of searches

It may feel like you’re performing two searches. That’s what you set up, right? But in reality, you’re now performing 501 searches. The first one, and then one for each row of users.

In Repeating Groups As you display a list in a Repeating Group, it’s also easy to lose track of just how many searches you’re asking Bubble to perform. In this example, we are showing a list of Users in the system. The total number of searches is 1:

In the second example, all we want to do is show the number of articles a user has read:

How many searches is this? We’re performing one search to find all the Users, and then one search per row, to count that User’s Articles, totaling 5 searches.

Be mindful of setting up nested searches, as they’re the quickest way to throw your app’s performance off the rails.

The trigger above will execute whenever a Restaurant’s name is changed. Triggers can be used not only to change things as needed, but also to create them. For example, a back-end trigger can create a new Searchdatatype whenever a new Restaurant is added.

### Searches and lists

There are two ways to retrieve a list of Things in Bubble: perform a search, or fetch a list already saved on a Thing. List fields are created by checking the box below as you set up a new Field:

Lists and Searches have different pros and cons, as listed below:

Lists Searches Max out at 10.000 records Have no upper limit on number of records Do not adhere to privacy rules Info is guarded by privacy rules Are downloaded in their entirety Only downloads the needed records Use client-side hardware to filter Uses server resources to index and filter Must be manually updated Are dynamic

Lists Number of records

A saved list in Bubble at the time of writing this can only contain 10.000 records. This may sound like a lot, but for our list of Readers of an Article, this would quickly be exhausted.

Privacy rules Privacy rules do not actually hide records in themselves, but apply an extra filter to a search looking for a record that matches that search. You can look at privacy rules as an extra search condition added on top of those you already have. It’s important to avoid a misunderstanding regarding the difference between a listand a search: if you are protecting a record from being found in a search, that record will still be visible if it’s part of a list saved on another record. If you protect that single field (the list) the record will be hidden again (along with every other record in lists stored in that field). So keep in mind that just because you are protecting a record from being searched for doesn’t mean it won’t show up anywhere else. It applies to searches quite literally.

Another security concern regarding lists is that you need to keep in mind that even if you place a :filter on a downloaded list before displaying it, the information is still available in the browser for anyone looking for it.

If you want to learn more about using Privacy Rules, you’ll find an in-depth guide about them on our website.

Downloading and filtering Filters currently can’t be applied server-side to a List, which means we can unknowingly put a lot of strain on the User’s device if we’re not careful. Let’s take our list of Readers again and assume that 10.000 readers have read the article.

You want to fetch the list of Readers (Users) but you only want those from the same country as you to show reading statistics. In this case, Bubble will:

●Download the entire list of 10.000 users to your browser ●Have your browser (client-side) filter those users by Country

For a search of this size, the browser will at best become sluggish, and at worst it may crash the current tab. For this reason, lists are best suited for a low number of records and may not be your best choice when the number of entries exceeds 100.

Maintenance A list will always contain the records you save on it, and will never automatically update their content. If the list needs an update, you will have to do that yourself through a workflow. The exception is deleted records, but keep in mind that they may sometimes simply leave an empty record in the list, leading to errors in :count results.

Searches Number of records There’s no upper limit on how many records Bubble can search through and retrieve.

Privacy rules Privacy rules are applied to all searches as the first step, stopping the information from ever reaching the browser no matter what. For a search, Bubble will:

●Apply privacy rules conditions ●Apply all other conditions ●Send to browser

Downloading and filtering When you perform a search, all conditions you place on that search are applied on the server, andthen the information is sent to the browser. This means that conditions are safer (regardless of privacy rules) than filters, and you stop Bubble from downloading more information than it has to. As we saw in the earlier section, download size can quickly grow when we reach a high number of records.

Let’s take the same example from before and look at how a Search would complete that same task:

You’ll see that we’re turning things around. Instead of asking the Article who’s read it, we’re asking the Reader which articles he’s read. The list of Articles a User has read is

likely to be a lot shorter than the list of Users who have read an article. Even if the total number of Users in the system is high, this is the more efficient method of the two to retrieve the list, as we’re not relying on the User’s device to filter a long list.

Maintenance Searches are 100% dynamic: whenever information on a record changes (even if done by another User) that is relevant to the conditions of the list, the list will instantly update. As an example, if you changed the Country on a user in the illustration above, the User would vanish from the Searched list, but would remain in the savedlist.

Which is faster? There’s a theoretical performance gain to be had from using a saved List when the list of records is short - but it’s doubtful that it translates into meaningful performance gain. The added work of maintaining them, the added data saved on the record and the loss of Privacy Rules is more than enough to justify not using Lists. There can of course be good reasons to use Lists for all sorts of stuff - but don’t implement them in the hope of improving performance - the tradeoff is very unlikely to be worth it.

### Option sets

Options sets are like a database light for your application. You can’t make any changes to it without re-deploying your app, but on the flipside they don’t rely on your database and are in fact included in the Bubble code downloaded to the browser. This means not

only that you don’t have to query the Bubble database to retrieve their information, but also that they are delivered through Cloudflare as a cacheable JavaScript file, leveraging the global CDN coverage.

If you want to learn more about using Option Sets, you’ll find an in-depth tutorial about them on our website.

Option sets are frequently used at its most basic level to set up static values around your app. For example, we used Option Sets in our earlier example to separate GeoTypes in the Travlr app. Since these values will rarely or never change, we don’t mind that it would require re-deploying our app.

Naturally, Option Sets are not meant to store a big database. While your Bubble database only downloads the information that it needs, the full option sets will be downloaded every time a user accesses any page in your app. Also remember that any sort of filtering you do on Option Sets is applied client-side.

Creative uses of Option Sets for performance Apart from populating dropdown lists and categorizing GeoTypes, Option sets can be used in different creative ways to speed up the page load and add more flexibility to certain parts of your page.

Replacing database entries for quicker loading For pages where load speed is particularly important, like the front page of an eCommerce store, Option Sets can be used as a replacement for a database search. I’ve worked on pages where the goal on the front page was to avoid having any database references at all, and where Products were added and maintained as an exact copy of their database counterparts. Having no database references on the front page cut the loading time by nearly two seconds and left the entire page depending only on Cloudflare’s CDN. Best practice? Hardly - but it served its purpose. The page loads quickly and retains a valuable SEO performance.

Building an app menu and User privileges in the same Option Set Building a menu for a SaaS CRM application, we looked at different ways of making a flexible menu that would also serve as a user privilege check and only show the menu options that the currently logged in User should have access to. We set up an Option Set called Privileges that included entries like Contacts, Projects and Company Settings. ●We set up a field on each User called Privileges, containing a list of these option sets. Each entry added to the list would mean the User has access to that menu option.

●The left-hand menu in the app dashboard was set up as a Repeating Group, showing the Current User’s list of Privileges. Clicking on a menu Option would use the Go To Page with a slug saved on the Privilege being clicked. ●In the user setting window of the app, we could simply list all Privileges in a Repeating Group under a user profile, to allow an admin to add or remove Privileges from a User.

Option Set as a Message Popup Option Sets can also be used to set up popup screens with different messages and actions to reduce the number of elements on the page and ensure workflow consistency. In the example below from a real-life application, we set up a Reusable Popup that can be used to run a range of actions from any page in the app:

Below is the Option Set called Message Setting, with some different attributes we’ll use in the popup:

Create a Popup, and set its data type to the newly created Option Set. Before showing the popup, we’ll Display the correct Option set to determine what message to show:

We can then populate each field in the popup with the field from the currently loaded Option:

The popup will show one or two buttons, based on whether the Button:lowemphasis is empty or not, and the two text fields get their content from the Header and Message fields. Finally, the currently loaded Option determines which workflow is triggered when the User clicks. Workflows are stored in separate Custom Events:

This way, we’ve set up a single popup to display a wide range of different messages, and we’re also making sure that some of the key operations of the app are contained within a reusable element and can be triggered from anywhere in the app as needed.
