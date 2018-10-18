import React from 'react';
import PropTypes from 'prop-types';
import BookGrid from './BookGrid.js';

function Bookshelf(props) {
  return (
    <section className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      {props.books.length <= 0 && props.areLibraryBooksLoaded ? (
        <p className="message">Shelf is empty</p>
      ) : (
        <BookGrid
          className="bookshelf-books"
          books={props.books}
          onMoveBookToNewShelf={props.onMoveBookToNewShelf}
          areBooksLoaded={props.areLibraryBooksLoaded}
          displayShelfIcon={props.displayShelfIcon}
          page={props.page}
        />
      )}
    </section>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMoveBookToNewShelf: PropTypes.func.isRequired,
  shelf: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  displayShelfIcon: PropTypes.bool.isRequired,
  areLibraryBooksLoaded: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired
}

export default Bookshelf;