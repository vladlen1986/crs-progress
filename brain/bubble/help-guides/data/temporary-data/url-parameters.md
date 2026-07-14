# URL parameters
> Source: https://manual.bubble.io/help-guides/data/temporary-data/url-parameters · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

A URL parameter is a piece of information that you place in the browser's URL. They follow a key-value-pair[^1] structure and can hold many different types of data.

{% hint style="warning" %}
Due to Bubble's internal logic, **avoid** using the following strings as **keys**:

* id
* debug\_mode
* resume
  {% endhint %}

## How URL parameters are structured

Every page in your application (except for the index page) has its own URL that follows a regular pattern:

```
https://my-bubble-application.bubbleapps.io/mypage
```

or if you have connected to a domain:

```
https://www.mydomain.com/mypage
```

This points the browser to the right domain and to the right page. The information in that URL is actually an instruction to the *server* to send the correct page back to the browser. In other words, your browser *sends* that URL to the server, which responds by sending back the files needed to display the page.

URL parameters also serve a function, but instead of talking to the *server* they can send messages to the current *page.* In other words, your Bubble app can write and read URL parameters in the browser's URL bar and use that information for different purposes.

URL parameters are listed after the complete page URL, and are separated from that URL with a question mark (?). If there are multiple parameters, they are separated from each other with an ampersand.

<figure><img src="/files/yhu39r3dh15RDrMxqlR3" alt=""><figcaption></figcaption></figure>

Each URL parameter consists of a **key** and a **value**:

* The **key** identifies the parameter with a unique string of text such as *name*
* The **value** is the data that the parameter holds, such as *John*

The structure would then look like this:

```
name=John
```

If we place that in the full page URL (and separate it from the URL with a *?* as we explored earlier) we get:

```
https://www.mydomain.com/mypage?name=John
```

Now to add slightly more complexity, let's change the *name* parameter to *firstname* and add a second parameter called *lastname*.

```
https://www.mydomain.com/mypage?firstname=John&lastname=Doe
```

In this last example, Bubble would be able to identify the full name *John Doe* from the URL bar. Let's have a look at how that happens.

## Reading URL parameters

{% hint style="warning" %}
**Note**: There are some **plugins** that can manipulate the browser's URL bar, including its parameters. It's worth noting that Bubble does not always catch updates to parameters if they are not made with the *Go to page* action.\
\
Recognizing the change may require a page reload or the plugin may be able to return an updated value.
{% endhint %}

As we've covered, the URL parameter consists of a key and a value, and we need to instruct Bubble what *key* to look for in order to get the value in return.

