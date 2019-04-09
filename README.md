# JavaScript and DOM Manipulation

## Background

This application creates a table dynamically based upon a [dataset](static/js/data.js). The users can filter the table data for specific values. The application use pure JavaScript, HTML, and CSS, and D3.js for all logic. 

## Step 1: Automatic Table and Date Search

* A basic HTML web page is used for display using HTML and Bootstrap CSS.

* Using the UFO dataset provided in the form of an array of JavaScript objects, js code is written that appends a table to the web page and then adds new rows of data for each UFO sighting.

  * The table has `date/time`, `city`, `state`, `country`, `shape`, and `comment` columns.

## Step 2: Multiple Search Categories 

* Once all the HTML and JS code for refershing HTML table is built, filters are added for user to interact with the webpage.

* A JS code is written to produce multiple select dropdowns, so the user can to set multiple filters and search for UFO sightings using the following criteria based on the table columns:

  1. `date/time`
  2. `city`
  3. `state`
  4. `country`
  5. `shape`

- - -

### Dataset

* [UFO Sightings Data](static/js/data.js)

- - -

### Copyright

Data Boot Camp © 2018. All Rights Reserved.

