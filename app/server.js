const http = require("http");
const express = require("express");
const { startSocketServer } = require("./socket");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const port = 8080;

app.use("/", express.static("client"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.get("/ping", (req, res) => {
  res.status(200).json({ ping: "pongs" });
});
startSocketServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
server.listen(port, () => console.log("Server running on port: " + port));
