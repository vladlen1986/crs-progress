# CRM Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/crm-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

By Petter Amlie, founder of Amlie Solutions

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

In this example, we are building a CRM or Customer Relationship Management software. This is used by organizations to keep track of their clients, vendors and contacts.

Well-known CRM examples are Salesforce, Insightly, Zoho CRM and SuperOffice. We’re going to set up a CRM that allows multiple clients to work in the same software without seeing each other’s data (typically called a SaaS model), and this will be reflected in some of the ways we structure the Data and Privacy Rules. What this means in practice is that I, as a paying client, will only have access to see and make changes to my own data, and I can trust that nobody else has access to my data.

Additionally, the way we set it up allows for multiple Users for each client, since the client will typically be a company itself. This way, an account owner can invite their team into your CRM platform to collaborate on sales processes and customer management.

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

We’ll be working with a fairly simple set of Data Types to show the principles behind the multi-client CRM model. This could easily be extended with more Data Types (such as Deals, Projects, Tasks and Meetings) using those same principles. Most Contacts and Companies added to the platform will start their life-cycle as a Lead, that then becomes a Contact and/or Company as it moves through the sales process.

### ParentOrganization <a href="#h.gj3zbuele19z" id="h.gj3zbuele19z"></a>

The ParentOrganization is the organization that your app’s Users belong to. For example, I might register as a company called Acme Inc. and add all my 25 employees to that ParentOrganization. Those 25 employees will then have access to only data that belongs to their ParentOrganization, and nothing else. To make this happen, we need to add the ParentOrganization to all other Data Types and set up Privacy Rules for each of them.

The ParentOrganization is created when the first user in that organization registers in your application, and then that User invites their team to that organization.

In principle, this organization only needs a name; we can set up the Data Type as below:

#### Suggested fields on this type

* Name (text)
* Owner (User) - this will be the User who first registered the account and is the owner, or admin, of it

#### Privacy Rules <a href="#h.tc8d8z3ta91v" id="h.tc8d8z3ta91v"></a>

As we explored earlier, the ParentOrganization makes up the primary security “fence” of your application: all Users should only be able to access data that belongs to their ParentOrganization. This also means that we need to keep the ParentOrganization itself private: Users outside of my organization shouldn’t even know that we have an account. So let’s set that up like this:

If this ParentOrganization is Current User’s ParentOrganization, this User can:

* View all fields: yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: no

Ok, so that Rule lets only Users who belong to that ParentOrganization to see its details, but note that we’re blocking access to edit it. But remember, when the Organization is first set up, we also set up a field for Owner. That particular User should be able to make changes to their own organization. That would look like this:

If this ParentOrganization’s Owner is Current User’s ParentOrganization, this User can:

* View all fields: yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: yes

Notice the last rule in bold: since this User is the owner of the ParentOrganization, we’ll allow that User to make changes to it.

### Company <a href="#h.g4k1ykhh3l9n" id="h.g4k1ykhh3l9n"></a>

Now we move on to the actual data that your Users will store in the CRM. A Company is any organization that you add to your CRM that’s not your own. A Company can be both a Client and a Vendor, as separated by the Company type field. We have added a few standard fields like phone number and address, and you can of course add as many more as you need to store more information.

#### Suggested fields on this type <a href="#h.yip3zvhoprgt" id="h.yip3zvhoprgt"></a>

