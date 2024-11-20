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

// TODO: improve this file. how do I will test this?
// TODO: improve this to remove duplicates only update it

export const addItem = (item: CartItem, cart: Cart) => {
  const nextItems = [...cart.items, item];

  const updatedCart = {
    ...cart,
    items: nextItems,
    quantity: cart.quantity + item.quantity,
  };

  const totalItemsPrice = calculateTotalItems(cart.items, cart.totalItemsPrice);
  const discount = calculateDiscount(updatedCart.items);
  const totalPrice = totalItemsPrice - discount;

  return {
    ...updatedCart,
    totalItemsPrice,
    totalPrice,
    discountValue: discount,
  };
};

// TODO: refactor this
export const removeItem = (item: CartItem, cart: Cart) => {
  const updatedCartItems = cart.items.filter(
    (cartItem) => cartItem.product.id != item.product.id
  );

  const updatedCart = {
    ...cart,
    items: updatedCartItems,
    quantity: cart.quantity - item.quantity,
  };

  const discount = calculateDiscount(updatedCart.items);
  const totalPrice = updatedCart.totalPrice - discount;

  return { ...updatedCart, totalPrice };
};

const calculateTotalItems = (items: CartItem[], totalItemsPrice: number) => {
  const totalCartItems = items.reduce(
    (acc, current) => acc + current.product.price,
    totalItemsPrice
  );

  return Math.floor(Number(totalCartItems.toFixed(2)));
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
