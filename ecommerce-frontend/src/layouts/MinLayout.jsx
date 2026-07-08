import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_48%,#f8fafc_100%)] text-slate-950 antialiased dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.15),transparent_32%),linear-gradient(180deg,#020617_0%,#0f172a_48%,#020617_100%)] dark:text-white">
      <Navbar />
      <main className="min-h-screen pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
