import { Product } from "../domain/Product";

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

export const ProductCard = ({
  product: { name, price },
  onClick,
}: ProductCardProps) => {
  return (
    <li className="flex flex-col gap-4 p-2 border border-zinc-400 rounded-md w-full">
      <strong className="text-2xl">{name}</strong>
      <span className="text-lg text-gray-500">$ {price}</span>
      <button
        type="button"
        className="px-4 py-2 bg-blue-700 rounded-md text-white font-bold hover:brightness-75"
        onClick={onClick}
      >
        Add to cart
      </button>
    </li>
  );
};
