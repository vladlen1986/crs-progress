# Lightning Fast Search / Search as you type with Typesense
> Source: https://forum.bubble.io/t/lightning-fast-search-search-as-you-type-with-typesense/226412 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 52 posts · topic: search

## Original post (by @ahmed.khodeir.87)

[image] (https://www.youtube.com/watch?v=POQJvnPE9ss)[image] (https://www.youtube.com/watch?v=SmbREDHAyCE)[image] (https://www.youtube.com/watch?v=Ohc5DByHBUM)[image] (https://www.youtube.com/watch?v=2qeecak3TPA)[image] (https://www.youtube.com/watch?v=af5YtBdIWNA)[image] (https://www.youtube.com/watch?v=Mn-uGdqzhGY)[image] (https://www.youtube.com/watch?v=mWq1Srwk8wA)[image] (https://www.youtube.com/watch?v=T8lWWyX25Zc)[image] (https://www.youtube.com/watch?v=OHcocGar9K0)

[image]

[image] (https://bubble.io/plugin/typesense-1661920988130x214197804488982530) (https://bubble.io/plugin/typesense-1661920988130x214197804488982530)

- 
- 
- 
- 
- 
-

## Reply by @dbevan (1 likes)

Hey @ahmed.khodeir.87, we’re using your plugin (non-advanced solution) at the moment. It’s fantastic! Couple of points I’d like to raise.

- 

We’re currently not in need of sorting or pagination but both divs are required to be visible on the page in order for Typesense to work. Is it possible for you to make implementing sorting and pagination optional on the plugin side?

- 

Expanding from the question above, the Sort Label fields and 3 Sort By fields also seem to be required. Is it possible to make them optional as well?

Cheers,

Daniel

## Reply by @ahmed.khodeir.87 (1 likes)

@dbevan all you need is to use the advanced connector ( we call it advanced because you can add or remove or modify any widget of instant search ) and within the "Search Widgets Code you just need to add the following “Keep”:

search.addWidgets([

//this is the widget needed to create a custom search and to enable bubble input to be the search inbox

customSearchBox({

container: “#search-box-id”

}),

configure({

hitsPerPage: properties.items_per_page

}),

]

);

Here is also a quick video of how it is done:
[image] (https://www.youtube.com/watch?v=cbNcIlKIAfA)

## Reply by @dbevan (1 likes)

Great! Thanks for the quick response @ahmed.khodeir.87. I’ll reach out if I have further inquiries. Great work!

## Reply by @ahmed.khodeir.87 (1 likes)

@dbevan  Will be more than happy to support you anytime [image]

## Reply by @dbevan (1 likes)

Just to provide an update, the Advanced solution is working perfectly. Your suggested changes have eliminated the need for me to provide unnecessary sorting and pagination divs. Cheers!
