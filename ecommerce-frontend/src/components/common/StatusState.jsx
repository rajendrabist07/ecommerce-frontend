import { AlertTriangle, PackageSearch } from "lucide-react";
import Button from "./Button";

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: count }).map((_, index) => (
      <div
        className="glass-panel overflow-hidden rounded-3xl border border-white/40 p-3 dark:border-white/10"
        key={index}
      >
        <div className="h-56 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-3 p-3">
          <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

export const EmptyState = ({ title = "No results found", description, action }) => (
  <div className="glass-panel mx-auto flex max-w-xl flex-col items-center rounded-3xl px-8 py-14 text-center">
    <PackageSearch aria-hidden className="mb-4 size-10 text-slate-400" />
    <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{title}</h2>
    {description ? <p className="mt-3 text-slate-600 dark:text-slate-300">{description}</p> : null}
    {action ? <div className="mt-6">{action}</div> : null}
  </div>
);

export const ErrorState = ({ message = "Something went wrong.", onRetry }) => (
  <div className="glass-panel mx-auto flex max-w-xl flex-col items-center rounded-3xl px-8 py-14 text-center">
    <AlertTriangle aria-hidden className="mb-4 size-10 text-rose-500" />
    <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Unable to load</h2>
    <p className="mt-3 text-slate-600 dark:text-slate-300">{message}</p>
    {onRetry ? (
      <Button className="mt-6" onClick={onRetry}>
        Try again
      </Button>
    ) : null}
  </div>
);
