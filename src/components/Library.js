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

  render() {
    return (
      <main className="list-books">
        <a href="searchButtonContainer" className="skip-link">Skip to Add Books Button</a>
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
            />
        </div>
        <div className="open-search" id="searchButtonContainer">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </main>
    );
  }
}

export default Library