import { Cart } from "../domain/Cart";
import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useShoppingCart } from "./useShoppingCart";
import { ShoppingCartProvider } from "./ShoppingCartProvider";

const mockCartState = {
  items: [],
  totalItemsPrice: 0,
  totalPrice: 0,
  quantity: 0,
  discountValue: 0,
};

const setup = (cart?: Cart) => {
  const hook = renderHook(() => useShoppingCart(), {
    wrapper: ({ children }) => (
      <ShoppingCartProvider cart={cart ?? mockCartState}>
        {children}
      </ShoppingCartProvider>
    ),
  });

  return hook;
};

describe("useShoppingCart", () => {
  it("should return initial cart values", () => {
    const { result } = setup();

    expect(result.current.cart).toEqual({
      items: [],
      totalItemsPrice: 0,
      totalPrice: 0,
      quantity: 0,
      discountValue: 0,
    });
  });

  it("adds one item on cart when", () => {
    const { result } = setup();

    act(() => {
      result.current.addToCart({
        product: { id: 1, name: "Item 1", price: 10 },
        quantity: 1,
      });
    });

    expect(result.current.cart.quantity).toBe(1);
    expect(result.current.cart.items.length).toBe(1);
  });

  it("increases quantity of existing item", () => {
    const { result, rerender } = setup({
      items: [{ product: { id: 1, name: "Item 1", price: 10 }, quantity: 2 }],
      quantity: 1,
      totalPrice: 10,
      totalItemsPrice: 10,
      discountValue: 0,
    });

    act(() => {
      result.current.addToCart({
        product: { id: 1, name: "Item 1", price: 10 },
        quantity: 1,
      });
    });
    rerender();

    expect(result.current.cart.quantity).toBe(2);
    expect(result.current.cart.items.length).toBe(1);
  });

  it("should return updated cart values after adding item", () => {
    const { result, rerender } = setup({
      items: [{ product: { id: 1, name: "Item 1", price: 10 }, quantity: 1 }],
      quantity: 1,
      totalPrice: 10,
      totalItemsPrice: 10,
      discountValue: 0,
    });

    act(() => {
      result.current.addToCart({
        product: { id: 1, name: "Item 1", price: 10 },
        quantity: 1,
      });
    });
    rerender();

    expect(result.current.cart.totalPrice).toBe(20);
    expect(result.current.cart.totalItemsPrice).toBe(20);
  });

  it("removes completely from from the cart", () => {
    const { result, rerender } = setup({
      items: [{ product: { id: 1, name: "Item 1", price: 10 }, quantity: 1 }],
      quantity: 1,
      totalPrice: 10,
      totalItemsPrice: 10,
      discountValue: 0,
    });

    act(() => {
      result.current.removeFromCart({
        product: { id: 1, name: "Item 1", price: 10 },
        quantity: 1,
      });
    });
    rerender();

    expect(result.current.cart.items).toStrictEqual([]);
    expect(result.current.cart.totalPrice).toBe(0);
    expect(result.current.cart.totalItemsPrice).toBe(0);
  });

  it("decrease item quantity on the cart", () => {
    const { result, rerender } = setup({
      items: [{ product: { id: 1, name: "Item 1", price: 10 }, quantity: 2 }],
      quantity: 1,
      totalPrice: 10,
      totalItemsPrice: 10,
      discountValue: 0,
    });

    act(() => {
      result.current.removeFromCart({
        product: { id: 1, name: "Item 1", price: 10 },
        quantity: 1,
      });
    });
    rerender();

    expect(result.current.cart.items.length).toStrictEqual(1);
    expect(result.current.cart.totalItemsPrice).toBe(10);
    expect(result.current.cart.totalPrice).toBe(10);
  });

  it("applies discount strategy when is eligible", () => {
    const { result, rerender } = setup({
      items: [{ product: { id: 1, name: "Item 1", price: 10 }, quantity: 2 }],
      quantity: 1,
      totalPrice: 20,
      totalItemsPrice: 20,
      discountValue: 0,
    });

    act(() => {
      result.current.addToCart({
        product: { id: 1, name: "Item 1", price: 10 },
        quantity: 1,
      });
    });
    rerender();

    expect(result.current.cart.totalPrice).toBe(20);
    expect(result.current.cart.totalItemsPrice).toBe(30);
  });
});
