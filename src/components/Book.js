import React, { Component } from 'react';

class Book extends Component {
  formatAuthors() {
    let authorsArray = this.props.book.authors;
    let authorsString = '';

    if (authorsArray.length === 0) {
      authorsString = 'No authors known'
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

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${this.props.book.imageLinks.smallThumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select
                value={this.props.book.shelf}
                onChange={(event) => this.props.onMoveBookToNewShelf(this.props.book, event)}
              >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.formatAuthors()}</div>
        </div>
      </li>
    );
  }
}

export default Book
