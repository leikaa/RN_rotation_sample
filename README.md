### Scenario
* Write an SPA that contains a search field, and a list of five elements underneath.

### Conditions
* Per default the list should show A, B, C, D, E.
* Every second the elements should rotate by one position.
* When the user types into the search field, query the apple music API like
  this: https://itunes.apple.com/search?term=radiohead. The output contains a list with songs. Each song has a property "collectionName" (the album).
* Sort all albums alphabetically and take the first five.
* The list should keep rotating with a 1-second interval, and the new albums should be added from bottom to top.
* Items from previous searches should not appear again, but only the current search term items should be rotated.
