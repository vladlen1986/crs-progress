# Slow Performance with Repeating Group Filtering
> Source: https://forum.bubble.io/t/slow-performance-with-repeating-group-filtering/242513 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 19 posts · topic: performance

## Original post (by @umiumansa)

Hello,

We’ve built a helpdesk system. On the index, the list of tickets are listed in an RG. There are different views available, like “my requests”, or “assigned to me” or “my team’s” each showing different segments of the tickets. There is also a number of filters that are available, to filter tickets by category and so on.

[image]
image1246×824 64.3 KB

Context:

When clicking on a tab to switch view, there are two workflows kicking in:

- Reset filters to default filters for this view: these are stored in a stage on the filter and search bar of the app like so:

[image]
image1045×130 7.23 KB

[image]
image378×835 22.3 KB

- Refresh ticket list: which is basically doing a search of tickets with the filter criteria populated in state at step 1.

[image]
image1029×123 6.79 KB

[image]
image744×484 25.4 KB

You may notice the filter applied at the end, this is to filter by search terms from the search bar.

Problem:

When switching view for the first time after page load, it takes “forever” to load the list of tickets. After switching view the first time, then it’s going at a good pace, which tells me it’s an RG thing at step 2 and not the custom states set in step 1.

Here is a screen cast video to illustrate the painpoint (https://drive.google.com/file/d/1_AJ4QyX0EreSh59niw2USjinOdk66CHV/view?usp=share_link).

What’s causing this and what can I do to improve the performance? It’s really bothersome. Thanks in advance for helping.

## Reply by @rico.trevisan (6 likes)

I think this technique of chaining criteria together might be what you need. Video from the magical mind of @Andrew.Vernon

## Reply by @keith (5 likes)

I’m not following this thread closely, but I did look at @umiumansa’s video. When you see the “blue bar of death” like that it means that you are loading a large amount of data. That is, either you’re loading a s-ton of items or you’re not loading that many items, but the individual items have some heavy fields on them (e.g., as when one attaches a list of images directly on some datatype, which is generally a bad idea).

In @umiumansa’s case, they are doing `Search for Tickets :filtered`. Unless there are some constraints inside that Search that they did not show in their screenshots, what this will do is download ALL TICKETS in the database to the browser. That’s the only way that` :filter` can work.

If they want the initial load time to be shorter, they need to move some constraints into the initial Search so that the database doesn’t have to send every damn thing to the browser. Or only load the data that’s requested, when it is actually requested. It’s that simple.

As for your comment about custom states, @rico.trevisan, yes custom states only update when we Set them. If we set a custom state to be the results of a Search, the data held in the custom state is static rather than a live query to the database. So, if for example we stored `Search for all Tickets` in a custom state, if a new Ticket is created, the state will not magically update until we do it ourselves.

(There’s an additional subtlety: Things are also live queries [their primary fields will update if changed in the database]. So, if you’re storing a list of Things in a custom state and one of them gets deleted, the item at that Things position is still reflected in the list, but the Thing itself no longer exists and we would see its fields as all being empty. This is documented in the note at the bottom of

## Reply by @rico.trevisan (1 likes)

Clear. Instructive. Epic. [image]Keith

## Reply by @umiumansa (1 likes)

[image] ntabs:

> 

Size of the data being loaded in to the RG, Initial search structure, filters, number and type of elements in the cells, not utilizing styles in the elements in the RG, and a bit more.

Hi and thanks.

In the produciton version we have this issue too and we only have 109 tickets:

[image]
image936×129 8.08 KB

This surely isn’t “a lot of data”, right?

As for the data structure:

[image]
image513×765 10.1 KB

The only thing I can imagine would take some time could be attachments which are currently a list of files and which I am planning to move to a related table. However, looking at the tickets, only a couple of them have attachments out of 109.

All elements in the RG use styles.

## Reply by @keith (1 likes)

Well if you want something that holds data like a custom state but that automatically updates when the value of the expression changes, you can use List Shifter or Floppy Expression Watcher (from my Floppy plugin)       .

Both of those take a list and / or scalar expression and publish the values to one or more outputs whenever the values change. They also throw an  Initialized/Updated event so you know when that has happened.

(This is all that Floppy Expression Watcher does. List Shifter has additional features for list transformation.)

Edit: I suppose Groups also have this capability but they don’t actively generate an event when data changes, though you can watch for that using other techniques. I just find this easier with a dedicated plugin.
