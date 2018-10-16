import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShelfSelect extends Component {
  state = {
    isLoaded: true,
    shelfIcon: ''
  }

  static propTypes = {
    isParentBook: PropTypes.bool.isRequired,
    book: PropTypes.object.isRequired,
    shelfValue: PropTypes.string.isRequired,
    onMoveBookToNewShelf: PropTypes.func.isRequired,
    redirectShelfDropdownFocus: PropTypes.bool.isRequired,
    toggleShelfDropdownFocus: PropTypes.func.isRequired,
    isShelfDropdownFocused: PropTypes.bool,
    displayShelfIcon: PropTypes.bool.isRequired,
    page: PropTypes.string.isRequired,
    getShelfOfBook: PropTypes.func.isRequired
  }

  componentDidMount() {
    // If the user is on the search page, then make the dropdowns look like
    // they're loading until the shelf information for the corresponding
    // book has been retrieved
    if (this.props.page === 'search') {
      this.setState ({ isLoaded: false});
      this.props.getShelfOfBook()
        .then(() => {
          this.setState ({
            isLoaded: true,
            shelfIcon: this.determineShelfIcon(this.props.shelfValue)
          });
        });
    }
  }

  // Determine whether to display the shelf icon, and if so,
  // determine which icon to display.
  determineShelfIcon = (shelf) => {
    let shelfIcon;
    if (this.props.displayShelfIcon === true) {
      if (shelf === 'currentlyReading') {
        shelfIcon = <div className="book-shelf-icon">C</div>;
      } else if (shelf === 'wantToRead') {
        shelfIcon = <div className="book-shelf-icon">W</div>;
      } else if (shelf === 'read') {
        shelfIcon = <div className="book-shelf-icon">R</div>;
      } else {
        shelfIcon = '';
      }
    } else {
      shelfIcon = '';
    }
    return shelfIcon;
  }

  moveBookToNewShelf = (modifiedBook, newShelf) => {
    // Reset loading state
    this.setState({ isLoaded: false });
    // Move book to new shelf using the Books API
    this.props.onMoveBookToNewShelf(modifiedBook, newShelf).then(() => {
      this.setState({
        isLoaded: true,
        shelfIcon: this.determineShelfIcon(newShelf)
      });
    });
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
        <React.Fragment>
          <div className={bookShelfChangerIconClasses}>
            {select}
          </div>
          {this.state.shelfIcon}
        </React.Fragment>
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
