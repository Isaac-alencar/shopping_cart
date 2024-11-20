import { CartItem } from "../domain/Cart";

type CartItemsProp = {
  items: CartItem[];
  onRemoveFromCart: (cartItem: CartItem) => void;
};

export const CartItems = ({ items, onRemoveFromCart }: CartItemsProp) => {
  const handleClick = (cartItem: CartItem) => {
    onRemoveFromCart(cartItem);
  };

  return (
    <div className="mt-4 p-4 col-span-3">
      <h3 className="text-xl font-bold">Items</h3>
      <ul className="flex flex-col gap-4border-t border-zinc-300 py-2">
        {items &&
          items.map(({ product, quantity }) => {
            return (
              <Item
                key={product.id}
                name={product.name}
                price={product.price}
                quantity={quantity}
                onClick={() => handleClick({ product, quantity })}
              />
            );
          })}
      </ul>
    </div>
  );
};

type ItemProps = {
  name: string;
  quantity: number;
  price: number;
  onClick: () => void;
};

const Item = ({ name, price, quantity, onClick }: ItemProps) => (
  <li className="flex justify-between items-center gap-8 border-b border-zinc-200 last:border-0">
    <span className="text-zinc-500 font-bold">
      {quantity}x {name}
    </span>
    <div className="flex items-center gap-2 my-2">
      <strong>$ {price}</strong>
      <button
        onClick={onClick}
        type="button"
        className="p-2 bg-red-500 hover:bg-red-400 focus:ring-red-300 text-white rounded-md"
      >
        remove
      </button>
    </div>
  </li>
);
