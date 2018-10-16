# MyReads Book Tracking App

## Table of Contents

* [Description](#description)
* [How to Run the Web App](#how-to-run-the-web-app)
* [Minimum Requirements](#minimum-requirements)
* [Extra Features](#extra-features)
* [Project Structure](#project-structure)
* [Backend Server](#backend-server)
* [Resources Used](#resources-used)

## Description

This is a book tracking app that lets you choose books and categorize them onto different shelves: read, want to read, and currently reading. This project was built using the React framework. An [API and client library]( https://github.com/udacity/reactnd-project-myreads-starter) was provided to help persist information as the user interacts with the app.

## How to Run the Web App

1. Download the repository.
2. Open a command prompt terminal and cd (change into the directory) where the repository has been saved.
3. Install all the needed npm dependencies using the following command:
    * `npm install`
    * Note: node.js can be downloaded [here](https://nodejs.org/en/download/) and npm can subsequently be installed using the instructions found [here](https://www.npmjs.com/get-npm)
4. Start the development server using the following command:
    * `npm start`
5. While the server is running in the background, browse the website at: [http://localhost:3000](http://localhost:3000)

## Minimum Requirements

The minimum requirements of this project involved:
* Ensuring that the application is easy to install and start.
* Writing a README with easy to understand instructions on how to install and start the project.
* Creating a main page with the following features:
  * Three shelves to display books on: read, want to read, and currently reading.
  * Books with their corresponding titles and authors and placed on the correct shelves.
  * The ability to move books from one shelf to another.
  * The information for each book remains the same even after a browser refresh.
* Creating a search page with the following features:
  * A search input field in which the user can search books by author or title.
  * Search results are cleared when the search input becomes empty.
  * Proper handling of search results when given invalid search queries.
  * Properly display books with partially missing information such as missing book cover thumbnails or missing authors.
  * The ability to search multiple words at a time.
* Setting up routing, which involved:
  * Setting up a link from the main page to the search page.
    * Ensuring that clicking this link displays the search page and changes the URL in the browser’s address bar to /search.
  * Setting up a link from the search page to the main page.
    * Ensuring that clicking this link displays the main page and changes the URL in the browser’s address bar to /.
* Managing state properly by:
  * Ensuring that component state is properly passed down so that child components inherit state from parent components.
  * Modifying state by using `setState()` instead of by modifying it directly.
  * Ensuring that books have the same state on the main page and the search page, especially with regards to which shelves they’re located on.

## Extra Features

Extra features that were added to the web app included doing the following:
* Made the site accessible, such as by:
  * Using a color palette with high enough contrasts for those with lower visual acuity to view the site more easily
  * Presenting information through means not only involving color in order to take into consideration those who are color blind
  * Adding a skip link to the main to page to easily skip to the search books link instead of going through all the books and shelf changing dropdowns first
  * Ensuring that all content-related images come with suitable alternate text which properly describes the contents of these images.
  * Managing focus appropriately so that users can easily and noticeably tab through all the important elements on the webpage.
  * Trapping focus only where necessary, such as in the modal, and ensuring that focus is otherwise escapable.
  * Using semantic elements wherever appropriate.
  * Using ARIA roles for elements that did not have a proper semantic element to define themselves.
  * Using labels and ARIA labels where appropriate.
* Sorted the search results alphabetically by book title.
* Added a modal to display more details regarding each book displayed on the main page and the search page.
* Added an icon to display which shelf each book is on when viewing books on the search page.
* Added a message to indicate when a shelf is empty as opposed to a loading error.
* Added loading icons to display when:
  * The books are being retrieved to display on the main page.
  * The books are being searched on the search page.
  * The books are moving from one shelf to another on both the main page and the search page.
* Added an error page if the user navigates to a non-existing page with link to return back to the main page and the search page.

## Project Structure
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms to use with this app.
├── package.json # npm package manager file.
├── package-lock.json # npm package manager file.
├── public
│   ├── favicon.ico
│   └── index.html
│   └── images
└── src
    ├── App.css # Styles for the app.
    ├── App.js # Root of the app.
    ├── App.test.js # Used for testing.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── components # Contains all custom components for building this app.
    │   ├── Book.js
    │   ├── BookGrid.js
    │   ├── BookModal.js
    │   ├── Bookshelf.js
    │   ├── Library.js
    │   ├── SearchBooks.js
    │   └── ShelfSelect.js
    ├── icons # Helpful images for the app.
    ├── index.css # Global styles.
    └── index.js # Used or DOM rendering.
```

## Backend Server

A [backend server](https://reactnd-books-api.udacity.com) was provided by Udacity to work with for this project. The [`BooksAPI.js`](src/BooksAPI.js) file was also provided and it contains the methods that were needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in the app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only.

### Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend provided.

## Resources Used

* [Create React App](https://github.com/facebook/create-react-app)
* [prop-types npm package](https://www.npmjs.com/package/prop-types)
* [react-router-dom npm package](https://www.npmjs.com/package/react-router-dom)
* [Modal Window Effects](https://tympanus.net/Development/ModalWindowEffects/)
* [Implementing a Simple Modal Component in React](https://alligator.io/react/modal-component/)
* [Building an accessible Modal component with React Portals](https://assortment.io/posts/accessible-modal-component-react-portals-part-1)
* [Google and Udacity course on Accessibility: Building an Accessible Modal Dialog](https://github.com/udacity/ud891/tree/gh-pages/lesson5-semantics-aria/21-dialog)
* [Gif Empire - Loading Gear](http://gifs.duhnnae.com/2017/apr/14927052542-Science-Gears-loadinggears-loading-gear-3-3-gif.php)
* [Open Source Loading GIF Icons](https://www.behance.net/gallery/31234507/Open-source-Loading-GIF-Icons-Vol-1)
* [Material UI Icons](https://www.materialui.co/icons)