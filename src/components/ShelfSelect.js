import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShelfSelect extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfValue: PropTypes.string.isRequired,
    onMoveBookToNewShelf: PropTypes.func.isRequired,
    toggleShelfDropdownFocus: PropTypes.func.isRequired
  }

  render() {
    return (
      <select
        value={this.props.shelfValue}
        onChange={(event) => this.props.onMoveBookToNewShelf(this.props.book, event.target.value)}
        onFocus={this.props.toggleShelfDropdownFocus}
        onBlur={this.props.toggleShelfDropdownFocus}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}

export default ShelfSelect;
