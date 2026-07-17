<!-- source: The Ultimate Guide to Bubble Performance (Petter Amlie), Revision 3 — physical PDF pages 158-204 -->
<!-- How to build for performance — Workflows (front/back-end, process spreading, triggers) -->

## Workflows

### What are workflows?

A workflow is a collection of sequential actions that are triggered by some kind of input, scheduled at a set time or triggered by a certain condition. How well a workflow is optimized for performance depends on many factors: what exactly it does, how it does it, when it does it and conditions. Workflows, like everything else in your app, also adds to the total amount of data Bubble downloads and stores in the memory of the user’s device.

From a UX standpoint, workflows are one of the most visible tests of how your app performs, since the time between start and finish is so easy to quantify and an action typically attracts a user’s full attention. As we’ve covered earlier in the book, workflow performance is as much about the illusion of progress as it is about actual performance,

This chapter will look into optimizing for both of these perceptions.

### Front-end and back-end workflows

Not to be confused with server-side and client-side, we’ll separate processes into two camps:

Front-end workflows Front-end workflows are the workflows that are triggered on a page, run on that page and stop running if the page is closed. They are everything that is contained within the workflow editor when you have a page open. They are triggered by: ●Page load ●User actions ●Repeated every X seconds ●Triggered by condition (such as data changing)

Front-end workflows can be instant or produce visible delays for the user as he uses the app, depending on the actions it performs.

Backend workflows These are the workflows that reside in the backend workflow editor. They are not contained within a specific page, but can be triggered or scheduled by any page in your app, making them globally available. They are triggered by: ●Scheduling immediately or in the future by a front-end action

●An external service connecting to your app through an API ●Triggered by conditions on a Backend Trigger ●Regular intervals ●Being run on a list of Things ●Self-scheduling (recursive workflows)

If you want to read more about back-end workflows, we have an in-depth guide on our website. Click here to read it.

How backend workflows affect the front-end The beauty of backend workflows is that in principle, they don’t affect a User’s perception of the application’s performance, as long as they don’t overspend your app’s total capacity. Great! So let’s move all actions to the backend!

As always, there are some caveats and common misunderstandings. Let’s clear them up.

Scheduling backend workflows Running an action on the page does in itself not cause any delays, except for the time it takes to actually perform the instructed action. Confused? Look at it this way: when you

instruct Bubble to execute an action, you are in principle scheduling it to run immediately. While the action itself may not be instant, the scheduling itself is. Scheduling a backend workflow on the other hand, can be considered an action in itself, and is not necessarily instantaneous. In other words, it takes a few milliseconds to schedule a backend workflow, and many actions performed on the page will finish quicker than that. So don’t move all your actions to the backend just yet.

Bubble is optimized for front-end actions As we’ve touched upon earlier in the book, Bubble is well optimized for its front-end actions and are performing a bit of magic on your page without you having to set it up: ●Bubble will usually immediately render changes to one or more database records to the screen, as long as they are performed by a front-end action. Database changes will seem instant, even if they’re not ●Search results are quickly and consistently updated for any change you make to records contained within it - if an update on a record fails to meet the search criteria, it will immediately disappear from the list ●Scheduling a backend workflow causes a delay in itself, in addition to whichever time the action takes to actually complete - the total time will be longer ●Bubble will show record changes performed on the backend fairly quickly, but not instantly. You may find it can take up to a few seconds before a change made in the backend is visible in the front-end.

So… never use backend workflows then? All that being said, backend workflows are still a powerful feature for your app. Indeed many app actions, such as performing changes on a lot of records, are not possible without them.

Below are some common scenarios and possible solutions:

Scenario What to use Change made on a single Thing Page action Change made on a short list of Things (100 items or less) Page action Actions performing searches to finish Consider both Workflows with a long range of actions Consider both or a mix Cascading actions* Backend Changes made on a long list of Things (100+ items) Backend * Actions that lead to more actions. Example: Deleting a User requiring to delete all the Users data saved in other Data Types

Two useful questions to ask yourself is: ●Will my users expect an instant response to their action? ●Can I produce an instant response?

Remember what we discussed in the section about User-Perceived Performance. A response is not necessarily a finished workflow: it’s just communication. If you’re performing a workflow that your user’s are unaware of, or don’t expect to finish immediately, consider moving it to the backend and away from the page. Find ways in

the front-end to make the results seem instantaneous, and then finish it up leisurely in the backend.

### Client-side and server-side actions

