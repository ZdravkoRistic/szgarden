import Header from "../components/Header";
import Footer from "../components/Footer";
import GalleryClient from "../components/GalleryClient";

export const metadata = {
  title: "Galerija — ZS GARDEN | Primeri radova | Beograd",
  description: "Galerija završenih projekata ZS GARDEN: profesionalno kosene travnjake, oblikovane žive ograde, sečena stabla i uređena dvorišta u Čukarici, Beogradu. Prikaz naših radova.",
  keywords: "galerija, primeri radova, košenje trave, uredjenje dvorišta, beograd",
  canonical: "https://zsgarden.org/galerija"
};

export default function GalerijaPage() {
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
        "name": "Galerija",
        "item": "https://zsgarden.org/galerija"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-stone-50 text-stone-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Galerija</h1>
        </div>
        <div className="mt-4">
          <GalleryClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
