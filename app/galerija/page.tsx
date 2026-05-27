import Header from "../components/Header";
import Footer from "../components/Footer";
import GalleryClient from "../components/GalleryClient";

export const metadata = {
  title: "Galerija - ZS GARDEN",
  description: "Galerija radova: košenje, uredjenje travnjaka i ograde u Beogradu (Čukarica)."
};

export default function GalerijaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-950">
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
