import { describe, expect, it } from "vitest";
import { render, act } from "@testing-library/react";

import { ShoppingCart } from "./ShoppingCart";
import { ShoppingCartProvider } from "../application/ShoppingCartProvider";

const cart = {
  items: [{ product: { id: 1, name: "some name", price: 10 }, quantity: 1 }],
  totalItemsPrice: 0,
  totalPrice: 0,
  quantity: 1,
  discountValue: 0,
};

describe("<ShoppingCart />", () => {
  it("renders correctly", () => {
    const element = render(
      <ShoppingCartProvider cart={cart}>
        <ShoppingCart />
      </ShoppingCartProvider>
    );

    expect(element).toBeDefined();
  });

  it("it updates the total items on cart when adding a new item on cart page", () => {
    const element = render(
      <ShoppingCartProvider cart={cart}>
        <ShoppingCart />
      </ShoppingCartProvider>
    );

    const [addToCartButton] = element.getAllByText(/add 1/i);
    act(() => {
      addToCartButton.click();
    });

    expect(element.getByText(/2x some name/i)).toBeDefined();
  });

  it("it updates the total items on cart when removing a item on cart page", () => {
    const element = render(
      <ShoppingCartProvider
        cart={{
          ...cart,
          items: [
            { product: { id: 1, name: "some name", price: 10 }, quantity: 2 },
          ],
          quantity: 2,
        }}
      >
        <ShoppingCart />
      </ShoppingCartProvider>
    );

    const [removeItemButton] = element.getAllByText(/remove/i);
    act(() => {
      removeItemButton.click();
    });

    expect(element.getByText(/1x some name/i)).toBeDefined();
  });

  it("it remove all items completely on cart", () => {
    const element = render(
      <ShoppingCartProvider
        cart={{
          ...cart,
          items: [
            { product: { id: 1, name: "some name", price: 10 }, quantity: 1 },
          ],
          quantity: 1,
        }}
      >
        <ShoppingCart />
      </ShoppingCartProvider>
    );

    const [removeItemButton] = element.getAllByText(/remove/i);
    act(() => {
      removeItemButton.click();
    });

    const itemsDescription = element.getByText(/item/i);

    expect(itemsDescription.children.length).toEqual(0);
  });
});
