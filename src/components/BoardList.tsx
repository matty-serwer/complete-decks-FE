import React from 'react'
import { Container } from 'react-bootstrap';
import NavbarComponent from './Navbar';
// styles
import '../styles/BoardList.css';

function BoardList() {
  return (
    <div className="boardlist-component">
      <NavbarComponent colorShift={"light"} />
      <Container>
        <h1>My Board List</h1>
      </Container>
    </div>
  )
}

export default BoardList
