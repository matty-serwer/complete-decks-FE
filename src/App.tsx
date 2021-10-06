import React, { useReducer, useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './bootstrap.css';
// Context
import { IItem } from './context/types';
import { CartContextProvider, cartReducer, initialCartState } from './context/Context';
import { UIContextProvider, uiReducer, initialUIState } from './context/UIContext';
// components
import Start from './components/Start'
import Categories from './components/Categories';
import Items from './components/Items';
import Cart from './components/Cart';
import BoardList from './components/BoardList/BoardList';
// import NavbarComponent from './components/Navbar';
// import Status from './context/Status';
// forms
import RegisterForm from './forms/Register';
import LoginForm from './forms/Login';
import VerificationForm from './forms/Verify';
import { Account } from './context/Account';
// data
// import productList from './data.json';
// utils
import PrivateRoute from './utils/PrivateRoute';


export interface IApplicationProps { }

const App: React.FC<IApplicationProps> = props => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [uiState, uiDispatch] = useReducer(uiReducer, initialUIState);
  const [deckComplete, setDeckComplete] = useState(false);

  const cartContextValues = { cartState, cartDispatch };
  const uiContextValues = { uiState, uiDispatch };

  const cartItems = cartState.cartItems;

  useEffect(() => {
    let decksInCart = cartItems.some((_item) => _item.category === "decks");
    let trucksInCart = cartItems.some((_item) => _item.category === "trucks");
    let wheelsInCart = cartItems.some((_item) => _item.category === "wheels");

    if (decksInCart && trucksInCart && wheelsInCart) {
      setDeckComplete(true);
    } else {
      setDeckComplete(false);
    }
    // console.log(deckComplete);

  }, [cartItems])

  // console.log(cartState);

  return (
    <CartContextProvider value={cartContextValues}>
      <UIContextProvider value={uiContextValues}>
        <Account>
          <BrowserRouter>
            <div className='App'>
              {/* <NavbarComponent /> */}
              {/* <Status /> */}
              <Route exact path='/' component={Start} />
              <Route path='/categories' component={Categories} />
              <Route path='/items' component={Items} />
              <Route path='/cart' component={Cart} />
              <Route path='/register' component={RegisterForm} />
              <Route path='/verify' component={VerificationForm} />
              <Route path='/login' component={LoginForm} />
              <PrivateRoute path='/boardlist' component={BoardList} />
            </div>
          </BrowserRouter>
        </Account>
      </UIContextProvider>
    </CartContextProvider>
  );
}

export default App;
