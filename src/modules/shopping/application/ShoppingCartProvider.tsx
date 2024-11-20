import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { addItem, Cart, CartItem, removeItem } from "../domain/Cart";

type ShoppingCartContextProps = {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
};

export const ShoppingCartContext = createContext<ShoppingCartContextProps>(
  {} as ShoppingCartContextProps
);

const initialCartState = {
  items: [],
  totalItemsPrice: 0,
  totalPrice: 0,
  quantity: 0,
  discountValue: 0,
};

export const ShoppingCartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>(initialCartState);

  const addToCart = useCallback(
    (item: CartItem) => {
      const updatedCart = addItem(item, cart);
      setCart(updatedCart);
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (item: CartItem) => {
      const updatedCart = removeItem(item, cart);
      setCart(updatedCart);
    },
    [cart]
  );

  const value = useMemo(
    () => ({
      addToCart,
      removeFromCart,
      cart,
    }),
    [cart, addToCart, removeFromCart]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
