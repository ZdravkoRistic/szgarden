import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedDb) return { client: client!, db: cachedDb };

  const uri = process.env.MONGODB_URI || "";
  if (!uri) throw new Error("Please define the MONGODB_URI environment variable inside .env.local");

  client = new MongoClient(uri);
  await client.connect();
  const dbName = process.env.MONGODB_DB || "zs_garden";
  const db = client.db(dbName);
  cachedDb = db;
  return { client, db };
}
