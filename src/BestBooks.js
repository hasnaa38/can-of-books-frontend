import React from 'react';
import axios from 'axios';
import { Carousel, Button, Alert, Row, Col, } from 'react-bootstrap';
import BookFormModal from './components/BookFormModal';
import UpdateBookModal from './components/UpdateBookModal';
import './bestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksList: [],
      showModal: false,
      showUpdateModal: false,
      errorMsg: false,
      newBookInput: {
        title: '',
        description: '',
        image: 'https://wallpaper.dog/large/343629.jpg',
        status: '',
        email: ''
      },
      currentBook: {},
      updatedBookInput: {}
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

  handleUpdateModalOpen = (book) => {
    this.setState({
      showUpdateModal: true,
      currentBook: book,
    });
  };

  modalHandleClose = (e) => {
    this.setState({
      showModal: false,
      showUpdateModal: false
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

  //Update form inputs:
  changeUpdateInput = (e) => {
    this.setState({
      updatedBookInput: {
        ...this.state.currentBook,
        [e.target.name]: e.target.value,
      },
      showUpdateModal: true
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
    }).then(this.refreshPage);
  }

  //Updating books:
  handleBookUpdate = () => {
    let config = {
      method: "PUT",
      baseURL: 'https://can-of-books-h.herokuapp.com',
      url: `/update-book/${this.state.updatedBookInput._id}`,
      data: this.state.updatedBookInput
    };
    axios(config).then(res => {
      this.setState({
        booksList: res.data,
        showUpdateModal: false,
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        errorMsg: true,
        showUpdateModal: false,
      });
    }).then(this.refreshPage);
  }
  

  refreshPage = () => {
    window.location.reload();
  }

  render() {
    return (
      <>
        <br /><br />
        <Row>
          <Col xs={10}>
            <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
          </Col>
          <Col xs={2}>
            <Button centered variant="success" onClick={this.modalHandleOpen}>Add a Book</Button>
          </Col>
        </Row>
        {this.state.showUpdateModal && <UpdateBookModal showUpdateModal={this.state.showUpdateModal} closeModal={this.modalHandleClose}
        bookInfo={this.state.currentBook} changeUpdateInput={this.changeUpdateInput} updateBook={this.handleBookUpdate}/>}
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
                    <Button variant="info" onClick={() => this.handleUpdateModalOpen(book)}>Update Book Details</Button>{' '}
                    <Button variant="danger" onClick={() => this.handleBookDelete(book._id)}>Remove This Book</Button>
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
