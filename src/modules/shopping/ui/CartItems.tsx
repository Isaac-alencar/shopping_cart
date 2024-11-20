import { CartItem } from "../domain/Cart";

type CartItemsProp = {
  items: CartItem[];
};

export const CartItems = ({ items }: CartItemsProp) => {
  return (
    <div className="mt-4 p-4 col-span-3">
      <h3 className="text-xl font-bold">Items</h3>
      <ul className="flex flex-col gap-4border-t border-zinc-300 py-2">
        {items &&
          items.map(({ product, quantity }) => {
            return (
              <Item key={product.id} product={product} quantity={quantity} />
            );
          })}
      </ul>
    </div>
  );
};

const Item = ({ product, quantity }: CartItem) => (
  <li className="flex justify-between gap-8">
    <span className="text-zinc-500 font-bold">
      {quantity}x {product.name}
    </span>
    <strong>$ {product.price}</strong>
  </li>
);
