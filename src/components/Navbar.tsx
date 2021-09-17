import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CartContext from '../context/Context';
// styles
import '../styles/Navbar.css';

interface INavbarProps {
  colorShift?: string
}

const NavbarComponent: React.FC<INavbarProps> = props => {

  let colorShift = "dark"
  if (props.colorShift) {
    colorShift = props.colorShift;
  }
  console.log(colorShift);


  const cartContext = useContext(CartContext);

  return (
    <>
      <Navbar variant="dark" className={colorShift}>
        <Container>
          <Navbar.Brand as={Link} to="/" className={colorShift === "light" ? "navbar-brand-l" : "navbar-brand"}>Complete Decks</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link 
              className={colorShift === "light" ? "navbar-link-l" : "navbar-link"}
              as={Link} 
              to="/categories">Categories</Nav.Link>
            <span className={colorShift === "light" ? "nav-slash-l" : "nav-slash"}>/</span>
            <Nav.Link
              className={colorShift === "light" ? "navbar-link-l" : "navbar-link"}
              as={Link}
              to="/cart">Shopping Cart</Nav.Link>
            <span className={colorShift === "light" ? "nav-slash-l" : "nav-slash"}>/</span>
            <Nav.Link 
              className={colorShift === "light" ? "navbar-link-l" : "navbar-link"} 
              as={Link} 
              to="/register">Sign Up!</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )

}

export default NavbarComponent;