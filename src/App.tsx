import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

// components
import Start from './components/Start'
import Categories from './components/Categories';
import Items from './components/Items';

import productList from './data.json';
console.log(productList.PARTS_LIST_DATA);

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <h1>App.js</h1>
        <Route exact path='/' component={Start}/>
        <Route path='/categories' component={Categories}/>
        <Route path='/items' component={Items}/>
        <Route path='/cart' />
      </div>
    </BrowserRouter>
  );
}

export default App;
