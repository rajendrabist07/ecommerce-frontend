import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { cx } from "../../utils/formatters";
import Button from "../common/Button";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Dashboard", to: "/dashboard" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { count } = useCart();
  const { isAuthenticated, signOut } = useAuth();
  const { setTheme, theme } = useTheme();

  const nextTheme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6">
      <nav className="mx-auto max-w-7xl rounded-3xl border border-white/45 bg-white/70 px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/55">
        <div className="flex items-center justify-between gap-4">
          <Link className="flex items-center gap-3" to="/">
            <span className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950">
              RS
            </span>
            <span>
              <span className="block text-base font-bold leading-5 text-slate-950 dark:text-white">
                Rajendra Store
              </span>
              <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                Premium MERN Commerce
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cx(
                    "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                    isActive
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
                  )
                }
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              aria-label="Search products"
              className="icon-button hidden sm:grid"
              to="/products"
            >
              <Search aria-hidden className="size-5" />
            </Link>
            <Link aria-label="Wishlist" className="icon-button hidden sm:grid" to="/wishlist">
              <Heart aria-hidden className="size-5" />
            </Link>
            <Link aria-label="Cart" className="icon-button relative" to="/cart">
              <ShoppingBag aria-hidden className="size-5" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
                  {count}
                </span>
              ) : null}
            </Link>
            <button
              aria-label="Change theme"
              className="icon-button"
              onClick={() => setTheme(nextTheme)}
              type="button"
            >
              {theme === "dark" ? <Moon aria-hidden className="size-5" /> : <Sun aria-hidden className="size-5" />}
            </button>
            {isAuthenticated ? (
              <Button className="hidden sm:inline-flex" onClick={signOut} variant="secondary">
                Logout
              </Button>
            ) : (
              <Link className="hidden sm:block" to="/login">
                <Button icon={User} variant="secondary">
                  Login
                </Button>
              </Link>
            )}
            <button className="icon-button lg:hidden" onClick={() => setIsOpen((value) => !value)} type="button">
              {isOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="mt-4 grid gap-2 border-t border-slate-200 pt-4 dark:border-white/10 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-white/10"
                key={item.to}
                onClick={() => setIsOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
            <Link className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200" to="/login">
              Login / Register
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Navbar;
