"use client";

import Link from "next/link";
import Layout from "@/components/Layout";
import PublicHeader from "@/components/PublicHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <>
      <PublicHeader />

      <Layout>
        {/* Hero */}
        <section className="pt-10 pb-6">
          <div className="inline-flex items-center rounded-full border border-slate-700/40 bg-slate-900/50 px-3 py-2 text-xs font-bold text-slate-300">
            Built for Australian landlords • EOFY-ready
          </div>

          <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-[-0.06em] text-slate-50 sm:text-6xl">
            Rental property tax,{" "}
            <span className="bg-gradient-to-r from-indigo-200 via-emerald-200 to-sky-200 bg-clip-text text-transparent">
              done properly
            </span>
            .
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-7 text-slate-300">
            Track income and expenses by ATO category, automatically group by Australian
            financial year, and generate a clean summary your accountant will actually love.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/register">
              <Button>Start free</Button>
            </Link>

            <Link href="/app">
              <Button variant="secondary">Go to dashboard</Button>
            </Link>
          </div>

          <div className="mt-3 text-sm text-slate-400">
            No credit card. MVP beta access. Your data is isolated per account.
          </div>
        </section>

        {/* Feature grid */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="ATO categories" subtitle="Structured expenses by category.">
            <p className="text-sm leading-6 text-slate-300">
              Record expenses in a structured way (interest, rates, insurance, repairs, etc.)
              so your reporting is clean.
            </p>
          </Card>

          <Card title="Australian financial years" subtitle="Automatic FY grouping.">
            <p className="text-sm leading-6 text-slate-300">
              Transactions are automatically assigned to the correct FY (e.g. 2025–2026)
              so EOFY reporting is effortless.
            </p>
          </Card>

          <Card title="Tax summary" subtitle="Totals + breakdown, ready to send.">
            <p className="text-sm leading-6 text-slate-300">
              View totals, net position, and an expense breakdown by category — ready to
              send to your accountant.
            </p>
          </Card>
        </section>

        {/* How it works */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-slate-50">How it works</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <Step
              num="1"
              title="Add your property"
              body="Store purchase details and ownership percentage."
            />
            <Step
              num="2"
              title="Record transactions"
              body="Add income and expenses, categorised for ATO reporting."
            />
            <Step
              num="3"
              title="Generate EOFY summary"
              body="Select financial year and view totals + category breakdown."
            />
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-12 rounded-2xl border border-slate-700/30 bg-gradient-to-r from-indigo-500/20 via-emerald-500/10 to-sky-500/10 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-base font-extrabold text-slate-50">
                Ready to simplify your rental property tax?
              </div>
              <div className="mt-1 text-sm text-slate-300">
                Start with a free account and generate a clean summary in minutes.
              </div>
            </div>

            <Link href="/register">
              <Button>Create free account</Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12">
          <div className="h-px bg-slate-700/30" />
          <div className="py-4 text-sm text-slate-400">
            © {new Date().getFullYear()} Asseta • MVP Beta
          </div>
        </footer>
      </Layout>
    </>
  );
}

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-700/30 bg-slate-900/50 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/35 bg-emerald-500/10 text-sm font-extrabold text-emerald-100">
        {num}
      </div>
      <div>
        <div className="font-extrabold text-slate-50">{title}</div>
        <div className="mt-1 text-sm leading-6 text-slate-300">{body}</div>
      </div>
    </div>
  );
}

// export default function Page() {
//   return (
//     <div className="p-10">
//       <h1 className="text-4xl font-extrabold text-indigo-300">Tailwind works</h1>
//     </div>
//   );
// }
