import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookGrid from './BookGrid.js';

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMoveBookToNewShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    displayShelfIcon: PropTypes.bool.isRequired,
    areLibraryBooksLoaded: PropTypes.bool.isRequired
  }

  render() {
    return (
      <section className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <BookGrid
          className="bookshelf-books"
          books={this.props.books}
          onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
          areBooksLoaded={this.props.areLibraryBooksLoaded}
          displayShelfIcon={this.props.displayShelfIcon}
        />
      </section>
    );
  }
}

export default Bookshelf