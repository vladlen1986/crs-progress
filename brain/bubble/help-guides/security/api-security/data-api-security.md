# Data API security
> Source: https://manual.bubble.io/help-guides/security/api-security/data-api-security · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers security related to the Data API.

{% hint style="info" %}
This article covers the **security** aspects of using the Bubble Data API specifically. If you want to learn more about the Bubble Data API in general, you can check out the articles below:

Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)\
Article series: [The Bubble API](/help-guides/integrations/api/the-bubble-api)
{% endhint %}

The Data API allows external apps and systems to interact programmatically with the data stored in your Bubble app. It provides a set of endpoints for creating, reading, updating, and deleting data.

Naturally, giving an external system access to your app's database can open up for potential vulnerabilities, and it's important to learn how to use it correctly.

## Guiding principles in Data API security

### The principle of least privilege

As we've explored multiple times in our Security article series, [the principle of least privilege](#user-content-fn-1)[^1] also applies strongly to the Data API. We'll now go over how you can plan and execute to adhere to this principle when you set up the Data API.

> In a bank, not every employee has the keys to the vault. A teller can access the cash drawer but doesn't have the authority to authorize large wire transfers. Conversely, the bank manager might have that authority but doesn't necessarily need access to every single safety deposit box.

### Authentication and authorization

In our Introduction to APIs article we explored the two sibling concepts of *authentication* and *authorization.*

<figure><img src="/files/oCZlIIkyP1nvgenu3XOl" alt=""><figcaption><p>Authentication identifies <strong>who</strong> the client is and authorization determines <strong>what</strong> they should have access to.</p></figcaption></figure>

The way this logic is structured is no different than in real life: before you let someone in through your front door, you would want to know who it is. In that way, they *authenticate* (you recognize their face), and this allows you to *authorize* what they have access to (step into your house).

The same pattern of identification and authorization is applied in countless real-life scenarios:

* Airports: (who is the passenger? What plane do they have access to)
* Cinemas: (does the person have a ticket? To what movie?)
* Banks (who is the customer? What bank accounts do they have access to)

The reason for highlighting this in real-life scenarios is to emphasize the authentication/authorization way of thinking to your security planning. When you are planning security for your Data API, you can ask the question in exactly the same way:

* *Who* is the client trying to access my app's database?
* *What* should this client have access to?

When you combine this way of thinking with the principle of least knowledge, we have some very helpful rules of thumbs to guide your thinking:

* *Who is the client trying to access my app's database?*
  * *I need to know in order to apply the principle of least knowledge*
* *What* should this client have access to?
  * According to the principle of least knowledge – only as much as they need and not an inch more

Having established those principles, let's look at what that means in practice as you develop your app.

## Authentication

The first step in any secure transaction is that of knowing who the client is. For the Data API, this follows a range that we can split into three categories:

* No one has access (the Data API is disabled)
* Some clients have access (the Data API is enabled, but requires authentication)
* Everyone has access (the Data API is enabled, and requires no authentication)

### No one has access

Before you make any decisions regarding your app's Data API, you need to determine whether anyone should have access at all. The Data API is disabled by default, but can be enabled in the *Settings* – *API* section of your app by checking *Enable Data API*.

<figure><img src="/files/EX5JcjBVFbRQmkBWUEOW" alt=""><figcaption></figcaption></figure>

If your app doesn't need any external app or system to access the database, you can safely keep that checkbox unchecked. This keeps the Data API completely disconnected and no other security measures are needed.

### Some clients have access

The second level in our access range is to give one or more clients access, but not everyone. This is where most apps with an enabled Data API will be, and it means we need to authenticate ("check the ID") of every system that wants access to the database.

There are two ways to authenticate an external app or system without giving everyone access. To learn how to set up each one, following the article link listed below:

* **Authenticating as a user** essentially means to "log in" to your app in the same way as a regular user would. This means that you can apply Privacy Rules to control what that user has access to. This is an access level that gives you a high degree of control over what that user can and can't do in your database.\
  \
  Article: [The Data API - authenticating as a user](/help-guides/integrations/api/the-bubble-api/authentication/as-a-user)\
  \
  Using this authentication method, you will usually continue to set up rules for who can access what. Or in other words, authorization. Follow this link to continue setting that up.<br>
