import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Kontakt — ZS GARDEN | Rezervacija i procena terena",
  description: "Kontaktirajte ZS GARDEN za brzu procenu terena i rezervaciju usluga. Dostupni smo na 061 371 00 54 ili popunite formu za kontakt. Minimalna procena: 1500 RSD.",
  keywords: "kontakt, rezervacija, procena terena, kosenje trave, čukarica beograd",
  canonical: "https://zsgarden.rs/kontakt"
};

export default function KontaktPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Početna",
        "item": "https://zsgarden.rs"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Kontakt",
        "item": "https://zsgarden.rs/kontakt"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-stone-50 text-stone-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] items-start">
          <div className="rounded-[2rem] bg-stone-50 p-8 shadow-sm border border-stone-200">
            <p className="text-emerald-600 font-semibold uppercase tracking-[0.2em]">Kontakt</p>
            <h1 className="mt-4 text-3xl font-bold text-stone-950">Rezervacija usluge i procena</h1>
            <p className="mt-4 text-stone-700">Pozovite nas ili pošaljite poruku, a naš tim dolazi da proceni teren i dogovori detalje.</p>
            <div className="mt-6 space-y-4 text-stone-700">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Telefon</p>
                <p className="mt-2 text-xl font-semibold text-stone-950">061 371 00 54</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Lokacija</p>
                <p className="mt-2 text-base text-stone-700">Beograd, Čukarica</p>
              </div>
              <div className="rounded-3xl bg-emerald-600/10 p-4 text-emerald-700">
                <p className="font-semibold">Minimalna dijagnostika</p>
                <p className="text-sm text-stone-700 mt-1">1500 RSD ako posao nije dogovoren.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-stone-200">
            <div className="mb-6">
              <p className="text-emerald-600 font-semibold uppercase tracking-[0.2em]">Kontakt forma</p>
              <p className="mt-2 text-stone-700">Unesite svoje podatke i poruku, a mi ćemo vas kontaktirati što pre.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
