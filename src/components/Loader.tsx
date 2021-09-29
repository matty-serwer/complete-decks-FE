import React from 'react'
import { PuffLoader } from 'react-spinners';

import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-box">
        <PuffLoader size={280} color="#4762E6" />
      </div>
    </div>
  )
}

export default Loader
