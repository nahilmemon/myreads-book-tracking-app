import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Library from './components/Library.js';
import SearchBooks from './components/SearchBooks.js';
import ErrorPage from './components/ErrorPage.js';

class BooksApp extends React.Component {
  state = {
    // Store the books belonging to user's library
    books: [],
    areLibraryBooksLoaded: false
  }

  // Fetch all the books saved in the user's library and update the state
  // with these results. Show a loading state while the books are being
  // fetched.
  componentDidMount() {
    this.retrieveLibraryBooks();
  }

  // Get all the books in the library using the BooksAPI
  retrieveLibraryBooks() {
    // To display a loading state until the new books have arrived
    this.setState({
      areLibraryBooksLoaded: false,
      books: []
    });

    // Fetch all the books from the user's library using the API
    BooksAPI.getAll()
      // Catch any errors resulting from getting all the books from the server
      .catch((error) => {
        console.log('Error in retrieving all books: ', error);
      })
      // Update the state with the retrived books array
      .then((books) => {
        this.setState({
          books: books,
          areLibraryBooksLoaded: true
        });
      })
      // Catch any errors during the process
      .catch((error) => {
        console.log('Error in refreshing book state after retrieval: ', error);
      });
  }

  // Change the shelf that a book (modifiedBook) is located on to the new
  // shelf that the user clicked on
  moveBookToNewShelf = (modifiedBook, newShelf) => {
    // Update the server with the book's new shelf information
    return BooksAPI.update(modifiedBook, newShelf)
      // Catch any errors resulting from trying to update the book's new shelf
      .catch((error) => {
        console.log('Error in updating book-shelf movement: ', error);
      })
      // Then get all the books from the server
      .then(() => {
        this.retrieveLibraryBooks();
      });
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => (
            <Library
              books={this.state.books}
              onMoveBookToNewShelf={this.moveBookToNewShelf}
              areLibraryBooksLoaded={this.state.areLibraryBooksLoaded}
            />
          )}/>
          <Route exact path='/search' render={() => (
            <SearchBooks
              onMoveBookToNewShelf={this.moveBookToNewShelf}
            />
          )}/>
          <Route component={ErrorPage} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
