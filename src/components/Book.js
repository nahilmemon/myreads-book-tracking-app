import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import BookModal from './BookModal.js';

class Book extends Component {
  state = {
    shelf: '',
    shouldShowModal: false
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBookToNewShelf: PropTypes.func.isRequired,
    displayShelfIcon: PropTypes.bool.isRequired
  }

  componentDidMount() {
    BooksAPI.get(this.props.book.id)
      .then((results) => {
        this.setState({
          shelf: results.shelf
        });
      });
  }

  // Toggle the ability to scroll the page content
  toggleScrollingAbility = () => {
    document.querySelector('html').classList.toggle('disable-scrolling');
  }

  // Reveal the modal and disable scrolling the background
  showModal = () => {
    this.setState({ shouldShowModal: true });
    this.toggleScrollingAbility();
    // Hide background content from screen readers that don't support aria-modal
    document.querySelector('#root').setAttribute('aria-hidden', true);
  }

  // Hide the modal and enable scrolling the background
  hideModal = () => {
    this.setState({ shouldShowModal: false });
    this.openModalButton.focus();
    this.toggleScrollingAbility();
    // Reveal background content to screen readers that don't support aria-modal
    document.querySelector('#root').removeAttribute('aria-hidden');
  }

  // Format the string displaying the names of the authors of the book
  // according to how many authors were found
  formatAuthors() {
    // Get the authors array
    let authorsArray = this.props.book.authors;
    // To store the final, desired string displaying all the author names
    let authorsString = '';

    if (authorsArray === undefined) {
      authorsString = 'Unknown authors'
    } else if (authorsArray.length === 1) {
      authorsString = authorsArray[0]
    } else if (authorsArray.length === 2) {
      authorsString = `${authorsArray[0]} and ${authorsArray[1]}`
    } else {
      for (let i=0; i<authorsArray.length-1; i++) {
        authorsString += `${authorsArray[i]}, `;
      }
      authorsString += `and ${authorsArray[authorsArray.length-1]}`
    }

    return authorsString;
  }

  // Determine the thumbnail URL. If the book doesn't have one, then
  // use a default missing cover thumbnail image.
  determineThumbnail() {
    if (this.props.book.imageLinks && this.props.book.imageLinks.smallThumbnail) {
      return `${this.props.book.imageLinks.smallThumbnail}`;
    } else {
      return `${process.env.PUBLIC_URL + '/images/missing-thumbnail.PNG'}`;
    }
  }

  render() {
    // Determine which shelf the book is on
    let shelfValue;
    if (this.state.shelf === undefined) {
      shelfValue = 'none';
    } else {
      shelfValue = this.state.shelf;
    }
    // Determine whether to display the shelf icon, and if so,
    // determine which icon to display.
    let shelfIcon;
    if (this.props.displayShelfIcon === true) {
      if (this.state.shelf === 'currentlyReading') {
        shelfIcon = <div className="book-shelf-icon">C</div>;
      } else if (this.state.shelf === 'wantToRead') {
        shelfIcon = <div className="book-shelf-icon">W</div>;
      } else if (this.state.shelf === 'read') {
        shelfIcon = <div className="book-shelf-icon">R</div>;
      } else {
        shelfIcon = '';
      }
    } else {
      shelfIcon = '';
    }

    // Determine whether to display the modal
    let modal;
    if (this.state.shouldShowModal === true) {
      modal = <BookModal
        show={this.state.shouldShowModal}
        handleCloseModal={this.hideModal}
      >
        <p>Modal</p>
        <p>Data</p>
      </BookModal>;
    } else {
      modal = '';
    }

    return (
      <li>
        <button
          type="button"
          onClick={this.showModal}
          ref={node => this.openModalButton = node}
          >
          open
        </button>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${this.determineThumbnail()}")` }}></div>
            <div className="book-shelf-changer">
              <select
                value={shelfValue}
                onChange={(event) => this.props.onMoveBookToNewShelf(this.props.book, event.target.value)}
              >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
            {shelfIcon}
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.formatAuthors()}</div>
        </div>
        {modal}
      </li>
    );
  }
}

export default Book
