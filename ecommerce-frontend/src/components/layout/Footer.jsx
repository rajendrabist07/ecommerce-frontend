import { ArrowRight, Code2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/40 bg-white/45 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Rajendra Store</h2>
          <p className="mt-3 max-w-md leading-7 text-slate-600 dark:text-slate-300">
            A modern MERN commerce experience with clean architecture, responsive UI, and premium product discovery.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="icon-button" href="mailto:support@rajendrestore.com" aria-label="Email support">
              <Mail aria-hidden className="size-5" />
            </a>
            <a className="icon-button" href="https://github.com" aria-label="GitHub">
              <Code2 aria-hidden className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Shop</h3>
          <div className="mt-4 grid gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link to="/products">Products</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/orders">Orders</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Newsletter
          </h3>
          <form className="mt-4 flex gap-2">
            <input
              aria-label="Email address"
              className="input-field min-w-0 flex-1"
              placeholder="you@example.com"
              type="email"
            />
            <Button aria-label="Subscribe" icon={ArrowRight} type="submit" />
          </form>
        </div>
      </div>
      <div className="border-t border-white/40 px-6 py-5 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
        © 2026 Rajendra Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
