import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <section className="page-shell py-10">
      <div className="glass-panel max-w-2xl rounded-3xl p-6">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Profile</h1>
        <div className="mt-8 grid gap-4">
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Name</span>
            <input className="input-field" defaultValue={user?.name || ""} />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</span>
            <input className="input-field" defaultValue={user?.email || ""} />
          </label>
        </div>
      </div>
    </section>
  );
};

export default Profile;
