"use client";

import { useEffect, useState } from "react";

type ImageItem = {
  _id?: string;
  base64?: string;
  url?: string;
  caption?: string;
  mediaType?: "image" | "video";
  createdAt?: string;
};

const ADMIN_PASSWORD = "zsgarden2026";
const MAX_IMAGE_WIDTH = 1200;
const MAX_IMAGE_HEIGHT = 900;

async function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const ratio = Math.min(
          MAX_IMAGE_WIDTH / image.width,
          MAX_IMAGE_HEIGHT / image.height,
          1
        );
        const width = Math.round(image.width * ratio);
        const height = Math.round(image.height * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Image processing failed"));
            resolve(blob);
          },
          "image/jpeg",
          0.75
        );
      };
      image.onerror = () => reject(new Error("Image load failed"));
      image.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

export default function GalleryClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<ImageItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(() => Boolean(typeof window !== "undefined" && localStorage.getItem("zsg_gal_auth")));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchImages(1);
    fetchFeaturedVideo();
  }, []);

  const galleryItems = images;
  const selectedImage = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  const getMediaSource = (item: ImageItem) => item.url ?? item.base64 ?? "";

  function openLightbox(index: number) {
    setSelectedIndex(index);
  }

  function closeLightbox() {
    setSelectedIndex(null);
  }

  function moveSelected(offset: number) {
    if (selectedIndex === null) return;
    const nextIndex = selectedIndex + offset;
    if (nextIndex < 0 || nextIndex >= galleryItems.length) return;
    setSelectedIndex(nextIndex);
  }

  async function fetchImages(pageNumber = 1) {
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery?page=${pageNumber}&limit=4&type=image`);
      const data = await res.json();
      setImages(data || []);
      setHasMore(Array.isArray(data) && data.length === 4);
      setPage(pageNumber);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function fetchFeaturedVideo() {
    try {
      const res = await fetch(`/api/gallery?page=1&limit=1&type=video`);
      const data = await res.json();
      setFeaturedVideo(Array.isArray(data) && data.length > 0 ? data[0] : null);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) return alert("Odaberite fajl");
    setUploading(true);
    try {
      const mediaType = selectedFile.type.startsWith("video/") ? "video" : "image";
      const uploadFile = selectedFile.type.startsWith("video/") ? selectedFile : await resizeImage(selectedFile);

      const formData = new FormData();
      formData.append("file", uploadFile, selectedFile.name);
      formData.append("caption", caption);
      formData.append("mediaType", mediaType);

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      setSelectedFile(null);
      setCaption("");
      await Promise.all([fetchImages(1), fetchFeaturedVideo()]);
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
      {/* Gallery grid */}
      <div className="mt-2">
        {loading ? (
          <div>Učitavanje...</div>
        ) : galleryItems.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center text-stone-700">Galerija je trenutno prazna — biće dopunjena kasnije.</div>
        ) : (
          <>
            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {galleryItems.map((img, index) => (
                  <div
                    key={img._id || img.base64}
                    onClick={() => openLightbox(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openLightbox(index);
                    }}
                    className="group border rounded overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <img
                      src={getMediaSource(img)}
                      alt={img.caption || "ZS GARDEN"}
                      className="w-full h-40 object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    {img.caption && <div className="p-2 text-sm text-stone-700">{img.caption}</div>}
                    {authed && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(img._id);
                        }}
                        className="absolute top-2 right-2 bg-white/90 text-red-600 px-2 py-1 rounded text-xs"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                disabled={page <= 1}
                onClick={() => fetchImages(page - 1)}
                className="absolute left-0 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Prethodna stranica galerije"
              >
                ←
              </button>
              <button
                disabled={!hasMore}
                onClick={() => fetchImages(page + 1)}
                className="absolute right-0 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-500 bg-emerald-600 text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Sledeća stranica galerije"
              >
                →
              </button>
            </div>
          </>
        )}
      </div>

      {selectedImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative max-w-5xl w-full rounded-3xl bg-white shadow-2xl overflow-hidden">
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 text-stone-700 shadow-sm hover:bg-white"
              aria-label="Zatvori pregled slike"
            >
              ×
            </button>
            <div className="relative bg-black">
              {selectedImage.mediaType === "video" ? (
                <video className="w-full max-h-[80vh] object-contain" controls autoPlay>
                  <source src={getMediaSource(selectedImage)} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={getMediaSource(selectedImage)}
                  alt={selectedImage.caption || "ZS GARDEN"}
                  className="w-full max-h-[80vh] object-contain"
                />
              )}
              <button
                type="button"
                onClick={() => moveSelected(-1)}
                disabled={selectedIndex === null || selectedIndex <= 0}
                className="absolute left-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Prethodna slika"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => moveSelected(1)}
                disabled={selectedIndex === null || selectedIndex >= galleryItems.length - 1}
                className="absolute right-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Sledeća slika"
              >
                →
              </button>
            </div>
            {selectedImage.caption && (
              <div className="p-4 text-sm text-stone-700">{selectedImage.caption}</div>
            )}
          </div>
        </div>
      ) : null}

      {/* Video section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Video primer</h2>
        {featuredVideo ? (
          <div className="rounded-2xl overflow-hidden shadow-sm mt-4">
            <video className="w-full max-h-[520px] object-cover" controls>
              <source src={getMediaSource(featuredVideo)} type="video/mp4" />
            </video>
            {featuredVideo.caption && <div className="p-4 text-sm text-stone-700">{featuredVideo.caption}</div>}
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden shadow-sm bg-stone-100 border border-stone-200 aspect-video flex items-center justify-center mt-4">
            <div className="text-center p-4">
              <p className="text-emerald-600 font-semibold">Video će biti postavljen ovde</p>
              <p className="text-sm text-stone-600 mt-2">Postavi video da se prikaže ispod galerije.</p>
            </div>
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