Some actions in your app will rely on the server to complete, while others are performed client-side. Knowing that difference can help you optimize workflows to avoid having to communicate with the server, but keep in mind that client-side data is lost when the user navigates away from your page.

Most of the client-side actions are kept within the Navigationand Elementactions:

Examples of client-side actions are:

●Showing and hiding elements ●Setting states ●Animations ●Style changes ●Scrolling ●Refresh the Page ●Go to Previous Page ●Open an External Website ●Add a Pause before next Action ●Terminate this Workflow

An easy rule to remember is that a client-side action will mostly execute without problems even if you disconnect your device from the internet.

Some of these actions can be considered a hybrid of client-side and server-side. For example: showing the next page in a Repeating Group is technically a client-side action, but if Bubble hasn’t loaded the data yet, it will fetch what it needs from the server to display it. Likewise, showing an invisible group may lead to Bubble loading its data source.

Client-side actions do not spend WU.

### What slows workflows down?

Workflows are mostly very quick. Remember the magician from earlier in the book, hiding what’s really going on backstage? Bubble applies all sorts of tricks to make it seem like processes are instant, while in reality they may take some time to finish in the database. One of the most visible examples of this is if you show a list of Things in a repeating group - let’s say a list of Users - and then use the Makechangestoalistof Thingsaction to change everybody’s first name to Joe: voila! The entire list will change instantly, even though it’s safe to assume this operation takes a bit more time to finish on the server.

There is no unknown information in this action - Bubble already has everything downloaded

The reason this can be done so quickly is that there are no unknowns: Bubble already has the full list of users downloaded, since we are showing them in a Repeating Group. It also knows that everybody’s name is now Joe, and can apply this change client-side to show the result instantly. Just like a technically client-side action can trigger a server-side action, a purely server-side action can also trigger a client-side response to communicate efficiently with your Users.

The challenge, and delays, arise when we introduce an unknown into the mix:

Bubble doesn’t know what the first name will be, and needs to complete the search before it can display the results

In this example, we’ll be adding a slight delay, since the workflow forces Bubble to perform a search before it knows what the new first name will be. Once that is found, the result will be instantly applied to all Users visible on the screen.

This illustrates how you can plan out your workflows keeping in mind what information Bubble already has. As Bubble is already optimized to show changes on screen immediately, you can leverage this by making sure Bubble has all the information it needs before the process even begins.

### Action response design

When a user clicks a button, you get to design what happens. Awesome, no? In this section, we’ll return to the concept of having two layers in your app.

Layer 1 is what’s actuallygoing on Layer 2 is the user-perceived performance (UPP)

Action response design is about planning and designing what kind of response your user gets when he initiates an action. Your users will bring certain expectations, but you also have the power to set those expectations.

First, let’s go through the three types of responses an action can give a user:

Immediate response The process takes no time to finish. Users will see the change happening or get a confirmation that the process is finished immediately.

Delayed response The process takes some time to finish, typically ranging from a few tenths of a second to a few seconds. Users expect a sign of progress, such as a loading bar, button or icon animation or UI skeleton.

Future response The process takes significantly longer, typically caused by database operations such as importing a large CSV file. User’s expectations are set by communicating a message like: Thiswilltakesometime.Wewillemailyouwhenit’sfinished.

What the last two have in common is that users accept more than you might expect, as long as it’s clearly communicated.

### Immediate response

An immediate response would follow the pattern below:

There is no perceived delay between the user clicking and the process being finished. Whether to communicate that it has finished or not depends on what the action is.

### Delayed response

This is the kind of workflow that causes most concern for Bubble developers. There are a few different ways a delayed response can play out from the perspective of User-Perceived Performance:

In the illustration above, the user clicks a button, and you simply wait until the process is finished before you communicate anything. This can work just fine for shorter delays, or when the standard Bubble load bar communicates sufficiently.

The second type let’s the user see one type of communication as the button is clicked, and a second to confirm that it’s done. This can be two separate messages, or they can be joined together by something like a popup with a progress bar, depending on the process and duration. This solution works best with processes that actually take a bit of

time to finish. If the duration is 1 second or less, the communication may simply flash unnecessarily on the screen.

The third type communicates instantly that a process is done, and then quietly finishes it without the user ever knowing how long it actually took. Note that communication doesn’t always have to be a message: it can simply be a change on the screen such as going to the next step in a sign-up form. The important thing for the user is the confirmation that something has been done.

