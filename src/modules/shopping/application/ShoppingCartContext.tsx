import { createContext } from "react";
import { Cart, CartItem } from "../domain/Cart";

type ShoppingCartContextProps = {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
};

export const ShoppingCartContext = createContext<ShoppingCartContextProps>(
  {} as ShoppingCartContextProps
);
