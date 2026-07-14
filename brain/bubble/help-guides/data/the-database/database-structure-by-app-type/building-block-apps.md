# Building Block Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/building-block-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Airdev, creators of the Canvas building framework*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

Using a building-block framework to create your custom app can help to save time and improve quality. The basic premise is to start with a simple base app, pre-configured with standard things like login/admin/account pages, and then add pages and blocks from a library of assets. By piecing these pre-fab’d components together like Lego pieces, you can avoid reinventing the wheel and focus your efforts on the parts of your app that need to be truly custom.

Building-block frameworks can be used to create literally any kind of web application, including:

* Marketplaces and ecommerce stores like Airbnb, Etsy, or Upwork
* Project management, CRM, or productivity tools like Trello, Asana, or Pipedrive
* Social media, forum, or messenger platforms like [Twitter](https://notrealtwitter.com/), Reddit, or WhatsApp
* Analytics & data visualization dashboards to support a process
* Anything else – the world is your oyster!

There are typically a few user experiences that are consistent across platforms (and included in a building-block framework):

* A homepage and supporting marketing pages to entice and inform potential users
* A login page where users can enter credentials to access personalized content (this is often available as a popup too, in case other pages require signup)
* An account settings page, where users can update their credentials and technical settings
* An admin dashboard, where app owners can access key metrics, users, and other key data objects to manage their platform

Below is an overview of the data structure that may be useful in a base template. From there, you will add the data objects and fields that are custom to your app (e.g., connecting a user to their upcoming rentals, or the candidates vying for their gig, or their outstanding projects, or new unread messages).

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

The core of any app is the User, which can come preset with data fields that are useful across all app categories. The App settings object is independent from users since it is at the app-wide level, helping to store general variables that could be accessed by different users at different points in their user journey.

### User <a href="#h.div9tinuokjh" id="h.div9tinuokjh"></a>

Someone who can access the application by logging in.

#### Suggested fields on this type

* Email (text): the email address the user signs up with
* Name (text): alternatively, you can separate first and last into two fields, and have a third representing full name
* Profile picture (image): a nice mugshot to be displayed with their profile
* Role (Role - an option set): role within the application (member, admin)

#### Suggested privacy rules on this type:

* Users can access their own info
* Admins can access any user’s info
* Everyone else can’t find or access any user info (this can always be opened up later depending on the app’s purpose, but it’s best to start conservative)

### App settings <a href="#h.pz1buqzku5" id="h.pz1buqzku5"></a>

This is a handy way to store all sorts of information about the app itself that you’ll need to reference throughout the app. You’ll only have one entry in this table, since there is only one app. Keeping these in the database rather than hard-coding them in the app allows you to change them on the fly and have the change permeate throughout the app (e.g., if you change your app name from AirBnB to Airbnb).

#### Suggested fields on this type

* App name (text): the name of the application
* App description (text): a short description of the app, to be used for SEO purposes
* Logo (image): the official app logo (you may want to have a separate field for light/dark versions, or for a favicon)
* Terms (file): the legal terms to be accepted by users (this could also just be a text field)
* Privacy policy (file): same as above
* Primary color (text): the hex code for the app’s primary branding color, which can help dynamically define buttons and other assets

#### Suggested privacy rules on this type

* Anyone can find and access this record, since its data is often used in marketing pages (i.e., for logged-out users)
* Specific fields may be deemed sensitive and can be protected to just administrators

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

### Role <a href="#h.a41gxpkx1e8q" id="h.a41gxpkx1e8q"></a>

* Standard
* Admin

Having an option set for high-level application roles is useful for any application. This might be buyers vs. sellers, participants vs. owners, or other distinctions (and every app has an admin). This will affect what data the user has access to, and what they can see and do in the app. This is primarily used with the User data type.

## Example uses in your app <a href="#h.jge3g9i9dho3" id="h.jge3g9i9dho3"></a>

Examples of data searches will vary widely depending on the use case of the application, but the admin dashboard will likely come preloaded with some key searches:

* New users this week: Search for Users where Date created > Current date/time + -X days : count. Note: other common Users searches include:
* Users waiting for approval (if the app is invite-only)
* Inactive users (no activity in the past X days)
* Users of a certain type (e.g., buyers, sellers, trainers, students)
* To get any app setting: Search for App settings : first item, then use the field of the particular setting you want. This search is trivial because there is only one entry in the database, which contains all the needed fields.

## Additional notes <a href="#h.8zfpl9lbgo9s" id="h.8zfpl9lbgo9s"></a>

There are building-block frameworks out there that Bubble users have created. Using one of these can give you a jumpstart on building your own application. Selecting a building-block framework to work with involves a certain level of commitment. Below are some factors to consider:

* How many people have used the framework (i.e., social proof)
* How extensive the library of assets is
* How well the library covers the types of features your app is likely to need
* The feature set included with the base application
* How easy it is to learn to use the system, and the level of support you can get
* How its design conventions fit to generally accepted standards

## About the author: Airdev <a href="#h.6nxku2d514zc" id="h.6nxku2d514zc"></a>

Airdev ([airdev.co](https://www.airdev.co/)) is the original and largest Bubble development agency, and creators of Canvas ([build.airdev.co/canvas](https://build.airdev.co/canvas)), the #1 Bubble template and building framework.

Headquartered in San Francisco, we have spent the past 7 years developing a unique process for bringing ideas to life using Bubble. This includes:

* A globally distributed network of the best Bubblers in the world
* A building framework (Canvas) that provides best-in-class design and functionality to every app at 10x the speed
* A custom process facilitated by our Bubble-built project management tool

We have served hundreds of clients ranging from sole non-technical entrepreneurs to funded fast-growing startups to Fortune 50 enterprises. Our mission is to eliminate the technical barriers to bringing great ideas to life, and to provide great no-code careers to a new breed of product builders (see our [Partners program](https://www.airdev.co/partners)).
