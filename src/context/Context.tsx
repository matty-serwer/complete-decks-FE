// import React, { useReducer, createContext, useContext } from 'react';
// import { ItemInterface, ItemsContext, initialContext } from './types';
// import { cartReducer } from './Reducers'; 
// import itemsData from '../data.json';


// const Cart = createContext<ItemsContext>(initialContext);
// // const Cart = createContext(undefined)

// export const Context = ({ children }: any) => {

//   const items = itemsData.PARTS_LIST_DATA

//   const [state, dispatch] = useReducer(cartReducer, initialContext)


//   return (
//     <Cart.Provider value={{ state, dispatch }}>
//       {children}
//     </Cart.Provider>
//   )
// } 

import { createContext } from 'react';
import { IItem } from './types';

export interface ICartActions {
  type: 'add_item' | 'remove_item';
  payload: IItem;
}

export interface ICartState {
  items: { [key: string]: IItem[] };
}

export const initialCartState: ICartState = {
  items: {}
}

export const cartReducer = (state: ICartState, action: ICartActions) => {
  let item = action.payload;
  let items = { ...state.items };

  switch (action.type) {
    case 'add_item':

      if (items[item.id]) {
        items[item.id].push(item)
      } else {
        items[item.id] = [item]
      }

      return { ...state, items };
    case 'remove_item':
      items[item.name].pop();

      if (items[item.name].length === 0) delete items[item.name];

      return { ...state, items }
    default:
      return state;
  }
}

export interface ICartContextProps {
  cartState: ICartState;
  cartDispatch: React.Dispatch<ICartActions>;
}

const CartContext = createContext<ICartContextProps>({
  cartState: initialCartState,
  cartDispatch: () => {}
})

export const CartContextConsumer = CartContext.Consumer;
export const CartContextProvider = CartContext.Provider;
export default CartContext;