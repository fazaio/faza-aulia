const express = require("express");
const cors = require("cors");
const users = require("./src/router/users");
const DB = require("./src/configs/db");
const REDIS = require("./src/configs/redis");

const app = express();
const bodyParser = require("body-parser");
DB.connectToDB();
REDIS.connectToServer();

//  redis connection

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", users); // user router

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
