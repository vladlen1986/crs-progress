# [Product enhancement] New page load speed improvements
> Source: https://forum.bubble.io/t/product-enhancement-new-page-load-speed-improvements/298782 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 12 posts · topic: performance

## Original post (by @jennifer.javier)

Hi everyone, my name is Jennifer, and I’m a Lead Technical Product Manager at Bubble.  Excited to announce we’ve cut our JavaScript payload by 7%, saving over 300kb per page load. This means faster load times for all apps built on Bubble!

This little update is just the beginning - it’s a step towards significantly faster load times across Bubble in 2024.

We’ll keep everyone updated on further improvements we make in the new year. Happy Holidays!

## Reply by @jennifer.javier (9 likes)

Hi everyone,

I wanted to offer a few more details about these improvements and answer some common questions:

Overview of size changes over time:

- Beginning of 2023: Started with a JS file size of 2.8MB. This grew to 3.9MB due to new features and additional inclusions (even with browserify and terser minification).

- April 2023: Shifted to esbuild. File sizes remained at 3.9MB post-esbuild switch.

- Mid-December 2023: Implementing tree shaking (still an ongoing effort) brought us down to 3.4MB. You can reference archived pages to verify previous file sizes using https://archive.org/ (https://archive.org/).

Minification context:

- Our current approach to minification is less aggressive in shortening names compared to earlier in the year. This change means we can’t directly compare current file sizes with those from before.

- It’s the compressed file size that really matters for download speeds. Compression algorithms work to eliminate repeated data, including longer names.

- File size primarily affects download time and parsing / processing time. The impact is more significant on mobile devices with slower connections and CPUs.

WU clarification:

- WU costs for loading pages are fixed, and client-side speed enhancements don’t influence server resource consumption.

Continued optimization efforts:

- We are working toward having both tree-shaking and minification for optimal performance and minimal file sizes.

Happy upcoming holidays everyone!

## Reply by @dorilama (8 likes)

[image] jennifer.javier:

> 

Excited to announce we’ve cut our JavaScript payload by 7%, saving over 300kb per page load.

I’m sorry but where is the data supporting this claim? From a new app created in april to experiment with WU I have recorded the network tab on a page and the js size in Byte is:

early.js 23813

run.js 2546522

static.js 20335

dynamic.js 53320

total 2643990

Same app, empty page, tested just now, the js size in Byte is:

early.js 24223

pre_run_jquery.js 89795

run.js 3430277

static.js 602301

dynamic.js 96629

total 4243225

What am I missing?

Edit: I was not on the last bubble version. I updated to version 28 and tried again:

early.js 24223

pre_run_jquery.js 89795

run.js 3402494

static.js 602301

dynamic.js 96732

total 4215545

Maybe this is another optimization that happens only in the live app? I always assumed there wasn’t a build step before deployment of the live version.

I am sure I am missing something.

Edit2: I created a new empty app and repeated the load of an empty page:

early.js 24223

pre_run_jquery.js 89795

run.js 3402494

static.js 16608

dynamic.js 88053

total: 3621173

Edit3: mystery solved [image]

The size went up after april and this is the initial result of the work done to bring it down.

## Reply by @samnichols (7 likes)

- Great!

- If the JS has become more efficient, will this also mean reduced WU usage? One would guess that if Bubble itself is loading less resources and therefore reducing page load speed, it should affect our usage charges as well.

## Reply by @jennifer.javier (7 likes)

Great questions, we’ll be circling back with some detailed answers next week!

## Reply by @bcart0v (6 likes)

Just my 2 cents, but personally I don’t feel like these tests don’t paint an actual picture of… well anything. I spent lots and lots of time focusing on these numbers, trying to decrease page load times anywhere I could, meanwhile not one of my clients complained about speed.

In comparison, here’s Microsoft Office’s webpage performance

[image]
image1708×1774 295 KB

Vs my Bubble app

[image]
image1668×1638 253 KB

To be honest I haven’t checked these statistics in well over a year, and they are much better than the last time I checked them!
