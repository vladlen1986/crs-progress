# API workflows
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers API workflows and how to set them up in your application.

API workflows are server-side workflows that you can schedule/trigger in your application and/or expose to be triggered from an external application or system through an API request.

They run independently of any page, which means they can be executed without anyone visiting your app. By making an API request to the server that hosts your Bubble app, you can create things, sign users up and send emails – anything you can do with a regular workflow.

Whenever an event occurs in an external app and the application sends an [HTTP request](#user-content-fn-1)[^1] to your app, this is often described as a webhook[^2]. This allows you to start a process in your application, such as sending a welcome email or adding the user to a newsletter list.

Just like the [data API](/help-guides/integrations/api/the-bubble-api/the-data-api), these requests need to be pointed towards a specific resource[^3]. Bubble automatically creates a URL for each API workflow that you choose to expose. It follows then, that these too are incoming requests – they are coming into your app from somewhere else.

<details>

<summary>Activating and accessing the backend workflow editor</summary>

API Workflows are edited in the section of the Bubble editor called *Backend workflows.* To activate and access the backend workflow editor, follow the steps described in the article below:\
\
Article: [Activating and accessing the Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api#activating-the-workflow-api)

</details>

## API Workflows versus regular workflows

There are several key differences between an API Workflow and a regular Workflow:

<table><thead><tr><th width="330">Action</th><th width="207.33333333333331">API Workflow</th><th>Regular workflow</th></tr></thead><tbody><tr><td>Can be triggered from an external application</td><td>Yes</td><td>No</td></tr><tr><td>Will continue running even if the page is closed</td><td>Yes</td><td>No</td></tr><tr><td>Can schedule itself to loop</td><td>Yes</td><td>No</td></tr><tr><td>Can be scheduled to run in the future</td><td>Yes, and will run even if the page is closed</td><td>Yes, but page must remain open</td></tr><tr><td>Can override privacy rules</td><td>Yes</td><td>No</td></tr><tr><td>Are executed 100% server-side</td><td>Yes</td><td>No</td></tr></tbody></table>

## Using server-side workflows

Setting up workflows that run server-side is useful in several situations:

### **Security**

Since the workflow is executed away from the page and user, it’s more secure. One of the main principles of web development is that any kind of process that is performed on the page can technically be intercepted by a savvy user, whereas an action happening on the server can be kept securely hidden away from prying eyes. This is not to say that all workflows triggered on a page are insecure, only that the user of the device may be able to see what’s going on. In most cases this is not a problem, but in some corner cases you should be mindful of where the process takes place.

Let’s say for example that you want to generate a random string of text to send to the user as an extra means of authentication. If you generate that code in a workflow on the page that the user is looking at, the user might be able to see the string that has been generated and circumvent the security measure. This string should be generated and emailed in a backend workflow, since the user can’t see what’s going on on the server.

### Performance

API Workflows technically spend the same amount of workload[^4] as a regular Workflow, but you can still use it to your advantage to make your app seem more performant to your Users. Since any action that takes place on the server does not cause any performance degradation on a Users page, you can move complex workflows to the server to keep your pages lightweight and its code base minimal.

Keep in mind the following as you plan for performance:

* While an API workflow doesn't create noticeable slowdown for users, it still adds to the total workload of your app.
* Scheduling an API Workflow is in itself a process that can take a few moments to complete - for simpler workflows it's sometimes quicker to simply complete the actions in the page workflow.

Everything that you add to a page (elements, workflows and conditions) will add to the total size of the page that the browser has to download. By moving parts of it to the backend, you can keep your page as lightweight as possible. Keep in mind that API workflows also spend your app's workload, so moving workflows into the backend only affects the loading time and size of the page.

### **Bulk operations**

API workflows are also where you can set up heavier workloads where you need to make changes to a high volume of data. There are a few reasons for why it makes sense to move processes to the backend:

* Processes running in the backend will continue to run until they are finished, whereas on-page workflows will stop running if the user closes their browser
* Backend workflows can schedule themselves, meaning that you can loop them. This is useful when you need to process a list of database things
* Complex on-page workflows can slow down the front-end of your app, but if run in the backend your users will not notice

## **Using API Workflows internally**

Using API Workflows internally[^5] is done in two steps. First you need to create the API Workflow, and then you need to use the *Schedule API Workflow* action to schedule or trigger it. The two articles below describe both parts of the process.

First you will need to create the API Workflow that you want to trigger/schedule:

{% content-ref url="/pages/pzIPD4tMYSIvIPiGVWG4" %}
[Creating API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows)
{% endcontent-ref %}

Then you need to use the *Schedule API Workflow* action to schedule the workflow at the current time or in the future:

{% content-ref url="/pages/2TOeYH9ZwnvwKT9U8KOs" %}
[Scheduling API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows)
{% endcontent-ref %}

If you want to run a sequential loop of workflows or schedule it to run at a given interval you can also consider using recursive workflows:

{% content-ref url="/pages/ni4y7FBqw4GEnUqvIg0I" %}
[Recursive API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)
{% endcontent-ref %}

## **Exposing API Workflows for external use**

After an API Workflow has been created and set up to be [exposed as a public API Workflow](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows#exposing-the-workflow-externally) you can trigger it from an external application by use of an API request. The articles below explain how to create API Workflows, as well as how to authenticate with the Bubble API.

First you will need to create the API Workflow you want to be able to trigger:

{% content-ref url="/pages/pzIPD4tMYSIvIPiGVWG4" %}
[Creating API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows)
{% endcontent-ref %}

Before you can access your workflow from an external system you need to decide what kind of authentication you want to implement:

{% content-ref url="/pages/XXd82yvCGzCNJKRN1MZ0" %}
[Authentication](/help-guides/integrations/api/the-bubble-api/authentication)
{% endcontent-ref %}

Finally you can send a request to your application by directing the external app towards the correct API Workflow endpoint:

{% content-ref url="/pages/Ot0gk4QBuwDtwB5lrVaU" %}
[Workflow API endpoints](/help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-endpoints)
{% endcontent-ref %}

[^1]: An HTTP request is a message sent by a client to a server to retrieve or update information via an API. This is the basis of a RESTful API call. HTTP requests use methods such as GET, POST, PUT, and DELETE.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)\
    Article section: [The HTTP protocol](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-a-restful-api)\
    Article section: [The HTTP method](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method)

[^2]: A webhook is a way for an app to provide other applications with real-time information.\
    \
    It lets an app to push data to your Bubble app immediately rather than waiting for the other app to request it.\
    \
    A webhook needs an URL to send the request to, and this is created by setting up an API Workflow.

[^3]: A resource is a specific item or endpoint accessible through an API request. In your Bubble app that can be a specific API Workflow or a Data Type.

    Article section: [What are resources?](/help-guides/integrations/api/introduction-to-apis#resource)

[^4]: Workload is the metric in Bubble that determines the total work performed by the Bubble server to keep your app running. You can read more about it in the article series below:\
    \
    Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)

[^5]: *Internally* in this case means that you schedule the API workflow in your own app, as opposed to from a third-party app or system.

    Article: [Scheduling API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows)\
    Reference: [Schedule API workflow](/core-resources/actions/custom#schedule-api-workflow)
