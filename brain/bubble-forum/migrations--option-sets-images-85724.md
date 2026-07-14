# Option Sets Images
> Source: https://forum.bubble.io/t/option-sets-images/85724 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 18 posts · topic: migrations

## Original post (by @boston85719)

I am wondering about the use of option sets and images. I use a lot of SVG images as icons to have some custom icons for my apps. I previously used data types to store them, as they are usually connected to ‘options’ users would have on products such as product type.

Recently I did a quick and dirty test by having a set of 50 in an R.G. load as a data type and compared that to the load speed of the same 50 as an option set.

The option set was hands down faster, like about 4 seconds faster.

Now I have migrated a lot of these to be option sets and on a review page I use a set of four different types of option sets, one has 13, another 6, one other is 40 and the last is 50 different items in each. Each also has 3 different images (all SVGs) used as icons and the reason being they are different colors.

What I am getting is messages from bubble referencing speed optimization. It states that the downloading of images is slowing down my app performance and to optimize I should consider showing less or making the images smaller. These images are SVGs and have a very small size individually.

[image]
Screen Shot 2020-04-09 at 7.00.31 PM543×592 47 KB

I am confused on a couple issues here.

- My understanding of option sets were they do not touch the database (ie: do not need to be downloaded from the database) and that they essential were browser side or something like that. This is what makes them faster to load.

If that is the case, why would having images affect the speed at which they are loaded? Are they still needing to download those images and so still having to touch the database to retrieve them and thus not really acting browser side?

- If my SVG files are so small, why would there still be a concern of speed optimization. These file sizes are pretty tiny, and even though I am loading a considerable number, it still seems like they shouldn’t really affect the speed overall. After all, at these sizes, the total 120 or so I am loading on the page would still only average to be less than this one normal image.

[image]
Screen Shot 2020-04-09 at 7.05.34 PM928×21 6.16 KB

When I load the image above I get no performance warnings.

- This message is intermittent, hence the reason I do not have a screen shot of it as I can’t for the life of me get it to display again. I will update this post at some point if I see it again. I’ve seen it maybe 4 or 5 times over the last two days as I’ve been building this page.

edit

I got the message again.

[image]
Screen Shot 2020-04-10 at 6.09.27 PM1901×302 54.8 KB

Took a very long time for the images to load and took long time for the images to change the image source to reflect the conditionals being met.

Anybody have any insight as to why this type of warning is not persistent if in fact it is an issue regarding performance?

## Reply by @sudsy (6 likes)

Oh, ok. In that case, there is actually a way to have your cake and eat it too - i.e. deliver ALL of your images to the browser with ZERO http requests. It’s a technique often used for small design-related images such as icons, logos, etc. How? Meet our friend, the data URL (https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).

A data URL contains the actual image data in the URL itself - typically encoded in base64. In other words, the image data is simply encoded into a long string of text - i.e. the URL is the image data. It doesn’t point to a file somewhere. And because it’s just a URL, it’s served inline with the page content, so the browser can render it immediately with no HTTP request required to fetch the resource.

For instance, if you copy and paste the following into your browser address bar, you should see the logo appear immediately (even if you’re offline)…

```
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBkPSJNMjI0IDM3My4xMmMtMjUuMjQtMzEuNjctNDAuMDgtNTkuNDMtNDUtODMuMTgtMjIuNTUtODggMTEyLjYxLTg4IDkwLjA2IDAtNS40NSAyNC4yNS0yMC4yOSA1Mi00NSA4My4xOHptMTM4LjE1IDczLjIzYy00Mi4wNiAxOC4zMS04My42Ny0xMC44OC0xMTkuMy01MC40NyAxMDMuOS0xMzAuMDcgNDYuMTEtMjAwLTE4Ljg1LTIwMC01NC45MiAwLTg1LjE2IDQ2LjUxLTczLjI4IDEwMC41IDYuOTMgMjkuMTkgMjUuMjMgNjIuMzkgNTQuNDMgOTkuNS0zMi41MyAzNi4wNS02MC41NSA1Mi42OS04NS4xNSA1NC45Mi01MCA3LjQzLTg5LjExLTQxLjA2LTcxLjMtOTEuMDkgMTUuMS0zOS4xNiAxMTEuNzItMjMxLjE4IDExNS44Ny0yNDEuNTYgMTUuNzUtMzAuMDcgMjUuNTYtNTcuNCA1OS4zOC01Ny40IDMyLjM0IDAgNDMuNCAyNS45NCA2MC4zNyA1OS44NyAzNiA3MC42MiA4OS4zNSAxNzcuNDggMTE0Ljg0IDIzOS4wOSAxMy4xNyAzMy4wNy0xLjM3IDcxLjI5LTM3LjAxIDg2LjY0em00Ny0xMzYuMTJDMjgwLjI3IDM1LjkzIDI3My4xMyAzMiAyMjQgMzJjLTQ1LjUyIDAtNjQuODcgMzEuNjctODQuNjYgNzIuNzlDMzMuMTggMzE3LjEgMjIuODkgMzQ3LjE5IDIyIDM0OS44MS0zLjIyIDQxOS4xNCA0OC43NCA0ODAgMTExLjYzIDQ4MGMyMS43MSAwIDYwLjYxLTYuMDYgMTEyLjM3LTYyLjQgNTguNjggNjMuNzggMTAxLjI2IDYyLjQgMTEyLjM3IDYyLjQgNjIuODkuMDUgMTE0Ljg1LTYwLjg2
…[trimmed]

## Reply by @boston85719 (1 likes)

This sounds like a promising idea. I will check it out. Seems like it could help me out on some other image related things I’m doing such as an automatic image gallery that shifts between about 15 images on a timer every 5 seconds.

Thanks for the tip.

## Reply by @boston85719 (1 likes)

Yes, I migrated over to the HTML as it seemed to perform much better with large sets.

## Reply by @sudsy (0 likes)

[image] Matthew McGowan:

> 

What I am getting is messages from bubble referencing speed optimization. It states that the downloading of images is slowing down my app performance and to optimize I should consider showing less or making the images smaller.

I’m not entirely sure how option sets work behind the scenes, but if all the images are retrieved when a page loads, the issue might have more to do with “showing less” than “making smaller”, as the number of HTTP requests impacts page speed.

Also, keep in mind that by default, JPEG images are automatically processed by Imgix to generate a context-optimized version for your Bubble page (which is a good thing). I don’t think SVG images are processed by Imgix by default (which is also a good thing since an advantage of SVG, in addition to being resolution-independent, is that they’re generally smaller file sizes).

## Reply by @boston85719 (0 likes)

Thanks for the input. I will take a look at reducing the number of images shown on page load.
