import React, { Component } from 'react'
import { Card } from "react-bootstrap";

class Profile extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <Card.Text>
            Hello dear user, you must be logged in to see this page, but you can't.
            Ciao 
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default Profile
