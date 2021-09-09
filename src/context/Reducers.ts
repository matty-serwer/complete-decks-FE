// import { ItemInterface, ItemsContext } from './types';

// export const cartReducer = (state: any, action: any) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         cart: state.cart.filter((item: ItemInterface) => item.id !== action.payload.id),
//       };
//     case "CHANGE_CART_QTY":
//       return {
//         ...state,
//         cart: state.cart.filter((item: ItemInterface) =>
//           item.id === action.payload.id ? (item.qty = action.payload.qty) : item.qty
//         ),
//       };
//     default:
//       return state;
//   }
// };

export {}