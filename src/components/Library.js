import React, { Component } from 'react';
import Bookshelf from './Bookshelf.js';

class Library extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title="Currently Reading"
              shelf="currentlyReading"
              books={this.props.books.filter((book) => (
                book.shelf === "currentlyReading"
              ))}
            />
            <Bookshelf
              title="Want to Read"
              shelf="wantToRead"
              books={this.props.books.filter((book) => (
                book.shelf === "wantToRead"
              ))}
            />
            <Bookshelf
              title="Read"
              shelf="read"
              books={this.props.books.filter((book) => (
                book.shelf === "read"
              ))}
            />
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    );
  }
}

export default Library