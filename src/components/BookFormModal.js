import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class BookFormModal extends Component {
    render() {
        return (
            <Modal size="lg" centered show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new book to the list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control type="text" placeholder="title" name="title" onChange={this.props.changeInput}/>
                        <Form.Label>Book Description</Form.Label>
                        <Form.Control type="text" placeholder="description" name="description" onChange={this.props.changeInput}/>
                        <Form.Label>Book Cover</Form.Label>
                        <Form.Control type="url" placeholder="image url" name="image" onChange={this.props.changeInput}/>
                        <Form.Label>Book Status</Form.Label>
                        <Form.Control type="text" placeholder="available / unavailable" name="status" onChange={this.props.changeInput} />
                        <Form.Label>Your email address</Form.Label>
                        <Form.Control type="email" name="email" onChange={this.props.changeInput}/>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={this.props.addBook}>Submit</Button>
                    <Button variant="secondary" onClick={this.props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default BookFormModal
