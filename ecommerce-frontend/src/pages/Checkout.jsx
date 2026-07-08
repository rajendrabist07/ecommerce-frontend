import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { formatCurrency } from "../utils/formatters";

const Checkout = () => {
  const navigate = useNavigate();
  const { clearCart, items, total } = useCart();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      items: items.map((item) => ({ product: item.product._id || item.product.id, quantity: item.quantity })),
      shippingAddress: Object.fromEntries(form.entries()),
      totalPrice: total,
    };

    try {
      await createOrder(payload);
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <form className="glass-panel rounded-3xl p-6" onSubmit={submitOrder}>
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Checkout</h1>
        {error ? <p className="mt-5 rounded-2xl bg-rose-500/10 p-3 text-sm font-semibold text-rose-600">{error}</p> : null}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {["Full name", "Phone", "City", "Postal code", "Street address", "Country"].map((label) => (
            <label className={label === "Street address" ? "sm:col-span-2" : ""} key={label}>
              <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">{label}</span>
              <input className="input-field" name={label.toLowerCase().replaceAll(" ", "_")} required />
            </label>
          ))}
        </div>
        <Button className="mt-6 w-full sm:w-auto" disabled={items.length === 0} isLoading={loading} type="submit">
          Place order
        </Button>
      </form>

      <aside className="glass-panel h-fit rounded-3xl p-6">
        <h2 className="text-2xl font-bold">Summary</h2>
        <div className="mt-4 grid gap-3">
          {items.map((item) => (
            <div className="flex justify-between gap-3 text-sm" key={item.product._id || item.product.id}>
              <span className="text-slate-600 dark:text-slate-300">{item.product.name} x {item.quantity}</span>
              <span className="font-bold">{formatCurrency(Number(item.product.price || 0) * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between border-t border-slate-200 pt-5 text-lg font-black dark:border-white/10">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </aside>
    </section>
  );
};

export default Checkout;
