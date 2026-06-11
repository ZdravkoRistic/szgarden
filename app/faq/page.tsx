import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "FAQ — Česta pitanja | ZS GARDEN",
  description: "Česta pitanja i odgovori o uslugama ZS GARDEN: koliko košta procena terena, kako se obavlja seča stabala, freziranje bašte, šišanje ograda, košenje trave i održavanje zelenih površina.",
  keywords: "česta pitanja, FAQ, košenje trave, seča stabala, freziranje bašte, održavanje ograda",
  canonical: "https://zsgarden.org/faq"
};

export default function FAQPage() {
  const faqs = [
    {
      question: "Šta radite?",
      answer: "Pružamo profesionalne usluge održavanja zelenih površina: košenje trave, šišanje i oblikovanje ograda, seču stabala, freziranje bašte i dvorišta, kao i sakupljanje i obradu otpada."
    },
    {
      question: "U kojoj oblasti radite?",
      answer: "Primarna operativna zona je Beograd - Čukarica. Za dodatne lokacije kontaktirajte nas direktno na 061 371 00 54."
    },
    {
      question: "Koliko košta procena terena?",
      answer: "Minimalna dijagnostika je 1500 RSD. Ako se dogovori rad, taj iznos se odbija od ukupne cene. Ukoliko se posao ne dogovori, platite se samo za procenu."
    },
    {
      question: "Kako se obavlja seča stabala?",
      answer: "Seču stabala obavljamo isključivo tehnikom slobodnog pada iz korena. Pre početka rada procenjujemo prostor kako bismo osigurali bezbednost i kontrolisano obaranje."
    },
    {
      question: "Da li vršite seču visokih stabala?",
      answer: "Da. Seču obavljamo do 40 cm debljine kao standard, ali radimo i sa viših stabala (oko 10 metara) kao i sa visokim zahtevnim stablima (oko 20 metara). Za specifične potrebe, dogovor se vrši tokom procene."
    },
    {
      question: "Šta je freziranje bašte?",
      answer: "Freziranje je priprema zemljišta pomoću motornog kultivatora. Uklanja korov, ravna teren i priprema землишту za sadnju ili dalje radove. Obavljamo ga na privatnim baštama, dvorištima i poslovnim prostorima."
    },
    {
      question: "Koliko često treba košiti travu?",
      answer: "Redovna kosidba je obično mesečno ili prema potrebi, zavisno od godišnjeg doba i brzine rasta. Možemo dogovoriti mesečno održavanje sa 2-4 dolaska po dogovoru."
    },
    {
      question: "Da li vršite šišanje ograda?",
      answer: "Da. Održavamo i oblikujemo žive ograde do 1 metar, od 1 do 2 metra, kao i visoke ograde od 2 do 3 metra. Usluge se prilagođavaju vašim potrebama."
    },
    {
      question: "Šta se dešava sa odbijenim granama i otpadom?",
      answer: "Sakupljanje i obrada otpada se posebno ugovaraju. Objedinjujemo obrezanu travu, lišće i grane. Organizujemo siguran odvoz krupniji materijal po potrebi."
    },
    {
      question: "Kako da vas kontaktiram?",
      answer: "Možete nas pozvati na 061 371 00 54 ili pružiti poruku preko naše kontakt forme. Brzo ćemo vam odgovoriti i dogovoriti procenu terena."
    },
    {
      question: "Da li rade za poslovne prostore?",
      answer: "Da. Freziramo, održavamo i uređujemo ispred poslovnih prostora i komercijalnih objekata. Prilagođavamo usluge potrebama vaše kompanije."
    },
    {
      question: "Koja je vaša stručnost, iskustvo i bezbednost?",
      answer: "Radimo sa profesionalnom opremom i strogo se držimo sigurnosnih standarda. Sve radove obavljamo sa pažnjom, znanjem i iskustvom stečenim kroz godine rada."
    }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Početna",
        "item": "https://zsgarden.org"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "FAQ",
        "item": "https://zsgarden.org/faq"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-stone-50 text-stone-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 space-y-8">
        <section className="rounded-[2rem] border border-green-100 bg-white/90 p-8 shadow-sm backdrop-blur-sm">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Česta pitanja</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-stone-950">Odgovori na vaša pitanja</h1>
          <p className="mt-4 text-lg text-stone-700 leading-relaxed">
            Pronađite odgovore na najčešća pitanja o uslugama ZS GARDEN. Ako ne pronađete odgovor, slobodno nas kontaktirajte.
          </p>
        </section>

        <section className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="rounded-[1.75rem] border border-green-100 bg-white/90 shadow-sm transition hover:shadow-md cursor-pointer group"
            >
              <summary className="flex items-center justify-between gap-4 p-6 select-none">
                <h3 className="text-lg font-semibold text-stone-950">{faq.question}</h3>
                <span className="text-2xl text-emerald-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <div className="border-t border-green-100 px-6 py-4 bg-white/50">
                <p className="text-stone-700 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </section>

        <section className="rounded-[2rem] border border-green-100 bg-white/90 p-8 shadow-sm transition hover:shadow-md duration-300 backdrop-blur-sm text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Ostalo vam nejasno?</p>
          <h2 className="mt-4 text-3xl font-bold text-stone-950">Slobodno nas kontaktirajte</h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-700 leading-relaxed">
            Pozovite nas ili nam pišite sa dodatnim pitanjima. Naš tim je spreman da vam pomogne i odgovori na sve što vas zanima.
          </p>
          <div className="mt-8">
            <a
              href="/kontakt"
              className="inline-flex rounded-full bg-emerald-700 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-200/40 transition hover:bg-emerald-800"
            >
              Pošalji poruku
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
