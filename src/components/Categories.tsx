import React from 'react'
import { Col, Row, Button, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import NavbarComponent from './Navbar';

import '../styles/Categories.css'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Start() {

  return (
    <div className="categories">
      <NavbarComponent colorShift='light' />
      <div className="cat-header">
      <h1 className="cat-title">Board Components</h1>
      <div className="cat-image" />
      </div>
      <Container className="body-bs-container">
        
        <div className="body-container">
          <Row className="button-container">
            {/* <Col md={1} />
          <Col md={4}>
            <Button as={Link} to='/items?category=decks' variant="outline-primary" className="d-button">DECKS</Button>
          </Col>
          <Col className="tw-col">
            <Button as={Link} to='/items?category=trucks' variant="outline-primary" className="tw-button">TRUCKS</Button>
            <Button as={Link} to='/items?category=wheels' variant="outline-primary" className="tw-button wheels">WHEELS</Button>
          </Col> */}
            <div className="buttons-left">
              <Link to='/items?category=decks' className="decks-button cat-button">Decks</Link>
            </div>
            <div className="buttons-right">
              <Link to='/items?category=trucks' className="tw-button cat-button trucks-button">Trucks</Link>
              <Link to='/items?category=wheels' className="tw-button cat-button wheels-button">Wheels</Link>
            </div>
          </Row>
        </div>
        
      </Container>
      <footer className="categories-footer">
        <div className="copyright">©2021 Matthew Serwer</div>
      </footer>
        {/* <Link to='/items?category=decks'>Decks</Link>
        <Link to='/items?category=trucks'>Trucks</Link>
        <Link to='/items?category=wheels'>Wheels</Link> */}
    </div>
  )
}

export default Start
