import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './bestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/books`).then(res => {
      this.setState({
        books: res.data,
      });
      console.log('Hi :)');
      console.log('This is what you got', res.data);
    }).catch(error => {
      console.log('error');
      console.log(error);
    });
  }

  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block"
                  src={this.state.books[0].image}
                  alt="slide"
                />
                <Carousel.Caption>
                  <h3>{this.state.books[0].title}</h3>
                  <p>Book Description: {this.state.books[0].description}</p>
                  <p>Book Status: {this.state.books[0].status}</p>
                  <p>Email: {this.state.books[0].email}</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block"
                  src={this.state.books[1].image}
                  alt="slide"
                />
                <Carousel.Caption>
                  <h3>{this.state.books[1].title}</h3>
                  <p>Book Description: {this.state.books[1].description}</p>
                  <p>Book Status: {this.state.books[1].status}</p>
                  <p>Email: {this.state.books[1].email}</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block"
                  src={this.state.books[2].image}
                  alt="slide"
                />
                <Carousel.Caption>
                  <h3>{this.state.books[2].title}</h3>
                  <p>Book Description: {this.state.books[2].description}</p>
                  <p>Book Status: {this.state.books[2].status}</p>
                  <p>Email: {this.state.books[2].email}</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
