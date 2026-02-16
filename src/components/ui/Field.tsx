import React from "react";

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-bold text-slate-300">{label}</div>
      {children}
    </label>
  );
}
