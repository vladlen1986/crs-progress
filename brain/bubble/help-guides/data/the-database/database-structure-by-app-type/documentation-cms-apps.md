# Documentation/ CMS Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/documentation-cms-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Rico Trevisan from Refactoring NoCode*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

Documentation: that thing we should all be making more of, we are always lacking from others, and we never read enough of it.

The challenge of creating a system for documentation is how complex a "simple" thing can be. Luckily, Bubble allows you to grow your system as your needs grow because it's easy to refactor in Bubble.

In this guide we will create a simple blogging system that is beautiful in its minimalism, yet powerful and easy to upgrade.

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

Here are the data types I recommend:

* Page (or you could call it Post or Article or Document)
* Block
* Block Type (option set)
* Published Status (option set)

A Page is an individual blog post (or a piece of documentation) which is composed of multiple Blocks. Each of these Blocks have different types which are determined by Block Type. Each Page has a certain Published Status to allow you to have multiple drafts and only publish the ones that are ready.

### Page <a href="#h.3pxvwyrme17k" id="h.3pxvwyrme17k"></a>

Page is the anchor of our system. Everything will be built around it. It needs to be "light" enough to make searching through all posts quick. This means the Page has no body; instead, the body is made up of a [repeating group](https://manual.bubble.io/core-resources/elements/containers#repeating-group) of Blocks instead, as we’ll see below.

#### Suggested fields on this type <a href="#h.odv2zklvu6rp" id="h.odv2zklvu6rp"></a>

* Title (text): This is the title of the post. It will be used in the landing page with the list of posts, on the page of the post itself, and it will be what search engines will see.
* Slug (text, built-in field): slug is the title transformed into a URL-friendly text field.
* Description (text): The 2 to 3 sentences that give the reader a sneak peak of what's in the post.
* Published Date (date): A date of when the post has been published or of when it is scheduled to be published.
* Status (Published Status, an option set): What controls the visibility of the Page.
* Author (list of Users): Making this a list allows you to have co-authors

![](/files/h1ROv8YyBE82ycpvr2VD)

#### Privacy Rules <a href="#h.s12vnafckn5" id="h.s12vnafckn5"></a>

A rule for when “This Page's Status is published” should allow anyone to view all fields and find this in searches.

![](/files/LWcFtMtsZqqdYhNnZGvQ)

Otherwise (the default rule), it should not be visible.

![](/files/iqJvwiIIuTQ6yOAh1Ktq)

### Block <a href="#h.16h8hzhjg7ku" id="h.16h8hzhjg7ku"></a>

This is the body of each Page.

If we were to create a single gigantic Page with one field called body that houses the entire blog post, each Page would be too heavy to be able to quickly search through them and we would not have a lot of flexibility in how to display the content.

Instead, we think of each Page as a listing of all the Blocks that make up the Page’s contents. We do that by using a Repeating Group that searches for all Blocks that relate to that Page, sorted by the Index.

![](/files/ERPoYVUT1bkczpE91D99)

Each row of that repeating group contains all the different ways that Blocks can look, depending on the field called ‘Type’. All these different looks are invisible and collapsed by default, and then only the one that matches that Block’s Type will show up as visible.

![](/files/qJhMYbauW1BNNzQa4Md4)

Each block is marked as invisible and collapsed by default.

![](/files/QeiyQNYqWJtgeTigfdGN)

The Block only becomes visible if the current Block Type matches it.

![](/files/IA3BrxgcOZJzq5AOUG5S) ![](/files/satCJS8ShhEerqvrB41k)

This way we have the flexibility of styling each block differently while maintaining visual consistency for all Pages.

#### Suggested fields on this type <a href="#h.5cnfta5nbsdq" id="h.5cnfta5nbsdq"></a>

* Page (Page): This links this Block to its respective Page.
* Index (number): Since in this method you will create a bunch of blocks to create a Page, you need a way to order them.
* Content (text): This is the text that this Block will display.
* Image (image): If the block is of a type Image, this is where it will get the image.
* Image Description (text): Most blogs will have a text under an image either clarifying it or giving credit to the original owner. This field is for that.
* Type (\_block\_type, an option set): This is the field that sets how this block should look on the page

![](/files/BU1lGANu9f6b8WezblBo)

#### Privacy rules <a href="#h.dmqro9rekhag" id="h.dmqro9rekhag"></a>

We can keep it simple and have this type without many restrictions. The only restriction that might be useful to apply is one that allows an admin to allow auto-binding. In a simple case, we can consider a logged in user as an Admin.

![](/files/763Bkmtdut8LXO0m8TIs)

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

### \_block\_type <a href="#h.ei5k9uqv3tsr" id="h.ei5k9uqv3tsr"></a>

* h2
* h3
* body
* image

This is a small set that can get you started putting together content. You could add more visual flare by creating new ways to visualize blocks. Ideas that could help you expand your types of blocks: quote, a note block, an image + text, code block, YouTube video… the possibilities are endless.

Why no H1? Well, the title of the Page should be your h1 and everything else will be children of it.

### \_published\_status <a href="#h.dd15d02z5md4" id="h.dd15d02z5md4"></a>

* draft
* scheduled
* published

Simple set of status to manage each blog post.

## About the author: Refactoring NoCode <a href="#h.5ksov1duconc" id="h.5ksov1duconc"></a>

Refactoring NoCode is an educational and development agency. We create educational content to help experienced Bubblers improve their apps. We also work with solopreneurs by doing unlimited development & design on their apps.

[https://refactoringnocode.com](https://refactoringnocode.com/)

For example, we’ve created a documentation app based on these principles. Try it out yourself: [https://docengine.io](https://docengine.io/s/doc-engine?i=1642192173204x433476350563992000)
