import { Link } from "react-router-dom";
import SectionHeader from "../../components/common/SectionHeader";
import Button from "../../components/common/Button";

export default function UserSettings() {
    return (
        <section className="page-shell py-10">
            <SectionHeader
                eyebrow="Account"
                title="Settings"
                description="Manage your account preferences"
            />

            <div className="mt-8 space-y-4">
                <Link to="/profile">
                    <div className="glass-panel rounded-lg p-6 transition hover:bg-slate-100 dark:hover:bg-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white">Profile Information</h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Update your personal details
                        </p>
                    </div>
                </Link>

                <div className="glass-panel rounded-lg p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Email preferences and alerts (coming soon)
                    </p>
                </div>

                <div className="glass-panel rounded-lg p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white">Security</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Change password and security settings (coming soon)
                    </p>
                </div>
            </div>
        </section>
    );
}
