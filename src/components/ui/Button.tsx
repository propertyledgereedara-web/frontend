import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold " +
    "border transition focus:outline-none focus:ring-2 focus:ring-indigo-400/40";

  const styles =
    variant === "primary"
      ? "border-indigo-400/60 bg-indigo-500/25 text-slate-50 hover:bg-indigo-500/35"
      : "border-slate-700/40 bg-slate-900/60 text-slate-200 hover:bg-slate-900/80";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
