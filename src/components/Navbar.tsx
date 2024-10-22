import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
// styles
import '../styles/Navbar.css';
// components 
import LogoutModal from '../modals/LogoutModal';

interface INavbarProps {
  colorShift?: string
}

const NavbarComponent: React.FC<INavbarProps> = props => {
  let colorShift = "dark"
  if (props.colorShift) {
    colorShift = props.colorShift;
    colorShift.concat(" justify-content-between")
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("idToken")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [])

  return (
    <>
    <Navbar collapseOnSelect variant="dark" expand="md" className={colorShift}>
   
        

          <Navbar.Brand as={Link} to="/" className={colorShift === "light" ? "navbar-brand-l navbar-brand" : "navbar-brand"}>Complete Decks</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navebar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="basic-navbar-nav">
            <Nav />
            <Nav>
              <Nav.Link
                className={colorShift === "light" ? "navbar-link-l navbar-link" : "navbar-link"}
                as={Link}
                to='/categories'>Categories</Nav.Link>
              <span className={colorShift === "light" ? "nav-slash-l" : "nav-slash"}>/</span>
              <Nav.Link
                className={colorShift === "light" ? "navbar-link-l navbar-link" : "navbar-link"}
                as={Link}
                to='/cart'>Shopping Cart</Nav.Link>
              <span className={colorShift === "light" ? "nav-slash-l" : "nav-slash"}>/</span>
              {loggedIn ? (
                <Nav.Link className={colorShift === "light" ? "navbar-link-l navbar-link" : "navbar-link"} as={Link} to='/boardlist'>My Board List</Nav.Link>
              ) : (
                <Nav.Link
                  className={colorShift === "light" ? "navbar-link-l navbar-link" : "navbar-link"}
                  as={Link}
                  to='/register'>Sign Up!</Nav.Link>
              )}
              {loggedIn ? (
                <>
                  <span className={colorShift === "light" ? "nav-slash-l" : "nav-slash"}>/</span>
                  <span className={colorShift === "light" ? "navbar-link-l navbar-link nav-link" : "navbar-link nav-link"} onClick={() => setShowLogoutModal(true)}>Logout</span>
                </>
              ) : (
                null
              )}
            </Nav>
          </Navbar.Collapse>

        

      </Navbar>
      <LogoutModal setShowLogoutModal={setShowLogoutModal} showLogoutModal={showLogoutModal} />
    </>
  )

}

export default NavbarComponent;