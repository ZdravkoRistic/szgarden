"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) return alert("Ime i telefon su obavezni.");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message })
      });
      if (!res.ok) throw new Error("Network response was not ok");
      alert("Poruka poslata. Stefan će vas kontaktirati uskoro.");
      setName(""); setPhone(""); setMessage("");
    } catch (err) {
      console.error(err);
      alert("Greška pri slanju poruke.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-stone-700">Ime</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700">Telefon</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700">Poruka (opciono)</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" rows={4} />
      </div>
      <div>
        <button type="submit" disabled={submitting} className="bg-emerald-600 text-white px-4 py-2 rounded">{submitting ? "Salje se..." : "Pošalji poruku"}</button>
      </div>
    </form>
  );
}
