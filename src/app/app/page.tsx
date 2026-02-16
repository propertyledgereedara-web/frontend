"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, getToken } from "@/lib/api";
import AppHeader from "@/components/AppHeader";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Field } from "@/components/ui/Field";

export default function AppPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    address: "",
    purchaseDate: "",
    purchasePrice: "",
    ownershipPercentage: "100",
  });

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    setError("");
    try {
      const data = await api.listProperties();
      setProperties(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load properties.");
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await api.createProperty({
        address: form.address,
        purchaseDate: form.purchaseDate,
        purchasePrice: Number(form.purchasePrice),
        ownershipPercentage: Number(form.ownershipPercentage),
      });

      setForm({
        address: "",
        purchaseDate: "",
        purchasePrice: "",
        ownershipPercentage: "100",
      });

      load();
    } catch (err: any) {
      setError(err.message ?? "Failed to create property.");
    }
  }

  return (
    <>
      <AppHeader />
      <Layout>
        <div className="mb-6">
          <div className="inline-flex items-center rounded-full border border-slate-700/40 bg-slate-900/50 px-3 py-2 text-xs font-bold text-slate-300">
            Dashboard • Properties
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-50">
            Your <span className="bg-gradient-to-r from-indigo-200 via-emerald-200 to-sky-200 bg-clip-text text-transparent">properties</span>
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            Add properties, then drill in to record transactions and generate EOFY summaries.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-semibold text-red-200">
            {error}
          </div>
        )}

        <Card
          title="Your properties"
          subtitle="Click a property to manage transactions and view reports."
          className="mb-4"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead className="border-b border-slate-700/40 text-xs font-extrabold uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="py-3 pr-3 text-left">Address</th>
                  <th className="py-3 px-3 text-right">Purchase price</th>
                  <th className="py-3 pl-3 text-right">Ownership %</th>
                </tr>
              </thead>

              <tbody>
                {properties.map((p) => (
                  <tr key={p.id} className="border-b border-slate-800/60">
                    <td className="py-4 pr-3 font-extrabold">
                      <Link href={`/app/${p.id}`} className="text-slate-100 hover:text-indigo-200">
                        {p.address}
                      </Link>
                    </td>

                    <td className="py-4 px-3 text-right tabular-nums text-slate-200">
                      ${Number(p.purchasePrice ?? 0).toFixed(2)}
                    </td>

                    <td className="py-4 pl-3 text-right tabular-nums text-slate-200">
                      {Number(p.ownershipPercentage ?? 100).toFixed(2)}
                    </td>
                  </tr>
                ))}

                {properties.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-6 text-slate-400">
                      No properties yet. Add one below.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Add property" subtitle="Store purchase details and ownership percentage.">
          <form onSubmit={handleCreate} className="grid gap-4">
            <Field label="Address">
              <Input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="1 George St, Sydney NSW"
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Purchase date">
                <Input
                  type="date"
                  value={form.purchaseDate}
                  onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
                />
              </Field>

              <Field label="Purchase price">
                <Input
                  type="number"
                  step="0.01"
                  value={form.purchasePrice}
                  onChange={(e) => setForm({ ...form, purchasePrice: e.target.value })}
                  placeholder="0.00"
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Ownership %">
                <Input
                  type="number"
                  step="0.01"
                  value={form.ownershipPercentage}
                  onChange={(e) => setForm({ ...form, ownershipPercentage: e.target.value })}
                  placeholder="100"
                />
              </Field>

              <div className="flex items-end">
                <Button type="submit" className="w-full">
                  Create property
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </Layout>
    </>
  );
}
