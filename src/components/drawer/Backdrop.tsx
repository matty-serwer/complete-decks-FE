import React, { Dispatch, SetStateAction, useContext } from 'react';
import UIContext from '../../context/UIContext';
import '../../styles/Backdrop.css';

interface IBackdropProps { }
//   setDrawerOpen: Dispatch<SetStateAction<boolean>>;
// }

const Backdrop: React.FC<IBackdropProps> = () => {
  // const { setDrawerOpen } = props;

  const uiContext = useContext(UIContext);
  const drawerOpen = uiContext.uiState.drawerOpen;

  return (
    <div className="backdrop" onClick={() => uiContext.uiDispatch({ type: "SET_HIDE_DRAWER" })}/>
  )
}

export default Backdrop;
