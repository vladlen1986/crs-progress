# Navigating the Redesigned Property Editor
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/property-editor-beta/property-editor-migration-guide-for-existing-users · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Last updated: July 2026

The property editor has undergone a major redesign. This guide will help you understand what’s changed, why we made these updates, and how to get up to speed quickly.

### What changed

* **Reorganized for clarity:** Properties are grouped into logical tabs (Visual, Interaction, Conditional) with collapsible sections. You can drag-and-drop to reorder conditionals, constraints, workflow fields, custom states, and more. And you can now see the count of workflows, conditionals, and custom states on each element, so there's less scrolling, less tab-switching, and more visibility into how your elements are set up.
* **New tools shaped by community feedback:** Global expressions, workflow editing, agent entry points, searchable color picker, expandable dynamic expressions, and more.
* **Built on a modern foundation:** We've migrated to SolidJS and a new design system, which means faster bug fixes, quicker feature releases, and the groundwork for efficient AI capabilities in the editor.

### Recent updates we’re excited about

*Only available in the new property editor.*

#### Dark mode editor

* A long-requested update. Toggle it on from the moon icon at the bottom left of your editor sidebar.

<figure><img src="/files/CwI5NyWjAWuxCXa7rMcc" alt=""><figcaption></figcaption></figure>

#### Global saved expressions

* Another highly requested update that lets you define an expression once and reuse it across your app.

<figure><img src="/files/4fkAIoTyqCMYLVNSc2uA" alt=""><figcaption></figcaption></figure>

#### Add and edit workflow events and actions

