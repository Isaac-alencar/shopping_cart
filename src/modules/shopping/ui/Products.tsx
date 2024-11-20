import Link from "next/link";
import { Header } from "../shared/components/Header";
import { ProductCard } from "./ProductCard";
import { useShoppingCart } from "../application/useShoppingCart";

export const Products = () => {
  const { cart, addToCart } = useShoppingCart();

  return (
    <main className="container mx-auto p-4 md:p-8">
      <Header
        pageTitle="Cart"
        headerLink={() => (
          <Link href={`/cart`}>
            <span className="text-zinc-500 font-semibold">
              Items on cart: {cart.quantity}
            </span>
          </Link>
        )}
      />

      <ul className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 w-full mt-16">
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => addToCart({ product, quantity: 1 })}
            />
          );
        })}
      </ul>
    </main>
  );
};

const products = [
  { id: 1, name: "Dress", price: 80.9 },
  { id: 2, name: "T-Shirt", price: 35.9 },
  { id: 3, name: "Jeans", price: 65.5 },
  { id: 4, name: "Bag", price: 65.5 },
  { id: 5, name: "Shoes", price: 31.5 },
];
