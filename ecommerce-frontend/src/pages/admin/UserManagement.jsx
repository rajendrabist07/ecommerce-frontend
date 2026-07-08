import SectionHeader from "../../components/common/SectionHeader";

export default function UserManagement() {
  return (
    <section className="page-shell py-10">
      <SectionHeader
        eyebrow="Manage"
        title="Users"
        description="Manage customer accounts and roles"
      />
      <div className="mt-8 rounded-lg border-2 border-dashed border-slate-300 p-12 text-center dark:border-slate-600">
        <p className="text-slate-600 dark:text-slate-400">
          User management interface coming soon
        </p>
      </div>
    </section>
  );
}
