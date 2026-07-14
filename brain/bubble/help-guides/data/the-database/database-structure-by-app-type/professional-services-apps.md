# Professional Services Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/professional-services-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Chris Strobl, Founder & Co-CEO of No Code Germany*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

Professional services experts spend 80% of their time on back-office tasks. The digitization of business processes around project- and client management, forms & templates, invoicing, scheduling, automation and reporting allows professional services experts to focus on revenue and profitability.

This guide suggests a database setup for an application for professional services firms that handles basic booking and invoice needs. In detail, this app helps manage the lifecycle of an engagement and lets users manage projects, book clients, sign contracts online, send invoices and handle payments.

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

A Project represents some unit of work for the professional services firm. Projects are related to Clients that the firm has. The first step in a Project is usually receiving an Inquiry.

### User <a href="#h.gwag42rje0qz" id="h.gwag42rje0qz"></a>

Every Bubble app comes with the concept of a User. In this case, we assume that the tool is mostly going to be used by employees of the professional services firm, meaning the app is an internal tool for the firm.

#### Suggested fields on this type

* Name (text): the name of the person
* Admin (yes/no): whether this person is an admin of the tool

#### Privacy rules for this data type

Since this is an internal tool, in general for all data types, you will want to create a privacy rule so that only users who are logged in can find any data in searches or view any of the fields. This way, nobody external to the company who doesn’t have an account with the tool will be able to see the data. Since this is an internal tool, the app should not have a publicly accessible signup page; instead, for any new employee who needs access to this system, you can manually create an account for them via the App Data tab of the editor.

### Project <a href="#h.hhati0erkxkv" id="h.hhati0erkxkv"></a>

Whether it is the design of an advertising campaign, the development of an app or the implementation of a consulting project, the core activity of a professional service firm is the implementation of projects.

#### Suggested fields on this type

* Project name (text): the name of the project
* Hourly rate (number): pricing for invoices
* Client (Client): which Client this project relates to; see [documentation](https://manual.bubble.io/help-guides/structuring-an-application/data-structure#connecting-types) on connecting data types
* Inquiry (Inquiry): the original Inquiry that this project came from
* Project stage (project\_stage): the status of this project, out of a set of options

#### Privacy rules for this data type

As noted above, you will want a privacy rule to only allow logged in users to find this data type and view its fields. If one of the fields is particularly sensitive (like hourly rate), you could consider creating another privacy rule to only show that to users who have the ‘admin’ field set to ‘yes’.

### Inquiry <a href="#h.ci1hwibje4ld" id="h.ci1hwibje4ld"></a>

Prior to starting a project, the client submits an Inquiry via an online form that governs the specifications of the project.

#### Suggested fields on this type

* Project description (text): you can use a “multiline input” element to give the prospect more space to describe their business problem
* Project type (project\_type): one out of a set of options to consider (see below)
* Target budget (number): useful information for you to know as you assess whether to take the project
* Inquiry date (date): information on when the Inquiry was submitted.

#### Privacy rules for this data type

As noted above, you will want a privacy rule to only allow logged in users to find this data type and view its fields.

### Client <a href="#h.jopphd9ft40x" id="h.jopphd9ft40x"></a>

Master data about the client is the foundation for a good customer relationship. You can keep building out new features in this app to eventually turn it into a CRM!

#### Suggested fields on this type

* First name (text)
* Last name (text)
* Email (text): note that Bubble’s database does not automatically enforce uniqueness (i.e. nothing is stopping the app from having two Clients with the same email, yet), but you can implement uniqueness through workflow logic
* Company name (text)
* Number of employees (number): To get a feeling about the budget and service level
* Phone number (text): because this is just stored as text, you may want to do some data sanitization and even validation in the workflows that save this field
* Billing address (text)

#### Privacy rules for this data type

As noted above, you will want a privacy rule to only allow logged in users to find this data type and view its fields. If any of the fields are particularly sensitive, you could consider creating another privacy rule to only show those to users who have the ‘admin’ field set to ‘yes’.

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

### Project\_stage <a href="#h.bbr1o471gs5r" id="h.bbr1o471gs5r"></a>

The client relationship can be divided into different stages. This is especially relevant to keep track of activities such as invoicing. The methodology of each Professional Services firm guides the customer along the Project Stages.

* Inquiry
* Qualification
* Proposal sent
* Contract signed
* Project Kick-Off
* Project Delivery
* Project Hand-over
* Invoice sent

### Project\_type <a href="#h.d60qs1nncrjc" id="h.d60qs1nncrjc"></a>

An option set for project type helps to organize the portfolio of work of a professional services firm.

* Marketplace
* Social Network
* Productivity Tool
* CRM System
* Analytics Tool
* Something Else

## Example uses in your app <a href="#h.jge3g9i9dho3" id="h.jge3g9i9dho3"></a>

You will likely have a page (for logged-in users) that shows all current active projects. This page would have a repeating group with a data source that’s a search for all Projects where the project\_stage is or isn’t certain stages that you do or don’t want to consider “active”.

With such a list, you may also want to build the capability to filter by certain project\_stages or project\_types. If you have dropdowns for these, you can update the repeating group’s data source to include a new filter on project\_stage or project\_type depending on the value of those dropdowns.

## About the author: Chris Strobl <a href="#h.8zfpl9lbgo9s" id="h.8zfpl9lbgo9s"></a>

I’m [Chris Strobl](https://www.linkedin.com/in/chris-strobl/), Founder and Co-CEO of my own company [No-Code Germany](https://www.nocodegermany.com/). We have a free Youtube channel for Bubble tutorials and provide IT consulting.
