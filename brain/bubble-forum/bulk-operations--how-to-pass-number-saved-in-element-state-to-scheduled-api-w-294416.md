# How to pass number saved in element state to Scheduled API Workflow for Creating list of things
> Source: https://forum.bubble.io/t/how-to-pass-number-saved-in-element-state-to-scheduled-api-workflow-for-creating-list-of-things/294416 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 8 posts · topic: bulk-operations

## Original post (by @home)

Hi everyone,

I’m currently working on building a checkout process, and I’m running into an issue with managing the quantity of products in my repeating group. Here’s what I have so far:

[image]
Bildschirm­foto 2023-11-22 um 18.10.131920×682 65.3 KB

- I have a repeating group that displays the products.

- Each product is selectable, and if it is, I save it to another repeating group.

- I’m also storing the quantity of the selected product into a element state  in the current cell.

When clicking on the yellow button below, I’m using a scheduled API Workflow on a list to create new `order_items`. I’m using a loop to repeat the process and create the right amount of `order_items` based on the quantity.

However, the problem I’m facing is that I can’t send the correct quantity (iteration) to the scheduled API Workflow, since the value is stored in the element state of the RG.  I’m not sure how to fix this issue.

[image]
Bildschirm­foto 2023-11-22 um 18.10.44770×1226 80.7 KB

Any guidance or suggestions on how to correctly pass the quantity to the scheduled API Workflow would be greatly appreciated. Thanks in advance for your help!

## Reply by @home (1 likes)

I’ll have a look at the plugin, thanks! If somehow possible without a plugin would be amazing. Maybe someone knows a workaround

## Reply by @J805 (1 likes)

@home

Ok, here is a really weird way to grab the numbers from your cart within an input inside of a repeating group.

Editor: 

[image][image]

## Reply by @home (1 likes)

Hey man, haha wow, that’s a crazy workaround!  [image] I really appreciate your effort! Thank you so much! I will try to implement it in my project today. I’ll let you know if I’m successful!

## Reply by @J805 (0 likes)

Hmm [image]

I could think of a few different ways to solve this.

Have you tried creating a thing in the database ‘checkout item’ and then just saving the values onto that? If the user leaves and comes back, it can still be in their cart that way too.

Does that help at all? [image]

## Reply by @home (0 likes)

Thanks @j80231502 for the comment! That would definitely work. I like the beauty of handling it all on client side up to the point of clicking the button, in terms of speed and keeping the DB clean. (in case I understood you right)
