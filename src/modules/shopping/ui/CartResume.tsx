export const CartResume = () => {
  return (
    <div className="border border-zinc-400 rounded-md p-4 bg-slate-100 col-span-2">
      <Section title="Subtotal" value={80.75} />
      <Section title="Discount" value={0} />
      <Section title="Total" value={80.75} />

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
