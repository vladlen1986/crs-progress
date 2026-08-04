# Bubble AI Agent
> Source: https://manual.bubble.io/help-guides/ai/bubble-ai-agent · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
**AI Agent availability:** The AI Agent is currently available on all new apps — blank, templated, and built by Bubble AI. It’s a beta release, and we’re continuously improving its output. Some responses may contain errors or inaccuracies.
{% endhint %}

The Bubble AI Agent is an in-editor assistant that helps you build, troubleshoot, and understand your app more efficiently. It uses Bubble documentation and app context to provide hands-on guidance so you can spend less time searching for answers and more time building. You can also prompt it to create and modify simple UI elements.

## Permissions

The Agent has the **same permissions as the user who initiates the chat**. If you are an editor, it can make edits on your behalf. If you only view-only permissions, the Agent will only be able to inspect and provide guidance.

If you have **collaborators** in your app, their Agent will **inherit their permissions**. This ensures that someone with read-only or view-only permissions to your app will not be able to edit your app using the Agent. If they try to edit, the Agent will gracefully decline.

## How to access the AI Agent

The Agent opens automatically the first time you load your app — there’s nothing to install or activate. You can minimize it at any time and reopen it by clicking the magic wand icon in the top navigation bar: <img src="/files/WrGEvtI7kQlfc6Jz4lI0" alt="" data-size="line">. The window is resizable and responsive, and it remains open until minimized <img src="/files/HGEC8QpkPoaSqSX42b82" alt="" data-size="line">. You can keep it visible while working in the editor or hide it when you prefer a cleaner workspace.

### Voice prompting

You can prompt the Agent by speaking instead of typing. Click the microphone in the chat prompt field and start talking. Your words appear in the prompt field in near real-time as editable text.

* Voice input is multilingual — speak in your preferred language.
* It works in current versions of Chrome, Brave, Firefox, Safari, and Edge.

The first time you use voice input, your browser asks for microphone permission. Voice input stays unavailable until you allow it. You can always type your prompt instead.

{% hint style="info" %}
Your audio is used **only to produce the transcript** and **isn't stored**. Voice input is for dictating prompts (the Agent replies in text, not speech) and is designed for short prompts rather than long recordings. If transcription is ever unavailable, you can keep working by typing.
{% endhint %}

## What the AI Agent can do

The AI Agent has the following capabilities:

