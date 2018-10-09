import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './components/Library.js';
import SearchBooks from './components/SearchBooks.js';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    // Store the books belonging to user's library
    books: []
  }

  // Fetch all the books saved in the user's library and update the state
  // with these results
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  // Change the shelf that a book (modifiedBook) is located on to the new
  // shelf that the user clicked on
  moveBookToNewShelf = (modifiedBook, event) => {
    // Helper function to determine whether the modified book's id
    // matches any given book's id
    function findMatchingBookId(unmodifiedBook) {
      return unmodifiedBook.id === modifiedBook.id;
    }
    // Find the index of the modifiedBook in state's books array
    let modifiedBookIndex = this.state.books.findIndex(findMatchingBookId);

    // The new shelf to move the modifiedBook onto should be the shelf
    // that the user clicked on
    let newShelf = event.target.value;

    // Get the current books array from the state and change the shelf of
    // the modifiedBook in this array
    let newBooks = this.state.books;
    newBooks[modifiedBookIndex].shelf = newShelf;

    // Update the state with the newBooks array in order to reflect the
    // modifiedBook's new shelf value
    this.setState((state) => ({
      books: newBooks
    }));
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <Library
            books={this.state.books}
            onMoveBookToNewShelf={this.moveBookToNewShelf}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
