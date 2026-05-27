// Test script: pokušava da se poveže na MongoDB koristeći MONGODB_URI iz okruženja
// Pokretanje: `node ./scripts/test-mongo.js` nakon što ste postavili `.env.local` ili MONGODB_URI env var
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI nije postavljen. Napravite .env.local ili eksportujte varijablu.');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const adminDb = client.db().admin();
    const info = await adminDb.ping();
    console.log('Connected to MongoDB — ping ok:', info);
    const db = client.db(process.env.MONGODB_DB || 'zs_garden');
    const cols = await db.listCollections().toArray();
    console.log('Collections in DB:', cols.map(c => c.name));
  } catch (err) {
    console.error('Konekcija nije uspela:', err.message || err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();
