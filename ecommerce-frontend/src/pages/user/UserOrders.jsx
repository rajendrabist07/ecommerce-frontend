import SectionHeader from "../../components/common/SectionHeader";
import { Package } from "lucide-react";

export default function UserOrders() {
  const orders = [];

  return (
    <section className="page-shell py-10">
      <SectionHeader
        eyebrow="Orders"
        title="Your Orders"
        description="Track and manage your purchases"
      />

      <div className="mt-8">
        {orders.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-slate-300 p-12 text-center dark:border-slate-600">
            <Package size={48} className="mx-auto mb-4 text-slate-400" />
            <p className="text-slate-600 dark:text-slate-400">
              You haven't placed any orders yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="glass-panel rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Order #{order._id}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white">
                      NPR {order.total}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {order.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
