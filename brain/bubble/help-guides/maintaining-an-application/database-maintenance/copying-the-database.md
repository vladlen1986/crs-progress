# Copying the database
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/database-maintenance/copying-the-database · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to copy the content of the Development database to the Live database, and vice versa

## Copying between the Live and Development databases <a href="#copying-across-versions" id="copying-across-versions"></a>

This option lets you overwrite the entire database, or only a selected data type, from Development to Live and vice versa. Note that the operation can take some time to finish if you have a large database.

To start the process, navigate to the *Data* tab and then click the *Copy and restore database* link.

<figure><img src="/files/q6y9LXy6hGbvt2MVzrCS" alt=""><figcaption></figcaption></figure>

Bubble will open a popup that shows you the different options.

<figure><img src="/files/xuMZZ22tE7Gof0mbmNeq" alt=""><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

You will see two buttons:

* Copy Live data into the Development database
* Copy Development data into the Live database

To start the process, click one of the buttons.

<figure><img src="/files/catd7nIF6vmGlzzmbN3L" alt=""><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

1. In this example, we want to copy data from Live into Development, so we click the left button
2. *Data types to copy* lets you select *all* *types* or select one type\*
3. As an extra security measure to avoid accidental overwriting of data, we ask that you spell out a short sentence to confirm that you want to proceed
4. Finally, you can press the *Confirm* button to start the operation. For large database where you copy all content, the process can take some time to finish

{% hint style="danger" %}
Keep in mind when copying Live data into Development that this can give your *Collaborators* access to more data than you intended. Always be mindful of the privacy of your users when you copy data.
{% endhint %}

{% hint style="warning" %}
\*Be cautious when you copy only one data type, as it can lead to data inconsistencies if some things are related. Sometimes it's better to still restore all to make sure that no relationships are lost.
{% endhint %}
