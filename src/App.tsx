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

// data
import productList from './data.json';


export interface IApplicationProps { }

const App: React.FC<IApplicationProps> = props => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState)

  const cartContextValues = {
    cartState,
    cartDispatch
  }

  return (
    <CartContextProvider value={cartContextValues}>
      <BrowserRouter>
        <div className='App'>
          <h1>App.js</h1>
          <Route exact path='/' component={Start} />
          <Route path='/categories' component={Categories} />
          <Route path='/items' component={Items} />
          <Route path='/cart' />
        </div>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
