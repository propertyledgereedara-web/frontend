import React from "react";

export function Card({
  title,
  subtitle,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "rounded-2xl border border-slate-700/30 bg-slate-900/50 p-6",
        "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
        className,
      ].join(" ")}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <div className="text-lg font-extrabold text-slate-50">{title}</div>}
          {subtitle && <div className="mt-1 text-sm text-slate-300">{subtitle}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
