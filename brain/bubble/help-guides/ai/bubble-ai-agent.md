# Bubble AI Agent
> Source: https://manual.bubble.io/help-guides/ai/bubble-ai-agent · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
**AI Agent availability:** The AI Agent is currently available on all new apps — blank, templated, and built by Bubble AI. It’s a beta release, and we’re continuously improving its output. Some responses may contain errors or inaccuracies.
{% endhint %}

The Bubble AI Agent is an in-editor assistant that helps you build, troubleshoot, and understand your app more efficiently. It uses Bubble documentation and app context to provide hands-on guidance so you can spend less time searching for answers and more time building. You can also prompt it to create and modify simple UI elements.

### Permissions

The Agent has the same permissions as the user who initiates the chat. If you are an editor, it can make edits on your behalf. If you only view-only permissions, the Agent will only be able to inspect and provide guidance.

If you have collaborators in your app, their Agent will inherit their permissions. This ensures that someone with read-only or view-only permissions to your app will not be able to edit your app using the Agent. If they try to edit, the Agent will gracefully decline.

### How to access the AI Agent

The Agent opens automatically the first time you load your app — there’s nothing to install or activate. You can minimize it at any time and reopen it by clicking the magic wand icon in the top navigation bar: <img src="/files/WrGEvtI7kQlfc6Jz4lI0" alt="" data-size="line">. The window is resizable and responsive, and it remains open until minimized <img src="/files/HGEC8QpkPoaSqSX42b82" alt="" data-size="line">. You can keep it visible while working in the editor or hide it when you prefer a cleaner workspace.

## What the AI Agent can do

The AI Agent has the following capabilities:

* [UI creation and modification from prompts and images](#ui-creation-and-modification)
  * [Generate images, and find suitable stock images](#generating-images)
* [Generate and edit data types](#data-type-generation-and-modification)
* [Generate and edit option sets](#option-set-generation-and-modification)
* [Dynamic expressions](#dynamic-expressions)
* [Generate and modify frontend workflows](#generate-and-modify-workflows)
* [Create API calls and collections](#create-api-calls-and-collections)
* [Work with plugins](#work-with-plugins)
* [App-specific explanations](#app-specific-explanations)
* [Issue checker integration](#issue-checker-integration)
* [Education and guidance](#education-and-guidance)

It’s multilingual — you can prompt it in your preferred language, and it will respond in the same language.

The Agent supports you in building, understanding, and learning within Bubble — from making visual edits to explaining how your app works.

If you click on any part of your app, the Agent automatically gets the context of what you’ve clicked on, so it will give higher quality output in all three key areas listed above. We highly encourage you to click on a part of your app (hold down shift to select multiple elements) when you want to make changes to it or learn more about it.

You have full control here – remove the context by clicking “x” next to the relevant icon within the chat:

<div data-with-frame="true"><figure><img src="/files/UYMwmNJcFGoMVTzkZOID" alt=""><figcaption></figcaption></figure></div>

### UI creation and modification

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

#### Uploading images

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

#### Confirming your AI prompt

After you prompt UI creation and modification, the Agent will present a plan to you that you can either approve or cancel. Click approve and the changes will instantly be made.

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

### Dynamic expressions

The AI Agent automatically creates or edits dynamic expressions based on your prompt. When you ask it to make a change, it searches your app for the right data sources and operators needed to complete the task. It then summarizes the updates it plans to make so you can review and approve them.<br>

* You might have a repeating group which contains a list of all tasks completed by all users, and you want to show tasks completed by the current user.\
  **Example prompt:** After selecting the repeating group to give the AI Agent context, you can prompt: *“Can you generate an expression for this repeating group that searches for a list of tasks completed by the current user?”*<br>

  <figure><img src="/files/RfXyMC89EZRL6fgk5yup" alt=""><figcaption></figcaption></figure>
* If you have a task management system, you can display who completed a task by adding a text element to the cell.\
  **Example prompt:** *“Edit this expression to also include the email address of the user who completed the task.”*

{% hint style="warning" %}
**Current limitations:** this version can’t incorporate conditionals, and it can’t leverage data sources from API calls, since plugins aren’t currently supported by Bubble AI.
{% endhint %}

### Data type generation and modification

The AI agent can generate new data types and modify existing data types and their accompanying fields. We recommend using the Agent over the data type generation tool on the Data tab because it’s able to modify existing fields as well.

Create new data types

Say you're building a gym management app. You might need to add additional data types beyond what was initially generated, like a Gym data type.

* You can prompt: "Add a Gym data type with fields: Name (text), address (text), capacity (number), opening\_hours (text).”

<figure><img src="/files/wPzzqRyQXPnYBd2fFYbv" alt=""><figcaption></figcaption></figure>

Modify existing data types

You can also add fields to data types that already exist:

* Prompt: "Add Location and Hiring Manager fields to my Job data type"

<figure><img src="/files/MBT9pocxzsti6723cVs3" alt=""><figcaption></figcaption></figure>

You can view and edit any generated data types in the [data tab](https://manual.bubble.io/help-guides/data/the-database) immediately.

Current limitations: this version can’t delete data types or field types, or remove fields from existing data types. It cannot modify existing field types (like converting a Salary field to be a number instead of text).

### Option set generation and modification

The AI Agent can also create and modify [option sets](/help-guides/data/static-data/option-sets). It can do this as the result of a direct prompt (`"Generate an option set for [...]"`), or as part of a broader request where the AI Agent determines that an option set is needed. You can view and edit any generated option sets in the [data tab](https://manual.bubble.io/help-guides/data/the-database) immediately.

### Generate and modify frontend workflows

You can prompt the AI Agent to generate frontend workflows within your app. Prompt the Agent, then navigate to the Workflow tab to see the workflow it built for you. We recommend starting with simpler prompts for highest accuracy. At launch, workflow creation has higher accuracy than workflow editing.

**Create new workflows**

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

**Modify existing workflows**

If you’ve made some changes to your database and you need to update the workflow accordingly, you can prompt “I’ve added a birthday date field to the user data type and to the form. Please capture that date field’s value here in the sign up action.”

<figure><img src="/files/L7dl4uifZR8WE9OGrzzN" alt=""><figcaption></figcaption></figure>

### Create API calls and collections

The Agent can set up API integrations for you by creating API calls and collections in the [API Connector](/help-guides/integrations/api/the-api-connector) from a natural-language description. Describe the request you want to make, including the endpoint, HTTP method, authentication, and any parameters, and the Agent generates the call and imports it into the API Connector.

You can prompt the Agent to:

* **Create an API collection** with a name, notes, and an authentication method, such as a Bearer token, an API key in a header, or Basic auth, along with the properties that method needs.
* **Create an API call** with a specific HTTP method (GET, POST, PUT, PATCH, or DELETE), a URL, query and path parameters, headers, and a request body.

You'll get the best results when your prompt includes specific details, such as the full endpoint URL, the method, the authentication type, and the fields the request should send. Pulling the relevant details from the API provider's documentation helps the Agent configure the call correctly.

When a value should be dynamic, the Agent sets it up using Bubble's parameter syntax (angle brackets, like `<user_id>`) across the URL, headers, and request body, so the call is ready to wire up to your app's data.

#### **Handling secrets**

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

### Work with plugins

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

### App-specific explanations

The AI Agent understands your app’s structure and elements, along with general context — such as the page you’re viewing or the element you’ve selected — allowing it to:

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

#### Context limitations

Currently, the AI Agent can’t access or interpret plugins, logs, or other app details beyond your app’s design, logic, and data.

### Generating images

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

### Education and guidance

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
