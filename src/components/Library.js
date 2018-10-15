import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf.js';

class Library extends Component {
  state = {
    displayShelfIcon: false
  }

  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMoveBookToNewShelf: PropTypes.func.isRequired,
    areLibraryBooksLoaded: PropTypes.bool.isRequired
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleSkipLinkKeyDownEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleSkipLinkKeyDownEvent);
  }

  // If the user pressed 'Enter' on the skip link, then shift focus from the
  // skip link to the search link
  handleSkipLinkKeyDownEvent = (event) => {
    if (event.key === 'Enter' && event.target === this.skipLinkRef) {
      event.preventDefault();
      document.querySelector('#search-link').focus();
    }
  }

  render() {
    return (
      <main className="list-books">
        <a
          href="searchButtonContainer"
          className="skip-link"
          onKeyDown={(e) => this.handleSkipLinkKeyDownEvent(e)}
          ref={node => this.skipLinkRef = node}
        >Skip to Add Books Button</a>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Bookshelf
              title="Currently Reading"
              shelf="currentlyReading"
              books={this.props.books.filter((book) => (
                book.shelf === "currentlyReading"
              ))}
              onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
              areLibraryBooksLoaded={this.props.areLibraryBooksLoaded}
              displayShelfIcon={this.state.displayShelfIcon}
              page="library"
            />
            <Bookshelf
              title="Want to Read"
              shelf="wantToRead"
              books={this.props.books.filter((book) => (
                book.shelf === "wantToRead"
              ))}
              onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
              areLibraryBooksLoaded={this.props.areLibraryBooksLoaded}
              displayShelfIcon={this.state.displayShelfIcon}
              page="library"
            />
            <Bookshelf
              title="Read"
              shelf="read"
              books={this.props.books.filter((book) => (
                book.shelf === "read"
              ))}
              onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
              areLibraryBooksLoaded={this.props.areLibraryBooksLoaded}
              displayShelfIcon={this.state.displayShelfIcon}
              page="library"
            />
        </div>
        <div className="open-search" id="searchButtonContainer">
          <Link
            to="/search"
            id="search-link"
            aria-label="Search for more books to add to your shelves"
          >Add a book</Link>
        </div>
      </main>
    );
  }
}

export default Library