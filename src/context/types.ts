export interface IItem {
  id: number;
  name: string;
  image_url: string;
  description: string;
  price: string;
  category: string;
  qty?: number;
};

//export const BACKEND_URL = "https://completedecks.ee-cognizantacademy.com";

export const BACKEND_URL = "http://localhost:5000"
