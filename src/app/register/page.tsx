"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, setToken } from "@/lib/api";

import Layout from "@/components/Layout";
import PublicHeader from "@/components/PublicHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Field } from "@/components/ui/Field";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.register(form);
      setToken(res.token);
      router.push("/app");
    } catch (err: any) {
      setError(err?.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PublicHeader />

      <Layout>
        <div className="flex justify-center pt-6">
          <Card
            title="Create your Asseta account"
            subtitle="Start free — add a property and record transactions in minutes."
            className="w-full max-w-[560px]"
          >
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="First name">
                  <Input
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="Nikith"
                    autoComplete="given-name"
                  />
                </Field>

                <Field label="Last name">
                  <Input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Eedara"
                    autoComplete="family-name"
                  />
                </Field>
              </div>

              <Field label="Email">
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </Field>

              <Field label="Password">
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                />
              </Field>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create account"}
              </Button>

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-semibold text-red-200">
                  {error}
                </div>
              )}
            </form>

            <div className="my-5 h-px bg-slate-700/30" />

            <div className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-indigo-200 hover:text-indigo-100">
                Login
              </Link>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}
