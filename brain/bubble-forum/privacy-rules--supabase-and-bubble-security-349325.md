# Supabase and Bubble security
> Source: https://forum.bubble.io/t/supabase-and-bubble-security/349325 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 6 posts · topic: privacy-rules

## Original post (by @rafael.cunha)

Hi guys, in one of my app’s i am using bubble.io (http://bubble.io)’s database and supabase with the plugin “Supabase by Nocodegarden”.

I came across an issue when it comes to logins, since my application is hybrid I want to still use the Policies from bubble to secure some database information but I am not able to do that since the current user is logged in with Supabase auth. Is there any way around the issue?

I can only choose “current user” in the policies input but there is no current user since the user is logged in with supabase auth.

[image]
image1392×413 20.6 KB

The main reason why i am creating a hybrid app is because of SEO purposes, and because when creating a single page with dynamic content is not that easy with the plugin… i simply cannot do it… and most importantly GDPR.

## Reply by @lindsay_knowcode (1 likes)

Bubble won’t ever be able to see Supabase’s auth cookies.  So there is no concept when logged into Supabase that you have some Identity on Bubble at the privacy rule level.

Few options to consider

- 

use single sign on -  I use auth0 - max power, not complex.

- 

have workflow to log them into both at the same time.  Hacky but works. There are a lot of possible ways to do this - I haven’t settled on a best practice yet.

With hybrid you have to figure out where you want the “hackiness”.

With respect - using Supabase to fix your SEO and needing privacy rules in SEO sounds like you might have other ways to solve that problem!

## Reply by @lindsay_knowcode (1 likes)

some suggestions and making lots of assumptions …

- 

If it’s for SEO it is probably publicly readable - Events like Gigs etc - are all public and you are keen to have this public on the Web [Implication - an external database is a sensible idea for WU reasons]

- 

Using a Bubble App as the Editor for these events is convenient and practical. [Implying - Bubble is a low-cost way to implement your Event editing]

- 

Logged-in Bubble users could edit the Supabase data via the API Connector -  likely with a low volume of editing (comparing writes to reads). [Sure you don’t have autobinding, and privacy rules - but you have other benefits that are possibly more valuable to you]

That’s probably how I would do it - side step all the Users logged in where complexity. But still have an efficient Hybrid solution.

@asked111  top of your mind also [image]

## Reply by @Baloshi69 (0 likes)

As of I know, you must have a logged-in user in the bubble, it will give you a lot of features.

## Reply by @rafael.cunha (0 likes)

I didnt know about auth0, it looks promising!!! Thank you for that tip!

I was about to go for a hybrid sign up as well meaning sign up and log in in bubble and supabase but it looks like things can go wrong quite fast…

I understood your comment, hard to explain but i will try.

- The events table are stored in bubble and supabase because it requires SEO.

- The event_records which is when the user gets a ticket, is stored in supabase only.

- A logged in user should be able to create, edit, update and delete but since we are using supabase auth then how can i make sure that only logged in user can use something like “auto-biding”, i dont think it’s possible at the moment.

My logic thinking is:

All data that is supposed to be public stores in bubble and all user data is stored in supabase. But it’s important to control somehow that the user is authenticated to manipulate the data stored in bubble besides the page loading logic workflows and so on… something like policies.

## Reply by @rafael.cunha (0 likes)

That is exactly how i start building from the beginning, now I am just going around because I lose always a functionality anyway i turn.

Is there any documentation available when it comes to bubble dynamic pages where i can still get the SEO functionality, I can choose the Type of Content of the page as the API data and choose the Backup_field for URL to be and supabase id or public.event.event_name or something like that? Or do I just have to give up on that functionality…

To be fair, I have been coding around and around and at the moment I think the best is to go with supabase to end with and  forget bubble database.
