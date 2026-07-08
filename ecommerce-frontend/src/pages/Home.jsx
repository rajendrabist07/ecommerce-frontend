import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Categories from "../components/home/Categories";
import Button from "../components/common/Button";

const Home = () => {
  return (
    <>
      <section className="page-shell grid min-h-[calc(100vh-6rem)] items-center gap-10 py-10 lg:grid-cols-[1fr_0.86fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <p className="mb-5 inline-flex rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-bold text-slate-600 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
            Modern MERN commerce platform
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            Rajendra Store
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Premium, fast, and responsive shopping experience connected to your existing Node, Express, and MongoDB backend.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/products">
              <Button icon={ArrowRight}>Shop products</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Create account</Button>
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Sparkles, label: "Liquid glass UI" },
              { icon: Truck, label: "Fast checkout" },
              { icon: ShieldCheck, label: "JWT protected" },
            ].map((item) => (
              <div className="glass-panel rounded-3xl p-4" key={item.label}>
                <item.icon aria-hidden className="mb-3 size-5 text-slate-600 dark:text-slate-300" />
                <p className="font-semibold text-slate-800 dark:text-slate-100">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-panel overflow-hidden rounded-[2rem] p-3">
            <img
              alt="Premium ecommerce product showcase"
              className="h-[520px] w-full rounded-[1.5rem] object-cover"
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400&auto=format&fit=crop"
            />
          </div>
        </motion.div>
      </section>

      <FeaturedProducts />
      <Categories />
    </>
  );
};

export default Home;
