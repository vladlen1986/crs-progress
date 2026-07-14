# States
> Source: https://manual.bubble.io/core-resources/elements/states · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (14)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**The design tab**\
In this article we cover the different tools available in the design tab.

* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)
* Article: [The element inspector](/help-guides/getting-started/navigating-the-bubble-editor/tools#key-features)

  The tool you use to edit element properties.
* Article: [Conditional expressions](/help-guides/logic/conditions)

  How you recognize an element's different states.

***

**Elements**\
In this article series, we cover how to work with different element types:

* Article series:[ Elements](/help-guides/design/elements)
  * Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)
  * Article: [The page](/help-guides/design/elements/web-app/the-page)
  * Article series: [Container elements](/help-guides/design/elements/web-app/containers) (elements that contain other elements)
  * Article: [Visual elements](/help-guides/design/elements/web-app/visual-elements) (elements like text, buttons, icons and images)
  * Article series: [Input forms](/help-guides/design/elements/web-app/input-forms) (elements that accept input, such as text and file uploads)
* Article: [Conditional expressions](/help-guides/logic/conditions) (making your elements change appearance in response to varying conditions)

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
{% endtab %}

{% tab title="Videos (1 playlist)" %}
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)
{% endtab %}
{% endtabs %}

States of an element are situations the element can find itself in, such as being hovered or visible.

## Built-in states

### ...'s width

This state returns the width of the element in pixels.

### ...'s height

This state returns the height of the element in pixels.

### **... is hovered**

This is the state when the user directly hovers over the element with the mouse.

### **... isn't hovered**

This is the state when the user doesn't hover over the element with the mouse.

### **... is pressed**

This is the state when the user clicks the element with the mouse or touches it on a touch device.

### **... isn't pressed**

This is the state when the user doesn't click the element with the mouse or doesn't touch it on a touch device.

### **... is focused**

This is the state when the input element is focused, and the user can type in it.

### **... isn't focused**

This is the state when the input element isn't focused, and the user cannot type in it.

### **... is visible**

This is the state when the element is visible.

### **... isn't visible**

This is the state when the element is invisible, either directly hidden or contained in a hidden container.

### **... is valid**

This is the state when an input has valid content, and therefore whose content can be used in workflows in run mode. You will usually use the following property 'isn't valid' for styling purposes.

### **... isn't valid**

This is the state when an input has invalid content. This can happen when:\
– The input is empty, and 'This input shouldn't be empty' is selected in the Property Editor.\
– The input isn't empty, but the data entered doesn't fit the type of content. For example, the email address isn't a valid email, the address isn't recognized by Google, or the password doesn't follow the password policy.\
\
In this case, affected workflows will not run until the input is valid.

### **... isn't clickable**

This is the state when a button cannot be clicked. This can happen when:\
– The button is manually set to non-clickable in the Property Editor.\
– The button to trigger a workflow relies on invalid input.\
\
In this case, not only will the conditional formatting not apply, but affected workflows will not run until the button is clickable.

### **...'s value (input)**

{% embed url="<https://youtu.be/e7gHkc7MRjk>" %}
Our Academy quick tip on how to use the value operator
{% endembed %}

This is the content of the input. Normally this is simple type, like a text or number, but it can be more complex if using a dropdown or address.

### **... is / isn't checked (checkbox)**

This state is true when the checkbox is / isn't checked.

### **...'s password strength**

This returns a value from 0 to 100 representing the strength of the typed password. 100 is the strongest. This option is only available when the input's type of content is 'password'.

### **...'s typed text (search box input)**

This returns what the user typed in the search box, if it doesn't match any entry in the dynamic list. The type is text.

### ...'s place name (search box input)

This returns the place name of the selected address in the search box as a text string. This operator is only available when the the choices style is set to geographic places.

### **...'s content (container)**

This state returns the content of a container. The type of this state is the type of content of the container. Control the value of this state through the data source property of the element or workflow actions.

### **...'s list (repeating group)**

This state returns the content of a repeating group. The type of this state is a list of the type of content of the repeating group. Control the value of this state through the data source property of the element or the workflow action 'Display list in a repeating group.'

### **is loading (repeating group, picture uploader)**

This state is true when the repeating group is loading a new list. It allows you to style other elements if you want to adjust how the page looks when loading the list. Use this to know when a file or picture uploader is in the process of uploading a file.

### **...'s page number (repeating group)**

This state gives the current page number of a repeating group displaying a fixed number of cells.

### **is first page (repeating group)**

This state is true when a fixed number of cells repeating group is on the first page.

### **is last page (repeating group)**

This state is true when a fixed number of cells repeating group is on the last page.

### **...'s file size (file and image uploader)**

This state returns the size of the file that is being uploaded.

### **...'s upload percentage (file uploader)**

This state returns the percentage (from 0 to 100) of the file uploaded so far.

### **...'s current marker (map)**

This state returns the value of the marker the user clicked in a map. The type of this state is the type of content of map.

### **...'s center address (map)**

This state returns the address of the center of the map. It updates as soon as the user finishes dragging the map.

### ...'s zoom level (map)

This state returns the degree to which you are currently zoomed in as a number.

### **...'s current event (calendar)**

This state returns the value of the event the user clicked in a calendar. The type of this state is the type of content of calendar.

### **...'s current day's events (calendar)**

This state returns the list of events of the day the user clicked in a calendar. The type of this state is a list of the type of content of calendar.

### **...'s current day (calendar)**

This state returns the date of the day the user clicked. The type is date.

### **...'s current date range (calendar)**

This state returns the range of the current calendar view (the start and end date of the view). The type is date range.

### **...'s current slide (slideshow, tinder)**

This state returns the current image shown by these two elements.

### **...'s current option (slidable menu)**

This state returns the option the user just clicked in the menu. The type is text.

### **... is dragged**

This state is true when a drag/drop group is being dragged.

### **... is dragged over**

This state is true when a drop area is being hovered by a dragged group.

## **Custom states**

Define custom states for an element, similar to the built-in states hovered, pressed, or focused. These states can then be used in the Conditional section in the Property Editor to change how an element displays or behaves when this state has a particular value. Modifying a state is done through the Workflow action 'Set state.' Custom states are useful when you'd like to save information at an element level instead of in the database.\
\
A typical use case is to create a tab system in a group. Define a state 'current tab' for the container, and then change the value of 'current tab' when the user clicks on the different tab buttons. Using Conditional formatting, show or hide elements based on the value of the group's current tab.

{% hint style="warning" %}
**Note:** When a state is set to the value of a search in a workflow, the state's value will actually be the query, not the query response value. Use the ':make static' operator on the search dynamic expression to save the result of the query instead of the search itself.
{% endhint %}

## Other ways to learn

<details>

<summary>User manual articles</summary>

* [Custom states](/help-guides/data/temporary-data/custom-states)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
