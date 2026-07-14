# Create new thing from repeating group
> Source: https://forum.bubble.io/t/create-new-thing-from-repeating-group/293595 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 6 posts · topic: bulk-operations

## Original post (by @malte.huener)

Hi there,

actual I have a free plan to test.

I ve got a repeating group with questions where I added an input text for the answer and want to save all answers by create new thing.

I add a submit button and add the workflow. But…

My Problem is, that I do not get the individual values from that repeating group .

I can access the Repeating Group Question’s List of Questions, but not the specific value…

Can someone guide me?

## Reply by @J805 (0 likes)

Hey @malte.huener [image]

Welcome to the Bubble Community [image] [image]

There are a few ways to do this, if you already have a thing in your database that you are trying to update in the repeating group, then you can right click on the input and click Edit Workflow. Then you can make changes to the current cell or parent record. Does that make sense? I can create an example for you if need be. [image]

Edited: Here is an example for you [image]

Editor: 
[image]

## Reply by @malte.huener (0 likes)

HI @J805,

thanks for the warmly welcome and your fast answer…! [image]

To precise my question:

ich have datadriven repeating group which displays my questions (Fragen):

[image]
Maltehuener___Bubble_Editor2348×1796 246 KB

My questions are in Data Type “Fragen”:

[image]
Cursor_und_Maltehuener___Bubble_Editor3214×838 197 KB

The Answers (the dropdown and input field to every question) I want to insert into “Antworten” - create new thing:

[image]
Antworten_Maltehuener___Bubble_Editor3206×682 124 KB

But I do not get workflow running,  how to iterate trough the repeating group, that I can insert the answers into “Antworten”:

[image]
workflow_Maltehuener___Bubble_Editor3402×1652 284 KB

## Reply by @malte.huener (0 likes)

This above question  is the light version of functionality.

Normally I want to create a new thing for every answer

HubSpot_ContactID | FragenID | answer dropdown | answer input

this is how I would to do it in SQL. For every answer a new Row with keys HubSpot_ContactID && QuestionID

Maybe there is also a way to get it done is this way? But both ways are interesting for understanding bubble…

Thanks a lot [image]

## Reply by @batuhanmerguz (0 likes)

I don’t exactly see your database right now. However, “Schedule API Workflow on a List” should solve your problem in your case.

## Reply by @J805 (0 likes)

Hey @malte.huener [image]

Try combining questions and answers into one data type. Then have the answer saved onto the question. When a new user signs up, copy your list of template questions for the user so they will be able to answer them. Does that make sense? [image]
