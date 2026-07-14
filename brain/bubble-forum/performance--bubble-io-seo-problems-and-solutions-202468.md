# Bubble.io SEO ... Problems and Solutions
> Source: https://forum.bubble.io/t/bubble-io-seo-problems-and-solutions/202468 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 43 posts · topic: performance

## Original post (by @stuart4)

There seems to be some questions around whether Bubble SEO (http://forum.bubble.io/t/bubble-io-seo-problems-and-solutions/202468)  is an issue.

I thought I would start a thread where the problems and solutions can be contained as reference.

caveat - SEO is a black box, when people talk about SEO what they mean is ranking organically (in Google primarily).

To rank in Google you need a number of things - Good OnSite/page SEO and OffSite/page SEO.

These are a BIG topics for another thread/day, however in relation to Bubble we are talking about the OnSite - Specifically the technical SEO element - e.g what is perceived to be wrong about Bubble and why search engines are struggling with Bubble apps?

So, what seems to be the trouble?  These are the issues that I have heard about on the forum and on Twitter.

- JavaScript links in buttons not being detected on page (not good)

- Workflow JavaScript redirects

- Google LightSpeed page speed issues - typically performance

- Problems with the XML sitemaps - I am still trying to find out what this means.

- Indexing issues (likely related to javascript buttons, workflow links)

Are there any more I should be aware of?

What are the solutions Bubble should implement or the workarounds people have found - other than building the marketing aspect on another platform - lets try an address them and get them resolved.

Bubble SEO guide here: https://manual.bubble.io/help-guides/customizing-an-application/seo (https://manual.bubble.io/help-guides/customizing-an-application/seo)

Bubble states “Bubble has special logic to “send” a page to the crawlers at some point after the page has been rendered, so this is generally not a problem”

Is this a problem?

Here is another (http://forum.bubble.io/t/any-example-of-seo-success-built-on-bubble/114782) recommended thread related to Bubble SEO that is worth reading, i’ll be taking some bits to add here

## Reply by @josh24 (5 likes)

So when I run the analysis on this page it’s a classic case of throwing a bunch of unoptimised media on a page and wondering why the page takes forever to load. Otherwise it’s actually not too bad. So some really quick wins here I think.

For example:

- 

The page size is HUGE!

- 

The hero video is 4.69mb alone, but there is also another video lower down that loads on page load. Personally I’d show an optimised thumbnail and load the video if a user clicks play, of which many will not.

- 

The images are all massive and are then resized down to like 20% of their actual size. There’s also no thought on format either. i.e. some are just massive screen shot png’s vs. serving them in jpeg or webp fast and reducing the file size down.

But generally what I see in loads of cases is just poor thinking when people are putting pages together. I had a client come to me recently with an app that a developer had built for them that was importing stock data from an API.

The developer made countless mistakes but two of the major ones were:

- 

Rather then selecting the right API endpoint where you could search for a stock. They used an endpoint that pulled down all stocks and then filtered it. So to search for a stock you had to first wait for 50,000 stocks to get pulled down. Madness

- 

Then when you looked at all of this background info on the company which was like 100 points of data from the API. They did an identical API call 100 times for each of the fields they were populating.

Another classic example is loading up on plugins that load all of these heavy javascript libraries, yet you use the plugin for some super basic task.

There is a popular Bubble plugin that people use for nice looking elements like toggles etc. But it also has a loading element and whether you use that or not it’ll load the Lottie player on each page load. So you add seconds to your page load for absolutely no benefit.

I could go on all day (can’t you tell I’m passionate about this lol). Bu
…[trimmed]

## Reply by @josh24 (4 likes)

Hey @stuart4 this is super useful, thanks for putting this together! I think with most of these so called ‘deal breaker’ situations people talk about with using Bubble in a certain way, while there are sometimes actual limitations you need to work around, most often it’s an uninformed developer and a little bit of planning goes a long way. So these sorts of threads help a lot.

I think it’s also worth pointing out that unless you’re using a super dumbed down template website type platform, it’s impossible for the platform to do this well on your behalf and on-page optimization is ALWAYS going to be needed, so it’s unrealistic to expect it to just work out of the box.

## Reply by @stuart4 (2 likes)

JavaScript Buttons

These do not appear to be seen on the page even when turning on JavaScript in AHREFS

source: https://twitter.com/NigelGodfrey/status/1515303441186308110 (https://twitter.com/NigelGodfrey/status/1515303441186308110)

Solution:

To use text elements and style them out the same, but then hyperlink them.

Issues with this are if you update a page url you have to find all of these and relink them.

## Reply by @stuart4 (2 likes)

Problems with the XML sitemaps

I am still trying to find out what this means, it was message I received on Twitter when I was asking about the subject.

https://twitter.com/NigelGodfrey/status/1515260079863472130 (https://twitter.com/NigelGodfrey/status/1515260079863472130) @NigelG

Solution:

There was a bug, apparently resolved:

## Reply by @stuart4 (2 likes)

I don’t want to use anything but bubble for my front and and back end … I dont see why we should… And let’s work together.

The marketing element of any app is key to keeping it alive and one single code base makes its simpler to maintain integrate.

We can resolve all of this together.
