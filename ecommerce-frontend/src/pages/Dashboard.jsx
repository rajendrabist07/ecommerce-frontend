import { BarChart3, Heart, Package, ShoppingBag, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/common/SectionHeader";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Dashboard = () => {
  const { isAdmin, user } = useAuth();
  const { count } = useCart();

  const cards = [
    { icon: UserRound, label: "Profile", to: "/profile", value: user?.name || "Customer" },
    { icon: ShoppingBag, label: "Cart", to: "/cart", value: `${count} items` },
    { icon: Heart, label: "Wishlist", to: "/wishlist", value: "Saved products" },
    { icon: Package, label: "Orders", to: "/orders", value: "Track purchases" },
    ...(isAdmin ? [{ icon: BarChart3, label: "Admin", to: "/admin", value: "Manage store" }] : []),
  ];

  return (
    <section className="page-shell py-10">
      <SectionHeader
        eyebrow="Account"
        title={`Welcome${user?.name ? `, ${user.name}` : ""}`}
        description="Manage your commerce activity from a clean, focused workspace."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link className="glass-panel rounded-3xl p-6 transition hover:-translate-y-1" key={card.label} to={card.to}>
            <card.icon aria-hidden className="mb-5 size-7 text-slate-500 dark:text-slate-300" />
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">{card.label}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{card.value}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
