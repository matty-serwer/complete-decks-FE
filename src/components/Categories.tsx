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
      <h3 className="cat-subtitle">Choose a category, and start building your board.</h3>
      <div className="cat-image" />
      </div>
      <Container className="body-bs-container">
        
        <div className="body-container">
          <div className="button-container">
            <div className="buttons-left">
              <Link to='/items?category=decks' className="decks-button cat-button">Decks</Link>
            </div>
            <div className="buttons-right">
              <Link to='/items?category=trucks' className="tw-button cat-button trucks-button">Trucks</Link>
              <Link to='/items?category=wheels' className="tw-button cat-button wheels-button">Wheels</Link>
            </div>
          </div>
        </div>
        <footer className="categories-footer">
        <div className="copyright">©2021 Complete Decks Inc.</div>
      </footer>
      </Container>
      
    </div>
  )
}

export default Start
