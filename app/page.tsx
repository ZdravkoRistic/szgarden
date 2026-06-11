import Header from "./components/Header";
import Footer from "./components/Footer";

const heroImage = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80";

export const metadata = {
  title: "ZS GARDEN — Košenje trave, seča stabala, freziranje bašte | Čukarica Beograd",
  description: "Profesionalne usluge održavanja zelenih površina u Čukarici, Beograd. Košenje trave, šišanje ograda, seča stabala, freziranje bašte. Brza procena: 061 371 00 54",
  keywords: "košenje trave, seča stabala, šišanje ograde, freziranje bašte, čukarica, beograd, održavanje dvorišta",
  canonical: "https://zsgarden.rs"
};

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ZS GARDEN",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80",
    "description": "Profesionalne usluge održavanja zelenih površina u Čukarici, Beograd. Košenje trave, šišanje ograda, seča stabala, freziranje bašte.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Čukarica",
      "addressRegion": "Beograd",
      "addressCountry": "RS"
    },
    "telephone": "+381613710054",
    "priceRange": "1500 RSD+",
    "url": "https://zsgarden.rs",
    "sameAs": ["https://www.facebook.com/zsgarden", "https://www.instagram.com/zsgarden"],
    "areaServed": "Čukarica, Beograd",
    "serviceType": ["Košenje trave", "Seča stabala", "Šišanje ograda", "Freziranje bašte"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-stone-50 text-stone-950 relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_16%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_24%)] pointer-events-none" />
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 space-y-12 relative z-10">
        <section className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-white/85 p-6 shadow-[0_30px_100px_-65px_rgba(34,197,94,0.45)] backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/80 to-white/95 pointer-events-none" />
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-center relative">
            <div className="space-y-6">
              <p className="text-emerald-700 font-semibold uppercase tracking-[0.28em] text-sm">Profesionalno održavanje</p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-stone-950">
                ZS GARDEN — Čukarica, Beograd
              </h1>
              <p className="max-w-2xl text-lg text-stone-700 leading-relaxed">
                Pouzdano održavanje zelenih površina, košenje trave, šišanje živih ograda, freziranje i seča stabala. Brza procena, fleksibilni termini i posebne pogodnosti za stalnu saradnju.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-green-100 bg-white/90 p-5 shadow-sm transition hover:shadow-md">
                  <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Kontakt</p>
                  <p className="mt-2 text-xl font-semibold text-stone-950">061 371 00 54</p>
                </div>
                <div className="rounded-3xl border border-green-100 bg-white/90 p-5 shadow-sm transition hover:shadow-md">
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 font-medium">Minimalna dijagnostika</p>
                  <p className="mt-2 text-xl font-semibold text-stone-950">1500 RSD</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/kontakt" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/40 transition hover:bg-emerald-800">Rezerviši termin</a>
                <a href="/galerija" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-950 shadow-sm transition hover:border-emerald-200 hover:bg-stone-50">Pogledaj galeriju</a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-green-100 shadow-xl shadow-emerald-100/60">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
                role="img"
                aria-label="Održavani dvorišta sa pokošenom travom - Profesionalno održavanje zelenih površina"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative flex min-h-[360px] flex-col justify-end p-6 text-white">
                <div className="rounded-3xl bg-black/40 p-5 backdrop-blur-sm border border-white/10">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Priroda u fokusu</p>
                  <h2 className="mt-3 text-2xl font-bold">Lepe, uredne i sigurne zelene površine</h2>
                  <p className="mt-2 text-sm text-white/80">Brinemo o travnjacima i vrtovima sa stilom, kvalitetom i čistim finishom.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-green-100 bg-white/90 p-8 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-semibold">Naše prednosti</p>
            <h2 className="mt-4 text-3xl font-bold text-stone-950">Profesionalno održavanje zelenih površina</h2>
            <p className="mt-4 text-stone-700 leading-relaxed">Radimo pažljivo, efikasno i sa istim prioritetom kao da uređujemo vlastiti vrt. Prilagođavamo se kompleksnosti terena i uslovima na licu mesta.</p>
            <ul className="mt-6 space-y-4 text-stone-700">
              <li className="flex gap-3 group">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex-shrink-0 group-hover:scale-150 transition-transform" />
                <span className="group-hover:text-stone-900 transition-colors">Brzo procenjivanje i transparentan dogovor.</span>
              </li>
              <li className="flex gap-3 group">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex-shrink-0 group-hover:scale-150 transition-transform" />
                <span className="group-hover:text-stone-900 transition-colors">Posebne pogodnosti za mesečno održavanje.</span>
              </li>
              <li className="flex gap-3 group">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex-shrink-0 group-hover:scale-150 transition-transform" />
                <span className="group-hover:text-stone-900 transition-colors">Profesionalna oprema i sigurnost tokom seče stabala.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-green-100 bg-white/90 p-8 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-semibold">Dodatne usluge</p>
            <h2 className="mt-4 text-3xl font-bold text-stone-950">Garancija termina i čisto okružen prostor</h2>
            <p className="mt-4 text-stone-700 leading-relaxed">Kod nas se dogovoreni termin poštuje. Čišćenje i odvoz otpada se ugovaraju posebno, po potrebi.</p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-white/90 border border-green-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
                <p className="font-semibold text-stone-950 group-hover:text-emerald-700 transition-colors">✓ Pogodnosti za stalnu saradnju</p>
                <p className="mt-2 text-sm text-stone-700 group-hover:text-stone-800 transition-colors">Mesečno održavanje 2–4 dolaska po dogovoru.</p>
              </div>
              <div className="rounded-3xl bg-white/90 border border-green-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
                <p className="font-semibold text-stone-950 group-hover:text-emerald-700 transition-colors">Detaljna procena terena</p>
                <p className="mt-2 text-sm text-stone-700 group-hover:text-stone-800 transition-colors">Visina trave, nagib i prepreke utiču na cenu.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
