import app from "./src/app.js";
import ConnectDB from "./src/config/DB.js";

ConnectDB();
const port = 3301;
app.listen(port,() => {
  console.log("server isrunning https://localhost:" + port);
});
