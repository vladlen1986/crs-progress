# Portfolio Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/portfolio-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Tinkso*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

You’ll build an app that allows people to showcase their work and self-promote their projects. Portfolio apps consist mostly of showcasing your work but many similar apps also serve as a networking site for professionals. Most of the users use it for inspiration so almost all of the data will be publicly available.

Popular examples of portfolio apps are: Dribbble, Unsplash or Behance.

While we’ll focus on data architecture, this type of app is usually made of these elements:

* Form to create a new project
* Search and display a list of projects
* Project detail page
* Personal dashboard listing the projects you have created, liked or bookmarked

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

A Project, which is the main data type, is created by a User. A user is able to create as many projects as she/he wants, each of them linked to that creator.

\
The challenge of this kind of app is to show visitors the projects that match their search, so the filter fields related to the projects are crucial. To keep consistency you might want to prohibit adding Categories, while you allow the creator of a project to create as many Tags as she/he wishes. These Tags will become new filters available to everyone, also available when creating future projects. A logged in user will be able to like a project, which will create a new Like record.

Likewise, it will be possible to build a library of projects using the Bookmark data type.

## User <a href="#h.1jfmbilc2ej8" id="h.1jfmbilc2ej8"></a>

Built-in Bubble app data type. The user can create a Project, bookmark a Project, and like Projects.

#### Suggested fields on this type

* First name - text
* Last name - text
* Email - text
* Profile picture - image
* Company name - text
* Company logo - image
* Location - geographical address
* Website - text
* Bio - text
* Slug - text: using Bubble’s built-in feature. This helps create some clean shareable profile page links.

#### Privacy rules for this data type

Since the purpose of the app is to show a user’s work and allow them be contacted, all users' fields are public and without privacy rules. Note that this also means your users’ emails are public too - you may want to make it known to users that this is the case, or later tweak your app to make emails private but still allow the outreach functionality.

### Project <a href="#h.6gqau9i9g13s" id="h.6gqau9i9g13s"></a>

Project is where all the information for a project is stored. You can add as many fields as you want to further filter the projects on the “search for inspirations” page.

#### Suggested fields on this type

* Owner - User: is the creator of this project. We don’t use in-built Bubble’s “creator” field as you may want to transfer the project to another user - Built-in Bubble fields don't allow you to edit them.
* Title - text
* Images - list of images
* Tags - list of Tags: this example assumes you want to allow your users to create and grow the number of tags and so we use a custom data type for these, as highlighted below.
* Made with - option set: on the contrary, use option sets if you do not want to let users modify the list in order to keep the choices ordered. Option sets can be faster when loading pages.
* Download with - option set
* Category - option set
* Main color - text
* Description - text
* Number of views - number: this field allows you to display how many times this page has been seen. Run a workflow each time the page is opened that increments this field: Current page Project’s Number of views + 1.
* Slug - text: using Bubble’s inbuilt feature. This helps create some clean shareable profile page links.

#### Privacy rules for this data type

For the same reasons as for the previous data type, Project has no privacy rules.

### Tag <a href="#h.3jx63byizfzt" id="h.3jx63byizfzt"></a>

After being created, users shouldn’t be able to delete this data as long as at least 1 project contains this record.

#### Suggested fields on this type

* Name - text

#### Privacy rules for this data type

Public data type.

### Like <a href="#h.aw6k98pssz0m" id="h.aw6k98pssz0m"></a>

This data type allows users to like projects. By creating a specific data type for it, it allows you to display the list or the count easily from either a project’s or a user’s point of view, e.g. how many users like a project or how many projects a user has liked.

#### Suggested fields on this type

* Creator - User - Bubble built-in field that automatically captures the Creator of a data type. You don’t have to do anything in order to set this field when creating it. It’s fine to use the built-in field here because we aren’t planning to let users ‘transfer’ their like to another user.
* Project - Project - The project being liked. Use this field as a constraint to count the number of likes associated with a specific project.

#### Privacy rules for this data type

Public data type.

### Bookmark <a href="#h.36pjk2dc0isg" id="h.36pjk2dc0isg"></a>

Similar to a Like, users can have their own list of bookmarked projects.

#### Suggested fields on this type

* Owner - User - Bubble built-in field that automatically captures the Creator of a data type. You don’t have to do anything in order to set this field when creating it. Use that field as a constraint when wanting to display to this user his own bookmarked projects.
* Project - Project

#### Privacy rules for this data type

You can choose either to make it public so that you can display users' collections, or to make it private so that only the user who this list belongs to can see it.

(Apply the following privacy rules if you want to make it private)\
\- This Bookmark’s Owner is Current User:

☑View all fields

☑Find this in searches

☑View attached files

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

All these options have only one purpose: to be able to filter the projects on the search for inspirations page. Create as many set options as you want then add a field with this set option in the PROJECT data type.

For instance, these are inspired by Dribbble’s list of options in its search capabilities.

### Made with <a href="#h.m25qh61xwixp" id="h.m25qh61xwixp"></a>

* Figma
* Sketch
* Unsplash
* Adobe XD

### Download with <a href="#h.g6k0n9ckxctz" id="h.g6k0n9ckxctz"></a>

* Figma
* Sketch
* Unspash
* Adobe XD

### Category <a href="#h.my95bcluragd" id="h.my95bcluragd"></a>

* Animation
* Illustration
* Branding
* Web Design
* Mobile

## Example uses in your app <a href="#h.jge3g9i9dho3" id="h.jge3g9i9dho3"></a>

* Show and filter projects: Do a search for Projects and add as many constraints as you need. Make sure to tick the box “Ignore empty constraints” in order to display items even when inputs are empty otherwise the list will be empty. Sort the list by descending Created date (Bubble in-built field) to show newest projects on top.

![](/files/XeM2rFrIEbmZmNP7NgGz)

* Display each project’s number of likes.

![](/files/AfI62V9jMDWqlvXDS6hm)

* Display Current user’s bookmarked projects. If you choose to make bookmarks private with privacy rules, you don't even need to add a constraint.

![](/files/Ndp8PDKmcNbG5YSs43rf)

## About Tinkso <a href="#h.1jd8pg8yj8x2" id="h.1jd8pg8yj8x2"></a>

Tinkso ([tinkso.com](https://tinkso.com/)) is a pioneer and leader in professional no-code and low-code product development. Our unique approach allows our clients to run successful businesses, raise millions in funding and scale professionally. Our suite of tools consists of [openBuild Framework](https://openbase-template.bubbleapps.io/), [openBuild UI Builder](https://www.openbuild.io/?tab=Navigation%201) and a range of other tools, turns makers, freelancers and businesses in professional Bubble app builders.
