import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorPage extends Component {
  render() {
    return (
      <main className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="error-message">
          <p>Sorry, but this page does not exist. Would you like to return to: </p>
          <Link
            to='/'
            aria-label="Go back to homepage"
          >Homepage</Link>
          <Link
            to="/search"
            aria-label="Search for more books to add to your shelves"
          >Search Books</Link>
        </div>
      </main>
    );
  }
}

export default ErrorPage;