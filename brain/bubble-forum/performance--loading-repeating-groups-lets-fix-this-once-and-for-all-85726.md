# Loading Repeating Groups - let's fix this once and for all
> Source: https://forum.bubble.io/t/loading-repeating-groups-lets-fix-this-once-and-for-all/85726 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 10 posts · topic: performance

## Original post (by @ryparken)

Dear Bubblers,

First, please watch the video. If this seems like your problem too, please read on.

VIdeo on Youtibe (https://youtu.be/LVKFvyoB1N0) (there are 2 parts: fast and slow motion)

I have spent many-many hours of trying and researching things, and I don’t know how to solve it.  At first, I thought this was the Bubble performance problem. While not being able to confirm or exclude this possibility, I tried to find a  bypass - by showing a “pre-loader” animation. But as you can see in the video, it doesn’t solve the problem. (I even applied fade out timer to delay showing the RG.) In the end, there is a huge time gap between Bubble saying “RG has been loaded” and it actually appears to be loaded.

Also, what does Bubble consider as a repeating group?! If it’s just the table itself - then they are formally correct (and the video proves it). However, we don’t want to display empty tables, we want to display content.

In my example, I have a table with just two fields - record name and record children, with the latter being just a lit of records alike. A record on average has 2-5 children. This gotta be super-fast. There are no calculations, nothing that would make the update so slow. Yet it is.

I believe many of us have bumped into this issue, and if someone has the solution - let’s nail it down here and make it easy to find for new bubblers. Many thanks.

## Reply by @mikeloc (4 likes)

Hi there, @ryparken… let me start this response by saying I am not an expert by any means on Bubble performance (although I have spent a fair amount of time trying to optimize my own apps from a performance perspective), and I don’t have a definitive solution to your problem. So, in other words, feel free to stop reading right now.

The above being said, your post did remind me of this post in a thread from about a month ago…

  

    

    [image]
    How to detect when chart is loading? (http://forum.bubble.io/t/how-to-detect-when-chart-is-loading/81996/8) Need help
  
  
> 
    Most of the time it is the searching/grouping of data that takes the most time when plotting a graph. You can give your spinner the following condition to make it visible (you should use the condition tab): 
When ‘page loaded (entire) is yes’ and ‘do a search for count > 0’. 
The ‘do a search’ condition is here the exact same as with your graph. If you use a grouping the condition will look like this: 
When ‘page loaded (entire) is yes’ and ‘do a search for:grouped by count > 0’. 
Just make sure…
  

Yes, that entire thread is about a getting a chart to load, but I remember thinking at the time that the solution could certainly apply to other situations, such as waiting for a repeating group to load.

My thinking with regard to performance has always been that there is probably only so much us Bubblers are ever going to be able to do to make things “lightening fast” in Bubble (or even if we weren’t using Bubble, for that matter). So, it’s all about the user experience when things aren’t lightening fast, and that seems to be what you are trying to address.

If you are trying to make sure the pre-loader animation stays in place until the repeating group is actually ready to be shown, the solution in that post seems like it might work well. I mean, if the animation is being shown until a condition that is the same as the repeating group’s data source is true, then it seems like you would get 
…[trimmed]

## Reply by @SidDew (4 likes)

Worked out a pretty simple but quite ganky for my use case if it helps. Am building a quiz app, and need to show next question and answer checkboxes in a cleaner way.

Solution I used was -

- Using repeating group set to vertical scrolling, but leaving enough blank space under each group item the next item is off page.

- Adding a custom state to Next button of quesiton number

- On clicking Next

Step 1 - Set state of quesiton number value to This Buttons question

number +1

Step 2 - Scroll to entry of repeating group - Search for questions:item #button_next’s question number

.

So now have it setup to scroll through the group on click, only thing is removing the ability to scroll with cs or js, any suggestions how to do this?

## Reply by @ryparken (3 likes)

Hi @mikeloc First of all, thanks a lot for taking time to write such careful response. I went immediately to try the suggested work-around, and unfortunately it didn’t work in my case. To be frank, there may be really many reasons why it could work but didn’t - because I didn’t find one right combination of factors.

First of all, I don’t do a search, but a call for data (repeating group selected element’s children’s titles). Secondly, as mentioned in my original post,  Bubble actually loads the new RG very fast -  in the video you can see (https://www.youtube.com/watch?v=LVKFvyoB1N0&feature=youtu.be) that a the table with three fields appears almost instantly. That’s the repeating group. However, it’s the table’s content (in my case, text fields) that Bubble populates with a delay. Also, what’s not clear to me, why does Bubble keep the old values in the fields. And finally, I think that charts may just be different from RGs.

These are the excuses of the top of my head, but I can think of another dozen, like what exactly should be the combination of “page is loaded is YES” and “repeating group is loading NO”, and where it should be applied - on a spinner in Conditions tabs, on a RG in Conditions tab or in the workflow… Combinations are endless really.

I have written an email Bubble support. They gotta know their product better, so perhaps they can shed some light.

Once again, thanks for giving it a thought.

## Reply by @SerPounce (3 likes)

@ryparken I think I figured out how to use a pre-loader animation with complete precision to dissapear exactly when the RG is visible.

I also desperately needed a way to control for how long my loading distraction stayed visible until the RG was loaded.  I don’t worry about when the RG finishes loading. As we all know, all the bubble checks for loading the page, RGs, charts and anything else just don’t work. I just use the RG to hide the animation element.

Here is the element tree:

[image]

GroupRGHolder is just above the loading animation (loadingHeads), and has no background.

[image]

The RG within GroupRGHolder has a white background and therefore covers the animation once loaded.

[image]

This does mean that the animation remains “visible” beneath the RG indefinitely, and I don’t know what this means to performance or multiple page RGs (mine is just one). But in terms of triaging problems, this looks to be a solve for me. You could also hide the animation after some other longer time event if necessary.

Hope this helps.

## Reply by @ryparken (1 likes)

Hi there. It seems like you’ve come across the same solution as I did. Take a look at my post below. Only, I hold pre-loaders in the floating group made invisible via CSS.

  

    

    [image]
    Page loading best practices (http://forum.bubble.io/t/page-loading-best-practices/84735/12) App Organization
  
  
> 
    Hi @mark. The problem is that Bubble only loads data when it displays it. So, you are not preloading anything really as you may think, because all you groups are hidden. 
The (interim) solution I have found for myself is not to hide the groups, but to make them invisible with CSS (using Toolbox plugin). Put all your RGs into a floating group which is visible on page load, and add style to visibility:hidden. This way, data will be loaded and displayed, but will not be seen by users. 
You need flo…