Action sequence order The order in which actions in a workflow are executed can have a major impact on UPP. While Bubble seems to perform certain tasks synchronously (at the same time) to speed things up, they are mostly completed asynchronously, meaning that it completes one step before moving on to the next. In other words, you need to be strategic about what action comes where to hide delays from the user. Take a look at this workflow:

The final step is the one that communicates to the User - moving it can improve the User-Perceived Performance

Bubble will sign the user up, Create a few other Data Types, and then set the state required to go to step 2 in the sign-up form. As these processes finish up, the user may experience a lag. By moving Step 5 to the beginning of the workflow, Bubble will go to part 2 of the sign-up form and then perform the database operations. Note that Bubble’s loading bar will still show.

### Background triggering

Bubble is set up by default to notify the user that a database operation is in progress by showing the blue loading bar at the top of the page. If the user didn’t directly start that process, on the other hand, you can avoid showing the bar by triggering the operation in the background instead of by a button click. This also allows you to delay a process and run it when the user’s attention is elsewhere. This way, you can make it seem like an instant process even if it takes a moment to finish.

Instead of placing the SigntheUserup and CreateanewThing actions on the button, the button will simply set a state to jump to the next step of the sign-up form.

Then, we silently trigger the database actions by a workflow that was not directly initiated by the user, such as when Step 2 of the form is visible. It’s a few minutes of extra work and maintenance, but makes the UPP more responsive.

### Spacing out workflows

Spacing out workflows is the concept of taking a time-consuming workflow and spacing it out so that each step is acceptably short or even unnoticeable. In the end, the server has done exactly the same job, but we can avoid spikes in the user’s lag experience, and sometimes also in your app’s total capacity.

Multi-step The most obvious way to space out workflows is to split them up into several actual steps that the user has to go through before a process is finished, like our example with the sign-up form in the last chapter. Instead of having a large, scrollable sign-up form with lots of fields that culminates in a long workflow creating a number of different Things, we can strategically split the form up in a few steps. Not only do we avoid running all the actions all at once, but we also keep the user preoccupied with inputting new data into the form while the process finishes in the background. Keep in mind that multi-step processes can sometimes lead to saving redundant information. For example, the User may not finish all the steps, leaving you with ghost records in your database.

Process spreading Process spreading is my term for finishing a search or conditional statement before it’s actually needed, to speed up the workflow that relies on that information.

In this example, we want to add new tags to our system, but we only want to add tags with unique names. We perform a search to check if a tag by that name already exists, and Bubble needs to finish that search before it knows if it should move on to create the new Thing.

By using process spreading, we can finish that search before the user has clicked the Create button, and speed up this process.

By using the input value as a condition of the search, Bubble will quickly finish it as you type.

We do this by creating a group like illustrated above. Give this group number as the type of content and then place the search there. As soon as the user enters a tag name into the input field, Bubble will filter the search and return a number. The user never notices as the loading bar will not show and the user’s attention is focused on typing a name and clicking the button.

Now when we perform the conditional check in the Create Tag step, we simply check the number stored in the group. The server is performing the same task, but because we spaced out the workflows, the interface feels snappier.

Using process spreading for error messages Taking this method a step further, you can use process spreading to generate error messages in your app. For an advanced form, a button can generate a range of different error messages (tag name is empty, you don’t have the privileges to create tags, etc, etc), which would typically involve a lot of conditions having to be checked when the user clicks the button. To speed this up and simplify it using process spreading, we need to make a few changes: 1. Change the Group’s Typeofcontent to text and leave the data source blank 2. Add conditions for every error message that you would need to display

Here we have two conditions: one checking if a Tag already exists, and the second one checking if the tag name is empty.

Now, instead of checking if the number is 0 before creating a Tag, we check if the error message is empty. If it is, simply proceed with the Create workflow.

If the content of the Group is not empty on the other hand, we display its text content in an Alert element. Again, we avoid placing multiple and/or complicated conditions inside a workflow where the user will notice a delay, and instead tell Bubble to finish checking all the conditions before the workflow has started.

### Do Not Repeat Yourself (DRY)

In programming, there’s a principle often abbreviated to DRY. For Bubble, it simply means that any resource you set up in your app (elements, workflows, styles) should not be repeated.

Not only does repeating them force Bubble to load the same resource multiple times, but it opens up for errors down the road. You change something in the action step of a repeated workflow, and have to change it in other places as well. It takes time and let’s face it, we sometimes forget to make the necessary changes.

