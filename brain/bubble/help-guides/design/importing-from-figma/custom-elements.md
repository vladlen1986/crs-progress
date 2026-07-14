# Custom elements
> Source: https://manual.bubble.io/help-guides/design/importing-from-figma/custom-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Buttons, inputs, and dropdowns

Figma doesn’t have built-in element types for [buttons](/core-resources/elements/visual-elements#button), [inputs](/core-resources/elements/input-forms#input), [multiline inputs](/core-resources/elements/input-forms#multiline-input), or [dropdowns](/core-resources/elements/input-forms#dropdown).

To help improve conversion accuracy, the Figma to Bubble converter plugin includes a **Buttons/Inputs** tab. Here, you can tag a selected node as a button, input, dropdown, or multiline input before converting.

<figure><img src="/files/EA6Foa5E4hfWnHJC6Ov7" alt=""><figcaption></figcaption></figure>

Keep in mind:

* Only nodes with **one child or fewer** can be converted to a button, input, or dropdown, since Bubble doesn’t allow icons inside these elements.
* Nodes with **up to two children** can be converted to dropdowns to support a label plus a down chevron.
