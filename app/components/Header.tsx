import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-stone-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-stone-900 font-extrabold text-lg">ZS GARDEN</Link>
        <nav className="flex items-center gap-4">
          <Link href="/galerija" className="text-stone-700 hover:text-emerald-600">Galerija</Link>
          <Link href="/kontakt" className="hidden rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:inline-flex">Zakaži procenu</Link>
        </nav>
      </div>
    </header>
  );
}
