# Google Places
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/google-places · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Google Places

Fetch restaurants, schools, and more. from the Google Places API.

## Get data from external API - Get Google Places

When displaying information from Google Places, this data source allows you to fetch content from the API.

### Search type

Identify how you’d like to fetch and return results from your places API.

#### **Nearby Search**

* Returns places **near a specific location**.
* Requires a **radius** (in meters) to define the search area.
* Supports filters like **type** (e.g., restaurants) and **keyword**.
* Prioritizes results based on proximity and relevance.

#### **Text Search**

* Returns places based on a **text query** (e.g., "coffee shops in New York").
* Does **not** require a specific location but can be **biased** toward one.
* Allows more flexible search queries (natural language input).
* Useful when searching for a **specific place name** or business type.

### Query/keyword

The search term used to discover relevant Google places.

### Location

The location proximity in which the API will fetch results within.

### Radius

The geo distance from your location that Google will display places for.

<table data-header-hidden><thead><tr><th></th><th width="114"></th><th></th></tr></thead><tbody><tr><td>Accepted value</td><td>Decimal</td><td></td></tr><tr><td>Unit</td><td>Meters</td><td></td></tr><tr><td>Minimum value</td><td>0.0</td><td>(default if not specified)</td></tr><tr><td>Maximum value</td><td>50,000</td><td></td></tr></tbody></table>

### Type

The type/category of Google place you’d like to filter results by.

## Dynamic text operators

### Current cell’s Google Place’s name

The name of the Google Place’s listing

### Current cell’s Google Place’s address

The address displayed on the Google Place listing

### Current cell’s Google Place’s postal address

The postal address displayed on the Google Place listing

### Current cell’s Google Place’s icon

The icon used to represent the Google Place’s category

### Current cell’s Google Place’s open now

The status of a Google Place to display if the listed business is currently open

### Current cell’s Google Place’s types

The type of category added the Google Place listing.

### Current cell’s Google Place’s ID

The unique ID allocated to the Google Place.

### Current cell’s Google Place’s place ID

Place IDs uniquely identify a place in the Google Places database and on Google Maps.

### Current cell’s Google Place’s business status

Indicates the operational status of the place e.g. operational, closed temporarily, closed permanently

### Current cell’s Google Place’s permanently closed

The yes/no status to identify if the place is permanently closed

## Setup

In order to use the Google Places plugin, you’ll first need to create a valid API within your [Google Developer console](https://console.cloud.google.com/apis/dashboard).

Under the credentials tab of your project dashboard, start by creating a new API key.

Once your API key has been created, search for the Google Places API service within the main search bar.

![](https://lh4.googleusercontent.com/vo8zIxmThBqQgIG5sfnTaFnuw7QUI2GhsyhnF4UFnX_LTFxQchdSbn1Xwurqf2Hikz1VQhpKE-48hjh-f6sH1aGQwJSEsL99duplwqsLzeJuZeE2Y73NTdUhve5B2tai74PEGGfM=s0)

Now, select to enable this service.

From here, copy your original API key into your plugin settings field.<br>

![](https://lh5.googleusercontent.com/XlAbd-Xz3_mKpyNFg_8zo8_EwX4I6SMSo7mMwtO1F9MEA20R2-2wfXh_ouoUzl-Vi5__0KwAqUf4uleZ-d87qoqQ3G3i0nQmbNdsQBUb4zkGw2cXymA3OvZDGgM_-O5Mx3mi7WqO=s0)

Once you’ve set up the plugin, you can now search and display a list of places.

When using a repeating group to display a list of Google places, select the type of content to be Google Place, then set your data source to get data from external API. The API you’ll need to pull data from is the ‘Get Google Places’ option.

![](https://lh6.googleusercontent.com/prBqYM_ghjePzjDaKDkCI5Jkk1aDaK5U5-NQEmlpcKnuhtQRVbZQrkdGIhPZyuI2f0OYWVgvWtLXPp1vMIUzi7RLA8YL20iDctbbdvrbi5gKN5t32BtUKHqmyiehG72ATKk4U5kt=s0)

After configuring your data source, you can now update the additional fields to refine your list of Google Places.

Note: If you’d like user’s to search for their own Google Places, simply add an input element to act as a search bar, then match its value with the ‘query’ element field.

To display a list of the returned Google Places, start adding dynamic elements within your repeating group, then choose values from the current cell’s Google Place’s operator.<br>

![](https://lh5.googleusercontent.com/1CgMhx-Uai27LJdxQMFM0rjPTo1VGtswemHybCLOCTs3qfaBh6tDaCjlttg_5lOEp6coxC1kImYwx87GClRx0EpiNK73vzlxcF-XxDueZmj7GQACYMVQ1XSUmKCSVYeIz7ECgUDn=s0)

## FAQ

### How can you store Google Places data within your database?

Like any data, it’s possible to store the value of a Google Place from a repeating group cell by creating or making changes to a thing within your database. Within a workflow, simply match any data fields with the values of the current cell’s Google Place. If you’d like some additional guidance when working with Google Maps locations, we’d recommend reviewing our Maps API [documentation](https://manual.bubble.io/help-guides/working-with-data/working-with-location-data).
