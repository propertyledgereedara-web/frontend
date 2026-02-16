// src/lib/api.ts
import { emitAuthExpired } from "@/lib/authEvents";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export function getToken(): string | null {
  return typeof window === "undefined" ? null : localStorage.getItem("token");
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem("token");
}

async function parseError(res: Response): Promise<string> {
  const text = await res.text().catch(() => "");
  if (!text) return `HTTP ${res.status}`;

  try {
    const j = JSON.parse(text);
    if (typeof j?.message === "string" && j.message.trim()) return j.message;
    if (typeof j?.error === "string" && j.error.trim()) return j.error;
    return text;
  } catch {
    return text;
  }
}

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(opts.headers as Record<string, string> | undefined),
  };

  // Only set content-type when there is a body
  if (opts.body != null && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  // Never attach Authorization to auth endpoints
  const isAuthEndpoint = path.startsWith("/api/auth/");
  if (!isAuthEndpoint && token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, { ...opts, headers });

  if (!res.ok) {
    // Global auth expiry handling for protected calls
    if (!isAuthEndpoint && (res.status === 401 || res.status === 403)) {
      clearToken();
      emitAuthExpired();
      throw new Error("Session expired. Please log in again.");
    }

    const msg = await parseError(res);
    throw new Error(msg);
  }

  // Handle 204 No Content
  if (res.status === 204) return undefined as unknown as T;

  // Handle empty body with 200
  const text = await res.text().catch(() => "");
  if (!text) return undefined as unknown as T;

  return JSON.parse(text) as T;
}

export const api = {
  register: (body: any) =>
    request<{ token: string; expiresInSeconds: number }>(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  login: (body: any) =>
    request<{ token: string; expiresInSeconds: number }>(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  listProperties: () => request<any[]>(`/api/properties`),

  createProperty: (body: any) =>
    request<any>(`/api/properties`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  listTransactions: (propertyId: string) =>
    request<any[]>(`/api/transactions/${propertyId}`),

  createTransaction: (body: any) =>
    request<any>(`/api/transactions`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  taxSummary: (propertyId: string, fy: string) =>
    request<any>(`/api/reports/${propertyId}/${fy}`),
};
