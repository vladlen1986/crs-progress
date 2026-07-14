# Quick start guide (For new users)
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/property-editor-beta/quick-start-guide-for-new-users · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Last Updated: April 2026

### Introduction

#### What is the property editor (PE)?

The property editor is your control center for customizing elements on your page. It's where you adjust how elements look, behave, and respond to user actions. The property editor appears as a pinned panel on the right side of your editor whenever you select an element on the canvas.

<figure><img src="/files/CyZ72nAlQw6Rp2y1GkN5" alt=""><figcaption></figcaption></figure>

***

### Working with the property editor

#### Basic navigation

* Resize the panel by dragging its left edge
* Collapse sections you're not actively using to reduce visual clutter and make frequently-used controls easier to access
* Search within dropdowns (like the color picker) to quickly find variables or options
* Unpin the elements tree when you want more canvas space—press Esc to hide the property editor temporarily
* Access custom states via the button in the top-right of the property editor header

<figure><img src="/files/0UXjGC5Ea0B2mNnNhloi" alt=""><figcaption></figcaption></figure>

***

### Understanding the property editor’s tabs

The property editor is organized into three main tabs: Visual, Interaction, and Conditional. Each tab controls a different aspect of your element's behavior.

![](/files/l5NywHjGFOCzZOB2mKKW)

#### Visual tab

**What it controls:** How your element looks and where it's positioned on the page.

**Key sections:**

* **Content:** Set the text, image, or data source for your element (varies by element type)
* **Size:** Set width and height using Fixed, Fill, or Fit options

<figure><img src="/files/SNt2WtREvjRR6UtjqadE" alt=""><figcaption></figcaption></figure>

* **Layout:** Configure alignment, padding, margins, and spacing.
  * Use the visual nine-grid alignment tool for quick positioning
  * Set gap between child elements in container elements
  * Easily set matching top/bottom or left/right margins and padding in a single input

<figure><img src="/files/CK6iOKpTH4GQDm0rUvvY" alt=""><figcaption></figcaption></figure>

* **Style:** Set colors, fonts, borders, shadows, and other visual properties
  * Properties with a blue background indicate they're overriding your element's Style settings
* **Configure:** Element-specific settings (e.g., for repeating groups, inputs, buttons)

<figure><img src="/files/YWvEoQfUI2cHiJFem8qU" alt=""><figcaption></figcaption></figure>

* **Appearance:** Additional styling options specific to the element type.
* **Background, Shadows, Border**: Add/adjust a background, shadow, or border of the element

{% hint style="info" %}
**Quick tip:** The new nine-grid alignment tool provides a visual way to position elements within their parent container — just click the grid position you want.
{% endhint %}

***

#### Interaction tab

**What it controls:** How users interact with your element and how the element behaves dynamically.

<figure><img src="/files/VyRIUrghM2s1hxgQOHFd" alt=""><figcaption></figcaption></figure>

Key sections:

* **Visibility:** Control when the element appears on the page
* **Workflows:** View and create frontend workflows (events and actions) connected to this element
  * See the count of workflows directly in the Interaction tab header
  * Add additional workflows using the + button when workflows already exist

<figure><img src="/files/0UXirnCBHDAwc9ypmk3z" alt=""><figcaption></figcaption></figure>

* **Options and Transitions:** Configure clickability, hover effects, and other interactive properties.

***

#### Conditional tab

**What it controls:** When elements appear or change based on criteria you define.

<figure><img src="/files/QClZ3FTXhafMt1bED2rT" alt=""><figcaption></figcaption></figure>

**Key features:**

* **Name your conditionals** for easy identification (instead of showing the full expression)
* **Drag and drop** to reorder conditions
* **Collapse/expand** individual conditionals to manage multiple conditions cleanly
* **Duplicate conditionals** to quickly create similar rules without starting from scratch
* **See inherited style conditionals** alongside element-specific conditionals for full visibility into what's affecting your element
* **Auto-scroll to new conditionals** newly created conditionals automatically scroll into view
* *Conditions are evaluated top-down, with later conditions overriding earlier ones when properties overlap*

***

### Examples: Bringing it all together

The best way to learn the property editor is to see it in action. Here are three practical examples which demonstrate how to use the property editor’s key features:

#### Example 1: Styling a button

1. Select your button element on the canvas
2. Go to the **Visual** tab in the property editor
3. In the **Style** section: Choose your button color using the color picker
4. In the **Layout** section: Set padding for a comfortable click area
5. Use the **nine-grid alignment tool** to position the button where you want it within its parent

<figure><img src="/files/vQbGdZ6DYbtcm1lbZ0zX" alt=""><figcaption></figcaption></figure>

***

#### Example 2: Making an element conditional

1. Select the element you want to make conditional
2. Go to the Conditional tab
3. Click + New to create a new conditional
4. Name it something clear (e.g., Show when user is logged in)
5. Define your condition (e.g., Current User is logged in)
6. Set which properties change when the condition is true (e.g., set This element is visible to yes)

<figure><img src="/files/dvc0yeqDYy5rtgyoQNqE" alt=""><figcaption></figcaption></figure>

***

#### Example 3: Adding workflows

With the **Interaction** tab, you can add element-level workflows directly without leaving the Design tab.

1. Select your element
2. Go to the Interaction tab
3. Open the Workflows section
4. Click the + button to add a new event. You'll see two common triggers:
5. An element is clicked (most common)
6. An element has an error running a workflow (enables you to customize what happens if the workflow results in an error — e.g. displaying a helpful error message)
7. After adding the event, you can edit the full workflow in the Workflow tab
8. Return to the Interaction tab in the property editor to view and modify actions in context

<figure><img src="/files/pRpibLVw1zmLC9fIwzbw" alt=""><figcaption></figcaption></figure>

***

#### Custom states

Custom states live in a dedicated Custom States panel accessible from the property editor header.

<figure><img src="/files/eiMoNFPnaqUidYkASRKI" alt=""><figcaption></figcaption></figure>

**What are custom states?**\
Custom states are temporary, element-specific data storage that help you track information and pass it between workflows without using the database. They're useful for managing UI state, form data, and dynamic interactions.

***

#### Keyboard Shortcuts to Know

| Shortcut                  | Action                                            |
| ------------------------- | ------------------------------------------------- |
| Esc                       | Close the property editor                         |
| Ctrl + D (Cmd + D on Mac) | Duplicate the selected element                    |
| Ctrl + C                  | Copy element                                      |
| Ctrl + V                  | Paste element                                     |
| Ctrl + G                  | Group selected elements                           |
| Cmd + Click               | Select the element underneath the current element |
| Cmd + /                   | Insert dynamic data into an expression            |

<br>

***

### Tips for success

* Sections are organized by frequency of use—the most common settings appear at the top, so you spend less time scrolling
* Collapse sections you rarely use to keep your workspace clean and focused
* Use drag-and-drop to quickly reorder conditionals, constraints, workflow fields, custom states, and other properties
* Changes preview immediately on the canvas, so you can see results as you build
* Use collapsible conditionals to manage complex logic without losing track of what each rule does
* Name your conditionals clearly to make them easier to identify and maintain over time
* Check the Interaction or Conditionals tab headers for a quick count of how many workflows or conditionals (respectively) are attached to an element
