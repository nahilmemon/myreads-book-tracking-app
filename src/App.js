import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Library from './components/Library.js';
import SearchBooks from './components/SearchBooks.js';

class BooksApp extends React.Component {
  state = {
    // Store the books belonging to user's library
    books: []
  }

  // Fetch all the books saved in the user's library and update the state
  // with these results
  componentDidMount() {
    // Fetch all the books using the API
    BooksAPI.getAll()
      // Update the state with the retrived books array
      .then((books) => {
        this.setState({ books: books })
      })
      // Catch any errors during the process
      .catch((err) => {
        console.log('Error in updating: ', err)
      });
  }

  // Change the shelf that a book (modifiedBook) is located on to the new
  // shelf that the user clicked on
  moveBookToNewShelf = (modifiedBook, newShelf) => {
    // Update the server with the book's new shelf information
    BooksAPI.update(modifiedBook, newShelf)
      // Catch any errors resulting from trying to update the book's new shelf
      .catch((error) => {
        console.log('Error in updating book-shelf movement: ', error);
      })
      // Then get all the books from the server
      .then(() => {
        BooksAPI.getAll()
          // Catch any errors resulting from getting all the books from the server
          .catch((error) => {
            console.log('Error in retrieving all books: ', error);
          })
          // Then update the state with the newBooks array in order to reflect the
          // modifiedBook's new shelf value
          .then((newBooks) => {
            this.setState({
              books: newBooks
            });
          })
          // Catch any errors resulting from getting all the books from the server
          .catch((error) => {
            console.log('Error in refreshing book state after changing shelves: ', error);
          });
      });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library
            books={this.state.books}
            onMoveBookToNewShelf={this.moveBookToNewShelf}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
            onMoveBookToNewShelf={this.moveBookToNewShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
