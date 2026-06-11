import { put } from "@vercel/blob";

export async function uploadMediaToStorage(file: Blob, filename: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return null;
  }

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return (blob as { url?: string })?.url ?? null;
}
