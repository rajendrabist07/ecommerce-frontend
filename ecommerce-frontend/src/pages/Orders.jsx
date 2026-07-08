import { useEffect, useState } from "react";
import { EmptyState, ErrorState } from "../components/common/StatusState";
import { getMyOrders } from "../services/orderService";
import { formatCurrency } from "../utils/formatters";

const normalizeOrders = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.orders)) return payload.orders;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrders(normalizeOrders(await getMyOrders()));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="page-shell py-10">
      <h1 className="mb-8 text-4xl font-black text-slate-950 dark:text-white">Orders</h1>
      {loading ? <p className="text-slate-600 dark:text-slate-300">Loading orders...</p> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error && orders.length === 0 ? <EmptyState description="Your completed purchases will appear here." title="No orders yet" /> : null}
      {!loading && !error && orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <article className="glass-panel rounded-3xl p-5" key={order._id || order.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-bold text-slate-950 dark:text-white">Order #{String(order._id || order.id).slice(-8)}</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{order.status || "Processing"}</p>
                </div>
                <p className="text-xl font-black">{formatCurrency(order.totalPrice || order.total || 0)}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default Orders;
