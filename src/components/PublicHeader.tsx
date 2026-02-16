import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="mx-auto w-full max-w-[1400px] px-6 pt-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-100">
          Asseta
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-slate-300 hover:text-slate-100">
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full border border-indigo-400/45 bg-indigo-500/15 px-3 py-2 text-sm font-bold text-slate-100 hover:bg-indigo-500/25"
          >
            Create account
          </Link>
        </nav>
      </div>
    </header>
  );
}
