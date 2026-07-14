# Brain Teaser - Social Media Engagement on Bubble
> Source: https://forum.bubble.io/t/brain-teaser-social-media-engagement-on-bubble/343828 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 4 posts · topic: search

## Original post (by @animisha45)

Hi everyone,

Context

I have become sort of a regular forum sleuth in the recent few months. The amount of knowledge I have gotten from the community is immense. It has also helped me understand many things and improve my development practices.

Some of this newly acquired knowledge led me to think about a social networking app I created a while ago with my team. It was one of the simpler apps to build, with lower complexity, beautiful UI and good results. Both the clients and the team were happy.  The app did not last long time due to lack of funding and new user acquisition.

Problem Statement for Today

If the app had scaled, there are a lot of things that might need to be updated/optimized. So what are your suggestions for the best way to handle them (keeping WUs and bubble limitations for such apps in mind)?

- Handling user reactions data [A field ‘liked_by’ = list of users seems good thought but it can handle only 50k. Also, it won’t contain further logs such as time etc.]

- If the reaction contains multiple emojis (eg. LinkedIn), how would you structure the data to get unique reactions per user without slowing the search down?

- Creating an algorithm for discovery of new people/posts/categories (I did not work on the algorithm side, so eager to see what you guys experimented?)

- Platform Scalability on bubble in general for it.

Additionally

- What would your advice be if a client approached you saying they want to build a Social Networking app using Bubble?

- Do you know an app built on bubble for social networking? Would love to check it out!

Looking forward to your responses!

## Reply by @boston85719 (3 likes)

[image] animisha45:

> 

Handling user reactions data [A field ‘liked_by’ = list of users seems good thought but it can handle only 50k

This has long time been bad practice and it is not 50K it is only 10K (unless I missed some announcement)…better to have a separate 1:1 data type - field of user and field of post - then search for this data type and constrain by post to see how many likes or constrain by user to see all posts user liked

[image] animisha45:

> 

If the reaction contains multiple emojis (eg. LinkedIn), how would you structure the data to get unique reactions per user without slowing the search down?

A single field that is of type text that you store the emojis as a list separated by comma

[image] animisha45:

> 

Creating an algorithm for discovery of new people/posts/categories (I did not work on the algorithm side, so eager to see what you guys experimented?)

Get a mathematician and move it all off bubble

[image] animisha45:

> 

Platform Scalability on bubble in general for it.

Build with best practices from start

[image] animisha45:

> 

What would your advice be if a client approached you saying they want to build a Social Networking app using Bubble?

Don’t, you are dead in the water, or at least really scale back on features, get very niche and localized with the target and be creative with monetization strategy

[image] animisha45:

> 

- Do you know an app built on bubble for social networking? Would love to check it out!

[image] (https://ledomecafe.com.au) (https://ledomecafe.com.au)

## Reply by @siddharth (2 likes)

Seriously speaking I would NOT advice a client to build their social media/network on bubble, I would perhaps say them to build a very small MVP here but not the actual product.

I would really do it in in code or low code,  with external database and dependencies.

Building a social media here is like putting all your eggs in one bubble basket, even if you have backend elsewhere.

Social media means engegment of many many users and which will cost a lot of wu, until someone wants to pay a big price tag every month it’s not possible to run a successful profitable social networking here.

## Reply by @msgiblin (1 likes)

Hi there! There’s already great advice in this thread from Bubblers who are more experienced than myself - I decided to answer this more in the way you asked - if I HAD to build this in Bubble, what would I do?

- Handling user reactions - I would create a separate datatype of ‘Likes’ with fields for user, reaction type (an option set), date, etc. A user reacting would create a new Like, but would also increase a field of type number I have on the Post itself by +1. This way I’m not having to run a count every time. I’d build in conditional formatting so if it increased to over 1,000 reactions, it would display as 1.2K, and more than 1 million would be 1.2mil, to limit having to accomodate number more than 4 digits.

- This is where utilizing a 3rd party search database like Typesense or Algolia would come in - and I don’t see how this is scalable without it. I would do an API call against the Likes stored in this database, and have them displayed. Since the unique reactions are already stored in this data, displaying that accordingly.

- Typesense, and I imagine Algolia, has some ‘matching’ algorithms based on matching common/similar numbers and words. Ideally with some sort of an onboard profile process, you have this data saved in a way that is easily parsed and matchable based on a percentage of similarity.

- All of the above.

Challenges: You’re going to run into issues with WU consumption; creating a Like, plus the subsequent 3rd party database push, is going to be at least 3WU each time something is reacted to, if not more. Without some powerful monetization tools, you’re going to have a tough time staying ahead of the cost of running it on Bubble. This might be able to be figured out by using a separate database entirely - although I know many devs will say once you get into external DB territory, you’re leaving behind many of the reasons for staying with Bubble at all (since there are other front-end web builders).

Again, I’m not saying this is the correc
…[trimmed]
