"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();

  return (
    <header className="mx-auto w-full max-w-[1400px] px-6 pt-6">
      <div className="flex items-center justify-between">
        <Link href="/app" className="text-lg font-extrabold tracking-tight text-slate-100">
          Asseta
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/app" className="text-sm text-slate-300 hover:text-slate-100">
            Home
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="rounded-full border border-slate-700/40 bg-slate-900/60 px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-900/80"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
