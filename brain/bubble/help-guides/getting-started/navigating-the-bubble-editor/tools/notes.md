# Notes
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tools/notes · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to add notes to different parts of your Bubble app to document your work

As you develop your Bubble application you may find the need to document specific parts of it. For example, you may need to write down what a specific workflow is for, or add some notes about where to use a specific style.

<figure><img src="/files/RkG3tBLBDEWDvzshHClR" alt=""><figcaption><p>In this example we have added a comment to the OK button.</p></figcaption></figure>

Bubble has a built-in note system that lets you save text comments for yourself and your collaborators. These notes are only visible in the Bubble editor, and cannot be seen by your app’s users. They are visible to all collaborators, regardless of their access level.

You can add notes in the following places:

* [Data types](#user-content-fn-1)[^1]
  * Data type fields
* [Option sets](#user-content-fn-2)[^2]
  * Option set options
  * Option set attributes
* Elements[^3]
* Events[^4] (workflows)
  * Actions
* [API Connector](#user-content-fn-5)[^5] connections
  * API Connector calls
* [Privacy rules](#user-content-fn-6)[^6]
* Styles[^7]

Notes can be added to each unique instance of the above types, meaning for example that every element and action you add can have its own note.

## Managing notes

### Adding and editing notes

The ability to add comments to something in the Bubble editor is displayed with the note icon:

<figure><img src="/files/1Tg2VPDtYKR1RmDUVEET" alt=""><figcaption></figcaption></figure>

Clicking that icon will open up the *Comments* panel and let you add or edit a comment on the relevant item.

<figure><img src="/files/2hYChZUeOlzqb5xn2FT9" alt=""><figcaption><p>Clicking the <em>Note</em> icon will open up the Notes sidepanel. In this example we're looking at the field of a data type called <em>City</em>.</p></figcaption></figure>

Whenever an item has a note saved on it, the icon gets a fill color:

<figure><img src="/files/FeLlJy9as0FiA2bIP5qI" alt=""><figcaption></figcaption></figure>

### Deleting notes

To delete a note, simply open it up for editing and remove its text content.

## Browsing all notes

To see all the notes in your app in a list, click the *See all* button in the notes sidepanel:

<figure><img src="/files/Y2cDqhY4kPqesQPNH2Hs" alt=""><figcaption></figcaption></figure>

[^1]: The database consists of different *data* *types* that you as the developer plan and set up.

    Data types are like containers that hold specific types of information and each data type is made up of *fields* where that information is stored.\
    \
    Article: [Data types and fields](/help-guides/data/the-database/data-types-and-fields)

[^2]: Option sets let you set up different types of static options in a database-like structure, but without using the database.

    This is useful to store information like days of the week, marital status, colors, states, countries and other data that you want to load quickly and that's rarely updated.\
    \
    Article: Option sets

[^3]: Everything you place on a Bubble page, such as input fields, buttons, images and icons, are known as *elements*.\
    \
    They make up the visual part of how users interact with your app.\
    \
    Article series: [Bubble elements](/help-guides/design/elements)

[^4]: A workflow consists of an *event* which triggers it, and *actions* that run when that triggering happens.\
    \
    This is how user interaction leads to something happening in your app. For example, a button click could be the *event* and *Log the user in* could be the action.\
    \
    Article series: [Workflows](/help-guides/logic/workflows)

[^5]: The *API Connector* is a Bubble-built plugin that lets you set up connections to third-party apps and systems via outbound API requests.\
    \
    Article series: [API](/help-guides/integrations/api)\
    Article: [The API Connector](/help-guides/integrations/api/the-api-connector)

[^6]: Privacy rules are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.

[^7]: Bubble lets you set up overarching Styles for elements within your app to streamline the design process

    By modifying a single style, you can restyle all related elements, making it easy to set up and manage a cohesive look and feel in your app.\
    \
    Article: [Styles](/help-guides/design/variables-and-styles/styles)
