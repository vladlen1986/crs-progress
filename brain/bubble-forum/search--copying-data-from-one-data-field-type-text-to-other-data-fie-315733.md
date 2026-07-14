# Copying Data from one Data field type text to other Data field type option set
> Source: https://forum.bubble.io/t/copying-data-from-one-data-field-type-text-to-other-data-field-type-option-set/315733 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 5 posts · topic: search

## Original post (by @DuarteIvo)

Hi,

I’ve been studying and trying different workarounds in order to Copy a Data entry in my Data Base from a Data Field type Text to a Data field type Option Set (previously defined in the Options Sets).

First let me tell why I need to do this:

This data is coming from an API Call that I save in my data base. Then I apply a backend workflow so I can guarantee the data is cleaned (like :trim and :uppercase) so it will for sure match exactly one of the options of my option set.

Second let me tell the challenge I face:

Just so you know I have 2 Data Fields I need to do this, one with 308 options (the number of Cities in my Country) and another one with more than 800 options (the number of economic activities in my country). This being said, I found a workaround that I’m using in other data field (not the previous 2 that I mentioned) that what it does is after a data record is added to the data base and after the data is cleaned automatically is scheduled a backend workflow, that will look for the right option to save in the final data field. You can see the image below.

[image]
Screenshot 2024-04-02 at 20.51.502716×618 63.4 KB

But this was only possible because in this case the number of options were only 11. Having this approach to the previous 2 data fields I mentioned is just not feasible to setup and as far as I understand it wouldn’t be very efficiently in terms of  processing it.

Can anyone help me with ideas on how to solve this?

I read that using algolia could be a possibility to solve this searching and matching challenge?

There’s also the challenge that I can’t say it in a workflow that the “City - transition” = “City” because the City - transition is type text and the City is type “My Country Cities” (the option set).

Sorry if I’m being confused in the challenge and explanations.

Thanks a lot

## Reply by @edgarmolen97 (2 likes)

Hi @DuarteIvo

If you’re using Option Sets, you don’t really have to search, as long as the text you’re tring to input is the same as the Option Set’s Display.

Example. If your DB has an option set field “City”, you API call shows, for example, “LOS ANGELES” and you have an option set called “LOS ANGELES” you can directly input this TEXT from your API (or the :trim :uppercased version) into the Option Set field in your DB. As long as the TEXT in your API is the same as you can set your thing’s field “City = LOS ANGELES” and that way you don’t have to do a search.

If it was a thing instead of an option set you then would have to perfom a search.

Another option is to add Attributes to each city in your DB (which would be a pain cause you have 300+), an attribute such as State (LOS ANGELES ; CALIFORNIA) and use the state as a constranint in your search to narrow down the search volume. You can do the same for Economic activity and its category. This would require your API call to have this additional information but could be a possible workaround.

## Reply by @DuarteIvo (0 likes)

Hi @edgarmolen97, thanks for your answer and suggestion.

The challenge we have is we can’t guarantee from the API Call that the City is always coming exactly as in our Option Set that’s why we have created this intermediate data field so we can clean the data and guarantee that there is an exact match afterwards. That’s why the challenge is how we copy from the Data field text “City - transition” to the Data field option set “City”.

Also, just so you know, I’m quite new to bubble, so maybe I’m not seeing exactly how to do what you suggest, so if you think your first suggestion is still a good option can I ask you to be more precise in the steps on how should I implement this workflows from the API to the Data Field Option Set?

Or instead to ask you if you know of any way of doing this without the constraints and attributes as you suggest (as we can’t also guarantee the attributes are coming from the API)? Are you familiarized with Algolia? Do you think it can answer to our challenge?

Best, and once again thanks for your generosity.

## Reply by @edgarmolen97 (0 likes)

Hey @DuarteIvo, I think I understand a little better your challange, my previous suggestion might not be the best suited.

I haven’t implemented algolia myself honestly but I went on a rabbit hole right now to figure this out and I think I got it.

There is a thing called Fuzzy Search which is basically searching with approximate inputs and the algorithm will return a list of matches, the more accurate the algorithn thinks the result is, the higher it will be in the list.

I am currently using the plugin Search and Autocomplete but its only on clientside (front end) but I just found out @ZeroqodeTeam made a Pro version of the plugin, which I just subscribed to figure this out… you’re welcome guys!

Basically this plugin (https://bubble.io/plugin/fuzzy-search-pro-1690371548656x735404350284496900/) has the has a “Server Side Search” action in the Backend Workflows

[image]

Here you can configure the settings for the search, the threashold means how “restrictive” you want to be. 0 is EXACT matches and 10 is basically Anything, so play around with it. Personally I use around a 3 to 4 on my searchbar, but its a very different use case…

Let me know if you have any specific questions about your implementation and I will do my best to help you out!

## Reply by @DuarteIvo (0 likes)

Hi @edgarmolen97 sorry for the slow answer.

I’ll try your solution and the plugin from @ZeroqodeTeam, it seems promissing what you suggest. After I try I’ll give here feedback (hopefully next week).

Best,
