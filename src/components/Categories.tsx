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
    <div>
      <div className="cat-header">
        <NavbarComponent />
        <h1 className="cat-title">Board Components</h1>
      </div>
      <div className="body-container">
        <Row className="button-container">
          <Col md={1} />
          <Col md={4}>
            <Button as={Link} to='/items?category=decks' variant="outline-primary" className="d-button">DECKS</Button>
          </Col>
          <Col className="tw-col">
            <Button as={Link} to='/items?category=trucks' variant="outline-primary" className="tw-button">TRUCKS</Button>
            <Button as={Link} to='/items?category=wheels' variant="outline-primary" className="tw-button wheels">WHEELS</Button>
          </Col>
        </Row>
      </div>
      <Link to='/items?category=decks'>Decks</Link>
      <Link to='/items?category=trucks'>Trucks</Link>
      <Link to='/items?category=wheels'>Wheels</Link>
    </div>
  )
}

export default Start
