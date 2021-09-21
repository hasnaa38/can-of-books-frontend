import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class UpdateBookModal extends Component {
    render() {
        return (
            <Modal size="lg" centered show={this.props.showUpdateModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control type="text" placeholder={this.props.bookInfo.title} name="title" onChange={this.props.changeUpdateInput} />
                        <Form.Label>Book Description</Form.Label>
                        <Form.Control type="text" placeholder={this.props.bookInfo.description} name="description" onChange={this.props.changeUpdateInput} />
                        <Form.Label>Book Cover</Form.Label>
                        <Form.Control type="url" placeholder={this.props.bookInfo.image} name="image" onChange={this.props.changeUpdateInput} />
                        <Form.Label>Book Status</Form.Label>
                        <Form.Control type="text" placeholder={this.props.bookInfo.status} name="status" onChange={this.props.changeUpdateInput} />
                        <Form.Label>Your email address</Form.Label>
                        <Form.Control type="email" placeholder={this.props.bookInfo.email} name="email" onChange={this.props.changeUpdateInput} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={this.props.updateBook}>Submit</Button>
                    <Button variant="secondary" onClick={this.props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default UpdateBookModal
