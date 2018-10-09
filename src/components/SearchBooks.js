import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import * as BooksAPI from '../BooksAPI';
import BookGrid from './BookGrid.js';

class SearchBooks extends Component {
  state = {
    query: '',
    bookResults: []
  }

  static propTypes = {
    onMoveBookToNewShelf: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    this.clearQuery();
  }

  // Update the state's query and trigger a book search if the query isn't empty
  updateQuery = (query) => {
    // Change the state's query value to match the given query
    this.setState({
      query: query
    });
    // If there is a query, then search for books that match this query
    if (query) {
      this.searchBooks(query);
    }
    // Else if the query is empty, then empty the bookResults array
    else {
      this.setState({
        bookResults: []
      });
    }
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
    // Fetch all the books using the API
    BooksAPI.search(query)
      // Update the state with the retrieved books array
      .then((results) => {
        // If results were found, then change the bookResults array to match
        // the results found
        if (results.length) {
          this.setState({
            bookResults: results
          });
        }
        // Else empty the bookResults array to indicate no results found
        else {
          this.setState({
            bookResults: []
          });
        }
      })
      // Catch any errors during the process
      .catch((err) => {
        console.log('Searching query (', query, ') error: ', err)
      });
  }

  render() {
    // Determine what to display in the search results based on the query and
    // the bookResults found
    let searchResults;
    // Case 1: the user searched for something and search results were found
    if (this.state.bookResults.length) {
      searchResults = (<BookGrid
        books={this.state.bookResults}
        onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
      />);
    }
    // Case 2: the user searched for something and no search results were found
    else if (this.state.query !== '') {
      searchResults = <p className="no-search-results-message">No results found</p>;
    }
    // Case 3: the user didn't search for anything
    else {
      searchResults = '';
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
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
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {searchResults}
        </div>
      </div>
    );
  }
}

export default SearchBooks