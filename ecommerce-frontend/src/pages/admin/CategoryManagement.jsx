import SectionHeader from "../../components/common/SectionHeader";

export default function CategoryManagement() {
  return (
    <section className="page-shell py-10">
      <SectionHeader
        eyebrow="Manage"
        title="Categories"
        description="Create and manage product categories"
      />
      <div className="mt-8 rounded-lg border-2 border-dashed border-slate-300 p-12 text-center dark:border-slate-600">
        <p className="text-slate-600 dark:text-slate-400">
          Category management interface coming soon
        </p>
      </div>
    </section>
  );
}
