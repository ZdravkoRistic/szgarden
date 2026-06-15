export default function Footer() {
  return (
    <footer className="w-full bg-white/90 text-stone-700 border-t border-emerald-100 shadow-inner shadow-emerald-50">
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">ZS GARDEN</p>
          <p className="mt-4 text-sm text-stone-600">Profesionalno održavanje zelenih površina u Beogradu sa pažnjom na detalje i uredan ishod.</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">Kontakt</p>
          <p className="mt-4 text-sm text-stone-600">Telefon: 066/57-393-99</p>
          <p className="mt-2 text-sm text-stone-500">Email: zsgarden.rs@gmail.com</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">Usluge</p>
          <ul className="mt-4 space-y-2 text-sm text-stone-600">
            <li>Košenje trave</li>
            <li>Šišanje žive ograde</li>
            <li>Seča stabala do 40cm</li>
            <li>Mesečno održavanje</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-emerald-100 bg-white/90 px-6 py-4 text-xs text-stone-500 text-center">© 2026 ZS GARDEN.</div>
    </footer>
  );
}
