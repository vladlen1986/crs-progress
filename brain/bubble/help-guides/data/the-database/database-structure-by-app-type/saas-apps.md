# SaaS Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/saas-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Gaby Román, Co-Founder of Coaching No Code Apps*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

SaaS app data structures are unique in that almost all of the data needs to be organized under an account hierarchy. For example, every user that signs up might represent a company, so they may have a team, customers, and other resources that should all link back to that parent company.

The following data structure is recommended for companies that need a project management tool for internal operations. Users of the app can create and organize projects with related tasks. For example, a manufacturing company with product design and marketing teams would be able to manage the various to-do items within their departments while company managers can track company-wide project statuses and assignments. Overall, this would streamline communications between teams, better visualize company metrics, and help management make more intuitive business decisions.

## Data types recommended <a href="#id-8gkrwvp3rqds" id="id-8gkrwvp3rqds"></a>

These data types are designed from the perspective of one company. Every company that signs up to your app will have a single “Company” record in the database, one or more “Users” (team members, managers, etc.), and related resources that are unique to the Company, such as “Customers,” “Projects,” and “Tasks.” The “Subscription” and “Plan” data types will help you manage each Company’s subscription with you, the app owner. The more Companies that sign up, the more records are created, but the key is to relate Company specific records like Customer or Project back to the parent Company for data security.

### User <a href="#u11tp6psyxte" id="u11tp6psyxte"></a>

This is Bubble’s only built-in data type. Anyone who needs to be able to log into the app should have a User record.

#### **Suggested fields on this type**

* First Name (text)
* Last Name (text)
* Related Company (Company): This field is important for knowing which data the user has access to and can be leveraged in many different privacy rules.
  * Privacy rule example under Customer: “When This Customer’s Related Company is not the Current User’s Related Company” > disable all checkboxes
* Role (User Role, an option set): By assigning users with specific roles, you can control their access to pages, visual elements, and workflows. For example, a User whose Role is Company Admin can have the ability to create other Company Members, whereas Company Members themselves cannot.

#### **Privacy rules for this data type**

The User’s “Role” and “Related Company” will be the starting point for creating privacy rules both for the User data type itself and all other Company-specific types.

For the User data type, we suggest creating a rule that only allows users to access other user records within their same company, not other companies. You can do this with the following rule: “Current User’s Related Company is This User’s Related Company.”

You can break this down one step further by only giving Company Admins the ability to view more fields and/or edit other Company users; in addition, allowing the current user to have full access to their own record:

* Current User’s Related Company is This User’s Related Company and Current User’s Role is ‘Company Admin’ > view all fields, allow auto-binding
* Current User’s Related Company is This User’s Related Company and Current User’s Role is ‘Company Member’ > view selected fields, don’t allow auto-binding
* Current User is This User > allow everything

### Company <a href="#e8apxoydszsh" id="e8apxoydszsh"></a>

