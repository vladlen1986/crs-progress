# The Component Library
> Source: https://manual.bubble.io/help-guides/design/the-component-library · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Component Library is a collection of pre-built User Interface (UI) components that can be dragged and dropped onto your page to help you build beautiful interfaces faster. These UI components are fully responsive and are made up of containers[^1], [visual elements](#user-content-fn-2)[^2], and [form inputs](#user-content-fn-3)[^3] that can be individually customized once added to your page. Each component is a fully independent unit, but can be connected to each other or other parts of your app by adding workflows[^4] and data.

This guide will show you how to use these components to build a beautiful landing page in seconds and how to wire up the Signup and Login forms for full user authentication.

### Build with components

The UI components in the Component Library allow you to build a fully responsive[^5] and customizable app in seconds.

First, change your page layout to a Column container layout type in the page's [property editor](#user-content-fn-6)[^6]. This will allow your components to stack vertically when added to your page and the content to resize appropriately as the screen width changes.

<figure><img src="/files/AxkpRS4zdLhaOJoa6gjs" alt=""><figcaption></figcaption></figure>

Next, drag any number of components onto your page, one below the other. When dropping your component onto your page, the blue indicator on the editor canvas will tell you where it will land.

{% hint style="info" %}
Components can be added within other groups, so make sure the blue indicator is at the very bottom of the last container.
{% endhint %}

<figure><img src="/files/4p8NawzEBdoAJ2yqxgLs" alt=""><figcaption></figcaption></figure>

Once you are done adding components, you will have a fully responsive landing page that can be customized to your liking.

### Customize your components

Now that the skeleton of your landing page has been built, each element can be customized to your liking. For example, you can change the text in any of the text boxes or buttons by selecting the element and updating its Appearance or replace any of the placeholder images by selecting the image and uploading a new one.

As you add additional pages to your application, you can update the placeholder links on your page to navigate to those pages by adding a `Go to page` workflow action when the link is clicked.

<figure><img src="/files/TQpmyBclg7Gg2sauFTDB" alt=""><figcaption></figcaption></figure>

To change the overall look and feel of your landing page, you can customize the font and color variables in the Style Variables subtab in the Styles tab. Since the font and colors used in each element is connected to a Variable, any changes made on the Style Variable level will cascade through your app automatically. Adjust the Style Variables so that your landing page matches your brand.

<figure><img src="/files/EMWRPUl6ieFruHYcd92e" alt=""><figcaption></figcaption></figure>

### Adding workflows for user authentication

User authentication is the foundation for almost every web application. By using the Header and Signup/Login components, you can set up a fully functionally signup and login flow in a handful of clicks.

Once you've added the Header and Signup/Login components onto your page, you'll need to connect the Signup and Login buttons in the Header to show the Signup/Login popup or the Signup/Login page, depending on the component you selected. Most of the workflows have already added to help you get started.

Open the *Workflow* tab of the page that contains the Signup/Login component, and you'll see two workflows titled *When an element is clicked*. The first workflow will control the Signup form and the second workflow will control the Login form.

Select the first workflow event and change the element to "Button signup (Header)." This connects the Signup button to the workflow that opens the Signup Form. Similarly, in the second workflow event, change the element to "Button login (Header)" to connect the Login button to the workflow that opens the Login Form.

<div><figure><img src="/files/HQyTkIDXBJfi0ZCiyL7R" alt=""><figcaption></figcaption></figure> <figure><img src="/files/DYzHRsQP1mTYcVdB8cOn" alt=""><figcaption></figcaption></figure></div>

To sign the user up, start a workflow from the Signup button in the Signup form and add the "Sign the user up" workflow action. Here, you'll map the email input's value and password input's value to the workflow parameters so that the workflow action can register those two fields.

<figure><img src="/files/GrkDPvDzgIT4RuYazvrp" alt=""><figcaption></figcaption></figure>

Next, we need to add a new field to the User data type so we can capture the name of the user on signup. On the data tab, select the User data type and add a new Field of type text called "Name". Going back to the signup workflow, add a new action after "Sign the user up" called "Make changes to Current User". Here, you'll map the Name parameter to the Input Name's value to update the user you just signed up with the name they entered.

<figure><img src="/files/fAXUMIryzhZNGMbjmZd0" alt=""><figcaption></figcaption></figure>

As you continue building your app, you can add additional workflows here to navigate the user to the proper page after they sign up, or any other logic that your application needs.

To connect the Login button, start a workflow from the Login button and add the "Log the user in" workflow action. Just like with Signup, you'll map the email and password input's value from the Login form to the Email and Password parameters.

As you continue building your app, you can add additional logic here depending on what you want to happen after a user logs into your app.

<figure><img src="/files/sIyHpTbq1x1FfNBiK7PK" alt=""><figcaption></figcaption></figure>

There you have it, your landing page is now connected to a full user authentication workflow!

[^1]: *Containers* are used to contain elements and control how they behave on the page. Bubble has six container types that behave in different ways.\ <br>

    Article series: [Containers](/help-guides/design/elements/web-app/containers)

[^2]: *Visual elements* are the elements you can place on that page that cannot contain other elements (groups) and cannot accept input (input elements), such as text, images and icons.

    Article: [Visual elements](/help-guides/design/elements/web-app/visual-elements)

[^3]: Input forms are the elements that you use to collect information from your users, such as text input, date pickers and file uploaders. They can be used for a simple checkbox or combined into complex forms.

    Article series: [Input forms](/help-guides/design/elements/web-app/input-forms)

[^4]: *Workflows* are the engine of your application – they are how you instruct Bubble to respond to what the user does, such as clicking a button, with a set of actions that can do anything from hiding/showing or animating things on the page to making changes in the database and make external API calls.

    A *workflow* is the combination of an *event* that triggers one or more *actions*.

    Article series: [Workflows](/help-guides/logic/workflows)

[^5]: *Responsive design* is a method that gives your users a great experience no matter what kind of device they are using to access your app.\ <br>

    The goal of responsive design is to create a single page that automatically adjusts its layout and content to fit the screen size and resolution of the device being used to access it.

    Article series: [Responsive design](/help-guides/design/responsive-design)

[^6]: The property editor is the main tool for configuring the elements on your page.

    When you double-click an element on the page or single-click it in the left-hand element tree, this draggable popup appears, displaying various fields for customization.

    Article: [The property editor](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-property-editor)
