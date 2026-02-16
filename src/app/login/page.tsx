"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { api, setToken, clearToken } from "@/lib/api";

import Layout from "@/components/Layout";
import PublicHeader from "@/components/PublicHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Field } from "@/components/ui/Field";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const reason = params.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Trim email to avoid invisible whitespace login failures
      const res = await api.login({ email: email.trim(), password });
      setToken(res.token);
      router.push("/app");
    } catch (err: any) {
      clearToken();
      setError(err?.message ?? "Login failed");
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
            title="Login to Asseta"
            subtitle="Access your properties, transactions, and EOFY summaries."
            className="w-full max-w-[560px]"
          >
            {reason === "expired" && (
              <div className="mb-4 rounded-xl border border-amber-400/25 bg-amber-500/10 p-3 text-sm font-semibold text-amber-100">
                Your session expired. Please log in again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <Field label="Email">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </Field>

              <Field label="Password">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </Field>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-semibold text-red-200">
                  {error}
                </div>
              )}
            </form>

            <div className="my-5 h-px bg-slate-700/30" />

            <div className="text-sm text-slate-400">
              No account?{" "}
              <Link
                href="/register"
                className="font-bold text-indigo-200 hover:text-indigo-100"
              >
                Create one
              </Link>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}
