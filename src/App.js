import React from 'react';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react'; //to make it compatible with Auth0
import BestBooks from './BestBooks';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { Navbar, NavItem, OverlayTrigger, Popover, Card, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './header.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  render() {
    return (
      <>
        <Router>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>My Favorite Books</Navbar.Brand>
            <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
            <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
            <NavItem className="button-placement">{this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}</NavItem>
            <NavItem className="profile-hover">{this.props.auth0.isAuthenticated &&
                  <OverlayTrigger
                    trigger="hover"
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <Card style={{ width: '16rem' }}>
                          <Card.Img variant="top" src={this.props.auth0.user.picture} roundedCircle />
                          <Card.Body>
                            <Card.Title>{this.props.auth0.user.name}</Card.Title>
                            <Card.Text>Email: {this.props.auth0.user.email}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Popover>
                    }>
                      <Image style={{"height": "43px"}} src={this.props.auth0.user.picture} roundedCircle />
                  </OverlayTrigger>}
              </NavItem>
          </Navbar>
          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated && <BestBooks />}
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
