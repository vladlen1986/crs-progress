# iTunes
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/itunes · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Fetch song names, artists, and other data from the iTunes API.

{% hint style="warning" %}
**Note**: This call is blocked on iOS.
{% endhint %}

## Get data from external API - Get iTunes songs

When fetching a list of songs to display, this data source can be used to search for songs within the iTunes library.

### Term to search

The search query used to fetch a relevant list of iTunes songs.

## Dynamic text operators

### iTunes song’s Artist

The artist's name of the iTunes song.

### iTunes song’s Track title

The title of the iTunes song.

### iTunes song’s Album title

The album title that the iTunes song belongs to.

### iTunes song’s URL

The Apple Music URL to play the current song.

### iTunes song’s Country

The country of origin for the creator of this song.

### iTunes song’s Album image

The album image featured for the iTunes song.

## Setup

After installing the iTunes plugin, it’s possible to display a list of song results by adding a repeating group to your application page.

When configuring the repeating group, set the type of content to be ‘iTunes Song’. Then, for the data source, use the ‘get data from external API’ option.

The API provider you’ll need to select is the ‘Get iTunes songs’ choice.

Now, you can match a search term with any static or dynamic text value.<br>

![](https://lh3.googleusercontent.com/hJh8U-7O_HKLO51WZMy4VQAck-HwqWblWEyyjie3Y42h2MkXQupDUlQL70D-R8u7jpnlqtjw_VLY2bY3jTvIb5b-f0oREKZ-VPycviJsbO01eeJ7AOeiHzUvjLBxu13jn3DgF6LR=s0)

From here, it’s possible to add a list of dynamic elements into the repeating group’s cell.

Simply choose the ‘current cell’s iTunes songs’ operator to display the results of a search query.<br>

![](https://lh6.googleusercontent.com/OdqHZ8VecJayvPts4qQDF3ANbLGzaX64jCy8QIZaJySSip011z-nmxZaI9miu7N_CPLtolRKacJ-CEdHY1Mq2z0UmjX07TRmwudL_PoxeUTaYB4_siX2SGsN9jozSy5yy6ZbDaNk=s0)

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
