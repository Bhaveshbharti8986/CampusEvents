import app from "./src/app.js";
import ConnectDB from "./src/config/DB.js";

ConnectDB();

// 1. Always use process.env.PORT for Render, fallback to 3301 for local
const port = process.env.PORT || 3301;

// 2. Explicitly bind to '0.0.0.0' to accept external traffic
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});