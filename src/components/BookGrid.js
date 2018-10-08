import React, { Component } from 'react';
import Book from './Book.js';

class BookGrid extends Component {
  render() {
    return (
      <ol className="books-grid">
        <Book />
        <Book />
      </ol>
    );
  }
}

export default BookGrid