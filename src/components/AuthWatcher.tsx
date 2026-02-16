"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthExpired } from "@/lib/authEvents";

export default function AuthWatcher() {
  const router = useRouter();

  useEffect(() => {
    return onAuthExpired(() => {
      router.push("/login?reason=expired");
    });
  }, [router]);

  return null;
}
