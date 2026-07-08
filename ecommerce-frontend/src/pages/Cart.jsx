import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { EmptyState } from "../components/common/StatusState";
import { useCart } from "../context/CartContext";
import { formatCurrency, getProductId, getProductImage } from "../utils/formatters";

const Cart = () => {
  const { items, removeItem, total, updateItem } = useCart();

  if (items.length === 0) {
    return (
      <section className="page-shell py-10">
        <EmptyState
          action={
            <Link to="/products">
              <Button>Shop products</Button>
            </Link>
          }
          description="Your selected products will appear here."
          title="Your cart is empty"
        />
      </section>
    );
  }

  return (
    <section className="page-shell grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="mb-6 text-4xl font-black text-slate-950 dark:text-white">Cart</h1>
        <div className="grid gap-4">
          {items.map((item) => {
            const productId = getProductId(item.product);

            return (
              <article className="glass-panel grid gap-4 rounded-3xl p-4 sm:grid-cols-[120px_1fr_auto]" key={productId}>
                <img alt={item.product.name} className="aspect-square rounded-2xl object-cover" src={getProductImage(item.product)} />
                <div>
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white">{item.product.name}</h2>
                  <p className="mt-2 font-semibold text-slate-600 dark:text-slate-300">{formatCurrency(item.product.price)}</p>
                  <input
                    aria-label="Quantity"
                    className="input-field mt-4 max-w-24"
                    min="1"
                    onChange={(event) => updateItem(productId, Number(event.target.value))}
                    type="number"
                    value={item.quantity}
                  />
                </div>
                <button className="icon-button self-start" onClick={() => removeItem(productId)} type="button">
                  <Trash2 aria-hidden className="size-5" />
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="glass-panel h-fit rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Order summary</h2>
        <div className="mt-6 flex justify-between border-b border-slate-200 pb-4 dark:border-white/10">
          <span className="text-slate-600 dark:text-slate-300">Subtotal</span>
          <span className="font-bold">{formatCurrency(total)}</span>
        </div>
        <div className="mt-4 flex justify-between text-lg font-black">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <Link to="/checkout">
          <Button className="mt-6 w-full">Checkout</Button>
        </Link>
      </aside>
    </section>
  );
};

export default Cart;
