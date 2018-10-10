import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class BookModal extends Component {


  render() {
    const showHideClassName = this.props.show ? "modal modal-effect modal-show" : "modal modal-effect";

    return (
      <div>
        <section className={showHideClassName}>
          {/* Modal Contents */}
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <button
                className="button-close-modal"
                onClick={this.props.handleCloseModal}
              >×</button>
              <h2 className="modal-heading">Book Details</h2>
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
        <div
          className="modal-overlay"
          onClick={this.props.handleCloseModal}
        ></div>
      </div>
    );
  }
}

export default BookModal