Custom events Custom events are the most basic ways of avoiding repetition. They allow you to set up a step of actions, and then run those actions from anywhere. You can also trigger a Custom Event inside of a Reusable Element from its parent, making it one of the few ways to communicate directly with reusable elements. We’ll get back to how you can leverage this to structure your app and avoid repeating yourself.

Use them. Not only do they help you avoid repetition, they’ll also make your workflow editor easier to navigate. I usually give Custom Events a color to separate them from the rest of the page, and then use a simple logic structure to sort and name them.

Giving custom events names like Thing:Action sorts them together and makes them easy to navigate

By having a set workflow for saving an Article, you can easily add new ways for the user to save it without setting up any new workflows.

Reusable elements Reusable elements have an obvious use in parts of your page that’s repeated on multiple pages (such as a footer), but should also, like Custom events, be used to avoid any kind of repetition. Reusable elements do not only contain page elements, but workflows too, meaning that certain parts of your page’s functionality can in principle be stored away in Reusable elements.

Let’s say for example that you have a popup for creating a new User. By setting up that popup in a Reusable Element, you ensure that: ●You can add users in any part of your app, regardless of page ●All workflows associated with creating a User is contained within that Reusable ●You can trigger workflows associated with Users from outside of that Reusable ○Even loading popup content and showing the popup can be stored inside of the Reusable itself, avoiding repetition even to display it

Reusable elements do come with some restrictions that you should be aware of. This guide will not go into detail on that, but for new Bubble developers, the process of exchanging information from inside and outside of a Reusable element can be confusing. I’ve written a guide on advanced reusable that you can check out here.

Sharing Custom Events across your app with Reusable Elements Knowing that Reusable elements can contain Custom Events, and these Events can be triggered from outside of the element, we can use that to share Custom Events across your app.

Remember, a Reusable Element doesn’t have to actually contain any Elements. You can set up a completely empty, invisible Reusable Element and then store Custom Events inside of it that can be triggered on any page where the Reusable is placed. I often create a Reusable Element called actions and place all my oft-used workflows inside of it.

The Reusable Element is no bigger than 1x1 pixels and can be invisible on page load.

If needed, the Reusable can also contain elements that are used across your app, such as Popups.

Both the workflow and the edit user popup are stored within the Reusable

This method ensures that you are consistent with where your workflows are stored, and keeps the workflow editor for the Page itself a lot lighter and easier to work with.

A word of caution before you start moving all your workflows into a Reusable Element: the method does demand planning. Sending information into the Reusable and then back to the page when it’s done can require a complex setup of states being passed back and forth, and you may end up with adding more actions than you saved in the first place. While I highly recommend the method for setting up efficient pages, I would encourage beginners to experiment with it first to learn the pros and cons. Be mindful also that if not planned well, you may end up loading a large number of workflows on every page in your app, even when they’re not needed.

### Leveraging the Bubble back-end

We’ve discussed how front-end and backend workflows both have pros and cons, and now we can look a bit closer at some scenarios where you can leverage backend workflows:

Backend workflows in Bubble serve three purposes: 1. to schedule workflows that will run even if the user closes your app 2. to allow third-party services to reach your app through an API 3. To run workflows in parallel or in a loop (Schedule API workflow on a list or recursive workflows)

From a UPP perspective, they have a big upside: no matter how big a job you throw at it (staying inside of your app’s total capacity), your users will never notice any lag or slowdowns because of a workflow running. You can make changes to a million records, and your user won’t notice.

Back-end workflows run independently of your app’s front-end, and thus can be used to hide demanding processes from the user.

Schedule workflow on a list vs. recursive workflows For processing hundreds of database records or more (up to millions), back-end workflows are not only the best way to do it, but the only way, realistically. There are two ways to perform a workflow on a List of things:

Schedule back-end workflow on a list will let you set up a workflow that is run once on every Thing on the List you provide. The workflows are processed in parallel, as opposed to sequentially. In other words, this method finishes faster, and spends less WU, since you don’t need to reschedule it continually. (I’ll refer to this as SAWOL)

Recursive workflows are technically run on just one Thing, but include an action that schedules itself to work on the next record. I’ll refer to this as RW)

In principle, both methods can do the same work, but there are some differences.

