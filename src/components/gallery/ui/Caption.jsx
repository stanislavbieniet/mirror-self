"use client";

export default function Caption({ label, title, subtitle }) {
  return (
    <div className="pointer-events-none absolute top-4 left-4 rounded-xl bg-slate-950/55 px-4 py-3">
      <p className="text-[0.7rem] uppercase tracking-[0.25em] text-slate-300/80">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-50">{title}</p>
      {subtitle ? (
        <p className="mt-1 text-xs text-slate-200/70">{subtitle}</p>
      ) : null}
    </div>
  );
}
