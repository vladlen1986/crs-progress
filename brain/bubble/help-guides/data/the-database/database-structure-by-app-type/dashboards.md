# Dashboards
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/dashboards · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Robert Brooks, Founder & CEO, MVP.dev*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

In this guide, we will be creating a dashboard for a sales team inside a learning management platform. The dashboard will be in the Customer Relationship Management (CRM) platform that was built in Bubble.io. This is a central place where sales reps can see their performance and manage their sales activities. The dashboard has different charts and graphs that give insights into the sales process and help reps stay on track with their goals for the day.

Bubble is a great platform for quick dashboard generation. With a good selection of charting plugins, you can easily have your own dashboard stood up for your platform in no time at all.

## Data types recommended <a href="#h.30j0zll" id="h.30j0zll"></a>

The CRM stores common sales data, such as Users, Contacts, Deals, Sales Made, and Chart Data

### Users <a href="#h.1fob9te" id="h.1fob9te"></a>

The users data type stores information about the users of the system – in this case, sales reps, but could include others such as sales managers, SDRS, etc.

#### Suggested fields on this type

* Email - text
* First Name - text
* Last Name – text
* Role – Roles: Option set that defines the access level the user has to the CRM; privacy rules on many data types will be influenced by this
* Manager – User: This sales reps manager
* And any other fields that might be relevant for platform users

#### Privacy rules for this data type

* Each user can view all fields for their own data relevant to their own profile, as well as find in searches, and view attached files
* Users with the Manager role can:
* View all fields except the following:
* Slug
* Created Date
* Modified Date
* Find this in searches
* View attached files
* Users with the Admin role can view all fields for all users, as well as find in searches, and view attached files

### Contacts

A CRM contact is a customer or potential customer who is associated with a CRM account. CRM contacts typically have detailed information such as name, contact information, and account history.

#### Suggested fields on this type

* Contact Type – Contact Types: Option set that defines the type of contact this record represents
* First Name - text
* Last Name – text
* Company - text
* Phone Number – number
* Email - text
* Title – text
* Address - geographic address
* Owner - Users: Determines which sales rep owns the record
* Notes - text

#### Privacy rules for this data type

* Users with the Sales Rep and Sales Manager roles can:
* View all fields for their own data or direct reports data except the following:
* Created Date
* Modified Date
* Find this in searches
* View attached files

### Deals <a href="#h.3znysh7" id="h.3znysh7"></a>

A CRM deal is a type of customer relationship management software that helps businesses manage their customer data. It can be used to track customer interactions, sales, and marketing campaigns. CRM deals can be found online or through software providers.

#### Suggested fields on this type

* Contact – Contacts: contact record for this deal
* Name - text
* Description – text
* Amount – number
* Stage – Stages
* Date - date

#### Privacy rules for this data type

* Users with the Sales Rep and Sales Manager roles can:
* View all fields for their own data or direct reports data except the following:
* Created Date
* Modified Date
* Find this in searches
* View attached files

### Sales Made

A completed transaction in the CRM platform that resulted from a deal

#### Suggested fields on this type

* Deal – Deals: Deal that generated the sale
* Amount – number
* Date - date

#### Privacy rules for this data type

* Users with the Sales Rep and Sales Manager roles can:
* View all fields for their own data or direct reports data except the following:
* Created Date
* Modified Date
* Find this in searches
* View attached files

### Chart Data

Data to be displayed in the charts on the dashboard. This is usually aggregated data of some sort; sales per month, lost deals this quarter, etc. We store this aggregated data in its own data type so that it’s easier to retrieve this for a chart, instead of having to do the aggregations and calculations when setting up the individual charts.

#### Suggested fields on this type

* Chart Information – Chart Information: An option set showing the type of data represented by this record
* Number – number
* Date – date
* User – Users: the user this data represents.

#### Privacy rules for this data type

* Users with the Sales Rep and Sales Manager roles can:
* View all fields except the following:
* Created Date
* Modified Date
* Find this in searches
* View attached files

## Option sets recommended <a href="#h.2et92p0" id="h.2et92p0"></a>

### Roles <a href="#h.tyjcwt" id="h.tyjcwt"></a>

* Sales Rep
* Sales Manager
* Administrator

Sets the access level the user has to the platform

### Contact Types <a href="#h.3dy6vkm" id="h.3dy6vkm"></a>

* Lead
* Client
* Partner
* Other

Determines the type of contact the records applies to.

### Stages

* New
* Proposal
* Won
* Lost

Determines the stage the deal is currently in.

### Chart Information <a href="#h.1t3h5sf" id="h.1t3h5sf"></a>

* Sales
* Leads
* Proposals
* Won
* Lost

Determines the stage the deal is currently in.

## About MVP.dev <a href="#h.4d34og8" id="h.4d34og8"></a>

At [MVP.dev](https://mvp.dev/), we help business owners harness the power of no-code technology to bring their vision to life in weeks through a high-touch proven process.

Rather than holding your tech hostage through a drawn-out and mysterious process, we’re passionate about partnering and collaborating with you every step of the way — from idea to design to development to delivery.

We lean on your vision and our experience to create a truly unforgettable experience and product.