* [UI creation and modification from prompts and images](#ui-creation-and-modification)
  * [Generate images, and find suitable stock images](#generating-images)
* [Generate and edit data types](#data-type-generation-and-modification)
  * [Read your app's data](#reading-your-apps-data)
* [Generate and edit option sets](#option-set-generation-and-modification)
* [Dynamic expressions](#dynamic-expressions)
* [Generate and modify frontend workflows](#generate-and-modify-frontend-workflows)
  * [Generate and modify backend workflows](#generate-and-modify-backend-workflows)
* [Create API calls and collections](#create-api-calls-and-collections)
* [Work with plugins](#work-with-plugins)
* [App-specific explanations](#app-specific-explanations)
* [Issue checker integration](#issue-checker-integration)
* [Education and guidance](#education-and-guidance)

It’s **multilingual** — you can prompt it in your preferred language, and it will respond in the same language.

The Agent supports you in building, understanding, and learning within Bubble — from making visual edits to explaining how your app works.

If you **click on any part of your app**, the Agent automatically gets the **context of what you’ve clicked on**, so it will give higher quality output. We highly encourage you to click on a part of your app (hold down shift to select multiple elements) when you want to make changes to it or learn more about it.

You have full control here – remove the context by clicking “x” next to the relevant icon within the chat:

<div data-with-frame="true"><figure><img src="/files/UYMwmNJcFGoMVTzkZOID" alt=""><figcaption></figcaption></figure></div>

## UI creation and modification

The Agent can create or modify your app’s design, including:

* Full pages – you can prompt to create a new page
* Specific sections like headers, navigation bars, or footers
* Individual components such as groups, image elements, text, and buttons
  * The AI agent can also generate images. See more [below](#generating-images).

When generating elements that benefit from images, such as pages, repeating groups, or individual image elements, the Agent also generates the images. Placeholders like sample images in repeating groups are pulled from stock sources such as Unsplash or Picsum, while static assets use AI-generated images.

Sample prompt: *"Build a landing page for a coffee subscription with a hero image and a 3-column feature section with icons."*

You’ll get the best results when prompts are specific about what to change and where. You can also [upload images](#uploading-images) to guide the Agent.

When the Agent creates elements, it follows design best practices:

* All elements are responsive by default
* Layouts are well-organized with logical parent-child relationships
* Proper margins and padding are applied
* App style variables are respected for consistent design

### Uploading images

You can upload images of a desired UI to the Agent and it will replicate them using Bubble elements.

<figure><img src="/files/ApqEPTbemdmNZVxZ3uHU" alt="Uploading images to the Bubble AI Agent" width="443"><figcaption><p>Click the image icon in the bottom left corner to upload up to five images.</p></figcaption></figure>

This makes it faster to convert Figma designs into Bubble elements, or use screenshots of other products as inspiration. Note that asking the Agent to insert images into your canvas is not supported.

You can upload up to five images with a prompt, and we currently support JPG, PNG, GIF and WebP.

**Sample prompt:**

{% code overflow="wrap" %}

```
Can you build me a login page that is inspired by this screenshot, but customized to my app’s styles and design aesthetic?
```

{% endcode %}

### Confirming your AI prompt

After you prompt UI creation and modification, the Agent will **present a plan** to you that you can either approve or cancel. Click approve and the changes will instantly be made.

<figure><img src="/files/xpydp8cipIW1KIp5nu2C" alt=""><figcaption><p>You can easily add new elements, and the AI Agent understands your app’s context to ensure they’re created and configured correctly.</p></figcaption></figure>

<details>

<summary>More examples: UI creation and modification</summary>

* `Add a new page with a form allowing users to upload new products into the database`
* `Add a button labeled “Sign up” to the Home page header.`
* `Insert an input field and a “Submit” button in the Contact page form.`
* `Add a repeating group on the Products page showing each product’s name and price.`
* `Set the Signup button’s color to Primary.`
* `Create a popup where users can edit their first name, last name, and phone number.`

</details>

## Dynamic expressions

The AI Agent automatically **creates or edits dynamic expressions** based on your prompt. When you ask it to make a change, it searches your app for the right data sources and operators needed to complete the task. It then **summarizes the updates** it plans to make so you can **review and approve** them.<br>

* You might have a repeating group which contains a list of all tasks completed by all users, and you want to show tasks completed by the current user.\
  **Example prompt:** After selecting the repeating group to give the AI Agent context, you can prompt: *“Can you generate an expression for this repeating group that searches for a list of tasks completed by the current user?”*<br>

  <figure><img src="/files/RfXyMC89EZRL6fgk5yup" alt=""><figcaption></figcaption></figure>
* If you have a task management system, you can display who completed a task by adding a text element to the cell.\
  **Example prompt:** *“Edit this expression to also include the email address of the user who completed the task.”*

{% hint style="warning" %}
**Current limitations:** this version can’t incorporate conditionals, and it can’t leverage data sources from API calls, since plugins aren’t currently supported by Bubble AI.
{% endhint %}

## Data type generation and modification

The AI agent can **generate new data types and modify existing data types** and their accompanying fields. We recommend using the Agent over the data type generation tool on the Data tab because it’s able to modify existing fields as well.

### Create new data types

Say you're building a gym management app. You might need to add additional data types beyond what was initially generated, like a Gym data type.

* You can prompt: "Add a Gym data type with fields: Name (text), address (text), capacity (number), opening\_hours (text).”

<figure><img src="/files/wPzzqRyQXPnYBd2fFYbv" alt=""><figcaption></figcaption></figure>

### Modify existing data types

You can also add fields to data types that already exist:

* Prompt: "Add Location and Hiring Manager fields to my Job data type"

<figure><img src="/files/MBT9pocxzsti6723cVs3" alt=""><figcaption></figcaption></figure>

You can view and edit any generated data types in the [data tab](https://manual.bubble.io/help-guides/data/the-database) immediately.

Current limitations: this version can’t delete data types or field types, or remove fields from existing data types. It cannot modify existing field types (like converting a Salary field to be a number instead of text).

## Reading your app's data

The Agent can read the actual records in your app's database, so it can answer questions about your data, debug data-driven pages, and confirm that a change worked without sending you to the Data tab.&#x20;

This makes it easy to find records and their data quickly, check for inconsistencies in the database, verify workflow results, and trace how records relate to each other across data types. It's also useful for exploring your schema, testing edge cases with real data, and quickly checking whether a workflow you built produced the results you expected.

{% hint style="info" %}
The AI Agent can currently only access your **development database.**
{% endhint %}

### Examples

#### Check why data isn't showing as expected

If you're not seeing the data you expected when previewing your app, the AI Agent can help you identify the root cause:

```
Why is the repeating group on my Dashboard page empty in preview mode?
```

#### Verify workflow results

If you're making changes to one or more database records in a workflow, you can ask the AI Agent to confirm the changes:

```
Can you check the cart total in the last updated shopping cart?
```

#### Explain relationships between records

The Agent can trace how data types connect to each other, helping you quickly understand your database structure:

{% code overflow="wrap" %}

```
Which data types have a field that references the Order data type?
```

{% endcode %}

#### Test edge cases

The Agent can identify unusual records that might be affecting behavior, such as empty fields, unusually long values, or records missing expected relationships.

{% code overflow="wrap" %}

```
Can you find customers that don't have an assigned account manager?
```

{% endcode %}

### **What it can do**

#### Search a data type using filters

The AI Agent can search through your data types using filters such as equals, contains, greater than, less than, in and \[...] is empy. It can also sort and page through the results.

#### Look up a specific record

It can also search for a specific record and return its data.

#### Return the exact query

The AI Agent can also provide information about how it performed the query, such as the data type, the constraints and filters it used, and how many results came back. This is displayed inline in the chat, so you can see exactly what it looked at.

### **Enabling AI Agent database access**

The AI Agent's access to the database is off by default. To enable it, go to *Settings – Collaboration* and turn on *Allow AI Agent access to App data*. From there, you can enable the specific data types you want the Agent to see.&#x20;

<figure><img src="/files/3J9PjW9NQ2oxATGsRxoQ" alt="Enabling AI Agent database access"><figcaption><p>You can adjust Agent permissions in <em>Settings – Collaboration.</em></p></figcaption></figure>

{% hint style="info" %}
**Your data stays protected.** Sensitive fields are hidden automatically. Fields matching patterns like tokens, passwords, secrets, and Stripe fields are never shown to the Agent or included in its responses, and owners can mark additional fields to exclude. Your existing privacy rules still apply, so records hidden by a privacy rule stay hidden. Data is read fresh for each request and isn't stored in the conversation.
{% endhint %}

{% hint style="warning" %}
**Current limitations:** this version is **read-only** — the Agent can't create, edit, or delete records this way. By design, it reads the **development database only** (never your live/production database). It is also limited to **owner/admin collaborators**, and it can't:

* Run aggregations or analytics (such as counts or sums across records)
* Query very large tables beyond the standard Data API limits

There's also a limit on how many data lookups the Agent can make in a single conversation. If you reach it, start a new conversation to continue.
{% endhint %}

## Option set generation and modification

The AI Agent can also create and modify [option sets](/help-guides/data/static-data/option-sets). It can do this as the result of a direct prompt (`"Generate an option set for [...]"`), or as part of a broader request where the AI Agent determines that an option set is needed. You can view and edit any generated option sets in the [data tab](https://manual.bubble.io/help-guides/data/the-database) immediately.

## Generate and modify frontend workflows

You can prompt the AI Agent to generate frontend workflows within your app. Prompt the Agent, then navigate to the Workflow tab to see the workflow it built for you. We recommend starting with simpler prompts for highest accuracy. At launch, workflow creation has higher accuracy than workflow editing.

### Create new workflows

For example, as you're building a login and signup flow, you can click on the login button, then ask the Agent to “Please add a workflow that signs the user up given these inputs. Be sure to include the password confirmation and full name field.”

<figure><img src="/files/Ujre52CkF5NoI5jOaHta" alt=""><figcaption></figcaption></figure>

Here’s a full list of events that the Agent can create workflows for:

* General
* User is logged in
* User is logged out
* Page is loaded
* Do every five seconds
* Do when condition is true
* An unhandled error occurs
* Elements
* An element is pressed
* An input’s value is changed
* An element has an error running a workflow

With the following actions:

* Account actions
* Navigation actions
* Data/things actions (base actions, not actions installed later)
* Emails/Notifications (base actions, not actions installed later)
* Element actions

### Modify existing workflows

If you’ve made some changes to your database and you need to update the workflow accordingly, you can prompt `I’ve added a birthday date field to the user data type and to the form. Please capture that date field’s value here in the sign up action.`

<figure><img src="/files/L7dl4uifZR8WE9OGrzzN" alt=""><figcaption></figcaption></figure>

## Generate and modify backend workflows

The Agent can create and edit backend (API) workflows. Prompt the Agent, then open the backend workflows tab to see what it built.

### **Create backend workflows**

You can ask the Agent to:

* Create a new backend workflow by name, set up as an API workflow or a scheduled workflow.
* Add parameters, each with a name, a type, and whether it's required or optional.
* Add common actions — create a thing, make changes to a thing, delete a thing, an API Connector call, and Schedule API Workflow (for a single item or on a list).
* Apply *Only when* conditions to individual actions.
* Build recursive workflows that reschedule themselves over a list using an incrementing index.
* Run a workflow on a schedule (for example, every Friday) instead of triggering it from an API call.

### Modify backend workflows

You can also ask the Agent to explain or edit backend workflows, such as:

* Adding or removing actions
* Change the properties of the backend workflow
* Set up *Only when* conditions on the workflow or individual actions
* Add or change parameters and their settings

### **Connecting frontend and backend**

When the Agent creates a backend workflow, it can also wire up the matching [Schedule API Workflow](/core-resources/bubble-workflows/bubble-actions/backend-workflows#schedule-api-workflow) action on the frontend so the workflow actually gets triggered. You can also point it at an existing backend workflow (for example, *`connect this to the Submit button on my Checkout page`)* and it adds the Schedule API Workflow action with the right parameter bindings.

### **Troubleshooting**

The Agent can inspect an existing backend workflow to help find and fix issues, such as broken references or a misconfigured *Only when* condition.

{% hint style="warning" %}
**Current limitations:** the Agent keeps to the same complexity limits as frontend workflows and will decline very complex workflows. The following are not supported:

* Custom events
* Payment actions, plugin actions, and analytics actions
* Creating or managing workflow folders
* Running or test-running a workflow for you
  {% endhint %}

### Sample prompts

{% code overflow="wrap" %}

```
Create a backend API workflow named publish-post with a parameter for post. The workflows should change the published field on the post to yes.
```

{% endcode %}

{% code overflow="wrap" %}

```
Add a condition to the publish-post API workflow so it only runs if the current user's "admin" is set to yes.
```

{% endcode %}

{% code overflow="wrap" %}

```
Create a workflow on the Publish post button on the dashboard page, that triggers the publish-post backend workflow. Use the parent group's post as the post parameter.
```

{% endcode %}

### Create API calls and collections

## Create API calls and collections

The Agent can set up API integrations for you by creating API calls and collections in the [API Connector](/help-guides/integrations/api/the-api-connector) from a natural-language description. Describe the request you want to make, including the endpoint, HTTP method, authentication, and any parameters, and the Agent generates the call and imports it into the API Connector.

You can prompt the Agent to:

* **Create an API collection** with a name, notes, and an authentication method, such as a Bearer token, an API key in a header, or Basic auth, along with the properties that method needs.
* **Create an API call** with a specific HTTP method (GET, POST, PUT, PATCH, or DELETE), a URL, query and path parameters, headers, and a request body.

You'll get the best results when your prompt includes specific details, such as the full endpoint URL, the method, the authentication type, and the fields the request should send. Pulling the relevant details from the API provider's documentation helps the Agent configure the call correctly.

When a value should be dynamic, the Agent sets it up using Bubble's parameter syntax (angle brackets, like `<user_id>`) across the URL, headers, and request body, so the call is ready to wire up to your app's data.

### **Handling secrets**

To keep your credentials safe, the Agent never sends API keys, tokens, or other secrets to the AI service, and they aren't written to logs or chat history. If you include a key or token in your message, it's automatically removed before your prompt is processed.

When a call or collection needs a secret value, the Agent inserts a `REPLACE ME` placeholder instead. Once the Agent finishes, open the call in the API Connector and replace each placeholder with your real value.

{% hint style="warning" %}
The Agent doesn't initialize the calls it creates. After it's finished, open the new API call in the API Connector, replace any `REPLACE ME` placeholders with real values, and click *Initialize call* to verify it works before using it in your app.
{% endhint %}

{% hint style="info" %}
Select an existing API call or collection before prompting to give the Agent context. It'll use that as a reference when creating the new one.
{% endhint %}

<details>

<summary>More examples: API Connector creation</summary>

Create an API collection named "Weather" that authenticates with an API key in a header called "x-api-key".

* Create a GET call to <https://api.github.com/users/\\><username> with an Accept header set to application/vnd.github+json.
* Set up a PUT call that updates a product at <https://api.mystore.com/products/\\>\<product\_id> with a JSON body containing name and price.
* Add a DELETE call to the Weather collection that removes a saved location by its ID.
* Create a collection that authenticates using Basic auth.

</details>

{% hint style="warning" %}
**Current limitations:** the Agent can currently create API calls and collections, but it can't edit, rename, delete, or reorder existing ones. It also can't:

* Initialize calls, meaning running a live request or setting up the response data type. You'll do this yourself.
* Configure OAuth2 authentication flows.
* Create multiple calls from a single prompt. Make one request at a time.
* Auto-detect or pre-configure popular APIs.
* Test or debug calls for you.
* Navigate you to the new call after creating it.

As with the rest of the Agent, plugins aren't supported, so plugin-based API actions are out of scope.
{% endhint %}

## Work with plugins

The Agent now has context of the plugins installed in your app. When you ask it to build something that involves a plugin, it knows which plugins you already have and references them accurately.

It can also search the plugin marketplace and suggest plugins to install when your request needs functionality your app doesn't have yet.

#### Sample prompt

{% code overflow="wrap" %}

```
"How do I add analytics to my app?"
```

{% endcode %}

If you have a plugin like Google Analytics installed, the Agent references it; if not, it will suggest you download it from the marketplace.

{% hint style="info" %}
The Agent can recognize installed plugins and suggest new ones, but it doesn't yet build or configure plugin actions (e.g. payment, analytics, or other plugin-based workflow actions) for you.
{% endhint %}

## App-specific explanations

The AI Agent **understands your app’s structure and elements**, along with general context — such as the page you’re viewing or the element you’ve selected — allowing it to:

* Help troubleshoot workflows and dynamic expressions
* Answer questions about how elements are configured
* Explain how your app is wired together

Selecting an element gives the Agent clear instructions to focus on it in relation to your prompt. The Agent also includes deep-links to UI elements in its explanations, so you can click and see what elements it’s referring to.

<figure><img src="/files/xHemTsrdpAm7tGgAGAbC" alt=""><figcaption><p>The AI Agent links directly to the elements mentioned in your query, allowing you to click and view exactly what it’s referring to.</p></figcaption></figure>

<figure><img src="/files/5cFsLF1tKSWVQsiqYlYz" alt=""><figcaption><p>The AI Agent can explain the purpose of specific parts of your project and suggest logical next steps in your development process.</p></figcaption></figure>

<details>

<summary>More examples: App-specific explanations</summary>

* `How do custom states work for showing and hiding elements?`
* `What’s the difference between frontend and backend workflows?`
* `How do I display data in a repeating group?`
* `How do privacy rules work in my app?`
* `Are there any button missing workflows on this page?`
* `Can you explain all the places a user can navigate to from this page?`

</details>

## Generating images

When generating elements that benefit from images, such as pages, repeating groups, or individual image elements, the AI Agent also generates the images. Placeholders like sample images in repeating groups are pulled from stock sources such as Unsplash or Picsum, while static assets use AI-generated images.

#### Sample prompt:

{% code overflow="wrap" %}

```
Build a landing page for a coffee subscription with a hero image and a 3-column feature section with icons.
```

{% endcode %}

<figure><img src="/files/aBsza2q85USBRT4aIaJf" alt=""><figcaption><p>The AI Agent can generate images for purposes like hero sections and find suitable stock photos for placeholders and sample content.</p></figcaption></figure>

## **Issue Checker integration**

The AI Agent has access to Issue Checker context, allowing it to automatically resolve issues within its current capabilities. At the moment, it has access to the first 100 issues in your app. To fix an issue, prompt the system with a command such as “Fix the first issue for me.” The Agent will then attempt to resolve it automatically.

For best results, **click on the issue you are trying to solve**, and then prompt the Agent to solve it.

{% hint style="warning" icon="rectangle-beta" %}
**Note:** This feature is in **early access**. While using experimental features, please make sure to double-check the Agent’s work and expect more polish coming soon.
{% endhint %}

{% hint style="warning" %}
Note that **only supported issues can be fixed**. Issues outside the agent’s current capabilities will need to be handled manually.
{% endhint %}

## Education and guidance

Bubble’s AI Agent uses Bubble knowledge and documentation to guide you accurately through building, editing, or troubleshooting your app.

When you ask a question, the Agent references official sources — including the Bubble Manual — and responds with citations and helpful links. It can also search the web to surface the most relevant and up-to-date information.

This means its responses are based on trusted Bubble resources, and it can still guide you through solutions, even for tasks it can’t perform directly.

<figure><img src="/files/0CjXPQeycXyH04PHHgUT" alt=""><figcaption><p>The AI Agent can walk you through complex problems with clear, step-by-step guidance.</p></figcaption></figure>

<details>

<summary>More examples: Education and guidance</summary>

* Show me how to connect an API using the API Connector.
* What are the best practices for setting up database privacy rules?
* Explain how to structure data for a marketplace app.
* How can I optimize backend workflows for performance?
* How can I set up user log in with Google?

</details>

## General prompting advice

* Keep prompts short and focused — concise requests are easier for the AI to interpret.
* Include specific details such as element names, field types, or labels.
* Make one request at a time for the most accurate results.
* Use Bubble terminology to describe what to create or edit.
* When modifying something, specify both what should change and how.
* You can also ask the AI to explain what a change will do before applying it.
* Be clear about what not to change
* Select the elements or workflows you want the Agent to work with before sending your prompt.
