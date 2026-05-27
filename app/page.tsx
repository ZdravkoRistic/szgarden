import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "ZS GARDEN - Kosenje trave i odrzavanje vrtova, Beograd (Čukarica)",
  description:
    "ZS GARDEN - Profesionalno košenje trave, šišanje žive ograde i seča stabala u Čukarici. Kontakt: Stefan."
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-950">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 space-y-10">
        <section className="rounded-[2rem] border border-stone-200 bg-gradient-to-br from-stone-50 via-white to-stone-100 p-8 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-center">
            <div className="space-y-6">
              <p className="text-emerald-600 font-semibold uppercase tracking-[0.25em]">Profesionalno održavanje</p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-stone-950">
                ZS GARDEN — Čukarica, Beograd
              </h1>
              <p className="max-w-2xl text-lg text-stone-700">
                Pouzdano održavanje zelenih površina, košenje trave, šišanje živih ograda i seča stabala. Brza procena, fleksibilni termini i posebne pogodnosti za stalnu saradnju.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white border border-stone-200 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Kontakt osoba</p>
                  <p className="mt-2 text-xl font-semibold text-stone-950">Stefan</p>
                  <p className="mt-1 text-sm text-stone-600">Telefon: 061 371 00 54</p>
                </div>
                <div className="rounded-3xl bg-emerald-600/10 border border-emerald-200 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Minimalna dijagnostika</p>
                  <p className="mt-2 text-xl font-semibold text-stone-950">1500 RSD</p>
                  <p className="mt-1 text-sm text-stone-700">Ako posao nije dogovoren.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/kontakt" className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">Rezerviši termin</a>
                <a href="/galerija" className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-stone-50">Pogledaj galeriju</a>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[2rem] bg-emerald-600/5 p-6 text-stone-950 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-700">Usluge</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-emerald-600 font-semibold">Košenje trave</p>
                    <p className="mt-2 text-sm text-stone-700">Cene se formiraju po dogovoru, zavise od terena i stanja trave.</p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-emerald-600 font-semibold">Šišanje žive ograde</p>
                    <p className="mt-2 text-sm text-stone-700">Po dužnom metru, po dogovoru, prilagodljivo vašem obliku i prirodi.</p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-emerald-600 font-semibold">Seča stabala</p>
                    <p className="mt-2 text-sm text-stone-700">Seča do 40cm prečnika sa profesionalnim pristupom i odvozom po dogovoru.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-200 bg-stone-50 p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">Naše prednosti</p>
            <h2 className="mt-4 text-3xl font-bold text-stone-950">Profesionalno održavanje zelenih površina</h2>
            <p className="mt-4 text-stone-700">Radimo pažljivo, efikasno i sa istim prioritetom kao da uređujemo vlastiti vrt. Prilagođavamo se kompleksnosti terena i uslovima na licu mesta.</p>
            <ul className="mt-6 space-y-4 text-stone-700">
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" /> Brzo procenjivanje i transparentan dogovor.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" /> Posebne pogodnosti za mesečno održavanje.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" /> Profesionalna oprema i sigurnost tokom seče stabala.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">Dodatne usluge</p>
            <h2 className="mt-4 text-3xl font-bold text-stone-950">Garancija termina i čisto okružen prostor</h2>
            <p className="mt-4 text-stone-700">Kod nas se dogovoreni termin poštuje. Čišćenje i odvoz otpada se ugovaraju posebno, po potrebi.</p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-stone-50 p-5">
                <p className="font-semibold text-stone-950">Pogodnosti za stalnu saradnju</p>
                <p className="mt-2 text-sm text-stone-700">Mesečno održavanje 2–4 dolaska po dogovoru.</p>
              </div>
              <div className="rounded-3xl bg-stone-50 p-5">
                <p className="font-semibold text-stone-950">Detaljna procena terena</p>
                <p className="mt-2 text-sm text-stone-700">Visina trave, nagib i prepreke utiču na cenu.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
