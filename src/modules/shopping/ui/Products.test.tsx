import { describe, expect, it } from "vitest";
import { act, render } from "@testing-library/react";

import { Products } from "./Products";
import { ShoppingCartProvider } from "../application/ShoppingCartProvider";

const cart = {
  items: [{ product: { id: 1, name: "some name", price: 10 }, quantity: 2 }],
  totalItemsPrice: 0,
  totalPrice: 0,
  quantity: 2,
  discountValue: 0,
};

describe("<Products />", () => {
  it("renders correctly", () => {
    const element = render(
      <ShoppingCartProvider cart={cart}>
        <Products />
      </ShoppingCartProvider>
    );

    expect(element).toBeDefined();
  });

  it("it updates the total items on cart when adding a new item", () => {
    const element = render(
      <ShoppingCartProvider cart={cart}>
        <Products />
      </ShoppingCartProvider>
    );
    const [addToCartButton] = element.getAllByText(/add to cart/i);
    // fireEvent.click(addToCartButton);
    act(() => {
      addToCartButton.click();
    });

    expect(element.getByText(/items on cart/i).textContent).toEqual(
      "Items on cart: 3"
    );
  });
});
