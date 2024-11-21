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
  discountValue: number;
};

export const addItem = (item: CartItem, cartItems: CartItem[]) => {
  const existingItem = cartItems.some(
    (cartItem) => cartItem.product.id === item.product.id
  );

  const nextItems = existingItem
    ? cartItems.map((cartItem) =>
        cartItem.product.id === item.product.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      )
    : [...cartItems, item];

  return nextItems;
};

export const removeItem = (item: CartItem, cartItems: CartItem[]) => {
  return cartItems
    .map((cartItem) => {
      if (cartItem.product.id === item.product.id) {
        const updatedItem = {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        };

        return updatedItem;
      }

      return cartItem;
    })
    .filter((item) => item.quantity > 0);
};

export const updateCartValues = (cart: Cart): Cart => {
  const totalItemsPrice = calculateTotalItems(cart.items);
  const discount = calculateDiscount(cart.items);
  const totalPrice = Number((totalItemsPrice - discount).toFixed(2));

  return {
    ...cart,
    totalItemsPrice,
    discountValue: discount,
    totalPrice,
  };
};

const calculateTotalItems = (items: CartItem[]) => {
  const totalCartItems = items.reduce(
    (acc, current) => acc + current.product.price * current.quantity,
    0
  );

  return Number(totalCartItems.toFixed(2));
};

const calculateDiscount = (items: CartItem[]) => {
  if (!isEligiblyToGetDiscount(items)) return 0;

  const lowestPrice = items.reduce(
    (acc, current) => Math.min(acc, current.product.price),
    Infinity
  );

  return lowestPrice;
};

const isEligiblyToGetDiscount = (items: CartItem[]) => {
  const MIN_ITEMS_TO_DISCOUNT = 3;
  const totalItems = items.reduce((acc, { quantity }) => acc + quantity, 0);

  if (totalItems < MIN_ITEMS_TO_DISCOUNT) return false;

  return true;
};
