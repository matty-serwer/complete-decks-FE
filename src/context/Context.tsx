import React, { useReducer, createContext, useContext } from 'react';
import { ItemInterface, ItemsContext, initialContext } from './types';
import { cartReducer } from './Reducers'; 
import itemsData from '../data.json';


const Cart = createContext<ItemsContext>(initialContext);
// const Cart = createContext(undefined)

export const Context = ({ children }: any) => {

  const items = itemsData.PARTS_LIST_DATA

  const [state, dispatch] = useReducer(cartReducer, initialContext)

  return (
    <Cart.Provider value={{ state, dispatch }}>
      {children}
    </Cart.Provider>
  )
}