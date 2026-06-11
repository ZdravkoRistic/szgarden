"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error">("success");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) {
      setStatusType("error");
      setStatus("Ime i telefon su obavezni.");
      return;
    }

    setSubmitting(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message })
      });

      if (!res.ok) throw new Error("Network response was not ok");

      setStatusType("success");
      setStatus("Hvala! Naš tim će vas uskoro kontaktirati.");
      setName("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatusType("error");
      setStatus("Greška pri slanju poruke. Probajte ponovo kasnije.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status ? (
        <div
          className={`rounded-3xl border px-4 py-3 text-sm ${
            statusType === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-rose-200 bg-rose-50 text-rose-900"
          }`}
        >
          {status}
        </div>
      ) : null}
      <div>
        <label className="block text-sm font-medium text-stone-700">Ime</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-3xl border border-stone-200 bg-white px-4 py-3 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700">Telefon</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full rounded-3xl border border-stone-200 bg-white px-4 py-3 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700">Poruka (opciono)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 block w-full rounded-3xl border border-stone-200 bg-white px-4 py-3 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          rows={5}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/40 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          {submitting ? "Salje se..." : "Pošalji poruku"}
        </button>
      </div>
    </form>
  );
}
