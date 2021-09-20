import React from 'react';
import axios from 'axios';
import { Carousel, Button, Alert } from 'react-bootstrap';
import BookFormModal from './components/BookFormModal';
import './bestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksList: [],
      showModal: false,
      errorMsg: false,
      newBookInput: {
        title: '',
        description: '',
        image: '',
        status: '',
        email: ''
      }
    }
  }

  // Getting the list

  componentDidMount = () => {
    //`${process.env.REACT_APP_API_URL}/books`
    
    axios.get('https://can-of-books-h.herokuapp.com/books').then(res => {
      this.setState({
        booksList: res.data,
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        errorMsg: true,
      });
    });
  }

  //Modal Methods:

  modalHandleOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  handleDCmodalOpen = () => {
    this.setState({
      showDCModal: true,
    });
  };

  modalHandleClose = (e) => {
    this.setState({
      showModal: false,
      showDCModal: false
    });
  };

  // Form inputs:
  handleChangingInput = (e) => {
    this.setState({
      // newBookInput: {
      //   title: e.target.value,
      //   description: e.target.value,
      //   image: e.target.value,
      //   status: e.target.value,
      //   email: e.target.value
      // }
      newBookInput: {
        ...this.state.newBookInput,
        [e.target.name]: e.target.value,
      }
    });
  }

  //Adding a book (POST Request):
  handleAddBook = (e) => {
    e.preventDefault();
    let config = {
      method: "POST",
      // baseURL: `${process.env.REACT_APP_API_URL}`,
      baseURL: 'https://can-of-books-h.herokuapp.com',
      url: '/add-book',
      data: this.state.newBookInput
    }
    axios(config).then(res => {
      // this.state.push(res.data);
      this.setState({
        booksList: [
          ...this.state.booksList,
          res.data
        ],
        showModal: false,
        showDCModal: false
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        errorMsg: true,
      });
    });
  }

  //Deleting books:
  handleBookDelete = (id) => {
    let bookID = id;
    console.log(bookID);
    let config = {
      method: "DELETE",
      // baseURL: `${process.env.REACT_APP_API_URL}`,
      baseURL: 'https://can-of-books-h.herokuapp.com',
      url: `/delete-book/${bookID}`,
    };
    axios(config).then(res => {
      this.setState({
        booksList: res.data
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        errorMsg: true,
      });
    });
    console.log(bookID);
  }

  render() {
    return (
      <>
        <br /><br />
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <br/>
        <Button centered variant="success" onClick={this.modalHandleOpen}>Add a Book</Button>
        {this.state.booksList.length ? (
          <>
            <br /><br /><br />
            <Carousel>
              {this.state.booksList.map((book) => (
                <Carousel.Item interval={10000}>
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
                    <Button variant="danger" onClick={()=>this.handleBookDelete(book._id)}>Remove This Book</Button>

                  </Carousel.Caption>
                </Carousel.Item>))}
            </Carousel>
            <br /><br /><br />
          </>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        {this.state.showModal && <BookFormModal showModal={this.state.showModal} closeModal={this.modalHandleClose} changeInput={this.handleChangingInput} addBook={this.handleAddBook} />}
        {this.state.errorMsg && <Alert> Sadly, an error has occurred :(</Alert>} 
      </>
    )
  }
}

export default BestBooks;
