# Improve speed site - suggest
> Source: https://forum.bubble.io/t/improve-speed-site-suggest/175679 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 2 posts · topic: performance

## Original post (by @elisabetta.colamarti)

Hi,

A week ago I launch a site in Bubble.  Now I did a speed test on it and It’s not very good  (Performance grade: 68%):

[image]
Schermata 2021-10-27 alle 14.53.471634×872 252 KB

I want to improve this score and the first suggestion that this site gives me, there is:

"Avoid slowing down the critical rendering path

The critical rendering path is what the browser needs to do to start rendering the page. Every file requested inside of the head element will postpone the rendering of the page, because the browser need to do the request. Avoid loading JavaScript synchronously inside of the head (you should not need JavaScript to render the page), request files from the same domain as the main document (to avoid DNS lookups) and inline CSS or use server push for really fast rendering and a short rendering path. "

Also, to improve the speed site I used  the optimization bubble tool is located in tab (General), as below:

[image]
Schermata 2021-10-27 alle 15.06.501137×872 103 KB

This operation has has increased the score from 65% to 68%…I thought better!

Has anyone seen this problem before? or does anyone know how to solve it?

Thank very much for any suggests!

Elisabetta

## Reply by @ed727 (0 likes)

Hi, here’s a recent thread on this which may have some tips.  Short answer is that Bubble in its current form won’t rank high in these sorts of tests, but you can improve things at the margin by building a lighter and faster app (which should be a goal anyway).

  

    

    [image]
    Performance – basic page with poor pagespeed insights score (http://forum.bubble.io/t/performance-basic-page-with-poor-pagespeed-insights-score/174965) Need help
  
  
> 
    We’ve invested in building our landing page on bubble in order to save engineering resources. Google ad words is showing that it takes 7 seconds to load for a lot of users. 
We have no DB and have optimized the images. Its nothing crazy on the page. As a test, I only added our Footer to a page and ran it through Google’s PageSpeed Insights — performance on mobile is 18 and desktop is 28. The vast majority of opportunity is to Eliminate render blocking resources (screenshot attached). 
I’ve read …

## Reply by @system (0 likes)

This topic was automatically closed after 70 days. New replies are no longer allowed.
