"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ fontWeight: 900, fontSize: 18, color: "#f8fafc" }}>
            Asseta Dashboard
          </div>
          <div className="muted" style={{ fontSize: 13 }}>
            Track properties, transactions, and EOFY summaries.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/" className="navLink">
            Home
          </Link>
          <button className="btnSecondary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}
