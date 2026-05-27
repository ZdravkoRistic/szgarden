export default function Footer() {
  return (
    <footer className="w-full bg-stone-950 text-stone-100">
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">ZS GARDEN</p>
          <p className="mt-4 text-sm text-stone-200">Profesionalno održavanje zelenih površina i hitne usluge za travu, ograde i stabla u Beogradu.</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Kontakt</p>
          <p className="mt-4 text-sm text-stone-200">Telefon: 061 371 00 54</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Usluge</p>
          <ul className="mt-4 space-y-2 text-sm text-stone-200">
            <li>Košenje trave</li>
            <li>Šišanje žive ograde</li>
            <li>Seča stabala do 40cm</li>
            <li>Mesečno održavanje</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 bg-stone-950 px-6 py-4 text-xs text-stone-500 text-center">© 2026 ZS GARDEN. Sve cene po dogovoru. Operativna zona: Beograd - Čukarica.</div>
    </footer>
  );
}
