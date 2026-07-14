# Conditions
> Source: https://manual.bubble.io/help-guides/logic/conditions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Conditions, or conditional expressions[^1], let you set up mechanisms that check whether a specific question returns a *yes* or a *no* answer and then take an action, stop an action or make a change in your app in response.

{% hint style="info" %}
Conditions rely heavily on the use of **expressions.** We recommend that you get to know how dynamic expressions work.

Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
Reference: [Data sources](/core-resources/data/data-sources)\
Reference: [Operators and comparisons](/core-resources/data/operations-and-comparisons)
{% endhint %}

For example, if a user fills out a form but leaves a required field empty, a condition could be used to check whether the field is empty and, if so, prevent the form from being submitted until the missing information is provided.

This is used in several different scenarios:

[**Element conditions**](#element-conditions) lets you change the styling of an element based on the value returned by an expression. For example, you can make a button unclickable[^2] by asking the question "is the user logged out".

<figure><img src="/files/MOWyATQQe9oZmzkAqaTT" alt=""><figcaption><p>Placing conditional expressions on elements let you change their styling based on whether the expression returns a yes or no answer.</p></figcaption></figure>

[**Only when-conditions**](#only-when-conditions-workflow-conditions) are placed on workflows[^3] or actions[^4] that have already been triggered, to stop them from running if the condition does not return a *yes*. Only when-conditions are both a useful part of Bubble's workflow logic and an important part of your app's security.

For example, you can stop a [*Make changes to a thing* action](#user-content-fn-5)[^5] from running if an input field's value is empty.

<figure><img src="/files/5MXUfl7XmgQiHxCuIRJ6" alt=""><figcaption><p>In this example, the <em>Create a new thing</em> action will only run if the expression in the <em>Only when</em> field returns a <em>yes</em>. If not, Bubble will skip it and move on to the next action in the workflow (if any).</p></figcaption></figure>

**Do when-conditions** are workflows that trigger automatically if an expression returns a *yes* value. For example you could run a specific value whenever the question "is the current user logged in" returns a *yes* answer. They can be set up to run once, or every time the value changes.

<figure><img src="/files/ICmB8vcfUiUPT490FiD6" alt=""><figcaption><p>The event in this workflow checks whether the current user is logged in. When they are, the workflow will run. Note that it is set to <em>Run this just once,</em> which means it will only run once per session (page load).</p></figcaption></figure>

{% hint style="info" %}
**Backend triggers** are also workflows that triggers based on an expression, but they run in the backend and *server-side* meaning that they run independently of any page.

They can be used to trigger changes in the database.

\
Article: Backend triggers
{% endhint %}

## Element conditions

Element conditions are used to change the properties of an element when an expression returns a *yes.* Element conditions consist of two steps:

<figure><img src="/files/LEgXYkhYk5V2MSzUNFvR" alt=""><figcaption></figcaption></figure>

1. The expression that defines when the properties in point 2 apply
2. The properties that should be modified when the expression in point 1 returns a yes

In the example above, we make a button unclickable if the user is logged out. The styling is dynamic and instant, meaning that whenever data in the conditional expression changes, the styling of the element is immediately applied.

You can place multiple conditions on the same element, and more than one can be active at once (for example, one condition could make the button unclickable and another could change its color). If there are conflicting style options, the condition at the bottom will override those at the top since conditions are read top-down (as such, the bottom condition is applied last).

### Applying styles with conditions

Conditions can also apply a style to an element if certain criteria are met. For example, you can set up one style for "light mode" and one style for "dark mode", and when a condition is met, such as `Current user's dark mode = yes`, then the dark mode style is applied.

### Previewing conditions

When editing an element's condition, you can click ON/OFF to preview what the element will look like with its properties changed. This has no effect on the element in Run-mode.

{% embed url="<https://youtu.be/uF1gU9VXrg8>" %}
Our Academy quick tip on how to preview conditions on an element
{% endembed %}

## Run-mode debugging

As an element can have more than one condition, several conditions can be evaluated to yes on the same element. You will often have to debug an element's behavior when it involves conditions to understand its behavior, we recommend using the Debugger to inspect an element and figure out which condition is evaluated to true and how it impacts the element's appearance.

## Only when conditions (workflow conditions)

*Only when conditions* are applied to workflows and actions to ensure they only execute when certain conditions are met. For example, if you have a button that triggers a workflow you can instruct Bubble to check every time the button is clicked whether to proceed running the workflow.

<figure><img src="/files/x80x0cr21j215Ew1UdEU" alt=""><figcaption><p>In this example we have created a yes/no field called <em>Admin</em> on the user and we check that it's set to yes on the current user.</p></figcaption></figure>

If a condition is applied to a *workflow*, it will prevent all actions within that workflow from being executed. It's also possible to apply a condition to an individual *action*, which will only prevent that specific action from running.

### Alternating workflows and actions

You can also use conditions to alternate between different workflows depending on specific conditions. For example, you could have one workflow that completes a database operation like [*Create a new thing*](#user-content-fn-6)[^6] *only when* when current user is logged in and another workflow that shows an error message *only when* the current user is logged out.

<figure><img src="/files/ZKgmsYfeRGJO4lfCVOXY" alt=""><figcaption><p>Here we have two workflows with the same trigger (button clicked) but only one of them will ever run, depending on the admin status of the user.</p></figcaption></figure>

The same can be achieved by placing conditions on individual actions. If you have workflows with multiple action steps, we recommend keeping the two alternatives in separate workflows as it makes it easier to manage.

## Creating efficient expressions

{% hint style="info" %}
To learn more about how expressions are evaluated, we recommend reading the section **How expressions are processed** in our article about dynamic expressions.

Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
Article section: [How expressions are processed](/help-guides/logic/dynamic-expressions#how-expressions-are-processed)
{% endhint %}

An expression is processed until it reaches a definitive yes or no answer. This means that if an earlier part of the expression provides the necessary response, Bubble will not evaluate the remaining parts. This is to optimize for efficiency, as it reduces the amount of work needed.

You can further optimize your app by giving careful thought as to how your expressions are built. Knowing that Bubble evaluates from left to right and only processes what it needs to, we can make the app as efficient as possible by placing the fastest part of the expression in the beginning.

It's difficult to set a hard rule for what makes an expression slow down, but we can give some general guidelines:

* Expressions that evaluate something based on information already on the page are generally the fastest. For example:
  * Current user is logged in
  * Element is visible/invisible
  * Element's value is X
* Database operations such as *Do a search for* need to be sent to the server, processed and sent back to the device, meaning it can slow the expression down. The more complex the search, the slower.
* Operations that are processed on the device are generally very fast, but can become slow if they are doing complex processing. For example, if you have two repeating groups holding hundreds or thousands of things and you use the *intersect* operator on it (repeatinggroup1's list of things intersect with repeatinggroup2's list of things) you can end up with a process that takes some time to finish.

<figure><img src="/files/cfSogiZqcCERrh2Ibpl2" alt=""><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

In this example we are checking two things to verify if the task should proceed. The first is information that Bubble already has and can quickly check client-side. The second is a search that has to be performed on the server – it will take longer. By placing it last we can avoid having to check the last step if the user is logged out.

By determining which components of an expression are likely to take up the most time, you can strategically arrange them such that the quicker parts are positioned at the beginning. By doing so, Bubble has a higher chance of finding the required answer in a shorter amount of time.

## Using conditions for security

Conditional expressions are an important part of your app's security, but it's important to understand how some conditions provide proper security while others only provide obfuscation.

### Obfuscation versus security

The phrase "Obfuscation is not security," is common when discussing security, and this holds true for Bubble as well. While obfuscation may increase the difficulty for an attacker to exploit vulnerabilities, it cannot provide sufficient security to be deemed truly secure.

That's not to say that you should *avoid* obfuscation. It's always a good thing to make it more challenging for attackers to exploit vulnerabilities and it can also be an important part of the user experience. The important thing is to be aware of what can be considered and what can't.

### Element conditions

Using conditions to hide/show element, make them unclickable/uneditable and/or changing their styling is a common way of providing and communicating security.

<figure><img src="/files/MOWyATQQe9oZmzkAqaTT" alt=""><figcaption><p>It's a good practice to implement styling conditions as a part of your UX, but it should not be considered a secure way to stop a workflow from running.</p></figcaption></figure>

While this makes good sense from a UX perspective, it's important to note that it should not be considered secure. Since the elements on your page are part of the downloaded application code, a technical user could be able to find ways to change the styling, such as showing an element that is supposed to be hidden.

As such, this should be considered **obfuscation**.

### Workflow conditions

Placing conditions on your workflows and/or actions are a more secure way of stopping unathorized use and are, along with Privacy Rule&#x73;*,* a central part of your security.

Still, there are some guidelines you should follow to increase security:

* Conditions that can be checked server-side[^7] are more secure than conditions that rely on something on the [client side](#user-content-fn-8)[^8].
  * A typical example involving the server is to check something in the database, such as *Current User's Admin = yes.* Since Bubble can check this without relying on anything on the client's device, it can be considered secure
  * An example of the opposite is to check something on the page, such as "Element X is visible" or similar things. This would rely on information on the user's device, and is easier to circumvent
* If you have multiple courses of action depending on a condition, it's easier to stay on top of your security if you place them in separate workflows, rather than in one workflow with conditions placed on each action. This minimizes the number of conditions you have to update if something changes.

Always remember to test your app as different users to verify that conditions are working properly.

[^1]: Dynamic expressions are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^2]: Note that making a button unclickable through styling can be overridden by a highly technical user, and should be considered a UX decision and not a security measure.\
    \
    To stop any workflow on a button from running, you should place a condition on that workflow too. This is the secure way of stopping a user from running a workflow they are not authorized to run.

[^3]: A *workflow* is the combination of an *event* and one or more *actions*.\
    \
    The event triggers the actions to run and together they make up the workflow.

    For example, clicking a button could lead to deleting a database thing. The button click is the event, deleting the thing is the action and together they make up the workflow.\
    \
    Article: [Workflows](/help-guides/logic/workflows)

[^4]: An *action* is a part of a workflow that performs a specific task.

    For example, when a user clicks a button (event) a thing is deleted in the database (action).

    The event and the collection of actions make up a *workflow*.

[^5]: The *Make changes to a thing* action writes changes to a specific record in your database, such as saving a name on a user or an image on a produt.\
    \
    Reference: [Make changes to a thing](https://manual.bubble.io/help-guides/logic/pages/-MTujs88N9W-2FUmQGag#make-changes-to-thing...)

[^6]: The *Create a new thing* action creates a new database record and optionally writes data to its fields.\
    \
    Article: [The database](/help-guides/data/the-database)\
    Reference: [The Create a new thing action](https://manual.bubble.io/help-guides/logic/pages/-MTujs88N9W-2FUmQGag#create-a-new-thing...)

[^7]: *Server-side* describes things that happen on the server, as opposed to on the user's device.\
    \
    In the context of conditions, server-side conditions are those that can be verified on the server, such as checking something in the database.

[^8]: *Client-side* describes anything that happens on the user's device, as opposed to on the server.\
    \
    In the context of conditions, client-side means checking whether something on the page (such as an element being visible) is true.
