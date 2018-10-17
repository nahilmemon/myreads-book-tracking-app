/* Note: Modal CSS and JS inspired by
  - https://tympanus.net/Development/ModalWindowEffects/
  - https://alligator.io/react/modal-component/
  - https://assortment.io/posts/accessible-modal-component-react-portals-part-1
  - https://github.com/udacity/ud891/tree/gh-pages/lesson5-semantics-aria/21-dialog
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ShelfSelect from './ShelfSelect.js';

export class BookModal extends Component {
  state = {
    firstTabStopInModal: '',
    lastTabStopInModal: ''
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    onMoveBookToNewShelf: PropTypes.func.isRequired,
    toggleShelfDropdownFocus: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    thumbnail: PropTypes.string.isRequired
  }

  componentDidMount() {
    this._isMounted = true;
    document.addEventListener('keydown', this.handleKeyDownEvent);
    this.findFocusableElementsWithinModal();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDownEvent);
    this._isMounted = false;
  }

  // To handle keydown events while the modal is open
  handleKeyDownEvent = (event) => {
    // Close the modal if the user presses the ESCAPE key
    if (event.key === 'Escape') {
      this.props.handleCloseModal();
    }

    // Trap the focus within the modal if the user presses
    // the TAB or SHIFT + TAB keys
    if (event.key === "Tab") {
      // Case: SHIFT + TAB keys
      if (event.shiftKey) {
        if (document.activeElement === this.state.firstTabStopInModal) {
          event.preventDefault();
          this.state.lastTabStopInModal.focus();
        }
      // Case: TAB key
      } else {
        if (document.activeElement === this.state.lastTabStopInModal) {
          event.preventDefault();
          this.state.firstTabStopInModal.focus();
        }
      }
    }
  }

  // Find all the focusable elements within the modal
  findFocusableElementsWithinModal() {
    // Find all focusable children
    let potentiallyFocusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElementsWithinModal = this.modalRef.querySelectorAll(potentiallyFocusableElementsString);
    // Convert NodeList to Array
    focusableElementsWithinModal = Array.prototype.slice.call(focusableElementsWithinModal);

    let firstTabStopInModal = focusableElementsWithinModal[0];
    let lastTabStopInModal = focusableElementsWithinModal[focusableElementsWithinModal.length - 1];

    if (this._isMounted === true) {
      this.setState({
        firstTabStopInModal: firstTabStopInModal,
        lastTabStopInModal: lastTabStopInModal
      });
    }
  }

  // Format content to display in the modal, especially in case some
  // information is missing
  // Format a simple string
  formatString(stringInfo) {
    if (stringInfo) {
      return stringInfo;
    } else {
      return 'Unknown';
    }
  }

  // Format an array into a grammatically correct string of values from the array
  formatArray(arrayInfo) {
    // To store the final, desired string displaying all the author names
    let stringInfo = '';

    if (arrayInfo === undefined) {
      stringInfo = 'Unknown'
    } else if (arrayInfo.length === 1) {
      stringInfo = arrayInfo[0]
    } else if (arrayInfo.length === 2) {
      stringInfo = `${arrayInfo[0]} and ${arrayInfo[1]}`
    } else {
      for (let i=0; i<arrayInfo.length-1; i++) {
        stringInfo += `${arrayInfo[i]}, `;
      }
      stringInfo += `and ${arrayInfo[arrayInfo.length-1]}`
    }

    return stringInfo;
  }
  // Format subtitle
  formatSubtitle() {
    if (this.props.book.subtitle) {
      return (
        <h3
          className="modal-heading">
          {this.props.book.subtitle}
        </h3>
      );
    }
  }

  // Format published date into a nicer to read format
  formatPublishedDate() {
    // Only format the published date if one is available
    if (this.props.book.publishedDate) {
      // Split up the published date. Using the length of this array,
      // figure out how much information to display in the final, newly
      // formated date
      let publishedDateSplitUp = this.props.book.publishedDate.split('-');
      // Convert the published date into a date object
      let publishedDate = new Date(this.props.book.publishedDate);
      // To store the date formatting options based on how information is available
      let dateFormattingOptions;
      // Show only the year
      if (publishedDateSplitUp.length === 1) {
        dateFormattingOptions = {
          year: 'numeric'
        };
      }
      // Show the month and year
      else if (publishedDateSplitUp === 2) {
        dateFormattingOptions = {
          year: 'numeric',
          month: 'short'
        };
      }
      // Show the day, month, and year
      else {
        dateFormattingOptions = {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        };
      }
      // Convert and return the date
      return publishedDate.toLocaleString('en-us', dateFormattingOptions);
    }
  }

  // Format maturity rating from snake case to normal text
  formatMaturityRating() {
    if (this.props.book.maturityRating) {
      let newString = this.props.book.maturityRating.toLowerCase().split('_');
      for (let i=0; i < newString.length; i++) {
        newString[i] = newString[i].charAt(0).toUpperCase() + newString[i].slice(1);
      }
      return newString.join(' ');
    } else {
      return 'Unknown';
    }
  }

  // Format preview book link
  formatPreviewLink() {
    if (this.props.book.previewLink) {
      return (
        <a
          href={this.props.book.previewLink}
          aria-label={`Preview ${this.props.book.title} at Google Books`}
          className="book-link book-link-preview">
          <img
            className="book-link-preview"
            src={`${process.env.PUBLIC_URL + '/images/google-books-preview.png'}`}
            alt={`Preview ${this.props.book.title} at Google Books`}
          />
        </a>
      );
    }
  }

  // Format buy book link
  formatBuyLink() {
    if (this.props.book.infoLink) {
      return (
        <a
          href={this.props.book.infoLink}
          aria-label={`Buy ${this.props.book.title} from Google Play Store`}
          className="book-link book-link-buy">
          <img
            className="book-link-buy"
            src={`${process.env.PUBLIC_URL + '/images/google-play-badge.png'}`}
            alt={`Buy ${this.props.book.title} from Google Play Store`}
          />
        </a>
      );
    }
  }

  render() {
    // Determine whether to show modal using CSS
    let showHideClassName;
    if (this.props.show) {
      showHideClassName = "modal modal-effect modal-show";
    } else {
      showHideClassName = "modal modal-effect";
    }

    // Use ReactDOM.createPortal to append the modal to the end of the DOM
    // in order to maintain a logical DOM order
    return ReactDOM.createPortal(
      (<div
        onKeyDown={(e) => this.handleKeyDownEvent(e)}
        tabIndex="0">
        {/* Modal */}
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-heading"
          className={showHideClassName}
          ref={node => this.modalRef = node}>
          {/* Modal Contents */}
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h2
                className="modal-heading"
                id="modal-heading">
                {this.props.book.title}
              </h2>
              {this.formatSubtitle()}
              <button
                aria-label="Close Modal"
                className="button-close-modal"
                onClick={this.props.handleCloseModal}
                ref={closeModalButton => closeModalButton && closeModalButton.focus()}>
                ×
              </button>
            </div>
            {/* Body */}
            <div className="modal-body">
              <dl className="modal-book-overview">
                <dt>Written By: </dt>
                <dd>{this.formatArray(this.props.book.authors)}</dd>
                <dt>Date Published: </dt>
                <dd>{this.formatPublishedDate()}</dd>
                <dt>Publisher: </dt>
                <dd>{this.formatString(this.props.book.publisher)}</dd>
                <dt>Categories: </dt>
                <dd>{this.formatArray(this.props.book.categories)}</dd>
                <dt>No. of Pages: </dt>
                <dd>{this.formatString(this.props.book.pageCount)}</dd>
                <dt>Age Rating: </dt>
                <dd>{this.formatMaturityRating()}</dd>
                <dt>Shelf: </dt>
                <dd>
                  <ShelfSelect
                    isParentBook={false}
                    book={this.props.book}
                    onMoveBookToNewShelf={this.props.onMoveBookToNewShelf}
                    redirectShelfDropdownFocus={false}
                    toggleShelfDropdownFocus={this.props.toggleShelfDropdownFocus}
                  />
                </dd>
              </dl>
              <img
                src={this.props.thumbnail}
                className="modal-book-thumbnail"
                alt={`${this.props.book.title} book cover`}
              />
              <div className="modal-book-minor-details">
                {/* Only display the description content if there's a description
                to display*/}
                {this.props.book.description &&
                  <h3 className="modal-subheading">Description</h3>
                }
                {this.props.book.description &&
                  <p>{this.formatString(this.props.book.description)}</p>
                }
                {this.formatPreviewLink()}
                {this.formatBuyLink()}
              </div>
            </div>
          </div>
        </section>
        {/* Modal Overlay */}
        <div
          className="modal-overlay"
          onClick={this.props.handleCloseModal}>
        </div>
      </div>),
      document.body
    );
  }
}

export default BookModal;