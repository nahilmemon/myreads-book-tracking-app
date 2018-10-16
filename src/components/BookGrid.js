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
              page={this.props.page}
            />
          ))}
        </ol>
      );
    } else {
      return (
        <img
          className="message loading-gif"
          src={`${process.env.PUBLIC_URL + '/images/loading2.gif'}`}
          alt="Retrieving your books..." />
      );
    }
  }
}

export default BookGrid