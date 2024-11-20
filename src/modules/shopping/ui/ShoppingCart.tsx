import Link from "next/link";
import { Header } from "../shared/components/Header";
import { CartItems } from "./CartItems";
import { CartResume } from "./CartResume";
import { useShoppingCart } from "../application/useShoppingCart";

export const ShoppingCart = () => {
  const { cart, removeFromCart } = useShoppingCart();

  return (
    <main className="container mx-auto p-4 md:p-8">
      <Header
        pageTitle="Cart"
        headerLink={() => (
          <Link href={`/`}>
            <span className="text-zinc-500 font-semibold">Back to shop</span>
          </Link>
        )}
      />

      <div className="md:grid md:grid-cols-5 md:items-start mt-8 gap-20">
        <CartItems items={cart.items} onRemoveFromCart={removeFromCart} />
        <CartResume
          discountValue={cart.discountValue}
          totalItemsPrice={cart.totalItemsPrice}
          totalPrice={cart.totalPrice}
        />
      </div>
    </main>
  );
};