* Reorder and edit workflow actions inline without switching tabs.[\[Screenshot\]](https://drive.google.com/file/d/1wzuOSnVQgA4-zlsR7PZT76aZAN0nLERr/view?usp=sharing)

<figure><img src="/files/cfIG43mTmnNoS8w1wRHZ" alt=""><figcaption></figcaption></figure>

#### Use the Agent to build dynamic expressions

* Use the Agent to build dynamic expressions with natural language

<figure><img src="/files/rMRON260O85uMWuAwZJz" alt=""><figcaption></figcaption></figure>

### What’s changed

#### Light mode / Pinned PE

<img src="/files/jtBK0z7hL4sm2I0hI0N2" alt="" height="352" width="624">

| Before                                      | After                                            |
| ------------------------------------------- | ------------------------------------------------ |
| Displayed in dark mode only                 | Updated UI for dark mode or light mode           |
| Positioned as a floating interface element  | Integrated as a pinned element within the layout |
| Visually separated from the primary layout  | More clearly anchored within the page structure  |
| Less predictable placement during scrolling | Provides a consistent and predictable location   |
| Difficult for our engineers to improve      | Creates room for future updates to the canvas    |

#### Same tabs, new names

<img src="/files/63BGK5Zcy0mXE3Zzj69o" alt="" height="352" width="624">

| Before                                | After                                |
| ------------------------------------- | ------------------------------------ |
| Appearance, Layout, and Conditional   | Visual, Interaction, and Conditional |
| Emphasized styling and page structure | Emphasizes user intent and behavior  |

#### Reorganized and collapsible sections

<img src="/files/ITojkyEz8btcxlK0RRxD" alt="" height="352" width="624">

| Before                                             | After                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| Properties were presented in long, static lists    | Properties are grouped by purpose                                        |
| Related settings were spread across multiple areas | Logical sectioning reflects how builders use each element                |
| Sections could not be collapsed                    | Sections can be collapsed to reduce visual noise                         |
| Visual scanning required frequent scrolling        | Frequently edited settings are surfaced earlier with new intuitive icons |

#### More control of your editor

Resize as you need it

<img src="/files/Br2T0qPuiU018qGaRqxM" alt="" height="352" width="624">

Show/hide your editor as you build

<img src="/files/kPmdUZQSnhsn9B4ehuF7" alt="" height="352" width="624">

Unpin your elements tree when you want

<img src="/files/Y0guFmgvaMFOJWhb5Ih5" alt="" height="352" width="624">

**Size and layout properties have a new home**

<img src="/files/smoNMNApG6atkpueicS1" alt="" height="352" width="624">

\ <br>

| Before                                                     | After                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| Sizing and layout settings were fragmented                 | All size and layout attributes are consolidated into one tab |
| Width and height controls lived alongside unrelated fields | Layout controls live together in one section                 |
| Responsive configuration required context-switching        | Responsive behaviors can be adjusted in one pass             |

<br>

**Responsive building made easier**

<img src="/files/vqDzxrxnptMpLg1hX3Ls" alt="" height="352" width="624">

&#x20;

<img src="/files/tuv3O1vYumtSvgnnuf1M" alt="" height="352" width="624">

&#x20;

<img src="/files/q9IU3aiPRYSZRS4KFsiL" alt="" height="352" width="624">

<br>

| Responsive behavior had to be configured manually | <p>Padding and margin behavior is standardized</p><p><br></p> |
| ------------------------------------------------- | ------------------------------------------------------------- |
| Layout tuning required additional setup           | Fixed, fill, and fit dropdown replaces legacy checkboxes      |
| Standard properties for configuring alignment     | Modern, visual nine-grid view of element’s alignment          |
| Manually add in spacing for all sides             | Easily add or edit spacing options for vertical or horizontal |

#### Drag-and-drop conditionals, custom states, constraints, and workflow fields

<img src="/files/ZDL2VlC64wSlveWlT7Xq" alt="" height="352" width="624">

| Most properties were visible at once with little organizational structure            | Expand or collapse conditionals to get more space or more cards in view             |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Reordering required multiple clicks                                                  | Drag and drop re-ordering is properly supported                                     |
| Conditional properties can get lengthy and take up space                             | Conditionals can be collapsed by clicking in the header row for more breathing room |
| Creating a new conditional adds it to the bottom of the tab, potentially out of view | Conditionals scroll into view upon creation                                         |

#### Conditional names

<img src="/files/J4Ay6d7kQuXhZ64MXsvj" alt="" height="352" width="624">

| Before                                                  | After                                               |
| ------------------------------------------------------- | --------------------------------------------------- |
| Conditionals displayed the full expression as the label | Conditional names are customizable                  |
| Identifying logic required reading the entire rule      | Logic can be understood without expanding each rule |

#### Add/edit workflows from the new property editor

<img src="/files/cwM3jiHoZPMbCzgsiMtb" alt="" height="352" width="624">

| Before                                                                              | After                                                                                    |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Adding workflows to elements while designing required switching to a new editor tab | Frontend workflows are visible in-context                                                |
| No ability to see workflows from the Property Editor                                | New ability to create and view multiple workflows from the property editor at once.      |
| No ability to edit workflow actions from the Property Editor                        | New ability to reorder, add, and edit workflow actions directly from the Property Editor |

**Edit fields and operators in expressions without deleting them**

<img src="/files/y3qnSw0452OcDAzyN8Cg" alt="" height="352" width="624">

| Before                                                                                                                                           | After                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editing fields or operators meant deleting the entire constraint and rebuilding it from scratch which was slow, disruptive, and easy to mess up. | Edit fields and operators directly in place. No more deleting and rebuilding constraints. Make quick tweaks without breaking your flow, so iterating on logic is faster and less error-prone. |

#### New custom states panel

<img src="/files/1jmxe6OMoPtnAvyop4Ze" alt="" height="352" width="624">

&#x20;

<img src="/files/DXnFUkiE9XezouohFYFz" alt="" height="352" width="624">

| Before                                                                         | After                                                         |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Custom states were hidden behind an info icon                                  | Custom states have a dedicated panel                          |
| Discoverability depended on prior knowledge                                    | Access requires no navigation                                 |
| Required to click into action in order to see if custom states have been added | See if there are custom states added on an element right away |

#### New color picker

<img src="/files/NU1LciWp8pNnjs1cttIf" alt="" height="352" width="624">

| Before                                                    | After                                   |
| --------------------------------------------------------- | --------------------------------------- |
| Colors were entered manually or selected from small lists | Full variable list appears in one view  |
| Variable discovery was limited                            | Searchable variable lookup              |
| Searching required manually scrolling through             | Live previews update immediately        |
| Navigating to the styles tab to edit a color variable     | Directly edit while you’re mid-building |

#### Complete list of property/label updates<br>

Simplified properties

| Element(s) or Section                                                                                                                                                            | Old name                                                                                | New name                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Background Section > Video Picker                                                                                                                                                | <p>Play video silent</p><p><br></p>                                                     | <p>Play with sound</p><p><br></p>                               |
| AppBarButton, Button, FloatingGroup, Group, HorizontalListItem, Icon,Image,SelectableList, SelectableListItem,Shape, Sheet, ShortList, ShortListItem, TableCrossAxis, Text, Link | This element isn't clickable                                                            | <p>Make clickable/interactive</p><p><br></p>                    |
| Input, SearchBox                                                                                                                                                                 | Prevent "enter" key from submitting                                                     | <p>Submit on 'Enter'</p><p><br></p>                             |
| Popup                                                                                                                                                                            | This popup can't be closed by pressing 'Esc'                                            | <p>Close by pressing 'Esc'</p><p><br></p>                       |
| Text                                                                                                                                                                             | Do not apply bb-code                                                                    | BBCode applies                                                  |
| WebView                                                                                                                                                                          | Disable Zooming                                                                         | Enable zooming                                                  |
| Text > Options                                                                                                                                                                   | Do not apply bb-code                                                                    | BBCode applies                                                  |
| Page                                                                                                                                                                             | Apply gap spacing between elements                                                      | Row gap or Column Gap                                           |
| Input                                                                                                                                                                            | Limit the number of characters                                                          | Max number                                                      |
| <p>Mobile > App Bar</p><p>Containers</p>                                                                                                                                         | <p>Override back button label</p><p>Allow vertical scrolling when content overflows</p> | <p>Override back…</p><p>Allow vertical scrolling</p><p><br></p> |

Label changes<br>

| Element(s) or Section          | Old label                                    | New label                                       |
| ------------------------------ | -------------------------------------------- | ----------------------------------------------- |
| All elements > Visibility      | This element is visible on page load         | <p>Visible on page load (toggle)</p><p><br></p> |
| Icon> Options                  | <p>Make the icon spin</p><p><br></p>         | <p>Make icon rotate continuously</p><p><br></p> |
| Alert > Configure              | Position the alert at the top                | Position at top of page                         |
| Video >Options                 | Play the video automatically on page load    | <p>Autoplay on load</p><p><br></p>              |
| Video > Options                | Replay video when over                       | Loop on repeat                                  |
| Map                            | Auto-close when another is clicked on        | Auto-close when another is clicked              |
| HTML                           | Wait to render this element until is visible | Wait to render until visible                    |
| HTML                           | Display as an iframe                         | Display as iframe                               |
| Repeating Group                | Show partial list on last page if needed     | Show partial list on last page                  |
| Input                          | Max number                                   | Max characters                                  |
| Form elements                  | The input should not be empty                | Make required                                   |
| Form elements                  | This input is disabled                       | Make disabled                                   |
| Picture uploader               | Make this file private                       | Make private                                    |
| Picture uploader               | Limit image size before upload               | Resize images over 800px x 600px                |
| Mobile sheet                   | Drag handle                                  | Include drag handle                             |
| Form elements                  | Enable auto-binding                          | Auto-binding                                    |
| Elements                       | Make this element fixed-width                | Dropdown with Fixed, Fill, and Fit options      |
| Make this element fixed-height | <p><br></p>                                  | <p><br></p>                                     |
| Fit width to content           | <p><br></p>                                  | <p><br></p>                                     |
| Fit height to content          | <p><br></p>                                  | <p><br></p>                                     |
| Make First / Make Last         | Text labels on selected elements             | Arrows instead of text                          |
| Previous / Next                | Text labels on selected elements             | Left/up right/down arrows                       |

#### Keyboard shortcuts

| Shortcut          | Action                                                      |
| ----------------- | ----------------------------------------------------------- |
| Ctrl + P          | Preview your app. Same as clicking **PREVIEW**.             |
| Ctrl + T          | Switch between **Design**, **Workflow**, and **Data** tabs. |
| Cmd + Click       | Select the element under the current element.               |
| Cmd + Drag        | Resize the current element symmetrically.                   |
| Shift + Drag      | Resize and keep proportions constant.                       |
| Ctrl + C          | Copy the current element, action, or event.                 |
| Ctrl + V          | Paste the current element, action, or event.                |
| Ctrl + X          | Cut the current element, action, or event.                  |
| Ctrl + Shift + C  | Copy the current element’s formatting.                      |
| Ctrl + Shift + V  | Paste formatting to the current element.                    |
| Ctrl + D          | Duplicate the current element.                              |
| Cmd + K           | Show or edit the workflow for the current element.          |
| Ctrl + A          | Select all elements on the page.                            |
| Ctrl + G          | Group selected elements into a new group.                   |
| Ctrl + E          | Center the current element relative to its parent.          |
| Ctrl + B          | Make text bold.                                             |
| Ctrl + I          | Make text italic.                                           |
| Ctrl + U          | Underline text.                                             |
| Cmd + /           | Insert dynamic data into an expression.                     |
| Esc               | Close the property editor.                                  |
| Option + Cmd + \[ | Make first.                                                 |
| Option + Cmd + ]  | Make last.                                                  |
| Cmd + \[          | Move left or up.                                            |
| Cmd + ]           | Move right or down.                                         |
