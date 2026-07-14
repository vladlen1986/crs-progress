# Case: Stripe notifications
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/examples-and-walkthroughs · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

As the API is a way to let external services connect to your app, each case has a different implementation. Here are 3 different examples of how to use the Bubble API in real-life. Note that each example assumes that the app is on a paid plan and the APIs are activated.

![](/files/-M5smv0eYcbWMgGLX_Ze)

## Notifying users when a Stripe subscription charge fails

Having your app take some actions when something happens on another service's end is a typical use case of the Bubble API. This will walk through the different steps, both on Bubble's and Stripe's sides. We'll start with an app that already has the Stripe plugin installed, with the relevant keys entered in the Plugins Tab. We also assume that our payment workflows save the Stripe customer ID of the user on the user - we'll need it to go from the ID Stripe provides to the User thing, and get his/her email.

We assume for this example the domain of the app is

`https://stripeexample.bubbleapps.io`

We'll start on the Bubble side, in the Backend Workflows page accessed via the page navigator in the topnav. We need to define an API Endpoint that will be called whenever Stripe fails to charge a credit card. This API workflow should have an action that sends an email to the customer with a message prompting him or her to update his card. So let's start by creating a new API Event that we'll call 'chargefailed'.

![](/files/-M5sc6FVyzG4GWwfkTSU)

We make this endpoint public, so that Stripe can trigger it via a webhook (see below), and we make it possible to run without authentication for simplicity.

Looking at Stripe's [documentation](https://stripe.com/docs/api#event_object) shows what Stripe sends when it triggers a webhook. Stripe's server will make a request to our endpoint, and send an event ID in the body in the request. Therefore, we're adding an id parameter to our call of type text.

![](/files/-M5sc6FXsxVFxQazLFmu)

We can now start building the Send Email action. We need to do a few things:

