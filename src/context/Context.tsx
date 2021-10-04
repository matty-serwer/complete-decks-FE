import { createContext } from 'react';
import { IItem } from './types';

export interface ICartActions {
  type: 'ADD_CART_ITEM' | 'REMOVE_CART_ITEM';
  payload: IItem;
}

export interface ICartState {
  items: IItem[];
  cartItems: IItem[];
}

export const initialCartState: ICartState = {
  items: [],
  cartItems: []
}

export const cartReducer = (state: ICartState, action: ICartActions) => {
  let cartItems = state.cartItems;

  switch (action.type) {
    // case 'SET_ITEMS':
    //   return { ...state, items: action.payload }

    case 'ADD_CART_ITEM':
      let newItem = action.payload;
      // return { ...state, cartItems: [...cartItems, newItem] }
      const isItemInCart = cartItems.find(_item => _item.productId === newItem.productId)
      if (isItemInCart) {
        console.log(isItemInCart)
        return state
      } else {
        return { ...state, cartItems: [...cartItems, newItem] }
      }

    case 'REMOVE_CART_ITEM':
      let oldItem = action.payload;
      const updatedCartItems = cartItems.filter((_item) => _item.productId !== oldItem.productId)

      return { ...state, cartItems: updatedCartItems };
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
  cartDispatch: () => { }
})

export const CartContextConsumer = CartContext.Consumer;
export const CartContextProvider = CartContext.Provider;
export default CartContext;