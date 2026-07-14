# Frontend events
> Source: https://manual.bubble.io/help-guides/logic/workflows/events/frontend-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The section covers frontend events, which are the events that are triggered on a page.

Frontend events are the triggers that happen on a **page.** It's often – but not always – initiated by a user. Frontend events will only trigger as long as the page is open.

Frontend events can still lead to actions happening on the server – but the *event* (or trigger) happens on the page.

## Element events

One of the first and most basic types of triggers are the result of actions taken by the users of your app directly by interacting with an element. For example, a user could click the *Submit* or *Save* button in order to start a sequence of actions that saves the values the user has provided in the database.

Element events include:

* Button/icon/other element clicked
* [Input form](#user-content-fn-1)[^1] values being updated
* An element [hits an error](#user-content-fn-2)[^2]

Adding more elements (and elements from plugins) can add to the list of possible element events.

### Example: Button click

Let's first have a look at one of the most fundamental events an app can have: responding to the click of a button.

1. First, we'll add an element of the type *Button* to the page. In the example below, we have labelled it *Sign up*.
2. Then, right-click the button to see the contextual menu, and select *Start/edit workflow*.

<figure><img src="/files/E01OK7iSue6Y1PgzMWgj" alt=""><figcaption></figcaption></figure>

You will be taken to the workflow canvas and the newly created workflow, and can start adding actions to it by clicking the *+* icon.

<figure><img src="/files/ekyGmikyHHCRLdsnVJwT" alt=""><figcaption></figcaption></figure>

### Example: Input value changed

In the next example, we'll look at how you can set up a workflow to run whenever the user changes the value provided in an input form. Changes are registered in two different ways:

* **Text-based elements:** Whenever the element loses focus
* **Click-based elements (such as dropdowns and calendars):** Whenever the user confirms their choice with a click

1. We'll start again with adding an element. Pick one of the elements in the *Input form* category; we're going with a regular text input element.
2. Again, we can right-click the element to automatically create a workflow. Bubble will recognize the element type and automatically set the event to respond to the element's value being updated

<figure><img src="/files/pXESb1t4hIxT2RGzdhgW" alt=""><figcaption></figcaption></figure>

Again you will be taken to the workflow canvas and there will be a new workflow automatically labelled by the event:

<figure><img src="/files/bDP27Hbn1vL1KaRHz2JI" alt=""><figcaption></figcaption></figure>

You can then proceed to add the needed actions in response the input's value being changed.

{% hint style="info" %}
To automatically save changes to the database when an input form's value is changed, you can also use auto-binding. This will save the value without the need to set up a workflow.

Article section: [Auto-binding](/help-guides/data/the-database/creating-saving-and-deleting-data#auto-binding)
{% endhint %}

### Example: catching errors

Sometimes, trying to run a workflow in Bubble will result in an error. For example, a user might be trying to log in, but provide the wrong credentials. In this case, Bubble will by default alert the user in a browser-standard message:

<figure><img src="/files/i94bxK96Ia62AKPR9xUO" alt=""><figcaption><p>System errors will result in a standard error message like this in Chrome, but you can override that message by setting up an event to catch it. Click the image to enlarge.</p></figcaption></figure>

The An element hits an error event is connected to the workflow that triggered the event. In other words, if the user entered the wrong password, the *Log in* button is the trigger – not the input field, since the button is the one that triggers the workflow where the error happened.

We want to show an alert that we are free to style as we want, so let's first add an *Alert* element to the page and set it to appear at the top of the page:

<figure><img src="/files/FxXxu2OH1vIBauXtPGHc" alt=""><figcaption><p>Checking the <em>Position the alert at the top</em> box lets us stick the alert to the top of the screen regardless of scrolling position.</p></figcaption></figure>

Then, we'll create the event/workflow. This time we'll need to create it in the workflow canvas:

<figure><img src="/files/qdktKdRePppzMtRqAASQ" alt=""><figcaption></figcaption></figure>

1. Click the plus symbol in the *Uncategorized* folder (or any folder where you would like to add the workflow). The new event menu will automatically be displayed.
2. Then, add the *An element has an error running a workflow* action and pick the *Log in* button

Now we have the event set up to trigger every time a workflow initiated by the *Log in* button leads to an error. Let's set it up to show the alert and use Bubble's original error message:

<figure><img src="/files/MVMcfNdChk0OJwnGABIt" alt=""><figcaption></figcaption></figure>

<details>

<summary>Identifying and changing error messages</summary>

In the example above, we are using the system generated error message found in the *Current workflow error* data source.

The *message* operator will show the message that Bubble would otherwise have displayed in a standard error message. The *code* is used to identify the error. If you want a particular action to run on a certain error for example, you can use the *only when* field to set up a constraint that checks the error code.

#### Identifying codes and changing messages

All of Bubble's built-in messages are stored in [*application texts*](#user-content-fn-3)[^3] that you will find by navigating to *Settings - Language.*

The code of the error message is visible as grey, all-caps text under each text descriptor. On the right side you can edit the error message that will be displayed. This will replace the message regardless of whether you are showing it with a workflow or the default browser error message.

</details>

## General events

General events are events that are triggered by something happening on the page that is not directly related to an element. It's not necessarily (but can be) the result of a user action:

#### When the page is loaded or URL refreshed

Whenever the page is loaded or the URL refreshed (such as adding URL parameters) with the [*Go to page*](#user-content-fn-4)[^4] action, this event will trigger. This is useful for things that need to happen immediately whenever a user loads the page.

Keep in mind that as the *Go to page* action will trigger this even if the page is not technically reloaded, you may end up triggering it more times than you intended. Use a condition to avoid this.

#### The user is logged in or out

This event will trigger whenever the user's login status changes and is useful for redirecting users that are logged out for example. It will also trigger on page load according to the login status you provide, meaning that if you instruct Bubble to go to another page if the user is logged out, that event will immediately trigger when the user tries to load the page.

Note that the *Log out user's other sessions* launched from another device may not trigger the event immediately, but will trigger it once the user takes some further action on the page.

#### An unhandled error occurs

This event in principle does the same as the above-mentioned *An element hits an error,* but applies more broadly: *any* error, regardless of the element (if any) that caused it, will trigger it and allow you to run some actions in response. This is useful if the response you want is an error message for example; by not binding it to a specific element, you can catch all errors in one event.

#### When a condition is true

Triggering an event when a condition is true uses conditional expressions to check whether something is true or false in real-time. This is a powerful feature that lets you set up logical rules that trigger a workflow instantly whenever the expression returns a *yes*.

### Example: Conditional expression

Let's use the *When a condition is true* event combined with a conditional expression to make something happen. This time, instead of logging in, we'll change it to signing up: when the user has provided both an email and a password, we'll animate the *Sign up* button to encourage the user to click it.

Add two input fields (for email and password) and a button for signing up. Make sure you set the *Content format* on each of the fields to Email and Password respectively. Then, we'll set up the event to catch it. We don't only want the input fields to not be empty; we want them to be *valid*.

First, add the workflow, and Bubble will ask for an event. You'll find this under *General*:

Then, we'll set up the expression that checks the input fields:

<figure><img src="/files/Ex2ohcAWm4LZAuWrRU7H" alt=""><figcaption></figcaption></figure>

1. We're fine with the animation appearing just once, so we'll leave the *Run this* dropdown set at *Just once*.
2. In the expression we are checking both inputs, and using an *and* operator to make sure that *both* inputs need to be valid, as opposed to just one (in which case we would have used the *or* operator).\
   \
   We need to check four things in this expression to make it work the way we want:<br>
   1. Input Email's value must not be empty (meaning it must contain text)
   2. Input Email must be valid (meaning it must be a valid email)
   3. Input Password's value must not be empty
   4. Input Password must be valid (technically, all passwords are valid, but you can choose to set a required password strength for example)<br>
3. We then use the *Animate an element* to animate the button. We chose the subtle *Callout pulse* animation for this

<figure><img src="/files/2wvKyDETxlpzm3Nge1pg" alt=""><figcaption></figcaption></figure>

[^1]: *Input forms* are elements that accept some sort of information provided by the user, such as a text field, a checkbox, a datepicker/calendar or dropdown.\
    \
    Article: [Input forms](/help-guides/design/elements/web-app/input-forms)\
    Reference: [Input forms](/core-resources/elements/input-forms)

[^2]: If an error occurs during a workflow, that error is connected to the element that triggered the event. For example, a user could provide the wrong password while trying to log in.

    You can "catch" this error and respond to it (by showing a message for example) by using the *An element has an error running a workflow* event.\
    \
    Reference: [An element has an error running a workflow](/core-resources/events/element-events#an-element-has-an-error-running-a-workflow)\
    Video: [How to use An element has an error running a workflow](https://www.youtube.com/watch?v=_HNvvPxcWAU)

[^3]: App texts, short for *Application texts and messages* is a sort of database for text strings that you can use around your app.

    It includes Bubble's built-in system messages and can be translated into different languages.

    \
    Article: [App texts (translations)](/help-guides/data/static-data/app-texts-translations)

[^4]: The *Go to page* action is used to send the user to a page in your app. It's also used to change the *Page thing* or update URL parameters.\
    \
    Reference: [To to page](https://manual.bubble.io/help-guides/logic/workflows/events/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)