●As mentioned, SAWOL runs in parallel, while RWs runs sequentially ●SAWOL consumes less WU, since you don’t need to reschedule it over and over again ●SAWOL finishes faster, since multiple or even all things in the list can be processed at the same time ●Still, there are some scenarios where using RWs is useful: ○When you need process the things in sequence ○When you need the workflow to be scheduled at a specific time (for example, if you need a one-minute delay in-between the processing of each thing) ○When you need more flexible parameters, such as one cycle depending on data from one or more previous cycles ○When you need to track the progress of the operation in your app

Let’s use our example from earlier with a Futureresponse. If your user imports a large CSV file and you need to run a workflow on each row of that CSV (such as setting up a new User), then you would need to use an RW in order to email the user when the process is done. Using a WOL, there would be no way to tell when it was done. 1.

With recursive workflows, you can play around with what your system can handle in terms of capacity. Start out with about five seconds in between each loop for heavy workflows, and adjust down if you feel comfortable that the server can handle it. Personally, I store these delays in an option set that lets me categorize workflows into Light, Medium and Heavy tasks. Each of them has a set amount of seconds that I can adjust as needed. This way, if my capacity is working fine with a hundred Users in the system, but starts struggling with 300, I can simply increase the value a little bit, and with just a keystroke I’ve changed the delay on maybe hundreds of different back-end workflows, ensuring that my app keeps running smoothly without upgrading capacity.

Backend triggers Backend triggers, in my view, are one of the most strangely undercommunicated Bubble features, but let me be the first to tell you: they are a godsend for setting up efficient apps and an immensely powerful feature.

The reason is simple: a backend trigger can react to something that your user does, but without adding any lag or more workflows to your page load. You can start a massive operation backstage in your magic show, and your audience has no idea. It’s not unusual that one action or workflow in Bubble triggers another. Usually, we don’t think too much about it, as we see it simply as the way a workflow works - they follow each other one after another. But let’s go over a couple of principles from this book:

●Don’t Repeat Yourself: we should try to avoid setting up identical workflows ●Keep your page light: additional actions add to our page’s total resource usage on the device

Our analogy from earlier about the two layers of Actual Performance and UPP is also helpful to illustrate the power of backend triggers:

Let’s have a look at how we can exploit backend triggers to move workflows away from your page (Layer 2) and into the Bubble back-end (Layer 1)

Deleting complex data Deleting Users is a typical process that can demand a lot from your system, since a User often has a lot of associated data spread out in different Data Types. If you are running a CRM for example, deleting a User can also mean deleting all of that User’s data: Accounts, Contacts, Messages, Projects, Notes, Tasks etc.

You can of course schedule an API workflow from your page, but apart from adding a delay and an extra workflow on the page, there are some downsides to this. Typically, you’ll need to delete all the User’s content before you delete the User itself (to be able to locate it), which means that the User will remain visible in your app until a potentially big workflow has finished running.

By using a combination of Privacy rules and triggers, we can make it seem like the User is deleted immediately, while we allow the back-end to digest the process for as long as it needs to.

The process looks like this: 1. Set up a Yes/No field on the User called Deleted. 2. Set up Privacy rules that hides Users with Deleted set to Yes. This will hide the User from all lists as soon as the field changes. You can also set up Privacy rules on the User’s other Data Types, to hide them immediately. 3. Create a Back-end Trigger that watches the User’s Deleted field. Whenever the field changes from No to Yes, the trigger schedules the API workflow that deletes

all the User’s content and finally the User itself

From a UPP perspective, we’re using the third workflow model for this:

You can trigger the confirmation message immediately, and your user is unaware of how long the process actually takes.

This method also allows you to flexibly add additional functionality to your app. You can easily set up a way to Undo the user deletion for example, by having the Back-end Trigger schedule the Delete workflow 20 seconds into the future, and set an Onlyif to check if the User’s Deleted is still set to Yes.To Undo, simply change Deleted back to No within 20 seconds, and voila, you have yourself an undo feature.

Back-end triggers will execute even if you use the MakechangesonaList action. In other words, as long as the list is not too long, you can seemingly instantly delete 20 Users, and then let a recursive workflow in the back-end slowly work its way through deleting everything without overspending your capacity.

Keep in mind that the condition on a back-end trigger will run every single time any change is made to that Data Type. If you edit a User’s credentials in 10 input fields that are Autobound, Bubble will check the condition on the Trigger every time: keep the conditions light, or it alone can create a spike in your capacity chart. Also, get to know the restrictions on Triggers: there are plenty of them. Countless times I’ve been told that triggers are not reliable. They are, but they come with several pitfalls. Get to know them here.

