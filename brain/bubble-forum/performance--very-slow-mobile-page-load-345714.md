# Very slow mobile page load
> Source: https://forum.bubble.io/t/very-slow-mobile-page-load/345714 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 4 posts · topic: performance

## Original post (by @jacob4930)

Hi everyone.

Hopefully someone in here are able to help me with me problem. I have created an app/website in bubble.io (http://bubble.io) but when I run a speed test in google speed test I get very bad results on the page loading speed. The name of my app/website is https://taskcash.one (https://taskcash.one)

I would really appreciate if someone could give me some advises on how to optimize my page loading speed on mobile.

I am looking forward to hopefully getting some good advises

Best regards

Jacob

## Reply by @emir.ozgun (0 likes)

Sorry bro , there is no actual solution rather than optimizing db or compressing images , no built-in lazy load , no working  rg loading  , no having your own cloudfare , no server outside U.S . They say they are working on it though . you can check here for median page load speed https://status.bubble.io/ (https://status.bubble.io/)  and there is a guy working on optimizing that independent of  Bubble team . To sum up , they did some things wrong in the beginning and now it is tech dept problem to solve , they say we will see part by part solutions beginning of 2025 but I don’t trust it

## Reply by @jacob4930 (0 likes)

Hmm, I am very sorry to hear this. Its not even because it is a very complex site, just very simple, and still it takes very long time to load, at least if you look at google speed test

I had hoped that there was someone who had exsperienced the same who could come with a good solution, but the problem lies in the bubble code itself?

## Reply by @emir.ozgun (0 likes)

Problem lies in 3 parts as I understand  1) Combined db structure with other users , they are leaning to seperate it 2) Code problem , bubble code is bad at defining what is necessary at page load and what is not thus loads every resuable,plugin and what is on the page . (You can see it in every option set is loading at initial  and you can check it by making a rg data source or a conditional hidden and check via wu monitor that it actually runs the search ) 3) Built-in features , bubble dropdowns ,picture uploader , groupfocus , datetime picker and other built-in features are bad  so you need to use plug-in so the conundrum starts

## Reply by @system (0 likes)

This topic was automatically closed after 70 days. New replies are no longer allowed.
