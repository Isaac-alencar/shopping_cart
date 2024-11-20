type CartPropsResume = {
  totalPrice: number;
  discountValue: number;
  totalItemsPrice: number;
};

export const CartResume = ({
  discountValue,
  totalItemsPrice,
  totalPrice,
}: CartPropsResume) => {
  return (
    <div className="border border-zinc-400 rounded-md p-4 bg-slate-100 col-span-2">
      <Section title="Subtotal" value={totalItemsPrice} />
      <Section title="Discount" value={discountValue} />
      <Section title="Total" value={totalPrice} />

      <button
        type="button"
        className="w-full px-4 py-2 bg-blue-700 rounded-md text-white font-bold hover:brightness-75"
      >
        Order now
      </button>
    </div>
  );
};

const Section = ({ title, value }: { title: string; value: number }) => (
  <div className="mt-2">
    <h3 className="text-xl font-bold ">{title}</h3>
    <div className="border-t border-zinc-300 py-2 ">
      <span className="text-zinc-500 font-bold ">$ {value}</span>
    </div>
  </div>
);
