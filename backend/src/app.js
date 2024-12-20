const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const router = require("./app.routes");
const path = require("path");

app.use(express.json());
app.use(express({ urlencoded: "extended" }));

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use(morgan("dev"));
app.use(morgan("combined"));

app.use("/", express.static(path.join(__dirname, "dist")));

app.use("/api", router);

// Rewrite and redirect all other requests to React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;
