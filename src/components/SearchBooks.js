import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import debounce from 'lodash.debounce';
import * as BooksAPI from '../BooksAPI';
import BookGrid from './BookGrid.js';

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
    // Add debouncing the searchBooks function
    this.searchBooksDebounced = debounce(this.searchBooks, 250);
  }

  state = {
    query: '',
    bookResults: [],
    displayShelfIcon: true,
    areSearchResultsBooksLoaded: true
  }

  static propTypes = {
    onMoveBookToNewShelf: PropTypes.func.isRequired
  }

  componentDidMount() {
    this._isMounted = true;
    document.addEventListener('keydown', this.preventFormSubmission);
  }

  componentWillUnmount() {
    this.searchBooksDebounced.cancel();
    this.clearQuery();
    document.removeEventListener('keydown', this.preventFormSubmission);
    this._isMounted = false;
  }

  // If the user pressed 'Enter' while in the search input,
  // then prevent the page from reloading and clearing the search results
  preventFormSubmission = (event) => {
    if (event.key === 'Enter' && event.target === this.searchInputRef) {
      event.preventDefault();
    }
  }

  // Update the state's query and search for books accordingly
  updateQuery = (query) => {
    // Change the state's query value to match the given query
    if (this._isMounted === true) {
      this.setState({
        query: query,
        areSearchResultsBooksLoaded: false
      });
    }
    // Search for books that match this query
    this.searchBooksDebounced(query);
  }

  // Clear the state's query value
  clearQuery = () => {
    if (this._isMounted === true) {
      this.setState({
        query: '',
        bookResults: []
      });
    }
  }

  // Given an array of books without shelf information,
  // figure out the shelf information by comparing the books in this array
  // with the books stored in the library
  determineBookshelves = (booksWithoutShelves) => {
    return booksWithoutShelves.map((bookWithoutShelf) => {
      // Try to see if the bookWithoutShelf is present in the libraryBooks
      let booksWithShelf = this.props.libraryBooks.filter((libraryBook) => {
        return libraryBook.id === bookWithoutShelf.id;
      });
      // If the resulting array has a book in it, then set the shelf of
      // bookWithoutShelf to match with the shelf of the book in the
      // resulting array
      if (booksWithShelf.length > 0) {
        bookWithoutShelf.shelf = booksWithShelf[0].shelf;
      }
      // Otherwise, set the shelf of the bookWithoutShelf to none
      else {
        bookWithoutShelf.shelf = "none";
      }
      return bookWithoutShelf;
    });
  }

  // Use the BooksAPI to search for books matching the given query.
  // Update the state's bookResults array with the results found.
  searchBooks = (query) => {
    // If the query is empty, then empty the bookResults array
    if (!query) {
      if (this._isMounted === true) {
        this.setState({
          bookResults: [],
          areSearchResultsBooksLoaded: true
        });
      }
    }
    // Else if the query isn't empty, then try fetching the
    // books that match the query using the BooksAPI
    else {
      // Fetch all the books using the API
      BooksAPI.search(query)
        .catch((error) => {
          console.log('Searching query (', query, ') error: ', error)
        })
        // Update the state with the retrieved books array
        .then((results) => {
          // If results were found, then change the bookResults array to match
          // the results found
          if (results.length) {
            // First modify the results to include the shelf information too
            let resultsWithShelves = this.determineBookshelves(results);
            // Then update the state's bookResults with these modfied results
            if (this._isMounted === true) {
              this.setState({
                bookResults: resultsWithShelves,
                areSearchResultsBooksLoaded: true
              });
            }
          }
          // Else empty the bookResults array to indicate no results found
          else {
            if (this._isMounted === true) {
              this.setState({
                bookResults: [],
                areSearchResultsBooksLoaded: true
              });
            }
          }
        })
        // Catch any errors during the process
        .catch((error) => {
          console.log('Cannot find shelves error: ', error)
        });
    }
  }

  render() {
    // Determine what to display in the search results based on the query and
    // the bookResults found
    let searchResults;
    // Case A: If the search is complete, display the search results
    if (this.state.areSearchResultsBooksLoaded) {
      // Case A1: the user searched for something and search results were found
      if (this.state.bookResults && this.state.bookResults.length > 0) {
        searchResults = (<BookGrid
          books={this.state.bookResults.sort(sortBy('title'))}
          onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
          areBooksLoaded={this.state.areSearchResultsBooksLoaded}
          displayShelfIcon={this.state.displayShelfIcon}
          page="search"
        />);
      }
      // Case A2: the user searched for something and no search results were found
      else if (this.state.query !== '') {
        searchResults = <p className="message">No results found</p>;
      }
      // Case A3: the user didn't search for anything
      else {
        searchResults = '';
      }
    }
    // Case B: If the search isn't complete, display loading state
    else {
      // Note: this loading gif was taken from:
      // https://www.behance.net/gallery/31234507/Open-source-Loading-GIF-Icons-Vol-1
      searchResults = <img
        className="message loading-gif"
        src={`${process.env.PUBLIC_URL + '/images/loading2.gif'}`}
        alt="Searching for books..." />;
    }

    return (
      <main className="search-books">
        <form role="search" className="search-books-bar">
          <Link
            to='/'
            className="close-search"
            aria-label="Go back to main page">
            Close Search
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="search"
              placeholder="Search books by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              ref={node => this.searchInputRef = node}
            />
          </div>
        </form>
        <section className="search-books-results" aria-label="Search Results">
          {searchResults}
        </section>
      </main>
    );
  }
}

export default SearchBooks;