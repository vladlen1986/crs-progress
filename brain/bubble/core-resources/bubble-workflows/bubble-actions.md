# Actions and properties
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Actions give life to the app. They save data, charge credit cards, sign the user up, send emails, connect to external services, show elements, etc.

<figure><img src="/files/hSA6ohISkg2sxudIaUFe" alt=""><figcaption></figcaption></figure>

[Workflows](/core-resources/bubble-workflows) and their respective actions belong in the Workflow tab. This is where you give Bubble instructions on what should happen in response to [events](/core-resources/bubble-workflows/bubble-events).

Each workflow starts with an **event** (trigger), followed by one or more **actions** that tell Bubble what to do.

```
Example:

Event → Action(s)
Button click → Create a new database thing
```

This section covers all of the actions in the [core library](#user-content-fn-1)[^1] and their respective parameters.

## Action steps

{% hint style="info" %}
**Note:** While workflows are designed as a linear sequence, the actual execution order can vary. Some actions run in the browser, others on the server, and some on both. When a workflow mixes these types, actions may not fire in the exact order they appear. You can read more about the order in which actions are triggered in the article section below.

Article section: [Actions](/help-guides/logic/workflows/actions#the-order-in-which-actions-are-triggered)
{% endhint %}

Actions run in the order they appear in the workflow, and each is assigned a step number based on its position in the sequence. This number serves two purposes: it gives you a visual reference for the action's position, and it lets you reference the output of a previous step using *Result of step \[...]*.

<figure><img src="/files/lwCs8rvHoRasSqAYsytc" alt="" width="339"><figcaption><p>Each action in a workflow is assigned a step number, shown as <em>Step 1</em>, <em>Step 2</em>, and so on.</p></figcaption></figure>

This number gives you a visual cue of the action's number, and also makes it possible to refer to a previous action for information.

### Referring to data from previous steps

Many actions refer to a data source to perform their task. For example, the *Make changes to the current user* action references a thing in the database of type *user*. You can refer to the data from a previous action by using the data source *Result of step \[...]*.

```
Button → Action 1 (Make changes to current user) → Action 2 (Result of step 1's First name)
```

In this example, step 1 writes changes to the current user in the database. Step 2 can then reference that same user using *Result of step 1*.

<table><thead><tr><th>Category</th><th width="126.203125">Web/mobile</th><th>Description</th><th>Link</th></tr></thead><tbody><tr><td>Account</td><td>Both</td><td>Actions related to user accounts.</td><td><a data-mention href="/pages/AtvmSLbVgKj4M2V2Pzpj">/pages/AtvmSLbVgKj4M2V2Pzpj</a></td></tr><tr><td>Navigation</td><td>Web</td><td>Actions related to web-specific navigation.</td><td><a data-mention href="/pages/fysfjGRIZUomTIC13Pp5">/pages/fysfjGRIZUomTIC13Pp5</a></td></tr><tr><td>Navigation</td><td>Mobile</td><td>Actions related to mobile-specific navigation.</td><td><a data-mention href="/pages/HFHHWwmIBgp0R1ftC4zk">/pages/HFHHWwmIBgp0R1ftC4zk</a></td></tr><tr><td>Data (things)</td><td>Both</td><td>Actions related to the database.</td><td><a data-mention href="/pages/oqiw0tFEKQv4w810mb2e">/pages/oqiw0tFEKQv4w810mb2e</a></td></tr><tr><td>Elements</td><td>Both</td><td>Actions related to elements.</td><td><a data-mention href="/pages/jBFRRz2u1brrkN2NclGa">/pages/jBFRRz2u1brrkN2NclGa</a></td></tr><tr><td>Email and notifications</td><td>Both</td><td>Actions related to sending emails and push notifications.</td><td><a data-mention href="/pages/2U66sb2WW4UpSaCxY9Yr">/pages/2U66sb2WW4UpSaCxY9Yr</a></td></tr><tr><td>Native mobile actions</td><td>Mobile</td><td>Mobile-specific actions</td><td><a data-mention href="/pages/QRdUg8x1O9U43N5cFkKQ">/pages/QRdUg8x1O9U43N5cFkKQ</a></td></tr><tr><td>Custom actions</td><td>Both</td><td>Actions related to triggering/scheduling custom events and reacting to database changes.</td><td><a data-mention href="/pages/cMxR69cKAafTkeQPf4YN">/pages/cMxR69cKAafTkeQPf4YN</a></td></tr><tr><td>Bubble-made plugin actions</td><td>Web</td><td>Actions related to plugins made by Bubble.</td><td><a data-mention href="/pages/DWuM09YMLrc47ca8It7y">/pages/DWuM09YMLrc47ca8It7y</a></td></tr><tr><td>In-app purchase actions</td><td>Mobile</td><td>Actions related to mobile in-app purchase actions (iOS and Android)</td><td><a data-mention href="/pages/43yY6ZbnnwBEV0deP2aB">/pages/43yY6ZbnnwBEV0deP2aB</a></td></tr></tbody></table>

[^1]: The core library contains the actions that come **built into Bubble**, as opposed to actions added by plugins or APIs.
