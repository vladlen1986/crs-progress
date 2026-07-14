# The frontend and backend
> Source: https://manual.bubble.io/help-guides/logic/the-frontend-and-backend · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section describes the difference between workflows running on the frontend and backend

{% hint style="info" %}
The availability of backend features described in this article can vary depending on which plan you are on. You can see a comparison between the different plans on our [pricing page](https://bubble.io/pricing/compare).
{% endhint %}

Everything happening in your application is made possible by the continuous exchange of commands and data between the **user's device** (such as a computer or phone) and **Bubble's server.**

Many commands start on the user's device. For example, a user may click a *Submit* button to save something, and that command – along with the data associated with it – is sent to Bubble's server to be stored in the database.

At other times, the command may start on the server: for example, a user may have registered their account one week ago and after that week the server sends an email to the user to help with onboarding or ask them to finish a survey.

This article will explore the interactions happening between the server and will work as an introduction to the rest of the *Logic* section.

> Before diving into how Bubble's workflows, expressions, and other parts of the app logic work, it's important to understand how the user's device and Bubble's server work in tandem.

## The frontend

The frontend refers to anything that happens on a Bubble page. This is where your users interact with your app and where your workflows and expressions make that happen.

**Frontend workflows** react to what the user does, things happening on the page and changes in the user's data. They sometimes finish their work without ever sending or requesting anything from the server, but a large part of their work is done by communicating different requests over the internet and getting a response from Bubble. What they all have in common is that they are built using the front-end editor.

**Elements** are all the different things you place on the page, such as text, images, input forms and lists. They can contain static data that doesn't require information from the Bubble database, but in many cases they display data that's requested from the server, such as a user's name, a list of tasks, a product's image or an aggregated summary of yesterday's sales.

> The front-end is like a temporary universe that exists only for as long as the user has the page open. No commands or exchanges of data happen when the page is closed.

The front-end is edited every time you make changes to a page.

## The backend

The backend refers to events and workflows that run 100% on Bubble's server. They can trigger and run without user commands, and they don't rely on the user keeping their page open. They are used for a different set of purposes than the frontend, which relies mainly on what kind of action the user takes or what they are supposed to see on the screen.

For example, using the backend you can:

* Schedule a workflow to run at a specific date and time, such as:
  * Sending an email two days after the user signed up
  * Change something in the database (for example reverting the user to inactive after a 30-day trial period)
  * Processing a scheduled payment
* Run workflows as a response to changes happening in your database
* Run workflows at recurring times, such as once per week/month/year
* Accept and respond to [API requests](#user-content-fn-1)[^1] from external apps

The backend is edited in the section called *backend workflows.*

> Unlike front-end workflows, back-end workflows will trigger and run regardless of whether the user still has the page open.

### Accessing the backend editor

To access the backend, you need to follow two steps:

#### Activating the backend editor

If this is the first time you are accessing the backend editor in the currently open app, you will need to activate it in your app's settings:

<figure><img src="/files/qGXYp6jXckAot9q2amp2" alt=""><figcaption><p>The backend editor is disabled by default, but can be activated in your settings.</p></figcaption></figure>

1. Navigate to the *Settings* tab
2. Click on *API*
3. Check the box with the label *Enable Workflow API and backend workflows*

[^1]: An API request is a message sent to your app to ask for specific information or perform a specific task.\
    \
    Article series: [APIs: Connecting to other apps](/help-guides/integrations/api)
