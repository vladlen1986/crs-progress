# The Workflow API
> Source: https://manual.bubble.io/core-resources/api/the-bubble-api/the-workflow-api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Workflow API lets you set up server-side workflows that can be scheduled in your app or triggered from an external application.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:red;">**advanced-level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (2)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

* Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
  This article series below covers the Workflow API in detail.<br>
* Article series: [APIs](/help-guides/integrations/api)\
  If you are new to APIs in general or would like to learn more about Bubble's API capabilities, you may be interested in reading through this in-depth article series.
  {% endtab %}

{% tab title="Postman Collection" %}
Bubble offers a Postman[^2] collection. This collection is specifically designed to help developers understand and experiment with the various API functionalities available in Bubble.

External page: [Bubble Postman collection](https://www.postman.com/bubbleapi)
{% endtab %}
{% endtabs %}

The Workflow API lets you run workflows[^3] - specifically API workflows - on a POST or GET request. By using such API workflows, you can create things, sign users up, send emails, and leverage plugins to access external services.

Define the workflows as you would for a normal page, action by action. But, API workflows are one type of backend workflow, meaning they run independently of any page of your app and thus some actions (e.g. element-driven ones) are not available.\
\
You can create API workflows after checking the box 'Enable Workflow API and backend workflows' in the API section in the Settings Tab. These workflows are defined in the Backend workflows page found in the Application Menu above the Palette.

## API Workflows

These are one type of [backend workflow](#user-content-fn-4)[^4]. Not only can they be initiated from elsewhere in the app, but notably they can also be scheduled, or initiated via an API call (if the app's Workflow API is enabled).

The general path of the Workflow API for calling API workflows follows this pattern:\
\
`https://appname.bubbleapps.io/api/1.1/wf/workflow_name`\
or\
`https://yourdomain.com/api/1.1/wf/workflow_name`\
\
`wf` is for workflow.

Note that these two terms are similar but refer to slightly different things:

* An "API workflow" is a type of workflow, specifically a type of backend workflow
* The "Workflow API" refers to the app's ability to have API endpoints that run API workflows

## API workflow

This workflow is triggered on the server either when it is initiated from elsewhere in the app or via a call to the app's Workflow API. The workflow only runs after the authentication passes. As with other workflows, you can set up conditions to restrict when the workflow runs.

### **API workflow name**

This is name of the API workflow and is also the URL endpoint (denoted as `workflow_name` above). Each API workflow must have a unique name with no spaces or special characters.

### **Expose as a public API workflow**

Check this box to allow requests from outside the Bubble Editor via the Workflow API, either by a client that you built or another service, such as Stripe or Zapier. Non-public API workflows are useful because they can be initiated from elsewhere in the app or editor - for example, for scheduled workflows and bulk operations.

### **Authentication**

Select the level of authentication you would like for accessing this API endpoint.

* None required allows any client to trigger the workflow, regardless of authentication status. This can make the workflow vulnerable to misuse, so it should be disabled with caution. Use this to enable users to sign up or login to the app.
* User & admin allows any authenticated user to run the workflow. In order to control which specific users should be able to run the workflow, you must set up the correct logic using conditions and/or privacy rules.
* Admin only allows any user authenticating with an Admin level API key to run the workflow.

### **Ignore privacy rules when running the workflow**

An API workflow is run based on the token sent. All privacy rules will apply. Sometimes, you may want the workflow to bypass these rules, even if run without authentication, and run as an admin user who has all rights to the data. Check this box to ignore the privacy rules.

Warning: Because these are security and privacy options, use this feature with caution.

### **Trigger workflow with**

Select the HTTP request (POST or GET) by which you want to trigger the request.

### **Parameter definition**

Parameters are the data the API workflow can accept. You have two options to define them: manually or automatically.

To manually define the parameters, you list them one by one. This option is available when you trigger an API workflow using either a POST or GET request. When triggering with a GET request, the parameter definition is automatically set to be a manual definition. This is because GET requests only have url string query parameters and do not have a body from which to detect data.

To automatically define the parameters, you need to use an external call to hit the API workflow's endpoint, and Bubble will automatically detect the structure of the data. This option is only available when you can trigger an API workflow using a POST request. This type of detection is especially helpful for webhooks.

### **Call parameters**

Define which parameters the API workflow takes. Use this when you need to send data to Bubble's server, e.g., an email for signing the user up or information to create a new thing.

For POST requests, this data should be set in the body of the POST request, except if you check the 'Querystring' box, in which case the parameter will be read from the URL as a querystring.

GET requests do not have a body, and the parameter must be read as a querystring. Therefore, querystring is automatically selected for all parameters when you trigger the workflow using GET. Enter a key and define the data type. If this is a list, check 'Is a list/array.' If this parameter is optional, check 'Optional.'

When a request is received, the Bubble workflow engine checks the validity of the data and returns a 400 error if the data is invalid. Note that if the parameter is set to 'Querystring', it will not be made available for scheduling actions, this feature should only be used if the service that hits the API requires to add the parameter in the URL.\
\
Access the value of the parameters in the subsequent actions of the workflows using the data source dropdown menu. You will see the parameters you defined at the top of the menu.

### **Include headers in the detected data**

When the parameters are detected from an initialization request, you can include the request headers in the detected data if some important data is in them.

### **Detect data**

Click this button to enter the initialization mode. This will open a popup, which indicates that your app is ready to receive a POST request. You can then trigger a POST request to this API workflow's endpoint, adding `/initialize` at the end of the URL. This request should include a sample of the data that should be sent when the webhook is functional. Until the request is detected, this popup should remain open. Once the request is detected, you'll be able to see the detected data and pick the data types (see below).

### **Modify types**

Once an API workflow has been initialized (see above), you can modify the data structure of the received object. You can ignore some keys, and modify the field type of each key, value to be able to use the data in subsequent actions.

### **Response type**

The API can return a response as a JSON object, or redirect to a page in your app and return data as querystring. Using a 302 page redirect is useful when you call the API workflow from the browser.

### **Return a 200 if condition is not met**

By default, Bubble will return a 400 error if the condition you've set on the workflow is not met. Check this box to change this setting and return a 200 code instead. Use this when the API workflow is used in a webhook, and the emitting source expects a 200 code.

### **Redirection on success**

Pick here the page Bubble should redirect to at the end of the workflow. If the workflow returns data, it will be added as querystrings to the URL.

### **Redirection on error**

Pick here the page Bubble should redirect to at when the workflow fails. The statusCode and the message will be added to the URL as querystrings.

### Timezone selection

Override the API request's timezone by setting an alternative timezone with a static or dynamic choice. For this setting to be available you must first enable the setting *Enable timezone override controls* in your app's [general settings](/core-resources/application-settings/general#enable-timezone-override-controls).

## Return data from API

This action defines which data should be returned by the API Workflow.

### **Content-type**

Select the content-type that you want to return:

* Structured JSON (default)
* Plain text
* Other content-type

#### Other content-type

Selecting *Other content-type* reveals the *Custom type* input. Enter a static or dynamic value for the content-type that you want to include in the header. This field cannot be empty.

### **Text to return**

Define the text to return. It can be dynamic using the Composer.

### **List of parameters**

These are the keys and data types of the parameters that are returned. When the name and type of data are set, define the data you want to return. In the case of the Workflow API, we limit the size of lists to 50 entries. For a full list of data, please use the Data API that handles pagination.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Postman* is a third-party app for viewing and testing API calls.

    External page: [Postman](https://www.postman.com)

[^3]: *Workflows* are a combination of an event and one or more actions.

    Article series: [Workflows](/help-guides/logic/workflows)

[^4]: *Backend workflows* is the umbrella term for workflows that happen entirely on the Bubble server, as opposed to on the user's device.

    Article: [The frontend and the backend](/help-guides/logic/the-frontend-and-backend)\
    Article: [Backend workflows](/help-guides/workload/optimizing-workload/optimization-checklist/backend-workflows)
