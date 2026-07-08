import { Loader2 } from "lucide-react";
import { cx } from "../../utils/formatters";

const variants = {
  ghost: "text-slate-700 hover:bg-white/50 dark:text-slate-200 dark:hover:bg-white/10",
  primary:
    "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
  secondary:
    "border border-white/30 bg-white/55 text-slate-900 shadow-sm hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
};

const Button = ({
  children,
  className,
  disabled,
  icon: Icon,
  isLoading = false,
  type = "button",
  variant = "primary",
  ...props
}) => (
  <button
    className={cx(
      "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-950",
      variants[variant],
      className,
    )}
    disabled={disabled || isLoading}
    type={type}
    {...props}
  >
    {isLoading ? <Loader2 aria-hidden className="size-4 animate-spin" /> : Icon ? <Icon aria-hidden className="size-4" /> : null}
    {children}
  </button>
);

export default Button;
