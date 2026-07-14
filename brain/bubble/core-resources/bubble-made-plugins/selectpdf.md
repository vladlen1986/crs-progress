# SelectPDF
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/selectpdf · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

SelectPDF allows you to generate PDFs for your invoices, letters, and other documents.

## **Generate PDF from a web page**

This workflow event allows you to dynamically generate a PDF doc based on a page in your application.

### File name

The name of the generated pdf file.

### URL type

The type of page you’d like to generate a PDF from. Choose between an external page within your own application, or an external page from a third-party source.

### Page (internal page)

The page within your application that you’ll generate a PDF from.

### Data to send (internal page)

The values you’ll display on the target page where a PDF will be generated.

### Destination URL (external page)

The URL of the external page you’d like to generate a PDF from.

### Page size

Select the preferred dimensions of the PDF page.

### Page orientation

The orientation of the final PDF document.

### Page margin

Add a page margin around your target page.

### Keep images together

Prevent images from being split across pages.

### Min load time

The minimum amount of time required to generate a PDF document.

### Render page as

A User of the app to run the page as

### Make this PDF private

Add privacy settings to your final PDF file.

### Rendering engine

Define what rendering engine you’d like to generate your PDF document.

## Setup

After installing the SelectPDF plugin, you’ll be required to add your own API keys to begin generating data. You can request your own API key on the SelectPDF developer portal [here](https://selectpdf.com/html-to-pdf-api/).

After generating your API key, copy the value into both the ‘API key’ & ‘API key - dev’ field of your Bubble plugin.<br>

![](https://lh5.googleusercontent.com/YKeoNbVMnFpVtM50hYuWV7ZA0GiY-MlSIJad6bmOO5cZ9S2tXVrMLE2uR6F-LY9vH4l084bnK4iF9lRdWnfoiv6vHjG24q3-Bp2wOTRGxOg_HW8_HQqI9Aln5JudH0gLtR1T9XoM=s0)

After configuring your API keys, you can now call the ‘Generate PDF from a web page’ event within your workflow editor.

As an example, if you’d like to generate an invoice within your application, you’d first need to create a page within your application that would allow you to display its dynamic content.

You could achieve this by creating an ‘invoice’ page, setting the page’s type of content to be an ‘invoice’ data type.

Now on this page, map out the layout of your invoice using dynamic elements of the ‘current page invoice’.<br>

![](https://lh6.googleusercontent.com/0xenkt12LfjxUe_LlU-UU7LkHismGvd9yZydhB7eR-nglA45fCWFWtMUCNWYFyKoVdacz5F9tBp4KZF5Yf-kzalo1JglX4RBuXyBaVMZDtHJnsd3x58ZXVkDB2-3YkKBdTPQQ9Bu=s0)

Now, whenever you generate an invoice on a separate page, you could call your ‘generate PDF from a web page’ event.

Within this workflow step, you’ll need to identify what page of your application you’d like to generate a PDF for.

You would also need to identify what dynamic data you’d like to send to this page.

In a workflow where you’ve just generated a new invoice, you could choose to generate a PDF of this invoice page, sending through the value of the thing you’ve just created.<br>

![](https://lh5.googleusercontent.com/JHhsG8FyWbw90SvM9nQ9CYVtnNxsqnhM__smVsyWhbMKvYY4wlUijvI_qXono1fLk8L99eUz2MY7yeXLqpkkfMYwvEZszK8zO_0QEfa0teZcF5gDlDkNtMIwSd3N8kGozPOG6MFZ=s0)

When generating the PDF, it’s also possible to update the name, page size, and orientation of the final file.

Once this PDF file has been generated, you can choose to store this in your database using another workflow step, or even send it within an email as an attached file.<br>

![](https://lh4.googleusercontent.com/liRdf4y0sncI1089It7Tuwz8t0Uf6dGDiCuOBdFKkdj_26ZGrzDO6cirSskBr2SI68TV26zaQN6rs2VxwOEpF4bCVVu4Ei8d_Sol_qBfbeOEtDcS2URTYvZH4a1VtI9XTpkadEkW=s0)

## FAQ

### How can I avoid splitting images across pages in a PDF?

When configuring your ‘generate PDF’ workflow event, tick the ‘keep images together’ configuration.<br>

![](https://lh3.googleusercontent.com/2NWsKuBlS3mkoNnlGFVba7TlHk1rFBD-02y0wAVAEfXJ_Me1YpPjs0mXmeufDzkkhIqqEjT2yv6865PhZ2jPG9OALQk-zPRtyJYsJfmhzEmHCCOaRHfiOWmu_PS5J4SWtjAfITHo=s0)
