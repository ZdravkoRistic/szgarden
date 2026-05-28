"use client";

import { useEffect, useState } from "react";

type ImageItem = {
  _id?: string;
  base64?: string;
  caption?: string;
  mediaType?: "image" | "video";
  createdAt?: string;
};

export default function GalleryClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  // derive featured video and remaining items
  const videos = images.filter((i) => i.mediaType === "video");
  const featuredVideo = videos.length > 0 ? videos[0] : null;
  const galleryItems = images.filter((i) => !(featuredVideo && i._id === featuredVideo._id));

  async function fetchImages() {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) return alert("Odaberite fajl");
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        // Determine media type from file
        let mediaType = "image";
        if (selectedFile.type.startsWith("video/")) mediaType = "video";

        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64, caption, mediaType })
        });
        if (!res.ok) throw new Error("Upload failed");
        setSelectedFile(null);
        setCaption("");
        await fetchImages();
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      console.error(err);
      alert("Greška pri slanju fajla.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    if (!confirm("Obrisati?")) return;
    try {
      const res = await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error("Delete failed");
      setImages((s) => s.filter((i) => i._id !== id));
    } catch (err) {
      console.error(err);
      alert("Greška pri brisanju.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Featured video (or placeholder) */}
      {featuredVideo ? (
        <div className="rounded-2xl overflow-hidden shadow-sm">
          {featuredVideo.mediaType === "video" ? (
            <video className="w-full max-h-[520px] object-cover" controls>
              <source src={featuredVideo.base64} type="video/mp4" />
            </video>
          ) : (
            <img src={featuredVideo.base64} alt={featuredVideo.caption || "featured"} className="w-full" />
          )}
          {featuredVideo.caption && <div className="p-4 text-sm text-stone-700">{featuredVideo.caption}</div>}
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden shadow-sm bg-stone-100 border border-stone-200 aspect-video flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-emerald-600 font-semibold">Video će biti postavljen ovde</p>
            <p className="text-sm text-stone-600 mt-2">Prostor rezervisan za istaknuti video materijal.</p>
          </div>
        </div>
      )}

      {/* Gallery grid (excluding featured) */}
      <div className="mt-2">
        {loading ? (
          <div>Učitavanje...</div>
        ) : galleryItems.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center text-stone-700">Galerija je trenutno prazna — biće dopunjena kasnije.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryItems.map((img) => (
              <div key={img._id || img.base64} className="border rounded overflow-hidden relative">
                {img.mediaType === "video" ? (
                  <video className="w-full h-40 object-cover" controls>
                    <source src={img.base64} type="video/mp4" />
                  </video>
                ) : (
                  <img src={img.base64} alt={img.caption || "ZS GARDEN"} className="w-full h-40 object-cover" />
                )}
                {img.caption && <div className="p-2 text-sm text-stone-700">{img.caption}</div>}
                <button onClick={() => handleDelete(img._id)} className="absolute top-2 right-2 bg-white/90 text-red-600 px-2 py-1 rounded text-sm">Obriši</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload panel - ispod galerije */}
      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 max-w-xl">
        <form onSubmit={handleUpload} className="flex flex-col gap-2">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="border rounded px-3 py-2"
          />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Kratak opis (opciono)"
            className="border rounded px-3 py-2"
          />
          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="bg-emerald-600 text-white px-4 py-2 rounded disabled:bg-stone-400"
          >
            {uploading ? "Slanje..." : "Pošalji"}
          </button>
        </form>
        <p className="mt-3 text-xs text-stone-600">Učitajte slike i videe sa računara.</p>
      </div>
    </div>
  );
}
