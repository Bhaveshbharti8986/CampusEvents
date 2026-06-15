import mongodb from "mongodb";
import { MongoClient } from "mongodb";
import config from "./config.js";
const dbname = config.DB_NAME;
const url = config.MONGO_URI;
const client = new MongoClient(url);

async function Dbconnection() {
  try {
    await client.connect(); // Connect to MongoDB server
    const db = client.db(dbname); // Select database
    const collection = db.collection(config.COLLECTION_NAME); // Select collection

    console.log("✅ Connected to MongoDB");
    const result = await collection.find().toArray();
    console.log(result);
    return collection; // Return collection for queries
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
}

export default Dbconnection;
