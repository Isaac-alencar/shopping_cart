import { expect, test, describe } from "vitest";
import { CartItem, Cart, addItem, removeItem, updateCartValues } from "./Cart";

describe("Cart Entity", () => {
  describe("addItem function", () => {
    test("adds a new item to the cart", () => {
      const item: CartItem = {
        product: { id: 1, name: "some name", price: 10 },
        quantity: 2,
      };
      const cartItems: CartItem[] = [];

      const result = addItem(item, cartItems);
      expect(result).toEqual([
        { product: { id: 1, name: "some name", price: 10 }, quantity: 2 },
      ]);
    });

    test("updates the quantity of an existing item", () => {
      const item: CartItem = {
        product: { id: 1, name: "some name", price: 10 },
        quantity: 2,
      };
      const cartItems: CartItem[] = [
        { product: { id: 1, name: "some name", price: 10 }, quantity: 1 },
      ];

      const [cartItem] = addItem(item, cartItems);
      expect(cartItem.quantity).toEqual(3);
    });
  });

  describe("removeItem function", () => {
    test("removes an item from the cart", () => {
      const item: CartItem = {
        product: { id: 1, name: "some name", price: 10 },
        quantity: 1,
      };
      const cartItems: CartItem[] = [
        { product: { id: 1, name: "some name", price: 10 }, quantity: 2 },
      ];

      const [cartItem] = removeItem(item, cartItems);
      expect(cartItem.quantity).toBe(1);
    });

    test("should remove an item completely if quantity is 1", () => {
      const item: CartItem = {
        product: { id: 1, name: "some name", price: 10 },
        quantity: 1,
      };
      const cartItems: CartItem[] = [
        { product: { id: 1, name: "some name", price: 10 }, quantity: 1 },
      ];

      const result = removeItem(item, cartItems);
      expect(result).toEqual([]);
    });
  });

  describe("updateCartValues function", () => {
    test("updates the cart values correctly", () => {
      const cart: Cart = {
        items: [
          { product: { id: 1, name: "some name", price: 10 }, quantity: 2 },
        ],
        totalItemsPrice: 0,
        totalPrice: 0,
        quantity: 2,
        discountValue: 0,
      };

      const result = updateCartValues(cart);

      expect(result).toEqual({
        items: [{ product: expect.any(Object), quantity: 2 }],
        totalItemsPrice: 20,
        totalPrice: 20,
        quantity: 2,
        discountValue: 0,
      });
    });
  });
});
