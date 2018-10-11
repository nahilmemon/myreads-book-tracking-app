import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class BookModal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDownEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDownEvent);
  }

  handleKeyDownEvent = (event) => {
    if (event.key === 'Escape') {
      this.props.handleCloseModal();
    }
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
          className={showHideClassName}>
          {/* Modal Contents */}
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <button
                aria-label="Close Modal"
                className="button-close-modal"
                onClick={this.props.handleCloseModal}
              >×</button>
              <h2
                className="modal-heading"
                id="modal-heading"
                >Book Details</h2>
            </div>
            {/* Body */}
            <div className="modal-body">
              <h3 className="modal-subheading">Story</h3>
              <p>Blabbibity bla...</p>
              <h3 className="modal-subheading">How to Play</h3>
              <p>More bla...</p>
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