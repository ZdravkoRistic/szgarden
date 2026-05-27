import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const items = await db.collection("gallery").find().sort({ createdAt: -1 }).toArray();
    // serialize ObjectId to string for client
    const serialized = items.map((i) => ({ ...i, _id: i._id.toString() }));
    return NextResponse.json(serialized);
  } catch (err) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, caption, mediaType } = body;
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    // mediaType: 'image' | 'video' (optional). If not provided, try to infer.
    let mType = mediaType;
    if (!mType) {
      const u = url.toLowerCase();
      if (u.includes("youtube.com") || u.includes("youtu.be") || u.endsWith(".mp4")) mType = "video";
      else mType = "image";
    }

    const { db } = await connectToDatabase();
    const doc = { url, caption: caption || null, mediaType: mType, createdAt: new Date() };
    const result = await db.collection("gallery").insertOne(doc);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const { db } = await connectToDatabase();
    const result = await db.collection("gallery").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
