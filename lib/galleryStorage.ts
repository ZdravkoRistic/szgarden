import { put } from "@vercel/blob";

export async function uploadMediaToStorage(file: Blob, filename: string): Promise<string | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const storeId = process.env.BLOB_STORE_ID;
  if (!token && !storeId) {
    return null;
  }

  const options: Record<string, unknown> = {
    access: "public",
    addRandomSuffix: true,
  };

  if (token) options.token = token;
  if (storeId) options.storeId = storeId;

  const blob = await put(filename, file, options as any);
  return (blob as { url?: string })?.url ?? null;
}
