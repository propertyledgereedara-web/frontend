"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api, getToken } from "@/lib/api";
import AppHeader from "@/components/AppHeader";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Field } from "@/components/ui/Field";

export default function PropertyDetailPage() {
  const { propertyId } = useParams();
  const router = useRouter();

  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [error, setError] = useState("");

  const fyOptions = useMemo(() => generateFinancialYears(), []);
  const [fy, setFy] = useState(fyOptions[0]);

  const [form, setForm] = useState({
    type: "EXPENSE",
    category: "INTEREST",
    amount: "",
    date: "",
    notes: "",
  });

  const expenseCategories = [
    "INTEREST",
    "COUNCIL_RATES",
    "WATER_CHARGES",
    "INSURANCE",
    "REPAIRS_MAINTENANCE",
    "PROPERTY_MANAGEMENT_FEES",
    "BODY_CORPORATE",
    "ADVERTISING",
    "LEGAL_FEES",
    "BORROWING_EXPENSES",
    "DEPRECIATION",
    "OTHER",
  ];

  useEffect(() => {
    if (!getToken()) router.push("/login");
  }, [router]);

  useEffect(() => {
    if (propertyId) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  useEffect(() => {
    if (form.type === "INCOME") {
      setForm((f) => ({ ...f, category: "RENTAL_INCOME" }));
    } else {
      setForm((f) => ({ ...f, category: "INTEREST" }));
    }
  }, [form.type]);

  async function load() {
    setError("");
    try {
      const data = await api.listTransactions(propertyId as string);
      setTransactions(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load transactions.");
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await api.createTransaction({
        propertyId,
        type: form.type,
        category: form.category,
        amount: Number(form.amount),
        date: form.date,
        notes: form.notes,
      });

      setForm({
        type: "EXPENSE",
        category: "INTEREST",
        amount: "",
        date: "",
        notes: "",
      });

      load();
    } catch (err: any) {
      setError(err.message ?? "Failed to add transaction.");
    }
  }

  async function loadSummary() {
    setError("");
    try {
      const data = await api.taxSummary(propertyId as string, fy);
      setSummary(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load summary.");
    }
  }

  return (
    <>
      <AppHeader />
      <Layout>
        <div className="mb-6">
          <div className="inline-flex items-center rounded-full border border-slate-700/40 bg-slate-900/50 px-3 py-2 text-xs font-bold text-slate-300">
            Property • Transactions & EOFY summary
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-50">
            Manage{" "}
            <span className="bg-gradient-to-r from-indigo-200 via-emerald-200 to-sky-200 bg-clip-text text-transparent">
              transactions
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            Record income and expenses by ATO category, then generate an EOFY-ready summary.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-semibold text-red-200">
            {error}
          </div>
        )}

        <Card title="Transactions" subtitle="Record income and expenses for this property." className="mb-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">
              <thead className="border-b border-slate-700/40 text-xs font-extrabold uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="py-3 pr-3 text-left">Date</th>
                  <th className="py-3 px-3 text-left">Type</th>
                  <th className="py-3 px-3 text-left">Category</th>
                  <th className="py-3 pl-3 text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-slate-800/60">
                    <td className="py-4 pr-3 text-slate-200">{t.date}</td>

                    <td className="py-4 px-3">
                      <span
                        className={[
                          "inline-flex rounded-full px-3 py-1 text-xs font-extrabold border",
                          t.type === "INCOME"
                            ? "border-emerald-400/35 bg-emerald-500/10 text-emerald-100"
                            : "border-indigo-400/35 bg-indigo-500/10 text-indigo-100",
                        ].join(" ")}
                      >
                        {t.type}
                      </span>
                    </td>

                    <td className="py-4 px-3 text-slate-200">{t.category}</td>

                    <td className="py-4 pl-3 text-right tabular-nums text-slate-200">
                      ${Number(t.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}

                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-slate-400">
                      No transactions yet. Add one below.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Add transaction" subtitle="Capture an income or expense entry with category and date.">
            <form onSubmit={handleAdd} className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Type">
                  <Select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </Select>
                </Field>

                <Field label="Category">
                  <Select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    {form.type === "INCOME" ? (
                      <option value="RENTAL_INCOME">RENTAL_INCOME</option>
                    ) : (
                      expenseCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))
                    )}
                  </Select>
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Amount">
                  <Input
                    type="number"
                    step="0.01"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </Field>

                <Field label="Date">
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </Field>
              </div>

              <Field label="Notes">
                <Input
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Optional"
                />
              </Field>

              <Button type="submit">Add transaction</Button>
            </form>
          </Card>

          <Card title="Tax summary" subtitle="Select a financial year to view totals and category breakdown.">
            <div className="flex flex-wrap items-center gap-3">
              <Select value={fy} onChange={(e) => setFy(e.target.value)} className="max-w-[240px]">
                {fyOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </Select>

              <Button variant="secondary" type="button" onClick={loadSummary}>
                Load summary
              </Button>
            </div>

            {summary && (
              <div className="mt-5">
                <div className="h-px bg-slate-700/30" />

                <div className="mt-4 grid gap-3">
                  <Metric label="Income" value={summary.incomeTotal} />
                  <Metric label="Expenses" value={summary.expenseTotal} />
                  <Metric label="Net position" value={summary.netPosition} />
                </div>

                <div className="my-4 h-px bg-slate-700/30" />

                <div className="text-sm font-extrabold text-slate-100">Expense breakdown</div>

                <div className="mt-3 grid gap-2 rounded-2xl border border-slate-700/30 bg-slate-950/20 p-4">
                  {Object.entries(summary.expenseBreakdown ?? {}).map(([cat, value]) => (
                    <div key={cat} className="flex items-center justify-between gap-3 text-sm">
                      <div className="text-slate-300">{cat}</div>
                      <div className="tabular-nums text-slate-100">
                        ${Number(value).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </Layout>
    </>
  );
}

function Metric({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex items-baseline justify-between gap-3 rounded-2xl border border-slate-700/30 bg-slate-950/20 px-4 py-3">
      <div className="text-sm font-extrabold text-slate-300">{label}</div>
      <div className="text-lg font-extrabold tabular-nums text-slate-50">
        ${Number(value ?? 0).toFixed(2)}
      </div>
    </div>
  );
}

function generateFinancialYears() {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let i = 0; i < 5; i++) {
    const start = currentYear - i;
    years.push(`${start}-${start + 1}`);
  }
  return years;
}
