import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book.js';

class BookGrid extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object),
    onMoveBookToNewShelf: PropTypes.func.isRequired,
    displayShelfIcon: PropTypes.bool.isRequired
  }

  render() {
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
  }
}

export default BookGrid