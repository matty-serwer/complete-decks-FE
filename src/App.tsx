import React, { useReducer } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Context
import { IItem } from './context/types';
import { CartContextProvider, cartReducer, initialCartState } from './context/Context';

// components
import Start from './components/Start'
import Categories from './components/Categories';
import Items from './components/Items';
import Cart from './components/Cart';
import NavbarComponent from './components/Navbar';
import RegisterForm from './forms/Register';

// data
import productList from './data.json';


export interface IApplicationProps { }

const App: React.FC<IApplicationProps> = props => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState)

  const cartContextValues = {
    cartState,
    cartDispatch
  }

  // console.log(cartState);
  
  return (
    <CartContextProvider value={cartContextValues}>
      <BrowserRouter>
        <div className='App'>
          <NavbarComponent />
          <Route exact path='/' component={Start} />
          <Route path='/categories' component={Categories} />
          <Route path='/items' component={Items} />
          <Route path='/cart' component={Cart} />
          <Route path='/register' component={RegisterForm} />
        </div>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
