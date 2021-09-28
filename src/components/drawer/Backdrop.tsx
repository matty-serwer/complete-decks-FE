import React, { Dispatch, SetStateAction } from 'react';
import '../../styles/Backdrop.css';

interface IBackdropProps {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const Backdrop: React.FC<IBackdropProps> = (props) => {
  const { setDrawerOpen } = props;

  return (
    <div className="backdrop" onClick={() => setDrawerOpen(false)}/>
  )
}

export default Backdrop;
