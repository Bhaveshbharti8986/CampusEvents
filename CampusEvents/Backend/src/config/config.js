import dotenv from "dotenv";


dotenv.config();
if(!process.env.MONGO_URI){
  throw new Error("Chaeck the .env file MONGO_URI  error in MONGO_URI")
}
if(!process.env.JWT_SECRET){
  throw new Error("Chaeck the .env file JWT_SECRET error in JWT_SECRET")
}

if(!process.env.GOOGLE_CLIENT_ID){
  throw new Error("Chaeck the .env file GOOGLE_CLIENT_ID error in GOOGLE_CLIENT_ID")
}
if(!process.env.GOOGLE_CLIENT_SECRET){
  throw new Error("Chaeck the .env file GOOGLE_CLIENT_SECRET error in GOOGLE_CLIENT_SECRET")
}
if(!process.env.GOOGLE_REFRESH_TOKEN){
  throw new Error("Chaeck the .env file GOOGLE_REFRESH_TOKEN error in GOOGLE_REFRESH_TOKEN")
}
if(!process.env.GOOGLE_CLIENT){
  throw new Error("Chaeck the .env file GOOGLE_CLIENT error in GOOGLE_CLIENT")
}
if(!process.env.RESEND_API_KEY){
   throw new Error("Chaeck the .env file RESEND_API_KEY error in RESEND_API_KEY")
}
const config = {
  MONGO_URI:process.env.MONGO_URI,
  DB_NAME:'school',
  COLLECTION_NAME:"student",
  JWT_SECRET:process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT:process.env.GOOGLE_CLIENT,
  GOOGLE_REFRESH_TOKEN:process.env.GOOGLE_REFRESH_TOKEN,
  RESEND_API_KEY:process.env.RESEND_API_KEY
};
export default config;
