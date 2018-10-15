import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShelfSelect extends Component {
  state = {
    isLoaded: true
  }

  static propTypes = {
    isParentBook: PropTypes.bool.isRequired,
    book: PropTypes.object.isRequired,
    shelfValue: PropTypes.string.isRequired,
    onMoveBookToNewShelf: PropTypes.func.isRequired,
    redirectShelfDropdownFocus: PropTypes.bool.isRequired,
    toggleShelfDropdownFocus: PropTypes.func.isRequired,
    isShelfDropdownFocused: PropTypes.bool
  }

  moveBookToNewShelf = (modifiedBook, newShelf) => {
    // Reset loading state
    this.setState({ isLoaded: false });
    // Move book to new shelf using the Books API
    this.props.onMoveBookToNewShelf(modifiedBook, newShelf);
  }

  render() {
    let select = (<select
      value={this.props.shelfValue}
      onChange={(event) => this.moveBookToNewShelf(this.props.book, event.target.value)}
      onFocus={this.props.redirectShelfDropdownFocus ? this.props.toggleShelfDropdownFocus : null}
      onBlur={this.props.redirectShelfDropdownFocus ? this.props.toggleShelfDropdownFocus : null}
      name="Move book to shelf: "
      aria-label={`Move book ${this.props.book.title} to shelf: `}>
      {/*<option value="move" disabled>Move to...</option>*/}
      <optgroup label="Move book to shelf: ">
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </optgroup>
    </select>);

    let bookShelfChangerIconClasses;
    // If there has been a change in the loading state, then display a loading icon
    if (!this.state.isLoaded) {
      if (this.props.isShelfDropdownFocused) {
        bookShelfChangerIconClasses = 'book-shelf-changer focus-book-shelf-changer-loading';
      } else {
        bookShelfChangerIconClasses = 'book-shelf-changer book-shelf-changer-loading';
      }
    } else {
      if (this.props.isShelfDropdownFocused) {
        bookShelfChangerIconClasses = 'book-shelf-changer focus-book-shelf-changer';
      } else {
        bookShelfChangerIconClasses = 'book-shelf-changer';
      }
    }

    // If this component belongs in the book, then render the fancy dropdown icon
    // and the <select>
    if (this.props.isParentBook) {
      return (
        <div className={bookShelfChangerIconClasses}>
          {select}
        </div>
      );
    }
    // If this component belongs in the modal, then only render the <select>
    else {
      return (
        select
      );
    }
  }
}

export default ShelfSelect;
