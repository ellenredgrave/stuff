# Computing 2 Submission Proforma

**CID:** 01735544

For each section, write a maximum of 200 words.

## Brief
*State what you set out to acomplish with this web app.*
The webapp aims to help people who have specific food requirements to find restaurants in their area that cater to their needs.
The webapp lets the user enter their location and dietary requirement and then lists the restaurants in that area that are in the database, as well as the number of items on the menu that fit the dietary requirement, and the rating given by users. The user can then view reviews and comments and add their own review by clicking on the restaurant name and providing a comment and rating out of 5. The webapp allows users to find comments that are specifically related to their requirement, as often other people's opinions on a restaurant are not relevant to people with specific requirements. Currently there are only 2 towns in the database.

## Coding
*Highlight your approach to coding in this project.*
I split the coding up into different sections, first creating a base HTML file for each page, outlining what was wanted on each page. A base CSS file was created for the entire page. Next the server was created as well as a javascript file for each page. I aimed to use functional programming where possible, so that it was clear what eas happening in the code. Using SQL manager, I created a database with the relevant tables. I produced a back-end server that updates and gets information from an SQL database.

## UX/UI
*Outline the key elements of your UX/UI design.*

The design of the webapp focuses on being simple and effective. There is a small bit of text on each page to let the user know what is happening and how to use the webapp. However minimal text is used so that it is not overwhelming. More than 2 users can use the webapp at the same time, and different people can submit and see each other's reviews. The reviews automatically appear on the page once submitted, creating a better user experience as there is instant feedback. The form submissions are minimal and simple.

## Data
*Explain how you structure and process your data.*
The code reads and writes to an SQL database and uses joins to get information. The webapp pulls specific data based off the form submissions and what is clicked on. There is a table for reviews, where each restaurant and requirement is specified, along with the comment and star rating. This table is joined to the restaurant list table so that the restaurant name is linked to the reviews. The restaurant_list table contains the number of each options, as well as the total number of stars and total number of reviews, as well as the location of each restaurant. There is also a town_list table that lists the towns in the database. The code is designed so that other restaurants and towns can be added to the database andthe webapp will still work.

## Debugging
*Describe how you used debugging practices and tools and how they helped you overcome a bug or conceptual issue.*
I used console.log a lot during the coding process to find out where my code was failing. This allowed me to work out whether my serverside code or clientside code was at fault, as I could see whether the information was being fetched from the database. In my server.js, errors would be thrown if the code could not access the correct parts of the database. This allowed me to quickly find when there was an issue with my database naming or calling, as throughout the process the database changed frequently as I changed the concept and key data used. I also created a test.js script which completes a few tests, including property based testing.

## Best Practice
*Outline your use of software development best practices*

I tried to conform to JSLint as much as possible, however some lines could not be effectively shortened, and I called JQuery out of the js files so until it run it brought up a problem. The code is commented to show what is happening in each part of the code, for easy readability. Each different page of the webapp has a new js and css file for easy access and finding problems. The use of databases is extensive, including using joins.

