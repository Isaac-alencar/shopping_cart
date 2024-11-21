import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  addItem,
  Cart,
  CartItem,
  removeItem,
  updateCartValues,
} from "../domain/Cart";

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
      const nextItems = addItem(item, cart.items);
      const nextCart = updateCartValues({
        ...cart,
        quantity: cart.quantity + item.quantity,
        items: nextItems,
      });

      setCart(nextCart);
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (item: CartItem) => {
      const nextItems = removeItem(item, cart.items);
      const nextCart = updateCartValues({
        ...cart,
        quantity: cart.quantity - 1,
        items: nextItems,
      });

      setCart(nextCart);
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
