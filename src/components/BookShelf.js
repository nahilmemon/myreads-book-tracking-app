import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookGrid from './BookGrid.js';

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBookToNewShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

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