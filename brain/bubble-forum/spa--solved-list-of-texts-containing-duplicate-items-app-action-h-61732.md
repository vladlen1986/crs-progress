# Solved: list of texts containing duplicate items. App action history & 'back' button
> Source: https://forum.bubble.io/t/solved-list-of-texts-containing-duplicate-items-app-action-history-back-button/61732 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 8 posts · topic: spa

## Original post (by @jon2)

Bubble’s inability to work with lists containing duplicate items has been a thorn in my side for some time.  Without this you can’t easily construct a history / back feature on a single page application.  I hadn’t found a solution on the forums so I’d thought to share my own tutorial.

The task:

Store historical actions (i.e. previously viewed pages, actions, etc) on a single page application without involving the database, custom JS, or URL parameters.

The problem:

If you want to store historical data (i.e. a list of previously viewed page views) as a state on the page, it would  make sense to use a list of texts to store the data.  Unfortunately, bubble doesn’t have an easy way to work with list of texts containing duplicate items, which makes it impossible to implement a page history and save it into a page state.

In general, being able to work with lists that can hold duplicate values has many benefits.

The solution:

Use bubble’s regex feature to work with a single text value, which is comma-separated. Regex can parse this comma-delimited text string into a list of texts which can hold duplicate items.  The list of texts that is returned by regex can be worked on like any standard list in bubble.

Quick example: Navigating back

- Regex to get the text value of last item in your comma-separated list.

- Navigate to the value of last item

- Use find/replace to delete last item of the comma-separated text

…The new last item in the list is what the 2nd to last text item was previously (and so on)

In depth step by step

This is as I’ve done it - other ways certainly possible/better for individual needs.

This step-by-step assumes a few things.

- Your various page ‘views’ are already setup to show/hide based on a page state of type text (i.e. ‘current view’ = “Settings” )

- 

Create a page state called ‘navigation history’ of type text (do not set to a list)

- 

Create reusable custom page workflows for ‘Navigate to’ and ‘Go back’

- 

Custom workflow ‘Navigate to’ should have a text input so that text input can be used to trigger any new view from within the workflow.

- 

Navigate forward (store item into list)

4a. Every time your workflow navigate to view is triggered the following workflow step will add a new item to the ‘Navigation History’ text (remember: this is a single text, not a list)

[image]
image1555×294 62.1 KB

If this is the first item, we want to store it differently than if it is 2nd-Nth item so we check if it is and use the conditional text option

4b. This is the formatting for each condition.

Notice that if the list is NOT empty, that we take the current value:

`page's navigation history`

and then concatenate:

`, page's current view`

onto the end

[image]

i.e. page’s navigation history has the value of `settings, account, payment, orders, settings` indicating that those pages were visited in that order.  Then, we concatenate the newest page orders as `,orders` with the comma included to separate the new ite
…[trimmed]

## Reply by @jon2 (1 likes)

I should also note, that this is a good codeless solution for any scenario where you might want to use a traditional javascript array  This is a nice similar equivalent for the JS .pop() method.

## Reply by @jon2 (1 likes)

In 2022,  Bubble lists still do not support storing duplicate values in lists and that remains at the core of the issue.

Without a plugin, the only way to natively accomplish true LIFO stack (https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) (last in first out) in bubble is to use a single text field to store a list using delimited values and then using regex to parse and manipulate them. This, in turn, means a little complexity–silly as that may be.

Bubble now supports the dynamic expression feature :split by, which simplifies things a little bit since you no longer have to use regex to split your text into a list.  Things get a still little cumbersome and tricky though because:

- adding a new value to a blank list requires conditional logic for the first item to avoid inserting an unnecessary delimiter

- even though it may seem possible, bubble does not have a native way to delete the last item in a list (popping).  You must still use find/replace with regex on a single text delimited list to accomplish that work-around.

Sorry there isn’t better news on this.  Crippled data structures are one of those quirks of bubble, unfortunately.  I think a lot of this has to do with guard-railing how apps are designed and  keeping things simple for devs in a no-code environment.  Still, I’m not entirely sure why it is the way it is in the case of ordered lists.

Maybe their thinking was:

- ‘how will the user know which instance of a dupe to select?’ / how would we build that in a way thats easy and code-free?

- It could have been to prevent the developer from accidentally creating very large lists by accident with duplicate data

- There was some kind of technical efficiency of this semi-ordered array.

- Maybe it was an easy starting point back in 2015 and there hasn’t been enough feedback to justify the (potentially breaking) change;

## Reply by @wang.rujingl (0 likes)

Storing you list as joined texts sounds like a good solution, but what if you hit the maximum amount of characters allowable for a string?

## Reply by @jon2 (0 likes)

What is the max length?

For a page states, I would hazard a guess that it rides the rails of JS and JS string literals, which in theory is ‘unlimited’  (the size of memory on the user system).  For the database, I assume the max length is pretty big,  this is all I could find on the forums…inconclusive:

  

    

    [image]
    What is the maximum length of a text field in the database? (http://forum.bubble.io/t/what-is-the-maximum-length-of-a-text-field-in-the-database/23902) Need help
  
  
> 
    Dear Fellow Bubblers, 
I am using Bubble to build my app back-end. There are some text fields containing a long description (or in some cases, a blog post). However, I am not able to store the data correctly - Bubble just doesn’t respond when I try to create a new entry and paste the text into the field. 
With some experimentation, it seems like the max length allowed is ~200 characters. Is there a way to get around this ? Or am I doing something wrong ? 
Thanks in advance, 
Vikram.
  

The underlying technology of the bubble db is postgres sql which, for a ‘short text’ has a 64kb size limit or 64000 characters.  Also fairly big. Assuming that its not less though.

Finally, for the alternative to what I’m describing (lists), its not clear to me if they also have a similar size limit in the DB (are they stored as text in the db?) . The reason I say this is because a ‘list of things’ doesn’t really like to be more than a couple thousand items.  A postgres array should have no trouble with this, however if you take the text limit of 64,000 characters and divide it by a thing’s 32-character UID  you get 2000

I’m certainly not an expert on this though, I’d be curious if someone knows the limits for each.

## Reply by @ryparken (0 likes)

This stuff just saved me hours of thinking and probably doing the wrong things. Thanks a million for that. However, I have found a small error, which needs to be mentioned. When you first append your history item to an empty history list, you need to add comma in front. If you don’t, regex won’t delete your first item when you navigate back, and the entire text string will be broken. As it didn’t for me, but after some debugging I realised it was always the first items that wasn’t “replaced” and I guess it was the comma.

P.S. Thanks again for such a thorough guide!!!
