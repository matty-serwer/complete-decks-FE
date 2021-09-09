export interface IItem {
  id: number;
  name: string;
  image_url: string;
  description: string;
  price: string;
  category: string;
  qty?: number;
};

// export type ItemsContext = {
//   state: {
//     items: ItemInterface[];
//     cart: ItemInterface[];
//     setItems: (items: ItemInterface[]) => void;
//     setCart: (items: ItemInterface[]) => void;
//   };
// };

// export const initialContext = {
//   state: {
//     items: [],
//     cart: [],
//     setItems: () => {
//       return null;
//     },
//     setCart: () => {
//       return null;
//     },
//   },
// };