* **Authenticating as an admin** means to use Bubble's built-in API token system to give access. This automatically gives them full administrator access, which means the same access level as you have as the app's developer (not to be confused with any admin role you set up in your app). This access level grants extensive permissions, allowing the reading, modification, and deletion of all data in your app. Ensure it's used only with external apps or systems you trust implicitly.\
  \
  Article: [The Data API - authenticating as an admin](/help-guides/integrations/api/the-bubble-api/authentication/as-an-admin)

### Everyone has access

In this option, we disregard the authentication step altogether: the door is open and anyone can walk in. The logic then follows that since we're not checking *who* walks through the door, we can't determine what each visitor should have access to. Everyone is treated the same.

This method should only be used when you are determined to give free, public access to your database. Keep in mind this can not only affect your security, but also the amount of workload[^2] that your app consumes (as API requests will spend server resources, adding to your total workload).

To learn how to set up your Data API to offer everyone access, see the article below:\
\
Article: [The Data API - no authentication](/help-guides/integrations/api/the-bubble-api/authentication/no-authentication)

## Authorization

Returning to the bank metaphor: a person who registers as a customer in a bank needs to have access to their own account, but most would find it strange if they were given access to *all* accounts. The same logic applies to an app where you don't want to share *all* data even to people that are authenticated to use the app in the first place.

We've taken care of the authentication (who is the client), and now it's time to explore how we determine the *authorization* for those client (what the client can access). This is done in two ways:

### Enabling data types

The first step to protect data is to enable only the data types that you want to expose.

Keep in mind the following:

* Unchecked data types are **not** available in the Data API regardless of how the user authenticates
* Checked data types are exposed, but adhere to the privacy rules in combination with the client’s authentication. We'll look at data types in the next step.

<figure><img src="/files/EX5JcjBVFbRQmkBWUEOW" alt=""><figcaption></figcaption></figure>

When you enable the Data API, you will see the list of of data types that you want to show.

<figure><img src="/files/YBl0GqBkcLJUP6Nxyo0l" alt=""><figcaption><p>Click the image to see a larger version.</p></figcaption></figure>

The data types that are *not* enabled (unchecked) will not be accessible by anyone. In the example above, we have a data type *Product* that we want to share with another app. Following the principle of least privilege, we'll *only* activate that one, and keep all other data types unchecked.

This setting takes care of the overarching authorization: what data types any client has access to. In the next step we'll look at privacy rules: they provide the fine-grained control

### Privacy rules

After enabling the data types we want to expose, it's usually a good idea to use privacy rules to control *which fields* on those data types can be accessed, and *what kind of actions* can be performed.

Just like in your regular app, privacy rules are set up on a user-basis. In other words, which user you authenticate determines the level of access they have to:

* Find in searches
  * What fields and uploaded files to expose
* Make changes to
  * Create
  * Edit
  * Delete

For more in-depth instructions on how to set up the privacy rules for a data type exposed in the API, check out the article below:

Article: [The Data API - Setting up Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules)

## Data API security checklist

With the methods above in mind, let's go over the tools that secure your Data API.

* **Keep the principle of least access in mind** ([link](#the-principle-of-least-privilege))
* **Decide who has access (authentication)**\
  First, decide who has access to the data API:
  * No one ([link](#no-one-has-access))
  * Selected clients ([link](#some-systems-have-access))
  * All clients ([link](#everyone-has-access))
* **Decide what they have access to (authorization)**
  * Enable only the data types you want to expose ([link](#enabling-data-types))
  * Use privacy rules for fine-grained control over fields and editing rights ([link](#privacy-rules))

[^1]: *The principle of least privilege* means giving just enough access needed for a task and nothing more.\
    \
    Article section: [The principle of least privilege](/help-guides/security/api-security#the-principle-of-least-privilege)

[^2]: *Workload* is a measurement of 12 different activity types that together make up the total amount of work performed by Bubble to keep your app running. It's a core element of Bubble's pricing plans.\
    \
    Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)
