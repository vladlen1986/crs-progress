# Bubble suitable for very large databases? (>46,000 entries and growing)
> Source: https://forum.bubble.io/t/bubble-suitable-for-very-large-databases-46-000-entries-and-growing/320225 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 9 posts · topic: search

## Original post (by @schwbbhn)

Hello,

I am working on a database for which I would like to create an app in which the existing data can be displayed, searched and filtered.

The database has a very simple structure, but the problem is its size: at the moment there are 46,000 entries and it cannot be ruled out that there will one day be around 100,000.

Is Bubble even suitable for such a task? If this is the case, I hope that you can give me some general recommendations on how to solve this problem.

So far, this database only exists as an Excel spreadsheet.

## Reply by @georgecollier (4 likes)

[image] schwbbhn:

> 

In fact the person how answered to my question replied: “It is but as the data grows more, the filtering and database operations will become more complex and will cost more WU than before.

Then they don’t know what they’re talking about.

[image] schwbbhn:

> 

I personally have a few tables over 20k rows on Bubble databases and the WU are getting pretty high (couple million a month)

WU is a function of traffic/usage, NOT database size. WU for two similar apps with 10k rows and 1 mil rows respectively would be almost the same. They probably have an inefficient database structure or workflows…

[image] schwbbhn:

> 

Other people agreed that Xano (or Supabase) wouldbe a good choice with Bubble.

No, if you’re primarily using an external DB and using Bubble as a frontend, you don’t use Bubble, because Bubble is shitty as a frontend because that’s not what it was built for. Bubble is good because of how the UI, logic, and database all link together.

## Reply by @chris.williamson1996 (1 likes)

Your app speed varies based on your build practices, UX, and privacy rules. We have apps with millions of rows of data. 100k will be totally fine.

## Reply by @adamhholmes (1 likes)

[image] schwbbhn:

> 

Thanks for your answer. However, I assume that the resulting costs would be considerable and, above all, incalculable for me.

What costs? (Bubble doesn’t charge based on database storage)

## Reply by @adamhholmes (1 likes)

[image] schwbbhn:

> 

Well, I’ve been told this: “as the data grows more, the filtering and database operations will become more complex and will cost more WU than before”

Well, I don’t know who told you that, but having a larger database doesn’t increase WU, so that’s incorrect. A larger database might be slower to search through, but database size has no direct bearing on WU.

On a side note, I definitely wouldn’t consider 46k, or even 100k, to be a ‘very large database’, I’ve built and worked with apps in Bubble with databases in those ranges have have never noticed any real issues with performance.

## Reply by @ian11 (0 likes)

[image]
image1180×273 20.3 KB

For very rapid database searches I use Typesense integrated with bubble. It’s cheap - like $10 a month.
