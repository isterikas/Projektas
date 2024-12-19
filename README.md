
# About the project

The webpage was developed as an assignment by a team of Techin students. The page mimics appearance and partial functionality of an entertainment platform that offers its' user (not) a very wide variety of movies and TV shows.

Initially the user is being taken to the homepage and is able to get a preview of what the platform has to offer - if interrested, the user can create a profile and use all of the features that the platform offers (e.g. bookmarks functionality, tailored recommendations etc.). Additionally, a registered user can change the account password, set the profile picture and select preferred theme colors.

N.B. Our platform offers a possibility to have multiple users with individual bookmarks and recommendations.

# General information

## The users are be able to:
 
- View the optimal layout for the app depending on their device's screen size;
- See hover states for all interactive elements on the page;
- Navigate between Home, Movies, TV Series, and Bookmarked Shows pages;
- Add/Remove bookmarks from all movies and TV series;
- Search for relevant shows on all pages;
- Have a sign-up screen design to create users and write them to json file, login to check if user logged in, then redirect to Home page.
 
## Structure:

General:
- The navigation menu is fixed to the left for larger screens.
Home:
- The trending section scrolls sideways to reveal other trending shows;
- Any search input searches through all shows (i.e. all movies and TV series).

Movies:
- This page only displays shows with the "Movie" category;
- Any search input searches through all movies.

TV Series:
- This page only displays shows with the "TV Series" category;
- Any search input searches through all TV series.

Bookmarked Shows:
- This page displays all bookmarked shows from both categories;
- Any search input searches through all bookmarked shows.

## Tools
The platform was built on Vite using React framework. Additional tools that were used during the development process:
- json-server for mimicing a back-end database;
- React Router routing library.
- Tailwind CSS framework for design;
- React Hook Form for form validation;
- react-input-mask component for controlling the search input;
- react-error-boundary for "catching" errors and rendering a fallback UI;
- js-sha1 and js-sha256 functions for password hashing;
- axios for managing http requests;
- swiper for creating a smoothly working "Trending" carousel.
- react-dropzone for being able to drag and upload a picture to the page. Additionally, server.mjs is used for user photo storage;
- react-persist-state for being able to save a state after refreshing the page.


# Installation instructions

1. Download the project from from Github. Link: https://github.com/isterikas/Projektas;
2. Install all the required packages using "npm i" command in your terminal.
3. Launch json-server using "npx json-server data/data.json -p8080" command in your terminal.
4. Launch server.mjs using "node server.mjs" command in your terminal.
5. Run the project with "npm run dev" command in your terminal.
6. By default the project should be accessable at http://localhost:5173/. If not - please check your terminal for the correct address.

# Development team

- Audrius A.
- Edgaras L.
- Eryk T.
- Giedrius A.
- Nikas Š.
- Pavel G.

Code testers: 
- Airida G.
- Artur D.
- Dmytro S.


