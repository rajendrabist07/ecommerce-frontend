const SectionHeader = ({ eyebrow, title, description, action }) => (
  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      ) : null}
    </div>
    {action}
  </div>
);

export default SectionHeader;
