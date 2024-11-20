import { useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartProvider";

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "You used useShoppingCart outside of ShoppingCartContext provider"
    );
  }

  return context;
};
