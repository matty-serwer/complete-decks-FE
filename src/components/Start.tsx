import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/Start.css';

function Start() {
  return (
    <div className="start-hero-image">
      <h1 className="title">Complete Decks</h1>
      <Link to='/categories' className="start-button">START</Link>
    </div>
  )
}

export default Start