To do that, we set up an expression where we use the *Get data from page URL* [data source](#user-content-fn-2)[^2].

<figure><img src="/files/otPD9d3StQbZZBykQNIC" alt=""><figcaption></figcaption></figure>

After picking the data source, Bubble will ask for some additional parameters:

<figure><img src="/files/n2egwI3Ud1bkKieR5bCO" alt=""><figcaption></figcaption></figure>

1. The first one is the **key** to identify our parameter. We want to fetch the first name (John), so we'll set that to *firstname*.
2. Secondly, we need to tell Bubble what kind of data to expect. We can set this to *text.*

As soon as you set the key, you can see on the right side that Bubble updates the expression to say *Get firstname from page URL.*

If the parameter `name=John` exists in the URL, the text element will show the name John to our users. If the URL parameter can't be found or has an empty value, it will display nothing.

## Reading different data types

In the example above we used the text data type to read a simple piece of information: a name. But URL parameters can also be used to read other types of data.

{% hint style="info" %}
Bubble's general data types (text, numbers, dates, etc) need particular formatting in order to ensure compatibility with all browser.

Bubble automatically applies the correct formatting in most cases, but if you have hardcoded links or want to learn more about how the different data types are formatted, check out the info-box below.
{% endhint %}

<details>

<summary>Formatting Bubble's general data types in a URL parameter</summary>

#### Text/numbers/Geographic address/file/image

Text and numbers can for the most part be added just like you want them to appear when you read the value, but special characters may give you problems with some browsers. To ensure compatibility, you can include characters that are not normally valid in a URL by encoding them using percent-encoding.

In percent-encoding, characters are converted into a sequence of characters. For example, the character / is converted to %2F, and the character ' is converted to %27.

Let's say we wanted to encode the product header *O'Donnel t-shirt in white/blue.* We have three special characters: space, ' and /.

{% code overflow="wrap" %}

```
https://www.mydomain.com/mypage?productname=O%27Donnel%20T-shirt%20in%20white%2Fblue
```

{% endcode %}

When you use the *Go to page* action to add a URL parameter, Bubble **automatically encodes** the string as needed. If you set up hardcoded links, you may need to add percent-encoding manually. You can use Bubble's format as URL operator to convert a text to the right format.

Files and images contain the URL string, and also needs to be formatted with percent-encoding.

#### **Numeric range**

Numeric ranges can't be passed as a single data type. Instead, you should break the range into its minimum and maximum number into to separate number parameters. For example, you can add a parameter called *min* with the value 1 and another called *max* with the value 5.

Then when you need to reference the range you can use the [*range* operator](#user-content-fn-3)[^3] to combine the two values into a valid numeric range.

#### Date

Dates have the following format:

* ***Format:** Month Day, Year Hour:Minute am/pm **or** M/D/YYYY h:mm am/pm*
* **Example:** Jan 1, 1970 8:50 am

Dates also need percent-encoding, which Bubble will automatically apply:

```
Jan%201%2C%201970%208%3A50%20am
```

%2C represents a comma (,), %3A represents a colon (:), and %20 represents a space.

#### Date range

Date ranges, like number ranges, need to be passed in two separate values, such as *startdate* and *enddate* and then combined with the [*range* operator](#user-content-fn-4)[^4]. Dates need to be passed with percent-encoding as described in the *Date* section.

#### Date interval

Date interval is passed as the number of milliseconds between to datetimes.

#### Yes/ no

Yes/no values are passed as written out: *yes* or *no.*

</details>

### Custom data type things

You can also link to a custom data type in a URL parameter. To read and retrieve the correct thing, that thing's Unique ID needs to be present in the parameter. The name (key) of the parameter does not affect the result, but when you use the *Get data from page URL* data source you need to set it to the correct data type, as exemplified below:

<figure><img src="/files/EJ8CbFQXXecT10a1wbpM" alt=""><figcaption></figcaption></figure>

1. First we set the name (key) that identifies the right parameter
2. Then we set the *type* to the data type of the thing we want to retrieve
3. Bubble then lets you add operators to the *Get data from page URL* data source relevant to that thing. In the example we are getting the name of the Task.

The URL in this case would look like this:

```url
https://www.mydomain.com/mypage?task=1676895495518x833172344879202800
```

### Option sets

You can also retrieve an option from an Option set. Option sets do not have Unique ID's but are identified by the value stored in the *Display* field. Just like with data types, you can give the parameter an arbitrary name, but you need to set the *type* to the Option set you want to retreive.

<figure><img src="/files/LFFIFZQAMLOOR4dN5PBJ" alt=""><figcaption></figcaption></figure>

1. First we set the name (key) that identifies the right parameter
2. Then we set the *type* to the Option set we want to retrieve
3. Bubble then lets you add operators to the *Get data from page URL* data source relevant to that Option set. In the example we are getting the abbreviation of the State.

The URL in this case would look like this if we included the state name in the Display field:

```
https://www.mydomain.com/mypage?state=Texas
```

## Setting URL parameters

There are two ways to pass URL parameters to a page:

1. The first is to **include it with the URL when the page loads**, for example by linking to the page with a URL that includes the parameters. Simply copy/pasting the URL into a link will have Bubble recognize the parameters on page load.
2. The second is to use the ***Go to page*** **action** and checking *Send more parameters to the page.* This will apply the necessary encoding to whichever information you provide and send the parameter.

<figure><img src="/files/KD2Q9yHEhVrYgmFl9xAb" alt=""><figcaption><p>The Go to page action lets you send the parameters by adding them in a list as illustrated above. The left-hand input field is the <em>key</em> and the right-hand field is the <em>value.</em> If you remain on the same page, the page will not be reloaded, but the parameters will be instantly updated.</p></figcaption></figure>

{% hint style="info" %}
The **Go to page** action does not reload the page if you are going to the same page that you are already viewing. This means you can set and change URL parameters as much as needed without the page having to be reloaded.
{% endhint %}

## FAQ: URL Parameters

#### Can you pass a list of Things in a URL parameter?

You can only pass one value at a time in each URL parameter (but you can create as many parameters as you need, within the maximum URL length supported by the browser). There may be workarounds to pass lists, but it's not officially supported by Bubble at this point.

#### Are URL parameters secure?

URL parameters are not insecure by and of themselves, but they can require that you understand the potential vulnerabilities associated with using them. For example:

* They are fully editable by your users, meaning that they can add, remove and change URL parameters as they want.
* They are of course also fully visible in the browser's URL bar, meaning that they should never contain any sensitive data
* When used for navigation, keep in mind that a tech-savvy user can pay attention to the URL parameters and understand their structure: if you don't secure your navigation in other ways the user may be able to access sections they are not supposed to
* When including custom data types in the URL, you are revealing the Unique ID of that thing. Again this is not a vulnerability on its own, but can *lead* to vulnerabilities. Someone could for example replace the Unique ID in the URL to see a record that's not their own: the things needs to be protected with Privacy Rules

[^1]: A key value pair is a way of storing data. It consists of a *key* and a *value*.\
    \
    In the context of URL parameters, the *key* is the name of the parameter, and the *value* is the value. For example:\
    \
    ?name=john\&age=56

    In this example, the *keys* are *name* and *age*, and the values are *john* and *56*

[^2]: A *data source* is any source from which Bubble can pull in data, such as a database search, the current user or an API call. We can then narrow down the data from that source if needed using *operators.*\
    \
    In the context of URL parameters, we are asking Bubble to use the URL as a data source.

[^3]: The *range* operator Generates a number range from two numbers and returns a range whose lower bound is the smaller of the two numbers and the higher bound is the larger one.\
    \
    Reference: [The range operator](/core-resources/data/operations-and-comparisons#less-than-range-greater-than) (numerical)

[^4]: Generates a date range from two dates. This represents a span of time from the moment of the first date to the moment of the second date. Date ranges are a useful tool for representing availabilities or time slots.

    Reference: [The range operator](/core-resources/data/operations-and-comparisons#less-than-range-greater-than-1) (date)
