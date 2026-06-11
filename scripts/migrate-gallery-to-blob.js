const { MongoClient } = require("mongodb");
const { put } = require("@vercel/blob");

async function decodeBase64DataUrl(dataUrl) {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid base64 data URL");
  }
  const contentType = match[1];
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, "base64");
  return { contentType, buffer };
}

async function run() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "zs_garden";

  if (!uri) {
    console.error("MONGODB_URI is required in .env.local");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("gallery");

  const docs = await collection.find({ base64: { $exists: true }, url: { $exists: false } }).toArray();
  console.log(`Found ${docs.length} base64 entries to migrate.`);

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const storeId = process.env.BLOB_STORE_ID;
  if (!token && !storeId) {
    console.error("Missing BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID environment variable.");
    process.exit(1);
  }

  let migrated = 0;
  for (const doc of docs) {
    try {
      const { contentType, buffer } = await decodeBase64DataUrl(doc.base64);
      const extension = contentType.includes("video") ? ".mp4" : ".jpg";
      const filename = `gallery-${doc._id.toString()}${extension}`;
      const file = new Blob([buffer], { type: contentType });

      const options = {
        access: "public",
        addRandomSuffix: true,
      };
      if (token) options.token = token;
      if (storeId) options.storeId = storeId;

      const blob = await put(filename, file, options);
      const url = blob?.url;
      if (!url) {
        console.warn(`Skipping doc ${doc._id}: Vercel Blob upload returned no URL.`);
        continue;
      }

      await collection.updateOne(
        { _id: doc._id },
        { $set: { url }, $unset: { base64: "" } }
      );
      migrated += 1;
      console.log(`Migrated ${doc._id} -> ${url}`);
    } catch (error) {
      console.error(`Failed to migrate ${doc._id}:`, error);
    }
  }

  console.log(`Migration complete: ${migrated}/${docs.length} migrated.`);
  await client.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
