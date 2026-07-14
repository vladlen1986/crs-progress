# Associating Quantities with SubItems in Scheduled Workflows on Bubble
> Source: https://forum.bubble.io/t/associating-quantities-with-subitems-in-scheduled-workflows-on-bubble/315946 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 3 posts · topic: bulk-operations

## Original post (by @tom18)

I’m working on an app feature that allows users to create a grouped order, like a shopping basket, which involves selecting various" SubFoodItems "and setting quantities for each. These selections are stored in two separate states/lists: one for the SubFoodItems and another for the Quantities.

The challenge I’m facing is in the workflow process where I need to schedule the creation of “SubFoodItem” records with the respective quantities and attach them to a BasketItem. The roadblock comes the Schedule API Workflow on a list, where I am unable to pass the corresponding “Quantity” for each “SubFoodItem” since it doesn’t allow for index referencing or passing a second correlated list.

Here’s the setup:

-When a user selects “SubFoodItems” and assigns “Quantities”, these are saved in two states: “SelectedSubFoodItems” (list of “SubFoodItem” data type) and -“SelectedQuantities” (list of numbers).

- Upon confirming their selection, an API workflow should be scheduled for each “SubFoodItem” to create a record, which includes calculating the total price based on the assigned “Quantity”.

-The created “SubFoodItems” should then be attached to a newly created “BasketItem”.

The main question is how to ensure that each “SubFoodItem” is created with the correct “Quantity” from the state list when the workflow runs for each item when each CS list is seperate from one another.

## Reply by @dualpixel (0 likes)

Hi,

Schedule workflow API on a list will not solve your needs.

Because, each SubFoodItem will have different values. Schedule on a list is useful to change to same value

You need to use a recursive workflow API

Here, one the best tutorial I have seen about it
[image] (https://www.youtube.com/watch?v=7cNWiA_tRvU)

## Reply by @code-escapee (0 likes)

Do you have to use states for the info? Using states for the cart items is not an efficient way to store such items as you are encountering.

Instead, create the items as the user adds them and use a db trigger to set the price upon quantity changing or upon checking out do a api wf on list for all subitems to calc the price.

## Reply by @system (0 likes)

This topic was automatically closed after 70 days. New replies are no longer allowed.
