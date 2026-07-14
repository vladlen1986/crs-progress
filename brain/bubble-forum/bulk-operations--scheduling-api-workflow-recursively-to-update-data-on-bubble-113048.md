# Scheduling API Workflow recursively to update data on bubble app
> Source: https://forum.bubble.io/t/scheduling-api-workflow-recursively-to-update-data-on-bubble-app/113048 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 6 posts · topic: bulk-operations

## Original post (by @dfduqu01)

Hey there,

Context

To give you a little bit of context, I’m trying to build a B2B E-commerce (Private- just for my customers) platform, where I want o display the items I have in stock, so my customers can place an order.

The challenge that I’m having right now is to keep my inventory up to date without having to do it from my development app data bulk modify. I need the internal user (administrator) to be able to do it just by clicking a button.

Problem

Therefore, I schedule an API Workflow on a list  which gets data from an external API (Airtable Plugin) from a table that contains the item number and the stock and it works well. However, since I’m trying to update 4+ rows of data (And this number will increase), I’m running into capacity issues. Most of the times the application either freezes or stops/times out halfway through

Solution

Subsequently, I believe scheduling an API workflow recursively will solve the capacity issue. The user will be able to continue working without having to wait until the whole 4k+ rows of data are updated, praying the app won’t crash, while the inventory is being updated in the back.

I’ve set the recursive API Workflow following this recommendation but it hasn’t work.
  

    

    [image]
    [New Feature] Scheduling API workflows can now be done recursively New features
  
  
> 
    Hi all, 
We had previously restricted scheduled API workflows from scheduling themselves (or scheduling another workflow that then scheduled itself).  This restriction is now removed. 
Recursive scheduled workflows can be useful in situations where you are processing an unknown quantity of data that might be quite large.  For instance, the following workflow will make sure every Thing in your database has been processed within 7 days: 
 [39%20PM] 
 [45%20PM] 
Processing data this way is generall…
  

Here you have screenshots of how I set it up:

[image]
Screenshot 2020-09-19 at 11.33.25 AM1520×880 83.5 KB

Step 1) Schedule an API workflow “Inventoryupdatetest” when a button is clicked. Make changes to a thing. I created a date field to record the date and time it is updated, to be able to constraint those things that have been updated already. (See screenshot above)

[image]
Screenshot 2020-09-19 at 12.19.05 PM1546×836 82.6 KB

Step 2)  Schedule the same API Workflow “Inventoryupdatetest”(LOOP). With condition. Only when Things last_process < current date/time +(days): -3 (See screenshot above)

However, when I run test and check on the server logs, it says action condition failed in step 2.

If any one could give me a hand or point to me what I’m missing I’ll be so grateful.

DFD

## Reply by @dfduqu01 (1 likes)

Hey @J805, that makes sense. I created the Last_processed field for this specific feature so it is indeed empty. I think that can work. I’ll make the adjustments and get back at you to let you know. hope it works [image].

Thank you so much! [image]

## Reply by @dfduqu01 (1 likes)

Hey @J805, that was exactly the issue. I cannot believe I wasn’t able to see it myself [image]. I guess sometimes you just fail to see the details… you get that tunnel vision.

Anyway, thank you for perspective on the issue. [image]

## Reply by @J805 (0 likes)

Hey there [image]

I know it’s frustrating when things don’t work. It’s hard to know without looking at everything. I can give you a guess. Just an idea:

One thing to check is if you have a date in the last processed field. If this is empty it won’t run the workflow. You can do another recursive workflow where if the date field is empty add a date -4 days so next time you run the workflow it will trigger.

Hope that helps! [image]

@j805 www.NoCodeMinute.com (http://www.nocodeminute.com/)

For All Your No-Code Education Needs:

- One-on-One Tutoring

- eLearning Hub

- Video Tutorials

- No-Code Classes

## Reply by @J805 (0 likes)

Sounds good! Hope it works! [image]

## Reply by @J805 (0 likes)

Yes. Sometimes that happens to me too! Glad I was able to help! [image]
