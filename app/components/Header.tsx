import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-white/70 bg-white/80 backdrop-blur-md shadow-sm shadow-stone-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-emerald-700 font-extrabold text-lg tracking-[0.12em] uppercase">ZS GARDEN</Link>
        <nav className="flex flex-wrap items-center gap-4">
          <Link href="/usluge" className="text-stone-700 transition hover:text-emerald-600">Usluge</Link>
          <Link href="/galerija" className="text-stone-700 transition hover:text-emerald-600">Galerija</Link>
          <Link href="/faq" className="text-stone-700 transition hover:text-emerald-600">FAQ</Link>
          <Link href="/kontakt" className="hidden rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 sm:inline-flex">Zakaži procenu</Link>
        </nav>
      </div>
    </header>
  );
}
