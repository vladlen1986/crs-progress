# Redundant DB data vs Performance
> Source: https://forum.bubble.io/t/redundant-db-data-vs-performance/277282 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 8 posts · topic: privacy-rules

## Original post (by @jack17)

I’m working on an accounting application. It’s a data entry heavy application that references many  records a lot of different ways to create reports. Because of the need to advanced filtering I am already finding the need to create redundant data in my DB just for the sake of performance. Any tips out there or insight into when to do this or not to do this in bubble? Right now my opinion is if it impacts user experience, redundant data is preferred over impacting the user.  I just don’t want a lot of redundant data [image]

## Reply by @code-escapee (2 likes)

It’s a trade off that very much based on the details. There’s lot of great posts on weighing the 2. Just some obvious pointers that are worth mentioning:

- Redundant data is less of a hassle if it isn’t modified too often.

- If you are unsure how you are going to structure the data, it’s better to error on the side of being over-redundant as adding redundancies to large DBs is a nightmare in bubble.

## Reply by @msgiblin (1 likes)

[image] jack17:

> 

Right now my opinion is if it impacts user experience, redundant data is preferred over impacting the user.

This was where I’m at. Creating redundant data to the level of thing displayed in my repeating group made searches almost instant, instead of the previous Advanced: filtering required which added seconds to the search as it went through related data tables.

My thinking is yes, it’s a redundant copy,  but with the right data triggers in place,  as long as you’re still referencing the thing you populated the data with,  you can create the illusion of direct connection of all of the related tables by updating the redundant data and vice-verses.

## Reply by @code-escapee (1 likes)

exactly… got to try to anticipate all advance filters and searches and if you over redundantize then you can work backwards. using DB triggers helps keep all data in synch.

## Reply by @jack17 (1 likes)

Any opinion on Filter vs Advanced Filter? Is it primarily the Advanced Filter that causes the biggest performance hit? I don’t seem to notice Filter slowing down search, but test db I have right now is tiny.

## Reply by @msgiblin (1 likes)

If you’re Advanced is doing a deeper search,  like looking into the things’ thing’s subtotal,  you’ll see that performance hit. If you’re using advanced but only looking at the top level of the data, I don’t think the performance hit will be as drastic… but definitely would need to test as I think it still loads everything into the browser before filtering.

I found this on NoCodeAssistant, point #3:
[image] (https://nocodeassistant.com/3-tips-to-make-bubble-app-search-faster/)
[image] (https://nocodeassistant.com/3-tips-to-make-bubble-app-search-faster/)

[image]
