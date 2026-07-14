# Notes on queries
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/performance-and-scaling/notes-on-queries · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This page will note any special points around how database queries work. These go into some of the technical details of how databases work, but can help you debug situations where a query in your app doesn't work as expected.

## Stop words

There are certain special words known as "stop words" - these tend to be short, common words which the database will ignore when you query for them, except in the context of phrases. Some examples are "the", "I", or "do".

* In practice, this means that if you have a query for one of these stop words or a query involving some stop words, the results may not be fully what you expect.
* ​[Here's](https://github.com/postgres/postgres/blob/master/src/backend/snowball/stopwords/english.stop) a list of stop words affecting Bubble app queries.

## Stemming

"Stemming" is when databases will generalize a search query to look for other words of the same stem. For example, "test" and "testing" have the same stem, so results with the word "testing" will be found when searching for "test".

* Stemming matches words with semantically similar meanings, so "temp" and "temps" will match, but "temp" and "tempo" will not because they are not different tenses of the same word; similarly, "test" and "intestine" will not match.

(We use PostgreSQL with Snowball)

## Bubble query optimization

When querying the database, we try to apply an optimization on mapping operations, which makes them faster. Consider the following two Searches that both return the same list of comma separated numbers:

**Search A** -> "MyTypesList's count"

**Search B** -> "MyTypesList's: item 0's count, MyTypesList's: item 1's count, MyTypesList's: item 2's count, MyTypesList's: item 3's count, MyTypesList's: item 4's count, MyTypesList's: item 5's count, MyTypesList's: item 6's count"

**Search A** under the hood is a mapped operation and turned into a single database query at its core, which is quite performant. **Search B**, on the other hand, generates 7 distinct database queries that run one after another and combined after the fact. This leads to a significant performance hit and should be avoided whenever possible.
