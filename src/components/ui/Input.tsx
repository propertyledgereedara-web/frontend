import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: Props) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-slate-700/40 bg-slate-950/30",
        "px-3 py-3 text-slate-200 outline-none",
        "focus:ring-2 focus:ring-indigo-400/40",
        className,
      ].join(" ")}
    />
  );
}
