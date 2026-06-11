import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import { put } from "@vercel/blob";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

function decodeBase64DataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid base64 data URL");
  }
  const contentType = match[1];
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, "base64");
  return { contentType, buffer };
}

function getExtensionFromContentType(contentType: string) {
  const [, subtype] = contentType.split("/");
  if (!subtype) return "bin";
  if (subtype.includes("jpeg")) return "jpg";
  if (subtype.includes("svg+xml")) return "svg";
  if (subtype.includes("plain")) return "txt";
  return subtype.split(";")[0];
}

function buildFilename(id: unknown, contentType: string) {
  const extension = getExtensionFromContentType(contentType);
  return `gallery-${id.toString()}.${extension}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const providedSecret = url.searchParams.get("secret") || request.headers.get("x-admin-secret");

  if (!ADMIN_SECRET || !providedSecret || providedSecret !== ADMIN_SECRET) {
    return new NextResponse("Unauthorized\n", {
      status: 401,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const storeId = process.env.BLOB_STORE_ID;
  if (!token && !storeId) {
    return new NextResponse("Vercel Blob credentials are not configured. Set BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID.\n", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const lines: string[] = [];

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("gallery");
    const docs = await collection.find({ base64: { $exists: true } }).toArray();

    lines.push(`Found ${docs.length} documents with base64 data.`);
    if (docs.length === 0) {
      return new NextResponse(lines.join("\n") + "\n", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    let migrated = 0;
    let cleaned = 0;
    let skipped = 0;

    for (const doc of docs) {
      if (!doc.base64 || typeof doc.base64 !== "string") {
        lines.push(`Skipping ${doc._id}: invalid or missing base64 data.`);
        skipped += 1;
        continue;
      }

      if (doc.url && typeof doc.url === "string") {
        await collection.updateOne(
          { _id: doc._id },
          { $unset: { base64: "" } }
        );
        cleaned += 1;
        lines.push(`Cleaned base64 from already-migrated doc ${doc._id}`);
        continue;
      }

      try {
        const { contentType, buffer } = decodeBase64DataUrl(doc.base64);
        const filename = buildFilename(doc._id, contentType);
        const file = new Blob([buffer], { type: contentType });

        const options: Record<string, unknown> = {
          access: "public",
          addRandomSuffix: false,
        };
        if (token) options.token = token;
        if (storeId) options.storeId = storeId;

        const blob = await put(filename, file, options as any);
        const url = (blob as { url?: string })?.url;
        if (!url) {
          lines.push(`Skipping ${doc._id}: upload returned no URL.`);
          skipped += 1;
          continue;
        }

        await collection.updateOne(
          { _id: doc._id },
          { $set: { url }, $unset: { base64: "" } }
        );
        migrated += 1;
        lines.push(`Migrated ${doc._id} -> ${url}`);
      } catch (error) {
        lines.push(`Failed ${doc._id}: ${(error as Error).message || error}`);
        skipped += 1;
      }
    }

    lines.push(`Done: ${migrated} migrated, ${cleaned} cleaned, ${skipped} skipped.`);
    return new NextResponse(lines.join("\n") + "\n", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    lines.push(`Fatal error: ${(error as Error).message || error}`);
    return new NextResponse(lines.join("\n") + "\n", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
