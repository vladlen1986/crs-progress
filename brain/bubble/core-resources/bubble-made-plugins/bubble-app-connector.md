# Bubble App Connector
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/bubble-app-connector · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The App Connector connects two Bubble apps and accesses the API and data of one app in another. By doing so, you can sign up with OAuth with another app, run workflows as the user, etc.

To make this work, set up an API with the first app A before using it in app B. To enable users to sign up with app A in app B, define some OAuth credentials in app A. Once this is done, install the Bubble App Connector and add app A in app B.

Once you've added an app and installed some calls, you can use them either as a data source in 'Get data from API' or as actions in workflows.

## App domain

Enter the domain of the app. It should be similar to [https://appdomain.com](https://appdomain.com/) or [https://appname.bubbleapps.io](https://appname.bubbleapps.io/), i.e., without a page. Using this domain, Bubble will automatically fetch the metadata of the app.

{% hint style="warning" %}
**Note**: Be sure to use the bare domain (no 'www'), as including the 'www' can lead to unexpected behavior when using the App Connector in workflows.
{% endhint %}

## Match environment (Live vs Dev.) <a href="#match-versions-live-vs-dev" id="match-versions-live-vs-dev"></a>

Check this box when you want the developer environment of app A to interact with the developer environment of app B. Typically, this box is checked.

## App name

This is how to describe the app within the Bubble Editor. By default, this is the app name, but it can be renamed. This is important when referring to the different calls in the Bubble Editor.

## Private key

Enter the Private key generated in the API section in the Settings Tab of the app you want to connect with.

## Client ID

Enter the Client ID of the app for OAuth purposes.

## Client secret

Enter the Client secret of the app for OAuth purposes.

## Call name

Select the call to install. It can either be an API Workflow or GET call.

## Call type

Select whether to use the call as a data source or action. Normally, API Workflows will be actions, and GET calls will be data sources, but in some cases it may be different. For example, when an API Workflow returns data.

## Authentication

Select which type of authentication you want to call to run. If you select Private key, it will run as an admin in the second app. If you select OAuth and enter a Client ID and Client secret, calls will run as the current user after signing up with OAuth. In this case, privacy rules, etc. will apply as the user. No authentication will run calls without any credentials.

## Refresh app metadata

To modify both apps at the same time, click this button to refresh the data.

## Setup

When you get started with the App Connector, you will have 2 apps:

* App A (which can be your main app)
* App B (which can be your sub app and you can add as many as you like)

App A (main) is where most data operations and workflow executions usually happen. App A will be where the data is stored and data needs to be exposed through an endpoint while App B (sub) is used to drive those workflows and pull data from App A (main).

First, we start by setting up app A (main) to give us the right access level (Private Key), allow sharing workflows (expose workflow API) and data (expose Data API), and something like an ID card to tell App A who is talking to it (Client ID & Secret). Then in App A (main) you setup actual workflows to signup but it can be other workflows too like charging a customer or sending them emails. Next, you use the App Connector plugin in App B (sub) to control A (main) by showing your ID, confirming your access level and then telling it what to do.

Here is how we make this happen:

### Setup a signup workflow in app A (main app)<br>

![App A main workflow](https://lh4.googleusercontent.com/1lmwh7vkFUq8ap5JCr7Xn_8rerqq6XtuWMzOr7g3mDs0qJSK4T5oCnNn2rdsiWnuucJS8uSrsOzK9PBl9vKIdRuUPLGmYIOC0oq7SmHaqOHs8ZvK_cnlGbQ4JR9fSthZ_LBbSgGW)

In App A settings > API tab, enable ‘"This app exposes a Data API" and "Workflow API." Create a new API token and notice the Private Key, then set the login page as the one containing your signup popup.

Add a new 3rd party app with name (such as app B’s name) and Redirect URI which should be the landing page back in App B.

Notice Client ID and Secret – you will need this later.

![App A main settings](https://lh5.googleusercontent.com/K3birobjHCKK-yTFhUrn2pg5wTO4qWk_fhy87JnL4Iu2VDe21lnKHx2sOna-hhXio8IO-NxC-PbVvY7eNeOg_4LR7ct_6yK-2De9kUAM9PXviWMTeNNgqgA08Vp5NDtie1OHsvrL)

### Back in app B, install the App Connector Plugin.

Add a new Bubble app within the plugin with following details:

* App domain: yourappname.bubbleapps.io (use custom domain if applicable)
* Enable match versions
* Private key – get from previous step
* Client ID & Secret – get from previous step

![App B sub app connector settings](https://lh4.googleusercontent.com/RVk4ni-l5RyykAEZ65jdL2pKfuyVxDXrfeO42LQ9YY0SAinsbfd6iR1VOQpeJEwT_FojSIzdIFTYd8ZnFBl54qNmsAiEECalSAA34Jf0wfylm_V0ydIAzwdafzjWhWwnNHwAAR5t)

### In App B landing page, create a login button

Set the workflow to account > signup/login with a social network, then choose "Bubble app - app name" as the OAuth provider.

![App B sub login button for user](https://lh3.googleusercontent.com/N6RcjjPmcwf-86120sAAGOjsw2SnyIKRsIvaJyOwnm4d-h2a0BKKKtumoX2Z5zJUp7kXN3XDa5ojIOcgJHqhxAjxROpcDcAHlCh_rs6D3yKjUhif5GTNstNqDol6fvcm32peJwAy)

### You’re all set

Try App B in run-mode > click login > you will get redirected to signup page on App A. Once logged in, you will get redirected to App B landing page and the user’s login details will be stored on both apps. Note that login is "User" type data that is special in that it gets stored in both apps. Any workflows you drive from the App Connector for App A (main) will run in App A and store data only in App A.

If you want to pull non-user Data from App A (main) into App B (sub), the "expose Data API" will now be useful. You will expose that data type from App A (main) settings and then be able to select it from the app connector under add a call / Installed calls and then use it in elements within App B (sub) like any other "Do a search."

![App B sub adding calls](https://lh3.googleusercontent.com/eUjIIIeErjg4XZ3rTN-RcVE0hwPht38B7Et4vW3zXQ4etHNCQJGD6NGfR_Q28QrW5jxqrltYm76SNl_jaNp8Z6mK4iM7JhkaWjwUVCdT4aKPiO6OH9QQJBoUmGSEU3fQ9Wgqiucv)

For each call in step 7, select "Action" in "Use as" for workflows and ‘"Data" for pulling a data type.

For both workflows and data, typically set authentication as "OAuth" as this requires user signup and sets access through roles defined in the Privacy Settings of the app while "API key" grants admin access and "none" gives bare minimum access.

## FAQ

{% hint style="warning" %}
**Note:** When using the API Connector or App Connector, parameters currently cannot be a 'raw' list of Bubble Things, e.g. a dynamic statement that results in a List of Things. This is because a raw list of Bubble Things is not rendered in the kind of text formatting that API endpoints expect. One workaround for this is to use the ":join with" operator on the list of Bubble Things to turn it into a format accepted by the API endpoint (this is likely a format like \["first thing", "second thing"]).
{% endhint %}
