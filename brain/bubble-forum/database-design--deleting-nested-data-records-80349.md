# Deleting "nested" data records
> Source: https://forum.bubble.io/t/deleting-nested-data-records/80349 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 12 posts · topic: database-design

## Original post (by @ryparken)

Good morning bubblers! I have a question which is perhaps half of bubble nature, and another half of programming. While I know how to approach it in a yes-code environment, my bubble knowledge is too shallow. Hopefully you can help me out.

I am building a tree-like data structure, where each parent element contains information about it’s (direct) children. In bubble I say something like “create Card L4-1 and add it to children field of Card L3-1”. This allows me to display the entire structure using nested repeating groups.

The problem comes when I need to delete records with ALL children (including grand-, grand-grand- and so one). As stated above, each card has a record of its children one level down, so that’s easy to delete them. However, further levels remain in the DB.

Now, Bubble allows addressing children’s children as many levels down as one wants using “:plus item”. However, there is no way to know how many children levels current record has, and it would be stupid to write a “formula” with 20 levels (and what if there are 21).

I was thinking that it should be possible not only to update a parent card’s “children” filed, but also a grandparent. But I didn’t find a way how, and again, how far up should I go?

Eventually, I was wondering if someone know of an elegant way of doing it in Bubble. Perhaps, and advanced feature or a plugin?

P.S. I am also flexible about how to structure my DB, so please be free to suggest another approach.

[image]
Screenshot 2020-02-27 at 08.01.341238×1412 53.4 KB

## Reply by @mikeloc (2 likes)

Hi there, @ryparken… so, bear with me on this one, but your post is really interesting to me, and I did some experimenting and came up with an idea that appears to work pretty well, assuming I have understood your post correctly (although I don’t know how efficient this idea would be when there are tons of cards).

The idea centers around having a list on a card that includes every card that the new card is downstream of, and I think everything from here would be best explained via an example.

First, I have a `Card` data type that looks like this…

[image]

I also have a simple UI that looks like this…

[image]

To cut right to the chase, I created all of the cards you have in your screenshot, and the resulting table looks like this…

[image]
card31513×285 19.9 KB

As you can see, every card has a list, and the list on each card contains the ID of the card itself as well as the IDs of every card it is downstream of. The workflow for creating a card underneath another card looks like this…

[image]
card4851×621 24 KB

With all of that in place, deleting a card as well as every card underneath it (no matter how many levels there are) becomes a simple matter of deleting every card where the card’s `downstream of` list contains the ID of the card that is being deleted. The workflow for that in my example looks like this…

[image]
card51018×620 20.5 KB

Anyway, I don’t know if any of what I have written makes sense, and even if it does, I don’t know if it’s a path you’d want to go down. It could also end up being a terrible idea from a performance perspective, but again, it does seem to work, and it sure was fun to mess around with.

Hope this helps… even if it’s just food for thought.

Best…

Mike

## Reply by @w.fly (1 likes)

@ryparken See my forum post here, I think it will help ya [image]  Included a working example and access to the editor so you can see how it works under the hood.

  

    

    [image]
    Help Creating Dynamic Hierarchy (http://forum.bubble.io/t/help-creating-dynamic-hierarchy/80414/5) Need help
  
  
> 
    Hey @seth.griffin and @ryparken, 
Put together a quick demo for y’all that may help.  I deal with this everyday in the 2 enterprise apps I have built on Bubble. 
Bubble shines in this area of relational data [image] 
Here’s the app: 

And here’s the editor: (I think anyone can view it?) 
 
 
@ryparken More specifically to your forum post, you have to delete from the bottom up.  In my example, when you delete a parent, I first delete the great grandchildren (if they exist), then move to t…

## Reply by @NigelG (1 likes)

If you relate the table to itself, then you can recursively delete orphans by scheduling a workflow and then keep rescheduling until it is done.

i.e. delete top level. Now search for trees where there is no parent. Delete those. Now do it again until there are no more.

Or store the “top” level ID on each row at lower levels and use that to delete all relations.

## Reply by @mikeloc (1 likes)

Hi there, @w.fly… there is no doubt in my mind that your solution has to be better than the one I proposed, especially if you are dealing with this scenario in real applications. So, if you don’t mind, would you be willing to answer a question for me, please? I’d really like to expand my knowledge here.

The main “requirement” that caught my attention in the original post was this…

[image] ryparken:

> 

However, there is no way to know how many children levels current record has, and it would be stupid to write a “formula” with 20 levels (and what if there are 21).

If I understand your solution correctly (and apologies in advance if I have completely missed the mark), it is built based on a known number of levels, right? If that’s the case, you would need to build out workflow steps for every additional level, and you could never account for a user wanting to go one or more levels deeper than you had built. Is all of that correct? If so, is a solution like mine that has a very simply workflow and accounts for any number of levels without needing additional steps just a bad idea from a performance perspective (or any other perspective, for that matter)? Again, I really would like to learn from you here, so I hope you don’t mind me asking.

Best…

Mike

## Reply by @jroberts (1 likes)

Great thread. I had the same thought this week after deleting some records that had pointers to other tables.

This is a common “best practice” with relational data structures. I’ve seen many low/no-code platform already solve this. It’s usually done as an option when you set a field as a reference to another table. That way you don’t have to manual define logic like the above solution.

The reason you need an option at the field level is that there are usually at least two common scenarios.

- 

A table of user properties like that has a field pointing to a user record. If the user record is deleted there is really no need for the properties. Many to many tables are another case. Recommended action: cascade delete record(s)

- 

A table of contact records has a field pointing to a user record as the owner of the contact. When the user record is deleted you may not want to delete the contact record, but you do want to clear the value since the pointer is no longer value. Recommended action: clear reference values.

From what I can see Bubble is handing all deletes with process #2.

I thought this would have been a great use of the database change trigger (alpha testing) (http://forum.bubble.io/t/seeking-alpha-testers-database-change-triggers/79049) but I can’t seem to get it to work. My assumption is that the delete event that Bubble is doing in the background to remove the dead pointer is not triggering a database change event.

Adding @allenyang since it’s something to consider for this the database trigger events. Or at least give us an easier way to cascade delete reference records with a field config of some sort since even if database trigger did work, we’d have to create delete workflows on every table we’d want to delete records on.

I have a good test scenario in my instance if I can test anything else for anyone. It’s a private instance that has the new db trigger feature so sorry I can’t share it for viewing.
