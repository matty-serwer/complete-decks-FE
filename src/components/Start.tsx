import React from 'react'
import { Link } from 'react-router-dom';

function Start() {
  return (
    <div>
      <h2>Start Button Page</h2>
      <Link to='/categories'>Categories</Link>
    </div>
  )
}

export default Start
