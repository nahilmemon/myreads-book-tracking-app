import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Library from './components/Library.js';
import SearchBooks from './components/SearchBooks.js';

class BooksApp extends React.Component {
  state = {
    // Store the books belonging to user's library
    books: []
  }

  // Fetch all the books saved in the user's library and update the state
  // with these results
  componentDidMount() {
    // Fetch all the books using the API
    BooksAPI.getAll()
      // Update the state with the retrived books array
      .then((books) => {
        this.setState({ books: books })
      })
      // Catch any errors during the process
      .catch((err) => {
        console.log('Error in updating: ', err)
      });
  }

  // Change the shelf that a book (modifiedBook) is located on to the new
  // shelf that the user clicked on
  moveBookToNewShelf = (modifiedBook, newShelf) => {
    // Helper function to determine whether the modified book's id
    // matches any given book's id
    function findMatchingBookId(unmodifiedBook) {
      return unmodifiedBook.id === modifiedBook.id;
    }
    // Find the index of the modifiedBook in state's books array
    let modifiedBookIndex = this.state.books.findIndex(findMatchingBookId);

    // Get the current books array from the state and change the shelf of
    // the modifiedBook in this array
    let newBooks = this.state.books;
    newBooks[modifiedBookIndex].shelf = newShelf;

    // Update the server with the book's new shelf information
    BooksAPI.update(modifiedBook, newShelf)
      // Then update the state with the newBooks array in order to reflect the
      // modifiedBook's new shelf value
      // Note #1: I could alternatively do this:
        // .then(() => (BooksAPI.getAll()))
        // and not do any of the above code either
        // but since the user can only change one book at a time,
        // and taking into consideration that the user might have a very long
        // list of books in his/her library, doing the following manually is
        // probably much faster then getting all the books from the API
      // Note #2: I'm setting the state after BooksAPI.update() to ensure that
        // the shelf changes persist instead of beforehand in case there was an
        // error updating the book in the server.
      .then((books) => {
        this.setState((state) => ({
          books: newBooks
        }));
      })
      // Catch any errors during the process
      .catch((err) => {
        console.log('Error in updating: ', err)
      });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library
            books={this.state.books}
            onMoveBookToNewShelf={this.moveBookToNewShelf}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            onMoveBookToNewShelf={this.moveBookToNewShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
