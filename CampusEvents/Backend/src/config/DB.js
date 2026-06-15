import mongoose from "mongoose";
import config from "./config.js";
const url = config.MONGO_URI;
const dbname=config.DB_NAME;

async function ConnectDB(){
  try{
    await mongoose.connect(url)
    console.log("Mongoose db connected")
  }
  catch(error){
     console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}
export default ConnectDB;