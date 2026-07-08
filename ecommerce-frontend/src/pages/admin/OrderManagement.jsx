import SectionHeader from "../../components/common/SectionHeader";

export default function OrderManagement() {
  return (
    <section className="page-shell py-10">
      <SectionHeader
        eyebrow="Manage"
        title="Orders"
        description="Track and manage customer orders"
      />
      <div className="mt-8 rounded-lg border-2 border-dashed border-slate-300 p-12 text-center dark:border-slate-600">
        <p className="text-slate-600 dark:text-slate-400">
          Order management interface coming soon
        </p>
      </div>
    </section>
  );
}
