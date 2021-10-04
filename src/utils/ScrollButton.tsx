import React, { useState } from 'react';
import {MdOutlineArrowUpward} from 'react-icons/md';
// styles
import './styles/ScrollButton.css';
  
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  window.addEventListener("scroll", toggleVisible);
  
  return (
    <div className="scroll-up-button">
     <MdOutlineArrowUpward onClick={scrollToTop} 
     className="scroll-up-icon"
     style={{ display: visible ? "inline" : "none" }} />
    </div>
  );
}
  
export default ScrollButton;