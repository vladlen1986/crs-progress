# Page load speeds and SEO optimizations
> Source: https://forum.bubble.io/t/page-load-speeds-and-seo-optimizations/347174 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 14 posts · topic: performance

## Original post (by @boston85719)

Don’t hold your breath waiting for any tangible improvements to page load speed

## Reply by @boston85719 (8 likes)

[image] boston85719:

> 

Don’t hold your breath waiting for any tangible improvements to page load speed

[image]Monthly Community Update -- November 2024 (https://forum.bubble.io/t/monthly-community-update-november-2024/346578/24)

> 

@boston85719 Why not?

Because we have been requesting this for over 6 years now and it has not been done…plus, when I’ve asked higher ups in Bubble about this, they provide honest replies that it is a technical challenge that likely will not be overcome anytime soon, if ever. Plus, it is an issue with Google as well, in terms of how Google treats javascript based sites differently from HTML, and Google just didn’t keep up with the times in how websites were moving toward more being created with javascript rather than HTML and so Google needs to also make some alterations into how they calculate a performance score for sites built with javascript.

At the end of the day though, Bubble still could do things to improve it, but as mentioned, higher ups at Bubble have indicated it is a challenge likely not being undertaken anytime soon. One of the biggest drags on performance is the usually 2-3 second first load of javascript, which is essentially just accessing your site.

Below are screen shots of lighthouse report from a blank page.

[image]
Screen Shot 2024-11-03 at 4.44.48 PM830×606 31.9 KB

[image]
Screen Shot 2024-11-03 at 4.44.33 PM792×604 45.1 KB

The 2,530 ms (2.53 seconds) with transfer size of 2,081.6 KiB is just loading the site, for a page that has nothing on it. This has been this way forever, and I believe is the technical challenge Bubble is not undertaking any time soon, if ever.

Unless @josh as some great news that this is being addressed in the near terms, I would say, don’t hold your breath.

## Reply by @lasse (2 likes)

Thanks for elaborating. Pretty crazy we’re talking seconds and not ms when loading a blank page.

Slow page load speed is one of the main things that makes me consider if Bubble is the right tool for the type of apps I’m building – or if I should restructure to a one-page app, which comes with its own set of challenges.

FWIW page load speed is touched upon in one of the AMAs from BubbleCon: https://youtu.be/JItxZUEeqlM?si=SqNLmZBD0FRU6dC8&t=275 (https://youtu.be/JItxZUEeqlM?si=SqNLmZBD0FRU6dC8&t=275)

Sounds like there is work being done on the issue, though I’m not sure if it falls in the “a few improvements here and there” bucket or actually is an attempt to solve the root causes (like how plugins are handled as mentioned in the answer).

## Reply by @boston85719 (2 likes)

[image] lasse:

> 

“a few improvements here and there”

That has been what it has been for a couple of years now, since Bubble has started to publicly address the page load speed issue as something they are working on addressing.

I just watched that video you linked, and plugins may play a role I guess, but doesn’t seem to be the main culprit.

## Reply by @lasse (1 likes)

Thanks, that’s pretty much what I gathered too from the videos I’ve been watching.

[image] net-tt:

> 

Sure, if you are good with code, toodle is a great option.

It’s not my impression that you necessarily have to be good with code, but sure it might help, like the way elements are called div, img etc. and it seems you have more direct access to manipulating the CSS of elements if you wish to do so. And of course having to provide your own backend, which I would imagine could be the biggest showstopper for non-technical people. But as a UX designer with outdated knowledge about HTML and CSS, none of this really scares me. On the contrary it seems like several things that are notoriously difficult to do in Bubble is easier in Toddle (for example having a reuseable element / component communicate with its parent page/element).
