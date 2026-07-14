# Dynamic row addition in Repeating Group and bulk CRUD of Things using vanilla Bubble
> Source: https://forum.bubble.io/t/dynamic-row-addition-in-repeating-group-and-bulk-crud-of-things-using-vanilla-bubble/311607 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 79 posts · topic: bulk-operations

## Original post (by @artemzheg)

0. Intro

In this tip I’ll show you how to dynamically add new rows to a form (Repeating Group), fill inputs in them and bulk create multiple things with a single button click avoiding:

- any plug-in or JS (while using JS will be much easier - I try to avoid it until I have no choice [image])

- creating empty things and using auto-binding

As an example we will be creating new Tasks. Data type Task has 2 fields - task name and task description (both are “text” fields).

Here is what we will get in the end:

[image]
1. Creating custom states

We will need two custom states (CS further in the text):

- `row_numbers` [state type = number, list = yes]. This CS will be used to collect numbers (integers) and add new rows in the Repeating Group. Also it will serve as a reference during bulk things creation.

- `rows_content` [state type = text, list = yes]. This CS will be used to accumulate values from each individual row.

[image]
Screenshot 2024-03-09 at 23.29.461368×282 33.4 KB

My custom states are defined at a page level (page name = rg_row_addition), so you’ll see expressions like `rg_row_addition's row_numbers` and `rg_row_addition's rows_content` below.
2. Creating a form with dynamic rows addition/deletion
2.1 Setting up RG

Add a Repeating Group (RG further in the text):

[image]
Screenshot 2024-03-09 at 23.32.42682×366 23.6 KB

- type of content = number

- data source = CS `row_numbers`

Add required input elements to our RG. In my example I need 2 inputs to enter task name and task description:

[image]
Screenshot 2024-03-09 at 23.33.41904×110 3.43 KB
2.2 Setting up the logic to add and delete rows
2.2.1 Adding rows

Add a button/icon that will be used to add new rows to the RG. In the WF we will use `set state` action with the following expression:

[image]
Screenshot 2024-03-09 at 23.37.19638×438 25.7 KB

Expression breakdown

`row_numbers` CS is a list of numbers (empty on page load). When button/icon is clicked we are using `:plus item` to add a new number to the list. The number to be added is determined as “find the highest number in the list and +1 to it”. So when our `row_numbers` is empty - we will add number 1 to the list and the list will look like [1]. When `row_numbers` value is [0,1,2,3,4] - we will add number 5, and so on.

2.2.2 Deleting rows

To delete a row add an icon in the RG cell. When clicked → `set state` action and remove current cell’s number from `row_numbers` CS:

[image]
Screenshot 2024-03-09 at 23.43.481218×400 45 KB
2.2.3 Testing results

After completing steps 2.2.1 and 2.2.2 our logic is ready:

[image]

[image] Pay attention to the fact that row number isn’t always equal to RG’s cell index. If we have 3 rows and delete the Row #2 → Row #3 will have cell index #2. This will add us some issues like reseting inputs values while deleteing any row except the last one. Check 3.4 Fixing issues with updating indexes after row deletion for more info.
3. Storing content from each row

Before diving into details I’
…[trimmed]

## Reply by @msgiblin (4 likes)

This is incredible, super detailed, and very practical! I’ve been needing to figure out a way to do this for a bit,  I really appreciate you taking the time to break it down.

I have 2 use cases,  the first of which would fit perfectly in your example: in my app, a user can clone a recipe, make changes to it (ingredient quantities,  adding / deleting ingredients, etc). I found auto-binding very WU intensive so I opted to use custom events each time a value changed. The problem is if a user continuosuly changes a value,  adds or deletes a lot of lines (or adds/deletes continuously) I rack up a bunch of WU. Your method would solve this first use case by ensuring the WU is only counted at the end, upon Saving.

My second use case, although similar: a usee can edit their own recipe. So instead of making a copy , they’re pulling up an already created recipe under their account, making tweaks (again, quanity, add or remove line), and saving it - but it must remain the same recipe / UID. Is there a way to use what you’ve laid out above, and instead of creating mew things,  make changes to the items that changed, delete the items that were remkved, and only create the items that weren’t there before?

## Reply by @DjackLowCode (3 likes)

@artemzheg - awesome overview! The only thing I would add is having a custom and very unique delimiter that isn’t ’ ,’ or ‘/’. That way, when your users inevitably use these characters in their inputs, it won’t break the ‘split by’ logic [image]

## Reply by @ihsanzainal84 (3 likes)

I have a similar method of storing data in states for my own editable tables using RGs but i store both the row number and the data together. It’s usually row number and data (which can be a Thing’s UID) joined with a seperator (i usually use `|`).

The row number starts with 01 so it’s always sortable and I can add additional paramters to fine tune the sorting like 01a, 01b.

What makes this useful is when i need to remove a row i just use a regex to match the row parameter to remove the exact text.

When I add a new value i the list will always be sorted since a text will always sort nicely with 01|data, 02|data, 03|data.

## Reply by @artemzheg (2 likes)

[image] joaquintorroba:

> 

Not sure why but, in step “2.2.1 Adding rows”, I’mt not being able to add the “+1” when I set the state of my element (see image 1). It just doesn’t appear the “+” icon.

Turn ON new Expression Composer:

[image]
Screenshot 2024-03-14 at 22.38.26756×194 15.7 KB

This will activate parentheses feature and you’ll be able to apply `+` right after `:max` operator:

[image]

When expression is done - deactivate new expression composer if you don’t want to suffer [image]

BTW, I already have an updated draft of the tip I’ve posted in this topic, polishing some issues. In fact you don’t need a separate custom state for numbers, everything can be done without it. I hope I’ll post updated version on the weekend or in the beginning of the next week.

## Reply by @artemzheg (2 likes)

[image] joaquintorroba:

> 

Noo haha more than 1 ideally. He/she should be able to build something like:

- short

- long

- long

- url

- short

Something like this? [image]

[image]
