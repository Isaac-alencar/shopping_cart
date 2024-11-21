import { useReducer, ReactNode } from "react";
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

type ShoppingCartProviderProps = {
  cart?: Cart;
  children: ReactNode;
};

export const ShoppingCartProvider = ({
  children,
  cart = initialCartState,
}: ShoppingCartProviderProps) => {
  const [cartState, dispatch] = useReducer(shoppingCartReducer, cart);

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const removeFromCart = (item: CartItem) => {
    dispatch({ type: "REMOVE_ITEM", item });
  };

  const value = {
    cart: cartState,
    addToCart,
    removeFromCart,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
