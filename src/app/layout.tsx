import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthWatcher from "@/components/AuthWatcher";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asseta",
  description:
    "Track rental income and expenses by ATO category and generate EOFY tax summaries for Australian landlords.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased
          min-h-screen
          text-slate-200
          bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(900px_500px_at_90%_20%,rgba(16,185,129,0.18),transparent_60%),linear-gradient(180deg,#0b0f19_0%,#070a12_100%)]
        `}
      >
          <AuthWatcher />

        {children}
      </body>
    </html>
  );
}


