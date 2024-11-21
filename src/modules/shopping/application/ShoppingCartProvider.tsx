import { useReducer, PropsWithChildren } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";
import shoppingCartReducer from "./ShoppingCartReducer";

import { Cart, CartItem } from "../domain/Cart";

const initialCartState: Cart = {
  items: [],
  totalItemsPrice: 0,
  totalPrice: 0,
  quantity: 0,
  discountValue: 0,
};

export const ShoppingCartProvider = ({ children }: PropsWithChildren) => {
  const [cart, dispatch] = useReducer(shoppingCartReducer, initialCartState);

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const removeFromCart = (item: CartItem) => {
    dispatch({ type: "REMOVE_ITEM", item });
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
