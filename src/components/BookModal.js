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
    const showHideClassName = this.props.show ? "modal modal-effect modal-show" : "modal modal-effect";

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
              <button
                aria-label="Close Modal"
                className="button-close-modal"
                onClick={this.props.handleCloseModal}
                ref={closeModalButton => closeModalButton && closeModalButton.focus()}
              >×</button>
              <h2
                className="modal-heading"
                id="modal-heading"
                >Book Details</h2>
            </div>
            {/* Body */}
            <div className="modal-body">
              <h3 className="modal-subheading">Story</h3>
              <a href="#">Blabbibity bla...</a>
              <h3 className="modal-subheading">How to Play</h3>
              <a href="#">More bla...</a>
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