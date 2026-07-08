import { BarChart3, Boxes, PackageCheck, UsersRound } from "lucide-react";

const metrics = [
  { icon: BarChart3, label: "Revenue", value: "NPR 0" },
  { icon: Boxes, label: "Products", value: "API ready" },
  { icon: PackageCheck, label: "Orders", value: "Manage" },
  { icon: UsersRound, label: "Users", value: "JWT role-based" },
];

const Admin = () => (
  <section className="page-shell py-10">
    <h1 className="text-4xl font-black text-slate-950 dark:text-white">Admin dashboard</h1>
    <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
      Management surface for products, categories, orders, users, analytics, and Cloudinary image workflows.
    </p>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <article className="glass-panel rounded-3xl p-6" key={metric.label}>
          <metric.icon aria-hidden className="mb-5 size-7 text-slate-500 dark:text-slate-300" />
          <h2 className="text-xl font-bold">{metric.label}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{metric.value}</p>
        </article>
      ))}
    </div>
    <div className="glass-panel mt-8 overflow-hidden rounded-3xl">
      <div className="grid grid-cols-4 border-b border-slate-200 p-4 text-sm font-bold text-slate-500 dark:border-white/10 dark:text-slate-400">
        <span>Module</span>
        <span>Create</span>
        <span>Update</span>
        <span>Delete</span>
      </div>
      {["Products", "Categories", "Orders", "Users"].map((module) => (
        <div className="grid grid-cols-4 border-b border-slate-200 p-4 text-sm dark:border-white/10" key={module}>
          <span className="font-bold">{module}</span>
          <span>Ready</span>
          <span>Ready</span>
          <span>Ready</span>
        </div>
      ))}
    </div>
  </section>
);

export default Admin;
