"use client";

import { useEffect, useState } from "react";

type ImageItem = {
  _id?: string;
  base64?: string;
  caption?: string;
  mediaType?: "image" | "video";
  createdAt?: string;
};

const ADMIN_PASSWORD = "zsgarden2026";

export default function GalleryClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(() => Boolean(typeof window !== "undefined" && localStorage.getItem("zsg_gal_auth")));

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

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      localStorage.setItem("zsg_gal_auth", "1");
      setPassword("");
    } else {
      alert("Lozinka ne valja");
    }
  }

  function handleLogout() {
    setAuthed(false);
    localStorage.removeItem("zsg_gal_auth");
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
                {authed && (
                  <button onClick={() => handleDelete(img._id)} className="absolute top-2 right-2 bg-white/90 text-red-600 px-2 py-1 rounded text-xs">×</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload panel - ispod galerije - DISKRETNO */}
      {!authed ? (
        <div className="flex justify-center py-4">
          <form onSubmit={handlePasswordSubmit} className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Lozinka"
              className="text-sm border border-stone-200 rounded px-3 py-1.5 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="text-sm bg-emerald-600 text-white px-3 py-1.5 rounded hover:bg-emerald-700 transition"
            >
              Unlock
            </button>
          </form>
        </div>
      ) : (
        <div className="py-6 border-t border-stone-100 mt-6">
          <div className="flex flex-col gap-3 max-w-md">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="text-sm border border-stone-200 rounded px-3 py-2 focus:outline-none focus:border-emerald-400"
            />
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Opis (opciono)"
              className="text-sm border border-stone-200 rounded px-3 py-2 focus:outline-none focus:border-emerald-400"
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpload}
                disabled={uploading || !selectedFile}
                className="text-sm bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:bg-stone-300 transition"
              >
                {uploading ? "..." : "Upload"}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm border border-stone-200 text-stone-600 px-3 py-2 rounded hover:bg-stone-50 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