This is a very important data type for SaaS structures because it’s the most parent entity that will help you segment the rest of your app’s data in a single application. [Sub-app](https://manual.bubble.io/help-guides/customizing-an-application/sub-apps) structures don’t require this as much if each sub-app is created per company, in which case, they’re already given independent databases. Whether this data type represents a “Company” or an “Account,” make sure all other data types whose records are unique to their parent have a field that ties back to this record.

#### **Suggested fields on this type**

* Name (text)
* Admin (User): While this field isn’t necessary (as long as you can identify Users by their role and related Company), it’s a very handy “shortcut” to the Company’s Admin, especially if you need to reference that user often.
* Related Subscription (Subscription): This is a reference to the custom Subscription record created for this Company. It’s another shortcut field that is typically helpful if you have multiple pricing plans that tier off features. Having quick access to the “Company’s *Related Subscription’s Plan” can make it easier to create conditional expressions.*

#### **Privacy rules for this data type**

Users should only be able to access their own Company’s record, which you can do with the following: Current User’s Related Company is This Company > allow full access

If you have a User Role for a System Admin (i.e. yourself, the app owner), then you can create a more global rule to give you access to all Companies, like this: Current User’s Role is System Admin > allow full access

The default “Everyone Else” rule should have all access options disabled. If the user is not a part of the Company nor a System Admin, then they cannot access the Company record in question.

### Plan <a href="#id-6qu28i5l5qqb" id="id-6qu28i5l5qqb"></a>

This is a helpful data type to organize all your subscription plan levels. Our example includes an ID field for a payment gateway (e.g. Stripe, PayPal, etc.) so you have an easy reference to the equivalent entity on the gateway’s side. Note that this is not unique to a Company.

#### **Suggested fields on this type**

* Name (text)
* Description (text)
* Amount (number): This would be the amount charged for every billing cycle. E.g. 50 if frequency is set to “Month” vs 500 if frequency is set to “Year” for a discounted annual plan.
* Frequency (Plan Frequency, an option set)

#### **Privacy rules for this data type**

This data type doesn’t need a privacy rule because it’s not tied to any specific Company and holds no sensitive information. It’s a general system table that describes Subscription Plan options. These need to be available to everyone, including logged out users.

### Subscription <a href="#kn3k2h1gxv26" id="kn3k2h1gxv26"></a>

This record saves the unique combination of a selected plan for a Company and any details about the Subscription itself such as the active date and status.

#### **Suggested fields on this type**

* Related Company (Company)
* Related Plan (Plan)
* Active Date (date)
* Canceled Date (date)
* Status (Plan Status, an option set): This is a helpful field to keep track of which Companies are active or not and what kind of access they should have.
* Payment Gateway ID (text)

#### **Privacy rules for this data type**

Create rules that give the System Admin and Company Admins access to this record:

* Current User’s Role is System Admin > allow full access
* Current User’s Role is Company Admin and Current User’s Related Company is This Subscription’s Related Company > allow full access

### Customer <a href="#id-3d4g95k0h4j5" id="id-3d4g95k0h4j5"></a>

This is an example of a Company resource they might need in a SaaS app. Each Company would have their own Customers to build out their CRM. Again, don’t forget to include the “Related Company” field so that Company users can only have access to Company Customers.

#### **Suggested fields on this type**

* Related Company (Company)
* First Name (text)
* Last Name (text)
* Phone Number (text): While it might be tempting to create this as a number, you’ll be able to format phone numbers better for different countries if it's text. Plus, you never need to do math with phone numbers, so you’re not losing any capability.
* Email Address (text)
* Notes (text)

#### **Privacy rules for this data type**

Only System admins and Company users should be able to access Customers that are tied to their same Company:

* Current User’s Role is System Admin > allow full access
* Current User’s Related Company is This Company > allow full access

If you want to split up access to fields and auto-binding by Company Role, you can create separate rules per Role to break that down.

### Project <a href="#unskwdb4ag3j" id="unskwdb4ag3j"></a>

This is another company-specific resource record.

#### **Suggested fields on this type**

* Related Company (Company)
* Title (text)
* Manager (User): This is a shortcut field to the Company User (whether their role is Admin or Member) that is responsible for this specific project.
* Team Members (list of Users): This is a shortcut field to any Company Users that might be assigned Tasks for this Project.
* Due Date (date)

#### **Privacy rules for this data type**

Follow the same rules you created for the Customer data type.

### Task <a href="#sqhngyfjchqo" id="sqhngyfjchqo"></a>

This is another company-specific resource record and is seen as a “child” of the Project data type. Meaning, a Project is made up of a list of Tasks, but notice how we didn’t include a List of Tasks field under the Project data type. Since a Project could be long-term and potentially have hundreds of tasks, it’s better to have a one-way relationship on the Task side for performance. See [this article](https://manual.bubble.io/help-guides/structuring-an-application/data-structure#connecting-types).

#### **Suggested fields on this type**

* Related Company (Company)
* Related Project (Project)
* Title (text)
* Due Date (date)
* Completed Date (date)
* Assigned To (list of Users): Here, we chose to make this a list in case a Task should have the ability to be assigned to more than one person.

#### **Privacy rules for this data type**

Follow the same rules you created for the Customer data type.

## Option sets recommended <a href="#krr8nsqafyt" id="krr8nsqafyt"></a>

### User Role <a href="#y7pyiuymkkp7" id="y7pyiuymkkp7"></a>

* System Admin
* Company Admin
* Company Member

If your application offers different roles where access to data, pages, or even workflows are specific to that role, an option set is a great way to identify who the users are.

### Plan Status <a href="#die4oudnrzy8" id="die4oudnrzy8"></a>

* Active
* Inactive

### Plan Frequency <a href="#id-8w65ubdtlqqy" id="id-8w65ubdtlqqy"></a>

* Month
* Year

## Example uses in your app <a href="#jge3g9i9dho3" id="jge3g9i9dho3"></a>

* Viewing Projects Assigned to Me
  * Once the user logs into the app and opens up their “dashboard” page, they should be able to see a list of projects with tasks that are assigned to them.
  * The following search expressions can be used to show the user relevant projects:
    * Search for Projects (Team Members *contains* Current User)
    * Search for Tasks (Assigned To *contains* Current User) ‘s Related Projects
* Viewing My Tasks filtered by Completion status
  * The user should be able to see Tasks assigned to them and filter the list to view which ones are completed, which ones are due, and which ones are overdue.
  * The following search expressions can be used to show the user their tasks with various filters:
    * Completed Tasks: Search for Tasks (Assigned To *contains* Current User; Completed Date *isn’t empty*)
    * Upcoming Tasks: Search for Tasks (Assigned To *contains* Current User; Completed Date *is empty*; Due Date > Current Date/Time)
    * Overdue Tasks: Search for Tasks (Assigned To *contains* Current User; Completed Date *is empty*; Due Date < Current Date/Time)

## About the author: Coaching No Code Apps <a href="#yekgzloqmodg" id="yekgzloqmodg"></a>

Your database structure creates the entire foundation for your app as a whole, and because of its importance, it's one of the first things we focus on with our own clients before moving onto broader functionality. For help putting all the right pieces into place and creating a scalable app using Bubble, join a free workshop focused on scoping, building, and launching your no code app at <https://coachingnocodeapps.com/workshop>.
