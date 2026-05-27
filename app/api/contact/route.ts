import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import nodemailer from "nodemailer";

async function trySendEmail({ name, phone, message }: { name: string; phone: string; message?: string | null }) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_RECIPIENT || "kosacicatrimer@gmail.com";

  if (!host || !port || !user || !pass) return { ok: false, reason: "SMTP not configured" };

  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });

  const html = `<p>Nova kontakt poruka sa sajta ZS GARDEN</p>
    <p><strong>Ime:</strong> ${name}</p>
    <p><strong>Telefon:</strong> ${phone}</p>
    <p><strong>Poruka:</strong><br/>${message ? message.replace(/</g, "&lt;") : "(nema)"}</p>`;

  const info = await transporter.sendMail({ from: user, to, subject: `ZS GARDEN - nova poruka od ${name}`, html });
  return { ok: true, info };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;
    if (!name || !phone) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const { db } = await connectToDatabase();
    const doc = { name, phone, message: message || null, createdAt: new Date() };
    const result = await db.collection("contacts").insertOne(doc);

    // try to send email (non-blocking failure)
    try {
      const sent = await trySendEmail({ name, phone, message });
      if (!sent.ok) console.warn("Email not sent:", sent);
    } catch (e) {
      console.error("Email send error:", e);
    }

    return NextResponse.json({ ok: true, id: result.insertedId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }
}
