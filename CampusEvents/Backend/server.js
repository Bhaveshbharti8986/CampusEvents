import app from "./src/app.js";
import ConnectDB from "./src/config/DB.js";

// Use an async wrapper to catch startup crashes
const startServer = async () => {
  try {
    await ConnectDB(); // Ensure this function waits for the connection
    const port = process.env.PORT || 3301;
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Force Render to restart the container on failure
  }
};

startServer();