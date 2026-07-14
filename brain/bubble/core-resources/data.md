# Data
> Source: https://manual.bubble.io/core-resources/data · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Creating, reading and changing data.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (12)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Data**

* Article series: [Data](/help-guides/data)
  * Article: [The database](/help-guides/data/the-database)\
    Understanding the Bubble database, and how to work with data.<br>
  * Article: [Files](/help-guides/data/files)\
    Uploading, downloading and securing files.<br>
  * Article series: [Static data](/help-guides/data/static-data)
    * [App texts](/help-guides/data/static-data/app-texts-translations)\
      Translating your app's static texts.
      * [Option sets](/help-guides/data/static-data/option-sets)<br>
  * Article series: [Temporary data](/help-guides/data/temporary-data)
    * Article: [Custom states](/help-guides/data/temporary-data/custom-states)\
      Saving data temporarily on a page or element.
      * Article: [URL parameters](/help-guides/data/temporary-data/url-parameters)\
        Saving and reading data from the browser's URL bar.

***

#### Dynamic expressions

When you work with data in Bubble, you'll often be relying on dynamic expression to load, aggregate and manipulate it in different ways. The article below explains how dynamic expressions work.

Article series: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

***

#### The Data tab

The *Data* tab in the Bubble editor is where you view and manage your app's data types and data, as well as other categories of data like files and option sets.

Article: [The data tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/data-tab)

***

#### Securing the database

Database data is protected server-side by using privacy rules. These are conditions that are automatically applied every time a user tries to access a specific data type/field.

Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
{% endtab %}

{% tab title="Videos (4)" %}

* Bubble Academy: [The Data Tab: Bubble Introduction Series \[7/10\]](https://www.youtube.com/watch?v=z0L8vFsCwkk)
* Bubble Academy: [How to Add a Data Type as a Custom Field | Bubble Quick Tip](https://www.youtube.com/watch?v=4txlG9nwr1E)
* Bubble Academy; [How to Instantly Modify Data With Autobinding | Bubble Quick Tip](https://www.youtube.com/watch?v=MamNYJmZjVY)
* Bubble Academy: [How to Name Your Data Types & Fields | Bubble Quick Tip](https://www.youtube.com/watch?v=XueeVCReuI8)
* Bubble Academy: [How to use the *Do a search for* expression](https://www.youtube.com/watch?v=-2_3kuyOxkw) (finding data in the database)
* Bubble Academy: [How to use search constraints](https://www.youtube.com/watch?v=gOjGDCJrXYI)
* Bubble Academy: [How to use *Ignore empty constraints*](https://youtu.be/6VEavvd4TG4)
  {% endtab %}
  {% endtabs %}

Most Bubble apps will be managing data stored in a database. This section of the reference covers how you access data, manages and compares results, searching and setting up security.

<details>

<summary><mark style="color:blue;">Data sources:</mark> the source from which you fetch data</summary>

Data sources are where you get your data from when building a dynamic expression. It is going to be the first section of the expression. Sources of data can be the current user, a search from the database, data from an external API, some page and browser information, etc.

[List of data sources](/core-resources/data/data-sources)

</details>

<details>

<summary><mark style="color:blue;">Operators and comparisons:</mark> change, evaluate and compare data</summary>

Operators and comparisons are used to work with the results of the data from the data source. For example:

**Change (manipulate the data in real-time)**

* Change a text to uppercase
* Add a number to an existing number
* Add a number of days to a date

**Evaluate/compare (return a yes or a no)**

* Check if data has a certain value (i.e. *Name* equals *John*)
* Check if the current user is logged in
* Check if a date is bigger than today's date
* Check if the current user's age is the same as another user's age

[List of Operators and Comparisons](/core-resources/data/operations-and-comparisons)

</details>

<details>

<summary><a href="/pages/-MTq-e1V7kkgdrOwxH_n">Search</a>: find the data you are looking for in the database</summary>

Searching is used to find specific data in the database. To do that, you instruct Bubble:

* What kind of data you are looking for (i.e. *Users* or *Products*)
* Provide constraints

[List of search tools and settings](/core-resources/data/search)

</details>

<details>

<summary><a href="/pages/-MTq-fKFTjaQlrvQVfRM">Privacy:</a> setting up your database securely to maintain your user's privacy</summary>

Privacy and security are cornerstones of all apps that handle sensitive data.

[List of privacy rule settings](/core-resources/data/privacy)

</details>

{% hint style="warning" %}
**Privacy and security** can be a very important part of your app's structure, and we highly recommend that you familiarize yourself with the different tools Bubble offers. The core reference explains each setting, but if you are new to the subject, we encourage you to read through our user manual security guide:

User manual article series: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
{% endhint %}

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
