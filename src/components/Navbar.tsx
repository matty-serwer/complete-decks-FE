import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CartContext from '../context/Context';


const NavbarComponent: React.FC = props => {

  const cartContext = useContext(CartContext);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Complete Decks</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
            <Nav.Link as={Link} to="/cart">Shopping Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )

}

export default NavbarComponent;