Using back-end triggers to keep data in sync Remember the Search Data Type we discussed earlier, where we set up a Data Type that only contains the data needed to find and display it in a search? Back-end triggers allow you to always keep two data types in sync, without having to add any extra workflows to your page. Going back to our blog website, you may have set up a Search Data Type for all your Articles. What happens when you change the header in an article? You’ll need to change the header in the Search Data Type to match: by using triggers, you ensure that not only are they always in sync, but you avoid placing extra workflows on the page where the Article is edited, keeping the page nice and light.

Combining Option sets and triggers to automate workflows The idea of triggering workflows whenever data changes can also be used without that data serving any other purpose than that. You can see this is kind of a command saved directly on the Thing. Using our CRM example again, you may want to add a few ways to manipulate a Lead. Set up these different commands in an Option set that we’ll call Commands:

On the Lead data type, we’ll set up a field for this command:

Now, every time you want to apply one of these commands to a Lead, you simply use Make Changes to a Thing to give the Command field a Value. A back-end trigger will watch for the field to change and execute the corresponding workflow when it does:

When to use back-end triggers Use it when you can make your app more responsive by moving big operations to the back-end, and to ensure data stays in sync no matter where in your app it has changed. If your Delete command only uses the DeleteaThing action, there’s no reason to set up a complex trigger system to run that simple command: simply place it on the page. But if it triggers a cascade of different actions like in our User example, it’s one way to speed things up for the user. Get to know how triggers can fail to execute in different scenarios, how they affect your apps privacy and security and how to avoid them being a capacity thief in themselves.

### Communicating clearly

We’ve talked a lot about communication throughout the book, and I’ve tried to illustrate that you can hide processes and delays behind different ways of communicating.

Imagine that you are at the office and your spouse is in your home. You have agreed that he or she will prepare dinner for you at 5 pm, and at 2 pm you start realizing that you may be late. You don’t say anything, and come home at 7 pm to a cold dinner and fuming spouse. Ragnarokensues. Now take the same scenario, but this time you communicate at 2 pm that you may be late, and that maybe dinner can wait until 7 pm.Peaceonearth.

The circumstances are the same, but communication was different.

Silly as the metaphor may seem when talking about app development, the similarities are actually helpful when you think about it. Great and transparent communication builds trust and goodwill.

Take a look at how global money transfer service TransferWise shows progress as money is transferred to someone:

We’re missing the animation here, but it shows the money going from you, to TransferWise and on to the recipient as if a physical object was being moved. Similarly named file sending service WeTransfer has a more traditional upload progress bar:

Both are processes that can take up to a few minutes, but not only do you accept that it can take a while before it’s done, but the design is so well-made you almost want to look at it until it’s finished even if you don’t have to.

Communication is there to maintain a relationship with your user. It’s the only tool you have to control how a user feels about your app and its performance, but luckily it’s incredibly powerful.

Three basic functions are covered by communication in workflows: ●An action has been received (i.e. button clicked) ●A process is running (i.e. loading bar) ●A process is finished (i.e. popup message)

What all three of them have in common is simply to say to the user that the app is receiving his commands, has not crashed and will finish the task.

A full guide on how to design user interfaces performance-friendly is out of the scope of this book, but numerous examples are included below to show how you can communicate through different parts of the process.

Action received As soon as a user has initiated a process, he will expect your app to confirm it. It would be weird to press a button with nothing happening afterwards, right?

Communication can be subtle: a slight change in the color or shadow of a button can be enough:

Simply changing the color of a button when clicked confirms to your users that the trigger is received.

The animated ripple effect is how Google's Material Design confirms a button click

A simple text confirmation can be enough to show that an action is received and being processed.

Bubble’s own Alert element sticks to the top of the screen and can even automatically confirm autobound saving without additional workflows.

A process is running The next step is a bit different, especially if the process is time consuming. You’re not only telling your user that something has happened, but that a process is ongoing and maybe how close you are to finishing it. This step may make the first step redundant.

A loading bar is a great way to let your users know that the app hasn’t crashed, but needs a bit more time to finish.

One of the simplest ways to show a process underway. Great for simple processes, but lacking in information on what’s going on and how long it will take.

A popup can be particularly helpful if you want to stop your users from taking any more actions until the work is done. Can easily be combined with a progress bar, animation or illustration.

A process is finished

Positive, quirky illustrations can make your app seem more friendly and approachable. Apps like Notion use this to great effect.

Sometimes, telling users a process may take some time, and they’ll receive an email when it’s done is perfectly acceptable.
