// packages/core-db/src/db.ts

import { Db, MongoClient } from "mongodb";

// --- Step 1: Declare globals for caching, but DO NOT initialize them here. ---
// By using a global variable in development, we prevent creating new connections on every hot-reload.
// This is a Vercel-recommended pattern.
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Add Mongo URI to .env.local");
    }
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  // The Vercel runtime will handle caching the module.
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // This error will now only be thrown at RUNTIME if the variable is missing,
    // not during the build.
    throw new Error("MONGODB_URI not set in Vercel environment variables.");
  }
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}


// --- Step 2: Create a function to get the database instance ---
// This function will be called by your server actions or API routes.
export async function connectToDatabase(): Promise<Db> {
  const dbName = process.env.MONGODB_DB;
  if (!dbName) {
    throw new Error("MONGODB_DB not set in Vercel environment variables.");
  }

  // Await the client promise and return the specific database
  const mongoClient = await clientPromise;
  return mongoClient.db(dbName);
}

// Export a module-scoped MongoClient promise.
// By doing this in a separate module, the client can be shared across functions.
export default clientPromise;