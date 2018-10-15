import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import sortBy from 'sort-by';
import debounce from 'lodash.debounce';
import * as BooksAPI from '../BooksAPI';
import BookGrid from './BookGrid.js';

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
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

  componentWillUnmount() {
    this.searchBooksDebounced.cancel();
    this.clearQuery();
  }

  // Update the state's query and search for books accordingly
  updateQuery = (query) => {
    // Change the state's query value to match the given query
    this.setState({
      query: query,
      areSearchResultsBooksLoaded: false
    });
    // Search for books that match this query
    this.searchBooksDebounced(query);
  }

  // Clear the state's query value
  clearQuery = () => {
    this.setState({
      query: '',
      bookResults: []
    });
  }

  // Use the BooksAPI to search for books matching the given query.
  // Update the state's bookResults array with the results found.
  searchBooks = (query) => {
    // If the query is empty, then empty the bookResults array
    if (!query) {
      this.setState({
        bookResults: [],
        areSearchResultsBooksLoaded: true
      });
    }
    // Else if the query isn't empty, then try fetching the
    // books that match the query using the BooksAPI
    else {
      // Fetch all the books using the API
      BooksAPI.search(query)
        // Update the state with the retrieved books array
        .then((results) => {
          // If results were found, then change the bookResults array to match
          // the results found
          if (results.length) {
            this.setState({
              bookResults: results,
              areSearchResultsBooksLoaded: true
            });
          }
          // Else empty the bookResults array to indicate no results found
          else {
            this.setState({
              bookResults: [],
              areSearchResultsBooksLoaded: true
            });
          }
        })
        // Catch any errors during the process
        .catch((error) => {
          console.log('Searching query (', query, ') error: ', error)
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
          books={this.state.bookResults}
          onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
          areBooksLoaded={this.state.areSearchResultsBooksLoaded}
          displayShelfIcon={this.state.displayShelfIcon}
        />);
      }
      // Case A2: the user searched for something and no search results were found
      else if (this.state.query !== '') {
        searchResults = <p className="no-search-results-message">No results found</p>;
      }
      // Case A3: the user didn't search for anything
      else {
        searchResults = '';
      }
    }
    // Case B: If the search isn't complete, display loading state
    else {
      searchResults = <p className="no-search-results-message">Finding books...</p>;
    }

    return (
      <main className="search-books">
        <form role="search" className="search-books-bar">
          <Link
            to='/'
            className="close-search"
            aria-label="Go back to main page"
          >Close Search</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="search"
              placeholder="Search books by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
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

export default SearchBooks