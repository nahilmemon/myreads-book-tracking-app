import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book.js';

function BookGrid(props) {
  // Display the books if they have been loaded
  if (props.areBooksLoaded) {
    return (
      <ol className="books-grid">
        {props.books.map((book) => (
          <Book
            key={book.id}
            book={book}
            onMoveBookToNewShelf={props.onMoveBookToNewShelf}
            displayShelfIcon={props.displayShelfIcon}
            page={props.page}
          />
        ))}
      </ol>
    );
  }
  // Otherwise, display a loading gif
  else {
    // Note: this loading gif was taken from:
    // https://www.behance.net/gallery/31234507/Open-source-Loading-GIF-Icons-Vol-1
    return (
      <img
        className="message loading-gif"
        src={`${process.env.PUBLIC_URL + '/images/loading2.gif'}`}
        alt="Retrieving your books..." />
    );
  }
}

BookGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  onMoveBookToNewShelf: PropTypes.func.isRequired,
  displayShelfIcon: PropTypes.bool.isRequired,
  areBooksLoaded: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired
}

export default BookGrid;