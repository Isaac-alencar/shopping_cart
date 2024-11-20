import { Product } from "./Product";

export type Cart = {
  items: Product;
  totalItemsPrice: number;
  totalPrice: number;
  quantity: number;
};
