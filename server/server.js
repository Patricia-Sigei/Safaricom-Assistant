import "dotenv/config";
import http from "http";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
