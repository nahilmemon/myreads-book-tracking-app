/* Note: Modal CSS and JS inspired by
  - https://tympanus.net/Development/ModalWindowEffects/
  - https://alligator.io/react/modal-component/
  - https://assortment.io/posts/accessible-modal-component-react-portals-part-1
  - https://github.com/udacity/ud891/tree/gh-pages/lesson5-semantics-aria/21-dialog
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class BookModal extends Component {
  state = {
    firstTabStopInModal: '',
    lastTabStopInModal: ''
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDownEvent);
    this.findFocusableElementsWithinModal();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDownEvent);
  }

  handleKeyDownEvent = (event) => {
    console.log(event);
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

    this.setState({
      firstTabStopInModal: firstTabStopInModal,
      lastTabStopInModal: lastTabStopInModal
    });
  }

  render() {
    // Determine link labels
    const PREVIEW_BOOK_ARIA_LABEL = `Preview ${this.props.book.title} at Google Books`;
    const BUY_BOOK_ARIA_LABEL = `Buy ${this.props.book.title} from Google Play Store`;
    // Determine whether to show modal using CSS
    let showHideClassName;
    if (this.props.show) {
      showHideClassName = "modal modal-effect modal-show";
    } else {
      showHideClassName = "modal modal-effect";
    }

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
              <h3
                className="modal-heading">
                {this.props.book.subtitle}
              </h3>
              <button
                aria-label="Close Modal"
                className="button-close-modal"
                onClick={this.props.handleCloseModal}
                ref={closeModalButton => closeModalButton && closeModalButton.focus()}
              >×</button>
            </div>
            {/* Body */}
            <div className="modal-body">
              <dl className="modal-book-overview">
                <dt>Written By: </dt>
                <dd>{this.props.authors}</dd>
                <dt>Date Published: </dt>
                <dd>{this.props.book.publishedDate}</dd>
                <dt>Publisher: </dt>
                <dd>{this.props.book.publisher}</dd>
                <dt>Categories: </dt>
                <dd>{this.props.book.categories}</dd>
                <dt>Language: </dt>
                <dd>{this.props.book.language}</dd>
                <dt>No. of Pages: </dt>
                <dd>{this.props.book.pageCount}</dd>
                <dt>Age Rating: </dt>
                <dd>{this.props.book.maturityRating}</dd>
                <dt>Shelf: </dt>
                <dd>{this.props.shelfDropdown}</dd>
              </dl>
              <img
                src={this.props.thumbnail}
                className="modal-book-thumbnail"/>
              <div className="modal-book-minor-details">
                <h3 className="modal-subheading">Description</h3>
                <p>{this.props.book.description}</p>
                <a
                  href={this.props.book.previewLink}
                  aria-label={PREVIEW_BOOK_ARIA_LABEL}
                  className="book-link book-link-preview"></a>
                <a
                  href={this.props.book.infoLink}
                  aria-label={BUY_BOOK_ARIA_LABEL}
                  className="book-link book-link-buy"></a>
              </div>
            </div>
          </div>
        </section>
        {/* Modal Overlay */}
        <div
          className="modal-overlay"
          onClick={this.props.handleCloseModal}
        ></div>
      </div>),
      document.body
    );
  }
}

export default BookModal