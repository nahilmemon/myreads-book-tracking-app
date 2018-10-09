import React, { Component } from 'react';
import BookGrid from './BookGrid.js';

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BookGrid
            books={this.props.books}
            onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
          />
        </div>
      </div>
    );
  }
}

export default Bookshelf