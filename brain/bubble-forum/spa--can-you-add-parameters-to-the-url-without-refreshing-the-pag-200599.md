# Can you add parameters to the url without refreshing the page?
> Source: https://forum.bubble.io/t/can-you-add-parameters-to-the-url-without-refreshing-the-page/200599 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 4 posts · topic: spa

## Original post (by @JackMorgan.xyz)

Hi,

I am building large single-page music streaming app. On this page, I am using URL parameters to “change pages” when I am navigating to different sections in the app.

When I press a button in the navigation menu I am adding a parameter to the page URL and navigating back to the same page. All my sections are set up to show or hide conditionally based on the page’s URL parameter.

I chose this method because I wanted the user to be able to press the back button in their browser to return to the last “Page” they were on.

Due to this app being a Music streaming app, I have a music player that I need to be able to play uninterrupted when the user navigates through different sections of the app.

In order for this to work, I would need to be able to change parameters in the URL without actually refreshing (navigating back to the same) page.

Is it possible to change the URL parameters without refreshing the page?

If this is not possible I will need to tie some kind of custom state to the section’s visibility rather than a URL parameter, but then I will lose the ability for the user to use the back button in their browser.

Any help to solve this problem is greatly appreciated!

Jack

## Reply by @Jici (6 likes)

You can change parameter of the current page without refreshing. If you use go to page that point to the current page, Bubble will not refresh, but update the page.

There’s also some plugins I think that can do that.

## Reply by @cmarchan (3 likes)

Interesting @Jici ! My take was that it was a page refresh. After all these years! [image]

So, we actually undergo a page update instead of a page refresh when we point to the same page…

Goes to show that one continues to learn everyday!!! [image]

## Reply by @cmarchan (0 likes)

Hello @JackMorgan.xyz !

Passing url parameters refreshes the page. No way around it.

## Reply by @system (0 likes)

This topic was automatically closed after 70 days. New replies are no longer allowed.