* ParentOrganization (ParentOrganization) - connects this to the entity who owns this data and thus should be allowed to see it; see [this article](https://manual.bubble.io/help-guides/structuring-an-application/data-structure#connecting-types)
* Name (text)
* Address (Google Maps address)
* Phone (text)
* Website (text)
* Type (list of Company Types, an option set) - note that this is a list of Company Types. If you add just Client to that list, then the Company can be sorted as a Client, and the same if you add Vendor. However, since we’re using a list here, you can add both Client and Vendor, allowing a Company to be both.

#### Privacy rules <a href="#h.qw2p8xf8nv7m" id="h.qw2p8xf8nv7m"></a>

Since we set up our ParentOrganization in the last step, we now need to make sure that the Company type we’ve created is only available to Users who belong to the Organization to which it was added:

If this Company’s ParentOrganization is Current User’s ParentOrganization and Current User’s ParentOrganization is not empty, this User can

* View all fields: yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: yes

So, our rule says that the Company belongs to a ParentOrganization, and so does the User: as long as these two match, that User can see and edit the Company. Take note of the second condition we’ve added: and Current User’s Organization is not empty - this is an extra level of security that will stop Users from seeing Companies if both the ParentOrganization of the Company and the User is empty (in which case they will technically match). This should never happen, of course: but since software bugs do occur sometimes, this gives us an extra layer of security even in the unlikely case that both the User’s ParentOrganization and the Company’s ParentOrganization is somehow lost or deleted.

### Contact <a href="#h.wjgu541sn5zd" id="h.wjgu541sn5zd"></a>

In many cases when you add a Company to your CRM, you’ll also want to add Contacts to that Company. A Contact needs to contain information similar to what you would save in your phone’s phone book. A Contact doesn’t have to belong to a Company, but if they do we can use that field to filter and sort Users in our platform:

#### Suggested fields on this type <a href="#h.p1k9641hecf" id="h.p1k9641hecf"></a>

* ParentOrganization (ParentOrganization)
* Company (Company) - the custom Data Type above
* First name (text)
* Last name (text)
* Phone (text)
* Email (text)
* Address (Google Maps address)
* Date of Birth (date)
* LinkedIn Profile (text)

#### Privacy Rules

The Privacy Rules for a Contact are similar to a Company: Users should only be able to see Contacts that belong to their own ParentOrganization. Let’s set it up like this:

If this Contact’s ParentOrganization is Current User’s ParentOrganization and Current User’s ParentOrganization is not empty, this User can:

* View all fields: yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: yes

### Lead <a href="#h.v2p8sh47ur62" id="h.v2p8sh47ur62"></a>

A Lead is a bit different from Contacts and Companies in that they are more temporary. They are basically potential clients: you don’t know whether they will convert to an actual client yet, and your Users may not want to store them as a Contact just yet to avoid overflooding the database with irrelevant Contact and Company records. A Lead can typically come into contact with your Client using a contact form: they’ll provide their contact information, but it’s too early to say whether they’re serious about doing business

If a Lead does convert into business, we’ll convert it into a Contact and/or a Company. At this point we’ll create the Contact/Company record based on the information saved in the Lead. Optionally, we can delete the initial Lead at that point (unless you want to keep it around)

We’ll introduce a slight change to this Data Type to illustrate what’s possible with Privacy Rules: we’re going to assume that if this Lead was created by an employee, we want only that employee to be able to edit it. We’re going to use the built-in Created by field for that.

#### Suggested fields on this type <a href="#h.bbuqa876l4rj" id="h.bbuqa876l4rj"></a>

* ParentOrganization (ParentOrganization)
* First name (text)
* Last name (text)
* Company name (text)
* Phone (text)
* Email (text)
* Comment (text): if you are generating leads from a contact form, a comment field is a great way to save what kind of interest the lead has in your company.

#### Privacy Rules

For this one, we’re actually creating two Privacy Rules. One is to make the Lead visible to all members of the same ParentOrganization (like we did with the other Data Types), and the second rule is to let the Lead’s Creator be the only one allowed to make changes to it:

If this Lead’s ParentOrganization is Current User’s ParentOrganization and Current User’s ParentOrganization is not empty and this Lead’s Created by is not Current User, this User can

* View all fields: yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: no

If this Lead’s ParentOrganization is Current User’s ParentOrganization and Current User’s ParentOrganization is not empty and this Lead’s Created by is Current User, this User can:

* View all fields: yes
* Find this in searches: yes
* View attached files: yes
* Allow auto-binding: yes

Note like in our ParentOrganization that the only difference is in the final Rule. In plain English, we’re saying that if the Current User created this Rule, then that User should be able to edit it (by allowing auto-bind).<br>

## Option sets recommended <a href="#h.tb2mcrvxrjy0" id="h.tb2mcrvxrjy0"></a>

For any data that’s shared between all Users of the platform and remains fairly static, we can use an Option Set. Option Sets load faster than data in your database, but they’re not meant to hold any private information.

In our CRM, we’ll use it to store the two types of Companies in our database.

### Company Type <a href="#h.fooboa731ota" id="h.fooboa731ota"></a>

* Client
* Vendor

The Company Type Option Set is used to separate Client and Vendor companies. We’re storing the Company Type as a List, which makes it possible to make a Company both a Client and a Vendor.

## About the author: Amlie Solutions <a href="#h.v5gdvh36m1v6" id="h.v5gdvh36m1v6"></a>

This guide is written by Petter Amlie. Petter is the founder of [Amlie Solutions](https://www.amliesolutions.com/), a no-code expert, public speaker and author of two books on [Bubble: The Ultimate Guide to Bubble Performance](https://www.amliesolutions.com/books/the-ultimate-guide-to-bubble-performance/) and [The Ultimate Guide to Bubble Security](https://www.amliesolutions.com/books/the-ultimate-guide-to-bubble-security/). You can find a growing number of free guides, video courses and in-depth articles on his website.

…
