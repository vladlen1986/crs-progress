# [Solved] Deployment and version control
> Source: https://forum.bubble.io/t/solved-deployment-and-version-control/3493 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 30 posts · topic: database-design

## Original post (by @ryanck)

Hello everyone,

I was wondering if anyone could explain how this deployment and version control works.

My question is: lets say that I´ve deployed the app and it´s live so I´m making modifications in the development version to upgrade some features and I´m modifying the page views and also the database. So when I deploy this version to live what happens? The other one gets replaced everything including the database? it gets updated just the page views? just the database?

Thanks a lot.

## Reply by @JohnM (7 likes)

- 

Live Version is read only DATA:

Update (June 8): you can EDIT the LIVE Data, but IGNORE the message Live Version that appear the first time, edit your data, and then the message will never appear again.

- 

[image]

- 

The DATA and DATA_STRUCTURE can be copied between Development and LIVE.

- 

[image]
Capture d’écran 2016-06-07 à 06.02.16.png860×407 37.6 KB

- 

Here’s the place (look in red: Copy DATABASE between versions, it miss the word Database):

- 

[image]
Capture d’écran 2016-06-07 à 06.08.39.png1307×354 42.1 KB

- 

When you change or add a field, you have to be very carefull. In my example, I add the field FIELD2 in deployment.

- 

In Live, nothing, no field FIELD2:

- 

[image]
Capture d’écran 2016-06-07 à 06.08.55.png1305×343 40.7 KB

At the END, you have to use ‘Copy Between Versions’ to copy the Live DATA to your Deployment once you have made any change in Deployment DATA_STRUCTURE. So, don’t be in the moon when playing with it [image]

Honestly, from today, and pushing myself to understand it, It was not clear. I can see now the DANGER if we deploy but forgot to save data from Live to Deployment, and after, save data from Deployment to Live. Complex operation, but more secured? I will preferred ONE database and ONE database_structure… with a lot of UNDO backup.

Now, I will check what happened when erasing a FIELD in Deployment and restore DATA from Live to Deployment.

NEVER erase a field by accident and create a new one with the SAME name. In this example, I lost data in the field NAME and for sure, FIELD2. Good way to erase multi data:

[image]
Capture d’écran 2016-06-07 à 06.37.30.png848×425 29.9 KB

Final Word, it’s good to have TWO databases finally. We can make mistakes on Deployment, but not in Live.

Three steps if you change the DATA-Structure in Deployment:

- Do ‘Copy Between Version’ action Live to Deployment (backup)

- Do ‘Deployment and Version Control’ action Deployment to Live

- Do ‘Copy Between Version’ action Deployment 
…[trimmed]

## Reply by @NigelG (4 likes)

I am not convinced “backing up” to development is a good thing. At least not for longer term storage, as it will almost certainly be changed.

For most practical cases, adding new fields has required me to run an admin function to populate.

Bear in mind that the “default” value you set on a new field in dev doesn’t do anything when you copy the structure to live.

@peng.o is right about the live editing, even though it tells you it is “read only” it is somewhat misleading.

## Reply by @ryanck (1 likes)

Wow thanks a lot @JohnM,

It´s a bit complicated to understand, at least for me but you made it very clear. I´ll play with it now that you´ve explained very well how it works.

Thanks.

## Reply by @peng.o (1 likes)

I don’t think this is entirely correct.

You can actually alter live data in the backend. The warning is for altering visual and workflows. You just have to make sure you’re viewing live data.

The reason your field isn’t copying over is because you haven’t deployed it yet. I guess you could use the “Copy between versions” to make changes to the database without making changes to the design but I don’t see the point because you’re copying over test data over to live data. The reason it’s danger is that you’re overwriting live data with “test” data, so all current live data is lost.

The “Copy between versions” is more for converting test data to live data.

## Reply by @JohnM (1 likes)

There’s 3 components: Workflows-Visual, DataStructure and Data. Yes, Live DATA can be changed by Workflows (backend). Deployment is for Workflows. If you change the DataStructure in deployment, that will not change the DataStructure in Live database even you make new Deployment. Hope I’m right! [image]
