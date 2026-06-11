import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Usluge — ZS GARDEN | Košenje, seča stabala, freziranje bašte",
  description: "Kompletan pregled usluga ZS GARDEN: profesionalno košenje trave, seča stabala do 20m, freziranje bašte sa kulatorem, šišanje živih ograda, obrada i održavanje zemljišta u Čukarici.",
  keywords: "košenje trave, seča stabala, freziranje bašte, šišanje žive ograde, održavanje vrta, Čukarica Beograd",
  canonical: "https://zsgarden.rs/usluge"
};

export default function UslugePage() {
  const serviceSchema = {
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
        "name": "Usluge",
        "item": "https://zsgarden.rs/usluge"
      }
    ]
  };

  const servicesData = [
    {
      "@type": "Service",
      "name": "Seča stabala",
      "description": "Profesionalna seča stabala do 20m koristeći tehniku slobodnog pada iz korena sa bezbednosnim merama i izvozom drvne mase.",
      "areaServed": "Čukarica, Beograd",
      "provider": {
        "@type": "LocalBusiness",
        "name": "ZS GARDEN"
      }
    },
    {
      "@type": "Service",
      "name": "Freziranje bašte",
      "description": "Priprema i uređenje zemljišta pomoću motornog kultivatora za pripremu terena i uklanjanje korova.",
      "areaServed": "Čukarica, Beograd",
      "provider": {
        "@type": "LocalBusiness",
        "name": "ZS GARDEN"
      }
    },
    {
      "@type": "Service",
      "name": "Košenje trave",
      "description": "Profesionalno održavanje travnjaka sa fleksibilnom mesečnom saradnjom i posebnim pogodnostima.",
      "areaServed": "Čukarica, Beograd",
      "provider": {
        "@type": "LocalBusiness",
        "name": "ZS GARDEN"
      }
    },
    {
      "@type": "Service",
      "name": "Šišanje ograda",
      "description": "Oblikovanje i održavanje živih ograda do 3 metra sa profesionalnom opremom.",
      "areaServed": "Čukarica, Beograd",
      "provider": {
        "@type": "LocalBusiness",
        "name": "ZS GARDEN"
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-stone-50 text-stone-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesData) }} />
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="rounded-[2rem] border border-green-100 bg-white/90 p-8 shadow-[0_30px_90px_-50px_rgba(34,197,94,0.35)] backdrop-blur-sm transition-all duration-300">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Novi nivo održavanja</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-stone-950">Sveobuhvatno održavanje zelenih površina</h1>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-green-100 bg-white/90 p-8 shadow-sm transition hover:shadow-md duration-300 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">Obaranje stabala</p>
            <h2 className="mt-4 text-3xl font-bold text-stone-950">Proces rada sa slobodnim padom iz korena</h2>
            <p className="mt-4 text-stone-700 leading-relaxed">
              Seča stabala se obavlja isključivo tehnikom slobodnog pada iz korena. Pre početka rada procenjujemo okolni prostor kako bismo osigurali bezbedno i kontrolisano obaranje.
            </p>
            <div className="mt-6 space-y-4 text-stone-700">
              <p>Organizujemo siguran odvoz drvene mase kamionom i raščlanjivanje stabala na meru prema potrebi.</p>
              <p>Za dodatne potrebe i specijalne radove, dogovor se vrši posebno tokom procene terena.</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-green-100 bg-white/90 p-8 shadow-sm transition hover:shadow-md duration-300 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">Freziranje bašte i dvorišta</p>
            <h2 className="mt-4 text-3xl font-bold text-stone-950">Priprema i uređenje zemljišta</h2>
            <p className="mt-4 text-stone-700 leading-relaxed">
              Freziranje bašte, dvorišta i poslovnih prostora predstavlja idealan početak pre sadnje i uređenja parcele. Uklanja korov, ravna teren i priprema zemljište za dalje radove.
            </p>
            <div className="mt-6 space-y-4 text-stone-700">
              <p>Ovaj proces je posebno efikasan za ravnanje dvorišta, pripremu terena nakon košenja, čišćenje zapuštene parcele, kao i uređenje ispred poslovnih prostora i komercijalnih objekata.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-green-100 bg-white/90 p-8 shadow-sm transition hover:shadow-md duration-300 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Sve naše usluge</p>
              <h2 className="mt-4 text-3xl font-bold text-stone-950">Pregledna ponuda svih usluga</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold text-stone-950">Košenje trave i krčenje</h3>
              <ul className="mt-4 space-y-3 text-stone-700">
                <li>- Redovno košenje trave kosačicom (za travu visine do 30 cm)</li>
                <li>- Srednje košenje trimerom ili kosačicom (za travu visine od 30 do 60 cm)</li>
                <li>- Krčenje zapuštenih parcela trimerom sa nožem ili cirkularom (za visinu od 100 do 150 cm)</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold text-stone-950">Šišanje i oblikovanje žive ograde</h3>
              <ul className="mt-4 space-y-3 text-stone-700">
                <li>- Redovno održavanje, formiranje i šišanje ograde visine do 1 metar</li>
                <li>- Održavanje i oblikovanje žive ograde visine od 1 do 2 metra</li>
                <li>- Šišanje i tretiranje visokih ograda visine od 2 do 3 metra</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold text-stone-950">Sakupljanje otpada i obrada zemljišta</h3>
              <ul className="mt-4 space-y-3 text-stone-700">
                <li>- Freziranje bašte i dvorišta motornim kultivatorom</li>
                <li>- Sakupljanje pokošene trave i lišća po aru</li>
                <li>- Sakupljanje i raščišćavanje granja po gomili ili stablu</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold text-stone-950">Seča stabala</h3>
              <ul className="mt-4 space-y-3 text-stone-700">
                <li>- Standardna seča drveća do 40 cm debljine</li>
                <li>- Seča viših stabala visine oko 10 metara</li>
                <li>- Seča visokih i zahtevnih stabala visine oko 20 metara</li>
                <li>- Seckanje oborenog stabla na meru</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-green-100 bg-white/90 p-8 shadow-sm transition hover:shadow-md duration-300 backdrop-blur-sm text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Spremni za procenu?</p>
          <h2 className="mt-4 text-3xl font-bold text-stone-950">Rezervišite procenu i dogovorite termin</h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-700 leading-relaxed">
            Pozovite nas ili nam pišite kako bismo se dogovorili i ponudili najbolju uslugu prilagođenu vašim potrebama.
          </p>
          <a
            href="/kontakt"
            className="mt-8 inline-flex rounded-full bg-emerald-700 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-200/40 transition hover:bg-emerald-800"
          >
            Kontaktirajte nas
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
