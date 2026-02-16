export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-full max-w-[1400px] px-6 py-10">{children}</main>;
}
