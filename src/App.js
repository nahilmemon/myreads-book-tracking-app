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

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <Library books={this.state.books} />
        )}
      </div>
    )
  }
}

export default BooksApp
