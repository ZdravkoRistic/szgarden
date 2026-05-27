"use client";

import { useEffect, useState } from "react";

type ImageItem = {
  _id?: string;
  url: string;
  caption?: string;
  mediaType?: "image" | "video";
  createdAt?: string;
};

const SECRET = "zsgarden2026";

export default function GalleryClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(() => Boolean(typeof window !== "undefined" && localStorage.getItem("zsg_auth")));
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

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

  function checkPassword(e: React.FormEvent) {
    e.preventDefault();
    if (password === SECRET) {
      setAuthed(true);
      localStorage.setItem("zsg_auth", "1");
      setPassword("");
    } else {
      alert("Pogresna lozinka");
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return alert("Unesite URL slike (postavite na Cloudinary ili Vercel Blob URL). ");
    setUploading(true);
    try {
      // try to infer media type from URL or use explicit selection
      const inferred = url.toLowerCase();
      let mediaType = "image";
      if (inferred.includes("youtube.com") || inferred.includes("youtu.be") || inferred.endsWith(".mp4")) mediaType = "video";

      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, caption, mediaType })
      });
      if (!res.ok) throw new Error("Upload failed");
      setUrl("");
      setCaption("");
      await fetchImages();
    } catch (err) {
      console.error(err);
      alert("Greška pri slanju slike.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    if (!confirm("Obrisati ovu sliku?")) return;
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
      alert("Greška pri brisanju slike.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Featured video (or placeholder) */}
      {featuredVideo ? (
        <div className="rounded-2xl overflow-hidden shadow-sm">
          { (featuredVideo.url.includes("youtube.com") || featuredVideo.url.includes("youtu.be")) ? (
            <div className="w-full aspect-video bg-black">
              <iframe className="w-full h-full" src={toYouTubeEmbed(featuredVideo.url)} title={featuredVideo.caption || "video"} frameBorder="0" allowFullScreen />
            </div>
          ) : (
            <video className="w-full max-h-[520px] object-cover" controls src={featuredVideo.url} />
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

      {/* Admin upload panel */}
      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 max-w-xl">
        {!authed ? (
          <form onSubmit={checkPassword} className="flex gap-2 items-center">
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Lozinka za upload (admin)" className="border rounded px-3 py-2 w-full" />
            <button className="bg-emerald-600 text-white px-3 py-2 rounded">Otvori upload</button>
          </form>
        ) : (
          <form onSubmit={handleUpload} className="flex flex-col gap-2">
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL (Cloudinary/Vercel ili YouTube/MP4)" className="border rounded px-3 py-2" />
            <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Kratak opis (opciono)" className="border rounded px-3 py-2" />
            <div className="flex gap-2">
              <button type="submit" disabled={uploading} className="bg-emerald-600 text-white px-4 py-2 rounded">{uploading ? "Slanje..." : "Pošalji"}</button>
              <button type="button" onClick={() => { localStorage.removeItem("zsg_auth"); setAuthed(false); }} className="px-3 py-2 border rounded">Logout</button>
            </div>
          </form>
        )}
        <p className="mt-3 text-xs text-stone-600">Upload dostupan samo adminima.</p>
      </div>

      {/* Gallery grid (excluding featured) */}
      <div className="mt-2">
        {loading ? (
          <div>Učitavanje...</div>
        ) : galleryItems.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center text-stone-700">Galerija je trenutno prazna — biće dopunjena kasnije.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryItems.map((img) => (
              <div key={img._id || img.url} className="border rounded overflow-hidden relative">
                {img.mediaType === "video" ? (
                  (img.url.includes("youtube.com") || img.url.includes("youtu.be")) ? (
                    <div className="w-full h-40 bg-black">
                      <iframe className="w-full h-40" src={toYouTubeEmbed(img.url)} title={img.caption || "video"} frameBorder="0" allowFullScreen />
                    </div>
                  ) : (
                    <video className="w-full h-40 object-cover" controls src={img.url} />
                  )
                ) : (
                  <img src={img.url} alt={img.caption || "ZS GARDEN"} className="w-full h-40 object-cover" />
                )}
                {img.caption && <div className="p-2 text-sm text-stone-700">{img.caption}</div>}
                {authed && (
                  <button onClick={() => handleDelete(img._id)} className="absolute top-2 right-2 bg-white/90 text-red-600 px-2 py-1 rounded text-sm">Obriši</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function toYouTubeEmbed(url: string) {
  try {
    if (url.includes("youtube.com/watch")) {
      const params = new URL(url).searchParams;
      const v = params.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("/").pop();
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch (e) {
    // fallback
  }
  return url;
}
