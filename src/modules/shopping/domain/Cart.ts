import { Product } from "./Product";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalItemsPrice: number;
  totalPrice: number;
  quantity: number;
};
