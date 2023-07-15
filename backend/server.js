const express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const config = require("config");
const users = require("./routes/users");
const auth = require("./routes/auth");
const Movie = require("./models/Movie");
const movies = require("./routes/movies");
const profile = require("./routes/profile");
const oauth = require("./routes/oauth");

const app = express();

//오류 찾기
process.on("uncaughtException", function (err) {
  console.log(err);
});

//mongodb 연결
var db;
mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/movies", movies);
app.use("/api/profile", profile);
app.use("/api/oauth", oauth);

//서버 연결
app.listen("5000", function () {
  console.log("listening on 5000");
});
