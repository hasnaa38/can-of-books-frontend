import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './bestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksList: []
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/books`).then(res => {
      this.setState({
        booksList: res.data,
      });
    }).catch(error => {
      console.log('error');
      console.log(error);
    });
  }

  render() {
    return (
      <>
      <br/><br/>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        {this.state.booksList.length ? (
          <>
          <br/><br/><br/>
          <Carousel>
            {this.state.booksList.map((book) => (
                <Carousel.Item interval={1000}>
                  <img
                    className=" w-100"
                    src={book.image}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                    <p>Book Status: {book.status}</p>
                    <p>Book ID: {book._id}</p>
                    <p>email: {book.email}</p>
                  </Carousel.Caption>
                </Carousel.Item>))}
            </Carousel>
            <br/><br/><br/>
          </>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
