import SectionHeader from "../../components/common/SectionHeader";
import { BarChart3, TrendingUp, Users, ShoppingBag } from "lucide-react";

const stats = [
    { icon: TrendingUp, label: "Total Revenue", value: "NPR 0", change: "+0%" },
    { icon: ShoppingBag, label: "Total Orders", value: "0", change: "+0%" },
    { icon: Users, label: "Total Customers", value: "0", change: "+0%" },
    { icon: BarChart3, label: "Total Products", value: "0", change: "+0%" },
];

export default function AdminAnalytics() {
    return (
        <section className="page-shell py-10">
            <SectionHeader
                eyebrow="Analytics"
                title="Dashboard"
                description="Sales and performance metrics"
            />

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="glass-panel rounded-lg p-6"
                    >
                        <stat.icon size={24} className="mb-3 text-slate-500" />
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {stat.label}
                        </h3>
                        <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                            {stat.value}
                        </p>
                        <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                            {stat.change}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded-lg border-2 border-dashed border-slate-300 p-12 text-center dark:border-slate-600">
                <p className="text-slate-600 dark:text-slate-400">
                    Advanced analytics coming soon
                </p>
            </div>
        </section>
    );
}
