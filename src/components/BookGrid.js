import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book.js';

class BookGrid extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object),
    onMoveBookToNewShelf: PropTypes.func.isRequired,
    displayShelfIcon: PropTypes.bool.isRequired,
    areBooksLoaded: PropTypes.bool.isRequired
  }

  render() {
    if (this.props.areBooksLoaded) {
      return (
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <Book
              key={book.id}
              book={book}
              onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
              displayShelfIcon={this.props.displayShelfIcon}
            />
          ))}
        </ol>
      );
    } else {
      return (
        <p className="message">Waiting for books to load...</p>
      );
    }
  }
}

export default BookGrid