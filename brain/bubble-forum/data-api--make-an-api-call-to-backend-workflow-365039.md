# Make an API call to backend workflow
> Source: https://forum.bubble.io/t/make-an-api-call-to-backend-workflow/365039 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 7 posts · topic: data-api

## Original post (by @massiditor)

Hi everyone.

Let me explain the main reason to do this through the API connector and not doing it the conventional Bubble way.

I created a backend workflow that will trigger another API call, and when the API call it’s successful it will create a thing on the database, and I added a step “Return data form API” so it will return a code 200 when the thing it’s created and a 400 when it’s not. I want to be able to capture these codes to trigger a toast that will show the front-end user if the workflow was successful or there was an error. My main trouble it’s that even though I’m calling the API call through a logged user it returns an unauthorized error and I haven’t found any way to solve this.

Calling the backend workflow directly doesn’t seem to fit my scenario, as it won’t return the data from the “Return data from API”.

Has anyone tried to do an API call to its own app, and has achieved doing it without ignoring privacy and running the workflow without authentication?

## Reply by @achen2222 (0 likes)

why are you calling the api from a backend workflow? Just call it from a front end workflow.

Front end workflows by default make api calls from the backend. The keys are secure and are only on the backend as long as you put them into the designated key fields.

## Reply by @massiditor (0 likes)

HI there @achen2222

Let me explain what I have set up, maybe there’s a better approach on this.

The backend workflow make an API call that will retrieve a list of items, then in the same workflow it will trigger a schedule API workflow on a list to save every item from the API call, then I added a final step to Return data from API.

The reason I do it from a backend workflow, it’s because Bubble doesn’t have a native way to get a status code from each operation. What I need is to get a status code 200 if the item was created on the database or a 400 if it wasn’t created and call a toast for the user to know, calling the backend workflow through the API connector allows me to retrieve the Return data from API values, but on a regular workflow you can’t from what I have experienced.

Have you done something similar, or do you know a proper way to do this?. Any suggestions will be much appreciated.

## Reply by @achen2222 (0 likes)

what you are saying doesnt make sense.

You dont need a backend workflow to make an API call.  Make the api call from the front end workflow.. The front end workflow will then schedule an API call to a backend workflow with the results from the external API call.

you will want to create a backend API Workflow because that is the only way to operate on a list of things.  The front end workflow will call the external api. Then you call your backend workflow with the list of things from your external API call.

Your backend workflow will operate on a single item from the list. When you call it using schedule an API workflow on a list of things, bubble will call your backend workflow once for each item in the list of things from the API call. Note that bubble will run all the calls to your backend workflow in parallel so the list may be added to the database out of order. You need to use recursion if you want to serialize the list.

Your backend workflow will create a single item in your database and in that moment you can decide to send a toast notification for that attempt if there is some problem (why would the item not be created in the database?). You do not need to return 200/400

This youtube video describes how to do this. The first half is not that relevant so this should start in the part of the video that is relevant to your question[image] (https://www.youtube.com/watch?v=4CE21Xn7fgI&t=380)

## Reply by @massiditor (0 likes)

@achen2222 I already watched that video, and it doesn’t involve my scenario.

I want to clarify that my main problem is not the API call to an external service or saving the items in my database, it’s retrieving metadata from bubble’s workflows whenever the item it’s created, or it wasn’t (because the item already exists in the database), when the item it’s not created the result of create a thing returns some numbers instead of an empty result or an error message.

[quote=“achen2222, post:4, topic:365039”] Your backend workflow will create a single item in your database, and at that moment you can decide to send a toast notification [/quote]. You can’t validate if the creation of every item was successful this way, so sending a toast after scheduling an API workflow will just return success toasts because as I already mentioned, bubble doesn’t have a native way to determine this.

If you make an API call to your own endpoint through the API connector it lets you save the response from the call, and it’s the only way I have managed to determine when the item was created or not from the return data from the API.

I hope I was clear of what it’s my main objective, or maybe you can explain to me if there’s a less complex way to do this.

## Reply by @achen2222 (0 likes)

ok lets say you create a thing but it exists. Instead, only try to create it if it doesnt exist. And then have another workflow step that returns whatever you want if it does exist and another step that returns something else if it didnt exist and could create it.

This uses the return a value type step in a workflow and uses only when to not create the record if it exists.
