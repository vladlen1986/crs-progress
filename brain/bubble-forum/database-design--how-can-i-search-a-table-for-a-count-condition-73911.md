# How can I search a table for a count condition?
> Source: https://forum.bubble.io/t/how-can-i-search-a-table-for-a-count-condition/73911 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 15 posts · topic: database-design

## Original post (by @mano)

Hi All,

I have a table of “Items” that each “Item” is owned by a different “User”.

I would like to return a list of all “Users” who own more than 50 “Items”.

How would you approach that?

Thank you,

Mano

## Reply by @boston85719 (1 likes)

Then you should make a relation between those two tables in your database to have a better ability to get to the data you want.

Using a relational database structure so you can get to any data from any path is essential to making life easier for data manipulation / extraction and retrieval.

If you are not familiar with database structure and relational databases, you can search the forum or online for more information.

Basically a data type is like a “table” and a data field is like an entry in that “table”. You can have a data field be a data type so as to create the relationship.

In my app I would have a data type of User and a data type of item

Then in my data type of item I would have a data field of user to relate to the user data type

In my data type of user I would have a data field that is a list of items to relate to the item data type.

Then I would be able to search the table for a count condition.

## Reply by @boston85719 (0 likes)

[image]

After you create your dynamic data there are lots of choices to select from when you press “more” after the dynamic data. One of those choices is :count which counts the number of those items.

So you do a search for users:

Constraint: item list count > 50

## Reply by @mano (0 likes)

I don’t like to include a list of items in a table. I think it will create problems down the road.

I prefer to point from each “Item” to the “User” who owns it.

## Reply by @mano (0 likes)

I eventually solved it by running a search on Users and using filter: with an Advanced: condition.

In the advanced condition, I did a search on the Items table for each User separately, then run :count>50
