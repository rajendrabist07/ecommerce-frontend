import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc,#eef2ff)] px-4 py-10 dark:bg-[linear-gradient(180deg,#020617,#0f172a)]">
            <div className="mx-auto max-w-md">
                <Outlet />
            </div>
        </main>
    );
}
