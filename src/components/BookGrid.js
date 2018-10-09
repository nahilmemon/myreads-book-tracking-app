import React, { Component } from 'react';
import Book from './Book.js';

class BookGrid extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map((book) => (
          <Book
            key={book.id}
            book={book}
            onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
          />
        ))}
      </ol>
    );
  }
}

export default BookGrid