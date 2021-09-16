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

  let colorShift = "none"
  if (props.colorShift) {
    colorShift = props.colorShift
    // console.log(colorShift)
  }

  const cartContext = useContext(CartContext);

  return (
    <>
      <Navbar variant="dark" sticky="top" className={colorShift}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">Complete Decks</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="navbar-link" as={Link} to="/categories">Categories</Nav.Link> 
            <span className="nav-slash">/</span>
            <Nav.Link className="navbar-link" as={Link} to="/cart">Shopping Cart</Nav.Link>
            <span className="nav-slash">/</span>
            <Nav.Link className="navbar-link" as={Link} to="/register">Sign Up!</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )

}

export default NavbarComponent;