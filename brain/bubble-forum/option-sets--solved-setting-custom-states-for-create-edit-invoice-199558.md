# [SOLVED] Setting custom states for create/edit invoice
> Source: https://forum.bubble.io/t/solved-setting-custom-states-for-create-edit-invoice/199558 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 40 posts · topic: option-sets

## Original post (by @darren.james7518)

Hi guys,

I am finding it hard to make my custom data display correctly.

My users can create invoices and add line-items. When you click ‘Add item’, I store the line item(s) as a custom state.

[image]
li724×460 17.7 KB

Here’s how a line-item is saved to the custom state:

[image]
2978×440 22.5 KB

The user then sees their line item updated immediately on the invoice page;

[image]
1910×567 121 KB

The issue

I’ve made the LineItem’s Data source `create-invoice's _stored_lineitem` which successfully adds line items to the invoice as the user is creating it. But, when a user later returns to view or edit an invoice, the line-item data is missing.

The only way I can get it to show line-item data is to make the LineItem’s Data source `Parent group's Invoice's LineItem`, but then new line items don’t get added to the invoice as the user is creating it.

Currently I seem to have a choice, either show line-items when creating an invoice OR show line-items when returning to an invoice, but I need both to work! Does anyone have any suggestion on things I could try?

## Reply by @adamhholmes (0 likes)

How are you setting the custom state list for existing invoices? (I’m guessing you’re not, which is why the list is empty).

In any case there are two simple solutions…

The first one:

Just use a conditional data source on the RG:

If the Parent group’s Invoice is empty set the datasource as the custom state list.

If it’s not empty set the datasource as the parent group’s invoice’s line items.

The second option:

Just be sure to set the custom state list to the invoice’s line items any time you open the relevant group (i.e. the invoice Group)

## Reply by @darren.james7518 (0 likes)

Thanks Adam for the quick reply. I did try both these options but neither worked, I possibly did something wrong so here’s how I implemented both solutions.

[image] adamhholmes:

> 

The first option:

Just use a conditional data source on the RG:

If the Parent group’s Invoice is empty set the datasource as the custom state list. If it’s not empty set the datasource as the parent group’s invoice’s line items.

The LineItem’s Data source is`create-invoice's _stored_lineitem` and I added this Conditional Data source, however line-items still don’t display when returning to the invoice.

[image]
1697×348 52.2 KB

> 

The second option:

Just be sure to set the custom state list to the invoice’s line items any time you open the relevant group (i.e. the invoice Group)

Again, the LineItem’s Data source is`create-invoice's _stored_lineitem` and I set the custom state list to the invoice’s line items on the button you click to go to the invoice group, however line-items still didn’t display.

[image]
21109×475 29.6 KB

## Reply by @adamhholmes (0 likes)

You’re saying when it ‘is empty’. It should be when it’s ‘not empty’

I don’t know why the second option isn’t working but I suspect it’s because you’re using a go to page action, which is probably wiping the custom state (I’m not sure why you need to go to page action on a single page app?)

## Reply by @darren.james7518 (0 likes)

Ah true, thank you I will change it to when it’s ‘not empty’ and re-test.

I am indeed using a go to page action, I’m impressed how you can know these things without checking, you know so much about Bubble! The reason I am using a ‘go to page’ action is because then the back button will work on my SPA. I noticed several tutorials recommending using ‘go to page’ actions on a SPA but I am sure there are pros and cons.

## Reply by @darren.james7518 (0 likes)

[image] adamhholmes:

> 

You’re saying when it ‘is empty’. It should be when it’s ‘not empty’

The following didn’t work, returning to old invoices did populate OK, but there were two problems;

- new line items don’t populate on the invoice

- when ‘create new invoice’ the invoice page shows the last viewed invoice

Here’s the code I used:

[image]
Screenshot 2022-03-31 111002431×528 22.4 KB
