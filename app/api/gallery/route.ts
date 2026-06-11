import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { uploadMediaToStorage } from "../../../lib/galleryStorage";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = Math.max(Number(url.searchParams.get("page") || "1"), 1);
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || "4"), 1), 50);
    const skip = (page - 1) * limit;
    const mediaType = url.searchParams.get("type");

    const query: Record<string, unknown> = {};
    if (mediaType === "image" || mediaType === "video") {
      query.mediaType = mediaType;
    }

    const { db } = await connectToDatabase();
    const items = await db.collection("gallery").find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray();
    // serialize ObjectId to string for client
    const serialized = items.map((i) => ({ ...i, _id: i._id.toString() }));
    return NextResponse.json(serialized);
  } catch (err) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const caption = formData.get("caption")?.toString() ?? null;
    let mediaType = formData.get("mediaType")?.toString() ?? "";
    if (!mediaType) {
      mediaType = file.type.startsWith("video/") ? "video" : "image";
    }

    let url: string | null = null;
    if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID || process.env.VERCEL_OIDC_TOKEN) {
      try {
        url = await uploadMediaToStorage(file, file.name);
      } catch (storageError) {
        console.error("Vercel Storage upload failed:", storageError);
        url = null;
      }
    }

    const { db } = await connectToDatabase();
    const doc: Record<string, unknown> = {
      caption,
      mediaType,
      createdAt: new Date(),
    };

    if (url) {
      doc.url = url;
    } else {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      doc.base64 = `data:${file.type};base64,${base64}`;
    }

    const result = await db.collection("gallery").insertOne(doc);
    return NextResponse.json({ insertedId: result.insertedId, url });
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