1. Use a Send email action to send an email to this user.
2. Use the Event ID sent by Stripe to retrieve the [Event object](https://stripe.com/docs/api#event_object). This event contains the charge object and the customer ID.
3. Perform a search in Bubble to retrieve the user with this customer ID.
4. Write a friendly reminder.

We start by adding the action, and will work on the To field. In this process, it's important to think from what we need and go up from there. Therefore, we start with the search for Users, add a constraint on the Customer ID field, and define the value as the result of an API call from Stripe. Here is the search.

![](/files/-M5smv0Ravf6rrGnMz3U)

To get the Customer ID of the prevent event. The Stripe plugin offers a call to retrieve an Event object from an Event ID. Doing a call to Stripe will validate the Event ID, and will return the Event object. From this object, we can get the Stripe Customer ID. So what we need here is the data source 'Get Data from an API'.

![](/files/-M5sc6FatIxitOT-r0Hd)

The API call is 'Get Stripe event', and the event\_id we need to send to Stripe is precisely the one we got from the initial request (the webhook). This parameter is the first entry in the dropdown, we select it.

![](/files/-M5smv0VTO-THEjJNvE3)

At this stage, we have retrieved the Stripe Event object, we just need to get the Customer ID and our search will be ready.

![](/files/-M5smv0XsYHUmg460zsz)

We can get back to the To field of the 'Send Email' search, and get the email of the user. Note that a search returns a list of users. In this case, we know the customer ID is specific to each user, but we need to get the first item of the list, to go from a list of one user to the user, and then get the email.

![](/files/-M5sc6Fg9FXr0a5Ymzg2)

We can now finish the action by adding the message we want to send.

![](/files/-M5sc6Fi4Jx2Gr6RMCW_)

We're all set on Bubble's side. Let's summarize what our workflow does:

1. Get the Event ID sent by Stripe with the webhook
2. Fetch the Event object and get the Customer ID
3. Perform a search in the application's database and get the user with this Customer ID
4. Send an email to the user that was retrieved by the search.

The full endpoint for this workflow is:

`https://stripeexample.bubbleapps.io/api/1.1/wf/chargefailed`

We're now heading to Stripe to configure the webhook. What we want: whenever a charge fails, trigger a webhook to this URL. We do this in [here](https://dashboard.stripe.com/account/webhooks).

![](/files/-M5smv0cTZ60WkxqtWxP)

And we're all set! Whenever a charge fails, the webhook is triggered, and Bubble will send an email to the user. You can see the execution of such workflow in your server logs.

## Sending a monthly newsletter

This example shows how you can create a system where your users can opt-in and opt-out for a weekly email. We'll cover the logic and the workflows to set up a weekly action, the content of the email will not be covered.

First, we head to the API page of our app and create a new recurring event.

![](/files/-M5sc6G6aOdTiOEQ7CQw)

Let's call this event 'Newsletter'. A newsletter subscription is attached to a user, so we pick user as a type of thing.

![](/files/-M5sc6G8MlMqncexKw5P)

This workflow will have one action that sends an email to the user that is sent to this workflow (the 'Current Workflow User')

![](/files/-M5sc6GAHaBnaoJ0vYWX)

We can now move to the page in your app where we'll offer users the option to opt-in or opt-out from this newsletter. We'll do this in a very simplified 'account' page that shows two buttons.

![](/files/-M5smv0mOjHWZjU7JdDR)

We need to add two workflows to our page. We assume that in this page, the user is logged in, and won't worry about enforcing this in the example-page.

The first workflow will let users opt-in. It is triggered when the user clicks on the button 'Opt-in', and will use the 'Set/Cancel a recurring event'.

![](/files/-M5smv0o9cnGVpnTkHFC)

This action takes an event and a thing. In this case, the event is 'Newsletter', and the thing is the Current User. We built the workflow so that the newsletter is sent weekly, starting on the following day at 9am.

![](/files/-M5sc6GGi6we2GLC2Lmd)

The opt-out workflow shares exactly the same structure, except that the frequency will be 'none'. Effectively, this will cancel any scheduled recurring event (and won't do anything if no event is scheduled initially).

![](/files/-M5smv0sK4f7H0DR1dNZ)

## Writing a script to read data from the database

The GET/Data API lets you read your data programmatically. This can be done by another application, but can also be used in some scripts to save or print your data. This example shows how you can do this in Python. We're writing this script for an app hosted on the domain yourapp.com, and our goal is to retrieve all invoices. This assume that our app has a type named 'invoice'. We do not add constraints, but it would be easy to add such constraints, as described in the reference.

The key concept in such a script is the pagination. When you make a request to the API, you need to define where to start, and a number of items to fetch. Each response from the GET API will return the number of remaining items. In our example, we want to start at the last item of the previous call plus one.

```python
#packages to perform the request, handle JSON objects, and encode URLs
import requests
import json
import urllib

session = requests.Session()

#API KEY as defined in the settings tab, so that the script has full access to the data
API_KEY = 'XXXX'
#base endpoint, see https://bubble.io/reference#API.get_api.Endpoint
base_url = 'https://yourapp.com/api/1.1/obj/invoice'

#Query initial parameters. We do not send a limit parameter (default is 100)
cursor = 0
remaining = 100

#we keep making calls till we have no remaining items to fetch
while remaining > 0:
    #data we send with the search. Search constraints would be here
    params = {'cursor': cursor, 'api_token': API_KEY}
    url = base_url + '?' + urllib.parse.urlencode(params)
    response = session.get(url)

    if response.status_code != 200:
        print('Error with status code {}'.format(response.status_code))
        exit()

    chunk = response.json()['response']
    remaining = chunk['remaining']
    count = chunk['count']
    results = chunk['results']

    #we print each object
    for result in results:
        print(json.dumps(result, indent=4, sort_keys=True))

    cursor += count

print('No more entries')
```

Such a script can be used (and adapted) to save data instead of printing it, query some data that fits some constraints, etc.
