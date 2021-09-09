import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Start() {

  return (
    <div>
      <h2>Categories Page</h2>
      <Link to='/items?category=decks'>Decks</Link>
      <Link to='/items?category=trucks'>Trucks</Link>
      <Link to='/items?category=wheels'>Wheels</Link>
    </div>
  )
}

export default Start
