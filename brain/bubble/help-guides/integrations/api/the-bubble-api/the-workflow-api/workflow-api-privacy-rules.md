# Workflow API privacy rules
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-privacy-rules · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how API Workflows are affected by privacy rules.

Whenever you run any kind of workflow in your app, they will respect the privacy rules of any data type referenced in that workflow. The same applies to API workflows - the authentication of the client sending the request determines what kind of data they have access to.

<figure><img src="/files/PU801MpGFyrziwCgYvgx" alt=""><figcaption><p>Privacy rules serve as a secure filter to stop unauthorized access to your app's database.</p></figcaption></figure>

It’s important to note that privacy rules apply to what data they can see, but it doesn’t affect the actions in your workflow. For example, a workflow may be affected by the *Find this in searches* privacy setting: in this scenario, an authenticated client would only be able to search for things that a privacy rule grants them access to.

> Privacy rules affect your ***database**.* They can stop an API workflow from accessing specific *data* based on who the client[^1] is, but it will **not** stop the API workflow from running altogether.

Let’s say that you have a [*Make changes to a thing*](#user-content-fn-2)[^2] action inside of that workflow. The action would complete regardless of privacy rules, but if you are searching for a thing to make changes to, privacy rules may stop you from *finding* the thing you want to change.

In other words, the action would technically complete, but if you don’t find the record you want to make changes to it won’t make any difference.

> The new privacy rule settings that are introduced when you activate the Data API in your app’s settings (Create via API, Modify via API and Delete via API) do **not** affect your API workflows.

In essence, by running an API workflow you have the freedom to change anything you want in the database, but the access to database records is still protected by privacy rules.

## Overriding privacy rules

In any API workflow you can override privacy rules by checking the *Ignore privacy rules* when running the workflow box. This is useful in cases where you need to execute a workflow that needs to have access to data that the Current User does not have have access to because of privacy rules.

<figure><img src="/files/ahfwwamJL95lVr4Q7TLX" alt=""><figcaption><p>Checking <em>Ignore privacy rules</em> lets you override the rules that affect the User that initiated the workflow in all the actions associated with this workflow.</p></figcaption></figure>

<br>

[^1]: The *client* is the one to initiate an API request, as opposed to the *server* who is the one to receive it and respond.\
    \
    In the context of privacy rules, the identity of the client is determined by how that client has authenticated the call.\
    \
    Article: [Authentication](/help-guides/integrations/api/the-bubble-api/authentication)

[^2]: The *Make changes to a thing* action is an action in Bubble that saves changes to one or more fields in a specific database record in your app.

    Reference: [Make changes to a thing](/core-resources/actions/data-things#make-changes-to-thing)
