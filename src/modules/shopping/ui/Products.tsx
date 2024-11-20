import Link from "next/link";

export const Products = () => {
  return (
    <main className="container-lg mx-8">
      <h2 className="text-2xl text-blue-700">Products</h2>

      <Link href={`/cart`}>visit cart</Link>
    </main>
  );
};
